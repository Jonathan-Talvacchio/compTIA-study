(function () {
  const { h } = App;

  App.games.sorter = {
    name: "Sort It Out",
    icon: "🗂️",
    tags: ["Core 1", "Core 2", "Categorize"],
    desc: "Drop each item into the right bucket — Wi-Fi bands, RAID levels, malware types, cloud models, tools and more.",
    bestLabel: b => {
      const n = DATA.sortPuzzles.filter(p => b["sort-" + p.id]).length;
      return n ? `${n}/${DATA.sortPuzzles.length} perfect` : null;
    },
    run(stage) {
      menu();

      function menu() {
        stage.innerHTML = "";
        const grid = h("div", { class: "grid cols-3" });
        for (const p of DATA.sortPuzzles) {
          grid.appendChild(h("button", { class: "card click", onclick: () => play(p) },
            h("span", { class: "tag " + (p.exam === "core1" ? "c1" : "c2") }, DATA.exams[p.exam].name),
            App.state.bests["sort-" + p.id] ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ perfect") : null,
            h("h3", { class: "mt" }, p.title),
            h("p", null, `${p.items.length} items · ${p.buckets.length} buckets`)));
        }
        stage.appendChild(grid);
      }

      function play(p) {
        stage.innerHTML = "";
        // placement[i] = bucket index or -1 (pool)
        const items = App.shuffle(p.items.map(([text, b], i) => ({ i, text, b })));
        const placement = {};
        items.forEach(it => placement[it.i] = -1);
        let selected = null, checked = false;
        const pool = h("div", { class: "sort-pool" });
        const buckets = h("div", { class: "sort-buckets" });
        const feedback = h("div");
        stage.append(
          h("div", { class: "card" }, h("h3", null, p.title), h("p", null, "Drag chips into buckets — or tap a chip, then tap a bucket. Tap a placed chip to send it back.")),
          h("h4", { class: "mt muted" }, "Items"), pool, buckets,
          h("div", { class: "row mt" }, h("button", { class: "btn primary", onclick: check }, "Check"), h("button", { class: "btn ghost", onclick: menu }, "Choose another")),
          feedback);
        draw();

        function chip(it) {
          const c = h("div", { class: "chip", draggable: "true" }, it.text);
          if (selected === it.i) c.classList.add("sel");
          if (checked && placement[it.i] !== -1) c.classList.add(placement[it.i] === it.b ? "correct" : "wrong");
          c.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", String(it.i)); });
          c.addEventListener("click", e => {
            e.stopPropagation();
            if (placement[it.i] !== -1 && selected !== it.i) { placement[it.i] = -1; selected = null; checked = false; draw(); return; }
            selected = selected === it.i ? null : it.i;
            draw();
          });
          return c;
        }
        function drop(bi, idx) { placement[idx] = bi; selected = null; checked = false; draw(); }
        function draw() {
          pool.innerHTML = "";
          buckets.innerHTML = "";
          items.filter(it => placement[it.i] === -1).forEach(it => pool.appendChild(chip(it)));
          if (!pool.children.length) pool.appendChild(h("span", { class: "muted" }, "All placed — hit Check!"));
          pool.ondragover = e => e.preventDefault();
          pool.ondrop = e => { e.preventDefault(); drop(-1, +e.dataTransfer.getData("text/plain")); };
          p.buckets.forEach((name, bi) => {
            const chips = h("div", { class: "chips" });
            items.filter(it => placement[it.i] === bi).forEach(it => chips.appendChild(chip(it)));
            const b = h("div", { class: "bucket" + (selected != null ? " target" : "") }, h("h4", null, name), chips);
            b.addEventListener("click", () => { if (selected != null) drop(bi, selected); });
            b.addEventListener("dragover", e => { e.preventDefault(); b.classList.add("over"); });
            b.addEventListener("dragleave", () => b.classList.remove("over"));
            b.addEventListener("drop", e => { e.preventDefault(); drop(bi, +e.dataTransfer.getData("text/plain")); });
            buckets.appendChild(b);
          });
        }
        let attempts = 0;
        function check() {
          const unplaced = items.filter(it => placement[it.i] === -1).length;
          if (unplaced) { feedback.innerHTML = ""; feedback.appendChild(h("div", { class: "explain" }, `Place all items first (${unplaced} left).`)); return; }
          attempts++;
          checked = true;
          draw();
          const right = items.filter(it => placement[it.i] === it.b).length;
          feedback.innerHTML = "";
          if (right === items.length) {
            const perfect = attempts === 1;
            if (perfect) App.setBest("sort-" + p.id, 1);
            setTimeout(() => App.gameOver(stage, { title: p.title, lines: [perfect ? "All correct on the first try!" : `Solved in ${attempts} attempts.`], xp: perfect ? 40 : 15, perfect, again: () => play(p) }), 800);
          } else {
            feedback.appendChild(h("div", { class: "explain bad" }, `${right}/${items.length} correct. Red chips are in the wrong bucket — tap them to send them back.`));
          }
        }
      }
    }
  };
})();
