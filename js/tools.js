/* Elementa — kimya araçları: mol kütlesi, denklem denkleştirme, çözünürlük, çalışma kâğıdı */
(function () {
  'use strict';
  const { bySymbol, CATS } = Chem;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dec = (n, d) => n.toFixed(d).replace('.', ',');
  const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const lcm = (a, b) => (a && b ? Math.abs(a * b) / gcd(a, b) : a || b);

  function fmtFormula(f) {
    return esc(f).replace(/[*•.]/g, '·').replace(/([A-Za-z)\]])(\d+)/g, '$1<sub>$2</sub>');
  }

  /* ---------- Formül çözümleyici ---------- */
  function parseFormula(str) {
    const s = String(str).replace(/\s+/g, '').replace(/[*•.]/g, '·');
    if (!s) throw new Error('Formül boş.');
    const total = {};
    const order = [];
    const add = (el, n) => {
      if (!(el in total)) { total[el] = 0; order.push(el); }
      total[el] += n;
    };
    for (const part of s.split('·')) {
      if (!part) throw new Error('Hidrat yazımı hatalı (ör. CuSO4·5H2O).');
      const m = part.match(/^(\d+)(.*)$/);
      const coef = m ? +m[1] : 1;
      const body = m ? m[2] : part;
      if (!body) throw new Error('Katsayıdan sonra formül bekleniyor.');
      let i = 0;
      const num = () => {
        let d = '';
        while (i < body.length && /\d/.test(body[i])) d += body[i++];
        return d ? +d : 1;
      };
      const group = (depth) => {
        const counts = [];
        while (i < body.length) {
          const ch = body[i];
          if (ch === '(' || ch === '[') {
            i++;
            const inner = group(depth + 1);
            if (body[i] !== ')' && body[i] !== ']') throw new Error('Kapanmamış parantez var.');
            i++;
            const n = num();
            inner.forEach(([e, k]) => counts.push([e, k * n]));
          } else if (ch === ')' || ch === ']') {
            if (depth === 0) throw new Error('Fazladan kapanış parantezi var.');
            return counts;
          } else if (/[A-Z]/.test(ch)) {
            let sym = ch;
            i++;
            if (i < body.length && /[a-z]/.test(body[i])) sym += body[i++];
            if (!bySymbol[sym]) throw new Error(`Bilinmeyen element: “${sym}”. Sembollerin ilk harfi büyük olmalı.`);
            counts.push([sym, num()]);
          } else {
            throw new Error(`Beklenmeyen karakter: “${ch}”.`);
          }
        }
        if (depth > 0) throw new Error('Kapanmamış parantez var.');
        return counts;
      };
      group(0).forEach(([e, k]) => add(e, k * coef));
    }
    return { counts: total, order };
  }

  function molarMass(formula) {
    const { counts, order } = parseFormula(formula);
    let total = 0;
    const rows = order.map((sym) => {
      const el = bySymbol[sym];
      const sub = el.mass * counts[sym];
      total += sub;
      return { el, count: counts[sym], sub };
    });
    rows.forEach((r) => { r.pct = (r.sub / total) * 100; });
    return { total, rows };
  }

  /* ---------- Denklem denkleştirici ---------- */
  function nullVector(M, cols) {
    const A = M.map((r) => r.slice());
    const rows = A.length;
    const pivots = [];
    const reduceRow = (row) => {
      let g = 0;
      for (const v of row) g = gcd(g, v);
      if (g > 1) for (let k = 0; k < row.length; k++) row[k] /= g;
    };
    let r = 0;
    for (let c = 0; c < cols && r < rows; c++) {
      let p = -1;
      for (let i = r; i < rows; i++) if (A[i][c] !== 0) { p = i; break; }
      if (p < 0) continue;
      [A[r], A[p]] = [A[p], A[r]];
      for (let i = 0; i < rows; i++) {
        if (i === r || A[i][c] === 0) continue;
        const a = A[r][c], b = A[i][c];
        for (let k = 0; k < cols; k++) A[i][k] = A[i][k] * a - A[r][k] * b;
        reduceRow(A[i]);
      }
      pivots.push(c);
      r++;
    }
    const free = [];
    for (let c = 0; c < cols; c++) if (!pivots.includes(c)) free.push(c);
    if (free.length === 0) throw new Error('Bu denklem denkleştirilemiyor. Formülleri kontrol et.');
    if (free.length > 1) throw new Error('Denklemin birden fazla bağımsız çözümü var; tek bir tepkime yazmayı dene.');
    const f = free[0];
    let L = 1;
    pivots.forEach((c, i) => { L = lcm(L, Math.abs(A[i][c])); });
    let x = new Array(cols).fill(0);
    x[f] = L;
    pivots.forEach((c, i) => { x[c] = (-A[i][f] * L) / A[i][c]; });
    const g = x.reduce((a, b) => gcd(a, b), 0);
    x = x.map((v) => v / g);
    if (x.every((v) => v <= 0)) x = x.map((v) => -v);
    if (x.some((v) => v <= 0)) throw new Error('Pozitif katsayılarla denkleştirilemiyor. Girenleri ve ürünleri kontrol et.');
    return x;
  }

  function balance(eq) {
    const sides = String(eq).split(/->|→|⟶|=>|=/);
    if (sides.length !== 2) throw new Error('Denklemde tek bir ok ( -> ) veya = işareti olmalı.');
    const [L, R] = sides.map((side) => side.split('+').map((t) => t.trim()).filter(Boolean)
      .map((t) => t.replace(/^\d+\s*(?=[A-Z([])/, '')));
    if (!L.length || !R.length) throw new Error('Her iki tarafta da en az bir madde olmalı.');
    const species = [...L, ...R];
    const parsed = species.map((s) => parseFormula(s));
    const els = [];
    parsed.forEach((p) => p.order.forEach((e) => { if (!els.includes(e)) els.push(e); }));
    for (const e of els) {
      const inL = parsed.slice(0, L.length).some((p) => p.counts[e]);
      const inR = parsed.slice(L.length).some((p) => p.counts[e]);
      if (!inL || !inR) throw new Error(`${e} elementi yalnızca bir tarafta bulunuyor; denklem denkleştirilemez.`);
    }
    const M = els.map((e) => species.map((_, j) => (parsed[j].counts[e] || 0) * (j < L.length ? 1 : -1)));
    const coeffs = nullVector(M, species.length);
    return { L, R, coeffs, els, parsed };
  }

  function fmtBalanced(r) {
    const term = (f, c) => `${c > 1 ? `<b class="coef">${c}</b>` : ''}${fmtFormula(f)}`;
    const left = r.L.map((f, i) => term(f, r.coeffs[i])).join(' + ');
    const right = r.R.map((f, i) => term(f, r.coeffs[r.L.length + i])).join(' + ');
    return `${left} <span class="arrow">→</span> ${right}`;
  }

  /* ---------- Arayüz: Mol kütlesi ---------- */
  function initMolar() {
    const input = $('molarInput'), out = $('molarResult'), ex = $('molarExamples');
    const EX = ['H2O', 'NaCl', 'H2SO4', 'CaCO3', 'C6H12O6', 'Ca(OH)2', 'Al2(SO4)3', 'CuSO4·5H2O', 'KMnO4', '(NH4)3PO4'];
    ex.innerHTML = EX.map((f) => `<button class="chip-btn" data-f="${esc(f)}">${fmtFormula(f)}</button>`).join('');
    ex.addEventListener('click', (e) => {
      const b = e.target.closest('[data-f]');
      if (!b) return;
      input.value = b.dataset.f;
      run();
    });
    input.addEventListener('input', run);

    function run() {
      const v = input.value.trim();
      if (!v) { out.innerHTML = ''; return; }
      try {
        const r = molarMass(v);
        out.innerHTML = `
          <div class="big-result">
            <span class="formula">${fmtFormula(v)}</span><span class="eq">=</span>
            <b>${dec(r.total, 3)}</b><span class="unit">g/mol</span>
          </div>
          <table class="data-table">
            <thead><tr><th>Element</th><th>Adet</th><th>Atom kütlesi</th><th>Toplam</th><th>Kütle %</th></tr></thead>
            <tbody>${r.rows.map((row) => `
              <tr>
                <td><span class="el-badge" style="--c:${CATS[row.el.cat].color}">${row.el.symbol}</span>${row.el.name}</td>
                <td>${row.count}</td>
                <td>${dec(row.el.mass, 3)}</td>
                <td>${dec(row.sub, 3)}</td>
                <td><div class="pct"><div class="pct-bar"><i style="width:${row.pct}%;background:${CATS[row.el.cat].color}"></i></div><span>%${dec(row.pct, 2)}</span></div></td>
              </tr>`).join('')}
            </tbody>
          </table>`;
      } catch (err) {
        out.innerHTML = `<div class="error">${esc(err.message)}</div>`;
      }
    }
    run();
    return {};
  }

  /* ---------- Arayüz: Denkleştirici ---------- */
  function initBalance() {
    const input = $('balanceInput'), out = $('balanceResult'), ex = $('balanceExamples');
    const EX = ['H2 + O2 -> H2O', 'Fe + O2 -> Fe2O3', 'C3H8 + O2 -> CO2 + H2O', 'KClO3 -> KCl + O2', 'Al + HCl -> AlCl3 + H2', 'Cu + HNO3 -> Cu(NO3)2 + NO + H2O'];
    ex.innerHTML = EX.map((q) => `<button class="chip-btn mono" data-q="${esc(q)}">${esc(q)}</button>`).join('');
    ex.addEventListener('click', (e) => {
      const b = e.target.closest('[data-q]');
      if (!b) return;
      input.value = b.dataset.q;
      run();
    });
    $('balanceBtn').addEventListener('click', run);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });

    function run() {
      try {
        const r = balance(input.value);
        const sideCount = (e, from, to) => r.parsed.slice(from, to)
          .reduce((s, p, i) => s + (p.counts[e] || 0) * r.coeffs[from + i], 0);
        out.innerHTML = `
          <div class="big-result eq-result">${fmtBalanced(r)}</div>
          <table class="data-table">
            <thead><tr><th>Element</th><th>Girenler</th><th>Ürünler</th><th></th></tr></thead>
            <tbody>${r.els.map((e) => {
              const a = sideCount(e, 0, r.L.length), b = sideCount(e, r.L.length, r.coeffs.length);
              return `<tr><td><span class="el-badge" style="--c:${CATS[bySymbol[e].cat].color}">${e}</span>${bySymbol[e].name}</td><td>${a}</td><td>${b}</td><td class="${a === b ? 'ok' : 'bad'}">${a === b ? '✓ Korundu' : '✗'}</td></tr>`;
            }).join('')}</tbody>
          </table>`;
      } catch (err) {
        out.innerHTML = `<div class="error">${esc(err.message)}</div>`;
      }
    }
    run();
    return {};
  }

  /* ---------- Arayüz: Çözünürlük tablosu ---------- */
  const CATIONS = [
    { f: 'Li', q: 1, n: 'Lityum' }, { f: 'Na', q: 1, n: 'Sodyum' }, { f: 'K', q: 1, n: 'Potasyum' },
    { f: 'NH4', q: 1, n: 'Amonyum', poly: true }, { f: 'Mg', q: 2, n: 'Magnezyum' }, { f: 'Ca', q: 2, n: 'Kalsiyum' },
    { f: 'Ba', q: 2, n: 'Baryum' }, { f: 'Al', q: 3, n: 'Alüminyum' }, { f: 'Mn', q: 2, n: 'Mangan(II)' },
    { f: 'Fe', q: 2, n: 'Demir(II)', id: 'Fe2' }, { f: 'Fe', q: 3, n: 'Demir(III)', id: 'Fe3' },
    { f: 'Cu', q: 2, n: 'Bakır(II)' }, { f: 'Zn', q: 2, n: 'Çinko' }, { f: 'Ag', q: 1, n: 'Gümüş' }, { f: 'Pb', q: 2, n: 'Kurşun(II)' },
  ];
  const ANIONS = [
    { f: 'NO3', q: -1, n: 'nitrat', poly: true }, { f: 'CH3COO', q: -1, n: 'asetat', poly: true },
    { f: 'Cl', q: -1, n: 'klorür' }, { f: 'Br', q: -1, n: 'bromür' }, { f: 'I', q: -1, n: 'iyodür' },
    { f: 'SO4', q: -2, n: 'sülfat', poly: true }, { f: 'CO3', q: -2, n: 'karbonat', poly: true },
    { f: 'PO4', q: -3, n: 'fosfat', poly: true }, { f: 'OH', q: -1, n: 'hidroksit', poly: true }, { f: 'S', q: -2, n: 'sülfür' },
  ];
  const SOL = {
    S: { label: 'Çözünür', cls: 'sol-s' },
    A: { label: 'Az çözünür', cls: 'sol-a' },
    I: { label: 'Çözünmez', cls: 'sol-i' },
    X: { label: 'Suda bozunur / kararsız', cls: 'sol-x' },
  };

  function solubility(c, a) {
    const id = c.id || c.f;
    const g1 = ['Li', 'Na', 'K', 'NH4'].includes(id);
    switch (a.f) {
      case 'NO3': return 'S';
      case 'CH3COO': return id === 'Ag' ? 'A' : 'S';
      case 'Cl': case 'Br': return id === 'Ag' ? 'I' : id === 'Pb' ? 'A' : 'S';
      case 'I': return id === 'Ag' || id === 'Pb' ? 'I' : 'S';
      case 'SO4': return id === 'Ba' || id === 'Pb' ? 'I' : id === 'Ca' || id === 'Ag' ? 'A' : 'S';
      case 'CO3': return id === 'Li' ? 'A' : g1 ? 'S' : id === 'Al' || id === 'Fe3' ? 'X' : 'I';
      case 'PO4': return id === 'Li' ? 'A' : g1 ? 'S' : 'I';
      case 'OH': return g1 || id === 'Ba' ? 'S' : id === 'Ca' ? 'A' : id === 'Ag' ? 'X' : 'I';
      case 'S': return g1 ? 'S' : id === 'Mg' || id === 'Al' ? 'X' : id === 'Ca' || id === 'Ba' ? 'A' : 'I';
      default: return 'S';
    }
  }

  const ionHtml = (ion) => `${fmtFormula(ion.f)}<sup>${Chem.chargeStr(ion.q)}</sup>`;

  function ionicFormula(c, a) {
    const l = lcm(c.q, Math.abs(a.q));
    const part = (ion, n) => (n === 1 ? ion.f : ion.poly ? `(${ion.f})${n}` : `${ion.f}${n}`);
    return part(c, l / c.q) + part(a, l / Math.abs(a.q));
  }

  function initSolubility() {
    const table = $('solTable'), info = $('solInfo');
    table.innerHTML = `
      <thead><tr><th class="corner">Katyon \\ Anyon</th>${ANIONS.map((a) => `<th><span class="ion">${ionHtml(a)}</span><small>${a.n}</small></th>`).join('')}</tr></thead>
      <tbody>${CATIONS.map((c, ci) => `
        <tr><th><span class="ion">${ionHtml(c)}</span><small>${c.n}</small></th>
        ${ANIONS.map((a, ai) => { const s = solubility(c, a); return `<td class="${SOL[s].cls}" data-c="${ci}" data-a="${ai}" title="${SOL[s].label}">${s === 'X' ? '—' : s === 'S' ? 'Ç' : s === 'A' ? 'A' : 'Ç̶'}</td>`; }).join('')}
        </tr>`).join('')}
      </tbody>`;
    $('solLegend').innerHTML = Object.values(SOL).map((s) => `<span class="${s.cls}"><i></i>${s.label}</span>`).join('');

    table.addEventListener('click', (e) => {
      const td = e.target.closest('td[data-c]');
      if (!td) return;
      table.querySelectorAll('td.sel').forEach((x) => x.classList.remove('sel'));
      td.classList.add('sel');
      const c = CATIONS[+td.dataset.c], a = ANIONS[+td.dataset.a];
      const s = solubility(c, a);
      const f = ionicFormula(c, a);
      let mm = '';
      try { mm = `${dec(molarMass(f).total, 2)} g/mol`; } catch (err) { mm = '—'; }
      info.innerHTML = `
        <div class="sol-card ${SOL[s].cls}">
          <div class="sol-formula">${fmtFormula(f)}</div>
          <div><b>${c.n} ${a.n}</b><span class="sol-status">${SOL[s].label}</span></div>
          <div class="muted">${ionHtml(c)} + ${ionHtml(a)} · Mol kütlesi: ${mm}</div>
        </div>`;
    });
    return {};
  }

  /* ---------- Arayüz: Çalışma kâğıdı ---------- */
  const WS_FORMULAS = ['H2O', 'CO2', 'NaCl', 'H2SO4', 'HNO3', 'NH3', 'CH4', 'CaCO3', 'NaOH', 'KOH', 'Ca(OH)2', 'Mg(OH)2', 'Al2O3', 'Fe2O3', 'CuSO4', 'KMnO4', 'NaHCO3', 'C6H12O6', 'C2H5OH', '(NH4)2SO4', 'Al2(SO4)3', 'Na2CO3', 'MgCl2', 'H3PO4', 'CuSO4·5H2O'];
  const WS_EQ = ['H2 + O2 -> H2O', 'N2 + H2 -> NH3', 'CH4 + O2 -> CO2 + H2O', 'Fe + O2 -> Fe2O3', 'Al + O2 -> Al2O3', 'C3H8 + O2 -> CO2 + H2O', 'Na + H2O -> NaOH + H2', 'KClO3 -> KCl + O2', 'Fe2O3 + CO -> Fe + CO2', 'Al + HCl -> AlCl3 + H2', 'C2H6 + O2 -> CO2 + H2O', 'Ca(OH)2 + HCl -> CaCl2 + H2O', 'Zn + HCl -> ZnCl2 + H2', 'P4 + O2 -> P4O10', 'Cu + AgNO3 -> Cu(NO3)2 + Ag', 'C6H12O6 + O2 -> CO2 + H2O', 'NH3 + O2 -> NO + H2O', 'Mg + N2 -> Mg3N2'];

  const nuclide = (A, Z, sym, q) => `<span class="nuclide"><span class="nz"><span>${A}</span><span>${Z}</span></span>${sym}${q ? Chem.chargeStr(q) : ''}</span>`;

  const GENS = {
    molar() {
      const f = rnd(WS_FORMULAS);
      return { key: `m${f}`, q: `${fmtFormula(f)} bileşiğinin mol kütlesini hesaplayınız.`, a: `${dec(molarMass(f).total, 2)} g/mol` };
    },
    particles() {
      const el = Chem.ELEMENTS[Math.floor(Math.random() * 56)];
      const ions = Chem.typicalIons(el.symbol);
      const q = ions.length && Math.random() < 0.5 ? rnd(ions) : 0;
      const A = el.Z + el.neutrons;
      return {
        key: `p${el.Z}_${q}`,
        q: `${nuclide(A, el.Z, el.symbol, q)} ${q ? 'iyonundaki' : 'atomundaki'} proton, nötron ve elektron sayılarını bulunuz.`,
        a: `p = ${el.Z}, n = ${el.neutrons}, e = ${el.Z - q}`,
      };
    },
    config() {
      const el = Chem.ELEMENTS[Math.floor(Math.random() * 36)];
      return { key: `c${el.Z}`, q: `<b>${el.name}</b> (Z = ${el.Z}) atomunun elektron dizilimini yazınız.`, a: Chem.configString(el.config, false) };
    },
    symbol() {
      const pool = Chem.ELEMENTS.slice(0, 56).concat(['Pt', 'Au', 'Hg', 'Pb', 'U'].map((s) => bySymbol[s]));
      const el = rnd(pool);
      if (Math.random() < 0.5) return { key: `s1${el.Z}`, q: `Sembolü <b>${el.symbol}</b> olan elementin adı nedir?`, a: el.name };
      return { key: `s2${el.Z}`, q: `<b>${el.name}</b> elementinin sembolü nedir?`, a: el.symbol };
    },
    balance() {
      const eq = rnd(WS_EQ);
      const r = balance(eq);
      const blank = (f) => `<span class="blank"></span>${fmtFormula(f)}`;
      return {
        key: `b${eq}`,
        q: `Aşağıdaki denklemi denkleştiriniz:<div class="eq-q">${r.L.map(blank).join(' + ')} → ${r.R.map(blank).join(' + ')}</div>`,
        a: fmtBalanced(r),
      };
    },
  };

  function initWorksheet() {
    const sheet = $('wsSheet');

    function generate() {
      const types = Array.from(document.querySelectorAll('#wsTypes input:checked')).map((i) => i.value);
      if (!types.length) {
        sheet.innerHTML = '<p class="muted">En az bir soru türü seç.</p>';
        return;
      }
      const count = Math.max(3, Math.min(40, parseInt($('wsCount').value, 10) || 10));
      const seen = new Set();
      const qs = [];
      let tries = 0;
      while (qs.length < count && tries < count * 25) {
        tries++;
        const q = GENS[types[qs.length % types.length]]();
        if (seen.has(q.key)) continue;
        seen.add(q.key);
        qs.push(q);
      }
      const title = esc($('wsTitle').value || 'Kimya Alıştırmaları');
      sheet.innerHTML = `
        <div class="sheet-head">
          <h2>${title}</h2>
          <div class="sheet-meta"><span>Ad Soyad: <i></i></span><span>Sınıf: <i class="short"></i></span><span>Tarih: <i class="short"></i></span></div>
        </div>
        <ol class="ws-list">${qs.map((q) => `<li><div class="q">${q.q}</div><div class="ans-line"></div><div class="ans"><b>Cevap:</b> ${q.a}</div></li>`).join('')}</ol>
        <div class="sheet-foot">affeLab ile oluşturuldu</div>`;
    }

    $('wsGenerate').addEventListener('click', generate);
    $('wsAnswers').addEventListener('change', (e) => sheet.classList.toggle('show-answers', e.target.checked));
    $('wsPrint').addEventListener('click', () => {
      if (!sheet.querySelector('ol')) generate();
      const pa = $('printArea');
      pa.innerHTML = `<div class="sheet ${sheet.classList.contains('show-answers') ? 'show-answers' : ''}">${sheet.innerHTML}</div>`;
      document.body.classList.add('printing');
      const done = () => { document.body.classList.remove('printing'); window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      window.print();
      setTimeout(done, 500);
    });
    generate();
    return {};
  }

  window.Tools = { parseFormula, molarMass, balance, fmtFormula, initMolar, initBalance, initSolubility, initWorksheet };
})();
