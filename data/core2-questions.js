window.DATA = window.DATA || {};
DATA.core2Questions = [
  // ===================== Domain 1: Operating Systems =====================
  {
    id: "c2-001",
    domain: "1",
    q: "A technician needs to verify and repair protected Windows system files on a PC that is behaving erratically. Which command should the technician run?",
    choices: ["chkdsk /f", "sfc /scannow", "gpupdate /force", "diskpart"],
    answer: [1],
    explanation: "System File Checker (sfc /scannow) verifies and replaces corrupted protected system files. chkdsk checks the file system and disk for errors, not OS file integrity."
  },
  {
    id: "c2-002",
    domain: "1",
    q: "A user tries to upgrade a Windows 10 PC to Windows 11, but the PC Health Check app reports that the device does not meet requirements. The PC has a supported 64-bit CPU, 8GB of RAM, and UEFI firmware with Secure Boot enabled. Which setting should the technician check FIRST?",
    choices: ["Enable the TPM 2.0 (firmware TPM/PTT) option in the UEFI settings", "Switch the firmware to Legacy BIOS/CSM mode", "Convert the system disk from GPT to MBR", "Disable Secure Boot"],
    answer: [0],
    explanation: "Windows 11 requires TPM 2.0, and on many systems the firmware TPM is disabled by default in UEFI. Legacy/CSM mode, MBR, and disabling Secure Boot move away from the UEFI/Secure Boot-capable configuration Windows 11 requires."
  },
  {
    id: "c2-003",
    domain: "1",
    q: "A small business owner needs new PCs that can join an Active Directory domain, use BitLocker, and accept incoming Remote Desktop connections. Which is the LEAST expensive Windows 11 edition that meets these requirements?",
    choices: ["Windows 11 Home", "Windows 11 Pro for Workstations", "Windows 11 Pro", "Windows 11 Enterprise"],
    answer: [2],
    explanation: "Windows 11 Pro includes domain join, BitLocker, Group Policy, and the Remote Desktop host. Home lacks these features, while Pro for Workstations and Enterprise also include them but cost more."
  },
  {
    id: "c2-004",
    domain: "1",
    q: "A user wants to connect to a home PC running Windows 10 Home from a laptop using Remote Desktop Connection, but the home PC cannot be configured to accept connections. What should the technician recommend?",
    choices: ["Enable Remote Desktop under Settings > System > Remote Desktop on the Home PC", "Open TCP port 3389 in Windows Defender Firewall on the Home PC", "Install the Remote Desktop Connection client (mstsc) on the Home PC", "Upgrade the home PC to Windows 10 Pro"],
    answer: [3],
    explanation: "Windows Home editions can run the RDP client but cannot act as a Remote Desktop host; Pro or higher is required. Opening port 3389 does not help because the Home edition has no RDP host service to accept the connection."
  },
  {
    id: "c2-005",
    domain: "1",
    q: "A user needs to format a USB flash drive to move 8GB video files between a Windows PC and a Mac, with full read/write support on both without extra software. Which file system should be used?",
    choices: ["exFAT", "FAT32", "NTFS", "APFS"],
    answer: [0],
    explanation: "exFAT supports very large files and is natively read/write on both Windows and macOS. FAT32 has a 4GB maximum file size, and macOS mounts NTFS read-only by default."
  },
  {
    id: "c2-006",
    domain: "1",
    q: "A technician is preparing a new 4TB drive and is deciding between MBR and GPT partitioning. Which statements about GPT are correct? (Choose two.)",
    choices: ["It is limited to four primary partitions", "It supports drives larger than 2TB", "It requires Legacy BIOS/CSM boot mode", "Windows supports up to 128 partitions on a GPT disk", "It stores no backup copy of the partition table"],
    answer: [1, 3],
    explanation: "GPT supports disks larger than 2TB and up to 128 partitions in Windows, and it keeps a backup partition table at the end of the disk. The four-primary-partition limit applies to MBR, and UEFI (not Legacy BIOS) is used to boot from GPT."
  },
  {
    id: "c2-007",
    domain: "1",
    q: "A technician must deploy a Windows image to 40 new desktops that have no optical drives. The technician does not want to create or carry any boot media. Which boot method should be used?",
    choices: ["Bootable USB flash drive", "Optical disc created from an ISO", "PXE network boot", "Internal recovery partition"],
    answer: [2],
    explanation: "PXE (Preboot Execution Environment) lets the NIC boot from a deployment server over the network, so no physical media is needed. A USB drive works but requires creating and handling media for each machine."
  },
  {
    id: "c2-008",
    domain: "1",
    q: "A technician needs to copy a large directory tree to a new file server, keep the NTFS permissions, and be able to resume the copy if the network connection drops. Which command is the BEST choice?",
    choices: ["copy", "xcopy", "move", "robocopy"],
    answer: [3],
    explanation: "Robocopy (Robust File Copy) can copy security/ACLs (/COPYALL or /SEC), mirror trees, and resume in restartable mode (/Z). xcopy copies directory trees but lacks robocopy's resilience and retry features."
  },
  {
    id: "c2-009",
    domain: "1",
    q: "A user in a domain reports that a new desktop wallpaper policy has not taken effect. The technician wants to see which Group Policy Objects were actually applied to the user and computer. Which command should be used?",
    choices: ["gpresult /r", "gpupdate /force", "whoami /groups", "netstat -b"],
    answer: [0],
    explanation: "gpresult /r displays the Resultant Set of Policy, including which GPOs were applied or filtered. gpupdate /force reapplies policies but does not report which ones applied."
  },
  {
    id: "c2-010",
    domain: "1",
    q: "A user can successfully ping 8.8.8.8 but cannot open any websites by name. Which command should the technician use NEXT to test name resolution?",
    choices: ["tracert 8.8.8.8", "pathping 8.8.8.8", "nslookup www.comptia.org", "net use"],
    answer: [2],
    explanation: "Since IP connectivity works, the likely problem is DNS; nslookup queries the DNS server to test name resolution. tracert and pathping test the route to an IP address, which is already known to be reachable."
  },
  {
    id: "c2-011",
    domain: "1",
    q: "A technician needs to map drive letter S: to the shared folder 'sales' on server FS01 from the command line. Which command accomplishes this?",
    choices: ["net use S: \\\\FS01\\sales", "net user S: \\\\FS01\\sales", "netstat S: \\\\FS01\\sales", "map S: \\\\FS01\\sales"],
    answer: [0],
    explanation: "net use connects a drive letter to a network share using a UNC path. net user manages user accounts, and netstat displays network connections."
  },
  {
    id: "c2-012",
    domain: "1",
    q: "A technician suspects a hard drive has developed bad sectors. Which command locates bad sectors and recovers readable information?",
    choices: ["format /q", "sfc /scannow", "defrag C: /a", "chkdsk /r"],
    answer: [3],
    explanation: "chkdsk /r locates bad sectors and recovers readable information (it also implies /f). sfc checks protected system files, not the physical disk surface."
  },
  {
    id: "c2-013",
    domain: "1",
    q: "During a clean installation, a technician presses Shift+F10 to open a command prompt and needs to wipe the existing partition table on Disk 0 and convert it to GPT. Which utility should be used?",
    choices: ["format", "diskpart", "chkdsk", "robocopy"],
    answer: [1],
    explanation: "diskpart can select a disk, clean it, and convert it to GPT or MBR. format only creates a file system on an existing volume and cannot change the partition style."
  },
  {
    id: "c2-014",
    domain: "1",
    q: "A technician needs to install the nmap package on an Ubuntu Linux workstation using the distribution's default package manager. Which command should be used?",
    choices: ["sudo apt install nmap", "sudo dnf install nmap", "sudo chmod install nmap", "su nmap install"],
    answer: [0],
    explanation: "Ubuntu (Debian-based) uses APT, so sudo apt install installs the package with elevated privileges. dnf is the package manager for Red Hat-based distributions such as Fedora."
  },
  {
    id: "c2-015",
    domain: "1",
    q: "A user wants to move from Windows 10 Pro to Windows 11 Pro on a compatible PC while keeping all installed applications, personal files, and settings. Which installation method should the technician use?",
    choices: ["Clean installation from a USB drive", "Image deployment using PXE", "Reset using the internal recovery partition", "In-place upgrade"],
    answer: [3],
    explanation: "An in-place upgrade installs the new version over the existing one and preserves apps, files, and settings. A clean install or image deployment replaces the OS and removes existing applications."
  },
  {
    id: "c2-016",
    domain: "1",
    q: "A Windows 11 user complains that several applications launch automatically at sign-in and slow down the PC. Where should the technician disable these applications?",
    choices: ["System Configuration (msconfig) > Services tab", "Device Manager", "Task Manager > Startup apps", "Disk Cleanup"],
    answer: [2],
    explanation: "In Windows 10/11, startup applications are enabled or disabled in Task Manager's Startup apps tab (msconfig's Startup tab just points there). The msconfig Services tab controls services, not sign-in apps."
  },
  {
    id: "c2-017",
    domain: "1",
    q: "A server restarted unexpectedly overnight. The technician wants to review logged errors and warnings around the time of the restart. Which tool should be used?",
    choices: ["Performance Monitor", "Event Viewer", "Resource Monitor", "Task Scheduler"],
    answer: [1],
    explanation: "Event Viewer stores the System, Application, and Security logs, including records of unexpected shutdowns and their causes. Resource Monitor shows only real-time resource usage, not historical events."
  },
  {
    id: "c2-018",
    domain: "1",
    q: "A user's internal web application requires a client certificate. The technician needs to view and export certificates in the current user's Personal certificate store. Which tool should the technician open?",
    choices: ["lusrmgr.msc", "devmgmt.msc", "diskmgmt.msc", "certmgr.msc"],
    answer: [3],
    explanation: "certmgr.msc (Certificate Manager) manages the current user's certificate stores. lusrmgr.msc manages local users and groups, not certificates."
  },
  {
    id: "c2-019",
    domain: "1",
    q: "A technician wants to record CPU, memory, and disk counters every few seconds for 24 hours and save them to a log to establish a performance baseline. Which tool is BEST suited?",
    choices: ["Resource Monitor", "Task Manager Performance tab", "Performance Monitor", "System Information"],
    answer: [2],
    explanation: "Performance Monitor uses data collector sets to log selected counters over time for baselining. Task Manager and Resource Monitor show real-time data but do not create long-term counter logs."
  },
  {
    id: "c2-020",
    domain: "1",
    q: "A technician needs to find the BIOS/UEFI version, installed physical memory, and system model of a PC without opening the case, and save the results to a report. Which tool should be used?",
    choices: ["msinfo32", "msconfig", "regedit", "resmon"],
    answer: [0],
    explanation: "System Information (msinfo32) shows hardware resources, BIOS version, memory, and model, and can export a report. msconfig controls boot and service options, not detailed hardware inventory."
  },
  {
    id: "c2-021",
    domain: "1",
    q: "A technician wants a Windows PC to boot into Safe Mode on every restart until the technician changes the setting back. Which tool should be used?",
    choices: ["System Configuration (msconfig)", "Disk Management", "Task Scheduler", "Device Manager"],
    answer: [0],
    explanation: "The Boot tab in msconfig has a Safe boot option that persists across restarts until it is cleared. The other tools do not control boot mode."
  },
  {
    id: "c2-022",
    domain: "1",
    q: "A technician installs a brand-new second hard drive in a desktop. The drive is listed in the UEFI, but it does not appear in File Explorer. Which tool should the technician use to initialize the disk and create a volume?",
    choices: ["Device Manager", "Disk Cleanup", "Defragment and Optimize Drives", "Disk Management"],
    answer: [3],
    explanation: "Disk Management can initialize a new disk (MBR or GPT), create partitions, and format volumes. Device Manager shows that the hardware is detected but cannot create volumes."
  },
  {
    id: "c2-023",
    domain: "1",
    q: "What does the Windows Defragment and Optimize Drives tool do when it optimizes a solid-state drive?",
    choices: ["Fully defragments every file", "Performs a low-level format", "Sends TRIM (retrim) commands to the drive", "Disables write caching"],
    answer: [2],
    explanation: "On SSDs, Windows sends TRIM commands to tell the drive which blocks are no longer in use, rather than running a traditional defragmentation. Defragmenting an SSD gives no performance benefit and adds unnecessary writes."
  },
  {
    id: "c2-024",
    domain: "1",
    q: "A vendor support article tells a technician to change a value under HKEY_LOCAL_MACHINE\\SOFTWARE to fix an application issue. What should the technician do?",
    choices: ["Edit the value in Local Group Policy Editor (gpedit.msc)", "Export a backup of the key, then edit the value in Registry Editor (regedit)", "Change the value in System Configuration (msconfig)", "Modify the value using Services (services.msc)"],
    answer: [1],
    explanation: "Registry values are edited with regedit, and exporting the key first allows quick recovery if the change causes problems. Group Policy Editor configures policies and cannot edit arbitrary registry keys."
  },
  {
    id: "c2-025",
    domain: "1",
    q: "A user tries to install a 64-bit-only application on a laptop running a 32-bit edition of Windows 10, and the installer refuses to run. What should the technician tell the user?",
    choices: ["Run the installer in compatibility mode for Windows 8", "Add more RAM so the 64-bit installer can run", "Right-click the installer and choose Run as administrator", "A 64-bit application requires a 64-bit OS; use a 32-bit version of the app or install a 64-bit OS"],
    answer: [3],
    explanation: "A 32-bit operating system cannot run 64-bit applications, so the OS architecture must match the application requirements. Compatibility mode and running as administrator do not change the OS architecture."
  },
  {
    id: "c2-026",
    domain: "1",
    q: "A user often works from a smartphone hotspot with a limited data plan and wants Windows to reduce background downloads such as some updates. What should the technician configure?",
    choices: ["Configure a proxy server", "Set the network profile to Public", "Set the connection as a metered connection", "Disable Windows Defender Firewall"],
    answer: [2],
    explanation: "Marking a connection as metered tells Windows to limit background data use, such as deferring many update downloads. The Public network profile changes firewall and discovery behavior, not data usage."
  },
  {
    id: "c2-027",
    domain: "1",
    q: "A growing office is moving its Windows PCs from a workgroup to a domain. Which statements describe a domain? (Choose two.)",
    choices: ["User accounts are stored centrally on a domain controller", "Each computer keeps only its own separate local user database", "Computers can run Windows Home edition and still join", "Computers can be centrally managed with Group Policy", "It is limited to 20 computers"],
    answer: [0, 3],
    explanation: "In a domain, accounts are stored centrally in Active Directory on domain controllers, and computers can be managed with Group Policy. Separate local account databases describe a workgroup, and Home editions cannot join a domain."
  },
  {
    id: "c2-028",
    domain: "1",
    q: "A technician gives a workstation a static IPv4 address. The workstation can reach a local file server by IP address but cannot reach any internet host, even by IP address. Which setting was MOST likely left out?",
    choices: ["DNS server", "Default gateway", "DHCP reservation", "Proxy exception list"],
    answer: [1],
    explanation: "The default gateway routes traffic to other networks, so without it only local subnet hosts are reachable. A missing DNS server would break name resolution but would not prevent reaching internet hosts by IP address."
  },
  {
    id: "c2-029",
    domain: "1",
    q: "A Mac user wants to encrypt the entire startup disk and have the operating system securely store website and Wi-Fi passwords. Which macOS features should the technician configure? (Choose two.)",
    choices: ["Spotlight", "FileVault", "Mission Control", "Keychain", "Finder"],
    answer: [1, 3],
    explanation: "FileVault provides full-disk encryption for the startup disk, and Keychain securely stores passwords, certificates, and keys. Spotlight is a search tool and Mission Control manages windows and desktops."
  },
  {
    id: "c2-030",
    domain: "1",
    q: "A Mac user downloads an application from a website and receives a message that it cannot be opened because the developer cannot be verified. Which macOS security feature is responsible for this message?",
    choices: ["Gatekeeper", "Time Machine", "Spotlight", "Boot Camp"],
    answer: [0],
    explanation: "Gatekeeper checks that downloaded apps come from identified developers or the App Store and are notarized by Apple. Time Machine is a backup utility and does not check apps."
  },
  {
    id: "c2-031",
    domain: "1",
    q: "A macOS user downloaded an application packaged as a .dmg file. What is the typical next step to install the application?",
    choices: ["Rename the file to .pkg and run it in Terminal", "Open it in Boot Camp Assistant", "Open the .dmg to mount it, then drag the .app into the Applications folder", "Use Disk Utility to erase the .dmg"],
    answer: [2],
    explanation: "A .dmg is a disk image; opening it mounts a volume that usually contains an .app bundle to drag into Applications. Boot Camp Assistant installs Windows on Intel Macs and is not used to install macOS apps."
  },
  {
    id: "c2-032",
    domain: "1",
    q: "A Linux administrator needs to give a script's owner read, write, and execute permissions, give the group read and execute, and give others no access. Which command should be used?",
    choices: ["chmod 705 script.sh", "chmod 750 script.sh", "chmod 577 script.sh", "chown 750 script.sh"],
    answer: [1],
    explanation: "In octal, 7 = rwx, 5 = r-x, and 0 = no permissions, applied to owner, group, and others in that order, so 750 is correct. chown changes file ownership, not permissions."
  },
  {
    id: "c2-033",
    domain: "1",
    q: "A Linux server is running low on storage. The administrator wants to see free space on each mounted file system and then find which directories use the most space. Which commands should be used? (Choose two.)",
    choices: ["df", "top", "du", "ps", "pwd"],
    answer: [0, 2],
    explanation: "df reports used and available space per mounted file system, and du reports disk usage of files and directories. top and ps show running processes, not disk usage."
  },
  {
    id: "c2-034",
    domain: "1",
    q: "A Linux administrator needs to make a data volume mount automatically at boot and change the DNS servers the system uses. Which files should be edited? (Choose two.)",
    choices: ["/etc/passwd", "/etc/fstab", "/etc/shadow", "/etc/hostname", "/etc/resolv.conf"],
    answer: [1, 4],
    explanation: "/etc/fstab defines file systems to mount at boot, and /etc/resolv.conf lists the DNS name servers. /etc/passwd and /etc/shadow hold account and password-hash information."
  },

  // ===================== Domain 2: Security =====================
  {
    id: "c2-035",
    domain: "2",
    q: "An accounting user is a member of the local Administrators group only so that he can run one accounting application. A security audit flags this configuration. Which security principle does it violate?",
    choices: ["Implicit deny", "Zero Trust", "Defense in depth", "Principle of least privilege"],
    answer: [3],
    explanation: "Least privilege means users get only the access needed to do their jobs, and full administrator rights go far beyond running one application. Implicit deny is a firewall/ACL concept that blocks anything not explicitly allowed."
  },
  {
    id: "c2-036",
    domain: "2",
    q: "A company is implementing MFA. Which factors are examples of 'something you have'? (Choose two.)",
    choices: ["A password", "A hardware security token", "A fingerprint scan", "A one-time code from an authenticator app on the user's smartphone", "A PIN"],
    answer: [1, 3],
    explanation: "A hardware token and an authenticator app on a phone are possession factors. Passwords and PINs are 'something you know,' and a fingerprint is 'something you are.'"
  },
  {
    id: "c2-037",
    domain: "2",
    q: "Twenty users in the Marketing department need Modify access to a new shared folder, and new marketing staff are hired often. What is the MOST efficient way to grant access?",
    choices: ["Assign NTFS permissions to each user account individually", "Create a security group, add the users, and assign the permissions to the group", "Create an organizational unit and assign NTFS permissions to the OU", "Share the folder with the Everyone group"],
    answer: [1],
    explanation: "Assigning permissions to a security group means new hires only need to be added to the group. OUs are containers for organizing objects and applying Group Policy; they cannot be granted NTFS permissions."
  },
  {
    id: "c2-038",
    domain: "2",
    q: "An administrator wants a new Group Policy Object to apply only to computers in the warehouse, not to the rest of the domain. What should the administrator do?",
    choices: ["Place the warehouse computer accounts in an organizational unit and link the GPO to that OU", "Create a distribution group for the warehouse computers", "Configure the settings in Local Group Policy Editor on each domain controller", "Add a login script to every user account"],
    answer: [0],
    explanation: "GPOs are linked to sites, domains, and OUs, so an OU holding the warehouse computers targets them precisely. Distribution groups are for email and cannot be used to assign permissions or target policy."
  },
  {
    id: "c2-039",
    domain: "2",
    q: "Management wants users' Documents folders stored on a file server so they are included in nightly server backups, while users continue to save to Documents as usual. Which Active Directory feature meets this requirement?",
    choices: ["Home folder mapped as drive H:", "Login script", "Folder redirection", "Security group"],
    answer: [2],
    explanation: "Folder redirection points known folders such as Documents to a network location without changing how users save files. A home folder is a separate network location the user must deliberately save to."
  },
  {
    id: "c2-040",
    domain: "2",
    q: "An administrator wants the same network drives to map automatically every time domain users sign in. Which Active Directory feature is traditionally used for this?",
    choices: ["Folder redirection", "Organizational unit", "Home folder", "Login script"],
    answer: [3],
    explanation: "A login script runs at sign-in and can run commands such as net use to map drives. Folder redirection moves user folders to a network path but does not map drive letters."
  },
  {
    id: "c2-041",
    domain: "2",
    q: "Which wireless security protocol replaces the pre-shared key handshake with Simultaneous Authentication of Equals (SAE) to resist offline dictionary attacks?",
    choices: ["WPA2-Personal", "WEP", "WPA3-Personal", "WPA2-Enterprise"],
    answer: [2],
    explanation: "WPA3-Personal uses SAE in place of WPA2's PSK four-way handshake, which protects against offline password guessing. WPA2-Personal still uses PSK."
  },
  {
    id: "c2-042",
    domain: "2",
    q: "During a SOHO audit, a technician finds the wireless router configured for WPA2 with TKIP encryption. What change should the technician make?",
    choices: ["Configure WPA2 to use AES (CCMP) instead of TKIP", "Enable WPS for easier client setup", "Disable SSID broadcast", "Switch to WEP for better compatibility"],
    answer: [0],
    explanation: "TKIP is a legacy, deprecated cipher; WPA2 should use AES (CCMP) for strong encryption. Disabling SSID broadcast only hides the network name and does not fix weak encryption."
  },
  {
    id: "c2-043",
    domain: "2",
    q: "A company wants employees to connect to its WPA3-Enterprise wireless network using their individual credentials, verified by a central authentication server. Which protocol is typically used between the access points and that server?",
    choices: ["RADIUS", "TACACS+", "Kerberos", "SAE"],
    answer: [0],
    explanation: "RADIUS is the standard AAA protocol that 802.1X/Enterprise wireless uses to authenticate users against a central server. TACACS+ is mainly used to authenticate administrators managing network devices."
  },
  {
    id: "c2-044",
    domain: "2",
    q: "A user reports that all documents on a mapped drive now have unfamiliar extensions and will not open, and a text file demands cryptocurrency payment to restore access. Which type of malware is this?",
    choices: ["Spyware", "Adware", "Rootkit", "Ransomware"],
    answer: [3],
    explanation: "Ransomware encrypts files and demands payment for the decryption key. Spyware secretly collects information but does not normally encrypt files or demand payment."
  },
  {
    id: "c2-045",
    domain: "2",
    q: "Anti-malware scans run from within Windows come back clean, but a scan from bootable external media finds malicious code that had modified the kernel to hide its files and processes. Which type of malware is this?",
    choices: ["Adware", "Keylogger", "Rootkit", "Potentially unwanted program (PUP)"],
    answer: [2],
    explanation: "Rootkits gain deep system-level access and hide themselves from the running OS, so scanning from outside the infected OS is often needed. A keylogger captures keystrokes but does not usually hide at kernel level."
  },
  {
    id: "c2-046",
    domain: "2",
    q: "Attackers are exploiting a newly discovered vulnerability in a popular application. The vendor did not know about the flaw, and no patch is available yet. What type of threat is this?",
    choices: ["Zero-day attack", "Brute-force attack", "Non-compliant system", "Spoofing"],
    answer: [0],
    explanation: "A zero-day exploits a vulnerability before the vendor has released a fix. A non-compliant system fails to meet security standards, but the issue here is a flaw no patch can yet address."
  },
  {
    id: "c2-047",
    domain: "2",
    q: "An EDR alert shows PowerShell, launched from a registry Run key, running malicious code directly in memory. No malicious executable file can be found on disk. Which type of malware does this describe?",
    choices: ["Boot sector virus", "Fileless malware", "Trojan", "Cryptominer"],
    answer: [1],
    explanation: "Fileless malware lives in memory and abuses legitimate tools such as PowerShell, leaving little or nothing on disk for file-based scanners. A boot sector virus infects the boot code on a disk."
  },
  {
    id: "c2-048",
    domain: "2",
    q: "A user believes her ex-partner knows her location and has read her text messages. The technician finds an app with an innocent name that has location, SMS, and microphone permissions and sends data to a remote server. What is this app MOST likely?",
    choices: ["Adware", "Ransomware", "Cryptominer", "Stalkerware"],
    answer: [3],
    explanation: "Stalkerware is covertly installed to monitor a specific person's location, messages, and activity. Adware displays unwanted ads but does not normally target and track an individual."
  },
  {
    id: "c2-049",
    domain: "2",
    q: "A user downloads a free photo editor from an untrusted website. The program works as advertised, but it also secretly installed a backdoor that gives an attacker remote access. Which type of malware is this?",
    choices: ["Virus", "Spyware", "Trojan", "Boot sector virus"],
    answer: [2],
    explanation: "A Trojan pretends to be legitimate software while carrying a hidden malicious payload. A virus attaches to files and spreads by infecting other files, which is not described here."
  },
  {
    id: "c2-050",
    domain: "2",
    q: "A small company has no in-house security staff. It wants a third-party provider to monitor its endpoints 24/7, hunt for threats, and respond to incidents for it. Which type of solution should it purchase?",
    choices: ["EDR", "MDR", "XDR", "Email security gateway"],
    answer: [1],
    explanation: "Managed Detection and Response (MDR) is an outsourced service that provides people to monitor, hunt, and respond. EDR and XDR are technologies that still need someone to operate them."
  },
  {
    id: "c2-051",
    domain: "2",
    q: "A company wants to reduce the number of phishing and malware-laden emails that reach users' inboxes by filtering messages before they are delivered. Which solution BEST meets this goal?",
    choices: ["Email security gateway", "EDR agents on each workstation", "User security awareness training", "Content filtering on the wireless access points"],
    answer: [0],
    explanation: "An email security gateway inspects and filters inbound mail for spam, phishing, and malicious attachments before delivery. User education is important but reduces clicks, not the number of emails that arrive."
  },
  {
    id: "c2-052",
    domain: "2",
    q: "The CEO receives a carefully crafted email that uses her name, mentions a real pending acquisition, and asks her to review an attached 'board document.' Which type of attack is this?",
    choices: ["Vishing", "Smishing", "Shoulder surfing", "Whaling"],
    answer: [3],
    explanation: "Whaling is spear phishing aimed at high-level executives such as a CEO. Vishing and smishing use voice calls and text messages rather than email."
  },
  {
    id: "c2-053",
    domain: "2",
    q: "An employee receives a phone call from someone claiming to be from the IT help desk, who asks for the employee's password to 'fix a mailbox problem.' Which social engineering technique is being used?",
    choices: ["Phishing", "Smishing", "Vishing", "Dumpster diving"],
    answer: [2],
    explanation: "Vishing (voice phishing) uses phone calls to trick people into giving away information. Smishing uses SMS text messages."
  },
  {
    id: "c2-054",
    domain: "2",
    q: "Stickers with QR codes have been placed over the official codes on parking meters. Scanning them opens a fake payment site that collects credit card numbers. Which attack is this?",
    choices: ["Smishing", "QR code phishing", "Evil twin", "Spear phishing"],
    answer: [1],
    explanation: "QR code phishing (quishing) uses malicious QR codes to send victims to fraudulent sites. Smishing delivers the malicious link by text message rather than a QR code."
  },
  {
    id: "c2-055",
    domain: "2",
    q: "An unknown person carrying a large box walks closely behind an employee and enters a secure area through a badge-controlled door without badging in. Which social engineering technique is this?",
    choices: ["Tailgating", "Shoulder surfing", "Phishing", "Dumpster diving"],
    answer: [0],
    explanation: "Tailgating is following an authorized person through a secured entrance without using one's own credentials. Shoulder surfing is watching someone's screen or keyboard to steal information."
  },
  {
    id: "c2-056",
    domain: "2",
    q: "At a coffee shop, an attacker sets up a rogue access point broadcasting the same SSID as the shop's legitimate Wi-Fi to capture customers' traffic. Which attack BEST describes this?",
    choices: ["Zero-day attack", "DDoS attack", "Brute-force attack", "Evil twin"],
    answer: [3],
    explanation: "An evil twin is a rogue access point that imitates a legitimate SSID to lure users into connecting. A DDoS attack overwhelms a service with traffic and does not impersonate a network."
  },
  {
    id: "c2-057",
    domain: "2",
    q: "An attacker on the same wired LAN uses ARP poisoning so that traffic between a victim's PC and the default gateway passes through the attacker's machine, where it can be read and changed. Which attack is this?",
    choices: ["Evil twin", "Denial of service", "On-path attack", "SQL injection"],
    answer: [2],
    explanation: "An on-path (man-in-the-middle) attack places the attacker between two parties to intercept or alter traffic. An evil twin is a rogue wireless access point, not ARP poisoning on a wired LAN."
  },
  {
    id: "c2-058",
    domain: "2",
    q: "Authentication logs show thousands of failed sign-ins on one account. The attempted passwords are common words from a wordlist, such as 'sunshine,' 'dragon,' and 'football.' Which type of attack is this?",
    choices: ["Brute-force attack", "Dictionary attack", "Spoofing", "Insider threat"],
    answer: [1],
    explanation: "A dictionary attack tries passwords from a predefined list of common words. A pure brute-force attack systematically tries every possible character combination."
  },
  {
    id: "c2-059",
    domain: "2",
    q: "A web developer finds that typing ' OR '1'='1 into the username field of a login page lets a user sign in without a valid password. Which type of attack is this?",
    choices: ["SQL injection", "Cross-site scripting (XSS)", "On-path attack", "Brute-force attack"],
    answer: [0],
    explanation: "SQL injection inserts SQL syntax into input fields to change the database query the application runs. XSS injects scripts that run in other users' browsers rather than changing database queries."
  },
  {
    id: "c2-060",
    domain: "2",
    q: "Accounts payable receives an email from a long-time supplier's real email account asking to update the bank account used for invoice payments. It later turns out the supplier's mailbox had been taken over by attackers. Which threat does this describe?",
    choices: ["Vishing", "Dumpster diving", "Supply chain attack", "Business email compromise (BEC)"],
    answer: [3],
    explanation: "BEC uses a compromised or spoofed business email account to trick staff into fraudulent payments or data transfers. A supply chain attack compromises a vendor's products or services in order to attack its customers."
  },
  {
    id: "c2-061",
    domain: "2",
    q: "A folder is shared with share permission Full Control for Everyone, while the NTFS permission for the Sales group is Read. What is a Sales user's effective permission when opening the folder over the network?",
    choices: ["Full Control", "Modify", "Read", "No access"],
    answer: [2],
    explanation: "When share and NTFS permissions are combined over the network, the most restrictive one applies, so the result is Read. Full Control would apply only if the NTFS permission were also Full Control."
  },
  {
    id: "c2-062",
    domain: "2",
    q: "On a shared Windows 11 Pro PC, one user wants to encrypt a single folder of personal files so other users of the same PC cannot open them. Full-disk encryption is not required. Which feature should be used?",
    choices: ["BitLocker", "Encrypting File System (EFS)", "BitLocker To Go", "NTFS compression"],
    answer: [1],
    explanation: "EFS encrypts individual files and folders and ties them to the user's account. BitLocker encrypts an entire volume, so once the volume is unlocked it does not separate users of the same PC."
  },
  {
    id: "c2-063",
    domain: "2",
    q: "A technician is hardening a set of Windows workstations. Which settings should be applied? (Choose two.)",
    choices: ["Disable the Guest account", "Enable AutoRun for removable media", "Configure a password-protected screensaver lock after a short idle period", "Set user passwords to never expire", "Share the root of the C: drive for easy support access"],
    answer: [0, 2],
    explanation: "Disabling the Guest account and requiring a password after a screensaver timeout are standard hardening steps. AutoRun should be disabled, not enabled, because it can run malware from removable media automatically."
  },
  {
    id: "c2-064",
    domain: "2",
    q: "An employee's company-managed smartphone, which holds corporate email and documents, was stolen and is confirmed unrecoverable. What should the technician do to protect the corporate data?",
    choices: ["Wait for the locator app to report the device's location", "Issue a remote wipe through the MDM solution", "Push the latest OS update to the device", "Shorten the device's screen lock timeout"],
    answer: [1],
    explanation: "A remote wipe through MDM erases the data on a lost or stolen device. Locator apps help find a device but do not protect the data once recovery is ruled out."
  },
  {
    id: "c2-065",
    domain: "2",
    q: "A company is destroying old storage media before disposal. Which method will NOT reliably destroy data on solid-state drives?",
    choices: ["Drilling", "Shredding", "Incineration", "Degaussing"],
    answer: [3],
    explanation: "Degaussing destroys data on magnetic media such as HDDs and tapes, but SSDs store data in flash memory and are not affected by magnetic fields. Physical destruction such as shredding works on both types."
  },
  {
    id: "c2-066",
    domain: "2",
    q: "A technician is installing a new SOHO wireless router. Which actions should be among the FIRST steps to secure it? (Choose two.)",
    choices: ["Enable UPnP", "Change the default administrator username and password", "Enable WPS", "Update the router's firmware", "Disable the built-in firewall"],
    answer: [1, 3],
    explanation: "Default credentials are publicly known and outdated firmware may have known vulnerabilities, so both should be addressed right away. UPnP and WPS make the router easier to attack and are usually best left disabled."
  },
  {
    id: "c2-067",
    domain: "2",
    q: "A home user wants to host a game server on a PC and allow inbound internet connections ONLY on TCP port 25565. What should the technician configure on the SOHO router?",
    choices: ["Place the PC in the screened subnet (DMZ)", "Disable SSID broadcast", "Configure port forwarding for TCP 25565 to the PC's IP address", "Enable content filtering"],
    answer: [2],
    explanation: "Port forwarding sends only the specified inbound port to the internal host (ideally given a DHCP reservation so its IP does not change). Placing the PC in a DMZ/screened subnet would expose all of its ports to the internet."
  },
  {
    id: "c2-068",
    domain: "2",
    q: "A technician is teaching users safe web browsing practices. Which practices should the technician recommend? (Choose two.)",
    choices: ["Install browser extensions only from the official store or other trusted sources", "Disable the pop-up blocker", "Use a reputable password manager to create and store unique passwords", "Click through certificate warnings to reach the site", "Use private browsing mode to protect against malware"],
    answer: [0, 2],
    explanation: "Trusted extension sources and password managers reduce the risk of malicious add-ons and reused passwords. Private browsing only avoids saving local history and cookies; it does not protect against malware."
  },

  // ===================== Domain 3: Software Troubleshooting =====================
  {
    id: "c2-069",
    domain: "3",
    q: "After installing an updated graphics driver, a Windows 11 PC shows a stop error (BSOD) at every startup. What should the technician do FIRST?",
    choices: ["Boot into Safe Mode and roll back the driver in Device Manager", "Run chkdsk /r on the system drive", "Reimage the PC", "Replace the graphics card"],
    answer: [0],
    explanation: "Safe Mode loads only basic drivers, so the technician can start Windows and roll back the faulty driver. Reimaging or replacing hardware is unnecessary when a recent driver change is the obvious cause."
  },
  {
    id: "c2-070",
    domain: "3",
    q: "A user's sign-in is very slow, and a message says 'You've been signed in with a temporary profile.' Other users sign in to the same PC normally. Which action will MOST likely fix the issue?",
    choices: ["Reimage the PC", "Run sfc /scannow", "Rebuild the user's profile", "Reset the PC to factory defaults"],
    answer: [2],
    explanation: "A temporary-profile message affecting a single user points to a corrupted user profile, which is fixed by rebuilding it and copying the user's data back. Reimaging or resetting the PC is excessive when other profiles work."
  },
  {
    id: "c2-071",
    domain: "3",
    q: "A domain user suddenly cannot sign in and receives authentication errors. The technician notices the PC's clock is 12 minutes ahead of the domain controller. What should the technician do?",
    choices: ["Reset the user's password", "Resynchronize the PC's clock with the domain time source", "Flush the DNS cache with ipconfig /flushdns", "Run gpupdate /force"],
    answer: [1],
    explanation: "Kerberos authentication fails when clocks differ by more than the allowed skew (5 minutes by default), so fixing the time drift restores sign-in. Resetting the password does not fix a time mismatch."
  },
  {
    id: "c2-072",
    domain: "3",
    q: "A Windows service set to Automatic start fails at every boot. Event Viewer shows that it depends on another service that failed to start. What should the technician do?",
    choices: ["Uninstall the application that uses the service", "Set the failing service to Disabled", "Reimage the computer", "Check that the dependency service is configured correctly and running, then restart the failing service"],
    answer: [3],
    explanation: "A service cannot start if a service it depends on is stopped or misconfigured, so fix the dependency in services.msc first. Disabling the service hides the symptom and breaks the functionality the user needs."
  },
  {
    id: "c2-073",
    domain: "3",
    q: "Right after a Windows cumulative update was installed, a line-of-business application crashes at launch on several PCs. The vendor confirms the app is incompatible with that update. What should the technician do?",
    choices: ["Reinstall the line-of-business application", "Roll back (uninstall) the update and pause updates until a fix is released", "Add more RAM to the affected PCs", "Run chkdsk /f on each PC"],
    answer: [1],
    explanation: "Since the update is the confirmed cause, rolling it back and pausing updates restores the app until the vendor or Microsoft releases a fix. Reinstalling the app will not fix an incompatibility with the OS update."
  },
  {
    id: "c2-074",
    domain: "3",
    q: "A user's PC often shows low memory warnings. Task Manager shows memory usage around 95% during the user's normal workload, and no unusual processes are running. What is the BEST long-term solution?",
    choices: ["Run Disk Cleanup", "Disable the paging file", "Install additional RAM", "Run sfc /scannow"],
    answer: [2],
    explanation: "When legitimate workloads use up physical memory, adding RAM is the right fix. Disabling the paging file reduces available virtual memory and makes the problem worse."
  },
  {
    id: "c2-075",
    domain: "3",
    q: "A user connects a webcam, headset, external drive, and two other devices through one USB hub, and Windows reports 'Not enough USB controller resources.' What should the technician try FIRST?",
    choices: ["Connect some devices to ports serviced by a different USB controller", "Reinstall Windows", "Disable the USB Root Hub in Device Manager", "Run chkdsk on the external drive"],
    answer: [0],
    explanation: "This warning appears when a single controller runs out of endpoint resources, so spreading devices across other controllers or ports fixes it. Disabling the root hub would disconnect every device on it."
  },
  {
    id: "c2-076",
    domain: "3",
    q: "After a user installs a second internal drive, the PC displays 'No operating system found' at startup. The original Windows drive is still detected in UEFI. What should the technician check FIRST?",
    choices: ["Run sfc /scannow from Safe Mode", "Reinstall Windows on the new drive", "Format the new drive as NTFS", "The UEFI boot order, making sure Windows Boot Manager or the original drive is first"],
    answer: [3],
    explanation: "Adding a drive can change the boot order so the firmware tries to boot from the new, empty disk. sfc cannot run because Windows is not starting, and reinstalling is unnecessary."
  },
  {
    id: "c2-077",
    domain: "3",
    q: "A user's laptop fans run constantly and the CPU is near 100% even when no applications are open. Task Manager shows an unfamiliar process using most of the CPU, and it restarts after it is ended. What is the MOST likely cause?",
    choices: ["Ransomware", "Cryptominer", "Keylogger", "Adware"],
    answer: [1],
    explanation: "Cryptominers use the system's CPU/GPU to mine cryptocurrency, causing sustained high usage and sluggish performance. Keyloggers are designed to stay quiet and do not usually use heavy CPU."
  },
  {
    id: "c2-078",
    domain: "3",
    q: "A user reports that a Windows 10 PC has become sluggish over the past few months. No hardware has changed. Which steps should the technician take? (Choose two.)",
    choices: ["Enable all visual effects", "Use Task Manager to identify processes with high resource usage", "Disable Windows Update permanently", "Disable unnecessary startup applications", "Increase the display resolution"],
    answer: [1, 3],
    explanation: "Finding resource-heavy processes and reducing startup apps are standard fixes for sluggish performance. Disabling Windows Update leaves the system unpatched and does not address the cause."
  },
  {
    id: "c2-079",
    domain: "3",
    q: "After installing a system utility, a Windows 10 Pro PC becomes unstable, and uninstalling the utility does not help. Restore points exist from before the install, and the user wants to keep personal files. What is the LEAST disruptive next step?",
    choices: ["Reset this PC and remove everything", "Use System Restore to return to a restore point created before the installation", "Reimage the PC", "Perform a clean install of Windows"],
    answer: [1],
    explanation: "System Restore returns system files, drivers, and settings to an earlier state without deleting personal files. Resetting, reimaging, or a clean install removes apps and possibly data, so they are more disruptive."
  },
  {
    id: "c2-080",
    domain: "3",
    q: "A public kiosk PC keeps getting reinfected with malware even after repeated removal. No user data is stored on it, and a standard corporate image is available. What is the MOST effective way to restore it to a known-good state?",
    choices: ["Run System Restore", "Reinstall the web browser", "Reimage the kiosk with the standard corporate image", "Disable the anti-malware software"],
    answer: [2],
    explanation: "Reimaging replaces the whole system with a known-clean image, removing persistent infections, and no user data is lost. System Restore may bring back an infected state and does not guarantee removal."
  },
  {
    id: "c2-081",
    domain: "3",
    q: "A smartphone user reports that one app closes right after opening. All other apps work normally. What should the technician try FIRST?",
    choices: ["Force stop the app, clear its cache, and update or reinstall it", "Factory reset the phone", "Replace the battery", "Enable developer options"],
    answer: [0],
    explanation: "Problems limited to one app are best fixed at the app level by force stopping, clearing the cache, updating, or reinstalling. A factory reset is a last resort for system-wide problems."
  },
  {
    id: "c2-082",
    domain: "3",
    q: "Which symptoms on a smartphone are MOST likely to indicate a security compromise? (Choose two.)",
    choices: ["Unexpected spikes in network/data usage", "Fake security warnings urging the user to install an app", "The screen rotates when the phone is turned sideways", "A notification sound when new email arrives", "The battery drains while streaming video"],
    answer: [0, 1],
    explanation: "Unexplained high network traffic and fake security warnings are common signs of mobile malware. Screen rotation, email notifications, and battery use while streaming are normal behavior."
  },
  {
    id: "c2-083",
    domain: "3",
    q: "Corporate MDM blocks a user's Android phone from accessing company email and marks it as noncompliant. The user admits installing custom firmware that grants superuser access. What is the MOST likely reason for the block?",
    choices: ["The phone's battery is degraded", "The locator app is turned off", "The screen lock uses a pattern instead of a PIN", "The device is rooted, bypassing built-in OS security controls"],
    answer: [3],
    explanation: "Rooting (or jailbreaking on iOS) gives unrestricted system access and bypasses OS security, so MDM policies commonly block such devices. Battery condition does not affect security compliance."
  },
  {
    id: "c2-084",
    domain: "3",
    q: "An Android user installed a game by downloading an APK file from a forum link. The phone now shows constant pop-up ads and sends texts the user did not write. What practice MOST likely led to the infection?",
    choices: ["Enabling automatic OS updates", "Using a device locator app", "Sideloading an APK from an untrusted source", "Installing apps from the Google Play Store"],
    answer: [2],
    explanation: "Sideloading APKs bypasses app store vetting and is a common way malware gets onto Android devices. Installing from the official store is the safer practice, not the cause."
  },
  {
    id: "c2-085",
    domain: "3",
    q: "A smartphone repeatedly fails to install an available OS update. Settings shows only 300MB of free storage. What should the technician do?",
    choices: ["Replace the battery", "Free up storage by removing unused apps and media, then retry the update", "Perform a factory reset immediately", "Disable Wi-Fi and update over cellular"],
    answer: [1],
    explanation: "OS updates need enough free storage to download and install, so freeing space is the logical fix. A factory reset would erase data and is unnecessary for a storage shortage."
  },
  {
    id: "c2-086",
    domain: "3",
    q: "A user's browser home page has changed to an unfamiliar search site, and searches keep redirecting to ad-filled pages. Which actions should the technician take? (Choose two.)",
    choices: ["Remove unknown or recently added browser extensions", "Disable the pop-up blocker", "Switch to private browsing mode", "Run a scan with updated anti-malware software", "Clear the browser history only"],
    answer: [0, 3],
    explanation: "Browser redirection is usually caused by malicious extensions or hijacker malware, so remove suspicious extensions and run an updated anti-malware scan. Private browsing does not remove extensions or malware."
  },
  {
    id: "c2-087",
    domain: "3",
    q: "A user gets certificate warnings on every HTTPS website, including major sites that worked yesterday. The technician sees that the system clock shows a date several years in the past. What should the technician do?",
    choices: ["Reinstall the web browser", "Disable Windows Defender Firewall", "Delete all certificates in the Trusted Root store", "Correct the system date and time"],
    answer: [3],
    explanation: "Certificates are valid only for a specific date range, so a wrong system date makes valid certificates appear invalid. Deleting trusted root certificates would cause even more certificate errors."
  },
  {
    id: "c2-088",
    domain: "3",
    q: "A full-screen browser pop-up claims the user's PC is infected with five viruses and tells the user to call a support number. The pop-up cannot be closed normally. What should the technician do?",
    choices: ["Call the number to get the removal instructions", "Close the browser using Task Manager without interacting with the pop-up, then scan with trusted anti-malware", "Click the pop-up's 'Scan Now' button to check the warning", "Disable the anti-malware software to stop the alerts"],
    answer: [1],
    explanation: "Fake infection alerts are scareware; closing the browser without clicking anything and scanning with trusted tools is the safe response. Clicking buttons on the pop-up may install malware or lead to a scam."
  },
  {
    id: "c2-089",
    domain: "3",
    q: "A user reports frequent pop-ups and several files that have been renamed. Following the CompTIA malware removal process, what should the technician do FIRST?",
    choices: ["Quarantine the infected system", "Disable System Restore in Windows Home", "Investigate and verify malware symptoms", "Remediate the infected system"],
    answer: [2],
    explanation: "The first step is to investigate and verify malware symptoms to confirm that malware is really the cause. Quarantining is the second step, after symptoms are verified."
  },
  {
    id: "c2-090",
    domain: "3",
    q: "A technician has verified malware symptoms on a Windows Home PC and quarantined it from the network. According to the CompTIA malware removal process, what is the NEXT step?",
    choices: ["Educate the end user", "Disable System Restore in Windows Home", "Schedule scans and run updates", "Enable System Restore and create a restore point in Windows Home"],
    answer: [1],
    explanation: "After quarantine, the next step is to disable System Restore so infected restore points are not kept or reused. Scheduling scans and running updates come after remediation."
  },
  {
    id: "c2-091",
    domain: "3",
    q: "Why does the CompTIA malware removal process include disabling System Restore before remediating a Windows Home PC?",
    choices: ["Malware can be stored in restore points and could be reintroduced if a restore point is used later", "System Restore must be off for anti-malware software to update", "Disabling System Restore is required to boot into Safe Mode", "System Restore blocks the PC from being quarantined"],
    answer: [0],
    explanation: "Restore points can contain infected files, so disabling System Restore removes them and prevents reinfection from a restore. It is not required for Safe Mode or for updating anti-malware software."
  },
  {
    id: "c2-092",
    domain: "3",
    q: "Which tasks are part of the 'Remediate infected systems' step of the CompTIA malware removal process? (Choose two.)",
    choices: ["Update anti-malware software", "Educate the end user", "Use scanning and removal techniques, such as Safe Mode or preinstallation environment scans", "Quarantine the infected system", "Enable System Restore and create a restore point"],
    answer: [0, 2],
    explanation: "Remediation involves updating the anti-malware software and then using scanning and removal techniques. Quarantine comes before remediation, and education and re-enabling System Restore come after."
  },
  {
    id: "c2-093",
    domain: "3",
    q: "A technician has removed malware, scheduled scans, run updates, and re-enabled System Restore with a new restore point. Which step of the malware removal process remains?",
    choices: ["Quarantine the infected system", "Investigate and verify malware symptoms", "Disable System Restore in Windows Home", "Educate the end user"],
    answer: [3],
    explanation: "Educating the end user is the final step and helps prevent reinfection. The other steps happen earlier in the process."
  },
  {
    id: "c2-094",
    domain: "3",
    q: "A user keeps getting desktop notifications with advertisements from a website visited last week, where the user clicked 'Allow' on a prompt. Anti-malware scans are clean. What should the technician do?",
    choices: ["Disable Windows Update", "Reinstall the operating system", "Revoke the website's notification permission in the browser settings", "Turn off the browser's pop-up blocker"],
    answer: [2],
    explanation: "Clicking 'Allow' gave the site permission to send push notifications, and removing that permission stops them. Reinstalling the OS is drastic and unnecessary for a browser permission."
  },
  {
    id: "c2-095",
    domain: "3",
    q: "A Windows PC repeatedly fails to install OS updates. Microsoft Defender has been turned off and cannot be turned back on, and the hosts file contains entries that redirect security vendor websites. What is the MOST likely cause?",
    choices: ["An expired Windows product key", "A malware infection that has altered system files and security settings", "The network connection is set as metered", "Insufficient screen resolution"],
    answer: [1],
    explanation: "Disabled security tools, altered system files, and failing OS updates together strongly suggest malware. A metered connection may delay some downloads but would not disable Defender or change the hosts file."
  },

  // ===================== Domain 4: Operational Procedures =====================
  {
    id: "c2-096",
    domain: "4",
    q: "A Tier 1 help desk technician cannot resolve a user's issue within the time allowed by the service-level agreement. What should the technician do?",
    choices: ["Close the ticket and ask the user to submit a new one", "Escalate the ticket to the next support tier and document the troubleshooting already done", "Leave the ticket open without updates until there is more time", "Reassign the ticket to the user's manager"],
    answer: [1],
    explanation: "Escalating with clear notes on what has been tried lets the next tier continue without repeating work. Closing an unresolved ticket hides the problem and breaks the support process."
  },
  {
    id: "c2-097",
    domain: "4",
    q: "A company wants to track each laptop's assigned user, purchase date, warranty expiration, and location. Technicians attach barcode tags to every device. Which process does this describe?",
    choices: ["Asset management using an inventory database", "Change management", "Incident response", "Data retention"],
    answer: [0],
    explanation: "Asset management tracks hardware through its lifecycle using tags and an inventory database. Change management controls modifications to systems, not device inventory."
  },
  {
    id: "c2-098",
    domain: "4",
    q: "New employees must sign a document that defines what they may and may not do with company computers, email, and internet access. What is this document called?",
    choices: ["Standard operating procedure (SOP)", "Incident report", "Network topology diagram", "Acceptable use policy (AUP)"],
    answer: [3],
    explanation: "An AUP defines acceptable and prohibited use of company resources and is often signed by users. An SOP gives step-by-step instructions for performing a specific task."
  },
  {
    id: "c2-099",
    domain: "4",
    q: "A technician finds the fix for a recurring printer driver error and wants other technicians to be able to resolve the same issue quickly in the future. What should the technician create?",
    choices: ["Incident report", "Change request", "Knowledge base article", "Acceptable use policy"],
    answer: [2],
    explanation: "A knowledge base article records a problem and its solution so others can search for it and reuse it. An incident report documents a specific event, such as a security incident, rather than a reusable fix."
  },
  {
    id: "c2-100",
    domain: "4",
    q: "A change request is submitted to upgrade a production database server. Which part of the change request describes how to return the system to its previous state if the upgrade fails?",
    choices: ["Scope of the change", "Rollback plan", "Risk analysis", "End-user acceptance"],
    answer: [1],
    explanation: "The rollback plan explains how to undo the change and restore service if something goes wrong. Risk analysis judges the likelihood and impact of problems but does not give the steps to revert."
  },
  {
    id: "c2-101",
    domain: "4",
    q: "Before deploying a new security patch to production servers, the change board requires it to be tested in an isolated environment that mirrors production. What is this step called?",
    choices: ["Sandbox testing", "End-user acceptance", "Change board approval", "Request forms"],
    answer: [0],
    explanation: "Sandbox testing checks a change in an isolated environment so problems can be found without affecting production. End-user acceptance confirms that users are satisfied with the change, usually after testing."
  },
  {
    id: "c2-102",
    domain: "4",
    q: "A server takes a full backup every Sunday night and a differential backup every other night. The drive fails Thursday morning, before Thursday's backup runs. Which backups are needed to restore the most recent data? (Choose two.)",
    choices: ["Sunday full backup", "Monday differential backup", "Tuesday differential backup", "Wednesday differential backup", "All differential backups from Monday through Wednesday"],
    answer: [0, 3],
    explanation: "Each differential contains all changes since the last full backup, so only the full backup and the latest differential are needed. Restoring every backup in the chain is how incremental backups work."
  },
  {
    id: "c2-103",
    domain: "4",
    q: "An administrator needs the shortest possible nightly backup window and wants each job to copy only the data that changed since the last backup of any type. Which backup type should be used?",
    choices: ["Full", "Differential", "Incremental", "Synthetic full"],
    answer: [2],
    explanation: "Incremental backups copy only changes since the last backup of any type, which makes them the fastest and smallest. Differential backups grow each day because they copy all changes since the last full backup."
  },
  {
    id: "c2-104",
    domain: "4",
    q: "A backup system creates a new full backup by combining the most recent full backup with later incremental backups on the backup server, without reading all the data again from the production server. What is this called?",
    choices: ["Differential backup", "Full backup", "Incremental backup", "Synthetic full backup"],
    answer: [3],
    explanation: "A synthetic full backup is built from existing backup data, which reduces load on the source system. A traditional full backup copies all data directly from the source again."
  },
  {
    id: "c2-105",
    domain: "4",
    q: "Which statement correctly describes the 3-2-1 backup rule?",
    choices: ["Take three backups per day, keep them two days, and assign one administrator", "Keep three copies of the data on two different types of media, with one copy off-site", "Run three full backups, two differentials, and one incremental each week", "Keep three on-site copies, two cloud copies, and one tape copy"],
    answer: [1],
    explanation: "The 3-2-1 rule means three copies of the data (including production), on two different media types, with one copy stored off-site. The other options misstate what the numbers mean."
  },
  {
    id: "c2-106",
    domain: "4",
    q: "During an on-site visit, a customer becomes angry about a problem that keeps coming back. How should the technician respond?",
    choices: ["Explain that the customer probably caused the problem", "Tell the customer to calm down or the visit will end", "Listen without interrupting, avoid arguing or becoming defensive, and restate the issue to confirm understanding", "Take a personal phone call to give the customer time to cool off"],
    answer: [2],
    explanation: "Active listening, staying calm, and clarifying the issue are professional ways to handle a difficult customer. Blaming the customer or taking personal calls is unprofessional and makes the situation worse."
  },
  {
    id: "c2-107",
    domain: "4",
    q: "A technician is about to install memory modules in a workstation. Which practice BEST protects the modules from electrostatic discharge?",
    choices: ["Place the modules on top of the power supply while working", "Set the modules on the carpet next to the PC", "Handle the modules with a magnetized screwdriver", "Wear a properly grounded antistatic wrist strap and work on an ESD mat"],
    answer: [3],
    explanation: "A grounded wrist strap and ESD mat keep the technician and components at the same potential, which prevents static discharge. Carpet tends to build up static charge."
  },
  {
    id: "c2-108",
    domain: "4",
    q: "A fire starts in an energized electrical panel in a server room. Which type of fire extinguisher should be used?",
    choices: ["Water (Class A) extinguisher", "Foam extinguisher", "CO2 extinguisher rated for electrical (Class C) fires", "Wet chemical (Class K) extinguisher"],
    answer: [2],
    explanation: "CO2 extinguishers rated Class C are non-conductive and leave no residue, so they suit electrical fires. Water and foam conduct electricity and create a shock hazard."
  },
  {
    id: "c2-109",
    domain: "4",
    q: "A technician spills toner while replacing a laser printer cartridge and needs the manufacturer's information on safe handling, cleanup, and first aid. Which document should the technician consult?",
    choices: ["Safety data sheet (SDS)", "End-user license agreement (EULA)", "Acceptable use policy (AUP)", "Service-level agreement (SLA)"],
    answer: [0],
    explanation: "A safety data sheet (formerly MSDS) gives handling, hazard, spill, first-aid, and disposal information for a product. An SLA defines service commitments, not chemical safety."
  },
  {
    id: "c2-110",
    domain: "4",
    q: "A technician is clearing out an equipment storage room. Which items must be disposed of according to environmental regulations rather than placed in regular trash? (Choose two.)",
    choices: ["Lithium-ion laptop batteries", "Paper user manuals", "Laser printer toner cartridges", "Cardboard shipping boxes", "Plastic shrink wrap"],
    answer: [0, 2],
    explanation: "Batteries and toner cartridges contain hazardous materials and should be recycled or disposed of according to local regulations and the SDS. Paper and cardboard are ordinary recyclables."
  },
  {
    id: "c2-111",
    domain: "4",
    q: "Brief power outages keep causing a file server to shut down abruptly, which corrupts data. The server needs battery power long enough to ride through short outages or shut down gracefully. Which device should be installed?",
    choices: ["Uninterruptible power supply (UPS)", "Surge suppressor", "Power strip", "Grounding strap"],
    answer: [0],
    explanation: "A UPS supplies battery power during outages and can signal the server to shut down cleanly. A surge suppressor only protects against voltage spikes and provides no power during an outage."
  },
  {
    id: "c2-112",
    domain: "4",
    q: "While repairing a laptop, a technician finds evidence of illegal activity. The drive is secured, and every person who handles it records when, why, and how they took possession of it. What is this documentation called?",
    choices: ["Legal hold", "Data retention policy", "Acceptable use policy", "Chain of custody"],
    answer: [3],
    explanation: "Chain of custody documents every transfer and handling of evidence so it remains admissible. A legal hold is an order to preserve relevant data for litigation, not a record of evidence handling."
  },
  {
    id: "c2-113",
    domain: "4",
    q: "An online retailer stores and processes customer credit card payments. Which compliance standard applies specifically to protecting this cardholder data?",
    choices: ["GDPR", "PHI regulations", "PCI DSS", "EULA"],
    answer: [2],
    explanation: "PCI DSS sets security requirements for organizations that store, process, or transmit payment card data. GDPR is a broad EU privacy regulation for personal data and is not specific to card payments."
  },
  {
    id: "c2-114",
    domain: "4",
    q: "An office manager bought one single-user license of a commercial design application and asks a technician to install it on five office PCs. How should the technician respond?",
    choices: ["Explain that this would violate the EULA and that additional licenses (or a volume/multi-seat license) are required", "Install it on all five PCs because they belong to the same company", "Install it on all five PCs as long as they stay offline", "Install it because commercial software becomes open source after purchase"],
    answer: [0],
    explanation: "A single-user license typically allows installation on one device, so more licenses are needed to stay compliant with the EULA. Company ownership of the PCs does not change the license terms."
  },
  {
    id: "c2-115",
    domain: "4",
    q: "A technician writes a script that uses cmdlets such as Get-Service and Restart-Service to automate service checks on Windows servers. Which file extension should the script use?",
    choices: [".bat", ".ps1", ".vbs", ".sh"],
    answer: [1],
    explanation: "PowerShell scripts use the .ps1 extension, and cmdlets such as Get-Service are PowerShell commands. .bat files are Windows batch scripts, and .sh files are Linux/Unix shell scripts."
  },
  {
    id: "c2-116",
    domain: "4",
    q: "A junior technician wants to run a script found on an online forum on all company workstations to automate cleanup tasks. Which risks should the senior technician point out? (Choose two.)",
    choices: ["Automatically activating unlicensed Windows copies", "Introducing malware from an untrusted script", "Disabling ESD protection on workstations", "Inadvertently changing system settings", "Converting all NTFS volumes to FAT32"],
    answer: [1, 3],
    explanation: "Scripts from untrusted sources can contain malware, and even legitimate scripts can unintentionally change system settings or crash systems by mishandling resources. The other options are not realistic script risks."
  },
  {
    id: "c2-117",
    domain: "4",
    q: "A technician needs encrypted command-line access to a remote Linux server to edit configuration files. Which remote access method should be used?",
    choices: ["Telnet", "RDP", "SSH", "VNC"],
    answer: [2],
    explanation: "SSH provides encrypted remote command-line access and is the standard for administering Linux servers. Telnet also gives command-line access, but it sends everything, including credentials, in plaintext."
  },
  {
    id: "c2-118",
    domain: "4",
    q: "A managed service provider supports hundreds of client endpoints. It needs one platform to monitor device health, deploy patches automatically, receive alerts, and remotely access devices. Which type of tool should it use?",
    choices: ["Remote monitoring and management (RMM)", "Microsoft Remote Assistance (MSRA)", "VNC", "VPN"],
    answer: [0],
    explanation: "RMM platforms combine monitoring, alerting, patching, and remote access across many endpoints. MSRA offers one-to-one remote help sessions but no monitoring or patch management."
  },
  {
    id: "c2-119",
    domain: "4",
    q: "An employee wants to paste a spreadsheet of customer names, addresses, and account numbers into a free public AI chatbot to get a summary. What should the employee do?",
    choices: ["Use the public chatbot because it is faster than internal tools", "Paste the data, then delete the chat history afterward", "Email the data to a personal account and use the chatbot from home", "Follow the company AI policy and use an approved private/enterprise AI tool, because public AI services may retain or train on submitted data"],
    answer: [3],
    explanation: "Public AI services may store or reuse submitted data, so PII should only go into approved, private AI tools as defined by the AI policy. Deleting the chat history afterward does not guarantee the provider has not already kept the data."
  },
  {
    id: "c2-120",
    domain: "4",
    q: "A technician asks an AI assistant for a PowerShell command. The response confidently uses a cmdlet that does not exist and cites documentation that cannot be found. Which AI limitation does this show?",
    choices: ["Bias", "Hallucination", "Data privacy breach", "Licensing violation"],
    answer: [1],
    explanation: "A hallucination is when AI generates confident but false or made-up information, so AI output should always be checked for accuracy. Bias refers to skewed or unfair results caused by training data, not invented facts."
  }
];
