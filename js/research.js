/* ==========================================================================
   affeLab — Akademik & Lisansüstü Araştırma Laboratuvarı (js/research.js)
   --------------------------------------------------------------------------
   Lisans (Üniversite), Yüksek Lisans (M.Sc.) ve Doktora (Ph.D.) Düzeyi:
   1. Çoklu Spektroskopi & Yapı Aydınlatma (400 MHz ¹H-NMR, ¹³C-NMR, FTIR, EI-MS)
   2. Kuantum Kimyası: Hückel Moleküler Orbital (HMO) Özdeğer/Özvektör Çözücü
   3. Fizikokimya: Eyring Geçiş Hali Teorisi (TST), PES & 4. Mertebe Runge-Kutta Kinetik
   4. Elektrokimya: Dönüşümlü Voltametri (Cyclic Voltammetry — Randles-Ševčík / Butler-Volmer)
   5. Anorganik Kimya: Kristal Alan ve Ligand Alan Teorisi (CFT/LFT, CFSE, μ_eff, UV-Vis)
   ========================================================================== */
(function () {
  'use strict';

  /* ==========================================================================
     VERİ SETİ 1: ORGANİK SPEKTROSKOPİ KÜTÜPHANESİ (NMR, FTIR, EI-MS)
     ========================================================================== */
  const SPEC_COMPOUNDS = [
    {
      id: 'ethyl_acetate',
      name: 'Etil Asetat',
      iupac: 'Etil etanoat',
      formula: 'C₄H₈O₂',
      structure: 'CH₃–C(=O)–O–CH₂–CH₃',
      mw: 88.11,
      ihd: 1,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 4.12, mult: 'q', J: 7.1, H: 2, label: '-OCH₂-', desc: 'Komşu -CH₃ (3H) ile eşleşmiş dörtlü (quartet, n+1=4); oksijene komşu olduğu için aşağı alana (4,12 ppm) kaymıştır.' },
        { ppm: 2.04, mult: 's', J: 0, H: 3, label: 'CH₃C=O', desc: 'Karbonile bağlı asetil metil protonları; komşu protonu olmadığı için keskin tekli (singlet).' },
        { ppm: 1.26, mult: 't', J: 7.1, H: 3, label: '-CH₂CH₃', desc: 'Komşu -CH₂- (2H) ile eşleşmiş üçlü (triplet, J = 7,1 Hz).' },
      ],
      cnmr: [
        { ppm: 171.2, type: 'C (kuaterner)', label: 'C=O (Ester karbonili)' },
        { ppm: 60.4, type: 'CH₂', label: '-OCH₂-' },
        { ppm: 21.0, type: 'CH₃', label: 'CH₃C=O' },
        { ppm: 14.2, type: 'CH₃', label: '-CH₂CH₃' },
      ],
      ftir: [
        { wn: 2982, trans: 42, shape: 'sharp', label: 'ν(C–H) sp³ gerilme' },
        { wn: 1742, trans: 8, shape: 'sharp', label: 'ν(C=O) Ester karbonili (çok kuvvetli)' },
        { wn: 1375, trans: 48, shape: 'sharp', label: 'δ_s(CH₃) simetrik eğilme' },
        { wn: 1240, trans: 12, shape: 'sharp', label: 'ν(C–O) Ester asimetrik gerilme' },
        { wn: 1048, trans: 32, shape: 'sharp', label: 'ν(O–CH₂) gerilme' },
      ],
      ms: [
        { mz: 88, rel: 18, label: 'M⁺• (Moleküler İyon)' },
        { mz: 73, rel: 14, label: '[M − CH₃]⁺' },
        { mz: 70, rel: 22, label: '[M − H₂O]⁺•' },
        { mz: 61, rel: 34, label: '[CH₃COOH₂]⁺ (McLafferty + H)' },
        { mz: 45, rel: 26, label: '[OC₂H₅]⁺' },
        { mz: 43, rel: 100, label: '[CH₃C≡O]⁺ (Baz Pik, α-yarılması)' },
        { mz: 29, rel: 42, label: '[C₂H₅]⁺' },
      ],
    },
    {
      id: 'acetophenone',
      name: 'Asetofenon',
      iupac: '1-Feniletanon',
      formula: 'C₈H₈O',
      structure: 'C₆H₅–C(=O)–CH₃',
      mw: 120.15,
      ihd: 5,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 7.96, mult: 'd', J: 7.8, H: 2, label: 'Ar-H (orto)', desc: 'Karbonil grubunun anizotropik ve elektron çekici etkisiyle en aşağı alana kaymış 2H orto aromatik ikili (doublet).' },
        { ppm: 7.56, mult: 't', J: 7.4, H: 1, label: 'Ar-H (para)', desc: 'Para konumundaki 1H aromatik üçlü (triplet).' },
        { ppm: 7.46, mult: 't', J: 7.6, H: 2, label: 'Ar-H (meta)', desc: 'Meta konumundaki 2H aromatik üçlü (triplet).' },
        { ppm: 2.60, mult: 's', J: 0, H: 3, label: '-COCH₃', desc: 'Aromatik keton metil protonları (3H, singlet).' },
      ],
      cnmr: [
        { ppm: 198.1, type: 'C (kuaterner)', label: 'C=O (Aril keton)' },
        { ppm: 137.1, type: 'C (ipso)', label: 'Ar C-1' },
        { ppm: 133.1, type: 'CH', label: 'Ar C-4 (para)' },
        { ppm: 128.6, type: 'CH', label: 'Ar C-3,5 (meta)' },
        { ppm: 128.3, type: 'CH', label: 'Ar C-2,6 (orto)' },
        { ppm: 26.6, type: 'CH₃', label: '-COCH₃' },
      ],
      ftir: [
        { wn: 3062, trans: 58, shape: 'sharp', label: 'ν(C–H) sp² aromatik' },
        { wn: 1685, trans: 7, shape: 'sharp', label: 'ν(C=O) Konjuge keton (rezonans nedeniyle <1715 cm⁻¹)' },
        { wn: 1598, trans: 35, shape: 'sharp', label: 'ν(C=C) Aromatik halka titreşimi' },
        { wn: 1450, trans: 42, shape: 'sharp', label: 'ν(C=C) Aromatik iskelet' },
        { wn: 1266, trans: 20, shape: 'sharp', label: 'ν(C–CO–C) eğilme/gerilme' },
        { wn: 760, trans: 25, shape: 'sharp', label: 'γ(C–H) Monosübstitüe benzen (5 komşu H)' },
        { wn: 690, trans: 28, shape: 'sharp', label: 'Φ(C–C) Halka düzlem dışı eğilme' },
      ],
      ms: [
        { mz: 120, rel: 32, label: 'M⁺• (Moleküler İyon)' },
        { mz: 105, rel: 100, label: '[C₆H₅C≡O]⁺ (Benzoil katyonu, Baz Pik)' },
        { mz: 77, rel: 74, label: '[C₆H₅]⁺ (Fenil katyonu, CO kaybı)' },
        { mz: 51, rel: 28, label: '[C₄H₃]⁺ (Aromatik halka parçalanması)' },
        { mz: 43, rel: 19, label: '[CH₃CO]⁺' },
      ],
    },
    {
      id: 'bromoanisole',
      name: '4-Bromoanisol',
      iupac: '1-Bromo-4-metoksibenzen',
      formula: 'C₇H₇BrO',
      structure: 'Br–C₆H₄–OCH₃ (para)',
      mw: 187.03,
      ihd: 4,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 7.37, mult: 'd', J: 8.9, H: 2, label: 'Ar-H (Br komşusu)', desc: 'Para-disübstitüe benzen halkasının karakteristik AA\'XX\' simetrik ikilisi (2H, J = 8,9 Hz).' },
        { ppm: 6.78, mult: 'd', J: 8.9, H: 2, label: 'Ar-H (OCH₃ komşusu)', desc: 'Elektron sunucu -OCH₃ grubunun orto konumunu perdelemesiyle yukarı alana (6,78 ppm) kaymış 2H ikili.' },
        { ppm: 3.78, mult: 's', J: 0, H: 3, label: '-OCH₃', desc: 'Metoksi grubu protonları (3H, keskin singlet).' },
      ],
      cnmr: [
        { ppm: 158.7, type: 'C (ipso-O)', label: 'Ar C–OCH₃' },
        { ppm: 132.3, type: 'CH (2C)', label: 'Ar C-3,5 (Br komşusu)' },
        { ppm: 115.7, type: 'CH (2C)', label: 'Ar C-2,6 (OCH₃ komşusu)' },
        { ppm: 112.8, type: 'C (ipso-Br)', label: 'Ar C–Br (ağır atom etkisi)' },
        { ppm: 55.4, type: 'CH₃', label: '-OCH₃' },
      ],
      ftir: [
        { wn: 2955, trans: 52, shape: 'sharp', label: 'ν(C–H) alifatik -OCH₃' },
        { wn: 1588, trans: 30, shape: 'sharp', label: 'ν(C=C) Aromatik halka' },
        { wn: 1488, trans: 18, shape: 'sharp', label: 'ν(C=C) para-halka gerilmesi' },
        { wn: 1246, trans: 10, shape: 'sharp', label: 'ν_as(Ar–O–C) Aril-alkil eter' },
        { wn: 1032, trans: 28, shape: 'sharp', label: 'ν_s(O–CH₃)' },
        { wn: 822, trans: 16, shape: 'sharp', label: 'γ(C–H) 1,4-Disübstitüe (para) benzen bandı' },
      ],
      ms: [
        { mz: 188, rel: 96, label: '[M+2]⁺• (⁸¹Br İzotop Piki — 1:1 Oranı!)' },
        { mz: 186, rel: 100, label: 'M⁺• (⁷⁹Br Moleküler İyon, Baz Pik)' },
        { mz: 173, rel: 42, label: '[M+2 − CH₃]⁺' },
        { mz: 171, rel: 44, label: '[M − CH₃]⁺' },
        { mz: 145, rel: 35, label: '[C₆H₄⁸¹Br]⁺' },
        { mz: 143, rel: 36, label: '[C₆H₄⁷⁹Br]⁺' },
        { mz: 107, rel: 52, label: '[M − Br]⁺ ([C₇H₇O]⁺)' },
        { mz: 77, rel: 38, label: '[C₆H₅]⁺' },
      ],
    },
    {
      id: 'propionic_acid',
      name: 'Propiyonik Asit',
      iupac: 'Propanoik asit',
      formula: 'C₃H₆O₂',
      structure: 'CH₃–CH₂–COOH',
      mw: 74.08,
      ihd: 1,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 11.42, mult: 'br', J: 0, H: 1, label: '-COOH', desc: 'Hidrojen bağı yapan karboksilik asit protonu; aşırı perdesizleşmiş (11,4 ppm) geniş tekli (broad singlet, D₂O ile değişebilir).' },
        { ppm: 2.38, mult: 'q', J: 7.4, H: 2, label: '-CH₂COOH', desc: 'Komşu -CH₃ ile eşleşmiş α-metilen dörtlüsü (quartet, 2H).' },
        { ppm: 1.16, mult: 't', J: 7.4, H: 3, label: '-CH₃', desc: 'Komşu -CH₂- ile eşleşmiş metil üçlüsü (triplet, 3H).' },
      ],
      cnmr: [
        { ppm: 180.4, type: 'C (kuaterner)', label: '-COOH (Karboksil karbonu)' },
        { ppm: 27.6, type: 'CH₂', label: 'α-CH₂' },
        { ppm: 9.0, type: 'CH₃', label: 'β-CH₃' },
      ],
      ftir: [
        { wn: 3000, trans: 14, shape: 'broad', label: 'ν(O–H) Karboksilik asit dimer bandı (3300–2500 cm⁻¹ çok geniş)' },
        { wn: 1712, trans: 6, shape: 'sharp', label: 'ν(C=O) Karboksilik asit dimer karbonili' },
        { wn: 1415, trans: 36, shape: 'sharp', label: 'δ(C–O–H) düzlem içi eğilme' },
        { wn: 1240, trans: 22, shape: 'sharp', label: 'ν(C–O) gerilme' },
        { wn: 930, trans: 30, shape: 'broad', label: 'γ(O–H) dimer düzlem dışı eğilme' },
      ],
      ms: [
        { mz: 74, rel: 78, label: 'M⁺• (Moleküler İyon)' },
        { mz: 73, rel: 48, label: '[M − H]⁺' },
        { mz: 57, rel: 32, label: '[CH₃CH₂C≡O]⁺ (OH kaybı)' },
        { mz: 45, rel: 64, label: '[COOH]⁺' },
        { mz: 29, rel: 100, label: '[C₂H₅]⁺ (Baz Pik)' },
        { mz: 28, rel: 85, label: '[C₂H₄]⁺•' },
      ],
    },
    {
      id: 'ethanol',
      name: 'Etanol',
      iupac: 'Etil alkol',
      formula: 'C₂H₆O',
      structure: 'CH₃–CH₂–OH',
      mw: 46.07,
      ihd: 0,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 3.69, mult: 'q', J: 7.0, H: 2, label: '-CH₂OH', desc: 'Elektronegatif oksijene bağlı metilen dörtlüsü (2H, quartet).' },
        { ppm: 2.61, mult: 'br', J: 0, H: 1, label: '-OH', desc: 'Hidroksil protonu (1H, hidrojen bağı değişimi nedeniyle geniş singlet).' },
        { ppm: 1.22, mult: 't', J: 7.0, H: 3, label: '-CH₃', desc: 'Metil üçlüsü (3H, triplet, J = 7,0 Hz).' },
      ],
      cnmr: [
        { ppm: 58.2, type: 'CH₂', label: '-CH₂OH' },
        { ppm: 18.4, type: 'CH₃', label: '-CH₃' },
      ],
      ftir: [
        { wn: 3350, trans: 12, shape: 'broad', label: 'ν(O–H) Hidrojen bağlı alkol bandı (geniş parabolik)' },
        { wn: 2974, trans: 28, shape: 'sharp', label: 'ν(C–H) sp³ gerilme' },
        { wn: 1052, trans: 16, shape: 'sharp', label: 'ν(C–O) Primer alkol C–O gerilmesi' },
      ],
      ms: [
        { mz: 46, rel: 22, label: 'M⁺• (Moleküler İyon)' },
        { mz: 45, rel: 58, label: '[M − H]⁺' },
        { mz: 31, rel: 100, label: '[CH₂=OH]⁺ (α-yarılması, Baz Pik)' },
        { mz: 29, rel: 28, label: '[C₂H₅]⁺ / [CHO]⁺' },
      ],
    },
    {
      id: 'butanone',
      name: '2-Bütanon (MEK)',
      iupac: 'Bütan-2-on',
      formula: 'C₄H₈O',
      structure: 'CH₃–C(=O)–CH₂–CH₃',
      mw: 72.11,
      ihd: 1,
      solvent: 'CDCl₃',
      hnmr: [
        { ppm: 2.45, mult: 'q', J: 7.3, H: 2, label: '-COCH₂-', desc: 'Komşu -CH₃ ile eşleşmiş α-metilen dörtlüsü (2H, quartet).' },
        { ppm: 2.14, mult: 's', J: 0, H: 3, label: 'CH₃CO-', desc: 'Keton α-metil protonları (3H, keskin singlet).' },
        { ppm: 1.06, mult: 't', J: 7.3, H: 3, label: '-CH₂CH₃', desc: 'Uç metil üçlüsü (3H, triplet).' },
      ],
      cnmr: [
        { ppm: 209.3, type: 'C (kuaterner)', label: 'C=O (Alifatik keton, >200 ppm!)' },
        { ppm: 36.8, type: 'CH₂', label: '-COCH₂-' },
        { ppm: 29.4, type: 'CH₃', label: 'CH₃CO-' },
        { ppm: 7.9, type: 'CH₃', label: '-CH₂CH₃' },
      ],
      ftir: [
        { wn: 2978, trans: 40, shape: 'sharp', label: 'ν(C–H) sp³ gerilme' },
        { wn: 1716, trans: 8, shape: 'sharp', label: 'ν(C=O) Doymuş alifatik keton (1715 cm⁻¹)' },
        { wn: 1365, trans: 44, shape: 'sharp', label: 'δ(CH₃–C=O)' },
        { wn: 1172, trans: 36, shape: 'sharp', label: 'ν(C–CO–C) iskelet titreşimi' },
      ],
      ms: [
        { mz: 72, rel: 24, label: 'M⁺• (Moleküler İyon)' },
        { mz: 57, rel: 18, label: '[C₂H₅C≡O]⁺ (Metil kaybı)' },
        { mz: 43, rel: 100, label: '[CH₃C≡O]⁺ (Etil radikali kaybı — Stevenson kuralı, Baz Pik)' },
        { mz: 29, rel: 32, label: '[C₂H₅]⁺' },
      ],
    },
  ];

  /* ==========================================================================
     VERİ SETİ 2: HÜCKEL MOLEKÜLER ORBİTAL (HMO) SİSTEMLERİ
     ========================================================================== */
  const HMO_SYSTEMS = [
    {
      id: 'ethene',
      name: 'Eten (C₂H₄)',
      desc: 'En basit 2-merkezli π-sistemi (E = α ± β).',
      nPi: 2,
      localizedPairs: 1,
      coords: [[-45, 0], [45, 0]],
      edges: [[0, 1]],
    },
    {
      id: 'allyl',
      name: 'Allil Sistemi (C₃H₅)',
      desc: '3-merkezli konjuge sistem; katyon (2π e⁻), radikal (3π e⁻) ve anyon (4π e⁻) durumlarında bağlayıcı olmayan MO (E = α) içerir.',
      nPi: 3,
      localizedPairs: 1,
      coords: [[-65, 22], [0, -24], [65, 22]],
      edges: [[0, 1], [1, 2]],
    },
    {
      id: 'butadiene',
      name: '1,3-Bütadien (C₄H₆)',
      desc: 'Doğrusal 4-merkezli konjuge dien (E_delok = 0,472 |β|). C1–C2 ve C3–C4 bağ derecesi 0,894; C2–C3 kısmi çift bağ derecesi 0,447.',
      nPi: 4,
      localizedPairs: 2,
      coords: [[-95, 20], [-32, -20], [32, 20], [95, -20]],
      edges: [[0, 1], [1, 2], [2, 3]],
    },
    {
      id: 'cyclobutadiene',
      name: 'Siklobütadien (C₄H₄)',
      desc: '4n (4π e⁻) Hückel anti-aromatik halka! İki dejenere bağlayıcı olmayan orbitalde (E = α) eşleşmemiş elektronlar bulunur (E_delok = 0,00 |β|).',
      nPi: 4,
      localizedPairs: 2,
      coords: [[-52, -52], [52, -52], [52, 52], [-52, 52]],
      edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    },
    {
      id: 'cyclopentadienyl',
      name: 'Siklopentadienil (C₅H₅)',
      desc: 'Anyon halinde (C₅H₅⁻, 6π e⁻) 4n+2 Hückel kuralına uyan kapalı kabuklu aromatik türdür (Ferrosen ligandı).',
      nPi: 5,
      localizedPairs: 2,
      coords: [0, 1, 2, 3, 4].map((k) => [Math.sin((k * 2 * Math.PI) / 5) * 68, -Math.cos((k * 2 * Math.PI) / 5) * 68]),
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    },
    {
      id: 'benzene',
      name: 'Benzen (C₆H₆)',
      desc: 'Klasik 6π e⁻ (4n+2, n=1) aromatik halka. Yüksek delokalizasyon enerjisi (E_delok = 2,000 |β|) ve tüm C–C π-bağ dereceleri eşit (p = 0,667).',
      nPi: 6,
      localizedPairs: 3,
      coords: [0, 1, 2, 3, 4, 5].map((k) => [Math.sin((k * 2 * Math.PI) / 6) * 72, -Math.cos((k * 2 * Math.PI) / 6) * 72]),
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    },
    {
      id: 'naphthalene',
      name: 'Naftalin (C₁₀H₈)',
      desc: 'Bisiklik 10π e⁻ (4n+2, n=2) aromatik sistem (E_delok = 3,683 |β|). C1–C2 bağ derecesi (0,725), C2–C3 bağ derecesinden (0,603) daha yüksektir.',
      nPi: 10,
      localizedPairs: 5,
      coords: [
        [-38, -68], [-98, -34], [-98, 34], [-38, 68], [0, 34],
        [0, -34], [38, -68], [98, -34], [98, 34], [38, 68],
      ],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
        [5, 6], [6, 7], [7, 8], [8, 9], [9, 4],
      ],
    },
    {
      id: 'azulene',
      name: 'Azulen (C₁₀H₈ — 5+7 Halka)',
      desc: 'Alternant olmayan 10π e⁻ bisiklik aromatik hidrokarbon. 7’li halka (tropylium benzeri) δ⁺, 5’li halka (siklopentadienil benzeri) δ⁻ yük taşır!',
      nPi: 10,
      localizedPairs: 5,
      coords: [
        [-95, 0], [-58, -54], [0, -34], [0, 34], [-58, 54],
        [52, -68], [102, -38], [116, 0], [102, 38], [52, 68],
      ],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
        [2, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 3],
      ],
    },
  ];

  /* ==========================================================================
     YARDIMCI SAYISAL ÇÖZÜCÜ: JACOBI SİMETRİK MATRİS ÖZDEĞER/ÖZVEKTÖR ALGORİTMASI
     ========================================================================== */
  function jacobiEigen(A) {
    const n = A.length;
    const M = A.map((row) => row.slice());
    const V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => (i === j ? 1 : 0)));

    for (let iter = 0; iter < 120; iter++) {
      let maxVal = 0, p = 0, q = 1;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (Math.abs(M[i][j]) > maxVal) {
            maxVal = Math.abs(M[i][j]);
            p = i;
            q = j;
          }
        }
      }
      if (maxVal < 1e-10) break;

      const app = M[p][p], aqq = M[q][q], apq = M[p][q];
      const phi = 0.5 * Math.atan2(2 * apq, aqq - app);
      const c = Math.cos(phi), s = Math.sin(phi);

      for (let i = 0; i < n; i++) {
        if (i !== p && i !== q) {
          const mip = M[i][p], miq = M[i][q];
          M[i][p] = M[p][i] = c * mip - s * miq;
          M[i][q] = M[q][i] = s * mip + c * miq;
        }
      }
      M[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
      M[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
      M[p][q] = M[q][p] = 0;

      for (let i = 0; i < n; i++) {
        const vip = V[i][p], viq = V[i][q];
        V[i][p] = c * vip - s * viq;
        V[i][q] = s * vip + c * viq;
      }
    }

    // x_k = (E_k - alpha) / beta: x_k > 0 bağlayıcı (en düşük enerjili), büyükten küçüğe sırala
    const items = Array.from({ length: n }, (_, k) => ({
      x: M[k][k],
      vec: V.map((row) => row[k]),
    }));
    items.sort((a, b) => b.x - a.x);
    return items;
  }

  /* ==========================================================================
     MODÜL BAŞLATICI
     ========================================================================== */
  function init(rootEl) {
    const section = rootEl || document.getElementById('view-research');
    if (!section) return { setRunning() {} };

    let activeMod = 'spec'; // 'spec' | 'hmo' | 'tst' | 'cv' | 'cft' | 'admet' | 'diag' | 'xrd'

    // Mobil ve masaüstü ekranlarda çok panelli bilimsel grafiklerin kesilmeden,
    // yüksek DPI vektörel netlikle ölçeklenmesini sağlayan yardımcı
    function prepareCanvas(canvas, ctx, minW = 760, minH = 410) {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const W = Math.max(minW, rect.width);
      const H = Math.max(minH, rect.height);
      ctx.setTransform((rect.width / W) * dpr, 0, 0, (rect.height / H) * dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      return { W, H };
    }

    /* ------------------------------------------------------------------------
       1. SPEKTROSKOPİ VE YAPI AYDINLATMA (NMR · FTIR · EI-MS)
       ------------------------------------------------------------------------ */
    const specCanvas = document.getElementById('specCanvas');
    const specCtx = specCanvas.getContext('2d');
    const specHud = document.getElementById('specHud');
    const specTableWrap = document.getElementById('specTableWrap');
    const specCompoundsEl = document.getElementById('specCompounds');
    const specShowIntChk = document.getElementById('specShowInt');
    const specShowAssignChk = document.getElementById('specShowAssign');
    const specMysteryChk = document.getElementById('specMysteryMode');
    const specMysteryPanel = document.getElementById('specMysteryPanel');

    const specState = {
      tech: 'hnmr', // 'hnmr' | 'cnmr' | 'ftir' | 'ms'
      compId: 'ethyl_acetate',
      showInt: true,
      showAssign: true,
      mystery: false,
      hoverX: null,
    };

    function renderSpecCompoundList() {
      specCompoundsEl.innerHTML = SPEC_COMPOUNDS.map((c) => `
        <button class="reagent-btn ${c.id === specState.compId ? 'active' : ''}" data-scomp="${c.id}">
          <span class="reagent-dot" style="background:#5b8cff;"></span>
          <div>
            <b>${specState.mystery ? 'Bilinmeyen Numune' : c.name} (${c.formula})</b>
            <small>${specState.mystery ? `M = ${c.mw} g/mol · IHD = ${c.ihd}` : c.structure}</small>
          </div>
        </button>
      `).join('');
    }
    renderSpecCompoundList();

    function getActiveSpecCompound() {
      return SPEC_COMPOUNDS.find((c) => c.id === specState.compId) || SPEC_COMPOUNDS[0];
    }

    function updateSpecUI() {
      const c = getActiveSpecCompound();
      const techNames = {
        hnmr: '400 MHz ¹H-NMR (CDCl₃, TMS = 0,00 ppm)',
        cnmr: '100 MHz ¹³C-NMR ({¹H} Geniş Bant Dekuple)',
        ftir: 'FTIR Geçirgenlik Spektrumu (ATR, 4000–400 cm⁻¹)',
        ms: 'EI-MS Kütle Spektrumu (70 eV Elektron İyonlaşma)',
      };

      specHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">MOLEKÜL & FORMÜL</span>
          <b class="hud-val">${specState.mystery ? `Bilinmeyen (${c.formula})` : c.name}</b>
          <small class="hud-sub">${specState.mystery ? 'Yapıyı spektrumlardan çözün!' : `${c.structure} · ${c.iupac}`}</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">DOYMAMIŞLIK DERECESİ (IHD)</span>
          <b class="hud-val" style="color:var(--accent-2);">IHD = ${c.ihd}</b>
          <small class="hud-sub">Halka + π-bağı sayısı (M = ${c.mw} g/mol)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">AKTİF SPEKTROMETRE</span>
          <b class="hud-val" style="font-size:14px;">${techNames[specState.tech]}</b>
          <small class="hud-sub">Çözücü: ${c.solvent}</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">SİNYAL / PİK SAYISI</span>
          <b class="hud-val">${specState.tech === 'hnmr' ? `${c.hnmr.length} Multiplet` : specState.tech === 'cnmr' ? `${c.cnmr.length} Karbon` : specState.tech === 'ftir' ? `${c.ftir.length} Ana Bant` : `${c.ms.length} İyon Piki`}</b>
          <small class="hud-sub">Kimyasal eşdeğerlik analizi</small>
        </div>
      `;

      // Alt Tablo (Pik Analizi)
      if (specState.tech === 'hnmr') {
        specTableWrap.innerHTML = `
          <div style="font-size:12.5px;margin-bottom:6px;color:var(--muted);"><b>¹H-NMR Kimyasal Kayma (δ), Çokluluk (n+1 Kuralı) ve Spin-Spin Eşleşmesi (J):</b></div>
          <div class="spec-chips">
            ${c.hnmr.map((p) => `
              <div class="lab-rx" style="margin-bottom:4px;">
                <b>δ ${p.ppm.toFixed(2)} ppm (${p.mult}${p.J ? `, J = ${p.J} Hz` : ''}, ∫ ${p.H}H) ${!specState.mystery ? `→ ${p.label}` : ''}</b>
                <span>${p.desc}</span>
              </div>
            `).join('')}
          </div>
        `;
      } else if (specState.tech === 'cnmr') {
        specTableWrap.innerHTML = `
          <div class="lab-rx">
            <b>¹³C-NMR & DEPT Özeti (${c.cnmr.length} Farklı Karbon Ortamı):</b>
            <span>${c.cnmr.map((p) => `δ ${p.ppm} ppm (${p.type}${!specState.mystery ? ': ' + p.label : ''})`).join(' · ')}</span>
          </div>
        `;
      } else if (specState.tech === 'ftir') {
        specTableWrap.innerHTML = `
          <div class="lab-rx">
            <b>Karakteristik FTIR Fonksiyonel Grup Titreşimleri (ν̃ = 1/(2πc)·√(k/μ)):</b>
            <span>${c.ftir.map((p) => `${p.wn} cm⁻¹ (%${p.trans} T — ${p.label})`).join(' · ')}</span>
          </div>
        `;
      } else {
        specTableWrap.innerHTML = `
          <div class="lab-rx">
            <b>EI-MS (70 eV) Moleküler İyon (M⁺•) ve Parçalanma (Fragmentasyon) İyonları:</b>
            <span>${c.ms.map((p) => `m/z ${p.mz} (%${p.rel} — ${p.label})`).join(' · ')}</span>
          </div>
        `;
      }

      drawSpecCanvas();
    }

    function pascalCoeffs(mult) {
      if (mult === 'd') return [1, 1];
      if (mult === 't') return [1, 2, 1];
      if (mult === 'q') return [1, 3, 3, 1];
      return [1];
    }

    function drawSpecCanvas() {
      const vp = prepareCanvas(specCanvas, specCtx, 680, 390);
      if (!vp) return;
      const { W, H } = vp;

      const padL = 54, padR = 28, padT = 32, padB = 44;
      const pw = W - padL - padR, ph = H - padT - padB;
      const baseY = padT + ph;
      const c = getActiveSpecCompound();

      // Izgara
      specCtx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      specCtx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (i / 4) * ph;
        specCtx.beginPath();
        specCtx.moveTo(padL, y);
        specCtx.lineTo(padL + pw, y);
        specCtx.stroke();
      }

      if (specState.tech === 'hnmr') {
        // δ = 12,5 ppm (sol) .. -0,5 ppm (sağ)
        const maxPpm = 12.5, minPpm = -0.5;
        const ppmToX = (ppm) => padL + ((maxPpm - ppm) / (maxPpm - minPpm)) * pw;

        // X ekseni etiketleri
        specCtx.font = '11px JetBrains Mono, monospace';
        specCtx.fillStyle = '#9aa7c2';
        specCtx.textAlign = 'center';
        for (let p = 0; p <= 12; p++) {
          const x = ppmToX(p);
          specCtx.beginPath();
          specCtx.moveTo(x, baseY);
          specCtx.lineTo(x, baseY + 5);
          specCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
          specCtx.stroke();
          specCtx.fillText(`${p}`, x, baseY + 18);
        }
        specCtx.fillText('Kimyasal Kayma δ (ppm) — 400 MHz ¹H-NMR (TMS = 0 ppm)', padL + pw / 2, baseY + 36);

        // Lorentzian çizgi sentezi (multiplet yarılmalı)
        const samples = Math.floor(pw);
        const yVals = new Float64Array(samples);
        // TMS referans piki (0.00 ppm)
        const lines = [{ ppm: 0.0, amp: 0.18, w: 0.015 }];
        c.hnmr.forEach((pk) => {
          const coeffs = pascalCoeffs(pk.mult);
          const sumC = coeffs.reduce((a, b) => a + b, 0);
          // 400 MHz'de J(Hz) -> Δppm (görsel netlik için 4x ölçekli)
          const stepPpm = pk.J ? (pk.J / 400) * 5.2 : 0;
          const w = pk.mult === 'br' ? 0.14 : 0.018;
          coeffs.forEach((coef, idx) => {
            const offset = (idx - (coeffs.length - 1) / 2) * stepPpm;
            lines.push({
              ppm: pk.ppm + offset,
              amp: (pk.H * (coef / sumC)) * (pk.mult === 'br' ? 0.45 : 1.15),
              w,
            });
          });
        });

        let maxY = 0.01;
        for (let i = 0; i < samples; i++) {
          const ppm = maxPpm - (i / samples) * (maxPpm - minPpm);
          let val = 0;
          for (let j = 0; j < lines.length; j++) {
            const ln = lines[j];
            const d = (ppm - ln.ppm) / ln.w;
            val += ln.amp / (1 + d * d);
          }
          yVals[i] = val;
          if (val > maxY) maxY = val;
        }

        // Spektrum Eğrisini Çiz
        specCtx.strokeStyle = '#3ddcc4';
        specCtx.lineWidth = 1.9;
        specCtx.beginPath();
        for (let i = 0; i < samples; i++) {
          const x = padL + i;
          const y = baseY - (yVals[i] / maxY) * (ph * 0.82);
          if (i === 0) specCtx.moveTo(x, y);
          else specCtx.lineTo(x, y);
        }
        specCtx.stroke();

        // İntegrasyon basamak eğrisi
        if (specState.showInt) {
          specCtx.strokeStyle = 'rgba(242, 207, 74, 0.85)';
          specCtx.lineWidth = 1.6;
          specCtx.beginPath();
          let cum = 0;
          const totArea = yVals.reduce((a, b) => a + b, 0) || 1;
          for (let i = 0; i < samples; i++) {
            cum += yVals[i];
            const x = padL + i;
            const y = baseY - 18 - (cum / totArea) * (ph * 0.62);
            if (i === 0) specCtx.moveTo(x, y);
            else specCtx.lineTo(x, y);
          }
          specCtx.stroke();
        }

        // Pik Etiketleri
        if (specState.showAssign) {
          specCtx.font = '600 11px JetBrains Mono, monospace';
          c.hnmr.forEach((pk) => {
            const x = ppmToX(pk.ppm);
            specCtx.fillStyle = '#fde047';
            specCtx.fillText(`∫ ${pk.H}H (${pk.mult})`, x, padT + 18);
            specCtx.fillStyle = '#e2e8f0';
            specCtx.fillText(`${pk.ppm.toFixed(2)} ppm`, x, padT + 33);
            if (!specState.mystery) {
              specCtx.fillStyle = '#93c5fd';
              specCtx.fillText(pk.label, x, padT + 48);
            }
          });
          specCtx.fillStyle = '#94a3b8';
          specCtx.fillText('TMS', ppmToX(0), baseY - 28);
        }
      } else if (specState.tech === 'cnmr') {
        // 13C-NMR: 220 ppm .. 0 ppm
        const maxPpm = 220, minPpm = -5;
        const ppmToX = (ppm) => padL + ((maxPpm - ppm) / (maxPpm - minPpm)) * pw;

        specCtx.font = '11px JetBrains Mono, monospace';
        specCtx.fillStyle = '#9aa7c2';
        specCtx.textAlign = 'center';
        for (let p = 0; p <= 220; p += 20) {
          const x = ppmToX(p);
          specCtx.fillText(`${p}`, x, baseY + 18);
        }
        specCtx.fillText('Kimyasal Kayma δ (ppm) — 100 MHz ¹³C-NMR (CDCl₃ üçlüsü: 77,2 ppm)', padL + pw / 2, baseY + 36);

        // CDCl3 çözücü üçlüsü (77.16 ppm)
        [76.8, 77.16, 77.5].forEach((sp) => {
          const sx = ppmToX(sp);
          specCtx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
          specCtx.lineWidth = 1.5;
          specCtx.beginPath();
          specCtx.moveTo(sx, baseY);
          specCtx.lineTo(sx, baseY - ph * 0.28);
          specCtx.stroke();
        });

        c.cnmr.forEach((pk) => {
          const x = ppmToX(pk.ppm);
          const hRatio = pk.type.includes('kuaterner') || pk.type.includes('ipso') ? 0.52 : 0.82;
          specCtx.strokeStyle = '#5b8cff';
          specCtx.lineWidth = 2.6;
          specCtx.beginPath();
          specCtx.moveTo(x, baseY);
          specCtx.lineTo(x, baseY - ph * hRatio);
          specCtx.stroke();

          if (specState.showAssign) {
            specCtx.fillStyle = '#fff';
            specCtx.fillText(`${pk.ppm}`, x, baseY - ph * hRatio - 18);
            specCtx.fillStyle = '#3ddcc4';
            specCtx.fillText(pk.type.split(' ')[0], x, baseY - ph * hRatio - 5);
          }
        });
      } else if (specState.tech === 'ftir') {
        // FTIR: 4000 cm-1 (sol) .. 400 cm-1 (sağ), Y ekseni: % Geçirgenlik (%T, üst 100%, alt 0%)
        const maxWn = 4000, minWn = 400;
        const wnToX = (wn) => padL + ((maxWn - wn) / (maxWn - minWn)) * pw;

        specCtx.font = '11px JetBrains Mono, monospace';
        specCtx.fillStyle = '#9aa7c2';
        specCtx.textAlign = 'center';
        [4000, 3500, 3000, 2500, 2000, 1700, 1500, 1200, 1000, 700, 400].forEach((wn) => {
          specCtx.fillText(`${wn}`, wnToX(wn), baseY + 18);
        });
        specCtx.fillText('Dalga Sayısı ν̃ (cm⁻¹) — FTIR Geçirgenlik Spektrumu (%T)', padL + pw / 2, baseY + 36);

        const samples = Math.floor(pw);
        specCtx.strokeStyle = '#f472b6';
        specCtx.lineWidth = 2.1;
        specCtx.beginPath();
        for (let i = 0; i < samples; i++) {
          const wn = maxWn - (i / samples) * (maxWn - minWn);
          let trans = 96; // %96 taban geçirgenlik
          c.ftir.forEach((b) => {
            const width = b.shape === 'broad' ? 220 : 28;
            const d = (wn - b.wn) / width;
            const dip = (96 - b.trans) * Math.exp(-d * d);
            trans -= dip;
          });
          trans = Math.max(4, Math.min(98, trans));
          const x = padL + i;
          const y = baseY - (trans / 100) * ph;
          if (i === 0) specCtx.moveTo(x, y);
          else specCtx.lineTo(x, y);
        }
        specCtx.stroke();

        if (specState.showAssign) {
          c.ftir.forEach((b) => {
            const x = wnToX(b.wn);
            const y = baseY - (b.trans / 100) * ph;
            specCtx.fillStyle = '#fde047';
            specCtx.fillText(`${b.wn} cm⁻¹`, x, Math.min(baseY - 10, y + 16));
          });
        }
      } else {
        // EI-MS: m/z 10 .. 210, Y ekseni: Bağıl Bolluk (%0 .. %100)
        const maxMz = Math.max(140, Math.ceil((c.mw + 20) / 20) * 20);
        const minMz = 10;
        const mzToX = (mz) => padL + ((mz - minMz) / (maxMz - minMz)) * pw;

        specCtx.font = '11px JetBrains Mono, monospace';
        specCtx.fillStyle = '#9aa7c2';
        specCtx.textAlign = 'center';
        for (let m = 20; m <= maxMz; m += 20) {
          specCtx.fillText(`${m}`, mzToX(m), baseY + 18);
        }
        specCtx.fillText('Kütle / Yük Oranı (m/z) — EI-MS (70 eV) Bağıl Bolluk (%)', padL + pw / 2, baseY + 36);

        c.ms.forEach((pk) => {
          const x = mzToX(pk.mz);
          const h = (pk.rel / 100) * (ph * 0.84);
          specCtx.strokeStyle = pk.rel === 100 ? '#3ddcc4' : pk.label.includes('M⁺') || pk.label.includes('M+2') ? '#f43f5e' : '#5b8cff';
          specCtx.lineWidth = 3.2;
          specCtx.beginPath();
          specCtx.moveTo(x, baseY);
          specCtx.lineTo(x, baseY - h);
          specCtx.stroke();

          if (specState.showAssign) {
            specCtx.fillStyle = '#fff';
            specCtx.fillText(`m/z ${pk.mz}`, x, baseY - h - 16);
            if (!specState.mystery) {
              specCtx.fillStyle = '#cbd5e1';
              specCtx.fillText(pk.label.split(' ')[0], x, baseY - h - 4);
            }
          }
        });
      }
    }

    document.getElementById('specTechTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-stech]');
      if (!b) return;
      specState.tech = b.dataset.stech;
      document.querySelectorAll('#specTechTabs button').forEach((x) => x.classList.toggle('active', x === b));
      updateSpecUI();
    });

    specCompoundsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-scomp]');
      if (!b) return;
      specState.compId = b.dataset.scomp;
      renderSpecCompoundList();
      updateSpecUI();
    });

    specShowIntChk.addEventListener('change', () => { specState.showInt = specShowIntChk.checked; drawSpecCanvas(); });
    specShowAssignChk.addEventListener('change', () => { specState.showAssign = specShowAssignChk.checked; drawSpecCanvas(); });
    specMysteryChk.addEventListener('change', () => {
      specState.mystery = specMysteryChk.checked;
      if (specState.mystery) {
        const rand = SPEC_COMPOUNDS[Math.floor(Math.random() * SPEC_COMPOUNDS.length)];
        specState.compId = rand.id;
        specMysteryPanel.hidden = false;
        specMysteryPanel.innerHTML = `
          <div style="font-size:11.5px;color:#cbd5e1;margin-bottom:6px;">Spektrumları inceleyerek bilinmeyen bileşiği teşhis edin:</div>
          <div class="flame-guess-grid">
            ${SPEC_COMPOUNDS.map((c) => `<button class="chip-btn" data-sguess="${c.id}">${c.name}</button>`).join('')}
          </div>
          <div id="specGuessMsg" style="margin-top:6px;font-size:12px;"></div>
        `;
      } else {
        specMysteryPanel.hidden = true;
      }
      renderSpecCompoundList();
      updateSpecUI();
    });

    specMysteryPanel.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sguess]');
      if (!b) return;
      const msg = document.getElementById('specGuessMsg');
      const cur = getActiveSpecCompound();
      if (b.dataset.sguess === cur.id) {
        msg.innerHTML = `<span class="ok">✓ Doğru! Bileşik: ${cur.name} (${cur.structure}).</span>`;
      } else {
        msg.innerHTML = `<span style="color:#ff7a6b;">✗ Yanlış. IHD değerini, karbonil bölgesini ve NMR yarılmalarını tekrar kontrol edin.</span>`;
      }
    });

    /* ------------------------------------------------------------------------
       2. KUANTUM KİMYASI: HÜCKEL MOLEKÜLER ORBİTAL (HMO) ÇÖZÜCÜ
       ------------------------------------------------------------------------ */
    const hmoCanvas = document.getElementById('hmoCanvas');
    const hmoCtx = hmoCanvas.getContext('2d');
    const hmoHud = document.getElementById('hmoHud');
    const hmoInfo = document.getElementById('hmoInfo');
    const hmoSystemsEl = document.getElementById('hmoSystems');
    const hmoOrbitalList = document.getElementById('hmoOrbitalList');
    const hmoExcitedChk = document.getElementById('hmoExcited');

    const hmoState = {
      sysId: 'benzene',
      charge: 0,      // +1, 0, -1
      excited: false, // HOMO -> LUMO uyarılma
      selectedMo: 0,  // İncelenen MO indeksi
      eigen: [],
      occ: [],
    };

    function renderHmoSystems() {
      hmoSystemsEl.innerHTML = HMO_SYSTEMS.map((s) => `
        <button class="reagent-btn ${s.id === hmoState.sysId ? 'active' : ''}" data-hsys="${s.id}">
          <span class="reagent-dot" style="background:#a855f7;"></span>
          <div>
            <b>${s.name}</b>
            <small>${s.coords.length} p_z orbitali · ${s.nPi} π-elektronu</small>
          </div>
        </button>
      `).join('');
    }
    renderHmoSystems();

    function solveHmo() {
      const sys = HMO_SYSTEMS.find((s) => s.id === hmoState.sysId) || HMO_SYSTEMS[0];
      const N = sys.coords.length;
      const A = Array.from({ length: N }, () => Array(N).fill(0));
      sys.edges.forEach(([u, v]) => {
        A[u][v] = 1;
        A[v][u] = 1;
      });

      const eigen = jacobiEigen(A);
      hmoState.eigen = eigen;

      // Toplam π elektronu sayısı
      const nElec = Math.max(0, Math.min(2 * N, sys.nPi - hmoState.charge));
      const occ = Array(N).fill(0);
      let rem = nElec;
      for (let k = 0; k < N && rem > 0; k++) {
        const put = Math.min(2, rem);
        occ[k] = put;
        rem -= put;
      }

      // HOMO ve LUMO indeksleri
      let homoIdx = 0;
      for (let k = 0; k < N; k++) {
        if (occ[k] > 0) homoIdx = k;
      }
      const lumoIdx = Math.min(N - 1, homoIdx + 1);

      if (hmoState.excited && occ[homoIdx] >= 1 && occ[lumoIdx] < 2) {
        occ[homoIdx] -= 1;
        occ[lumoIdx] += 1;
      }
      hmoState.occ = occ;
      if (hmoState.selectedMo >= N) hmoState.selectedMo = homoIdx;

      // Toplam π enerjisi (E_pi = n*alpha + sum(n_k * x_k)*beta) ve Delokalizasyon (Rezonans) Enerjisi
      let betaSum = 0;
      for (let k = 0; k < N; k++) betaSum += occ[k] * eigen[k].x;
      const locBeta = 2.0 * sys.localizedPairs;
      const delocE = betaSum - locBeta;
      const gap = lumoIdx > homoIdx ? eigen[homoIdx].x - eigen[lumoIdx].x : 0;

      // Orbital Seçim Butonları
      hmoOrbitalList.innerHTML = eigen.map((mo, idx) => {
        const tag = idx === homoIdx ? ' (HOMO)' : idx === lumoIdx ? ' (LUMO)' : '';
        return `<button class="chip-btn ${idx === hmoState.selectedMo ? 'active' : ''}" data-mo="${idx}" style="${idx === hmoState.selectedMo ? 'border-color:var(--accent-2);background:rgba(61,220,196,0.2);' : ''}">ψ_${idx + 1}${tag}</button>`;
      }).join('');

      hmoHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">TOPLAM π-ENERJİSİ (E_π)</span>
          <b class="hud-val">${nElec}α + ${betaSum.toFixed(3).replace('.', ',')}β</b>
          <small class="hud-sub">${nElec} π-elektronu (${hmoState.excited ? 'Uyarılmış *' : 'Temel Hal'})</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">DELOKALİZASYON ENERJİSİ</span>
          <b class="hud-val" style="color:var(--accent-2);">${delocE.toFixed(3).replace('.', ',')} |β|</b>
          <small class="hud-sub">≈ ${(delocE * 150).toFixed(0)} kJ/mol rezonans kararlılığı</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">HOMO – LUMO ARALIĞI (ΔE)</span>
          <b class="hud-val">${gap.toFixed(3).replace('.', ',')} |β|</b>
          <small class="hud-sub">ψ_${homoIdx + 1} → ψ_${lumoIdx + 1} fotokimyasal geçiş</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">SEÇİLİ ORBİTAL (ψ_${hmoState.selectedMo + 1})</span>
          <b class="hud-val">E = α ${eigen[hmoState.selectedMo].x >= 0 ? '+' : '−'} ${Math.abs(eigen[hmoState.selectedMo].x).toFixed(3)}β</b>
          <small class="hud-sub">${eigen[hmoState.selectedMo].x > 0.01 ? 'Bağlayıcı (π)' : eigen[hmoState.selectedMo].x < -0.01 ? 'Karşıt-Bağlayıcı (π*)' : 'Bağlayıcı Olmayan (n)'}</small>
        </div>
      `;

      hmoInfo.innerHTML = `
        <div class="lab-rx">
          <b>${sys.name} — Kuantum Mekaniksel LCAO Dalga Fonksiyonu: ψ_${hmoState.selectedMo + 1} = Σ c_${hmoState.selectedMo + 1},r · φ_r(2p_z)</b>
          <span>${sys.desc} Sağda seçili moleküler orbitalin atomlar üzerindeki LCAO katsayıları (mavi: + faz, kırmızı: − faz) ve π-bağ dereceleri (p_rs) gösterilmektedir.</span>
        </div>
      `;

      drawHmoCanvas();
    }

    function drawHmoCanvas() {
      const vp = prepareCanvas(hmoCanvas, hmoCtx, 760, 410);
      if (!vp) return;
      const { W, H } = vp;
      const sys = HMO_SYSTEMS.find((s) => s.id === hmoState.sysId) || HMO_SYSTEMS[0];
      const N = sys.coords.length;
      const eigen = hmoState.eigen;
      const occ = hmoState.occ;

      // SOL YARI: MO Enerji Seviyesi Diyagramı (E = α + x_k β)
      const lx = 48, lw = W * 0.44 - 56, topY = 36, botY = H - 36;
      const midY = (topY + botY) / 2;
      const scaleY = (botY - topY) / 5.4; // x in [-2.6 .. +2.6]

      // E = α (bağlayıcı olmayan referans çizgisi)
      hmoCtx.strokeStyle = 'rgba(148, 163, 184, 0.32)';
      hmoCtx.setLineDash([5, 5]);
      hmoCtx.beginPath();
      hmoCtx.moveTo(lx, midY);
      hmoCtx.lineTo(lx + lw, midY);
      hmoCtx.stroke();
      hmoCtx.setLineDash([]);
      hmoCtx.font = '11px JetBrains Mono, monospace';
      hmoCtx.fillStyle = '#9aa7c2';
      hmoCtx.textAlign = 'left';
      hmoCtx.fillText('E = α (NBMO)', lx + 4, midY - 6);

      // Dejenere enerji seviyelerini grupla
      const groups = [];
      eigen.forEach((mo, idx) => {
        const g = groups.find((x) => Math.abs(x.x - mo.x) < 0.03);
        if (g) g.indices.push(idx);
        else groups.push({ x: mo.x, indices: [idx] });
      });

      groups.forEach((g) => {
        const y = midY - g.x * scaleY;
        const count = g.indices.length;
        const barW = 54;
        const gapX = 18;
        const totW = count * barW + (count - 1) * gapX;
        const startX = lx + lw / 2 - totW / 2;

        g.indices.forEach((moIdx, subIdx) => {
          const bx = startX + subIdx * (barW + gapX);
          const isSel = moIdx === hmoState.selectedMo;
          hmoCtx.strokeStyle = isSel ? '#3ddcc4' : '#5b8cff';
          hmoCtx.lineWidth = isSel ? 3.5 : 2.2;
          hmoCtx.beginPath();
          hmoCtx.moveTo(bx, y);
          hmoCtx.lineTo(bx + barW, y);
          hmoCtx.stroke();

          // Elektron okları (↑↓)
          const eCount = occ[moIdx];
          hmoCtx.fillStyle = '#fde047';
          hmoCtx.font = '700 13px Inter, sans-serif';
          hmoCtx.textAlign = 'center';
          if (eCount === 1) hmoCtx.fillText('↑', bx + barW / 2, y - 4);
          if (eCount === 2) hmoCtx.fillText('↑↓', bx + barW / 2, y - 4);

          hmoCtx.font = '10px JetBrains Mono, monospace';
          hmoCtx.fillStyle = isSel ? '#3ddcc4' : '#cbd5e1';
          hmoCtx.fillText(`ψ${moIdx + 1}`, bx + barW / 2, y + 13);
        });

        hmoCtx.font = '10.5px JetBrains Mono, monospace';
        hmoCtx.fillStyle = '#9aa7c2';
        hmoCtx.textAlign = 'right';
        hmoCtx.fillText(`α${g.x >= 0 ? '+' : ''}${g.x.toFixed(2)}β`, startX - 8, y + 4);
      });

      // SAĞ YARI: Moleküler İskelet Üzerinde LCAO Dalga Fonksiyonu (ψ_k) ve π-Bağ Dereceleri
      const rx = W * 0.72, ry = H * 0.50;
      const selMo = eigen[hmoState.selectedMo] || eigen[0];

      // π-Bağ derecesi (p_rs = sum_k n_k * c_kr * c_ks)
      sys.edges.forEach(([u, v]) => {
        let pOrder = 0;
        for (let k = 0; k < N; k++) {
          pOrder += occ[k] * eigen[k].vec[u] * eigen[k].vec[v];
        }
        const [x1, y1] = sys.coords[u];
        const [x2, y2] = sys.coords[v];

        hmoCtx.strokeStyle = 'rgba(203, 213, 225, 0.78)';
        hmoCtx.lineWidth = 2.5 + Math.max(0, pOrder) * 3.5;
        hmoCtx.beginPath();
        hmoCtx.moveTo(rx + x1, ry + y1);
        hmoCtx.lineTo(rx + x2, ry + y2);
        hmoCtx.stroke();

        // Bağ derecesi etiketi
        hmoCtx.font = '600 10px JetBrains Mono, monospace';
        hmoCtx.fillStyle = '#93c5fd';
        hmoCtx.textAlign = 'center';
        hmoCtx.fillText(pOrder.toFixed(2), rx + (x1 + x2) / 2, ry + (y1 + y2) / 2 - 5);
      });

      // Atom düğümleri ve LCAO 2p_z faz lobları (c_kr)
      sys.coords.forEach(([x, y], r) => {
        const coeff = selMo.vec[r];
        const radius = Math.max(5, Math.abs(coeff) * 38);
        const isPos = coeff >= 0;

        if (Math.abs(coeff) > 0.03) {
          hmoCtx.beginPath();
          hmoCtx.arc(rx + x, ry + y, radius, 0, Math.PI * 2);
          hmoCtx.fillStyle = isPos ? 'rgba(91, 140, 255, 0.45)' : 'rgba(255, 122, 107, 0.45)';
          hmoCtx.strokeStyle = isPos ? '#5b8cff' : '#ff7a6b';
          hmoCtx.lineWidth = 2;
          hmoCtx.fill();
          hmoCtx.stroke();
        } else {
          // Düğüm noktası (Node)
          hmoCtx.beginPath();
          hmoCtx.arc(rx + x, ry + y, 5, 0, Math.PI * 2);
          hmoCtx.fillStyle = '#475569';
          hmoCtx.fill();
        }

        hmoCtx.font = '700 10.5px JetBrains Mono, monospace';
        hmoCtx.fillStyle = '#fff';
        hmoCtx.textAlign = 'center';
        hmoCtx.fillText(`${coeff >= 0 ? '+' : ''}${coeff.toFixed(2)}`, rx + x, ry + y + 4);
      });
    }

    hmoSystemsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-hsys]');
      if (!b) return;
      hmoState.sysId = b.dataset.hsys;
      hmoState.selectedMo = 0;
      renderHmoSystems();
      solveHmo();
    });

    document.getElementById('hmoChargeTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-hq]');
      if (!b) return;
      hmoState.charge = parseInt(b.dataset.hq, 10);
      document.querySelectorAll('#hmoChargeTabs button').forEach((x) => x.classList.toggle('active', x === b));
      solveHmo();
    });

    hmoExcitedChk.addEventListener('change', () => {
      hmoState.excited = hmoExcitedChk.checked;
      solveHmo();
    });

    hmoOrbitalList.addEventListener('click', (e) => {
      const b = e.target.closest('[data-mo]');
      if (!b) return;
      hmoState.selectedMo = parseInt(b.dataset.mo, 10);
      solveHmo();
    });

    /* ------------------------------------------------------------------------
       3. EYRING GEÇİŞ HALİ TEORİSİ (TST), PES & RK4 KİNETİK
       ------------------------------------------------------------------------ */
    const tstCanvas = document.getElementById('tstCanvas');
    const tstCtx = tstCanvas.getContext('2d');
    const tstHud = document.getElementById('tstHud');
    const tstInfo = document.getElementById('tstInfo');

    const tstDh1 = document.getElementById('tstDh1');
    const tstDs1 = document.getElementById('tstDs1');
    const tstGi = document.getElementById('tstGi');
    const tstDh2 = document.getElementById('tstDh2');
    const tstGp = document.getElementById('tstGp');
    const tstTemp = document.getElementById('tstTemp');
    const tstCatalyst = document.getElementById('tstCatalyst');

    function updateTst() {
      const dH1_raw = parseFloat(tstDh1.value);
      const dS1 = parseFloat(tstDs1.value); // J/(mol·K)
      const gI = parseFloat(tstGi.value);
      const dH2 = parseFloat(tstDh2.value);
      const gP = parseFloat(tstGp.value);
      const T = parseFloat(tstTemp.value);
      const cat = tstCatalyst.checked;

      const dH1 = cat ? Math.max(15, dH1_raw - 18) : dH1_raw;
      const R_gas = 8.314462; // J/(mol·K)
      const kB_h = 2.08366e10; // k_B / h (s^-1 K^-1)

      // ΔG1‡ = ΔH1‡ - T*ΔS1‡ (kJ/mol)
      const dG1_dag = dH1 - (T * dS1) / 1000;
      const dG_rev1 = Math.max(12, dG1_dag - gI);
      const dG2_dag = Math.max(12, dH2 - gI);

      document.getElementById('tstDh1Val').textContent = `${dH1.toFixed(1).replace('.', ',')} kJ/mol`;
      document.getElementById('tstDs1Val').textContent = `${dS1 > 0 ? '+' : ''}${dS1} J/(mol·K)`;
      document.getElementById('tstGiVal').textContent = `${gI >= 0 ? '+' : ''}${gI.toFixed(1).replace('.', ',')} kJ/mol`;
      document.getElementById('tstDh2Val').textContent = `${dH2.toFixed(1).replace('.', ',')} kJ/mol`;
      document.getElementById('tstGpVal').textContent = `${gP >= 0 ? '+' : ''}${gP.toFixed(1).replace('.', ',')} kJ/mol`;
      document.getElementById('tstTempVal').textContent = `${T} K (${(T - 273.15).toFixed(0)} °C)`;

      // Eyring hız sabitleri (s^-1) — Görsel kinetik penceresi için ölçeklenmiş bağıl hızlar ve gerçek k1
      const k1_real = kB_h * T * Math.exp((-dG1_dag * 1000) / (R_gas * T));
      const scaleK = (dG) => 3.5 * Math.exp(-(dG - 45) / (0.008314 * T * 6.5));
      const k1 = scaleK(dG1_dag);
      const km1 = scaleK(dG_rev1);
      const k2 = scaleK(dG2_dag);

      const rds = dG1_dag >= gI + dG2_dag ? '1. Basamak (TS₁‡ — Hız Belirleyici)' : '2. Basamak (TS₂‡ — Hız Belirleyici)';
      const K_eq = Math.exp((-gP * 1000) / (R_gas * T));

      tstHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">SERBEST AKTİVASYON (ΔG₁‡)</span>
          <b class="hud-val" style="color:var(--accent-2);">${dG1_dag.toFixed(1).replace('.', ',')} kJ/mol</b>
          <small class="hud-sub">ΔH₁‡ − TΔS₁‡ (${T} K)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">EYRING HIZ SABİTİ (k₁)</span>
          <b class="hud-val">${k1_real.toExponential(2)} s⁻¹</b>
          <small class="hud-sub">k = (k_BT/h)·e^(−ΔG‡/RT)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">HIZ BELİRLEYİCİ BASAMAK</span>
          <b class="hud-val" style="font-size:13.5px;">${rds}</b>
          <small class="hud-sub">En yüksek geçiş hali enerjisi</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">TERMODİNAMİK DENGE (K_eq)</span>
          <b class="hud-val">${K_eq.toExponential(2)}</b>
          <small class="hud-sub">${gP < 0 ? 'Ekzergonik (İstemli)' : 'Endergonik'}</small>
        </div>
      `;

      tstInfo.innerHTML = `
        <div class="lab-rx">
          <b>Eyring-Polanyi Geçiş Hali Teorisi: k(T) = (κ·k_B·T / h)·exp(ΔS‡/R)·exp(−ΔH‡/RT)</b>
          <span>Solda tepkime koordinatı boyunca serbest enerji profili G(ξ) (Hammond postülatı uyumlu), sağda ise <b>4. Mertebe Runge-Kutta (RK4)</b> diferansiyel çözücüsüyle hesaplanan [A](t), ara ürün [I](t) ve ürün [P](t) derişim eğrileri yer almaktadır.</span>
        </div>
      `;

      drawTstCanvas(dG1_dag, dG1_raw_from(dH1_raw, T, dS1), gI, gI + dG2_dag, gP, k1, km1, k2, cat);
    }

    function dG1_raw_from(dH1_raw, T, dS1) {
      return dH1_raw - (T * dS1) / 1000;
    }

    function drawTstCanvas(gTS1, gTS1_uncat, gI, gTS2, gP, k1, km1, k2, cat) {
      const vp = prepareCanvas(tstCanvas, tstCtx, 760, 410);
      if (!vp) return;
      const { W, H } = vp;

      // SOL GRAFİK: Serbest Enerji Yüzeyi G(ξ)
      const lx = 48, lw = W * 0.45 - 60, gy = 32, gh = H - 72;
      const minG = -90, maxG = 140;
      const gToY = (g) => gy + gh - ((g - minG) / (maxG - minG)) * gh;

      // Çerçeve
      tstCtx.fillStyle = 'rgba(6, 10, 22, 0.72)';
      tstCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      tstCtx.beginPath();
      tstCtx.roundRect(lx, gy, lw, gh, 10);
      tstCtx.fill();
      tstCtx.stroke();

      // G = 0 referans çizgisi
      const y0 = gToY(0);
      tstCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      tstCtx.setLineDash([4, 4]);
      tstCtx.beginPath();
      tstCtx.moveTo(lx, y0);
      tstCtx.lineTo(lx + lw, y0);
      tstCtx.stroke();
      tstCtx.setLineDash([]);

      // Hermite spline ile pürüzsüz PES eğrisi
      function drawPesCurve(ts1Val, color, dashed) {
        const pts = [
          { x: 0.08, g: 0 },
          { x: 0.32, g: ts1Val },
          { x: 0.54, g: gI },
          { x: 0.76, g: gTS2 },
          { x: 0.94, g: gP },
        ];
        tstCtx.strokeStyle = color;
        tstCtx.lineWidth = dashed ? 1.8 : 3.0;
        if (dashed) tstCtx.setLineDash([6, 5]);
        tstCtx.beginPath();
        for (let seg = 0; seg < pts.length - 1; seg++) {
          const p0 = pts[seg], p1 = pts[seg + 1];
          for (let s = 0; s <= 24; s++) {
            const t = s / 24;
            const sCurve = t * t * (3 - 2 * t);
            const px = lx + (p0.x + (p1.x - p0.x) * t) * lw;
            const py = gToY(p0.g + (p1.g - p0.g) * sCurve);
            if (seg === 0 && s === 0) tstCtx.moveTo(px, py);
            else tstCtx.lineTo(px, py);
          }
        }
        tstCtx.stroke();
        tstCtx.setLineDash([]);
      }

      if (cat) drawPesCurve(gTS1_uncat, 'rgba(255, 122, 107, 0.55)', true);
      drawPesCurve(gTS1, '#3ddcc4', false);

      // Etiketler
      tstCtx.font = '700 11px JetBrains Mono, monospace';
      tstCtx.fillStyle = '#fff';
      tstCtx.textAlign = 'center';
      tstCtx.fillText('A (0)', lx + lw * 0.08, gToY(0) - 10);
      tstCtx.fillStyle = '#fde047';
      tstCtx.fillText(`TS₁‡ (+${gTS1.toFixed(0)})`, lx + lw * 0.32, gToY(gTS1) - 10);
      tstCtx.fillStyle = '#93c5fd';
      tstCtx.fillText(`I (${gI.toFixed(0)})`, lx + lw * 0.54, gToY(gI) + 16);
      tstCtx.fillStyle = '#fde047';
      tstCtx.fillText(`TS₂‡ (+${gTS2.toFixed(0)})`, lx + lw * 0.76, gToY(gTS2) - 10);
      tstCtx.fillStyle = '#3ddcc4';
      tstCtx.fillText(`P (${gP.toFixed(0)})`, lx + lw * 0.92, gToY(gP) - 10);
      tstCtx.fillStyle = '#9aa7c2';
      tstCtx.fillText('Tepkime Koordinatı (ξ) — Serbest Enerji G (kJ/mol)', lx + lw / 2, gy + gh + 22);

      // SAĞ GRAFİK: 4. Mertebe Runge-Kutta (RK4) Kinetik Derişim Evrimi [A](t), [I](t), [P](t)
      const rx = W * 0.52, rw = W - rx - 28;
      tstCtx.fillStyle = 'rgba(6, 10, 22, 0.72)';
      tstCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      tstCtx.beginPath();
      tstCtx.roundRect(rx, gy, rw, gh, 10);
      tstCtx.fill();
      tstCtx.stroke();

      const steps = 200;
      const dt = 0.04;
      let A = 1.0, I = 0.0, P = 0.0;
      const histA = [A], histI = [I], histP = [P];

      const deriv = (a, i) => {
        const dA = -k1 * a + km1 * i;
        const dI = k1 * a - (km1 + k2) * i;
        const dP = k2 * i;
        return [dA, dI, dP];
      };

      for (let s = 0; s < steps; s++) {
        const [k1A, k1I, k1P] = deriv(A, I);
        const [k2A, k2I, k2P] = deriv(A + 0.5 * dt * k1A, I + 0.5 * dt * k1I);
        const [k3A, k3I, k3P] = deriv(A + 0.5 * dt * k2A, I + 0.5 * dt * k2I);
        const [k4A, k4I, k4P] = deriv(A + dt * k3A, I + dt * k3I);
        A = Math.max(0, A + (dt / 6) * (k1A + 2 * k2A + 2 * k3A + k4A));
        I = Math.max(0, I + (dt / 6) * (k1I + 2 * k2I + 2 * k3I + k4I));
        P = Math.max(0, P + (dt / 6) * (k1P + 2 * k2P + 2 * k3P + k4P));
        histA.push(A);
        histI.push(I);
        histP.push(P);
      }

      function plotSpecies(arr, color, label, lblIdx) {
        tstCtx.strokeStyle = color;
        tstCtx.lineWidth = 2.5;
        tstCtx.beginPath();
        arr.forEach((v, idx) => {
          const x = rx + (idx / steps) * rw;
          const y = gy + gh - v * (gh - 24) - 8;
          if (idx === 0) tstCtx.moveTo(x, y);
          else tstCtx.lineTo(x, y);
        });
        tstCtx.stroke();

        const lxPos = rx + (lblIdx / steps) * rw;
        const lyPos = gy + gh - arr[lblIdx] * (gh - 24) - 14;
        tstCtx.fillStyle = color;
        tstCtx.fillText(label, lxPos, Math.max(gy + 16, lyPos));
      }

      plotSpecies(histA, '#ff7a6b', '[A](t) Reaktif', 35);
      plotSpecies(histI, '#fde047', '[I](t) Ara Ürün', 65);
      plotSpecies(histP, '#3ddcc4', '[P](t) Ürün', 145);

      tstCtx.fillStyle = '#9aa7c2';
      tstCtx.fillText('Zaman (t) — RK4 Sayısal Kinetik Çözümü ([C]/[A]₀)', rx + rw / 2, gy + gh + 22);
    }

    [tstDh1, tstDs1, tstGi, tstDh2, tstGp, tstTemp, tstCatalyst].forEach((el) => {
      el.addEventListener('input', updateTst);
      el.addEventListener('change', updateTst);
    });

    /* ------------------------------------------------------------------------
       4. DÖNÜŞÜMLÜ VOLTAMETRİ (CYCLIC VOLTAMMETRY — CV)
       ------------------------------------------------------------------------ */
    const cvCanvas = document.getElementById('cvCanvas');
    const cvCtx = cvCanvas.getContext('2d');
    const cvHud = document.getElementById('cvHud');
    const cvInfo = document.getElementById('cvInfo');

    const cvSystem = document.getElementById('cvSystem');
    const cvScan = document.getElementById('cvScan');
    const cvK0 = document.getElementById('cvK0');
    const cvN = document.getElementById('cvN');
    const cvConc = document.getElementById('cvConc');

    const CV_PRESETS = {
      fc: { E0: 0.40, k0: 90, n: 1, name: 'Ferrosen [Fe(Cp)₂]⁰/⁺' },
      fecn: { E0: 0.36, k0: 58, n: 1, name: '[Fe(CN)₆]³⁻/⁴⁻' },
      ru: { E0: 0.10, k0: 95, n: 1, name: '[Ru(NH₃)₆]³⁺/²⁺' },
      da: { E0: 0.22, k0: 25, n: 2, name: 'Dopamin / o-Kinon (2e⁻, 2H⁺)' },
    };

    cvSystem.addEventListener('change', () => {
      const p = CV_PRESETS[cvSystem.value];
      if (p) {
        cvK0.value = String(p.k0);
        cvN.value = String(p.n);
        updateCv();
      }
    });

    function updateCv() {
      const p = CV_PRESETS[cvSystem.value] || CV_PRESETS.fc;
      const nu = parseFloat(cvScan.value); // mV/s
      const k0 = parseFloat(cvK0.value);   // 1..100
      const n = parseInt(cvN.value, 10);
      const C = parseFloat(cvConc.value);  // mM

      document.getElementById('cvScanVal').textContent = `${nu} mV/s`;
      document.getElementById('cvK0Val').textContent = k0 > 75 ? 'Tersinir (Nernstian)' : k0 > 35 ? 'Yarı-Tersinir (Quasi)' : 'Tersinmez (Yavaş)';
      document.getElementById('cvNVal').textContent = `${n} e⁻`;
      document.getElementById('cvConcVal').textContent = `${C.toFixed(1).replace('.', ',')} mM`;

      // Randles-Ševčík tepe akımı: i_p ∝ n^(3/2) * C * sqrt(nu)
      const ip_rev = 14.5 * Math.pow(n, 1.5) * C * Math.sqrt(nu / 100);
      // Nicholson kinetik parametresi Ψ ve pik ayrılması ΔE_p
      const kineticLag = ((100 - k0) / 100) * Math.pow(nu / 100, 0.35) * 0.16;
      const dEp_ideal = 0.0592 / n;
      const dEp = dEp_ideal + 2 * kineticLag;
      const Epa = p.E0 + dEp / 2;
      const Epc = p.E0 - dEp / 2;
      const E12 = (Epa + Epc) / 2;
      const Ipa = ip_rev * (0.68 + 0.32 * (k0 / 100));
      const Ipc = -Ipa * (0.55 + 0.45 * (k0 / 100));

      cvHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">ANODİK TEPE (E_pa / I_pa)</span>
          <b class="hud-val" style="color:#3ddcc4;">+${(Epa * 1000).toFixed(0)} mV</b>
          <small class="hud-sub">I_pa = +${Ipa.toFixed(1).replace('.', ',')} μA</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">KATODİK TEPE (E_pc / I_pc)</span>
          <b class="hud-val" style="color:#ff7a6b;">${Epc >= 0 ? '+' : ''}${(Epc * 1000).toFixed(0)} mV</b>
          <small class="hud-sub">I_pc = ${Ipc.toFixed(1).replace('.', ',')} μA</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">TEPE AYRILMASI (ΔE_p)</span>
          <b class="hud-val" style="color:var(--accent-2);">${(dEp * 1000).toFixed(1).replace('.', ',')} mV</b>
          <small class="hud-sub">İdeal Nernst: ${(dEp_ideal * 1000).toFixed(1)} mV</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">YARI-DALGA POTANSİYELİ (E_1/2)</span>
          <b class="hud-val">+${(E12 * 1000).toFixed(0)} mV</b>
          <small class="hud-sub">vs. Ag/AgCl referans elektrodu</small>
        </div>
      `;

      cvInfo.innerHTML = `
        <div class="lab-rx">
          <b>Randles-Ševčík Denklemi: i_p = (2,69×10⁵)·n^(3/2)·A·D^(1/2)·C*·ν^(1/2)</b>
          <span>Tarama hızı (ν) arttıkça difüzyon tabakası incelir ve tepe akımı √ν ile doğru orantılı artar. Heterojen elektron aktarım hız sabiti (k⁰) küçüldükçe anodik ve katodik pikler birbirinden uzaklaşır (ΔE_p > 59/n mV).</span>
        </div>
      `;

      drawCvCanvas(p.E0, Epa, Epc, Ipa, Ipc, k0);
    }

    function drawCvCanvas(E0, Epa, Epc, Ipa, Ipc, k0) {
      const vp = prepareCanvas(cvCanvas, cvCtx, 680, 390);
      if (!vp) return;
      const { W, H } = vp;

      const padL = 62, padR = 32, padT = 32, padB = 44;
      const pw = W - padL - padR, ph = H - padT - padB;
      const Emin = -0.35, Emax = 0.95;
      const eToX = (E) => padL + ((E - Emin) / (Emax - Emin)) * pw;
      const maxI = Math.max(60, Math.abs(Ipa) * 1.35);
      const iToY = (I) => padT + ph / 2 - (I / maxI) * (ph * 0.45);

      // Izgara ve I = 0 ekseni
      cvCtx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      cvCtx.lineWidth = 1;
      for (let e = -0.2; e <= 0.85; e += 0.2) {
        const x = eToX(e);
        cvCtx.beginPath();
        cvCtx.moveTo(x, padT);
        cvCtx.lineTo(x, padT + ph);
        cvCtx.stroke();
        cvCtx.font = '11px JetBrains Mono, monospace';
        cvCtx.fillStyle = '#9aa7c2';
        cvCtx.textAlign = 'center';
        cvCtx.fillText(`${e >= 0 ? '+' : ''}${e.toFixed(1)} V`, x, padT + ph + 18);
      }

      const yZero = iToY(0);
      cvCtx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      cvCtx.beginPath();
      cvCtx.moveTo(padL, yZero);
      cvCtx.lineTo(padL + pw, yZero);
      cvCtx.stroke();

      // Karakteristik "Ördek" (Duck-shaped) Difüzyon Kuyruklu CV Dalga Fonksiyonu
      const width = 0.055 + ((100 - k0) / 100) * 0.065;
      function waveShape(x) {
        if (x < -3) return 0;
        if (x <= 0) return Math.exp(-x * x * 0.85);
        // Cottrell t^(-1/2) difüzyon kuyruğu
        return 1 / Math.pow(1 + x * 1.15, 0.52);
      }

      // İleri Tarama (Anodik: Emin -> Emax)
      cvCtx.strokeStyle = '#3ddcc4';
      cvCtx.lineWidth = 2.8;
      cvCtx.beginPath();
      const Npts = 220;
      for (let i = 0; i <= Npts; i++) {
        const E = Emin + (i / Npts) * (Emax - Emin);
        const u = (E - Epa) / width;
        const I = Ipa * waveShape(u) + (E - Emin) * 2.2;
        const px = eToX(E), py = iToY(I);
        if (i === 0) cvCtx.moveTo(px, py);
        else cvCtx.lineTo(px, py);
      }
      cvCtx.stroke();

      // Geri Tarama (Katodik: Emax -> Emin)
      cvCtx.strokeStyle = '#5b8cff';
      cvCtx.lineWidth = 2.8;
      cvCtx.beginPath();
      for (let i = 0; i <= Npts; i++) {
        const E = Emax - (i / Npts) * (Emax - Emin);
        const uAnod = (E - Epa) / width;
        const tail = Ipa * waveShape(uAnod) * 0.38;
        const uCat = (Epc - E) / width;
        const I = tail + Ipc * waveShape(uCat) - (Emax - E) * 2.2;
        const px = eToX(E), py = iToY(I);
        if (i === 0) cvCtx.moveTo(px, py);
        else cvCtx.lineTo(px, py);
      }
      cvCtx.stroke();

      // E_1/2 ve Tepe İşaretçileri
      const xEpa = eToX(Epa), yIpa = iToY(Ipa + (Epa - Emin) * 2.2);
      const xEpc = eToX(Epc), yIpc = iToY(Ipc * 0.92);
      cvCtx.fillStyle = '#fde047';
      cvCtx.beginPath();
      cvCtx.arc(xEpa, yIpa, 4.5, 0, Math.PI * 2);
      cvCtx.arc(xEpc, yIpc, 4.5, 0, Math.PI * 2);
      cvCtx.fill();

      cvCtx.font = '700 11px JetBrains Mono, monospace';
      cvCtx.fillText(`E_pa = +${(Epa * 1000).toFixed(0)} mV`, xEpa, yIpa - 10);
      cvCtx.fillText(`E_pc = ${(Epc * 1000).toFixed(0)} mV`, xEpc, yIpc + 18);

      cvCtx.fillStyle = '#9aa7c2';
      cvCtx.fillText('Uygulanan Potansiyel E (V vs. Ag/AgCl) — Dönüşümlü Voltamogram I(E)', padL + pw / 2, padT + ph + 36);
    }

    [cvScan, cvK0, cvN, cvConc].forEach((el) => {
      el.addEventListener('input', updateCv);
    });

    /* ------------------------------------------------------------------------
       5. KRİSTAL ALAN VE LİGAND ALAN TEORİSİ (CFT / LFT)
       ------------------------------------------------------------------------ */
    const cftCanvas = document.getElementById('cftCanvas');
    const cftCtx = cftCanvas.getContext('2d');
    const cftHud = document.getElementById('cftHud');
    const cftInfo = document.getElementById('cftInfo');
    const cftMetalSel = document.getElementById('cftMetal');
    const cftLigandSel = document.getElementById('cftLigand');

    const METALS = {
      Ti3: { ion: 'Ti³⁺', d: 1, baseDq: 17000, P: 15000 },
      V3:  { ion: 'V³⁺',  d: 2, baseDq: 16500, P: 16000 },
      Cr3: { ion: 'Cr³⁺', d: 3, baseDq: 17400, P: 20500 },
      Mn2: { ion: 'Mn²⁺', d: 5, baseDq: 8500,  P: 25500 },
      Fe3: { ion: 'Fe³⁺', d: 5, baseDq: 14000, P: 30000 },
      Fe2: { ion: 'Fe²⁺', d: 6, baseDq: 10400, P: 17600 },
      Co3: { ion: 'Co³⁺', d: 6, baseDq: 18200, P: 21000 },
      Co2: { ion: 'Co²⁺', d: 7, baseDq: 9300,  P: 22500 },
      Ni2: { ion: 'Ni²⁺', d: 8, baseDq: 8600,  P: 24000 },
      Cu2: { ion: 'Cu²⁺', d: 9, baseDq: 12600, P: 26000 },
    };

    const LIGANDS = {
      I:   { f: 0.62, fml: 'I₆',      charge: -6, name: 'İyodür (π-donör)' },
      Br:  { f: 0.72, fml: 'Br₆',     charge: -6, name: 'Bromür (π-donör)' },
      Cl:  { f: 0.80, fml: 'Cl₆',     charge: -6, name: 'Klorür (π-donör)' },
      F:   { f: 0.90, fml: 'F₆',      charge: -6, name: 'Florür' },
      H2O: { f: 1.00, fml: '(H₂O)₆',  charge: 0,  name: 'Aqua (σ-donör)' },
      NH3: { f: 1.25, fml: '(NH₃)₆',  charge: 0,  name: 'Ammin (kuvvetli σ)' },
      en:  { f: 1.38, fml: '(en)₃',   charge: 0,  name: 'Etilendiamin (şelat)' },
      CN:  { f: 1.85, fml: '(CN)₆',   charge: -6, name: 'Siyanür (π-akseptör)' },
      CO:  { f: 2.05, fml: '(CO)₆',   charge: 0,  name: 'Karbonil (güçlü π-akseptör)' },
    };

    const cftState = {
      metal: 'Fe2',
      geom: 'oct', // 'oct' | 'tet' | 'sq'
      ligand: 'H2O',
    };

    // Absorplanan dalga boyundan (nm) tamamlayıcı çözelti rengi
    function complementaryColor(absNm, dCount) {
      if (dCount === 0 || dCount === 10) return { hex: '#e2e8f0', name: 'Renksiz (d–d geçişi yok)' };
      if (absNm < 420) return { hex: '#fde047', name: 'Açık Sarı' };
      if (absNm < 475) return { hex: '#fb923c', name: 'Turuncu-Kırmızı' };
      if (absNm < 515) return { hex: '#f43f5e', name: 'Yakut Kırmızı / Pembe' };
      if (absNm < 565) return { hex: '#a855f7', name: 'Mor / Menekşe' };
      if (absNm < 610) return { hex: '#3b82f6', name: 'Derin Mavi' };
      if (absNm < 680) return { hex: '#06b6d4', name: 'Camgöbeği / Turkuaz' };
      return { hex: '#10b981', name: 'Zümrüt Yeşili' };
    }

    function updateCft() {
      const m = METALS[cftState.metal];
      const lig = LIGANDS[cftState.ligand];
      const deltaO = Math.round(m.baseDq * lig.f);
      const delta = cftState.geom === 'tet' ? Math.round(deltaO * (4 / 9)) : cftState.geom === 'sq' ? Math.round(deltaO * 1.45) : deltaO;
      const lowSpin = cftState.geom === 'sq' || (cftState.geom === 'oct' && deltaO > m.P);

      // Orbital dolumu (Oktahedral: t2g [3], eg [2]; Tetrahedral: e [2], t2 [3])
      let lowerCap = cftState.geom === 'tet' ? 2 : 3;
      let upperCap = cftState.geom === 'tet' ? 3 : 2;
      const lower = Array(lowerCap).fill(0);
      const upper = Array(upperCap).fill(0);

      let rem = m.d;
      if (lowSpin) {
        // Önce alt orbitalleri tek tek, sonra çiftleyerek doldur
        for (let i = 0; i < lowerCap && rem > 0; i++) { lower[i]++; rem--; }
        for (let i = 0; i < lowerCap && rem > 0; i++) { lower[i]++; rem--; }
        for (let i = 0; i < upperCap && rem > 0; i++) { upper[i]++; rem--; }
        for (let i = 0; i < upperCap && rem > 0; i++) { upper[i]++; rem--; }
      } else {
        // Yüksek spin: önce alt tek, sonra üst tek, sonra alt çift, sonra üst çift
        for (let i = 0; i < lowerCap && rem > 0; i++) { lower[i]++; rem--; }
        for (let i = 0; i < upperCap && rem > 0; i++) { upper[i]++; rem--; }
        for (let i = 0; i < lowerCap && rem > 0; i++) { lower[i]++; rem--; }
        for (let i = 0; i < upperCap && rem > 0; i++) { upper[i]++; rem--; }
      }

      const nLower = lower.reduce((a, b) => a + b, 0);
      const nUpper = upper.reduce((a, b) => a + b, 0);
      const unpaired = lower.filter((x) => x === 1).length + upper.filter((x) => x === 1).length;
      const muEff = Math.sqrt(unpaired * (unpaired + 2));

      // CFSE (Oktahedral: -0.4 n_t2g + 0.6 n_eg; Tetrahedral: -0.6 n_e + 0.4 n_t2)
      const cfseUnit = cftState.geom === 'tet'
        ? -0.6 * nLower + 0.4 * nUpper
        : -0.4 * nLower + 0.6 * nUpper;
      const cfseKj = (cfseUnit * delta * 0.01196).toFixed(1);

      const lambdaMax = Math.max(360, Math.min(780, Math.round(1e7 / delta)));
      const compCol = complementaryColor(lambdaMax, m.d);

      cftHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">YARILMA ENERJİSİ (Δ vs P)</span>
          <b class="hud-val" style="color:var(--accent-2);">${delta.toLocaleString('tr-TR')} cm⁻¹</b>
          <small class="hud-sub">P = ${m.P.toLocaleString('tr-TR')} cm⁻¹ (${lowSpin ? 'Düşük Spin · Δ > P' : 'Yüksek Spin · Δ < P'})</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">ELEKTRONİK DİZİLİM & CFSE</span>
          <b class="hud-val">${cftState.geom === 'tet' ? `e^${nLower} t₂^${nUpper}` : `t₂g^${nLower} e_g^${nUpper}`}</b>
          <small class="hud-sub">CFSE = ${cfseUnit.toFixed(1)} Δ (${cfseKj} kJ/mol)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">MANYETİK MOMENT (μ_eff)</span>
          <b class="hud-val">${muEff.toFixed(2).replace('.', ',')} μ_B</b>
          <small class="hud-sub">${unpaired === 0 ? 'Diyamanyetik (n = 0)' : `Paramanyetik (${unpaired} eşleşmemiş e⁻)`}</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">d–d ABSORPSİYON & RENK</span>
          <b class="hud-val" style="color:${compCol.hex};">λ_max = ${lambdaMax} nm</b>
          <small class="hud-sub">Gözlenen: ${compCol.name}</small>
        </div>
      `;

      cftInfo.innerHTML = `
        <div class="lab-rx">
          <b>${m.ion} (3d^${m.d}) + ${lig.name} — ${lowSpin ? 'Düşük Spin (Low-Spin, Kuvvetli Alan)' : 'Yüksek Spin (High-Spin, Zayıf Alan)'} Kompleks</b>
          <span>Δ = h·c / λ_max bağıntısına göre kompleks ${lambdaMax} nm dalga boyundaki fotonları soğurur ve tamamlayıcı <b>${compCol.name}</b> renginde görünür.</span>
        </div>
      `;

      drawCftCanvas(m, lower, upper, delta, lambdaMax, compCol);
    }

    function drawCftCanvas(m, lower, upper, delta, lambdaMax, compCol) {
      const vp = prepareCanvas(cftCanvas, cftCtx, 820, 410);
      if (!vp) return;
      const { W, H } = vp;

      // SOL TARAF: d-Orbital Yarılma Diyagramı (Serbest İyon -> Küresel Alan -> Kristal Alan)
      const baryY = H * 0.50;
      const splitPx = Math.min(125, Math.max(45, (delta / 32000) * 125));
      const yUpper = baryY - splitPx * (cftState.geom === 'tet' ? 0.45 : 0.6);
      const yLower = baryY + splitPx * (cftState.geom === 'tet' ? 0.6 : 0.45);

      // Küresel alan (Barycenter) sol kutular
      cftCtx.strokeStyle = '#64748b';
      cftCtx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const bx = 36 + i * 24;
        cftCtx.beginPath();
        cftCtx.moveTo(bx, baryY);
        cftCtx.lineTo(bx + 18, baryY);
        cftCtx.stroke();
      }
      cftCtx.font = '11px JetBrains Mono, monospace';
      cftCtx.fillStyle = '#9aa7c2';
      cftCtx.textAlign = 'center';
      cftCtx.fillText(`Dejenere 3d^${m.d}`, 94, baryY + 20);

      // Kesikli bağlantı çizgileri ve Barycenter
      cftCtx.setLineDash([4, 4]);
      cftCtx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      cftCtx.beginPath();
      cftCtx.moveTo(156, baryY);
      cftCtx.lineTo(255, yUpper);
      cftCtx.moveTo(156, baryY);
      cftCtx.lineTo(255, yLower);
      cftCtx.moveTo(156, baryY);
      cftCtx.lineTo(395, baryY);
      cftCtx.stroke();
      cftCtx.setLineDash([]);

      // Üst ve Alt Orbital Seviyeleri
      function drawOrbRow(arr, y, label) {
        const startX = 270;
        arr.forEach((cnt, idx) => {
          const x = startX + idx * 42;
          cftCtx.strokeStyle = '#5b8cff';
          cftCtx.lineWidth = 3;
          cftCtx.beginPath();
          cftCtx.moveTo(x, y);
          cftCtx.lineTo(x + 30, y);
          cftCtx.stroke();

          cftCtx.fillStyle = '#fde047';
          cftCtx.font = '700 15px Inter, sans-serif';
          if (cnt === 1) cftCtx.fillText('↑', x + 15, y - 6);
          if (cnt === 2) cftCtx.fillText('↑↓', x + 15, y - 6);
        });
        cftCtx.font = '700 12px JetBrains Mono, monospace';
        cftCtx.fillStyle = '#e2e8f0';
        cftCtx.textAlign = 'left';
        cftCtx.fillText(label, startX + arr.length * 42 + 6, y + 4);
      }

      const upLbl = cftState.geom === 'tet' ? 't₂ (d_xy, d_xz, d_yz)' : 'e_g (d_z², d_x²−y²)';
      const lowLbl = cftState.geom === 'tet' ? 'e (d_z², d_x²−y²)' : 't₂g (d_xy, d_xz, d_yz)';
      drawOrbRow(upper, yUpper, upLbl);
      drawOrbRow(lower, yLower, lowLbl);

      // Δ ok işareti
      cftCtx.strokeStyle = '#3ddcc4';
      cftCtx.lineWidth = 1.8;
      cftCtx.beginPath();
      cftCtx.moveTo(235, yUpper + 4);
      cftCtx.lineTo(235, yLower - 4);
      cftCtx.stroke();
      cftCtx.fillStyle = '#3ddcc4';
      cftCtx.font = '700 11px JetBrains Mono, monospace';
      cftCtx.textAlign = 'right';
      cftCtx.fillText(`Δ = ${delta} cm⁻¹`, 228, baryY + 4);

      // SAĞ TARAF: Görünür Bölge UV-Vis d–d Absorpsiyon Spektrumu + Küvet Rengi
      const gx = Math.max(470, W * 0.56), gw = W - gx - 28, gy = 38, gh = H - 84;
      if (gw > 120) {
        cftCtx.fillStyle = 'rgba(6, 10, 22, 0.78)';
        cftCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        cftCtx.beginPath();
        cftCtx.roundRect(gx, gy, gw, gh, 10);
        cftCtx.fill();
        cftCtx.stroke();

        // Görünür spektrum gökkuşağı şeridi
        const specGrad = cftCtx.createLinearGradient(gx, 0, gx + gw, 0);
        specGrad.addColorStop(0, '#7e22ce');
        specGrad.addColorStop(0.22, '#2563eb');
        specGrad.addColorStop(0.45, '#10b981');
        specGrad.addColorStop(0.68, '#eab308');
        specGrad.addColorStop(1, '#ef4444');
        cftCtx.fillStyle = specGrad;
        cftCtx.fillRect(gx + 2, gy + gh - 8, gw - 4, 6);

        // Gauss d–d absorpsiyon bandı (380 .. 780 nm)
        cftCtx.strokeStyle = compCol.hex;
        cftCtx.lineWidth = 2.8;
        cftCtx.beginPath();
        for (let i = 0; i <= gw; i++) {
          const wl = 380 + (i / gw) * 400;
          const d = (wl - lambdaMax) / 48;
          const abs = Math.exp(-d * d);
          const x = gx + i;
          const y = gy + gh - 12 - abs * (gh * 0.72);
          if (i === 0) cftCtx.moveTo(x, y);
          else cftCtx.lineTo(x, y);
        }
        cftCtx.stroke();

        // Küvet Önizlemesi (Sağ Üst Köşe)
        cftCtx.fillStyle = compCol.hex + 'cc';
        cftCtx.strokeStyle = '#e2e8f0';
        cftCtx.lineWidth = 2;
        cftCtx.beginPath();
        cftCtx.roundRect(gx + gw - 66, gy + 14, 48, 64, 6);
        cftCtx.fill();
        cftCtx.stroke();

        cftCtx.font = '600 10.5px JetBrains Mono, monospace';
        cftCtx.fillStyle = '#fff';
        cftCtx.textAlign = 'center';
        cftCtx.fillText(`λ_max = ${lambdaMax} nm`, gx + gw / 2, gy + 24);
        cftCtx.fillStyle = '#9aa7c2';
        cftCtx.fillText('Dalga Boyu λ (380 – 780 nm) — UV-Vis d–d Spektrumu', gx + gw / 2, gy + gh + 22);
      }
    }

    cftMetalSel.addEventListener('change', () => { cftState.metal = cftMetalSel.value; updateCft(); });
    cftLigandSel.addEventListener('change', () => { cftState.ligand = cftLigandSel.value; updateCft(); });
    document.getElementById('cftGeomTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cgeom]');
      if (!b) return;
      cftState.geom = b.dataset.cgeom;
      document.querySelectorAll('#cftGeomTabs button').forEach((x) => x.classList.toggle('active', x === b));
      updateCft();
    });

    /* ------------------------------------------------------------------------
       6. KEMİNFORMATİK, RDKit DESKRİPTÖRLERİ & ADMET (K-Dense-AI)
       ------------------------------------------------------------------------ */
    const admetCanvas = document.getElementById('admetCanvas');
    const admetCtx = admetCanvas.getContext('2d');
    const admetHud = document.getElementById('admetHud');
    const admetInfo = document.getElementById('admetInfo');
    const admetSmilesIn = document.getElementById('admetSmiles');
    const admetRunBtn = document.getElementById('admetRunBtn');
    const admetDrugList = document.getElementById('admetDrugList');
    const admetRuleSummary = document.getElementById('admetRuleSummary');

    const CHEMBL_DRUGS = [
      { id: 'aspirin', name: 'Aspirin (Asetilsalisilik asit)', chembl: 'CHEMBL25', smiles: 'CC(=O)Oc1ccccc1C(=O)O', target: 'COX-1 / COX-2 İnhibitörü' },
      { id: 'caffeine', name: 'Kafein', chembl: 'CHEMBL113', smiles: 'Cn1cnc2c1c(=O)n(C)c(=O)n2C', target: 'Adenozin A2A Reseptör Antagonisti' },
      { id: 'ibuprofen', name: 'İbuprofen', chembl: 'CHEMBL521', smiles: 'CC(C)Cc1ccc(cc1)C(C)C(=O)O', target: 'NSAID Siklooksijenaz İnhibitörü' },
      { id: 'paracetamol', name: 'Parasetamol (Asetaminofen)', chembl: 'CHEMBL112', smiles: 'CC(=O)Nc1ccc(O)cc1', target: 'Merkezi Analjezik / Antipiretik' },
      { id: 'dopamine', name: 'Dopamin', chembl: 'CHEMBL59', smiles: 'NCCc1ccc(O)c(O)c1', target: 'D1–D5 Nörotransmitter Agonisti' },
      { id: 'diazepam', name: 'Diazepam', chembl: 'CHEMBL12', smiles: 'CN1C(=O)CN=C(c2ccccc2)c3cc(Cl)ccc13', target: 'GABA-A Reseptör Modülatörü (BBB+)' },
      { id: 'penicillin', name: 'Penisilin G (Benzilpenisilin)', chembl: 'CHEMBL29', smiles: 'CC1(C)SC2C(NC(=O)Cc3ccccc3)C(=O)N2C1C(=O)O', target: 'Bakteriyel PBP Transpeptidaz İnhibitörü' },
      { id: 'imatinib', name: 'İmatinib (Gleevec)', chembl: 'CHEMBL941', smiles: 'Cc1ccc(NC(=O)c2ccc(CN3CCN(C)CC3)cc2)cc1Nc4nccc(n4)c5cccnc5', target: 'BCR-ABL Tirozin Kinaz İnhibitörü' },
      { id: 'paclitaxel', name: 'Paklitaksel (Taxol — Ro5 İhlali)', chembl: 'CHEMBL428647', smiles: 'CC(=O)OC1C(=O)C2(C)C(O)CC3OCC3(OC(=O)C)C2C(OC(=O)c4ccccc4)C5(O)CC(OC(=O)C(O)C(NC(=O)c6ccccc6)c7ccccc7)C(=C1C5(C)C)C', target: 'Mikrotübül Stabilizatörü (Kemoterapötik)' },
    ];

    let activeDrugId = 'aspirin';

    function renderAdmetDrugs() {
      admetDrugList.innerHTML = CHEMBL_DRUGS.map((d) => `
        <button class="reagent-btn ${d.id === activeDrugId ? 'active' : ''}" data-drug="${d.id}">
          <span class="reagent-dot" style="background:#3ddcc4;"></span>
          <div>
            <b>${d.name} <small style="color:var(--accent);">[${d.chembl}]</small></b>
            <small>${d.target}</small>
          </div>
        </button>
      `).join('');
    }
    renderAdmetDrugs();

    // RDKit-benzeri SMILES atomik katkı ve topolojik deskriptör hesaplayıcı
    function parseSmilesDescriptors(rawSmiles) {
      const s = (rawSmiles || '').trim();
      if (!s) return null;

      let C = 0, c_arom = 0, N = 0, n_arom = 0, O = 0, S = 0, P = 0, F = 0, Cl = 0, Br = 0, I = 0;
      let doubleBonds = 0, tripleBonds = 0, ringDigits = 0;

      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const next = s[i + 1] || '';
        if (ch === 'C' && next === 'l') { Cl++; i++; continue; }
        if (ch === 'B' && next === 'r') { Br++; i++; continue; }
        if (ch === 'C') C++;
        else if (ch === 'c') { C++; c_arom++; }
        else if (ch === 'N') N++;
        else if (ch === 'n') { N++; n_arom++; }
        else if (ch === 'O' || ch === 'o') O++;
        else if (ch === 'S' || ch === 's') S++;
        else if (ch === 'P' || ch === 'p') P++;
        else if (ch === 'F') F++;
        else if (ch === 'I') I++;
        else if (ch === '=') doubleBonds++;
        else if (ch === '#') tripleBonds++;
        else if (ch >= '1' && ch <= '9') ringDigits++;
      }

      const rings = Math.floor(ringDigits / 2);
      const heavyAtoms = C + N + O + S + P + F + Cl + Br + I;
      const unsat = rings + doubleBonds + 2 * tripleBonds + Math.floor((c_arom + n_arom) / 2);
      const estH = Math.max(0, 2 * C + 2 + N - (F + Cl + Br + I) - 2 * unsat);
      const mw = C * 12.011 + estH * 1.008 + N * 14.007 + O * 15.999 + S * 32.06 + P * 30.974 + F * 18.998 + Cl * 35.45 + Br * 79.904 + I * 126.90;

      // H-Bağı Donörleri (OH, NH) ve Akseptörleri (N + O)
      const ohMatches = (s.match(/O(?![=cC\(])/g) || []).length + (s.match(/\(=O\)O(?!c|C)/g) || []).length;
      const nhMatches = (s.match(/N(?![=c1-9\(])/g) || []).length + (s.match(/NC\(=O\)/g) || []).length;
      const hbd = Math.min(N + O, Math.max(0, Math.round((ohMatches + nhMatches) * 0.75)));
      const hba = N + O;

      // Ertl TPSA (Topolojik Polar Yüzey Alanı, Å²) yaklaşımı
      const tpsa = +(O * 18.4 + N * 15.6 + hbd * 8.2 + S * 25.3 + P * 9.8).toFixed(1);

      // Wildman-Crippen cLogP yaklaşımı
      const cSp3 = Math.max(0, C - c_arom - doubleBonds);
      const fsp3 = C > 0 ? +(cSp3 / C).toFixed(2) : 0;
      const clogp = +(C * 0.42 - O * 0.92 - N * 0.78 + Cl * 0.68 + Br * 0.84 + F * 0.22 + S * 0.35 - hbd * 0.32).toFixed(2);

      // Dönüşebilir bağlar (Rotatable Bonds)
      const rotB = Math.max(0, Math.round(cSp3 * 0.65 + O * 0.4 + N * 0.3 - rings * 0.8));

      // Lipinski Rule of 5 (Ro5) İhlalleri
      let ro5Violations = 0;
      if (mw > 500) ro5Violations++;
      if (clogp > 5.0) ro5Violations++;
      if (hbd > 5) ro5Violations++;
      if (hba > 10) ro5Violations++;

      // Veber Kuralı (TPSA <= 140 & RotB <= 10)
      const veberOk = tpsa <= 140 && rotB <= 10;

      // Kan-Beyin Bariyeri (BBB) & GI Emilim (BOILED-Egg modeli)
      const giHigh = tpsa <= 131.6 && clogp >= -2.3 && clogp <= 6.8;
      const bbbPerm = tpsa <= 79.0 && clogp >= 0.4 && clogp <= 6.0;

      // QED (Quantitative Estimate of Drug-Likeness, 0..1)
      const qedPenalty = (ro5Violations * 0.22) + (veberOk ? 0 : 0.18) + Math.max(0, (Math.abs(mw - 320) / 600) * 0.25);
      const qed = Math.max(0.08, Math.min(0.96, +(0.92 - qedPenalty).toFixed(2)));

      return { mw, heavyAtoms, rings, fsp3, clogp, tpsa, hbd, hba, rotB, ro5Violations, veberOk, giHigh, bbbPerm, qed };
    }

    function updateAdmet() {
      const smiles = admetSmilesIn.value;
      const d = parseSmilesDescriptors(smiles);
      if (!d) return;

      const matchedDrug = CHEMBL_DRUGS.find((x) => x.smiles === smiles.trim());
      const titleStr = matchedDrug ? `${matchedDrug.name} (${matchedDrug.chembl})` : 'Özel SMILES Molekülü';

      admetHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">MOL KÜTLESİ & Fsp³</span>
          <b class="hud-val">${d.mw.toFixed(1).replace('.', ',')} Da</b>
          <small class="hud-sub">${d.heavyAtoms} ağır atom · Fsp³ = ${d.fsp3}</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">LİPOFİLİSİTE (cLogP)</span>
          <b class="hud-val" style="color:${d.clogp <= 5 ? '#3ddcc4' : '#ff7a6b'};">${d.clogp.toFixed(2).replace('.', ',')}</b>
          <small class="hud-sub">Wildman-Crippen oktanol/su (≤ 5,0)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">POLAR YÜZEY ALANI (TPSA)</span>
          <b class="hud-val" style="color:${d.tpsa <= 140 ? '#5b8cff' : '#ff7a6b'};">${d.tpsa.toFixed(1).replace('.', ',')} Å²</b>
          <small class="hud-sub">HBD: ${d.hbd} · HBA: ${d.hba} · RotB: ${d.rotB}</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">İLAÇ-BENZERLİĞİ (QED & Ro5)</span>
          <b class="hud-val" style="color:${d.ro5Violations <= 1 ? '#3ddcc4' : '#ff7a6b'};">QED = ${d.qed}</b>
          <small class="hud-sub">Lipinski İhlali: ${d.ro5Violations} / 4</small>
        </div>
      `;

      admetRuleSummary.innerHTML = `
        <div class="tit-stat"><span>Lipinski 5’li Kuralı (Ro5)</span><b style="color:${d.ro5Violations <= 1 ? '#3ddcc4' : '#ff7a6b'};">${d.ro5Violations === 0 ? '✓ Tam Uyumlu (0 İhlal)' : d.ro5Violations === 1 ? '⚠ Kabul Edilebilir (1 İhlal)' : `✗ Uyumsuz (${d.ro5Violations} İhlal)`}</b></div>
        <div class="tit-stat"><span>Veber Oral Biyoyararlanım</span><b style="color:${d.veberOk ? '#3ddcc4' : '#ff7a6b'};">${d.veberOk ? '✓ Yüksek (TPSA ≤ 140)' : '✗ Düşük'}</b></div>
        <div class="tit-stat"><span>Gastrointestinal (GI) Emilim</span><b>${d.giHigh ? 'Yüksek (BOILED-Egg Akı)' : 'Düşük'}</b></div>
        <div class="tit-stat"><span>Kan-Beyin Bariyeri (BBB)</span><b style="color:${d.bbbPerm ? '#fde047' : '#9aa7c2'};">${d.bbbPerm ? 'Geçebilir (SSS Aktif — Sarı Bölge)' : 'Geçemez (Periferik)'}</b></div>
      `;

      admetInfo.innerHTML = `
        <div class="lab-rx">
          <b>${titleStr} — RDKit / SwissADME Fizikokimyasal & Farmakokinetik Profili</b>
          <span>Solda 6 eksenli <b>Biyoyararlanım Radarı</b> (pembe poligon = ideal oral ilaç bölgesi), sağda ise <b>BOILED-Egg</b> diyagramı (Beyaz elips: Pasif GI emilimi, Sarı yumurta sarısı: Kan-Beyin Bariyeri geçişi) gösterilmektedir.</span>
        </div>
      `;

      drawAdmetCanvas(d, titleStr);
    }

    function drawAdmetCanvas(d, titleStr) {
      const vp = prepareCanvas(admetCanvas, admetCtx, 780, 410);
      if (!vp) return;
      const { W, H } = vp;

      // SOL PANEL: 6 Eksenli SwissADME Biyoyararlanım Radarı
      const rCx = W * 0.26, rCy = H * 0.50, maxR = Math.min(135, H * 0.36);
      const axes = [
        { lbl: 'LIPO (cLogP)', norm: Math.max(0.1, Math.min(1.2, (d.clogp + 1) / 6)) },
        { lbl: 'BOYUT (MW)', norm: Math.max(0.1, Math.min(1.2, d.mw / 500)) },
        { lbl: 'POLAR (TPSA)', norm: Math.max(0.1, Math.min(1.2, d.tpsa / 140)) },
        { lbl: 'ÇÖZÜNME', norm: Math.max(0.1, Math.min(1.2, (d.clogp + 2) / 7)) },
        { lbl: 'DOYMAMIŞ (1−Fsp³)', norm: Math.max(0.1, Math.min(1.2, 1 - d.fsp3)) },
        { lbl: 'ESNEKLİK (RotB)', norm: Math.max(0.1, Math.min(1.2, d.rotB / 10)) },
      ];

      // İdeal Pembe Bölge (0.20 .. 0.85)
      admetCtx.fillStyle = 'rgba(244, 114, 182, 0.18)';
      admetCtx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
      admetCtx.lineWidth = 1.5;
      admetCtx.beginPath();
      axes.forEach((_, idx) => {
        const ang = (idx * Math.PI * 2) / 6 - Math.PI / 2;
        const x = rCx + Math.cos(ang) * (maxR * 0.82);
        const y = rCy + Math.sin(ang) * (maxR * 0.82);
        if (idx === 0) admetCtx.moveTo(x, y);
        else admetCtx.lineTo(x, y);
      });
      admetCtx.closePath();
      admetCtx.fill();
      admetCtx.stroke();

      // Radar Eksen Çizgileri
      admetCtx.font = '600 10.5px JetBrains Mono, monospace';
      admetCtx.fillStyle = '#cbd5e1';
      admetCtx.textAlign = 'center';
      axes.forEach((ax, idx) => {
        const ang = (idx * Math.PI * 2) / 6 - Math.PI / 2;
        const x = rCx + Math.cos(ang) * maxR;
        const y = rCy + Math.sin(ang) * maxR;
        admetCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        admetCtx.beginPath();
        admetCtx.moveTo(rCx, rCy);
        admetCtx.lineTo(x, y);
        admetCtx.stroke();
        admetCtx.fillText(ax.lbl, rCx + Math.cos(ang) * (maxR + 22), rCy + Math.sin(ang) * (maxR + 16));
      });

      // Molekülün Kendi Poligonu
      admetCtx.fillStyle = 'rgba(61, 220, 196, 0.28)';
      admetCtx.strokeStyle = '#3ddcc4';
      admetCtx.lineWidth = 2.6;
      admetCtx.beginPath();
      axes.forEach((ax, idx) => {
        const ang = (idx * Math.PI * 2) / 6 - Math.PI / 2;
        const r = ax.norm * (maxR * 0.82);
        const x = rCx + Math.cos(ang) * r;
        const y = rCy + Math.sin(ang) * r;
        if (idx === 0) admetCtx.moveTo(x, y);
        else admetCtx.lineTo(x, y);
      });
      admetCtx.closePath();
      admetCtx.fill();
      admetCtx.stroke();

      // SAĞ PANEL: BOILED-Egg Diyagramı (WLogP vs TPSA)
      const bx = W * 0.54, bw = W - bx - 30, by = 36, bh = H - 78;
      if (bw > 120) {
        admetCtx.fillStyle = 'rgba(6, 10, 22, 0.82)';
        admetCtx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
        admetCtx.beginPath();
        admetCtx.roundRect(bx, by, bw, bh, 12);
        admetCtx.fill();
        admetCtx.stroke();

        // Yumurta Akı (HIA — Gastrointestinal Emilim: TPSA 0..132, LogP -2.3..6.8)
        const eggCx = bx + bw * 0.44, eggCy = by + bh * 0.54;
        admetCtx.fillStyle = 'rgba(248, 250, 252, 0.90)';
        admetCtx.beginPath();
        admetCtx.ellipse(eggCx, eggCy, bw * 0.34, bh * 0.36, -0.15, 0, Math.PI * 2);
        admetCtx.fill();

        // Yumurta Sarısı (BBB — Kan-Beyin Bariyeri: TPSA 0..79, LogP 0.4..6.0)
        const yolkCx = bx + bw * 0.30, yolkCy = by + bh * 0.48;
        admetCtx.fillStyle = 'rgba(250, 204, 21, 0.88)';
        admetCtx.beginPath();
        admetCtx.ellipse(yolkCx, yolkCy, bw * 0.18, bh * 0.22, 0, 0, Math.PI * 2);
        admetCtx.fill();

        // Molekülün Konumu (X: TPSA 0..200, Y: LogP -3..8)
        const mx = bx + Math.max(0.05, Math.min(0.95, d.tpsa / 195)) * bw;
        const my = by + bh - Math.max(0.06, Math.min(0.94, (d.clogp + 3) / 11)) * bh;

        admetCtx.beginPath();
        admetCtx.arc(mx, my, 8, 0, Math.PI * 2);
        admetCtx.fillStyle = '#2563eb';
        admetCtx.strokeStyle = '#fff';
        admetCtx.lineWidth = 2.5;
        admetCtx.fill();
        admetCtx.stroke();

        admetCtx.font = '700 11px JetBrains Mono, monospace';
        admetCtx.fillStyle = '#0f172a';
        admetCtx.textAlign = 'center';
        admetCtx.fillText('BBB (Beyin)', yolkCx, yolkCy + 4);
        admetCtx.fillText('HIA (GI Emilim)', eggCx + bw * 0.14, eggCy + 12);

        admetCtx.fillStyle = '#9aa7c2';
        admetCtx.fillText('BOILED-Egg Haritası — X: TPSA (0–200 Å²) · Y: WLogP (−3 .. +8)', bx + bw / 2, by + bh + 22);
      }
    }

    admetRunBtn.addEventListener('click', () => {
      activeDrugId = '';
      renderAdmetDrugs();
      updateAdmet();
    });
    admetSmilesIn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        activeDrugId = '';
        renderAdmetDrugs();
        updateAdmet();
      }
    });
    admetDrugList.addEventListener('click', (e) => {
      const b = e.target.closest('[data-drug]');
      if (!b) return;
      const dr = CHEMBL_DRUGS.find((x) => x.id === b.dataset.drug);
      if (!dr) return;
      activeDrugId = dr.id;
      admetSmilesIn.value = dr.smiles;
      renderAdmetDrugs();
      updateAdmet();
    });

    /* ------------------------------------------------------------------------
       7. BİLİMSEL DİYAGRAMLAR & LATEX/TIKZ ÜRETİCİ (janosh/diagrams)
       ------------------------------------------------------------------------ */
    const diagCanvas = document.getElementById('diagCanvas');
    const diagCtx = diagCanvas.getContext('2d');
    const diagHud = document.getElementById('diagHud');
    const diagInfo = document.getElementById('diagInfo');
    const diagList = document.getElementById('diagList');
    const diagP1 = document.getElementById('diagP1');
    const diagP2 = document.getElementById('diagP2');
    const diagP1Lbl = document.getElementById('diagP1Lbl');
    const diagP2Lbl = document.getElementById('diagP2Lbl');
    const diagP1Val = document.getElementById('diagP1Val');
    const diagP2Val = document.getElementById('diagP2Val');
    const diagTikzBox = document.getElementById('diagTikzBox');

    const diagState = {
      type: 'lj', // 'lj' | 'mb' | 'carnot' | 'vdw'
    };

    function generateTikzCode(type, p1, p2) {
      if (type === 'lj') {
        const eps = (p1 / 25).toFixed(2);
        const sig = (0.8 + p2 / 100).toFixed(2);
        return `\\begin{tikzpicture}
  \\begin{axis}[
    xlabel={$r$ (\\AA)}, ylabel={$V(r)$ (eV)},
    domain=${(sig * 0.88).toFixed(2)}:4.2, samples=200,
    ymin=-${(eps * 1.25).toFixed(2)}, ymax=${(eps * 1.5).toFixed(2)}, grid=both
  ]
    % Lennard-Jones 12-6 Potansiyeli (janosh/diagrams stili)
    \\addplot[thick, teal] {4*${eps}*((${sig}/x)^12 - (${sig}/x)^6)};
    \\addplot[dashed, red]  {4*${eps}*(${sig}/x)^12};
    \\addplot[dashed, blue] {-4*${eps}*(${sig}/x)^6};
  \\end{axis}
\\end{tikzpicture}`;
      }
      if (type === 'mb') {
        const T = Math.round(150 + p1 * 12);
        const M = Math.round(4 + p2 * 0.8);
        return `\\begin{tikzpicture}
  \\begin{axis}[
    xlabel={Hız $v$ (m/s)}, ylabel={Olasılık $f(v)$},
    domain=0:2200, samples=160, grid=both,
    title={Maxwell-Boltzmann ($T=${T}$ K, $M=${M}$ g/mol)}
  ]
    \\addplot[ultra thick, blue] {x^2 * exp(-${M}*x^2 / (2*8314*${T}))};
  \\end{axis}
\\end{tikzpicture}`;
      }
      if (type === 'carnot') {
        const TH = Math.round(400 + p1 * 6);
        const TC = Math.round(200 + p2 * 2);
        return `\\begin{tikzpicture}
  % Carnot Çevrimi P-V Diyagramı (T_H = ${TH} K, T_C = ${TC} K)
  \\begin{axis}[xlabel={$V$}, ylabel={$P$}, domain=1:4]
    \\addplot[thick, red, domain=1:2.2]   {${TH}/x};
    \\addplot[thick, orange, domain=2.2:3.4] {${TH}*2.2^0.67 / x^1.67};
    \\addplot[thick, cyan, domain=1.5:3.4] {${TC}/x};
  \\end{axis}
\\end{tikzpicture}`;
      }
      return `\\begin{tikzpicture}
  % Van der Waals İzotermleri (P + a/V^2)(V - b) = RT
  \\begin{axis}[xlabel={$V_m$}, ylabel={$P$}, domain=0.45:4, samples=180]
    \\addplot[thick, magenta] {(${(0.75 + p1 / 120).toFixed(2)}/(x - 0.33)) - (1.125/x^2)};
  \\end{axis}
\\end{tikzpicture}`;
    }

    function updateDiag() {
      const p1 = parseFloat(diagP1.value);
      const p2 = parseFloat(diagP2.value);

      const vp = prepareCanvas(diagCanvas, diagCtx, 760, 410);
      if (!vp) return;
      const { W, H } = vp;
      const padL = 58, padR = 32, padT = 32, padB = 44;
      const pw = W - padL - padR, ph = H - padT - padB;

      diagTikzBox.textContent = generateTikzCode(diagState.type, p1, p2);

      if (diagState.type === 'lj') {
        const eps = 0.5 + (p1 / 100) * 2.5; // eV
        const sig = 1.1 + (p2 / 100) * 1.4; // Å
        const rm = sig * Math.pow(2, 1 / 6);
        diagP1Lbl.textContent = 'Bağ Kuyusu Derinliği (ε)';
        diagP1Val.textContent = `${eps.toFixed(2)} eV`;
        diagP2Lbl.textContent = 'Çarpışma Çapı (σ)';
        diagP2Val.textContent = `${sig.toFixed(2)} Å`;

        diagHud.innerHTML = `
          <div class="hud-card"><span class="hud-lbl">DENGE BAĞ UZUNLUĞU (r_m)</span><b class="hud-val" style="color:#3ddcc4;">${rm.toFixed(2)} Å</b><small class="hud-sub">r_m = 2^(1/6)·σ</small></div>
          <div class="hud-card"><span class="hud-lbl">AYRIŞMA ENERJİSİ (D_e = ε)</span><b class="hud-val">${eps.toFixed(2)} eV</b><small class="hud-sub">${(eps * 96.485).toFixed(0)} kJ/mol</small></div>
          <div class="hud-card"><span class="hud-lbl">PAULI İTMESİ</span><b class="hud-val">∝ (σ/r)¹²</b><small class="hud-sub">Kısa mesafe bulut örtüşmesi</small></div>
          <div class="hud-card"><span class="hud-lbl">LONDON DİSPERSİYON</span><b class="hud-val">∝ −(σ/r)⁶</b><small class="hud-sub">İndüklenmiş dipol çekimi</small></div>
        `;
        diagInfo.innerHTML = `<div class="lab-rx"><b>Lennard-Jones (12-6) Atomlararası Potansiyeli: V(r) = 4ε·[(σ/r)¹² − (σ/r)⁶]</b><span>Kuyunun içindeki yatay çizgiler anharmonik kuantum titreşim enerji seviyelerini (v = 0, 1, 2, 3) ve sıfır-noktası enerjisini (ZPE) temsil eder.</span></div>`;

        const yZero = padT + ph * 0.42;
        const rMin = sig * 0.82, rMax = sig * 3.1;
        const rToX = (r) => padL + ((r - rMin) / (rMax - rMin)) * pw;
        const vToY = (v) => yZero - (v / (eps * 1.4)) * (ph * 0.52);

        // V = 0 ekseni
        diagCtx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        diagCtx.beginPath();
        diagCtx.moveTo(padL, yZero);
        diagCtx.lineTo(padL + pw, yZero);
        diagCtx.stroke();

        // Çekici (-r^-6) ve İtici (+r^-12) bileşenler (kesikli)
        const plotFn = (fn, col, dash) => {
          diagCtx.strokeStyle = col;
          diagCtx.lineWidth = dash ? 1.5 : 3.0;
          diagCtx.setLineDash(dash ? [5, 5] : []);
          diagCtx.beginPath();
          let started = false;
          for (let i = 0; i <= 240; i++) {
            const r = rMin + (i / 240) * (rMax - rMin);
            const v = fn(r);
            const x = rToX(r), y = vToY(v);
            if (y < padT || y > padT + ph) continue;
            if (!started) { diagCtx.moveTo(x, y); started = true; }
            else diagCtx.lineTo(x, y);
          }
          diagCtx.stroke();
          diagCtx.setLineDash([]);
        };

        plotFn((r) => 4 * eps * Math.pow(sig / r, 12), 'rgba(255, 122, 107, 0.65)', true);
        plotFn((r) => -4 * eps * Math.pow(sig / r, 6), 'rgba(91, 140, 255, 0.65)', true);
        plotFn((r) => 4 * eps * (Math.pow(sig / r, 12) - Math.pow(sig / r, 6)), '#3ddcc4', false);

        // Titreşim seviyeleri (v = 0, 1, 2, 3)
        [0.82, 0.58, 0.36, 0.18].forEach((f, vIdx) => {
          const vE = -eps * f;
          const y = vToY(vE);
          diagCtx.strokeStyle = 'rgba(250, 204, 21, 0.65)';
          diagCtx.lineWidth = 1.4;
          diagCtx.beginPath();
          diagCtx.moveTo(rToX(rm * (0.94 - vIdx * 0.02)), y);
          diagCtx.lineTo(rToX(rm * (1.12 + vIdx * 0.09)), y);
          diagCtx.stroke();
        });

        diagCtx.fillStyle = '#fde047';
        diagCtx.font = '700 11px JetBrains Mono, monospace';
        diagCtx.textAlign = 'center';
        diagCtx.fillText(`r_m = ${rm.toFixed(2)} Å (−ε)`, rToX(rm), vToY(-eps) + 18);
      } else if (diagState.type === 'mb') {
        const T = Math.round(150 + p1 * 12); // K
        const M = Math.round(4 + p2 * 0.8);  // g/mol
        diagP1Lbl.textContent = 'Mutlak Sıcaklık (T)';
        diagP1Val.textContent = `${T} K`;
        diagP2Lbl.textContent = 'Gaz Mol Kütlesi (M)';
        diagP2Val.textContent = `${M} g/mol`;

        const R = 8.31446;
        const Mkg = M / 1000;
        const vp = Math.sqrt((2 * R * T) / Mkg);
        const vavg = Math.sqrt((8 * R * T) / (Math.PI * Mkg));
        const vrms = Math.sqrt((3 * R * T) / Mkg);

        diagHud.innerHTML = `
          <div class="hud-card"><span class="hud-lbl">EN OLASI HIZ (v_p)</span><b class="hud-val" style="color:#3ddcc4;">${vp.toFixed(0)} m/s</b><small class="hud-sub">√(2RT / M) — Tepe noktası</small></div>
          <div class="hud-card"><span class="hud-lbl">ORTALAMA HIZ (⟨v⟩)</span><b class="hud-val" style="color:#fde047;">${vavg.toFixed(0)} m/s</b><small class="hud-sub">√(8RT / πM) = 1,128·v_p</small></div>
          <div class="hud-card"><span class="hud-lbl">KAREKÖK ORT. HIZ (v_rms)</span><b class="hud-val" style="color:#ff7a6b;">${vrms.toFixed(0)} m/s</b><small class="hud-sub">√(3RT / M) = 1,225·v_p</small></div>
          <div class="hud-card"><span class="hud-lbl">ORT. KİNETİK ENERJİ</span><b class="hud-val">${((1.5 * R * T) / 1000).toFixed(2)} kJ/mol</b><small class="hud-sub">E_k = (3/2)RT</small></div>
        `;
        diagInfo.innerHTML = `<div class="lab-rx"><b>Maxwell-Boltzmann Hız Dağılımı: f(v) = 4π·(M / 2πRT)^(3/2) · v² · exp(−Mv² / 2RT)</b><span>Sıcaklık (T) arttıkça veya mol kütlesi (M) küçüldükçe dağılım sağa kayar ve genişler; eğrinin altındaki toplam alan daima 1’dir.</span></div>`;

        const vMax = 2600;
        const a = Mkg / (2 * R * T);
        const f = (v) => 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * v * v * Math.exp(-a * v * v);
        const fPeak = f(vp) || 1e-4;
        const vToX = (v) => padL + (v / vMax) * pw;
        const fToY = (fv) => padT + ph - (fv / (fPeak * 1.15)) * ph;

        diagCtx.strokeStyle = '#5b8cff';
        diagCtx.fillStyle = 'rgba(91, 140, 255, 0.18)';
        diagCtx.lineWidth = 2.8;
        diagCtx.beginPath();
        diagCtx.moveTo(padL, padT + ph);
        for (let i = 0; i <= 220; i++) {
          const v = (i / 220) * vMax;
          diagCtx.lineTo(vToX(v), fToY(f(v)));
        }
        diagCtx.lineTo(padL + pw, padT + ph);
        diagCtx.closePath();
        diagCtx.fill();
        diagCtx.stroke();

        // 3 Karakteristik Hız Çizgisi (v_p, <v>, v_rms)
        [
          { v: vp, c: '#3ddcc4', lbl: 'v_p' },
          { v: vavg, c: '#fde047', lbl: '⟨v⟩' },
          { v: vrms, c: '#ff7a6b', lbl: 'v_rms' },
        ].forEach((sp, idx) => {
          const x = vToX(sp.v), y = fToY(f(sp.v));
          diagCtx.strokeStyle = sp.c;
          diagCtx.lineWidth = 1.8;
          diagCtx.setLineDash([4, 4]);
          diagCtx.beginPath();
          diagCtx.moveTo(x, padT + ph);
          diagCtx.lineTo(x, y);
          diagCtx.stroke();
          diagCtx.setLineDash([]);
          diagCtx.fillStyle = sp.c;
          diagCtx.font = '700 11px JetBrains Mono, monospace';
          diagCtx.fillText(`${sp.lbl}`, x + (idx - 1) * 18, y - 8);
        });
      } else if (diagState.type === 'carnot') {
        const TH = Math.round(450 + p1 * 5.5); // K
        const TC = Math.round(220 + p2 * 1.8); // K
        const eta = 1 - TC / TH;
        const QH = (8.314 * TH * Math.log(2.2)) / 1000;
        const Wout = QH * eta;

        diagP1Lbl.textContent = 'Sıcak Kaynak (T_H)';
        diagP1Val.textContent = `${TH} K`;
        diagP2Lbl.textContent = 'Soğuk Kaynak (T_C)';
        diagP2Val.textContent = `${TC} K`;

        diagHud.innerHTML = `
          <div class="hud-card"><span class="hud-lbl">CARNOT VERİMİ (η_max)</span><b class="hud-val" style="color:#3ddcc4;">%${(eta * 100).toFixed(1)}</b><small class="hud-sub">η = 1 − T_C / T_H</small></div>
          <div class="hud-card"><span class="hud-lbl">ALINAN ISI (Q_H)</span><b class="hud-val" style="color:#ff7a6b;">+${QH.toFixed(2)} kJ/mol</b><small class="hud-sub">1→2 İzotermal Genleşme</small></div>
          <div class="hud-card"><span class="hud-lbl">NET İŞ (|W| = ∮P dV)</span><b class="hud-val" style="color:#fde047;">${Wout.toFixed(2)} kJ/mol</b><small class="hud-sub">T–S dikdörtgen alanı</small></div>
          <div class="hud-card"><span class="hud-lbl">ENTROPİ DEĞİŞİMİ (∮dS)</span><b class="hud-val">0,00 J/(mol·K)</b><small class="hud-sub">Tersinir hal fonksiyonu</small></div>
        `;
        diagInfo.innerHTML = `<div class="lab-rx"><b>Carnot Çevrimi: İki İzotermal (1→2, 3→4) ve İki Adyabatik (2→3, 4→1) Tersinir Basamak</b><span>Solda P–V diyagramındaki kapalı çevrim alanı net işi (W), sağda ise T–S diyagramındaki kusursuz Carnot dikdörtgeni gösterilmektedir.</span></div>`;

        // SOL: P-V Diyagramı
        const lx = padL, lw = pw * 0.46;
        diagCtx.strokeStyle = 'rgba(148,163,184,0.3)';
        diagCtx.strokeRect(lx, padT, lw, ph);

        const p1Pt = [lx + lw * 0.16, padT + ph * 0.16];
        const p2Pt = [lx + lw * 0.56, padT + ph * 0.42];
        const p3Pt = [lx + lw * 0.86, padT + ph * 0.82];
        const p4Pt = [lx + lw * 0.36, padT + ph * 0.62];

        diagCtx.fillStyle = 'rgba(245, 159, 0, 0.16)';
        diagCtx.beginPath();
        diagCtx.moveTo(...p1Pt);
        diagCtx.quadraticCurveTo(lx + lw * 0.32, padT + ph * 0.36, ...p2Pt);
        diagCtx.quadraticCurveTo(lx + lw * 0.68, padT + ph * 0.68, ...p3Pt);
        diagCtx.quadraticCurveTo(lx + lw * 0.58, padT + ph * 0.78, ...p4Pt);
        diagCtx.quadraticCurveTo(lx + lw * 0.24, padT + ph * 0.42, ...p1Pt);
        diagCtx.fill();

        diagCtx.lineWidth = 2.8;
        diagCtx.strokeStyle = '#ff7a6b';
        diagCtx.beginPath(); diagCtx.moveTo(...p1Pt); diagCtx.quadraticCurveTo(lx + lw * 0.32, padT + ph * 0.36, ...p2Pt); diagCtx.stroke();
        diagCtx.strokeStyle = '#fde047';
        diagCtx.beginPath(); diagCtx.moveTo(...p2Pt); diagCtx.quadraticCurveTo(lx + lw * 0.68, padT + ph * 0.68, ...p3Pt); diagCtx.stroke();
        diagCtx.strokeStyle = '#38bdf8';
        diagCtx.beginPath(); diagCtx.moveTo(...p3Pt); diagCtx.quadraticCurveTo(lx + lw * 0.58, padT + ph * 0.78, ...p4Pt); diagCtx.stroke();
        diagCtx.strokeStyle = '#a855f7';
        diagCtx.beginPath(); diagCtx.moveTo(...p4Pt); diagCtx.quadraticCurveTo(lx + lw * 0.24, padT + ph * 0.42, ...p1Pt); diagCtx.stroke();

        diagCtx.font = '700 11px JetBrains Mono, monospace';
        diagCtx.fillStyle = '#fff';
        diagCtx.fillText('1 (T_H)', p1Pt[0] + 10, p1Pt[1] - 6);
        diagCtx.fillText('2', p2Pt[0] + 10, p2Pt[1]);
        diagCtx.fillText('3 (T_C)', p3Pt[0] - 10, p3Pt[1] + 14);
        diagCtx.fillText('4', p4Pt[0] - 12, p4Pt[1] + 4);
        diagCtx.fillStyle = '#9aa7c2';
        diagCtx.textAlign = 'center';
        diagCtx.fillText('P–V Diyagramı (W = ∮ P dV)', lx + lw / 2, padT + ph + 24);

        // SAĞ: T-S Diyagramı (Dikdörtgen)
        const rx = padL + pw * 0.54, rw = pw * 0.46;
        diagCtx.strokeStyle = 'rgba(148,163,184,0.3)';
        diagCtx.strokeRect(rx, padT, rw, ph);

        const yTH = padT + ph - ((TH - 150) / 900) * ph;
        const yTC = padT + ph - ((TC - 150) / 900) * ph;
        const xS1 = rx + rw * 0.22, xS2 = rx + rw * 0.78;

        diagCtx.fillStyle = 'rgba(61, 220, 196, 0.20)';
        diagCtx.strokeStyle = '#3ddcc4';
        diagCtx.lineWidth = 2.8;
        diagCtx.fillRect(xS1, yTH, xS2 - xS1, yTC - yTH);
        diagCtx.strokeRect(xS1, yTH, xS2 - xS1, yTC - yTH);

        diagCtx.fillStyle = '#fff';
        diagCtx.fillText(`T_H = ${TH} K`, (xS1 + xS2) / 2, yTH - 8);
        diagCtx.fillText(`T_C = ${TC} K`, (xS1 + xS2) / 2, yTC + 16);
        diagCtx.fillText(`W = Q_H − |Q_C| (η = %${(eta * 100).toFixed(0)})`, (xS1 + xS2) / 2, (yTH + yTC) / 2 + 4);
        diagCtx.fillStyle = '#9aa7c2';
        diagCtx.fillText('T–S Diyagramı (İzentropik & İzotermal)', rx + rw / 2, padT + ph + 24);
      } else {
        // Van der Waals İzotermleri (P_r vs V_r indirgenmiş değişkenler)
        const Tr = +(0.82 + (p1 / 100) * 0.38).toFixed(2);
        diagP1Lbl.textContent = 'İndirgenmiş Sıcaklık (T_r = T/T_c)';
        diagP1Val.textContent = `${Tr} T_c`;
        diagP2Lbl.textContent = 'Moleküllerarası Çekim (a)';
        diagP2Val.textContent = `${(1.0 + p2 / 50).toFixed(2)} L²·bar/mol²`;

        diagHud.innerHTML = `
          <div class="hud-card"><span class="hud-lbl">AKTİF İZOTERM (T / T_c)</span><b class="hud-val" style="color:#f472b6;">T_r = ${Tr}</b><small class="hud-sub">${Tr < 1 ? 'Kritik altı (Sıvı+Gaz dengesi)' : Tr === 1 ? 'Kritik İzoterm (T = T_c)' : 'Süperkritik Akışkan (T > T_c)'}</small></div>
          <div class="hud-card"><span class="hud-lbl">KRİTİK SIKIŞTIRILABİLİRLİK</span><b class="hud-val">Z_c = 3/8 = 0,375</b><small class="hud-sub">Evrensel VdW sabiti</small></div>
          <div class="hud-card"><span class="hud-lbl">KRİTİK HACİM (V_c)</span><b class="hud-val">V_c = 3b</b><small class="hud-sub">Dışlanan hacim parametresi</small></div>
          <div class="hud-card"><span class="hud-lbl">MAXWELL EŞİT ALAN</span><b class="hud-val">${Tr < 1 ? 'Aktif (Yoğuşma Platosu)' : 'Tek Faz'}</b><small class="hud-sub">μ_sıvı = μ_gaz eşitliği</small></div>
        `;
        diagInfo.innerHTML = `<div class="lab-rx"><b>İndirgenmiş Van der Waals Durum Denklemi: (P_r + 3 / V_r²)·(3V_r − 1) = 8T_r</b><span>T &lt; T_c bölgesinde van der Waals halkaları kararsız durumları gösterir; gerçekte sistem yatay <b>Maxwell Eşit-Alan</b> buhar basıncı doğrusunu izler.</span></div>`;

        const vrMin = 0.45, vrMax = 3.6, prMax = 2.2;
        const vrToX = (vr) => padL + ((vr - vrMin) / (vrMax - vrMin)) * pw;
        const prToY = (pr) => padT + ph - (pr / prMax) * ph;

        [0.86, 0.94, 1.00, 1.12, Tr].forEach((tVal, idx) => {
          const isMain = idx === 4;
          diagCtx.strokeStyle = isMain ? '#f472b6' : tVal === 1.00 ? '#fde047' : 'rgba(148, 163, 184, 0.35)';
          diagCtx.lineWidth = isMain ? 3.0 : 1.5;
          diagCtx.beginPath();
          let started = false;
          for (let i = 0; i <= 240; i++) {
            const vr = vrMin + (i / 240) * (vrMax - vrMin);
            const pr = (8 * tVal) / (3 * vr - 1) - 3 / (vr * vr);
            const x = vrToX(vr), y = prToY(pr);
            if (y < padT || y > padT + ph) continue;
            if (!started) { diagCtx.moveTo(x, y); started = true; }
            else diagCtx.lineTo(x, y);
          }
          diagCtx.stroke();
        });

        // Kritik Nokta (Vr = 1, Pr = 1)
        const cxPt = vrToX(1.0), cyPt = prToY(1.0);
        diagCtx.fillStyle = '#3ddcc4';
        diagCtx.beginPath();
        diagCtx.arc(cxPt, cyPt, 5.5, 0, Math.PI * 2);
        diagCtx.fill();
        diagCtx.font = '700 11px JetBrains Mono, monospace';
        diagCtx.fillText('Kritik Nokta (T_c, P_c, V_c)', cxPt + 85, cyPt - 8);
      }
    }

    diagList.addEventListener('click', (e) => {
      const b = e.target.closest('[data-dtype]');
      if (!b) return;
      diagState.type = b.dataset.dtype;
      diagList.querySelectorAll('.reagent-btn').forEach((x) => x.classList.toggle('active', x === b));
      updateDiag();
    });
    diagP1.addEventListener('input', updateDiag);
    diagP2.addEventListener('input', updateDiag);

    document.getElementById('diagExportPng').addEventListener('click', () => {
      const a = document.createElement('a');
      a.download = `affelab-diagram-${diagState.type}.png`;
      a.href = diagCanvas.toDataURL('image/png');
      a.click();
    });

    document.getElementById('diagCopyTikz').addEventListener('click', () => {
      const code = diagTikzBox.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
      const btn = document.getElementById('diagCopyTikz');
      btn.textContent = '✓ TikZ Kopyalandı!';
      setTimeout(() => { btn.textContent = '📋 LaTeX/TikZ Kopyala'; }, 1800);
    });

    /* ------------------------------------------------------------------------
       8. KRİSTALOGRAFİ, BRAVAIS ÖRGÜSÜ & BRAGG XRD SİMÜLATÖRÜ
       ------------------------------------------------------------------------ */
    const xrdCanvas = document.getElementById('xrdCanvas');
    const xrdCtx = xrdCanvas.getContext('2d');
    const xrdHud = document.getElementById('xrdHud');
    const xrdInfo = document.getElementById('xrdInfo');
    const xrdCrystalSel = document.getElementById('xrdCrystal');
    const xrdPlaneSel = document.getElementById('xrdPlane');
    const xrdAnodeSel = document.getElementById('xrdAnode');
    const xrdTheta = document.getElementById('xrdTheta');
    const xrdThetaVal = document.getElementById('xrdThetaVal');
    const xrdSnapBragg = document.getElementById('xrdSnapBragg');

    const CRYSTALS = {
      sc:         { name: 'Basit Kübik (SC — α-Po)', a: 3.35, z: 1, rule: 'Tüm (hkl) yansımaları izinli', allowed: () => true },
      bcc:        { name: 'Hacim Merkezli Kübik (BCC — α-Fe)', a: 2.87, z: 2, rule: 'h + k + l = çift (2n)', allowed: (h, k, l) => (h + k + l) % 2 === 0 },
      fcc:        { name: 'Yüzey Merkezli Kübik (FCC — Cu)', a: 3.61, z: 4, rule: 'h, k, l tümü tek veya tümü çift', allowed: (h, k, l) => (h % 2 === k % 2) && (k % 2 === l % 2) },
      diamond:    { name: 'Elmas Kübik (Fd3̄m — Si)', a: 5.43, z: 8, rule: 'FCC kuralı + çift ise h+k+l = 4n', allowed: (h, k, l) => (h % 2 === 1 && k % 2 === 1 && l % 2 === 1) || (h % 2 === 0 && k % 2 === 0 && l % 2 === 0 && (h + k + l) % 4 === 0) },
      nacl:       { name: 'Kaya Tuzu (Fm3̄m — NaCl)', a: 5.64, z: 4, rule: 'FCC örgü + (Na⁺/Cl⁻) baz çifti', allowed: (h, k, l) => (h % 2 === k % 2) && (k % 2 === l % 2) },
      perovskite: { name: 'Perovskit ABO₃ (SrTiO₃)', a: 3.90, z: 5, rule: 'İlkel kübik örgü + 5 atomlu baz', allowed: () => true },
    };

    const ALL_PLANES = [
      [1, 0, 0], [1, 1, 0], [1, 1, 1], [2, 0, 0], [2, 1, 0],
      [2, 1, 1], [2, 2, 0], [3, 0, 0], [3, 1, 0], [3, 1, 1], [2, 2, 2],
    ];

    function getBraggData() {
      const cr = CRYSTALS[xrdCrystalSel.value] || CRYSTALS.fcc;
      const pStr = xrdPlaneSel.value;
      const h = parseInt(pStr[0], 10), k = parseInt(pStr[1], 10), l = parseInt(pStr[2], 10);
      const lambda = parseFloat(xrdAnodeSel.value);
      const thetaDeg = parseFloat(xrdTheta.value);
      const d = cr.a / Math.sqrt(h * h + k * k + l * l);
      const sinBragg = Math.min(0.999, lambda / (2 * d));
      const thetaBragg = (Math.asin(sinBragg) * 180) / Math.PI;
      const pathDiff = 2 * d * Math.sin((thetaDeg * Math.PI) / 180);
      const nRatio = pathDiff / lambda;
      const phaseCloseness = Math.cos(Math.PI * (nRatio - Math.round(nRatio)));
      const isAllowed = cr.allowed(h, k, l);

      return { cr, h, k, l, lambda, thetaDeg, d, thetaBragg, pathDiff, nRatio, phaseCloseness, isAllowed };
    }

    function updateXrd() {
      const b = getBraggData();
      xrdThetaVal.textContent = `${b.thetaDeg.toFixed(1)}° (2θ = ${(b.thetaDeg * 2).toFixed(1)}°)`;
      const constructive = Math.abs(b.thetaDeg - b.thetaBragg) < 0.8 && b.isAllowed;

      xrdHud.innerHTML = `
        <div class="hud-card">
          <span class="hud-lbl">DÜZLEMLER ARASI MESAFE (d_${b.h}${b.k}${b.l})</span>
          <b class="hud-val" style="color:#3ddcc4;">${b.d.toFixed(3).replace('.', ',')} Å</b>
          <small class="hud-sub">d = a / √(h²+k²+l²) (a = ${b.cr.a} Å)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">YOL FARKI (2d·sinθ)</span>
          <b class="hud-val">${b.pathDiff.toFixed(3).replace('.', ',')} Å</b>
          <small class="hud-sub">${b.nRatio.toFixed(2)} λ (λ = ${b.lambda} Å)</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">BRAGG AÇISI (θ_B / 2θ_B)</span>
          <b class="hud-val" style="color:#fde047;">θ_B = ${b.thetaBragg.toFixed(1)}°</b>
          <small class="hud-sub">2θ_B = ${(b.thetaBragg * 2).toFixed(1)}°</small>
        </div>
        <div class="hud-card">
          <span class="hud-lbl">YAPI FAKTÖRÜ (F_hkl) & GİRİŞİM</span>
          <b class="hud-val" style="color:${constructive ? '#3ddcc4' : !b.isAllowed ? '#ff7a6b' : '#93c5fd'};">${!b.isAllowed ? 'Yasaklı (F_hkl = 0)' : constructive ? '★ Yapıcı Girişim!' : 'Yıkıcı Girişim'}</b>
          <small class="hud-sub">${b.cr.rule}</small>
        </div>
      `;

      xrdInfo.innerHTML = `
        <div class="lab-rx">
          <b>Bragg Kırınım Yasası: n·λ = 2·d_hkl·sin(θ) ve Yapı Faktörü F_hkl = Σ f_j·exp[2πi(hx_j + ky_j + lz_j)]</b>
          <span>Solda kristal atom düzlemlerinden (${b.h}${b.k}${b.l}) yansıyan X-ışınlarının faz farkı ve dalga süperpozisyonu, sağda ise <b>${b.cr.name}</b> için tüm izinli yansımaların oluşturduğu <b>Toz XRD Difraktogramı (I – 2θ)</b> görülmektedir.</span>
        </div>
      `;

      drawXrdCanvas(b);
    }

    function drawXrdCanvas(b) {
      const vp = prepareCanvas(xrdCanvas, xrdCtx, 780, 410);
      if (!vp) return;
      const { W, H } = vp;

      // SOL TARAF: Bragg Düzlemleri, Gelen/Yansıyan X-Işınları ve Dalga Girişimi
      const lx = 36, lw = W * 0.45 - 48, cy = H * 0.56;
      const dPx = 56;

      // 3 Paralel Kristal Atom Düzlemi (hkl)
      [-1, 0, 1].forEach((row) => {
        const py = cy + row * dPx;
        xrdCtx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        xrdCtx.lineWidth = 1.5;
        xrdCtx.beginPath();
        xrdCtx.moveTo(lx, py);
        xrdCtx.lineTo(lx + lw, py);
        xrdCtx.stroke();

        for (let col = 0; col <= 5; col++) {
          const ax = lx + 24 + (col / 5) * (lw - 48);
          xrdCtx.beginPath();
          xrdCtx.arc(ax, py, 5.5, 0, Math.PI * 2);
          xrdCtx.fillStyle = '#5b8cff';
          xrdCtx.fill();
        }
      });

      // Gelen ve Yansıyan X-Işınları
      const rad = (b.thetaDeg * Math.PI) / 180;
      const midX = lx + lw / 2;
      const rayLen = 115;
      const dx = Math.cos(rad) * rayLen;
      const dy = Math.sin(rad) * rayLen;

      [-1, 0].forEach((row) => {
        const hitY = cy + row * dPx;
        xrdCtx.strokeStyle = '#fde047';
        xrdCtx.lineWidth = 2.2;
        xrdCtx.beginPath();
        xrdCtx.moveTo(midX - dx, hitY - dy);
        xrdCtx.lineTo(midX, hitY);
        xrdCtx.lineTo(midX + dx, hitY - dy);
        xrdCtx.stroke();
      });

      // Üstte Yansıyan iki dalganın süperpozisyonu
      const phaseShift = 2 * Math.PI * b.nRatio;
      xrdCtx.strokeStyle = b.isAllowed && Math.abs(Math.cos(phaseShift / 2)) > 0.85 ? '#3ddcc4' : '#ff7a6b';
      xrdCtx.lineWidth = 2.4;
      xrdCtx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const wx = lx + (i / 140) * lw;
        const amp = b.isAllowed ? Math.cos(i * 0.25) + Math.cos(i * 0.25 + phaseShift) : 0;
        const wy = 48 - amp * 13;
        if (i === 0) xrdCtx.moveTo(wx, wy);
        else xrdCtx.lineTo(wx, wy);
      }
      xrdCtx.stroke();
      xrdCtx.font = '600 11px JetBrains Mono, monospace';
      xrdCtx.fillStyle = '#cbd5e1';
      xrdCtx.textAlign = 'center';
      xrdCtx.fillText(`Yansıyan X-Işını Girişimi — (${b.h}${b.k}${b.l}) Düzlemi`, lx + lw / 2, 22);

      // SAĞ TARAF: Toz XRD Difraktogramı (I vs 2θ, 15° .. 95°)
      const rx = W * 0.50, rw = W - rx - 28, gy = 36, gh = H - 80;
      xrdCtx.fillStyle = 'rgba(6, 10, 22, 0.78)';
      xrdCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
      xrdCtx.beginPath();
      xrdCtx.roundRect(rx, gy, rw, gh, 10);
      xrdCtx.fill();
      xrdCtx.stroke();

      const min2T = 15, max2T = 95;
      const tToX = (twoT) => rx + ((twoT - min2T) / (max2T - min2T)) * rw;
      const baseY = gy + gh - 6;

      // 2θ Ekseni
      xrdCtx.font = '10.5px JetBrains Mono, monospace';
      xrdCtx.fillStyle = '#9aa7c2';
      for (let t = 20; t <= 90; t += 10) {
        xrdCtx.fillText(`${t}°`, tToX(t), gy + gh + 16);
      }
      xrdCtx.fillText('Kırınım Açısı 2θ (Derece) — Toz XRD Difraktogramı', rx + rw / 2, gy + gh + 32);

      // İzinli kırınım piklerini çiz
      ALL_PLANES.forEach(([ph, pk, pl]) => {
        if (!b.cr.allowed(ph, pk, pl)) return;
        const dVal = b.cr.a / Math.sqrt(ph * ph + pk * pk + pl * pl);
        const s = b.lambda / (2 * dVal);
        if (s >= 0.98) return;
        const twoTheta = (2 * Math.asin(s) * 180) / Math.PI;
        if (twoTheta < min2T || twoTheta > max2T) return;

        const px = tToX(twoTheta);
        const isCurrent = ph === b.h && pk === b.k && pl === b.l;
        const intensity = Math.max(0.28, 1.0 - (twoTheta - 20) * 0.008);
        const peakH = intensity * (gh * 0.76);

        xrdCtx.strokeStyle = isCurrent ? '#3ddcc4' : '#5b8cff';
        xrdCtx.lineWidth = isCurrent ? 3.5 : 2.2;
        xrdCtx.beginPath();
        xrdCtx.moveTo(px - 5, baseY);
        xrdCtx.lineTo(px, baseY - peakH);
        xrdCtx.lineTo(px + 5, baseY);
        xrdCtx.stroke();

        xrdCtx.fillStyle = isCurrent ? '#fde047' : '#e2e8f0';
        xrdCtx.fillText(`(${ph}${pk}${pl})`, px, baseY - peakH - 8);
      });

      // Kullanıcının mevcut 2θ tarama imleci
      const cur2T = b.thetaDeg * 2;
      if (cur2T >= min2T && cur2T <= max2T) {
        const cxLine = tToX(cur2T);
        xrdCtx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
        xrdCtx.setLineDash([4, 4]);
        xrdCtx.beginPath();
        xrdCtx.moveTo(cxLine, gy);
        xrdCtx.lineTo(cxLine, baseY);
        xrdCtx.stroke();
        xrdCtx.setLineDash([]);
      }
    }

    [xrdCrystalSel, xrdPlaneSel, xrdAnodeSel].forEach((el) => el.addEventListener('change', updateXrd));
    xrdTheta.addEventListener('input', updateXrd);
    xrdSnapBragg.addEventListener('click', () => {
      const b = getBraggData();
      xrdTheta.value = b.thetaBragg.toFixed(1);
      updateXrd();
    });

    /* ---------- ALT SEKME GEÇİŞLERİ VE YENİDEN BOYUTLANDIRMA ---------- */
    function switchResMod(mod) {
      activeMod = mod;
      document.querySelectorAll('#resSubTabs button').forEach((b) => {
        b.classList.toggle('active', b.dataset.rmod === mod);
      });
      document.getElementById('resModSpec').hidden = mod !== 'spec';
      document.getElementById('resModHmo').hidden = mod !== 'hmo';
      document.getElementById('resModTst').hidden = mod !== 'tst';
      document.getElementById('resModCv').hidden = mod !== 'cv';
      document.getElementById('resModCft').hidden = mod !== 'cft';
      document.getElementById('resModAdmet').hidden = mod !== 'admet';
      document.getElementById('resModDiag').hidden = mod !== 'diag';
      document.getElementById('resModXrd').hidden = mod !== 'xrd';

      refreshActive();
      requestAnimationFrame(refreshActive);
    }

    function refreshActive() {
      if (activeMod === 'spec') updateSpecUI();
      else if (activeMod === 'hmo') solveHmo();
      else if (activeMod === 'tst') updateTst();
      else if (activeMod === 'cv') updateCv();
      else if (activeMod === 'cft') updateCft();
      else if (activeMod === 'admet') updateAdmet();
      else if (activeMod === 'diag') updateDiag();
      else if (activeMod === 'xrd') updateXrd();
    }

    document.getElementById('resSubTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-rmod]');
      if (b) switchResMod(b.dataset.rmod);
    });

    window.addEventListener('resize', () => {
      if (!section.classList.contains('active')) return;
      refreshActive();
    });

    // İlk yükleme
    updateSpecUI();
    solveHmo();
    updateTst();
    updateCv();
    updateCft();
    updateAdmet();
    updateDiag();
    updateXrd();

    return {
      setRunning(v) {
        if (v) {
          requestAnimationFrame(refreshActive);
        }
      },
    };
  }

  window.ResearchLab = { init };
})();
