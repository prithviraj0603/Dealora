(function(){
  const wrap = document.getElementById('heroCanvasWrap');
  const canvas = document.getElementById('heroCanvas');
  if(!window.THREE || !wrap || !canvas) return;

  const inkColor = 0x14181C;
  const blueprint = 0x2F5D8A;
  const amber = 0xD9A441;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6.5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize(){
    const size = wrap.clientWidth;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // core wireframe form — icosahedron, standing in for "the product"
  const coreGeo = new THREE.IcosahedronGeometry(1.7, 0);
  const coreEdges = new THREE.EdgesGeometry(coreGeo);
  const coreMat = new THREE.LineBasicMaterial({ color: inkColor, transparent:true, opacity:0.85 });
  const core = new THREE.LineSegments(coreEdges, coreMat);
  scene.add(core);

  // faint solid fill so it doesn't feel like a wire skeleton floating in nothing
  const fillMat = new THREE.MeshBasicMaterial({ color: 0xDCDFD6, transparent:true, opacity:0.5 });
  const fill = new THREE.Mesh(coreGeo, fillMat);
  scene.add(fill);

  // orbiting "spec point" markers — amber + blueprint accents
  const markers = [];
  const markerColors = [amber, blueprint, amber];
  for(let i=0;i<3;i++){
    const geo = new THREE.SphereGeometry(0.07, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: markerColors[i] });
    const m = new THREE.Mesh(geo, mat);
    const radius = 2.5 + i*0.25;
    m.userData = { radius, speed: 0.4 + i*0.15, offset: i*2.1, tilt: 0.3 + i*0.2 };
    scene.add(m);
    markers.push(m);
  }

  // thin orbit rings for structure
  markers.forEach((m, i)=>{
    const ringGeo = new THREE.RingGeometry(m.userData.radius-0.004, m.userData.radius+0.004, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x9AA5AC, side: THREE.DoubleSide, transparent:true, opacity:0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI/2 + m.userData.tilt;
    scene.add(ring);
  });

  let targetRotX = 0.3, targetRotY = 0.5;
  let curRotX = targetRotX, curRotY = targetRotY;

  wrap.addEventListener('mousemove', (e)=>{
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    targetRotY = 0.5 + x*0.8;
    targetRotX = 0.3 + y*0.6;
  });

  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    curRotX += (targetRotX - curRotX)*0.05;
    curRotY += (targetRotY - curRotY)*0.05;
    core.rotation.x = curRotX + t*0.05;
    core.rotation.y = curRotY + t*0.08;
    fill.rotation.copy(core.rotation);

    markers.forEach((m)=>{
      const { radius, speed, offset, tilt } = m.userData;
      const angle = t*speed + offset;
      m.position.set(
        Math.cos(angle)*radius,
        Math.sin(angle)*radius*Math.sin(tilt),
        Math.sin(angle)*radius*Math.cos(tilt)
      );
    });

    renderer.render(scene, camera);
  }
  animate();
})();
