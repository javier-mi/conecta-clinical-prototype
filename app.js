// ===== STATE =====
const state = {
  screen: 'splash',
  trialId: null,
  filter: 'Todos',
  search: '',
  statusOption: 'pendiente',
  ob: { specialty: '', country: 'Argentina', province: 'Buenos Aires', matricula: '' },
  messages: JSON.parse(JSON.stringify(APP.messages)),
  referrals: [...APP.referrals],
};

// ===== SVG ICONS =====
const ic = {
  home:    `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  search:  `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  clip:    `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  user:    `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  bell:    `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  back:    `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
  pin:     `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  users:   `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  clock:   `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  send:    `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  check:   `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`,
  dollar:  `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  shield:  `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  srch16:  `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
};

// ===== NAVIGATION =====
const NO_NAV = ['splash', 'onboarding-1', 'onboarding-2', 'onboarding-3'];

function go(screen, params = {}) {
  Object.assign(state, params);
  state.screen = screen;
  render();
}

function render() {
  const nav = document.getElementById('bottom-nav');
  const showNav = !NO_NAV.includes(state.screen);
  nav.style.display = showNav ? 'flex' : 'none';

  if (showNav) {
    const NAV_MAP = { home: 0, search: 1, 'my-referrals': 2, profile: 3 };
    const activeIdx = NAV_MAP[state.screen] ?? 0;
    nav.querySelectorAll('.nav-item').forEach((el, i) => el.classList.toggle('active', i === activeIdx));
    const badge = nav.querySelector('.nav-badge');
    if (badge) badge.textContent = state.referrals.length || '';
  }

  const renderers = {
    splash:              renderSplash,
    'onboarding-1':      renderOb1,
    'onboarding-2':      renderOb2,
    'onboarding-3':      renderOb3,
    home:                renderHome,
    search:              renderSearch,
    'trial-detail':      renderDetail,
    contact:             renderContact,
    'register-referral': renderRegisterReferral,
    'my-referrals':      renderMyReferrals,
    profile:             renderProfile,
  };

  const sc = document.getElementById('screen-container');
  sc.innerHTML = (renderers[state.screen] || (() => ''))();
  sc.scrollTop = state.screen === 'contact' ? sc.scrollHeight : 0;
  // scroll to bottom of chat after paint
  if (state.screen === 'contact') requestAnimationFrame(() => { sc.scrollTop = sc.scrollHeight; });
}

// ===== HELPERS =====
function slotsBadge(t) {
  if (t.slots >= 3) return `<span class="slots-ok">${ic.users} ${t.slots} cupos</span>`;
  if (t.slots === 2) return `<span class="slots-low">${ic.users} ${t.slots} cupos</span>`;
  return `<span class="slots-one">${ic.users} ${t.slots} cupo</span>`;
}

function statusBadge(t) {
  if (t.status === 'reclutando') return `<span class="badge badge-success"><span class="dot dot-green"></span>Reclutando</span>`;
  if (t.status === 'cerrando')   return `<span class="badge badge-error"><span class="dot dot-red"></span>Cerrando</span>`;
  return `<span class="badge badge-neutral">${t.status}</span>`;
}

function referralStatusBadge(s) {
  const map = {
    pendiente:    ['badge-neutral',  'Pendiente'],
    contactado:   ['badge-warning',  'Contactado'],
    en_screening: ['badge-phase',    'En Screening'],
    enrolado:     ['badge-success',  'Enrolado'],
    descalificado:['badge-error',    'Descalificado'],
  };
  const [cls, label] = map[s] || ['badge-neutral', s];
  return `<span class="badge ${cls}">${label}</span>`;
}

function trialCard(t) {
  return `
  <div class="trial-card" data-action="detail" data-id="${t.id}">
    <div class="card-top">
      <div class="card-sponsor">
        <div class="sponsor-logo">${t.sponsorInitials}</div>
        <span class="sponsor-name">${t.sponsor}</span>
      </div>
      <div class="card-badges">
        ${statusBadge(t)}
        <span class="badge badge-phase">${t.phase}</span>
        ${t.hasFee ? `<span class="badge badge-fee">${ic.dollar} Fee</span>` : ''}
      </div>
    </div>
    <div class="card-title">${t.name}</div>
    <div class="card-subtitle">${t.fullName}</div>
    <div class="card-meta">
      <span class="meta-item">${ic.pin} ${t.center}, ${t.city}</span>
      ${slotsBadge(t)}
    </div>
  </div>`;
}

// ===== SCREEN RENDERERS =====

function renderSplash() {
  setTimeout(() => go('onboarding-1'), 2200);
  return `
  <div class="screen splash">
    <div class="splash-mark">CC</div>
    <div class="splash-title">Conecta Clinical LATAM</div>
    <div class="splash-sub">Ensayos clínicos activos en Latinoamérica, en tu especialidad, en español.</div>
    <div class="splash-dots">
      <div class="splash-dot"></div>
      <div class="splash-dot"></div>
      <div class="splash-dot"></div>
    </div>
  </div>`;
}

function renderOb1() {
  const chips = APP.specialties.map(s => {
    const featured = s === 'Oncología' || s === 'Hematología';
    const sel = state.ob.specialty === s;
    return `<button class="spec-chip${featured ? ' featured' : ''}${sel ? ' sel' : ''}" data-action="ob-spec" data-val="${s}">${sel ? ic.check + ' ' : ''}${s}</button>`;
  }).join('');

  return `
  <div class="screen ob-screen">
    <div class="ob-logo">
      <div class="ob-logo-mark">CC</div>
      <div><div class="ob-logo-name">Conecta Clinical</div><span class="ob-logo-sub">LATAM</span></div>
    </div>
    <div class="ob-progress">
      <div class="ob-dot on"></div><div class="ob-dot"></div><div class="ob-dot"></div>
    </div>
    <div class="ob-title">¿Cuál es tu especialidad?</div>
    <div class="ob-sub">Personalizamos el feed de ensayos según tu práctica clínica.</div>
    <div class="spec-grid">${chips}</div>
    <div class="ob-cta">
      <button class="btn btn-primary btn-full btn-lg" data-action="ob-next-1" ${!state.ob.specialty ? 'disabled style="opacity:.45"' : ''}>Continuar →</button>
    </div>
  </div>`;
}

function renderOb2() {
  const provinces = APP.provinces.map(p =>
    `<option ${p === state.ob.province ? 'selected' : ''}>${p}</option>`).join('');

  return `
  <div class="screen ob-screen">
    <div class="ob-logo">
      <div class="ob-logo-mark">CC</div>
      <div><div class="ob-logo-name">Conecta Clinical</div><span class="ob-logo-sub">LATAM</span></div>
    </div>
    <div class="ob-progress">
      <div class="ob-dot on"></div><div class="ob-dot on"></div><div class="ob-dot"></div>
    </div>
    <div class="ob-title">¿Dónde ejercés?</div>
    <div class="ob-sub">Mostramos los ensayos más cercanos a tu lugar de práctica.</div>
    <div class="input-group">
      <label class="input-label">País</label>
      <select class="input-field input-select" data-action="ob-country">
        <option selected>Argentina</option>
        <option>Brasil</option>
        <option>México</option>
        <option>Chile</option>
        <option>Colombia</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label">Provincia / Estado</label>
      <select class="input-field input-select" data-action="ob-province">${provinces}</select>
    </div>
    <div class="ob-cta" style="margin-top:auto">
      <button class="btn btn-primary btn-full btn-lg" data-action="ob-next-2">Continuar →</button>
    </div>
  </div>`;
}

function renderOb3() {
  return `
  <div class="screen ob-screen">
    <div class="ob-logo">
      <div class="ob-logo-mark">CC</div>
      <div><div class="ob-logo-name">Conecta Clinical</div><span class="ob-logo-sub">LATAM</span></div>
    </div>
    <div class="ob-progress">
      <div class="ob-dot on"></div><div class="ob-dot on"></div><div class="ob-dot on"></div>
    </div>
    <div class="ob-title">Verificación profesional</div>
    <div class="ob-sub">Tu matrícula nos permite verificar tu identidad y mostrarte ensayos con información sensible.</div>
    <div class="input-group">
      <label class="input-label">Nombre completo</label>
      <input class="input-field" type="text" placeholder="Dr. / Dra. Nombre Apellido" value="${APP.user.name}">
    </div>
    <div class="input-group">
      <label class="input-label">Matrícula profesional</label>
      <input class="input-field" id="ob-mat" type="text" placeholder="MN 00.000 / MP 00.000" value="${state.ob.matricula || APP.user.matricula}">
    </div>
    <div class="ob-info">
      ${ic.shield} <strong>¿Para qué usamos tu matrícula?</strong><br>
      Solo para verificar que sos un profesional de la salud matriculado. No compartimos tu matrícula con sponsors ni terceros.
    </div>
    <div class="ob-cta" style="margin-top:auto;padding-top:20px">
      <button class="btn btn-primary btn-full btn-lg" data-action="ob-finish">Ingresar a la plataforma →</button>
    </div>
  </div>`;
}

function renderHome() {
  const filters = ['Todos', 'Oncología', 'Hematología', 'Con Fee', 'Fase III'];
  const chips = filters.map(f =>
    `<button class="chip${state.filter === f ? ' active' : ''}" data-action="filter" data-val="${f}">${f}</button>`
  ).join('');

  const filtered = APP.trials.filter(t => {
    const q = state.search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q)
      || t.pathology.toLowerCase().includes(q)
      || t.sponsor.toLowerCase().includes(q)
      || t.fullName.toLowerCase().includes(q);
    const matchFilter =
      state.filter === 'Todos'     ? true :
      state.filter === 'Con Fee'   ? t.hasFee :
      state.filter === 'Fase III'  ? t.phase === 'Fase III' :
      t.specialty === state.filter;
    return matchSearch && matchFilter;
  });

  const cards = filtered.length
    ? filtered.map(trialCard).join('')
    : `<div class="empty"><div class="empty-icon">🔍</div><div class="empty-title">Sin resultados</div><div class="empty-sub">Probá con otros filtros o búsqueda.</div></div>`;

  return `
  <div class="screen">
    <div class="app-header">
      <div class="logo"><div class="logo-mark">CC</div>Conecta Clinical</div>
      <div class="header-actions">
        <button class="icon-btn">${ic.bell}<span class="notif-dot"></span></button>
      </div>
    </div>
    <div class="greeting">
      <div class="greeting-hi">Buenos días,</div>
      <div class="greeting-name">${APP.user.name}</div>
    </div>
    <div class="search-bar">
      <div class="search-wrap">
        <span class="search-icon">${ic.srch16}</span>
        <input class="search-input" id="search-input" type="search" placeholder="Buscar por patología, sponsor o ensayo…" value="${state.search}">
      </div>
    </div>
    <div class="chips-row">${chips}</div>
    <div class="trials-list">${cards}</div>
  </div>`;
}

function renderSearch() {
  const filtered = APP.trials.filter(t => {
    const q = state.search.toLowerCase();
    return !q || t.name.toLowerCase().includes(q)
      || t.pathology.toLowerCase().includes(q)
      || t.sponsor.toLowerCase().includes(q)
      || t.fullName.toLowerCase().includes(q);
  });

  const cards = filtered.length
    ? filtered.map(trialCard).join('')
    : `<div class="empty"><div class="empty-icon">🔍</div><div class="empty-title">Buscá un ensayo</div><div class="empty-sub">Por patología, sponsor o nombre del estudio.</div></div>`;

  return `
  <div class="screen">
    <div class="app-header">
      <div class="logo"><div class="logo-mark">CC</div>Buscar ensayos</div>
    </div>
    <div class="search-bar" style="padding-top:14px">
      <div class="search-wrap">
        <span class="search-icon">${ic.srch16}</span>
        <input class="search-input" id="search-input" type="search" placeholder="Patología, sponsor, nombre…" value="${state.search}" autofocus>
      </div>
    </div>
    <div class="trials-list" style="padding-top:12px">${cards}</div>
  </div>`;
}

function renderDetail() {
  const t = APP.trials.find(x => x.id === state.trialId);
  if (!t) return '<div class="screen"><p style="padding:24px">Ensayo no encontrado.</p></div>';

  const incItems = t.criteria.inclusion.map(c =>
    `<li class="criteria-item"><span class="ci-dot ci-inc"></span>${c}</li>`).join('');
  const excItems = t.criteria.exclusion.map(c =>
    `<li class="criteria-item"><span class="ci-dot ci-exc"></span>${c}</li>`).join('');

  const feeBlock = t.hasFee ? `
  <div class="detail-section">
    <div class="detail-section-label">Fee de derivación</div>
    <div class="fee-box">
      <div>${ic.dollar}</div>
      <div>
        <div class="fee-amount">USD ${t.feeAmount} por paciente</div>
        <div class="fee-note">${t.feeNote}</div>
      </div>
    </div>
  </div>` : '';

  const hasExisting = state.referrals.some(r => r.trialId === t.id);

  return `
  <div class="screen">
    <div class="back-header">
      <button class="back-btn" data-action="back">${ic.back}</button>
      <h1>${t.name}</h1>
    </div>
    <div class="detail-hero">
      <div class="detail-name">${t.name}</div>
      <div class="detail-full">${t.fullName}</div>
      <div class="detail-badges">
        ${statusBadge(t)}
        <span class="badge badge-phase">${t.phase}</span>
        <span class="badge badge-neutral">${t.pathology}</span>
        ${t.hasFee ? `<span class="badge badge-fee">${ic.dollar} Fee habilitado</span>` : ''}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Descripción</div>
      <p style="font-size:.86rem;color:var(--text-2);line-height:1.55">${t.description}</p>
    </div>

    <div class="detail-section">
      <div class="detail-section-label">Coordinador del ensayo</div>
      <div class="coordinator-card">
        <div class="coord-avatar">${t.coordinator.initials}</div>
        <div class="coord-info">
          <div class="coord-name">${t.coordinator.name}</div>
          <div class="coord-center">${t.coordinator.center}</div>
          <div class="coord-resp">${ic.clock} Responde en ${t.coordinator.responseTime}</div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="criteria-group-label inc">${ic.check} Criterios de inclusión</div>
      <ul class="criteria-list">${incItems}</ul>
    </div>

    <div class="detail-section">
      <div class="criteria-group-label exc" style="color:#DC2626">✕ Criterios de exclusión</div>
      <ul class="criteria-list">${excItems}</ul>
    </div>

    ${feeBlock}

    <div class="detail-section">
      <div class="detail-section-label">Centro y disponibilidad</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div class="meta-item">${ic.pin} <strong style="color:var(--text)">${t.center}</strong>, ${t.city}</div>
        <div class="meta-item">${ic.users} ${slotsBadge(t)}</div>
      </div>
    </div>

    <div class="detail-cta">
      <button class="btn btn-primary" style="flex:1" data-action="go-contact" data-id="${t.id}">
        ${ic.send} Contactar coordinador
      </button>
      <button class="btn btn-outline" data-action="go-refer" data-id="${t.id}" ${hasExisting ? 'disabled style="opacity:.45"' : ''}>
        ${hasExisting ? '✓ Derivado' : '+ Derivar'}
      </button>
    </div>
  </div>`;
}

function renderContact() {
  const t = APP.trials.find(x => x.id === state.trialId);
  if (!t) return '';

  const msgs = (state.messages[t.id] || []).map(m => `
  <div class="message ${m.sender === 'user' ? 'from-user' : 'from-coord'}">
    <div class="msg-bubble">${m.text}</div>
    <div class="msg-time">${m.time}</div>
  </div>`).join('');

  const hasReferral = state.referrals.some(r => r.trialId === t.id);

  const referPrompt = !hasReferral ? `
  <div class="refer-prompt">
    <div class="refer-prompt-body">
      <div class="refer-prompt-title">¿Tenés un paciente elegible?</div>
      <button class="refer-prompt-btn" data-action="go-refer" data-id="${t.id}">Registrar derivación →</button>
    </div>
  </div>` : `
  <div class="refer-prompt" style="background:var(--success-bg)">
    <div class="refer-prompt-body" style="color:var(--success)">
      <div class="refer-prompt-title">${ic.check} Derivación ya registrada para este ensayo</div>
    </div>
  </div>`;

  return `
  <div class="screen">
    <div class="back-header">
      <button class="back-btn" data-action="back-to-detail">${ic.back}</button>
      <h1>${t.coordinator.name}</h1>
    </div>
    <div class="coordinator-card" style="margin:12px 16px;border:1px solid var(--border)">
      <div class="coord-avatar">${t.coordinator.initials}</div>
      <div class="coord-info">
        <div class="coord-name">${t.coordinator.name}</div>
        <div class="coord-center">${t.coordinator.center}</div>
        <div class="coord-resp">${ic.clock} Responde en ${t.coordinator.responseTime}</div>
      </div>
    </div>
    ${referPrompt}
    <div class="chat-messages">${msgs}</div>
    <div class="chat-input-area">
      <textarea class="chat-textarea" id="chat-msg" rows="1" placeholder="Escribí tu consulta…"></textarea>
      <button class="chat-send" data-action="send-msg" data-id="${t.id}">${ic.send}</button>
    </div>
  </div>`;
}

function renderRegisterReferral() {
  const t = APP.trials.find(x => x.id === state.trialId);
  const statusOpts = [
    { val: 'pendiente',    label: 'Pendiente' },
    { val: 'contactado',   label: 'Contactado' },
    { val: 'en_screening', label: 'En Screening' },
  ];

  return `
  <div class="screen">
    <div class="back-header">
      <button class="back-btn" data-action="back-to-detail">${ic.back}</button>
      <h1>Registrar derivación</h1>
    </div>
    <div class="referral-form">
      <div style="background:var(--primary-50);border-radius:var(--r-md);padding:12px 14px;margin-bottom:20px;font-size:.84rem;color:var(--primary-dark)">
        <strong>${t ? t.name : '—'}</strong> · ${t ? t.pathology : '—'}
      </div>
      <div class="form-group">
        <label class="form-label">Iniciales del paciente</label>
        <input class="form-input" id="ref-initials" type="text" placeholder="Ej: M.G." maxlength="6">
      </div>
      <div class="form-group">
        <label class="form-label">Edad</label>
        <input class="form-input" id="ref-age" type="number" placeholder="Años" min="18" max="99">
      </div>
      <div class="form-group">
        <label class="form-label">Estado actual</label>
        <div class="status-opts">
          ${statusOpts.map(o => `
          <button class="status-opt${state.statusOption === o.val ? ' sel' : ''}" data-action="set-status" data-val="${o.val}">${o.label}</button>`).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Notas clínicas (opcional)</label>
        <textarea class="form-input" id="ref-notes" rows="3" placeholder="Resumen breve del perfil del paciente…" style="resize:vertical"></textarea>
      </div>
    </div>
    <div class="form-cta">
      <button class="btn btn-primary btn-full" data-action="save-referral" data-id="${state.trialId}">
        Guardar derivación
      </button>
    </div>
  </div>`;
}

function renderMyReferrals() {
  const items = state.referrals.length
    ? state.referrals.map(r => {
        const t = APP.trials.find(x => x.id === r.trialId);
        return `
        <div class="referral-card">
          <div class="ref-header">
            <div class="ref-patient">${r.patientInitials} · ${r.patientAge} años</div>
            ${referralStatusBadge(r.status)}
          </div>
          <div class="ref-trial">${r.trialName}</div>
          <div class="ref-meta">${t ? t.center + ' · ' + t.city : ''} · ${r.date}</div>
          ${r.notes ? `<p style="font-size:.78rem;color:var(--text-2);margin-top:8px;line-height:1.4">${r.notes}</p>` : ''}
        </div>`;
      }).join('')
    : `<div class="empty"><div class="empty-icon">📋</div><div class="empty-title">Sin derivaciones todavía</div><div class="empty-sub">Cuando contactes a un coordinador y registres un paciente, aparecerá aquí.</div></div>`;

  return `
  <div class="screen">
    <div class="app-header">
      <div class="logo"><div class="logo-mark">CC</div>Mis derivaciones</div>
    </div>
    <div class="referrals-list">${items}</div>
  </div>`;
}

function renderProfile() {
  const u = APP.user;
  return `
  <div class="screen">
    <div class="app-header">
      <div class="logo"><div class="logo-mark">CC</div>Mi perfil</div>
    </div>
    <div class="profile-hero">
      <div class="profile-avatar">${u.initials}</div>
      <div>
        <div class="profile-name">${u.name}</div>
        <div class="profile-spec">${u.specialty} · ${u.subspecialty}</div>
        <div class="profile-inst">${u.institution} · ${u.city}</div>
        <div class="verified-pill">${ic.shield} Matriculado verificado · ${u.matricula}</div>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat"><div class="stat-n">${state.referrals.length}</div><div class="stat-l">Derivaciones</div></div>
      <div class="stat"><div class="stat-n">5</div><div class="stat-l">Ensayos guardados</div></div>
      <div class="stat"><div class="stat-n">3</div><div class="stat-l">Contactos activos</div></div>
    </div>
    <div class="settings-list">
      <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-hint);padding:8px 10px 4px">Configuración</div>
      <div class="setting-item">
        <div class="setting-left">
          <div class="setting-icon" style="background:#EDE9FE">${ic.bell}</div>
          <div class="setting-label">Notificaciones</div>
        </div>
        <div class="setting-value">Activas ${ic.chevron}</div>
      </div>
      <div class="setting-item">
        <div class="setting-left">
          <div class="setting-icon" style="background:var(--primary-50)">${ic.users}</div>
          <div class="setting-label">Especialidad</div>
        </div>
        <div class="setting-value">${u.specialty} ${ic.chevron}</div>
      </div>
      <div class="setting-item">
        <div class="setting-left">
          <div class="setting-icon" style="background:var(--success-bg)">${ic.shield}</div>
          <div class="setting-label">Matrícula</div>
        </div>
        <div class="setting-value">${u.matricula} ${ic.chevron}</div>
      </div>
      <div class="setting-item">
        <div class="setting-left">
          <div class="setting-icon" style="background:#FEF3C7">${ic.dollar}</div>
          <div class="setting-label">Cuenta bancaria para fees</div>
        </div>
        <div class="setting-value">Configurar ${ic.chevron}</div>
      </div>
    </div>
  </div>`;
}

// ===== EVENT DELEGATION =====
document.getElementById('screen-container').addEventListener('click', handleAction);
document.getElementById('screen-container').addEventListener('input', handleInput);
document.getElementById('bottom-nav').addEventListener('click', handleNav);

function handleNav(e) {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  const screens = ['home', 'search', 'my-referrals', 'profile'];
  const idx = [...document.querySelectorAll('.nav-item')].indexOf(item);
  if (idx >= 0) go(screens[idx]);
}

function handleInput(e) {
  if (e.target.id === 'search-input') {
    state.search = e.target.value;
    // Debounce re-render slightly
    clearTimeout(state._searchTimer);
    state._searchTimer = setTimeout(() => render(), 160);
  }
}

function handleAction(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;

  const action = el.dataset.action;
  const val = el.dataset.val;
  const id = el.dataset.id ? parseInt(el.dataset.id) : null;

  const actions = {
    // Onboarding
    'ob-spec':    () => { state.ob.specialty = val; render(); },
    'ob-country': () => { state.ob.country = e.target.value; },
    'ob-province':() => { state.ob.province = e.target.value; },
    'ob-next-1':  () => { if (state.ob.specialty) go('onboarding-2'); },
    'ob-next-2':  () => go('onboarding-3'),
    'ob-finish':  () => go('home'),

    // Filters
    'filter': () => { state.filter = val; render(); },

    // Navigation
    'detail':         () => go('trial-detail',      { trialId: id }),
    'go-contact':     () => go('contact',            { trialId: id }),
    'go-refer':       () => go('register-referral',  { trialId: id }),
    'back':           () => go('home'),
    'back-to-detail': () => go('trial-detail'),

    // Chat
    'send-msg': () => {
      const ta = document.getElementById('chat-msg');
      const text = ta ? ta.value.trim() : '';
      if (!text) return;
      if (!state.messages[id]) state.messages[id] = [];
      const now = new Date();
      state.messages[id].push({ sender: 'user', text, time: `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}` });
      ta.value = '';
      render();
      // Simulate coordinator reply after 1.5s
      setTimeout(() => {
        state.messages[id].push({ sender: 'coordinator', text: 'Gracias por la información. Le confirmaremos disponibilidad en breve.', time: `${now.getHours()}:${String(now.getMinutes()+1).padStart(2,'0')}` });
        render();
      }, 1500);
    },

    // Referral status
    'set-status': () => { state.statusOption = val; render(); },

    // Save referral
    'save-referral': () => {
      const initials = document.getElementById('ref-initials')?.value.trim();
      const age      = parseInt(document.getElementById('ref-age')?.value) || 0;
      const notes    = document.getElementById('ref-notes')?.value.trim();
      if (!initials || !age) { alert('Por favor completá iniciales y edad del paciente.'); return; }
      const t = APP.trials.find(x => x.id === id);
      const today = new Date().toISOString().split('T')[0];
      state.referrals.push({ id: Date.now(), trialId: id, trialName: t?.name || '', patientInitials: initials, patientAge: age, status: state.statusOption, date: today, notes });
      state.statusOption = 'pendiente';
      go('my-referrals');
    },
  };

  actions[action]?.();
}

// ===== INIT =====
render();
