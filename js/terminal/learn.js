/* Terminal learning content: Academy lessons, Command Drill challenges and the Command Guide.
   Lesson step checks receive the same ctx as missions: { line, lower, cmd, args, out, w }. */
(function () {
  const cwdIs = (c, path) => c.w.cwd.join("/").toLowerCase() === path.toLowerCase();
  const exists = (c, ...p) => !!c.w.fs.get(p);

  // ======================================================================
  // Academy lessons: short, guided, one command at a time.
  // ======================================================================
  App.lessons = [
    // ---------------- Windows ----------------
    {
      id: "win-nav", os: "windows", title: "CMD Basics: Getting Around", level: "Beginner",
      blurb: "Read the prompt, list folders, move around, create and remove directories, and get help.",
      steps: [
        { teach: "The prompt `C:\\Users\\student>` tells you which folder you're in. The `dir` command lists what's inside it.", task: "List the contents of the current folder.", hint: "dir",
          check: c => c.cmd === "dir", after: "Folders show `<DIR>`; files show their size in bytes. The last lines total up the files and free space." },
        { teach: "`cd` (change directory) moves you into another folder. Press Tab to auto-complete folder names.", task: "Move into the Documents folder.", hint: "cd Documents",
          check: c => cwdIs(c, "Users/student/Documents"), after: "Notice the prompt changed to show the new folder." },
        { teach: "`cd ..` moves up one level to the parent folder.", task: "Go back up to C:\\Users\\student.", hint: "cd ..",
          check: c => c.cmd === "cd" && cwdIs(c, "Users/student"), after: "`..` always means \"the folder above this one\"." },
        { teach: "`md` (or `mkdir`) makes a new directory.", task: "Create a folder named Lab.", hint: "md Lab",
          check: c => exists(c, "Users", "student", "Lab"), after: "No output means success. Most Windows commands only speak up when something goes wrong." },
        { teach: "`cd \\` jumps straight to the root of the current drive.", task: "Jump to the root of drive C:.", hint: "cd \\",
          check: c => c.w.cwd.length === 0, after: "The prompt is now just `C:\\>`." },
        { teach: "An absolute path starts from the drive (C:\\...), so it works from any folder. `rmdir` (or `rd`) removes a folder.", task: "Remove the Lab folder using its full path.", hint: "rmdir C:\\Users\\student\\Lab",
          check: c => (c.cmd === "rmdir" || c.cmd === "rd") && !exists(c, "Users", "student", "Lab"), after: "To delete a folder that still has files in it, add `/s` (and `/q` to skip the confirmation)." },
        { teach: "Every command has built-in help: add `/?` after it.", task: "Show the help for dir.", hint: "dir /?",
          check: c => c.cmd === "dir" && c.args[0] === "/?", after: "On the exam, `[command] /?` is the answer whenever a question asks how to see a command's options." }
      ]
    },
    {
      id: "win-net", os: "windows", title: "Windows Network Toolkit", level: "Beginner",
      blurb: "ipconfig, ping, nslookup, tracert, netstat — the commands you'll use on almost every network ticket.",
      steps: [
        { teach: "`ipconfig` shows each adapter's IPv4 address, subnet mask and default gateway.", task: "Show your basic IP configuration.", hint: "ipconfig",
          check: c => c.cmd === "ipconfig" && !c.args.length, after: "An address starting with 169.254 here would mean the PC couldn't reach a DHCP server (APIPA)." },
        { teach: "`ipconfig /all` adds the MAC address, DHCP server, lease times and DNS servers.", task: "Show the full IP configuration.", hint: "ipconfig /all",
          check: c => c.cmd === "ipconfig" && c.lower.includes("/all"), after: "Physical Address is the MAC address. DNS Servers is the first place to look when names don't resolve." },
        { teach: "`ping` tests whether a host answers. Start with your default gateway to test the local network.", task: "Ping the default gateway, 192.168.1.1.", hint: "ping 192.168.1.1",
          check: c => c.cmd === "ping" && c.out.includes("Reply from 192.168.1.1"), after: "Four replies with low times means the local network is healthy. Windows sends 4 pings by default." },
        { teach: "`-n` sets how many pings to send (`-t` pings until you stop it).", task: "Ping comptia.org exactly 2 times.", hint: "ping -n 2 comptia.org",
          check: c => c.cmd === "ping" && /-n\s+2\b/.test(c.lower) && c.lower.includes("comptia.org"), after: "Because a name worked, you also proved DNS resolution works." },
        { teach: "`nslookup` asks a DNS server directly for a name's address.", task: "Look up comptia.org.", hint: "nslookup comptia.org",
          check: c => c.cmd === "nslookup" && c.out.includes("104.18.30.99"), after: "\"Non-authoritative answer\" just means the reply came from a DNS server's cache, not the domain's own server. Add a server to query it instead: `nslookup comptia.org 8.8.8.8`." },
        { teach: "`tracert` lists every router (hop) between you and a destination.", task: "Trace the route to comptia.org.", hint: "tracert comptia.org",
          check: c => c.cmd === "tracert" && c.out.includes("Trace complete"), after: "If traffic dies partway, the last hop that answers shows where the problem starts. `pathping` adds packet-loss stats per hop." },
        { teach: "`netstat` shows connections. `-a` = all (including listening ports), `-n` = numbers instead of names, `-o` = owning process ID.", task: "Show all connections with process IDs, in numeric form.", hint: "netstat -ano",
          check: c => c.cmd === "netstat" && ["a", "n", "o"].every(f => c.args.join("").toLowerCase().includes(f)), after: "Match a suspicious PID to a program with `tasklist`. `netstat -b` names the program directly but needs an admin prompt." },
        { teach: "Windows caches DNS answers. `ipconfig /flushdns` empties that cache.", task: "Flush the DNS resolver cache.", hint: "ipconfig /flushdns",
          check: c => c.cmd === "ipconfig" && c.lower.includes("/flushdns"), after: "Flush the cache after fixing DNS records or the hosts file so stale answers aren't reused." }
      ]
    },
    {
      id: "win-sys", os: "windows", title: "System Info, Repair & Group Policy", level: "Intermediate",
      blurb: "hostname, whoami, winver, sfc, chkdsk, gpupdate and gpresult.",
      steps: [
        { teach: "`hostname` prints the computer's name — handy for tickets and remote support.", task: "Show this PC's name.", hint: "hostname",
          check: c => c.cmd === "hostname", after: "" },
        { teach: "`whoami` shows the signed-in account as DOMAIN\\user.", task: "Show who you're signed in as.", hint: "whoami",
          check: c => c.cmd === "whoami", after: "`whoami /groups` lists group memberships — useful for permission problems." },
        { teach: "`winver` opens the About Windows box with the version and build number.", task: "Show the Windows version.", hint: "winver",
          check: c => c.cmd === "winver", after: "Build numbers tell you which feature update is installed." },
        { teach: "`sfc /scannow` (System File Checker) verifies protected Windows files and replaces corrupted ones. It needs an admin prompt.", task: "Scan and repair protected system files.", hint: "sfc /scannow",
          check: c => c.cmd === "sfc" && c.lower.includes("/scannow"), after: "If sfc can't repair files, `DISM /Online /Cleanup-Image /RestoreHealth` repairs the component store it copies from." },
        { teach: "`chkdsk` checks a volume's file system. Without switches it only reports problems.", task: "Run a read-only disk check.", hint: "chkdsk",
          check: c => c.cmd === "chkdsk" && !/\/[fr]\b/.test(c.lower), after: "`/f` fixes errors and `/r` also finds bad sectors. On C: it can't lock the drive, so it schedules the check for the next restart." },
        { teach: "Group Policy refreshes about every 90 minutes. `gpupdate /force` reapplies every policy now.", task: "Force a Group Policy refresh.", hint: "gpupdate /force",
          check: c => c.cmd === "gpupdate" && c.lower.includes("/force"), after: "Some policies (like software installs) still need a logoff or restart." },
        { teach: "`gpresult /r` shows the Resultant Set of Policy: which GPOs actually applied to this user and computer.", task: "Show the applied Group Policy summary.", hint: "gpresult /r",
          check: c => c.cmd === "gpresult" && c.lower.includes("/r"), after: "If a policy isn't listed, check the user or computer is in the right OU or security group." }
      ]
    },
    {
      id: "win-users", os: "windows", title: "Users, Shares & Mapped Drives", level: "Intermediate",
      blurb: "The net command family: net user, net localgroup, net view and net use.",
      steps: [
        { teach: "`net user` lists the local user accounts.", task: "List local user accounts.", hint: "net user",
          check: c => /^net user\s*$/i.test(c.line), after: "`net user NAME` shows one account's details and group memberships." },
        { teach: "`net localgroup GROUP` lists a group's members.", task: "See who's in the local Administrators group.", hint: "net localgroup administrators",
          check: c => /^net localgroup administrators\s*$/i.test(c.line), after: "Least privilege: only people who truly need admin rights belong here." },
        { teach: "`net view` lists computers sharing resources on the network.", task: "List the computers on the network.", hint: "net view",
          check: c => /^net view\s*$/i.test(c.line), after: "" },
        { teach: "`net view \\\\server` lists that server's shared folders and printers.", task: "List the shares on \\\\fileserver.", hint: "net view \\\\fileserver",
          check: c => c.w.flags.netView === "fileserver", after: "UNC paths have the form \\\\server\\share." },
        { teach: "`net use X: \\\\server\\share` maps a network share to a drive letter.", task: "Map S: to \\\\fileserver\\sales.", hint: "net use S: \\\\fileserver\\sales",
          check: c => (c.w.mapped["S:"] || "").toLowerCase() === "\\\\fileserver\\sales", after: "" },
        { teach: "`net use` on its own lists your current mappings.", task: "List mapped drives.", hint: "net use",
          check: c => /^net use\s*$/i.test(c.line), after: "" },
        { teach: "`net use X: /delete` removes a mapping.", task: "Disconnect drive S:.", hint: "net use S: /delete",
          check: c => !c.w.mapped["S:"] && /\/d(elete)?\b/i.test(c.line), after: "Domain environments usually map drives with Group Policy or a login script instead of by hand." }
      ]
    },

    // ---------------- Linux ----------------
    {
      id: "lx-nav", os: "linux", title: "Linux Basics: Navigation", level: "Beginner",
      blurb: "pwd, ls, cd, cat and man — find your way around a Linux file system.",
      steps: [
        { teach: "In `student@ubuntu-lab:~$`, `~` is your home directory and `$` means a normal user (`#` means root). `pwd` prints the full path of where you are.", task: "Print your working directory.", hint: "pwd",
          check: c => c.cmd === "pwd", after: "Linux paths use forward slashes and start at `/`, the root." },
        { teach: "`ls` lists files. Linux is case-sensitive: Documents and documents are different names.", task: "List the files here.", hint: "ls",
          check: c => c.cmd === "ls", after: "" },
        { teach: "Files starting with a dot are hidden. `-l` gives a long listing and `-a` shows hidden files; you can combine them.", task: "List everything, including hidden files, in long format.", hint: "ls -la",
          check: c => c.cmd === "ls" && c.args.some(a => /^-[a-z]*a/.test(a)) && c.args.some(a => /^-[a-z]*l/.test(a)), after: "The first column is the permissions (like -rw-r--r--); then come the owner, group, size and date." },
        { teach: "`cd` changes directory. Tab completes names.", task: "Move into Documents.", hint: "cd Documents",
          check: c => cwdIs(c, "home/student/Documents"), after: "" },
        { teach: "`cat` prints a file's contents to the screen.", task: "Display report.txt.", hint: "cat report.txt",
          check: c => c.cmd === "cat" && c.out.includes("Quarterly report"), after: "For long files, `less` lets you scroll, and `head` / `tail` show the start or end." },
        { teach: "`cd` with no argument (or `cd ~`) always takes you home.", task: "Go back to your home directory.", hint: "cd ~",
          check: c => c.cmd === "cd" && cwdIs(c, "home/student"), after: "" },
        { teach: "System configuration lives in `/etc`. An absolute path starts with `/`.", task: "Move to /etc and list it.", hint: "cd /etc   then   ls",
          check: c => c.cmd === "ls" && cwdIs(c, "etc"), after: "You'll see files like passwd, shadow, hosts, fstab and resolv.conf — all on the exam." },
        { teach: "`man` opens a command's manual page.", task: "Open the manual for ls.", hint: "man ls",
          check: c => c.cmd === "man" && c.args[0] === "ls", after: "In a real terminal, press q to leave the manual." }
      ]
    },
    {
      id: "lx-files", os: "linux", title: "Working with Files", level: "Beginner",
      blurb: "mkdir, touch, echo, cp, mv and rm — create, copy, rename and delete.",
      steps: [
        { teach: "`mkdir` makes a directory.", task: "Create a directory named lab in your home folder.", hint: "mkdir lab",
          check: c => exists(c, "home", "student", "lab"), after: "" },
        { teach: "", task: "Move into lab.", hint: "cd lab",
          check: c => cwdIs(c, "home/student/lab"), after: "" },
        { teach: "`>` sends a command's output into a file, replacing it; `>>` appends.", task: "Create notes.txt containing the word hello.", hint: "echo hello > notes.txt",
          check: c => { const n = c.w.fs.get(["home", "student", "lab", "notes.txt"]); return !!n && /hello/i.test(n.content); }, after: "" },
        { teach: "", task: "Display notes.txt.", hint: "cat notes.txt",
          check: c => c.cmd === "cat" && /hello/i.test(c.out), after: "" },
        { teach: "`cp SOURCE DEST` copies a file.", task: "Copy notes.txt to backup.txt.", hint: "cp notes.txt backup.txt",
          check: c => exists(c, "home", "student", "lab", "backup.txt"), after: "Use `cp -r` to copy a whole directory." },
        { teach: "`mv` moves a file — and moving it to a new name in the same place renames it.", task: "Rename backup.txt to old.txt.", hint: "mv backup.txt old.txt",
          check: c => exists(c, "home", "student", "lab", "old.txt") && !exists(c, "home", "student", "lab", "backup.txt"), after: "Linux has no separate rename command for single files — `mv` does both jobs." },
        { teach: "`rm` deletes files immediately. There's no Recycle Bin.", task: "Delete old.txt.", hint: "rm old.txt",
          check: c => !exists(c, "home", "student", "lab", "old.txt") && c.cmd === "rm", after: "" },
        { teach: "`rm -r` removes a directory and everything in it. Double-check before pressing Enter!", task: "Go back home and remove the lab directory.", hint: "cd ~   then   rm -r lab",
          check: c => !exists(c, "home", "student", "lab"), after: "`rm -rf` also skips every confirmation, which is why it deserves respect." }
      ]
    },
    {
      id: "lx-perms", os: "linux", title: "Permissions, Ownership & sudo", level: "Intermediate",
      blurb: "Read rwx permissions, use chmod and chown, and elevate with sudo.",
      steps: [
        { teach: "Permissions show as three sets of rwx: owner, group, others. r = read, w = write, x = execute.", task: "Show a long listing of the scripts folder.", hint: "ls -l scripts",
          check: c => c.cmd === "ls" && c.lower.includes("scripts") && c.args.some(a => a.startsWith("-") && a.includes("l")), after: "`-rw-r--r--` means the owner can read and write, and everyone else can only read. No x, so the script can't run yet." },
        { teach: "Running a script with `./` requires the execute bit.", task: "Try to run scripts/hello.sh.", hint: "./scripts/hello.sh",
          check: c => c.w.flags.execDenied || (c.w.flags.ranScript || []).includes("hello.sh"), after: "\"Permission denied\" — exactly what we expected." },
        { teach: "`chmod +x` adds execute permission.", task: "Make hello.sh executable.", hint: "chmod +x scripts/hello.sh",
          check: c => { const n = c.w.fs.get(["home", "student", "scripts", "hello.sh"]); return n && n.mode[2] === "x"; }, after: "" },
        { teach: "", task: "Run the script again.", hint: "./scripts/hello.sh",
          check: c => (c.w.flags.ranScript || []).includes("hello.sh"), after: "" },
        { teach: "Numeric mode: r=4, w=2, x=1, added up for owner, group and others. 600 = rw for the owner only.", task: "Make notes.txt private to you (600).", hint: "chmod 600 notes.txt",
          check: c => { const n = c.w.fs.get(["home", "student", "notes.txt"]); return n && n.mode === "rw-------"; }, after: "Common ones: 755 (rwxr-xr-x) for scripts, 644 (rw-r--r--) for files, 600 for secrets." },
        { teach: "/etc/shadow holds password hashes, so normal users can't read it.", task: "Try to read /etc/shadow.", hint: "cat /etc/shadow",
          check: c => c.cmd === "cat" && c.lower.includes("shadow") && !c.line.startsWith("sudo"), after: "" },
        { teach: "`sudo` runs one command as root. You must be allowed to (a member of the sudo group) and it asks for YOUR password.", task: "Read /etc/shadow with sudo.", hint: "sudo cat /etc/shadow",
          check: c => c.line.startsWith("sudo") && c.out.includes("root:"), after: "`su` switches to another user's shell entirely and asks for THAT user's password. sudo is preferred because it's logged and limited." },
        { teach: "`chown` changes a file's owner and usually needs sudo.", task: "Make root the owner of notes.txt.", hint: "sudo chown root notes.txt",
          check: c => { const n = c.w.fs.get(["home", "student", "notes.txt"]); return n && n.owner === "root"; }, after: "`chown user:group file` sets both at once." }
      ]
    },
    {
      id: "lx-search", os: "linux", title: "grep, find & Pipes", level: "Intermediate",
      blurb: "Search inside files, search for files, and chain commands together.",
      steps: [
        { teach: "`grep PATTERN FILE` prints matching lines. `-i` ignores case. System logs need elevation to read.", task: "Find lines containing \"error\" (any case) in /var/log/syslog.", hint: "sudo grep -i error /var/log/syslog",
          check: c => c.cmd === "grep" && c.lower.includes("error") && c.lower.includes("syslog") && c.out.includes("nginx"), after: "`-n` adds line numbers, `-v` shows lines that DON'T match, and `-c` counts matches." },
        { teach: "`grep -r` searches every file in a directory tree and prefixes each match with its file name.", task: "Search your home folder recursively for TODO.", hint: "grep -r TODO ~",
          check: c => c.cmd === "grep" && c.args.some(a => /^-[a-z]*r/i.test(a)) && /TODO/.test(c.out), after: "Great for finding which config file sets a value." },
        { teach: "`find PATH -name PATTERN` searches for files by name. Quote wildcards.", task: "Find every .conf file under /etc.", hint: "find /etc -name \"*.conf\"",
          check: c => c.cmd === "find" && c.out.includes(".conf"), after: "find can also search by type (`-type d`) and size (`-size +100M`)." },
        { teach: "A pipe `|` sends one command's output into the next command.", task: "List processes and keep only the nginx lines.", hint: "ps aux | grep nginx",
          check: c => c.cmd === "ps" && c.line.includes("|") && c.lower.includes("grep"), after: "" },
        { teach: "`wc -l` counts lines.", task: "Count how many entries are in /etc.", hint: "ls /etc | wc -l",
          check: c => c.cmd === "ls" && c.line.includes("|") && c.lower.includes("wc"), after: "Pipes let small tools combine into powerful one-liners." }
      ]
    },
    {
      id: "lx-sys", os: "linux", title: "Processes, Packages & Disk Space", level: "Intermediate",
      blurb: "ps, top, kill, df, du and apt.",
      setup(w) { w.processes.push({ pid: 3333, user: "student", cpu: 0.0, mem: 0.1, cmd: "sleep 9999" }); },
      steps: [
        { teach: "`ps aux` lists every process with its owner, PID, CPU and memory use.", task: "List all processes.", hint: "ps aux",
          check: c => c.cmd === "ps" && c.args.length > 0, after: "The PID column is what you pass to kill." },
        { teach: "`top` shows live resource usage, sorted by CPU.", task: "Open top.", hint: "top",
          check: c => c.cmd === "top", after: "The load average and %Cpu lines quickly tell you whether the system is busy." },
        { teach: "`kill PID` politely asks a process to stop (SIGTERM). `kill -9` forces it (SIGKILL).", task: "Stop the sleep process (PID 3333).", hint: "kill 3333",
          check: c => !c.w.processes.some(p => p.pid === 3333), after: "Use `kill -9` only when a process ignores the normal request." },
        { teach: "`df -h` shows free space on each mounted file system in human-readable units.", task: "Check free disk space.", hint: "df -h",
          check: c => c.cmd === "df" && c.lower.includes("-h"), after: "" },
        { teach: "`du -sh` totals the space a folder uses.", task: "Show how much space /var/log uses.", hint: "du -sh /var/log",
          check: c => c.cmd === "du" && c.lower.includes("/var/log"), after: "Remember: df = disk free (whole file systems); du = disk usage (folders and files)." },
        { teach: "On Debian/Ubuntu, `apt` manages software. Refresh the package lists first; it needs sudo.", task: "Update the package lists.", hint: "sudo apt update",
          check: c => c.w.aptUpdated, after: "Red Hat/Fedora systems use `dnf` instead (dnf replaced yum)." },
        { teach: "", task: "Install the tree package.", hint: "sudo apt install tree",
          check: c => c.w.packages.installed.includes("tree"), after: "`sudo apt upgrade` installs available updates for everything." }
      ]
    },
    {
      id: "lx-net", os: "linux", title: "Linux Networking", level: "Intermediate",
      blurb: "ip, ping, dig, curl and traceroute.",
      steps: [
        { teach: "`ip addr` (or `ip a`) shows interfaces and their addresses. It replaces the older ifconfig.", task: "Show this server's IP addresses.", hint: "ip addr",
          check: c => c.w.flags.ipaddr, after: "`lo` is the loopback (127.0.0.1); eth0 is the real network card." },
        { teach: "`ip route` shows the routing table — the line starting `default via` is the gateway.", task: "Show the routing table.", hint: "ip route",
          check: c => c.w.flags.iproute, after: "" },
        { teach: "Linux ping runs forever until Ctrl+C. Use `-c` to set a count.", task: "Ping the gateway 3 times.", hint: "ping -c 3 192.168.1.1",
          check: c => c.cmd === "ping" && /-c\s+3\b/.test(c.line) && c.line.includes("192.168.1.1"), after: "" },
        { teach: "`dig` queries DNS and shows the full answer.", task: "Look up comptia.org.", hint: "dig comptia.org",
          check: c => c.cmd === "dig" && c.out.includes("ANSWER SECTION"), after: "" },
        { teach: "Add a record type to ask for something other than an A record.", task: "Look up comptia.org's mail servers (MX records).", hint: "dig comptia.org MX",
          check: c => c.cmd === "dig" && /\bmx\b/i.test(c.line) && c.out.includes("MX"), after: "`dig @8.8.8.8 name` asks a specific DNS server." },
        { teach: "`curl` fetches a URL from the command line. `-I` asks for headers only.", task: "Get only the HTTP headers from https://comptia.org.", hint: "curl -I https://comptia.org",
          check: c => c.cmd === "curl" && c.args.includes("-I") && c.out.includes("HTTP"), after: "A 200 status means OK; 404 = not found; 5xx = a server error." },
        { teach: "`traceroute` is the Linux equivalent of tracert.", task: "Trace the route to comptia.org.", hint: "traceroute comptia.org",
          check: c => c.cmd === "traceroute" && c.out.includes("104.18.30.99"), after: "" }
      ]
    },
    {
      id: "lx-edit", os: "linux", title: "Editing Files & Storage", level: "Advanced",
      blurb: "Edit with nano, then explore disks with lsblk, mount and /etc/fstab.",
      steps: [
        { teach: "`nano` is a beginner-friendly text editor. Type normally, press Ctrl+O then Enter to save (Write Out) and Ctrl+X to exit.", task: "Open todo.txt in nano, type a line, save and exit.", hint: "nano todo.txt",
          check: c => { const n = c.w.fs.get(["home", "student", "todo.txt"]); return !!n && n.content.trim().length > 0; }, after: "If you exit with unsaved changes, nano asks whether to save them (Y/N)." },
        { teach: "", task: "Check your saved text.", hint: "cat todo.txt",
          check: c => c.cmd === "cat" && c.lower.includes("todo"), after: "" },
        { teach: "`lsblk` lists block devices: disks and their partitions.", task: "List block devices.", hint: "lsblk",
          check: c => c.w.flags.lsblk, after: "Disks are named sda, sdb, … (or nvme0n1 for NVMe), and partitions add a number: sda1, sda2." },
        { teach: "`mount` with no arguments lists what's mounted where.", task: "Show the current mounts.", hint: "mount",
          check: c => c.cmd === "mount" && !c.args.length, after: "To attach a partition: `sudo mount /dev/sdb1 /mnt/usb`. To detach: `sudo umount /mnt/usb`." },
        { teach: "/etc/fstab lists the file systems to mount automatically at boot.", task: "Display /etc/fstab.", hint: "cat /etc/fstab",
          check: c => c.cmd === "cat" && c.lower.includes("fstab"), after: "Each line: device (often a UUID), mount point, type, options, dump and pass (fsck order)." },
        { teach: "System files need elevation to edit. Here you'll add a hosts entry so the name `intranet` resolves locally.", task: "Edit /etc/hosts and add the line: 192.168.1.25 intranet", hint: "sudo nano /etc/hosts",
          check: c => /^\s*192\.168\.1\.25\s+.*\bintranet\b/m.test(c.w.fs.get(["etc", "hosts"]).content), after: "" },
        { teach: "The hosts file is checked before DNS.", task: "Ping intranet once.", hint: "ping -c 1 intranet",
          check: c => c.cmd === "ping" && c.out.includes("192.168.1.25"), after: "Malware abuses the same mechanism to redirect sites — check the hosts file when a site resolves to the wrong address." }
      ]
    }
  ];

  // ======================================================================
  // Command Drill: read a task, type the command. `ok` gets the normalized line.
  // Windows lines are lowercased; quotes are stripped and spaces collapsed for both.
  // ======================================================================
  const re = r => n => r.test(n);
  const flagsAll = (n, cmd, letters) => {
    const t = n.split(" ");
    if (t[0] !== cmd) return false;
    const f = t.slice(1).join("").replace(/-/g, "");
    return f.length === letters.length && letters.split("").every(l => f.includes(l));
  };
  App.drills = {
    windows: [
      { q: "Show the full IP configuration, including DNS servers and the MAC address.", a: "ipconfig /all", ok: re(/^ipconfig \/all$/) },
      { q: "Release the PC's current DHCP lease.", a: "ipconfig /release", ok: re(/^ipconfig \/release$/) },
      { q: "Request a new DHCP lease.", a: "ipconfig /renew", ok: re(/^ipconfig \/renew$/) },
      { q: "Clear the DNS resolver cache.", a: "ipconfig /flushdns", ok: re(/^ipconfig \/flushdns$/) },
      { q: "Send exactly 2 pings to 192.168.1.1.", a: "ping -n 2 192.168.1.1", ok: re(/^ping (-n 2 192\.168\.1\.1|192\.168\.1\.1 -n 2)$/) },
      { q: "Ping 192.168.1.1 continuously until you stop it.", a: "ping -t 192.168.1.1", ok: re(/^ping (-t 192\.168\.1\.1|192\.168\.1\.1 -t)$/) },
      { q: "Show every router hop between this PC and comptia.org.", a: "tracert comptia.org", ok: re(/^tracert comptia\.org$/) },
      { q: "Show the route to comptia.org plus packet loss at each hop.", a: "pathping comptia.org", ok: re(/^pathping comptia\.org$/) },
      { q: "Look up comptia.org using the DNS server 8.8.8.8.", a: "nslookup comptia.org 8.8.8.8", ok: re(/^nslookup comptia\.org 8\.8\.8\.8$/) },
      { q: "List all connections and listening ports, numerically, with process IDs.", a: "netstat -ano", ok: n => flagsAll(n, "netstat", "ano") },
      { q: "Display this computer's name.", a: "hostname", ok: re(/^hostname$/) },
      { q: "Show which account you're signed in with.", a: "whoami", ok: re(/^whoami$/) },
      { q: "Show the Windows version and build number.", a: "winver", ok: re(/^(winver|ver)$/) },
      { q: "Reapply every Group Policy setting right now.", a: "gpupdate /force", ok: re(/^gpupdate \/force$/) },
      { q: "Show a summary of the Group Policy applied to you (RSoP).", a: "gpresult /r", ok: re(/^gpresult \/r$/) },
      { q: "Scan and repair protected Windows system files.", a: "sfc /scannow", ok: re(/^sfc \/scannow$/) },
      { q: "Check drive D: and fix any file system errors.", a: "chkdsk d: /f", ok: re(/^chkdsk d: \/[fr]$/) },
      { q: "Open the command-line disk partitioning tool.", a: "diskpart", ok: re(/^diskpart$/) },
      { q: "Quick-format drive E: as NTFS.", a: "format e: /fs:ntfs /q", ok: n => /^format e:( \/fs:ntfs| \/q){2}$/.test(n) && n.includes("/q") && n.includes("/fs:ntfs") },
      { q: "Copy C:\\Data to D:\\Data, including all subfolders, with the robust copy tool.", a: "robocopy C:\\Data D:\\Data /E", ok: re(/^robocopy c:\\data d:\\data \/(e|mir|s)$/) },
      { q: "Map drive S: to the share \\\\fileserver\\sales.", a: "net use S: \\\\fileserver\\sales", ok: re(/^net use s: \\\\fileserver\\sales$/) },
      { q: "Disconnect mapped drive S:.", a: "net use S: /delete", ok: re(/^net use s: \/d(elete)?$/) },
      { q: "List the shared folders on \\\\fileserver.", a: "net view \\\\fileserver", ok: re(/^net view \\\\fileserver$/) },
      { q: "Create a local user named sam with the password P@ss1.", a: "net user sam P@ss1 /add", ok: re(/^net user sam p@ss1 \/add$/) },
      { q: "Add the user sam to the local Administrators group.", a: "net localgroup administrators sam /add", ok: re(/^net localgroup administrators sam \/add$/) },
      { q: "Create a folder named Reports in the current directory.", a: "md Reports", ok: re(/^(md|mkdir) reports$/) },
      { q: "Delete the folder Old and everything inside it, without a prompt.", a: "rmdir /s /q Old", ok: n => /^(rmdir|rd)( \/s| \/q){2} old$|^(rmdir|rd) old( \/s| \/q){2}$/.test(n) && n.includes("/s") && n.includes("/q") },
      { q: "Display the help for the robocopy command.", a: "robocopy /?", ok: re(/^robocopy \/\?$/) },
      { q: "Move to the parent folder.", a: "cd ..", ok: re(/^(cd|chdir) ?\.\.$/) },
      { q: "List the files in the current folder.", a: "dir", ok: re(/^dir$/) }
    ],
    linux: [
      { q: "Print the directory you're currently in.", a: "pwd", ok: re(/^pwd$/) },
      { q: "List all files, including hidden ones, in long format.", a: "ls -la", ok: n => /^ls (-la|-al|-l -a|-a -l)$/.test(n) },
      { q: "Go to your home directory.", a: "cd ~", ok: re(/^cd( ~\/?)?$/) },
      { q: "Copy report.txt to report.bak.", a: "cp report.txt report.bak", ok: re(/^cp report\.txt report\.bak$/) },
      { q: "Rename draft.txt to final.txt.", a: "mv draft.txt final.txt", ok: re(/^mv draft\.txt final\.txt$/) },
      { q: "Delete the directory old and everything in it.", a: "rm -r old", ok: re(/^rm -(r|rf|fr|R) old\/?$/) },
      { q: "Make deploy.sh executable.", a: "chmod +x deploy.sh", ok: re(/^chmod ([ua]?\+x|7[0-7][0-7]) deploy\.sh$/) },
      { q: "Set script.sh to rwx for the owner, r-x for the group, and nothing for others.", a: "chmod 750 script.sh", ok: re(/^chmod 750 script\.sh$/) },
      { q: "Make www-data the owner of site.html (you'll need elevation).", a: "sudo chown www-data site.html", ok: re(/^sudo chown www-data(:www-data)? site\.html$/) },
      { q: "Refresh the package lists on Ubuntu.", a: "sudo apt update", ok: re(/^sudo apt(-get)? update$/) },
      { q: "Install the htop package on Ubuntu.", a: "sudo apt install htop", ok: re(/^sudo apt(-get)? install( -y)? htop( -y)?$/) },
      { q: "Install the htop package on Fedora or Red Hat.", a: "sudo dnf install htop", ok: re(/^sudo dnf install( -y)? htop( -y)?$/) },
      { q: "Show the system's network interfaces and IP addresses.", a: "ip addr", ok: re(/^ip (a|addr|address)( show)?$/) },
      { q: "Send exactly 4 pings to 8.8.8.8.", a: "ping -c 4 8.8.8.8", ok: re(/^ping (-c 4 8\.8\.8\.8|8\.8\.8\.8 -c 4)$/) },
      { q: "Look up the mail server (MX) records for comptia.org.", a: "dig comptia.org MX", ok: n => /^dig (comptia\.org mx|mx comptia\.org)$/i.test(n) },
      { q: "Fetch only the HTTP headers from https://comptia.org.", a: "curl -I https://comptia.org", ok: re(/^curl (-I|--head) https?:\/\/comptia\.org\/?$/) },
      { q: "Trace the route to comptia.org.", a: "traceroute comptia.org", ok: re(/^traceroute comptia\.org$/) },
      { q: "Show lines containing \"error\", in any case, in /var/log/syslog.", a: "grep -i error /var/log/syslog", ok: re(/^(sudo )?grep -i error \/var\/log\/syslog$/) },
      { q: "Find every file ending in .conf under /etc.", a: "find /etc -name \"*.conf\"", ok: re(/^(sudo )?find \/etc -i?name \*\.conf$/) },
      { q: "Show every running process.", a: "ps aux", ok: re(/^ps (aux|-ef|-aux)$/) },
      { q: "Show live CPU and memory use per process.", a: "top", ok: re(/^(top|htop)$/) },
      { q: "Show free space on all file systems in human-readable units.", a: "df -h", ok: re(/^df -h$/) },
      { q: "Show the total size of /var/log in human-readable units.", a: "du -sh /var/log", ok: re(/^(sudo )?du -(sh|hs) \/var\/log\/?$/) },
      { q: "Open the manual page for chmod.", a: "man chmod", ok: re(/^man chmod$/) },
      { q: "Print the contents of /etc/hosts.", a: "cat /etc/hosts", ok: re(/^cat \/etc\/hosts$/) },
      { q: "Edit /etc/hosts with nano (it needs elevation).", a: "sudo nano /etc/hosts", ok: re(/^sudo nano \/etc\/hosts$/) },
      { q: "Check and repair the file system on /dev/sdb1.", a: "sudo fsck /dev/sdb1", ok: re(/^sudo fsck( -y)? \/dev\/sdb1( -y)?$/) },
      { q: "Attach the partition /dev/sdb1 to the directory /mnt/usb.", a: "sudo mount /dev/sdb1 /mnt/usb", ok: re(/^sudo mount \/dev\/sdb1 \/mnt\/usb\/?$/) },
      { q: "Forcefully kill the process with PID 4242.", a: "kill -9 4242", ok: re(/^(sudo )?kill -(9|KILL|SIGKILL) 4242$/) },
      { q: "Start a root shell using sudo.", a: "sudo -i", ok: re(/^(sudo -i|sudo su( -)?|sudo -s)$/) }
    ]
  };
  App.normalizeDrill = (line, os) => {
    let n = line.trim().replace(/["']/g, "").replace(/\s+/g, " ");
    return os === "windows" ? n.toLowerCase() : n;
  };

  // ======================================================================
  // Command Guide (searchable reference shown beside the terminal).
  // ======================================================================
  App.commandGuide = {
    windows: [
      ["cd / chdir", "Show or change the current directory", ["cd Documents", "cd ..", "cd \\"]],
      ["dir", "List files and folders", ["dir", "dir /a", "dir C:\\Windows"]],
      ["md / mkdir", "Create a directory", ["md Reports"]],
      ["rmdir / rd", "Remove a directory (/s includes contents, /q skips prompts)", ["rmdir Reports", "rmdir /s /q Old"]],
      ["robocopy", "Robust copy of folder trees (/E subfolders, /MIR mirror, /Z restartable)", ["robocopy Documents C:\\Backup\\Docs /E"]],
      ["ipconfig", "Show/refresh IP settings", ["ipconfig", "ipconfig /all", "ipconfig /release", "ipconfig /renew", "ipconfig /flushdns"]],
      ["ping", "Test reachability (-n count, -t continuous)", ["ping 192.168.1.1", "ping -n 2 comptia.org"]],
      ["tracert", "List every hop to a destination", ["tracert comptia.org"]],
      ["pathping", "Route plus per-hop packet loss", ["pathping comptia.org"]],
      ["nslookup", "Query DNS directly (optionally a specific server)", ["nslookup comptia.org", "nslookup comptia.org 8.8.8.8"]],
      ["netstat", "Connections and ports (-a all, -n numeric, -o PID, -b program)", ["netstat -ano", "netstat -r"]],
      ["hostname", "Show the computer name", ["hostname"]],
      ["whoami", "Show the signed-in user (/groups, /priv)", ["whoami", "whoami /groups"]],
      ["winver", "Show the Windows version and build", ["winver"]],
      ["net user", "List, view, add or disable local accounts", ["net user", "net user student", "net user sam P@ss1 /add"]],
      ["net localgroup", "View or change local group membership", ["net localgroup administrators"]],
      ["net view", "List network computers or a server's shares", ["net view", "net view \\\\fileserver"]],
      ["net use", "Map, list or remove network drives", ["net use S: \\\\fileserver\\sales", "net use", "net use S: /delete"]],
      ["gpupdate", "Refresh Group Policy (/force reapplies everything)", ["gpupdate /force"]],
      ["gpresult", "Show applied Group Policy (/r summary)", ["gpresult /r"]],
      ["sfc", "System File Checker: repair protected OS files", ["sfc /scannow"]],
      ["chkdsk", "Check a volume (/f fix, /r bad sectors)", ["chkdsk", "chkdsk /f"]],
      ["diskpart", "Partition disks (list disk, select, create, format, assign)", ["diskpart"]],
      ["format", "Format a volume (/fs:NTFS, /q quick)", ["format E: /fs:NTFS /q"]],
      ["notepad", "Edit a text file", ["notepad C:\\Windows\\System32\\drivers\\etc\\hosts"]],
      ["[command] /?", "Help for any command", ["ipconfig /?"]]
    ],
    linux: [
      ["pwd", "Print the working directory", ["pwd"]],
      ["ls", "List files (-l long, -a hidden, -h human sizes)", ["ls", "ls -la"]],
      ["cd", "Change directory (~ home, .. up, / root)", ["cd /etc", "cd ~"]],
      ["cat", "Print a file", ["cat /etc/hosts"]],
      ["cp / mv / rm", "Copy, move/rename, delete (-r for directories)", ["cp notes.txt notes.bak", "mv a.txt b.txt", "rm -r oldfolder"]],
      ["mkdir / touch", "Create a directory / an empty file", ["mkdir lab", "touch file.txt"]],
      ["chmod", "Change permissions (r=4 w=2 x=1)", ["chmod 755 scripts/hello.sh", "chmod +x scripts/hello.sh"]],
      ["chown", "Change owner (and group)", ["sudo chown root notes.txt"]],
      ["sudo / su", "Run one command as root / switch user", ["sudo apt update", "sudo -i"]],
      ["apt / dnf", "Package managers: Debian/Ubuntu / Red Hat/Fedora", ["sudo apt install htop"]],
      ["grep", "Search text (-i case, -r recursive, -n line numbers, -v invert)", ["sudo grep -i error /var/log/syslog"]],
      ["find", "Find files by name, type or size", ["find /etc -name \"*.conf\""]],
      ["ps / top", "Process snapshot / live view", ["ps aux", "top"]],
      ["kill", "Signal a process (-9 forces it)", ["kill 1234", "kill -9 1234"]],
      ["df / du", "Free space per file system / space used by folders", ["df -h", "du -sh /var/log"]],
      ["ip", "Addresses and routes (replaces ifconfig)", ["ip addr", "ip route"]],
      ["ping", "Test reachability (-c count)", ["ping -c 4 8.8.8.8"]],
      ["dig", "DNS lookups (@server, record type)", ["dig comptia.org", "dig comptia.org MX", "dig @8.8.8.8 comptia.org"]],
      ["curl", "Fetch a URL (-I headers only)", ["curl https://comptia.org", "curl -I https://comptia.org"]],
      ["traceroute", "Trace the path to a host", ["traceroute comptia.org"]],
      ["nano", "Simple text editor (Ctrl+O save, Ctrl+X exit)", ["nano notes.txt"]],
      ["lsblk / mount / umount", "List disks, attach and detach file systems", ["lsblk", "mount", "sudo mount /dev/sdb1 /mnt/usb"]],
      ["fsck", "Check and repair an unmounted file system", ["sudo fsck -y /dev/sdb1"]],
      ["systemctl", "Manage services (status, restart, enable)", ["systemctl status nginx", "sudo systemctl restart nginx"]],
      ["man", "Manual pages", ["man grep"]],
      ["Pipes & redirects", "| chains commands; > writes a file; >> appends", ["ps aux | grep nginx", "echo hi > hi.txt"]]
    ]
  };
})();
