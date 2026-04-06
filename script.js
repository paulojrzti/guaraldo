/* ═══════════════════════════════════════════════════════
   GUARALDO ADVOGADOS — LP Scripts
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────
  // 1. STICKY HEADER — adiciona classe ao scroll
  // ─────────────────────────────────────────────────────
  const header = document.getElementById('site-header');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // estado inicial


  // ─────────────────────────────────────────────────────
  // 2. FAQ ACORDEÃO
  // ─────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // fechar todos os outros
      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').classList.remove('open');
        }
      });

      // toggle do atual
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open', !isOpen);
    });
  });


  // ─────────────────────────────────────────────────────
  // 3. SMOOTH REVEAL — Intersection Observer leve
  // ─────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
      if (!el.style.getPropertyValue('--delay')) {
        el.style.setProperty('--delay', `${i * 40}ms`);
      }
      observer.observe(el);
    });
  }

});
