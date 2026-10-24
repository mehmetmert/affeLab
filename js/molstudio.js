/* affeLab — Molekül Stüdyosu (MolView 2B→3B Çizici + PubChem + Molecular.chriswest Keşif & 3B Tepkime Gösterileri) */
(function () {
  'use strict';

  const V3 = THREE.Vector3;
  const UP = new V3(0, 1, 0);

  const ATOM_INFO = {
    H:  { color: 0xf8fafc, hex: '#f8fafc', r: 0.30, vdw: 1.10, val: [1], en: 2.20, mass: 1.008 },
    C:  { color: 0x64748b, hex: '#94a3b8', r: 0.48, vdw: 1.70, val: [4], en: 2.55, mass: 12.011 },
    N:  { color: 0x3b82f6, hex: '#60a5fa', r: 0.46, vdw: 1.55, val: [3, 4], en: 3.04, mass: 14.007 },
    O:  { color: 0xef4444, hex: '#f87171', r: 0.44, vdw: 1.52, val: [2], en: 3.44, mass: 15.999 },
    F:  { color: 0x4ade80, hex: '#4ade80', r: 0.40, vdw: 1.47, val: [1], en: 3.98, mass: 18.998 },
    P:  { color: 0xf97316, hex: '#fb923c', r: 0.58, vdw: 1.80, val: [3, 5], en: 2.19, mass: 30.974 },
    S:  { color: 0xeab308, hex: '#facc15', r: 0.56, vdw: 1.80, val: [2, 4, 6], en: 2.58, mass: 32.06 },
    Cl: { color: 0x22c55e, hex: '#22c55e', r: 0.54, vdw: 1.75, val: [1], en: 3.16, mass: 35.45 },
    Br: { color: 0xb91c1c, hex: '#dc2626', r: 0.60, vdw: 1.85, val: [1], en: 2.96, mass: 79.904 },
    I:  { color: 0x9333ea, hex: '#a855f7', r: 0.66, vdw: 1.98, val: [1], en: 2.66, mass: 126.90 },
    Na: { color: 0x818cf8, hex: '#818cf8', r: 0.62, vdw: 2.27, val: [1], en: 0.93, mass: 22.990 },
  };

  // Hazır Molekül Kütüphanesi (Temel & İleri Seviye anlatımlı)
  const PRESETS = [
    {
      id: 'benzene', name: 'Benzen', formula: 'C₆H₆', iupac: 'Benzen (Aromatik Halka)',
      basic: 'Altı karbon atomunun bir halka oluşturup elektronlarını ortaklaşa paylaştığı çok kararlı, hoş kokulu bir hidrokarbondur.',
      advanced: 'Tüm karbonları sp² hibritleşmesi yapmıştır; 6 π elektronu halka boyunca delokalize olarak (4n+2 Hückel kuralı, n=1) aromatik kararlılık sağlar.',
      uses: 'Plastik, boya, deterjan ve ilaç sentezinde temel başlangıç maddesidir.',
      atoms: [
        { el: 'C', x: 0, y: -56 }, { el: 'C', x: 48, y: -28 }, { el: 'C', x: 48, y: 28 },
        { el: 'C', x: 0, y: 56 }, { el: 'C', x: -48, y: 28 }, { el: 'C', x: -48, y: -28 },
        { el: 'H', x: 0, y: -96 }, { el: 'H', x: 83, y: -48 }, { el: 'H', x: 83, y: 48 },
        { el: 'H', x: 0, y: 96 }, { el: 'H', x: -83, y: 48 }, { el: 'H', x: -83, y: -48 },
      ],
      bonds: [
        [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
        [0, 6, 1], [1, 7, 1], [2, 8, 1], [3, 9, 1], [4, 10, 1], [5, 11, 1],
      ],
    },
    {
      id: 'ethanol', name: 'Etanol (Etil Alkol)', formula: 'C₂H₅OH', iupac: 'Etanol',
      basic: 'İki karbonlu bir alkoldür. Kolonya ve dezenfektanların ana bileşenidir; hem suyla hem yağlarla karışabilir.',
      advanced: 'Polar hidroksil (-OH) grubu su ile hidrojen bağı kurarken, apolar etil (-C₂H₅) kuyruğu organik çözücülerle etkileşir.',
      uses: 'Antiseptik dezenfektan, biyoyakıt katkısı ve laboratuvar çözücüsü.',
      atoms: [
        { el: 'C', x: -45, y: 10 }, { el: 'C', x: 5, y: -18 }, { el: 'O', x: 55, y: 10 }, { el: 'H', x: 92, y: -10 },
        { el: 'H', x: -82, y: 32 }, { el: 'H', x: -45, y: 52 }, { el: 'H', x: -72, y: -24 },
        { el: 'H', x: 5, y: -60 }, { el: 'H', x: 25, y: -52 },
      ],
      bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]],
    },
    {
      id: 'acetic', name: 'Asetik Asit (Sirke Asidi)', formula: 'CH₃COOH', iupac: 'Etanoik Asit',
      basic: 'Sirkeye ekşi tadını ve keskin kokusunu veren organik asittir.',
      advanced: 'Karboksil (-COOH) fonksiyonel grubu içerir; sulu çözeltide kısmen iyonlaşan zayıf bir monoprotik asittir (pKa ≈ 4,76).',
      uses: 'Gıda koruyucu (sirke), kireç çözücü ve vinil asetat üretimi.',
      atoms: [
        { el: 'C', x: -50, y: 12 }, { el: 'C', x: 5, y: -12 }, { el: 'O', x: 10, y: -64 },
        { el: 'O', x: 52, y: 18 }, { el: 'H', x: 90, y: 2 },
        { el: 'H', x: -88, y: 28 }, { el: 'H', x: -50, y: 54 }, { el: 'H', x: -72, y: -24 },
      ],
      bonds: [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [0, 5, 1], [0, 6, 1], [0, 7, 1]],
    },
    {
      id: 'acetone', name: 'Aseton', formula: 'C₃H₆O', iupac: 'Propan-2-on',
      basic: 'En küçük keton moleküldür; çok hızlı buharlaşır ve iyi bir yağ/boya çözücüdür.',
      advanced: 'Merkezdeki karbonil (C=O) karbonu sp² hibritleşmesiyle düzlem üçgen geometriye ve güçlü bir dipol momente (2,88 D) sahiptir.',
      uses: 'Oje ve boya çözücü, laboratuvarda cam malzemeleri hızlı kurutma sıvısı.',
      atoms: [
        { el: 'C', x: -52, y: 22 }, { el: 'C', x: 0, y: -8 }, { el: 'C', x: 52, y: 22 }, { el: 'O', x: 0, y: -62 },
        { el: 'H', x: -88, y: 40 }, { el: 'H', x: -52, y: 62 }, { el: 'H', x: -76, y: -12 },
        { el: 'H', x: 88, y: 40 }, { el: 'H', x: 52, y: 62 }, { el: 'H', x: 76, y: -12 },
      ],
      bonds: [[0, 1, 1], [1, 2, 1], [1, 3, 2], [0, 4, 1], [0, 5, 1], [0, 6, 1], [2, 7, 1], [2, 8, 1], [2, 9, 1]],
    },
    {
      id: 'aspirin', name: 'Aspirin', formula: 'C₉H₈O₄', iupac: 'Asetilsalisilik Asit',
      basic: 'Söğüt kabuğundan esinlenerek geliştirilen, dünyada en çok kullanılan ağrı kesici ve ateş düşürücü ilaç molekülüdür.',
      advanced: 'Benzen halkası üzerinde orto konumunda bir karboksilik asit (-COOH) ve bir ester (-OCOCH₃) fonksiyonel grubu taşır; COX enzimlerini asetilleyerek inhibe eder.',
      uses: 'Analjezik (ağrı kesici), antipiretik (ateş düşürücü) ve kan sulandırıcı.',
      atoms: [
        { el: 'C', x: -56, y: -28 }, { el: 'C', x: -8, y: -56 }, { el: 'C', x: 40, y: -28 },
        { el: 'C', x: 40, y: 28 }, { el: 'C', x: -8, y: 56 }, { el: 'C', x: -56, y: 28 },
        { el: 'C', x: 88, y: -56 }, { el: 'O', x: 88, y: -104 }, { el: 'O', x: 132, y: -28 },
        { el: 'O', x: 88, y: 56 }, { el: 'C', x: 96, y: 102 }, { el: 'O', x: 62, y: 136 }, { el: 'C', x: 146, y: 118 },
      ],
      bonds: [
        [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
        [2, 6, 1], [6, 7, 2], [6, 8, 1],
        [3, 9, 1], [9, 10, 1], [10, 11, 2], [10, 12, 1],
      ],
    },
    {
      id: 'water', name: 'Su', formula: 'H₂O', iupac: 'Oksidan',
      basic: 'Bir oksijen ve iki hidrojen atomundan oluşan, yaşam için vazgeçilmez polar bir sıvıdır.',
      advanced: 'Oksijen üzerindeki 2 ortaklanmamış çift (AX₂E₂) bağ açısını 104,5°’ye daraltır ve yoğun hidrojen bağı ağı oluşturur.',
      uses: 'Evrensel çözücü, biyokimyasal tepkime ortamı ve hidroliz reaktifi.',
      atoms: [{ el: 'O', x: 0, y: -12 }, { el: 'H', x: -46, y: 26 }, { el: 'H', x: 46, y: 26 }],
      bonds: [[0, 1, 1], [0, 2, 1]],
    },
    {
      id: 'methane', name: 'Metan (Doğalgaz)', formula: 'CH₄', iupac: 'Metan',
      basic: 'Bir karbona dört hidrojenin bağlandığı en basit organik molekül ve doğalgazın ana bileşenidir.',
      advanced: 'Düzgün dörtyüzlü (109,5°, sp³) simetrisi nedeniyle bağ dipolleri birbirini tam sıfırlar; apolar bir gazdır.',
      uses: 'Evsel ısıtma, elektrik üretimi ve hidrojen gazı (sentez gazı) eldesi.',
      atoms: [
        { el: 'C', x: 0, y: 0 }, { el: 'H', x: 0, y: -56 },
        { el: 'H', x: 54, y: 18 }, { el: 'H', x: -44, y: 42 }, { el: 'H', x: -48, y: -22 },
      ],
      bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
    },
  ];

  // Sınıf İçi 3B Tepkime Gösterileri (Molecular.chriswest.tech Demos)
  const REACTION_DEMOS = [
    {
      id: 'synthesis',
      type: 'Sentez Tepkimesi',
      title: 'Suyun Oluşumu',
      eq: '2H₂(g) + O₂(g) → 2H₂O(g) + Enerji',
      basic: 'İki hidrojen molekülü ile bir oksijen molekülü çarpışır; eski bağlar kopar ve su molekülleri oluşurken yüksek ısı açığa çıkar.',
      advanced: 'Ekzotermik redoks ve sentez tepkimesidir (ΔH° = −483,6 kJ). H-H (436 kJ/mol) ve O=O (498 kJ/mol) bağları kırılırken daha kararlı O-H (463 kJ/mol) bağları oluşur.',
      reactants: [
        { el: 'H', p: [-3.2, 1.1, 0] }, { el: 'H', p: [-2.4, 1.1, 0] },
        { el: 'H', p: [-3.2, -1.1, 0] }, { el: 'H', p: [-2.4, -1.1, 0] },
        { el: 'O', p: [2.6, 0.55, 0] }, { el: 'O', p: [2.6, -0.55, 0] },
      ],
      rBonds: [[0, 1, 1], [2, 3, 1], [4, 5, 2]],
      products: [
        { el: 'H', p: [-2.2, 1.4, 0.4] }, { el: 'O', p: [-1.5, 0.9, 0] }, { el: 'H', p: [-0.8, 1.4, -0.4] },
        { el: 'H', p: [0.8, -1.4, 0.4] }, { el: 'O', p: [1.5, -0.9, 0] }, { el: 'H', p: [2.2, -1.4, -0.4] },
      ],
      pBonds: [[1, 0, 1], [1, 2, 1], [4, 3, 1], [4, 5, 1]],
    },
    {
      id: 'combustion',
      type: 'Yanma Tepkimesi',
      title: 'Doğalgazın (Metan) Yanması',
      eq: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
      basic: 'Ocakta yanan doğalgaz (metan), havadaki oksijenle birleşerek karbondioksit ve su buharına dönüşür.',
      advanced: 'Tam yanma tepkimesidir (ΔH° = −890 kJ/mol). Karbonun yükseltgenme basamağı −4’ten +4’e (CO₂) çıkarken oksijen 0’dan −2’ye indirgenir.',
      reactants: [
        { el: 'C', p: [-2.6, 0, 0] },
        { el: 'H', p: [-2.6, 0.9, 0] }, { el: 'H', p: [-3.4, -0.5, 0.6] },
        { el: 'H', p: [-1.8, -0.5, 0.6] }, { el: 'H', p: [-2.6, -0.4, -0.9] },
        { el: 'O', p: [2.5, 1.2, 0] }, { el: 'O', p: [3.4, 1.2, 0] },
        { el: 'O', p: [2.5, -1.2, 0] }, { el: 'O', p: [3.4, -1.2, 0] },
      ],
      rBonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [5, 6, 2], [7, 8, 2]],
      products: [
        { el: 'C', p: [0, 0, 0] },
        { el: 'H', p: [-2.8, 1.5, 0] }, { el: 'H', p: [-1.6, 1.5, 0] },
        { el: 'H', p: [1.6, -1.5, 0] }, { el: 'H', p: [2.8, -1.5, 0] },
        { el: 'O', p: [-1.15, 0, 0] }, { el: 'O', p: [1.15, 0, 0] },
        { el: 'O', p: [-2.2, 1.0, 0] }, { el: 'O', p: [2.2, -1.0, 0] },
      ],
      pBonds: [[0, 5, 2], [0, 6, 2], [7, 1, 1], [7, 2, 1], [8, 3, 1], [8, 4, 1]],
    },
    {
      id: 'electrolysis',
      type: 'Ayrışma (Analiz) Tepkimesi',
      title: 'Suyun Elektrolizi',
      eq: '2H₂O(s) + Elektrik → 2H₂(g)↑ + O₂(g)↑',
      basic: 'Suya elektrik akımı verildiğinde su molekülleri parçalanarak hidrojen ve oksijen gazlarına ayrışır.',
      advanced: 'Endotermik elektroliz tepkimesidir. Katotta indirgenmeyle 2 hacim H₂ gazı, anotta yükseltgenmeyle 1 hacim O₂ gazı toplanır.',
      reactants: [
        { el: 'H', p: [-2.2, 0.9, 0] }, { el: 'O', p: [-1.5, 0.3, 0] }, { el: 'H', p: [-0.8, 0.9, 0] },
        { el: 'H', p: [0.8, -0.9, 0] }, { el: 'O', p: [1.5, -0.3, 0] }, { el: 'H', p: [2.2, -0.9, 0] },
      ],
      rBonds: [[1, 0, 1], [1, 2, 1], [4, 3, 1], [4, 5, 1]],
      products: [
        { el: 'H', p: [-3.0, 1.2, 0] }, { el: 'O', p: [2.4, 0.55, 0] }, { el: 'H', p: [-2.2, 1.2, 0] },
        { el: 'H', p: [-3.0, -1.2, 0] }, { el: 'O', p: [2.4, -0.55, 0] }, { el: 'H', p: [-2.2, -1.2, 0] },
      ],
      pBonds: [[0, 2, 1], [3, 5, 1], [1, 4, 2]],
    },
    {
      id: 'neutralization',
      type: 'Asit-Baz Nötralleşmesi',
      title: 'HCl ve NaOH Tepkimesi',
      eq: 'HCl(suda) + NaOH(suda) → NaCl(suda) + H₂O(s)',
      basic: 'Güçlü bir asit (HCl) ile güçlü bir baz (NaOH) karıştığında birbirini nötralleştirerek yemek tuzu (NaCl) ve su oluşturur.',
      advanced: 'Net iyon denklemi H⁺(suda) + OH⁻(suda) → H₂O(s) şeklindedir (ΔH° = −55,8 kJ/mol). Proton (H⁺) hidroksit iyonuna aktarılır.',
      reactants: [
        { el: 'H', p: [-2.0, 0.4, 0] }, { el: 'Cl', p: [-3.1, 0.4, 0] },
        { el: 'Na', p: [3.1, -0.4, 0] }, { el: 'O', p: [1.9, -0.4, 0] }, { el: 'H', p: [1.9, -1.3, 0] },
      ],
      rBonds: [[0, 1, 1], [2, 3, 1], [3, 4, 1]],
      products: [
        { el: 'H', p: [1.3, 0.9, 0] }, { el: 'Cl', p: [-2.6, 0, 0] },
        { el: 'Na', p: [-1.4, 0, 0] }, { el: 'O', p: [2.0, 0.4, 0] }, { el: 'H', p: [2.7, 0.9, 0] },
      ],
      pBonds: [[1, 2, 1], [3, 0, 1], [3, 4, 1]],
    },
  ];

  /* ---------- 2B Grafı 3B Koordinatlara Dönüştürücü ---------- */
  function build3DFrom2D(atoms, bonds) {
    const N = atoms.length;
    if (!N) return [];
    // Başlangıç koordinatları: 2B düzlemi ölçekle ve simetriyi kırmak için küçük z-gürültüsü ver
    let cx = 0, cy = 0;
    atoms.forEach((a) => { cx += a.x; cy += a.y; });
    cx /= N; cy /= N;

    const pts = atoms.map((a, i) => new V3(
      (a.x - cx) * 0.032,
      -(a.y - cy) * 0.032,
      Math.sin(i * 2.1 + 0.5) * 0.38,
    ));

    // Yay-itme gevşetmesi (Force-directed 3D relaxation)
    const adj = Array.from({ length: N }, () => []);
    bonds.forEach(([i, j, order]) => {
      const ideal = order === 3 ? 1.20 : order === 2 ? 1.34 : (atoms[i].el === 'H' || atoms[j].el === 'H' ? 1.08 : 1.50);
      adj[i].push({ to: j, ideal });
      adj[j].push({ to: i, ideal });
    });

    const F = pts.map(() => new V3());
    const diff = new V3();
    for (let it = 0; it < 220; it++) {
      for (let i = 0; i < N; i++) F[i].set(0, 0, 0);

      // Bağ yay kuvvetleri
      for (let i = 0; i < N; i++) {
        for (const b of adj[i]) {
          if (b.to <= i) continue;
          diff.subVectors(pts[b.to], pts[i]);
          const d = Math.max(diff.length(), 1e-4);
          const k = (d - b.ideal) * 0.35;
          diff.multiplyScalar(k / d);
          F[i].add(diff);
          F[b.to].sub(diff);
        }
      }

      // Bağlı olmayan atomlar arası steril itme (1-3 açı açma + Van der Waals)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (adj[i].some((x) => x.to === j)) continue;
          diff.subVectors(pts[i], pts[j]);
          const d = Math.max(diff.length(), 0.25);
          if (d < 2.55) {
            const rep = ((2.55 - d) * 0.09) / d;
            F[i].addScaledVector(diff, rep);
            F[j].addScaledVector(diff, -rep);
          }
        }
      }

      for (let i = 0; i < N; i++) {
        pts[i].addScaledVector(F[i], 0.45);
      }
    }

    // Merkeze hizala
    const center = new V3();
    pts.forEach((p) => center.add(p));
    center.multiplyScalar(1 / N);
    pts.forEach((p) => p.sub(center));
    return pts;
  }

  /* ---------- Değerlik ve Kimyasal Geçerlilik Analizi ---------- */
  function analyzeGraph(atoms, bonds) {
    const counts = {};
    let mass = 0;
    const bondSum = new Array(atoms.length).fill(0);

    atoms.forEach((a) => {
      counts[a.el] = (counts[a.el] || 0) + 1;
      mass += (ATOM_INFO[a.el] ? ATOM_INFO[a.el].mass : 12);
    });
    bonds.forEach(([i, j, o]) => {
      bondSum[i] += o;
      bondSum[j] += o;
    });

    let invalidCount = 0;
    let openValence = 0;
    atoms.forEach((a, i) => {
      const info = ATOM_INFO[a.el] || ATOM_INFO.C;
      const b = bondSum[i];
      if (!info.val.includes(b)) {
        if (b < info.val[0]) openValence += info.val[0] - b;
        else invalidCount++;
      }
    });

    // Hill sistemine göre formül (Önce C, sonra H, sonra alfabetik)
    const keys = Object.keys(counts);
    const ordered = [];
    if (counts.C) { ordered.push('C'); if (counts.H) ordered.push('H'); }
    keys.sort().forEach((k) => { if (!ordered.includes(k)) ordered.push(k); });
    const formulaHtml = ordered.map((k) => `${k}${counts[k] > 1 ? `<sub>${counts[k]}</sub>` : ''}`).join('') || '—';

    // Siklomatik sayı (halka sayısı): E - V + C
    const rings = Math.max(0, bonds.length - atoms.length + 1);

    return { formulaHtml, mass, invalidCount, openValence, rings, bondSum };
  }

  function init(rootEl) {
    if (!rootEl) return { setRunning() {} };

    const canvas2d = rootEl.querySelector('#msCanvas2d');
    const ctx = canvas2d.getContext('2d');
    const v3d = Viewer3D.create(rootEl.querySelector('#msViewer3d'), { distance: 10.5, tilt: 0.3, spin: 0.4, autoRotate: true });

    const state = {
      tool: 'bond1', // bond1 | bond2 | bond3 | ring6 | ring6s | ring5 | atom | erase
      activeEl: 'C',
      repMode: 'ball', // ball | space | stick | charge
      level: 'basic', // basic | advanced
      currentPreset: PRESETS[0],
      atoms: [],
      bonds: [], // [i, j, order]
      coords3d: null, // PubChem'den gelen doğrudan 3B koordinatlar varsa
      demoState: null, // Sınıf tepkimesi animasyon durumu
    };

    function loadPreset(preset) {
      state.currentPreset = preset;
      state.coords3d = null;
      state.demoState = null;
      const w = canvas2d.clientWidth || 380;
      const h = canvas2d.clientHeight || 300;
      const cx = w / 2, cy = h / 2;
      state.atoms = preset.atoms.map((a) => ({ el: a.el, x: cx + a.x, y: cy + a.y }));
      state.bonds = preset.bonds.map((b) => b.slice());
      refreshAll();
    }

    // Otomatik Hidrojen Tamamlama (+H)
    function addImplicitHydrogens() {
      state.coords3d = null;
      const { bondSum } = analyzeGraph(state.atoms, state.bonds);
      const origLen = state.atoms.length;
      for (let i = 0; i < origLen; i++) {
        const a = state.atoms[i];
        const targetVal = (ATOM_INFO[a.el] || ATOM_INFO.C).val[0];
        const need = Math.max(0, targetVal - bondSum[i]);
        for (let k = 0; k < need; k++) {
          const ang = ((k + i * 0.7) / Math.max(1, need)) * Math.PI * 2;
          const hx = a.x + Math.cos(ang) * 34;
          const hy = a.y + Math.sin(ang) * 34;
          const newIdx = state.atoms.length;
          state.atoms.push({ el: 'H', x: hx, y: hy });
          state.bonds.push([i, newIdx, 1]);
        }
      }
      refreshAll();
    }

    function draw2D() {
      const W = canvas2d.clientWidth, H = canvas2d.clientHeight;
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);

      // Hafif ızgara noktaları
      ctx.fillStyle = 'rgba(148, 163, 184, 0.14)';
      for (let x = 20; x < W; x += 24) {
        for (let y = 20; y < H; y += 24) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Bağları çiz
      ctx.lineCap = 'round';
      state.bonds.forEach(([i, j, order]) => {
        const a = state.atoms[i], b = state.atoms[j];
        if (!a || !b) return;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const offsets = order === 1 ? [0] : order === 2 ? [-3.5, 3.5] : [-5, 0, 5];
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.4;
        offsets.forEach((off) => {
          ctx.beginPath();
          ctx.moveTo(a.x + nx * off, a.y + ny * off);
          ctx.lineTo(b.x + nx * off, b.y + ny * off);
          ctx.stroke();
        });
      });

      // Atom düğümlerini çiz
      state.atoms.forEach((a) => {
        const info = ATOM_INFO[a.el] || ATOM_INFO.C;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.el === 'H' ? 10 : 13, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = info.hex;
        ctx.stroke();

        ctx.fillStyle = info.hex;
        ctx.font = '700 11.5px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a.el, a.x, a.y + 0.5);
      });
    }

    function render3D() {
      if (!v3d) return;
      v3d.clear();
      const g = new THREE.Group();

      // Sınıf tepkimesi oynatılıyorsa özel sahne
      if (state.demoState) {
        const { demo, t } = state.demoState;
        const smooth = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const bonds = t < 0.5 ? demo.rBonds : demo.pBonds;
        const pts = demo.reactants.map((r, i) => {
          const pR = new V3(...r.p);
          const pP = new V3(...demo.products[i].p);
          return pR.lerp(pP, smooth);
        });

        bonds.forEach(([i, j, order]) => {
          const a = pts[i], b = pts[j];
          const dir = new V3().subVectors(b, a);
          const len = dir.length();
          const cyl = new THREE.Mesh(
            new THREE.CylinderGeometry(order === 2 ? 0.08 : 0.1, order === 2 ? 0.08 : 0.1, len, 16),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 }),
          );
          cyl.position.copy(a).add(b).multiplyScalar(0.5);
          cyl.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
          g.add(cyl);
        });

        pts.forEach((p, i) => {
          const el = demo.reactants[i].el;
          const info = ATOM_INFO[el] || ATOM_INFO.C;
          const m = new THREE.Mesh(
            new THREE.SphereGeometry(info.r * 1.15, 28, 20),
            new THREE.MeshStandardMaterial({ color: info.color, roughness: 0.32 }),
          );
          m.position.copy(p);
          g.add(m);
          const lbl = Viewer3D.label(el, el === 'H' ? '#0f172a' : '#ffffff', 0.5);
          lbl.position.copy(p);
          g.add(lbl);
        });

        // Çarpışma anında (t ≈ 0.5) enerji küresi parlaması
        const flash = Math.max(0, 1 - Math.abs(t - 0.5) * 5.5);
        if (flash > 0.02) {
          const glow = new THREE.Mesh(
            new THREE.SphereGeometry(1.6 * flash, 24, 18),
            new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: flash * 0.48 }),
          );
          g.add(glow);
        }

        v3d.root.add(g);
        return;
      }

      const pts = state.coords3d || build3DFrom2D(state.atoms, state.bonds);
      if (!pts.length) return;

      // Kısmi yük hesabı (Pauling EN farkı)
      const charges = new Array(state.atoms.length).fill(0);
      state.bonds.forEach(([i, j]) => {
        const ei = (ATOM_INFO[state.atoms[i].el] || ATOM_INFO.C).en;
        const ej = (ATOM_INFO[state.atoms[j].el] || ATOM_INFO.C).en;
        const dq = (ej - ei) * 0.25;
        charges[i] += dq; // + ise elektron kaybetti (δ+)
        charges[j] -= dq; // - ise elektron çekti (δ-)
      });

      // Bağları çiz (Uzay dolgulu mod hariç)
      if (state.repMode !== 'space') {
        state.bonds.forEach(([i, j, order]) => {
          const a = pts[i], b = pts[j];
          if (!a || !b) return;
          const dir = new V3().subVectors(b, a);
          const len = dir.length();
          const uDir = dir.clone().normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(UP, uDir);
          const perp = new V3(Math.abs(uDir.x) < 0.9 ? 1 : 0, Math.abs(uDir.x) < 0.9 ? 0 : 1, 0).cross(uDir).normalize();
          const offsets = order === 1 ? [0] : order === 2 ? [-0.11, 0.11] : [-0.16, 0, 0.16];
          const rad = state.repMode === 'stick' ? 0.13 : (order === 1 ? 0.095 : 0.065);
          const mat = new THREE.MeshStandardMaterial({ color: 0x9fb0cf, roughness: 0.42 });

          offsets.forEach((off) => {
            const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, len, 16), mat);
            cyl.position.copy(a).add(b).multiplyScalar(0.5).addScaledVector(perp, off);
            cyl.quaternion.copy(quat);
            g.add(cyl);
          });
        });
      }

      // Atomları çiz
      pts.forEach((p, i) => {
        const a = state.atoms[i];
        const info = ATOM_INFO[a.el] || ATOM_INFO.C;
        const radius = state.repMode === 'space'
          ? info.vdw * 0.72
          : state.repMode === 'stick'
            ? 0.16
            : info.r;

        let col = info.color;
        if (state.repMode === 'charge') {
          const q = charges[i];
          if (q > 0.08) col = 0x3b82f6; // δ+ Mavi
          else if (q < -0.08) col = 0xef4444; // δ− Kırmızı
          else col = 0xcbd5e1;
        }

        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 28, 20),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.34, metalness: 0.08 }),
        );
        mesh.position.copy(p);
        g.add(mesh);

        if (state.repMode === 'charge' && Math.abs(charges[i]) > 0.08) {
          const tag = charges[i] > 0 ? 'δ+' : 'δ−';
          const lbl = Viewer3D.label(`${a.el} (${tag})`, charges[i] > 0 ? '#93c5fd' : '#fca5a5', 0.52);
          lbl.position.copy(p).add(new V3(0, radius + 0.25, 0));
          g.add(lbl);
        } else if (state.repMode !== 'space') {
          const lbl = Viewer3D.label(a.el, a.el === 'H' ? '#0f172a' : '#ffffff', 0.44);
          lbl.position.copy(p);
          g.add(lbl);
        }
      });

      v3d.root.add(g);
    }

    function updateValidityAndInfo() {
      const an = analyzeGraph(state.atoms, state.bonds);
      const vBar = rootEl.querySelector('#msValidityBar');

      if (state.atoms.length === 0) {
        vBar.className = 'validity-bar neutral';
        vBar.innerHTML = 'Tuvale tıklayarak atom veya halka ekle.';
      } else if (an.invalidCount > 0) {
        vBar.className = 'validity-bar bad';
        vBar.innerHTML = `⚠️ <b>Değerlik Aşımı:</b> ${an.invalidCount} atomda izin verilenden fazla bağ var!`;
      } else if (an.openValence > 0) {
        vBar.className = 'validity-bar warn';
        vBar.innerHTML = `💡 <b>Açık Değerlik (${an.openValence} bağ eksik):</b> Tamamlamak için üstteki <b>“+H Tamamla”</b> butonuna tıkla.`;
      } else {
        vBar.className = 'validity-bar good';
        vBar.innerHTML = `✓ <b>Geçerli Kimyasal Yapı</b> · Oktet ve değerlik kurallarıyla uyumlu`;
      }

      rootEl.querySelector('#msFormula').innerHTML = an.formulaHtml;
      rootEl.querySelector('#msMass').textContent = `${an.mass.toFixed(2).replace('.', ',')} g/mol`;
      rootEl.querySelector('#msAtomBondCount').textContent = `${state.atoms.length} atom · ${state.bonds.length} bağ · ${an.rings} halka`;

      // Seviyeli anlatım (Temel / İleri)
      const p = state.currentPreset;
      if (p) {
        rootEl.querySelector('#msMolTitle').textContent = `${p.name} (${p.formula})`;
        rootEl.querySelector('#msMolText').textContent = state.level === 'basic' ? p.basic : p.advanced;
        rootEl.querySelector('#msMolUses').textContent = `Günlük Hayatta: ${p.uses}`;
      }
    }

    function refreshAll() {
      draw2D();
      render3D();
      updateValidityAndInfo();
    }

    // 2B Tuval Etkileşimi
    let dragAtomIdx = -1;
    function findAtomAt(x, y) {
      for (let i = state.atoms.length - 1; i >= 0; i--) {
        if (Math.hypot(state.atoms[i].x - x, state.atoms[i].y - y) < 16) return i;
      }
      return -1;
    }

    function findBondAt(x, y) {
      for (let i = 0; i < state.bonds.length; i++) {
        const [u, v] = state.bonds[i];
        const a = state.atoms[u], b = state.atoms[v];
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        if (Math.hypot(mx - x, my - y) < 14) return i;
      }
      return -1;
    }

    function stampRing(sides, aromatic, cx, cy) {
      state.coords3d = null;
      const base = state.atoms.length;
      const r = 42;
      for (let k = 0; k < sides; k++) {
        const a = (k / sides) * Math.PI * 2 - Math.PI / 2;
        state.atoms.push({ el: 'C', x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
      }
      for (let k = 0; k < sides; k++) {
        const order = aromatic && k % 2 === 0 ? 2 : 1;
        state.bonds.push([base + k, base + ((k + 1) % sides), order]);
      }
      refreshAll();
    }

    canvas2d.addEventListener('pointerdown', (e) => {
      const rect = canvas2d.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      state.coords3d = null;
      state.demoState = null;

      if (state.tool === 'ring6') { stampRing(6, true, x, y); return; }
      if (state.tool === 'ring6s') { stampRing(6, false, x, y); return; }
      if (state.tool === 'ring5') { stampRing(5, false, x, y); return; }

      const hitA = findAtomAt(x, y);
      const hitB = findBondAt(x, y);

      if (state.tool === 'erase') {
        if (hitA >= 0) {
          state.atoms.splice(hitA, 1);
          state.bonds = state.bonds
            .filter(([u, v]) => u !== hitA && v !== hitA)
            .map(([u, v, o]) => [u > hitA ? u - 1 : u, v > hitA ? v - 1 : v, o]);
          refreshAll();
        } else if (hitB >= 0) {
          state.bonds.splice(hitB, 1);
          refreshAll();
        }
        return;
      }

      if (state.tool === 'atom') {
        if (hitA >= 0) state.atoms[hitA].el = state.activeEl;
        else state.atoms.push({ el: state.activeEl, x, y });
        refreshAll();
        return;
      }

      // Bağ çizim araçları (bond1, bond2, bond3)
      const order = state.tool === 'bond2' ? 2 : state.tool === 'bond3' ? 3 : 1;
      if (hitB >= 0 && hitA < 0) {
        state.bonds[hitB][2] = (state.bonds[hitB][2] % 3) + 1;
        refreshAll();
        return;
      }
      if (hitA >= 0) {
        dragAtomIdx = hitA;
      } else {
        state.atoms.push({ el: state.activeEl, x, y });
        dragAtomIdx = state.atoms.length - 1;
        refreshAll();
      }
    });

    canvas2d.addEventListener('pointerup', (e) => {
      if (dragAtomIdx < 0) return;
      const rect = canvas2d.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const startA = state.atoms[dragAtomIdx];
      const order = state.tool === 'bond2' ? 2 : state.tool === 'bond3' ? 3 : 1;

      const endIdx = findAtomAt(x, y);
      if (endIdx >= 0 && endIdx !== dragAtomIdx) {
        const existing = state.bonds.find(([u, v]) => (u === dragAtomIdx && v === endIdx) || (u === endIdx && v === dragAtomIdx));
        if (existing) existing[2] = (existing[2] % 3) + 1;
        else state.bonds.push([dragAtomIdx, endIdx, order]);
      } else if (Math.hypot(x - startA.x, y - startA.y) > 18) {
        const ang = Math.atan2(y - startA.y, x - startA.x);
        const nx = startA.x + Math.cos(ang) * 44;
        const ny = startA.y + Math.sin(ang) * 44;
        const newIdx = state.atoms.length;
        state.atoms.push({ el: state.activeEl, x: nx, y: ny });
        state.bonds.push([dragAtomIdx, newIdx, order]);
      } else {
        // Aynı atoma tıklandıysa 120° açıyla yeni dal filizlendir
        const degs = state.bonds.filter(([u, v]) => u === dragAtomIdx || v === dragAtomIdx).length;
        const ang = (-60 + degs * 120) * (Math.PI / 180);
        const nx = startA.x + Math.cos(ang) * 44;
        const ny = startA.y + Math.sin(ang) * 44;
        const newIdx = state.atoms.length;
        state.atoms.push({ el: state.activeEl, x: nx, y: ny });
        state.bonds.push([dragAtomIdx, newIdx, order]);
      }
      dragAtomIdx = -1;
      refreshAll();
    });

    function resize2D() {
      const rect = canvas2d.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas2d.width = rect.width * dpr;
      canvas2d.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw2D();
    }
    new ResizeObserver(resize2D).observe(canvas2d);

    // PubChem Canlı 3B Molekül İndirici
    async function fetchFromPubChem(query) {
      const statusEl = rootEl.querySelector('#msPubchemStatus');
      statusEl.textContent = `“${query}” PubChem 3B veritabanında aranıyor…`;
      try {
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/JSON?record_type=3d`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Bulunamadı');
        const data = await res.json();
        const comp = data.PC_Compounds && data.PC_Compounds[0];
        if (!comp) throw new Error('Veri yok');

        const aidEls = comp.atoms.element;
        const conf = comp.coords[0].conformers[0];
        const xs = conf.x, ys = conf.y, zs = conf.z;

        const Z_TO_SYM = { 1: 'H', 6: 'C', 7: 'N', 8: 'O', 9: 'F', 15: 'P', 16: 'S', 17: 'Cl', 35: 'Br', 53: 'I' };
        const w = canvas2d.clientWidth || 380, h = canvas2d.clientHeight || 300;
        state.atoms = aidEls.map((z, i) => ({
          el: Z_TO_SYM[z] || 'C',
          x: w / 2 + xs[i] * 28,
          y: h / 2 - ys[i] * 28,
        }));
        state.coords3d = xs.map((x, i) => new V3(x, ys[i], zs[i]));

        const b1 = comp.bonds.aid1, b2 = comp.bonds.aid2, bo = comp.bonds.order;
        state.bonds = b1.map((u, k) => [u - 1, b2[k] - 1, bo[k] || 1]);
        state.demoState = null;
        statusEl.textContent = `✓ “${query}” 3B konformeri yüklendi (${state.atoms.length} atom).`;
        refreshAll();
      } catch (err) {
        statusEl.textContent = `✗ “${query}” için 3B kayıt bulunamadı. İngilizce adıyla (ör. caffeine, ibuprofen, glucose) dene.`;
      }
    }

    // Hazır kütüphane ve Sınıf Tepkimeleri butonları
    rootEl.querySelector('#msPresets').innerHTML = PRESETS.map((p) => `
      <button class="chip-btn" data-mspreset="${p.id}">${p.name} (${p.formula})</button>
    `).join('');

    rootEl.querySelector('#msDemos').innerHTML = REACTION_DEMOS.map((d) => `
      <button class="reagent-btn" data-msdemo="${d.id}">
        <span class="reagent-dot" style="background:#3ddcc4"></span>
        <div><b>${d.title}</b><small>${d.eq}</small></div>
      </button>
    `).join('');

    // Olay dinleyicileri
    rootEl.addEventListener('click', (e) => {
      const tBtn = e.target.closest('[data-mstool]');
      if (tBtn) {
        state.tool = tBtn.dataset.mstool;
        rootEl.querySelectorAll('[data-mstool]').forEach((b) => b.classList.toggle('active', b === tBtn));
        return;
      }

      const elBtn = e.target.closest('[data-msel]');
      if (elBtn) {
        state.activeEl = elBtn.dataset.msel;
        state.tool = 'atom';
        rootEl.querySelectorAll('[data-msel]').forEach((b) => b.classList.toggle('active', b === elBtn));
        rootEl.querySelectorAll('[data-mstool]').forEach((b) => b.classList.toggle('active', b.dataset.mstool === 'atom'));
        return;
      }

      const repBtn = e.target.closest('[data-msrep]');
      if (repBtn) {
        state.repMode = repBtn.dataset.msrep;
        rootEl.querySelectorAll('[data-msrep]').forEach((b) => b.classList.toggle('active', b === repBtn));
        render3D();
        return;
      }

      const lvlBtn = e.target.closest('[data-mslvl]');
      if (lvlBtn) {
        state.level = lvlBtn.dataset.mslvl;
        rootEl.querySelectorAll('[data-mslvl]').forEach((b) => b.classList.toggle('active', b === lvlBtn));
        updateValidityAndInfo();
        return;
      }

      const prBtn = e.target.closest('[data-mspreset]');
      if (prBtn) {
        const found = PRESETS.find((x) => x.id === prBtn.dataset.mspreset);
        if (found) loadPreset(found);
        return;
      }

      const dmBtn = e.target.closest('[data-msdemo]');
      if (dmBtn) {
        const demo = REACTION_DEMOS.find((x) => x.id === dmBtn.dataset.msdemo);
        if (demo) {
          state.demoState = { demo, t: 0, dir: 1 };
          rootEl.querySelector('#msMolTitle').textContent = `${demo.type}: ${demo.title}`;
          rootEl.querySelector('#msMolText').textContent = state.level === 'basic' ? demo.basic : demo.advanced;
          rootEl.querySelector('#msMolUses').textContent = `Denklem: ${demo.eq}`;
        }
        return;
      }

      if (e.target.closest('#msAddH')) { addImplicitHydrogens(); return; }
      if (e.target.closest('#msClear')) {
        state.atoms = []; state.bonds = []; state.coords3d = null; state.demoState = null;
        refreshAll();
        return;
      }
      if (e.target.closest('#msPubchemBtn')) {
        const q = rootEl.querySelector('#msPubchemInput').value.trim();
        if (q) fetchFromPubChem(q);
      }
    });

    rootEl.querySelector('#msPubchemInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) fetchFromPubChem(q);
      }
    });

    if (v3d) {
      v3d.onFrame((dt) => {
        if (state.demoState) {
          state.demoState.t += dt * 0.38 * state.demoState.dir;
          if (state.demoState.t >= 1) { state.demoState.t = 1; state.demoState.dir = -1; }
          if (state.demoState.t <= 0) { state.demoState.t = 0; state.demoState.dir = 1; }
          render3D();
        }
      });
    }

    setTimeout(() => loadPreset(PRESETS[0]), 60);

    return {
      setRunning(r) {
        if (v3d) v3d.setRunning(r);
        if (r) setTimeout(() => { resize2D(); refreshAll(); }, 30);
      },
    };
  }

  window.MolStudio = { init };
})();
