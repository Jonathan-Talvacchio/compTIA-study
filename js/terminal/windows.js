/* Simulated Windows Command Prompt (cmd.exe) for A+ Core 2 objective 1.2-style practice. */
(function () {
  const VFS = App.VFS;
  const R = App.rand;

  // ---------- Default world ----------
  App.defaultWindowsWorld = function () {
    return {
      os: "windows",
      fs: new VFS({
        Users: {
          student: {
            Desktop: { "todo.txt": "1. Fix the printer\r\n2. Call Dana back about VPN\r\n3. Study for A+!" },
            Documents: {
              "budget.xlsx": "[binary spreadsheet data]",
              "notes.txt": "Ports to remember: 22 SSH, 25 SMTP, 53 DNS, 3389 RDP",
              Projects: { "readme.txt": "Project files." }
            },
            Downloads: { "setup.exe": "MZ[binary]" },
            Pictures: {}
          },
          Public: {}
        },
        Windows: { System32: { drivers: { etc: { hosts: "# Copyright (c) Microsoft Corp.\r\n#\r\n# localhost name resolution is handled within DNS itself.\r\n#\t127.0.0.1       localhost\r\n#\t::1             localhost" } } }, Temp: {} },
        "Program Files": { "Common Files": {} },
        Backup: {}
      }, { caseInsensitive: true }),
      drive: "C:",
      cwd: ["Users", "student"],
      user: "student",
      domain: "CORP",
      hostname: "WS-FRONTDESK01",
      admin: true,
      net: {
        adapter: "Ethernet", ip: "192.168.1.57", mask: "255.255.255.0", gw: "192.168.1.1", dns: ["192.168.1.10", "8.8.8.8"],
        mac: "3C-52-82-4A-19-E7", dhcp: true, dhcpServer: "192.168.1.10", suffix: "corp.local", internet: true, dnsWorks: true
      },
      dhcpAvailable: true,
      hosts: { "192.168.1.1": "router", "192.168.1.10": "dc01", "192.168.1.20": "fileserver", "192.168.1.30": "printer01" },
      dnsTable: {
        "comptia.org": "104.18.30.99", "www.comptia.org": "104.18.30.99", "google.com": "142.250.72.14", "www.google.com": "142.250.72.14",
        "microsoft.com": "20.70.246.20", "dc01": "192.168.1.10", "dc01.corp.local": "192.168.1.10", "fileserver": "192.168.1.20",
        "fileserver.corp.local": "192.168.1.20", "printer01": "192.168.1.30", "router": "192.168.1.1", "intranet.corp.local": "192.168.1.25"
      },
      route: ["192.168.1.1", "10.20.0.1", "68.85.112.33", "96.110.40.13", "104.18.30.99"],
      routeBreakAt: null,
      dnsCache: ["intranet.corp.local", "fileserver.corp.local"],
      processes: [
        { name: "System Idle Process", pid: 0, session: "Services", mem: 8 },
        { name: "System", pid: 4, session: "Services", mem: 152 },
        { name: "smss.exe", pid: 412, session: "Services", mem: 1240 },
        { name: "csrss.exe", pid: 604, session: "Services", mem: 5880 },
        { name: "wininit.exe", pid: 688, session: "Services", mem: 6912 },
        { name: "services.exe", pid: 768, session: "Services", mem: 11204 },
        { name: "lsass.exe", pid: 784, session: "Services", mem: 24308 },
        { name: "svchost.exe", pid: 920, session: "Services", mem: 31420 },
        { name: "spoolsv.exe", pid: 2348, session: "Services", mem: 13020 },
        { name: "MsMpEng.exe", pid: 3016, session: "Services", mem: 212480 },
        { name: "explorer.exe", pid: 5124, session: "Console", mem: 128540 },
        { name: "OUTLOOK.EXE", pid: 6212, session: "Console", mem: 245980 },
        { name: "msedge.exe", pid: 7020, session: "Console", mem: 188300 },
        { name: "cmd.exe", pid: 8840, session: "Console", mem: 4920 },
        { name: "conhost.exe", pid: 8852, session: "Console", mem: 13400 }
      ],
      connections: [
        ["TCP", "0.0.0.0:135", "0.0.0.0:0", "LISTENING", 920],
        ["TCP", "0.0.0.0:445", "0.0.0.0:0", "LISTENING", 4],
        ["TCP", "192.168.1.57:49702", "192.168.1.10:389", "ESTABLISHED", 784],
        ["TCP", "192.168.1.57:49811", "52.96.165.18:443", "ESTABLISHED", 6212],
        ["TCP", "192.168.1.57:49855", "142.250.72.14:443", "ESTABLISHED", 7020],
        ["UDP", "0.0.0.0:5353", "*:*", "", 7020]
      ],
      users: {
        Administrator: { full: "", active: false, groups: ["Administrators"] },
        Guest: { full: "", active: false, groups: ["Guests"] },
        student: { full: "Student Tech", active: true, groups: ["Administrators", "Users"] }
      },
      groups: ["Administrators", "Users", "Guests", "Remote Desktop Users", "Backup Operators", "Power Users"],
      mapped: {},
      shares: { "ADMIN$": "C:\\Windows", "C$": "C:\\", "IPC$": "" },
      services: { Spooler: "Running", wuauserv: "Running", WinDefend: "Running", Dhcp: "Running", Dnscache: "Running", W32Time: "Running" },
      gpo: { computer: ["Default Domain Policy", "Workstation Security Baseline"], user: ["Default Domain Policy"], pending: [] },
      sfcCorrupt: false,
      disks: [
        { num: 0, size: 476, status: "Online", gpt: true, partitions: [
          { size: 0.1, type: "System", fs: "FAT32", label: "", letter: "" },
          { size: 475, type: "Primary", fs: "NTFS", label: "Windows", letter: "C" },
          { size: 0.9, type: "Recovery", fs: "NTFS", label: "", letter: "" }] }
      ],
      dp: { disk: null, part: null },
      flags: {}
    };
  };

  function cwdStr(w, segs) { return w.drive + "\\" + (segs || w.cwd).join("\\"); }
  function parsePath(w, p) {
    p = p.replace(/\//g, "\\");
    let abs = false;
    if (/^[a-z]:/i.test(p)) {
      if (p.slice(0, 2).toUpperCase() !== w.drive) return null;
      p = p.slice(2); abs = true;
    }
    if (p.startsWith("\\")) abs = true;
    return w.fs.norm(w.cwd, p.split("\\"), abs);
  }
  function fmtDate() {
    const d = new Date();
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}  ${String(((d.getHours() + 11) % 12) + 1).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} ${d.getHours() < 12 ? "AM" : "PM"}`;
  }
  const num = n => n.toLocaleString("en-US");
  function needAdmin(io, w) {
    if (w.admin) return false;
    io.out("Access is denied. (Run Command Prompt as administrator.)", "t-err");
    return true;
  }
  function isLocal(w, ip) { return w.net.ip && ip.split(".").slice(0, 3).join(".") === w.net.ip.split(".").slice(0, 3).join("."); }
  function apipa(w) { return !w.net.ip || w.net.ip.startsWith("169.254."); }
  function resolve(w, name) {
    if (/^\d+\.\d+\.\d+\.\d+$/.test(name)) return name;
    if (apipa(w) || !w.net.dnsWorks) return null;
    return w.dnsTable[name.toLowerCase()] || null;
  }
  function reachable(w, ip) {
    if (apipa(w)) return false;
    if (ip === "127.0.0.1" || ip === w.net.ip) return true;
    if (isLocal(w, ip)) return !!w.hosts[ip];
    return w.net.internet && w.routeBreakAt == null;
  }

  // ---------- Help text ----------
  const HELP = {
    cd: "Displays the name of or changes the current directory.\n\nCD [/D] [drive:][path]\nCD [..]\n\n  ..   Specifies that you want to change to the parent directory.",
    dir: "Displays a list of files and subdirectories in a directory.\n\nDIR [drive:][path][filename] [/A] [/S] [/W]",
    md: "Creates a directory.\n\nMKDIR [drive:]path\nMD [drive:]path",
    rmdir: "Removes (deletes) a directory.\n\nRMDIR [/S] [/Q] [drive:]path\n\n  /S  Removes all directories and files in the specified directory.\n  /Q  Quiet mode, do not ask if ok to remove a directory tree with /S",
    copy: "Copies one or more files to another location.\n\nCOPY source destination",
    xcopy: "Copies files and directory trees.\n\nXCOPY source [destination] [/S] [/E] [/H] [/Y]\n\n  /S  Copies directories and subdirectories except empty ones.\n  /E  Copies directories and subdirectories, including empty ones.",
    robocopy: "Robust File Copy for Windows\n\nROBOCOPY source destination [file [file]...] [options]\n\n  /E    copy subdirectories, including empty ones.\n  /MIR  MIRror a directory tree (equivalent to /E plus /PURGE).\n  /MOV  MOVe files (delete from source after copying).\n  /Z    copy files in restartable mode.",
    ipconfig: "USAGE:\n    ipconfig [/allcompartments] [/? | /all | /renew [adapter] | /release [adapter] |\n              /flushdns | /displaydns | /registerdns]\n\n    /all       Display full configuration information.\n    /release   Release the IPv4 address for the specified adapter.\n    /renew     Renew the IPv4 address for the specified adapter.\n    /flushdns  Purges the DNS Resolver cache.\n    /displaydns Display the contents of the DNS Resolver Cache.",
    ping: "Usage: ping [-t] [-n count] [-l size] [-4] [-6] target_name\n\n    -t   Ping the specified host until stopped.\n    -n   Number of echo requests to send.\n    -l   Send buffer size.",
    tracert: "Usage: tracert [-d] [-h maximum_hops] target_name\n\n    -d   Do not resolve addresses to hostnames.\n    -h   Maximum number of hops to search for target.",
    pathping: "Usage: pathping [-n] [-h maximum_hops] target_name\n\nCombines ping and tracert: shows the route and packet loss at each hop.",
    nslookup: "Usage:\n   nslookup [-option] [name | -] [server]\n\nQueries DNS servers. Example: nslookup comptia.org 8.8.8.8",
    netstat: "Displays protocol statistics and current TCP/IP network connections.\n\nNETSTAT [-a] [-b] [-n] [-o] [-r]\n\n  -a  Displays all connections and listening ports.\n  -b  Displays the executable involved in creating each connection (requires elevation).\n  -n  Displays addresses and port numbers in numerical form.\n  -o  Displays the owning process ID associated with each connection.\n  -r  Displays the routing table.",
    net: "The syntax of this command is:\n\nNET\n    [ ACCOUNTS | COMPUTER | CONFIG | CONTINUE | FILE | GROUP | HELP |\n      HELPMSG | LOCALGROUP | PAUSE | SESSION | SHARE | START |\n      STATISTICS | STOP | TIME | USE | USER | VIEW ]",
    gpupdate: "Updates Group Policy settings.\n\nGPUPDATE [/Target:{Computer | User}] [/Force] [/Boot] [/Logoff]\n\n  /Force  Reapplies all policy settings. By default, only policy settings that have changed are applied.",
    gpresult: "Displays the Resultant Set of Policy (RSoP) information for a target user and computer.\n\nGPRESULT [/S system] [/USER username] [/SCOPE {USER|COMPUTER}] {/R | /V | /Z | /H filename}\n\n  /R  Displays RSoP summary data.\n  /V  Verbose.  /H  Saves the report in HTML format.",
    sfc: "Microsoft (R) Windows (R) Resource Checker\n\nSFC [/SCANNOW] [/VERIFYONLY] [/SCANFILE=<file>]\n\n/SCANNOW     Scans integrity of all protected system files and repairs files with problems when possible.\n/VERIFYONLY  Scans integrity of all protected system files. No repair operation is performed.",
    chkdsk: "Checks a disk and displays a status report.\n\nCHKDSK [volume] [/F] [/R] [/X] [/scan]\n\n  /F  Fixes errors on the disk.\n  /R  Locates bad sectors and recovers readable information (implies /F).\n  /X  Forces the volume to dismount first if necessary.",
    diskpart: "Microsoft DiskPart — disk partitioning command interpreter.\nType DISKPART to enter it, then HELP for its commands (list disk, select disk, clean, create partition primary, format, assign, exit).",
    format: "Formats a disk for use with Windows.\n\nFORMAT volume [/FS:file-system] [/V:label] [/Q]\n\n  /FS:filesystem  Specifies the type of the file system (FAT, FAT32, exFAT, NTFS, UDF, ReFS).\n  /Q              Performs a quick format.",
    shutdown: "Usage: shutdown [/i | /l | /s | /r | /g | /a | /p | /h | /e | /o] [/f] [/t xxx]\n\n    /s  Shutdown the computer.\n    /r  Full shutdown and restart the computer.\n    /a  Abort a system shutdown.\n    /t xxx  Set the time-out period before shutdown to xxx seconds.\n    /f  Force running applications to close.",
    tasklist: "TASKLIST [/S system] [/SVC] [/V] [/FI filter] [/FO format]\n\nDisplays a list of currently running processes.",
    taskkill: "TASKKILL [/S system] { [/FI filter] [/PID processid | /IM imagename] } [/T] [/F]\n\n  /PID  Specifies the PID of the process to be terminated.\n  /IM   Specifies the image name of the process to be terminated.\n  /T    Terminates the specified process and any child processes.\n  /F    Specifies to forcefully terminate the process(es).",
    hostname: "Prints the name of the current host.\n\nhostname",
    whoami: "WhoAmI displays user, group and privileges information for the user who is currently logged on.\n\nWHOAMI [/UPN | /FQDN | /USER | /GROUPS | /PRIV | /ALL]",
    winver: "Shows the Windows version and build (About Windows dialog).",
    systeminfo: "Displays detailed configuration information about a computer and its operating system.",
    dism: "Deployment Image Servicing and Management tool.\n\nDISM /Online /Cleanup-Image {/CheckHealth | /ScanHealth | /RestoreHealth}",
    type: "Displays the contents of a text file.\n\nTYPE [drive:][path]filename",
    del: "Deletes one or more files.\n\nDEL [/P] [/F] [/S] [/Q] names",
    ren: "Renames a file or files.\n\nRENAME [drive:][path]filename1 filename2.",
    move: "Moves files and renames files and directories.\n\nMOVE [/Y] source destination",
    echo: "Displays messages.\n\nECHO [message]",
    cls: "Clears the screen.",
    tree: "Graphically displays the folder structure of a drive or path.\n\nTREE [drive:][path] [/F]",
    help: "Provides Help information for Windows commands."
  };
  HELP.mkdir = HELP.md; HELP.rd = HELP.rmdir; HELP.chdir = HELP.cd; HELP.erase = HELP.del; HELP.rename = HELP.ren;

  const COMMANDS = ["cd", "chdir", "cls", "copy", "del", "dir", "diskpart", "dism", "echo", "erase", "exit", "format", "gpresult", "gpupdate", "help",
    "hostname", "ipconfig", "md", "mkdir", "move", "net", "netstat", "nslookup", "pathping", "ping", "rd", "ren", "rename", "rmdir", "robocopy",
    "sfc", "chkdsk", "shutdown", "systeminfo", "taskkill", "tasklist", "tracert", "tree", "type", "ver", "whoami", "winver", "xcopy"];

  // ---------- Commands ----------
  const C = {};

  C.help = (a, io) => {
    io.out("For more information on a specific command, type COMMAND /?\n");
    const rows = [
      ["CD", "Displays the name of or changes the current directory."], ["CHKDSK", "Checks a disk and displays a status report."],
      ["CLS", "Clears the screen."], ["COPY", "Copies one or more files to another location."], ["DEL", "Deletes one or more files."],
      ["DIR", "Displays a list of files and subdirectories in a directory."], ["DISKPART", "Displays or configures Disk Partition properties."],
      ["DISM", "Deployment Image Servicing and Management tool."], ["FORMAT", "Formats a disk for use with Windows."],
      ["GPRESULT", "Displays Group Policy information for machine or user."], ["GPUPDATE", "Updates Group Policy settings."],
      ["HOSTNAME", "Prints the name of the current host."], ["IPCONFIG", "Displays and manages IP configuration."],
      ["MD", "Creates a directory."], ["MOVE", "Moves one or more files."], ["NET", "Manages users, groups, shares, services and drive mappings."],
      ["NETSTAT", "Displays active connections and listening ports."], ["NSLOOKUP", "Queries DNS."], ["PATHPING", "Route + packet loss per hop."],
      ["PING", "Tests connectivity with ICMP echo."], ["RD", "Removes a directory."], ["REN", "Renames a file or files."],
      ["ROBOCOPY", "Advanced utility to copy files and directory trees."], ["SFC", "System File Checker."], ["SHUTDOWN", "Shut down or restart the computer."],
      ["SYSTEMINFO", "Displays machine specific properties and configuration."], ["TASKKILL", "Kill or stop a running process or application."],
      ["TASKLIST", "Displays all currently running tasks."], ["TRACERT", "Traces the route to a host."], ["TREE", "Displays folder structure."],
      ["TYPE", "Displays the contents of a text file."], ["VER", "Displays the Windows version."], ["WHOAMI", "Displays the current user."],
      ["WINVER", "Shows the Windows version dialog."], ["XCOPY", "Copies files and directory trees."]
    ];
    rows.forEach(([c, d]) => io.out(c.padEnd(14) + d));
  };
  C.cls = (a, io) => io.clear();
  C.ver = (a, io) => io.out("\nMicrosoft Windows [Version 10.0.26100.2033]");
  C.winver = (a, io) => io.out("(About Windows)\nMicrosoft Windows\nVersion 24H2 (OS Build 26100.2033)\nWindows 11 Pro\n© Microsoft Corporation. All rights reserved.", "t-info");
  C.hostname = (a, io, w) => io.out(w.hostname);
  C.whoami = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    if (f.includes("/groups") || f.includes("/all")) {
      io.out(`\nUSER INFORMATION\n----------------\nUser Name\n${"=".repeat(20)}\n${w.domain.toLowerCase()}\\${w.user}\n\nGROUP INFORMATION\n-----------------`);
      (w.users[w.user] ? w.users[w.user].groups : ["Users"]).forEach(g => io.out(`BUILTIN\\${g}`));
      io.out("NT AUTHORITY\\Authenticated Users\nCORP\\Domain Users" + (w.flags.salesGroup ? "\nCORP\\Sales" : ""));
      return;
    }
    if (f.includes("/priv")) { io.out("\nPRIVILEGES INFORMATION\n----------------------\nSeShutdownPrivilege           Shut down the system         " + (w.admin ? "Enabled" : "Disabled") + "\nSeChangeNotifyPrivilege       Bypass traverse checking     Enabled"); return; }
    io.out(`${w.domain.toLowerCase()}\\${w.user}`);
  };
  C.echo = (a, io) => io.out(a.length ? a.join(" ") : "ECHO is on.");
  C.exit = (a, io) => io.out("(Simulator) The window stays open — pick another mission or keep practicing.", "t-dim");

  // --- File system ---
  C.cd = C.chdir = (a, io, w) => {
    const args = a.filter(x => x.toLowerCase() !== "/d");
    if (!args.length) { io.out(cwdStr(w)); return; }
    const target = args.join(" ");
    const p = parsePath(w, target);
    if (!p) { io.out("The system cannot find the drive specified.", "t-err"); return; }
    const node = w.fs.get(p);
    if (!node || node.type !== "dir") { io.out("The system cannot find the path specified.", "t-err"); return; }
    w.cwd = w.fs.realPath(p);
  };
  C.dir = (a, io, w) => {
    const args = a.filter(x => !x.startsWith("/"));
    const p = args.length ? parsePath(w, args.join(" ")) : w.cwd;
    const node = p && w.fs.get(p);
    io.out(" Volume in drive C is Windows\n Volume Serial Number is 6C1E-2F0A\n");
    if (!node) { io.out(" Directory of " + cwdStr(w) + "\n\nFile Not Found", "t-err"); return; }
    if (node.type === "file") { io.out(` Directory of ${cwdStr(w, w.fs.realPath(p).slice(0, -1))}\n`); io.out(`${fmtDate()}    ${String(num(node.content.length)).padStart(14)} ${node.name}`); return; }
    io.out(` Directory of ${cwdStr(w, w.fs.realPath(p))}\n`);
    let files = 0, dirs = 0, bytes = 0;
    if (p.length) { io.out(`${fmtDate()}    <DIR>          .`); io.out(`${fmtDate()}    <DIR>          ..`); dirs += 2; }
    for (const c of Object.values(node.children)) {
      if (c.type === "dir") { dirs++; io.out(`${fmtDate()}    <DIR>          ${c.name}`); }
      else { files++; bytes += c.content.length; io.out(`${fmtDate()}    ${num(c.content.length).padStart(14)} ${c.name}`); }
    }
    io.out(`${String(files).padStart(16)} File(s) ${num(bytes).padStart(14)} bytes\n${String(dirs).padStart(16)} Dir(s)  ${num(214748364800)} bytes free`);
  };
  C.tree = (a, io, w) => {
    const showFiles = a.some(x => x.toLowerCase() === "/f");
    const args = a.filter(x => !x.startsWith("/"));
    const p = args.length ? parsePath(w, args.join(" ")) : w.cwd;
    const node = p && w.fs.get(p);
    if (!node || node.type !== "dir") { io.out("Invalid path - " + (args[0] || ""), "t-err"); return; }
    io.out("Folder PATH listing for volume Windows\nVolume serial number is 6C1E-2F0A\n" + cwdStr(w, w.fs.realPath(p)));
    (function walk(n, pre) {
      const kids = Object.values(n.children);
      const ds = kids.filter(k => k.type === "dir"), fs = kids.filter(k => k.type === "file");
      if (showFiles) fs.forEach(f => io.out(pre + (ds.length ? "│   " : "    ") + f.name));
      ds.forEach((d, i) => { const last = i === ds.length - 1; io.out(pre + (last ? "└───" : "├───") + d.name); walk(d, pre + (last ? "    " : "│   ")); });
    })(node, "");
  };
  C.md = C.mkdir = (a, io, w) => {
    if (!a.length) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const p = parsePath(w, a.join(" "));
    // create intermediate dirs like Windows does
    for (let i = 1; i <= p.length; i++) {
      const sub = p.slice(0, i);
      const n = w.fs.get(sub);
      if (n && n.type === "file") { io.out("A subdirectory or file " + a.join(" ") + " already exists.", "t-err"); return; }
      if (!n) w.fs.mkdir(sub);
      else if (i === p.length) { io.out("A subdirectory or file " + a.join(" ") + " already exists.", "t-err"); return; }
    }
  };
  C.rd = C.rmdir = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const args = a.filter(x => !x.startsWith("/"));
    if (!args.length) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const p = parsePath(w, args.join(" "));
    const n = w.fs.get(p);
    if (!n || n.type !== "dir") { io.out("The system cannot find the file specified.", "t-err"); return; }
    if (Object.keys(n.children).length && !f.includes("/s")) { io.out("The directory is not empty.", "t-err"); return; }
    if (w.cwd.join("\\").toLowerCase().startsWith(w.fs.realPath(p).join("\\").toLowerCase())) { io.out("The process cannot access the file because it is being used by another process.", "t-err"); return; }
    w.fs.remove(p);
  };
  C.type = (a, io, w) => {
    const p = a.length && parsePath(w, a.join(" "));
    const n = p && w.fs.get(p);
    if (!n) { io.out("The system cannot find the file specified.", "t-err"); return; }
    if (n.type === "dir") { io.out("Access is denied.", "t-err"); return; }
    io.out(n.content);
  };
  C.del = C.erase = (a, io, w) => {
    const args = a.filter(x => !x.startsWith("/"));
    if (!args.length) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const p = parsePath(w, args.join(" "));
    const last = p[p.length - 1];
    const dir = w.fs.get(p.slice(0, -1));
    if (/[*?]/.test(last) && dir) {
      const re = VFS.globToRe(last, true);
      const hits = Object.values(dir.children).filter(c => c.type === "file" && re.test(c.name));
      if (!hits.length) { io.out("Could Not Find " + cwdStr(w, p), "t-err"); return; }
      hits.forEach(c => delete dir.children[c.name]);
      return;
    }
    const n = w.fs.get(p);
    if (!n) { io.out("Could Not Find " + cwdStr(w, p), "t-err"); return; }
    if (n.type === "dir") { Object.keys(n.children).forEach(k => { if (n.children[k].type === "file") delete n.children[k]; }); return; }
    w.fs.remove(p);
  };
  C.ren = C.rename = (a, io, w) => {
    if (a.length < 2) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const p = parsePath(w, a[0]);
    const n = w.fs.get(p);
    if (!n) { io.out("The system cannot find the file specified.", "t-err"); return; }
    const parent = w.fs.parentOf(p);
    if (w.fs.child(parent, a[1])) { io.out("A duplicate file name exists, or the file cannot be found.", "t-err"); return; }
    delete parent.children[n.name];
    n.name = a[1];
    parent.children[a[1]] = n;
  };
  function copyNode(n) { return JSON.parse(JSON.stringify(n)); }
  function place(w, srcNode, destPath, io) {
    const dn = w.fs.get(destPath);
    let parent, name;
    if (dn && dn.type === "dir") { parent = dn; name = srcNode.name; }
    else { parent = w.fs.parentOf(destPath); name = destPath[destPath.length - 1]; }
    if (!parent || parent.type !== "dir") { io.out("The system cannot find the path specified.", "t-err"); return false; }
    const c = copyNode(srcNode); c.name = name;
    parent.children[name] = c;
    return true;
  }
  C.copy = (a, io, w) => {
    const args = a.filter(x => !x.startsWith("/"));
    if (args.length < 2) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const sp = parsePath(w, args[0]);
    const last = sp[sp.length - 1];
    const dir = w.fs.get(sp.slice(0, -1));
    let srcs = [];
    if (/[*?]/.test(last) && dir) { const re = VFS.globToRe(last, true); srcs = Object.values(dir.children).filter(c => c.type === "file" && re.test(c.name)); }
    else { const n = w.fs.get(sp); if (n && n.type === "file") srcs = [n]; else if (n) srcs = Object.values(n.children).filter(c => c.type === "file"); }
    if (!srcs.length) { io.out("The system cannot find the file specified.", "t-err"); return; }
    let ok = 0;
    for (const s of srcs) if (place(w, s, parsePath(w, args[1]), io)) { ok++; if (srcs.length > 1) io.out(s.name); }
    io.out(`        ${ok} file(s) copied.`);
  };
  C.move = (a, io, w) => {
    const args = a.filter(x => !x.startsWith("/"));
    if (args.length < 2) { io.out("The syntax of the command is incorrect.", "t-err"); return; }
    const sp = parsePath(w, args[0]);
    const n = w.fs.get(sp);
    if (!n) { io.out("The system cannot find the file specified.", "t-err"); return; }
    if (place(w, n, parsePath(w, args[1]), io)) { w.fs.remove(sp); io.out(`        1 file(s) moved.`); }
  };
  C.xcopy = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const args = a.filter(x => !x.startsWith("/"));
    if (args.length < 2) { io.out("Invalid number of parameters", "t-err"); return; }
    const src = w.fs.get(parsePath(w, args[0]));
    if (!src) { io.out("File not found - " + args[0], "t-err"); return; }
    const dp = parsePath(w, args[1]);
    if (!w.fs.get(dp)) w.fs.mkdir(dp);
    const dest = w.fs.get(dp);
    let count = 0;
    const recurse = f.includes("/s") || f.includes("/e");
    (function cp(from, to, rel) {
      for (const c of Object.values(from.children)) {
        if (c.type === "file") { to.children[c.name] = copyNode(c); count++; io.out(cwdStr(w, parsePath(w, args[0])) + "\\" + rel + c.name); }
        else if (recurse) {
          if (!f.includes("/e") && !Object.keys(c.children).length) continue;
          to.children[c.name] = to.children[c.name] || { type: "dir", name: c.name, children: {}, mode: c.mode, owner: c.owner };
          cp(c, to.children[c.name], rel + c.name + "\\");
        }
      }
    })(src.type === "dir" ? src : { children: { [src.name]: src } }, dest, "");
    io.out(`${count} File(s) copied`);
  };
  C.robocopy = async (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const args = a.filter(x => !x.startsWith("/"));
    io.out("\n-------------------------------------------------------------------------------\n   ROBOCOPY     ::     Robust File Copy for Windows\n-------------------------------------------------------------------------------\n");
    if (args.length < 2) { io.out("ERROR : Invalid Parameter #1 — usage: ROBOCOPY source destination [options]", "t-err"); return; }
    const sp = parsePath(w, args[0]);
    const src = w.fs.get(sp);
    io.out(`  Started : ${new Date().toString().slice(0, 24)}\n   Source : ${cwdStr(w, sp)}\\\n     Dest : ${cwdStr(w, parsePath(w, args[1]))}\\\n\n    Files : *.*\n  Options : *.* ${f.filter(x => x.startsWith("/")).map(x => x.toUpperCase()).join(" ")} /DCOPY:DA /COPY:DAT /R:1000000 /W:30\n\n------------------------------------------------------------------------------\n`);
    if (!src || src.type !== "dir") { io.out(`ERROR 2 (0x00000002) Accessing Source Directory ${cwdStr(w, sp)}\\\nThe system cannot find the file specified.`, "t-err"); return; }
    const dp = parsePath(w, args[1]);
    if (!w.fs.get(dp)) w.fs.mkdir(dp);
    const dest = w.fs.get(dp);
    const recurse = f.includes("/e") || f.includes("/mir") || f.includes("/s");
    let files = 0, dirs = 1, bytes = 0;
    async function cp(from, to) {
      for (const c of Object.values(from.children)) {
        if (c.type === "file") { to.children[c.name] = copyNode(c); files++; bytes += c.content.length; io.out(`\t    New File  \t\t${c.content.length}\t${c.name}`); await io.sleep(60); }
        else if (recurse) { dirs++; to.children[c.name] = to.children[c.name] || { type: "dir", name: c.name, children: {}, mode: c.mode, owner: c.owner }; await cp(c, to.children[c.name]); }
      }
    }
    await cp(src, dest);
    if (f.includes("/mir")) for (const k of Object.keys(dest.children)) if (!src.children[k]) delete dest.children[k];
    if (f.includes("/mov")) for (const k of Object.keys(src.children)) if (src.children[k].type === "file") delete src.children[k];
    io.out("\n------------------------------------------------------------------------------\n\n               Total    Copied   Skipped  Mismatch    FAILED    Extras");
    io.out(`    Dirs :  ${String(dirs).padStart(10)}${String(dirs - 1).padStart(10)}${"1".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}`);
    io.out(`   Files :  ${String(files).padStart(10)}${String(files).padStart(10)}${"0".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}`);
    io.out(`   Bytes :  ${String(bytes).padStart(10)}${String(bytes).padStart(10)}${"0".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}${"0".padStart(10)}`);
    io.out(`\n   Ended : ${new Date().toString().slice(0, 24)}`);
  };

  // --- Networking ---
  C.ipconfig = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const n = w.net;
    if (f.includes("/flushdns")) { w.dnsCache = []; io.out("\nWindows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache."); return; }
    if (f.includes("/displaydns")) {
      io.out("\nWindows IP Configuration\n");
      if (!w.dnsCache.length) { io.out("Could not display the DNS Resolver Cache."); return; }
      w.dnsCache.forEach(name => io.out(`    ${name}\n    ----------------------------------------\n    Record Name . . . . . : ${name}\n    Record Type . . . . . : 1\n    Time To Live  . . . . : ${R(60, 3600)}\n    Data Length . . . . . : 4\n    Section . . . . . . . : Answer\n    A (Host) Record . . . : ${w.dnsTable[name] || "0.0.0.0"}\n`));
      return;
    }
    if (f.includes("/release")) {
      n.ip = null; n.gw = ""; n.leaseReleased = true;
      w.flags.released = true;
      io.out("\nWindows IP Configuration\n\nEthernet adapter " + n.adapter + ":\n\n   Connection-specific DNS Suffix  . : \n   Link-local IPv6 Address . . . . . : fe80::9c1d:3e2b:51a7:2f10%12\n   Default Gateway . . . . . . . . . : ");
      return;
    }
    if (f.includes("/renew")) {
      if (!w.dhcpAvailable) {
        return (async () => { await io.sleep(1500); io.out("\nWindows IP Configuration\n\nAn error occurred while renewing interface " + n.adapter + " : unable to contact your DHCP server. Request has timed out.", "t-err"); n.ip = "169.254." + R(1, 254) + "." + R(1, 254); n.mask = "255.255.0.0"; n.gw = ""; })();
      }
      return (async () => {
        await io.sleep(1200);
        n.ip = w.renewIp || "192.168.1.57"; n.mask = "255.255.255.0"; n.gw = "192.168.1.1"; n.suffix = "corp.local";
        w.flags.renewed = true;
        io.out("\nWindows IP Configuration\n\nEthernet adapter " + n.adapter + ":\n\n   Connection-specific DNS Suffix  . : corp.local\n   Link-local IPv6 Address . . . . . : fe80::9c1d:3e2b:51a7:2f10%12\n   IPv4 Address. . . . . . . . . . . : " + n.ip + "\n   Subnet Mask . . . . . . . . . . . : " + n.mask + "\n   Default Gateway . . . . . . . . . : " + n.gw);
      })();
    }
    const all = f.includes("/all");
    io.out("\nWindows IP Configuration\n");
    if (all) io.out(`   Host Name . . . . . . . . . . . . : ${w.hostname}\n   Primary Dns Suffix  . . . . . . . : corp.local\n   Node Type . . . . . . . . . . . . : Hybrid\n   IP Routing Enabled. . . . . . . . : No\n   WINS Proxy Enabled. . . . . . . . : No\n   DNS Suffix Search List. . . . . . : corp.local\n`);
    io.out(`Ethernet adapter ${n.adapter}:\n`);
    const isApipa = n.ip && n.ip.startsWith("169.254.");
    const lines = [`   Connection-specific DNS Suffix  . : ${isApipa || !n.ip ? "" : n.suffix}`];
    if (all) lines.push("   Description . . . . . . . . . . . : Intel(R) Ethernet Connection (16) I219-LM", `   Physical Address. . . . . . . . . : ${n.mac}`, `   DHCP Enabled. . . . . . . . . . . : ${n.dhcp ? "Yes" : "No"}`, "   Autoconfiguration Enabled . . . . : Yes");
    lines.push("   Link-local IPv6 Address . . . . . : fe80::9c1d:3e2b:51a7:2f10%12");
    if (n.ip) {
      lines.push(isApipa ? `   Autoconfiguration IPv4 Address. . : ${n.ip}(Preferred)` : `   IPv4 Address. . . . . . . . . . . : ${n.ip}${all ? "(Preferred)" : ""}`);
      lines.push(`   Subnet Mask . . . . . . . . . . . : ${n.mask}`);
    }
    if (all && n.ip && !isApipa && n.dhcp) {
      const d = new Date();
      lines.push(`   Lease Obtained. . . . . . . . . . : ${d.toDateString()} ${d.toLocaleTimeString()}`, `   Lease Expires . . . . . . . . . . : ${new Date(Date.now() + 8 * 86400000).toDateString()} ${d.toLocaleTimeString()}`);
    }
    lines.push(`   Default Gateway . . . . . . . . . : ${n.gw || ""}`);
    if (all) {
      if (n.dhcp && n.ip && !isApipa) lines.push(`   DHCP Server . . . . . . . . . . . : ${n.dhcpServer}`);
      lines.push(`   DNS Servers . . . . . . . . . . . : ${n.dns[0]}`);
      n.dns.slice(1).forEach(d => lines.push(`                                       ${d}`));
      lines.push("   NetBIOS over Tcpip. . . . . . . . : Enabled");
    }
    io.out(lines.join("\n"));
    if (all) w.flags.ipconfigAll = true;
  };

  C.ping = async (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    let count = 4;
    const ni = f.indexOf("-n");
    if (ni >= 0 && a[ni + 1]) count = Math.min(10, parseInt(a[ni + 1], 10) || 4);
    const infinite = f.includes("-t");
    if (infinite) count = 6;
    const target = a.filter((x, i) => !x.startsWith("-") && !(ni >= 0 && i === ni + 1)).pop();
    if (!target) { io.out(HELP.ping); return; }
    const ip = resolve(w, target);
    if (!ip) { io.out(`Ping request could not find host ${target}. Please check the name and try again.`, "t-err"); return; }
    const named = ip !== target;
    io.out(`\nPinging ${named ? target + " [" + ip + "]" : ip} with 32 bytes of data:`);
    let recv = 0;
    const times = [];
    for (let i = 0; i < count; i++) {
      await io.sleep(450);
      if (apipa(w)) { io.out("PING: transmit failed. General failure.", "t-err"); continue; }
      if (reachable(w, ip)) {
        const t = isLocal(w, ip) || ip === "127.0.0.1" ? R(1, 3) : R(14, 38);
        times.push(t); recv++;
        io.out(`Reply from ${ip}: bytes=32 time${t < 1 ? "<1" : "=" + t}ms TTL=${isLocal(w, ip) ? 128 : 117}`);
      } else if (isLocal(w, ip)) {
        io.out(`Reply from ${w.net.ip}: Destination host unreachable.`, "t-err");
      } else io.out("Request timed out.", "t-err");
    }
    if (infinite) io.out("Control-C\n^C (simulator stops -t after 6 pings)", "t-dim");
    io.out(`\nPing statistics for ${ip}:\n    Packets: Sent = ${count}, Received = ${recv}, Lost = ${count - recv} (${Math.round(((count - recv) / count) * 100)}% loss),`);
    if (times.length) io.out(`Approximate round trip times in milli-seconds:\n    Minimum = ${Math.min(...times)}ms, Maximum = ${Math.max(...times)}ms, Average = ${Math.round(times.reduce((x, y) => x + y, 0) / times.length)}ms`);
  };

  C.tracert = async (a, io, w) => {
    const target = a.filter(x => !x.startsWith("-")).pop();
    if (!target) { io.out(HELP.tracert); return; }
    const ip = resolve(w, target);
    if (!ip) { io.out(`Unable to resolve target system name ${target}.`, "t-err"); return; }
    io.out(`\nTracing route to ${ip !== target ? target + " [" + ip + "]" : ip}\nover a maximum of 30 hops:\n`);
    if (apipa(w)) { await io.sleep(400); io.out("  1  General failure.\n\nTrace complete.", "t-err"); return; }
    const hops = isLocal(w, ip) ? [ip] : w.route.slice(0, -1).concat(ip);
    for (let i = 0; i < hops.length; i++) {
      await io.sleep(400);
      if (w.routeBreakAt != null && i >= w.routeBreakAt) {
        for (let j = i; j < Math.min(i + 4, 30); j++) { io.out(`${String(j + 1).padStart(3)}     *        *        *     Request timed out.`, "t-err"); await io.sleep(300); }
        io.out("\n(simulator) ...remaining hops time out the same way. Trace stopped.", "t-dim");
        w.flags.tracertFail = true;
        return;
      }
      const base = i === 0 ? 1 : 5 + i * 4;
      const t = () => (R(base, base + 4) + " ms").padStart(6);
      io.out(`${String(i + 1).padStart(3)}  ${t()}  ${t()}  ${t()}  ${hops[i]}`);
    }
    io.out("\nTrace complete.");
  };
  C.pathping = async (a, io, w) => {
    const target = a.filter(x => !x.startsWith("-")).pop();
    if (!target) { io.out(HELP.pathping); return; }
    const ip = resolve(w, target);
    if (!ip) { io.out(`Unable to resolve target system name ${target}.`, "t-err"); return; }
    io.out(`\nTracing route to ${target} [${ip}]\nover a maximum of 30 hops:`);
    const hops = [w.net.ip].concat(isLocal(w, ip) ? [ip] : w.route.slice(0, -1).concat(ip));
    const shown = w.routeBreakAt != null ? hops.slice(0, w.routeBreakAt + 2) : hops;
    for (let i = 0; i < shown.length; i++) { await io.sleep(250); io.out(`  ${i}  ${shown[i]}`); }
    io.out("\nComputing statistics for " + shown.length * 25 + " seconds... (simulated)");
    await io.sleep(900);
    io.out("            Source to Here   This Node/Link\nHop  RTT    Lost/Sent = Pct  Lost/Sent = Pct  Address");
    shown.forEach((hp, i) => {
      const broken = w.routeBreakAt != null && i > w.routeBreakAt;
      io.out(`${String(i).padStart(3)}  ${i ? (broken ? "---" : R(1 + i * 4, 6 + i * 4) + "ms").padEnd(6) : "      "} ${broken ? "100/ 100 =100%" : "  0/ 100 =  0%"}    ${broken ? "100/ 100 =100%" : "  0/ 100 =  0%"}  ${hp}`, broken ? "t-err" : "");
    });
    io.out("\nTrace complete.");
  };
  C.nslookup = async (a, io, w) => {
    if (!a.length) { io.out("(Simulator) Interactive mode isn't supported — use: nslookup <name> [server]", "t-dim"); return; }
    const name = a[0];
    const server = a[1] || w.net.dns[0];
    const serverName = server === "8.8.8.8" ? "dns.google" : server === "192.168.1.10" ? "dc01.corp.local" : "UnKnown";
    await io.sleep(400);
    if (apipa(w)) { io.out(`DNS request timed out.\n    timeout was 2 seconds.\nServer:  UnKnown\nAddress:  ${server}\n\nDNS request timed out.\n    timeout was 2 seconds.\n*** Request to UnKnown timed-out`, "t-err"); return; }
    io.out(`Server:  ${serverName}\nAddress:  ${server}\n`);
    const dnsOk = w.net.dnsWorks || (a[1] && w.altDnsWorks !== false);
    if (!dnsOk) { io.out(`*** ${serverName} can't find ${name}: Server failed`, "t-err"); return; }
    const ip = w.dnsTable[name.toLowerCase()];
    if (!ip) { io.out(`*** ${serverName} can't find ${name}: Non-existent domain`, "t-err"); return; }
    const internal = ip.startsWith("192.168.");
    io.out(`${internal ? "" : "Non-authoritative answer:\n"}Name:    ${name}\nAddress:  ${ip}`);
    if (!w.dnsCache.includes(name)) w.dnsCache.push(name);
  };
  C.netstat = (a, io, w) => {
    const f = a.join("").toLowerCase().replace(/-/g, "");
    const showAll = f.includes("a"), numeric = f.includes("n"), pids = f.includes("o"), exe = f.includes("b");
    if (f.includes("r")) {
      io.out("===========================================================================\nIPv4 Route Table\n===========================================================================\nActive Routes:\nNetwork Destination        Netmask          Gateway       Interface  Metric");
      io.out(`          0.0.0.0          0.0.0.0      ${(w.net.gw || "On-link").padEnd(14)} ${w.net.ip || "0.0.0.0"}     25\n        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331\n      192.168.1.0    255.255.255.0         On-link      ${w.net.ip || ""}    281`);
      return;
    }
    if (exe && !w.admin) { io.out("The requested operation requires elevation.", "t-err"); return; }
    io.out("\nActive Connections\n\n  Proto  Local Address          Foreign Address        State           " + (pids ? "PID" : ""));
    const svc = { 135: "epmap", 445: "microsoft-ds", 443: "https", 389: "ldap", 4444: "4444", 5353: "mdns", 3389: "ms-wbt-server" };
    for (const [proto, local, remote, state, pid] of w.connections) {
      if (!showAll && (state === "LISTENING" || proto === "UDP")) continue;
      let rem = remote;
      if (!numeric && remote.includes(":") && !remote.startsWith("0.0.0.0") && remote !== "*:*") {
        const [ip, port] = remote.split(":");
        const host = Object.keys(w.dnsTable).find(k => w.dnsTable[k] === ip);
        rem = (host || ip) + ":" + (svc[port] || port);
      }
      io.out(`  ${proto.padEnd(6)} ${local.padEnd(22)} ${rem.padEnd(22)} ${state.padEnd(15)} ${pids ? pid : ""}`, w.badPid === pid ? "t-warn" : "");
      if (exe) { const p = w.processes.find(x => x.pid === pid); io.out(`  [${p ? p.name : "System"}]`, "t-dim"); }
    }
    if (pids) w.flags.netstatPid = true;
  };

  C.net = (a, io, w) => {
    const sub = (a[0] || "").toLowerCase();
    const rest = a.slice(1);
    const fl = rest.map(x => x.toLowerCase());
    if (sub === "user") {
      if (!rest.length) {
        io.out(`\nUser accounts for \\\\${w.hostname}\n\n-------------------------------------------------------------------------------`);
        io.out(Object.keys(w.users).map(u => u.padEnd(25)).join("") + "\nThe command completed successfully.");
        return;
      }
      const name = rest[0];
      const key = Object.keys(w.users).find(u => u.toLowerCase() === name.toLowerCase());
      if (fl.includes("/add")) {
        if (needAdmin(io, w)) return;
        if (key) { io.out("The account already exists.", "t-err"); return; }
        w.users[name] = { full: "", active: true, groups: ["Users"] };
        io.out("The command completed successfully.");
        return;
      }
      if (!key) { io.out("The user name could not be found.\n\nMore help is available by typing NET HELPMSG 2221.", "t-err"); return; }
      if (fl.includes("/delete")) { if (needAdmin(io, w)) return; delete w.users[key]; io.out("The command completed successfully."); return; }
      const act = fl.find(x => x.startsWith("/active:"));
      if (act) { if (needAdmin(io, w)) return; w.users[key].active = act.endsWith("yes"); io.out("The command completed successfully."); return; }
      if (rest[1] && !rest[1].startsWith("/")) { if (needAdmin(io, w)) return; io.out("The command completed successfully."); w.flags.pwReset = key; return; }
      const u = w.users[key];
      io.out(`User name                    ${key}\nFull Name                    ${u.full}\nAccount active               ${u.active ? "Yes" : "No"}\nAccount expires              Never\n\nPassword last set            ${new Date().toLocaleDateString()}\nPassword required            Yes\nUser may change password     Yes\n\nWorkstations allowed         All\nLogon script\nUser profile\nHome directory\nLast logon                   ${key === w.user ? new Date().toLocaleString() : "Never"}\n\nLocal Group Memberships      ${u.groups.map(g => "*" + g).join("  ")}\nGlobal Group memberships     *None\nThe command completed successfully.`);
      w.flags.viewedUser = key;
      return;
    }
    if (sub === "localgroup") {
      if (!rest.length) { io.out(`\nAliases for \\\\${w.hostname}\n\n-------------------------------------------------------------------------------\n` + w.groups.map(g => "*" + g).join("\n") + "\nThe command completed successfully."); return; }
      const gname = rest.filter(x => !x.startsWith("/"));
      // group names can contain spaces when quoted; tokenizer already handled quotes
      const group = w.groups.find(g => g.toLowerCase() === gname[0].toLowerCase());
      if (!group) { io.out("The specified local group does not exist.", "t-err"); return; }
      const members = Object.keys(w.users).filter(u => w.users[u].groups.includes(group));
      if (fl.includes("/add") || fl.includes("/delete")) {
        if (needAdmin(io, w)) return;
        const uname = gname[1];
        const key = uname && Object.keys(w.users).find(u => u.toLowerCase() === uname.toLowerCase());
        if (!key) { io.out("There is no such global user or group: " + (uname || ""), "t-err"); return; }
        const gs = w.users[key].groups;
        if (fl.includes("/add")) { if (gs.includes(group)) { io.out("System error 1378 has occurred.\n\nThe specified account name is already a member of the group.", "t-err"); return; } gs.push(group); }
        else w.users[key].groups = gs.filter(g => g !== group);
        io.out("The command completed successfully.");
        return;
      }
      io.out(`Alias name     ${group}\nComment\n\nMembers\n\n-------------------------------------------------------------------------------\n${members.join("\n")}\nThe command completed successfully.`);
      return;
    }
    if (sub === "use") {
      if (!rest.length) {
        io.out("New connections will be remembered.\n\n\nStatus       Local     Remote                    Network\n\n-------------------------------------------------------------------------------");
        Object.entries(w.mapped).forEach(([l, r]) => io.out(`OK           ${l.padEnd(10)}${r.padEnd(26)}Microsoft Windows Network`));
        io.out("The command completed successfully.");
        return;
      }
      const letter = rest[0].toUpperCase();
      if (fl.includes("/delete") || fl.includes("/d")) {
        if (!w.mapped[letter]) { io.out("The network connection could not be found.", "t-err"); return; }
        delete w.mapped[letter]; io.out(`${letter} was deleted successfully.`); return;
      }
      const unc = rest.find(x => x.startsWith("\\\\"));
      if (!/^[A-Z]:$/.test(letter) || !unc) { io.out("The syntax of this command is:\n\nNET USE [devicename | *] [\\\\computername\\sharename] [/PERSISTENT:{YES | NO}]", "t-err"); return; }
      const host = unc.slice(2).split("\\")[0].toLowerCase();
      if (!resolve(w, host) || !reachable(w, resolve(w, host))) { io.out("System error 53 has occurred.\n\nThe network path was not found.", "t-err"); return; }
      if (w.mapped[letter]) { io.out("System error 85 has occurred.\n\nThe local device name is already in use.", "t-err"); return; }
      w.mapped[letter] = unc;
      io.out("The command completed successfully.");
      return;
    }
    if (sub === "share") {
      if (!rest.length) {
        io.out("\nShare name   Resource                        Remark\n\n-------------------------------------------------------------------------------");
        Object.entries(w.shares).forEach(([n, p]) => io.out(`${n.padEnd(13)}${p.padEnd(32)}${n.endsWith("$") ? "Default share" : ""}`));
        io.out("The command completed successfully.");
        return;
      }
      const m = rest[0].match(/^([^=]+)=(.+)$/);
      if (m) { if (needAdmin(io, w)) return; w.shares[m[1]] = m[2]; io.out(`${m[1]} was shared successfully.`); return; }
      io.out("This shared resource does not exist.", "t-err");
      return;
    }
    if (sub === "start" || sub === "stop") {
      if (!rest.length) {
        if (sub === "start") { io.out("These Windows services are started:\n"); Object.entries(w.services).filter(([, s]) => s === "Running").forEach(([n]) => io.out("   " + n)); io.out("\nThe command completed successfully."); }
        else io.out("The syntax of this command is:\n\nNET STOP service", "t-err");
        return;
      }
      if (needAdmin(io, w)) return;
      const key = Object.keys(w.services).find(s => s.toLowerCase() === rest.join(" ").toLowerCase());
      if (!key) { io.out("The service name is invalid.\n\nMore help is available by typing NET HELPMSG 2185.", "t-err"); return; }
      if (sub === "start") {
        if (w.services[key] === "Running") { io.out("The requested service has already been started.", "t-err"); return; }
        w.services[key] = "Running"; io.out(`The ${key} service is starting.\nThe ${key} service was started successfully.`);
      } else {
        if (w.services[key] !== "Running") { io.out(`The ${key} service is not started.`, "t-err"); return; }
        w.services[key] = "Stopped"; io.out(`The ${key} service is stopping.\nThe ${key} service was stopped successfully.`);
      }
      return;
    }
    io.out(HELP.net);
  };

  // --- System tools ---
  C.gpupdate = async (a, io, w) => {
    io.out("Updating policy...\n");
    await io.sleep(1600);
    if (apipa(w)) { io.out("Computer policy could not be updated successfully. The following errors were encountered:\n\nThe processing of Group Policy failed because of lack of network connectivity to a domain controller.", "t-err"); return; }
    const force = a.some(x => x.toLowerCase() === "/force");
    if (w.gpo.pending.length) {
      for (const p of w.gpo.pending) { w.gpo[p.scope].push(p.name); if (p.apply) p.apply(w); }
      w.gpo.pending = [];
    }
    if (force) w.flags.gpForce = true;
    io.out("Computer Policy update has completed successfully.\nUser Policy update has completed successfully.\n");
  };
  C.gpresult = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    if (!f.some(x => ["/r", "/v", "/z"].includes(x)) && !f.includes("/h")) { io.out("ERROR: Invalid Syntax. Use /R for a summary.\nType \"GPRESULT /?\" for usage.", "t-err"); return; }
    if (f.includes("/h")) { io.out(`(Simulator) HTML report saved to ${a[f.indexOf("/h") + 1] || "report.html"}.`); return; }
    io.out(`\nMicrosoft (R) Windows (R) Operating System Group Policy Result tool v2.0\n© Microsoft Corporation. All rights reserved.\n\nCreated on ${new Date().toLocaleString()}\n\nRSOP data for ${w.domain}\\${w.user} on ${w.hostname} : Logging Mode\n${"-".repeat(70)}\n\nOS Configuration:            Member Workstation\nOS Version:                  10.0.26100\nSite Name:                   HQ\nDomain Name:                 ${w.domain}\nDomain Type:                 Windows 2008 or later\n\nCOMPUTER SETTINGS\n------------------\n    Last time Group Policy was applied: ${new Date().toLocaleString()}\n    Group Policy was applied from:      dc01.corp.local\n\n    Applied Group Policy Objects\n    -----------------------------`);
    w.gpo.computer.forEach(g => io.out("        " + g));
    io.out(`\nUSER SETTINGS\n--------------\n    CN=${w.user},OU=${w.userOU || "Staff"},DC=corp,DC=local\n\n    Applied Group Policy Objects\n    -----------------------------`);
    w.gpo.user.forEach(g => io.out("        " + g));
    if (w.gpo.pending.length) {
      io.out("\n    The following GPOs were not applied because they were filtered out\n    -------------------------------------------------------------------");
      w.gpo.pending.forEach(g => io.out(`        ${g.name}\n            Filtering:  Not Applied (Pending refresh)`, "t-warn"));
    }
    io.out(`\n    The user is a part of the following security groups\n    ---------------------------------------------------\n        Domain Users\n        Everyone\n        ${w.flags.salesGroup ? "Sales\n        " : ""}Authenticated Users`);
    w.flags.gpresult = true;
  };
  C.sfc = async (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    if (!f.includes("/scannow") && !f.includes("/verifyonly")) { io.out(HELP.sfc); return; }
    if (!w.admin) { io.out("You must be an administrator running a console session in order to\nuse the sfc utility.", "t-err"); return; }
    io.out("\nBeginning system scan.  This process will take some time.\n\nBeginning verification phase of system scan.");
    for (const p of [12, 37, 58, 81, 100]) { await io.sleep(450); io.out(`Verification ${p}% complete.`); }
    if (w.sfcCorrupt && f.includes("/scannow")) {
      io.out("\nWindows Resource Protection found corrupt files and successfully repaired them.\nFor online repairs, details are included in the CBS log file located at\nwindir\\Logs\\CBS\\CBS.log.", "t-ok");
      w.sfcCorrupt = false;
    } else if (w.sfcCorrupt) {
      io.out("\nWindows Resource Protection found integrity violations.", "t-warn");
    } else io.out("\nWindows Resource Protection did not find any integrity violations.", "t-ok");
    w.flags.sfc = true;
  };
  C.dism = async (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    if (!f.includes("/online")) { io.out(HELP.dism); return; }
    if (needAdmin(io, w)) return;
    io.out("\nDeployment Image Servicing and Management tool\nVersion: 10.0.26100.1\n\nImage Version: 10.0.26100.2033\n");
    for (const p of ["==========                 20.0%                          ", "==========================62.3%=========                 ", "==========================100.0%=========================="]) { await io.sleep(600); io.out("[" + p + "]"); }
    if (f.includes("/restorehealth")) io.out("The restore operation completed successfully.\nThe operation completed successfully.", "t-ok");
    else io.out("No component store corruption detected.\nThe operation completed successfully.", "t-ok");
    w.flags.dism = true;
  };
  C.chkdsk = async (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const vol = (a.find(x => /^[a-z]:$/i.test(x)) || w.drive).toUpperCase();
    const v = volumes(w).find(x => x.letter + ":" === vol);
    if (!v) { io.out("The type of the file system is RAW.\nCHKDSK is not available for RAW drives.", "t-err"); return; }
    const fix = f.includes("/f") || f.includes("/r");
    if (fix && !w.admin) { io.out("Access Denied as you do not have sufficient privileges or\nthe disk may be locked by another process.\nYou have to invoke this utility running in elevated mode.", "t-err"); return; }
    io.out(`The type of the file system is ${v.fs}.\nVolume label is ${v.label || "(none)"}.`);
    if (fix && vol === "C:") {
      io.out("\nChkdsk cannot run because the volume is in use by another\nprocess.  Would you like to schedule this volume to be\nchecked the next time the system restarts? (Y/N) Y\n\nThis volume will be checked the next time the system restarts.", "t-warn");
      w.flags.chkdskScheduled = true;
      return;
    }
    io.out(fix ? "" : "\nWARNING!  /F parameter not specified.\nRunning CHKDSK in read-only mode.\n");
    const stages = ["Stage 1: Examining basic file system structure ...", "Stage 2: Examining file name linkage ...", "Stage 3: Examining security descriptors ..."];
    if (f.includes("/r")) stages.push("Stage 4: Looking for bad clusters in user file data ...", "Stage 5: Looking for bad, free clusters ...");
    for (const s of stages) { await io.sleep(500); io.out(s); }
    io.out("\nWindows has scanned the file system and found no problems.\nNo further action is required.", "t-ok");
    w.flags["chkdsk" + vol] = true;
  };
  C.format = async (a, io, w) => {
    const vol = (a.find(x => /^[a-z]:$/i.test(x)) || "").toUpperCase();
    if (!vol) { io.out("Required parameter missing -\nFORMAT volume [/FS:file-system] [/V:label] [/Q]", "t-err"); return; }
    if (vol === "C:") { io.out("Cannot lock current drive.\nThe volume is in use (it holds Windows). Format failed.", "t-err"); return; }
    if (needAdmin(io, w)) return;
    let found = null;
    w.disks.forEach(d => d.partitions.forEach(p => { if (p.letter + ":" === vol) found = p; }));
    if (!found) { io.out("The system cannot find the drive specified.", "t-err"); return; }
    const fsArg = (a.find(x => x.toLowerCase().startsWith("/fs:")) || "/fs:NTFS").slice(4).toUpperCase();
    const lbl = a.find(x => x.toLowerCase().startsWith("/v:"));
    io.out(`The type of the file system is ${found.fs || "RAW"}.\nThe new file system is ${fsArg}.\nWARNING, ALL DATA ON NON-REMOVABLE DISK\nDRIVE ${vol} WILL BE LOST!\nProceed with Format (Y/N)? Y`, "t-warn");
    await io.sleep(800);
    io.out(a.some(x => x.toLowerCase() === "/q") ? "QuickFormatting " + found.size + " GB" : "Formatting " + found.size + " GB\n100 percent completed.");
    found.fs = fsArg === "EXFAT" ? "exFAT" : fsArg; if (lbl) found.label = lbl.slice(3);
    io.out("Creating file system structures.\nFormat complete.");
  };
  C.shutdown = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const ti = f.indexOf("/t");
    const t = ti >= 0 ? a[ti + 1] : "30";
    if (f.includes("/a")) { if (!w.flags.shutdownPending) { io.out("Unable to abort the system shutdown because no shutdown was in progress.(1116)", "t-err"); return; } w.flags.shutdownPending = false; io.out("(Simulator) Logoff is cancelled. The scheduled shutdown has been aborted.", "t-ok"); return; }
    if (f.includes("/r") || f.includes("/s")) {
      w.flags.shutdownPending = true;
      io.out(`(Simulator) You're about to be signed out.\nWindows will ${f.includes("/r") ? "restart" : "shut down"} in ${t} seconds.${f.includes("/f") ? " Running apps will be forced closed (/f)." : ""}\nUse "shutdown /a" to abort.`, "t-warn");
      return;
    }
    io.out(HELP.shutdown);
  };
  C.tasklist = (a, io, w) => {
    io.out("\nImage Name                     PID Session Name        Session#    Mem Usage\n========================= ======== ================ =========== ============");
    for (const p of w.processes) io.out(`${p.name.padEnd(25)} ${String(p.pid).padStart(8)} ${p.session.padEnd(16)} ${String(p.session === "Console" ? 1 : 0).padStart(11)} ${(num(p.mem) + " K").padStart(12)}`, p.pid === w.badPid ? "t-warn" : "");
    w.flags.tasklist = true;
  };
  C.taskkill = (a, io, w) => {
    const f = a.map(x => x.toLowerCase());
    const force = f.includes("/f");
    let targets = [];
    const pi = f.indexOf("/pid"), ii = f.indexOf("/im");
    if (pi >= 0) targets = w.processes.filter(p => String(p.pid) === a[pi + 1]);
    else if (ii >= 0) { const re = VFS.globToRe(a[ii + 1] || "", true); targets = w.processes.filter(p => re.test(p.name)); }
    else { io.out("ERROR: Invalid syntax. Neither /FI nor /PID nor /IM were specified.\nType \"TASKKILL /?\" for usage.", "t-err"); return; }
    if (!targets.length) { io.out(`ERROR: The process "${a[(pi >= 0 ? pi : ii) + 1]}" not found.`, "t-err"); return; }
    for (const p of targets) {
      if (p.pid <= 4 || ["csrss.exe", "wininit.exe", "smss.exe", "lsass.exe", "services.exe"].includes(p.name.toLowerCase())) { io.out(`ERROR: The process with PID ${p.pid} could not be terminated.\nReason: Access is denied (critical system process).`, "t-err"); continue; }
      if (p.needsForce && !force) { io.out(`ERROR: The process with PID ${p.pid} could not be terminated.\nReason: This process can only be terminated forcefully (with /F option).`, "t-err"); continue; }
      w.processes = w.processes.filter(x => x !== p);
      w.connections = w.connections.filter(c => c[4] !== p.pid);
      io.out(force ? `SUCCESS: The process "${p.name}" with PID ${p.pid} has been terminated.` : `SUCCESS: Sent termination signal to the process "${p.name}" with PID ${p.pid}.`, "t-ok");
    }
  };
  C.systeminfo = async (a, io, w) => {
    io.out("Loading Processor Information ...");
    await io.sleep(500);
    io.out(`\nHost Name:                 ${w.hostname}\nOS Name:                   Microsoft Windows 11 Pro\nOS Version:                10.0.26100 N/A Build 26100\nOS Manufacturer:           Microsoft Corporation\nOS Configuration:          Member Workstation\nRegistered Owner:          ${w.user}\nSystem Manufacturer:       Dell Inc.\nSystem Model:              OptiPlex 7010\nSystem Type:               x64-based PC\nProcessor(s):              1 Processor(s) Installed.\n                           [01]: Intel64 Family 6 Model 183 ~2100 Mhz\nBIOS Version:              Dell Inc. 1.14.0, UEFI\nTotal Physical Memory:     16,128 MB\nAvailable Physical Memory: ${num(R(5000, 9000))} MB\nDomain:                    corp.local\nLogon Server:              \\\\DC01\nHotfix(s):                 4 Hotfix(s) Installed.\nNetwork Card(s):           1 NIC(s) Installed.\n                           [01]: Intel(R) Ethernet Connection (16) I219-LM\n                                 DHCP Enabled:    Yes\n                                 IP address(es)\n                                 [01]: ${w.net.ip || "(none)"}\nHyper-V Requirements:      VM Monitor Mode Extensions: Yes\n                           Virtualization Enabled In Firmware: Yes`);
  };

  // --- DiskPart sub-shell ---
  function volumes(w) {
    const out = [];
    w.disks.forEach(d => d.partitions.forEach(p => { if (p.letter || p.fs) out.push({ letter: p.letter, label: p.label, fs: p.fs || "RAW", type: p.type === "Primary" ? "Partition" : p.type, size: p.size, disk: d.num, part: p }); }));
    return out;
  }
  C.diskpart = async (a, io, w) => {
    if (needAdmin(io, w)) return;
    io.out("\nMicrosoft DiskPart version 10.0.26100.1\n\nCopyright (C) Microsoft Corporation.\nOn computer: " + w.hostname + "\n");
    w.mode = "diskpart";
    w.__prompt = "DISKPART> ";
    w.flags.diskpart = true;
  };
  const gb = n => (n >= 1 ? Math.round(n) + " GB" : Math.round(n * 1024) + " MB").padStart(7);
  async function diskpart(line, io, w) {
    const t = App.tokenize(line.toLowerCase());
    const [c0, c1] = t;
    const sel = w.dp.disk != null ? w.disks.find(d => d.num === w.dp.disk) : null;
    if (!c0) return;
    if (c0 === "exit") { io.out("\nLeaving DiskPart..."); w.mode = null; w.__prompt = null; return; }
    if (c0 === "help") {
      io.out("Microsoft DiskPart version 10.0.26100.1\n\nASSIGN      - Assign a drive letter or mount point to the selected volume.\nCLEAN       - Clear the configuration information, or all information, off the disk.\nCONVERT     - Convert between different disk formats (GPT / MBR).\nCREATE      - Create a volume, partition or virtual disk.\nDETAIL      - Provide details about an object.\nEXIT        - Exit DiskPart.\nFORMAT      - Format the volume or partition.\nLIST        - Display a list of objects (disk, partition, volume).\nONLINE      - Online an object that is currently marked as offline.\nSELECT      - Shift the focus to an object.");
      return;
    }
    if (c0 === "list" && c1 === "disk") {
      io.out("\n  Disk ###  Status         Size     Free     Dyn  Gpt\n  --------  -------------  -------  -------  ---  ---");
      w.disks.forEach(d => {
        const used = d.partitions.reduce((s, p) => s + p.size, 0);
        io.out(`${d.num === w.dp.disk ? "*" : " "} Disk ${d.num}    ${d.status.padEnd(13)}  ${gb(d.size)}  ${gb(Math.max(0, d.size - used)).replace("  0 GB", "1024 KB")}        ${d.gpt ? "*" : " "}`);
      });
      w.flags.listDisk = true;
      return;
    }
    if (c0 === "list" && c1 === "volume") {
      io.out("\n  Volume ###  Ltr  Label        Fs     Type        Size     Status     Info\n  ----------  ---  -----------  -----  ----------  -------  ---------  --------");
      volumes(w).forEach((v, i) => io.out(`  Volume ${i}     ${(v.letter || " ").padEnd(3)}  ${(v.label || "").padEnd(11)}  ${v.fs.padEnd(5)}  ${v.type.padEnd(10)}  ${gb(v.size)}  Healthy    ${v.letter === "C" ? "Boot" : v.type === "System" ? "System" : ""}`));
      return;
    }
    if (c0 === "list" && c1 === "partition") {
      if (!sel) { io.out("\nThere is no disk selected to list partitions.\nPlease select a disk and try again.", "t-err"); return; }
      if (!sel.partitions.length) { io.out("\nThere are no partitions on this disk to show."); return; }
      io.out("\n  Partition ###  Type              Size     Offset\n  -------------  ----------------  -------  -------");
      sel.partitions.forEach((p, i) => io.out(`${w.dp.part === i ? "*" : " "} Partition ${i + 1}    ${p.type.padEnd(16)}  ${gb(p.size)}  ${i === 0 ? "1024 KB" : "  " + Math.round(sel.partitions.slice(0, i).reduce((s, x) => s + x.size, 0)) + " GB"}`));
      return;
    }
    if (c0 === "select" && c1 === "disk") {
      const n = parseInt(t[2], 10);
      const d = w.disks.find(x => x.num === n);
      if (!d) { io.out("\nThe disk you specified is not valid.\n\nThere is no disk selected.", "t-err"); return; }
      w.dp.disk = n; w.dp.part = null;
      io.out(`\nDisk ${n} is now the selected disk.`);
      w.flags.selectDisk = n;
      return;
    }
    if (c0 === "select" && c1 === "partition") {
      if (!sel) { io.out("\nThere is no disk selected.", "t-err"); return; }
      const n = parseInt(t[2], 10) - 1;
      if (!sel.partitions[n]) { io.out("\nThe partition you specified is not valid.", "t-err"); return; }
      w.dp.part = n; io.out(`\nPartition ${n + 1} is now the selected partition.`); return;
    }
    if (c0 === "select" && c1 === "volume") {
      const v = volumes(w)[parseInt(t[2], 10)] || volumes(w).find(x => x.letter.toLowerCase() === (t[2] || "").replace(":", ""));
      if (!v) { io.out("\nThe volume you selected is not valid or does not exist.", "t-err"); return; }
      w.dp.disk = v.disk; w.dp.part = w.disks.find(d => d.num === v.disk).partitions.indexOf(v.part);
      io.out(`\nVolume ${volumes(w).indexOf(v)} is the selected volume.`); return;
    }
    if (!sel && ["clean", "convert", "create", "online", "detail", "attributes"].includes(c0)) { io.out("\nThere is no disk selected.\nPlease select a disk and try again.", "t-err"); return; }
    if (c0 === "online") { sel.status = "Online"; io.out("\nDiskPart successfully onlined the selected disk."); return; }
    if (c0 === "detail") { io.out(`\n${sel.model || "Samsung SSD 870 EVO"}\nDisk ID: {${sel.gpt ? "8C2D1E44-ABCD-4E1A-9F3C-1B2C3D4E5F60" : "00000000"}}\nType   : ${sel.bus || "SATA"}\nStatus : ${sel.status}\nRead-only  : No\nBoot Disk  : ${sel.num === 0 ? "Yes" : "No"}`); return; }
    if (c0 === "clean") {
      if (sel.num === 0) { io.out("\nVirtual Disk Service error:\nClean is not allowed on the disk containing the current boot,\nsystem, pagefile, crashdump or hibernation volume.", "t-err"); return; }
      await io.sleep(600); sel.partitions = []; sel.gpt = false; w.dp.part = null;
      io.out("\nDiskPart succeeded in cleaning the disk."); w.flags.clean = true; return;
    }
    if (c0 === "convert") {
      if (sel.partitions.length) { io.out("\nVirtual Disk Service error:\nThe specified disk is not convertible. Clean the disk first.", "t-err"); return; }
      sel.gpt = c1 === "gpt"; io.out(`\nDiskPart successfully converted the selected disk to ${sel.gpt ? "GPT" : "MBR"} format.`); w.flags.convert = c1; return;
    }
    if (c0 === "create" && c1 === "partition") {
      const used = sel.partitions.reduce((s, p) => s + p.size, 0);
      const free = sel.size - used;
      if (free < 1) { io.out("\nVirtual Disk Service error:\nThere is not enough usable space for this operation.", "t-err"); return; }
      const sizeArg = t.find(x => x.startsWith("size="));
      const size = sizeArg ? Math.min(free, parseInt(sizeArg.slice(5), 10) / 1024) : free;
      sel.partitions.push({ size, type: "Primary", fs: "", label: "", letter: "" });
      w.dp.part = sel.partitions.length - 1;
      io.out("\nDiskPart succeeded in creating the specified partition.");
      w.flags.createPart = true; return;
    }
    if (c0 === "format") {
      const p = sel && sel.partitions[w.dp.part];
      if (!p) { io.out("\nThere is no volume selected.\nPlease select a volume and try again.", "t-err"); return; }
      const fsArg = (t.find(x => x.startsWith("fs=")) || "fs=ntfs").slice(3).toUpperCase();
      if (!["NTFS", "FAT32", "EXFAT", "REFS"].includes(fsArg)) { io.out("\nThe specified file system is not supported.", "t-err"); return; }
      const lm = line.match(/label\s*=\s*"?([^"]+?)"?(\s|$)/i);
      const quick = t.includes("quick");
      for (const pc of quick ? [100] : [25, 50, 75, 100]) { await io.sleep(quick ? 500 : 400); io.out(`  ${pc} percent completed`); }
      p.fs = fsArg === "EXFAT" ? "exFAT" : fsArg === "REFS" ? "ReFS" : fsArg; if (lm) p.label = lm[1];
      io.out("\nDiskPart successfully formatted the volume.");
      w.flags.formatFs = p.fs; return;
    }
    if (c0 === "assign") {
      const p = sel && sel.partitions[w.dp.part];
      if (!p) { io.out("\nThere is no volume selected.\nPlease select a volume and try again.", "t-err"); return; }
      const la = t.find(x => x.startsWith("letter="));
      const used = volumes(w).map(v => v.letter);
      let letter = la ? la.slice(7, 8).toUpperCase() : "DEFGHIJKLMNOPQRSTUVWXYZ".split("").find(l => !used.includes(l));
      if (used.includes(letter)) { io.out("\nVirtual Disk Service error:\nThe specified drive letter is not free to be assigned.", "t-err"); return; }
      p.letter = letter;
      io.out("\nDiskPart successfully assigned the drive letter or mount point.");
      w.flags.assigned = letter; return;
    }
    io.out("\nMicrosoft DiskPart version 10.0.26100.1\n\nThe arguments specified for this command are not valid.\nType HELP for a list of commands.", "t-err");
  }

  // ---------- Dispatcher ----------
  function splitPipe(line) {
    const parts = []; let cur = "", q = false;
    for (const ch of line) { if (ch === '"') q = !q; if (ch === "|" && !q) { parts.push(cur); cur = ""; } else cur += ch; }
    parts.push(cur);
    return parts.map(s => s.trim());
  }
  async function runOne(line, io, w) {
    let tokens = App.tokenize(line);
    if (!tokens.length) return;
    let cmd = tokens[0].toLowerCase();
    // cd.. and cd\ shorthand
    const m = cmd.match(/^(cd|chdir)([.\\].*)$/);
    if (m) { cmd = m[1]; tokens = [cmd, m[2]].concat(tokens.slice(1)); }
    cmd = cmd.replace(/\.exe$/, "");
    const args = tokens.slice(1);
    if (args[0] === "/?") { io.out(HELP[cmd] || `No help available for ${cmd}.`); return; }
    if (/^[a-z]:$/i.test(cmd)) {
      if (cmd.toUpperCase() === "C:") return;
      const v = volumes(w).find(x => x.letter + ":" === cmd.toUpperCase());
      io.out(v ? "(Simulator) Only drive C: is browsable in this lab." : "The system cannot find the drive specified.", v ? "t-dim" : "t-err");
      return;
    }
    const fn = C[cmd];
    if (!fn) { io.out(`'${tokens[0]}' is not recognized as an internal or external command,\noperable program or batch file.`, "t-err"); return; }
    await fn(args, io, w);
  }
  async function exec(line, io, w) {
    if (w.mode === "diskpart") return diskpart(line, io, w);
    // output redirection: cmd > file
    let redirect = null;
    const rm = line.match(/^(.*?)\s*(>>?)\s*([^>|]+)$/);
    if (rm && !/^\s*echo\s*$/i.test(rm[1])) { line = rm[1]; redirect = { append: rm[2] === ">>", path: rm[3].trim() }; }
    const parts = splitPipe(line);
    if (parts.length === 1 && !redirect) return runOne(line, io, w);
    // capture output of the first command
    const lines = [];
    const cap = Object.assign({}, io, { out: (t, c) => String(t).split("\n").forEach(l => lines.push([l, c])), html: () => {} , sleep: () => Promise.resolve() });
    await runOne(parts[0], cap, w);
    let cur = lines;
    for (const p of parts.slice(1)) {
      const t = App.tokenize(p);
      const c = (t[0] || "").toLowerCase();
      if (c === "findstr" || c === "find") {
        const flags = t.slice(1).filter(x => x.startsWith("/")).map(x => x.toLowerCase());
        const pat = t.slice(1).filter(x => !x.startsWith("/")).join(" ");
        const ci = flags.includes("/i");
        const words = c === "findstr" ? pat.split(" ") : [pat];
        cur = cur.filter(([l]) => words.some(wd => (ci ? l.toLowerCase().includes(wd.toLowerCase()) : l.includes(wd))));
      } else if (c === "more") { /* passthrough */ }
      else if (c === "sort") cur = cur.slice().sort((a, b) => a[0].localeCompare(b[0]));
      else { io.out(`'${t[0]}' is not supported in a pipe in this simulator. Try findstr, find, sort or more.`, "t-err"); return; }
    }
    if (redirect) {
      const pth = parsePath(w, redirect.path);
      if (!w.fs.write(pth, cur.map(l => l[0]).join("\r\n") + "\r\n", redirect.append)) io.out("The system cannot find the path specified.", "t-err");
      return;
    }
    cur.forEach(([l, c]) => io.out(l, c));
  }

  App.WindowsOS = {
    name: "windows",
    cls: "win",
    blankAfter: true,
    title: "Administrator: Command Prompt",
    commands: COMMANDS,
    banner: () => [["Microsoft Windows [Version 10.0.26100.2033]"], ["(c) Microsoft Corporation. All rights reserved."], [""], ["Type HELP for a list of commands, or COMMAND /? for help on one.", "t-dim"], [""]],
    prompt: w => cwdStr(w) + ">",
    exec,
    complete(w, partial) {
      const segs = partial.replace(/\//g, "\\").split("\\");
      const last = segs.pop();
      const dirAbs = parsePath(w, segs.join("\\") || ".");
      const dir = dirAbs && w.fs.get(dirAbs);
      if (!dir || dir.type !== "dir") return [];
      return Object.keys(dir.children).filter(k => k.toLowerCase().startsWith(last.toLowerCase())).map(k => (segs.length ? segs.join("\\") + "\\" : "") + (k.includes(" ") ? `"${k}"` : k));
    }
  };
})();
