(function () {
  const { h } = App;

  // Pomodoro timer survives route changes so you can study while it runs.
  const pomo = { mode: "focus", left: 25 * 60, running: false, timer: null, listeners: new Set() };
  const LENGTHS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
  function pomoTick() {
    pomo.left--;
    if (pomo.left <= 0) {
      clearInterval(pomo.timer); pomo.running = false;
      if (pomo.mode === "focus") {
        App.bump("pomodoros"); App.addXP(30, "Focus session complete");
        App.toast("🍅 Focus done! Take a 5-minute break.", "badge");
        pomo.mode = "short";
      } else { App.toast("⏰ Break's over — back to it!"); pomo.mode = "focus"; }
      pomo.left = LENGTHS[pomo.mode];
    }
    pomo.listeners.forEach(fn => fn());
    document.title = pomo.running ? `${App.fmtTime(pomo.left)} 🍅 A+ Quest` : document.title;
  }

  App.views.lab = {
    title: "Study Lab",
    render(root, params) {
      if (params[0] === "teach") return teach(root);
      root.append(h("h1", null, "🧪 Study Lab"), h("p", { class: "sub" }, "Evidence-based study techniques, built in. Mix them — variety beats repetition."));

      // Pomodoro
      const timeEl = h("div", { class: "pomo-time" });
      const modeSeg = h("div", { class: "seg" });
      const startBtn = h("button", { class: "btn primary" });
      const draw = () => {
        timeEl.textContent = App.fmtTime(pomo.left);
        startBtn.textContent = pomo.running ? "⏸ Pause" : "▶ Start";
        modeSeg.innerHTML = "";
        for (const [k, l] of [["focus", "Focus 25"], ["short", "Break 5"], ["long", "Long break 15"]]) {
          modeSeg.appendChild(h("button", { class: pomo.mode === k ? "on" : "", onclick: () => { clearInterval(pomo.timer); pomo.running = false; pomo.mode = k; pomo.left = LENGTHS[k]; draw(); } }, l));
        }
      };
      startBtn.addEventListener("click", () => {
        if (pomo.running) { clearInterval(pomo.timer); pomo.running = false; }
        else { pomo.running = true; pomo.timer = setInterval(pomoTick, 1000); }
        draw();
      });
      pomo.listeners.add(draw);
      App.onCleanup(() => pomo.listeners.delete(draw));
      draw();

      root.append(h("div", { class: "grid cols-2" },
        h("div", { class: "card" }, h("h3", null, "🍅 Pomodoro Timer"), h("p", null, "25 minutes of focus, 5 minutes rest. Keeps running while you use the rest of the site."),
          h("div", { class: "center mt" }, modeSeg), timeEl,
          h("div", { class: "row", style: { justifyContent: "center" } }, startBtn, h("button", { class: "btn ghost", onclick: () => { clearInterval(pomo.timer); pomo.running = false; pomo.left = LENGTHS[pomo.mode]; draw(); } }, "↺ Reset")),
          h("p", { class: "center muted mt" }, `Completed sessions: ${App.state.counters.pomodoros}`)),
        h("div", { class: "card" }, h("h3", null, "🎓 Teach-Back (Feynman Technique)"),
          h("p", null, "Explain a concept in your own words as if teaching a new hire, then check your explanation against the key points. Gaps in your explanation = gaps in your understanding."),
          h("p", null, `${(DATA.teachback || []).length} prompts available · ${App.state.counters.teachbacks} completed`),
          h("button", { class: "btn primary mt", onclick: () => App.go("lab/teach") }, "Start a teach-back"))
      ));

      // Daily goal
      const goalSel = h("select", { onchange: e => { App.state.dailyGoal = +e.target.value; App.save(); App.toast("Daily goal updated"); } });
      for (const g of [50, 100, 150, 250, 400]) { const o = h("option", { value: g }, `${g} XP / day`); if (App.state.dailyGoal === g) o.selected = true; goalSel.appendChild(o); }

      root.append(h("h2", null, "How to use this site to pass"),
        h("div", { class: "grid cols-3" },
          tech("🔁", "Spaced repetition", "Review flashcards a little every day. Cards you know drift further apart; cards you miss come back fast. This is the single most efficient way to memorize ports, acronyms and tools.", "flashcards", "Review cards"),
          tech("🧠", "Active recall", "Testing yourself beats re-reading. Use Practice Quiz and Type-It flashcards — the effort of retrieving an answer is what makes it stick.", "quiz", "Take a quiz"),
          tech("🔀", "Interleaving", "Mix domains instead of studying one topic for hours. The Daily Challenge and mixed quizzes do this automatically.", "quiz/daily", "Daily challenge"),
          tech("🛠️", "Learning by doing", "The exam has performance-based questions. Terminal missions and ordering/sorting games mimic them.", "terminal", "Terminal Lab"),
          tech("🎯", "Target weaknesses", "Your dashboard tracks mastery per domain. Drill the lowest bar, then retry missed questions until they're gone.", "quiz/weak", "Weak spots"),
          tech("📝", "Simulate test day", "Take a full 90-question timed exam once a week. Aim for 80%+ consistently before booking the real thing.", "exam", "Exam simulator")),
        h("div", { class: "card mt" }, h("h3", null, "🎯 Daily XP goal"), h("p", null, "Consistency beats cramming. Set a goal you can hit every day to keep your streak alive."), h("div", { class: "mt" }, goalSel)),
        h("div", { class: "card mt" }, h("h3", null, "🗓️ Suggested 6-week plan (per exam)"),
          h("ol", { style: { color: "var(--muted)", lineHeight: "1.9" } },
            h("li", null, "Weeks 1–4: one domain per few days (heaviest first). Daily: 15 min flashcards + one 15-question quiz + one arcade game."),
            h("li", null, "Throughout: one Terminal mission every couple of days; read the debrief."),
            h("li", null, "Week 5: mixed quizzes, Survival mode, retry every missed question, teach-back the topics you dread."),
            h("li", null, "Week 6: two full exam simulations, review every wrong answer, light flashcards the day before. Sleep!")))
      );

      function tech(ico, t, p, route, label) {
        return h("div", { class: "card" }, h("span", { class: "emoji" }, ico), h("h3", null, t), h("p", null, p), h("button", { class: "btn sm mt", onclick: () => App.go(route) }, label + " →"));
      }
    }
  };

  function teach(root) {
    const pool = (DATA.teachback || []).filter(App.inFilter);
    root.append(h("div", { class: "row" }, h("button", { class: "btn sm ghost", onclick: () => App.go("lab") }, "← Study Lab"), h("h1", { style: { margin: 0 } }, "🎓 Teach-Back")),
      h("p", { class: "sub mt" }, "1) Read the prompt. 2) Write your explanation without looking anything up. 3) Reveal the key points and tick the ones you covered."));
    const body = h("div");
    root.append(h("div", { class: "row" }, App.examSelector(() => App.route())), body);
    if (!pool.length) { body.appendChild(h("div", { class: "card empty" }, "No prompts for this filter.")); return; }
    let item = pool[Math.floor(Math.random() * pool.length)];
    draw();

    function draw() {
      body.innerHTML = "";
      const ex = DATA.exams[item.exam];
      const ta = h("textarea", { placeholder: "Explain it like you're training a new help-desk hire…" });
      const card = h("div", { class: "card mt" },
        h("span", { class: "tag " + (item.exam === "core1" ? "c1" : "c2") }, ex.code), h("span", { class: "tag" }, ex.domains[item.domain].name),
        h("h2", { style: { marginTop: "10px" } }, item.prompt), ta,
        h("div", { class: "row mt" }, h("button", { class: "btn primary", onclick: reveal }, "Reveal key points"), h("button", { class: "btn ghost", onclick: () => { item = pool[Math.floor(Math.random() * pool.length)]; draw(); } }, "Skip →")));
      body.appendChild(card);
      setTimeout(() => ta.focus(), 50);

      function reveal() {
        if (ta.value.trim().split(/\s+/).length < 8) { App.toast("Write at least a couple of sentences first — the effort is the point!"); return; }
        const checks = item.points.map(p => { const cb = h("input", { type: "checkbox" }); const text = ta.value.toLowerCase(); const keywords = p.toLowerCase().match(/[a-z0-9.]{5,}/g) || []; cb.checked = keywords.filter(k => text.includes(k)).length >= Math.max(1, Math.ceil(keywords.length / 3)); return [cb, p]; });
        const list = h("div", { class: "points" }, checks.map(([cb, p]) => h("label", null, cb, h("span", null, p))));
        card.querySelector(".row").replaceWith(h("div", null,
          h("h3", { class: "mt" }, "Key points — tick what you covered"),
          h("p", { class: "muted", style: { fontSize: ".85rem" } }, "We pre-ticked likely matches from your keywords. Be honest and adjust."),
          list,
          h("div", { class: "row mt" }, h("button", {
            class: "btn primary", onclick: () => {
              const got = checks.filter(([cb]) => cb.checked).length;
              const pct = got / checks.length;
              App.bump("teachbacks");
              App.addXP(10 + got * 5, "Teach-back");
              if (pct === 1) App.confetti(40);
              App.toast(pct === 1 ? "🎓 Nailed it — you could teach this!" : `Covered ${got}/${checks.length}. Re-explain the missing points out loud.`);
              item = pool[Math.floor(Math.random() * pool.length)];
              draw();
            }
          }, "Score & next prompt"))));
      }
    }
  }
})();
