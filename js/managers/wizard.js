// Wizard Manager
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
            gsap.from(currentStepElement, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: 'power2.out'
            });
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

    validateCurrentStep() {
        switch(this.currentStep) {
            case 1:
                return this.validateVendorSelection();
            case 2:
                return this.validateIndustrySelection();
            case 3:
                return this.validateOrganizationForm();
            case 4:
                return this.validateCostConfiguration();
            case 5:
                return true; // Review step always valid
            default:
                return true;
        }
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
        LoadingManager.show('Calculating TCO comparison...');
        
        // Simulate calculation
        setTimeout(() => {
            LoadingManager.hide();
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

    updateSummaryMetrics() {
        // Example calculations
        const totalSavings = 425000;
        const savingsPercentage = 35;
        const breakevenPoint = 18;
        const riskReduction = 62;
        const implementationTime = 14;

        // Update DOM
        document.getElementById('total-savings').textContent = `$${totalSavings.toLocaleString()}`;
        document.getElementById('savings-percentage').textContent = `${savingsPercentage}%`;
        document.getElementById('breakeven-point').textContent = `${breakevenPoint} months`;
        document.getElementById('risk-reduction').textContent = `${riskReduction}%`;
        document.getElementById('implementation-time').textContent = `${implementationTime} days`;

        // Animate numbers
        const counters = document.querySelectorAll('.metric-value');
        counters.forEach(counter => {
            const value = parseInt(counter.textContent.replace(/\D/g, ''));
            if (value) {
                const countUp = new CountUp(counter, value, {
                    duration: 2,
                    prefix: counter.textContent.includes('$') ? '$' : '',
                    suffix: counter.textContent.includes('%') ? '%' : ''
                });
                countUp.start();
            }
        });
    }

    generateCharts() {
        // TCO Comparison Chart
        const tcoCtx = document.getElementById('tco-comparison-chart');
        if (tcoCtx) {
            new Chart(tcoCtx, {
                type: 'bar',
                data: {
                    labels: ['Current Solution', 'Portnox Cloud'],
                    datasets: [{
                        label: '3-Year TCO',
                        data: [1200000, 775000],
                        backgroundColor: ['#ea4335', '#34a853'],
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => `$${value.toLocaleString()}`
                            }
                        }
                    }
                }
            });
        }

        // Cost Breakdown Chart
        const breakdownCtx = document.getElementById('cost-breakdown-chart');
        if (breakdownCtx) {
            new Chart(breakdownCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Hardware', 'Licensing', 'Implementation', 'Maintenance', 'Personnel'],
                    datasets: [{
                        data: [150000, 280000, 125000, 180000, 465000],
                        backgroundColor: [
                            '#1a73e8',
                            '#34a853',
                            '#fbbc04',
                            '#ea4335',
                            '#4285f4'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
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

    // Validation methods
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

        NotificationManager.show(message, 'error');
    }
}

// Initialize wizard
const wizardManager = new WizardManager();
window.wizardManager = wizardManager;
