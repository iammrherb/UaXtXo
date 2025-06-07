// Platform Initialization
(function() {
    'use strict';

    console.log('🚀 Initializing Portnox TCO Analyzer Platform...');

    // Wait for all modules to load
    window.addEventListener('DOMContentLoaded', function() {
        
        // Initialize when core modules are ready
        ModuleLoader.whenReady(['VendorDatabase', 'ChartManager', 'VendorSelectionUI'], function(VendorDB, ChartManager, VendorUI) {
            console.log('✅ All modules loaded successfully');
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 300);
            }
            
            // Initialize vendor selection
            VendorUI.initialize();
            
            // Set up tab navigation
            setupTabNavigation();
            
            // Set up action buttons
            setupActionButtons();
            
            // Load initial data
            loadInitialData();
            
            console.log('✅ Platform initialized successfully');
        });
    });

    function setupTabNavigation() {
        const tabs = document.querySelectorAll('.nav-tab');
        const panels = document.querySelectorAll('.tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
                
                // Trigger chart refresh if needed
                if (window.ChartManager) {
                    ChartManager.refreshTab(targetTab);
                }
            });
        });
    }

    function setupActionButtons() {
        // Recalculate button
        const recalcBtn = document.getElementById('recalculateBtn');
        if (recalcBtn) {
            recalcBtn.addEventListener('click', () => {
                console.log('Recalculating...');
                if (window.PlatformApp) {
                    PlatformApp.recalculate();
                }
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                console.log('Exporting report...');
                if (window.ReportGenerator) {
                    ReportGenerator.exportPDF();
                }
            });
        }

        // Schedule demo button
        const demoBtn = document.getElementById('scheduleDemoBtn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                window.open('https://portnox.com/schedule-demo', '_blank');
            });
        }
    }

    function loadInitialData() {
        // Load default comparison (Portnox vs Cisco ISE)
        if (window.VendorSelectionUI) {
            setTimeout(() => {
                VendorSelectionUI.selectVendor('portnox');
                VendorSelectionUI.selectVendor('cisco-ise');
            }, 500);
        }
    }

})();
