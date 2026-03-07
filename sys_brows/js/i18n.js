/**
 * GetMinted i18n Engine — sys_brows
 * Spanish (Mexican) DEFAULT · English toggle
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'gm_lang_sysbrows';
  var DEFAULT_LANG = 'es';  // Spanish is default
  var SUPPORTED = ['es', 'en'];

  function detectLang() {
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && SUPPORTED.indexOf(urlLang) !== -1) return urlLang;
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    return DEFAULT_LANG;
  }

  var currentLang = detectLang();

  function t(key, lang) {
    lang = lang || currentLang;
    var translations = window.GM_TRANSLATIONS || {};
    var langDict = translations[lang] || translations[DEFAULT_LANG] || {};
    return langDict[key] || (translations[DEFAULT_LANG] || {})[key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var mode = el.getAttribute('data-i18n-mode') || 'text';
      if (mode === 'html') {
        el.innerHTML = t(key);
      } else if (mode === 'placeholder') {
        el.placeholder = t(key);
      } else if (mode === 'title') {
        el.title = t(key);
      } else if (mode === 'aria-label') {
        el.setAttribute('aria-label', t(key));
      } else {
        el.textContent = t(key);
      }
    });
    document.documentElement.lang = currentLang;
    var titleKey = document.body.getAttribute('data-i18n-title');
    if (titleKey) document.title = t(titleKey);
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    var url = new URL(window.location);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    history.replaceState(null, '', url.toString());
    applyTranslations();
    // Update toggle button text
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = t('lang_toggle');
    window.dispatchEvent(new CustomEvent('gm-lang-change', { detail: { lang: lang } }));
  }

  function toggleLang() {
    setLang(currentLang === 'es' ? 'en' : 'es');
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '#lang-toggle {',
      '  background: rgba(192,192,192,0.12);',
      '  border: 1px solid rgba(192,192,192,0.35);',
      '  color: #e8e8e8;',
      '  font-size: 12px;',
      '  font-weight: 700;',
      '  padding: 5px 13px;',
      '  border-radius: 20px;',
      '  cursor: pointer;',
      '  font-family: inherit;',
      '  transition: all 0.2s ease;',
      '  -webkit-tap-highlight-color: transparent;',
      '  letter-spacing: 0.5px;',
      '  text-transform: uppercase;',
      '  flex-shrink: 0;',
      '}',
      '#lang-toggle:hover {',
      '  background: rgba(192,192,192,0.22);',
      '  border-color: rgba(192,192,192,0.55);',
      '}',
      '#lang-toggle:active { transform: scale(0.93); }',
    ].join('\n');
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    applyTranslations();

    if (!document.getElementById('lang-toggle')) {
      var btn = document.createElement('button');
      btn.id = 'lang-toggle';
      btn.textContent = t('lang_toggle');
      btn.setAttribute('aria-label', 'Toggle language / Cambiar idioma');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleLang();
        btn.style.transform = 'scale(0.9)';
        setTimeout(function() { btn.style.transform = ''; }, 150);
      });

      var nav = document.querySelector('nav');
      var navCta = nav && nav.querySelector('.nav-cta');
      if (navCta) {
        nav.insertBefore(btn, navCta);
      } else if (nav) {
        nav.appendChild(btn);
      } else {
        btn.style.cssText = 'position:fixed;top:14px;right:14px;z-index:9999;';
        document.body.appendChild(btn);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.GMi18n = {
    t: t,
    setLang: setLang,
    getLang: function() { return currentLang; },
    toggleLang: toggleLang,
    applyTranslations: applyTranslations
  };
})();
