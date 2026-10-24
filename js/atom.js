/* Elementa — 3D Bohr atom modeli */
(function () {
  'use strict';

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Nükleonları küçük bir küre içine yerleştir ve hafifçe "gevşet"
  function nucleusPositions(A, r, seed) {
    const rand = rng(seed);
    const R = r * 1.15 * Math.cbrt(A);
    const pts = [];
    for (let i = 0; i < A; i++) {
      const u = rand() * 2 - 1, th = rand() * Math.PI * 2, rr = R * Math.cbrt(rand());
      const s = Math.sqrt(1 - u * u);
      pts.push(new THREE.Vector3(s * Math.cos(th) * rr, u * rr, s * Math.sin(th) * rr));
    }
    if (A === 1) pts[0].set(0, 0, 0);
    const minD = r * 1.9;
    const tmp = new THREE.Vector3();
    const iters = A > 150 ? 12 : 24;
    for (let it = 0; it < iters; it++) {
      for (let i = 0; i < A; i++) {
        for (let j = i + 1; j < A; j++) {
          tmp.subVectors(pts[j], pts[i]);
          const d = tmp.length();
          if (d < minD && d > 1e-6) {
            tmp.multiplyScalar(((minD - d) / d) * 0.5);
            pts[j].add(tmp);
            pts[i].sub(tmp);
          }
        }
      }
      for (const p of pts) p.multiplyScalar(0.97);
    }
    return pts;
  }

  class AtomModel {
    constructor(container) {
      this.v = Viewer3D.create(container, { distance: 16, tilt: 0.45 });
    }

    setRunning(v) { if (this.v) this.v.setRunning(v); }

    set(Z, N, shells) {
      const v = this.v;
      if (!v) return;
      v.clear();

      const A = Z + N;
      const r = 0.26;
      const pts = nucleusPositions(A, r, Z * 7919 + N);
      let Rn = 0;
      pts.forEach((p) => { Rn = Math.max(Rn, p.length()); });
      Rn += r;

      const geo = new THREE.SphereGeometry(r, 20, 14);
      const pMesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0xff4d6d, roughness: 0.35, metalness: 0.05 }), Math.max(Z, 1));
      const nMesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0x9fb1d6, roughness: 0.45, metalness: 0.05 }), Math.max(N, 1));

      const rand = rng(Z * 31 + N * 17 + 1);
      const isProton = Array.from({ length: A }, (_, i) => i < Z);
      for (let i = A - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [isProton[i], isProton[j]] = [isProton[j], isProton[i]];
      }
      const m = new THREE.Matrix4();
      let pi = 0, ni = 0;
      pts.forEach((p, i) => {
        m.makeTranslation(p.x, p.y, p.z);
        if (isProton[i]) pMesh.setMatrixAt(pi++, m); else nMesh.setMatrixAt(ni++, m);
      });
      pMesh.count = pi;
      nMesh.count = ni;
      const nucleus = new THREE.Group();
      nucleus.add(pMesh, nMesh);
      v.root.add(nucleus);

      // Elektron katmanları
      const eGeo = new THREE.SphereGeometry(0.17, 20, 14);
      const eMat = new THREE.MeshStandardMaterial({ color: 0x8fecff, emissive: 0x1fb6ff, emissiveIntensity: 1.1, roughness: 0.3 });
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x6d8cff, transparent: true, opacity: 0.35 });
      const orbits = [];
      const base = Rn + 1.1, step = 0.95;

      shells.forEach((count, idx) => {
        const radius = base + idx * step;
        const g = new THREE.Group();
        g.rotation.x = Math.PI / 2 + Math.sin(idx * 1.7 + 0.4) * 0.35;
        g.rotation.y = Math.cos(idx * 2.3) * 0.3;
        g.add(new THREE.Mesh(new THREE.TorusGeometry(radius, 0.014, 8, 160), ringMat));
        const eg = new THREE.Group();
        for (let k = 0; k < count; k++) {
          const a = (k / count) * Math.PI * 2;
          const e = new THREE.Mesh(eGeo, eMat);
          e.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
          eg.add(e);
        }
        eg.rotation.z = idx * 0.6;
        g.add(eg);
        v.root.add(g);
        orbits.push({ eg, speed: (1.1 / Math.sqrt(idx + 1)) * (idx % 2 ? -1 : 1) });
      });

      v.onFrame((dt) => {
        for (const o of orbits) o.eg.rotation.z += dt * o.speed * 0.8;
        nucleus.rotation.y += dt * 0.15;
      });

      const outer = shells.length ? base + (shells.length - 1) * step : Rn;
      v.setDistance(Math.max(8, outer * 3.3));
    }
  }

  window.AtomModel = AtomModel;
})();
