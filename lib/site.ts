/**
 * Site-wide constants: name, URLs, organization metadata, locale.
 * Single source of truth — referenced by metadata, schema, sitemap, footer.
 */

export const SITE = {
  name: 'OnlineKazino.com',
  tagline: 'Latvijas premium online kazino ceļvedis',
  description:
    'Neatkarīgs Latvijas online kazino ceļvedis. IAUI licencēti operatori, ekspertu pārskati, atbildīga spēle, bonusu salīdzinājumi.',
  url: 'https://www.onlinekazino.com',
  locale: 'lv-LV',
  defaultLanguage: 'lv',
  twitter: '@onlinekazino',
  organization: {
    name: 'OnlineKazino.com',
    legalName: 'OnlineKazino SIA',
    foundingDate: '2022',
    address: {
      addressCountry: 'LV',
    },
  },
  publisher: {
    name: 'OnlineKazino.com',
    logo: 'https://www.onlinekazino.com/logo.png',
  },
  // Authors used in JSON-LD `Person` blocks. Maps slug → bio.
  authors: {
    'aldis-skuja': {
      name: 'Aldis Skuja',
      role: 'Galvenais redaktors',
      bio: 'Aldis Skuja ir azartspēļu industrijas analītiķis ar vairāk nekā 12 gadu pieredzi Baltijas tirgū. Specializējas regulējumu un licencēšanas jautājumos.',
      url: 'https://www.onlinekazino.com/autori/aldis-skuja/',
    },
    'anna-jansons': {
      name: 'Anna Jansons',
      role: 'Vecākā satura autore',
      bio: 'Anna Jansons raksta par online kazino, bonusiem un spēļu stratēģijām kopš 2018. gada. Padziļinātās zināšanas par maksājumu metodēm un atbildīgu spēli Latvijā.',
      url: 'https://www.onlinekazino.com/autori/anna-jansons/',
    },
  },
} as const;

export const NAV_PRIMARY = [
  { href: '/kazino/', label: 'Kazino' },
  { href: '/bonusi/', label: 'Bonusi' },
  { href: '/speles/', label: 'Spēles' },
  { href: '/maksajumi/', label: 'Maksājumi' },
  { href: '/raksti/', label: 'Raksti' },
  { href: '/atbildiga-spele/', label: 'Atbildīga spēle' },
] as const;

export const NAV_FOOTER = {
  company: [
    { href: '/par-mums/', label: 'Par mums' },
    { href: '/redakcionala-politika/', label: 'Redakcionālā politika' },
    { href: '/metodologija/', label: 'Vērtēšanas metodoloģija' },
    { href: '/kontakti/', label: 'Kontakti' },
  ],
  legal: [
    { href: '/privatuma-politika/', label: 'Privātuma politika' },
    { href: '/lietosanas-noteikumi/', label: 'Lietošanas noteikumi' },
    { href: '/sikdatnes/', label: 'Sīkdatnes' },
  ],
  player: [
    { href: '/atbildiga-spele/', label: 'Atbildīga spēle' },
    { href: '/atbildiga-spele/pasatteikuso-registrs/', label: 'Pašatteikušos personu reģistrs' },
    { href: '/atbildiga-spele/limitu-iestatisana/', label: 'Limitu iestatīšana' },
  ],
} as const;
