/**
 * FPVSI Accessibility Widget — Vanilla JS (IIFE)
 * Port del componente React fpvsi-a11y-widget a JS puro
 * Sin dependencias: no React, no jQuery
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     Iconos SVG inline (de lucide-react)
     ══════════════════════════════════════════════ */
  var ICONS = {
    accessibility: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="m4.24 14.5a5 5 0 0 0 6.88 6"/><path d="m13.76 17.5a5 5 0 0 0-6.88-6"/></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    type: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>',
    contrast: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z"/></svg>',
    mousePointer: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>',
    space: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/></svg>',
    rotateCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    eye: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    volume2: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
    square: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    shield: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    zap: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>',
    hand: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v6"/><path d="M14 10V4a2 2 0 0 0-4 0v7"/><path d="M10 10.5V2a2 2 0 0 0-4 0v9"/><path d="M7 15.5a5 5 0 0 0 10 0V10a2 2 0 0 0-4 0"/></svg>',
    headphones: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    'help-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    'person-standing': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || '';
  }

  /* ══════════════════════════════════════════════
     Constantes (port de utils.ts)
     ══════════════════════════════════════════════ */
  var DEFAULT_COLORS = { primary: '#A10D5E', accent: '#F29429' };

  var DEFAULT_LABELS = {
    title: 'Accesibilidad',
    activeCount: function (n) { return n + ' ajuste' + (n > 1 ? 's' : '') + ' activo' + (n > 1 ? 's' : ''); },
    reset: 'Restablecer',
    close: 'Cerrar',
    fontSize: 'Texto',
    contrast: 'Alto contraste',
    bigCursor: 'Cursor grande',
    textSpacing: 'Espaciado',
    dyslexiaFont: 'Fuente legible',
    highlightLinks: 'Resaltar enlaces',
    ttsSection: 'Lector de voz',
    ttsActive: 'Activo',
    ttsReading: 'Leyendo...',
    ttsOff: 'Desactivado',
    ttsHint: 'Pulsa en cualquier texto',
    ttsHintOff: 'Haz click para activar',
    ttsStop: 'Detener lectura',
    ttsSpeed: 'Velocidad',
    langSection: 'Idioma',
    footer: 'Preferencias guardadas en tu navegador',
    trigger: 'Opciones de accesibilidad',
    reduceText: 'Reducir texto',
    increaseText: 'Aumentar texto'
  };

  var ALL_FEATURES = ['fontSize', 'contrast', 'bigCursor', 'textSpacing', 'dyslexiaFont', 'highlightLinks', 'tts', 'languages'];

  var DEFAULT_LANGUAGES = [
    { code: 'es', label: 'Español', flag: 'es.svg' },
    { code: 'en', label: 'English', flag: 'gb.svg' },
    { code: 'gl', label: 'Galego', flag: 'es-ga.svg' },
    { code: 'ca', label: 'Català', flag: 'es-ct.svg' },
    { code: 'eu', label: 'Euskara', flag: 'es-pv.svg' }
  ];

  var TTS_SPEEDS = [
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' }
  ];

  var A11Y_DEFAULTS = {
    fontSize: 0,
    contrast: false,
    bigCursor: false,
    textSpacing: false,
    dyslexiaFont: false,
    highlightLinks: false
  };

  var TTS_SELECTORS = 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, label, .wp-content > *';
  var TTS_IGNORE = 'nav, footer, header, script, style, [aria-hidden="true"], .fixed';

  /* ══════════════════════════════════════════════
     Color utils (port de utils.ts)
     ══════════════════════════════════════════════ */
  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16)
    ];
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var l = (max + min) / 2;
    var h = 0, s = 0;
    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    var a = s * Math.min(l, 1 - l);
    var f = function (n) {
      var k = (n + h / 30) % 12;
      var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return '#' + f(0) + f(8) + f(4);
  }

  function deriveColors(colors) {
    var rgb = hexToRgb(colors.primary);
    var argb = hexToRgb(colors.accent);
    var hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    return {
      primary: colors.primary,
      primaryDark: hslToHex(hsl[0], hsl[1], Math.max(0, hsl[2] - 12)),
      primaryDarker: hslToHex(hsl[0], hsl[1], Math.max(0, hsl[2] - 25)),
      primaryLight: hslToHex(hsl[0], hsl[1], Math.min(100, hsl[2] + 15)),
      accent: colors.accent,
      primaryRgb: rgb[0] + ', ' + rgb[1] + ', ' + rgb[2],
      accentRgb: argb[0] + ', ' + argb[1] + ', ' + argb[2]
    };
  }

  /* ══════════════════════════════════════════════
     DOM utils (port de utils.ts)
     ══════════════════════════════════════════════ */
  function applyState(s) {
    var r = document.documentElement;
    var base = 100 + s.fontSize * 15;
    r.style.fontSize = base === 100 ? '' : base + '%';
    r.classList.toggle('a11y-contrast', s.contrast);
    r.classList.toggle('a11y-big-cursor', s.bigCursor);
    r.classList.toggle('a11y-spacing', s.textSpacing);
    r.classList.toggle('a11y-dyslexia', s.dyslexiaFont);
    r.classList.toggle('a11y-highlight-links', s.highlightLinks);
  }

  function switchLanguage(code) {
    if (code === 'es') {
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      document.cookie = 'googtrans=; path=/; domain=.' + window.location.hostname + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    } else {
      document.cookie = 'googtrans=/es/' + code + '; path=/';
      document.cookie = 'googtrans=/es/' + code + '; path=/; domain=.' + window.location.hostname;
    }
    window.location.reload();
  }

  function isReadable(el) {
    if (el.closest(TTS_IGNORE)) return false;
    var text = el.textContent ? el.textContent.trim() : '';
    return text.length > 2;
  }

  function getVoice(lang) {
    var voices = window.speechSynthesis.getVoices();
    var prefix = lang.split('-')[0];
    return (
      voices.find(function (v) { return v.lang.startsWith(prefix) && v.localService; }) ||
      voices.find(function (v) { return v.lang.startsWith(prefix); }) ||
      null
    );
  }

  /* ══════════════════════════════════════════════
     Helpers DOM
     ══════════════════════════════════════════════ */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') {
          node.className = attrs[k];
        } else if (k === 'style' && typeof attrs[k] === 'object') {
          Object.keys(attrs[k]).forEach(function (s) { node.style[s] = attrs[k][s]; });
        } else if (k.startsWith('on') && typeof attrs[k] === 'function') {
          node.addEventListener(k.substring(2).toLowerCase(), attrs[k]);
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (children) {
      if (typeof children === 'string') {
        node.textContent = children;
      } else if (Array.isArray(children)) {
        children.forEach(function (c) { if (c) node.appendChild(c); });
      } else {
        node.appendChild(children);
      }
    }
    return node;
  }

  function setHtml(node, html) {
    node.innerHTML = html;
    return node;
  }

  function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /* ══════════════════════════════════════════════
     Widget principal
     ══════════════════════════════════════════════ */
  function init(config) {
    config = config || {};

    // Merge config
    var colors = { primary: DEFAULT_COLORS.primary, accent: DEFAULT_COLORS.accent, text: '', hoverBg: '' };
    if (config.colors) {
      if (config.colors.primary) colors.primary = config.colors.primary;
      if (config.colors.accent) colors.accent = config.colors.accent;
      if (config.colors.text) colors.text = config.colors.text;
      if (config.colors.hoverBg) colors.hoverBg = config.colors.hoverBg;
    }

    var position = config.position || 'bottom-left';
    var features = config.features || ALL_FEATURES;
    var ttsLang = config.ttsLang || 'es-ES';
    var storageKey = config.storageKey || 'a11y-prefs';
    var zIndex = config.zIndex || 9998;
    var offsetX = config.offsetX !== undefined ? config.offsetX : 20;
    var offsetY = config.offsetY !== undefined ? config.offsetY : 20;
    var flagsUrl = config.flagsUrl || '/flags/';
    var triggerIcon = config.triggerIcon && ICONS[config.triggerIcon] ? config.triggerIcon : 'accessibility';

    var labels = {};
    Object.keys(DEFAULT_LABELS).forEach(function (k) { labels[k] = DEFAULT_LABELS[k]; });
    if (config.labels) {
      Object.keys(config.labels).forEach(function (k) { labels[k] = config.labels[k]; });
    }

    // Build languages with full flag URLs
    var languages;
    if (config.languages && config.languages.length) {
      languages = config.languages.map(function (l) {
        return {
          code: l.code,
          label: l.label,
          flag: l.flag.startsWith('http') || l.flag.startsWith('/') ? l.flag : flagsUrl + l.flag
        };
      });
    } else {
      languages = DEFAULT_LANGUAGES.map(function (l) {
        return { code: l.code, label: l.label, flag: flagsUrl + l.flag };
      });
    }

    var derived = deriveColors(colors);

    function hasFeature(f) {
      return features.indexOf(f) !== -1;
    }

    // ── CSS vars ──
    var r = document.documentElement;
    r.style.setProperty('--a11y-primary', derived.primary);
    r.style.setProperty('--a11y-primary-dark', derived.primaryDark);
    r.style.setProperty('--a11y-primary-darker', derived.primaryDarker);
    r.style.setProperty('--a11y-primary-light', derived.primaryLight);
    r.style.setProperty('--a11y-accent', derived.accent);
    r.style.setProperty('--a11y-primary-rgb', derived.primaryRgb);
    r.style.setProperty('--a11y-accent-rgb', derived.accentRgb);
    // Active row colors (only set when user customizes, CSS uses fallbacks otherwise)
    if (colors.text) {
      r.style.setProperty('--a11y-text', colors.text);
    }
    if (colors.hoverBg) {
      r.style.setProperty('--a11y-active-bg', colors.hoverBg);
      var hbRgb = hexToRgb(colors.hoverBg);
      r.style.setProperty('--a11y-active-bg-rgb', hbRgb[0] + ', ' + hbRgb[1] + ', ' + hbRgb[2]);
    }

    // ── State ──
    var state = cloneObj(A11Y_DEFAULTS);
    var open = false;
    var lang = 'es';
    var ttsActive = false;
    var ttsReading = false;
    var ttsSpeed = 1;
    var ttsSupported = 'speechSynthesis' in window;
    var readingEl = null;
    var hoveredEl = null;

    // TTS event handler refs (for cleanup)
    var ttsMouseOver = null;
    var ttsMouseOut = null;
    var ttsClick = null;

    // ── Load saved state ──
    try {
      var saved = localStorage.getItem(storageKey);
      if (saved) {
        var parsed = JSON.parse(saved);
        Object.keys(A11Y_DEFAULTS).forEach(function (k) {
          if (parsed[k] !== undefined) state[k] = parsed[k];
        });
        applyState(state);
      }
    } catch (e) { /* ignored */ }

    var match = document.cookie.match(/googtrans=\/es\/(\w+)/);
    if (match && match[1]) lang = match[1];

    // ── Helpers ──
    function isDirty() {
      return JSON.stringify(state) !== JSON.stringify(A11Y_DEFAULTS);
    }

    function getActiveCount() {
      var count = 0;
      if (state.contrast) count++;
      if (state.bigCursor) count++;
      if (state.textSpacing) count++;
      if (state.dyslexiaFont) count++;
      if (state.highlightLinks) count++;
      if (state.fontSize !== 0) count++;
      return count;
    }

    function saveState() {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) { /* ignored */ }
      applyState(state);
    }

    // ── DOM refs ──
    var root, panelWrap, panel, headerSubtitle, resetBtn, body;
    var triggerBtn, triggerBadge, triggerPulse;
    var fontSizeRow, fontSizeValue, fontDecBtn, fontIncBtn;
    var toggleRows = {};
    var ttsBlock, ttsInfoLabel, ttsHintEl, ttsStopBtn, ttsSpeedWrap, ttsBarsWrap;
    var ttsSpeedBtns = [];
    var langBtns = {};

    // ══ Build DOM ══

    // Root — posición con offsets en px
    var posClass = 'fpvsi-a11y--' + position;
    var rootStyle = { zIndex: zIndex };

    // Aplicar offsets según posición (reset opposing properties)
    if (position.indexOf('bottom') !== -1) {
      rootStyle.bottom = offsetY + 'px';
      rootStyle.top = 'auto';
    } else {
      rootStyle.top = offsetY + 'px';
      rootStyle.bottom = 'auto';
    }
    if (position.indexOf('left') !== -1) {
      rootStyle.left = offsetX + 'px';
      rootStyle.right = 'auto';
    } else {
      rootStyle.right = offsetX + 'px';
      rootStyle.left = 'auto';
    }

    root = el('div', { className: 'fpvsi-a11y ' + posClass, style: rootStyle });

    // ── Panel wrap ──
    panelWrap = el('div', { className: 'fpvsi-a11y__panel-wrap fpvsi-a11y__panel-wrap--closed' });
    panel = el('div', { className: 'fpvsi-a11y__panel' });

    // Header
    var header = el('div', { className: 'fpvsi-a11y__header' });
    header.appendChild(el('div', { className: 'fpvsi-a11y__header-glow' }));

    var headerContent = el('div', { className: 'fpvsi-a11y__header-content' });
    var headerLeft = el('div', { className: 'fpvsi-a11y__header-left' });

    var headerIcon = el('div', { className: 'fpvsi-a11y__header-icon' });
    setHtml(headerIcon, icon(triggerIcon));

    var headerTextWrap = el('div');
    var headerTitle = el('span', { className: 'fpvsi-a11y__header-title' }, labels.title);
    headerSubtitle = el('p', { className: 'fpvsi-a11y__header-subtitle' });
    headerSubtitle.style.display = 'none';
    headerTextWrap.appendChild(headerTitle);
    headerTextWrap.appendChild(headerSubtitle);

    headerLeft.appendChild(headerIcon);
    headerLeft.appendChild(headerTextWrap);

    var headerActions = el('div', { className: 'fpvsi-a11y__header-actions' });

    resetBtn = el('button', {
      className: 'fpvsi-a11y__header-btn fpvsi-a11y__header-btn--reset',
      'aria-label': labels.reset,
      onClick: function () { resetAll(); }
    });
    setHtml(resetBtn, icon('rotateCcw'));
    resetBtn.style.display = 'none';

    var closeBtn = el('button', {
      className: 'fpvsi-a11y__header-btn',
      'aria-label': labels.close,
      onClick: function () { togglePanel(false); }
    });
    setHtml(closeBtn, icon('x'));

    headerActions.appendChild(resetBtn);
    headerActions.appendChild(closeBtn);

    headerContent.appendChild(headerLeft);
    headerContent.appendChild(headerActions);
    header.appendChild(headerContent);
    panel.appendChild(header);

    // Body
    body = el('div', { className: 'fpvsi-a11y__body' });

    // Font size row
    if (hasFeature('fontSize')) {
      fontSizeRow = el('div', {
        className: 'fpvsi-a11y__row fpvsi-a11y__row--inactive',
        style: { animation: 'none' }
      });
      var fsLeft = el('div', { className: 'fpvsi-a11y__row-left' });
      var fsIcon = el('div', { className: 'fpvsi-a11y__row-icon' });
      setHtml(fsIcon, icon('type'));
      var fsLabel = el('span', { className: 'fpvsi-a11y__row-label' }, labels.fontSize);
      fsLeft.appendChild(fsIcon);
      fsLeft.appendChild(fsLabel);

      var fsControls = el('div', { className: 'fpvsi-a11y__fontsize-controls' });
      fontDecBtn = el('button', {
        className: 'fpvsi-a11y__fontsize-btn',
        'aria-label': labels.reduceText,
        onClick: function () { changeFontSize(-1); }
      });
      setHtml(fontDecBtn, icon('minus'));

      fontSizeValue = el('span', { className: 'fpvsi-a11y__fontsize-value' }, '0');

      fontIncBtn = el('button', {
        className: 'fpvsi-a11y__fontsize-btn',
        'aria-label': labels.increaseText,
        onClick: function () { changeFontSize(1); }
      });
      setHtml(fontIncBtn, icon('plus'));

      fsControls.appendChild(fontDecBtn);
      fsControls.appendChild(fontSizeValue);
      fsControls.appendChild(fontIncBtn);

      fontSizeRow.appendChild(fsLeft);
      fontSizeRow.appendChild(fsControls);
      body.appendChild(fontSizeRow);
    }

    // Toggle rows
    var toggleOpts = [];
    if (hasFeature('contrast')) toggleOpts.push({ key: 'contrast', iconName: 'contrast', label: labels.contrast });
    if (hasFeature('bigCursor')) toggleOpts.push({ key: 'bigCursor', iconName: 'mousePointer', label: labels.bigCursor });
    if (hasFeature('textSpacing')) toggleOpts.push({ key: 'textSpacing', iconName: 'space', label: labels.textSpacing });
    if (hasFeature('dyslexiaFont')) toggleOpts.push({ key: 'dyslexiaFont', iconName: 'sparkles', label: labels.dyslexiaFont });
    if (hasFeature('highlightLinks')) toggleOpts.push({ key: 'highlightLinks', iconName: 'eye', label: labels.highlightLinks });

    toggleOpts.forEach(function (opt, i) {
      var row = el('button', {
        className: 'fpvsi-a11y__row fpvsi-a11y__row--inactive',
        'aria-pressed': 'false',
        'aria-label': opt.label,
        style: { animation: 'none' },
        onClick: function () { toggleOption(opt.key); }
      });

      var rowLeft = el('div', { className: 'fpvsi-a11y__row-left' });
      var rowIcon = el('div', { className: 'fpvsi-a11y__row-icon' });
      setHtml(rowIcon, icon(opt.iconName));
      var rowLabel = el('span', { className: 'fpvsi-a11y__row-label' }, opt.label);
      rowLeft.appendChild(rowIcon);
      rowLeft.appendChild(rowLabel);

      var switchEl = el('div', { className: 'fpvsi-a11y__switch fpvsi-a11y__switch--off' });
      switchEl.appendChild(el('div', { className: 'fpvsi-a11y__switch-knob' }));

      row.appendChild(rowLeft);
      row.appendChild(switchEl);
      body.appendChild(row);

      toggleRows[opt.key] = { row: row, switchEl: switchEl };
    });

    // TTS section
    if (hasFeature('tts') && ttsSupported) {
      var ttsWrap = el('div', { style: { paddingTop: '6px', animation: 'none' } });

      var ttsSectionHeader = el('div', { className: 'fpvsi-a11y__section-header fpvsi-a11y__section-header--tts' });
      setHtml(ttsSectionHeader, icon('volume2'));
      ttsSectionHeader.appendChild(el('span', { className: 'fpvsi-a11y__section-label' }, labels.ttsSection));

      ttsBlock = el('div', { className: 'fpvsi-a11y__tts-block fpvsi-a11y__tts-block--inactive' });

      var ttsTop = el('div', { className: 'fpvsi-a11y__tts-top' });
      var ttsLeft = el('div', { className: 'fpvsi-a11y__tts-left' });

      var ttsIcon = el('div', { className: 'fpvsi-a11y__row-icon' });
      setHtml(ttsIcon, icon('volume2'));

      var ttsInfoWrap = el('div');
      ttsInfoLabel = el('span', { className: 'fpvsi-a11y__tts-info-label' }, labels.ttsOff);
      ttsHintEl = el('span', { className: 'fpvsi-a11y__tts-hint' }, labels.ttsHintOff);
      ttsInfoWrap.appendChild(ttsInfoLabel);
      ttsInfoWrap.appendChild(ttsHintEl);

      ttsLeft.appendChild(ttsIcon);
      ttsLeft.appendChild(ttsInfoWrap);

      var ttsActions = el('div', { className: 'fpvsi-a11y__tts-actions' });

      ttsStopBtn = el('button', {
        className: 'fpvsi-a11y__tts-stop',
        'aria-label': labels.ttsStop,
        style: { display: 'none' },
        onClick: function (e) { e.stopPropagation(); stopTts(); }
      });
      setHtml(ttsStopBtn, icon('square'));

      var ttsToggleBtn = el('button', {
        className: 'fpvsi-a11y__tts-toggle',
        'aria-pressed': 'false',
        'aria-label': labels.ttsSection,
        onClick: function () { toggleTts(); }
      });
      var ttsSwitch = el('div', { className: 'fpvsi-a11y__switch fpvsi-a11y__switch--off' });
      ttsSwitch.appendChild(el('div', { className: 'fpvsi-a11y__switch-knob' }));
      ttsToggleBtn.appendChild(ttsSwitch);

      ttsActions.appendChild(ttsStopBtn);
      ttsActions.appendChild(ttsToggleBtn);

      ttsTop.appendChild(ttsLeft);
      ttsTop.appendChild(ttsActions);
      ttsBlock.appendChild(ttsTop);

      // TTS speed
      ttsSpeedWrap = el('div', { className: 'fpvsi-a11y__tts-speed', style: { display: 'none' } });
      ttsSpeedWrap.appendChild(el('span', { className: 'fpvsi-a11y__tts-speed-label' }, labels.ttsSpeed));

      TTS_SPEEDS.forEach(function (s) {
        var btn = el('button', {
          className: 'fpvsi-a11y__tts-speed-btn ' + (ttsSpeed === s.value ? 'fpvsi-a11y__tts-speed-btn--active' : 'fpvsi-a11y__tts-speed-btn--inactive'),
          onClick: function () { setTtsSpeed(s.value); }
        }, s.label);
        btn._speedValue = s.value;
        ttsSpeedBtns.push(btn);
        ttsSpeedWrap.appendChild(btn);
      });

      ttsBarsWrap = el('div', { className: 'fpvsi-a11y__tts-bars', style: { display: 'none' } });
      for (var bi = 1; bi <= 3; bi++) {
        ttsBarsWrap.appendChild(el('div', {
          className: 'fpvsi-a11y__tts-bar',
          style: { animation: 'a11yBar 0.8s ease-in-out ' + (bi * 0.15) + 's infinite alternate' }
        }));
      }
      ttsSpeedWrap.appendChild(ttsBarsWrap);

      ttsBlock.appendChild(ttsSpeedWrap);

      ttsWrap.appendChild(ttsSectionHeader);
      ttsWrap.appendChild(ttsBlock);
      body.appendChild(ttsWrap);
    }

    // Languages section
    if (hasFeature('languages') && languages.length > 0) {
      var langWrap = el('div', { style: { paddingTop: '6px', animation: 'none' } });

      var langSectionHeader = el('div', { className: 'fpvsi-a11y__section-header fpvsi-a11y__section-header--lang' });
      setHtml(langSectionHeader, icon('globe'));
      langSectionHeader.appendChild(el('span', { className: 'fpvsi-a11y__section-label' }, labels.langSection));

      var langsContainer = el('div', { className: 'fpvsi-a11y__langs' });

      languages.forEach(function (l) {
        var isActive = lang === l.code;
        var btn = el('button', {
          className: 'fpvsi-a11y__lang-btn ' + (isActive ? 'fpvsi-a11y__lang-btn--active' : 'fpvsi-a11y__lang-btn--inactive'),
          'aria-label': l.label,
          title: l.label,
          onClick: function () { switchLanguage(l.code); }
        });

        var flagWrap = el('div', { className: 'fpvsi-a11y__lang-flag-wrap' });
        flagWrap.appendChild(el('img', {
          src: l.flag,
          alt: l.label,
          className: 'fpvsi-a11y__lang-flag'
        }));

        if (isActive) {
          var checkWrap = el('div', { className: 'fpvsi-a11y__lang-check' });
          setHtml(checkWrap, icon('check'));
          flagWrap.appendChild(checkWrap);
        }

        btn.appendChild(flagWrap);
        btn.appendChild(el('span', { className: 'fpvsi-a11y__lang-code' }, l.code));
        langsContainer.appendChild(btn);
        langBtns[l.code] = btn;
      });

      langWrap.appendChild(langSectionHeader);
      langWrap.appendChild(langsContainer);
      body.appendChild(langWrap);
    }

    panel.appendChild(body);

    // Footer
    var footer = el('div', { className: 'fpvsi-a11y__footer' });
    footer.appendChild(el('p', { className: 'fpvsi-a11y__footer-text' }, labels.footer));
    panel.appendChild(footer);

    // ── Mobile detection ──
    var isMobile = false;
    var mq = window.matchMedia('(max-width: 767px)');
    isMobile = mq.matches;
    mq.addEventListener('change', function (e) {
      isMobile = e.matches;
      updateMobileDesktop();
    });

    // ── Handle (mobile, inside panel before header) ──
    var handle = el('div', { className: 'fpvsi-a11y__handle' });
    handle.appendChild(el('div', { className: 'fpvsi-a11y__handle-bar' }));
    panel.insertBefore(handle, panel.firstChild);

    panelWrap.appendChild(panel);

    // ── Backdrop (mobile) ──
    var backdrop = el('div', {
      className: 'fpvsi-a11y__backdrop',
      style: { zIndex: zIndex },
      onClick: function () { togglePanel(false); }
    });
    root.appendChild(backdrop);

    // Panel wrap z-index for mobile (above backdrop)
    root.appendChild(panelWrap);

    // ── Mobile tab trigger ──
    var tabBtn = el('button', {
      className: 'fpvsi-a11y__tab',
      'aria-label': labels.trigger,
      'aria-expanded': 'false',
      style: { zIndex: zIndex },
      onClick: function () { togglePanel(!open); }
    });
    setHtml(tabBtn, icon(triggerIcon));
    root.appendChild(tabBtn);

    // ── FAB trigger (desktop) ──
    triggerBtn = el('button', {
      className: 'fpvsi-a11y__trigger fpvsi-a11y__trigger--default',
      'aria-label': labels.trigger,
      'aria-expanded': 'false',
      onClick: function () { togglePanel(!open); }
    });
    setHtml(triggerBtn, icon(triggerIcon));

    triggerBadge = el('span', { className: 'fpvsi-a11y__badge', style: { display: 'none' } });
    triggerBadge.appendChild(el('span', { className: 'fpvsi-a11y__badge-text' }, '0'));
    triggerBtn.appendChild(triggerBadge);

    triggerPulse = el('span', { className: 'fpvsi-a11y__pulse', style: { display: 'none' } });
    triggerBtn.appendChild(triggerPulse);

    root.appendChild(triggerBtn);
    document.body.appendChild(root);

    // ── Initial render ──
    updateAll();
    updateMobileDesktop();

    // ── Outside click / Esc ──
    document.addEventListener('mousedown', function (e) {
      if (open && !isMobile && root && !root.contains(e.target)) {
        togglePanel(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) togglePanel(false);
    });

    /* ══════════════════════════════════════════════
       Actions
       ══════════════════════════════════════════════ */
    function togglePanel(val) {
      open = val;
      panelWrap.className = 'fpvsi-a11y__panel-wrap ' + (open ? 'fpvsi-a11y__panel-wrap--open' : 'fpvsi-a11y__panel-wrap--closed');
      triggerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      tabBtn.setAttribute('aria-expanded', open ? 'true' : 'false');

      // Backdrop (mobile)
      backdrop.className = 'fpvsi-a11y__backdrop' + (open ? ' fpvsi-a11y__backdrop--visible' : '');

      // Panel z-index for mobile (above backdrop)
      if (isMobile) {
        panelWrap.style.zIndex = zIndex + 1;
      }

      // Animate rows on open
      if (open) {
        var allRows = body.querySelectorAll('.fpvsi-a11y__row, .fpvsi-a11y__tts-block, .fpvsi-a11y__langs');
        var delay = 50;
        for (var ri = 0; ri < allRows.length; ri++) {
          allRows[ri].style.animation = 'a11ySlideIn 0.4s ease-out ' + delay + 'ms both';
          delay += 50;
        }
      }

      updateTrigger();
      updateTab();
    }

    function changeFontSize(d) {
      state.fontSize = Math.max(-2, Math.min(4, state.fontSize + d));
      saveState();
      updateFontSize();
      updateHeader();
      updateTrigger();
    }

    function toggleOption(key) {
      state[key] = !state[key];
      saveState();
      updateToggleRow(key);
      updateHeader();
      updateTrigger();
    }

    function resetAll() {
      state = cloneObj(A11Y_DEFAULTS);
      saveState();

      // Disable TTS if active
      if (ttsActive) {
        ttsActive = false;
        ttsReading = false;
        window.speechSynthesis.cancel();
        removeTtsListeners();
      }

      updateAll();
    }

    function toggleTts() {
      if (ttsActive) {
        window.speechSynthesis.cancel();
        ttsReading = false;
        clearReadingHighlight();
        removeTtsListeners();
      } else {
        addTtsListeners();
      }
      ttsActive = !ttsActive;
      updateTts();
    }

    function stopTts() {
      window.speechSynthesis.cancel();
      clearReadingHighlight();
      ttsReading = false;
      updateTts();
    }

    function setTtsSpeed(val) {
      ttsSpeed = val;
      ttsSpeedBtns.forEach(function (btn) {
        if (btn._speedValue === val) {
          btn.className = 'fpvsi-a11y__tts-speed-btn fpvsi-a11y__tts-speed-btn--active';
        } else {
          btn.className = 'fpvsi-a11y__tts-speed-btn fpvsi-a11y__tts-speed-btn--inactive';
        }
      });
    }

    /* ══════════════════════════════════════════════
       TTS listeners
       ══════════════════════════════════════════════ */
    function clearReadingHighlight() {
      if (readingEl) {
        readingEl.classList.remove('a11y-tts-reading');
        readingEl = null;
      }
    }

    function clearHoverHighlight() {
      if (hoveredEl) {
        hoveredEl.classList.remove('a11y-tts-hover');
        hoveredEl = null;
      }
    }

    function speakElement(target) {
      var synth = window.speechSynthesis;
      var text = target.textContent ? target.textContent.trim() : '';
      if (!text) return;

      synth.cancel();
      clearReadingHighlight();

      target.classList.add('a11y-tts-reading');
      readingEl = target;
      ttsReading = true;
      updateTts();

      var utter = new SpeechSynthesisUtterance(text);
      utter.lang = ttsLang;
      utter.rate = ttsSpeed;
      var voice = getVoice(ttsLang);
      if (voice) utter.voice = voice;

      utter.onend = function () {
        target.classList.remove('a11y-tts-reading');
        readingEl = null;
        ttsReading = false;
        updateTts();
      };
      utter.onerror = function () {
        target.classList.remove('a11y-tts-reading');
        readingEl = null;
        ttsReading = false;
        updateTts();
      };

      synth.speak(utter);
    }

    function addTtsListeners() {
      document.documentElement.classList.add('a11y-tts-mode');

      ttsMouseOver = function (e) {
        var target = e.target.closest ? e.target.closest(TTS_SELECTORS) : null;
        if (!target || !isReadable(target) || target === hoveredEl) return;
        clearHoverHighlight();
        target.classList.add('a11y-tts-hover');
        hoveredEl = target;
      };

      ttsMouseOut = function (e) {
        var target = e.target.closest ? e.target.closest(TTS_SELECTORS) : null;
        if (target && target === hoveredEl) {
          clearHoverHighlight();
        }
      };

      ttsClick = function (e) {
        var target = e.target.closest ? e.target.closest(TTS_SELECTORS) : null;
        if (!target || !isReadable(target)) return;
        if (target.closest('.fixed')) return;
        e.preventDefault();
        e.stopPropagation();
        speakElement(target);
      };

      document.addEventListener('mouseover', ttsMouseOver, true);
      document.addEventListener('mouseout', ttsMouseOut, true);
      document.addEventListener('click', ttsClick, true);
    }

    function removeTtsListeners() {
      document.documentElement.classList.remove('a11y-tts-mode');
      if (ttsMouseOver) document.removeEventListener('mouseover', ttsMouseOver, true);
      if (ttsMouseOut) document.removeEventListener('mouseout', ttsMouseOut, true);
      if (ttsClick) document.removeEventListener('click', ttsClick, true);
      clearHoverHighlight();
      clearReadingHighlight();
      window.speechSynthesis.cancel();
      ttsMouseOver = null;
      ttsMouseOut = null;
      ttsClick = null;
    }

    /* ══════════════════════════════════════════════
       Update DOM
       ══════════════════════════════════════════════ */
    function updateAll() {
      updateFontSize();
      Object.keys(toggleRows).forEach(function (k) { updateToggleRow(k); });
      updateHeader();
      updateTrigger();
      updateTab();
      updateTts();
    }

    function updateTab() {
      var dirty = isDirty();
      tabBtn.className = 'fpvsi-a11y__tab' + (dirty ? ' fpvsi-a11y__tab--dirty' : '');
    }

    function updateMobileDesktop() {
      // CSS handles show/hide via media queries, but we ensure z-index is correct
      if (isMobile) {
        panelWrap.style.zIndex = zIndex + 1;
      } else {
        panelWrap.style.zIndex = '';
      }
    }

    function updateHeader() {
      var count = getActiveCount();
      if (count > 0) {
        headerSubtitle.textContent = labels.activeCount(count);
        headerSubtitle.style.display = '';
      } else {
        headerSubtitle.style.display = 'none';
      }
      resetBtn.style.display = isDirty() ? '' : 'none';
    }

    function updateTrigger() {
      var dirty = isDirty();
      var count = getActiveCount();

      // Update classes
      var cls = 'fpvsi-a11y__trigger';
      if (open) {
        cls += ' fpvsi-a11y__trigger--open';
      } else if (dirty) {
        cls += ' fpvsi-a11y__trigger--dirty';
      } else {
        cls += ' fpvsi-a11y__trigger--default';
      }
      triggerBtn.className = cls;

      // Badge
      if (dirty && !open) {
        triggerBadge.style.display = '';
        triggerBadge.querySelector('.fpvsi-a11y__badge-text').textContent = count;
        triggerPulse.style.display = '';
      } else {
        triggerBadge.style.display = 'none';
        triggerPulse.style.display = 'none';
      }
    }

    function updateFontSize() {
      if (!fontSizeRow) return;
      var active = state.fontSize !== 0;
      fontSizeRow.className = 'fpvsi-a11y__row ' + (active ? 'fpvsi-a11y__row--active' : 'fpvsi-a11y__row--inactive');
      fontSizeValue.textContent = state.fontSize > 0 ? '+' + state.fontSize : '' + state.fontSize;
      fontDecBtn.disabled = state.fontSize <= -2;
      fontIncBtn.disabled = state.fontSize >= 4;
    }

    function updateToggleRow(key) {
      var ref = toggleRows[key];
      if (!ref) return;
      var active = state[key];
      ref.row.className = 'fpvsi-a11y__row ' + (active ? 'fpvsi-a11y__row--active' : 'fpvsi-a11y__row--inactive');
      ref.row.setAttribute('aria-pressed', active ? 'true' : 'false');
      ref.switchEl.className = 'fpvsi-a11y__switch ' + (active ? 'fpvsi-a11y__switch--on' : 'fpvsi-a11y__switch--off');
    }

    function updateTts() {
      if (!ttsBlock) return;

      ttsBlock.className = 'fpvsi-a11y__tts-block ' + (ttsActive ? 'fpvsi-a11y__tts-block--active' : 'fpvsi-a11y__tts-block--inactive');

      // Info label
      if (ttsActive) {
        ttsInfoLabel.textContent = ttsReading ? labels.ttsReading : labels.ttsActive;
      } else {
        ttsInfoLabel.textContent = labels.ttsOff;
      }

      // Hint
      ttsHintEl.textContent = ttsActive ? labels.ttsHint : labels.ttsHintOff;

      // Stop button
      ttsStopBtn.style.display = ttsReading ? '' : 'none';

      // Toggle switch
      var sw = ttsBlock.querySelector('.fpvsi-a11y__tts-toggle .fpvsi-a11y__switch');
      if (sw) sw.className = 'fpvsi-a11y__switch ' + (ttsActive ? 'fpvsi-a11y__switch--on' : 'fpvsi-a11y__switch--off');

      var toggleBtn = ttsBlock.querySelector('.fpvsi-a11y__tts-toggle');
      if (toggleBtn) toggleBtn.setAttribute('aria-pressed', ttsActive ? 'true' : 'false');

      // Speed section
      ttsSpeedWrap.style.display = ttsActive ? '' : 'none';

      // Bars animation
      ttsBarsWrap.style.display = ttsReading ? '' : 'none';
    }
  }

  /* ══════════════════════════════════════════════
     Destroy (remove DOM + cleanup)
     ══════════════════════════════════════════════ */
  function destroy() {
    var existing = document.querySelector('.fpvsi-a11y');
    if (existing) existing.remove();
    // Reset CSS vars
    var r = document.documentElement;
    ['--a11y-primary','--a11y-primary-dark','--a11y-primary-darker','--a11y-primary-light','--a11y-accent','--a11y-primary-rgb','--a11y-accent-rgb','--a11y-text','--a11y-active-bg','--a11y-active-bg-rgb'].forEach(function(v){
      r.style.removeProperty(v);
    });
  }

  /* ══════════════════════════════════════════════
     Expose
     ══════════════════════════════════════════════ */
  window.FpvsiA11yWidget = { init: init, destroy: destroy };
})();
