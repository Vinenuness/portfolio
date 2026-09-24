/* =====================================================================
   components.js — Renderização das seções a partir de data.js
   Cada função corresponde a um componente/bloco da página.

   Convenção de escaping:
   - h`...` escapa automaticamente qualquer valor interpolado;
   - envolva strings de HTML já montadas com raw(...) para inseri-las
     sem re-escaping (ex.: listas construídas com map/h).
   ===================================================================== */
(function () {
  'use strict';

  const D = window.PORTFOLIO_DATA;

  /* helpers ---------------------------------------------------------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* marca HTML seguro para interpolação dentro de h`...` */
  const raw = (html) => ({ __html: String(html) });

  /* tagged template: interpolações são escapadas, exceto raw(...) */
  const h = (strings, ...values) =>
    strings.reduce((acc, str, i) => {
      let v = i < values.length ? values[i] : '';
      if (v && typeof v === 'object' && '__html' in v) v = v.__html;
      else v = esc(v);
      return acc + str + v;
    }, '');

  const icon = {
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
    linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>',
    github: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.32-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>',
    arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>',
    pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    shield: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    desktop: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    network: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9s-1.4 6.5-4.1 9c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3Z"/></svg>',
    gear: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
    rocket: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8c2.9 2 4.4 5 4.4 8.4 0 1.4-.3 2.8-.8 4H8.4a11 11 0 0 1-.8-4c0-3.4 1.5-6.4 4.4-8.4Z"/><circle cx="12" cy="9.5" r="1.7"/><path d="M8.5 15.2 7 18.8l3.2-1.2M15.5 15.2l1.5 3.6-3.2-1.2M12 15.5V21"/></svg>',
    shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="m9 11.5 2 2 4-4"/></svg>',
    chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4v16h16"/><path d="M8.5 15.5v-4M12.5 15.5V7.5M16.5 15.5v-6"/></svg>',
    laptop: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4.5" width="16" height="11.5" rx="1.8"/><path d="M2.5 19.5h19"/></svg>',
    tools: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
    health: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l2-4.5 4 9 2-4.5h6"/></svg>'
  };

  /* navegação -------------------------------------------------------- */
  function renderNav() {
    const links = D.nav.map(n =>
      h`<li><a href="${n.href}" data-navlink>${n.label}</a></li>`).join('');
    const linksM = D.nav.map(n =>
      h`<a href="${n.href}" data-navlink>${n.label}</a>`).join('');
    return h`
      <header class="nav">
        <div class="container nav-inner">
          <a class="brand" href="#inicio" aria-label="${D.profile.fullName} — início">
            <span class="brand-mark" aria-hidden="true"><b>V</b><span>N</span></span>
            <span>${D.profile.name}</span>
          </a>
          <nav aria-label="Navegação principal">
            <ul class="nav-links">${raw(links)}</ul>
          </nav>
          <a class="nav-cta" href="mailto:${D.contacts.email}">${raw(icon.mail)} Contato</a>
          <button class="nav-toggle" aria-expanded="false" aria-controls="menu-mobile" aria-label="Abrir menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
        <nav class="nav-mobile" id="menu-mobile" aria-label="Menu móvel">${raw(linksM)}</nav>
      </header>`;
  }

  /* hero -------------------------------------------------------------- */
  function renderHero() {
    const p = D.profile;
    const tags = D.heroTags.map(t => h`<span class="tag">${t}</span>`).join('');
    return h`
      <section class="hero" id="inicio">
        <div class="container hero-grid">
          <div>
            <p class="hero-hello">
              <span class="hand">Olá, eu sou</span>
              <svg class="arrow-doodle" width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 3c1.5 8 5.5 13 12 16"/><path d="m10.5 16.5 5.5 2.5-.5-6"/></svg>
              <span class="status-pill"><span class="status-dot" aria-hidden="true"></span>${p.status}</span>
            </p>
            <h1>${p.name}<span class="accent">.</span></h1>
            <p class="hero-role">${p.title}</p>
            <p class="hero-spec">${p.specialties}</p>
            <p class="hero-text">${p.heroText}</p>
            <div class="hero-actions">
              <a class="btn btn--primary" href="#projetos">${raw(icon.folder)} Ver projetos</a>
              <a class="btn btn--outline" href="${p.cv.file}" download="curriculo-vinicius-nunes.pdf">${raw(icon.download)} ${p.cv.label}</a>
              <a class="btn btn--ghost" href="${D.contacts.linkedin}" target="_blank" rel="noopener noreferrer">${raw(icon.linkedin)} LinkedIn</a>
              <a class="btn btn--ghost" href="${D.contacts.github}" target="_blank" rel="noopener noreferrer">${raw(icon.github)} GitHub</a>
            </div>
            <div class="hero-tags" aria-label="Principais competências">${raw(tags)}</div>
          </div>
          <div class="portrait-wrap">
            <figure class="portrait" style="margin:0">
              <img src="${p.photo}" alt="${p.photoAlt}" width="320" height="320">
              ${/placeholder/i.test(p.photo) ? raw('<figcaption class="portrait-badge">Foto profissional em breve</figcaption>') : ''}
            </figure>
          </div>
        </div>
      </section>`;
  }

  /* métricas ---------------------------------------------------------- */
  function renderMetrics() {
    const items = D.metrics.map(m => h`
      <div class="metric">
        <span class="metric-value">${m.value}</span>
        <span class="metric-label">${m.label}</span>
        <span class="metric-src">Resultado da experiência profissional</span>
      </div>`).join('');
    return h`<section class="metrics" aria-label="Resultados profissionais"><div class="container metrics-grid">${raw(items)}</div></section>`;
  }

  /* como posso contribuir ---------------------------------------------- */
  function renderContribute() {
    const cards = D.contribute.cards.map(c => h`
      <article class="card reveal">
        <span class="card-icon" aria-hidden="true">${raw(icon[c.icon] || '')}</span>
        <h3 class="card-title">${c.title}</h3>
        <p class="card-text">${c.text}</p>
      </article>`).join('');
    return h`
      <section class="section" id="contribuir">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Atuação</span>
            <h2 class="section-title">${D.contribute.title}</h2>
            <p class="section-lead">${D.contribute.lead}</p>
          </div>
          <div class="cards-grid">${raw(cards)}</div>
        </div>
      </section>`;
  }

  /* sobre -------------------------------------------------------------- */
  function renderAbout() {
    const paras = D.about.paragraphs.map(t => h`<p>${t}</p>`).join('');
    const quote = h`<p class="about-quote">${D.profile.message}</p>`;
    const facts = D.about.highlights.map(f => h`
      <div class="fact">
        <span class="fact-label">${f.label}</span>
        <span class="fact-value">${f.value}</span>
        <span class="fact-sub">${f.sub}</span>
      </div>`).join('');
    return h`
      <section class="section section--soft" id="sobre">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Perfil</span>
            <h2 class="section-title">${D.about.title}</h2>
          </div>
          <div class="about-grid">
            <div class="about-text">${raw(paras)}${raw(quote)}</div>
            <aside class="about-facts" aria-label="Resumo profissional">${raw(facts)}</aside>
          </div>
        </div>
      </section>`;
  }

  /* experiência --------------------------------------------------------- */
  function renderExperience() {
    const items = D.experience.items.map((e, i) => {
      const minor = i >= 3 ? ' is-minor' : '';
      const act = e.activities.map(a => h`<li>${a}</li>`).join('');
      return h`
        <li class="tl-item${e.current ? ' is-current' : ''}${minor} reveal">
          <span class="tl-dot" aria-hidden="true"></span>
          <div class="tl-head">
            <span class="tl-company">${e.company}</span>
            <span class="tl-role">${e.role}</span>
            ${e.current ? raw('<span class="badge-current">Atual</span>') : ''}
          </div>
          <div class="tl-meta">
            <span>${raw(icon.clock)} ${e.period}</span>
            <span>${raw(icon.pin)} ${e.location}</span>
          </div>
          <p class="tl-summary">${e.summary}</p>
          <ul class="tl-list">${raw(act)}</ul>
        </li>`;
    }).join('');
    return h`
      <section class="section" id="experiencia">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Trajetória</span>
            <h2 class="section-title">${D.experience.title}</h2>
            <p class="section-lead">${D.experience.lead}</p>
          </div>
          <ol class="timeline">${raw(items)}</ol>
        </div>
      </section>`;
  }

  /* projeto em destaque -------------------------------------------------- */
  function renderProject() {
    const p = D.featuredProject;
    const flow = p.pipeline.map((step, i) => {
      const arrow = i < p.pipeline.length - 1 ? '<span class="pipe-arrow" aria-hidden="true"></span>' : '';
      return h`<div class="pipe-step"><div class="pipe-box">${step}<small>0${i + 1}</small></div></div>` + arrow;
    }).join('');
    const dem = p.demonstrates.map(d => h`<span class="tag tag--neutral">${d}</span>`).join('');
    const tech = p.tech.map(t => h`<span class="tag">${t}</span>`).join('');
    const shots = p.screenshots.map((s, i) => h`
      <figure class="shot" style="margin:0">
        <img src="${s.src}" alt="${s.alt}" loading="lazy">
        <figcaption class="shot-cap">${s.cap || ('Screenshot 0' + (i + 1))}</figcaption>
      </figure>`).join('');
    const metrics = p.metrics.map(m =>
      h`<span class="project-metric">${raw(icon.check)} ${m}</span>`).join('');
    return h`
      <section class="section project" id="projetos">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Projetos</span>
            <h2 class="section-title">${p.label}</h2>
          </div>
          <article class="project-shell reveal">
            <div class="project-top">
              <div>
                <p class="project-label">Sistema interno · Em produção</p>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-cta">
                  <a class="btn btn--primary" href="${p.links.case}">Ver projeto ${raw(icon.arrow)}</a>
                  <a class="btn btn--outline" href="${p.links.project}" target="_blank" rel="noopener noreferrer">${raw(icon.github)} Repositório</a>
                </div>
              </div>
              <div class="project-side">
                <div>
                  <h3>Demonstra</h3>
                  <div class="hero-tags">${raw(dem)}</div>
                </div>
                <div>
                  <h3>Resultados</h3>
                  <div class="project-metrics">${raw(metrics)}</div>
                </div>
              </div>
            </div>
            <div class="project-body">
              <p style="font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mute);margin-bottom:14px;">Fluxo do sistema</p>
              <div class="pipeline" role="img" aria-label="Fluxo: ${p.pipeline.join(' → ')}">${raw(flow)}</div>
              <div class="shots">${raw(shots)}</div>
              <p style="margin-top:18px;">
                <span style="font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mute);display:block;margin-bottom:10px;">Tecnologias</span>
                ${raw(tech)}
              </p>
            </div>
          </article>
        </div>
      </section>`;
  }

  /* competências --------------------------------------------------------- */
  function renderSkills() {
    const groups = D.skills.groups.map((g, i) => {
      const tags = g.items.map(it => h`<span class="tag tag--neutral">${it}</span>`).join('');
      const accent = i === 0 ? ' skill-card--accent' : '';
      return h`
        <article class="skill-card${accent} reveal">
          <div class="skill-head">
            <span class="card-icon" aria-hidden="true">${raw(icon[g.icon] || '')}</span>
            <h3>${g.name}</h3>
          </div>
          <div class="skill-tags">${raw(tags)}</div>
        </article>`;
    }).join('');
    return h`
      <section class="section" id="competencias">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Stack & práticas</span>
            <h2 class="section-title">${D.skills.title}</h2>
            <p class="section-lead">${D.skills.lead}</p>
          </div>
          <div class="skills-grid">${raw(groups)}</div>
        </div>
      </section>`;
  }

  /* como eu penso TI ------------------------------------------------------ */
  function renderMindset() {
    const pillars = D.mindset.pillars.map((p, i) => h`
      <article class="pillar reveal">
        <span class="pillar-step" aria-hidden="true">0${i + 1}</span>
        <span class="pillar-icon" aria-hidden="true">${raw(icon[p.icon] || '')}</span>
        <h3>${p.name}</h3>
        <p>${p.text}</p>
      </article>`).join('');
    return h`
      <section class="section section--soft" id="mindset">
        <div class="container">
          <div class="section-head section-head--center">
            <span class="eyebrow">Método</span>
            <h2 class="section-title">${D.mindset.title}</h2>
            <p class="section-lead">${D.mindset.lead}</p>
          </div>
          <div class="mindset-grid">${raw(pillars)}</div>
        </div>
      </section>`;
  }

  /* experiência em saúde --------------------------------------------------- */
  function renderHealth() {
    return h`
      <section class="section" id="saude" aria-label="${D.health.title}">
        <div class="container">
          <div class="health-note reveal">
            <span class="health-icon" aria-hidden="true">${raw(icon.health)}</span>
            <div>
              <h3>${D.health.title}</h3>
              <p>${D.health.text}</p>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* formação --------------------------------------------------------------- */
  function renderEducation() {
    const items = D.education.items.map(e => {
      const minor = e.type === 'Incompleto' ? ' edu-card--minor' : '';
      return h`
        <article class="edu-card${minor} reveal">
          <span class="edu-type">${e.type}</span>
          <h3>${e.degree}</h3>
          <p class="edu-school">${e.school}</p>
          ${e.note ? raw(h`<p class="edu-note">${e.note}</p>`) : ''}
        </article>`;
    }).join('');
    const certs = D.certifications.items.map(c => h`
      <article class="cert">
        <span class="cert-icon">${raw(icon.shield)}</span>
        <div>
          <p class="cert-name" style="margin:0">${c.name}</p>
          ${c.detail ? raw(h`<p class="cert-detail" style="margin:0">${c.detail}</p>`) : ''}
        </div>
        ${c.hours ? raw(h`<span class="cert-hours">${c.hours}</span>`) : ''}
      </article>`).join('');
    return h`
      <section class="section section--soft" id="formacao">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Acadêmico</span>
            <h2 class="section-title">${D.education.title}</h2>
            <p class="section-lead">${D.education.lead}</p>
          </div>
          <div class="edu-grid">${raw(items)}</div>
          <div class="section-head" style="margin-top:48px;margin-bottom:24px;">
            <span class="eyebrow">Complemento</span>
            <h2 class="section-title" style="font-size:1.5rem;">${D.certifications.title}</h2>
            <p class="section-lead">${D.certifications.lead}</p>
          </div>
          <div class="certs-grid">${raw(certs)}</div>
        </div>
      </section>`;
  }

  /* contato ------------------------------------------------------------------ */
  function renderContact() {
    const c = D.contact, k = D.contacts;
    return h`
      <section class="section contact" id="contato">
        <div class="container">
          <div class="contact-box reveal">
            <span class="contact-status"><span class="status-dot" aria-hidden="true"></span>${c.status}</span>
            <h2>${c.title}</h2>
            <p class="contact-lead">${c.lead}</p>
            <div class="contact-actions">
              <a class="btn btn--blue" href="${k.linkedin}" target="_blank" rel="noopener noreferrer">${raw(icon.linkedin)} ${c.buttons.linkedin.label}</a>
              <a class="btn btn--outline" href="${k.github}" target="_blank" rel="noopener noreferrer">${raw(icon.github)} ${c.buttons.github.label}</a>
              <a class="btn btn--primary" href="mailto:${k.email}">${raw(icon.mail)} ${c.buttons.email.label}</a>
            </div>
            <p class="contact-sec">
              <a href="mailto:${k.email}">${k.email}</a>
              <span aria-hidden="true">·</span>
              <a href="${k.linkedin}" target="_blank" rel="noopener noreferrer">${k.linkedinLabel}</a>
              <span aria-hidden="true">·</span>
              <span>${k.phone} <em style="font-style:normal;opacity:.7;">(WhatsApp)</em></span>
              <span aria-hidden="true">·</span>
              <span>${D.profile.location}</span>
            </p>
          </div>
        </div>
      </section>`;
  }

  /* footer -------------------------------------------------------------------- */
  function renderFooter() {
    return h`
      <footer class="footer">
        <div class="container footer-inner">
          <span>© ${new Date().getFullYear()} ${D.profile.fullName}</span>
          <span class="hand">obrigado pela visita!</span>
          <span>${D.footer.note}</span>
          <span>${D.footer.builtWith}</span>
        </div>
      </footer>`;
  }

  /* API pública ----------------------------------------------------------------- */
  window.PORTFOLIO_COMPONENTS = {
    renderNav, renderHero, renderMetrics, renderContribute, renderAbout,
    renderExperience, renderProject, renderSkills, renderMindset,
    renderHealth, renderEducation, renderContact, renderFooter
  };
})();
