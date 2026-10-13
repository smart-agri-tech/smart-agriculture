/**
 * Privacy policy, English. This file defines the shape; `ca.ts` and `es.ts` must match it.
 * DRAFT based on GDPR and Spain's LOPDGDD; have it reviewed by a lawyer.
 */

export interface PolicySection {
  /** Anchor for links such as /privacy#cookies. */
  id?: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  /** Purpose → legal basis rows. */
  table?: { head: [string, string, string]; rows: [string, string, string][] };
}

export const en = {
  pageTitle: 'Privacy policy · Smart Agriculture',
  title: 'Privacy policy',
  updated: (date: string) => `Last updated: ${date}`,
  intro:
    'This policy explains what personal data Smart Agriculture (SA.TECH) collects through smart-agriculture.tech, why, and what you can do about it. It applies to the contact form, account sign-up and sign-in, and the farm profile you fill in after signing up.',
  controllerLabels: { name: 'Name', taxId: 'NIF', address: 'Address', email: 'Email' },
  sections: [
    {
      title: '1. Who is responsible for your data',
      paragraphs: ['The data controller is the person below. Write to the email address for any question about your data.'],
    },
    {
      title: '2. What data we collect',
      items: [
        'Contact form: your first and last name, email address and the message you write.',
        'Account: your name, email address and password. The password is stored only as a secure hash by our authentication provider; we never see it.',
        'Farm profile: the farm types, monitoring indicators, location and notification preferences you enter after signing up.',
        'Email updates: your email address, if you ask to be kept informed.',
        'Technical data needed to run the site, such as your IP address in our hosting provider’s server logs.',
        'The 5-minute Farm Compliance Check runs entirely in your browser. Your answers are not sent to us and are not stored.',
      ],
    },
    {
      title: '3. Why we use it and on what legal basis',
      table: {
        head: ['Purpose', 'Data', 'Legal basis (GDPR)'],
        rows: [
          ['Answer your message', 'Contact form', 'Your consent, art. 6.1.a'],
          ['Create and run your account', 'Account, farm profile', 'Performance of a contract, art. 6.1.b'],
          ['Send the updates you asked for', 'Email address', 'Your consent, art. 6.1.a'],
          ['Keep the site secure and working', 'Technical data', 'Legitimate interest, art. 6.1.f'],
          ['Meet legal obligations', 'Any of the above, where required', 'Legal obligation, art. 6.1.c'],
        ],
      },
      paragraphs: ['We do not use your data for automated decisions or profiling, and we do not sell it.'],
    },
    {
      title: '4. How long we keep it',
      items: [
        'Messages from the contact form: up to 12 months after our last exchange.',
        'Account and farm profile: while your account is active. When you delete it, we erase the data within 30 days.',
        'Email updates: until you unsubscribe or withdraw your consent.',
        'Where the law requires it (for example, tax records), we keep the minimum data for the legal period.',
      ],
    },
    {
      title: '5. Who we share it with',
      paragraphs: [
        'We use a few service providers that process data on our behalf, under a data processing agreement:',
      ],
      items: [
        'Supabase — database and account sign-in.',
        'Formspree — delivers contact form messages to our inbox.',
        'Vercel — hosts the website.',
        'Public authorities, only when the law requires it.',
      ],
    },
    {
      title: '6. Transfers outside the European Economic Area',
      paragraphs: [
        'Some of these providers are based in the United States. Transfers rely on the EU–US Data Privacy Framework where the provider is certified, or on the European Commission’s standard contractual clauses.',
      ],
    },
    {
      title: '7. Your rights',
      paragraphs: [
        'You can ask to access, correct or delete your data, restrict or object to its use, and receive it in a portable format. Where we rely on your consent, you can withdraw it at any time; this does not affect what we did before.',
        'Write to the email address in section 1. We may ask you to confirm your identity, and we answer within one month.',
        'If you think we have not handled your data properly, you can complain to the Spanish Data Protection Agency (AEPD), www.aepd.es.',
      ],
    },
    {
      id: 'cookies',
      title: '8. Cookies and data stored in your browser',
      items: [
        'Your language choice (EN, CA or ES), so the site remembers it.',
        'Your sign-in session, if you log in, so you stay signed in.',
        'That you have seen the cookie notice, so it is not shown again until this policy changes.',
        'We do not use analytics, advertising or tracking cookies.',
      ],
    },
    {
      title: '9. Security',
      paragraphs: [
        'Data travels over encrypted connections (HTTPS). Access to the database is limited by account, and each user can read only their own farm profile.',
      ],
    },
    {
      title: '10. Minors',
      paragraphs: ['Our services are for adults. We do not knowingly collect data from anyone under 14.'],
    },
    {
      title: '11. Changes to this policy',
      paragraphs: [
        'If we change this policy we publish the new version on this page with a new date. If a change affects what you consented to, we will ask again.',
      ],
    },
  ] as PolicySection[],

  cookieNotice: {
    label: 'Cookie notice',
    text: 'We only use cookies and browser storage that the site needs to work: your language choice and, if you sign in, your session. No analytics or advertising.',
    learnMore: 'Learn more',
    ok: 'OK',
  },

  /** Short first layer shown under every consent checkbox. */
  consent: {
    accept: 'I have read and accept the',
    policyLink: 'privacy policy',
    required: 'Please accept the privacy policy to continue.',
    layer: (controller: string, purpose: string, email: string) =>
      `Controller: ${controller}. Purpose: ${purpose}. You can access, correct or delete your data at any time by writing to ${email}.`,
    purposes: {
      contact: 'to answer your message',
      account: 'to create and run your account',
      updates: 'to send you the updates you asked for',
    },
  },
};

export type PrivacyMessages = typeof en;
