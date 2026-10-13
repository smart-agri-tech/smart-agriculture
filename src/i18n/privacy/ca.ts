import type { PolicySection, PrivacyMessages } from './en';

/** Política de privacitat, català. ESBORRANY: cal revisió jurídica. */

export const ca: PrivacyMessages = {
  pageTitle: 'Política de privacitat · Smart Agriculture',
  title: 'Política de privacitat',
  updated: (date: string) => `Darrera actualització: ${date}`,
  intro:
    "Aquesta política explica quines dades personals recull Smart Agriculture (SA.TECH) a smart-agriculture.tech, per a què les fa servir i què hi pots fer. S'aplica al formulari de contacte, al registre i l'inici de sessió, i al perfil de l'explotació que omples després de registrar-te.",
  controllerLabels: { name: 'Nom', taxId: 'NIF', address: 'Adreça', email: 'Correu electrònic' },
  sections: [
    {
      title: '1. Qui és responsable de les teves dades',
      paragraphs: ["La responsable del tractament és la persona que s'indica a continuació. Escriu a l'adreça de correu per a qualsevol qüestió sobre les teves dades."],
    },
    {
      title: '2. Quines dades recollim',
      items: [
        'Formulari de contacte: nom i cognoms, adreça de correu electrònic i el missatge que escrius.',
        "Compte: nom, adreça de correu electrònic i contrasenya. La contrasenya només la desa, xifrada amb un hash segur, el nostre proveïdor d'autenticació; nosaltres no la veiem mai.",
        "Perfil de l'explotació: els tipus d'explotació, els indicadors, la ubicació i les preferències de notificació que introdueixes després de registrar-te.",
        'Novetats per correu: la teva adreça de correu, si demanes que et mantinguem informat.',
        "Dades tècniques necessàries per fer funcionar el web, com ara l'adreça IP als registres del servidor del nostre proveïdor d'allotjament.",
        "La comprovació normativa de 5 minuts funciona completament al teu navegador. Les teves respostes no ens arriben i no es desen.",
      ],
    },
    {
      title: '3. Per a què les fem servir i amb quina base legal',
      table: {
        head: ['Finalitat', 'Dades', 'Base legal (RGPD)'],
        rows: [
          ['Respondre el teu missatge', 'Formulari de contacte', 'El teu consentiment, art. 6.1.a'],
          ['Crear i gestionar el teu compte', "Compte, perfil de l'explotació", "Execució d'un contracte, art. 6.1.b"],
          ['Enviar-te les novetats que has demanat', 'Adreça de correu', 'El teu consentiment, art. 6.1.a'],
          ['Mantenir el web segur i en funcionament', 'Dades tècniques', 'Interès legítim, art. 6.1.f'],
          ['Complir obligacions legals', "Qualsevol de les anteriors, quan calgui", 'Obligació legal, art. 6.1.c'],
        ],
      },
      paragraphs: ["No fem servir les teves dades per prendre decisions automatitzades ni per elaborar perfils, i no les venem."],
    },
    {
      title: '4. Quant de temps les conservem',
      items: [
        "Missatges del formulari de contacte: fins a 12 mesos després de l'últim intercanvi.",
        "Compte i perfil de l'explotació: mentre el compte estigui actiu. Quan l'elimines, esborrem les dades en un termini de 30 dies.",
        'Novetats per correu: fins que et donis de baixa o retiris el consentiment.',
        'Quan la llei ho exigeix (per exemple, registres fiscals), conservem les dades mínimes durant el termini legal.',
      ],
    },
    {
      title: '5. Amb qui les compartim',
      paragraphs: ["Fem servir alguns proveïdors que tracten dades per compte nostre, amb un contracte d'encàrrec de tractament:"],
      items: [
        'Supabase: base de dades i inici de sessió.',
        'Formspree: fa arribar els missatges del formulari de contacte a la nostra bústia.',
        'Vercel: allotja el web.',
        'Autoritats públiques, només quan ho exigeix la llei.',
      ],
    },
    {
      title: "6. Transferències fora de l'Espai Econòmic Europeu",
      paragraphs: [
        "Alguns d'aquests proveïdors tenen la seu als Estats Units. Les transferències es basen en el Marc de Privacitat de Dades UE-EUA, quan el proveïdor hi està adherit, o en les clàusules contractuals tipus de la Comissió Europea.",
      ],
    },
    {
      title: '7. Els teus drets',
      paragraphs: [
        "Pots demanar l'accés a les teves dades, rectificar-les o suprimir-les, limitar-ne o oposar-te'n al tractament i rebre-les en un format portable. Quan el tractament es basa en el teu consentiment, el pots retirar en qualsevol moment, sense que això afecti el que s'hagi fet abans.",
        "Escriu a l'adreça de correu de l'apartat 1. És possible que et demanem que confirmis la teva identitat; responem en el termini d'un mes.",
        "Si consideres que no hem tractat bé les teves dades, pots presentar una reclamació a l'Agència Espanyola de Protecció de Dades (AEPD), www.aepd.es.",
      ],
    },
    {
      id: 'cookies',
      title: '8. Galetes i dades desades al navegador',
      items: [
        "L'idioma que tries (EN, CA o ES), perquè el web el recordi.",
        "La teva sessió, si inicies sessió, perquè no l'hagis de tornar a iniciar.",
        "Que ja has vist l'avís de galetes, perquè no es torni a mostrar fins que canviï aquesta política.",
        "No fem servir galetes d'analítica, de publicitat ni de seguiment.",
      ],
    },
    {
      title: '9. Seguretat',
      paragraphs: [
        "Les dades viatgen per connexions xifrades (HTTPS). L'accés a la base de dades està limitat per compte, i cada usuari només pot llegir el seu perfil d'explotació.",
      ],
    },
    {
      title: '10. Menors',
      paragraphs: ["Els nostres serveis són per a persones adultes. No recollim conscientment dades de menors de 14 anys."],
    },
    {
      title: '11. Canvis en aquesta política',
      paragraphs: [
        "Si canviem aquesta política, publicarem la nova versió en aquesta pàgina amb una data nova. Si un canvi afecta allò a què vas donar el consentiment, te'l tornarem a demanar.",
      ],
    },
  ] as PolicySection[],

  cookieNotice: {
    label: 'Avís de galetes',
    text: "Només fem servir les galetes i l'emmagatzematge del navegador que el web necessita per funcionar: l'idioma que tries i, si inicies sessió, la teva sessió. Sense analítica ni publicitat.",
    learnMore: 'Més informació',
    ok: "D'acord",
  },

  consent: {
    accept: 'He llegit i accepto la',
    policyLink: 'política de privacitat',
    required: 'Accepta la política de privacitat per continuar.',
    layer: (controller: string, purpose: string, email: string) =>
      `Responsable: ${controller}. Finalitat: ${purpose}. Pots accedir a les teves dades, rectificar-les o suprimir-les en qualsevol moment escrivint a ${email}.`,
    purposes: {
      contact: 'respondre el teu missatge',
      account: 'crear i gestionar el teu compte',
      updates: "enviar-te les novetats que has demanat",
    },
  },
};
