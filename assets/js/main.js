document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector("#toggle-dark-mode");
  const currentMode = localStorage.getItem("theme") || "light";

  if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Toggle Light Mode";
  } else {
    toggleButton.textContent = "🌙 Toggle Dark Mode";
  }

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      toggleButton.textContent = "☀️ Toggle Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      toggleButton.textContent = "🌙 Toggle Dark Mode";
    }
  });
});
