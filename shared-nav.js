/* ============================================================
   shared-nav.js  —  Shifat's site-wide navbar + mode switcher
   Include BEFORE </body> on every sub-page.
   ============================================================ */
(function () {
  'use strict';

  /* ── Restore mode before paint (also done inline in <head> but belt+braces) ── */
  var savedMode = localStorage.getItem('shifat-mode') || 'light';
  if (savedMode === 'aurora') savedMode = 'cyber';
  document.documentElement.setAttribute('data-mode', savedMode);

  /* ── Inject <link> to shared stylesheet if not already present ── */
  if (!document.querySelector('link[data-shared-css]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-shared-css', '1');
    /* Works whether the file is in root or a sub-repo because GitHub Pages
       serves root repo at /, sub-repos at /repo-name/ */
    link.href = 'https://shifat0g.github.io/style.css';
    document.head.appendChild(link);
  }

  /* ── Inject Google Fonts if not already present ── */
  if (!document.querySelector('link[data-shared-fonts]')) {
    var fLink = document.createElement('link');
    fLink.rel = 'stylesheet';
    fLink.setAttribute('data-shared-fonts', '1');
    fLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&family=Cinzel+Decorative:wght@900&display=swap';
    document.head.appendChild(fLink);
  }

  /* ── HTML for navbar + mode switcher ── */
  var html = `
  <!-- ── Mode Switcher Pill ── -->
  <div class="mode-switcher" id="snModeSwitcher" role="group" aria-label="Choose color mode">
    <button class="mode-btn" data-mode="light" title="Light mode">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      <span>Light</span>
    </button>
    <button class="mode-btn" data-mode="dark" title="Dark mode">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <span>Dark</span>
    </button>
    <button class="mode-btn" data-mode="cyber" title="Cyber mode">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <span>Cyber</span>
    </button>
  </div>

  <!-- ── Pill Navbar ── -->
  <nav class="pill-nav" id="snPillNav">
    <div class="pill-inner">
      <a href="https://shifat0g.github.io/" class="pill-logo">
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="18" cy="21" rx="10" ry="12" fill="#1a1a2e"/>
          <ellipse cx="18" cy="22" rx="6" ry="8" fill="rgba(255,255,255,0.88)"/>
          <ellipse cx="18" cy="10" rx="7.5" ry="7" fill="#1a1a2e"/>
          <circle cx="15.2" cy="9" r="1.7" fill="white"/>
          <circle cx="20.8" cy="9" r="1.7" fill="white"/>
          <circle cx="15.6" cy="9.2" r="0.9" fill="#0a0e0b"/>
          <circle cx="21.2" cy="9.2" r="0.9" fill="#0a0e0b"/>
          <circle cx="15.9" cy="8.7" r="0.4" fill="white"/>
          <circle cx="21.5" cy="8.7" r="0.4" fill="white"/>
          <path d="M16.2 12.5 Q18 14.5 19.8 12.5 Q18 11.5 16.2 12.5Z" fill="#f59e0b"/>
          <ellipse cx="14" cy="32.5" rx="3.5" ry="1.5" fill="#f59e0b"/>
          <ellipse cx="22" cy="32.5" rx="3.5" ry="1.5" fill="#f59e0b"/>
          <path d="M8 16 Q5 21 8 26 Q10 22 10 18Z" fill="#1a1a2e"/>
          <path d="M28 16 Q31 21 28 26 Q26 22 26 18Z" fill="#1a1a2e"/>
        </svg>
        <span>Shifat</span>
      </a>
      <a href="https://shifat0g.github.io/" class="sn-back-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back
      </a>
    </div>
  </nav>`;

  /* ── Inject at top of body ── */
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.insertBefore(wrapper, document.body.firstChild);

  /* ── Back button style (scoped, uses CSS vars from style.css) ── */
  var style = document.createElement('style');
  style.textContent = `
    .sn-back-btn {
      display: flex; align-items: center; gap: 0.35rem;
      font-family: var(--font-m, 'DM Mono', monospace);
      font-size: 0.63rem; letter-spacing: 0.08em;
      color: var(--text-2);
      text-decoration: none;
      padding: 0.35rem 0.85rem;
      border-radius: 100px;
      background: var(--card-bg, rgba(255,255,255,0.06));
      border: 1px solid var(--card-border, rgba(255,255,255,0.1));
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .sn-back-btn:hover {
      background: var(--card-hover-bg);
      border-color: var(--card-hover-border);
      color: var(--text-1);
    }
  `;
  document.head.appendChild(style);

  /* ── Theme accents (same as index.html) ── */
  var THEME_ACCENTS = {
    arctic: { accent:'#2fbabd', soft:'rgba(47,186,189,0.18)', activeBg:'rgba(47,186,189,0.15)', activeBorder:'rgba(47,186,189,0.45)' },
    dusk:   { accent:'#3badaa', soft:'rgba(59,173,170,0.18)', activeBg:'rgba(59,173,170,0.15)', activeBorder:'rgba(59,173,170,0.45)' },
    ocean:  { accent:'#22d3ee', soft:'rgba(34,211,238,0.18)', activeBg:'rgba(34,211,238,0.12)', activeBorder:'rgba(34,211,238,0.45)' },
    forest: { accent:'#6fddaa', soft:'rgba(111,221,170,0.18)', activeBg:'rgba(111,221,170,0.12)', activeBorder:'rgba(111,221,170,0.45)' },
    ember:  { accent:'#f59e0b', soft:'rgba(245,158,11,0.18)', activeBg:'rgba(245,158,11,0.12)', activeBorder:'rgba(245,158,11,0.45)' },
    violet: { accent:'#c084fc', soft:'rgba(192,132,252,0.18)', activeBg:'rgba(192,132,252,0.12)', activeBorder:'rgba(192,132,252,0.45)' },
  };

  function applyTheme(key) {
    if (!THEME_ACCENTS[key]) return;
    localStorage.setItem('shifat-theme', key);
    var t = THEME_ACCENTS[key];
    if (document.documentElement.getAttribute('data-mode') === 'cyber') {
      var r = document.documentElement;
      r.style.setProperty('--accent', t.accent);
      r.style.setProperty('--accent-soft', t.soft);
      r.style.setProperty('--accent-dim', t.activeBg);
      r.style.setProperty('--mode-btn-active-bg', t.activeBg);
      r.style.setProperty('--mode-btn-active-border', t.activeBorder);
      r.style.setProperty('--mode-btn-active-color', t.accent);
    }
  }

  function applyMode(mode) {
    document.documentElement.setAttribute('data-mode', mode);
    if (mode !== 'cyber') {
      var r = document.documentElement;
      ['--accent','--accent-soft','--accent-dim','--mode-btn-active-bg','--mode-btn-active-border','--mode-btn-active-color'].forEach(function(p){ r.style.removeProperty(p); });
    }
    document.querySelectorAll('#snModeSwitcher .mode-btn').forEach(function(b) {
      var active = b.getAttribute('data-mode') === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    localStorage.setItem('shifat-mode', mode);
    if (mode === 'cyber') {
      applyTheme(localStorage.getItem('shifat-theme') || 'ocean');
    }
  }

  document.querySelectorAll('#snModeSwitcher .mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.classList.remove('rippling');
      void btn.offsetWidth;
      btn.classList.add('rippling');
      btn.addEventListener('animationend', function(){ btn.classList.remove('rippling'); }, { once: true });
      applyMode(btn.getAttribute('data-mode'));
    });
  });

  /* Apply on load */
  applyMode(savedMode);

})();
