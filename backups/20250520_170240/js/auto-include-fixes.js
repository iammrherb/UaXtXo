/**
 * Auto-include fixes for Portnox Total Cost Analyzer
 * Automatically loads and initializes all fix scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Auto-including fix scripts...');
  
  // CSS fixes to include
  const cssFixes = [
    'css/layout-advanced-fixes.css'
  ];
  
  // JS fixes to include
  const jsFixes = [
    'js/components/collapsible-fix.js',
    'js/views/views-fix.js',
    'js/components/vendor-display-fix.js'
  ];
  
  // Load CSS fixes
  cssFixes.forEach(cssFile => {
    if (!document.querySelector(`link[href="${cssFile}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssFile;
      document.head.appendChild(link);
      console.log(`Loaded CSS fix: ${cssFile}`);
    }
  });
  
  // Load JS fixes
  jsFixes.forEach(jsFile => {
    if (!document.querySelector(`script[src="${jsFile}"]`)) {
      const script = document.createElement('script');
      script.src = jsFile;
      document.body.appendChild(script);
      console.log(`Loaded JS fix: ${jsFile}`);
    }
  });
  
  console.log('All fix scripts included');
});
