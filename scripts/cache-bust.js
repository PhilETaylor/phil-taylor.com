#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const MIN_VERSION = 3;

// Find current max version from HTML files
function getCurrentVersion() {
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
  let maxVersion = MIN_VERSION;

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const matches = html.matchAll(/\?v=(\d+(?:\.\d+)?)/g);

    for (const match of matches) {
      const version = parseFloat(match[1]);
      if (version > maxVersion) {
        maxVersion = version;
      }
    }
  }

  return maxVersion;
}

// Increment version
function incrementVersion(version) {
  const newVersion = Math.floor(version) + 1;
  return Math.max(newVersion, MIN_VERSION);
}

// Update all versioned assets in HTML files
function updateVersions(newVersion) {
  const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
  const versionPattern = /\?v=\d+(?:\.\d+)?/g;

  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const updated = html.replace(versionPattern, `?v=${newVersion}`);

    if (updated !== html) {
      fs.writeFileSync(filePath, updated);
      console.log(`${file}: updated to v=${newVersion}`);
    }
  }
}

const currentVersion = getCurrentVersion();
const newVersion = incrementVersion(currentVersion);
updateVersions(newVersion);
console.log(`Cache buster: v=${newVersion}`);
