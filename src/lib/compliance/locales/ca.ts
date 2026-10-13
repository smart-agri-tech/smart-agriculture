import type { Messages } from './en';

/** Catalan texts. */

const numberWords = ['cap', 'un', 'dos', 'tres', 'quatre', 'cinc', 'sis', 'set', 'vuit', 'nou', 'deu'];
const word = (n: number) => numberWords[n] ?? String(n);
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} i ${items[items.length - 1]}`;

export const ca: Messages = {
  locale: 'ca-ES',
  langName: 'Català',
  officialLang: 'ca',

  questions: {
    region: {
      title: 'On és la teva explotació?',
      help: 'De moment, la comprovació només cobreix la normativa catalana.',
      options: { catalonia: 'Catalunya', other: 'Una altra comunitat autònoma' },
    },
    farmTypes: {
      title: 'Què produeixes?',
      help: 'Marca totes les opcions que corresponguin.',
      options: {
        arable: 'Conreus extensius',
        fruit: 'Fruiters',
        olive: 'Olivera',
        vineyard: 'Vinya',
        horticulture: 'Hortalisses',
        livestock: 'Ramaderia',
        other: 'Altres',
      },
      otherPlaceholder: "Explica'ns què produeixes",
    },
    area: {
      title: 'Quina mida té la teva explotació?',
      options: {
        lt1: "Menys d'1 ha",
        '1to5': "D'1 a 5 ha",
        '5to10': 'De 5 a 10 ha',
        '10to50': 'De 10 a 50 ha',
        '50to200': 'De 50 a 200 ha',
        gt200: 'Més de 200 ha',
      },
    },
    privateConsumptionOnly: {
      title: 'Tot el que produeixes és per al teu consum propi?',
      options: { no: 'No, en venc una part o tot', yes: 'Sí, només autoconsum' },
    },
    fertiliser: {
      title: 'Apliques fertilitzants?',
      options: { none: 'No', mineral: 'Fertilitzants minerals', organic: 'Fertilitzants orgànics', both: 'Tots dos' },
    },
    manure: {
      title: 'Fas servir fems o purins?',
      options: {
        none: 'No',
        own: 'Sí, de la meva pròpia ramaderia',
        receive: "Sí, els rebo d'una altra explotació",
        both: 'Totes dues coses',
      },
    },
    plantProtection: {
      title: 'Fas servir productes fitosanitaris?',
      options: { none: 'No', self: 'Sí, els aplico jo mateix', contractor: "Sí, a través d'una empresa de serveis" },
    },
    irrigation: {
      title: 'Com regues els conreus?',
      options: { rainfed: 'Secà', irrigated: 'Regadiu', fertigation: 'Regadiu amb fertirrigació' },
    },
    schemes: {
      title: 'En quins règims participes?',
      help: 'Marca totes les opcions que corresponguin.',
      options: {
        cap_submitted: 'Ajuts directes de la PAC, ja sol·licitats aquest any',
        cap_pending: 'Ajuts directes de la PAC, encara no sol·licitats',
        eco: 'Ecorègims',
        organic: 'Certificació ecològica',
        integrated: 'Producció integrada',
        none: "Cap d'aquests",
      },
    },
    recordMethods: {
      title: "On portes ara els registres de l'explotació?",
      help: 'Marca totes les opcions que corresponguin.',
      options: {
        paper: 'Llibreta en paper',
        excel: 'Excel o fulls de càlcul',
        whatsapp: 'Missatges o fotos de WhatsApp',
        digital: "Un quadern d'explotació digital",
        none: 'No porto registres',
      },
    },
    preparer: {
      title: 'Qui prepara les teves declaracions?',
      options: {
        self: 'Jo mateix',
        cooperative: 'La meva cooperativa',
        advisor: 'Un assessor o una gestoria',
        nobody: 'Ningú, de moment',
      },
    },
    timeSpent: {
      title: 'Quant temps dediques a la paperassa cada any?',
      options: { lt5: 'Menys de 5 hores', '5to10': 'De 5 a 10 hores', '10to20': 'De 10 a 20 hores', gt20: 'Més de 20 hores' },
    },
  },

  requirements: {
    dun: { name: 'DUN 2026', need: 'Declaració agrària anual' },
    cap: { name: "Sol·licitud d'ajuts PAC", need: "Sol·licitud d'ajuts directes" },
    dan: {
      name: 'DAN 2026',
      needRequired: 'Declaració anual de nitrogen per les dejeccions que produeix la teva explotació.',
      needLikely: 'Declaració anual de nitrogen. Necessitem dues dades més per confirmar-ho.',
    },
    qie: {
      name: "QIE · registres de l'explotació",
      areas: { treatments: 'tractaments', fertilisation: 'fertilització', irrigation: 'reg' },
    },
    fertilisation: {
      name: 'Registre de fertilització',
      need: 'Registra cada aplicació de nutrients',
      needFertigation: "Registra cada aplicació de nutrients, a més de la dosi de reg i el N i el P de l'aigua",
    },
  },

  deadlines: {
    dun: 'febr.–abr. 2027',
    cap: '1 febr. – 15 maig 2026',
    dan: '20 de gener de 2027',
    qie: "Continu · electrònic a partir de l'1 de gener de 2027",
    qieUnconfirmed: 'Continu',
    fertilisation: "En el termini d'1 mes des de l'operació",
  },

  sources: {
    dunOrdre: 'Ordre ARP/24/2026',
    annualDun: 'Ordre anual de la DUN',
    dan: 'Normativa catalana de gestió del nitrogen (DAN)',
    qie: 'RD 1311/2012; nota del FEGA del 6 de nov. de 2025',
    fega: 'Nota del FEGA del 6 de nov. de 2025',
    rd1051: 'RD 1051/2022',
    rd1311: 'RD 1311/2012',
  },

  notices: {
    noRecords: "No portes registres de l'explotació, però les teves operacions ho requereixen",
    severalPlaces: 'Els registres de fertilització estan repartits en diversos llocs alhora',
    danProduces: "La DAN s'aplica perquè la teva explotació produeix dejeccions ramaderes",
    danReceives: "Pot ser que la DAN s'apliqui a la teva explotació perquè reps dejeccions ramaderes",
    capPending: "Encara no has presentat la sol·licitud d'ajuts PAC",
    nobody: "Ningú no s'encarrega de preparar les teves declaracions",
    dunInScope: "DUN identificada i dins de l'abast",
    phytoMaintained: 'Es porten registres fitosanitaris',
    digitalInUse: "Ja fas servir un quadern d'explotació digital",
    privateOnly: 'Només autoconsum: no cal presentar la DUN',
  },

  data: {
    noRecords: 'Encara no portes registres',
    liveIn: (places: string[]) => `Els teus registres són a ${list(places)}`,
    methods: { paper: 'paper', excel: 'Excel', whatsapp: 'WhatsApp', digital: "un quadern d'explotació digital", none: 'enlloc' },
  },

  burden: {
    levels: { low: 'Baixa', medium: 'Mitjana', high: 'Alta', veryHigh: 'Molt alta' },
    hours: { lt5: 'menys de 5 hores', '5to10': 'de 5 a 10 hores', '10to20': 'de 10 a 20 hores', gt20: 'més de 20 hores' },
    summary: (hours: string) => `Has estimat ${hours} l'any`,
  },

  counters: {
    days: (n: number) => `${n} ${plural(n, 'dia', 'dies')}`,
    years: (n: number) => `${n} ${plural(n, 'any', 'anys')}`,
    inForce: (span: string) => `en vigor fa ${span}`,
    startsIn: (span: string) => `comença d'aquí a ${span}`,
    opensIn: (span: string) => `s'obre d'aquí a ${span}`,
    closesIn: (span: string) => `es tanca d'aquí a ${span}`,
    closed: 'tancat',
  },

  keyDates: {
    'phyto-electronic': { date: '1 gen. 2027', title: 'Registre fitosanitari electrònic' },
    dan: { date: '20 gen. 2027', title: 'DAN · declaració anual de nitrogen' },
    fertilisation: { date: '1 gen. 2026', title: 'Registre de fertilització' },
    treatments: { date: 'Des de 2013', title: 'Registre de tractaments' },
    cue: { date: '1 gen. 2028', title: "Quadern d'explotació digital (CUE)" },
    dun: { date: 'febr.–abr. 2027', title: 'DUN · declaració agrària anual' },
  },

  ics: {
    calendarName: "Terminis normatius de l'explotació",
    labels: {
      dun: 'DUN 2026 · declaració agrària anual',
      cap: "Sol·licitud d'ajuts PAC",
      dan: 'DAN 2026 · declaració anual de nitrogen',
      qie: 'El registre fitosanitari electrònic passa a ser obligatori',
      fertilisation: 'Registre de fertilització · revisió mensual',
    },
    toConfirm: '(data per confirmar)',
    windowOpens: (date: string) => `El termini de presentació s'obre el ${date}.`,
    source: (source: string) => `Font: ${source}.`,
    unconfirmed: "Aquesta data encara no s'ha confirmat amb la campanya publicada. Comprova-la abans de fer-la servir.",
    reminder: (label: string, days: number) => `${label} d'aquí a ${days} dies`,
  },

  ui: {
    tagline: "Comprovació normativa de l'explotació en 5 minuts · Catalunya",
    startAgain: 'Torna a començar',
    language: 'Idioma',
    questionOf: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    back: 'Enrere',
    next: 'Següent',
    seeResult: 'Veure el meu resultat',
    noLogin: 'No cal registrar-se ni donar dades personals per veure el resultat.',
    outOfRegionTitle: 'De moment només cobrim Catalunya',
    outOfRegionBody:
      "La normativa de declaracions i registres de l'explotació varia entre comunitats autònomes. Aviat n'afegirem més.",
    yourResult: 'El teu resultat',
    resultTitle: 'El mapa normatiu de la teva explotació',
    pdfTitle: "Mapa normatiu de l'explotació · SA.TECH",
    summary: (answers: number, applies: number, attention: number) =>
      `Segons les teves ${answers} respostes, ${
        applies === 0
          ? "no s'aplica cap requisit"
          : `${plural(applies, "s'aplica", "s'apliquen")} ${word(applies)} ${plural(applies, 'requisit', 'requisits')}`
      } a la teva explotació i ${attention === 0 ? 'cap no necessita' : `${word(attention)} ${plural(attention, 'necessita', 'necessiten')}`} atenció.`,
    savePdf: 'Desa en PDF',
    complianceReadiness: 'Preparació normativa',
    dataReadiness: 'Preparació de les dades',
    administrativeBurden: 'Càrrega administrativa',
    outOf100: '/ 100',
    risks: (n: number) =>
      n === 0 ? "No s'ha detectat cap risc" : `${n} ${plural(n, 'risc potencial detectat', 'riscos potencials detectats')}`,
    appliesTitle: "Què s'aplica a la teva explotació",
    noneApply: "Segons les teves respostes, cap dels requisits que comprovem s'aplica a la teva explotació.",
    columns: { requirement: 'Requisit', status: 'Estat', need: 'Què necessites', deadline: 'Termini' },
    deadlinePrefix: 'Termini:',
    sourcePrefix: 'Font:',
    status: {
      required: 'Obligatori',
      completed: 'Completat',
      likely: 'Probablement aplicable',
      check: 'Revisa els registres',
      on_track: 'Al dia',
    },
    keyDatesTitle: 'Dates clau',
    noticedTitle: 'Què hem detectat',
    calendarTitle: 'Afegeix les dates al teu calendari',
    calendarBody: (n: number) =>
      `${word(n).replace(/^./, c => c.toUpperCase())} ${plural(n, 'termini', 'terminis')}, ${plural(n, 'amb un recordatori', 'cadascun amb un recordatori')} dues setmanes abans. Funciona amb Google Calendar, Outlook i Apple Calendar.`,
    downloadCalendar: 'Descarrega el calendari (.ics)',
    footnote:
      "Fonts: RD 1051/2022 (registres de fertilització), RD 1311/2012 i la nota del FEGA del 6 de novembre de 2025 (registres fitosanitaris, en format electrònic a partir de l'1 de gener de 2027), la normativa catalana de gestió del nitrogen (DAN) i l'Ordre anual de la DUN (Ordre ARP/24/2026 per al 2026). Comprova cada data en el text oficial abans de fer-la servir.",
  },

  footer: {
    features: 'Funcionalitats',
    about: 'Qui som',
    contact: 'Contacte',
    login: 'Inicia sessió',
  },
};
