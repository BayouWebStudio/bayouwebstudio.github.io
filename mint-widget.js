(function(){
try{

const API='https://curious-lemming-262.convex.site/api/mint/chat';
const FALLBACK_API='https://api.bayouwebstudio.com/api/mint/chat';
const ACCENT='#98E8C1';
const BG='#0a0a0a';
const BUBBLE_BG='#1a1a1a';
const MSG_USER='#2a2a2a';
const MSG_BOT='#1e1e1e';

// Detect IG in-app browser
const ua=navigator.userAgent||'';
const isIG=ua.includes('Instagram')||ua.includes('FBAN')||ua.includes('FBAV');

// Inject font
if(!document.querySelector('link[href*="Inter"]')){
  var l=document.createElement('link');l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
  document.head.appendChild(l);
}

// Styles
var style=document.createElement('style');
style.textContent=`
.mint-bubble{position:fixed;bottom:90px;right:24px;width:56px;height:56px;cursor:pointer;z-index:99999;-webkit-animation:mint-float 3s ease-in-out infinite;animation:mint-float 3s ease-in-out infinite;-webkit-transition:-webkit-transform .2s;transition:transform .2s}
.mint-bubble:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}
.mint-blob-inner{width:56px;height:56px;background:radial-gradient(ellipse at 35% 30%,#4DFFC0,#00C882 50%,#008A5A);box-shadow:inset 0 -3px 8px rgba(0,80,50,0.3),inset 0 3px 8px rgba(77,255,192,0.2),0 4px 20px rgba(0,200,130,0.35),0 2px 6px rgba(0,0,0,0.3);animation:mint-morph 6s ease-in-out infinite;position:relative;overflow:hidden;}
@-webkit-keyframes mint-float{0%,100%{-webkit-transform:translateY(0);transform:translateY(0)}50%{-webkit-transform:translateY(-5px);transform:translateY(-5px)}}
@keyframes mint-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes mint-morph{0%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/40% 70% 60% 30%}75%{border-radius:40% 30% 60% 50%/60% 40% 50% 70%}100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}}
.mint-window{position:fixed;bottom:90px;right:24px;width:380px;max-height:500px;background:${BG};border:1px solid #333;border-radius:16px;z-index:99999;display:none;-webkit-flex-direction:column;flex-direction:column;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.6);overflow:hidden;-webkit-animation:mint-slideup .25s ease-out;animation:mint-slideup .25s ease-out}
.mint-window.open{display:-webkit-flex;display:flex}
@-webkit-keyframes mint-slideup{from{opacity:0;-webkit-transform:translateY(16px)}to{opacity:1;-webkit-transform:translateY(0)}}
@keyframes mint-slideup{from{opacity:0;-webkit-transform:translateY(16px);transform:translateY(16px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}
.mint-header{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-between;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #222}
.mint-header-left{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;gap:8px}
.mint-header-left svg{width:20px;height:20px}
.mint-header-name{color:${ACCENT};font-size:15px;font-weight:600}
.mint-close{background:none;border:none;color:#666;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1}
.mint-close:hover{color:#aaa}
.mint-messages{-webkit-flex:1;flex:1;overflow-y:auto;padding:16px;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;gap:10px;min-height:200px}
.mint-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.5;color:#e0e0e0;word-wrap:break-word}
.mint-msg.bot{-webkit-align-self:flex-start;align-self:flex-start;background:${MSG_BOT};border-bottom-left-radius:4px}
.mint-msg.user{-webkit-align-self:flex-end;align-self:flex-end;background:${MSG_USER};border-bottom-right-radius:4px}
.mint-msg .mint-label{color:${ACCENT};font-size:11px;font-weight:600;margin-bottom:4px}
.mint-input-wrap{display:-webkit-flex;display:flex;padding:12px;border-top:1px solid #222;gap:8px}
.mint-input{-webkit-flex:1;flex:1;background:#151515;border:1px solid #333;border-radius:10px;padding:10px 14px;color:#e0e0e0;font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:none}
.mint-input:focus{border-color:${ACCENT}66}
.mint-input::placeholder{color:#555}
.mint-send{background:${ACCENT};border:none;border-radius:10px;width:40px;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;cursor:pointer;-webkit-flex-shrink:0;flex-shrink:0}
.mint-send:disabled{opacity:.4;cursor:default}
.mint-send svg{width:18px;height:18px}
.mint-typing{-webkit-align-self:flex-start;align-self:flex-start;color:#666;font-size:13px;padding:4px 0}
.mint-ig-bar{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;padding:8px 16px;background:#111;border-bottom:1px solid #222;font-size:11px;color:#888;gap:6px}
.mint-ig-bar a{color:${ACCENT};text-decoration:none;font-weight:600}
@media(max-width:480px){
  .mint-window{width:100%;right:0;bottom:0;max-height:70vh;border-radius:16px 16px 0 0}
  .mint-bubble{bottom:${isIG?'110':'80'}px;right:16px}
  .mint-input-wrap{padding-bottom:${isIG?'24':'12'}px}
}
`;
document.head.appendChild(style);

var blobId='mb'+(Math.random()*9999|0);
var hexIcon=`<div class="mint-blob-inner" id="${blobId}-blob">
  <div style="position:absolute;top:10%;left:15%;width:35%;height:25%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,0.25),transparent 70%);transform:rotate(-15deg);pointer-events:none;"></div>
  <svg viewBox="0 0 56 56" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;" xmlns="http://www.w3.org/2000/svg">
    <ellipse id="${blobId}-elw" cx="20" cy="24" rx="5.5" ry="6" fill="white"/>
    <ellipse id="${blobId}-elp" cx="20" cy="24" rx="3" ry="3.5" fill="#1A1A2E"/>
    <circle cx="21.5" cy="22" r="1.2" fill="rgba(255,255,255,0.8)"/>
    <ellipse id="${blobId}-erw" cx="36" cy="24" rx="5.5" ry="6" fill="white"/>
    <ellipse id="${blobId}-erp" cx="36" cy="24" rx="3" ry="3.5" fill="#1A1A2E"/>
    <circle cx="37.5" cy="22" r="1.2" fill="rgba(255,255,255,0.8)"/>
    <ellipse id="${blobId}-ll" cx="20" cy="24" rx="6" ry="0" fill="#00C882" opacity="0"/>
    <ellipse id="${blobId}-lr" cx="36" cy="24" rx="6" ry="0" fill="#00C882" opacity="0"/>
    <path d="M22,34 Q28,40 34,34" stroke="#006040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>
</div>`;

var sendIcon=`<svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#0a0a0a"/></svg>`;

// IG banner HTML
var igBarHtml=isIG?`<div class="mint-ig-bar">📱 Viewing in Instagram &bull; <a href="#" onclick="window.open(window.location.href);return false;">Open in browser</a></div>`:'';

// Build DOM
var bubble=document.createElement('div');bubble.className='mint-bubble';bubble.innerHTML=hexIcon;

var win=document.createElement('div');win.className='mint-window';
win.innerHTML=`
${igBarHtml}
<div class="mint-header">
  <div class="mint-header-left"><div style="width:24px;height:24px;background:radial-gradient(ellipse at 35% 30%,#4DFFC0,#00C882 50%,#008A5A);border-radius:60% 40% 30% 70%/60% 30% 70% 40%;flex-shrink:0;"></div><span class="mint-header-name">Mint</span></div>
  <button class="mint-close">&times;</button>
</div>
<div class="mint-messages"></div>
<div class="mint-input-wrap">
  <input class="mint-input" placeholder="Ask about this artist..." maxlength="500">
  <button class="mint-send" disabled>${sendIcon}</button>
</div>`;

document.body.appendChild(bubble);

// Eye tracking for blob
(function(){
  var lp=document.getElementById(blobId+'-elp');
  var rp=document.getElementById(blobId+'-erp');
  var ll=document.getElementById(blobId+'-ll');
  var lr=document.getElementById(blobId+'-lr');
  if(!lp)return;
  var MAX=2.5;
  function setPupil(ox,oy){lp.setAttribute('cx',20+ox);lp.setAttribute('cy',24+oy);rp.setAttribute('cx',36+ox);rp.setAttribute('cy',24+oy);}
  var dirs=[{x:-2,y:-1},{x:2,y:-1},{x:-2,y:1},{x:2,y:1},{x:0,y:-2},{x:0,y:0},{x:-2.5,y:0},{x:2.5,y:0}];
  setInterval(function(){var d=dirs[Math.random()*dirs.length|0];setPupil(d.x,d.y);},2200);
  document.addEventListener('mousemove',function(e){
    var r=bubble.getBoundingClientRect();
    var cx=r.left+r.width/2,cy=r.top+r.height/2;
    var dx=e.clientX-cx,dy=e.clientY-cy;
    var dist=Math.sqrt(dx*dx+dy*dy)||1;
    if(dist<300){var f=Math.min(dist/300,1);setPupil((dx/dist)*MAX*f,(dy/dist)*MAX*f);}
  });
  function blink(){ll.setAttribute('ry','7');ll.setAttribute('opacity','1');lr.setAttribute('ry','7');lr.setAttribute('opacity','1');setTimeout(function(){ll.setAttribute('ry','0');ll.setAttribute('opacity','0');lr.setAttribute('ry','0');lr.setAttribute('opacity','0');},150);}
  function sched(){setTimeout(function(){blink();sched();},2000+Math.random()*3000);}
  sched();
})();
document.body.appendChild(win);

var msgs=win.querySelector('.mint-messages');
var input=win.querySelector('.mint-input');
var sendBtn=win.querySelector('.mint-send');
var closeBtn=win.querySelector('.mint-close');

var history=[];
var isOpen=false;
var sending=false;
var threadId=null;
var retryCount=0;
var MAX_RETRIES=2;

function addMsg(text,type){
  var d=document.createElement('div');d.className='mint-msg '+type;
  if(type==='bot'){d.innerHTML='<div class="mint-label">Mint</div>'+text.replace(/\n/g,'<br>')}
  else{d.textContent=text}
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}

function toggle(){
  isOpen=!isOpen;
  if(isOpen){
    win.classList.add('open');bubble.style.display='none';
    if(!msgs.children.length)addMsg("Hey! I'm Mint, your AI concierge. Ask me anything about this artist.","bot");
    input.focus();
  }else{win.classList.remove('open');bubble.style.display='-webkit-flex';bubble.style.display='flex'}
}

bubble.onclick=toggle;
closeBtn.onclick=toggle;

input.oninput=function(){sendBtn.disabled=!input.value.trim()||sending;};
input.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}};
sendBtn.onclick=send;

function parseResponse(r){
  var tid=r.headers.get('X-Thread-Id');
  if(tid)threadId=tid;
  var ct=r.headers.get('content-type')||'';
  if(!r.ok)return r.text().then(function(t){try{var j=JSON.parse(t);return{reply:null,error:j.error||'Server error'}}catch(e2){return{reply:null,error:'Server error ('+r.status+')'}}});
  if(ct.indexOf('text/')>=0)return r.text().then(function(t){return{reply:t}});
  return r.json();
}

function doFetch(url,payload,typing,attempt){
  var controller=new AbortController();
  var timeoutId=setTimeout(function(){controller.abort();},30000);
  return fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal})
    .then(function(r){clearTimeout(timeoutId);return parseResponse(r);})
    .then(function(d){
      if(d.reply){
        typing.remove();
        addMsg(d.reply,'bot');
        history.push({role:'assistant',content:d.reply});
        retryCount=0;
        sending=false;sendBtn.disabled=!input.value.trim();
        return;
      }
      throw new Error(d.error||'Empty response');
    })
    .catch(function(err){
      clearTimeout(timeoutId);
      // Try fallback API on first failure
      if(url===API&&attempt===0){
        return doFetch(FALLBACK_API,payload,typing,1);
      }
      // Retry once on the primary API
      if(attempt<MAX_RETRIES){
        typing.textContent='Reconnecting...';
        return new Promise(function(resolve){setTimeout(resolve,1500);}).then(function(){return doFetch(API,payload,typing,attempt+1);});
      }
      typing.remove();
      var errMsg=isIG?"Connection issue. Try opening in Safari for full experience.":"Hmm, I'm having trouble connecting. Try again in a moment!";
      addMsg(errMsg,'bot');
      sending=false;sendBtn.disabled=!input.value.trim();
    });
}

function send(){
  var text=input.value.trim();if(!text||sending)return;
  sending=true;sendBtn.disabled=true;input.value='';
  addMsg(text,'user');
  history.push({role:'user',content:text});

  var typing=document.createElement('div');typing.className='mint-typing';typing.textContent='Mint is typing...';msgs.appendChild(typing);msgs.scrollTop=msgs.scrollHeight;

  var SLUG=window.__mintSlug||(window.location.pathname.split('/').filter(Boolean)[0]||'');
  var payload={message:text,slug:SLUG,context:SLUG};
  if(threadId)payload.threadId=threadId;
  // Include auth token if owner is logged in (set by dashboard)
  var ownerToken=null;
  try{ownerToken=localStorage.getItem('mint-owner-token');}catch(e){}
  if(ownerToken)payload.authToken=ownerToken;

  doFetch(API,payload,typing,0);
}

// Auto-hide claim banner if site is already claimed
(function(){
  var banner=document.getElementById('claim-banner');
  if(!banner)return;
  var slug=window.__mintSlug||(window.location.pathname.split('/').filter(Boolean)[0]||'');
  if(!slug)return;
  fetch('https://curious-lemming-262.convex.site/api/site/claimed?slug='+encodeURIComponent(slug))
    .then(function(r){return r.json();})
    .then(function(d){
      if(d&&d.claimed){banner.style.display='none';try{banner.remove();}catch(e){}}
    })
    .catch(function(){/* silent — show banner if check fails (fail-open for unclaimed sites) */});
})();

}catch(e){
  // Widget failed to initialize — show minimal fallback
  try{
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;bottom:20px;right:20px;z-index:99999;background:#1a1a1a;color:#98E8C1;padding:12px 16px;border-radius:12px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:14px;border:1px solid #98E8C1;max-width:260px;line-height:1.4;';
    fb.innerHTML='💬 Chat with Mint — <a href="'+window.location.href+'" target="_blank" style="color:#98E8C1;font-weight:600;">Open in Safari</a> for full experience';
    document.body.appendChild(fb);
  }catch(e2){}
}
})();
