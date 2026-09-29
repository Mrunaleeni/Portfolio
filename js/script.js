/**
 * script.js — Mrunaleeni Bhilare Portfolio
 *
 * Features:
 *  1. Theme toggle (dark / light) — persisted in localStorage,
 *     defaults to OS preference
 *  2. Mobile navigation menu toggle
 *  3. Active nav-link highlight while scrolling (IntersectionObserver)
 *  4. Hero section reveal animation on page load
 *  5. Contact form validation → opens mailto with fields pre-filled
 *
 * ─────────────────────────────────────────────────────────────
 * HOW TO EDIT
 *  • To change the accent colour, edit --accent in css/style.css.
 *  • To add a nav section, add a <section id="…"> in index.html
 *    and a matching <a href="#…"> in the navbar.
 *  • The mailto recipient is set in the CONTACT_EMAIL constant below.
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */
const CONTACT_EMAIL  = 'mrunaleeni111@gmail.com';
const THEME_KEY      = 'mb-theme';          // localStorage key
const DARK           = 'dark';
const LIGHT          = 'light';


/* ============================================================
   UTILITY — query helpers
   ============================================================ */
/**
 * Shorthand for document.querySelector.
 * @param {string} sel  CSS selector
 * @param {Element} [ctx=document]  optional scope
 * @returns {Element|null}
 */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);

/**
 * Shorthand for document.querySelectorAll, returns an array.
 * @param {string} sel
 * @param {Element} [ctx=document]
 * @returns {Element[]}
 */
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


/* ============================================================
   1. THEME TOGGLE
   ============================================================ */
(function initTheme() {
  const btn  = qs('#theme-toggle');
  const html = document.documentElement;

  /**
   * Apply a theme to <html data-theme="…"> and update aria-label.
   * @param {string} theme  'dark' | 'light'
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    btn.setAttribute(
      'aria-label',
      theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  /**
   * Determine the starting theme:
   * 1. Honour a previously saved preference (localStorage).
   * 2. Fall back to the OS colour-scheme preference.
   * 3. Default to light.
   */
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === DARK || saved === LIGHT) return saved;

    // Check OS preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK;
    }
    return LIGHT;
  }

  // Apply on load
  applyTheme(getInitialTheme());

  // Toggle on button click
  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // React to OS-level changes (e.g. user switches system dark mode)
  // Only if the user hasn't explicitly chosen a theme themselves.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? DARK : LIGHT);
    }
  });
})();


/* ============================================================
   2. MOBILE MENU TOGGLE
   ============================================================ */
(function initMobileMenu() {
  const toggle   = qs('#menu-toggle');
  const navLinks = qs('#nav-links');

  if (!toggle || !navLinks) return;

  /** Open or close the mobile nav panel. */
  function setMenuOpen(open) {
    navLinks.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
  }

  // Button click
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    setMenuOpen(!isOpen);
  });

  // Close menu when a nav link is clicked (navigates to section)
  navLinks.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) {
      setMenuOpen(false);
    }
  });

  // Close menu when clicking outside the navbar
  document.addEventListener('click', e => {
    const navbar = qs('#navbar');
    if (navbar && !navbar.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
})();


/* ============================================================
   3. ACTIVE NAV LINK (IntersectionObserver)
   ============================================================ */
(function initActiveNav() {
  // All page sections that have a matching nav link
  const sections  = qsa('section[id]');
  const navLinks  = qsa('.nav-link');

  if (!sections.length || !navLinks.length) return;

  /**
   * Map section id → nav link element for fast lookups.
   * @type {Map<string, Element>}
   */
  const linkMap = new Map(
    navLinks.map(link => [link.getAttribute('data-section'), link])
  );

  /** Remove 'active' from all links. */
  function clearActive() {
    navLinks.forEach(l => l.classList.remove('active'));
  }

  /**
   * Mark the nav link for the given section id as active.
   * @param {string} id
   */
  function setActive(id) {
    clearActive();
    const link = linkMap.get(id);
    if (link) link.classList.add('active');
  }

  // rootMargin pushes the trigger line down by the navbar height
  // so a section is "active" when its top hits just below the nav.
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-64px 0px -55% 0px',
      threshold:  0,
    }
  );

  sections.forEach(sec => observer.observe(sec));
})();


/* ============================================================
   4. HERO REVEAL ANIMATION
   ============================================================ */
(function initHeroReveal() {
  // Respect prefers-reduced-motion — the CSS already disables the
  // transition, but we should also skip adding the class so the
  // element doesn't flicker.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = qs('.hero-animate');

  if (!hero) return;

  if (prefersReduced) {
    // CSS handles it, but make sure opacity:1 is set immediately.
    hero.classList.add('revealed');
    return;
  }

  // Small delay so the browser has painted the initial opacity:0 state
  // before we trigger the transition — avoids a flash on fast devices.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.classList.add('revealed');
    });
  });
})();


/* ============================================================
   5. CONTACT FORM — validation + mailto
   ============================================================ */
(function initContactForm() {
  const form       = qs('#contact-form');
  if (!form) return;

  const nameInput  = qs('#form-name',    form);
  const emailInput = qs('#form-email',   form);
  const msgInput   = qs('#form-message', form);

  const nameError  = qs('#name-error',    form);
  const emailError = qs('#email-error',   form);
  const msgError   = qs('#message-error', form);

  /* ── Validators ── */

  /** @param {string} value */
  const isEmpty = value => value.trim() === '';

  /** Very simple e-mail format check. */
  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  /* ── Show / clear a single field's error ── */

  /**
   * @param {HTMLElement} input
   * @param {HTMLElement} errorEl
   * @param {string}      message   empty string = clear the error
   */
  function setFieldError(input, errorEl, message) {
    errorEl.textContent = message;
    if (message) {
      input.classList.add('error');
      input.setAttribute('aria-describedby', errorEl.id);
    } else {
      input.classList.remove('error');
      input.removeAttribute('aria-describedby');
    }
  }

  /* ── Live validation: clear error as soon as the user types ── */
  nameInput.addEventListener('input',  () => setFieldError(nameInput,  nameError,  ''));
  emailInput.addEventListener('input', () => setFieldError(emailInput, emailError, ''));
  msgInput.addEventListener('input',   () => setFieldError(msgInput,   msgError,   ''));

  /* ── Submit ── */
  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;

    // Validate name
    if (isEmpty(nameInput.value)) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      valid = false;
    }

    // Validate email
    if (isEmpty(emailInput.value)) {
      setFieldError(emailInput, emailError, 'Please enter your email address.');
      valid = false;
    } else if (!isValidEmail(emailInput.value)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    }

    // Validate message
    if (isEmpty(msgInput.value)) {
      setFieldError(msgInput, msgError, 'Please write a message.');
      valid = false;
    }

    if (!valid) {
      // Focus the first invalid field so keyboard/screen-reader users
      // are taken directly to the problem.
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    /* ── Build mailto URI ── */
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${nameInput.value.trim()}`
    );

    // Include sender's name and email in the body so Mrunaleeni
    // knows who to reply to.
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\n` +
      `Email: ${emailInput.value.trim()}\n\n` +
      `${msgInput.value.trim()}`
    );

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Open the default mail client
    window.location.href = mailto;

    // Optional: provide friendly confirmation after a short delay
    // (the mailto open is async — we can't know if the app launched)
    setTimeout(() => {
      form.reset();
      // Clear any residual error states
      [nameInput, emailInput, msgInput].forEach(el => el.classList.remove('error'));
    }, 300);
  });
})();


/* ============================================================
   6. FOOTER — auto-update copyright year
   ============================================================ */
(function initFooterYear() {
  const yearEl = qs('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ============================================================
   7. NAVBAR SHADOW on scroll
   ============================================================ */
(function initNavbarScroll() {
  const navbar = qs('#navbar');
  if (!navbar) return;

  // Add a subtle extra shadow when the user has scrolled down
  // (gives the sticky nav more visual separation from content).
  function onScroll() {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.12)';
    } else {
      navbar.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
