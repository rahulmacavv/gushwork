/* =====================================================
   Pure vanilla JS, no bundler required
   ===================================================== */

(function () {
  'use strict';

  /* ─── CONSTANTS ─────────────────────────────────── */
  var PARTNER_LOGO_SRC = 'assets/partner-logo-1959c9.png';

  var QUOTES = [
    {
      title: 'On-spec deliveries kept our water project on track.',
      body: 'Meera supplied PN10 SDR11 coils with clear mill certificates and marking. Fusion crews reported consistent ovality and stable heating cycles — we hit hydrotest on the first pass.',
      name: 'Ananya Deshpande',
      role: 'Project Manager, Municipal EPC',
    },
    {
      title: 'Quality documentation matched our QA checklist.',
      body: 'From resin traceability to dimension reports, the dossier aligned with our owner\'s engineer review. Site support for jointing parameters was practical and responsive.',
      name: 'James Okafor',
      role: 'Lead QA Engineer',
    },
    {
      title: 'Reliable partner for industrial HDPE runs.',
      body: 'We replaced a corroded carbon steel circuit with HDPE for process water. Meera helped select SDR and fittings for the operating temperature and provided timely coil lengths.',
      name: 'Elena Rossi',
      role: 'Maintenance Head',
    },
    {
      title: 'Smooth coordination for a tight ROW schedule.',
      body: 'Deliveries were sequenced to our trench opening plan and coils were handled without damage. Fusion teams appreciated the consistent wall thickness across batches.',
      name: 'Vikram Singh',
      role: 'Site Construction Manager',
    },
    {
      title: 'Strong technical support during value engineering.',
      body: 'Their team walked through hydraulic checks and helped validate PN class versus surge scenarios. The recommendation saved material while staying within code limits.',
      name: 'Laura Chen',
      role: 'Design Consultant',
    },
  ];

  /* ─── UTILS ─────────────────────────────────────── */
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── 1. STICKY HEADER ───────────────────────────── */
  function initStickyHeader() {
    var header = document.querySelector('.fl-nav');
    if (!header) return;

    var ticking = false;

    function update() {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ─── 2. MOBILE NAV ─────────────────────────────── */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var drawer = document.getElementById('navDrawer');
    var closeBtn = document.getElementById('navClose');
    if (!toggle || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ─── 3. FAQ ACCORDION ──────────────────────────── */
  function initFaq() {
    var list = document.getElementById('faqList');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.fl-faq-item__head');
      if (!btn) return;
      var item = btn.closest('.fl-faq-item');
      if (!item) return;
      var isOpen = item.classList.contains('fl-faq-item--open');

      /* Close all */
      list.querySelectorAll('.fl-faq-item').forEach(function (el) {
        el.classList.remove('fl-faq-item--open');
        var b = el.querySelector('.fl-faq-item__head');
        if (b) b.setAttribute('aria-expanded', 'false');
        /* Reset icon to chevron-down */
        var svg = el.querySelector('.fl-faq-item__toggle svg');
        if (svg) svg.innerHTML = '<path d="M3 4.5l3 3 3-3" stroke="#4B5563" stroke-width="1.3" stroke-linecap="round"/>';
      });

      /* Toggle clicked */
      if (!isOpen) {
        item.classList.add('fl-faq-item--open');
        btn.setAttribute('aria-expanded', 'true');
        var svg2 = item.querySelector('.fl-faq-item__toggle svg');
        if (svg2) svg2.innerHTML = '<path d="M3 7.5l3-3 3 3" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round"/>';
      }
    });
  }

  /* ─── 4. TESTIMONIALS ───────────────────────────── */
  function renderQuotes() {
    var track = document.getElementById('quotesTrack');
    if (!track) return;

    track.innerHTML = QUOTES.map(function (q) {
      var initials = q.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
      return (
        '<article class="fl-quote-card">' +
        '<div>' +
        '<div class="fl-quote-card__mark" aria-hidden="true"><img src="./assets/icons/quote.png" alt="icon" width="30" height="30"></div>' +
        '<h3 class="fl-quote-card__title">' + esc(q.title) + '</h3>' +
        '<p class="fl-quote-card__body">' + esc(q.body) + '</p>' +
        '</div>' +
        '<div class="fl-quote-card__foot">' +
        '<div class="fl-quote-card__client">' +
        '<div class="fl-quote-card__avatar" aria-hidden="true"></div>' +
        '<div class="fl-quote-card__who">' +
        '<strong>' + esc(q.name) + '</strong>' +
        '<span>' + esc(q.role) + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</article>'
      );
    }).join('');
  }

  /* ─── 5. PROCESS PILLS ──────────────────────────── */
  var PROCESS_STEPS = [
    {
      pill: 'Raw Material',
      heading: 'High-Grade Raw Material Selection',
      body: 'We start with virgin PE100/PE80 compounds from approved sources, verified for density, melt flow, and lot traceability before extrusion — the foundation of consistent pressure performance.',
      checks: ['PE100 grade material', 'Optimal molecular weight distribution'],
    },
    {
      pill: 'Extrusion',
      heading: 'Precision Single-Screw Extrusion',
      body: 'Our extruders operate at tightly controlled barrel temperatures and screw speeds to achieve consistent melt homogeneity and output rates across all pipe diameters.',
      checks: ['Controlled melt temperature', 'Consistent output pressure'],
    },
    {
      pill: 'Cooling',
      heading: 'Calibrated Vacuum Cooling',
      body: 'Pipes pass through vacuum calibration tanks with precisely controlled water temperature and flow to lock in OD dimensions and wall geometry.',
      checks: ['Vacuum sizing accuracy', 'Controlled cooling rate'],
    },
    {
      pill: 'Sizing',
      heading: 'Online Dimensional Measurement',
      body: 'Laser gauges continuously monitor OD, wall thickness, and ovality in real time — deviations trigger immediate process correction before coiling.',
      checks: ['Real-time laser gauging', 'Automated alarm thresholds'],
    },
    {
      pill: 'Quality Control',
      heading: 'In-Process & Final QC Testing',
      body: 'Hydrostatic strength, melt flow, and density tests are conducted on each production lot to IS 5984 and ISO 4427 requirements — results are documented in traceable test reports.',
      checks: ['Hydrostatic pressure test', 'MFR and density verification'],
    },
    {
      pill: 'Marking',
      heading: 'Laser & Embossed Marking',
      body: 'Each pipe is marked with manufacturer, material grade, OD, SDR/PN, standard, lot number, and production date — enabling full traceability from raw material to installation.',
      checks: ['Standard-compliant marking', 'Full lot traceability'],
    },
    {
      pill: 'Cutting',
      heading: 'Precision Cutting & Coiling',
      body: 'Pipes are cut to specified lengths or coiled to customer requirements using planetary cutters that produce clean, square ends without deformation.',
      checks: ['Square-cut pipe ends', 'Customer length flexibility'],
    },
    {
      pill: 'Packaging',
      heading: 'Protected Packaging & Dispatch',
      body: 'End-caps protect bore surfaces, coils are strapped and wrapped to prevent UV exposure, and pipes are bundled with load-rated packaging rated for crane handling.',
      checks: ['End-cap protection', 'UV-resistant wrapping'],
    },
  ];

  var PROCESS_IMAGES = [
    'assets/industry-bg.png',
    'assets/portfolio-1-428ecc.png',
    'assets/hero-pipes.jpg',
    'assets/portfolio-1-428ecc.png',
    'assets/portfolio-2-ed613b.png',
    'assets/hero-pipes.jpg',
    'assets/industry-bg.png',
    'assets/portfolio-2-ed613b.png',
  ];

  function initProcessPills() {
    var pillsEl = document.querySelector('.fl-pills');
    var stepIndicator = document.querySelector('.fl-step-indicator');
    var prevBtn = document.querySelector('.fl-process-prev');
    var nextBtn = document.querySelector('.fl-process-next');
    var copyEl = document.querySelector('.fl-process__copy');
    var visualEl = document.querySelector('.fl-process__visual img');
    if (!copyEl) return;

    var currentIndex = 0;

    function setStep(idx) {
      var step = PROCESS_STEPS[idx];
      if (!step) return;
      currentIndex = idx;

      /* Update pills */
      if (pillsEl) {
        pillsEl.querySelectorAll('.fl-pill').forEach(function (p, i) {
          p.classList.toggle('fl-pill--active', i === idx);
          p.setAttribute('tabindex', i === idx ? '0' : '-1');
        });
      }

      /* Update step indicator */
      if (stepIndicator) {
        stepIndicator.textContent = 'Step ' + (idx + 1) + '/8 ' + step.pill;
      }

      /* Update copy */
      var checksHtml = step.checks.map(function (c) {
        return (
          '<div class="fl-check-row">' +
          '<img src="assets/icons/check-circle.png" alt="" width="18" height="18">' +
          '<span>' + esc(c) + '</span>' +
          '</div>'
        );
      }).join('');

      copyEl.innerHTML = (
        '<h3>' + esc(step.heading) + '</h3>' +
        '<p>' + esc(step.body) + '</p>' +
        '<div class="fl-process__checks">' + checksHtml + '</div>'
      );

      /* Update image */
      if (visualEl) {
        visualEl.src = PROCESS_IMAGES[idx] || PROCESS_IMAGES[0];
        visualEl.alt = step.heading;
      }
    }

    if (pillsEl) {
      pillsEl.addEventListener('click', function (e) {
        var pill = e.target.closest('.fl-pill');
        if (!pill) return;
        var pills = Array.from(pillsEl.querySelectorAll('.fl-pill'));
        setStep(pills.indexOf(pill));
      });

      /* Keyboard navigation */
      pillsEl.addEventListener('keydown', function (e) {
        var pills = Array.from(pillsEl.querySelectorAll('.fl-pill'));
        var cur = pills.indexOf(document.activeElement);
        if (e.key === 'ArrowRight' && cur < pills.length - 1) { pills[cur + 1].focus(); setStep(cur + 1); }
        if (e.key === 'ArrowLeft' && cur > 0) { pills[cur - 1].focus(); setStep(cur - 1); }
      });
    }

    /* Mobile nav buttons */
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var newIdx = (currentIndex - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length;
        setStep(newIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var newIdx = (currentIndex + 1) % PROCESS_STEPS.length;
        setStep(newIdx);
      });
    }

    setStep(0);
  }

  function initSectionReveal() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('section, .fl-hero'));
    if (!targets.length) return;

    targets.forEach(function (el) {
      el.classList.add('fl-animate-on-scroll');
    });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px'
    });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─── 6. IMAGE CAROUSEL WITH ZOOM ──────────────── */
  function initCarousel() {
    var track = document.getElementById('carouselTrack');
    var dotsEl = document.querySelector('.carousel-dots');
    var prevBtn = document.querySelector('.carousel-btn--prev');
    var nextBtn = document.querySelector('.carousel-btn--next');
    if (!track || !dotsEl || !prevBtn || !nextBtn) return;

    var slides = Array.from(track.querySelectorAll('.carousel-slide'));
    var GAP = 24; /* px — matches CSS gap */
    var VISIBLE = getVisibleCount();
    var currentIndex = 0;
    var touchStartX = 0;

    function getVisibleCount() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1200) return 2;
      return 3;
    }

    /* Build dots */
    var maxIndex = Math.max(0, slides.length - VISIBLE);
    for (var i = 0; i <= maxIndex; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
        dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () { goToSlide(idx); });
        dotsEl.appendChild(dot);
      })(i);
    }

    function goToSlide(idx) {
      VISIBLE = getVisibleCount();
      var maxIdx = Math.max(0, slides.length - VISIBLE);
      currentIndex = Math.max(0, Math.min(idx, maxIdx));

      var slideW = slides[0].offsetWidth + GAP;
      track.style.transform = 'translateX(-' + (currentIndex * slideW) + 'px)';

      var dots = dotsEl.querySelectorAll('.carousel-dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === currentIndex);
        d.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      });
    }

    prevBtn.addEventListener('click', function () { goToSlide(currentIndex - 1); });
    nextBtn.addEventListener('click', function () { goToSlide(currentIndex + 1); });

    /* Touch swipe */
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) goToSlide(currentIndex + (delta > 0 ? 1 : -1));
    }, { passive: true });

    /* Resize */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { goToSlide(currentIndex); }, 150);
    }, { passive: true });
  }

  /* ─── 7. IMAGE ZOOM ─────────────────────────────── */
  function initZoom() {
    var ZOOM_FACTOR = 3;
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) return; /* Disable zoom on touch devices */

    document.querySelectorAll('.carousel-img-wrapper').forEach(function (wrapper) {
      var lens = wrapper.querySelector('.zoom-lens');
      var preview = wrapper.querySelector('.zoom-preview');
      var img = wrapper.querySelector('.carousel-img');
      var prevImg = wrapper.querySelector('.zoom-preview-img');
      if (!lens || !preview || !img || !prevImg) return;

      function moveLens(e) {
        var rect = img.getBoundingClientRect();
        var lensH = lens.offsetHeight / 2;
        var lensW = lens.offsetWidth / 2;

        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        x = Math.max(lensW, Math.min(x, rect.width - lensW));
        y = Math.max(lensH, Math.min(y, rect.height - lensH));

        lens.style.left = x + 'px';
        lens.style.top = y + 'px';

        var ratioX = x / rect.width;
        var ratioY = y / rect.height;
        var zoomedW = rect.width * ZOOM_FACTOR;
        var zoomedH = rect.height * ZOOM_FACTOR;

        prevImg.style.width = zoomedW + 'px';
        prevImg.style.height = zoomedH + 'px';
        prevImg.style.left = -(ratioX * zoomedW - preview.offsetWidth / 2) + 'px';
        prevImg.style.top = -(ratioY * zoomedH - preview.offsetHeight / 2) + 'px';
      }

      wrapper.addEventListener('mousemove', moveLens);
      wrapper.addEventListener('mouseenter', function () {
        lens.style.opacity = '1';
        preview.style.opacity = '1';
      });
      wrapper.addEventListener('mouseleave', function () {
        lens.style.opacity = '0';
        preview.style.opacity = '0';
      });
    });
  }

  /* ─── 8. FORMS ──────────────────────────────────── */
  function initForms() {
    ['catalogForm', 'ctaForm'].forEach(function (id) {
      var form = document.getElementById(id);
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        if (btn) {
          var orig = btn.textContent;
          btn.textContent = 'Sent! ✓';
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = orig;
            btn.disabled = false;
            form.reset();
          }, 3000);
        }
      });
    });
  }

  /* ─── 9. HERO THUMBNAIL ACTIVE STATE ────────────── */
  function initModals() {
    var activeModal = null;
    var lastFocused = null;

    function openModal(modal) {
      if (!modal) return;
      lastFocused = document.activeElement;
      activeModal = modal;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('fl-modal-open');

      var firstField = modal.querySelector('.fl-modal__form input') || modal.querySelector('.fl-modal__close');
      if (firstField) {
        setTimeout(function () { firstField.focus(); }, 60);
      }
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      activeModal = null;
      document.body.classList.remove('fl-modal-open');

      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(document.getElementById(trigger.getAttribute('data-modal-target')));
      });
    });

    document.querySelectorAll('.fl-modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target.closest('[data-modal-close]')) {
          closeModal(modal);
        }
      });

      var form = modal.querySelector('form');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        var originalText = btn.textContent;
        btn.textContent = 'Submitted!';
        btn.disabled = true;

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
          closeModal(modal);
        }, 900);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeModal) {
        closeModal(activeModal);
      }
    });
  }

  function initHeroThumbs() {
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.fl-hero__thumb'));
    var wrapper = document.querySelector('.fl-hero__photo-wrap');
    var stage = document.querySelector('.fl-hero__photo-stage');
    var track = document.querySelector('.fl-hero__photo-track');
    var photos = Array.prototype.slice.call(document.querySelectorAll('.fl-hero__photo'));
    var lens = document.querySelector('.fl-hero__zoom-lens');
    var preview = document.querySelector('.fl-hero__zoom-preview');
    var prevBtn = document.querySelector('.fl-hero__arrow--prev');
    var nextBtn = document.querySelector('.fl-hero__arrow--next');
    if (!thumbs.length || !wrapper || !stage || !track || !photos.length) return;

    var HERO_ZOOM = 2.8;

    var slideCount = Math.min(thumbs.length, photos.length);
    if (!slideCount) return;

    var currentIndex = thumbs.findIndex(function (thumb) {
      return thumb.classList.contains('is-active');
    });
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= slideCount) currentIndex = 0;

    function getActivePhoto() {
      return photos[currentIndex];
    }

    function resetZoom() {
      wrapper.classList.remove('is-zooming');
      stage.classList.remove('is-zooming');
    }

    function updateZoomSource() {
      var activePhoto = getActivePhoto();
      if (!activePhoto || !preview) return;
      preview.style.backgroundImage = 'url("' + (activePhoto.currentSrc || activePhoto.src) + '")';
      preview.style.backgroundSize = (HERO_ZOOM * 100) + '% ' + (HERO_ZOOM * 100) + '%';
    }

    function syncPhotos() {
      photos.forEach(function (photo, i) {
        photo.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
        photo.classList.toggle('is-active-photo', i === currentIndex);
      });
    }

    function syncThumbs() {
      thumbs.forEach(function (thumb, i) {
        var isActive = i === currentIndex;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    function showSlide(index) {
      if (index < 0 || index >= slideCount) return;
      resetZoom();
      currentIndex = index;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      syncPhotos();
      syncThumbs();
      updateZoomSource();
    }

    function moveZoom(e) {
      var activePhoto = getActivePhoto();
      if (!activePhoto || !lens || !preview) return;

      var stageRect = stage.getBoundingClientRect();
      var wrapperRect = wrapper.getBoundingClientRect();
      var lensHalfW = lens.offsetWidth / 2;
      var lensHalfH = lens.offsetHeight / 2;

      var x = e.clientX - stageRect.left;
      var y = e.clientY - stageRect.top;

      x = Math.max(lensHalfW, Math.min(x, stageRect.width - lensHalfW));
      y = Math.max(lensHalfH, Math.min(y, stageRect.height - lensHalfH));

      lens.style.left = (stageRect.left - wrapperRect.left + x) + 'px';
      lens.style.top = (stageRect.top - wrapperRect.top + y) + 'px';

      var xPercent = (x / stageRect.width) * 100;
      var yPercent = (y / stageRect.height) * 100;

      preview.style.backgroundPosition = xPercent + '% ' + yPercent + '%';
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () {
        if (i === currentIndex) return;
        showSlide(i);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var index = (currentIndex - 1 + slideCount) % slideCount;
        showSlide(index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var index = (currentIndex + 1) % slideCount;
        showSlide(index);
      });
    }

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      stage.addEventListener('mouseenter', function (e) {
        var activePhoto = getActivePhoto();
        if (!activePhoto || !lens || !preview) return;
        wrapper.classList.add('is-zooming');
        stage.classList.add('is-zooming');
        updateZoomSource();
        moveZoom(e);
      });

      stage.addEventListener('mousemove', moveZoom);
      stage.addEventListener('mouseleave', resetZoom);
    }

    photos.forEach(function (photo) {
      if (!photo.src) return;
      var img = new Image();
      img.src = photo.src;
    });

    showSlide(currentIndex);
  }

  /* ─── 9.5. INDUSTRY ARROWS ──────────────────────── */
  function initIndustryArrows() {
    var prevBtn = document.querySelector('.fl-industries__arrow--prev');
    var nextBtn = document.querySelector('.fl-industries__arrow--next');
    var track = document.getElementById('industryTrack');
    if (!prevBtn || !nextBtn || !track) return;

    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -420, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: 420, behavior: 'smooth' });
    });
  }

  /* ─── 10. SMOOTH SCROLL FOR ANCHOR LINKS ────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ─── INIT ──────────────────────────────────────── */
  function init() {
    initStickyHeader();
    initNav();
    initFaq();
    renderQuotes();
    initProcessPills();
    initSectionReveal();
    initCarousel();
    initZoom();
    initForms();
    initModals();
    initHeroThumbs();
    initIndustryArrows();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
