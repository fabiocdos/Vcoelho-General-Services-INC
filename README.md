# Vcoelho-General-Services-INC

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
| index (reference) | 2285 | **2285 (unchanged)** · 2557 at 1440px · **2301 at 892px** (was 3784 stacked) |
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

## Round 5 - photo refresh (2026-10-07)

- The client replaced the four source photos `Fencing 1-4.jpg` with new
  `Fencing 1-4.jpeg` (1200x1600 portrait, EXIF orientation 1). They are now
  published as `assets/images/fencing-1..4.jpg`, center-cropped to **1100x825
  (4:3)** - the exact ratio used by the hero, the mini-gallery, the split media
  and the gallery tiles - at JPEG quality 70 (167-195 KB each, 731 KB total).
- Alt text, `figcaption` captions and gallery/lightbox names were rewritten to
  describe the new photos: **Picket Fence & Gate**, **Post-and-Rail Fence**,
  **Privacy Fence & Driveway**, **Porch Enclosure Fence** (replacing "Cedar
  Privacy Fence", "On-Site Installation"/"Fence Installation", "Privacy Fence &
  Planting Bed" and "Fence with Patio"/"Horizontal Fence & Paver Patio").
- `width`/`height` attributes updated to 1100x825 in `fencing.html`
  (5 images) and `our-work.html` (4 images), so the intrinsic ratio matches
  the CSS 4:3 slots exactly: no cropping by the browser and no layout shift.
- `fence-vcoelho.jpg` was left alone for this first swap (its wooden-fence alt
  text still matched) and replaced in the second request documented below.
- QA: static audit 0 issues / 259 links; 0 horizontal overflow at 390 / 560 /
  641 / 768 / 1004 / 1440 px on `fencing` and `our-work`; all 22 gallery
  images load; lightbox shows the new names; Lighthouse 100 / 100 / 100 on both
  pages.
- Second request, same day: the client chose
  `WhatsApp Image 2026-10-06 at 01.48.00.jpeg` to **replace `fence-vcoelho.jpg`**
  - the photo used by the Home fencing card, the Home photo strip, the About card,
  the fencing intro, the Our Work hero and the Our Work gallery. It was resized
  1200x1600 -> 900x1200 (same 3:4 ratio, no crop, quality 70 = 194 KB against the
  215 KB it replaced), so all seven `width="900" height="1200"` attributes stayed
  valid and no markup dimension changed.
- Its description now reads "White vinyl fence running alongside the paved walkway
  of a gray house" in those 7 places, and the Our Work gallery item was renamed
  from "Wooden Privacy Fence" to "Vinyl Fence & Walkway" (lightbox label too).
- Home re-measured after the swap: **2285 px at 1004 px** and **2557 px at 1440 px**
  - unchanged. At 892 px it measures 2301 px both with the new files and with the
  previous commit (`a972b99`), so the "2298 px" recorded in Round 4 was
  measurement drift, not a layout change; the table above shows the value measured
  today.
- QA after both swaps: static audit 0 issues / 259 links; **0 overflow** at
  390 / 768 / 1004 / 1440 px on index, about, fencing and our-work; no broken
  images (22 images on our-work, 9 on fencing); **Lighthouse 100 / 100 / 100** on
  all four pages. Every root source photo is now wired into the site - nothing is
  left waiting in the root.

## Round 6 - SEO (2026-10-07)

Complete technical + local SEO pass. No visual redesign: layout, typography,
colors, navigation and the frozen homepage are untouched (heights re-measured at
2285 px @1004, 2557 px @1440, 2301 px @892). Canonical domain from the brief:
`https://vcoelhogeneralservices.com/` (bare domain, HTTPS).

### Files created

- `request-a-quote.html` - dedicated quote landing page: hero, the existing quote
  form (same 8 labelled fields, `mailto:` action, validation, thank-you state),
  service links and the CTA band. Linked from every page header/hero/section CTA.
- `assets/images/share-vcoelho.jpg` - 1200x630, 161 KB social card built from the
  homepage hero photo + white logo + tagline; used as `og:image` / `twitter:image`
  on all 10 pages (it is never rendered inside a page).
- FAQ sections (`<section id="faq">`) on `landscaping.html` (5 questions),
  `fencing.html` (4) and `snow-plowing.html` (4), with a `.faq-grid` CSS block
  appended to `assets/css/style.css` (section 38).

### Files modified

- All 9 original HTML pages: `<head>`, service H1s, phone links, social links,
  quote CTA hrefs, JSON-LD.
- `robots.txt`, `sitemap.xml`, `assets/js/site.js` (`PHONE_RAW`), `assets/css/style.css`.

### Metadata

- Titles and meta descriptions set exactly as specified in the brief, unique
  across the 10 pages (checked: 10 unique titles, 10 unique descriptions,
  title 15-75 chars, description 50-170 chars).
- Service H1s now carry service + city, e.g. `Professional Landscaping Services in
  Rockland, MA`, `Professional Fence Installation in Rockland, MA`, `Reliable Snow
  Plowing Services in Rockland, MA`. The homepage H1 stays the brand line
  `Quality Work. Reliable Service. Every Season.` (not keyword-stuffed).
- `.page-hero h1` `max-width` 16ch -> 28ch so the longer H1s still break into
  exactly two lines at every width (verified in the browser: 2 lines on all
  inner pages, hero height unchanged at 363 px).

### Canonical, Open Graph, Twitter

- `<link rel="canonical">` on all 10 pages, pointing at existing URLs only
  (home = `/`, inner pages keep their `.html` - no URL migration, no redirects).
- `og:url` equals the canonical on every page; `og:site_name`, `og:locale=en_US`,
  absolute `og:image` with `og:image:width/height/alt`; `twitter:title`,
  `twitter:description`, `twitter:image`, `twitter:image:alt`;
  `<meta name="robots" content="index, follow, max-image-preview:large">`
  (no `noindex` anywhere).

### Structured data (JSON-LD, one `@graph` per page)

- Home: `LandscapingBusiness` (name, alternateName, url, image, logo, telephone,
  email, locality-level `PostalAddress` Rockland/MA/02370 **without street**,
  `openingHoursSpecification` Mon-Sat 07:00-18:00, `areaServed` Rockland,
  Massachusetts, `sameAs` = the two real social profiles) + `WebSite`.
- Service pages: `Service` with `serviceType`, `provider` (inline business data),
  `description` (identical to that page's meta description) and `areaServed`.
- Inner pages: `BreadcrumbList` matching the visible breadcrumb (Services links to
  `/#services`, which exists).
- FAQ pages: `FAQPage` - every question and answer is verified to exist verbatim
  in the visible HTML.
- Deliberately absent: street address, geo coordinates, priceRange,
  aggregateRating, reviewCount, foundingDate, hours beyond Mon-Sat 7-18.
  Validated by script: parses, arrays intact, sequential breadcrumb positions,
  `Service.description` == meta description, 0 issues.

### robots.txt / sitemap.xml

- robots: `User-agent: *` / `Allow: /` / `Sitemap: https://vcoelhogeneralservices.com/sitemap.xml`
  (no Disallow, CSS/JS/images all crawlable).
- sitemap: 10 HTTPS URLs on the canonical domain (home as `/`, never
  `/index.html`), `lastmod` 2026-10-07, no duplicates, every URL has a matching
  canonical in its page and every page is in the sitemap.

### Images

- 94 `<img>` tags: all with meaningful `alt`, all with `width`/`height`
  (0 mismatches against the actual files - no CLS), below-the-fold lazy,
  hero images eager with `fetchpriority="high"`.
- **Filenames were deliberately not renamed.** The site is already live, so
  renaming cached image URLs would create 404s for a marginal signal - the
  descriptive `alt` text (reviewed photo by photo) is the stronger signal. If the
  owner wants it later, do it with redirects before wider indexing.
- No stock photos, no photo replaced; only the new share card was added.

### Accessibility / performance

- One H1 per page, no heading level skips, every form control labelled, landmarks
  + skip link present, alt on all images.
- No performance change needed: one deferred script, one stylesheet, Google Fonts
  with `preconnect` + `display=swap`, no third-party scripts, images sized/lazy.
  **No analytics is installed** (GA4/GSC ID needed from the owner).

### Internal linking / conversion

- 42 quote CTAs across the 8 other pages now fall back to
  `request-a-quote.html` while `data-quote` keeps opening the modal (JS calls
  `preventDefault`), so the UX is unchanged and the new page is crawlable.
- Per page: 4-7 quote CTAs (header, hero, sections, final CTA, footer) on every
  page without a form; `contact.html` and `request-a-quote.html` keep the in-page
  `#quote` anchor. Mobile bar keeps CALL US | GET A QUOTE.
- 40+ distinct descriptive anchor texts, no "click here"/"read more".

### Contact consistency

- 28 `tel:` links in HTML + the 2 built by JS (mobile bar, modal) now use
  `tel:+15085775637`; display text stays `508-577-5637`.
- Facebook/Instagram corrected to the real profiles (45 links), `rel` OK on
  external links; email unchanged.

### QA actually run

- Static audit: 10 pages, 292 internal links, **0 broken**, 0 issues.
- Metadata QC: 0 issues (canonical == og:url, no noindex, robots/sitemap valid).
- JSON-LD check: 0 issues. Heading/label audit: 0 issues. Anchor audit: 0 issues.
- 0 horizontal overflow at 390/560/641/768/1004/1440 px; homepage height frozen.
- Lighthouse on the **live domain after deployment: 100 / 100 / 100 on all 10
  pages (30/30, zero failures)** - accessibility, best practices and SEO; the
  same three categories pass on the local copy too.
- Post-deploy pass on production (2026-10-07): the footer logo was being drawn
  squashed between roughly 768-850 px (a fixed `height:52px` against a 96-119 px
  footer track). Fixed with `object-fit:contain` on `.footer-brand img`: the box
  keeps the exact same 52 px height (homepage re-measured at 2285 / 2557 / 2301
  px), the content keeps its 487x165 ratio, and Lighthouse stops flagging
  `image-aspect-ratio` (that audit only inspects `object-fit:fill` images).
- CSS and JS are now referenced with `?v=20261007`: Hostinger serves assets with
  `max-age=604800`, so without a version query returning visitors - and the CDN -
  would keep the previous stylesheet/script for up to a week.
- Re-verified after those changes: W3C HTML5 again **0 errors / 0 warnings** on all
  10 pages, 292 internal links / 0 broken, homepage heights unchanged, 0 horizontal
  overflow on 6 pages x 5 widths.
- W3C HTML5 (Nu) validator: **0 errors, 0 warnings on all 10 pages** - fixed
  `autocomplete="street-address"` (a multiline token, valid only on `textarea`)
  to `address-line1` on both quote forms, and the About trust bar from
  `<section>` to `<div>` (it carries no heading; no CSS selects that element).
- Core Web Vitals measured on the **live domain** (headless Chromium 154 driven
  over CDP, no throttling): home desktop FCP 912 ms, LCP 1632 ms (hero `<img>`),
  CLS 0.0006, TTFB 395 ms; inner pages FCP = LCP 444-476 ms with CLS 0; **0 long
  tasks** on every page. Mobile viewport (390x844, repeat load with warm cache):
  FCP/LCP 56-68 ms, CLS 0. PageSpeed Insights (Lighthouse throttling + field
  data) still has to be run by the owner on the live URL.
- Not run (needs the live domain): Google Rich Results Test, Search Console
  "Sitemaps" upload, PageSpeed Insights field data.

### Still needed from the owner

1. Google Search Console verification (string or DNS TXT) and the GA4 ID.
2. Hostinger redirect rules: force HTTPS and redirect `www.` to the bare domain,
   so the four duplicate versions collapse onto the canonical.
3. Optional: the real Google Business Profile reviews URL (no link invented).
4. Decision on switching the CTA wording to "REQUEST A FREE QUOTE".
## Deployment

- **Live (production):** https://vcoelhogeneralservices.com/ - Hostinger,
  maintained from this repository. Verified on 2026-10-07 right after the SEO
  push: all 10 sitemap URLs return HTTP 200, `robots.txt` and `sitemap.xml` are
  served from the canonical domain, and the canonical / Open Graph / JSON-LD
  blocks are present in the HTML actually served. `http://` already redirects
  to `https://`; a 301 from `www.` to the bare domain is still missing (Open
  items #3).
- **Preview:** https://fabiocdos.github.io/Vcoelho-General-Services-INC/ - GitHub
  Pages, branch `main`, source folder `/`, HTTPS enforced; rebuilds ~1 min after
  each push. Repo: https://github.com/fabiocdos/Vcoelho-General-Services-INC
- The repository holds only what is publishable: the `.gitignore` keeps the root-level
  working material out (original photos, review screenshots, the design reference,
  `vcoelho-site.zip`, `__*.html` harnesses) and `pack-site.ps1` zips the same set.
- A custom domain can be added later in *Settings → Pages → Custom domain*.

## Confirmed by the client (2026-10-03)

- **"8+ Years" experience claim** — confirmed. It is used in the trust bar, the About
  section and the About meta description; no wording change needed.
- **Photo rights** — approved for publication. Every photo comes from the client's own
  folder (`Fencing/Hardscaping/Landscape/Snow Plowing 1…n.jpg`, `logo.jpeg`), is wired
  up in `assets/images/` and described in the service cards, gallery tags and alt text —
  nothing in the folder is unused.
- **Reviews attribution** — approved. The five real reviews are published verbatim
  (typos included); screenshots 4–5 are labelled "Yelp" and the remaining ones are
  published as supplied.

## Open items

1. **Form delivery.** The quote form still runs on the `mailto:` fallback plus
   the local `vcoelho_leads` store - point it at a real endpoint (Formspree,
   Hostinger PHP, Netlify Forms) to collect submissions server-side.
2. **Google Search Console + GA4.** The domain verification TXT record
   (`google-site-verification=...`) is already published in the Hostinger DNS by
   the owner. Still needed: add the *domain property* in Search Console, confirm
   the verification and submit `sitemap.xml`; plus the GA4 measurement ID (not
   added - it must not be invented).
3. **Hostinger redirects.** Force HTTPS and send `www.` to the bare domain -
   canonicals, OG and the sitemap already use
   `https://vcoelhogeneralservices.com/`.
4. **Third-party review link.** Only add a real Google Business Profile review
   URL when the client provides it.
5. **CTA wording.** The brief asks for "REQUEST A FREE QUOTE"; buttons keep
   "Request a Quote" per the client's earlier choice - one word confirms it.
6. **Alt text / gallery captions.** Every photo is described from its actual
   image; re-check captions whenever a photo is swapped (client rule).
7. **Root-level source files stay out of the build.** `*.jpg` originals,
   `logo.jpeg`, `Simbolo da logo.jpeg`, `Referencia de design de site.png` and
   `Review 1-5.jpeg` live in the site root as working material - publish only
   `*.html`, `assets/**`, `sitemap.xml` and `robots.txt`. Enforced by `.gitignore`
   (repo) and by the packaging script (zip).

## Contact details used throughout

- **Phone:** 508-577-5637 (`tel:+15085775637`)
- **Email:** vcoelhogeneralservices@hotmail.com
- **Location:** Rockland, MA 02370
- **Hours:** Mon–Sat 7:00 AM – 6:00 PM
- **Snow plowing:** as needed during snowstorms
