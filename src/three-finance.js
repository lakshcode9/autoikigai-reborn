(()=>{
  const canvas=document.getElementById('finance-canvas');
  if(!canvas||!window.THREE) return;
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile=window.matchMedia('(max-width: 960px)').matches;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,1,0.1,100);
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!isMobile,alpha:true});
  renderer.setPixelRatio(isMobile?1:Math.min(window.devicePixelRatio,2));

  const host=document.querySelector('.hero-art');
  function resize(){
    const r=host.getBoundingClientRect();
    renderer.setSize(r.width,r.height,false);
    camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
  }
  resize();

  camera.position.set(0,2.2,6);
  scene.add(new THREE.AmbientLight(0x88aaff,0.8));
  const dir=new THREE.DirectionalLight(0xffffff,1.0);dir.position.set(3,5,2);scene.add(dir);

  // Ground grid
  const grid=new THREE.GridHelper(12,24,0x223355,0x1a2235);grid.position.y=-1.2;scene.add(grid);

  // Low-poly financial line (zigzag) with neon material
  const points=[]; const segments=isMobile?24:40;
  for(let i=0;i<=segments;i++){
    const x=(i/segments)*8-4;
    const y=Math.sin(i*0.45)*0.6 + Math.max(0,(i/segments-0.6))*0.8; // trending up
    points.push(new THREE.Vector3(x,y,0));
  }
  const curve=new THREE.CatmullRomCurve3(points);
  const tubeGeo=new THREE.TubeGeometry(curve,segments,0.06,8,false);
  const tubeMat=new THREE.MeshStandardMaterial({color:0x65e6cf, emissive:0x1a3b38, emissiveIntensity:0.8, metalness:0.2, roughness:0.3});
  const tube=new THREE.Mesh(tubeGeo,tubeMat); scene.add(tube);

  // Glow dots moving along the curve
  const dotGeo=new THREE.SphereGeometry(0.12, isMobile?8:16, isMobile?8:16);
  const dotMat=new THREE.MeshBasicMaterial({color:0x6d6afc});
  const dot1=new THREE.Mesh(dotGeo,dotMat);scene.add(dot1);
  const dot2=new THREE.Mesh(dotGeo,new THREE.MeshBasicMaterial({color:0x65e6cf}));scene.add(dot2);

  // Subtle camera parallax
  let mouseX=0, mouseY=0, t=0, raf;
  function animate(){
    t+=isMobile?0.005:0.01;
    if(!prefersReduced){
      const len=curve.getLength();
      const p1=curve.getPointAt((t*0.1)%1); dot1.position.copy(p1);
      const p2=curve.getPointAt(((t*0.1)+0.25)%1); dot2.position.copy(p2);
      grid.rotation.y = Math.sin(t*0.2)*0.1;
      tube.rotation.y = Math.sin(t*0.15)*0.05;
    }
    camera.position.x = mouseX*0.5;
    camera.position.y = 2.2 + mouseY*0.2;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    raf=requestAnimationFrame(animate);
  }
  animate();

  if(!isMobile && window.matchMedia('(pointer:fine)').matches){
    host.addEventListener('mousemove',(e)=>{
      const r=host.getBoundingClientRect();
      mouseX=((e.clientX-r.left)/r.width - 0.5);
      mouseY=((e.clientY-r.top)/r.height - 0.5);
    });
  } else {
    host.addEventListener('touchmove',(e)=>{
      const r=host.getBoundingClientRect();
      const t=e.touches[0];
      mouseX=((t.clientX-r.left)/r.width - 0.5);
      mouseY=((t.clientY-r.top)/r.height - 0.5);
    },{passive:true});
  }

  let resizeTimeout; window.addEventListener('resize',()=>{clearTimeout(resizeTimeout);resizeTimeout=setTimeout(resize,120)});

  // Pause when not visible
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ animate(); } else { cancelAnimationFrame(raf); }
      });
    },{threshold:0.1});
    io.observe(canvas);
  }
})();


