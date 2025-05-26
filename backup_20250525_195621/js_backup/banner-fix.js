/**
 * Banner Position Fix for Portnox Total Cost Analyzer
 * Ensures the banner is properly positioned
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing banner position fix...');
  
  // Check if banner is at the bottom and fix it
  fixBannerPosition();
  
  // Force re-positioning after a delay to ensure all content is loaded
  setTimeout(fixBannerPosition, 1000);
});

function fixBannerPosition() {
  // Find misplaced banner elements
  const misplacedBanner = document.querySelector('.main-content > .portnox-banner, .content-area > .portnox-banner, .footer-content > .portnox-banner, body > .portnox-banner');
  
  if (misplacedBanner) {
    console.log('Found misplaced banner, fixing position...');
    
    // Remove the misplaced banner
    misplacedBanner.parentNode.removeChild(misplacedBanner);
    
    // Create a new properly positioned banner
    createProperBanner();
  } else {
    // If banner doesn't exist at all, create it
    const existingBanner = document.querySelector('.app-header .banner-content');
    
    if (!existingBanner) {
      console.log('No banner found, creating new one...');
      createProperBanner();
    }
  }
}

function createProperBanner() {
  // Find the header where we'll add the banner
  const header = document.querySelector('.app-header');
  if (!header) {
    console.warn('Could not find header to add banner');
    return;
  }
  
  // Clear existing header content
  const headerContent = header.querySelector('.header-content');
  if (headerContent) {
    // Keep header content and enhance it
    headerContent.innerHTML = `
      <div class="logo-section">
        <img src="assets/images/portnox-logo.png" alt="Portnox" class="company-logo" onerror="this.src='https://www.portnox.com/wp-content/themes/portnox/assets/images/portnox-logo.svg'; this.onerror=null;">
        <div class="app-title">
          <h1>Zero Trust Total Cost Analyzer</h1>
          <div class="subtitle">Multi-Vendor NAC Solution Comparison Platform</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" id="dark-mode-toggle">
          <i class="fas fa-moon"></i>
        </button>
        <button class="btn btn-outline" id="export-btn">
          <i class="fas fa-file-export"></i>
          <span>Export</span>
        </button>
        <button class="btn btn-outline" id="help-btn">
          <i class="fas fa-question-circle"></i>
        </button>
      </div>
    `;
  } else {
    // Create new header content
    const newHeaderContent = document.createElement('div');
    newHeaderContent.className = 'header-content';
    newHeaderContent.innerHTML = `
      <div class="logo-section">
        <img src="assets/images/portnox-logo.png" alt="Portnox" class="company-logo" onerror="this.src='https://www.portnox.com/wp-content/themes/portnox/assets/images/portnox-logo.svg'; this.onerror=null;">
        <div class="app-title">
          <h1>Zero Trust Total Cost Analyzer</h1>
          <div class="subtitle">Multi-Vendor NAC Solution Comparison Platform</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" id="dark-mode-toggle">
          <i class="fas fa-moon"></i>
        </button>
        <button class="btn btn-outline" id="export-btn">
          <i class="fas fa-file-export"></i>
          <span>Export</span>
        </button>
        <button class="btn btn-outline" id="help-btn">
          <i class="fas fa-question-circle"></i>
        </button>
      </div>
    `;
    header.appendChild(newHeaderContent);
  }
  
  // Add event listeners for header buttons
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: isDarkMode ? 'dark' : 'light' }
      }));
    });
  }
}
