/* Terminal engine: virtual filesystem + interactive terminal widget.
   OS personalities (windows.js / linux.js) supply the commands. */
(function () {
  const { h } = App;

  // ---------------- Virtual filesystem ----------------
  // Spec format: { "dir": { "file.txt": "contents", "sub": {} }, "f": { __file: true, content, mode, owner } }
  function VFS(spec, { caseInsensitive = false } = {}) {
    this.ci = caseInsensitive;
    this.root = build("", spec);
  }
  function build(name, spec) {
    if (typeof spec === "string") return { type: "file", name, content: spec, mode: "rw-r--r--", owner: "student", group: "student" };
    if (spec && spec.__file) return Object.assign({ type: "file", name, mode: "rw-r--r--", owner: "student", group: "student", content: "" }, spec, { __file: undefined });
    const node = { type: "dir", name, children: {}, mode: (spec && spec.__mode) || "rwxr-xr-x", owner: (spec && spec.__owner) || "student", group: (spec && spec.__owner) || "student" };
    for (const [k, v] of Object.entries(spec || {})) if (!k.startsWith("__")) node.children[k] = build(k, v);
    return node;
  }
  VFS.prototype.child = function (dir, name) {
    if (!dir || dir.type !== "dir") return null;
    if (dir.children[name]) return dir.children[name];
    if (this.ci) {
      const k = Object.keys(dir.children).find(x => x.toLowerCase() === name.toLowerCase());
      return k ? dir.children[k] : null;
    }
    return null;
  };
  // Resolve a path (array of segments, may include "." and "..") relative to cwd (array).
  VFS.prototype.norm = function (cwd, segs, absolute) {
    const out = absolute ? [] : cwd.slice();
    for (const s of segs) {
      if (!s || s === ".") continue;
      if (s === "..") out.pop();
      else out.push(s);
    }
    return out;
  };
  VFS.prototype.get = function (abs) {
    let node = this.root;
    const real = [];
    for (const s of abs) {
      node = this.child(node, s);
      if (!node) return null;
      real.push(node.name);
    }
    return node;
  };
  VFS.prototype.realPath = function (abs) {
    let node = this.root;
    const real = [];
    for (const s of abs) { node = this.child(node, s); if (!node) return abs; real.push(node.name); }
    return real;
  };
  VFS.prototype.parentOf = function (abs) { return this.get(abs.slice(0, -1)); };
  VFS.prototype.mkdir = function (abs) {
    const parent = this.parentOf(abs);
    if (!parent || parent.type !== "dir") return false;
    const name = abs[abs.length - 1];
    if (this.child(parent, name)) return false;
    parent.children[name] = build(name, {});
    return true;
  };
  VFS.prototype.write = function (abs, content, append) {
    const parent = this.parentOf(abs);
    if (!parent || parent.type !== "dir") return false;
    const name = abs[abs.length - 1];
    const existing = this.child(parent, name);
    if (existing && existing.type === "dir") return false;
    if (existing) existing.content = append ? existing.content + content : content;
    else parent.children[name] = build(name, content);
    return true;
  };
  VFS.prototype.remove = function (abs) {
    const parent = this.parentOf(abs);
    const node = this.get(abs);
    if (!parent || !node) return false;
    delete parent.children[node.name];
    return true;
  };
  // Simple glob: * and ? within a single segment
  VFS.globToRe = function (pat, ci) {
    return new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", ci ? "i" : "");
  };
  VFS.prototype.walk = function (node, abs, fn) {
    fn(node, abs);
    if (node.type === "dir") for (const c of Object.values(node.children)) this.walk(c, abs.concat(c.name), fn);
  };
  App.VFS = VFS;

  // ---------------- Terminal widget ----------------
  // os: { name, cls, title, banner(world), prompt(world), exec(line, io, world) -> Promise, commands: [] }
  App.Terminal = function (container, os, world, { onCommand } = {}) {
    const out = h("div", { class: "term-out" });
    const promptEl = h("span", { class: "prompt" });
    const input = h("input", { type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Terminal input" });
    const line = h("div", { class: "term-line" }, promptEl, input);
    const bar = h("div", { class: "term-bar" },
      h("span", { class: "dot", style: { background: "#ff5f56" } }), h("span", { class: "dot", style: { background: "#ffbd2e" } }), h("span", { class: "dot", style: { background: "#27c93f" } }),
      h("span", { style: { marginLeft: "8px" } }, os.title));
    // Output and the live prompt share one scrolling screen, so the prompt follows the last line of output.
    const screen = h("div", { class: "term-screen" }, out, line);
    const el = h("div", { class: "terminal " + os.cls }, bar, screen);
    container.appendChild(el);
    el.addEventListener("click", () => { if (!window.getSelection().toString()) input.focus(); });
    const scroll = () => { screen.scrollTop = screen.scrollHeight; };

    const history = [];
    let hIdx = 0, busy = false, buffer = [];
    const io = {
      out(text = "", cls) {
        const s = String(text);
        buffer.push(s);
        const span = h("div", { class: cls || "" });
        // pre-wrap drops a trailing newline and empty divs collapse, so pad them to keep blank lines visible
        span.textContent = s === "" ? " " : s.endsWith("\n") ? s + "\n" : s;
        out.appendChild(span);
        scroll();
      },
      html(markup) { const d = h("div", { html: markup }); buffer.push(d.textContent); out.appendChild(d); scroll(); },
      clear() { out.innerHTML = ""; },
      sleep: ms => new Promise(r => setTimeout(r, ms)),
      setPromptOverride(p) { world.__prompt = p; },
      history
    };
    const term = { io, el, input, world, focus: () => input.focus(), run };

    function drawPrompt() {
      const p = world.__prompt || os.prompt(world);
      promptEl.innerHTML = "";
      if (Array.isArray(p)) p.forEach(([t, c]) => promptEl.appendChild(h("span", { class: c || "" }, t)));
      else promptEl.textContent = p;
    }

    async function run(cmdLine, echo = true) {
      if (echo) {
        const pl = h("div");
        const p = world.__prompt || os.prompt(world);
        if (Array.isArray(p)) p.forEach(([t, c]) => pl.appendChild(h("span", { class: c || "" }, t)));
        else pl.appendChild(document.createTextNode(p));
        pl.appendChild(document.createTextNode(cmdLine));
        out.appendChild(pl);
      }
      if (cmdLine.trim()) { history.push(cmdLine); }
      hIdx = history.length;
      busy = true;
      line.style.display = "none";
      buffer = [];
      try {
        await os.exec(cmdLine, io, world);
      } catch (e) {
        io.out("Simulator error: " + e.message, "t-err");
        console.error(e);
      }
      // cmd.exe prints a blank line between a command's output and the next prompt
      if (os.blankAfter && cmdLine.trim() && out.lastChild && out.lastChild.textContent.trim()) io.out("");
      busy = false;
      line.style.display = "";
      drawPrompt();
      scroll();
      input.focus();
      if (onCommand && cmdLine.trim()) onCommand(cmdLine.trim(), buffer.join("\n"));
    }

    input.addEventListener("keydown", e => {
      if (busy) { e.preventDefault(); return; }
      if (e.key === "Enter") {
        const v = input.value;
        input.value = "";
        run(v);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hIdx > 0) { hIdx--; input.value = history[hIdx]; }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; } else { hIdx = history.length; input.value = ""; }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const v = input.value;
        const parts = v.split(" ");
        const last = parts[parts.length - 1];
        let candidates;
        if (parts.length === 1) candidates = os.commands.filter(c => c.startsWith(last.toLowerCase()));
        else candidates = (os.complete ? os.complete(world, last) : []);
        if (candidates.length === 1) { parts[parts.length - 1] = candidates[0]; input.value = parts.join(" ") + (parts.length === 1 ? " " : ""); }
        else if (candidates.length > 1) io.out(candidates.join("  "), "t-dim");
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault(); io.clear();
      } else if (e.key === "c" && e.ctrlKey) {
        io.out(((world.__prompt || "") + input.value) + "^C"); input.value = "";
      }
    });

    if (os.banner) os.banner(world).forEach(([t, c]) => io.out(t, c));
    drawPrompt();
    setTimeout(() => input.focus(), 50);
    return term;
  };

  // Tokenize a command line respecting quotes.
  App.tokenize = function (line) {
    const out = [];
    let cur = "", q = null, has = false;
    for (const ch of line) {
      if (q) { if (ch === q) q = null; else cur += ch; continue; }
      if (ch === '"' || ch === "'") { q = ch; has = true; continue; }
      if (/\s/.test(ch)) { if (cur || has) { out.push(cur); cur = ""; has = false; } continue; }
      cur += ch;
    }
    if (cur || has) out.push(cur);
    return out;
  };

  // Fake but plausible ping/latency helpers
  App.rand = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
})();
