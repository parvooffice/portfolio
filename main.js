/* =========================================================
   PM.ai — portfolio interactions
   Edit CONFIG below to update links + terminal content.
   ========================================================= */
(() => {
  'use strict';

  const CONFIG = {
    name: 'Prabhudatta Mishra',
    first: 'Prabhudatta',
    roles: [
      'Aspiring AI Engineer',
      'AWS Certified Solutions Architect',
      'AWS Certified AI Practitioner',
      'multi-agent systems builder',
      'where AI meets finance',
    ],
    // Public contact address. The email card stays hidden if this is empty.
    email: 'parvo.office@gmail.com',
    linkedin: 'https://www.linkedin.com/in/prabhudatta-mishra-35623644a/',
    github: 'https://github.com/parvooffice',
    location: 'Bhubaneswar, India',
    degree: 'B.Tech, Data Science @ VIT Vellore (Class of 2030)',
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- colors (read from CSS so god-mode recolors canvas) ---------- */
  const C = {};
  const hexToRgb = (h) => {
    h = h.trim().replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  function refreshColors() {
    const cs = getComputedStyle(root);
    C.cyan = hexToRgb(cs.getPropertyValue('--cyan') || '#00f0ff');
    C.mag = hexToRgb(cs.getPropertyValue('--mag') || '#ff2bd6');
    C.text = hexToRgb(cs.getPropertyValue('--text') || '#e9edf6');
    C.line = [130, 170, 255];
  }
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  refreshColors();

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg, ms = 2800) {
    const el = $('.toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), ms);
  }

  /* ---------- boot sequence ---------- */
  function boot(done) {
    const el = $('#boot');
    let seen = false;
    try { seen = sessionStorage.getItem('pm-booted') === '1'; } catch (e) { /* storage blocked */ }
    if (!el || reduce || seen) { if (el) el.remove(); done(); return; }

    document.body.classList.add('booting');
    const lines = [
      '<span class="ok">[  OK  ]</span> Initializing neural core…',
      '<span class="ok">[  OK  ]</span> Loading weights: prabhudatta-v1.safetensors',
      '<span class="ok">[  OK  ]</span> Mounting AWS credentials <span class="t-muted">(associate tier)</span>',
      '<span class="ok">[  OK  ]</span> Verifying certificate: aws_ai_practitioner.pem',
      '<span class="warn">[ WARN ]</span> Sleep schedule not found — continuing anyway',
      '<span class="ok">[  OK  ]</span> Calibrating curiosity module → 100%',
      '<span class="ok">[  OK  ]</span> Compiling ambition…',
      '<span class="grant">&gt;&gt; ACCESS GRANTED — welcome, human.</span>',
    ];
    const log = $('#boot-log'), fill = $('#boot-fill'), pct = $('#boot-pct');
    let i = 0, finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem('pm-booted', '1'); } catch (e) { /* ignore */ }
      el.classList.add('done');
      document.body.classList.remove('booting');
      removeEventListener('keydown', finish);
      setTimeout(() => el.remove(), 900);
      done();
    };
    const step = () => {
      if (finished) return;
      if (i < lines.length) {
        log.innerHTML += lines[i] + '\n';
        i++;
        const p = Math.round((i / lines.length) * 100);
        fill.style.width = p + '%';
        pct.textContent = p + '%';
        setTimeout(step, i === lines.length - 1 ? 420 : 170 + Math.random() * 160);
      } else {
        setTimeout(finish, 650);
      }
    };
    setTimeout(step, 250);
    addEventListener('keydown', finish);
    el.addEventListener('click', finish);
  }

  /* ---------- typewriter ---------- */
  function typewriter() {
    const el = $('#typed');
    if (!el) return;
    if (reduce) { el.textContent = CONFIG.roles[0]; return; }
    let w = 0, c = 0, del = false;
    el.textContent = '';
    const tick = () => {
      const word = CONFIG.roles[w];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let t = del ? 32 : 65 + Math.random() * 40;
      if (!del && c >= word.length) { t = 1700; del = true; }
      else if (del && c <= 0) { del = false; w = (w + 1) % CONFIG.roles.length; t = 350; }
      setTimeout(tick, t);
    };
    tick();
  }

  /* ---------- neural network hero canvas ---------- */
  function neural() {
    const cv = $('#neural');
    const hero = $('#hero');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const LAYERS = [4, 6, 9, 9, 6, 3];
    const IN = ['data', 'code', 'coffee', 'curiosity'];
    const OUT = ['LEARN', 'BUILD', 'SHIP'];
    let W = 0, H = 0, wide = true, nodes = [], layers = [], pulses = [];
    let running = true, rafId = 0, last = 0, spawn = 0, t = 0;
    const mouse = { x: -1e4, y: -1e4 };

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wide = W > 1100;
      const x0 = wide ? W * 0.6 : W * 0.08;
      const x1 = wide ? W * 0.88 : W * 0.92;
      const yMid = H * (wide ? 0.4 : 0.5);
      const ySpan = Math.min(H * (wide ? 0.6 : 0.72), 540);
      const maxN = Math.max(...LAYERS);
      nodes = []; layers = []; pulses = [];
      LAYERS.forEach((n, li) => {
        const x = x0 + ((x1 - x0) * li) / (LAYERS.length - 1);
        const span = ySpan * (n / maxN);
        const arr = [];
        for (let k = 0; k < n; k++) {
          const y = yMid - span / 2 + (span * (k + 0.5)) / n;
          const node = { bx: x, by: y, x, y, l: li, k, a: 0, ph: Math.random() * Math.PI * 2, out: [] };
          nodes.push(node); arr.push(node);
        }
        layers.push(arr);
      });
      for (let li = 0; li < layers.length - 1; li++) layers[li].forEach((n) => (n.out = layers[li + 1]));
    }

    function fire(n) {
      if (!n.out.length || pulses.length > 160) return;
      const count = Math.random() < 0.45 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const to = n.out[(Math.random() * n.out.length) | 0];
        pulses.push({ f: n, to, p: 0, s: 0.011 + Math.random() * 0.014 });
      }
    }
    function burst() { layers[0].forEach((n) => { n.a = 1; fire(n); fire(n); fire(n); }); }

    function draw(dt) {
      ctx.clearRect(0, 0, W, H);
      const decay = Math.pow(0.95, dt / 16);

      for (const n of nodes) {
        n.x = n.bx + Math.sin(t * 0.7 + n.ph) * 5;
        n.y = n.by + Math.cos(t * 0.9 + n.ph) * 5;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 170 && d > 0.01) {
          const f = 1 - d / 170;
          n.x += (dx / d) * f * 22;
          n.y += (dy / d) * f * 22;
          n.a = Math.max(n.a, f * 0.9);
        }
        n.a *= decay;
      }

      // base edges
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = rgba(C.line, 0.075);
      ctx.beginPath();
      for (const a of nodes) for (const b of a.out) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
      ctx.stroke();

      // excited edges
      for (const a of nodes) {
        if (a.a < 0.2) continue;
        ctx.strokeStyle = rgba(C.cyan, a.a * 0.16);
        ctx.beginPath();
        for (const b of a.out) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
        ctx.stroke();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.p += (p.s * dt) / 16;
        if (p.p >= 1) {
          pulses.splice(i, 1);
          p.to.a = 1;
          if (Math.random() < 0.82) fire(p.to);
          continue;
        }
        const col = p.f.l % 2 ? C.mag : C.cyan;
        const x = p.f.x + (p.to.x - p.f.x) * p.p, y = p.f.y + (p.to.y - p.f.y) * p.p;
        const tp = Math.max(0, p.p - 0.14);
        const tx = p.f.x + (p.to.x - p.f.x) * tp, ty = p.f.y + (p.to.y - p.f.y) * tp;
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, rgba(col, 0));
        g.addColorStop(1, rgba(col, 0.95));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = rgba(col, 0.22);
        ctx.beginPath(); ctx.arc(x, y, 5.5, 0, 6.283); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 6.283); ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const col = n.l === LAYERS.length - 1 ? C.mag : C.cyan;
        const r = 2.6 + n.a * 3.2;
        if (n.a > 0.05) {
          ctx.fillStyle = rgba(col, n.a * 0.16);
          ctx.beginPath(); ctx.arc(n.x, n.y, r * 4.2, 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = rgba(col, 0.35 + n.a * 0.65);
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.283); ctx.fill();
        ctx.strokeStyle = rgba(col, 0.35 + n.a * 0.4);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 3.5, 0, 6.283); ctx.stroke();
      }

      // labels: inputs + softmax outputs
      if (wide) {
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        layers[0].forEach((n, i) => {
          ctx.fillStyle = rgba(C.text, 0.3 + n.a * 0.6);
          ctx.fillText(IN[i] || '', n.x - 16, n.y);
        });
        const outs = layers[layers.length - 1];
        const ex = outs.map((n) => Math.exp(n.a * 3));
        const sum = ex.reduce((a, b) => a + b, 0);
        ctx.textAlign = 'left';
        outs.forEach((n, i) => {
          ctx.fillStyle = rgba(C.mag, 0.45 + n.a * 0.55);
          ctx.fillText(`${OUT[i]}  ${(ex[i] / sum).toFixed(2)}`, n.x + 16, n.y);
        });
      }
    }

    function frame(now) {
      if (!running) { rafId = 0; return; }
      const dt = Math.min(50, now - (last || now));
      last = now;
      t += dt / 1000;
      spawn += dt;
      if (spawn > 150) {
        spawn = 0;
        const n = layers[0][(Math.random() * layers[0].length) | 0];
        n.a = 1;
        fire(n);
      }
      draw(dt);
      rafId = requestAnimationFrame(frame);
    }
    const start = () => { if (!rafId && !reduce) { last = 0; rafId = requestAnimationFrame(frame); } };

    layout();
    if (reduce) { draw(16); }
    else start();

    let rt;
    addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { layout(); if (reduce) draw(16); }, 150);
    });
    addEventListener('mousemove', (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    document.addEventListener('mouseleave', () => { mouse.x = mouse.y = -1e4; });
    hero.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      burst();
    });

    new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      if (running) start();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden && hero.getBoundingClientRect().bottom > 0;
      if (running) start();
    });

    neural.burst = burst;
  }

  /* ---------- HUD telemetry ---------- */
  function hud() {
    const clock = $('#clock'), lossEl = $('#loss'), epochEl = $('#epoch'), path = $('#spark path');
    if (!clock) return;
    const hist = [];
    let ep = 0;
    const tickClock = () => { clock.textContent = new Date().toLocaleTimeString('en-GB'); };
    const tick = () => {
      ep++;
      const L = Math.max(0.012,
        0.032 + 0.66 * Math.exp(-ep / 45) + (Math.random() - 0.5) * 0.05 * Math.exp(-ep / 120) + (Math.random() - 0.5) * 0.006);
      hist.push(L);
      if (hist.length > 50) hist.shift();
      lossEl.textContent = L.toFixed(4);
      epochEl.textContent = ep.toLocaleString();
      const n = Math.max(hist.length - 1, 1);
      path.setAttribute('d', hist.map((v, i) => `${i ? 'L' : 'M'}${((i / n) * 200).toFixed(1)},${(38 - Math.min(v / 0.72, 1) * 34).toFixed(1)}`).join(' '));
    };
    tickClock(); tick();
    setInterval(tickClock, 1000);
    if (!reduce) setInterval(tick, 650);
  }

  /* ---------- marquee: duplicate content for a seamless loop ---------- */
  function marquee() {
    const track = $('#marquee');
    if (track) track.innerHTML += track.innerHTML;
  }

  /* ---------- text scramble ---------- */
  const GLYPHS = '!<>-_\\/[]{}—=+*^?#01アイウ';
  function scramble(el) {
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    el.setAttribute('aria-label', final);
    if (reduce) return;
    const chars = Array.from(final);
    const dur = 500 + chars.length * 35;
    const t0 = performance.now();
    const step = (now) => {
      const it = ((now - t0) / dur) * chars.length;
      if (it >= chars.length) { el.textContent = final; return; }
      el.textContent = chars.map((ch, i) =>
        i < it || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTimeout(() => { el.textContent = final; }, dur + 400); // safety net if rAF is paused
  }

  /* ---------- scroll reveal + scramble ---------- */
  function reveals() {
    $$('.stagger').forEach((g) => Array.from(g.children).forEach((c, i) => c.style.setProperty('--d', `${i * 110}ms`)));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.classList.contains('scramble')) scramble(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal, .scramble').forEach((el) => io.observe(el));
  }

  /* ---------- nav: scrolled state, active link, mobile menu, progress ---------- */
  function nav() {
    const navEl = $('#nav'), bar = $('.scroll-progress');
    const onScroll = () => {
      const y = scrollY;
      navEl.classList.toggle('scrolled', y > 30);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const links = $$('.nav-links a');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => io.observe(s));

    const toggle = $('#nav-toggle');
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    links.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  }

  /* ---------- custom cursor ---------- */
  function cursor() {
    if (!finePointer || reduce) return;
    root.classList.add('has-cursor');
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      root.classList.add('cursor-on');
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    }, { passive: true });
    document.addEventListener('mouseleave', () => root.classList.remove('cursor-on'));
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverSel = 'a, button, .tilt, input, .clink';
    document.addEventListener('mouseover', (e) => { if (e.target.closest(hoverSel)) ring.classList.add('hover'); });
    document.addEventListener('mouseout', (e) => { if (e.target.closest(hoverSel)) ring.classList.remove('hover'); });
  }

  /* ---------- 3D tilt + holo shine ---------- */
  function tilt() {
    if (!finePointer || reduce) return;
    $$('.tilt').forEach((el) => {
      const max = el.classList.contains('cert') ? 12 : 6;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
        el.style.setProperty('--rx', `${-(py - 0.5) * max}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic() {
    if (!finePointer || reduce) return;
    $$('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- education training curve ---------- */
  function curve() {
    const loss = $('#curve-loss'), acc = $('#curve-acc'), dot = $('#curve-dot'), epEl = $('#curve-ep'), tl = $('#timeline');
    if (!loss || !tl) return;
    const X0 = 30, X1 = 290, Y0 = 20, Y1 = 180;
    const pL = [], pA = [];
    for (let x = 0; x <= X1 - X0; x += 4) {
      const lv = 0.07 + 0.86 * Math.exp(-x / 70) + Math.sin(x * 0.31) * 0.018 + Math.sin(x * 1.7) * 0.01;
      const av = 0.95 - 0.86 * Math.exp(-x / 62) + Math.sin(x * 0.27 + 1) * 0.015;
      pL.push([X0 + x, Y1 - lv * (Y1 - Y0)]); // high loss -> near top
      pA.push([X0 + x, Y1 - av * (Y1 - Y0)]);
    }
    const toD = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    loss.setAttribute('d', toD(pL));
    acc.setAttribute('d', toD(pA));
    const lenL = loss.getTotalLength(), lenA = acc.getTotalLength();
    [[loss, lenL], [acc, lenA]].forEach(([p, l]) => { p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });

    const update = () => {
      const r = tl.getBoundingClientRect();
      const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height * 0.9)));
      loss.style.strokeDashoffset = lenL * (1 - p);
      acc.style.strokeDashoffset = lenA * (1 - p);
      const pt = loss.getPointAtLength(lenL * p);
      dot.setAttribute('cx', pt.x);
      dot.setAttribute('cy', pt.y);
      epEl.textContent = Math.round(p * 100);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- matrix rain ---------- */
  let matrixTimer;
  function matrix(ms = 6000) {
    const cv = $('#matrix');
    const ctx = cv.getContext('2d');
    const W = (cv.width = innerWidth), H = (cv.height = innerHeight);
    const size = 16, cols = Math.ceil(W / size);
    const drops = Array.from({ length: cols }, () => (Math.random() * -H) / size);
    const chars = 'アイウエオカキクケコサシスセソ01AIML<>{}∑∂λ';
    cv.classList.add('on');
    let alive = true;
    const loop = () => {
      if (!alive) return;
      ctx.fillStyle = 'rgba(5,6,11,0.09)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${size}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size;
        ctx.fillStyle = Math.random() < 0.04 ? '#fff' : rgba(C.cyan, 0.85);
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y);
        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
      requestAnimationFrame(loop);
    };
    loop();
    clearTimeout(matrixTimer);
    matrixTimer = setTimeout(() => {
      cv.classList.remove('on');
      setTimeout(() => { alive = false; ctx.clearRect(0, 0, W, H); }, 800);
    }, ms);
  }

  /* ---------- interactive terminal ---------- */
  function terminal() {
    const out = $('#term-out'), input = $('#term-in'), body = $('#term-body');
    if (!out) return;
    const history = [];
    let hIdx = 0;
    const s = (cls, txt) => `<span class="${cls}">${txt}</span>`;

    const print = (html) => {
      const d = document.createElement('div');
      d.innerHTML = html;
      out.appendChild(d);
      body.scrollTop = body.scrollHeight;
    };

    const neofetchArt =
` ██████╗ ███╗   ███╗
 ██╔══██╗████╗ ████║
 ██████╔╝██╔████╔██║
 ██╔═══╝ ██║╚██╔╝██║
 ██║     ██║ ╚═╝ ██║
 ╚═╝     ╚═╝     ╚═╝`;

    const cmds = {
      help: () =>
`${s('t-muted', 'available commands:')}
  ${s('t-cyan', 'whoami')}        who is this
  ${s('t-cyan', 'neofetch')}      system info, but it's me
  ${s('t-cyan', 'skills')}        loaded weights
  ${s('t-cyan', 'certs')}         verified credentials
  ${s('t-cyan', 'education')}     training history
  ${s('t-cyan', 'projects')}      experiments in the lab
  ${s('t-cyan', 'experience')}    field deployments
  ${s('t-cyan', 'contact')}       open a channel
  ${s('t-cyan', 'resume')}        print / save resume as pdf
  ${s('t-cyan', 'sudo hire-me')}  you know you want to
  ${s('t-cyan', 'matrix')}        take the red pill
  ${s('t-cyan', 'clear')}         wipe the screen
${s('t-muted', 'tip: ↑/↓ for history, tab to autocomplete')}`,

      whoami: () =>
`${s('t-lime', CONFIG.name)} — aspiring AI engineer.
B.Tech Data Science at VIT Vellore, Class of 2030.
AWS Certified (Solutions Architect – Associate, AI Practitioner) + Bloomberg BMC.
Building Coval, LearnScope, KernelForge and Finance-AI.`,

      neofetch: () =>
`<div class="nf"><pre>${neofetchArt}</pre><div>${s('t-lime', 'guest')}@${s('t-lime', 'pm-ai')}
-----------------
${s('t-cyan', 'OS')}:        PM-OS 1.0 (neural kernel)
${s('t-cyan', 'Host')}:      ${esc(CONFIG.name)}
${s('t-cyan', 'Role')}:      Aspiring AI Engineer
${s('t-cyan', 'Campus')}:    VIT Vellore
${s('t-cyan', 'Cloud')}:     AWS SAA + AI Practitioner
${s('t-cyan', 'Finance')}:   Bloomberg Market Concepts
${s('t-cyan', 'Shipped')}:   Coval (live)
${s('t-cyan', 'Uptime')}:    ${Math.floor(performance.now() / 1000)}s on this page
${s('t-cyan', 'Location')}:  ${esc(CONFIG.location)}</div></div>`,

      skills: () =>
`${s('t-mag', '[ai/ml]')}    multi-agent systems · rag · langchain · autograd · tensorflow.js
${s('t-mag', '[cloud]')}    aws · fastapi inference serving · vercel · c++/cuda (learning)
${s('t-mag', '[stack]')}    python · typescript · react · node.js · supabase · git
${s('t-mag', '[finance]')}  market analysis · icp profiling · bloomberg fundamentals`,

      certs: () =>
`${s('t-lime', '✔')} AWS Certified Solutions Architect – Associate   ${s('t-muted', 'aug 2026')}
${s('t-lime', '✔')} AWS Certified AI Practitioner                   ${s('t-muted', 'jun 2026')}
${s('t-lime', '✔')} Bloomberg Market Concepts                       ${s('t-muted', 'oct 2026')}`,

      education: () =>
`${s('t-cyan', 'epoch 04')}  fine-tuning: aws x2 + bloomberg (2026)
${s('t-cyan', 'epoch 03')}  ${esc(CONFIG.degree)}
${s('t-cyan', 'epoch 02')}  class xii — 89%
${s('t-cyan', 'epoch 01')}  class x — 89%`,

      projects: () =>
`${s('t-lime', 'EXP-001')}  Coval — multi-agent code review      ${s('t-lime', '[live]')}
${s('t-cyan', 'EXP-002')}  LearnScope — watch a network learn   ${s('t-cyan', '[built]')}
${s('t-amber', 'EXP-003')}  KernelForge — inference engine       ${s('t-amber', '[in progress]')}
${s('t-mag', 'EXP-004')}  Finance-AI — rag assistant           ${s('t-mag', '[in development]')}`,

      experience: () =>
`${s('t-cyan', 'DEPLOY-01')}  Market Analyst &amp; Assistant Trader (Intern), Savari Sewa
${s('t-cyan', 'DEPLOY-02')}  E-Sports GFX Manager &amp; SaaS Handler, 3 communities`,

      contact: () =>
`${CONFIG.email ? `${s('t-cyan', 'email')}     <a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>
` : ''}${s('t-cyan', 'linkedin')}  <a href="${esc(CONFIG.linkedin)}" target="_blank" rel="noopener">${esc(CONFIG.linkedin)}</a>
${s('t-cyan', 'github')}    <a href="${esc(CONFIG.github)}" target="_blank" rel="noopener">${esc(CONFIG.github)}</a>`,

      'sudo hire-me': () => {
        setTimeout(() => {
          print(`${s('t-lime', '✔ permission granted.')} opening secure channel…`);
          setTimeout(() => $('#contact').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), 700);
        }, 700);
        return `[sudo] password for guest: ********`;
      },
      hire: () => `${s('t-amber', 'permission denied.')} try: ${s('t-cyan', 'sudo hire-me')}`,
      resume: () => { setTimeout(() => window.print(), 300); return 'spooling resume.pdf to printer…'; },
      matrix: () => { matrix(); return s('t-lime', 'wake up, neo…'); },
      ls: () => `${s('t-cyan', 'about.md')}  ${s('t-cyan', 'skills.json')}  ${s('t-mag', 'certs/')}  ${s('t-mag', 'projects/')}  resume.pdf  ${s('t-amber', 'secrets.txt')}`,
      'cat secrets.txt': () => 'the real treasure was the gradients we descended along the way.',
      'cat about.md': () => cmds.whoami(),
      'cat skills.json': () => cmds.skills(),
      pwd: () => '/home/guest/pm-ai',
      date: () => new Date().toString(),
      exit: () => 'there is no exit. only more epochs.',
      'sudo rm -rf /': () => s('t-mag', 'nice try. this incident will be reported to the gradient police.'),
      'rm -rf /': () => s('t-mag', 'permission denied. also… why.'),
      ping: () => 'PONG — latency: 0.42ms (i reply fast, try emailing)',
      clear: () => { out.innerHTML = ''; return null; },
    };
    const names = Object.keys(cmds).concat(['echo']);

    const run = (raw) => {
      const cmd = raw.trim();
      print(`${s('prompt', 'guest@pm-ai:~$')} ${esc(cmd)}`);
      if (!cmd) return;
      history.push(cmd);
      hIdx = history.length;
      const lc = cmd.toLowerCase().replace(/\s+/g, ' ');
      let res;
      if (cmds[lc]) res = cmds[lc]();
      else if (lc.startsWith('echo ')) res = esc(cmd.slice(5));
      else if (lc.startsWith('sudo ')) res = `${s('t-amber', 'guest is not in the sudoers file.')} except for: ${s('t-cyan', 'sudo hire-me')}`;
      else if (lc.startsWith('cat ')) res = `cat: ${esc(cmd.slice(4))}: no such file. try ${s('t-cyan', 'ls')}`;
      else res = `command not found: ${esc(cmd)}. type ${s('t-cyan', 'help')}.`;
      if (res) print(res);
    };

    print(`${s('t-lime', 'PM-OS v1.0')} ${s('t-muted', '(neural-kernel 6.9.0-aws)')}
last login: ${new Date().toDateString()} from ${s('t-cyan', 'the internet')}
type ${s('t-cyan', 'help')} to see available commands.`);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        run(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hIdx > 0) input.value = history[--hIdx];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (hIdx < history.length - 1) input.value = history[++hIdx];
        else { hIdx = history.length; input.value = ''; }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const v = input.value.toLowerCase();
        const m = names.filter((n) => n.startsWith(v));
        if (m.length === 1) input.value = m[0];
        else if (m.length > 1 && v) print(m.join('   '));
      }
    });
    body.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (!getSelection().toString()) input.focus({ preventScroll: true });
    });
    $$('.term-hints button').forEach((b) => b.addEventListener('click', () => run(b.dataset.cmd)));
  }

  /* ---------- contact links from CONFIG ---------- */
  function contact() {
    const set = (key, href, label) => {
      const a = $(`[data-link="${key}"]`);
      if (!a) return;
      a.href = href;
      $('b', a).textContent = label;
    };
    if (CONFIG.email) {
      $('[data-link="email"]').hidden = false;
      set('email', `mailto:${CONFIG.email}`, CONFIG.email);
    }
    set('linkedin', CONFIG.linkedin, CONFIG.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/, '').replace(/\/$/, '') || 'linkedin');
    set('github', CONFIG.github, '@' + CONFIG.github.replace(/\/$/, '').split('/').pop());
    $('#print-resume').addEventListener('click', () => window.print());
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------- contact form → POST /api/contact (limits match the API) ---------- */
  function contactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const fields = [
      { el: $('#cf-name'), ok: (v) => v.length >= 2 && v.length <= 100, msg: 'Enter your name (at least 2 characters).' },
      { el: $('#cf-email'), ok: (v) => /^\S+@\S+\.\S+$/.test(v) && v.length <= 200, msg: 'Enter a valid email address.' },
      { el: $('#cf-message'), ok: (v) => v.length >= 10 && v.length <= 2000, msg: 'Write at least 10 characters.' },
    ];
    const button = $('button[type="submit"]', form);
    const formError = $('.form-error', form);
    const label = button.innerHTML;
    let sending = false;

    const check = (f) => {
      const valid = f.ok(f.el.value.trim());
      $('.err', f.el.parentElement).textContent = valid ? '' : f.msg;
      f.el.setAttribute('aria-invalid', String(!valid));
      return valid;
    };
    fields.forEach((f) => f.el.addEventListener('input', () => {
      if (f.el.getAttribute('aria-invalid') === 'true') check(f);
    }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (sending) return;
      formError.textContent = '';
      const invalid = fields.filter((f) => !check(f));
      if (invalid.length) { invalid[0].el.focus(); return; }

      sending = true;
      button.disabled = true;
      button.textContent = 'Transmitting…';
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fields[0].el.value.trim(),
            email: fields[1].el.value.trim(),
            message: fields[2].el.value.trim(),
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        $('.form-fields', form).hidden = true;
        const sent = $('.form-sent', form);
        sent.hidden = false;
        sent.focus({ preventScroll: true });
      } catch (err) {
        formError.textContent = `Could not send. Please email ${CONFIG.email} directly.`;
        button.disabled = false;
        button.innerHTML = label;
      } finally {
        sending = false;
      }
    });
  }

  /* ---------- konami code → god mode ---------- */
  function konami() {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    addEventListener('keydown', (e) => {
      if (e.target.closest && e.target.closest('input, textarea')) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : k === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        const on = root.classList.toggle('god');
        refreshColors();
        if (neural.burst) neural.burst();
        toast(on ? '⚡ GOD MODE ENABLED — hireability +∞' : 'god mode disabled. back to mortal settings.');
      }
    });
  }

  /* ---------- init ---------- */
  marquee();
  nav();
  cursor();
  tilt();
  magnetic();
  contact();
  contactForm();
  terminal();
  konami();
  hud();
  neural();
  curve();

  boot(() => {
    document.body.classList.add('ready');
    reveals();
    setTimeout(typewriter, 900);
  });
})();
