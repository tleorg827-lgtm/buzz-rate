// ==========================================
// 0. ЗВУКОВОЙ ДИЗАЙН (СИНТЕЗАТОР V.2)
// ==========================================
const AudioSys = (function() {
  let ctx;
  let isMuted = false;

  if (localStorage.getItem('buzz_sound_off') === 'true') isMuted = true;

  function getCtx() {
    if (!ctx) {
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
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  
  function resume() {
    if (!ctx) getCtx();
    else if (ctx.state === 'suspended') ctx.resume();
  }
  
  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('buzz_sound_off', isMuted);
    return isMuted;
  }

  function play(type) {
    if (isMuted) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);

      if (type === 'click') {
        osc.type = 'square'; 
        osc.frequency.value = 1000; 
        gain.gain.setValueAtTime(0.12, c.currentTime); // Было 0.04
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
        osc.start(c.currentTime); osc.stop(c.currentTime + 0.05);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.value = 400; osc.frequency.linearRampToValueAtTime(800, c.currentTime + 0.1);
        gain.gain.setValueAtTime(0.10, c.currentTime); // Было 0.04
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
        osc.start(c.currentTime); osc.stop(c.currentTime + 0.15);
      } else if (type === 'error') {
        osc.type = 'sawtooth'; 
        osc.frequency.value = 150;
        gain.gain.setValueAtTime(0.15, c.currentTime); // Было 0.05
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
        osc.start(c.currentTime); osc.stop(c.currentTime + 0.25);
      } else if (type === 'achievement') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, c.currentTime);
        osc.frequency.setValueAtTime(659, c.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, c.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, c.currentTime); // Было 0.06
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
        osc.start(c.currentTime); osc.stop(c.currentTime + 0.4);
      }
    } catch(e) {}
  }
  
    return { play, toggleMute, isMuted: () => isMuted, resume };
})();

// УМНАЯ СЛУШАТЕЛЬ: не берем в расчет кнопки видео, скролла и переходы по ссылкам
document.addEventListener('click', function(e) {
  const target = e.target.closest('button, .filter-btn, .fav-btn, .cmp-btn, .calc-option, .mobile-link-btn');
  if (target && !target.closest('.modal-bottom-actions') && !target.closest('.scroll-top-btn') && !target.getAttribute('href')) {
    AudioSys.play('click');
  }
});


// ==========================================
// 0.5 СИСТЕМА ДОСТИЖЕНИЙ
// ==========================================
const achievements = {
  random: { name: 'Фатализм', icon: 'fa-dice', text: 'Доверился выбору системы', tier: 'bronze' },
  fav3: { name: 'Любитель энергетиков', icon: 'fa-heart', text: 'Добавил 3 напитка в избранное', tier: 'silver' },
  matrix: { name: 'Проснулся', icon: 'fa-terminal', text: 'Нашел режим Матрицы', tier: 'gold' },
  caffeine: { name: 'Сердце-мотор', icon: 'fa-heart-crack', text: 'Превысил суточную норму кофеина', tier: 'diamond' },
  key: { name: 'Мастер взлома', icon: 'fa-key', text: 'Ввел секретный ключ', tier: 'purple' },
   godmode: { name: 'Режим Бога', icon: 'fa-crown', text: 'Активировал скрытые привилегии', tier: 'purple' },
  mobile: { name: 'Мобильный снайпер', icon: 'fa-mobile-screen', text: 'Нашёл пасхалку только для телефона', tier: 'gold' }
};

function unlockAchievement(id) {
  if (localStorage.getItem('ach_' + id)) return; 
  localStorage.setItem('ach_' + id, 'true');
  const ach = achievements[id];
  if (!ach) return;
  
  AudioSys.play('achievement');
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
console.log('%cВ сыщика решил поиграть?', 'font-size:16px;color:#4ade80;font-family:monospace;');
console.log('%c       БЛЯ, ладно вот подсказки:', 'font-size:22px;color:#00ff41;font-family:monospace;text-shadow:0 0 8px #00ff41;');
console.log('%cПопробуй код-конами на клавиатуре...и посмотри обзор', 'font-size:13px;color:#00e676;font-family:monospace;');
console.log('%cИли поиграйся с темой.', 'font-size:13px;color:#00e676;font-family:monospace;');
console.log('%c[Debug]%c session src: тут был я', 'color:#555;', 'color:#555;');

(function() {
  var KEY = 'buzzrate_visits';
  var now = new Date();
  var visit = {
    date: now.toLocaleString('ru-RU'),
    screen: screen.width + 'x' + screen.height,
    platform: navigator.userAgent.indexOf('Capacitor') !== -1 ? 'Приложение' : 'Сайт'
  };

  var visits = JSON.parse(localStorage.getItem(KEY) || '[]');
  visits.push(visit);
  if (visits.length > 50) visits = visits.slice(-50);
  localStorage.setItem(KEY, JSON.stringify(visits));

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
  const last = parseInt(localStorage.getItem(CACHE_KEY) || '0', 10);
  if (Date.now() - last < 3600000) return; // 1 час
  
  localStorage.setItem(CACHE_KEY, String(Date.now()));
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
  { brand: "Monster Energy - Nitro", key: "monster", flavor: "500 мл", rating: 8, img: "images/image_2.webp", caffeine: "160 мг", sugar: "54 г", cal: "223 kcal", ph: "3.5", video: "7361838290757873979" },

  { brand: "Monster Energy - Ultra blue", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.4", video: "" },

  { brand: "Monster Energy - Ultra black", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-black.webp", caffeine: "150 мг", sugar: "0 г", cal: "15 kcal", ph: "3.6", video: "" },

  { brand: "Monster Energy - Juiced Viking", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster_viking.webp", caffeine: "160 мг", sugar: "54 г", cal: "215 kcal", ph: "3.7", video: "" },
 { brand: "Monster Energy - Rio Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/rio-punsh.webp", caffeine: "150 мг", sugar: "35 г", cal: "152 kcal", ph: "3.8", video: "" },

 { brand: "Monster Energy - Ultra Gold (lando Norris)", key: "monster", flavor: "500 мл", rating: 8, img: "images/lando_noris.webp", caffeine: "160 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "" },

 { brand: "Monster Energy - Nitro Cosmic Peach", key: "monster", flavor: "500 мл", rating: 8, img: "images/nitro-cosmic-peach.webp", caffeine: "160 мг", sugar: "53 г", cal: "200 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Juiced Riper", key: "monster", flavor: "500 мл", rating: 8, img: "images/juiced-riper.webp", caffeine: "160 мг", sugar: "45 г", cal: "175 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Mixxd Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/mixxd-punsh.webp", caffeine: "160 мг", sugar: "45 г", cal: "190 kcal", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Rosa ", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-rosa.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Rehab Green Tea ", key: "monster", flavor: "500 мл", rating: 8, img: "images/rehab-green-tea.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "50 kcal", ph: "4.6", video: "" },

 { brand: "Monster Energy - Rehab Tea + Lemonade ", key: "monster", flavor: "500 мл", rating: 8, img: "images/tea-lemonade.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "55 kcal", ph: "4.4", video: "" },

 { brand: "Monster Energy - Rehab Tea + Peach ", key: "monster", flavor: "500 мл", rating: 9, img: "images/rehab-tea-peach.webp", caffeine: "160 мг", sugar: "12 г", cal: "59 kcal", ph: "4.4", video: "" },

 { brand: "Monster Energy - Ultra Sunrise", key: "monster", flavor: "473 мл", rating: 8, img: "images/ultra-sunrise.webp", caffeine: "155 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "" },

 { brand: "Monster Energy - Reserve White Pineapple Flavour ", key: "monster", flavor: "500 мл", rating: 8, img: "images/reserve-white-pineapple.webp", caffeine: "160 мг", sugar: "30 г", cal: "135 kcal", ph: "3.6", video: "" },

 { brand: "Monster Energy - Reserve Peaches n' Crème ", key: "monster", flavor: "473 мл", rating: 8, img: "images/reserve-peaches-creme.webp", caffeine: "175 мг", sugar: "28 г", cal: "120 kcal", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Fantasy Ruby Red ", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-fantasy-ruby-red.webp", caffeine: "160 мг", sugar: "0 г", cal: "14 kcal", ph: "3.4", video: "" },

 { brand: "Monster Energy - Ultra Peachy Keen", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-peach-keen.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.2", video: "" },

 { brand: "Monster Energy - Ultra Blue Hawaiian ", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue-hawaiian.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - M3 Extra Strength ", key: "monster", flavor: "150 мл", rating: 8, img: "images/m3-extra-strength.webp", caffeine: "140 мг", sugar: "10 г", cal: "65 kcal", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Vice Guava", key: "monster", flavor: "473 мл", rating: 9, img: "images/ultra-vice-guava.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "" },

 { brand: "Monster Energy - Ultra Violet", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-violet.webp", caffeine: "150 мг", sugar: "0 г", cal: "13 kcal", ph: "3.6", video: "" },

 { brand: "Monster Energy - The Doctor VR46", key: "monster", flavor: "500 мл", rating: 8, img: "images/vr-46.webp", caffeine: "160 мг", sugar: "52 г", cal: "219 kcal", ph: "3", video: "" },
  
 { brand: "Monster Energy - Juiced Juce", key: "monster", flavor: "500 мл", rating: 8, img: "images/juced-juce.webp", caffeine: "160 мг", sugar: "49 г", cal: "211 kcal", ph: "3.4", video: "" },
  // --- HELL (скопируй 11 раз, у тебя 1 оригинал) ---
  { brand: "Hell Energy", key: "hell", flavor: "250 мл", rating: 10, img: "images/image_77-removebg-preview.png", caffeine: "80 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7361838290757873979", badge: "hit" },

  // --- RED BULL (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Red Bull", key: "redbull", flavor: "250 мл", rating: 6, img: "images/image_3.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.4", video: "7659734438976294166" },

  { brand: "Red Bull - The Blue Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-blue-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Ice Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-ice-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Summer Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-summer-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The White Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-white-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Winter Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-winter-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Pink Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-pink-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull-Peach edition", key: "redbull", flavor: "Original, 250 мл", rating: 6, img: "images/redbull-peach.webp", caffeine: "80 мг", sugar: "27.5 г", cal: "115 kcal", ph: "3.2", video: "7659734438976294166" },

  // --- BATTERY (скопируй 4 раза) ---
  { brand: "Battery", key: "battery", flavor: "Original, 330 мл", rating: 7, img: "", caffeine: "120 мг", sugar: "30 г", cal: "150 kcal", ph: "3.2", video: "7361838290757873979" },

  // --- NON STOP (скопируй 3 раза) ---
  { brand: "Non Stop", key: "nonstop", flavor: "Original, 450 мл", rating: 6, img: "", caffeine: "150 мг", sugar: "50 г", cal: "210 kcal", ph: "3.4", video: "7361838290757873979" },

  // --- BURN (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Burn", key: "burn", flavor: "Cherry, 250 мл", rating: 7, img: "images/image_5.webp", caffeine: "75 мг", sugar: "28 г", cal: "118 kcal", ph: "3.6", video: "7361838290757873979" },

  // --- ROCK STAR (скопируй 2 раза) ---
  { brand: "Rockstar", key: "rockstar", flavor: "Original, 500 мл", rating: 5, img: "", caffeine: "160 мг", sugar: "60 г", cal: "250 kcal", ph: "3.3", video: "7361838290757873979" },

  // --- C4 (1 раз) ---
  { brand: "C4", key: "c4", flavor: "Original, 500 мл", rating: 8, img: "", caffeine: "200 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "7361838290757873979" }
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

// ==========================================
// 3. ЛОГИКА ИЗБРАННОГО
// ==========================================
function getFavs() { return JSON.parse(localStorage.getItem('energy_favs') || '[]'); }
function saveFavs(arr) { 
  localStorage.setItem('energy_favs', JSON.stringify(arr)); 
  if (arr.length === 3) unlockAchievement('fav3');
}

// ==========================================
// 4. ГЕНЕРАЦИЯ КАРТОЧЕК ИЗ МАССИВА
// ==========================================
const grid = document.getElementById('cardsGrid');

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
    imgHtml = `<img src="${drink.img}" alt="${drink.brand}" loading="lazy">`;
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
  return card;
}

function renderCards() {
  // Сортировка от большего к меньшему
  const sorted = [...drinks].sort((a, b) => +b.rating - +a.rating);
  grid.innerHTML = '';
  sorted.forEach(drink => grid.appendChild(createCard(drink)));
  initCardEffects(); // Запускаем звезды, счетчики, тилт и лайки для новых карточек
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
const target = document.getElementById('typewriter'); target.classList.add('cursor');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function typeText(el, text, speed = 75) { for (let i = 0; i < text.length; i++) { el.textContent += text[i]; await sleep(speed); } }
async function eraseText(el, speed = 50) { while (el.textContent.length > 0) { el.textContent = el.textContent.slice(0, -1); await sleep(speed); } }
async function typeAboutText() { const t = document.getElementById('about-typewriter'); const txt = "Я занимаюсь обзорами энергетиков. Здесь вы найдете честные и подробные обзоры различных энергетических напитков, их состав, вкус и эффект. Моя цель - помочь вам найти энергетик который подходит именно вам. "; for (let i = 0; i < txt.length; i++) { if (window._stopAboutTyping) { window._stopAboutTyping = false; break; } t.textContent += txt[i]; await sleep(25); } t.classList.remove('cursor-about'); }
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
const ctx = canvas.getContext('2d');
let particles = [];
let particleColor = getComputedStyle(document.body).getPropertyValue('--particle-color').trim();

function resizeCanvas() { 
  // Защита: если размер родителя 0 (браузер еще не загрузился), берем размер окна
  canvas.width = canvas.parentElement.offsetWidth || window.innerWidth; 
  canvas.height = canvas.parentElement.offsetHeight || window.innerHeight; 
}
resizeCanvas(); 
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
obsParticles.observe(canvas.parentElement);

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
let activeBrandFilter = 'all';

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

// Фильтрация
function applyFilters() {
  const activeRatingFilter = document.querySelector('.filter-btn.active:not(.brand-toggle)')?.dataset.filter || 'all';
  const favs = getFavs();
  
  document.querySelectorAll('.energy-card').forEach(card => {
    const r = parseInt(card.dataset.rating);
    const b = card.dataset.brand;
    const drinkId = b + '_' + card.querySelector('.card-flavor').textContent;
    
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
window.addEventListener('scroll', () => { if(window.scrollY > 400) scrollBtn.classList.add('show'); else scrollBtn.classList.remove('show'); });
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const suggestModal = document.getElementById('suggestModal');
document.getElementById('openSuggest').addEventListener('click', () => suggestModal.classList.add('open'));
document.getElementById('closeSuggest').addEventListener('click', () => suggestModal.classList.remove('open'));
suggestModal.addEventListener('click', e => { if(e.target === suggestModal) suggestModal.classList.remove('open'); });
document.getElementById('sendSuggest').addEventListener('click', () => {
  const name = document.getElementById('drinkName').value;
  if(!name.trim()) { document.getElementById('drinkName').style.borderColor = '#ff3b5c'; return; }
  suggestModal.classList.remove('open');
  document.getElementById('drinkName').value = ''; document.getElementById('drinkComment').value = '';
  showToast(`"${name}" отправлен на обзор!`, 'fa-solid fa-check');
});

const modal = document.getElementById('videoModal'), modalInner = document.getElementById('videoModalInner'), modalVideoWrap = document.getElementById('modalVideoWrap'), modalPlaceholder = document.getElementById('modalPlaceholder'), modalProgress = document.getElementById('modalProgress'), modalClose = document.getElementById('modalClose'), modalDot = document.getElementById('modalDot'), modalLabel = document.getElementById('modalLabel'), modalFlavor = document.getElementById('modalFlavor'), modalRatingText = document.getElementById('modalRatingText'), modalTiktokBtn = document.getElementById('modalTiktokBtn');
let progressInterval, currentVideoId;

function openVideoModal(card) {
  const b = card.dataset.brand, vid = card.dataset.video, bn = card.querySelector('.card-brand').textContent, fl = card.querySelector('.card-flavor').textContent, rt = card.dataset.rating;
    currentVideoId = vid; const col = bColors[b]||'#00e676';
  
  // ДОБАВИТЬ ЭТУ ПРОВЕРКУ:
  if (!vid) {
    const old = modalVideoWrap.querySelector('iframe, .no-video-msg'); if(old) old.remove();
    modalPlaceholder.style.display = 'none';
    modalVideoWrap.insertAdjacentHTML('beforeend', `<div class="no-video-msg" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);gap:15px;position:absolute;inset:0;z-index:2;background:#000;"><i class="fa-solid fa-video-slash" style="font-size:48px;opacity:0.3;"></i><p style="margin:0;font-family:'Oswald',sans-serif;font-size:18px;letter-spacing:1px;">ОБЗОР ПОКА НЕТ</p><span style="font-size:13px;">Скоро добавим</span></div>`);
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
    return;
  }

  modalDot.style.background = col; modalDot.textContent = bInit[b]||b[0]; modalLabel.textContent = bn; modalFlavor.textContent = fl; modalRatingText.innerHTML = `Рейтинг: <strong>${rt}/10</strong>`; modalProgress.style.background = col; modalInner.style.setProperty('--modal-glow', col.replace(')', ',0.15)').replace('rgb','rgba'));
  const old = modalVideoWrap.querySelector('iframe'); if(old) old.remove();
  modalPlaceholder.style.display = 'flex'; modalProgress.style.width = '0%';
  modal.classList.add('open'); document.body.style.overflow = 'hidden';
  clearInterval(progressInterval); let p = 0;
  progressInterval = setInterval(() => { p += 0.5; if(p > 95) { p = 95; clearInterval(progressInterval); } modalProgress.style.width = p + '%'; }, 100);
  setTimeout(() => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.tiktok.com/embed/v2/${vid}?mode=0`;
    iframe.allow = 'encrypted-media'; iframe.allowFullscreen = true;
    iframe.style.cssText = 'width:100%;height:100%;border:none;position:absolute;inset:0;z-index:1;';
    iframe.addEventListener('load', () => { modalPlaceholder.style.display = 'none'; clearInterval(progressInterval); modalProgress.style.width = '100%'; setTimeout(() => { modalProgress.style.opacity = '0'; setTimeout(() => { modalProgress.style.opacity = '1'; modalProgress.style.width = '0%'; }, 400); }, 1000); });
    modalVideoWrap.appendChild(iframe);
  }, 500);
}

function closeVideoModal() { 
  modal.classList.remove('open'); document.body.style.overflow = ''; 
  clearInterval(progressInterval); 
  // Очищаем текст, чтобы от рикролла ничего не осталось
  modalLabel.textContent = ''; 
  modalFlavor.textContent = '';
  modalRatingText.innerHTML = '';
    setTimeout(() => {  
    modalVideoWrap.innerHTML = ''; // Очищаем всё (и видео, и заглушки)
    modalVideoWrap.appendChild(modalPlaceholder); // Возвращаем спиннер
    modalPlaceholder.style.display = 'flex'; 
    modalProgress.style.width = '0%'; 
    currentVideoId = null; 
  }, 500);  
}

// FIX 4: Усиленный обработчик — работает на всех устройствах
function handleVideoClose(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  closeVideoModal();
}
modalClose.addEventListener('click', handleVideoClose);
modalClose.addEventListener('pointerdown', handleVideoClose);
modalClose.addEventListener('touchstart', handleVideoClose, { passive: false });
modal.addEventListener('click', e => { if(e.target === modal) closeVideoModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) closeVideoModal(); });
modalTiktokBtn.addEventListener('click', () => { 
  if(currentVideoId) {
    // Формируем ссылку на видео
    let link = `https://www.tiktok.com/@ТВОЙ_НИК/video/${currentVideoId}`;
    
    // Копируем в буфер обмена
    navigator.clipboard.writeText(link).then(() => {
      showToast(`Ссылка скопирована!`, 'fa-solid fa-link');
    }).catch(() => {
      // Если браузер заблокировал копирование, просто показываем тост
      showToast(`Ссылка: ${link}`, 'fa-brands fa-tiktok');
    });
  } 
});
// ==========================================
// 10. МОБИЛЬНОЕ БУРГЕР-МЕНЮ
// ==========================================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = ''; // Возвращаем скролл
}

burgerBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Закрываем меню и ПЛАВНО прокручиваем к нужному месту
document.querySelectorAll('.mobile-link-btn').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Отключаем резкий рывок браузера по умолчанию
    const targetId = link.getAttribute('href'); // Узнаем, куда нажали (например #mapSection)
    
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
      const favBrands = currentFavs.map(f => f.split('_')[0]);

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
// ПАСХАЛКА: KONAMI CODE — РЕЖИМ ПЕРЕГРУЗКИ
// Ретро-эффекты: CRT, пиксели, расхождение теней
// ==========================================
(function() {
  var konamiCode = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'KeyB','KeyA'
  ];
  var konamiIndex = 0;
  var overloadActive = false;

  var DICT_B = {
    'обзор':'наблюдение','обзоры':'наблюдения','обзоров':'наблюдений',
    'энергетик':'объект','энергетика':'объекта','энергетики':'объекты','энергетиков':'объектов',
    'честные':'скрытые','честный':'скрытый','честно':'вслепую',
    'напиток':'источник','напитка':'источника','напитки':'источники','напитков':'источников',
    'состав':'структура','состава':'структуры',
    'вкус':'частота','вкуса':'частоты','вкусом':'частотой',
    'эффект':'реакция','эффекта':'реакции',
    'помочь':'зафиксировать','найти':'отследить','подходит':'подозрителен'
  };

  function applyDict(text, dict) {
    return text.replace(/[а-яА-ЯёЁa-zA-Z]+/g, function(w) {
      var low = w.toLowerCase();
      if (dict[low]) {
        var r = dict[low];
        return (w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase())
          ? r[0].toUpperCase() + r.slice(1) : r;
      }
      return w;
    });
  }

  // Элемент для CRT-искажения краёв (баррель-дисторшн через SVG-фильтр)
  var crtOverlay = null;

  function createCRTOverlay() {
    crtOverlay = document.createElement('div');
    crtOverlay.id = 'crt-overlay';
    crtOverlay.style.cssText = 'position:fixed;inset:0;z-index:999995;pointer-events:none;';
    crtOverlay.innerHTML = '<svg style="width:100%;height:100%;" viewBox="0 0 100 100" preserveAspectRatio="none">' +
      '<defs>' +
        '<filter id="crt-barrel" x="-5%" y="-5%" width="110%" height="110%">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves="1" seed="3" result="noise"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>' +
        '</filter>' +
      '</defs>' +
      '<rect width="100" height="100" fill="none" filter="url(#crt-barrel)" opacity="0.03"/>' +
      '<rect width="100" height="100" fill="none" stroke="rgba(191,255,0,0.04)" stroke-width="2" rx="3"/>' +
    '</svg>';
    document.body.appendChild(crtOverlay);
  }

  function removeCRTOverlay() {
    if (crtOverlay) { crtOverlay.remove(); crtOverlay = null; }
  }

  function toggleOverload() {
    overloadActive = !overloadActive;
    var aboutEl = document.getElementById('about-typewriter');

    if (overloadActive) {
      document.body.classList.add('overload-mode');
      createCRTOverlay();

      // Подмена текста "Обо мне"
      if (aboutEl) {
        window._overloadOrigText = aboutEl.textContent;
        aboutEl.textContent = applyDict(aboutEl.textContent, DICT_B);
      }

      showToast('⚡ РЕЖИМ ПЕРЕГРУЗКИ АКТИВИРОВАН', 'fa-solid fa-bolt');
    } else {
      document.body.classList.remove('overload-mode');
      removeCRTOverlay();

      // Возвращаем оригинальный текст
      if (aboutEl && window._overloadOrigText) {
        aboutEl.textContent = window._overloadOrigText;
        delete window._overloadOrigText;
      }

      showToast('Режим перегрузки отключён', 'fa-solid fa-power-off');
    }
  }

  // Экспортируем toggleOverload в глобал, чтобы мобильные пасхалки могли дёргать
  window.toggleOverload = toggleOverload;

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) { konamiIndex = 0; toggleOverload(); }
    } else { konamiIndex = 0; }
  });
})();
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

    /* МАГИЯ КАРТЫ: Матричный режим (с защитой от ошибок) */
    if (typeof map !== 'undefined' && map && secretMysteryMarker) {
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
        if (markers && markers.length) {
          markers.forEach(m => { try { map.removeLayer(m); } catch(e){} });
        }
      } catch(e) { console.warn('Map not ready for matrix mode', e); }
    }
    
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
// ПАСХАЛКА: СКРЫТЫЙ РИКРОЛЛ (Konami Code)
// Используем нативный плеер, чтобы ТикТок и Ютуб не спойлили
// ==========================================
function openRickrollModal() {
  // === НАСТРОЙКИ ТЕКСТА В МОДАЛКЕ ===
  modalDot.style.background = '#ff0050'; 
  modalDot.textContent = '??'; 
  modalLabel.textContent = 'Секретный энергетик'; 
  modalFlavor.textContent = 'Узнай правду...'; 
  modalRatingText.innerHTML = 'Рейтинг: <strong style="color:#ff0050">∞/10</strong>';
  modalProgress.style.background = '#ff0050';
  // ==================================
  
  // Удаляем старые видео или фреймы если были
  var old = modalVideoWrap.querySelector('iframe, video'); 
  if(old) old.remove();
  
  // Показываем привычную загрузку
  modalPlaceholder.style.display = 'flex'; 
  modalProgress.style.width = '0%';
  modal.classList.add('open'); 
  document.body.style.overflow = 'hidden';
  
  // Имитация загрузки (чтобы человек подумал, что грузится ТикТок)
  clearInterval(progressInterval); 
  let p = 0;
  progressInterval = setInterval(() => { 
    p += 2; 
    if(p > 95) { p = 95; clearInterval(progressInterval); } 
    modalProgress.style.width = p + '%'; 
  }, 50);
  
  setTimeout(() => {
    // Создаем НАТИВНЫЙ видеоплеер (без превьюшек и спойлеров)
    const video = document.createElement('video');
    video.src = 'images/rickroll.mp4'; // Путь к файлу, который ты закинул в папку
    video.autoplay = true;      // Запуск сразу как загрузится
    video.controls = true;      // Покажет кнопку паузы и т.д.
    video.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;z-index:1;background:#000;';
    
    // Как только видео готово — убираем спиннер
    video.addEventListener('canplay', () => { 
      modalPlaceholder.style.display = 'none'; 
      clearInterval(progressInterval); 
      modalProgress.style.width = '100%'; 
      setTimeout(() => { 
        modalProgress.style.opacity = '0'; 
        setTimeout(() => { 
          modalProgress.style.opacity = '1'; 
          modalProgress.style.width = '0%'; 
        }, 400); 
      }, 500); 
    });

        modalVideoWrap.appendChild(video);
    
    // Принудительный запуск для мобильных браузеров
    video.play().catch(() => {});
  }, 500);
}

(function() {
  function hijackClick(e) {
    if (document.body.classList.contains('overload-mode')) {
      e.preventDefault();
      e.stopImmediatePropagation(); 
      e.stopPropagation();
      openRickrollModal();
    }
  }

    var footerTiktok = document.querySelector('.btn-tiktok');
  if (footerTiktok) footerTiktok.addEventListener('click', hijackClick, true);

  var mobTiktok = document.querySelector('.tiktok-mob');
  if (mobTiktok) mobTiktok.addEventListener('click', hijackClick, true);

  var modalTiktok = document.getElementById('modalTiktokBtn');
  if (modalTiktok) modalTiktok.addEventListener('click', hijackClick, true);

  // Слушаем клики по всей сетке карточек (работает даже для новых)
  var cardsGrid = document.getElementById('cardsGrid');
  if (cardsGrid) {
    cardsGrid.addEventListener('click', function(e) {
      if (e.target.closest('[data-open-video]')) {
        hijackClick(e);
      }
    }, true);
  }
})();
// ==========================================
// ПАСХАЛКА: КЛИК НА КОПИРАЙТ — СЕКРЕТНЫЕ ФРАЗЫ
// ==========================================
(function() {
  var copyEl = document.querySelector('.footer-copy span');
  if (!copyEl) return;

  var secrets = [
    'Секретный ингредиент — страсть к кофеину',
    'Этот сайт создан на чистом энтузиазме и энергетиках',
    'Ты нашёл пасхалку!',
    'Если ты читаешь это — ты настоящий детектив',
    '01100010 01110101 01111010 01111010',
    'Лучший энергетик — тот, что в твоей руке прямо сейчас',
  ];

  var secretIndex = 0;
  var isSecret = false;

  copyEl.style.cursor = 'pointer';
  copyEl.style.transition = 'color 0.3s ease';

  copyEl.addEventListener('click', function() {
    if (!isSecret) {
      copyEl.textContent = secrets[secretIndex % secrets.length];
      copyEl.style.color = '#BFFF00';
      copyEl.style.textShadow = '0 0 10px rgba(191,255,0,0.5)';
      isSecret = true;
      secretIndex++;
    } else {
      copyEl.textContent = '© 2026 Buzz Rate. Все права защищены.';
      copyEl.style.color = '';
      copyEl.style.textShadow = '';
      isSecret = false;
    }
  });
})();
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

  if (localStorage.getItem('buzz_key_activated')) {
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
    if (localStorage.getItem('buzz_key_activated')) return;
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
      localStorage.setItem('buzz_key_activated', 'true');
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
    if (localStorage.getItem('buzz_key_activated')) {
      desktopKeyBtn.classList.add('activated');
      desktopKeyBtn.innerHTML = '<i class="fa-solid fa-key"></i> Код активирован';
    }
    desktopKeyBtn.addEventListener('click', function() {
      if (localStorage.getItem('buzz_key_activated')) return;
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
      calcStatus.textContent = 'Система в норме'; calcStatus.style.color = '#00ff41';
    } else if (total <= 350) {
      calcBar.style.background = '#ffd700'; calcText.style.color = '#ffd700';
      calcStatus.textContent = 'Внимание: повышенная нагрузка'; calcStatus.style.color = '#ffd700';
    } else {
      calcBar.style.background = '#ff3b5c'; calcText.style.color = '#ff3b5c';
      calcStatus.textContent = 'ОПАСНОСТЬ: ПРЕВЫШЕН ДОПУСТИМЫЙ ЛИМИТ'; calcStatus.style.color = '#ff3b5c';
            unlockAchievement('caffeine');
    }
        // Сохраняем рекорд дозы кофеина
    if (total > parseInt(localStorage.getItem('buzz_max_caffeine') || 0)) {
      localStorage.setItem('buzz_max_caffeine', total);
    }
  }

  function closeCalcModal() {
    calcModal.classList.remove('open');
    document.body.style.overflow = '';
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
    document.body.style.overflow = 'hidden';
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
    document.body.style.overflow = ''; 
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
      document.body.style.overflow = 'hidden';
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

// ПЕРЕРИСОВЫВАЕМ КАРТОЧКИ
renderCards();

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

// ==========================================
// 16. ТЕРМИНАЛ И ДОСЬЕ АГЕНТА V.6.2 (ФИНАЛ)
// ==========================================
(function() {
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

  function attachTerminalListener() {
    const nicknameEl = document.querySelector('.correct-name');
    if (nicknameEl) {
      nicknameEl.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        termOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof AudioSys !== 'undefined') AudioSys.play('open');
        setTimeout(() => termInput.focus(), 600);
      });
    } else {
      setTimeout(attachTerminalListener, 150);
    }
  }
  attachTerminalListener();

  function closeTerm() { 
    termOverlay.classList.remove('active'); 
    document.body.style.overflow = ''; 
    secretSeq = 0; 
    isRootAccess = false; 
    godModeActive = false;
    resetPending = false;
  }
  document.getElementById('closeTerminal').addEventListener('click', closeTerm);

  function closeProf() { profModal.classList.remove('open'); document.body.style.overflow = ''; }
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
    
    termOutput.innerHTML += `<div style="color:var(--accent);">> ${cmd}</div>`;
    
    let response = '';
    const args = cmd.split(' ');
    const command = args[0];

    // === 1. СИСТЕМА СБРОСА (Y/N) ===
    if (resetPending) {
      if (command === 'y' || command === 'yes') {
        resetPending = false;
        response = `Очистка базы данных...<br><span style="color:#00ff41;">[УСПЕШНО]</span><br>Статус: 0<br>Вы свободны. До свидания.`;
        setTimeout(() => { localStorage.clear(); location.reload(); }, 2000);
      } 
      else if (command === 'n' || command === 'no') {
        resetPending = false;
        response = `Операция отменена.<br><span style="color:#fbbf24;">Мы всегда вам рады. Приходите еще.</span>`;
      } 
      else {
        response = `<span style="color:#ff3b5c;">ОШИБКА: Неверный ввод. Введите Y или N.</span>`;
      }
    }

    // === 2. СКРЫТЫЙ ПАРОЛЬ: my -> name -> vox ===
    else if (command === 'my' && secretSeq === 0) { secretSeq++; response = "..."; }
    else if (command === 'name' && secretSeq === 1) { secretSeq++; response = "..?"; }
    else if (command === 'vox' && secretSeq === 2) {
      secretSeq = 0; isRootAccess = true;
      response = `<span style="color:#c084fc;">ПАРОЛЬ ПРИНЯТ. УРОВЕНЬ ДОПУСКА: ROOT.</span><br>Выберите действие:<br>  <span style="color:#fbbf24;">1</span> - Выдать секретное достижение<br>  <span style="color:#fbbf24;">2</span> - Вкл/Выкл РЕЖИМ БОГА`;
    }
    else if (secretSeq > 0 && !isRootAccess && command !== 'my' && command !== 'name' && command !== 'vox') { secretSeq = 0; }

    // === 3. ДЕЙСТВИЯ ПОСЛЕ ПАРОЛЯ ===
    else if (isRootAccess && command === '1') {
      unlockAchievement('godmode');
      response = `<span style="color:#fbbf24;">Достижение "Режим Бога" разблокировано в системе.</span>`;
    }
    else if (isRootAccess && command === '2') {
      if (!godModeActive) {
        godModeActive = true;
        realMaxCaff = parseInt(localStorage.getItem('buzz_max_caffeine') || 0);
        response = `<span style="color:#c084fc;">ИНИЦИАЛИЗАЦИЯ РЕЖИМА БОГА...</span><br>Ограничения сняты. Рекорд кофеина: 9999 мг.<br>Введите "2" еще раз для деактивации.`;
        localStorage.setItem('buzz_max_caffeine', '9999');
        for (let key in achievements) { localStorage.setItem('ach_' + key, 'true'); }
        if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
      } else {
        godModeActive = false;
        response = `<span style="color:#888;">РЕЖИМ БОГА ДЕАКТИВИРОВАН.</span><br>Реальные данные восстановлены.`;
        localStorage.setItem('buzz_max_caffeine', realMaxCaff);
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
      <span style="color:#fbbf24;">exit</span> - Отключиться`;
    } 
    else if (command === 'analyze') {
      const brand = args[1];
      if (!brand) { response = `<span style="color:#ff3b5c;">ОШИБКА: Укажите марку (пример: analyze hell).</span>`; }
      else {
        const target = drinks.find(d => d.key === brand);
        if (!target) { response = `<span style="color:#ff3b5c;">ОШИБКА: База данных не содержит марку "${brand}".</span>`; }
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
      const item = args.slice(1).join(' ');
      if (!item) { response = `<span style="color:#ff3b5c;">ОШИБКА: Что купить?</span>`; }
      else { response = `Попытка покупки "${item}"...<br><span style="color:#ff3b5c;">ОШИБКА: Карта отклонена. Иди пей воду.</span>`; if (typeof AudioSys !== 'undefined') AudioSys.play('error'); }
    }
    else if (command === 'sudo' && args[1] === 'drink') {
      response = `Вы попытались выпить консоль...<br>Кофеин: <span style="color:#ff3b5c;">+9999 мг</span><br>Статус: Сервер переваривает...<br><span style="color:#888;">[ОШИБКА: ПЕЧЕНЬ НЕ НАЙДЕНА]</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }
    else if (command === 'cat' && args[1] === 'classified.txt') {
      response = `РАСШИФРОВКА ФАЙЛА...<br>--- СЕКРЕТНО ---<br>Протокол "Зелёный Бык":<br>Если смешать Hell Energy и Red Bull, получится просто грязная вода с двойной дозой таурина.<br>Не пытайтесь повторить это дома. Мы уже пытались.<br>--- КОНЕЦ ФАЙЛА ---`;
    }
    else if (command === 'ls') { response = `Обнаружено ${drinks.length} объектов в сети.`; } 
    else if (command === 'scan') {
      const brand = args[1];
      if (!brand) { response = `<span style="color:#ff3b5c;">ОШИБКА: Укажите марку.</span>`; }
      else {
        const count = drinks.filter(d => d.key === brand).length;
        if (count === 0) response = `Скан "${brand}": Объекты не найдены.`;
        else response = `Скан "${brand}": Найдено ${count} объектов.`;
      }
    } 
    else if (command === 'whoami') {
      const id = Math.floor(Math.random() * 9000 + 1000);
      response = `AGENT_ID: #${id}<br>STATUS: Активен<br>УРОВЕНЬ ДОПУСКА: Секретный`;
    }
    else if (command === 'date') { response = `Текущее время сервера: ${new Date().toLocaleString('ru-RU')}`; }
    else if (command === 'coffee') {
      const rd = drinks[Math.floor(Math.random() * drinks.length)];
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
    else if (command === 'status') {
      closeTerm(); renderProfile(); 
      setTimeout(() => { profModal.classList.add('open'); document.body.style.overflow = 'hidden'; }, 300); 
      return; 
    } 
    else if (command === 'clear') { termOutput.innerHTML = ''; return; } 
    else if (command === 'exit') { closeTerm(); return; } 
    else if (cmd === '') { return; } 
    else {
      response = `<span style="color:#ff3b5c;">Команда '${command}' не распознана. Введите help.</span>`;
      if (typeof AudioSys !== 'undefined') AudioSys.play('error');
    }

    termOutput.innerHTML += `<div>${response}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;
  });

  // Логика Досье (без изменений)
  function renderProfile() {
    const visits = JSON.parse(localStorage.getItem('buzzrate_visits') || '[]').length;
    const favs = JSON.parse(localStorage.getItem('energy_favs') || '[]');
    const maxCaff = parseInt(localStorage.getItem('buzz_max_caffeine') || 0);

    const brandCounts = {};
    favs.forEach(f => { const b = f.split('_')[0]; brandCounts[b] = (brandCounts[b] || 0) + 1; });
    let topBrand = 'Нет данных'; let maxCount = 0;
    for (let b in brandCounts) { if (brandCounts[b] > maxCount) { maxCount = brandCounts[b]; topBrand = bNames[b] || b; } }

    let score = 0;
    score += Math.min(visits * 2, 50); 
    score += Math.min(favs.length * 5, 30); 
    score += Math.min(Math.floor(maxCaff / 20), 20); 
    let achCount = 0; for (let key in achievements) { if (localStorage.getItem('ach_' + key)) achCount++; }
    score += achCount * 10; 

    let rank, rankClass;
    if (score >= 120) { rank = 'Легенда Базз Рейта'; rankClass = 'rank-legend'; }
    else if (score >= 80) { rank = 'Кофеиновый маньяк'; rankClass = 'rank-maniac'; }
    else if (score >= 50) { rank = 'Опытный агент'; rankClass = 'rank-agent'; }
    else if (score >= 20) { rank = 'Стажер'; rankClass = 'rank-intern'; }
    else { rank = 'Новичок'; rankClass = 'rank-newbie'; }

    let achHtml = '';
    for (let key in achievements) {
      const isUnlocked = localStorage.getItem('ach_' + key);
      const tierClass = isUnlocked ? ('unlocked tier-' + achievements[key].tier) : 'locked';
      achHtml += `
        <div class="profile-ach-item ${tierClass}">
          <i class="fa-solid ${isUnlocked ? achievements[key].icon : 'fa-question'}"></i>
          <span>${isUnlocked ? achievements[key].name : '???'}</span>
        </div>
      `;
    }

    profContent.innerHTML = `
      <div class="profile-stat-row">
        <span class="profile-stat-label">КЛАСС АГЕНТА</span>
        <span class="profile-stat-val ${rankClass}">${rank} (${score} очков)</span>
      </div>
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
      <div style="font-family:'Oswald'; color:#888; margin-top:25px; margin-bottom:10px; letter-spacing:1px;">ДОСТИЖЕНИЯ (${achCount}/6)</div>
      <div class="profile-ach-grid">${achHtml}</div>
    `;
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
    } else {
      this.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      this.setAttribute('aria-label', 'Выключить звук');
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

  const pattern = ['up','up','down','down','left','right','left','right'];
  let index = 0;
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

    if (dir === pattern[index]) {
      index++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => index = 0, 2000);

      if (index === pattern.length) {
        index = 0;
        if (typeof window.toggleOverload === 'function') {
          window.toggleOverload();
          showToast('🎮 Konami свайпами!', 'fa-solid fa-gamepad');
          unlockAchievement('mobile');
        }
      }
    } else {
      index = (dir === pattern[0]) ? 1 : 0;
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

  searchInput.addEventListener('input', (e) => {
    filterCards(e.target.value.toLowerCase().trim());
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

  let currentDrink = null;

  function open(drink) {
    if (!drink) return;
    currentDrink = drink;
    const drinkIndex = drinks.indexOf(drink);

    // Заполняем基本信息
    img.src = drink.img || '';
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

    // Кнопка видео
    if (drink.video && drink.video.trim()) {
      videoBtn.classList.remove('no-video');
      videoBtn.onclick = () => {
        closeModal();
        if (typeof openVideoModal === 'function') openVideoModal(drink);
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
      if (typeof addToCompare === 'function') addToCompare(drink);
      else if (typeof toggleCompare === 'function') toggleCompare(drink);
      showToast('Добавлено в сравнение', 'fa-solid fa-code-compare');
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
    document.body.style.overflow = 'hidden';
    if (window.AudioSys) AudioSys.play('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
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
        <img src="${item.drink.img || ''}" alt="${item.drink.brand}" loading="lazy">
        <span>${item.drink.brand.substring(0, 18)}</span>
      </div>
    `).join('');

    similarList.querySelectorAll('.similar-item').forEach((el, i) => {
      el.onclick = () => open(similar[i].drink);
    });
  }

  function addToHistory(drink) {
    const KEY = 'buzz_view_history';
    const history = JSON.parse(localStorage.getItem(KEY) || '[]');
    // Удаляем дубликаты
    const filtered = history.filter(item => item.brand !== drink.brand);
    // Добавляем в начало
    filtered.unshift({ brand: drink.brand, img: drink.img, key: drink.key });
    // Ограничиваем 10 элементами
    localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, 10)));
  }

  function renderHistory() {
    const KEY = 'buzz_view_history';
    const history = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (history.length === 0) {
      historySection.style.display = 'none';
      return;
    }
    historySection.style.display = 'block';
    historyList.innerHTML = history.slice(0, 8).map(item => `
      <div class="history-item" data-brand="${item.brand}">
        <img src="${item.img || ''}" alt="${item.brand}" loading="lazy">
        <span>${item.brand.substring(0, 14)}</span>
      </div>
    `).join('');

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
      <img class="top10-image" src="${drink.img || ''}" alt="${drink.brand}" loading="lazy">
      <div class="top10-info">
        <h4>${drink.brand}</h4>
        <p>${drink.flavor || ''} • ${drink.caffeine || '—'}</p>
      </div>
      <div class="top10-rating">${drink.rating}<small>/10</small></div>
    </div>
  `).join('');

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
  const stored = JSON.parse(localStorage.getItem(KEY) || '{}');

  let drinkIndex;
  if (stored.date === today && drinks[stored.index]) {
    drinkIndex = stored.index;
  } else {
    drinkIndex = Math.floor(Math.random() * drinks.length);
    localStorage.setItem(KEY, JSON.stringify({ date: today, index: drinkIndex }));
  }

  const drink = drinks[drinkIndex];
  if (!drink) return;

  document.getElementById('ddImage').src = drink.img || '';
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
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (data.date !== getToday()) return { date: getToday(), total: 0, drinks: [] };
    return data;
  }

  function add(drink) {
    const mg = parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0;
    if (mg === 0) return;
    const data = getTodayData();
    data.total += mg;
    data.drinks.push({ brand: drink.brand, mg: mg, time: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(data));
    updateWidget();
    
    if (data.total > MAX_DAILY && !localStorage.getItem('ach_caffeine')) {
      unlockAchievement('caffeine');
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
    localStorage.setItem(KEY, JSON.stringify(data));
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
      header.classList.remove('scrolling');
      lastScroll = currentScroll;
      ticking = false;
      return;
    }
    
    header.classList.add('scrolling');
    
    // Скролл вниз — прячем
    if (currentScroll > lastScroll + 8 && currentScroll > 150) {
      header.classList.add('header-hidden');
    } 
    // Скролл вверх — показываем
    else if (currentScroll < lastScroll - 5) {
      header.classList.remove('header-hidden');
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
if (document.readyState !== 'loading') {
  setTimeout(() => {
    renderTop10();
    renderStats();
    renderDailyDrink();
  }, 100);
}


// ============================================================
// FIX 3: FALLBACK ДЛЯ КАРТИНОК + ПРИНУДИТЕЛЬНАЯ ЗАГРУЗКА
// Если картинка не загрузилась — показываем placeholder с первой буквой бренда
// Также: перепроверяем загрузку через 1.5 сек (для мобилы с медленным интернетом)
// ============================================================
(function() {
  function handleImgError(img) {
    if (img.dataset.errorHandled) return;
    img.dataset.errorHandled = '1';
    
    const card = img.closest('.energy-card');
    const brand = card ? (card.querySelector('.card-brand')?.textContent || 'B') : 'B';
    const initial = brand.charAt(0).toUpperCase();
    
    // Прячем битую картинку
    img.style.opacity = '0';
    img.style.width = '80px';
    img.style.height = '120px';
    img.style.background = 'linear-gradient(135deg,#1a1a24,#0d0d12)';
    img.style.borderRadius = '8px';
    
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
  
  // Слушаем ошибки всех img (capturing phase)
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      handleImgError(e.target);
    }
  }, true);
  
  // Принудительная проверка через 1.5 сек
  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete && img.naturalWidth === 0 && !img.dataset.errorHandled) {
        handleImgError(img);
      }
    });
  }, 1500);
  
  // Ещё раз через 3 сек (для совсем медленного интернета)
  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => {
      if (img.complete && img.naturalWidth === 0 && !img.dataset.errorHandled) {
        handleImgError(img);
      }
    });
  }, 3000);
  
  // Для динамически добавленных картинок (модалка, карточки)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const imgs = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
        imgs.forEach(img => {
          img.addEventListener('error', () => handleImgError(img));
          // Если уже загрузилось с ошибкой
          if (img.complete && img.naturalWidth === 0) {
            handleImgError(img);
          }
        });
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
