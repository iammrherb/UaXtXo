/**
 * Utility Functions for Portnox TCO Analyzer
 */
(function() {
  // Format currency helper
  window.formatCurrency = function(value) {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  // Format percentage helper
  window.formatPercentage = function(value) {
    return new Intl.NumberFormat('en-US', { 
      style: 'percent',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 1 
    }).format(value / 100);
  };
  
  // Format number helper
  window.formatNumber = function(value) {
    return new Intl.NumberFormat('en-US').format(value);
  };
  
  // Get configuration parameters
  window.getConfigParameters = function() {
    return {
      // Organization parameters
      deviceCount: parseInt(document.getElementById('device-count')?.value) || 5000,
      organizationSize: document.getElementById('organization-size')?.value || 'medium',
      locations: parseInt(document.getElementById('locations')?.value) || 2,
      yearsToProject: parseInt(document.getElementById('years-to-project')?.value) || 3,
      
      // Cost parameters
      portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price')?.value) || 3.0,
      portnoxDiscount: parseInt(document.getElementById('portnox-discount')?.value) || 15,
      fteCost: parseInt(document.getElementById('fte-cost')?.value) || 100000,
      fteAllocation: parseInt(document.getElementById('fte-allocation')?.value) || 25,
      maintenancePercentage: parseInt(document.getElementById('maintenance-percentage')?.value) || 18,
      downTimeCost: parseInt(document.getElementById('downtime-cost')?.value) || 5000,
      riskReduction: parseInt(document.getElementById('risk-reduction')?.value) || 35,
      insuranceReduction: parseInt(document.getElementById('insurance-reduction')?.value) || 10,
      
      // Network requirements
      cloudIntegration: document.getElementById('cloud-integration')?.checked || false,
      legacyDevices: document.getElementById('legacy-devices')?.checked || false,
      byodSupport: document.getElementById('byod-support')?.checked || false,
      iotSupport: document.getElementById('iot-support')?.checked || false,
      wirelessSupport: document.getElementById('wireless-support')?.checked || false,
      remoteWork: document.getElementById('remote-work')?.checked || false
    };
  };
  
  // Debounce function
  window.debounce = function(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  };
  
  // Check if element is in viewport
  window.isInViewport = function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Show toast message
  window.showToast = function(message, type = 'info', duration = 3000) {
    // Remove any existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = message;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };
  
  // Add toast CSS if not already present
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background-color: #333;
        color: #fff;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
      }
      
      .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
      }
      
      .toast-info {
        background-color: #3498db;
      }
      
      .toast-success {
        background-color: #41b883;
      }
      
      .toast-warning {
        background-color: #f39c12;
      }
      
      .toast-error {
        background-color: #e74c3c;
      }
    `;
    document.head.appendChild(style);
  }
})();
