import type { Messages } from './en';

/** Spanish (Castilian) texts. */

const numberWords = ['ningún', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
const word = (n: number) => numberWords[n] ?? String(n);
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

export const es: Messages = {
  locale: 'es-ES',
  langName: 'Castellano',
  officialLang: 'es',

  questions: {
    region: {
      title: '¿Dónde está tu explotación?',
      help: 'Por ahora, la comprobación solo cubre la normativa catalana.',
      options: { catalonia: 'Cataluña', other: 'Otra comunidad autónoma' },
    },
    farmTypes: {
      title: '¿Qué produces?',
      help: 'Marca todas las opciones que correspondan.',
      options: {
        arable: 'Cultivos extensivos',
        fruit: 'Frutales',
        olive: 'Olivar',
        vineyard: 'Viñedo',
        horticulture: 'Hortalizas',
        livestock: 'Ganadería',
        other: 'Otros',
      },
      otherPlaceholder: 'Cuéntanos qué produces',
    },
    area: {
      title: '¿Qué tamaño tiene tu explotación?',
      options: {
        lt1: 'Menos de 1 ha',
        '1to5': 'De 1 a 5 ha',
        '5to10': 'De 5 a 10 ha',
        '10to50': 'De 10 a 50 ha',
        '50to200': 'De 50 a 200 ha',
        gt200: 'Más de 200 ha',
      },
    },
    privateConsumptionOnly: {
      title: '¿Todo lo que produces es para tu propio consumo?',
      options: { no: 'No, vendo una parte o todo', yes: 'Sí, solo autoconsumo' },
    },
    fertiliser: {
      title: '¿Aplicas fertilizantes?',
      options: { none: 'No', mineral: 'Fertilizantes minerales', organic: 'Fertilizantes orgánicos', both: 'Ambos' },
    },
    manure: {
      title: '¿Usas estiércol o purines?',
      options: {
        none: 'No',
        own: 'Sí, de mi propio ganado',
        receive: 'Sí, los recibo de otra explotación',
        both: 'Ambas cosas',
      },
    },
    plantProtection: {
      title: '¿Usas productos fitosanitarios?',
      options: { none: 'No', self: 'Sí, los aplico yo', contractor: 'Sí, a través de una empresa de servicios' },
    },
    irrigation: {
      title: '¿Cómo riegas tus cultivos?',
      options: { rainfed: 'Secano', irrigated: 'Regadío', fertigation: 'Regadío con fertirrigación' },
    },
    schemes: {
      title: '¿En qué regímenes participas?',
      help: 'Marca todas las opciones que correspondan.',
      options: {
        cap_submitted: 'Ayudas directas de la PAC, ya solicitadas este año',
        cap_pending: 'Ayudas directas de la PAC, aún no solicitadas',
        eco: 'Ecorregímenes',
        organic: 'Certificación ecológica',
        integrated: 'Producción integrada',
        none: 'Ninguno de estos',
      },
    },
    recordMethods: {
      title: '¿Dónde llevas ahora los registros de la explotación?',
      help: 'Marca todas las opciones que correspondan.',
      options: {
        paper: 'Libreta en papel',
        excel: 'Excel u hojas de cálculo',
        whatsapp: 'Mensajes o fotos de WhatsApp',
        digital: 'Un cuaderno de explotación digital',
        none: 'No llevo registros',
      },
    },
    preparer: {
      title: '¿Quién prepara tus declaraciones?',
      options: {
        self: 'Yo mismo',
        cooperative: 'Mi cooperativa',
        advisor: 'Un asesor o una gestoría',
        nobody: 'Nadie, por ahora',
      },
    },
    timeSpent: {
      title: '¿Cuánto tiempo dedicas al papeleo cada año?',
      options: { lt5: 'Menos de 5 horas', '5to10': 'De 5 a 10 horas', '10to20': 'De 10 a 20 horas', gt20: 'Más de 20 horas' },
    },
  },

  requirements: {
    dun: { name: 'DUN 2026', need: 'Declaración agraria anual' },
    cap: { name: 'Solicitud de ayudas PAC', need: 'Solicitud de ayudas directas' },
    dan: {
      name: 'DAN 2026',
      needRequired: 'Declaración anual de nitrógeno por las deyecciones que produce tu explotación.',
      needLikely: 'Declaración anual de nitrógeno. Necesitamos dos datos más para confirmarlo.',
    },
    qie: {
      name: 'QIE · registros de la explotación',
      areas: { treatments: 'tratamientos', fertilisation: 'fertilización', irrigation: 'riego' },
    },
    fertilisation: {
      name: 'Registro de fertilización',
      need: 'Registra cada aplicación de nutrientes',
      needFertigation: 'Registra cada aplicación de nutrientes, además de la dosis de riego y el N y el P del agua',
    },
  },

  deadlines: {
    dun: 'feb–abr 2027',
    cap: '1 feb – 15 may 2026',
    dan: '20 de enero de 2027',
    qie: 'Continuo · electrónico desde el 1 de enero de 2027',
    qieUnconfirmed: 'Continuo',
    fertilisation: 'En el plazo de 1 mes desde la operación',
  },

  sources: {
    dunOrdre: 'Ordre ARP/24/2026',
    annualDun: 'Orden anual de la DUN',
    dan: 'Normativa catalana de gestión del nitrógeno (DAN)',
    qie: 'RD 1311/2012; nota del FEGA del 6 nov 2025',
    fega: 'Nota del FEGA del 6 nov 2025',
    rd1051: 'RD 1051/2022',
    rd1311: 'RD 1311/2012',
  },

  notices: {
    noRecords: 'No llevas registros de la explotación, pero tus operaciones lo requieren',
    severalPlaces: 'Los registros de fertilización están repartidos en varios sitios a la vez',
    danProduces: 'La DAN se aplica porque tu explotación produce deyecciones ganaderas',
    danReceives: 'Puede que la DAN se aplique a tu explotación porque recibes deyecciones ganaderas',
    capPending: 'Todavía no has presentado la solicitud de ayudas PAC',
    nobody: 'Nadie se encarga de preparar tus declaraciones',
    dunInScope: 'DUN identificada y dentro del alcance',
    phytoMaintained: 'Se llevan registros fitosanitarios',
    digitalInUse: 'Ya usas un cuaderno de explotación digital',
    privateOnly: 'Solo autoconsumo: no hace falta presentar la DUN',
  },

  data: {
    noRecords: 'Todavía no llevas registros',
    liveIn: (places: string[]) => `Tus registros están en ${list(places)}`,
    methods: { paper: 'papel', excel: 'Excel', whatsapp: 'WhatsApp', digital: 'un cuaderno de explotación digital', none: 'ningún sitio' },
  },

  burden: {
    levels: { low: 'Baja', medium: 'Media', high: 'Alta', veryHigh: 'Muy alta' },
    hours: { lt5: 'menos de 5 horas', '5to10': 'de 5 a 10 horas', '10to20': 'de 10 a 20 horas', gt20: 'más de 20 horas' },
    summary: (hours: string) => `Has estimado ${hours} al año`,
  },

  counters: {
    days: (n: number) => `${n} ${plural(n, 'día', 'días')}`,
    years: (n: number) => `${n} ${plural(n, 'año', 'años')}`,
    inForce: (span: string) => `en vigor desde hace ${span}`,
    startsIn: (span: string) => `empieza en ${span}`,
    opensIn: (span: string) => `se abre en ${span}`,
    closesIn: (span: string) => `se cierra en ${span}`,
    closed: 'cerrado',
  },

  keyDates: {
    'phyto-electronic': { date: '1 ene 2027', title: 'Registro fitosanitario electrónico' },
    dan: { date: '20 ene 2027', title: 'DAN · declaración anual de nitrógeno' },
    fertilisation: { date: '1 ene 2026', title: 'Registro de fertilización' },
    treatments: { date: 'Desde 2013', title: 'Registro de tratamientos' },
    cue: { date: '1 ene 2028', title: 'Cuaderno de explotación digital (CUE)' },
    dun: { date: 'feb–abr 2027', title: 'DUN · declaración agraria anual' },
  },

  ics: {
    calendarName: 'Plazos normativos de la explotación',
    labels: {
      dun: 'DUN 2026 · declaración agraria anual',
      cap: 'Solicitud de ayudas PAC',
      dan: 'DAN 2026 · declaración anual de nitrógeno',
      qie: 'El registro fitosanitario electrónico pasa a ser obligatorio',
      fertilisation: 'Registro de fertilización · revisión mensual',
    },
    toConfirm: '(fecha por confirmar)',
    windowOpens: (date: string) => `El plazo de presentación se abre el ${date}.`,
    source: (source: string) => `Fuente: ${source}.`,
    unconfirmed: 'Esta fecha aún no se ha confirmado con la campaña publicada. Compruébala antes de usarla.',
    reminder: (label: string, days: number) => `${label} en ${days} días`,
  },

  ui: {
    tagline: 'Comprobación normativa de la explotación en 5 minutos · Cataluña',
    startAgain: 'Volver a empezar',
    language: 'Idioma',
    questionOf: (n: number, total: number) => `Pregunta ${n} de ${total}`,
    back: 'Atrás',
    next: 'Siguiente',
    seeResult: 'Ver mi resultado',
    noLogin: 'No hace falta registrarse ni dar datos personales para ver el resultado.',
    outOfRegionTitle: 'Por ahora solo cubrimos Cataluña',
    outOfRegionBody:
      'La normativa de declaraciones y registros de la explotación varía entre comunidades autónomas. Pronto añadiremos más.',
    yourResult: 'Tu resultado',
    resultTitle: 'El mapa normativo de tu explotación',
    pdfTitle: 'Mapa normativo de la explotación · SA.TECH',
    summary: (answers: number, applies: number, attention: number) =>
      `Según tus ${answers} respuestas, ${
        applies === 0
          ? 'no se aplica ningún requisito'
          : `${plural(applies, 'se aplica', 'se aplican')} ${word(applies)} ${plural(applies, 'requisito', 'requisitos')}`
      } a tu explotación y ${attention === 0 ? 'ninguno necesita' : `${word(attention)} ${plural(attention, 'necesita', 'necesitan')}`} atención.`,
    savePdf: 'Guardar en PDF',
    complianceReadiness: 'Preparación normativa',
    dataReadiness: 'Preparación de los datos',
    administrativeBurden: 'Carga administrativa',
    outOf100: '/ 100',
    risks: (n: number) =>
      n === 0 ? 'No se ha detectado ningún riesgo' : `${n} ${plural(n, 'riesgo potencial detectado', 'riesgos potenciales detectados')}`,
    appliesTitle: 'Qué se aplica a tu explotación',
    noneApply: 'Según tus respuestas, ninguno de los requisitos que comprobamos se aplica a tu explotación.',
    columns: { requirement: 'Requisito', status: 'Estado', need: 'Qué necesitas', deadline: 'Plazo' },
    deadlinePrefix: 'Plazo:',
    sourcePrefix: 'Fuente:',
    status: {
      required: 'Obligatorio',
      completed: 'Completado',
      likely: 'Probablemente aplicable',
      check: 'Revisa los registros',
      on_track: 'Al día',
    },
    keyDatesTitle: 'Fechas clave',
    noticedTitle: 'Qué hemos detectado',
    calendarTitle: 'Añade las fechas a tu calendario',
    calendarBody: (n: number) =>
      `${word(n).replace(/^./, c => c.toUpperCase())} ${plural(n, 'plazo', 'plazos')}, ${plural(n, 'con un recordatorio', 'cada uno con un recordatorio')} dos semanas antes. Funciona con Google Calendar, Outlook y Apple Calendar.`,
    downloadCalendar: 'Descargar calendario (.ics)',
    footnote:
      'Fuentes: RD 1051/2022 (registros de fertilización), RD 1311/2012 y la nota del FEGA del 6 de noviembre de 2025 (registros fitosanitarios, en formato electrónico desde el 1 de enero de 2027), la normativa catalana de gestión del nitrógeno (DAN) y la Orden anual de la DUN (Ordre ARP/24/2026 para 2026). Comprueba cada fecha en el texto oficial antes de usarla.',
  },

  footer: {
    features: 'Funcionalidades',
    about: 'Quiénes somos',
    contact: 'Contacto',
    login: 'Iniciar sesión',
  },
};
