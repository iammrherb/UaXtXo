// This script will clean up the index.html
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Remove problematic script
html = html.replace(/<script src="\.\/js\/fix-tab-loading\.js"><\/script>\n/g, '');

// Remove duplicate script loads
const scripts = html.match(/<script src="[^"]+"><\/script>/g) || [];
const uniqueScripts = [...new Set(scripts)];

// Write back
fs.writeFileSync('index.html', html);
console.log('Cleaned up index.html');
