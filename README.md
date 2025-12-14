# Phil Taylor - Personal Website

Personal website deployed on **Cloudflare Workers** with static assets (modern, simple, fast).

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

The site will be available at `http://localhost:8787` (default Workers dev server port)

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

First deployment will create the Worker. Subsequent deploys will update it.

## Commands Reference

### Development
```bash
npm run dev              # Build CSS + start dev server (localhost:8787)
npm run start            # Watch CSS + start dev server (auto-reload CSS)
npm run build:css        # Build Tailwind CSS once
npm run watch:css        # Watch and rebuild CSS on file changes
```

### Deployment
```bash
npm run deploy           # Build + deploy to Cloudflare Workers
npx wrangler deploy      # Manual deploy (no CSS build)
```

### Cloudflare Workers Management
```bash
# View deployments
npx wrangler deployments list

# View live logs
npx wrangler tail

# View worker info
npx wrangler whoami

# Delete a deployment
npx wrangler delete
```

### Git Deployment (Workers Builds - Optional)
If you set up Workers Builds, you can enable auto-deploy on push:
```bash
git add .
git commit -m "Update site"
git push origin main
# Enable Workers Builds in the Cloudflare dashboard for auto-deploy
```

### Tailwind CSS
```bash
# Build for production (minified)
npx tailwindcss -i ./src/input.css -o ./public/styles.css --minify

# Build with source maps (debugging)
npx tailwindcss -i ./src/input.css -o ./public/styles.css --watch

# Check Tailwind version
npx tailwindcss --help
```

### Troubleshooting
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check deployment status
npx wrangler pages deployments list --project-name=phil-taylor-com

# View deployment logs
npx wrangler pages tail phil-taylor-com --format=pretty
```

## Project Structure

```
.
├── public/              # Static files served by Workers
│   ├── index.html
│   ├── 404.html
│   ├── _headers         # HTTP headers configuration
│   ├── *.png, *.svg     # Favicons and icons
│   ├── site.webmanifest
│   └── .well-known/     # Domain verification files
├── src/
│   └── input.css        # Tailwind CSS source
├── wrangler.toml        # Workers configuration
├── tailwind.config.js
└── package.json
```

## Features

- **Cloudflare Workers** - Modern static asset hosting with full Worker capabilities
- **Global CDN** - Automatic edge caching worldwide
- **Security headers** - Configured via `_headers` file in public/
- **Auto HTTPS** - Automatic SSL certificates
- **Custom domains** - Cloudflare-managed nameservers required
- **Auto dark mode** - System preference detection
- **404 handling** - Custom 404 page configured in wrangler.toml

## Custom Domain

1. Ensure your domain uses Cloudflare nameservers
2. Deploy first: `npm run deploy`
3. Go to Cloudflare Workers dashboard
4. Click on your worker → "Settings" → "Domains & Routes"
5. Add custom domains: `phil-taylor.com` and `www.phil-taylor.com`
6. DNS records will be automatically configured
