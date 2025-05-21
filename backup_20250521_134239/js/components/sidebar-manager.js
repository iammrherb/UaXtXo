/**
 * Enhanced Sidebar Manager for Portnox Total Cost Analyzer
 * Manages sidebar behavior but keeps all cards expanded
 */

class SidebarManager {
  constructor() {
    this.sidebar = null;
    this.sidebarToggle = null;
    this.contentArea = null;
    this.initialized = false;
  }

  /**
   * Initialize the sidebar manager
   */
  init() {
    console.log('Initializing Enhanced Sidebar Manager...');
    
    // Find sidebar elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarToggle = document.getElementById('sidebar-toggle');
    this.contentArea = document.querySelector('.content-area');
    
    if (!this.sidebar || !this.sidebarToggle || !this.contentArea) {
      console.error('Sidebar elements not found');
      return false;
    }
    
    // Set up sidebar toggle
    this.setupSidebarToggle();
    
    // Keep all config cards expanded
    this.expandAllConfigCards();
    
    this.initialized = true;
    return true;
  }
  
  /**
   * Set up the sidebar toggle button
   */
  setupSidebarToggle() {
    this.sidebarToggle.addEventListener('click', () => {
      this.sidebar.classList.toggle('collapsed');
      this.sidebarToggle.classList.toggle('collapsed');
      this.contentArea.classList.toggle('expanded');
    });
  }
  
  /**
   * Expand all configuration cards and disable toggle
   */
  expandAllConfigCards() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = card.querySelector('.toggle-icon');
      
      if (content) {
        // Make sure content is visible
        content.style.display = 'block';
        content.style.maxHeight = '100%';
        content.style.overflow = 'visible';
        content.style.opacity = '1';
      }
      
      if (toggleIcon) {
        // Hide or remove toggle icon
        toggleIcon.style.display = 'none';
      }
      
      if (header) {
        // Remove any click events from the header
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
      }
    });
  }
}

// Create global instance
window.sidebarManager = new SidebarManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.sidebarManager.init();
});

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SidebarManager };
}
