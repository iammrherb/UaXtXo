// Script to update vendor logo paths for GitHub Pages deployment
const fs = require('fs');
const path = require('path');

// Path to vendor data file
const vendorDataPath = path.join(__dirname, 'src/api/vendorData.ts');

// Check if the file exists
if (fs.existsSync(vendorDataPath)) {
  // Read the file
  let vendorData = fs.readFileSync(vendorDataPath, 'utf8');

  // Replace local paths with GitHub Pages paths
  vendorData = vendorData.replace(/logo: '\/img\/vendors\//g, 'logo: process.env.NODE_ENV === \'production\' ? \'/UaXtXo/img/vendors/\' : \'/img/vendors/');

  // Write the updated file
  fs.writeFileSync(vendorDataPath, vendorData);

  console.log('Updated vendor logo paths for GitHub Pages deployment');
} else {
  console.log('Vendor data file not found at: ' + vendorDataPath);
  console.log('This is normal if you haven\'t created it yet.');
}
