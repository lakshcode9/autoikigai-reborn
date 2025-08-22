document.addEventListener('DOMContentLoaded',()=>{
  const yearEl=document.getElementById('y');
  if(yearEl){yearEl.textContent=String(new Date().getFullYear());}

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id && id.length>1){
        const target=document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // Chat demo sequencing
  const chat=document.getElementById('chat-demo');
  if(chat){
    const bubbles=Array.from(chat.querySelectorAll('.bubble'));
    const replay=chat.querySelector('.chat-replay');

    const show = (el, delay)=>{
      setTimeout(()=>{
        el.style.transition='opacity .5s ease, transform .5s ease';
        el.style.opacity='1';
        el.style.transform='translateY(0)';
      }, delay);
    };

    const run=()=>{
      // reset
      bubbles.forEach(b=>{b.style.opacity='0';b.style.transform='translateY(6px)';});
      replay.style.opacity='0';
      replay.style.transform='translateY(6px)';
      // sequence
      let t=400; // ms
      bubbles.forEach((b,i)=>{ show(b, t); t += 1600; });
      setTimeout(()=>{
        replay.style.transition='opacity .5s ease, transform .5s ease';
        replay.style.opacity='1';
        replay.style.transform='translateY(0)';
      }, t);
    };

    replay?.addEventListener('click', run);
    run();
  }

  // Scroll reveal
  const revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length>0 && 'IntersectionObserver' in window){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          // stagger children if applicable
          if(e.target.classList.contains('reveal-stagger')){
            const children=[...e.target.children];
            children.forEach((c,idx)=>{
              c.style.transitionDelay=`${idx*60}ms`;
            });
          }
        }
      });
    },{threshold:0.15});
    revealEls.forEach(el=>io.observe(el));
  }

  // Simple parallax for hero orbs
  const hero=document.querySelector('.hero-art');
  const orbs=document.querySelectorAll('.orb');
  if(hero && orbs.length){
    let mouseX=0, mouseY=0, scrollY=0, rafId=null;
    const animate=()=>{
      orbs.forEach((o,idx)=>{
        const depth=(idx+1)*6; // 6,12,18
        const tx=(mouseX-0.5)*depth;
        const ty=(mouseY-0.5)*depth + scrollY*0.05*depth/6;
        o.style.transform=`translate3d(${tx}px, ${ty}px, 0)`;
      });
      rafId=requestAnimationFrame(animate);
    };
    hero.addEventListener('mousemove',(e)=>{
      const rect=hero.getBoundingClientRect();
      mouseX=(e.clientX-rect.left)/rect.width;
      mouseY=(e.clientY-rect.top)/rect.height;
    });
    window.addEventListener('scroll',()=>{ scrollY=window.scrollY||0; });
    rafId=requestAnimationFrame(animate);
  }

  // Lead-flow animation
  const flow=document.getElementById('lead-flow');
  if(flow){
    const svg=flow.querySelector('.flow-svg');
    const path=svg.querySelector('#flow-path');
    const dot=svg.querySelector('.dot');
    const oldEl=document.getElementById('kpi-old');
    const actEl=document.getElementById('kpi-activated');
    const bookEl=document.getElementById('kpi-booked');
    let started=false;

    const length=path.getTotalLength();
    const counters={old:0, act:0, book:0};
    const lerp=(a,b,t)=>Math.round(a+(b-a)*t);

    const animateFlow=()=>{
      let t=0; const dur=4500; const start=performance.now();
      const step=(now)=>{
        t=Math.min(1,(now-start)/dur);
        const p=path.getPointAtLength(t*length);
        dot.setAttribute('cx',p.x); dot.setAttribute('cy',p.y);
        oldEl.textContent=lerp(0, 5000, t);
        actEl.textContent=lerp(0, 3200, t);
        bookEl.textContent=lerp(0, 240, t);
        if(t<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const startOnce=()=>{ if(!started){ started=true; animateFlow(); }};
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting) startOnce(); });
      },{threshold:0.3});
      io.observe(flow);
    }else{ startOnce(); }
  }

  // Sticky header on scroll
  const header=document.querySelector('.site-header');
  if(header){
    const onScroll=()=>{
      if((window.scrollY||document.documentElement.scrollTop) > 8){
        header.classList.add('scrolled');
      }else{
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }
});


