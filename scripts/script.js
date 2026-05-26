const storageKey = 'theme';
const themeClassPrefix = 'theme-';

function getStoredTheme() {
  return localStorage.getItem(storageKey);
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function setTheme(theme) {
  const html = document.documentElement;
  html.classList.remove('theme-light', 'theme-dark', 'theme-auto');
  html.classList.add(`${themeClassPrefix}${theme}`);
  localStorage.setItem(storageKey, theme);
}

function setActiveButton(buttons, theme) {
  buttons.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.disabled = false;
  });

  const target = buttons.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );

  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.disabled = true;
  }
}

function initTheme() {
  const storedTheme = getStoredTheme() || 'auto';
  setTheme(storedTheme);
}

function handleAutoThemeChange(event) {
  const storedTheme = getStoredTheme();

  if (storedTheme !== 'auto') {
    return;
  }

  document.documentElement.classList.remove('theme-light', 'theme-dark');
  document.documentElement.classList.add('theme-auto');
  document.documentElement.style.colorScheme = event.matches ? 'light' : 'dark';
}

initTheme();

document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(
    document.querySelectorAll('.header__theme-menu-button')
  );

  const initialTheme = getStoredTheme() || 'auto';
  setActiveButton(buttons, initialTheme);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const theme = Array.from(button.classList)
        .find((className) => className.includes('_type_'))
        .split('_type_')[1];

      setTheme(theme);
      setActiveButton(buttons, theme);
    });
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  mediaQuery.addEventListener('change', handleAutoThemeChange);
});
