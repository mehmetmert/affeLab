/* ==========================================================================
   affeLab — Gelişmiş Sanal Kimya Laboratuvarı
   --------------------------------------------------------------------------
   • İstasyon 1: Etkileşimli Deney Tezgâhı
       - 3 Cam Kap (Beherglas, Erlenmayer, Deney Tüpü)
       - 21 Kimyasal Reaktif (Asitler, Bazlar, Tuzlar, Metaller/Katılar, İndikatörler)
       - 15+ Gerçek Kimyasal Tepkime (Çökelme ↓, Gaz Çıkışı ↑, Redoks, Kompleks, Nötralleşme, Termal Bozunma)
       - Bunsen Beki Isıtma / Buz Banyosu Soğutma + Buharlaşma + Altın Yağmuru Kristallenmesi
       - Manyetik Karıştırıcı, Elektriksel İletkenlik Probu (Ampul), Canlı Dijital pH & Termometre
       - 6 Adım Adım Güdümlü Okul Deneyi Görevi
   • İstasyon 2: Büret ile Asit-Baz Titrasyonu ve Canlı pH Eğrisi
   • İstasyon 3: Metal Katyonları Alev Deneyi ve Atomik Emisyon Spektrumu
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. KİMYASAL REAKTİF VERİTABANI ---------- */
  const REAGENTS = [
    // Asitler & Bazlar
    { id: 'HCl', cat: 'acids', label: 'HCl(suda)', ionLabel: 'H⁺ + Cl⁻', name: 'Hidroklorik asit (1M)', color: '#d8f3ff', alpha: 0.58, acid: 1.0, cond: 1.8, state: 'aq' },
    { id: 'H2SO4', cat: 'acids', label: 'H₂SO₄(suda)', ionLabel: '2H⁺ + SO₄²⁻', name: 'Sülfürik asit (1M)', color: '#e2f2ff', alpha: 0.62, acid: 1.8, cond: 2.2, state: 'aq' },
    { id: 'CH3COOH', cat: 'acids', label: 'CH₃COOH', ionLabel: 'H⁺ + CH₃COO⁻', name: 'Asetik asit (0,5M)', color: '#eef7ff', alpha: 0.55, acid: 0.22, cond: 0.35, state: 'aq' },
    { id: 'NaOH', cat: 'acids', label: 'NaOH(suda)', ionLabel: 'Na⁺ + OH⁻', name: 'Sodyum hidroksit (1M)', color: '#cfe8ff', alpha: 0.60, acid: -1.0, cond: 1.7, state: 'aq' },
    { id: 'NH3', cat: 'acids', label: 'NH₃(suda)', ionLabel: 'NH₃ / OH⁻', name: 'Amonyak çözeltisi (1M)', color: '#d8e6ff', alpha: 0.58, acid: -0.35, cond: 0.4, state: 'aq' },

    // Tuz Çözeltileri
    { id: 'CuSO4', cat: 'salts', label: 'CuSO₄(suda)', ionLabel: 'Cu²⁺ + SO₄²⁻', name: 'Bakır(II) sülfat', color: '#1e90ff', alpha: 0.80, acid: 0.04, cond: 1.2, state: 'aq' },
    { id: 'AgNO3', cat: 'salts', label: 'AgNO₃(suda)', ionLabel: 'Ag⁺ + NO₃⁻', name: 'Gümüş nitrat', color: '#dce6f7', alpha: 0.62, acid: 0.02, cond: 1.3, state: 'aq' },
    { id: 'PbNO3', cat: 'salts', label: 'Pb(NO₃)₂', ionLabel: 'Pb²⁺ + 2NO₃⁻', name: 'Kurşun(II) nitrat', color: '#e2eafc', alpha: 0.62, acid: 0.03, cond: 1.3, state: 'aq' },
    { id: 'KI', cat: 'salts', label: 'KI(suda)', ionLabel: 'K⁺ + I⁻', name: 'Potasyum iyodür', color: '#fff3b0', alpha: 0.65, acid: 0, cond: 1.4, state: 'aq' },
    { id: 'FeCl3', cat: 'salts', label: 'FeCl₃(suda)', ionLabel: 'Fe³⁺ + 3Cl⁻', name: 'Demir(III) klorür', color: '#f59f00', alpha: 0.80, acid: 0.15, cond: 1.5, state: 'aq' },
    { id: 'BaCl2', cat: 'salts', label: 'BaCl₂(suda)', ionLabel: 'Ba²⁺ + 2Cl⁻', name: 'Baryum klorür', color: '#dbeafe', alpha: 0.62, acid: 0, cond: 1.4, state: 'aq' },
    { id: 'Na2CO3', cat: 'salts', label: 'Na₂CO₃(suda)', ionLabel: '2Na⁺ + CO₃²⁻', name: 'Sodyum karbonat', color: '#e0f2fe', alpha: 0.62, acid: -0.45, cond: 1.3, state: 'aq' },
    { id: 'NaCl', cat: 'salts', label: 'NaCl(suda)', ionLabel: 'Na⁺ + Cl⁻', name: 'Sodyum klorür (Tuz)', color: '#b8dcff', alpha: 0.60, acid: 0, cond: 1.5, state: 'aq' },

    // Metaller & Katılar
    { id: 'Zn', cat: 'solids', label: 'Zn(k)', ionLabel: 'Zn(k)', name: 'Çinko granül (Metal)', color: '#94a3b8', alpha: 0.98, acid: 0, cond: 0, state: 'solid' },
    { id: 'Mg', cat: 'solids', label: 'Mg(k)', ionLabel: 'Mg(k)', name: 'Magnezyum şerit', color: '#cbd5e1', alpha: 0.98, acid: 0, cond: 0, state: 'solid' },
    { id: 'CaCO3', cat: 'solids', label: 'CaCO₃(k)', ionLabel: 'CaCO₃(k)', name: 'Kireçtaşı / Mermer', color: '#f8fafc', alpha: 0.98, acid: 0.02, cond: 0.05, state: 'solid' },
    { id: 'Cu', cat: 'solids', label: 'Cu(k)', ionLabel: 'Cu(k)', name: 'Bakır tel parçaları', color: '#d97706', alpha: 0.98, acid: 0, cond: 0, state: 'solid' },

    // İndikatörler & Saf Su
    { id: 'PHEN', cat: 'ind', label: 'Fenolftalein', ionLabel: 'İnd.', name: 'Bazda pembe/mor (pH>8,2)', color: '#f472b6', alpha: 0.7, acid: 0, cond: 0, state: 'ind' },
    { id: 'BTB', cat: 'ind', label: 'Bromtimol M.', ionLabel: 'İnd.', name: 'Sarı (Asit) · Yeşil · Mavi', color: '#38bdf8', alpha: 0.7, acid: 0, cond: 0, state: 'ind' },
    { id: 'UNIV', cat: 'ind', label: 'Evrensel İnd.', ionLabel: 'İnd.', name: 'Mor lahana pH gökkuşağı', color: '#a855f7', alpha: 0.7, acid: 0, cond: 0, state: 'ind' },
    { id: 'H2O', cat: 'ind', label: 'H₂O(s)', ionLabel: 'H₂O', name: 'Saf Su (Seyreltici)', color: '#60a5fa', alpha: 0.48, acid: 0, cond: 0.01, state: 'aq' },
  ];

  const REAGENT_MAP = new Map(REAGENTS.map((r) => [r.id, r]));

  /* ---------- 2. KİMYASAL TEPKİME KURALLARI ---------- */
  const REACTIONS = [
    // 1. Asit - Baz Nötralleşmeleri
    {
      id: 'neut_hcl_naoh',
      a: ['HCl', 'H2SO4', 'CH3COOH'], b: ['NaOH'],
      prodA: 'NaCl', prodColorA: '#bae6fd', solidA: false, ionA: 'Na⁺+Cl⁻',
      prodB: 'H2O', prodColorB: '#7dd3fc', solidB: false, ionB: 'H₂O',
      dH: 6.5, // ekzotermik (°C artış katsayısı)
      eq: 'H⁺(suda) + OH⁻(suda) → H₂O(s) + Isı (ΔH = −57,3 kJ/mol)',
      desc: 'Ekzotermik asit-baz nötralleşmesi gerçekleşti; çözelti ısındı ve pH nötr (7) değerine yaklaştı.',
    },
    {
      id: 'neut_acid_nh3',
      a: ['HCl', 'H2SO4', 'CH3COOH'], b: ['NH3'],
      prodA: 'NH4Cl', prodColorA: '#dbeafe', solidA: false, ionA: 'NH₄⁺',
      prodB: 'H2O', prodColorB: '#7dd3fc', solidB: false, ionB: 'Cl⁻',
      dH: 4.2,
      eq: 'NH₃(suda) + H⁺(suda) → NH₄⁺(suda) + Isı',
      desc: 'Amonyak asitle tepkimeye girerek amonyum (NH₄⁺) tuzuna dönüştü.',
    },

    // 2. Çökelme Tepkimeleri (↓)
    {
      id: 'ppt_cuoh2',
      a: ['CuSO4'], b: ['NaOH'],
      prodA: 'CuOH2', prodColorA: '#0284c7', solidA: true, ionA: 'Cu(OH)₂↓',
      prodB: 'Na2SO4', prodColorB: '#bae6fd', solidB: false, ionB: 'Na⁺',
      dH: 1.0,
      eq: 'Cu²⁺(suda) + 2OH⁻(suda) → Cu(OH)₂(k)↓',
      desc: 'Mavi jelatinimsi Bakır(II) hidroksit çökeleği oluştu. (80 °C üzerine ısıtılırsa siyah CuO katısına dönüşür!)',
    },
    {
      id: 'complex_cu_nh3',
      a: ['CuSO4', 'CuOH2'], b: ['NH3'],
      prodA: 'CuNH3_4', prodColorA: '#3730a3', solidA: false, ionA: '[Cu(NH₃)₄]²⁺',
      prodB: 'CuNH3_4', prodColorB: '#4338ca', solidB: false, ionB: '[Cu(NH₃)₄]²⁺',
      dH: 1.5,
      eq: 'Cu²⁺(suda) + 4NH₃(suda) → [Cu(NH₃)₄]²⁺(suda)',
      desc: 'Koyu lacivert-mor renkli Tetraamminbakır(II) kompleks iyonu oluştu!',
    },
    {
      id: 'ppt_agcl',
      a: ['AgNO3'], b: ['NaCl', 'HCl', 'BaCl2'],
      prodA: 'AgCl', prodColorA: '#f8fafc', solidA: true, ionA: 'AgCl(k)↓',
      prodB: 'NaNO3', prodColorB: '#e2e8f0', solidB: false, ionB: 'NO₃⁻',
      dH: 1.2,
      eq: 'Ag⁺(suda) + Cl⁻(suda) → AgCl(k)↓',
      desc: 'Suda çözünmeyen beyaz Gümüş klorür (AgCl) çökeleği oluştu. (Amonyak eklenirse kompleks vererek çözünür!)',
    },
    {
      id: 'complex_ag_nh3',
      a: ['AgCl'], b: ['NH3'],
      prodA: 'AgNH3_2', prodColorA: '#e0f2fe', solidA: false, ionA: '[Ag(NH₃)₂]⁺',
      prodB: 'AgNH3_2', prodColorB: '#e0f2fe', solidB: false, ionB: 'Cl⁻',
      dH: 0.5,
      eq: 'AgCl(k) + 2NH₃(suda) ⇌ [Ag(NH₃)₂]⁺(suda) + Cl⁻(suda)',
      desc: 'Beyaz AgCl çökeleği amonyakla diammingümüş(I) kompleksi oluşturarak berrak çözeltiye geçti!',
    },
    {
      id: 'ppt_agi',
      a: ['AgNO3'], b: ['KI'],
      prodA: 'AgI', prodColorA: '#fde047', solidA: true, ionA: 'AgI(k)↓',
      prodB: 'KNO3', prodColorB: '#e2e8f0', solidB: false, ionB: 'K⁺+NO₃⁻',
      dH: 1.4,
      eq: 'Ag⁺(suda) + I⁻(suda) → AgI(k)↓',
      desc: 'Parlak sarı Gümüş iyodür (AgI) çökeleği oluştu.',
    },
    {
      id: 'ppt_pbi2',
      a: ['PbNO3'], b: ['KI'],
      prodA: 'PbI2', prodColorA: '#facc15', solidA: true, ionA: 'PbI₂(k)↓',
      prodB: 'KNO3', prodColorB: '#fef9c3', solidB: false, ionB: 'K⁺+NO₃⁻',
      dH: 1.2,
      eq: 'Pb²⁺(suda) + 2I⁻(suda) → PbI₂(k)↓  (Altın Yağmuru)',
      desc: 'Parlak sarı Kurşun(II) iyodür (“Altın Yağmuru”) çökeleği oluştu! (Isıtıp soğutarak kristallenmesini izleyin.)',
    },
    {
      id: 'ppt_feoh3',
      a: ['FeCl3'], b: ['NaOH', 'NH3'],
      prodA: 'FeOH3', prodColorA: '#b45309', solidA: true, ionA: 'Fe(OH)₃↓',
      prodB: 'NaCl', prodColorB: '#fde68a', solidB: false, ionB: 'Cl⁻',
      dH: 1.1,
      eq: 'Fe³⁺(suda) + 3OH⁻(suda) → Fe(OH)₃(k)↓',
      desc: 'Pas kahverengisi Demir(III) hidroksit çökeleği oluştu.',
    },
    {
      id: 'ppt_baso4',
      a: ['BaCl2'], b: ['H2SO4', 'CuSO4'],
      prodA: 'BaSO4', prodColorA: '#ffffff', solidA: true, ionA: 'BaSO₄(k)↓',
      prodB: 'HCl', prodColorB: '#dbeafe', solidB: false, ionB: 'Cl⁻',
      dH: 1.3,
      eq: 'Ba²⁺(suda) + SO₄²⁻(suda) → BaSO₄(k)↓',
      desc: 'Asitlerde bile çözünmeyen yoğun beyaz Baryum sülfat (BaSO₄) çökeleği oluştu.',
    },
    {
      id: 'ppt_cuco3',
      a: ['CuSO4'], b: ['Na2CO3'],
      prodA: 'CuCO3', prodColorA: '#2dd4bf', solidA: true, ionA: 'CuCO₃(k)↓',
      prodB: 'Na2SO4', prodColorB: '#bae6fd', solidB: false, ionB: 'Na⁺',
      dH: 0.6,
      eq: 'Cu²⁺(suda) + CO₃²⁻(suda) → CuCO₃(k)↓',
      desc: 'Turkuaz-yeşil Bakır(II) karbonat çökeleği oluştu.',
    },

    // 3. Gaz Çıkışlı Tepkimeler (↑)
    {
      id: 'gas_zn_acid',
      a: ['Zn'], b: ['HCl', 'H2SO4'],
      prodA: 'ZnCl2', prodColorA: '#e2e8f0', solidA: false, ionA: 'Zn²⁺',
      prodB: 'H2_gas', prodColorB: '#ffffff', solidB: false, gasB: true, gasLabel: 'H₂(g)↑',
      dH: 7.5,
      eq: 'Zn(k) + 2H⁺(suda) → Zn²⁺(suda) + H₂(g)↑ + Isı',
      desc: 'Aktif çinko metali asitle tepkimeye girerek çözündü ve Hidrojen gazı (H₂↑) kabarcıkları çıkardı!',
    },
    {
      id: 'gas_mg_acid',
      a: ['Mg'], b: ['HCl', 'H2SO4', 'CH3COOH'],
      prodA: 'MgCl2', prodColorA: '#f1f5f9', solidA: false, ionA: 'Mg²⁺',
      prodB: 'H2_gas', prodColorB: '#ffffff', solidB: false, gasB: true, gasLabel: 'H₂(g)↑',
      dH: 11.0,
      eq: 'Mg(k) + 2H⁺(suda) → Mg²⁺(suda) + H₂(g)↑ + Yüksek Isı',
      desc: 'Magnezyum şerit asitle hızla tepkimeye girdi; yoğun H₂(g)↑ çıkışı ve belirgin ekzotermik ısınma gözlendi!',
    },
    {
      id: 'gas_caco3_acid',
      a: ['CaCO3', 'Na2CO3'], b: ['HCl', 'H2SO4', 'CH3COOH'],
      prodA: 'CaCl2', prodColorA: '#e0f2fe', solidA: false, ionA: 'Ca²⁺/Na⁺',
      prodB: 'CO2_gas', prodColorB: '#f8fafc', solidB: false, gasB: true, gasLabel: 'CO₂(g)↑',
      dH: 2.0,
      eq: 'CaCO₃(k) + 2H⁺(suda) → Ca²⁺(suda) + CO₂(g)↑ + H₂O(s)',
      desc: 'Karbonat tuzu asitle köpürerek (efervesans) Karbondioksit gazı (CO₂↑) çıkardı!',
    },

    // 4. Tekli Yer Değiştirme / Redoks
    {
      id: 'redox_zn_cu',
      a: ['Zn'], b: ['CuSO4'],
      prodA: 'Cu', prodColorA: '#c2410c', solidA: true, ionA: 'Cu(k)↓',
      prodB: 'ZnSO4', prodColorB: '#dbeafe', solidB: false, ionB: 'Zn²⁺',
      dH: 5.5,
      eq: 'Zn(k) + Cu²⁺(suda) → Zn²⁺(suda) + Cu(k)↓  (Redoks)',
      desc: 'Çinko elektron vererek yükseltgendi; mavi Cu²⁺ iyonları indirgenerek kızıl-kahve metalik Bakır (Cu) olarak çöktü!',
    },
    {
      id: 'redox_cu_ag',
      a: ['Cu'], b: ['AgNO3'],
      prodA: 'Ag_solid', prodColorA: '#e2e8f0', solidA: true, ionA: 'Ag(k)↓',
      prodB: 'CuSO4', prodColorB: '#38bdf8', solidB: false, ionB: 'Cu²⁺',
      dH: 3.0,
      eq: 'Cu(k) + 2Ag⁺(suda) → Cu²⁺(suda) + 2Ag(k)↓  (Gümüş Ağacı)',
      desc: 'Bakır tel çözeltiye Cu²⁺ vererek sıvıyı maviye boyadı; parlak gümüş kristalleri (Ag↓) çöktü!',
    },
  ];

  /* ---------- 3. GÜDÜMLÜ DENEY GÖREVLERİ ---------- */
  const MISSIONS = [
    {
      id: 'm_gold',
      title: '1. Altın Yağmuru (PbI₂ Çökelmesi ve Kristallenme)',
      desc: 'Kurşun(II) nitrat ile potasyum iyodürü karıştırarak sarı PbI₂ çökeleği elde edin ve ısıtarak davranışını gözlemleyin.',
      steps: [
        { text: 'Kaba Pb(NO₃)₂ (Kurşun(II) nitrat) çözeltisi ekleyin ("Tuzlar" sekmesinde).', check: (st) => st.addedSet.has('PbNO3') },
        { text: 'Üzerine KI (Potasyum iyodür) ekleyerek parlak sarı PbI₂ çökeleğini oluşturun.', check: (st) => st.rxSet.has('ppt_pbi2') },
        { text: 'Bunsen bekini açarak çözeltiyi 80 °C üzerine ısıtın (PbI₂ kristalleri parıldamaya başlar).', check: (st) => st.temp >= 80 },
      ],
    },
    {
      id: 'm_neut',
      title: '2. Asit-Baz Nötralleşmesi ve Fenolftalein Dönümü',
      desc: 'Kuvvetli bir asitle kuvvetli bir bazı indikatör eşliğinde karıştırarak pH ve sıcaklık değişimini ölçün.',
      steps: [
        { text: 'Kaba HCl(suda) ekleyin ve pH metrenin 2,0 altına düştüğünü gözlemleyin.', check: (st) => st.addedSet.has('HCl') && st.ph < 3 },
        { text: '"İndikatör/Su" sekmesinden Fenolftalein indikatörü damlatın.', check: (st) => st.indicator === 'PHEN' },
        { text: 'NaOH(suda) ekleyerek çözeltiyi bazik yapın (pH > 8,2) ve pembe-mor renk dönümünü yakalayın.', check: (st) => st.indicator === 'PHEN' && st.ph > 8.2 },
      ],
    },
    {
      id: 'm_h2',
      title: '3. Aktif Metal + Asit → Hidrojen Gazı (H₂↑) Eldesi',
      desc: 'Çinko veya magnezyum metalinin asitlerle tepkimesinden H₂ gazı çıkışını ve ekzotermik ısınmayı inceleyin.',
      steps: [
        { text: 'Kaba HCl veya H₂SO₄ asit çözeltisi ekleyin.', check: (st) => st.addedSet.has('HCl') || st.addedSet.has('H2SO4') },
        { text: '"Metaller/Katı" sekmesinden Zn(k) veya Mg(k) metali atın.', check: (st) => st.addedSet.has('Zn') || st.addedSet.has('Mg') },
        { text: 'Yükselen H₂(g)↑ kabarcıklarını ve termometredeki sıcaklık artışını gözlemleyin.', check: (st) => st.rxSet.has('gas_zn_acid') || st.rxSet.has('gas_mg_acid') },
      ],
    },
    {
      id: 'm_redox',
      title: '4. Bakır-Çinko Redoks Yer Değiştirme Tepkimesi',
      desc: 'Mavi CuSO₄ çözeltisine çinko metali atarak elektron alışverişini ve metalik bakır çökelmesini gözlemleyin.',
      steps: [
        { text: 'Kaba mavi CuSO₄(suda) çözeltisi doldurun.', check: (st) => st.addedSet.has('CuSO4') },
        { text: 'İçine Zn(k) (Çinko granül) ekleyin ve manyetik karıştırıcıyı çalıştırın.', check: (st) => st.addedSet.has('Zn') },
        { text: 'Mavi rengin açılmasını ve kızıl-kahve Cu(k)↓ çökelmesini gözlemleyin.', check: (st) => st.rxSet.has('redox_zn_cu') },
      ],
    },
    {
      id: 'm_cuo',
      title: '5. Cu(OH)₂ Çökelmesi ve Sıcaklıkla Siyah CuO Eldesi',
      desc: 'Önce mavi Cu(OH)₂ çökeleği oluşturun, ardından Bunsen aleviyle ısıtarak siyah Bakır(II) oksit (CuO) katısına dönüştürün.',
      steps: [
        { text: 'CuSO₄ ve NaOH çözeltilerini karıştırarak mavi Cu(OH)₂(k)↓ çökeleği oluşturun.', check: (st) => st.rxSet.has('ppt_cuoh2') },
        { text: 'Bunsen bekini açarak sıcaklığı 85 °C üzerine çıkarın ve siyah CuO(k) oluşumunu izleyin.', check: (st) => st.rxSet.has('thermal_cuo') },
      ],
    },
    {
      id: 'm_complex',
      title: '6. AgCl Çökelmesi ve Amonyak Kompleksiyle Çözünme',
      desc: 'Suda çözünmeyen beyaz AgCl çökeleğinin NH₃(suda) eklendiğinde kompleks iyon oluşturarak nasıl çözündüğünü keşfedin.',
      steps: [
        { text: 'AgNO₃ ve NaCl ekleyerek beyaz AgCl(k)↓ çökeleği elde edin.', check: (st) => st.rxSet.has('ppt_agcl') },
        { text: '"Asit & Baz" sekmesinden NH₃(suda) ekleyerek çökeleği [Ag(NH₃)₂]⁺ kompleksine dönüştürüp çözün.', check: (st) => st.rxSet.has('complex_ag_nh3') },
      ],
    },
  ];

  /* ---------- 4. ALEV DENEYİ METAL KATYONLARI ---------- */
  const FLAME_SAMPLES = [
    { id: 'Li', formula: 'LiCl', ion: 'Li⁺', name: 'Lityum klorür', colorName: 'Koyu Kırmızı (Karmine)', hex: '#ff2a55', innerHex: '#ff758f', lines: [{ wl: 671, c: '#ff1e42' }, { wl: 610, c: '#ff7b00' }], desc: 'Lityum iyonları 2s ← 2p geçişiyle 670,8 nm dalga boyunda karakteristik koyu kırmızı foton yayar.' },
    { id: 'Na', formula: 'NaCl', ion: 'Na⁺', name: 'Sodyum klorür', colorName: 'Parlak Altın Sarısı', hex: '#ffb703', innerHex: '#ffe169', lines: [{ wl: 589, c: '#ffbe0b' }, { wl: 589.6, c: '#fb8500' }], desc: 'Sodyum D-çizgisi ikilisi (589,0 ve 589,6 nm) görünür spektrumun en şiddetli sarı emisyonunu üretir; sokak lambalarında kullanılır.' },
    { id: 'K', formula: 'KCl', ion: 'K⁺', name: 'Potasyum klorür', colorName: 'Leylak / Açık Mor', hex: '#c77dff', innerHex: '#e0aaff', lines: [{ wl: 404, c: '#9d4edd' }, { wl: 766, c: '#e63946' }], desc: 'Potasyum 404,4 nm (mor) ve 766,5 nm (uzak kırmızı) çizgilerinin birleşimiyle narin bir leylak-mor alev rengi verir.' },
    { id: 'Ca', formula: 'CaCl₂', ion: 'Ca²⁺', name: 'Kalsiyum klorür', colorName: 'Kiremit Kırmızısı / Turuncu', hex: '#fb5607', innerHex: '#ff9e00', lines: [{ wl: 622, c: '#ff5400' }, { wl: 553, c: '#8ac926' }, { wl: 422, c: '#7209b7' }], desc: 'Kalsiyum iyonları 622 nm turuncu-kırmızı bant emisyonu ile karakteristik kiremit rengi alev oluşturur.' },
    { id: 'Sr', formula: 'SrCl₂', ion: 'Sr²⁺', name: 'Stronsiyum klorür', colorName: 'Parlak Kızıl (Crimson)', hex: '#e6194b', innerHex: '#ff5c8a', lines: [{ wl: 650, c: '#ff0a54' }, { wl: 606, c: '#ff758f' }, { wl: 461, c: '#4cc9f0' }], desc: 'Stronsiyum 650–680 nm aralığındaki güçlü kırmızı bantlarıyla işaret fişekleri ve havai fişeklerde parlak kızıl renk verir.' },
    { id: 'Ba', formula: 'BaCl₂', ion: 'Ba²⁺', name: 'Baryum klorür', colorName: 'Elma / Sarımsı Yeşil', hex: '#80ed99', innerHex: '#b7efc5', lines: [{ wl: 524, c: '#57cc99' }, { wl: 513, c: '#38a3a5' }, { wl: 553, c: '#80ed99' }], desc: 'Baryum iyonları 513–553 nm arasındaki moleküler BaOH/BaCl emisyon bantları sayesinde açık elma yeşili alev verir.' },
    { id: 'Cu', formula: 'CuCl₂', ion: 'Cu²⁺', name: 'Bakır(II) klorür', colorName: 'Zümrüt Yeşili / Turkuaz', hex: '#00f5d4', innerHex: '#38bdf8', lines: [{ wl: 515, c: '#00f5d4' }, { wl: 510, c: '#06d6a0' }, { wl: 455, c: '#00bbf9' }], desc: 'Bakır halojenürler alevde mavi-turkuaz çekirdek ve zümrüt yeşili dış manto oluşturur.' },
    { id: 'B', formula: 'H₃BO₃', ion: 'B³⁺', name: 'Borik asit', colorName: 'Parlak Çimen Yeşili', hex: '#38b000', innerHex: '#70e000', lines: [{ wl: 546, c: '#38b000' }, { wl: 518, c: '#008000' }, { wl: 494, c: '#00b4d8' }], desc: 'Bor bileşikleri BO₂ radikal emisyonu sayesinde 518 ve 546 nm dalga boylarında parlak çimen yeşili ışık yayar.' },
  ];

  /* ==========================================================================
     ANA BAŞLATICI
     ========================================================================== */
  function init(rootEl) {
    const section = rootEl && rootEl.id === 'view-lab' ? rootEl : document.getElementById('view-lab');
    if (!section) return { setRunning() {} };

    let running = false;
    let activeStation = 'bench'; // 'bench' | 'titration' | 'flame'

    // DOM Referansları (İstasyon 1: Deney Tezgâhı)
    const canvas = document.getElementById('labCanvas');
    const ctx = canvas.getContext('2d');
    const controlsEl = document.getElementById('labReagents');
    const logEl = document.getElementById('labLog');
    const tiltSlider = document.getElementById('labTilt');
    const tiltLabel = document.getElementById('labTiltLabel');
    const heatSlider = document.getElementById('labHeat');
    const heatLabel = document.getElementById('labHeatLabel');
    const stirrerChk = document.getElementById('labStirrer');
    const probeCondChk = document.getElementById('labProbeCond');
    const ionLabelsChk = document.getElementById('labIonLabels');
    const emptyBtn = document.getElementById('labReset');
    const missionSelect = document.getElementById('labMissionSelect');
    const missionBox = document.getElementById('labMissionBox');

    // HUD
    const hudPh = document.getElementById('hudPh');
    const hudPhType = document.getElementById('hudPhType');
    const hudTemp = document.getElementById('hudTemp');
    const hudTempK = document.getElementById('hudTempK');
    const hudCond = document.getElementById('hudCond');
    const hudCondType = document.getElementById('hudCondType');
    const hudVol = document.getElementById('hudVol');
    const hudPhases = document.getElementById('hudPhases');

    /* ---------- TEZGÂH DURUMU (STATE) ---------- */
    const state = {
      vessel: 'beaker',        // 'beaker' | 'erlenmeyer' | 'tube'
      activeCat: 'acids',      // 'acids' | 'salts' | 'solids' | 'ind'
      tilt: 0,
      targetTilt: 0,
      heatPower: 0,            // -100 (buz) .. 0 .. +100 (Bunsen)
      temp: 25.0,              // °C
      ambientTemp: 25.0,
      lastDeltaH: 0,
      stirrer: false,
      probeCond: true,
      ionLabels: true,
      indicator: null,         // null | 'PHEN' | 'BTB' | 'UNIV'
      ph: 7.0,
      cond: 0.0,
      addedSet: new Set(),
      rxSet: new Set(),
      rxHistory: [],
      missionId: '',
      gasName: '',
      time: 0,
    };

    const particles = [];
    const bubbles = [];
    const steams = [];
    const MAX_P = 380;
    const R = 6.0;

    /* ---------- GÜDÜMLÜ GÖREV SEÇİCİ ---------- */
    MISSIONS.forEach((m) => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `🎯 ${m.title}`;
      missionSelect.appendChild(opt);
    });

    function renderMissionBox() {
      const m = MISSIONS.find((x) => x.id === state.missionId);
      if (!m) {
        missionBox.hidden = true;
        return;
      }
      missionBox.hidden = false;
      const stepsHtml = m.steps.map((s, idx) => {
        const done = s.check(state);
        return `
          <div class="m-step ${done ? 'done' : ''}">
            <span class="m-chk">${done ? '✓' : idx + 1}</span>
            <span>${s.text}</span>
          </div>
        `;
      }).join('');
      const allDone = m.steps.every((s) => s.check(state));
      missionBox.innerHTML = `
        <div class="m-head">
          <b>${m.title}</b>
          ${allDone ? '<span class="m-badge-ok">TAMAMLANDI ★</span>' : '<span class="m-badge">Devam Ediyor</span>'}
        </div>
        <p class="m-desc">${m.desc}</p>
        <div class="m-steps">${stepsHtml}</div>
      `;
    }

    missionSelect.addEventListener('change', () => {
      state.missionId = missionSelect.value;
      if (state.missionId) {
        // İstasyon 1'e geç ve tezgâhı temizle
        switchStation('bench');
        resetBench(false);
      }
      renderMissionBox();
    });

    /* ---------- KATEGORİ VE REAKTİF RAFI ---------- */
    function renderReagentShelf() {
      const list = REAGENTS.filter((r) => r.cat === state.activeCat);
      controlsEl.innerHTML = list.map((r) => `
        <button class="reagent-btn" data-id="${r.id}" title="${r.name}">
          <span class="reagent-dot" style="background:${r.color};${r.state === 'solid' ? 'border-radius:3px;border:1px solid #fff;' : ''}"></span>
          <div>
            <b>${r.label}</b>
            <small>${r.name}</small>
          </div>
        </button>
      `).join('');
    }
    renderReagentShelf();

    document.getElementById('labCatTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-lcat]');
      if (!b) return;
      state.activeCat = b.dataset.lcat;
      document.querySelectorAll('#labCatTabs button').forEach((x) => x.classList.toggle('active', x === b));
      renderReagentShelf();
    });

    document.getElementById('labVesselTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-vessel]');
      if (!b) return;
      state.vessel = b.dataset.vessel;
      document.querySelectorAll('#labVesselTabs button').forEach((x) => x.classList.toggle('active', x === b));
    });

    /* ---------- REAKTİF EKLEME ---------- */
    function addReagent(id, count = 38) {
      const r = REAGENT_MAP.get(id);
      if (!r) return;
      state.addedSet.add(id);

      if (r.state === 'ind') {
        state.indicator = id;
        // Birkaç indikatör damlası görsel olarak düşsün
        count = 10;
      } else if (r.state === 'solid') {
        count = 20;
      }

      const cos = Math.cos(-state.tilt), sin = Math.sin(-state.tilt);
      const spread = state.vessel === 'tube' ? 24 : state.vessel === 'erlenmeyer' ? 34 : 62;
      for (let i = 0; i < count && particles.length < MAX_P; i++) {
        const lx = (Math.random() - 0.5) * spread;
        const ly = -102 - Math.random() * 40;
        particles.push({
          x: lx * cos - ly * sin,
          y: lx * sin + ly * cos,
          vx: (Math.random() - 0.5) * 1.1,
          vy: 1.6 + Math.random() * 1.2,
          type: r.state === 'ind' ? 'H2O' : r.id,
          ionLabel: r.ionLabel,
          color: r.color,
          solid: r.state === 'solid',
          spilled: false,
          sparkle: false,
        });
      }
      recalculateChemistry();
      checkReactionSummary();
      renderMissionBox();
    }

    controlsEl.addEventListener('click', (e) => {
      const b = e.target.closest('.reagent-btn');
      if (b) addReagent(b.dataset.id, 38);
    });

    /* ---------- pH, İLETKENLİK VE İNDİKATÖR RENGİ HESAPLAMA ---------- */
    function getIndicatorTint(ph, ind) {
      if (!ind) return null;
      if (ind === 'PHEN') {
        if (ph < 8.2) return null; // renksiz
        const t = Math.min(1, (ph - 8.2) / 1.8);
        return `rgba(236, 72, 153, ${0.25 + t * 0.55})`;
      }
      if (ind === 'BTB') {
        if (ph < 6.0) return 'rgba(250, 204, 21, 0.52)'; // sarı
        if (ph <= 7.6) return 'rgba(16, 185, 129, 0.52)'; // yeşil
        return 'rgba(37, 99, 235, 0.58)'; // mavi
      }
      if (ind === 'UNIV') {
        if (ph < 3) return 'rgba(239, 68, 68, 0.58)';     // kırmızı
        if (ph < 5) return 'rgba(249, 115, 22, 0.55)';    // turuncu
        if (ph < 6.5) return 'rgba(234, 179, 8, 0.52)';   // sarı
        if (ph <= 7.8) return 'rgba(34, 197, 94, 0.52)';  // yeşil
        if (ph < 9.5) return 'rgba(6, 182, 212, 0.55)';   // turkuaz
        if (ph < 11.5) return 'rgba(99, 102, 241, 0.58)'; // mor-mavi
        return 'rgba(168, 85, 247, 0.62)';                // menekşe
      }
      return null;
    }

    function recalculateChemistry() {
      const inVessel = particles.filter((p) => !p.spilled);
      const aq = inVessel.filter((p) => !p.solid);
      const solids = inVessel.filter((p) => p.solid);

      if (aq.length === 0) {
        state.ph = 7.0;
        state.cond = 0.0;
      } else {
        let netAcid = 0;
        let condSum = 0;
        for (let i = 0; i < aq.length; i++) {
          const r = REAGENT_MAP.get(aq[i].type);
          if (r) {
            netAcid += r.acid;
            condSum += r.cond;
          } else if (aq[i].type === 'NaCl' || aq[i].type === 'KNO3' || aq[i].type === 'NaNO3' || aq[i].type === 'ZnCl2' || aq[i].type === 'MgCl2' || aq[i].type === 'CaCl2' || aq[i].type === 'Na2SO4') {
            condSum += 1.35;
          } else if (aq[i].type === 'NH4Cl') {
            netAcid += 0.08;
            condSum += 1.3;
          } else if (aq[i].type === 'CuNH3_4' || aq[i].type === 'AgNH3_2') {
            netAcid -= 0.22;
            condSum += 1.25;
          }
        }
        const norm = netAcid / Math.max(18, aq.length);
        // Sigmoid-logaritmik pH haritalaması (1.0 .. 13.5)
        state.ph = Math.max(0.8, Math.min(13.6, 7.0 - Math.atan(norm * 4.2) * 4.15));
        state.cond = Math.min(45.0, (condSum / Math.max(20, aq.length)) * 18.5);
      }

      // HUD Güncelle
      hudPh.textContent = state.ph.toFixed(2).replace('.', ',');
      if (state.ph < 6.5) {
        hudPh.style.color = '#ff7a6b';
        hudPhType.textContent = state.ph < 3.0 ? 'Kuvvetli Asidik' : 'Zayıf Asidik';
      } else if (state.ph > 7.5) {
        hudPh.style.color = '#60a5fa';
        hudPhType.textContent = state.ph > 11.0 ? 'Kuvvetli Bazik' : 'Zayıf Bazik';
      } else {
        hudPh.style.color = '#3ddcc4';
        hudPhType.textContent = 'Nötr Çözelti';
      }

      hudTemp.textContent = `${state.temp.toFixed(1).replace('.', ',')} °C`;
      hudTemp.style.color = state.temp > 60 ? '#ff7a6b' : state.temp < 10 ? '#38bdf8' : '#fff';
      const dHTxt = state.lastDeltaH > 0.2 ? `Ekzotermik (+${state.lastDeltaH.toFixed(1)} °C)` : 'Isıl Denge';
      hudTempK.textContent = `${(state.temp + 273.15).toFixed(1).replace('.', ',')} K · ${dHTxt}`;

      hudCond.textContent = `${state.cond.toFixed(1).replace('.', ',')} mS/cm`;
      hudCondType.textContent = state.cond > 12 ? 'Kuvvetli Elektrolit (Parlak)' : state.cond > 2 ? 'Zayıf Elektrolit (Loş)' : 'İletken Değil';

      const volMl = Math.round((inVessel.length / 40) * 25);
      const solidGrams = (solids.length * 0.08).toFixed(1).replace('.', ',');
      hudVol.textContent = `${volMl} mL`;
      hudPhases.textContent = `Çökelek/Katı: ${solidGrams} g · Gaz: ${state.gasName || 'Yok'}`;
    }

    function checkReactionSummary() {
      if (!state.rxHistory.length) {
        logEl.innerHTML = `<div class="lab-hint"><b>Deney Tezgâhı Hazır:</b> Sol raftan asit, baz, tuz çözeltisi, metal veya indikatör ekleyin. Bunsen bekini yakabilir, manyetik karıştırıcıyı açabilir veya üstten <b>Adım Adım Deney Görevi</b> seçebilirsiniz.</div>`;
      } else {
        logEl.innerHTML = state.rxHistory.slice(-3).reverse().map((rx) => `
          <div class="lab-rx">
            <b>${rx.eq}</b>
            <span>${rx.desc}</span>
          </div>
        `).join('');
      }
    }

    function recordReaction(rx) {
      if (!state.rxSet.has(rx.id)) {
        state.rxSet.add(rx.id);
        state.rxHistory.push(rx);
        checkReactionSummary();
        renderMissionBox();
      }
    }

    /* ---------- KONTROLLER & OLAY DİNLEYİCİLERİ ---------- */
    tiltSlider.addEventListener('input', () => {
      const deg = parseFloat(tiltSlider.value);
      state.targetTilt = (deg * Math.PI) / 180;
      tiltLabel.textContent = `${Math.round(deg)}°`;
    });

    heatSlider.addEventListener('input', () => {
      state.heatPower = parseFloat(heatSlider.value);
      if (state.heatPower > 8) {
        heatLabel.textContent = `🔥 Bunsen Alevi (%${Math.round(state.heatPower)})`;
      } else if (state.heatPower < -8) {
        heatLabel.textContent = `❄️ Buz Banyosu (%${Math.round(-state.heatPower)})`;
      } else {
        heatLabel.textContent = 'Oda Sıcaklığı (25 °C)';
      }
    });

    stirrerChk.addEventListener('change', () => { state.stirrer = stirrerChk.checked; });
    probeCondChk.addEventListener('change', () => { state.probeCond = probeCondChk.checked; });
    ionLabelsChk.addEventListener('change', () => { state.ionLabels = ionLabelsChk.checked; });

    function resetBench(addSample = true) {
      particles.length = 0;
      bubbles.length = 0;
      steams.length = 0;
      state.addedSet.clear();
      state.rxSet.clear();
      state.rxHistory.length = 0;
      state.targetTilt = 0;
      state.tilt = 0;
      state.heatPower = 0;
      state.temp = 25.0;
      state.lastDeltaH = 0;
      state.indicator = null;
      state.gasName = '';
      tiltSlider.value = '0';
      tiltLabel.textContent = '0°';
      heatSlider.value = '0';
      heatLabel.textContent = 'Oda Sıcaklığı (25 °C)';
      if (addSample) addReagent('CuSO4', 42);
      recalculateChemistry();
      checkReactionSummary();
      renderMissionBox();
    }

    emptyBtn.addEventListener('click', () => resetBench(false));

    // Tuval üzerinde sürükleyerek eğme
    let dragging = false, startX = 0, startTilt = 0;
    canvas.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = e.clientX;
      startTilt = state.targetTilt;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      state.targetTilt = Math.max(-1.35, Math.min(1.35, startTilt + dx * 0.007));
      const deg = Math.round((state.targetTilt * 180) / Math.PI);
      tiltSlider.value = String(deg);
      tiltLabel.textContent = `${deg}°`;
    });
    const stopDrag = () => { dragging = false; };
    canvas.addEventListener('pointerup', stopDrag);
    canvas.addEventListener('pointercancel', stopDrag);

    function resizeBench() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    new ResizeObserver(resizeBench).observe(canvas);

    // Başlangıç çözeltisi
    addReagent('CuSO4', 44);

    /* ---------- KAP GEOMETRİSİ YARDIMCISI ---------- */
    function getVesselBounds(ly) {
      // ly: -halfH (üst ağız) .. +halfH (taban)
      const halfH = 100;
      if (state.vessel === 'tube') {
        return { halfW: 36, halfH };
      }
      if (state.vessel === 'erlenmeyer') {
        // Üstte dar boyun (34px), tabanda geniş koni (86px)
        const t = Math.max(0, Math.min(1, (ly + halfH) / (2 * halfH)));
        const halfW = t < 0.25 ? 34 : 34 + ((t - 0.25) / 0.75) * 52;
        return { halfW, halfH };
      }
      // Beherglas
      return { halfW: 80, halfH };
    }

    /* ---------- İSTASYON 1: ANA FİZİK VE ÇİZİM DÖNGÜSÜ ---------- */
    function stepBench() {
      const W = canvas.clientWidth, H = canvas.clientHeight;
      if (!W || !H) return;
      state.time += 0.05;
      state.tilt += (state.targetTilt - state.tilt) * 0.14;

      // Sıcaklık evrimi
      const targetTemp = state.heatPower >= 0
        ? 25 + (state.heatPower / 100) * 82 // 107 °C'ye kadar
        : 25 + (state.heatPower / 100) * 25; // 0 °C'ye kadar
      state.temp += (targetTemp - state.temp) * 0.015;
      state.lastDeltaH *= 0.992;

      // Kaynama kontrolü (su varsa 100 °C civarı buhar çıkar)
      const inVesselCount = particles.filter((p) => !p.spilled).length;
      if (state.temp > 94 && inVesselCount > 5 && Math.random() < 0.45) {
        steams.push({
          x: (Math.random() - 0.5) * 55,
          y: -95,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -1.4 - Math.random() * 1.1,
          life: 1.0,
          r: 6 + Math.random() * 8,
        });
      }

      // Termal bozunma: Mavi Cu(OH)2(k) 82 °C üzerinde siyah CuO(k)'ya dönüşür!
      if (state.temp > 82) {
        let converted = false;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.type === 'CuOH2' && Math.random() < 0.04) {
            p.type = 'CuO';
            p.color = '#1e293b';
            p.ionLabel = 'CuO(k)↓';
            converted = true;
          }
          // PbI2 altın yağmuru kristalleri sıcakta parıldar
          if (p.type === 'PbI2') {
            p.sparkle = true;
          }
        }
        if (converted) {
          recordReaction({
            id: 'thermal_cuo',
            eq: 'Cu(OH)₂(k) + Isı (Δ) → CuO(k)↓ + H₂O(s)',
            desc: 'Mavi Bakır(II) hidroksit çökeleği ısıtılınca suyunu kaybederek siyah Bakır(II) oksit (CuO) katısına dönüştü!',
          });
        }
      }

      const halfH = 100;
      const cx = W / 2, cy = H / 2 - 4;
      const cos = Math.cos(state.tilt), sin = Math.sin(state.tilt);

      // Termal ajitasyon (sıcaklık arttıkça Brownian hareket hızlanır)
      const thermalJiggle = Math.max(0.02, (state.temp - 5) * 0.0032);
      const g = 0.34;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vy += g * (p.solid ? 1.42 : 1.0);
        p.vx += (Math.random() - 0.5) * thermalJiggle;
        p.vy += (Math.random() - 0.5) * thermalJiggle;

        // Manyetik karıştırıcı girdap kuvveti
        if (state.stirrer && !p.spilled) {
          const swirl = Math.sin(state.time * 4 + p.y * 0.05) * 0.28;
          p.vx += swirl;
          if (p.solid && p.y > 55) p.vy -= 0.18;
        }

        p.vx *= 0.982;
        p.vy *= 0.982;
        p.x += p.vx;
        p.y += p.vy;

        if (!p.spilled) {
          const lx = p.x * cos + p.y * sin;
          const ly = -p.x * sin + p.y * cos;
          const { halfW } = getVesselBounds(ly);

          if (ly < -halfH - 8 && (lx < -halfW - 4 || lx > halfW + 4)) {
            p.spilled = true;
          } else {
            let nlx = lx, nly = ly;
            let lvx = p.vx * cos + p.vy * sin;
            let lvy = -p.vx * sin + p.vy * cos;

            if (nly > halfH - R) {
              nly = halfH - R;
              lvy *= -0.25;
              lvx *= p.solid ? 0.76 : 0.94;
            }
            if (nly > -halfH) {
              if (nlx < -halfW + R) { nlx = -halfW + R; lvx *= -0.35; }
              if (nlx > halfW - R) { nlx = halfW - R; lvx *= -0.35; }
            }
            p.x = nlx * cos - nly * sin;
            p.y = nlx * sin + nly * cos;
            p.vx = lvx * cos - lvy * sin;
            p.vy = lvx * sin + lvy * cos;
          }
        }
      }

      // Parçacık-parçacık çarpışması ve KİMYASAL TEPKİMELER
      const minD = R * 2.05;
      const minD2 = minD * minD;
      let reactedNow = false;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= minD2 || d2 < 1e-5) continue;
          const d = Math.sqrt(d2);
          const overlap = (minD - d) * 0.42;
          const nx = dx / d, ny = dy / d;
          a.x -= nx * overlap; a.y -= ny * overlap;
          b.x += nx * overlap; b.y += ny * overlap;

          const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
          const vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            const imp = vn * 0.35;
            a.vx += nx * imp; a.vy += ny * imp;
            b.vx -= nx * imp; b.vy -= ny * imp;
          }

          if (a.type !== b.type) {
            for (let k = 0; k < REACTIONS.length; k++) {
              const rx = REACTIONS[k];
              const matchAB = rx.a.includes(a.type) && rx.b.includes(b.type);
              const matchBA = rx.a.includes(b.type) && rx.b.includes(a.type);
              if (matchAB || matchBA) {
                const first = matchAB ? a : b;
                const second = matchAB ? b : a;

                first.type = rx.prodA;
                first.color = rx.prodColorA;
                first.solid = !!rx.solidA;
                first.ionLabel = rx.ionA || rx.prodA;
                if (rx.id === 'ppt_pbi2') first.sparkle = true;

                if (rx.gasB) {
                  // Gaz kabarcığı oluştur ve ikinci parçacığı çözeltiye dönüştür
                  second.type = rx.prodA;
                  second.color = rx.prodColorA;
                  second.solid = false;
                  second.ionLabel = rx.ionA || '';
                  state.gasName = rx.gasLabel;
                  for (let gIdx = 0; gIdx < 3; gIdx++) {
                    bubbles.push({
                      x: second.x + (Math.random() - 0.5) * 10,
                      y: second.y,
                      vy: -1.6 - Math.random() * 1.4,
                      r: 3.2 + Math.random() * 2.8,
                      label: gIdx === 0 ? rx.gasLabel : '',
                    });
                  }
                } else {
                  second.type = rx.prodB;
                  second.color = rx.prodColorB;
                  second.solid = !!rx.solidB;
                  second.ionLabel = rx.ionB || rx.prodB;
                }

                // Ekzotermik ısınma
                if (rx.dH) {
                  const dt = rx.dH * 0.14;
                  state.temp = Math.min(104, state.temp + dt);
                  state.lastDeltaH += dt;
                }

                recordReaction(rx);
                reactedNow = true;
                break;
              }
            }
          }
        }
      }

      if (reactedNow || Math.random() < 0.12) {
        recalculateChemistry();
        renderMissionBox();
      }

      // Ekran dışına dökülenleri temizle
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].y > H / 2 + 90 || Math.abs(particles[i].x) > W / 2 + 90) {
          particles.splice(i, 1);
        }
      }

      /* ---------- TUVAL ÇİZİMİ ---------- */
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate(cx, cy);

      // 1. Isıtıcı / Bunsen Beki veya Buz Banyosu Çizimi (Kabın Altında)
      drawThermalUnit(ctx, halfH);

      // 2. İndikatör Arka Plan Renk Katmanı (Kap İçinde)
      const indTint = getIndicatorTint(state.ph, state.indicator);
      if (indTint && inVesselCount > 6) {
        ctx.save();
        ctx.rotate(state.tilt);
        const fillH = Math.min(175, Math.max(28, inVesselCount * 0.65));
        const { halfW: bW } = getVesselBounds(halfH - fillH / 2);
        ctx.fillStyle = indTint;
        ctx.beginPath();
        ctx.roundRect(-bW + 4, halfH - fillH, (bW - 4) * 2, fillH - 2, 6);
        ctx.fill();
        ctx.restore();
      }

      // 3. Parçacıklar
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        if (p.solid) {
          ctx.arc(p.x, p.y, R * 1.08, 0, Math.PI * 2);
          ctx.fillStyle = p. spark || (p.sparkle && Math.sin(state.time * 8 + i) > 0.4) ? '#fef08a' : p.color;
          ctx.globalAlpha = 0.96;
          ctx.fill();
          ctx.lineWidth = 1.1;
          ctx.strokeStyle = 'rgba(15,23,42,0.55)';
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, R * 1.18, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.72;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // İyon Etiketleri (Seçiliyse her 14 parçacıktan birinde göster)
      if (state.ionLabels) {
        ctx.font = '600 9.5px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i < particles.length; i += 14) {
          const p = particles[i];
          if (!p.ionLabel || p.spilled) continue;
          ctx.fillStyle = 'rgba(6, 10, 22, 0.72)';
          const tw = ctx.measureText(p.ionLabel).width + 6;
          ctx.fillRect(p.x - tw / 2, p.y - 15, tw, 12);
          ctx.fillStyle = p.solid ? '#fde047' : '#e2e8f0';
          ctx.fillText(p.ionLabel, p.x, p.y - 6);
        }
      }

      // 4. Gaz Kabarcıkları (H2↑, CO2↑)
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y += b.vy;
        b.x += Math.sin(state.time * 5 + i) * 0.45;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillStyle = 'rgba(224, 242, 254, 0.28)';
        ctx.lineWidth = 1.2;
        ctx.fill();
        ctx.stroke();
        if (b.label) {
          ctx.font = '700 10px JetBrains Mono, monospace';
          ctx.fillStyle = '#3ddcc4';
          ctx.fillText(b.label, b.x + 14, b.y);
        }
        if (b.y < -halfH - 25) bubbles.splice(i, 1);
      }

      // 5. Buhar Bulutları (Kaynama sırasında)
      for (let i = steams.length - 1; i >= 0; i--) {
        const s = steams[i];
        s.x += s.vx;
        s.y += s.vy;
        s.r += 0.15;
        s.life -= 0.018;
        if (s.life <= 0) {
          steams.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${s.life * 0.28})`;
        ctx.fill();
      }

      // 6. Cam Kap Gövdesi, Ölçek Çizgileri, Manyetik Karıştırıcı ve İletkenlik Probu
      ctx.save();
      ctx.rotate(state.tilt);
      drawGlassVessel(ctx, halfH);
      if (state.stirrer) drawStirBar(ctx, halfH);
      if (state.probeCond) drawConductivityProbe(ctx, halfH, inVesselCount > 8);
      ctx.restore();

      ctx.restore();
    }

    function drawThermalUnit(ctx, halfH) {
      const baseY = halfH + 14;
      // Metal Sac Üçayak / Tabla
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-95, baseY);
      ctx.lineTo(95, baseY);
      ctx.stroke();

      if (state.heatPower > 5) {
        // Bunsen Beki Borusu ve Canlı Alev
        const intensity = state.heatPower / 100;
        const flameH = 22 + intensity * 34 + Math.sin(state.time * 9) * 4;
        ctx.fillStyle = '#475569';
        ctx.fillRect(-10, baseY + 26, 20, 32);

        // Dış mavi/turuncu alev
        const grad = ctx.createRadialGradient(0, baseY + 6, 3, 0, baseY + 12, flameH);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
        grad.addColorStop(0.55, 'rgba(59, 130, 246, 0.75)');
        grad.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-22 * intensity - 8, baseY + 26);
        ctx.quadraticCurveTo(0, baseY - flameH, 22 * intensity + 8, baseY + 26);
        ctx.closePath();
        ctx.fill();
      } else if (state.heatPower < -5) {
        // Buz Banyosu Küveti
        ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.65)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-92, baseY - 18, 184, 28, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#bae6fd';
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('❄️ Buz Banyosu (0 °C)', 0, baseY + 2);
      }
    }

    function drawStirBar(ctx, halfH) {
      const w = Math.cos(state.time * 7) * 18;
      ctx.save();
      ctx.translate(0, halfH - 7);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-Math.abs(w) - 6, -4, (Math.abs(w) + 6) * 2, 8, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function drawConductivityProbe(ctx, halfH, submerged) {
      const cond = submerged ? state.cond : 0;
      const glow = Math.min(1, cond / 20);
      const px = state.vessel === 'tube' ? 18 : 44;

      // Elektrot Çubukları
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(px - 6, -halfH - 28);
      ctx.lineTo(px - 6, halfH - 35);
      ctx.moveTo(px + 6, -halfH - 28);
      ctx.lineTo(px + 6, halfH - 35);
      ctx.stroke();

      // Ampul Gövdesi (Üstte)
      const by = -halfH - 42;
      if (glow > 0.05) {
        const rad = ctx.createRadialGradient(px, by, 2, px, by, 14 + glow * 18);
        rad.addColorStop(0, `rgba(253, 224, 71, ${0.9 * glow})`);
        rad.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(px, by, 14 + glow * 18, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(px, by, 10, 0, Math.PI * 2);
      ctx.fillStyle = glow > 0.05 ? `rgba(254, 240, 138, ${0.35 + glow * 0.65})` : 'rgba(51, 65, 85, 0.6)';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    }

    function drawGlassVessel(ctx, halfH) {
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.88)';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (state.vessel === 'beaker') {
        const halfW = 80;
        ctx.fillStyle = 'rgba(148, 179, 255, 0.04)';
        ctx.fillRect(-halfW, -halfH, halfW * 2, halfH * 2);

        // Ölçek Çizgileri
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.35)';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.lineWidth = 1.2;
        [50, 100, 150, 200].forEach((ml, idx) => {
          const y = halfH - (idx + 1) * 42;
          ctx.beginPath();
          ctx.moveTo(halfW - 26, y);
          ctx.lineTo(halfW - 8, y);
          ctx.stroke();
          ctx.fillText(`${ml} mL`, halfW - 68, y + 3);
        });

        ctx.strokeStyle = 'rgba(226, 232, 240, 0.88)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-halfW - 10, -halfH - 4);
        ctx.lineTo(-halfW, -halfH);
        ctx.lineTo(-halfW, halfH - 12);
        ctx.quadraticCurveTo(-halfW, halfH, -halfW + 12, halfH);
        ctx.lineTo(halfW - 12, halfH);
        ctx.quadraticCurveTo(halfW, halfH, halfW, halfH - 12);
        ctx.lineTo(halfW, -halfH);
        ctx.lineTo(halfW + 10, -halfH - 4);
        ctx.stroke();
      } else if (state.vessel === 'erlenmeyer') {
        // Konik Erlenmayer
        ctx.beginPath();
        ctx.moveTo(-38, -halfH - 4);
        ctx.lineTo(-34, -halfH);
        ctx.lineTo(-34, -halfH + 46);
        ctx.lineTo(-86, halfH - 12);
        ctx.quadraticCurveTo(-86, halfH, -72, halfH);
        ctx.lineTo(72, halfH);
        ctx.quadraticCurveTo(86, halfH, 86, halfH - 12);
        ctx.lineTo(34, -halfH + 46);
        ctx.lineTo(34, -halfH);
        ctx.lineTo(38, -halfH - 4);
        ctx.stroke();

        ctx.fillStyle = 'rgba(203, 213, 225, 0.55)';
        ctx.font = '10.5px Inter, sans-serif';
        ctx.fillText('250 mL Erlen', -30, halfH - 14);
      } else {
        // Deney Tüpü
        const halfW = 36;
        ctx.beginPath();
        ctx.moveTo(-halfW - 6, -halfH - 4);
        ctx.lineTo(-halfW, -halfH);
        ctx.lineTo(-halfW, halfH - 34);
        ctx.arc(0, halfH - 34, halfW, Math.PI, 0, true);
        ctx.lineTo(halfW, -halfH);
        ctx.lineTo(halfW + 6, -halfH - 4);
        ctx.stroke();
      }
    }

    /* ==========================================================================
       İSTASYON 2: ASİT-BAZ TİTRASYON SİMÜLATÖRÜ
       ========================================================================== */
    const titCanvas = document.getElementById('titCanvas');
    const titCtx = titCanvas.getContext('2d');
    const titAnalyteSel = document.getElementById('titAnalyte');
    const titIndSel = document.getElementById('titIndicator');
    const titReadout = document.getElementById('titReadout');
    const titLog = document.getElementById('titLog');
    const titAutoBtn = document.getElementById('titAuto');

    const titState = {
      analyte: 'HCl',      // 'HCl' | 'CH3COOH' | 'NaOH'
      ind: 'phen',         // 'phen' | 'btb' | 'mo'
      vAdded: 0.0,         // mL (0 .. 50)
      auto: false,
      drops: [],
      curve: [],
    };

    function calcTitrationPh(analyte, v) {
      const Va = 25.0; // mL
      const Ca = 0.10; // M
      const Ct = 0.10; // M
      const Vt = v;
      const Vtot = Va + Vt;

      if (analyte === 'HCl') {
        const nH = Va * Ca;
        const nOH = Vt * Ct;
        if (Math.abs(nH - nOH) < 1e-5) return 7.0;
        if (nH > nOH) {
          const cH = (nH - nOH) / Vtot;
          return Math.max(1.0, -Math.log10(cH));
        } else {
          const cOH = (nOH - nH) / Vtot;
          return Math.min(13.0, 14.0 + Math.log10(cOH));
        }
      }

      if (analyte === 'NaOH') {
        // Kuvvetli baz HCl ile titre ediliyor
        const nOH = Va * Ca;
        const nH = Vt * Ct;
        if (Math.abs(nH - nOH) < 1e-5) return 7.0;
        if (nOH > nH) {
          const cOH = (nOH - nH) / Vtot;
          return Math.min(13.0, 14.0 + Math.log10(cOH));
        } else {
          const cH = (nH - nOH) / Vtot;
          return Math.max(1.0, -Math.log10(cH));
        }
      }

      // Zayıf asit CH3COOH (pKa = 4.74) + Kuvvetli baz NaOH
      const pKa = 4.74;
      const Ka = Math.pow(10, -pKa);
      if (Vt <= 0.01) {
        return 0.5 * (pKa - Math.log10(Ca)); // ~2.87
      }
      if (Vt < Va - 0.05) {
        // Henderson-Hasselbalch tampon bölgesi
        return pKa + Math.log10(Vt / (Va - Vt));
      }
      if (Math.abs(Vt - Va) <= 0.05) {
        // Eşdeğerlik noktası: CH3COO- hidrolizi (pH ~ 8.72)
        return 8.72;
      }
      const cOH = ((Vt - Va) * Ct) / Vtot;
      return Math.min(13.0, 14.0 + Math.log10(cOH));
    }

    function getTitrationFlaskColor(ph, ind) {
      if (ind === 'phen') {
        if (ph < 8.2) return 'rgba(224, 242, 254, 0.35)';
        const t = Math.min(1, (ph - 8.2) / 1.6);
        return `rgba(236, 72, 153, ${0.35 + t * 0.50})`;
      }
      if (ind === 'btb') {
        if (ph < 6.0) return 'rgba(250, 204, 21, 0.58)';
        if (ph <= 7.6) return 'rgba(16, 185, 129, 0.58)';
        return 'rgba(37, 99, 235, 0.62)';
      }
      // Metil Oranj (3.1 - 4.4)
      if (ph < 3.1) return 'rgba(239, 68, 68, 0.62)';
      if (ph <= 4.4) return 'rgba(249, 115, 22, 0.58)';
      return 'rgba(250, 204, 21, 0.55)';
    }

    function addTitrant(dv) {
      const nextV = Math.min(50.0, +(titState.vAdded + dv).toFixed(2));
      const stepV = 0.2;
      for (let v = titState.vAdded + stepV; v <= nextV + 1e-4; v += stepV) {
        const cv = Math.min(nextV, +v.toFixed(2));
        titState.curve.push({ v: cv, ph: calcTitrationPh(titState.analyte, cv) });
      }
      titState.vAdded = nextV;
      titState.drops.push({ y: 205, vy: 3.5 });
      updateTitrationUI();
    }

    function resetTitration() {
      titState.vAdded = 0;
      titState.auto = false;
      titAutoBtn.textContent = 'Musluğu Aç (Otomatik)';
      titState.curve = [{ v: 0, ph: calcTitrationPh(titState.analyte, 0) }];
      updateTitrationUI();
    }

    function updateTitrationUI() {
      const ph = calcTitrationPh(titState.analyte, titState.vAdded);
      const eqPh = titState.analyte === 'CH3COOH' ? '8,72' : '7,00';
      const titrantName = titState.analyte === 'NaOH' ? '0,10 M HCl' : '0,10 M NaOH';
      const eqReached = Math.abs(titState.vAdded - 25.0) < 0.25;

      titReadout.innerHTML = `
        <div class="tit-stat"><span>Büretteki Titrant</span><b>${titrantName}</b></div>
        <div class="tit-stat"><span>Eklenen Titrant Hacmi (V)</span><b>${titState.vAdded.toFixed(1).replace('.', ',')} mL</b></div>
        <div class="tit-stat"><span>Anlık Erlenmayer pH</span><b style="color:var(--accent-2);font-size:16px;">${ph.toFixed(2).replace('.', ',')}</b></div>
        <div class="tit-stat"><span>Eşdeğerlik Noktası</span><b>25,0 mL (pH = ${eqPh})</b></div>
      `;

      titLog.innerHTML = eqReached
        ? `<div class="lab-rx"><b>★ EŞDEĞERLİK NOKTASINA ULAŞILDI (V = 25,0 mL · pH = ${ph.toFixed(2).replace('.', ',')})</b><span>Asit ve bazın mol sayıları birbirine eşitlendi (n_asit = n_baz). İndikatör dönüm noktası tamamlandı!</span></div>`
        : `<div class="lab-hint">Büretten damla ekleyerek sağdaki canlı <b>pH – Hacim (mL)</b> titrasyon eğrisinin S-biçimli sıçramasını ve erlenmayerdeki renk dönümünü gözlemleyin.</div>`;
    }

    titAnalyteSel.addEventListener('change', () => { titState.analyte = titAnalyteSel.value; resetTitration(); });
    titIndSel.addEventListener('change', () => { titState.ind = titIndSel.value; updateTitrationUI(); });
    document.getElementById('titDrop').addEventListener('click', () => addTitrant(0.1));
    document.getElementById('titAdd1').addEventListener('click', () => addTitrant(1.0));
    document.getElementById('titAdd5').addEventListener('click', () => addTitrant(5.0));
    document.getElementById('titReset').addEventListener('click', resetTitration);
    titAutoBtn.addEventListener('click', () => {
      titState.auto = !titState.auto;
      titAutoBtn.textContent = titState.auto ? 'Musluğu Kapat ⏸' : 'Musluğu Aç (Otomatik)';
    });

    function resizeTit() {
      const rect = titCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      titCanvas.width = rect.width * dpr;
      titCanvas.height = rect.height * dpr;
      titCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    new ResizeObserver(resizeTit).observe(titCanvas);
    resetTitration();

    function stepTitration() {
      const W = titCanvas.clientWidth, H = titCanvas.clientHeight;
      if (!W || !H) return;

      if (titState.auto && titState.vAdded < 50) {
        addTitrant(0.15);
        if (titState.vAdded >= 50) {
          titState.auto = false;
          titAutoBtn.textContent = 'Musluğu Aç (Otomatik)';
        }
      }

      const ph = calcTitrationPh(titState.analyte, titState.vAdded);
      titCtx.clearRect(0, 0, W, H);

      // SOL TARAF: Büret + Stand + Erlenmayer Çizimi
      const bx = Math.min(180, W * 0.24);
      // Spor (Stand)
      titCtx.strokeStyle = '#475569';
      titCtx.lineWidth = 4;
      titCtx.beginPath();
      titCtx.moveTo(bx - 70, 30);
      titCtx.lineTo(bx - 70, H - 35);
      titCtx.moveTo(bx - 95, H - 35);
      titCtx.lineTo(bx + 65, H - 35);
      titCtx.moveTo(bx - 70, 95);
      titCtx.lineTo(bx, 95);
      titCtx.stroke();

      // Büret Gövdesi
      titCtx.fillStyle = 'rgba(186, 230, 253, 0.14)';
      titCtx.strokeStyle = '#e2e8f0';
      titCtx.lineWidth = 2;
      titCtx.fillRect(bx - 11, 28, 22, 165);
      titCtx.strokeRect(bx - 11, 28, 22, 165);

      // Büret içindeki kalan sıvı
      const remRatio = Math.max(0, (50 - titState.vAdded) / 50);
      const liqH = remRatio * 150;
      titCtx.fillStyle = 'rgba(96, 165, 250, 0.55)';
      titCtx.fillRect(bx - 9, 36 + (150 - liqH), 18, liqH);

      // Musluk
      titCtx.fillStyle = titState.auto ? '#3ddcc4' : '#f43f5e';
      titCtx.fillRect(bx - 16, 194, 32, 7);

      // Düşen damlalar
      for (let i = titState.drops.length - 1; i >= 0; i--) {
        const d = titState.drops[i];
        d.y += d.vy;
        titCtx.beginPath();
        titCtx.arc(bx, d.y, 3.8, 0, Math.PI * 2);
        titCtx.fillStyle = '#60a5fa';
        titCtx.fill();
        if (d.y > H - 90) titState.drops.splice(i, 1);
      }

      // Erlenmayer ve İndikatörlü Çözelti
      const fy = H - 40;
      const flaskColor = getTitrationFlaskColor(ph, titState.ind);
      titCtx.fillStyle = flaskColor;
      titCtx.beginPath();
      titCtx.moveTo(bx - 38, fy - 48);
      titCtx.lineTo(bx - 56, fy - 6);
      titCtx.lineTo(bx + 56, fy - 6);
      titCtx.lineTo(bx + 38, fy - 48);
      titCtx.closePath();
      titCtx.fill();

      titCtx.strokeStyle = '#e2e8f0';
      titCtx.lineWidth = 2.8;
      titCtx.beginPath();
      titCtx.moveTo(bx - 16, fy - 115);
      titCtx.lineTo(bx - 16, fy - 90);
      titCtx.lineTo(bx - 58, fy - 6);
      titCtx.lineTo(bx + 58, fy - 6);
      titCtx.lineTo(bx + 16, fy - 90);
      titCtx.lineTo(bx + 16, fy - 115);
      titCtx.stroke();

      // SAĞ TARAF: Canlı Titrasyon Eğrisi (pH vs V_eklenen)
      const gx = Math.max(290, W * 0.40);
      const gy = 38;
      const gw = W - gx - 34;
      const gh = H - 86;
      if (gw > 120) {
        titCtx.fillStyle = 'rgba(6, 10, 22, 0.78)';
        titCtx.strokeStyle = 'rgba(140, 170, 255, 0.25)';
        titCtx.lineWidth = 1;
        titCtx.beginPath();
        titCtx.roundRect(gx, gy, gw, gh, 10);
        titCtx.fill();
        titCtx.stroke();

        // Izgara ve pH ekseni (0..14)
        titCtx.font = '11px JetBrains Mono, monospace';
        titCtx.fillStyle = '#9aa7c2';
        titCtx.textAlign = 'right';
        [0, 2, 4, 7, 10, 12, 14].forEach((pVal) => {
          const py = gy + gh - (pVal / 14) * gh;
          titCtx.strokeStyle = pVal === 7 ? 'rgba(61, 220, 196, 0.35)' : 'rgba(148, 163, 184, 0.12)';
          titCtx.beginPath();
          titCtx.moveTo(gx, py);
          titCtx.lineTo(gx + gw, py);
          titCtx.stroke();
          titCtx.fillText(`pH ${pVal}`, gx - 6, py + 4);
        });

        // Hacim ekseni (0..50 mL)
        titCtx.textAlign = 'center';
        [0, 10, 20, 25, 30, 40, 50].forEach((vVal) => {
          const vx = gx + (vVal / 50) * gw;
          titCtx.strokeStyle = vVal === 25 ? 'rgba(242, 207, 74, 0.35)' : 'rgba(148, 163, 184, 0.12)';
          titCtx.beginPath();
          titCtx.moveTo(vx, gy);
          titCtx.lineTo(vx, gy + gh);
          titCtx.stroke();
          titCtx.fillText(`${vVal}`, vx, gy + gh + 16);
        });
        titCtx.fillText('Eklenen Titrant Hacmi (mL)', gx + gw / 2, gy + gh + 32);

        // Eğriyi çiz
        titCtx.strokeStyle = '#5b8cff';
        titCtx.lineWidth = 2.6;
        titCtx.beginPath();
        titState.curve.forEach((pt, idx) => {
          const px = gx + (pt.v / 50) * gw;
          const py = gy + gh - (pt.ph / 14) * gh;
          if (idx === 0) titCtx.moveTo(px, py);
          else titCtx.lineTo(px, py);
        });
        titCtx.stroke();

        // Güncel nokta
        const curX = gx + (titState.vAdded / 50) * gw;
        const curY = gy + gh - (ph / 14) * gh;
        titCtx.beginPath();
        titCtx.arc(curX, curY, 5.5, 0, Math.PI * 2);
        titCtx.fillStyle = '#3ddcc4';
        titCtx.fill();
      }
    }

    /* ==========================================================================
       İSTASYON 3: METAL KATYONLARI ALEV DENEYİ (EMİSYON SPEKTRUMU)
       ========================================================================== */
    const flameCanvas = document.getElementById('flameCanvas');
    const flameCtx = flameCanvas.getContext('2d');
    const flameSamplesEl = document.getElementById('flameSamples');
    const flameLog = document.getElementById('flameLog');
    const flameMysteryBtn = document.getElementById('flameMysteryBtn');
    const flameMysteryBox = document.getElementById('flameMysteryBox');

    let currentFlame = FLAME_SAMPLES[0];
    let mysteryTarget = null;
    const sparks = [];

    flameSamplesEl.innerHTML = FLAME_SAMPLES.map((s, idx) => `
      <button class="reagent-btn ${idx === 0 ? 'active' : ''}" data-flame="${s.id}">
        <span class="reagent-dot" style="background:${s.hex};box-shadow:0 0 8px ${s.hex};"></span>
        <div>
          <b>${s.ion} (${s.formula})</b>
          <small>${s.colorName}</small>
        </div>
      </button>
    `).join('');

    function updateFlameInfo() {
      if (mysteryTarget) {
        flameLog.innerHTML = `<div class="lab-rx"><b>🕵️ Bilinmeyen Numune (X⁺) Alevde İnceleniyor</b><span>Alevin rengini ve aşağıdaki atomik emisyon spektrum çizgilerini (nm) inceleyerek sol panelden hangi metal katyonu olduğunu tahmin edin!</span></div>`;
      } else {
        flameLog.innerHTML = `
          <div class="lab-rx">
            <b>${currentFlame.ion} (${currentFlame.name}) — Alev Rengi: ${currentFlame.colorName}</b>
            <span>${currentFlame.desc}</span>
          </div>
        `;
      }
    }
    updateFlameInfo();

    flameSamplesEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-flame]');
      if (!b) return;
      mysteryTarget = null;
      flameMysteryBox.innerHTML = '';
      currentFlame = FLAME_SAMPLES.find((x) => x.id === b.dataset.flame) || FLAME_SAMPLES[0];
      flameSamplesEl.querySelectorAll('.reagent-btn').forEach((x) => x.classList.toggle('active', x === b));
      updateFlameInfo();
    });

    flameMysteryBtn.addEventListener('click', () => {
      mysteryTarget = FLAME_SAMPLES[Math.floor(Math.random() * FLAME_SAMPLES.length)];
      currentFlame = mysteryTarget;
      flameSamplesEl.querySelectorAll('.reagent-btn').forEach((x) => x.classList.remove('active'));
      flameMysteryBox.innerHTML = `
        <p style="font-size:12px;color:var(--muted);margin-bottom:6px;">Aleve tutulan bilinmeyen <b>X⁺</b> katyonu hangisidir?</p>
        <div class="flame-guess-grid">
          ${FLAME_SAMPLES.map((s) => `<button class="chip-btn" data-guess="${s.id}">${s.ion} (${s.formula})</button>`).join('')}
        </div>
        <div id="flameGuessResult" style="margin-top:6px;font-size:12.5px;"></div>
      `;
      updateFlameInfo();
    });

    flameMysteryBox.addEventListener('click', (e) => {
      const b = e.target.closest('[data-guess]');
      if (!b || !mysteryTarget) return;
      const resEl = document.getElementById('flameGuessResult');
      if (b.dataset.guess === mysteryTarget.id) {
        resEl.innerHTML = `<span class="ok">✓ Tebrikler! Numune ${mysteryTarget.ion} (${mysteryTarget.name} — ${mysteryTarget.colorName}).</span>`;
      } else {
        resEl.innerHTML = `<span style="color:#ff7a6b;">✗ Yanlış tahmin. Spektrum çizgilerine ve alev rengine tekrar bakın!</span>`;
      }
    });

    function resizeFlame() {
      const rect = flameCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      flameCanvas.width = rect.width * dpr;
      flameCanvas.height = rect.height * dpr;
      flameCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    new ResizeObserver(resizeFlame).observe(flameCanvas);

    function stepFlame() {
      const W = flameCanvas.clientWidth, H = flameCanvas.clientHeight;
      if (!W || !H) return;
      state.time += 0.06;

      flameCtx.clearRect(0, 0, W, H);
      const cx = W / 2, baseY = H - 125;

      // Kıvılcım parçacıkları ekle
      if (Math.random() < 0.55) {
        sparks.push({
          x: cx + (Math.random() - 0.5) * 26,
          y: baseY - 60 - Math.random() * 40,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -1.8 - Math.random() * 2.0,
          life: 1.0,
          c: currentFlame.hex,
        });
      }

      // Dış Alev Halesi
      const flicker = Math.sin(state.time * 7) * 6;
      const glow = flameCtx.createRadialGradient(cx, baseY - 95, 10, cx, baseY - 95, 135);
      glow.addColorStop(0, currentFlame.innerHex);
      glow.addColorStop(0.45, currentFlame.hex + 'aa');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      flameCtx.fillStyle = glow;
      flameCtx.beginPath();
      flameCtx.arc(cx, baseY - 95, 135, 0, Math.PI * 2);
      flameCtx.fill();

      // Dış Alev Mantosu
      flameCtx.fillStyle = currentFlame.hex + 'cc';
      flameCtx.beginPath();
      flameCtx.moveTo(cx - 34, baseY);
      flameCtx.quadraticCurveTo(cx - 52, baseY - 95, cx + flicker * 0.5, baseY - 195 - flicker);
      flameCtx.quadraticCurveTo(cx + 52, baseY - 95, cx + 34, baseY);
      flameCtx.closePath();
      flameCtx.fill();

      // İç Mavi Koni (İndirgen Bölge)
      flameCtx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      flameCtx.beginPath();
      flameCtx.moveTo(cx - 16, baseY);
      flameCtx.quadraticCurveTo(cx - 18, baseY - 45, cx, baseY - 82);
      flameCtx.quadraticCurveTo(cx + 18, baseY - 45, cx + 16, baseY);
      flameCtx.closePath();
      flameCtx.fill();

      // Platin Tel Halka (Alevin İçinde)
      flameCtx.strokeStyle = '#e2e8f0';
      flameCtx.lineWidth = 2.5;
      flameCtx.beginPath();
      flameCtx.moveTo(cx + 140, baseY - 65);
      flameCtx.lineTo(cx + 6, baseY - 85);
      flameCtx.stroke();
      flameCtx.beginPath();
      flameCtx.arc(cx, baseY - 86, 6, 0, Math.PI * 2);
      flameCtx.stroke();

      // Bunsen Beki Gövdesi
      flameCtx.fillStyle = '#334155';
      flameCtx.fillRect(cx - 16, baseY, 32, 42);

      // Kıvılcımlar
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.025;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        flameCtx.beginPath();
        flameCtx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2);
        flameCtx.fillStyle = s.c;
        flameCtx.fill();
      }

      // ALT BÖLÜM: ATOMİK EMİSYON SPEKTRUMU ŞERİDİ (400 nm – 780 nm)
      const sx = 36, sy = H - 64, sw = W - 72, sh = 38;
      flameCtx.fillStyle = '#050811';
      flameCtx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      flameCtx.lineWidth = 1.2;
      flameCtx.fillRect(sx, sy, sw, sh);
      flameCtx.strokeRect(sx, sy, sw, sh);

      flameCtx.font = '600 11px JetBrains Mono, monospace';
      flameCtx.fillStyle = '#9aa7c2';
      flameCtx.textAlign = 'left';
      flameCtx.fillText(`ATOMİK EMİSYON SPEKTRUMU (${mysteryTarget ? 'Bilinmeyen X⁺' : currentFlame.ion})`, sx, sy - 7);

      // Dalga boyu ölçeği (400 .. 780 nm)
      flameCtx.textAlign = 'center';
      [400, 450, 500, 550, 600, 650, 700, 750].forEach((wl) => {
        const lx = sx + ((wl - 380) / 400) * sw;
        flameCtx.fillStyle = '#64748b';
        flameCtx.fillText(`${wl} nm`, lx, sy + sh + 14);
      });

      // Karakteristik emisyon çizgileri
      currentFlame.lines.forEach((ln) => {
        const lx = sx + ((ln.wl - 380) / 400) * sw;
        flameCtx.strokeStyle = ln.c;
        flameCtx.lineWidth = 3.2;
        flameCtx.beginPath();
        flameCtx.moveTo(lx, sy + 2);
        flameCtx.lineTo(lx, sy + sh - 2);
        flameCtx.stroke();

        flameCtx.fillStyle = '#fff';
        flameCtx.fillText(`${ln.wl} nm`, lx, sy + 14);
      });
    }

    /* ---------- İSTASYON GEÇİŞLERİ VE ANA RAF DÖNGÜSÜ ---------- */
    function switchStation(st) {
      activeStation = st;
      document.querySelectorAll('#labStationTabs button').forEach((b) => {
        b.classList.toggle('active', b.dataset.station === st);
      });
      document.getElementById('labStationBench').hidden = st !== 'bench';
      document.getElementById('labStationTitration').hidden = st !== 'titration';
      document.getElementById('labStationFlame').hidden = st !== 'flame';

      if (st === 'bench') { resizeBench(); requestAnimationFrame(resizeBench); }
      if (st === 'titration') { resizeTit(); requestAnimationFrame(resizeTit); }
      if (st === 'flame') { resizeFlame(); requestAnimationFrame(resizeFlame); }
    }

    document.getElementById('labStationTabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-station]');
      if (b) switchStation(b.dataset.station);
    });

    function loop() {
      if (!running) return;
      requestAnimationFrame(loop);
      if (activeStation === 'bench') stepBench();
      else if (activeStation === 'titration') stepTitration();
      else if (activeStation === 'flame') stepFlame();
    }

    return {
      setRunning(v) {
        if (v && !running) {
          running = true;
          resizeBench();
          resizeTit();
          resizeFlame();
          requestAnimationFrame(loop);
        } else {
          running = v;
        }
      },
    };
  }

  window.VirtualLab = { init };
})();
