/**
 * Main Application Initialization for Portnox Total Cost Analyzer
 * Ensures all components load properly and fixes UI issues
 */

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Portnox Total Cost Analyzer...');
  
  // Initialize sidebar first to ensure proper vendor card display
  initializeSidebar();
  
  // Initialize particles for visual effects
  initializeParticles();
  
  // Initialize UI enhancements
  initializeUI();
  
  // Initialize event listeners
  initializeEvents();
  
  console.log('Portnox Total Cost Analyzer initialized successfully');
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
 * Initialize particle effects
 */
function initializeParticles() {
  // Check if particles.js is loaded
  if (typeof particlesJS !== 'undefined') {
    // Create main background particles
    if (!window.particleBackground) {
      window.particleBackground = new ParticleBackground();
    }
    
    // Create header particles
    if (!window.headerParticles) {
      window.headerParticles = new HeaderParticles();
    }
  } else {
    console.warn('particles.js not loaded, visual effects will be limited');
  }
}

/**
 * Initialize UI enhancements
 */
function initializeUI() {
  // Add fade-in animation to dashboard cards
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
    card.classList.add('animate-fadeIn');
  });
  
  // Add fade-in animation to chart containers
  const chartContainers = document.querySelectorAll('.chart-container');
  chartContainers.forEach((container, index) => {
    container.style.animationDelay = `${300 + (index * 100)}ms`;
    container.classList.add('animate-fadeIn');
  });
  
  // Enhance tabs with hover effects
  const tabs = document.querySelectorAll('.main-tab, .results-tab');
  tabs.forEach(tab => {
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
  });
}

/**
 * Initialize event listeners
 */
function initializeEvents() {
  // Handle tab switching
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewName = tab.dataset.view;
      
      // Update active tab
      mainTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding view panel
      viewPanels.forEach(panel => {
        if (panel.dataset.view === viewName) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Trigger view changed event
      document.dispatchEvent(new CustomEvent('viewChanged', {
        detail: { view: viewName }
      }));
    });
  });
  
  // Handle results tab switching
  document.querySelectorAll('.results-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabGroup = tab.closest('.results-tabs');
      const panelName = tab.dataset.panel;
      
      // Update active tab in this group
      tabGroup.querySelectorAll('.results-tab').forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      
      // Show corresponding panel
      const panelContainer = tabGroup.parentElement;
      panelContainer.querySelectorAll('.results-panel').forEach(panel => {
        if (panel.id === panelName) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
  
  // Handle dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
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
