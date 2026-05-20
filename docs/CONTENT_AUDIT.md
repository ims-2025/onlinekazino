# WP saturas audits — kas paliek, kas tiek pārrakstīts, kas tiek izmetams

*WP eksports: `onlinekazino.WordPress.2026-05-02.xml` — 539 ieraksti, 227 publicēti, 72 melnraksti.*

## Augsta līmeņa secinājums

Eksistējošā vietne ir **fresh Mercury WordPress kazino tēma ar lielāko daļu placeholder saturas**, plus aptuveni **3 reāli LV operatoru pārskati** un **bagātīgs neissauberēts melnrakstu loks (~50 LV-fokusēti pīlāru raksti)** no autores Anna Jansons. Pārveides darba lielākā daļa nav esošā satura migrācija — tas ir (1) annab melnrakstu polēšana un publicēšana, (2) jaunu reālu operatoru pārskata izveide visam IAUI sarakstam, un (3) Mercury demo satura (kazino, bonusi, spēles) izmetiena.

## Detālu audits pēc post type

### `casino` ieraksti (19) — KEEP 7, DISCARD 12

| Nosaukums | Statuss | Vērtējums | Affiliate URL | Lēmums |
|---|---|---|---|---|
| Optibet Kazino | publish | 4.75 | Enlabs Partners (legit) | **KEEP & REWRITE** |
| Laimz Kazino | publish | 4.0 | Enlabs Partners (legit) | **KEEP & REWRITE** |
| Klondaika Kazino | publish | 5.0 | Enlabs Partners (legit) | **KEEP & REWRITE** |
| Olybet Kazino | draft | 3.5 | Mercury demo | **REWRITE** (īsts operators, nepareizs URL) |
| Tonybet Kazino | draft | 3.25 | onlinekazino.com (placeholder) | **REWRITE** |
| LVBET Kazino | draft | 3.25 | Klondaika URL (kļūda) | **REWRITE** |
| Verde Kazino | draft | 3.25 | Klondaika URL (kļūda) | **REWRITE** |
| Golden Casino | draft | 4.25 | Mercury demo | **DISCARD** (placeholder) |
| Play Casino | draft | 4.0 | Mercury demo | **DISCARD** |
| Texas Casino | draft | 4.5 | Mercury demo | **DISCARD** |
| Slots Casino | draft | 4.25 | Mercury demo | **DISCARD** |
| Lucky Casino | draft | 4.25 | Mercury demo | **DISCARD** |
| 1Win Casino | draft | 4.0 | Mercury demo | **DISCARD** |
| Space Casino | draft | 3.75 | Mercury demo | **DISCARD** |
| Golden Pharaoh Casino | draft | 4.25 | Mercury demo | **DISCARD** |
| Diamond Reels Casino | draft | 4.0 | Mercury demo | **DISCARD** |
| Royal Casino | draft | 5.0 | Mercury demo | **DISCARD** |
| Sport Casino | draft | 4.75 | Mercury demo | **DISCARD** |
| Poker Casino | draft | 4.5 | Mercury demo | **DISCARD** |

**Plus jāpievieno (jauni pārskati no nulles):** 11.lv, Betsafe LV, Luckybet, Aladins.lv, PAF Latvija, X3000, Joker.lv, NIKS, OlyBet (kā atsevišķs zīmols no Olympic Casino), un pārējie no IAUI saraksta. Mērķis: 14-18 detalizēti operatoru pārskati pirmajā fāzē.

### `bonus` ieraksti (16) — DISCARD VISI

Visi 16 bonusi ir piesaistīti placeholder kazino zīmoliem (Play, Royal, Monte, Spades, Lucky, Slots, Genting, Ocean, Space). USD pricing, izdomāti zīmoli, kuru nav LV tirgū. Aizvietot ar reāliem LV operatoru bonusiem (vāktiem no operatoru oficiālajām lapām).

### `game` ieraksti (19) — DISCARD VISI (vai paturēt kā nišu raksti)

Spēles ir reāli (Starburst XXXtreme, Book of Fallen, Wild Worlds, Aztec Idols u.c. — NetEnt slotu portfelis), bet apraksti ir vispārīgi un bez LV konteksta. Ieteikums:

- **DISCARD** atsevišķo spēļu CPT. Iemesls: spēles dzīvo operatoru bibliotēkā; mūsu ranžējums neuzlabosies par "Starburst" — to monopolizē operatori paši.
- **AIZVIETOT** ar spēļu izstrādātāju lapām (NetEnt, Pragmatic Play, Synot, EGT) un tematiskiem saraksta rakstiem ("Top 20 augsta RTP spēļu automāti pieejami Latvijā"), kas dod LV-specifisku pievienoto vērtību.

### `post` ieraksti (175) — sašķirot trijos slāņos

#### Slānis A — annab DRAFT pīlāru raksti (~50 ieraksti) → **POLĒT UN PUBLICĒT**

Šie raksti ir vietnes intelektuāls dārgums. Visi LV-fokusēti, tematiski tieši pīlāru/kopu plāna iekšienē. Piemēri:

- Labākie online kazino Latvijā 2025
- Online kazino bonusi: kādas akcijas piedāvā Latvijas operatori?
- Bezriska griezieni un bezmaksas bonusi
- Licencētie kazino pret ārzemju kazino — plusi un mīnusi
- Live kazino Latvijā: populārākās spēles
- Mobilais kazino: labākās Android/iOS lietotnes
- Drošība un uzticamība: kā pārbaudīt online kazino licenci Latvijā
- Kā strādā RNG?
- Kā izvēlēties maksājumu metodi: Swedbank, SEB, Revolut, Trustly
- Svarīgākie online kazino termini: RTP, wagering, free spins
- Blackjack stratēģija iesācējiem
- Rulete online — labākās stratēģijas
- Pokers tiešsaistē
- Megaways™ spēļu automāti Latvijā
- Atbildīga spēle: kā iestatīt limitus
- Spēļu automātu nodokļi un laimestu aplikšana Latvijā
- Kriptovalūtu kazino: Bitcoin un USDT depozīti Latvijā
- Live game show: Crazy Time, Monopoly Live
- Latvijas loterijas: Eurojackpot, Vikinglotto, Loto 5/35
- Kā atpazīt krāpniecības kazino vietnes
- Synot, EGT un NetEnt — populārie izstrādātāji Latvijā
- Kazino vēsture Latvijā
- Latvijas kazino licences: inspekcijas, prasības, drošība 2025
- Kazino ar minimālo iemaksu €1
- Kazino lojalitātes programmas un VIP klubi

Darbs uz katra: 1) datu pārbaude un atjaunināšana (2025 → 2026), 2) iekšējās saites uz pīlāru un kopu rakstiem, 3) FAQ sadaļa, 4) avoti, 5) attēli ar `alt` un struktūrētiem datiem, 6) autores Anna Jansons bio bloks.

#### Slānis B — dt_admin PUBLISHED industriju jaunumi (~115 ieraksti) → **ARHĪVS / ATSAUCES**

Šie ir vēsturiski azartspēļu industriju jaunumu raksti (piemēri: "Caesars Entertainment Noslēdz Pirmo NFL Kazino Sponsorēšanas Līgumu", "Amerikas Spēļu Industrija Piedzīvo Gada Akciju Vērtības Kritumu"). Lielākā daļa nav LV-specifiska. Ieteikums:

- **PĀRPUBLICĒT** ar "Arhīvs" tagu kategorijā `/jaunumi/`
- Nepromovēt sākumlapā vai pīlāru rakstos
- Saglabāt URL stabilitāti (no rangiem) ar pareiziem pārvirzieniem
- Ievietot autora atruna: "Šis raksts pirmoreiz publicēts {datums} un kopš tā laika nav atjaunināts"
- Top 10-15 LV-relevantos rakstus pārvietot atsevišķā /jaunumi/ kategorijā ar polēšanu

Atskaite labākajām kandidātēm pārpublicēšanai (LV-relevanti):
- Latvijas/Baltijas regulējumu raksti
- LV operatoru jaunumi (Optibet, OlyBet partneru paziņojumi)
- Rakti par Synot Tip vai citiem LV-specifiskiem brendiem

#### Slānis C — annab FUTURE/draft specifiski raksti → **POLĒT, IEKĻAUT KOPĀS**

Daži ar `future` statusu (jau ieplānoti publicēšanai) un papildu draft raksti par tematiku ārpus pīlāriem (e-sports, sporta likmes, tenisu prognozes). Iekļaut atbilstošās jaunās kategorijās.

### `page` ieraksti (27) — daļa migrēs, daļa pārtaisīsies

| Lapa | Lēmums |
|---|---|
| Sākumlapa | **JAUNS DIZAINS** (no nulles, salīdzinošā tabula + tematiskie hubi) |
| Par mums / About | **PĀRRAKSTĪT** ar reālu redakcionālo politiku |
| Kontakti | **MIGRĒT** ar atjauninātu informāciju |
| Privātuma politika | **PĀRRAKSTĪT** (GDPR-saderīgs) |
| Lietošanas noteikumi | **PĀRRAKSTĪT** (LV juridiskais konteksts) |
| Sitemap, Search rezultāti | Atjaunināt automātiski |
| Atbildīga spēle | **JAUNS** (tāda lapa nav skaidri redzama esošajā eksportā — kritiski svarīgs) |
| Citas lapas | Pārskatīt katru, skaitīt drūmus melnrakstus, izvērtēt vērtību |

### `attachment` ieraksti (237) — jāpārskata pa daļām

Vairums atttachment būs Mercury tēmas placeholder attēli un piesaistīti placeholder rakstiem. **DISCARD** lielāko daļu. Saglabāt:
- Reāli LV operatoru logotipi (Optibet, OlyBet, LVBet, Klondaika, Laimz logotipi)
- Reāli annab raksta featured attēli, ja tādi ir
- Atjauninātās redakcionālās bildes

Visi jaunie hero/featured attēli tiks ģenerēti vai aizgūti no oficiālajiem operatoru pakalpojumiem ar atbilstošu attribūciju.

### `nav_menu_item` (44) — DISCARD VISI

Esošā navigācija sekos vecajai sitēmas struktūrai. Jaunā navigācija tiek veidota no nulles atbilstoši STRATEGY.md sitemap.

## Migrācijas darba kārtība

1. **Eksperts dati JSON**:
   - `data/operators.json` — IAUI licencēto operatoru saraksts ar metadatiem (Optibet, OlyBet, LVBet, Klondaika, Laimz, 11.lv, Betsafe, Luckybet, Aladins, Tonybet, PAF, X3000, Joker.lv, Verde, NIKS, ...)
   - `data/affiliates.json` — affiliate URL-i, UTM parametri, partneru tīkli (Enlabs Partners, ...)
   - `data/wp-articles.json` — annab pīlāru raksti, sanitizēti, ar metadatiem
   - `data/wp-pages-processed.json` — palikušās lapas
   - `data/redirects.json` — vecu URL → jauns URL kartējums

2. **Skripti** (`scripts/`):
   - `import-wp.mjs` — parsē WP XML uz JSON
   - `clean-content.mjs` — noņem WP block markup, shortcodes, normalizē HTML
   - `build-redirects.mjs` — ģenerē Vercel `redirects()` no veciem WP URL
   - `validate-content.mjs` — pārbauda saites, datums, attēlu pieejamība

3. **Polēšanas darbplūsma** annab rakstiem:
   - Lasīt sanitizēto HTML
   - Pārbaudīt faktus (cenas, RTP, licences, datumi)
   - Atjaunināt 2025 → 2026 visur, kur sastopams
   - Pievienot iekšējās saites uz pīlāra/kopu lapām
   - Pievienot FAQ sadaļu (struktūrētie dati)
   - Pievienot avotus
   - Pievienot autora bio blokā
   - Ģenerēt OG attēlu

## Kopsavilkums

- **3 reāli pārskati paliek un tiek pārrakstīti**: Optibet, Laimz, Klondaika
- **4 melnraksti tiek pārrakstīti** ar pareiziem datiem: Olybet, Tonybet, LVBet, Verde
- **12 placeholder kazino tiek izmetami** (Mercury demo)
- **16 bonusi tiek izmetami**, aizvietoti ar reāliem
- **19 spēļu CPT tiek izmetami**, aizvietoti ar izstrādātāju lapām un saraksta rakstiem
- **~50 annab pīlāru raksti tiek polēti un publicēti** — galvenais editorālais ieguvums
- **~115 dt_admin industrijas raksti tiek pārliki arhīvā** ar zemu prioritāti
- **~10-12 jauni operatoru pārskati jārada no nulles** lai pārklātu IAUI sarakstu
