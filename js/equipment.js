/* affeLab — Kimya Laboratuvarı Araçları ve Ekipman Atlası */
(function () {
  'use strict';

  const CATEGORIES = {
    all: 'Tümü',
    glass: 'Cam Kaplar',
    measure: 'Hassas Ölçüm & Titrasyon',
    heat: 'Isıtma & Yüksek Sıcaklık',
    sep: 'Ayırma & Süzme',
    prep: 'Hazırlık & Destek',
  };

  const EQUIPMENT = [
    {
      id: 'beaker',
      name: 'Beherglas (Beher)',
      en: 'Beaker',
      cat: 'glass',
      precision: 'Düşük (±%5–10 yaklaşık hacim)',
      temp: 'Borosilikat cam (Pyrex): ~400 °C’ye kadar dayanıklı',
      summary: 'Çözelti hazırlama, maddeleri karıştırma, aktarma ve kaba ısıtma işlemlerinde kullanılan silindirik, ağızlıklı temel laboratuvar kabıdır.',
      uses: [
        'Katı maddeleri sıvı içinde çözerek çözelti hazırlama',
        'Sıvıları gagalı ağızlığı (spout) sayesinde dökmeden başka kaba aktarma',
        'Su banyosu veya tel kafes üzerinde sıvı ısıtma ve kaynatma',
      ],
      safety: 'Üzerindeki hacim çizgileri yalnızca yaklaşık değer gösterir; hassas hacim ölçümü için asla beher kullanılmaz (mezür veya pipet kullanılır).',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <defs>
            <linearGradient id="liqBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="#2563eb" stop-opacity="0.85"/>
            </linearGradient>
          </defs>
          <path d="M36 62 Q70 66 104 62 L104 112 Q104 120 96 120 L44 120 Q36 120 36 112 Z" fill="url(#liqBlue)"/>
          <path d="M28 24 L36 30 L36 112 Q36 120 44 120 L96 120 Q104 120 104 112 L104 24" fill="none" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <g stroke="#94a3b8" stroke-width="1.8">
            <line x1="82" y1="45" x2="96" y2="45"/><text x="76" y="48" fill="#94a3b8" font-size="8" text-anchor="end">200</text>
            <line x1="86" y1="65" x2="96" y2="65"/><text x="76" y="68" fill="#94a3b8" font-size="8" text-anchor="end">150</text>
            <line x1="82" y1="85" x2="96" y2="85"/><text x="76" y="88" fill="#94a3b8" font-size="8" text-anchor="end">100</text>
            <line x1="86" y1="105" x2="96" y2="105"/><text x="76" y="108" fill="#94a3b8" font-size="8" text-anchor="end">50</text>
          </g>
        </svg>`,
    },
    {
      id: 'erlenmeyer',
      name: 'Erlenmayer (Erlen)',
      en: 'Erlenmeyer Flask',
      cat: 'glass',
      precision: 'Düşük (±%5 yaklaşık hacim)',
      temp: 'Borosilikat cam: Isıtmaya ve kaynatmaya uygun',
      summary: 'Düz tabanlı, konik gövdeli ve dar boyunlu cam kaptır. Özellikle titrasyon işlemlerinde sıvıyı dışarı sıçratmadan çalkalamak için tasarlanmıştır.',
      uses: [
        'Asit-baz titrasyonlarında büretten akan çözeltiyi toplama ve dairesel çalkalama',
        'Dar boynu sayesinde buharlaşma kaybını azaltarak çözelti ısıtma',
        'Kristallendirme ve mikrobiyolojik kültür hazırlama',
      ],
      safety: 'Çalkalama sırasında boynundan tutularak dairesel hareket ettirilir; ağzı tamamen kapalıyken kesinlikle ısıtılmamalıdır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M35 88 L105 88 L112 112 Q115 120 105 120 L35 120 Q25 120 28 112 Z" fill="rgba(244,114,182,0.55)"/>
          <path d="M54 22 L86 22 M58 22 L58 46 L28 110 Q24 120 35 120 L105 120 Q116 120 112 110 L82 46 L82 22" fill="none" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="62" y1="75" x2="78" y2="75" stroke="#94a3b8" stroke-width="1.6"/>
          <line x1="56" y1="95" x2="84" y2="95" stroke="#94a3b8" stroke-width="1.6"/>
        </svg>`,
    },
    {
      id: 'cylinder',
      name: 'Mezür (Dereceli Silindir)',
      en: 'Graduated Cylinder',
      cat: 'measure',
      precision: 'Orta–Yüksek (±%0,5–1 hacim ölçümü)',
      temp: 'Isıtılmaz (kalibrasyonu bozulur ve çatlayabilir)',
      summary: 'Sıvıların hacmini hassas olarak ölçmek için kullanılan ince, uzun ve sık derecelendirilmiş silindirik cam veya plastik ölçü kabıdır.',
      uses: [
        'Belli hacimde saf su veya reaktif çözelti ölçme',
        'Suda çözünmeyen düzensiz şekilli katıların hacmini suyun yükselme miktarından (Arşimet) bulma',
      ],
      safety: 'Okuma yapılırken göz sıvı yüzeyiyle aynı hizada olmalı ve içbükey sıvı yüzeyinin (menisküs) en alt noktası esas alınmalıdır. İçinde tepkime yapılmaz ve ısıtılmaz.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <rect x="55" y="52" width="30" height="66" fill="rgba(56,189,248,0.55)"/>
          <path d="M55 52 Q70 57 85 52" fill="none" stroke="#bae6fd" stroke-width="2"/>
          <path d="M51 20 L55 24 L55 118 L85 118 L85 20 M42 122 L98 122" fill="none" stroke="#e2e8f0" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
          <g stroke="#cbd5e1" stroke-width="1.4">
            <line x1="72" y1="35" x2="85" y2="35"/><line x1="76" y1="45" x2="85" y2="45"/>
            <line x1="72" y1="55" x2="85" y2="55"/><line x1="76" y1="65" x2="85" y2="65"/>
            <line x1="72" y1="75" x2="85" y2="75"/><line x1="76" y1="85" x2="85" y2="85"/>
            <line x1="72" y1="95" x2="85" y2="95"/><line x1="76" y1="105" x2="85" y2="105"/>
          </g>
        </svg>`,
    },
    {
      id: 'volumetric',
      name: 'Balon Joje (Ölçülü Balon)',
      en: 'Volumetric Flask',
      cat: 'measure',
      precision: 'Çok Yüksek (±%0,05–0,2 tek hacim çizgisi)',
      temp: 'Yalnızca kalibrasyon sıcaklığında (20 °C) kullanılır, ısıtılmaz',
      summary: 'Alt kısmı şişkin, boynu çok ince ve uzun olan; boynundaki tek bir kalibrasyon çizgisine kadar belirli hacimde (ör. 100 mL, 250 mL) standart çözelti hazırlamaya yarayan kaptır.',
      uses: [
        'Molaritesi (derişimi) tam bilinen standart çözeltilerin hazırlanması',
        'Stok çözeltilerin belirli oranda hassas seyreltilmesi',
      ],
      safety: 'Katı madde önce az miktar çözücüde beherde çözülür veya balon jojede çözündükten sonra boyundaki ölçü çizgisine saf suyla tamamlanır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M40 92 A32 30 0 1 0 100 92 Z" fill="rgba(52,211,153,0.55)"/>
          <path d="M62 18 L78 18 M64 18 L64 62 C42 68 36 92 42 108 C46 118 56 122 70 122 C84 122 94 118 98 108 C104 92 98 68 76 62 L76 18" fill="none" stroke="#e2e8f0" stroke-width="3.2" stroke-linecap="round"/>
          <line x1="60" y1="42" x2="80" y2="42" stroke="#3ddcc4" stroke-width="2.2"/>
        </svg>`,
    },
    {
      id: 'funnel',
      name: 'Cam Huni (Süzme Hunisi)',
      en: 'Glass Funnel',
      cat: 'sep',
      precision: 'Ölçüm aracı değildir',
      temp: 'Standart laboratuvar sıcaklığı',
      summary: 'Dar ağızlı kaplara sıvı veya toz aktarmak ve içine katlanmış süzgeç kâğıdı yerleştirilerek katı-sıvı heterojen karışımları süzmek (filtrasyon) için kullanılır.',
      uses: [
        'Büret, balon joje ve erlen gibi dar boyunlu kaplara sıvı doldurma',
        'Süzgeç kâğıdı ile çökelekleri (ör. AgCl, PbI₂) çözeltiden ayırma',
      ],
      safety: 'Sıçramayı önlemek için huninin alt ucu (boyun kısmı) toplama kabının iç çeperine değecek şekilde yerleştirilir.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <polygon points="30,28 110,28 76,78 76,120 64,120 64,78" fill="rgba(148,163,184,0.18)" stroke="#e2e8f0" stroke-width="3.2" stroke-linejoin="round"/>
          <polyline points="38,30 70,72 102,30" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="4 3"/>
        </svg>`,
    },
    {
      id: 'sepfunnel',
      name: 'Ayırma Hunisi',
      en: 'Separatory Funnel',
      cat: 'sep',
      precision: 'Faz ayırma aracı',
      temp: 'Oda sıcaklığı (basınç artışına dikkat edilir)',
      summary: 'Zeytinyağı–su veya organik çözücü–su gibi birbiri içinde çözünmeyen ve yoğunlukları farklı sıvı-sıvı heterojen karışımları ayırmak için kullanılan musluklu armut biçimli hunidir.',
      uses: [
        'Yoğunluğu büyük olan sıvıyı alt musluktan kontrollü olarak başka kaba alma',
        'Sıvı-sıvı ekstraksiyon (özütleme) işlemleri',
      ],
      safety: 'Çalkalama sırasında oluşan buhar basıncını boşaltmak için huni ters çevrilip musluğu aralıklarla açılarak gaz çıkışı (venting) sağlanmalıdır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M44 48 L96 48 Q95 72 74 88 L66 88 Q45 72 44 48 Z" fill="rgba(250,204,21,0.55)"/>
          <path d="M47 64 L93 64 Q89 78 74 88 L66 88 Q51 78 47 64 Z" fill="rgba(56,189,248,0.65)"/>
          <path d="M62 18 L78 18 M65 18 L65 26 C40 32 38 66 66 88 L66 124 M75 18 L75 26 C100 32 102 66 74 88 L74 124" fill="none" stroke="#e2e8f0" stroke-width="3.2" stroke-linecap="round"/>
          <rect x="56" y="96" width="28" height="7" rx="3" fill="#f87171"/>
        </svg>`,
    },
    {
      id: 'burette',
      name: 'Büret',
      en: 'Burette',
      cat: 'measure',
      precision: 'Çok Yüksek (±0,05 mL damla hassasiyeti)',
      temp: 'Oda sıcaklığı',
      summary: 'Alt ucunda hassas bir musluk bulunan, yukarıdan aşağıya doğru (0,0 mL üstte) derecelendirilmiş uzun cam borudur. Titrasyon işlemlerinin temel aracıdır.',
      uses: [
        'Derişimi bilinen standart çözeltiyi (titrant) erlendeki çözeltiye damla damla ekleme',
        'Harcanan sıvı hacmini virgülden sonra iki basamak hassasiyetle okuma',
      ],
      safety: 'Kullanmadan önce musluk altında hava kabarcığı kalmadığından ve sıfır çizgisinin doğru ayarlandığından emin olunmalıdır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <rect x="64" y="28" width="12" height="68" fill="rgba(91,140,255,0.5)"/>
          <path d="M64 14 L64 98 L70 118 L76 98 L76 14" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-linejoin="round"/>
          <rect x="56" y="96" width="28" height="6" rx="3" fill="#3ddcc4"/>
          <circle cx="70" cy="127" r="3" fill="#60a5fa"/>
          <g stroke="#cbd5e1" stroke-width="1.3">
            <line x1="64" y1="26" x2="71" y2="26"/><line x1="64" y1="38" x2="71" y2="38"/>
            <line x1="64" y1="50" x2="71" y2="50"/><line x1="64" y1="62" x2="71" y2="62"/>
            <line x1="64" y1="74" x2="71" y2="74"/><line x1="64" y1="86" x2="71" y2="86"/>
          </g>
        </svg>`,
    },
    {
      id: 'pipette',
      name: 'Pipet ve Puvar',
      en: 'Pipette & Bulb',
      cat: 'measure',
      precision: 'Çok Yüksek (±0,02–0,1 mL)',
      temp: 'Oda sıcaklığı',
      summary: 'Küçük hacimli sıvıları (1 mL – 25 mL) çok hassas şekilde bir kaptan çekip diğerine aktarmaya yarayan ince cam borudur. Üst kısmına takılan lastik puvar ile vakum yapılır.',
      uses: [
        'Titrasyon öncesi erlene tam 10,00 mL veya 25,00 mL numune aktarma',
        'Derişik asit ve bazlardan küçük hacimler alma',
      ],
      safety: 'Kimyasal sıvılar kesinlikle ağızla çekilmez; her zaman puvar (pipet pompası) kullanılır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <circle cx="70" cy="26" r="14" fill="#f87171" stroke="#fecaca" stroke-width="2"/>
          <path d="M67 40 L67 60 C60 66 60 80 67 86 L67 118 L70 126 L73 118 L73 86 C80 80 80 66 73 60 L73 40" fill="rgba(56,189,248,0.35)" stroke="#e2e8f0" stroke-width="2.8"/>
        </svg>`,
    },
    {
      id: 'burner',
      name: 'Bunsen Beki ve Isıtıcı Tabla',
      en: 'Bunsen Burner & Hotplate Stirrer',
      cat: 'heat',
      precision: 'Isıtma ve karıştırma kaynağı',
      temp: 'Bunsen alevi: ~1200 °C · Isıtıcı tabla: 50–500 °C',
      summary: 'Laboratuvarda açık alevle ısıtma/sterilizasyon için Bunsen beki; yanıcı çözücüleri güvenli ısıtmak ve aynı anda manyetik balıkla karıştırmak için ısıtıcı tabla (hotplate) kullanılır.',
      uses: [
        'Bunsen beki: Deney tüpü, kroze ısıtma ve katyonların alev rengi deneyi',
        'Manyetik karıştırıcılı ısıtıcı: Yanıcı organik sıvıları alevsiz ısıtma ve homojen karıştırma',
      ],
      safety: 'Eter, etanol ve aseton gibi uçucu/yanıcı organik çözücüler asla açık Bunsen aleviyle ısıtılmaz; elektrikli ısıtıcı tabla veya su banyosu kullanılır.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M70 18 C54 38 56 58 70 66 C84 58 86 38 70 18 Z" fill="#fb923c" opacity="0.85"/>
          <path d="M70 32 C62 44 63 56 70 64 C77 56 78 44 70 32 Z" fill="#38bdf8"/>
          <rect x="64" y="64" width="12" height="44" rx="2" fill="#94a3b8" stroke="#e2e8f0" stroke-width="2.5"/>
          <rect x="60" y="96" width="20" height="8" rx="2" fill="#fbbf24"/>
          <path d="M44 120 L96 120 L86 108 L54 108 Z" fill="#475569" stroke="#e2e8f0" stroke-width="2.5"/>
        </svg>`,
    },
    {
      id: 'testtube',
      name: 'Deney Tüpü ve Tahta/Metal Maşa',
      en: 'Test Tube & Holder',
      cat: 'glass',
      precision: 'Nitel analiz ve küçük ölçekli test',
      temp: 'Borosilikat cam: Doğrudan aleve tutulabilir',
      summary: 'Az miktardaki kimyasal maddelerle çökelme, gaz çıkışı, renk değişimi ve ısıtma deneyleri yapmak için kullanılan dibi yuvarlak silindirik cam tüptür.',
      uses: [
        'Nitel analizde katyon/anyon tanıma testleri',
        'Küçük hacimli sıvıları maşa ile tutarak bek alevinde ısıtma',
      ],
      safety: 'Deney tüpü ısıtılırken maşa ile 45° eğik tutulmalı ve tüpün ağzı asla kendimize veya laboratuvardaki başka birine yöneltilmemelidir.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <g transform="rotate(-18 70 70)">
            <path d="M58 68 L82 68 L82 104 A12 12 0 0 1 58 104 Z" fill="rgba(52,211,153,0.6)"/>
            <path d="M54 24 L86 24 M58 24 L58 104 A12 12 0 0 0 82 104 L82 24" fill="none" stroke="#e2e8f0" stroke-width="3.2" stroke-linecap="round"/>
            <rect x="52" y="42" width="60" height="7" rx="3" fill="#f59e0b"/>
          </g>
        </svg>`,
    },
    {
      id: 'crucible',
      name: 'Porselen Kroze',
      en: 'Porcelain Crucible',
      cat: 'heat',
      precision: 'Gravimetrik kül etme kabı',
      temp: '1000 °C+ çok yüksek sıcaklığa dayanıklı porselen',
      summary: 'Metal veya katı bileşikleri çok yüksek sıcaklıklarda ısıtmak, kristal suyunu uçurmak ve kül haline getirmek (kalsinasyon) için kullanılan kapaklı porselen fincandır.',
      uses: [
        'Hidrat bileşiklerinin (ör. CuSO₄·5H₂O) ısıtılarak kristal suyu yüzdesinin bulunması',
        'Gravimetrik analizde çökeleklerin sabit tartıma getirilmesi',
      ],
      safety: 'Sıcak kroze çıplak elle veya plastik eldivenle tutulmaz; yalnızca metal kroze maşası ile taşınır ve desikatörde soğutulur.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M34 46 L106 46 Q98 36 70 36 Q42 36 34 46 Z" fill="#cbd5e1" stroke="#f8fafc" stroke-width="2.8"/>
          <circle cx="70" cy="31" r="5" fill="none" stroke="#f8fafc" stroke-width="2.8"/>
          <path d="M38 54 L102 54 L90 112 Q88 118 70 118 Q52 118 50 112 Z" fill="rgba(226,232,240,0.22)" stroke="#f8fafc" stroke-width="3.2" stroke-linejoin="round"/>
        </svg>`,
    },
    {
      id: 'mortar',
      name: 'Havan ve Tokmak (Havan Eli)',
      en: 'Mortar & Pestle',
      cat: 'prep',
      precision: 'Öğütme ve tozlaştırma',
      temp: 'Oda sıcaklığı',
      summary: 'Kalın cidarlı porselen veya akikten yapılmış kâse (havan) ve ezici çubuktur (tokmak). Katı kimyasalları ezerek ince toz haline getirmek ve yüzey alanını artırmak için kullanılır.',
      uses: [
        'İri kristalli katıları çözünme hızını artırmak üzere toz haline getirme',
        'Katı örnekleri homojenleştirme',
      ],
      safety: 'Patlayıcı veya yükseltgen-indirgen katı karışımlar (ör. KClO₃ + kükürt) asla aynı havanda birlikte dövülmez.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <line x1="98" y1="24" x2="68" y2="82" stroke="#f8fafc" stroke-width="10" stroke-linecap="round"/>
          <path d="M26 68 L114 68 C112 104 94 118 70 118 C46 118 28 104 26 68 Z" fill="rgba(226,232,240,0.25)" stroke="#f8fafc" stroke-width="3.5" stroke-linejoin="round"/>
        </svg>`,
    },
    {
      id: 'watchglass',
      name: 'Saat Camı ve Spatül',
      en: 'Watch Glass & Spatula',
      cat: 'prep',
      precision: 'Tartım ve aktarma yardımcısı',
      temp: 'Düşük sıcaklıkta kurutma',
      summary: 'Saat camı az miktarda katıyı tartmak, kurutmak veya beher ağzını örtmek için kullanılan içbükey camdır. Spatül ise katı kimyasalları şişeden almaya yarayan metal/porselen kaşıktır.',
      uses: [
        'Hassas terazide katı madde tartımı',
        'Birkaç damla çözeltiyi buharlaştırarak kristallenmeyi gözlemleme',
      ],
      safety: 'Şişeden spatülle alınan fazla katı kimyasal, kirlenmeyi önlemek için asla orijinal reaktif şişesine geri dökülmez.',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <path d="M24 88 Q70 116 116 88" fill="rgba(148,163,184,0.22)" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M54 88 Q70 74 86 88 Z" fill="#38bdf8"/>
          <line x1="30" y1="44" x2="108" y2="68" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
        </svg>`,
    },
    {
      id: 'condenser',
      name: 'Geri Soğutucu (Liebig Kondenser)',
      en: 'Liebig Condenser',
      cat: 'sep',
      precision: 'Damıtma (Distilasyon) ekipmanı',
      temp: 'Dış ceketinden sürekli soğuk su geçer',
      summary: 'İç içe geçmiş iki cam borudan oluşur. İç borudan sıcak buhar geçerken dış ceketten soğuk musluk suyu dolaştırılarak buharın tekrar sıvıya yoğuşması (kondensasyon) sağlanır.',
      uses: [
        'Basit ve ayrımsal damıtma düzeneklerinde kaynayan sıvı buharını yoğuşturma',
        'Geri akış (reflux) altında çözücü kaybetmeden uzun süreli tepkime yürütme',
      ],
      safety: 'Soğutma suyu her zaman alt girişten bağlanır ve üst çıkıştan tahliye edilir (ters akış prensibiyle ceketin tamamen suyla dolması sağlanır).',
      svg: `
        <svg viewBox="0 0 140 140" class="eq-svg">
          <g transform="rotate(-28 70 70)">
            <rect x="28" y="56" width="84" height="28" rx="6" fill="rgba(56,189,248,0.25)" stroke="#e2e8f0" stroke-width="2.8"/>
            <line x1="14" y1="70" x2="126" y2="70" stroke="#f8fafc" stroke-width="6"/>
            <line x1="40" y1="84" x2="40" y2="102" stroke="#38bdf8" stroke-width="3.5"/>
            <line x1="100" y1="56" x2="100" y2="38" stroke="#38bdf8" stroke-width="3.5"/>
          </g>
        </svg>`,
    },
  ];

  const QUIZ_QUESTIONS = [
    { q: 'Titrasyon işleminde erlendeki çözeltiye damla damla standart çözelti eklemek ve harcanan hacmi ±0,05 mL hassasiyetle okumak için hangi araç kullanılır?', ans: 'burette' },
    { q: 'Zeytinyağı ve su gibi birbiri içinde çözünmeyen iki sıvıyı yoğunluk farkından yararlanarak ayırmak için hangi araç kullanılır?', ans: 'sepfunnel' },
    { q: 'Tam 250,0 mL hacminde ve derişimi kesin bilinen standart bir çözelti hazırlamak için hangi kap tercih edilmelidir?', ans: 'volumetric' },
    { q: 'Sıvı hacmini menisküs çizgisinden hassas olarak ölçmek için kullanılan dereceli silindirik kap hangisidir?', ans: 'cylinder' },
    { q: 'Damıtma düzeneğinde kaynayan sıvının buharını dış ceketinden soğuk su geçirerek tekrar sıvı hale yoğuşturan araç hangisidir?', ans: 'condenser' },
    { q: 'Katı bir bileşiği 1000 °C üzerinde ısıtarak kristal suyunu uçurmak veya kül etmek için kullanılan porselen kap hangisidir?', ans: 'crucible' },
    { q: 'Dar boynu sayesinde titrasyon sırasında sıvıyı dışarı sıçratmadan çalkalamaya uygun konik cam kap hangisidir?', ans: 'erlenmeyer' },
    { q: 'İri taneli katı kimyasalları ezerek toz haline getirmek için kullanılan araç hangisidir?', ans: 'mortar' },
  ];

  function init(rootEl) {
    if (!rootEl) return;
    let activeCat = 'all';
    let searchQuery = '';
    let selectedId = 'beaker';
    let quizIdx = 0;

    const catBar = rootEl.querySelector('#eqCats');
    const searchInput = rootEl.querySelector('#eqSearch');
    const gridEl = rootEl.querySelector('#eqGrid');
    const detailEl = rootEl.querySelector('#eqDetail');
    const quizEl = rootEl.querySelector('#eqQuiz');

    catBar.innerHTML = Object.entries(CATEGORIES).map(([k, v]) => `
      <button class="leg-chip ${k === activeCat ? 'active' : ''}" data-eqcat="${k}" style="--c:#5b8cff">
        <i></i><span>${v}</span>
      </button>`).join('');

    function renderGrid() {
      const q = searchQuery.toLocaleLowerCase('tr');
      const list = EQUIPMENT.filter((item) => {
        if (activeCat !== 'all' && item.cat !== activeCat) return false;
        if (q && !item.name.toLocaleLowerCase('tr').includes(q) && !item.en.toLowerCase().includes(q) && !item.summary.toLocaleLowerCase('tr').includes(q)) return false;
        return true;
      });

      gridEl.innerHTML = list.map((item) => `
        <button class="eq-card ${item.id === selectedId ? 'active' : ''}" data-eqid="${item.id}">
          <div class="eq-art">${item.svg}</div>
          <div class="eq-card-body">
            <span class="eq-cat-tag">${CATEGORIES[item.cat]}</span>
            <h4>${item.name}</h4>
            <small>${item.en}</small>
          </div>
        </button>`).join('');
    }

    function renderDetail() {
      const item = EQUIPMENT.find((x) => x.id === selectedId) || EQUIPMENT[0];
      detailEl.innerHTML = `
        <div class="eq-detail-top">
          <div class="eq-detail-art">${item.svg}</div>
          <div>
            <span class="eq-cat-tag">${CATEGORIES[item.cat]}</span>
            <h2>${item.name}</h2>
            <p class="muted">${item.en}</p>
            <div class="eq-badges">
              <span><b>Hassasiyet / Rol:</b> ${item.precision}</span>
              <span><b>Sıcaklık Dayanımı:</b> ${item.temp}</span>
            </div>
          </div>
        </div>
        <p class="eq-summary">${item.summary}</p>
        <div class="eq-cols">
          <div class="eq-box">
            <h4>Başlıca Kullanım Alanları</h4>
            <ul>${item.uses.map((u) => `<li>${u}</li>`).join('')}</ul>
          </div>
          <div class="eq-box warn">
            <h4>⚠️ Laboratuvar Güvenliği ve İpuçları</h4>
            <p>${item.safety}</p>
          </div>
        </div>`;
    }

    function renderQuiz() {
      const qObj = QUIZ_QUESTIONS[quizIdx % QUIZ_QUESTIONS.length];
      const correctItem = EQUIPMENT.find((x) => x.id === qObj.ans);
      const others = EQUIPMENT.filter((x) => x.id !== qObj.ans).sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [correctItem, ...others].sort(() => Math.random() - 0.5);

      quizEl.innerHTML = `
        <div class="eq-quiz-head">
          <span>🎯 Hızlı Laboratuvar Ekipmanı Testi (${(quizIdx % QUIZ_QUESTIONS.length) + 1} / ${QUIZ_QUESTIONS.length})</span>
          <button class="link-btn" id="eqNextQ">Sonraki Soru →</button>
        </div>
        <p class="eq-quiz-q">${qObj.q}</p>
        <div class="eq-quiz-opts">
          ${opts.map((o) => `<button class="quiz-opt" data-eqans="${o.id}" data-correct="${o.id === qObj.ans ? '1' : '0'}">${o.name}</button>`).join('')}
        </div>
        <div id="eqQuizMsg" class="quiz-feedback"></div>`;
    }

    rootEl.addEventListener('click', (e) => {
      const catBtn = e.target.closest('[data-eqcat]');
      if (catBtn) {
        activeCat = catBtn.dataset.eqcat;
        catBar.querySelectorAll('[data-eqcat]').forEach((b) => b.classList.toggle('active', b === catBtn));
        renderGrid();
        return;
      }

      const card = e.target.closest('[data-eqid]');
      if (card) {
        selectedId = card.dataset.eqid;
        renderGrid();
        renderDetail();
        return;
      }

      const ansBtn = e.target.closest('[data-eqans]');
      if (ansBtn) {
        const isOk = ansBtn.dataset.correct === '1';
        quizEl.querySelectorAll('[data-eqans]').forEach((b) => {
          if (b.dataset.correct === '1') b.classList.add('correct');
          else if (b === ansBtn) b.classList.add('wrong');
        });
        selectedId = QUIZ_QUESTIONS[quizIdx % QUIZ_QUESTIONS.length].ans;
        renderGrid();
        renderDetail();
        rootEl.querySelector('#eqQuizMsg').innerHTML = isOk
          ? '<span class="ok">✓ Doğru! Sağdaki panelde bu aracın detaylarını inceleyebilirsin.</span>'
          : `<span style="color:#ff8787">✗ Doğru araç: <b>${EQUIPMENT.find((x) => x.id === selectedId).name}</b></span>`;
        return;
      }

      if (e.target.closest('#eqNextQ')) {
        quizIdx++;
        renderQuiz();
      }
    });

    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      renderGrid();
    });

    renderGrid();
    renderDetail();
    renderQuiz();
  }

  window.LabEquipment = { init };
})();
