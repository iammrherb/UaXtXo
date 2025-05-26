/**
 * Style Loader for Portnox Total Cost Analyzer
 * Dynamically loads CSS files and applies theme
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load CSS files dynamically
  loadStylesheet('css/enhanced-layout.css');
  loadStylesheet('css/components.css');
  
  // Apply saved theme
  applyTheme();
  
  // Setup font awesome if needed
  setupFontAwesome();
});

/**
 * Load a stylesheet dynamically
 */
function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) {
    return; // Already loaded
  }
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  document.head.appendChild(link);
}

/**
 * Apply saved theme
 */
function applyTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    
    // Update dark mode toggle button if it exists
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
}

/**
 * Setup Font Awesome if not already loaded
 */
function setupFontAwesome() {
  if (!document.querySelector('link[href*="font-awesome"], script[src*="font-awesome"]')) {
    // Try to load from CDN
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    
    document.head.appendChild(link);
  }
}
