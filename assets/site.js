/* GR Production · shared site engine for every page.
   A page sets window.PAGE = { id, base, T:{ru,en,es}, hero:{src,bytes,poster,ending} } before loading this file. */

/* ===== settings shared by all pages ===== */
const SITE = {
  whatsapp: '380675317874', // international format, digits only, e.g. 34600000000
  /* Google Apps Script web app URL (see google-apps-script/README.md). Empty = leads go to WhatsApp only. */
  leadsEndpoint: '',
  /* Real client quotes only. pages: which pages show it ('main', 'real-estate'). */
  reviews: [
    { name: 'Yarl', role: { ru: 'Недвижимость', en: 'Real estate', es: 'Inmobiliaria' }, orig: 'ru', pages: ['main', 'real-estate'], text: {
      ru: 'Вау, Глеб, это реально очень круто. Видно сразу, что поработали профессионалы. Я теперь понял, о каком уровне видео ты говорил! Я уже много раз пересмотрел и наслаждаюсь. Реально хочется сотрудничать с такими профессионалами.\n\nВот это мне зашло больше всего. Реально видно, что работали профессионалы и не за один вечер сделано.',
      en: 'Wow, Gleb, this is really great. You can see right away that professionals made it. Now I understand what level of video you were talking about! I have rewatched it many times and I enjoy it. It really makes me want to work with professionals like this.\n\nThis one I liked the most. You can really see professionals worked on it, and it was not made in one evening.',
      es: 'Gleb, de verdad, esto está genial. Se ve enseguida que lo han hecho profesionales. ¡Ahora entiendo de qué nivel de vídeo hablabas! Ya lo he visto muchas veces y lo disfruto. Dan ganas de colaborar con profesionales así.\n\nEste es el que más me ha gustado. Se nota que han trabajado profesionales y que no se hizo en una tarde.'
    } }
  ]
};

/* ===== copy shared by all pages (a page's own T overrides any key) ===== */
const SHARED = {
ru:{skip:"К содержанию",photo_tag:"GLEB · DOP",rev_k:"Отзывы",rev_h:"Что говорят клиенты.",rev_tr:"Перевод с русского",
f_name:"Имя",f_name_ph:"Как к вам обращаться",f_msg:"Пара слов о проекте",f_note:"Без спама. Отвечаю лично.",f_btn:"Отправить в WhatsApp",
f_ok:"Открываем WhatsApp с вашей заявкой. Если окно не открылось, проверьте блокировщик всплывающих окон.",f_err:"Напишите, как к вам обращаться.",
wa_name:"Имя",wa_page:"Страница",lb_close:"Закрыть",play:"смотреть со звуком"},
en:{skip:"Skip to content",photo_tag:"GLEB · DOP",rev_k:"Reviews",rev_h:"What clients say.",rev_tr:"Translated from Russian",
f_name:"Name",f_name_ph:"What should I call you",f_msg:"A few words about the project",f_note:"No spam. I reply personally.",f_btn:"Send via WhatsApp",
f_ok:"Opening WhatsApp with your request. If nothing opened, check your pop-up blocker.",f_err:"Please tell me your name.",
wa_name:"Name",wa_page:"Page",lb_close:"Close",play:"watch with sound"},
es:{skip:"Ir al contenido",photo_tag:"GLEB · DOP",rev_k:"Opiniones",rev_h:"Lo que dicen los clientes.",rev_tr:"Traducido del ruso",
f_name:"Nombre",f_name_ph:"¿Cómo te llamas?",f_msg:"Unas palabras sobre el proyecto",f_note:"Sin spam. Respondo personalmente.",f_btn:"Enviar por WhatsApp",
f_ok:"Abriendo WhatsApp con tu solicitud. Si no se abre, revisa el bloqueador de ventanas.",f_err:"Dime cómo te llamas.",
wa_name:"Nombre",wa_page:"Página",lb_close:"Cerrar",play:"ver con sonido"}
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
  const p=Object.assign({page:PAGE.id||'main',lang:LANG},params||{});
  /* opts.eventID lets the same event be deduplicated later if it is also sent server-side (Conversions API) */
  try{if(window.fbq)(STD_EVENTS.includes(name)?fbq('track',name,p,opts||{}):fbq('trackCustom',name,p,opts||{}))}catch(e){}
  try{if(window.clarity)clarity('event',name)}catch(e){}
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
function navCheck(){const s=scrollY>innerHeight*.6;if(s!==navSolid){navSolid=s;nav&&nav.classList.toggle('solid',s)}}
addEventListener('scroll',navCheck,{passive:true});navCheck();

/* ---------- reveals ---------- */
const rvObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvObs.unobserve(e.target);setTimeout(()=>e.target.classList.add('done'),1500)}}),{rootMargin:'0px 0px -12% 0px'});
$$('.rv').forEach(el=>rvObs.observe(el));

/* ---------- counters ---------- */
function runCount(el){const to=+el.dataset.count,suf=el.dataset.suffix||'';if(RM.matches){el.textContent=to+suf;return}const t0=performance.now(),D=1600;(function f(n){const k=clamp((n-t0)/D,0,1),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e)+suf;if(k<1)requestAnimationFrame(f)})(t0)}
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
const autoplayOK=()=>!RM.matches&&!saveData;
const rObs=new IntersectionObserver(es=>es.forEach(e=>{
  const r=e.target;
  if(e.isIntersecting&&e.intersectionRatio>.35){
    if(!autoplayOK())return;
    let v=r.querySelector('video');
    if(!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.setAttribute('aria-hidden','true');v.tabIndex=-1;v.src=`${BASE}v/${srcOf(r)}.mp4`;v.dataset.cur=srcOf(r);r.querySelector('.screen').appendChild(v);v.addEventListener('playing',()=>r.classList.add('playing'))}
    v.play().catch(()=>{});
  }else{const v=r.querySelector('video');if(v)v.pause()}
}),{threshold:[0,.35,.6]});
reels.forEach(r=>rObs.observe(r));
hooks.push(()=>{reels.forEach(r=>{r.setAttribute('aria-label',(r.dataset.title||r.dataset.v)+': '+t('play'));const v=r.querySelector('video');if(v&&r.dataset.vEn&&v.dataset.cur!==srcOf(r)){const was=!v.paused;v.dataset.cur=srcOf(r);r.classList.remove('playing');v.src=`${BASE}v/${srcOf(r)}.mp4`;if(was)v.play().catch(()=>{})}})});

/* ---------- lightbox ---------- */
const lb=$('#lb'),lbv=$('#lbv');let lastFocus=null;
function openLb(name){if(!lb)return;lastFocus=document.activeElement;lbv.src=`${BASE}v/${name}.mp4`;lbv.muted=false;lb.classList.add('open');document.body.style.overflow='hidden';reels.forEach(r=>{const v=r.querySelector('video');if(v)v.pause()});lbv.play().catch(()=>{});$('#lbclose').focus()}
function closeLb(){lb.classList.remove('open');lbv.pause();lbv.removeAttribute('src');lbv.load();document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
reels.forEach(r=>r.addEventListener('click',()=>{openLb(srcOf(r));track('ViewContent',{content_type:'video',content_name:r.dataset.title||r.dataset.v,content_ids:[r.dataset.v]})}));
if(lb){$('#lbclose').addEventListener('click',closeLb);lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('open'))closeLb()})}

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

/* ---------- the interactive moment: hold REC ----------
   #recbtn with data-max (number shown at the end), data-done-key, and data-lights (selector of items that light up). */
const recbtn=$('#recbtn');let recApi=null;
if(recbtn){
  const recn=$('#recn'),hint=$('#rechint'),tc3=$('#tc3');
  const max=+recbtn.dataset.max||30, finalTxt=recbtn.dataset.final||String(max);
  const lights=$$(recbtn.dataset.lights||'#steps li'), line=$('#steps line.draw'), steps=$('#steps');
  if(steps&&line){const measure=()=>line.style.setProperty('--len',steps.querySelector('svg.line').getBoundingClientRect().height||300);measure();addEventListener('resize',measure)}
  let h=0,holding=false,raf=null,last=0,done=false,lastN=-1,lastH=-1;const HOLD=2200;
  function render(force){
    const hr=Math.round(h*1000)/1000;
    if(hr!==lastH||force){lastH=hr;recbtn.style.setProperty('--h',hr);line&&line.style.setProperty('--d',hr);lights.forEach((li,i)=>li.classList.toggle('lit',done||h>=(i+.5)/lights.length))}
    const n=Math.round(max*h);
    if(n!==lastN||force){lastN=n;recn.textContent=done?finalTxt:n;if(tc3)tc3.textContent=['08','12','16','20'][Math.min(3,Math.floor(h*4))]+':00:'+String(Math.floor(h*59)).padStart(2,'0')}
    hint.textContent=done?t(recbtn.dataset.doneKey||'rec_done'):t('rec_hint');
  }
  function tick(now){
    const dt=Math.min(64,now-(last||now));last=now;
    if(holding)h=Math.min(1,h+dt/HOLD);else h=Math.max(0,h-dt/(HOLD*.6)*(.4+h));
    let just=false;if(h>=1&&!done){done=true;holding=false;just=true;track('RecHoldComplete')}if(done)h=1;
    render(just);
    if((holding||h>0)&&!(done&&h===1))raf=requestAnimationFrame(tick);else{raf=null;last=0}
  }
  const start=e=>{if(done)return;e.preventDefault();holding=true;if(!raf){last=0;raf=requestAnimationFrame(tick)}};
  const stop=()=>{holding=false;if(!raf&&!done){last=0;raf=requestAnimationFrame(tick)}};
  recbtn.addEventListener('pointerdown',start);['pointerup','pointerleave','pointercancel'].forEach(x=>recbtn.addEventListener(x,stop));
  recbtn.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat)start(e)});
  recbtn.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')stop()});
  recbtn.addEventListener('contextmenu',e=>e.preventDefault());
  hooks.push(()=>render(true));
  recApi={finish(){done=true;h=1;render(true)}};
}

/* ---------- reviews ---------- */
const revSec=$('#reviews');
if(revSec){
  const list=SITE.reviews.filter(r=>r.pages.includes(PAGE.id));
  if(!list.length) revSec.hidden=true;
  else hooks.push(()=>{const box=$('#quotes');box.textContent='';list.forEach(r=>{
    const fig=document.createElement('figure');fig.className='quote';
    const p=document.createElement('p');p.textContent=r.text[LANG]||r.text[r.orig];fig.appendChild(p);
    const who=document.createElement('figcaption');who.className='who';
    const b=document.createElement('b');b.textContent=r.name;who.appendChild(b);
    const s=document.createElement('span');s.className='mono';s.textContent=(r.role&&(r.role[LANG]||r.role.ru))||'';who.appendChild(s);
    if(LANG!==r.orig&&r.text[LANG]){const tr=document.createElement('span');tr.className='tr';tr.textContent=t('rev_tr');who.appendChild(tr)}
    fig.appendChild(who);box.appendChild(fig)})});
}

/* ---------- package buttons fill the form ---------- */
const PACK_PRICE={one:650,three:1500,six:2500};
$$('[data-pick]').forEach(b=>b.addEventListener('click',()=>{track('SelectPackage',{package:b.dataset.pick,value:PACK_PRICE[b.dataset.pick]||0,currency:'EUR'});const sel=$('#form [name=package]');if(sel)sel.value=b.dataset.pick;const c=$('#contact');c&&c.scrollIntoView({behavior:RM.matches?'auto':'smooth'});setTimeout(()=>{const n=$('#form [name=name]');n&&n.focus({preventScroll:true})},RM.matches?0:700)}));

/* ---------- lead log: a copy of every request goes to the Google Sheet before WhatsApp opens ----------
   sendBeacon survives the page switching to WhatsApp; the urlencoded body needs no CORS preflight. */
function sendLead(d){
  if(!SITE.leadsEndpoint)return;
  const body=new URLSearchParams();Object.entries(d).forEach(([k,v])=>{if(v!=null&&v!=='')body.append(k,String(v))});
  try{if(navigator.sendBeacon&&navigator.sendBeacon(SITE.leadsEndpoint,new Blob([body.toString()],{type:'application/x-www-form-urlencoded'})))return}catch(e){}
  try{fetch(SITE.leadsEndpoint,{method:'POST',mode:'no-cors',keepalive:true,body})}catch(e){}
}
const cookie=n=>{const m=document.cookie.match('(?:^|; )'+n+'=([^;]*)');return m?decodeURIComponent(m[1]):''};

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
    const el=form.elements, val=n=>{const f=el[n];if(!f)return undefined;if(f.tagName==='SELECT')return f.value||f.options[f.selectedIndex].textContent.trim();return (f.value||'').trim()||undefined};
    const leadId=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
    const fbclid=Q.get('fbclid');
    sendLead({lead_id:leadId,page:PAGE.id||'main',lang:LANG,name,role:val('role'),shoot_type:val('type'),package:val('package'),location:val('location'),message:val('msg'),
      utm_source:Q.get('utm_source'),utm_medium:Q.get('utm_medium'),utm_campaign:Q.get('utm_campaign'),utm_content:Q.get('utm_content'),utm_term:Q.get('utm_term'),
      device:matchMedia('(pointer:coarse)').matches?'mobile':'desktop',referrer:document.referrer,url:location.href.split('#')[0],
      fbp:cookie('_fbp'),fbc:cookie('_fbc')||(fbclid?`fb.1.${Date.now()}.${fbclid}`:'')});
    const lines=[t('wa_hi'),'',`${t('wa_name')}: ${name}`];
    $$('[data-wa]',form).forEach(el=>{
      let v='';
      if(el.tagName==='FIELDSET'){const c=$('input:checked',el);v=c?c.parentElement.textContent.trim():''}
      else if(el.tagName==='SELECT'){v=el.options[el.selectedIndex].textContent.trim()}
      else v=el.value.trim();
      if(v)lines.push(`${String(t(el.dataset.wa)).replace(/[?¿]/g,'').trim()}: ${v}`);
    });
    lines.push('',`${t('wa_page')}: ${PAGE.label||PAGE.id}${utm?' · '+utm:''}`,`ID: ${leadId}`);
    const url=`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    form.classList.add('sent');
    /* no personal data goes to the pixel: only what was chosen in the form and the ad source */
    track('Lead',{content_name:PAGE.label||PAGE.id,method:'whatsapp_form',role:val('role'),package:val('package'),shoot_type:val('type'),value:PACK_PRICE[val('package')]||undefined,currency:PACK_PRICE[val('package')]?'EUR':undefined,utm_source:Q.get('utm_source')||undefined},{eventID:leadId});
    const w=window.open(url,'_blank','noopener');if(!w)location.href=url;
  });
  let started=false;
  form.addEventListener('focusin',()=>{if(started)return;started=true;track('FormStart')});
}

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
function pin(){recApi&&recApi.finish();$$('.rv').forEach(el=>el.classList.add('in','done'));$$('[data-count]').forEach(el=>{el.textContent=el.dataset.count+(el.dataset.suffix||'')});reels.forEach(r=>{const v=r.querySelector('video');if(v)v.pause()})}
RM.addEventListener('change',e=>{if(e.matches)pin();heroApi&&heroApi.apply()});
if(RM.matches)pin();

document.addEventListener('visibilitychange',()=>document.body.classList.toggle('paused',document.hidden));

/* ---------- start ---------- */
(function(){const s=store.get('gr-lang');const n=(navigator.language||'ru').slice(0,2);setLang(s||(n==='es'||n==='ca'?'es':(n==='ru'||n==='uk'?'ru':'en')))})();
heroApi&&heroApi.apply();
})();
