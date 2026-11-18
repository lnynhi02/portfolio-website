(function(){
  var cv=document.getElementById('space');
  if(!cv||!cv.getContext)return;
  var ctx=cv.getContext('2d');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W=0,H=0,stars=[],shoot=null,nextShoot=2000,mx=0,my=0,t=0,TAU=Math.PI*2;
  function size(){
    var dpr=Math.min(window.devicePixelRatio||1,2);
    W=window.innerWidth;H=window.innerHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var n=Math.round(Math.min(280,W*H/5500));stars=[];
    for(var i=0;i<n;i++){var z=.2+Math.random()*.8;stars.push({x:Math.random()*W,y:Math.random()*H,z:z,r:z*1.3,ph:Math.random()*TAU,sp:.5+Math.random()*1.5});}
  }
  function blob(x,y,r,c){var g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
  function draw(dt){
    var sy=window.scrollY||0,i,s,x,y,a;
    ctx.clearRect(0,0,W,H);
    blob(W*.15,H*.8,W*.6,'rgba(255,255,255,.05)');
    blob(W*.9,H*.15-sy*.1,W*.55,'rgba(200,200,200,.05)');
    for(i=0;i<stars.length;i++){
      s=stars[i];
      x=((s.x+t*.006*s.z+mx*s.z*10)%W+W)%W;y=((s.y-sy*s.z*.2+t*.002*s.z)%H+H)%H;
      a=.35+.65*(.5+.5*Math.sin(t*.002*s.sp+s.ph));
      ctx.fillStyle='rgba(255,255,255,'+(a*s.z)+')';
      ctx.beginPath();ctx.arc(x,y,s.r,0,TAU);ctx.fill();
    }
    if(!reduce){
      nextShoot-=dt;
      if(nextShoot<0&&!shoot){shoot={x:Math.random()*W*.8+W*.2,y:Math.random()*H*.4,life:0};nextShoot=6000+Math.random()*4000;}
      if(shoot){
        shoot.life+=dt;shoot.x-=dt*.7;shoot.y+=dt*.3;
        a=1-shoot.life/900;
        if(a<=0){shoot=null;}else{
          var g=ctx.createLinearGradient(shoot.x,shoot.y,shoot.x+110,shoot.y-47);
          g.addColorStop(0,'rgba(255,255,255,'+a+')');g.addColorStop(1,'rgba(255,255,255,0)');
          ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(shoot.x,shoot.y);ctx.lineTo(shoot.x+110,shoot.y-47);ctx.stroke();
        }
      }
    }
  }
  var last=0;
  function loop(ts){var dt=Math.min(ts-last,64);last=ts;t=ts;if(!document.hidden)draw(dt);requestAnimationFrame(loop);}
  window.addEventListener('pointermove',function(e){mx=e.clientX/W*2-1;my=e.clientY/H*2-1;});
  window.addEventListener('resize',function(){size();if(reduce)draw(0);});
  size();
  if(reduce){draw(0);window.addEventListener('scroll',function(){draw(0);},{passive:true});}else{requestAnimationFrame(loop);}
})();
(function(){
  var btn=document.getElementById('next');
  var secs=[document.querySelector('.hero'),document.getElementById('about'),document.getElementById('career'),document.getElementById('work'),document.getElementById('contact')];
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cur(){var y=window.innerHeight*.4,c=0;for(var i=0;i<secs.length;i++){if(secs[i].getBoundingClientRect().top<=y)c=i;}return c;}
  function update(){
    var last=cur()===secs.length-1||window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4;
    btn.classList.toggle('up',last);
    btn.setAttribute('aria-label',last?'Back to top':'Next section');
  }
  btn.addEventListener('click',function(){
    var b=reduce?'auto':'smooth';
    if(btn.classList.contains('up')){window.scrollTo({top:0,behavior:b});}
    else{secs[cur()+1].scrollIntoView({behavior:b,block:'start'});}
  });
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  update();
})();
(function(){
  var map=[];
  document.querySelectorAll('nav a[href^="#"]').forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)map.push({a:a,s:s});});
  function spy(){
    var y=window.innerHeight*.35,cur=null;
    map.forEach(function(m){if(m.s.getBoundingClientRect().top<=y)cur=m;});
    if(map.length&&window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=map[map.length-1];
    map.forEach(function(m){var on=m===cur;m.a.classList.toggle('active',on);if(on)m.a.setAttribute('aria-current','true');else m.a.removeAttribute('aria-current');});
  }
  window.addEventListener('scroll',spy,{passive:true});
  window.addEventListener('resize',spy);
  spy();
})();
(function(){
  var popup=document.querySelector('.projects__popup');
  if(!popup)return;
  var img=popup.querySelector('.projects__popup-img');
  var title=popup.querySelector('.detail__title');
  var body=popup.querySelector('.projects__popup-body');
  var close=popup.querySelector('.projects__popup-close');
  function open(card){
    var name=(card.querySelector('h3')||{textContent:''}).textContent;
    img.src=card.getAttribute('data-popup-image')||'';
    img.alt=name+' architecture';
    title.textContent=name;
    var detail=card.querySelector('.project__detail');
    body.innerHTML=detail?detail.innerHTML:'';
    popup.classList.add('open');
    document.body.classList.add('modal-open');
    close.focus();
  }
  function hide(){
    popup.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
  document.addEventListener('click',function(e){
    if(e.target===popup||e.target.closest('.projects__popup-close')){hide();return;}
    if(e.target.closest('.projects__popup'))return;
    if(e.target.closest('.project a'))return;
    var card=e.target.closest('.project');
    if(card)open(card);
  });
  document.addEventListener('keydown',function(e){
    if(!popup.classList.contains('open'))return;
    if(e.key==='Escape')hide();
    if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('project')){e.preventDefault();open(e.target);}
  });
})();
(function(){
  var form=document.getElementById('contact-form');
  if(!form)return;
  var message=document.getElementById('contact-message');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var params={
      name:document.getElementById('name').value,
      email:document.getElementById('email').value,
      subject:document.getElementById('subject').value,
      message:document.getElementById('message').value
    };
    if(typeof emailjs==='undefined'){
      var body='From: '+params.name+' ('+params.email+')\n\n'+params.message;
      window.location.href='mailto:ynnhi1508@gmail.com?subject='+encodeURIComponent(params.subject)+'&body='+encodeURIComponent(body);
      return;
    }
    emailjs.send('service_firhis3','template_7pkppgf',params,'jlCh7Vr71n0vHJ6_O')
      .then(function(){
        message.textContent='Message sent successfully ✅';
        form.reset();
        setTimeout(function(){message.textContent='';},5000);
      })
      .catch(function(){message.textContent='Failed to send message ❌';});
  });
})();
