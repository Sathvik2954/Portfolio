// ─── DOM Elements ───────────────────────────────────────
const menuToggle   = document.getElementById('menuToggle');
const navLinks     = document.getElementById('navLinks');
const scrollIndicator = document.getElementById('scrollIndicator');
const navbar       = document.getElementById('navbar');
const backToTop    = document.getElementById('backToTop');
const cursorDot    = document.getElementById('cursorDot');
const copyEmail    = document.getElementById('copyEmail');
const copyBadge    = document.getElementById('copyBadge');
const typewriterEl = document.getElementById('typewriter');

// ─── Mobile Menu Toggle ─────────────────────────────────
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

// ─── Smooth Scroll for Anchor Links ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            window.scrollTo({ top: targetEl.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// ─── Scroll Indicator Click ──────────────────────────────
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    });
}

// ─── Scroll Event ────────────────────────────────────────
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Hide scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.opacity  = scrollY > 100 ? '0' : '1';
        scrollIndicator.style.visibility = scrollY > 100 ? 'hidden' : 'visible';
    }

    // Navbar shrink on scroll
    navbar.classList.toggle('scrolled', scrollY > 60);

    // Back-to-top visibility
    backToTop.classList.toggle('visible', scrollY > 400);

    // Active nav link tracking
    const sections  = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Set first nav link active on load
document.querySelector('.nav-links a')?.classList.add('active');

// ─── Back to Top ─────────────────────────────────────────
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── IntersectionObserver for slide-up ──────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger within a group by index
            const delay = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target) * 80;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.12 });

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// ─── Custom Cursor Dot ────────────────────────────────────
if (window.matchMedia('(hover: hover)').matches && cursorDot) {
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });

    // Expand cursor over clickable elements
    const hoverTargets = 'a, button, .skill-tag, .project-card-wrapper, .cert-card, .edu-card, .activity-item, .filter-tab';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('expanded'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('expanded'));
    });
}

// ─── Typewriter Effect ────────────────────────────────────
const roles = [
    'AI/ML & Full-Stack Developer',
    'Machine Learning Engineer',
    'Computer Vision Researcher',
    'Full-Stack Developer',
    'NLP Enthusiast'
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typeSpeed   = 80;
const deleteSpeed = 40;
const pauseAfter  = 1800;

function typeWriter() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseAfter);
            return;
        }
    } else {
        typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
}

typeWriter();

// ─── Animated Count-up for Stats ────────────────────────
function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = String(target).includes('.');
    const duration = 1200;
    const step     = 20;
    const steps    = duration / step;
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
            entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── Skill Filter Tabs ───────────────────────────────────
const filterTabs = document.querySelectorAll('.filter-tab');
const skillCategories = document.querySelectorAll('.skill-category');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        skillCategories.forEach(cat => {
            if (filter === 'all' || cat.dataset.category === filter) {
                cat.classList.remove('hidden');
            } else {
                cat.classList.add('hidden');
            }
        });
    });
});

// ─── Skill Tag Toggle ────────────────────────────────────
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
    });
});

// ─── Click-to-Copy Email ─────────────────────────────────
if (copyEmail && copyBadge) {
    copyEmail.addEventListener('click', () => {
        navigator.clipboard.writeText('reddysathvik2005@gmail.com').then(() => {
            copyBadge.classList.add('show');
            setTimeout(() => copyBadge.classList.remove('show'), 2000);
        }).catch(() => {
            // Fallback for browsers without clipboard API
            const el = document.createElement('textarea');
            el.value = 'reddysathvik2005@gmail.com';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            copyBadge.classList.add('show');
            setTimeout(() => copyBadge.classList.remove('show'), 2000);
        });
    });
}