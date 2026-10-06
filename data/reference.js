window.DATA = window.DATA || {};

// Cheat sheet tables: { id, title, exam, cols, rows }
DATA.reference = [
  {
    id: "wifi", title: "Wi-Fi Standards", exam: "core1", cols: ["Standard", "Band(s)", "Max speed (theoretical)", "Notes"],
    rows: [
      ["802.11a", "5 GHz", "54 Mbps", "OFDM, shorter range"],
      ["802.11b", "2.4 GHz", "11 Mbps", "Channels 1, 6, 11 don't overlap"],
      ["802.11g", "2.4 GHz", "54 Mbps", "Backward compatible with b"],
      ["802.11n (Wi-Fi 4)", "2.4 / 5 GHz", "600 Mbps", "MIMO, channel bonding (40 MHz)"],
      ["802.11ac (Wi-Fi 5)", "5 GHz", "~6.9 Gbps", "MU-MIMO (downlink), 80/160 MHz channels"],
      ["802.11ax (Wi-Fi 6)", "2.4 / 5 GHz", "~9.6 Gbps", "OFDMA, better in dense areas"],
      ["Wi-Fi 6E", "2.4 / 5 / 6 GHz", "~9.6 Gbps", "Adds the 6 GHz band"],
      ["802.11be (Wi-Fi 7)", "2.4 / 5 / 6 GHz", "~46 Gbps", "320 MHz channels, multi-link operation"]
    ]
  },
  {
    id: "raid", title: "RAID Levels", exam: "core1", cols: ["Level", "Min drives", "Fault tolerance", "Notes"],
    rows: [
      ["RAID 0", "2", "None", "Striping — fastest, any drive failure loses everything"],
      ["RAID 1", "2", "1 drive", "Mirroring — 50% usable capacity"],
      ["RAID 5", "3", "1 drive", "Striping + distributed parity — capacity of (n-1) drives"],
      ["RAID 6", "4", "2 drives", "Double distributed parity — capacity of (n-2) drives"],
      ["RAID 10", "4", "1 per mirror", "Stripe of mirrors — fast and redundant, 50% capacity"]
    ]
  },
  {
    id: "cables", title: "Network Cabling", exam: "core1", cols: ["Cable", "Max speed", "Max distance", "Notes"],
    rows: [
      ["Cat 5e", "1 Gbps", "100 m", "Minimum for gigabit Ethernet"],
      ["Cat 6", "1 Gbps (10 Gbps)", "100 m (10G to ~55 m)", "Tighter twists, often a spline"],
      ["Cat 6a", "10 Gbps", "100 m", "Augmented; thicker, better shielding"],
      ["Plenum", "—", "—", "Fire-retardant jacket for air-handling spaces (low smoke)"],
      ["STP vs UTP", "—", "—", "Shielded twisted pair resists EMI; must be grounded"],
      ["Coax RG-6", "—", "—", "Cable modem / TV, F-type connector"],
      ["Multimode fiber (MMF)", "10–100 Gbps", "~hundreds of m", "LED/laser, shorter runs, typically orange/aqua"],
      ["Single-mode fiber (SMF)", "10–100+ Gbps", "Many km", "Laser, long distances, typically yellow"],
      ["T568A / T568B", "—", "—", "Wiring standards; same on both ends = straight-through, A↔B = crossover"]
    ]
  },
  {
    id: "msc", title: "Windows Admin Tools", exam: "core2", cols: ["Launch", "Tool", "Use it to…"],
    rows: [
      ["devmgmt.msc", "Device Manager", "Update/roll back/disable drivers; see ! and ↓ device states"],
      ["diskmgmt.msc", "Disk Management", "Initialize disks, create/extend/shrink volumes, assign letters"],
      ["eventvwr.msc", "Event Viewer", "Read System, Application and Security logs"],
      ["taskschd.msc", "Task Scheduler", "Run programs/scripts on a schedule or trigger"],
      ["certmgr.msc", "Certificate Manager", "View/import/remove user certificates"],
      ["lusrmgr.msc", "Local Users and Groups", "Manage local accounts & groups (not in Home edition)"],
      ["perfmon.msc", "Performance Monitor", "Graph counters over time, data collector sets"],
      ["gpedit.msc", "Group Policy Editor", "Local policy settings (Pro/Enterprise)"],
      ["services.msc", "Services", "Start/stop services, set startup type"],
      ["msinfo32", "System Information", "Hardware resources, components, software environment"],
      ["resmon", "Resource Monitor", "Real-time CPU, memory, disk, network per process"],
      ["msconfig", "System Configuration", "Boot options, safe boot, selective startup"],
      ["regedit", "Registry Editor", "Edit the registry (back it up first!)"],
      ["cleanmgr", "Disk Cleanup", "Remove temp files, old updates"],
      ["dfrgui", "Defragment & Optimize Drives", "Defrag HDDs / TRIM SSDs"],
      ["taskmgr", "Task Manager", "Processes, Performance, App history, Startup apps, Users, Details, Services"]
    ]
  },
  {
    id: "wincli", title: "Windows Command Line", exam: "core2", cols: ["Command", "What it does", "Key switches"],
    rows: [
      ["ipconfig", "Show/manage IP configuration", "/all /release /renew /flushdns /displaydns"],
      ["ping", "Test reachability (ICMP)", "-t continuous, -n count, -l size"],
      ["tracert / pathping", "Show path / path + per-hop loss", "-d no name resolution"],
      ["nslookup", "Query DNS", "nslookup name [server]"],
      ["netstat", "Connections & listening ports", "-a all, -n numeric, -o PID, -b exe, -r routes"],
      ["hostname / whoami", "Computer name / current user", "whoami /groups /priv"],
      ["net use", "Map / list network drives", "net use X: \\\\server\\share, /delete"],
      ["net user", "Manage user accounts", "/add /delete /active:no"],
      ["gpupdate", "Refresh Group Policy", "/force"],
      ["gpresult", "Show applied policies (RSoP)", "/r summary, /h report.html"],
      ["sfc", "System File Checker", "/scannow"],
      ["chkdsk", "Check disk / file system", "/f fix, /r bad sectors (implies /f)"],
      ["diskpart", "Disk partitioning shell", "list disk, select, clean, create, format, assign"],
      ["format", "Format a volume", "/fs:NTFS /q /v:label"],
      ["robocopy", "Robust copy", "/e /mir /mov /z"],
      ["xcopy / copy", "Copy files & trees / files", "xcopy /s /e"],
      ["md / rmdir / cd / dir", "Make, remove, change, list dirs", "rmdir /s /q"],
      ["shutdown", "Shut down / restart", "/s /r /t secs /a abort /f force"],
      ["winver", "Show Windows version", ""],
      ["[command] /?", "Help for any command", ""]
    ]
  },
  {
    id: "linux", title: "Linux Commands", exam: "core2", cols: ["Command", "What it does", "Example"],
    rows: [
      ["ls / pwd / cd", "List / print / change directory", "ls -la"],
      ["cp / mv / rm", "Copy / move-rename / delete", "rm -r folder"],
      ["chmod", "Change permissions", "chmod 755 script.sh  (r=4 w=2 x=1)"],
      ["chown", "Change owner", "sudo chown user:group file"],
      ["su / sudo", "Switch user / run one command as root", "sudo apt update"],
      ["apt / dnf", "Package managers (Debian / Red Hat)", "sudo apt install htop"],
      ["ip", "Show/set network config (replaces ifconfig)", "ip addr, ip route"],
      ["ping", "Test reachability", "ping -c 4 8.8.8.8"],
      ["curl", "Transfer data from URLs", "curl -I https://site"],
      ["dig", "DNS lookup", "dig @8.8.8.8 site.com MX"],
      ["traceroute", "Trace route", "traceroute site.com"],
      ["grep", "Search text by pattern", "grep -i error /var/log/syslog"],
      ["find", "Search for files", "find / -name \"*.conf\""],
      ["cat", "Print a file", "cat /etc/hosts"],
      ["ps / top", "Process snapshot / live view", "ps aux"],
      ["man", "Manual pages", "man chmod"],
      ["du / df", "Folder usage / free space", "du -sh *, df -h"],
      ["nano", "Text editor", "nano file.txt"],
      ["/etc/passwd /etc/shadow", "User accounts / password hashes", ""],
      ["/etc/fstab", "File systems mounted at boot", ""],
      ["/etc/resolv.conf", "DNS resolver configuration", ""]
    ]
  },
  {
    id: "fs", title: "File Systems & Partitions", exam: "core2", cols: ["Name", "Used by", "Notes"],
    rows: [
      ["NTFS", "Windows", "Permissions, encryption (EFS), compression, journaling, large files"],
      ["ReFS", "Windows Server / Pro for Workstations", "Resilient File System, data integrity, very large volumes"],
      ["FAT32", "Everything", "4 GB max file size, 2 TB volumes (32 GB when formatted in Windows)"],
      ["exFAT", "Flash drives/SD cards", "Cross-platform, large files, no journaling"],
      ["ext4", "Linux", "Default on many distros, journaling"],
      ["XFS", "Linux (RHEL default)", "High-performance journaling"],
      ["APFS", "macOS", "Optimized for SSDs, snapshots, encryption"],
      ["MBR", "Legacy BIOS", "2 TB max, 4 primary partitions (or 3 + extended)"],
      ["GPT", "UEFI", "Huge disks, up to 128 partitions in Windows, backup partition table"]
    ]
  },
  {
    id: "cloud", title: "Cloud & Virtualization", exam: "core1", cols: ["Term", "Meaning"],
    rows: [
      ["IaaS", "Rent infrastructure (VMs, storage, network); you manage OS and up"],
      ["PaaS", "Provider manages OS/runtime; you deploy code and data"],
      ["SaaS", "Complete application delivered over the internet"],
      ["Public / Private / Hybrid / Community", "Shared provider / single org / mix / shared by orgs with common needs"],
      ["Rapid elasticity", "Scale resources up or down quickly on demand"],
      ["Metered utilization", "Pay for what you use"],
      ["Multitenancy", "Multiple customers share the same infrastructure"],
      ["High availability", "Redundancy to minimize downtime"],
      ["Type 1 hypervisor", "Bare metal: ESXi, Hyper-V, Proxmox"],
      ["Type 2 hypervisor", "Hosted on an OS: VirtualBox, VMware Workstation"],
      ["Container", "Shares host OS kernel; lighter than a VM (e.g., Docker)"],
      ["VDI", "Virtual desktops hosted centrally and streamed to clients"]
    ]
  },
  {
    id: "security", title: "Security Quick Hits", exam: "core2", cols: ["Term", "Meaning"],
    rows: [
      ["WPA3", "SAE replaces PSK; strongest consumer Wi-Fi security"],
      ["WPA2 + AES", "Acceptable; avoid TKIP and WEP"],
      ["RADIUS / TACACS+ / Kerberos", "Centralized AAA (RADIUS UDP, TACACS+ TCP, Cisco) / AD ticket-based auth"],
      ["MFA factors", "Something you know, have, are (+ somewhere you are)"],
      ["NTFS vs share permissions", "Both apply over the network; the most restrictive wins. Local logon = NTFS only"],
      ["Moving vs copying (NTFS)", "Move within same volume keeps permissions; copy or move across volumes inherits from target"],
      ["UAC", "Prompts for elevation to limit admin rights"],
      ["BitLocker / EFS", "Full-volume encryption (Pro+) / per-file encryption on NTFS"],
      ["Phishing family", "Email / vishing = voice / smishing = SMS / whaling = executives / spear = targeted"],
      ["Evil twin", "Rogue AP impersonating a legit SSID"],
      ["On-path", "Attacker intercepts traffic between two parties"],
      ["Zero-day", "Exploit for a vulnerability with no patch yet"],
      ["Data destruction", "Shred/drill/incinerate/degauss (HDD) vs wipe for reuse; get a certificate of destruction"]
    ]
  },
  {
    id: "ops", title: "Operational Procedures", exam: "core2", cols: ["Topic", "Remember"],
    rows: [
      ["Backups", "Full / incremental (since last backup) / differential (since last full) / synthetic"],
      ["3-2-1 rule", "3 copies, 2 different media, 1 off-site"],
      ["GFS", "Grandfather-father-son rotation (monthly / weekly / daily)"],
      ["Change management", "Request → purpose/scope → risk analysis → rollback plan → sandbox test → CAB approval → implement → end-user acceptance"],
      ["ESD", "Use an antistatic wrist strap & mat, touch grounded chassis"],
      ["SDS", "Safety Data Sheet: handling & disposal of chemicals, toner, batteries"],
      ["Chain of custody", "Document every person who handles evidence"],
      ["Regulated data", "PII (personal), PHI (health/HIPAA), PCI DSS (card data), GDPR (EU privacy)"],
      ["Licensing", "EULA, per-seat vs concurrent, open-source vs commercial, DRM"],
      ["Scripts", ".bat (cmd), .ps1 (PowerShell), .vbs (VBScript), .sh (bash), .py (Python), .js (JavaScript)"],
      ["Remote access", "RDP 3389, SSH 22, VNC, VPN, RMM, MSRA (Microsoft Remote Assistance)"],
      ["AI", "Follow your AI policy; watch for bias & hallucinations; don't paste sensitive data into public AI"]
    ]
  },
  {
    id: "mnemonics", title: "Mnemonics", exam: "both", cols: ["Topic", "Memory hook"],
    rows: [
      ["OSI layers 1→7", "Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application)"],
      ["Laser printing", "Please Charge Every Device To Fully Clean (Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning)"],
      ["Troubleshooting", "Identify, Theorize, Test, Plan, Verify, Document — \"I Think That People Value Docs\""],
      ["Malware removal", "Investigate, Quarantine, Disable restore, Remediate, Schedule scans, Enable restore, Educate"],
      ["DHCP", "DORA: Discover, Offer, Request, Acknowledge"],
      ["chmod digits", "r=4, w=2, x=1 → 7 = rwx, 5 = r-x, 4 = r--, 6 = rw-"],
      ["POP3 vs IMAP", "POP3 Pulls Off the server (110); IMAP keeps It on the server (143)"],
      ["SMTP", "Send Mail To People (25)"]
    ]
  }
];
