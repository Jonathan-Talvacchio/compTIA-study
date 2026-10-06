(function () {
  const { h } = App;

  // Registry entries are added by js/games/*.js: App.games[id] = { name, icon, desc, tag, run(root) }
  App.views.games = {
    title: "Arcade",
    render(root, params) {
      const id = params[0];
      if (id && App.games[id]) {
        const g = App.games[id];
        root.append(h("div", { class: "row" },
          h("button", { class: "btn sm ghost", onclick: () => App.go("games") }, "← Arcade"),
          h("h1", { style: { margin: 0 } }, `${g.icon} ${g.name}`)));
        const stage = h("div", { class: "mt" });
        root.appendChild(stage);
        g.run(stage, params.slice(1));
        return;
      }
      root.append(h("h1", null, "🕹️ Arcade"), h("p", { class: "sub" }, "Short, replayable games that drill the facts CompTIA loves to test."));
      const grid = h("div", { class: "grid cols-3" });
      for (const [gid, g] of Object.entries(App.games)) {
        const best = g.bestLabel ? g.bestLabel(App.state.bests) : null;
        grid.appendChild(h("button", { class: "card click", onclick: () => App.go("games/" + gid) },
          h("span", { class: "emoji" }, g.icon), h("h3", null, g.name),
          h("div", null, g.tags.map(t => h("span", { class: "tag" }, t))),
          h("p", null, g.desc),
          best ? h("p", { style: { color: "var(--warn)" } }, "🏆 " + best) : null));
      }
      root.appendChild(grid);
    }
  };

  // Shared helper for game end screens.
  App.gameOver = function (stage, { title, lines = [], xp = 0, perfect = false, again }) {
    App.bump("gamesPlayed");
    if (perfect) App.bump("perfectGames");
    App.addXP(xp, title);
    if (perfect) App.confetti();
    stage.innerHTML = "";
    stage.appendChild(h("div", { class: "card center" },
      h("div", { class: "result-big " + (perfect ? "pass" : "") }, perfect ? "✨ Perfect!" : "🏁 Done"),
      lines.map(l => h("p", null, l)),
      h("p", { class: "muted" }, `+${xp} XP`),
      h("div", { class: "row", style: { justifyContent: "center" } },
        h("button", { class: "btn primary", onclick: again }, "Play again"),
        h("button", { class: "btn ghost", onclick: () => App.go("games") }, "Arcade"))));
  };
})();
