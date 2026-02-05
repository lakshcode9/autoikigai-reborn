(()=>{
  const canvas=document.getElementById('solar-canvas');
  if(!canvas || !window.THREE) return;
  
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile=window.matchMedia('(max-width: 960px)').matches;
  const isHighDPI=window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,1,0.1,100);
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!isMobile,alpha:true});
  
  // Mobile-optimized renderer settings
  if(isMobile) {
    renderer.setPixelRatio(1); // Force 1:1 pixel ratio on mobile for performance
    renderer.setSize(canvas.width, canvas.height, false);
  } else {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  }

  const hero=document.querySelector('.hero-art');
  function resize(){
    const rect=hero.getBoundingClientRect();
    const w=rect.width, h=rect.height;
    renderer.setSize(w,h,false);
    camera.aspect=w/h; camera.updateProjectionMatrix();
  }
  resize();

  camera.position.set(0,2.4,6);
  scene.add(new THREE.AmbientLight(0x88aaff,0.7));
  const dir=new THREE.DirectionalLight(0xffffff,1.0); dir.position.set(3,5,2); scene.add(dir);

  // Mobile-optimized ground plane (reduced polygons)
  const planeSegments = isMobile ? 8 : 16;
  const planeGeo=new THREE.PlaneGeometry(6,3,planeSegments,planeSegments/2);
  planeGeo.rotateX(-Math.PI/3.2);
  // add slight random displacement for low-poly facets
  for(let i=0;i<planeGeo.attributes.position.count;i++){
    const y=planeGeo.attributes.position.getY(i);
    planeGeo.attributes.position.setY(i,y+(Math.random()-0.5)*0.05);
  }
  planeGeo.computeVertexNormals();
  const planeMat=new THREE.MeshStandardMaterial({color:0x0f1424,metalness:0.2,roughness:0.8});
  const plane=new THREE.Mesh(planeGeo,planeMat); scene.add(plane);

  // Mobile-optimized solar panel array (fewer panels on mobile)
  const panels=new THREE.Group();
  const panelGeo=new THREE.BoxGeometry(0.9,0.05,0.6);
  const panelMat=new THREE.MeshStandardMaterial({color:0x0b0c10,metalness:0.5,roughness:0.4,emissive:0x111133,emissiveIntensity:0.25});
  
  const panelCount = isMobile ? 6 : 15; // Reduce panels on mobile
  const panelRows = isMobile ? 2 : 3;
  const panelCols = isMobile ? 3 : 5;
  
  for(let x=0; x<panelCols; x++){
    for(let z=0; z<panelRows; z++){
      const m=new THREE.Mesh(panelGeo,panelMat);
      m.position.set((x-1)*1.05,0.45, (z-0.5)*0.8);
      m.rotation.x=-Math.PI/6;
      panels.add(m);
    }
  }
  scene.add(panels);

  // Sun glow sphere (smaller on mobile)
  const sunSize = isMobile ? 0.25 : 0.35;
  const sunGeo=new THREE.SphereGeometry(sunSize,isMobile ? 8 : 16,isMobile ? 8 : 16);
  const sunMat=new THREE.MeshBasicMaterial({color:0x65e6cf});
  const sun=new THREE.Mesh(sunGeo,sunMat); sun.position.set(-2.2,2.2,-1.2); scene.add(sun);

  // Mobile-optimized animation
  let t=0; let mouseX=0, mouseY=0; let touchX=0, touchY=0;
  let animationFrameId;
  
  function animate(){
    t+=isMobile ? 0.005 : 0.01; // Slower animation on mobile
    
    if(!prefersReduced){
      panels.rotation.y=Math.sin(t*0.3)*0.1;
      sun.position.x = -2.2 + Math.sin(t*0.25)*0.6;
      sun.position.y =  2.2 + Math.cos(t*0.25)*0.4;
    }
    
    // Mobile-optimized camera movement
    if(isMobile) {
      camera.position.x = touchX*0.3; // Reduced movement on mobile
      camera.position.y = 2.4 + touchY*0.2;
    } else {
      camera.position.x = mouseX*0.5;
      camera.position.y = 2.4 + mouseY*0.3;
    }
    
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    animationFrameId = requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();

  // Touch controls for mobile
  if(isMobile) {
    let isTouching = false;
    
    hero.addEventListener('touchstart', (e) => {
      e.preventDefault();
      isTouching = true;
      const touch = e.touches[0];
      const rect = hero.getBoundingClientRect();
      touchX = ((touch.clientX - rect.left) / rect.width - 0.5);
      touchY = ((touch.clientY - rect.top) / rect.height - 0.5);
    });
    
    hero.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!isTouching) return;
      const touch = e.touches[0];
      const rect = hero.getBoundingClientRect();
      touchX = ((touch.clientX - rect.left) / rect.width - 0.5);
      touchY = ((touch.clientY - rect.top) / rect.height - 0.5);
    });
    
    hero.addEventListener('touchend', () => {
      isTouching = false;
      // Reset to center
      touchX = 0;
      touchY = 0;
    });
  }

  // Mouse controls for desktop
  if(!isMobile && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('mousemove',(e)=>{
      const rect=hero.getBoundingClientRect();
      mouseX=((e.clientX-rect.left)/rect.width - 0.5);
      mouseY=((e.clientY-rect.top)/rect.height - 0.5);
    });
  }
  
  // Optimized resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100); // Debounce resize
  });
  
  // Cleanup function
  function cleanup() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    renderer.dispose();
    // Dispose geometries and materials
    planeGeo.dispose();
    panelGeo.dispose();
    sunGeo.dispose();
    planeMat.dispose();
    panelMat.dispose();
    sunMat.dispose();
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
  
  // Pause animation when not visible (mobile performance)
  if (isMobile && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
  }
})();


