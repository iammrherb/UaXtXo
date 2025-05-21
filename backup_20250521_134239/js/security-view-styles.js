/**
 * Security View Style Loader
 * This script ensures the Security View CSS is included in the page
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Checking for Security View CSS...');
  
  // Check if Security View CSS is already included
  const hasSecurityViewCSS = Array.from(document.styleSheets).some(sheet => {
    try {
      return sheet.href && sheet.href.includes('security-view.css');
    } catch (e) {
      return false;
    }
  });
  
  if (!hasSecurityViewCSS) {
    console.log('Adding Security View CSS to the page');
    
    // Create the link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/components/security-view.css';
    link.type = 'text/css';
    
    // Add it to the head
    document.head.appendChild(link);
  } else {
    console.log('Security View CSS already included');
  }
});
