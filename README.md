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

## Commands Reference

### Development
```bash
npm run dev              # Build CSS + start dev server (localhost:8788)
npm run start            # Watch CSS + start dev server (auto-reload CSS)
npm run build:css        # Build Tailwind CSS once
npm run watch:css        # Watch and rebuild CSS on file changes
```

### Deployment
```bash
npm run deploy                    # Build + deploy to Cloudflare Pages
npx wrangler pages deploy public  # Manual deploy (no CSS build)
```

### Cloudflare Pages Management
```bash
# View deployments
npx wrangler pages deployments list --project-name=phil-taylor-com

# View live logs
npx wrangler pages tail phil-taylor-com

# View project info
npx wrangler pages project list

# Delete a deployment
npx wrangler pages deployments delete <deployment-id> --project-name=phil-taylor-com
```

### Git Deployment (Auto-deploy on push)
```bash
git add .
git commit -m "Update site"
git push origin main
# Cloudflare automatically deploys!
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
