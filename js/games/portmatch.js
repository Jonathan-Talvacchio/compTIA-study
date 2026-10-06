(function () {
  const { h } = App;

  App.games.portmatch = {
    name: "Port Match",
    icon: "🔌",
    tags: ["Core 1", "2.1 Ports"],
    desc: "Match every port number to its protocol against the clock. Wrong matches add a 3-second penalty.",
    bestLabel: b => b.portmatch != null ? `Best time ${b.portmatch}s` : null,
    run(stage) {
      let direction = "port";
      intro();

      function intro() {
        stage.innerHTML = "";
        stage.appendChild(h("div", { class: "card" },
          h("h3", null, "How to play"),
          h("p", null, "Click a tile on the left, then its partner on the right. Clear all 15 ports as fast as you can. Under 45 seconds unlocks the Port Master badge."),
          h("div", { class: "row mt" },
            h("button", { class: "btn primary", onclick: () => { direction = "port"; play(); } }, "Port → Protocol"),
            h("button", { class: "btn", onclick: () => { direction = "proto"; play(); } }, "Protocol → Port"),
            h("button", { class: "btn ghost", onclick: study } , "📖 Study the table first"))));
      }

      function study() {
        stage.innerHTML = "";
        const t = h("table", { class: "ref" }, h("tr", null, h("th", null, "Port"), h("th", null, "Protocol"), h("th", null, "TCP/UDP"), h("th", null, "Notes")));
        for (const p of DATA.ports) t.appendChild(h("tr", null, h("td", null, p.port), h("td", null, p.proto), h("td", null, p.transport), h("td", null, p.desc)));
        stage.append(h("div", { class: "card" }, t), h("button", { class: "btn primary mt", onclick: intro }, "I'm ready"));
      }

      function play() {
        stage.innerHTML = "";
        const pairs = DATA.ports;
        let mistakes = 0, matched = 0, selL = null, selR = null;
        const t0 = Date.now();
        const hud = h("div", { class: "game-hud" });
        const timeEl = h("span", { class: "hud-item timer" }, "0.0s");
        const missEl = h("span", { class: "hud-item" }, "❌ 0");
        const leftEl = h("span", { class: "hud-item" }, `🔌 0/${pairs.length}`);
        hud.append(timeEl, leftEl, missEl);
        const L = h("div", { class: "match-col" }), R = h("div", { class: "match-col" });
        stage.append(hud, h("div", { class: "match-cols" }, L, R));
        const key = p => p.port;
        const lt = p => direction === "port" ? p.port : p.proto;
        const rt = p => direction === "port" ? p.proto : p.port;
        for (const p of App.shuffle(pairs)) L.appendChild(tile(lt(p), key(p), "L"));
        for (const p of App.shuffle(pairs)) R.appendChild(tile(rt(p), key(p), "R"));
        const tick = setInterval(() => { timeEl.textContent = ((Date.now() - t0) / 1000 + mistakes * 3).toFixed(1) + "s"; }, 100);
        App.onCleanup(() => clearInterval(tick));

        function tile(text, k, side) {
          const el = h("div", { class: "tile" }, text);
          el.dataset.k = k;
          el.addEventListener("click", () => {
            if (side === "L") { selL && selL.classList.remove("sel"); selL = el; }
            else { selR && selR.classList.remove("sel"); selR = el; }
            el.classList.add("sel");
            if (selL && selR) check();
          });
          return el;
        }
        function check() {
          const a = selL, b = selR;
          selL = selR = null;
          if (a.dataset.k === b.dataset.k) {
            a.classList.remove("sel"); b.classList.remove("sel");
            a.classList.add("done"); b.classList.add("done");
            matched++;
            leftEl.textContent = `🔌 ${matched}/${pairs.length}`;
            if (matched === pairs.length) finish();
          } else {
            mistakes++;
            missEl.textContent = `❌ ${mistakes}`;
            for (const el of [a, b]) { el.classList.add("bad", "shake"); }
            setTimeout(() => { for (const el of [a, b]) el.classList.remove("bad", "shake", "sel"); }, 400);
          }
        }
        function finish() {
          clearInterval(tick);
          const secs = Math.round((Date.now() - t0) / 1000 + mistakes * 3);
          const best = App.setBest("portmatch", secs, false);
          App.gameOver(stage, {
            title: "Port Match",
            lines: [`Time: ${secs}s (including ${mistakes * 3}s penalty)`, best ? "🏆 New personal best!" : `Personal best: ${App.state.bests.portmatch}s`],
            xp: Math.max(20, 90 - secs) + (mistakes ? 0 : 20),
            perfect: mistakes === 0,
            again: play
          });
        }
      }
    }
  };
})();
