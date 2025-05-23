/**
 * UI Manager for Portnox Total Cost Analyzer
 * Handles UI interactions, animations, and state updates
 */

class UIManager {
  constructor(app) {
    this.app = app;
    this.initialized = false;
    
    // Animation settings
    this.animationSettings = {
      enabled: true,
      duration: 300,
      easing: 'ease-out'
    };
    
    // Toast settings
    this.toastSettings = {
      duration: 5000,
      position: 'top-right'
    };
  }
  
  /**
   * Initialize UI manager
   */
  init() {
    if (this.initialized) return this;
    
    // Initialize animations
    this.initAnimations();
    
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize vendor card interactions
    this.initVendorCards();
    
    // Initialize responsive behavior
    this.initResponsiveBehavior();
    
    this.initialized = true;
    return this;
  }
  
  /**
   * Initialize animations
   */
  initAnimations() {
    // Add entrance animations to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });
    
    // Add entrance animations to charts
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container, index) => {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        container.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 300 + (index * 150));
    });
  }
  
  /**
   * Initialize tooltips
   */
  initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      const tooltipText = element.getAttribute('data-tooltip');
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      
      // Add tooltip events
      element.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        tooltip.style.opacity = '1';
      });
      
      element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      });
    });
  }
  
  /**
   * Initialize vendor cards
   */
  initVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
      // Enhance hover effect
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected')) {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected')) {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
      });
      
      // Add selection animation
      card.addEventListener('click', () => {
        if (!card.classList.contains('selected') && card.dataset.vendor !== 'portnox') {
          card.style.transform = 'scale(1.05)';
          setTimeout(() => {
            card.style.transform = 'scale(1)';
          }, 200);
        }
      });
    });
  }
  
  /**
   * Initialize responsive behavior
   */
  initResponsiveBehavior() {
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Initial check
    this.handleResize();
    
    // Add swipe support for mobile
    this.initMobileSwipe();
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    const width = window.innerWidth;
    
    // Mobile layout (under 768px)
    if (width < 768) {
      document.body.classList.add('mobile-layout');
      
      // Collapse sidebar on mobile
      const sidebar = document.getElementById('sidebar');
      const toggle = document.getElementById('sidebar-toggle');
      const contentArea = document.querySelector('.content-area');
      
      if (sidebar && !sidebar.classList.contains('collapsed')) {
        sidebar.classList.add('collapsed');
        if (toggle) toggle.classList.add('collapsed');
        if (contentArea) contentArea.classList.add('expanded');
      }
    } else {
      document.body.classList.remove('mobile-layout');
    }
  }
  
  /**
   * Initialize mobile swipe support
   */
  initMobileSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleSwipeGesture = () => {
      const sidebar = document.getElementById('sidebar');
      
      if (!sidebar) return;
      
      // Right to left swipe (close sidebar)
      if (touchStartX - touchEndX > 50) {
        if (!sidebar.classList.contains('collapsed')) {
          this.app.toggleSidebar();
        }
      }
      
      // Left to right swipe (open sidebar)
      if (touchEndX - touchStartX > 50) {
        if (sidebar.classList.contains('collapsed')) {
          this.app.toggleSidebar();
        }
      }
    };
    
    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    });
  }
  
  /**
   * Show loading overlay with custom message
   */
  showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    
    const messageEl = overlay.querySelector('p');
    if (messageEl) {
      messageEl.textContent = message;
    }
    
    overlay.classList.add('active');
  }
  
  /**
   * Hide loading overlay
   */
  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    
    overlay.classList.remove('active');
  }
  
  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = document.createElement('i');
    switch (type) {
      case 'success':
        icon.className = 'fas fa-check-circle';
        break;
      case 'error':
        icon.className = 'fas fa-exclamation-circle';
        break;
      case 'warning':
        icon.className = 'fas fa-exclamation-triangle';
        break;
      default:
        icon.className = 'fas fa-info-circle';
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(textSpan);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after the configured duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, this.toastSettings.duration);
  }
  
  /**
   * Show confirmation dialog
   */
  showConfirmDialog(options) {
    return new Promise((resolve, reject) => {
      const defaults = {
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        confirmClass: 'btn-primary',
        cancelClass: 'btn-outline'
      };
      
      const settings = { ...defaults, ...options };
      
      // Create modal backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);
      
      // Create modal container
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modal-container';
      
      // Create modal content
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content confirm-dialog';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'modal-header';
      
      const title = document.createElement('h3');
      title.textContent = settings.title;
      header.appendChild(title);
      
      // Create body
      const body = document.createElement('div');
      body.className = 'modal-body';
      
      const message = document.createElement('p');
      message.textContent = settings.message;
      body.appendChild(message);
      
      // Create footer
      const footer = document.createElement('div');
      footer.className = 'modal-footer';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.className = `btn ${settings.cancelClass}`;
      cancelBtn.textContent = settings.cancelText;
      
      const confirmBtn = document.createElement('button');
      confirmBtn.className = `btn ${settings.confirmClass}`;
      confirmBtn.textContent = settings.confirmText;
      
      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      
      // Assemble modal
      modalContent.appendChild(header);
      modalContent.appendChild(body);
      modalContent.appendChild(footer);
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
      
      // Add entrance animation
      setTimeout(() => {
        backdrop.style.opacity = '1';
        modalContainer.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
      }, 10);
      
      // Add event listeners
      const closeModal = (result) => {
        backdrop.style.opacity = '0';
        modalContainer.style.opacity = '0';
        modalContent.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          document.body.removeChild(backdrop);
          document.body.removeChild(modalContainer);
          resolve(result);
        }, 300);
      };
      
      cancelBtn.addEventListener('click', () => closeModal(false));
      confirmBtn.addEventListener('click', () => closeModal(true));
      
      // Close on backdrop click
      backdrop.addEventListener('click', () => closeModal(false));
      
      // Prevent propagation from modal content
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }
  
  /**
   * Update UI based on calculation results
   */
  updateUIWithResults(results) {
    this.updateMetricDisplays(results);
    this.highlightTopPerformer(results);
    this.updateComparisonTables(results);
  }
  
  /**
   * Update metric displays
   */
  updateMetricDisplays(results) {
    // Update all metric values with animations
    const metricElements = document.querySelectorAll('.metric-value');
    
    metricElements.forEach(element => {
      // Store original value
      const originalValue = element.textContent;
      
      // Apply animation
      element.style.transform = 'scale(0.8)';
      element.style.opacity = '0.5';
      
      setTimeout(() => {
        element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
      }, 100);
    });
  }
  
  /**
   * Highlight top performer in comparisons
   */
  highlightTopPerformer(results) {
    // Find the vendor with the lowest TCO
    let lowestTcoVendor = null;
    let lowestTco = Infinity;
    
    for (const vendorId in results.vendors) {
      const tco = results.vendors[vendorId].totalTco;
      if (tco < lowestTco) {
        lowestTco = tco;
        lowestTcoVendor = vendorId;
      }
    }
    
    // Highlight the vendor in tables
    const tableRows = document.querySelectorAll('table.data-table tbody tr');
    tableRows.forEach(row => {
      if (row.dataset.vendor === lowestTcoVendor) {
        row.classList.add('highlight-row');
      } else {
        row.classList.remove('highlight-row');
      }
    });
  }
  
  /**
   * Update comparison tables
   */
  updateComparisonTables(results) {
    // Implementation for updating comparison tables
  }
  
  /**
   * Refresh UI components (for dark mode changes, etc.)
   */
  refreshUI() {
    // Refresh all chart colors if in dark mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Update chart backgrounds
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
      container.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#ffffff';
    });
    
    // Update any other UI elements that need refreshing
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
      card.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#ffffff';
      card.style.boxShadow = isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)';
    });
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UIManager };
}
