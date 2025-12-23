#!/usr/bin/env node

const { minify } = require('html-minifier-terser');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const options = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
  sortAttributes: true,
  sortClassName: true,
};

async function minifyHtmlFiles() {
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const minified = await minify(html, options);
    fs.writeFileSync(filePath, minified);

    const originalSize = Buffer.byteLength(html, 'utf8');
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    console.log(`${file}: ${originalSize} -> ${minifiedSize} bytes (${savings}% smaller)`);
  }
}

minifyHtmlFiles().catch(console.error);
