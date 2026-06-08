/* ══════════════════════════════════════
CASE STUDY PAGE - MAIN SCRIPT
══════════════════════════════════════ */

/* ── THEME TOGGLE (inherit from portfolio) ──────────────────────── */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

// Load saved preference or system preference
const saved = localStorage.getItem('portfolio-theme');
const sys = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
html.dataset.theme = saved || sys;

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
        html.dataset.theme = next;
        localStorage.setItem('portfolio-theme', next);
    });
}

/* ── PROGRESS BAR ──────────────────────────────────────────────── */
const progressBar = document.getElementById('progress');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* ── NAV SCROLL EFFECT ─────────────────────────────────────────── */
const nav = document.getElementById('nav');

if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/* ── HERO ANIMATIONS ON PAGE LOAD ──────────────────────────────── */
// Simple JavaScript-based animations for hero elements
function animateHeroElements() {
    const elements = [
        { el: document.querySelector('.hero-eyebrow'), delay: 0 },
        { el: document.querySelector('.hero h1'), delay: 160 },
        { el: document.querySelector('.hero-sub'), delay: 320 },
        { el: document.querySelector('.hero-meta'), delay: 480 }
    ];

    elements.forEach(({ el, delay }) => {
        if (!el) return;

        // Set initial hidden state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        // Animate in after delay
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, delay);
    });
}

// Run animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateHeroElements);
} else {
    animateHeroElements();
}

/* ── CUSTOM CURSOR ANIMATION ──────────────────────────────────── */
function setupCursorAnimation() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const dot = document.getElementById('c-dot');
    const ring = document.getElementById('c-ring');

    if (!dot || !ring) return;

    let mx = window.innerWidth / 2,
        my = window.innerHeight / 2;
    let rx = mx,
        ry = my;
    let ticking = false;

    const updateCursor = () => {
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ticking = false;
    };

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!ticking) {
            requestAnimationFrame(updateCursor);
            ticking = true;
        }
    });

    (function lerp() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(lerp);
    })();

    // Cache interactive elements
    const interactiveEls = document.querySelectorAll(
        'a, button, .screen-card, .audit-card, .pso-card, .dec, .learning, .footer-link'
    );

    interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () =>
            document.body.classList.add('cur-lg')
        );
        el.addEventListener('mouseleave', () =>
            document.body.classList.remove('cur-lg')
        );
    });
}

// Setup cursor animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCursorAnimation);
} else {
    setupCursorAnimation();
}

/* ── SCROLL REVEALS & ANIMATED COUNTERS ────────────────────────── */
function runCounter(el, target) {
    let start = null;
    const dur = 1600;
    (function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = el.dataset.prefix || '' + Math.floor(ease * target) + (el.dataset.suffix || '');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = (el.dataset.prefix || '') + target + (el.dataset.suffix || '');
    })(performance.now());
}

// Setup reveal animations with transitions
function setupRevealAnimations() {
    const revEls = document.querySelectorAll('.reveal');
    revEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

// Scroll reveals
const revEls = document.querySelectorAll('.reveal');
const cntEls = document.querySelectorAll('[data-target]');

const animationIO = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                // Handle scroll reveals
                if (e.target.classList.contains('reveal')) {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                    e.target.classList.add('on');
                }
                // Handle counters
                if (e.target.hasAttribute('data-target')) {
                    const target = parseInt(e.target.dataset.target);
                    runCounter(e.target, target);
                    e.target.classList.add('counted');
                }
                animationIO.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1 }
);

revEls.forEach((el) => animationIO.observe(el));
cntEls.forEach((el) => animationIO.observe(el));

// Setup reveal animations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRevealAnimations);
} else {
    setupRevealAnimations();
}

/* ── SMOOTH SCROLL ────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href !== '#') {
            const t = document.querySelector(href);
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ── CALLOUT ANIMATIONS ON SCROLL ──────────────────────────────── */
// Setup callout initial states
function setupCalloutAnimations() {
    const calloutItems = document.querySelectorAll('.callout-item');
    calloutItems.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-12px)';
        el.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

const calloutItems = document.querySelectorAll('.callout-item');

const calloutIO = new IntersectionObserver(
    (entries) => {
        entries.forEach((e, idx) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateX(0)';
                    e.target.classList.add('on');
                }, idx * 60);
                calloutIO.unobserve(e.target);
            }
        });
    },
    { threshold: 0.15 }
);

calloutItems.forEach((el) => calloutIO.observe(el));

// Setup callout animations on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCalloutAnimations);
} else {
    setupCalloutAnimations();
}

/* ── PREFERS REDUCED MOTION ────────────────────────────────────── */
const prefersReducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotionMedia) {
    document.documentElement.style.scrollBehavior = 'auto';

    // Show hero elements immediately
    const heroElements = [
        '.hero-eyebrow', '.hero h1', '.hero-sub', '.hero-meta'
    ];
    heroElements.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'none';
        }
    });

    // Show all reveals immediately
    revEls.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none';
        el.classList.add('on');
    });

    // Show all callouts immediately
    calloutItems.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
        el.style.transition = 'none';
        el.classList.add('on');
    });
}
