(function () {
  App.applyTheme();
  App.renderPlayer();
  document.getElementById("themeBtn").addEventListener("click", () => {
    App.state.theme = App.state.theme === "dark" ? "light" : "dark";
    App.applyTheme();
    App.save();
  });
  document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });
  window.addEventListener("hashchange", App.route);
  App.route();
})();
