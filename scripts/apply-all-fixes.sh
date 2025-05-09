#!/bin/bash

echo "Applying all NAC TCO Calculator fixes..."

# Create backup directory
mkdir -p backups

# Backup original files
echo "Creating backups..."
cp js/charts/chart-init-safe.js backups/chart-init-safe.js.bak
cp js/charts/enhanced-chart-builder.js backups/enhanced-chart-builder.js.bak
cp js/charts/chart-builder.js backups/chart-builder.js.bak
cp js/features/sensitivity-analysis/integrated-sensitivity.js backups/integrated-sensitivity.js.bak
cp js/main.js backups/main.js.bak

# Apply fixes
echo "Restoring chart-init-safe.js..."
cp js/charts/chart-init-safe.js js/charts/chart-init-safe.js.bak
cat > js/charts/chart-init-safe.js << 'CHARTINIT'
/**
 * Chart Initialization
 * Safely initializes all charts in the TCO Calculator
 */
console.log('Initializing Chart System...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing charts...');
    
    // Initialize chart defaults if Chart.js is available
    if (window.Chart) {
        console.log('Chart.js detected, setting defaults...');
        
        // Set global chart defaults
        Chart.defaults.font.family = "'Segoe UI', 'Helvetica Neue', sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#505050';
    } else {
        console.warn('Chart.js not found, charts will not be initialized');
    }
    
    // Initialize all charts if the builder is available
    if (window.EnhancedChartBuilder && typeof window.EnhancedChartBuilder.init === 'function') {
        console.log('Initializing Enhanced Chart Builder...');
        window.EnhancedChartBuilder.init();
    } else if (window.chartBuilder && typeof window.chartBuilder.initCharts === 'function') {
        console.log('Initializing Chart Builder...');
        window.chartBuilder.initCharts();
    } else {
        console.warn('No chart builder found, charts will not be initialized');
    }
    
    console.log('Chart initialization complete');
});
CHARTINIT

echo "Creating wizard fixes script..."
mkdir -p js/fixes
cat > js/fixes/wizard-fixes.js << 'WIZARDFIXES'
/**
 * Wizard Restoration Script
 */
(function() {
  console.log('Running Wizard Restoration Script...');
  
  // Fix vendor card selection
  function fixVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    if (!vendorCards.length) {
      console.warn('No vendor cards found');
      return;
    }
    
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        vendorCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Get vendor data
        const vendor = this.getAttribute('data-vendor');
        if (vendor && window.uiController) {
          window.uiController.activeVendor = vendor;
        }
        
        // Update vendor info if available
        if (window.vendorData && vendor && window.vendorData[vendor]) {
          const infoBox = document.getElementById('vendor-info');
          const infoTitle = document.getElementById('vendor-info-title');
          const infoDesc = document.getElementById('vendor-info-description');
          
          if (infoBox && infoTitle && infoDesc) {
            infoBox.classList.remove('hidden');
            infoTitle.textContent = window.vendorData[vendor].name;
            infoDesc.textContent = window.vendorData[vendor].description || '';
          }
        }
      });
    });
    
    console.log('Vendor cards fixed');
  }
  
  // Fix tab navigation
  function fixTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) {
      console.warn('Tab elements not found');
      return;
    }
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        if (!tabId) return;
        
        // Deactivate all tabs
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
          btn.setAttribute('tabindex', '-1');
        });
        
        // Hide all panes
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Activate clicked tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', '0');
        
        // Show corresponding pane
        const pane = document.getElementById(tabId);
        if (pane) {
          pane.classList.add('active');
        }
      });
    });
    
    console.log('Tab navigation fixed');
  }
  
  // Fix sub-tab navigation
  function fixSubTabNavigation() {
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    const subTabPanes = document.querySelectorAll('.sub-tab-pane');
    
    if (!subTabButtons.length || !subTabPanes.length) {
      console.warn('Sub-tab elements not found');
      return;
    }
    
    subTabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const subTabId = this.getAttribute('data-subtab');
        if (!subTabId) return;
        
        // Deactivate all sub-tabs
        subTabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
          btn.setAttribute('tabindex', '-1');
        });
        
        // Hide all sub-panes
        subTabPanes.forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Activate clicked sub-tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', '0');
        
        // Show corresponding sub-pane
        const pane = document.getElementById(subTabId);
        if (pane) {
          pane.classList.add('active');
        }
      });
    });
    
    console.log('Sub-tab navigation fixed');
  }
  
  // Fix wizard navigation
  function fixWizardNavigation() {
    const nextButtons = document.querySelectorAll('#next-step');
    const prevButtons = document.querySelectorAll('#prev-step');
    const viewResultsButton = document.querySelector('#view-results');
    
    // Get all wizard steps
    const wizardSteps = document.querySelectorAll('.wizard-step-content');
    
    if (!wizardSteps.length) {
      console.warn('Wizard steps not found');
      return;
    }
    
    let currentStep = 0;
    
    // Next button functionality
    nextButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Hide current step
        wizardSteps[currentStep].classList.remove('active');
        
        // Move to next step
        currentStep = Math.min(currentStep + 1, wizardSteps.length - 1);
        
        // Show new step
        wizardSteps[currentStep].classList.add('active');
      });
    });
    
    // Previous button functionality
    prevButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Hide current step
        wizardSteps[currentStep].classList.remove('active');
        
        // Move to previous step
        currentStep = Math.max(currentStep - 1, 0);
        
        // Show new step
        wizardSteps[currentStep].classList.add('active');
      });
    });
    
    // View results functionality
    if (viewResultsButton) {
      viewResultsButton.addEventListener('click', function() {
        const wizardContent = document.querySelector('.wizard-content');
        const resultsContainer = document.getElementById('results-container');
        
        if (wizardContent && resultsContainer) {
          wizardContent.classList.add('hidden');
          resultsContainer.classList.remove('hidden');
          
          // Initialize charts if needed
          if (window.chartBuilder && typeof window.chartBuilder.initCharts === 'function') {
            window.chartBuilder.initCharts();
          }
        }
      });
    }
    
    console.log('Wizard navigation fixed');
  }
  
  // Initialize chart functionality
  function initializeCharts() {
    // Try to initialize charts
    if (window.chartBuilder && typeof window.chartBuilder.initCharts === 'function') {
      window.chartBuilder.initCharts();
      console.log('Charts initialized');
    } else {
      console.warn('Chart builder not available');
    }
  }
  
  // Run all fixes
  function runAllFixes() {
    fixVendorCards();
    fixTabNavigation();
    fixSubTabNavigation();
    fixWizardNavigation();
    initializeCharts();
    console.log('All wizard and chart functionality restored');
  }
  
  // Run fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllFixes);
  } else {
    runAllFixes();
  }
})();
WIZARDFIXES

echo "Updating main.js to load wizard fixes..."
# Append script loader to main.js if it doesn't already have it
if ! grep -q "wizard-fixes.js" js/main.js; then
cat >> js/main.js << 'MAINJS'

// Load wizard fixes
document.addEventListener('DOMContentLoaded', function() {
  const wizardFixesScript = document.createElement('script');
  wizardFixesScript.src = 'js/fixes/wizard-fixes.js';
  document.body.appendChild(wizardFixesScript);
  console.log('Wizard fixes script loaded');
});
MAINJS
fi

# Fix chart-builder.js
echo "Fixing chart-builder.js..."
cat js/charts/chart-builder.js.bak > js/charts/chart-builder.js

echo "All fixes have been applied successfully!"
echo "Please refresh your browser to see the changes."
