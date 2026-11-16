/**
 * GR Production · приём заявок с сайта в Google Таблицу.
 *
 * Сайт отправляет копию каждой заявки сюда до того, как откроется WhatsApp.
 * Установка и обновление: google-apps-script/README.md
 */

/* ===== настройки ===== */
const SHEET_NAME = 'Заявки';
const TIMEZONE = 'Europe/Madrid';
const NOTIFY_EMAIL = 'glibrudakov@gmail.com';   // адрес для письма о каждой новой заявке, например 'gleb@example.com'. Пусто = без писем

/* Колонки таблицы: [ключ из формы, заголовок, ширина в px] */
const COLUMNS = [
  ['received',     'Дата и время',     140],
  ['status',       'Статус',           130],
  ['name',         'Имя',              160],
  ['page',         'Страница',         200],
  ['role',         'Кто',              110],
  ['shoot_type',   'Что снимаем',      150],
  ['package',      'Формат',           200],
  ['value',        'Сумма, €',          90],
  ['location',     'Где объект',       160],
  ['message',      'Сообщение',        320],
  ['lang',         'Язык',              60],
  ['utm_source',   'Источник',         110],
  ['utm_medium',   'Канал',            100],
  ['utm_campaign', 'Кампания',         160],
  ['utm_content',  'Объявление',       160],
  ['utm_term',     'Аудитория / ключ', 140],
  ['device',       'Устройство',       130],
  ['referrer',     'Откуда пришёл',    200],
  ['url',          'Адрес страницы',   240],
  ['lead_id',      'ID заявки',        130],
  ['fbp',          'fbp',              150],
  ['fbc',          'fbc',              150],
  ['comment',      'Комментарий',      260],
];

const STATUSES = ['Новая', 'Связались', 'Квалифицирована', 'Сделка', 'Отказ', 'Спам'];
const STATUS_COLORS = ['#fde2ec', '#fff4cc', '#dbeafe', '#d1fae5', '#e5e7eb', '#e5e7eb'];

/* Коды с сайта → понятные подписи */
const LABELS = {
  page:       { 'main': 'GR Production (главная)', 'real-estate': 'GReat Vision (недвижимость)' },
  role:       { agency: 'Агентство', developer: 'Застройщик', owner: 'Владелец' },
  package:    { one: 'Один ролик · от 650 €', three: 'Три ролика · 1 500 €', six: 'Шесть роликов · 2 500 €', unsure: 'Пока не знаю' },
  shoot_type: { food: 'Кулинария', fashion: 'Фэшн', events: 'Ивенты', love_story: 'Love story', real_estate: 'Недвижимость', business: 'Бизнес и эксперты', other: 'Другое' },
  lang:       { ru: 'RU', en: 'EN', es: 'ES' },
  device:     { mobile: 'Телефон / планшет', desktop: 'Компьютер' },
};
const PACKAGE_VALUE = { one: 650, three: 1500, six: 2500 };

/* ===== приём заявки ===== */
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.company_site) return json_({ ok: true });            // ловушка для ботов
  if (!p.name && !p.message) return json_({ ok: false, error: 'empty' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    if (p.lead_id && isDuplicate_(sh, p.lead_id)) return json_({ ok: true, duplicate: true });

    const row = COLUMNS.map(([key]) => {
      if (key === 'received') return new Date();
      if (key === 'status')   return STATUSES[0];
      if (key === 'value')    return PACKAGE_VALUE[p.package] || '';
      if (key === 'comment')  return '';
      const v = clean_(p[key]);
      return (LABELS[key] && LABELS[key][v]) || v;
    });

    sh.appendRow(row);
    const r = sh.getLastRow();
    sh.getRange(r, 1).setNumberFormat('dd.mm.yyyy HH:mm');
    sh.getRange(r, col_('message')).setWrap(true);

    if (NOTIFY_EMAIL) notify_(row);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* Открыть адрес веб-приложения в браузере: должен показать {"ok":true,...} */
function doGet() {
  return json_({ ok: true, service: 'GR Production leads' });
}

/* ===== запустить один раз вручную: создаёт и оформляет лист ===== */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  const sh = sheet_();
  const header = sh.getRange(1, 1, 1, COLUMNS.length);
  header.setValues([COLUMNS.map(c => c[1])])
        .setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff').setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(3);
  sh.setRowHeight(1, 32);
  COLUMNS.forEach(([, , w], i) => sh.setColumnWidth(i + 1, w));

  // выпадающий список статусов
  const statusCol = sh.getRange(2, col_('status'), sh.getMaxRows() - 1, 1);
  statusCol.setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
  );

  // цвет строки по статусу
  const all = sh.getRange(2, 1, sh.getMaxRows() - 1, COLUMNS.length);
  const letter = columnLetter_(col_('status'));
  const rules = STATUSES.map((s, i) =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${letter}2="${s}"`)
      .setBackground(STATUS_COLORS[i])
      .setRanges([all])
      .build()
  );
  sh.setConditionalFormatRules(rules);

  // фильтр по заголовкам
  if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), COLUMNS.length).createFilter();
}

/* Проверка без сайта: Выполнить → testLead. В таблице появится тестовая строка */
function testLead() {
  doPost({ parameter: {
    lead_id: 'test-' + Date.now(), page: 'real-estate', lang: 'ru', name: 'Тест',
    role: 'agency', package: 'three', location: 'Валенсия', message: 'Тестовая заявка',
    utm_source: 'facebook', device: 'mobile',
  }});
}

/* ===== служебное ===== */
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME, 0);
  if (sh.getLastRow() === 0) sh.appendRow(COLUMNS.map(c => c[1]));
  return sh;
}

function col_(key) {
  return COLUMNS.findIndex(c => c[0] === key) + 1;
}

function columnLetter_(n) {
  let s = '';
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

/* Обрезает длинное и не даёт тексту из формы стать формулой в таблице */
function clean_(v) {
  if (v === undefined || v === null) return '';
  let s = String(v).trim().slice(0, 2000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function isDuplicate_(sh, id) {
  const last = sh.getLastRow();
  if (last < 2) return false;
  const from = Math.max(2, last - 200);
  const ids = sh.getRange(from, col_('lead_id'), last - from + 1, 1).getValues();
  return ids.some(r => r[0] === id);
}

function notify_(row) {
  const get = key => row[col_(key) - 1];
  const lines = COLUMNS
    .filter(([key]) => !['status', 'comment', 'fbp', 'fbc', 'received'].includes(key))
    .map(([key, title]) => [title, get(key)])
    .filter(([, v]) => v !== '' && v !== undefined)
    .map(([t, v]) => `${t}: ${v}`);
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  MailApp.sendEmail(NOTIFY_EMAIL, `Новая заявка с сайта: ${get('name')}`, lines.join('\n') + `\n\nТаблица: ${url}`);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
