// =========
// 0. Start
//=========
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
// ==========================================
// I18N: ДВИЖОК ПЕРЕВОДА (RU / EN)
// ==========================================
const I18N = {
  ru: {
    nav_about: 'Обо мне', nav_reviews: 'Обзоры', nav_latest: 'Новинки', nav_soon: 'Скоро', nav_calc: 'Калькулятор', nav_places: 'Места', nav_key: 'Ключ',
    section_reviews_tag: 'Топ обзоры', section_reviews_title: 'Лучшие Напитки', section_reviews_sub: 'Честные рейтинги, состав и вкусовые впечатления',
    filter_all: 'Все', filter_high: '8 — 10', filter_mid: '6 — 7', filter_low: 'Ниже 6', filter_fav: 'Избранное',
    toggle_volume: 'Объём', toggle_caffeine: 'Кофеин', toggle_brand: 'Марка', toggle_sort: 'Сортировка',
    btn_random: 'Случайный Напиток', btn_reset_filters: 'Сброс фильтров',
    search_placeholder: 'Поиск по названию...',
    section_latest_tag: 'Новинки', section_latest_title: 'Последние обзоры', section_latest_sub: 'Свежедобавленные напитки — самые новые сверху',
    section_top10_tag: 'Топ-10', section_top10_title: 'Лучшие из лучших', section_top10_sub: 'Самые высокооценённые напитки по версии Buzz Rate',
    section_stats_tag: 'Статистика', section_stats_title: 'Цифры по брендам', section_stats_sub: 'Средние рейтинги и характеристики',
    section_soon_title: 'Скоро в обзоре', section_soon_sub: 'Уже тестируем эти напитки',
    section_map_tag: 'Где купить', section_map_title: 'Карта покупок', section_map_sub: 'Отмеченные точки — магазины, где мы брали напитки для обзоров',
    map_filter_brand: 'Фильтр по марке',
    footer_tagline: 'Честные обзоры энергетических напитков.<br>Состав, вкус, эффект — без прикрас.',
    btn_suggest: 'Предложить напиток', btn_key_footer: 'Ввести код', footer_copy: '© 2026 Buzz Rate. Все права защищены.',
    details_fav: 'В избранное', details_compare: 'Сравнить', details_share: 'Поделиться', details_video: 'Обзор', details_drank: 'Я выпил', details_report: 'Сообщить об ошибке',
    details_history: 'Недавно просмотренные', details_similar: 'Похожие напитки',
    card_caffeine: 'Кофеин', card_sugar: 'Сахар', card_calories: 'Калории', card_ph: 'pH', card_watch_review: 'Смотреть обзор',
    card_new_badge: 'Новинка', card_hit_badge: 'Хит',
    toast_added_fav: 'в избранном', toast_removed_fav: 'Убрано из избранного',
    details_no_data: '—', details_no_taste: 'Вкус ещё не описан', details_price_tbd: 'Цена уточняется',
    details_price_disclaimer: 'Цена ориентировочная — уточняй в конкретном магазине.',
    details_fav_active: 'В избранном', details_fav_inactive: 'В избранное',
    details_no_video: 'Обзор пока нет', details_no_video_sub: 'Скоро добавим',
    details_drank_done: 'Учтено', details_daily_caffeine: 'мг сегодня',
    details_no_country: 'Нет проверенных данных о бренде', details_since: 'бренд с', details_year: 'года',
    toast_link_copied: 'Ссылка скопирована!', toast_report_added: 'Спасибо! Разберёмся.',
    report_title: 'Сообщить об ошибке', report_prompt: 'Что не так с этим напитком?', report_placeholder: 'Опиши проблему: неверные данные, битое видео, опечатка...',
    report_default_label: 'Что не так с этим напитком?', report_problem_with: 'Проблема с',
    calc_title: 'СИСТЕМНЫЙ МОНИТОР: КАФЕИН', calc_search_placeholder: 'Введи название...', calc_level: 'УРОВЕНЬ ЗАГРУЗКИ', calc_waiting: 'Система в ожидании...',
    calc_note: 'Цифры — наши, выводы — твои. Просто знай свою норму — остальное на твой вкус.',
    calc_not_found: 'Ничего не найдено', calc_reset: 'Сбросить', calc_reset_confirm: 'Сбросить счётчик кофеина за сегодня?',
    calc_normal: ['Система в норме','Кофеин распределён равномерно','Бодрость активна','Можно ещё чуть-чуть','Сердце стабильно','Энергия в балансе'],
    calc_warn: ['Внимание: повышенная нагрузка','Сердце ускоряется','Кофеин на пределе','Рекомендую притормозить','Пульс выше нормы'],
    calc_danger: ['ОПАСНОСТЬ: ПРЕВЫШЕН ДОПУСТИМЫЙ ЛИМИТ','СТОП! Хватит на сегодня','Ты переусердствовал','Завязывай с кофеином','Сердце не железное'],
    compare_title: 'ПРОТОКОЛ СТОЛКНОВЕНИЯ', compare_price_tbd: 'Цена уточняется',
    compare_notice: '⚠️ Цены в карточках напитков ориентировочные и могут отличаться в зависимости от магазина.',
    compare_volume: 'ОБЪЕМ (МЛ)', compare_caffeine: 'КОФЕИН (МГ)', compare_sugar: 'САХАР (Г)', compare_calories: 'КАЛОРИИ (ККАЛ)', compare_ph: 'PH (КИСЛОТНОСТЬ)',
    compare_btn: 'Сравнить',
    suggest_title: 'Предложить напиток', suggest_prompt: 'Пришли название напитка, который хочешь увидеть в обзоре',
    suggest_name_placeholder: 'Название энергетика...', suggest_comment_placeholder: 'Почему его стоит обзять? (необязательно)',
    suggest_cancel: 'Отмена', suggest_send: 'Отправить', suggest_sending: 'Отправка...',
    suggest_name_required: 'Введи название', toast_suggest_sent: 'отправлен на обзор!', toast_error_send: 'Ошибка отправки. Попробуй позже.', toast_no_connection: 'Нет соединения. Попробуй позже.',
    toast_slow_down: 'Не так быстро — подожди', toast_seconds: 'сек.',
    calc_title: 'СИСТЕМНЫЙ МОНИТОР: КАФЕИН', calc_search_placeholder: 'Введи название...', calc_level: 'УРОВЕНЬ ЗАГРУЗКИ', calc_waiting: 'Система в ожидании...',
    calc_note: 'Цифры — наши, выводы — твои. Просто знай свою норму — остальное на твой вкус.',
    calc_not_found: 'Ничего не найдено', calc_reset: 'Сбросить', calc_reset_confirm: 'Сбросить счётчик кофеина за сегодня?',
    calc_normal: ['Система в норме','Кофеин распределён равномерно','Бодрость активна','Можно ещё чуть-чуть','Сердце стабильно','Энергия в балансе'],
    calc_warn: ['Внимание: повышенная нагрузка','Сердце ускоряется','Кофеин на пределе','Рекомендую притормозить','Пульс выше нормы'],
    calc_danger: ['ОПАСНОСТЬ: ПРЕВЫШЕН ДОПУСТИМЫЙ ЛИМИТ','СТОП! Хватит на сегодня','Ты переусердствовал','Завязывай с кофеином','Сердце не железное'],
    compare_title: 'ПРОТОКОЛ СТОЛКНОВЕНИЯ', compare_price_tbd: 'Цена уточняется',
    compare_notice: '⚠️ Цены в карточках напитков ориентировочные и могут отличаться в зависимости от магазина.',
    compare_volume: 'ОБЪЕМ (МЛ)', compare_caffeine: 'КОФЕИН (МГ)', compare_sugar: 'САХАР (Г)', compare_calories: 'КАЛОРИИ (ККАЛ)', compare_ph: 'PH (КИСЛОТНОСТЬ)',
    compare_btn: 'Сравнить',
    suggest_title: 'Предложить напиток', suggest_prompt: 'Пришли название напитка, который хочешь увидеть в обзоре',
    suggest_name_placeholder: 'Название энергетика...', suggest_comment_placeholder: 'Почему его стоит обзять? (необязательно)',
    suggest_cancel: 'Отмена', suggest_send: 'Отправить', suggest_sending: 'Отправка...',
    suggest_name_required: 'Введи название', toast_suggest_sent: 'отправлен на обзор!', toast_error_send: 'Ошибка отправки. Попробуй позже.', toast_no_connection: 'Нет соединения. Попробуй позже.',
    toast_slow_down: 'Не так быстро — подожди', toast_seconds: 'сек.',
    bb_logo: 'BUZZ BLAST', bb_score: 'ОЧКИ', bb_best: 'РЕКОРД', bb_restart: 'Заново', bb_change_mode: 'Сменить режим',
    bb_hint: 'Перетащите фигуру на поле. Для силы — нажми кнопку, затем клетку.',
    bb_hint_wall: 'Красные клетки — стена. Линия очищается, только если в ней нет стен — собирай по центру.',
    bb_game_over: 'ИГРА ОКОНЧЕНА! Счёт:', bb_restart_hint: 'Нажмите "Заново"',
    bb_mode_classic: 'Классика', bb_mode_classic_desc: '8×8, без ограничений',
    bb_mode_mini: 'Мини', bb_mode_mini_desc: '6×6, компактно и быстро',
    bb_mode_cross: 'Крест', bb_mode_cross_desc: '9×9, углы закрыты',
    bb_bomb: 'Бомба', bb_firework: 'Салют', bb_rocket: 'Ракета',
    bb_no_charges: 'Нет зарядов — новый придёт со следующим визитом',
    bb_rocket_tip: 'Крест на весь экран — нажми на клетку', bb_firework_tip: 'Правый клик — сменить строку/столбец, левый — очистить', bb_bomb_tip: 'Квадрат 2×2 — нажми на клетку',
    bb_legend_bomb: 'Бомба — квадрат 2×2 от клетки', bb_legend_firework: 'Салют — строка или столбец (ПКМ — переключить)', bb_legend_rocket: 'Ракета — крест через всё поле, нажми на клетку',
    bb_legend_empty: 'Способности появятся с первыми достижениями',
    profile_title: 'ДОСЬЕ АГЕНТА', profile_auto_theme: 'Авто-тема (день/ночь)',
    profile_agent_id: 'AGENT_ID', profile_rank: 'КЛАСС АГЕНТА', profile_missions: 'МИССИЙ (ВИЗИТОВ)', profile_fav_brand: 'ЛЮБИМЫЙ БРЕНД', profile_max_dose: 'МАКС. ДОЗА КАФЕИНА',
    profile_achievements: 'ДОСТИЖЕНИЯ', profile_no_data: 'Нет данных',
    profile_diary_btn: 'Дневник напитков', profile_calendar_btn: 'Календарь',
    profile_locked_desc: 'Достижение ещё не получено. Продолжайте взаимодействовать с сайтом.',
    key_title: 'Секретный ключ', key_prompt: 'Если ты нашёл код — введи его сюда', key_placeholder: 'Введи код...',
    key_cancel: 'Отмена', key_activate: 'Активировать', key_enter_code: 'Введи код', key_wrong_code: 'Неверный код',
    key_congrats: 'Поздравляю!', key_first: 'Ты первый нашёл его!', key_hint: 'Сделай скриншот и отправь мне в Telegram',
    key_activated_btn: 'Ключ активирован', key_activated_toast: 'Ключ активирован!',
    achievement_unlocked: 'ДОСТИЖЕНИЕ РАЗБЛОКИРОВАНО!',
    diary_title: 'ДНЕВНИК НАПИТКОВ', diary_empty: 'Пока пусто', diary_empty_hint: 'Жми "Я выпил" в карточке напитка',
    calendar_title: 'КАЛЕНДАРЬ', calendar_total: 'Всего отмечено дней:', calendar_warning: 'Это не соревнование. Пить каждый день не нужно — дай себе передышку.',
    cal_weekdays: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    cal_months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    nav_achievements: 'Достижения', achievements_only_title: 'ДОСТИЖЕНИЯ',
  },
  en: {
    nav_about: 'About', nav_reviews: 'Reviews', nav_latest: 'Latest', nav_soon: 'Coming Soon', nav_calc: 'Calculator', nav_places: 'Places', nav_key: 'Key',
    section_reviews_tag: 'Top Reviews', section_reviews_title: 'Best Drinks', section_reviews_sub: 'Honest ratings, ingredients and taste impressions',
    filter_all: 'All', filter_high: '8 — 10', filter_mid: '6 — 7', filter_low: 'Below 6', filter_fav: 'Favorites',
    toggle_volume: 'Volume', toggle_caffeine: 'Caffeine', toggle_brand: 'Brand', toggle_sort: 'Sort',
    btn_random: 'Random Drink', btn_reset_filters: 'Reset Filters',
    search_placeholder: 'Search by name...',
    section_latest_tag: 'New', section_latest_title: 'Latest Reviews', section_latest_sub: 'Newly added drinks — most recent first',
    section_top10_tag: 'Top 10', section_top10_title: 'Best of the Best', section_top10_sub: 'The highest-rated drinks according to Buzz Rate',
    section_stats_tag: 'Stats', section_stats_title: 'Brand Numbers', section_stats_sub: 'Average ratings and characteristics',
    section_soon_title: 'Coming Soon', section_soon_sub: "We're already testing these drinks",
    section_map_tag: 'Where to Buy', section_map_title: 'Store Map', section_map_sub: 'Marked spots — stores where we picked up drinks for reviews',
    map_filter_brand: 'Filter by brand',
    footer_tagline: 'Honest energy drink reviews.<br>Ingredients, taste, effect — no filter.',
    btn_suggest: 'Suggest a Drink', btn_key_footer: 'Enter Code', footer_copy: '© 2026 Buzz Rate. All rights reserved.',
    details_fav: 'Add to favorites', details_compare: 'Compare', details_share: 'Share', details_video: 'Review', details_drank: 'I drank it', details_report: 'Report an issue',
    details_history: 'Recently viewed', details_similar: 'Similar drinks',
    card_caffeine: 'Caffeine', card_sugar: 'Sugar', card_calories: 'Calories', card_ph: 'pH', card_watch_review: 'Watch review',
    card_new_badge: 'New', card_hit_badge: 'Hit',
    toast_added_fav: 'added to favorites', toast_removed_fav: 'Removed from favorites',
    details_no_data: '—', details_no_taste: 'Taste not described yet', details_price_tbd: 'Price TBD',
    details_price_disclaimer: 'Price is approximate — check with the specific store.',
    details_fav_active: 'In favorites', details_fav_inactive: 'Add to favorites',
    details_no_video: 'No review yet', details_no_video_sub: 'Coming soon',
    details_drank_done: 'Logged', details_daily_caffeine: 'mg today',
    details_no_country: 'No verified brand data', details_since: 'brand since', details_year: '',
    toast_link_copied: 'Link copied!', toast_report_added: 'Thanks! We\'ll look into it.',
    report_title: 'Report an issue', report_prompt: "What's wrong with this drink?", report_placeholder: 'Describe the issue: wrong data, broken video, typo...',
    report_default_label: "What's wrong with this drink?", report_problem_with: 'Issue with',
    calc_title: 'SYSTEM MONITOR: CAFFEINE', calc_search_placeholder: 'Enter a name...', calc_level: 'LOAD LEVEL', calc_waiting: 'System standing by...',
    calc_note: 'The numbers are ours, the conclusions are yours. Just know your limit — the rest is up to you.',
    calc_not_found: 'Nothing found', calc_reset: 'Reset', calc_reset_confirm: "Reset today's caffeine counter?",
    calc_normal: ['System nominal','Caffeine evenly distributed','Alertness active','You can have a bit more','Heart stable','Energy balanced'],
    calc_warn: ['Warning: elevated load','Heart rate rising','Caffeine near the limit','Recommend slowing down','Pulse above normal'],
    calc_danger: ['DANGER: DAILY LIMIT EXCEEDED',"STOP! That's enough for today","You've overdone it",'Cut back on caffeine',"Your heart isn't made of steel"],
    compare_title: 'COLLISION PROTOCOL', compare_price_tbd: 'Price TBD',
    compare_notice: '⚠️ Prices shown on drink cards are approximate and may vary by store.',
    compare_volume: 'VOLUME (ML)', compare_caffeine: 'CAFFEINE (MG)', compare_sugar: 'SUGAR (G)', compare_calories: 'CALORIES (KCAL)', compare_ph: 'PH (ACIDITY)',
    compare_btn: 'Compare',
    suggest_title: 'Suggest a Drink', suggest_prompt: "Send the name of a drink you'd like to see reviewed",
    suggest_name_placeholder: 'Energy drink name...', suggest_comment_placeholder: 'Why is it worth reviewing? (optional)',
    suggest_cancel: 'Cancel', suggest_send: 'Send', suggest_sending: 'Sending...',
    suggest_name_required: 'Enter a name', toast_suggest_sent: 'sent for review!', toast_error_send: 'Send error. Try again later.', toast_no_connection: 'No connection. Try again later.',
    toast_slow_down: 'Slow down — wait', toast_seconds: 'sec.',
    bb_logo: 'BUZZ BLAST', bb_score: 'SCORE', bb_best: 'BEST', bb_restart: 'Restart', bb_change_mode: 'Change mode',
    bb_hint: 'Drag a piece onto the board. For a power — press the button, then tap a cell.',
    bb_hint_wall: 'Red cells are a wall. A line only clears if it has no walls — build around the center.',
    bb_game_over: 'GAME OVER! Score:', bb_restart_hint: 'Press "Restart"',
    bb_mode_classic: 'Classic', bb_mode_classic_desc: '8×8, no restrictions',
    bb_mode_mini: 'Mini', bb_mode_mini_desc: '6×6, compact and fast',
    bb_mode_cross: 'Cross', bb_mode_cross_desc: '9×9, corners blocked',
    bb_bomb: 'Bomb', bb_firework: 'Firework', bb_rocket: 'Rocket',
    bb_no_charges: 'No charges left — a new one arrives on your next visit',
    bb_rocket_tip: 'Cross across the whole board — tap a cell', bb_firework_tip: 'Right-click to switch row/column, left-click to clear', bb_bomb_tip: '2×2 square — tap a cell',
    bb_legend_bomb: 'Bomb — 2×2 square from the cell', bb_legend_firework: 'Firework — a row or column (right-click to switch)', bb_legend_rocket: 'Rocket — cross through the whole board, tap a cell',
    bb_legend_empty: 'Powers unlock with your first achievements',
    profile_title: 'AGENT FILE', profile_auto_theme: 'Auto theme (day/night)',
    profile_agent_id: 'AGENT_ID', profile_rank: 'AGENT RANK', profile_missions: 'MISSIONS (VISITS)', profile_fav_brand: 'FAVORITE BRAND', profile_max_dose: 'MAX CAFFEINE DOSE',
    profile_achievements: 'ACHIEVEMENTS', profile_no_data: 'No data',
    profile_diary_btn: 'Drink diary', profile_calendar_btn: 'Calendar',
    profile_locked_desc: 'Achievement not unlocked yet. Keep interacting with the site.',
    key_title: 'Secret Key', key_prompt: "If you found a code — enter it here", key_placeholder: 'Enter code...',
    key_cancel: 'Cancel', key_activate: 'Activate', key_enter_code: 'Enter a code', key_wrong_code: 'Wrong code',
    key_congrats: 'Congratulations!', key_first: 'You found it first!', key_hint: 'Take a screenshot and send it to me on Telegram',
    key_activated_btn: 'Key activated', key_activated_toast: 'Key activated!',
    achievement_unlocked: 'ACHIEVEMENT UNLOCKED!',
    diary_title: 'DRINK DIARY', diary_empty: 'Nothing here yet', diary_empty_hint: 'Tap "I drank it" on a drink card',
    calendar_title: 'CALENDAR', calendar_total: 'Total days marked:', calendar_warning: "This isn't a competition. You don't need to drink every day — give yourself a break.",
    cal_weekdays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    cal_months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    nav_achievements: 'Achievements', achievements_only_title: 'ACHIEVEMENTS',
  }
};

function getLang() { return safeLSGet('buzz_lang', null) || 'ru'; }
function t(key) { const lang = getLang(); return (I18N[lang] && I18N[lang][key]) || I18N.ru[key] || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.dataset.i18nAttr) {
      el.setAttribute(el.dataset.i18nAttr, val);
    } else {
      el.innerHTML = val;
    }
  });
  document.documentElement.lang = getLang();
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = getLang() === 'ru' ? 'RU' : 'EN';
  const mobLabel = document.getElementById('langToggleMobileLabel');
  if (mobLabel) mobLabel.textContent = getLang() === 'ru' ? 'English' : 'Русский';
  if (typeof renderCards === 'function') renderCards();
  if (typeof renderTop10 === 'function') renderTop10();
  if (typeof renderLatest === 'function') renderLatest();
  if (typeof renderStats === 'function') renderStats();
  if (typeof renderBrandDropdown === 'function') renderBrandDropdown();
  if (typeof renderVolumeDropdown === 'function') renderVolumeDropdown();
  if (typeof renderCaffeineDropdown === 'function') renderCaffeineDropdown();
  if (typeof generateSortDropdown === 'function') generateSortDropdown();
}

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('langToggle');
  const langBtnMobile = document.getElementById('langToggleMobileLabel');
  let isRuVisual = true;
  if (langBtn) langBtn.textContent = 'RU';
  if (langBtnMobile) langBtnMobile.textContent = 'Русский';

  function toggleLang() {
    if (typeof AudioSys !== 'undefined') AudioSys.play('click');
    if (typeof showToast === 'function') showToast('🌍 Перевод сайта скоро появится!', 'fa-solid fa-language');
    isRuVisual = !isRuVisual;
    if (langBtn) langBtn.textContent = isRuVisual ? 'RU' : 'EN';
    if (langBtnMobile) langBtnMobile.textContent = isRuVisual ? 'Русский' : 'English';
  }
  const langBtnEl = document.getElementById('langToggle');
  if (langBtnEl) langBtnEl.addEventListener('click', toggleLang);
  const langBtnMobileEl = document.getElementById('langToggleMobile');
  if (langBtnMobileEl) langBtnMobileEl.addEventListener('click', (e) => { e.preventDefault(); toggleLang(); });
});
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
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, c.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.15);
          gain.gain.setValueAtTime(0.08, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
          osc.start(c.currentTime); osc.stop(c.currentTime + 0.15);
        } else if (type === 'waves') {
          const dur = 2.2;
          const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
          const noise = c.createBufferSource(); noise.buffer = buf;
          const wf = c.createBiquadFilter(); wf.type = 'lowpass';
          wf.frequency.setValueAtTime(200, c.currentTime);
          wf.frequency.linearRampToValueAtTime(900, c.currentTime + dur * 0.4);
          wf.frequency.linearRampToValueAtTime(150, c.currentTime + dur);
          const wg = c.createGain();
          wg.gain.setValueAtTime(0, c.currentTime);
          wg.gain.linearRampToValueAtTime(0.22, c.currentTime + dur * 0.35);
          wg.gain.linearRampToValueAtTime(0, c.currentTime + dur);
          noise.connect(wf); wf.connect(wg); wg.connect(c.destination);
          noise.start(c.currentTime); noise.stop(c.currentTime + dur);
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
// Выравнивает визуальный размер банки внутри рамки: находит реальные
// границы непрозрачной области на картинке и обрезает под них, чтобы
// разные исходники (с разным запасом пустого поля вокруг банки) не
// казались разного размера в одинаковых по CSS рамках.
const _canNormCache = {};
function normalizeCanImage(imgEl, originalSrc) {
  if (!imgEl || !originalSrc || originalSrc.includes('placeholder.svg')) return;
  const doNormalize = () => {
    if (imgEl.dataset.normalized === '1') return;
    if (_canNormCache[originalSrc]) {
      imgEl.src = _canNormCache[originalSrc];
      imgEl.dataset.normalized = '1';
      return;
    }
    try {
      const w = imgEl.naturalWidth, h = imgEl.naturalHeight;
      if (!w || !h) return;
      const src = document.createElement('canvas');
      src.width = w; src.height = h;
      const sctx = src.getContext('2d');
      sctx.drawImage(imgEl, 0, 0, w, h);
      const data = sctx.getImageData(0, 0, w, h).data;
      let minX = w, minY = h, maxX = 0, maxY = 0, found = false;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] > 10) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
            found = true;
          }
        }
      }
      if (!found) return;
      const boxW = maxX - minX + 1, boxH = maxY - minY + 1;
      const outSize = Math.max(boxW, boxH) * 1.16;
      const out = document.createElement('canvas');
      out.width = outSize; out.height = outSize;
      const octx = out.getContext('2d');
      octx.drawImage(src, minX, minY, boxW, boxH, (outSize - boxW) / 2, (outSize - boxH) / 2, boxW, boxH);
      const dataUrl = out.toDataURL('image/png');
      _canNormCache[originalSrc] = dataUrl;
      imgEl.src = dataUrl;
      imgEl.dataset.normalized = '1';
    } catch (e) { /* если браузер не даёт читать пиксели — оставляем как есть */ }
  };
  imgEl.addEventListener('load', doNormalize, { once: true });
  if (imgEl.complete && imgEl.naturalWidth) doNormalize();
}

function setImageWithFallback(imgEl, src, fallbackSrc = 'images/placeholder.svg') {}
function setImageWithFallback(imgEl, src, fallbackSrc = 'images/placeholder.svg', onSettled) {
  if (!imgEl) return;
  const safeSrc = (src && String(src).trim()) ? src : fallbackSrc;
  const safeFallback = fallbackSrc || 'images/placeholder.svg';

  const probe = new Image();
  probe.onload = () => {
    if (!imgEl.isConnected) return;
    imgEl.src = safeSrc;
    imgEl.dataset.state = 'loaded';
    imgEl.removeAttribute('data-broken');
    if (typeof onSettled === 'function') onSettled(safeSrc);
  };
  probe.onerror = () => {
    if (!imgEl.isConnected) return;
    imgEl.src = safeFallback;
    imgEl.dataset.state = 'broken';
    imgEl.setAttribute('data-broken', 'true');
    imgEl.alt = 'Изображение недоступно';
    if (typeof onSettled === 'function') onSettled(safeFallback);
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
  random: { name: 'Фатализм', icon: 'fa-dice', desc: 'Доверился воле случая. Колесо Фортуны выбрало за тебя.', tier: 'bronze', howTo: 'Нажми кнопку "Случайный Напиток" в разделе обзоров.' },
  fav3: { name: 'Коллекционер', icon: 'fa-heart', desc: 'Три напитка в коллекции. Сердце не железное.', tier: 'silver', howTo: 'Добавь 3 напитка в избранное (сердечко на карточке).' },
  matrix: { name: 'Проснулся', icon: 'fa-terminal', desc: 'Системный сбой. Реальность под вопросом.', tier: 'gold', howTo: '5 раз быстро подряд нажми на кнопку смены темы (луна/солнце).' },
  caffeine: { name: 'Сердце-мотор', icon: 'fa-heart-crack', desc: 'Сердце работает на пределе. Пульс выше нормы.', tier: 'diamond', howTo: 'Превысь суточную норму кофеина 400 мг через калькулятор или кнопку "Я выпил".' },
  key: { name: 'Мастер взлома', icon: 'fa-key', desc: 'Секретный код принят системой. Доступ расширен.', tier: 'purple', howTo: 'Введи правильный секретный код в модалке "Ключ" (код: BUZZ2025).' },
  godmode: { name: 'Режим Бога', icon: 'fa-crown', desc: 'Привилегии активированы. Система подчиняется.', tier: 'purple', howTo: 'Дважды кликни по нику "Varna 23 live", в терминале введи по очереди my → name → v0x, затем команду 1.' },
  mobile: { name: 'Мобильный снайпер', icon: 'fa-mobile-screen', desc: 'Найдено только касанием. Мобильный детектив.', tier: 'gold', howTo: 'На телефоне сделай долгий тап (3 сек) по логотипу в шапке.' },
  konami: { name: 'Код Разблокировки', icon: 'fa-gamepad', desc: 'Древний код пробуждения. Использовался ещё во времена NES.', tier: 'gold', howTo: 'Введи классический Konami-код: ↑↑↓↓←→←→BA (на клавиатуре или через D-pad после долгого тапа по лого на мобиле).' },
  doom: { name: 'Жнец', icon: 'fa-skull', desc: 'Жатва собрана. Души подсчитаны. Смерть не отступит.', tier: 'diamond', howTo: 'Введи зеркальный код: ↓↓↑↑→←→←BA.' },
  doom_slayer: { name: 'Убийца всех', icon: 'fa-skull-crossbones', desc: 'Все банки уничтожены. Жатва завершена. Ничего не осталось.', tier: 'purple', howTo: 'В режиме DOOM уничтожь кликами абсолютно все карточки напитков на странице.' },
  phone_hacker: { name: 'Phone Hacker', icon: 'fa-fingerprint', desc: 'Взлом через прикосновение. Цифровой Мидас?', tier: 'gold', howTo: 'Активируй DOOM Mode или Konami-код на мобильном устройстве через долгий тап по лого.' },
  resurrected: { name: 'Восставший из мёртвых', icon: 'fa-cross', desc: 'Прошёл через Death и вернулся. Прогресс сброшен.', tier: 'diamond', howTo: 'Дай таймеру DOOM Mode дойти до нуля — сработает Death-экран со сбросом прогресса.' },
  hacker: { name: 'Хакер', icon: 'fa-code', desc: 'Доступ к терминалу получен. Взлом системы начать.', tier: 'gold', howTo: 'Дважды кликни по нику "Varna 23 live" в шапке сайта — откроется терминал.' },
  coin_click: { name: 'Жадина', icon: 'fa-coins', desc: 'Нашёл спрятанную монету с черепом.', tier: 'gold', howTo: '4 раза быстро подряд кликни по логотипу в шапке, затем нажми на появившуюся монету.' },
  hell_package: { name: 'Посылка в АД', icon: 'fa-box', desc: 'Бля, и куда мне её доставить?', tier: 'purple', howTo: 'В терминале найди спрятанный банкомат/монету, затем купи все марки командой "buy [марка]" и оплати покупку.' },
  coronation: { name: 'Коронованный', icon: 'fa-crown', desc: 'Система признала тебя королём.', tier: 'gold', howTo: 'Разблокируй 10+ достижений и прими корону в открывшемся тронном зале.' },
  co_owner: { name: 'Свой человек', icon: 'fa-people-arrows', desc: 'Этот сайт немного и твой тоже.', tier: 'diamond', howTo: 'В терминале введи оба позывных: "callsign v0x" и "callsign Varna 23 live" (в любом порядке).' },
  mode_master: { name: 'Владыка режимов', icon: 'fa-hat-wizard', desc: 'Собрал все ключи от системы воедино.', tier: 'gold', howTo: 'Разблокируй ачивки за Матрицу, DOOM и Konami-код — все три вместе.' },
  terminal_master: { name: 'Любознательный', icon: 'fa-terminal', desc: 'Ничего не оставил без внимания.', tier: 'silver', howTo: 'В терминале введи все обычные команды: help, ls, scan, analyze, track, hack, buy, whoami, whois chief, date, coffee, sudo drink, cat classified.txt, top secret, status, rumors.' },
  night_owl: { name: 'Ночь', icon: 'fa-moon', desc: 'Кажется, ты сова. Или просто не спится — бывает.', tier: 'bronze', howTo: 'Зайди на сайт между 23:00 и 2:00 несколько разных дней подряд.' },
  early_bird: { name: 'Ранняя пташка', icon: 'fa-sun', desc: 'Кто-то встал раньше будильника. Уважение.', tier: 'bronze', howTo: 'Зайди на сайт между 3:00 и 7:00 несколько разных дней подряд.' },
  sunrise_found: { name: 'Утренняя находка', icon: 'fa-cloud-sun', desc: 'Кто-то встретил рассвет вместе с этим сайтом.', tier: 'gold', howTo: 'Включи светлую тему вручную (не авто), найди Monster Ultra Sunrise в начале списка и введи в терминале команду "sunrise".' },
  sea_secret: { name: 'Зов глубин', icon: 'fa-water', desc: 'Море значит отпуск? Ага, конечно. Радуйся тому, что плещется в банке — на настоящее ты не заработал.', tier: 'purple', howTo: 'Открой карточку Monster Juiced Aussie Style Lemonade и 4 раза быстро кликни по картинке банки.' },
  dead_owl: { name: 'Мёртвая сова', icon: 'fa-skull', desc: 'Сова уже даже не ухает — молча смотрит.', tier: 'gold', howTo: 'Отметь напитками 15 разных дней в календаре (кнопка "Я выпил").' },
  jungle_secret: { name: 'Зов джунглей', icon: 'fa-leaf', desc: 'Где-то там, за лианами, кто-то ухмыльнулся в ответ.', tier: 'purple', howTo: 'Включи светлую тему, открой карточку Monster Rio Punsh и 4 раза быстро кликни по картинке банки.' },
  blockblast_win: { name: 'Взрывной результат', icon: 'fa-bolt', desc: 'Настоящий мастер поля.', tier: 'gold', howTo: 'Набери 1500 очков за один заход в Buzz Blast.' },
  blockblast_master: { name: 'Мастер взрыва', icon: 'fa-crown', desc: 'Никто не остановит.', tier: 'diamond', howTo: 'Набери 3000 очков за один заход в Buzz Blast.' },
  blockblast_combo: { name: 'Тройной удар', icon: 'fa-burst', desc: 'Три в один момент.', tier: 'silver', howTo: 'Очисти 3 линии одним ходом в Buzz Blast.' }
};




function checkModeMaster() {
  if (safeLSGet('ach_matrix', null) && safeLSGet('ach_doom', null) && safeLSGet('ach_konami', null)) {
    unlockAchievement('mode_master');
  }
}

function unlockAchievement(id) {
  const alreadyUnlocked = !!safeLSGet('ach_' + id, null);
  safeLSSet('ach_' + id, 'true');
  const ach = getAchievementDisplay(id);
  if (!ach) return;
  // Для прогрессирующих ачивок (night_owl, early_bird) тост должен всплывать
  // заново на каждой новой стадии — обычные ачивки показываются только один раз.
  const isProgressive = (id === 'night_owl' || id === 'early_bird');
  if (isProgressive) {
    const stageFn = id === 'night_owl' ? getNightOwlStage : getEarlyBirdStage;
    const curStage = stageFn();
    const lastShown = parseInt(safeLSGet('buzz_' + id + '_last_stage', '0'), 10);
    if (curStage <= lastShown) return;
    safeLSSet('buzz_' + id + '_last_stage', curStage);
  } else if (alreadyUnlocked) return;
   if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast achievement-toast';
  t.innerHTML = '<i class="fa-solid ' + ach.icon + '" style="color: #fbbf24; font-size: 20px;"></i><div><span style="color:#fbbf24; font-weight:bold; display:block; margin-bottom:2px; font-size:13px;">' + window.t('achievement_unlocked') + '</span><span style="font-size:15px;">' + ach.name + '</span></div>';
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); t.classList.add('hide'); t.addEventListener('transitionend', () => t.remove()); }, 4000);
  if (id === 'matrix' || id === 'doom' || id === 'konami') checkModeMaster();
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
  { brand: "Monster Energy - Nitro", key: "monster", flavor: "500 мл", rating: 8, img: "images/image_2.webp", caffeine: "160 мг", sugar: "54 г", cal: "223 kcal", ph: "3.5", video: "7659733737701166358", taste: " Сухой, невероятно освежающий и ярко выраженный цитрусовый вкус (микс лайма, лимона и грейпфрута) с легкой кремовой текстурой. Он не приторный и оставляет сухое послевкусие.", tasteEn: "A dry, incredibly refreshing citrus flavor (a mix of lime, lemon, and grapefruit) with a light creamy texture. It's not overly sweet and leaves a dry aftertaste.", price:"2.20 €" },

  { brand: "Monster Energy ", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster-standart.webp", caffeine: "160 мг", sugar: "55 г", cal: "235 kcal", ph: "3.0", video: "7669155756666621206", taste:"Сладкий, насыщенный ягодно-цитрусовый вкус с легкой кислинкой и терпким конфетным послевкусием (многим он напоминает классический кисло-сладкий мармелад или барбарис).", tasteEn: "A sweet, rich berry-citrus flavor with a light tanginess and a tart candy-like aftertaste (many compare it to classic sour-sweet gummy candy).", price:"1.70 €" },

  { brand: "Monster Energy - Ultra blue", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.4", video: "", taste:"Тонкий, прохладный и чистый вкус ледяной голубики и малины с легкими цитрусовыми нотками. Он совсем не приторный, пьется очень легко и оставляет приятную ягодную свежесть.", tasteEn: "A subtle, cool, and clean flavor of icy blueberry and raspberry with light citrus notes. It's not overly sweet at all, goes down very easily, and leaves a pleasant berry freshness.", price:"2.20 €"},

  { brand: "Monster Energy - Ultra black", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-black.webp", caffeine: "150 мг", sugar: "0 г", cal: "15 kcal", ph: "3.6", video: "", taste:"Глубокий, терпкий и невероятно сочный вкус спелой черной череши (с легкими нотками ежевики и смородины). Напиток обладает приятной ягодной кислинкой, он не приторный и отлично освежает в холодном виде.", tasteEn: "A deep, tart, and incredibly juicy flavor of ripe black cherry (with light notes of blackberry and currant). The drink has a pleasant berry tartness, isn't overly sweet, and is very refreshing served cold.", price:"2,30 €" },

  { brand: "Monster Energy - Juiced Viking", key: "monster", flavor: "500 мл", rating: 8, img: "images/monster_viking.webp", caffeine: "160 мг", sugar: "54 г", cal: "215 kcal", ph: "3.7", video: "7633076505349852438", taste:" Глубокий, насыщенный вкус диких северных ягод (смесь черники, ежевики, малины и терпкой черноплодной рябины/аронии). Напиток содержит 5% натурального сока, благодаря чему вкус получается очень плотным, с идеальным балансом сочной сладости и приятной ягодной кислинки. Он напоминает густой премиальный ягодный морс, но с мощным энергетическим зарядом.", tasteEn: "A deep, rich flavor of wild northern berries (a mix of blueberry, blackberry, raspberry, and tart chokeberry). The drink contains 5% real juice, giving it a very full-bodied taste with a perfect balance of juicy sweetness and pleasant berry tartness. It resembles a thick premium berry cordial, but with a powerful energy kick.", price:"2,70 €"},

 { brand: "Monster Energy - Rio Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/rio-punsh.webp", caffeine: "150 мг", sugar: "35 г", cal: "152 kcal", ph: "3.8", video: "", taste:"Официальный профиль — сладкая папайя, ванильное мороженое и легкая нотка касья (черной смородины). Производитель вдохновлялся популярным бразильским десертом Creme de Papaya. Напиток содержит натуральный сок (пюре папайи, манго, концентрат яблока и белого винограда). На вкус он ощущается как густой фруктовый пунш с мягким сливочно-кремовым послевкусием и едва уловимой пикантной ноткой пряностей.", tasteEn: "The official profile is sweet papaya, vanilla ice cream, and a light note of cassis (black currant). The producer drew inspiration from the popular Brazilian dessert Creme de Papaya. The drink contains real juice (papaya and mango puree, apple and white grape concentrate). It tastes like a thick fruit punch with a soft creamy aftertaste and a barely noticeable hint of spice.", price:"1,55 €" },

 { brand: "Monster Energy - Ultra Gold (lando Norris)", key: "monster", flavor: "500 мл", rating: 8, img: "images/lando_noris.webp", caffeine: "160 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "", taste:" Освежающий, сочный и очень необычный микс спелой дыни и цитруса юдзу. Юдзу придает напитку легкую терпкость и благородную кислинку, которая идеально балансирует сладкую и мягкую основу дыни. Напиток без сахара, пьется легко и имеет свежее фруктовое послевкусие.", tasteEn: "A refreshing, juicy, and rather unusual mix of ripe melon and yuzu citrus. The yuzu adds a light tartness and refined acidity that perfectly balances the sweet, soft melon base. Sugar-free, it goes down easily and leaves a fresh fruity aftertaste.", price:"1,65 €" },

 { brand: "Monster Energy - Nitro Cosmic Peach", key: "monster", flavor: "500 мл", rating: 8, img: "images/nitro-cosmic-peach.webp", caffeine: "160 мг", sugar: "53 г", cal: "200 kcal", ph: "3.5", video: "", taste:" Невероятно нежный, сочный и насыщенный вкус спелого персика с легкими цитрусовыми нотками и оттенком сладкой груши. Благодаря азотной основе у напитка нет резких колющих пузырьков газа — вместо этого получается очень мягкая, бархатистая и кремовая текстура с легкой пенкой, напоминающая нежный персиковый сорбет или коктейль.", tasteEn: "An incredibly delicate, juicy, and rich flavor of ripe peach with light citrus notes and a hint of sweet pear. Thanks to the nitro base, the drink has no sharp fizzy bubbles — instead it has a very soft, velvety, creamy texture with a light foam, resembling a delicate peach sorbet or cocktail.", price:"2,60 €" },

 { brand: "Monster Energy - Juiced Riper", key: "monster", flavor: "500 мл", rating: 8, img: "images/juiced-riper.webp", caffeine: "160 мг", sugar: "45 г", cal: "175 kcal", ph: "3.5", video: "", taste:" Взрывной, насыщенный тропический микс с упором на ананас и гуаву, дополненный нотами маракуйи, апельсина, яблока и лимона. Напиток содержит целых 20% натурального сока, благодаря чему он имеет плотный фруктовый профиль, приятную кислинку и напоминает освежающий летний мультифруктовый нектар, замиксованный с классической базой Monster.", tasteEn: "An explosive, rich tropical mix centered on pineapple and guava, rounded out with notes of passionfruit, orange, apple, and lemon. The drink contains a full 20% real juice, giving it a full-bodied fruit profile, pleasant acidity, and the feel of a refreshing summer multi-fruit nectar mixed with the classic Monster base.", price:"1,70 €" },

 { brand: "Monster Energy - Mixxd Punsh", key: "monster", flavor: "500 мл", rating: 8, img: "images/mixxd-punsh.webp", caffeine: "160 мг", sugar: "45 г", cal: "190 kcal", ph: "3.7", video: "", taste:" Плотный, сладкий и многогранный ягодно-тропический фруктовый пунш. Напиток содержит 5,3% натурального сока, в котором переплетаются ноты вишни, черешни, яблока, клюквы, манго и банана. Банан и манго придают напитку мягкую, округлую сладость, а вишня и клюква добавляют легкую кислинку на финише. Он не имеет классического горьковатого привкуса энергетика и пьется как праздничный газированный морс.", tasteEn: "A full-bodied, sweet, and multi-layered berry-tropical fruit punch. The drink contains 5.3% real juice, blending notes of cherry, sweet cherry, apple, cranberry, mango, and banana. Banana and mango give it a soft, round sweetness, while cherry and cranberry add a light tartness on the finish. It lacks the classic bitter energy-drink aftertaste and drinks like a festive sparkling cordial.", price:"2,20 €" },

 { brand: "Monster Energy - Ultra Rosa", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-rosa.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.5", video: "", taste:" Тонкий и сложный ягодно-цветочный микс с освежающими нотками. Производитель вдохновлялся легкими оттенками розового вина (Rosé). Во вкусе отчетливо угадываются спелая малина, клубника и сочный розовый грейпфрут, переходящие в благородное, едва уловимое цветочное послевкусие (напоминающее розу). Напиток абсолютно не приторный, пьется мягко и оставляет приятную кислинку.", tasteEn: "A subtle and complex berry-floral mix with refreshing notes. The producer took inspiration from the light tones of rosé wine. The flavor clearly features ripe raspberry, strawberry, and juicy pink grapefruit, giving way to a refined, barely-there floral aftertaste (reminiscent of rose). Not overly sweet at all, it drinks smoothly and leaves a pleasant tartness.", price:"1,75 €" },

 { brand: "Monster Energy - Rehab Green Tea", key: "monster", flavor: "500 мл", rating: 8, img: "images/rehab-green-tea.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "50 kcal", ph: "4.6", video: "7558385802955476227", taste:" Очень мягкий, натуральный и освежающий вкус холодного зеленого чая с легкими фруктовыми и травяными оттенками. Он умеренно сладкий (значительно менее приторный, чем классические газированные энергетики). Многим по вкусовому профилю он напоминает знаменитый холодный чай AriZona Green Tea, но со скрытым внутри мощным энергетическим зарядом.", tasteEn: "A very smooth, natural, and refreshing iced green tea flavor with light fruity and herbal undertones. Moderately sweet (much less sickly than classic sparkling energy drinks). Many find its flavor profile reminiscent of the famous AriZona Green Tea, but with a powerful energy kick hidden inside.", price:" 3,10 €" },

 { brand: "Monster Energy - Rehab Tea + Lemonade", key: "monster", flavor: "500 мл", rating: 8, img: "images/tea-lemonade.webp", caffeine: "160 мг", sugar: "9.5 г", cal: "55 kcal", ph: "4.4", video: "", taste:"Классический, идеально сбалансированный вкус домашнего чайного лимонада (знаменитый рецепт Arnold Palmer). В нем идеально сочетаются насыщенный натуральный заваренный черный чай и кислинка спелого лимона. Напиток содержит всего 25 калорий на банку, электролиты и кокосовую воду, поэтому он совершенно не приторный и обладает легким, освежающим фруктово-чайным профилем.", tasteEn: "A classic, perfectly balanced homemade iced tea lemonade flavor (the famous Arnold Palmer recipe). It perfectly blends rich brewed black tea with the tartness of ripe lemon. The drink has only 25 calories per can along with electrolytes and coconut water, giving it a completely non-sickly, light, refreshing fruity-tea profile.", price:"2,30 €"},

 { brand: "Monster Energy - Rehab Tea + Peach", key: "monster", flavor: "500 мл", rating: 9, img: "images/rehab-tea-peach.webp", caffeine: "160 мг", sugar: "12 г", cal: "59 kcal", ph: "4.4", video: "", taste:" Максимально натуральный, мягкий и сочный вкус прохладного домашнего чая с персиком. За счет добавления 3,2% настоящего персикового сока вкус получается объемным и глубоким, но при этом легким. Напиток низкокалорийный (всего 25 калорий на всю банку) и совершенно не приторный, что делает его похожим на премиальный холодный чай с приятной фруктовой свежестью на финише.", tasteEn: "An extremely natural, smooth, and juicy flavor of chilled homemade peach iced tea. Thanks to 3.2% real peach juice, the taste is full-bodied and deep yet still light. Low in calories (just 25 per can) and completely non-sickly, it feels like a premium iced tea with a pleasant fruity freshness on the finish.", price:"2,40 €" },

 { brand: "Monster Energy - Ultra Sunrise", key: "monster", flavor: "473 мл", rating: 8, img: "images/ultra-sunrise.webp", caffeine: "155 мг", sugar: "0 г", cal: "10 kcal", ph: "3.3", video: "", taste:" Легкий, искрящийся и очень освежающий вкус спелого апельсина и сладкого мандарина с выраженными нотками других цитрусовых. Он напоминает газировку Fanta или газированный апельсиновый сок, но абсолютно без сахара, без тяжелой приторности и с чистым, слегка терпким финишем на выдохе. Отлично заменяет утренний апельсиновый сок, но при этом дает мощный заряд энергии.", tasteEn: "A light, sparkling, and very refreshing flavor of ripe orange and sweet tangerine with pronounced notes of other citrus fruits. It resembles Fanta or sparkling orange juice, but completely sugar-free, without heavy sweetness, and with a clean, slightly tart finish. A great replacement for morning orange juice, while still delivering a powerful energy kick.", price:"2,60 €" },

 { brand: "Monster Energy - Reserve White Pineapple Flavour", key: "monster", flavor: "500 мл", rating: 8, img: "images/reserve-white-pineapple.webp", caffeine: "160 мг", sugar: "30 г", cal: "135 kcal", ph: "3.6", video: "", taste:" Безупречный, чистый и глубокий вкус спелого сахарного ананаса (вкус «отборной центральной части» фрукта). Напиток сладкий, но сбалансирован легкой цитрусовой кислинкой. В отличие от серии Ultra Gold, этот вариант содержит сахар, за счет чего ананасовый профиль ощущается очень насыщенным, натуральным и сочным. Многим по вкусу он напоминает белые мармеладные мишки Haribo.", tasteEn: "An impeccable, clean, and deep flavor of ripe sugar pineapple (the taste of the fruit's 'select core'). The drink is sweet but balanced with a light citrus tartness. Unlike the Ultra Gold line, this version contains sugar, making the pineapple profile feel very rich, natural, and juicy. Many find it reminiscent of white Haribo gummy bears.", price:"3,00 €" },

 { brand: "Monster Energy - Reserve Peaches n' Crème", key: "monster", flavor: "473 мл", rating: 8, img: "images/reserve-peaches-creme.webp", caffeine: "175 мг", sugar: "28 г", cal: "120 kcal", ph: "3.7", video: "7584185459459312918", taste:" Сладкий, насыщенный и бархатистый десертный профиль. Он идеально передает вкус спелого сочного персика в сочетании с густыми ванильными сливками. Напиток напоминает жидкие персиковые конфеты-мармеладки или нежное сливочно-персиковое мороженое. Вкус очень плотный и сладкий, без привычной кислинки или горького послевкусия энергетика.", tasteEn: "A sweet, rich, velvety dessert profile. It perfectly captures the taste of ripe juicy peach paired with thick vanilla cream. The drink resembles liquid peach gummy candy or delicate peaches-and-cream ice cream. Very full-bodied and sweet, without the usual tartness or bitter energy-drink aftertaste.", price:"4,30 €" },

 { brand: "Monster Energy - Ultra Fantasy Ruby Red", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-fantasy-ruby-red.webp", caffeine: "160 мг", sugar: "0 г", cal: "14 kcal", ph: "3.4", video: "7532186692233596182", taste:" Сочный, невероятно освежающий и чистый вкус спелого розового/красного грейпфрута с деликатным цитрусовым финишем. Напиток идеально сбалансирован: он не слишком сладкий и не имеет сильной грейпфрутовой горечи. По вкусу он очень напоминает премиальный грейпфрутовый тоник или газировку вроде Fresca/Squirt, но с фирменным энергетическим комплексом Monster.", tasteEn: "A juicy, incredibly refreshing, and clean flavor of ripe pink/red grapefruit with a delicate citrus finish. The drink is perfectly balanced: not too sweet and without strong grapefruit bitterness. It closely resembles a premium grapefruit tonic or a soda like Fresca/Squirt, but with Monster's signature energy blend.", price:"2,00 €" },

 { brand: "Monster Energy - Ultra Peachy Keen", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-peach-keen.webp", caffeine: "150 мг", sugar: "0 г", cal: "11 kcal", ph: "3.2", video: "", taste:" Яркий, сочный и очень натуральный вкус спелой южной прасковы. В отличие от линейки Rehab Peach (где персик идет с негазированным чаем), здесь вас ждет классическая мягкая газация. Напиток умеренно сладкий, с легкой фруктовой кислинкой, а по вкусовому профилю многим очень сильно напоминает популярные жевательные мармеладки в виде персиковых колечек.", tasteEn: "A bright, juicy, and very natural ripe southern peach flavor. Unlike the Rehab Peach line (which pairs peach with unsweetened iced tea), this one has classic gentle carbonation. Moderately sweet with a light fruity tartness, its flavor profile strongly resembles popular gummy peach rings.", price:"2,30 €" },

 { brand: "Monster Energy - Ultra Blue Hawaiian", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-blue-hawaiian.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "7631582942761962774", taste:" Освежающий, легкий и сбалансированный микс экзотических полинезийских фруктов. Основной профиль — это сочный ананас, спелый мандарин/цитрусы и легкий, деликатный оттенок кокоса. Многие описывают его как более мягкую, не приторную версию классического коктейля Пина Колада или как облегченный вариант старого вкуса Ultra Gold, но с приятным кокосово-цитрусовым шлейфом.", tasteEn: "A refreshing, light, and balanced mix of exotic Polynesian fruits. The main profile is juicy pineapple, ripe tangerine/citrus, and a subtle, delicate hint of coconut. Many describe it as a softer, less sickly version of a classic Piña Colada, or a lighter take on the old Ultra Gold flavor with a pleasant coconut-citrus trail.", price:"4,50 €" },

 { brand: "Monster Energy - M3 Extra Strength", key: "monster", flavor: "150 мл", rating: 8, img: "images/m3-extra-strength.webp", caffeine: "140 мг", sugar: "10 г", cal: "65 kcal", ph: "3.7", video: "7532190064059763990", taste:" По сути, это гиперконцентрированная версия классического Monster Energy, но с важным технологическим нюансом. За счет использования особой азотной технологии газации (Nitrous Oxide), напиток не бьет в нос резкими пузырьками. Текстура у него невероятно мягкая, гладкая и мелкопузырчатая, напоминающая дорогое шампанское. Сам вкус чистый, плотный, сладко-цитрусовый, с очень мощной фирменной «монстровской» кислинкой", tasteEn: "Essentially a hyper-concentrated version of classic Monster Energy, but with an important technological twist. Thanks to a special nitro carbonation technology (Nitrous Oxide), the drink doesn't hit you with sharp fizzy bubbles. The texture is incredibly smooth, soft, and finely bubbled, reminiscent of expensive champagne. The taste itself is clean, full-bodied, sweet-citrus, with a very strong signature Monster tartness.", price:"4,00 €"
  },

 { brand: "Monster Energy - Ultra Vice Guava", key: "monster", flavor: "473 мл", rating: 9, img: "images/ultra-vice-guava.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "", taste:" Легкий, освежающий и слегка терпкий вкус спелой тропической гуавы с деликатными оттенками карамболы (звездного фрукта) и сладкой клубники. Напиток обладает мягкой цитрусовой кислинкой и очень чистым финишем. Фанаты часто сравнивают его базу с классическим Ultra White, но с добавлением нежного, ненавязчивого фруктового аромата гуавы.", tasteEn: "A light, refreshing, slightly tart flavor of ripe tropical guava with delicate notes of star fruit and sweet strawberry. The drink has a mild citrus acidity and a very clean finish. Fans often compare its base to the classic Ultra White, with the addition of a soft, subtle guava fruit aroma.", price:"2,50 €" },

 { brand: "Monster Energy - Ultra Violet", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra-violet.webp", caffeine: "150 мг", sugar: "0 г", cal: "13 kcal", ph: "3.6", video: "", taste:" Освежающий, легкий и искрящийся вкус сочного темного винограда с приятными цитрусовыми нотками и деликатной кислинкой на финише. Производитель описывает его профиль как «вкус волшебной пыльцы» (pixie dust flavor), так как он напоминает популярные в США виноградные конфеты-порошки ручной работы. Напиток пьется очень мягко, он абсолютно не приторный и оставляет приятную ягодную свежесть.", tasteEn: "A refreshing, light, sparkling flavor of juicy dark grape with pleasant citrus notes and a delicate tartness on the finish. The producer describes its profile as a 'pixie dust flavor', as it resembles popular US grape powder candies. The drink is very smooth to sip, not sickly at all, and leaves a pleasant berry freshness.", price:"2,25 €" },

 { brand: "Monster Energy - Ultra Wild Passion", key: "monster", flavor: "500 мл", rating: 8, img: "images/ultra_wild_passion.webp", caffeine: "150 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "7671963390838918422",taste:" Яркий, сочный и тропический вкус спелой маракуйи (passionfruit) с легким цитрусовым акцентом. Он имеет идеальный баланс кислого и сладкого. Несмотря на полное отсутствие сахара, этот вкус отлично скрывает подсластители, пьется легко, приятно освежает и напоминает легкий летний коктейль из тропических фруктов. Его часто сравнивают по легкости с классическим белым Ultra White, но с насыщенным ароматом маракуйи.", tasteEn: "A bright, juicy, tropical flavor of ripe passionfruit with a light citrus accent, offering a perfect sweet-tart balance. Despite being completely sugar-free, it hides its sweeteners well, goes down easily, refreshes pleasantly, and feels like a light summer tropical fruit cocktail. Often compared in lightness to the classic Ultra White, but with a rich passionfruit aroma.", price:"3,50 €" },

{ brand: "Monster Energy - Juiced Voodoo Grape", key: "monster", flavor: "473 мл", rating: 8, img: "images/juice_voodoo.webp", caffeine: "160 мг", sugar: "36 г", cal: "150 kcal", ph: "2.7", video: "7678420816043822358",taste:"Плотный, насыщенный и десертный вкус темного винограда с глубоким фруктовым профилем. Напиток имеет тяжелую соковую текстуру с преобладанием экстремальной сладости, которую на финише пытается уравновесить резкая ягодная кислинка. Несмотря на высокую плотность, он пьется как газированный нектар, оставляя долгое и приторное послевкусие, напоминающее виноградный Чупа-Чупс или жевательную резинку. Его часто сравнивают по вкусовому направлению с Ultra Violet, но за счет добавления натурального сока Voodoo Grape гораздо гуще, слаще и имеет специфический аптечный оттенок американского сиропа от кашля.", tasteEn: "A full-bodied, rich, dessert-like dark grape flavor with a deep fruity profile. The drink has a heavy juice-like texture dominated by extreme sweetness, which a sharp berry tartness tries to balance on the finish. Despite its thickness, it drinks like a carbonated nectar, leaving a long, sickly-sweet aftertaste reminiscent of grape lollipops or bubble gum. Often compared in flavor direction to Ultra Violet, but thanks to real Voodoo Grape juice it's much thicker, sweeter, and has a distinct medicinal note similar to American cough syrup.", price:"3,50 €" },

 { brand: "Monster Energy - The Doctor VR46", key: "monster", flavor: "500 мл", rating: 8, img: "images/vr-46.webp", caffeine: "160 мг", sugar: "52 г", cal: "219 kcal", ph: "3", video: "7674675530762816790", taste:" Максимально свежий, искрящийся и бодрящий вкус спелых цитрусовых с акцентом на лимон, апельсин и легкую мандариновую сладость. Он абсолютно не похож на классические «химические» энергетики, пьется легко, обладает умеренной газацией и оставляет приятную кислинку.", tasteEn: "An extremely fresh, sparkling, and invigorating flavor of ripe citrus, with an emphasis on lemon, orange, and light tangerine sweetness. Nothing like the classic 'chemical' energy drink taste — it goes down easily, has moderate carbonation, and leaves a pleasant tartness.", price:" 2,65 €" },
  
 { brand: "Monster Energy - Juiced Aussie Style Lemonade", key: "monster", flavor: "500 мл", rating: 5, img: "images/juced-juce.webp", caffeine: "160 мг", sugar: "49 г", cal: "211 kcal", ph: "3.4", video: "7598063208871628054", taste:"Это идеальная интерпретация классического домашнего лимонада. В отличие от обычных химозных лимонных газировок, здесь используется концентрат сока спелых австралийских цитрусов. Вкус имеет идеальный баланс: он одновременно сладкий, интенсивно-кислый, очень сочный и освежающий. Напоминает натуральный лимонад со льдом, который сбивает любую жажду.", tasteEn: "This is a perfect take on classic homemade lemonade. Unlike typical artificial-tasting lemon sodas, this one uses concentrate from ripe Australian citrus. The flavor is perfectly balanced: sweet, intensely tart, very juicy, and refreshing all at once. It resembles a real iced lemonade that quenches any thirst.", price:"2,35 €" },
  // --- HELL (скопируй 11 раз, у тебя 1 оригинал) ---
  { brand: "Hell Energy - The summer edition", key: "hell", flavor: "250 мл", rating: 7, img: "images/image_4.webp", caffeine: "80 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7659733345500171542", badge: "hit", tasteEn: "A bright summer citrus-fruit flavor — light, sweet, and refreshing, with a juicy fruity finish typical of Hell's seasonal editions." },

  { brand: "Hell Energy - The Strong Appel", key: "hell", flavor: "250 мл", rating: 6, img: "images/the_strong_appel.webp", caffeine: "96 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7530127178420391191", badge: "hit", tasteEn: "A rich, sweet green apple flavor with a slightly sour, candy-like edge — bold and straightforward, true to the 'Strong' in its name." },

  { brand: "Hell Ice Coffee - Choco Raspberry", key: "hell", flavor: "250 мл", rating: 10, img: "images/choco_raspberry.webp", caffeine: "80 мг", sugar: "27 г", cal: "115 kcal", ph: "3.1", video: "7620187284603718934", badge: "hit", tasteEn: "A smooth iced coffee base with rich chocolate and a tart raspberry twist — a dessert-like combination of coffee, cocoa, and berry sweetness." },

  { brand: "Hell Ice Coffee - Dark range", key: "hell", flavor: "250 мл", rating: 8, img: "images/hell_coffe_orange.webp", caffeine: "80 мг", sugar: "27 г", cal: "145 kcal", ph: "3.1", video: "7584161789407923478", badge: "hit", tasteEn: "A bold, dark roast iced coffee flavor — intense and slightly bitter, closer to a real espresso-based drink than a sweet coffee soda." },

  // --- RED BULL (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Red Bull", key: "redbull", flavor: "250 мл", rating: 6, img: "images/image_3.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.4", video: "7659734438976294166" },

  { brand: "Red Bull - The Blue Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-blue-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7525141055956602134" },

  { brand: "Red Bull - The Ice Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-ice-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7620449420299210007" },

  { brand: "Red Bull - The Summer Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-summer-edition.webp", caffeine: "80 мг", sugar: "26 г", cal: "110 kcal", ph: "3.3", video: "7525141055956602134" },

  { brand: "Red Bull - The White Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-white-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "7620187045151100163" },

  { brand: "Red Bull - The Winter Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-winter-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Pink Edition", key: "redbull", flavor: "250 мл", rating: 6, img: "images/redbull-pink-edition.webp", caffeine: "80 мг", sugar: "27 г", cal: "112 kcal", ph: "3.3", video: "" },

  { brand: "Red Bull - The Peach Edition", key: "redbull", flavor: " 250 мл", rating: 6, img: "images/redbull-peach.webp", caffeine: "80 мг", sugar: "27.5 г", cal: "115 kcal", ph: "3.2", video: "7659734438976294166" },

  // --- BATTERY (скопируй 4 раза) ---

  { brand: "Battery Energy - Exotic", key: "battery", flavor: "500 мл", rating: 7, img: "images/battery_exotic.webp", caffeine: "160 мг", sugar: "57 г", cal: "250 kcal", ph: "2.5", video: "7595499648903613718" },

  // --- NON STOP (скопируй 3 раза) ---
  { brand: "Non Stop", key: "nonstop", flavor: "250 мл", rating: 6, img: "images/non_stop.webp", caffeine: "87 мг", sugar: "25 г", cal: "102 kcal", ph: "2.8", video: "7593795836908260630" },

  // --- BURN (скопируй 5 раз, у тебя 1 оригинал) ---
  { brand: "Burn", key: "burn", flavor: "Cherry, 250 мл", rating: 7, img: "images/image_5.webp", caffeine: "75 мг", sugar: "28 г", cal: "118 kcal", ph: "3.6", video: "7361838290757873979" },

  // --- ROCK STAR (скопируй 2 раза) ---
  { brand: "Rockstar Energy - Blueberry Pomegranate", key: "rockstar", flavor: "500 мл", rating: 5, img: "images/rockstar_blueberry.webp", caffeine: "200 мг", sugar: "24 г", cal: "105 kcal", ph: "3.2", video: "7593795386599378198" },


  // --- C4 (1 раз) ---
  { brand: "C4", key: "c4", flavor: " 500 мл", rating: 8, img: "images/c4.webp", caffeine: "200 мг", sugar: "0 г", cal: "10 kcal", ph: "3.5", video: "" },

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
// ИНФОРМАЦИЯ О ЛИНЕЙКАХ (общая для всех банок одной линейки: Ultra, Rehab, Nitro и т.д.)
// Ключ — название линейки в нижнем регистре (то, что возвращает getDrinkLine).
// Пиши сюда тёплым, личным тоном — это то, что видит каждый, кто открывает
// карточку напитка. Не выдумывай точные даты/факты, если не уверен — 
// лучше написать честно и по-своему, чем соврать про историю бренда.
// ==========================================
const bLineColors = {
  ultra: '#00e5ff',
  rehab: '#4ade80',
  nitro: '#a855f7',
  reserve: '#fbbf24',
  juiced: '#ff6a00',
  editions: '#1e6fff',
  'ice coffee': '#8b5e3c',
  rio: '#ffb347',
  mixxd: '#ff3b5c',
  m3: '#c084fc',
  doctor: '#ffd700'
};

const bLineInfo = {
  ultra: {
    title: 'О линейке Ultra',
    desc: 'Линейка Monster Ultra появилась в США в 2012 году и быстро стала самой популярной серией бренда в Америке и европейских странах. Её создали для тех, кому не нравилась приторная сладость классических энергетиков: здесь вообще нет сахара, а вкусы получились очень легкими, фруктово-цитрусовыми и освежающими. Главная фишка, которую сразу замечаешь — это сами банки с необычным матовым и рельефным покрытием, из-за чего их приятно даже просто держать в руках. Самый первый белый вкус этой серии быстро стал культовым у геймеров, а в самой линейке сейчас столько разных вариантов, что у каждого фаната легко находится свой любимый цвет и вкус.'
  },
  rehab: {
    title: 'О линейке Rehab',
    desc: 'Линейка Monster Rehab стартовала в США в 2011 году и завоевала огромную популярность в Америке, а также среди европейских любителей фитнеса и активного отдыха. Её создали как напиток для восстановления сил. Главное отличие серии — это полное отсутствие газов и легкая основа из натурального заваренного чая, сока и лимонада. Вместо привычной шипучки получился освежающий холодный чай, который отлично спасает от жажды и мягко бодрит. Интересно, что в состав Rehab специально добавили электролиты, витамины и кокосовую воду, чтобы напиток помогал организму прийти в себя после тяжелых тренировок или бурных ночей.'
  },
  nitro: {
    title: 'О линейке Nitro',
    desc: 'Линейка Monster Nitro дебютировала в США в 2021 году и моментально привлекла внимание любителей необычных напитков в Америке и Великобритании. Её главная фишка скрыта в названии: в обычный энергетический микс добавляют закись азота. Благодаря этому текстура напитка кардинально меняется — пузырьки становятся мелкими и кремовыми, создавая ощущение густой, бархатистой пены, как у хорошего разливного пива или нитро-кофе. Интересно, что флагманский вкус Super Dry получился сухим, с выраженной лаймовой кислинкой, которая совершенно не похожа на привычные сладкие энергетики. Поначалу к такому покалывающему эффекту на языке нужно привыкнуть, но для фанатов эта линейка стала настоящим глотком свежего воздуха.'
  },
  reserve: {
    title: 'О линейке Reserve',
    desc: 'Линейка Monster Reserve стартовала в США в октябре 2021 года и практически сразу перекочевала в Великобританию и страны Европы. Идея серии максимально простая, но рабочая: бренд взял за основу мощную энергетическую базу классического зеленого «Монстра» (со всем его сахаром и калориями), но полностью переработал вкусовую палитру. Вместо привычной химозной классики они сделали ставку на чистые, сочные и понятные фруктовые вкусы, вроде белого ананаса, арбуза или апельсинового крема. Интересно, что фанаты часто называют Reserve «сахарным близнецом» линейки Ultra: например, вкус White Pineapple один в один похож на популярный Ultra Gold, только с плотным, насыщенным сиропным телом. Дизайн банок тоже сделали строгим и премиальным — черный глянец в сочетании с яркими цветными акцентами под каждый фрукт.Впиши сюда свою историю про Reserve: почему считаешь эту линейку премиальной, что выделяет её вкус на фоне остальных банок бренда.'
  },
  juiced: {
    title: 'О линейке Juiced',
    desc: 'ВЛинейка Monster Juiced (в США известная как Juice Monster) берет свое начало еще в 2005 году в США с выходом легендарного вкуса Khaos, а сегодня она невероятно популярна в Великобритании, странах Европы и Латинской Америке. Её создали как сочную альтернативу классическим энергетикам: здесь мощная энергетическая база смешивается с приличной порцией натурального фруктового сока. Напитки получились плотными, очень сладкими и насыщенными, из-за чего они ощущаются как яркий тропический нектар, а не обычная газировка. Интересно, что дизайн для этих банок бренд часто разрабатывает совместно с известными уличными художниками, превращая каждую упаковку в произведение граффити-искусства. Пожалуй, самый громкий хит серии — небесно-голубой Mango Loco в стиле мексиканского Дня мертвых, который фанаты скупают по всему миру просто ради безумного вкуса спелого манго.пиши сюда свою историю про Juiced: что даёт добавление настоящего сока, какие вкусы из этой линейки любишь больше всего и почему.'
  },
  editions: {
    title: 'О линейке Editions',
    desc: 'Линейка Red Bull Editions — это сезонные и вкусовые вариации классического Red Bull, где вместо привычной "энергетической" базы на первый план выходит конкретный фрукт: черника, арбуз, гранат, персик и десятки других сочетаний в зависимости от страны и сезона. Идея простая: та же формула кофеина и таурина, что и в оригинале, но с ярким фруктовым характером вместо нейтрального вкуса. Именно поэтому банки Editions легко узнать по цвету — каждая линия обычно ассоциируется со своим цветом крышки и этикетки. Впиши сюда свою историю про Editions: какой вкус тебе запомнился больше остальных и почему.'
  },
  'ice coffee': {
    title: 'О линейке Ice Coffee',
    desc: 'Hell Ice Coffee — отдельная кофейная линейка бренда Hell Energy, где вместо привычной энергетической газировки используется настоящий холодный кофе с добавлением кофеина и сливок. По сути, это гибрид между баночным кофе и энергетиком: напиток пьётся как десертный холодный латте, но по итогу даёт заряд не хуже классического Hell. Линейка ощутимо мягче по вкусу — совсем не похожа на резкие газированные версии бренда. Впиши сюда свою историю про Ice Coffee: чем этот вкус отличается от классического Hell на твой взгляд и какой из вариантов больше нравится.'
  },
  rio: {
    title: 'О линейке Rio Punch',
    desc: 'Rio Punch делает ставку на бразильский десертный вайб — сладкая папайя и ванильные сливки вместо привычной кислой цитрусовой базы Monster. Это не отдельная громкая суб-линейка, а скорее один яркий вкус, который выделяется на фоне остальной классики бренда своей десертной, а не энергетической подачей. Впиши сюда своё мнение: заходит ли тебе такой сладко-кремовый профиль или всё же предпочитаешь классику.'
  },
  mixxd: {
    title: 'О линейке Mixxd Punch',
    desc: 'Mixxd Punch — фруктовый микс-пунш с вишней, яблоком, клюквой, манго и бананом в одной банке. Идея простая: не выбирать один фрукт, а смешать сразу несколько, получив что-то среднее между праздничным морсом и энергетиком. Впиши сюда своё мнение о балансе вкусов — что здесь доминирует по факту и стоит ли пробовать.'
  },
  m3: {
    title: 'О линейке M3',
    desc: 'M3 Extra Strength — компактная банка 150 мл с концентрированной формулой и азотной газацией (Nitrous Oxide), из-за которой текстура получается мягкой и почти без резких пузырьков, а не как в стандартной линейке. Задумывался как "быстрый мощный дозаряд" в маленьком формате. Впиши сюда своё мнение: стоит ли переплачивать за компактность и концентрат.'
  },
  doctor: {
    title: 'О линейке The Doctor VR46',
    desc: 'The Doctor VR46 — совместный вкус с пилотом MotoGP Валентино Росси (позывной "The Doctor"), сделанный на цитрусовой базе. По сути это имиджевый вкус под конкретное имя, а не отдельная широкая линейка. Впиши сюда своё мнение: чувствуется ли в этом что-то особенное или это обычный цитрусовый Monster с другой этикеткой.'
  },
};
// Небольшой сдвиг оттенка цвета точки для конкретной линейки внутри
// бренда — чтобы Ultra/Rehab/Nitro и т.д. не сливались в одинаковый
// цвет в выпадающем списке.
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}
function lineDotColor(brandKey, index, total) {
  const baseHex = bColors[brandKey] || '#888888';
  const hsl = hexToHsl(baseHex);
  if (total <= 1) return baseHex;
  // Плавный, но заметный градиент в пределах одного цвета бренда:
  // оттенок и светлота едут по порядку от края к краю. Разброс шире, чем
  // раньше, — иначе при 2-3 линейках разница почти не видна на глаз.
  const hueSpread = 70; // общий разброс оттенка в градусах
  const step = hueSpread / (total - 1);
  const hueOffset = -hueSpread / 2 + step * index;
  const newHue = ((hsl.h + hueOffset) % 360 + 360) % 360;
  const lightnessRange = 30; // разброс светлоты
  const lightness = 38 + (index / (total - 1)) * lightnessRange;
  const saturation = Math.max(Math.min(hsl.s, 90), 55);
  return `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
}
// Парсинг числовых значений из строк вида "2,20 €", "500 мл", "160 мг"
function parsePriceValue(str) {
  if (!str) return null;
  const cleaned = String(str).trim().replace(',', '.');
  const match = cleaned.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}
function parseVolumeMl(str) {
  if (!str) return null;
  const match = String(str).match(/(\d+)\s*мл/);
  return match ? parseInt(match[1], 10) : null;
}
function parseCaffeineMg(str) {
  if (!str) return null;
  const match = String(str).match(/(\d+)\s*мг/);
  return match ? parseInt(match[1], 10) : null;
}
function getPricePerLiter(drink) {
  const price = parsePriceValue(drink.price);
  const volume = parseVolumeMl(drink.flavor);
  if (!price || !volume) return null;
  return (price / (volume / 1000)).toFixed(2);
}
function getPricePer100mgCaffeine(drink) {
  const price = parsePriceValue(drink.price);
  const caff = parseCaffeineMg(drink.caffeine);
  if (!price || !caff) return null;
  return (price / (caff / 100)).toFixed(2);
}

// Достаёт линейку из названия: "Monster Energy - Ultra blue" -> "Ultra"
function getDrinkLine(drink) {
  // Ручные шаблоны для брендов, где линейка определяется не первым
  // словом после дефиса, а общим признаком в названии. Работает
  // автоматически и для будущих напитков — если новый вкус Red Bull
  // содержит "Edition", а новый Hell начинается с "Hell Ice Coffee",
  // он сам попадёт в нужную линию без правок кода.
  if (drink.key === 'redbull' && /Edition/i.test(drink.brand)) return 'Editions';
  if (drink.key === 'hell' && /^Hell Ice Coffee/i.test(drink.brand)) return 'Ice Coffee';

  const parts = drink.brand.split(' - ');
  if (parts.length < 2) return null;
  const rest = parts[1].trim();
  if (!rest) return null;
  const words = rest.split(' ');
  const skip = new Set(['the', 'a', 'an']);
  let i = 0;
  while (i < words.length - 1 && skip.has(words[i].toLowerCase())) i++;
  return words[i];
}
// ==========================================
// ПОСТОЯННЫЙ ID АГЕНТА И КАСТОМНОЕ ИМЯ
// ==========================================
function getAgentId() {
  let id = safeLSGet('buzz_agent_id', null);
  if (!id) {
    id = String(Math.floor(Math.random() * 9000 + 1000));
    safeLSSet('buzz_agent_id', id);
  }
  return id;
}
function getAgentCallsign() {
  return safeLSGet('buzz_agent_callsign', null);
}
function setAgentCallsign(name) {
  safeLSSet('buzz_agent_callsign', name);
}
function getClownRecord() {
  return safeLSGet('buzz_agent_clown_record', null);
}
function setClownRecord(name) {
  safeLSSet('buzz_agent_clown_record', name);
}
// ==========================================
// 3. ЛОГИКА ИЗБРАННОГО
// ==========================================
function getFavs() { return safeLSGetJSON('energy_favs', []); }
function updateFavBadge() {
  const badge = document.getElementById('favBadge');
  if (!badge) return;
  const n = getFavs().length;
  badge.textContent = n > 0 ? n : '';
}
function saveFavs(arr) { 
  safeLSSetJSON('energy_favs', arr); 
  if (arr.length === 3 && typeof unlockAchievement !== 'undefined') unlockAchievement('fav3');
  updateFavBadge();
}
document.addEventListener('DOMContentLoaded', () => { if (typeof updateFavBadge === 'function') updateFavBadge(); });

// ==========================================
// 4. ГЕНЕРАЦИЯ КАРТОЧЕК ИЗ МАССИВА
// ==========================================
const grid = document.getElementById('cardsGrid') || document.createElement('div');

// Объявлено здесь (а не в разделе "Фильтры" ниже), потому что renderCards()
// вызывает applyFilters(), а applyFilters() читает activeBrandFilter —
// первый вызов renderCards() происходит раньше, чем JS доходит до раздела
// "8. ФИЛЬТРЫ", и let-переменная там ещё была бы в temporal dead zone.
let activeBrandFilter = 'all';
let activeLineFilter = null;
let brandDropdownView = 'brands'; // 'brands' | 'lines'
let brandDropdownSelectedBrand = null;
let noSugarOnly = false;
let searchQuery = '';
let activeVolumeFilter = 'all';
let activeCaffeineFilter = 'all';
function caffeineBucket(mg) {
  if (mg < 100) return 'low';
  if (mg <= 160) return 'mid';
  return 'high';
}

function parseCardVolumeMl(flavorStr) {
  const m = String(flavorStr || '').match(/(\d+)\s*мл/);
  return m ? parseInt(m[1], 10) : null;
}
function createCard(drink) {
  const card = document.createElement('article');
  card.className = 'energy-card';
  card.dataset.brand = drink.key;
  card.dataset.rating = drink.rating;
    card.dataset.video = drink.video;
  card.dataset.volume = parseCardVolumeMl(drink.flavor) || '';
  card.dataset.caffeine = parseCaffeineMg(drink.caffeine) || '';
  card.dataset.drinkIndex = drinks.indexOf(drink);
    card.dataset.line = getDrinkLine(drink) || '';
  // FIX 3: ключ избранного — по индексу (уникально для каждого напитка)
  const favKey = 'drink_' + drinks.indexOf(drink);
  const isFav = getFavs().includes(favKey);
  
  let imgHtml;
  if (drink.img) {
    imgHtml = `<div class="img-skeleton"></div><img src="${drink.img}" alt="${drink.brand}" loading="lazy" data-fallback="true" class="img-loading">`;
  } else {
    imgHtml = `<div class="placeholder-img">${drink.brand}<br><span>${drink.flavor}</span></div>`;
  }
    const mcColor = bColors[drink.key] || "var(--accent)";
  const flavorText = drink.flavor.replace(/(\d+\s*мл)/, '<span class="ml-unit" style="--mc:' + mcColor + '">$1</span>');

  const isSunriseGlow = /Ultra Sunrise/i.test(drink.brand) && typeof isManualLightTheme === 'function' && isManualLightTheme();
  const isNewDrink = drinks.indexOf(drink) >= drinks.length - 5;
  card.innerHTML = `
    <div class="card-strip"></div><div class="card-glare"></div>
    ${drink.badge ? `<div class="card-badge"><i class="fa-solid fa-fire"></i> ${t('card_hit_badge')}</div>` : (isNewDrink ? `<div class="card-badge card-badge-new"><i class="fa-solid fa-star"></i> ${t('card_new_badge')}</div>` : '')}
    <button class="fav-btn ${isFav ? 'active' : ''}" aria-label="В избранное">
      <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
    </button>
    <div class="card-image">${imgHtml}</div>
    <div class="card-content">
     <h3 class="card-brand ${isSunriseGlow ? 'sunrise-glow' : ''}">${drink.brand}</h3>
      <p class="card-flavor">${flavorText}</p>
      <div class="card-rating"><div class="stars"></div><div class="rating-counter" data-target="${drink.rating}"></div></div>
      ${getPricePerLiter(drink) ? `<div class="card-price-per-liter">${getPricePerLiter(drink)} €/л</div>` : ''}
            <div class="card-stats">
        <div class="stat" style="background:rgba(0, 229, 255, 0.15); border-color:rgba(0, 229, 255, 0.7); box-shadow: 0 0 12px rgba(0, 229, 255, 0.25)"><div class="stat-value">${drink.caffeine}</div><div class="stat-label">${t('card_caffeine')}</div></div>
        <div class="stat" style="background:rgba(255, 64, 129, 0.15); border-color:rgba(255, 64, 129, 0.7); box-shadow: 0 0 12px rgba(255, 64, 129, 0.25)"><div class="stat-value">${drink.sugar}</div><div class="stat-label">${t('card_sugar')}</div></div>
        <div class="stat" style="background:rgba(255, 171, 0, 0.15); border-color:rgba(255, 171, 0, 0.7); box-shadow: 0 0 12px rgba(255, 171, 0, 0.25)"><div class="stat-value">${drink.cal}</div><div class="stat-label">${t('card_calories')}</div></div>
        <div class="stat" style="background:rgba(179, 136, 255, 0.15); border-color:rgba(179, 136, 255, 0.7); box-shadow: 0 0 12px rgba(179, 136, 255, 0.25)"><div class="stat-value">${drink.ph}</div><div class="stat-label">${t('card_ph')}</div></div>
      </div>
      <button class="card-btn" data-open-video><span>${t('card_watch_review')}</span><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  `;
  const imageEl = card.querySelector('img[data-fallback="true"]');
  if (imageEl) {
    setImageWithFallback(imageEl, drink.img, 'images/placeholder.svg', () => {
      imageEl.classList.remove('img-loading');
      const skel = card.querySelector('.img-skeleton');
      if (skel) skel.remove();
    });
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
  } else if (activeSortMode === 'cheap') {
    withIndex.sort((a, b) => {
      const pa = parseFloat(getPricePerLiter(a.d)) || Infinity;
      const pb = parseFloat(getPricePerLiter(b.d)) || Infinity;
      return pa - pb;
    });
  } else {
    withIndex.sort((a, b) => +b.d.rating - +a.d.rating); // по рейтингу (по умолчанию)
  }
  let result = withIndex.map(x => x.d);

  // Пасхалка: при ручном включении светлой темы Ultra Sunrise поднимается
  // в начало списка — но только в режиме сортировки "по рейтингу", чтобы
  // не переопределять выбор человека, если он сортирует по А-Я или новизне
  if (activeSortMode === 'rating' && typeof isManualLightTheme === 'function' && isManualLightTheme()) {
    const sunriseIdx = result.findIndex(d => /Ultra Sunrise/i.test(d.brand));
    if (sunriseIdx > 0) {
      const [sunrise] = result.splice(sunriseIdx, 1);
      result.unshift(sunrise);
    }
  }

  return result;
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
    const brandTxt = card.querySelector('.card-brand')?.textContent || '';
    if (/Ultra Sunrise/i.test(brandTxt) && typeof isManualLightTheme === 'function' && isManualLightTheme()) {
      cnt.innerHTML = '<i class="fa-solid fa-cloud-sun" style="color:#ff7a3d;font-size:20px;" title="Рассвет"></i>';
    } else if(cnt && !cnt.querySelector('.counter-body')) buildCounter(cnt);
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
        showToast(t('toast_removed_fav'), 'fa-regular fa-heart');
      } else {
        favs.push(drinkId);
        newBtn.classList.add('active');
        newBtn.querySelector('i').className = 'fa-solid fa-heart';
        showToast(name + ' ' + t('toast_added_fav'), 'fa-solid fa-heart');
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
// Наклон карточек включаем по отдельной проверке от is-native-app —
// та проверка ловит любое устройство с тачскрином (даже десктоп с
// сенсорным монитором), из-за чего наклон отключался даже при работе мышкой.
const _hasFinePointer = matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
if (_hasFinePointer) {
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

// Выпадающий список марок / линеек (два уровня)
function closeBrandDropdown() {
  document.getElementById('brandDropdown').classList.remove('open');
  document.getElementById('brandToggle').classList.remove('open');
  brandDropdownView = 'brands';
}

function renderBrandDropdown() {
  const dropdown = document.getElementById('brandDropdown');

  if (brandDropdownView === 'lines' && brandDropdownSelectedBrand) {
    const brandKey = brandDropdownSelectedBrand;
    const brandDrinks = drinks.filter(d => d.key === brandKey);
    const lineCounts = {};
    brandDrinks.forEach(d => {
      const line = getDrinkLine(d);
      if (line) lineCounts[line] = (lineCounts[line] || 0) + 1;
    });

    const wholeBrandActive = activeBrandFilter === brandKey && !activeLineFilter;
    let html = `<div class="brand-option back-option" data-back="1"><i class="fa-solid fa-arrow-left"></i> Назад к маркам</div>`;
    html += `<div class="brand-option ${wholeBrandActive ? 'active' : ''}" data-brand="${brandKey}"><div class="brand-dot" style="background:${bColors[brandKey] || '#888'}"></div>Все вкусы ${bNames[brandKey] || brandKey}<div class="brand-count">${brandDrinks.length}</div></div>`;

   const lineKeysList = Object.keys(lineCounts).sort((a, b) => a.localeCompare(b));
    lineKeysList.forEach((line, idx) => {
      const lineActive = activeBrandFilter === brandKey && activeLineFilter === line;
      html += `<div class="brand-option ${lineActive ? 'active' : ''}" data-brand="${brandKey}" data-line="${line}"><div class="brand-dot" style="background:${lineDotColor(brandKey, idx, lineKeysList.length)}"></div>${line}<div class="brand-count">${lineCounts[line]}</div></div>`;
    });
    dropdown.innerHTML = html;

        dropdown.querySelector('[data-back]').addEventListener('click', (e) => {
      e.stopPropagation();
      brandDropdownView = 'brands';
      renderBrandDropdown();
    });
    dropdown.querySelectorAll('.brand-option[data-brand]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        activeBrandFilter = opt.dataset.brand;
        activeLineFilter = opt.dataset.line || null;
        closeBrandDropdown();
        applyFilters();
      });
    });
    return;
  }

  // Верхний уровень — список марок
  const counts = {};
  drinks.forEach(d => { counts[d.key] = (counts[d.key] || 0) + 1; });

  const allActive = activeBrandFilter === 'all';
  let html = `<div class="brand-option ${allActive ? 'active' : ''}" data-brand="all"><div class="brand-dot" style="background:var(--accent)"></div>Все марки<div class="brand-count">${drinks.length}</div></div>`;

  for (const key in counts) {
    const name = bNames[key] || key;
    html += `<div class="brand-option" data-brand="${key}"><div class="brand-dot" style="background:${bColors[key] || '#888'}"></div>${name}<div class="brand-count">${counts[key]}</div></div>`;
  }
  dropdown.innerHTML = html;

   dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const brandKey = opt.dataset.brand;
      if (brandKey === 'all') {
        activeBrandFilter = 'all';
        activeLineFilter = null;
        closeBrandDropdown();
        applyFilters();
      } else {
        brandDropdownView = 'lines';
        brandDropdownSelectedBrand = brandKey;
        renderBrandDropdown();
      }
    });
  });
}
renderBrandDropdown();

function renderVolumeDropdown() {
  const dropdown = document.getElementById('volumeDropdown');
  if (!dropdown) return;
  const volumes = new Set();
  drinks.forEach(d => { const v = parseCardVolumeMl(d.flavor); if (v) volumes.add(v); });
  const sortedVolumes = Array.from(volumes).sort((a, b) => a - b);

  let html = `<div class="brand-option ${activeVolumeFilter === 'all' ? 'active' : ''}" data-volume="all"><div class="brand-dot" style="background:var(--accent)"></div>Любой объём</div>`;
  sortedVolumes.forEach(v => {
    const count = drinks.filter(d => parseCardVolumeMl(d.flavor) === v).length;
    html += `<div class="brand-option ${activeVolumeFilter === String(v) ? 'active' : ''}" data-volume="${v}"><div class="brand-dot" style="background:#888"></div>${v} мл<div class="brand-count">${count}</div></div>`;
  });
  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      activeVolumeFilter = opt.dataset.volume;
      dropdown.classList.remove('open');
      document.getElementById('volumeToggle').classList.remove('open');
      renderVolumeDropdown();
      applyFilters();
    });
  });
}
renderVolumeDropdown();

document.getElementById('volumeToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('brandDropdown').classList.remove('open');
  document.getElementById('brandToggle').classList.remove('open');
  document.getElementById('sortDropdown').classList.remove('open');
  document.getElementById('sortToggle').classList.remove('open');
  document.getElementById('caffeineDropdown').classList.remove('open');
  document.getElementById('caffeineToggle').classList.remove('open');
  document.getElementById('volumeDropdown').classList.toggle('open');
  document.getElementById('volumeToggle').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('volumeDropdown').classList.remove('open');
  document.getElementById('volumeToggle').classList.remove('open');
});

function renderCaffeineDropdown() {
  const dropdown = document.getElementById('caffeineDropdown');
  if (!dropdown) return;
  const buckets = [
    { key: 'all', label: 'Любой кофеин' },
    { key: 'low', label: 'До 100 мг' },
    { key: 'mid', label: '100–160 мг' },
    { key: 'high', label: 'Более 160 мг' }
  ];
  let html = '';
  buckets.forEach(b => {
    const count = b.key === 'all' ? drinks.length : drinks.filter(d => caffeineBucket(parseCaffeineMg(d.caffeine) || 0) === b.key).length;
    html += `<div class="brand-option ${activeCaffeineFilter === b.key ? 'active' : ''}" data-caffeine="${b.key}"><div class="brand-dot" style="background:${b.key === 'all' ? 'var(--accent)' : '#888'}"></div>${b.label}<div class="brand-count">${count}</div></div>`;
  });
  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.brand-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      activeCaffeineFilter = opt.dataset.caffeine;
      dropdown.classList.remove('open');
      document.getElementById('caffeineToggle').classList.remove('open');
      renderCaffeineDropdown();
      applyFilters();
    });
  });
}
renderCaffeineDropdown();

document.getElementById('caffeineToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('brandDropdown').classList.remove('open');
  document.getElementById('brandToggle').classList.remove('open');
  document.getElementById('sortDropdown').classList.remove('open');
  document.getElementById('sortToggle').classList.remove('open');
  document.getElementById('volumeDropdown').classList.remove('open');
  document.getElementById('volumeToggle').classList.remove('open');
  document.getElementById('caffeineDropdown').classList.toggle('open');
  document.getElementById('caffeineToggle').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('caffeineDropdown').classList.remove('open');
  document.getElementById('caffeineToggle').classList.remove('open');
});

// Тоггл выпадающего меню
document.getElementById('brandToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('sortDropdown').classList.remove('open');
  document.getElementById('sortToggle').classList.remove('open');
  const dropdown = document.getElementById('brandDropdown');
  const wasOpen = dropdown.classList.contains('open');
  dropdown.classList.toggle('open');
  document.getElementById('brandToggle').classList.toggle('open');
  if (wasOpen) { brandDropdownView = 'brands'; renderBrandDropdown(); }
});
document.addEventListener('click', () => {
  closeBrandDropdown();
  renderBrandDropdown();
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
    { key: 'az', label: 'А — Я' },
    { key: 'cheap', label: 'Дешевле за литр' }
  ];
  let html = `<div class="brand-option ${noSugarOnly ? 'active' : ''}" data-nosugar="1">
      <div class="brand-dot" style="background:#00e5ff"></div>Без сахара
    </div><div class="back-option" style="border-bottom:1px solid var(--border);margin-bottom:4px;padding-bottom:0;"></div>`;
  html += options.map(o =>
    `<div class="brand-option ${o.key === activeSortMode ? 'active' : ''}" data-sort="${o.key}">
      <div class="brand-dot" style="background:var(--accent)"></div>${o.label}
    </div>`
  ).join('');
  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.brand-option[data-sort]').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdown.querySelectorAll('.brand-option[data-sort]').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      activeSortMode = opt.dataset.sort;
      dropdown.classList.remove('open');
      document.getElementById('sortToggle').classList.remove('open');
      renderCards();
    });
  });

  const nosugarOpt = dropdown.querySelector('[data-nosugar]');
  if (nosugarOpt) {
    nosugarOpt.addEventListener('click', () => {
      noSugarOnly = !noSugarOnly;
      nosugarOpt.classList.toggle('active', noSugarOnly);
      applyFilters();
    });
  }
}
generateSortDropdown();

document.getElementById('sortToggle').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('brandDropdown').classList.remove('open');
  document.getElementById('brandToggle').classList.remove('open');
  document.getElementById('sortDropdown').classList.toggle('open');
  document.getElementById('sortToggle').classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('sortDropdown').classList.remove('open');
  document.getElementById('sortToggle').classList.remove('open');
});
function highlightSearchMatches() {
  const words = searchQuery ? searchQuery.split(/\s+/).filter(Boolean) : [];
  document.querySelectorAll('#cardsGrid .energy-card').forEach(card => {
    const idx = parseInt(card.dataset.drinkIndex);
    const drink = drinks[idx];
    const brandEl = card.querySelector('.card-brand');
    if (!drink || !brandEl) return;
    const plain = drink.brand;
    if (!words.length) {
      brandEl.textContent = plain;
      return;
    }
    const escapedText = plain.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp('(' + escapedWords.join('|') + ')', 'gi');
    brandEl.innerHTML = escapedText.replace(re, '<mark class="search-highlight">$1</mark>');
  });
}

function refreshResultsMeta() {
  const total = drinks.length;
  const cards = document.querySelectorAll('#cardsGrid .energy-card');
  let visible = 0;
  cards.forEach(c => { if (c.style.display !== 'none' && !c.classList.contains('card-hidden')) visible++; });
  const counterEl = document.getElementById('resultsCounter');
  if (counterEl) counterEl.textContent = visible === total ? `Показано всего: ${total}` : `Показано ${visible} из ${total}`;

  let noResults = document.getElementById('searchNoResults');
  if (visible === 0) {
    const isFavEmpty = document.querySelector('.filter-btn.active[data-filter="fav"]') && getFavs().length === 0;
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.id = 'searchNoResults';
      noResults.className = 'search-no-results';
      document.getElementById('cardsGrid').appendChild(noResults);
    }
    noResults.innerHTML = isFavEmpty
      ? '<i class="fa-solid fa-heart"></i><div>В избранном пока пусто</div><div style="font-size:13px;margin-top:8px;">Жми на сердечко на карточке, чтобы добавить</div><button id="resetFiltersBtn" class="reset-filters-btn"><i class="fa-solid fa-rotate-left"></i> Показать всё</button>'
      : '<i class="fa-solid fa-magnifying-glass"></i><div>Ничего не найдено</div><div style="font-size:13px;margin-top:8px;">Попробуй изменить запрос или сбросить фильтры</div><button id="resetFiltersBtn" class="reset-filters-btn"><i class="fa-solid fa-rotate-left"></i> Сбросить фильтры</button>';
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) resetBtn.onclick = resetAllFilters;
  } else if (noResults) {
    noResults.remove();
  }
}

function scrollToResultsTop() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;
  const rect = grid.getBoundingClientRect();
  if (rect.top < 0 || rect.top > window.innerHeight * 0.5) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetAllFilters() {
  activeBrandFilter = 'all';
  activeLineFilter = null;
  noSugarOnly = false;
  activeVolumeFilter = 'all';
  activeCaffeineFilter = 'all';
  searchQuery = '';
  const drinkSearch = document.getElementById('drinkSearch');
  if (drinkSearch) drinkSearch.value = '';
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) clearBtn.classList.remove('visible');
  document.querySelectorAll('.filter-btn:not(.brand-toggle)').forEach(b => b.classList.remove('active'));
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');
  if (typeof renderBrandDropdown === 'function') renderBrandDropdown();
  if (typeof renderVolumeDropdown === 'function') renderVolumeDropdown();
  if (typeof renderCaffeineDropdown === 'function') renderCaffeineDropdown();
  if (typeof generateSortDropdown === 'function') generateSortDropdown();
  document.querySelectorAll('.energy-card').forEach(c => { c.style.display = ''; c.classList.remove('card-hidden'); });
  applyFilters();
}

// Фильтрация
function applyFilters() {
  const activeRatingFilter = document.querySelector('.filter-btn.active:not(.brand-toggle)')?.dataset.filter || 'all';
  const favs = getFavs();
  const searchWords = searchQuery ? searchQuery.split(/\s+/).filter(Boolean) : [];
  
  document.querySelectorAll('.energy-card').forEach(card => {
    const r = parseInt(card.dataset.rating);
    const b = card.dataset.brand;
    const drinkId = 'drink_' + card.dataset.drinkIndex;
    const drinkObj = drinks[parseInt(card.dataset.drinkIndex)];
    const isNoSugar = drinkObj && /^0\s*г/.test((drinkObj.sugar || '').trim());
    
    let showByRating = true;
    if (activeRatingFilter === 'high' && r < 8) showByRating = false;
    else if (activeRatingFilter === 'mid' && (r < 6 || r > 7)) showByRating = false;
    else if (activeRatingFilter === 'low' && r >= 6) showByRating = false;
    else if (activeRatingFilter === 'fav' && !favs.includes(drinkId)) showByRating = false;

    if (noSugarOnly && !isNoSugar) showByRating = false;

        let showByBrand = true;
    if (activeBrandFilter !== 'all') {
      showByBrand = (b === activeBrandFilter) && (!activeLineFilter || card.dataset.line === activeLineFilter);
    }

    let showBySearch = true;
    if (searchWords.length) {
      const nameTxt = (card.querySelector('.card-brand')?.textContent || '').toLowerCase();
      const flavorTxt = (card.querySelector('.card-flavor')?.textContent || '').toLowerCase();
      const haystack = b + ' ' + nameTxt + ' ' + flavorTxt;
      showBySearch = searchWords.every(w => haystack.includes(w));
    }

    let showByVolume = true;
    if (activeVolumeFilter !== 'all') {
      showByVolume = card.dataset.volume === activeVolumeFilter;
    }

    let showByCaffeine = true;
    if (activeCaffeineFilter !== 'all') {
      showByCaffeine = caffeineBucket(parseInt(card.dataset.caffeine, 10) || 0) === activeCaffeineFilter;
    }

    if (showByRating && showByBrand && showBySearch && showByVolume && showByCaffeine) {
      card.classList.remove('card-hidden'); 
      card.style.display = ''; 
    } else { 
      card.classList.add('card-hidden'); 
      setTimeout(() => { if (card.classList.contains('card-hidden')) card.style.display = 'none'; }, 500); 
    }
  });
  refreshResultsMeta();
  highlightSearchMatches();
  updateFiltersResetBtn();
}

function updateFiltersResetBtn() {
  const btn = document.getElementById('filtersResetBtn');
  if (!btn) return;
  const activeRatingFilter = document.querySelector('.filter-btn.active:not(.brand-toggle)')?.dataset.filter || 'all';
  const isActive = activeRatingFilter !== 'all' || activeBrandFilter !== 'all' || noSugarOnly || activeVolumeFilter !== 'all' || activeCaffeineFilter !== 'all' || !!searchQuery;
  btn.classList.toggle('show', isActive);
}

const filtersResetBtn = document.getElementById('filtersResetBtn');
if (filtersResetBtn) filtersResetBtn.addEventListener('click', resetAllFilters);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active')); 
    btn.classList.add('active');
    applyFilters();
    scrollToResultsTop();
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
const SUGGEST_WORKER_URL = 'https://buzzrate-suggest.tleorg827.workers.dev';
// подставь свой адрес воркера
  const nameCounter = document.getElementById('drinkNameCounter');
  const commentCounter = document.getElementById('drinkCommentCounter');
  const honeypotInput = document.getElementById('drinkWebsite');
  const SUGGEST_COOLDOWN_MS = 60000;

  if (nameCounter) {
    drinkNameInput.addEventListener('input', () => {
      nameCounter.textContent = drinkNameInput.value.length + ' / 80';
    });
  }
  if (commentCounter) {
    drinkCommentInput.addEventListener('input', () => {
      commentCounter.textContent = drinkCommentInput.value.length + ' / 300';
    });
  }

  sendSuggestBtn.addEventListener('click', () => {
    const name = drinkNameInput.value.trim();
    const comment = drinkCommentInput.value.trim();

    if (!name) { drinkNameInput.style.borderColor = '#ff3b5c'; return; }
    drinkNameInput.style.borderColor = '';

    const lastSent = parseInt(safeLSGet('buzz_last_suggest_ts', '0'), 10);
    const sinceLast = Date.now() - lastSent;
    if (sinceLast < SUGGEST_COOLDOWN_MS) {
      const waitSec = Math.ceil((SUGGEST_COOLDOWN_MS - sinceLast) / 1000);
      showToast(`${t('toast_slow_down')} ${waitSec} ${t('toast_seconds')}`, 'fa-solid fa-clock');
      return;
    }

    sendSuggestBtn.disabled = true;
    sendSuggestBtn.textContent = t('suggest_sending');

    fetch(SUGGEST_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment, honeypot: honeypotInput ? honeypotInput.value : '' })
    })
      .then(res => res.json())
      .then(data => {
        sendSuggestBtn.disabled = false;
        sendSuggestBtn.textContent = t('suggest_send');
        if (data.ok) {
          safeLSSet('buzz_last_suggest_ts', String(Date.now()));
          suggestModal.classList.remove('open');
          drinkNameInput.value = ''; drinkCommentInput.value = '';
          if (nameCounter) nameCounter.textContent = '0 / 80';
          if (commentCounter) commentCounter.textContent = '0 / 300';
          showToast(`"${name}" ${t('toast_suggest_sent')}`, 'fa-solid fa-check');
        } else {
          showToast(t('toast_error_send'), 'fa-solid fa-triangle-exclamation');
        }
      })
      .catch(() => {
        sendSuggestBtn.disabled = false;
        sendSuggestBtn.textContent = t('suggest_send');
        showToast(t('toast_no_connection'), 'fa-solid fa-triangle-exclamation');
      });
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
        <p>${t('details_no_video').toUpperCase()}</p>
        <span class="no-video-sub">${t('details_no_video_sub')}</span>
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
          showToast(t('toast_link_copied'), 'fa-solid fa-link');
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
    const targetId = link.getAttribute('href'); // Узнаем, куда нажали (например #mapSection)

    if (!targetId || targetId.charAt(0) !== '#' || targetId.length <= 1) {
      // Внешняя ссылка (TikTok, Telegram и т.п.) — НЕ вызываем preventDefault,
      // даём браузеру самому её открыть (target="_blank" уже в разметке),
      // только закрываем выезжающую панель.
      closeMobileMenu();
      return;
    }

    e.preventDefault(); // Отключаем резкий рывок браузера — только для якорных ссылок
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
    img: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600&q=80",
    inventory: ["hell", "redbull", "monster"]
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
    inventory: ["redbull"] 
  },
  { 
    id: 5, 
    name: "Кауфланд (Център)", 
    lat: 43.2090, 
    lng: 27.9110, 
    img: "https://images.unsplash.com/photo-1601599963565-b7f49dbf6e35?w=600&q=80",
    inventory: ["hell", "monster", "redbull"]
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
  },
 { 
    id: 7, 
    name: "Jo Market", 
    lat: 43.210583, 
    lng: 27.930139, 
    img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
    inventory: ["hell", "monster", "redbull"]
  },
  { 
    id: 8, 
    name: "Tobacco & liquor shop", 
    lat: 43.204110, 
    lng: 27.912922, 
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&q=80",
    inventory: ["monster", "redbull"]
  },
  { 
    id: 9, 
    name: "Супермаркет Одесос", 
    lat: 43.1992950, 
    lng: 27.9181750, 
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    inventory: ["monster", "redbull"]
  },
  { 
    id: 10, 
    name: "IQOS", 
    lat: 43.2052570, 
    lng: 27.9204730, 
    img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80",
    inventory: ["hell", "monster", "redbull"]
  },
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
  map = L.map('mapContainer', { zoomControl: false, minZoom: 11, maxZoom: 17 }).setView([43.2070, 27.9120], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors', maxZoom: 17, minZoom: 11, subdomains: ['a', 'b', 'c']
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

  // Пересчитываем размеры контейнера после первой отрисовки —
  // иначе Leaflet может неправильно считать центр при зуме
  setTimeout(() => { if (map) map.invalidateSize(); }, 300);

  const mapSection = document.getElementById('mapContainer')?.closest('section') || document.getElementById('mapContainer');
  if (mapSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && map) map.invalidateSize();
      });
    }, { threshold: 0.1 });
    obs.observe(mapSection);
  }
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
function activateMatrixMode() {
  matrixActive = true;
  document.body.classList.remove('light-theme');
  document.body.classList.add('matrix-mode');
  createMatrixRain();
  window._stopAboutTyping = true;

  setTimeout(function() {
    var aboutEl = document.getElementById('about-typewriter');
    if (aboutEl) {
      window._matrixOrigText = aboutEl.textContent;
      aboutEl.textContent = "Я занимаюсь обзорами энергетиков. Здесь вы найдете честные и подробные обзоры различных энергетических напитков, их состав, вкус и эффект. Моя задача следить за вами. ";
    }
    var discEl = document.querySelector('.map-disclaimer p');
    if (discEl) {
      window._matrixOrigDisc = discEl.innerHTML;
      discEl.innerHTML = 'Мы знаем о вас всё, но <strong>не отвечаем за их текущее наличие</strong> в матрице. Ассортимент может измениться.';
    }
  }, 60);

  applyMatrixMapEffect();
  showToast('🟢 Wake up, Wake up!', 'fa-solid fa-terminal');
  unlockAchievement('matrix');
}

function deactivateMatrixMode() {
  matrixActive = false;
  document.body.classList.remove('matrix-mode');
  var rain = document.getElementById('matrixCanvas');
  if (rain) rain.remove();
  themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

  var aboutEl2 = document.getElementById('about-typewriter');
  if (aboutEl2 && window._matrixOrigText) {
    aboutEl2.textContent = window._matrixOrigText;
    delete window._matrixOrigText;
  }
  var discEl2 = document.querySelector('.map-disclaimer p');
  if (discEl2 && window._matrixOrigDisc) {
    discEl2.innerHTML = window._matrixOrigDisc;
    delete window._matrixOrigDisc;
  }

  if (secretMysteryMarker && map) {
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
  }
  showToast('Матрица отключена', 'fa-solid fa-power-off');
}

function toggleMatrixMode() {
  if (matrixActive) deactivateMatrixMode();
  else activateMatrixMode();
}

function updateThemeColorMeta() {
  const meta = document.getElementById('themeColorMeta');
  if (!meta) return;
  const bg = getComputedStyle(document.body).getPropertyValue('--bg').trim();
  if (bg) meta.setAttribute('content', bg);
}

themeToggle.addEventListener('click', function() {
  themeClicks++;
  clearTimeout(themeClickTimer);
  themeClickTimer = setTimeout(function() { themeClicks = 0; }, 800);

  if (themeClicks >= 5 && !matrixActive) {
    themeClicks = 0;
    activateMatrixMode();
    return;
  }
  if (matrixActive) {
    deactivateMatrixMode();
  } else {
    safeLSSet('buzz_auto_theme', 'false');
    const autoBtn = document.getElementById('autoThemeToggle');
    if (autoBtn) autoBtn.classList.remove('on');
    document.body.classList.toggle('light-theme');
    var isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    if (typeof renderCards === 'function') renderCards();
    updateThemeColorMeta();
  }
});
document.addEventListener('DOMContentLoaded', () => { if (typeof updateThemeColorMeta === 'function') updateThemeColorMeta(); });
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
      kbtn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('key_activated_btn');
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
    if (kh) kh.textContent = t('key_title');
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
      keyError.textContent = t('key_enter_code');
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
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('key_activated_btn');
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.4';
      }
            // Обновляем десктопную кнопку
      var desktopKeyBtn = document.getElementById('openKeyModalDesktop');
      if (desktopKeyBtn) {
        desktopKeyBtn.classList.add('activated');
        desktopKeyBtn.innerHTML = '<i class="fa-solid fa-key"></i> ' + t('key_activated_btn');
      }
      showToast(t('key_activated_toast'), 'fa-solid fa-trophy');
      unlockAchievement('key');
    } else {
      keyError.textContent = t('key_wrong_code');
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
      desktopKeyBtn.innerHTML = '<i class="fa-solid fa-key"></i> ' + t('key_activated_btn');
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
      if (kh) kh.textContent = t('key_title');
      setTimeout(function() { keyInput.focus(); }, 300);
    });
  }
})();
// ==========================================
// АВТО-ТЕМА (ДЕНЬ/НОЧЬ ПО ВРЕМЕНИ)
// ==========================================
(function() {
  const KEY = 'buzz_auto_theme';
  let autoInterval = null;

  function isAutoOn() { return safeLSGet(KEY, null) === 'true'; }

  function applyAutoTheme() {
    if (!isAutoOn() || matrixActive) return;
    const h = new Date().getHours();
    const shouldBeLight = h >= 7 && h < 19;
    const isLight = document.body.classList.contains('light-theme');
    if (shouldBeLight && !isLight) {
      document.body.classList.add('light-theme');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      if (typeof renderCards === 'function') renderCards();
    } else if (!shouldBeLight && isLight) {
      document.body.classList.remove('light-theme');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      if (typeof renderCards === 'function') renderCards();
    }
  }

  function startAutoLoop() {
    applyAutoTheme();
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(applyAutoTheme, 60000);
  }

  function initToggleUI() {
    const btn = document.getElementById('autoThemeToggle');
    if (!btn) return;
    btn.classList.toggle('on', isAutoOn());
    btn.addEventListener('click', () => {
      const nowOn = !isAutoOn();
      safeLSSet(KEY, nowOn ? 'true' : 'false');
      btn.classList.toggle('on', nowOn);
      if (nowOn) startAutoLoop();
      else if (autoInterval) { clearInterval(autoInterval); autoInterval = null; }
    });
  }

  // Пересоздаём кнопку каждый раз при открытии Досье (innerHTML не трогает
  // наш блок — он вне profileContent — поэтому достаточно навесить один раз)
  document.addEventListener('DOMContentLoaded', () => {
    initToggleUI();
    if (isAutoOn()) startAutoLoop();
  });
})();
// ==========================================
// АЧИВКИ "НОЧЬ" И "РАННЯЯ ПТАШКА" (прогресс по дням)
// ==========================================
(function() {
  function trackTimeVisit() {
    const h = new Date().getHours();
    const today = new Date().toDateString();

    if (h >= 23 || h < 2) {
      trackDay('buzz_night_days', 'night_owl', today);
    } else if (h >= 3 && h < 7) {
      trackDay('buzz_earlybird_days', 'early_bird', today);
    }
  }

  function trackDay(storageKey, achId, today) {
    const days = safeLSGetJSON(storageKey, []);
    if (!days.includes(today)) {
      days.push(today);
      safeLSSetJSON(storageKey, days);
    }
    if (typeof unlockAchievement !== 'undefined') unlockAchievement(achId);
  }

  function scheduleTimeVisit() {
    setTimeout(trackTimeVisit, 1500);
  }

  if (document.readyState === 'complete') {
    scheduleTimeVisit();
  } else {
    window.addEventListener('load', scheduleTimeVisit);
  }
})();

// Возвращает стадию (1, 2 или 3) по количеству уникальных дней
function getNightOwlStage() {
  const n = safeLSGetJSON('buzz_night_days', []).length;
  return n >= 3 ? 3 : (n >= 2 ? 2 : (n >= 1 ? 1 : 0));
}
function isManualLightTheme() {
  return document.body.classList.contains('light-theme') && safeLSGet('buzz_auto_theme', null) !== 'true';
}
function getEarlyBirdStage() {
  const n = safeLSGetJSON('buzz_earlybird_days', []).length;
  return n >= 3 ? 3 : (n >= 2 ? 2 : (n >= 1 ? 1 : 0));
}
// Возвращает { name, icon, desc, tier } с учётом стадии — для остальных
// ачивок просто отдаёт их обычные данные без изменений
function getAchievementDisplay(id) {
  const base = achievements[id];
  if (!base) return null;

  if (id === 'night_owl') {
    const stage = getNightOwlStage();
    if (stage >= 3) return { name: 'Дитя ночи', icon: 'fa-star-and-crescent', desc: 'Луна тебя уже узнаёт в лицо. Может, поспишь иногда?', tier: 'purple', color: '#a78bfa', howTo: base.howTo };
    if (stage === 2) return { name: 'Ночь', icon: 'fa-moon', desc: 'Опять ты. Второй раз подряд — это уже не случайность.', tier: 'silver', howTo: base.howTo };
    return { name: 'Ночь', icon: 'fa-moon', desc: 'Кажется, ты сова. Или просто не спится — бывает.', tier: 'bronze', howTo: base.howTo };
  }

  if (id === 'early_bird') {
    const stage = getEarlyBirdStage();
    if (stage >= 3) return { name: 'Заря', icon: 'fa-sun', desc: 'Ты и рассвет теперь на короткой ноге. Три раза подряд — почти дружба.', tier: 'gold', color: '#f5e6c8', howTo: base.howTo };
    if (stage === 2) return { name: 'Ранняя пташка', icon: 'fa-sun', desc: 'Второй раз подряд. Это уже не случайность, а диагноз.', tier: 'silver', howTo: base.howTo };
    return { name: 'Ранняя пташка', icon: 'fa-sun', desc: 'Кто-то встал раньше будильника. Уважение.', tier: 'bronze', howTo: base.howTo };
  }

  return base;
}
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
      calcDropdown.innerHTML = '<div style="padding:12px;color:#555;font-family:Oswald;">' + t('calc_not_found') + '</div>';
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
      const normalMsgs = I18N[getLang()].calc_normal || I18N.ru.calc_normal;
calcStatus.textContent = normalMsgs[Math.floor(Math.random() * normalMsgs.length)]; calcStatus.style.color = '#00ff41';
    } else if (total <= 350) {
      calcBar.style.background = '#ffd700'; calcText.style.color = '#ffd700';
     const warnMsgs = I18N[getLang()].calc_warn || I18N.ru.calc_warn;
calcStatus.textContent = warnMsgs[Math.floor(Math.random() * warnMsgs.length)]; calcStatus.style.color = '#ffd700';
    } else {
      calcBar.style.background = '#ff3b5c'; calcText.style.color = '#ff3b5c';
      const dangerMsgs = I18N[getLang()].calc_danger || I18N.ru.calc_danger;
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
    compareFloat.innerHTML = `<i class="fa-solid fa-code-compare"></i> ${t('compare_btn')} (${compareList.length}/2)`;
    
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
      { label: t('compare_volume'), v1: getNum(d1.flavor), v2: getNum(d2.flavor) },
      { label: t('compare_caffeine'), v1: getNum(d1.caffeine), v2: getNum(d2.caffeine) },
      { label: t('compare_sugar'), v1: getNum(d1.sugar), v2: getNum(d2.sugar) },
      { label: t('compare_calories'), v1: getNum(d1.cal), v2: getNum(d2.cal) },
      { label: t('compare_ph'), v1: getNum(d1.ph), v2: getNum(d2.ph) }
    ];

        let html = '';
    
    html += `<div class="compare-col"><h3>${d1.brand}</h3><div class="compare-price">${d1.price ? d1.price : t('compare_price_tbd')}</div></div>`;
    html += `<div class="compare-col"><h3>${d2.brand}</h3><div class="compare-price">${d2.price ? d2.price : t('compare_price_tbd')}</div></div>`;

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

  // Фаза 1: визуальный глитч — подсвечиваем случайные карточки классом,
  // БЕЗ перестановки в DOM (insertBefore на каждый тик грузил layout/repaint
  // всей сетки и тормозил на слабых устройствах)
  let shuffleCount = 0;
  let lastHighlighted = null;
  const shuffleInterval = setInterval(() => {
    if (lastHighlighted) lastHighlighted.classList.remove('roulette-glitch');
    const randomIndex = Math.floor(Math.random() * cards.length);
    lastHighlighted = cards[randomIndex];
    lastHighlighted.classList.add('roulette-glitch');
    shuffleCount++;
    if (shuffleCount > 25) {
      clearInterval(shuffleInterval);
      if (lastHighlighted) lastHighlighted.classList.remove('roulette-glitch');
    }
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

    if (typeof AudioSys !== 'undefined') AudioSys.play('click');
    
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
    /* ВАЖНО: раньше здесь был filter: contrast()/brightness() на body.doom-mode.
       CSS-свойство filter создаёт новый containing block для всех
       position:fixed потомков — из-за этого таймер и счётчик убитых банок
       (fixed-дети body) переставали быть "прибитыми" к экрану и скроллились
       вместе со страницей. Заменяем эффект на полупрозрачный оверлей
       с mix-blend-mode — похожий вид, без побочного эффекта на позиционирование. */
    body.doom-mode {
      animation: doomFlicker 0.15s infinite !important;
    }
    @keyframes doomFlicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.97; }
    }
    body.doom-mode::before {
      content: '';
      position: fixed;
      inset: 0;
      box-shadow: inset 0 0 200px rgba(120, 0, 0, 0.6);
      pointer-events: none;
      z-index: 99997;
    }
    body.doom-mode::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 99995;
      background: rgba(20, 0, 0, 0.15);
      mix-blend-mode: multiply;
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
    @media (max-width: 768px) {
      #doomCountdown, #doomKillCounter {
        top: max(12px, env(safe-area-inset-top)) !important;
      }
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

  function getModes() {
    return {
      classic: { name: t('bb_mode_classic'), grid: 8, desc: t('bb_mode_classic_desc'), mask: null },
      mini:    { name: t('bb_mode_mini'),     grid: 6, desc: t('bb_mode_mini_desc'), mask: null },
      cross:   { name: t('bb_mode_cross'),    grid: 9, desc: t('bb_mode_cross_desc'), mask: (r, c, g) => {
        const q = Math.floor(g / 3);
        const blockedZone = (v) => v < q || v >= g - q;
        return blockedZone(r) && blockedZone(c);
      } }
    };
  }
  const MODES = getModes();
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
  let hasMastered = false;

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
    if (linesCleared >= 3 && typeof unlockAchievement === 'function') unlockAchievement('blockblast_combo');
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
      if (typeof showToast === 'function') showToast('💀 ' + t('bb_game_over') + ' ' + score, 'fa-solid fa-skull');
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
      if (typeof unlockAchievement === 'function') unlockAchievement('blockblast_win');
    }
    if (!hasMastered && score >= 3000) {
      hasMastered = true;
      if (typeof unlockAchievement === 'function') unlockAchievement('blockblast_master');
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
    hasMastered = false;
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
      ctx.fillText(t('bb_restart_hint'), canvas.width / 2, canvas.height / 2 + 20);
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
      { key: 'bomb', icon: 'fa-explosion', need: 5, label: t('bb_bomb') },
      { key: 'firework', icon: 'fa-burst', need: 10, label: t('bb_firework') },
      { key: 'rocket', icon: 'fa-rocket', need: 15, label: t('bb_rocket') }
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
        ? t('bb_no_charges')
        : (d.key === 'rocket' ? t('bb_rocket_tip') : (d.key === 'firework' ? t('bb_firework_tip') : t('bb_bomb_tip')));
      btn.addEventListener('click', () => onPowerButtonClick(d.key));
      wrap.appendChild(btn);
    });
    renderPowerLegend(godMode, achCount);
  }

  function renderPowerLegend(godMode, achCount) {
    const legend = document.getElementById('blockblastPowerLegend');
    if (!legend) return;
    const items = [];
    if (godMode || achCount >= 5) items.push('<i class="fa-solid fa-explosion" style="color:#ff3b5c"></i> ' + t('bb_legend_bomb'));
    if (godMode || achCount >= 10) items.push('<i class="fa-solid fa-burst" style="color:#fbbf24"></i> ' + t('bb_legend_firework'));
    if (godMode || achCount >= 15) items.push('<i class="fa-solid fa-rocket" style="color:#a855f7"></i> ' + t('bb_legend_rocket'));
    legend.innerHTML = items.length
      ? items.map(i => `<div class="power-legend-row">${i}</div>`).join('')
      : '<div class="power-legend-row" style="color:#555">' + t('bb_legend_empty') + '</div>';
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
          <div class="blockblast-logo"><i class="fa-solid fa-bolt"></i> ${t('bb_logo')}</div>
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
          <div class="blockblast-logo"><i class="fa-solid fa-bolt"></i> ${t('bb_logo')}</div>
          <div class="blockblast-mode-tag">${MODES[currentModeKey].name}</div>
        </div>
        <div class="blockblast-body">
          <canvas id="blockblastCanvas"></canvas>
          <div class="blockblast-side">
            <div class="blockblast-stats">
              <div class="blockblast-block">
                <div class="blockblast-label">${t('bb_score')}</div>
                <div class="blockblast-value" id="blockblastScore">0</div>
              </div>
              <div class="blockblast-block">
                <div class="blockblast-label">${t('bb_best')}</div>
                <div class="blockblast-value" id="blockblastBest">${bestScore}</div>
              </div>
            </div>
            <div class="blockblast-figures" id="blockblastFigures"></div>
            <div class="blockblast-powers" id="blockblastPowers"></div>
            <div class="blockblast-power-legend" id="blockblastPowerLegend"></div>
            <button class="blockblast-restart" id="blockblastRestart">${t('bb_restart')}</button>
            <button class="blockblast-restart blockblast-changemode" id="blockblastChangeMode">${t('bb_change_mode')}</button>
           <div class="blockblast-hint">${t('bb_hint')}</div>
            ${MODES[currentModeKey].mask ? '<div class="blockblast-hint blockblast-hint-wall"><i class="fa-solid fa-ban"></i> ' + t('bb_hint_wall') + '</div>' : ''}
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
    Object.assign(MODES, getModes());
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
    // Переключаем лого (шапка + футер) на версию с короной
    document.querySelectorAll('.header-logo svg use, .footer-logo-svg use').forEach(u => {
      u.setAttribute('href', '#buzz-rate-logo-crowned');
    });
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

                // Делегируем клики на весь оверлей — надёжнее, чем вешать
    // обработчик на саму кнопку (переживает любые перерисовки и гонки).
    overlay.addEventListener('click', (e) => {
      if (e.target.closest('#coronationClose')) {
        e.preventDefault();
        close();
        return;
      }
      if (e.target.closest('#coronationAccept')) {
        if (typeof unlockAchievement !== 'undefined') unlockAchievement('coronation');
        safeLSSet('buzz_coronation_accepted', 'true');
        activateGold();
        close();
      }
    });
    overlay.addEventListener('touchstart', (e) => {
      if (e.target.closest('#coronationClose')) {
        e.preventDefault();
        close();
      }
    }, { passive: false });
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
      const padding = 16;
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;
      const maxX = Math.max(0, window.innerWidth - btnWidth - padding);
      const maxY = Math.max(0, window.innerHeight - btnHeight - padding);

      // На узких экранах отступ вокруг "Да" уменьшаем — иначе зона
      // запрета съедает почти весь экран и валидную позицию не найти.
      const margin = Math.min(80, window.innerWidth / 5);
      const dangerX1 = yesRect.left - margin;
      const dangerX2 = yesRect.right + margin;
      const dangerY1 = yesRect.top - margin;
      const dangerY2 = yesRect.bottom + margin;

      let attempts = 0;
      let x, y;
      let found = false;
      do {
        x = padding + Math.random() * maxX;
        y = padding + Math.random() * maxY;
        attempts++;
        const overlapsDanger = (x + btnWidth > dangerX1 && x < dangerX2 && y + btnHeight > dangerY1 && y < dangerY2);
        if (!overlapsDanger) { found = true; break; }
      } while (attempts < 200);

      // Фолбэк: если за 200 попыток свободного места не нашлось (совсем
      // узкий экран) — гарантированно кладём кнопку в дальний угол от "Да",
      // а не туда, где остановился последний неудачный рандом.
      if (!found) {
        const farLeft = yesRect.left > window.innerWidth / 2;
        const farTop = yesRect.top > window.innerHeight / 2;
        x = farLeft ? padding : maxX;
        y = farTop ? padding : maxY;
      }

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
  let usedTerminalCmds = new Set(safeLSGetJSON('buzz_terminal_cmds_used', []));

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

    // Достижение "Любознательный" — за использование всех обычных команд
    // (секретный пароль режима бога сюда не входит, он не публичная команда)
    (function trackTerminalUsage() {
      const KNOWN = {
        help: () => command === 'help',
        ls: () => command === 'ls',
        scan: () => command === 'scan',
        analyze: () => command === 'analyze',
        track: () => command === 'track',
        hack: () => command === 'hack',
        buy: () => command === 'buy',
        whoami: () => command === 'whoami',
        whoischief: () => command === 'whois' && args[1] === 'chief',
        date: () => command === 'date',
        coffee: () => command === 'coffee',
        sudodrink: () => command === 'sudo' && args[1] === 'drink',
        catclassified: () => command === 'cat' && args[1] === 'classified.txt',
        topsecret: () => command === 'top' && args[1] === 'secret',
        status: () => command === 'status',
        rumors: () => command === 'rumors'
      };
      for (const key in KNOWN) {
        if (KNOWN[key]()) usedTerminalCmds.add(key);
      }
      safeLSSetJSON('buzz_terminal_cmds_used', Array.from(usedTerminalCmds));
      if (Object.keys(KNOWN).every(k => usedTerminalCmds.has(k))) {
        unlockAchievement('terminal_master');
      }
    })();

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
      response = `<span style="color:#c084fc;">ПАРОЛЬ ПРИНЯТ. УРОВЕНЬ ДОПУСКА: ROOT.</span><br>Выберите действие:<br>  <span style="color:#fbbf24;">1</span> - Выдать секретное достижение<br>  <span style="color:#fbbf24;">2</span> - Вкл/Выкл РЕЖИМ БОГА<br>  <span style="color:#fbbf24;">3</span> - Компенсация за отсутствие телефона<br>  <span style="color:#fbbf24;">4</span> - Симуляция ночь/рассвет (3 дня)`;
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
        else if (isRootAccess && command === '4') {
      const nightDays = safeLSGetJSON('buzz_night_days', []);
      const birdDays = safeLSGetJSON('buzz_earlybird_days', []);
      for (let i = nightDays.length; i < 3; i++) nightDays.push('test-day-' + i);
      for (let i = birdDays.length; i < 3; i++) birdDays.push('test-day-' + i);
      safeLSSetJSON('buzz_night_days', nightDays);
      safeLSSetJSON('buzz_earlybird_days', birdDays);
      unlockAchievement('night_owl');
      unlockAchievement('early_bird');
      response = `<span style="color:#c084fc;">Симуляция 3 дней "Ночи" и "Ранней пташки" выполнена.</span><br>Обе ачивки доведены до финальной стадии. Проверь Досье (status).`;
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
      <span style="color:#fbbf24;">callsign [имя]</span> - Задать себе позывной<br>
      <span style="color:#fbbf24;">whois chief</span> - Досье на шефа<br>
      <span style="color:#fbbf24;">date</span> - Смена дня и отчёт агента<br>
      <span style="color:#fbbf24;">coffee</span> - Рандомный напиток<br>
      <span style="color:#fbbf24;">sudo drink</span> - Попытка апгрейда<br>
      <span style="color:#fbbf24;">cat classified.txt</span> - Секретный файл<br>
            <span style="color:#fbbf24;">top secret</span> - Расшифровать данные<br>
      <span style="color:#fbbf24;">status</span> - Досье агента<br>
      <span style="color:#fbbf24;">rumors</span> - Слухи дня (туманно, без спойлеров)<br>
      <span style="color:#fbbf24;">clear</span> - Очистить экран<br>
      <span style="color:#fbbf24;">exit</span> - Отключиться<br>
      <span style="color:#ff3b5c;">reset</span> - СБРОС ДАННЫХ (ОПАСНО)`;
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
      const id = getAgentId();
      const callsign = getAgentCallsign();
      response = `AGENT_ID: #${id}${callsign ? '<br>ПОЗЫВНОЙ: ' + escHtml(callsign) : ''}<br>STATUS: Активен<br>УРОВЕНЬ ДОПУСКА: Секретный`;
    }
           else if (command === 'callsign') {
      const name = args.slice(1).join(' ').trim();
      const PROFANITY_ROOTS = ['хуй', 'хуе', 'хуя', 'бляд', 'пизд', 'ебан', 'ебат', 'ёбан', 'сука', 'мудак', 'мразь', 'долбо', 'fuck', 'shit', 'bitch', 'asshole','негр'];
      const nameLower = name.toLowerCase();
      const SPECIAL_CALLSIGN_REPLIES = {
        'черт': 'Привет, сам чёрт.',
        'сударь': 'Да-да, кто меня звал?',
        'varna 23 live': 'Добро пожаловать... погоди, это дежавю?',
        'v0x': 'Хм. Кто-то опять лезет через провода.',
        'тень': 'Тень? Тень чего? Тень кого?',
      };
      const SPECIAL_TEASERS = [
        'Обзор скоро. Обзор скоро.',
        'Кажется, ты не туда постучался.',
        'Система молчит. Пока что.',
        'Ещё рано. Приходи с кем-нибудь.',
        'Один в поле не воин.',
        'Это имя тут кое-что значит. Возможно...'
      ];

      if (!name) {
        response = `<span style="color:#ff3b5c;">ОШИБКА: Укажи имя. Пример: callsign Тень</span>`;
      } else if (name.length > 20) {
        response = `<span style="color:#ff3b5c;">ОШИБКА: Слишком длинно (макс. 20 символов).</span>`;
      } else if (name === 'confirm' && window._pendingClownName) {
        const clownName = window._pendingClownName;
        window._pendingClownName = null;
        const finalName = clownName + ' (клоун)';
        setAgentCallsign(finalName);
        setClownRecord(clownName);
        response = `<span style="color:#ff3b5c;">Ну ты сам напросился.</span><br>Позывной установлен: <span style="color:#fbbf24;">${escHtml(finalName)}</span><br><span style="color:#888;font-style:italic;">Система запомнит это. Навсегда.</span>`;
        if (typeof AudioSys !== 'undefined') AudioSys.play('error');
      } else if (PROFANITY_ROOTS.some(root => nameLower.includes(root))) {
        window._pendingClownName = name;
        response = `<span style="color:#fbbf24;">Ого. Настоящий поэт среди агентов.</span><br>Если правда хочешь именно это — введи <span style="color:#00ff41;">callsign confirm</span>, и мы это оформим красиво.<br><span style="color:#888;font-style:italic;">Предупреждаю сразу: ты не отмоешься от этого позора.</span>`;
        if (typeof AudioSys !== 'undefined') AudioSys.play('error');
      } else if (name.length === 1) {
        response = `<span style="color:#fbbf24;">Одна буква? Серьёзно? Даже у банки на полке имя длиннее. Придумай нормальный ник.</span>`;
        if (typeof AudioSys !== 'undefined') AudioSys.play('error');
      } else {
        setAgentCallsign(name);
        const isShort = name.length <= 3;
        const clownRecord = getClownRecord();
        let extra = '';
        if (isShort) extra += '<br><span style="color:#888;font-style:italic;">Коротко и по делу. Моё почтение.</span>';
        if (clownRecord) extra += `<br><span style="color:#666;font-style:italic;">Система всё ещё помнит "${escHtml(clownRecord)}". Мы тоже не забыли.</span>`;

        const specialReply = SPECIAL_CALLSIGN_REPLIES[nameLower];
        const history = new Set(safeLSGetJSON('buzz_callsign_history', []));
        const hadBothBefore = history.has('v0x') && history.has('varna 23 live');
        history.add(nameLower);
        safeLSSetJSON('buzz_callsign_history', Array.from(history));
        const hasBothNow = history.has('v0x') && history.has('varna 23 live');

        if (specialReply) {
          response = `<span style="color:#00ff41;">Позывной установлен:</span> ${escHtml(name)}<br><span style="color:#fbbf24;font-style:italic;">${specialReply}</span>`;
          if (hasBothNow) {
            response += `<br><br><span style="color:#b9f2ff;font-style:italic;">Так это правда были вы двое. Сайт наш. Ну ладно, в основном мой — но раз уж мы оба тут, welcome home, сударь.</span>`;
          } else {
            const teaser = SPECIAL_TEASERS[Math.floor(Math.random() * SPECIAL_TEASERS.length)];
            response += `<br><span style="color:#555;font-style:italic;">${teaser}</span>`;
          }
          response += extra;
        } else {
          response = `<span style="color:#00ff41;">Позывной установлен:</span> ${escHtml(name)}${extra}`;
        }

        if (hasBothNow && !hadBothBefore) {
          unlockAchievement('co_owner');
        }

        if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
      }
    }
        else if (command === 'sunrise') {
      if (typeof isManualLightTheme === 'function' && isManualLightTheme()) {
        if (typeof unlockAchievement !== 'undefined') unlockAchievement('sunrise_found');
        response = `<span style="color:#ff7a3d;">☀ Нашёл. Ultra Sunrise поднялся в начало списка не просто так.</span><br><span style="color:#888;font-style:italic;">Кто-то встретил рассвет вместе с этим сайтом.</span>`;
        if (typeof AudioSys !== 'undefined') AudioSys.play('achievement');
      } else {
        response = `<span style="color:#888;">Пока темно. Может, дело не во времени суток, а в теме...</span>`;
      }
    }
    else if (command === 'date') {
      const now = new Date();
      const h = now.getHours();
      const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      let period, phrases;
      if (h >= 5 && h < 11) {
        period = 'утро';
        phrases = [
          'Организм ещё не поверил, что день начался.',
          'Первая банка звучит особенно громко в это время.',
          'Кофеин лучше вкалывать, чем растягивать.'
        ];
      } else if (h >= 11 && h < 17) {
        period = 'день';
        phrases = [
          'Пик активности агента. Работай, не отвлекайся.',
          'Самое время для второй банки. Или третьей.',
          'Дневная смена наблюдения продолжается.'
        ];
      } else if (h >= 17 && h < 23) {
        period = 'вечер';
        phrases = [
          'Вечерний заряд перед долгой ночью.',
          'Кто-то ещё работает, кто-то уже сдаётся сну.',
          'Хороший час для банки, плохой час для сна.'
        ];
      } else {
        period = 'ночь';
        phrases = [
          'Кто пьёт энергетик после полуночи, тот не спит по расписанию.',
          'Ночная смена. Сервер тоже не спит, как и ты.',
          'В это время суток обычно рождаются лучшие (и худшие) решения.'
        ];
      }
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      response = `⏱ ${timeStr} — ${period}<br><span style="color:#888;font-style:italic;">${phrase}</span>`;
    }
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
      else if (command === 'study') {
      const studyTips = [
        'Для усердной учёбы энергетик не нужен. Но если очень хочется — можно один.',
        'Перед сессией лучше выспаться. А раз уж ты читаешь терминал в три ночи — один точно можно.',
        'Учёба и энергетики — разные вещи. Хотя один погоды не сделает.',
        'Серьёзно, иди спать. Ну а если совсем невмоготу — один энергетик и вперёд.',
        'Кофеин не заменит сон, но иногда очень хочется в это не верить.'
      ];
      response = `<span style="color:#fbbf24;font-style:italic;">${studyTips[Math.floor(Math.random() * studyTips.length)]}</span>`;
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
      const display = getAchievementDisplay(key);
      const tierClass = isUnlocked ? ('unlocked tier-' + display.tier) : 'locked';
            achHtml += `
        <div class="profile-ach-item ${tierClass}" data-ach-key="${key}">
          <i class="fa-solid ${isUnlocked ? display.icon : 'fa-question'}"></i>
          <span>${isUnlocked ? display.name : '???'}</span>
        </div>
      `;
    }
    const agentId = getAgentId();
    const agentCallsign = getAgentCallsign();
    profContent.innerHTML = `
      <div class="profile-stat-row">
        <span class="profile-stat-label">${t('profile_agent_id')}</span>
        <span class="profile-stat-val">#${agentId}${agentCallsign ? ' — ' + agentCallsign : ''}</span>
      </div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">${t('profile_rank')}</span>
        <span class="profile-stat-val ${rankClass}">${rank} (${score})</span>
        <button class="rank-history-btn" id="rankHistoryBtn" aria-label="Все ранги"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="rank-history-list" id="rankHistoryList"></div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">${t('profile_missions')}</span>
        <span class="profile-stat-val">${visits}</span>
      </div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">${t('profile_fav_brand')}</span>
        <span class="profile-stat-val">${topBrand === 'Нет данных' ? t('profile_no_data') : topBrand}</span>
      </div>
      <div class="profile-stat-row">
        <span class="profile-stat-label">${t('profile_max_dose')}</span>
        <span class="profile-stat-val" style="color: ${maxCaff > 400 ? '#ff3b5c' : '#fff'}">${maxCaff} мг</span>
      </div>
    <div style="font-family:'Oswald'; color:#888; margin-top:25px; margin-bottom:10px; letter-spacing:1px;">${t('profile_achievements')} (${achCount}/${Object.keys(achievements).length})</div>
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
        const ach = getAchievementDisplay(key);
        if (!ach) return;
        const isUnlocked = safeLSGet('ach_' + key, null);
        const godMode = !!window._buzzGodMode;
        const showFull = isUnlocked || godMode;

        const descBox = profContent.querySelector('#achDescriptionBox');
        if (!descBox) return;

        const howToHtml = godMode && ach.howTo
          ? `<div class="ach-desc ach-howto"><i class="fa-solid fa-key" style="margin-right:6px;color:#c084fc;"></i>${ach.howTo}</div>`
          : '';

               descBox.innerHTML = `
          <div class="ach-description-box">
            <i class="fa-solid ${showFull ? ach.icon : 'fa-question'} ach-icon" style="color: ${showFull ? 'var(--accent)' : 'var(--muted)'};"></i>
            <div style="flex:1;">
              <div class="ach-name">${showFull ? ach.name : '???'}</div>
              <div class="ach-desc">${showFull ? ach.desc : t('profile_locked_desc')}</div>
              ${howToHtml}
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

// === ФОРС-РЕФЛОУ СЕТКИ КАРТОЧЕК ПРИ РЕСАЙЗЕ ОКНА ===
// Известный баг рендеринга: при резком расширении окна браузер иногда не
// пересчитывает grid-template-columns сразу. Толкаем reflow вручную.
(function() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const cardsGrid = document.getElementById('cardsGrid');
      if (!cardsGrid) return;
      cardsGrid.style.display = 'none';
      void cardsGrid.offsetHeight; // форсируем reflow
      cardsGrid.style.display = '';
    }, 150);
  });
})();

// === ЛЕНИВАЯ ЗАГРУЗКА LEAFLET ===
(function() {
  const mapSection = document.getElementById('mapSection');
  if (!mapSection) return;

  function loadLeaflet() {
    if (window.L) { if (typeof initMap === 'function') initMap(); return; }
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer && !mapContainer.querySelector('.map-loading-spinner')) {
      mapContainer.insertAdjacentHTML('beforeend', '<div class="map-loading-spinner"><div class="spinner"></div></div>');
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (typeof initMap === 'function') initMap();
      const sp = document.querySelector('.map-loading-spinner');
      if (sp) sp.remove();
    };
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

// === ЛОВУШКА ФОКУСА ДЛЯ ОТКРЫТЫХ МОДАЛОК ===
document.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;
  const openModal = document.querySelector(
    '.custom-modal.open .custom-modal-inner, .suggest-modal-backdrop.open .suggest-modal, .video-modal-backdrop.open .video-modal, .key-modal-backdrop.open .key-modal, #drinkDetailsModal.open .details-inner, #blockblastOverlay.show .blockblast-modal, #coronationOverlay.show .coronation-stage'
  );
  if (!openModal) return;
  const focusables = openModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

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
// МОБИЛЬНАЯ ПАСХАЛКА: ДОЛГИЙ ТАП ПО ЛОГО → МЕНЮ СЕКРЕТНЫХ РЕЖИМОВ
// Раньше здесь были тряска (Motion API — часто требует разрешения и
// ненадёжна) и свайп-паттерны (сложно повторить точно на маленьком экране).
// Заменено на явное меню из трёх кнопок — надёжный вариант без гаданий,
// жестов и системных разрешений.
// ============================================================
(function() {
  const logo = document.querySelector('.header-logo');
  if (!logo) return;

  let timer;
  let active = false;
  let progress;
  let menuHideTimer = null;

  // ВАЖНО: НЕ вызываем preventDefault на touchstart — иначе браузер не
  // генерирует синтетический click после короткого тапа, и пасхалка с
  // монеткой в лого (4 обычных клика) перестаёт работать на телефоне.
  function start(e) {
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
      window.__logoLongPressJustFired = true;
      setTimeout(() => { window.__logoLongPressJustFired = false; }, 500);
      unlockAchievement('mobile');
      showSecretMenu();
    }, 3000);
  }

  function cancel() {
    active = false;
    clearTimeout(timer);
    if (progress) { progress.remove(); progress = null; }
  }

  // Предотвращаем скролл страницы ТОЛЬКО когда долгий тап уже начался —
  // это не мешает обычному короткому тапу (клику) по лого.
  function touchMoveDuringHold(e) {
    if (active && e.cancelable) e.preventDefault();
    cancel();
  }

    logo.addEventListener('touchstart', start, { passive: true });
  logo.addEventListener('touchend', cancel);
  logo.addEventListener('touchmove', touchMoveDuringHold, { passive: false });
  logo.addEventListener('touchcancel', cancel);
  // Блокируем нативное системное меню (Открыть в новой вкладке / Копировать
  // ссылку) при долгом тапе по ссылке-лого. Событие contextmenu отдельное
  // от touch-событий, поэтому это не мешает синтетическому click ни для
  // долгого тапа (D-pad), ни для быстрых тапов (монетка).
  logo.addEventListener('contextmenu', (e) => e.preventDefault());

    function showSecretMenu() {
    const old = document.getElementById('mobileSecretMenu');
    if (old) old.remove();
    clearTimeout(menuHideTimer);

    const menu = document.createElement('div');
    menu.id = 'mobileSecretMenu';
    menu.innerHTML = `
      <div class="secret-dpad-hint">Введи код вручную, как на клавиатуре:<br>Konami ↑↑↓↓←→←→BA · DOOM (зеркально) ↓↓↑↑→←→←BA</div>
      <div class="secret-dpad">
        <div class="secret-dpad-row">
          <button class="secret-dpad-btn" data-key="arrowup"><i class="fa-solid fa-arrow-up"></i></button>
        </div>
        <div class="secret-dpad-row">
          <button class="secret-dpad-btn" data-key="arrowleft"><i class="fa-solid fa-arrow-left"></i></button>
          <button class="secret-dpad-btn" data-key="arrowdown"><i class="fa-solid fa-arrow-down"></i></button>
          <button class="secret-dpad-btn" data-key="arrowright"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div class="secret-dpad-row secret-dpad-ab">
          <button class="secret-dpad-btn secret-dpad-letter" data-key="b">B</button>
          <button class="secret-dpad-btn secret-dpad-letter" data-key="a">A</button>
        </div>
      </div>
      <button class="secret-dpad-close" id="secretDpadClose"><i class="fa-solid fa-xmark"></i> Закрыть</button>
    `;
    document.body.appendChild(menu);
    requestAnimationFrame(() => menu.classList.add('show'));
    if (typeof AudioSys !== 'undefined') AudioSys.play('open');
    showToast('📱 Введи код на пульте ниже', 'fa-solid fa-mobile-screen');

    menu.querySelectorAll('.secret-dpad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof AudioSys !== 'undefined') AudioSys.play('click');
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 150);

        const key = btn.dataset.key;
        const success = (typeof window.__buzzProcessSequenceKey === 'function')
          ? window.__buzzProcessSequenceKey(key)
          : false;

        clearTimeout(menuHideTimer);
        if (success) {
          setTimeout(hideSecretMenu, 500);
        } else {
          menuHideTimer = setTimeout(hideSecretMenu, 15000);
        }
      });
    });

    document.getElementById('secretDpadClose').addEventListener('click', hideSecretMenu);

    menuHideTimer = setTimeout(hideSecretMenu, 15000);
  }

  function hideSecretMenu() {
    const menu = document.getElementById('mobileSecretMenu');
    if (!menu) return;
    menu.classList.remove('show');
    setTimeout(() => menu.remove(), 300);
    if (typeof window.__buzzResetSequence === 'function') window.__buzzResetSequence();
  }
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
    searchQuery = (query || '').toLowerCase().trim();

    if (searchQuery) clearBtn.classList.add('visible');
    else clearBtn.classList.remove('visible');

    if (typeof applyFilters === 'function') applyFilters();
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

  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (searchInput.value) {
      searchInput.value = '';
      filterCards('');
    } else {
      searchInput.blur();
    }
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
  let seaClicks = 0, seaClickTimer = null;
  const SEA_TARGET_BRAND = 'Monster Energy - Juiced Aussie Style Lemonade';
  const JUNGLE_TARGET_BRAND = 'Monster Energy - Rio Punsh';
  function triggerSeaEgg() {
    if (document.body.classList.contains('sea-mode')) return;
    document.body.classList.add('sea-mode');
    const oldOv = document.getElementById('seaOverlay');
    if (oldOv) oldOv.remove(); // пересоздаём заново — иначе анимация корабля не перезапустится
    const ov = document.createElement('div');
    ov.id = 'seaOverlay';
      let fishHtml = '';
      const fishEmojis = ['🐟', '🐠', '🐡'];
      for (let i = 0; i < 3; i++) {
        const emoji = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        const top = 92 + Math.random() * 7;
        const dur = 5 + Math.random() * 4;
        const delay = Math.random() * 3;
        const flip = Math.random() > 0.5;
        fishHtml += `<div class="sea-fish" style="top:${top}vh; animation-duration:${dur}s; animation-delay:-${delay}s; ${flip ? 'transform: scaleX(-1);' : ''}">${emoji}</div>`;
      }
      ov.innerHTML = '<div class="sea-wave sea-wave-1"></div><div class="sea-wave sea-wave-2"></div><div class="sea-wave sea-wave-3"></div>' + fishHtml + '<div class="sea-foam"></div><div class="sea-boat">⛵</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    if (window.AudioSys) {
      if (typeof AudioSys.isMuted === 'function' && AudioSys.isMuted()) {
        showToast('🔇 Звук выключен — включи, чтобы услышать волны', 'fa-solid fa-volume-xmark');
      } else {
        AudioSys.resume().then(() => { try { AudioSys.play('waves'); } catch(e) {} });
      }
    }
    if (typeof showToast === 'function') showToast('🌊 Море услышало тебя', 'fa-solid fa-water');
    if (typeof unlockAchievement === 'function') unlockAchievement('sea_secret');
    setTimeout(() => {
      document.body.classList.remove('sea-mode');
      const el = document.getElementById('seaOverlay');
      if (el) el.remove();
    }, 8000);
  }
  let jungleClicks = 0, jungleClickTimer = null;
  function triggerJungleEgg() {
    if (document.body.classList.contains('jungle-mode') || !isManualLightTheme()) return;
    document.body.classList.add('jungle-mode');
    const oldOv = document.getElementById('jungleOverlay');
    if (oldOv) oldOv.remove();
    const ov = document.createElement('div');
    ov.id = 'jungleOverlay';
    let vinesHtml = '';
    const monkeyVineIndex = 6;
    for (let i = 0; i < 16; i++) {
      const len = 85 + Math.random() * 35;
      vinesHtml += `<div class="jungle-vine" style="left:${(i * 6.25) + 1}%; animation-delay:${i * 0.08}s;">
        <svg viewBox="0 0 40 400" preserveAspectRatio="none" style="height:${len}vh;">
          <path d="M20 0 Q 5 60 30 120 Q 45 180 15 240 Q 0 300 25 360 Q 35 390 20 400" fill="none" stroke="#2d5a27" stroke-width="6" stroke-linecap="round"/>
          <path d="M20 0 Q 5 60 30 120 Q 45 180 15 240 Q 0 300 25 360 Q 35 390 20 400" fill="none" stroke="#4a8f3f" stroke-width="3" stroke-linecap="round"/>
          <circle cx="12" cy="70" r="10" fill="#3d7a34"/><circle cx="32" cy="150" r="9" fill="#4a8f3f"/>
          <circle cx="8" cy="230" r="10" fill="#3d7a34"/><circle cx="28" cy="310" r="9" fill="#4a8f3f"/>
        </svg>
        ${i === monkeyVineIndex ? '<div class="jungle-monkey">🐒</div>' : ''}
      </div>`;
    }
    ov.innerHTML = vinesHtml;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    if (typeof showToast === 'function') showToast('🌿 Джунгли услышали тебя', 'fa-solid fa-leaf');
    if (typeof unlockAchievement === 'function') unlockAchievement('jungle_secret');
    setTimeout(() => {
      document.body.classList.remove('jungle-mode');
      const el = document.getElementById('jungleOverlay');
      if (el) el.remove();
    }, 6000);
  }

  if (img) {
    img.addEventListener('click', () => {
      if (!currentDrink) return;
      if (currentDrink.brand === SEA_TARGET_BRAND) {
        seaClicks++;
        clearTimeout(seaClickTimer);
        seaClickTimer = setTimeout(() => { seaClicks = 0; }, 900);
        if (seaClicks >= 4) { seaClicks = 0; triggerSeaEgg(); }
      } else if (currentDrink.brand === JUNGLE_TARGET_BRAND) {
        jungleClicks++;
        clearTimeout(jungleClickTimer);
        jungleClickTimer = setTimeout(() => { jungleClicks = 0; }, 900);
        if (jungleClicks >= 4) { jungleClicks = 0; triggerJungleEgg(); }
      }
    });
  }
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
  let liveEffectInterval = null;
  let tiltHandler = null;
  let tiltResetHandler = null;
  let touchTiltStartHandler = null;
  let touchTiltMoveHandler = null;
  let touchTiltEndHandler = null;
  let currentSimilarList = [];
  let navStack = [];

  function startCanLiveEffect(drink) {
    stopCanLiveEffect();
    const wrap = document.querySelector('.details-image-wrap');
    if (!wrap) return;
    const color = bColors[drink.key] || '#00e676';
    wrap.style.setProperty('--can-live-color', color);
    wrap.classList.add('can-live');

    const isTouch = matchMedia('(pointer: coarse)').matches;

    if (!isTouch) {
      // Десктоп: банка наклоняется вслед за мышкой
      tiltHandler = (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.04)`;
      };
      tiltResetHandler = () => { img.style.transform = ''; };
      wrap.addEventListener('mousemove', tiltHandler);
      wrap.addEventListener('mouseleave', tiltResetHandler);
    } else {
      // Мобильный: наклон пальцем + вибрация — совсем другое ощущение, чем на десктопе
      let rect = null;
      touchTiltStartHandler = () => {
        rect = wrap.getBoundingClientRect();
        if (navigator.vibrate) navigator.vibrate(14);
        img.style.transition = 'transform 0.05s linear';
        wrap.classList.add('can-touch-active');
      };
      touchTiltMoveHandler = (e) => {
        if (!rect) return;
        const t = e.touches[0];
        const x = (t.clientX - rect.left) / rect.width - 0.5;
        const y = (t.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `rotateX(${-y * 22}deg) rotateY(${x * 22}deg) scale(1.1)`;
      };
      touchTiltEndHandler = () => {
        img.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        img.style.transform = '';
        wrap.classList.remove('can-touch-active');
        if (navigator.vibrate) navigator.vibrate(8);
        rect = null;
      };
      wrap.addEventListener('touchstart', touchTiltStartHandler, { passive: true });
      wrap.addEventListener('touchmove', touchTiltMoveHandler, { passive: true });
      wrap.addEventListener('touchend', touchTiltEndHandler);
      wrap.addEventListener('touchcancel', touchTiltEndHandler);
    }

      const symbols = ['⚡'];
    liveEffectInterval = setInterval(() => {
      if (!document.body.contains(wrap)) { stopCanLiveEffect(); return; }
      const el = document.createElement('span');
      el.className = 'can-symbol';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = (20 + Math.random() * 60) + '%';
      el.style.bottom = (10 + Math.random() * 20) + '%';
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 2700);
    }, 900);
  }

  function stopCanLiveEffect() {
    if (liveEffectInterval) { clearInterval(liveEffectInterval); liveEffectInterval = null; }
    const wrap = document.querySelector('.details-image-wrap');
    if (wrap) {
      if (tiltHandler) wrap.removeEventListener('mousemove', tiltHandler);
      if (tiltResetHandler) wrap.removeEventListener('mouseleave', tiltResetHandler);
      if (touchTiltStartHandler) wrap.removeEventListener('touchstart', touchTiltStartHandler);
      if (touchTiltMoveHandler) wrap.removeEventListener('touchmove', touchTiltMoveHandler);
      if (touchTiltEndHandler) { wrap.removeEventListener('touchend', touchTiltEndHandler); wrap.removeEventListener('touchcancel', touchTiltEndHandler); }
      wrap.classList.remove('can-live', 'can-touch-active');
    }
    tiltHandler = null; tiltResetHandler = null;
    touchTiltStartHandler = null; touchTiltMoveHandler = null; touchTiltEndHandler = null;
    if (img) img.style.transform = '';
  }

  function open(drink, opts) {
    if (!drink) return;
    opts = opts || {};
    if (!opts.keepOpen) navStack = [];
    currentDrink = drink;
    const drinkIndex = drinks.indexOf(drink);

    // Заполняем基本 информацию
    img.style.opacity = '0';
    setImageWithFallback(img, drink.img || '', 'images/placeholder.svg', () => {
      img.style.opacity = '1';
    });
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
      <div class="details-stat-box" data-type="caffeine"><label>${t('card_caffeine')}</label><span class="stat-value">${drink.caffeine || t('details_no_data')}</span></div>
      <div class="details-stat-box" data-type="sugar"><label>${t('card_sugar')}</label><span class="stat-value">${drink.sugar || t('details_no_data')}</span></div>
      <div class="details-stat-box" data-type="calories"><label>${t('card_calories')}</label><span class="stat-value">${drink.cal || t('details_no_data')}</span></div>
      <div class="details-stat-box" data-type="ph"><label>${t('card_ph')}</label><span class="stat-value">${drink.ph || t('details_no_data')}</span></div>
    `;
        // Подробная информация: бренд, вкус, цена
    const brandInfo = bBrandInfo[drink.key] || null;
    const lineKey = (getDrinkLine(drink) || '').toLowerCase();
    const lineInfo = bLineInfo[lineKey] || null;
    if (extraInfoEl) {
      const countryLine = brandInfo && brandInfo.country
        ? brandInfo.country + (brandInfo.founded ? ' • ' + t('details_since') + ' ' + brandInfo.founded + ' ' + t('details_year') : '')
        : t('details_no_country');
      const isSunriseLight = /Ultra Sunrise/i.test(drink.brand) && typeof isManualLightTheme === 'function' && isManualLightTheme();
            extraInfoEl.innerHTML = `
        ${lineInfo ? `<div class="line-info-box" style="--line-color:${bLineColors[lineKey] || 'var(--accent)'}"><div class="line-info-title"><i class="fa-solid fa-star"></i> ${lineInfo.title}</div><p>${lineInfo.desc}</p></div>` : ''}
        ${isSunriseLight ? `<div class="line-info-box"><div class="line-info-title"><i class="fa-solid fa-cloud-sun"></i> Рассвет</div><p>Свет сейчас какой-то не такой... будто где-то в системе что-то ждёт, чтобы его нашли. Попробуй заглянуть в терминал.</p></div>` : ''}
        <div class="extra-info-row"><i class="fa-solid fa-earth-europe"></i><span>${countryLine}</span></div>
        ${brandInfo && brandInfo.note ? `<div class="extra-info-row"><i class="fa-solid fa-circle-info"></i><span>${brandInfo.note}</span></div>` : ''}
                <div class="extra-info-row"><i class="fa-solid fa-comment"></i><span>${(getLang() === 'en' && drink.tasteEn) ? drink.tasteEn : (drink.taste ? drink.taste : t('details_no_taste'))}</span></div>
        <div class="extra-info-row"><i class="fa-solid fa-tag"></i><span>${drink.price ? drink.price : t('details_price_tbd')}</span></div>
        ${(() => {
          const perLiter = getPricePerLiter(drink);
          const per100mg = getPricePer100mgCaffeine(drink);
          if (!perLiter && !per100mg) return '';
          const parts = [];
          if (perLiter) parts.push(`${perLiter} €/л`);
          if (per100mg) parts.push(`${per100mg} €/100мг кофеина`);
          return `<div class="extra-info-row"><i class="fa-solid fa-calculator"></i><span>${parts.join(' • ')}</span></div>`;
        })()}
        <div class="price-disclaimer">${t('details_price_disclaimer')}</div>
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
      ? '<i class="fa-solid fa-heart"></i> ' + t('details_fav_active')
      : '<i class="fa-solid fa-heart"></i> ' + t('details_fav_inactive');
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
        ? '<i class="fa-solid fa-heart"></i> ' + t('details_fav_active')
        : '<i class="fa-solid fa-heart"></i> ' + t('details_fav_inactive');
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
      drankBtn.innerHTML = '<i class="fa-solid fa-mug-hot"></i> ' + t('details_drank');
      drankBtn.onclick = (e) => {
        e.stopPropagation();
        if (CaffeineTracker) {
          CaffeineTracker.add(drink);
          drankBtn.classList.add('active');
          drankBtn.innerHTML = '<i class="fa-solid fa-check"></i> ' + t('details_drank_done');
          showToast('+' + (parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0) + ' ' + t('card_caffeine').toLowerCase(), 'fa-solid fa-mug-hot');
          const data = CaffeineTracker.getTodayData();
          const total = data.total || 0;
          const pct = Math.min((total / 400) * 100, 100);
          const barFill = document.getElementById('dcpBarFill');
          const dcpText = document.getElementById('dcpText');
          if (barFill) {
            barFill.style.width = pct + '%';
            barFill.style.background = total > 400 ? '#ff3b5c' : (total > 300 ? '#ffd700' : 'var(--accent)');
          }
          if (dcpText) dcpText.textContent = total + ' / 400 ' + t('details_daily_caffeine');
        }
      };
    }

    // Прогресс суточного кофеина
    if (typeof CaffeineTracker !== 'undefined') {
      const data = CaffeineTracker.getTodayData();
      const total = data.total || 0;
      const pct = Math.min((total / 400) * 100, 100);
      const barFill = document.getElementById('dcpBarFill');
      const dcpText = document.getElementById('dcpText');
      if (barFill) {
        barFill.style.width = pct + '%';
        barFill.style.background = total > 400 ? '#ff3b5c' : (total > 300 ? '#ffd700' : 'var(--accent)');
      }
      if (dcpText) dcpText.textContent = total + ' / 400 ' + t('details_daily_caffeine');
    }

    // Похожие напитки
    renderSimilar(drink);

    // История просмотров (не добавляет кофеин!)
    addToHistory(drink);
    renderHistory();

      // Открываем модалку (или обновляем содержимое на месте при свайпе)
    if (!opts.keepOpen) {
      modal.classList.add('open');
      lockScroll();
      if (window.AudioSys) AudioSys.play('open');
    } else {
      if (window.AudioSys) AudioSys.play('swish');
      playSwipeTransition(opts.swipeDir);
    }
    startCanLiveEffect(drink);
  }

  function playSwipeTransition(dir) {
    const info = document.querySelector('.details-info');
    if (!info) return;
    info.classList.remove('swipe-in-left', 'swipe-in-right');
    void info.offsetWidth;
    info.classList.add(dir === 'prev' ? 'swipe-in-left' : 'swipe-in-right');
  }

  function goToNextSimilar() {
    if (!currentSimilarList || currentSimilarList.length === 0) return;
    let next = currentSimilarList[0];
    if (navStack.length && next === navStack[navStack.length - 1] && currentSimilarList.length > 1) {
      next = currentSimilarList[1];
    }
    navStack.push(currentDrink);
    open(next, { keepOpen: true, swipeDir: 'next' });
  }

  function goToPrevDrink() {
    if (!navStack.length) return;
    const prev = navStack.pop();
    open(prev, { keepOpen: true, swipeDir: 'prev' });
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

    function computeSimilarDrinks(drink) {
    const targetCaff = parseInt((drink.caffeine || '').replace(/\D/g, '')) || 0;
    const targetSugar = parseInt((drink.sugar || '').replace(/\D/g, '')) || 0;

    return drinks
      .filter(d => d !== drink)
      .map(d => {
        const dCaff = parseInt((d.caffeine || '').replace(/\D/g, '')) || 0;
        const dSugar = parseInt((d.sugar || '').replace(/\D/g, '')) || 0;
        const diff = Math.abs(dCaff - targetCaff) + Math.abs(dSugar - targetSugar);
        return { drink: d, diff: diff };
      })
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 6)
      .map(item => item.drink);
  }

  function renderSimilar(drink) {
    const similar = computeSimilarDrinks(drink);
    currentSimilarList = similar;

    similarList.innerHTML = similar.map(d => `
      <div class="similar-item" data-brand="${d.brand}">
        <img src="${d.img || ''}" alt="${d.brand}" loading="lazy" data-fallback="true">
        <span>${d.brand.substring(0, 18)}</span>
      </div>
    `).join('');

    similarList.querySelectorAll('.similar-item img[data-fallback="true"]').forEach(imgEl => {
      const brand = imgEl.closest('.similar-item')?.dataset.brand;
      const d = drinks.find(x => x.brand === brand);
      if (d) {
        setImageWithFallback(imgEl, d.img || '', 'images/placeholder.svg', (finalSrc) => normalizeCanImage(imgEl, finalSrc));
      }
    });

    similarList.querySelectorAll('.similar-item').forEach((el, i) => {
      el.onclick = () => open(similar[i]);
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
     if (drink) {
        setImageWithFallback(imgEl, drink.img || '', 'images/placeholder.svg', (finalSrc) => normalizeCanImage(imgEl, finalSrc));
      }
    });

    historyList.querySelectorAll('.history-item').forEach(el => {
      el.onclick = () => {
        const drink = drinks.find(d => d.brand === el.dataset.brand);
        if (drink) open(drink);
      };
    });
  }
  function closeModal() {
    modal.classList.remove('open');
    unlockScroll();
    stopCanLiveEffect();
    currentDrink = null;
  }
  // Делегируем клики на всю модалку — надёжнее прямого обработчика на
  // кнопке (тот же приём, что раньше решил такую же проблему в коронации).
  modal.addEventListener('click', e => {
    if (e.target.closest('#closeDetails')) {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.target === modal) closeModal();
  });
  modal.addEventListener('touchstart', e => {
    if (e.target.closest('#closeDetails')) {
      e.preventDefault();
      closeModal();
    }
  }, { passive: false });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

    // Свайп-зоны по краям модалки — листание между похожими напитками
  // без закрытия окна (свайп вправо — вперёд, влево — назад)
  function setupSwipeZones() {
    const inner = modal.querySelector('.details-inner');
    if (!inner || inner.querySelector('.details-swipe-zone')) return;
    const zoneLeft = document.createElement('div');
    zoneLeft.className = 'details-swipe-zone details-swipe-zone-left';
    const zoneRight = document.createElement('div');
    zoneRight.className = 'details-swipe-zone details-swipe-zone-right';
    inner.appendChild(zoneLeft);
    inner.appendChild(zoneRight);

    [zoneLeft, zoneRight].forEach(zone => {
      let startX = 0, startY = 0, tracking = false;
      zone.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        startX = t.clientX; startY = t.clientY;
        tracking = true;
      }, { passive: true });
      zone.addEventListener('touchmove', (e) => {
        if (!tracking) return;
        const t = e.touches[0];
        if (Math.abs(t.clientX - startX) > Math.abs(t.clientY - startY)) {
          e.preventDefault();
        }
      }, { passive: false });
      zone.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) goToNextSimilar();
          else goToPrevDrink();
        }
      });
    });
  }
  setupSwipeZones();

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
// ФИЧА: ПОСЛЕДНИЕ ОБЗОРЫ (лента новинок)
// ============================================================
function renderLatest() {
  const list = document.getElementById('latestList');
  if (!list) return;

  const withIndex = drinks.map((d, i) => ({ d, i }));
  const latest = withIndex.sort((a, b) => b.i - a.i).slice(0, 10).map(x => x.d);

  list.innerHTML = latest.map((drink) => `
    <div class="top10-item" data-brand="${drink.brand}">
      <div class="top10-rank"><i class="fa-solid fa-sparkles" style="font-size:20px;color:#22d3ee;"></i></div>
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
function updateDailyCountdown() {
  const el = document.getElementById('ddCountdownText');
  if (!el) return;
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0); // ближайшая полночь
  const diffMs = next - now;
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  el.textContent = `Обновится через ${h} ч ${m} мин`;
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

    const diary = safeLSGetJSON('buzz_diary', []);
    diary.push({ brand: drink.brand, img: drink.img, mg: mg, ts: Date.now() });
    if (diary.length > 300) diary.shift();
    safeLSSetJSON('buzz_diary', diary);

    const todayKey = new Date().toISOString().slice(0, 10);
    const marks = new Set(safeLSGetJSON('buzz_calendar_marks', []));
    if (!marks.has(todayKey)) {
      marks.add(todayKey);
      safeLSSetJSON('buzz_calendar_marks', Array.from(marks));
      if (marks.size >= 15 && typeof unlockAchievement === 'function') unlockAchievement('dead_owl');
    }
    
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
      resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> ' + t('calc_reset');
      resetBtn.style.cssText = 'margin-top:15px;width:100%;padding:10px;background:rgba(255,59,92,0.1);border:1px solid rgba(255,59,92,0.3);color:#ff3b5c;border-radius:8px;cursor:pointer;font-family:Oswald;font-size:14px;letter-spacing:1px;';
      resetBtn.onclick = () => {
        if (confirm(t('calc_reset_confirm'))) {
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

// ==========================================
// ДНЕВНИК НАПИТКОВ
// ==========================================
(function() {
  const diaryModal = document.getElementById('diaryModal');
  const diaryList = document.getElementById('diaryList');
  const diaryOpenBtn = document.getElementById('diaryOpenBtn');
  const closeDiaryBtn = document.getElementById('closeDiary');
  if (!diaryModal || !diaryOpenBtn) return;

  function renderDiary() {
    const entries = safeLSGetJSON('buzz_diary', []).slice().reverse();
    if (entries.length === 0) {
      diaryList.innerHTML = '<div class="diary-empty"><i class="fa-solid fa-book-open"></i><div>' + t('diary_empty') + '</div><div style="font-size:13px;margin-top:8px;">' + t('diary_empty_hint') + '</div></div>';
      return;
    }
    const groups = {};
    entries.forEach(e => {
      const d = new Date(e.ts);
      const dayKey = d.toLocaleDateString('ru-RU');
      if (!groups[dayKey]) groups[dayKey] = [];
      groups[dayKey].push(e);
    });
    let html = '';
    for (const day in groups) {
      const dayTotal = groups[day].reduce((s, e) => s + e.mg, 0);
      html += `<div class="diary-day-header">${day} <span>${dayTotal} мг</span></div>`;
      groups[day].forEach(e => {
        const time = new Date(e.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        html += `<div class="diary-entry">
          <img src="${e.img || 'images/placeholder.svg'}" alt="" loading="lazy">
          <div class="diary-entry-info">
            <div class="diary-entry-name">${e.brand}</div>
            <div class="diary-entry-meta">${time} • ${e.mg} мг</div>
          </div>
        </div>`;
      });
    }
    diaryList.innerHTML = html;
  }

  diaryOpenBtn.addEventListener('click', () => {
    renderDiary();
    diaryModal.classList.add('open');
    lockScroll();
  });
  closeDiaryBtn.addEventListener('click', () => { diaryModal.classList.remove('open'); unlockScroll(); });
  diaryModal.addEventListener('click', e => { if (e.target === diaryModal) { diaryModal.classList.remove('open'); unlockScroll(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && diaryModal.classList.contains('open')) { diaryModal.classList.remove('open'); unlockScroll(); } });
})();

// ==========================================
// КАЛЕНДАРЬ ОТМЕТОК (не про серии подряд, а про сам факт)
// ==========================================
(function() {
  const calendarModal = document.getElementById('calendarModal');
  const calendarOpenBtn = document.getElementById('calendarOpenBtn');
  const closeCalendarBtn = document.getElementById('closeCalendar');
  const grid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('calMonthLabel');
  const totalEl = document.getElementById('calendarTotal');
  if (!calendarModal || !calendarOpenBtn) return;

  let viewDate = new Date();

  function tierClass(total) {
    if (total >= 30) return 'cal-tier-3';
    if (total >= 15) return 'cal-tier-2';
    if (total >= 5) return 'cal-tier-1';
    return '';
  }

  function renderCalendar() {
    const marks = new Set(safeLSGetJSON('buzz_calendar_marks', []));
    const y = viewDate.getFullYear(), m = viewDate.getMonth();
    const monthNames = t('cal_months');
    monthLabel.textContent = monthNames[m] + ' ' + y;

    const now = new Date();
    const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

    const firstDay = new Date(y, m, 1);
    const startOffset = (firstDay.getDay() + 6) % 7; // понедельник первым
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const tier = tierClass(marks.size);

    let html = '';
    t('cal_weekdays').forEach(d => html += `<div class="cal-weekday">${d}</div>`);
    for (let i = 0; i < startOffset; i++) html += `<div class="cal-day cal-empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      const marked = marks.has(dateStr);
      const isToday = dateStr === todayStr;
      html += `<div class="cal-day ${marked ? 'cal-marked ' + tier : ''} ${isToday ? 'cal-today' : ''}">${d}</div>`;
    }
    grid.innerHTML = html;
    totalEl.textContent = `${t('calendar_total')} ${marks.size}`;
  }

  function checkStreakWarning() {
    const marks = new Set(safeLSGetJSON('buzz_calendar_marks', []));
    const now = new Date();
    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (marks.has(key)) streak++;
      else break;
    }
    const warnEl = document.getElementById('calendarWarning');
    if (!warnEl) return;
    const todayKey = now.toISOString().slice(0, 10);
    const lastShown = safeLSGet('buzz_streak_warning_shown', '');
    if (streak >= 6 && lastShown !== todayKey) {
      warnEl.style.display = 'flex';
      safeLSSet('buzz_streak_warning_shown', todayKey);
    } else {
      warnEl.style.display = 'none';
    }
  }

  calendarOpenBtn.addEventListener('click', () => {
    viewDate = new Date();
    renderCalendar();
    checkStreakWarning();
    calendarModal.classList.add('open');
    lockScroll();
  });
  closeCalendarBtn.addEventListener('click', () => { calendarModal.classList.remove('open'); unlockScroll(); });
  calendarModal.addEventListener('click', e => { if (e.target === calendarModal) { calendarModal.classList.remove('open'); unlockScroll(); } });
  document.getElementById('calPrevMonth').addEventListener('click', () => { viewDate.setMonth(viewDate.getMonth() - 1); renderCalendar(); });
  document.getElementById('calNextMonth').addEventListener('click', () => { viewDate.setMonth(viewDate.getMonth() + 1); renderCalendar(); });
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
  renderLatest();
  renderTop10();
  renderStats();
  renderDailyDrink();
  updateDailyCountdown();
  setInterval(updateDailyCountdown, 60000);
  CaffeineTracker.updateWidget();

  // Перехват кликов по карточкам — открываем детали, а не видео сразу
  // (сохраняем видео-кнопку внутри карточки)
  function attachCardDetailsClick(gridId) {
    const gridEl = document.getElementById(gridId);
    if (!gridEl) return;
    gridEl.addEventListener('click', (e) => {
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
  attachCardDetailsClick('cardsGrid');

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
      if (window.__logoLongPressJustFired) return;
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
// ГЛОБАЛЬНЫЕ КОМБО (KONAMI + DOOM) — клавиатура + мобильный D-pad
// Overload-режим удалён по запросу.
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
    if (typeof DoomMode !== 'undefined') {
      DoomMode.toggle(false);
    }
  }

  // processKey — сравнение одной "клавиши" (реальной или с виртуального
  // D-pad) с последовательностями Konami/Doom. Общая для клавиатуры и тапов.
  // Возвращает true, если код был успешно введён целиком.
  function processKey(key) {
    let matchedAny = false;

    if (key === konamiSeq[konamiIndex].toLowerCase()) {
      konamiIndex++;
      matchedAny = true;
      if (konamiIndex === konamiSeq.length) {
        onKonamiSuccess();
        konamiIndex = 0; doomIndex = 0;
        return true;
      }
    } else {
      konamiIndex = (key === konamiSeq[0].toLowerCase()) ? 1 : 0;
    }

    if (key === doomSeq[doomIndex].toLowerCase()) {
      doomIndex++;
      matchedAny = true;
      if (doomIndex === doomSeq.length) {
        onDoomSuccess();
        konamiIndex = 0; doomIndex = 0;
        return true;
      }
    } else {
      doomIndex = (key === doomSeq[0].toLowerCase()) ? 1 : 0;
    }

    if (matchedAny) {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(resetAll, 4000);
    }
    return false;
  }

  function handleKeydown(e) {
    if (e.target.matches('input, textarea, select') || e.target.isContentEditable) {
      return;
    }
    const key = e.key.toLowerCase();
    const before = konamiIndex + doomIndex;
    const success = processKey(key);
    if (success || konamiIndex + doomIndex !== before) {
      e.preventDefault();
    }
  }

  document.addEventListener('keydown', handleKeydown);

  // Доступ для мобильного D-pad
  window.__buzzProcessSequenceKey = processKey;
  window.__buzzResetSequence = resetAll;
})();
// ==========================================
// СООБЩИТЬ ОБ ОШИБКЕ (репорт по напитку)
// ==========================================
(function() {
  const reportModal = document.getElementById('reportModal');
  const reportBtn = document.getElementById('detailsReportBtn');
  const closeReportBtn = document.getElementById('closeReport');
  const sendReportBtn = document.getElementById('sendReport');
  const reportComment = document.getElementById('reportComment');
  const reportCounter = document.getElementById('reportCommentCounter');
  const reportLabel = document.getElementById('reportDrinkLabel');
  const reportHoneypot = document.getElementById('reportWebsite');
  if (!reportModal || !reportBtn) return;

  const REPORT_WORKER_URL = 'https://buzzrate-suggest.tleorg827.workers.dev';
  const REPORT_COOLDOWN_MS = 60000;
  let reportTargetBrand = '';

  reportBtn.addEventListener('click', () => {
    const brandEl = document.getElementById('detailsBrand');
    reportTargetBrand = brandEl ? brandEl.textContent : '';
    reportLabel.textContent = reportTargetBrand ? `${t('report_problem_with')}: ${reportTargetBrand}` : t('report_default_label');
    reportComment.value = '';
    reportCounter.textContent = '0 / 300';
    reportModal.classList.add('open');
  });
  closeReportBtn.addEventListener('click', () => reportModal.classList.remove('open'));
  reportModal.addEventListener('click', e => { if (e.target === reportModal) reportModal.classList.remove('open'); });

  reportComment.addEventListener('input', () => {
    reportCounter.textContent = reportComment.value.length + ' / 300';
  });

  sendReportBtn.addEventListener('click', () => {
    const comment = reportComment.value.trim();
    if (!comment) {
      reportComment.style.borderColor = '#ff3b5c';
      setTimeout(() => { reportComment.style.borderColor = ''; }, 1000);
      return;
    }

    const lastSent = parseInt(safeLSGet('buzz_last_report_ts', '0'), 10);
    const sinceLast = Date.now() - lastSent;
    if (sinceLast < REPORT_COOLDOWN_MS) {
      const waitSec = Math.ceil((REPORT_COOLDOWN_MS - sinceLast) / 1000);
      showToast(`Не так быстро — подожди ${waitSec} сек.`, 'fa-solid fa-clock');
      return;
    }

    sendReportBtn.disabled = true;
    sendReportBtn.textContent = 'Отправка...';

    fetch(REPORT_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '[ОШИБКА] ' + (reportTargetBrand || 'Без названия'),
        comment: comment,
        honeypot: reportHoneypot ? reportHoneypot.value : ''
      })
    })
      .then(res => res.json())
      .then(data => {
        sendReportBtn.disabled = false;
        sendReportBtn.textContent = 'Отправить';
        if (data.ok) {
          safeLSSet('buzz_last_report_ts', String(Date.now()));
          reportModal.classList.remove('open');
          showToast(t('toast_report_added'), 'fa-solid fa-check');
        } else {
          showToast('Ошибка отправки. Попробуй позже.', 'fa-solid fa-triangle-exclamation');
        }
      })
      .catch(() => {
        sendReportBtn.disabled = false;
        sendReportBtn.textContent = 'Отправить';
        showToast('Нет соединения. Попробуй позже.', 'fa-solid fa-triangle-exclamation');
      });
  });
})();
// ==========================================
// ДОСТИЖЕНИЯ (упрощённая модалка для мобилки — без остального досье)
// ==========================================
(function() {
  const achModal = document.getElementById('achievementsModal');
  const achBtn = document.getElementById('openAchievementsModal');
  const closeAchBtn = document.getElementById('closeAchievements');
  const achContent = document.getElementById('achievementsOnlyContent');
  if (!achModal || !achBtn) return;

  function renderAchievementsOnly() {
    let achCount = 0;
    let achHtml = '';
    for (let key in achievements) {
      const isUnlocked = safeLSGet('ach_' + key, null);
      if (isUnlocked) achCount++;
      const display = getAchievementDisplay(key);
      const tierClass = isUnlocked ? ('unlocked tier-' + display.tier) : 'locked';
      achHtml += `
        <div class="profile-ach-item ${tierClass}" data-ach-key="${key}">
          <i class="fa-solid ${isUnlocked ? display.icon : 'fa-question'}"></i>
          <span>${isUnlocked ? display.name : '???'}</span>
        </div>
      `;
    }
    achContent.innerHTML = `
      <div style="font-family:'Oswald'; color:#888; margin-bottom:10px; letter-spacing:1px;">${t('profile_achievements')} (${achCount}/${Object.keys(achievements).length})</div>
      <div class="profile-ach-grid">${achHtml}</div>
      <div id="achOnlyDescriptionBox"></div>
    `;

    achContent.querySelectorAll('.profile-ach-item').forEach(item => {
      item.addEventListener('click', () => {
        const key = item.dataset.achKey;
        const ach = getAchievementDisplay(key);
        if (!ach) return;
        const isUnlocked = safeLSGet('ach_' + key, null);
        const godMode = !!window._buzzGodMode;
        const showFull = isUnlocked || godMode;

        const descBox = achContent.querySelector('#achOnlyDescriptionBox');
        if (!descBox) return;

        const howToHtml = godMode && ach.howTo
          ? `<div class="ach-desc ach-howto"><i class="fa-solid fa-key" style="margin-right:6px;color:#c084fc;"></i>${ach.howTo}</div>`
          : '';

        descBox.innerHTML = `
          <div class="ach-description-box">
            <i class="fa-solid ${showFull ? ach.icon : 'fa-question'} ach-icon" style="color: ${showFull ? 'var(--accent)' : 'var(--muted)'};"></i>
            <div style="flex:1;">
              <div class="ach-name">${showFull ? ach.name : '???'}</div>
              <div class="ach-desc">${showFull ? ach.desc : t('profile_locked_desc')}</div>
              ${howToHtml}
            </div>
            <button class="ach-close" onclick="this.parentElement.parentElement.innerHTML='';">✕</button>
          </div>
        `;
      });
    });
  }

  achBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderAchievementsOnly();
    achModal.classList.add('open');
    lockScroll();
  });
  closeAchBtn.addEventListener('click', () => { achModal.classList.remove('open'); unlockScroll(); });
  achModal.addEventListener('click', e => { if (e.target === achModal) { achModal.classList.remove('open'); unlockScroll(); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && achModal.classList.contains('open')) { achModal.classList.remove('open'); unlockScroll(); } });
})();