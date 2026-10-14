document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------
     DARK MODE SYSTEM
  --------------------------- */

  const toggleButton = document.querySelector("#dark-mode-toggle");
  const body = document.body;

  if (toggleButton) {

    const currentMode = localStorage.getItem("theme") || "light";

    if (currentMode === "dark") {
      body.classList.add("dark-mode");
      toggleButton.textContent = "☀️ Toggle Light Mode";
    } else {
      toggleButton.textContent = "🌙 Toggle Dark Mode";
    }

    toggleButton.addEventListener("click", function () {

      body.classList.toggle("dark-mode");

      const isDarkMode = body.classList.contains("dark-mode");

      if (isDarkMode) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️ Toggle Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙 Toggle Dark Mode";
      }

    });

  }

  /* ---------------------------
     MOBILE NAV MENU
  --------------------------- */

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function () {
      navMenu.classList.toggle("nav-open");
    });
  }

  /* ---------------------------
     AMBIENT PANEL UI ONLY
     (ENGINE NOW HANDLES AUDIO)
  --------------------------- */

  const ambientOpen = document.getElementById("ambientOpen");
  const ambientPanel = document.getElementById("ambientPanel");
  const ambientClose = document.getElementById("ambientClose");

  if (ambientOpen && ambientPanel) {
    ambientOpen.addEventListener("click", () => {
      ambientPanel.classList.add("ambient-visible");
    });

    if (ambientClose) {
      ambientClose.addEventListener("click", () => {
        ambientPanel.classList.remove("ambient-visible");
      });
    }
  }

});