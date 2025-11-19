const root = document.body;
const btn = document.getElementById('themeToggle');

const themes = ["light", "dark", "blue", "green"];
let currentIndex = 0;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('pref-theme', theme);
  btn.textContent = `Switch Theme (Current: ${theme})`;
}

// Load saved theme if available
const savedTheme = localStorage.getItem('pref-theme');
if (savedTheme && themes.includes(savedTheme)) {
  currentIndex = themes.indexOf(savedTheme);
  setTheme(savedTheme);
} else {
  setTheme(themes[currentIndex]);
}

// Cycle through themes on click
btn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[currentIndex]);
});