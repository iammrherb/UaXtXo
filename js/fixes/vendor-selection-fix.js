/**
 * Vendor Selection Fix
 * Ensures proper vendor selection and UI updates
 */
(function() {
    console.log("🔄 Fixing vendor selection and UI updates...");
    
    // Store selected vendors
    let selectedVendors = ['portnox'];
    
    // Fix vendor selection
    function fixVendorSelection() {
        console.log("Fixing vendor selection...");
        
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.error("Vendor grid not found");
            return;
        }
        
        const vendorCards = vendorGrid.querySelectorAll('.vendor-card');
        console.log(`Found ${vendorCards.length} vendor cards`);
        
        // Ensure Portnox is always selected
        const portnoxCard = vendorGrid.querySelector('.vendor-card[data-vendor="portnox"]');
        if (portnoxCard && !portnoxCard.classList.contains('selected')) {
            portnoxCard.classList.add('selected');
        }
        
        // Add click event listener to all vendor cards
        vendorCards.forEach(card => {
            // Remove existing click listeners to prevent duplicates
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            newCard.addEventListener('click', function() {
                const vendorId = this.dataset.vendor;
                
                // Toggle selection (except for Portnox which must stay selected)
                if (vendorId !== 'portnox') {
                    this.classList.toggle('selected');
                    
                    // Update selected vendors list
                    if (this.classList.contains('selected')) {
                        if (!selectedVendors.includes(vendorId)) {
                            selectedVendors.push(vendorId);
                        }
                    } else {
                        selectedVendors = selectedVendors.filter(v => v !== vendorId);
                    }
                    
                    // Limit to 3 vendors max
                    if (document.querySelectorAll('.vendor-card.selected').length > 3) {
                        this.classList.remove('selected');
                        selectedVendors = selectedVendors.filter(v => v !== vendorId);
                    }
                }
                
                // Update UI based on selection
                updateVendorSelectionUI();
            });
        });
        
        console.log("Vendor selection fixed");
    }
    
    // Fix calculate buttons
    function fixCalculateButtons() {
        console.log("Fixing calculate buttons...");
        
        const calculateButtons = document.querySelectorAll('#calculate-btn, #calculate-btn-header');
        
        calculateButtons.forEach(button => {
            // Remove existing click listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function() {
                console.log("Calculate button clicked");
                
                // Show loading spinner
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Short delay to show loading spinner
                setTimeout(() => {
                    // Update calculations and UI
                    updateCalculations(selectedVendors);
                    
                    // Hide loading spinner
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show toast notification
                    showToast('Calculations updated successfully', 'success');
                }, 500);
            });
        });
        
        console.log("Calculate buttons fixed");
    }
    
    // Update UI based on vendor selection
    function updateVendorSelectionUI() {
        console.log(`Updating UI for selected vendors: ${selectedVendors.join(', ')}`);
        
        // Ensure charts are updated
        if (window.initVendorComparisonCharts) {
            window.initVendorComparisonCharts(selectedVendors);
        } else if (window.updateAllCharts) {
            window.updateAllCharts(selectedVendors);
        }
        
        // Update metrics and other UI elements
        updateMetricsDisplay(selectedVendors);
    }
    
    // Update calculations and refresh UI
    function updateCalculations(vendors) {
        console.log(`Updating calculations for selected vendors: ${vendors.join(', ')}`);
        
        // Calculate results for each vendor
        const results = calculateResults(vendors);
        
        // Update UI with results
        updateResults(results);
        
        // Update charts
        if (window.initVendorComparisonCharts) {
            window.initVendorComparisonCharts(vendors);
        } else if (window.updateAllCharts) {
            window.updateAllCharts(vendors);
        }
        
        console.log("Calculations updated successfully", results);
        return results;
    }
    
    // Calculate results for selected vendors
    function calculateResults(vendors) {
        const results = {
            tco: {},
            roi: {},
            savings: {},
            implementation: {},
            security: {}
        };
        
        vendors.forEach(vendorId => {
            // Get vendor data
            const vendorData = getVendorData(vendorId);
            if (!vendorData) {
                console.warn(`Data not found for vendor ${vendorId}`);
                return;
            }
            
            // Calculate TCO
            results.tco[vendorId] = calculateTco(vendorData);
            
            // For ROI calculation, we compare against other vendors
            if (vendorId === 'portnox') {
                const competitors = vendors.filter(v => v !== 'portnox');
                if (competitors.length > 0) {
                    let competitorTco = 0;
                    let competitorCount = 0;
                    
                    competitors.forEach(compId => {
                        const compData = getVendorData(compId);
                        if (compData) {
                            competitorTco += calculateTco(compData);
                            competitorCount++;
                        }
                    });
                    
                    if (competitorCount > 0) {
                        const avgCompetitorTco = competitorTco / competitorCount;
                        const savings = avgCompetitorTco - results.tco[vendorId];
                        const investment = (vendorData.initialCosts?.software || vendorData.initialSoftware || 0) + 
                                         (vendorData.initialCosts?.implementation || vendorData.initialImplementation || 0);
                        
                        results.roi[vendorId] = Math.round((savings / investment) * 100);
                        results.savings[vendorId] = savings;
                    }
                }
            }
            
            // Implementation time
            results.implementation[vendorId] = vendorId === 'portnox' ? 21 : 90; // days
            
            // Security score (simplified)
            results.security[vendorId] = vendorId === 'portnox' ? 92 : 65;
        });
        
        return results;
    }
    
    // Update results display
    function updateResults(results) {
        // Update executive summary
        updateExecutiveSummary(results);
        
        // Update financial overview
        updateFinancialOverview(results);
        
        // Update security section
        updateSecurityOverview(results);
    }
    
    // Update executive summary
    function updateExecutiveSummary(results) {
        // Get Portnox data
        const portnoxResults = {
            tco: results.tco['portnox'] || 0,
            roi: results.roi['portnox'] || 0,
            savings: results.savings['portnox'] || 0,
            implementation: results.implementation['portnox'] || 0,
            security: results.security['portnox'] || 0
        };
        
        // Find main competitor (first non-Portnox vendor)
        let competitorId = null;
        for (const vendorId in results.tco) {
            if (vendorId !== 'portnox') {
                competitorId = vendorId;
                break;
            }
        }
        
        // Update dashboard metrics
        const elements = {
            // Total savings
            'total-savings': formatCurrency(portnoxResults.savings),
            'savings-percentage': competitorId ? `${Math.round((portnoxResults.savings / results.tco[competitorId]) * 100)}% reduction vs. ${getVendorName(competitorId)}` : "N/A",
            
            // ROI metrics
            'three-year-roi': `${portnoxResults.roi}%`,
            'payback-period': `${Math.round(12 / (portnoxResults.roi / 100))} months`,
            
            // Risk metrics
            'risk-reduction-total': `${portnoxResults.security}%`,
            
            // Implementation metrics
            'implementation-time': `${portnoxResults.implementation} days`,
            'implementation-comparison': competitorId ? `${Math.round((1 - portnoxResults.implementation / results.implementation[competitorId]) * 100)}% faster than on-premises` : "75% faster than on-premises",
        };
        
        // Update all elements
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }
    
    // Update financial overview
    function updateFinancialOverview(results) {
        // Get Portnox data
        const portnoxTco = results.tco['portnox'] || 0;
        
        // Find main competitor
        let competitorId = null;
        let competitorTco = 0;
        for (const vendorId in results.tco) {
            if (vendorId !== 'portnox') {
                competitorId = vendorId;
                competitorTco = results.tco[vendorId];
                break;
            }
        }
        
        // Update metrics
        const elements = {
            'portnox-tco': formatCurrency(portnoxTco),
            'tco-comparison': competitorId ? `vs. ${formatCurrency(competitorTco)} (${getVendorName(competitorId)})` : "N/A",
            
            // Add more financial metrics here
        };
        
        // Update all elements
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }
    
    // Update security overview
    function updateSecurityOverview(results) {
        // Security metrics - simplified for this fix
        const elements = {
            'security-improvement': `${results.security['portnox'] || 74}%`,
            'compliance-coverage': '93%',
            'breach-probability': 'Low',
            'mttr': '52 min'
        };
        
        // Update all elements
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }
    
    // Update metrics display
    function updateMetricsDisplay(vendors) {
        console.log(`Updating metrics display for vendors: ${vendors.join(', ')}`);
        
        // Calculate results
        const results = calculateResults(vendors);
        
        // Update UI
        updateResults(results);
        
        console.log("Metrics display updated");
    }
    
    // Show toast notification
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('fadeout');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    // Helper function to calculate TCO
    function calculateTco(vendorData) {
        if (!vendorData) return 0;
        
        let initialCosts = 0;
        let annualCosts = 0;
        
        // Calculate initial costs
        if (vendorData.initialCosts) {
            initialCosts += (vendorData.initialCosts.hardware || 0);
            initialCosts += (vendorData.initialCosts.software || 0);
            initialCosts += (vendorData.initialCosts.implementation || 0);
        } else {
            // Backward compatibility
            initialCosts += (vendorData.initialHardware || 0);
            initialCosts += (vendorData.initialSoftware || 0);
            initialCosts += (vendorData.initialImplementation || 0);
        }
        
        // Calculate annual costs for 3 years
        if (vendorData.annualCosts) {
            annualCosts += (vendorData.annualCosts.licensing || 0) * 3;
            annualCosts += (vendorData.annualCosts.maintenance || 0) * 3;
            annualCosts += (vendorData.annualCosts.support || 0) * 3;
            annualCosts += (vendorData.annualCosts.personnel || 0) * 3;
        } else {
            // Backward compatibility
            annualCosts += (vendorData.annualLicensing || 0) * 3;
            annualCosts += (vendorData.annualMaintenance || 0) * 3;
            annualCosts += (vendorData.annualSupport || 0) * 3;
            annualCosts += (vendorData.annualPersonnel || 0) * 3;
        }
        
        return initialCosts + annualCosts;
    }
    
    // Helper function to get vendor data
    function getVendorData(vendorId) {
        if (!vendorId) return null;
        
        // Try different possible sources of vendor data
        if (window.vendorData && window.vendorData[vendorId]) {
            return window.vendorData[vendorId];
        }
        
        if (window.vendorDetails && window.vendorDetails[vendorId]) {
            return window.vendorDetails[vendorId];
        }
        
        return null;
    }
    
    // Helper function to get vendor name
    function getVendorName(vendorId) {
        const data = getVendorData(vendorId);
        return data ? data.name : vendorId;
    }
    
    // Helper function to format currency
    function formatCurrency(value) {
        return '$' + Math.round(value).toLocaleString();
    }
    
    // Run initial calculation
    function runInitialCalculation() {
        console.log("Running initial calculation...");
        
        // Get currently selected vendors
        const selectedCards = document.querySelectorAll('.vendor-card.selected');
        selectedVendors = Array.from(selectedCards).map(card => card.dataset.vendor);
        
        // Ensure Portnox is always included
        if (!selectedVendors.includes('portnox')) {
            selectedVendors.unshift('portnox');
        }
        
        console.log(`Selected vendors for calculations: ${selectedVendors.join(', ')}`);
        
        // Update calculations and UI
        updateCalculations(selectedVendors);
    }
    
    // Initialize the module
    function initialize() {
        console.log("Initializing vendor selection fix...");
        
        // Fix vendor selection
        fixVendorSelection();
        
        // Fix calculate buttons
        fixCalculateButtons();
        
        // Run initial calculation
        runInitialCalculation();
        
        console.log("Vendor selection fix initialized");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
