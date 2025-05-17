/**
 * Fixed Vendor Selection for Portnox TCO Analyzer
 * Version 2.0 - Complete rewrite with stable selection handling
 */

(function() {
    console.log("🔄 Applying fixed vendor selection module...");

    // Set default selected vendors to avoid null issues
    window.selectedVendors = window.selectedVendors || ['portnox', 'cisco'];

    // Fix vendor selection functionality
    const fixVendorSelection = function() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        if (!vendorCards || vendorCards.length === 0) {
            console.warn("Vendor cards not found in the DOM");
            return;
        }

        // Clear existing event listeners by cloning and replacing each card
        vendorCards.forEach(card => {
            const newCard = card.cloneNode(true);
            if (card.parentNode) {
                card.parentNode.replaceChild(newCard, card);
            }

            // Add new event listener
            newCard.addEventListener('click', function() {
                const vendorId = this.getAttribute('data-vendor');
                if (!vendorId) {
                    console.warn("Vendor card missing data-vendor attribute");
                    return;
                }

                // Toggle selection class
                this.classList.toggle('selected');
                
                // Update selected vendors array
                if (this.classList.contains('selected')) {
                    // Add to selected vendors if not already included
                    if (!window.selectedVendors.includes(vendorId)) {
                        window.selectedVendors.push(vendorId);
                    }
                } else {
                    // Remove from selected vendors
                    window.selectedVendors = window.selectedVendors.filter(v => v !== vendorId);
                }

                // Ensure Portnox is always selected
                if (vendorId === 'portnox' && !this.classList.contains('selected')) {
                    this.classList.add('selected');
                    if (!window.selectedVendors.includes('portnox')) {
                        window.selectedVendors.push('portnox');
                    }
                }

                // At least one vendor besides Portnox should be selected
                if (window.selectedVendors.length <= 1) {
                    // Find first non-Portnox vendor card and select it
                    const firstNonPortnoxVendor = document.querySelector('.vendor-card:not([data-vendor="portnox"])');
                    if (firstNonPortnoxVendor) {
                        const altVendorId = firstNonPortnoxVendor.getAttribute('data-vendor');
                        firstNonPortnoxVendor.classList.add('selected');
                        if (altVendorId && !window.selectedVendors.includes(altVendorId)) {
                            window.selectedVendors.push(altVendorId);
                        }
                    }
                }

                // Limit to 3 selected vendors for better UI
                if (window.selectedVendors.length > 3) {
                    // Keep portnox and the 2 most recently selected vendors
                    const portnox = window.selectedVendors.indexOf('portnox');
                    const nonPortnoxVendors = window.selectedVendors.filter(v => v !== 'portnox');
                    const keepVendors = nonPortnoxVendors.slice(-2);
                    
                    if (portnox !== -1) {
                        window.selectedVendors = ['portnox', ...keepVendors];
                    } else {
                        window.selectedVendors = keepVendors;
                    }
                    
                    // Update UI to reflect the selection
                    document.querySelectorAll('.vendor-card').forEach(card => {
                        const cardVendorId = card.getAttribute('data-vendor');
                        if (cardVendorId && window.selectedVendors.includes(cardVendorId)) {
                            card.classList.add('selected');
                        } else {
                            card.classList.remove('selected');
                        }
                    });
                }

                console.log("Selected vendors updated:", window.selectedVendors);
                
                // Update charts and calculations
                try {
                    // Show loading overlay
                    const loadingOverlay = document.getElementById('loading-overlay');
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'flex';
                    }
                    
                    // Small delay to avoid UI freezing
                    setTimeout(() => {
                        // Update calculations
                        if (typeof window.updateCalculations === 'function') {
                            window.updateCalculations(window.selectedVendors);
                        } else if (typeof window.updateAllCharts === 'function') {
                            window.updateAllCharts(window.selectedVendors);
                        }
                        
                        // Hide loading overlay
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                        }
                    }, 50);
                } catch (error) {
                    console.error("Error updating calculations:", error);
                    
                    // Hide loading overlay on error
                    const loadingOverlay = document.getElementById('loading-overlay');
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                }
            });
        });

        // Initialize selected state based on window.selectedVendors
        // Make sure Portnox is always selected
        if (!window.selectedVendors.includes('portnox')) {
            window.selectedVendors.unshift('portnox');
        }
        
        // Init selected state in UI
        window.selectedVendors.forEach(vendorId => {
            const card = document.querySelector(`.vendor-card[data-vendor="${vendorId}"]`);
            if (card) {
                card.classList.add('selected');
            }
        });

        console.log("Vendor selection fixed");
    };

    // Fix calculate button functionality
    const fixCalculateButton = function() {
        const calculateBtns = [
            document.getElementById('calculate-btn'),
            document.getElementById('calculate-btn-header')
        ];

        calculateBtns.forEach(btn => {
            if (!btn) return;
            
            // Clear existing listeners by cloning
            const newBtn = btn.cloneNode(true);
            if (btn.parentNode) {
                btn.parentNode.replaceChild(newBtn, btn);
            }

            // Add new event listener
            newBtn.addEventListener('click', function() {
                console.log("Calculate button clicked");
                
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }

                // Wait a brief moment to ensure UI updates
                setTimeout(function() {
                    try {
                        if (typeof window.updateCalculations === 'function') {
                            window.updateCalculations(window.selectedVendors);
                        } else if (typeof window.updateAllCharts === 'function') {
                            window.updateAllCharts(window.selectedVendors);
                        }

                        // Hide loading overlay
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                        }

                        // Show a success toast
                        const toastContainer = document.getElementById('toast-container');
                        if (toastContainer) {
                            const toast = document.createElement('div');
                            toast.className = 'toast toast-success';
                            toast.innerHTML = `
                                <div class="toast-header">
                                    <strong>Success</strong>
                                    <button class="toast-close">&times;</button>
                                </div>
                                <div class="toast-body">
                                    Analysis updated with the latest data
                                </div>
                            `;
                            toastContainer.appendChild(toast);
                            
                            // Remove toast after 3 seconds
                            setTimeout(() => {
                                toast.classList.add('toast-out');
                                setTimeout(() => toast.remove(), 300);
                            }, 3000);
                        }
                    } catch (error) {
                        console.error("Error running calculations:", error);
                        
                        // Hide loading overlay
                        if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                        }

                        // Show error toast
                        const toastContainer = document.getElementById('toast-container');
                        if (toastContainer) {
                            const toast = document.createElement('div');
                            toast.className = 'toast toast-error';
                            toast.innerHTML = `
                                <div class="toast-header">
                                    <strong>Error</strong>
                                    <button class="toast-close">&times;</button>
                                </div>
                                <div class="toast-body">
                                    An error occurred while updating the analysis. Please try again.
                                </div>
                            `;
                            toastContainer.appendChild(toast);
                            
                            // Remove toast after 3 seconds
                            setTimeout(() => {
                                toast.classList.add('toast-out');
                                setTimeout(() => toast.remove(), 300);
                            }, 3000);
                        }
                    }
                }, 100);
            });
        });

        console.log("Calculate buttons fixed");
    };

    // Run fixes when DOM is ready
    function runFixes() {
        fixVendorSelection();
        fixCalculateButton();
        
        // Force initial calculation update
        if (window.selectedVendors && window.selectedVendors.length > 0) {
            if (typeof window.updateCalculations === 'function') {
                window.updateCalculations(window.selectedVendors);
            }
        }
    }

    // Run fixes immediately if DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        runFixes();
    } else {
        // Otherwise wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', runFixes);
    }

    // Also add a window.onload handler as a fallback
    window.addEventListener('load', runFixes);

    console.log("✅ Fixed vendor selection module applied successfully");
})();
