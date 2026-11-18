/* GR Production · shared site engine for every page.
   A page sets window.PAGE = { id, base, T:{ru,en,es}, hero:{src,bytes,poster,ending} } before loading this file. */

/* ===== settings shared by all pages ===== */
const SITE = {
  whatsapp: '34695275229', // international format, digits only, e.g. 34600000000
  phone: '+34 695 275 229', // how the number is shown on the site
  telegram: 'gr_production_eu', // Telegram username (t.me/…)
  /* Site languages that are switched on. The Spanish texts stay in the code: add 'es' back here (and the ES button in the pages) to bring it back. */
  langs: ['ru','en'],
  /* Google Apps Script web app URL (see google-apps-script/README.md). Empty = leads go to WhatsApp only. */
  leadsEndpoint: 'https://script.google.com/macros/s/AKfycbya89YpeqR7c74vf4GfUQIfeXYbFmgUZdx1zaO3ZdTtWO6NyaptHpDTPmpT0p5tzCFh/exec',
  /* Data controller shown on the privacy page. Empty email = WhatsApp is shown as the contact. */
  legal: { name: 'Glib Rudakov', email: 'glibrudakov@gmail.com', city: 'Valencia, España' },
  /* Real client quotes only. pages: which pages show it ('main', 'real-estate'). */
  reviews: [
    { name: 'Yarl', role: { ru: 'Недвижимость', en: 'Real estate', es: 'Inmobiliaria' }, orig: 'ru', pages: ['main', 'real-estate'], chat: true, text: {
      ru: 'Вау, Глеб, это реально очень круто. Видно сразу, что поработали профессионалы. Я теперь понял, о каком уровне видео ты говорил! Я уже много раз пересмотрел и наслаждаюсь. Реально хочется сотрудничать с такими профессионалами.\n\nВот это мне зашло больше всего. Реально видно, что работали профессионалы и не за один вечер сделано.',
      en: 'Wow, Glib, this is really great. You can see right away that professionals made it. Now I understand what level of video you were talking about! I have rewatched it many times and I enjoy it. It really makes me want to work with professionals like this.\n\nThis one I liked the most. You can really see professionals worked on it, and it was not made in one evening.',
      es: 'Glib, de verdad, esto está genial. Se ve enseguida que lo han hecho profesionales. ¡Ahora entiendo de qué nivel de vídeo hablabas! Ya lo he visto muchas veces y lo disfruto. Dan ganas de colaborar con profesionales así.\n\nEste es el que más me ha gustado. Se nota que han trabajado profesionales y que no se hizo en una tarde.'
    }
    },
    { name: 'SHAURMA.ETS', role: { ru: 'Стритфуд', en: 'Street food', es: 'Street food' }, orig: 'ru', pages: ['main'], chat: true, text: {
      ru: 'Мне кажется круче только Майкл Джексон\n\nПерестань делать очень качественные видео',
      en: 'I think only Michael Jackson is cooler\n\nStop making such high-quality videos',
      es: 'Creo que solo Michael Jackson es más top\n\nDeja de hacer vídeos tan buenos'
    } }
  ]
};

/* ===== copy shared by all pages (a page's own T overrides any key) ===== */
const SHARED = {
ru:{skip:"К содержанию",photo_tag:"GLIB · DOP",rev_k:"Отзывы",rev_h:"Что говорят клиенты.",rev_tr:"Перевод с русского",
q_next:"Дальше",q_back:"Назад",q_opt:"по желанию",q_pick:"Выберите вариант",q_fill:"Заполните это поле",q_when:"Когда нужна съёмка?",w1:"В ближайшие 1–2 недели",w2:"В этом месяце",w3:"Через 1–3 месяца",f_phone:"Номер WhatsApp",f_phone_ph:"+34 600 000 000",ph_empty:"Укажите номер, чтобы Глиб мог ответить",ph_cc:"Добавьте код страны, например +34",ph_long:"В номере лишние цифры — проверьте",ph_short:"Номер слишком короткий — проверьте",ph_es:"Испанские номера начинаются с 6, 7, 8 или 9",f_name:"Имя",f_name_ph:"Как к вам обращаться",f_msg:"Пара слов о проекте",f_note:"Без спама. Отвечаю лично.",f_btn:"Отправить в WhatsApp",
f_ok:"Открываем WhatsApp с вашей заявкой. Если окно не открылось, проверьте блокировщик всплывающих окон.",f_err:"Напишите, как к вам обращаться.",
wa_name:"Имя",wa_page:"Страница",lb_close:"Закрыть",play:"смотреть со звуком",
ck_text:"Мы используем cookie Meta и Microsoft Clarity, чтобы понимать, как работает сайт, и показывать рекламу. Они включатся, только если вы согласитесь.",ck_more:"Подробнее",ck_accept:"Принять",ck_reject:"Только необходимые",ck_settings:"Настройки cookie",ck_label:"Согласие на cookie",
privacy:"Политика конфиденциальности",ct_direct:"Или напишите напрямую:",u_mln:" млн",rec2_hint:"Нажмите REC, чтобы включить работы",rec2_live:"Идёт запись. Нажмите на ролик, чтобы смотреть со звуком.",rec2_sr:"Включить запись: оживить работы",f_privacy:"Отправляя заявку, вы соглашаетесь с",f_privacy_link:"политикой конфиденциальности"},
en:{skip:"Skip to content",photo_tag:"GLIB · DOP",rev_k:"Reviews",rev_h:"What clients say.",rev_tr:"Translated from Russian",
q_next:"Next",q_back:"Back",q_opt:"optional",q_pick:"Choose an option",q_fill:"Please fill this in",q_when:"When do you need the shoot?",w1:"In the next 1–2 weeks",w2:"This month",w3:"In 1–3 months",f_phone:"WhatsApp number",f_phone_ph:"+34 600 000 000",ph_empty:"Add your number so Glib can reply",ph_cc:"Add the country code, e.g. +34",ph_long:"Too many digits — please check",ph_short:"The number is too short — please check",ph_es:"Spanish numbers start with 6, 7, 8 or 9",f_name:"Name",f_name_ph:"What should I call you",f_msg:"A few words about the project",f_note:"No spam. I reply personally.",f_btn:"Send via WhatsApp",
f_ok:"Opening WhatsApp with your request. If nothing opened, check your pop-up blocker.",f_err:"Please tell me your name.",
wa_name:"Name",wa_page:"Page",lb_close:"Close",play:"watch with sound",
ck_text:"We use Meta and Microsoft Clarity cookies to understand how the site works and to show ads. They are switched on only if you agree.",ck_more:"Learn more",ck_accept:"Accept",ck_reject:"Only necessary",ck_settings:"Cookie settings",ck_label:"Cookie consent",
privacy:"Privacy policy",ct_direct:"Or reach me directly:",u_mln:"M",rec2_hint:"Press REC to bring the work to life",rec2_live:"Recording. Tap a film to watch it with sound.",rec2_sr:"Start recording: bring the work to life",f_privacy:"By sending the request you agree to the",f_privacy_link:"privacy policy"},
es:{skip:"Ir al contenido",photo_tag:"GLIB · DOP",rev_k:"Opiniones",rev_h:"Lo que dicen los clientes.",rev_tr:"Traducido del ruso",
q_next:"Siguiente",q_back:"Atrás",q_opt:"opcional",q_pick:"Elige una opción",q_fill:"Rellena este campo",q_when:"¿Cuándo necesitas el rodaje?",w1:"En 1–2 semanas",w2:"Este mes",w3:"En 1–3 meses",f_phone:"Número de WhatsApp",f_phone_ph:"+34 600 000 000",ph_empty:"Añade tu número para que Glib pueda responder",ph_cc:"Añade el prefijo del país, p. ej. +34",ph_long:"Sobran dígitos, revisa el número",ph_short:"El número es demasiado corto",ph_es:"Los números españoles empiezan por 6, 7, 8 o 9",f_name:"Nombre",f_name_ph:"¿Cómo te llamas?",f_msg:"Unas palabras sobre el proyecto",f_note:"Sin spam. Respondo personalmente.",f_btn:"Enviar por WhatsApp",
f_ok:"Abriendo WhatsApp con tu solicitud. Si no se abre, revisa el bloqueador de ventanas.",f_err:"Dime cómo te llamas.",
wa_name:"Nombre",wa_page:"Página",lb_close:"Cerrar",play:"ver con sonido",
ck_text:"Usamos cookies de Meta y Microsoft Clarity para entender cómo funciona la web y mostrar publicidad. Solo se activan si las aceptas.",ck_more:"Más información",ck_accept:"Aceptar",ck_reject:"Solo necesarias",ck_settings:"Configuración de cookies",ck_label:"Consentimiento de cookies",
privacy:"Política de privacidad",ct_direct:"O escríbeme directamente:",u_mln:" M",rec2_hint:"Pulsa REC para dar vida a los trabajos",rec2_live:"Grabando. Pulsa un vídeo para verlo con sonido.",rec2_sr:"Empezar a grabar: dar vida a los trabajos",f_privacy:"Al enviar la solicitud aceptas la",f_privacy_link:"política de privacidad"}
};

(function(){
const PAGE = window.PAGE || {T:{ru:{},en:{},es:{}}};
const BASE = PAGE.base || 'assets/';
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
const RM = matchMedia('(prefers-reduced-motion: reduce)');
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let LANG='ru';
const t=k=>{const p=PAGE.T[LANG]||{};return p[k]!=null?p[k]:(SHARED[LANG]||{})[k]};
const hooks=[];

/* ---------- tracking: Meta Pixel + Microsoft Clarity ----------
   track(name, params) sends a standard Meta event if the name is one, otherwise a custom event,
   and mirrors the event name to Clarity. Exposed as window.grTrack for future buttons.
   Automatic: any click on a WhatsApp / phone / email / Instagram / Telegram link = Contact;
   any element with data-track="EventName" (optional data-track-label) is tracked on click. */
const STD_EVENTS=['Lead','Contact','ViewContent','Schedule','SubmitApplication','CompleteRegistration','InitiateCheckout','AddToCart','Search','FindLocation','CustomizeProduct'];
function track(name,params,opts){
  /* Clarity always gets the event (cookieless until consent); Meta Pixel only with cookie consent */
  try{if(window.clarity)clarity('event',name)}catch(e){}
  if(store.get('gr-consent')!=='all')return;
  const p=Object.assign({page:PAGE.id||'main',lang:LANG},params||{});
  /* opts.eventID lets the same event be deduplicated later if it is also sent server-side (Conversions API) */
  try{if(window.fbq)(STD_EVENTS.includes(name)?fbq('track',name,p,opts||{}):fbq('trackCustom',name,p,opts||{}))}catch(e){}
}
window.grTrack=track;
try{if(window.clarity)clarity('set','page',PAGE.id||'main')}catch(e){}
const label=el=>(el.dataset.trackLabel||el.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
const contactMethod=href=>/wa\.me|whatsapp/i.test(href)?'whatsapp':/^tel:/i.test(href)?'phone':/^mailto:/i.test(href)?'email':/instagram\.com/i.test(href)?'instagram':/t\.me\//i.test(href)?'telegram':'';
document.addEventListener('click',e=>{
  const el=e.target.closest('a,button,[data-track]');if(!el)return;
  if(el.dataset.track){track(el.dataset.track,{label:label(el)});return}
  const href=el.getAttribute('href')||'';
  const method=contactMethod(href);
  if(method){track('Contact',{method,label:label(el)});return}
  if(href==='#contact'){const place=el.closest('.nav')?'nav':el.closest('.mbar')?'sticky_bar':el.closest('#hero')?'hero':((el.closest('section')||{}).id||'other');track('CTAClick',{label:label(el),place});return}
  if(/real-estate\//.test(href))track('OpenRealEstatePage',{label:label(el)});
},true);

/* ---------- i18n ---------- */
function rng(seed){let s=seed>>>0;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296}
function splitInto(el,text){
  el.textContent='';
  const sr=document.createElement('span');sr.className='sr';sr.textContent=text;el.appendChild(sr);
  const vis=document.createElement('span');vis.setAttribute('aria-hidden','true');
  const words=text.split(' ');const r=rng(text.length*7+3);
  words.forEach((w,i)=>{const s=document.createElement('span');s.className='w';s.textContent=w;s.style.setProperty('--th',(i/words.length*.45+r()*.05).toFixed(3));vis.appendChild(s);if(i<words.length-1)vis.appendChild(document.createTextNode(' '))});
  el.appendChild(vis);
}
function setLang(l){
  if(!SITE.langs.includes(l)) l=(l==='es'&&SITE.langs.includes('en'))?'en':'ru';
  if(!PAGE.T[l]) l='ru'; LANG=l;
  document.documentElement.lang=l; if(t('title')) document.title=t('title');
  $$('[data-i18n]').forEach(e=>{const v=t(e.dataset.i18n);if(v!=null)e.textContent=v});
  $$('[data-i18n-html]').forEach(e=>{const v=t(e.dataset.i18nHtml);if(v!=null)e.innerHTML=v});
  $$('[data-i18n-ph]').forEach(e=>{const v=t(e.dataset.i18nPh);if(v!=null)e.placeholder=v});
  $$('[data-split]').forEach(e=>{const v=t(e.dataset.split);if(v!=null)splitInto(e,v)});
  $$('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
  store.set('gr-lang',l);
  hooks.forEach(f=>{try{f(l)}catch(e){}});
}
$$('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));

/* ---------- nav ---------- */
const nav=$('#nav');let navSolid=false;
function navCheck(){const s=scrollY>(innerWidth<=900?40:innerHeight*.6); /* phones: solid header as soon as the hero strip slides under it */if(s!==navSolid){navSolid=s;nav&&nav.classList.toggle('solid',s)}}
addEventListener('scroll',navCheck,{passive:true});requestAnimationFrame(navCheck);

/* ---------- reveals ---------- */
const rvObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvObs.unobserve(e.target);setTimeout(()=>e.target.classList.add('done'),1500)}}),{rootMargin:'0px 0px -12% 0px'});
$$('.rv').forEach(el=>rvObs.observe(el));

/* ---------- counters ---------- */
/* data-count = final number; data-decimals = digits shown while counting (0.4 → 1.3 → 2 instead of 0 → 1 → 2);
   data-suffix = fixed suffix, data-suffix-key = translated suffix (e.g. " млн" / "M") */
const cSuf=el=>el.dataset.suffixKey?t(el.dataset.suffixKey):(el.dataset.suffix||'');
const cFmt=(v,dec)=>dec?v.toFixed(dec).replace('.',LANG==='ru'?',':'.'):String(Math.round(v));
function runCount(el){const to=+el.dataset.count,dec=+(el.dataset.decimals||0);const end=()=>{el.textContent=to+cSuf(el);el.dataset.done='1'};if(RM.matches){end();return}const t0=performance.now(),D=1600;(function f(n){const k=clamp((n-t0)/D,0,1),e=1-Math.pow(1-k,3);if(k<1){el.textContent=cFmt(to*e,dec)+cSuf(el);requestAnimationFrame(f)}else end()})(t0)}
hooks.push(()=>$$('[data-count][data-done]').forEach(el=>{el.textContent=el.dataset.count+cSuf(el)}));
const cObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cObs.unobserve(e.target);runCount(e.target)}),{threshold:.6});
$$('[data-count]').forEach(el=>cObs.observe(el));

/* ---------- hero scrub ---------- */
const hero=$('#hero'),stage=$('#stage'),video=$('#herov');
let heroApi=null;
if(hero&&stage&&video&&PAGE.hero){
  const H=PAGE.hero, frame=$('#frame'), poster=$('#poster'), tcEl=$('#tc'), cue=$('#cue'), ringP=$('#ringp');
  /* absolute URL: a relative url() inside a CSS variable resolves against site.css, not the page (broke the main page on mobile) */
  stage.style.setProperty('--ending',`url('${new URL(H.ending,location.href).href}')`);
  const bands=$$('.band').map((el,i,a)=>({el,a:+el.dataset.a,b:+el.dataset.b,first:i===0,last:i===a.length-1,op:-1,k:-1}));
  const smooth=(p,e0,e1)=>{const x=clamp((p-e0)/(e1-e0),0,1);return x*x*(3-2*x)};
  let scrubOn=false,target=0,shown=0,rafId=null,lastTick=0,heroOnScreen=true,seekBusy=false,pendingTime=null,loadK=0,loadStart=performance.now();
  let lastTc='',lastTcAt=0,lastFs=-1,lastP=-1;
  const heroProgress=()=>{const r=hero.getBoundingClientRect();const range=hero.offsetHeight-innerHeight;return range>0?clamp(-r.top/range,0,1):0};
  function requestSeek(x){if(!video.duration||!isFinite(x))return;if(seekBusy){pendingTime=x;return}seekBusy=true;video.currentTime=x}
  video.addEventListener('seeked',()=>{seekBusy=false;if(pendingTime!==null){const x=pendingTime;pendingTime=null;requestSeek(x)}});
  video.addEventListener('error',()=>{seekBusy=false;pendingTime=null;failVideo()});
  const fmtTc=sec=>{const f=Math.floor((sec%1)*25),s=Math.floor(sec)%60,m=Math.floor(sec/60);return '00:'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+':'+String(f).padStart(2,'0')};
  function updateCaptions(p,now){
    loadK=clamp((now-loadStart)/1400,0,1);loadK=loadK*loadK*(3-2*loadK);
    for(const b of bands){
      const f=Math.min(0.02,(b.b-b.a)/3);
      let op=(b.first?1:smooth(p,b.a,b.a+f))*(b.last?1:1-smooth(p,b.b-f,b.b));op=Math.round(op*1000)/1000;
      let k=clamp((p-b.a)/Math.min(0.06,(b.b-b.a)*.35),0,1);if(b.first)k=Math.max(k,loadK);k=Math.round(k*1000)/1000;
      if(op!==b.op){b.op=op;b.el.style.opacity=op;b.el.classList.toggle('on',op>.5)}
      if(Math.abs(k-b.k)>=.008||(k===1&&b.k!==1)||(k===0&&b.k!==0)){b.k=k;b.el.style.setProperty('--k',k)}
    }
    const fs=Math.round((1+p*.05)*1000)/1000;if(fs!==lastFs){lastFs=fs;frame.style.setProperty('--fs',fs)}
    const pp=Math.round(p*100)/100;if(pp!==lastP){lastP=pp;cue&&cue.style.setProperty('--p',pp)}
    if(now-lastTcAt>100){const s=fmtTc(p*(video.duration||H.duration||10));if(s!==lastTc){lastTc=s;lastTcAt=now;tcEl.textContent=s}}
  }
  function tick(now){
    const dt=Math.min(100,now-(lastTick||now));lastTick=now;
    shown+=(target-shown)*(1-Math.pow(1-.16,dt/16.667));
    if(Math.abs(target-shown)<.0005&&loadK>=1){shown=target;rafId=null;lastTick=0}else rafId=requestAnimationFrame(tick);
    if(video.duration) requestSeek(shown*video.duration);
    updateCaptions(shown,now);
  }
  function onScroll(){if(!scrubOn)return;target=heroProgress();if(rafId===null&&heroOnScreen)rafId=requestAnimationFrame(tick)}
  new IntersectionObserver(es=>{heroOnScreen=es[0].isIntersecting;if(heroOnScreen)onScroll()}).observe(hero);
  let inited=false;
  function initHeroOnce(){
    if(inited)return;inited=true;poster.style.backgroundImage=`url('${H.poster}')`;
    let started=false;const go=()=>{if(started)return;started=true;loadHeroBlob().catch(failVideo)};
    const im=new Image();im.onload=go;im.onerror=go;im.src=H.poster;setTimeout(go,4000);
  }
  async function loadHeroBlob(){
    const ctrl=new AbortController();let wd=setTimeout(()=>ctrl.abort(),20000);
    const res=await fetch(H.src,{priority:'low',signal:ctrl.signal});if(!res.ok)throw new Error('video '+res.status);
    const total=Number(res.headers.get('Content-Length'))||H.bytes;const reader=res.body.getReader();const chunks=[];let got=0,last=0;
    for(;;){const {done,value}=await reader.read();if(done)break;clearTimeout(wd);wd=setTimeout(()=>ctrl.abort(),20000);chunks.push(value);got+=value.length;const fr=Math.min(1,got/total);const n=performance.now();if(n-last>100||fr===1){last=n;ringP&&ringP.style.setProperty('--ld',Math.round(126*(1-fr)))}}
    clearTimeout(wd);ringP&&ringP.style.setProperty('--ld',0);
    video.src=URL.createObjectURL(new Blob(chunks,{type:'video/mp4'}));video.load();
    video.addEventListener('canplay',()=>{requestSeek(heroProgress()*video.duration);stage.classList.add('video-ready')},{once:true});
  }
  function failVideo(){stage.classList.add('video-failed');video.style.display='none';poster.style.backgroundImage=`url('${H.ending}')`}
  const GATES=['(max-width: 720px)','(orientation: portrait) and (max-width: 1024px)','(orientation: portrait) and (pointer: coarse)','(orientation: landscape) and (pointer: coarse) and (max-height: 560px)','(prefers-reduced-motion: reduce)'];
  const MQLS=GATES.map(q=>matchMedia(q));
  function enableScrub(){if(scrubOn)return;scrubOn=true;initHeroOnce();addEventListener('scroll',onScroll,{passive:true});bands.forEach(b=>{b.op=-1;b.k=-1;b.el.style.opacity='';b.el.style.removeProperty('--k')});loadStart=performance.now();updateCaptions(heroProgress(),performance.now());onScroll()}
  function disableScrub(){if(!scrubOn)return;scrubOn=false;removeEventListener('scroll',onScroll);if(rafId!==null){cancelAnimationFrame(rafId);rafId=null}bands.forEach(b=>{b.el.style.opacity='';b.el.style.setProperty('--k',1)})}
  const apply=()=>{if(MQLS.some(m=>m.matches))disableScrub();else enableScrub()};
  MQLS.forEach(m=>m.addEventListener('change',apply));
  heroApi={apply};
}

/* ---------- reels: lazy, play in view, language versions ---------- */
const saveData=navigator.connection&&navigator.connection.saveData;
const reels=$$('.reel');
const srcOf=r=>(LANG!=='ru'&&r.dataset.vEn)?r.dataset.vEn:r.dataset.v;
reels.forEach(r=>{r.querySelector('.screen').style.backgroundImage=`url('${BASE}v/${r.dataset.v}.jpg')`});
/* autoplay previews only on desktop with a mouse: on phones and tablets each reel is 4-15 MB,
   so they show the cover and load the video only when tapped (7.10) */
const canHover=matchMedia('(hover: hover) and (pointer: fine)');
const autoplayOK=()=>!RM.matches&&!saveData&&canHover.matches;
const rObs=new IntersectionObserver(es=>es.forEach(e=>{
  const r=e.target;
  if(e.isIntersecting&&e.intersectionRatio>.35){
    if(!autoplayOK()||r.closest('.rec-standby'))return; /* works stay still until REC */
    let v=r.querySelector('video');
    if(!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.setAttribute('aria-hidden','true');v.tabIndex=-1;v.src=`${BASE}v/${srcOf(r)}.mp4`;v.dataset.cur=srcOf(r);r.querySelector('.screen').appendChild(v);v.addEventListener('playing',()=>r.classList.add('playing'))}
    v.play().catch(()=>{});
  }else{const v=r.querySelector('video');if(v)v.pause()}
}),{threshold:[0,.35,.6]});
reels.forEach(r=>rObs.observe(r));
hooks.push(()=>{reels.forEach(r=>{r.setAttribute('aria-label',(r.dataset.title||r.dataset.v)+': '+t('play'));const v=r.querySelector('video');if(v&&r.dataset.vEn&&v.dataset.cur!==srcOf(r)){const was=!v.paused;v.dataset.cur=srcOf(r);r.classList.remove('playing');v.src=`${BASE}v/${srcOf(r)}.mp4`;if(was)v.play().catch(()=>{})}})});

/* ---------- lightbox ---------- */
const lb=$('#lb'),lbv=$('#lbv');let lastFocus=null;
const lbBox=lb&&lb.querySelector('.box');
const isH=name=>!!document.querySelector(`[data-v="${name}"][data-orient="h"],[data-v-en="${name}"][data-orient="h"]`);
if(lbv)lbv.addEventListener('loadedmetadata',()=>{if(lbBox&&lbv.videoWidth)lbBox.classList.toggle('h',lbv.videoWidth>lbv.videoHeight)});
function openLb(name){if(!lb)return;lastFocus=document.activeElement;if(lbBox)lbBox.classList.toggle('h',isH(name));lbv.src=`${BASE}v/${name}.mp4`;lbv.muted=false;lbv.volume=1;lb.classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>{const c=$('#lbclose');c&&c.focus({preventScroll:true})},30);reels.forEach(r=>{const v=r.querySelector('video');if(v)v.pause()});lbv.play().catch(()=>{});$('#lbclose').focus()}
function closeLb(){lb.classList.remove('open');lbv.pause();lbv.removeAttribute('src');lbv.load();document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
reels.forEach(r=>r.addEventListener('click',()=>{openLb(srcOf(r));track('ViewContent',{content_type:'video',content_name:r.dataset.title||r.dataset.v,content_ids:[r.dataset.v]})}));
/* ---------- hero wall (variant A) ---------- */
const hw=$('#hero.hwall');
if(hw){
  const hreels=$$('.hw-reel',hw), wall=$('#hwwall'), strip=$('#hwstrip'), rot=$('#hwrot');
  let onScreen=true;
  const wallVisible=()=>wall&&getComputedStyle(wall).display!=='none';
  // desktop: light 5 s loops, only while the hero is on screen
  // desktop: light 5 s loops, created lazily and played only while that tile is actually on screen
  const vis=new Set();
  function tile(r,go){
    let v=r.querySelector('video');
    if(go&&!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.setAttribute('aria-hidden','true');v.tabIndex=-1;v.src=`${BASE}h/${r.dataset.h||r.dataset.v}.mp4`;v.addEventListener('playing',()=>r.classList.add('playing'));r.querySelector('.hw-scr').appendChild(v)}
    if(!v)return; if(go)v.play().catch(()=>{}); else v.pause();
  }
  function syncVideos(){const ok=onScreen&&autoplayOK()&&wallVisible();$$('.hw-reel',wall||hw).forEach(r=>tile(r,ok&&vis.has(r)))}
  const tObs=new IntersectionObserver(es=>{es.forEach(e=>{e.isIntersecting?vis.add(e.target):vis.delete(e.target);tile(e.target,e.isIntersecting&&onScreen&&autoplayOK()&&wallVisible())})},{rootMargin:'120px 0px'});
  if(wall)$$('.hw-reel',wall).forEach(r=>tObs.observe(r));
  new IntersectionObserver(es=>{onScreen=es[0].isIntersecting;hw.classList.toggle('paused',!onScreen);syncVideos()}).observe(hw);
  canHover.addEventListener('change',syncVideos);RM.addEventListener('change',syncVideos);addEventListener('resize',()=>syncVideos(),{passive:true});
  // click a reel → full film with sound
  hreels.forEach(r=>r.addEventListener('click',()=>{openLb(srcOf(r));track('ViewContent',{content_type:'video',content_name:r.dataset.title||r.dataset.v,content_ids:[r.dataset.v],place:'hero'})}));
  // phones: self-moving strip that the visitor can also swipe.
  // Motion is a sub-pixel transform on the track (smooth at 60/120 Hz); a swipe hands the offset over to native scrolling.
  if(strip){
    const strk=$('.hw-strack',strip);
    let pausedUntil=0,interacted=false,x=0,last=0,touching=false;
    const commit=()=>{if(x){const sl=strip.scrollLeft+x;strk.style.transform='';x=0;strip.scrollLeft=sl}};
    const hold=()=>{commit();pausedUntil=performance.now()+2600};
    strip.addEventListener('touchstart',()=>{touching=true;hold()},{passive:true});
    strip.addEventListener('touchend',()=>{touching=false;pausedUntil=performance.now()+2600},{passive:true});
    strip.addEventListener('pointerdown',hold);strip.addEventListener('wheel',hold,{passive:true});
    strip.addEventListener('scroll',()=>{if(performance.now()<pausedUntil||touching){if(!interacted){interacted=true;track('HeroStripSwipe')}const half=strip.scrollWidth/2;if(!touching&&strip.scrollLeft>=half)strip.scrollLeft-=half}},{passive:true});
    const step=now=>{
      requestAnimationFrame(step);
      const dt=Math.min(40,now-(last||now));last=now;
      if(!onScreen||RM.matches||touching||now<pausedUntil||getComputedStyle(strip).display==='none')return;
      const half=strip.scrollWidth/2;if(!half)return;
      x+=dt*0.032;
      if(strip.scrollLeft+x>=half){if(strip.scrollLeft>=half)strip.scrollLeft-=half;else x-=half}
      strk.style.transform=`translate3d(${-x}px,0,0)`;
    };
    requestAnimationFrame(step);
  }
  // rotating accent line (texts from the old scroll captions)
  if(rot){
    const keys=(rot.dataset.rot||'h2_big,h3_big,h4_big').split(',');let i=0;
    /* start rotating only after the first user action: a text swap before that would be counted as a late LCP */
    let rotGo=false;const goRot=()=>{rotGo=true;['scroll','pointermove','touchstart','keydown','wheel'].forEach(e=>removeEventListener(e,goRot))};['scroll','pointermove','touchstart','keydown','wheel'].forEach(e=>addEventListener(e,goRot,{passive:true}));
    setInterval(()=>{
      if(!rotGo||!onScreen||RM.matches||document.hidden)return;
      rot.classList.add('out');
      setTimeout(()=>{i=(i+1)%keys.length;rot.dataset.i18n=keys[i];rot.textContent=t(keys[i]);rot.classList.remove('out')},450);
    },3400);
  }
}
if(lb){$('#lbclose').addEventListener('click',closeLb);lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();else if(e.key==='Tab'){const f=[$('#lbclose'),lbv].filter(Boolean);const i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?f.length-1:1))%f.length].focus()}})}

/* ---------- rail ---------- */
const rail=$('#rail');
if(rail){const step=()=>rail.querySelector('.item').offsetWidth+20;
  $('#prev').addEventListener('click',()=>rail.scrollBy({left:-step()*2,behavior:RM.matches?'auto':'smooth'}));
  $('#next').addEventListener('click',()=>rail.scrollBy({left:step()*2,behavior:RM.matches?'auto':'smooth'}))}

/* ---------- "in the edit" timecode ---------- */
const cutting=$('#cutting');
if(cutting){const tc2=$('#tc2');let on=false,last='',lt=0;
  const fmt=sec=>{const f=Math.floor((sec%1)*25),s=Math.floor(sec)%60,m=Math.floor(sec/60)%60;return '00:'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+':'+String(f).padStart(2,'0')};
  const tick=n=>{if(!on)return;if(n-lt>80){const s=fmt(n/1000);if(s!==last){last=s;lt=n;tc2.textContent=s}}requestAnimationFrame(tick)};
  new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on&&!RM.matches)requestAnimationFrame(tick)}).observe(cutting);
  const setCw=()=>cutting.style.setProperty('--cw',cutting.offsetWidth+'px');setCw();addEventListener('resize',setCw)}

/* ---------- divider dot ---------- */
const catLine=$('.cat-line');
if(catLine){const dot=catLine.querySelector('i');let dl=-1;const up=()=>{const r=catLine.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(innerHeight*.9),0,1);const x=Math.round(p*(r.width-7));if(x!==dl){dl=x;dot.style.setProperty('--x',x+'px')}};addEventListener('scroll',up,{passive:true});up()}

/* ---------- REC brings the work to life ----------
   The works section starts in "standby": covers muted, no autoplay. It goes "live" when the visitor presses REC
   (a tap, or a short 0.7 s hold), taps any reel, keeps the first reels on screen for 1.8 s, or scrolls past the button.
   Live = covers regain colour one by one, previews start on desktop, a timecode runs. Tracked as RecStart {method}. */
const work=$('#work'), recgo=$('#recgo');let recApi=null;
if(work&&recgo){
  const state=$('#recstate'),tcEl=$('#rectc'),hint=$('#rechint'),cue=$('#reccue');
  const wreels=$$('.reel',work);wreels.forEach((r,i)=>r.style.setProperty('--d',(Math.min(i,8)*90)+'ms'));
  let live=false,h=0,holding=false,raf=null,last=0,t0=0,autoTimer=null,tcOn=false;const HOLD=700;
  work.classList.add('rec-standby');
  const setHint=()=>{hint.textContent=t(live?'rec2_live':'rec2_hint')};hooks.push(setHint);
  function runTc(){if(RM.matches)return;const step=n=>{if(!tcOn||!live)return;const s=(n-t0)/1000,f=Math.floor((s%1)*25);tcEl.textContent='00:'+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(Math.floor(s)%60).padStart(2,'0')+':'+String(f).padStart(2,'0');requestAnimationFrame(step)};requestAnimationFrame(step)}
  function activate(method){
    if(live)return;live=true;holding=false;h=1;clearTimeout(autoTimer);
    recgo.style.setProperty('--h',1);recgo.setAttribute('aria-pressed','true');
    work.classList.remove('rec-standby');work.classList.add('rec-live');state.textContent='REC';setHint();
    t0=performance.now();runTc();
    wreels.forEach(r=>{rObs.unobserve(r);rObs.observe(r)}); /* re-check which previews should play now */
    track('RecStart',{method});
  }
  function tick(now){
    const dt=Math.min(64,now-(last||now));last=now;
    if(holding)h=Math.min(1,h+dt/HOLD);else if(!live)h=Math.max(0,h-dt/300);
    recgo.style.setProperty('--h',Math.round(h*1000)/1000);
    if(h>=1&&!live)activate('hold');
    if(!live&&(holding||h>0))raf=requestAnimationFrame(tick);else{raf=null;last=0}
  }
  recgo.addEventListener('pointerdown',()=>{if(live)return;holding=true;if(!raf)raf=requestAnimationFrame(tick)});
  recgo.addEventListener('pointerup',()=>{if(!live&&holding)activate('tap')}); /* released before the ring fills = a tap, still counts */
  ['pointerleave','pointercancel'].forEach(x=>recgo.addEventListener(x,()=>{holding=false}));
  recgo.addEventListener('click',()=>activate('tap')); /* keyboard Enter/Space and any other click */
  recgo.addEventListener('contextmenu',e=>e.preventDefault());
  work.addEventListener('click',e=>{if(e.target.closest('.reel'))activate('reel')},true);
  new IntersectionObserver(es=>{tcOn=es[0].isIntersecting;if(tcOn&&live)runTc()}).observe(recgo);
  /* auto-start: any reel at least half on screen for 1.8 s without a press */
  const seenNow=new Set();
  const autoObs=new IntersectionObserver(es=>{if(live)return;es.forEach(e=>e.intersectionRatio>=.5?seenNow.add(e.target):seenNow.delete(e.target));
    if(seenNow.size){if(!autoTimer)autoTimer=setTimeout(()=>activate('auto'),1800)}else{clearTimeout(autoTimer);autoTimer=null}},{threshold:[0,.5]});
  wreels.forEach(r=>autoObs.observe(r));
  /* ...or the visitor is already well past the button (more than a screen and a half below it) */
  if(cue)addEventListener('scroll',function past(){if(live){removeEventListener('scroll',past);return}if(cue.getBoundingClientRect().bottom<-innerHeight*1.5)activate('auto')},{passive:true});
  recApi={activate};
}

/* ---------- reviews ---------- */
const revSec=$('#reviews');
if(revSec){
  const list=SITE.reviews.filter(r=>r.pages.includes(PAGE.id));
  if(!list.length) revSec.hidden=true;
  else hooks.push(()=>{const box=$('#quotes');box.textContent='';list.forEach(r=>{
    const fig=document.createElement('figure');fig.className='quote';
    const txt=r.text[LANG]||r.text[r.orig];
    if(r.chat){fig.classList.add('chat');txt.split(/\n\n+/).forEach(m=>{const p=document.createElement('p');p.className='bubble';p.textContent=m;fig.appendChild(p)})}
    else{const p=document.createElement('p');p.textContent=txt;fig.appendChild(p)}
    const who=document.createElement('figcaption');who.className='who';
    const b=document.createElement('b');b.textContent=r.name;who.appendChild(b);
    const s=document.createElement('span');s.className='mono';s.textContent=(r.role&&(r.role[LANG]||r.role.ru))||'';who.appendChild(s);
    if(LANG!==r.orig&&r.text[LANG]){const tr=document.createElement('span');tr.className='tr';tr.textContent=t('rev_tr');who.appendChild(tr)}
    fig.appendChild(who);box.appendChild(fig)});
    /* phones: the cards become a swipe carousel with dots (only when there is more than one) */
    let dots=revSec.querySelector('.qdots');if(dots)dots.remove();
    if(list.length>1){
      dots=document.createElement('div');dots.className='qdots';dots.setAttribute('aria-hidden','true');
      list.forEach((_,i)=>{const d=document.createElement('i');if(!i)d.className='on';dots.appendChild(d)});
      box.after(dots);
    }});
  const qbox=$('#quotes');let swiped=false;
  qbox&&qbox.addEventListener('scroll',()=>{
    const cards=[...qbox.children];if(!cards.length)return;
    const i=Math.round(qbox.scrollLeft/(cards[0].offsetWidth+12));
    $$('.qdots i',revSec).forEach((d,k)=>d.classList.toggle('on',k===i));
    if(!swiped&&qbox.scrollLeft>20){swiped=true;track('ReviewsSwipe')}
  },{passive:true});
}

/* ---------- package buttons fill the form ---------- */
const PACK_PRICE={one:650,three:1500,six:2500};
$$('[data-pick]').forEach(b=>b.addEventListener('click',()=>{track('SelectPackage',{package:b.dataset.pick,value:PACK_PRICE[b.dataset.pick]||0,currency:'EUR'});const sel=$('#form [name=package]');if(sel)sel.value=b.dataset.pick;const c=$('#contact');c&&c.scrollIntoView({behavior:RM.matches?'auto':'smooth'});setTimeout(()=>{if(quizApi)quizApi.focusFirst();else{const n=$('#form [name=name]');n&&n.focus({preventScroll:true})}},RM.matches?0:700)}));

/* ---------- lead log: a copy of every request goes to the Google Sheet before WhatsApp opens ----------
   sendBeacon survives the page switching to WhatsApp; the urlencoded body needs no CORS preflight. */
function sendLead(d){
  if(!SITE.leadsEndpoint)return;
  const body=new URLSearchParams();Object.entries(d).forEach(([k,v])=>{if(v!=null&&v!=='')body.append(k,String(v))});
  try{if(navigator.sendBeacon&&navigator.sendBeacon(SITE.leadsEndpoint,new Blob([body.toString()],{type:'application/x-www-form-urlencoded'})))return}catch(e){}
  try{fetch(SITE.leadsEndpoint,{method:'POST',mode:'no-cors',keepalive:true,body})}catch(e){}
}
const cookie=n=>{const m=document.cookie.match('(?:^|; )'+n+'=([^;]*)');return m?decodeURIComponent(m[1]):''};

/* ---------- quiz form: 3 steps, progress, validation, phone check ----------
   Markup: form#form.quiz > .qstep[data-step]; fieldset[data-req] = pick one; [data-auto] = go on after a pick;
   [data-if="field=a,b"] = shown only for those answers. Each step reached is tracked (QuizStep2, QuizStep3). */
/* national number length by country code; anything else: 8–15 digits */
const PH_CC={'34':[9],'380':[9],'7':[10],'375':[9],'998':[9],'996':[9],'992':[9],'993':[8],'994':[9],'995':[9],'374':[8],'373':[8],'370':[8],'371':[8],'372':[7,8],
  '44':[10],'48':[9],'49':[10,11],'33':[9],'39':[9,10],'351':[9],'31':[9],'32':[8,9],'41':[9],'43':[10,11,12],'40':[9],'420':[9],'36':[8,9],'30':[10],'353':[9],'46':[9],'47':[8],'45':[8],'358':[9,10],
  '1':[10],'972':[8,9],'90':[10],'971':[9],'212':[9],'52':[10],'54':[10],'55':[10,11],'57':[10]};
function phoneCheck(raw){
  let s=String(raw||'').trim(); if(!s)return{err:'empty'};
  s=s.replace(/[^\d+]/g,''); if(s.startsWith('00'))s='+'+s.slice(2);
  if(!s.startsWith('+')){
    const x=s.replace(/\D/g,'');
    if(x.length===9&&/^[6789]/.test(x))s='+34'+x;            // a Spanish number typed without +34
    else if(x.length===10&&/^[6789]/.test(x))return{err:'long'}; // a Spanish number with an extra digit
    else if(x.length>=10)s='+'+x;                               // country code typed without the +
    else return{err:'short',soft:true};
  }
  const n=s.slice(1).replace(/\D/g,'');
  let cc=null;for(const l of [3,2,1]){if(PH_CC[n.slice(0,l)]){cc=n.slice(0,l);break}}
  if(!cc){if(n.length>15)return{err:'long'};if(n.length<8)return{err:'short',soft:true};return{ok:true,e164:'+'+n}}
  let nat=n.slice(cc.length);const L=PH_CC[cc];
  if(cc==='380'&&nat.length===10&&nat[0]==='0')nat=nat.slice(1);   // +380 0xx… typed with the trunk 0
  if(nat.length>Math.max(...L))return{err:'long'};
  if(cc==='34'&&nat.length&&!/^[6789]/.test(nat))return{err:'es'};
  if(nat.length<Math.min(...L))return{err:'short',soft:true};
  return{ok:true,e164:'+'+cc+nat};
}
const quiz=$('#form.quiz');
let quizApi=null;
if(quiz){
  const steps=$$('.qstep',quiz), N=steps.length, bar=$('.qprog i',quiz), cnt=$('.qcount',quiz);
  let cur=0;const reached=new Set([0]);
  const errOf=box=>box&&box.querySelector(':scope > .qerr, :scope > small.qerr');
  const setErr=(box,key)=>{const e=errOf(box);if(e){e.textContent=key?t(key):'';e.dataset.k=key||''}box.classList.toggle('bad',!!key)};
  hooks.push(()=>$$('.qerr',quiz).forEach(e=>{if(e.dataset.k)e.textContent=t(e.dataset.k)}));
  function applyIf(){
    $$('[data-if]',quiz).forEach(el=>{
      const [f,vals]=el.dataset.if.split('=');const v=quiz.elements[f]?quiz.elements[f].value:'';
      const on=vals.split(',').includes(v);el.hidden=!on;$$('input,select,textarea',el).forEach(i=>i.disabled=!on);
    });
  }
  function checkPhone(inp,final){
    const box=inp.closest('label'),r=phoneCheck(inp.value);
    if(r.ok){setErr(box,null);return r}
    const show=final||(!r.soft&&r.err!=='empty');
    setErr(box,show?{empty:'ph_empty',cc:'ph_cc',long:'ph_long',short:'ph_short',es:'ph_es'}[r.err]:null);
    return r;
  }
  function validStep(i,show){
    let ok=true;const st=steps[i];
    const groups=[st.matches('fieldset[data-req]')?st:null,...$$('fieldset[data-req]',st)].filter(Boolean);
    groups.forEach(g=>{if(g.hidden||g.closest('[hidden]:not(.qstep)'))return;const picked=$('input:checked',g);if(!picked){ok=false;if(show)setErr(g,'q_pick')}else setErr(g,null)});
    $$('input[required],select[required],textarea[required]',st).forEach(f=>{
      if(f.disabled||f.type==='radio')return;
      if(f.name==='phone'){const r=checkPhone(f,show);if(!r.ok){ok=false;if(show)track('FormError',{field:'phone',reason:r.err})}return}
      const box=f.closest('label');if(!String(f.value||'').trim()){ok=false;if(show)setErr(box,'q_fill')}else setErr(box,null);
    });
    if(show&&!ok){const b=$('.bad input, .bad select, .bad textarea',st);b&&b.focus({preventScroll:false})}
    return ok;
  }
  function go(i){
    cur=Math.max(0,Math.min(N-1,i));applyIf();
    steps.forEach((s,k)=>{s.hidden=k!==cur});
    if(bar)bar.style.width=((cur+1)/N*100)+'%';if(cnt)cnt.textContent=`${cur+1} / ${N}`;
    if(!reached.has(cur)){reached.add(cur);track('QuizStep'+(cur+1),{step:cur+1})}
    /* keep the step in view without animated scrolling (smooth scroll judders in in-app browsers like Telegram) */
    const top=quiz.getBoundingClientRect().top;if(top<0)window.scrollTo(0,Math.max(0,scrollY+top-84));
    const f=$('input:not([type=radio]):not([disabled]),select:not([disabled]),textarea:not([disabled])',steps[cur]);
    if(f&&cur>0&&matchMedia('(pointer:fine)').matches)setTimeout(()=>f.focus({preventScroll:true}),60);
  }
  quiz.addEventListener('change',e=>{
    const g=e.target.closest('fieldset[data-req]');if(g)setErr(g,null);
    if(e.target.type==='radio')applyIf();
    if(e.target.type==='radio'&&e.target.closest('[data-auto]')&&cur<N-1){const at=cur;setTimeout(()=>{if(cur===at&&validStep(at,false))go(at+1)},320)}
    if(e.target.matches('select,input:not([type=radio]),textarea')){const b=e.target.closest('label');if(b&&b.classList.contains('bad')&&e.target.name!=='phone'&&String(e.target.value).trim())setErr(b,null)}
  });
  quiz.addEventListener('input',e=>{
    if(e.target.name==='phone')checkPhone(e.target,false);
    else{const b=e.target.closest('label');if(b&&b.classList.contains('bad')&&String(e.target.value).trim())setErr(b,null)}
  });
  quiz.addEventListener('focusout',e=>{if(e.target.name==='phone'&&e.target.value.trim())checkPhone(e.target,true)});
  quiz.addEventListener('click',e=>{
    if(e.target.closest('.qnext')){if(validStep(cur,true))go(cur+1)}
    else if(e.target.closest('.qback'))go(cur-1);
  });
  /* Enter in a text field moves on instead of sending early */
  quiz.addEventListener('keydown',e=>{if(e.key==='Enter'&&cur<N-1&&e.target.matches('input')){e.preventDefault();if(validStep(cur,true))go(cur+1)}});
  /* the send handler below runs only when every step is valid */
  quiz.addEventListener('submit',e=>{
    for(let i=0;i<N;i++){if(!validStep(i,false)){e.preventDefault();e.stopImmediatePropagation();if(i!==cur)go(i);validStep(i,true);return}}
  });
  applyIf();go(0);
  quizApi={phone:()=>{const f=quiz.elements.phone;const r=f?phoneCheck(f.value):{};return r.ok?r.e164:''},focusFirst:()=>{const f=$('input:not([disabled]),select:not([disabled])',steps[cur]);f&&f.focus({preventScroll:true})}};
}

/* ---------- form to WhatsApp (source page + ad tags included) ---------- */
const form=$('#form');
if(form){
  const Q=new URLSearchParams(location.search);
  const utm=['utm_source','utm_campaign','utm_content'].map(k=>Q.get(k)?k.replace('utm_','')+'='+Q.get(k):'').filter(Boolean).join(', ');
  /* honeypot: invisible to people, bots fill it in */
  const hp=document.createElement('input');hp.type='text';hp.name='company_site';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');hp.style.cssText='position:absolute;left:-9999px;width:1px;height:1px;opacity:0';form.appendChild(hp);
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.elements.name.value.trim();
    if(!name){track('FormError',{field:'name'});form.elements.name.focus();form.elements.name.setCustomValidity(t('f_err'));form.elements.name.reportValidity();setTimeout(()=>form.elements.name.setCustomValidity(''),2000);return}
    if(hp.value){form.classList.add('sent');return}
    const el=form.elements, val=n=>{const f=el[n];if(!f||f.disabled)return undefined;if(f.tagName==='SELECT')return f.value||undefined;return (f.value||'').trim()||undefined};
    const leadId=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
    const fbclid=Q.get('fbclid');
    const phone=quizApi?quizApi.phone():val('phone');
    sendLead({lead_id:leadId,page:PAGE.id||'main',lang:LANG,name,phone,role:val('role'),shoot_type:val('type'),when:val('when'),volume:val('volume'),objects:val('objects'),package:val('package'),location:val('location'),link:val('link'),agency:val('agency'),message:val('msg'),
      utm_source:Q.get('utm_source'),utm_medium:Q.get('utm_medium'),utm_campaign:Q.get('utm_campaign'),utm_content:Q.get('utm_content'),utm_term:Q.get('utm_term'),
      device:matchMedia('(pointer:coarse)').matches?'mobile':'desktop',referrer:document.referrer,url:location.href.split('#')[0],
      fbp:cookie('_fbp'),fbc:cookie('_fbc')||(fbclid?`fb.1.${Date.now()}.${fbclid}`:'')});
    const lines=[t('wa_hi'),'',`${t('wa_name')}: ${name}`];
    $$('[data-wa]',form).forEach(el=>{
      let v='';
      if(el.closest('[hidden]:not(.qstep)')||el.disabled)return;
      if(el.tagName==='FIELDSET'){const c=$('input:checked',el);v=c?c.parentElement.textContent.trim():''}
      else if(el.name==='phone'){v=(quizApi&&quizApi.phone())||el.value.trim()}
      else if(el.tagName==='SELECT'){v=el.value?el.options[el.selectedIndex].textContent.trim():''}
      else v=el.value.trim();
      if(v)lines.push(`${String(t(el.dataset.wa)).replace(/[?¿]/g,'').trim()}: ${v}`);
    });
    /* page, ad tags and lead ID go to the sheet only — the WhatsApp text stays short */
    const url=`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    form.classList.add('sent');
    /* no personal data goes to the pixel: only what was chosen in the form and the ad source */
    track('Lead',{content_name:PAGE.label||PAGE.id,method:'whatsapp_form',role:val('role'),package:val('package'),shoot_type:val('type'),when:val('when'),volume:val('volume'),objects:val('objects'),value:PACK_PRICE[val('package')]||undefined,currency:PACK_PRICE[val('package')]?'EUR':undefined,utm_source:Q.get('utm_source')||undefined},{eventID:leadId});
    const w=window.open(url,'_blank','noopener');if(!w)location.href=url;
  });
  let started=false;
  form.addEventListener('focusin',()=>{if(started)return;started=true;track('FormStart')});
}

/* ---------- cookie consent ----------
   Meta Pixel and Clarity start only after "Accept" (window.grLoadTracking lives in each page's <head>).
   The choice is kept in localStorage 'gr-consent' = 'all' | 'necessary'.
   "Cookie settings" in the footer reopens the banner; rejecting after accepting revokes consent and clears the cookies. */
const ROOT=BASE.replace(/assets\/$/,'');
const PRIVACY_URL=ROOT+'privacy/';
const consentGet=()=>store.get('gr-consent');
function wipeTrackingCookies(){
  const h=location.hostname, doms=['',h,'.'+h,'.'+h.split('.').slice(-2).join('.')];
  ['_fbp','_fbc','_clck','_clsk'].forEach(n=>doms.forEach(d=>{document.cookie=`${n}=; Max-Age=0; path=/`+(d?`; domain=${d}`:'')}));
}
const ck=document.createElement('div');ck.className='ck';ck.setAttribute('role','region');
ck.innerHTML='<p class="ck-text"><span></span> <a class="ck-more"></a></p><div class="ck-btns"><button type="button" class="btn btn-ghost ck-reject"></button><button type="button" class="btn btn-accent ck-accept"></button></div>';
document.body.appendChild(ck);
const ckOpen=v=>{ck.classList.toggle('on',v);document.body.classList.toggle('ck-open',v)};
ck.querySelector('.ck-more').href=PRIVACY_URL;
ck.querySelector('.ck-accept').addEventListener('click',()=>{
  store.set('gr-consent','all');ckOpen(false);
  if(window.grLoadTracking)window.grLoadTracking();
  try{window.clarity&&clarity('consentv2',{ad_Storage:'granted',analytics_Storage:'granted'})}catch(e){}
  try{window.fbq&&fbq('consent','grant')}catch(e){}
  track('ConsentGranted');
});
ck.querySelector('.ck-reject').addEventListener('click',()=>{
  const wasOn=consentGet()==='all';store.set('gr-consent','necessary');ckOpen(false);
  try{window.clarity&&clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'})}catch(e){}
  try{window.fbq&&fbq('consent','revoke')}catch(e){}
  if(wasOn)wipeTrackingCookies();
});
hooks.push(()=>{ck.querySelector('.ck-text span').textContent=t('ck_text');ck.querySelector('.ck-more').textContent=t('ck_more');ck.querySelector('.ck-accept').textContent=t('ck_accept');ck.querySelector('.ck-reject').textContent=t('ck_reject');ck.setAttribute('aria-label',t('ck_label'))});
if(!consentGet())ckOpen(true);

/* footer: privacy policy + cookie settings on every page */
const foot=$('footer .wrap');
if(foot){
  const box=document.createElement('span');box.className='foot-legal';
  const pa=document.createElement('a');pa.href=PRIVACY_URL;
  const cb=document.createElement('button');cb.type='button';cb.addEventListener('click',()=>ckOpen(true));
  box.append(pa,cb);foot.appendChild(box);
  hooks.push(()=>{pa.textContent=t('privacy');cb.textContent=t('ck_settings')});
}

/* form: link to the privacy policy next to the send button */
const fm=$('#form');
if(fm){
  const p=document.createElement('p');p.className='note privacy-note';
  const s=document.createElement('span'),a=document.createElement('a');a.href=PRIVACY_URL;a.target='_blank';a.rel='noopener';
  p.append(s,' ',a,'.');const ok=$('.ok',fm);(ok?ok.parentNode:fm).insertBefore(p,ok||null);
  hooks.push(()=>{s.textContent=t('f_privacy');a.textContent=t('f_privacy_link')});
}

/* direct contacts (WhatsApp + email) under the form intro and in the footer; clicks are tracked as Contact automatically */
function contactLinks(){
  const out=[];
  if(SITE.whatsapp){const a=document.createElement('a');a.href=`https://wa.me/${SITE.whatsapp}`;a.target='_blank';a.rel='noopener';a.textContent='WhatsApp '+(SITE.phone||'+'+SITE.whatsapp);out.push(a)}
  const em=(SITE.legal||{}).email;
  if(em){const a=document.createElement('a');a.href='mailto:'+em;a.textContent=em;out.push(a)}
  return out;
}
const ctLede=$('#contact .lede');
if(ctLede&&SITE.whatsapp){
  const ICON={wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    tg:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 4.6 18.8 19.3c-.2 1-.8 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.7 13.2 2.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.7 1.2Z"/></svg>'};
  const wrap=document.createElement('div');wrap.className='ct-direct ri';
  const lab=document.createElement('p');lab.className='ct-lab';wrap.appendChild(lab);
  const row=document.createElement('div');row.className='ct-btns';wrap.appendChild(row);
  const mk=(href,ic,text,cls)=>{const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener';a.className='ct-btn '+cls;a.innerHTML=ICON[ic];const sp=document.createElement('span');sp.textContent=text;a.appendChild(sp);row.appendChild(a);return a};
  const waBtn=mk(`https://wa.me/${SITE.whatsapp}`,'wa','WhatsApp','ct-wa');
  mk(SITE.telegram?`https://t.me/${SITE.telegram}`:`https://t.me/+${SITE.whatsapp}`,'tg','Telegram','ct-tg');
  ctLede.after(wrap);
  hooks.push(()=>{lab.textContent=t('ct_direct');waBtn.href=`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t('wa_hi')||'')}`});
}
if(foot){const fc=document.createElement('span');fc.className='foot-contact';contactLinks().forEach((a,i)=>{if(i)fc.append(' · ');fc.append(a)});if(fc.childNodes.length)foot.insertBefore(fc,foot.querySelector('.foot-legal'))}

/* privacy page: controller details from SITE.legal */
$$('[data-legal]').forEach(el=>{
  const L=SITE.legal||{},k=el.dataset.legal;
  if(k!=='contact'){el.textContent=L[k]||'';return}
  el.textContent='';const a=document.createElement('a');
  if(L.email){a.href='mailto:'+L.email;a.textContent=L.email}
  else{a.href='https://wa.me/'+SITE.whatsapp;a.target='_blank';a.rel='noopener';a.textContent='WhatsApp '+(SITE.phone||'+'+SITE.whatsapp)}
  el.appendChild(a);
});

/* ---------- sticky action bar on phones ----------
   Shown on screens up to 720px once the first screen is scrolled past, hidden while the form is on screen.
   The WhatsApp button appears by itself as soon as SITE.whatsapp is filled in. */
(function(){
  const contact=$('#contact');if(!contact)return;
  const bar=document.createElement('div');bar.className='mbar';bar.setAttribute('role','region');
  const cta=document.createElement('a');cta.className='btn btn-accent';cta.href='#contact';bar.appendChild(cta);
  let wa=null;
  if(SITE.whatsapp){
    wa=document.createElement('a');wa.className='btn btn-ghost mbar-wa';wa.href=`https://wa.me/${SITE.whatsapp}`;wa.target='_blank';wa.rel='noopener';
    wa.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg><span>WhatsApp</span>';
    bar.appendChild(wa);
  }
  document.body.appendChild(bar);document.body.classList.add('has-mbar');
  hooks.push(()=>{cta.textContent=t('cta_request')||t('nav_cta')||t('cta_main');bar.setAttribute('aria-label',cta.textContent);if(wa)wa.href=`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t('wa_hi')||'')}`});
  let heroOn=!!$('#hero'),formOn=false;
  const sync=()=>bar.classList.toggle('on',!heroOn&&!formOn);
  const hero=$('#hero');
  if(hero)new IntersectionObserver(es=>{heroOn=es[0].isIntersecting;sync()}).observe(hero);
  new IntersectionObserver(es=>{formOn=es[0].isIntersecting;sync()},{threshold:.15}).observe(contact);
  sync();
})();

/* ---------- section views worth knowing about (once per page load) ---------- */
const seen=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;seen.unobserve(e.target);track(e.target.dataset.seenEvent)}),{threshold:.4});
[['#packages','ViewPackages'],['#contact','ViewForm'],['#reviews','ViewReviews']].forEach(([s,n])=>{const el=$(s);if(el&&!el.hidden){el.dataset.seenEvent=n;seen.observe(el)}});

/* ---------- FAQ: which questions people open ---------- */
$$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)track('FAQOpen',{question:label(d.querySelector('summary'))})}));

/* ---------- reduced motion ---------- */
function pin(){recApi&&recApi.activate('reduced_motion');$$('.rv').forEach(el=>el.classList.add('in','done'));$$('[data-count]').forEach(el=>{el.textContent=el.dataset.count+cSuf(el);el.dataset.done='1'});reels.forEach(r=>{const v=r.querySelector('video');if(v)v.pause()})}
RM.addEventListener('change',e=>{if(e.matches)pin();heroApi&&heroApi.apply()});
if(RM.matches)pin();

document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden));

/* ---------- start ---------- */
/* language on first visit, from the device language:
   English, Spanish, Catalan/Valencian, Galician, Basque → English; everything else (Russian, Ukrainian, Belarusian, Kazakh, Uzbek…) → Russian, the default.
   A choice made with the RU/EN switch is remembered and wins. */
(function(){
  const EN=['en','es','ca','gl','eu'];
  const first=((navigator.languages&&navigator.languages[0])||navigator.language||'ru').toLowerCase().split(/[-_]/)[0];
  const auto=EN.includes(first)?'en':'ru';
  setLang(store.get('gr-lang')||auto);
})();
heroApi&&heroApi.apply();
})();
