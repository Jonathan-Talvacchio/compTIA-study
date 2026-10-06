(function () {
  const { h } = App;

  const SOURCES = [
    ["CompTIA A+ certification (download the official exam objectives)", "https://www.comptia.org/"],
    ["Professor Messer: free 220-1201 Core 1 course", "https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/"],
    ["Professor Messer: free 220-1202 Core 2 course", "https://www.professormesser.com/free-a-plus-training/220-1202/220-1202-video/220-1202-training-course/"],
    ["Professor Messer: differences between 220-1101 and 220-1201", "https://www.professormesser.com/free-a-plus-training/a-plus-articles/differences-between-220-1101-and-220-1201/"],
    ["Professor Messer: differences between 220-1102 and 220-1202", "https://www.professormesser.com/free-a-plus-training/a-plus-articles/differences-between-220-1102-and-220-1202/"]
  ];

  App.views.reference = {
    title: "Cheat Sheets",
    render(root) {
      root.append(h("h1", null, "📚 Cheat Sheets"), h("p", { class: "sub" }, "Quick-reference tables for the most-tested facts. Search across everything."));
      root.append(h("div", { class: "card", style: { marginBottom: "16px" } },
        h("h3", null, "📎 Sources & how this site was checked"),
        h("p", null, "Content is original practice material aligned to the CompTIA A+ V15 objectives (220-1201 and 220-1202). In October 2026 it was cross-checked against Professor Messer's 220-1201/220-1202 course pages and his \"what changed\" articles, plus published summaries of the official objectives. The official objectives PDF from CompTIA is always the final word."),
        h("ul", { style: { color: "var(--muted)", lineHeight: "1.8", margin: "8px 0 0" } }, SOURCES.map(([label, url]) => h("li", null, h("a", { href: url, target: "_blank", rel: "noopener" }, label))))));
      const search = h("input", { type: "text", class: "ref-search", placeholder: "🔎 Search (e.g. 3389, RAID 5, chmod, GPT)…" });
      const body = h("div");
      root.append(search, body);

      const sheets = [{
        id: "ports", title: "Ports & Protocols", exam: "core1", cols: ["Port", "Protocol", "TCP/UDP", "Notes"],
        rows: DATA.ports.map(p => [p.port, p.proto, p.transport, p.desc])
      }].concat(DATA.reference || []);

      search.addEventListener("input", draw);
      draw();

      function draw() {
        const q = search.value.trim().toLowerCase();
        body.innerHTML = "";
        let any = false;
        for (const s of sheets) {
          const rows = q ? s.rows.filter(r => r.join(" ").toLowerCase().includes(q) || s.title.toLowerCase().includes(q)) : s.rows;
          if (!rows.length) continue;
          any = true;
          const t = h("table", { class: "ref" }, h("tr", null, s.cols.map(c => h("th", null, c))));
          rows.forEach(r => t.appendChild(h("tr", null, r.map(c => h("td", null, c)))));
          body.appendChild(h("details", { class: "card mt", open: true },
            h("summary", { style: { cursor: "pointer", fontWeight: 800, fontSize: "1.05rem" } }, s.title + " ",
              s.exam !== "both" ? h("span", { class: "tag " + (s.exam === "core1" ? "c1" : "c2") }, DATA.exams[s.exam].code) : null),
            h("div", { style: { overflowX: "auto", marginTop: "10px" } }, t)));
        }
        if (!any) body.appendChild(h("div", { class: "card empty" }, "No matches. Try another term."));
      }
    }
  };
})();
