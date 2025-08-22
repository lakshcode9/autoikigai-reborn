document.addEventListener('DOMContentLoaded',()=>{
  const yearEl=document.getElementById('y');
  if(yearEl){yearEl.textContent=String(new Date().getFullYear());}

  // Mobile detection
  const isMobile = window.matchMedia('(max-width: 960px)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Smooth scroll for internal anchors (mobile-optimized)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id && id.length>1){
        const target=document.querySelector(id);
        if(target){
          e.preventDefault();
          // Mobile-optimized scroll behavior
          const scrollOptions = isMobile ? 
            {behavior:'smooth',block:'start',inline:'nearest'} : 
            {behavior:'smooth',block:'start'};
          target.scrollIntoView(scrollOptions);
        }
      }
    });
  });

  // Mobile menu toggle with improved UX
  const toggle=document.querySelector('.menu-toggle');
  const headerEl=document.querySelector('.site-header');
  if(toggle && headerEl){
    toggle.addEventListener('click',()=>{
      const open=headerEl.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      
      // Mobile-specific: close menu on escape key
      if(open) {
        const handleEscape = (e) => {
          if(e.key === 'Escape') {
            headerEl.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded','false');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
          }
        };
        document.addEventListener('keydown', handleEscape);
      }
    });
    
    // close on nav link click
    headerEl.querySelectorAll('.nav a').forEach(link=>{
      link.addEventListener('click',()=>{
        headerEl.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded','false');
        document.body.style.overflow='';
      });
    });
    
    // Close menu on outside click (mobile)
    if(isMobile) {
      document.addEventListener('click', (e) => {
        if(!headerEl.contains(e.target) && headerEl.classList.contains('menu-open')) {
          headerEl.classList.remove('menu-open');
          toggle.setAttribute('aria-expanded','false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Accessible Industries dropdown (desktop hover + click, mobile tap to open)
  const submenuWrap=document.querySelector('.nav-item.has-submenu');
  const submenuBtn=document.querySelector('.submenu-toggle');
  console.log('Submenu elements found:', { submenuWrap, submenuBtn });
  if(submenuWrap && submenuBtn){
    const openSub=(state)=>{
      submenuWrap.classList.toggle('submenu-open', state);
      submenuBtn.setAttribute('aria-expanded', state?'true':'false');
    };
    // Click/tap toggle
    submenuBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const isOpen=submenuWrap.classList.contains('submenu-open');
      openSub(!isOpen);
    });
    // Hover for desktop
    if(window.matchMedia('(pointer:fine)').matches){
      submenuWrap.addEventListener('mouseenter',()=>openSub(true));
      submenuWrap.addEventListener('mouseleave',()=>openSub(false));
    }
    // Close on outside click
    document.addEventListener('click',(e)=>{
      if(!submenuWrap.contains(e.target)) openSub(false);
    });
    // Close when navigating via submenu links
    submenuWrap.querySelectorAll('.submenu-link').forEach(l=>{
      l.addEventListener('click',()=>openSub(false));
    });
  }

  // Chat demo sequencing (mobile-optimized)
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
      // sequence (slower on mobile for better readability)
      let t=400; // ms
      const interval = isMobile ? 2000 : 1600; // Longer delays on mobile
      bubbles.forEach((b,i)=>{ show(b, t); t += interval; });
      setTimeout(()=>{
        replay.style.transition='opacity .5s ease, transform .5s ease';
        replay.style.opacity='1';
        replay.style.transform='translateY(0)';
      }, t);
    };

    replay?.addEventListener('click', run);
    run();
  }

  // Mobile-optimized scroll reveal
  const revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length>0 && 'IntersectionObserver' in window){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in');
          // stagger children if applicable (mobile-optimized)
          if(e.target.classList.contains('reveal-stagger')){
            const children=[...e.target.children];
            const staggerDelay = isMobile ? 100 : 60; // Slower stagger on mobile
            children.forEach((c,idx)=>{
              c.style.transitionDelay=`${idx*staggerDelay}ms`;
            });
          }
        }
      });
    },{threshold: isMobile ? 0.1 : 0.15}); // Lower threshold on mobile
    revealEls.forEach(el=>io.observe(el));
  }

  // Mobile-optimized parallax for hero orbs
  const hero=document.querySelector('.hero-art');
  const orbs=document.querySelectorAll('.orb');
  if(hero && orbs.length){
    let mouseX=0, mouseY=0, scrollY=0, rafId=null;
    let touchX=0, touchY=0;
    
    const animate=()=>{
      orbs.forEach((o,idx)=>{
        const depth=(idx+1)*6; // 6,12,18
        let tx, ty;
        
        if(isMobile && isTouch) {
          // Touch-based movement (reduced for mobile)
          tx = (touchX-0.5)*depth*0.5;
          ty = (touchY-0.5)*depth*0.5 + scrollY*0.03*depth/6;
        } else {
          // Mouse-based movement
          tx = (mouseX-0.5)*depth;
          ty = (mouseY-0.5)*depth + scrollY*0.05*depth/6;
        }
        
        o.style.transform=`translate3d(${tx}px,${ty}px,0)`;
      });
      rafId=requestAnimationFrame(animate);
    };

    // Touch events for mobile
    if(isMobile && isTouch) {
      hero.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = hero.getBoundingClientRect();
        touchX = (touch.clientX - rect.left) / rect.width;
        touchY = (touch.clientY - rect.top) / rect.height;
      });
      
      hero.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = hero.getBoundingClientRect();
        touchX = (touch.clientX - rect.left) / rect.width;
        touchY = (touch.clientY - rect.top) / rect.height;
      });
      
      hero.addEventListener('touchend', () => {
        // Reset to center
        touchX = 0.5;
        touchY = 0.5;
      });
    }

    // Mouse events for desktop
    if(!isMobile) {
      hero.addEventListener('mousemove',(e)=>{
        const rect=hero.getBoundingClientRect();
        mouseX=(e.clientX-rect.left)/rect.width;
        mouseY=(e.clientY-rect.top)/rect.height;
      });
    }

    // Scroll-based movement
    window.addEventListener('scroll',()=>{
      scrollY=window.scrollY;
    });

    // Start animation only if not reduced motion
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }

    // Cleanup
    return () => {
      if(rafId) cancelAnimationFrame(rafId);
    };
  }

  // Mobile-optimized lead flow animation
  const flow=document.getElementById('lead-flow');
  if(flow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const svg=flow.querySelector('.flow-svg');
    const dots=flow.querySelectorAll('.flow .dot');
    const kpis=flow.querySelectorAll('.kpi span');
    
    if(svg && dots.length && kpis.length){
      const path=svg.querySelector('path');
      if(path){
        const pathLength=path.getTotalLength();
        let t=0;
        
        const animateFlow=()=>{
          t+=0.005; // Slower on mobile
          if(t>1) t=0;
          
          dots.forEach((dot,idx)=>{
            const offset=(t+idx*0.33)%1;
            const point=path.getPointAtLength(offset*pathLength);
            dot.style.transform=`translate(${point.x}px,${point.y}px)`;
          });
          
          requestAnimationFrame(animateFlow);
        };
        
        // Only animate when visible (mobile performance)
        if('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if(entry.isIntersecting) {
                animateFlow();
              }
            });
          }, { threshold: 0.1 });
          observer.observe(flow);
        } else {
          animateFlow();
        }
      }
    }

    // KPI counter animation (mobile-optimized)
    if('IntersectionObserver' in window){
      const kpiObserver=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const target=entry.target;
            const final=parseInt(target.dataset.value)||0;
            const duration=isMobile ? 2000 : 1500; // Slower on mobile
            const increment=final/(duration/16);
            let current=0;
            
            const counter=setInterval(()=>{
              current+=increment;
              if(current>=final){
                target.textContent=final;
                clearInterval(counter);
              }else{
                target.textContent=Math.floor(current);
              }
            },16);
            
            kpiObserver.unobserve(target);
          }
        });
      },{threshold:0.5});
      
      kpis.forEach(kpi=>kpiObserver.observe(kpi));
    }
  }

  // Mobile-optimized sticky header
  let lastScrollY=window.scrollY;
  let ticking=false;
  
  const updateHeader=()=>{
    const header=document.querySelector('.site-header');
    if(header){
      if(window.scrollY>100){
        header.classList.add('scrolled');
      }else{
        header.classList.remove('scrolled');
      }
    }
    ticking=false;
  };

  window.addEventListener('scroll',()=>{
    lastScrollY=window.scrollY;
    if(!ticking){
      requestAnimationFrame(updateHeader);
      ticking=true;
    }
  });

  // Mobile-optimized sticky CTA visibility
  const mobileCta=document.querySelector('.mobile-cta');
  if(mobileCta && isMobile){
    const ctaSection=document.querySelector('.cta');
    const footer=document.querySelector('.site-footer');
    const calEmbed=document.querySelector('#my-cal-inline-intro-meet');
    
    const updateCtaVisibility=()=>{
      if(ctaSection && footer){
        const ctaRect=ctaSection.getBoundingClientRect();
        const footerRect=footer.getBoundingClientRect();
        const calRect=calEmbed?.getBoundingClientRect();
        
        // Hide near CTA section, footer, or Cal.com embed
        const shouldHide=ctaRect.top<window.innerHeight || 
                        footerRect.top<window.innerHeight ||
                        (calRect && calRect.top<window.innerHeight);
        
        mobileCta.style.opacity=shouldHide?'0':'1';
        mobileCta.style.pointerEvents=shouldHide?'none':'auto';
      }
    };
    
    // Throttled scroll handler for mobile performance
    let scrollTimeout;
    window.addEventListener('scroll',()=>{
      if(scrollTimeout) return;
      scrollTimeout=setTimeout(()=>{
        updateCtaVisibility();
        scrollTimeout=null;
      },100);
    });
    
    updateCtaVisibility();
  }

  // Mobile performance optimizations
  if(isMobile) {
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 960px) {
        .orb { transition: transform 0.3s ease; }
        .step:hover { transform: none !important; }
        .feature-card:hover { transform: none !important; }
      }
    `;
    document.head.appendChild(style);
    
    // Lazy load non-critical elements
    if('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
          }
        });
      });
      
      // Observe elements that can be lazy loaded
      document.querySelectorAll('.step, .price-card, .feature-card').forEach(el => {
        lazyObserver.observe(el);
      });
    }
  }
});


