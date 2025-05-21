/**
 * Security View Loader
 * This script ensures all Security View fix scripts are loaded
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Security View Loader...');
  
  // Scripts to check for
  const scripts = [
    'js/views/security-view.js',
    'js/security-view-styles.js',
    'js/security-view-init-patch.js',
    'js/charts/security-charts.js'
  ];
  
  // Check if each script is loaded, if not, load it
  scripts.forEach(scriptSrc => {
    if (!isScriptLoaded(scriptSrc)) {
      console.log(`Loading script: ${scriptSrc}`);
      loadScript(scriptSrc);
    } else {
      console.log(`Script already loaded: ${scriptSrc}`);
    }
  });
  
  // Function to check if a script is already loaded
  function isScriptLoaded(src) {
    return Array.from(document.scripts).some(script => script.src.includes(src));
  }
  
  // Function to load a script
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = function() {
      console.log(`Script loaded successfully: ${src}`);
    };
    
    script.onerror = function() {
      console.error(`Error loading script: ${src}`);
    };
  }
});
