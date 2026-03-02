(function(){
const API='https://api.bayouwebstudio.com/api/mint/chat';
const ACCENT='#98E8C1';
const BG='#0a0a0a';
const BUBBLE_BG='#1a1a1a';
const MSG_USER='#2a2a2a';
const MSG_BOT='#1e1e1e';

// Inject font
if(!document.querySelector('link[href*="Inter"]')){
  const l=document.createElement('link');l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
  document.head.appendChild(l);
}

// Styles
const style=document.createElement('style');
style.textContent=`
.mint-bubble{position:fixed;bottom:90px;right:24px;width:56px;height:56px;border-radius:50%;background:${BG};border:2px solid ${ACCENT};cursor:pointer;z-index:99999;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px ${ACCENT}44,0 0 40px ${ACCENT}22;animation:mint-pulse 3s ease-in-out infinite;transition:transform .2s}
.mint-bubble:hover{transform:scale(1.08)}
.mint-bubble svg{width:28px;height:28px}
@keyframes mint-pulse{0%,100%{box-shadow:0 0 20px ${ACCENT}44,0 0 40px ${ACCENT}22}50%{box-shadow:0 0 28px ${ACCENT}66,0 0 56px ${ACCENT}33}}
.mint-window{position:fixed;bottom:90px;right:24px;width:380px;max-height:500px;background:${BG};border:1px solid #333;border-radius:16px;z-index:99999;display:none;flex-direction:column;font-family:'Inter',sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.6);overflow:hidden;animation:mint-slideup .25s ease-out}
.mint-window.open{display:flex}
@keyframes mint-slideup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.mint-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #222}
.mint-header-left{display:flex;align-items:center;gap:8px}
.mint-header-left svg{width:20px;height:20px}
.mint-header-name{color:${ACCENT};font-size:15px;font-weight:600}
.mint-close{background:none;border:none;color:#666;font-size:20px;cursor:pointer;padding:4px 8px;line-height:1}
.mint-close:hover{color:#aaa}
.mint-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:200px}
.mint-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.5;color:#e0e0e0;word-wrap:break-word}
.mint-msg.bot{align-self:flex-start;background:${MSG_BOT};border-bottom-left-radius:4px}
.mint-msg.user{align-self:flex-end;background:${MSG_USER};border-bottom-right-radius:4px}
.mint-msg .mint-label{color:${ACCENT};font-size:11px;font-weight:600;margin-bottom:4px}
.mint-input-wrap{display:flex;padding:12px;border-top:1px solid #222;gap:8px}
.mint-input{flex:1;background:#151515;border:1px solid #333;border-radius:10px;padding:10px 14px;color:#e0e0e0;font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:none}
.mint-input:focus{border-color:${ACCENT}66}
.mint-input::placeholder{color:#555}
.mint-send{background:${ACCENT};border:none;border-radius:10px;width:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.mint-send:disabled{opacity:.4;cursor:default}
.mint-send svg{width:18px;height:18px}
.mint-typing{align-self:flex-start;color:#666;font-size:13px;padding:4px 0}
@media(max-width:480px){.mint-window{width:100%;right:0;bottom:0;max-height:70vh;border-radius:16px 16px 0 0}.mint-bubble{bottom:80px;right:16px}}
`;
document.head.appendChild(style);

const hexIcon=`<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 4L35 12V28L20 36L5 28V12L20 4Z" stroke="${ACCENT}" stroke-width="1.5" fill="none"/>
<path d="M20 10L29 15V25L20 30L11 25V15L20 10Z" stroke="${ACCENT}" stroke-width="1" fill="none" opacity=".6"/>
<circle cx="20" cy="20" r="3" fill="${ACCENT}" opacity=".8"/>
<line x1="20" y1="4" x2="20" y2="10" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
<line x1="35" y1="12" x2="29" y2="15" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
<line x1="35" y1="28" x2="29" y2="25" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
<line x1="20" y1="36" x2="20" y2="30" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
<line x1="5" y1="28" x2="11" y2="25" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
<line x1="5" y1="12" x2="11" y2="15" stroke="${ACCENT}" stroke-width=".5" opacity=".4"/>
</svg>`;

const sendIcon=`<svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#0a0a0a"/></svg>`;

// Build DOM
const bubble=document.createElement('div');bubble.className='mint-bubble';bubble.innerHTML=hexIcon;

const win=document.createElement('div');win.className='mint-window';
win.innerHTML=`
<div class="mint-header">
  <div class="mint-header-left">${hexIcon}<span class="mint-header-name">Mint</span></div>
  <button class="mint-close">&times;</button>
</div>
<div class="mint-messages"></div>
<div class="mint-input-wrap">
  <input class="mint-input" placeholder="Ask about this artist..." maxlength="500">
  <button class="mint-send" disabled>${sendIcon}</button>
</div>`;

document.body.appendChild(bubble);
document.body.appendChild(win);

const msgs=win.querySelector('.mint-messages');
const input=win.querySelector('.mint-input');
const sendBtn=win.querySelector('.mint-send');
const closeBtn=win.querySelector('.mint-close');

let history=[];
let isOpen=false;
let sending=false;

function addMsg(text,type){
  const d=document.createElement('div');d.className='mint-msg '+type;
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
  }else{win.classList.remove('open');bubble.style.display='flex'}
}

bubble.onclick=toggle;
closeBtn.onclick=toggle;

input.oninput=()=>{sendBtn.disabled=!input.value.trim()||sending};
input.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}};
sendBtn.onclick=send;

async function send(){
  const text=input.value.trim();if(!text||sending)return;
  sending=true;sendBtn.disabled=true;input.value='';
  addMsg(text,'user');
  history.push({role:'user',content:text});

  const typing=document.createElement('div');typing.className='mint-typing';typing.textContent='Mint is typing...';msgs.appendChild(typing);msgs.scrollTop=msgs.scrollHeight;

  try{
    const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,context:'weschetattoo',history:history.slice(-10)})});
    const d=await r.json();
    typing.remove();
    if(d.reply){addMsg(d.reply,'bot');history.push({role:'assistant',content:d.reply})}
    else{addMsg("Sorry, I couldn't get a response. Try again!","bot")}
  }catch(e){typing.remove();addMsg("Connection error. Please try again.","bot")}
  sending=false;sendBtn.disabled=!input.value.trim();
}
})();
