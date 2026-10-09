```javascript
/* Swat Model School — reliable interactions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initMobileMenu();
    initNavigation();
    initScrollReveal();
    initAdmissionForm();
    initKeyboardControls();
    initWelcomePopup();
    initCampusSwitcher();
    initGalleryFallbacks();
  });

  /* PRELOADER */
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;

    function hide() {
      preloader.classList.add('hide');
    }

    window.addEventListener('load', function () {
      setTimeout(hide, 250);
    });

    setTimeout(hide, 2200);
  }

  /* WELCOME POPUP */
  function initWelcomePopup() {
    var modal = document.getElementById('welcomeModal');
    if (!modal) return;

    try {
      if (!sessionStorage.getItem('smsWelcomeShown')) {
        setTimeout(function () {
          openModal('welcomeModal');
          sessionStorage.setItem('smsWelcomeShown', 'true');
        }, 2500);
      }
    } catch (e) {
      /* Storage may be unavailable; page remains usable. */
    }
  }

  /* MOBILE MENU */
  function initMobileMenu() {
    var nav = document.getElementById('mainNav');
    var button = document.querySelector('.mobile-menu');

    if (!nav || !button) return;

    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mainNav');

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    var nav = document.getElementById('mainNav');
    var button = document.querySelector('.mobile-menu');

    if (nav) nav.classList.remove('show');

    if (button) {
      button.setAttribute('aria-expanded', 'false');

      var icon = button.querySelector('i');

      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  }

  /* MOBILE MENU TOGGLE */
  window.toggleMenu = function () {
    var nav = document.getElementById('mainNav');
    var button = document.querySelector('.mobile-menu');

    if (!nav) return;

    var open = !nav.classList.contains('show');
    nav.classList.toggle('show', open);

    if (button) {
      button.setAttribute('aria-expanded', String(open));

      var icon = button.querySelector('i');

      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-xmark', open);
      }
    }
  };

  /* ACTIVE NAVIGATION */
  function initNavigation() {
    var sections = Array.prototype.slice.call(
      document.querySelectorAll('section[id]')
    );

    var links = document.querySelectorAll(
      '#mainNav .nav-link[href^="#"]'
    );

    if (!sections.length || !links.length) return;

    function update() {
      var y = window.scrollY + 150;
      var current = 'home';

      sections.forEach(function (section) {
        if (
          y >= section.offsetTop &&
          y < section.offsetTop + section.offsetHeight
        ) {
          current = section.id;
        }
      });

      links.forEach(function (link) {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + current
        );
      });
    }

    window.addEventListener('scroll', update, {
      passive: true
    });

    update();
  }

  /* SCROLL REVEAL ANIMATIONS */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.scroll-reveal');

    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* OPEN MODAL */
  window.openModal = function (id) {
    var modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add('show');
    document.body.classList.add('modal-open');

    var close = modal.querySelector('.modal-close');

    if (close) {
      setTimeout(function () {
        close.focus();
      }, 80);
    }
  };

  /* CLOSE MODAL */
  window.closeModal = function (id) {
    var modal = document.getElementById(id);

    if (modal) {
      modal.classList.remove('show');
    }

    if (
      !document.querySelector('.modal.show') &&
      !document.querySelector('.lightbox.show')
    ) {
      document.body.classList.remove('modal-open');
    }
  };

  /* CLOSE MODAL WHEN CLICKING OUTSIDE */
  document.addEventListener('click', function (event) {
    if (
      event.target.classList &&
      event.target.classList.contains('modal')
    ) {
      event.target.classList.remove('show');

      if (
        !document.querySelector('.modal.show') &&
        !document.querySelector('.lightbox.show')
      ) {
        document.body.classList.remove('modal-open');
      }
    }
  });

  /* TEACHER PROFILE MODAL */
  window.openTeacher = function (
    name,
    role,
    description,
    icon
  ) {
    setText('teacherModalName', name);
    setText('teacherModalRole', role);
    setText('teacherModalDescription', description);
    setText('teacherModalDepartment', role);

    var iconEl = document.getElementById('teacherModalIcon');

    if (iconEl) {
      iconEl.className =
        'fa-solid ' + (icon || 'fa-chalkboard-user');
    }

    openModal('teacherModal');
  };

  /* TOP STUDENT MODAL */
  window.openStudent = function (
    image,
    name,
    achievement,
    description
  ) {
    var img = document.getElementById('studentModalImage');

    if (img) {
      img.src = image;
    }

    setText('studentModalName', name);
    setText('studentModalAchievement', achievement);
    setText('studentModalDescription', description);

    openModal('studentModal');
  };

  /* UPDATE TEXT SAFELY */
  function setText(id, value) {
    var el = document.getElementById(id);

    if (el) {
      el.textContent = value || '';
    }
  }

  /* OPEN GALLERY LIGHTBOX */
  window.openLightbox = function (src) {
    var lightbox = document.getElementById('lightbox');
    var image = document.getElementById('lightboxImage');

    if (!lightbox || !image || !src) return;

    image.src = src;
    lightbox.classList.add('show');
    document.body.classList.add('modal-open');
  };

  /* CLOSE GALLERY LIGHTBOX */
  window.closeLightbox = function (event) {
    if (event) {
      event.stopPropagation();
    }

    var lightbox = document.getElementById('lightbox');

    if (lightbox) {
      lightbox.classList.remove('show');
    }

    if (!document.querySelector('.modal.show')) {
      document.body.classList.remove('modal-open');
    }
  };

  /* KEYBOARD CONTROLS */
  function initKeyboardControls() {
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;

      var modal = document.querySelector('.modal.show');

      if (modal) {
        modal.classList.remove('show');
      }

      var lightbox = document.getElementById('lightbox');

      if (lightbox) {
        lightbox.classList.remove('show');
      }

      document.body.classList.remove('modal-open');
      closeMobileMenu();
    });
  }

  /* CAMPUS SWITCHER AND GALLERIES */
  function initCampusSwitcher() {
    var initial = 'girls';

    document.querySelectorAll(
      '.campus-option[data-campus]'
    ).forEach(function (button) {
      button.addEventListener('click', function () {
        window.switchCampus(button.dataset.campus);
      });
    });

    var select = document.getElementById('admissionCampus');

    if (select) {
      select.addEventListener('change', function () {
        window.switchCampus(
          select.value.toLowerCase().indexOf('boys') === 0
            ? 'boys'
            : 'girls',
          false
        );
      });
    }

    window.switchCampus = function (campus, updateSelect) {
      campus = campus === 'boys' ? 'boys' : 'girls';

      document.querySelectorAll(
        '.campus-option[data-campus]'
      ).forEach(function (button) {
        var active = button.dataset.campus === campus;

        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      /* Show the selected campus gallery */
      document.querySelectorAll(
        '[data-gallery-campus]'
      ).forEach(function (panel) {
        panel.hidden = panel.dataset.galleryCampus !== campus;
      });

      setText(
        'campusSelectedTitle',
        campus === 'girls' ? 'Girls Campus' : 'Boys Campus'
      );

      setText(
        'campusSelectedDescription',
        campus === 'girls'
          ? 'Explore the Girls Campus of Swat Model School, with classes from Nursery to Class 10.'
          : 'Explore the Boys Campus of Swat Model School, with classes from Nursery to Class 10.'
      );

      var badge = document.getElementById('heroBadgeText');

      if (badge) {
        badge.textContent =
          campus === 'girls' ? 'Girls Campus' : 'Boys Campus';
      }

      var heroImage = document.querySelector('.hero-bg img');

      if (heroImage) {
        heroImage.src =
          campus === 'girls'
            ? 'school-building-1.png'
            : 'school-building-2.png';

        heroImage.alt =
          'Swat Model School ' +
          (campus === 'girls' ? 'Girls' : 'Boys') +
          ' Campus';
      }

      var heroBright = document.getElementById('heroBrightText');

      if (heroBright) {
        heroBright.textContent =
          campus === 'girls' ? 'Bright Futures' : 'Future Leaders';
      }

      if (select && updateSelect !== false) {
        select.value =
          campus === 'girls' ? 'Girls Campus' : 'Boys Campus';
      }

      var galleryTitle = document.querySelector(
        '[data-gallery-campus="' +
          campus +
          '"] .campus-gallery-heading h3'
      );

      if (galleryTitle) {
        galleryTitle.textContent =
          campus === 'girls'
            ? 'Girls Campus Gallery'
            : 'Boys Campus Gallery';
      }
    };

    window.switchCampus(initial);
  }

  /* FALLBACK FOR MISSING GALLERY PHOTOS */
  function initGalleryFallbacks() {
    document.querySelectorAll(
      '.campus-gallery-item img[data-fallback]'
    ).forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.didFallback === '1') return;

        img.dataset.didFallback = '1';
        img.src = img.dataset.fallback;
      });
    });
  }

  /* ONLINE ADMISSION FORM — WEB3FORMS */
  function initAdmissionForm() {
    var form = document.getElementById('admissionForm');
    var resultBox = document.getElementById('admissionResult');
    var submit = document.getElementById('admissionSubmit');

    if (!form || !resultBox || !submit) return;

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      resultBox.className = 'admission-result';
      resultBox.textContent = '';

      submit.disabled = true;

      var text = submit.querySelector('.submit-text');
      var loading = submit.querySelector('.submit-loading');

      if (text) {
        text.style.display = 'none';
      }

      if (loading) {
        loading.style.display = 'inline';
      }

      try {
        var response = await fetch(
          'https://api.web3forms.com/submit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(
              Object.fromEntries(
                new FormData(form).entries()
              )
            )
          }
        );

        var data = await response.json();

        if (response.ok && data.success) {
          resultBox.className =
            'admission-result success';

          resultBox.textContent =
            'Application submitted successfully! Thank you. Our administration will contact you soon.';

          form.reset();

          setTimeout(function () {
            closeModal('admissionModal');
            resultBox.className = 'admission-result';
            resultBox.textContent = '';
          }, 6000);

        } else {
          resultBox.className =
            'admission-result error';

          resultBox.textContent =
            data.message ||
            'Submission failed. Please try again or contact the school.';
        }

      } catch (error) {
        resultBox.className =
          'admission-result error';

        resultBox.textContent =
          'Unable to submit right now. Check your internet connection and try again.';

      } finally {
        submit.disabled = false;

        if (text) {
          text.style.display = 'inline';
        }

        if (loading) {
          loading.style.display = 'none';
        }
      }
    });
  }

  /* HANDLE IMAGE LOADING ERRORS */
  document.addEventListener(
    'error',
    function (event) {
      if (
        event.target &&
        event.target.tagName === 'IMG'
      ) {
        event.target.classList.add('image-load-error');
      }
    },
    true
  );

})();

console.log(
  '%cSwat Model School',
  'color:#1769e0;font-size:20px;font-weight:bold;'
);
```
