# California Treatment Centers — website

Static, SEO-focused site for **californiatreatmentcenters.com**. Generated from data files by `build.js` (no framework, no runtime dependencies).

## How it works

- `build.js` — generator. Produces one HTML page per content entry + homepage, E-E-A-T pages, a Locations hub, a Guides hub, `sitemap.xml`, and `robots.txt`. Adds Organization + Physician + WebPage + FAQ JSON-LD and decorative imagery with alt text.
- `home.js` — homepage content.
- `eeat-content.js` — trust pages (medical director, clinical team, editorial policy, references).
- `content/*.json` — the bulk pages. Each object = one page. `category` controls nav placement:
  - `level` → Levels of Care · `treatment` → What We Treat · `insurance` → Insurance · `location` → Locations · `article` → Guides
- `locations.js` — **real physical locations** for LocalBusiness schema. Replace the placeholders with real Name/Address/ZIP and set `placeholder:false`. Until then, no location/address schema is emitted (so nothing fake ships).
- `styles.css` — shared stylesheet.
- `images/` — decorative SVG imagery (generic; not facility photos).

## Build

```
node build.js
```

Commit the generated `*.html`. Netlify also runs `node build.js` on deploy (see `netlify.toml`).

## To edit / add pages

Edit the matching `content/*.json` (or `home.js` / `eeat-content.js`), then `node build.js`. Slugs map 1:1 to URLs.

## Social links

Edit the `SOCIAL` array near the top of `build.js` with your real Instagram/Facebook URLs. They render in the footer and feed the Organization `sameAs` schema.

## Deploy checklist

1. Create GitHub repo and push this folder.
2. Netlify → Import from Git → deploy `main` (publish `.`, build `node build.js`).
3. Point `californiatreatmentcenters.com` DNS at Netlify.
4. (Weekly auto-rebuild) Netlify → Build hooks → create one → add it as the GitHub repo secret `NETLIFY_BUILD_HOOK`. `.github/workflows/weekly-deploy.yml` pings it every Monday.
5. Verify the site in Google Search Console and submit `sitemap.xml`.

## TODO before go-live

- [ ] Fill `locations.js` with real addresses (set `placeholder:false`).
- [ ] Confirm the `SOCIAL` URLs in `build.js`.
- [ ] Replace decorative SVGs in `images/` with real photos if/when available (keep the alt text honest).
