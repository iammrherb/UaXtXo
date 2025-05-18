/**
 * Main Integration Script for Portnox TCO Analyzer
 * Integrates all fixes and enhancements into a cohesive solution
 */
(function() {
  // Initialization function to be called on DOM ready
  window.initPortnoxTcoAnalyzer = function() {
    console.log("Initializing Portnox TCO Analyzer...");
    
    // Reset any existing state
    window.destroyAllCharts && window.destroyAllCharts();
    
    // Get currently selected vendors
    const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
      .map(card => card.getAttribute('data-vendor'))
      .filter(Boolean);
    
    // Ensure at least Portnox is selected
    if (selectedVendors.length === 0) {
      const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
      if (portnoxCard) {
        portnoxCard.classList.add('selected');
        selectedVendors.push('portnox');
      }
    }
    
    // Run initial calculations
    window.updateCalculations && window.updateCalculations(selectedVendors);
    
    // Initialize tab switching
    initTabSwitching();
    
    // Initialize stakeholder view switching
    initViewSwitching();
    
    // Initialize sidebar toggling
    initSidebarToggle();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize help modal
    initHelpModal();
    
    // Initialize tooltips
    initTooltips();
    
    console.log("Portnox TCO Analyzer initialized successfully");
  };
  
  // Initialize tab switching
  function initTabSwitching() {
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Get the parent view panel
        const viewPanel = this.closest('.view-panel');
        if (!viewPanel) return;
        
        // Get target panel id
        const targetPanelId = this.getAttribute('data-panel');
        if (!targetPanelId) return;
        
        // Remove active class from all tabs in this view
        viewPanel.querySelectorAll('.results-tab').forEach(t => {
          t.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all panels in this view
        viewPanel.querySelectorAll('.results-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        // Show target panel
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // Trigger chart initialization for newly visible panel
          if (window.initializeChartsInPanel) {
            window.initializeChartsInPanel(targetPanelId);
          }
        }
      });
    });
  }
  
  // Initialize stakeholder view switching
  function initViewSwitching() {
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    stakeholderTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Get target view
        const targetView = this.getAttribute('data-view');
        if (!targetView) return;
        
        // Remove active class from all tabs
        document.querySelectorAll('.stakeholder-tab').forEach(t => {
          t.classList.remove('active');
        });
        
        // Add active class to clicked tab
        document.querySelectorAll('.stakeholder-tab[data-view="' + targetView + '"]').forEach(t => {
          t.classList.add('active');
        });
        
        // Hide all view panels
        document.querySelectorAll('.view-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        // Show target view panel
        const targetPanel = document.querySelector('.view-panel[data-view="' + targetView + '"]');
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // Find the active results panel within this view
          const activeResultsPanel = targetPanel.querySelector('.results-panel.active');
          if (activeResultsPanel) {
            // Trigger chart initialization for the active panel
            if (window.initializeChartsInPanel) {
              window.initializeChartsInPanel(activeResultsPanel.id);
            }
          }
        }
      });
    });
  }
  
  // Initialize sidebar toggle
  function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    
    if (sidebarToggle && sidebar && contentArea) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
        
        // Update toggle icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
          } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
          }
        }
      });
    }
  }
  
  // Initialize dark mode toggle
  function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update toggle icon
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
          if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
          } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
          }
        }
      });
    }
  }
  
  // Initialize help modal
  function initHelpModal() {
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const modalClose = helpModal ? helpModal.querySelector('.modal-close') : null;
    
    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', function() {
        helpModal.style.display = 'flex';
      });
      
      if (modalClose) {
        modalClose.addEventListener('click', function() {
          helpModal.style.display = 'none';
        });
      }
      
      // Close modal when clicking outside
      window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
          helpModal.style.display = 'none';
        }
      });
    }
  }
  
  // Initialize tooltips
  function initTooltips() {
    // Add tooltip functionality to elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      const tooltipText = element.getAttribute('data-tooltip');
      if (!tooltipText) return;
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      
      // Add tooltip to element
      element.appendChild(tooltip);
      
      // Show tooltip on hover
      element.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
      });
      
      // Hide tooltip on mouse leave
      element.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });
    });
  }
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    window.initPortnoxTcoAnalyzer();
    
    // Attach event handlers to config cards
    const configCardHeaders = document.querySelectorAll('.config-card-header');
    configCardHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const card = this.closest('.config-card');
        if (card) {
          card.classList.toggle('collapsed');
          
          // Update toggle icon
          const icon = this.querySelector('i.fas');
          if (icon) {
            if (card.classList.contains('collapsed')) {
              icon.classList.remove('fa-chevron-up');
              icon.classList.add('fa-chevron-down');
            } else {
              icon.classList.remove('fa-chevron-down');
              icon.classList.add('fa-chevron-up');
            }
          }
        }
      });
    });
    
    // Add organization size change handler
    const organizationSizeSelect = document.getElementById('organization-size');
    const deviceCountInput = document.getElementById('device-count');
    
    if (organizationSizeSelect && deviceCountInput) {
      organizationSizeSelect.addEventListener('change', function() {
        const size = this.value;
        let defaultDeviceCount = 500;
        
        switch (size) {
          case 'very-small':
            defaultDeviceCount = 250;
            break;
          case 'small':
            defaultDeviceCount = 500;
            break;
          case 'medium':
            defaultDeviceCount = 3000;
            break;
          case 'large':
            defaultDeviceCount = 7500;
            break;
          case 'enterprise':
            defaultDeviceCount = 15000;
            break;
        }
        
        deviceCountInput.value = defaultDeviceCount;
        
        // Trigger calculations update
        const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
          .map(card => card.getAttribute('data-vendor'))
          .filter(Boolean);
        
        window.updateCalculations && window.updateCalculations(selectedVendors);
      });
    }
  });
})();
