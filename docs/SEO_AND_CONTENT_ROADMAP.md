# SEO & Content Roadmap — Post-Launch

*Snapshot: site live as of 2026-05-20. Latvijas premium online kazino guide on Next.js 14 + Vercel.*

This is a 360 audit of what's in place vs. what should ship next. Organized by priority bucket so you can work through it week by week.

---

## Bucket 1 — Quick wins (this week)

These are low-effort fixes that immediately improve crawlability, trust signals, and shareability. Each should take under an hour.

### 1.1  Verify Search Console + Bing Webmaster Tools

- Add `onlinekazino.com` and `www.onlinekazino.com` as separate properties in Google Search Console
- Submit `https://www.onlinekazino.com/sitemap.xml`
- Same for Bing Webmaster Tools (Bing/Yahoo still ~5% of LV market)
- After 48 h, check the **Coverage** report — any "Submitted URL not found (404)" findings, paste them to me and I'll add the redirect

### 1.2  Add a favicon + Apple touch icon

Currently the site has no explicit favicon. Browsers will default to whatever GET `/favicon.ico` returns. Generate a set from your wordmark and drop into `public/`:

- `favicon.ico` (32×32 + 16×16 multi-resolution ICO)
- `apple-touch-icon.png` (180×180)
- `icon-192.png`, `icon-512.png` for Android home-screen

Update `app/layout.tsx` `metadata` block:

```ts
icons: {
  icon: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},
```

### 1.3  OG images per template

Right now every page falls back to the same default OG image (which doesn't exist). When someone shares an operator review on WhatsApp/Telegram/X, the preview is blank. Two options:

- **Static per-page:** generate one OG image per operator review + key pillar pages (~15 files) using Figma → export 1200×630
- **Dynamic with `@vercel/og`:** programmatically generate OG images at build/edge time (3 hours of work; covers every URL automatically). I'd recommend this — Vercel hosts the runtime free.

### 1.4  Real operator logos

The 4 placeholder SVGs (OlyBet, Tonybet, LVBet, Verde) look like brand chips, not actual brand marks. Download the real logos from each operator's press kit or media-room page, drop into `public/operators/` with the same filenames, push. (Same recipe applies if you later swap the 3 WP-hosted logos for self-hosted versions.)

### 1.5  Replace the 3 still-WP-hosted logos

The site currently loads Optibet, Klondaika, and Laimz logos from `www.onlinekazino.com/wp-content/uploads/...`. That works today because the WP install is still serving on a sub-path. **If WordPress is ever fully decommissioned, those logos break.** Run:

```
node scripts/download-logos.mjs
node scripts/apply-overrides.mjs
git add public/operators data/operators-overrides.json data/operators.json
git commit -m "Self-host all operator logos"
git push
```

(Or wait for the next operator-data refresh and do it then.)

---

## Bucket 2 — Editorial production (next 30 days)

The site shipped with 117 published articles + 55 categorized-but-unedited annab drafts + 28 topic stubs. None are at the depth Google's Reviews/HCU updates reward. Phase 6.

### 2.1  Polish the 5 highest-value annab drafts

Pick the 5 drafts with the most commercial intent and rewrite to 2,500–4,000 word pillar pieces:

1. **`labakie-online-kazino-latvija-2025`** — Update to 2026, add comparison table component, real operator rankings, FAQ. This is your money keyword (~2,400 mo).
2. **`online-kazino-bonusi-kadas-akcijas-piedava-latvijas-operatori`** — pillar for /bonusi/, link to all sub-bonus pages.
3. **`latvijas-kazino-licences-inspekcijas-prasibas-un-drosiba`** — high E-E-A-T win. Cite IAUI register, quote Likums par izložu un azartspēļu rīkošanas, link to government PDFs.
4. **`ka-izveleties-maksajumu-metodi-swedbank-seb-revolut-vai-trustly`** — uniquely LV. Add real testing data (deposit/withdrawal speeds you measured).
5. **`atbildiga-spele-ka-iestatit-limitus-un-sevi-izslegt-no-kazino`** — anchors the /atbildiga-spele/ hub. Add screenshots of each LV operator's limit-setting flow.

For each: target 2,500+ words, original screenshots, a custom table or chart, FAQ block, author bio.

### 2.2  Expand the 28 topic stubs

Current stubs (`/speles/[slug]/`, `/maksajumi/[slug]/`, `/bonusi/[slug]/`, `/atbildiga-spele/[slug]/`, `/spelu-izstradataji/[slug]/`) are 200–300 words. For SEO weight they should be 1,200–2,000 words each with:

- 3–5 H2 sections (already structured in `topics.json`, just expand)
- One FAQ block per page (pass `faq` prop to `<TopicPage>`)
- 2–3 internal links to related articles
- 1–2 outbound links to authoritative sources (IAUI for regulation, operator's official T&C for facts)
- "Pēdējoreiz pārbaudīts" date

Edit `data/topics.json` to add `sections` and `faq` arrays per topic. The template auto-renders them.

### 2.3  Build the 7–11 missing IAUI operator reviews

The IAUI register has ~14–18 active operators. We have 7. Missing the high-traffic ones:

- **11.lv** (LSAB Latvija) — second-largest LV brand by Sortlist data
- **Betsafe LV** (Betsson group, same backend as Tonybet)
- **Luckybet.lv** — featured prominently in competitor sites
- **Aladins.lv** — newest licensed brand, low competition for now
- **PAF Latvija** — Skandi heritage, RG focus
- **X3000.lv** — sports-led
- **Joker.lv** — small but published
- **Olympic Casino LV** (sauszemes — Olympic Entertainment Group) as a separate listing from OlyBet

Same content template as the existing 7. Add to `operators-overrides.json` keyed by slug. Logos in `public/operators/`. Each one is ~3-4 hours of writing + screenshots.

### 2.4  Comparison pages — the highest-converting format

Build 4-6 head-to-head comparison pages. These rank well because the keyword is long-tail with strong commercial intent:

- `/salidzinajumi/optibet-vs-olybet/`
- `/salidzinajumi/optibet-vs-klondaika/`
- `/salidzinajumi/olybet-vs-laimz/`
- `/salidzinajumi/optibet-vs-11lv/`

Template: side-by-side table on every dimension (bonus, RTP avg, payment methods, mobile, support response time you tested, withdrawal speed, pros/cons), a verdict, FAQ, schema.org `Review` + `ComparisonTable` (custom). Build one shared `<ComparisonPage>` component.

### 2.5  Top-list "best for X" landing pages

These are pure SEO captures. One template, dozens of variants:

- `/top/labakie-mobilie-kazino-latvija/`
- `/top/labakie-live-kazino-latvija/`
- `/top/labakie-jaunie-online-kazino-latvija-2026/`
- `/top/labakie-augstu-rtp-spelu-automati/`
- `/top/atrakie-izmaksas-kazino-latvija/`
- `/top/kazino-ar-mazako-iemaksu/`
- `/top/kriptovalutu-kazino/`

Each takes the same operator data + a filter/sort rule and renders the top 5. Build a single dynamic route `/top/[slug]/` with the slug → ranking-logic map in `data/top-lists.json`.

---

## Bucket 3 — E-E-A-T & authority signals (next 60 days)

This is where Google's Reviews update either trusts you or quietly demotes you. YMYL (Your Money or Your Life) topics like gambling are evaluated more strictly than almost any other vertical.

### 3.1  Build author pages

`personSchema` is generated but `/autori/[slug]/` doesn't render as a real page. Build:

- `app/autori/page.tsx` — author index
- `app/autori/[slug]/page.tsx` — bio, social profiles, list of all their published articles, expertise tags

Each author bio should reference real credentials: LinkedIn, X handle, prior publications, years in industry. Don't fabricate — this is the kind of thing competitors get caught on.

### 3.2  "Last updated" timestamps visible on every page

Already in JSON-LD via `dateModified`, but not visible in the UI for hub pages or topic stubs. Add a small "Atjaunināts 2026-05-20" line under the H1 on every commercial page. Use it on the homepage too (the "Top operatoru saraksts" date).

### 3.3  Expert quotes

Reach out to 2-3 Latvian gambling-industry figures:

- IAUI press contact for a regulatory comment
- A licensed operator compliance officer (PAF or OlyBet usually responsive)
- An academic studying gambling behavior (RSU sociology department)

Even a single quoted paragraph per pillar piece elevates the E-E-A-T signal hugely. Google's quality raters look for these explicitly.

### 3.4  Methodology page — go deeper

`/metodologija/` exists but is generic. Add:

- A photo of the testing setup
- Names of the editors who ran the tests with brief credentials
- Sample test data table (e.g., 20 test withdrawals with timestamps per operator)
- "Last methodology revision: ..." date and changelog

This is what Wirecutter, NerdWallet, and CNET reviews score on.

### 3.5  Editorial corrections log

Build `/labojumi/` — a public log of every correction made to published content. Counter-intuitively this *increases* trust dramatically. One-line entries: "2026-05-22: Updated Optibet welcome bonus from 250 to 200 free spins per operator's email; thanks to reader for reporting."

---

## Bucket 4 — Backlinks & off-site (ongoing)

Domain Rating in LV gambling is dominated by old WP-era affiliate sites and Tribuna/Betpack imports. Most have weak content — beatable with quality + age.

### 4.1  LV Wikipedia citations

LV-language Wikipedia has articles on:

- *Azartspēles Latvijā*
- *Izložu un azartspēļu uzraudzības inspekcija*
- *Online kazino*

Each could plausibly cite a definitive source on a sub-topic. Don't spam — write a single best-in-class guide (e.g., the IAUI methodology piece from 2.1.3) and then a Wikipedia editor (you, or someone in the community) cites it as a source. Wiki backlinks are nofollow but high-trust.

### 4.2  Latvian media outreach

Pitch original data stories to:

- **Delfi.lv** — they regularly run gambling-regulation pieces
- **TVNET** — finance/business desk takes industry data
- **LSM.lv** — public broadcaster, gambling addiction angle
- **Diena.lv** — investigative pieces

What to pitch: original research you can do from the data you have. E.g., "We tested withdrawal times across all 14 LV operators — here's how they stack up." Embargo + offer them first scoop, get a link back.

### 4.3  Affiliate network partner links

Currently only 3 operators have verified Enlabs affiliate URLs. OlyBet, Tonybet, LVBet, Verde point at the operator's main domain (no commission). Sign up to:

- **Income Access** (Tonybet, partners with Olympic/OlyBet for some markets)
- **MyAffiliates** (LVBet)
- **Direct partnership** with Verde (Brivio Affiliates)
- **11.lv affiliate program** when you add that review

Update `operators-overrides.json` `affiliate.url` field and re-run apply-overrides.

### 4.4  Guest content swaps

Write 1 guest post/month on a related LV site (personal finance blogs, sports blogs, lifestyle). Each gets you a contextual editorial link back. Don't pay for these — pay-for-link schemes are detectable and Google has been penalizing them since 2023's link-spam update.

---

## Bucket 5 — Interactive content & moats (next 6 months)

This is where you stop being a guide and start being a destination. None of the LV competitors have these.

### 5.1  Bonus wagering calculator

A simple JS tool: input bonus amount, wagering multiplier, max bet, RTP, and it returns the expected value of the bonus and how long realistically to clear it. Build as a client component, embed on every relevant bonus page. Each calculator = one keyword + dozens of related backlinks (people *link to tools*).

### 5.2  Operator comparison tool

`/saliidzinat/` — multi-select up to 4 operators, get a side-by-side table on every dimension. Pulls from `operators.json`. Heavy SEO win because every operator combination is its own indexable URL (`?ops=optibet,olybet,laimz`). Use static generation for popular combinations + ISR for the long tail.

### 5.3  Withdrawal-time leaderboard

You're already (planning to be) testing withdrawal times across operators. Surface that data as a public leaderboard. Update monthly. Each update = a news story = a fresh signal to Google.

### 5.4  Atbildīga spēle self-assessment

A short questionnaire (10 questions, PGSI scale) + scored result + tailored next steps (limits, PPR, professional help). This is genuinely useful and unique to LV market. Strong RG signal for E-E-A-T + a likely backlink from IAUI / addiction support pages if they ever curate resources.

### 5.5  Operator data API

Expose `/api/operators.json` (cacheable, public). Lets future-you build:

- Comparison tools at other URLs
- An iframe widget LV news sites can embed
- A Telegram/Discord bot for "best current bonus"

Each touchpoint = brand awareness.

---

## Bucket 6 — Technical SEO health checks (monthly)

Re-run these every 4-6 weeks:

### 6.1  Lighthouse audits

For desktop *and* mobile, on at least:

- `/` (homepage)
- `/kazino/optibet/` (operator review template)
- `/raksti/[longest article]/` (article template)
- `/bonusi/` (hub)

Target: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100. The static build should make this easy; if anything drops below target the cause is usually heavy 3rd-party JS or unoptimized images.

### 6.2  Schema.org validator

Run `https://validator.schema.org/` on:

- Homepage
- One operator review page (the `Review` schema is the most error-prone)
- One article
- The article category page (BreadcrumbList)

Fix any errors immediately — invalid schema is worse than no schema (Google penalizes mismatch between declared and rendered content).

### 6.3  Broken-link sweep

Use a free crawler (Screaming Frog free tier covers up to 500 URLs, which is enough for the current site) once a month. Look for:

- 404s on internal links
- Redirect chains (A → B → C — collapse to A → C)
- Pages with no internal links pointing to them (orphan content)

### 6.4  Search Console health

Weekly check:

- Index coverage — anything dropping out?
- Mobile usability — anything broken?
- Core Web Vitals — INP especially, since that became a ranking factor in 2024

### 6.5  Crawl budget

This site is ~260 URLs. Tiny. But as you add comparison pages + top-lists + content, watch the **Crawl Stats** report. If Google starts ignoring URLs you want indexed, the usual culprit is too many low-quality auto-generated pages diluting the signal.

---

## Bucket 7 — Stuff to NOT do

Worth being explicit, because every LV competitor falls into one of these traps:

- **Don't write 800-word "What is RTP?" articles.** That keyword is owned by Wikipedia + every major affiliate worldwide. Compete on the LV-specific angle ("RTP in Latvian licensed operators — tested").
- **Don't auto-generate operator pages.** Google's HCU update specifically penalizes templated content where only the brand name changes. Each operator review needs genuine differentiation.
- **Don't buy links.** LV has a small enough internet that paid-link clusters are visible. The 2023 link-spam update has been brutal on this. Use the guest-content + media-outreach route instead.
- **Don't use AI-generated content without heavy editing.** Articles that smell of GPT/Claude get demoted now. Use AI for first drafts and rephrasing; have a human editor (Anna, Aldis) make real changes pass-by-pass.
- **Don't over-optimize anchor text.** Internal links from "online kazino" to `/kazino/` look natural. Internal links from "best online casino latvia 2026" to `/kazino/` do not.
- **Don't add a casino *operator* schema to your *guide* pages.** Schema mismatch = ranking damage. You're a `WebSite` + `Organization` + (per page) `Article` / `Review`. Not a `Casino`.

---

## Priority matrix — what to do this month

| Effort | Impact | Item | Bucket |
|---|---|---|---|
| S | 🔥 | Search Console verification + sitemap submit | 1.1 |
| S | 🔥 | Dynamic OG images with @vercel/og | 1.3 |
| S | 🔥 | Real operator logos in `public/operators/` | 1.4 |
| M | 🔥 | Rewrite top-5 annab drafts to pillar depth | 2.1 |
| M | 🔥 | Add 4 missing IAUI operator reviews (11.lv, Betsafe, Luckybet, Aladins) | 2.3 |
| M | ⚡ | Expand 28 topic stubs to 1,200+ words | 2.2 |
| M | ⚡ | Build /salidzinajumi/ comparison page template + 4 pages | 2.4 |
| M | ⚡ | Build author pages + visible "last updated" timestamps | 3.1, 3.2 |
| L | ⚡ | Bonus wagering calculator | 5.1 |
| L | 🌱 | Operator comparison tool | 5.2 |

**🔥 = ship-blocking SEO debt. ⚡ = ranking-trajectory accelerator. 🌱 = long-term moat.**

If you do nothing else, do the 🔥 row. That's roughly two weeks of focused work and addresses the gap between "site is online" and "site is ranking."

---

## Concrete next-week shopping list

1. Generate a favicon set + apple-touch-icon
2. Sign up for Google Search Console, Bing Webmaster Tools, submit sitemap
3. Sign up to MyAffiliates and Income Access for the missing operator partnerships
4. Save real logos for 4 operators (OlyBet/Tonybet/LVBet/Verde) into `public/operators/`
5. Start the "Labākie online kazino Latvijā 2026" pillar piece (target: 4,000 words, publish by end of week)
6. Identify the LV journalist contacts at Delfi, TVNET, LSM for future pitches

Tell me when you want to tackle any one of these and I'll do the build/write/scaffolding next to you.
