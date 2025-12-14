# Phil Taylor - Personal Website

Personal website deployed on Cloudflare Workers.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Login to Cloudflare (if not already logged in):
```bash
npx wrangler login
```

3. Update `wrangler.toml`:
   - Add your Cloudflare account ID
   - Configure your domain routes (if using a custom domain)

## Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8787`

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Project Structure

```
.
├── public/              # Static assets served by the worker
│   ├── index.html
│   ├── *.png, *.svg     # Favicons and icons
│   ├── site.webmanifest
│   └── .well-known/     # Domain verification files
├── src/
│   └── index.js         # Worker script
├── wrangler.toml        # Cloudflare Workers configuration
└── package.json
```

## Features

- Cloudflare Workers for edge computing
- Static asset serving with KV storage
- Security headers (CSP, X-Frame-Options, etc.)
- Optimized caching for different asset types
- Auto dark mode support

## Custom Domain

To use a custom domain:

1. Add your domain to Cloudflare
2. Update `wrangler.toml` with your routes
3. Deploy with `npm run deploy`
