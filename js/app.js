/* Elementa — Ana uygulama denetleyicisi */
(function () {
  'use strict';

  const {
    ELEMENTS, CATS, PHASES, PHASE_COLORS, BLOCK_COLORS, ORDER, CAP,
    ionConfig, configString, shellsOf, chargeStr, valenceOf, typicalIons,
  } = Chem;

  const $ = (id) => document.getElementById(id);

  const state = {
    selectedZ: 6, // Karbon ile başla
    charge: 0,
    neutrons: 6,
    colorMode: 'cat', // cat | block | phase | en
    activeFilter: null,
    search: '',
    showShells: true,
    shortConfig: true,
    activeTab: 'table',
  };

  let atomModel = null;
  const controllers = {};

  /* ---------- Renk ve Efsane (Legend) ---------- */
  function enColor(en) {
    if (en == null) return '#4b5568';
    const t = Math.max(0, Math.min(1, (en - 0.7) / (3.98 - 0.7)));
    // Mavi -> Camgöbeği -> Sarı -> Mercan
    const h = Math.round(215 - t * 195);
    const s = Math.round(78 + t * 15);
    const l = Math.round(52 + Math.sin(t * Math.PI) * 10);
    return `hsl(${h} ${s}% ${l}%)`;
  }

  function colorOf(el) {
    switch (state.colorMode) {
      case 'block': return BLOCK_COLORS[el.block];
      case 'phase': return PHASE_COLORS[el.phase] || PHASE_COLORS['?'];
      case 'en': return enColor(el.en);
      default: return CATS[el.cat].color;
    }
  }

  function subLabelOf(el) {
    if (state.colorMode === 'en') return el.en != null ? `EN ${String(el.en).replace('.', ',')}` : '—';
    if (state.colorMode === 'block') return `${el.block}-bloku`;
    if (state.colorMode === 'phase') return PHASES[el.phase];
    return el.massText;
  }

  function renderLegend() {
    const leg = $('legendBar');
    if (state.colorMode === 'cat') {
      leg.innerHTML = Object.entries(CATS).map(([k, v]) => `
        <button class="leg-chip ${state.activeFilter === k ? 'active' : ''}" data-filter="${k}" style="--c:${v.color}">
          <i></i><span>${v.name}</span>
        </button>`).join('');
    } else if (state.colorMode === 'block') {
      leg.innerHTML = ['s', 'p', 'd', 'f'].map((b) => `
        <button class="leg-chip ${state.activeFilter === b ? 'active' : ''}" data-filter="${b}" style="--c:${BLOCK_COLORS[b]}">
          <i></i><span>${b}-bloku</span>
        </button>`).join('');
    } else if (state.colorMode === 'phase') {
      leg.innerHTML = Object.entries(PHASES).map(([k, name]) => `
        <button class="leg-chip ${state.activeFilter === k ? 'active' : ''}" data-filter="${k}" style="--c:${PHASE_COLORS[k]}">
          <i></i><span>${name} (25 °C)</span>
        </button>`).join('');
    } else if (state.colorMode === 'en') {
      leg.innerHTML = `
        <div class="en-scale">
          <span>Düşük (0,70 · Fr)</span>
          <div class="en-bar"></div>
          <span>Yüksek (3,98 · F)</span>
        </div>`;
    }
  }

  function matchesFilter(el) {
    if (state.activeFilter) {
      if (state.colorMode === 'cat' && el.cat !== state.activeFilter) return false;
      if (state.colorMode === 'block' && el.block !== state.activeFilter) return false;
      if (state.colorMode === 'phase' && el.phase !== state.activeFilter) return false;
    }
    if (state.search) {
      const q = state.search.toLocaleLowerCase('tr');
      const hit =
        el.symbol.toLowerCase().includes(q) ||
        el.name.toLocaleLowerCase('tr').includes(q) ||
        el.nameEn.toLowerCase().includes(q) ||
        String(el.Z) === q;
      if (!hit) return false;
    }
    return true;
  }

  /* ---------- Periyodik Tablo Kurulumu ---------- */
  function buildPeriodicTable() {
    const grid = $('ptable');
    const parts = [];

    // Grup başlıkları (1..18)
    for (let g = 1; g <= 18; g++) {
      parts.push(`<div class="pt-group" style="grid-column:${g + 1};grid-row:1">${g}</div>`);
    }
    // Periyot başlıkları (1..7)
    for (let p = 1; p <= 7; p++) {
      parts.push(`<div class="pt-period" style="grid-column:1;grid-row:${p + 1}">${p}</div>`);
    }
    // Lantanit ve Aktinit satır etiketleri
    parts.push(`<div class="pt-f-label" style="grid-column:2/5;grid-row:10"><span>57–71</span> Lantanitler</div>`);
    parts.push(`<div class="pt-f-label" style="grid-column:2/5;grid-row:11"><span>89–103</span> Aktinitler</div>`);

    // 6. ve 7. periyot 3. grup yer tutucuları
    parts.push(`<div class="pt-placeholder" style="grid-column:4;grid-row:7" data-jump="57" title="Lantanitler (57–71)"><b>57–71</b><small>La–Lu</small></div>`);
    parts.push(`<div class="pt-placeholder" style="grid-column:4;grid-row:8" data-jump="89" title="Aktinitler (89–103)"><b>89–103</b><small>Ac–Lr</small></div>`);

    ELEMENTS.forEach((el) => {
      const col = el.col + 1;
      const row = el.row + 1;
      parts.push(`
        <button class="el-card" data-z="${el.Z}" style="grid-column:${col};grid-row:${row};--c:${colorOf(el)}">
          <div class="el-top">
            <span class="el-z">${el.Z}</span>
            <span class="el-shells">${el.shells.join('·')}</span>
          </div>
          <div class="el-sym">${el.symbol}</div>
          <div class="el-name">${el.name}</div>
          <div class="el-sub">${subLabelOf(el)}</div>
        </button>`);
    });

    grid.innerHTML = parts.join('');
    grid.classList.toggle('hide-shells', !state.showShells);

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.el-card');
      if (card) {
        selectElement(+card.dataset.z);
        if (window.innerWidth <= 1024) {
          const insp = document.querySelector('.inspector-pane');
          if (insp) insp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return;
      }
      const ph = e.target.closest('.pt-placeholder');
      if (ph) selectElement(+ph.dataset.jump);
    });
  }

  function updateTableVisuals() {
    const grid = $('ptable');
    grid.classList.toggle('hide-shells', !state.showShells);
    grid.querySelectorAll('.el-card').forEach((card) => {
      const el = ELEMENTS[+card.dataset.z - 1];
      card.style.setProperty('--c', colorOf(el));
      card.querySelector('.el-sub').textContent = subLabelOf(el);
      card.classList.toggle('selected', el.Z === state.selectedZ);
      card.classList.toggle('dim', !matchesFilter(el));
    });
  }

  /* ---------- Seçili Element ve İyon/İzotop Denetçisi ---------- */
  function selectElement(Z) {
    const el = ELEMENTS[Z - 1];
    if (!el) return;
    state.selectedZ = el.Z;
    state.charge = 0;
    state.neutrons = el.neutrons;
    updateTableVisuals();
    renderInspector();
  }

  function renderOrbitalBoxes(conf) {
    const active = ORDER.filter((s) => (conf[s] || 0) > 0);
    if (!active.length) return '<div class="muted">Elektron yok (çıplak çekirdek).</div>';
    return active.map((sub) => {
      const l = sub[1];
      const boxes = CAP[l] / 2;
      const n = conf[sub] || 0;
      const boxHtml = [];
      for (let b = 0; b < boxes; b++) {
        // Hund kuralı: önce her kutuya ↑, sonra ↓
        const up = n > b;
        const down = n > b + boxes;
        boxHtml.push(`<span class="orb-box ${up ? 'has-e' : ''}"><i>${up ? '↑' : ''}</i><i>${down ? '↓' : ''}</i></span>`);
      }
      return `
        <div class="subshell-box" style="--bc:${BLOCK_COLORS[l]}">
          <div class="sub-boxes">${boxHtml.join('')}</div>
          <div class="sub-lbl">${sub}<sup>${n}</sup></div>
        </div>`;
    }).join('');
  }

  function renderInspector() {
    const el = ELEMENTS[state.selectedZ - 1];
    const q = state.charge;
    const N = state.neutrons;
    const A = el.Z + N;
    const eCount = Math.max(0, el.Z - q);
    const conf = ionConfig(el.Z, q);
    const shells = shellsOf(conf);
    const cat = CATS[el.cat];

    // Üst başlık ve nüklit gösterimi
    $('inspBadge').style.setProperty('--c', cat.color);
    $('inspNuclide').innerHTML = `
      <span class="nuc-nums"><sup>${A}</sup><sub>${el.Z}</sub></span>
      <span class="nuc-sym">${el.symbol}</span>
      <sup class="nuc-q">${chargeStr(q)}</sup>`;
    $('inspTitle').textContent = el.name;
    $('inspSub').textContent = `${el.nameEn} · ${cat.name}`;

    // İyon / nötr durum etiketi
    const statusEl = $('inspStateTag');
    if (q === 0 && N === el.neutrons) {
      statusEl.textContent = 'Nötr Atom · En Yaygın İzotop';
      statusEl.className = 'state-tag neutral';
    } else if (q > 0) {
      statusEl.textContent = `Katyon (${chargeStr(q)}) · ${q} elektron verdi`;
      statusEl.className = 'state-tag cation';
    } else if (q < 0) {
      statusEl.textContent = `Anyon (${chargeStr(q)}) · ${-q} elektron aldı`;
      statusEl.className = 'state-tag anion';
    } else {
      statusEl.textContent = `${el.name}-${A} İzotopu`;
      statusEl.className = 'state-tag isotope';
    }

    // Tanecik sayaçları
    $('pCount').textContent = el.Z;
    $('nCount').textContent = N;
    $('eCount').textContent = eCount;
    $('qText').textContent = q === 0 ? '0' : (q > 0 ? `+${q}` : `${q}`);

    // Tipik iyon kısayolları
    const ions = typicalIons(el.symbol);
    const ionBar = $('ionPresets');
    const chips = [`<button class="ion-chip ${q === 0 ? 'active' : ''}" data-q="0">${el.symbol} (nötr)</button>`];
    ions.forEach((iq) => {
      chips.push(`<button class="ion-chip ${q === iq ? 'active' : ''}" data-q="${iq}">${el.symbol}<sup>${chargeStr(iq)}</sup></button>`);
    });
    ionBar.innerHTML = chips.join('');

    // Elektron dizilimi ve katmanlar
    $('cfgText').textContent = configString(conf, state.shortConfig);
    const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    $('shellPills').innerHTML = shells.length
      ? shells.map((c, i) => `<span class="shell-pill"><small>${shellNames[i]} (n=${i + 1})</small><b>${c}e⁻</b></span>`).join('')
      : '<span class="muted">Elektron yok</span>';

    $('orbitalDiagram').innerHTML = renderOrbitalBoxes(conf);

    // Özellikler tablosu ve günlük kullanım alanı
    const USES = {
      H: 'Su molekülü, roket yakıtı, amonyak üretimi ve yıldızların ana yakıtı.',
      He: 'Uçan balonlar, MR cihazı süperiletken soğutması ve dalgıç tüpleri.',
      Li: 'Telefon, dizüstü bilgisayar ve elektrikli araç bataryaları.',
      Be: 'Uzay teleskopları (James Webb aynaları) ve X-ışını pencereleri.',
      B: 'Isıya dayanıklı borosilikat laboratuvar camları (Pyrex) ve deterjanlar.',
      C: 'Elmas, grafit, organik yaşam molekülleri, çelik ve karbon fiber.',
      N: 'Atmosferin %78’i, tarımsal gübreler ve sıvı azotla dondurma.',
      O: 'Hücresel solunum, yanma tepkimeleri, çelik üretimi ve tıbbi destek.',
      F: 'Diş macunları (florür) ve yapışmaz Teflon kaplamalar.',
      Ne: 'Parlak kırmızı-turuncu ışıklı reklam tabelaları ve lazerler.',
      Na: 'Sofra tuzu (NaCl), sokak lambaları ve sinir uyarı iletimi.',
      Mg: 'Hafif uçak/otomobil alaşımları, işaret fişekleri ve klorofil.',
      Al: 'İçecek kutuları, uçak gövdeleri, mutfak folyosu ve elektrik hatları.',
      Si: 'Bilgisayar mikroçipleri, güneş panelleri, cam ve kuvars kristalleri.',
      P: 'DNA/ATP yapısı, kibrit başları ve tarımsal fosfat gübreleri.',
      S: 'Sülfürik asit üretimi, kauçuk vulkanizasyonu ve barut.',
      Cl: 'İçme suyu/havuz dezenfeksiyonu, PVC borular ve sofra tuzu.',
      Ar: 'Akkor ampuller, ark kaynağı koruyucu gazı ve çift cam yalıtımı.',
      K: 'Bitki gübreleri, kalp-kas fonksiyonu ve sıvı sabun üretimi.',
      Ca: 'Kemik ve diş yapısı, kireçtaşı, mermer ve çimento.',
      Ti: 'Ortopedik implantlar, uçak motorları ve beyaz boya pigmenti (TiO₂).',
      Cr: 'Paslanmaz çelik ve parlak krom kaplamalar.',
      Fe: 'Çelik köprüler ve binalar, kandaki hemoglobin ile oksijen taşıma.',
      Co: 'Şarj edilebilir pil katotları, mıknatıslar ve mavi seramik boyası.',
      Ni: 'Madeni paralar, paslanmaz çelik ve şarjlı piller.',
      Cu: 'Elektrik kabloları, motor sargıları, bronz ve pirinç alaşımları.',
      Zn: 'Demirin paslanmasını önleyen galvaniz kaplama ve güneş kremleri.',
      Ag: 'Mücevherat, ayna kaplaması ve en yüksek elektrik/ısı iletkeni.',
      Sn: 'Konserve kutusu kaplaması ve elektronik lehim alaşımı.',
      I: 'Tiroid hormonları, tentürdiyot antiseptik ve fotoğrafçılık.',
      Xe: 'Yüksek güçlü otomobil farları ve uzay aracı iyon motorları.',
      Pt: 'Otomobil katalitik konvertörleri, laboratuvar elektrotları ve takı.',
      Au: 'Mücevherat, korozyona uğramayan elektronik devre kontakları.',
      Hg: 'Eski termometreler, barometreler ve floresan lambalar.',
      Pb: 'Otomobil aküleri ve X-ışını radyasyon koruyucu önlükler.',
      U: 'Nükleer enerji santrallerinde elektrik üretimi.',
    };
    const val = valenceOf(el);
    const everyday = USES[el.symbol] || `${CATS[el.cat].name} grubunda yer alır; bilimsel araştırmalar ve özel alaşım/endüstri uygulamalarında kullanılır.`;
    $('propGrid').innerHTML = `
      <div><span>Atom Numarası (Z)</span><b>${el.Z}</b></div>
      <div><span>Kütle Numarası (A)</span><b>${A} (${el.massText} u)</b></div>
      <div><span>Grup / Periyot</span><b>${el.group ? `${el.group}. Grup` : 'f-bloku'} · ${el.period}. Periyot</b></div>
      <div><span>Orbital Bloku</span><b>${el.block}-bloku</b></div>
      <div><span>Fiziksel Hal (25 °C)</span><b>${PHASES[el.phase]}</b></div>
      <div><span>Elektronegatiflik</span><b>${el.en != null ? String(el.en).replace('.', ',') : '—'}</b></div>
      <div><span>Değerlik Elektronu</span><b>${val != null ? val : shells[shells.length - 1] || 0}</b></div>
      <div><span>Tipik İyon Yükleri</span><b>${ions.length ? ions.map((x) => (x > 0 ? `+${x}` : x)).join(', ') : '—'}</b></div>
      <div style="grid-column:1/-1;"><span>Günlük Hayatta Kullanımı</span><b>${everyday}</b></div>
    `;

    // 3D Atom modeli güncelle
    if (!atomModel) atomModel = new AtomModel($('atomViewer'));
    atomModel.set(el.Z, N, shells);
  }

  /* ---------- Sekme (Tab) Geçişleri ---------- */
  function switchTab(tab) {
    state.activeTab = tab;
    document.querySelectorAll('.nav-tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${tab}`);
    });

    // Yalnızca aktif sekmenin 3D/fizik döngüsünü çalıştır
    if (atomModel) atomModel.setRunning(tab === 'table');

    if (tab === 'orbitals' && !controllers.orbitals) {
      controllers.orbitals = Orbitals.init($('orbList'), $('orbViewer'), $('orbCaption'));
    }
    if (controllers.orbitals) controllers.orbitals.setRunning(tab === 'orbitals');

    if (tab === 'vsepr' && !controllers.vsepr) {
      controllers.vsepr = VSEPR.init($('view-vsepr'));
    }
    if (controllers.vsepr) controllers.vsepr.setRunning(tab === 'vsepr');

    if (tab === 'molstudio' && !controllers.molstudio) {
      controllers.molstudio = MolStudio.init($('view-molstudio'));
    }
    if (controllers.molstudio) controllers.molstudio.setRunning(tab === 'molstudio');

    if (tab === 'equipment' && !controllers.equipment) {
      LabEquipment.init($('view-equipment'));
      controllers.equipment = true;
    }

    if (tab === 'lab' && !controllers.lab) {
      controllers.lab = VirtualLab.init($('view-lab'));
    }
    if (controllers.lab) controllers.lab.setRunning(tab === 'lab');

    if (tab === 'research' && !controllers.research && window.ResearchLab) {
      controllers.research = ResearchLab.init($('view-research'));
    }
    if (controllers.research && controllers.research.setRunning) {
      controllers.research.setRunning(tab === 'research');
    }
  }

  /* ---------- Başlangıç ve Olay Dinleyicileri ---------- */
  function init() {
    renderLegend();
    buildPeriodicTable();
    selectElement(state.selectedZ);

    // Diğer kimya araçlarını hazırla
    Tools.initMolar();
    Tools.initBalance();
    Tools.initSolubility();
    Tools.initWorksheet();

    // Sekme butonları
    document.querySelector('.main-nav').addEventListener('click', (e) => {
      const b = e.target.closest('.nav-tab');
      if (b) {
        switchTab(b.dataset.tab);
        if (b.scrollIntoView) {
          b.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });

    // URL'de #model/... (ör. #model/l) varsa doğrudan Molekül Şekilleri (VSEPR) sekmesini aç
    if (location.hash.startsWith('#model/')) {
      switchTab('vsepr');
    }

    // Renk modu seçimi
    $('colorModes').addEventListener('click', (e) => {
      const b = e.target.closest('[data-mode]');
      if (!b) return;
      state.colorMode = b.dataset.mode;
      state.activeFilter = null;
      $('colorModes').querySelectorAll('[data-mode]').forEach((x) => x.classList.toggle('active', x === b));
      renderLegend();
      updateTableVisuals();
    });

    // Legend filtreleme
    $('legendBar').addEventListener('click', (e) => {
      const chip = e.target.closest('.leg-chip');
      if (!chip) return;
      const f = chip.dataset.filter;
      state.activeFilter = state.activeFilter === f ? null : f;
      renderLegend();
      updateTableVisuals();
    });

    // Arama kutusu
    const searchInput = $('searchInput');
    searchInput.addEventListener('input', () => {
      state.search = searchInput.value.trim();
      updateTableVisuals();
    });

    // Açık / Koyu Tema (Dark-Light Mode Switcher)
    const themeBtn = $('themeToggleBtn');
    const applyTheme = (theme) => {
      document.documentElement.dataset.theme = theme;
      if (themeBtn) {
        themeBtn.textContent = theme === 'light' ? '🌙 Koyu Tema' : '☀️ Açık Tema';
        themeBtn.classList.toggle('active', theme === 'light');
      }
      try { localStorage.setItem('affelab_theme', theme); } catch (_) {}
    };
    let savedTheme = 'dark';
    try { savedTheme = localStorage.getItem('affelab_theme') || 'dark'; } catch (_) {}
    applyTheme(savedTheme);
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    }

    // Katman sayıları görünümü (Zperiod v3.3.0 özelliği)
    $('toggleShellsBtn').addEventListener('click', (e) => {
      state.showShells = !state.showShells;
      e.currentTarget.classList.toggle('active', state.showShells);
      updateTableVisuals();
    });

    // Tam ekran butonu
    $('fullscreenBtn').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // İyon yükü ve nötron kontrolleri
    $('eMinus').addEventListener('click', () => {
      const el = ELEMENTS[state.selectedZ - 1];
      if (el.Z - state.charge > 0) { state.charge++; renderInspector(); }
    });
    $('ePlus').addEventListener('click', () => {
      if (state.charge > -4) { state.charge--; renderInspector(); }
    });
    $('nMinus').addEventListener('click', () => {
      if (state.neutrons > 0) { state.neutrons--; renderInspector(); }
    });
    $('nPlus').addEventListener('click', () => {
      state.neutrons++; renderInspector();
    });
    $('resetAtomBtn').addEventListener('click', () => {
      const el = ELEMENTS[state.selectedZ - 1];
      state.charge = 0;
      state.neutrons = el.neutrons;
      renderInspector();
    });
    $('ionPresets').addEventListener('click', (e) => {
      const b = e.target.closest('.ion-chip');
      if (!b) return;
      state.charge = +b.dataset.q;
      renderInspector();
    });

    // Kısa / Tam elektron dizilimi geçişi
    $('cfgToggle').addEventListener('click', (e) => {
      state.shortConfig = !state.shortConfig;
      e.currentTarget.textContent = state.shortConfig ? 'Tam Yazım' : 'Soy Gaz Kısaltması';
      renderInspector();
    });

    // Klavye kısayolları: / arama, Sol/Sağ ok ile element değiştirme
    window.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea')) {
        if (e.key === 'Escape') e.target.blur();
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        searchInput.focus();
      } else if (state.activeTab === 'table' && e.key === 'ArrowRight') {
        selectElement(state.selectedZ < 118 ? state.selectedZ + 1 : 1);
      } else if (state.activeTab === 'table' && e.key === 'ArrowLeft') {
        selectElement(state.selectedZ > 1 ? state.selectedZ - 1 : 118);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
