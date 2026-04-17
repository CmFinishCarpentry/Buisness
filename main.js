/* ═══════════════════════════════════════════════
   CM Finish Carpentry — main.js
   ═══════════════════════════════════════════════ */

/* ── Nav: scroll class + hamburger ── */
const header   = document.querySelector('.site-header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

/* ── Active nav link (mark by page) ── */
(function markActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      (path === 'index.html' || path === '') && (href === 'index.html' || href === './') ||
      href === path
    ) {
      a.classList.add('active');
    }
  });
})();

/* ── Scroll reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
}

/* ── Section title underline animation ── */
const titleEls = document.querySelectorAll('.section-title');

if (titleEls.length) {
  const titleIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        titleIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  titleEls.forEach(el => titleIO.observe(el));
}

/* ── Portfolio sliders ── */
document.querySelectorAll('.portfolio-card, .portfolio-item').forEach(card => {
  const slider  = card.querySelector('.job-slider');
  if (!slider) return;
  const slides  = slider.querySelectorAll('.job-slide');
  const prevBtn = card.querySelector('.job-prev');
  const nextBtn = card.querySelector('.job-next');
  const countEl = card.querySelector('.job-count');
  if (!slides.length || !prevBtn || !nextBtn || !countEl) return;

  let cur = 0;

  function go(idx) {
    slides[cur].classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    slides[cur].classList.add('active');
    countEl.textContent = (cur + 1) + ' / ' + slides.length;
  }

  prevBtn.addEventListener('click', e => { e.stopPropagation(); go(cur - 1); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); go(cur + 1); });
});

/* ── Footer year ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
