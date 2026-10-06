(function () {
  const { h } = App;
  const OS_INFO = {
    windows: { name: "Windows CMD", icon: "🪟", os: () => App.WindowsOS, world: () => App.defaultWindowsWorld() },
    linux: { name: "Linux bash", icon: "🐧", os: () => App.LinuxOS, world: () => App.defaultLinuxWorld() }
  };

  // Escape text and turn `code` spans into <code>.
  function md(text) {
    const esc = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  App.views.terminal = {
    title: "Terminal Lab",
    render(root, params) {
      const [kind, id] = params;
      if (kind === "free") return freePlay(root, id === "linux" ? "linux" : "windows");
      if (kind === "drill") return drill(root, id === "linux" ? "linux" : "windows");
      if (kind === "lesson") { const l = App.lessons.find(x => x.id === id); if (l) return lesson(root, l); }
      if (kind === "mission") { const m = App.missions.find(x => x.id === id); if (m) return mission(root, m); }
      menu(root);
    }
  };

  // ------------------------------------------------------------------ menu
  function menu(root) {
    const s = App.state;
    const lessonsDone = App.lessons.filter(l => s.lessonsDone[l.id]).length;
    const missionsDone = App.missions.filter(m => s.missionsDone[m.id]).length;
    root.append(h("h1", null, "💻 Terminal Lab"),
      h("p", { class: "sub" }, "Learn the Windows and Linux command line step by step, drill the exact syntax, then fix realistic help-desk tickets. Everything runs in a safe simulator."),
      h("div", { class: "grid cols-4" },
        stat(`${lessonsDone}/${App.lessons.length}`, "Lessons finished"),
        stat(`${missionsDone}/${App.missions.length}`, "Missions solved"),
        stat(s.bests["drill-windows"] != null ? `${s.bests["drill-windows"]}/10` : "—", "Best CMD drill"),
        stat(s.bests["drill-linux"] != null ? `${s.bests["drill-linux"]}/10` : "—", "Best Linux drill")),
      h("div", { class: "card mt" }, h("strong", null, "Suggested path: "),
        h("span", { class: "muted" }, "1) Academy lessons teach each command → 2) Command Drill locks in the syntax → 3) Missions put it together on real problems → 4) Free Play to experiment.")));

    root.appendChild(h("h2", null, "🎓 Terminal Academy"));
    root.appendChild(h("p", { class: "muted", style: { marginTop: "-6px" } }, "Guided lessons: one command at a time, with an explanation of what just happened."));
    for (const os of ["windows", "linux"]) {
      const grid = h("div", { class: "grid cols-3", style: { marginBottom: "14px" } });
      App.lessons.filter(l => l.os === os).forEach((l, i) => {
        const done = s.lessonsDone[l.id];
        grid.appendChild(h("button", { class: "card click", onclick: () => App.go("terminal/lesson/" + l.id) },
          h("div", null, h("span", { class: "tag" }, `${OS_INFO[os].icon} ${i + 1}`), h("span", { class: "tag" }, l.level), h("span", { class: "tag" }, `${l.steps.length} steps`),
            done ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ done") : null),
          h("h3", { class: "mt" }, l.title), h("p", null, l.blurb)));
      });
      root.appendChild(grid);
    }

    root.appendChild(h("h2", null, "⚡ Command Drill"));
    root.appendChild(h("div", { class: "grid cols-2" }, ["windows", "linux"].map(os => h("button", { class: "card click", onclick: () => App.go("terminal/drill/" + os) },
      h("span", { class: "emoji" }, OS_INFO[os].icon), h("h3", null, `${OS_INFO[os].name} drill`),
      h("p", null, `10 random tasks from ${App.drills[os].length}. Read the task, type the exact command. Two tries each.`),
      s.bests["drill-" + os] != null ? h("p", { style: { color: "var(--warn)" } }, `🏆 Best: ${s.bests["drill-" + os]}/10`) : null))));

    for (const os of ["windows", "linux"]) {
      root.appendChild(h("h2", null, `🎫 ${OS_INFO[os].name} missions`));
      const grid = h("div", { class: "grid cols-3" });
      App.missions.filter(m => m.os === os).forEach(m => {
        const done = s.missionsDone[m.id];
        grid.appendChild(h("button", { class: "card click", onclick: () => App.go("terminal/mission/" + m.id) },
          h("div", null, h("span", { class: "tag" }, m.difficulty), h("span", { class: "tag" }, m.objective), done ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ complete") : null),
          h("h3", { class: "mt" }, m.title), h("p", null, m.story)));
      });
      root.appendChild(grid);
    }

    root.appendChild(h("h2", null, "🧪 Free Play"));
    root.appendChild(h("div", { class: "grid cols-2" }, ["windows", "linux"].map(os => h("button", { class: "card click", onclick: () => App.go("terminal/free/" + os) },
      h("span", { class: "emoji" }, OS_INFO[os].icon), h("h3", null, `Free Play: ${OS_INFO[os].name}`),
      h("p", null, "A sandbox with a searchable command guide beside it. Nothing you do here can break anything.")))));
  }
  function stat(n, l) { return h("div", { class: "card stat" }, h("div", { class: "num" }, n), h("div", { class: "lbl" }, l)); }

  // ------------------------------------------------------------------ shared pieces
  function header(root, title, sub) {
    root.append(h("div", { class: "row" }, h("button", { class: "btn sm ghost", onclick: () => App.go("terminal") }, "← Terminal Lab"),
      h("h1", { style: { margin: 0 } }, title)));
    if (sub) root.append(sub);
  }
  function layout(root) {
    const termBox = h("div");
    const side = h("div", { class: "term-side" });
    root.appendChild(h("div", { class: "term-layout mt" }, termBox, side));
    return { termBox, side };
  }
  // Searchable command reference; clicking an example types it into the terminal.
  function guidePanel(os, getTerm, open = true) {
    const list = h("div", { class: "guide-list" });
    const search = h("input", { type: "text", placeholder: "Search commands…", style: { width: "100%" } });
    const draw = () => {
      const q = search.value.trim().toLowerCase();
      list.innerHTML = "";
      App.commandGuide[os].filter(([c, what, ex]) => !q || (c + " " + what + " " + ex.join(" ")).toLowerCase().includes(q)).forEach(([c, what, ex]) => {
        list.appendChild(h("div", { class: "guide-item" },
          h("div", null, h("code", null, c), " ", h("span", { class: "muted" }, what)),
          h("div", { class: "guide-ex" }, ex.map(e => h("button", { class: "ex", type: "button", title: "Type this into the terminal", onclick: () => { const t = getTerm(); if (t) { t.input.value = e; t.focus(); } } }, e)))));
      });
      if (!list.children.length) list.appendChild(h("div", { class: "muted" }, "No matches."));
    };
    search.addEventListener("input", draw);
    draw();
    const d = h("details", { class: "card guide", open: open || null },
      h("summary", null, "📖 Command Guide"), h("p", { class: "muted", style: { fontSize: ".82rem" } }, "Click an example to type it in."), search, list);
    return d;
  }
  function worldFor(os, setup) { const w = OS_INFO[os].world(); if (setup) setup(w); return w; }

  // ------------------------------------------------------------------ free play
  function freePlay(root, os) {
    header(root, `${OS_INFO[os].icon} ${OS_INFO[os].name}`, h("p", { class: "sub mt" }, "Sandbox mode. Every new command you try earns XP. Type help to see what's available."));
    const { termBox, side } = layout(root);
    let term;
    const tried = new Set();
    side.append(guidePanel(os, () => term, true),
      h("button", { class: "btn sm ghost mt", onclick: () => App.route() }, "↺ Reset the sandbox"));
    const OS = OS_INFO[os].os();
    term = App.Terminal(termBox, OS, worldFor(os), {
      onCommand(line) {
        let toks = App.tokenize(line); if (toks[0] === "sudo") toks = toks.slice(1);
        const c = (toks[0] || "").toLowerCase();
        if (c && !tried.has(c) && OS.commands.includes(c)) { tried.add(c); App.addXP(3); }
      }
    });
  }

  // ------------------------------------------------------------------ academy lesson
  function lesson(root, l) {
    const idx = App.lessons.filter(x => x.os === l.os).indexOf(l);
    header(root, l.title, h("p", { class: "sub mt" }, `${OS_INFO[l.os].icon} ${OS_INFO[l.os].name} · Lesson ${idx + 1} · ${l.level}. ${l.blurb}`));
    const { termBox, side } = layout(root);
    let step = 0, term;
    const notes = [];
    const panel = h("div", { class: "card" });
    side.append(panel, guidePanel(l.os, () => term, false));
    draw();
    term = App.Terminal(termBox, OS_INFO[l.os].os(), worldFor(l.os, l.setup), {
      onCommand(line, out) {
        if (step >= l.steps.length) return;
        const ctx = App.missionCheckCtx(line, out, term.world);
        let ok = false;
        try { ok = !!l.steps[step].check(ctx); } catch (e) { ok = false; }
        if (!ok) return;
        notes[step] = l.steps[step].after;
        step++;
        if (step >= l.steps.length) finish(); else App.toast(`✅ Step ${step}/${l.steps.length}`);
        draw();
      }
    });

    function draw() {
      panel.innerHTML = "";
      panel.append(h("div", { class: "row" }, h("h3", { style: { margin: 0 } }, "Lesson steps"), h("div", { class: "spacer" }), h("span", { class: "muted" }, `${Math.min(step, l.steps.length)}/${l.steps.length}`)),
        h("div", { class: "progress mt" }, h("div", { style: { width: (step / l.steps.length) * 100 + "%" } })));
      const list = h("ol", { class: "lesson-steps" });
      l.steps.forEach((st, i) => {
        if (i < step) {
          list.appendChild(h("li", { class: "done" }, h("div", { class: "txt" }, "✅ ", st.task), notes[i] ? h("div", { class: "lesson-after", html: md(notes[i]) }) : null));
        } else if (i === step) {
          const hintBox = h("div", null, h("button", { class: "btn sm ghost", style: { padding: "2px 8px", fontSize: ".78rem" }, onclick: () => { hintBox.innerHTML = ""; hintBox.appendChild(h("code", null, st.hint)); } }, "💡 Show the command"));
          list.appendChild(h("li", { class: "current" },
            st.teach ? h("div", { class: "lesson-teach", html: md(st.teach) }) : null,
            h("div", { class: "lesson-task" }, "▶ ", st.task), hintBox));
        }
      });
      panel.appendChild(list);
      if (step < l.steps.length - 1) panel.appendChild(h("p", { class: "muted", style: { fontSize: ".82rem" } }, `${l.steps.length - step - 1} more step${l.steps.length - step - 1 === 1 ? "" : "s"} after this one.`));
      if (step >= l.steps.length) {
        const sameOs = App.lessons.filter(x => x.os === l.os);
        const next = sameOs[sameOs.indexOf(l) + 1];
        panel.appendChild(h("div", { class: "explain good" }, h("strong", null, "🎓 Lesson complete! "), "Try the Command Drill to lock in the syntax, or a mission to use it for real."));
        panel.appendChild(h("div", { class: "row mt" },
          next ? h("button", { class: "btn primary sm", onclick: () => App.go("terminal/lesson/" + next.id) }, `Next: ${next.title} →`) : null,
          h("button", { class: "btn sm", onclick: () => App.go("terminal/drill/" + l.os) }, "Command Drill"),
          h("button", { class: "btn sm ghost", onclick: () => App.route() }, "Replay")));
      }
    }
    function finish() {
      const first = !App.state.lessonsDone[l.id];
      App.state.lessonsDone[l.id] = App.today();
      App.save();
      App.addXP(first ? 40 : 10, "Lesson complete");
      App.checkBadges();
      App.confetti(60);
    }
  }

  // ------------------------------------------------------------------ command drill
  function drill(root, os) {
    header(root, `⚡ ${OS_INFO[os].name} Command Drill`, h("p", { class: "sub mt" }, "Read the task, type the command, press Enter. Your command really runs in the sandbox, but what's graded is the syntax. Two tries per task."));
    const { termBox, side } = layout(root);
    const ROUND = 10;
    const tasks = App.pick(App.drills[os], ROUND);
    let i = 0, score = 0, tries = 0, streak = 0, locked = false, term;
    const results = [];
    const panel = h("div", { class: "card" });
    side.append(panel, guidePanel(os, () => term, false));
    term = App.Terminal(termBox, OS_INFO[os].os(), worldFor(os), {
      onCommand(line) {
        const w = term.world;
        // keep the sandbox in a normal state between tasks
        if (w.mode === "diskpart") { w.mode = null; w.__prompt = null; }
        if (os === "linux" && w.suStack.length) { w.user = w.suStack[0]; w.suStack = []; w.cwd = ["home", "student"]; }
        if (i >= ROUND || locked) return;
        const t = tasks[i];
        const ok = t.ok(App.normalizeDrill(line, os));
        tries++;
        if (ok) { score++; streak++; results.push({ t, ok: true, tries }); App.toast(tries === 1 ? "✅ Correct!" : "✅ Got it on the second try"); advance(); }
        else if (tries >= 2) { streak = 0; results.push({ t, ok: false, tries }); reveal(t, line); }
        else { streak = 0; drawPanel(`❌ Not quite. One more try.`); }
      }
    });
    drawPanel();

    function advance() { i++; tries = 0; locked = false; if (i >= ROUND) finish(); else drawPanel(); }
    function reveal(t, line) {
      locked = true;
      drawPanel(null, h("div", { class: "explain bad" }, h("div", null, "You typed: ", h("code", null, line || "(nothing)")), h("div", { class: "mt" }, "Answer: ", h("code", null, t.a)),
        h("button", { class: "btn primary sm mt", onclick: advance }, i + 1 >= ROUND ? "See results" : "Next task →")));
    }
    function drawPanel(msg, extra) {
      panel.innerHTML = "";
      if (i >= ROUND) return;
      const t = tasks[i];
      panel.append(
        h("div", { class: "row" }, h("strong", null, `Task ${i + 1}/${ROUND}`), h("div", { class: "spacer" }), h("span", { class: "muted" }, `Score ${score} · 🔥 ${streak}`)),
        h("div", { class: "progress mt" }, h("div", { style: { width: (i / ROUND) * 100 + "%" } })),
        h("div", { class: "drill-q" }, t.q),
        msg ? h("div", { class: "muted" }, msg) : null,
        extra || h("div", { class: "row mt" },
          h("button", { class: "btn sm ghost", onclick: () => { results.push({ t, ok: false, tries: 0 }); streak = 0; reveal(t, ""); } }, "Reveal answer")));
    }
    function finish() {
      const best = App.setBest("drill-" + os, score);
      App.addXP(score * 5 + (score === ROUND ? 25 : 0), "Command Drill");
      App.bump("gamesPlayed");
      if (score === ROUND) { App.bump("perfectGames"); App.confetti(); }
      App.checkBadges();
      panel.innerHTML = "";
      panel.append(h("div", { class: "result-big " + (score >= 8 ? "pass" : score >= 5 ? "" : "fail") }, `${score}/${ROUND}`),
        h("p", { class: "center muted" }, best ? "🏆 New personal best!" : `Best: ${App.state.bests["drill-" + os]}/${ROUND}`),
        h("div", { class: "row", style: { justifyContent: "center" } }, h("button", { class: "btn primary sm", onclick: () => App.route() }, "New round"), h("button", { class: "btn sm ghost", onclick: () => App.go("terminal") }, "Terminal Lab")));
      const missed = results.filter(r => !r.ok);
      if (missed.length) {
        panel.appendChild(h("h3", { class: "mt" }, "Review"));
        missed.forEach(r => panel.appendChild(h("div", { class: "explain bad", style: { marginBottom: "8px" } }, h("div", null, r.t.q), h("code", null, r.t.a))));
      }
    }
  }

  // ------------------------------------------------------------------ missions
  function mission(root, m) {
    header(root, m.title, h("div", { class: "card mt" }, h("div", null, h("span", { class: "tag" }, m.difficulty), h("span", { class: "tag" }, m.objective)), h("p", { style: { color: "var(--text)", marginTop: "8px" } }, "🎫 Ticket: " + m.story)));
    const world = worldFor(m.os, m.setup);
    const done = new Set();
    let hintsUsed = 0, term;
    const { termBox, side } = layout(root);
    const card = h("div", { class: "card" });
    const list = h("ul", { class: "objectives" });
    const status = h("div", { class: "mt" });
    card.append(h("h3", null, "Objectives"), h("p", { class: "muted", style: { fontSize: ".85rem" } }, "Complete in any order. Hints cost XP."), list, status);
    side.append(card, guidePanel(m.os, () => term, false));
    drawObjectives();

    term = App.Terminal(termBox, OS_INFO[m.os].os(), world, {
      onCommand(line, out) {
        const ctx = App.missionCheckCtx(line, out, world);
        let newly = 0;
        m.objectives.forEach((o, i) => {
          if (done.has(i)) return;
          let ok = false;
          try { ok = !!o.check(ctx); } catch (e) { ok = false; }
          if (ok) { done.add(i); newly++; }
        });
        if (newly) { App.toast(`✅ Objective complete (${done.size}/${m.objectives.length})`); drawObjectives(); }
        if (done.size === m.objectives.length && !status.dataset.done) finish();
      }
    });

    function drawObjectives() {
      list.innerHTML = "";
      m.objectives.forEach((o, i) => {
        list.appendChild(h("li", { class: done.has(i) ? "done" : "" }, h("span", { class: "chk" }, done.has(i) ? "✅" : "⬜"),
          h("div", null, h("div", { class: "txt" }, o.text), !done.has(i) ? hintBtn(o) : null)));
      });
    }
    function hintBtn(o) {
      const box = h("div");
      box.appendChild(h("button", { class: "btn sm ghost", style: { padding: "2px 8px", marginTop: "4px", fontSize: ".78rem" }, onclick: () => { hintsUsed++; box.innerHTML = ""; box.appendChild(h("code", null, o.hint)); } }, "💡 hint"));
      return box;
    }
    function finish() {
      status.dataset.done = "1";
      const first = !App.state.missionsDone[m.id];
      const xp = Math.max(40, 120 - hintsUsed * 15) * (first ? 1 : 0.5);
      App.state.missionsDone[m.id] = App.today();
      App.bump("missions");
      App.addXP(Math.round(xp), "Mission complete");
      App.confetti();
      status.append(h("div", { class: "explain good" }, h("strong", null, "🎉 Ticket resolved! "), m.debrief),
        h("div", { class: "row mt" }, h("button", { class: "btn primary sm", onclick: () => App.go("terminal") }, "More missions"), h("button", { class: "btn sm", onclick: () => App.route() }, "Replay")));
    }
  }
})();
