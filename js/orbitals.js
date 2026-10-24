/* Elementa — Orbital Atlası (s, p, d, f açısal şekilleri) */
(function () {
  'use strict';

  const ORBITALS = [
    { l: 0, label: 's', f: () => 1, info: 'Küresel simetriktir; açısal düğüm düzlemi yoktur.' },
    { l: 1, label: 'p<sub>x</sub>', f: (x) => x, info: 'İki loblu “halter” şekli; x ekseni boyunca uzanır. yz düzlemi bir düğüm düzlemidir.' },
    { l: 1, label: 'p<sub>y</sub>', f: (x, y) => y, info: 'İki loblu “halter” şekli; y ekseni boyunca uzanır. xz düzlemi bir düğüm düzlemidir.' },
    { l: 1, label: 'p<sub>z</sub>', f: (x, y, z) => z, info: 'İki loblu “halter” şekli; z ekseni boyunca uzanır. xy düzlemi bir düğüm düzlemidir.' },
    { l: 2, label: 'd<sub>z²</sub>', f: (x, y, z) => 3 * z * z - 1, info: 'z ekseni boyunca iki lob ve xy düzlemini saran bir halka. Düğüm yüzeyleri iki konidir.' },
    { l: 2, label: 'd<sub>xz</sub>', f: (x, y, z) => x * z, info: 'Dört lob, x ve z eksenlerinin arasında, xz düzleminde yer alır.' },
    { l: 2, label: 'd<sub>yz</sub>', f: (x, y, z) => y * z, info: 'Dört lob, y ve z eksenlerinin arasında, yz düzleminde yer alır.' },
    { l: 2, label: 'd<sub>xy</sub>', f: (x, y) => x * y, info: 'Dört lob, x ve y eksenlerinin arasında, xy düzleminde yer alır.' },
    { l: 2, label: 'd<sub>x²−y²</sub>', f: (x, y) => x * x - y * y, info: 'Dört lob doğrudan x ve y eksenlerinin üzerinde bulunur.' },
    { l: 3, label: 'f<sub>z³</sub>', f: (x, y, z) => z * (5 * z * z - 3), info: 'z ekseni boyunca iki büyük lob ve iki halka.' },
    { l: 3, label: 'f<sub>xz²</sub>', f: (x, y, z) => x * (5 * z * z - 1), info: 'xz düzleminde altı lob.' },
    { l: 3, label: 'f<sub>yz²</sub>', f: (x, y, z) => y * (5 * z * z - 1), info: 'yz düzleminde altı lob.' },
    { l: 3, label: 'f<sub>xyz</sub>', f: (x, y, z) => x * y * z, info: 'Küpün köşelerine yönelen sekiz lob; üç düğüm düzlemi (xy, xz, yz).' },
    { l: 3, label: 'f<sub>z(x²−y²)</sub>', f: (x, y, z) => z * (x * x - y * y), info: 'Sekiz lob; x ve y eksenlerinin üstünde ve altında.' },
    { l: 3, label: 'f<sub>x(x²−3y²)</sub>', f: (x, y) => x * (x * x - 3 * y * y), info: 'xy düzleminde altıgen düzende altı lob.' },
    { l: 3, label: 'f<sub>y(3x²−y²)</sub>', f: (x, y) => y * (3 * x * x - y * y), info: 'xy düzleminde altıgen düzende altı lob (30° döndürülmüş).' },
  ];

  const L_NAME = ['s', 'p', 'd', 'f'];
  const POS = new THREE.Color('#5b8cff');
  const NEG = new THREE.Color('#ffb347');

  // r = |Y(θ, φ)| yüzeyi; kimyadaki z ekseni Three.js'te y eksenine denk gelir
  function buildGeometry(fn, seg = 120) {
    const vals = [], dirs = [];
    let max = 0;
    for (let i = 0; i <= seg; i++) {
      const th = (i / seg) * Math.PI;
      for (let j = 0; j <= seg; j++) {
        const ph = (j / seg) * Math.PI * 2;
        const x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th);
        const v = fn(x, y, z);
        vals.push(v); dirs.push([x, y, z]);
        max = Math.max(max, Math.abs(v));
      }
    }
    const pos = new Float32Array(vals.length * 3);
    const col = new Float32Array(vals.length * 3);
    vals.forEach((v, k) => {
      const r = (Math.abs(v) / max) * 2.4;
      const [x, y, z] = dirs[k];
      pos[k * 3] = x * r; pos[k * 3 + 1] = z * r; pos[k * 3 + 2] = -y * r;
      const c = v >= 0 ? POS : NEG;
      col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b;
    });
    const idx = [];
    for (let i = 0; i < seg; i++) {
      for (let j = 0; j < seg; j++) {
        const a = i * (seg + 1) + j, b = a + seg + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  function axes() {
    const g = new THREE.Group();
    const L = 3.3;
    const defs = [
      ['x', [L, 0, 0], '#ff6b6b'],
      ['y', [0, 0, -L], '#3ddc97'],
      ['z', [0, L, 0], '#6ea8ff'],
    ];
    defs.forEach(([name, p, color]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-p[0], -p[1], -p[2]), new THREE.Vector3(p[0], p[1], p[2]),
      ]);
      g.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 })));
      const lb = Viewer3D.label(name, color, 0.55);
      lb.position.set(p[0] * 1.08, p[1] * 1.08, p[2] * 1.08);
      g.add(lb);
    });
    return g;
  }

  function init(listEl, viewerEl, captionEl) {
    const v = Viewer3D.create(viewerEl, { distance: 10, tilt: 0.35, spin: -0.6 });

    listEl.innerHTML = [0, 1, 2, 3].map((l) => `
      <div class="orb-group">
        <h5>${L_NAME[l]} orbitalleri <small>l = ${l}</small></h5>
        <div class="orb-buttons">
          ${ORBITALS.map((o, i) => (o.l === l ? `<button class="orb-btn" data-i="${i}">${o.label}</button>` : '')).join('')}
        </div>
      </div>`).join('');

    function show(i) {
      const o = ORBITALS[i];
      listEl.querySelectorAll('.orb-btn').forEach((b) => b.classList.toggle('active', +b.dataset.i === i));
      captionEl.innerHTML = `
        <div class="cap-title"><b>${o.label}</b> orbitali</div>
        <div class="cap-meta">
          <span>Açısal momentum: <b>l = ${o.l}</b></span>
          <span>Açısal düğüm sayısı: <b>${o.l}</b></span>
          <span>Alt kabuktaki orbital: <b>${2 * o.l + 1}</b></span>
        </div>
        <p>${o.info}</p>
        <div class="phase-legend"><span><i style="background:#5b8cff"></i>+ faz</span><span><i style="background:#ffb347"></i>− faz</span></div>`;
      if (!v) return;
      v.clear();
      const mesh = new THREE.Mesh(buildGeometry(o.f), new THREE.MeshPhongMaterial({
        vertexColors: true, side: THREE.DoubleSide, shininess: 70, specular: 0x333344,
      }));
      v.root.add(mesh);
      v.root.add(axes());
      const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      v.root.add(nucleus);
    }

    listEl.addEventListener('click', (e) => {
      const b = e.target.closest('.orb-btn');
      if (b) show(+b.dataset.i);
    });
    show(3);

    return { setRunning: (r) => v && v.setRunning(r) };
  }

  window.Orbitals = { init };
})();
