(function () {
  const { h } = App;

  App.games.ordering = {
    name: "Put It In Order",
    icon: "🧩",
    tags: ["Core 1", "Core 2", "Processes"],
    desc: "Drag the steps of key CompTIA processes into the right sequence: troubleshooting, malware removal, laser printing and more.",
    bestLabel: b => {
      const n = DATA.orderPuzzles.filter(p => b["order-" + p.id]).length;
      return n ? `${n}/${DATA.orderPuzzles.length} solved perfectly` : null;
    },
    run(stage, params) {
      const startId = params[0];
      if (startId) return play(DATA.orderPuzzles.find(p => p.id === startId));
      menu();

      function menu() {
        stage.innerHTML = "";
        const grid = h("div", { class: "grid cols-3" });
        for (const p of DATA.orderPuzzles) {
          grid.appendChild(h("button", { class: "card click", onclick: () => play(p) },
            h("span", { class: "tag " + (p.exam === "core1" ? "c1" : "c2") }, DATA.exams[p.exam].name),
            App.state.bests["order-" + p.id] ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ solved") : null,
            h("h3", { class: "mt" }, p.title), h("p", null, p.blurb)));
        }
        stage.appendChild(grid);
      }

      function play(p) {
        stage.innerHTML = "";
        let order = App.shuffle(p.steps.map((_, i) => i));
        while (p.steps.length > 1 && order.every((v, i) => v === i)) order = App.shuffle(order);
        let attempts = 0;
        const list = h("div", { class: "order-list" });
        const feedback = h("div");
        stage.append(
          h("div", { class: "card" }, h("h3", null, p.title), h("p", null, p.blurb + " Drag items, or use the arrows.")),
          h("div", { class: "mt" }, list),
          h("div", { class: "row mt" },
            h("button", { class: "btn primary", onclick: check }, "Check order"),
            h("button", { class: "btn ghost", onclick: menu }, "Choose another")),
          feedback);
        draw();

        let dragFrom = null;
        function draw(marks) {
          list.innerHTML = "";
          order.forEach((stepIdx, pos) => {
            const item = h("div", { class: "order-item", draggable: "true" },
              h("span", { class: "num" }, pos + 1),
              h("span", null, p.steps[stepIdx]),
              h("span", { class: "arrows" },
                h("button", { title: "Move up", onclick: () => move(pos, pos - 1) }, "▲"),
                h("button", { title: "Move down", onclick: () => move(pos, pos + 1) }, "▼")));
            if (marks) item.classList.add(marks[pos] ? "correct" : "wrong");
            item.addEventListener("dragstart", () => { dragFrom = pos; item.classList.add("dragging"); });
            item.addEventListener("dragend", () => item.classList.remove("dragging"));
            item.addEventListener("dragover", e => { e.preventDefault(); item.classList.add("over"); });
            item.addEventListener("dragleave", () => item.classList.remove("over"));
            item.addEventListener("drop", e => { e.preventDefault(); item.classList.remove("over"); if (dragFrom != null) move(dragFrom, pos); dragFrom = null; });
            list.appendChild(item);
          });
        }
        function move(a, b) {
          if (b < 0 || b >= order.length || a === b) return;
          const [x] = order.splice(a, 1);
          order.splice(b, 0, x);
          draw();
        }
        function check() {
          attempts++;
          const marks = order.map((v, i) => v === i);
          draw(marks);
          const right = marks.filter(Boolean).length;
          if (right === order.length) {
            const perfect = attempts === 1;
            if (perfect) App.setBest("order-" + p.id, 1);
            setTimeout(() => App.gameOver(stage, {
              title: p.title,
              lines: [perfect ? "Solved on the first try!" : `Solved in ${attempts} attempts.`, h("ol", { style: { textAlign: "left", display: "inline-block" } }, p.steps.map(s => h("li", null, s)))],
              xp: perfect ? 40 : Math.max(10, 30 - attempts * 5),
              perfect,
              again: () => play(p)
            }), 700);
          } else {
            feedback.innerHTML = "";
            feedback.appendChild(h("div", { class: "explain bad" }, `${right}/${order.length} in the correct position. Green = right spot, red = wrong spot. Try again!`));
          }
        }
      }
    }
  };
})();
