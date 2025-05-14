/**
 * Main script file for Total Cost Analyzer
 * Loads and initializes all components
 */

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Total Cost Analyzer is initializing...');
    
    // Apply error handling first
    if (window.onerror === null) {
        // Global error handler
        window.onerror = function(message, source, lineno, colno, error) {
            console.log("Global error caught:", error);
            
            // Log error details
            console.log("Error details:", {
                message: message,
                source: source,
                lineno: lineno,
                colno: colno,
                stack: error ? error.stack : null
            });
            
            return true; // Let other error handlers run
        };
    }
    
    // Apply critical fixes first
    applyWizardNavigation();
    applyVendorCardFixes();
    
    // Initialize components
    if (typeof WizardManager !== 'undefined') {
        console.log('Initializing Wizard Manager');
        WizardManager.init();
    } else if (typeof WizardController !== 'undefined') {
        console.log('Initializing Wizard Controller');
        WizardController.init();
    } else {
        console.warn('No Wizard Manager found, applying fallback');
        initFallbackWizard();
    }
    
    if (typeof EnhancedUI !== 'undefined') {
        console.log('Initializing Enhanced UI');
        EnhancedUI.init();
    } else {
        console.warn('Enhanced UI not found');
    }
    
    if (typeof ChartsManager !== 'undefined') {
        console.log('Initializing Charts Manager');
        ChartsManager.initCharts();
    } else {
        console.warn('Charts Manager not found');
    }
    
    if (typeof SensitivityAnalyzer !== 'undefined') {
        console.log('Initializing Sensitivity Analyzer');
        SensitivityAnalyzer.init();
    } else {
        console.warn('Sensitivity Analyzer not found');
    }
    
    if (typeof IndustryCompliance !== 'undefined') {
        console.log('Initializing Industry Compliance');
        IndustryCompliance.init();
    } else {
        console.warn('Industry Compliance not found');
    }
    
    if (typeof RiskAnalyzer !== 'undefined') {
        console.log('Initializing Risk Analyzer');
        RiskAnalyzer.init();
    } else {
        console.warn('Risk Analyzer not found');
    }
    
    // Apply wizard step fixes - ensures navigation is present on all steps
    if (typeof applyWizardStepFixes === 'function') {
        applyWizardStepFixes();
    }
    
    // Bind export PDF button
    const exportPdfButton = document.getElementById('export-pdf');
    if (exportPdfButton) {
        exportPdfButton.addEventListener('click', function() {
            console.log('Exporting PDF...');
            if (typeof AppController !== 'undefined' && typeof AppController.exportToPdf === 'function') {
                AppController.exportToPdf();
            } else {
                alert('PDF export functionality is not available');
            }
        });
    }
    
    // Bind share results button
    const shareResultsButton = document.getElementById('share-results');
    if (shareResultsButton) {
        shareResultsButton.addEventListener('click', function() {
            console.log('Sharing results...');
            if (typeof AppController !== 'undefined' && typeof AppController.shareResults === 'function') {
                AppController.shareResults();
            } else {
                // Simple fallback
                const url = window.location.href;
                navigator.clipboard.writeText(url)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch(() => alert('Failed to copy link'));
            }
        });
    }
    
    // Bind new calculation button
    const newCalculationButton = document.getElementById('new-calculation');
    if (newCalculationButton) {
        newCalculationButton.addEventListener('click', function() {
            console.log('Starting new calculation...');
            
            // Hide results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.add('hidden');
            }
            
            // Show wizard container
            const wizardContainer = document.getElementById('wizard-container');
            if (wizardContainer) {
                wizardContainer.classList.remove('hidden');
            }
            
            // Reset wizard to first step
            if (typeof WizardManager !== 'undefined' && typeof WizardManager.goToStep === 'function') {
                WizardManager.goToStep(1);
            } else if (typeof WizardController !== 'undefined' && typeof WizardController.goToStep === 'function') {
                WizardController.goToStep(1);
            }
        });
    }
    
    // Apply wizard navigation
    function applyWizardNavigation() {
        const wizardSteps = document.querySelectorAll('.wizard-step');
        
        wizardSteps.forEach((step, index) => {
            // Check if step already has navigation
            if (!step.querySelector('.wizard-navigation')) {
                // Create navigation container
                const navigationContainer = document.createElement('div');
                navigationContainer.className = 'wizard-navigation';
                
                // Create previous button
                const prevButton = document.createElement('button');
                prevButton.className = 'btn btn-outline prev-step';
                prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
                
                // Create next button
                const nextButton = document.createElement('button');
                nextButton.className = 'btn btn-primary next-step';
                
                // Use different text for last step
                if (index === wizardSteps.length - 1) {
                    nextButton.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
                    nextButton.classList.add('btn-success');
                } else {
                    nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
                }
                
                // Add buttons to navigation container
                navigationContainer.appendChild(prevButton);
                navigationContainer.appendChild(nextButton);
                
                // Add navigation to step
                const stepHeader = step.querySelector('.step-header');
                if (stepHeader) {
                    stepHeader.appendChild(navigationContainer);
                } else {
                    const stepFooter = document.createElement('div');
                    stepFooter.className = 'step-footer';
                    stepFooter.appendChild(navigationContainer);
                    step.appendChild(stepFooter);
                }
                
                // Add event listeners
                prevButton.addEventListener('click', function() {
                    goToPreviousStep();
                });
                
                nextButton.addEventListener('click', function() {
                    goToNextStep();
                });
            }
        });
        
        // Simple navigation functions if wizard manager is not available
        window.goToPreviousStep = function() {
            const currentStep = document.querySelector('.wizard-step.active');
            if (!currentStep) return;
            
            const currentIndex = Array.from(wizardSteps).indexOf(currentStep);
            if (currentIndex <= 0) return;
            
            currentStep.classList.remove('active');
            wizardSteps[currentIndex - 1].classList.add('active');
            updateProgressBar(currentIndex - 1);
            updateNavigationButtons();
        };
        
        window.goToNextStep = function() {
            const currentStep = document.querySelector('.wizard-step.active');
            if (!currentStep) return;
            
            const currentIndex = Array.from(wizardSteps).indexOf(currentStep);
            if (currentIndex >= wizardSteps.length - 1) {
                // Last step - show results
                showResults();
                return;
            }
            
            currentStep.classList.remove('active');
            wizardSteps[currentIndex + 1].classList.add('active');
            updateProgressBar(currentIndex + 1);
            updateNavigationButtons();
        };
        
        // Update progress bar
        function updateProgressBar(stepIndex) {
            const progressFill = document.getElementById('wizard-progress-fill');
            if (progressFill) {
                const progressPercentage = (stepIndex / (wizardSteps.length - 1)) * 100;
                progressFill.style.width = `${progressPercentage}%`;
            }
        }
        
        // Update navigation buttons
        function updateNavigationButtons() {
            const currentStep = document.querySelector('.wizard-step.active');
            if (!currentStep) return;
            
            const currentIndex = Array.from(wizardSteps).indexOf(currentStep);
            
            // Update all previous buttons
            const prevButtons = document.querySelectorAll('.prev-step');
            prevButtons.forEach(button => {
                if (currentIndex === 0) {
                    button.disabled = true;
                    button.classList.add('disabled');
                } else {
                    button.disabled = false;
                    button.classList.remove('disabled');
                }
            });
            
            // Update all next buttons
            const nextButtons = document.querySelectorAll('.next-step');
            nextButtons.forEach(button => {
                if (currentIndex === wizardSteps.length - 1) {
                    button.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
                    button.classList.add('btn-success');
                } else {
                    button.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
                    button.classList.remove('btn-success');
                }
            });
        }
        
        window.updateNavigationButtons = updateNavigationButtons;
        
        // Show results
        function showResults() {
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('active');
            }
            
            // Simulate calculation
            setTimeout(function() {
                // Hide wizard container
                const wizardContainer = document.getElementById('wizard-container');
                if (wizardContainer) {
                    wizardContainer.classList.add('hidden');
                }
                
                // Show results container
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.remove('hidden');
                }
                
                // Hide loading overlay
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('active');
                }
                
                // Initialize results tabs
                initResultsTabs();
                
                // Populate summary values with sample data
                populateSummaryValues();
            }, 1500);
        }
        
        // Initialize results tabs
        function initResultsTabs() {
            const tabButtons = document.querySelectorAll('.result-tab');
            const tabPanels = document.querySelectorAll('.result-panel');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabName = this.dataset.tab;
                    
                    // Remove active class from all buttons and panels
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanels.forEach(panel => panel.classList.remove('active'));
                    
                    // Add active class to selected button and panel
                    this.classList.add('active');
                    document.getElementById(`${tabName}-panel`)?.classList.add('active');
                });
            });
        }
        
        // Populate summary values
        function populateSummaryValues() {
            // Sample data - would be calculated from real inputs
            document.getElementById('total-savings')?.textContent = '$250,000';
            document.getElementById('savings-percentage')?.textContent = '65%';
            document.getElementById('breakeven-point')?.textContent = '3.5 months';
            document.getElementById('risk-reduction')?.textContent = '75%';
            document.getElementById('implementation-time')?.textContent = '15 days';
            
            // Populate key insights
            const insightsList = document.getElementById('key-insights-list');
            if (insightsList) {
                insightsList.innerHTML = `
                    <div class="insight-item">
                        <div class="insight-icon"><i class="fas fa-dollar-sign"></i></div>
                        <div class="insight-content">
                            <h4>Cost Savings</h4>
                            <p>Portnox Cloud provides significant cost savings by eliminating hardware requirements and reducing maintenance costs.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon"><i class="fas fa-tachometer-alt"></i></div>
                        <div class="insight-content">
                            <h4>Faster Implementation</h4>
                            <p>Cloud-based deployment enables rapid implementation with minimal IT overhead.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="insight-content">
                            <h4>Enhanced Security</h4>
                            <p>Continuous compliance monitoring and zero-trust architecture significantly reduce security risks.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <div class="insight-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="insight-content">
                            <h4>Scalability</h4>
                            <p>Cloud-based solution scales effortlessly with your organization's growth without additional hardware.</p>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    // Apply vendor card fixes
    function applyVendorCardFixes() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        // Add click event to vendor cards
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                vendorCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Get vendor ID
                const vendorId = this.dataset.vendor;
                
                // Show vendor preview
                const previewContainer = document.getElementById('vendor-preview');
                if (previewContainer) {
                    const vendorName = this.querySelector('h3')?.textContent || vendorId;
                    
                    previewContainer.innerHTML = `
                        <div class="vendor-preview-card">
                            <h3>Selected: ${vendorName}</h3>
                            <div class="preview-content">
                                <p>You've selected ${vendorName} as your current NAC solution. We'll compare its costs and capabilities with Portnox Cloud.</p>
                                
                                <div class="preview-comparison">
                                    <div class="comparison-item">
                                        <span class="label">Deployment Model:</span>
                                        <span class="value">${vendorId === 'noNac' ? 'None' : (vendorId === 'securew2' ? 'Cloud' : 'On-Premises')}</span>
                                    </div>
                                    <div class="comparison-item">
                                        <span class="label">Hardware Required:</span>
                                        <span class="value">${vendorId === 'noNac' || vendorId === 'securew2' ? 'No' : 'Yes'}</span>
                                    </div>
                                    <div class="comparison-item">
                                        <span class="label">Implementation Time:</span>
                                        <span class="value">${vendorId === 'noNac' ? 'None' : (vendorId === 'securew2' ? 'Weeks' : 'Months')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
        });
    }
    
    // Initialize fallback wizard if no wizard manager is available
    function initFallbackWizard() {
        console.log('Initializing fallback wizard logic');
        
        // Add step indicators if they don't exist
        const progressSteps = document.getElementById('progress-steps');
        if (progressSteps && progressSteps.children.length === 0) {
            const steps = document.querySelectorAll('.wizard-step');
            const stepTitles = [
                'Select Your Current NAC Solution',
                'Industry & Compliance Requirements',
                'Organization Configuration',
                'Advanced Cost Configuration',
                'Review Configuration'
            ];
            
            steps.forEach((step, index) => {
                const stepIndicator = document.createElement('div');
                stepIndicator.className = 'step-indicator';
                stepIndicator.dataset.step = index + 1;
                
                const stepDot = document.createElement('div');
                stepDot.className = 'step-dot';
                if (index === 0) stepDot.classList.add('active');
                
                const stepLabel = document.createElement('div');
                stepLabel.className = 'step-label';
                if (index === 0) stepLabel.classList.add('active');
                stepLabel.textContent = stepTitles[index] || `Step ${index + 1}`;
                
                stepIndicator.appendChild(stepDot);
                stepIndicator.appendChild(stepLabel);
                progressSteps.appendChild(stepIndicator);
            });
        }
        
        // Ensure first step is active
        const firstStep = document.querySelector('.wizard-step');
        if (firstStep) {
            firstStep.classList.add('active');
        }
        
        // Update progress bar
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
    
    console.log('Total Cost Analyzer initialized successfully');
});

// Initialize modern UI
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing modern UI...');
  // This function is defined in modern-ui.js
  if (typeof initializeUI === 'function') {
    initializeUI();
  } else {
    console.error('Modern UI initialization function not found');
  }
});
