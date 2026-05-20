# OnlineKazino.com

Latvijas premium online kazino ceļvedis. Next.js 14 (App Router), TypeScript, Tailwind, JSON data files, deploy uz Vercel.

## Stacks

- **Next.js 14** — App Router, statiskā ģenerēšana (`generateStaticParams`)
- **TypeScript** — strict režīms
- **Tailwind CSS** — pielāgota dizaina sistēma (skat. `tailwind.config.ts`)
- **JSON datu slānis** — `data/operators.json`, `data/wp-articles.json`, `data/wp-pages-processed.json`, `data/affiliates.json`, `data/redirects.json`
- **Hostings** — Vercel (push to `main` = deploy)

## Direktoriju struktūra

```
app/                Next.js App Router lapas
├── layout.tsx
├── page.tsx                                        Sākumlapa
├── globals.css
├── kazino/
│   ├── page.tsx                                    Operatoru indekss
│   └── [slug]/page.tsx                             Operatora apskata šablons
├── raksti/
│   ├── page.tsx                                    Rakstu indekss
│   ├── [slug]/page.tsx                             Raksta šablons
│   └── kategorija/[slug]/page.tsx                  Kategoriju lapas
├── bonusi/page.tsx
├── speles/page.tsx
├── maksajumi/page.tsx
├── atbildiga-spele/page.tsx                        Mandātors atbildības centrs
├── par-mums/page.tsx
├── metodologija/page.tsx                           Vērtēšanas metodoloģija
├── redakcionala-politika/page.tsx                  Redakcionālā politika (E-E-A-T)
├── go/[slug]/route.ts                              Affiliate redirect handler
├── sitemap.ts                                      Statiska sitemap.xml ģenerēšana
├── robots.ts
└── not-found.tsx

components/         Atkārtoti izmantojamas UI primitīvas
├── Header.tsx
├── Footer.tsx
├── ResponsibleGamblingBanner.tsx
├── OperatorRow.tsx
├── RatingStars.tsx
├── Breadcrumbs.tsx
├── AuthorBio.tsx
├── Faq.tsx
└── JsonLd.tsx

lib/                Datu, SEO, schema palīgi
├── site.ts                                         Vietnes konstantes (vārds, URL, autori, navigācija)
├── types.ts                                        Domain tipi (Operator, Article, ...)
├── data.ts                                         Datu uzkrājumu funkcijas (getOperators, ...)
├── seo.ts                                          Metadata palīgi
└── schema.ts                                       JSON-LD ģeneratori

scripts/
└── import-wp.mjs                                   WP eksporta → JSON parser

data/               JSON satura krātuve (ģenerēta no WP)
docs/               Stratēģijas dokumenti
```

## Iestādes

```
npm install
npm run dev
```

Vietne pieejama vietnē <http://localhost:3000>.

## Pārveidot WP eksportu

```
npm run import:wp
node scripts/apply-overrides.mjs     # hand-edited operator content
node scripts/categorize-drafts.mjs   # category assignment for annab drafts
```

Šie skripti parsē `uploads/onlinekazino.WordPress.2026-05-02.xml` un atjaunina `data/*.json`. Skat. `docs/CONTENT_AUDIT.md` par paturēšanas/izmešanas lēmumiem.

### Operatoru saturas pārvaldība

- `data/operators-overrides.json` satur ar roku rakstītos LV operatoru pārskatus (Optibet, Klondaika, Laimz, OlyBet, Tonybet, LVBet, Verde). `scripts/apply-overrides.mjs` deep-mergē tos `data/operators.json`. Šī pieeja ļauj droši re-importēt WP XML, nezaudējot pārskatu saturu.
- **Logotipu migrācija (pirms-launch TODO):** operatoru logotipi šobrīd norādīti uz veco WP CDN (`www.onlinekazino.com/wp-content/uploads/...`). Pirms domēna pārvirzīšanas uz Vercel, lejupielādējiet šos failus uz `public/operators/{slug}.png` un atjauniniet `featuredImage` URL `operators-overrides.json`.
- **Affiliate URL TODO:** OlyBet, Tonybet, LVBet, Verde šobrīd norāda uz operatora oficiālo domēnu (`status: pending-partner-link`). Aizstājiet ar reālu affiliate partner URL, tiklīdz tas ir noslēgts. Optibet, Klondaika, Laimz ir Enlabs partner URL (verificēti).

## Build & deploy

```
npm run build      # statiska build izvades
npm start          # palaiž preview
```

Push uz `main` zaru Vercel automātiski izvietos jaunu versiju.

## Saturas operācijas

- **Pievienot jaunu operatoru:** rediģējiet `data/operators.json` (vai pievienojiet pirms WP importa) ar shēmu, kas atbilst `lib/types.ts:Operator`.
- **Pievienot jaunu rakstu:** pievienojiet ierakstu `data/wp-articles.json` ar `isPublished: true` vai `promoteDraft: true`.
- **Atjaunināt redirektus:** rediģējiet `data/redirects.json` un izvietojiet — `next.config.mjs` automātiski to nolasa.

## Dokumentācija

- `docs/COMPETITOR_ANALYSIS.md` — Latvijas tirgus konkurentu analīze
- `docs/STRATEGY.md` — informācijas arhitektūra, SEO plāns, atslēgvārdu kartēšana
- `docs/CONTENT_AUDIT.md` — kas tiek migrēts, kas ne, un kāpēc

## Galvenie principi

1. **Statisks pēc noklusējuma.** Visas lapas tiek ģenerētas build laikā. Klienta JS minimāls.
2. **JSON-LD katrai lapai.** Schema.org bagātīgs marķējums katram šablonam (skat. `lib/schema.ts`).
3. **E-E-A-T pirmajā vietā.** Autoru bio, redakcionālā politika, metodoloģija, atbildīgas spēles atrunas.
4. **Visi LV.** Saturs latviešu valodā; `lang="lv-LV"`; LV diakritikas slugos kur jēga.
5. **Atbildīga spēle redzama.** 18+ marķējums un saites uz atbildīgu spēli ir uz katras lapas.
# onlinekazino
