/* ══════════════════════════════════════
THEME TOGGLE
══════════════════════════════════════ */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');

// Load saved preference or system preference
const saved = localStorage.getItem('portfolio-theme');
const sys = window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
html.dataset.theme = saved || sys;

toggleBtn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('portfolio-theme', next);
});

/* ══════════════════════════════════════
CUSTOM CURSOR
══════════════════════════════════════ */
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const dot = document.getElementById('c-dot');
    const ring = document.getElementById('c-ring');
    // const spot = document.getElementById('spotlight');
    let mx = window.innerWidth / 2,
        my = window.innerHeight / 2;
    let rx = mx,
        ry = my;
    let ticking = false;

    const updateCursor = () => {
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        // spot.style.setProperty('--mx', mx + 'px');
        // spot.style.setProperty('--my', my + 'px');
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
        'a,button,.svc-card,.cs-vis,.p-step,.m-cell,.ic,.testi-card'
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

/* ══════════════════════════════════════
SCROLL REVEALS & ANIMATED COUNTERS (Consolidated)
══════════════════════════════════════ */
function runCounter(el, target) {
    let start = null;
    const dur = 1600;
    (function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
    })(performance.now());
}

// Single consolidated observer for both reveals and counters
const revEls = document.querySelectorAll('.rv,.rvl,.rvr');
const cntEls = document.querySelectorAll('.cnt,.cnt2');

const animationIO = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                // Handle scroll reveals
                if (e.target.classList.contains('rv') ||
                    e.target.classList.contains('rvl') ||
                    e.target.classList.contains('rvr')) {
                    const d = parseFloat(e.target.dataset.d || 0) * 80;
                    setTimeout(() => e.target.classList.add('on'), d);
                }
                // Handle counters
                if (e.target.classList.contains('cnt') ||
                    e.target.classList.contains('cnt2')) {
                    runCounter(e.target, +e.target.dataset.t);
                }
                animationIO.unobserve(e.target);
            }
        });
    },
    { threshold: 0.07 }
);

revEls.forEach((el) => animationIO.observe(el));
cntEls.forEach((el) => animationIO.observe(el));

/* ══════════════════════════════════════
PROCESS STEPS
══════════════════════════════════════ */
function setPStep(el) {
    document
        .querySelectorAll('.p-step')
        .forEach((s) => s.classList.remove('act'));
    el.classList.add('act');
}

/* ══════════════════════════════════════
SMOOTH SCROLL
══════════════════════════════════════ */
// Native CSS smooth scroll is used; this is a fallback for older browsers
// and handles only navigation anchors with custom logic if needed
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t && window.CSS && window.CSS.supports &&
            !window.CSS.supports('scroll-behavior', 'smooth')) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    });
});

/* ══════════════════════════════════════
HaierMall Case Study
══════════════════════════════════════ */

<script>
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── PROGRESS BAR ──────────────────────────────── */
const bar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
}, { passive: true });

/* ── NAV SCROLL ────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

if (noMotion) {
  document.querySelectorAll('.reveal, .callout-item, .hero-eyebrow, .hero h1, .hero-sub, .hero-meta').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else {
  gsap.registerPlugin(ScrollTrigger);

  /* ── HERO ────────────────────────────────────── */
  gsap.timeline({ delay: 0.1 })
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    .to('.hero h1',      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.45')
    .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45')
    .to('.hero-meta',    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');

  /* ── GENERIC REVEALS ─────────────────────────── */
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out'
    });
  });

  /* ── PSO STAGGER ─────────────────────────────── */
  gsap.fromTo('.pso-card',
    { opacity: 0, y: 20 },
    {
      scrollTrigger: { trigger: '.pso-grid', start: 'top 85%', once: true },
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1
    }
  );

  /* ── AUDIT STAGGER ───────────────────────────── */
  gsap.fromTo('.audit-card',
    { opacity: 0, y: 18 },
    {
      scrollTrigger: { trigger: '.audit-grid', start: 'top 85%', once: true },
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07
    }
  );

  /* ── DECISIONS STAGGER ───────────────────────── */
  gsap.fromTo('.dec',
    { opacity: 0, y: 16 },
    {
      scrollTrigger: { trigger: '.decisions', start: 'top 85%', once: true },
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08
    }
  );

  /* ── BEFORE/AFTER SCALE ──────────────────────── */
  gsap.fromTo('.ba-grid',
    { opacity: 0, scale: 0.98 },
    {
      scrollTrigger: { trigger: '.ba-grid', start: 'top 86%', once: true },
      opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out'
    }
  );

  /* ── CALLOUTS ────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#callouts',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.to('.callout-item', {
        opacity: 1, x: 0,
        duration: 0.45, ease: 'power2.out', stagger: 0.08, delay: 0.2
      });
    }
  });

  /* ── SCREEN CARDS ────────────────────────────── */
  document.querySelectorAll('.screen-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 20, scale: 0.99 },
      {
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, ease: 'power2.out', delay: i * 0.05
      }
    );
  });

  /* ── RESULTS COUNT-UP ────────────────────────── */
  ScrollTrigger.create({
    trigger: '#results-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.result-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          delay: 0.15,
          onUpdate() {
            el.textContent = prefix + Math.round(obj.val) + suffix;
          },
          onComplete() {
            el.textContent = prefix + target + suffix;
            el.closest('.result-cell').classList.add('counted');
          }
        });
      });
    }
  });

  /* ── LEARNINGS ───────────────────────────────── */
  gsap.fromTo('.learning',
    { opacity: 0, y: 18 },
    {
      scrollTrigger: { trigger: '.learnings-grid', start: 'top 85%', once: true },
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.09
    }
  );
}
</script>