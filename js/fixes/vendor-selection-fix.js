/**
 * Vendor Selection and Calculation Fixes for Portnox TCO Analyzer
 * This script fixes issues with vendor selection and data calculations
 */

(function() {
    console.log("🔄 Applying vendor selection and calculation fixes...");

    // Default vendor data in case the existing data is corrupted
    const defaultVendorData = {
        portnox: {
            name: "Portnox Cloud",
            description: "Cloud-native NAC",
            logo: "img/vendors/portnox-logo.png",
            type: "cloud",
            features: {
                zeroTrust: 95,
                cloudNative: 100,
                multiVendor: 90,
                implementation: 95,
                scalability: 95,
                compliance: 90,
                endpointVisibility: 92,
                threatResponse: 88,
                automation: 90,
                userExperience: 85,
                remoteAccess: 95,
                roi: 92
            }
        },
        cisco: {
            name: "Cisco ISE",
            description: "Enterprise NAC",
            logo: "img/vendors/cisco-logo.png",
            type: "on-premises",
            features: {
                zeroTrust: 75,
                cloudNative: 40,
                multiVendor: 75,
                implementation: 50,
                scalability: 80,
                compliance: 85,
                endpointVisibility: 85,
                threatResponse: 80,
                automation: 75,
                userExperience: 65,
                remoteAccess: 70,
                roi: 70
            }
        },
        aruba: {
            name: "Aruba ClearPass",
            description: "Policy manager",
            logo: "img/vendors/aruba-logo.png",
            type: "on-premises",
            features: {
                zeroTrust: 70,
                cloudNative: 45,
                multiVendor: 85,
                implementation: 55,
                scalability: 75,
                compliance: 85,
                endpointVisibility: 80,
                threatResponse: 75,
                automation: 70,
                userExperience: 70,
                remoteAccess: 65,
                roi: 65
            }
        }
    };

    // Ensure vendor data exists
    window.VENDOR_DATA = window.VENDOR_DATA || defaultVendorData;

    // Fix vendor selection functionality
    const fixVendorSelection = function() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        if (!vendorCards || vendorCards.length === 0) {
            console.warn("Vendor cards not found in the DOM");
            return;
        }

        // Ensure we have a selected vendors array
        window.selectedVendors = window.selectedVendors || ['portnox', 'cisco'];

        // Clear existing event listeners by cloning and replacing each card
        vendorCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

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
                        if (!window.selectedVendors.includes(altVendorId)) {
                            window.selectedVendors.push(altVendorId);
                        }
                    }
                }

                console.log("Selected vendors updated:", window.selectedVendors);
                
                // Update charts and calculations
                try {
                    if (typeof window.updateCalculations === 'function') {
                        window.updateCalculations(window.selectedVendors);
                    } else if (typeof window.updateAllCharts === 'function') {
                        window.updateAllCharts(window.selectedVendors);
                    }
                } catch (error) {
                    console.error("Error updating calculations:", error);
                }
            });
        });

        // Initialize selected state based on window.selectedVendors
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
            if (btn) {
                // Clear existing listeners by cloning
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

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
            }
        });

        console.log("Calculate buttons fixed");
    };

    // Fix window.updateCalculations function
    window.updateCalculations = window.updateCalculations || function(selectedVendors) {
        console.log("Updating calculations for selected vendors:", selectedVendors);
        
        // Validate input
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors provided to updateCalculations:", selectedVendors);
            // Fall back to default selection
            selectedVendors = ['portnox', 'cisco'];
        }
        
        // Update metrics
        updateMetrics(selectedVendors);
        
        // Update charts
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        } else if (typeof window.refreshAllCharts === 'function') {
            window.refreshAllCharts();
        }
        
        console.log("Calculations updated");
    };

    // Helper function to update metrics
    function updateMetrics(selectedVendors) {
        // Simple baseline metrics for Portnox vs competitors
        const metrics = {
            // Executive summary metrics
            'total-savings': '$245,000',
            'savings-percentage': '48% reduction vs. traditional NAC',
            'payback-period': '7 months',
            'risk-reduction-total': '58%',
            'implementation-time': '21 days',
            'implementation-comparison': '75% faster than on-premises',
            
            // Financial metrics
            'portnox-tco': '$202,500',
            'tco-comparison': 'vs. $450,000 (Traditional)',
            'annual-subscription': '$51,000',
            'implementation-cost': '$15,500',
            'operational-cost': '$25,000',
            
            // Add other metrics here
        };
        
        // Update DOM with metrics
        for (const [id, value] of Object.entries(metrics)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }

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

    console.log("✅ Vendor selection and calculation fixes applied");
})();
