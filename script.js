const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

// Checking for saved / system preference
const currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
if (currentTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}
// Toggle and save
themeBtn.onclick = () => {
  let targetTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};
// Update Icon
themeBtn.innerHTML = targetTheme === "dark" ? "🌙" : "💡";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".eyebrow").classList.add("loaded");
});
