/* ============================================================
   JAS V3 — ANIMATION SCRIPT
   ============================================================ */

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObs.observe(el));

/* ── STAT COUNTER ANIMATION ────────────────────────────────── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d[\d,]*)/);
    if (!match) return;
    const target = parseInt(match[1].replace(/,/g, ''));
    const suffix = raw.replace(match[1], '');
    const duration = 1600;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }
    }, duration / steps);
    counterObs.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-number, .hero-stat-num').forEach(el => {
  counterObs.observe(el);
});

/* ── SMOOTH FAQ ────────────────────────────────────────────── */
/* Override any existing toggleFaq with smooth version */
window.toggleFaq = function(btn) {
  const item = btn.closest ? btn.closest('.faq-item') : btn.parentElement;
  if (!item) return;

  const answer = item.querySelector('.faq-answer');
  if (!answer) return;

  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => {
    const a = i.querySelector('.faq-answer');
    if (a) { a.classList.remove('open'); a.style.maxHeight = '0'; }
    i.classList.remove('faq-open');
    const arrow = i.querySelector('.faq-arrow');
    if (arrow) arrow.style.transform = '';
  });

  if (!isOpen) {
    answer.classList.add('open');
    answer.style.maxHeight = '2000px';   /* large enough for any answer */
    item.classList.add('faq-open');
    const arrow = item.querySelector('.faq-arrow');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
};

/* Also wire up any faq-question buttons that use onclick */
document.querySelectorAll('.faq-question').forEach(btn => {
  // Wrap in smooth version
  btn.onclick = function() { window.toggleFaq(this); };
});

/* ── STAGGER CAR CARDS ─────────────────────────────────────── */
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

/* Stagger carousel cards */
document.querySelectorAll('.cc-card, .car-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${(i % 4) * 0.08}s`;
  cardObs.observe(card);
});

/* ── STAGGER BRAND CARDS ───────────────────────────────────── */
document.querySelectorAll('.brand-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${i * 0.04}s`;
  cardObs.observe(card);
});

/* ── STAGGER SECTION CONTENT ───────────────────────────────── */
/* Trust / step cards */
document.querySelectorAll('.trust-card, .step-card, .hiw-card, .step').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObs.observe(el);
});

/* Section headings */
document.querySelectorAll('.section-title, .section-header h2, .sec-head h2').forEach(el => {
  if (!el.closest('.hero')) {
    el.classList.add('reveal');
    revealObs.observe(el);
  }
});

/* Grade cards */
document.querySelectorAll('.grade-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.05}s`;
  revealObs.observe(el);
});

/* GS steps */
document.querySelectorAll('.gs-step').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

/* FAQ items */
document.querySelectorAll('.faq-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.06}s`;
  revealObs.observe(el);
});

/* CTA sections */
document.querySelectorAll('.cta-banner, .cta-section, .cta-inner').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

/* Stats strip items */
document.querySelectorAll('.stat-item, .hero-stat').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObs.observe(el);
});

/* About / HIW page sections */
document.querySelectorAll('.about-intro-grid, .about-image-wrap, .about-prose, .hiw-section-inner').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

/* Contact form card */
document.querySelectorAll('.contact-form-wrap, .contact-info-block, .form-card').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});
