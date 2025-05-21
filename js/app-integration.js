/**
 * Application Integration for Portnox Total Cost Analyzer
 * Connects all enhanced components and initializes them
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Portnox Total Cost Analyzer with enhanced components...');
  
  // Initialize the main components
  if (window.sidebarManager) {
    window.sidebarManager.init();
  }
  
  // Initialize the executive view
  if (window.executiveView) {
    window.executiveView.init('executive');
  }
  
  // Initialize the security view if available
  if (window.securityView) {
    window.securityView.init('security');
  }
  
  // Set up main tab navigation
  initMainTabs();
  
  // Set up export PDF functionality
  initExportPdf();
  
  // Set up dark mode toggle
  initDarkModeToggle();
  
  console.log('Portnox Total Cost Analyzer initialized successfully.');
});

/**
 * Initialize main tabs
 */
function initMainTabs() {
  const mainTabs = document.querySelectorAll('.main-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  mainTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // Remove active class from all tabs and panels
      mainTabs.forEach(t => t.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      this.classList.add('active');
      document.querySelector(`.view-panel[data-view="${view}"]`).classList.add('active');
      
      // Initialize view if available
      if (view === 'executive' && window.executiveView) {
        window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
      } else if (view === 'security' && window.securityView) {
        window.securityView.refreshChartsInPanel(window.securityView.currentTab);
      }
    });
  });
}

/**
 * Initialize export PDF functionality
 */
function initExportPdf() {
  const exportButton = document.getElementById('export-pdf');
  
  if (!exportButton) return;
  
  exportButton.addEventListener('click', function() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
    
    // Simulate PDF generation (in a real scenario, this would use html2canvas and pdfmake)
    setTimeout(function() {
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
      }
      
      // Show success message
      showToast('Executive summary report generated successfully!', 'success');
      
      // In a real implementation, this would trigger a download
      console.log('PDF export functionality would be implemented here.');
    }, 2000);
  });
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (!darkModeToggle) return;
  
  // Check for saved preference
  const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  
  // Apply dark mode if enabled
  if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Add event listener for toggle
  darkModeToggle.addEventListener('click', function() {
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('darkModeEnabled', isDarkMode);
    
    // Refresh charts in current view
    if (window.executiveView) {
      window.executiveView.refreshChartsInPanel(window.executiveView.currentTab);
    }
    
    if (window.securityView) {
      window.securityView.refreshChartsInPanel(window.securityView.currentTab);
    }
  });
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'exclamation-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="toast-content">${message}</div>
    <div class="toast-close">
      <i class="fas fa-times"></i>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
  
  // Add close button functionality
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  });
}
