/**
 * Vendor Selection Fix
 * Ensures proper vendor selection and calculation updates
 */
(function() {
    console.log("🔄 Applying fixed vendor selection module...");
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    function initialize() {
        // Fix vendor card selection
        fixVendorSelection();
        
        // Fix calculate buttons
        fixCalculateButtons();
        
        // Run initial calculation
        runInitialCalculation();
    }
    
    function fixVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        if (vendorCards.length === 0) {
            console.warn("No vendor cards found, skipping vendor selection fix");
            return;
        }
        
        console.log("Vendor selection fixed");
        
        // Set up selected vendors
        const selectedVendors = ['portnox', 'cisco', 'aruba'];
        
        // Set initial selection state
        vendorCards.forEach(card => {
            const vendorId = card.getAttribute('data-vendor');
            
            if (selectedVendors.includes(vendorId)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            
            // Remove existing event listeners (not perfect, but helps in some cases)
            const clone = card.cloneNode(true);
            card.parentNode.replaceChild(clone, card);
            
            // Add new event listener
            clone.addEventListener('click', function() {
                const vendorId = this.getAttribute('data-vendor');
                
                // If this is Portnox, don't allow deselection
                if (vendorId === 'portnox') {
                    if (!this.classList.contains('selected')) {
                        this.classList.add('selected');
                    }
                    return;
                }
                
                // Toggle selection for other vendors
                this.classList.toggle('selected');
                
                // Get all selected vendors
                const selectedVendors = [];
                document.querySelectorAll('.vendor-card.selected').forEach(selectedCard => {
                    selectedVendors.push(selectedCard.getAttribute('data-vendor'));
                });
                
                // Make sure Portnox is always included
                if (!selectedVendors.includes('portnox')) {
                    selectedVendors.push('portnox');
                    document.querySelector('.vendor-card[data-vendor="portnox"]').classList.add('selected');
                }
                
                // Update calculations
                if (typeof window.updateCalculations === 'function') {
                    window.updateCalculations(selectedVendors);
                }
            });
        });
    }
    
    function fixCalculateButtons() {
        const calculateBtn = document.getElementById('calculate-btn');
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        
        console.log("Calculate buttons fixed");
        
        // Fix main calculate button
        if (calculateBtn) {
            // Remove existing event listeners
            const clone = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(clone, calculateBtn);
            
            // Add new event listener
            clone.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                setTimeout(function() {
                    runCalculation();
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast
                    if (window.showToast) {
                        window.showToast('Analysis completed successfully!', 'success');
                    }
                }, 500);
            });
        }
        
        // Fix header calculate button
        if (headerCalculateBtn) {
            // Remove existing event listeners
            const clone = headerCalculateBtn.cloneNode(true);
            headerCalculateBtn.parentNode.replaceChild(clone, headerCalculateBtn);
            
            // Add new event listener
            clone.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                setTimeout(function() {
                    runCalculation();
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast
                    if (window.showToast) {
                        window.showToast('Analysis completed successfully!', 'success');
                    }
                }, 500);
            });
        }
    }
    
    function runCalculation() {
        // Get selected vendors
        const selectedVendors = [];
        document.querySelectorAll('.vendor-card.selected').forEach(selectedCard => {
            selectedVendors.push(selectedCard.getAttribute('data-vendor'));
        });
        
        // Make sure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.push('portnox');
            document.querySelector('.vendor-card[data-vendor="portnox"]').classList.add('selected');
        }
        
        console.log("Updating calculations for selected vendors:", selectedVendors);
        
        // Update calculations
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations(selectedVendors);
        }
        
        // Update all charts
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        }
        
        console.log("Calculations updated successfully", window.calculationResults);
    }
    
    function runInitialCalculation() {
        console.log("📊 Running initial calculations");
        
        // Get selected vendors
        const selectedVendors = [];
        document.querySelectorAll('.vendor-card.selected').forEach(selectedCard => {
            selectedVendors.push(selectedCard.getAttribute('data-vendor'));
        });
        
        // Make sure Portnox is always included and we have at least one competitor
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.push('portnox');
        }
        
        if (selectedVendors.length < 2) {
            selectedVendors.push('cisco');
        }
        
        console.log("Selected vendors for calculations:", selectedVendors);
        
        // Update calculations
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations(selectedVendors);
        }
    }
    
    console.log("✅ Fixed vendor selection module applied successfully");
})();
