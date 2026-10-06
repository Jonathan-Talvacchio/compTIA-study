(function () {
  const { h } = App;

  App.views.terminal = {
    title: "Terminal Lab",
    render(root, params) {
      const [kind, id] = params;
      if (kind === "free") return freePlay(root, id === "linux" ? "linux" : "windows");
      if (kind === "mission") { const m = App.missions.find(x => x.id === id); if (m) return mission(root, m); }
      menu(root);
    }
  };

  function menu(root) {
    root.append(h("h1", null, "💻 Terminal Lab"),
      h("p", { class: "sub" }, "Hands-on command-line practice. Solve real help-desk scenarios in a simulated Windows Command Prompt and Linux shell — the exam expects you to know what these commands do and when to use them."));
    root.append(h("div", { class: "grid cols-2" },
      h("button", { class: "card click", onclick: () => App.go("terminal/free/windows") }, h("span", { class: "emoji" }, "🪟"), h("h3", null, "Free Play: Windows CMD"), h("p", null, "ipconfig, ping, tracert, nslookup, netstat, net, gpupdate, gpresult, sfc, chkdsk, diskpart, robocopy, tasklist/taskkill and more.")),
      h("button", { class: "card click", onclick: () => App.go("terminal/free/linux") }, h("span", { class: "emoji" }, "🐧"), h("h3", null, "Free Play: Linux bash"), h("p", null, "ls, cd, grep, find, chmod, chown, sudo, apt, ps, top, kill, df, du, ip, dig, curl, man — with pipes and redirects."))));
    for (const os of ["windows", "linux"]) {
      root.appendChild(h("h2", null, os === "windows" ? "🪟 Windows missions" : "🐧 Linux missions"));
      const grid = h("div", { class: "grid cols-3" });
      App.missions.filter(m => m.os === os).forEach(m => {
        const done = App.state.missionsDone[m.id];
        grid.appendChild(h("button", { class: "card click", onclick: () => App.go("terminal/mission/" + m.id) },
          h("div", null, h("span", { class: "tag" }, m.difficulty), h("span", { class: "tag" }, m.objective), done ? h("span", { class: "tag", style: { color: "var(--good)" } }, "✔ complete") : null),
          h("h3", { class: "mt" }, m.title), h("p", null, m.story)));
      });
      root.appendChild(grid);
    }
  }

  function freePlay(root, os) {
    const world = os === "windows" ? App.defaultWindowsWorld() : App.defaultLinuxWorld();
    const OS = os === "windows" ? App.WindowsOS : App.LinuxOS;
    root.append(
      h("div", { class: "row" }, h("button", { class: "btn sm ghost", onclick: () => App.go("terminal") }, "← Terminal Lab"),
        h("h1", { style: { margin: 0 } }, os === "windows" ? "🪟 Windows Command Prompt" : "🐧 Linux bash")),
      h("p", { class: "sub mt" }, "Sandbox mode — nothing you do here can break anything. Every new command you try earns XP."));
    const layout = h("div", { class: "term-layout" });
    const termBox = h("div");
    const side = h("div", { class: "card" });
    layout.append(termBox, side);
    root.appendChild(layout);
    const tried = new Set();
    const ideas = os === "windows"
      ? ["ipconfig /all", "ping -n 2 comptia.org", "tracert google.com", "nslookup comptia.org", "netstat -ano", "tasklist", "net user", "net localgroup administrators", "gpresult /r", "sfc /scannow", "chkdsk", "diskpart → list disk", "dir /?", "tree /f", "robocopy Documents C:\\Backup /E", "tasklist | findstr svchost", "whoami /groups", "systeminfo"]
      : ["ls -la", "pwd", "cat /etc/passwd", "sudo cat /etc/shadow", "grep -i error /var/log/syslog", "find /etc -name \"*.conf\"", "chmod 755 scripts/hello.sh", "ps aux | grep nginx", "top", "df -h", "du -sh /var/log/*", "ip addr", "dig comptia.org MX", "curl -I https://comptia.org", "sudo apt update", "man chmod", "echo hi > test.txt && cat test.txt"];
    side.append(h("h3", null, "Things to try"), h("p", null, "Click to type it in:"),
      h("div", { style: { display: "grid", gap: "6px", marginTop: "10px" } }, ideas.map(cmd => h("button", { class: "btn sm ghost", style: { justifyContent: "flex-start", fontFamily: "var(--mono)" }, onclick: () => { term.input.value = cmd.replace(/ → .*/, ""); term.focus(); } }, cmd))),
      h("p", { class: "mt muted" }, "Tips: ↑/↓ history · Tab completes · Ctrl+L clears"));
    const term = App.Terminal(termBox, OS, world, {
      onCommand(line) {
        let toks = App.tokenize(line); if (toks[0] === "sudo") toks = toks.slice(1);
        const c = (toks[0] || "").toLowerCase();
        if (c && !tried.has(c) && OS.commands.includes(c)) { tried.add(c); App.addXP(3); }
      }
    });
  }

  function mission(root, m) {
    const world = m.os === "windows" ? App.defaultWindowsWorld() : App.defaultLinuxWorld();
    m.setup(world);
    const OS = m.os === "windows" ? App.WindowsOS : App.LinuxOS;
    const done = new Set();
    let hintsUsed = 0;
    root.append(
      h("div", { class: "row" }, h("button", { class: "btn sm ghost", onclick: () => App.go("terminal") }, "← Terminal Lab"),
        h("h1", { style: { margin: 0 } }, m.title)),
      h("div", { class: "card mt" }, h("div", null, h("span", { class: "tag" }, m.difficulty), h("span", { class: "tag" }, m.objective)), h("p", { style: { color: "var(--text)", marginTop: "8px" } }, "🎫 Ticket: " + m.story)));
    const layout = h("div", { class: "term-layout mt" });
    const termBox = h("div");
    const side = h("div", { class: "card" });
    layout.append(termBox, side);
    root.appendChild(layout);
    const list = h("ul", { class: "objectives" });
    const status = h("div", { class: "mt" });
    side.append(h("h3", null, "Objectives"), h("p", { class: "muted", style: { fontSize: ".85rem" } }, "Complete in any order. Hints cost XP."), list, status);
    drawObjectives();

    App.Terminal(termBox, OS, world, {
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
        const li = h("li", { class: done.has(i) ? "done" : "" }, h("span", { class: "chk" }, done.has(i) ? "✅" : "⬜"),
          h("div", null, h("div", { class: "txt" }, o.text),
            !done.has(i) ? hintBtn(o) : null));
        list.appendChild(li);
      });
    }
    function hintBtn(o) {
      const box = h("div");
      const b = h("button", { class: "btn sm ghost", style: { padding: "2px 8px", marginTop: "4px", fontSize: ".78rem" }, onclick: () => { hintsUsed++; box.innerHTML = ""; box.appendChild(h("code", null, o.hint)); } }, "💡 hint");
      box.appendChild(b);
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
