// ─── Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Fade-in on scroll
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── Company logo fallback chain: primary src → Google Favicons → initials
document.querySelectorAll('.company-logo').forEach(img => {
  const isGFavicon = src => src.includes('google.com/s2/favicons');
  img.addEventListener('error', function onErr() {
    const domain = img.dataset.fallbackDomain;
    const initials = img.dataset.initials || '?';
    if (!isGFavicon(img.src)) {
      // First failure: try Google Favicons
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } else {
      // Second failure: replace wrap with initials badge
      img.removeEventListener('error', onErr);
      const wrap = img.closest('.company-logo-wrap');
      if (wrap) {
        const badge = document.createElement('div');
        badge.className = 'company-logo-fallback';
        badge.textContent = initials;
        wrap.replaceWith(badge);
      }
    }
  });
});

// ─── Email obfuscation
const mailHandler = e => {
  e.preventDefault();
  window.location.href = 'mailto:' + 'sanjaysharmagwl' + '@' + 'gmail.com';
};
document.getElementById('email-link').addEventListener('click', mailHandler);
document.getElementById('footer-email').addEventListener('click', mailHandler);
