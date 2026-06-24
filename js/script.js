// ─── DOM Elements ──────────────────────────────────────
const menuToggle      = document.getElementById('menuToggle');
const navLinks        = document.getElementById('navLinks');
const scrollIndicator = document.getElementById('scrollIndicator');
const navbar          = document.getElementById('navbar');
const backToTop       = document.getElementById('backToTop');
const cursorDot       = document.getElementById('cursorDot');
const copyEmail       = document.getElementById('copyEmail');
const copyBadge       = document.getElementById('copyBadge');
const typewriterEl    = document.getElementById('typewriter');

// ─── Mobile Menu ────────────────────────────────────────
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ─── Smooth Scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

// ─── Scroll Indicator ───────────────────────────────────
scrollIndicator?.addEventListener('click', () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// ─── Scroll Events ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Hide/show scroll indicator
  if (scrollIndicator) {
    scrollIndicator.style.opacity    = y > 80 ? '0' : '1';
    scrollIndicator.style.visibility = y > 80 ? 'hidden' : 'visible';
  }

  // Navbar shrink
  navbar.classList.toggle('scrolled', y > 60);

  // Back-to-top button
  backToTop.classList.toggle('visible', y > 400);

  // Active nav link tracking
  const sections = document.querySelectorAll('section');
  const anchors  = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 130) current = s.id;
  });
  anchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// Set first link active on load
document.querySelector('.nav-links a')?.classList.add('active');

// Remove stats observer (stats removed from DOM)
// statsObserver and animateCounter still defined but infoStats will be null — safe to leave

// ─── Back to Top ────────────────────────────────────────
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── IntersectionObserver: slide-up ─────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const delay = siblings.indexOf(entry.target) * 80;
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// ─── Custom Cursor ───────────────────────────────────────
if (window.matchMedia('(hover: hover)').matches && cursorDot) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
  });
  const hoverTargets = 'a, button, .skill-tag, .cert-badge, .activity-card, .filter-tab, .article-card, .article-placeholder';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('expanded'));
  });
}

// ─── Typewriter ─────────────────────────────────────────
const roles = [
  'AI/ML & Full-Stack Developer',
  'Machine Learning Engineer',
  'Computer Vision Researcher',
  'NLP Enthusiast',
  'Builder & Writer'
];
let rIdx = 0, cIdx = 0, deleting = false;

function typeWriter() {
  const role = roles[rIdx];
  typewriterEl.textContent = deleting ? role.slice(0, cIdx - 1) : role.slice(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;
  if (!deleting && cIdx === role.length) {
    deleting = true;
    setTimeout(typeWriter, 1900);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
  }
  setTimeout(typeWriter, deleting ? 38 : 75);
}
typeWriter();

// ─── Animated Counter for Info Panel Stats ───────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = String(target).includes('.');
  const duration = 1200;
  const step = 20;
  const steps = duration / step;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.info-stat-num[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const infoStats = document.querySelector('.info-stats');
if (infoStats) statsObserver.observe(infoStats);

// ─── Skill Filter Tabs ───────────────────────────────────
const filterTabs  = document.querySelectorAll('.filter-tab');
const skillCards  = document.querySelectorAll('.skill-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    skillCards.forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
    });
  });
});

// ─── Project Filter Tabs ─────────────────────────────────
const projectFilterTabs = document.querySelectorAll('.project-filter-tab');
const projectCards      = document.querySelectorAll('.project-card-wrapper');

projectFilterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    projectFilterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
    });
  });
});

// ─── Skill Tag Toggle ────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => tag.classList.toggle('active'));
});


// ─── Click-to-Copy Email ─────────────────────────────────
if (copyEmail && copyBadge) {
  copyEmail.addEventListener('click', () => {
    const email = 'reddysathvik2005@gmail.com';
    navigator.clipboard.writeText(email)
      .then(() => {
        copyBadge.classList.add('show');
        setTimeout(() => copyBadge.classList.remove('show'), 2000);
      })
      .catch(() => {
        const el = document.createElement('textarea');
        el.value = email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        copyBadge.classList.add('show');
        setTimeout(() => copyBadge.classList.remove('show'), 2000);
      });
  });
}