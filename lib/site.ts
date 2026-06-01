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
      longBio:
        'Aldis savu karjeru azartspēļu jomā sāka 2013. gadā, sākotnēji strādājot Igaunijas operatora compliance komandā un vēlāk pārejot uz neatkarīgu industrijas analīzi. Viņš ir publicējis dažādās Baltijas finanšu un biznesa publikācijās par regulējumu attīstību, IAUI lēmumiem un Baltijas valstu salīdzinošajām politikām. Viņa redakcijas darbs OnlineKazino.com ietver visu pārskatu galīgo apstiprināšanu, faktu pārbaudi un partneru attiecību nodalīšanu no redakcijas lēmumiem.',
      role_yearsExperience: 12,
      specialties: ['Regulējumi un licences', 'IAUI un Baltijas tirgi', 'Editorial standards', 'Atbildīga spēle'],
      url: 'https://www.onlinekazino.com/autori/aldis-skuja/',
      wpAuthorId: 'dt_admin',
      email: 'aldis@onlinekazino.com',
    },
    'anna-jansons': {
      name: 'Anna Jansons',
      role: 'Vecākā satura autore',
      bio: 'Anna Jansons raksta par online kazino, bonusiem un spēļu stratēģijām kopš 2018. gada. Padziļinātās zināšanas par maksājumu metodēm un atbildīgu spēli Latvijā.',
      longBio:
        'Anna raksta par online kazino, bonusiem un spēļu mehānikām kopš 2018. gada. Pirms pievienošanās OnlineKazino.com viņa strādāja kā freelance autors vairākos LV finanšu un izklaides medijos. Annas darba galvenais fokuss ir maksājumu metožu detalizēta testēšana (Swedbank Link, SEB, Trustly, Revolut), wagering nosacījumu matemātika un atbildīgas spēles izglītojošais saturs. Viņa raksta pārsvarā latviešu valodā un veic visu mūsu operatoru klientu apkalpošanas un izņemšanu testēšanu.',
      role_yearsExperience: 8,
      specialties: ['Maksājumu metodes Latvijā', 'Welcome bonusi un wagering', 'Spēļu stratēģijas', 'Atbildīga spēle'],
      url: 'https://www.onlinekazino.com/autori/anna-jansons/',
      wpAuthorId: 'annab',
      email: 'anna@onlinekazino.com',
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
    { href: '/autori/', label: 'Autori' },
    { href: '/redakcionala-politika/', label: 'Redakcionālā politika' },
    { href: '/metodologija/', label: 'Vērtēšanas metodoloģija' },
    { href: '/sauszemes-kazino/', label: 'Sauszemes kazino' },
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
