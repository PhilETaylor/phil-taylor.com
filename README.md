# Phil Taylor - Personal Website

Personal website deployed on **Cloudflare Pages** (modern, simple, fast).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Login to Cloudflare (if not already logged in):
```bash
npx wrangler login
```

## Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8788`

## Deployment

Deploy to Cloudflare Pages:
```bash
npm run deploy
```

First deployment will create the Pages project. Subsequent deploys will update it.

## Project Structure

```
.
├── public/              # Static files served by Pages
│   ├── index.html
│   ├── _headers         # HTTP headers configuration
│   ├── *.png, *.svg     # Favicons and icons
│   ├── site.webmanifest
│   └── .well-known/     # Domain verification files
└── package.json
```

## Features

- **Cloudflare Pages** - Modern static site hosting
- **Global CDN** - Automatic edge caching worldwide
- **Security headers** - Configured via `_headers` file
- **Auto HTTPS** - Automatic SSL certificates
- **Custom domains** - Easy setup in Cloudflare dashboard
- **Auto dark mode** - System preference detection

## Custom Domain

1. Deploy first: `npm run deploy`
2. Go to Cloudflare Pages dashboard
3. Click on your project → "Custom domains"
4. Add `phil-taylor.com` and `www.phil-taylor.com`
5. Cloudflare handles DNS automatically!
