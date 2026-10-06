(function () {
  const { h } = App;

  // Shared 60-second rapid-fire loop. nextRound() returns { prompt, options:[{label, correct}], reveal }.
  function rapidFire(stage, { key, title, nextRound, columns = 2, seconds = 60 }) {
    stage.innerHTML = "";
    let score = 0, misses = 0, streak = 0, left = seconds, over = false;
    const hud = h("div", { class: "game-hud" });
    const card = h("div", { class: "card" });
    const log = h("div", { class: "mt" });
    stage.append(hud, card, log);
    const tick = setInterval(() => { left--; drawHud(); if (left <= 0) end(); }, 1000);
    App.onCleanup(() => clearInterval(tick));
    const keys = e => {
      const btns = card.querySelectorAll(".blitz-btns .btn");
      const map = { ArrowLeft: 0, ArrowRight: 1, t: 0, f: 1, "1": 0, "2": 1, "3": 2, "4": 3 };
      const i = map[e.key];
      if (i != null && btns[i]) btns[i].click();
    };
    document.addEventListener("keydown", keys);
    App.onCleanup(() => document.removeEventListener("keydown", keys));
    drawHud();
    round();

    function drawHud() {
      hud.innerHTML = "";
      hud.append(h("span", { class: "hud-item timer" + (left <= 10 ? " low" : "") }, `⏱️ ${left}s`),
        h("span", { class: "hud-item" }, `✅ ${score}`), h("span", { class: "hud-item" }, `❌ ${misses}`),
        h("span", { class: "hud-item combo" }, `🔥 ${streak}`));
    }
    function round() {
      if (over) return;
      const r = nextRound();
      card.innerHTML = "";
      const btns = h("div", { class: "blitz-btns", style: { gridTemplateColumns: `repeat(${columns}, 1fr)` } });
      r.options.forEach(o => btns.appendChild(h("button", {
        class: "btn", onclick: () => {
          if (o.correct) { score++; streak++; if (streak % 5 === 0) { left += 3; App.toast("🔥 5 streak: +3s"); } }
          else {
            misses++; streak = 0; card.classList.add("shake"); setTimeout(() => card.classList.remove("shake"), 350);
            log.prepend(h("div", { class: "explain bad", style: { marginBottom: "6px" } }, r.reveal));
          }
          drawHud(); round();
        }
      }, o.label)));
      card.append(h("div", { class: "blitz-q pop" }, r.prompt), btns);
    }
    function end() {
      if (over) return;
      over = true;
      clearInterval(tick);
      const best = App.setBest(key, score);
      App.gameOver(stage, {
        title,
        lines: [`Score: ${score} correct, ${misses} wrong.`, best ? "🏆 New high score!" : `High score: ${App.state.bests[key]}`],
        xp: score * 3,
        perfect: misses === 0 && score >= 10,
        again: () => rapidFire(stage, { key, title, nextRound, columns, seconds })
      });
    }
  }

  App.games.blitz = {
    name: "Tech Blitz",
    icon: "⚡",
    tags: ["Core 1", "Core 2", "True/False"],
    desc: "60 seconds of rapid true-or-false facts. Every 5-answer streak adds 3 seconds. Keys: ← / → or T / F.",
    bestLabel: b => b.blitz != null ? `High score ${b.blitz}` : null,
    run(stage) {
      let deck = [];
      rapidFire(stage, {
        key: "blitz", title: "Tech Blitz",
        nextRound() {
          if (!deck.length) deck = App.shuffle(DATA.truefalse);
          const [stmt, truth] = deck.pop();
          return {
            prompt: stmt,
            options: [{ label: "✔ True", correct: truth }, { label: "✘ False", correct: !truth }],
            reveal: `${truth ? "TRUE" : "FALSE"}: ${stmt}`
          };
        }
      });
    }
  };

  App.games.acronym = {
    name: "Acronym Attack",
    icon: "🔤",
    tags: ["Core 1", "Core 2", "Acronyms"],
    desc: "CompTIA exams are acronym soup. Pick the right expansion as fast as you can for 60 seconds. Keys: 1–4.",
    bestLabel: b => b.acronym != null ? `High score ${b.acronym}` : null,
    run(stage) {
      let deck = [];
      rapidFire(stage, {
        key: "acronym", title: "Acronym Attack", columns: 1,
        nextRound() {
          if (!deck.length) deck = App.shuffle(DATA.acronyms);
          const [ac, full] = deck.pop();
          const wrong = App.pick(DATA.acronyms.filter(a => a[0] !== ac), 3).map(a => a[1]);
          const opts = App.shuffle([full, ...wrong]);
          return {
            prompt: ac,
            options: opts.map((o, i) => ({ label: `${i + 1}. ${o}`, correct: o === full })),
            reveal: `${ac} = ${full}`
          };
        }
      });
    }
  };
})();
