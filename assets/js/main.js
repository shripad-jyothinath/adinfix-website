(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.remove('no-js');
  root.classList.add('js');

  /* ---------------------------------------------------------
     Page load / loader
     --------------------------------------------------------- */
  const loader = doc.querySelector('.page-loader');
  const finishLoad = () => {
    body.classList.add('loaded');
    if (loader) loader.classList.add('is-done');
  };

  if (doc.readyState === 'complete') {
    window.setTimeout(finishLoad, 320);
  } else {
    window.addEventListener('load', () => window.setTimeout(finishLoad, 420), { once: true });
  }
  // Safety net if a slow asset never resolves.
  window.setTimeout(finishLoad, 2600);

  /* ---------------------------------------------------------
     Header + scroll progress
     --------------------------------------------------------- */
  const header = doc.querySelector('[data-header]');
  const progress = doc.querySelector('[data-scroll-progress]');
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (progress) {
      const max = doc.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Mobile menu
     --------------------------------------------------------- */
  const menuToggle = doc.querySelector('[data-menu-toggle]');
  const mobileMenu = doc.querySelector('[data-mobile-menu]');
  const closeMenu = () => {
    body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
  };
  const openMenu = () => {
    body.classList.add('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
    }
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }
  doc.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  const revealItems = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------------
     Number counters
     --------------------------------------------------------- */
  const counters = doc.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const progressValue = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * easeOut(progressValue)).toString();
      if (progressValue < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  if (counters.length) {
    if ('IntersectionObserver' in window && !prefersReduced) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach((el) => { el.textContent = el.dataset.target || el.textContent; });
    }
  }

  /* ---------------------------------------------------------
     Lottie
     --------------------------------------------------------- */
  const lottieEls = doc.querySelectorAll('[data-lottie]');
  if (lottieEls.length && window.lottie) {
    const lottieObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const instance = entry.target._lottieInstance;
            if (!instance) return;
            if (entry.isIntersecting) instance.play();
            else instance.pause();
          });
        }, { threshold: 0.1 })
      : null;

    lottieEls.forEach((el) => {
      const path = el.dataset.lottie;
      if (!path) return;
      const instance = window.lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: !prefersReduced,
        path,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true
        }
      });
      el._lottieInstance = instance;
      if (prefersReduced) instance.goToAndStop(0, true);
      if (lottieObserver) lottieObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Testimonial slider
     --------------------------------------------------------- */
  doc.querySelectorAll('[data-quote-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-quote-track]');
    const cards = track ? Array.from(track.querySelectorAll('.quote-card')) : [];
    const dotsWrap = slider.querySelector('[data-quote-dots]');
    const prev = slider.querySelector('[data-quote-prev]');
    const next = slider.querySelector('[data-quote-next]');
    if (!track || cards.length < 2) return;

    const dots = cards.map((_, index) => {
      const dot = doc.createElement('button');
      dot.type = 'button';
      dot.className = 'quote-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        track.scrollTo({ left: cards[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    const setActive = (index) => {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const currentIndex = () => {
      let closest = 0;
      let min = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs((card.offsetLeft - track.offsetLeft) - track.scrollLeft);
        if (distance < min) {
          min = distance;
          closest = index;
        }
      });
      return closest;
    };

    const scrollToCard = (index) => {
      const card = cards[(index + cards.length) % cards.length];
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    };

    if (prev) prev.addEventListener('click', () => scrollToCard(currentIndex() - 1));
    if (next) next.addEventListener('click', () => scrollToCard(currentIndex() + 1));

    let scrollTimer;
    track.addEventListener('scroll', () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        setActive(currentIndex());
      }, 80);
    }, { passive: true });
  });

  /* ---------------------------------------------------------
     Newsletter + contact forms (mailto, no backend)
     --------------------------------------------------------- */
  const openMailto = (subject, lines) => {
    const bodyText = lines.filter(Boolean).join('\n');
    window.location.href = `mailto:mail@adinfix.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  };

  doc.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) {
        input?.focus();
        return;
      }
      openMailto('Adinfix newsletter subscription', [
        'Please add this address to the Adinfix newsletter:',
        input.value.trim()
      ]);
      form.reset();
      const note = form.parentElement?.querySelector('.form-status');
      if (note) note.textContent = 'Your email app should open with the request.';
    });
  });

  const contactForm = doc.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = contactForm.querySelector('.form-status');
      const data = new FormData(contactForm);

      if (data.get('website')) return; // honeypot

      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      if (!name || !email) {
        if (status) status.textContent = 'Please add your name and email so we can reply.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (status) status.textContent = 'That email address does not look right. Please check it.';
        return;
      }

      openMailto(`Growth audit enquiry — ${name}`, [
        'New enquiry from the Adinfix website',
        '',
        `Name: ${name}`,
        `Company: ${data.get('company') || ''}`,
        `Email: ${email}`,
        `Phone: ${data.get('phone') || ''}`,
        `Service: ${data.get('service') || ''}`,
        `Budget: ${data.get('budget') || ''}`,
        '',
        'What is not working:',
        `${data.get('message') || ''}`
      ]);

      if (status) {
        status.textContent = 'Your email app should open with the details. If it does not, write to mail@adinfix.com.';
      }
    });
  }

  /* ---------------------------------------------------------
     Magnetic buttons
     --------------------------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches && !prefersReduced) {
    doc.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (event) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------
     Service page sticky nav active state
     --------------------------------------------------------- */
  const serviceNav = doc.querySelector('[data-service-nav]');
  const serviceSections = doc.querySelectorAll('.service-detail[id]');
  if (serviceNav && serviceSections.length && 'IntersectionObserver' in window) {
    const navLinks = Array.from(serviceNav.querySelectorAll('a'));
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    serviceSections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------------------------------------------------------
     Gentle parallax for decorative hero glows
     --------------------------------------------------------- */
  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    const parallaxEls = doc.querySelectorAll('.hero-glow');
    if (parallaxEls.length) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        parallaxEls.forEach((el, index) => {
          el.style.transform = `translate3d(0, ${y * (0.04 + index * 0.025)}px, 0)`;
        });
      }, { passive: true });
    }
  }
})();
