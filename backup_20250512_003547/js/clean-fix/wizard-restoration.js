/**
 * Wizard Restoration - Comprehensive fix for TCO Analyzer
 * This script consolidates all fixes and ensures a single, clean wizard flow
 */
(function() {
    console.log("Wizard Restoration: Starting comprehensive fix");
    
    // =======================================================
    // CHART HANDLING - Fix chart reuse issues once and for all
    // =======================================================
    
    // Store chart instances
    window.__chartInstances = {};
    
    // Replace Chart constructor if it exists
    if (window.Chart) {
        console.log("Wizard Restoration: Fixing Chart.js constructor");
        
        const OriginalChart = window.Chart;
        
        function SafeChart(ctx, config) {
            const canvasId = ctx.canvas ? ctx.canvas.id : 'unknown-canvas';
            
            // Destroy existing chart if it exists
            if (window.__chartInstances[canvasId]) {
                try {
                    window.__chartInstances[canvasId].destroy();
                    delete window.__chartInstances[canvasId];
                    console.log(`Wizard Restoration: Destroyed existing chart on canvas ${canvasId}`);
                } catch (e) {
                    console.error(`Error destroying chart on canvas ${canvasId}:`, e);
                }
            }
            
            try {
                // Create new chart
                const chart = new OriginalChart(ctx, config);
                window.__chartInstances[canvasId] = chart;
                return chart;
            } catch (e) {
                console.error(`Error creating chart on canvas ${canvasId}:`, e);
                throw e;
            }
        }
        
        // Copy properties from original Chart
        for (const prop in OriginalChart) {
            if (OriginalChart.hasOwnProperty(prop)) {
                SafeChart[prop] = OriginalChart[prop];
            }
        }
        
        // Replace Chart constructor
        window.Chart = SafeChart;
        
        // Add utility function to destroy all charts
        window.Chart.destroyAllCharts = function() {
            for (const id in window.__chartInstances) {
                if (window.__chartInstances.hasOwnProperty(id)) {
                    try {
                        window.__chartInstances[id].destroy();
                    } catch (e) {}
                }
            }
            window.__chartInstances = {};
        };
        
        console.log("Wizard Restoration: Fixed Chart.js constructor");
    }
    
    // =======================================================
    // WIZARD CONTROLLER - Ensure proper functionality
    // =======================================================
    
    // Fix wizard controller when it's available
    function fixWizardController() {
        if (!window.WizardController) return;
        
        console.log("Wizard Restoration: Fixing WizardController");
        
        // Store original methods
        const originalNextStep = window.WizardController.nextStep;
        const originalPrevStep = window.WizardController.prevStep;
        const originalGoToStep = window.WizardController.goToStep;
        
        // Override nextStep
        window.WizardController.nextStep = function() {
            try {
                if (typeof originalNextStep === 'function') {
                    return originalNextStep.apply(this, arguments);
                }
            } catch (e) {
                console.error("Error in nextStep:", e);
                
                // Fallback implementation
                const currentStep = this.getCurrentStep ? this.getCurrentStep() : 1;
                const totalSteps = this.getTotalSteps ? this.getTotalSteps() : 5;
                
                if (currentStep < totalSteps) {
                    this.goToStep(currentStep + 1);
                } else {
                    showResults();
                }
            }
        };
        
        // Override prevStep
        window.WizardController.prevStep = function() {
            try {
                if (typeof originalPrevStep === 'function') {
                    return originalPrevStep.apply(this, arguments);
                }
            } catch (e) {
                console.error("Error in prevStep:", e);
                
                // Fallback implementation
                const currentStep = this.getCurrentStep ? this.getCurrentStep() : 1;
                
                if (currentStep > 1) {
                    this.goToStep(currentStep - 1);
                }
            }
        };
        
        // Override goToStep
        window.WizardController.goToStep = function(stepNumber) {
            try {
                if (typeof originalGoToStep === 'function') {
                    return originalGoToStep.apply(this, arguments);
                }
            } catch (e) {
                console.error("Error in goToStep:", e);
                
                // Fallback implementation
                const totalSteps = this.getTotalSteps ? this.getTotalSteps() : 5;
                
                if (stepNumber >= 1 && stepNumber <= totalSteps) {
                    // Update currentStep
                    this.currentStep = stepNumber;
                    
                    // Hide all steps
                    document.querySelectorAll('.wizard-step').forEach(step => {
                        step.classList.remove('active');
                    });
                    
                    // Show current step
                    const steps = document.querySelectorAll('.wizard-step');
                    if (steps.length >= stepNumber) {
                        steps[stepNumber - 1].classList.add('active');
                    }
                    
                    // Update navigation buttons
                    const prevButton = document.getElementById('prev-step');
                    const nextButton = document.getElementById('next-step');
                    
                    if (prevButton) {
                        prevButton.disabled = stepNumber === 1;
                    }
                    
                    if (nextButton) {
                        nextButton.innerText = stepNumber === totalSteps ? 'View Results' : 'Next Step';
                    }
                }
            }
        };
        
        console.log("Wizard Restoration: Fixed WizardController");
    }
    
    // Function to show results properly
    function showResults() {
        console.log("Wizard Restoration: Showing results");
        
        // Hide wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.style.display = 'none';
        }
        
        // Hide wizard navigation
        const wizardNavigation = document.querySelector('.wizard-navigation');
        if (wizardNavigation) {
            wizardNavigation.style.display = 'none';
        }
        
        // Show results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.classList.remove('hidden');
            
            // Initialize charts if ChartManager is available
            if (window.ChartManager && window.ChartManager.initializeCharts) {
                setTimeout(() => {
                    if (window.Chart && window.Chart.destroyAllCharts) {
                        window.Chart.destroyAllCharts();
                    }
                    window.ChartManager.initializeCharts();
                }, 100);
            }
        }
    }
    
    // Add a back to wizard button to the results view if it doesn't exist
    function addBackToWizardButton() {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;
        
        if (!document.getElementById('back-to-wizard-btn')) {
            const backButton = document.createElement('button');
            backButton.id = 'back-to-wizard-btn';
            backButton.className = 'btn btn-outline';
            backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Wizard';
            backButton.style.position = 'absolute';
            backButton.style.top = '10px';
            backButton.style.left = '10px';
            backButton.style.zIndex = '1000';
            
            backButton.addEventListener('click', function() {
                // Hide results container
                resultsContainer.style.display = 'none';
                resultsContainer.classList.add('hidden');
                
                // Show wizard container
                const wizardContainer = document.getElementById('wizard-container');
                if (wizardContainer) {
                    wizardContainer.style.display = 'block';
                }
                
                // Show wizard navigation
                const wizardNavigation = document.querySelector('.wizard-navigation');
                if (wizardNavigation) {
                    wizardNavigation.style.display = 'flex';
                }
            });
            
            resultsContainer.appendChild(backButton);
            console.log("Wizard Restoration: Added back to wizard button");
        }
    }
    
    // =======================================================
    // UI FIXES - Ensure proper UI state and navigation
    // =======================================================
    
    function fixUI() {
        console.log("Wizard Restoration: Fixing UI");
        
        // 1. Add CSS to ensure proper visibility
        const style = document.createElement('style');
        style.textContent = `
            /* Ensure proper visibility */
            #wizard-container, #results-container {
                transition: display 0.3s ease;
            }
            
            #results-container.hidden {
                display: none !important;
            }
            
            /* Make sure only one wizard step is visible */
            .wizard-step {
                display: none !important;
            }
            
            .wizard-step.active {
                display: block !important;
            }
            
            /* Make sure only one result panel is visible */
            .result-panel {
                display: none !important;
            }
            
            .result-panel.active {
                display: block !important;
            }
        `;
        document.head.appendChild(style);
        
        // 2. Make sure the original Portnox logo is visible in the banner
        const logoImg = document.querySelector('.company-logo');
        if (logoImg && logoImg.src.indexOf('portnox-logo.svg') === -1) {
            logoImg.src = 'img/portnox-logo.svg';
            console.log("Wizard Restoration: Restored Portnox logo");
        }
        
        // 3. Hide results container initially
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            resultsContainer.classList.add('hidden');
        }
        
        // 4. Show wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.style.display = 'block';
        }
        
        // 5. Make sure only one wizard step is active
        const wizardSteps = document.querySelectorAll('.wizard-step');
        let activeStepFound = false;
        wizardSteps.forEach(function(step) {
            if (step.classList.contains('active')) {
                if (activeStepFound) {
                    step.classList.remove('active');
                } else {
                    activeStepFound = true;
                }
            }
        });
        
        // If no active step, make the first one active
        if (!activeStepFound && wizardSteps.length > 0) {
            wizardSteps[0].classList.add('active');
        }
        
        console.log("Wizard Restoration: Fixed UI");
    }
    
    // =======================================================
    // EVENT HANDLERS - Ensure proper event handling
    // =======================================================
    
    function fixEventHandlers() {
        console.log("Wizard Restoration: Fixing event handlers");
        
        // 1. Fix calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            // Remove existing handlers by cloning the button
            const newCalculateBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newCalculateBtn, calculateBtn);
            
            // Add new handler
            newCalculateBtn.addEventListener('click', function() {
                showResults();
            });
            
            console.log("Wizard Restoration: Fixed calculate button");
        }
        
        // 2. Fix result tabs
        const resultTabs = document.querySelectorAll('.result-tab');
        const resultPanels = document.querySelectorAll('.result-panel');
        
        if (resultTabs.length > 0) {
            resultTabs.forEach(function(tab) {
                // Remove existing handlers by cloning the tab
                const newTab = tab.cloneNode(true);
                tab.parentNode.replaceChild(newTab, tab);
                
                // Add new handler
                newTab.addEventListener('click', function() {
                    // Update active tab
                    resultTabs.forEach(function(t) {
                        t.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update active panel
                    resultPanels.forEach(function(panel) {
                        panel.classList.remove('active');
                    });
                    
                    const panelId = this.getAttribute('data-tab') + '-panel';
                    const panel = document.getElementById(panelId);
                    if (panel) {
                        panel.classList.add('active');
                    }
                });
            });
            
            console.log("Wizard Restoration: Fixed result tabs");
        }
        
        // 3. Add event listeners to wizard navigation buttons if needed
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton && nextButton && window.WizardController) {
            // Check if we need to add event listeners
            let needToAdd = true;
            
            // Try clicking the buttons to see if they already have event handlers
            try {
                const oldStep = window.WizardController.getCurrentStep();
                
                // Click prev button - if it has a handler, the step should change
                prevButton.click();
                if (window.WizardController.getCurrentStep() !== oldStep) {
                    // The handler worked, no need to add our own
                    needToAdd = false;
                }
                
                // Restore original step
                window.WizardController.goToStep(oldStep);
            } catch (e) {
                // Error occurred, we'll add our own handlers
                needToAdd = true;
            }
            
            if (needToAdd) {
                prevButton.addEventListener('click', function() {
                    window.WizardController.prevStep();
                });
                
                nextButton.addEventListener('click', function() {
                    window.WizardController.nextStep();
                });
                
                console.log("Wizard Restoration: Added event listeners to wizard navigation buttons");
            } else {
                console.log("Wizard Restoration: Wizard navigation buttons already have event listeners");
            }
        }
    }
    
    // =======================================================
    // INITIALIZATION - Run all fixes
    // =======================================================
    
    // Run all fixes when DOM is ready
    function runAllFixes() {
        // First ensure the UI is in the correct state
        fixUI();
        
        // Then fix the wizard controller
        fixWizardController();
        
        // Add back to wizard button
        addBackToWizardButton();
        
        // Finally fix event handlers
        fixEventHandlers();
        
        console.log("Wizard Restoration: All fixes applied");
    }
    
    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllFixes);
    } else {
        runAllFixes();
    }
})();
