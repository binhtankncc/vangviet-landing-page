// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((el, index) => {
  // Add stagger delay based on position within parent
  const parent = el.parentElement;
  const siblings = parent.querySelectorAll('.reveal');
  const siblingIndex = Array.from(siblings).indexOf(el);
  el.dataset.delay = siblingIndex * 100;
  revealObserver.observe(el);
});

// ===== HAMBURGER MENU (MOBILE) =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startValue + (target - startValue) * eased);
    
    element.textContent = current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Observe stat numbers for counter animation
const statElements = document.querySelectorAll('.hero-stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.textContent;
      // Parse the number from text like "15+", "50K+", "99.99%"
      if (text.includes('K')) {
        animateCounter(entry.target, 50, 'K+');
      } else if (text.includes('%')) {
        // Don't animate percentage, just show it
      } else if (text.includes('+')) {
        animateCounter(entry.target, 15, '+');
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statElements.forEach(el => statsObserver.observe(el));

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// ===== GOLD PRICE SHIMMER EFFECT =====
const priceCards = document.querySelectorAll('.hero-floating-card');
priceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'rgba(212, 160, 23, 0.4)';
    card.style.boxShadow = '0 8px 32px rgba(212, 160, 23, 0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(212, 160, 23, 0.15)';
    card.style.boxShadow = 'var(--shadow-card)';
  });
});
