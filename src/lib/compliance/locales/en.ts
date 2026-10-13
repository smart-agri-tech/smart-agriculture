/** English texts. This file defines the `Messages` shape; `ca.ts` and `es.ts` must match it. */

const numberWords = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const word = (n: number) => numberWords[n] ?? String(n);
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
const list = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export const en = {
  locale: 'en-GB',
  langName: 'English',
  /** Official pages are in Catalan or Spanish; English readers get the Catalan one. */
  officialLang: 'ca' as 'ca' | 'es',

  questions: {
    region: {
      title: 'Where is your farm?',
      help: 'The check currently covers Catalan rules only.',
      options: { catalonia: 'Catalonia', other: 'Another region of Spain' },
    },
    farmTypes: {
      title: 'What do you farm?',
      help: 'Select all that apply.',
      options: {
        arable: 'Arable crops',
        fruit: 'Fruit trees',
        olive: 'Olives',
        vineyard: 'Vineyard',
        horticulture: 'Vegetables',
        livestock: 'Livestock',
        other: 'Other',
      },
      otherPlaceholder: 'Tell us what you farm',
    },
    area: {
      title: 'How large is your farm?',
      options: {
        lt1: 'Under 1 ha',
        '1to5': '1 to 5 ha',
        '5to10': '5 to 10 ha',
        '10to50': '10 to 50 ha',
        '50to200': '50 to 200 ha',
        gt200: 'More than 200 ha',
      },
    },
    privateConsumptionOnly: {
      title: 'Is everything you produce for your own household?',
      options: { no: 'No, I sell some or all of it', yes: 'Yes, private consumption only' },
    },
    fertiliser: {
      title: 'Do you apply fertilisers?',
      options: { none: 'No', mineral: 'Mineral fertilisers', organic: 'Organic fertilisers', both: 'Both' },
    },
    manure: {
      title: 'Do you use manure or slurry?',
      options: {
        none: 'No',
        own: 'Yes, from my own livestock',
        receive: 'Yes, I receive it from another farm',
        both: 'Both',
      },
    },
    plantProtection: {
      title: 'Do you use plant protection products?',
      options: { none: 'No', self: 'Yes, I apply them myself', contractor: 'Yes, through a contractor' },
    },
    irrigation: {
      title: 'How are your crops watered?',
      options: { rainfed: 'Rainfed', irrigated: 'Irrigated', fertigation: 'Irrigated with fertigation' },
    },
    schemes: {
      title: 'Which schemes are you part of?',
      help: 'Select all that apply.',
      options: {
        cap_submitted: 'CAP direct aid, already applied this year',
        cap_pending: 'CAP direct aid, not applied yet',
        eco: 'Eco-schemes',
        organic: 'Organic certification',
        integrated: 'Integrated production',
        none: 'None of these',
      },
    },
    recordMethods: {
      title: 'Where do you keep your farm records today?',
      help: 'Select all that apply.',
      options: {
        paper: 'Paper notebook',
        excel: 'Excel or spreadsheets',
        whatsapp: 'WhatsApp messages or photos',
        digital: 'A digital farm notebook',
        none: 'I do not keep records',
      },
    },
    preparer: {
      title: 'Who prepares your declarations?',
      options: {
        self: 'I do it myself',
        cooperative: 'My cooperative',
        advisor: 'An advisor or gestoria',
        nobody: 'Nobody at the moment',
      },
    },
    timeSpent: {
      title: 'How much time do you spend on paperwork each year?',
      options: { lt5: 'Under 5 hours', '5to10': '5 to 10 hours', '10to20': '10 to 20 hours', gt20: 'More than 20 hours' },
    },
  },

  requirements: {
    dun: { name: 'DUN 2026', need: 'Annual farm declaration' },
    cap: { name: 'CAP aid application', need: 'Direct aid application' },
    dan: {
      name: 'DAN 2026',
      needRequired: 'Annual nitrogen declaration for the manure your farm produces.',
      needLikely: 'Annual nitrogen declaration. We need two more details to confirm.',
    },
    qie: { name: 'QIE · farm records', areas: { treatments: 'treatments', fertilisation: 'fertilisation', irrigation: 'irrigation' } },
    fertilisation: {
      name: 'Fertilisation records',
      need: 'Record every nutrient application',
      needFertigation: 'Record every nutrient application, plus irrigation dose and N and P in the water',
    },
  },

  /** Deadline column. Used only while the matching date in `deadlines.ts` is confirmed. */
  deadlines: {
    dun: 'Feb–Apr 2027',
    cap: '1 Feb – 15 May 2026',
    dan: '20 January 2027',
    qie: 'Ongoing · electronic from 1 January 2027',
    qieUnconfirmed: 'Ongoing',
    fertilisation: 'Within 1 month of the operation',
  },

  sources: {
    dunOrdre: 'Ordre ARP/24/2026',
    annualDun: 'Annual DUN Ordre',
    dan: 'Catalan nitrogen management rules (DAN)',
    qie: 'RD 1311/2012; FEGA note of 6 Nov 2025',
    fega: 'FEGA note of 6 Nov 2025',
    rd1051: 'RD 1051/2022',
    rd1311: 'RD 1311/2012',
  },

  notices: {
    noRecords: 'You keep no farm records, but your operations require them',
    severalPlaces: 'Fertilisation records are stored in several places at once',
    danProduces: 'DAN applies because your farm produces manure',
    danReceives: 'DAN may apply to your farm because you receive manure',
    capPending: 'Your CAP aid application has not been submitted yet',
    nobody: 'Nobody is responsible for preparing your declarations',
    dunInScope: 'DUN identified and in scope',
    phytoMaintained: 'Phytosanitary records are being maintained',
    digitalInUse: 'A digital farm notebook is already in use',
    privateOnly: 'Private consumption only: no DUN declaration needed',
  },

  data: {
    noRecords: 'You do not keep records yet',
    liveIn: (places: string[]) => `Your records live in ${list(places)}`,
    methods: { paper: 'paper', excel: 'Excel', whatsapp: 'WhatsApp', digital: 'a digital farm notebook', none: 'nowhere' },
  },

  burden: {
    levels: { low: 'Low', medium: 'Medium', high: 'High', veryHigh: 'Very high' },
    hours: { lt5: 'under 5 hours', '5to10': '5 to 10 hours', '10to20': '10 to 20 hours', gt20: 'more than 20 hours' },
    summary: (hours: string) => `You estimated ${hours} a year`,
  },

  counters: {
    days: (n: number) => `${n} ${plural(n, 'day', 'days')}`,
    years: (n: number) => `${n} ${plural(n, 'year', 'years')}`,
    inForce: (span: string) => `in force ${span}`,
    startsIn: (span: string) => `starts in ${span}`,
    opensIn: (span: string) => `opens in ${span}`,
    closesIn: (span: string) => `closes in ${span}`,
    closed: 'closed',
  },

  keyDates: {
    'phyto-electronic': { date: '1 Jan 2027', title: 'Electronic phytosanitary register' },
    dan: { date: '20 Jan 2027', title: 'DAN · annual nitrogen declaration' },
    fertilisation: { date: '1 Jan 2026', title: 'Fertilisation records' },
    treatments: { date: 'Since 2013', title: 'Treatment register' },
    cue: { date: '1 Jan 2028', title: 'Digital farm notebook (CUE)' },
    dun: { date: 'Feb–Apr 2027', title: 'DUN · annual farm declaration' },
  },

  ics: {
    calendarName: 'Farm compliance deadlines',
    labels: {
      dun: 'DUN 2026 · annual farm declaration',
      cap: 'CAP aid application',
      dan: 'DAN 2026 · annual nitrogen declaration',
      qie: 'Electronic phytosanitary register becomes mandatory',
      fertilisation: 'Fertilisation records · monthly check',
    },
    toConfirm: '(date to confirm)',
    windowOpens: (date: string) => `Filing window opens ${date}.`,
    source: (source: string) => `Source: ${source}.`,
    unconfirmed: 'This date has not yet been confirmed against the published campaign. Check it before relying on it.',
    reminder: (label: string, days: number) => `${label} in ${days} days`,
  },

  ui: {
    tagline: '5-minute Farm Compliance Check · Catalonia',
    startAgain: 'Start again',
    language: 'Language',
    questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    seeResult: 'See my result',
    noLogin: 'No login and no personal data needed to see your result.',
    outOfRegionTitle: 'We only cover Catalonia for now',
    outOfRegionBody:
      'The rules for declarations and farm records differ between regions. We are adding other regions next. Check back soon.',
    yourResult: 'Your result',
    resultTitle: 'Your Farm Compliance Map',
    pdfTitle: 'Farm Compliance Map · SA.TECH',
    summary: (answers: number, applies: number, attention: number) =>
      `Based on your ${answers} answers, ${word(applies)} ${plural(applies, 'requirement applies', 'requirements apply')} to your farm and ${word(attention)} ${plural(attention, 'needs', 'need')} attention.`,
    savePdf: 'Save as PDF',
    complianceReadiness: 'Compliance readiness',
    dataReadiness: 'Data readiness',
    administrativeBurden: 'Administrative burden',
    outOf100: '/ 100',
    risks: (n: number) => (n === 0 ? 'No risks detected' : `${n} potential ${plural(n, 'risk', 'risks')} detected`),
    appliesTitle: 'What applies to your farm',
    noneApply: 'Based on your answers, none of the requirements we check apply to your farm.',
    columns: { requirement: 'Requirement', status: 'Status', need: 'What you need', deadline: 'Deadline' },
    deadlinePrefix: 'Deadline:',
    sourcePrefix: 'Source:',
    status: {
      required: 'Required',
      completed: 'Completed',
      likely: 'Likely applicable',
      check: 'Check records',
      on_track: 'On track',
    },
    keyDatesTitle: 'Key dates',
    noticedTitle: 'What we noticed',
    calendarTitle: 'Put the dates in your calendar',
    calendarBody: (n: number) =>
      `${word(n).replace(/^./, c => c.toUpperCase())} ${plural(n, 'deadline', 'deadlines')}, each with a reminder two weeks ahead. Works in Google Calendar, Outlook and Apple Calendar.`,
    downloadCalendar: 'Download calendar (.ics)',
    footnote:
      'Sources: RD 1051/2022 (fertilisation records), RD 1311/2012 and the FEGA note of 6 November 2025 (phytosanitary records, machine-readable from 1 January 2027), Catalan nitrogen management rules (DAN), and the annual DUN Ordre (Ordre ARP/24/2026 for 2026). Check each date against the official text before relying on it.',
  },

  footer: {
    features: 'Features',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
  },
};

export type Messages = typeof en;
