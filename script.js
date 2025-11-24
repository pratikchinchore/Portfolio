// Init AOS + interactions
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 900,
    easing: 'ease-out-quart',
    once: true,
    offset: 80,
  });

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth nav link collapsing (Bootstrap)
  if (window.$) {
    $('a.nav-link').on('click', function () {
      $('.navbar-collapse').collapse('hide');
    });
  }

  // Tilt effect on cards
  const tiltSelector = '.card-project, .project-card';
  document.querySelectorAll(tiltSelector).forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform =
        'perspective(900px) rotateX(' +
        -dy * 4 +
        'deg) rotateY(' +
        dx * 6 +
        'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Magnetic hover for nav links & buttons
  const magneticTargets = document.querySelectorAll(
    '.nav-link-animated, .btn-glow, .btn-glow-soft'
  );
  magneticTargets.forEach((el) => {
    const strength = 18;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.retro-layer > div').forEach((el) => (el.style.animation = 'none'));
    document
      .querySelectorAll('.card-project, .project-card, .btn-primary, .btn-outline-retro')
      .forEach((el) => (el.style.transition = 'none'));
  }
});

// === GSAP + ScrollTrigger ===
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // PROJECTS section
  const projectsSection = document.querySelector('#projects');
  if (projectsSection) {
    gsap.from('#projects h3', {
      scrollTrigger: {
        trigger: projectsSection,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('#projects .btn-category', {
      scrollTrigger: {
        trigger: projectsSection,
        start: 'top 78%',
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08
    });

    gsap.from('#projects .swiper-slide', {
      scrollTrigger: {
        trigger: '#projects-carousel',
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06
    });
  }

  // ABOUT section (staggered content + skills)
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    gsap.from('#about .about-heading', {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 80%',
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('#about .about-text', {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 78%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08
    });

    gsap.from('#about .skill-symbol', {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 75%',
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
      stagger: 0.06
    });
  }

  // EXPERIENCE section
  const experienceSection = document.querySelector('#experience');
  if (experienceSection) {
    gsap.from('#experience .experience-heading', {
      scrollTrigger: {
        trigger: experienceSection,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('#experience .timeline-item', {
      scrollTrigger: {
        trigger: experienceSection,
        start: 'top 78%',
      },
      x: -40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12
    });

    // floating badges or counters if you add them
    gsap.from('#experience .xp-stat-pill', {
      scrollTrigger: {
        trigger: experienceSection,
        start: 'top 70%',
      },
      y: 20,
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    });
  }

  // Global background floating elements (reusable)
  const bgFloaters = document.querySelectorAll('.bg-orbit, .bg-pill, .bg-dot-ring');
  if (bgFloaters.length) {
    bgFloaters.forEach((el, index) => {
      gsap.to(el, {
        y: 12,
        x: index % 2 === 0 ? 8 : -8,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }
}

// === Lottie for Projects section icon ===
document.addEventListener('DOMContentLoaded', function () {
  const lottieContainer = document.getElementById('projects-lottie');
  if (lottieContainer && window.lottie) {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // you can replace URL with your own JSON if you have
      path: 'https://assets5.lottiefiles.com/packages/lf20_4kx2q32n.json'
    });
  }

  // Extra hover animation using GSAP for project cards
  if (window.gsap) {
    document.querySelectorAll('.project-card').forEach((card) => {
      const img = card.querySelector('.project-img-wrap img');

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          y: -8,
          boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
          ease: 'power3.out'
        });
        if (img) {
          gsap.to(img, {
            duration: 0.4,
            scale: 1.05,
            ease: 'power3.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          y: 0,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          ease: 'power3.out'
        });
        if (img) {
          gsap.to(img, {
            duration: 0.4,
            scale: 1,
            ease: 'power3.out'
          });
        }
      });
    });
  }
});
