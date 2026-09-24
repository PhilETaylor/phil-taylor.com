# Changelog

## 2026-09-24

### Changed
- Homepage is now a single centred column headed "About Phil Taylor"
- About section rewritten: award-winning developer, awards shortlisting for government vulnerability reports, Personal Data Protection law, Fractional CTO, white-label/NDA work and incident consultancy, vendor-neutral AI paragraph
- SSH and GPG keys moved to a "Digital ID Key Fingerprints" section showing full fingerprints
- Meta, Open Graph and Twitter descriptions no longer list projects or location
- Bump asset cache-buster to v=21

### Removed
- Sidebar: avatar video, name, tagline, contact button, location, email, company and social links
- Projects grid, client projects and areas of expertise sections
- Unused avatar, client logo images, confetti script and their CSS/JS effects

## 2026-09-18

### Added
- `/security.txt` at the site root, identical to `/.well-known/security.txt`

### Changed
- `security.txt` now mirrors the mySites.guru coordinated disclosure file (keys.openpgp.org encryption key, disclosure policy link, expires 2027-03-18), with Canonical listing both phil-taylor.com URLs; the old PGP-signed version is gone
- About security paragraph now says the long track record of vulnerability disclosures comes from day-job software work rather than active research
- White-label paragraph now describes building the SaaS platforms that quietly underpin other companies' success
- Bring the security paragraph in `index.md` and `llms.txt` in line with `index.html` (web application, SaaS and website security)
- Bump asset cache-buster to v=20

## 2026-09-14

### Added
- Link from the About section security paragraph to the responsible disclosure blog archive, in `index.html`, `index.md` and `llms.txt`
- About paragraphs on Personal Data Protection across Jersey, UK, EU and worldwide jurisdictions, and on daily Claude Code and Anthropic API use
- `public/.assetsignore` so Cloudflare Workers skips `.DS_Store` and `Thumbs.db`

### Changed
- Broaden the security paragraph beyond Linux servers to web application, SaaS and website security
- Open the About section with "Decades of experience" instead of "Senior software developer"
- Bump asset cache-buster to v=19

### Removed
- "Need help with your Joomla or WordPress site?" call-to-action card
- "What People Say" testimonials block

## 2026-04-25

### Added
- Brand-tinted thin scrollbars with stable gutter to prevent layout shift, accent-coloured thumb on hover, and dark-mode variant via `prefers-color-scheme`

## 2026-04-22

### Added
- Markdown representation of the homepage at `/index.md` for agents and LLMs
- `Content-Signal: ai-train=no, search=yes, ai-input=no` in robots.txt to declare AI content usage preferences

### Removed
- Jersey Aero Club webcams page (`webcam.html`) and `js/webcam.js`

## 2026-04-21

### Added
- Pure-tone image outlines on avatar video, client icons, and testimonial avatars
- Tactile press-scale (0.96) on Contact button, CTA, and project cards
- Tabular numerals on SSH and GPG key fingerprints for mono alignment
- `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs

### Changed
- Replace `transition-all` with specific property transitions across cards, popovers, and client icons

### Removed
- Corner-drawing hover animation on Contact button

## 2026-04-03

### Fixed
- Change structured data `owns` type from Product to WebApplication to fix Google validation warnings for missing review/aggregateRating/offers

## 2026-04-02

### Added
- Ambient animated gradient border around main content container
- Radar-ping animation on status dot in experience badge
- Gold shimmer effect on testimonial star ratings when scrolled into view
- Time-of-day accent color shift (morning/afternoon/evening blues)

### Fixed
- Fix structured data validation: change `owns` items from WebApplication/WebSite to Product type

### Changed
- Rewrite About bio with updated credentials and clearer structure
- Double testimonial star rating size from 12px to 24px
- Bump asset cache-buster version to v=17
