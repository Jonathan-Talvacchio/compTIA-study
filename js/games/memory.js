(function () {
  const { h } = App;

  App.games.memory = {
    name: "Memory Match",
    icon: "🧠",
    tags: ["Core 1", "Core 2", "Recall"],
    desc: "Classic card-flip memory: pair acronyms with their meanings, or ports with protocols. Fewer moves = more XP.",
    bestLabel: b => b.memory != null ? `Best: ${b.memory} moves` : null,
    run(stage) {
      menu();
      function menu() {
        stage.innerHTML = "";
        stage.appendChild(h("div", { class: "grid cols-3" },
          deckBtn("🔤", "Acronyms", "Acronym ↔ full name", () => DATA.acronyms.map(([a, b]) => [a, b])),
          deckBtn("🔌", "Ports", "Port ↔ protocol", () => DATA.ports.map(p => [p.port, p.proto])),
          deckBtn("🃏", "Flashcard mix", "Short flashcards from your current exam filter", () =>
            (DATA.flashcards || []).filter(c => App.inFilter(c) && c.front.length < 32 && c.back.length < 70).map(c => [c.front, c.back]))));
      }
      function deckBtn(ico, name, desc, src) {
        return h("button", { class: "card click", onclick: () => play(src) }, h("span", { class: "emoji" }, ico), h("h3", null, name), h("p", null, desc));
      }
      function play(src) {
        stage.innerHTML = "";
        const pairs = App.pick(src(), 6);
        const cards = App.shuffle(pairs.flatMap((p, i) => [{ k: i, t: p[0] }, { k: i, t: p[1] }]));
        let up = [], moves = 0, matched = 0, lock = false;
        const hud = h("div", { class: "game-hud" });
        const grid = h("div", { class: "memory-grid" });
        stage.append(hud, grid);
        const drawHud = () => { hud.innerHTML = ""; hud.append(h("span", { class: "hud-item" }, `Moves: ${moves}`), h("span", { class: "hud-item" }, `Pairs: ${matched}/${pairs.length}`)); };
        drawHud();
        cards.forEach(c => {
          const el = h("div", { class: "mem-card" }, h("div", { class: "mem-inner" },
            h("div", { class: "mem-face mem-front" }, "❔"), h("div", { class: "mem-face mem-back" }, c.t)));
          el.addEventListener("click", () => {
            if (lock || el.classList.contains("up") || el.classList.contains("matched")) return;
            el.classList.add("up");
            up.push({ el, c });
            if (up.length === 2) {
              moves++;
              const [a, b] = up; up = [];
              if (a.c.k === b.c.k) {
                a.el.classList.add("matched"); b.el.classList.add("matched");
                matched++;
                if (matched === pairs.length) setTimeout(finish, 500);
              } else {
                lock = true;
                setTimeout(() => { a.el.classList.remove("up"); b.el.classList.remove("up"); lock = false; }, 1000);
              }
              drawHud();
            }
          });
          grid.appendChild(el);
        });
        function finish() {
          const best = App.setBest("memory", moves, false);
          App.gameOver(stage, {
            title: "Memory Match",
            lines: [`Cleared in ${moves} moves.`, best ? "🏆 New personal best!" : "", h("div", null, pairs.map(p => h("div", { class: "muted" }, `${p[0]} → ${p[1]}`)))],
            xp: Math.max(10, 50 - (moves - pairs.length) * 3),
            perfect: moves === pairs.length,
            again: () => play(src)
          });
        }
      }
    }
  };
})();
