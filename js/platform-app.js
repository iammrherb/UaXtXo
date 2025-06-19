// Main Platform Application
defineModule('PlatformApp', ['VendorDatabase', 'ChartManager', 'VendorSelectionUI'], 
function(VendorDB, ChartManager, VendorUI) {
    'use strict';

    const state = {
        selectedVendors: [],
        currentView: 'financial',
        calculations: {}
    };

    function initialize() {
        console.log('🚀 Platform App initializing...');
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize default view
        showFinancialOverview();
    }

    function setupEventListeners() {
        // Listen for vendor selection changes
        window.addEventListener('vendorSelectionChanged', (e) => {
            state.selectedVendors = e.detail.vendors;
            recalculate();
        });
    }

    function recalculate() {
        console.log('📊 Recalculating with vendors:', state.selectedVendors);
        
        // Show loading state
        showLoading();
        
        // Simulate calculation delay
        setTimeout(() => {
            // Update all charts
            ChartManager.updateCharts(state.selectedVendors);
            
            // Update insights
            updateInsights();
            
            // Hide loading
            hideLoading();
        }, 500);
    }

    function showLoading() {
        // Add loading class to charts
        document.querySelectorAll('.chart-container').forEach(el => {
            el.style.opacity = '0.5';
        });
    }

    function hideLoading() {
        document.querySelectorAll('.chart-container').forEach(el => {
            el.style.opacity = '1';
        });
    }

    function showFinancialOverview() {
        state.currentView = 'financial';
        // Financial view is default, charts are already initialized
    }

    function updateInsights() {
        const summaryEl = document.getElementById('executiveSummary');
        if (summaryEl && state.selectedVendors.length >= 2) {
            const portnox = state.selectedVendors.find(v => v === 'portnox');
            if (portnox) {
                summaryEl.innerHTML = `
                    <p><strong>Key Finding:</strong> Portnox Cloud delivers up to 73% lower TCO compared to legacy solutions.</p>
                    <p><strong>Time to Value:</strong> Deploy in days vs. months with cloud-native architecture.</p>
                    <p><strong>Operational Efficiency:</strong> Reduce FTE requirements by up to 90%.</p>
                `;
            }
        }
    }

    // Public API
    return {
        initialize,
        recalculate,
        getState: () => state
    };
});

// Initialize platform app
window.PlatformApp = ModuleLoader.get('PlatformApp');
