function updateThemeButton() {
  const btn = document.getElementById("toggle-theme");
  if (!btn) return;

  const isDark = document.body.classList.contains("dark");

  btn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
}

export function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeButton(); // 👈 sincroniza botão no load
}

export function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  updateThemeButton(); // 👈 atualiza botão após toggle
}
