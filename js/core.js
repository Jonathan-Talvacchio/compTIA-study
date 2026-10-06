/* Core: DOM helpers, persistent state, XP/levels/badges, spaced repetition, router. */
window.App = (function () {
  const App = { views: {}, games: {} };

  // ---------- DOM helpers ----------
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") el.className = v;
        else if (k === "html") el.innerHTML = v;
        else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
        else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) el.setAttribute(k, "");
        else el.setAttribute(k, v);
      }
    }
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false) continue;
      el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }
  App.h = h;
  App.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  App.pick = (arr, n) => App.shuffle(arr).slice(0, n);
  App.fmtTime = function (sec) {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };
  App.today = function () {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // ---------- Persistent state ----------
  const KEY = "aplus-quest-v1";
  const defaults = () => ({
    xp: 0,
    daily: { date: App.today(), xp: 0 },
    dailyGoal: 150,
    streak: { count: 0, last: null },
    qstats: {},
    cards: {},
    badges: {},
    counters: { answered: 0, correct: 0, quizzes: 0, exams: 0, cardsReviewed: 0, gamesPlayed: 0, missions: 0, teachbacks: 0, pomodoros: 0, perfectGames: 0 },
    bests: {},
    examHistory: [],
    missionsDone: {},
    lessonsDone: {},
    examFilter: "both",
    theme: "dark"
  });
  let state;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    state = Object.assign(defaults(), saved || {});
    state.counters = Object.assign(defaults().counters, state.counters || {});
  } catch (e) {
    state = defaults();
  }
  App.state = state;
  App.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
  };
  App.resetProgress = function () {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    location.reload();
  };
  App.exportProgress = function () {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = h("a", { href: URL.createObjectURL(blob), download: `aplus-quest-progress-${App.today()}.json` });
    document.body.appendChild(a); a.click(); a.remove();
  };
  App.importProgress = function (file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        localStorage.setItem(KEY, JSON.stringify(data));
        location.reload();
      } catch (e) { App.toast("That file isn't a valid progress export."); }
    };
    r.readAsText(file);
  };

  // ---------- Toasts & celebration ----------
  App.toast = function (msg, kind = "") {
    let box = document.querySelector(".toasts");
    if (!box) { box = h("div", { class: "toasts" }); document.body.appendChild(box); }
    const t = h("div", { class: `toast ${kind}` }, msg);
    box.appendChild(t);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(() => t.remove(), 3200);
  };
  App.confetti = function (n = 80) {
    const colors = ["#4ade80", "#38bdf8", "#c084fc", "#fbbf24", "#f87171"];
    for (let i = 0; i < n; i++) {
      const c = h("div", { class: "confetti" });
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.8 + "s";
      c.style.animationDelay = Math.random() * .4 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  };

  // ---------- XP, levels, streaks ----------
  const TITLES = [
    "Curious Clicker", "Help Desk Trainee", "Cable Wrangler", "Driver Whisperer", "Tier 1 Tech",
    "Packet Tracker", "BSOD Survivor", "Tier 2 Tech", "Subnet Scout", "Malware Hunter",
    "Field Technician", "Systems Wizard", "Network Ninja", "Tier 3 Specialist", "A+ Ready", "A+ Legend"
  ];
  App.levelInfo = function (xp = state.xp) {
    let level = 1, need = 100, floor = 0;
    while (xp >= floor + need) { floor += need; level++; need = 100 + (level - 1) * 60; }
    return { level, title: TITLES[Math.min(level - 1, TITLES.length - 1)], into: xp - floor, need, pct: Math.round(((xp - floor) / need) * 100) };
  };
  function touchStreak() {
    const today = App.today();
    if (state.streak.last === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
    state.streak.count = state.streak.last === yesterday ? state.streak.count + 1 : 1;
    state.streak.last = today;
    if (state.streak.count > 1) App.toast(`🔥 ${state.streak.count}-day streak!`, "badge");
  }
  App.currentStreak = function () {
    const y = new Date(); y.setDate(y.getDate() - 1);
    const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
    return state.streak.last === App.today() || state.streak.last === yesterday ? state.streak.count : 0;
  };
  App.addXP = function (amount, reason) {
    if (!amount) return;
    const before = App.levelInfo().level;
    if (state.daily.date !== App.today()) state.daily = { date: App.today(), xp: 0 };
    const wasBelowGoal = state.daily.xp < state.dailyGoal;
    state.xp += amount;
    state.daily.xp += amount;
    touchStreak();
    if (reason) App.toast(`+${amount} XP · ${reason}`, "xp");
    const after = App.levelInfo();
    if (after.level > before) {
      App.toast(`⬆️ Level ${after.level}: ${after.title}!`, "badge");
      App.confetti(120);
    }
    if (wasBelowGoal && state.daily.xp >= state.dailyGoal) {
      App.toast("🎯 Daily goal complete!", "badge");
      App.confetti(60);
    }
    App.checkBadges();
    App.save();
    App.renderPlayer();
  };
  App.bump = function (counter, n = 1) {
    state.counters[counter] = (state.counters[counter] || 0) + n;
    App.checkBadges();
    App.save();
  };
  App.setBest = function (key, value, higherIsBetter = true) {
    const cur = state.bests[key];
    const better = cur == null || (higherIsBetter ? value > cur : value < cur);
    if (better) { state.bests[key] = value; App.save(); }
    return better;
  };

  // ---------- Question stats & mastery ----------
  App.recordAnswer = function (q, correct) {
    const s = state.qstats[q.id] || { seen: 0, correct: 0, last: null };
    s.seen++; if (correct) s.correct++; s.last = correct;
    state.qstats[q.id] = s;
    state.counters.answered++; if (correct) state.counters.correct++;
    App.save();
  };
  App.allQuestions = function (exam) {
    const c1 = (DATA.core1Questions || []).map(q => Object.assign({ exam: "core1" }, q));
    const c2 = (DATA.core2Questions || []).map(q => Object.assign({ exam: "core2" }, q));
    if (exam === "core1") return c1;
    if (exam === "core2") return c2;
    return c1.concat(c2);
  };
  // Mastery = smoothed accuracy weighted by coverage, per domain.
  App.domainMastery = function (exam, domain) {
    const qs = App.allQuestions(exam).filter(q => q.domain === domain);
    if (!qs.length) return { pct: 0, seen: 0, total: 0 };
    let seen = 0, score = 0;
    for (const q of qs) {
      const s = state.qstats[q.id];
      if (!s) continue;
      seen++;
      score += s.last ? (s.correct / s.seen) * .6 + .4 : (s.correct / s.seen) * .5;
    }
    return { pct: Math.round((score / qs.length) * 100), seen, total: qs.length };
  };
  App.examReadiness = function (exam) {
    const ex = DATA.exams[exam];
    let total = 0;
    for (const [d, info] of Object.entries(ex.domains)) total += App.domainMastery(exam, d).pct * info.weight / 100;
    return Math.round(total);
  };

  // ---------- Spaced repetition (simplified SM-2) ----------
  const DAY = 86400000;
  App.cardState = id => state.cards[id];
  App.rateCard = function (id, rating) {
    // rating: 0 again, 1 hard, 2 good, 3 easy
    const c = state.cards[id] || { ease: 2.5, interval: 0, reps: 0, due: 0 };
    if (rating === 0) {
      c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - .2); c.due = Date.now() + 60 * 1000;
    } else {
      if (rating === 1) { c.interval = Math.max(1, Math.round((c.interval || 1) * 1.2)); c.ease = Math.max(1.3, c.ease - .15); }
      else if (rating === 2) { c.interval = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ease); }
      else { c.interval = c.reps === 0 ? 4 : Math.round(Math.max(c.interval, 1) * c.ease * 1.3); c.ease += .15; }
      c.reps++;
      c.due = Date.now() + c.interval * DAY;
    }
    state.cards[id] = c;
    state.counters.cardsReviewed++;
    App.checkBadges();
    App.save();
    return c;
  };
  App.cardsDue = function (cards) {
    const now = Date.now();
    return cards.filter(c => { const s = state.cards[c.id]; return s && s.due <= now; });
  };
  App.cardsNew = cards => cards.filter(c => !state.cards[c.id]);
  App.cardsLearned = cards => cards.filter(c => { const s = state.cards[c.id]; return s && s.interval >= 21; });

  // ---------- Badges ----------
  const BADGES = [
    { id: "first-blood", ico: "🎯", name: "First Answer", desc: "Answer a question", test: s => s.counters.answered >= 1 },
    { id: "century", ico: "💯", name: "Century", desc: "Answer 100 questions", test: s => s.counters.answered >= 100 },
    { id: "five-hundred", ico: "🏛️", name: "Question Titan", desc: "Answer 500 questions", test: s => s.counters.answered >= 500 },
    { id: "card-shark", ico: "🃏", name: "Card Shark", desc: "Review 50 flashcards", test: s => s.counters.cardsReviewed >= 50 },
    { id: "card-master", ico: "🧠", name: "Memory Palace", desc: "Review 500 flashcards", test: s => s.counters.cardsReviewed >= 500 },
    { id: "gamer", ico: "🕹️", name: "Gamer", desc: "Play 10 mini-games", test: s => s.counters.gamesPlayed >= 10 },
    { id: "perfect", ico: "✨", name: "Flawless", desc: "Finish a game with zero mistakes", test: s => s.counters.perfectGames >= 1 },
    { id: "port-master", ico: "🔌", name: "Port Master", desc: "Port Match in under 45s", test: s => s.bests.portmatch != null && s.bests.portmatch <= 45 },
    { id: "blitz", ico: "⚡", name: "Lightning Brain", desc: "Score 20+ in Tech Blitz", test: s => (s.bests.blitz || 0) >= 20 },
    { id: "shell", ico: "💻", name: "Shell Shocked", desc: "Complete a terminal mission", test: s => s.counters.missions >= 1 },
    { id: "cli-student", ico: "🎒", name: "CLI Student", desc: "Finish a Terminal Academy lesson", test: s => Object.keys(s.lessonsDone || {}).length >= 1 },
    { id: "academy", ico: "🎓", name: "Academy Graduate", desc: "Finish every Terminal Academy lesson", test: s => Object.keys(s.lessonsDone || {}).length >= ((App.lessons && App.lessons.length) || 999) },
    { id: "drill-ace", ico: "⌨️", name: "Command Line Ace", desc: "Score 9+ in a Command Drill round", test: s => Math.max(s.bests["drill-windows"] || 0, s.bests["drill-linux"] || 0) >= 9 },
    { id: "sysadmin", ico: "🧙", name: "Sysadmin", desc: "Complete every terminal mission", test: s => Object.keys(s.missionsDone).length >= ((App.missionCount && App.missionCount()) || 999) },
    { id: "exam-taker", ico: "📝", name: "Test Pilot", desc: "Finish a full exam simulation", test: s => s.counters.exams >= 1 },
    { id: "exam-pass", ico: "🏆", name: "Passing Grade", desc: "Pass an exam simulation", test: s => s.examHistory.some(e => e.pass) },
    { id: "teacher", ico: "🎓", name: "The Teacher", desc: "Complete 5 teach-backs", test: s => s.counters.teachbacks >= 5 },
    { id: "focus", ico: "🍅", name: "Deep Focus", desc: "Complete a Pomodoro", test: s => s.counters.pomodoros >= 1 },
    { id: "streak-3", ico: "🔥", name: "On Fire", desc: "3-day streak", test: s => s.streak.count >= 3 },
    { id: "streak-7", ico: "🌋", name: "Unstoppable", desc: "7-day streak", test: s => s.streak.count >= 7 },
    { id: "lvl-5", ico: "🎖️", name: "Tier 1", desc: "Reach level 5", test: s => App.levelInfo(s.xp).level >= 5 },
    { id: "lvl-10", ico: "👑", name: "Malware Hunter", desc: "Reach level 10", test: s => App.levelInfo(s.xp).level >= 10 }
  ];
  App.BADGES = BADGES;
  App.checkBadges = function () {
    for (const b of BADGES) {
      if (state.badges[b.id]) continue;
      let ok = false;
      try { ok = b.test(state); } catch (e) { ok = false; }
      if (ok) {
        state.badges[b.id] = App.today();
        App.toast(`${b.ico} Badge unlocked: ${b.name}`, "badge");
        App.confetti(50);
      }
    }
  };

  // ---------- Exam filter (Core 1 / Core 2 / Both) ----------
  App.examFilter = () => state.examFilter;
  App.examSelector = function (onChange) {
    const opts = [["core1", "Core 1"], ["core2", "Core 2"], ["both", "Both"]];
    const seg = h("div", { class: "seg" });
    for (const [v, label] of opts) {
      seg.appendChild(h("button", {
        class: state.examFilter === v ? "on" : "",
        onclick: () => { state.examFilter = v; App.save(); onChange && onChange(v); }
      }, label));
    }
    return seg;
  };
  App.inFilter = item => state.examFilter === "both" || item.exam === state.examFilter;

  // ---------- Router ----------
  let cleanups = [];
  App.onCleanup = fn => cleanups.push(fn);
  App.go = path => { location.hash = "#/" + path; };
  App.route = function () {
    cleanups.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } });
    cleanups = [];
    const parts = (location.hash.replace(/^#\/?/, "") || "dashboard").split("/");
    const name = parts[0];
    const view = App.views[name] || App.views.dashboard;
    document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("active", a.dataset.route === name));
    document.querySelector(".sidebar").classList.remove("open");
    const main = document.getElementById("main");
    main.innerHTML = "";
    view.render(main, parts.slice(1));
    window.scrollTo(0, 0);
    document.title = (view.title ? view.title + " · " : "") + "A+ Quest";
  };

  App.renderPlayer = function () {
    const box = document.getElementById("player");
    if (!box) return;
    const L = App.levelInfo();
    if (state.daily.date !== App.today()) state.daily = { date: App.today(), xp: 0 };
    box.innerHTML = "";
    box.append(
      h("div", { class: "lvl" }, h("span", null, `Level ${L.level}`), h("span", null, `${state.xp} XP`)),
      h("div", { class: "title" }, L.title),
      h("div", { class: "xpbar" }, h("div", { style: { width: L.pct + "%" } })),
      h("div", { class: "lvl" }, h("span", { class: "streak" }, `🔥 ${App.currentStreak()} day streak`), h("span", null, `${L.into}/${L.need}`))
    );
  };

  App.applyTheme = function () {
    document.documentElement.setAttribute("data-theme", state.theme);
  };

  return App;
})();
