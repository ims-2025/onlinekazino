# OnlineKazino.com — informācijas arhitektūra un SEO stratēģija

*Sagatavots: 2026-05-02*

## 1. Pozicionēšana un mērķi

**Pozicionēšana:** Latvijas neatkarīgais premium online kazino ceļvedis. Tikai IAUI licencēti operatori, caurspīdīga redakcionālā politika, reāli autori (Anna Jansons, Aldis Skuja).

**Primāri mērķi (12 mēneši):**
1. Top 3 ranžējumi galvenajiem LV transakcijas atslēgvārdiem ("online kazino Latvijā", "labākie online kazino", "kazino bonusi", "Optibet kazino", "OlyBet kazino", "live kazino", "spēļu automāti online")
2. Lighthouse Performance ≥ 95 mobilajā ierīcē, Core Web Vitals "Good" visām galvenajām lapām
3. Strukturētie dati Rich Results visās pārskata, FAQ, raksta un breadcrumb lapās
4. ≥ 50 publicēti raksti pirmajos 60 dienās (lielākoties no annab draftiem, polēts un paplašināts)

## 2. Informācijas arhitektūra (sitemap)

```
/                                       Sākumlapa (Top operatoru salīdzinājuma tabula + topical hubs)
├── /kazino/                            Visi LV operatoru pārskati (rangs)
│   └── /kazino/[slug]/                 Operatora pārskats (Optibet, OlyBet, ...)
├── /bonusi/                            Visi bonusu pārskati (filtros: depozīts, FS, BD, atmaksa)
│   ├── /bonusi/bezdepozita/
│   ├── /bonusi/bezmaksas-griezieni/
│   ├── /bonusi/depozita-bonusi/
│   └── /bonusi/[slug]/                 Konkrēts bonusa piedāvājums
├── /speles/                            Spēļu vadītāji (hub)
│   ├── /speles/spelu-automati/
│   ├── /speles/blackjack/
│   ├── /speles/rulete/
│   ├── /speles/pokers/
│   ├── /speles/baccarat/
│   ├── /speles/live-kazino/
│   └── /speles/dzekpoti/
├── /maksajumi/                         Maksājuma metodes (hub)
│   ├── /maksajumi/swedbank-link/
│   ├── /maksajumi/seb/
│   ├── /maksajumi/trustly/
│   ├── /maksajumi/paypal/
│   ├── /maksajumi/skrill/
│   ├── /maksajumi/neteller/
│   └── /maksajumi/kriptovaluta/
├── /spelu-izstradataji/                Spēļu izstrādātāji (hub)
│   └── /spelu-izstradataji/[slug]/     Synot, NetEnt, EGT, Pragmatic Play, Microgaming, ...
├── /raksti/                            Blogs (jaunāko-pirmais)
│   ├── /raksti/kategorija/[slug]/      Kategoriju lapas
│   └── /raksti/[slug]/                 Raksts
├── /salidzinajumi/                     Tiešie operatoru salīdzinājumi
│   └── /salidzinajumi/optibet-vs-olybet/
├── /jaunumi/                           Latvijas un globālie azartspēļu jaunumi
│   └── /jaunumi/[slug]/
├── /atbildiga-spele/                   Atbildīgas spēles centrs (kritisks)
│   ├── /atbildiga-spele/pasatteikuso-registrs/
│   └── /atbildiga-spele/limitu-iestatisana/
├── /par-mums/                          Par OnlineKazino.com
├── /redakcionala-politika/             E-E-A-T signāls
├── /metodologija/                      Vērtēšanas metodoloģija
├── /autori/                            Autoru indekss
│   └── /autori/[slug]/                 Anna Jansons, Aldis Skuja
├── /kontakti/
├── /privatuma-politika/
├── /lietosanas-noteikumi/
└── /sitemap.xml, /robots.txt, /rss.xml, /og/[slug].png
```

URL noteikumi: visas LV slugu galotnes (`/kazino/`, `/bonusi/`, `/speles/`), bez diakritikas slugos (`atbildiga-spele` nevis `atbildīga-spēle`), vienots scheme `https://www.onlinekazino.com`, slash-trailing visiem direktoriju ceļiem.

## 3. URL pārvirzību plāns (no veco WP)

Iekļausim Vercel `redirects()` konfigurācijā:

| Vecā ceļš (WP) | Jaunā ceļš | Statuss |
|---|---|---|
| `/?p={post_id}` | Atbilstošā jaunā URL | 301 |
| `/?post_type=casino&p={id}` | `/kazino/[slug]/` | 301 |
| `/?post_type=bonus&p={id}` | `/bonusi/[slug]/` | 301 (vai uz `/bonusi/` ja nav atbilstība) |
| `/?post_type=game&p={id}` | `/speles/spelu-automati/` | 301 |
| `/{kategorija}/{slug}/` | Saglabāt vai pārkartot | 301 |
| `/azartspelu-regulejumi/` | `/raksti/kategorija/regulejumi/` | 301 |
| `/azartspelu-tehnologijas/` | `/raksti/kategorija/tehnologijas/` | 301 |
| `/loterijas-jaunumi/` | `/raksti/kategorija/loterijas/` | 301 |
| `/pokera-zinas/` | `/raksti/kategorija/pokers/` | 301 |
| `/zinas/` | `/jaunumi/` | 301 |
| `/zinas/kazino-speles/` | `/raksti/kategorija/kazino-speles/` | 301 |

Skripts `scripts/build-redirects.mjs` ģenerēs galīgo redirektu sarakstu no WP eksporta, salīdzinot ar `wp-articles.json` un `operators.json`.

## 4. Saturas pīlāru/kopu plāns (topical authority)

Pieci galvenie pīlāri, katrs ar atbalstošām kopu lapām. Iekšējās saites no kopas → pīlārs un sānu uz saistītām kopām.

### Pīlārs 1: "**Online kazino Latvijā**" (transakcionāls, /kazino/)
Mērķa atslēgvārds: "online kazino Latvijā" (~2400 mēneša meklējumi)
Kopu raksti:
- Labākie online kazino Latvijā 2026
- Kā izvēlēties drošu LV kazino: pilns ceļvedis
- Latvijas kazino licences un IAUI uzraudzība
- Jauni online kazino Latvijā (atjaunināts 2026)
- Optibet vs. OlyBet vs. LVBet salīdzinājums
- Licencētie kazino vs. ārzemju kazino — plusi un mīnusi

### Pīlārs 2: "**Online kazino bonusi**" (komerciāls, /bonusi/)
Mērķa atslēgvārds: "kazino bonusi" (~1900)
Kopu raksti:
- Top welcome bonusi 2026
- Bezdepozīta bonusi: kā tos saņemt
- Bezmaksas griezieni: pilns ceļvedis
- Wagering nosacījumi: ko jāzina pirms ņemšanas
- Augsto likmju (high roller) bonusi
- Cashback bonusi LV operatoros

### Pīlārs 3: "**Spēļu automāti**" (informācijas + komerciāls, /speles/spelu-automati/)
Mērķa atslēgvārds: "online spēļu automāti" (~1400)
Kopu raksti:
- Labākie augsta RTP spēļu automāti
- Megaways™ spēļu automāti Latvijā
- Progresīvie džekpoti — kur spēlēt
- Klasiskie spēļu automāti (Book of Ra, Starburst)
- Synot, EGT, NetEnt — populārie izstrādātāji LV
- RTP, RNG un godīgums — kā tas darbojas

### Pīlārs 4: "**Maksājumi LV kazino**" (transakcionāls + informācijas)
Mērķa atslēgvārds: "kazino maksājumi" / individuāli "Swedbank Link kazino", "Trustly kazino"
Kopu raksti:
- Swedbank Link, SEB, Citadele — kura banka labākā?
- Trustly Latvijā — instant payments
- Kriptovalūtu kazino: Bitcoin, USDT depozīti
- Ātrās izņemšanas — testētie laiki
- PayPal, Skrill, Neteller — vai tie strādā Latvijā?
- Minimālās un maksimālās iemaksas — salīdzinājums

### Pīlārs 5: "**Atbildīga spēle**" (E-E-A-T + likuma prasība)
Mērķa atslēgvārds: "atbildīga spēle" / "Pašatteikušos personu reģistrs"
Kopu raksti:
- Kā iestatīt limitus jūsu kazino kontā
- Pašatteikušos personu reģistrs — kā pieteikties
- Azartspēļu atkarība — kā to atpazīt
- Atbalsta organizācijas Latvijā
- Nodokļi laimestiem Latvijā 2026

Sekundārie hub: pokers, ruletes, blackjack, live kazino, loterijas, sporta likmes.

## 5. Atslēgvārdu kartēšana uz lapu šabloniem

| Lapas šablons | Primāri atslēgvārdi | Sekundāri | Title pattern | H1 pattern |
|---|---|---|---|---|
| Sākumlapa | online kazino Latvijā, labākie online kazino | kazino salīdzinājums | "Labākie Online Kazino Latvijā 2026 — IAUI Licencēti \| OnlineKazino" | "Labākie online kazino Latvijā" |
| Operatora pārskats | "{Brand} kazino", "{Brand} apskats" | "{Brand} bonuss" | "{Brand} Kazino Apskats 2026 — Bonuss, Spēles, Atsauksmes" | "{Brand} kazino — pilns apskats" |
| Bonusu hub | kazino bonusi, online kazino bonusi | welcome bonuss | "Online Kazino Bonusi 2026 — Top Welcome Piedāvājumi" | "Kazino bonusi 2026" |
| Maksājumu lapa | "{metode} kazino" | depozīti, izņemšanas | "Kazino ar {metode} 2026 — Drošas Iemaksas" | "Kazino ar {metode}" |
| Spēļu hub | "online spēļu automāti", "live kazino" | konkrēts spēles tips | "Online {Spēles tips} Latvijā — Labākās Spēles 2026" | "{Spēles tips} kazino" |
| Raksts | konkrēts garais aste | LSI radniecīgi | "{Tema} — Pilnais Ceļvedis 2026 \| OnlineKazino" | Raksta H1 |

## 6. Strukturēto datu (Schema.org) plāns

Visas shēmas tiek injicētas kā `<script type="application/ld+json">` tieši no datiem, lai būtu sinhronas ar lapas saturu.

| Lapas šablons | Shēma |
|---|---|
| Sākumlapa | `WebSite` ar `SearchAction`, `Organization`, `BreadcrumbList`, `ItemList` (top operatori) |
| Operatora pārskats | `Review` ar `itemReviewed: Casino`, `Rating`, `AggregateRating`, `Author` (Person), `Publisher` (Organization), `BreadcrumbList`, `FAQPage` |
| Bonusu lapa | `OfferCatalog` ar `Offer` saraksts, `BreadcrumbList` |
| Maksājumu lapa | `HowTo` (kā veikt iemaksu), `FAQPage`, `BreadcrumbList` |
| Spēļu hub | `ItemList` (top spēles), `BreadcrumbList` |
| Raksts | `Article` (vai `NewsArticle`), `Author`, `Publisher`, `BreadcrumbList`, `FAQPage` ja ir Q&A sadaļa |
| Autora lapa | `Person` ar `worksFor`, `sameAs`, `knowsAbout` |
| Atbildīgas spēles | `WebPage` ar `mainEntity: GovernmentService` (atsauce uz IAUI/Pašatteikušos) |

`Casino` nav oficiāla schema.org tipa — izmantosim `LocalBusiness` apakštipu vai `Organization` ar paplašinātu `additionalType: "https://schema.org/Casino"`. Pārskatām pārstāvam kā `Review.itemReviewed.@type: Organization` ar `additionalType` lauku.

## 7. E-E-A-T (pieredze, ekspertīze, autoritāte, uzticība)

Google "Reviews update" un YMYL azartspēļu nišas pieprasa stipru E-E-A-T. Mūsu pasākumi:

- **Autora bio katra raksta sākumā** ar bildi, profesionālo aprakstu, gadu pieredze, sociāliem profiliem (`Person` shēma)
- **Redakcionālā politika** publicēta `/redakcionala-politika/` ar faktu pārbaudes procesu
- **Metodoloģijas lapa** `/metodologija/` ar punktu sadalījumu (drošība, spēļu klāsts, bonusi, atbalsts, izņemšanas, mobilā UX)
- **Pēdējās pārbaudes datums** uz katra pārskata ("Pēdējoreiz pārbaudīts: 2026. gada 1. maijā")
- **Avotu sadaļa** katrā raksts ar saitēm uz IAUI, operatoru oficiālajiem T&C, neatkarīgiem datu avotiem
- **Atbildības atrunas**: 18+, atbildīga spēle, IAUI licences pārbaudes saiti

## 8. Vietnes ātrums un Core Web Vitals

| Metrika | Mērķis | Pasākumi |
|---|---|---|
| LCP | < 1.5s | Statiskā ģenerēšana, attēli ar `next/image` AVIF/WebP, hero attēli ar `priority` |
| CLS | < 0.05 | Iepriekš noteikti attēlu izmēri, fontu `display: optional`, nav reklāmu pāri saturam |
| INP | < 200ms | Zero JS uz lielākajām lapām, klienta komponentes tikai ja nepieciešams |
| FCP | < 1.0s | Inline kritiskā CSS no Tailwind, prefetch saites |
| TTFB | < 200ms | Vercel Edge Network, statisks output |
| Total JS | < 100kb | Nav klienta state pārvaldnieka, nav lielas UI bibliotēkas |

## 9. Tehniskā SEO checklist

- `next-sitemap` vai pašvelvēts `app/sitemap.ts` — visas lapas, prioritātes, lastmod
- `app/robots.ts` ar Allow visam, Disallow pareiz `/api/*`, Sitemap atsauce
- `<html lang="lv-LV">`, `hreflang="lv-LV"` self-referential
- Canonical URL katrā lapā, izņemot kanoniskus un vairāku filtrētu kombināciju lapām
- Open Graph + Twitter Card visiem rakstiem (1200x630 og-images, dinamiski ģenerēti)
- 404 lapa ar saites uz top kategorijām
- 301 pārvirzes no visiem WP veciem URL (sk. 3. punktu)
- Iekšējās saites: katrs raksts saista uz pīlāra lapu un 2-3 kopu rakstiem; katrs operatora pārskats saista uz vismaz 5 saistītiem rakstiem
- Anchor teksts daudzveidīgs, nav over-optimizēts
- Breadcrumb navigācija visās lapās ar shēmu
- Bildes ar atbilstošu `alt` LV valodā
- Robotu metatagi: `index, follow` visam saturam

## 10. Atbildīgas spēles infrastruktūra (mandatorija)

Visās lapās, virsnumura "Tikai 18+" baneris. Galvenes baneris ar saiti uz `/atbildiga-spele/`. Footer baneris ar IAUI logotipu un Pašatteikušos personu reģistrs saiti.

`/atbildiga-spele/` lapa iekļauj:
- Skaidrojums par azartspēļu atkarību
- Pašpārbaudes anketa (Spēles ekrāns, jautājumi)
- Atbalsta organizāciju saraksts (anonīmie azartspēlnieki, Marta sociālo pakalpojumu centrs, u.c.)
- Pašatteikušos personu reģistra (PPR) skaidrojums + tieša saite
- Limitu iestatīšanas norādījumi katram operatoram
- 24/7 palīdzības tālrunis (114 — Latvijas neatliekamais sociālais palīdzības tālrunis vai analogs)

## 11. Tīmekļa monetizācija

Affiliate saites ir primārais ienākumu avots. Implementācijas pasākumi:

- Visi affiliate saites ar `rel="sponsored nofollow"`
- Tiek sekoti caur `https://www.onlinekazino.com/go/[operator]` redirect handler ar UTM parametriem un click-tracking (server-side, no third-party JS uz lapas, lai nepalēninātu)
- Skaidrs disclosure katrā operatora pārskata sākumā ("OnlineKazino.com saņem komisiju, kad spēlētājs reģistrējas caur mūsu saiti. Tas neietekmē mūsu vērtējumus.")
- Bonusu lapas iekļauj T&C atrunas
- Nav reklāmas tīkliņi (AdSense, Taboola u.c.) lai nepalēninātu lapu

## 12. Analytics un mērīšana

- Plausible Analytics (privātuma-draudzīga, mazs JS payload) vai Vercel Web Analytics
- Search Console verifikācija
- Custom events: affiliate clicks, scroll depth, FAQ atvēršana
- Nav GA4 (smags, paplašināts JS, GDPR komplikācijas)

## 13. Atjauninājumu kadence

| Saturs | Atjaunināšanas biežums |
|---|---|
| Top operatoru salīdzinājuma tabula | Reizi mēnesī (1. datumā) |
| Operatoru pārskati | Reizi 2-3 mēnešos (vai pēc bonusu maiņas) |
| Bonusu lapas | Reizi 2 nedēļās |
| Pīlāru raksti | Reizi 6 mēnešos |
| Jaunumu raksti | Vajadzības gadījumā |

`Pēdējoreiz atjaunināts` datums automātiski ievilkts no JSON `lastUpdated` lauka katram ierakstam.

## 14. Veiksmes mērīšana

- Pirmie 30 dienas: vietne dzīva, sitemap iesniegts, indekss ≥ 80 % no satura
- 60 dienas: ≥ 50 publicēti raksti, vidējā pozīcija top 50 atslēgvārdiem ≤ 30
- 90 dienas: ≥ 5 atslēgvārdi top 10
- 180 dienas: ≥ 15 atslēgvārdi top 10, ≥ 1 top 3
- 365 dienas: top 3 par "online kazino Latvijā" un saistīto pīlāra atslēgvārdiem
