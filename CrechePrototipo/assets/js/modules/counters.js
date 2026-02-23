export function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = prefix + Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target + suffix;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}