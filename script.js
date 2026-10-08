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
  document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Light / dark mode.
const themeToggle = document.createElement('button');
themeToggle.type = 'button';
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Switch color theme');
themeToggle.setAttribute('title', 'Switch light / dark mode');
const header = document.querySelector('header');
const quoteButton = document.querySelector('header .quote');
if (header) header.insertBefore(themeToggle, quoteButton || null);
const initialDark = false;
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
});

// Subtle scroll reveal animation for key content.
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.trust > div, .services > .eyebrow, .services > h2, .cards article, .projects .section > .eyebrow, .projects .section > h2, .projects .section > p, .gallery img, .coverage > *, .contact > div, footer > *');
if (!reduceMotion && 'IntersectionObserver' in window) {
  revealItems.forEach((item) => item.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
}

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
    const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, `Service needed: ${service}`, '', 'Project details:', details].join('\n');
    const address = `mailto:rventhvac@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note = document.getElementById('quote-note');
    if (note) note.textContent = 'Your email app should open now. Review and send the message to complete your request. If it does not open, use the Email link beside this form.';
    window.location.href = address;
  });
}


// Project photos are local copies of R-Vent's public Legazpi, Makati album.
const projectGalleries = {
  makati: {
    title: 'Legazpi, Makati Project',
    images: [1, 2, 3, 4, 5].map((n) => `assets/projects/makati-${n}.jpg`)
  }
};
const galleryDialog = document.getElementById('project-gallery');
if (galleryDialog) {
  const galleryPhoto = document.getElementById('gallery-photo');
  const galleryTitle = document.getElementById('gallery-title');
  const galleryCount = document.getElementById('gallery-count');
  let activeGallery = null;
  let activeIndex = 0;
  const renderPhoto = () => {
    if (!activeGallery) return;
    galleryPhoto.src = activeGallery.images[activeIndex];
    galleryPhoto.alt = `${activeGallery.title}, photo ${activeIndex + 1} of ${activeGallery.images.length}`;
    galleryCount.textContent = `Photo ${activeIndex + 1} of ${activeGallery.images.length}`;
  };
  const stepPhoto = (delta) => {
    if (!activeGallery) return;
    activeIndex = (activeIndex + delta + activeGallery.images.length) % activeGallery.images.length;
    renderPhoto();
  };
  document.querySelectorAll('[data-gallery]').forEach((button) => {
    button.addEventListener('click', () => {
      activeGallery = projectGalleries[button.dataset.gallery];
      if (!activeGallery) return;
      activeIndex = 0;
      galleryTitle.textContent = activeGallery.title;
      renderPhoto();
      galleryDialog.showModal();
    });
  });
  galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.gallery-prev').addEventListener('click', () => stepPhoto(-1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click', () => stepPhoto(1));
  galleryDialog.addEventListener('click', (event) => { if (event.target === galleryDialog) galleryDialog.close(); });
  galleryDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') stepPhoto(-1);
    if (event.key === 'ArrowRight') stepPhoto(1);
  });
  galleryDialog.addEventListener('close', () => { activeGallery = null; galleryPhoto.removeAttribute('src'); });
}
