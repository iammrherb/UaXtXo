const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Set the correct homepage
packageJson.homepage = "https://iammrherb.github.io/UaXtXo";

// Write the file back
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('Updated package.json with correct homepage');
