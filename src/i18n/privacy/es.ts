import type { PolicySection, PrivacyMessages } from './en';

/** Política de privacidad, castellano. BORRADOR: requiere revisión jurídica. */

export const es: PrivacyMessages = {
  pageTitle: 'Política de privacidad · Smart Agriculture',
  title: 'Política de privacidad',
  updated: (date: string) => `Última actualización: ${date}`,
  intro:
    'Esta política explica qué datos personales recoge Smart Agriculture (SA.TECH) en smart-agriculture.tech, para qué los usa y qué puedes hacer al respecto. Se aplica al formulario de contacto, al registro e inicio de sesión, y al perfil de la explotación que rellenas después de registrarte.',
  controllerLabels: { name: 'Nombre', taxId: 'NIF', address: 'Dirección', email: 'Correo electrónico' },
  sections: [
    {
      title: '1. Quién es responsable de tus datos',
      paragraphs: ['La responsable del tratamiento es la persona indicada a continuación. Escribe a la dirección de correo para cualquier cuestión sobre tus datos.'],
    },
    {
      title: '2. Qué datos recogemos',
      items: [
        'Formulario de contacto: nombre y apellidos, dirección de correo electrónico y el mensaje que escribes.',
        'Cuenta: nombre, dirección de correo electrónico y contraseña. La contraseña solo la guarda, cifrada con un hash seguro, nuestro proveedor de autenticación; nosotros nunca la vemos.',
        'Perfil de la explotación: los tipos de explotación, indicadores, ubicación y preferencias de notificación que introduces después de registrarte.',
        'Novedades por correo: tu dirección de correo, si pides que te mantengamos informado.',
        'Datos técnicos necesarios para que la web funcione, como la dirección IP en los registros del servidor de nuestro proveedor de alojamiento.',
        'La comprobación normativa de 5 minutos funciona por completo en tu navegador. Tus respuestas no nos llegan y no se guardan.',
      ],
    },
    {
      title: '3. Para qué los usamos y con qué base legal',
      table: {
        head: ['Finalidad', 'Datos', 'Base legal (RGPD)'],
        rows: [
          ['Responder a tu mensaje', 'Formulario de contacto', 'Tu consentimiento, art. 6.1.a'],
          ['Crear y gestionar tu cuenta', 'Cuenta, perfil de la explotación', 'Ejecución de un contrato, art. 6.1.b'],
          ['Enviarte las novedades que has pedido', 'Dirección de correo', 'Tu consentimiento, art. 6.1.a'],
          ['Mantener la web segura y en funcionamiento', 'Datos técnicos', 'Interés legítimo, art. 6.1.f'],
          ['Cumplir obligaciones legales', 'Cualquiera de los anteriores, cuando sea necesario', 'Obligación legal, art. 6.1.c'],
        ],
      },
      paragraphs: ['No usamos tus datos para tomar decisiones automatizadas ni para elaborar perfiles, y no los vendemos.'],
    },
    {
      title: '4. Cuánto tiempo los conservamos',
      items: [
        'Mensajes del formulario de contacto: hasta 12 meses después del último intercambio.',
        'Cuenta y perfil de la explotación: mientras la cuenta esté activa. Cuando la eliminas, borramos los datos en un plazo de 30 días.',
        'Novedades por correo: hasta que te des de baja o retires el consentimiento.',
        'Cuando la ley lo exige (por ejemplo, registros fiscales), conservamos los datos mínimos durante el plazo legal.',
      ],
    },
    {
      title: '5. Con quién los compartimos',
      paragraphs: ['Usamos algunos proveedores que tratan datos por cuenta nuestra, con un contrato de encargo de tratamiento:'],
      items: [
        'Supabase: base de datos e inicio de sesión.',
        'Formspree: hace llegar los mensajes del formulario de contacto a nuestro buzón.',
        'Vercel: aloja la web.',
        'Autoridades públicas, solo cuando lo exige la ley.',
      ],
    },
    {
      title: '6. Transferencias fuera del Espacio Económico Europeo',
      paragraphs: [
        'Algunos de estos proveedores tienen su sede en Estados Unidos. Las transferencias se basan en el Marco de Privacidad de Datos UE-EE. UU., cuando el proveedor está adherido, o en las cláusulas contractuales tipo de la Comisión Europea.',
      ],
    },
    {
      title: '7. Tus derechos',
      paragraphs: [
        'Puedes pedir el acceso a tus datos, rectificarlos o suprimirlos, limitar u oponerte a su tratamiento y recibirlos en un formato portable. Cuando el tratamiento se basa en tu consentimiento, puedes retirarlo en cualquier momento, sin que ello afecte a lo realizado antes.',
        'Escribe a la dirección de correo del apartado 1. Es posible que te pidamos que confirmes tu identidad; respondemos en el plazo de un mes.',
        'Si consideras que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), www.aepd.es.',
      ],
    },
    {
      id: 'cookies',
      title: '8. Cookies y datos guardados en tu navegador',
      items: [
        'El idioma que eliges (EN, CA o ES), para que la web lo recuerde.',
        'Tu sesión, si inicias sesión, para que no tengas que volver a iniciarla.',
        'Que ya has visto el aviso de cookies, para que no vuelva a mostrarse hasta que cambie esta política.',
        'No usamos cookies de analítica, publicidad ni seguimiento.',
      ],
    },
    {
      title: '9. Seguridad',
      paragraphs: [
        'Los datos viajan por conexiones cifradas (HTTPS). El acceso a la base de datos está limitado por cuenta, y cada usuario solo puede leer su propio perfil de explotación.',
      ],
    },
    {
      title: '10. Menores',
      paragraphs: ['Nuestros servicios son para personas adultas. No recogemos conscientemente datos de menores de 14 años.'],
    },
    {
      title: '11. Cambios en esta política',
      paragraphs: [
        'Si cambiamos esta política, publicaremos la nueva versión en esta página con una nueva fecha. Si un cambio afecta a aquello para lo que diste tu consentimiento, te lo volveremos a pedir.',
      ],
    },
  ] as PolicySection[],

  cookieNotice: {
    label: 'Aviso de cookies',
    text: 'Solo usamos las cookies y el almacenamiento del navegador que la web necesita para funcionar: el idioma que eliges y, si inicias sesión, tu sesión. Sin analítica ni publicidad.',
    learnMore: 'Más información',
    ok: 'Entendido',
  },

  consent: {
    accept: 'He leído y acepto la',
    policyLink: 'política de privacidad',
    required: 'Acepta la política de privacidad para continuar.',
    layer: (controller: string, purpose: string, email: string) =>
      `Responsable: ${controller}. Finalidad: ${purpose}. Puedes acceder a tus datos, rectificarlos o suprimirlos en cualquier momento escribiendo a ${email}.`,
    purposes: {
      contact: 'responder a tu mensaje',
      account: 'crear y gestionar tu cuenta',
      updates: 'enviarte las novedades que has pedido',
    },
  },
};
