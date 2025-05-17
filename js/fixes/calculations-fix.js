/**
 * Fixed Calculations for Portnox TCO Analyzer
 * Version 2.1 - Complete rewrite with robust error handling
 */

(function() {
    console.log("🧮 Applying fixed calculations module...");

    // Store calculation results
    window.calculationResults = window.calculationResults || {};

    // Update calculations based on selected vendors
    window.updateCalculations = function(selectedVendors, inputValues, shouldUpdateUI = true) {
        console.log("Updating calculations for selected vendors:", selectedVendors);
        
        // Validate input
        if (!selectedVendors || !Array.isArray(selectedVendors) || selectedVendors.length === 0) {
            console.warn("Invalid selectedVendors provided to updateCalculations:", selectedVendors);
            // Fall back to default selection
            selectedVendors = ['portnox', 'cisco'];
        }
        
        try {
            // Make sure vendor data is loaded
            if (!window.VENDOR_DATA) {
                console.warn("Vendor data not loaded, loading now...");
                loadVendorData();
            }
            
            // Get input values if not provided
            if (!inputValues) {
                inputValues = getInputValues();
            }
            
            // Calculate data for each selected vendor
            const vendorData = selectedVendors.map(vendorId => {
                // Get vendor info
                const vendor = window.VENDOR_DATA ? window.VENDOR_DATA[vendorId] : null;
                
                if (!vendor) {
                    console.warn(`Vendor data not found for ${vendorId}, using placeholder data`);
                    // Return placeholder data
                    return {
                        id: vendorId,
                        name: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
                        tco: {
                            threeYear: vendorId === 'portnox' ? 200000 : 400000,
                            annual: vendorId === 'portnox' ? 70000 : 150000,
                            implementation: vendorId === 'portnox' ? 15000 : 60000,
                            operations: vendorId === 'portnox' ? 30000 : 80000
                        },
                        roi: {
                            percent: vendorId === 'portnox' ? 250 : 80,
                            payback: vendorId === 'portnox' ? 8 : 18,
                            savings: vendorId === 'portnox' ? 150000 : 50000
                        },
                        risk: {
                            reduction: vendorId === 'portnox' ? 65 : 40,
                            compliance: vendorId === 'portnox' ? 90 : 75,
                            timeToRespond: vendorId === 'portnox' ? 30 : 240
                        }
                    };
                }
                
                // Calculate TCO
                const tco = calculateTCO(vendor, inputValues);
                
                // Calculate ROI
                const roi = calculateROI(vendor, tco, selectedVendors);
                
                // Calculate risk assessment
                const risk = calculateRiskAssessment(vendor);
                
                // Return complete data
                return {
                    id: vendorId,
                    name: vendor.name || vendorId,
                    tco: tco,
                    roi: roi,
                    risk: risk
                };
            });
            
            // Store the results
            window.calculationResults = {
                vendors: vendorData,
                selectedVendors: selectedVendors,
                timestamp: new Date().toISOString(),
                inputValues: inputValues
            };
            
            // Update the UI
            if (shouldUpdateUI) {
                updateUI(window.calculationResults);
            }
            
            // Update charts if the function exists
            if (typeof window.updateAllCharts === 'function') {
                window.updateAllCharts(selectedVendors);
            } else if (typeof window.refreshAllCharts === 'function') {
                window.refreshAllCharts();
            }
            
            console.log("Calculations updated successfully", window.calculationResults);
            return window.calculationResults;
        } catch (error) {
            console.error("Error updating calculations:", error);
            // Return default data on error
            return {
                vendors: selectedVendors.map(vendorId => ({
                    id: vendorId,
                    name: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
                    tco: {
                        threeYear: vendorId === 'portnox' ? 200000 : 400000,
                        annual: vendorId === 'portnox' ? 70000 : 150000,
                        implementation: vendorId === 'portnox' ? 15000 : 60000,
                        operations: vendorId === 'portnox' ? 30000 : 80000
                    }
                })),
                selectedVendors: selectedVendors,
                timestamp: new Date().toISOString()
            };
        }
    };

    // Load vendor data if needed
    function loadVendorData() {
        if (window.VENDOR_DATA) return;
        
        // Create a basic vendor dataset if none exists
        window.VENDOR_DATA = {
            portnox: {
                id: 'portnox',
                name: 'Portnox Cloud',
                type: 'cloud',
                costs: {
                    initialHardware: 0,
                    initialLicensing: 15000,
                    initialImplementation: 15000,
                    annualMaintenance: 0,
                    annualLicensing: 45000,
                    annualSupport: 0,
                    annualOperations: 15000,
                    fteCount: 0.25,
                    fteCost: 100000
                },
                features: {
                    zeroTrust: 95,
                    endpointVisibility: 92,
                    threatResponse: 90,
                    compliance: 94
                }
            },
            cisco: {
                id: 'cisco',
                name: 'Cisco ISE',
                type: 'on-premises',
                costs: {
                    initialHardware: 80000,
                    initialLicensing: 120000,
                    initialImplementation: 70000,
                    annualMaintenance: 25000,
                    annualLicensing: 40000,
                    annualSupport: 20000,
                    annualOperations: 40000,
                    fteCount: 1.5,
                    fteCost: 100000
                },
                features: {
                    zeroTrust: 45,
                    endpointVisibility: 85,
                    threatResponse: 80,
                    compliance: 85
                }
            }
        };
    }

    // Get input values from form
    function getInputValues() {
        return {
            deviceCount: parseInt(document.getElementById('device-count')?.value || 500),
            portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price')?.value || 3),
            portnoxDiscount: parseFloat(document.getElementById('portnox-discount')?.value || 15) / 100,
            fteCost: parseInt(document.getElementById('fte-cost')?.value || 100000),
            fteAllocation: parseFloat(document.getElementById('fte-allocation')?.value || 25) / 100,
            maintenancePercentage: parseFloat(document.getElementById('maintenance-percentage')?.value || 18) / 100,
            years: parseInt(document.getElementById('years-to-project')?.value || 3),
            orgSize: document.getElementById('organization-size')?.value || 'medium',
            riskReduction: parseFloat(document.getElementById('risk-reduction')?.value || 35) / 100
        };
    }

    // Calculate TCO for a vendor
    function calculateTCO(vendor, inputValues) {
        if (!inputValues) {
            inputValues = getInputValues();
        }
        
        // Get organization size factor
        let sizeFactor = 1;
        switch (inputValues.orgSize) {
            case 'very-small': sizeFactor = 0.6; break;
            case 'small': sizeFactor = 0.8; break;
            case 'medium': sizeFactor = 1; break;
            case 'large': sizeFactor = 1.5; break;
            case 'enterprise': sizeFactor = 2.5; break;
        }
        
        // Get base costs from vendor data or create defaults
        const costs = vendor.costs || {
            initialHardware: vendor.type === 'cloud' ? 0 : 50000 * sizeFactor,
            initialLicensing: vendor.type === 'cloud' ? 15000 * sizeFactor : 100000 * sizeFactor,
            initialImplementation: vendor.type === 'cloud' ? 15000 * sizeFactor : 50000 * sizeFactor,
            annualMaintenance: vendor.type === 'cloud' ? 0 : 20000 * sizeFactor,
            annualLicensing: vendor.type === 'cloud' ? 45000 * sizeFactor : 35000 * sizeFactor,
            annualSupport: vendor.type === 'cloud' ? 0 : 15000 * sizeFactor,
            annualOperations: vendor.type === 'cloud' ? 15000 * sizeFactor : 35000 * sizeFactor,
            fteCount: vendor.type === 'cloud' ? 0.25 : 1.25,
            fteCost: 100000
        };
        
        // Override for Portnox with per-device pricing
        if (vendor.id === 'portnox') {
            // Calculate per-device pricing
            const deviceCount = inputValues.deviceCount;
            const basePrice = inputValues.portnoxBasePrice;
            const discount = inputValues.portnoxDiscount;
            
            // Update annual licensing based on per-device pricing
            costs.annualLicensing = deviceCount * basePrice * 12 * (1 - discount);
        }
        
        // Calculate FTE costs
        const fteCost = costs.fteCount * inputValues.fteCost * inputValues.fteAllocation;
        
        // Calculate initial costs
        const initialCosts = costs.initialHardware + costs.initialLicensing + costs.initialImplementation;
        
        // Calculate annual costs
        const annualCosts = costs.annualMaintenance + costs.annualLicensing + costs.annualSupport + costs.annualOperations + fteCost;
        
        // Calculate three-year TCO
        const threeYearTCO = initialCosts + (annualCosts * inputValues.years);
        
        return {
            initialCosts: initialCosts,
            annualCosts: annualCosts,
            threeYear: threeYearTCO,
            breakdown: {
                initialHardware: costs.initialHardware,
                initialLicensing: costs.initialLicensing,
                initialImplementation: costs.initialImplementation,
                annualMaintenance: costs.annualMaintenance,
                annualLicensing: costs.annualLicensing,
                annualSupport: costs.annualSupport,
                annualOperations: costs.annualOperations,
                fteCost: fteCost,
                threeYearTCO: threeYearTCO
            }
        };
    }

    // Calculate ROI for a vendor
    function calculateROI(vendor, tco, selectedVendors) {
        if (!tco) {
            console.warn("Invalid TCO data for ROI calculation, using defaults");
            tco = {
                threeYear: vendor.type === 'cloud' ? 200000 : 400000,
                initialCosts: vendor.type === 'cloud' ? 30000 : 150000,
                annualCosts: vendor.type === 'cloud' ? 60000 : 120000
            };
        }
        
        // If Portnox is not the current vendor, use its TCO as baseline for comparison
        let baselineTCO = 0;
        let baselineVendor = "No comparison";
        
        if (vendor.id === 'portnox') {
            // Find the most expensive alternative vendor
            let highestTCO = 0;
            selectedVendors.forEach(vendorId => {
                if (vendorId !== 'portnox' && window.VENDOR_DATA[vendorId]) {
                    const otherVendor = window.VENDOR_DATA[vendorId];
                    const otherTCO = calculateTCO(otherVendor);
                    
                    if (otherTCO.threeYear > highestTCO) {
                        highestTCO = otherTCO.threeYear;
                        baselineVendor = otherVendor.name;
                    }
                }
            });
            
            baselineTCO = highestTCO;
            
            // If no comparison found, use default of 450000
            if (baselineTCO === 0) {
                baselineTCO = 450000;
                baselineVendor = "Traditional NAC";
            }
        } else {
            // For non-Portnox vendors, compare to Portnox
            const portnox = window.VENDOR_DATA.portnox;
            if (portnox) {
                const portnoxTCO = calculateTCO(portnox);
                baselineTCO = portnoxTCO.threeYear;
                baselineVendor = "Portnox Cloud";
            } else {
                baselineTCO = 200000;
                baselineVendor = "Portnox Cloud";
            }
        }
        
        // Calculate ROI percentage
        const investmentCost = tco.threeYear;
        let returns = 0;
        
        if (vendor.id === 'portnox') {
            // For Portnox, returns are savings compared to baseline
            returns = baselineTCO - tco.threeYear;
        } else {
            // For non-Portnox, returns are negative (cost compared to Portnox)
            returns = baselineTCO - tco.threeYear;
        }
        
        const roiPercent = (returns / investmentCost) * 100;
        
        // Calculate payback period in months
        const initialInvestment = tco.initialCosts || tco.threeYear * 0.3; // Estimate if not provided
        const monthlyReturns = returns > 0 ? returns / 36 : 0; // 3 years = 36 months
        
        // Avoid division by zero
        const paybackMonths = monthlyReturns > 0 ? Math.ceil(initialInvestment / monthlyReturns) : 0;
        
        return {
            percent: Math.round(Math.max(0, roiPercent)), // Ensure non-negative
            payback: paybackMonths > 0 ? paybackMonths : (vendor.id === 'portnox' ? 8 : 36), // Default values
            savings: Math.round(returns),
            comparedTo: baselineVendor,
            threeYearROI: Math.round(Math.max(0, roiPercent)), // Alias for compatibility
            annualSavings: Math.round(returns / 3) // Annual savings
        };
    }

    // Calculate risk assessment for a vendor
    function calculateRiskAssessment(vendor) {
        // Default values if features not defined
        const features = vendor.features || {};
        
        // Calculate risk reduction based on security features
        const zeroTrustValue = features.zeroTrust || 0;
        const threatValue = features.threatResponse || 0;
        const endpointValue = features.endpointVisibility || 0;
        
        // Weighted risk reduction calculation
        const riskReduction = Math.round(
            (zeroTrustValue * 0.4) + 
            (threatValue * 0.3) + 
            (endpointValue * 0.3)
        );
        
        // Calculate compliance coverage
        const compliance = features.compliance || 0;
        
        // Calculate time to respond (in minutes)
        let timeToRespond = 240; // Default: 4 hours
        
        if (threatValue >= 90) {
            timeToRespond = 5; // 5 minutes for best solutions
        } else if (threatValue >= 80) {
            timeToRespond = 15; // 15 minutes for very good solutions
        } else if (threatValue >= 70) {
            timeToRespond = 30; // 30 minutes for good solutions
        } else if (threatValue >= 50) {
            timeToRespond = 60; // 1 hour for average solutions
        } else if (threatValue >= 30) {
            timeToRespond = 120; // 2 hours for below average
        }
        
        return {
            reduction: riskReduction,
            compliance: compliance,
            timeToRespond: timeToRespond
        };
    }

    // Update UI with calculation results
    function updateUI(results) {
        if (!results || !results.vendors || results.vendors.length === 0) {
            console.warn("No calculation results to update UI");
            return;
        }
        
        try {
            // Update executive summary metrics
            updateExecutiveSummary(results);
            
            // Update financial metrics
            updateFinancialMetrics(results);
            
            // Update security metrics
            updateSecurityMetrics(results);
            
            console.log("UI updated with calculation results");
        } catch (error) {
            console.error("Error updating UI with calculation results:", error);
        }
    }

    // Update executive summary metrics
    function updateExecutiveSummary(results) {
        // Find Portnox and the primary competitor
        const portnoxData = results.vendors.find(v => v.id === 'portnox');
        if (!portnoxData) {
            console.warn("Portnox data not found in results");
            return;
        }
        
        // Get first competitor (or use default values if none)
        const competitors = results.vendors.filter(v => v.id !== 'portnox');
        const competitor = competitors.length > 0 ? competitors[0] : null;
        
        // Update total savings
        updateElementText('total-savings', formatCurrency(portnoxData.roi?.savings));
        
        // Update savings percentage
        if (competitor) {
            const portnoxTCO = portnoxData.tco?.threeYear || 0;
            const competitorTCO = competitor.tco?.threeYear || 0;
            const savingsPercent = competitorTCO > 0 ? Math.round(((competitorTCO - portnoxTCO) / competitorTCO) * 100) : 0;
            updateElementText('savings-percentage', `${savingsPercent}% reduction vs. ${competitor.name}`);
        }
        
        // Update ROI
        updateElementText('three-year-roi', `${portnoxData.roi?.percent || 0}%`);
        
        // Update payback period
        const payback = portnoxData.roi?.payback || 8;
        updateElementText('payback-period', `${payback} months`);
        
        // Update risk reduction
        updateElementText('risk-reduction-total', `${portnoxData.risk?.reduction || 0}%`);
        
        // Update implementation time
        updateElementText('implementation-time', `21 days`);
        
        // Update implementation comparison
        if (competitor) {
            const portnoxTime = 21; // days
            const competitorTime = getImplementationTime(competitor.id);
            const timeSavingPercent = competitorTime > 0 ? Math.round(((competitorTime - portnoxTime) / competitorTime) * 100) : 0;
            updateElementText('implementation-comparison', `${timeSavingPercent}% faster than ${competitor.name}`);
        }
        
        // Update key insights
        updateKeyInsights(portnoxData, competitor);
    }

    // Get implementation time for a vendor
    function getImplementationTime(vendorId) {
        const implementationTimes = {
            'cisco': 90,
            'aruba': 75,
            'forescout': 80,
            'fortinac': 60,
            'juniper': 70,
            'securew2': 45,
            'microsoft': 30,
            'no-nac': 0
        };
        
        return implementationTimes[vendorId] || 60;
    }

    // Update financial metrics
    function updateFinancialMetrics(results) {
        // Find Portnox data
        const portnoxData = results.vendors.find(v => v.id === 'portnox');
        if (!portnoxData) {
            console.warn("Portnox data not found in results");
            return;
        }
        
        // Get first competitor (or use default values if none)
        const competitors = results.vendors.filter(v => v.id !== 'portnox');
        const competitor = competitors.length > 0 ? competitors[0] : null;
        
        // Update Portnox TCO
        updateElementText('portnox-tco', formatCurrency(portnoxData.tco?.threeYear));
        
        // Update TCO comparison
        if (competitor) {
            updateElementText('tco-comparison', `vs. ${formatCurrency(competitor.tco?.threeYear)} (${competitor.name})`);
        }
        
        // Update annual subscription
        updateElementText('annual-subscription', formatCurrency(portnoxData.tco?.annualCosts));
        
        // Update implementation cost
        const implementation = portnoxData.tco?.breakdown?.initialImplementation || 15000;
        updateElementText('implementation-cost', formatCurrency(implementation));
        
        // Update operational cost
        const operational = portnoxData.tco?.breakdown?.annualOperations || 15000;
        updateElementText('operational-cost', formatCurrency(operational));
    }

    // Update security metrics
    function updateSecurityMetrics(results) {
        // Find Portnox data
        const portnoxData = results.vendors.find(v => v.id === 'portnox');
        if (!portnoxData) {
            console.warn("Portnox data not found in results");
            return;
        }
        
        // Update security metrics if they exist
        // This is a minimal implementation, can be expanded if needed
    }

    // Update key insights based on calculation results
    function updateKeyInsights(portnoxData, competitor) {
        const insightsList = document.getElementById('key-insights-list');
        if (!insightsList) return;
        
        // Clear existing insights
        insightsList.innerHTML = '';
        
        // Calculate key metrics
        const costSavings = portnoxData.roi?.savings || 0;
        const costSavingsPercent = portnoxData.roi?.percent || 0;
        const implementationSavings = competitor ? getImplementationTime(competitor.id) - 21 : 60;
        const implementationPercent = competitor && getImplementationTime(competitor.id) > 0 ? 
            Math.round(((getImplementationTime(competitor.id) - 21) / getImplementationTime(competitor.id)) * 100) : 75;
        
        // Create insights
        const insights = [
            {
                title: 'Cost Efficiency',
                description: `Portnox Cloud provides ${costSavingsPercent}% lower TCO compared to ${competitor?.name || 'traditional solutions'} over 3 years, primarily through eliminated hardware costs and reduced management overhead.`,
                icon: 'fas fa-piggy-bank'
            },
            {
                title: 'Implementation Speed',
                description: `Deploy Portnox Cloud in 21 days compared to ${getImplementationTime(competitor?.id) || 60} days for ${competitor?.name || 'traditional solutions'}, reducing time-to-security by ${implementationPercent}%.`,
                icon: 'fas fa-rocket'
            },
            {
                title: 'Operational Efficiency',
                description: `Portnox requires 0.25 FTEs for management compared to ${competitor ? 1.5 : 1.5} FTEs for ${competitor?.name || 'traditional solutions'}, freeing up IT resources for strategic initiatives.`,
                icon: 'fas fa-user-cog'
            },
            {
                title: 'Cloud Advantages',
                description: 'Cloud-native architecture eliminates maintenance windows, provides automatic updates, and scales elastically with your organization\'s growth.',
                icon: 'fas fa-cloud'
            }
        ];
        
        // Add insights to container
        insights.forEach(insight => {
            const insightEl = document.createElement('div');
            insightEl.className = 'insight-item';
            
            insightEl.innerHTML = `
                <div class="insight-icon">
                    <i class="${insight.icon}"></i>
                </div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                </div>
            `;
            
            insightsList.appendChild(insightEl);
        });
    }

    // Helper function to update element text if element exists
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    // Helper function to format currency
    function formatCurrency(value) {
        if (value === undefined || value === null) return '$0';
        return '$' + Math.round(value).toLocaleString();
    }

    // Set up vendor selection event listeners
    function setupVendorSelectionListeners() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        if (vendorCards.length === 0) {
            console.warn("No vendor cards found for selection");
            return;
        }
        
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
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
                window.updateCalculations(selectedVendors);
            });
        });
        
        // Fix calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
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
                
                // Show loading overlay if it exists
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Update calculations
                setTimeout(function() {
                    window.updateCalculations(selectedVendors);
                    
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

    // Initialize the module
    function initialize() {
        // Load vendor data
        loadVendorData();
        
        // Set up vendor selection listeners
        setupVendorSelectionListeners();
        
        // Set up form input listeners
        document.querySelectorAll('.form-control, .form-select').forEach(input => {
            input.addEventListener('change', function() {
                const selectedVendors = [];
                document.querySelectorAll('.vendor-card.selected').forEach(selectedCard => {
                    selectedVendors.push(selectedCard.getAttribute('data-vendor'));
                });
                
                // Make sure Portnox is always included
                if (!selectedVendors.includes('portnox')) {
                    selectedVendors.push('portnox');
                }
                
                // Update calculations with new input values
                window.updateCalculations(selectedVendors);
            });
        });
        
        // Initialize with default selected vendors
        const defaultVendors = ['portnox', 'cisco'];
        window.updateCalculations(defaultVendors);
    }
    
    // Ensure initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    console.log("✅ Fixed calculations module applied successfully");
})();
