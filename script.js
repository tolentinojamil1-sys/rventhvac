const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});
document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quote-form');
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
  document.getElementById('quote-note').textContent =
    'Your email app should open now. Review and send the message to complete your request. If it does not open, use the Email link beside this form.';
  window.location.href = address;
});
