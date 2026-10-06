(function () {
  const { h } = App;
  const LETTERS = "ABCDEFGH";

  // Shuffle a question's choices while remapping its answer indices.
  function prepare(q) {
    const order = App.shuffle(q.choices.map((_, i) => i));
    return Object.assign({}, q, {
      choices: order.map(i => q.choices[i]),
      answer: q.answer.map(a => order.indexOf(a)).sort(),
      _orig: q
    });
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const s = new Set(a);
    return b.every(x => s.has(x));
  }
  function domainLabel(q) {
    const ex = DATA.exams[q.exam];
    const d = ex && ex.domains[q.domain];
    return d ? `${d.icon} ${d.name}` : "";
  }

  // Renders one question; calls onSubmit(selectedIndices) when the user locks in an answer.
  function questionView(q, { selected = [], locked = false, onSelect, onSubmit, showFeedback = true }) {
    const multi = q.answer.length > 1;
    const wrap = h("div");
    wrap.append(
      h("div", { class: "row" },
        h("span", { class: "tag " + (q.exam === "core1" ? "c1" : "c2") }, DATA.exams[q.exam].code),
        h("span", { class: "tag" }, domainLabel(q)),
        multi ? h("span", { class: "tag", style: { color: "var(--warn)" } }, `Select ${q.answer.length}`) : null
      ),
      h("div", { class: "q-text" }, q.q)
    );
    const list = h("div", { class: "choices" });
    let sel = selected.slice();
    q.choices.forEach((c, i) => {
      const btn = h("button", { class: "choice", disabled: locked },
        h("span", { class: "letter" }, LETTERS[i]), h("span", null, c));
      if (sel.includes(i)) btn.classList.add("selected");
      if (locked && showFeedback) {
        if (q.answer.includes(i)) btn.classList.add("correct");
        else if (sel.includes(i)) btn.classList.add("wrong");
      }
      btn.addEventListener("click", () => {
        if (locked) return;
        if (multi) {
          sel = sel.includes(i) ? sel.filter(x => x !== i) : sel.concat(i);
        } else {
          sel = [i];
        }
        [...list.children].forEach((b, j) => b.classList.toggle("selected", sel.includes(j)));
        onSelect && onSelect(sel);
        if (!multi && onSubmit) onSubmit(sel);
        if (multi && submitBtn) submitBtn.disabled = sel.length !== q.answer.length;
      });
      list.appendChild(btn);
    });
    wrap.appendChild(list);
    let submitBtn = null;
    if (multi && onSubmit && !locked) {
      submitBtn = h("button", { class: "btn primary mt", disabled: sel.length !== q.answer.length, onclick: () => onSubmit(sel) }, "Submit answer");
      wrap.appendChild(submitBtn);
    }
    if (locked && showFeedback) {
      const ok = sameSet(sel, q.answer);
      wrap.appendChild(h("div", { class: "explain " + (ok ? "good" : "bad") },
        h("strong", null, ok ? "✅ Correct! " : `❌ Not quite — answer: ${q.answer.map(a => LETTERS[a]).join(", ")}. `),
        q.explanation));
    }
    // Keyboard shortcuts: 1-5 / A-E to choose
    return wrap;
  }
  App.questionView = questionView;

  // ---------------- Practice quiz ----------------
  App.views.quiz = {
    title: "Practice Quiz",
    render(root, params) {
      const mode = params[0];
      if (mode === "daily") return startDaily(root);
      if (mode === "missed") return startMissed(root);
      if (mode === "weak") return startWeak(root);
      if (mode === "domain") return runQuiz(root, buildPool(params[1], [params[2]]), { count: 15, label: `${DATA.exams[params[1]].domains[params[2]].name} drill` });
      setup(root);
    }
  };

  function buildPool(exam, domains) {
    return App.allQuestions(exam).filter(q => !domains || domains.includes(q.domain));
  }

  function setup(root) {
    const s = App.state;
    let exam = s.examFilter === "both" ? "both" : s.examFilter;
    let mode = "practice";
    let count = 15;
    const picked = { core1: new Set(Object.keys(DATA.exams.core1.domains)), core2: new Set(Object.keys(DATA.exams.core2.domains)) };

    root.append(h("h1", null, "❓ Practice Quiz"), h("p", { class: "sub" }, "Instant feedback with explanations. Build combos for bonus XP."));
    const body = h("div");
    root.appendChild(body);
    draw();

    function draw() {
      body.innerHTML = "";
      const modes = [
        ["practice", "🎯 Practice", "Fixed number of questions, instant feedback."],
        ["survival", "❤️ Survival", "3 lives. How long can you last?"],
        ["speed", "⏱️ Speed Run", "60 seconds. Answer as many as you can."]
      ];
      const modeGrid = h("div", { class: "grid cols-3" });
      for (const [id, name, desc] of modes) {
        modeGrid.appendChild(h("button", {
          class: "card click", style: id === mode ? { borderColor: "var(--accent)" } : null,
          onclick: () => { mode = id; draw(); }
        }, h("h3", null, name), h("p", null, desc)));
      }
      body.append(h("h2", null, "1. Mode"), modeGrid);

      body.append(h("h2", null, "2. Exam & domains"));
      const seg = h("div", { class: "seg" });
      for (const [v, l] of [["core1", "Core 1 (220-1201)"], ["core2", "Core 2 (220-1202)"], ["both", "Both"]]) {
        seg.appendChild(h("button", { class: exam === v ? "on" : "", onclick: () => { exam = v; draw(); } }, l));
      }
      body.appendChild(seg);
      const domGrid = h("div", { class: "grid cols-2 mt" });
      for (const ex of exam === "both" ? ["core1", "core2"] : [exam]) {
        const card = h("div", { class: "card" }, h("h3", null, DATA.exams[ex].name));
        for (const [d, info] of Object.entries(DATA.exams[ex].domains)) {
          const n = buildPool(ex, [d]).length;
          const cb = h("input", { type: "checkbox" });
          cb.checked = picked[ex].has(d);
          cb.addEventListener("change", () => { cb.checked ? picked[ex].add(d) : picked[ex].delete(d); });
          card.appendChild(h("label", { class: "row", style: { margin: "6px 0", cursor: "pointer" } }, cb, `${info.icon} ${d}.0 ${info.name}`, h("span", { class: "muted" }, `(${n})`)));
        }
        domGrid.appendChild(card);
      }
      body.appendChild(domGrid);

      if (mode === "practice") {
        body.append(h("h2", null, "3. Length"));
        const seg2 = h("div", { class: "seg" });
        for (const n of [10, 15, 25, 40]) seg2.appendChild(h("button", { class: count === n ? "on" : "", onclick: () => { count = n; draw(); } }, `${n} questions`));
        body.appendChild(seg2);
      }

      body.appendChild(h("div", { class: "mt" }, h("button", {
        class: "btn primary", onclick: () => {
          const pool = [];
          for (const ex of exam === "both" ? ["core1", "core2"] : [exam]) pool.push(...buildPool(ex, [...picked[ex]]));
          if (!pool.length) return App.toast("Pick at least one domain.");
          root.innerHTML = "";
          runQuiz(root, pool, { mode, count, label: modes.find(m => m[0] === mode)[1] });
        }
      }, "Start ▶")));
    }
  }

  function startDaily(root) {
    // Deterministic-ish daily set: seeded by date so it is the same all day.
    const pool = App.allQuestions(App.state.examFilter === "both" ? "both" : App.state.examFilter);
    let seed = [...App.today()].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const arr = pool.slice();
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    const already = App.state.bests["daily-" + App.today()] != null;
    runQuiz(root, arr.slice(0, 10), { count: 10, label: "📅 Daily Challenge", ordered: true, xpMult: already ? 1 : 2, dailyKey: "daily-" + App.today() });
  }
  function startMissed(root) {
    const pool = App.allQuestions("both").filter(q => App.state.qstats[q.id] && App.state.qstats[q.id].last === false);
    if (!pool.length) {
      root.append(h("h1", null, "🎯 Missed Questions"), h("div", { class: "card empty" }, "Nothing to retry — nice! Take a practice quiz to find new weak spots.", h("div", { class: "mt" }, h("button", { class: "btn primary", onclick: () => App.go("quiz") }, "Practice quiz"))));
      return;
    }
    runQuiz(root, pool, { count: Math.min(20, pool.length), label: "🎯 Retry Missed" });
  }
  function startWeak(root) {
    const scored = [];
    for (const ex of ["core1", "core2"]) for (const d of Object.keys(DATA.exams[ex].domains)) scored.push({ ex, d, m: App.domainMastery(ex, d).pct });
    scored.sort((a, b) => a.m - b.m);
    const pool = [];
    for (const s of scored.slice(0, 2)) pool.push(...buildPool(s.ex, [s.d]));
    runQuiz(root, pool, { count: 15, label: "🎯 Weak Spot Training" });
  }

  function runQuiz(root, pool, opts) {
    const mode = opts.mode || "practice";
    let queue = opts.ordered ? pool.slice() : App.shuffle(pool);
    if (mode === "practice") queue = queue.slice(0, opts.count || 15);
    let idx = 0, correct = 0, combo = 0, bestCombo = 0, xp = 0, lives = 3;
    const missed = [];
    let timeLeft = 60, timer = null;
    const total = mode === "practice" ? queue.length : null;

    root.innerHTML = "";
    const wrap = h("div", { class: "q-wrap" });
    const hud = h("div", { class: "game-hud" });
    const progress = h("div", { class: "progress" }, h("div", { style: { width: "0%" } }));
    const stage = h("div", { class: "card mt" });
    wrap.append(h("h1", null, opts.label || "Quiz"), hud, progress, stage);
    root.appendChild(wrap);

    if (mode === "speed") {
      timer = setInterval(() => { timeLeft--; drawHud(); if (timeLeft <= 0) finish(); }, 1000);
      App.onCleanup(() => clearInterval(timer));
    }
    const keyHandler = e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const n = "12345".indexOf(e.key) >= 0 ? "12345".indexOf(e.key) : "abcde".indexOf(e.key.toLowerCase());
      const btns = stage.querySelectorAll(".choice");
      if (n >= 0 && btns[n] && !btns[n].disabled) btns[n].click();
      if (e.key === "Enter") { const nx = stage.querySelector("[data-next]"); if (nx) nx.click(); }
    };
    document.addEventListener("keydown", keyHandler);
    App.onCleanup(() => document.removeEventListener("keydown", keyHandler));

    next();

    function drawHud() {
      hud.innerHTML = "";
      if (total) hud.appendChild(h("span", { class: "hud-item" }, `Q ${Math.min(idx + 1, total)}/${total}`));
      else hud.appendChild(h("span", { class: "hud-item" }, `Answered ${idx}`));
      hud.appendChild(h("span", { class: "hud-item" }, `✅ ${correct}`));
      hud.appendChild(h("span", { class: "hud-item combo" }, `🔥 Combo x${combo}`));
      hud.appendChild(h("span", { class: "hud-item" }, `⭐ ${xp} XP`));
      if (mode === "survival") hud.appendChild(h("span", { class: "hud-item" }, "❤️".repeat(lives) + "🖤".repeat(3 - lives)));
      if (mode === "speed") hud.appendChild(h("span", { class: "hud-item timer" + (timeLeft <= 10 ? " low" : "") }, `⏱️ ${timeLeft}s`));
      progress.firstChild.style.width = (total ? (idx / total) * 100 : mode === "speed" ? ((60 - timeLeft) / 60) * 100 : 0) + "%";
    }

    function next() {
      if (mode === "practice" && idx >= queue.length) return finish();
      if (mode !== "practice" && idx >= queue.length) queue = queue.concat(App.shuffle(pool));
      drawHud();
      const q = prepare(queue[idx]);
      stage.innerHTML = "";
      stage.appendChild(questionView(q, {
        onSubmit: sel => {
          const ok = sameSet(sel, q.answer);
          App.recordAnswer(q._orig, ok);
          if (ok) {
            correct++; combo++; bestCombo = Math.max(bestCombo, combo);
            const gain = Math.round(10 * (1 + Math.min(combo - 1, 5) * .2) * (opts.xpMult || 1));
            xp += gain;
          } else {
            combo = 0; missed.push(q);
            if (mode === "survival") lives--;
            stage.classList.add("shake"); setTimeout(() => stage.classList.remove("shake"), 400);
          }
          idx++;
          if (mode === "speed") { drawHud(); return next(); }
          stage.innerHTML = "";
          stage.appendChild(questionView(q, { selected: sel, locked: true }));
          const done = (mode === "survival" && lives <= 0) || (mode === "practice" && idx >= queue.length);
          stage.appendChild(h("div", { class: "row mt" },
            h("span", { class: "muted" }, "Tip: press 1–5 to answer, Enter to continue"),
            h("div", { class: "spacer" }),
            h("button", { class: "btn primary", "data-next": "1", onclick: () => done ? finish() : next() }, done ? "See results" : "Next →")));
          drawHud();
        }
      }));
    }

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(timer);
      const answered = idx;
      const pct = answered ? Math.round((correct / answered) * 100) : 0;
      if (pct === 100 && answered >= 10) xp += 25;
      App.addXP(xp, opts.label);
      App.bump("quizzes");
      if (opts.dailyKey && App.state.bests[opts.dailyKey] == null) App.setBest(opts.dailyKey, correct);
      let newBest = false;
      if (mode === "survival") newBest = App.setBest("survival", correct);
      if (mode === "speed") newBest = App.setBest("speed", correct);
      if (pct >= 80 && answered >= 5) App.confetti();

      stage.innerHTML = "";
      drawHud();
      progress.firstChild.style.width = "100%";
      stage.append(
        h("div", { class: "result-big " + (pct >= 75 ? "pass" : pct >= 50 ? "" : "fail") }, `${correct}/${answered}`),
        h("p", { class: "center muted" }, `${pct}% correct · best combo x${bestCombo} · +${xp} XP` + (newBest ? " · 🏆 new personal best!" : "")),
        h("div", { class: "row", style: { justifyContent: "center" } },
          h("button", { class: "btn primary", onclick: () => App.route() }, "Play again"),
          missed.length ? h("button", { class: "btn", onclick: () => App.go("quiz/missed") }, "Retry missed") : null,
          h("button", { class: "btn ghost", onclick: () => App.go("dashboard") }, "Dashboard"))
      );
      if (missed.length) {
        stage.appendChild(h("h2", null, "Review what you missed"));
        for (const q of missed) {
          stage.appendChild(h("div", { class: "explain bad", style: { marginBottom: "10px" } },
            h("div", null, h("strong", null, q.q)),
            h("div", { class: "mt" }, "✔ ", q.answer.map(a => q.choices[a]).join(" + ")),
            h("div", { class: "muted mt" }, q.explanation)));
        }
      }
    }
  }

  // ---------------- Exam simulator ----------------
  App.views.exam = {
    title: "Exam Simulator",
    render(root) {
      root.append(h("h1", null, "📝 Exam Simulator"),
        h("p", { class: "sub" }, "Questions are drawn in proportion to the official domain weights. No feedback until you submit — just like test day."));
      const grid = h("div", { class: "grid cols-2" });
      for (const exam of ["core1", "core2"]) {
        const ex = DATA.exams[exam];
        const avail = App.allQuestions(exam).length;
        const card = h("div", { class: "card" },
          h("h3", null, `${ex.name} `, h("span", { class: "tag " + (exam === "core1" ? "c1" : "c2") }, ex.code)),
          h("p", null, `Real exam: up to ${ex.questions} questions · ${ex.minutes} minutes · passing ${ex.passing} on a 100–900 scale.`),
          h("p", null, `Question bank: ${avail} questions.`));
        const row = h("div", { class: "row mt" });
        for (const [label, n, min] of [["Quick · 20 Q / 20 min", 20, 20], ["Half · 45 Q / 45 min", 45, 45], ["Full · 90 Q / 90 min", 90, 90]]) {
          row.appendChild(h("button", { class: "btn " + (n === 90 ? "primary" : ""), onclick: () => { root.innerHTML = ""; runExam(root, exam, Math.min(n, avail), min); } }, label));
        }
        card.appendChild(row);
        const hist = App.state.examHistory.filter(e => e.exam === exam).slice(-5).reverse();
        if (hist.length) {
          card.appendChild(h("div", { class: "mt muted" }, "Recent: ", hist.map(e => h("span", { class: "tag", style: { color: e.pass ? "var(--good)" : "var(--bad)" } }, `${e.score}`))));
        }
        grid.appendChild(card);
      }
      root.appendChild(grid);
      root.appendChild(h("div", { class: "card mt" },
        h("h3", null, "💡 Test-day tips"),
        h("p", null, "Performance-based questions (PBQs) usually appear first — flag them and come back if they're slow. Read the LAST sentence of a question first to know what is being asked. Watch for words like BEST, FIRST, MOST likely. Eliminate two wrong answers, then decide.")));
    }
  };

  function drawByWeight(exam, n) {
    const ex = DATA.exams[exam];
    const all = App.allQuestions(exam);
    const out = [];
    const doms = Object.entries(ex.domains);
    for (const [d, info] of doms) {
      const pool = App.shuffle(all.filter(q => q.domain === d));
      out.push(...pool.slice(0, Math.round(n * info.weight / 100)));
    }
    if (out.length < n) {
      const used = new Set(out.map(q => q.id));
      out.push(...App.shuffle(all.filter(q => !used.has(q.id))).slice(0, n - out.length));
    }
    return App.shuffle(out.slice(0, n));
  }

  function runExam(root, exam, n, minutes) {
    const ex = DATA.exams[exam];
    const qs = drawByWeight(exam, n).map(prepare);
    const answers = qs.map(() => []);
    const flags = qs.map(() => false);
    let cur = 0;
    let remaining = minutes * 60;
    const start = Date.now();

    const head = h("div", { class: "q-head" });
    const stage = h("div", { class: "card" });
    const nav = h("div", { class: "qnav" });
    root.append(h("div", { class: "q-wrap" }, head, stage, nav));

    const timer = setInterval(() => {
      remaining = minutes * 60 - Math.floor((Date.now() - start) / 1000);
      drawHead();
      if (remaining <= 0) { App.toast("⏰ Time's up!"); submit(); }
    }, 1000);
    App.onCleanup(() => clearInterval(timer));
    const beforeUnload = e => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", beforeUnload);
    App.onCleanup(() => window.removeEventListener("beforeunload", beforeUnload));

    draw();

    function drawHead() {
      head.innerHTML = "";
      head.append(
        h("strong", null, `${ex.name} · Question ${cur + 1} of ${qs.length}`),
        h("span", { class: "timer" + (remaining < 300 ? " low" : "") }, `⏱️ ${App.fmtTime(remaining)}`)
      );
    }
    function draw() {
      drawHead();
      stage.innerHTML = "";
      const q = qs[cur];
      stage.appendChild(questionView(q, { selected: answers[cur], showFeedback: false, onSelect: sel => { answers[cur] = sel; drawNav(); } }));
      stage.appendChild(h("div", { class: "row mt" },
        h("button", { class: "btn", disabled: cur === 0, onclick: () => { cur--; draw(); } }, "← Prev"),
        h("button", { class: "btn " + (flags[cur] ? "danger" : "ghost"), onclick: () => { flags[cur] = !flags[cur]; draw(); } }, flags[cur] ? "🚩 Flagged" : "🏳️ Flag for review"),
        h("div", { class: "spacer" }),
        cur < qs.length - 1
          ? h("button", { class: "btn primary", onclick: () => { cur++; draw(); } }, "Next →")
          : h("button", { class: "btn primary", onclick: confirmSubmit }, "Finish exam")
      ));
      drawNav();
    }
    function drawNav() {
      nav.innerHTML = "";
      qs.forEach((_, i) => {
        const b = h("button", { onclick: () => { cur = i; draw(); } }, i + 1);
        if (answers[i].length) b.classList.add("answered");
        if (flags[i]) b.classList.add("flagged");
        if (i === cur) b.classList.add("current");
        nav.appendChild(b);
      });
      nav.appendChild(h("button", { style: { width: "auto", padding: "0 12px" }, onclick: confirmSubmit }, "Submit"));
    }
    function confirmSubmit() {
      const unanswered = answers.filter(a => !a.length).length;
      const flagged = flags.filter(Boolean).length;
      const msg = `Submit exam?` + (unanswered ? `\n${unanswered} unanswered.` : "") + (flagged ? `\n${flagged} flagged.` : "");
      if (confirm(msg)) submit();
    }
    let done = false;
    function submit() {
      if (done) return;
      done = true;
      clearInterval(timer);
      window.removeEventListener("beforeunload", beforeUnload);
      let correct = 0;
      const byDomain = {};
      qs.forEach((q, i) => {
        const ok = sameSet(answers[i], q.answer);
        if (ok) correct++;
        App.recordAnswer(q._orig, ok);
        const d = byDomain[q.domain] || (byDomain[q.domain] = { c: 0, t: 0 });
        d.t++; if (ok) d.c++;
      });
      const pct = correct / qs.length;
      const score = Math.round(100 + 800 * pct);
      const pass = score >= ex.passing;
      App.state.examHistory.push({ exam, score, pass, n: qs.length, date: App.today() });
      App.bump("exams");
      App.addXP(correct * 8 + (pass ? 150 : 25), `${ex.name} simulation`);
      if (pass) App.confetti(200);

      root.innerHTML = "";
      const res = h("div", { class: "q-wrap" },
        h("h1", null, `${ex.name} — Results`),
        h("div", { class: "card" },
          h("div", { class: "result-big " + (pass ? "pass" : "fail") }, score),
          h("p", { class: "center" }, pass ? `🏆 PASS (needed ${ex.passing})` : `Not yet — needed ${ex.passing}. Keep grinding!`),
          h("p", { class: "center muted" }, `${correct}/${qs.length} correct · time used ${App.fmtTime(minutes * 60 - Math.max(remaining, 0))}`),
          h("p", { class: "center muted", style: { fontSize: ".8rem" } }, "Scaled score is an estimate: CompTIA's real scaling is not public.")
        ),
        h("h2", null, "By domain"));
      const dc = h("div", { class: "card" });
      for (const [d, info] of Object.entries(ex.domains)) {
        const r = byDomain[d] || { c: 0, t: 0 };
        const p = r.t ? Math.round((r.c / r.t) * 100) : 0;
        dc.appendChild(h("div", { class: "mastery-row" }, h("div", null, info.icon),
          h("div", null, h("div", { class: "name" }, `${d}.0 ${info.name}`), h("div", { class: "progress " + (p >= 75 ? "" : p >= 50 ? "warn" : "bad") }, h("div", { style: { width: p + "%" } }))),
          h("div", { class: "pct" }, `${r.c}/${r.t}`)));
      }
      res.appendChild(dc);
      res.appendChild(h("h2", null, "Review answers"));
      qs.forEach((q, i) => {
        const card = h("div", { class: "card", style: { marginBottom: "12px" } }, h("div", { class: "muted" }, `Question ${i + 1}`));
        card.appendChild(questionView(q, { selected: answers[i], locked: true }));
        res.appendChild(card);
      });
      res.appendChild(h("div", { class: "row" }, h("button", { class: "btn primary", onclick: () => App.route() }, "New exam"), h("button", { class: "btn", onclick: () => App.go("dashboard") }, "Dashboard")));
      root.appendChild(res);
      window.scrollTo(0, 0);
    }
  }
})();
