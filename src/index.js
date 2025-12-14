import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Security headers
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    };

    try {
      // Build options for getAssetFromKV
      const options = {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        mapRequestToAsset: (req) => {
          const url = new URL(req.url);
          // Map root and directories to index.html
          if (url.pathname === '/' || url.pathname.endsWith('/')) {
            url.pathname = url.pathname + 'index.html';
          }
          return new Request(url.toString(), req);
        },
      };

      // Add manifest if available (for production)
      if (typeof __STATIC_CONTENT_MANIFEST !== 'undefined') {
        options.ASSET_MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST);
      }

      // Serve static assets
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        options
      );

      // Add security headers
      const headers = new Headers(response.headers);
      Object.entries(securityHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      // Set cache control based on file type
      if (url.pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|woff2?|ttf|eot)$/)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (url.pathname.match(/\.(css|js)$/)) {
        headers.set('Cache-Control', 'public, max-age=86400');
      } else if (url.pathname.match(/\.(html|json|xml|txt)$/)) {
        headers.set('Cache-Control', 'public, max-age=3600');
      } else {
        headers.set('Cache-Control', 'public, max-age=86400');
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (e) {
      // If asset not found, return 404
      if (e.status === 404) {
        return new Response('Not Found', {
          status: 404,
          headers: securityHeaders,
        });
      }

      // For other errors, log and return 500
      console.error('Worker error:', e);
      return new Response(`Internal Server Error: ${e.message}`, {
        status: 500,
        headers: securityHeaders,
      });
    }
  },
};
