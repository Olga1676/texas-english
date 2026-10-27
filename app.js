'use strict';
(function () {
  const C = window.COURSE, L = C.lessons, TR = C.tracks, K = window.KIDS;
  const app = document.getElementById('app');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);

  // ───────── Хранилище ─────────
  const KEY = 'texas-english-v1';
  let DB = load();
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) { }
    return { profiles: {}, current: null };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { toast('Не получилось сохранить прогресс'); }
  }
  const P = () => DB.profiles[DB.current];
  const KTRACK = { title: 'Детский режим (7 лет)', short: 'Детский', who: 'Буквы и первые слова: игры с картинками, плитками и озвучкой' };
  const trackInfo = k => TR[k] || KTRACK;
  const isKids = () => !!P() && P().track === 'kids';
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) { }

  // ───────── Даты ─────────
  const z = n => String(n).padStart(2, '0');
  const todayStr = (d = new Date()) => d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  const dayNum = (s = todayStr()) => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
  const strOfDay = n => { const d = new Date(n * 864e5); return d.getUTCFullYear() + '-' + z(d.getUTCMonth() + 1) + '-' + z(d.getUTCDate()); };
  function today() { const p = P(); const t = todayStr(); p.days[t] = p.days[t] || {}; return p.days[t]; }

  // ───────── Подстановки ─────────
  function spelled(name) { return String(name || '').toUpperCase().replace(/[^A-Z]/g, '').split('').join('-'); }
  function fill(s) {
    if (s == null) return '';
    if (typeof s === 'object') s = s[P().track] || s.life || Object.values(s)[0];
    const name = (P() && P().name) || 'Anna';
    return String(s).replace(/\{name\}/g, name).replace(/\{spelled\}/g, spelled(name));
  }

  // ───────── Элементы курса (слова и фразы) ─────────
  const ITEMS = {};
  Object.entries(L).forEach(([lid, les]) => {
    (les.words || []).forEach(w => {
      const key = 'w:' + w[0];
      if (!ITEMS[key]) ITEMS[key] = { key, en: w[0], ru: w[1], hint: w[2] || '', kind: (w[3] && w[3].kind) || 'word', lesson: lid };
    });
    (les.phrases || []).forEach(p => {
      const key = 'p:' + p[0];
      if (!ITEMS[key]) ITEMS[key] = { key, en: p[0], ru: p[1], kind: 'phrase', lesson: lid };
    });
  });
  const lessonItems = lid => Object.values(ITEMS).filter(i => i.lesson === lid);
  const path = () => TR[P().track].path;
  const prog = lid => { const p = P(); p.progress[lid] = p.progress[lid] || { step: 0 }; return p.progress[lid]; };
  const isDone = lid => !!(P().progress[lid] && P().progress[lid].done);
  const unlocked = lid => { const pa = path(); const i = pa.indexOf(lid); return i <= 0 || isDone(pa[i - 1]); };
  const currentLesson = () => path().find(l => !isDone(l)) || null;
  const lessonNo = lid => path().indexOf(lid) + 1;
  function learnedLessons() { return path().filter(isDone); }
  function knownItems() { const set = new Set(learnedLessons()); return Object.values(ITEMS).filter(i => set.has(i.lesson)); }

  // ───────── Озвучка ─────────
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang)); } catch (e) { voices = []; } }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function pickVoice() {
    const want = P() && P().settings.voice;
    return voices.find(v => v.voiceURI === want)
      || voices.find(v => /en[-_]US/i.test(v.lang) && /google/i.test(v.name))
      || voices.find(v => /en[-_]US/i.test(v.lang)) || voices[0];
  }
  function speak(text, slow) {
    if (!('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(fill(text).replace(/_{2,}/g, 'blank'));
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      // Детям обычная речь чуть медленнее, а «медленно» — совсем по слогам
      const rate = ((P() && P().settings.rate) || 0.9) * (isKids() ? 0.85 : 1);
      u.rate = slow ? Math.max(isKids() ? 0.35 : 0.45, rate * 0.6) : rate;
      speechSynthesis.speak(u);
    } catch (e) { }
  }

  // ───────── Звуки ответа ─────────
  let actx = null;
  function beep(ok) {
    if (!P() || P().settings.sound === false) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = ok ? [660, 880] : [300, 220];
      notes.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.frequency.value = f; o.type = 'sine';
        g.gain.setValueAtTime(0.0001, actx.currentTime + i * 0.11);
        g.gain.exponentialRampToValueAtTime(0.15, actx.currentTime + i * 0.11 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + i * 0.11 + 0.18);
        o.connect(g).connect(actx.destination); o.start(actx.currentTime + i * 0.11); o.stop(actx.currentTime + i * 0.11 + 0.2);
      });
    } catch (e) { }
  }

  // ───────── Распознавание речи ─────────
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canListen = () => !!SR && navigator.onLine;
  function listen() {
    return new Promise((resolve, reject) => {
      let done = false;
      const r = new SR();
      r.lang = 'en-US'; r.maxAlternatives = 5; r.interimResults = false; r.continuous = false;
      r.onresult = e => { done = true; resolve([...e.results[0]].map(a => a.transcript)); };
      r.onerror = e => { if (!done) { done = true; reject(e.error || 'error'); } };
      r.onend = () => { if (!done) { done = true; resolve([]); } };
      try { r.start(); } catch (e) { reject('start'); }
      setTimeout(() => { if (!done) { try { r.stop(); } catch (e) { } } }, 9000);
    });
  }

  // ───────── Сравнение ответов ─────────
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function numWords(s) {
    const n = parseInt(s, 10);
    if (s.length > 1 && s[0] === '0' || n > 100) return s.split('').map(d => ONES[+d]).join(' ');
    if (n < 20) return ONES[n];
    if (n === 100) return 'a hundred';
    return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  }
  const CONTR = [[/\bi'm\b/g, 'i am'], [/\bthat's\b/g, 'that is'], [/\bit's\b/g, 'it is'], [/\bwhat's\b/g, 'what is'], [/\bwhere's\b/g, 'where is'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'], [/\byou're\b/g, 'you are'], [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'], [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'], [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bi'd\b/g, 'i would'], [/\bhere's\b/g, 'here is'], [/\blet's\b/g, 'let us'], [/\bthat'll\b/g, 'that will'], [/\bi'll\b/g, 'i will'], [/\bokay\b/g, 'ok'], [/\bo\.k\.?/g, 'ok'], [/\bgonna\b/g, 'going to'], [/\bmum\b/g, 'mom']];
  function norm(s) {
    s = String(s).toLowerCase().replace(/[’`´]/g, "'");
    CONTR.forEach(([a, b]) => { s = s.replace(a, b); });
    s = s.replace(/\d+/g, m => ' ' + numWords(m) + ' ').replace(/-/g, ' ');
    return s.replace(/[^a-z*' ]+/g, ' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
  }
  const words = s => (s ? s.split(' ').filter(Boolean) : []);
  function lcs(a, b) {
    const dp = new Array(b.length + 1).fill(0);
    for (const x of a) { let prev = 0; for (let j = 1; j <= b.length; j++) { const t = dp[j]; dp[j] = x === b[j - 1] ? prev + 1 : Math.max(dp[j], dp[j - 1]); prev = t; } }
    return dp[b.length];
  }
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function spellOk(said) {
    const name = (P().name || '').toLowerCase().replace(/[^a-z]/g, '');
    const s = norm(said);
    if (!name) return words(s).length > 0;
    if (s.replace(/ /g, '').includes(name)) return true;
    const singles = words(s).filter(w => w.length === 1).length;
    return singles >= Math.max(2, Math.ceil(name.length * 0.6));
  }
  function digitCount(said) {
    const raw = String(said);
    let n = (raw.match(/\d/g) || []).length;
    n += words(norm(raw.replace(/\d/g, ' '))).filter(w => ONES.slice(0, 10).includes(w) || w === 'oh').length;
    return n;
  }
  function matchOne(said, pat) {
    if (pat === '{spellname}') return spellOk(said);
    if (pat === '{digits}') return digitCount(said) >= 5;
    const s = words(norm(said));
    if (!s.length) return false;
    const pw = words(norm(pat));
    const wild = pw.includes('*');
    const fixed = pw.filter(w => w !== '*');
    if (!fixed.length) return true;
    const ratio = lcs(s, fixed) / fixed.length;
    if (wild) return ratio >= 0.75 && s.length > fixed.length * 0.75;
    return ratio >= 0.8 && s.length <= fixed.length + 3;
  }
  const matchAny = (alts, pats) => alts.some(a => pats.some(p => matchOne(a, p)));
  // Для сравнения вариантов на любом языке (norm понимает только английский)
  const keyOf = s => String(s).toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const same = (a, b) => keyOf(a) === keyOf(b);

  // ───────── Повторение (интервалы) ─────────
  const INTERVALS = [1, 1, 3, 7, 14, 30, 60];
  function srsAdd(key, wrong) {
    const s = P().srs;
    if (!s[key]) s[key] = { box: wrong ? 0 : 1, due: dayNum() + 1, wrong: wrong ? 1 : 0 };
    else if (wrong) { s[key].box = 0; s[key].due = dayNum() + 1; s[key].wrong = (s[key].wrong || 0) + 1; }
  }
  function srsReview(key, ok) {
    const s = P().srs[key]; if (!s) return;
    if (ok) s.box = Math.min(6, s.box + 1); else { s.box = 0; s.wrong = (s.wrong || 0) + 1; }
    s.due = dayNum() + INTERVALS[s.box];
  }
  const dueItems = () => Object.entries(P().srs).filter(([k, v]) => v.due <= dayNum() && ITEMS[k]).sort((a, b) => a[1].due - b[1].due).map(([k]) => ITEMS[k]);

  // ───────── Генерация заданий ─────────
  const isWordish = i => i.kind !== 'phrase';
  function distractors(correct, pool, field, n = 2) {
    const seen = new Set([keyOf(fill(correct[field]))]);
    const out = [];
    for (const it of shuffle(pool)) {
      const v = fill(it[field]); const k = keyOf(v);
      if (!k || seen.has(k)) continue;
      seen.add(k); out.push(v); if (out.length >= n) break;
    }
    return out;
  }
  function poolFor(item) {
    const same = Object.values(ITEMS).filter(i => i.kind === item.kind && i.key !== item.key);
    const near = same.filter(i => i.lesson === item.lesson);
    if (near.length >= 2) return near;
    const known = new Set(learnedLessons());
    const fam = same.filter(i => known.has(i.lesson) || i.lesson === item.lesson);
    return fam.length >= 2 ? fam : same;
  }
  function tChoiceEnRu(it) {
    return { type: 'choice', key: it.key, q: 'Как это переводится?', show: fill(it.en), audio: it.en, answer: fill(it.ru), options: shuffle([fill(it.ru), ...distractors(it, poolFor(it), 'ru')]) };
  }
  function tChoiceRuEn(it) {
    return { type: 'choice', key: it.key, q: 'Выберите по-английски', show: fill(it.ru), answer: fill(it.en), sayAfter: it.en, options: shuffle([fill(it.en), ...distractors(it, poolFor(it), 'en')]) };
  }
  function tListen(it) {
    const field = it.kind === 'num' ? 'ru' : (it.kind === 'phrase' ? 'ru' : 'en');
    return { type: 'choice', key: it.key, listen: true, q: it.kind === 'phrase' ? 'Послушайте. Что это значит?' : 'Что вы услышали?', audio: it.en, answer: fill(it[field]), sayAfter: it.en, options: shuffle([fill(it[field]), ...distractors(it, poolFor(it), field)]) };
  }
  function tListenEn(it) {
    return { type: 'choice', key: it.key, listen: true, q: 'Что вы услышали?', audio: it.en, answer: fill(it.en), options: shuffle([fill(it.en), ...distractors(it, poolFor(it), 'en')]) };
  }
  function tType(it) {
    return { type: 'type', key: it.key, q: 'Напишите по-английски', show: it.ru, answer: it.en, sayAfter: it.en };
  }
  function tBuild(ru, en, lid) {
    const tiles = words(fill(en).replace(/[.,!?]/g, '')).map(w => w);
    const lw = Object.values(ITEMS).filter(i => i.kind === 'word' && !i.en.includes(' ') && (i.lesson === lid || knownItems().includes(i)));
    const extra = shuffle(lw.map(i => i.en)).filter(w => !tiles.map(t => t.toLowerCase()).includes(w.toLowerCase())).slice(0, Math.min(3, Math.max(2, Math.ceil(tiles.length / 2))));
    return { type: 'build', q: 'Составьте фразу', show: fill(ru), answer: fill(en), sayAfter: en, tiles: shuffle(tiles.concat(extra)) };
  }
  function tGap(g) {
    return { type: 'choice', gap: true, q: 'Вставьте пропущенное', show: g[0], sub: g[3], answer: g[1], options: shuffle(g[2].slice()), sayAfter: g[0].replace(/___/, g[1]).replace(/\s*[—(].*$/, '') };
  }
  function tSpeak(it) {
    return { type: 'speak', key: it.key, q: 'Послушайте и скажите вслух', show: fill(it.en), sub: fill(it.ru), audio: it.en, answer: fill(it.en), noScore: true };
  }
  function phraseBuildFromItem(it) { return tBuild(it.ru, it.en, it.lesson); }

  function practiceTasks(lid) {
    const les = L[lid], its = lessonItems(lid);
    const ws = its.filter(isWordish), ps = its.filter(i => i.kind === 'phrase');
    const a = ws.map((w, i) => w.kind === 'letter' ? tListenEn(w) : [tChoiceEnRu, tListen, tChoiceRuEn][i % 3](w));
    const b = [];
    ps.slice(0, 3).forEach(p => b.push(tListen(p)));
    (les.build || []).forEach(x => b.push(tBuild(x[0], x[1], lid)));
    (les.gaps || []).forEach(g => b.push(tGap(g)));
    const sp = canListen() ? ps.slice(0, 2).map(tSpeak) : [];
    return shuffle(a).concat(shuffle(b), sp);
  }
  function reviewPick(n) {
    const known = Object.keys(P().srs).map(k => ITEMS[k]).filter(Boolean);
    return pick(known, n).map(it => isWordish(it) ? (it.kind === 'letter' ? tListenEn(it) : tChoiceRuEn(it)) : tListenEn(it));
  }
  function testTasks(lid) {
    const les = L[lid], its = lessonItems(lid);
    const ws = its.filter(isWordish), ps = its.filter(i => i.kind === 'phrase');
    const t = [];
    const typable = ws.filter(w => w.kind !== 'letter');
    pick(typable, 3).forEach(w => t.push(tType(w)));
    if (typable.length < 3) pick(ws.filter(w => w.kind === 'letter'), 3 - typable.length).forEach(w => t.push(tListenEn(w)));
    pick(ps, 2).forEach(p => t.push(tListenEn(p)));
    pick(les.build || [], 2).forEach(x => t.push(tBuild(x[0], x[1], lid)));
    pick(les.gaps || [], 1).forEach(g => t.push(tGap(g)));
    const rev = reviewPick(2);
    rev.forEach(x => t.push(x));
    while (t.length < 10) t.push(tChoiceRuEn(pick(ws, 1)[0]));
    return shuffle(t).slice(0, 10);
  }
  function checkpointCovers(lid) {
    const pa = path(); const i = pa.indexOf(lid);
    let s = i - 1; while (s >= 0 && !L[pa[s]].checkpoint) s--;
    return pa.slice(s + 1, i);
  }
  function checkpointTasks(lid) {
    const cov = checkpointCovers(lid);
    const its = cov.flatMap(lessonItems);
    const ws = its.filter(i => i.kind === 'word' || i.kind === 'num'), ps = its.filter(i => i.kind === 'phrase');
    const builds = cov.flatMap(c => (L[c].build || []).map(b => [b, c]));
    const gaps = cov.flatMap(c => L[c].gaps || []);
    const t = [];
    pick(ws, 6).forEach(w => t.push(tType(w)));
    pick(ps, 4).forEach(p => t.push(tListenEn(p)));
    pick(builds, 5).forEach(([b, c]) => t.push(tBuild(b[0], b[1], c)));
    pick(gaps, 5).forEach(g => t.push(tGap(g)));
    return shuffle(t);
  }
  function reviewTasks(list) {
    return list.map(it => {
      const box = (P().srs[it.key] || {}).box || 0;
      if (it.kind === 'letter') return tListenEn(it);
      if (it.kind === 'phrase') return box >= 2 ? Object.assign(phraseBuildFromItem(it), { key: it.key }) : tListen(it);
      if (box <= 1) return Math.random() < 0.5 ? tChoiceEnRu(it) : tListen(it);
      if (box <= 3) return Math.random() < 0.5 ? tChoiceRuEn(it) : tListen(it);
      return tType(it);
    });
  }

  // ───────── Навигация ─────────
  let view = { name: 'home' };
  function go(name, params = {}, replace) {
    view = Object.assign({ name }, params);
    try { history[replace ? 'replaceState' : 'pushState']({ v: view }, ''); } catch (e) { }
    render();
  }
  window.addEventListener('popstate', e => {
    if (view.name === 'kplay') { view = { name: 'home' }; render(); return; }
    if (view.name === 'quiz' || view.name === 'dialog') { view = { name: 'lesson', id: view.lid }; render(); return; }
    view = (e.state && e.state.v) || { name: 'home' }; render();
  });

  function render() {
    window.scrollTo(0, 0);
    if ('speechSynthesis' in window) try { speechSynthesis.cancel(); } catch (e) { }
    if (!P()) return renderOnboard();
    const v = view.name;
    if (isKids() && v !== 'settings') return v === 'album' ? renderAlbum() : renderKidsHome();
    const fn = { home: renderHome, course: renderCourse, lesson: renderLesson, words: renderWords, talk: renderTalk, settings: renderSettings, review: renderReviewIntro }[v];
    if (fn) fn(); else renderHome();
  }

  // ───────── Общие куски интерфейса ─────────
  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    today: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" fill="currentColor"/></svg>',
    course: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v14H4zM13 5h7v14h-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    words: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 3h11a2 2 0 0 1 2 2v11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    talk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };
  const playBtn = (text, cls = '') => `<button class="icon-btn play ${cls}" data-say="${esc(text)}" aria-label="Послушать">${ICON.play}</button>`;
  const slowBtn = text => `<button class="slow-btn" data-say-slow="${esc(text)}">медленно</button>`;
  function bindSay(root = app) {
    $$('[data-say]', root).forEach(b => b.onclick = e => { e.stopPropagation(); speak(b.dataset.say); });
    $$('[data-say-slow]', root).forEach(b => b.onclick = e => { e.stopPropagation(); speak(b.dataset.saySlow, true); });
  }
  function nav(active) {
    const tabs = [['home', 'Сегодня', ICON.today], ['course', 'Курс', ICON.course], ['words', 'Слова', ICON.words], ['talk', 'Разговор', ICON.talk], ['settings', 'Ещё', ICON.gear]];
    return `<nav class="tabbar">${tabs.map(([k, t, i]) => `<button data-tab="${k}" class="${k === active ? 'on' : ''}">${i}<span>${t}</span></button>`).join('')}</nav>`;
  }
  function bindNav() { $$('[data-tab]').forEach(b => b.onclick = () => go(b.dataset.tab)); }
  function toast(msg) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // ───────── Знакомство ─────────
  function renderOnboard(editing) {
    const tracks = Object.entries(TR);
    app.innerHTML = `
      <main class="page onboard">
        <div class="brand"><span class="brand-mark">TX</span><div><b>Texas English</b><small>английский с нуля для семьи</small></div></div>
        <h1>${editing ? 'Новый профиль' : 'Давайте познакомимся'}</h1>
        <p class="lead">У каждого члена семьи свой профиль и свой прогресс. Заниматься — 30–40 минут в день.</p>
        <label class="field"><span>Имя латиницей, как в загранпаспорте</span>
          <input id="ob-name" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Olga" maxlength="20"></label>
        <fieldset class="track-pick"><legend>Ваша программа</legend>
          ${tracks.map(([k, t], i) => `<label class="track-card"><input type="radio" name="track" value="${k}" ${i === 0 ? 'checked' : ''}><span><b>${t.title}</b><small>${t.who}</small></span></label>`).join('')}
          <label class="track-card kids-card"><input type="radio" name="track" value="kids"><span><b>🐶 ${KTRACK.title}</b><small>${KTRACK.who}</small></span></label>
        </fieldset>
        <button class="btn primary big" id="ob-go">Начать</button>
        ${editing ? '<button class="btn ghost" id="ob-cancel">Отмена</button>' : ''}
        <p class="fine">Прогресс хранится только в этом телефоне. В разделе «Ещё» можно сделать резервную копию.</p>
      </main>`;
    $('#ob-go').onclick = () => {
      const name = $('#ob-name').value.trim().replace(/[^A-Za-z \-]/g, '');
      if (!name) { toast('Напишите имя английскими буквами'); $('#ob-name').focus(); return; }
      const track = ($('input[name=track]:checked') || {}).value || 'welder';
      const id = 'p' + Date.now().toString(36);
      DB.profiles[id] = { id, name: name.charAt(0).toUpperCase() + name.slice(1), track, created: todayStr(), progress: {}, srs: {}, days: {}, stats: { ans: 0, ok: 0, lAns: 0, lOk: 0 }, settings: { rate: 0.9, voice: '', sound: true } };
      DB.current = id; save();
      speak('Hello, ' + DB.profiles[id].name + (track === 'kids' ? '! I am Buddy. Let\'s play!' : '! Let\'s start.'));
      go('home', {}, true);
    };
    if (editing) $('#ob-cancel').onclick = () => go('settings', {}, true);
  }

  // ───────── Сегодня ─────────
  function streak() {
    const p = P(); const active = d => p.days[d] && (p.days[d].review || p.days[d].test);
    let n = dayNum(); if (!active(strOfDay(n))) n--;
    let s = 0; while (active(strOfDay(n))) { s++; n--; }
    return s;
  }
  function renderHome() {
    const p = P(), t = todayStr();
    const pa = path();
    const doneToday = pa.filter(l => p.progress[l] && p.progress[l].date === t);
    const cur = currentLesson();
    const lid = doneToday.length ? doneToday[doneToday.length - 1] : cur;
    const due = dueItems().length;
    const d = p.days[t] || {};
    const learned = Object.keys(p.srs).length;
    const strong = Object.values(p.srs).filter(s => s.box >= 4).length;
    const acc = p.stats.lAns ? Math.round(p.stats.lOk / p.stats.lAns * 100) + '%' : '—';
    const plan = [];
    if (due > 0 || d.review) plan.push({ k: 'review', t: 'Повторение слов', s: d.review ? 'Сделано' : due + ' к повторению · 5–7 мин', done: !!d.review });
    if (lid) {
      const les = L[lid], pr = p.progress[lid] || {};
      if (les.checkpoint) plan.push({ k: 'test', t: les.title, s: '20 вопросов · 10–15 мин', done: !!pr.done, lid });
      else {
        plan.push({ k: 'learn', t: 'Урок: правило и новые слова', s: '10–15 мин', done: (pr.step || 0) >= 2, lid });
        plan.push({ k: 'practice', t: 'Упражнения', s: '10 мин', done: !!pr.practice, lid });
        plan.push({ k: 'dialog', t: 'Диалог вслух', s: '5 мин', done: !!pr.dialog, lid });
        plan.push({ k: 'test', t: 'Тест дня', s: '10 вопросов · нужно 80%', done: !!pr.done, lid });
        plan.push({ k: 'ai', t: 'Разговор с AI', s: 'дома, с интернетом · 10 мин', done: !!d.ai, lid, optional: true });
      }
    }
    const nextIdx = plan.findIndex(x => !x.done && !x.optional);
    const finished = lid && isDone(lid);
    app.innerHTML = `
      <main class="page">
        <header class="hello">
          <div><small>${(d => d.charAt(0).toUpperCase() + d.slice(1))(new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }))}</small><h1>Привет, ${esc(p.name)}!</h1></div>
          <div class="streak" title="Дней подряд"><b>${streak()}</b><span>дн. подряд</span></div>
        </header>
        <section class="stats">
          <div><b>${learned}</b><span>слов и фраз изучено</span></div>
          <div><b>${strong}</b><span>в долгой памяти</span></div>
          <div><b>${acc}</b><span>точность на слух</span></div>
        </section>
        ${lid ? `<section class="today-card">
          <div class="today-head"><span class="chip ${L[lid].track}">${C.trackLabels[L[lid].track]}</span><small>Урок ${lessonNo(lid)} из ${pa.length}</small></div>
          <h2>${esc(L[lid].title)}</h2>
          <p class="muted">${esc(L[lid].goal)}</p>
          <ol class="plan">${plan.map((x, i) => `<li class="${x.done ? 'done' : ''} ${i === nextIdx ? 'next' : ''}" data-plan="${x.k}" data-lid="${x.lid || ''}">
            <span class="dot">${x.done ? ICON.check : i + 1}</span><span class="pt"><b>${x.t}</b><small>${x.s}</small></span></li>`).join('')}</ol>
          ${finished ? `<div class="well-done"><b>Урок на сегодня пройден.</b> Можно отдохнуть или поговорить с AI. ${cur ? `<button class="btn ghost small" id="next-lesson">Следующий урок: ${esc(L[cur].title)}</button>` : ''}</div>` : `<button class="btn primary big" id="continue">Продолжить</button>`}
        </section>` : `<section class="today-card"><h2>Курс пройден!</h2><p>Новые уроки скоро появятся. Повторяйте слова каждый день.</p></section>`}
        <p class="fine center">Профиль: ${esc(TR[p.track].title)}</p>
      </main>${nav('home')}`;
    bindNav();
    $$('[data-plan]').forEach(li => li.onclick = () => runPlan(li.dataset.plan, li.dataset.lid));
    const c = $('#continue'); if (c) c.onclick = () => { const x = plan[nextIdx] || plan[plan.length - 1]; runPlan(x.k, x.lid); };
    const n = $('#next-lesson'); if (n) n.onclick = () => go('lesson', { id: cur });
  }
  function runPlan(k, lid) {
    if (k === 'review') return startReview();
    if (k === 'ai') return go('talk', { focus: lid });
    if (!unlocked(lid)) return toast('Сначала пройдите предыдущий урок');
    const step = { learn: (prog(lid).step || 0) >= 1 ? 1 : 0, practice: 2, dialog: 3, test: 4 }[k];
    go('lesson', { id: lid, step: L[lid].checkpoint ? 0 : step });
  }

  // ───────── Курс ─────────
  function renderCourse() {
    const pa = path();
    const cur = currentLesson();
    app.innerHTML = `
      <main class="page">
        <h1>${esc(TR[P().track].title)}</h1>
        <p class="muted">${pa.length} уроков ≈ первые 4–5 недель. Новые уроки будут добавляться.</p>
        <ol class="course-list">${pa.map((lid, i) => {
          const les = L[lid], pr = P().progress[lid] || {}, open = unlocked(lid);
          const st = pr.done ? 'done' : lid === cur ? 'current' : open ? 'open' : 'locked';
          return `<li class="${st} ${les.checkpoint ? 'checkpoint' : ''}" data-lid="${lid}">
            <span class="num">${pr.done ? ICON.check : !open ? ICON.lock : i + 1}</span>
            <span class="ct"><b>${esc(les.title)}</b><small><span class="chip ${les.track}">${C.trackLabels[les.track]}</span>${pr.done ? ` тест: ${Math.round((pr.score || 0) * 100)}%` : lid === cur ? ' сейчас' : ''}</small></span></li>`;
        }).join('')}</ol>
      </main>${nav('course')}`;
    bindNav();
    $$('.course-list li').forEach(li => li.onclick = () => {
      const lid = li.dataset.lid;
      if (!unlocked(lid)) return toast('Откроется после предыдущего урока');
      go('lesson', { id: lid });
    });
  }

  // ───────── Урок ─────────
  const STEPS = ['Правило', 'Слова', 'Упражнения', 'Диалог', 'Тест'];
  function renderLesson() {
    const lid = view.id, les = L[lid];
    if (!les) return go('home', {}, true);
    const pr = prog(lid);
    if (les.checkpoint) return renderCheckpoint(lid);
    let step = view.step != null ? view.step : Math.min(pr.step || 0, 4);
    if (pr.done && view.step == null) step = 0;
    const doneStep = i => (i === 0 && (pr.step || 0) >= 1) || (i === 1 && (pr.step || 0) >= 2) || (i === 2 && pr.practice) || (i === 3 && pr.dialog) || (i === 4 && pr.done);
    app.innerHTML = `
      <main class="page lesson">
        <header class="bar"><button class="icon-btn" id="back" aria-label="Назад">${ICON.back}</button><div class="bar-t"><small>Урок ${lessonNo(lid)} · ${C.trackLabels[les.track]}</small><b>${esc(les.title)}</b></div></header>
        <div class="steps">${STEPS.map((s, i) => `<button data-step="${i}" class="${i === step ? 'on' : ''} ${doneStep(i) ? 'ok' : ''}">${s}</button>`).join('')}</div>
        <div id="step-body"></div>
      </main>`;
    $('#back').onclick = () => go('home');
    $$('[data-step]').forEach(b => b.onclick = () => { view.step = +b.dataset.step; renderLesson(); });
    const body = $('#step-body');
    if (step === 0) stepTheory(body, lid);
    else if (step === 1) stepWords(body, lid);
    else if (step === 2) stepIntro(body, 'Упражнения', 'Около 25 коротких заданий: перевод, на слух, собрать фразу, вставить слово' + (canListen() ? ', сказать вслух' : '') + '. Ошибки вернутся в конце — так они запоминаются.', 'Начать упражнения', () => startQuiz(lid, 'practice'));
    else if (step === 3) stepIntro(body, 'Диалог: ' + les.dialog.title, les.dialog.setting + (canListen() ? ' Отвечайте вслух — телефон проверит.' : ' Сейчас нет интернета: ответы нужно будет выбирать из вариантов. Голосом — дома.'), 'Начать диалог', () => startDialog(lid));
    else stepIntro(body, 'Тест дня', '10 вопросов: написать слово, понять на слух, собрать фразу и повторить старое. Чтобы открыть следующий урок, нужно 80%.' + (pr.done ? ` Ваш результат: ${Math.round(pr.score * 100)}%.` : ''), pr.done ? 'Пройти ещё раз' : 'Начать тест', () => startQuiz(lid, 'test'));
  }
  function stepTheory(body, lid) {
    const les = L[lid];
    body.innerHTML = `
      <section class="goal"><small>Цель урока</small><p>${esc(les.goal)}</p></section>
      ${les.alphabet ? alphabetBlock() : ''}
      ${les.theory.map(s => `<article class="theory"><h3>${esc(s.h)}</h3><p>${fill(s.t)}</p>
        ${s.ex.length ? `<ul class="ex">${s.ex.map(([en, ru]) => `<li>${playBtn(en, 'sm')}<span><b>${esc(fill(en))}</b><small>${esc(fill(ru))}</small></span></li>`).join('')}</ul>` : ''}</article>`).join('')}
      <button class="btn primary big" id="next">Дальше: новые слова</button>`;
    bindSay(body);
    $('#next').onclick = () => { const pr = prog(lid); pr.step = Math.max(pr.step || 0, 1); save(); view.step = 1; renderLesson(); };
  }
  function alphabetBlock() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const ru = { A: 'эй', B: 'би', C: 'си', D: 'ди', E: 'и', F: 'эф', G: 'джи', H: 'эйч', I: 'ай', J: 'джей', K: 'кей', L: 'эл', M: 'эм', N: 'эн', O: 'оу', P: 'пи', Q: 'кью', R: 'ар', S: 'эс', T: 'ти', U: 'ю', V: 'ви', W: 'дабл-ю', X: 'экс', Y: 'уай', Z: 'зи' };
    return `<article class="theory"><h3>Алфавит — нажмите на букву</h3><div class="abc">${letters.map(l => `<button data-say="${l}."><b>${l}</b><small>${ru[l]}</small></button>`).join('')}</div>
      <p class="muted">Ваше имя по буквам: <b>${esc(spelled(P().name))}</b> ${playBtn(spelled(P().name).split('-').join('. ') + '.', 'sm')}</p></article>`;
  }
  function stepWords(body, lid) {
    const its = lessonItems(lid);
    body.innerHTML = `
      <p class="muted">Нажмите на карточку, чтобы послушать. Повторяйте вслух каждое слово 2–3 раза.</p>
      <ul class="word-list">${its.map(i => `<li data-say="${esc(i.en)}" class="${i.kind}"><span><b>${esc(fill(i.en))}</b>${i.hint ? `<em>${esc(i.hint)}</em>` : ''}<small>${esc(fill(i.ru))}</small></span>${slowBtn(i.en)}</li>`).join('')}</ul>
      <button class="btn primary big" id="next">Дальше: упражнения</button>`;
    bindSay(body);
    $('#next').onclick = () => { const pr = prog(lid); pr.step = Math.max(pr.step || 0, 2); save(); view.step = 2; renderLesson(); };
  }
  function stepIntro(body, title, text, btn, fn) {
    body.innerHTML = `<section class="intro"><h2>${esc(title)}</h2><p>${esc(text)}</p><button class="btn primary big" id="go">${esc(btn)}</button></section>`;
    $('#go').onclick = fn;
  }
  function renderCheckpoint(lid) {
    const les = L[lid], pr = prog(lid);
    const cov = checkpointCovers(lid);
    app.innerHTML = `
      <main class="page lesson">
        <header class="bar"><button class="icon-btn" id="back" aria-label="Назад">${ICON.back}</button><div class="bar-t"><small>Урок ${lessonNo(lid)}</small><b>${esc(les.title)}</b></div></header>
        <section class="intro"><h2>${esc(les.title)}</h2><p>${esc(les.goal)}</p>
        <p class="muted">Проверяем уроки: ${cov.map(c => esc(L[c].title)).join(', ')}.</p>
        ${pr.done ? `<p><b>Ваш результат: ${Math.round(pr.score * 100)}%</b></p>` : ''}
        <button class="btn primary big" id="go">${pr.done ? 'Пройти ещё раз' : 'Начать контрольную'}</button></section>
      </main>`;
    $('#back').onclick = () => go('home');
    $('#go').onclick = () => startQuiz(lid, 'checkpoint');
  }

  // ───────── Движок заданий ─────────
  function startQuiz(lid, mode) {
    let tasks;
    if (mode === 'practice') tasks = practiceTasks(lid);
    else if (mode === 'test') tasks = testTasks(lid);
    else if (mode === 'checkpoint') tasks = checkpointTasks(lid);
    runQuiz({ lid, mode, tasks });
  }
  function startReview() {
    let list = dueItems().slice(0, 20);
    let extra = false;
    if (!list.length) {
      list = Object.entries(P().srs).sort((a, b) => a[1].box - b[1].box || (b[1].wrong || 0) - (a[1].wrong || 0)).slice(0, 12).map(([k]) => ITEMS[k]).filter(Boolean);
      extra = true;
    }
    if (!list.length) return toast('Пока нечего повторять — пройдите первый урок');
    runQuiz({ mode: 'review', tasks: reviewTasks(list), extra });
  }
  function renderReviewIntro() { startReview(); }

  function runQuiz(q) {
    view = { name: 'quiz', lid: q.lid };
    try { history.pushState({ v: { name: 'lesson', id: q.lid } }, ''); } catch (e) { }
    const state = { i: 0, queue: q.tasks.slice(), firstTry: new Map(), retried: new Set(), scored: 0, correct: 0 };
    const total = q.tasks.filter(t => !t.noScore).length;
    const titles = { practice: 'Упражнения', test: 'Тест дня', checkpoint: 'Контрольная', review: 'Повторение' };
    const repeatMistakes = q.mode === 'practice' || q.mode === 'review';

    function frame(inner) {
      const pct = Math.round(state.i / state.queue.length * 100);
      app.innerHTML = `<main class="page quiz">
        <header class="qbar"><button class="icon-btn" id="quit" aria-label="Выйти">${ICON.close}</button><div class="progress"><i style="width:${pct}%"></i></div><small>${titles[q.mode]}</small></header>
        <section class="qbody">${inner}</section>
        <footer class="qfoot" id="qfoot"></footer></main>`;
      $('#quit').onclick = () => {
        app.querySelector('.qbody').innerHTML = `<div class="confirm"><h2>Выйти?</h2><p>Прогресс этого задания не сохранится.</p><button class="btn primary big" id="stay">Продолжить</button><button class="btn ghost" id="leave">Выйти</button></div>`;
        $('#qfoot').innerHTML = '';
        $('#stay').onclick = () => show();
        $('#leave').onclick = () => q.lid ? go('lesson', { id: q.lid }, true) : go('home', {}, true);
      };
      bindSay();
    }
    function show() {
      if (state.i >= state.queue.length) return finish();
      const t = state.queue[state.i];
      if (t.type === 'choice') showChoice(t);
      else if (t.type === 'type') showType(t);
      else if (t.type === 'build') showBuild(t);
      else if (t.type === 'speak') showSpeak(t);
    }
    function head(t) {
      const audio = t.audio ? `<div class="qaudio">${t.listen ? `<button class="big-play" data-say="${esc(t.audio)}" aria-label="Послушать">${ICON.play}</button>` : playBtn(t.audio)}${slowBtn(t.audio)}</div>` : '';
      return `<p class="qhint">${esc(t.q)}</p>${t.listen ? audio : `<div class="qshow ${t.gap ? 'gap' : ''}">${t.audio ? audio : ''}<b>${esc(t.show).replace('___', '<u>&nbsp;?&nbsp;</u>')}</b>${t.sub ? `<small>${esc(t.sub)}</small>` : ''}</div>`}`;
    }
    function showChoice(t) {
      frame(`${head(t)}<div class="options">${t.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`);
      if (t.audio) setTimeout(() => speak(t.audio), 250);
      $$('.opt').forEach(b => b.onclick = () => {
        const ok = same(b.textContent, t.answer);
        $$('.opt').forEach(x => { x.disabled = true; if (same(x.textContent, t.answer)) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        feedback(t, ok);
      });
    }
    function showType(t) {
      frame(`${head(t)}<input id="ans" class="answer-input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="по-английски" enterkeyhint="done">`);
      $('#qfoot').innerHTML = `<button class="btn ghost" id="skip">Не знаю</button><button class="btn primary" id="check">Проверить</button>`;
      const inp = $('#ans'); setTimeout(() => inp.focus(), 50);
      const check = () => {
        const v = norm(inp.value), a = norm(t.answer);
        if (!v) return;
        const ok = v === a || (a.length >= 5 && lev(v, a) <= 1);
        inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
        feedback(t, ok, ok && v !== a ? 'Почти! Правильно пишется так:' : null);
      };
      $('#check').onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') check(); };
      $('#skip').onclick = () => { inp.disabled = true; feedback(t, false); };
    }
    function showBuild(t) {
      const chosen = [];
      frame(`${head(t)}<div class="build-line" id="line"></div><div class="tiles" id="tiles">${t.tiles.map((w, i) => `<button class="tile" data-i="${i}">${esc(w)}</button>`).join('')}</div>`);
      $('#qfoot').innerHTML = `<button class="btn primary wide" id="check" disabled>Проверить</button>`;
      const redraw = () => {
        $('#line').innerHTML = chosen.map((i, n) => `<button class="tile in" data-n="${n}">${esc(t.tiles[i])}</button>`).join('') || '<span class="ph">Нажимайте на слова по порядку</span>';
        $$('#tiles .tile').forEach(b => b.classList.toggle('used', chosen.includes(+b.dataset.i)));
        $$('#line .tile').forEach(b => b.onclick = () => { chosen.splice(+b.dataset.n, 1); redraw(); });
        $('#check').disabled = !chosen.length;
      };
      $$('#tiles .tile').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!chosen.includes(i)) { chosen.push(i); speakWord(t.tiles[i]); redraw(); } });
      redraw();
      $('#check').onclick = () => {
        const said = chosen.map(i => t.tiles[i]).join(' ');
        const ok = norm(said) === norm(t.answer);
        $$('.tile').forEach(b => b.disabled = true);
        feedback(t, ok);
      };
    }
    function speakWord(w) { if (P().settings.tileVoice !== false) speak(w); }
    function showSpeak(t) {
      frame(`${head(t)}<div class="speak-zone"><button class="mic" id="mic" aria-label="Сказать">${ICON.mic}</button><p class="muted" id="heard">Нажмите и скажите фразу</p></div>`);
      $('#qfoot').innerHTML = `<button class="btn ghost wide" id="skip">Не могу сейчас говорить</button>`;
      setTimeout(() => speak(t.audio), 250);
      $('#skip').onclick = () => { state.i++; show(); };
      $('#mic').onclick = async () => {
        const mic = $('#mic'); mic.classList.add('rec'); $('#heard').textContent = 'Слушаю…';
        try {
          const alts = await listen();
          mic.classList.remove('rec');
          if (!alts.length) { $('#heard').textContent = 'Ничего не услышал. Попробуйте ещё раз, ближе к телефону.'; return; }
          const ok = matchAny(alts, [t.answer]);
          $('#heard').innerHTML = `Услышал: <b>«${esc(alts[0])}»</b>`;
          if (ok) { beep(true); $('#qfoot').innerHTML = `<div class="fb ok"><b>Отлично сказано!</b></div><button class="btn primary wide" id="next">Дальше</button>`; $('#next').onclick = () => { state.i++; show(); }; }
          else { beep(false); $('#heard').innerHTML += '<br>Похоже не совсем. Послушайте и попробуйте ещё раз.'; }
        } catch (e) {
          mic.classList.remove('rec');
          $('#heard').textContent = e === 'not-allowed' ? 'Разрешите доступ к микрофону в настройках браузера.' : 'Не получилось распознать (нужен интернет). Можно пропустить.';
        }
      };
    }
    function feedback(t, ok, note) {
      beep(ok);
      const first = !state.firstTry.has(t);
      if (first) state.firstTry.set(t, ok);
      if (!t.noScore && first) { state.scored++; if (ok) state.correct++; }
      const p = P();
      p.stats.ans++; if (ok) p.stats.ok++;
      if (t.listen) { p.stats.lAns++; if (ok) p.stats.lOk++; }
      if (t.key && q.mode === 'review' && first) srsReview(t.key, ok);
      if (t.key && (q.mode === 'test' || q.mode === 'checkpoint') && !ok) srsAdd(t.key, true);
      save();
      if (!ok && repeatMistakes && !state.retried.has(t)) { state.retried.add(t); state.queue.push(t); }
      if (t.sayAfter) setTimeout(() => speak(t.sayAfter), ok ? 150 : 350);
      $('#qfoot').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? (note || 'Верно!') : 'Правильный ответ:'}</b>${!ok || note ? `<span>${esc(fill(t.answer))}</span>` : (t.sayAfter && !same(fill(t.sayAfter), t.show || '') ? `<span>${esc(fill(t.sayAfter))}</span>` : '')}${t.sayAfter ? playBtn(t.sayAfter, 'sm') : ''}</div><button class="btn ${ok ? 'primary' : 'danger'} wide" id="next">Дальше</button>`;
      bindSay($('#qfoot'));
      $('#next').onclick = () => { state.i++; show(); };
    }
    function finish() {
      const score = total ? state.correct / Math.max(1, state.scored) : 1;
      const pct = Math.round(score * 100);
      const p = P(), d = today();
      let title = 'Готово!', text = '', pass = true;
      if (q.mode === 'practice') {
        prog(q.lid).practice = true; prog(q.lid).step = Math.max(prog(q.lid).step || 0, 3);
        text = `С первого раза правильно: ${pct}%. Дальше — диалог.`;
      } else if (q.mode === 'review') {
        d.review = true;
        text = q.extra ? 'Сегодня всё было повторено, поэтому мы потренировали самые трудные слова.' : `Правильно с первого раза: ${pct}%. Слова с ошибками вернутся завтра.`;
      } else {
        pass = score >= 0.8;
        const pr = prog(q.lid);
        if (pass) {
          const first = !pr.done;
          pr.done = true; pr.score = Math.max(pr.score || 0, score); pr.date = todayStr();
          d.test = true;
          if (first) lessonItems(q.lid).forEach(it => srsAdd(it.key, false));
          if (q.mode === 'checkpoint') checkpointCovers(q.lid).forEach(c => lessonItems(c).forEach(it => srsAdd(it.key, false)));
          title = pct === 100 ? 'Идеально!' : 'Тест пройден!';
          text = `Результат: ${pct}%. ${first ? 'Слова урока добавлены в повторение — завтра они появятся в «Повторении слов».' : ''}`;
        } else {
          title = 'Почти получилось';
          text = `Результат: ${pct}%, нужно 80%. Повторите правило и слова урока и попробуйте ещё раз — ошибки уже добавлены в повторение.`;
        }
      }
      save();
      app.innerHTML = `<main class="page result ${pass ? 'pass' : 'fail'}">
        <div class="score-ring" style="--p:${pct}"><b>${pct}%</b></div>
        <h1>${title}</h1><p>${esc(text)}</p>
        <div class="result-actions">
        ${q.mode === 'practice' ? `<button class="btn primary big" id="r1">Дальше: диалог</button>` : ''}
        ${(q.mode === 'test' || q.mode === 'checkpoint') && pass ? `<button class="btn primary big" id="r-ai">Поговорить с AI по теме урока</button>` : ''}
        ${(q.mode === 'test' || q.mode === 'checkpoint') && !pass ? `<button class="btn primary big" id="r-again">Попробовать ещё раз</button>` : ''}
        <button class="btn ghost big" id="r-home">На главную</button></div></main>`;
      const b1 = $('#r1'); if (b1) b1.onclick = () => go('lesson', { id: q.lid, step: 3 }, true);
      const ba = $('#r-ai'); if (ba) ba.onclick = () => go('talk', { focus: q.lid }, true);
      const bg = $('#r-again'); if (bg) bg.onclick = () => startQuiz(q.lid, q.mode);
      $('#r-home').onclick = () => go('home', {}, true);
    }
    show();
  }

  // ───────── Диалог ─────────
  function startDialog(lid) {
    const les = L[lid], dl = les.dialog;
    view = { name: 'dialog', lid };
    try { history.pushState({ v: { name: 'lesson', id: lid } }, ''); } catch (e) { }
    const allModels = Object.values(L).flatMap(x => x.dialog ? x.dialog.lines.filter(l => l[0] === 'me').map(l => fill(l[2])) : []);
    let i = 0, voiceMode = canListen(), helpUsed = 0;
    app.innerHTML = `<main class="page dialog">
      <header class="bar"><button class="icon-btn" id="back" aria-label="Назад">${ICON.back}</button><div class="bar-t"><small>Диалог</small><b>${esc(dl.title)}</b></div>
      <label class="switch"><input type="checkbox" id="tr"><span>перевод</span></label></header>
      <p class="setting">${esc(dl.setting)}</p>
      <div class="chat" id="chat"></div><div class="turn" id="turn"></div></main>`;
    $('#back').onclick = () => go('lesson', { id: lid, step: 3 }, true);
    const chat = $('#chat'), turn = $('#turn');
    $('#tr').onchange = e => chat.classList.toggle('show-tr', e.target.checked);
    function bubble(who, en, ru) {
      const div = document.createElement('div');
      div.className = 'msg ' + who;
      div.innerHTML = `${who === 'npc' ? playBtn(en, 'sm') : ''}<span><b>${esc(fill(en))}</b>${ru ? `<small>${esc(fill(ru))}</small>` : ''}</span>`;
      chat.appendChild(div); bindSay(div);
      div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    function next() {
      if (i >= dl.lines.length) return done();
      const ln = dl.lines[i];
      if (ln[0] === 'npc') {
        bubble('npc', ln[1], ln[2]); speak(ln[1]); i++;
        if (i < dl.lines.length && dl.lines[i][0] === 'me') setTimeout(next, 500);
        else { turn.innerHTML = `<button class="btn primary wide" id="cont">${i >= dl.lines.length ? 'Завершить' : 'Дальше'}</button>`; $('#cont').onclick = next; }
        return;
      }
      myTurn(ln);
    }
    function myTurn(ln) {
      const model = fill(ln[2]);
      const opts = shuffle([model, ...shuffle(allModels.filter(m => !same(m, model) && !ln[3].some(p => matchOne(m, p)))).slice(0, 2)]);
      const accept = (said, how) => {
        beep(true);
        bubble('me', how === 'voice' ? said : model, how === 'voice' && norm(said) !== norm(model) ? 'Образец: ' + model : '');
        turn.innerHTML = ''; i++; setTimeout(next, 600);
      };
      const drawVoice = () => {
        turn.innerHTML = `<div class="task"><small>Ваша реплика</small><b>${esc(ln[1])}</b></div>
          <div class="speak-zone"><button class="mic" id="mic" aria-label="Сказать">${ICON.mic}</button><p class="muted" id="heard">Нажмите и скажите по-английски</p></div>
          <div class="row"><button class="btn ghost small" id="hint">Подсказка</button><button class="btn ghost small" id="choose">Выбрать вариант</button></div>`;
        $('#hint').onclick = () => { helpUsed++; $('#heard').innerHTML = `Можно сказать: <b>${esc(model)}</b> ${playBtn(model, 'sm')} ${slowBtn(model)}`; bindSay(turn); };
        $('#choose').onclick = drawChoose;
        $('#mic').onclick = async () => {
          const mic = $('#mic'); mic.classList.add('rec'); $('#heard').textContent = 'Слушаю…';
          try {
            const alts = await listen(); mic.classList.remove('rec');
            if (!alts.length) { $('#heard').textContent = 'Ничего не услышал. Попробуйте ещё раз.'; return; }
            if (matchAny(alts, ln[3])) accept(alts[0], 'voice');
            else { beep(false); $('#heard').innerHTML = `Услышал: «${esc(alts[0])}». Не совсем подходит — попробуйте ещё раз или нажмите «Подсказка».`; }
          } catch (e) {
            mic.classList.remove('rec');
            if (e === 'not-allowed') $('#heard').textContent = 'Разрешите доступ к микрофону в настройках браузера.';
            else { voiceMode = false; toast('Голос сейчас недоступен — выбирайте вариант'); drawChoose(); }
          }
        };
      };
      const drawChoose = () => {
        turn.innerHTML = `<div class="task"><small>Ваша реплика</small><b>${esc(ln[1])}</b></div>
          <div class="options">${opts.map((o, n) => `<button class="opt" data-n="${n}">${esc(o)}</button>`).join('')}</div>
          ${voiceMode ? '<button class="btn ghost small" id="tovoice">Ответить голосом</button>' : ''}`;
        $$('.opt', turn).forEach(b => b.onclick = () => {
          if (same(b.textContent, model)) { speak(model); accept(model, 'choice'); }
          else { beep(false); b.classList.add('wrong'); b.disabled = true; toast('Не подходит по смыслу. Прочитайте задание ещё раз.'); }
        });
        const tv = $('#tovoice'); if (tv) tv.onclick = drawVoice;
      };
      voiceMode ? drawVoice() : drawChoose();
    }
    function done() {
      const pr = prog(lid); pr.dialog = true; pr.step = Math.max(pr.step || 0, 4); save();
      turn.innerHTML = `<div class="fb ok"><b>Диалог пройден!</b><span>Для закрепления пройдите его ещё раз — теперь без подсказок.</span></div>
        <button class="btn primary wide" id="totest">Дальше: тест дня</button><button class="btn ghost wide" id="again">Пройти ещё раз</button>`;
      $('#totest').onclick = () => go('lesson', { id: lid, step: 4 }, true);
      $('#again').onclick = () => startDialog(lid);
    }
    next();
  }

  // ───────── Словарь ─────────
  function renderWords() {
    const p = P();
    const list = Object.keys(p.srs).map(k => ITEMS[k]).filter(Boolean);
    const filter = view.filter || 'all';
    const shown = list.filter(i => filter === 'all' || (filter === 'weak' ? (p.srs[i.key].box <= 1) : i.kind === 'phrase'));
    const due = dueItems().length;
    app.innerHTML = `<main class="page">
      <h1>Мои слова</h1>
      <section class="review-card"><div><b>${due}</b><span>${due ? 'ждут повторения сегодня' : 'на сегодня всё повторено'}</span></div><button class="btn primary" id="rev">${due ? 'Повторить' : 'Потренировать трудные'}</button></section>
      <div class="seg">${[['all', 'Все'], ['weak', 'Трудные'], ['phr', 'Фразы']].map(([k, t]) => `<button data-f="${k}" class="${k === filter ? 'on' : ''}">${t}</button>`).join('')}</div>
      ${shown.length ? `<ul class="word-list compact">${shown.map(i => `<li data-say="${esc(i.en)}"><span><b>${esc(fill(i.en))}</b><small>${esc(fill(i.ru))}</small></span><i class="lvl" title="Уровень запоминания">${'<s></s>'.repeat(Math.min(6, p.srs[i.key].box))}${'<s class="o"></s>'.repeat(6 - Math.min(6, p.srs[i.key].box))}</i></li>`).join('')}</ul>`
        : `<p class="empty">Здесь появятся слова после первого пройденного теста. Каждое слово повторяется через 1, 3, 7, 14, 30 дней — так оно переходит в долгую память.</p>`}
    </main>${nav('words')}`;
    bindNav(); bindSay();
    $('#rev').onclick = startReview;
    $$('[data-f]').forEach(b => b.onclick = () => { view.filter = b.dataset.f; renderWords(); });
  }

  // ───────── Разговор с AI ─────────
  function aiPrompt(lid) {
    const les = L[lid];
    const its = lessonItems(lid);
    const prev = learnedLessons().filter(l => l !== lid && !L[l].checkpoint).map(l => L[l].title);
    return `Ты мой собеседник для практики разговорного английского. Мой уровень — начинающий (почти ноль). Мой родной язык русский, наша семья готовится к переезду в Техас.

Тема: «${les.title}». Цель: ${les.goal}
Сценарий: ${les.ai}

Используй в основном эти слова и фразы: ${its.map(i => fill(i.en)).join(', ')}.
${prev.length ? 'Пройденные темы: ' + prev.join('; ') + '.\n' : ''}
Правила:
1. Говори только по-английски, очень простыми короткими фразами (3–8 слов), медленно.
2. Задавай один вопрос за раз и жди моего ответа.
3. Если я ошибся — после моего ответа коротко по-русски объясни ошибку и дай правильный вариант, потом продолжай по-английски.
4. Если я говорю по-русски или «не понимаю» — повтори проще и дай перевод.
5. Через 10–12 реплик закончи разговор и по-русски скажи, что получилось хорошо, а что повторить.
Начни разговор первым.`;
  }
  function renderTalk() {
    const avail = path().filter(l => !L[l].checkpoint && (isDone(l) || l === currentLesson() || unlocked(l)));
    const focus = view.focus && avail.includes(view.focus) ? view.focus : (avail.slice().reverse().find(isDone) || avail[0]);
    const d = (P().days[todayStr()] || {});
    app.innerHTML = `<main class="page">
      <h1>Разговор с AI</h1>
      <p class="muted">Живая речь: AI играет роль собеседника, говорит медленно и поправляет ошибки по-русски. Нужен интернет и приложение Claude на телефоне.</p>
      <ol class="howto"><li>Выберите тему и нажмите <b>«Скопировать задание»</b>.</li><li>Откройте приложение <b>Claude</b>, вставьте текст и отправьте.</li><li>Нажмите кнопку <b>голосового режима</b> и разговаривайте вслух.</li></ol>
      <label class="field"><span>Тема</span><select id="topic">${avail.map(l => `<option value="${l}" ${l === focus ? 'selected' : ''}>${lessonNo(l)}. ${esc(L[l].title)}${isDone(l) ? '' : ' (текущий)'}</option>`).join('')}</select></label>
      <pre class="prompt" id="prompt">${esc(aiPrompt(focus))}</pre>
      <div class="row wrap"><button class="btn primary" id="copy">Скопировать задание</button><a class="btn ghost" href="https://claude.ai/new" target="_blank" rel="noopener">Открыть Claude</a></div>
      <button class="btn ${d.ai ? 'done-btn' : 'ghost'} wide" id="mark">${d.ai ? 'Сегодня уже поговорили ✓' : 'Отметить: сегодня поговорил(а)'}</button>
      <p class="fine">Совет: сначала включите в задании «перевод» — попросите AI дублировать по-русски. Через неделю — без перевода.</p>
    </main>${nav('talk')}`;
    bindNav();
    $('#topic').onchange = e => { view.focus = e.target.value; renderTalk(); };
    $('#copy').onclick = async () => {
      const txt = aiPrompt($('#topic').value);
      try { await navigator.clipboard.writeText(txt); toast('Задание скопировано'); }
      catch (e) { const r = document.createRange(); r.selectNodeContents($('#prompt')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Выделено — нажмите «Копировать»'); }
    };
    $('#mark').onclick = () => { today().ai = true; save(); renderTalk(); toast('Отмечено'); };
  }

  // ───────── Настройки ─────────
  function renderSettings() {
    const p = P();
    loadVoices();
    app.innerHTML = `<main class="page settings">
      <h1>Ещё</h1>
      <section class="card"><h3>Профиль</h3>
        <div class="profiles">${Object.values(DB.profiles).map(x => `<button class="prof ${x.id === p.id ? 'on' : ''}" data-pid="${x.id}"><b>${esc(x.name)}</b><small>${esc(trackInfo(x.track).short)}</small></button>`).join('')}<button class="prof add" id="add">+ Добавить</button></div>
        <label class="field"><span>Программа</span><select id="track">${Object.entries(TR).concat([['kids', KTRACK]]).map(([k, t]) => `<option value="${k}" ${k === p.track ? 'selected' : ''}>${t.title}</option>`).join('')}</select></label>
      </section>
      <section class="card"><h3>Голос и звук</h3>
        <label class="field"><span>Голос</span><select id="voice"><option value="">Автоматически (американский)</option>${voices.map(v => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === p.settings.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select></label>
        <label class="field"><span>Скорость речи: <b id="rv">${p.settings.rate}</b></span><input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${p.settings.rate}"></label>
        <div class="row wrap"><button class="btn ghost small" id="test-voice">Проверить голос</button>
        <label class="switch"><input type="checkbox" id="sound" ${p.settings.sound !== false ? 'checked' : ''}><span>звуки ответов</span></label></div>
        ${voices.length ? '' : '<p class="warn">Английский голос не найден. Установите его по инструкции ниже.</p>'}
      </section>
      <section class="card"><h3>Установить на телефон</h3>
        <ol class="howto"><li>Откройте это приложение в <b>Chrome</b>.</li><li>Нажмите меню <b>⋮</b> → <b>«Добавить на главный экран»</b> (или «Установить приложение»).</li><li>Иконка появится на рабочем столе. Уроки, слова и тесты работают <b>без интернета</b>.</li></ol>
        <h4>Озвучка без интернета (Android)</h4>
        <ol class="howto"><li>Настройки телефона → <b>Система</b> → <b>Язык и ввод</b> → <b>Синтез речи</b> (Text-to-speech).</li><li>Выберите <b>Google</b> → значок настроек → <b>Установка голосовых данных</b>.</li><li>Скачайте <b>English (United States)</b>.</li></ol>
        <p class="fine">Проверка голоса (микрофон) работает только с интернетом. Без сети ответы в диалогах выбираются из вариантов.</p>
      </section>
      <section class="card"><h3>Резервная копия</h3>
        <p class="fine">Прогресс хранится в этом телефоне. Сохраните копию — например, отправьте файл себе в Telegram.</p>
        <div class="row wrap"><button class="btn ghost small" id="export">Сохранить копию</button><button class="btn ghost small" id="import">Восстановить</button></div>
        <textarea id="io" class="io" hidden placeholder="Вставьте сюда текст копии"></textarea>
        <button class="btn primary small" id="do-import" hidden>Загрузить копию</button>
      </section>
      <section class="card danger-zone"><h3>Сброс</h3><button class="btn ghost small" id="reset">Удалить этот профиль</button><div id="reset-confirm"></div></section>
      <p class="fine center">Texas English · версия 1</p>
    </main>${isKids() ? `<nav class="tabbar kids-back"><button data-tab="home">${ICON.back}<span>Вернуться к игре</span></button></nav>` : nav('settings')}`;
    bindNav();
    $$('[data-pid]').forEach(b => b.onclick = () => { DB.current = b.dataset.pid; save(); go('home'); });
    $('#add').onclick = () => renderOnboard(true);
    $('#track').onchange = e => { p.track = e.target.value; save(); toast('Программа изменена, пройденные уроки сохранены'); renderSettings(); };
    $('#voice').onchange = e => { p.settings.voice = e.target.value; save(); speak('Hello! How are you?'); };
    $('#rate').oninput = e => { p.settings.rate = +e.target.value; $('#rv').textContent = e.target.value; };
    $('#rate').onchange = () => { save(); speak('This is my speed.'); };
    $('#sound').onchange = e => { p.settings.sound = e.target.checked; save(); };
    $('#test-voice').onclick = () => speak('Hello! My name is ' + p.name + '. Nice to meet you.');
    $('#export').onclick = () => {
      const data = JSON.stringify(DB);
      try {
        const blob = new Blob([data], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'texas-english-' + todayStr() + '.json';
        document.body.appendChild(a); a.click(); a.remove();
      } catch (e) { }
      const io = $('#io'); io.hidden = false; io.value = data; io.select();
      try { navigator.clipboard.writeText(data).then(() => toast('Копия сохранена и скопирована')); } catch (e) { }
    };
    $('#import').onclick = () => {
      const io = $('#io'); io.hidden = false; io.value = ''; io.focus(); $('#do-import').hidden = false;
      const f = document.createElement('input'); f.type = 'file'; f.accept = '.json,application/json';
      f.onchange = () => { const r = new FileReader(); r.onload = () => { io.value = r.result; }; r.readAsText(f.files[0]); };
      f.click();
    };
    $('#do-import').onclick = () => {
      try {
        const d = JSON.parse($('#io').value);
        if (!d.profiles) throw 0;
        DB = d; save(); toast('Прогресс восстановлен'); go('home', {}, true);
      } catch (e) { toast('Это не похоже на копию прогресса'); }
    };
    $('#reset').onclick = () => {
      $('#reset-confirm').innerHTML = `<p>Удалить профиль <b>${esc(p.name)}</b> и весь его прогресс? Это нельзя отменить.</p><button class="btn danger small" id="really">Да, удалить</button>`;
      $('#really').onclick = () => { delete DB.profiles[p.id]; DB.current = Object.keys(DB.profiles)[0] || null; save(); go('home', {}, true); };
    };
  }

  // ───────── Детский режим ─────────
  const KL = K.lessons, ABC = Object.keys(K.letters);
  const kidsState = () => { const p = P(); p.kids = p.kids || { stickers: [] }; return p.kids; };
  const kDone = id => !!(P().progress[id] && P().progress[id].done);
  const kCurrent = () => KL.findIndex(l => !kDone(l.id));
  const kUnlocked = i => i === 0 || kDone(KL[i - 1].id);
  // Буквы и слова, пройденные к концу занятия i (включая его)
  const lettersUpTo = i => KL.slice(0, i + 1).map(l => l.letters || '').join('');
  const wordsUpTo = i => KL.slice(0, i + 1).flatMap(l => l.words || []);
  const kWord = w => ({ en: w, emoji: K.words[w][0], ru: K.words[w][1], gap: !!K.words[w][2] });
  const letterWord = c => ({ en: K.letters[c].word, emoji: K.letters[c].emoji, ru: K.letters[c].ru, gap: K.gapLetters.includes(c) });
  function knownWordsUpTo(i) {
    const seen = new Set();
    return [...lettersUpTo(i)].map(letterWord).concat(wordsUpTo(i).map(kWord)).filter(w => !seen.has(w.en) && seen.add(w.en));
  }
  // Буквы, которые звучат одинаково, не ставим рядом в «С какой буквы?»
  const SOUNDALIKE = { C: 'KS', K: 'CQ', S: 'C', Q: 'K' };
  function letterPool(c, i, n = 2) {
    const bad = c + (SOUNDALIKE[c] || '');
    const out = pick([...new Set(lettersUpTo(i))].filter(x => !bad.includes(x)), n);
    return out.concat(pick(ABC.filter(x => !bad.includes(x) && !out.includes(x)), n - out.length));
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  function tkListen(c, i) {
    return { type: 'kchoice', game: 'listen', key: 'kl:' + c, q: 'Послушай и нажми букву', audio: c, answer: c, options: shuffle([c, ...letterPool(c, i)]), big: true, hint: 'Послушай ещё раз.', after: c };
  }
  function tkPair(c, i) {
    return { type: 'kchoice', game: 'pair', key: 'kl:' + c, q: 'Найди маленькую букву', show: c, answer: c.toLowerCase(), options: shuffle([c, ...letterPool(c, i)]).map(x => x.toLowerCase()), big: true, hint: 'Большая и маленькая — одна и та же буква.', after: c };
  }
  function tkFirst(c, i) {
    const L1 = K.letters[c];
    return { type: 'kchoice', game: 'first', key: 'kl:' + c, q: 'С какой буквы начинается?', emoji: L1.emoji, sub: L1.ru, audio: L1.word, answer: c, options: shuffle([c, ...letterPool(c, i)]), big: true, hint: `Первый звук: ${L1.sound}.`, after: L1.word, reveal: L1.word };
  }
  function tkGap(w, i) {
    const g = pick(K.gaps, 1)[0];
    const others = pick(knownWordsUpTo(i).filter(x => x.gap && x.en !== w.en), 2).map(x => x.en);
    const sent = g[0].replace('___', w.en);
    return { type: 'kchoice', game: 'gap', q: 'Вставь слово', show: g[0], emoji: w.emoji, sub: `${g[1]}… ${w.ru}`, answer: w.en, options: shuffle([w.en, ...others]), hint: `«${w.ru}» начинается с буквы ${w.en[0].toUpperCase()}.`, after: sent, reveal: sent };
  }
  function tkWord(word, i) {
    const w = kWord(word), letters = [...word];
    const extra = letterPool(word[0].toUpperCase(), i, 6).map(x => x.toLowerCase()).filter(x => !letters.includes(x)).slice(0, 2);
    return { type: 'kbuild', game: 'word', key: 'kw:' + word, q: 'Собери слово', emoji: w.emoji, sub: w.ru, audio: word, answer: letters, tiles: shuffle(letters.concat(extra)), after: word };
  }
  const phraseWords = s => fill(s).replace(/[.,!?]/g, '').split(' ').filter(Boolean);
  function tkPhrase(ph) {
    const ans = phraseWords(ph[0]), low = ans.map(x => x.toLowerCase());
    const extra = pick([...new Set(KL.filter(l => l.phrase).flatMap(l => phraseWords(l.phrase[0])))].filter(x => !low.includes(x.toLowerCase())), 2);
    return { type: 'kbuild', game: 'phrase', q: 'Собери фразу', show: fill(ph[1]), audio: ph[0], answer: ans, tiles: shuffle(ans.concat(extra)), after: ph[0] };
  }
  function tkSpeak(w) {
    return { type: 'kspeak', q: 'Скажи вслух', emoji: w.emoji, show: w.en, sub: w.ru, audio: w.en, noScore: true };
  }
  const kidsDue = () => Object.entries(P().srs).filter(([k, v]) => /^k[lw]:/.test(k) && v.due <= dayNum()).sort((a, b) => a[1].due - b[1].due).map(([k]) => k);
  function tkReview(key, i) {
    const id = key.slice(3);
    const t = key[1] === 'l' ? [tkListen, tkPair, tkFirst][Math.floor(Math.random() * (K.letters[id].noFirst ? 2 : 3))](id, i) : tkWord(id, i);
    return Object.assign(t, { review: true });
  }
  function kidsLessonTasks(i) {
    const les = KL[i];
    if (les.check) return kidsCheckTasks(i);
    const lets = [...les.letters];
    const t = shuffle(lets.map(c => tkListen(c, i)))
      .concat(shuffle(lets.map(c => tkPair(c, i)).concat(lets.filter(c => !K.letters[c].noFirst).map(c => tkFirst(c, i)))));
    // Повторение старых букв и слов, если подошёл их день
    const mine = new Set(lets.map(c => 'kl:' + c).concat(les.words.map(w => 'kw:' + w)));
    kidsDue().filter(k => !mine.has(k)).slice(0, 3).forEach(k => t.push(tkReview(k, i)));
    les.words.forEach(w => t.push(tkWord(w, i)));
    pick(knownWordsUpTo(i).filter(w => w.gap), 2).forEach(w => t.push(tkGap(w, i)));
    t.push(tkPhrase(les.phrase));
    if (canListen()) t.push(tkSpeak(letterWord(pick(lets.filter(c => !K.letters[c].noFirst), 1)[0])));
    return t;
  }
  function kidsCheckTasks(i) {
    const t = [];
    pick(ABC, 6).forEach(c => t.push(tkListen(c, i)));
    pick(ABC, 4).forEach(c => t.push(tkPair(c, i)));
    pick(ABC.filter(c => !K.letters[c].noFirst), 4).forEach(c => t.push(tkFirst(c, i)));
    pick(wordsUpTo(i), 3).forEach(w => t.push(tkWord(w, i)));
    return shuffle(t);
  }
  function kidsReviewTasks() {
    const i = KL.length - 1;
    let keys = kidsDue().slice(0, 10);
    if (keys.length < 6) keys = keys.concat(pick(ABC.map(c => 'kl:' + c).concat(wordsUpTo(i).map(w => 'kw:' + w)).filter(k => !keys.includes(k)), 10 - keys.length));
    return shuffle(keys.map(k => tkReview(k, i)));
  }

  const buddy = (text, cls = '') => `<div class="buddy ${cls}"><span class="pup" aria-hidden="true">🐶</span><p class="bubble" id="bubble">${esc(text)}</p></div>`;
  function say(text, mood) {
    const b = $('#bubble'); if (!b) return;
    b.textContent = text; const bd = b.parentNode;
    bd.classList.remove('happy', 'oops'); void bd.offsetWidth; if (mood) bd.classList.add(mood);
  }
  const kslow = text => `<button class="kslow" data-say-slow="${esc(text)}">🐢 медленно</button>`;
  const kplay = (text, cls = '') => `<span class="kaudio"><button class="kplay-btn ${cls}" data-say="${esc(text)}" aria-label="Послушать">${ICON.play}</button>${kslow(text)}</span>`;

  function renderKidsHome() {
    const p = P(), cur = kCurrent(), ks = kidsState();
    const curLes = KL[cur];
    const next = cur < 0 ? 'Все буквы пройдены! Играем и повторяем.' : curLes.check ? 'Сегодня: большая буквенная проверка!' : `Сегодня: буквы ${[...curLes.letters].join(' ')}`;
    app.innerHTML = `<main class="page kids khome">
      <header class="khead"><h1>Привет, ${esc(p.name)}!</h1><button class="icon-btn" id="kset" aria-label="Для родителей">${ICON.gear}</button></header>
      ${buddy(ks.stickers.length ? 'Ура, снова ты! Поиграем?' : 'Я щенок Бадди! Будем учить английские буквы?', 'big')}
      <button class="kgo" id="play">Играть!</button>
      <p class="knext">${esc(next)}</p>
      <section class="kmap" aria-label="Занятия">${KL.map((l, i) => {
        const pr = p.progress[l.id] || {}, open = kUnlocked(i);
        return `<button class="kstop ${pr.done ? 'done' : ''} ${i === cur ? 'cur' : ''}" data-k="${i}" ${open ? '' : 'disabled'}>
          <b>${l.check ? '🏆' : esc([...l.letters].join(''))}</b><small>${pr.done ? '⭐'.repeat(pr.stars || 1) : open ? 'играть' : '🔒'}</small></button>`;
      }).join('')}</section>
      <button class="btn ghost big kalbum" id="album">🎁 Альбом наклеек · ${ks.stickers.length}</button>
    </main>`;
    $('#play').onclick = () => cur < 0 ? kidsPlay(-1) : kidsPlay(cur);
    $$('[data-k]').forEach(b => b.onclick = () => kidsPlay(+b.dataset.k));
    $('#album').onclick = () => go('album');
    $('#kset').onclick = () => go('settings');
  }
  function renderAlbum() {
    const st = kidsState().stickers;
    const slots = Math.max(K.stickers.length, Math.ceil(st.length / 5) * 5);
    app.innerHTML = `<main class="page kids kalbum-page">
      <header class="khead"><button class="icon-btn" id="back" aria-label="Назад">${ICON.back}</button><h1>Мои наклейки</h1><span></span></header>
      ${buddy(st.length ? `У тебя уже ${st.length}! Каждое занятие — новая наклейка.` : 'Пока пусто. Поиграй — и тут появится первая наклейка!')}
      <div class="stickers">${Array.from({ length: slots }, (_, i) => `<span class="${st[i] ? 'got' : ''}">${st[i] || ''}</span>`).join('')}</div>
    </main>`;
    $('#back').onclick = () => go('home', {}, true);
  }

  // i — номер занятия, -1 — повторение после всего алфавита
  function kidsPlay(i) {
    const les = KL[i];
    const intro = les && !les.check ? [...les.letters] : [];
    const tasks = i < 0 ? kidsReviewTasks() : kidsLessonTasks(i);
    view = { name: 'kplay' };
    try { history.pushState({ v: { name: 'home' } }, ''); } catch (e) { }
    const state = { step: 0, scored: 0, firstOk: 0 };
    const steps = intro.map(c => ({ type: 'kintro', c })).concat(tasks);

    function frame(inner, bubbleText) {
      const pct = Math.round(state.step / steps.length * 100);
      app.innerHTML = `<main class="page kids kplay">
        <header class="qbar"><button class="icon-btn" id="quit" aria-label="Выйти">${ICON.close}</button><div class="progress"><i style="width:${pct}%"></i></div></header>
        <section class="kbody">${inner}</section>
        <footer class="kfoot">${buddy(bubbleText)}<div id="knext"></div></footer></main>`;
      $('#quit').onclick = () => {
        $('.kbody').innerHTML = `<div class="confirm"><h2>Закончить игру?</h2><button class="btn primary big" id="stay">Играть дальше</button><button class="btn ghost big" id="leave">Домой</button></div>`;
        $('#knext').innerHTML = '';
        $('#stay').onclick = show;
        $('#leave').onclick = () => go('home', {}, true);
      };
      bindSay();
    }
    function nextBtn(text = 'Дальше ➜') {
      $('#knext').innerHTML = `<button class="kgo small" id="next">${text}</button>`;
      $('#next').onclick = () => { state.step++; show(); };
    }
    function show() {
      if (state.step >= steps.length) return finish();
      const t = steps[state.step];
      if (t.type === 'kintro') showIntro(t.c);
      else if (t.type === 'kchoice') showChoice(t);
      else if (t.type === 'kbuild') showBuild(t);
      else if (t.type === 'kspeak') showSpeak(t);
    }
    function showIntro(c) {
      const x = K.letters[c];
      frame(`<p class="kq">Новая буква</p>
        <div class="kletter"><b>${c}<span>${c.toLowerCase()}</span></b>${kplay(c)}</div>
        <p class="kname">Называется <b>«${esc(x.name)}»</b></p>
        <p class="ksound">Звучит как <b>${esc(x.sound)}</b></p>
        <button class="kword" data-say="${esc(x.word)}"><span>${x.emoji}</span><b>${x.noFirst ? esc(x.word).replace('x', '<u>x</u>') : `<u>${esc(x.word[0])}</u>${esc(x.word.slice(1))}`}</b><small>${esc(x.ru)}</small></button>${kslow(x.word)}`,
        `Это буква ${c}! Нажми на картинку и послушай слово.`);
      setTimeout(() => speak(c), 300);
      nextBtn();
    }
    function prompt(t) {
      const audio = t.audio && t.game !== 'gap' ? kplay(t.audio, t.game === 'listen' ? 'huge' : '') : '';
      if (t.game === 'listen') return `<p class="kq">${esc(t.q)}</p><div class="kshow">${audio}</div>`;
      if (t.game === 'pair') return `<p class="kq">${esc(t.q)}</p><div class="kshow"><b class="kbigletter">${esc(t.show)}</b></div>`;
      if (t.game === 'gap') return `<p class="kq">${esc(t.q)}</p><div class="kshow"><span class="kemoji">${t.emoji}</span><b class="ksent" id="reveal">${esc(t.show).replace('___', '<u>&nbsp;?&nbsp;</u>')}</b><small>${esc(t.sub)}</small></div>`;
      if (t.game === 'phrase') return `<p class="kq">${esc(t.q)}</p><div class="kshow"><b class="ksent">${esc(t.show)}</b>${audio}</div>`;
      return `<p class="kq">${esc(t.q)}</p><div class="kshow"><span class="kemoji">${t.emoji}</span>${audio}<small id="reveal">${esc(t.sub || '')}</small></div>`;
    }
    function score(t, ok) {
      if (t.noScore) return;
      state.scored++; if (ok) state.firstOk++;
      if (t.review && t.key) srsReview(t.key, ok);
      const p = P(); p.stats.ans++; if (ok) p.stats.ok++;
      save();
    }
    function praise(t) {
      beep(true);
      say(pick(K.praise, 1)[0], 'happy');
      if (t.after) setTimeout(() => speak(t.after), 200);
      nextBtn();
    }
    function showChoice(t) {
      let miss = 0;
      frame(`${prompt(t)}<div class="kopts ${t.big ? 'letters' : ''}">${t.options.map(o => `<button class="kopt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`, t.review ? 'Это мы уже учили. Вспомнишь?' : 'Выбирай!');
      if (t.audio) setTimeout(() => speak(t.audio), 300);
      $$('.kopt').forEach(b => b.onclick = () => {
        if (b.dataset.v === t.answer) {
          if (!miss) score(t, true);
          $$('.kopt').forEach(x => { x.disabled = true; x.classList.remove('hintme'); });
          b.classList.add('right');
          const r = $('#reveal'); if (r && t.reveal) r.textContent = t.reveal;
          return praise(t);
        }
        if (!miss) score(t, false);
        miss++; beep(false);
        b.classList.add('wrong'); b.disabled = true;
        say(pick(K.tryAgain, 1)[0] + ' ' + t.hint, 'oops');
        if (t.game === 'listen') setTimeout(() => speak(t.audio, true), 400);
        if (miss >= 2) $$('.kopt').forEach(x => { if (x.dataset.v === t.answer) x.classList.add('hintme'); });
      });
    }
    function showBuild(t) {
      let pos = 0, miss = 0;
      const word = t.game === 'word';
      const slot = (v, n) => `<span class="kslot ${v ? 'in' : ''}">${v ? esc(v) : ''}</span>`;
      frame(`${prompt(t)}<div class="kline ${word ? 'letters' : ''}" id="line"></div><div class="ktiles ${word ? 'letters' : ''}">${t.tiles.map((w, n) => `<button class="ktile" data-n="${n}">${esc(w)}</button>`).join('')}</div>`,
        word ? 'Нажимай буквы по порядку!' : 'Нажимай слова по порядку!');
      const draw = () => { $('#line').innerHTML = t.answer.map((w, n) => slot(n < pos ? w : '', n)).join(word ? '' : ' '); };
      draw();
      setTimeout(() => speak(t.audio), 300);
      $$('.ktile').forEach(b => b.onclick = () => {
        const v = t.tiles[+b.dataset.n];
        if (v.toLowerCase() === t.answer[pos].toLowerCase()) {
          b.classList.add('used'); b.disabled = true; b.classList.remove('hintme');
          pos++; draw();
          if (pos < t.answer.length) { speak(word ? v.toUpperCase() : v); say(word ? 'Так! Дальше.' : 'Так! Следующее слово.'); return; }
          score(t, !miss);
          $$('.ktile').forEach(x => x.disabled = true);
          return praise(t);
        }
        miss++; beep(false);
        b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
        const need = t.answer[pos];
        say(pick(K.tryAgain, 1)[0] + ' ' + (word ? `Следующая буква — «${K.letters[need.toUpperCase()].name}».` : 'Послушай фразу ещё раз.'), 'oops');
        if (!word) speak(t.audio, true);
        if (miss >= 2) { const h = $$('.ktile').find(x => !x.disabled && t.tiles[+x.dataset.n].toLowerCase() === need.toLowerCase()); if (h) h.classList.add('hintme'); }
      });
    }
    function showSpeak(t) {
      frame(`${prompt(t)}<p class="ksent center">${esc(t.show)}</p><div class="speak-zone"><button class="mic" id="mic" aria-label="Сказать">${ICON.mic}</button></div>`, 'Нажми на микрофон и скажи слово!');
      $('#knext').innerHTML = `<button class="btn ghost wide" id="skip">Пропустить</button>`;
      $('#skip').onclick = () => { state.step++; show(); };
      setTimeout(() => speak(t.audio), 300);
      $('#mic').onclick = async () => {
        const mic = $('#mic'); mic.classList.add('rec'); say('Слушаю…');
        try {
          const alts = await listen();
          mic.classList.remove('rec');
          if (alts.length && matchAny(alts, [t.answer || t.show])) return praise({});
          beep(false); say('Почти! Послушай и скажи ещё раз.', 'oops'); speak(t.audio, true);
        } catch (e) {
          mic.classList.remove('rec');
          say('Не получилось услышать. Можно пропустить.', 'oops');
        }
      };
    }
    function finish() {
      const ratio = state.scored ? state.firstOk / state.scored : 1;
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1;
      const ks = kidsState(), d = today();
      const fresh = K.stickers.filter(s => !ks.stickers.includes(s));
      const sticker = pick(fresh.length ? fresh : K.stickers, 1)[0];
      ks.stickers.push(sticker);
      d.kids = true;
      if (les) {
        const pr = prog(les.id);
        if (!pr.done && !les.check) {
          [...les.letters].forEach(c => srsAdd('kl:' + c, false));
          les.words.forEach(w => srsAdd('kw:' + w, false));
        }
        pr.done = true; pr.stars = Math.max(pr.stars || 0, stars); pr.date = todayStr();
      } else d.review = true;
      save();
      const big = les && les.check;
      app.innerHTML = `<main class="page kids kresult">
        <div class="kstars">${[1, 2, 3].map(n => `<span class="${n <= stars ? 'on' : ''}" style="--d:${n * .2}s">⭐</span>`).join('')}</div>
        <h1>${big ? 'Ты знаешь все буквы!' : stars === 3 ? 'Супер-игра!' : 'Молодец!'}</h1>
        <div class="knew-sticker"><small>Новая наклейка</small><span>${sticker}</span></div>
        ${buddy(big ? 'Ура! Весь алфавит! Я тобой горжусь!' : 'Отличная игра! Приходи завтра.', 'happy')}
        <button class="kgo" id="k-home">Домой</button>
        <button class="btn ghost big" id="k-album">Посмотреть альбом</button></main>`;
      setTimeout(() => speak(big ? 'Hooray! You know the alphabet!' : 'Great job!'), 300);
      $('#k-home').onclick = () => go('home', {}, true);
      $('#k-album').onclick = () => go('album', {}, true);
    }
    show();
  }

  // ───────── Запуск ─────────
  window.addEventListener('online', () => { if (view.name !== 'quiz' && view.name !== 'dialog' && view.name !== 'kplay') render(); });
  window.addEventListener('offline', () => toast('Нет интернета — уроки и тесты работают, голосовая проверка дома'));
  try { history.replaceState({ v: view }, ''); } catch (e) { }
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
  }
  window.__TE = { ITEMS, norm, keyOf, matchOne, practiceTasks, testTasks, checkpointTasks, kidsLessonTasks, kidsReviewTasks, lettersUpTo };
})();
