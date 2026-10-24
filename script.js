// RO SOFTWARES - Clean, Lightweight Interactions & Theme Management

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dual Theme Switcher (Dark & White / Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  // Retrieve saved preference or default to dark
  const currentTheme = localStorage.getItem('ro_theme') || 'dark';
  applyTheme(currentTheme);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ro_theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = root.getAttribute('data-theme') || 'dark';
      const target = active === 'dark' ? 'light' : 'dark';
      applyTheme(target);
    });
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const feedback = document.getElementById('formFeedback');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (feedback) {
          feedback.classList.remove('hidden');
        }
        contactForm.reset();

        setTimeout(() => {
          if (feedback) {
            feedback.classList.add('hidden');
          }
        }, 7000);
      }, 900);
    });
  }

  // 4. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. Interactive Project Screenshot Switchers & Lightbox Modal (Gym & Team Tameer)
  const screensWrappers = document.querySelectorAll('.project-screens-wrapper');
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  function openLightbox(src, caption) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption || 'Project Screenshot';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  screensWrappers.forEach(wrapper => {
    const mainImg = wrapper.querySelector('.active-preview-img');
    const displayBox = wrapper.querySelector('.screen-display');
    const tabs = wrapper.querySelectorAll('.thumb-tab');

    let currentCaption = tabs[0] ? tabs[0].getAttribute('data-caption') : 'Project Screenshot';

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const newSrc = tab.getAttribute('data-src');
        currentCaption = tab.getAttribute('data-caption') || 'Project Screenshot';

        if (mainImg) {
          mainImg.style.opacity = '0.35';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });

    if (displayBox && mainImg) {
      displayBox.addEventListener('click', () => {
        openLightbox(mainImg.src, currentCaption);
      });
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
