/* ═══════════════════════════════════════════════════════
   GUARALDO ADVOGADOS — LP Scripts (Motion.dev Edition)
═══════════════════════════════════════════════════════ */
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────
  // 1. STICKY HEADER
  // ─────────────────────────────────────────────────────
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  if (header) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

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
  // 3. MOTION REVEAL (Framer Motion API para Vanilla)
  // Agrupa os elementos `.reveal` por seção para animá-los em cascata
  // ─────────────────────────────────────────────────────
  const sections = document.querySelectorAll('section, .hero');
  
  sections.forEach(section => {
    const reveals = section.querySelectorAll('.reveal');
    if(reveals.length > 0) {
      inView(section, () => {
        animate(
          reveals,
          { opacity: [0, 1], y: [30, 0] },
          { 
            duration: 0.7, 
            delay: stagger(0.12),
            easing: [0.16, 1, 0.3, 1] // Curva Apple-like (easeOut)
          }
        );
      }, { margin: "-5% 0px -5% 0px" }); // Dispara quando a seção entra 5%
    }
  });

});
