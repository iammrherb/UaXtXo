// Enhanced Platform Initialization with Debugging
(function() {
    'use strict';

    console.log('🚀 Enhanced Platform Initialization Starting...');

    window.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM Content Loaded');
        
        // Check for required modules
        const requiredModules = [
            'VendorDatabase', 'ChartManager', 'VendorSelectionUI', 
            'ComplianceDatabase', 'RiskSecurityDatabase', 'IndustryDatabase'
        ];
        
        console.log('🔍 Checking for required modules...');
        requiredModules.forEach(module => {
            const isLoaded = window.ModuleLoader && window.ModuleLoader.isLoaded(module);
            console.log(`  ${module}: ${isLoaded ? '✓ Loaded' : '✗ Not loaded'}`);
        });
        
        // Enhanced module ready handler
        ModuleLoader.whenReady(requiredModules, function(VendorDB, ChartManager, VendorUI, ComplianceDB, RiskDB, IndustryDB) {
            console.log('✅ All modules ready!');
            
            // Log module capabilities
            console.log(`📊 Vendors available: ${VendorDB.getVendorCount ? VendorDB.getVendorCount() : 'Unknown'}`);
            console.log(`✅ Compliance frameworks: ${ComplianceDB.getFrameworks ? ComplianceDB.getFrameworks().length : 'Unknown'}`);
            console.log(`🛡️ Risk factors: ${RiskDB.getRiskFactors ? RiskDB.getRiskFactors().length : 'Unknown'}`);
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                console.log('🎭 Hiding loading overlay');
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 300);
            }
            
            // Initialize vendor selection with debugging
            console.log('🏷️ Initializing vendor selection UI...');
            if (VendorUI && VendorUI.initialize) {
                VendorUI.initialize();
                
                // Force vendor selection after UI is ready
                setTimeout(() => {
                    console.log('📌 Pre-selecting default vendors...');
                    if (VendorUI.selectVendor) {
                        VendorUI.selectVendor('portnox');
                        console.log('  ✓ Selected Portnox');
                        
                        VendorUI.selectVendor('cisco-ise');
                        console.log('  ✓ Selected Cisco ISE');
                        
                        // Log selected vendors
                        const selected = VendorUI.getSelectedVendors();
                        console.log(`  📋 Currently selected: ${selected.join(', ')}`);
                        
                        // Force initial chart render
                        if (ChartManager && ChartManager.initializeCharts && selected.length >= 2) {
                            console.log('📈 Initializing charts...');
                            ChartManager.initializeCharts(selected);
                        }
                    }
                }, 1000);
            }
            
            // Set up tab navigation
            setupTabNavigation();
            
            // Set up action buttons
            setupActionButtons();
            
            // Set up configuration controls
            setupConfigControls();
            
            console.log('✅ Platform initialization complete!');
        });
    });

    function setupTabNavigation() {
        console.log('🗂️ Setting up tab navigation...');
        const tabs = document.querySelectorAll('.nav-tab');
        const panels = document.querySelectorAll('.tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                console.log(`📑 Switching to tab: ${targetTab}`);
                
                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const panel = document.getElementById(`${targetTab}-tab`);
                if (panel) {
                    panel.classList.add('active');
                }
                
                // Trigger chart refresh
                if (window.ChartManager && window.ChartManager.refreshTab) {
                    window.ChartManager.refreshTab(targetTab);
                }
            });
        });
    }

    function setupActionButtons() {
        console.log('🔘 Setting up action buttons...');
        
        // Recalculate button
        const recalcBtn = document.getElementById('recalculateBtn');
        if (recalcBtn) {
            recalcBtn.addEventListener('click', () => {
                console.log('🔄 Recalculate clicked');
                const selected = window.VendorSelectionUI ? 
                    window.VendorSelectionUI.getSelectedVendors() : [];
                console.log(`  Selected vendors: ${selected.join(', ')}`);
                
                if (selected.length >= 2) {
                    if (window.ChartManager && window.ChartManager.refreshCharts) {
                        window.ChartManager.refreshCharts();
                    }
                } else {
                    alert('Please select at least 2 vendors for comparison');
                }
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                console.log('📥 Export clicked');
                if (window.ReportGenerator && window.ReportGenerator.exportPDF) {
                    window.ReportGenerator.exportPDF();
                }
            });
        }

        // Schedule demo button
        const demoBtn = document.getElementById('scheduleDemoBtn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                console.log('📅 Schedule demo clicked');
                window.open('https://portnox.com/schedule-demo', '_blank');
            });
        }
    }

    function setupConfigControls() {
        console.log('⚙️ Setting up configuration controls...');
        
        // Device count slider
        const deviceSlider = document.getElementById('deviceCount');
        const deviceDisplay = document.getElementById('deviceCountDisplay');
        
        if (deviceSlider && deviceDisplay) {
            deviceSlider.addEventListener('input', (e) => {
                const count = parseInt(e.target.value);
                deviceDisplay.textContent = count.toLocaleString();
                console.log(`📱 Device count changed to: ${count}`);
                
                // Update charts
                if (window.ChartManager && window.ChartManager.updateDeviceCount) {
                    window.ChartManager.updateDeviceCount(count);
                }
            });
        }
        
        // Industry selector
        const industrySelect = document.getElementById('industrySelect');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                const industry = e.target.value;
                console.log(`🏭 Industry changed to: ${industry}`);
                
                if (window.ChartManager && window.ChartManager.updateIndustry) {
                    window.ChartManager.updateIndustry(industry);
                }
            });
        }
    }

})();
