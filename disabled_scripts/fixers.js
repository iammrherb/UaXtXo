/**
 * Master Fixers - Comprehensive Fixes for Portnox TCO Analyzer
 * This script coordinates and applies all fixes to ensure proper functionality
 */

(function() {
    console.log("🔨 MASTER FIXER: Initializing...");
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        // Apply fixes in the correct order
        fixVendorData();
        fixVendorCards();
        fixCharts();
        fixTabs();
        fixCalculate();
        runInitialCalculation();
        
        console.log("🔨 MASTER FIXER: All fixes applied successfully!");
    }
    
    function fixVendorData() {
        console.log("🔨 MASTER FIXER: Fixing vendor data...");
        
        // Make sure vendor data is loaded
        if (!window.VENDOR_DATA && typeof loadVendorData === 'function') {
            loadVendorData();
        }
        
        console.log("🔨 MASTER FIXER: Vendor data fixed!");
    }
    
    function fixVendorCards() {
        console.log("🔨 MASTER FIXER: Fixing vendor cards...");
        
        // Make sure Portnox is always selected
        const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard && !portnoxCard.classList.contains('selected')) {
            portnoxCard.classList.add('selected');
        }
        
        // Make sure we have at least one competitor selected
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        if (selectedCards.length < 2) {
            const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
            if (ciscoCard) {
                ciscoCard.classList.add('selected');
            }
        }
        
        console.log("🔨 MASTER FIXER: Vendor cards fixed!");
    }
    
    function fixCharts() {
        console.log("🔨 MASTER FIXER: Fixing charts...");
        
        // Make sure all charts are destroyed before initializing
        if (typeof window.destroyAllCharts === 'function') {
            window.destroyAllCharts();
        }
        
        // Initialize charts if function exists
        if (typeof window.initializeAllCharts === 'function') {
            setTimeout(window.initializeAllCharts, 100);
        }
        
        console.log("🔨 MASTER FIXER: Charts fixed!");
    }
    
    function fixTabs() {
        console.log("🔨 MASTER FIXER: Fixing tabs...");
        
        // Make sure all tab click events properly destroy and recreate charts
        document.querySelectorAll('.stakeholder-tab, .results-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                if (typeof window.destroyAllCharts === 'function') {
                    window.destroyAllCharts();
                }
                
                setTimeout(function() {
                    if (typeof window.initializeAllCharts === 'function') {
                        window.initializeAllCharts();
                    }
                }, 100);
            });
        });
        
        console.log("🔨 MASTER FIXER: Tabs fixed!");
    }
    
    function fixCalculate() {
        console.log("🔨 MASTER FIXER: Fixing calculate button...");
        
        // Get the calculate buttons
        const calculateBtn = document.getElementById('calculate-btn');
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                setTimeout(function() {
                    runCalculation();
                    
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    if (typeof window.showToast === 'function') {
                        window.showToast('Analysis completed successfully!', 'success');
                    }
                }, 500);
            });
        }
        
        if (headerCalculateBtn) {
            headerCalculateBtn.addEventListener('click', function() {
                if (calculateBtn) {
                    calculateBtn.click();
                } else {
                    runCalculation();
                }
            });
        }
        
        console.log("🔨 MASTER FIXER: Calculate button fixed!");
    }
    
    function runCalculation() {
        console.log("🔨 MASTER FIXER: Performing calculation...");
        
        // Get selected vendors
        const selectedVendors = [];
        document.querySelectorAll('.vendor-card.selected').forEach(card => {
            selectedVendors.push(card.getAttribute('data-vendor'));
        });
        
        // Make sure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.push('portnox');
        }
        
        console.log("🔨 MASTER FIXER: Initializing charts...");
        console.log("🔨 MASTER FIXER: Selected vendors for charts:", selectedVendors);
        
        // Update calculations
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations(selectedVendors);
        }
        
        // Update charts
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        } else if (typeof window.initializeAllCharts === 'function') {
            window.initializeAllCharts();
        }
        
        console.log("🔨 MASTER FIXER: Charts initialized successfully!");
        console.log("🔨 MASTER FIXER: Calculation completed!");
    }
    
    function runInitialCalculation() {
        console.log("🔨 MASTER FIXER: Running initial calculation...");
        
        // Get selected vendors
        const selectedVendors = [];
        document.querySelectorAll('.vendor-card.selected').forEach(card => {
            selectedVendors.push(card.getAttribute('data-vendor'));
        });
        
        // Make sure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.push('portnox');
            const portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
            if (portnoxCard) {
                portnoxCard.classList.add('selected');
            }
        }
        
        // Make sure we have at least one competitor
        if (selectedVendors.length < 2) {
            selectedVendors.push('cisco');
            const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
            if (ciscoCard) {
                ciscoCard.classList.add('selected');
            }
        }
        
        // Update calculations
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations(selectedVendors);
        }
        
        // Update charts
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        } else if (typeof window.initializeAllCharts === 'function') {
            window.initializeAllCharts();
        }
    }
})();
