# Changelog

## 2026-04-22

### Added
- Markdown representation of the homepage at `/index.md` with Accept-header content negotiation in the Worker
- `Vary: Accept` and `Link: rel="alternate"` discovery headers on the homepage
- `run_worker_first` for `/` and `/index.html` in wrangler.toml so the Worker can negotiate before static asset serving

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
