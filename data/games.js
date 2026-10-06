window.DATA = window.DATA || {};

// ---------- Port & protocol data (Core 1, objective 2.1) ----------
DATA.ports = [
  { port: "20/21", proto: "FTP", transport: "TCP", desc: "File Transfer Protocol — 20 data, 21 control. Unencrypted." },
  { port: "22", proto: "SSH", transport: "TCP", desc: "Secure Shell — encrypted remote CLI (also SFTP/SCP)." },
  { port: "23", proto: "Telnet", transport: "TCP", desc: "Unencrypted remote CLI. Replace with SSH." },
  { port: "25", proto: "SMTP", transport: "TCP", desc: "Simple Mail Transfer Protocol — sends email between servers." },
  { port: "53", proto: "DNS", transport: "TCP/UDP", desc: "Domain Name System — resolves names to IP addresses." },
  { port: "67/68", proto: "DHCP", transport: "UDP", desc: "Dynamic Host Configuration Protocol — 67 server, 68 client." },
  { port: "80", proto: "HTTP", transport: "TCP", desc: "Hypertext Transfer Protocol — unencrypted web." },
  { port: "110", proto: "POP3", transport: "TCP", desc: "Post Office Protocol v3 — downloads mail from server." },
  { port: "137-139", proto: "NetBIOS/NetBT", transport: "TCP/UDP", desc: "NetBIOS over TCP/IP — legacy Windows name & session services." },
  { port: "143", proto: "IMAP", transport: "TCP", desc: "Internet Message Access Protocol — syncs mail, stays on server." },
  { port: "389", proto: "LDAP", transport: "TCP/UDP", desc: "Lightweight Directory Access Protocol — directory queries (e.g., AD)." },
  { port: "636", proto: "LDAPS", transport: "TCP", desc: "LDAP over SSL/TLS — encrypted directory queries." },
  { port: "443", proto: "HTTPS", transport: "TCP", desc: "HTTP Secure — web over TLS." },
  { port: "445", proto: "SMB/CIFS", transport: "TCP", desc: "Server Message Block — Windows file & printer sharing." },
  { port: "3389", proto: "RDP", transport: "TCP/UDP", desc: "Remote Desktop Protocol — graphical remote access to Windows." }
];

// ---------- Ordering puzzles ----------
DATA.orderPuzzles = [
  {
    id: "tshoot", exam: "core1", domain: "5", title: "Troubleshooting Methodology",
    blurb: "CompTIA's troubleshooting best practice. In V15 it's supporting material rather than a formal exam objective, but it's how techs work every day.",
    steps: [
      "Identify the problem",
      "Establish a theory of probable cause (question the obvious)",
      "Test the theory to determine the cause",
      "Establish a plan of action and implement the solution",
      "Verify full system functionality and implement preventive measures",
      "Document findings, actions, outcomes, and lessons learned"
    ]
  },
  {
    id: "malware", exam: "core2", domain: "2", title: "Malware Removal Process",
    blurb: "The seven best-practice steps for malware removal.",
    steps: [
      "Investigate and verify malware symptoms",
      "Quarantine infected systems",
      "Disable System Restore in Windows Home",
      "Remediate infected systems (update anti-malware, scan and remove)",
      "Schedule scans and run updates",
      "Enable System Restore and create a restore point",
      "Educate the end user"
    ]
  },
  {
    id: "laser", exam: "core1", domain: "3", title: "Laser Printer Imaging Process",
    blurb: "The seven stages a page goes through in a laser printer.",
    steps: ["Processing", "Charging", "Exposing", "Developing", "Transferring", "Fusing", "Cleaning"]
  },
  {
    id: "dhcp", exam: "core1", domain: "2", title: "DHCP Lease Process (DORA)",
    blurb: "How a client obtains an IP address.",
    steps: ["Discover (client broadcast)", "Offer (server proposes address)", "Request (client asks for offered address)", "Acknowledge (server confirms lease)"]
  },
  {
    id: "osi", exam: "core1", domain: "2", title: "OSI Model (Layer 1 → 7)",
    blurb: "Not a formal objective, but techs constantly reference layers. Order from the bottom up.",
    steps: ["Physical", "Data Link", "Network", "Transport", "Session", "Presentation", "Application"]
  },
  {
    id: "change", exam: "core2", domain: "4", title: "Change Management Flow",
    blurb: "A typical order for getting a change approved and implemented.",
    steps: [
      "Submit a change request form (purpose, scope, date/time)",
      "Perform risk analysis and identify affected systems",
      "Test in a sandbox and document a rollback plan",
      "Change advisory board approval",
      "Implement the change during the scheduled window",
      "End-user acceptance and documentation"
    ]
  },
  {
    id: "incident", exam: "core2", domain: "4", title: "Prohibited Content / Incident Response",
    blurb: "What to do when you discover prohibited content or activity.",
    steps: [
      "Identify the prohibited content or activity",
      "Report through proper channels",
      "Preserve the data and devices",
      "Document the incident and maintain chain of custody"
    ]
  },
  {
    id: "boot", exam: "core2", domain: "1", title: "PC Boot Sequence",
    blurb: "From power button to desktop.",
    steps: [
      "Power supply sends Power Good signal",
      "CPU runs BIOS/UEFI firmware",
      "POST checks hardware",
      "Firmware finds boot device from boot order",
      "Boot loader (e.g., Windows Boot Manager) loads",
      "OS kernel loads drivers and services",
      "User logon"
    ]
  }
];

// ---------- Sorting challenges (drag items into buckets) ----------
DATA.sortPuzzles = [
  {
    id: "wifi", exam: "core1", domain: "2", title: "Wi-Fi Standards → Frequency",
    buckets: ["2.4 GHz only", "5 GHz only", "2.4 & 5 GHz", "2.4, 5 & 6 GHz"],
    items: [
      ["Bluetooth", 0], ["Channels 1, 6 and 11 don't overlap", 0], ["802.11ac (Wi-Fi 5)", 1],
      ["802.11n (Wi-Fi 4)", 2], ["802.11ax (Wi-Fi 6)", 2], ["Wi-Fi 6E", 3], ["802.11be (Wi-Fi 7)", 3]
    ]
  },
  {
    id: "cloud", exam: "core1", domain: "4", title: "Cloud Service Models",
    buckets: ["IaaS", "PaaS", "SaaS"],
    items: [
      ["Renting virtual servers and storage", 0], ["You patch the guest OS", 0], ["Azure VMs / AWS EC2", 0],
      ["Developers deploy code; provider manages OS", 1], ["Managed database & runtime platform", 1], ["Google App Engine", 1],
      ["Microsoft 365 web apps", 2], ["Provider manages everything; you just use it", 2], ["Web-based email (Gmail)", 2]
    ]
  },
  {
    id: "raid", exam: "core1", domain: "3", title: "RAID Levels",
    buckets: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"],
    items: [
      ["Striping, no fault tolerance", 0], ["Minimum 2 drives, 100% capacity used", 0],
      ["Mirroring", 1], ["Two drives, 50% usable capacity", 1],
      ["Striping with distributed parity", 2], ["Minimum 3 drives, survives one failure", 2],
      ["Stripe of mirrors", 3], ["Minimum 4 drives, fast + redundant", 3]
    ]
  },
  {
    id: "fs", exam: "core2", domain: "1", title: "File System → Typical OS",
    buckets: ["Windows", "Linux", "macOS", "Cross-platform/removable"],
    items: [
      ["NTFS", 0], ["ReFS", 0], ["ext4", 1], ["XFS", 1], ["APFS", 2], ["exFAT", 3], ["FAT32", 3]
    ]
  },
  {
    id: "malware", exam: "core2", domain: "2", title: "Name That Malware",
    buckets: ["Ransomware", "Trojan", "Rootkit", "Keylogger", "Cryptominer"],
    items: [
      ["Encrypts files and demands payment", 0], ["Locks the screen until a fee is paid", 0],
      ["Disguised as a legitimate free game", 1], ["Hides inside a useful-looking download", 1],
      ["Hides deep in the OS/kernel, evades AV", 2], ["May require reimaging to remove", 2],
      ["Records every key pressed", 3], ["Steals passwords as they're typed", 3],
      ["High CPU/GPU usage, mines currency", 4], ["Fans running full blast for no reason", 4]
    ]
  },
  {
    id: "social", exam: "core2", domain: "2", title: "Social Engineering Attacks",
    buckets: ["Phishing", "Vishing", "Smishing", "Whaling", "Tailgating"],
    items: [
      ["Fake email asking you to reset your password", 0], ["Bulk email with a malicious link", 0],
      ["Phone call claiming to be IT support", 1], ["Voicemail from 'your bank'", 1],
      ["Text message with a package-delivery link", 2], ["SMS saying your account is locked", 2],
      ["Targeted email to the CEO", 3], ["Attack aimed at high-level executives", 3],
      ["Following an employee through a secure door", 4], ["Walking in behind someone with a badge", 4]
    ]
  },
  {
    id: "backup", exam: "core2", domain: "4", title: "Backup Types",
    buckets: ["Full", "Incremental", "Differential", "Synthetic"],
    items: [
      ["Backs up everything; slowest to create", 0], ["Restore needs only one set", 0],
      ["Backs up changes since the last backup of any kind", 1], ["Restore needs full + every one since", 1],
      ["Backs up changes since the last full", 2], ["Restore needs full + latest one only", 2],
      ["Built by combining a full with later incrementals", 3], ["Creates a new 'full' without re-reading the source", 3]
    ]
  },
  {
    id: "cables", exam: "core1", domain: "3", title: "Cables & Connectors",
    buckets: ["Copper network", "Fiber optic", "Video", "Peripheral/Storage"],
    items: [
      ["RJ45", 0], ["Cat6a", 0], ["RG-6 coax (F-type)", 0],
      ["LC connector", 1], ["SC connector", 1], ["ST connector", 1],
      ["HDMI", 2], ["DisplayPort", 2],
      ["SATA", 3], ["USB-C", 3], ["Molex", 3]
    ]
  },
  {
    id: "cmd", exam: "core2", domain: "1", title: "Which OS Uses This Command?",
    buckets: ["Windows", "Linux/macOS"],
    items: [
      ["ipconfig", 0], ["tracert", 0], ["gpupdate", 0], ["sfc", 0], ["robocopy", 0], ["chkdsk", 0],
      ["ls", 1], ["chmod", 1], ["grep", 1], ["sudo", 1], ["dig", 1], ["traceroute", 1]
    ]
  },
  {
    id: "msc", exam: "core2", domain: "1", title: "Windows Tool → Launch Name",
    buckets: ["devmgmt.msc", "diskmgmt.msc", "eventvwr.msc", "taskschd.msc", "lusrmgr.msc"],
    items: [
      ["Update or roll back a driver", 0], ["Find a device with a yellow '!'", 0],
      ["Initialize a new disk / create partitions", 1], ["Assign a drive letter", 1],
      ["Read application and system logs", 2], ["Investigate why a service crashed overnight", 2],
      ["Run a script every day at 2 AM", 3], ["Trigger a task at logon", 3],
      ["Add a local user to Administrators", 4], ["Reset a local account password", 4]
    ]
  },
  {
    id: "hyper", exam: "core1", domain: "4", title: "Hypervisor Types",
    buckets: ["Type 1 (bare metal)", "Type 2 (hosted)"],
    items: [
      ["VMware ESXi", 0], ["Microsoft Hyper-V Server", 0], ["Runs directly on hardware", 0], ["Common in data centers", 0],
      ["Oracle VirtualBox", 1], ["VMware Workstation", 1], ["Runs as an app on top of an OS", 1], ["Good for a tech's test lab on a laptop", 1]
    ]
  },
  {
    id: "destroy", exam: "core2", domain: "2", title: "Data Destruction Methods",
    buckets: ["Physical destruction", "Reuse-safe (drive stays usable)"],
    items: [
      ["Shredding", 0], ["Drilling", 0], ["Incineration", 0], ["Degaussing an HDD", 0],
      ["Secure erase / overwrite wipe", 1], ["Low-level format", 1], ["Multi-pass wiping utility", 1]
    ]
  }
];

// ---------- Acronym blitz ----------
DATA.acronyms = [
  ["APIPA", "Automatic Private IP Addressing"], ["DHCP", "Dynamic Host Configuration Protocol"],
  ["DNS", "Domain Name System"], ["NAT", "Network Address Translation"], ["VLAN", "Virtual Local Area Network"],
  ["VPN", "Virtual Private Network"], ["UTM", "Unified Threat Management"], ["SCADA", "Supervisory Control and Data Acquisition"],
  ["RADIUS", "Remote Authentication Dial-In User Service"], ["TACACS+", "Terminal Access Controller Access-Control System Plus"],
  ["AAA", "Authentication, Authorization, and Accounting"], ["NFC", "Near-Field Communication"],
  ["MDM", "Mobile Device Management"], ["UEFI", "Unified Extensible Firmware Interface"], ["TPM", "Trusted Platform Module"],
  ["HSM", "Hardware Security Module"], ["POST", "Power-On Self-Test"], ["ECC", "Error-Correcting Code"],
  ["SODIMM", "Small Outline Dual In-line Memory Module"], ["NVMe", "Non-Volatile Memory Express"],
  ["RAID", "Redundant Array of Independent Disks"], ["S.M.A.R.T.", "Self-Monitoring, Analysis, and Reporting Technology"],
  ["PoE", "Power over Ethernet"], ["SMB", "Server Message Block"], ["LDAP", "Lightweight Directory Access Protocol"],
  ["SNMP", "Simple Network Management Protocol"], ["RDP", "Remote Desktop Protocol"], ["IMAP", "Internet Message Access Protocol"],
  ["SMTP", "Simple Mail Transfer Protocol"], ["IaaS", "Infrastructure as a Service"], ["PaaS", "Platform as a Service"],
  ["SaaS", "Software as a Service"], ["VDI", "Virtual Desktop Infrastructure"], ["WISP", "Wireless Internet Service Provider"],
  ["SAN", "Storage Area Network"], ["PAN", "Personal Area Network"], ["MAN", "Metropolitan Area Network"],
  ["ONT", "Optical Network Terminal"], ["SPF", "Sender Policy Framework"], ["DKIM", "DomainKeys Identified Mail"],
  ["DMARC", "Domain-based Message Authentication, Reporting, and Conformance"], ["MFA", "Multifactor Authentication"],
  ["UAC", "User Account Control"], ["EFS", "Encrypting File System"], ["BSOD", "Blue Screen of Death"],
  ["EDR", "Endpoint Detection and Response"], ["MDR", "Managed Detection and Response"], ["XDR", "Extended Detection and Response"],
  ["SSO", "Single Sign-On"], ["WPA3", "Wi-Fi Protected Access 3"], ["AES", "Advanced Encryption Standard"],
  ["TKIP", "Temporal Key Integrity Protocol"], ["PII", "Personally Identifiable Information"], ["PHI", "Protected Health Information"],
  ["PCI DSS", "Payment Card Industry Data Security Standard"], ["GDPR", "General Data Protection Regulation"],
  ["AUP", "Acceptable Use Policy"], ["SOP", "Standard Operating Procedure"], ["EULA", "End-User License Agreement"],
  ["DRM", "Digital Rights Management"], ["SDS", "Safety Data Sheet"], ["ESD", "Electrostatic Discharge"],
  ["UPS", "Uninterruptible Power Supply"], ["RMM", "Remote Monitoring and Management"], ["SPICE", "Simple Protocol for Independent Computing Environments"],
  ["VNC", "Virtual Network Computing"], ["PXE", "Preboot Execution Environment"], ["GPT", "GUID Partition Table"],
  ["MBR", "Master Boot Record"], ["BYOD", "Bring Your Own Device"], ["XSS", "Cross-Site Scripting"],
  ["BEC", "Business Email Compromise"], ["DDoS", "Distributed Denial of Service"], ["EOL", "End of Life"],
  ["RTO", "Recovery Time Objective"], ["KB", "Knowledge Base"], ["SSID", "Service Set Identifier"], ["UPnP", "Universal Plug and Play"]
];

// ---------- Rapid-fire true/false ("Tech Blitz") ----------
DATA.truefalse = [
  ["APIPA addresses fall in the 169.254.0.0/16 range.", true],
  ["The 6 GHz band can be used only by Wi-Fi 6E and Wi-Fi 7 devices.", true],
  ["RAID 5 requires a minimum of three drives.", true],
  ["RAID 0 provides fault tolerance.", false],
  ["SMTP is used to retrieve email from a server to a client.", false],
  ["IMAP leaves messages on the server and syncs them across devices.", true],
  ["Cat6 supports 10 Gbps up to about 55 meters.", true],
  ["A Type 2 hypervisor runs directly on bare-metal hardware.", false],
  ["DDR5 modules can be installed in DDR4 slots.", false],
  ["Plenum-rated cable is designed for air-handling spaces because it produces less toxic smoke.", true],
  ["LDAPS (secure LDAP) uses TCP port 636.", true],
  ["RDP uses port 3389.", true],
  ["An MX record identifies a domain's mail server.", true],
  ["A CNAME record maps a hostname to an IPv6 address.", false],
  ["Windows 11 requires TPM 2.0.", true],
  ["exFAT has the same 4 GB maximum file size as FAT32.", false],
  ["GPT partitioning supports more than four primary partitions.", true],
  ["BitLocker is available in Windows 11 Home edition.", false],
  ["gpupdate /force reapplies all Group Policy settings.", true],
  ["chmod changes file ownership on Linux.", false],
  ["sudo runs a single command with elevated privileges.", true],
  ["Degaussing works on SSDs.", false],
  ["Vishing is phishing performed over voice calls.", true],
  ["Share permissions apply to users logged on locally at the computer.", false],
  ["When NTFS and share permissions combine, the most restrictive applies.", true],
  ["An incremental backup copies everything changed since the last full backup only.", false],
  ["The 3-2-1 rule means 3 copies, 2 media types, 1 off-site.", true],
  ["The first step of malware removal is to quarantine the system.", false],
  ["System Restore should be disabled in Windows Home during malware remediation.", true],
  ["An SDS (Safety Data Sheet) describes how to safely handle and dispose of a material like toner.", true],
  ["Fusing is the final step of the laser imaging process.", false],
  ["A swollen mobile battery should be punctured to release the pressure.", false],
  ["Grinding noises from a computer usually indicate a failing SSD.", false],
  ["A toner probe helps locate a specific cable in a bundle.", true],
  ["Port 445 is used by SMB for Windows file sharing.", true],
  ["Telnet encrypts its traffic.", false],
  ["WPA3-Personal replaces WPA2's PSK authentication with SAE (Simultaneous Authentication of Equals).", true],
  ["TKIP is the preferred encryption for modern WPA2 networks.", false],
  ["An evil twin is a rogue access point mimicking a legitimate SSID.", true],
  ["UEFI Secure Boot helps prevent rootkits from loading during startup.", true],
  ["A .ps1 file is a Bash shell script.", false],
  ["The macOS feature for automatic backups is Time Machine.", true],
  ["Keychain is macOS's built-in disk encryption.", false],
  ["Multitenancy means multiple customers share the same cloud infrastructure.", true],
  ["Rapid elasticity lets cloud resources scale up and down on demand.", true],
  ["A loopback plug is used to test a network port or NIC.", true],
  ["Ghosting on laser prints is often caused by a bad drum or cleaning issue.", true],
  ["msinfo32 opens Task Scheduler.", false],
  ["Event Viewer is launched with eventvwr.msc.", true],
  ["Changing the default admin password on a SOHO router is a basic hardening step.", true]
];
