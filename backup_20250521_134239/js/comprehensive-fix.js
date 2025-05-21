/**
 * Comprehensive Fix for Portnox Total Cost Analyzer
 * Addresses all critical issues in one script
 */

console.log("Applying comprehensive fix...");

// Functions to ensure proper loading of dependencies
function ensureScript(src, callback) {
  if (document.querySelector(`script[src="${src}"]`)) {
    if (callback) callback();
    return;
  }
  
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function ensureStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Ensure vendor data is available
function ensureVendorData() {
  if (!window.VENDORS) {
    console.error("VENDORS data not defined, application may not function correctly");
    ensureScript('js/models/vendors-data-fix.js');
  }
}

// Fix sidebar toggle functionality
function fixSidebarToggles() {
  const sidebarToggleButtons = document.querySelectorAll(".sidebar-toggle, #sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.querySelector(".content-area");
  
  if (sidebar && contentArea) {
    sidebarToggleButtons.forEach(function(sidebarToggle) {
      if (sidebarToggle) {
        // Remove existing event listeners by cloning and replacing
        const newToggle = sidebarToggle.cloneNode(true);
        sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
        
        newToggle.addEventListener("click", function(e) {
          e.preventDefault();
          sidebar.classList.toggle("collapsed");
          newToggle.classList.toggle("collapsed");
          contentArea.classList.toggle("expanded");
        });
      }
    });
  }
  
  console.log("Sidebar toggles fixed");
}

// Fix tab navigation
function fixTabNavigation() {
  // Fix results tabs navigation
  const allResultsTabs = document.querySelectorAll('.results-tabs .results-tab');
  
  allResultsTabs.forEach(tab => {
    // Remove existing event listeners by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    newTab.addEventListener('click', function() {
      const panelId = newTab.getAttribute('data-panel');
      const tabsContainer = newTab.closest('.results-tabs');
      
      if (!panelId || !tabsContainer) return;
      
      // Remove active class from all tabs in this container
      tabsContainer.querySelectorAll('.results-tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      newTab.classList.add('active');
      
      // Hide all panels in this view
      const viewPanel = tabsContainer.closest('.view-panel, .results-panel');
      if (viewPanel) {
        viewPanel.querySelectorAll('.results-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        // Show the corresponding panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // If there's a chart refresh function available, call it
          if (window.executiveView && window.executiveView.refreshChartsInPanel) {
            window.executiveView.refreshChartsInPanel(panelId);
          }
          
          if (window.securityView && window.securityView.refreshChartsInPanel) {
            window.securityView.refreshChartsInPanel(panelId);
          }
        }
      }
    });
  });
  
  console.log("Tab navigation fixed");
}

// Fix vendor selection functionality
function fixVendorSelection() {
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  vendorCards.forEach(card => {
    // Make sure the card has proper styling
    card.style.height = "80px";
    card.style.padding = "8px 4px";
    
    const logoImg = card.querySelector('.vendor-logo img');
    if (logoImg) {
      logoImg.style.maxHeight = "28px";
      logoImg.style.maxWidth = "80px";
      logoImg.style.objectFit = "contain";
    }
    
    const nameElement = card.querySelector('.vendor-name');
    if (nameElement) {
      nameElement.style.fontSize = "11px";
      nameElement.style.whiteSpace = "nowrap";
      nameElement.style.overflow = "hidden";
      nameElement.style.textOverflow = "ellipsis";
      nameElement.style.maxWidth = "95%";
      nameElement.style.textAlign = "center";
    }
  });
  
  console.log("Vendor selection fixed");
}

// Fix loading overlay and toast notifications
function fixOverlays() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    loadingOverlay.style.color = "white";
    loadingOverlay.style.zIndex = "9999";
  }
  
  console.log("Overlays fixed");
}

// Add fallback for vendor icons
function addVendorIconFallbacks() {
  document.querySelectorAll('.vendor-logo img').forEach(img => {
    img.onerror = function() {
      // Try to load a generic fallback icon
      this.src = 'img/vendors/generic-vendor.png';
      this.onerror = function() {
        // If that also fails, use a data URI for a simple icon
        this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWE1YTk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iMiIgeT0iMyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiByeD0iMiIgcnk9IjIiPjwvcmVjdD48bGluZSB4MT0iOCIgeTE9IjIxIiB4Mj0iMTYiIHkyPSIyMSI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjE3IiB4Mj0iMTIiIHkyPSIyMSI+PC9saW5lPjwvc3ZnPg==';
      };
    };
  });
  
  console.log("Vendor icon fallbacks added");
}

// Ensure content is visible in all views
function ensureViewContent() {
  // Make sure executive view is initialized
  if (window.executiveView && !window.executiveView.initialized) {
    const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
    if (executivePanel) {
      window.executiveView.init('executive');
    }
  }
  
  // Make sure security view is initialized
  if (window.securityView && !window.securityView.initialized) {
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (securityPanel) {
      window.securityView.init('security');
    }
  }
}

// Initialize charts
function initializeAllCharts() {
  // Initialize ApexCharts
  if (window.ApexChartsManager && window.ApexChartsManager.initializeCharts) {
    window.ApexChartsManager.initializeCharts();
  }
  
  // Initialize SecurityCharts
  if (window.SecurityCharts && window.SecurityCharts.initializeCharts) {
    window.SecurityCharts.initializeCharts();
  }
  
  // Initialize D3 charts
  if (window.D3ChartsManager && window.D3ChartsManager.initializeCharts) {
    window.D3ChartsManager.initializeCharts();
  }
}

// Run all fixes
ensureStyle('css/custom/enhanced-styles.css');
ensureVendorData();
fixSidebarToggles();
fixTabNavigation();
fixVendorSelection();
fixOverlays();
addVendorIconFallbacks();
ensureViewContent();

// Ensure all critical JavaScript files are loaded
ensureScript('js/charts/chart-config.js', function() {
  ensureScript('js/charts/apex/apex-charts.js', function() {
    ensureScript('js/charts/security-charts.js', function() {
      ensureScript('js/charts/d3/d3-manager.js', function() {
        // Initialize charts after all scripts are loaded
        initializeAllCharts();
      });
    });
  });
});

console.log("Comprehensive fix applied successfully");
