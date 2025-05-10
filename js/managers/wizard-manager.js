// Wizard Manager
class WizardManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.data = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProgressSteps();
        this.updateProgress();
    }

    setupEventListeners() {
        // Wizard button
        const wizardBtn = document.getElementById('wizard-btn');
        if (wizardBtn) {
            wizardBtn.addEventListener('click', () => this.openWizard());
        }

        // Navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        // Vendor selection
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', () => this.selectVendor(card));
        });

        // Calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateResults());
        }
    }

    setupProgressSteps() {
        const progressSteps = document.getElementById('progress-steps');
        if (!progressSteps) return;

        const steps = [
            { number: 1, label: 'NAC Vendor' },
            { number: 2, label: 'Organization' },
            { number: 3, label: 'Review' }
        ];

        progressSteps.innerHTML = steps.map(step => `
            <div class="progress-step" data-step="${step.number}">
                <div class="step-circle">${step.number}</div>
                <div class="step-label">${step.label}</div>
            </div>
        `).join('');
    }

    openWizard() {
        document.getElementById('wizard-container').classList.remove('hidden');
        document.getElementById('results-container').classList.add('hidden');
        this.currentStep = 1;
        this.showStep(1);
        this.updateProgress();
    }

    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStep = document.getElementById(`step-${stepNumber}`);
        if (currentStep) {
            currentStep.classList.add('active');
        }

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.saveStepData();
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
                
                // Populate review on last step
                if (this.currentStep === this.totalSteps) {
                    this.populateReview();
                }
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    updateProgress() {
        // Update progress bar
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        }

        // Update step indicators
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNumber = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'flex';
            }
        }
    }

    selectVendor(card) {
        // Remove selection from all cards
        document.querySelectorAll('.vendor-card').forEach(c => {
            c.classList.remove('selected');
        });

        // Select clicked card
        card.classList.add('selected');
        this.data.vendor = card.dataset.vendor;
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                if (!this.data.vendor) {
                    alert('Please select your current NAC vendor');
                    return false;
                }
                break;
            case 2:
                const deviceCount = document.getElementById('device-count').value;
                if (!deviceCount || deviceCount < 100) {
                    alert('Please enter a valid device count (minimum 100)');
                    return false;
                }
                break;
        }
        return true;
    }

    saveStepData() {
        switch (this.currentStep) {
            case 2:
                this.data.organization = {
                    size: document.getElementById('org-size').value,
                    deviceCount: parseInt(document.getElementById('device-count').value),
                    locations: parseInt(document.getElementById('locations').value),
                    industry: document.getElementById('industry').value,
                    analysisPeriod: parseInt(document.getElementById('analysis-period').value),
                    implementationTimeline: document.getElementById('implementation-timeline').value
                };
                
                // Collect compliance requirements
                this.data.compliance = [];
                document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked').forEach(checkbox => {
                    this.data.compliance.push(checkbox.value);
                });
                break;
        }
    }

    populateReview() {
        // Review vendor
        const vendorReview = document.getElementById('review-vendor');
        const vendorInfo = this.getVendorInfo(this.data.vendor);
        vendorReview.innerHTML = `
            <strong>${vendorInfo.name}</strong><br>
            ${vendorInfo.description}
        `;

        // Review organization
        const orgReview = document.getElementById('review-organization');
        orgReview.innerHTML = `
            <strong>Organization Size:</strong> ${this.data.organization.size}<br>
            <strong>Device Count:</strong> ${this.data.organization.deviceCount.toLocaleString()}<br>
            <strong>Locations:</strong> ${this.data.organization.locations}<br>
            <strong>Industry:</strong> ${this.data.organization.industry}<br>
            <strong>Analysis Period:</strong> ${this.data.organization.analysisPeriod} years
        `;

        // Review compliance
        const complianceReview = document.getElementById('review-compliance');
        complianceReview.innerHTML = this.data.compliance.length ? 
            this.data.compliance.join(', ') : 
            'No specific compliance requirements selected';
    }

    getVendorInfo(vendorId) {
        const vendors = {
            cisco: { name: 'Cisco ISE', description: 'Enterprise-grade NAC solution' },
            aruba: { name: 'Aruba ClearPass', description: 'Policy management platform' },
            forescout: { name: 'Forescout', description: 'Agentless device visibility' },
            fortinac: { name: 'FortiNAC', description: 'Integrated security fabric' },
            nps: { name: 'Microsoft NPS', description: 'Windows Server NAC' },
            securew2: { name: 'SecureW2', description: 'Cloud RADIUS solution' },
            none: { name: 'No NAC Solution', description: 'Currently unprotected' }
        };
        return vendors[vendorId] || { name: 'Unknown', description: '' };
    }

    calculateResults() {
        // Save configuration
        this.saveStepData();
        
        // Hide wizard, show results
        document.getElementById('wizard-container').classList.add('hidden');
        document.getElementById('results-container').classList.remove('hidden');
        
        // Calculate and display results
        this.performCalculations();
        
        // Initialize charts
        if (window.chartManager) {
            window.chartManager.init();
        }
    }

    performCalculations() {
        // This would contain the actual TCO calculation logic
        // For now, we'll use sample data
        const results = {
            currentVendor: this.data.vendor,
            organization: this.data.organization,
            savingsPercentage: 35,
            timeToValue: 14,
            securityImprovement: 62,
            roiTimeline: 18
        };
        
        // Store results for charts
        window.calculationResults = results;
    }
}

// Initialize wizard manager
window.wizardManager = new WizardManager();
