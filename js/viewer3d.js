/* Elementa — ortak 3D görüntüleyici (Three.js) */
(function () {
  'use strict';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function create(container, opts = {}) {
    if (!window.THREE) {
      container.innerHTML = '<div class="viewer-error">3D kütüphanesi yüklenemedi. İnternet bağlantını kontrol et.</div>';
      return null;
    }
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      container.innerHTML = '<div class="viewer-error">Tarayıcın WebGL desteklemiyor.</div>';
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);
    let distance = opts.distance || 14;
    let minD = distance * 0.4, maxD = distance * 2.5;
    camera.position.set(0, 0, distance);

    scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x1a2140, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(6, 10, 12);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7aa2ff, 0.45);
    rim.position.set(-10, -6, -8);
    scene.add(rim);

    const root = new THREE.Group();
    scene.add(root);

    const st = {
      rotX: opts.tilt ?? 0.4, rotY: opts.spin ?? 0, velX: 0, velY: 0,
      auto: opts.autoRotate !== false, dragging: false, lx: 0, ly: 0, running: true,
    };
    const el = renderer.domElement;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', (e) => {
      st.dragging = true; st.lx = e.clientX; st.ly = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.classList.add('grabbing');
    });
    el.addEventListener('pointermove', (e) => {
      if (!st.dragging) return;
      st.velY = (e.clientX - st.lx) * 0.008;
      st.velX = (e.clientY - st.ly) * 0.008;
      st.rotY += st.velY;
      st.rotX = clamp(st.rotX + st.velX, -1.55, 1.55);
      st.lx = e.clientX; st.ly = e.clientY;
    });
    const end = () => { st.dragging = false; el.classList.remove('grabbing'); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      distance = clamp(distance * (e.deltaY > 0 ? 1.1 : 0.9), minD, maxD);
    }, { passive: false });

    function resize() {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(container);
    resize();

    const callbacks = [];
    const clock = new THREE.Clock();
    let t = 0;
    function frame() {
      requestAnimationFrame(frame);
      if (!st.running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      if (!st.dragging) {
        st.velX *= 0.92; st.velY *= 0.92;
        st.rotY += st.velY;
        st.rotX = clamp(st.rotX + st.velX, -1.55, 1.55);
        if (st.auto) st.rotY += dt * 0.3;
      }
      camera.position.z += (distance - camera.position.z) * 0.12;
      root.rotation.set(st.rotX, st.rotY, 0);
      for (const cb of callbacks) cb(dt, t);
      renderer.render(scene, camera);
    }
    frame();

    function clear() {
      callbacks.length = 0;
      while (root.children.length) {
        const c = root.children[0];
        root.remove(c);
        c.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        });
      }
    }

    return {
      scene, camera, renderer, root,
      onFrame(cb) { callbacks.push(cb); },
      clear,
      setDistance(d) { distance = d; minD = d * 0.4; maxD = d * 2.5; },
      setRunning(v) { st.running = v; if (v) { clock.getDelta(); resize(); } },
      setAutoRotate(v) { st.auto = v; },
      resize,
    };
  }

  // Kameraya dönük metin etiketi
  function label(text, color = '#ffffff', size = 0.6) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    g.font = '700 72px Inter, system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.lineWidth = 10;
    g.strokeStyle = 'rgba(5,9,20,0.85)';
    g.strokeText(text, 64, 68);
    g.fillStyle = color;
    g.fillText(text, 64, 68);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
    const s = new THREE.Sprite(mat);
    s.scale.set(size, size, size);
    s.renderOrder = 10;
    return s;
  }

  window.Viewer3D = { create, label };
})();
