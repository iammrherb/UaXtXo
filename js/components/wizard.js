// Wizard Component
class WizardManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.data = {};
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProgressBar();
        this.setupValidation();
        this.loadSavedData();
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

        // Setup keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentStep > 1) {
                this.previousStep();
            } else if (e.key === 'ArrowRight' && this.currentStep < this.totalSteps) {
                this.nextStep();
            }
        });
    }

    setupProgressBar() {
        const progressSteps = document.getElementById('progress-steps');
        if (!progressSteps) return;

        // Create progress steps
        for (let i = 1; i <= this.totalSteps; i++) {
            const step = document.createElement('div');
            step.className = 'progress-step';
            step.innerHTML = `
                <div class="progress-step-icon">${i}</div>
                <div class="progress-step-label">${this.getStepLabel(i)}</div>
            `;
            progressSteps.appendChild(step);
        }

        this.updateProgress();
    }

    setupValidation() {
        // Setup validation rules for each step
        this.validationRules = {
            1: () => this.validateVendorSelection(),
            2: () => this.validateIndustrySelection(),
            3: () => this.validateOrganizationForm(),
            4: () => this.validateCostConfiguration(),
            5: () => true // Review step always valid
        };
    }

    getStepLabel(step) {
        const labels = {
            1: 'Vendor',
            2: 'Industry',
            3: 'Organization',
            4: 'Configuration',
            5: 'Review'
        };
        return labels[step] || '';
    }

    updateProgress() {
        // Update progress bar
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        }

        // Update progress steps
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach((step, index) => {
            if (index < this.currentStep - 1) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === this.currentStep - 1) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
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
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
        } else {
            this.completeWizard();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
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
            
            // Animate step entrance
            if (typeof gsap !== 'undefined') {
                gsap.from(currentStepElement, {
                    opacity: 0,
                    x: 50,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
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

    initVendorSelection() {
        // Initialize vendor selection handlers
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            if (!card.hasEventListener) {
                card.addEventListener('click', () => {
                    vendorCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    this.updateVendorPreview(card.dataset.vendor);
                });
                card.hasEventListener = true;
            }
        });
    }

    initIndustrySelection() {
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect && !industrySelect.hasEventListener) {
            industrySelect.addEventListener('change', (e) => {
                const industry = e.target.value;
                if (industry) {
                    this.updateComplianceFrameworks(industry);
                    this.updateIndustryInsights(industry);
                }
            });
            industrySelect.hasEventListener = true;
        }
    }

    initOrganizationForm() {
        // Initialize organization form handlers
        const orgSize = document.getElementById('organization-size');
        if (orgSize && !orgSize.hasEventListener) {
            orgSize.addEventListener('change', this.updateDeviceCountRange.bind(this));
            orgSize.hasEventListener = true;
        }
    }

    initCostConfiguration() {
        // Initialize cost configuration handlers
        const costTabs = document.querySelectorAll('.cost-tab');
        costTabs.forEach(tab => {
            if (!tab.hasEventListener) {
                tab.addEventListener('click', () => {
                    const tabName = tab.dataset.tab;
                    this.switchCostTab(tabName);
                });
                tab.hasEventListener = true;
            }
        });

        // Initialize sliders
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            if (!slider.hasEventListener) {
                slider.addEventListener('input', this.updateSliderValue.bind(this));
                slider.hasEventListener = true;
            }
        });
    }

    initReview() {
        // Populate review section with collected data
        this.populateReviewSection();
    }

    validateCurrentStep() {
        const validationFunc = this.validationRules[this.currentStep];
        return validationFunc ? validationFunc() : true;
    }

    validateVendorSelection() {
        const selectedVendor = document.querySelector('.vendor-card.selected');
        return selectedVendor !== null;
    }

    validateIndustrySelection() {
        const industrySelect = document.getElementById('industry-select');
        return industrySelect && industrySelect.value !== '';
    }

    validateOrganizationForm() {
        const deviceCount = document.getElementById('device-count');
        const locations = document.getElementById('locations');
        
        return deviceCount && deviceCount.value > 0 && 
               locations && locations.value > 0;
    }

    validateCostConfiguration() {
        // Cost configuration is optional, so always valid
        return true;
    }

    saveCurrentStepData() {
        switch(this.currentStep) {
            case 1:
                this.data.vendor = this.getSelectedVendor();
                break;
            case 2:
                this.data.industry = this.getSelectedIndustry();
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
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = 'Calculate <i class="fas fa-calculator"></i>';
                nextBtn.onclick = () => this.completeWizard();
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            }
        }
    }

    completeWizard() {
        this.saveCurrentStepData();
        document.getElementById('wizard-container').classList.add('hidden');
        document.getElementById('results-container').classList.remove('hidden');
        this.calculateResults();
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

    // Error handling
    showValidationError() {
        let message = 'Please complete all required fields.';
        
        switch(this.currentStep) {
            case 1:
                message = 'Please select your current NAC solution.';
                break;
            case 2:
                message = 'Please select your industry.';
                break;
            case 3:
                message = 'Please fill in all organization details.';
                break;
        }

        if (window.NotificationManager) {
            window.NotificationManager.show(message, 'error');
        }
    }

    // Additional helper methods
    updateDeviceCountRange(e) {
        const size = e.target.value;
        const deviceCount = document.getElementById('device-count');
        
        const ranges = {
            small: { min: 100, max: 1000, default: 500 },
            medium: { min: 1000, max: 5000, default: 2500 },
            large: { min: 5000, max: 10000, default: 7500 },
            enterprise: { min: 10000, max: 100000, default: 25000 }
        };
        
        if (deviceCount && ranges[size]) {
            deviceCount.min = ranges[size].min;
            deviceCount.max = ranges[size].max;
            deviceCount.value = ranges[size].default;
        }
    }

    updateSliderValue(e) {
        const slider = e.target;
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        
        if (valueDisplay) {
            let value = slider.value;
            
            // Format based on slider type
            if (slider.id.includes('cost') || slider.id.includes('rate')) {
                value = `$${parseInt(value).toLocaleString()}`;
            } else if (slider.id.includes('percentage') || slider.id.includes('allocation')) {
                value = `${value}%`;
            } else if (slider.id.includes('days')) {
                value = `${value} days`;
            }
            
            valueDisplay.textContent = value;
        }
    }

    switchCostTab(tabName) {
        // Update tabs
        document.querySelectorAll('.cost-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update panels
        document.querySelectorAll('.cost-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}-costs`);
        });
    }

    populateReviewSection() {
        // Populate review with collected data
        const currentSolutionReview = document.getElementById('current-solution-review');
        const organizationReview = document.getElementById('organization-review');
        const costReview = document.getElementById('cost-review');

        if (currentSolutionReview && this.data.vendor) {
            currentSolutionReview.innerHTML = `
                <div class="review-item">
                    <span class="review-label">Current Vendor:</span>
                    <span class="review-value">${this.data.vendor}</span>
                </div>
            `;
        }

        if (organizationReview && this.data.organization) {
            organizationReview.innerHTML = `
                <div class="review-item">
                    <span class="review-label">Organization Size:</span>
                    <span class="review-value">${this.data.organization.size}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Device Count:</span>
                    <span class="review-value">${this.data.organization.deviceCount}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Locations:</span>
                    <span class="review-value">${this.data.organization.locations}</span>
                </div>
            `;
        }

        if (costReview && this.data.costs) {
            costReview.innerHTML = `
                <div class="review-item">
                    <span class="review-label">FTE Cost:</span>
                    <span class="review-value">$${this.data.costs.fteCost.toLocaleString()}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Implementation Days:</span>
                    <span class="review-value">${this.data.costs.implementationDays}</span>
                </div>
            `;
        }
    }

    updateSummaryMetrics() {
        // Example calculations
        const totalSavings = 425000;
        const savingsPercentage = 35;
        const breakevenPoint = 18;
        const riskReduction = 62;
        const implementationTime = 14;

        // Update DOM
        const elements = {
            'total-savings': `$${totalSavings.toLocaleString()}`,
            'savings-percentage': `${savingsPercentage}%`,
            'breakeven-point': `${breakevenPoint} months`,
            'risk-reduction': `${riskReduction}%`,
            'implementation-time': `${implementationTime} days`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    generateCharts() {
        // Delegate to chartBuilder if available
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
                description: 'Switching to Portnox Cloud could save your organization 35% over 3 years.'
            },
            {
                icon: 'fas fa-clock',
                title: 'Faster Implementation',
                description: 'Deploy 76% faster with cloud-native architecture.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Enhanced Security',
                description: 'Reduce security risks by 62% with Zero Trust architecture.'
            },
            {
                icon: 'fas fa-users',
                title: 'Reduced IT Overhead',
                description: 'Lower personnel requirements by 93% with automated management.'
            }
        ];

        const insightsList = document.getElementById('key-insights-list');
        if (insightsList) {
            insightsList.innerHTML = insights.map(insight => `
                <div class="insight-item">
                    <div class="insight-icon">
                        <i class="${insight.icon}"></i>
                    </div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    updateVendorPreview(vendor) {
        // Update vendor preview in step 1
        const preview = document.getElementById('vendor-preview');
        if (!preview) return;
        
        const vendorData = window.VendorData?.getVendor(vendor);
        if (!vendorData) return;
        
        preview.innerHTML = `
            <div class="vendor-preview">
                <h4>${vendorData.name}</h4>
                <p>${vendorData.description}</p>
                <div class="vendor-metrics">
                    <div class="metric">
                        <span class="metric-label">Implementation Time</span>
                        <span class="metric-value">${Object.values(vendorData.implementation).reduce((a, b) => a + b, 0)} days</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">License Cost</span>
                        <span class="metric-value">$${vendorData.costs.licensing}/device/year</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">FTE Required</span>
                        <span class="metric-value">${vendorData.costs.fte}</span>
                    </div>
                </div>
            </div>
        `;
    }

    updateComplianceFrameworks(industry) {
        // Update compliance frameworks based on industry
        const container = document.getElementById('compliance-frameworks');
        if (!container) return;
        
        const frameworks = {
            healthcare: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'],
            financial: ['PCI DSS', 'SOX', 'GLBA', 'FINRA'],
            education: ['FERPA', 'COPPA', 'CIPA'],
            government: ['FISMA', 'FedRAMP', 'NIST 800-53'],
            manufacturing: ['ISO 27001', 'NIST CSF', 'IEC 62443'],
            retail: ['PCI DSS', 'CCPA', 'GDPR'],
            technology: ['SOC 2', 'ISO 27001', 'GDPR'],
            energy: ['NERC CIP', 'ISO 27001', 'NIST CSF']
        };
        
        const industryFrameworks = frameworks[industry] || [];
        
        container.innerHTML = `
            <h3>Compliance Requirements</h3>
            <div class="frameworks-grid">
                ${industryFrameworks.map(framework => `
                    <div class="framework-card">
                        <i class="fas fa-shield-alt"></i>
                        <span>${framework}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    updateIndustryInsights(industry) {
        // Update industry insights
        const container = document.getElementById('industry-insights');
        if (!container) return;
        
        const insights = {
            healthcare: {
                avgBreachCost: '$10.93M',
                compliancePenalty: '$1.5M average',
                adoptionRate: '67%',
                challenges: ['Medical device security', 'PHI protection', 'Remote access']
            },
            financial: {
                avgBreachCost: '$5.85M',
                compliancePenalty: '$2.5M average',
                adoptionRate: '82%',
                challenges: ['Transaction security', 'Customer data protection', 'Regulatory compliance']
            }
        };
        
        const industryData = insights[industry] || {
            avgBreachCost: '$4.45M',
            compliancePenalty: '$500K average',
            adoptionRate: '45%',
            challenges: ['Network security', 'Access control', 'Compliance']
        };
        
        container.innerHTML = `
            <h3>Industry Insights</h3>
            <div class="insights-grid">
                <div class="insight-card">
                    <i class="fas fa-dollar-sign"></i>
                    <div class="insight-content">
                        <h4>Average Breach Cost</h4>
                        <p>${industryData.avgBreachCost}</p>
                    </div>
                </div>
                <div class="insight-card">
                    <i class="fas fa-gavel"></i>
                    <div class="insight-content">
                        <h4>Compliance Penalties</h4>
                        <p>${industryData.compliancePenalty}</p>
                    </div>
                </div>
                <div class="insight-card">
                    <i class="fas fa-chart-line"></i>
                    <div class="insight-content">
                        <h4>NAC Adoption Rate</h4>
                        <p>${industryData.adoptionRate}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Export for use
window.WizardManager = WizardManager;
