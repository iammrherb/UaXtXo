// Modern Wizard Manager with sophisticated animations
class WizardManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.data = {};
        this.skipMode = false;
        this.transitions = {
            enter: { opacity: 0, y: 30, scale: 0.95 },
            exit: { opacity: 0, y: -30, scale: 0.95 }
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProgressBar();
        this.loadSavedData();
        this.initializeAnimations();
        this.setupSkipOption();
    }

    setupNavigation() {
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        // Advanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentStep > 1) {
                this.previousStep();
            } else if (e.key === 'ArrowRight' && this.currentStep < this.totalSteps) {
                this.nextStep();
            } else if (e.key === 'Escape') {
                this.showSkipConfirmation();
            }
        });
    }

    setupProgressBar() {
        const progressSteps = document.getElementById('progress-steps');
        if (!progressSteps) return;

        // Clear existing steps
        progressSteps.innerHTML = '';

        // Create modern progress steps
        for (let i = 1; i <= this.totalSteps; i++) {
            const step = document.createElement('div');
            step.className = 'progress-step';
            step.dataset.step = i;
            
            const stepInner = document.createElement('div');
            stepInner.className = 'step-inner';
            
            stepInner.innerHTML = `
                <div class="step-icon">
                    <div class="step-number">${i}</div>
                    <div class="step-check"><i class="fas fa-check"></i></div>
                </div>
                <div class="step-label">${this.getStepLabel(i)}</div>
                <div class="step-connector"></div>
            `;
            
            step.appendChild(stepInner);
            progressSteps.appendChild(step);
        }

        this.updateProgress();
    }

    initializeAnimations() {
        // Initialize GSAP timeline for smooth transitions
        this.timeline = gsap.timeline();
        
        // Add micro-interactions to progress steps
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.addEventListener('mouseenter', () => {
                if (!step.classList.contains('active') && !step.classList.contains('completed')) {
                    gsap.to(step.querySelector('.step-icon'), {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            step.addEventListener('mouseleave', () => {
                gsap.to(step.querySelector('.step-icon'), {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Allow clicking on completed steps to navigate
            step.addEventListener('click', () => {
                const stepNumber = parseInt(step.dataset.step);
                if (step.classList.contains('completed') || step.classList.contains('active')) {
                    this.goToStep(stepNumber);
                }
            });
        });
    }

    setupSkipOption() {
        // Add skip wizard button to header
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.getElementById('skip-wizard-btn')) {
            const skipButton = document.createElement('button');
            skipButton.id = 'skip-wizard-btn';
            skipButton.className = 'btn btn-outline btn-icon';
            skipButton.innerHTML = `
                <i class="fas fa-forward"></i>
                <span>Skip Setup</span>
            `;
            skipButton.addEventListener('click', () => this.showSkipConfirmation());
            headerActions.insertBefore(skipButton, headerActions.firstChild);
        }
    }

    showSkipConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content wizard-skip-modal">
                <h3>Skip Wizard Setup?</h3>
                <p>You can manually configure all settings or load default charts. What would you like to do?</p>
                <div class="modal-actions">
                    <button class="btn btn-outline" id="load-defaults">
                        <i class="fas fa-chart-bar"></i> Load Default Charts
                    </button>
                    <button class="btn btn-outline" id="manual-config">
                        <i class="fas fa-cogs"></i> Manual Configuration
                    </button>
                    <button class="btn btn-primary" id="continue-wizard">
                        <i class="fas fa-magic"></i> Continue Wizard
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal entrance
        gsap.from(modal.querySelector('.modal-content'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Handle modal actions
        document.getElementById('load-defaults').addEventListener('click', () => {
            this.loadDefaultConfiguration();
            this.closeModal(modal);
        });

        document.getElementById('manual-config').addEventListener('click', () => {
            this.enableManualConfiguration();
            this.closeModal(modal);
        });

        document.getElementById('continue-wizard').addEventListener('click', () => {
            this.closeModal(modal);
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
    }

    closeModal(modal) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => modal.remove()
        });
    }

    loadDefaultConfiguration() {
        // Set default values
        this.data = {
            vendor: 'cisco',
            industry: 'technology',
            organization: {
                size: 'medium',
                deviceCount: 2500,
                locations: 5,
                cloudIntegration: true,
                yearsToProject: 3
            },
            costs: {
                fteCost: 120000,
                maintenancePercentage: 18,
                portnoxBasePrice: 4,
                portnoxDiscount: 20
            }
        };

        // Skip to results
        this.completeWizard();
    }

    enableManualConfiguration() {
        // Show all configuration panels at once
        document.getElementById('wizard-container').classList.add('manual-mode');
        
        // Create manual configuration panel
        const configPanel = document.createElement('div');
        configPanel.className = 'manual-config-panel';
        configPanel.innerHTML = `
            <div class="config-header">
                <h2>Manual Configuration</h2>
                <p>Configure all settings manually</p>
            </div>
            <div class="config-sections">
                <div class="config-section vendor-section">
                    <h3>Select Vendors to Compare</h3>
                    <div class="vendor-selector">
                        <label><input type="checkbox" value="cisco" checked> Cisco ISE</label>
                        <label><input type="checkbox" value="aruba"> Aruba ClearPass</label>
                        <label><input type="checkbox" value="forescout"> Forescout</label>
                        <label><input type="checkbox" value="fortinac"> FortiNAC</label>
                        <label><input type="checkbox" value="all"> Compare All</label>
                    </div>
                </div>
                <div class="config-section">
                    <h3>Organization Settings</h3>
                    <!-- Organization form fields -->
                </div>
                <div class="config-section">
                    <h3>Cost Parameters</h3>
                    <!-- Cost configuration fields -->
                </div>
            </div>
            <div class="config-actions">
                <button class="btn btn-primary" id="run-analysis">
                    <i class="fas fa-calculator"></i> Run Analysis
                </button>
            </div>
        `;

        document.getElementById('wizard-container').innerHTML = '';
        document.getElementById('wizard-container').appendChild(configPanel);

        // Handle run analysis
        document.getElementById('run-analysis').addEventListener('click', () => {
            this.completeWizard();
        });
    }

    getStepLabel(step) {
        const labels = {
            1: 'Vendor Selection',
            2: 'Industry & Compliance',
            3: 'Organization',
            4: 'Cost Configuration',
            5: 'Review & Calculate'
        };
        return labels[step] || '';
    }

    updateProgress() {
        // Update progress bar fill
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            const percentage = (this.currentStep / this.totalSteps) * 100;
            gsap.to(progressFill, {
                width: `${percentage}%`,
                duration: 0.5,
                ease: 'power2.out'
            });
        }

        // Update progress steps
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach((step, index) => {
            const stepIcon = step.querySelector('.step-icon');
            const stepLabel = step.querySelector('.step-label');
            const connector = step.querySelector('.step-connector');
            
            if (index < this.currentStep - 1) {
                // Completed step
                step.classList.add('completed');
                step.classList.remove('active');
                
                gsap.to(stepIcon, {
                    backgroundColor: '#34a853',
                    borderColor: '#34a853',
                    duration: 0.3
                });
                
                gsap.to(connector, {
                    backgroundColor: '#34a853',
                    scaleX: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
            } else if (index === this.currentStep - 1) {
                // Active step
                step.classList.add('active');
                step.classList.remove('completed');
                
                gsap.to(stepIcon, {
                    backgroundColor: '#1a73e8',
                    borderColor: '#1a73e8',
                    scale: 1.1,
                    duration: 0.3
                });
                
                gsap.to(stepLabel, {
                    color: '#1a73e8',
                    fontWeight: 600,
                    duration: 0.3
                });
                
            } else {
                // Future step
                step.classList.remove('active', 'completed');
                
                gsap.to(stepIcon, {
                    backgroundColor: 'transparent',
                    borderColor: '#dadce0',
                    scale: 1,
                    duration: 0.3
                });
                
                gsap.to(connector, {
                    scaleX: 0,
                    duration: 0.3
                });
            }
        });
    }

    async nextStep() {
        if (!this.validateCurrentStep()) {
            this.showValidationError();
            return;
        }

        this.saveCurrentStepData();
        
        if (this.currentStep < this.totalSteps) {
            await this.animateStepTransition(this.currentStep + 1, 'forward');
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
        } else {
            this.completeWizard();
        }
    }

    async previousStep() {
        if (this.currentStep > 1) {
            await this.animateStepTransition(this.currentStep - 1, 'backward');
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
        }
    }

    async animateStepTransition(targetStep, direction) {
        const currentStepElement = document.querySelector('.wizard-step.active');
        const targetStepElement = document.getElementById(`step-${targetStep}`);
        
        if (!currentStepElement || !targetStepElement) return;

        // Determine animation direction
        const exitAnimation = direction === 'forward' ? 
            { opacity: 0, x: -50 } : 
            { opacity: 0, x: 50 };
            
        const enterAnimation = direction === 'forward' ? 
            { opacity: 0, x: 50 } : 
            { opacity: 0, x: -50 };

        // Animate out current step
        await gsap.to(currentStepElement, {
            ...exitAnimation,
            duration: 0.3,
            ease: 'power2.in'
        });

        currentStepElement.classList.remove('active');
        targetStepElement.classList.add('active');

        // Animate in new step
        gsap.fromTo(targetStepElement,
            enterAnimation,
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power2.out'
            }
        );
    }

    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            const direction = stepNumber > this.currentStep ? 'forward' : 'backward';
            this.animateStepTransition(stepNumber, direction).then(() => {
                this.currentStep = stepNumber;
                this.showStep(this.currentStep);
                this.updateProgress();
                this.updateNavigation();
            });
        }
    }

    showStep(step) {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(s => {
            s.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.getElementById(`step-${step}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Initialize step-specific functionality
        this.initializeStep(step);
    }

    initializeStep(step) {
        switch(step) {
            case 1:
                this.initVendorSelection();
                break;
            case 2:
                this.initIndustrySelection();
                break;
            case 3:
                this.initOrganizationForm();
                break;
            case 4:
                this.initCostConfiguration();
                break;
            case 5:
                this.initReview();
                break;
        }
    }

    // Step initialization methods
    initVendorSelection() {
        // Initialize modern vendor cards
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach((card, index) => {
            // Add entrance animation
            gsap.from(card, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('selected')) {
                    gsap.to(card, {
                        scale: 1.02,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        duration: 0.3
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('selected')) {
                    gsap.to(card, {
                        scale: 1,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        duration: 0.3
                    });
                }
            });

            // Selection handler
            card.addEventListener('click', () => {
                vendorCards.forEach(c => {
                    c.classList.remove('selected');
                    gsap.to(c, {
                        scale: 1,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        duration: 0.3
                    });
                });

                card.classList.add('selected');
                gsap.to(card, {
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(26,115,232,0.2)',
                    duration: 0.3
                });

                this.updateVendorPreview(card.dataset.vendor);
            });
        });
    }

    initIndustrySelection() {
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                const industry = e.target.value;
                if (industry) {
                    this.updateComplianceFrameworks(industry);
                    this.updateIndustryInsights(industry);
                    
                    // Animate the compliance frameworks entrance
                    const frameworks = document.querySelectorAll('.framework-card');
                    gsap.from(frameworks, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }

    updateComplianceFrameworks(industry) {
        const container = document.getElementById('compliance-frameworks');
        if (!container || !window.ComplianceData) return;

        const frameworks = window.ComplianceData.getFrameworksByIndustry(industry);
        
        container.innerHTML = `
            <h3>Compliance Requirements</h3>
            <div class="frameworks-grid">
                ${frameworks.map(framework => `
                    <div class="framework-card" data-framework="${framework.name}">
                        <div class="framework-header">
                            <i class="fas fa-shield-alt"></i>
                            <h4>${framework.name}</h4>
                        </div>
                        <p class="framework-name">${framework.fullName}</p>
                        <div class="framework-requirements">
                            ${framework.requirements.map(req => `
                                <div class="requirement">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${req}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="compliance-selector">
                <h4>Select Applicable Frameworks</h4>
                <div class="framework-checkboxes">
                    ${frameworks.map(framework => `
                        <label class="framework-checkbox">
                            <input type="checkbox" value="${framework.name}" checked>
                            <span>${framework.name}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        // Add click handlers for framework cards
        const frameworkCards = container.querySelectorAll('.framework-card');
        frameworkCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('selected');
                const checkbox = container.querySelector(`input[value="${card.dataset.framework}"]`);
                if (checkbox) checkbox.checked = card.classList.contains('selected');
            });
        });
    }

    updateIndustryInsights(industry) {
        const container = document.getElementById('industry-insights');
        if (!container || !window.IndustryData) return;

        const industryData = window.IndustryData.getIndustry(industry);
        if (!industryData) return;

        container.innerHTML = `
            <h3>Industry Insights</h3>
            <div class="insights-grid">
                <div class="insight-card metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="metric-content">
                        <h4>Average Breach Cost</h4>
                        <div class="metric-value" data-value="${industryData.avgBreachCost}">$0</div>
                    </div>
                </div>
                <div class="insight-card metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-gavel"></i>
                    </div>
                    <div class="metric-content">
                        <h4>Compliance Penalties</h4>
                        <div class="metric-value" data-value="${industryData.compliancePenalty}">$0</div>
                    </div>
                </div>
                <div class="insight-card metric-card">
                    <div class="metric-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="metric-content">
                        <h4>NAC Adoption Rate</h4>
                        <div class="metric-value" data-value="${industryData.adoptionRate}">0%</div>
                    </div>
                </div>
            </div>
            <div class="challenges-section">
                <h4>Key Security Challenges</h4>
                <div class="challenges-list">
                    ${industryData.challenges.map((challenge, index) => `
                        <div class="challenge-item" style="animation-delay: ${index * 0.1}s">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>${challenge}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Animate metric values
        const metricValues = container.querySelectorAll('.metric-value');
        metricValues.forEach(metric => {
            const targetValue = metric.dataset.value;
            gsap.to(metric, {
                textContent: targetValue,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function() {
                    // Keep the format while animating
                    if (targetValue.includes('$')) {
                        metric.textContent = metric.textContent;
                    }
                }
            });
        });
    }

    validateCurrentStep() {
        switch(this.currentStep) {
            case 1:
                return this.validateVendorSelection();
            case 2:
                return this.validateIndustrySelection();
            case 3:
                return this.validateOrganizationForm();
            case 4:
                return true; // Cost configuration is optional
            case 5:
                return true; // Review step always valid
            default:
                return true;
        }
    }

    // Validation methods
    validateVendorSelection() {
        const selectedVendor = document.querySelector('.vendor-card.selected');
        return selectedVendor !== null;
    }

    validateIndustrySelection() {
        const industrySelect = document.getElementById('industry-select');
        const selectedFrameworks = document.querySelectorAll('.framework-checkbox input:checked');
        return industrySelect && industrySelect.value !== '' && selectedFrameworks.length > 0;
    }

    validateOrganizationForm() {
        const deviceCount = document.getElementById('device-count');
        const locations = document.getElementById('locations');
        return deviceCount && deviceCount.value > 0 && locations && locations.value > 0;
    }

    // Error handling
    showValidationError() {
        let message = 'Please complete all required fields.';
        
        switch(this.currentStep) {
            case 1:
                message = 'Please select your current NAC solution.';
                break;
            case 2:
                message = 'Please select your industry and applicable compliance frameworks.';
                break;
            case 3:
                message = 'Please fill in all organization details.';
                break;
        }

        if (window.NotificationManager) {
            window.NotificationManager.show(message, 'error');
        }

        // Shake the current step
        const currentStep = document.querySelector('.wizard-step.active');
        if (currentStep) {
            gsap.fromTo(currentStep, 
                { x: -10 },
                { 
                    x: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)',
                    repeat: 2,
                    yoyo: true
                }
            );
        }
    }

    saveCurrentStepData() {
        switch(this.currentStep) {
            case 1:
                this.data.vendor = this.getSelectedVendor();
                break;
            case 2:
                this.data.industry = this.getSelectedIndustry();
                this.data.compliance = this.getSelectedCompliance();
                break;
            case 3:
                this.data.organization = this.getOrganizationData();
                break;
            case 4:
                this.data.costs = this.getCostData();
                break;
        }
        
        // Save to localStorage
        localStorage.setItem('wizardData', JSON.stringify(this.data));
    }

    loadSavedData() {
        const savedData = localStorage.getItem('wizardData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
            gsap.to(prevBtn, {
                opacity: this.currentStep === 1 ? 0.5 : 1,
                duration: 0.3
            });
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate TCO';
                nextBtn.classList.add('calculate-btn');
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
                nextBtn.classList.remove('calculate-btn');
            }
        }
    }

    completeWizard() {
        this.saveCurrentStepData();
        
        // Fade out wizard
        gsap.to('#wizard-container', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.getElementById('wizard-container').classList.add('hidden');
                document.getElementById('results-container').classList.remove('hidden');
                
                // Fade in results
                gsap.from('#results-container', {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                
                this.calculateResults();
            }
        });
    }

    calculateResults() {
        if (window.LoadingManager) {
            window.LoadingManager.show('Calculating TCO comparison...');
        }
        
        // Simulate calculation
        setTimeout(() => {
            if (window.LoadingManager) {
                window.LoadingManager.hide();
            }
            this.showResults();
        }, 2000);
    }

    showResults() {
        // Update summary metrics
        this.updateSummaryMetrics();
        
        // Generate charts
        this.generateCharts();
        
        // Show insights
        this.generateInsights();
    }

    // Data collection methods
    getSelectedVendor() {
        const selectedVendor = document.querySelector('.vendor-card.selected');
        return selectedVendor ? selectedVendor.dataset.vendor : null;
    }

    getSelectedIndustry() {
        const industrySelect = document.getElementById('industry-select');
        return industrySelect ? industrySelect.value : null;
    }

    getSelectedCompliance() {
        const selectedFrameworks = document.querySelectorAll('.framework-checkbox input:checked');
        return Array.from(selectedFrameworks).map(checkbox => checkbox.value);
    }

    getOrganizationData() {
        return {
            size: document.getElementById('organization-size')?.value,
            deviceCount: parseInt(document.getElementById('device-count')?.value || 0),
            locations: parseInt(document.getElementById('locations')?.value || 0),
            cloudIntegration: document.getElementById('cloud-integration')?.checked,
            legacyDevices: document.getElementById('legacy-devices')?.checked,
            byodSupport: document.getElementById('byod-support')?.checked,
            yearsToProject: parseInt(document.getElementById('years-to-project')?.value || 3),
            implementationUrgency: document.getElementById('implementation-urgency')?.value
        };
    }

    getCostData() {
        return {
            fteCost: parseInt(document.getElementById('fte-cost')?.value || 120000),
            fteAllocation: parseInt(document.getElementById('fte-allocation')?.value || 50),
            maintenancePercentage: parseInt(document.getElementById('maintenance-percentage')?.value || 18),
            downtimeCost: parseInt(document.getElementById('downtime-cost')?.value || 10000),
            consultingRate: parseInt(document.getElementById('consulting-rate')?.value || 2000),
            implementationDays: parseInt(document.getElementById('implementation-days')?.value || 60),
            trainingPerUser: parseInt(document.getElementById('training-per-user')?.value || 500),
            usersToTrain: parseInt(document.getElementById('users-to-train')?.value || 20),
            portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price')?.value || 4),
            portnoxDiscount: parseInt(document.getElementById('portnox-discount')?.value || 20)
        };
    }

    updateSummaryMetrics() {
        // Enhanced metric animation
        const metrics = {
            'total-savings': { value: 425000, prefix: '$', suffix: '' },
            'savings-percentage': { value: 35, prefix: '', suffix: '%' },
            'breakeven-point': { value: 18, prefix: '', suffix: ' months' },
            'risk-reduction': { value: 62, prefix: '', suffix: '%' },
            'implementation-time': { value: 14, prefix: '', suffix: ' days' }
        };

        Object.entries(metrics).forEach(([id, config]) => {
            const element = document.getElementById(id);
            if (element) {
                const countUp = typeof CountUp !== "undefined" ? new CountUp(element, config.value, {
                    duration: 2,
                    prefix: config.prefix,
                    suffix: config.suffix,
                    separator: ',',
                    decimal: '.'
                }),
                
                if (!countUp.error) {
                    countUp.start() : null;
                } else {
                    element.textContent = `${config.prefix}${config.value}${config.suffix}`;
                }
            }
        });
    }

    generateCharts() {
        if (window.chartBuilder) {
            window.chartBuilder.createCharts({
                currentVendor: this.data.vendor,
                deviceCount: this.data.organization?.deviceCount || 1000,
                yearsToProject: this.data.organization?.yearsToProject || 3
            });
        }
    }

    generateInsights() {
        const insights = [
            {
                icon: 'fas fa-chart-line',
                title: 'Significant Cost Reduction',
                description: 'Switching to Portnox Cloud could save your organization 35% over 3 years.',
                impact: 'high'
            },
            {
                icon: 'fas fa-clock',
                title: 'Faster Implementation',
                description: 'Deploy 76% faster with cloud-native architecture.',
                impact: 'high'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Enhanced Security',
                description: 'Reduce security risks by 62% with Zero Trust architecture.',
                impact: 'high'
            },
            {
                icon: 'fas fa-users',
                title: 'Reduced IT Overhead',
                description: 'Lower personnel requirements by 93% with automated management.',
                impact: 'medium'
            }
        ];

        const insightsList = document.getElementById('key-insights-list');
        if (insightsList) {
            insightsList.innerHTML = insights.map((insight, index) => `
                <div class="insight-item ${insight.impact}-impact" style="animation-delay: ${index * 0.1}s">
                    <div class="insight-icon">
                        <i class="${insight.icon}"></i>
                    </div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.description}</p>
                    </div>
                    <div class="insight-indicator"></div>
                </div>
            `).join('');
        }
    }
}

// Initialize the wizard manager as a singleton
if (!window.wizardManager) {
    window.wizardManager = new WizardManager();
}
