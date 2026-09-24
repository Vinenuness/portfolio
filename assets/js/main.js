/* =====================================================================
   main.js — Montagem da página, binder de dados e comportamentos
   ===================================================================== */
(function () {
  'use strict';

  const C = window.PORTFOLIO_COMPONENTS;
  const D = window.PORTFOLIO_DATA;
  if (!C || !D) return;

  /* ---------------------------------------------------- montagem ------ */
  const mounts = [
    ['[data-mount="nav"]', C.renderNav],
    ['[data-mount="main"]', () => [
      C.renderHero(), C.renderMetrics(), C.renderContribute(), C.renderAbout(),
      C.renderExperience(), C.renderProject(), C.renderSkills(), C.renderMindset(),
      C.renderHealth(), C.renderEducation(), C.renderContact()
    ].join('')],
    ['[data-mount="footer"]', C.renderFooter]
  ];

  mounts.forEach(([sel, fn]) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = typeof fn === 'function' ? fn() : fn;
  });

  /* deep-link: as seções são montadas via JS, então o salto de âncora
     precisa ser refeito depois da montagem (ex.: voltar de /projetos/ativofix
     para index.html#projetos) */
  if (location.hash && location.hash.length > 1) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }

  /* =====================================================================
     BINDER — usado pela página do case (/projetos/ativofix)
     Popula elementos a partir de data.js sem duplicar conteúdo.
     ===================================================================== */
  const getPath = (path) =>
    path.split('.').reduce((obj, key) => (obj == null ? undefined : obj[key]), D);

  function bindData() {
    const rootPath = document.body.getAttribute('data-page') || '';
    if (!rootPath) return;

    /* prefixo de caminhos de assets (páginas em subdiretórios, ex.: "../../") */
    const BASE = document.body.getAttribute('data-base') || '';

    /* texto simples: data-bind="caminho.para.valor" */
    document.querySelectorAll('[data-bind]').forEach(el => {
      const val = getPath(el.getAttribute('data-bind'));
      if (val != null) el.textContent = val;
    });

    /* listas: data-list="caminho.para.array"
       UL  -> itens <li> (listas do case)
       div -> tags <span class="tag"> */
    document.querySelectorAll('[data-list]').forEach(el => {
      const arr = getPath(el.getAttribute('data-list'));
      if (!Array.isArray(arr)) return;
      const clean = (t) => String(t).replace(/[<>&"]/g, '');
      el.innerHTML = el.tagName === 'UL'
        ? arr.map(t => '<li>' + clean(t) + '</li>').join('')
        : arr.map(t => '<span class="tag' +
            (/tech/i.test(el.getAttribute('data-list')) ? '' : ' tag--neutral') +
            '">' + clean(t) + '</span>').join('');
    });

    /* pipeline visual: data-pipeline="caminho.para.array" */
    document.querySelectorAll('[data-pipeline]').forEach(el => {
      const arr = getPath(el.getAttribute('data-pipeline'));
      if (!Array.isArray(arr)) return;
      el.setAttribute('aria-label', 'Fluxo: ' + arr.join(' → '));
      el.innerHTML = arr.map((step, i) => {
        const arrow = i < arr.length - 1 ? '<span class="pipe-arrow" aria-hidden="true"></span>' : '';
        const num = String(i + 1).padStart(2, '0');
        return '<div class="pipe-step"><div class="pipe-box">' + String(step).replace(/[<>&"]/g, '') +
               '<small>' + num + '</small></div></div>' + arrow;
      }).join('');
    });

    /* screenshots: data-shots="caminho.para.array" */
    document.querySelectorAll('[data-shots]').forEach(el => {
      const arr = getPath(el.getAttribute('data-shots'));
      if (!Array.isArray(arr)) return;
      el.innerHTML = arr.map((s, i) =>
        '<figure class="shot" style="margin:0">' +
        '<img src="' + BASE + s.src + '" alt="' + String(s.alt).replace(/"/g, '&quot;') + '" loading="lazy">' +
        '<figcaption class="shot-cap">' + (s.cap || ('Screenshot ' + String(i + 1).padStart(2, '0'))) +
        '</figcaption></figure>').join('');
    });

    /* tabela de tecnologias: data-tech="caminho.para.array" */
    document.querySelectorAll('[data-tech]').forEach(el => {
      const arr = getPath(el.getAttribute('data-tech'));
      if (!Array.isArray(arr)) return;
      el.innerHTML = arr.map(t =>
        '<div class="tech-row"><span class="tech-name">' + String(t.name).replace(/[<>&"]/g, '') +
        '</span><span class="tech-role">' + String(t.role).replace(/[<>&"]/g, '') + '</span></div>').join('');
    });

    /* links de contato escritos como "linkedin"/"github"/"email" */
    document.querySelectorAll('[data-contacts] a').forEach(a => {
      const key = a.getAttribute('href');
      const map = { linkedin: D.contacts.linkedin, github: D.contacts.github, email: 'mailto:' + D.contacts.email };
      if (map[key]) a.setAttribute('href', map[key]);
    });

    /* navegação aponta de volta para a home quando as âncoras não existem aqui */
    document.querySelectorAll('[data-navlink], a.brand').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#' && !document.querySelector(href)) {
        a.setAttribute('href', '../../index.html' + href);
      }
    });
  }

  bindData();

  /* ------------------------------------------------- menu mobile ------ */
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    mobile.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------- link ativo conforme scroll --- */
  const navLinks = Array.from(document.querySelectorAll('[data-navlink]'));
  const sections = navLinks
    .map(a => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return null; /* link para outra página */
      try { return document.querySelector(href); } catch (e) { return null; }
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => visible.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
      let best = null, bestRatio = 0;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      });
      if (best) {
        navLinks.forEach(a =>
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + best));
      }
    }, { rootMargin: '-35% 0px -45% 0px', threshold: [0, .15, .35, .6] });
    sections.forEach(s => io.observe(s));
  }

  /* --------------------------------------- animações discretas -------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); ro.unobserve(en.target); }
      });
    }, { threshold: .12 });
    reveals.forEach(el => ro.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();
