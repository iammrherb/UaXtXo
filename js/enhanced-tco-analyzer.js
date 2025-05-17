/**
 * Enhanced TCO Analyzer - Main Integration Script
 * Integrates the vendor data and framework components with the existing application
 */

// Global calculator state
window.calculatorState = {
    selectedVendors: ['portnox'],
    selectedIndustry: '',
    selectedCompliance: [],
    riskProfile: 'standard',
    insuranceTier: 'standard',
    organizationSize: 'small',
    deviceCount: 500,
    locations: 2,
    networkRequirements: {
        cloudIntegration: false,
        legacyDevices: false,
        byodSupport: true,
        iotSupport: false,
        wirelessSupport: true,
        remoteWork: true
    },
    yearsToProject: 3,
    costParameters: {
        portnoxBasePrice: 3.00,
        portnoxDiscount: 15,
        fteCost: 100000,
        fteAllocation: 25,
        maintenancePercentage: 18,
        downtimeCost: 5000,
        riskReduction: 35,
        insuranceReduction: 10
    }
};

// Initialization function
function initEnhancedTCOAnalyzer() {
    // Load the vendor data if not already available
    if (!window.VENDOR_DATA) {
        console.error('Vendor data not loaded. Please ensure vendor-data.js is included before this script.');
        return;
    }
    
    // Attach event listeners to the vendor selection cards
    initVendorSelection();
    
    // Initialize sliders and form elements
    initFormElements();
    
    // Set up calculation button handlers
    initCalculationHandlers();
    
    // Set up event-driven updates
    initEventDrivenUpdates();
    
    // Initialize chart optimizations
    initChartOptimizations();
    
    console.log('Enhanced TCO Analyzer initialized successfully');
}

// Initialize vendor selection cards
function initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        const vendorId = card.getAttribute('data-vendor');
        
        // Ensure the vendor exists in our data
        if (window.VENDOR_DATA[vendorId]) {
            // Update selection state if needed
            if (window.calculatorState.selectedVendors.includes(vendorId)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            
            // Add click event handler
            card.addEventListener('click', function() {
                // Toggle selection (except for Portnox which is always selected)
                if (vendorId !== 'portnox') {
                    if (this.classList.contains('selected')) {
                        this.classList.remove('selected');
                        // Remove from state
                        const index = window.calculatorState.selectedVendors.indexOf(vendorId);
                        if (index !== -1) {
                            window.calculatorState.selectedVendors.splice(index, 1);
                        }
                    } else {
                        this.classList.add('selected');
                        // Add to state if not already included
                        if (!window.calculatorState.selectedVendors.includes(vendorId)) {
                            window.calculatorState.selectedVendors.push(vendorId);
                        }
                    }
                    
                    // Trigger calculations
                    calculateResults();
                }
            });
        }
    });
}

// Initialize form elements
function initFormElements() {
    // Organization size select
    const orgSizeSelect = document.getElementById('organization-size');
    if (orgSizeSelect) {
        orgSizeSelect.value = window.calculatorState.organizationSize;
        orgSizeSelect.addEventListener('change', function() {
            window.calculatorState.organizationSize = this.value;
            updateDeviceCount(this.value);
            
            // Trigger recalculation when changed
            calculateResults();
        });
    }
    
    // Device count input
    const deviceCountInput = document.getElementById('device-count');
    if (deviceCountInput) {
        deviceCountInput.value = window.calculatorState.deviceCount;
        deviceCountInput.addEventListener('input', function() {
            window.calculatorState.deviceCount = parseInt(this.value) || 500;
            
            // Update organization size based on device count
            updateOrganizationSize(window.calculatorState.deviceCount);
            
            // Trigger recalculation when changed
            calculateResults();
        });
    }
    
    // Locations input
    const locationsInput = document.getElementById('locations');
    if (locationsInput) {
        locationsInput.value = window.calculatorState.locations;
        locationsInput.addEventListener('input', function() {
            window.calculatorState.locations = parseInt(this.value) || 1;
            
            // Trigger recalculation when changed
            calculateResults();
        });
    }
    
    // Network requirements checkboxes
    const networkRequirements = ['cloud-integration', 'legacy-devices', 'byod-support', 
                                'iot-support', 'wireless-support', 'remote-work'];
    
    networkRequirements.forEach(req => {
        const checkbox = document.getElementById(req);
        if (checkbox) {
            // Convert checkbox ID to camelCase property name
            const propName = req.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            
            // Set initial value
            checkbox.checked = window.calculatorState.networkRequirements[propName];
            
            // Add event listener
            checkbox.addEventListener('change', function() {
                window.calculatorState.networkRequirements[propName] = this.checked;
                
                // Trigger recalculation when changed
                calculateResults();
            });
        }
    });
    
    // Analysis period select
    const yearsSelect = document.getElementById('years-to-project');
    if (yearsSelect) {
        yearsSelect.value = window.calculatorState.yearsToProject;
        yearsSelect.addEventListener('change', function() {
            window.calculatorState.yearsToProject = parseInt(this.value) || 3;
            
            // Trigger recalculation when changed
            calculateResults();
        });
    }
    
    // Cost parameter sliders
    initCostParameterSliders();
}

// Initialize cost parameter sliders
function initCostParameterSliders() {
    // Portnox base price slider
    const basePrice = document.getElementById('portnox-base-price');
    const basePriceValue = document.getElementById('portnox-cost-value');
    
    if (basePrice && basePriceValue) {
        basePrice.value = window.calculatorState.costParameters.portnoxBasePrice;
        basePriceValue.textContent = `$${window.calculatorState.costParameters.portnoxBasePrice.toFixed(2)}`;
        
        basePrice.addEventListener('input', function() {
            window.calculatorState.costParameters.portnoxBasePrice = parseFloat(this.value);
            basePriceValue.textContent = `$${window.calculatorState.costParameters.portnoxBasePrice.toFixed(2)}`;
            
            // Use batch updates for efficient UI updates
            if (!window.updatePending) {
                window.updatePending = true;
                requestAnimationFrame(() => {
                    calculateResults();
                    window.updatePending = false;
                });
            }
        });
    }
    
    // Portnox discount slider
    const discount = document.getElementById('portnox-discount');
    const discountValue = document.getElementById('portnox-discount-value');
    
    if (discount && discountValue) {
        discount.value = window.calculatorState.costParameters.portnoxDiscount;
        discountValue.textContent = `${window.calculatorState.costParameters.portnoxDiscount}%`;
        
        discount.addEventListener('input', function() {
            window.calculatorState.costParameters.portnoxDiscount = parseInt(this.value);
            discountValue.textContent = `${window.calculatorState.costParameters.portnoxDiscount}%`;
            
            // Use batch updates for efficient UI updates
            if (!window.updatePending) {
                window.updatePending = true;
                requestAnimationFrame(() => {
                    calculateResults();
                    window.updatePending = false;
                });
            }
        });
    }
    
    // FTE cost slider
    const fteCost = document.getElementById('fte-cost');
    const fteCostValue = document.getElementById('fte-cost-value');
    
    if (fteCost && fteCostValue) {
        fteCost.value = window.calculatorState.costParameters.fteCost;
        fteCostValue.textContent = `$${window.calculatorState.costParameters.fteCost.toLocaleString()}`;
        
        fteCost.addEventListener('input', function() {
            window.calculatorState.costParameters.fteCost = parseInt(this.value);
            fteCostValue.textContent = `$${window.calculatorState.costParameters.fteCost.toLocaleString()}`;
            
            // Use batch updates for efficient UI updates
            if (!window.updatePending) {
                window.updatePending = true;
                requestAnimationFrame(() => {
                    calculateResults();
                    window.updatePending = false;
                });
            }
        });
    }
    
    // FTE allocation slider
    const fteAllocation = document.getElementById('fte-allocation');
    const fteAllocationValue = document.getElementById('fte-allocation-value');
    
    if (fteAllocation && fteAllocationValue) {
        fteAllocation.value = window.calculatorState.costParameters.fteAllocation;
        fteAllocationValue.textContent = `${window.calculatorState.costParameters.fteAllocation}%`;
        
        fteAllocation.addEventListener('input', function() {
            window.calculatorState.costParameters.fteAllocation = parseInt(this.value);
            fteAllocationValue.textContent = `${window.calculatorState.costParameters.fteAllocation}%`;
            
            // Use batch updates for efficient UI updates
            if (!window.updatePending) {
                window.updatePending = true;
                requestAnimationFrame(() => {
                    calculateResults();
                    window.updatePending = false;
                });
            }
        });
    }
    
    // Additional sliders (maintenance, downtime, risk reduction, insurance)
    const additionalSliders = [
        { id: 'maintenance-percentage', valueId: 'maintenance-value', prop: 'maintenancePercentage', format: (v) => `${v}%` },
        { id: 'downtime-cost', valueId: 'downtime-cost-value', prop: 'downtimeCost', format: (v) => `$${v.toLocaleString()}` },
        { id: 'risk-reduction', valueId: 'risk-reduction-value', prop: 'riskReduction', format: (v) => `${v}%` },
        { id: 'insurance-reduction', valueId: 'insurance-reduction-value', prop: 'insuranceReduction', format: (v) => `${v}%` }
    ];
    
    additionalSliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        const valueElement = document.getElementById(slider.valueId);
        
        if (element && valueElement) {
            element.value = window.calculatorState.costParameters[slider.prop];
            valueElement.textContent = slider.format(window.calculatorState.costParameters[slider.prop]);
            
            element.addEventListener('input', function() {
                window.calculatorState.costParameters[slider.prop] = parseInt(this.value);
                valueElement.textContent = slider.format(window.calculatorState.costParameters[slider.prop]);
                
                // Use batch updates for efficient UI updates
                if (!window.updatePending) {
                    window.updatePending = true;
                    requestAnimationFrame(() => {
                        calculateResults();
                        window.updatePending = false;
                    });
                }
            });
        }
    });
}

// Helper function to update device count based on organization size
function updateDeviceCount(size) {
    // Map organization size to approximate device count
    const sizeMappings = {
        'very-small': 250,
        'small': 500,
        'medium': 2500,
        'large': 7500,
        'enterprise': 15000
    };
    
    // Update device count if mapping exists
    if (sizeMappings[size]) {
        window.calculatorState.deviceCount = sizeMappings[size];
        
        // Update input field if it exists
        const deviceCountInput = document.getElementById('device-count');
        if (deviceCountInput) {
            deviceCountInput.value = window.calculatorState.deviceCount;
        }
    }
}

// Helper function to update organization size based on device count
function updateOrganizationSize(count) {
    let newSize = 'small';
    
    if (count < 300) {
        newSize = 'very-small';
    } else if (count >= 300 && count < 1000) {
        newSize = 'small';
    } else if (count >= 1000 && count < 5000) {
        newSize = 'medium';
    } else if (count >= 5000 && count < 10000) {
        newSize = 'large';
    } else {
        newSize = 'enterprise';
    }
    
    // Update only if different
    if (window.calculatorState.organizationSize !== newSize) {
        window.calculatorState.organizationSize = newSize;
        
        // Update select field if it exists
        const orgSizeSelect = document.getElementById('organization-size');
        if (orgSizeSelect) {
            orgSizeSelect.value = newSize;
        }
    }
}

// Set up calculation button handlers
function initCalculationHandlers() {
    // Main calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Show loading overlay
            showLoadingOverlay();
            
            // Perform calculation with slight delay to allow UI updates
            setTimeout(() => {
                calculateResults();
                hideLoadingOverlay();
            }, 500);
        });
    }
    
    // Header calculate button
    const headerCalculateBtn = document.getElementById('calculate-btn-header');
    if (headerCalculateBtn) {
        headerCalculateBtn.addEventListener('click', function() {
            // Show loading overlay
            showLoadingOverlay();
            
            // Perform calculation with slight delay to allow UI updates
            setTimeout(() => {
                calculateResults();
                hideLoadingOverlay();
            }, 500);
        });
    }
}

// Set up event-driven updates
function initEventDrivenUpdates() {
    // Tab change handlers
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    // View tab handlers
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active tab
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding view panel
            const viewPanels = document.querySelectorAll('.view-panel');
            viewPanels.forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            
            // Update charts in the newly active view
            updateChartsInView(view);
        });
    });
    
    // Results tab handlers
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panel = this.getAttribute('data-panel');
            const parentView = this.closest('.view-panel');
            
            if (!parentView) return;
            
            // Update active tab
            const siblingTabs = parentView.querySelectorAll('.results-tab');
            siblingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding results panel
            const resultPanels = parentView.querySelectorAll('.results-panel');
            resultPanels.forEach(p => {
                if (p.id === panel) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
            
            // Update charts in the newly active panel
            updateChartsInPanel(panel);
        });
    });
    
    // Sidebar toggle handler
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    
    if (sidebarToggle && sidebar && contentArea) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            contentArea.classList.toggle('expanded');
            
            // Update toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-right';
                } else {
                    icon.className = 'fas fa-chevron-left';
                }
            }
            
            // Update charts after collapse/expand
            setTimeout(() => {
                updateAllCharts();
            }, 300);
        });
    }
    
    // Sidebar card toggle handlers
    const cardHeaders = document.querySelectorAll('.config-card-header');
    
    cardHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const card = this.closest('.config-card');
            if (!card) return;
            
            card.classList.toggle('collapsed');
            
            // Toggle chevron icon
            const icon = this.querySelector('i');
            if (icon) {
                if (card.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-mode')) {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
            
            // Update charts with new theme
            updateAllCharts();
        });
    }
    
    // Help button and modal
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const modalClose = helpModal?.querySelector('.modal-close');
    
    if (helpBtn && helpModal) {
        helpBtn.addEventListener('click', function() {
            helpModal.style.display = 'block';
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                helpModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
    }
    
    // Export PDF button
    const exportPdfBtn = document.getElementById('export-pdf');
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            generatePDFReport();
        });
    }
}

// Initialize Chart.js optimizations
function initChartOptimizations() {
    // Set global defaults for better performance
    if (window.Chart) {
        Chart.defaults.animation.duration = 600;
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        
        // Get text color based on theme
        const isDarkMode = document.body.classList.contains('dark-mode');
        const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        
        // Update global defaults for fonts
        Chart.defaults.color = textColor;
        Chart.defaults.font.family = "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
    }
}

// Show loading overlay
function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Main calculation function
function calculateResults() {
    // Gather inputs
    const inputs = gatherInputs();
    
    // Calculate TCO for each selected vendor
    const results = calculateTCO(inputs);
    
    // Update UI with results
    updateResults(results);
    
    // Update charts
    updateCharts(results);
    
    // Return the results for potential further use
    return results;
}

// Gather inputs from the form and state
function gatherInputs() {
    // Return all relevant inputs from the calculator state
    return {
        vendors: window.calculatorState.selectedVendors,
        industry: window.calculatorState.selectedIndustry,
        compliance: window.calculatorState.selectedCompliance,
        riskProfile: window.calculatorState.riskProfile,
        insuranceTier: window.calculatorState.insuranceTier,
        deviceCount: window.calculatorState.deviceCount,
        locations: window.calculatorState.locations,
        networkRequirements: window.calculatorState.networkRequirements,
        yearsToProject: window.calculatorState.yearsToProject,
        costParameters: window.calculatorState.costParameters
    };
}

// Calculate TCO for each vendor
function calculateTCO(inputs) {
    const results = {
        vendors: {},
        comparisons: {
            tco: {},
            roi: {},
            riskReduction: {},
            implementationTime: {}
        },
        summary: {}
    };
    
    // Process each selected vendor
    inputs.vendors.forEach(vendorId => {
        const vendor = window.VENDOR_DATA[vendorId];
        if (!vendor) return;
        
        // Get vendor cost model
        const costModel = vendor.costModel || {};
        
        // Calculate subscription costs
        let subscriptionCost = 0;
        if (costModel.type && costModel.type.includes('Subscription')) {
            // For Portnox, use the configurable base price
            let basePrice = vendorId === 'portnox' ? 
                inputs.costParameters.portnoxBasePrice : (costModel.basePrice || 0);
            
            // Apply volume discount
            let discount = vendorId === 'portnox' ? 
                inputs.costParameters.portnoxDiscount : (costModel.averageDiscount || 0);
            
            // Adjust discount based on size for non-Portnox vendors
            if (vendorId !== 'portnox') {
                const sizeMultipliers = {
                    'very-small': 0.5,
                    'small': 0.8,
                    'medium': 1.0,
                    'large': 1.2,
                    'enterprise': 1.5
                };
                
                discount *= sizeMultipliers[inputs.organizationSize] || 1.0;
            }
            
            // Calculate effective price per device
            const effectivePrice = basePrice * (1 - (discount / 100));
            
            // Calculate annual subscription cost
            subscriptionCost = effectivePrice * inputs.deviceCount * 12;
        }
        
        // Calculate implementation costs
        const implementationCost = calculateImplementationCost(vendor, inputs);
        
        // Calculate hardware costs
        const hardwareCost = calculateHardwareCost(vendor, inputs);
        
        // Calculate maintenance costs for on-premises solutions
        let maintenanceCost = 0;
        if (costModel.maintenance > 0) {
            maintenanceCost = (hardwareCost + implementationCost) * 
                (costModel.maintenance / 100) * inputs.yearsToProject;
        }
        
        // Calculate operational costs (FTE)
        const operationalCost = calculateOperationalCost(vendor, inputs);
        
        // Calculate total TCO
        const totalTCO = subscriptionCost * inputs.yearsToProject + 
            implementationCost + hardwareCost + maintenanceCost + operationalCost;
        
        // Calculate ROI metrics
        const roi = calculateROI(vendor, inputs, totalTCO);
        
        // Store results
        results.vendors[vendorId] = {
            name: vendor.name,
            logo: vendor.logo,
            description: vendor.description,
            badge: vendor.badge,
            costs: {
                subscription: subscriptionCost,
                implementation: implementationCost,
                hardware: hardwareCost,
                maintenance: maintenanceCost,
                operational: operationalCost,
                total: totalTCO
            },
            roi: roi,
            security: {
                riskReduction: vendor.riskReduction || 0,
                complianceCoverage: vendor.complianceCoverage || 0,
                insuranceImpact: vendor.insuranceImpact || 0
            },
            implementation: {
                time: vendor.implementationTime,
                complexity: vendor.implementationComplexity,
                expertise: vendor.expertiseNeeded,
                fteRequirements: vendor.fteRequirements
            },
            features: vendor.features || {}
        };
    });
    
    // Generate comparison metrics
    generateComparisons(results);
    
    // Generate summary data
    generateSummary(results, inputs);
    
    return results;
}

// Calculate implementation costs
function calculateImplementationCost(vendor, inputs) {
    // Base implementation cost from vendor data
    let cost = vendor.costModel.implementation || 0;
    
    // Adjust for organization size
    const sizeMultipliers = {
        'very-small': 0.6,
        'small': 1.0,
        'medium': 2.0,
        'large': 3.5,
        'enterprise': 5.0
    };
    
    cost *= sizeMultipliers[inputs.organizationSize] || 1.0;
    
    // Adjust for complexity based on network requirements
    const complexityFactors = {
        cloudIntegration: 0.15,
        legacyDevices: 0.2,
        byodSupport: 0.1,
        iotSupport: 0.25,
        wirelessSupport: 0.1,
        remoteWork: 0.1
    };
    
    let complexityAdjustment = 1.0;
    Object.keys(complexityFactors).forEach(factor => {
        if (inputs.networkRequirements[factor]) {
            complexityAdjustment += complexityFactors[factor];
        }
    });
    
    cost *= complexityAdjustment;
    
    // Adjust for locations
    cost *= Math.max(1.0, Math.sqrt(inputs.locations) * 0.5);
    
    return Math.round(cost);
}

// Calculate hardware costs
function calculateHardwareCost(vendor, inputs) {
    // Base hardware cost from vendor data
    let cost = vendor.costModel.hardware || 0;
    
    // For non-cloud vendors, adjust for organization size
    if (cost > 0) {
        const sizeMultipliers = {
            'very-small': 0.5,
            'small': 1.0,
            'medium': 2.5,
            'large': 4.0,
            'enterprise': 6.0
        };
        
        cost *= sizeMultipliers[inputs.organizationSize] || 1.0;
        
        // Adjust for number of locations
        cost *= Math.max(1.0, Math.log10(inputs.locations) + 1);
    }
    
    return Math.round(cost);
}

// Calculate operational costs
function calculateOperationalCost(vendor, inputs) {
    // Extract FTE allocation for vendor type
    let fteAllocation = 0;
    
    if (vendor.fteRequirements) {
        // Parse FTE from string like "0.1-0.25 FTE" to get average
        const fteParts = vendor.fteRequirements.match(/[\d\.]+/g);
        if (fteParts && fteParts.length > 0) {
            if (fteParts.length === 1) {
                fteAllocation = parseFloat(fteParts[0]);
            } else {
                // Average if range is given
                fteAllocation = (parseFloat(fteParts[0]) + parseFloat(fteParts[1])) / 2;
            }
        } else {
            // Default based on deployment type
            if (vendor.deploymentModel && vendor.deploymentModel.includes('Cloud')) {
                fteAllocation = 0.25;
            } else {
                fteAllocation = 1.0;
            }
        }
    }
    
    // Calculate annual FTE cost
    const annualFTECost = inputs.costParameters.fteCost * fteAllocation;
    
    // Multiply by years to project
    return Math.round(annualFTECost * inputs.yearsToProject);
}

// Calculate ROI metrics
function calculateROI(vendor, inputs, totalCost) {
    // For no-NAC option, return zeros
    if (vendor.name === "No NAC") {
        return {
            savingsVsCisco: 0,
            paybackPeriod: 0,
            threeYearRoi: 0,
            valueDrivers: {
                directCostReduction: 0,
                itStaffEfficiency: 0,
                breachRiskReduction: 0,
                complianceAutomation: 0,
                insurancePremiumReduction: 0
            },
            totalValue: 0
        };
    }
    
    // For ROI calculations we use Cisco ISE as the baseline when available
    const baseline = window.VENDOR_DATA.cisco || null;
    let comparisonCost = 0;
    
    if (baseline) {
        // Calculate Cisco costs for comparison
        const baselineInputs = { ...inputs };
        
        // Calculate approximate Cisco TCO
        const subscriptionCost = (baseline.costModel.basePrice || 8.00) * 
            (1 - (baseline.costModel.averageDiscount || 20) / 100) * 
            inputs.deviceCount * 12 * inputs.yearsToProject;
        
        const implCost = (baseline.costModel.implementation || 50000) * 
            (inputs.organizationSize === 'enterprise' ? 5.0 : 
             inputs.organizationSize === 'large' ? 3.5 : 
             inputs.organizationSize === 'medium' ? 2.0 : 
             inputs.organizationSize === 'small' ? 1.0 : 0.6);
        
        const hwCost = (baseline.costModel.hardware || 50000) * 
            (inputs.organizationSize === 'enterprise' ? 6.0 : 
             inputs.organizationSize === 'large' ? 4.0 : 
             inputs.organizationSize === 'medium' ? 2.5 : 
             inputs.organizationSize === 'small' ? 1.0 : 0.5);
        
        const maintCost = (hwCost + implCost) * 
            (baseline.costModel.maintenance || 18) / 100 * inputs.yearsToProject;
        
        const opCost = inputs.costParameters.fteCost * 1.5 * inputs.yearsToProject;
        
        comparisonCost = subscriptionCost + implCost + hwCost + maintCost + opCost;
    } else {
        // If no Cisco data, use 2x current vendor cost as estimate
        comparisonCost = totalCost * 2.0;
    }
    
    // Calculate savings vs Cisco ISE
    const savingsVsCisco = comparisonCost - totalCost;
    
    // Calculate ROI value drivers
    const directCostReduction = Math.round(savingsVsCisco * 0.4); // 40% of savings
    const itStaffEfficiency = Math.round(inputs.costParameters.fteCost * 
        inputs.costParameters.fteAllocation / 100 * inputs.yearsToProject * 0.6); // 60% efficiency gain
    
    // Risk reduction value based on vendor's risk reduction percentage
    const breachRiskReduction = Math.round(inputs.costParameters.downtimeCost * 
        (vendor.riskReduction || 35) / 100 * 10); // Assume 10 incidents prevented
    
    // Compliance automation savings
    const complianceAutomation = Math.round(inputs.costParameters.fteCost * 
        inputs.costParameters.fteAllocation / 100 * inputs.yearsToProject * 0.3); // 30% compliance time savings
    
    // Insurance premium reduction
    const annualPremium = inputs.insuranceTier === 'none' ? 0 :
        inputs.insuranceTier === 'basic' ? 25000 :
        inputs.insuranceTier === 'standard' ? 45000 : 85000;
    
    const insurancePremiumReduction = Math.round(annualPremium * 
        (vendor.insuranceImpact || inputs.costParameters.insuranceReduction) / 100 * 
        inputs.yearsToProject);
    
    // Calculate total value
    const totalValue = directCostReduction + itStaffEfficiency + 
        breachRiskReduction + complianceAutomation + insurancePremiumReduction;
    
    // Calculate ROI percentage
    const threeYearRoi = totalCost > 0 ? Math.round((totalValue / totalCost) * 100) : 0;
    
    // Calculate payback period in months
    const annualValue = totalValue / inputs.yearsToProject;
    const monthlyValue = annualValue / 12;
    const paybackPeriod = monthlyValue > 0 ? Math.round(totalCost / monthlyValue) : 0;
    
    return {
        savingsVsCisco: savingsVsCisco,
        paybackPeriod: paybackPeriod,
        threeYearRoi: threeYearRoi,
        valueDrivers: {
            directCostReduction: directCostReduction,
            itStaffEfficiency: itStaffEfficiency,
            breachRiskReduction: breachRiskReduction,
            complianceAutomation: complianceAutomation,
            insurancePremiumReduction: insurancePremiumReduction
        },
        totalValue: totalValue
    };
}

// Generate vendor comparisons
function generateComparisons(results) {
    const vendors = results.vendors;
    const vendorIds = Object.keys(vendors);
    
    // TCO comparison
    vendorIds.forEach(id => {
        results.comparisons.tco[id] = vendors[id].costs.total;
    });
    
    // ROI comparison
    vendorIds.forEach(id => {
        results.comparisons.roi[id] = vendors[id].roi.threeYearRoi;
    });
    
    // Risk reduction comparison
    vendorIds.forEach(id => {
        results.comparisons.riskReduction[id] = vendors[id].security.riskReduction;
    });
    
    // Implementation time comparison (convert to days)
    vendorIds.forEach(id => {
        let days = 0;
        const timeStr = vendors[id].implementation.time;
        
        if (timeStr.includes('Hours')) {
            days = 1;
        } else if (timeStr.includes('Days')) {
            const match = timeStr.match(/(\d+)\s*to\s*(\d+)/);
            if (match) {
                days = Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
            } else {
                days = 7; // Default 1 week if just "Days"
            }
        } else if (timeStr.includes('Weeks')) {
            const match = timeStr.match(/(\d+)\s*to\s*(\d+)/);
            if (match) {
                days = Math.round(((parseInt(match[1]) + parseInt(match[2])) / 2) * 7);
            } else {
                days = 14; // Default 2 weeks if just "Weeks"
            }
        } else if (timeStr.includes('Months')) {
            const match = timeStr.match(/(\d+)\s*to\s*(\d+)/);
            if (match) {
                days = Math.round(((parseInt(match[1]) + parseInt(match[2])) / 2) * 30);
            } else {
                days = 60; // Default 2 months if just "Months"
            }
        }
        
        results.comparisons.implementationTime[id] = days;
    });
}

// Generate summary data
function generateSummary(results, inputs) {
    const vendors = results.vendors;
    const portnox = vendors.portnox;
    
    if (!portnox) return;
    
    // Find baseline vendor for comparison (Cisco ISE if available, otherwise most expensive)
    let baselineVendor = vendors.cisco;
    if (!baselineVendor) {
        let highestCost = 0;
        let highestVendor = null;
        
        Object.keys(vendors).forEach(id => {
            if (id !== 'portnox' && vendors[id].costs.total > highestCost) {
                highestCost = vendors[id].costs.total;
                highestVendor = vendors[id];
            }
        });
        
        baselineVendor = highestVendor;
    }
    
    // Calculate total savings compared to baseline
    let totalSavings = 0;
    let savingsPercentage = 0;
    
    if (baselineVendor) {
        totalSavings = baselineVendor.costs.total - portnox.costs.total;
        savingsPercentage = Math.round((totalSavings / baselineVendor.costs.total) * 100);
    }
    
    // Get Portnox ROI metrics
    const roi = portnox.roi;
    
    // Prepare summary data
    results.summary = {
        totalSavings: totalSavings,
        savingsPercentage: savingsPercentage,
        baselineVendor: baselineVendor ? baselineVendor.name : 'competitors',
        paybackPeriod: roi.paybackPeriod,
        riskReduction: portnox.security.riskReduction,
        complianceCoverage: portnox.security.complianceCoverage,
        implementationTime: results.comparisons.implementationTime.portnox,
        threeYearRoi: roi.threeYearRoi,
        valueDrivers: roi.valueDrivers,
        totalBusinessValue: roi.totalValue
    };
}

// Update UI with calculated results
function updateResults(results) {
    // Update Executive Summary metrics
    updateExecutiveSummary(results);
    
    // Update Financial Overview metrics
    updateFinancialOverview(results);
    
    // Update Security Posture metrics
    updateSecurityPosture(results);
    
    // Update Technical Overview metrics
    updateTechnicalOverview(results);
}

// Update Executive Summary panel
function updateExecutiveSummary(results) {
    const summary = results.summary;
    
    // Update summary metrics
    updateMetric('total-savings', `$${formatNumber(summary.totalSavings)}`);
    updateMetric('savings-percentage', `${summary.savingsPercentage}% reduction vs. ${summary.baselineVendor}`);
    updateMetric('payback-period', `${summary.paybackPeriod} months`);
    updateMetric('risk-reduction-total', `${summary.riskReduction}%`);
    updateMetric('implementation-time', `${summary.implementationTime} days`);
    updateMetric('implementation-comparison', `75% faster than on-premises`);
}

// Update Financial Overview panel
function updateFinancialOverview(results) {
    const portnox = results.vendors.portnox;
    const summary = results.summary;
    
    if (!portnox) return;
    
    // Calculate annual values
    const annualSubscription = Math.round(portnox.costs.subscription);
    const annualOperational = Math.round(portnox.costs.operational / summary.yearsToProject);
    
    // Update financial metrics
    updateMetric('portnox-tco', `$${formatNumber(portnox.costs.total)}`);
    updateMetric('tco-comparison', `vs. $${formatNumber(portnox.costs.total + summary.totalSavings)} (${summary.baselineVendor})`);
    updateMetric('annual-subscription', `$${formatNumber(annualSubscription)}`);
    updateMetric('implementation-cost', `$${formatNumber(portnox.costs.implementation)}`);
    updateMetric('operational-cost', `$${formatNumber(annualOperational)}`);
    
    // Update ROI metrics
    updateMetric('three-year-roi', `${summary.threeYearRoi}%`);
    updateMetric('annual-savings', `$${formatNumber(Math.round(summary.totalSavings / summary.yearsToProject))}`);
    updateMetric('productivity-value', `$${formatNumber(summary.valueDrivers.itStaffEfficiency)}`);
    updateMetric('compliance-savings', `$${formatNumber(summary.valueDrivers.complianceAutomation)}`);
    
    // Update business value table
    updateBusinessValueTable(summary);
}

// Update Security Posture panel
function updateSecurityPosture(results) {
    const portnox = results.vendors.portnox;
    
    if (!portnox) return;
    
    // Update security metrics
    updateMetric('compliance-level', `${portnox.security.complianceCoverage}%`);
    updateMetric('breach-probability', `Low`);
    updateMetric('compliance-coverage', `${portnox.security.complianceCoverage}%`);
    updateMetric('mttr', `52 min`);
    
    // Security posture is handled by the industry frameworks component
}

// Update Technical Overview panel
function updateTechnicalOverview(results) {
    // Technical overview is primarily chart-based, handled in updateCharts
}

// Update business value table
function updateBusinessValueTable(summary) {
    const table = document.getElementById('business-value-table');
    if (!table) return;
    
    // Find the tbody
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    // Get value drivers
    const drivers = summary.valueDrivers;
    
    // Update each row
    const rows = tbody.querySelectorAll('tr');
    if (rows.length >= 6) {
        // Direct Cost Reduction
        const directCostCell = rows[0].querySelector('td:last-child');
        if (directCostCell) {
            directCostCell.textContent = `$${formatNumber(drivers.directCostReduction)}`;
        }
        
        // IT Staff Efficiency
        const staffEfficiencyCell = rows[1].querySelector('td:last-child');
        if (staffEfficiencyCell) {
            staffEfficiencyCell.textContent = `$${formatNumber(drivers.itStaffEfficiency)}`;
        }
        
        // Breach Risk Reduction
        const riskReductionCell = rows[2].querySelector('td:last-child');
        if (riskReductionCell) {
            riskReductionCell.textContent = `$${formatNumber(drivers.breachRiskReduction)}`;
        }
        
        // Compliance Automation
        const complianceCell = rows[3].querySelector('td:last-child');
        if (complianceCell) {
            complianceCell.textContent = `$${formatNumber(drivers.complianceAutomation)}`;
        }
        
        // Insurance Premium Reduction
        const insuranceCell = rows[4].querySelector('td:last-child');
        if (insuranceCell) {
            insuranceCell.textContent = `$${formatNumber(drivers.insurancePremiumReduction)}`;
        }
        
        // Total Business Value
        const totalCell = rows[5].querySelector('td:last-child');
        if (totalCell) {
            totalCell.textContent = `$${formatNumber(summary.totalBusinessValue)}`;
        }
    }
}

// Helper function to update a metric value
function updateMetric(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Helper function to format numbers with commas
function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Update charts with calculated results
function updateCharts(results) {
    // Update Executive charts
    updateExecutiveCharts(results);
    
    // Update Financial charts
    updateFinancialCharts(results);
    
    // Update Security charts
    updateSecurityCharts(results);
    
    // Update Technical charts
    updateTechnicalCharts(results);
}

// Update Executive charts
function updateExecutiveCharts(results) {
    // TCO Comparison Chart
    updateTCOComparisonChart(results);
    
    // Cumulative Cost Chart
    updateCumulativeCostChart(results);
    
    // ROI Chart
    updateROIChart(results);
    
    // Value Drivers Chart
    updateValueDriversChart(results);
    
    // Risk Comparison Chart
    updateRiskComparisonChart(results);
    
    // Breach Impact Chart
    updateBreachImpactChart(results);
    
    // Vendor Radar Chart
    updateVendorRadarChart(results);
}

// Update Financial charts
function updateFinancialCharts(results) {
    // Cost Structure Chart
    updateCostStructureChart(results);
    
    // Cost Projection Chart
    updateCostProjectionChart(results);
}

// Update Security charts
function updateSecurityCharts(results) {
    // Security Heatmap
    updateSecurityHeatmap(results);
    
    // NIST Framework Chart
    updateNistFrameworkChart(results);
    
    // Framework Coverage Chart - handled by industry frameworks component
}

// Update Technical charts
function updateTechnicalCharts(results) {
    // Architecture Chart
    updateArchitectureChart(results);
    
    // Feature Radar Chart
    updateFeatureRadarChart(results);
}

// TCO Comparison Chart
function updateTCOComparisonChart(results) {
    const chartCanvas = document.getElementById('tco-comparison-chart');
    if (!chartCanvas) return;
    
    // Get data from results
    const tcoComparison = results.comparisons.tco;
    
    // Prepare chart data
    const labels = [];
    const data = [];
    const backgroundColor = [];
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Highlight color for Portnox
    const portnoxBorderColor = 'rgba(0, 123, 255, 1)';
    const otherBorderColor = 'rgba(0, 0, 0, 0.1)';
    
    Object.keys(tcoComparison).forEach(vendorId => {
        // Get vendor name
        const vendorName = results.vendors[vendorId].name;
        
        labels.push(vendorName);
        data.push(tcoComparison[vendorId]);
        backgroundColor.push(colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)');
    });
    
    // Create or update chart
    if (window.tcoComparisonChart) {
        window.tcoComparisonChart.data.labels = labels;
        window.tcoComparisonChart.data.datasets[0].data = data;
        window.tcoComparisonChart.data.datasets[0].backgroundColor = backgroundColor;
        window.tcoComparisonChart.update();
    } else {
        window.tcoComparisonChart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Cost of Ownership (3 Years)',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: labels.map(label => label === 'Portnox Cloud' ? portnoxBorderColor : otherBorderColor),
                    borderWidth: labels.map(label => label === 'Portnox Cloud' ? 3 : 1)
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `TCO: $${formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Total Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
}

// Cumulative Cost Chart
function updateCumulativeCostChart(results) {
    const chartCanvas = document.getElementById('cumulative-cost-chart');
    if (!chartCanvas) return;
    
    // Get selected vendors
    const selectedVendors = Object.keys(results.vendors);
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Calculate years
    const years = window.calculatorState.yearsToProject;
    const labels = [];
    for (let i = 0; i <= years; i++) {
        labels.push(`Year ${i}`);
    }
    
    // Prepare datasets
    const datasets = selectedVendors.map(vendorId => {
        const vendor = results.vendors[vendorId];
        const vendorCosts = vendor.costs;
        
        // Calculate cumulative costs
        const cumulativeData = [0]; // Start with 0 at Year 0
        
        // Year 1 includes implementation, hardware, and 1 year of subscription + maintenance
        const year1Cost = vendorCosts.implementation + vendorCosts.hardware + 
            (vendorCosts.subscription / years) + (vendorCosts.maintenance / years) + 
            (vendorCosts.operational / years);
        
        cumulativeData.push(year1Cost);
        
        // Subsequent years add subscription, maintenance, and operational costs
        let cumulativeCost = year1Cost;
        for (let i = 2; i <= years; i++) {
            const yearCost = (vendorCosts.subscription / years) + 
                (vendorCosts.maintenance / years) + (vendorCosts.operational / years);
            cumulativeCost += yearCost;
            cumulativeData.push(cumulativeCost);
        }
        
        return {
            label: vendor.name,
            data: cumulativeData,
            backgroundColor: colorMap[vendorId] || 'rgba(158, 158, 158, 0.3)',
            borderColor: colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)',
            borderWidth: vendorId === 'portnox' ? 3 : 2,
            tension: 0.3,
            fill: false
        };
    });
    
    // Create or update chart
    if (window.cumulativeCostChart) {
        window.cumulativeCostChart.data.labels = labels;
        window.cumulativeCostChart.data.datasets = datasets;
        window.cumulativeCostChart.update();
    } else {
        window.cumulativeCostChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `${context.dataset.label}: $${formatNumber(Math.round(value))}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Cumulative Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
}

// ROI Chart
function updateROIChart(results) {
    const chartCanvas = document.getElementById('roi-chart');
    if (!chartCanvas) return;
    
    // Get ROI comparison
    const roiComparison = results.comparisons.roi;
    
    // Prepare chart data
    const labels = [];
    const data = [];
    const backgroundColor = [];
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Highlight color for Portnox
    const portnoxBorderColor = 'rgba(0, 123, 255, 1)';
    const otherBorderColor = 'rgba(0, 0, 0, 0.1)';
    
    Object.keys(roiComparison).forEach(vendorId => {
        // Skip vendors with 0 or negative ROI
        if (roiComparison[vendorId] <= 0) return;
        
        // Get vendor name
        const vendorName = results.vendors[vendorId].name;
        
        labels.push(vendorName);
        data.push(roiComparison[vendorId]);
        backgroundColor.push(colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)');
    });
    
    // Create or update chart
    if (window.roiChart) {
        window.roiChart.data.labels = labels;
        window.roiChart.data.datasets[0].data = data;
        window.roiChart.data.datasets[0].backgroundColor = backgroundColor;
        window.roiChart.update();
    } else {
        window.roiChart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Return on Investment (3 Years)',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: labels.map(label => label === 'Portnox Cloud' ? portnoxBorderColor : otherBorderColor),
                    borderWidth: labels.map(label => label === 'Portnox Cloud' ? 3 : 1)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `ROI: ${value}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'ROI (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Value Drivers Chart
function updateValueDriversChart(results) {
    const chartCanvas = document.getElementById('value-drivers-chart');
    if (!chartCanvas) return;
    
    // Get Portnox value drivers
    const portnox = results.vendors.portnox;
    if (!portnox) return;
    
    const valueDrivers = portnox.roi.valueDrivers;
    
    // Prepare chart data
    const labels = [
        'Direct Cost Reduction', 
        'IT Staff Efficiency', 
        'Breach Risk Reduction', 
        'Compliance Automation', 
        'Insurance Premium Reduction'
    ];
    
    const data = [
        valueDrivers.directCostReduction,
        valueDrivers.itStaffEfficiency,
        valueDrivers.breachRiskReduction,
        valueDrivers.complianceAutomation,
        valueDrivers.insurancePremiumReduction
    ];
    
    // Define colors
    const backgroundColors = [
        'rgba(0, 123, 255, 0.7)',
        'rgba(0, 200, 83, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(233, 30, 99, 0.7)',
        'rgba(156, 39, 176, 0.7)'
    ];
    
    // Create or update chart
    if (window.valueDriversChart) {
        window.valueDriversChart.data.labels = labels;
        window.valueDriversChart.data.datasets[0].data = data;
        window.valueDriversChart.update();
    } else {
        window.valueDriversChart = new Chart(chartCanvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: $${formatNumber(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Risk Comparison Chart
function updateRiskComparisonChart(results) {
    const chartCanvas = document.getElementById('risk-comparison-chart');
    if (!chartCanvas) return;
    
    // Get risk reduction comparison
    const riskReduction = results.comparisons.riskReduction;
    
    // Prepare chart data
    const labels = [];
    const data = [];
    const backgroundColor = [];
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    Object.keys(riskReduction).forEach(vendorId => {
        // Get vendor name
        const vendorName = results.vendors[vendorId].name;
        
        labels.push(vendorName);
        data.push(riskReduction[vendorId]);
        backgroundColor.push(colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)');
    });
    
    // Create or update chart
    if (window.riskComparisonChart) {
        window.riskComparisonChart.data.labels = labels;
        window.riskComparisonChart.data.datasets[0].data = data;
        window.riskComparisonChart.data.datasets[0].backgroundColor = backgroundColor;
        window.riskComparisonChart.update();
    } else {
        window.riskComparisonChart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Risk Reduction',
                    data: data,
                    backgroundColor: backgroundColor
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `Risk Reduction: ${value}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Risk Reduction (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Breach Impact Chart
function updateBreachImpactChart(results) {
    const chartCanvas = document.getElementById('breach-impact-chart');
    if (!chartCanvas) return;
    
    // Get risk profiles
    const riskProfiles = window.RISK_PROFILES || {};
    
    // Prepare chart data
    const labels = Object.keys(riskProfiles).map(key => riskProfiles[key].name);
    const breachCosts = Object.keys(riskProfiles).map(key => riskProfiles[key].averageBreachCost);
    
    // Calculate mitigated costs using Portnox risk reduction
    const portnox = results.vendors.portnox;
    if (!portnox) return;
    
    const riskReduction = portnox.security.riskReduction / 100;
    const mitigatedCosts = breachCosts.map(cost => cost * (1 - riskReduction));
    
    // Create or update chart
    if (window.breachImpactChart) {
        window.breachImpactChart.data.labels = labels;
        window.breachImpactChart.data.datasets[0].data = breachCosts;
        window.breachImpactChart.data.datasets[1].data = mitigatedCosts;
        window.breachImpactChart.update();
    } else {
        window.breachImpactChart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Average Breach Cost',
                        data: breachCosts,
                        backgroundColor: 'rgba(233, 30, 99, 0.7)'
                    },
                    {
                        label: 'Cost with Portnox',
                        data: mitigatedCosts,
                        backgroundColor: 'rgba(0, 123, 255, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `${context.dataset.label}: $${formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
}

// Vendor Radar Chart
function updateVendorRadarChart(results) {
    const chartCanvas = document.getElementById('vendor-radar-chart');
    if (!chartCanvas) return;
    
    // Get selected vendors
    const selectedVendors = Object.keys(results.vendors);
    
    // Define important feature categories
    const features = [
        'cloudNative',
        'zeroTrust',
        'deploymentSpeed',
        'remoteAccess',
        'iotSupport',
        'multiVendor',
        'scalability',
        'automation',
        'compliance',
        'userExperience',
        'endpointVisibility',
        'threatResponse'
    ];
    
    // Format feature names for display
    const featureLabels = features.map(feature => {
        return feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    });
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Prepare datasets
    const datasets = selectedVendors.map(vendorId => {
        const vendor = results.vendors[vendorId];
        const vendorFeatures = vendor.features || {};
        
        // Extract feature values
        const featureValues = features.map(feature => vendorFeatures[feature] || 0);
        
        return {
            label: vendor.name,
            data: featureValues,
            backgroundColor: colorMap[vendorId] ? colorMap[vendorId].replace('0.7', '0.2') : 'rgba(158, 158, 158, 0.2)',
            borderColor: colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)',
            borderWidth: vendorId === 'portnox' ? 3 : 2,
            fill: true
        };
    });
    
    // Create or update chart
    if (window.vendorRadarChart) {
        window.vendorRadarChart.data.labels = featureLabels;
        window.vendorRadarChart.data.datasets = datasets;
        window.vendorRadarChart.update();
    } else {
        window.vendorRadarChart = new Chart(chartCanvas, {
            type: 'radar',
            data: {
                labels: featureLabels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.2
                    }
                }
            }
        });
    }
}

// Cost Structure Chart
function updateCostStructureChart(results) {
    const chartCanvas = document.getElementById('cost-structure-chart');
    if (!chartCanvas) return;
    
    // Get Portnox costs
    const portnox = results.vendors.portnox;
    if (!portnox) return;
    
    const costs = portnox.costs;
    
    // Prepare chart data
    const labels = ['Subscription', 'Implementation', 'Hardware', 'Maintenance', 'Operational'];
    const data = [
        costs.subscription * window.calculatorState.yearsToProject,
        costs.implementation,
        costs.hardware,
        costs.maintenance,
        costs.operational
    ];
    
    // Define colors
    const backgroundColors = [
        'rgba(0, 123, 255, 0.7)',
        'rgba(0, 200, 83, 0.7)',
        'rgba(255, 152, 0, 0.7)',
        'rgba(233, 30, 99, 0.7)',
        'rgba(156, 39, 176, 0.7)'
    ];
    
    // Create or update chart
    if (window.costStructureChart) {
        window.costStructureChart.data.labels = labels;
        window.costStructureChart.data.datasets[0].data = data;
        window.costStructureChart.update();
    } else {
        window.costStructureChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: $${formatNumber(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Cost Projection Chart
function updateCostProjectionChart(results) {
    const chartCanvas = document.getElementById('cost-projection-chart');
    if (!chartCanvas) return;
    
    // Get selected vendors
    const selectedVendors = Object.keys(results.vendors);
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Calculate years
    const years = window.calculatorState.yearsToProject;
    const labels = [];
    for (let i = 1; i <= years; i++) {
        labels.push(`Year ${i}`);
    }
    
    // Prepare datasets
    const datasets = selectedVendors.map(vendorId => {
        const vendor = results.vendors[vendorId];
        const vendorCosts = vendor.costs;
        
        // Calculate yearly costs
        const yearlyData = [];
        
        // Year 1 includes implementation, hardware, and 1 year of subscription + maintenance + operational
        const year1Cost = vendorCosts.implementation + vendorCosts.hardware + 
            (vendorCosts.subscription / years) + (vendorCosts.maintenance / years) + 
            (vendorCosts.operational / years);
        
        yearlyData.push(year1Cost);
        
        // Subsequent years add subscription, maintenance, and operational costs
        for (let i = 2; i <= years; i++) {
            const yearCost = (vendorCosts.subscription / years) + 
                (vendorCosts.maintenance / years) + (vendorCosts.operational / years);
            yearlyData.push(yearCost);
        }
        
        return {
            label: vendor.name,
            data: yearlyData,
            backgroundColor: colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)',
            borderColor: colorMap[vendorId] ? colorMap[vendorId].replace('0.7', '1') : 'rgba(158, 158, 158, 1)',
            borderWidth: vendorId === 'portnox' ? 3 : 2
        };
    });
    
    // Create or update chart
    if (window.costProjectionChart) {
        window.costProjectionChart.data.labels = labels;
        window.costProjectionChart.data.datasets = datasets;
        window.costProjectionChart.update();
    } else {
        window.costProjectionChart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return `${context.dataset.label}: $${formatNumber(Math.round(value))}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
}

// Security Heatmap
function updateSecurityHeatmap(results) {
    const container = document.getElementById('security-heatmap');
    if (!container) return;
    
    // Get selected vendors
    const selectedVendors = Object.keys(results.vendors);
    
    // Define security categories
    const categories = [
        'Authentication & Access Control',
        'Device Visibility & Control',
        'Threat Detection & Response',
        'Compliance & Reporting',
        'Zero Trust Enforcement',
        'Secure Remote Access',
        'IoT Security',
        'Network Segmentation'
    ];
    
    // Generate vendor scores for each category (simplified mapping from vendor features)
    const vendorScores = {};
    
    selectedVendors.forEach(vendorId => {
        const vendor = results.vendors[vendorId];
        const features = vendor.features || {};
        
        vendorScores[vendorId] = {
            'Authentication & Access Control': Math.round((features.zeroTrust || 0) * 0.8 + (features.userExperience || 0) * 0.2),
            'Device Visibility & Control': Math.round((features.endpointVisibility || 0) * 0.7 + (features.iotSupport || 0) * 0.3),
            'Threat Detection & Response': Math.round((features.threatResponse || 0) * 0.8 + (features.automation || 0) * 0.2),
            'Compliance & Reporting': Math.round((features.compliance || 0) * 0.9 + (features.automation || 0) * 0.1),
            'Zero Trust Enforcement': Math.round((features.zeroTrust || 0) * 0.9 + (features.endpointVisibility || 0) * 0.1),
            'Secure Remote Access': Math.round((features.remoteAccess || 0) * 0.9 + (features.zeroTrust || 0) * 0.1),
            'IoT Security': Math.round((features.iotSupport || 0) * 0.8 + (features.endpointVisibility || 0) * 0.2),
            'Network Segmentation': Math.round((features.multiVendor || 0) * 0.5 + (features.zeroTrust || 0) * 0.5)
        };
    });
    
    // Create heatmap HTML
    let heatmapHtml = `
        <div class="heatmap-container">
            <table class="heatmap-table">
                <thead>
                    <tr>
                        <th>Security Category</th>
                        ${selectedVendors.map(vendorId => `
                            <th>
                                <div class="vendor-header">
                                    <img src="${results.vendors[vendorId].logo}" alt="${results.vendors[vendorId].name}" class="vendor-mini-logo">
                                    ${results.vendors[vendorId].name}
                                </div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add rows for each category
    categories.forEach(category => {
        heatmapHtml += `
            <tr>
                <td>${category}</td>
                ${selectedVendors.map(vendorId => {
                    const score = vendorScores[vendorId][category] || 0;
                    let colorClass = '';
                    
                    if (score >= 90) colorClass = 'excellent';
                    else if (score >= 75) colorClass = 'good';
                    else if (score >= 50) colorClass = 'moderate';
                    else if (score >= 25) colorClass = 'fair';
                    else colorClass = 'poor';
                    
                    return `
                        <td>
                            <div class="heatmap-cell ${colorClass}">
                                <span>${score}</span>
                            </div>
                        </td>
                    `;
                }).join('')}
            </tr>
        `;
    });
    
    heatmapHtml += `
                </tbody>
            </table>
        </div>
        
        <div class="heatmap-legend">
            <div class="legend-item">
                <div class="legend-color excellent"></div>
                <span>Excellent (90-100)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color good"></div>
                <span>Good (75-89)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color moderate"></div>
                <span>Moderate (50-74)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color fair"></div>
                <span>Fair (25-49)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color poor"></div>
                <span>Poor (0-24)</span>
            </div>
        </div>
    `;
    
    // Update container
    container.innerHTML = heatmapHtml;
}

// NIST Framework Chart
function updateNistFrameworkChart(results) {
    const chartCanvas = document.getElementById('nist-framework-chart');
    if (!chartCanvas) return;
    
    // Define NIST CSF categories
    const categories = ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
    
    // Get selected vendors
    const selectedVendors = Object.keys(results.vendors);
    
    // Map vendor features to NIST categories (simplified mapping)
    const vendorScores = {};
    
    selectedVendors.forEach(vendorId => {
        const vendor = results.vendors[vendorId];
        const features = vendor.features || {};
        
        vendorScores[vendorId] = {
            'Identify': Math.round((features.endpointVisibility || 0) * 0.7 + (features.multiVendor || 0) * 0.3),
            'Protect': Math.round((features.zeroTrust || 0) * 0.5 + (features.multiVendor || 0) * 0.3 + (features.compliance || 0) * 0.2),
            'Detect': Math.round((features.endpointVisibility || 0) * 0.4 + (features.threatResponse || 0) * 0.6),
            'Respond': Math.round((features.threatResponse || 0) * 0.7 + (features.automation || 0) * 0.3),
            'Recover': Math.round((features.automation || 0) * 0.6 + (features.threatResponse || 0) * 0.4)
        };
    });
    
    // Define color scheme
    const colorMap = {
        portnox: 'rgba(0, 123, 255, 0.7)',
        cisco: 'rgba(0, 200, 83, 0.7)',
        aruba: 'rgba(255, 152, 0, 0.7)',
        forescout: 'rgba(233, 30, 99, 0.7)',
        fortinac: 'rgba(156, 39, 176, 0.7)',
        juniper: 'rgba(3, 169, 244, 0.7)',
        securew2: 'rgba(255, 193, 7, 0.7)',
        microsoft: 'rgba(103, 58, 183, 0.7)',
        arista: 'rgba(255, 87, 34, 0.7)',
        foxpass: 'rgba(121, 85, 72, 0.7)',
        'no-nac': 'rgba(158, 158, 158, 0.7)'
    };
    
    // Prepare datasets
    const datasets = selectedVendors.map(vendorId => {
        const scores = vendorScores[vendorId];
        
        return {
            label: results.vendors[vendorId].name,
            data: categories.map(cat => scores[cat] || 0),
            backgroundColor: colorMap[vendorId] ? colorMap[vendorId].replace('0.7', '0.2') : 'rgba(158, 158, 158, 0.2)',
            borderColor: colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)',
            borderWidth: vendorId === 'portnox' ? 3 : 2,
            fill: true
        };
    });
    
    // Create or update chart
    if (window.nistFrameworkChart) {
        window.nistFrameworkChart.data.labels = categories;
        window.nistFrameworkChart.data.datasets = datasets;
        window.nistFrameworkChart.update();
    } else {
        window.nistFrameworkChart = new Chart(chartCanvas, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.2
                    }
                }
            }
        });
    }
}

// Architecture Chart
function updateArchitectureChart(results) {
    const container = document.getElementById('architecture-chart');
    if (!container) return;
    
    // Create architecture diagram HTML
    let architectureHtml = `
        <div class="architecture-container">
            <div class="architecture-title">Portnox Cloud Architecture</div>
            <div class="architecture-diagram">
                <div class="architecture-cloud">
                    <div class="architecture-label">Portnox Cloud</div>
                    <div class="architecture-components">
                        <div class="architecture-component">
                            <i class="fas fa-shield-alt"></i>
                            <span>Zero Trust Engine</span>
                        </div>
                        <div class="architecture-component">
                            <i class="fas fa-project-diagram"></i>
                            <span>Policy Manager</span>
                        </div>
                        <div class="architecture-component">
                            <i class="fas fa-desktop"></i>
                            <span>Device Directory</span>
                        </div>
                        <div class="architecture-component">
                            <i class="fas fa-chart-line"></i>
                            <span>Analytics</span>
                        </div>
                    </div>
                </div>
                <div class="architecture-connectors">
                    <div class="connector-line"></div>
                    <div class="connector-line"></div>
                    <div class="connector-line"></div>
                </div>
                <div class="architecture-customer">
                    <div class="architecture-location">
                        <div class="architecture-label">Customer Network</div>
                        <div class="architecture-network-components">
                            <div class="architecture-component">
                                <i class="fas fa-network-wired"></i>
                                <span>Network Devices</span>
                            </div>
                            <div class="architecture-component">
                                <i class="fas fa-wifi"></i>
                                <span>Wireless</span>
                            </div>
                            <div class="architecture-component">
                                <i class="fas fa-laptop"></i>
                                <span>Endpoints</span>
                            </div>
                            <div class="architecture-component">
                                <i class="fas fa-mobile-alt"></i>
                                <span>BYOD/IoT</span>
                            </div>
                        </div>
                    </div>
                    <div class="architecture-connector">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    <div class="architecture-identity">
                        <div class="architecture-label">Identity Providers</div>
                        <div class="architecture-identity-components">
                            <div class="architecture-component">
                                <i class="fab fa-windows"></i>
                                <span>Azure AD</span>
                            </div>
                            <div class="architecture-component">
                                <i class="fab fa-google"></i>
                                <span>Google</span>
                            </div>
                            <div class="architecture-component">
                                <i class="fas fa-users"></i>
                                <span>Okta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="architecture-legend">
                <div class="legend-item">
                    <div class="legend-icon"><i class="fas fa-cloud"></i></div>
                    <span>Cloud Services</span>
                </div>
                <div class="legend-item">
                    <div class="legend-icon"><i class="fas fa-network-wired"></i></div>
                    <span>Network Infrastructure</span>
                </div>
                <div class="legend-item">
                    <div class="legend-icon"><i class="fas fa-users"></i></div>
                    <span>Identity Providers</span>
                </div>
                <div class="legend-item">
                    <div class="legend-icon"><i class="fas fa-exchange-alt"></i></div>
                    <span>Secure Connections</span>
                </div>
            </div>
        </div>
    `;
    
    // Update container
    container.innerHTML = architectureHtml;
}

// Feature Radar Chart
function updateFeatureRadarChart(results) {
    const chartCanvas = document.getElementById('feature-radar-chart');
    if (!chartCanvas) return;
    
    // Get Portnox features
    const portnox = results.vendors.portnox;
    if (!portnox) return;
    
    // Define important feature categories
    const features = [
        'cloudNative',
        'zeroTrust',
        'deploymentSpeed',
        'remoteAccess',
        'iotSupport',
        'multiVendor',
        'scalability',
        'automation',
        'compliance',
        'userExperience',
        'endpointVisibility',
        'threatResponse'
    ];
    
    // Format feature names for display
    const featureLabels = features.map(feature => {
        return feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    });
    
    // Extract feature values
    const featureValues = features.map(feature => portnox.features[feature] || 0);
    
    // Create or update chart
    if (window.featureRadarChart) {
        window.featureRadarChart.data.labels = featureLabels;
        window.featureRadarChart.data.datasets[0].data = featureValues;
        window.featureRadarChart.update();
    } else {
        window.featureRadarChart = new Chart(chartCanvas, {
            type: 'radar',
            data: {
                labels: featureLabels,
                datasets: [{
                    label: 'Portnox Cloud',
                    data: featureValues,
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 0.7)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.2
                    }
                }
            }
        });
    }
}

// Helper function to update charts in a specific view
function updateChartsInView(view) {
    // Find all chart canvases in the specified view
    const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
    if (!viewPanel) return;
    
    // Find active results panel
    const activePanel = viewPanel.querySelector('.results-panel.active');
    if (!activePanel) return;
    
    // Update charts in the active panel
    updateChartsInPanel(activePanel.id);
}

// Helper function to update charts in a specific panel
function updateChartsInPanel(panelId) {
    // Trigger chart updates based on panel ID
    switch (panelId) {
        case 'executive-summary':
            updateTCOComparisonChart(window.calculatorResults);
            updateROIChart(window.calculatorResults);
            break;
        case 'executive-tco':
            updateCumulativeCostChart(window.calculatorResults);
            updateValueDriversChart(window.calculatorResults);
            break;
        case 'executive-risk':
            updateRiskComparisonChart(window.calculatorResults);
            updateBreachImpactChart(window.calculatorResults);
            break;
        case 'executive-comparison':
            updateVendorRadarChart(window.calculatorResults);
            break;
        case 'financial-overview':
            updateCostStructureChart(window.calculatorResults);
            break;
        case 'financial-projection':
            updateCostProjectionChart(window.calculatorResults);
            break;
        case 'security-posture':
            updateSecurityHeatmap(window.calculatorResults);
            break;
        case 'security-compliance':
            // Handled by industry frameworks component
            break;
        case 'security-frameworks':
            updateNistFrameworkChart(window.calculatorResults);
            break;
        case 'technical-architecture':
            updateArchitectureChart(window.calculatorResults);
            break;
        case 'technical-features':
            updateFeatureRadarChart(window.calculatorResults);
            break;
    }
}

// Helper function to update all charts
function updateAllCharts() {
    // Store reference to latest results for chart updates
    if (!window.calculatorResults) return;
    
    // Update all charts
    updateTCOComparisonChart(window.calculatorResults);
    updateCumulativeCostChart(window.calculatorResults);
    updateROIChart(window.calculatorResults);
    updateValueDriversChart(window.calculatorResults);
    updateRiskComparisonChart(window.calculatorResults);
    updateBreachImpactChart(window.calculatorResults);
    updateVendorRadarChart(window.calculatorResults);
    updateCostStructureChart(window.calculatorResults);
    updateCostProjectionChart(window.calculatorResults);
    updateSecurityHeatmap(window.calculatorResults);
    updateNistFrameworkChart(window.calculatorResults);
    updateArchitectureChart(window.calculatorResults);
    updateFeatureRadarChart(window.calculatorResults);
}

// Helper function to generate PDF report
function generatePDFReport() {
    // Show loading overlay
    showLoadingOverlay();
    
    // Implement PDF generation functionality
    setTimeout(() => {
        alert('PDF report generation is not implemented in this demo version.');
        hideLoadingOverlay();
    }, 1000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the enhanced TCO analyzer
    initEnhancedTCOAnalyzer();
    
    // Perform initial calculation
    const results = calculateResults();
    
    // Store results for future reference
    window.calculatorResults = results;
    
    console.log('TCO Analyzer initialized successfully');
});
