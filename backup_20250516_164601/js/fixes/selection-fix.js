// Vendor Selection and Chart Update Fix
// Fixes issues with vendor selection and updates charts when selections change

(function() {
    console.log("🔄 Initializing vendor selection and chart update fixes...");
    
    document.addEventListener('DOMContentLoaded', function() {
        // Fix vendor selection
        fixVendorSelection();
        
        // Fix calculate buttons
        fixCalculateButtons();
        
        // Fix chart updates
        fixChartUpdates();
        
        console.log("🔄 Vendor selection and chart update fixes initialized");
    });
    
    function fixVendorSelection() {
        // Find all vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        if (vendorCards.length === 0) {
            console.error("No vendor cards found");
            return;
        }
        
        console.log(`Found ${vendorCards.length} vendor cards`);
        
        // Ensure Portnox is always selected and can't be deselected
        let portnoxCard = document.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard) {
            portnoxCard.classList.add('selected');
            portnoxCard.classList.add('fixed-selected');
            
            // Remove existing click event if any
            const newPorntoxCard = portnoxCard.cloneNode(true);
            portnoxCard.parentNode.replaceChild(newPorntoxCard, portnoxCard);
            portnoxCard = newPorntoxCard;
            
            // Add tooltip explaining it can't be deselected
            portnoxCard.setAttribute('title', 'Portnox Cloud is the baseline for comparison and cannot be deselected');
        }
        
        // Fix click events for other vendors
        vendorCards.forEach(card => {
            // Skip portnox since we already handled it
            if (card.getAttribute('data-vendor') === 'portnox') {
                return;
            }
            
            // Remove existing click event if any
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new click event
            newCard.addEventListener('click', function() {
                // Toggle selection
                this.classList.toggle('selected');
                
                // Update selected vendors count
                updateSelectedVendorsCount();
                
                // If we now have at least one competitor selected, update visualizations
                if (document.querySelectorAll('.vendor-card.selected').length > 1) {
                    // Get selected vendors
                    const selectedVendors = getSelectedVendors();
                    
                    // Update charts with selected vendors
                    updateChartsWithSelectedVendors(selectedVendors);
                }
            });
        });
        
        console.log("Vendor selection fixed");
    }
    
    function fixCalculateButtons() {
        // Find calculate buttons
        const calculateButtons = [
            document.getElementById('calculate-btn'),
            document.getElementById('calculate-btn-header')
        ];
        
        calculateButtons.forEach(button => {
            if (!button) return;
            
            // Remove existing click event if any
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new click event
            newButton.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Get selected vendors
                const selectedVendors = getSelectedVendors();
                
                // Ensure we have at least one competitor
                if (selectedVendors.length === 1) {
                    // Auto-select Cisco as comparison if nothing else selected
                    const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
                    if (ciscoCard) {
                        ciscoCard.classList.add('selected');
                        selectedVendors.push(window.vendorData.find(v => v.id === 'cisco'));
                    }
                }
                
                // Update charts and metrics
                setTimeout(() => {
                    updateChartsWithSelectedVendors(selectedVendors);
                    
                    // Also trigger updateCalculations if it exists
                    if (typeof window.updateCalculations === 'function') {
                        window.updateCalculations(selectedVendors);
                    }
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success message
                    showToast('Cost analysis updated successfully!', 'success');
                }, 800);
            });
        });
        
        console.log("Calculate buttons fixed");
    }
    
    function fixChartUpdates() {
        // Add global function to update all charts
        window.updateAllCharts = function(selectedVendors) {
            console.log(`Updating all charts with ${selectedVendors.length} vendors`);
            
            // Call all chart initialization functions if they exist
            if (typeof window.initTcoComparisonChart === 'function') {
                window.initTcoComparisonChart(selectedVendors);
            }
            
            if (typeof window.initCumulativeCostChart === 'function') {
                window.initCumulativeCostChart(selectedVendors);
            }
            
            if (typeof window.initRoiChart === 'function') {
                window.initRoiChart(selectedVendors);
            }
            
            if (typeof window.initValueDriversChart === 'function') {
                window.initValueDriversChart(selectedVendors);
            }
            
            if (typeof window.initRiskComparisonChart === 'function') {
                window.initRiskComparisonChart(selectedVendors);
            }
            
            if (typeof window.initBreachImpactChart === 'function') {
                window.initBreachImpactChart(selectedVendors);
            }
            
            if (typeof window.initInsuranceImpactChart === 'function') {
                window.initInsuranceImpactChart(selectedVendors);
            }
            
            if (typeof window.initVendorRadarChart === 'function') {
                window.initVendorRadarChart(selectedVendors);
            }
            
            if (typeof window.initCostStructureChart === 'function') {
                window.initCostStructureChart(selectedVendors);
            }
            
            if (typeof window.initCostProjectionChart === 'function') {
                window.initCostProjectionChart(selectedVendors);
            }
            
            if (typeof window.initNistFrameworkChart === 'function') {
                window.initNistFrameworkChart(selectedVendors);
            }
            
            if (typeof window.initArchitectureChart === 'function') {
                window.initArchitectureChart(selectedVendors);
            }
            
            if (typeof window.initFeatureRadarChart === 'function') {
                window.initFeatureRadarChart(selectedVendors);
            }
            
            if (typeof window.createSecurityHeatmap === 'function') {
                window.createSecurityHeatmap(selectedVendors);
            }
            
            if (typeof window.createRiskHeatmap === 'function') {
                window.createRiskHeatmap(selectedVendors);
            }
            
            console.log("All charts updated");
        };
    }
    
    // Helper function to get selected vendors
    function getSelectedVendors() {
        const selectedVendorCards = document.querySelectorAll('.vendor-card.selected');
        return Array.from(selectedVendorCards).map(card => {
            const vendorId = card.getAttribute('data-vendor');
            return window.vendorData.find(v => v.id === vendorId);
        }).filter(Boolean);
    }
    
    // Helper function to update charts with selected vendors
    function updateChartsWithSelectedVendors(selectedVendors) {
        console.log(`Updating charts with ${selectedVendors.length} vendors`);
        
        // Call global update function if it exists
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        }
    }
    
    // Helper function to update selected vendors count
    function updateSelectedVendorsCount() {
        const selectedCount = document.querySelectorAll('.vendor-card.selected').length;
        console.log(`Selected vendors: ${selectedCount}`);
        
        // You could update a UI element to show the count
        // const countElement = document.getElementById('selected-vendors-count');
        // if (countElement) {
        //     countElement.textContent = selectedCount;
        // }
    }
    
    // Helper function to show toast notifications
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 
                              type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Add animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
        
        // Close button
        const closeButton = toast.querySelector('.toast-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            });
        }
    }
    
    console.log("🔄 Vendor selection and chart update fixes initialized successfully");
})();
