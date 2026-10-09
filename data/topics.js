window.DATA = window.DATA || {};

/* Study Guide topics. Each topic maps to an exam objective area and carries:
   notes    – short on-site study notes
   keywords – used to match questions and flashcards to the topic
   video    – Professor Messer's free video for that objective (slug under the course's video path),
              or null to fall back to the course index
   docs     – optional extra references (official documentation) */
(function () {
  const T = (exam, domain, obj, id, title, video, notes, keywords, docs) => ({ id, exam, domain, obj, title, video, notes, keywords, docs: docs || [] });
  const MS = c => ({ label: `Microsoft Learn: ${c}`, url: `https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/${c}` });
  const MAN = (c, s = 1) => ({ label: `Linux man page: ${c}`, url: `https://man7.org/linux/man-pages/man${s}/${c}.${s}.html` });

  DATA.topics = [
    // ======================= CORE 1 (220-1201) =======================
    T("core1", "1", "1.1", "laptop-hardware", "Laptop hardware & repair", "laptop-hardware-220-1201", [
      "Laptops use SO-DIMM memory and 2.5-inch or M.2 storage; many newer models solder RAM to the board.",
      "Before opening a laptop: ESD strap, disconnect AC power and disconnect or remove the battery.",
      "Common field replacements: battery, keyboard/keys, RAM, SSD, Wi-Fi card, display assembly.",
      "Wi-Fi antenna leads usually run through the display hinge — reconnect them after a screen swap.",
      "Biometrics (fingerprint, face) and NFC readers are common built-in security/input features."
    ], ["laptop", "so-dimm", "sodimm", "keyboard", "keycap", "antenna", "hinge"]),
    T("core1", "1", "1.2", "mobile-connect", "Connecting mobile devices & accessories", "connecting-mobile-devices-220-1201", [
      "Wired: USB-C (current phones, including iPhone 15 and later), Lightning (older iPhones), micro-USB (older Android).",
      "Bluetooth pairing: put the accessory in pairing/discoverable mode, select it, confirm the PIN if asked.",
      "NFC works at a few centimeters — tap-to-pay and quick pairing.",
      "Hotspot = the phone shares its cellular data over Wi-Fi; tethering = sharing over USB or Bluetooth.",
      "Docking stations add many ports (displays, Ethernet, USB) through one connection; port replicators are a lighter version."
    ], ["bluetooth", "pairing", "nfc", "hotspot", "tether", "docking", "dock", "port replicator", "stylus", "lightning", "accessor"]),
    T("core1", "1", "1.3", "mobile-networks-mdm", "Mobile networks, SIM/eSIM & MDM", "mobile-device-networks-220-1201", [
      "Cellular: 4G/LTE and 5G; a SIM (or embedded eSIM, provisioned digitally) identifies the subscriber.",
      "GPS works from satellites with no cellular or Wi-Fi coverage; location services can also use Wi-Fi and cell towers.",
      "MDM (mobile device management) enforces policies: passcodes, encryption, app deployment, remote lock and wipe.",
      "BYOD = employee-owned; COPE = corporate-owned, personally enabled. Work profiles (containers) allow selective wipe of corporate data.",
      "Airplane mode turns radios off; Wi-Fi and Bluetooth can be turned back on individually."
    ], ["sim", "esim", "gps", "cellular", "5g", "lte", "mdm", "mobile device management", "byod", "cope", "work profile", "airplane mode", "selective wipe"]),
    T("core1", "2", "2.1", "ports", "TCP/UDP ports & protocols", "common-ports-220-1201", [
      "TCP is connection-oriented (handshake, acknowledgments); UDP is connectionless and lighter (DNS queries, DHCP, streaming).",
      "Must-know ports: 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 137-139 NetBIOS, 143 IMAP, 389 LDAP, 443 HTTPS, 445 SMB, 636 LDAPS, 3389 RDP.",
      "Secure vs insecure pairs: SSH (22) replaces Telnet (23); HTTPS (443) replaces HTTP (80); LDAPS (636) secures LDAP (389).",
      "Email: SMTP sends (25); POP3 downloads and usually removes (110); IMAP keeps mail synced on the server (143)."
    ], ["port", "tcp", "udp", "ftp", "ssh", "telnet", "smtp", "pop3", "imap", "ldap", "ldaps", "smb", "cifs", "netbios", "https", "3389", "protocol"]),
    T("core1", "2", "2.2", "wireless", "Wireless technologies & bands", "wireless-network-technologies-220-1201", [
      "2.4 GHz: longest range, most interference (microwaves, Bluetooth); only channels 1, 6 and 11 don't overlap in North America.",
      "5 GHz: many more channels and higher speeds, shorter range.",
      "6 GHz: Wi-Fi 6E and Wi-Fi 7 only — wide, uncongested channels, shortest range.",
      "Names: 802.11n = Wi-Fi 4, 802.11ac = Wi-Fi 5, 802.11ax = Wi-Fi 6/6E, 802.11be = Wi-Fi 7.",
      "RFID tags are read at short range (badges, inventory); NFC builds on RFID for two-way communication."
    ], ["2.4 ghz", "5 ghz", "6 ghz", "wi-fi", "802.11", "channel", "wireless", "rfid", "wi-fi 6e", "wi-fi 7", "band"]),
    T("core1", "2", "2.3", "network-services", "Networked host services", "network-services-220-1201", [
      "DNS resolves names; DHCP assigns addresses; file and print servers share resources; mail servers send/store email.",
      "Syslog servers collect logs centrally; web servers host sites; database servers store structured data for applications.",
      "AAA (authentication, authorization, accounting) is often provided by RADIUS or TACACS+.",
      "Appliances: proxy (forwards/caches/filters web requests), load balancer (spreads traffic), UTM (all-in-one firewall/IPS/AV), spam gateway.",
      "Legacy/embedded: SCADA controls industrial equipment; IoT devices are often hard to patch — segment them."
    ], ["syslog", "proxy", "load balancer", "utm", "unified threat", "spam gateway", "database server", "scada", "iot", "aaa", "file server", "print server", "mail server", "web server"]),
    T("core1", "2", "2.4", "dns", "DNS records & email authentication", "dns-configuration-220-1201", [
      "A = IPv4 address; AAAA = IPv6 address; CNAME = alias to another name; MX = mail server for a domain; TXT = text data.",
      "SPF, DKIM and DMARC are published as TXT records to fight email spoofing.",
      "SPF lists allowed sending servers; DKIM signs mail; DMARC sets the policy for failures and reporting.",
      "nslookup (Windows) and dig (Linux) query DNS directly."
    ], ["dns", "mx", "cname", "aaaa", "txt record", "spf", "dkim", "dmarc", "name resolution", "record"]),
    T("core1", "2", "2.4", "dhcp", "DHCP: scopes, leases, reservations, exclusions", "dhcp-220-1201", [
      "DORA: Discover → Offer → Request → Acknowledge (UDP 67 server / 68 client).",
      "A scope is the pool of addresses; a lease is how long a client keeps one.",
      "Reservation: always give a specific MAC address the same IP (printers, servers).",
      "Exclusion: keep a range inside the scope from ever being handed out (static devices).",
      "No DHCP answer → Windows self-assigns APIPA 169.254.x.x."
    ], ["dhcp", "scope", "lease", "reservation", "exclusion", "dora"]),
    T("core1", "2", "2.4", "vlan-vpn", "VLANs & VPNs", "vlans-and-vpns-220-1201", [
      "A VLAN logically separates devices on the same physical switch into different broadcast domains.",
      "Traffic between VLANs needs a router or layer 3 switch.",
      "A VPN encrypts traffic across an untrusted network — client-to-site for remote users, site-to-site between offices."
    ], ["vlan", "vpn", "broadcast domain", "site-to-site"]),
    T("core1", "2", "2.5", "network-devices", "Network devices & SOHO hardware", "network-devices-220-1201", [
      "Router connects networks; switch connects devices in a LAN (managed switches support VLANs, unmanaged don't).",
      "Access points provide Wi-Fi; firewalls filter traffic; PoE delivers power over Ethernet (cameras, APs, phones).",
      "Patch panels terminate cable runs; cable/DSL modems and fiber ONTs connect to the ISP; a NIC connects a host."
    ], ["router", "switch", "access point", "firewall", "poe", "power over ethernet", "patch panel", "modem", "ont", "nic"]),
    T("core1", "2", "2.6", "ip-addressing", "IPv4/IPv6 addressing & APIPA", "assigning-ip-addresses-220-1201", [
      "Private IPv4 ranges: 10.0.0.0/8, 172.16.0.0–172.31.255.255, 192.168.0.0/16. They aren't routed on the internet (NAT translates them).",
      "APIPA 169.254.x.x means DHCP failed: local-only, no internet.",
      "Static addresses for servers/printers; dynamic (DHCP) for clients.",
      "The default gateway is the router that reaches other networks; the subnet mask defines the local network.",
      "IPv6 addresses are 128-bit, written in hex; link-local addresses start with fe80::."
    ], ["ipv4", "ipv6", "apipa", "169.254", "private ip", "subnet mask", "default gateway", "static ip", "rfc 1918", "nat", "ip address"]),
    T("core1", "2", "2.7", "connection-types", "Internet connection & network types", "internet-connection-types-220-1201", [
      "Connections: fiber (fastest), cable (coax), DSL (phone line), satellite (high latency), cellular, WISP (fixed wireless from a tower).",
      "Network types: LAN, WAN, PAN (Bluetooth range), MAN (city-wide), SAN (block storage network), WLAN (wireless LAN)."
    ], ["fiber", "dsl", "satellite", "wisp", "cable internet", "lan", "wan", "pan", "man", "san", "wlan", "isp"]),
    T("core1", "2", "2.8", "network-tools", "Networking tools", "network-tools-220-1201", [
      "Crimper attaches RJ45 connectors; punchdown tool terminates wires on patch panels/keystones.",
      "Cable tester checks wiring/continuity; toner probe (tone generator) finds a cable in a bundle.",
      "Loopback plug tests a port or NIC; Wi-Fi analyzer shows signal strength and channel use; network tap copies traffic for monitoring."
    ], ["crimper", "cable tester", "toner", "tone generator", "punchdown", "loopback", "wi-fi analyzer", "network tap"]),
    T("core1", "3", "3.1", "displays", "Display types & attributes", "display-types-220-1201", [
      "LCD needs a backlight (LED or older CCFL); panel types: IPS (best color/angles), TN (fast, poorer angles), VA (good contrast).",
      "OLED pixels make their own light — true blacks, but risk of burn-in. Mini LED = LCD with thousands of dimming zones.",
      "Attributes: resolution, refresh rate (Hz), pixel density (PPI), color gamut.",
      "Touchscreens use a digitizer layer to turn touches into input."
    ], ["lcd", "ips", "oled", "mini led", "backlight", "refresh rate", "resolution", "pixel density", "color gamut", "digitizer", "display", "monitor"]),
    T("core1", "3", "3.2", "cables", "Cables & connectors", "network-cables-220-1201", [
      "Cat5e: 1 Gbps/100 m. Cat6: 10 Gbps up to ~55 m. Cat6a: 10 Gbps/100 m. Plenum jackets for air-handling spaces; STP resists EMI.",
      "Fiber: single-mode for long distances, multimode for shorter runs. Connectors: LC, SC, ST (bayonet twist).",
      "Coax RG-6 with F-type connectors for cable modems. T568A/T568B wiring standards for RJ45.",
      "Peripheral/video: USB-C, Thunderbolt, HDMI, DisplayPort; storage: SATA data + 15-pin SATA power, legacy Molex."
    ], ["cat5e", "cat6", "cat6a", "plenum", "stp", "utp", "shielded", "coax", "rg-6", "f-type", "single-mode", "multimode", "lc", "sc", "st connector", "rj45", "rj11", "t568", "hdmi", "displayport", "thunderbolt", "molex", "cable"], [{ label: "Professor Messer: Optical Fiber (220-1201 3.2)", url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/optical-fiber-220-1201/" }]),
    T("core1", "3", "3.3", "ram", "Memory (RAM)", "memory-technologies-220-1201", [
      "DIMM for desktops, SO-DIMM for laptops. DDR4 and DDR5 are keyed differently — they are not interchangeable.",
      "ECC memory detects and corrects single-bit errors (servers).",
      "Install matched modules in the paired slots from the manual to enable dual/multi-channel."
    ], ["ram", "memory", "ddr4", "ddr5", "ecc", "dimm", "dual-channel", "channel"]),
    T("core1", "3", "3.4", "storage-raid", "Storage & RAID", "storage-devices-220-1201", [
      "HDDs spin (5400/7200/10k/15k RPM); SSDs have no moving parts. M.2 slots can carry SATA or PCIe NVMe drives (NVMe is far faster).",
      "RAID 0 striping (no redundancy, min 2), RAID 1 mirroring (min 2), RAID 5 striping with parity (min 3, survives 1 failure).",
      "RAID 6 double parity (min 4, survives 2 failures); RAID 10 stripe of mirrors (min 4).",
      "RAID is not a backup — it protects against drive failure, not deletion or ransomware."
    ], ["ssd", "hdd", "nvme", "m.2", "sata", "rpm", "raid", "mirror", "strip", "parity"], [{ label: "Professor Messer: RAID (220-1201 3.4)", url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/raid-220-1201/" }]),
    T("core1", "3", "3.5", "motherboard", "Motherboards, CPUs, BIOS/UEFI, TPM", "motherboard-form-factors-220-1201", [
      "Form factors: ATX (full), microATX (smaller, up to 4 slots, fits ATX cases), Mini-ITX (170 × 170 mm, one slot).",
      "UEFI replaces BIOS: GPT boot drives, Secure Boot (blocks unsigned boot loaders), graphical setup.",
      "TPM stores encryption keys on the motherboard (BitLocker, Windows 11 needs TPM 2.0); an HSM is a dedicated device for managing many keys.",
      "Enable Intel VT-x / AMD-V in firmware for hypervisors. x64 for desktops/servers; ARM for low-power mobile devices.",
      "The CMOS battery keeps firmware settings and the clock when unplugged."
    ], ["motherboard", "atx", "microatx", "mini-itx", "bios", "uefi", "secure boot", "tpm", "hsm", "pcie", "expansion", "cpu", "arm", "vt-x", "amd-v", "cmos"], [
      { label: "Professor Messer: BIOS Settings (220-1201 3.5)", url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/bios-settings-220-1201/" },
      { label: "Professor Messer: HSM and TPM (220-1201 3.5)", url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/hsm-and-tpm-220-1201/" }]),
    T("core1", "3", "3.6", "power", "Power supplies", "computer-power-220-1201", [
      "Main connector is 24-pin; rails are +3.3 V, +5 V and +12 V (12 V feeds the CPU and GPU).",
      "Size wattage for the components plus headroom; 80 Plus ratings describe efficiency.",
      "Modular PSUs let you attach only the cables you need; redundant hot-swappable PSUs keep servers running.",
      "Some PSUs have a manual 115/230 V input switch — set it correctly for the country."
    ], ["power supply", "psu", "wattage", "24-pin", "12 v", "modular", "redundant", "230 v", "115 v", "80 plus"]),
    T("core1", "3", "3.8", "printers", "Printers & multifunction devices", null, [
      "Laser imaging process: Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.",
      "The fuser uses heat and pressure to bond toner; the imaging drum holds the image.",
      "Inkjet: print heads and cartridges; thermal: heat-sensitive paper (receipts); impact (dot matrix): multipart carbon forms; 3D: plastic filament or resin.",
      "Drivers/page description languages: PCL and PostScript. Maintenance kits replace the fuser and rollers at set page counts."
    ], ["printer", "laser", "inkjet", "thermal", "impact", "dot matrix", "fuser", "drum", "toner", "3d print", "filament", "pcl", "postscript", "duplex", "maintenance kit", "imaging", "multifunction"]),
    T("core1", "4", "4.1", "virtualization", "Virtualization", "virtualization-services-220-1201", [
      "Type 1 hypervisor runs on bare metal (ESXi, Hyper-V); Type 2 runs as an app on a host OS (VirtualBox, VMware Workstation).",
      "Uses: sandboxes for risky files, test labs, legacy software on modern hardware.",
      "Containers share the host kernel — lighter than full VMs.",
      "VMs need enough host CPU, RAM and storage; over-allocating RAM hurts the host and other VMs.",
      "VDI hosts desktops centrally and streams them to clients."
    ], ["hypervisor", "type 1", "type 2", "virtual machine", "vm", "sandbox", "container", "vdi", "legacy"]),
    T("core1", "4", "4.2", "cloud", "Cloud models & characteristics", "cloud-models-220-1201", [
      "IaaS: rent servers/storage, you manage the OS up. PaaS: provider runs the platform, you deploy code. SaaS: complete app.",
      "Deployment: public, private, hybrid, community (shared by organizations with common needs).",
      "Characteristics: rapid elasticity, metered utilization (pay per use), multitenancy, high availability, file synchronization."
    ], ["cloud", "iaas", "paas", "saas", "public cloud", "private cloud", "hybrid", "community", "elasticity", "metered", "multitenan", "high availability", "synchroniz"]),
    T("core1", "5", "best practice", "troubleshooting-method", "Troubleshooting methodology (best practice)", null, [
      "1 Identify the problem → 2 Establish a theory (question the obvious; research if needed) → 3 Test the theory → 4 Plan and implement → 5 Verify and add preventive measures → 6 Document.",
      "In V15 this is supporting material rather than a formal objective, but it's how help desks work."
    ], ["troubleshooting methodology", "theory of probable cause", "plan of action", "document findings", "question the obvious"]),
    T("core1", "5", "5.1", "ts-hardware", "Troubleshooting motherboards, RAM, CPU & power", "troubleshooting-hardware-220-1201", [
      "Beep codes / no video after a RAM change → reseat or check compatibility.",
      "Shutdowns under load → overheating (dust, failed fan, missing thermal paste) or a failing PSU.",
      "No power at all → check the outlet, then test the PSU (PSU tester or multimeter).",
      "Lost time/BIOS settings → CMOS battery. Burning smell or swollen capacitors → power down immediately."
    ], ["post", "beep", "bsod", "blue screen", "overheat", "thermal paste", "no power", "cmos battery", "fan", "burning", "capacitor", "reboot", "shutdown"]),
    T("core1", "5", "5.2", "ts-storage", "Troubleshooting storage & RAID", "troubleshooting-storage-devices-220-1201", [
      "Grinding/clicking HDD or growing S.M.A.R.T. errors → back up immediately and replace.",
      "Degraded RAID → replace the failed drive and let the array rebuild.",
      "'No boot device' after adding a drive → check the boot order."
    ], ["s.m.a.r.t", "smart", "grinding", "clicking", "degraded", "rebuild", "bootable device", "boot device", "reallocated"]),
    T("core1", "5", "5.3", "ts-display", "Troubleshooting video & displays", "troubleshooting-display-issues-220-1201", [
      "Very dim image visible with a flashlight → failed backlight.",
      "Flicker that changes with lid movement → display cable through the hinge.",
      "Burn-in on OLED → avoid static images; projectors shutting off → clean filters and vents."
    ], ["dim", "flicker", "burn-in", "dead pixel", "projector", "no signal", "artifact"]),
    T("core1", "5", "5.4", "ts-mobile-hw", "Troubleshooting mobile device hardware", "troubleshooting-mobile-devices-220-1201", [
      "Swollen battery → stop using and charging it, replace it, dispose of it as hazardous waste.",
      "Charging only at an angle → clean or repair the charging port.",
      "Liquid damage, broken screens, digitizer/cursor drift and overheating are common field issues."
    ], ["swollen", "bulging", "battery", "charging port", "liquid", "cracked", "cursor drift", "digitizer"]),
    T("core1", "5", "5.5", "ts-network", "Troubleshooting wired & wireless networks", "troubleshooting-networks-220-1201", [
      "APIPA address → DHCP problem. Can ping IPs but not names → DNS problem.",
      "Intermittent Wi-Fi near microwaves → interference on 2.4 GHz; weak signal → add/move access points.",
      "Jitter (variable delay) ruins VoIP → QoS. Packet loss on one host → test/replace the cable.",
      "Work bottom-up: link light → IP config → gateway → DNS → remote host."
    ], ["intermittent", "latency", "jitter", "packet loss", "limited connectivity", "interference", "microwave", "signal", "dbm", "slow network", "no connectivity"]),
    T("core1", "5", "5.6", "ts-printers", "Troubleshooting printers", "troubleshooting-printers-220-1201", [
      "Ghosting or repeating marks → imaging drum/cleaning blade; smearing toner → fuser.",
      "Multiple sheets feeding → worn separation pad; garbled text → wrong driver.",
      "Inkjet lines/missing colors → run printhead cleaning. Stuck queue → restart the print spooler."
    ], ["ghost", "smear", "streak", "jam", "garbled", "faded", "separation pad", "pickup roller", "print queue", "spooler", "printhead"]),

    // ======================= CORE 2 (220-1202) =======================
    T("core2", "1", "1.1–1.2", "fs-install", "File systems, partitions & OS installation", "installing-operating-systems-220-1202", [
      "File systems: NTFS & ReFS (Windows), ext4 & XFS (Linux), APFS (macOS), FAT32 (4 GB file limit) & exFAT (cross-platform flash drives).",
      "MBR: 2 TB max, 4 primary partitions. GPT: huge disks, up to 128 partitions in Windows, needed for UEFI boot.",
      "Boot methods: USB, network (PXE), ISO, internal recovery partition.",
      "Clean install vs in-place upgrade (keeps apps/files/settings); repair install; zero-touch deployment; multiboot."
    ], ["ntfs", "refs", "fat32", "exfat", "ext4", "xfs", "apfs", "gpt", "mbr", "partition", "pxe", "clean install", "in-place", "zero-touch", "multiboot", "iso", "file system"], [{ label: "Professor Messer: File Systems (220-1202 1.1)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/file-systems-220-1202/" }]),
    T("core2", "1", "1.3", "windows-editions", "Windows editions & features", "an-overview-of-windows-220-1202", [
      "Home lacks domain join, BitLocker, Group Policy Editor and Remote Desktop hosting — Pro and above have them.",
      "Enterprise adds volume licensing and management features; Pro for Workstations supports ReFS and high-end hardware.",
      "Windows 11 requires TPM 2.0, UEFI with Secure Boot, and a supported 64-bit CPU."
    ], ["home edition", "windows 11 home", "windows 10 home", "pro", "enterprise", "pro for workstations", "domain join", "bitlocker", "edition", "upgrade", "tpm 2.0"], [{ label: "Professor Messer: Windows Features (220-1202 1.3)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/windows-features-220-1202/" }]),
    T("core2", "1", "1.4", "windows-tools", "Windows admin tools (Task Manager, MMC & more)", "additional-windows-tools-220-1202", [
      "Task Manager: processes, performance, startup apps, users, services. Event Viewer (eventvwr.msc) holds system/app/security logs.",
      "Device Manager (devmgmt.msc) for drivers; Disk Management (diskmgmt.msc) for partitions; Task Scheduler (taskschd.msc) for automation.",
      "certmgr.msc certificates; lusrmgr.msc local users/groups; perfmon.msc baselines; gpedit.msc local policy.",
      "msinfo32 system info; resmon live resources; msconfig boot options/safe boot; regedit registry (back it up first); cleanmgr; dfrgui (TRIM for SSDs)."
    ], ["task manager", "event viewer", "device manager", "disk management", "task scheduler", "certificate", "local users and groups", "performance monitor", "group policy editor", "msinfo32", "resource monitor", "msconfig", "registry", "regedit", "disk cleanup", "defragment", ".msc", "startup"], [{ label: "Professor Messer: Task Manager (220-1202 1.4)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/task-manager-220-1202/" }]),
    T("core2", "1", "1.5", "windows-cli", "Windows command-line tools", "windows-command-line-tools-220-1202", [
      "Navigation/files: cd, dir, md, rmdir, robocopy. Info: hostname, whoami, winver. Help: [command] /?.",
      "Networking: ipconfig (/all, /release, /renew, /flushdns), ping, tracert, pathping, nslookup, netstat, net use, net user, net view.",
      "Policy: gpupdate /force refreshes Group Policy; gpresult /r shows what applied.",
      "Repair/disks: sfc /scannow (system files), chkdsk /f /r (file system & bad sectors), diskpart, format."
    ], ["ipconfig", "ping", "tracert", "pathping", "nslookup", "netstat", "net use", "net user", "net view", "gpupdate", "gpresult", "sfc", "chkdsk", "diskpart", "format", "robocopy", "winver", "whoami", "hostname", "command"], [
      { label: "Professor Messer: The Windows Network Command Line (220-1202 1.5)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/the-windows-network-command-line-220-1202/" },
      MS("ipconfig"), MS("robocopy"), MS("chkdsk"),
      { label: "Microsoft Learn: Windows commands reference (A–Z)", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands" }]),
    T("core2", "1", "1.6–1.7", "windows-settings-network", "Windows Settings, Control Panel & networking", "windows-network-connections-220-1202", [
      "Workgroup = peer-to-peer, accounts on each PC; domain = central accounts and Group Policy on a domain controller.",
      "Mapped drives connect shares to letters; metered connections limit background data use.",
      "Windows Defender Firewall can allow/block apps and ports; proxy and static IP settings live in network settings."
    ], ["control panel", "settings", "workgroup", "domain", "mapped drive", "metered", "proxy", "static", "shared folder", "network profile", "firewall"], [
      { label: "Professor Messer: Windows Settings (220-1202 1.6)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/windows-settings-220-1202/" },
      { label: "Professor Messer: Configuring Windows Firewall (220-1202)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/configuring-windows-firewall-220-1202/" }]),
    T("core2", "1", "1.8", "macos", "macOS features & tools", "macos-overview-220-1202", [
      "Finder (files), Spotlight (search), Mission Control (windows/Spaces), Keychain (passwords), Terminal.",
      "Time Machine backs up; FileVault encrypts the disk; Gatekeeper blocks unverified apps.",
      "Apps come as .dmg (mount, drag .app to Applications), .pkg (installer) or .app.",
      "Rapid Security Responses deliver urgent fixes between full updates."
    ], ["macos", "mac", "finder", "spotlight", "keychain", "time machine", "filevault", "gatekeeper", "mission control", ".dmg", ".pkg", "rapid security"], [{ label: "Professor Messer: macOS Features (220-1202 1.8)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/macos-features-220-1202/" }]),
    T("core2", "1", "1.9", "linux", "Linux commands & files", "linux-commands-part-1-220-1202", [
      "Files: ls, pwd, cd, cp, mv, rm, cat, nano. Permissions: chmod (r=4 w=2 x=1), chown. Elevation: sudo, su.",
      "Packages: apt (Debian/Ubuntu), dnf (Red Hat/Fedora). Processes: ps, top. Disk: df, du, fsck, mount.",
      "Network: ip, ping, curl, dig, traceroute. Search: grep (text in files), find (files by name). Help: man.",
      "Key files: /etc/passwd, /etc/shadow (hashes), /etc/fstab (mounts), /etc/resolv.conf (DNS), /etc/hosts."
    ], ["linux", "chmod", "chown", "sudo", "apt", "dnf", "grep", "find", "fsck", "mount", "nano", "/etc", "dig", "curl", "traceroute", "ubuntu", "bash", "fstab", "resolv.conf", "shadow"], [
      { label: "Professor Messer: Linux Commands Part 2 (220-1202 1.9)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/linux-commands-part-2-220-1202/" },
      MAN("chmod"), MAN("grep"), MAN("find"), MAN("mount", 8)]),
    T("core2", "1", "1.10–1.11", "apps-cloud-tools", "App installs & cloud productivity tools", null, [
      "Check requirements before installing: OS version, 32- vs 64-bit, CPU, RAM, storage, dedicated GPU.",
      "64-bit apps need a 64-bit OS. Distribution: physical media, downloads, mountable ISO images, app stores.",
      "Cloud productivity (e.g., Microsoft 365): email, storage, collaboration, identity synchronization with on-prem directories, license assignment."
    ], ["install", "requirement", "32-bit", "64-bit", "cloud productivity", "microsoft 365", "identity synchroniz", "collaboration", "license assignment"]),
    T("core2", "2", "2.1–2.2", "auth-ad", "Logical security, MFA & Active Directory", "authentication-and-access-220-1202", [
      "Least privilege: give only the access a job needs. Zero trust: verify every request, never trust by location.",
      "MFA factors: something you know, have, are (and somewhere you are). Passwordless: FIDO2 keys, Windows Hello.",
      "AD: domains, OUs (link GPOs to them), security groups (assign permissions to groups), login scripts, home folders, folder redirection.",
      "Physical security: badges, access control vestibules, biometrics, video surveillance."
    ], ["least privilege", "zero trust", "mfa", "multifactor", "passwordless", "active directory", "organizational unit", "security group", "login script", "folder redirection", "home folder", "something you have", "badge", "sso"], [
      { label: "Professor Messer: Active Directory (220-1202 2.2)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/active-directory-220-1202/" },
      { label: "Professor Messer: Logical Security (220-1202 2.1)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/logical-security-220-1202/" }]),
    T("core2", "2", "2.3", "wireless-security", "Wireless security protocols & authentication", null, [
      "WPA3 uses SAE instead of a pre-shared key handshake; WPA2 should use AES (CCMP), never TKIP.",
      "Enterprise Wi-Fi authenticates individual users against RADIUS (802.1X).",
      "RADIUS (UDP) and TACACS+ (TCP, encrypts the whole payload) provide AAA; Kerberos issues tickets in Active Directory."
    ], ["wpa2", "wpa3", "aes", "tkip", "sae", "radius", "tacacs", "kerberos", "enterprise", "802.1x", "wireless security"]),
    T("core2", "2", "2.4", "malware", "Malware types & anti-malware tools", "malware-220-1202", [
      "Ransomware encrypts files for payment; Trojans hide in legit-looking software; rootkits hide in the OS kernel (may need reimaging).",
      "Keyloggers capture keystrokes; spyware/stalkerware track users; cryptominers burn CPU; fileless malware runs in memory.",
      "Tools: anti-malware, EDR (endpoint detection & response), MDR (managed service), XDR (extended), email security gateways, Windows Recovery Environment."
    ], ["malware", "ransomware", "trojan", "rootkit", "virus", "spyware", "keylogger", "cryptominer", "stalkerware", "fileless", "adware", "edr", "mdr", "xdr", "anti-malware", "email security gateway"]),
    T("core2", "2", "2.5", "social-threats", "Social engineering & threats", "social-engineering-220-1202", [
      "Phishing (email), vishing (voice), smishing (SMS), QR phishing, spear phishing (targeted), whaling (executives), BEC (compromised business email).",
      "Physical: tailgating, shoulder surfing, impersonation, dumpster diving.",
      "Technical: DoS/DDoS, evil twin, on-path, zero-day, brute force, dictionary, SQL injection, XSS, spoofing, insider threats, supply chain."
    ], ["phishing", "vishing", "smishing", "whaling", "spear", "qr code", "shoulder surfing", "tailgating", "impersonation", "dumpster", "evil twin", "on-path", "ddos", "denial of service", "zero-day", "brute force", "dictionary", "sql injection", "xss", "business email compromise", "insider", "spoof", "social engineering"]),
    T("core2", "2", "2.6", "malware-removal", "Malware removal process", "removing-malware-220-1202", [
      "1 Investigate and verify symptoms → 2 Quarantine → 3 Disable System Restore (Windows Home) → 4 Remediate (update anti-malware, scan/remove).",
      "5 Schedule scans and run updates → 6 Enable System Restore and create a restore point → 7 Educate the end user.",
      "Disabling System Restore clears restore points that could reinfect the PC."
    ], ["malware removal", "quarantine", "system restore", "remediate", "educate the end user", "investigate and verify"]),
    T("core2", "2", "2.7", "workstation-security", "Workstation & Windows security settings", "security-best-practices-220-1202", [
      "Strong password policies, screensaver lock, disable Guest, change default passwords, disable AutoRun.",
      "NTFS vs share permissions: over the network both apply and the most restrictive wins; locally only NTFS applies.",
      "UAC limits admin rights; BitLocker encrypts volumes; EFS encrypts individual files; keep Defender and the firewall on."
    ], ["password", "screensaver", "guest account", "autorun", "uac", "efs", "bitlocker", "ntfs permission", "share permission", "defender", "default password", "hardening", "encrypt"]),
    T("core2", "2", "2.8", "mobile-security", "Mobile device security", "mobile-device-security-220-1202", [
      "Screen locks (PIN, biometrics), full-device encryption, OS updates, locator apps, remote wipe.",
      "MDM enforces policies and configuration profiles; BYOD needs clear policies and containers.",
      "iOS installs apps only from the App Store; Android allows other sources (riskier)."
    ], ["screen lock", "remote wipe", "locator", "find my", "mobile security", "lost", "stolen", "biometric", "pin"]),
    T("core2", "2", "2.9", "data-destruction", "Data destruction & disposal", "data-destruction-220-1202", [
      "Physical: shredding, drilling, incineration, degaussing (magnetic HDDs only — not SSDs).",
      "Reuse: secure erase/overwrite wiping; a standard format alone isn't enough for sensitive data.",
      "Third-party vendors should provide a certificate of destruction."
    ], ["shred", "drill", "degauss", "incinerat", "wipe", "low-level format", "certificate of destruction", "dispos", "data destruction"]),
    T("core2", "2", "2.10", "soho-security", "Securing a SOHO network", "securing-a-soho-network-220-1202", [
      "First: change default admin credentials and update firmware.",
      "Use WPA3 (or WPA2-AES); disable WPS and UPnP if not needed; hiding the SSID isn't real security.",
      "Port forwarding opens specific inbound ports; content/IP filtering; DHCP reservations; screened subnet (DMZ) for exposed hosts."
    ], ["soho", "router", "firmware", "ssid", "port forward", "content filter", "ip filter", "upnp", "screened subnet", "dmz", "default credentials"]),
    T("core2", "2", "2.11", "browser-security", "Browser security", "browser-security-220-1202", [
      "Download from trusted sources and verify hashes; install extensions only from official stores.",
      "Keep browsers patched; use password managers; check certificates (HTTPS) and heed warnings.",
      "Secure DNS (DNS over HTTPS) encrypts lookups; private browsing only avoids saving local history; pop-up blockers."
    ], ["browser", "extension", "plug-in", "password manager", "certificate", "private browsing", "pop-up", "secure dns", "dns over https", "trusted source", "hash"]),
    T("core2", "3", "3.1", "ts-windows", "Troubleshooting Windows", "troubleshooting-windows-220-1202", [
      "BSOD after a driver update → Safe Mode, roll back the driver. Bad update → uninstall it/roll back.",
      "Temporary profile/slow logon → rebuild the user profile. Services failing → check dependencies.",
      "Low memory → add RAM; 'No OS found' → boot order; time drift → resync time (Kerberos breaks beyond ~5 minutes).",
      "Escalating fixes: reboot → restart services → reinstall app → System Restore → repair Windows → reimage."
    ], ["bsod", "stop error", "safe mode", "roll back", "profile", "temporary profile", "service", "crash", "low memory", "usb controller", "no operating system", "time drift", "clock", "reimage", "system restore", "sluggish", "boot"]),
    T("core2", "3", "3.2–3.3", "ts-mobile-os", "Troubleshooting mobile OS, apps & security", "troubleshooting-mobile-devices-220-1202", [
      "One app crashing → force stop, clear cache, update/reinstall. Update failing → free up storage.",
      "Security red flags: high data/network usage, sluggishness, fake security warnings, unexpected app behavior, leaked files.",
      "Rooting/jailbreaking and sideloading APKs bypass OS protections — MDM will mark the device noncompliant."
    ], ["app crash", "force stop", "clear cache", "root", "jailbreak", "sideload", "apk", "data usage", "network traffic", "fake security", "battery drain"], [{ label: "Professor Messer: Troubleshooting Mobile Device Security (220-1202 3.3)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/troubleshooting-mobile-device-security-220-1202/" }]),
    T("core2", "3", "3.4", "ts-security", "Troubleshooting PC security issues", "troubleshooting-security-issues-220-1202", [
      "Symptoms: browser redirection, pop-ups, certificate warnings, desktop alerts, fake antivirus messages, renamed/missing files, failed updates.",
      "A tampered hosts file redirects sites even though DNS is correct (nslookup and ping disagree).",
      "Certificate warnings on every site → check the system clock first."
    ], ["redirect", "pop-up", "certificate warning", "hosts file", "desktop alert", "false alert", "renamed", "altered", "update fail", "defender turned off"]),
    T("core2", "4", "4.1", "documentation", "Ticketing, documentation & asset management", null, [
      "Tickets track issues with clear descriptions, categories, severity and escalation; SLAs set response times.",
      "Asset management: inventory database with tags, owners, warranty and location.",
      "Docs: AUP (acceptable use), SOPs, incident reports, knowledge base articles, network diagrams, compliance requirements."
    ], ["ticket", "escalat", "sla", "asset", "inventory", "acceptable use", "aup", "sop", "knowledge base", "incident report", "documentation"]),
    T("core2", "4", "4.2", "change-management", "Change management", "change-management-220-1202", [
      "Request form: purpose, scope, date/time, affected systems, risk analysis.",
      "Test in a sandbox, prepare a rollback plan, get change advisory board approval.",
      "Implement in the change window, confirm end-user acceptance, document."
    ], ["change management", "change request", "change board", "advisory board", "rollback", "sandbox test", "risk analysis", "scope", "end-user acceptance"]),
    T("core2", "4", "4.3", "backups", "Backups & recovery", null, [
      "Full = everything; incremental = changes since the last backup of any kind (fast backup, slow restore); differential = changes since the last full.",
      "Synthetic full = built from a full plus incrementals on the backup server.",
      "3-2-1: three copies, two media types, one off-site. GFS rotation (grandfather-father-son). Test restores regularly."
    ], ["backup", "incremental", "differential", "synthetic", "3-2-1", "gfs", "off-site", "restore"]),
    T("core2", "4", "4.4–4.5", "safety-environment", "Safety & environmental controls", "safety-procedures-220-1202", [
      "ESD: wrist strap and mat, grounded equipment. Lift with your legs; use PPE. Electrical fires: CO2 (Class C), never water.",
      "SDS (safety data sheets) explain handling and disposal of toner, batteries and chemicals.",
      "Batteries, toner and CRTs need proper recycling. UPS for outages; surge suppressors for spikes; control temperature and humidity."
    ], ["esd", "antistatic", "anti-static", "wrist strap", "ground", "lift", "fire", "extinguisher", "sds", "msds", "safety data sheet", "ups", "uninterruptible", "surge", "humidity", "temperature", "ppe", "toner disposal", "recycl"]),
    T("core2", "4", "4.6", "privacy-licensing", "Privacy, licensing & incident response", null, [
      "Regulated data: PII (personal), PHI (health), PCI DSS (card data), GDPR (EU privacy). Data retention requirements apply.",
      "Incident response: identify, report through proper channels, preserve evidence, chain of custody, legal hold.",
      "Licensing: EULA terms, per-seat/concurrent/subscription, open-source vs commercial, DRM."
    ], ["pii", "phi", "pci", "gdpr", "chain of custody", "legal hold", "eula", "license", "licensing", "drm", "open-source", "retention", "incident response", "prohibited"]),
    T("core2", "4", "4.7", "professionalism", "Communication & professionalism", "professionalism-220-1202", [
      "Be on time, dress appropriately, use proper language, listen actively and don't interrupt.",
      "With difficult customers: stay calm, don't argue, restate the issue, avoid being defensive.",
      "Respect privacy: don't read customers' files or share confidential information; set expectations and follow up."
    ], ["customer", "professional", "angry", "communication", "punctual", "listen", "confidential", "expectation"]),
    T("core2", "4", "4.8", "scripting", "Scripting basics", "scripting-languages-220-1202", [
      "File types: .bat (batch), .ps1 (PowerShell), .vbs (VBScript), .sh (shell), .py (Python), .js (JavaScript).",
      "Uses: automate tasks, backups, gathering info, initiating updates, mapping drives, installing apps.",
      "Risks: malware from untrusted scripts, accidental system changes, browser/system crashes from mishandled resources."
    ], ["script", ".bat", ".ps1", ".vbs", ".sh", ".py", ".js", "powershell", "automat", "batch"]),
    T("core2", "4", "4.9", "remote-access", "Remote access technologies", "remote-access-220-1202", [
      "RDP (TCP 3389) for Windows desktops; SSH (22) for encrypted command lines; VNC for cross-platform screen control.",
      "VPN encrypts the whole connection; RMM tools let MSPs monitor/patch/control many endpoints.",
      "SPICE for virtual machine desktops; third-party screen-sharing tools. Secure them with MFA and least privilege."
    ], ["remote", "rdp", "vnc", "ssh", "rmm", "spice", "screen sharing", "remote desktop"]),
    T("core2", "4", "4.10", "ai", "AI in IT support", "managing-ai-220-1202", [
      "Follow the organization's AI policy; use approved tools for company data.",
      "Public AI may retain or train on what you paste; private/enterprise AI keeps data in your organization.",
      "Watch for bias and hallucinations (confident but false output) — verify AI answers before acting."
    ], ["ai", "artificial intelligence", "hallucinat", "bias", "chatbot", "public ai", "private ai", "ai policy"])
  ];

  // Hand-checked question → topic assignments where keyword matching picks a weaker topic.
  DATA.topicOverrides = {
    "c1-014": "laptop-hardware", "c1-029": "network-services", "c1-033": "network-services", "c1-051": "cables", "c1-052": "cables",
    "c1-061": "storage-raid", "c1-091": "ts-display", "c1-095": "ts-printers", "c1-096": "ts-hardware", "c1-097": "ts-hardware",
    "c1-100": "ts-hardware", "c1-104": "ts-hardware", "c1-105": "ts-hardware", "c1-106": "ts-display", "c1-108": "ts-display",
    "c1-111": "ts-printers", "c1-112": "ts-printers", "c1-113": "ts-printers", "c1-114": "ts-printers", "c1-115": "ts-printers",
    "c1-117": "ts-network", "c1-119": "ts-network", "c1-120": "ts-network",
    "c2-021": "windows-tools", "c2-033": "linux", "c2-037": "auth-ad", "c2-042": "wireless-security", "c2-072": "ts-windows",
    "c2-074": "ts-windows", "c2-078": "ts-windows", "c2-079": "ts-windows", "c2-083": "ts-mobile-os", "c2-084": "ts-mobile-os",
    "c2-085": "ts-mobile-os", "c2-086": "ts-security", "c2-088": "ts-security", "c2-094": "browser-security", "c2-127": "linux"
  };

  // Course index pages, used when a topic has no single matching video.
  DATA.topicCourses = {
    core1: { label: "Professor Messer: free 220-1201 course (all videos by objective)", url: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/", video: "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/" },
    core2: { label: "Professor Messer: free 220-1202 course (all videos by objective)", url: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/", video: "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/" }
  };

  // Official command documentation, linked when a command appears in a question.
  DATA.commandDocs = {
    ipconfig: MS("ipconfig"), robocopy: MS("robocopy"), chkdsk: MS("chkdsk"),
    chmod: MAN("chmod"), chown: MAN("chown"), grep: MAN("grep"), find: MAN("find"), ls: MAN("ls"),
    df: MAN("df"), du: MAN("du"), ps: MAN("ps"), kill: MAN("kill"), mount: MAN("mount", 8), fsck: MAN("fsck", 8)
  };
})();
