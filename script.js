/* ═══════════════════════════════════════════════
   NOOR AHMAD SIDDIQUE — 2026 Futuristic Portfolio
   ═══════════════════════════════════════════════ */

const API_BASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL)
  ? CONFIG.API_BASE_URL : 'http://localhost:5000/api';

// ══ DOM ══
const loader       = document.getElementById('loader');
const header       = document.getElementById('header');
const navMenu      = document.getElementById('nav-menu');
const navToggle    = document.getElementById('nav-toggle');
const navClose     = document.getElementById('nav-close');
const navLinks     = document.querySelectorAll('.nav-link');
const backToTop    = document.getElementById('back-to-top');
const contactForm  = document.getElementById('contact-form');
const sections     = document.querySelectorAll('section[id]');
const themeToggle  = document.getElementById('theme-toggle');
const themeIcon    = document.getElementById('theme-icon');
const cursor       = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursor-follower');

// ══ Theme ══
function initTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon','fa-sun');
  }
}
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeIcon.classList.toggle('fa-moon', !isLight);
  themeIcon.classList.toggle('fa-sun', isLight);
  themeIcon.style.transform = 'rotate(360deg)';
  setTimeout(() => themeIcon.style.transform = '', 400);
}
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
initTheme();

// ══ Custom Cursor ══
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      cursorFollow.style.left = e.clientX + 'px';
      cursorFollow.style.top  = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a,button,.bento-card,.project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px'; cursor.style.height = '18px';
      cursorFollow.style.width = '50px'; cursorFollow.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = ''; cursor.style.height = '';
      cursorFollow.style.width = ''; cursorFollow.style.height = '';
    });
  });
}

// ══ Loader ══
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    initAnimations();
    startTerminal();
    initNeuralNet();
    animateSkillBars();
    animateLanguageBars();
    startTypedRole();
  }, 900);
});

// ══ Scroll ══
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 50);
  backToTop && backToTop.classList.toggle('visible', y > 500);
  updateActiveNav();
});

// ══ Nav ══
navToggle && navToggle.addEventListener('click', () => {
  navMenu.classList.add('open');
  document.body.classList.add('no-scroll');
});
navClose && navClose.addEventListener('click', closeNav);
navLinks.forEach(l => l.addEventListener('click', closeNav));
document.addEventListener('click', e => {
  if (navMenu && !navMenu.contains(e.target) && navToggle && !navToggle.contains(e.target))
    closeNav();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
function closeNav() {
  navMenu && navMenu.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

function updateActiveNav() {
  const y = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (y >= top && y < top + sec.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
      });
    }
  });
}

// ══ Smooth scroll ══
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  });
});

// ══ Typed Role ══
function startTypedRole() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const words = ['Aspiring AI Engineer','Software Developer','Robotic AI Engineer','Web Developer','HVAC Technician'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi % words.length];
    el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
    if (!deleting && ci === word.length) { deleting = true; return setTimeout(type, 1800); }
    if (deleting && ci === 0) { deleting = false; wi++; return setTimeout(type, 400); }
    setTimeout(type, deleting ? 45 : 90);
  }
  type();
}

// ══ Terminal Animation ══
function startTerminal() {
  const lines = [
    { cmd: 'whoami', out: '→ noor_ahmad_siddique @ AI Engineer' },
    { cmd: 'python3 agent.py --mode autonomous', out: '→ Agent initialized. Tools: 12. Status: READY' },
    { cmd: 'git push origin master --portfolio', out: '→ Deployed to vercel. 200 OK ✓' },
  ];
  let i = 0;
  function typeCmd(id, text, cb) {
    const el = document.getElementById(id);
    if (!el) return cb && cb();
    let j = 0;
    const iv = setInterval(() => {
      el.textContent = text.slice(0, ++j);
      if (j === text.length) { clearInterval(iv); cb && setTimeout(cb, 150); }
    }, 55);
  }
  function showOut(id, cb) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('show'); }
    setTimeout(cb, 600);
  }
  function next() {
    if (i >= lines.length) { i = 0; setTimeout(resetTerminal, 2000); return; }
    const { cmd, out } = lines[i];
    const ci = i + 1;
    document.getElementById(`t-out${ci}`) && (document.getElementById(`t-out${ci}`).textContent = out);
    typeCmd(`t-line${ci}`, cmd, () => showOut(`t-out${ci}`, () => { i++; next(); }));
  }
  next();
}
function resetTerminal() {
  for (let i = 1; i <= 3; i++) {
    const cmd = document.getElementById(`t-line${i}`);
    const out = document.getElementById(`t-out${i}`);
    if (cmd) cmd.textContent = '';
    if (out) { out.textContent = ''; out.classList.remove('show'); }
  }
  setTimeout(startTerminal, 300);
}

// ══ Neural Network Canvas ══
function initNeuralNet() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth, H = 180;
  canvas.width = W; canvas.height = H;

  const NODE_COUNT = 22;
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 3 + 2,
    pulse: Math.random() * Math.PI * 2,
  }));

  const COLORS = ['#00d4ff','#7c3aed','#e879f9','#06b6d4','#a78bfa'];

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          const alpha = (1 - d / 130) * 0.35;
          const ci = (i + j) % COLORS.length;
          ctx.beginPath();
          ctx.strokeStyle = COLORS[ci].replace(')', `,${alpha})`).replace('rgb','rgba').replace('#','').replace(/([a-f0-9]{2})/gi, (m) => parseInt(m,16) + ',');
          // simpler color approach
          ctx.strokeStyle = `rgba(${hexToRgb(COLORS[ci])},${alpha})`;
          ctx.lineWidth = alpha * 1.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Nodes
    nodes.forEach((n, idx) => {
      n.pulse += 0.04;
      const glow = Math.sin(n.pulse) * 0.5 + 0.5;
      const color = COLORS[idx % COLORS.length];
      const rr = hexToRgb(color);

      // Outer glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
      grad.addColorStop(0, `rgba(${rr},${glow * 0.5})`);
      grad.addColorStop(1, `rgba(${rr},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rr},${0.7 + glow * 0.3})`;
      ctx.fill();

      // Move
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ══ Scroll Animations ══
function initAnimations() {
  const selectors = [
    '.hero-info', '.hero-visual',
    '.about-image-wrap', '.about-content',
    '.bento-card',
    '.skills-category',
    '.timeline-item',
    '.certification-card',
    '.project-card',
    '.contact-info', '.contact-form-wrapper',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });
  document.querySelectorAll('.about-image-wrap').forEach(el => {
    el.classList.remove('fade-in'); el.classList.add('slide-in-left');
  });
  document.querySelectorAll('.about-content').forEach(el => {
    el.classList.remove('fade-in'); el.classList.add('slide-in-right');
  });
  observeAll();
}

function observeAll() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      if (entry.target.closest('.skills')) animateSkillBars();
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in,.slide-in-left,.slide-in-right').forEach(el => obs.observe(el));
}

// ══ Skill Bars ══
let skillsDone = false;
function animateSkillBars() {
  if (skillsDone) return; skillsDone = true;
  document.querySelectorAll('.skill-progress').forEach(bar => {
    setTimeout(() => bar.style.width = bar.dataset.progress + '%', 200);
  });
}
let langDone = false;
function animateLanguageBars() {
  if (langDone) return; langDone = true;
  document.querySelectorAll('.language-progress').forEach(bar => {
    setTimeout(() => bar.style.width = bar.dataset.progress + '%', 200);
  });
}

// Stats counter
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.textContent);
      const suffix = el.textContent.replace(/[0-9]/g,'');
      if (isNaN(target)) return;
      let cur = 0;
      const iv = setInterval(() => {
        cur += target / 40;
        el.textContent = Math.min(Math.floor(cur), target) + suffix;
        if (cur >= target) clearInterval(iv);
      }, 35);
    });
  }, { threshold: 0.5 }).observe(statsSection);
}

// ══ Contact Form ══
contactForm && contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  const status  = document.getElementById('form-status');
  clearErrors();

  let valid = true;
  if (!name.value.trim())    { showErr('name-error','Please enter your name');    name.style.borderColor='#f87171';    valid=false; }
  if (!email.value.trim())   { showErr('email-error','Please enter your email');  email.style.borderColor='#f87171';   valid=false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showErr('email-error','Invalid email'); email.style.borderColor='#f87171'; valid=false; }
  if (!subject.value.trim()) { showErr('subject-error','Please enter a subject'); subject.style.borderColor='#f87171'; valid=false; }
  if (!message.value.trim()) { showErr('message-error','Please enter a message');  message.style.borderColor='#f87171';valid=false; }

  if (!valid) return;

  const btn = this.querySelector('.btn-submit');
  const btnText = btn.querySelector('.btn-text');
  btnText.textContent = 'Sending...'; btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name:name.value.trim(), email:email.value.trim(), message:`Subject: ${subject.value.trim()}\n\n${message.value.trim()}` })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      status.textContent = 'Message sent! I\'ll get back to you soon.';
      status.className = 'form-status success';
      this.reset();
    } else throw new Error(data.message || 'Failed');
  } catch(err) {
    status.textContent = err.message || 'Failed to send. Please try again.';
    status.className = 'form-status error';
  } finally {
    btnText.textContent = 'Send Message'; btn.disabled = false;
    setTimeout(() => { status.textContent=''; status.className='form-status'; }, 5000);
  }
});

function showErr(id, msg) { const el = document.getElementById(id); if (el) el.textContent = msg; }
function clearErrors() {
  document.querySelectorAll('.form-error').forEach(e => e.textContent = '');
  document.querySelectorAll('.form-group input,.form-group textarea').forEach(f => f.style.borderColor = '');
}

// ══ Init ══
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('no-scroll');
  const year = document.querySelector('.copyright');
  if (year) year.innerHTML = `&copy; 2026 Noor Ahmad Siddique. All Rights Reserved.`;
  loadProjects();
});

// ══ Load Projects from backend ══
async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      const grid = document.querySelector('.projects-grid');
      if (!grid) return;
      grid.innerHTML = '';
      data.data.forEach(p => grid.appendChild(createProjectCard(p)));
      document.querySelectorAll('.project-card').forEach(c => c.classList.add('fade-in'));
      observeAll();
    }
  } catch { /* use static */ }
}

function createProjectCard(p) {
  const card = document.createElement('div');
  card.className = 'project-card';
  let icon = 'fas fa-code';
  if (p.title.toLowerCase().includes('ai')) icon = 'fas fa-brain';
  else if (p.title.toLowerCase().includes('hvac')) icon = 'fas fa-temperature-low';
  else if (p.title.toLowerCase().includes('portfolio')) icon = 'fas fa-globe';
  card.innerHTML = `
    <div class="project-image">
      ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover">` : `<div class="project-image-placeholder"><i class="${icon}"></i></div>`}
      <div class="project-overlay">
        ${p.liveLink ? `<a href="${p.liveLink}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
        ${p.githubLink ? `<a href="${p.githubLink}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-title">${p.title}</h3>
      <p class="project-description">${p.description}</p>
      <div class="project-tags">${p.technologies.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
      ${p.liveLink ? `<a href="${p.liveLink}" target="_blank" class="btn btn-small btn-outline"><i class="fas fa-eye"></i> View</a>` : `<button class="btn btn-small btn-disabled" disabled><i class="fas fa-clock"></i> Coming Soon</button>`}
    </div>`;
  return card;
}

console.log('%c [NOOR.AI] Portfolio Loaded ', 'background:#00d4ff;color:#04060f;padding:8px 16px;font-weight:bold;border-radius:4px');
