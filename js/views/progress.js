(function () {
  const { h } = App;

  App.views.progress = {
    title: "Progress",
    render(root) {
      const s = App.state;
      const L = App.levelInfo();
      const acc = s.counters.answered ? Math.round((s.counters.correct / s.counters.answered) * 100) : 0;
      root.append(h("h1", null, "🏅 Progress & Badges"), h("p", { class: "sub" }, `Level ${L.level} · ${L.title} · ${s.xp} total XP`),
        h("div", { class: "card" }, h("div", { class: "row" }, h("strong", null, `Level ${L.level}`), h("div", { class: "spacer" }), h("span", { class: "muted" }, `${L.into} / ${L.need} XP to level ${L.level + 1}`)),
          h("div", { class: "progress mt" }, h("div", { style: { width: L.pct + "%" } }))),
        h("div", { class: "grid cols-4 mt" },
          stat(s.counters.answered, "Questions answered"), stat(acc + "%", "Accuracy"), stat(s.counters.cardsReviewed, "Cards reviewed"),
          stat(s.counters.gamesPlayed, "Games played"), stat(Object.keys(s.missionsDone).length + "/" + App.missions.length, "Missions"),
          stat(s.counters.exams, "Exam sims"), stat(s.counters.teachbacks, "Teach-backs"), stat(`🔥 ${App.currentStreak()}`, "Current streak")));

      root.append(h("h2", null, "Badges"));
      const grid = h("div", { class: "badges" });
      for (const b of App.BADGES) {
        const got = s.badges[b.id];
        grid.appendChild(h("div", { class: "badge" + (got ? "" : " locked"), title: got ? `Unlocked ${got}` : "Locked" },
          h("div", { class: "b-ico" }, b.ico), h("div", { class: "b-name" }, b.name), h("div", { class: "b-desc" }, b.desc)));
      }
      root.appendChild(grid);

      if (s.examHistory.length) {
        root.append(h("h2", null, "Exam simulation history"));
        const t = h("table", { class: "ref" }, h("tr", null, ["Date", "Exam", "Questions", "Score", "Result"].map(c => h("th", null, c))));
        s.examHistory.slice().reverse().forEach(e => t.appendChild(h("tr", null, h("td", null, e.date), h("td", null, DATA.exams[e.exam].name), h("td", null, e.n), h("td", null, e.score), h("td", { style: { color: e.pass ? "var(--good)" : "var(--bad)" } }, e.pass ? "PASS" : "FAIL"))));
        root.appendChild(h("div", { class: "card" }, t));
      }

      root.append(h("h2", null, "Personal bests"));
      const bests = [["Port Match", s.bests.portmatch != null ? s.bests.portmatch + "s" : "—"], ["Tech Blitz", s.bests.blitz ?? "—"], ["Acronym Attack", s.bests.acronym ?? "—"],
        ["Memory Match", s.bests.memory != null ? s.bests.memory + " moves" : "—"], ["Quiz Survival", s.bests.survival ?? "—"], ["Quiz Speed Run", s.bests.speed ?? "—"]];
      root.appendChild(h("div", { class: "grid cols-3" }, bests.map(([n, v]) => stat(v, n))));

      const file = h("input", { type: "file", accept: "application/json", style: { display: "none" }, onchange: e => e.target.files[0] && App.importProgress(e.target.files[0]) });
      root.append(h("h2", null, "Your data"),
        h("div", { class: "card" }, h("p", null, "Progress is saved in this browser only. Export it to back it up or move to another device."),
          h("div", { class: "row mt" },
            h("button", { class: "btn", onclick: App.exportProgress }, "⬇️ Export progress"),
            h("button", { class: "btn", onclick: () => file.click() }, "⬆️ Import progress"), file,
            h("div", { class: "spacer" }),
            h("button", { class: "btn danger", onclick: () => { if (confirm("Erase ALL progress, XP, badges and flashcard schedules? This cannot be undone.")) App.resetProgress(); } }, "Reset everything"))));

      function stat(n, l) { return h("div", { class: "card stat" }, h("div", { class: "num" }, n), h("div", { class: "lbl" }, l)); }
    }
  };
})();
