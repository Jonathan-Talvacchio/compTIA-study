(function () {
  const { h } = App;

  App.views.dashboard = {
    title: "Dashboard",
    render(root) {
      const s = App.state;
      if (s.daily.date !== App.today()) s.daily = { date: App.today(), xp: 0 };
      const L = App.levelInfo();
      const hour = new Date().getHours();
      const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
      const goalPct = Math.min(100, Math.round((s.daily.xp / s.dailyGoal) * 100));

      const cards = (DATA.flashcards || []);
      const due = App.cardsDue(cards).length;
      const missed = App.allQuestions("both").filter(q => s.qstats[q.id] && s.qstats[q.id].last === false).length;
      const dailyDone = s.bests["daily-" + App.today()] != null;

      root.append(
        h("h1", null, `${greet}, technician 👋`),
        h("p", { class: "sub" }, `Level ${L.level} · ${L.title}. Every question, card, game and command earns XP.`),

        h("div", { class: "grid cols-4" },
          stat(`${s.daily.xp}/${s.dailyGoal}`, "Today's XP", goalPct),
          stat(`🔥 ${App.currentStreak()}`, "Day streak"),
          stat(due, "Flashcards due"),
          stat(missed, "Questions to retry")
        ),

        h("h2", null, "Today's missions"),
        h("div", { class: "grid cols-3" },
          action("📅", "Daily Challenge", dailyDone ? "Done for today — come back tomorrow for a new set!" : "10 mixed questions. Double XP, once per day.", () => App.go("quiz/daily")),
          action("🃏", "Review Flashcards", due ? `${due} cards are due for spaced-repetition review.` : "No cards due — learn some new ones.", () => App.go("flashcards")),
          action("🎯", "Fix Weak Spots", missed ? `Retry the ${missed} questions you missed last time.` : "Quiz focused on your weakest domain.", () => App.go(missed ? "quiz/missed" : "quiz/weak")),
          action("🕹️", "Arcade", "Port Match, Tech Blitz, sorting and ordering games.", () => App.go("games")),
          action("💻", "Terminal Lab", "Fix broken PCs using real Windows & Linux commands.", () => App.go("terminal")),
          action("📝", "Exam Simulator", "Timed, scored like the real thing (100–900).", () => App.go("exam"))
        ),

        h("h2", null, "Exam readiness"),
        h("div", { class: "grid cols-2" }, readiness("core1"), readiness("core2"))
      );

      function stat(num, label, pct) {
        return h("div", { class: "card stat" },
          h("div", { class: "num" }, num),
          h("div", { class: "lbl" }, label),
          pct != null ? h("div", { class: "progress mt" }, h("div", { style: { width: pct + "%" } })) : null
        );
      }
      function action(ico, title, desc, fn) {
        return h("button", { class: "card click", onclick: fn },
          h("span", { class: "emoji" }, ico), h("h3", null, title), h("p", null, desc));
      }
    }
  };

  function readiness(exam) {
    const ex = DATA.exams[exam];
    const r = App.examReadiness(exam);
    const card = h("div", { class: "card" },
      h("div", { class: "row" },
        h("div", null, h("h3", null, `${ex.name}`), h("span", { class: "tag " + (exam === "core1" ? "c1" : "c2") }, ex.code)),
        h("div", { class: "spacer" }),
        h("div", { class: "stat" }, h("div", { class: "num" }, r + "%"), h("div", { class: "lbl" }, "readiness"))
      )
    );
    const weakest = Object.entries(ex.domains)
      .map(([d, info]) => ({ d, info, m: App.domainMastery(exam, d) }))
      .sort((a, b) => a.m.pct - b.m.pct)[0];
    for (const [d, info] of Object.entries(ex.domains)) {
      const m = App.domainMastery(exam, d);
      const cls = m.pct >= 70 ? "" : m.pct >= 40 ? "warn" : "bad";
      card.appendChild(h("div", { class: "mastery-row" },
        h("div", null, info.icon),
        h("div", null,
          h("div", { class: "name" }, `${d}.0 ${info.name} `, h("span", { class: "muted" }, `· ${info.weight}%`)),
          h("div", { class: "progress " + (m.seen ? cls : "") }, h("div", { style: { width: m.pct + "%" } }))
        ),
        h("div", { class: "pct" }, m.pct + "%")
      ));
    }
    if (weakest) {
      card.appendChild(h("button", {
        class: "btn sm mt",
        onclick: () => App.go(`quiz/domain/${exam}/${weakest.d}`)
      }, `Train weakest: ${weakest.info.name} →`));
    }
    return card;
  }
})();
