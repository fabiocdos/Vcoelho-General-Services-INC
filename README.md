# Vcoelho General Services INC — Marketing Website

Static, multi-page marketing site for **Vcoelho General Services INC** (Rockland, MA 02370).
Landscaping · Fencing · Hardscaping · Snow Plowing.

**Tagline:** Quality Work. Reliable Service. Every Season.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — sections 01–19 (Hero → Trust Bar → About → Services → Landscaping Feature → Fencing Feature → Why Choose → Residential/Commercial → Our Work → Four Seasons → Service Area → Final CTA → Footer) |
| `landscaping.html` | Landscaping service page |
| `fencing.html` | Fencing service page |
| `hardscaping.html` | Hardscaping service page |
| `snow-plowing.html` | Snow plowing service page |
| `about.html` | About Us |
| `our-work.html` | Filterable project gallery with lightbox |
| `reviews.html` | Reviews + "Leave a Review" CTA (no invented testimonials) |
| `contact.html` | Contact details + inline quote form (`#quote` anchor) |
| `robots.txt`, `sitemap.xml` | SEO crawl/index files |

## Structure

```
site/
├── index.html · about.html · contact.html · our-work.html · reviews.html
├── landscaping.html · fencing.html · hardscaping.html · snow-plowing.html
├── robots.txt · sitemap.xml · README.md
└── assets/
    ├── css/style.css      # Design system (tokens, components, responsive)
    ├── js/site.js         # Nav, quote modal, form, gallery, tracking, reveal
    └── images/            # Optimized JPEGs + logo/favicon PNGs
```

## Stack

Plain **HTML + CSS + vanilla JS**. No build step, no framework, no dependencies
other than Google Fonts (Cormorant Garamond + Inter).

Open `index.html` directly, or serve the folder with any static server.

## Design system

- **Colors:** `#17351F` forest · `#376B32` green · `#9CAF3D` lime · `#F4F1E8` cream · `#FFFFFF` · text `#273029`
- **Type:** Cormorant Garamond (serif headings) + Inter (body)
- Cream backgrounds, thin borders, 2–6px radius, subtle shadows, botanical line accents, large photography
- Accessible: alt text on all images, single `h1` per page, labelled form fields, visible focus states, skip link
- Reduced-motion media query disables all animation

## Quote form

- Fields: Full Name · Phone · Email · Property Address · Service Needed · Property Type · Project details · optional photo upload
- Client-side validation with inline error messages (`role="alert"`)
- On success: thank-you message + a **mailto fallback** link pre-filled with the request
- Lead data is also stored in `localStorage` under `vcoelho_leads` and pushed to `window.dataLayer`
- Available via: header CTA, hero CTA, section CTAs, service-page CTAs, mobile bottom bar, and the inline form on `contact.html#quote`

> **Not yet wired:** real form delivery (Formspree, Netlify Forms, or a backend endpoint).
> Today submissions are validated client-side and handed off through `mailto:`.

## Lead tracking events

`page_view` · `quote_open` · `quote_submit` · `quote_form_error` · `quote_email_fallback` ·
`cta_click` · `phone_click` · `email_click` · `social_click` · `gallery_open` · `gallery_filter`

All events are pushed to `window.dataLayer` (and to `gtag` if present), so dropping in
Google Tag Manager or GA4 is a one-line change.

## Mobile

- Fixed bottom action bar: **CALL US | GET A QUOTE** (under 900px)
- Burger navigation with Services accordion
- Fluid type/spacing via `clamp()`, single-column layouts below 700px

## Image pipeline

Source photos are in the project root. Optimized output lives in `assets/images/`.
Re-run these PowerShell scripts after replacing any source photo:

- `%TEMP%\opencode\build-images.ps1` — resize/re-encode JPEGs
- `%TEMP%\opencode\build-logo.ps1` — background cut-out → transparent `logo.png` / `logo-white.png` / `favicon.png`

## Home redesign (reference mockup)

`index.html` was rebuilt to follow `Referencia de design de site.png` section by section:

1. Hero (full-bleed photo, brand headline, "Serving Rockland, MA — 02370", two CTAs)
2. Trust bar
3. About (photo flush to the left edge)
4. Services (intro column + four compact cards)
5. Why choose us (heading left, five pillars right)
6. Three-column band: Residential/Commercial · Our Work · photo collage flush right
7. Four-seasons photo band (dark green)
8. Service area: copy · map (`assets/images/map-rockland.jpg`, OpenStreetMap) · dark CTA panel

Decisions and deviations:

- Header phone number removed (matches the mockup); the phone lives in the footer,
  the dark CTA panel and the fixed mobile bar.
- Collage on the home page is static — the gallery/lightbox stays on `our-work.html`.
- "View All Services" points at `about.html#services` (there is no services index page).
- Accent on light backgrounds is olive `#7A8A2E`; lime `#9CAF3D` is used on dark only
  (it only reaches 2.16:1 on cream).
- Service-area copy now says **"Rockland, MA & Surrounding Areas"** — the client
  confirmed they serve neighbouring towns. No specific town names are listed
  (nothing invented); ZIP Code 02370 stays visible as Rockland's own.
- CTA wording kept as **"Request a Quote"** (client's choice over "Get a Free Estimate").
- Logo is untouched.

## QA round (post-redesign)

- **Quote form success path verified in the browser** on both the contact page and the
  hero modal: validation passes → lead stored in `localStorage` (`vcoelho_leads`) →
  "Thank you for contacting Vcoelho General Services INC." replaces the form, focus moves
  to the heading, and a pre-filled **Send by email** `mailto:` link (subject + body with
  name, phone, email, address, service, property type, project text, photo count, source)
  is generated. Invalid submits show six `.form-error` messages and do not navigate.
  **Bug found and fixed earlier in this round:** the contact page's submit button sat
  outside its `<form>` — the form now has `id="quote-form"` and the button uses
  `form="quote-form"`.
- **Structure/link audit (static, all 9 pages):** 9 pages, 259 internal links,
  0 broken files/anchors, 0 issues (titles, meta descriptions, one `h1` per page, no
  duplicate ids, no heading-level skips, every `<img>` has descriptive `alt`).
- **Contrast audit on all 9 pages** (custom checker, because axe reports "incomplete"
  whenever text sits on a gradient or photo). Fixed in this round:
  - `.area-cta` dark panel got `on-dark` — phone/email/location were dark green text on
    a dark green background (1.00:1) and the eyebrow was 2.12:1. Now lime/white.
  - `.seasons-head .eyebrow` → lime (was 2.12:1 on `#17351F`).
  - `.breadcrumb .sep` → `rgba(255,255,255,.55)` (was 3.46:1).
  - Gallery scrim `.gallery-item::after` opacity `.55` → `.75`.
  - Four seasons photos had `alt=""` → now describe the actual photo.
  - Eight CTA-band photos had `alt=""` → filled with the verified descriptions.
- **Lighthouse (all 9 pages):** accessibility 100, best practices 100, SEO 100,
  **0 failing audits**. The four "Learn More" service links failed SEO `link-text`
  (generic label, `aria-label` is not read by that audit) — fixed by adding
  `<span class="sr-only">about … services</span>` inside each link.
- **Runtime smoke test (all 9 pages):** no broken images, no horizontal overflow,
  no console errors, SVG sprite references all resolve, mobile action bar present,
  no header phone.
- **Load:** FCP ~100 ms, load <110 ms, CLS 0, 450–990 KB per page; hero and first
  content image on every page use `fetchpriority="high"` + `loading="eager"`.

## Round 2 (client feedback)

- **Surrounding areas.** Hero chip, service-area headings and leads, page heroes, and
  meta/OG descriptions on all 9 pages now read "Rockland, MA and surrounding areas"
  (client's answer: reference the neighbouring towns without naming any). ZIP Code 02370
  stays where the reference mockup shows it.
- **Compact, horizontal homepage.** New `<body class="home">` hook plus sections 29–34 of
  `assets/css/style.css` (`.home …` base rules + a
  `@media (min-width:901px) and (max-width:1180px)` block that keeps every band
  side-by-side down to 900px, while the existing stacked rules still handle phones).
  Measured in an iframe: **7928 px → 2285 px at 1004px wide** (height/width
  7.9 → 2.31) and **2557 px at 1440px** (1.79). Per section at 1004px —
  hero 359, trust 83, about 345, services 287, why 191, properties 249, seasons 125,
  service area 309, footer 262. Smaller type and photos, 4 small service cards in a
  single row, 5 pillars in a row, 3-up photo strip, 4 season cells in a row,
  3-column service area (copy | map | dark CTA) and a four-column footer —
  the rhythm of `Referencia de design de site.png`.
  **Accessibility regression caught and fixed:** the tighter hero pushed the
  `hero-scroll` arrow to 20×20 and it failed axe `target-size` (index scored 96) —
  the link is now 30×30 with a 22px icon.
  **Second bug found while measuring:** `.why-head .sprig` is an inline SVG with only a
  `viewBox`, so `height:auto` resolved to the 150px default replaced-element box and the
  leaf ornament alone added ~95px to the dark band — it now has an explicit 54×54 box.
- **Design approved.** After the compaction passes the client confirmed the homepage
  design ("o design da homepage agora está ótimo — manter nesse design"), so the layout
  above is frozen; only final adjustments (QA, fixes, docs) follow.
- **Real reviews published.** The client dropped `Review 1–5.jpeg` into the site root;
  all five were transcribed **verbatim** into `reviews.html` as `.review-card` items
  (5 stars, quote, reviewer, service, date; the two Yelp screenshots carry a "Yelp"
  chip). Empty-state copy changed from "Reviews Are Being Collected." to
  "Had a Great Experience?" and the "New reviews coming soon" badge was removed.
  The screenshots themselves are **not** published — they are source material only.
- **Map bug found & fixed.** `assets/images/map-rockland.jpg` had been cropped from
  `(px, py)` instead of `(px-256, py-256)` of the 768px tile canvas, so only the
  top-left corner contained map tiles and the rest was black. Regenerated with a hardened
  builder (`Temp\opencode\build-map2.ps1`: retries, per-tile size validation, white
  canvas, 9/9 tiles fetched) and re-verified pixel by pixel.
- **Overflow fix.** `.badge-years` on the About page reached 3px past the viewport at
  ≤1020px → `right:10px; top:10px` added at that breakpoint.
- **Regression QA:** static audit 9 pages / 259 links / 0 issues; fit test at
  390 / 768 / 1004 / 1440px → 0 horizontal overflow on every page; Lighthouse
  100 / 100 / 100 with 0 failing audits on all 9 pages; quote-form success path
  re-verified (success message, `mailto:` of 438 chars, lead stored, heading focused).

## Round 3 — final pass (design frozen)

The client confirmed the homepage design, so no further layout changes were made.
What this pass did:

- Sections 33–34 of `style.css` (the last compaction: 2791 → **2285px** at 1004px,
  3025 → **2557px** at 1440px) are the frozen baseline — do not restyle the homepage.
- Fixed the `hero-scroll` `target-size` failure and the 150px `.sprig` fallback box.
- The photo strip in the *Our Work* cell stretches to the full band height again
  (an intermediate `max-height:170px` left a white gap under the photos).
- Footer CTA button `white-space:nowrap` + rebalanced 4-column footer so
  "REQUEST A QUOTE →" no longer wraps at ~1000px.
- Final QA re-run: **static audit 0 issues**; **0 horizontal overflow** at
  390 / 768 / 1004 / 1440px on all 9 pages; **Lighthouse 100 / 100 / 100 with
  0 failing audits on all 9 pages**; quote form success path re-verified
  (success message, `mailto:` 438 chars, lead stored in `vcoelho_leads`,
  heading focused). All harness files (`__*.html`) deleted.

## Round 4 — reference rhythm on every page and width

The client asked to keep the homepage exactly as the 1004px mockup renders it
(`__measure.html?p=index.html&w=1004`) **and** to bring the other pages — and any
narrower window — to the same size and diagram. Section 37 of `style.css` does that:

- **Same vertical rhythm everywhere:** `.section` padding `64–108px` → `40–66px`,
  `.page-hero` `64–104px` → `36–56px` with a smaller H1 and tighter paragraph /
  breadcrumb spacing. The homepage keeps its own values through `<body class="home">`,
  so the approved design is untouched.
- **Landscape photos like the mockup:** `.split-media.is-tall img` `4/5` → `4/3`.
- **`@media (min-width:768px)` — inner pages stay horizontal:** benefit grid 2-col,
  mini gallery 3-col, service cards 4-col, photo gallery 6-col, service-area card
  2-col, four-seasons 4-col, contact grid 2-col, footer 4-col (these simply undo the
  `≤1020px` stacking, using the base values).
- **`@media (min-width:768px) and (max-width:900px)` — the mockup columns at the
  client's window width** (~877–892px): trust 4-col, about copy|photo, services
  intro|4 small cards, why heading|5 pillars, properties 3-col, seasons head + 4
  cells, service area copy|map|dark CTA, footer 4-col. **901px and up already
  rendered it (sections 29–34), so the frozen desktop baseline is unchanged.**
- **Our Work photo strip fix:** above 768px the tiles keep `height:100%` so they
  fill their cell — the `aspect-ratio` rule left a white gap under them; below
  768px they are uniform `4/3` tiles instead of mixed natural heights.

Totals:

| Page | 1004px before | 1004px after |
|---|---|---|
| index (reference) | 2285 | **2285 (unchanged)** · 2557 at 1440px · **2298 at 892px** (was 3784 stacked) |
| landscaping | 5589 | **4126** |
| fencing | 5155 | **3723** |
| hardscaping | 5439 | **3956** |
| snow-plowing | 5476 | **3999** |
| about | 6591 | **5255** |
| our-work | 6087 | **4169** |
| reviews | 4413 | **3945** |
| contact | 4536 | **3400** |

QA re-run: **static audit 0 issues**; **0 horizontal overflow** at
390 / 560 / 641 / 768 / 877 / 1004 / 1440px on all 9 pages; **Lighthouse
100 / 100 / 100 with 0 failing audits on all 9 pages**; quote form success path
re-verified (success heading, `mailto:` 438 chars, lead stored in `vcoelho_leads`,
heading focused). `__measure.html` is kept in the root as a layout-measuring
harness (its URL is what the client used to pick the design) and is excluded from
the deploy zip together with any other `__*.html`.

## Open items

1. **Social URLs are placeholders.** `instagram.com/vcoelhogeneralservices` and
   `facebook.com/vcoelhogeneralservices` were assumed — confirm the real handles.
2. **Canonical + Open Graph URLs.** `sitemap.xml` uses
   `https://www.vcoelhogeneralservices.com` — replace with the actual domain, then add
   `<link rel="canonical">` to every page.
3. **Form delivery.** Point the quote form at a real endpoint (see above).
4. **Photo rights.** All site photos come from the client's own folder
   (`Fencing/Hardscaping/Landscape/Snow Plowing 1…n.jpg`, `logo.jpeg`) and are already
   wired up in `assets/images/` with service names in the gallery tags, service cards
   and alt text — nothing in the folder is unused. Confirm the client is happy to publish them.
5. **Reviews page.** Now holds the five real reviews the client supplied (transcribed
   verbatim, typos included). Confirm the wording and whether you want the first three
   attributed to the lead platform they came from (screenshots 4–5 are labelled "Yelp").
6. **"8+ Years" experience claim.** Used in the trust bar, the hero badge and the
   About meta description — confirm the number with the client before launch.
7. **Alt text / gallery captions.** Every photo was reviewed against its actual
   image and the descriptions were corrected to match (e.g. the four fencing photos
   and the stone terrace). Re-check captions whenever a photo is swapped.
8. **Do not deploy the root-level source files.** `*.jpg` originals, `logo.jpeg`,
   `Simbolo da logo.jpeg`, `Referencia de design de site.png` and `Review 1–5.jpeg`
   live in the site root as working material — publish only `*.html`, `assets/**`,
   `sitemap.xml` and `robots.txt`.

## Contact details used throughout

- **Phone:** 508-577-5637 (`tel:5085775637`)
- **Email:** vcoelhogeneralservices@hotmail.com
- **Location:** Rockland, MA 02370
- **Hours:** Mon–Sat 7:00 AM – 6:00 PM
- **Snow plowing:** as needed during snowstorms
