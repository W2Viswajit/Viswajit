const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const iconize=()=>window.lucide?.createIcons();iconize();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,animations=[];
const motionButton=$('#motion-toggle');function updateMotion(){document.body.classList.toggle('motion-paused',paused);motionButton.textContent=paused?'Enable motion':'Pause motion';motionButton.setAttribute('aria-pressed',String(paused));animations.forEach(a=>{try{paused?a.pause():a.play()}catch{}})}updateMotion();motionButton.addEventListener('click',()=>{paused=!paused;updateMotion()});reduced.addEventListener('change',e=>{paused=e.matches;updateMotion()});
const menu=$('.menu'),nav=$('#nav');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});$$('nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
if(window.Motion&&!reduced.matches){const {animate,inView}=Motion;inView('.reveal',el=>{if(paused)return;const a=animate(el,{opacity:[0,1],y:[25,0]},{duration:.75,ease:[.2,.7,.2,1]});animations.push(a)},{amount:.12});animations.push(animate('.hero-copy',{opacity:[0,1],y:[28,0]},{duration:.9}));animations.push(animate('.logo-play',{rotate:[-12,-7,-12],y:[0,-12,0]},{duration:7,repeat:Infinity,ease:'easeInOut'}));}
$('.logo-play').addEventListener('click',()=>{if(paused)return;const el=$('.logo-play svg');el.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(12deg) scale(.9)',offset:.35},{transform:'rotate(-7deg) scale(1.06)',offset:.7},{transform:'rotate(0) scale(1)'}],{duration:900,easing:'cubic-bezier(.2,.8,.2,1)'})});
const fine=matchMedia('(hover: hover) and (pointer: fine)');const dot=$('#cursor'),ring=$('#cursor-ring');let x=0,y=0,rx=0,ry=0,hasPointer=false;
if(fine.matches&&!reduced.matches){document.body.classList.add('custom-cursor');document.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!hasPointer){rx=x;ry=y;hasPointer=true}dot.style.opacity=ring.style.opacity='1';dot.style.transform=`translate(${x-3}px,${y-3}px)`;document.body.classList.toggle('cursor-hover',!!e.target.closest('a,button'))});document.addEventListener('pointerleave',()=>{dot.style.opacity=ring.style.opacity='0';hasPointer=false});function tick(){rx+=(x-rx)*(paused?1:.2);ry+=(y-ry)*(paused?1:.2);const size=document.body.classList.contains('cursor-hover')?48:32;ring.style.transform=`translate(${rx-size/2}px,${ry-size/2}px)`;requestAnimationFrame(tick)}tick()}
function progress(){const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(max>0?scrollY/max*100:0)+'%'}addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);progress();
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$$('.project').forEach(p=>{p.hidden=b.dataset.filter!=='all'&&p.dataset.category!==b.dataset.filter;if(!p.hidden&&!paused&&window.Motion)Motion.animate(p,{opacity:[0,1],y:[12,0]},{duration:.35})})}));
const dialog=$('#project-dialog');let projects=[];let trigger=null;
// Content is also embedded below so project details work from a local file URL.
projects=[
  {
    "title": "Causal reinforcement learning",
    "category": "AI & research",
    "status": "Research in progress",
    "kind": "causal",
    "desc": "Teaching trading systems to look beyond correlation.",
    "stack": "Python \u00b7 NOTEARS \u00b7 Structural Causal Models \u00b7 DQN \u00b7 SAC",
    "body": "My final-year project combines causal discovery and reinforcement learning across 30 financial assets. It evaluates Dueling Double DQN and Discrete SAC against non-causal baselines, with statistical significance testing and a seven-model ablation study.",
    "repo": null
  },
  {
    "title": "Document forgery detection",
    "category": "AI & research",
    "status": "May 2026",
    "kind": "document",
    "desc": "Five architectures. One question: can we trust this document?",
    "stack": "Python \u00b7 TensorFlow / PyTorch \u00b7 Computer vision",
    "body": "Implemented and compared Custom CNN, EfficientNetB0, ResNet50, MobileNetV2 and a hybrid architecture for forged or manipulated document classification. Benchmarked accuracy, precision, recall and F1 to compare performance.",
    "repo": "Document-Forgery-Detection"
  },
  {
    "title": "RhythmX",
    "category": "AI & research",
    "status": "June 2024",
    "kind": "music",
    "desc": "A different route to your next favourite track.",
    "stack": "React \u00b7 FastAPI \u00b7 MongoDB \u00b7 scikit-learn \u00b7 Librosa",
    "body": "A full-stack music discovery platform. K-Means groups tracks by energy, valence and tempo; Apriori association rules use community listening patterns to recommend niche tracks beyond mainstream popularity.",
    "repo": "RhytmX"
  },
  {
    "title": "HackSurge X",
    "category": "Web & software",
    "status": "Event website",
    "kind": "hack",
    "desc": "A hackathon experience with an electric first impression.",
    "stack": "HTML \u00b7 CSS \u00b7 JavaScript \u00b7 Canvas",
    "body": "An animated, framework-free event landing page with a countdown, event timeline, Canvas particles and custom cursor interactions. Built for responsive screens and a cinematic event identity.",
    "repo": "HackSurgeX",
    "demo": "https://hack-surge-x.vercel.app/"
  },
  {
    "title": "Bank ATM simulation",
    "category": "Web & software",
    "status": "January 2025",
    "kind": "bank",
    "desc": "Account rules, transactions and data structures in action.",
    "stack": "C++ \u00b7 OOP \u00b7 Stacks \u00b7 Queues \u00b7 Vectors",
    "body": "A console banking simulation covering account registration, authentication and fund transfers. Implements minimum-balance rules and service charges for savings and current accounts.",
    "repo": "Bank_app"
  },
  {
    "title": "AI Mentor",
    "category": "AI & research",
    "status": "NMIT Hacks \u00b7 May 2024",
    "kind": "mentor",
    "desc": "A starting point for students who need a little direction.",
    "stack": "Gemini API \u00b7 Python \u00b7 HTML \u00b7 CSS \u00b7 JavaScript",
    "body": "Built the complete frontend and integrated the Gemini API for personalised academic guidance. Prototyped adaptive, context-aware student support during a 48-hour hackathon.",
    "repo": null
  },
  {
    "title": "UniteBLR",
    "category": "Web & software",
    "status": "Work in progress",
    "kind": "unite",
    "desc": "Bringing campus clubs, people and opportunities together.",
    "stack": "Campus community \u00b7 Product development",
    "body": "A campus clubs platform in development, focused on discovering clubs, events and recruitment opportunities and helping student communities stay connected.",
    "repo": null
  },
  {
    "title": "FontForge",
    "category": "AI & research",
    "status": "Work in progress",
    "kind": "font",
    "desc": "Handwriting has personality. I\u2019m exploring how to preserve it.",
    "stack": "Handwriting generation \u00b7 Experimental project",
    "body": "My handwriting generator project, currently in development. Exploring personalised handwriting generation. The artwork shown here is a typographic illustration, not a generated handwriting sample.",
    "repo": null
  }
];
const escapeHTML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>{const p=projects[Number(b.dataset.project)];if(!p)return;trigger=b;$('#dialog-content').innerHTML=`<div class="section-kicker">${escapeHTML(p.category)} · ${escapeHTML(p.status)}</div><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="large">${escapeHTML(p.desc)}</p><p>${escapeHTML(p.body)}</p><p class="dialog-stack">${escapeHTML(p.stack)}</p><div class="project-links">${p.repo?`<a href="https://github.com/W2Viswajit/${encodeURIComponent(p.repo)}" target="_blank" rel="noopener">GitHub repository <i data-lucide="arrow-up-right"></i></a>`:''}${p.demo?`<a href="${p.demo}" target="_blank" rel="noopener">Live demo <i data-lucide="arrow-up-right"></i></a>`:''}</div>`;iconize();dialog.showModal();document.body.classList.add('dialog-open')}));
$('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');trigger?.focus()});

// A bounded, non-blocking brand preloader. CSS also removes it if JS fails.
const loader=$('#preloader');
if(reduced.matches)loader?.remove();else{setTimeout(()=>loader?.classList.add('dismiss'),1400);setTimeout(()=>loader?.remove(),2200)}
const transientAnimations=new Set();
function tween(el,frames,options={}){if(paused)return;const a=el.animate(frames,{duration:650,easing:'cubic-bezier(.2,.75,.2,1)',...options});transientAnimations.add(a);a.finished.then(()=>transientAnimations.delete(a)).catch(()=>transientAnimations.delete(a));return a}
motionButton.addEventListener('click',()=>{if(paused){transientAnimations.forEach(a=>a.finish());document.documentElement.style.scrollBehavior='auto'}else document.documentElement.style.scrollBehavior=''});
// Split only text nodes, preserving emphasis and line breaks for headings.
$$('h1,main h2').forEach(heading=>{const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);let order=0;nodes.forEach(node=>{const frag=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim()){frag.append(document.createTextNode(word));return}const mask=document.createElement('span');mask.className='word-mask';const inner=document.createElement('span');inner.className='reveal-word';inner.textContent=word;inner.dataset.order=order++;mask.append(inner);frag.append(mask)});node.replaceWith(frag)})});
const headingObserver=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;headingObserver.unobserve(target);if(paused)return;target.querySelectorAll('.reveal-word').forEach((word,i)=>tween(word,[{transform:'translateY(105%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:720,delay:i*45+(target.tagName==='H1'?1550:0),fill:'backwards'}))})},{threshold:.2});$$('h1,main h2').forEach(h=>headingObserver.observe(h));
const activeArtwork=new Set();const artworkObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)activeArtwork.add(e.target);else activeArtwork.delete(e.target)}),{rootMargin:'100px'});$$('.project-art').forEach(el=>artworkObserver.observe(el));
let scheduled=false;function scrollScene(){scheduled=false;if(paused)return;activeArtwork.forEach(el=>{const r=el.getBoundingClientRect(),t=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.75)));el.style.setProperty('--scroll-scale',String(.94+.06*t))});const hero=$('.hero-visual');if(hero.getBoundingClientRect().bottom>0)hero.style.setProperty('--parallax',Math.min(scrollY*.17,70)+'px')}
function queueScene(){if(!scheduled){scheduled=true;requestAnimationFrame(scrollScene)}}addEventListener('scroll',queueScene,{passive:true});addEventListener('resize',queueScene);queueScene();
if(fine.matches){$$('.project-art').forEach(el=>{el.addEventListener('pointermove',e=>{if(paused)return;const r=el.getBoundingClientRect();el.style.setProperty('--tilt-x',((.5-(e.clientY-r.top)/r.height)*5)+'deg');el.style.setProperty('--tilt-y',(((e.clientX-r.left)/r.width-.5)*6)+'deg')});el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')})});$$('.pill,.contact-circle').forEach(el=>{el.addEventListener('pointermove',e=>{if(paused)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}
const logoButton=$('.logo-play');function drawLogo(){if(paused)return;logoButton.classList.remove('logo-drawing');requestAnimationFrame(()=>logoButton.classList.add('logo-drawing'))}setTimeout(drawLogo,1800);logoButton.addEventListener('click',drawLogo);
menu.addEventListener('click',()=>{if(nav.classList.contains('open')){tween(nav,[{opacity:0,transform:'translateY(-12px)'},{opacity:1,transform:'translateY(0)'}],{duration:350});nav.querySelectorAll('a').forEach((el,i)=>tween(el,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:i*30,fill:'backwards'}))}});
// Scale the detail panel from the selected project, with an accessible native dialog.
$$('[data-project]').forEach(button=>button.addEventListener('click',()=>{if(paused||!dialog.open)return;const source=button.closest('.project').querySelector('.project-art').getBoundingClientRect(),dest=dialog.getBoundingClientRect();const dx=source.left+source.width/2-dest.left-dest.width/2,dy=source.top+source.height/2-dest.top-dest.height/2;tween(dialog,[{opacity:0,transform:`translate(${dx*.22}px,${dy*.22}px) scale(.85)`},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:450})}));
reduced.addEventListener('change',()=>{if(reduced.matches){transientAnimations.forEach(a=>a.finish());loader?.remove()}});
