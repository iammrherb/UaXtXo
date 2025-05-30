/**
 * Critical Fixes Auto-Include for Portnox Total Cost Analyzer
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Auto-including critical fixes...');
  
  // CSS fixes to include
  const cssFixes = [
    'css/header-scroll-fix.css'
  ];
  
  // JS fixes to include
  const jsFixes = [
    'js/sidebar-manager-patch.js',
    'js/models/vendors-data-fix.js',
    'js/models/calculator-error-fix.js',
    'js/views/view-tabs-fix.js'
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
  
  console.log('All critical fixes included');
});
