/**
 * Main Application Initialization for Portnox Total Cost Analyzer
 * Modified to integrate with existing code and avoid conflicts
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer additional components...');
  
  // Check if main app is already initialized
  if (!window.appInitCalled) {
    window.appInitCalled = true;
    
    // Initialize sidebar if not already done
    initializeSidebar();
    
    // Initialize UI enhancements
    initializeUI();
    
    // Initialize event listeners that don't conflict
    initializeAdditionalEvents();
    
    console.log('Additional components initialized successfully');
  }
});

/**
 * Initialize sidebar with proper vendor cards
 */
function initializeSidebar() {
  // Fix vendor logos immediately
  fixVendorLogos();
  
  // Create sidebar manager if not already initialized
  if (!window.sidebarManager) {
    window.sidebarManager = new SidebarManager();
  } else if (!window.sidebarManager.initialized) {
    window.sidebarManager.init();
  }
}

/**
 * Fix vendor logos immediately
 */
function fixVendorLogos() {
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  vendorCards.forEach(card => {
    const logoImg = card.querySelector('.vendor-logo img');
    if (logoImg) {
      // Apply important styling to override any inline styles
      logoImg.style.cssText = 'max-height: 28px !important; max-width: 80px !important; object-fit: contain !important;';
    }
    
    // Fix card height
    card.style.cssText = 'height: 80px !important; padding: 8px 4px !important;';
    
    // Fix vendor name
    const nameElement = card.querySelector('.vendor-name');
    if (nameElement) {
      nameElement.style.cssText = 'font-size: 11px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 95% !important; text-align: center !important;';
    }
  });
}

/**
 * Initialize UI enhancements
 */
function initializeUI() {
  // Add fade-in animation to dashboard cards
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
    if (!card.classList.contains('animate-fadeIn')) {
      card.classList.add('animate-fadeIn');
    }
  });
  
  // Add fade-in animation to chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach((container, index) => {
    container.style.animationDelay = `${300 + (index * 100)}ms`;
    if (!container.classList.contains('animate-fadeIn')) {
      container.classList.add('animate-fadeIn');
    }
  });
  
  // Enhance tabs with hover effects
  const tabs = document.querySelectorAll('.main-tab, .results-tab');
  tabs.forEach(tab => {
    // Only add event listener if not already added
    if (!tab.hasHoverEffect) {
      tab.hasHoverEffect = true;
      
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = 'rgba(26, 90, 150, 0.05)';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.backgroundColor = '';
        }
      });
    }
  });
}

/**
 * Initialize additional events that don't conflict
 */
function initializeAdditionalEvents() {
  // Handle dark mode toggle if not already handled
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle && !darkModeToggle.hasEventListener) {
    darkModeToggle.hasEventListener = true;
    
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Dispatch theme change event
      const isDarkMode = document.body.classList.contains('dark-mode');
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: isDarkMode ? 'dark' : 'light' }
      }));
    });
  }
}
