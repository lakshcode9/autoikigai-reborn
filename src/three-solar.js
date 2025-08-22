(()=>{
  const canvas=document.getElementById('solar-canvas');
  if(!canvas || !window.THREE) return;
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,1,0.1,100);
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

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

  // Ground plane (low-poly) representing a roof
  const planeGeo=new THREE.PlaneGeometry(6,3,16,8);
  planeGeo.rotateX(-Math.PI/3.2);
  // add slight random displacement for low-poly facets
  for(let i=0;i<planeGeo.attributes.position.count;i++){
    const y=planeGeo.attributes.position.getY(i);
    planeGeo.attributes.position.setY(i,y+(Math.random()-0.5)*0.05);
  }
  planeGeo.computeVertexNormals();
  const planeMat=new THREE.MeshStandardMaterial({color:0x0f1424,metalness:0.2,roughness:0.8});
  const plane=new THREE.Mesh(planeGeo,planeMat); scene.add(plane);

  // Solar panel array: grid of tilted boxes with emissive neon edges
  const panels=new THREE.Group();
  const panelGeo=new THREE.BoxGeometry(0.9,0.05,0.6);
  const panelMat=new THREE.MeshStandardMaterial({color:0x0b0c10,metalness:0.5,roughness:0.4,emissive:0x111133,emissiveIntensity:0.25});
  for(let x=-2; x<=2; x++){
    for(let z=-1; z<=1; z++){
      const m=new THREE.Mesh(panelGeo,panelMat);
      m.position.set(x*1.05,0.45, z*0.8);
      m.rotation.x=-Math.PI/6;
      panels.add(m);
    }
  }
  scene.add(panels);

  // Sun glow sphere
  const sunGeo=new THREE.SphereGeometry(0.35,16,16);
  const sunMat=new THREE.MeshBasicMaterial({color:0x65e6cf});
  const sun=new THREE.Mesh(sunGeo,sunMat); sun.position.set(-2.2,2.2,-1.2); scene.add(sun);

  // Animate
  let t=0; let mouseX=0, mouseY=0;
  function animate(){
    t+=0.01;
    if(!prefersReduced){
      panels.rotation.y=Math.sin(t*0.3)*0.1;
      sun.position.x = -2.2 + Math.sin(t*0.25)*0.6;
      sun.position.y =  2.2 + Math.cos(t*0.25)*0.4;
    }
    camera.position.x = mouseX*0.5;
    camera.position.y = 2.4 + mouseY*0.3;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  animate();

  if(window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('mousemove',(e)=>{
      const rect=hero.getBoundingClientRect();
      mouseX=((e.clientX-rect.left)/rect.width - 0.5);
      mouseY=((e.clientY-rect.top)/rect.height - 0.5);
    });
  }
  window.addEventListener('resize', resize);
})();


