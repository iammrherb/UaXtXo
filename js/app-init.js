/**
 * Application Initialization
 * Loads all components in correct order
 */

console.log('🚀 Initializing Portnox Total Cost Analyzer...');

// Load order is important
const scripts = [
  // Data models
  'js/models/vendor-data-comprehensive.js',
  'js/models/industry-compliance-data.js',
  
  // Components
  'js/components/risk-threat-modeling.js',
  'js/components/nistCsfVisualization.js',
  'js/components/vendorComparison.js',
  
  // Views
  'js/views/executive-dashboard-enhanced.js',
  
  // Fixes and integration
  'js/integration/executive-integration-fixed.js'
];

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load: ${src}`);
  document.head.appendChild(script);
}

function loadScriptsSequentially(scripts, index = 0) {
  if (index >= scripts.length) {
    console.log('✅ All scripts loaded successfully');
    initializeApplication();
    return;
  }
  
  console.log(`Loading: ${scripts[index]}`);
  loadScript(scripts[index], () => {
    loadScriptsSequentially(scripts, index + 1);
  });
}

function initializeApplication() {
  console.log('🎯 Initializing application components...');
  
  // Initialize executive dashboard
  if (window.executiveDashboard) {
    window.executiveDashboard.init();
  }
  
  // Initialize other components as needed
  console.log('✅ Application initialized successfully');
}

// Start loading
document.addEventListener('DOMContentLoaded', () => {
  loadScriptsSequentially(scripts);
});
