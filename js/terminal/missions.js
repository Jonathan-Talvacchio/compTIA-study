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
        { text: "Query a public DNS server directly with dig to prove the local one is broken", hint: "dig @8.8.8.8 comptia.org", check: c => (c.w.flags.dig || []).some(d => d.server && d.server !== "192.168.1.10" && d.ok) }
      ],
      debrief: "IP connectivity works (ping 8.8.8.8) but names don't resolve, and dig @8.8.8.8 succeeds — so the configured DNS server (192.168.1.10 in /etc/resolv.conf) is the problem. Bottom-up troubleshooting isolates the layer fast."
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
