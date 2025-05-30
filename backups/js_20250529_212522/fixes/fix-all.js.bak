/**
 * Comprehensive Fix Loader for Portnox Total Cost Analyzer
 * Loads all fix scripts in the correct order
 */

console.log("Loading all fixes...");

// Load fixes in the correct order
const fixes = [
  'js/models/vendors-data-fix.js',
  'js/comprehensive-fix.js',
  'js/fixes/executive-view-fix.js',
  'js/fixes/security-view-fix.js'
];

function loadFix(index) {
  if (index >= fixes.length) {
    console.log("All fixes loaded successfully");
    return;
  }
  
  const script = document.createElement('script');
  script.src = fixes[index];
  script.onload = function() {
    console.log(`Loaded fix: ${fixes[index]}`);
    loadFix(index + 1);
  };
  script.onerror = function() {
    console.error(`Failed to load fix: ${fixes[index]}`);
    loadFix(index + 1);
  };
  document.head.appendChild(script);
}

// Start loading fixes
loadFix(0);
