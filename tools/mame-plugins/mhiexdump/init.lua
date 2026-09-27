-- mhiexdump: writes a game's hiscore table to <rom>.hi as soon as it is in memory, then quits.
--
-- MAME's hiscore plugin only writes a .hi once a default score has been beaten. This one reads
-- the same hiscore.dat entry, applies the same checks (fill at reset, start/end bytes of every
-- range, @delay), waits for the table to settle and writes it right away: a default .hi file in
-- the exact layout of this MAME version, without playing.
--
-- Driven by environment variables (see tools/dump-defaults.cjs):
--   MHIEXDUMP_HISCOREDAT  hiscore.dat to read (required)
--   MHIEXDUMP_OUT         directory the .hi and <rom>.status files are written to (required)
--   MHIEXDUMP_TIMEOUT     emulated seconds to wait for the table before giving up (default 120)
--   MHIEXDUMP_SETTLE      emulated seconds the table must stay unchanged before it is written (default 3)
local exports = {
	name = 'mhiexdump',
	version = '1.0.0',
	description = 'Dump the default hiscore table',
	license = 'ISC',
	author = { name = 'Arcadoolic' } }

local mhiexdump = exports

-- Kept here: a notifier subscription that gets garbage-collected stops firing
local reset_subscription, frame_subscription

function mhiexdump.set_folder(path)
end

function mhiexdump.startplugin()
	local dat_path = os.getenv('MHIEXDUMP_HISCOREDAT')
	local out_dir = os.getenv('MHIEXDUMP_OUT')
	local timeout = tonumber(os.getenv('MHIEXDUMP_TIMEOUT') or '') or 120
	local settle = tonumber(os.getenv('MHIEXDUMP_SETTLE') or '') or 3

	local positions = nil
	local delay_until = 0
	local stable_since = nil
	local last_content = nil
	local done = false

	local function status(text)
		local file = io.open(out_dir .. '/' .. emu.romname() .. '.status', 'w')
		if file then
			file:write(text .. '\n')
			file:close()
		end
		emu.print_info('mhiexdump: ' .. emu.romname() .. ': ' .. text)
	end

	local function finish(text)
		if not done then
			done = true
			status(text)
			manager.machine:exit()
		end
	end

	-- Same lookup as the hiscore plugin: the lines of the entry listing this rom
	local function read_entry()
		local file = io.open(dat_path, 'r')
		if not file then
			return nil
		end
		local rom_match = '^' .. emu.romname() .. ':'
		local cluster = {}
		local matching = false
		for line in file:lines() do
			line = line:gsub('[ \t\r\n]*;.+$', '')
			if line:find('^@') then
				if matching then
					cluster[#cluster + 1] = line
				end
			elseif line:find(rom_match) then
				matching = true
			elseif line:find('^[a-z0-9_,]+:') then
				if matching and #cluster > 0 then
					break
				end
			end
		end
		file:close()
		return cluster
	end

	local function parse(lines)
		local rows = {}
		for _, line in ipairs(lines) do
			local delay = line:match('^@delay=([.%d]*)')
			if delay and #delay > 0 then
				delay_until = tonumber(delay)
			else
				local cputag, space, offs, len, chk_st, chk_ed, fill = line:match('^@([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),?(%x?%x?)')
				local cpu = manager.machine.devices[cputag]
				if not cpu then
					error(cputag .. ' device not found')
				end
				local mem
				local rgnname, rgntype = space:match('([^/]*)/?([^/]*)')
				if rgntype == 'share' then
					mem = manager.machine.memory.shares[rgnname]
				else
					mem = cpu.spaces[space]
				end
				if not mem then
					error(space .. ' space not found')
				end
				rows[#rows + 1] = {
					mem = mem,
					addr = tonumber(offs, 16),
					size = tonumber(len, 16),
					c_start = tonumber(chk_st, 16),
					c_end = tonumber(chk_ed, 16),
					fill = tonumber(fill, 16),
				}
			end
		end
		return rows
	end

	-- A 1-byte range next to real table ranges is a marker: some games keep changing it (dbreed's
	-- is a counter during the demo). The hiscore plugin writes it back when it loads a file, so it
	-- is left out of the checks and the stability test, and written with its check value.
	local function is_marker(row)
		if row.size ~= 1 then
			return false
		end
		for _, other in ipairs(positions) do
			if other.size > 1 then
				return true
			end
		end
		return false
	end

	local function check_mem()
		for _, row in ipairs(positions) do
			if is_marker(row) then
				goto continue
			end
			if row.c_start ~= row.mem:read_u8(row.addr) then
				return false
			end
			if row.c_end ~= row.mem:read_u8(row.addr + row.size - 1) then
				return false
			end
			::continue::
		end
		return true
	end

	-- RAM not yet written by the game is usually all 00 (or FF): not a table yet
	local function is_uniform(content)
		return content == string.rep(content:sub(1, 1), #content)
	end

	local function write(content, text)
		local file = io.open(out_dir .. '/' .. emu.romname() .. '.hi', 'wb')
		if not file then
			finish('error: cannot write ' .. out_dir)
			return
		end
		file:write(content)
		file:close()
		finish(text)
	end

	-- Markers read as their check value; `forced` counts those whose live value differed
	local function read_content()
		local bytes = {}
		local forced = 0
		for _, row in ipairs(positions) do
			if is_marker(row) then
				if row.mem:read_u8(row.addr) ~= row.c_start then
					forced = forced + 1
				end
				bytes[#bytes + 1] = string.char(row.c_start)
			else
				for i = 0, row.size - 1 do
					bytes[#bytes + 1] = string.char(row.mem:read_u8(row.addr + i))
				end
			end
		end
		return table.concat(bytes), forced
	end

	reset_subscription = emu.add_machine_reset_notifier(function()
		if not dat_path or not out_dir then
			emu.print_error('mhiexdump: set MHIEXDUMP_HISCOREDAT and MHIEXDUMP_OUT')
			manager.machine:exit()
			return
		end
		local lines = read_entry()
		if not lines then
			finish('error: cannot read ' .. dat_path)
			return
		end
		if #lines == 0 then
			finish('no-entry')
			return
		end
		local ok, result = pcall(parse, lines)
		if not ok then
			finish('error: ' .. tostring(result))
			return
		end
		positions = result
		-- Like the hiscore plugin: a fill byte clears the table so the start/end check cannot pass on stale RAM
		for _, row in ipairs(positions) do
			if row.fill then
				for i = 0, row.size - 1 do
					row.mem:write_u8(row.addr + i, row.fill)
				end
			end
		end
	end)

	frame_subscription = emu.add_machine_frame_notifier(function()
		if done or not positions then
			return
		end
		local now = manager.machine.time.seconds
		if now > timeout then
			-- A table that passed the checks but only ever held one byte value may still be the
			-- game's real default (e.g. all zero scores): written, flagged for a manual check
			if last_content and check_mem() then
				write(last_content, string.format('uniform %d bytes (all 0x%02x): check it is not uninitialized RAM', #last_content, last_content:byte(1)))
			else
				finish('timeout')
			end
			return
		end
		if now < delay_until or not check_mem() then
			stable_since = nil
			return
		end
		-- The checks pass as soon as the table's first and last bytes are set: wait until the
		-- whole table stops changing, the game may still be filling it in
		local content, forced = read_content()
		if is_uniform(content) then
			last_content = content
			stable_since = nil
			return
		end
		if content ~= last_content or not stable_since then
			last_content = content
			stable_since = now
			return
		end
		if now - stable_since >= settle then
			write(content, string.format('ok %d bytes at %.1fs', #content, now)
				.. (forced > 0 and string.format(' (%d marker byte(s) written with their check value)', forced) or ''))
		end
	end)
end

return exports
