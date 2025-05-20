/**
 * Enhanced Sidebar Manager for Portnox Total Cost Analyzer
 * Handles sidebar interactions, vendor selection, and configuration
 */

class SidebarManager {
  constructor() {
    this.maxVendors = 3; // Maximum number of vendors to compare
    this.selectedVendors = ['portnox']; // Portnox is always selected
    this.expanded = {}; // Track expanded/collapsed sections
    this.initialized = false;
    this.isDraggingSlider = false; // Track slider drag state
    
    // Initialize on DOM loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  /**
   * Initialize sidebar components
   */
  init() {
    if (this.initialized) return;
    
    // Initialize collapsible sections
    this.initCollapsibleSections();
    
    // Initialize vendor selection
    this.initVendorSelection();
    
    // Initialize range sliders
    this.initRangeSliders();
    
    // Initialize sidebar toggle
    this.initSidebarToggle();
    
    // Initialize enhanced features
    this.initEnhancedFeatures();
    
    this.initialized = true;
    console.log('Enhanced Sidebar manager initialized');
  }
  
  /**
   * Initialize collapsible sections
   */
  initCollapsibleSections() {
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      const toggleIcon = header.querySelector('.toggle-icon');
      const cardId = card.id;
      
      // Set initial state (all expanded by default except cost-config)
      if (cardId === 'cost-config') {
        content.classList.add('collapsed');
        toggleIcon.classList.add('collapsed');
        this.expanded[cardId] = false;
      } else {
        this.expanded[cardId] = true;
      }
      
      header.addEventListener('click', () => {
        this.toggleSection(cardId);
      });
    });
  }
  
  /**
   * Toggle section expand/collapse with animation
   */
  toggleSection(cardId) {
    const card = document.getElementById(cardId);
    const content = card.querySelector('.config-card-content');
    const toggleIcon = card.querySelector('.toggle-icon');
    
    if (this.expanded[cardId]) {
      // Collapse
      content.style.maxHeight = content.scrollHeight + 'px';
      setTimeout(() => {
        content.style.maxHeight = '0px';
        content.classList.add('collapsed');
      }, 10);
      
      // Animate icon
      toggleIcon.style.transform = 'rotate(0deg)';
      toggleIcon.classList.add('collapsed');
    } else {
      // Expand
      content.classList.remove('collapsed');
      content.style.maxHeight = '0px';
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
        
        // Reset maxHeight after animation completes
        setTimeout(() => {
          content.style.maxHeight = '';
        }, 300);
      }, 10);
      
      // Animate icon
      toggleIcon.style.transform = 'rotate(180deg)';
      toggleIcon.classList.remove('collapsed');
    }
    
    this.expanded[cardId] = !this.expanded[cardId];
  }
  
  /**
   * Initialize vendor selection with enhanced effects
   */
  initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-select-card');
    const vendorCounter = document.getElementById('vendor-counter-value');
    
    vendorCards.forEach(card => {
      const vendorId = card.dataset.vendor;
      
      // Portnox is always selected and can't be deselected
      if (vendorId === 'portnox') {
        card.classList.add('selected');
        card.classList.add('locked');
      }
      
      // Add click handler with better visual feedback
      card.addEventListener('click', (e) => {
        // Add ripple effect on click
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        
        card.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
        
        // Toggle selection
        this.toggleVendorSelection(vendorId, card);
      });
      
      // Add hover animation
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected') && vendorId !== 'portnox') {
          card.style.transform = 'translateY(-5px)';
          
          // Highlight all logos
          const logo = card.querySelector('.vendor-logo img');
          if (logo) {
            logo.style.filter = 'grayscale(0)';
          }
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected') && vendorId !== 'portnox') {
          card.style.transform = '';
          
          // Reset logo filter if not selected
          const logo = card.querySelector('.vendor-logo img');
          if (logo && !card.classList.contains('selected')) {
            logo.style.filter = '';
          }
        }
      });
    });
    
    // Update initial counter
    if (vendorCounter) {
      vendorCounter.textContent = this.selectedVendors.length;
    }
  }
  
  /**
   * Toggle vendor selection with enhanced animations
   */
  toggleVendorSelection(vendorId, card) {
    // Portnox can't be deselected
    if (vendorId === 'portnox') return;
    
    const index = this.selectedVendors.indexOf(vendorId);
    const vendorCounter = document.getElementById('vendor-counter-value');
    
    if (index === -1) {
      // Add vendor if under max limit
      if (this.selectedVendors.length < this.maxVendors) {
        this.selectedVendors.push(vendorId);
        
        // Animate selection
        card.classList.add('selecting');
        setTimeout(() => {
          card.classList.remove('selecting');
          card.classList.add('selected');
        }, 300);
        
        // Enhance logo
        const logo = card.querySelector('.vendor-logo img');
        if (logo) {
          logo.style.filter = 'grayscale(0)';
          logo.style.transform = 'scale(1.1)';
          setTimeout(() => {
            logo.style.transform = '';
          }, 300);
        }
        
        // Play selection animation
        card.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.05)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
      } else {
        // Show max vendors reached message
        this.showMaxVendorsMessage();
      }
    } else {
      // Remove vendor
      this.selectedVendors.splice(index, 1);
      
      // Animate deselection
      card.classList.add('deselecting');
      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.remove('deselecting');
      }, 300);
      
      // Reset logo
      const logo = card.querySelector('.vendor-logo img');
      if (logo) {
        logo.style.filter = '';
      }
    }
    
    // Update counter with animation
    if (vendorCounter) {
      vendorCounter.classList.add('updating');
      setTimeout(() => {
        vendorCounter.textContent = this.selectedVendors.length;
        vendorCounter.classList.remove('updating');
      }, 150);
    }
    
    // Trigger event for other components
    this.triggerVendorSelectionEvent();
    
    console.log('Selected vendors:', this.selectedVendors);
  }
  
  /**
   * Show max vendors reached message with enhanced styling
   */
  showMaxVendorsMessage() {
    // Find or create toast container
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast toast-warning';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-exclamation-triangle';
    
    const text = document.createElement('span');
    text.innerHTML = `Maximum of <strong>${this.maxVendors} vendors</strong> can be compared at once.<br>Please deselect a vendor first.`;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after a delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 5000);
  }
  
  /**
   * Initialize range sliders with enhanced interaction
   */
  initRangeSliders() {
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    
    rangeSliders.forEach(slider => {
      // Setup initial value display
      const valueDisplay = document.getElementById(`${slider.id}-value`);
      if (valueDisplay) {
        this.updateRangeSliderValue(slider, valueDisplay);
      }
      
      // Setup background gradient based on initial value
      this.updateRangeSliderBackground(slider);
      
      // Add input event listener
      slider.addEventListener('input', () => {
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
        }
        this.updateRangeSliderBackground(slider);
      });
      
      // Add drag start/end tracking for animations
      slider.addEventListener('mousedown', () => {
        this.isDraggingSlider = true;
        document.body.classList.add('slider-dragging');
        if (valueDisplay) {
          valueDisplay.classList.add('active');
        }
      });
      
      // Listen for drag end
      document.addEventListener('mouseup', () => {
        if (this.isDraggingSlider) {
          this.isDraggingSlider = false;
          document.body.classList.remove('slider-dragging');
          if (valueDisplay) {
            valueDisplay.classList.remove('active');
            
            // Pulse animation when value changes
            valueDisplay.classList.add('pulse');
            setTimeout(() => {
              valueDisplay.classList.remove('pulse');
            }, 300);
          }
        }
      });
      
      // Touch events for mobile
      slider.addEventListener('touchstart', () => {
        this.isDraggingSlider = true;
        document.body.classList.add('slider-dragging');
        if (valueDisplay) {
          valueDisplay.classList.add('active');
        }
      });
      
      document.addEventListener('touchend', () => {
        if (this.isDraggingSlider) {
          this.isDraggingSlider = false;
          document.body.classList.remove('slider-dragging');
          if (valueDisplay) {
            valueDisplay.classList.remove('active');
            valueDisplay.classList.add('pulse');
            setTimeout(() => {
              valueDisplay.classList.remove('pulse');
            }, 300);
          }
        }
      });
      
      // Add double-click to reset to default
      slider.addEventListener('dblclick', () => {
        slider.value = slider.getAttribute('data-default') || slider.value;
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
        }
        this.updateRangeSliderBackground(slider);
        
        // Animate the value display
        if (valueDisplay) {
          valueDisplay.classList.add('reset');
          setTimeout(() => {
            valueDisplay.classList.remove('reset');
          }, 300);
        }
      });
      
      // Store default value
      slider.setAttribute('data-default', slider.value);
    });
  }
  
  /**
   * Update range slider value display with formatting
   */
  updateRangeSliderValue(slider, valueDisplay) {
    const value = slider.value;
    
    // Format value based on id
    if (slider.id.includes('cost') || slider.id.includes('fte-cost')) {
      valueDisplay.textContent = `${parseInt(value).toLocaleString()}`;
    } else if (slider.id.includes('discount') || slider.id.includes('percentage') || slider.id.includes('reduction')) {
      valueDisplay.textContent = `${value}%`;
    } else {
      valueDisplay.textContent = value;
    }
  }
  
  /**
   * Update range slider background gradient
   */
  updateRangeSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    // Enhanced gradient with better visual feedback
    slider.style.background = `linear-gradient(to right, 
      var(--primary-color) 0%, 
      var(--primary-color) ${percentage}%, 
      var(--border-color) ${percentage}%, 
      var(--border-color) 100%)`;
  }
  
  /**
   * Initialize sidebar toggle with enhanced animations
   */
  initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebarToggle && sidebar && contentArea) {
      sidebarToggle.addEventListener('click', () => {
        this.toggleSidebar();
      });
      
      // For mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          const backdrop = document.querySelector('.sidebar-backdrop');
          
          if (backdrop && e.target === backdrop) {
            this.toggleSidebar();
          }
        }
      });
    }
  }
  
  /**
   * Toggle sidebar visibility with smooth animations
   */
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const contentArea = document.querySelector('.content-area');
    
    if (sidebar && sidebarToggle && contentArea) {
      // For desktop
      if (window.innerWidth > 768) {
        sidebar.classList.toggle('collapsed');
        sidebarToggle.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
        
        // Animate the toggle icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.add('rotating');
          setTimeout(() => {
            icon.classList.remove('rotating');
          }, 300);
        }
      } 
      // For mobile
      else {
        let backdrop = document.querySelector('.sidebar-backdrop');
        
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.className = 'sidebar-backdrop';
          document.body.appendChild(backdrop);
        }
        
        sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
        
        // Add slide animation for mobile
        if (sidebar.classList.contains('active')) {
          sidebar.style.transform = 'translateX(0)';
        } else {
          sidebar.style.transform = 'translateX(-100%)';
        }
      }
    }
  }
  
  /**
   * Initialize enhanced features for better UX
   */
  initEnhancedFeatures() {
    // Add tooltips to form elements
    this.addFormTooltips();
    
    // Add option to reset all inputs
    this.addResetOption();
    
    // Add keyboard navigation
    this.addKeyboardNavigation();
    
    // Add smooth scrolling within sidebar
    this.addSmoothScrolling();
  }
  
  /**
   * Add tooltips to form elements
   */
  addFormTooltips() {
    const formLabels = document.querySelectorAll('.form-label');
    
    formLabels.forEach(label => {
      const infoIcon = document.createElement('i');
      infoIcon.className = 'fas fa-info-circle tooltip-trigger';
      infoIcon.style.marginLeft = '5px';
      infoIcon.style.color = 'var(--text-light)';
      infoIcon.style.fontSize = '12px';
      infoIcon.style.cursor = 'help';
      
      // Get tooltip text from data attribute or create default
      const tooltipText = label.getAttribute('data-tooltip') || `Information about ${label.textContent}`;
      infoIcon.setAttribute('data-tooltip', tooltipText);
      
      label.appendChild(infoIcon);
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.position = 'absolute';
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      tooltip.style.backgroundColor = 'var(--card-background)';
      tooltip.style.color = 'var(--text-color)';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '6px';
      tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
      tooltip.style.fontSize = '12px';
      tooltip.style.maxWidth = '250px';
      tooltip.style.zIndex = '1000';
      tooltip.style.transition = 'opacity 0.2s, visibility 0.2s';
      
      document.body.appendChild(tooltip);
      
      // Show tooltip on hover
      infoIcon.addEventListener('mouseenter', (e) => {
        const rect = infoIcon.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + 10}px`;
        tooltip.style.left = `${rect.left - 125 + rect.width / 2}px`;
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      });
      
      infoIcon.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      });
    });
  }
  
  /**
   * Add reset option to sidebar
   */
  addResetOption() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-outline reset-config-btn';
    resetButton.innerHTML = '<i class="fas fa-undo"></i> Reset All Settings';
    resetButton.style.marginTop = '15px';
    resetButton.style.width = '100%';
    resetButton.style.padding = '8px';
    
    const sidebarFooter = sidebar.querySelector('.sidebar-footer');
    if (sidebarFooter) {
      sidebarFooter.insertBefore(resetButton, sidebarFooter.firstChild);
      
      // Add click handler
      resetButton.addEventListener('click', () => {
        this.resetAllSettings();
      });
    }
  }
  
  /**
   * Reset all form controls to defaults
   */
  resetAllSettings() {
    // Reset range sliders
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    rangeSliders.forEach(slider => {
      const defaultValue = slider.getAttribute('data-default');
      if (defaultValue) {
        slider.value = defaultValue;
        
        // Update display and background
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) {
          this.updateRangeSliderValue(slider, valueDisplay);
          valueDisplay.classList.add('reset');
          setTimeout(() => {
            valueDisplay.classList.remove('reset');
          }, 300);
        }
        
        this.updateRangeSliderBackground(slider);
      }
    });
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      const defaultChecked = checkbox.getAttribute('data-default') === 'true';
      checkbox.checked = defaultChecked;
    });
    
    // Reset select boxes
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      const defaultValue = select.getAttribute('data-default');
      if (defaultValue) {
        select.value = defaultValue;
      }
    });
    
    // Reset input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
      const defaultValue = input.getAttribute('data-default');
      if (defaultValue) {
        input.value = defaultValue;
      }
    });
    
    // Show confirmation message
    this.showToast('All settings have been reset to defaults', 'info');
  }
  
  /**
   * Add keyboard navigation for better accessibility
   */
  addKeyboardNavigation() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Add tabindex to all interactive elements
    const interactiveElements = sidebar.querySelectorAll('button, input, select, .vendor-select-card');
    interactiveElements.forEach((element, index) => {
      element.setAttribute('tabindex', index + 1);
    });
    
    // Add keyboard handler for vendor cards
    const vendorCards = sidebar.querySelectorAll('.vendor-select-card');
    vendorCards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  
  /**
   * Add smooth scrolling within sidebar
   */
  addSmoothScrolling() {
    const sidebarContent = document.querySelector('.sidebar-content');
    if (!sidebarContent) return;
    
    // Improve scroll behavior
    sidebarContent.style.scrollBehavior = 'smooth';
    
    // Add scroll to section functionality
    const headers = sidebarContent.querySelectorAll('.config-card-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        // Scroll section into view when opening
        const card = header.closest('.config-card');
        const cardId = card.id;
        
        // Only scroll if expanding
        if (!this.expanded[cardId]) {
          setTimeout(() => {
            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    });
  }
  
  /**
   * Display a toast message
   */
  showToast(message, type = 'info') {
    // Find or create toast container
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast
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
    
    const text = document.createElement('span');
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    toastContainer.appendChild(toast);
    
    // Show the toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove the toast after a delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 5000);
  }
  
  /**
   * Trigger vendor selection event
   */
  triggerVendorSelectionEvent() {
    const event = new CustomEvent('vendorSelectionChanged', {
      detail: {
        selectedVendors: this.selectedVendors
      }
    });
    
    document.dispatchEvent(event);
  }
  
  /**
   * Get selected vendors
   */
  getSelectedVendors() {
    return [...this.selectedVendors];
  }
  
  /**
   * Select vendor programmatically
   */
  selectVendor(vendorId) {
    if (vendorId === 'portnox' || this.selectedVendors.includes(vendorId)) {
      return;
    }
    
    const card = document.querySelector(`.vendor-select-card[data-vendor="${vendorId}"]`);
    
    if (card && this.selectedVendors.length < this.maxVendors) {
      this.selectedVendors.push(vendorId);
      card.classList.add('selected');
      
      // Update counter
      const vendorCounter = document.getElementById('vendor-counter-value');
      if (vendorCounter) {
        vendorCounter.textContent = this.selectedVendors.length;
      }
      
      // Trigger event
      this.triggerVendorSelectionEvent();
    }
  }
  
  /**
   * Deselect vendor programmatically
   */
  deselectVendor(vendorId) {
    if (vendorId === 'portnox') {
      return;
    }
    
    const index = this.selectedVendors.indexOf(vendorId);
    
    if (index !== -1) {
      this.selectedVendors.splice(index, 1);
      
      const card = document.querySelector(`.vendor-select-card[data-vendor="${vendorId}"]`);
      if (card) {
        card.classList.remove('selected');
      }
      
      // Update counter
      const vendorCounter = document.getElementById('vendor-counter-value');
      if (vendorCounter) {
        vendorCounter.textContent = this.selectedVendors.length;
      }
      
      // Trigger event
      this.triggerVendorSelectionEvent();
    }
  }
}

// Create instance and export
window.sidebarManager = new SidebarManager();
