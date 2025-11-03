/* Enhanced interaction JS
   - GSAP hero intro
   - Typed.js
   - particles.js
   - AOS
   - Swiper + responsive logic
   - VanillaTilt
   - Nav collapse + current section highlight
   - Lazy loading & year stamp
*/

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------
     1) AOS
  ------------------------- */
  if (window.AOS) {
    AOS.init({ duration: 750, once: true, offset: 120, easing: 'ease-out-cubic' });
  }

  /* -------------------------
     2) Year in footer
  ------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------
     3) Particles
  ------------------------- */
  if (window.particlesJS) {
    try {
      particlesJS('particles-js', {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: ['#00f0ff', '#ff49ff'] },
          shape: { type: 'circle' },
          opacity: { value: 0.11, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 130, color: '#00f0ff', opacity: 0.03, width: 1 },
          move: { enable: true, speed: 1, random: true, out_mode: 'out' }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false } },
          modes: { grab: { distance: 150, line_linked: { opacity: 0.12 } } }
        },
        retina_detect: true
      });
    } catch (err) {
      console.warn('particles init error', err);
    }
  }

  /* -------------------------
     4) Typed.js (hero)
  ------------------------- */
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: [
        'Results-driven Software Developer • Frontend & Backend',
        'React.js · Node.js · PHP · MySQL',
        'I build responsive web apps & in-house tools'
      ],
      typeSpeed: 44,
      backSpeed: 28,
      backDelay: 1600,
      startDelay: 300,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  /* -------------------------
     5) GSAP hero intro
  ------------------------- */
  if (window.gsap) {
    try {
      const tl = gsap.timeline();
      tl.from('#mainNav', { y: -24, opacity: 0, duration: 0.7, ease: 'power3.out' });
      tl.from('.eyebrow', { y: 18, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      tl.from('.hero-title', { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45');
      tl.from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
      tl.from('.typed-wrap', { opacity: 0, y: 8, duration: 0.45 }, '-=0.35');
      tl.from('.btn-glow', { scale: 0.96, opacity: 0, duration: 0.55 }, '-=0.35');
      // subtle floating on feature card
      gsap.to('#featureCard', { y: -10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 });
    } catch (e) {
      console.warn('gsap error', e);
    }
  }

  /* -------------------------
     6) Swiper initialization
  ------------------------- */
  const initSwipers = () => {
    document.querySelectorAll('.mySwiper').forEach((el) => {
      const slides = el.querySelectorAll('.swiper-slide').length;
      const pagination = el.parentElement.querySelector('.swiper-pagination');

      if (pagination) pagination.style.display = slides <= 3 ? 'none' : '';

      new Swiper(el, {
        slidesPerView: slides <= 3 ? Math.min(slides, 3) : 1,
        spaceBetween: 18,
        pagination: { el: pagination, clickable: true },
        breakpoints: {
          768: { slidesPerView: slides <= 3 ? Math.min(slides, 3) : 2 },
          992: { slidesPerView: slides <= 3 ? Math.min(slides, 3) : 3 }
        },
        loop: slides > 3,
        autoplay: slides > 3 ? { delay: 3200, disableOnInteraction: false } : false,
        speed: 800,
        grabCursor: true
      });
    });
  };
  initSwipers();

  /* -------------------------
     7) Category / project carousel toggles
  ------------------------- */
  document.querySelectorAll('.btn-category').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.project-carousel').forEach(c => c.classList.add('d-none'));
      const category = this.getAttribute('data-category');
      const target = document.getElementById(`carousel-${category}`);
      if (target) {
        target.classList.remove('d-none');
        // reinit swipers slightly after visibility
        setTimeout(() => initSwipers(), 80);
      }
    });
  });

  /* -------------------------
     8) VanillaTilt for .tilt elements
  ------------------------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8, speed: 450, glare: true, 'max-glare': 0.12
    });
  }

  /* -------------------------
     9) Mobile nav auto-collapse
  ------------------------- */
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('.navbar-collapse');
      if (nav && nav.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* -------------------------
     10) Lazy image swap (IntersectionObserver)
  ------------------------- */
  const lazyImgs = document.querySelectorAll('img[loading="lazy"], img.lazy-img');
  if ('IntersectionObserver' in window && lazyImgs.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '150px' });

    lazyImgs.forEach(img => io.observe(img));
  }

  /* -------------------------
     11) Section highlight (light-weight scroll spy)
  ------------------------- */
  const sections = document.querySelectorAll('section[id], header#home');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.navbar .nav-link[href="#${id}"]`);
        if (link) {
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }, { threshold: 0.45 });
    sections.forEach(s => observer.observe(s));
  }

  /* -------------------------
     12) Fallback micro-interaction for project-cards (if tilt unavailable)
  ------------------------- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `perspective(800px) rotateX(${(-dy * 4).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* -------------------------
     13) Respect reduced motion
  ------------------------- */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const el = document.getElementById('particles-js');
    if (el) el.style.display = 'none';
  }

}); // DOMContentLoaded end
