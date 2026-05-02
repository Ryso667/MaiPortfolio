// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? (spans[0].style.transform = 'translateY(6.5px) rotate(45deg)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)')
      : (spans[0].style.transform = '', spans[1].style.opacity = '', spans[2].style.transform = '');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ─── ACTIVE NAV LINK ───
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── SKILL BAR ANIMATION ───
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.skill-bar-fill');
      if (fill) fill.style.width = fill.dataset.pct + '%';
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-wrap').forEach(el => skillObserver.observe(el));

// ─── CONTACT FORM VALIDATION ───
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = ['name', 'email', 'message'];

    fields.forEach(f => {
      const input = document.getElementById(f);
      const error = document.getElementById(f + 'Error');
      if (!input.value.trim()) {
        error.style.display = 'block';
        input.style.borderColor = '#c44';
        valid = false;
      } else if (f === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error.style.display = 'block';
        error.textContent = 'Adresse email invalide.';
        input.style.borderColor = '#c44';
        valid = false;
      } else {
        error.style.display = 'none';
        input.style.borderColor = '';
      }
    });

    if (valid) {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }
  });
}

// ─── TYPING EFFECT (hero) ───
const typingEl = document.querySelector('.typing-effect');
if (typingEl) {
  const words = ['Développeur Web', 'Créateur UI/UX', 'Passionné du Code'];
  let wIdx = 0, cIdx = 0, deleting = false;
  function type() {
    const word = words[wIdx];
    typingEl.textContent = deleting ? word.substring(0, cIdx--) : word.substring(0, cIdx++);
    if (!deleting && cIdx === word.length + 1) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();
}

// ─── CURSOR GLOW & PARALLAX (desktop) ───
if (window.innerWidth > 900) {
  // Cursor Glow
  const glow = document.createElement('div');
  glow.style.cssText = `position:fixed;width:400px;height:400px;background:radial-gradient(circle,rgba(196,122,154,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:9998;transition:transform 0.1s ease;transform:translate(-50%,-50%)`;
  document.body.appendChild(glow);

  const circle1 = document.querySelector('.hero-bg-circle');
  const circle2 = document.querySelector('.hero-bg-circle2');

  document.addEventListener('mousemove', e => {
    // Glow update
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';

    // Parallax update
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
    
    if (circle1) circle1.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
    if (circle2) circle2.style.transform = `translate(${x * -1.5}px, ${y * -1.5}px)`;
  });
}
