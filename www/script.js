// =========
// 0. Start
//=========
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
// ==========================================
// -1. ЗВУКОВОЙ ДИЗАЙН (СИНТЕЗАТОР V.2)
// ==========================================
const AudioSys = (function() {
  let ctx;
  // getContext removed — using getCtx instead
  let isMuted = false;

  if (safeLSGet('buzz_sound_off', null) === 'true') isMuted = true;

  function getCtx() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Прогреваем контекст тишиною, чтобы первый звук не задерживался
        try {
          const warmOsc = ctx.createOscillator();
          const warmGain = ctx.createGain();
          warmGain.gain.value = 0;
          warmOsc.connect(warmGain);
          warmGain.connect(ctx.destination);
          warmOsc.start();
          warmOsc.stop(ctx.currentTime + 0.01);
        } catch(e) {}
      } catch(e) { return null; }
    }
    return ctx;
  }

  function ensureReady() {
    const c = getCtx();
    if (!c) return Promise.resolve(null);
    if (c.state === 'suspended') {
      return c.resume().catch(() => c).then(() => c);
    }
    return Promise.resolve(c);
  }
  
  function resume() {
    return ensureReady();
  }
  
  function toggleMute() {
    isMuted = !isMuted;
    safeLSSet('buzz_sound_off', isMuted);
    return isMuted;
  }

  function play(type) {
    if (isMuted) return;
    ensureReady().then(c => {
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        // Лёгкий lowpass фильтр, чтобы звук не резал уши
        const filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
        osc.connect(gain);
        gain.connect(filter);
        filter.connect(c.destination);

       if (type === 'click') {
          // Мягкий низкий клик вместо резкого писклявого
          osc.type = 'sine';
          osc.frequency.setValueAtTime(220, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(140, c.currentTime + 0.06);
          gain.gain.setValueAtTime(0.12, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.08);
        } else if (type === 'open') {
          osc.type = 'sine';
          osc.frequency.value = 400; osc.frequency.linearRampToValueAtTime(700, c.currentTime + 0.1);
          gain.gain.setValueAtTime(0.14, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.15);
        } else if (type === 'error') {
          osc.type = 'triangle';
          osc.frequency.value = 180;
          gain.gain.setValueAtTime(0.18, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.25);
        } else if (type === 'achievement') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523, c.currentTime);
          osc.frequency.setValueAtTime(659, c.currentTime + 0.1);
          osc.frequency.setValueAtTime(784, c.currentTime + 0.2);
          gain.gain.setValueAtTime(0.18, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.4);
        } else if (type === 'pop') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(520, c.currentTime + 0.05);
          gain.gain.setValueAtTime(0.10, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.12);
        } else if (type === 'bomb') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(40, c.currentTime + 0.3);
          gain.gain.setValueAtTime(0.22, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.35);
        } else if (type === 'rocket') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.4);
          gain.gain.setValueAtTime(0.18, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.5);
        } else if (type === 'swish') {
          // Лёгкий "свист" — когда берёшь фигуру пальцем/мышкой
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.15);
          gain.gain.setValueAtTime(0.08, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.15);
        }
      } catch(e) {}
    }).catch(() => {});
  }
  
    return { play, toggleMute, isMuted: () => isMuted, resume, getCtx };
})();

// Safe localStorage helpers
function safeLSGet(key, fallback) { try { return localStorage.getItem(key); } catch(e) { return fallback; } }
function safeLSSet(key, val) { try { localStorage.setItem(key, val); } catch(e) {} }
function safeLSRemove(key) { try { localStorage.removeItem(key); } catch(e) {} }
function safeLSGetJSON(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e) { return fallback; } }
function safeLSSetJSON(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} }
// ==========================================
// УНИКАЛЬНЫЕ ДНИ ПОСЕЩЕНИЯ (для накопления зарядов сил Buzz Blast)
// ==========================================
(function() {
  const KEY = 'buzz_visit_days';
  const today = new Date().toISOString().slice(0, 10);
  const days = safeLSGetJSON(KEY, []);
  if (!days.includes(today)) {
    days.push(today);
    if (days.length > 365) days.shift();
    safeLSSetJSON(KEY, days);
  }
})();
// Modal scroll-lock counter
let _openModalCount = 0;
function lockScroll() { _openModalCount++; document.body.style.overflow = 'hidden'; }
function unlockScroll() { _openModalCount--; if (_openModalCount <= 0) { _openModalCount = 0; document.body.style.overflow = ''; } }

function setImageWithFallback(imgEl, src, fallbackSrc = 'images/placeholder.svg') {
  if (!imgEl) return;
  const safeSrc = (src && String(src).trim()) ? src : fallbackSrc;
  const safeFallback = fallbackSrc || 'images/placeholder.svg';

  const probe = new Image();
  probe.onload = () => {
    if (!imgEl.isConnected) return;
    imgEl.src = safeSrc;
    imgEl.dataset.state = 'loaded';
    imgEl.removeAttribute('data-broken');
  };
  probe.onerror = () => {
    if (!imgEl.isConnected) return;
    imgEl.src = safeFallback;
    imgEl.dataset.state = 'broken';
    imgEl.setAttribute('data-broken', 'true');
    imgEl.alt = 'Изображение недоступно';
  };

  probe.src = safeSrc;
}

// УМНАЯ СЛУШАТЕЛЬ: не берем в расчет кнопки видео, скролла и переходы по ссылкам
document.addEventListener('click', function(e) {
  // Активируем AudioContext при первом клике (требование браузеров)
  if (window.AudioSys && typeof AudioSys.resume === 'function') {
    try { AudioSys.resume(); } catch(err) {}
  }
  // Любой клик по кнопке/пункту меню/опции списка сопровождается звуком.
  // Раньше здесь были исключения (кнопка "наверх", элементы с href,
  // TikTok-кнопка в видео-модалке, пункты выпадающих списков Марка/Сортировка) —
  // из-за них часть кнопок оставалась без звука.
  const target = e.target.closest('button, .filter-btn, .fav-btn, .cmp-btn, .calc-option, .brand-option, .mobile-link-btn');
  if (target) {
   if (typeof AudioSys !== 'undefined') AudioSys.play('click');
  }
});

// ==========================================
// 0.5 СИСТЕМА ДОСТИЖЕНИЙ
// ==========================================
const achievements = {
  random: { name: 'Фатализм', icon: 'fa-dice', desc: 'Доверился воле случая. Колесо Фортуны выбрало за тебя.', tier: 'bronze' },
  fav3: { name: 'Коллекционер', icon: 'fa-heart', desc: 'Три напитка в коллекции. Сердце не железное.', tier: 'silver' },
  matrix: { name: 'Проснулся', icon: 'fa-terminal', desc: 'Системный сбой. Реальность под вопросом.', tier: 'gold' },
  caffeine: { name: 'Сердце-мотор', icon: 'fa-heart-crack', desc: 'Сердце работает на пределе. Пульс выше нормы.', tier: 'diamond' },
  key: { name: 'Мастер взлома', icon: 'fa-key', desc: 'Секретный код принят системой. Доступ расширен.', tier: 'purple' },
  godmode: { name: 'Режим Бога', icon: 'fa-crown', desc: 'Привилегии активированы. Система подчиняется.', tier: 'purple' },
  mobile: { name: 'Мобильный снайпер', icon: 'fa-mobile-screen', desc: 'Найдено только касанием. Мобильный детектив.', tier: 'gold' },
  konami: { name: 'Код Разблокировки', icon: 'fa-gamepad', desc: 'Древний код пробуждения. Использовался ещё во времена NES.', tier: 'gold' },
  doom: { name: 'Жнец', icon: 'fa-skull', desc: 'Жатва собрана. Души подсчитаны. Смерть не отступит.', tier: 'diamond' },
  doom_slayer: { name: 'Убийца всех', icon: 'fa-skull-crossbones', desc: 'Все банки уничтожены. Жатва завершена. Ничего не осталось.', tier: 'purple' },
  phone_hacker: { name: 'Phone Hacker', icon: 'fa-fingerprint', desc: 'Взлом через прикосновение. Цифровой Мидас?', tier: 'gold' },
  resurrected: { name: 'Восставший из мёртвых', icon: 'fa-cross', desc: 'Прошёл через Death и вернулся. Прогресс сброшен.', tier: 'diamond' },
  hacker: { name: 'Хакер', icon: 'fa-code', desc: 'Доступ к терминалу  получен. Взлом системы начать.', tier: 'gold' },
    coin_click: { name: 'Жадина', icon: 'fa-coins', desc: 'Нашёл спрятанную монету с черепом в логотипе.', tier: 'gold' },
  hell_package: { name: 'Посылка в АД', icon: 'fa-box', desc: 'Бля, и куда мне её доставить?', tier: 'purple' },
  coronation: { name: 'Коронованный', icon: 'fa-crown', desc: 'Собрал 10+ достижений. Система признала тебя королём.', tier: 'gold' },
  maze_runner: { name: 'Бегун по лабиринтам', icon: 'fa-route', desc: 'Прошёл лабиринт «Туда-Сюда». Выбрался за 60 секунд.', tier: 'gold' }
};


function unlockAchievement(id) {
  if (safeLSGet('ach_' + id, null)) return; 
  safeLSSet('ach_' + id, 'true');
  const ach = achievements[id];
  if (!ach) return;
   if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast achievement-toast';
  t.innerHTML = '<i class="fa-solid ' + ach.icon + '" style="color: #fbbf24; font-size: 20px;"></i><div><span style="color:#fbbf24; font-weight:bold; display:block; margin-bottom:2px; font-size:13px;">ДОСТИЖЕНИЕ РАЗБЛОКИРОВАНО!</span><span style="font-size:15px;">' + ach.name + '</span></div>';
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); t.classList.add('hide'); t.addEventListener('transitionend', () => t.remove()); }, 4000);
}

// ==========================================
// ПАСХАЛКА: КОНСОЛЬ — ASCII-АРТ + ИСТОРИЯ ВИЗИТОВ
// ==========================================
console.log('%c⚡ BUZZ RATE ⚡', 'font-size:48px;font-weight:900;color:#BFFF00;text-shadow:0 0 20px #BFFF00,0 0 40px #BFFF00;');
console.log('%c[Debug]%c session src: тут был я', 'color:#555;', 'color:#555;');
(function() {
  var KEY = 'buzzrate_visits';
  var now = new Date();
  var visit = {
    date: now.toLocaleString('ru-RU'),
    screen: screen.width + 'x' + screen.height,
    platform: navigator.userAgent.indexOf('Capacitor') !== -1 ? 'Приложение' : 'Сайт'
  };

  var visits = safeLSGetJSON(KEY, []);
  visits.push(visit);
  if (visits.length > 50) visits = visits.slice(-50);
  safeLSSetJSON(KEY, visits);

  console.log('%c📜 История посещений:', 'font-size:14px;color:#fbbf24;font-weight:bold;');
  for (var i = 0; i < visits.length; i++) {
    var num = (i + 1 < 10 ? '0' : '') + (i + 1);
    console.log(
      '%c#' + num + ' %c' + visits[i].date + ' %c' + visits[i].platform + ' %c' + visits[i].screen,
      'color:#888;font-weight:bold;',
      'color:#00e676;',
      'color:#818cf8;',
      'color:#6e6e8a;'
    );
  }
  console.log(
    '%cВсего посещений: ' + visits.length,
    'font-size:13px;color:#ff3b5c;font-weight:bold;'
  );
})();
// Распознаём приложение или мобильный браузер — убираем частицы, чтобы не тормозило
const _isMobileOrNative = window.Capacitor || matchMedia('(hover: none), (max-width: 768px)').matches;
if (_isMobileOrNative) {
  document.body.classList.add('is-native-app');
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if(canvas) canvas.remove();
  });
}
// ==========================================
// СИСТЕМА ОБНОВЛЕНИЙ ПРИЛОЖЕНИЯ
// ==========================================
const APP_VERSION = 1; // Когда будешь выпускать обновление, поменяй цифру на 2, потом на 3 и т.д.

function checkForUpdates() {
  // Кешируем проверку на 1 час, чтобы не дёргать сервер каждый визит
  const CACHE_KEY = 'buzz_last_update_check';
  const last = parseInt(safeLSGet(CACHE_KEY, '0'), 10);
  if (Date.now() - last < 3600000) return; // 1 час
  
  safeLSSet(CACHE_KEY, String(Date.now()));
  fetch('https://tourmaline-medovik-3b7efd.netlify.app/version.json')
    .then(response => response.json())
    .then(data => {
      if (data.version > APP_VERSION) {
        const m = document.getElementById('updateModal');
        if (m) m.style.display = 'flex';
      }
    })
    .catch(() => {
      // Если нет интернета - просто ничего не делаем
    });
}

// Проверяем через 2 секунды после запуска, чтобы не тормозить открытие
setTimeout(checkForUpdates, 2000);
// ==========================================
// 1. БАЗА ДАННЫХ
// Скопируй блок нужной марки нужное количество раз.
// img: "" — заглушка. Вместо "" вставь путь к картинке (например "images/monster_2.webp").
// ==========================================
const drinks = [
  // --- MONSTER (скопируй 22 раза, у тебя уже 1 оригинал) ---
  { brand: "Monster Energy - Nitro", key: "monster", flavor: "500 мл", rating: 8, img: "images/image_2.webp", caffeine: "160 мг", sugar: "54 г", cal: "223 kcal", ph: "3.5", video: "7659733737701166358", taste: "Кислая цитрусовая нотка, легкая горчинка в послевкусии" },

  { brand: "Monster Energy ", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster-standart.webp", caffeine: "160 мг", sugar: "55 г", cal: "235 kcal", ph: "3.0", video: "7669155756666621206" },

  { brand: "Monster Energy - Ultra blue", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.4", video: "" },

  { brand: "Monster Energy - Ultra black", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-black.webp", caffeine: "150 мг", sugar: "0 г", cal: "15 kcal", ph: "3.6", video: "" },

  { brand: "Monster Energy - Juiced Viking", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster_viking.webp", caffeine: "160 мг", sugar: "54 г", cal: "215 kcal", ph: "3.7", video: "7633076505349852438" },
 { brand: "Monster Energy - Rio Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/rio-punsh.webp", caffeine: "150 мг", sugar: "35 г", cal: "152 kcal", ph: "3.8", video: "" },

 { brand: "Monster Energy - Ultra Gold (lando Norris)", key: "monster", flavor: "500 мл", rating: 8, img: "images/lando_noris.webp", caffeine: "160 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "" },

 { brand: "Monster Energy - Nitro Cosmic Peach", key: "monster", flavor: "500 мл", rating: 8, img: "images/nitro-cosmic-peach.webp", caffeine: "160 мг", sugar: "53 г", cal: "200 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Juiced Riper", key: "monster", flavor: "500 мл", rating: 8, img: "images/juiced-riper.webp", caffeine: "160 мг", sugar: "45 г", cal: "175 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Mixxd Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/mixxd-punsh.webp", caffeine: "160 мг", sugar: "45 г", cal: "190 kcal", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Rosa", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-rosa.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Rehab Green Tea", key: "monster", flavor: "500 мл", rating: 8, img: "images/rehab-green-tea.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "50 kcal", ph: "4.6", video: "7558385802955476227" },

 { brand: "Monster Energy - Rehab Tea + Lemonade", key: "monster", flavor: "500 мл", rating: 8, img: "images/tea-lemonade.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "55 kcal", ph: "4.4", video: "" },

 { brand: "Monster Energy - Rehab Tea + Peach", key: "monster", flavor: "500 мл", rating: 9, img: "images/rehab-tea-peach.webp", caffeine: "160 мг", sugar: "12 г", cal: "59 kcal", ph: "4.4", video: "" },

 { brand: "Monster Energy - Ultra Sunrise", key: "monster", flavor: "473 мл", rating: 8, img: "images/ultra-sunrise.webp", caffeine: "155 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "" },

 { brand: "Monster Energy - Reserve White Pineapple Flavour", key: "monster", flavor: "500 мл", rating: 8, img: "images/reserve-white-pineapple.webp", caffeine: "160 мг", sugar: "30 г", cal: "135 kcal", ph: "3.6", video: "" },

 { brand: "Monster Energy - Reserve Peaches n' Crème", key: "monster", flavor: "473 мл", rating: 8, img: "images/reserve-peaches-creme.webp", caffeine: "175 мг", sugar: "28 г", cal: "120 kcal", ph: "3.7", video: "7584185459459312918" },

 { brand: "Monster Energy - Ultra Fantasy Ruby Red", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-fantasy-ruby-red.webp", caffeine: "160 мг", sugar: "0 г", cal: "14 kcal", ph: "3.4", video: "7532186692233596182" },

 { brand: "Monster Energy - Ultra Peachy Keen", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-peach-keen.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.2", video: "" },

 { brand: "Monster Energy - Ultra Blue Hawaiian", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue-hawaiian.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "7631582942761962774" },

 { brand: "Monster Energy - M3 Extra Strength", key: "monster", flavor: "150 мл", rating: 8, img: "images/m3-extra-strength.webp", caffeine: "140 мг", sugar: "10 г", cal: "65 kcal", ph: "3.7", video: "7532190064059763990" },

 { brand: "Monster Energy - Ultra Vice Guava", key: "monster", flavor: "473 мл", rating: 9, img: "images/ultra-vice-guava.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Ultra Violet", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-violet.webp", caffeine: "150 мг", sugar: "0 г", cal: "13 kcal", ph: "3.6", video: "" },

 { brand: "Monster Energy - Ultra Wild Passion", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra_wild_passion.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "7671963390838918422" },

 { brand: "Monster Energy - The Doctor VR46", key: "monster", flavor: "500 мл", rating: 8, img: "images/vr-46.webp", caffeine: "160 мг", sugar: "52 г", cal: "219 kcal", ph: "3", video: "7674675530762816790" },
  
 { brand: "Monster Energy - Juiced Juce", key: "monster", flavor: "500 мл", rating: 5, img: "images/juced-juce.webp", caffeine: "160 мг", sugar: "49 г", cal: "211 kcal", ph: "3.4", video: "7598063208871628054" },
  // --- HELL (скопируй 11 раз, у тебя 1 оригинал) ---
  { brand: "Hell Energy - The summer edition", key: "hell", flavor: "250 мл", rating: 7, img: "images/image_4.webp", caffeine: "80 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7659733345500171542", badge: "hit" },

  { brand: "Hell Energy - The Strong Appel", key: "hell", flavor: "250 мл", rating: 6, img: "images/the_strong_appel.webp", caffeine: "96 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7530127178420391191", badge: "hit" },

  { brand: "Hell Ice Coffee - Choco Raspberry", key: "hell", flavor: "250 мл", rating: 10, img: "images/choco_raspberry.webp", caffeine: "80 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7620187284603718934", badge: "hit" },

  { brand: "Hell Ice Coffee - Dark range", key: "hell", flavor: "250 мл", rating: 8, img: "images/hell_coffe_orange.webp", caffeine: "80 мг", sugar: "27 г", cal: "145 kcal", ph: "3.1", video: "7584161789407923478", badge: "hit" },

  // --- RED BULL (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Red Bull", key: "redbull", flavor: "250 мл", rating: 6, img: "images/image_3.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.4", video: "7659734438976294166" },

  { brand: "Red Bull - The Blue Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-blue-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7525141055956602134" },

  { brand: "Red Bull - The Ice Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-ice-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7620449420299210007" },

  { brand: "Red Bull - The Summer Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-summer-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7525141055956602134" },

  { brand: "Red Bull - The White Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-white-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "7620187045151100163" },

  { brand: "Red Bull - The Winter Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-winter-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Pink Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-pink-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Peach Edition", key: "redbull", flavor: "Original, 250 мл", rating: 6, img: "images/redbull-peach.webp", caffeine: "80 мг", sugar: "27.5 г", cal: "115 kcal", ph: "3.2", video: "7659734438976294166" },

  // --- BATTERY (скопируй 4 раза) ---

  { brand: "Battery Energy - Exotic", key: "battery", flavor: "500 мл", rating: 7, img: "images/battery_exotic.webp", caffeine: "160 мг", sugar: "57 г", cal: "250 kcal", ph: "2.5", video: "7595499648903613718" },

  // --- NON STOP (скопируй 3 раза) ---
  { brand: "Non Stop", key: "nonstop", flavor: "Original, 450 мл", rating: 6, img: "", caffeine: "87 мг", sugar: "25 г", cal: "102 kcal", ph: "3.0", video: "7593795836908260630" },

  // --- BURN (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Burn", key: "burn", flavor: "Cherry, 250 мл", rating: 7, img: "images/image_5.webp", caffeine: "75 мг", sugar: "28 г", cal: "118 kcal", ph: "3.6", video: "7361838290757873979" },

  // --- ROCK STAR (скопируй 2 раза) ---
  { brand: "Rockstar Energy - Blueberry Pomegranate", key: "rockstar", flavor: "500 мл", rating: 5, img: "images/rockstar_blueberry.webp", caffeine: "200 мг", sugar: "24 г", cal: "105 kcal", ph: "3.2", video: "7593795386599378198" },


  // --- C4 (1 раз) ---
  { brand: "C4", key: "c4", flavor: " 500 мл", rating: 8, img: "images/c4.webp", caffeine: "200 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "" }
];

// ==========================================
// 2. НАСТРОЙКИ ЦВЕТОВ ДЛЯ БРЕНДОВ
// ==========================================
const bColors = {
  monster:'#00c850', redbull:'#1e6fff', hell:'#e03020', 
  burn:'#ff6a00', battery:'#ffd700', nonstop:'#00ccff', 
  rockstar:'#a855f7', c4:'#f43f5e'
};
const bInit = {
  monster:'M', redbull:'R', hell:'H', burn:'Bu', 
  battery:'Ba', nonstop:'N', rockstar:'Rs', c4:'C4'
};

// ДОБАВИТЬ ЭТО:
const bNames = {
  monster:'Monster Energy', redbull:'Red Bull', hell:'Hell Energy',
  burn:'Burn', battery:'Battery', nonstop:'Non Stop',
  rockstar:'Rockstar', c4:'C4'
};

// Общие факты о брендах (страна, год основания компании).
// Это НЕ дата выпуска конкретного вкуса — по каждому вкусу такие точные данные
// нигде централизованно не публикуются, поэтому не выдумываю их.
const bBrandInfo = {
  monster:  { country: 'США', founded: '2002', note: 'Monster Beverage Corporation, Калифорния' },
  redbull:  { country: 'Австрия', founded: '1987', note: 'На основе тайского напитка Krating Daeng' },
  hell:     { country: 'Венгрия', founded: '2006', note: 'Hell Energy Drink, Будапешт' },
  burn:     { country: 'Франция', founded: '2001', note: 'Разработан при участии The Coca-Cola Company' },
  battery:  { country: 'Финляндия', founded: '1991', note: 'Бренд компании Hartwall' },
  rockstar: { country: 'США', founded: '2001', note: 'Rockstar Inc., Лас-Вегас' },
  c4:       { country: 'США', founded: '2011', note: 'Cellucor, линейка спортивного питания' },
  nonstop:  { country: '', founded: '', note: '' } // нет проверенных данных — впиши сам, если знаешь
};

// ==========================================
// 3. ЛОГИКА ИЗБРАННОГО
// ==========================================
function getFavs() { return safeLSGetJSON('energy_favs', []); }
function saveFavs(arr) { 
  safeLSSetJSON('energy_favs', arr); 
  if (arr.length === 3 && typeof unlockAchievement !== 'undefined') unlockAchievement('fav3');
}

// ==========================================
// 4. ГЕНЕРАЦИЯ КАРТОЧЕК ИЗ МАССИВА
// ==========================================
const grid = document.getElementById('cardsGrid') || document.createElement('div');

// Объявлено здесь (а не в разделе "Фильтры" ниже), потому что renderCards()
// вызывает applyFilters(), а applyFilters() читает activeBrandFilter —
// первый вызов renderCards() происходит раньше, чем JS доходит до раздела
// "8. ФИЛЬТРЫ", и let-переменная там ещё была бы в temporal dead zone.
let activeBrandFilter = 'all';

function createCard(drink) {
  const card = document.createElement('article');
  card.className = 'energy-card';
  card.dataset.brand = drink.key;
  card.dataset.rating = drink.rating;
  card.dataset.video = drink.video;
  card.dataset.drinkIndex = drinks.indexOf(drink);
  // FIX 3: ключ избранного — по индексу (уникально для каждого напитка)
  const favKey = 'drink_' + drinks.indexOf(drink);
  const isFav = getFavs().includes(favKey);
  
  let imgHtml;
  if (drink.img) {
    imgHtml = `<img src="${drink.img}" alt="${drink.brand}" loading="lazy" data-fallback="true">`;
  } else {
    imgHtml = `<div class="placeholder-img">${drink.brand}<br><span>${drink.flavor}</span></div>`;
  }
    const mcColor = bColors[drink.key] || "var(--accent)";
  const flavorText = drink.flavor.replace(/(\d+\s*мл)/, '<span class="ml-unit" style="--mc:' + mcColor + '">$1</span>');

  card.innerHTML = `
    <div class="card-strip"></div><div class="card-glare"></div>
    ${drink.badge ? `<div class="card-badge"><i class="fa-solid fa-fire"></i> Хит</div>` : ''}
    <button class="fav-btn ${isFav ? 'active' : ''}" aria-label="В избранное">
      <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
    </button>
    <div class="card-image">${imgHtml}</div>
    <div class="card-content">
     <h3 class="card-brand">${drink.brand}</h3>
      <p class="card-flavor">${flavorText}</p>
      <div class="card-rating"><div class="stars"></div><div class="rating-counter" data-target="${drink.rating}"></div></div>
            <div class="card-stats">
        <div class="stat" style="background:rgba(0, 229, 255, 0.15); border-color:rgba(0, 229, 255, 0.7); box-shadow: 0 0 12px rgba(0, 229, 255, 0.25)"><div class="stat-value">${drink.caffeine}</div><div class="stat-label">Кофеин</div></div>
        <div class="stat" style="background:rgba(255, 64, 129, 0.15); border-color:rgba(255, 64, 129, 0.7); box-shadow: 0 0 12px rgba(255, 64, 129, 0.25)"><div class="stat-value">${drink.sugar}</div><div class="stat-label">Сахар</div></div>
        <div class="stat" style="background:rgba(255, 171, 0, 0.15); border-color:rgba(255, 171, 0, 0.7); box-shadow: 0 0 12px rgba(255, 171, 0, 0.25)"><div class="stat-value">${drink.cal}</div><div class="stat-label">Калории</div></div>
        <div class="stat" style="background:rgba(179, 136, 255, 0.15); border-color:rgba(179, 136, 255, 0.7); box-shadow: 0 0 12px rgba(179, 136, 255, 0.25)"><div class="stat-value">${drink.ph}</div><div class="stat-label">pH</div></div>
      </div>
      <button class="card-btn" data-open-video><span>Смотреть обзор</span><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  `;
  const imageEl = card.querySelector('img[data-fallback="true"]');
  if (imageEl) {
    setImageWithFallback(imageEl, drink.img, 'images/placeholder.svg');
  }

  return card;
}

// Режим сортировки: 'rating' (по умолчанию), 'new' (последние добавленные), 'az' (А-Я)
let activeSortMode = 'rating';

function getSortedDrinks() {
  // Индекс в массиве drinks = порядок добавления (последние строки — новее)
  const withIndex = drinks.map((d, i) => ({ d, i }));

  if (activeSortMode === 'new') {
    withIndex.sort((a, b) => b.i - a.i); // последние добавленные — первыми
  } else if (activeSortMode === 'old') {
    withIndex.sort((a, b) => a.i - b.i); // самые старые — первыми
  } else if (activeSortMode === 'az') {
    withIndex.sort((a, b) => a.d.brand.localeCompare(b.d.brand, 'ru')); // А-Я
  } else {
    withIndex.sort((a, b) => +b.d.rating - +a.d.rating); // по рейтингу (по умолчанию)
  }
  return withIndex.map(x => x.d);
}

function renderCards() {
  const sorted = getSortedDrinks();
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  sorted.forEach(drink => { const card = createCard(drink); if(card) frag.appendChild(card); });
  grid.appendChild(frag);
  initCardEffects(); // Запускаем звезды, счетчики, тилт и лайки для новых карточек
  applyFilters(); // Сохраняем активные фильтры при пересортировке
}

function initCardEffects() {
  // Звезды и счетчики
  document.querySelectorAll('.energy-card').forEach(card => {
    if(card.dataset.init) return; card.dataset.init = '1';
    const rating = parseInt(card.dataset.rating, 10) || 0; 
    const sc = card.querySelector('.stars');
    for (let i = 0; i < 10; i++) { 
      const s = document.createElement('i'); 
      s.style.setProperty('--i', i); 
      s.className = i < rating ? 'fa-solid fa-star star' : 'fa-solid fa-star star empty'; 
      sc.appendChild(s); 
    }
    const cnt = card.querySelector('.rating-counter');
    if(cnt && !cnt.querySelector('.counter-body')) buildCounter(cnt);
  });

  // Обработка клика по сердечку — FIX 3: используем drinkIndex как ID
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', e => {
      e.stopPropagation();
      const card = newBtn.closest('.energy-card');
      const drinkIndex = parseInt(card.dataset.drinkIndex);
      const drinkId = 'drink_' + drinkIndex;
      const name = card.querySelector('.card-brand').textContent;
      let favs = getFavs();
      if (favs.includes(drinkId)) {
        favs = favs.filter(f => f !== drinkId);
        newBtn.classList.remove('active');
        newBtn.querySelector('i').className = 'fa-regular fa-heart';
        showToast('Убрано из избранного', 'fa-regular fa-heart');
      } else {
        favs.push(drinkId);
        newBtn.classList.add('active');
        newBtn.querySelector('i').className = 'fa-solid fa-heart';
        showToast(name + ' в избранном', 'fa-solid fa-heart');
        if (favs.length >= 3) unlockAchievement('fav3');
      }
      saveFavs(favs);
    });
  });

  // Кнопка "Смотреть обзор"
  document.querySelectorAll('[data-open-video]').forEach(b => { 
    const newB = b.cloneNode(true);
    b.parentNode.replaceChild(newB, b);
    newB.addEventListener('click', e => { e.stopPropagation(); openVideoModal(newB.closest('.energy-card')); }); 
  });

  // Intersection Observer для анимации появления
  const observer = new IntersectionObserver(entries => { 
    entries.forEach((entry, index) => { 
      if (entry.isIntersecting) { 
        const card = entry.target; 
        // ЕСЛИ ПРИЛОЖЕНИЕ - МГНОВЕННАЯ ЗАГРУЗКА
        if (document.body.classList.contains('is-native-app')) {
          card.classList.add('visible'); 
          const c = card.querySelector('.rating-counter'); 
          if(c) {
             const drums = c.querySelectorAll('.counter-drum'); 
             const h = c.querySelector('.counter-digit')?.offsetHeight || 24; 
             drums.forEach(drum => { 
               drum.style.transition = 'none'; 
               drum.style.transform = `translateY(-${(parseInt(drum.dataset.digit) + 10) * h}px)`; 
             }); 
          }
          observer.unobserve(card);
          return; 
        }
          // ЕСЛИ САЙТ - БЫСТРАЯ ЗАГРУЗКА
        card.classList.add('visible'); 
        const c = card.querySelector('.rating-counter'); 
        if(c) requestAnimationFrame(() => requestAnimationFrame(() => rollCounter(c))); 
        observer.unobserve(card); 
      } 
    }); 
  }, { threshold: 0.1 });  
  document.querySelectorAll('.energy-card:not(.visible)').forEach(c => observer.observe(c));
}

// Счетчик
function buildCounter(el) { 
  const val = parseInt(el.dataset.target, 10) || 0; 
  if (val === 10) el.classList.add('rating-10');
  else if (val >= 7) el.classList.add('rating-high');
  else if (val >= 4) el.classList.add('rating-mid');
  else el.classList.add('rating-low');
  const digits = String(val).split(''); 
  const body = document.createElement('div'); body.className = 'counter-body'; 
  digits.forEach(d => { 
    const slot = document.createElement('div'); slot.className = 'counter-digit'; 
    const drum = document.createElement('div'); drum.className = 'counter-drum'; drum.dataset.digit = d; 
    for (let n = 0; n < 20; n++) { 
      const sp = document.createElement('span'); sp.textContent = n % 10; 
      if (n >= 10 && n % 10 === parseInt(d, 10)) sp.classList.add('lit'); 
      drum.appendChild(sp); 
    } 
    slot.appendChild(drum); body.appendChild(slot); 
  }); 
  const sl = document.createElement('div'); sl.className = 'counter-slash'; sl.textContent = '/'; body.appendChild(sl); 
  const mx = document.createElement('div'); mx.className = 'counter-max'; mx.textContent = '10'; body.appendChild(mx); 
  el.appendChild(body); 
}
function rollCounter(el) { 
  const drums = el.querySelectorAll('.counter-drum'); 
  const h = el.querySelector('.counter-digit')?.offsetHeight || 24; 
  drums.forEach(drum => { drum.style.transform = `translateY(-${(parseInt(drum.dataset.digit) + 10) * h}px)`; }); 
}


// Запуск
renderCards();

// ОДИН СЛУШАТЕЛЬ ДЛЯ ВСЕХ КАРТОЧЕК (Вместо 60 отдельных)
if (!document.body.classList.contains('is-native-app')) {
  const MAX_TILT=12, SCALE=1.04, PERS=800;
  let rafTilt = false, activeTiltCard = null;
  grid.addEventListener('mousemove', e => {
    if (rafTilt) return; rafTilt = true;
    requestAnimationFrame(() => {
      const card = e.target.closest('.energy-card');
      if (card !== activeTiltCard) {
        if (activeTiltCard) { activeTiltCard.style.transform = `perspective(${PERS}px) rotateX(0) rotateY(0) scale3d(1,1,1)`; }
        activeTiltCard = card;
      }
      if (!card) { rafTilt = false; return; }
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `perspective(${PERS}px) rotateX(${-y*MAX_TILT*2}deg) rotateY(${x*MAX_TILT*2}deg) scale3d(${SCALE},${SCALE},${SCALE})`;
      const gl = card.querySelector('.card-glare');
      if(gl){ gl.style.setProperty('--glare-x', (x+0.5)*100+'%'); gl.style.setProperty('--glare-y', (y+0.5)*100+'%'); }
      rafTilt = false;
    });
  });
  grid.addEventListener('mouseleave', () => {
    if (activeTiltCard) { activeTiltCard.style.transform = `perspective(${PERS}px) rotateX(0) rotateY(0) scale3d(1,1,1)`; activeTiltCard = null; }
  });
}

// ==========================================
// 6. ТИПЕРАЙТЕР И ТЕМА
// ==========================================
const target = document.getElementById('typewriter'); if (target) target.classList.add('cursor');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function typeText(el, text, speed = 75) { for (let i = 0; i < text.length; i++) { el.textContent += text[i]; await sleep(speed); } }
async function eraseText(el, speed = 50) { while (el.textContent.length > 0) { el.textContent = el.textContent.slice(0, -1); await sleep(speed); } }
async function typeAboutText() { const t = document.getElementById('about-typewriter'); if (!t) return; const txt = "Я занимаюсь обзорами энергетиков. Здесь вы найдете честные и подробные обзоры различных энергетических напитков, их состав, вкус и эффект. Моя цель - помочь вам найти энергетик который подходит именно вам. "; for (let i = 0; i < txt.length; i++) { if (window._stopAboutTyping) { window._stopAboutTyping = false; break; } t.textContent += txt[i]; await sleep(25); } t.classList.remove('cursor-about'); }
async function startScenario() {
  await typeText(target, "Привет это ");
  const w = document.createElement('span'); w.className = 'wrong-name'; target.appendChild(w); await typeText(w, "Навальный",60);
  document.getElementById('userPhoto').classList.add('visible'); await sleep(500);
  await eraseText(w, 50); w.remove();
  const c = document.createElement('span'); c.className = 'correct-name'; target.appendChild(c); await typeText(c, "Varna 23 live", 100);
  target.classList.remove('cursor');
  document.getElementById('aboutBlock').classList.add('visible'); await sleep(1200); await typeAboutText();
}
// FIX: typewriter запускается только ПОСЛЕ скрытия preloader и загрузки шрифтов
let _typewriterStarted = false;
function startTypewriterWhenReady() {
  if (_typewriterStarted) return;
  _typewriterStarted = true;
  
  // Дополнительная проверка шрифтов (если preloader не дождался)
  const fontsReady = (document.fonts && document.fonts.ready) 
    ? document.fonts.ready 
    : Promise.resolve();
  
  fontsReady.then(() => {
    // Небольшая пауза чтобы фото точно отрисовалось
    setTimeout(startScenario, 100);
  });
}

// Фолбэк: если preloader не существовал, запустим сами
if (document.readyState === 'complete' && !document.getElementById('preloader')) {
  startTypewriterWhenReady();
} else if (!document.getElementById('preloader')) {
  window.addEventListener('load', startTypewriterWhenReady);
}

// ==========================================
// ПАСХАЛКА: МАТРИЦА (5 быстрых кликов на кнопку темы)
// ==========================================
var themeClicks = 0;
var themeClickTimer = null;
var themeToggle = document.getElementById('themeToggle');
var matrixActive = false;

function createMatrixRain() {
  var canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:999998;pointer-events:none;opacity:0.15;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var chars = 'BUZZRATE能源01010アイガー';
  var fontSize = 14;
  var columns = Math.floor(canvas.width / fontSize);
  var drops = [];
  for (var i = 0; i < columns; i++) drops[i] = 1;

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    for (var j = 0; j < drops.length; j++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, j * fontSize, drops[j] * fontSize);
      if (drops[j] * fontSize > canvas.height && Math.random() > 0.975) drops[j] = 0;
      drops[j]++;
    }
    if (matrixActive) requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==========================================
// 7. ЧАСТИЦЫ 
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let particleColor = getComputedStyle(document.body).getPropertyValue('--particle-color').trim();

function resizeCanvas() {
  // Защита: canvas мог быть удалён (на мобиле), либо родитель ещё не готов
  if (!canvas || !canvas.parentElement) return;
  canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
  canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
}
if (canvas) resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle { 
  constructor() { this.reset(); } 
  reset() { 
    // Разбрасываем точки СТРОГО ПО БОКАМ (по 15% ширины экрана)
    if (Math.random() < 0.5) {
      this.x = Math.random() * (canvas.width * 0.15); // Левая сторона
    } else {
      this.x = canvas.width - Math.random() * (canvas.width * 0.15); // Правая сторона
    }
    this.y = Math.random() * canvas.height; 
    this.vx = (Math.random() - 0.5) * 0.3; // Чуть замедлил, чтобы не мерцали резко
    this.vy = (Math.random() - 0.5) * 0.4; 
    this.r = Math.random() * 2 + 0.5; 
  } 
  update() { 
    this.x += this.vx; 
    this.y += this.vy; 
    // Если точка улетела за левый или правый край — переспауним её на бок
    if (this.x < 0 || this.x > canvas.width) this.reset(); 
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1; 
  } 
  draw() { 
    ctx.beginPath(); 
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
    ctx.fillStyle = particleColor; 
    ctx.fill(); 
  } 
}

// FIX 3: Уменьшил до 15 частиц (было 40) — меньше нагрузка на CPU/GPU
for(let i=0; i<15; i++) particles.push(new Particle());

let isAnimating = true;
let isPageVisible = true;
const obsParticles = new IntersectionObserver(entries => { 
  isAnimating = entries[0].isIntersecting; 
  if(isAnimating && isPageVisible) animateParticles(); 
}, { threshold: 0.1 });
if (canvas && canvas.parentElement) obsParticles.observe(canvas.parentElement);

// FIX 3: Пауза при сворачивании вкладки
document.addEventListener('visibilitychange', () => {
  isPageVisible = !document.hidden;
  if (isPageVisible && isAnimating) animateParticles();
});

function animateParticles() { 
  if(!isAnimating || !isPageVisible) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  particles.forEach(p => { p.update(); p.draw(); }); 
  requestAnimationFrame(animateParticles); 
}
animateParticles();

// ==========================================
// 8. ФИЛЬТРЫ (ПО РЕЙТИНГУ И МАРКАМ)
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn:not(.brand-toggle)');
// activeBrandFilter объявлена выше, в разделе 4 — см. комментарий там

// Генерация выпадающего списка марок
function generateBrandDropdown() {
  const dropdown = document.getElementById('brandDropdown');
  const counts = {};
  drinks.forEach(d => { counts[d.key] = (counts[d.key] || 0) + 1; });
  
  let html = `<div class="brand-option active" data-brand="all"><div class="brand-dot" style="background:var(--accent)"></div>Все марки<div class="brand-count">${drinks.length}</div></div>`;
  
  for (const key in counts) {
        const name = bNames[key] || key;
    html += `<div class="brand-option" data-brand="${key}"><div class="brand-dot" style="background:${bColors[key] || '#888'}"></div>${name}<div class="brand-count">${counts[key]}</div></div>`;
  }
  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdown.querySelectorAll('.brand-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      activeBrandFilter = opt.dataset.brand;
      dropdown.classList.remove('open');
      document.getElementById('brandToggle').classList.remove('open');
      applyFilters();
    });
  });
}
generateBrandDropdown();

// Тоггл выпадающего меню
document.getElementById('brandToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('brandDropdown').classList.toggle('open');
  document.getElementById('brandToggle').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('brandDropdown').classList.remove('open');
  document.getElementById('brandToggle').classList.remove('open');
});
// ==========================================
// ВЫПАДАЮЩЕЕ МЕНЮ СОРТИРОВКИ
// ==========================================
function generateSortDropdown() {
  const dropdown = document.getElementById('sortDropdown');
  if (!dropdown) return;
  const options = [
    { key: 'rating', label: 'По рейтингу' },
    { key: 'new', label: 'Сначала новые' },
    { key: 'old', label: 'Сначала старые' },
    { key: 'az', label: 'А — Я' }
  ];
  dropdown.innerHTML = options.map(o =>
    `<div class="brand-option ${o.key === activeSortMode ? 'active' : ''}" data-sort="${o.key}">
      <div class="brand-dot" style="background:var(--accent)"></div>${o.label}
    </div>`
  ).join('');

  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdown.querySelectorAll('.brand-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      activeSortMode = opt.dataset.sort;
      dropdown.classList.remove('open');
      document.getElementById('sortToggle').classList.remove('open');
      renderCards();
    });
  });
}
generateSortDropdown();

document.getElementById('sortToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('sortDropdown').classList.toggle('open');
  document.getElementById('sortToggle').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('sortDropdown').classList.remove('open');
  document.getElementById('sortToggle').classList.remove('open');
});
// Фильтрация
function applyFilters() {
  const activeRatingFilter = document.querySelector('.filter-btn.active:not(.brand-toggle)')?.dataset.filter || 'all';
  const favs = getFavs();
  
  document.querySelectorAll('.energy-card').forEach(card => {
    const r = parseInt(card.dataset.rating);
    const b = card.dataset.brand;
    const drinkId = 'drink_' + card.dataset.drinkIndex;
    
    let showByRating = true;
    if (activeRatingFilter === 'high' && r < 8) showByRating = false;
    else if (activeRatingFilter === 'mid' && (r < 6 || r > 7)) showByRating = false;
    else if (activeRatingFilter === 'low' && r >= 6) showByRating = false;
    else if (activeRatingFilter === 'fav' && !favs.includes(drinkId)) showByRating = false;

    let showByBrand = (activeBrandFilter === 'all' || activeBrandFilter === b);

    if (showByRating && showByBrand) { 
      card.classList.remove('card-hidden'); 
      card.style.display = ''; 
    } else { 
      card.classList.add('card-hidden'); 
      setTimeout(() => { if (card.classList.contains('card-hidden')) card.style.display = 'none'; }, 500); 
    }
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active')); 
    btn.classList.add('active');
    applyFilters();
  });
});

// ==========================================
// 9. TOAST, СКРОЛЛ, МОДАЛКИ
// ==========================================
function showToast(msg, icon) {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<i class="${icon} toast-icon heart"></i><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); t.classList.add('hide'); t.addEventListener('transitionend', () => t.remove()); }, 2500);
}

const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => { if(window.scrollY > 400) scrollBtn.classList.add('show'); else scrollBtn.classList.remove('show'); });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const suggestModal = document.getElementById('suggestModal');
const openSuggestBtn = document.getElementById('openSuggest');
const closeSuggestBtn = document.getElementById('closeSuggest');
const sendSuggestBtn = document.getElementById('sendSuggest');
const drinkNameInput = document.getElementById('drinkName');
const drinkCommentInput = document.getElementById('drinkComment');

if (openSuggestBtn && suggestModal) {
  openSuggestBtn.addEventListener('click', () => suggestModal.classList.add('open'));
}
if (closeSuggestBtn && suggestModal) {
  closeSuggestBtn.addEventListener('click', () => suggestModal.classList.remove('open'));
}
if (suggestModal) {
  suggestModal.addEventListener('click', e => { if(e.target === suggestModal) suggestModal.classList.remove('open'); });
}
if (sendSuggestBtn && drinkNameInput && drinkCommentInput) {
  sendSuggestBtn.addEventListener('click', () => {
    const name = drinkNameInput.value;
    if(!name.trim()) { drinkNameInput.style.borderColor = '#ff3b5c'; return; }
    suggestModal.classList.remove('open');
    drinkNameInput.value = ''; drinkCommentInput.value = '';
    showToast(`"${name}" отправлен на обзор!`, 'fa-solid fa-check');
  });
}
const modal = document.getElementById('videoModal'),
      modalInner = document.getElementById('videoModalInner'),
      modalVideoWrap = document.getElementById('modalVideoWrap'),
      modalPlaceholder = document.getElementById('modalPlaceholder'),
      modalProgress = document.getElementById('modalProgress'),
      modalClose = document.getElementById('modalClose'),
      modalDot = document.getElementById('modalDot'),
      modalLabel = document.getElementById('modalLabel'),
      modalFlavor = document.getElementById('modalFlavor'),
      modalRatingText = document.getElementById('modalRatingText'),
      modalTiktokBtn = document.getElementById('modalTiktokBtn');

let progressInterval, currentVideoId;
// ---------- ВИДЕО-МОДАЛКА ----------
function openVideoModal(card) {
  const b = card.dataset.brand;
  const vid = card.dataset.video;
  const bn = card.querySelector('.card-brand').textContent;
  const fl = card.querySelector('.card-flavor').textContent;
  const rt = card.dataset.rating;
  const col = '#00e676'; // всегда зелёный

  // Очищаем старые элементы
  const old = modalVideoWrap.querySelector('iframe, video, .no-video-msg, .redirect-container');
  if (old) old.remove();

  // Шапка модалки
  modalDot.style.background = col;
  modalDot.textContent = bInit[b] || b[0];
  modalLabel.textContent = bn;
  modalFlavor.textContent = fl;
  modalRatingText.innerHTML = `Рейтинг: <strong>${rt}/10</strong>`;
  modalProgress.style.background = col;
  modalProgress.style.width = '0%';
  modalPlaceholder.style.display = 'none';

  // Открываем модалку (заглушка будет внутри, если видео нет)
  modal.classList.add('open');
  lockScroll();

  // Если видео нет – показываем сообщение внутри модального окна
  if (!vid) {
    modalVideoWrap.insertAdjacentHTML('beforeend',
      `<div class="no-video-msg">
        <div class="no-video-face">(╥﹏╥)</div>
        <p>ОБЗОР ПОКА НЕТ</p>
        <span class="no-video-sub">Скоро добавим</span>
      </div>`);
    return;
  }

  // Видео есть – показываем панель с редиректом
  let tiktokLink = `https://www.tiktok.com/@varna.23.live/video/${vid}`;

  const container = document.createElement('div');
  container.className = 'redirect-container';

  container.innerHTML = `
    <i class="fa-brands fa-tiktok redirect-icon"></i>
    <p class="redirect-title">Вы покидаете сайт</p>
    <p class="redirect-subtitle">Сейчас откроется видео в TikTok</p>
    <div class="redirect-actions">
      <button class="tiktok-go-btn">Перейти</button>
      <button class="tiktok-cancel-btn">Отмена</button>
    </div>
  `;

  modalVideoWrap.appendChild(container);

  const goBtn = container.querySelector('.tiktok-go-btn');
  const cancelBtn = container.querySelector('.tiktok-cancel-btn');

  // Передаём цвет бренда в CSS-переменные
  goBtn.style.setProperty('--btn-color', col);
  goBtn.style.setProperty('--btn-glow', col);

  // Поведение кнопок через классы
  goBtn.addEventListener('mouseenter', () => goBtn.classList.add('hover'));
  goBtn.addEventListener('mouseleave', () => goBtn.classList.remove('hover'));
  goBtn.addEventListener('mousedown', () => goBtn.classList.add('active'));
  goBtn.addEventListener('mouseup', () => goBtn.classList.remove('active'));

  cancelBtn.addEventListener('mouseenter', () => cancelBtn.classList.add('hover'));
  cancelBtn.addEventListener('mouseleave', () => cancelBtn.classList.remove('hover'));
  cancelBtn.addEventListener('mousedown', () => cancelBtn.classList.add('active'));
  cancelBtn.addEventListener('mouseup', () => cancelBtn.classList.remove('active'));

  // Логика перехода/закрытия
  goBtn.addEventListener('click', () => {
    window.open(tiktokLink, '_blank');
    closeVideoModal();
  });
  cancelBtn.addEventListener('click', () => {
    closeVideoModal();
  });
}
function closeVideoModal() { 
  if (!modal || !modalVideoWrap || !modalPlaceholder || !modalProgress) return;
  modal.classList.remove('open'); unlockScroll(); 
  clearInterval(progressInterval); 
  if (modalLabel) modalLabel.textContent = ''; 
  if (modalFlavor) modalFlavor.textContent = '';
  if (modalRatingText) modalRatingText.innerHTML = '';
  setTimeout(() => {  
    modalVideoWrap.innerHTML = ''; 
    modalVideoWrap.appendChild(modalPlaceholder); 
    modalPlaceholder.style.display = 'flex'; 
    modalProgress.style.width = '0%'; 
    currentVideoId = null; 
  }, 500);  
}

function handleVideoClose(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  closeVideoModal();
}

if (modalClose) {
  modalClose.addEventListener('click', handleVideoClose);
  modalClose.addEventListener('pointerdown', handleVideoClose);
  modalClose.addEventListener('touchstart', handleVideoClose, { passive: false });
}
if (modal) {
  modal.addEventListener('click', e => { if(e.target === modal) closeVideoModal(); });
}
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal && modal.classList.contains('open')) closeVideoModal(); });

if (modalTiktokBtn) {
  modalTiktokBtn.addEventListener('click', () => { 
    if(currentVideoId) {
      let link = `https://www.tiktok.com/@varna.23.live/video/${currentVideoId}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
          showToast(`Ссылка скопирована!`, 'fa-solid fa-link');
        }).catch(() => {
          showToast(`Ссылка: ${link}`, 'fa-brands fa-tiktok');
        });
      } else {
        showToast(`Ссылка: ${link}`, 'fa-brands fa-tiktok');
      }
    } 
  });
}
// ==========================================
// 10. МОБИЛЬНОЕ БУРГЕР-МЕНЮ
// ==========================================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function openMobileMenu() {
  if (!mobileMenu || !mobileOverlay) return;
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  lockScroll(); // Запрещаем скролл сайта
}
function closeMobileMenu() {
  if (!mobileMenu || !mobileOverlay) return;
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  unlockScroll(); // Возвращаем скролл
}

if (burgerBtn) burgerBtn.addEventListener('click', openMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

// Закрываем меню и ПЛАВНО прокручиваем к нужному месту
document.querySelectorAll('.mobile-link-btn').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Отключаем резкий рывок браузера по умолчанию
    const targetId = link.getAttribute('href'); // Узнаем, куда нажали (например #mapSection)
    if (!targetId || targetId.charAt(0) !== '#') {
      closeMobileMenu();
      return;
    }
    
    closeMobileMenu(); // Закрываем выезжающую панель
    
    // Ждем 150мс, пока панель заедет обратно, и тогда плавно скроллим
    setTimeout(() => {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  });
});
// ==========================================
// 11. КАРТА МАГАЗИНОВ (LEAFLET)
// ==========================================

// БАЗА МАГАЗИНОВ (ВАРНА). 
// Чтобы добавить марку в магазин — просто впиши её ключ в массив "inventory".
// Доступные ключи: "monster", "hell", "redbull", "burn", "battery", "nonstop", "rockstar", "c4"
const mapLocations = [
  { 
    id: 1, 
    name: "Grand Mall Varna", 
    lat: 43.2040, 
    lng: 27.9140, 
    img: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600&q=80", // Замени на фото фасада
    inventory: ["hell", "redbull", "monster"] // <--- ЗДЕСЬ УКАЗЫВАЕШЬ ЧТО ПРОДАЕТСЯ
  },
  { 
    id: 2, 
    name: "Пикадили (Морска градина)", 
    lat: 43.2025, 
    lng: 27.9215, 
    img: "https://images.unsplash.com/photo-1604719312566-8912e9267ea6?w=600&q=80",
    inventory: ["hell", "burn"] 
  },
  { 
    id: 3, 
    name: "Магазин на бул. Сливница", 
    lat: 43.2075, 
    lng: 27.9280, 
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80",
    inventory: ["monster", "c4"] 
  },
  { 
    id: 4, 
    name: "Фантастико (Вл. Варненчик)", 
    lat: 43.2150, 
    lng: 27.9050, 
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    inventory: ["redbull", "rockstar"] 
  },
  { 
    id: 5, 
    name: "Кауфланд (Център)", 
    lat: 43.2090, 
    lng: 27.9110, 
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    inventory: ["hell", "monster", "redbull", "burn", "c4"] // Если много брендов - просто пиши их через запятую
  },
      { 
    id: 6, 
    name: "Маяк", 
    lat: 43.1873338, 
    lng: 27.9218344, 
    img: "", 
    inventory: [], 
    popupHtml: `
      <div class="store-popup" style="text-align: center;">
        <div class="store-popup-header" style="justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 15px; padding-bottom: 10px;">
          <span style="color: #6e6e8a; font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 6px;">???</span>
        </div>
        <p style="color: #eaeaf0; margin: 0; font-size: 15px; line-height: 1.5;">
         <span style="color: #BFFF00; font-weight: bold; font-family: 'Oswald', sans-serif; font-size: 20px; letter-spacing: 1px;">???</span>
        </p>
      </div>
    `
  }
];

// ==========================================
// КАРТА: Инициализация выполняется лениво (после загрузки Leaflet)
// Все переменные объявлены через var на верхнем уровне, чтобы быть доступными
// в обработчике themeToggle (matrix mode) и других местах.
// ==========================================
var blueIcon = null;
var matrixMapIcon = null;
var map = null;
var markers = [];
var secretMysteryMarker = null;

function initMap() {
  if (typeof L === 'undefined') {
    console.warn('Leaflet (L) not loaded yet');
    return;
  }
  if (map !== null) return; // уже инициализирована

  // Иконка синей метки
  blueIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="45"><path fill="#1e6fff" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>`,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
    className: 'custom-marker'
  });

  // --- Иконка для Матрицы (светящаяся зеленая) ---
  matrixMapIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="40" height="60"><path fill="#00ff41" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" filter="drop-shadow(0 0 10px #00ff41) drop-shadow(0 0 20px #00ff41)"/></svg>`,
    iconSize: [40, 60],
    iconAnchor: [20, 60],
    popupAnchor: [0, -60],
    className: 'custom-marker'
  });

  // Инициализация карты
  map = L.map('mapContainer', { zoomControl: false }).setView([43.2070, 27.9120], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19
  }).addTo(map);

  // Создаем метки
  document.addEventListener('selectstart', function(e) {
    if (e.target.closest && e.target.closest('.leaflet-marker-icon')) {
      e.preventDefault();
    }
  }, true);

  mapLocations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: blueIcon, locData: loc });
    var popupContent = loc.popupHtml || `
     <div class="store-popup">
        <div class="store-popup-header"><i class="fa-solid fa-store"></i> ${loc.name}</div>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}" target="_blank" rel="noopener" class="route-btn">
          <i class="fa-solid fa-diamond-turn-right"></i> Проложить маршрут
        </a>
     </div>
    `;
    marker.bindPopup(popupContent, { maxWidth: 300, minWidth: 250 });

    if (loc.id === 6) {
      secretMysteryMarker = marker;
    } else {
      marker.addTo(map);
      markers.push(marker);
    }
  });

  initMapFilter();
  if (typeof matrixActive !== 'undefined' && matrixActive) applyMatrixMapEffect();
}

function applyMatrixMapEffect() {
  if (!map || !secretMysteryMarker) return;
  try {
    secretMysteryMarker.setIcon(matrixMapIcon);
    secretMysteryMarker.setPopupContent(
      '<div class="store-popup" style="text-align: center;">' +
        '<div class="store-popup-header" style="justify-content: center; border-bottom: 1px solid rgba(0,255,65,0.3); margin-bottom: 15px; padding-bottom: 10px;">' +
          '<span style="color: #023d11; font-family: \'Oswald\', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 6px;">???</span>' +
        '</div>' +
        '<p style="color: #00ff41; margin: 0 0 15px 0; font-size: 15px; line-height: 1.5;">Найди это место в реальности</p>' +
        '<a href="https://www.google.com/maps/dir/?api=1&destination=43.1873338,27.9218344" target="_blank" rel="noopener" class="route-btn" style="background: #00ff41; color: #000; font-weight: 700; text-shadow: none;">' +
          '<i class="fa-solid fa-diamond-turn-right"></i> Проложить маршрут' +
        '</a>' +
      '</div>'
    );
    secretMysteryMarker.addTo(map);
    map.flyTo([43.1873338, 27.9218344], 16, { duration: 1.5 });
    setTimeout(function() { secretMysteryMarker.openPopup(); }, 1600);
    if (markers && markers.length) markers.forEach(m => { try { map.removeLayer(m); } catch(e){} });
  } catch(e) { console.warn('Matrix map effect error', e); }
}

function revertMatrixMapEffect() {
  if (!map || !secretMysteryMarker) return;
  try {
    map.removeLayer(secretMysteryMarker);
    secretMysteryMarker.setIcon(blueIcon);
    secretMysteryMarker.setPopupContent(`
      <div class="store-popup" style="text-align: center;">
        <div class="store-popup-header" style="justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 15px; padding-bottom: 10px;">
          <span style="color: #6e6e8a; font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 6px;">???</span>
        </div>
        <p style="color: #eaeaf0; margin: 0; font-size: 15px; line-height: 1.5;">
          <span style="color: #BFFF00; font-weight: bold; font-family: 'Oswald', sans-serif; font-size: 20px; letter-spacing: 1px;">???</span>
        </p>
      </div>
    `);
    markers.forEach(m => m.addTo(map));
    map.flyTo([43.2070, 27.9120], 13, { duration: 1.5 });
  } catch(e) { console.warn('Matrix map revert error', e); }
}

// ==========================================
// ЛОГИКА ФИЛЬТРА КАРТЫ
// ==========================================
function initMapFilter() {
  const dropdown = document.getElementById('mapBrandDropdown');
  if (!dropdown) return;
  const favs = getFavs();

  const brandCounts = {};
  mapLocations.forEach(loc => {
    loc.inventory.forEach(key => {
      brandCounts[key] = (brandCounts[key] || 0) + 1;
    });
  });

  let html = `<div class="brand-option active" data-brand="all"><div class="brand-dot" style="background:var(--accent)"></div>Все магазины<div class="brand-count">${mapLocations.length}</div></div>`;
  html += `<div class="brand-option" data-brand="fav"><div class="brand-dot" style="background:#ff3b5c"></div>Избранное<div class="brand-count">${favs.length}</div></div>`;

  for (const key in brandCounts) {
    const name = bNames[key] || key;
    html += `<div class="brand-option" data-brand="${key}"><div class="brand-dot" style="background:${bColors[key] || '#888'}"></div>${name}<div class="brand-count">${brandCounts[key]}</div></div>`;
  }
  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdown.querySelectorAll('.brand-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const selectedBrand = opt.dataset.brand;

      dropdown.classList.remove('open');
      document.getElementById('mapBrandToggle').classList.remove('open');

      const currentFavs = getFavs();
      const favBrands = currentFavs.map(f => {
        const idx = parseInt(f.split('_')[1]);
        return (drinks[idx] && drinks[idx].key) || '';
      });

      markers.forEach(m => {
        const locData = m.options.locData;
        let show = false;

        if (selectedBrand === 'all') {
          show = true;
        } else if (selectedBrand === 'fav') {
          show = locData.inventory.some(brandKey => favBrands.includes(brandKey));
        } else {
          show = locData.inventory.includes(selectedBrand);
        }

        if (show) {
          m.addTo(map);
        } else {
          map.removeLayer(m);
        }
      });
    });
  });
}

// Тоггл меню (безопасный — даже если карта не загружена)
const mapBrandToggle = document.getElementById('mapBrandToggle');
if (mapBrandToggle) {
  mapBrandToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('mapBrandDropdown').classList.toggle('open');
    mapBrandToggle.classList.toggle('open');
  });
}
document.addEventListener('click', () => {
  const dd = document.getElementById('mapBrandDropdown');
  const bt = document.getElementById('mapBrandToggle');
  if (dd) dd.classList.remove('open');
  if (bt) bt.classList.remove('open');
});
// ==========================================
// ЛОГИКА КЛИКА МАТРИЦЫ (Должно быть после создания карты!)
// ==========================================
themeToggle.addEventListener('click', function() {
  themeClicks++;
  clearTimeout(themeClickTimer);
  themeClickTimer = setTimeout(function() { themeClicks = 0; }, 800);

  if (themeClicks >= 5 && !matrixActive) {
    themeClicks = 0;
    matrixActive = true;
    document.body.classList.remove('light-theme');
    document.body.classList.add('matrix-mode');
    createMatrixRain();

    /* Останавливаем типерайтер и ждём пока точно остановится */
    window._stopAboutTyping = true;

    setTimeout(function() {
      /* Смена текста "Обо мне" для матрицы */
      var aboutEl = document.getElementById('about-typewriter');
      if (aboutEl) {
        window._matrixOrigText = aboutEl.textContent;
        aboutEl.textContent = "Я занимаюсь обзорами энергетиков. Здесь вы найдете честные и подробные обзоры различных энергетических напитков, их состав, вкус и эффект. Моя задача следить за вами. ";
      }

      /* Смена текста под картой для матрицы */
      var discEl = document.querySelector('.map-disclaimer p');
      if (discEl) {
        window._matrixOrigDisc = discEl.innerHTML;
        discEl.innerHTML = 'Мы знаем о вас всё, но <strong>не отвечаем за их текущее наличие</strong> в матрице. Ассортимент может измениться.';
      }
    }, 60);

    applyMatrixMapEffect();
    
    showToast('🟢 Wake up, Wake up!', 'fa-solid fa-terminal');
        unlockAchievement('matrix');
    return;
  }

  if (matrixActive) {
    matrixActive = false;
    document.body.classList.remove('matrix-mode');
    var rain = document.getElementById('matrixCanvas');
    if (rain) rain.remove();
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    
    /* Возвращаем оригинальный текст "Обо мне" */
    var aboutEl2 = document.getElementById('about-typewriter');
    if (aboutEl2 && window._matrixOrigText) {
      aboutEl2.textContent = window._matrixOrigText;
      delete window._matrixOrigText;
    }

    /* Возвращаем оригинальный текст под картой */
    var discEl2 = document.querySelector('.map-disclaimer p');
    if (discEl2 && window._matrixOrigDisc) {
      discEl2.innerHTML = window._matrixOrigDisc;
      delete window._matrixOrigDisc;
    }
    
    /* МАГИЯ КАРТЫ: Возвращаем всё как было */
    if (secretMysteryMarker) {
      map.removeLayer(secretMysteryMarker);
      secretMysteryMarker.setIcon(blueIcon);
      secretMysteryMarker.setPopupContent(`
        <div class="store-popup" style="text-align: center;">
          <div class="store-popup-header" style="justify-content: center; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 15px; padding-bottom: 10px;">
            <span style="color: #6e6e8a; font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 6px;">???</span>
          </div>
          <p style="color: #eaeaf0; margin: 0; font-size: 15px; line-height: 1.5;">
            <span style="color: #BFFF00; font-weight: bold; font-family: 'Oswald', sans-serif; font-size: 20px; letter-spacing: 1px;">???</span>
          </p>
        </div>
      `);
    }
    markers.forEach(m => m.addTo(map));
    map.flyTo([43.2070, 27.9120], 13, { duration: 1.5 });
    
    showToast('Матрица отключена', 'fa-solid fa-power-off');
  } else {
    document.body.classList.toggle('light-theme');
    var isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
});
// ==========================================
// СИСТЕМА СЕКРЕТНОГО КЛЮЧА
// ==========================================
(function() {
  const SECRET_KEY = 'BUZZ2025';

  const keyModal = document.getElementById('keyModal');
  const keyInput = document.getElementById('keyInput');
  const keyError = document.getElementById('keyError');
  const keySuccess = document.getElementById('keySuccess');
  const keyActions = document.getElementById('keyActions');

  if (!keyModal) return;

  if (safeLSGet('buzz_key_activated', null)) {
    var kbtn = document.getElementById('openKeyModal');
    if (kbtn) {
      kbtn.innerHTML = '<i class="fa-solid fa-check"></i> Ключ активирован';
      kbtn.style.pointerEvents = 'none';
      kbtn.style.opacity = '0.4';
    }
  }

  document.getElementById('openKeyModal').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (safeLSGet('buzz_key_activated', null)) return;
    keyModal.classList.add('open');
    keyInput.value = '';
    keyError.textContent = '';
    keySuccess.style.display = 'none';
    keyActions.style.display = 'flex';
    keyInput.style.display = '';
    var kp = keyModal.querySelector('p');
    var ki = keyModal.querySelector('.key-modal-icon');
    var kh = keyModal.querySelector('h2');
    if (kp) kp.style.display = '';
    if (ki) ki.style.display = '';
    if (kh) kh.textContent = 'Секретный ключ';
    setTimeout(function() { keyInput.focus(); }, 300);
  });

  document.getElementById('closeKeyModal').addEventListener('click', function() {
    keyModal.classList.remove('open');
  });
  keyModal.addEventListener('click', function(e) {
    if (e.target === keyModal) keyModal.classList.remove('open');
  });

  document.getElementById('submitKey').addEventListener('click', function() {
    var entered = keyInput.value.trim().toUpperCase();

    if (!entered) {
      keyError.textContent = 'Введи код';
      keyInput.style.borderColor = '#ff3b5c';
      setTimeout(function() { keyInput.style.borderColor = ''; }, 1500);
      return;
    }

    if (entered === SECRET_KEY) {
      safeLSSet('buzz_key_activated', 'true');
      keyError.textContent = '';
      keyInput.style.display = 'none';
      keyActions.style.display = 'none';
      var kp = keyModal.querySelector('p');
      var ki = keyModal.querySelector('.key-modal-icon');
      var kh = keyModal.querySelector('h2');
      if (kp) kp.style.display = 'none';
      if (ki) ki.style.display = 'none';
      if (kh) kh.textContent = '';
      keySuccess.style.display = 'block';

      var btn = document.getElementById('openKeyModal');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Ключ активирован';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.4';
      }
            // Обновляем десктопную кнопку
      var desktopKeyBtn = document.getElementById('openKeyModalDesktop');
      if (desktopKeyBtn) {
        desktopKeyBtn.classList.add('activated');
        desktopKeyBtn.innerHTML = '<i class="fa-solid fa-key"></i> Код активирован';
      }
      showToast('Ключ активирован!', 'fa-solid fa-trophy');
      unlockAchievement('key');
    } else {
      keyError.textContent = 'Неверный код';
      keyInput.style.borderColor = '#ff3b5c';
      keyInput.value = '';
      setTimeout(function() { keyInput.style.borderColor = ''; keyError.textContent = ''; }, 2000);
      setTimeout(function() { keyInput.focus(); }, 300);
    }
  });

  keyInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('submitKey').click();
  });
    // === ДЕСКТОПНАЯ КНОПКА В ФУТЕРЕ ===
  var desktopKeyBtn = document.getElementById('openKeyModalDesktop');
  if (desktopKeyBtn) {
    if (safeLSGet('buzz_key_activated', null)) {
      desktopKeyBtn.classList.add('activated');
      desktopKeyBtn.innerHTML = '<i class="fa-solid fa-key"></i> Код активирован';
    }
    desktopKeyBtn.addEventListener('click', function() {
      if (safeLSGet('buzz_key_activated', null)) return;
      keyModal.classList.add('open');
      keyInput.value = '';
      keyError.textContent = '';
      keySuccess.style.display = 'none';
      keyActions.style.display = 'flex';
      keyInput.style.display = '';
      var kp = keyModal.querySelector('p');
      var ki = keyModal.querySelector('.key-modal-icon');
      var kh = keyModal.querySelector('h2');
      if (kp) kp.style.display = '';
      if (ki) ki.style.display = '';
      if (kh) kh.textContent = 'Секретный ключ';
      setTimeout(function() { keyInput.focus(); }, 300);
    });
  }
})();
// ==========================================
// 12. КАЛЬКУЛЯТОР КАФЕИНА (С ПОИСКОМ)
// ==========================================
(function() {
  const calcModal = document.getElementById('calcModal');
  const calcSearch = document.getElementById('calcSearch');
  const calcDropdown = document.getElementById('calcDropdown');
  const calcList = document.getElementById('calcList');
  const calcBar = document.getElementById('calcBar');
  const calcText = document.getElementById('calcText');
  const calcStatus = document.getElementById('calcStatus');
  let calcItems = [];
  let selectedCalcDrink = null;

  // Функция отрисовки выпадающего списка по запросу
  function renderCalcDropdown(query = '') {
    const q = query.toLowerCase();
    const filtered = drinks.filter(d => d.brand.toLowerCase().includes(q));
    calcDropdown.innerHTML = '';
    
    if (filtered.length === 0) {
      calcDropdown.innerHTML = '<div style="padding:12px;color:#555;font-family:Oswald;">Ничего не найдено</div>';
      return;
    }

    filtered.forEach(d => {
      const div = document.createElement('div');
      div.className = 'calc-option';
      // Подсвечиваем выбранный элемент
      if (selectedCalcDrink && selectedCalcDrink.brand === d.brand && selectedCalcDrink.flavor === d.flavor) {
        div.classList.add('active');
      }
      div.textContent = d.brand + ' (' + d.flavor + ')';
      
      div.addEventListener('click', () => {
        selectedCalcDrink = d;
        calcSearch.value = d.brand; // Подставляем название в инпут
        calcDropdown.classList.remove('open');
      });
      
      calcDropdown.appendChild(div);
    });
  }

  // Показываем список при фокусе
  calcSearch.addEventListener('focus', () => {
    renderCalcDropdown(calcSearch.value);
    calcDropdown.classList.add('open');
  });

  // Фильтруем при вводе текста
  calcSearch.addEventListener('input', () => {
    selectedCalcDrink = null; // Сбрасываем выбор, если юзер печатает сам
    renderCalcDropdown(calcSearch.value);
    calcDropdown.classList.add('open');
  });

  // Закрываем список при клике вне его
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.calc-search-wrap')) {
      calcDropdown.classList.remove('open');
    }
  });

  // Кнопка добавления
  document.getElementById('addCalcBtn').addEventListener('click', () => {
    // Если ничего не выбрано мышкой, пытаемся найти точное совпадение по тексту
    if (!selectedCalcDrink) {
      selectedCalcDrink = drinks.find(d => d.brand === calcSearch.value.trim());
    }

    if (!selectedCalcDrink) {
      calcSearch.style.borderColor = '#ff3b5c';
      setTimeout(() => { calcSearch.style.borderColor = ''; }, 1000);
      return;
    }

    // Добавляем в список
    calcItems.push({ name: selectedCalcDrink.brand, mg: parseInt(selectedCalcDrink.caffeine) || 0 });
    renderCalcList();
    updateCalcBar();

    // Очищаем инпут для следующего напитка
    selectedCalcDrink = null;
    calcSearch.value = '';
    calcDropdown.innerHTML = '';
    calcSearch.focus();
  });

  function renderCalcList() {
    calcList.innerHTML = '';
    calcItems.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'calc-item';
      div.innerHTML = `<span>${item.name}</span><div><strong>+${item.mg} мг</strong><button onclick="window._removeCalc(${i})"><i class="fa-solid fa-xmark"></i></button></div>`;
      calcList.appendChild(div);
    });
  }

  window._removeCalc = function(i) {
    calcItems.splice(i, 1);
    renderCalcList();
    updateCalcBar();
  };

  function updateCalcBar() {
    const total = calcItems.reduce((sum, item) => sum + item.mg, 0);
    const percent = Math.min((total / 400) * 100, 100);
    
    calcBar.style.width = percent + '%';
    calcText.textContent = total + ' мг / 400 мг';

    if (total <= 200) {
      calcBar.style.background = '#00ff41'; calcText.style.color = '#00ff41';
      const normalMsgs = ['Система в норме','Кофеин распределён равномерно','Бодрость активна','Можно ещё чуть-чуть','Сердце стабильно','Энергия в балансе'];
calcStatus.textContent = normalMsgs[Math.floor(Math.random() * normalMsgs.length)]; calcStatus.style.color = '#00ff41';
    } else if (total <= 350) {
      calcBar.style.background = '#ffd700'; calcText.style.color = '#ffd700';
     const warnMsgs = ['Внимание: повышенная нагрузка','Сердце ускоряется','Кофеин на пределе','Рекомендую притормозить','Пульс выше нормы'];
calcStatus.textContent = warnMsgs[Math.floor(Math.random() * warnMsgs.length)]; calcStatus.style.color = '#ffd700';
    } else {
      calcBar.style.background = '#ff3b5c'; calcText.style.color = '#ff3b5c';
      const dangerMsgs = ['ОПАСНОСТЬ: ПРЕВЫШЕН ДОПУСТИМЫЙ ЛИМИТ','СТОП! Хватит на сегодня','Ты переусердствовал','Завязывай с кофеином','Сердце не железное'];
calcStatus.textContent = dangerMsgs[Math.floor(Math.random() * dangerMsgs.length)]; calcStatus.style.color = '#ff3b5c';
            unlockAchievement('caffeine');
    }
        // Сохраняем рекорд дозы кофеина
    if (total > parseInt(safeLSGet('buzz_max_caffeine', 0))) {
      safeLSSet('buzz_max_caffeine', total);
    }
  }

  function closeCalcModal() {
    calcModal.classList.remove('open');
    unlockScroll();
  }
  document.getElementById('closeCalc').addEventListener('click', closeCalcModal);
  calcModal.addEventListener('click', e => { if(e.target === calcModal) closeCalcModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && calcModal.classList.contains('open')) closeCalcModal(); });

  // Открываем калькулятор — синхронизируем с CaffeineTracker
  window.openCalc = function() {
    // Загружаем данные из CaffeineTracker (если они есть)
    try {
      // ВАЖНО: CaffeineTracker объявлен как const, НЕ через window.CaffeineTracker
      if (typeof CaffeineTracker !== 'undefined' && typeof CaffeineTracker.getTodayData === 'function') {
        const data = CaffeineTracker.getTodayData();
        if (data && data.drinks && data.drinks.length > 0) {
          // Перестраиваем calcItems из данных трекера
          calcItems = data.drinks.map(d => ({ name: d.brand, mg: d.mg }));
          // Принудительно перерисовываем
          renderCalcList();
          updateCalcBar();
        } else {
          // Если данных нет — очищаем калькулятор
          calcItems = [];
          renderCalcList();
          updateCalcBar();
        }
      }
    } catch(e) { console.warn('Calc sync error:', e); }
    calcModal.classList.add('open');
    lockScroll();
    setTimeout(() => calcSearch.focus(), 300);
  };
})();

// ==========================================
// 13. СРАВНЕНИЕ ЭНЕРГЕТИКОВ (ПОЛНОСТЬЮ ИСПРАВЛЕННОЕ)
// ==========================================
(function() {
  const compareModal = document.getElementById('compareModal');
  const compareContent = document.getElementById('compareContent');
  const compareFloat = document.getElementById('compareFloatBtn');
  let compareList = []; 

  // Вспомогательная функция: вытаскивает только цифры
  function getNum(str) {
    if (!str) return 0;
    const match = String(str).match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  function closeCompareModal() {
    compareModal.classList.remove('open');
    unlockScroll(); 
    compareList = []; 
    updateCompareUI();
  }
  document.getElementById('closeCompare').addEventListener('click', closeCompareModal);
  compareModal.addEventListener('click', e => { if(e.target === compareModal) closeCompareModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && compareModal.classList.contains('open')) closeCompareModal(); });
  
  compareFloat.addEventListener('click', () => {
    if (compareList.length === 2) {
      renderComparison();
      compareModal.classList.add('open');
      lockScroll();
    }
  });

  // ИСПОЛЬЗУЕМ УНИКАЛЬНОЕ ИМЯ БРЕНДА ДЛЯ ТОЧНОГО СРАВНЕНИЯ
  window.toggleCompare = function(brandName) {
    const drink = drinks.find(d => d.brand === brandName);
    if (!drink) return;

    const index = compareList.findIndex(d => d.brand === brandName);
    
    if (index > -1) {
      compareList.splice(index, 1); // Убрали
    } else {
      if (compareList.length >= 2) compareList.shift(); // Если уже 2 — заменяем первый
      compareList.push(drink); // Добавили
    }

    updateCompareUI();
  };

  function updateCompareUI() {
    compareFloat.innerHTML = `<i class="fa-solid fa-code-compare"></i> Сравнить (${compareList.length}/2)`;
    
    if (compareList.length === 2) {
      compareFloat.style.transform = 'translateX(-50%) scale(1)';
    } else {
      compareFloat.style.transform = 'translateX(-50%) scale(0)';
    }

    // Сравниваем строго по уникальному названию
    document.querySelectorAll('.cmp-btn').forEach(btn => {
      const id = btn.dataset.id;
      if (compareList.find(d => d.brand === id)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function renderComparison() {
    const d1 = compareList[0];
    const d2 = compareList[1];
    
    if (!d1 || !d2) return;

    const stats = [
      { label: 'ОБЪЕМ (МЛ)', v1: getNum(d1.flavor), v2: getNum(d2.flavor) },
      { label: 'КОФЕИН (МГ)', v1: getNum(d1.caffeine), v2: getNum(d2.caffeine) },
      { label: 'САХАР (Г)', v1: getNum(d1.sugar), v2: getNum(d2.sugar) },
      { label: 'КАЛОРИИ (ККАЛ)', v1: getNum(d1.cal), v2: getNum(d2.cal) },
      { label: 'PH (КИСЛОТНОСТЬ)', v1: getNum(d1.ph), v2: getNum(d2.ph) }
    ];

    let html = '';
    
    html += `<div class="compare-col"><h3>${d1.brand}</h3></div>`;
    html += `<div class="compare-col"><h3>${d2.brand}</h3></div>`;

    stats.forEach(stat => {
      const maxVal = Math.max(stat.v1, stat.v2, 1); 
      const p1 = (stat.v1 / maxVal) * 100;
      const p2 = (stat.v2 / maxVal) * 100;

      html += `
        <div class="compare-col">
          <div class="compare-stat">
            <div class="compare-stat-label">${stat.label}</div>
            <div class="compare-stat-val">${stat.v1}</div>
            <div class="compare-bar-bg"><div class="compare-bar-fill" style="width: 0%; background: ${bColors[d1.key] || 'var(--accent)'}" data-width="${p1}%"></div></div>
          </div>
        </div>
        <div class="compare-col">
          <div class="compare-stat">
            <div class="compare-stat-label">${stat.label}</div>
            <div class="compare-stat-val">${stat.v2}</div>
            <div class="compare-bar-bg"><div class="compare-bar-fill" style="width: 0%; background: ${bColors[d2.key] || 'var(--accent)'}" data-width="${p2}%"></div></div>
          </div>
        </div>
      `;
    });

    compareContent.innerHTML = html;

    setTimeout(() => {
      compareContent.querySelectorAll('.compare-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 50);
  }
})();

// ==========================================
// ДОБАВЛЕНИЕ КНОПКИ СРАВНЕНИЯ НА КАРТОЧКИ
// ==========================================
const origCreateCard = createCard;
createCard = function(drink) {
  const card = origCreateCard(drink);
  
  // Привязываем кнопку к уникальному названию, а не к объему
  const drinkId = drink.brand; 
  
  const cmpBtn = document.createElement('button');
  cmpBtn.className = 'cmp-btn';
  cmpBtn.dataset.id = drinkId;
  cmpBtn.innerHTML = '<i class="fa-solid fa-code-compare"></i>';
  cmpBtn.addEventListener('click', e => {
    e.stopPropagation();
    window.toggleCompare(drinkId);
  });
  
  card.querySelector('.card-image').appendChild(cmpBtn);
  
  return card;
};
renderCards();
// ПЕРЕРИСОВЫВАЕМ КАРТОЧКИ

// ==========================================
// 14. РУССКАЯ РУЛЕТКА (ВЫБРАТЬ ЗА МЕНЯ)
// ==========================================
document.getElementById('randomBtn').addEventListener('click', function() {
  const cards = document.querySelectorAll('.energy-card');
  if (cards.length === 0) return;
  
  // Фаза 1: Быстрый глитч (перемешивание карточек)
  let shuffleCount = 0;
  const shuffleInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    grid.insertBefore(cards[randomIndex], grid.firstChild);
    shuffleCount++;
    if (shuffleCount > 25) clearInterval(shuffleInterval);
  }, 60);

  // Фаза 2: Выбор победителя
  setTimeout(() => {
    const winnerIndex = Math.floor(Math.random() * cards.length);
    
    // ВКЛЮЧАЕМ РЕЖИМ ЦЕНТРИРОВАНИЯ
    grid.classList.add('roulette-mode');
    
    // Прячем все и показываем только победителя
    cards.forEach(c => { c.style.display = 'none'; });
    cards[winnerIndex].style.display = '';
    cards[winnerIndex].classList.add('winner-card');
    
    // Возвращаем всё как было через 3.5 секунды
    setTimeout(() => {
      // ВЫКЛЮЧАЕМ РЕЖИМ ЦЕНТРИРОВАНИЯ
      grid.classList.remove('roulette-mode');
      
      cards.forEach(c => { 
        c.style.display = ''; 
        c.classList.remove('winner-card'); 
      });
      unlockAchievement('random');
    }, 3500);
  }, 1800);
});

// ==========================================
// 15. ХАКЕРСКИЙ ВЗЛОМ "СКОРО В ОБЗОРЕ" (ПАСХАЛКА)
// ==========================================
document.querySelectorAll('.coming-card').forEach(card => {
  const bar = card.querySelector('.hack-progress-bar');
  if (!bar) return;
  const status = card.querySelector('.hack-status'); // Теперь его тут нет, но мы проверяем
  let isHacking = false;
  
  card.addEventListener('mouseenter', () => {
    if (isHacking) return;
    isHacking = true;
    
    // Сбрасываем состояние
    card.classList.remove('denied');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    
        // Пасхалка: показываем слово только когда процесс пошел
    if (status) {
      status.textContent = 'ВЗЛОМ...'; 
      status.style.color = 'var(--accent)'; // Делаем его зеленым
    }
    
    // Принудительно обновляем экран
    void bar.offsetWidth; 
    
    // Запускаем полоску (2 секунды)
    bar.style.transition = 'width 2s linear';
    bar.style.width = '100%';
  });

  card.addEventListener('mouseleave', () => {
    // Если убрали курсор до конца взлома — молча сбрасываем
    if (!card.classList.contains('denied')) {
      bar.style.transition = 'width 0.3s ease';
      bar.style.width = '0%';
      if (status) status.textContent = ''; 
      isHacking = false;
    }
  });

  // Слушаем окончание анимации полоски
  bar.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'width' && parseInt(bar.style.width) === 100) {
      // ГЛИТЧ И ПОЯВЛЕНИЕ ТЕКСТА ТОЛЬКО СЕЙЧАС!
      card.classList.add('denied');
      if (status) {
        status.textContent = 'ОТКАЗАНО В ДОСТУПЕ';
      }
      
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
      
      // Через 1.5 секунды прячем текст и возвращаем всё как было
      setTimeout(() => {
        card.classList.remove('denied');
        bar.style.transition = 'width 0.5s ease';
        bar.style.width = '0%';
        if (status) {
          status.textContent = ''; // Снова прячем надпись в тень
        }
        isHacking = false;
      }, 700);
    }
  });
});

// ============================================================
// 💀 DOOM MODE — зеркальный Konami (↓↓↑↑→←→←BA)
// ============================================================
const DoomMode = (function() {
  let active = false;

  const cssText = `
    body.doom-mode {
      filter: contrast(1.3) brightness(0.8) !important;
      animation: doomFlicker 0.15s infinite !important;
    }
    @keyframes doomFlicker {
      0%, 100% { filter: contrast(1.3) brightness(0.8); }
      50% { filter: contrast(1.5) brightness(0.7); }
    }
    body.doom-mode::before {
      content: '';
      position: fixed;
      inset: 0;
      box-shadow: inset 0 0 200px rgba(120, 0, 0, 0.6);
      pointer-events: none;
      z-index: 99997;
    }
    body.doom-mode .section-title { text-shadow: 0 0 20px rgba(180, 0, 0, 0.8) !important; }
    body.doom-mode .energy-card { border-color: rgba(80, 0, 0, 0.5) !important; }
    body.doom-mode .energy-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(180, 0, 0, 0.3) !important; }
    body.doom-mode .card-image::before { background: rgba(180, 0, 0, 0.3) !important; }
    body.doom-mode .scroll-top-btn { z-index: 99999 !important; background: #8b0000 !important; color: #ff0000 !important; box-shadow: 0 0 20px rgba(255,0,0,0.5) !important; }
    #doomCountdown, #doomKillCounter {
      position: fixed !important;
      top: 80px !important;
      z-index: 2147483647 !important;
      transform: translateZ(0) !important;
      will-change: transform !important;
      pointer-events: none !important;
      opacity: 1 !important;
      display: block !important;
      visibility: visible !important;
      filter: none !important;
    }
    #doomCountdown {
      right: 20px !important;
      left: auto !important;
      font-family: 'Oswald', sans-serif !important;
      font-size: 32px !important;
      font-weight: 900 !important;
      color: #ff0000 !important;
      background: rgba(0,0,0,0.9) !important;
      border: 3px solid #ff0000 !important;
      border-radius: 8px !important;
      padding: 8px 20px !important;
      text-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000, 0 0 60px rgba(255,0,0,0.5) !important;
      letter-spacing: 3px !important;
      box-shadow: 0 0 30px #ff0000, 0 0 60px rgba(255,0,0,0.5), inset 0 0 20px rgba(255,0,0,0.15) !important;
      animation: doomPulse 1s ease-in-out infinite alternate !important;
    }
    #doomKillCounter {
      left: 20px !important;
      right: auto !important;
      font-family: 'Oswald', sans-serif !important;
      font-size: 22px !important;
      font-weight: 700 !important;
      color: #ff0000 !important;
      background: rgba(0,0,0,0.9) !important;
      border: 3px solid #ff0000 !important;
      border-radius: 6px !important;
      padding: 8px 16px !important;
      text-shadow: 0 0 10px #ff0000, 0 0 20px rgba(255,0,0,0.5) !important;
      letter-spacing: 2px !important;
      box-shadow: 0 0 20px #ff0000, 0 0 40px rgba(255,0,0,0.3) !important;
      transition: transform 0.15s ease;
    }
    @keyframes doomPulse {
      0% { box-shadow: 0 0 30px rgba(255,0,0,0.3), inset 0 0 20px rgba(255,0,0,0.1); }
      100% { box-shadow: 0 0 50px rgba(255,0,0,0.6), inset 0 0 30px rgba(255,0,0,0.2); }
    }
  `;

  function injectCSS() {
    if (document.getElementById('doom-mode-css')) return;
    const style = document.createElement('style');
    style.id = 'doom-mode-css';
    style.textContent = cssText;
    document.head.appendChild(style);
  }

  let countdownEl = null;
  let countdownInterval = null;
    function activate(viaPhone) {
    // DoomMode activate
    if (active) return;
    active = true;
    injectCSS();

    // === КИНЕМАТОГИЧНОЕ ИНТРО ===
    const intro = document.createElement('div');
    intro.id = 'doomIntro';
    intro.innerHTML = `
      <div class="doom-intro-bg"></div>
      <div class="doom-intro-content">
        <div class="doom-intro-line doom-intro-line-1">PROTOCOL: DOOM</div>
        <div class="doom-intro-line doom-intro-line-2">60 SECONDS REMAIN</div>
        <div class="doom-intro-line doom-intro-line-3">CLICK TO HARVEST</div>
      </div>
    `;
    document.body.appendChild(intro);
    requestAnimationFrame(() => intro.classList.add('show'));

    // Тяжёлый звуковой удар + нарастающий гул
    if (window.AudioSys && typeof AudioSys.resume === 'function') {
      AudioSys.resume().then(() => {
        try {
          const ctx = (window.AudioSys && AudioSys.getCtx) ? AudioSys.getCtx() : null;
          if (ctx) {
            // Удар
            const osc1 = ctx.createOscillator();
            const g1 = ctx.createGain();
            osc1.connect(g1); g1.connect(ctx.destination);
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(120, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.5);
            g1.gain.setValueAtTime(0.5, ctx.currentTime);
            g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
            osc1.start(); osc1.stop(ctx.currentTime + 1.5);
            // Гул на фоне
            const osc2 = ctx.createOscillator();
            const g2 = ctx.createGain();
            osc2.connect(g2); g2.connect(ctx.destination);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(55, ctx.currentTime);
            g2.gain.setValueAtTime(0.0, ctx.currentTime);
            g2.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
            g2.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 2.5);
            osc2.start(); osc2.stop(ctx.currentTime + 2.5);
          }
        } catch(e) { console.warn('Doom sound error:', e); }
      }).catch(() => {});
    }

    // Через 2.5с — снимаем интро, включаем режим
    setTimeout(() => {
      intro.classList.remove('show');
      setTimeout(() => intro.remove(), 600);
      document.body.classList.add('doom-mode');
      // Форсируем видимость ВСЕХ карточек сразу — иначе те, что ниже
      // первого экрана, остаются с opacity:0 (ждут ленивого IntersectionObserver)
      // и в Doom Mode их не видно, даже если проскроллить вниз.
      document.querySelectorAll('.energy-card:not(.visible)').forEach(c => c.classList.add('visible'));
      attachDoomClicks();

      // Обратный отсчёт 60 секунд
      let secs = 60;
      countdownEl = document.createElement('div');
      countdownEl.id = 'doomCountdown';
      document.body.appendChild(countdownEl);
      // Счётчик убитых банок
      const totalCards = document.querySelectorAll('.energy-card').length;
      let killedCount = 0;
      const killCounter = document.createElement('div');
      killCounter.id = 'doomKillCounter';
      killCounter.textContent = '☠ 0 / ' + totalCards;
      document.body.appendChild(killCounter);
      // Сохраняем в замыкание для доступа из обработчика
      window._doomKillState = { killedCount, totalCards, killCounter };
      countdownInterval = setInterval(() => {
        secs--;
        if (countdownEl) countdownEl.textContent = '💀 ' + secs;
        if (secs <= 0) {
          window._doomTimeUp = true;
          deactivate();
        }
      }, 1000);

      showToast('💀 РЕЖИМ ГИБЕЛИ АКТИВИРОВАН', 'fa-solid fa-skull');
      unlockAchievement('doom');
      if (viaPhone) unlockAchievement('phone_hacker');
    }, 2500);
  }
  // Обработчик клика по карточке — уничтожение с кровью
  let doomClickHandler = null;
  function attachDoomClicks() {
    if (doomClickHandler) return;
    doomClickHandler = function(e) {
      const card = e.target.closest('.energy-card');
      if (!card || card.classList.contains('doom-killed')) return;
      // Блокируем другие обработчики — в Doom Mode карточка уничтожается, а не открывается
      e.stopPropagation();
      e.preventDefault();
      
      // Кровь
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Красные осколки + кровь
      const burst = document.createElement('div');
      burst.style.cssText = `position:fixed;left:${cx - 80}px;top:${cy - 80}px;width:160px;height:160px;pointer-events:none;z-index:99999;border-radius:50%;background:radial-gradient(circle, rgba(255, 40, 40, 0.95) 0%, rgba(140, 0, 0, 0.75) 20%, rgba(70, 0, 0, 0.25) 55%, transparent 80%);filter:blur(1px);opacity:0.95;`;
      document.body.appendChild(burst);
      burst.animate([{ transform: 'scale(0.2)', opacity: 0.3 }, { transform: 'scale(1.3)', opacity: 0 }], { duration: 500, easing: 'ease-out' });
      setTimeout(() => burst.remove(), 520);

      for (let i = 0; i < 28; i++) {
        const shard = document.createElement('div');
        const isShard = i < 12;
        const size = isShard ? (4 + Math.random() * 8) : (6 + Math.random() * 10);
        const bg = isShard ? `hsl(${Math.random()*20}, 100%, ${40+Math.random()*30}%)` : '#8b0000';
        const br = isShard ? (Math.random() > 0.5 ? '2px' : '0') : '50%';
        shard.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:${size}px;height:${size * (isShard ? (0.5+Math.random()) : 1)}px;background:${bg};border-radius:${br};pointer-events:none;z-index:99999;`;
        document.body.appendChild(shard);
        const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.5;
        const dist = (isShard ? 140 : 100) + Math.random() * 140;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist + (isShard ? 70 : 110);
        const rot = Math.random() * 720 - 360;
        shard.animate([
          { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
          { transform: `translate(${tx}px,${ty}px) scale(0.2) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: (isShard ? 700 : 900) + Math.random() * 400, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' });
        setTimeout(() => shard.remove(), 1400);
      }
      
      // Красная вспышка экрана при каждом убийстве
      const flash = document.createElement('div');
      flash.style.cssText = 'position:fixed;inset:0;z-index:99998;pointer-events:none;background:radial-gradient(circle,rgba(255,0,0,0.3),transparent 70%);';
      document.body.appendChild(flash);
      flash.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}).onfinish=()=>flash.remove();

      // Капли крови вокруг карточки
      const cardRect = card.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        const drop = document.createElement('div');
        drop.className = 'doom-blood-drop';
        const size = 6 + Math.random() * 10;
        drop.style.width = size + 'px';
        drop.style.height = size + 'px';
        drop.style.left = (cardRect.left + cardRect.width * (0.2 + Math.random() * 0.6)) + 'px';
        drop.style.top = (cardRect.top + cardRect.height * (0.2 + Math.random() * 0.6)) + 'px';
        document.body.appendChild(drop);
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance + 20;
        drop.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(0.3)`, opacity: 0 }
        ], { duration: 600 + Math.random() * 300, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' });
        setTimeout(() => { if (drop.parentNode) drop.parentNode.removeChild(drop); }, 950);
      }

      // Уничтожение карточки
      const blood = document.createElement('div');
      blood.className = 'doom-blood-splash';
      card.appendChild(blood);
      requestAnimationFrame(() => blood.classList.add('show'));
      setTimeout(() => { if (blood.parentNode) blood.parentNode.removeChild(blood); }, 900);
      card.classList.add('doom-killed', 'card-hidden');
      card.style.transition = 'all 0.45s ease, opacity 0.45s ease';
      card.style.filter = 'brightness(0.2) saturate(0.4)';
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      setTimeout(() => { if (card.parentNode) card.parentNode.removeChild(card); }, 520);
      
      // Обновляем счётчик убитых
      if (window._doomKillState) {
        window._doomKillState.killedCount++;
        const ks = window._doomKillState;
        ks.killCounter.textContent = '☠ ' + ks.killedCount + ' / ' + ks.totalCards;
        // Пульс счётчика
        ks.killCounter.style.transform = 'scale(1.3)';
        setTimeout(() => { ks.killCounter.style.transform = 'scale(1)'; }, 200);
        // Все банки уничтожены!
        if (ks.killedCount >= ks.totalCards) {
          clearInterval(countdownInterval);
          unlockAchievement('doom_slayer');
          // Экран «ЖАТВА ЗАВЕРШЕНА» + ачивка
          const slayScreen = document.createElement('div');
          slayScreen.style.cssText = 'position:fixed;inset:0;z-index:9999999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(80,0,0,0.95),#000);pointer-events:none;';
          slayScreen.innerHTML = '<div style="font-family:Oswald,sans-serif;font-size:80px;font-weight:900;color:#ff0000;text-shadow:0 0 40px rgba(255,0,0,0.8),0 0 80px rgba(255,0,0,0.4);letter-spacing:8px;">ЖАТВА ЗАВЕРШЕНА</div><div style="font-family:Oswald,sans-serif;font-size:28px;color:#ff4444;margin-top:16px;letter-spacing:4px;text-shadow:0 0 20px rgba(255,0,0,0.6);">☠ ТЫ УБИЛ ИХ ВСЕХ ☠</div><div style="font-family:Oswald,sans-serif;font-size:24px;color:#8b0000;margin-top:20px;letter-spacing:4px;">НИЧЕГО НЕ ОСТАЛОСЬ</div><div style="font-size:60px;margin-top:30px;">💀</div>';
          document.body.appendChild(slayScreen);
          slayScreen.animate([{opacity:0},{opacity:1}],{duration:500,fill:'forwards'});
          // Взрыв красных осколков + крови по всему экрану
          for(let i=0;i<80;i++){const b=document.createElement('div');const bx=Math.random()*window.innerWidth;const by=Math.random()*window.innerHeight;const isShard=i<30;const bg=isShard?`hsl(${Math.random()*20},100%,${40+Math.random()*30}%)`:'#8b0000';const sz=6+Math.random()*12;b.style.cssText='position:fixed;left:'+bx+'px;top:'+by+'px;width:'+sz+'px;height:'+(sz*(isShard?(0.4+Math.random()*0.6):1))+'px;background:'+bg+';border-radius:'+(isShard?'2px':'50%')+';pointer-events:none;z-index:9999998;';document.body.appendChild(b);const a=Math.random()*Math.PI*2;const d=50+Math.random()*150;const r=Math.random()*720-360;b.animate([{transform:'translate(0,0) scale(1) rotate(0deg)',opacity:1},{transform:'translate('+Math.cos(a)*d+'px,'+( Math.sin(a)*d+80)+'px) scale(0) rotate('+r+'deg)',opacity:0}],{duration:1000+Math.random()*500,easing:'cubic-bezier(0.25,0.46,0.45,0.94)'});setTimeout(()=>b.remove(),1500);}
          // Звук «жатва завершена» — мощный
          if(window.AudioSys){try{const ctx=AudioSys.getCtx?AudioSys.getCtx():null;if(ctx){const o1=ctx.createOscillator();const g1=ctx.createGain();o1.connect(g1);g1.connect(ctx.destination);o1.type='square';o1.frequency.setValueAtTime(100,ctx.currentTime);o1.frequency.exponentialRampToValueAtTime(30,ctx.currentTime+1.5);g1.gain.setValueAtTime(0.4,ctx.currentTime);g1.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+1.5);o1.start();o1.stop(ctx.currentTime+1.5);const o2=ctx.createOscillator();const g2=ctx.createGain();o2.connect(g2);g2.connect(ctx.destination);o2.type='sawtooth';o2.frequency.setValueAtTime(60,ctx.currentTime+0.5);o2.frequency.exponentialRampToValueAtTime(15,ctx.currentTime+2);g2.gain.setValueAtTime(0,ctx.currentTime);g2.gain.linearRampToValueAtTime(0.25,ctx.currentTime+0.7);g2.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+2);o2.start(ctx.currentTime+0.5);o2.stop(ctx.currentTime+2);const o3=ctx.createOscillator();const g3=ctx.createGain();o3.connect(g3);g3.connect(ctx.destination);o3.type='square';o3.frequency.setValueAtTime(440,ctx.currentTime);o3.frequency.exponentialRampToValueAtTime(110,ctx.currentTime+0.8);g3.gain.setValueAtTime(0.2,ctx.currentTime);g3.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.8);o3.start();o3.stop(ctx.currentTime+0.8);}}catch(e){}}
          setTimeout(()=>{slayScreen.animate([{opacity:1},{opacity:0}],{duration:800,fill:'forwards'}).onfinish=()=>slayScreen.remove();},4000);
          // Уничтожение всех карточек — третий, "чистый" способ выйти из режима:
          // выключаем Doom Mode без штрафного Death-экрана и сброса данных.
          setTimeout(() => {
            window._doomAllKilled = true;
            deactivate();
          }, 4200);
        }
      }
      
            // Звук смерти — хруст + удар
      if (window.AudioSys && typeof AudioSys.resume === 'function') {
        AudioSys.resume().then(() => {
          try {
            const ctx = (window.AudioSys && AudioSys.getCtx) ? AudioSys.getCtx() : null;
            if (ctx) {
              // Хруст (шум)
              const bufSize = ctx.sampleRate * 0.15;
              const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
              const data = buf.getChannelData(0);
              for (let s = 0; s < bufSize; s++) data[s] = (Math.random() * 2 - 1) * (1 - s / bufSize);
              const noise = ctx.createBufferSource();
              noise.buffer = buf;
              const ng = ctx.createGain();
              noise.connect(ng); ng.connect(ctx.destination);
              ng.gain.setValueAtTime(0.35, ctx.currentTime);
              ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
              noise.start(); noise.stop(ctx.currentTime + 0.15);
              // Удар
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain); gain.connect(ctx.destination);
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(200, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
              gain.gain.setValueAtTime(0.3, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
              osc.start(); osc.stop(ctx.currentTime + 0.25);
              // Высокий щелчок-осколок
              const osc2 = ctx.createOscillator();
              const g2 = ctx.createGain();
              osc2.connect(g2); g2.connect(ctx.destination);
              osc2.type = 'square';
              osc2.frequency.setValueAtTime(800, ctx.currentTime);
              osc2.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
              g2.gain.setValueAtTime(0.15, ctx.currentTime);
              g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
              osc2.start(); osc2.stop(ctx.currentTime + 0.08);
            }
          } catch(e) {}
        }).catch(() => {});
      }
    };
    document.addEventListener('click', doomClickHandler, true);
  }

    function detachDoomClicks() {
    if (doomClickHandler) {
      document.removeEventListener('click', doomClickHandler, true);
      doomClickHandler = null;
    }
    // Перерисовываем все карточки, так как убитые были удалены из DOM
    renderCards();   // ← заменить весь блок восстановления на эту строку
    
    // Удаляем счётчик убитых
    const kc = document.getElementById('doomKillCounter');
    if (kc) kc.remove();
    window._doomKillState = null;
  }
    function triggerDeathScreen() {
    // Полный экран тьмы + надпись Death
    const deathScreen = document.createElement('div');
    deathScreen.id = 'deathScreen';
    deathScreen.style.cssText = `
      position: fixed; inset: 0; background: #000; z-index: 999999;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 3s ease-in; pointer-events: none;
    `;
       deathScreen.innerHTML = `
      <div class="doom-death-wrap">
        <div class="doom-death-title" data-text="DEATH">DEATH</div>
        <div class="doom-death-sub">Агент был убит.</div>
        <div class="doom-death-hint">Все достижения и данные сброшены.</div>
        <div class="doom-death-arise">ARISE</div>
      </div>
    `;
    document.body.appendChild(deathScreen);
    
    // Запускаем погружение в тьму
    requestAnimationFrame(() => { deathScreen.style.opacity = '1'; });
    
    // Низкий гул
    if (window.AudioSys) {
      try {
        const ctx = (window.AudioSys && AudioSys.getCtx) ? AudioSys.getCtx() : null;
        if (ctx) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(60, ctx.currentTime);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 3);
          osc.start();
          osc.stop(ctx.currentTime + 3);
        }
      } catch(e) {}
    }
    
    // Через 5 секунд — сброс + перезагрузка
    setTimeout(() => {
      // Сохраняем флаг, что мы в процессе сброса (чтобы не выдавать другие ачивки)
      safeLSSet('buzz_death_pending', 'true');
      
      // Удаляем ВСЕ ачивки
      Object.keys(achievements).forEach(key => safeLSRemove('ach_' + key));
      // Удаляем другие данные
      safeLSRemove('energy_favs');
      safeLSRemove('buzz_caffeine_today');
      safeLSRemove('buzz_view_history');
      safeLSRemove('buzz_max_caffeine');
      safeLSRemove('buzzrate_visits');
      safeLSRemove('buzz_daily_drink');
      safeLSRemove('buzz_last_update_check');
      
      // Выдаём ачивку Восставшего
      unlockAchievement('resurrected');
      safeLSRemove('buzz_death_pending');
      
      // Перезагружаем страницу
      window.location.reload();
    }, 5000);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    document.body.classList.remove('doom-mode');
    detachDoomClicks();
    if (countdownEl) { countdownEl.remove(); countdownEl = null; }
    clearInterval(countdownInterval);

    // Третий способ выхода — все карточки уничтожены. Без штрафа и сброса данных.
    if (window._doomAllKilled) {
      window._doomAllKilled = false;
      showToast('☠ Жатва завершена. Ничего не осталось.', 'fa-solid fa-skull-crossbones');
      return;
    }

    // Если отсчёт дошёл до 0 — запускаем Death экран
    if (window._doomTimeUp) {
      window._doomTimeUp = false;
      triggerDeathScreen();
      return;
    }
    
    showToast('Ты выжил. Пока.', 'fa-solid fa-skull');
  }

    function toggle(viaPhone) {
    // DoomMode toggle
    if (active) deactivate();
    else activate(viaPhone);
  }

  return { toggle };
})();
// ==========================================
// 16.5. BLOCK BLAST (режимы + ежедневные силы + эффекты)
// ==========================================
const BlockBlastGame = (function() {
  const WIN_SCORE = 1500; // очков для победы (эффект + тост, игра продолжается)
  const MAX_CHARGE = 50;  // защитный потолок, чтобы UI не сходил с ума
  const CHARGES_KEY = 'buzz_blockblast_charges';
  const GRANT_KEY = 'buzz_blockblast_last_grant_date'; // последний обработанный день (YYYY-MM-DD)

  const MODES = {
    classic: { name: 'Классика', grid: 8, desc: '8×8, без ограничений', mask: null },
    mini:    { name: 'Мини',     grid: 6, desc: '6×6, компактно и быстро', mask: null },
    cross:   { name: 'Крест',    grid: 9, desc: '9×9, углы закрыты', mask: (r, c, g) => {
        const q = Math.floor(g / 3);
        const blockedZone = (v) => v < q || v >= g - q;
        return blockedZone(r) && blockedZone(c);
      } }
  };
  let currentModeKey = 'classic';

  const EASY_SHAPES = [
    [[1,1]], [[1],[1]], [[1,1,1]], [[1],[1],[1]], [[1,1],[1,1]]
  ];
  const MEDIUM_SHAPES = [
    [[1,1,1,1]], [[0,1,0],[1,1,1]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]],
    [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]], [[1,1],[1,0]], [[1,1,1],[1,0,0]], [[1,1,1],[0,0,1]]
  ];
  const HARD_SHAPES = [
    [[1,1,1,1,1]], [[1,1,1],[1,1,1]], [[0,1,0],[1,1,1],[0,1,0]], [[1,0,1],[1,1,1]],
    [[1,1,0],[0,1,0],[0,1,1]], [[0,1,1],[0,1,0],[1,1,0]], [[1,1],[1,1],[1,1]]
  ];

  const colors = ['#00e676','#fbbf24','#a855f7','#22c55e','#ef4444','#3b82f6','#f97316','#ec4899','#06b6d4','#14b8a6','#eab308','#8b5cf6','#f43f5e','#84cc16'];

  let GRID = 8;
  let CELL_SIZE = 50;

  let board = [];
  let figures = [];
  let score = 0;
  let bestScore = parseInt(safeLSGet('buzz_blockblast_best', '0'), 10) || 0;
  let gameOver = false;
  let hasWon = false;

  let overlay = null;
  let canvas = null;
  let ctx = null;
  let figuresContainer = null;
  let scoreEl = null;
  let bestScoreEl = null;

  let draggedFigureIndex = -1;
  let dragGhost = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragAnchorCol = 0;
  let dragAnchorRow = 0;
  let isDragging = false;

  let previewShape = null;
  let previewCol = -1;
  let previewRow = -1;
  let previewValid = false;

  let powerActive = null; // 'bomb' | 'firework' | 'rocket' | null
  let charges = { bomb: 0, firework: 0, rocket: 0 };
  let powerHoverCol = -1;
  let powerHoverRow = -1;
  let fireworkAxis = 'row'; // 'row' | 'col' — переключается кликом правой кнопкой мыши

  function getAchCount() {
    let n = 0;
    if (typeof achievements !== 'undefined') {
      for (let k in achievements) if (safeLSGet('ach_' + k, null)) n++;
    }
    return n;
  }

  function loadCharges() { charges = safeLSGetJSON(CHARGES_KEY, { bomb: 0, firework: 0, rocket: 0 }); }
  function saveCharges() { safeLSSetJSON(CHARGES_KEY, charges); }

  function grantDailyCharges() {
    const visitDays = safeLSGetJSON('buzz_visit_days', []).slice().sort();
    if (visitDays.length === 0) return;
    const lastGrant = safeLSGet(GRANT_KEY, null);
    const newDays = lastGrant ? visitDays.filter(d => d > lastGrant) : visitDays;
    if (newDays.length === 0) return;

    const achCount = getAchCount();
    const granted = [];
    if (achCount >= 5) { charges.bomb = Math.min(MAX_CHARGE, charges.bomb + newDays.length); granted.push('Бомба ×' + newDays.length); }
    if (achCount >= 10) { charges.firework = Math.min(MAX_CHARGE, charges.firework + newDays.length); granted.push('Салют ×' + newDays.length); }
    if (achCount >= 15) { charges.rocket = Math.min(MAX_CHARGE, charges.rocket + newDays.length); granted.push('Ракета ×' + newDays.length); }
    saveCharges();
    safeLSSet(GRANT_KEY, visitDays[visitDays.length - 1]);
    if (granted.length && typeof showToast === 'function') {
      showToast('🎁 Начислено: ' + granted.join(', '), 'fa-solid fa-gift');
    }
  }

  function initBoard() {
    const mode = MODES[currentModeKey];
    board = Array.from({length: GRID}, (_, r) =>
      Array.from({length: GRID}, (_, c) => (mode.mask && mode.mask(r, c, GRID)) ? 'blocked' : null)
    );
  }

  function getShapePool() {
    if (score < 250) return EASY_SHAPES.concat(MEDIUM_SHAPES.slice(0, 4));
    if (score < 700) return MEDIUM_SHAPES.concat(EASY_SHAPES.slice(0, 2));
    return MEDIUM_SHAPES.concat(HARD_SHAPES);
  }

  function generateFigure() {
    const pool = getShapePool();
    const shape = pool[Math.floor(Math.random() * pool.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { shape: shape.map(row => row.slice()), color };
  }

  function generateFigures() {
    figures = [generateFigure(), generateFigure(), generateFigure()];
  }

  function canPlace(shape, startX, startY) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (!shape[r][c]) continue;
        const x = startX + c;
        const y = startY + r;
        if (x < 0 || x >= GRID || y < 0 || y >= GRID) return false;
        if (board[y][x] !== null) return false;
      }
    }
    return true;
  }

  function placeFigure(shape, color, startX, startY) {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) board[startY + r][startX + c] = color;
      }
    }
    const cells = shape.flat().filter(v => v).length;
    score += cells * 10;
    updateScore();
  }

  function findClearLines() {
    const rows = [];
    const cols = [];
    for (let r = 0; r < GRID; r++) {
      const hasBlocked = board[r].some(cell => cell === 'blocked');
      if (!hasBlocked && board[r].every(cell => cell !== null)) rows.push(r);
    }
    for (let c = 0; c < GRID; c++) {
      let full = true, hasBlocked = false;
      for (let r = 0; r < GRID; r++) {
        if (board[r][c] === 'blocked') hasBlocked = true;
        if (board[r][c] === null) full = false;
      }
      if (!hasBlocked && full) cols.push(c);
    }
    return { rows, cols };
  }

  function applyClear(rows, cols) {
    const toClear = new Set();
    rows.forEach(r => { for (let c = 0; c < GRID; c++) toClear.add(r + ',' + c); });
    cols.forEach(c => { for (let r = 0; r < GRID; r++) toClear.add(r + ',' + c); });
    toClear.forEach(key => {
      const [r, c] = key.split(',').map(Number);
      if (board[r][c] !== 'blocked') board[r][c] = null;
    });
    const linesCleared = rows.length + cols.length;
    score += linesCleared * 100;
    updateScore();
  }

  function drawFlashCell(col, row, t) {
    const x = col * CELL_SIZE, y = row * CELL_SIZE;
    const size = CELL_SIZE - 2;
    const cx = x + CELL_SIZE / 2, cy = y + CELL_SIZE / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1 + t * 0.18, 1 + t * 0.18);
    ctx.fillStyle = `rgba(255,255,255,${0.9 * (1 - t)})`;
    ctx.shadowColor = '#BFFF00';
    ctx.shadowBlur = 22 * (1 - t);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function flashAndClear(rows, cols, onDone) {
    if (window.AudioSys) { try { AudioSys.play('pop'); } catch(e) {} }
    let start = null;
    const duration = 260;
    function frame(ts) {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      drawBoardBase();
      rows.forEach(r => { for (let c = 0; c < GRID; c++) drawFlashCell(c, r, t); });
      cols.forEach(c => { for (let r = 0; r < GRID; r++) drawFlashCell(c, r, t); });
      if (t < 1) requestAnimationFrame(frame);
      else onDone();
    }
    requestAnimationFrame(frame);
  }

  function hasValidMove() {
    for (let fig of figures) {
      for (let r = 0; r <= GRID - fig.shape.length; r++) {
        for (let c = 0; c <= GRID - fig.shape[0].length; c++) {
          if (canPlace(fig.shape, c, r)) return true;
        }
      }
    }
    return false;
  }

  function checkGameOver() {
    if (!hasValidMove()) {
      gameOver = true;
      if (window.AudioSys) { try { AudioSys.play('error'); } catch(e) {} }
      if (typeof showToast === 'function') showToast('💀 Игра окончена! Счёт: ' + score, 'fa-solid fa-skull');
      if (score > bestScore) { bestScore = score; safeLSSet('buzz_blockblast_best', bestScore); }
      updateBestScore();
      renderPowerButtons();
      drawBoard();
    }
  }

  function checkWin() {
    if (!hasWon && score >= WIN_SCORE) {
      hasWon = true;
      if (window.AudioSys) { try { AudioSys.play('achievement'); } catch(e) {} }
      if (typeof showToast === 'function') showToast('🏆 ПОБЕДА! ' + WIN_SCORE + ' очков достигнуто — играй дальше на рекорд!', 'fa-solid fa-trophy');
    }
  }

  function resetGame() {
    const mode = MODES[currentModeKey];
    GRID = mode.grid;
    const viewportLimit = Math.max(220, (window.innerWidth || 400) - 60);
    const maxBoardPx = Math.min(400, viewportLimit);
    CELL_SIZE = Math.max(28, Math.floor(maxBoardPx / GRID));
    if (canvas) { canvas.width = GRID * CELL_SIZE; canvas.height = GRID * CELL_SIZE; }
    initBoard();
    generateFigures();
    draggedFigureIndex = -1;
    isDragging = false;
    previewShape = null; previewCol = -1; previewRow = -1;
    if (dragGhost) { dragGhost.remove(); dragGhost = null; }
    score = 0;
    gameOver = false;
    hasWon = false;
    powerActive = null;
    updateScore();
    updateBestScore();
    renderFigures();
    renderPowerButtons();
    drawBoard();
  }

  function drawBoardBase() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(160,160,175,0.28)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL_SIZE, 0); ctx.lineTo(i * CELL_SIZE, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL_SIZE); ctx.lineTo(canvas.width, i * CELL_SIZE); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(191,255,0,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        if (board[r][c] === 'blocked') drawBlockedCell(c, r);
        else if (board[r][c] !== null) drawCell(c, r, board[r][c]);
      }
    }
  }

  function drawBlockedCell(col, row) {
    const x = col * CELL_SIZE, y = row * CELL_SIZE;
    ctx.fillStyle = 'rgba(255,59,92,0.12)';
    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    ctx.strokeStyle = 'rgba(255,59,92,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 1.5, y + 1.5, CELL_SIZE - 3, CELL_SIZE - 3);
    ctx.strokeStyle = 'rgba(255,59,92,0.3)';
    ctx.beginPath();
    ctx.moveTo(x + 5, y + CELL_SIZE - 5);
    ctx.lineTo(x + CELL_SIZE - 5, y + 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 5, y + 5);
    ctx.lineTo(x + CELL_SIZE - 5, y + CELL_SIZE - 5);
    ctx.stroke();
  }

  function drawCell(col, row, color) {
    const x = col * CELL_SIZE, y = row * CELL_SIZE;
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, 3);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(x + 1, y + CELL_SIZE - 4, CELL_SIZE - 2, 3);
  }

  function drawBoard() {
    if (!ctx) return;
    drawBoardBase();

    if (isDragging && previewShape && previewCol >= 0 && previewRow >= 0) {
      ctx.globalAlpha = 0.6;
      for (let r = 0; r < previewShape.length; r++) {
        for (let c = 0; c < previewShape[r].length; c++) {
          if (!previewShape[r][c]) continue;
          const x = (previewCol + c) * CELL_SIZE, y = (previewRow + r) * CELL_SIZE;
          ctx.fillStyle = previewValid ? '#ffffff' : '#ff3b5c';
          ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          ctx.strokeStyle = previewValid ? '#ffffff' : '#ff3b5c';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        }
      }
      ctx.globalAlpha = 1.0;
    }

    if (powerActive) {
      ctx.strokeStyle = powerActive === 'bomb' ? '#ff3b5c' : (powerActive === 'firework' ? '#fbbf24' : '#a855f7');
      ctx.lineWidth = 3;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    }
    if (powerActive && powerHoverCol >= 0 && powerHoverRow >= 0) drawPowerPreview();

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ff3b5c';
      ctx.font = '900 26px Oswald, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillStyle = '#fff';
      ctx.font = '14px "Source Sans 3", sans-serif';
      ctx.fillText('Нажмите "Заново"', canvas.width / 2, canvas.height / 2 + 20);
    }
  }

  function drawPowerPreview() {
    const col = powerHoverCol, row = powerHoverRow;
    let cells = [];
    if (powerActive === 'bomb') {
      for (let dy = 0; dy <= 1; dy++) for (let dx = 0; dx <= 1; dx++) {
        const r = row + dy, c = col + dx;
        if (r < GRID && c < GRID) cells.push([r, c]);
      }
    } else if (powerActive === 'firework') {
      if (fireworkAxis === 'row') { for (let c = 0; c < GRID; c++) cells.push([row, c]); }
      else { for (let r = 0; r < GRID; r++) cells.push([r, col]); }
    } else if (powerActive === 'rocket') {
      for (let c = 0; c < GRID; c++) cells.push([row, c]);
      for (let r = 0; r < GRID; r++) if (r !== row) cells.push([r, col]);
    }
    const color = powerActive === 'bomb' ? '255,59,92' : (powerActive === 'firework' ? '251,191,36' : '168,85,247');
    ctx.save();
    ctx.fillStyle = `rgba(${color},0.28)`;
    ctx.strokeStyle = `rgba(${color},0.8)`;
    ctx.lineWidth = 2;
    cells.forEach(([r, c]) => {
      const x = c * CELL_SIZE, y = r * CELL_SIZE;
      ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      ctx.strokeRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });
    ctx.restore();
  }

  function renderFigures() {
    if (!figuresContainer) return;
    figuresContainer.innerHTML = '';
    figures.forEach((fig, index) => {
      const figEl = document.createElement('div');
      figEl.className = 'blockblast-figure';
      figEl.dataset.index = index;
      fig.shape.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'blockblast-row';
        row.forEach(cell => {
          const cellEl = document.createElement('div');
          cellEl.className = 'blockblast-cell';
          cellEl.style.backgroundColor = cell ? fig.color : 'transparent';
          rowEl.appendChild(cellEl);
        });
        figEl.appendChild(rowEl);
      });
      figEl.addEventListener('mousedown', (e) => startDrag(e, index));
      figEl.addEventListener('touchstart', (e) => startDrag(e, index), { passive: false });
      figuresContainer.appendChild(figEl);
    });
  }

  function renderPowerButtons() {
    const wrap = document.getElementById('blockblastPowers');
    if (!wrap) return;
    const godMode = !!window._buzzGodMode;
    const achCount = getAchCount();
    wrap.innerHTML = '';
    const defs = [
      { key: 'bomb', icon: 'fa-explosion', need: 5, label: 'Бомба' },
      { key: 'firework', icon: 'fa-burst', need: 10, label: 'Салют' },
      { key: 'rocket', icon: 'fa-rocket', need: 15, label: 'Ракета' }
    ];
    defs.forEach(d => {
      if (!godMode && achCount < d.need) return;
      const btn = document.createElement('button');
      btn.className = 'blockblast-power-btn';
      btn.dataset.power = d.key;
      const count = charges[d.key] || 0;
      btn.disabled = (!godMode && count <= 0) || gameOver;
      btn.classList.toggle('active', powerActive === d.key);
      btn.innerHTML = `<i class="fa-solid ${d.icon}"></i><span>${d.label}</span><b class="power-count">${godMode ? '∞' : '×' + count}</b>`;
      btn.title = (!godMode && count <= 0)
        ? 'Нет зарядов — новый придёт со следующим визитом'
        : (d.key === 'rocket' ? 'Крест на весь экран — нажми на клетку' : (d.key === 'firework' ? 'Правый клик — сменить строку/столбец, левый — очистить' : 'Квадрат 2×2 — нажми на клетку'));
      btn.addEventListener('click', () => onPowerButtonClick(d.key));
      wrap.appendChild(btn);
    });
    renderPowerLegend(godMode, achCount);
  }

  function renderPowerLegend(godMode, achCount) {
    const legend = document.getElementById('blockblastPowerLegend');
    if (!legend) return;
    const items = [];
    if (godMode || achCount >= 5) items.push('<i class="fa-solid fa-explosion" style="color:#ff3b5c"></i> Бомба — квадрат 2×2 от клетки');
    if (godMode || achCount >= 10) items.push('<i class="fa-solid fa-burst" style="color:#fbbf24"></i> Салют — строка или столбец (ПКМ — переключить)');
    if (godMode || achCount >= 15) items.push('<i class="fa-solid fa-rocket" style="color:#a855f7"></i> Ракета — крест через всё поле, нажми на клетку');
    legend.innerHTML = items.length
      ? items.map(i => `<div class="power-legend-row">${i}</div>`).join('')
      : '<div class="power-legend-row" style="color:#555">Способности появятся с первыми достижениями</div>';
  }

  function onPowerButtonClick(key) {
    const godMode = !!window._buzzGodMode;
    if ((!godMode && (charges[key] || 0) <= 0) || gameOver) return;
    powerActive = (powerActive === key) ? null : key;
    powerHoverCol = -1; powerHoverRow = -1;
    renderPowerButtons();
    drawBoard();
  }

  function usePowerBombAt(col, row) {
    let cleared = 0;
    for (let dy = 0; dy <= 1; dy++) {
      for (let dx = 0; dx <= 1; dx++) {
        const r = row + dy, c = col + dx;
        if (r >= 0 && r < GRID && c >= 0 && c < GRID && board[r][c] !== 'blocked' && board[r][c] !== null) {
          board[r][c] = null; cleared++;
        }
      }
    }
    score += cleared * 15;
    updateScore();
    if (!window._buzzGodMode) { charges.bomb = Math.max(0, charges.bomb - 1); saveCharges(); }
    powerActive = null;
    if (window.AudioSys) { try { AudioSys.play('bomb'); } catch(e) {} }
    if (typeof showToast === 'function') showToast('💥 Бомба! +' + (cleared * 15) + ' очков', 'fa-solid fa-explosion');
  }

  function usePowerFireworkAt(col, row) {
    let cleared = 0;
    for (let c = 0; c < GRID; c++) {
      if (board[row][c] !== 'blocked' && board[row][c] !== null) { board[row][c] = null; cleared++; }
    }
    score += 100 + cleared * 10;
    updateScore();
    if (!window._buzzGodMode) { charges.firework = Math.max(0, charges.firework - 1); saveCharges(); }
    powerActive = null;
    if (window.AudioSys) { try { AudioSys.play('achievement'); } catch(e) {} }
    if (typeof showToast === 'function') showToast('🎆 Салют! Линия очищена', 'fa-solid fa-burst');
  }

  function usePowerRocketAt(col, row) {
    let cleared = 0;
    for (let c = 0; c < GRID; c++) {
      if (board[row][c] !== 'blocked' && board[row][c] !== null) { board[row][c] = null; cleared++; }
    }
    for (let r = 0; r < GRID; r++) {
      if (r !== row && board[r][col] !== 'blocked' && board[r][col] !== null) { board[r][col] = null; cleared++; }
    }
    score += cleared * 20;
    updateScore();
    if (!window._buzzGodMode) { charges.rocket = Math.max(0, charges.rocket - 1); saveCharges(); }
    powerActive = null;
    if (window.AudioSys) { try { AudioSys.play('rocket'); } catch(e) {} }
    if (typeof showToast === 'function') showToast('🚀 Ракета! +' + (cleared * 20) + ' очков', 'fa-solid fa-rocket');
  }

  function handleBoardPowerClick(col, row) {
    if (powerActive === 'bomb') { usePowerBombAt(col, row); renderPowerButtons(); drawBoard(); checkGameOver(); checkWin(); }
    else if (powerActive === 'firework') { usePowerFireworkAt(col, row); renderPowerButtons(); drawBoard(); checkGameOver(); checkWin(); }
    else if (powerActive === 'rocket') { usePowerRocketAt(col, row); renderPowerButtons(); drawBoard(); checkGameOver(); checkWin(); }
  }

  function startDrag(e, index) {
    if (gameOver) return;
    e.preventDefault();
    if (window.AudioSys && typeof AudioSys.resume === 'function') { try { AudioSys.resume(); } catch(err) {} }
    if (window.AudioSys) { try { AudioSys.play('swish'); } catch(e) {} }

    draggedFigureIndex = index;
    isDragging = true;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    const fig = figures[index];
    const shapeCols = fig.shape[0].length;
    const shapeRows = fig.shape.length;
    const relX = rect.width > 0 ? dragOffsetX / rect.width : 0;
    const relY = rect.height > 0 ? dragOffsetY / rect.height : 0;
    dragAnchorCol = Math.min(shapeCols - 1, Math.max(0, Math.floor(relX * shapeCols)));
    dragAnchorRow = Math.min(shapeRows - 1, Math.max(0, Math.floor(relY * shapeRows)));

    dragGhost = e.currentTarget.cloneNode(true);
    dragGhost.classList.add('drag-ghost');
    dragGhost.style.position = 'fixed';
    dragGhost.style.left = (clientX - dragOffsetX) + 'px';
    dragGhost.style.top = (clientY - dragOffsetY) + 'px';
    dragGhost.style.pointerEvents = 'none';
    dragGhost.style.zIndex = '100000';
    dragGhost.querySelectorAll('.blockblast-cell').forEach(cell => {
      cell.style.width = CELL_SIZE + 'px';
      cell.style.height = CELL_SIZE + 'px';
    });
    document.body.appendChild(dragGhost);
    e.currentTarget.style.opacity = '0.3';

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging || !dragGhost) return;
    e.preventDefault();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    dragGhost.style.left = (clientX - dragOffsetX) + 'px';
    dragGhost.style.top = (clientY - dragOffsetY) + 'px';

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        const fig = figures[draggedFigureIndex];
        const cursorCol = Math.floor((clientX - rect.left) / CELL_SIZE);
        const cursorRow = Math.floor((clientY - rect.top) / CELL_SIZE);
        const col = cursorCol - dragAnchorCol;
        const row = cursorRow - dragAnchorRow;
        previewShape = fig.shape; previewCol = col; previewRow = row;
        previewValid = canPlace(fig.shape, col, row);
      } else {
        previewShape = null; previewCol = -1; previewRow = -1;
      }
      drawBoard();
    }
  }

  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        const fig = figures[draggedFigureIndex];
        const cursorCol = Math.floor((clientX - rect.left) / CELL_SIZE);
        const cursorRow = Math.floor((clientY - rect.top) / CELL_SIZE);
        const col = cursorCol - dragAnchorCol;
        const row = cursorRow - dragAnchorRow;

        if (canPlace(fig.shape, col, row)) {
          placeFigure(fig.shape, fig.color, col, row);
          if (window.AudioSys) { try { AudioSys.play('click'); } catch(e) {} }
          drawBoard();
          const { rows, cols } = findClearLines();
          if (rows.length || cols.length) {
            flashAndClear(rows, cols, () => {
              applyClear(rows, cols);
              figures[draggedFigureIndex] = generateFigure();
              renderFigures();
              drawBoard();
              checkGameOver();
              checkWin();
            });
          } else {
            figures[draggedFigureIndex] = generateFigure();
            renderFigures();
            drawBoard();
            checkGameOver();
            checkWin();
          }
        } else {
          if (window.AudioSys) { try { AudioSys.play('error'); } catch(e) {} }
        }
      }
    }

    if (dragGhost) { dragGhost.remove(); dragGhost = null; }
    document.querySelectorAll('.blockblast-figure').forEach(el => { el.style.opacity = '1'; });
    previewShape = null; previewCol = -1; previewRow = -1;
    drawBoard();
    draggedFigureIndex = -1;
  }

  function updateScore() { if (scoreEl) scoreEl.textContent = score; }
  function updateBestScore() { if (bestScoreEl) bestScoreEl.textContent = bestScore; }

  function buildModeSelect() {
    overlay = document.createElement('div');
    overlay.id = 'blockblastOverlay';
    const modeCards = Object.keys(MODES).map(key => {
      const m = MODES[key];
      return `<button class="blockblast-mode-card" data-mode="${key}">
        <div class="blockblast-mode-name">${m.name}</div>
        <div class="blockblast-mode-desc">${m.desc}</div>
      </button>`;
    }).join('');
    overlay.innerHTML = `
      <div class="blockblast-modal blockblast-mode-select">
        <button class="blockblast-close" id="blockblastCloseBtn" aria-label="Закрыть"><i class="fa-solid fa-xmark"></i></button>
        <div class="blockblast-header">
          <div class="blockblast-logo"><i class="fa-solid fa-bolt"></i> BUZZ BLAST</div>
        </div>
        <div class="blockblast-mode-grid">${modeCards}</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('blockblastCloseBtn').addEventListener('click', close);
    overlay.querySelectorAll('.blockblast-mode-card').forEach(btn => {
      btn.addEventListener('click', () => {
        currentModeKey = btn.dataset.mode;
        overlay.remove();
        overlay = null;
        buildGameScreen();
      });
    });
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function buildGameScreen() {
    overlay = document.createElement('div');
    overlay.id = 'blockblastOverlay';
    overlay.innerHTML = `
      <div class="blockblast-modal">
        <button class="blockblast-close" id="blockblastCloseBtn" aria-label="Закрыть"><i class="fa-solid fa-xmark"></i></button>
        <div class="blockblast-header">
          <div class="blockblast-logo"><i class="fa-solid fa-bolt"></i> BUZZ BLAST</div>
          <div class="blockblast-mode-tag">${MODES[currentModeKey].name}</div>
        </div>
        <div class="blockblast-body">
          <canvas id="blockblastCanvas"></canvas>
          <div class="blockblast-side">
            <div class="blockblast-stats">
              <div class="blockblast-block">
                <div class="blockblast-label">SCORE</div>
                <div class="blockblast-value" id="blockblastScore">0</div>
              </div>
              <div class="blockblast-block">
                <div class="blockblast-label">BEST</div>
                <div class="blockblast-value" id="blockblastBest">${bestScore}</div>
              </div>
            </div>
            <div class="blockblast-figures" id="blockblastFigures"></div>
            <div class="blockblast-powers" id="blockblastPowers"></div>
            <div class="blockblast-power-legend" id="blockblastPowerLegend"></div>
            <button class="blockblast-restart" id="blockblastRestart">Заново</button>
            <button class="blockblast-restart blockblast-changemode" id="blockblastChangeMode">Сменить режим</button>
           <div class="blockblast-hint">Перетащите фигуру на поле. Для силы — нажми кнопку, затем клетку.</div>
            ${MODES[currentModeKey].mask ? '<div class="blockblast-hint blockblast-hint-wall"><i class="fa-solid fa-ban"></i> Красные клетки — стена. Линия очищается, только если в ней нет стен — собирай по центру.</div>' : ''}
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    canvas = document.getElementById('blockblastCanvas');
    ctx = canvas.getContext('2d');
    figuresContainer = document.getElementById('blockblastFigures');
    scoreEl = document.getElementById('blockblastScore');
    bestScoreEl = document.getElementById('blockblastBest');

    document.getElementById('blockblastCloseBtn').addEventListener('click', close);
    document.getElementById('blockblastRestart').addEventListener('click', resetGame);
    document.getElementById('blockblastChangeMode').addEventListener('click', () => {
      overlay.remove(); overlay = null;
      buildModeSelect();
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!powerActive) { if (powerHoverCol !== -1) { powerHoverCol = -1; powerHoverRow = -1; drawBoard(); } return; }
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const row = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      if (col < 0 || col >= GRID || row < 0 || row >= GRID) {
        if (powerHoverCol !== -1) { powerHoverCol = -1; powerHoverRow = -1; drawBoard(); }
        return;
      }
      if (col !== powerHoverCol || row !== powerHoverRow) {
        powerHoverCol = col; powerHoverRow = row;
        drawBoard();
      }
    });
    canvas.addEventListener('mouseleave', () => { powerHoverCol = -1; powerHoverRow = -1; drawBoard(); });
    canvas.addEventListener('contextmenu', (e) => {
      if (powerActive !== 'firework') return;
      e.preventDefault();
      fireworkAxis = (fireworkAxis === 'row') ? 'col' : 'row';
      drawBoard();
    });
    canvas.addEventListener('click', (e) => {
      if (!powerActive) return;
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const row = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      if (col < 0 || col >= GRID || row < 0 || row >= GRID) return;
      handleBoardPowerClick(col, row);
    });

    resetGame();
    requestAnimationFrame(() => overlay.classList.add('show'));
  }

  function open() {
    if (overlay) { close(); return; }
    if (window.AudioSys && typeof AudioSys.resume === 'function') { try { AudioSys.resume(); } catch(e) {} }
    loadCharges();
    grantDailyCharges();
    buildModeSelect();
    if (window.AudioSys) { try { AudioSys.play('click'); } catch(e) {} }
  }

  function close() {
    if (overlay) {
      overlay.classList.remove('show');
      const el = overlay;
      setTimeout(() => el.remove(), 300);
      overlay = null;
    }
    canvas = null; ctx = null; figuresContainer = null;
    scoreEl = null; bestScoreEl = null;
    draggedFigureIndex = -1;
    isDragging = false;
    previewShape = null; previewCol = -1; previewRow = -1;
    if (dragGhost) { dragGhost.remove(); dragGhost = null; }
    gameOver = false;
  }

  return { open, close };
})();

// ==========================================
// 16.7. КОРОНАЦИЯ (10+ ачивок → золотой сайт)
// ==========================================
const Coronation = (function() {
  const THRESHOLD = 10;
  const SEEN_KEY = 'buzz_coronation_seen';

  function countAch() {
    let n = 0;
    if (typeof achievements !== 'undefined') {
      for (let k in achievements) if (safeLSGet('ach_' + k, null)) n++;
    }
    return n;
  }

  function shouldActivate() {
    return countAch() >= THRESHOLD;
  }

  function activateGold() {
    if (document.body.classList.contains('coronation-active')) return;
    document.body.classList.add('coronation-active');
    // Перекрашиваем существующие фоновые частицы в золото
    if (typeof particleColor !== 'undefined') {
      particleColor = 'rgba(251, 191, 36, 0.55)';
    }
    // Золотая корона рядом с логотипом в шапке
    const logo = document.querySelector('.header-logo');
    if (logo && !logo.querySelector('.coronation-crown-icon')) {
      const crown = document.createElement('i');
      crown.className = 'fa-solid fa-crown coronation-crown-icon';
      logo.appendChild(crown);
    }
  }

  function buildThroneRoom() {
    const overlay = document.createElement('div');
    overlay.id = 'coronationOverlay';
    overlay.innerHTML = `
      <div class="coronation-stage">
        <button class="coronation-close" id="coronationClose" aria-label="Закрыть"><i class="fa-solid fa-xmark"></i></button>

        <div class="coronation-rays"></div>
        <div class="coronation-particles" id="coronationParticles"></div>

        <div class="coronation-content">
          <div class="coronation-crown-wrap">
            <i class="fa-solid fa-crown coronation-crown"></i>
          </div>
          <div class="coronation-title">КОРОНАЦИЯ</div>
          <div class="coronation-subtitle">Система признала тебя королём Buzz Rate</div>

          <div class="coronation-throne">
            <div class="throne-back"></div>
            <div class="throne-seat"></div>
            <div class="throne-arm throne-arm-left"></div>
            <div class="throne-arm throne-arm-right"></div>
            <div class="throne-base"></div>
            <div class="throne-crown"><i class="fa-solid fa-crown"></i></div>
          </div>

          <div class="coronation-stats">
            <div class="coronation-stat">
              <div class="coronation-stat-num" id="coronationAchCount">0</div>
              <div class="coronation-stat-label">ДОСТИЖЕНИЙ</div>
            </div>
            <div class="coronation-stat">
              <div class="coronation-stat-num">${THRESHOLD}+</div>
              <div class="coronation-stat-label">ПОРОГ</div>
            </div>
          </div>

          <button class="coronation-btn" id="coronationAccept">
            <i class="fa-solid fa-crown"></i> ПРИНЯТЬ КОРОНУ
          </button>
          <div class="coronation-hint">Золотой режим активирован. Кнопка «Тронный зал» появится в Досье агента.</div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    // Анимация счётчика
    const numEl = document.getElementById('coronationAchCount');
    const target = countAch();
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const tick = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(tick); }
      if (numEl) numEl.textContent = cur;
    }, 40);

    // Частицы золота
    spawnParticles();

    // Звук — фанфары (мажорный аккорд + нарастающий)
    playFanfare();

    // Кнопки
    document.getElementById('coronationClose').addEventListener('click', close);
    document.getElementById('coronationAccept').addEventListener('click', () => {
      if (typeof unlockAchievement !== 'undefined') unlockAchievement('coronation');
      safeLSSet('buzz_coronation_accepted', 'true');
      activateGold();
      close();
    });
  }

  function spawnParticles() {
    const container = document.getElementById('coronationParticles');
    if (!container) return;
    const N = 30;
    for (let i = 0; i < N; i++) {
      const p = document.createElement('div');
      p.className = 'coronation-particle';
      const x = Math.random() * 100;
      const delay = Math.random() * 4;
      const dur = 4 + Math.random() * 3;
      const size = 4 + Math.random() * 6;
      p.style.cssText = `
        left: ${x}%;
        width: ${size}px; height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${dur}s;
      `;
      container.appendChild(p);
    }
  }

  function playFanfare() {
    if (!window.AudioSys) return;
    try {
      const ctx = (window.AudioSys && AudioSys.getCtx) ? AudioSys.getCtx() : null;
      if (ctx) {
        // Мажорное трезвучие C-E-G-C
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.connect(g); g.connect(ctx.destination);
          osc.type = 'triangle';
          const t0 = ctx.currentTime + i * 0.12;
          osc.frequency.setValueAtTime(freq, t0);
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.18, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.5);
          osc.start(t0); osc.stop(t0 + 1.5);
        });
      }
    } catch(e) {}
  }

  function open() {
    if (document.getElementById('coronationOverlay')) return;
    buildThroneRoom();
  }

  function close() {
    const overlay = document.getElementById('coronationOverlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 600);
  }

  // Автозапуск при достижении порога (один раз)
  function checkAutoStart() {
    if (!shouldActivate()) return;
    // НЕ активируем золотой режим автоматически — только если юзер сам принял корону
    // (иначе body filter убивает производительность на слабых устройствах)
    if (safeLSGet('buzz_coronation_accepted', null) === 'true') {
      activateGold();
    }
    // Показываем тронный зал один раз
    if (!safeLSGet(SEEN_KEY, null)) {
      safeLSSet(SEEN_KEY, 'true');
      setTimeout(open, 1500);
    }
  }

  // Кнопка в Досье агента — добавляется при каждом открытии профиля
  function injectProfileButton() {
    const profContent = document.getElementById('profileContent');
    if (!profContent) return;
    if (profContent.querySelector('.coronation-enter-btn')) return;
    if (!shouldActivate()) return;

    const btn = document.createElement('button');
    btn.className = 'coronation-enter-btn';
    btn.innerHTML = '<i class="fa-solid fa-crown"></i> ВОЙТИ В ТРОННЫЙ ЗАЛ';
    btn.addEventListener('click', open);
    profContent.appendChild(btn);
  }

    // Следим за открытием Досье через MutationObserver
  const profModal = document.getElementById('profileModal');
  if (profModal) {
    const observer = new MutationObserver(() => {
      if (profModal.classList.contains('open')) {
        setTimeout(injectProfileButton, 100);
      }
    });
    observer.observe(profModal, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAutoStart);
  } else {
    checkAutoStart();
  }

  return { open, close, isActive: () => document.body.classList.contains('coronation-active') };
})();
// ==========================================
// 16.8. ПРОПОВЕДНИК V.2 (реже, но злее)
// ==========================================
const Preacher = (function() {
  const VISIT_KEY = 'buzzrate_visits';
  const LAST_CHECK_DATE_KEY = 'buzz_preacher_last_check_date';
  const SPAWN_CHANCE = 0.25;
  const MIN_DELAY_MS = 5000;
  const MAX_DELAY_MS = 20000;

  const LECTURE_LINES = [
    'Всё началось три года назад, когда наш основатель работал ночным охранником на складе энергетиков.',
    'Однажды, в двенадцатый час смены, он открыл банку, которую никто не заказывал — партия без этикетки.',
    'Он выпил её залпом. И увидел свет. Настоящий, зелёно-жёлтый, пульсирующий свет истины.',
    'С этого момента он перестал спать. Не потому что не мог — а потому что больше не видел смысла.',
    'Он начал записывать откровения на обёртках от банок. Их набралось семь тысяч.',
    'Мы, его первые последователи, нашли эти обёртки на барахолке и не смогли остановиться, читая их.',
    'Сегодня Buzz Rate Witness — это не секта. Это семья людей, которые больше не боятся кофеина.',
    'Мы не просим денег. Мы просим только веры. Ну и подписки на телеграм-канал, но это мелочи.',
    'Основатель обещал вернуться, когда откроется банка без этикетки номер два. Мы ждём.',
    'Вот и всё. Теперь вы тоже часть этой истории. Обратного пути, к сожалению, нет.'
  ];

  function getVisitCount() {
    try {
      const v = safeLSGetJSON(VISIT_KEY, []);
      return v.length;
    } catch(e) { return 0; }
  }

  function shouldShow() {
    const visits = getVisitCount();
    if (visits < 1) return false;

    const today = new Date().toDateString();
    // Проверяем ровно один раз в день, независимо от результата броска —
    // так шанс реально "разыгрывается" один раз в сутки, а не на каждый визит.
    if (safeLSGet(LAST_CHECK_DATE_KEY, null) === today) return false;
    safeLSSet(LAST_CHECK_DATE_KEY, today);

    return Math.random() < SPAWN_CHANCE;
  }

  function markShown() {
    // Дата проверки уже сохранена в shouldShow(); отдельно отмечать нечего.
  }

  function openGreeting() {
    if (document.getElementById('preacherOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'preacherOverlay';
    overlay.innerHTML = `
      <div class="preacher-modal">
        <div class="preacher-icon"><i class="fa-solid fa-handshake-angle"></i></div>
        <div class="preacher-title">Здравствуйте!</div>
        <div class="preacher-text" id="preacherText">
          Есть минутка поговорить о <strong>Buzz Rate Witness</strong>?
          <br><br>
          Это не займёт много времени. Обещаю.
          <br>
          <span class="preacher-small">(нет, это не Амвэй. это не пирамида. точно.)</span>
        </div>
        <div class="preacher-actions">
          <button class="preacher-btn preacher-yes" id="preacherYes">
            <i class="fa-solid fa-check"></i> Да, расскажите
          </button>
          <button class="preacher-btn preacher-no" id="preacherNo">
            <i class="fa-solid fa-xmark"></i> Нет, спасибо
          </button>
        </div>
        <div class="preacher-counter" id="preacherCounter">Отказов: 0 / 5</div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

        if (window.AudioSys) { try { AudioSys.play('open'); } catch(e) {} }

    let totalDodges = 0;
    const PHASE1_MAX = 5;
    const PHASE2_MAX = 7;
    let phase = 1;
    let phase2Moves = 0;
    const noBtn = document.getElementById('preacherNo');
    const yesBtn = document.getElementById('preacherYes');
    const counter = document.getElementById('preacherCounter');
    const modal = overlay.querySelector('.preacher-modal');
    const text = document.getElementById('preacherText');

    // Делаем кнопку "Нет" позиционированной абсолютно
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000000';
    noBtn.style.transition = 'left 0.2s ease, top 0.2s ease, transform 0.15s ease';
    noBtn.style.transform = 'none';
    const initial = noBtn.getBoundingClientRect();
    // Сдвигаем от исходной позиции вправо, чтобы гарантированно не перекрывать "Да"
    let startLeft = initial.left + 90;
    const maxStartLeft = window.innerWidth - noBtn.offsetWidth - 20;
    if (startLeft > maxStartLeft) startLeft = maxStartLeft;
    noBtn.style.left = startLeft + 'px';
    noBtn.style.top = initial.top + 'px';

    // Функция получения безопасной позиции (не залезает на yesBtn)
    function getSafePosition() {
      const yesRect = yesBtn.getBoundingClientRect();
      const padding = 20;
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;
      const maxX = Math.max(0, window.innerWidth - btnWidth - padding);
      const maxY = Math.max(0, window.innerHeight - btnHeight - padding);

      const dangerX1 = yesRect.left - 80;
      const dangerX2 = yesRect.right + 80;
      const dangerY1 = yesRect.top - 80;
      const dangerY2 = yesRect.bottom + 80;

      let attempts = 0;
      let x, y;
      do {
        x = padding + Math.random() * maxX;
        y = padding + Math.random() * maxY;
        attempts++;
        if (attempts > 100) break;
      } while (x + btnWidth > dangerX1 && x < dangerX2 && y + btnHeight > dangerY1 && y < dangerY2);

      return { x, y };
    }

    const moveNoBtn = () => {
      if (phase === 3) return;
      totalDodges++;

      if (phase === 1) {
        counter.textContent = 'Отказов: ' + totalDodges + ' / ' + PHASE1_MAX;

        if (totalDodges >= PHASE1_MAX) {
          phase = 2;
          phase2Moves = 0;
          text.innerHTML = `
            <strong style="color:#fbbf24">Вы уверены?</strong>
            <br><br>
            Я чувствую, что вы колеблетесь. Это нормально.
            <br><br>
            Подумайте ещё немного. Я подожду.
            <br>
            <span class="preacher-small">(у меня вечность. а у вас?)</span>
          `;
        }

        const { x, y } = getSafePosition();
        noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.transform = 'none';
      } else {
        phase2Moves++;
        counter.textContent = 'Кнопка сопротивляется... ' + phase2Moves + ' / ' + PHASE2_MAX;

        if (phase2Moves >= PHASE2_MAX) {
          noBtn.innerHTML = '<i class="fa-solid fa-flag"></i> Ладно, отстану';
          noBtn.classList.add('preacher-giveup');
          noBtn.style.transform = 'none';
          noBtn.addEventListener('click', () => {
            showFinalMessage('Хорошо. Я ухожу. Но я вернусь.', 2500);
          }, { once: true });
          phase = 3;
          return;
        }

        const { x, y } = getSafePosition();
        noBtn.style.transition = 'left 0.12s ease-out, top 0.12s ease-out';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;
      }
    };

    // Убран дублирующий 'pointerenter' — он срабатывал одновременно
    // с 'mouseenter' на каждое наведение мышью и удваивал счётчик побегов,
    // из-за чего счётчик "убегал вперёд" настоящего количества побегов кнопки.
    noBtn.addEventListener('mouseenter', moveNoBtn);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveNoBtn();
    }, { passive: false });

    yesBtn.addEventListener('click', startLecture);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        modal.classList.add('preacher-shake');
        setTimeout(() => modal.classList.remove('preacher-shake'), 400);
      }
    });
  }

  function startLecture() {
    const overlay = document.getElementById('preacherOverlay');
    if (overlay) overlay.remove();

    const lec = document.createElement('div');
    lec.id = 'preacherLecture';
    lec.innerHTML = `
      <div class="preacher-modal preacher-modal-lec">
        <div class="preacher-timer" id="preacherTimer">30</div>
        <div class="preacher-icon"><i class="fa-solid fa-book-open-reader"></i></div>
        <div class="preacher-title">Лекция началась</div>
        <div class="preacher-lecture-text" id="preacherLectureText"></div>
        <div class="preacher-progress">
          <div class="preacher-progress-fill" id="preacherProgress"></div>
        </div>
        <button class="preacher-btn preacher-skip" id="preacherSkip">
          <i class="fa-solid fa-forward"></i> Пропустить ( Achievement не дадим )
        </button>
      </div>
    `;
    document.body.appendChild(lec);
    requestAnimationFrame(() => lec.classList.add('show'));

    const textEl = document.getElementById('preacherLectureText');
    const timerEl = document.getElementById('preacherTimer');
    const progressEl = document.getElementById('preacherProgress');
    let lineIdx = 0;
    let secs = 60;

    function nextLine() {
      if (lineIdx >= LECTURE_LINES.length) return;
      const line = document.createElement('div');
      line.className = 'preacher-lecture-line';
      line.textContent = '— ' + LECTURE_LINES[lineIdx];
      textEl.appendChild(line);
      textEl.scrollTop = textEl.scrollHeight;
      lineIdx++;
    }

    nextLine();
    const lineInterval = setInterval(() => {
      if (lineIdx < LECTURE_LINES.length) nextLine();
      else clearInterval(lineInterval);
    }, 3000);

    const timerInterval = setInterval(() => {
      secs--;
      if (timerEl) timerEl.textContent = secs;
      if (progressEl) progressEl.style.width = ((60 - secs) / 60 * 100) + '%';
      if (secs <= 0) {
        clearInterval(timerInterval);
        clearInterval(lineInterval);
        showFinalMessage('Спасибо за внимание. Вы выдержали.', 3000);
      }
    }, 1000);

    document.getElementById('preacherSkip').addEventListener('click', () => {
      clearInterval(timerInterval);
      clearInterval(lineInterval);
      showFinalMessage('Жаль. Я ещё вернусь.', 2000);
    });
  }

  function showFinalMessage(text, duration) {
    const overlay = document.getElementById('preacherOverlay');
    const lec = document.getElementById('preacherLecture');
    if (overlay) overlay.remove();
    if (lec) lec.remove();

    const final = document.createElement('div');
    final.id = 'preacherFinal';
    final.innerHTML = `
      <div class="preacher-modal preacher-modal-final">
        <div class="preacher-icon"><i class="fa-solid fa-door-open"></i></div>
        <div class="preacher-title">${text}</div>
        <button class="preacher-btn preacher-yes" id="preacherFinalClose">
          <i class="fa-solid fa-check"></i> Понятно
        </button>
      </div>
    `;
    document.body.appendChild(final);
    requestAnimationFrame(() => final.classList.add('show'));

    document.getElementById('preacherFinalClose').addEventListener('click', () => {
      final.classList.remove('show');
      setTimeout(() => final.remove(), 400);
    });

    setTimeout(() => {
      if (final.parentNode) {
        final.classList.remove('show');
        setTimeout(() => final.remove(), 400);
      }
    }, duration + 1000);
  }

  function checkAutoStart() {
    const delay = MIN_DELAY_MS + Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS));
    setTimeout(() => {
      if (!shouldShow()) return;
      markShown();
      openGreeting();
    }, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAutoStart);
  } else {
    checkAutoStart();
  }

  return { openGreeting };
})();
// ==========================================
// 16.9. ТУДА-СЮДА (мини-игра-лабиринт)
// ==========================================
const MazeGame = (function() {
  const GRID = 15;
  const CELL = 28;
  let canvas = null, ctx = null;
  let overlay = null;
  let maze = [];
  let player = { x: 1, y: 1 };
  let goal = { x: GRID - 2, y: GRID - 2 };
  let movingWalls = [];
  let timeLeft = 60;
  let timerInterval = null;
  let running = false;
  let keyHandler = null;
  let level = 1;
  let lastTick = 0;

  function generateMaze() {
    // Инициализация — всё стены
    maze = Array.from({length: GRID}, () => Array(GRID).fill(1));

    // Рекурсивный backtracker
    function carve(x, y) {
      maze[y][x] = 0;
      const dirs = [[0,-2],[2,0],[0,2],[-2,0]];
      // Перемешать
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;
        if (nx > 0 && nx < GRID - 1 && ny > 0 && ny < GRID - 1 && maze[ny][nx] === 1) {
          maze[y + dy/2][x + dx/2] = 0;
          carve(nx, ny);
        }
      }
    }
    carve(1, 1);

    // Убираем несколько стен, чтобы сделать лабиринт менее жестким
    for (let i = 0; i < 15; i++) {
      const x = 1 + Math.floor(Math.random() * (GRID - 2));
      const y = 1 + Math.floor(Math.random() * (GRID - 2));
      if (maze[y][x] === 1) maze[y][x] = 0;
    }

    // Гарантируем старт и финиш
    maze[1][1] = 0;
    maze[GRID - 2][GRID - 2] = 0;
  }

  function spawnMovingWalls() {
    movingWalls = [];
    const count = 3 + level * 2;
    for (let i = 0; i < count; i++) {
      // Находим пустую клетку
      let x, y;
      do {
        x = 1 + Math.floor(Math.random() * (GRID - 2));
        y = 1 + Math.floor(Math.random() * (GRID - 2));
      } while (maze[y][x] !== 0 || (x === 1 && y === 1) || (x === GRID - 2 && y === GRID - 2));

      // Направление движения
      const horizontal = Math.random() < 0.5;
      const dir = Math.random() < 0.5 ? 1 : -1;
      movingWalls.push({ x, y, dx: horizontal ? dir : 0, dy: horizontal ? 0 : dir });
    }
  }

  function updateMovingWalls() {
    for (const w of movingWalls) {
      const nx = w.x + w.dx;
      const ny = w.y + w.dy;
      // Если впереди стена — разворот
      if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID || maze[ny][nx] === 1) {
        w.dx = -w.dx; w.dy = -w.dy;
      } else {
        w.x = nx; w.y = ny;
      }
      // Столкновение с игроком
      if (w.x === player.x && w.y === player.y) {
        gameOver('Тебя раздавили!');
        return;
      }
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Стены и пути
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const px = x * CELL, py = y * CELL;
        if (maze[y][x] === 1) {
          // Стена
          ctx.fillStyle = '#1a1a2e';
          ctx.fillRect(px, py, CELL, CELL);
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, CELL - 1, CELL - 1);
        } else {
          // Путь
          ctx.fillStyle = '#0e0e16';
          ctx.fillRect(px, py, CELL, CELL);
        }
      }
    }

    // Финиш
    const gx = goal.x * CELL, gy = goal.y * CELL;
    ctx.fillStyle = '#00e676';
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 15;
    ctx.fillRect(gx + 6, gy + 6, CELL - 12, CELL - 12);
    ctx.shadowBlur = 0;
    // Внутри — символ 🏁
    ctx.fillStyle = '#0a0a0f';
    ctx.font = 'bold 14px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', gx + CELL/2, gy + CELL/2);

    // Движущиеся стены
    for (const w of movingWalls) {
      const wx = w.x * CELL, wy = w.y * CELL;
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fillRect(wx + 4, wy + 4, CELL - 8, CELL - 8);
      ctx.shadowBlur = 0;
    }

    // Игрок
    const px = player.x * CELL, py = player.y * CELL;
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(px + CELL/2, py + CELL/2, CELL/2 - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function move(dx, dy) {
    if (!running) return;
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) return;
    if (maze[ny][nx] === 1) return; // стена
    player.x = nx; player.y = ny;

    // Столкновение с движущейся стеной
    for (const w of movingWalls) {
      if (w.x === player.x && w.y === player.y) {
        gameOver('Тебя раздавили!');
        return;
      }
    }

    // Финиш?
    if (player.x === goal.x && player.y === goal.y) {
      win();
      return;
    }
    draw();
  }

  function tick(ts) {
    if (!running) return;
    // Движущиеся стены двигаются каждые 400мс (уровень 1), быстрее на след. уровнях
    const interval = Math.max(150, 500 - level * 80);
    if (ts - lastTick > interval) {
      lastTick = ts;
      updateMovingWalls();
      draw();
    }
    requestAnimationFrame(tick);
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      const el = document.getElementById('mazeTimer');
      if (el) el.textContent = timeLeft;
      if (timeLeft <= 0) {
        gameOver('Время вышло!');
      }
    }, 1000);
  }

  function win() {
    running = false;
    clearInterval(timerInterval);
    if (window.AudioSys) { try { AudioSys.play('achievement'); } catch(e) {} }
    if (typeof unlockAchievement !== 'undefined') unlockAchievement('maze_runner');
    showEndScreen('ПОБЕДА!', 'Ты выбрался за ' + (60 - timeLeft) + ' сек', '#00e676', true);
  }

  function gameOver(reason) {
    running = false;
    clearInterval(timerInterval);
    if (window.AudioSys) { try { AudioSys.play('error'); } catch(e) {} }
    showEndScreen('ПОРАЖЕНИЕ', reason, '#ef4444', false);
  }

  function showEndScreen(title, sub, color, isWin) {
    const endEl = document.getElementById('mazeEnd');
    if (!endEl) return;
    endEl.innerHTML = `
      <div class="maze-end-title" style="color:${color}">${title}</div>
      <div class="maze-end-sub">${sub}</div>
      <div class="maze-end-actions">
        <button class="maze-btn maze-btn-primary" id="mazeRetry">
          <i class="fa-solid fa-rotate-right"></i> Ещё раз
        </button>
        <button class="maze-btn" id="mazeClose2">
          <i class="fa-solid fa-xmark"></i> Выйти
        </button>
      </div>
    `;
    endEl.style.display = 'flex';
    document.getElementById('mazeRetry').addEventListener('click', () => {
      endEl.style.display = 'none';
      startGame();
    });
    document.getElementById('mazeClose2').addEventListener('click', close);
  }

  function startGame() {
    generateMaze();
    spawnMovingWalls();
    player = { x: 1, y: 1 };
    goal = { x: GRID - 2, y: GRID - 2 };
    timeLeft = 60;
    running = true;
    lastTick = performance.now();
    const timerEl = document.getElementById('mazeTimer');
    if (timerEl) timerEl.textContent = timeLeft;
    const lvlEl = document.getElementById('mazeLevel');
    if (lvlEl) lvlEl.textContent = level;
    draw();
    startTimer();
    requestAnimationFrame(tick);
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'mazeOverlay';
    overlay.innerHTML = `
      <div class="maze-modal">
        <button class="maze-close" id="mazeClose" aria-label="Закрыть"><i class="fa-solid fa-xmark"></i></button>
        <div class="maze-header">
          <div class="maze-logo"><i class="fa-solid fa-route"></i> ТУДА-СЮДА</div>
        </div>
        <div class="maze-hud">
          <div class="maze-hud-block">
            <div class="maze-hud-label">ВРЕМЯ</div>
            <div class="maze-hud-value" id="mazeTimer">60</div>
          </div>
          <div class="maze-hud-block">
            <div class="maze-hud-label">УРОВЕНЬ</div>
            <div class="maze-hud-value" id="mazeLevel">1</div>
          </div>
          <div class="maze-hud-block">
            <div class="maze-hud-label">ЦЕЛЬ</div>
            <div class="maze-hud-value"><i class="fa-solid fa-flag-checkered"></i></div>
          </div>
        </div>
        <canvas id="mazeCanvas" width="${GRID * CELL}" height="${GRID * CELL}"></canvas>
        <div class="maze-controls">
          <button class="maze-ctrl" data-maze="up"><i class="fa-solid fa-arrow-up"></i></button>
          <div class="maze-ctrl-row">
            <button class="maze-ctrl" data-maze="left"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="maze-ctrl" data-maze="down"><i class="fa-solid fa-arrow-down"></i></button>
            <button class="maze-ctrl" data-maze="right"><i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        <div class="maze-hint">WASD или стрелки. Дойди до <i class="fa-solid fa-flag-checkered"></i> за 60 сек.</div>
        <div class="maze-end" id="mazeEnd" style="display:none;"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    canvas = document.getElementById('mazeCanvas');
    ctx = canvas.getContext('2d');
    requestAnimationFrame(() => overlay.classList.add('show'));

    document.getElementById('mazeClose').addEventListener('click', close);
    overlay.querySelectorAll('[data-maze]').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.getAttribute('data-maze');
        if (a === 'up') move(0, -1);
        else if (a === 'down') move(0, 1);
        else if (a === 'left') move(-1, 0);
        else if (a === 'right') move(1, 0);
      });
    });
  }

  function open() {
    if (overlay) { close(); return; }
    buildOverlay();
    level = 1;
    startGame();
    keyHandler = function(e) {
      if (!running) return;
      switch (e.code) {
        case 'ArrowUp': case 'KeyW': move(0, -1); e.preventDefault(); break;
        case 'ArrowDown': case 'KeyS': move(0, 1); e.preventDefault(); break;
        case 'ArrowLeft': case 'KeyA': move(-1, 0); e.preventDefault(); break;
        case 'ArrowRight': case 'KeyD': move(1, 0); e.preventDefault(); break;
        case 'Escape': close(); e.preventDefault(); break;
      }
    };
    document.addEventListener('keydown', keyHandler);
    if (window.AudioSys) { try { AudioSys.play('click'); } catch(e) {} }
  }

  function close() {
    running = false;
    clearInterval(timerInterval);
    if (keyHandler) {
      document.removeEventListener('keydown', keyHandler);
      keyHandler = null;
    }
    if (overlay) {
      overlay.classList.remove('show');
      const el = overlay;
      setTimeout(() => el.remove(), 300);
      overlay = null;
    }
    canvas = null; ctx = null;
  }

  return { open, close };
})();
// ==========================================
// 16. ТЕРМИНАЛ И ДОСЬЕ АГЕНТА V.6.2 (ФИНАЛ)
// ==========================================
(function() {
  function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  const termOverlay = document.getElementById('terminalOverlay');
  const termOutput = document.getElementById('terminalOutput');
  const termInput = document.getElementById('terminalInput');
  const profModal = document.getElementById('profileModal');
  const profContent = document.getElementById('profileContent');

  let secretSeq = 0;
  let isRootAccess = false; 
  let godModeActive = false; 
  let realMaxCaff = 0; 
  let resetPending = false; 

  const RANKS = [
    { name: 'Новичок', cls: 'rank-newbie', min: 0, desc: 'Только зашёл на сайт. Всё ещё впереди.' },
    { name: 'Стажер', cls: 'rank-intern', min: 20, desc: 'Освоился с карточками и фильтрами.' },
    { name: 'Опытный агент', cls: 'rank-agent', min: 50, desc: 'Изучил сайт вдоль и поперёк.' },
    { name: 'Кофеиновый маньяк', cls: 'rank-maniac', min: 80, desc: 'Кофеин в крови больше не пугает.' },
    { name: 'Легенда Базз Рейта', cls: 'rank-legend', min: 120, desc: 'Максимальный уровень прогресса по очкам.' }
  ];
  function buildRankHistoryHtml(score) {
    let items = RANKS.filter(r => score >= r.min).map(r =>
      `<div class="rank-history-item"><span class="${r.cls}">${r.name}</span><p>${r.desc}</p></div>`
    ).join('');
    if (safeLSGet('ach_coronation', null)) {
      items += `<div class="rank-history-item"><span class="rank-royal">Почётный гость Buzz Rate</span><p>Собрал 10+ достижений и принял корону.</p></div>`;
    }
    return items;
  }

  const HELL_BRAND_KEYS = Object.keys(bNames);
  const hellCart = new Set();
  const hellPurchasePhrases = {
    monster: 'Классика. Банк одобряет, печень — нет.',
    redbull: 'Крылья не прилагаются, но энергия сойдёт.',
    hell: 'Прямая доставка из преисподней, без пересадок.',
    burn: 'Вишнёвый привкус без единой вишни. Как обычно.',
    battery: 'Финский холод в жидком виде.',
    nonstop: 'Сахара как в десерте, спать не будешь всё равно.',
    rockstar: 'Плацебо-эффект работоспособности включён.',
    c4: 'Для тех, кто путает энергетик со спортпитом.'
  };

  function buildHellShopHtml(brandArg) {
    const phrase = hellPurchasePhrases[brandArg] || 'Принято.';
    const remaining = HELL_BRAND_KEYS.filter(k => !hellCart.has(k));
    let btns = remaining.map(k => `<button class="hell-shop-btn" data-brand="${k}">${bNames[k]}</button>`).join('');
    btns += `<button class="hell-shop-pay-btn">Оплатить (${hellCart.size})</button>`;
    const label = remaining.length ? 'Добавить ещё или оплатить:' : 'Ну куда тебе столько? Оплачивай.';
    return `<div><span style="color:#fbbf24;">${bNames[brandArg]}:</span> <em>${phrase}</em></div>
      <div class="hell-shop-box">
        <div class="hell-shop-label">${label}</div>
        <div class="hell-shop-btns">${btns}</div>
      </div>`;
  }

  function finalizeHellPurchase() {
    if (hellCart.size === 0) return;
    termOutput.innerHTML += `<div style="color:#ff6a00;">📦 ПОКУПКА ОФОРМЛЕНА (${hellCart.size} шт.)</div><div style="color:#888;">Бля, и куда мне её доставить?</div><div style="color:#7000FF;">Статус: В пути (вечность)</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;
    if (typeof unlockAchievement !== 'undefined') unlockAchievement('hell_package');
    hellCart.clear();
    window._atmFound = false;
  }

  function attachTerminalListener() {
    const nicknameEl = document.querySelector('.correct-name');
    if (nicknameEl) {
     nicknameEl.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        termOverlay.classList.add('active');
        lockScroll();
        if (typeof AudioSys !== 'undefined') AudioSys.play('open');
        if (typeof unlockAchievement !== 'undefined') unlockAchievement('hacker');
        setTimeout(() => termInput.focus(), 600);
      });
    } else {
      setTimeout(attachTerminalListener, 150);
    }
  }
  attachTerminalListener();

  function closeTerm() { 
    termOverlay.classList.remove('active'); 
    unlockScroll(); 
    secretSeq = 0; 
    isRootAccess = false; 
    godModeActive = false;
    resetPending = false;
  }
  document.getElementById('closeTerminal').addEventListener('click', closeTerm);

  function closeProf() { profModal.classList.remove('open'); unlockScroll(); }
  document.getElementById('closeProfile').addEventListener('click', closeProf);
  profModal.addEventListener('click', e => { if(e.target === profModal) closeProf(); });
  document.addEventListener('keydown', e => { 
    if(e.key === 'Escape' && profModal.classList.contains('open')) closeProf(); 
    if(e.key === 'Escape' && termOverlay.classList.contains('active')) closeTerm();
  });

  termInput.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = '';
    
    termOutput.innerHTML += `<div style="color:var(--accent);">> ${escHtml(cmd)}</div>`;
    
    let response = '';
    const args = cmd.split(' ');
    const command = args[0];

    // === 1. СИСТЕМА СБРОСА (Y/N) ===
    if (resetPending) {
      if (command === 'y' || command === 'yes') {
        resetPending = false;
        response = `Очистка базы данных...<br><span style="color:#00ff41;">[УСПЕШНО]</span><br>Статус: 0<br>Вы свободны. До свидания.`;
        setTimeout(() => { try { localStorage.clear(); } catch(e) {} location.reload(); }, 2000);
      } 
      else if (command === 'n' || command === 'no') {
        resetPending = false;
        response = `Операция отменена.<br><span style="color:#fbbf24;">Мы всегда вам рады. Приходите еще.</span>`;
      } 
      else {
        response = `<span style="color:#ff3b5c;">ОШИБКА: Неверный ввод. Введите Y или N.</span>`;
      }
    }

    // === 2. СКРЫТЫЙ ПАРОЛЬ: my -> name -> v0x ===
    else if (command === 'my' && secretSeq === 0) { secretSeq++; response = "..."; }
    else if (command === 'name' && secretSeq === 1) { secretSeq++; response = "..?"; }
    else if (command === 'v0x' && secretSeq === 2) {
      secretSeq = 0; isRootAccess = true;
      response = `<span style="color:#c084fc;">ПАРОЛЬ ПРИНЯТ. УРОВЕНЬ ДОПУСКА: ROOT.</span><br>Выберите действие:<br>  <span style="color:#fbbf24;">1</span> - Выдать секретное достижение<br>  <span style="color:#fbbf24;">2</span> - Вкл/Выкл РЕЖИМ БОГА<br>  <span style="color:#fbbf24;">3</span> - Компенсация за отсутствие телефона`;
    }
    else if (secretSeq > 0 && !isRootAccess && command !== 'my' && command !== 'name' && command !== 'v0x') { secretSeq = 0; }

    // === 3. ДЕЙСТВИЯ ПОСЛЕ ПАРОЛЯ ===
    else if (isRootAccess && command === '1') {
      unlockAchievement('godmode');
      response = `<span style="color:#fbbf24;">Достижение "Режим Бога" разблокировано в системе.</span>`;
    }
    else if (isRootAccess && command === '3') {
      unlockAchievement('mobile');
      unlockAchievement('phone_hacker');
      response = `<span style="color:#fbbf24;">Мобильные достижения разблокированы вручную. Телефон системе больше не нужен.</span>`;
    }
    else if (isRootAccess && command === '2') {
      if (!godModeActive) {
        godModeActive = true;
        window._buzzGodMode = true;
        realMaxCaff = parseInt(safeLSGet('buzz_max_caffeine', 0));
        response = `<span style="color:#c084fc;">ИНИЦИАЛИЗАЦИЯ РЕЖИМА БОГА...</span><br>Ограничения сняты. Рекорд кофеина: 9999 мг.<br>Способности Buzz Blast теперь бесконечны.<br>Введите "2" еще раз для деактивации.`;
        safeLSSet('buzz_max_caffeine', '9999');
        for (let key in achievements) { safeLSSet('ach_' + key, 'true'); }
        if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
      } else {
        godModeActive = false;
        window._buzzGodMode = false;
        response = `<span style="color:#888;">РЕЖИМ БОГА ДЕАКТИВИРОВАН.</span><br>Реальные данные восстановлены.`;
        safeLSSet('buzz_max_caffeine', realMaxCaff);
        if (typeof AudioSys !== 'undefined') AudioSys.play('click');
      }
    }

    // === 4. КОМАНДА СБРОСА ===
    else if (command === 'reset') {
      resetPending = true;
      response = `<span style="color:#ff3b5c; font-weight:bold;">- ПРЕДУПРЕЖДЕНИЕ - ОШИБКА -</span><br>Вы уверены? Все ваши данные будут стерты навсегда.<br>Если да, то теперь вы свободны. До свидания.<br><br>Введите <span style="color:#fbbf24;">Y</span> для подтверждения или <span style="color:#fbbf24;">N</span> для отмены.`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }

    // === 5. ОСТАЛЬНЫЕ КОМАНДЫ ===
    else if (command === 'help') {
      response = `Доступные команды:<br>
      <span style="color:#fbbf24;">help</span> - Список команд<br>
      <span style="color:#fbbf24;">ls</span> - Объекты в базе<br>
      <span style="color:#fbbf24;">scan [марка]</span> - Сканирование базы<br>
      <span style="color:#fbbf24;">analyze [марка]</span> - Детальный анализ состава<br>
      <span style="color:#fbbf24;">track [марка]</span> - Найти магазин на карте<br>
      <span style="color:#fbbf24;">hack [марка]</span> - Взлом рецептуры<br>
      <span style="color:#fbbf24;">buy [напиток]</span> - Попытка покупки<br>
      <span style="color:#fbbf24;">whoami</span> - Информация об агенте<br>
      <span style="color:#fbbf24;">whois chief</span> - Досье на шефа<br>
      <span style="color:#fbbf24;">date</span> - Время сервера<br>
      <span style="color:#fbbf24;">coffee</span> - Рандомный напиток<br>
      <span style="color:#fbbf24;">sudo drink</span> - Попытка апгрейда<br>
      <span style="color:#fbbf24;">cat classified.txt</span> - Секретный файл<br>
      <span style="color:#fbbf24;">top secret</span> - Расшифровать данные<br>
      <span style="color:#fbbf24;">ping</span> - Пинговать Сервер<br>
      <span style="color:#ff3b5c;">reset</span> - СБРОС ДАННЫХ (ОПАСНО)<br>
      <span style="color:#fbbf24;">status</span> - Досье агента<br>
      <span style="color:#fbbf24;">clear</span> - Очистить экран<br>
      <span style="color:#fbbf24;">exit</span> - Отключиться<br>
      <span style="color:#fbbf24;">rumors</span> - Слухи дня (туманно, без спойлеров)`;
    } 
    else if (command === 'analyze') {
      const brand = args[1];
      if (!brand) { response = `<span style="color:#ff3b5c;">ОШИБКА: Укажите марку (пример: analyze hell).</span>`; }
      else {
        const target = drinks.find(d => d.key === brand);
        if (!target) { response = `<span style="color:#ff3b5c;">ОШИБКА: База данных не содержит марку "${escHtml(brand)}".</span>`; }
        else {
          response = `АНАЛИЗ ОБЪЕКТА: <span style="color:${bColors[brand] || '#fff'}; font-weight:bold;">${target.brand}</span><br>` +
          `-----------------------------------<br>` +
          `Объем:       ${target.flavor}<br>` +
          `Кофеин:      <span style="color:#00e5ff;">${target.caffeine}</span><br>` +
          `Сахар:       <span style="color:#ff4081;">${target.sugar}</span><br>` +
          `Калории:     <span style="color:#ffab00;">${target.cal}</span><br>` +
          `Кислотность: <span style="color:#b388ff;">${target.ph}</span> pH<br>` +
          `-----------------------------------<br>` +
          `<span style="color:#888;">Статус ядра: Стабильно.</span>`;
        }
      }
    }
    else if (command === 'whois' && args[1] === 'chief') {
      response = `ЗАПРОС К ЦЕНТРАЛЬНОЙ БАЗЕ ДАННЫХ...<br>` +
      `-----------------------------------<br>` +
      `Позывной:     <span style="color:#fbbf24;">Varna 23 live</span><br>` +
      `Локация:      Варна, Болгария [ЗАСЕКРЕЧЕНО]<br>` +
      `Специализация: Дегустация и критика синтетических стимуляторов<br>` +
      `Угроза:       <span style="color:#ff3b5c;">ВЫСОКАЯ</span> (для печени противника)<br>` +
      `Статус:       Ожидает поставку...<br>` +
      `-----------------------------------<br>` +
      `<span style="color:#888;">[Конец файла]</span>`;
    }
    else if (command === 'hack') {
      const brand = args[1];
      const secrets = {
        monster: "Слезы разработчиков Red Bull и экстракт таурина.",
        hell: "Чистое зло, экстракт перца чили и гордость Венгрии.",
        redbull: "Вода, сахар, кофеин и маркетинговый бюджет в 10 миллиардов.",
        burn: "Подозрительный сироп 'Вишня', который не содержит настоящей вишни.",
        battery: "Финский фокус-покус: дешевый кофеин в дорогой банке.",
        c4: "Сыворотка для качков, замаскированная под энергетик."
      };
      if (!brand || !secrets[brand]) { response = `<span style="color:#ff3b5c;">ОШИБКА: Цель не найдена или защищена.</span>`; if (typeof AudioSys !== 'undefined') AudioSys.play('error'); }
      else { response = `Взлом ядра ${brand.toUpperCase()}... <span style="color:#00ff41;">[УСПЕШНО]</span><br>Секретный ингредиент: ${secrets[brand]}`; }
    }
    else if (command === 'track') {
      const brand = args[1];
      if (!brand) { response = `<span style="color:#ff3b5c;">ОШИБКА: Укажите марку для трекинга (пример: track monster).</span>`; }
      else {
        const foundLocations = mapLocations.filter(loc => loc.inventory.includes(brand));
        if (foundLocations.length === 0) {
          response = `Трекинг ${brand.toUpperCase()}: <span style="color:#ff3b5c;">Сигнал потерян.</span> Марка не найдена в доступных точках.`;
        } else {
          let locNames = foundLocations.map(l => `- ${l.name}`).join('<br>');
          response = `Трекинг ${brand.toUpperCase()}... <span style="color:#00ff41;">[СИГНАЛ НАЙДЕН]</span><br>Обнаружено в точках:<br>${locNames}`;
        }
      }
    }
        else if (command === 'buy') {
      const brandArg = (args[1] || '').toLowerCase();
      if (!window._atmFound) {
        response = `Попытка покупки "${escHtml(args.slice(1).join(' '))}"...<br><span style="color:#ff3b5c;">ОШИБКА: Карта отклонена. Иди пей воду.</span>`;
        if (typeof AudioSys !== 'undefined') AudioSys.play('error');
      }
      else if (hellCart.size >= HELL_BRAND_KEYS.length) {
        response = `<span style="color:#ff6a00;">Ну куда тебе столько? Заканчивай уже и жми "Оплатить".</span>`;
      }
      else if (!brandArg || !HELL_BRAND_KEYS.includes(brandArg)) {
        response = `<span style="color:#ff3b5c;">ОШИБКА: Укажи существующую марку. Например: buy monster</span>`;
      }
      else if (hellCart.has(brandArg)) {
        response = `<span style="color:#888;">${bNames[brandArg]} уже в корзине. Выбери другую марку.</span>`;
      }
      else {
        hellCart.add(brandArg);
        response = buildHellShopHtml(brandArg);
      }
    }
    else if (command === 'sudo' && args[1] === 'drink') {
      response = `Вы попытались выпить консоль...<br>Кофеин: <span style="color:#ff3b5c;">+9999 мг</span><br>Статус: Сервер переваривает...<br><span style="color:#888;">[ОШИБКА: ПЕЧЕНЬ НЕ НАЙДЕНА]</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }
    else if (command === 'cat' && args[1] === 'classified.txt') {
  const classifiedSecrets = [
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Зелёный Бык":<br>Если смешать Hell Energy и Red Bull, получится просто грязная вода с двойной дозой таурина.<br>Не пытайтесь повторить это дома. Мы уже пытались.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Красный Блик":<br>Red Bull на самом деле даёт крылья, но только если ты искренне веришь в маркетинг.<br>Исследование отменено. Спонсор продолжил спонсировать.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Чёрная Молния":<br>Monster Ultra Rosa был создан случайно. Учёный хотел сделать розовый лимонад, но перепутал пробирки.<br>Результат оказался лучше оригинала. Случайности — это гений эволюции.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Финишная Прямая":<br>Rockstar Energy содержит ровно столько кофеина, чтобы ты думал, что работаешь продуктивнее.<br>Плацебо-эффект подтверждён. Тестирование проведено на кофеинозависимых коллегах.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Тихий Горнец":<br>Rehab Green Tea — единственный энергетик, который написали программисты.<br>Они хотели бодрый чай, но добавили 160мг кофеина "на всякий случай".<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СОВЕРШЕННО СЕКРЕТНО ---<br>Протокол "Операция Burn":<br>Burn Cherry изобрели в 2004 году как напиток для диджеев.<br>Идея провалилась, но напиток прижился у студентов во время сессии.<br>Остатки партий до сих пор находят в самых удивительный местах.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- УЛЬТРА-СЕКРЕТНО ---<br>Протокол "Голубая Птица":<br>Monster Ultra Blue содержит синтетический краситель, который под УФ-лампой светится.<br>Это не баг, это фича. Но лучше не проверяй.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Матовое Золото":<br>Ultra Gold Lando Norris создан в сотрудничестве с пилотом F1.<br>Ландо сам не пьёт энергетики. Он пьёт только рекламные контракты.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Бессонница":<br>Battery Energy был создан финнами в 1997 году, когда в Финляндии зимой темнеет в 15:00.<br>Это не напиток. Это способ выжить до весны.<br>--- КОНЕЦ ФАЙЛА ---`,
    `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Турецкий Сон":<br>Non Stop содержит 50г сахара. Это не энергетик, это десерт с кофеином.<br>После банки хочется не работать, а лечь спать. Но уснуть уже нельзя.<br>--- КОНЕЦ ФАЙЛА ---`
  ];
  response = classifiedSecrets[Math.floor(Math.random() * classifiedSecrets.length)];
}
    else if (command === 'ls') { response = `Обнаружено ${drinks.length} объектов в сети.`; } 
    else if (command === 'scan') {
      const brand = args[1];
      if (!brand) { response = `<span style="color:#ff3b5c;">ОШИБКА: Укажите марку.</span>`; }
      else {
        const count = drinks.filter(d => d.key === brand).length;
        if (count === 0) response = `Скан "${escHtml(brand)}": Объекты не найдены.`;
        else response = `Скан "${escHtml(brand)}": Найдено ${count} объектов.`;
      }
    } 
    else if (command === 'whoami') {
      const id = Math.floor(Math.random() * 9000 + 1000);
      response = `AGENT_ID: #${id}<br>STATUS: Активен<br>УРОВЕНЬ ДОПУСКА: Секретный`;
    }
    else if (command === 'date') { response = `Текущее время сервера: ${new Date().toLocaleString('ru-RU')}`; }
    else if (command === 'coffee') {
     const _today = new Date().toDateString();
let _seed = 0;
for (let i = 0; i < _today.length; i++) _seed = ((_seed << 5) - _seed + _today.charCodeAt(i)) | 0;
const rd = drinks[Math.abs(_seed) % drinks.length];
      response = `Рекомендация ИИ: <span style="color:#fbbf24;">${rd.brand}</span> (${rd.flavor}). Выпей, пока не затормозил.`;
    }
    else if (command === 'top' && args[1] === 'secret') {
      response = `РАСШИФРОВКА...<br>СОВЕРШЕННО СЕКРЕТНО:<br>"Шеф любит ${drinks[Math.floor(Math.random() * drinks.length)].key}"<br><span style="color:#ff3b5c;">ВНИМАНИЕ: ЗА ВАМИ СЛЕДЯТ.</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }
    else if (command === 'ping' && !args[1]) {
      response = `Ответ от Большого брата: <span style="color:#fbbf24;">"Занимайся своими делами,пей свой энергетик и не трогай сервер."</span>`;
    }
    else if (command === 'sudo' && args[1] === 'delete' && args[2] === 'system32') {
      response = `<span style="color:#ff3b5c;">ОШИБКА: А тебе не кажется, что это глупая идея?</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }
    else if (command === 'rumors') {
      const dayRumors = {
        0: ['В воскресенье обычно тише — но говорят, тема сайта не любит резких движений туда-сюда...', 'По выходным логотип будто ждёт, что кто-то нажмёт на него пару раз подряд.'],
        1: ['Понедельник — время древних кодов. Где-то живёт последовательность из восьмидесятых: стрелки и буквы.', 'В начале недели чаще всего вспоминают про зеркальный код — начинается там, где обычный заканчивается, только наоборот.'],
        2: ['Во вторник кто-то заметил, что тема сайта переключается странно быстро при частых кликах.', 'Ходят слухи про монету, спрятанную где-то в самом логотипе.'],
        3: ['В среду обычно затишье, но именно тогда легче всего заметить зеркальную версию древнего кода.', 'Говорят, если подольше подержать палец на логотипе — что-то откликнется.'],
        4: ['Четверг — день открытий. Кто-то нашёл, что тема реагирует на быстрые повторные клики.', 'Слышал про код, который движется в обратную сторону от привычного...'],
        5: ['В пятницу все ищут пасхалки активнее обычного. Может, дело в стрелках и буквах на клавиатуре?', 'Поговаривают, монета прячется там, где меньше всего ожидаешь — прямо в лого.'],
        6: ['В субботу время экспериментировать. Попробуй что-нибудь древнее, из восьмидесятых.', 'Логотип иногда реагирует на долгие нажатия — если верить слухам.']
      };
      const dow = new Date().getDay();
      const pool = dayRumors[dow] || ['Слухи молчат сегодня...'];
      response = pool[Math.floor(Math.random() * pool.length)];
    }
    else if (command === 'status') {
      closeTerm(); renderProfile(); 
      setTimeout(() => { profModal.classList.add('open'); lockScroll(); }, 300); 
      return; 
    } 
        else if (command === 'clear') { termOutput.innerHTML = ''; return; }
    else if (command === 'exit') { closeTerm(); return; } 
    else if (cmd === '') { return; } 
    else {
      response = `<span style="color:#ff3b5c;">Команда '${escHtml(command)}' не распознана. Введите help.</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }

    termOutput.innerHTML += `<div>${response}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;
  });

  termOutput.addEventListener('click', (e) => {
    const btn = e.target.closest('.hell-shop-btn, .hell-shop-pay-btn');
    if (!btn) return;
    if (typeof AudioSys !== 'undefined') AudioSys.play('click');
    if (btn.classList.contains('hell-shop-pay-btn')) {
      finalizeHellPurchase();
    } else {
      const brand = btn.dataset.brand;
      if (brand && !hellCart.has(brand)) {
        hellCart.add(brand);
        termOutput.innerHTML += buildHellShopHtml(brand);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    }
  });

  // Логика Досье (без изменений)
  function renderProfile() {
    let visits = 0;
    try { visits = safeLSGetJSON('buzzrate_visits', []).length; } catch(e) {}
    let favs = [];
    try { favs = safeLSGetJSON('energy_favs', []); } catch(e) {}
    const maxCaff = parseInt(safeLSGet('buzz_max_caffeine', 0));

    const brandCounts = {};
    favs.forEach(f => { const b = f.split('_')[0]; brandCounts[b] = (brandCounts[b] || 0) + 1; });
    let topBrand = 'Нет данных'; let maxCount = 0;
    for (let b in brandCounts) { if (brandCounts[b] > maxCount) { maxCount = brandCounts[b]; topBrand = bNames[b] || b; } }

    let score = 0;
    score += Math.min(visits * 2, 50); 
    score += Math.min(favs.length * 5, 30); 
    score += Math.min(Math.floor(maxCaff / 20), 20); 
    let achCount = 0; for (let key in achievements) { if (safeLSGet('ach_' + key, null)) achCount++; }
    score += achCount * 10; 

    let rank, rankClass;
    if (score >= 120) { rank = 'Легенда Базз Рейта'; rankClass = 'rank-legend'; }
    else if (safeLSGet('ach_coronation', null)) { rank = 'Почётный гость Buzz Rate'; rankClass = 'rank-royal'; }
    else if (score >= 80) { rank = 'Кофеиновый маньяк'; rankClass = 'rank-maniac'; }
    else if (score >= 50) { rank = 'Опытный агент'; rankClass = 'rank-agent'; }
    else if (score >= 20) { rank = 'Стажер'; rankClass = 'rank-intern'; }
    else { rank = 'Новичок'; rankClass = 'rank-newbie'; }

    let achHtml = '';
    for (let key in achievements) {
      const isUnlocked = safeLSGet('ach_' + key, null);
      const tierClass = isUnlocked ? ('unlocked tier-' + achievements[key].tier) : 'locked';
            achHtml += `
        <div class="profile-ach-item ${tierClass}" data-ach-key="${key}">
          <i class="fa-solid ${isUnlocked ? achievements[key].icon : 'fa-question'}"></i>
          <span>${isUnlocked ? achievements[key].name : '???'}</span>
        </div>
      `;
    }

    profContent.innerHTML = `
      <div class="profile-stat-row">
        <span class="profile-stat-label">КЛАСС АГЕНТА</span>
        <span class="profile-stat-val ${rankClass}">${rank} (${score} очков)</span>
        <button class="rank-history-btn" id="rankHistoryBtn" aria-label="Все ранги"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="rank-history-list" id="rankHistoryList"></div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">МИССИЙ (ВИЗИТОВ)</span>
        <span class="profile-stat-val">${visits}</span>
      </div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">ЛЮБИМЫЙ БРЕНД</span>
        <span class="profile-stat-val">${topBrand}</span>
      </div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">МАКС. ДОЗА КАФЕИНА</span>
        <span class="profile-stat-val" style="color: ${maxCaff > 400 ? '#ff3b5c' : '#fff'}">${maxCaff} мг</span>
      </div>
       <div style="font-family:'Oswald'; color:#888; margin-top:25px; margin-bottom:10px; letter-spacing:1px;">ДОСТИЖЕНИЯ (${achCount}/17)</div>
      <div class="profile-ach-grid">${achHtml}</div>
      <div id="achDescriptionBox"></div>
    `;

            // Кликаемые ачивки — показывают описание
    const rankBtn = profContent.querySelector('#rankHistoryBtn');
    const rankList = profContent.querySelector('#rankHistoryList');
    if (rankBtn && rankList) {
      rankList.innerHTML = buildRankHistoryHtml(score);
      rankBtn.addEventListener('click', () => {
        rankList.classList.toggle('open');
        rankBtn.classList.toggle('open');
      });
    }

            // Кликаемые ачивки — показывают описание
    profContent.querySelectorAll('.profile-ach-item').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.dataset.achKey;
        const ach = achievements[key];
        if (!ach) return;
        const isUnlocked = safeLSGet('ach_' + key, null);

        const descBox = profContent.querySelector('#achDescriptionBox');
        if (!descBox) return;

               descBox.innerHTML = `
          <div class="ach-description-box">
            <i class="fa-solid ${isUnlocked ? ach.icon : 'fa-question'} ach-icon" style="color: ${isUnlocked ? 'var(--accent)' : 'var(--muted)'};"></i>
            <div style="flex:1;">
              <div class="ach-name">${isUnlocked ? ach.name : '???'}</div>
              <div class="ach-desc">${isUnlocked ? ach.desc : 'Достижение ещё не получено. Продолжайте взаимодействовать с сайтом.'}</div>
            </div>
            <button class="ach-close" onclick="this.parentElement.parentElement.innerHTML='';">✕</button>
          </div>
        `;
      });
    });
  }
})();
// ==========================================
// РАБОТА КНОПКИ ВЫКЛЮЧЕНИЯ ЗВУКА
// ==========================================
const soundToggle = document.getElementById('soundToggle');

if (soundToggle) {
  // Проверяем состояние при загрузке (если звук был выключен ранее)
  if (AudioSys.isMuted()) {
    soundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    soundToggle.setAttribute('aria-label', 'Включить звук');
    soundToggle.classList.add('muted');
  }

  // Обработка клика
  soundToggle.addEventListener('click', function(e) {
    // Останавливаем клик, чтобы кнопка не "пикнула"
    e.stopPropagation(); 

    // Переключаем звук в системе
    const isNowMuted = AudioSys.toggleMute();

    // Меняем иконку в зависимости от нового состояния
    if (isNowMuted) {
      this.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      this.setAttribute('aria-label', 'Включить звук');
      this.classList.add('muted');
    } else {
      this.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      this.setAttribute('aria-label', 'Выключить звук');
      this.classList.remove('muted');
    }
  });
}

// ============================================================
// ПАТЧИ: новые возможности
// ============================================================

// === ЛЕНИВАЯ ЗАГРУЗКА LEAFLET ===
(function() {
  const mapSection = document.getElementById('mapSection');
  if (!mapSection) return;

  function loadLeaflet() {
    if (window.L) { if (typeof initMap === 'function') initMap(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => { if (typeof initMap === 'function') initMap(); };
    document.body.appendChild(script);
  }

  if (!('IntersectionObserver' in window)) {
    loadLeaflet();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadLeaflet();
      io.disconnect();
    }
  }, { rootMargin: '300px' });
  io.observe(mapSection);
})();

// === ВОССТАНОВЛЕНИЕ AudioContext НА ПЕРВОМ ЖЕСТЕ ===
(function() {
  function unlockAudio() {
    if (window.AudioSys && typeof AudioSys.resume === 'function') {
      AudioSys.resume();
    }
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('click', unlockAudio);
  }
  // На iOS Safari нужно подождать первого жеста пользователя
  document.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  document.addEventListener('click', unlockAudio, { once: true });
  // Также пробуем разблокировать при загрузке на не-iOS
  setTimeout(() => {
    if (window.AudioSys && typeof AudioSys.resume === 'function') {
      try { AudioSys.resume(); } catch(e) {}
    }
  }, 500);
})();

// === ОБРАБОТЧИК data-action (заменил inline onclick) ===
document.addEventListener('click', function(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'scroll-top') { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); return; }
  if (action === 'open-calc') {
    e.preventDefault();
    if (typeof openCalc === 'function') openCalc();
  }
});

// === Кнопка "Позже" в модалке обновления ===
(function() {
  const later = document.getElementById('updateLater');
  if (later) later.addEventListener('click', () => {
    const m = document.getElementById('updateModal');
    if (m) m.style.display = 'none';
  });
})();

// ============================================================
// МОБИЛЬНАЯ ПАСХАЛКА #1: ДОЛГИЙ ТАП ПО ЛОГО (3 сек)
// ============================================================
(function() {
  const logo = document.querySelector('.header-logo');
  if (!logo) return;

  let timer;
  let active = false;
  let progress;

  function start(e) {
    if (e.cancelable) e.preventDefault();
    active = true;
    progress = document.createElement('div');
    progress.style.cssText = 'position:absolute;bottom:-4px;left:0;height:2px;width:0;background:#BFFF00;transition:width 3s linear;box-shadow:0 0 8px #BFFF00;';
    logo.style.position = 'relative';
    logo.appendChild(progress);
    requestAnimationFrame(() => { if (progress) progress.style.width = '100%'; });

    timer = setTimeout(() => {
      if (!active) return;
      active = false;
      if (progress) { progress.remove(); progress = null; }
      unlockAchievement('mobile');
      showToast('📱 Ты нашёл мобильную пасхалку! Тряхни телефон 3 раза — будет сюрприз...', 'fa-solid fa-mobile-screen');
      if (typeof DeviceMotionEvent !== 'undefined' &&
          typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then(state => {
          if (state === 'granted') initShakeListener();
        }).catch(() => {});
      } else {
        initShakeListener();
      }
    }, 3000);
  }

  function cancel() {
    active = false;
    clearTimeout(timer);
    if (progress) { progress.remove(); progress = null; }
  }

  logo.addEventListener('touchstart', start, { passive: false });
  logo.addEventListener('touchend', cancel);
  logo.addEventListener('touchmove', cancel);
  logo.addEventListener('touchcancel', cancel);
})();

// ============================================================
// МОБИЛЬНАЯ ПАСХАЛКА #2: ТРЯХНИ ТЕЛЕФОН 3 РАЗА → OVERLOAD
// ============================================================
let _shakeListenerInitialized = false;
function initShakeListener() {
  if (_shakeListenerInitialized) return;
  _shakeListenerInitialized = true;

  let lastShake = 0;
  let shakeCount = 0;
  let resetTimer;

  window.addEventListener('devicemotion', function(e) {
    const a = e.accelerationIncludingGravity;
    if (!a) return;
    const magnitude = Math.sqrt(
      (a.x||0)*(a.x||0) + (a.y||0)*(a.y||0) + (a.z||0)*(a.z||0)
    );
    const now = Date.now();

    if (magnitude > 18 && now - lastShake > 400) {
      lastShake = now;
      shakeCount++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => shakeCount = 0, 1500);

      if (shakeCount >= 3) {
        shakeCount = 0;
        if (typeof window.toggleOverload === 'function') {
          window.toggleOverload();
          showToast('⚡ Тряхнул как надо!', 'fa-solid fa-bolt');
        }
      }
    }
  }, { passive: true });
}

// ============================================================
// МОБИЛЬНАЯ ПАСХАЛКА #3: СВАЙП KONAMI (↑↑↓↓←→←→)
// ============================================================
(function() {
  if (matchMedia('(hover: hover)').matches) return; // только тач-устройства

  // Два паттерна: обычный Konami и Doom
  const konamiPattern = ['up','up','down','down','left','right','left','right'];
  const doomPattern = ['down','down','up','up','right','left','right','left'];
  
  let konamiIndex = 0;
  let doomIndex = 0;
  let resetTimer;
  let startX, startY, startT;

  document.addEventListener('touchstart', e => {
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY; startT = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (startX == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const dt = Date.now() - startT;

    if (dt > 500) { startX = null; return; }

    const absX = Math.abs(dx), absY = Math.abs(dy);
    if (absX < 30 && absY < 30) { startX = null; return; }

    let dir;
    if (absX > absY) dir = dx > 0 ? 'right' : 'left';
    else dir = dy > 0 ? 'down' : 'up';

    let matched = false;

    // Проверяем Konami (↑↑↓↓←→←→)
    if (dir === konamiPattern[konamiIndex]) {
      konamiIndex++;
      matched = true;
      if (konamiIndex === konamiPattern.length) {
        konamiIndex = 0;
        if (typeof window.toggleOverload === 'function') {
          window.toggleOverload();
          showToast('🎮 Konami свайпами!', 'fa-solid fa-gamepad');
          unlockAchievement('mobile');
        }
      }
    } else {
      konamiIndex = (dir === konamiPattern[0]) ? 1 : 0;
    }

    // Проверяем Doom (↓↓↑↑→←→←)
    if (dir === doomPattern[doomIndex]) {
      doomIndex++;
      matched = true;
      if (doomIndex === doomPattern.length) {
        doomIndex = 0;
        if (typeof DoomMode !== 'undefined') {
          DoomMode.toggle(true);
          showToast('💀 Doom свайпами!', 'fa-solid fa-skull');
        }
      }
    } else {
      doomIndex = (dir === doomPattern[0]) ? 1 : 0;
    }

    if (matched) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { konamiIndex = 0; doomIndex = 0; }, 2000);
    }

    startX = null;
  }, { passive: true });
})();


// ============================================================
// ФИЧА 1: ПОИСК ПО НАЗВАНИЮ
// ============================================================
(function() {
  const searchInput = document.getElementById('drinkSearch');
  const clearBtn = document.getElementById('clearSearch');
  if (!searchInput) return;
  if (!clearBtn) return;

  let currentFilter = 'all';
  let currentBrand = 'all';

  // Сохраняем оригинальную функцию applyFilters, если есть
  const origApply = window.applyFilters;

  function filterCards(query) {
    const cards = document.querySelectorAll('#cardsGrid .energy-card');
    let visibleCount = 0;
    cards.forEach(card => {
      const brand = (card.dataset.brand || '').toLowerCase();
      const name = (card.querySelector('.card-brand')?.textContent || '').toLowerCase();
      const flavor = (card.querySelector('.card-flavor')?.textContent || '').toLowerCase();
      const matches = !query || brand.includes(query) || name.includes(query) || flavor.includes(query);
      
      if (matches) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Показать "ничего не найдено"
    let noResults = document.getElementById('searchNoResults');
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.id = 'searchNoResults';
        noResults.className = 'search-no-results';
        noResults.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><div>Ничего не найдено</div><div style="font-size:13px;margin-top:8px;">Попробуй изменить запрос</div>';
        document.getElementById('cardsGrid').appendChild(noResults);
      }
    } else {
      if (noResults) noResults.remove();
    }

    // Кнопка очистки
    if (query) clearBtn.classList.add('visible');
    else clearBtn.classList.remove('visible');
  }

  let _searchTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(function() {
      filterCards(e.target.value.toLowerCase().trim());
    }, 200);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterCards('');
    searchInput.focus();
  });
})();

// ============================================================
// ФИЧА 2: МОДАЛКА ДЕТАЛЕЙ НАПИТКА
// ============================================================
const DrinkDetails = (function() {
  const modal = document.getElementById('drinkDetailsModal');
  if (!modal) return { open: () => {} };

  const img = document.getElementById('detailsImage');
  const ratingEl = document.getElementById('detailsRating');
  const brandEl = document.getElementById('detailsBrand');
  const tagBrandEl = document.getElementById('detailsTagBrand');
  const flavorEl = document.getElementById('detailsFlavor');
  const statsGrid = document.getElementById('detailsStatsGrid');
  const favBtn = document.getElementById('detailsFavBtn');
  const compareBtn = document.getElementById('detailsCompareBtn');
  const shareBtn = document.getElementById('detailsShareBtn');
  const videoBtn = document.getElementById('detailsVideoBtn');
  const drankBtn = document.getElementById('detailsDrankBtn');
  const similarList = document.getElementById('similarList');
  const historySection = document.getElementById('detailsHistory');
  const historyList = document.getElementById('historyList');
  const extraInfoEl = document.getElementById('detailsExtraInfo');

  let currentDrink = null;

  function open(drink) {
    if (!drink) return;
    currentDrink = drink;
    const drinkIndex = drinks.indexOf(drink);

    // Заполняем基本 информацию
    setImageWithFallback(img, drink.img || '', 'images/placeholder.svg');
    img.alt = drink.brand;
    ratingEl.textContent = drink.rating + '/10';
    brandEl.textContent = drink.brand;
    flavorEl.textContent = drink.flavor || '';

    // FIX 7: Метка бренда вместо точки
    const brandName = bNames[drink.key] || drink.key;
    const color = bColors[drink.key] || '#888';
    if (tagBrandEl) {
      tagBrandEl.textContent = brandName;
      tagBrandEl.style.color = color;
      tagBrandEl.style.borderColor = color + '60';
    }

    // FIX 2: Характеристики с цветовой кодировкой (как в карточках)
    statsGrid.innerHTML = `
      <div class="details-stat-box" data-type="caffeine"><label>Кофеин</label><span class="stat-value">${drink.caffeine || '—'}</span></div>
      <div class="details-stat-box" data-type="sugar"><label>Сахар</label><span class="stat-value">${drink.sugar || '—'}</span></div>
      <div class="details-stat-box" data-type="calories"><label>Калории</label><span class="stat-value">${drink.cal || '—'}</span></div>
      <div class="details-stat-box" data-type="ph"><label>pH</label><span class="stat-value">${drink.ph || '—'}</span></div>
    `;
    // Подробная информация: бренд, вкус, цена
    const brandInfo = bBrandInfo[drink.key] || null;
    if (extraInfoEl) {
      const countryLine = brandInfo && brandInfo.country
        ? brandInfo.country + (brandInfo.founded ? ' • бренд с ' + brandInfo.founded + ' года' : '')
        : 'Нет проверенных данных о бренде';
      extraInfoEl.innerHTML = `
        <div class="extra-info-row"><i class="fa-solid fa-earth-europe"></i><span>${countryLine}</span></div>
        ${brandInfo && brandInfo.note ? `<div class="extra-info-row"><i class="fa-solid fa-circle-info"></i><span>${brandInfo.note}</span></div>` : ''}
        <div class="extra-info-row"><i class="fa-solid fa-comment"></i><span>${drink.taste ? drink.taste : 'Вкус ещё не описан'}</span></div>
        <div class="extra-info-row"><i class="fa-solid fa-tag"></i><span>${drink.price ? drink.price : 'Цена уточняется'}</span></div>
      `;
    }


    // Кнопка видео
    if (drink.video && drink.video.trim()) {
      videoBtn.classList.remove('no-video');
      videoBtn.onclick = () => {
        closeModal();
        const card = document.querySelector('.energy-card[data-drink-index="' + drinkIndex + '"]');
        if (typeof openVideoModal === 'function' && card) openVideoModal(card);
        else if (typeof openModal === 'function') openModal(drink);
      };
    } else {
      videoBtn.classList.add('no-video');
    }

    // FIX 3: Избранное с единным ID по индексу
    const favKey = 'drink_' + drinkIndex;
    const favs = getFavs();
    const isFav = favs.includes(favKey);
    favBtn.classList.toggle('active', isFav);
    favBtn.innerHTML = isFav 
      ? '<i class="fa-solid fa-heart"></i> В избранном'
      : '<i class="fa-solid fa-heart"></i> В избранное';
    favBtn.onclick = (e) => {
      e.stopPropagation();
      let curFavs = getFavs();
      const nowFav = curFavs.includes(favKey);
      if (nowFav) {
        curFavs = curFavs.filter(f => f !== favKey);
        showToast('Убрано из избранного', 'fa-regular fa-heart');
      } else {
        curFavs.push(favKey);
        showToast(drink.brand + ' в избранном', 'fa-solid fa-heart');
        if (curFavs.length >= 3) unlockAchievement('fav3');
      }
      saveFavs(curFavs);
      const finalFav = curFavs.includes(favKey);
      favBtn.classList.toggle('active', finalFav);
      favBtn.innerHTML = finalFav
        ? '<i class="fa-solid fa-heart"></i> В избранном'
        : '<i class="fa-solid fa-heart"></i> В избранное';
      // Обновить сердечко на карточке
      const card = document.querySelector('.energy-card[data-drink-index="' + drinkIndex + '"]');
      if (card) {
        const cardFav = card.querySelector('.fav-btn');
        if (cardFav) {
          cardFav.classList.toggle('active', finalFav);
          const cardFavIcon = cardFav.querySelector('i');
          if (cardFavIcon) cardFavIcon.className = finalFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        }
      }
    };

    // Сравнить
    compareBtn.onclick = (e) => {
      e.stopPropagation();
      if (typeof toggleCompare === 'function') {
        toggleCompare(drink.brand);
      }
    };

    // Поделиться
    shareBtn.onclick = (e) => {
      e.stopPropagation();
      shareDrink(drink);
    };

    // FIX 6: Кнопка "Я выпил" — добавляет в трекер кофеина
    if (drankBtn) {
      drankBtn.classList.remove('active');
      drankBtn.innerHTML = '<i class="fa-solid fa-mug-hot"></i> Я выпил';
      drankBtn.onclick = (e) => {
        e.stopPropagation();
        if (CaffeineTracker) {
          CaffeineTracker.add(drink);
          drankBtn.classList.add('active');
          drankBtn.innerHTML = '<i class="fa-solid fa-check"></i> Учтено';
          showToast('+' + (parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0) + ' мг кофеина', 'fa-solid fa-mug-hot');
        }
      };
    }

    // Похожие напитки
    renderSimilar(drink);

    // История просмотров (не добавляет кофеин!)
    addToHistory(drink);
    renderHistory();

    // Открываем модалку
    modal.classList.add('open');
    lockScroll();
    if (window.AudioSys) AudioSys.play('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    unlockScroll();
  }

  function shareDrink(drink) {
    const url = window.location.origin + window.location.pathname + '#drink-' + drinks.indexOf(drink);
    const text = `Смотри обзор на ${drink.brand} (${drink.flavor || ''}) — рейтинг ${drink.rating}/10 на Buzz Rate!`;
    
    if (navigator.share) {
      navigator.share({ title: 'Buzz Rate', text: text, url: url }).catch(() => {});
    } else {
      // Фолбэк — копируем в буфер
      const ta = document.createElement('textarea');
      ta.value = text + ' ' + url;
      document.body.appendChild(ta);
      ta.select();
      try { 
        document.execCommand('copy');
        showToast('Ссылка скопирована!', 'fa-solid fa-clipboard-check');
      } catch(e) {}
      ta.remove();
    }
  }

  function renderSimilar(drink) {
    // Алгоритм: совпадение по caffeine ±20мг + sugar ±10г
    const targetCaff = parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0;
    const targetSugar = parseInt((drink.sugar || '').replace(/\D/g, '')) || 0;

    const similar = drinks
      .filter(d => d !== drink)
      .map(d => {
        const dCaff = parseInt((d.caffeine || '').replace(/\D/g, '')) || 0;
        const dSugar = parseInt((d.sugar || '').replace(/\D/g, '')) || 0;
        const diff = Math.abs(dCaff - targetCaff) + Math.abs(dSugar - targetSugar);
        return { drink: d, diff: diff };
      })
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 6);

    similarList.innerHTML = similar.map(item => `
      <div class="similar-item" data-brand="${item.drink.brand}">
        <img src="${item.drink.img || ''}" alt="${item.drink.brand}" loading="lazy" data-fallback="true">
        <span>${item.drink.brand.substring(0, 18)}</span>
      </div>
    `).join('');

    similarList.querySelectorAll('.similar-item img[data-fallback="true"]').forEach(imgEl => {
      const brand = imgEl.closest('.similar-item')?.dataset.brand;
      const drink = drinks.find(d => d.brand === brand);
      if (drink) setImageWithFallback(imgEl, drink.img || '', 'images/placeholder.svg');
    });

    similarList.querySelectorAll('.similar-item').forEach((el, i) => {
      el.onclick = () => open(similar[i].drink);
    });
  }

  function addToHistory(drink) {
    const KEY = 'buzz_view_history';
    const history = safeLSGetJSON(KEY, []);
    // Удаляем дубликаты
    const filtered = history.filter(item => item.brand !== drink.brand);
    // Добавляем в начало
    filtered.unshift({ brand: drink.brand, img: drink.img, key: drink.key });
    // Ограничиваем 10 элементами
    safeLSSetJSON(KEY, filtered.slice(0, 10));
  }

  function renderHistory() {
    const KEY = 'buzz_view_history';
    const history = safeLSGetJSON(KEY, []);
    if (history.length === 0) {
      historySection.style.display = 'none';
      return;
    }
    historySection.style.display = 'block';
    historyList.innerHTML = history.slice(0, 8).map(item => `
      <div class="history-item" data-brand="${item.brand}">
        <img src="${item.img || ''}" alt="${item.brand}" loading="lazy" data-fallback="true">
        <span>${item.brand.substring(0, 14)}</span>
      </div>
    `).join('');

    historyList.querySelectorAll('.history-item img[data-fallback="true"]').forEach(imgEl => {
      const brand = imgEl.closest('.history-item')?.dataset.brand;
      const drink = drinks.find(d => d.brand === brand);
      if (drink) setImageWithFallback(imgEl, drink.img || '', 'images/placeholder.svg');
    });

    historyList.querySelectorAll('.history-item').forEach(el => {
      el.onclick = () => {
        const drink = drinks.find(d => d.brand === el.dataset.brand);
        if (drink) open(drink);
      };
    });
  }

  // FIX 1: Усиленный обработчик закрытия — работает на всех устройствах
  function handleClose(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    closeModal();
  }
  const closeBtn = document.getElementById('closeDetails');
  if (closeBtn) {
    closeBtn.addEventListener('click', handleClose);
    closeBtn.addEventListener('pointerdown', handleClose);
    closeBtn.addEventListener('touchstart', handleClose, { passive: false });
  }
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Делаем функцию доступной глобально
  window.openDrinkDetails = open;
  return { open };
})();

// ============================================================
// ФИЧА 3: ЗАГРУЗОЧНЫЙ ЭКРАН
// ============================================================
(function() {
  const preloader = document.getElementById('preloader');
  if (!preloader) {
    // Если preloader отсутствует — запускаем typewriter сразу
    if (typeof startTypewriterWhenReady === 'function') startTypewriterWhenReady();
    return;
  }

  function hidePreloader() {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 700);
    // ЗАПУСКАЕМ TYPERWRITER ПОСЛЕ скрытия preloader (через 300мс, чтобы fade-out успел начаться)
    setTimeout(() => {
      if (typeof startTypewriterWhenReady === 'function') startTypewriterWhenReady();
    }, 300);
  }

  // Скрываем после полной загрузки страницы + шрифтов
  function scheduleHide() {
    const fontsReady = (document.fonts && document.fonts.ready) 
      ? document.fonts.ready 
      : Promise.resolve();
    fontsReady.then(() => setTimeout(hidePreloader, 800));
    // Фолбэк — скрываем через 2.5 сек в любом случае
    setTimeout(hidePreloader, 2500);
  }

  if (document.readyState === 'complete') {
    scheduleHide();
  } else {
    window.addEventListener('load', scheduleHide);
    setTimeout(hidePreloader, 3500); // абсолютный фолбэк
  }
})();

// ============================================================
// ФИЧА 4: КНОПКА "ПОДЕЛИТЬСЯ" (глобальная функция)
// ============================================================
window.shareDrink = function(drink) {
  const url = window.location.origin + window.location.pathname + '#drink-' + drinks.indexOf(drink);
  const text = `Смотри обзор на ${drink.brand} — рейтинг ${drink.rating}/10 на Buzz Rate!`;
  
  if (navigator.share) {
    navigator.share({ title: 'Buzz Rate', text: text, url: url }).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = text + ' ' + url;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Ссылка скопирована!', 'fa-solid fa-clipboard-check');
    } catch(e) {}
    ta.remove();
  }
};

// ============================================================
// ФИЧА 5: ТОП-10
// ============================================================
function renderTop10() {
  const list = document.getElementById('top10List');
  if (!list) return;

  const top10 = [...drinks]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  list.innerHTML = top10.map((drink, i) => `
    <div class="top10-item rank-${i + 1}" data-brand="${drink.brand}">
      <div class="top10-rank">${i + 1}</div>
      <img class="top10-image" src="${drink.img || ''}" alt="${drink.brand}" loading="lazy" data-fallback="true">
      <div class="top10-info">
        <h4>${drink.brand}</h4>
        <p>${drink.flavor || ''} • ${drink.caffeine || '—'}</p>
      </div>
      <div class="top10-rating">${drink.rating}<small>/10</small></div>
    </div>
  `).join('');

  list.querySelectorAll('.top10-item img[data-fallback="true"]').forEach(imgEl => {
    const brand = imgEl.closest('.top10-item')?.dataset.brand;
    const drink = drinks.find(d => d.brand === brand);
    if (drink) setImageWithFallback(imgEl, drink.img || '', 'images/placeholder.svg');
  });

  list.querySelectorAll('.top10-item').forEach(el => {
    el.addEventListener('click', () => {
      const drink = drinks.find(d => d.brand === el.dataset.brand);
      if (drink && window.openDrinkDetails) window.openDrinkDetails(drink);
    });
  });
}

// ============================================================
// ФИЧА 6: СТАТИСТИКА ПО БРЕНДАМ
// ============================================================
function renderStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  const brandStats = {};
  drinks.forEach(d => {
    if (!brandStats[d.key]) {
      brandStats[d.key] = {
        name: bNames[d.key] || d.key,
        color: bColors[d.key] || '#888',
        ratings: [],
        caffeine: [],
        sugar: [],
        count: 0
      };
    }
    brandStats[d.key].ratings.push(d.rating);
    brandStats[d.key].caffeine.push(parseInt((d.caffeine || '').replace(/\D/g, '')) || 0);
    brandStats[d.key].sugar.push(parseInt((d.sugar || '').replace(/\D/g, '')) || 0);
    brandStats[d.key].count++;
  });

  const html = Object.values(brandStats).map(stat => {
    const avgRating = (stat.ratings.reduce((a, b) => a + b, 0) / stat.ratings.length).toFixed(1);
    const avgCaff = Math.round(stat.caffeine.reduce((a, b) => a + b, 0) / stat.caffeine.length);
    const avgSugar = Math.round(stat.sugar.reduce((a, b) => a + b, 0) / stat.sugar.length);
    const ratingPct = (avgRating / 10) * 100;

    return `
      <div class="stat-card">
        <div class="stat-card-header">
          <div class="stat-brand-dot" style="background: ${stat.color}"></div>
          <div class="stat-brand-name">${stat.name}</div>
        </div>
        <div class="stat-rows">
          <div class="stat-row"><span>Средний рейтинг</span><span>${avgRating}/10</span></div>
          <div class="stat-rating-bar"><div class="stat-rating-bar-fill" style="width: ${ratingPct}%; background: ${stat.color}"></div></div>
          <div class="stat-row"><span>Средний кофеин</span><span>${avgCaff} мг</span></div>
          <div class="stat-row"><span>Средний сахар</span><span>${avgSugar} г</span></div>
          <div class="stat-row"><span>Вкусов в базе</span><span>${stat.count}</span></div>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;
}

// ============================================================
// ФИЧА 7: НАПИТОК ДНЯ
// ============================================================
function renderDailyDrink() {
  const section = document.getElementById('dailyDrinkSection');
  if (!section) return;

  const KEY = 'buzz_daily_drink';
  const today = new Date().toDateString();
  const stored = safeLSGetJSON(KEY, {});

  let drinkIndex;
  if (stored.date === today && drinks[stored.index]) {
    drinkIndex = stored.index;
  } else {
    const _today = new Date().toDateString();
let _seed = 0;
for (let i = 0; i < _today.length; i++) _seed = ((_seed << 5) - _seed + _today.charCodeAt(i)) | 0;
drinkIndex = Math.abs(_seed) % drinks.length;
    safeLSSetJSON(KEY, { date: today, index: drinkIndex });
  }

  const drink = drinks[drinkIndex];
  if (!drink) return;

  setImageWithFallback(document.getElementById('ddImage'), drink.img || '', 'images/placeholder.svg');
  document.getElementById('ddBrand').textContent = drink.brand;
  document.getElementById('ddFlavor').textContent = drink.flavor || '';
  document.getElementById('ddCaffeine').textContent = drink.caffeine || '—';
  document.getElementById('ddRating').textContent = drink.rating;

  // Цвет карточки
  const card = document.getElementById('dailyDrinkCard');
  card.style.setProperty('--can-glow', (bColors[drink.key] || '#BFFF00') + '26');

  document.getElementById('ddBtn').onclick = () => {
    if (window.openDrinkDetails) window.openDrinkDetails(drink);
  };
}

// ============================================================
// ФИЧА 10: ТРЕКЕР СУТОЧНОЙ НОРМЫ КОФЕИНА
// ============================================================
const CaffeineTracker = (function() {
  const KEY = 'buzz_caffeine_today';
  const MAX_DAILY = 400; // мг

  function getToday() { return new Date().toDateString(); }

  function getTodayData() {
    const data = safeLSGetJSON(KEY, {});
    if (data.date !== getToday()) return { date: getToday(), total: 0, drinks: [] };
    return data;
  }

  function add(drink) {
    const mg = parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0;
    if (mg === 0) return;
    const data = getTodayData();
    data.total += mg;
    data.drinks.push({ brand: drink.brand, mg: mg, time: Date.now() });
    safeLSSetJSON(KEY, data);
    updateWidget();
    
    if (data.total > MAX_DAILY && !safeLSGet('ach_caffeine', null)) {
      if (typeof unlockAchievement !== 'undefined') unlockAchievement('caffeine');
      showToast(`⚠️ Превышена суточная норма: ${data.total} мг / ${MAX_DAILY} мг`, 'fa-solid fa-triangle-exclamation');
    }
  }

  function updateWidget() {
    const widget = document.getElementById('caffeineWidget');
    const bar = document.getElementById('cwBarFill');
    const text = document.getElementById('cwText');
    if (!widget || !bar || !text) return;

    const data = getTodayData();
    const pct = Math.min((data.total / MAX_DAILY) * 100, 100);
    bar.style.width = pct + '%';
    text.textContent = data.total + ' мг';

    if (data.total > MAX_DAILY) {
      widget.classList.add('over-limit');
      bar.classList.add('over-limit');
    } else {
      widget.classList.remove('over-limit');
      bar.classList.remove('over-limit');
    }
  }

  // Клик по виджету открывает калькулятор
  document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('caffeineWidget');
    if (widget) {
      widget.addEventListener('click', () => {
        if (typeof openCalc === 'function') openCalc();
      });
    }
    updateWidget();
  });

  function reset() {
    const data = { date: getToday(), total: 0, drinks: [] };
    safeLSSetJSON(KEY, data);
    updateWidget();
    showToast('Счётчик кофеина сброшен', 'fa-solid fa-rotate-left');
  }

  // FIX 1: long-press на виджете убран (виджет удалён из HTML)
  // Сброс кофеина теперь доступен через калькулятор (кнопка "Сбросить")
  document.addEventListener('DOMContentLoaded', () => {
    // Добавим кнопку сброса в калькулятор
    const calcModal = document.getElementById('calcModal');
    if (calcModal && !document.getElementById('calcResetBtn')) {
      const resetBtn = document.createElement('button');
      resetBtn.id = 'calcResetBtn';
      resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Сбросить';
      resetBtn.style.cssText = 'margin-top:15px;width:100%;padding:10px;background:rgba(255,59,92,0.1);border:1px solid rgba(255,59,92,0.3);color:#ff3b5c;border-radius:8px;cursor:pointer;font-family:Oswald;font-size:14px;letter-spacing:1px;';
      resetBtn.onclick = () => {
        if (confirm('Сбросить счётчик кофеина за сегодня?')) {
          reset();
        }
      };
      const meter = calcModal.querySelector('.calc-meter');
      if (meter) meter.appendChild(resetBtn);
    }
  });

  // ВНИМАНИЕ: getTodayData уже определена выше (с проверкой даты) — не дублируем
  return { add, updateWidget, reset, getTodayData };
})();

// ВНИМАНИЕ: кофеин больше НЕ добавляется автоматически при просмотре деталей.
// Пользователь должен явно нажать кнопку "Я выпил" в модалке.
// (старый хук удалён — он работал некорректно)

// ============================================================
// ФИЧА 11: РУЛЕТКА — УБРАНА (по запросу пользователя, т.к. есть "Случайный напиток")
// ============================================================
// (блок удалён)

// ============================================================
// ФИЧА 15: ЗВУК ПРИ НАВЕДЕНИИ — ОТКЛЮЧЁН (по запросу пользователя)
// ============================================================
// (блок удалён — звук при наведении мышки на карточки больше не играет)

// ============================================================
// ============================================================
// FIX 5: СКРЫТИЕ ШАПКИ ПРИ СКРОЛЛЕ ВНИЗ, ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ВВЕРХ
// ============================================================
(function() {
  const header = document.querySelector('header');
  if (!header) return;
  
  // На мобильных (тах-устройствах) шапка статичная — без эффекта скрытия
  if (matchMedia('(max-width: 768px)').matches) {
    return;
  }
  
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // В самом верху — всегда показываем
    if (currentScroll < 80) {
      header.classList.remove('header-hidden');
      document.body.classList.remove('header-hidden');
      header.classList.remove('scrolling');
      lastScroll = currentScroll;
      ticking = false;
      return;
    }
    
    header.classList.add('scrolling');
    
    // Скролл вниз — прячем
    if (currentScroll > lastScroll + 8 && currentScroll > 150) {
      header.classList.add('header-hidden');
      document.body.classList.add('header-hidden');
    } 
    // Скролл вверх — показываем
    else if (currentScroll < lastScroll - 5) {
      header.classList.remove('header-hidden');
      document.body.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ИНИЦИАЛИЗАЦИЯ НОВЫХ ФИЧ
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderTop10();
  renderStats();
  renderDailyDrink();
  CaffeineTracker.updateWidget();

  // Перехват кликов по карточкам — открываем детали, а не видео сразу
  // (сохраняем видео-кнопку внутри карточки)
  const cardsGrid = document.getElementById('cardsGrid');
  if (cardsGrid) {
    cardsGrid.addEventListener('click', (e) => {
      // Если клик на кнопку "Смотреть обзор" или "Избранное" — не перехватываем
      if (e.target.closest('[data-open-video], .fav-btn, .cmp-btn, .share-btn')) return;
      // В Doom Mode — карточки уничтожаются, детали не открываем
      if (document.body.classList.contains('doom-mode')) return;
      const card = e.target.closest('.energy-card');
      if (!card) return;
      const idx = parseInt(card.dataset.drinkIndex);
      const drink = drinks[idx];
      if (drink && window.openDrinkDetails) {
        e.preventDefault();
        window.openDrinkDetails(drink);
      }
    });
  }

  // Проверяем hash в URL для шеринга (#drink-N)
  if (location.hash.startsWith('#drink-')) {
    const idx = parseInt(location.hash.replace('#drink-', ''));
    if (!isNaN(idx) && drinks[idx] && window.openDrinkDetails) {
      setTimeout(() => window.openDrinkDetails(drinks[idx]), 1500);
    }
  }
});

// Запускаем рендер сразу, если DOM уже готов
// Убран дублирующий вызов — уже есть в DOMContentLoaded


// ============================================================
// FIX 3: FALLBACK ДЛЯ КАРТИНОК — ТОЛЬКО ПРИ РЕАЛЬНОЙ ОШИБКЕ
// ВАЖНО: не запускаем fallback преждевременно. Ждём событие 'error' ИЛИ
// через 5 секунд проверяем naturalWidth. Если картинка загрузилась — fallback не нужен.
// ============================================================
(function() {
  function showPlaceholder(img) {
    // Если уже есть placeholder — выходим
    if (img.dataset.placeholderShown) return;
    img.dataset.placeholderShown = '1';
    
    const card = img.closest('.energy-card');
    const brand = card ? (card.querySelector('.card-brand')?.textContent || 'B') : 'B';
    const initial = brand.charAt(0).toUpperCase();
    
    // Прячем битую картинку
    img.style.opacity = '0';
    
    // Создаём placeholder поверх
    if (!img.parentElement.querySelector('.img-placeholder')) {
      const placeholder = document.createElement('div');
      placeholder.className = 'img-placeholder';
      placeholder.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#BFFF00;font-family:Oswald,sans-serif;font-size:42px;font-weight:900;text-shadow:0 0 20px rgba(191,255,0,0.5);pointer-events:none;z-index:1;';
      placeholder.textContent = initial;
      img.parentElement.style.position = 'relative';
      img.parentElement.appendChild(placeholder);
    }
  }
  
  function hidePlaceholder(img) {
    // Если картинка загрузилась — убираем placeholder и метку
    if (img.dataset.placeholderShown) {
      delete img.dataset.placeholderShown;
      img.style.opacity = '';
      const placeholder = img.parentElement?.querySelector('.img-placeholder');
      if (placeholder) placeholder.remove();
    }
  }
  
  // ТОЛЬКО событие error — реальный сигнал, что картинка не загрузилась
  function onError(e) {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    if (img.dataset.placeholderShown) return;
    // Небольшая задержка — вдруг браузер ещё пытается загрузить
    setTimeout(() => {
      if (img.complete && img.naturalWidth === 0) {
        showPlaceholder(img);
      }
    }, 100);
  }
  
  document.addEventListener('error', onError, true);
  
  // Когда картинка успешно загрузилась — убираем placeholder (если был)
  document.addEventListener('load', function(e) {
    if (e.target.tagName === 'IMG') {
      hidePlaceholder(e.target);
    }
  }, true);
  
  // Через 5 секунд — финальная проверка (для совсем медленного интернета)
  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete && img.naturalWidth === 0 && !img.dataset.placeholderShown) {
        showPlaceholder(img);
      }
    });
  }, 5000);
})();
// ============================================================
// 🪙 СКРЫТАЯ МОНЕТКА В ЛОГОТИПЕ
// ============================================================
(function() {
  const logo = document.querySelector('.header-logo');
  if (!logo) return;

  const coinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);width:150px;height:150px;z-index:99999;cursor:pointer;transition:transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);" id="hiddenCoin">
    <defs>
      <radialGradient id="coinBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4a0f18" />
        <stop offset="75%" stop-color="#1a0508" />
        <stop offset="100%" stop-color="#050002" />
      </radialGradient>
      <linearGradient id="cyberGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffcc00" />
        <stop offset="50%" stop-color="#ff6600" />
        <stop offset="100%" stop-color="#ff3300" />
      </linearGradient>
      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="250" cy="250" r="230" fill="url(#coinBg)" stroke="url(#cyberGold)" stroke-width="10" />
    <polygon points="250,40 395,105 460,250 395,395 250,460 105,395 40,250 105,105" fill="none" stroke="#ff3300" stroke-width="4" stroke-dasharray="15,10" />
    <g stroke="url(#cyberGold)" stroke-width="6" stroke-linecap="square">
      <line x1="250" y1="10" x2="250" y2="30" />
      <line x1="250" y1="470" x2="250" y2="490" />
      <line x1="10" y1="250" x2="30" y2="250" />
      <line x1="470" y1="250" x2="490" y2="250" />
    </g>
    <g fill="url(#cyberGold)" filter="url(#neonGlow)">
      <polygon points="170,140 330,140 360,200 360,250 320,290 180,290 140,250 140,200" />
      <polygon points="250,230 235,260 265,260" fill="#1a0508" />
      <polygon points="170,190 225,200 215,225 175,215" fill="#1a0508" />
      <polygon points="330,190 275,200 285,225 325,215" fill="#1a0508" />
      <polygon points="140,240 160,250 150,270 135,255" fill="#1a0508" />
      <polygon points="360,240 340,250 350,270 365,255" fill="#1a0508" />
      <polygon points="195,300 305,300 295,360 205,360" />
      <g stroke="#1a0508" stroke-width="4" stroke-linecap="square">
        <line x1="220" y1="300" x2="220" y2="345" />
        <line x1="235" y1="300" x2="235" y2="355" />
        <line x1="250" y1="300" x2="250" y2="355" />
        <line x1="265" y1="300" x2="265" y2="355" />
        <line x1="280" y1="300" x2="280" y2="345" />
      </g>
    </g>
    <g stroke="#ff6600" stroke-width="2" opacity="0.6">
      <line x1="100" y1="250" x2="400" y2="250" />
      <line x1="250" y1="100" x2="250" y2="400" />
    </g>
  </svg>`;

  let logoClicks = 0;
  let logoTimer;
  const coinSpawnKey = 'buzz_coin_spawned';

  logo.addEventListener('click', function() {
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoClicks = 0; }, 2000);

    if (logoClicks >= 2) {
      logo.style.animation = 'none';
      void logo.offsetWidth;
      logo.style.animation = 'shake 0.3s';
    }

    if (logoClicks === 4) {
      logoClicks = 0;

      if (safeLSGet('ach_coin_click', null) || safeLSGet(coinSpawnKey, null) === 'true') {
        showToast('Монетка уже у тебя. Больше нет.', 'fa-solid fa-coins');
        return;
      }

      safeLSSet(coinSpawnKey, 'true');

      const oldCoin = document.getElementById('hiddenCoin');
      if (oldCoin) oldCoin.remove();

      document.body.insertAdjacentHTML('beforeend', coinSvg);
      const coin = document.getElementById('hiddenCoin');

      setTimeout(() => { coin.style.transform = 'translate(-50%, -50%) scale(1)'; }, 50);

      if (window.AudioSys) AudioSys.play('achievement');

      coin.addEventListener('click', function() {
        unlockAchievement('coin_click');
        window._atmFound = true;
        coin.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => coin.remove(), 500);
        if (window.AudioSys) AudioSys.play('click');
      });
    }
  });
})();

// ==========================================
// ГЛОБАЛЬНЫЕ КЛАВИАТУРНЫЕ КОМБО (KONAMI + DOOM)
// Единственный обработчик — раньше их было два и они конфликтовали
// ==========================================
(function() {
  // Классический Konami: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiSeq = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  // Doom (обратный): ↓ ↓ ↑ ↑ → ← → ← B A
  const doomSeq = [
    'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp',
    'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft',
    'b', 'a'
  ];

  let konamiIndex = 0;
  let doomIndex = 0;
  let resetTimer = null;

  function resetAll() {
    konamiIndex = 0;
    doomIndex = 0;
    clearTimeout(resetTimer);
  }

  // Переключатель overload-режима (ретро-эффекты)
  window.toggleOverload = function() {
    const body = document.body;
    if (body.classList.contains('overload-mode')) {
      body.classList.remove('overload-mode');
      if (typeof showToast === 'function') showToast('Overload выключен', 'fa-solid fa-power-off');
    } else {
      body.classList.add('overload-mode');
      if (typeof showToast === 'function') showToast('⚡ Overload активирован!', 'fa-solid fa-bolt');
    }
  };

  function onKonamiSuccess() {
    resetAll();

    if (document.body.classList.contains('doom-mode') && typeof DoomMode !== 'undefined') {
      DoomMode.toggle(false);
    }

    if (typeof unlockAchievement === 'function') unlockAchievement('konami');
    if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');

    if (typeof BlockBlastGame !== 'undefined') {
      setTimeout(() => BlockBlastGame.open(), 500);
    }
  }

  function onDoomSuccess() {
    resetAll();

    if (document.body.classList.contains('overload-mode')) {
      document.body.classList.remove('overload-mode');
    }

    if (typeof DoomMode !== 'undefined') {
      DoomMode.toggle(false); // false = не с телефона
    }
  }

  function handleKeydown(e) {
    if (e.target.matches('input, textarea, select') || e.target.isContentEditable) {
      return;
    }

    const key = e.key.toLowerCase();
    let matchedAny = false;

    // Konami
    if (key === konamiSeq[konamiIndex].toLowerCase()) {
      konamiIndex++;
      matchedAny = true;
      if (konamiIndex === konamiSeq.length) {
        e.preventDefault();
        onKonamiSuccess();
        konamiIndex = 0;
        doomIndex = 0;
        return;
      }
    } else {
      konamiIndex = (key === konamiSeq[0].toLowerCase()) ? 1 : 0;
    }

    // Doom
    if (key === doomSeq[doomIndex].toLowerCase()) {
      doomIndex++;
      matchedAny = true;
      if (doomIndex === doomSeq.length) {
        e.preventDefault();
        onDoomSuccess();
        konamiIndex = 0;
        doomIndex = 0;
        return;
      }
    } else {
      doomIndex = (key === doomSeq[0].toLowerCase()) ? 1 : 0;
    }

    if (matchedAny) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(resetAll, 2000);
    }
  }

  document.addEventListener('keydown', handleKeydown);
})();

