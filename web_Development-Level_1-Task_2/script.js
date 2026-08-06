/**
 * Personal Portfolio Website - JavaScript Logic
 * Developer: Upasana Roy (B.Tech CSE Student, RCCIIT Kolkata)
 * Features: Typing effect, scroll progress, scroll reveal, sticky nav, 
 *           active link highlighting, mobile menu toggle, modal & form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. HERO SECTION TYPING ANIMATION
     ------------------------------------------------------------------------ */
  const typingTextElement = document.getElementById('typing-text');
  const phrases = [
    'Software Engineer',
    'Frontend Developer',
    'CSE Student',
    'Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting characters
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deleting speed
    } else {
      // Adding characters
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Standard typing speed
    }

    // If phrase is completely typed
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Switch to next phrase after deletion
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing loop
  typeEffect();

  /* ------------------------------------------------------------------------
     2. SCROLL PROGRESS BAR & STICKY NAVBAR
     ------------------------------------------------------------------------ */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update scroll progress bar width
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky Navbar Background
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Show/Hide Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to Top Click Handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. MOBILE NAVIGATION MENU TOGGLE
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // Offset for navbar
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNavLink);

  /* ------------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.fade-in, .fade-in-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     5.5. PROJECT CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. PROJECT MODAL & TOAST HANDLERS
     ------------------------------------------------------------------------ */
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const toast = document.getElementById('toast');

  // Open Modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
      }
    });
  });

  // Close Modal Function
  function closeModal() {
    modalOverlays.forEach(overlay => {
      overlay.classList.remove('active');
    });
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  });

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Show Toast Message Function
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Live Demo Toast Trigger
  const demoButtons = document.querySelectorAll('.demo-toast-trigger');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('🚀 Live Demo environment launching soon! Check GitHub for source code.');
    });
  });

  /* ------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput, 'Please enter your full name.');
        isValid = false;
      } else {
        removeError(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        removeError(emailInput);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput, 'Please write your message.');
        isValid = false;
      } else {
        removeError(messageInput);
      }

      // If valid, simulate submission
      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
          showToast('✅ Thank you! Your message has been sent successfully to Upasana Roy.');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1200);
      }
    });
  }

  function setError(inputElement, message) {
    const formGroup = inputElement.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      const errorSpan = formGroup.querySelector('.error-msg');
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    }
  }

  function removeError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    if (formGroup) {
      formGroup.classList.remove('error');
    }
  }

});
