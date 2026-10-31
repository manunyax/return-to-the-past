const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

function setTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  toggle.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
}

setTheme(savedTheme === 'dark');

toggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setTheme(isDark);
});
