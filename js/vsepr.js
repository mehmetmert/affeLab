/* Elementa — Zperiod Shapes (/shape/#model/...) Tam Özellikli 3B VSEPR Laboratuvarı
 * Modlar:
 *   1. Model (Serbest 3B Oluşturucu: Tekli/İkili/Üçlü Bağ + Ortaklanmamış Çift, Canlı VSEPR İtme Fiziği,
 *      Atomları Sürükleme, Bağ Açıları Yayı, Koordinasyon Çokyüzlüsü, Dipol Vektörü, #model/l URL Hash, 10 Ders)
 *   2. Gerçek Moleküller (32+ gerçek molekül ve iyon, Gerçek vs İdeal açı geçişi, gerçek bağ uzunlukları Å)
 *   3. VSEPR Matrisi (Sterik sayı 2–6 × Ortaklanmamış çift 0–3 etkileşimli tablo ve koleksiyon takibi)
 *   4. 3B VSEPR Testi (Canlı 3B molekül üzerinde geometri, hibritleşme, açı, polarite ve AXE soruları)
 */
(function () {
  'use strict';

  const V3 = THREE.Vector3;
  const DEG = Math.PI / 180;
  const MAX_GROUPS = 6;
  const MODEL_LEN = 2.25;

  // VSEPR itme katsayıları: Ortaklanmamış-Ortaklanmamış > Ortaklanmamış-Bağ > Bağ-Bağ
  const W = { bb: 1.0, bl: 1.22, ll: 1.48 };
  const pairW = (a, b) => (a === 'bond' && b === 'bond' ? W.bb : a === 'lone' && b === 'lone' ? W.ll : W.bl);

  const ELEMENTS = {
    H:  { color: 0xf4f1ec, hex: '#f4f1ec', r: 0.32, en: 2.20, name: 'Hidrojen' },
    Be: { color: 0xa3d9a5, hex: '#a3d9a5', r: 0.50, en: 1.57, name: 'Berilyum' },
    B:  { color: 0xf2a6a0, hex: '#f2a6a0', r: 0.46, en: 2.04, name: 'Bor' },
    C:  { color: 0x5c6474, hex: '#5c6474', r: 0.48, en: 2.55, name: 'Karbon' },
    N:  { color: 0x5b7cfa, hex: '#5b7cfa', r: 0.46, en: 3.04, name: 'Azot' },
    O:  { color: 0xff5a4a, hex: '#ff5a4a', r: 0.44, en: 3.44, name: 'Oksijen' },
    F:  { color: 0x7ddc8f, hex: '#7ddc8f', r: 0.40, en: 3.98, name: 'Flor' },
    Si: { color: 0xe6bf98, hex: '#e6bf98', r: 0.56, en: 1.90, name: 'Silisyum' },
    P:  { color: 0xff9a3c, hex: '#ff9a3c', r: 0.60, en: 2.19, name: 'Fosfor' },
    S:  { color: 0xffd23f, hex: '#ffd23f', r: 0.58, en: 2.58, name: 'Kükürt' },
    Cl: { color: 0x34c76b, hex: '#34c76b', r: 0.56, en: 3.16, name: 'Klor' },
    Se: { color: 0xee9a3a, hex: '#ee9a3a', r: 0.62, en: 2.55, name: 'Selenyum' },
    Br: { color: 0xc8553d, hex: '#c8553d', r: 0.62, en: 2.96, name: 'Brom' },
    I:  { color: 0xa05fd6, hex: '#a05fd6', r: 0.68, en: 2.66, name: 'İyot' },
    Xe: { color: 0x6fcde6, hex: '#6fcde6', r: 0.66, en: 2.60, name: 'Ksenon' },
  };

  const GEO_NAMES = {
    'single-atom': 'Tek Atom (Merkez)',
    'diatomic': 'İki Atomlu Doğrusal',
    'linear': 'Doğrusal',
    'bent': 'Kırık (Açısal)',
    'trigonal-planar': 'Düzlem Üçgen',
    'trigonal-pyramidal': 'Üçgen Piramit',
    't-shaped': 'T-Şekli',
    'tetrahedral': 'Düzgün Dörtyüzlü',
    'seesaw': 'Tahterevalli',
    'square-planar': 'Kare Düzlem',
    'trigonal-bipyramidal': 'Üçgen Çift Piramit',
    'square-pyramidal': 'Kare Piramit',
    'octahedral': 'Düzgün Sekizyüzlü',
  };

  const ELECTRON_KEYS = {
    1: 'diatomic',
    2: 'linear',
    3: 'trigonal-planar',
    4: 'tetrahedral',
    5: 'trigonal-bipyramidal',
    6: 'octahedral',
  };

  const HYBRID = { 1: '—', 2: 'sp', 3: 'sp²', 4: 'sp³', 5: 'sp³d', 6: 'sp³d²' };
  const IDEAL_ANGLES = { 1: [], 2: [180], 3: [120], 4: [109.5], 5: [90, 120, 180], 6: [90, 180] };
  const TEXTBOOK_ANGLES = {
    '2-1': '<120°', '3-1': '<109,5°', '2-2': '<109,5°',
    '4-1': '<90° · <120°', '3-2': '<90°', '2-3': '180°',
    '5-1': '<90°', '4-2': '90°',
  };

  const CHART = [
    { n: 2, items: [[2, 0]] },
    { n: 3, items: [[3, 0], [2, 1]] },
    { n: 4, items: [[4, 0], [3, 1], [2, 2]] },
    { n: 5, items: [[5, 0], [4, 1], [3, 2], [2, 3]] },
    { n: 6, items: [[6, 0], [5, 1], [4, 2]] },
  ];
  const CHART_KEYS = CHART.flatMap((r) => r.items.map(([x, e]) => `${x}-${e}`));

  const EXPLAIN = {
    '0-1': 'Merkez atom üzerinde tek bir ortaklanmamış elektron çifti (E) bulutu bulunuyor. Tekli/ikili bağ veya başka çiftler ekleyerek itmeyi gözlemle.',
    '2-0': 'İki bağ bölgesi birbirini maksimum düzeyde iterek 180° açıyla zıt uçlara yerleşir; dipoller birbirini götürür.',
    '3-0': 'Üç bağ bölgesi aynı düzlemde eşkenar üçgen köşelerine (120°) yerleşir.',
    '2-1': 'Ortaklanmamış elektron çifti (E) bağlardan daha fazla hacim kaplar ve bağ açısını 120°’nin altına sıkıştırır.',
    '4-0': 'Dört bağ bölgesi 3 boyutlu uzayda birbirinden en uzak düzen olan düzgün dörtyüzlü (109,5°) oluşturur.',
    '3-1': 'Tepe noktasındaki ortaklanmamış çift, üç bağı aşağı doğru iterek üçgen piramit oluşturur (≈107°).',
    '2-2': 'İki ortaklanmamış çift, bağ-bağ itmesinden çok daha güçlü itme uygulayarak açıyı ≈104,5°’ye daraltır.',
    '5-0': 'Beş bölge üçgen çift piramit oluşturur: 3 ekvatoral (120°) ve 2 eksenel (90°) konum.',
    '4-1': 'Ortaklanmamış çift 90° komşuluğun daha az olduğu ekvatoral konumu seçer; molekül tahterevalli şeklini alır.',
    '3-2': 'İki ortaklanmamış çift ekvatoral konumlara yerleşir; geriye kalan üç bağ T-şekli oluşturur.',
    '2-3': 'Üç ortaklanmamış çift ekvatoral düzlemi tamamen doldurur; iki bağ 180° doğrusal kalır.',
    '6-0': 'Altı özdeş bağ eksenler boyunca simetrik düzgün sekizyüzlü (90° ve 180°) oluşturur.',
    '5-1': 'Ortaklanmamış çift bir köşeyi kapladığında kalan beş bağ kare piramit oluşturur.',
    '4-2': 'İki ortaklanmamış çift birbirinden en uzak (180° trans) konumları seçer; dört bağ kare düzlemde kalır.',
  };

  const L = (s, o = 1) => ({ s, o });
  const MOLECULES = [
    { id: 'CO2', f: 'CO₂', name: 'Karbondioksit', c: 'C', lig: [L('O', 2), L('O', 2)], E: 0, shape: 'linear', len: 1.16, ang: 180 },
    { id: 'BeCl2', f: 'BeCl₂', name: 'Berilyum klorür', c: 'Be', lig: [L('Cl'), L('Cl')], E: 0, shape: 'linear', len: 1.75, ang: 180 },
    { id: 'HCN', f: 'HCN', name: 'Hidrojen siyanür', c: 'C', lig: [L('H'), L('N', 3)], E: 0, shape: 'linear', len: 1.15, ang: 180, polar: true },
    { id: 'CS2', f: 'CS₂', name: 'Karbon disülfür', c: 'C', lig: [L('S', 2), L('S', 2)], E: 0, shape: 'linear', len: 1.55, ang: 180 },
    { id: 'BF3', f: 'BF₃', name: 'Bor triflorür', c: 'B', lig: [L('F'), L('F'), L('F')], E: 0, shape: 'trigonal-planar', len: 1.31, ang: 120 },
    { id: 'SO3', f: 'SO₃', name: 'Kükürt trioksit', c: 'S', lig: [L('O', 2), L('O', 2), L('O', 2)], E: 0, shape: 'trigonal-planar', len: 1.42, ang: 120 },
    { id: 'NO3', f: 'NO₃⁻', name: 'Nitrat iyonu', c: 'N', lig: [L('O', 2), L('O'), L('O')], E: 0, shape: 'trigonal-planar', len: 1.24, ang: 120, ion: -1 },
    { id: 'CH2O', f: 'CH₂O', name: 'Formaldehit', c: 'C', lig: [L('O', 2), L('H'), L('H')], E: 0, shape: 'trigonal-planar', len: 1.21, ang: 116.5, polar: true },
    { id: 'COCl2', f: 'COCl₂', name: 'Fosgen', c: 'C', lig: [L('O', 2), L('Cl'), L('Cl')], E: 0, shape: 'trigonal-planar', len: 1.74, ang: 111.8, polar: true },
    { id: 'SO2', f: 'SO₂', name: 'Kükürt dioksit', c: 'S', lig: [L('O', 2), L('O', 2)], E: 1, shape: 'bent', len: 1.43, ang: 119.5, polar: true },
    { id: 'O3', f: 'O₃', name: 'Ozon', c: 'O', lig: [L('O', 2), L('O')], E: 1, shape: 'bent', len: 1.28, ang: 116.8, polar: true },
    { id: 'NO2', f: 'NO₂⁻', name: 'Nitrit iyonu', c: 'N', lig: [L('O', 2), L('O')], E: 1, shape: 'bent', len: 1.25, ang: 115.4, ion: -1, polar: true },
    { id: 'CH4', f: 'CH₄', name: 'Metan', c: 'C', lig: [L('H'), L('H'), L('H'), L('H')], E: 0, shape: 'tetrahedral', len: 1.09, ang: 109.5 },
    { id: 'CCl4', f: 'CCl₄', name: 'Karbon tetraklorür', c: 'C', lig: [L('Cl'), L('Cl'), L('Cl'), L('Cl')], E: 0, shape: 'tetrahedral', len: 1.77, ang: 109.5 },
    { id: 'SiH4', f: 'SiH₄', name: 'Silan', c: 'Si', lig: [L('H'), L('H'), L('H'), L('H')], E: 0, shape: 'tetrahedral', len: 1.48, ang: 109.5 },
    { id: 'NH4', f: 'NH₄⁺', name: 'Amonyum iyonu', c: 'N', lig: [L('H'), L('H'), L('H'), L('H')], E: 0, shape: 'tetrahedral', len: 1.03, ang: 109.5, ion: 1 },
    { id: 'SO4', f: 'SO₄²⁻', name: 'Sülfat iyonu', c: 'S', lig: [L('O', 2), L('O', 2), L('O'), L('O')], E: 0, shape: 'tetrahedral', len: 1.49, ang: 109.5, ion: -2 },
    { id: 'NH3', f: 'NH₃', name: 'Amonyak', c: 'N', lig: [L('H'), L('H'), L('H')], E: 1, shape: 'trigonal-pyramidal', len: 1.01, ang: 107.0, polar: true },
    { id: 'PH3', f: 'PH₃', name: 'Fosfin', c: 'P', lig: [L('H'), L('H'), L('H')], E: 1, shape: 'trigonal-pyramidal', len: 1.42, ang: 93.5, polar: true },
    { id: 'NF3', f: 'NF₃', name: 'Azot triflorür', c: 'N', lig: [L('F'), L('F'), L('F')], E: 1, shape: 'trigonal-pyramidal', len: 1.37, ang: 102.3, polar: true },
    { id: 'PCl3', f: 'PCl₃', name: 'Fosfor triklorür', c: 'P', lig: [L('Cl'), L('Cl'), L('Cl')], E: 1, shape: 'trigonal-pyramidal', len: 2.04, ang: 100.3, polar: true },
    { id: 'H3O', f: 'H₃O⁺', name: 'Hidronyum iyonu', c: 'O', lig: [L('H'), L('H'), L('H')], E: 1, shape: 'trigonal-pyramidal', len: 0.98, ang: 113.0, ion: 1, polar: true },
    { id: 'H2O', f: 'H₂O', name: 'Su', c: 'O', lig: [L('H'), L('H')], E: 2, shape: 'bent', len: 0.96, ang: 104.5, polar: true },
    { id: 'H2S', f: 'H₂S', name: 'Hidrojen sülfür', c: 'S', lig: [L('H'), L('H')], E: 2, shape: 'bent', len: 1.34, ang: 92.1, polar: true },
    { id: 'OF2', f: 'OF₂', name: 'Oksijen diflorür', c: 'O', lig: [L('F'), L('F')], E: 2, shape: 'bent', len: 1.41, ang: 103.1, polar: true },
    { id: 'SCl2', f: 'SCl₂', name: 'Kükürt diklorür', c: 'S', lig: [L('Cl'), L('Cl')], E: 2, shape: 'bent', len: 2.01, ang: 102.7, polar: true },
    { id: 'PCl5', f: 'PCl₅', name: 'Fosfor pentaklorür', c: 'P', lig: [L('Cl'), L('Cl'), L('Cl'), L('Cl'), L('Cl')], E: 0, shape: 'trigonal-bipyramidal', len: 2.06, ang: 90, ang2: 120 },
    { id: 'PF5', f: 'PF₅', name: 'Fosfor pentaflorür', c: 'P', lig: [L('F'), L('F'), L('F'), L('F'), L('F')], E: 0, shape: 'trigonal-bipyramidal', len: 1.58, ang: 90, ang2: 120 },
    { id: 'SF4', f: 'SF₄', name: 'Kükürt tetraflorür', c: 'S', lig: [L('F'), L('F'), L('F'), L('F')], E: 1, shape: 'seesaw', len: 1.60, ang: 173.1, ang2: 101.6, polar: true },
    { id: 'SeF4', f: 'SeF₄', name: 'Selenyum tetraflorür', c: 'Se', lig: [L('F'), L('F'), L('F'), L('F')], E: 1, shape: 'seesaw', len: 1.69, ang: 169.2, ang2: 100.6, polar: true },
    { id: 'ClF3', f: 'ClF₃', name: 'Klor triflorür', c: 'Cl', lig: [L('F'), L('F'), L('F')], E: 2, shape: 't-shaped', len: 1.70, ang: 87.5, polar: true },
    { id: 'BrF3', f: 'BrF₃', name: 'Brom triflorür', c: 'Br', lig: [L('F'), L('F'), L('F')], E: 2, shape: 't-shaped', len: 1.72, ang: 86.2, polar: true },
    { id: 'XeF2', f: 'XeF₂', name: 'Ksenon diflorür', c: 'Xe', lig: [L('F'), L('F')], E: 3, shape: 'linear', len: 1.98, ang: 180 },
    { id: 'I3', f: 'I₃⁻', name: 'Triiyodür iyonu', c: 'I', lig: [L('I'), L('I')], E: 3, shape: 'linear', len: 2.93, ang: 180, ion: -1 },
    { id: 'SF6', f: 'SF₆', name: 'Kükürt hekzaflorür', c: 'S', lig: [L('F'), L('F'), L('F'), L('F'), L('F'), L('F')], E: 0, shape: 'octahedral', len: 1.56, ang: 90 },
    { id: 'BrF5', f: 'BrF₅', name: 'Brom pentaflorür', c: 'Br', lig: [L('F'), L('F'), L('F'), L('F'), L('F')], E: 1, shape: 'square-pyramidal', len: 1.77, ang: 84.8, polar: true },
    { id: 'IF5', f: 'IF₅', name: 'İyot pentaflorür', c: 'I', lig: [L('F'), L('F'), L('F'), L('F'), L('F')], E: 1, shape: 'square-pyramidal', len: 1.85, ang: 81.9, polar: true },
    { id: 'XeF4', f: 'XeF₄', name: 'Ksenon tetraflorür', c: 'Xe', lig: [L('F'), L('F'), L('F'), L('F')], E: 2, shape: 'square-planar', len: 1.95, ang: 90 },
    { id: 'ICl4', f: 'ICl₄⁻', name: 'Tetrakloroiyodat(III)', c: 'I', lig: [L('Cl'), L('Cl'), L('Cl'), L('Cl')], E: 2, shape: 'square-planar', len: 2.47, ang: 90, ion: -1 },
  ];

  // 10 Adımlı Rehberli VSEPR Dersleri
  const LESSONS = [
    { cfg: 'b1b1', title: '1. Doğrusal Geometri (AX₂)', text: 'İki bağ bölgesi birbirini iterek mümkün olan en uzak konuma, yani 180° zıt uçlara yerleşir.' },
    { cfg: 'b1b1b1', title: '2. Düzlem Üçgen (AX₃)', text: 'Üçüncü bir bağ eklendiğinde üç grup bir düzlem üzerinde 120°’lik eşkenar üçgen oluşturur.' },
    { cfg: 'b1b1b1b1', title: '3. Düzgün Dörtyüzlü (AX₄)', text: 'Dört grup düzlemde 90° kalmak yerine 3 boyutlu uzayı kullanarak 109,5° açılı dörtyüzlüye açılır.' },
    { cfg: 'b1b1b1l', title: '4. Üçgen Piramit (AX₃E)', text: 'Bir bağ yerine ortaklanmamış çift (E) koyduğumuzda, elektron bulutu bağları daha çok iter (NH₃ gibi).' },
    { cfg: 'b1b1ll', title: '5. Kırık / Açısal (AX₂E₂)', text: 'Su (H₂O) gibi iki ortaklanmamış çift içeren moleküllerde bağ açısı daha da sıkışır (≈104,5°).' },
    { cfg: 'b2b2', title: '6. Çoklu Bağlar (CO₂)', text: 'İkili veya üçlü bağlar VSEPR kuramında tek bir elektron bölgesi sayılır; CO₂ bu yüzden doğrusaldır.' },
    { cfg: 'b1b1b1b1b1', title: '7. Üçgen Çift Piramit (AX₅)', text: 'Beş elektron bölgesinde iki farklı konum ortaya çıkar: 3 ekvatoral (120°) ve 2 eksenel (90°).' },
    { cfg: 'b1b1b1b1l', title: '8. Tahterevalli (AX₄E)', text: 'Beş bölgede ortaklanmamış çift her zaman daha geniş olan ekvatoral konumu seçer (SF₄).' },
    { cfg: 'b1b1b1b1b1b1', title: '9. Düzgün Sekizyüzlü (AX₆)', text: 'Altı bağ x, y ve z eksenleri boyunca 90° açılarla tamamen simetrik bir sekizyüzlü oluşturur.' },
    { cfg: 'b1b1b1b1ll', title: '10. Kare Düzlem (AX₄E₂)', text: 'Sekizyüzlüde iki ortaklanmamış çift birbirinden en uzak 180° trans konumlara geçer; bağlar kare düzlemde kalır (XeF₄).' },
  ];

  function moleculeKey(X, E) {
    if (X + E === 0) return 'single-atom';
    if (X === 0) return 'single-atom';
    if (X === 1) return 'diatomic';
    if (X === 2) return E === 0 ? 'linear' : E <= 2 ? 'bent' : 'linear';
    if (X === 3) return ['trigonal-planar', 'trigonal-pyramidal', 't-shaped', 't-shaped'][E] || 't-shaped';
    if (X === 4) return ['tetrahedral', 'seesaw', 'square-planar'][E] || 'square-planar';
    if (X === 5) return E === 0 ? 'trigonal-bipyramidal' : 'square-pyramidal';
    return 'octahedral';
  }

  function axeString(X, E) {
    if (X + E === 0) return 'A';
    const xPart = X === 0 ? '' : X === 1 ? 'X' : `X<sub>${X}</sub>`;
    const ePart = E === 0 ? '' : E === 1 ? 'E' : `E<sub>${E}</sub>`;
    return `A${xPart}${ePart}`;
  }

  function mulberry(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randUnit(rng = Math.random) {
    let x, y, z, l;
    do {
      x = rng() * 2 - 1; y = rng() * 2 - 1; z = rng() * 2 - 1;
      l = x * x + y * y + z * z;
    } while (l > 1 || l < 0.01);
    return new V3(x, y, z).multiplyScalar(1 / Math.sqrt(l));
  }

  function relax(dirs, kinds, fixed, iters = 600) {
    const n = dirs.length;
    const F = dirs.map(() => new V3());
    const d = new V3();
    for (let it = 0; it < iters; it++) {
      for (let i = 0; i < n; i++) F[i].set(0, 0, 0);
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          d.subVectors(dirs[i], dirs[j]);
          const L = Math.max(d.length(), 1e-4);
          const f = pairW(kinds[i], kinds[j]) / (L * L * L);
          F[i].addScaledVector(d, f);
          F[j].addScaledVector(d, -f);
        }
      }
      for (let i = 0; i < n; i++) {
        if (fixed && fixed[i]) continue;
        F[i].addScaledVector(dirs[i], -F[i].dot(dirs[i]));
        const m = F[i].length();
        if (m > 0.12) F[i].multiplyScalar(0.12 / m);
        dirs[i].addScaledVector(F[i], 0.5).normalize();
      }
    }
  }

  function energy(dirs, kinds) {
    let E = 0;
    for (let i = 0; i < dirs.length; i++) {
      for (let j = i + 1; j < dirs.length; j++) {
        E += pairW(kinds[i], kinds[j]) / Math.max(dirs[i].distanceTo(dirs[j]), 1e-4);
      }
    }
    return E;
  }

  const bestCache = {};
  function bestEnergy(X, E) {
    const key = `${X}-${E}`;
    if (bestCache[key] !== undefined) return bestCache[key];
    const kinds = [...Array(X).fill('bond'), ...Array(E).fill('lone')];
    const rng = mulberry(7 + X * 13 + E * 101);
    let best = Infinity;
    for (let r = 0; r < 24; r++) {
      const dirs = kinds.map(() => randUnit(rng));
      relax(dirs, kinds, null, 750);
      best = Math.min(best, energy(dirs, kinds));
    }
    bestCache[key] = best;
    return best;
  }

  function angleBetween(a, b) {
    return Math.acos(Math.max(-1, Math.min(1, a.dot(b)))) / DEG;
  }

  function encodeConfig(groups) {
    return groups.map((g) => (g.kind === 'bond' ? `b${g.order}` : 'l')).join('');
  }

  function decodeConfig(code) {
    const out = [];
    const re = /b([123])|l/g;
    let m;
    while ((m = re.exec(code || ''))) {
      out.push(m[0] === 'l' ? { kind: 'lone', order: 1 } : { kind: 'bond', order: +m[1] });
    }
    return out;
  }

  // Gerçek molekül için gerçek veya ideal bağ/ortaklanmamış çift yönlerini üret
  function realMoleculeLayout(mol, useIdeal) {
    const X = mol.lig.length, E = mol.E;
    const kinds = [...Array(X).fill('bond'), ...Array(E).fill('lone')];
    const rng = mulberry(31 + X * 11 + E * 19);
    let bestDirs = null, bestE = Infinity;
    for (let r = 0; r < 18; r++) {
      const dirs = kinds.map(() => randUnit(rng));
      // İdeal modda tüm çift ağırlıklarını eşit al, gerçek modda lone-pair sıkıştırmasını uygula
      const n = dirs.length;
      const F = dirs.map(() => new V3());
      const d = new V3();
      for (let it = 0; it < 650; it++) {
        for (let i = 0; i < n; i++) F[i].set(0, 0, 0);
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            d.subVectors(dirs[i], dirs[j]);
            const L = Math.max(d.length(), 1e-4);
            const w = useIdeal ? 1.0 : pairW(kinds[i], kinds[j]);
            const f = w / (L * L * L);
            F[i].addScaledVector(d, f);
            F[j].addScaledVector(d, -f);
          }
        }
        for (let i = 0; i < n; i++) {
          F[i].addScaledVector(dirs[i], -F[i].dot(dirs[i]));
          const m = F[i].length();
          if (m > 0.12) F[i].multiplyScalar(0.12 / m);
          dirs[i].addScaledVector(F[i], 0.5).normalize();
        }
      }
      const en = energy(dirs, kinds);
      if (en < bestE) { bestE = en; bestDirs = dirs; }
    }
    // 2 bağ + açı tanımlıysa (ör. H2O 104.5°, H2S 92.1°) gerçek açıyı tam uygula
    if (!useIdeal && X === 2 && mol.ang && E > 0) {
      const half = (mol.ang / 2) * DEG;
      bestDirs[0].set(Math.sin(half), Math.cos(half), 0);
      bestDirs[1].set(-Math.sin(half), Math.cos(half), 0);
      const fixed = bestDirs.map((_, idx) => idx < 2);
      relax(bestDirs, kinds, fixed, 450);
    }
    return {
      bonds: bestDirs.slice(0, X),
      lones: bestDirs.slice(X),
    };
  }

  /* ---------- Canlı VSEPR Fizik Modeli ---------- */
  let gidCounter = 1;
  class LiveVSEPRModel {
    constructor() {
      this.groups = [];
      this.target = null;
      this.settled = true;
      this.quiet = 0;
      this.onChange = null;
      this.onSettled = null;
    }

    counts() {
      let X = 0, E = 0;
      for (const g of this.groups) {
        if (g.kind === 'bond') X++; else E++;
      }
      return { X, E, n: X + E };
    }

    computeTarget() {
      const n = this.groups.length;
      if (n < 2 || this.groups.some((g) => g.dragging)) {
        this.target = null;
        return;
      }
      const kinds = this.groups.map((g) => g.kind);
      const { X, E } = this.counts();
      const targetBest = bestEnergy(X, E);
      const orig = this.groups.map((g) => g.dir.clone());
      let cand = orig.map((d) => d.clone());
      relax(cand, kinds, null, 700);
      let bestCand = cand, bestEn = energy(cand, kinds);
      for (let a = 0; a < 45 && bestEn > targetBest * 1.0001 + 1e-5; a++) {
        cand = orig.map((d, i) => (kinds[i] === 'lone' || a % 2 === 1
          ? d.clone().addScaledVector(randUnit(), 0.75).normalize()
          : d.clone()));
        relax(cand, kinds, null, 700);
        const en = energy(cand, kinds);
        if (en < bestEn) { bestEn = en; bestCand = cand; }
      }
      this.target = new Map(this.groups.map((g, i) => [g.id, bestCand[i]]));
    }

    touch() {
      this.settled = false;
      this.quiet = 0;
      this.computeTarget();
      if (this.onChange) this.onChange();
    }

    add(kind, order = 1) {
      if (this.groups.length >= MAX_GROUPS) return false;
      let bestDir = new V3(1, 0, 0), bestScore = -1;
      for (let i = 0; i < 28; i++) {
        const c = randUnit();
        let minD = 4;
        for (const o of this.groups) minD = Math.min(minD, c.distanceTo(o.dir));
        if (minD > bestScore) { bestScore = minD; bestDir = c; }
      }
      this.groups.push({
        id: gidCounter++,
        kind,
        order: kind === 'lone' ? 1 : order,
        dir: bestDir,
        vel: new V3(),
        dragging: false,
      });
      this.touch();
      return true;
    }

    removeById(id) {
      const idx = this.groups.findIndex((g) => g.id === id);
      if (idx >= 0) {
        this.groups.splice(idx, 1);
        this.touch();
      }
    }

    clear() {
      this.groups.length = 0;
      this.touch();
    }

    setFromList(list) {
      this.groups.length = 0;
      list.slice(0, MAX_GROUPS).forEach((item) => {
        this.add(item.kind, item.order || 1);
      });
      if (list.length === 0) this.touch();
    }

    shake() {
      this.groups.forEach((g) => {
        g.dir.addScaledVector(randUnit(), 0.95).normalize();
      });
      this.touch();
    }

    step(dt) {
      const n = this.groups.length;
      if (n === 0) return;
      const clampedDt = Math.min(dt, 0.05);
      const sub = 4;
      const h = clampedDt / sub;
      const d = new V3();
      const F = this.groups.map(() => new V3());
      let maxV = 0;

      for (let s = 0; s < sub; s++) {
        for (let i = 0; i < n; i++) F[i].set(0, 0, 0);
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            d.subVectors(this.groups[i].dir, this.groups[j].dir);
            const L = Math.max(d.length(), 1e-3);
            const f = pairW(this.groups[i].kind, this.groups[j].kind) / (L * L * L);
            F[i].addScaledVector(d, f);
            F[j].addScaledVector(d, -f);
          }
        }
        for (let i = 0; i < n; i++) {
          const g = this.groups[i];
          if (g.dragging) continue;
          const T = this.target && this.target.get(g.id);
          if (T) F[i].addScaledVector(d.subVectors(T, g.dir), 2.5);
          F[i].addScaledVector(g.dir, -F[i].dot(g.dir));
          g.vel.addScaledVector(F[i], 44 * h);
          g.vel.multiplyScalar(Math.exp(-7.5 * h));
          if (g.vel.length() > 6) g.vel.multiplyScalar(6 / g.vel.length());
          g.dir.addScaledVector(g.vel, h).normalize();
          g.vel.addScaledVector(g.dir, -g.vel.dot(g.dir));
          maxV = Math.max(maxV, g.vel.length());
        }
      }

      if (!this.groups.some((g) => g.dragging) && maxV < 0.04) {
        this.quiet += clampedDt;
        if (!this.settled && this.quiet > 0.35) {
          this.settled = true;
          if (this.onSettled) this.onSettled();
        }
      } else {
        this.quiet = 0;
      }
    }
  }

  /* ---------- 3B Çizim Yardımcıları ---------- */
  const UP = new V3(0, 1, 0);

  function addBondCylinders(parent, dir, len, order, color = 0x9aa6c2) {
    const end = dir.clone().multiplyScalar(len);
    const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    const perp = new V3(Math.abs(dir.x) < 0.9 ? 1 : 0, Math.abs(dir.x) < 0.9 ? 0 : 1, 0).cross(dir).normalize();
    const offsets = order === 1 ? [0] : order === 2 ? [-0.12, 0.12] : [-0.18, 0, 0.18];
    const radius = order === 1 ? 0.105 : order === 2 ? 0.072 : 0.056;
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.1 });

    offsets.forEach((off) => {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 18), mat);
      cyl.position.copy(end).multiplyScalar(0.5).addScaledVector(perp, off);
      cyl.quaternion.copy(quat);
      parent.add(cyl);
    });
  }

  function addLonePairCloud(parent, dir, gid) {
    const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    const lobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.52, 28, 20),
      new THREE.MeshPhongMaterial({ color: 0xb48cff, emissive: 0x3b1d7a, emissiveIntensity: 0.35, transparent: true, opacity: 0.38, depthWrite: false }),
    );
    lobe.scale.set(0.76, 1.32, 0.76);
    lobe.position.copy(dir).multiplyScalar(1.32);
    lobe.quaternion.copy(quat);
    lobe.userData.gid = gid;
    parent.add(lobe);

    const perp = new V3(Math.abs(dir.x) < 0.9 ? 1 : 0, Math.abs(dir.x) < 0.9 ? 0 : 1, 0).cross(dir).normalize();
    [-1, 1].forEach((s) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xf1e8ff }),
      );
      dot.position.copy(dir).multiplyScalar(1.46).addScaledVector(perp, 0.17 * s);
      dot.userData.gid = gid;
      parent.add(dot);
    });
  }

  function addAngleArcs(parent, bondDirs) {
    if (bondDirs.length < 2) return;
    // En yakın komşu bağ çiftlerini bul
    const pairs = [];
    const n = bondDirs.length;
    const minAngles = bondDirs.map((a, i) => {
      let m = 180;
      for (let j = 0; j < n; j++) if (i !== j) m = Math.min(m, angleBetween(a, bondDirs[j]));
      return m;
    });
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const ang = angleBetween(bondDirs[i], bondDirs[j]);
        if (ang <= 1.18 * Math.min(minAngles[i], minAngles[j]) + 1.5) {
          pairs.push([i, j, ang]);
        }
      }
    }

    const arcMat = new THREE.LineBasicMaterial({ color: 0x3ddcc4, transparent: true, opacity: 0.85 });
    pairs.slice(0, 6).forEach(([i, j, ang]) => {
      const a = bondDirs[i], b = bondDirs[j];
      const pts = [];
      const steps = 24;
      const r = 1.05;
      for (let k = 0; k <= steps; k++) {
        const t = k / steps;
        const p = new V3().copy(a).lerp(b, t);
        if (p.lengthSq() < 1e-4) p.set(0, 1, 0);
        p.normalize().multiplyScalar(r);
        pts.push(p);
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      parent.add(new THREE.Line(geo, arcMat));
      const mid = pts[Math.floor(steps / 2)].clone().multiplyScalar(1.22);
      const lbl = Viewer3D.label(`${ang.toFixed(ang % 1 === 0 ? 0 : 1).replace('.', ',')}°`, '#3ddcc4', 0.56);
      lbl.position.copy(mid);
      parent.add(lbl);
    });
  }

  function addCoordinationHull(parent, dirs, len) {
    if (dirs.length < 3) return;
    const pts = dirs.map((d) => d.clone().multiplyScalar(len));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x7aa2ff, transparent: true, opacity: 0.42 });
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const ang = angleBetween(dirs[i], dirs[j]);
        if (ang < 145) {
          const geo = new THREE.BufferGeometry().setFromPoints([pts[i], pts[j]]);
          parent.add(new THREE.Line(geo, lineMat));
        }
      }
    }
  }

  function addDipoleArrow(parent, dipVec) {
    if (!dipVec || dipVec.length() < 0.08) return;
    const dir = dipVec.clone().normalize();
    const len = 2.8;
    const arrow = new THREE.ArrowHelper(dir, dir.clone().multiplyScalar(-len * 0.45), len, 0xffb347, 0.48, 0.28);
    parent.add(arrow);
    const lbl = Viewer3D.label('μ⃗', '#ffb347', 0.62);
    lbl.position.copy(dir).multiplyScalar(len * 0.68);
    parent.add(lbl);
  }

  /* ---------- Ana Başlatıcı ---------- */
  function init(rootEl) {
    const v = Viewer3D.create(rootEl.querySelector('#vseprViewer'), { distance: 9.5, tilt: 0.32, spin: 0.45, autoRotate: false });
    const liveModel = new LiveVSEPRModel();
    const discovered = new Set(['2-0', '4-0', '2-2']);

    const state = {
      subMode: 'model', // model | real | learn | practice
      showLone: true,
      showAngles: true,
      showHull: false,
      showDipole: false,
      revealElec: true,
      revealMol: true,
      lessonIdx: -1,
      realMolId: 'H2O',
      realUseIdeal: false,
      quiz: null,
      score: 0,
      streak: 0,
    };

    // URL hash kontrolü: örn. #model/l veya #model/b1b1l
    function checkUrlHash() {
      const m = location.hash.match(/^#model\/([bl123]+)$/i);
      if (m) {
        const list = decodeConfig(m[1].toLowerCase());
        liveModel.setFromList(list);
        return true;
      }
      return false;
    }

    if (!checkUrlHash()) {
      liveModel.setFromList(decodeConfig('b1b1l')); // Başlangıçta AX2E
    }

    window.addEventListener('hashchange', () => {
      if (location.hash.startsWith('#model/')) {
        const btn = document.querySelector('.nav-tab[data-tab="vsepr"]');
        if (btn && !btn.classList.contains('active')) btn.click();
        setSubMode('model');
        checkUrlHash();
      }
    });

    // 3B Sahne üzerinde atom/çift sürükleme ve çift tıklama ile silme
    if (v) {
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const dragPlane = new THREE.Plane();
      const hitPoint = new V3();
      let draggedGroup = null;
      const dom = v.renderer.domElement;

      const getIntersects = (e) => {
        const rect = dom.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, v.camera);
        return raycaster.intersectObjects(v.root.children, true);
      };

      dom.addEventListener('pointerdown', (e) => {
        if (state.subMode !== 'model') return;
        const hits = getIntersects(e);
        const hit = hits.find((h) => h.object.userData && h.object.userData.gid);
        if (!hit) return;
        const g = liveModel.groups.find((x) => x.id === hit.object.userData.gid);
        if (!g) return;
        e.stopImmediatePropagation();
        draggedGroup = g;
        g.dragging = true;
        g.vel.set(0, 0, 0);
        liveModel.target = null;
        const camDir = new V3();
        v.camera.getWorldDirection(camDir);
        dragPlane.setFromNormalAndCoplanarPoint(camDir, new V3(0, 0, 0));
        dom.setPointerCapture(e.pointerId);
      }, true);

      dom.addEventListener('pointermove', (e) => {
        if (!draggedGroup) return;
        e.stopImmediatePropagation();
        const rect = dom.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, v.camera);
        if (raycaster.ray.intersectPlane(dragPlane, hitPoint)) {
          const localDir = v.root.worldToLocal(hitPoint.clone()).normalize();
          if (localDir.lengthSq() > 0.1) draggedGroup.dir.copy(localDir);
        }
      }, true);

      const endAtomDrag = () => {
        if (!draggedGroup) return;
        draggedGroup.dragging = false;
        draggedGroup = null;
        liveModel.touch();
      };
      dom.addEventListener('pointerup', endAtomDrag, true);
      dom.addEventListener('pointercancel', endAtomDrag, true);

      dom.addEventListener('dblclick', (e) => {
        if (state.subMode !== 'model') return;
        const hits = getIntersects(e);
        const hit = hits.find((h) => h.object.userData && h.object.userData.gid);
        if (hit) liveModel.removeById(hit.object.userData.gid);
      });
    }

    // Her karede sahneyi çiz
    function rebuildScene() {
      if (!v) return;
      v.clear();
      const g = new THREE.Group();

      if (state.subMode === 'model' || state.subMode === 'practice') {
        const center = new THREE.Mesh(
          new THREE.SphereGeometry(0.56, 32, 24),
          new THREE.MeshStandardMaterial({ color: 0x7c5cff, roughness: 0.32, metalness: 0.1 }),
        );
        g.add(center);
        g.add(Viewer3D.label('A', '#ffffff', 0.62));

        const bondDirs = [];
        const allDirs = [];
        liveModel.groups.forEach((grp) => {
          allDirs.push(grp.dir);
          if (grp.kind === 'lone') {
            if (state.showLone) addLonePairCloud(g, grp.dir, grp.id);
          } else {
            bondDirs.push(grp.dir);
            addBondCylinders(g, grp.dir, MODEL_LEN, grp.order, 0x9fb0cf);
            const p = grp.dir.clone().multiplyScalar(MODEL_LEN);
            const lig = new THREE.Mesh(
              new THREE.SphereGeometry(0.42, 28, 20),
              new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35 }),
            );
            lig.position.copy(p);
            lig.userData.gid = grp.id;
            g.add(lig);
            const lbl = Viewer3D.label('X', '#0f172a', 0.48);
            lbl.position.copy(p);
            g.add(lbl);
          }
        });

        if (state.showAngles) addAngleArcs(g, bondDirs);
        if (state.showHull) addCoordinationHull(g, state.showLone ? allDirs : bondDirs, MODEL_LEN);
        if (state.showDipole && bondDirs.length) {
          const dip = new V3();
          bondDirs.forEach((d) => dip.add(d));
          addDipoleArrow(g, dip);
        }
      } else if (state.subMode === 'real') {
        const mol = MOLECULES.find((m) => m.id === state.realMolId) || MOLECULES[0];
        const lay = realMoleculeLayout(mol, state.realUseIdeal);
        const ce = ELEMENTS[mol.c] || ELEMENTS.C;
        const scale = 1.38;

        const cMesh = new THREE.Mesh(
          new THREE.SphereGeometry(ce.r * 1.05, 32, 24),
          new THREE.MeshStandardMaterial({ color: ce.color, roughness: 0.35 }),
        );
        g.add(cMesh);
        g.add(Viewer3D.label(mol.c, '#ffffff', 0.58));

        const dip = new V3();
        mol.lig.forEach((l, i) => {
          const le = ELEMENTS[l.s] || ELEMENTS.H;
          const dir = lay.bonds[i];
          const bLen = mol.len * scale;
          addBondCylinders(g, dir, bLen, l.o, 0x9fb0cf);
          const p = dir.clone().multiplyScalar(bLen);
          const aMesh = new THREE.Mesh(
            new THREE.SphereGeometry(le.r, 28, 20),
            new THREE.MeshStandardMaterial({ color: le.color, roughness: 0.35 }),
          );
          aMesh.position.copy(p);
          g.add(aMesh);
          const lbl = Viewer3D.label(l.s, l.s === 'H' || l.s === 'F' ? '#0f172a' : '#ffffff', 0.48);
          lbl.position.copy(p);
          g.add(lbl);
          dip.addScaledVector(dir, (le.en - ce.en));
        });

        if (state.showLone) {
          lay.lones.forEach((d) => addLonePairCloud(g, d, null));
        }
        if (state.showAngles) addAngleArcs(g, lay.bonds);
        if (state.showHull) addCoordinationHull(g, lay.bonds, mol.len * scale);
        if (state.showDipole) addDipoleArrow(g, dip);
      }

      v.root.add(g);
    }

    if (v) {
      v.onFrame((dt) => {
        if (state.subMode === 'model' || state.subMode === 'practice') {
          liveModel.step(dt);
          rebuildScene();
        }
      });
    }

    function measuredAnglesText() {
      const bonds = liveModel.groups.filter((g) => g.kind === 'bond');
      if (bonds.length < 2) return '—';
      const vals = [];
      for (let i = 0; i < bonds.length; i++) {
        for (let j = i + 1; j < bonds.length; j++) {
          vals.push(angleBetween(bonds[i].dir, bonds[j].dir));
        }
      }
      vals.sort((a, b) => a - b);
      const clusters = [];
      vals.forEach((val) => {
        const last = clusters[clusters.length - 1];
        if (last && Math.abs(last.avg - val) < 3) {
          last.sum += val; last.n++; last.avg = last.sum / last.n;
        } else {
          clusters.push({ sum: val, n: 1, avg: val });
        }
      });
      return clusters.map((c) => `${c.avg.toFixed(1).replace('.0', '').replace('.', ',')}°`).join(' · ');
    }

    function updateModelUI() {
      const { X, E, n } = liveModel.counts();
      const key = `${X}-${E}`;
      if (CHART_KEYS.includes(key)) discovered.add(key);

      const mKey = moleculeKey(X, E);
      const eKey = ELECTRON_KEYS[n];
      const dip = new V3();
      liveModel.groups.filter((g) => g.kind === 'bond').forEach((g) => dip.add(g.dir));
      const isPolar = X >= 1 && dip.length() > 0.12;

      rootEl.querySelector('#vmAxe').innerHTML = axeString(X, E);
      rootEl.querySelector('#vmElecGeo').textContent = state.revealElec ? (eKey ? GEO_NAMES[eKey] : '—') : 'Gizli (Tahmin Et)';
      rootEl.querySelector('#vmMolGeo').textContent = state.revealMol ? (mKey ? GEO_NAMES[mKey] : '—') : 'Gizli (Tahmin Et)';
      rootEl.querySelector('#vmSteric').textContent = `${n} (${X} bağ + ${E} çift)`;
      rootEl.querySelector('#vmHyb').textContent = HYBRID[n] || '—';
      rootEl.querySelector('#vmIdealAngle').textContent = TEXTBOOK_ANGLES[key] || (IDEAL_ANGLES[n] && IDEAL_ANGLES[n].length ? IDEAL_ANGLES[n].map((a) => `${String(a).replace('.', ',')}°`).join(' · ') : '—');
      rootEl.querySelector('#vmMeasuredAngle').textContent = measuredAnglesText();
      rootEl.querySelector('#vmPolarity').innerHTML = X >= 1
        ? `<span class="pol-badge ${isPolar ? 'polar' : 'nonpolar'}">${isPolar ? 'Polar (μ ≠ 0)' : 'Apolar (μ = 0)'}</span>`
        : '—';
      rootEl.querySelector('#vmExplain').textContent = EXPLAIN[key] || 'Elektron bölgeleri küre üzerinde birbirini iterek minimum enerjili 3B dizilimi bulur.';
      rootEl.querySelector('#vmCountBadge').textContent = `${n} / ${MAX_GROUPS}`;
      rootEl.querySelector('#vmDiscovered').textContent = `${discovered.size} / ${CHART_KEYS.length} Geometri Keşfedildi`;

      // 6'lı Yuva Göstergesi (Tıklayınca siler)
      const slotsEl = rootEl.querySelector('#vmSlots');
      slotsEl.innerHTML = Array.from({ length: MAX_GROUPS }, (_, i) => {
        const g = liveModel.groups[i];
        if (!g) return `<span class="v-slot empty">Boş</span>`;
        const lbl = g.kind === 'lone' ? 'E (Çift)' : `${g.order === 1 ? '—' : g.order === 2 ? '═' : '≡'} Bağ`;
        return `<button class="v-slot filled ${g.kind}" data-rm="${g.id}" title="Kaldırmak için tıkla">${lbl} <span>×</span></button>`;
      }).join('');

      // Bu geometriye sahip gerçek molekül örnekleri
      const exMols = MOLECULES.filter((m) => `${m.lig.length}-${m.E}` === key);
      const exBox = rootEl.querySelector('#vmExamples');
      exBox.innerHTML = exMols.length
        ? exMols.map((m) => `<button class="chip-btn" data-jump-mol="${m.id}">${m.f} (${m.name})</button>`).join('')
        : '<span class="muted">Bu dizilim için örnek seçmek üzere bağ/çift ekle.</span>';

      // Ders kutusu
      const lessonBox = rootEl.querySelector('#vmLessonBox');
      if (state.lessonIdx >= 0) {
        const L = LESSONS[state.lessonIdx];
        lessonBox.hidden = false;
        lessonBox.innerHTML = `
          <div class="v-lesson-head">
            <span>Rehberli Ders ${state.lessonIdx + 1} / ${LESSONS.length}</span>
            <button class="link-btn" id="vmLessonClose">Kapat ×</button>
          </div>
          <h4>${L.title}</h4>
          <p>${L.text}</p>
          <div class="v-lesson-nav">
            <button class="icon-btn" id="vmLessonPrev" ${state.lessonIdx === 0 ? 'disabled' : ''}>← Önceki</button>
            <button class="primary-btn" id="vmLessonNext" style="padding:5px 12px;font-size:12px;">
              ${state.lessonIdx < LESSONS.length - 1 ? 'Sonraki Ders →' : '3B Teste Geç →'}
            </button>
          </div>`;
      } else {
        lessonBox.hidden = true;
      }
    }

    function updateRealUI() {
      const mol = MOLECULES.find((m) => m.id === state.realMolId) || MOLECULES[0];
      const X = mol.lig.length, E = mol.E, n = X + E;
      rootEl.querySelectorAll('[data-real-mol]').forEach((b) => {
        b.classList.toggle('active', b.dataset.realMol === mol.id);
      });
      const ce = ELEMENTS[mol.c];
      const ligEl = ELEMENTS[mol.lig[0].s];
      const dEn = Math.abs((ligEl ? ligEl.en : 0) - (ce ? ce.en : 0)).toFixed(2).replace('.', ',');

      rootEl.querySelector('#vrInfo').innerHTML = `
        <div class="cap-title"><b>${mol.f}</b> · ${mol.name} ${mol.ion ? `<span class="pol-badge polar">İyon (${mol.ion > 0 ? '+' + mol.ion : mol.ion})</span>` : ''}</div>
        <div class="cap-meta">
          <span>AXE Sınıfı: <b>${axeString(X, E)}</b></span>
          <span>Molekül Şekli: <b>${GEO_NAMES[mol.shape]}</b></span>
          <span>Elektron Geometrisi: <b>${GEO_NAMES[ELECTRON_KEYS[n]]}</b></span>
          <span>Hibritleşme: <b>${HYBRID[n]}</b></span>
          <span>Gerçek Açı: <b>${mol.ang}°${mol.ang2 ? ' / ' + mol.ang2 + '°' : ''}</b></span>
          <span>İdeal Açı: <b>${IDEAL_ANGLES[n].join('° / ')}°</b></span>
          <span>Bağ Uzunluğu: <b>${String(mol.len).replace('.', ',')} Å</b></span>
          <span>ΔEN: <b>${dEn}</b></span>
        </div>`;
      rebuildScene();
    }

    function renderLearnMatrix() {
      const grid = rootEl.querySelector('#vlMatrix');
      grid.innerHTML = `
        <table class="vsepr-matrix">
          <thead>
            <tr>
              <th>Sterik Sayı (SN) / Elektron Geometrisi</th>
              <th>0 Ortaklanmamış Çift (E₀)</th>
              <th>1 Ortaklanmamış Çift (E₁)</th>
              <th>2 Ortaklanmamış Çift (E₂)</th>
              <th>3 Ortaklanmamış Çift (E₃)</th>
            </tr>
          </thead>
          <tbody>
            ${CHART.map((row) => `
              <tr>
                <th>
                  <b>SN = ${row.n} · ${GEO_NAMES[ELECTRON_KEYS[row.n]]}</b>
                  <small>Hibritleşme: ${HYBRID[row.n]} · İdeal: ${IDEAL_ANGLES[row.n].join('° / ')}°</small>
                </th>
                ${[0, 1, 2, 3].map((e) => {
                  const found = row.items.find(([x, ee]) => ee === e);
                  if (!found) return `<td class="empty-cell">—</td>`;
                  const [X, E] = found;
                  const key = `${X}-${E}`;
                  const mKey = moleculeKey(X, E);
                  const ang = TEXTBOOK_ANGLES[key] || `${IDEAL_ANGLES[row.n][0]}°`;
                  const code = 'b1'.repeat(X) + 'l'.repeat(E);
                  return `
                    <td>
                      <button class="matrix-tile ${discovered.has(key) ? 'unlocked' : ''}" data-load-cfg="${code}">
                        <div class="mt-top">
                          <span class="mt-axe">${axeString(X, E)}</span>
                          <span class="mt-ang">${ang}</span>
                        </div>
                        <div class="mt-name">${GEO_NAMES[mKey]}</div>
                        <div class="mt-cta">3B Modelde Aç →</div>
                      </button>
                    </td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>`;
    }

    /* ---------- 4. Mod: 3B Etkileşimli VSEPR Testi ---------- */
    function nextQuizQuestion() {
      const mol = MOLECULES[Math.floor(Math.random() * MOLECULES.length)];
      const X = mol.lig.length, E = mol.E, n = X + E;
      const cfg = mol.lig.map((l) => ({ kind: 'bond', order: l.o })).concat(Array.from({ length: E }, () => ({ kind: 'lone', order: 1 })));
      liveModel.setFromList(cfg);

      const qTypes = ['molGeo', 'elecGeo', 'hyb', 'axe'];
      const qType = qTypes[Math.floor(Math.random() * qTypes.length)];
      let prompt = '', correct = '', pool = [];

      if (qType === 'molGeo') {
        prompt = `3B sahnede gösterilen <b>${mol.f}</b> (${mol.name}) molekülünün <b>molekül geometrisi</b> nedir?`;
        correct = GEO_NAMES[mol.shape];
        pool = ['Doğrusal', 'Kırık (Açısal)', 'Düzlem Üçgen', 'Üçgen Piramit', 'Düzgün Dörtyüzlü', 'Tahterevalli', 'T-Şekli', 'Üçgen Çift Piramit', 'Kare Piramit', 'Kare Düzlem', 'Düzgün Sekizyüzlü'];
      } else if (qType === 'elecGeo') {
        prompt = `<b>${mol.f}</b> (${mol.name}) merkez atomunun <b>elektron alan geometrisi</b> nedir? (X=${X}, E=${E})`;
        correct = GEO_NAMES[ELECTRON_KEYS[n]];
        pool = ['Doğrusal', 'Düzlem Üçgen', 'Düzgün Dörtyüzlü', 'Üçgen Çift Piramit', 'Düzgün Sekizyüzlü'];
      } else if (qType === 'hyb') {
        prompt = `<b>${mol.f}</b> (${mol.name}) molekülünde merkez atomun (${mol.c}) <b>hibritleşme türü</b> nedir?`;
        correct = HYBRID[n];
        pool = ['sp', 'sp²', 'sp³', 'sp³d', 'sp³d²'];
      } else {
        prompt = `<b>${mol.f}</b> (${mol.name}) molekülünün <b>VSEPR (AXE) gösterimi</b> hangisidir?`;
        correct = axeString(X, E);
        pool = CHART_KEYS.map((k) => { const [x, e] = k.split('-').map(Number); return axeString(x, e); });
      }

      const wrongs = pool.filter((x) => x !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);
      state.quiz = { mol, prompt, correct, options, answered: false };
      renderQuizUI();
    }

    function renderQuizUI() {
      const q = state.quiz;
      if (!q) return;
      const box = rootEl.querySelector('#vpQuizBox');
      box.innerHTML = `
        <div class="quiz-stats">
          <span>Puan: <b>${state.score}</b></span>
          <span>Seri: <b>🔥 ${state.streak}</b></span>
        </div>
        <div class="quiz-prompt">${q.prompt}</div>
        <div class="quiz-opts">
          ${q.options.map((opt) => `<button class="quiz-opt" data-opt="${opt}">${opt}</button>`).join('')}
        </div>
        <div id="vpFeedback" class="quiz-feedback"></div>
        <button id="vpNextBtn" class="primary-btn" style="margin-top:10px;width:100%;">Yeni Soru →</button>
      `;
    }

    function setSubMode(mode) {
      state.subMode = mode;
      rootEl.querySelectorAll('[data-vmode]').forEach((b) => {
        b.classList.toggle('active', b.dataset.vmode === mode);
      });
      rootEl.querySelector('#vPanelModel').hidden = mode !== 'model';
      rootEl.querySelector('#vPanelReal').hidden = mode !== 'real';
      rootEl.querySelector('#vPanelPractice').hidden = mode !== 'practice';
      rootEl.querySelector('#vMatrixWrap').hidden = mode !== 'learn';
      rootEl.querySelector('#vStageWrap').hidden = mode === 'learn';

      if (mode === 'model') {
        updateModelUI();
        rebuildScene();
      } else if (mode === 'real') {
        updateRealUI();
      } else if (mode === 'learn') {
        renderLearnMatrix();
      } else if (mode === 'practice') {
        nextQuizQuestion();
      }
    }

    // Gerçek molekül listesini oluştur
    rootEl.querySelector('#vrMolList').innerHTML = MOLECULES.map((m) => `
      <button class="mol-btn ${m.id === state.realMolId ? 'active' : ''}" data-real-mol="${m.id}">
        <b>${m.f}</b><span>${m.name}</span><small>${axeString(m.lig.length, m.E)}</small>
      </button>`).join('');

    liveModel.onChange = () => {
      if (state.subMode === 'model') updateModelUI();
    };
    liveModel.onSettled = () => {
      if (state.subMode === 'model') {
        const code = encodeConfig(liveModel.groups);
        if (code && location.hash.startsWith('#model/')) {
          history.replaceState(null, '', `#model/${code}`);
        }
        updateModelUI();
      }
    };

    // Olay dinleyicileri
    rootEl.addEventListener('click', (e) => {
      const mBtn = e.target.closest('[data-vmode]');
      if (mBtn) { setSubMode(mBtn.dataset.vmode); return; }

      const addBtn = e.target.closest('[data-vadd]');
      if (addBtn) {
        const val = addBtn.dataset.vadd;
        if (val === 'lone') liveModel.add('lone', 1);
        else liveModel.add('bond', +val);
        return;
      }

      const rmBtn = e.target.closest('[data-rm]');
      if (rmBtn) { liveModel.removeById(+rmBtn.dataset.rm); return; }

      if (e.target.closest('#vmClear')) { liveModel.clear(); return; }
      if (e.target.closest('#vmShake')) { liveModel.shake(); return; }

      if (e.target.closest('#vmCopyHash')) {
        const code = encodeConfig(liveModel.groups) || 'l';
        history.replaceState(null, '', `#model/${code}`);
        const url = `${location.origin}${location.pathname}#model/${code}`;
        if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
        const btn = rootEl.querySelector('#vmCopyHash');
        btn.textContent = `Kopyalandı: #model/${code}`;
        setTimeout(() => { btn.textContent = 'Bağlantı (#model/…)'; }, 1800);
        return;
      }

      if (e.target.closest('#vmStartLessons')) {
        state.lessonIdx = 0;
        liveModel.setFromList(decodeConfig(LESSONS[0].cfg));
        updateModelUI();
        return;
      }
      if (e.target.closest('#vmLessonClose')) {
        state.lessonIdx = -1;
        updateModelUI();
        return;
      }
      if (e.target.closest('#vmLessonPrev') && state.lessonIdx > 0) {
        state.lessonIdx--;
        liveModel.setFromList(decodeConfig(LESSONS[state.lessonIdx].cfg));
        updateModelUI();
        return;
      }
      if (e.target.closest('#vmLessonNext')) {
        if (state.lessonIdx < LESSONS.length - 1) {
          state.lessonIdx++;
          liveModel.setFromList(decodeConfig(LESSONS[state.lessonIdx].cfg));
          updateModelUI();
        } else {
          state.lessonIdx = -1;
          setSubMode('practice');
        }
        return;
      }

      const jumpMol = e.target.closest('[data-jump-mol]');
      if (jumpMol) {
        state.realMolId = jumpMol.dataset.jumpMol;
        setSubMode('real');
        return;
      }

      const realBtn = e.target.closest('[data-real-mol]');
      if (realBtn) {
        state.realMolId = realBtn.dataset.realMol;
        updateRealUI();
        return;
      }

      const loadCfg = e.target.closest('[data-load-cfg]');
      if (loadCfg) {
        liveModel.setFromList(decodeConfig(loadCfg.dataset.loadCfg));
        setSubMode('model');
        return;
      }

      const qOpt = e.target.closest('.quiz-opt');
      if (qOpt && state.quiz && !state.quiz.answered) {
        state.quiz.answered = true;
        const chosen = qOpt.dataset.opt;
        const ok = chosen === state.quiz.correct;
        if (ok) { state.score += 10; state.streak++; } else { state.streak = 0; }
        rootEl.querySelectorAll('.quiz-opt').forEach((b) => {
          if (b.dataset.opt === state.quiz.correct) b.classList.add('correct');
          else if (b === qOpt) b.classList.add('wrong');
        });
        rootEl.querySelector('#vpFeedback').innerHTML = ok
          ? `<span class="ok">✓ Doğru! (${state.quiz.correct})</span>`
          : `<span style="color:#ff8787">✗ Doğru cevap: <b>${state.quiz.correct}</b></span>`;
        return;
      }

      if (e.target.closest('#vpNextBtn')) {
        nextQuizQuestion();
      }
    });

    // Görünüm anahtarları
    const bindCheck = (sel, prop) => {
      const el = rootEl.querySelector(sel);
      if (!el) return;
      el.addEventListener('change', () => {
        state[prop] = el.checked;
        if (state.subMode === 'model') updateModelUI();
        rebuildScene();
      });
    };
    bindCheck('#voLone', 'showLone');
    bindCheck('#voAngles', 'showAngles');
    bindCheck('#voHull', 'showHull');
    bindCheck('#voDipole', 'showDipole');
    bindCheck('#voRevElec', 'revealElec');
    bindCheck('#voRevMol', 'revealMol');
    bindCheck('#vrIdealToggle', 'realUseIdeal');

    // Klavye kısayolları (Model sekmesinde 1, 2, 3, L, Backspace, S)
    window.addEventListener('keydown', (e) => {
      const sec = document.getElementById('view-vsepr');
      if (!sec || !sec.classList.contains('active') || state.subMode !== 'model') return;
      if (e.target.matches('input, textarea')) return;
      const k = e.key.toLowerCase();
      if (k === '1' || k === '2' || k === '3') liveModel.add('bond', +k);
      else if (k === 'l') liveModel.add('lone', 1);
      else if (k === 's') liveModel.shake();
      else if (k === 'backspace' || k === 'delete') {
        const last = liveModel.groups[liveModel.groups.length - 1];
        if (last) liveModel.removeById(last.id);
      }
    });

    updateModelUI();
    rebuildScene();

    return {
      setRunning: (r) => v && v.setRunning(r),
      openHashIfPresent: checkUrlHash,
    };
  }

  window.VSEPR = { init };
})();
