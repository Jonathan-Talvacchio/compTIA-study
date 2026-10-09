(function () {
  const { h } = App;

  // Small link from the back of a card to its Study Guide topic.
  function guideLink(c) {
    const t = App.topicForCard && App.topicForCard(c);
    if (!t) return null;
    return h("a", { class: "card-guide", href: "#/guide/" + t.id, onclick: e => e.stopPropagation() }, `📖 Study guide: ${t.title}`);
  }

  App.views.flashcards = {
    title: "Flashcards",
    render(root) {
      let domain = "all";
      root.append(h("h1", null, "🃏 Flashcards"),
        h("p", { class: "sub" }, "Active recall + spaced repetition. Rate yourself honestly — cards you struggle with come back sooner."));
      const body = h("div");
      root.appendChild(body);
      draw();

      function deck() {
        return (DATA.flashcards || []).filter(c => App.inFilter(c) && (domain === "all" || `${c.exam}:${c.domain}` === domain));
      }
      function draw() {
        body.innerHTML = "";
        const d = deck();
        const due = App.cardsDue(d), fresh = App.cardsNew(d), learned = App.cardsLearned(d);
        const sel = h("select", { onchange: e => { domain = e.target.value; draw(); } }, h("option", { value: "all" }, "All domains"));
        for (const ex of ["core1", "core2"]) {
          if (App.state.examFilter !== "both" && App.state.examFilter !== ex) continue;
          for (const [k, info] of Object.entries(DATA.exams[ex].domains)) {
            const o = h("option", { value: `${ex}:${k}` }, `${DATA.exams[ex].name} · ${k}.0 ${info.name}`);
            if (domain === `${ex}:${k}`) o.selected = true;
            sel.appendChild(o);
          }
        }
        body.append(
          h("div", { class: "row" }, App.examSelector(() => { domain = "all"; draw(); }), sel),
          h("div", { class: "grid cols-4 mt" },
            stat(d.length, "Cards in deck"), stat(due.length, "Due now"), stat(fresh.length, "New"), stat(learned.length, "Mastered (21d+)")),
          h("div", { class: "grid cols-3 mt" },
            mode("🔁", "Smart Review", `${due.length} due + up to 15 new cards. The best daily habit.`, () => session(App.shuffle(due).concat(App.shuffle(fresh).slice(0, 15)), true)),
            mode("🔥", "Cram Mode", "Every card in this deck, shuffled. Great the night before.", () => session(App.shuffle(d), true)),
            mode("⌨️", "Type It", "See the prompt, type the answer, then compare. Harder = stickier.", () => session(App.shuffle(due.length ? due : d).slice(0, 20), true, true))
          )
        );
      }
      function stat(n, l) { return h("div", { class: "card stat" }, h("div", { class: "num" }, n), h("div", { class: "lbl" }, l)); }
      function mode(ico, t, p, fn) { return h("button", { class: "card click", onclick: fn }, h("span", { class: "emoji" }, ico), h("h3", null, t), h("p", null, p)); }

      function session(cards, schedule, typeIt) {
        if (!cards.length) return App.toast("No cards here right now — try Cram Mode or another domain.");
        body.innerHTML = "";
        let i = 0, xp = 0, again = [];
        const hud = h("div", { class: "game-hud" });
        const stage = h("div");
        body.append(hud, stage);
        const keys = e => {
          if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
          if (e.key === " ") { e.preventDefault(); const f = stage.querySelector(".flashcard"); f && f.click(); }
          if ("1234".includes(e.key)) { const b = stage.querySelectorAll(".rate .btn")[+e.key - 1]; b && b.click(); }
        };
        document.addEventListener("keydown", keys);
        App.onCleanup(() => document.removeEventListener("keydown", keys));
        show();

        function show() {
          if (i >= cards.length) {
            if (again.length) { cards = cards.concat(again); again = []; }
            else return done();
          }
          const c = cards[i];
          hud.innerHTML = "";
          hud.append(h("span", { class: "hud-item" }, `Card ${i + 1}/${cards.length}`), h("span", { class: "hud-item" }, `⭐ ${xp} XP`),
            h("div", { class: "spacer" }), h("button", { class: "btn sm ghost", onclick: done }, "End session"));
          stage.innerHTML = "";
          const ex = DATA.exams[c.exam];
          const fc = h("div", { class: "flashcard" },
            h("div", { class: "face front" },
              h("span", { class: "corner tag " + (c.exam === "core1" ? "c1" : "c2") }, `${ex.code} · ${ex.domains[c.domain].name}`),
              h("div", { class: "big" }, c.front),
              h("div", { class: "muted mt" }, typeIt ? "" : "Click or press Space to flip")),
            h("div", { class: "face back" },
              h("div", { style: { fontSize: "1.15rem", fontWeight: 600 } }, c.back),
              c.hint ? h("div", { class: "hint" }, "💡 " + c.hint) : null,
              guideLink(c)));
          const flashStage = h("div", { class: "flash-stage" }, fc);
          stage.appendChild(flashStage);
          const rate = h("div", { class: "rate", style: { visibility: "hidden" } });
          const labels = [["Again", "<1 min"], ["Hard", "soon"], ["Good", "later"], ["Easy", "much later"]];
          labels.forEach(([l, s], r) => rate.appendChild(h("button", {
            class: "btn" + (r === 2 ? " primary" : ""), onclick: () => {
              if (schedule) App.rateCard(c.id, r);
              if (r === 0) again.push(c);
              xp += [1, 3, 5, 6][r];
              i++; show();
            }
          }, `${r + 1}. ${l}`, h("small", null, s))));

          if (typeIt) {
            const inp = h("input", { type: "text", placeholder: "Type your answer, then Enter", style: { width: "100%" } });
            const form = h("form", { class: "mt", style: { maxWidth: "640px", margin: "16px auto 0" }, onsubmit: e => { e.preventDefault(); reveal(); } }, inp);
            stage.appendChild(form);
            setTimeout(() => inp.focus(), 50);
            function reveal() {
              fc.classList.add("flipped");
              form.replaceWith(h("div", { class: "explain", style: { maxWidth: "640px", margin: "16px auto 0" } }, h("strong", null, "You wrote: "), inp.value || "(blank)", h("div", { class: "muted" }, "Compare with the card and rate yourself.")));
              rate.style.visibility = "visible";
            }
          } else {
            fc.addEventListener("click", () => { fc.classList.toggle("flipped"); rate.style.visibility = "visible"; });
          }
          stage.appendChild(rate);
        }
        function done() {
          App.addXP(xp, "Flashcards");
          body.innerHTML = "";
          body.append(h("div", { class: "card center" },
            h("div", { class: "result-big pass" }, "🎉"),
            h("h2", null, `Session complete — ${Math.min(i, cards.length)} cards reviewed`),
            h("p", { class: "muted" }, `+${xp} XP. Come back tomorrow: spaced repetition works best a little every day.`),
            h("button", { class: "btn primary mt", onclick: draw }, "Back to deck")));
        }
      }
    }
  };
})();
