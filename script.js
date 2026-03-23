/* ═══════════════════════════════════════
   RAHUL PORTFOLIO — script.js
═══════════════════════════════════════ */

/* ── Typewriter effect ── */
const roles = [
  "Data Scientist",
  "ML Engineer",
  "Data Analyst",
  "Deep Learning Engineer",
  "NLP Engineer",
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  if (!typeEl) return;
  const current = roles[roleIndex];
  typeEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;   // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }
  setTimeout(typeWriter, speed);
}
typeWriter();

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Hamburger Menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '0'; navLinks.style.right = '0';
  navLinks.style.background = 'var(--navy-mid)';
  navLinks.style.padding = '1.5rem 5%';
  navLinks.style.borderBottom = '1px solid var(--border)';
});

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(current); }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statObserver.observe(statsEl);

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = scrollY >= top && scrollY < bottom ? 'var(--white)' : '';
    }
  });
});

/* ── Smooth reveal stagger on load ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});