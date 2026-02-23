import { initMobileMenu, initScrollReveal } from './modules/ui.js';
import { initCounters } from './modules/counters.js';
import { initFormValidation } from './modules/form-validation.js';

document.addEventListener('DOMContentLoaded', () => {

  initMobileMenu('mobile-menu-btn', 'mobile-menu');
  initScrollReveal('.reveal');
  initCounters();
  initFormValidation('contactForm');

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled', 'py-2');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('scrolled', 'py-2');
      navbar.classList.add('py-4');
    }
  });

});