/* Terminal Lab missions. Each objective's check(ctx) runs after every command.
   ctx = { line, lower, cmd, args, out, w }  (cmd = first word, with "sudo" stripped) */
(function () {
  const has = (s, ...subs) => subs.every(x => s.includes(x));

  App.missions = [
    // ---------------- WINDOWS ----------------
    {
      id: "win-apipa", os: "windows", title: "Front Desk: \"The Internet Is Down!\"", difficulty: "Easy", objective: "Core 2 1.2 · Core 1 5.5",
      story: "The receptionist's PC shows \"No Internet\". The network team says the DHCP server crashed this morning but is back online now. Everyone else is fine.",
      setup(w) { w.net.ip = "169.254.23.7"; w.net.mask = "255.255.0.0"; w.net.gw = ""; w.renewIp = "192.168.1.57"; },
      objectives: [
        { text: "View the full IP configuration (including DHCP & DNS servers)", hint: "ipconfig /all", check: c => c.cmd === "ipconfig" && c.lower.includes("/all") },
        { text: "Notice the 169.254.x.x address — that's APIPA. Release the bad lease", hint: "ipconfig /release", check: c => c.cmd === "ipconfig" && c.lower.includes("/release") },
        { text: "Request a fresh lease from DHCP", hint: "ipconfig /renew", check: c => c.w.flags.renewed },
        { text: "Verify you can reach the default gateway", hint: "ping 192.168.1.1", check: c => c.cmd === "ping" && c.lower.includes("192.168.1.1") && c.out.includes("Reply from 192.168.1.1") },
        { text: "Verify DNS name resolution works (look up comptia.org)", hint: "nslookup comptia.org", check: c => (c.cmd === "nslookup" || c.cmd === "ping") && c.lower.includes("comptia.org") && c.out.includes("104.18.30.99") }
      ],
      debrief: "A 169.254.x.x address means the client couldn't reach a DHCP server, so Windows self-assigned an APIPA address. ipconfig /release then /renew gets a new lease. Then test bottom-up: gateway first (local network), then DNS (name resolution)."
    },
    {
      id: "win-miner", os: "windows", title: "Slow PC & Mystery Traffic", difficulty: "Medium", objective: "Core 2 2.x / 3.x",
      story: "An accountant reports their PC is crawling and the fans are screaming. The firewall team noticed this host talking to an unknown IP on port 4444 all night.",
      setup(w) {
        w.badPid = 6660;
        w.processes.push({ name: "svch0st.exe", pid: 6660, session: "Console", mem: 1984320, needsForce: true });
        w.connections.push(["TCP", "192.168.1.57:51337", "185.220.101.4:4444", "ESTABLISHED", 6660]);
        w.sfcCorrupt = true;
      },
      objectives: [
        { text: "List running processes and spot the impostor", hint: "tasklist", check: c => c.cmd === "tasklist" },
        { text: "Show connections with owning PIDs, numerically, to confirm which process talks to port 4444", hint: "netstat -ano", check: c => c.cmd === "netstat" && c.w.flags.netstatPid && c.out.includes("4444") },
        { text: "Terminate the malicious process (it may need force)", hint: "taskkill /PID 6660 /F", check: c => !c.w.processes.some(p => p.pid === 6660) },
        { text: "Repair any system files the malware tampered with", hint: "sfc /scannow", check: c => c.cmd === "sfc" && !c.w.sfcCorrupt },
        { text: "Confirm the suspicious connection is gone", hint: "netstat -ano", check: c => c.cmd === "netstat" && !c.out.includes("4444") && c.w.flags.netstatPid }
      ],
      debrief: "\"svch0st.exe\" (zero instead of o) mimics the real svchost.exe — a classic disguise. netstat -ano ties connections to PIDs, taskkill /F force-ends a stubborn process, and sfc /scannow repairs protected system files. In real life follow the full malware removal process: quarantine, disable System Restore (Home), remediate, schedule scans, re-enable restore, educate the user."
    },
    {
      id: "win-gpo", os: "windows", title: "The Missing S: Drive", difficulty: "Medium", objective: "Core 2 1.2 / 2.x",
      story: "Jordan moved to the Sales team. IT added them to the Sales security group and a GPO maps the S: drive for Sales — but Jordan's PC doesn't have it yet.",
      setup(w) {
        w.user = "jordan"; w.users.jordan = { full: "Jordan Lee", active: true, groups: ["Users"] }; w.cwd = ["Users", "student"];
        w.userOU = "Sales"; w.admin = false;
        w.gpo.pending.push({ name: "Sales Drive Mapping", scope: "user", apply: wd => { wd.mapped["S:"] = "\\\\fileserver\\sales"; wd.flags.salesGroup = true; } });
      },
      objectives: [
        { text: "Confirm which account you're logged in as", hint: "whoami", check: c => c.cmd === "whoami" },
        { text: "Check which GPOs are applied to the user (RSoP summary)", hint: "gpresult /r", check: c => c.cmd === "gpresult" && c.w.flags.gpresult },
        { text: "Force a Group Policy refresh", hint: "gpupdate /force", check: c => c.cmd === "gpupdate" && c.w.flags.gpForce && !c.w.gpo.pending.length },
        { text: "Verify the S: drive is now mapped", hint: "net use", check: c => c.cmd === "net" && c.lower.startsWith("net use") && c.out.includes("\\\\fileserver\\sales") },
        { text: "Bonus: map P: to \\\\fileserver\\public yourself", hint: "net use P: \\\\fileserver\\public", check: c => !!c.w.mapped["P:"] }
      ],
      debrief: "gpresult /r shows the Resultant Set of Policy — which GPOs actually applied. gpupdate /force reapplies all policies without waiting for the ~90-minute background refresh. net use lists and creates mapped drives (net use X: \\\\server\\share)."
    },
    {
      id: "win-disk", os: "windows", title: "New Data Drive", difficulty: "Hard", objective: "Core 2 1.1 / 1.2",
      story: "You installed a new 1 TB SSD for a video editor. It shows up in the BIOS but not in File Explorer. Set it up as drive E: using DiskPart, formatted NTFS, labeled Media.",
      setup(w) { w.disks.push({ num: 1, size: 931, status: "Online", gpt: false, partitions: [], model: "Samsung SSD 870 EVO 1TB" }); },
      objectives: [
        { text: "Open DiskPart", hint: "diskpart", check: c => c.w.flags.diskpart },
        { text: "List the disks", hint: "list disk", check: c => c.w.flags.listDisk },
        { text: "Select the new disk (Disk 1)", hint: "select disk 1", check: c => c.w.flags.selectDisk === 1 },
        { text: "Convert it to GPT (modern UEFI partition style)", hint: "convert gpt", check: c => c.w.disks[1] && c.w.disks[1].gpt },
        { text: "Create a primary partition", hint: "create partition primary", check: c => c.w.disks[1] && c.w.disks[1].partitions.length > 0 },
        { text: "Quick-format it NTFS with the label Media", hint: "format fs=ntfs quick label=Media", check: c => { const p = c.w.disks[1] && c.w.disks[1].partitions[0]; return p && p.fs === "NTFS" && /media/i.test(p.label); } },
        { text: "Assign drive letter E", hint: "assign letter=E", check: c => { const p = c.w.disks[1] && c.w.disks[1].partitions[0]; return p && p.letter === "E"; } },
        { text: "Exit DiskPart and check the new volume with chkdsk", hint: "exit, then chkdsk E:", check: c => c.w.flags["chkdskE:"] }
      ],
      debrief: "DiskPart flow: list disk → select disk → (clean) → convert gpt → create partition primary → format fs=ntfs quick label=… → assign letter=… GPT supports >2 TB disks and up to 128 partitions in Windows; MBR is limited to 2 TB and 4 primary partitions."
    },
    {
      id: "win-users", os: "windows", title: "New Hire, Least Privilege", difficulty: "Easy", objective: "Core 2 1.2 / 2.x",
      story: "A contractor, Sam, needs a local account on this shared lab PC. They need to connect via Remote Desktop, but must NOT be an administrator.",
      setup(w) {},
      objectives: [
        { text: "List local user accounts", hint: "net user", check: c => c.cmd === "net" && /^net user\s*$/.test(c.lower) },
        { text: "Create the local user sam", hint: "net user sam P@ssw0rd! /add", check: c => Object.keys(c.w.users).some(u => u.toLowerCase() === "sam") },
        { text: "Add sam to the Remote Desktop Users group", hint: "net localgroup \"Remote Desktop Users\" sam /add", check: c => { const k = Object.keys(c.w.users).find(u => u.toLowerCase() === "sam"); return k && c.w.users[k].groups.includes("Remote Desktop Users"); } },
        { text: "Verify sam's group memberships", hint: "net user sam", check: c => c.w.flags.viewedUser && c.w.flags.viewedUser.toLowerCase() === "sam" },
        { text: "Make sure the Guest account is disabled", hint: "net user guest", check: c => c.w.flags.viewedUser === "Guest" && !c.w.users.Guest.active }
      ],
      debrief: "Principle of least privilege: give only the access required. Remote Desktop Users can RDP in without admin rights. net user manages accounts, net localgroup manages group membership. Keeping Guest disabled is a standard workstation-hardening step."
    },
    {
      id: "win-trace", os: "windows", title: "Where Does the Connection Die?", difficulty: "Medium", objective: "Core 1 5.5 · Core 2 1.2",
      story: "Users can reach internal servers but not comptia.org. Find where along the path traffic stops so you can tell the ISP.",
      setup(w) { w.routeBreakAt = 2; w.net.internet = false; },
      objectives: [
        { text: "Confirm the local gateway responds", hint: "ping 192.168.1.1", check: c => c.cmd === "ping" && c.out.includes("Reply from 192.168.1.1") },
        { text: "Confirm DNS still resolves comptia.org (name resolution isn't the issue)", hint: "nslookup comptia.org", check: c => c.cmd === "nslookup" && c.out.includes("104.18.30.99") },
        { text: "Trace the route to comptia.org", hint: "tracert comptia.org", check: c => c.cmd === "tracert" && c.w.flags.tracertFail },
        { text: "Use pathping to measure packet loss per hop", hint: "pathping comptia.org", check: c => c.cmd === "pathping" && c.out.includes("100%") }
      ],
      debrief: "Hops 1–2 (your router and the ISP edge) answer, then everything times out — the problem is upstream at the ISP, not your LAN or DNS. tracert shows the path; pathping adds per-hop loss statistics. Document the hop where it fails when you escalate."
    },

    // ---------------- LINUX ----------------
    {
      id: "lx-perms", os: "linux", title: "Permission Denied", difficulty: "Easy", objective: "Core 2 1.9",
      story: "A developer wrote a backup script in ~/scripts but says it \"won't run\". Then the web team needs /var/www/html/index.html owned by the www-data account.",
      setup(w) {
        const d = w.fs.get(["home", "student", "scripts"]);
        d.children["backup.sh"] = { type: "file", name: "backup.sh", content: "#!/bin/bash\necho \"Backing up /home/student ...\"\necho \"Backup complete: 42 files archived.\"", mode: "rw-r--r--", owner: "student", group: "student" };
      },
      objectives: [
        { text: "Go to the scripts folder", hint: "cd ~/scripts", check: c => c.w.cwd.join("/") === "home/student/scripts" },
        { text: "Show a long listing to see permissions", hint: "ls -l", check: c => c.cmd === "ls" && c.w.flags.lsl },
        { text: "Make backup.sh executable", hint: "chmod +x backup.sh   (or chmod 755 backup.sh)", check: c => { const n = c.w.fs.get(["home", "student", "scripts", "backup.sh"]); return n && n.mode[2] === "x"; } },
        { text: "Run the script", hint: "./backup.sh", check: c => (c.w.flags.ranScript || []).includes("backup.sh") },
        { text: "Change the owner of /var/www/html/index.html to www-data (needs elevation)", hint: "sudo chown www-data /var/www/html/index.html", check: c => { const n = c.w.fs.get(["var", "www", "html", "index.html"]); return n && n.owner === "www-data"; } }
      ],
      debrief: "Linux permissions are rwx for owner/group/others. r=4, w=2, x=1 — so 755 = rwxr-xr-x. chmod changes permissions, chown changes ownership (and normally needs sudo). A script needs the execute bit to run as ./script."
    },
    {
      id: "lx-logs", os: "linux", title: "Log Detective", difficulty: "Medium", objective: "Core 2 1.9 / 2.x",
      story: "Security suspects someone is brute-forcing SSH on this server. Dig through the logs and find the attacker's IP.",
      setup(w) {},
      objectives: [
        { text: "Move into /var/log", hint: "cd /var/log", check: c => c.w.cwd.join("/") === "var/log" },
        { text: "Try to read auth.log (you'll need elevated rights)", hint: "sudo cat auth.log", check: c => c.cmd === "cat" && c.line.startsWith("sudo") && c.out.includes("sshd") },
        { text: "Use grep to show only the failed login attempts", hint: "sudo grep \"Failed password\" auth.log", check: c => (c.w.flags.grep || []).some(g => /fail/i.test(g.pat) && g.total > 0) },
        { text: "Count how many failures came from 203.0.113.45", hint: "sudo grep -c 203.0.113.45 auth.log   (or ... | wc -l)", check: c => (c.cmd === "grep" && c.lower.includes("-c") && c.lower.includes("203.0.113.45")) || (c.lower.includes("203.0.113.45") && c.lower.includes("wc -l")) },
        { text: "Find every .conf file under /etc (to review SSH config next)", hint: "find /etc -name \"*.conf\"", check: c => (c.w.flags.find || []).some(f => f.pat && f.pat.includes(".conf")) }
      ],
      debrief: "Logs live in /var/log (auth.log for logins on Debian/Ubuntu, syslog for general events). grep filters lines by pattern (-i ignore case, -c count, -v invert, -r recursive). find searches by name, type or size. Repeated failures from one IP = brute force → block it and consider key-only SSH."
    },
    {
      id: "lx-apt", os: "linux", title: "Install the Tools", difficulty: "Easy", objective: "Core 2 1.9",
      story: "You want a better process viewer (htop) on this Ubuntu box. Install it the right way.",
      setup(w) { w.requireAptUpdate = true; },
      objectives: [
        { text: "Try installing htop without sudo (watch what happens)", hint: "apt install htop", check: c => c.w.flags.aptDenied },
        { text: "Refresh the package lists with elevated rights", hint: "sudo apt update", check: c => c.w.aptUpdated },
        { text: "Install htop", hint: "sudo apt install htop", check: c => c.w.packages.installed.includes("htop") },
        { text: "Run htop", hint: "htop", check: c => c.w.flags.htop },
        { text: "Check the man page for apt", hint: "man apt", check: c => c.cmd === "man" && c.args[0] === "apt" }
      ],
      debrief: "Debian/Ubuntu use apt (apt update refreshes the list, apt install installs, apt upgrade updates). Red Hat/Fedora use dnf (formerly yum). Installing software changes the system, so it requires sudo — that's least privilege in action."
    },
    {
      id: "lx-proc", os: "linux", title: "Runaway Process", difficulty: "Medium", objective: "Core 2 1.9 / 3.x",
      story: "The server is sluggish and the load average is through the roof. Find what's eating the CPU and stop it.",
      setup(w) { w.processes.push({ pid: 4242, user: "student", cpu: 98.7, mem: 3.1, cmd: "/usr/bin/python3 crunch.py --threads=64", ignoresTerm: true }); },
      objectives: [
        { text: "Look at live resource usage", hint: "top", check: c => c.w.flags.top },
        { text: "Find the process and its PID with ps (bonus: pipe to grep)", hint: "ps aux | grep crunch", check: c => c.w.flags.ps },
        { text: "Ask it politely to stop (SIGTERM)", hint: "kill 4242", check: c => c.w.flags.triedTerm },
        { text: "It ignored you. Force it (SIGKILL)", hint: "kill -9 4242", check: c => !c.w.processes.some(p => p.pid === 4242) },
        { text: "Confirm the CPU has calmed down", hint: "top", check: c => c.cmd === "top" && !c.w.processes.some(p => p.pid === 4242) }
      ],
      debrief: "top shows live CPU/memory usage; ps aux lists every process with its PID. kill sends SIGTERM (15) by default, which a hung process may ignore; kill -9 sends SIGKILL, which can't be ignored. Windows equivalents: Task Manager / tasklist and taskkill /F."
    },
    {
      id: "lx-disk", os: "linux", title: "Disk Full!", difficulty: "Medium", objective: "Core 2 1.9 / 3.x",
      story: "The web app is throwing \"No space left on device\" errors. Find what filled the disk and free up space safely.",
      setup(w) {},
      objectives: [
        { text: "Check free space in human-readable form", hint: "df -h", check: c => c.cmd === "df" && c.lower.includes("-h") },
        { text: "Find which folder under /var/log is huge", hint: "du -sh /var/log/*", check: c => c.cmd === "du" && c.out.includes("app") && c.lower.includes("/var/log") },
        { text: "Delete the runaway debug log (needs elevated rights)", hint: "sudo rm /var/log/app/debug.log", check: c => !c.w.fs.get(["var", "log", "app", "debug.log"]) },
        { text: "Confirm usage dropped below 70%", hint: "df -h", check: c => c.cmd === "df" && c.w.flags.dfPct < 70 }
      ],
      debrief: "df shows space per file system (df -h for GB/MB); du shows space used by folders/files (du -sh for a summary). A runaway debug log is a common culprit — delete or rotate it (logrotate) and fix the logging level so it doesn't happen again."
    },
    {
      id: "lx-net", os: "linux", title: "Can't Resolve Names", difficulty: "Hard", objective: "Core 2 1.9 · Core 1 5.5",
      story: "This server can ping IP addresses but every website fails. Prove where the problem is.",
      setup(w) { w.dnsWorks = false; w.badDns = "192.168.1.10"; },
      objectives: [
        { text: "Show the server's IP address", hint: "ip addr", check: c => c.w.flags.ipaddr },
        { text: "Show the default route (gateway)", hint: "ip route", check: c => c.w.flags.iproute },
        { text: "Ping an internet IP 4 times (proves routing works)", hint: "ping -c 4 8.8.8.8", check: c => (c.w.flags.ping || []).some(p => /^\d/.test(p.target) && !p.target.startsWith("192.168") && p.ok > 0) },
        { text: "Try curl https://comptia.org (watch the error)", hint: "curl https://comptia.org", check: c => c.cmd === "curl" && c.out.includes("Could not resolve") },
        { text: "Check which DNS server is configured", hint: "cat /etc/resolv.conf", check: c => c.cmd === "cat" && c.lower.includes("resolv.conf") },
        { text: "Query a public DNS server directly with dig to prove the local one is broken", hint: "dig @8.8.8.8 comptia.org", check: c => (c.w.flags.dig || []).some(d => d.server && d.server !== "192.168.1.10" && d.ok) },
        { text: "Fix it: edit /etc/resolv.conf so the nameserver is 8.8.8.8 (needs elevation)", hint: "sudo nano /etc/resolv.conf → change the nameserver line → Ctrl+O to save, Ctrl+X to exit", check: c => /^\s*nameserver\s+(8\.8\.8\.8|8\.8\.4\.4|1\.1\.1\.1|1\.0\.0\.1|9\.9\.9\.9)\s*$/m.test(c.w.fs.get(["etc", "resolv.conf"]).content.split("\n").filter(l => /^\s*nameserver/.test(l))[0] || "") },
        { text: "Prove the fix: load https://comptia.org with curl", hint: "curl https://comptia.org", check: c => c.cmd === "curl" && c.lower.includes("comptia.org") && c.out.includes("<html") }
      ],
      debrief: "IP connectivity worked (ping 8.8.8.8) but names didn't resolve, and dig @8.8.8.8 succeeded — so the configured DNS server in /etc/resolv.conf was the problem. Pointing it at a working resolver fixed it. On a real server you'd fix it in the network configuration (netplan/NetworkManager) so it survives a reboot."
    },
    // ---------------- added missions ----------------
    {
      id: "win-hosts", os: "windows", title: "Bank Site Redirects to a Fake", difficulty: "Medium", objective: "Core 2 2.x / 3.4",
      story: "A user says their bank's website \"looks different\" and asked for their password twice. Other PCs reach the real site. Something on this PC is redirecting www.contosobank.com.",
      setup(w) {
        const f = w.fs.get(["Windows", "System32", "drivers", "etc", "hosts"]);
        f.content += "\r\n203.0.113.66    www.contosobank.com";
        w.dnsTable["www.contosobank.com"] = "198.51.100.20";
        w.dnsTable["contosobank.com"] = "198.51.100.20";
      },
      objectives: [
        { text: "Ping www.contosobank.com and note the IP address it resolves to", hint: "ping www.contosobank.com", check: c => c.cmd === "ping" && c.lower.includes("contosobank") && c.out.includes("203.0.113.66") },
        { text: "Ask DNS directly for the same name — do the addresses match?", hint: "nslookup www.contosobank.com", check: c => c.cmd === "nslookup" && c.out.includes("198.51.100.20") },
        { text: "DNS is fine, so check the local hosts file", hint: "type C:\\Windows\\System32\\drivers\\etc\\hosts", check: c => c.cmd === "type" && c.out.includes("contosobank") },
        { text: "Open the hosts file in Notepad, delete the bad line and save", hint: "notepad C:\\Windows\\System32\\drivers\\etc\\hosts → delete the contosobank line → Ctrl+S → Close", check: c => !c.w.fs.get(["Windows", "System32", "drivers", "etc", "hosts"]).content.toLowerCase().includes("contosobank") },
        { text: "Flush the DNS resolver cache", hint: "ipconfig /flushdns", check: c => c.cmd === "ipconfig" && c.lower.includes("/flushdns") },
        { text: "Confirm the name now resolves to the real address", hint: "ping www.contosobank.com", check: c => c.cmd === "ping" && c.lower.includes("contosobank") && c.out.includes("198.51.100.20") }
      ],
      debrief: "Windows checks the hosts file before asking DNS, so malware adds lines to it to send users to look-alike sites. ping uses the hosts file but nslookup asks the DNS server directly — when they disagree, suspect the hosts file. After cleaning it, follow the full malware removal process (scan, update, educate the user) and have the user change their bank password."
    },
    {
      id: "win-backup", os: "windows", title: "Back Up Before Reimaging", difficulty: "Easy", objective: "Core 2 1.5 / 4.3",
      story: "This PC is about to be reimaged. Before wiping it, back up the user's Documents folder — including every subfolder — to C:\\Backup\\student.",
      setup(w) {
        const docs = w.fs.get(["Users", "student", "Documents"]);
        docs.children["Q3 report.docx"] = { type: "file", name: "Q3 report.docx", content: "[binary document data]", mode: "rw-r--r--", owner: "student" };
        w.fs.mkdir(["Users", "student", "Documents", "Projects", "Website"]);
        w.fs.write(["Users", "student", "Documents", "Projects", "Website", "index.html"], "<h1>Draft site</h1>");
      },
      objectives: [
        { text: "Look at what's in the Documents folder", hint: "dir Documents", check: c => c.cmd === "dir" && (c.lower.includes("documents") || c.w.cwd.join("\\").toLowerCase().endsWith("documents")) },
        { text: "Create the backup folder C:\\Backup\\student", hint: "md C:\\Backup\\student", check: c => !!c.w.fs.get(["Backup", "student"]) },
        { text: "Copy Documents and ALL subfolders with robocopy", hint: "robocopy Documents C:\\Backup\\student\\Documents /E", check: c => { let ok = false; const b = c.w.fs.get(["Backup", "student"]); if (b) c.w.fs.walk(b, [], n => { if (n.name === "index.html") ok = true; }); return ok; } },
        { text: "Verify the copy with dir", hint: "dir C:\\Backup\\student\\Documents", check: c => c.cmd === "dir" && c.lower.includes("backup") },
        { text: "Show the whole backup as a tree, including files", hint: "tree C:\\Backup\\student /F", check: c => c.cmd === "tree" && c.lower.includes("/f") }
      ],
      debrief: "robocopy (Robust File Copy) is the exam's go-to for copying folder trees: /E copies all subfolders (even empty ones), /MIR mirrors a folder (and deletes extras at the destination), and /Z makes copies restartable. Always verify a backup before you wipe anything — an untested backup isn't a backup."
    },
    {
      id: "lx-usb", os: "linux", title: "Field Team's USB Drive", difficulty: "Medium", objective: "Core 2 1.9",
      story: "The survey team plugged in a USB drive with this week's data, but it was yanked out of a laptop without being ejected. Get the data accessible at /mnt/data.",
      setup(w) {
        w.fs.mkdir(["mnt"]);
        const m = w.fs.get(["mnt"]); m.owner = m.group = "root";
        w.blockDevices.push({ name: "sdb", size: "59.8G", rm: 1, parts: [{ name: "sdb1", size: "59.8G", fs: "ext4", label: "FIELDDATA", mount: null, dirty: true, used: "12G", avail: "45G", pct: "21%",
          files: { "survey-2026.csv": "site,reading\nA,42\nB,37\nC,51", "README.txt": "Field data from the survey team.", photos: { "site-a.jpg": "[jpeg data]" } } }] });
      },
      objectives: [
        { text: "List the block devices to find the USB drive", hint: "lsblk", check: c => c.w.flags.lsblk },
        { text: "Create the mount point /mnt/data", hint: "sudo mkdir -p /mnt/data", check: c => !!c.w.fs.get(["mnt", "data"]) },
        { text: "Try to mount /dev/sdb1 on /mnt/data", hint: "sudo mount /dev/sdb1 /mnt/data", check: c => c.w.flags.mountFailed || (c.w.flags.mounted || []).includes("/mnt/data") },
        { text: "The file system is damaged. Check and repair it (it must not be mounted)", hint: "sudo fsck -y /dev/sdb1", check: c => c.w.flags.fsck === "/dev/sdb1" },
        { text: "Mount it again", hint: "sudo mount /dev/sdb1 /mnt/data", check: c => (c.w.flags.mounted || []).includes("/mnt/data") },
        { text: "List the files on the drive", hint: "ls /mnt/data", check: c => c.cmd === "ls" && c.out.includes("survey-2026.csv") },
        { text: "Confirm it shows up in the disk usage report", hint: "df -h", check: c => c.cmd === "df" && c.out.includes("/mnt/data") }
      ],
      debrief: "lsblk lists disks and partitions. A drive pulled out without unmounting can be left with file system errors, so mount refuses it. fsck checks and repairs a file system — always on an unmounted partition. mount attaches a partition to a directory (umount detaches it), and entries in /etc/fstab make mounts permanent."
    },
    {
      id: "lx-web", os: "linux", title: "The Website Is Down", difficulty: "Easy", objective: "Core 2 1.9 / 3.x",
      story: "The company intranet runs on this server's nginx web service, and users report the page won't load. Find out what's wrong and bring it back — and make sure it survives a reboot.",
      setup(w) {
        w.services.nginx = "failed";
        w.processes = w.processes.filter(p => !p.cmd.startsWith("nginx"));
        w.fs.get(["var", "log"]).children.nginx = { type: "dir", name: "nginx", mode: "rwxr-xr-x", owner: "root", group: "root", children: {
          "error.log": { type: "file", name: "error.log", mode: "rw-r--r--", owner: "root", group: "root",
            content: "2026/10/06 08:59:12 [notice] 1422#1422: signal process started\n2026/10/06 09:41:03 [alert] 1422#1422: worker process 1430 exited on signal 9\n2026/10/06 09:41:03 [alert] 1422#1422: worker process 1431 exited on signal 9\n2026/10/06 09:41:04 [emerg] 1422#1422: master process exiting after out-of-memory kill" } } };
      },
      objectives: [
        { text: "Confirm the site is down from the server itself", hint: "curl http://localhost", check: c => c.w.flags.curlLocalFail },
        { text: "Check the status of the nginx service", hint: "systemctl status nginx", check: c => c.cmd === "systemctl" && c.lower.includes("status") && c.lower.includes("nginx") },
        { text: "Read the last lines of the nginx error log", hint: "tail /var/log/nginx/error.log", check: c => (c.cmd === "tail" || c.cmd === "cat") && c.out.includes("exited on signal 9") },
        { text: "Restart the service (needs elevation)", hint: "sudo systemctl restart nginx", check: c => c.w.services.nginx === "active" },
        { text: "Make sure nginx starts automatically at boot", hint: "sudo systemctl enable nginx", check: c => c.w.flags["svc-enable"] === "nginx" },
        { text: "Verify the page loads again", hint: "curl http://localhost", check: c => c.w.flags.curlLocalOk }
      ],
      debrief: "systemctl manages services: status shows whether a service is running and why it stopped, restart brings it back, and enable makes it start at boot. Logs under /var/log explain the cause — here the kernel killed nginx for using too much memory, so the next step would be finding out why memory ran out."
    }
  ];
  App.missionCount = () => App.missions.length;
  App.missionCheckCtx = function (line, out, w) {
    let toks = App.tokenize(line);
    if (toks[0] === "sudo") toks = toks.slice(1);
    const cmd = (toks[0] || "").toLowerCase().replace(/\.exe$/, "");
    return { line, lower: line.toLowerCase(), cmd, args: toks.slice(1), out, w, has };
  };
})();
