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
// Распознаем приложение и убираем частицы (Canvas), чтобы не тормозило
if (window.Capacitor) {
  document.body.classList.add('is-native-app');
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if(canvas) canvas.remove(); // Полностью удаляем летящие точки в приложении
  });
}
// ==========================================
// СИСТЕМА ОБНОВЛЕНИЙ ПРИЛОЖЕНИЯ
// ==========================================
const APP_VERSION = 1; // Когда будешь выпускать обновление, поменяй цифру на 2, потом на 3 и т.д.

function checkForUpdates() {
  // Тихонько спрашиваем сервер Netlify
  fetch('https://tourmaline-medovik-3b7efd.netlify.app/version.json')
    .then(response => response.json())
    .then(data => {
      // Если версия на сервере больше, чем у нас в телефоне
      if (data.version > APP_VERSION) {
        document.getElementById('updateModal').style.display = 'flex';
      }
    })
    .catch(() => {
      // Если нет интернета - просто ничего не делаем, молча работаем
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
  { brand: "Monster Energy - Nitro", key: "monster", flavor: "500 мл", rating: 8, img: "images/image_2.webp", caffeine: "160 мг", sugar: "54 г", cal: "223 ккал", ph: "3.5", video: "7361838290757873979" },

  { brand: "Monster Energy - Ultra blue", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra blue.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 ккал", ph: "3.4", video: "" },

  { brand: "Monster Energy - Ultra black", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-black.webp", caffeine: "150 мг", sugar: "0 г", cal: "15 ккал", ph: "3.6", video: "" },

  { brand: "Monster Energy - Juiced Viking", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster_viking.webp", caffeine: "160 мг", sugar: "54 г", cal: "215 ккал", ph: "3.7", video: "" },
 { brand: "Monster Energy - Rio Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/Rio-punsh.webp", caffeine: "150 мг", sugar: "35 г", cal: "152 ккал", ph: "3.8", video: "" },

 { brand: "Monster Energy - Ultra Gold (lando Norris)", key: "monster", flavor: "500 мл", rating: 8, img: "images/lando_noris.webp", caffeine: "160 мг", sugar: "0 г", cal: "10 ккал", ph: "3.3", video: "" },

 { brand: "Monster Energy - Nitro Cosmic Peach", key: "monster", flavor: "500 мл", rating: 8, img: "images/Nitro_Cosmic_Peach.webp", caffeine: "160 мг", sugar: "53 г", cal: "200 ккал", ph: "3.5", video: "" },

 { brand: "Monster Energy - Juiced Riper", key: "monster", flavor: "500 мл", rating: 8, img: "images/Juiced-Riper.webp", caffeine: "160 мг", sugar: "45 г", cal: "175 ккал", ph: "3.5", video: "" },

 { brand: "Monster Energy - Mixxd Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/Mixxd-Punsh.webp", caffeine: "160 мг", sugar: "45 г", cal: "190 ккал", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Rosa ", key: "monster", flavor: "500 мл", rating: 8, img: "images/Ultra-Rosa.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 ккал", ph: "3.5", video: "" },

 { brand: "Monster Energy - Rehab Green Tea ", key: "monster", flavor: "500 мл", rating: 8, img: "images/Rehab-Green-Tea.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "50 ккал", ph: "4.6", video: "" },

 { brand: "Monster Energy - Rehab Tea + Lemonade ", key: "monster", flavor: "500 мл", rating: 8, img: "images/Tea + Lemonade.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "55 ккал", ph: "4.4", video: "" },

 { brand: "Monster Energy - Rehab Tea + Peach ", key: "monster", flavor: "500 мл", rating: 9, img: "images/Rehab-Tea-+ Peach.webp", caffeine: "160 мг", sugar: "12 г", cal: "59 ккал", ph: "4.4", video: "" },

 { brand: "Monster Energy - Ultra Sunrise", key: "monster", flavor: "473 мл", rating: 8, img: "images/Ultra-Sunrise.webp", caffeine: "155 мг", sugar: "0 г", cal: "10 ккал", ph: "3.3", video: "" },

 { brand: "Monster Energy - Reserve White Pineapple Flavour ", key: "monster", flavor: "500 мл", rating: 8, img: "images/Reserve-White-Pineapple-Flavour.webp", caffeine: "160 мг", sugar: "30 г", cal: "135 ккал", ph: "3.6", video: "" },

 { brand: "Monster Energy - Reserve Peaches n' Crème ", key: "monster", flavor: "473 мл", rating: 8, img: "images/Reserve-Peaches-n-Crème.webp", caffeine: "175 мг", sugar: "28 г", cal: "120 ккал", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Fantasy Ruby Red ", key: "monster", flavor: "500 мл", rating: 8, img: "images/Ultra-Fantasy-Ruby-Red.webp", caffeine: "160 мг", sugar: "0 г", cal: "14 ккал", ph: "3.4", video: "" },

 { brand: "Monster Energy - Ultra Peachy Keen", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-peach-keen.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 ккал", ph: "3.2", video: "" },

 { brand: "Monster Energy - Ultra Blue Hawaiian ", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue-hawaiian.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 ккал", ph: "3.5", video: "" },

 { brand: "Monster Energy - M3 Extra Strength ", key: "monster", flavor: "150 мл", rating: 8, img: "images/m3-extra-strength.webp", caffeine: "140 мг", sugar: "10 г", cal: "65 ккал", ph: "3.7", video: "" },

 { brand: "Monster Energy - Ultra Vice Guava", key: "monster", flavor: "473 мл", rating: 9, img: "images/ultra-vice-guava.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 ккал", ph: "3.5", video: "" },

 { brand: "Monster Energy - Ultra Violet", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-violet.webp", caffeine: "150 мг", sugar: "0 г", cal: "13 ккал", ph: "3.6", video: "" },

 { brand: "Monster Energy - The Doctor VR46", key: "monster", flavor: "500 мл", rating: 8, img: "images/vr-46.webp", caffeine: "160 мг", sugar: "52 г", cal: "219 ккал", ph: "3", video: "" },
  
 { brand: "Monster Energy - Juiced Juce", key: "monster", flavor: "500 мл", rating: 8, img: "images/juced-juce.webp", caffeine: "160 мг", sugar: "49 г", cal: "211 ккал", ph: "3.4", video: "" },
  // --- HELL (скопируй 11 раз, у тебя 1 оригинал) ---
  { brand: "Hell Energy", key: "hell", flavor: "Original, 250 мл", rating: 10, img: "images/image_77-removebg-preview.png", caffeine: "80 мг", sugar: "27 г", cal: "115 ккал", ph: "3.1", video: "7361838290757873979", badge: "hit" },

  // --- RED BULL (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Red Bull", key: "redbull", flavor: "Original, 250 мл", rating: 6, img: "images/image_3.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 ккал", ph: "3.4", video: "7659734438976294166" },

  { brand: "Red Bull-Peach edition", key: "redbull", flavor: "Original, 250 мл", rating: 6, img: "images/Peach-red.webp", caffeine: "80 мг", sugar: "27.5 г", cal: "115 ккал", ph: "3.2", video: "7659734438976294166" },

  // --- BATTERY (скопируй 4 раза) ---
  { brand: "Battery", key: "battery", flavor: "Original, 330 мл", rating: 7, img: "", caffeine: "120 мг", sugar: "30 г", cal: "150 ккал", ph: "3.2", video: "7361838290757873979" },

  // --- NON STOP (скопируй 3 раза) ---
  { brand: "Non Stop", key: "nonstop", flavor: "Original, 450 мл", rating: 6, img: "", caffeine: "150 мг", sugar: "50 г", cal: "210 ккал", ph: "3.4", video: "7361838290757873979" },

  // --- BURN (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Burn", key: "burn", flavor: "Cherry, 250 мл", rating: 7, img: "images/image_5.webp", caffeine: "75 мг", sugar: "28 г", cal: "118 ккал", ph: "3.6", video: "7361838290757873979" },

  // --- ROCK STAR (скопируй 2 раза) ---
  { brand: "Rockstar", key: "rockstar", flavor: "Original, 500 мл", rating: 5, img: "", caffeine: "160 мг", sugar: "60 г", cal: "250 ккал", ph: "3.3", video: "7361838290757873979" },

  // --- C4 (1 раз) ---
  { brand: "C4", key: "c4", flavor: "Original, 500 мл", rating: 8, img: "", caffeine: "200 мг", sugar: "0 г", cal: "10 ккал", ph: "3.5", video: "7361838290757873979" }
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
function saveFavs(arr) { localStorage.setItem('energy_favs', JSON.stringify(arr)); }

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
  
  let imgHtml;
  if (drink.img) {
    imgHtml = `<img src="${drink.img}" alt="${drink.brand}" loading="lazy">`;
  } else {
    imgHtml = `<div class="placeholder-img">${drink.brand}<br><span>${drink.flavor}</span></div>`;
  }

  card.innerHTML = `
    <div class="card-strip"></div><div class="card-glare"></div>
    ${drink.badge ? `<div class="card-badge"><i class="fa-solid fa-fire"></i> Хит</div>` : ''}
    <button class="fav-btn ${getFavs().includes(drink.key + '_' + drink.flavor) ? 'active' : ''}" aria-label="В избранное">
      <i class="fa-${getFavs().includes(drink.key + '_' + drink.flavor) ? 'solid' : 'regular'} fa-heart"></i>
    </button>
    <div class="card-image">${imgHtml}</div>
    <div class="card-content">
      <h3 class="card-brand">${drink.brand}</h3><p class="card-flavor">${drink.flavor}</p>
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

  // Обработка клика по сердечку
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', e => {
      e.stopPropagation();
      const card = newBtn.closest('.energy-card');
      const drinkId = card.dataset.brand + '_' + card.querySelector('.card-flavor').textContent;
      const name = card.querySelector('.card-brand').textContent;
      let favs = getFavs();
      if (favs.includes(drinkId)) {
        favs = favs.filter(f => f !== drinkId);
        newBtn.classList.remove('active');
        newBtn.querySelector('i').className = 'fa-regular fa-heart';
        showToast(`Убрано из избранного`, 'fa-regular fa-heart');
      } else {
        favs.push(drinkId);
        newBtn.classList.add('active');
        newBtn.querySelector('i').className = 'fa-solid fa-heart';
        showToast(`${name} в избранном`, 'fa-solid fa-heart');
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
startScenario();

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

// Увеличил до 40 — теперь их много, но они не мешают по центру
for(let i=0; i<40; i++) particles.push(new Particle());

let isAnimating = true;
const obsParticles = new IntersectionObserver(entries => { 
  isAnimating = entries[0].isIntersecting; 
  if(isAnimating) animateParticles(); 
}, { threshold: 0.1 });
obsParticles.observe(canvas.parentElement);

function animateParticles() { 
  if(!isAnimating) return;
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

modalClose.addEventListener('click', closeVideoModal);
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

// Иконка синей метки
const blueIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="45"><path fill="#1e6fff" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>`,
  iconSize: [30, 45], // Было 24, 36. Выровнял под размер SVG!
  iconAnchor: [15, 45], 
  popupAnchor: [0, -45], 
  className: 'custom-marker' 
});

// --- Иконка для Матрицы (светящаяся зеленая) ---
const matrixMapIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="40" height="60"><path fill="#00ff41" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" filter="drop-shadow(0 0 10px #00ff41) drop-shadow(0 0 20px #00ff41)"/></svg>`,
  iconSize: [40, 60], // Было 30, 45. Выровнял под размер SVG!
  iconAnchor: [20, 60],
  popupAnchor: [0, -60],
  className: 'custom-marker'
});

// Инициализация карты
const map = L.map('mapContainer', { zoomControl: false }).setView([43.2070, 27.9120], 13);
L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19
}).addTo(map);

// Создаем метки (Красивое чистое окошко)
const markers = [];
let secretMysteryMarker = null; // Сюда спрячем точку ???
// --- ДОБАВИТЬ ЭТО: Запрещаем браузеру рисовать синие рамки ---
document.addEventListener('selectstart', function(e) {
  if (e.target.closest && e.target.closest('.leaflet-marker-icon')) {
    e.preventDefault();
  }
}, true);
mapLocations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng], { icon: blueIcon, locData: loc });
  
  // Если у точки есть свой HTML (как у маяка), используем его. Иначе — стандартный магазин
  var popupContent = loc.popupHtml || `
   <div class="store-popup">
      <div class="store-popup-header"><i class="fa-solid fa-store"></i> ${loc.name}</div>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}" target="_blank" class="route-btn">
        <i class="fa-solid fa-diamond-turn-right"></i> Проложить маршрут
      </a>
   </div>
  `;
  marker.bindPopup(popupContent, { maxWidth: 300, minWidth: 250 });
  
  // ПРОВЕРЯЕМ: ЕСЛИ ЭТО МАЯК (id 6) - НЕ ДОБАВЛЯЕМ НА КАРТУ СРАЗУ
  if (loc.id === 6) {
    secretMysteryMarker = marker; // Просто сохраняем в память
  } else {
    marker.addTo(map); // Остальные магазины добавляем как обычно
    markers.push(marker); // Кидаем в массив для фильтров
  }
});

// ==========================================
// ЛОГИКА ФИЛЬТРА КАРТЫ
// ==========================================
function initMapFilter() {
  const dropdown = document.getElementById('mapBrandDropdown');
  const favs = getFavs();
  
  // Узнаем, какие бренды вообще есть на карте
  const brandCounts = {};
  mapLocations.forEach(loc => {
    loc.inventory.forEach(key => {
      brandCounts[key] = (brandCounts[key] || 0) + 1;
    });
  });
  
  // Генерируем кнопки
  let html = `<div class="brand-option active" data-brand="all"><div class="brand-dot" style="background:var(--accent)"></div>Все магазины<div class="brand-count">${mapLocations.length}</div></div>`;
  html += `<div class="brand-option" data-brand="fav"><div class="brand-dot" style="background:#ff3b5c"></div>Избранное<div class="brand-count">${favs.length}</div></div>`;
  
  for (const key in brandCounts) {
        const name = bNames[key] || key;
    html += `<div class="brand-option" data-brand="${key}"><div class="brand-dot" style="background:${bColors[key] || '#888'}"></div>${name}<div class="brand-count">${brandCounts[key]}</div></div>`;
  }
  dropdown.innerHTML = html;

  // При нажатии на кнопку фильтра
  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdown.querySelectorAll('.brand-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const selectedBrand = opt.dataset.brand;
      
      dropdown.classList.remove('open');
      document.getElementById('mapBrandToggle').classList.remove('open');
      
      const currentFavs = getFavs(); // Берем актуальное избранное
      // Получаем только ключи брендов из избранного (например ["monster", "hell"])
      const favBrands = currentFavs.map(f => f.split('_')[0]); 

      // Показываем/скрываем точки
      markers.forEach(m => {
        const locData = m.options.locData;
        let show = false;

        if (selectedBrand === 'all') {
          show = true;
        } else if (selectedBrand === 'fav') {
          // Показываем точку, если хотя бы один бренд из магазина есть в избранном
          show = locData.inventory.some(brandKey => favBrands.includes(brandKey));
        } else {
          // Показываем точку, если выбранный бренд есть в массиве inventory магазина
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

// Тоггл меню
document.getElementById('mapBrandToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('mapBrandDropdown').classList.toggle('open');
  document.getElementById('mapBrandToggle').classList.toggle('open');
});

initMapFilter();
document.addEventListener('click', () => {
  document.getElementById('mapBrandDropdown').classList.remove('open');
  document.getElementById('mapBrandToggle').classList.remove('open');
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

    /* МАГИЯ КАРТЫ: Матричный режим */
    if (secretMysteryMarker) {
      secretMysteryMarker.setIcon(matrixMapIcon);
      secretMysteryMarker.setPopupContent(`
        <div class="store-popup" style="text-align: center;">
          <div class="store-popup-header" style="justify-content: center; border-bottom: 1px solid rgba(0,255,65,0.3); margin-bottom: 15px; padding-bottom: 10px;">
           <span style="color: #023d11; font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 6px;">???</span>
          </div>
          <p style="color: #00ff41; margin: 0 0 15px 0; font-size: 15px; line-height: 1.5;">
            Найди это место в реальности
          </p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=43.1873338,27.9218344" target="_blank" class="route-btn" style="background: #00ff41; color: #000; font-weight: 700; text-shadow: none;">
            <i class="fa-solid fa-diamond-turn-right"></i> Проложить маршрут
          </a>
        </div>
      `);

      secretMysteryMarker.addTo(map);
      map.flyTo([43.1873338, 27.9218344], 16, { duration: 1.5 });
      
      setTimeout(function() {
        secretMysteryMarker.openPopup();
      }, 1600); 
    }
    markers.forEach(m => map.removeLayer(m));
    
    showToast('🟢 Wake up, Wake up!', 'fa-solid fa-terminal');
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