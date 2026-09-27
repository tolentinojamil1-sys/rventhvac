// Load the optional theme layer without changing the base stylesheet.
const themeStyles = document.createElement('link');
themeStyles.rel = 'stylesheet';
themeStyles.href = 'theme.css';
document.head.appendChild(themeStyles);

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

if (menu && nav) {
  menu.setAttribute('aria-expanded', 'false');
  menu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Light / dark mode. The visitor's choice is saved on this device.
const themeToggle = document.createElement('button');
themeToggle.type = 'button';
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Switch color theme');
themeToggle.setAttribute('title', 'Switch light / dark mode');

const header = document.querySelector('header');
const quoteButton = document.querySelector('header .quote');
if (header) header.insertBefore(themeToggle, quoteButton || null);

const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let savedTheme = null;
try { savedTheme = localStorage.getItem('rvent-theme'); } catch (_) {}
const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

applyTheme(initialDark);

themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  applyTheme(isDark);
  try { localStorage.setItem('rvent-theme', isDark ? 'dark' : 'light'); } catch (_) {}
});

const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('quote-name').value.trim();
    const email = document.getElementById('quote-email').value.trim();
    const phone = document.getElementById('quote-phone').value.trim();
    const service = document.getElementById('quote-service').value;
    const details = document.getElementById('quote-details').value.trim();

    const subject = `Quote request: ${service}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service needed: ${service}`,
      '',
      'Project details:',
      details,
    ].join('\n');

    const address = `mailto:rventhvac@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = document.getElementById('quote-note');
    if (note) {
      note.textContent = 'Your email app should open now. Review and send the message to complete your request. If it does not open, use the Email link beside this form.';
    }
    window.location.href = address;
  });
}
