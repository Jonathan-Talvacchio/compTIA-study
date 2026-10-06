window.DATA = window.DATA || {};

// Exam blueprints for the current CompTIA A+ (V15) series.
DATA.exams = {
  core1: {
    id: "core1",
    code: "220-1201",
    name: "A+ Core 1",
    questions: 90,
    minutes: 90,
    passing: 675,
    domains: {
      "1": { name: "Mobile Devices", weight: 13, icon: "📱" },
      "2": { name: "Networking", weight: 23, icon: "🌐" },
      "3": { name: "Hardware", weight: 25, icon: "🖥️" },
      "4": { name: "Virtualization & Cloud", weight: 11, icon: "☁️" },
      "5": { name: "Hardware & Network Troubleshooting", weight: 28, icon: "🛠️" }
    }
  },
  core2: {
    id: "core2",
    code: "220-1202",
    name: "A+ Core 2",
    questions: 90,
    minutes: 90,
    passing: 700,
    domains: {
      "1": { name: "Operating Systems", weight: 28, icon: "💿" },
      "2": { name: "Security", weight: 28, icon: "🔒" },
      "3": { name: "Software Troubleshooting", weight: 23, icon: "🐞" },
      "4": { name: "Operational Procedures", weight: 21, icon: "📋" }
    }
  }
};
