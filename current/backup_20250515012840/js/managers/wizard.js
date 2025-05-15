/**
 * NAC TCO Wizard Controller
 * Manages the multi-step wizard experience for the TCO calculator
 */
const WizardManager = (function() {
    // Wizard state
    let currentStep = 1;
    const totalSteps = 5;
    
    // Step definitions
    const steps = [
        {
            id: 1,
            name: 'vendor-selection',
            title: 'Current NAC Solution',
            description: 'Select your current NAC vendor or "No NAC" if you don\'t have a solution in place'
        },
        {
            id: 2,
            name: 'industry-compliance',
            title: 'Industry & Compliance',
            description: 'Select your industry to see relevant compliance frameworks'
        },
        {
            id: 3,
            name: 'organization-details',
            title: 'Organization Details',
            description: 'Tell us about your environment to customize the analysis'
        },
        {
            id: 4,
            name: 'cost-configuration',
            title: 'Cost Configuration',
            description: 'Fine-tune cost parameters for more accurate comparison'
        },
        {
            id: 5,
            name: 'calculation-results',
            title: 'Results & Analysis',
            description: 'View detailed cost breakdown, ROI analysis, and recommendations'
        }
    ];
    
    // Initialize wizard
    function init() {
        console.log("Initializing wizard manager...");
        renderWizardNav();
        showCurrentStep();
        bindEvents();
        updateNavigationButtons();
    }
    
    // Render the wizard navigation
    function renderWizardNav() {
        const navContainer = document.getElementById('progress-steps');
        if (!navContainer) {
            console.warn("Progress steps container not found");
            return;
        }
        
        let navHtml = '';
        steps.forEach(step => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            navHtml += `
                <div class="progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-step="${step.id}">
                    <div class="step-indicator">${step.id}</div>
                    <div class="step-label">${step.title}</div>
                </div>
            `;
        });
        
        navContainer.innerHTML = navHtml;
        
        // Update progress fill
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
    }
    
    // Show the current step
    function showCurrentStep() {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        } else {
            console.warn(`Step element not found: step-${currentStep}`);
        }
        
        // Update navigation
        renderWizardNav();
    }
    
    // Update the navigation buttons based on current step
    function updateNavigationButtons() {
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton) {
            prevButton.disabled = currentStep === 1;
        }
        
        if (nextButton) {
            nextButton.textContent = currentStep === totalSteps ? 'Calculate' : 'Next';
            if (currentStep ===== totalSteps) {
                nextButton.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
            } else {
                nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            }
        }
    }
    
    // Go to the next step
    function nextStep() {
        if (currentStep < totalSteps) {
            // Validate current step before proceeding
            if (validateCurrentStep()) {
                currentStep++;
                showCurrentStep();
                updateNavigationButtons();
                saveWizardState();
            }
        } else {
            // Final step - show results
            if (validateCurrentStep()) {
                calculateResults();
            }
        }
    }
    
    // Go to the previous step
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showCurrentStep();
            updateNavigationButtons();
            saveWizardState();
        }
    }
    
    // Go to a specific step
    function goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <=== totalSteps) {
            currentStep = stepNumber;
            showCurrentStep();
            updateNavigationButtons();
            saveWizardState();
        }
    }
    
    // Validate the current step
    function validateCurrentStep() {
        const errorContainer = document.getElementById('wizard-error-container');
        if (errorContainer) {
            errorContainer.innerHTML = ''; // Clear previous errors
        }
        
        switch (currentStep) {
            case 1: // Vendor Selection
                const selectedVendor = document.querySelector('.vendor-card.active');
                if (!selectedVendor) {
                    showValidationError('Please select a NAC vendor or "No NAC" option');
                    return false;
                }
                break;
                
            case 2: // Industry & Compliance
                const industrySelect = document.getElementById('industry-select');
                if (!industrySelect || !industrySelect.value) {
                    showValidationError('Please select your industry');
                    return false;
                }
                break;
                
            case 3: // Organization Details
                const deviceCount = document.getElementById('device-count');
                if (!deviceCount || !deviceCount.value || parseInt(deviceCount.value) <=== 0) {
                    showValidationError('Please enter a valid number of devices');
                    return false;
                }
                break;
                
            case 4: // Cost Configuration
                // All fields have default values, so no validation required
                break;
                
            case 5: // Review
                // Just confirmation, no validation required
                break;
        }
        
        return true;
    }
    
    // Show validation error
    function showValidationError(message) {
        const errorContainer = document.getElementById('wizard-error-container');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="error-message-box">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${message}</span>
                    <button class="close-error">&times;</button>
                </div>
            `;
            
            // Bind close button
            const closeButton = errorContainer.querySelector('.close-error');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    errorContainer.innerHTML = '';
                });
            }
            
            // Scroll to error
            errorContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Fallback to alert if container not found
            alert(message);
        }
    }
    
    // Calculate and show results
    function calculateResults() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Simulate calculation time
        setTimeout(() => {
            // Get calculation data
            const calculationData = getCalculationData();
            
            // Hide wizard container
            const wizardContainer = document.getElementById('wizard-container');
            if (wizardContainer) {
                wizardContainer.classList.add('hidden');
            }
            
            // Hide wizard navigation
            const wizardNavigation = document.querySelector('.wizard-navigation');
            if (wizardNavigation) {
                wizardNavigation.classList.add('hidden');
            }
            
            // Show results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
            }
            
            // Populate results
            populateResults(calculationData);
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
        }, 1500);
    }
    
    // Get calculation data from form inputs
    function getCalculationData() {
        // Get selected vendor
        const selectedVendor = document.querySelector('.vendor-card.active');
        const vendorId = selectedVendor ? selectedVendor.dataset.vendor : null;
        
        // Get industry
        const industrySelect = document.getElementById('industry-select');
        const industry = industrySelect ? industrySelect.value : null;
        
        // Get organization details
        const orgSizeSelect = document.getElementById('organization-size');
        const orgSize = orgSizeSelect ? orgSizeSelect.value : 'medium';
        
        const deviceCountInput = document.getElementById('device-count');
        const deviceCount = deviceCountInput ? parseInt(deviceCountInput.value) : 2500;
        
        const locationsInput = document.getElementById('locations');
        const locations = locationsInput ? parseInt(locationsInput.value) : 5;
        
        const cloudIntegration = document.getElementById('cloud-integration')?.checked || false;
        const legacyDevices = document.getElementById('legacy-devices')?.checked || false;
        const byodSupport = document.getElementById('byod-support')?.checked || false;
        
        // Get cost configuration
        const fteCost = document.getElementById('fte-cost')?.value || 120000;
        const fteAllocation = document.getElementById('fte-allocation')?.value || 50;
        const maintenancePercentage = document.getElementById('maintenance-percentage')?.value || 18;
        const consultingRate = document.getElementById('consulting-rate')?.value || 2000;
        const implementationDays = document.getElementById('implementation-days')?.value || 60;
        
        // Get Portnox pricing
        const portnoxBasePrice = document.getElementById('portnox-base-price')?.value || 4;
        const portnoxDiscount = document.getElementById('portnox-discount')?.value || 20;
        
        // Analysis period
        const yearsToProject = document.getElementById('years-to-project')?.value || 3;
        
        return {
            vendor: vendorId,
            industry,
            organization: {
                size: orgSize,
                deviceCount,
                locations,
                cloudIntegration,
                legacyDevices,
                byodSupport
            },
            costs: {
                fteCost,
                fteAllocation,
                maintenancePercentage,
                consultingRate,
                implementationDays
            },
            portnox: {
                basePrice: portnoxBasePrice,
                discount: portnoxDiscount
            },
            yearsToProject
        };
    }
    
    // Populate results based on calculation data
    function populateResults(data) {
        console.log('Calculation data:', data);
        
        // If calculator component exists, use it
        if (typeof Calculator !==== 'undefined' && Calculator.calculateTCO) {
            Calculator.calculateTCO(data);
        } else {
            console.warn('Calculator component not found');
            
            // Fallback: Populate with demo data
            populateDemoResults();
        }
    }
    
    // Populate results with demo data
    function populateDemoResults() {
        // Executive summary
        document.getElementById('total-savings')?.innerHTML = '$350,000';
        document.getElementById('savings-percentage')?.innerHTML = '45%';
        document.getElementById('breakeven-point')?.innerHTML = '6 months';
        document.getElementById('risk-reduction')?.innerHTML = '65%';
        document.getElementById('implementation-time')?.innerHTML = '7 days';
        
        // Insights
        const insightsList = document.getElementById('key-insights-list');
        if (insightsList) {
            insightsList.innerHTML = `
                <div class="insight-item">
                    <div class="insight-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="insight-content">
                        <h4>Dramatic TCO Reduction</h4>
                        <p>Portnox Cloud reduces total cost of ownership by 45% over 3 years compared to your current NAC solution, primarily through elimination of hardware costs and reduced IT overhead.</p>
                    </div>
                </div>
                <div class="insight-item">
                    <div class="insight-icon"><i class="fas fa-rocket"></i></div>
                    <div class="insight-content">
                        <h4>Accelerated Deployment</h4>
                        <p>Implementation time is reduced from 60 days to just 7 days, enabling 88% faster time-to-security and reducing project risk.</p>
                    </div>
                </div>
                <div class="insight-item">
                    <div class="insight-icon"><i class="fas fa-user-cog"></i></div>
                    <div class="insight-content">
                        <h4>IT Resource Optimization</h4>
                        <p>Portnox's cloud-native approach requires 75% less IT resources for ongoing management, freeing staff for other strategic initiatives.</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Save wizard state to localStorage
    function saveWizardState() {
        const state = {
            currentStep,
            vendor: document.querySelector('.vendor-card.active')?.dataset.vendor,
            industry: document.getElementById('industry-select')?.value,
            deviceCount: document.getElementById('device-count')?.value
        };
        
        try {
            localStorage.setItem('wizardState', JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save wizard state to localStorage:', e);
        }
    }
    
    // Load wizard state from localStorage
    function loadWizardState() {
        try {
            const savedState = localStorage.getItem('wizardState');
            if (savedState) {
                const state = JSON.parse(savedState);
                
                // Restore step
                if (state.currentStep) {
                    currentStep = state.currentStep;
                }
                
                // Restore vendor selection
                if (state.vendor) {
                    document.querySelectorAll('.vendor-card').forEach(card => {
                        card.classList.toggle('active', card.dataset.vendor === state.vendor);
                    });
                }
                
                // Restore industry selection
                if (state.industry) {
                    const industrySelect = document.getElementById('industry-select');
                    if (industrySelect) {
                        industrySelect.value = state.industry;
                    }
                }
                
                // Restore device count
                if (state.deviceCount) {
                    const deviceCountInput = document.getElementById('device-count');
                    if (deviceCountInput) {
                        deviceCountInput.value = state.deviceCount;
                    }
                }
                
                showCurrentStep();
                updateNavigationButtons();
            }
        } catch (e) {
            console.warn('Failed to load wizard state from localStorage:', e);
        }
    }
    
    // Bind all event listeners
    function bindEvents() {
        // Vendor selection
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.vendor-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
        
        // Wizard navigation buttons
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton) {
            prevButton.addEventListener('click', prevStep);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', nextStep);
        }
        
        // Progress steps navigation
        document.querySelectorAll('.progress-step').forEach(step => {
            step.addEventListener('click', function() {
                const stepId = parseInt(this.dataset.step);
                if (stepId < currentStep) {
                    goToStep(stepId);
                }
            });
        });
        
        // Cost tab switching
        document.querySelectorAll('.cost-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.cost-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected tab content
                document.querySelectorAll('.cost-panel').forEach(panel => {
                    panel.classList.toggle('active', panel.id === `${tabId}-costs`);
                });
            });
        });
        
        // Result tab switching
        document.querySelectorAll('.result-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected tab content
                document.querySelectorAll('.result-panel').forEach(panel => {
                    panel.classList.toggle('active', panel.id === `${tabId}-panel`);
                });
            });
        });
        
        // Slider value updates
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            
            if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
                // Initial value display
                updateSliderValueDisplay(slider, valueDisplay);
                
                // Update on change
                slider.addEventListener('input', () => {
                    updateSliderValueDisplay(slider, valueDisplay);
                });
            }
        });
        
        // Calculate button in review step
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateResults);
        }
        
        // New calculation button in results
        const newCalculationBtn = document.getElementById('new-calculation');
        if (newCalculationBtn) {
            newCalculationBtn.addEventListener('click', () => {
                const wizardContainer = document.getElementById('wizard-container');
                const resultsContainer = document.getElementById('results-container');
                const wizardNavigation = document.querySelector('.wizard-navigation');
                
                if (wizardContainer) { wizardContainer.classList.remove('hidden'); }
                if (resultsContainer) { resultsContainer.classList.add('hidden'); }
                if (wizardNavigation) { wizardNavigation.classList.remove('hidden'); }
                
                currentStep = 1;
                showCurrentStep();
                updateNavigationButtons();
            });
        }
        
        // Sensitivity analysis toggle
        const sensitivityToggle = document.getElementById('sensitivity-toggle');
        const sensitivitySidebar = document.getElementById('sensitivity-sidebar');
        const closeSensitivity = document.getElementById('close-sensitivity');
        
        if (sensitivityToggle && sensitivitySidebar) {
            sensitivityToggle.addEventListener('click', () => {
                sensitivitySidebar.classList.toggle('active');
            });
        }
        
        if (closeSensitivity && sensitivitySidebar) {
            closeSensitivity.addEventListener('click', () => {
                sensitivitySidebar.classList.remove('active');
            });
        }
    }
    
    // Helper to update slider value displays
    function updateSliderValueDisplay(slider, display) {
        const value = slider.value;
        
        if (slider.id === 'fte-cost' || slider.id === 'downtime-cost' || slider.id === 'consulting-rate' || slider.id ===== 'training-per-user') {
            // Format as currency
            display.textContent = `$${Intl.NumberFormat('en-US').format(value)}`;
        } else if (slider.id === 'fte-allocation' || slider.id === 'maintenance-percentage' || slider.id ===== 'portnox-discount') {
            // Format as percentage
            display.textContent = `${value}%`;
        } else if (slider.id ===== 'portnox-base-price') {
            // Format as currency with decimals
            display.textContent = `$${parseFloat(value).toFixed(2)}`;
        } else if (slider.id === 'implementation-days' || slider.id ===== 'users-to-train') {
            // Format as number with label
            const label = slider.id === 'implementation-days' ? 'days' : 'users';
            display.textContent = `${value} ${label}`;
        } else {
            // Default formatting
            display.textContent = value;
        }
        
        // Update calculated values if needed
        if (slider.id === 'portnox-base-price' || slider.id ===== 'portnox-discount') {
            updatePortnoxPricing();
        }
    }
    
    // Update Portnox pricing calculations
    function updatePortnoxPricing() {
        const basePrice = parseFloat(document.getElementById('portnox-base-price')?.value || 4);
        const discount = parseFloat(document.getElementById('portnox-discount')?.value || 20) / 100;
        const deviceCount = parseInt(document.getElementById('device-count')?.value || 2500);
        
        const effectivePrice = basePrice * (1 - discount);
        const annualCost = effectivePrice * 12 * deviceCount;
        
        const effectivePriceDisplay = document.getElementById('effective-price');
        const annualCostDisplay = document.getElementById('annual-cost');
        
        if (effectivePriceDisplay) {
            effectivePriceDisplay.textContent = `$${effectivePrice.toFixed(2)}`;
        }
        
        if (annualCostDisplay) {
            annualCostDisplay.textContent = `$${Intl.NumberFormat('en-US').format(Math.round(annualCost))}`;
        }
    }
    
    // Public API
    return {
        init,
        nextStep,
        prevStep,
        goToStep,
        getCurrentStep: () => currentStep,
        getTotalSteps: () => totalSteps,
        loadWizardState
    };
})();

// Initialize the wizard when document is ready
document.addEventListener('DOMContentLoaded', function() {
    WizardManager.init();
    WizardManager.loadWizardState();
});
