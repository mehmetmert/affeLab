/* Elementa — element verileri ve kimya yardımcıları */
(function () {
  'use strict';

  // Sembol | Türkçe ad | İngilizce ad | Atom kütlesi | Kategori | Elektronegatiflik | Hal (25 °C)
  const RAW = `H|Hidrojen|Hydrogen|1.008|nm|2.20|g
He|Helyum|Helium|4.0026|ng||g
Li|Lityum|Lithium|6.94|am|0.98|s
Be|Berilyum|Beryllium|9.0122|ae|1.57|s
B|Bor|Boron|10.81|md|2.04|s
C|Karbon|Carbon|12.011|nm|2.55|s
N|Azot|Nitrogen|14.007|nm|3.04|g
O|Oksijen|Oxygen|15.999|nm|3.44|g
F|Flor|Fluorine|18.998|hl|3.98|g
Ne|Neon|Neon|20.180|ng||g
Na|Sodyum|Sodium|22.990|am|0.93|s
Mg|Magnezyum|Magnesium|24.305|ae|1.31|s
Al|Alüminyum|Aluminium|26.982|pt|1.61|s
Si|Silisyum|Silicon|28.085|md|1.90|s
P|Fosfor|Phosphorus|30.974|nm|2.19|s
S|Kükürt|Sulfur|32.06|nm|2.58|s
Cl|Klor|Chlorine|35.45|hl|3.16|g
Ar|Argon|Argon|39.948|ng||g
K|Potasyum|Potassium|39.098|am|0.82|s
Ca|Kalsiyum|Calcium|40.078|ae|1.00|s
Sc|Skandiyum|Scandium|44.956|tm|1.36|s
Ti|Titanyum|Titanium|47.867|tm|1.54|s
V|Vanadyum|Vanadium|50.942|tm|1.63|s
Cr|Krom|Chromium|51.996|tm|1.66|s
Mn|Mangan|Manganese|54.938|tm|1.55|s
Fe|Demir|Iron|55.845|tm|1.83|s
Co|Kobalt|Cobalt|58.933|tm|1.88|s
Ni|Nikel|Nickel|58.693|tm|1.91|s
Cu|Bakır|Copper|63.546|tm|1.90|s
Zn|Çinko|Zinc|65.38|tm|1.65|s
Ga|Galyum|Gallium|69.723|pt|1.81|s
Ge|Germanyum|Germanium|72.630|md|2.01|s
As|Arsenik|Arsenic|74.922|md|2.18|s
Se|Selenyum|Selenium|78.971|nm|2.55|s
Br|Brom|Bromine|79.904|hl|2.96|l
Kr|Kripton|Krypton|83.798|ng|3.00|g
Rb|Rubidyum|Rubidium|85.468|am|0.82|s
Sr|Stronsiyum|Strontium|87.62|ae|0.95|s
Y|İtriyum|Yttrium|88.906|tm|1.22|s
Zr|Zirkonyum|Zirconium|91.224|tm|1.33|s
Nb|Niyobyum|Niobium|92.906|tm|1.6|s
Mo|Molibden|Molybdenum|95.95|tm|2.16|s
Tc|Teknesyum|Technetium|98|tm|1.9|s
Ru|Rutenyum|Ruthenium|101.07|tm|2.2|s
Rh|Rodyum|Rhodium|102.91|tm|2.28|s
Pd|Paladyum|Palladium|106.42|tm|2.20|s
Ag|Gümüş|Silver|107.87|tm|1.93|s
Cd|Kadmiyum|Cadmium|112.41|tm|1.69|s
In|İndiyum|Indium|114.82|pt|1.78|s
Sn|Kalay|Tin|118.71|pt|1.96|s
Sb|Antimon|Antimony|121.76|md|2.05|s
Te|Tellür|Tellurium|127.60|md|2.1|s
I|İyot|Iodine|126.90|hl|2.66|s
Xe|Ksenon|Xenon|131.29|ng|2.60|g
Cs|Sezyum|Caesium|132.91|am|0.79|s
Ba|Baryum|Barium|137.33|ae|0.89|s
La|Lantan|Lanthanum|138.91|ln|1.10|s
Ce|Seryum|Cerium|140.12|ln|1.12|s
Pr|Praseodim|Praseodymium|140.91|ln|1.13|s
Nd|Neodim|Neodymium|144.24|ln|1.14|s
Pm|Prometyum|Promethium|145|ln|1.13|s
Sm|Samaryum|Samarium|150.36|ln|1.17|s
Eu|Evropiyum|Europium|151.96|ln|1.2|s
Gd|Gadolinyum|Gadolinium|157.25|ln|1.20|s
Tb|Terbiyum|Terbium|158.93|ln|1.1|s
Dy|Disprosyum|Dysprosium|162.50|ln|1.22|s
Ho|Holmiyum|Holmium|164.93|ln|1.23|s
Er|Erbiyum|Erbium|167.26|ln|1.24|s
Tm|Tulyum|Thulium|168.93|ln|1.25|s
Yb|İterbiyum|Ytterbium|173.05|ln|1.1|s
Lu|Lutesyum|Lutetium|174.97|ln|1.27|s
Hf|Hafniyum|Hafnium|178.49|tm|1.3|s
Ta|Tantal|Tantalum|180.95|tm|1.5|s
W|Tungsten|Tungsten|183.84|tm|2.36|s
Re|Renyum|Rhenium|186.21|tm|1.9|s
Os|Osmiyum|Osmium|190.23|tm|2.2|s
Ir|İridyum|Iridium|192.22|tm|2.20|s
Pt|Platin|Platinum|195.08|tm|2.28|s
Au|Altın|Gold|196.97|tm|2.54|s
Hg|Cıva|Mercury|200.59|tm|2.00|l
Tl|Talyum|Thallium|204.38|pt|1.62|s
Pb|Kurşun|Lead|207.2|pt|2.33|s
Bi|Bizmut|Bismuth|208.98|pt|2.02|s
Po|Polonyum|Polonium|209|pt|2.0|s
At|Astatin|Astatine|210|hl|2.2|s
Rn|Radon|Radon|222|ng|2.2|g
Fr|Fransiyum|Francium|223|am|0.7|s
Ra|Radyum|Radium|226|ae|0.9|s
Ac|Aktinyum|Actinium|227|ac|1.1|s
Th|Toryum|Thorium|232.04|ac|1.3|s
Pa|Protaktinyum|Protactinium|231.04|ac|1.5|s
U|Uranyum|Uranium|238.03|ac|1.38|s
Np|Neptünyum|Neptunium|237|ac|1.36|s
Pu|Plütonyum|Plutonium|244|ac|1.28|s
Am|Amerikyum|Americium|243|ac|1.13|s
Cm|Küriyum|Curium|247|ac|1.28|s
Bk|Berkelyum|Berkelium|247|ac|1.3|s
Cf|Kaliforniyum|Californium|251|ac|1.3|s
Es|Aynştaynyum|Einsteinium|252|ac|1.3|s
Fm|Fermiyum|Fermium|257|ac|1.3|s
Md|Mendelevyum|Mendelevium|258|ac|1.3|s
No|Nobelyum|Nobelium|259|ac|1.3|s
Lr|Lavrensiyum|Lawrencium|266|ac|1.3|s
Rf|Rutherfordiyum|Rutherfordium|267|tm||?
Db|Dubniyum|Dubnium|268|tm||?
Sg|Seaborgiyum|Seaborgium|269|tm||?
Bh|Bohriyum|Bohrium|270|tm||?
Hs|Hassiyum|Hassium|277|tm||?
Mt|Meitneriyum|Meitnerium|278|uk||?
Ds|Darmstadtiyum|Darmstadtium|281|uk||?
Rg|Röntgenyum|Roentgenium|282|uk||?
Cn|Kopernikyum|Copernicium|285|tm||?
Nh|Nihonyum|Nihonium|286|uk||?
Fl|Flerovyum|Flerovium|289|uk||?
Mc|Moskovyum|Moscovium|290|uk||?
Lv|Livermoryum|Livermorium|293|uk||?
Ts|Tennesin|Tennessine|294|uk||?
Og|Oganesson|Oganesson|294|uk||?`;

  const CATS = {
    am: { name: 'Alkali Metal', color: '#ff7a6b' },
    ae: { name: 'Toprak Alkali Metal', color: '#ffad5c' },
    tm: { name: 'Geçiş Metali', color: '#f2cf4a' },
    pt: { name: 'Zayıf Metal', color: '#7fd6a0' },
    md: { name: 'Yarı Metal', color: '#3fd0c9' },
    nm: { name: 'Ametal', color: '#5aa9ff' },
    hl: { name: 'Halojen', color: '#8b8dff' },
    ng: { name: 'Soy Gaz', color: '#c47bff' },
    ln: { name: 'Lantanit', color: '#ff7fbf' },
    ac: { name: 'Aktinit', color: '#ff9b9b' },
    uk: { name: 'Özellikleri Bilinmeyen', color: '#94a0b8' },
  };

  const PHASES = { s: 'Katı', l: 'Sıvı', g: 'Gaz', '?': 'Bilinmiyor' };
  const PHASE_COLORS = { s: '#7aa2ff', l: '#3ddcc4', g: '#ff9f6b', '?': '#5d6680' };
  const BLOCK_COLORS = { s: '#ff7a6b', p: '#f2cf4a', d: '#5aa9ff', f: '#b98cff' };

  // Madelung (Aufbau) doldurma sırası
  const ORDER = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
  const CAP = { s: 2, p: 6, d: 10, f: 14 };
  const L_OF = { s: 0, p: 1, d: 2, f: 3 };

  // Aufbau kuralına uymayan elementler için düzeltmeler
  const EXC = {
    24: { '4s': -1, '3d': 1 }, 29: { '4s': -1, '3d': 1 },
    41: { '5s': -1, '4d': 1 }, 42: { '5s': -1, '4d': 1 }, 44: { '5s': -1, '4d': 1 },
    45: { '5s': -1, '4d': 1 }, 46: { '5s': -2, '4d': 2 }, 47: { '5s': -1, '4d': 1 },
    57: { '4f': -1, '5d': 1 }, 58: { '4f': -1, '5d': 1 }, 64: { '4f': -1, '5d': 1 },
    78: { '6s': -1, '5d': 1 }, 79: { '6s': -1, '5d': 1 },
    89: { '5f': -1, '6d': 1 }, 90: { '5f': -2, '6d': 2 }, 91: { '5f': -1, '6d': 1 },
    92: { '5f': -1, '6d': 1 }, 93: { '5f': -1, '6d': 1 }, 96: { '5f': -1, '6d': 1 },
    103: { '6d': -1, '7p': 1 },
  };

  const NOBLE = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']];

  const TYPICAL_IONS = {
    H: [1, -1], Li: [1], Na: [1], K: [1], Rb: [1], Cs: [1], Fr: [1],
    Be: [2], Mg: [2], Ca: [2], Sr: [2], Ba: [2], Ra: [2],
    Al: [3], Ga: [3], N: [-3], P: [-3], O: [-2], S: [-2], Se: [-2], Te: [-2],
    F: [-1], Cl: [-1], Br: [-1], I: [-1],
    Sc: [3], Ti: [4], V: [3], Cr: [3], Mn: [2], Fe: [2, 3], Co: [2, 3], Ni: [2],
    Cu: [1, 2], Zn: [2], Ag: [1], Cd: [2], Au: [1, 3], Hg: [2], Sn: [2, 4], Pb: [2, 4],
  };

  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = (n) => String(n).split('').map((d) => SUP[+d]).join('');
  const chargeStr = (q) => (q === 0 ? '' : (Math.abs(q) === 1 ? '' : sup(Math.abs(q))) + (q > 0 ? '⁺' : '⁻'));

  function madelung(n) {
    const res = {};
    let left = n;
    for (const s of ORDER) {
      if (left <= 0) break;
      const c = Math.min(CAP[s[1]], left);
      res[s] = c;
      left -= c;
    }
    return res;
  }

  function configOf(Z) {
    const c = madelung(Z);
    const ex = EXC[Z];
    if (ex) {
      for (const k in ex) {
        c[k] = (c[k] || 0) + ex[k];
        if (c[k] <= 0) delete c[k];
      }
    }
    return c;
  }

  // q > 0: katyon (elektron çıkar), q < 0: anyon (elektron ekle)
  function ionConfig(Z, q) {
    const c = Object.assign({}, configOf(Z));
    if (q > 0) {
      for (let i = 0; i < q; i++) {
        let best = null;
        for (const k in c) {
          if (c[k] <= 0) continue;
          if (!best || +k[0] > +best[0] || (+k[0] === +best[0] && L_OF[k[1]] > L_OF[best[1]])) best = k;
        }
        if (!best) break;
        c[best]--;
        if (!c[best]) delete c[best];
      }
    } else if (q < 0) {
      for (let i = 0; i < -q; i++) {
        for (const s of ORDER) {
          if ((c[s] || 0) < CAP[s[1]]) { c[s] = (c[s] || 0) + 1; break; }
        }
      }
    }
    return c;
  }

  const totalOf = (conf) => Object.values(conf).reduce((a, b) => a + b, 0);

  function coreOf(conf) {
    const t = totalOf(conf);
    for (const [z, symbol] of NOBLE) {
      if (z < t) {
        const c = madelung(z);
        if (Object.keys(c).every((k) => (conf[k] || 0) >= c[k])) return { z, symbol, config: c };
      }
    }
    return null;
  }

  function configString(conf, short = true) {
    if (!totalOf(conf)) return '—';
    const core = short ? coreOf(conf) : null;
    const parts = core ? [`[${core.symbol}]`] : [];
    for (const s of ORDER) {
      const n = (conf[s] || 0) - (core ? core.config[s] || 0 : 0);
      if (n > 0) parts.push(s + sup(n));
    }
    return parts.join(' ');
  }

  function shellsOf(conf) {
    const arr = [];
    for (const k in conf) {
      const n = +k[0];
      arr[n - 1] = (arr[n - 1] || 0) + conf[k];
    }
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i] || 0;
    return arr;
  }

  function positionOf(Z) {
    if (Z === 1) return { period: 1, group: 1, col: 1, row: 1 };
    if (Z === 2) return { period: 1, group: 18, col: 18, row: 1 };
    const ranges = [[3, 10, 2], [11, 18, 3], [19, 36, 4], [37, 54, 5], [55, 86, 6], [87, 118, 7]];
    for (const [a, b, p] of ranges) {
      if (Z < a || Z > b) continue;
      const idx = Z - a;
      if (p <= 3) { const g = idx < 2 ? idx + 1 : idx + 11; return { period: p, group: g, col: g, row: p }; }
      if (p <= 5) return { period: p, group: idx + 1, col: idx + 1, row: p };
      if (idx < 2) return { period: p, group: idx + 1, col: idx + 1, row: p };
      if (idx < 17) return { period: p, group: null, col: idx + 1, row: p + 3 }; // f-blok satırları
      const g = idx - 13;
      return { period: p, group: g, col: g, row: p };
    }
    return null;
  }

  function blockOf(Z, pos) {
    if (pos.row >= 9) return 'f';
    if (Z === 2 || pos.group <= 2) return 's';
    if (pos.group >= 13) return 'p';
    return 'd';
  }

  const ELEMENTS = RAW.trim().split('\n').map((line, i) => {
    const [symbol, name, nameEn, mass, cat, en, phase] = line.trim().split('|');
    const Z = i + 1;
    const pos = positionOf(Z);
    const config = configOf(Z);
    const m = parseFloat(mass);
    return Object.assign({
      Z, symbol, name, nameEn, cat, phase,
      mass: m,
      massText: mass.includes('.') ? mass : `[${mass}]`,
      en: en ? parseFloat(en) : null,
      neutrons: Math.round(m) - Z,
      block: blockOf(Z, pos),
      config,
      shells: shellsOf(config),
    }, pos);
  });

  const bySymbol = {};
  ELEMENTS.forEach((el) => { bySymbol[el.symbol] = el; });

  function valenceOf(el) {
    if (el.Z === 2) return 2;
    if (!el.group) return null;
    if (el.group <= 2) return el.group;
    if (el.group >= 13) return el.group - 10;
    return null;
  }

  const typicalIons = (symbol) => TYPICAL_IONS[symbol] || [];

  window.Chem = {
    ELEMENTS, CATS, PHASES, PHASE_COLORS, BLOCK_COLORS, ORDER, CAP,
    bySymbol, configOf, ionConfig, configString, coreOf, shellsOf, totalOf,
    sup, chargeStr, valenceOf, typicalIons,
  };
})();
