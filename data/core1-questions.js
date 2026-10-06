window.DATA = window.DATA || {};
DATA.core1Questions = [
  // ===================== Domain 1: Mobile Devices =====================
  {
    id: "c1-001",
    domain: "1",
    q: "A technician is upgrading the memory in a thin-and-light laptop that has an accessible memory slot. Which memory module form factor will the technician most likely need?",
    choices: ["DIMM", "SODIMM", "LGA", "mSATA"],
    answer: [1],
    explanation: "Laptops use SODIMM (small outline DIMM) modules, which are roughly half the length of desktop DIMMs. Full-size DIMMs are for desktops, LGA is a CPU socket type, and mSATA is a storage form factor, not memory."
  },
  {
    id: "c1-002",
    domain: "1",
    q: "A user wants a smartphone display that shows true blacks and does not use a backlight, because each pixel produces its own light. Which display type should the user choose?",
    choices: ["IPS LCD", "TN LCD", "VA LCD", "OLED"],
    answer: [3],
    explanation: "OLED pixels are self-emissive, so a black pixel is simply turned off, producing true black with no backlight. IPS, TN, and VA are all LCD technologies that require a backlight."
  },
  {
    id: "c1-003",
    domain: "1",
    q: "A retail store wants customers to pay by tapping their smartphones against a payment terminal from only a few centimeters away. Which technology does this use?",
    choices: ["Bluetooth", "Wi-Fi Direct", "NFC", "Infrared"],
    answer: [2],
    explanation: "Near-field communication (NFC) works at a range of a few centimeters and is used for contactless (tap-to-pay) transactions. Bluetooth works at much longer ranges (meters) and requires pairing."
  },
  {
    id: "c1-004",
    domain: "1",
    q: "A user is trying to pair a new Bluetooth headset with a smartphone, but the headset does not appear in the phone's list of available devices. Bluetooth is enabled on the phone. What should the user do first?",
    choices: ["Put the headset into pairing (discoverable) mode", "Enter the PIN 0000 on the phone", "Enable NFC on the phone", "Forget all previously paired devices on the phone"],
    answer: [0],
    explanation: "A Bluetooth device must be in pairing/discoverable mode before the phone can find it. Entering a PIN happens only after the device has been found and selected."
  },
  {
    id: "c1-005",
    domain: "1",
    q: "A salesperson's laptop has no Wi-Fi available while traveling on a train, but the salesperson's smartphone has a strong cellular data signal. What is the quickest way to get the laptop online?",
    choices: ["Enable airplane mode on the phone", "Enable the phone's mobile hotspot and connect the laptop to it", "Pair the phone to the laptop using NFC", "Configure a VPN on the laptop"],
    answer: [1],
    explanation: "A mobile hotspot (tethering) shares the phone's cellular data connection with other devices over Wi-Fi, USB, or Bluetooth. A VPN only secures an existing connection; it does not provide internet access."
  },
  {
    id: "c1-006",
    domain: "1",
    q: "A company issues smartphones to employees for corporate email. Management wants to enforce screen-lock passcodes, push approved apps, and remotely wipe lost devices. Which solution should be implemented?",
    choices: ["A VPN concentrator", "A mobile hotspot policy", "Full-device encryption only", "Mobile device management (MDM)"],
    answer: [3],
    explanation: "MDM centrally enforces policies such as passcodes, app deployment, and remote wipe on mobile devices. Encryption alone protects data at rest but cannot push apps or wipe a lost device."
  },
  {
    id: "c1-007",
    domain: "1",
    q: "A technician is about to replace the keyboard in a laptop. After putting on an ESD strap, what should the technician do before removing any components?",
    choices: ["Disconnect the AC adapter and disconnect or remove the battery", "Update the BIOS/UEFI firmware", "Remove the display assembly", "Boot the laptop into Safe Mode"],
    answer: [0],
    explanation: "Removing all power sources (AC adapter and battery) protects both the technician and the components before disassembly. Firmware updates and Safe Mode have nothing to do with a physical keyboard replacement."
  },
  {
    id: "c1-008",
    domain: "1",
    q: "Which of the following display technologies require a separate backlight to produce a visible image? (Choose two.)",
    choices: ["OLED", "IPS", "AMOLED", "VA", "Micro LED"],
    answer: [1, 3],
    explanation: "IPS and VA are LCD panel types; liquid crystals do not emit light, so they need an LED backlight. OLED, AMOLED, and Micro LED are self-emissive and need no backlight."
  },
  {
    id: "c1-009",
    domain: "1",
    q: "A technician is replacing a failed drive in a laptop. The motherboard has an M.2 2280 slot that supports PCIe NVMe drives. Which replacement will provide the best performance?",
    choices: ["2.5-inch SATA SSD", "mSATA SSD", "M.2 2280 NVMe SSD", "2.5-inch 7,200 RPM HDD"],
    answer: [2],
    explanation: "NVMe drives use PCIe lanes and are several times faster than SATA, which tops out around 600 MB/s. mSATA uses a different, older connector and is limited to SATA speeds."
  },
  {
    id: "c1-010",
    domain: "1",
    q: "Which component of a smartphone or tablet display converts a user's finger touches into input signals for the device?",
    choices: ["Backlight", "Accelerometer", "Inverter", "Digitizer"],
    answer: [3],
    explanation: "The digitizer is the touch-sensitive layer that translates touches into digital input. The accelerometer detects orientation and motion, and an inverter powered old CCFL backlights."
  },
  {
    id: "c1-011",
    domain: "1",
    q: "A passenger enables airplane mode on a smartphone during a flight but wants to keep using Bluetooth earbuds. What should the passenger do?",
    choices: ["Disable airplane mode and turn off cellular data only", "Manually turn Bluetooth back on while airplane mode remains enabled", "Enable the mobile hotspot", "Pair the earbuds using NFC"],
    answer: [1],
    explanation: "Airplane mode turns off the device's radios, but modern phones let users re-enable Bluetooth and Wi-Fi individually while the cellular radio stays off. Disabling airplane mode would turn the cellular radio back on."
  },
  {
    id: "c1-012",
    domain: "1",
    q: "An employee wants to connect a laptop to two external monitors, a wired network, a keyboard, and a mouse at a desk using a single cable. Which accessory best meets this need?",
    choices: ["USB-C/Thunderbolt docking station", "USB 2.0 hub", "HDMI splitter", "Bluetooth adapter"],
    answer: [0],
    explanation: "A USB-C or Thunderbolt docking station provides video, network, USB, and often power over a single connection. A USB 2.0 hub cannot drive multiple displays, and an HDMI splitter mirrors one output."
  },
  {
    id: "c1-013",
    domain: "1",
    q: "A company's MDM solution must protect corporate data on a smartphone that an employee has reported lost. Which MDM capabilities should be used? (Choose two.)",
    choices: ["Increase the screen timeout", "Remote wipe", "Enable Bluetooth discoverable mode", "Remote lock", "Disable automatic OS updates"],
    answer: [1, 3],
    explanation: "Remote lock prevents use of the device, and remote wipe erases corporate data from it. Making the device discoverable or lengthening the screen timeout would increase, not reduce, risk."
  },
  {
    id: "c1-014",
    domain: "1",
    q: "After replacing a cracked laptop screen, a technician notices the laptop's Wi-Fi signal is much weaker than before. What is the most likely cause?",
    choices: ["The new screen uses a different refresh rate", "The laptop battery needs calibration", "The Wi-Fi antenna leads routed through the display assembly were not reconnected or were pinched", "The display's digitizer is interfering with the 5 GHz band"],
    answer: [2],
    explanation: "Laptop Wi-Fi antennas are usually built into the display lid, with leads running to the wireless card, so a screen replacement can disturb them. Refresh rate and battery calibration do not affect wireless reception."
  },
  {
    id: "c1-015",
    domain: "1",
    q: "A field-service app must record a technician's precise location at remote job sites where there is no cellular or Wi-Fi coverage. Which technology must be enabled on the tablet?",
    choices: ["GPS", "NFC", "Bluetooth", "Mobile hotspot"],
    answer: [0],
    explanation: "GPS calculates location from satellite signals and works without cellular or Wi-Fi coverage. Wi-Fi and cellular location services need nearby networks, and NFC has no location function."
  },
  {
    id: "c1-016",
    domain: "1",
    q: "A user with a new iPhone 15 asks which cable is needed for charging and data transfer. Which connector does the device use?",
    choices: ["Lightning", "Micro-USB", "USB-C", "Mini-USB"],
    answer: [2],
    explanation: "Starting with the iPhone 15, Apple replaced its proprietary Lightning connector with USB-C. Lightning was used on earlier iPhone models."
  },

  // ===================== Domain 2: Networking =====================
  {
    id: "c1-017",
    domain: "2",
    q: "A systems administrator needs to securely manage a remote Linux server from a command-line session. Which port must be allowed through the server's firewall?",
    choices: ["23", "3389", "22", "443"],
    answer: [2],
    explanation: "SSH uses TCP 22 for encrypted remote command-line access. Telnet (23) sends everything, including passwords, in clear text, and RDP (3389) is a graphical remote desktop protocol."
  },
  {
    id: "c1-018",
    domain: "2",
    q: "Which of the following port and protocol pairings is correct?",
    choices: ["Telnet - TCP 22", "IMAP - TCP 110", "SMB - TCP 143", "RDP - TCP 3389"],
    answer: [3],
    explanation: "Remote Desktop Protocol uses TCP 3389. Telnet uses 23 (SSH is 22), IMAP uses 143 (POP3 is 110), and SMB uses 445."
  },
  {
    id: "c1-019",
    domain: "2",
    q: "A user is configuring a desktop email client that must send outgoing mail and keep mail folders synchronized with the server across several devices. Which default ports are used for these two functions? (Choose two.)",
    choices: ["25", "110", "143", "23", "389"],
    answer: [0, 2],
    explanation: "SMTP (25) sends mail, and IMAP (143) keeps messages and folders synchronized on the server for multiple devices. POP3 (110) typically downloads mail to one device and does not synchronize folders."
  },
  {
    id: "c1-020",
    domain: "2",
    q: "A technician is configuring a firewall between client workstations and a DHCP server. Which ports must be allowed so clients can obtain IP addresses?",
    choices: ["TCP 20 and 21", "UDP 67 and 68", "UDP 161 and 162", "TCP 137 and 139"],
    answer: [1],
    explanation: "DHCP uses UDP 67 (server) and UDP 68 (client). Ports 20/21 are FTP, 161/162 are SNMP, and 137-139 are NetBIOS."
  },
  {
    id: "c1-021",
    domain: "2",
    q: "An application must query a company's directory service to look up user accounts and group memberships. Which protocol and default port will it use?",
    choices: ["SNMP on port 161", "SMB on port 445", "RDP on port 3389", "LDAP on port 389"],
    answer: [3],
    explanation: "LDAP (Lightweight Directory Access Protocol) uses port 389 to query directory services such as Active Directory. SMB on 445 is for file and printer sharing, not directory queries."
  },
  {
    id: "c1-022",
    domain: "2",
    q: "Windows workstations on a modern network access shared folders directly over TCP/IP without using NetBIOS. Which port does this traffic use?",
    choices: ["445", "139", "389", "443"],
    answer: [0],
    explanation: "SMB runs directly over TCP 445. Ports 137-139 are used by NetBIOS over TCP/IP, which legacy SMB relied on."
  },
  {
    id: "c1-023",
    domain: "2",
    q: "A network monitoring server must receive unsolicited alert messages (traps) sent by switches and routers. Which port must be open on the monitoring server?",
    choices: ["UDP 162", "UDP 161", "TCP 389", "TCP 445"],
    answer: [0],
    explanation: "SNMP traps are sent to the manager on UDP 162. UDP 161 is used by agents to answer polling requests from the manager."
  },
  {
    id: "c1-024",
    domain: "2",
    q: "A technician must allow traditional FTP file transfers through a firewall. Which ports are used for FTP data and control? (Choose two.)",
    choices: ["22", "20", "69", "21", "23"],
    answer: [1, 3],
    explanation: "FTP uses TCP 21 for control commands and TCP 20 for data (active mode). Port 22 is SSH/SFTP, 69 is TFTP, and 23 is Telnet."
  },
  {
    id: "c1-025",
    domain: "2",
    q: "A warehouse has older handheld scanners that support only the 2.4 GHz band. Which wireless standards operate exclusively in the 2.4 GHz band? (Choose two.)",
    choices: ["802.11a", "802.11b", "802.11ac", "802.11g", "802.11ax"],
    answer: [1, 3],
    explanation: "802.11b and 802.11g operate only at 2.4 GHz. 802.11a and 802.11ac are 5 GHz only, and 802.11ax supports 2.4 GHz and 5 GHz (plus 6 GHz with Wi-Fi 6E)."
  },
  {
    id: "c1-026",
    domain: "2",
    q: "A company wants to use the 6 GHz band to avoid congestion on 2.4 GHz and 5 GHz. Which Wi-Fi generation first added support for the 6 GHz band?",
    choices: ["Wi-Fi 4 (802.11n)", "Wi-Fi 5 (802.11ac)", "Wi-Fi 6E (802.11ax)", "Wi-Fi 6 (802.11ax)"],
    answer: [2],
    explanation: "Wi-Fi 6E extends 802.11ax into the 6 GHz band. Standard Wi-Fi 6 uses only 2.4 GHz and 5 GHz."
  },
  {
    id: "c1-027",
    domain: "2",
    q: "A technician is installing three access points with overlapping coverage on a 2.4 GHz network in North America. Which channel assignment minimizes interference?",
    choices: ["2, 4, 6", "3, 6, 9", "1, 2, 3", "1, 6, 11"],
    answer: [3],
    explanation: "Channels 1, 6, and 11 are the only non-overlapping 20 MHz channels in the North American 2.4 GHz band. The other combinations use channels whose frequencies overlap."
  },
  {
    id: "c1-028",
    domain: "2",
    q: "Which IEEE standard is marketed as Wi-Fi 7 and supports channel widths of up to 320 MHz in the 6 GHz band?",
    choices: ["802.11ax", "802.11be", "802.11ac", "802.11n"],
    answer: [1],
    explanation: "802.11be is Wi-Fi 7, which adds 320 MHz channels and multi-link operation across 2.4, 5, and 6 GHz. 802.11ax is Wi-Fi 6/6E, with channels of up to 160 MHz."
  },
  {
    id: "c1-029",
    domain: "2",
    q: "A network team wants a centralized AAA solution for administrators logging in to routers and switches. It must use TCP, encrypt the entire packet payload, and handle authentication, authorization, and accounting separately. Which should be implemented?",
    choices: ["TACACS+", "RADIUS", "LDAP", "Syslog"],
    answer: [0],
    explanation: "TACACS+ uses TCP, encrypts the entire payload, and separates the three AAA functions, which makes it well suited to device administration. RADIUS uses UDP, encrypts only the password, and combines authentication and authorization."
  },
  {
    id: "c1-030",
    domain: "2",
    q: "A security analyst wants event logs from firewalls, switches, and Linux servers sent to a single location for review and alerting. Which networked host service provides this?",
    choices: ["Syslog server", "Proxy server", "DHCP server", "Load balancer"],
    answer: [0],
    explanation: "A syslog server collects log messages from many network devices and hosts in one central location. A load balancer distributes client requests across servers and does not collect logs."
  },
  {
    id: "c1-031",
    domain: "2",
    q: "A company wants all employee web requests to pass through a server that caches frequently accessed pages and blocks prohibited websites. Which server should be deployed?",
    choices: ["Load balancer", "Spam gateway", "Proxy server", "File server"],
    answer: [2],
    explanation: "A proxy server makes web requests on behalf of clients, which lets it cache content and filter URLs. A load balancer spreads incoming requests across multiple servers, and a spam gateway filters email."
  },
  {
    id: "c1-032",
    domain: "2",
    q: "A small business wants a single appliance that provides a firewall, intrusion prevention, antivirus scanning, and content filtering. Which device best fits this need?",
    choices: ["Managed switch", "Load balancer", "Spam gateway", "Unified threat management (UTM) appliance"],
    answer: [3],
    explanation: "A UTM appliance combines firewall, IPS, antimalware, and content filtering in one device. A spam gateway filters only email traffic."
  },
  {
    id: "c1-033",
    domain: "2",
    q: "A water treatment plant uses networked systems to monitor and control pumps, valves, and sensors across multiple remote sites. What type of system is this?",
    choices: ["SCADA", "VDI", "SAN", "UTM"],
    answer: [0],
    explanation: "Supervisory control and data acquisition (SCADA) systems monitor and control industrial equipment and infrastructure. A SAN is a storage network, and VDI delivers virtual desktops."
  },
  {
    id: "c1-034",
    domain: "2",
    q: "A company is moving its email to a new hosted mail provider. Which DNS record must be updated so that other mail servers deliver incoming email to the new provider?",
    choices: ["CNAME", "MX", "AAAA", "PTR"],
    answer: [1],
    explanation: "The MX (mail exchanger) record tells sending servers which host accepts email for the domain. A CNAME is an alias for another hostname, and AAAA maps a name to an IPv6 address."
  },
  {
    id: "c1-035",
    domain: "2",
    q: "An administrator is configuring SPF, DKIM, and DMARC to reduce spoofed email that claims to come from the company's domain. Which DNS record type is used to publish these?",
    choices: ["MX", "CNAME", "TXT", "A"],
    answer: [2],
    explanation: "SPF policies, DKIM public keys, and DMARC policies are published as TXT records. MX records only identify the domain's incoming mail servers."
  },
  {
    id: "c1-036",
    domain: "2",
    q: "A web server has both an IPv4 address and an IPv6 address. Which DNS records should be created so that clients can resolve the server's name over both protocols? (Choose two.)",
    choices: ["A", "MX", "TXT", "CNAME", "AAAA"],
    answer: [0, 4],
    explanation: "An A record maps a hostname to an IPv4 address, and an AAAA record maps it to an IPv6 address. A CNAME only points one name to another name and does not hold an address itself."
  },
  {
    id: "c1-037",
    domain: "2",
    q: "A network printer gets its IP address from DHCP, but users cannot print whenever its address changes. The administrator wants the printer to always receive the same address while still using DHCP. What should be configured?",
    choices: ["A DHCP exclusion range", "A shorter lease time", "A DHCP reservation based on the printer's MAC address", "A new DHCP scope"],
    answer: [2],
    explanation: "A DHCP reservation ties a specific IP address to the printer's MAC address, so it always receives the same address. An exclusion only prevents DHCP from handing out the excluded addresses at all."
  },
  {
    id: "c1-038",
    domain: "2",
    q: "An administrator wants to logically separate the accounting department's traffic from guest devices that connect to the same physical switch. What should be configured?",
    choices: ["VLANs", "A VPN", "Port forwarding", "DHCP reservations"],
    answer: [0],
    explanation: "VLANs create separate broadcast domains on the same physical switch, isolating traffic logically. A VPN creates an encrypted tunnel across another network, usually the internet."
  },
  {
    id: "c1-039",
    domain: "2",
    q: "Remote employees need to securely access internal file shares over the internet as if they were connected to the office network. Which technology should be implemented?",
    choices: ["VLAN", "NAT", "PoE", "VPN"],
    answer: [3],
    explanation: "A VPN creates an encrypted tunnel over the internet that gives remote users access to internal resources. VLANs segment a local network and do not provide secure remote access."
  },
  {
    id: "c1-040",
    domain: "2",
    q: "A rural home has no cable, DSL, or fiber service. A local provider offers internet access by mounting a directional antenna on the roof, aimed at the provider's tower several miles away. What type of internet connection is this?",
    choices: ["Cable", "WISP", "DSL", "Fiber"],
    answer: [1],
    explanation: "A wireless internet service provider (WISP) delivers fixed wireless service, often over a line-of-sight link to a tower. Cable uses coaxial cable, and DSL uses telephone lines."
  },
  {
    id: "c1-041",
    domain: "2",
    q: "A company connects its servers to a dedicated high-speed network that provides block-level access to shared storage arrays. What type of network is this?",
    choices: ["PAN", "MAN", "SAN", "WLAN"],
    answer: [2],
    explanation: "A storage area network (SAN) gives servers block-level access to shared storage. A PAN is a short-range personal network such as Bluetooth, and a MAN spans a city or metro area."
  },
  {
    id: "c1-042",
    domain: "2",
    q: "A technician is installing a new patch panel and must terminate the horizontal cable runs, then verify that each run is wired correctly. Which tools are needed? (Choose two.)",
    choices: ["Punchdown tool", "Loopback plug", "Cable tester", "Wi-Fi analyzer", "Toner probe"],
    answer: [0, 2],
    explanation: "A punchdown tool seats wires into the patch panel's IDC terminals, and a cable tester verifies continuity and the pinout. A toner probe locates a cable but does not verify its wiring."
  },
  {
    id: "c1-043",
    domain: "2",
    q: "A security team needs to passively copy all traffic on a network link to a monitoring device without disrupting traffic on that link. Which device should be installed?",
    choices: ["Toner probe", "Network tap", "Loopback plug", "Crimper"],
    answer: [1],
    explanation: "A network tap copies traffic passing over a link and sends it to a monitoring or analysis tool. A loopback plug tests a single port by sending its signal back to itself."
  },
  {
    id: "c1-044",
    domain: "2",
    q: "Which of the following are private IPv4 addresses as defined by RFC 1918? (Choose two.)",
    choices: ["172.20.5.4", "169.254.10.20", "192.168.50.1", "172.32.1.1", "11.0.0.5"],
    answer: [0, 2],
    explanation: "The private ranges are 10.0.0.0/8, 172.16.0.0-172.31.255.255, and 192.168.0.0/16. 172.32.1.1 is outside the 172.16-31 range, and 169.254.x.x is the APIPA link-local range, not an RFC 1918 range."
  },
  {
    id: "c1-045",
    domain: "2",
    q: "A user hosts a game server on a home PC and wants friends on the internet to be able to connect to it. What should be configured on the SOHO router?",
    choices: ["MAC address filtering", "A DHCP exclusion", "Port forwarding to the PC's private IP address", "Content filtering"],
    answer: [2],
    explanation: "Port forwarding sends inbound traffic arriving at the router's public IP on a specific port to an internal host behind NAT. MAC filtering only controls which devices can join the network."
  },

  // ===================== Domain 3: Hardware =====================
  {
    id: "c1-046",
    domain: "3",
    q: "A technician must run a copper cable 90 meters (295 feet) between a switch and a server rack, and the link must support 10 Gbps. Which is the minimum cable category that meets this requirement?",
    choices: ["Cat5", "Cat5e", "Cat6a", "Cat6"],
    answer: [2],
    explanation: "Cat6a supports 10GBASE-T over the full 100 meters. Cat6 supports 10 Gbps only up to about 55 meters, and Cat5e is rated for 1 Gbps."
  },
  {
    id: "c1-047",
    domain: "3",
    q: "A network cable must be run through the space above a drop ceiling that the HVAC system uses for air circulation. Which cable type is required by fire code?",
    choices: ["PVC-jacketed", "Plenum-rated", "Direct burial", "Shielded twisted pair"],
    answer: [1],
    explanation: "Plenum-rated cable has a fire-resistant jacket that produces little smoke and fewer toxic fumes, as required in air-handling spaces. Standard PVC jackets release toxic smoke when they burn."
  },
  {
    id: "c1-048",
    domain: "3",
    q: "Network cables in a manufacturing plant run alongside large electric motors, and users experience frequent transmission errors. Which copper cable type should be used to reduce electromagnetic interference?",
    choices: ["Unshielded Cat6", "Plenum-rated UTP", "Cat5e patch cable", "Shielded twisted pair (STP)"],
    answer: [3],
    explanation: "Shielded twisted pair adds foil or braided shielding that protects the signal from EMI. A plenum rating concerns fire safety, not interference."
  },
  {
    id: "c1-049",
    domain: "3",
    q: "A company must connect two buildings that are 10 km (about 6 miles) apart with a fiber link. Which cable type should be used?",
    choices: ["Multimode fiber", "Single-mode fiber", "Cat6a", "RG-6 coaxial"],
    answer: [1],
    explanation: "Single-mode fiber uses a narrow core and laser light to carry signals over many kilometers. Multimode fiber is designed for shorter distances, typically hundreds of meters."
  },
  {
    id: "c1-050",
    domain: "3",
    q: "A technician is installing a cable modem for a residential customer. Which cable and connector connect the modem to the ISP's wall outlet?",
    choices: ["RG-6 with an F-type connector", "Cat6 with an RJ45 connector", "Telephone cable with an RJ11 connector", "Multimode fiber with an LC connector"],
    answer: [0],
    explanation: "Cable internet is delivered over RG-6 coaxial cable with screw-on F-type connectors. RJ11 telephone connectors are used for DSL."
  },
  {
    id: "c1-051",
    domain: "3",
    q: "A user's laptop has a USB-C port marked with a lightning-bolt symbol. The port supports 40 Gbps transfers, daisy-chained displays, and external GPUs. Which interface does this port provide?",
    choices: ["eSATA", "USB 2.0", "Thunderbolt", "Lightning"],
    answer: [2],
    explanation: "Thunderbolt 3 and 4 use the USB-C connector, carry up to 40 Gbps, and support daisy-chaining and PCIe devices such as external GPUs. Lightning is Apple's proprietary connector for older mobile devices."
  },
  {
    id: "c1-052",
    domain: "3",
    q: "A technician is installing a 2.5-inch SATA SSD in a desktop computer. Which power connector from the PSU should be used?",
    choices: ["15-pin SATA power", "4-pin Molex", "24-pin ATX", "8-pin EPS"],
    answer: [0],
    explanation: "SATA drives use a 15-pin SATA power connector. Molex is a legacy 4-pin connector for older IDE drives and fans, and the 24-pin and EPS connectors power the motherboard and CPU."
  },
  {
    id: "c1-053",
    domain: "3",
    q: "A technician is working with a fiber connector that has a round barrel and uses a bayonet-style twist-lock mechanism. Which connector is this?",
    choices: ["LC", "SC", "ST", "F-type"],
    answer: [2],
    explanation: "ST (straight tip) connectors use a bayonet twist-lock. SC connectors are square push-pull connectors, LC connectors are small form factor with a latch, and F-type is a coaxial connector."
  },
  {
    id: "c1-054",
    domain: "3",
    q: "A technician is purchasing a drive for a motherboard's M.2 slot. Which interfaces can an M.2 drive use? (Choose two.)",
    choices: ["eSATA", "SATA", "PCIe (NVMe)", "Molex", "Thunderbolt"],
    answer: [1, 2],
    explanation: "M.2 is a form factor that can carry either SATA or PCIe (NVMe) signaling, depending on the drive and slot. eSATA is an external SATA port, and Molex is a power connector."
  },
  {
    id: "c1-055",
    domain: "3",
    q: "A user purchased DDR5 memory to upgrade a desktop whose motherboard has DDR4 slots. What will happen?",
    choices: ["The modules will run at DDR4 speeds", "The modules will not fit because the key notch is in a different position", "The modules will run only in single-channel mode", "The modules will work after a BIOS update"],
    answer: [1],
    explanation: "DDR generations are keyed differently and are not backward compatible, so DDR5 modules physically cannot be installed in DDR4 slots. No firmware update changes this."
  },
  {
    id: "c1-056",
    domain: "3",
    q: "A server administrator wants memory that can detect and correct single-bit errors to improve reliability. Which type of RAM should be purchased?",
    choices: ["Non-ECC unbuffered", "SODIMM", "Higher-frequency non-ECC", "ECC"],
    answer: [3],
    explanation: "Error-correcting code (ECC) memory detects and corrects single-bit errors, which is why it is used in servers. A faster clock speed does not add error correction."
  },
  {
    id: "c1-057",
    domain: "3",
    q: "A technician is installing two identical memory modules on a motherboard with four slots labeled A1, A2, B1, and B2. How should the modules be installed to enable dual-channel operation?",
    choices: ["In slots A1 and A2", "In slots B1 and B2", "One in an A slot and one in a B slot, as the motherboard manual specifies (for example, A2 and B2)", "In any two slots, because dual-channel mode does not depend on placement"],
    answer: [2],
    explanation: "Dual-channel mode requires one module in each channel (A and B), in the slots the manual recommends. Putting both modules in the same channel (A1 and A2) leaves the system in single-channel mode."
  },
  {
    id: "c1-058",
    domain: "3",
    q: "A small office server has two identical drives. The owner wants the data to survive the failure of either drive. Which RAID level should be configured?",
    choices: ["RAID 1", "RAID 0", "RAID 5", "RAID 10"],
    answer: [0],
    explanation: "RAID 1 mirrors data across two drives, so either drive can fail without data loss. RAID 0 has no fault tolerance, RAID 5 needs at least three drives, and RAID 10 needs at least four."
  },
  {
    id: "c1-059",
    domain: "3",
    q: "A file server must keep running even if any two drives in its array fail at the same time. Which RAID level provides this protection using striping with parity?",
    choices: ["RAID 1", "RAID 5", "RAID 6", "RAID 0"],
    answer: [2],
    explanation: "RAID 6 uses dual parity (minimum four drives) and survives any two drive failures. RAID 5 uses single parity and survives only one."
  },
  {
    id: "c1-060",
    domain: "3",
    q: "Which of the following RAID levels use striping with parity? (Choose two.)",
    choices: ["RAID 0", "RAID 1", "RAID 5", "RAID 6", "RAID 10"],
    answer: [2, 3],
    explanation: "RAID 5 (single parity) and RAID 6 (dual parity) both stripe data with parity. RAID 0 stripes without parity, RAID 1 mirrors, and RAID 10 stripes across mirrored pairs."
  },
  {
    id: "c1-061",
    domain: "3",
    q: "A technician needs a mechanical hard drive with the fastest possible access times for a database server. Which spindle speed should be chosen?",
    choices: ["5,400 RPM", "7,200 RPM", "10,000 RPM", "15,000 RPM"],
    answer: [3],
    explanation: "Higher spindle speeds reduce rotational latency, and 15,000 RPM is the fastest common enterprise HDD speed. 5,400 RPM drives are typically used where low power matters more than speed."
  },
  {
    id: "c1-062",
    domain: "3",
    q: "A user wants to build a very compact home theater PC using a motherboard that measures 170 mm x 170 mm. Which form factor is this?",
    choices: ["ATX", "microATX", "Mini-ITX", "Extended ATX"],
    answer: [2],
    explanation: "Mini-ITX boards measure 170 mm x 170 mm and are used in small builds. microATX boards are up to 244 mm x 244 mm, and standard ATX boards are 305 mm x 244 mm."
  },
  {
    id: "c1-063",
    domain: "3",
    q: "Which of the following features are provided by UEFI firmware but NOT by legacy BIOS? (Choose two.)",
    choices: ["Power-on self-test (POST)", "Secure Boot", "Configuring the boot device order", "Booting Windows from a GPT-partitioned system drive", "Setting the system date and time"],
    answer: [1, 3],
    explanation: "Secure Boot and booting Windows from GPT disks (which can be larger than 2 TB) require UEFI. POST, boot order settings, and date and time settings are available in both legacy BIOS and UEFI."
  },
  {
    id: "c1-064",
    domain: "3",
    q: "A technician is enabling BitLocker on a laptop and wants the encryption keys stored in a hardware chip on the motherboard, so the drive unlocks only if the boot environment has not been tampered with. Which component is required?",
    choices: ["HSM", "TPM", "Smart card reader", "UEFI administrator password"],
    answer: [1],
    explanation: "A Trusted Platform Module (TPM) is a motherboard chip that stores keys and checks boot integrity for BitLocker. An HSM is a separate, dedicated device for managing keys at enterprise scale."
  },
  {
    id: "c1-065",
    domain: "3",
    q: "A company's certificate authority servers need a dedicated, tamper-resistant device that generates, stores, and manages large numbers of cryptographic keys for many systems. Which should be deployed?",
    choices: ["Secure Boot", "TPM", "Smart card", "HSM"],
    answer: [3],
    explanation: "A hardware security module (HSM) is a dedicated appliance or card for high-volume key generation, storage, and cryptographic operations. A TPM is tied to a single computer."
  },
  {
    id: "c1-066",
    domain: "3",
    q: "A technician installs a hypervisor on a workstation, but it reports that hardware-assisted virtualization is unavailable. The CPU supports virtualization. What should the technician do?",
    choices: ["Enable Intel VT-x or AMD-V in the BIOS/UEFI settings", "Install more RAM", "Enable Secure Boot", "Change the SATA mode to IDE"],
    answer: [0],
    explanation: "CPU virtualization extensions (Intel VT-x/AMD-V) are often disabled by default and must be enabled in firmware. Adding RAM does not make the virtualization extensions available."
  },
  {
    id: "c1-067",
    domain: "3",
    q: "A manufacturer is designing a tablet that must maximize battery life. Which CPU architecture is most commonly used for this purpose?",
    choices: ["ARM", "x86-64", "x86 (32-bit)", "IA-64"],
    answer: [0],
    explanation: "ARM processors use a RISC design that is very power-efficient, which is why most smartphones and tablets use them. x64 processors typically draw more power and are common in desktops and laptops."
  },
  {
    id: "c1-068",
    domain: "3",
    q: "A user is installing a dedicated graphics card in a desktop. Which expansion slot should be used?",
    choices: ["PCIe x1", "M.2", "PCI", "PCIe x16"],
    answer: [3],
    explanation: "Graphics cards use the PCIe x16 slot, which provides the most lanes and bandwidth. PCIe x1 slots suit low-bandwidth cards such as sound or network adapters."
  },
  {
    id: "c1-069",
    domain: "3",
    q: "Which voltage rail from an ATX power supply provides most of the power for the CPU and graphics card in a modern PC?",
    choices: ["3.3 V", "5 V", "12 V", "-12 V"],
    answer: [2],
    explanation: "The +12 V rail supplies high-power components such as the CPU voltage regulators, GPU, and drive motors. The 3.3 V and 5 V rails power lower-draw logic circuits."
  },
  {
    id: "c1-070",
    domain: "3",
    q: "A critical server must keep running if one of its power supplies fails, and the failed unit must be replaceable without shutting the server down. Which feature is needed?",
    choices: ["Redundant, hot-swappable power supplies", "A modular power supply", "A higher-wattage power supply", "A surge protector"],
    answer: [0],
    explanation: "Redundant hot-swappable PSUs let the server run on the remaining unit while the failed one is replaced. A modular PSU only has detachable cables and gives no redundancy."
  },
  {
    id: "c1-071",
    domain: "3",
    q: "A user is moving a desktop PC from the United States to a country that uses 230 V power. The PSU has a manual input-voltage selector switch set to 115 V. What should the user do before plugging the PC in?",
    choices: ["Use only a plug adapter, because all PSUs detect the voltage automatically", "Set the selector switch to 230 V", "Leave the switch at 115 V and use a surge protector", "Install a higher-wattage PSU"],
    answer: [1],
    explanation: "A dual-voltage PSU with a manual switch must be set to match the local input voltage. Connecting it to 230 V while set to 115 V can destroy the PSU. Only auto-switching PSUs adjust on their own."
  },
  {
    id: "c1-072",
    domain: "3",
    q: "During the laser printing process, which step uses heat and pressure to permanently bond toner to the paper?",
    choices: ["Charging", "Developing", "Transferring", "Fusing"],
    answer: [3],
    explanation: "In the fusing step, heated rollers melt toner and press it into the paper fibers. In the transferring step, toner moves from the drum to the paper but is not yet bonded."
  },
  {
    id: "c1-073",
    domain: "3",
    q: "A warehouse needs to print multipart carbon-copy shipping forms. Which printer type should be used?",
    choices: ["Thermal", "Impact (dot matrix)", "Inkjet", "Laser"],
    answer: [1],
    explanation: "Impact printers strike an inked ribbon with physical force, which imprints every layer of a multipart form. Thermal printers use heat-sensitive paper for receipts and labels and cannot print carbon copies."
  },
  {
    id: "c1-074",
    domain: "3",
    q: "A design team wants to build physical prototypes by depositing melted plastic layer by layer from spools of material. Which printer and consumable are used?",
    choices: ["Inkjet printer with pigment ink", "3D printer with resin", "Impact printer with ribbon", "3D printer with filament"],
    answer: [3],
    explanation: "FDM 3D printers melt plastic filament from spools and extrude it layer by layer. Resin 3D printers instead cure liquid resin with UV light."
  },
  {
    id: "c1-075",
    domain: "3",
    q: "A graphic design firm needs documents to print with consistent, device-independent graphics and font scaling on printers from different manufacturers. Which printer language driver should be used?",
    choices: ["PCL", "PostScript", "TWAIN", "ASCII text"],
    answer: [1],
    explanation: "PostScript is a device-independent page description language that renders graphics and fonts consistently across printers, which suits design work. PCL relies more on the printer's own hardware, and TWAIN is a scanner interface."
  },
  {
    id: "c1-076",
    domain: "3",
    q: "A laser printer has reached the page count the manufacturer specifies for scheduled maintenance. What should the technician install?",
    choices: ["A new ribbon", "A new printhead", "A maintenance kit, which typically includes a fuser assembly and rollers", "A thermal print element"],
    answer: [2],
    explanation: "Laser printer maintenance kits replace wear items such as the fuser and the pickup/feed rollers at set page counts. Ribbons are for impact printers, and printheads are for inkjet printers."
  },

  // ===================== Domain 4: Virtualization and Cloud Computing =====================
  {
    id: "c1-077",
    domain: "4",
    q: "A company is deploying a virtualization host in its data center. The hypervisor will be installed directly on the server hardware without a host operating system. Which type of hypervisor is this?",
    choices: ["Type 1", "Type 2", "Container engine", "Emulator"],
    answer: [0],
    explanation: "A Type 1 (bare-metal) hypervisor runs directly on the hardware, which makes it efficient for data centers. A Type 2 hypervisor runs as an application on top of a host OS."
  },
  {
    id: "c1-078",
    domain: "4",
    q: "A developer runs a hypervisor application on a Windows 11 desktop to test software in a Linux virtual machine. Which type of hypervisor is this?",
    choices: ["Type 1", "Type 2", "Bare-metal", "Container runtime"],
    answer: [1],
    explanation: "A Type 2 (hosted) hypervisor runs on top of an existing operating system, such as VirtualBox on Windows. Type 1 and bare-metal hypervisors run directly on the hardware."
  },
  {
    id: "c1-079",
    domain: "4",
    q: "A security analyst needs to open a suspicious email attachment without risking the production network. Which virtualization use case applies?",
    choices: ["VDI", "Load balancing", "Sandbox", "High availability"],
    answer: [2],
    explanation: "A sandbox is an isolated virtual environment for safely running untrusted code; it can be reverted or discarded afterward. VDI delivers user desktops and is not designed for isolation testing."
  },
  {
    id: "c1-080",
    domain: "4",
    q: "A manufacturing company relies on a control application that runs only on Windows XP, and Windows XP cannot be installed on the company's new hardware. Which approach lets the company keep using the application?",
    choices: ["Dual-boot every new workstation with Windows XP", "Move the application to a SaaS provider", "Upgrade the application's data files to a newer format", "Run Windows XP in a virtual machine on modern hardware"],
    answer: [3],
    explanation: "Virtualizing a legacy OS lets an unsupported application run on current hardware, ideally isolated from the network. Dual-booting fails because the hardware does not support XP, and a SaaS provider cannot host a proprietary local application."
  },
  {
    id: "c1-081",
    domain: "4",
    q: "Which statement best describes how containers differ from traditional virtual machines?",
    choices: ["Each container includes its own full guest operating system", "Containers share the host OS kernel and are more lightweight than VMs", "Containers require a Type 1 hypervisor", "Containers cannot run on Linux hosts"],
    answer: [1],
    explanation: "Containers package an application and its dependencies but share the host's kernel, so they start quickly and use fewer resources. VMs each run a complete guest OS on a hypervisor."
  },
  {
    id: "c1-082",
    domain: "4",
    q: "A company wants employees to reach standardized desktops that are hosted on central servers, using thin clients or personal devices. Which solution is this?",
    choices: ["Virtual desktop infrastructure (VDI)", "A sandbox", "A Type 2 hypervisor on each PC", "Containers"],
    answer: [0],
    explanation: "VDI hosts desktop operating systems centrally and streams them to endpoint devices. Running a Type 2 hypervisor on each PC keeps the workload local instead of centralizing it."
  },
  {
    id: "c1-083",
    domain: "4",
    q: "A technician wants to run three virtual machines at the same time on a laptop with 16 GB of RAM. Each VM is configured with 6 GB of RAM. What is the most likely result?",
    choices: ["The VMs will share a single 6 GB pool, so there is no issue", "Only CPU cores limit how many VMs can run", "Performance will suffer or a VM will fail to start, because the allocations exceed the physical RAM and leave nothing for the host", "No issue, because VMs use disk storage instead of RAM"],
    answer: [2],
    explanation: "Three VMs at 6 GB each need 18 GB, which exceeds the 16 GB installed, before the host OS's own needs. Memory is often the first limit on how many VMs can run."
  },
  {
    id: "c1-084",
    domain: "4",
    q: "A company wants to rent virtual servers, storage, and networking from a cloud provider while still managing its own operating systems and applications. Which cloud service model is this?",
    choices: ["SaaS", "PaaS", "IaaS", "Community cloud"],
    answer: [2],
    explanation: "With Infrastructure as a Service, the provider supplies compute, storage, and networking, and the customer manages the OS and everything above it. With PaaS, the provider also manages the OS and runtime."
  },
  {
    id: "c1-085",
    domain: "4",
    q: "Developers want a cloud environment where the provider manages the operating system, runtime, and middleware, so the developers only need to deploy their code. Which model fits?",
    choices: ["IaaS", "PaaS", "SaaS", "On-premises"],
    answer: [1],
    explanation: "Platform as a Service gives developers a managed platform for deploying applications. SaaS delivers a finished application to end users and is not a development platform."
  },
  {
    id: "c1-086",
    domain: "4",
    q: "A company subscribes to a web-based email and office productivity suite that the provider fully manages, including updates. Which cloud service model is this?",
    choices: ["IaaS", "PaaS", "Private cloud", "SaaS"],
    answer: [3],
    explanation: "Software as a Service delivers complete applications over the internet, and the provider manages everything. Private cloud is a deployment model, not a service model."
  },
  {
    id: "c1-087",
    domain: "4",
    q: "Several hospitals with the same regulatory requirements share the cost of a cloud infrastructure that only those organizations can use. Which cloud deployment model is this?",
    choices: ["Community", "Public", "Hybrid", "Private"],
    answer: [0],
    explanation: "A community cloud is shared by several organizations with common needs, such as compliance requirements. A hybrid cloud combines private and public clouds."
  },
  {
    id: "c1-088",
    domain: "4",
    q: "An online retailer's cloud resources automatically scale up during a holiday sale and scale back down afterward, and the company pays only for the resources it consumes. Which cloud characteristics are described? (Choose two.)",
    choices: ["Rapid elasticity", "Multitenancy", "Metered utilization", "High availability", "File synchronization"],
    answer: [0, 2],
    explanation: "Rapid elasticity is the automatic scaling of resources up and down with demand, and metered utilization means billing for actual use. High availability concerns uptime and redundancy, not scaling or billing."
  },
  {
    id: "c1-089",
    domain: "4",
    q: "In a public cloud, a provider hosts many different customers on the same physical infrastructure while keeping each customer's data logically isolated. What is this called?",
    choices: ["Rapid elasticity", "Multitenancy", "Hybrid cloud", "Metered utilization"],
    answer: [1],
    explanation: "Multitenancy means multiple customers (tenants) share the same resources while remaining isolated from each other. Rapid elasticity refers to scaling resources with demand."
  },
  {
    id: "c1-090",
    domain: "4",
    q: "A user edits a document on a laptop and wants the latest version to appear automatically on a phone and a home desktop through a cloud service. Which cloud feature provides this?",
    choices: ["High availability", "VDI", "Metered utilization", "File synchronization"],
    answer: [3],
    explanation: "Cloud file synchronization keeps copies of files up to date across all of a user's devices. High availability keeps a service running through failures but does not sync files to devices."
  },

  // ===================== Domain 5: Hardware and Network Troubleshooting =====================
  {
    id: "c1-091",
    domain: "5",
    q: "A user reports that a workstation cannot print to a network printer. According to the CompTIA troubleshooting methodology, what should the technician do first?",
    choices: ["Establish a theory of probable cause", "Identify the problem by gathering information and questioning the user", "Test the theory to determine the cause", "Establish a plan of action and implement the solution"],
    answer: [1],
    explanation: "Step 1 is to identify the problem: gather information, question the user, and identify recent changes. A theory of probable cause comes only after the problem is understood."
  },
  {
    id: "c1-092",
    domain: "5",
    q: "A technician has established a theory of probable cause for a slow workstation. According to the troubleshooting methodology, what is the next step?",
    choices: ["Document findings, actions, outcomes, and lessons learned", "Verify full system functionality", "Establish a plan of action to resolve the problem", "Test the theory to determine the cause"],
    answer: [3],
    explanation: "Step 3, testing the theory to determine the cause, follows step 2. Planning a fix before confirming the cause risks solving the wrong problem."
  },
  {
    id: "c1-093",
    domain: "5",
    q: "A technician tests a theory and confirms the cause of a problem. Which step of the troubleshooting methodology comes next?",
    choices: ["Establish a plan of action to resolve the problem and implement the solution", "Document findings, actions, outcomes, and lessons learned", "Establish a new theory of probable cause", "Identify the problem"],
    answer: [0],
    explanation: "After the cause is confirmed, step 4 is to establish a plan of action and implement the solution. A new theory is needed only if the first theory was not confirmed."
  },
  {
    id: "c1-094",
    domain: "5",
    q: "After replacing a failed power supply, a technician confirms that the computer boots and works normally and recommends a UPS to protect against future power problems. Which troubleshooting step is the technician performing?",
    choices: ["Document findings, actions, outcomes, and lessons learned", "Establish a plan of action", "Verify full system functionality and, if applicable, implement preventive measures", "Test the theory to determine the cause"],
    answer: [2],
    explanation: "Step 5 confirms that the whole system works and adds preventive measures such as a UPS. Documentation is step 6, which comes afterward."
  },
  {
    id: "c1-095",
    domain: "5",
    q: "What is the final step of the CompTIA troubleshooting methodology?",
    choices: ["Verify full system functionality", "Document findings, actions, outcomes, and lessons learned", "Establish a plan of action", "Implement preventive measures"],
    answer: [1],
    explanation: "Step 6, the last step, is documenting findings, actions, outcomes, and lessons learned. Verifying functionality and implementing preventive measures are both part of step 5."
  },
  {
    id: "c1-096",
    domain: "5",
    q: "A technician is performing the 'identify the problem' step of the troubleshooting methodology. Which actions belong in this step? (Choose two.)",
    choices: ["Document lessons learned", "Question the user and identify any recent changes", "Implement the solution", "Escalate to the vendor", "Perform backups before making changes"],
    answer: [1, 4],
    explanation: "Identifying the problem includes gathering information from the user, identifying user and environmental changes, and performing backups before making changes. Documenting lessons learned is the final step."
  },
  {
    id: "c1-097",
    domain: "5",
    q: "After a technician installs additional memory, the desktop powers on and the fans spin, but there is no video and the system emits a repeating beep pattern. What should the technician check first?",
    choices: ["The hard drive's S.M.A.R.T. status", "The monitor's refresh rate setting", "That the new memory modules are fully seated and compatible", "The network cable"],
    answer: [2],
    explanation: "POST beep codes with no video right after a RAM upgrade most often mean the memory is unseated or incompatible. POST memory checks run before the drive or network is used, so those are unlikely causes."
  },
  {
    id: "c1-098",
    domain: "5",
    q: "A workstation intermittently crashes with a blue screen (BSOD) citing MEMORY_MANAGEMENT, even after its drivers have been updated. Which action will best help confirm the cause?",
    choices: ["Run a memory diagnostic tool", "Defragment the hard drive", "Replace the monitor cable", "Reinstall the printer driver"],
    answer: [0],
    explanation: "Repeated memory-related BSODs point to faulty RAM, which a memory diagnostic such as Windows Memory Diagnostic or MemTest86 can confirm. Defragmenting the drive does not test memory."
  },
  {
    id: "c1-099",
    domain: "5",
    q: "A desktop computer shuts down unexpectedly when running demanding applications but works normally when idle. Which of the following are likely causes? (Choose two.)",
    choices: ["A dust-clogged CPU heat sink", "A failing CMOS battery", "A failed CPU fan", "An incorrect DNS server setting", "An outdated printer driver"],
    answer: [0, 2],
    explanation: "Shutdowns under load are a classic overheating symptom, caused by poor cooling such as a clogged heat sink or a failed fan. A weak CMOS battery causes lost time and BIOS settings, not shutdowns under load."
  },
  {
    id: "c1-100",
    domain: "5",
    q: "After replacing a CPU, a technician notices that the system overheats and throttles within minutes. The CPU fan is spinning normally. What is the most likely cause?",
    choices: ["The CMOS battery is dead", "The RAM is not in dual-channel mode", "The PSU selector switch is set to 230 V", "Thermal paste was not applied between the CPU and the heat sink"],
    answer: [3],
    explanation: "Without thermal paste, air gaps prevent heat from transferring efficiently to the heat sink, so the CPU overheats even with a working fan. Dual-channel memory affects performance, not temperature."
  },
  {
    id: "c1-101",
    domain: "5",
    q: "A user reports a loud grinding noise from a desktop, and file access has become very slow. The noise is coming from the hard disk drive. What should the technician do first?",
    choices: ["Defragment the drive", "Back up the user's data immediately", "Run Disk Cleanup", "Replace the case fans"],
    answer: [1],
    explanation: "Grinding from an HDD indicates mechanical failure, so the data should be backed up before the drive fails completely. Defragmenting puts heavy load on a failing drive and could speed its failure."
  },
  {
    id: "c1-102",
    domain: "5",
    q: "A monitoring utility reports S.M.A.R.T. warnings for a growing number of reallocated sectors on a workstation's drive, although the computer still works normally. What is the best course of action?",
    choices: ["Back up the data and plan to replace the drive", "Ignore the warning until the drive fails", "Disable S.M.A.R.T. in the BIOS/UEFI", "Format the drive and reinstall the OS"],
    answer: [0],
    explanation: "S.M.A.R.T. warnings predict an impending drive failure, so back up the data and replace the drive proactively. Reformatting the drive does not repair failing hardware."
  },
  {
    id: "c1-103",
    domain: "5",
    q: "A RAID 5 array on a file server shows a degraded status after one drive failed. Users can still access their files. What should the technician do?",
    choices: ["Convert the array to RAID 0", "Reinitialize the entire array", "Replace the failed drive with a compatible drive and allow the array to rebuild", "Remove a second drive to force a rebuild"],
    answer: [2],
    explanation: "A degraded RAID 5 array is running without redundancy, so the failed drive should be replaced quickly and the array rebuilt. Removing a second drive would exceed RAID 5's single-drive tolerance and destroy the array."
  },
  {
    id: "c1-104",
    domain: "5",
    q: "A user reports that every time the desktop is unplugged and restarted, the system date and time reset and the BIOS settings revert to defaults. What should be replaced?",
    choices: ["The power supply", "A memory module", "The system drive", "The CMOS battery"],
    answer: [3],
    explanation: "The CMOS battery keeps the real-time clock and firmware settings when the PC has no AC power. A failing PSU would cause power problems, not lost settings."
  },
  {
    id: "c1-105",
    domain: "5",
    q: "A desktop shows no signs of power (no fans, no lights) when the power button is pressed. The wall outlet has been verified to work. What should the technician test next?",
    choices: ["The power supply, using a PSU tester or multimeter", "The RAM, using a memory diagnostic", "The display cable", "The network adapter"],
    answer: [0],
    explanation: "A complete absence of fans and lights points to the power supply. A memory diagnostic cannot run on a system that does not power on, and RAM faults usually still let the fans spin."
  },
  {
    id: "c1-106",
    domain: "5",
    q: "A laptop display is very dim, but the user can faintly see the desktop image when shining a flashlight on the screen. What is the most likely cause?",
    choices: ["Incorrect display resolution", "Failed backlight", "Failed digitizer", "Corrupted video driver"],
    answer: [1],
    explanation: "A faint image visible under a flashlight means the LCD is still producing the image but the backlight has failed. A digitizer handles touch input only and does not affect brightness."
  },
  {
    id: "c1-107",
    domain: "5",
    q: "A conference room's OLED display shows a faint, permanent image of a company logo that was displayed for months. What is this problem, and how can it be prevented?",
    choices: ["Dead pixels; replace the video cable", "Ghosting; increase the refresh rate", "Burn-in; avoid long-term static images by using screen savers, auto-off timers, or pixel-shift features", "Flickering; update the video driver"],
    answer: [2],
    explanation: "Burn-in is permanent image retention from displaying static content for long periods, a known risk with OLED panels. Dead pixels are individual pixels that stay dark and are not tied to displayed content."
  },
  {
    id: "c1-108",
    domain: "5",
    q: "A classroom projector shuts itself off after about 20 minutes of use, and its vents are covered in dust. What should the technician do first?",
    choices: ["Clean or replace the air filter and clear the vents", "Replace the projector lamp", "Lower the input resolution", "Replace the HDMI cable"],
    answer: [0],
    explanation: "Projectors shut down to protect themselves when they overheat, and clogged filters or vents are the usual cause. A failing lamp usually causes a dim image or no image, not timed shutdowns."
  },
  {
    id: "c1-109",
    domain: "5",
    q: "A user notices that a smartphone's back cover is bulging and the screen is lifting away from the frame. Which actions should be taken? (Choose two.)",
    choices: ["Stop using and charging the device", "Puncture the battery to release the pressure", "Have the battery replaced and dispose of the old one according to battery recycling/hazardous waste guidelines", "Place the phone in a freezer to shrink the battery", "Keep using the phone but avoid fast chargers"],
    answer: [0, 2],
    explanation: "A swollen lithium-ion battery is a fire hazard, so stop using the device, replace the battery, and dispose of it properly. Puncturing a swollen battery can cause a fire or explosion."
  },
  {
    id: "c1-110",
    domain: "5",
    q: "A smartphone charges only when the cable is held at a certain angle, and other known-good cables behave the same way. What should the technician check first?",
    choices: ["The battery health percentage", "The Wi-Fi settings", "The screen brightness", "The charging port, for lint or debris"],
    answer: [3],
    explanation: "Lint packed into the charging port often keeps the connector from seating fully, which causes intermittent charging. Battery health affects runtime, not whether the cable makes contact."
  },
  {
    id: "c1-111",
    domain: "5",
    q: "A laser printer is printing faint duplicate images of earlier page content further down the page (ghosting). Which component is the most likely cause?",
    choices: ["Pickup roller", "Imaging drum or its cleaning blade", "Duplexing assembly", "Paper tray"],
    answer: [1],
    explanation: "Ghosting usually means residual toner is left on the imaging drum, from a worn drum or a failing cleaning blade, and is reprinted on the next rotation. Pickup rollers cause feed problems, not image defects."
  },
  {
    id: "c1-112",
    domain: "5",
    q: "Pages from a laser printer come out with toner that smears or rubs off easily when touched. Which component should be replaced?",
    choices: ["Toner cartridge", "Pickup roller", "Fuser assembly", "Separation pad"],
    answer: [2],
    explanation: "The fuser melts toner onto the paper, so toner that rubs off means the fuser is not heating or pressing properly. A new toner cartridge would not bond the toner to the paper."
  },
  {
    id: "c1-113",
    domain: "5",
    q: "An inkjet printer is producing pages with horizontal white lines and missing colors. What should the technician do first?",
    choices: ["Run the printer's printhead cleaning utility", "Replace the fuser", "Replace the imaging drum", "Install a PostScript driver"],
    answer: [0],
    explanation: "Streaks and missing colors on an inkjet are usually caused by clogged nozzles, which the printhead cleaning utility clears. Fusers and imaging drums are laser printer parts."
  },
  {
    id: "c1-114",
    domain: "5",
    q: "A laser printer frequently pulls several sheets of paper at once, causing jams. Which component is most likely worn?",
    choices: ["Fuser", "Imaging drum", "Toner cartridge", "Separation pad"],
    answer: [3],
    explanation: "The separation pad creates friction so that only one sheet feeds at a time, and multiple-sheet feeds are a sign of wear. The fuser affects how toner bonds, not how paper is picked up."
  },
  {
    id: "c1-115",
    domain: "5",
    q: "After an office printer is replaced with a different model, print jobs come out as pages of random characters and symbols. What is the most likely cause?",
    choices: ["Low toner", "An incorrect or outdated print driver", "Worn pickup rollers", "A faulty fuser"],
    answer: [1],
    explanation: "Garbled characters mean the printer cannot interpret the data it receives, which typically happens when the driver is for a different model. Low toner causes faded prints, not random symbols."
  },
  {
    id: "c1-116",
    domain: "5",
    q: "A user's workstation cannot reach any network resources, and ipconfig shows the address 169.254.33.12. What is the most likely cause?",
    choices: ["The DNS server address is misconfigured", "The default gateway is incorrect", "The workstation could not obtain an address from a DHCP server", "The router assigned a valid private address"],
    answer: [2],
    explanation: "A 169.254.x.x address is an APIPA address, which Windows assigns itself when no DHCP server responds. A DNS misconfiguration would not change the IP address the host receives."
  },
  {
    id: "c1-117",
    domain: "5",
    q: "Users in a break room report intermittent wireless disconnects on the 2.4 GHz network whenever the microwave oven is running. What is the best solution?",
    choices: ["Increase the DHCP lease time", "Connect the devices to the 5 GHz band", "Replace the users' Ethernet cables", "Change the SSID"],
    answer: [1],
    explanation: "Microwave ovens emit energy around 2.4 GHz, which interferes with Wi-Fi on that band, so moving devices to 5 GHz avoids it. A Wi-Fi analyzer can confirm the interference. Changing the SSID does not change the frequency used."
  },
  {
    id: "c1-118",
    domain: "5",
    q: "Users report that VoIP calls sound choppy and garbled, while file downloads work normally. Network tests show packets arriving at highly variable intervals. Which issue is this, and what should be configured?",
    choices: ["APIPA; restart the DHCP server", "Packet loss; replace the NIC", "Latency; switch to a satellite connection", "Jitter; configure QoS to prioritize voice traffic"],
    answer: [3],
    explanation: "Variation in packet arrival times is jitter, which disrupts real-time traffic such as VoIP, and QoS prioritizes voice packets to reduce it. Satellite links add latency, which would make calls worse."
  },
  {
    id: "c1-119",
    domain: "5",
    q: "A user can successfully ping 8.8.8.8 but cannot open any websites by name. What is the most likely cause?",
    choices: ["Incorrect DNS server configuration", "A faulty network cable", "A disabled network adapter", "An APIPA address"],
    answer: [0],
    explanation: "Successful pings to an internet IP address prove the connection works, so failing name lookups point to DNS. A faulty cable, disabled NIC, or APIPA address would also cause the ping to fail."
  },
  {
    id: "c1-120",
    domain: "5",
    q: "A single workstation has a link light, but pings to the default gateway show about 20% packet loss. The patch cable appears crushed under a desk chair, and other workstations on the same switch are unaffected. What should the technician do?",
    choices: ["Reboot the core router", "Change the Wi-Fi channel", "Test the patch cable with a cable tester and replace it", "Renew the DHCP lease"],
    answer: [2],
    explanation: "Packet loss limited to one host with a visibly damaged cable points to the cable, which a cable tester can confirm. Rebooting the core router would not fix a problem that affects only one workstation."
  }
];
