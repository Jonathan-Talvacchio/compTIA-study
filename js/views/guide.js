/* Study Guide: topic matching, the "Learn more" panel and the Study Guide pages. */
(function () {
  const { h } = App;

  // ---------------- Topic matching ----------------
  // Short plain keywords match whole words; longer or punctuated ones match as substrings.
  const matchers = new Map();
  function topicMatcher(t) {
    if (!matchers.has(t.id)) {
      matchers.set(t.id, t.keywords.map(k => {
        const kw = k.toLowerCase();
        if (/^[a-z0-9]+$/.test(kw) && kw.length <= 5) {
          const re = new RegExp(`\\b${kw}\\b`);
          return { test: s => re.test(s), weight: 1 };
        }
        return { test: s => s.includes(kw), weight: kw.includes(" ") ? 2 : 1.5 };
      }));
    }
    return matchers.get(t.id);
  }
  function scoreTopics(exam, text) {
    const s = text.toLowerCase();
    return (DATA.topics || []).filter(t => t.exam === exam)
      .map(t => ({ t, score: topicMatcher(t).reduce((sum, m) => sum + (m.test(s) ? m.weight : 0), 0) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score);
  }
  function questionText(q) {
    return [q.q, ...q.answer.map(a => q.choices[a]), q.explanation].join(" ");
  }
  const qCache = {};
  App.topicsForQuestion = function (q) {
    const base = q._orig || q;
    if (!qCache[base.id]) {
      let m = scoreTopics(base.exam, questionText(base));
      const forced = (DATA.topicOverrides || {})[base.id] && App.topicById(DATA.topicOverrides[base.id]);
      if (forced) m = [{ t: forced, score: Infinity }].concat(m.filter(x => x.t.id !== forced.id));
      qCache[base.id] = m;
    }
    return qCache[base.id];
  };
  App.topicById = id => (DATA.topics || []).find(t => t.id === id);
  App.questionsForTopic = function (id) {
    const t = App.topicById(id);
    if (!t) return [];
    return App.allQuestions(t.exam).filter(q => { const m = App.topicsForQuestion(q); return m.length && m[0].t.id === id; });
  };
  App.cardsForTopic = function (t, n = 6) {
    return (DATA.flashcards || []).filter(c => c.exam === t.exam)
      .map(c => ({ c, score: topicMatcher(t).reduce((s, m) => s + (m.test((c.front + " " + c.back).toLowerCase()) ? m.weight : 0), 0) }))
      .filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, n).map(x => x.c);
  };
  App.topicForCard = function (c) {
    const m = scoreTopics(c.exam, c.front + " " + c.back);
    return m.length ? m[0].t : null;
  };
  App.topicMastery = function (id) {
    const qs = App.questionsForTopic(id);
    let seen = 0, score = 0, missed = 0;
    for (const q of qs) {
      const s = App.state.qstats[q.id];
      if (!s) continue;
      seen++;
      if (s.last === false) missed++;
      score += s.last ? (s.correct / s.seen) * .6 + .4 : (s.correct / s.seen) * .5;
    }
    return { total: qs.length, seen, missed, pct: qs.length ? Math.round((score / qs.length) * 100) : 0 };
  };
  // Topics with the most questions you got wrong on your latest attempt.
  App.weakTopics = function (n = 5) {
    return (DATA.topics || []).filter(App.inFilter).map(t => ({ t, m: App.topicMastery(t.id) }))
      .filter(x => x.m.missed > 0).sort((a, b) => b.m.missed - a.m.missed || a.m.pct - b.m.pct).slice(0, n);
  };

  // ---------------- Trusted links ----------------
  function topicLinks(t) {
    const course = DATA.topicCourses[t.exam];
    const links = [];
    if (t.video) links.push({ label: `▶ Professor Messer video: ${t.title} (${DATA.exams[t.exam].code} ${t.obj})`, url: course.video + t.video + "/", kind: "video" });
    links.push(...t.docs.map(d => Object.assign({ kind: d.url.includes("professormesser") ? "video" : "doc" }, d)));
    links.push({ label: course.label, url: course.url, kind: "course" });
    return links;
  }
  function commandLinks(text) {
    const s = text.toLowerCase();
    return Object.entries(DATA.commandDocs || {}).filter(([cmd]) => new RegExp(`\\b${cmd}\\b`).test(s)).map(([, d]) => Object.assign({ kind: "doc" }, d));
  }
  function linkList(links) {
    const seen = new Set();
    return h("ul", { class: "res-list" }, links.filter(l => !seen.has(l.url) && seen.add(l.url)).map(l =>
      h("li", null, h("span", { class: "res-ico" }, l.kind === "video" ? "🎬" : l.kind === "doc" ? "📄" : "🎓"),
        h("a", { href: l.url, target: "_blank", rel: "noopener" }, l.label))));
  }
  const OFFICIAL = { label: "CompTIA: official A+ exam objectives (free download)", url: "https://www.comptia.org/", kind: "course" };

  function cardList(cards) {
    return h("div", { class: "rel-cards" }, cards.map(c => h("details", { class: "rel-card" },
      h("summary", null, c.front), h("div", null, c.back, c.hint ? h("div", { class: "hint-line" }, "💡 " + c.hint) : null))));
  }
  function notesList(t) { return h("ul", { class: "notes" }, t.notes.map(n => h("li", null, n))); }

  // ---------------- Learn-more panel ----------------
  let openModal = null;
  function closeModal() { if (openModal) { openModal.remove(); openModal = null; document.removeEventListener("keydown", escClose); } }
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  App.closeLearnMore = closeModal;
  App.openLearnMore = function (q) {
    closeModal();
    const base = q._orig || q;
    const matches = App.topicsForQuestion(base);
    const primary = matches[0] && matches[0].t;
    const top = matches[0] && (matches[0].score === Infinity ? (matches[1] ? matches[1].score : 0) : matches[0].score);
    const secondary = matches[1] && matches[1].score >= top * 0.75 ? matches[1].t : null;
    const ex = DATA.exams[base.exam];
    const body = h("div", { class: "modal-body" });
    body.append(
      h("div", { class: "row" }, h("span", { class: "tag " + (base.exam === "core1" ? "c1" : "c2") }, ex.code), h("span", { class: "tag" }, `${ex.domains[base.domain].icon} ${ex.domains[base.domain].name}`)),
      h("p", { class: "mt", style: { fontWeight: 600 } }, base.q),
      h("div", { class: "explain good" }, h("strong", null, "Answer: "), base.answer.map(a => base.choices[a]).join(" + "), h("div", { class: "mt" }, base.explanation)));

    if (primary) {
      body.append(h("h3", { class: "mt" }, `📝 Study notes: ${primary.title} `, h("span", { class: "tag" }, `Objective ${primary.obj}`)), notesList(primary));
      if (secondary) body.append(h("p", { class: "muted", style: { fontSize: ".85rem" } }, "Also related: ", h("a", { href: "#/guide/" + secondary.id, onclick: closeModal }, secondary.title)));
      const n = App.questionsForTopic(primary.id).length;
      body.append(h("div", { class: "row mt" },
        h("button", { class: "btn sm primary", onclick: () => { closeModal(); App.go("guide/" + primary.id); } }, "Open in Study Guide"),
        n > 1 ? h("button", { class: "btn sm", onclick: () => { closeModal(); App.go("quiz/topic/" + primary.id); } }, `Practice this topic (${n} questions)`) : null));
    }
    const links = (primary ? topicLinks(primary) : [DATA.topicCourses[base.exam]]).concat(commandLinks(questionText(base)), secondary ? topicLinks(secondary).filter(l => l.kind === "video") : [], [OFFICIAL]);
    body.append(h("h3", { class: "mt" }, "🔗 Learn it from a trusted source"), linkList(links),
      h("p", { class: "muted", style: { fontSize: ".8rem" } }, "Professor Messer's A+ videos are free and organized by exam objective. Official command documentation comes from Microsoft and the Linux man pages."));
    if (primary) {
      const cards = App.cardsForTopic(primary, 4);
      if (cards.length) body.append(h("h3", { class: "mt" }, "🃏 Related flashcards"), h("p", { class: "muted", style: { fontSize: ".85rem", marginTop: 0 } }, "Try to answer before you open each one."), cardList(cards));
    }
    const modal = h("div", { class: "modal-backdrop", onclick: e => { if (e.target === modal) closeModal(); } },
      h("div", { class: "modal", role: "dialog", "aria-modal": "true", "aria-label": "Learn more" },
        h("div", { class: "modal-head" }, h("h2", { style: { margin: 0 } }, "📖 Learn more"), h("button", { class: "btn sm ghost", onclick: closeModal, "aria-label": "Close" }, "✕")),
        body));
    document.body.appendChild(modal);
    document.addEventListener("keydown", escClose);
    openModal = modal;
  };
  App.learnMoreButton = q => h("button", { class: "btn sm learn-btn", onclick: e => { e.stopPropagation(); App.openLearnMore(q); } }, "📖 Learn more");

  // ---------------- Study Guide pages ----------------
  App.views.guide = {
    title: "Study Guide",
    render(root, params) {
      App.onCleanup(closeModal);
      if (params[0]) { const t = App.topicById(params[0]); if (t) return topicPage(root, t); }
      listPage(root);
    }
  };

  function listPage(root) {
    root.append(h("h1", null, "📖 Study Guide"),
      h("p", { class: "sub" }, "Short study notes for every exam objective area, with links to the matching free Professor Messer video and official documentation. Open a topic to read, watch, review its flashcards, and practice its questions."));
    const search = h("input", { type: "text", class: "ref-search", placeholder: "🔎 Search topics (e.g. DHCP, RAID, phishing, chmod)…" });
    const body = h("div");
    root.append(h("div", { class: "row" }, App.examSelector(() => App.route())), h("div", { class: "mt" }, search), body);
    search.addEventListener("input", draw);
    draw();

    function draw() {
      const q = search.value.trim().toLowerCase();
      body.innerHTML = "";
      if (!q) {
        const weak = App.weakTopics(5);
        body.appendChild(h("div", { class: "card mt" }, h("h3", null, "🎯 Recommended for you"),
          weak.length ? h("p", { class: "muted", style: { marginTop: 0 } }, "Topics where you missed questions on your latest attempt:") : h("p", { class: "muted" }, "Answer some practice questions and the topics you miss will show up here."),
          weak.length ? h("div", { class: "grid cols-3 mt" }, weak.map(({ t, m }) => topicCard(t, m))) : null));
      }
      for (const exam of ["core1", "core2"]) {
        if (App.state.examFilter !== "both" && App.state.examFilter !== exam) continue;
        const ex = DATA.exams[exam];
        for (const [d, info] of Object.entries(ex.domains)) {
          const topics = DATA.topics.filter(t => t.exam === exam && t.domain === d && (!q || (t.title + " " + t.keywords.join(" ") + " " + t.notes.join(" ")).toLowerCase().includes(q)));
          if (!topics.length) continue;
          body.appendChild(h("h2", null, `${info.icon} ${ex.code} · ${d}.0 ${info.name}`));
          body.appendChild(h("div", { class: "grid cols-3" }, topics.map(t => topicCard(t, App.topicMastery(t.id)))));
        }
      }
      if (!body.querySelector(".card.click")) body.appendChild(h("div", { class: "card empty mt" }, "No topics match that search."));
    }
  }
  function topicCard(t, m) {
    const reviewed = (App.state.topicsReviewed || {})[t.id];
    return h("button", { class: "card click", onclick: () => App.go("guide/" + t.id) },
      h("div", null, h("span", { class: "tag " + (t.exam === "core1" ? "c1" : "c2") }, `${t.obj}`), reviewed ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ reviewed") : null,
        m.missed ? h("span", { class: "tag", style: { color: "var(--bad)" } }, `${m.missed} missed`) : null),
      h("h3", { class: "mt" }, t.title),
      h("p", null, `${m.total} practice question${m.total === 1 ? "" : "s"}${m.seen ? ` · ${m.pct}% mastery` : ""}`),
      m.seen ? h("div", { class: "progress mt " + (m.pct >= 70 ? "" : m.pct >= 40 ? "warn" : "bad") }, h("div", { style: { width: m.pct + "%" } })) : null);
  }

  function topicPage(root, t) {
    const ex = DATA.exams[t.exam];
    const m = App.topicMastery(t.id);
    const qs = App.questionsForTopic(t.id);
    const missed = qs.filter(q => App.state.qstats[q.id] && App.state.qstats[q.id].last === false);
    const cards = App.cardsForTopic(t, 8);
    root.append(
      h("div", { class: "row" }, h("button", { class: "btn sm ghost", onclick: () => App.go("guide") }, "← Study Guide"), h("h1", { style: { margin: 0 } }, t.title)),
      h("p", { class: "sub mt" }, `${ex.name} (${ex.code}) · ${ex.domains[t.domain] ? ex.domains[t.domain].name : ""} · Objective ${t.obj}`));
    const reviewBtn = h("button", { class: "btn sm", onclick: () => {
      App.state.topicsReviewed = App.state.topicsReviewed || {};
      const first = !App.state.topicsReviewed[t.id];
      App.state.topicsReviewed[t.id] = App.today();
      App.save();
      if (first) App.addXP(5, "Topic reviewed");
      reviewBtn.textContent = "✔ Reviewed"; reviewBtn.disabled = true;
    } }, (App.state.topicsReviewed || {})[t.id] ? "✔ Reviewed" : "Mark as reviewed");
    if ((App.state.topicsReviewed || {})[t.id]) reviewBtn.disabled = true;

    root.append(h("div", { class: "grid cols-2" },
      h("div", { class: "card" }, h("h3", null, "📝 Study notes"), notesList(t),
        h("div", { class: "row mt" },
          qs.length ? h("button", { class: "btn primary sm", onclick: () => App.go("quiz/topic/" + t.id) }, `Practice ${Math.min(qs.length, 15)} questions`) : null,
          reviewBtn)),
      h("div", { class: "card" }, h("h3", null, "🔗 Watch & read"), linkList(topicLinks(t).concat([OFFICIAL])),
        m.seen ? h("div", { class: "mt" }, h("div", { class: "muted", style: { fontSize: ".85rem" } }, `Your mastery: ${m.pct}% (${m.seen}/${m.total} questions attempted)`),
          h("div", { class: "progress mt " + (m.pct >= 70 ? "" : m.pct >= 40 ? "warn" : "bad") }, h("div", { style: { width: m.pct + "%" } }))) : null)));
    if (cards.length) root.append(h("h2", null, "🃏 Related flashcards"), h("p", { class: "muted", style: { marginTop: "-6px" } }, "Answer in your head, then open the card to check."), cardList(cards));
    if (missed.length) {
      root.append(h("h2", null, "❌ Questions you missed on this topic"));
      missed.forEach(q => root.appendChild(h("div", { class: "explain bad", style: { marginBottom: "10px" } },
        h("strong", null, q.q), h("div", { class: "mt" }, "✔ ", q.answer.map(a => q.choices[a]).join(" + ")), h("div", { class: "muted mt" }, q.explanation))));
    }
  }
})();
