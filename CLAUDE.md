# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Phil E. Taylor deployed on **Cloudflare Workers** with static assets. The site features a terminal-style interface with automatic dark mode support, security headers, and LLM-friendly content.

## Technology Stack

- **Hosting**: Cloudflare Workers with static assets serving
- **Styling**: Tailwind CSS v3.4.0
- **Deployment**: Wrangler CLI (v4.54.0)
- **Runtime**: Cloudflare Workers (ES modules)

## Development Commands

### Daily Development
```bash
npm run dev              # Build CSS once + start dev server (localhost:8787)
npm run start            # Watch CSS changes + start dev server (preferred for active CSS work)
npm run build:css        # Build Tailwind CSS once (minified)
npm run watch:css        # Watch and rebuild CSS on changes
```

### Deployment
```bash
npm run deploy           # Build CSS + deploy to Cloudflare Workers
npx wrangler deploy      # Deploy without rebuilding CSS
npx wrangler tail        # View live logs
npx wrangler deployments list  # View deployment history
```

### Cloudflare Authentication
```bash
npx wrangler login       # Authenticate with Cloudflare (first time only)
npx wrangler whoami      # Check current authentication status
```

## Project Architecture

### Worker Entry Point
- **index.js**: Minimal Cloudflare Worker that serves static assets via `env.ASSETS.fetch(request)`
- The Worker handles asset serving automatically via the assets binding configured in wrangler.toml

### Static Assets (`public/`)
All content is served from the `public/` directory:
- **index.html**: Main page (terminal-style design)
- **404.html**: Custom error page
- **_headers**: HTTP security headers configuration (CSP, HSTS, CORS, etc.)
- **styles.css**: Compiled Tailwind CSS (generated from src/input.css)
- **js/dark-mode.js**: System preference-based dark mode detection (loads in `<head>`)
- **js/analytics.js**: Google Analytics integration
- **.well-known/**: Domain verification files (security.txt, keybase.txt, Apple Pay, etc.)
- **llms.txt**: LLM-friendly content summary

### Styling System (`src/`)
- **input.css**: Tailwind source with custom background patterns
  - Custom SVG patterns for light/dark mode backgrounds
  - Cursor blink animation for terminal effect
  - Dark mode uses system preferences via `prefers-color-scheme`

### Configuration Files
- **wrangler.toml**: Cloudflare Workers configuration
  - Static assets directory: `./public`
  - HTML handling: auto-trailing-slash
  - Custom domain: www.phil-taylor.com
  - 404 handling: serves 404.html
  - Observability enabled with full logging
- **tailwind.config.js**: Tailwind configuration
  - Content: `./public/**/*.{html,js}`
  - Dark mode: class-based (controlled by JS)

## Security Configuration

Security headers are defined in `public/_headers`:
- CSP configured for Google Analytics and LiveChat
- HSTS with preload
- X-Frame-Options: DENY
- Strict referrer policy
- Permissions policy for geolocation/microphone/camera
- CORS headers: cross-origin resource policy

When modifying security headers:
1. Test CSP changes thoroughly (scripts require sha256 hashes)
2. Ensure new third-party scripts are added to CSP whitelist
3. Keep HSTS max-age at 31536000 (1 year)

## Dark Mode Implementation

Dark mode is automatic based on system preferences:
1. `js/dark-mode.js` runs immediately in `<head>` to prevent flash
2. Checks `window.matchMedia("(prefers-color-scheme: dark)")`
3. Adds `dark` class to `<html>` element if dark mode detected
4. Tailwind dark mode classes apply automatically via `dark:` prefix
5. Background patterns switch between light/dark variants (defined in `src/input.css`)

## Deployment Architecture

- **Primary domain**: www.phil-taylor.com (configured in wrangler.toml routes)
- **Workers deployment**: Static assets served via Cloudflare's global CDN
- **Account ID**: 3daef84f0b44a778a448d8d299d0d0c9
- **Compatibility date**: 2025-12-14

The deployment process:
1. Updates browserslist database
2. Compiles Tailwind CSS (minified)
3. Deploys Worker + static assets to Cloudflare edge

## Common Modifications

### Adding New Pages
1. Create HTML file in `public/`
2. Update CSP in `public/_headers` if adding scripts
3. Test with `npm run dev`
4. Deploy with `npm run deploy`

### Modifying Styles
1. Edit HTML classes directly (Tailwind utility classes)
2. For custom CSS, edit `src/input.css` in appropriate @layer
3. Rebuild: `npm run build:css` or use `npm run watch:css` during development
4. Tailwind content scanning: `./public/**/*.{html,js}`

### Testing Security Headers
1. Modify `public/_headers`
2. Test locally: `npm run dev`
3. Check headers in DevTools Network tab
4. Deploy: `npm run deploy`

### Adding Third-Party Scripts
1. Add script to HTML with integrity/crossorigin if available
2. Update CSP in `public/_headers` (add domain to script-src, connect-src as needed)
3. Calculate sha256 hash if inline script: `echo -n "script content" | openssl dgst -sha256 -binary | openssl base64`
4. Test thoroughly before deploying
