/**
 * Zero Trust NAC Architecture Designer Pro
 * Consolidated Bootstrap Initialization
 * 
 * This script properly initializes all Bootstrap components
 * and applies fixes for known issues.
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Bootstrap components with fixes...');
  
  // Initialize Tooltips with error handling
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        boundary: document.body // Fix for tooltip positioning issues
      });
    });
  } catch (error) {
    console.warn('Error initializing tooltips:', error);
  }
  
  // Initialize Popovers with error handling
  try {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl, {
        container: 'body', // Fix for popover positioning issues
        html: true,
        sanitize: false // Allow HTML in popovers
      });
    });
  } catch (error) {
    console.warn('Error initializing popovers:', error);
  }
  
  // Initialize Dropdowns with error handling
  try {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  } catch (error) {
    console.warn('Error initializing dropdowns:', error);
  }
  
  // Fix for modal dialog issues
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetSelector = this.getAttribute('data-bs-target') || this.getAttribute('href');
      if (!targetSelector) return;
      
      const targetModal = document.querySelector(targetSelector);
      if (!targetModal) return;
      
      try {
        const modal = new bootstrap.Modal(targetModal);
        modal.show();
      } catch (error) {
        console.warn('Error showing modal, using fallback:', error);
        
        // Fallback: show modal with vanilla JS
        targetModal.style.display = 'block';
        targetModal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        
        // Find close buttons
        targetModal.querySelectorAll('[data-bs-dismiss="modal"]').forEach(closeBtn => {
          closeBtn.addEventListener('click', function() {
            // Hide modal
            targetModal.style.display = 'none';
            targetModal.classList.remove('show');
            document.body.classList.remove('modal-open');
            
            // Remove backdrop
            document.body.removeChild(backdrop);
          });
        });
      }
    });
  });
  
  console.log('Bootstrap components initialized successfully');
});
