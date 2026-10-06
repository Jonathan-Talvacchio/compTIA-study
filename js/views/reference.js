(function () {
  const { h } = App;

  App.views.reference = {
    title: "Cheat Sheets",
    render(root) {
      root.append(h("h1", null, "📚 Cheat Sheets"), h("p", { class: "sub" }, "Quick-reference tables for the most-tested facts. Search across everything."));
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
