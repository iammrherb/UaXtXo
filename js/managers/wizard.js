// Professional NAC Solution Wizard
const Wizard = {
    currentStep: 1,
    totalSteps: 5,
    data: {},
    
    init() {
        console.log('Initializing NAC Solution Wizard...');
        this.setupEventListeners();
        this.showStep(1);
        this.updateProgress();
    },
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('wizard-next')?.addEventListener('click', () => this.nextStep());
        document.getElementById('wizard-prev')?.addEventListener('click', () => this.prevStep());
        document.getElementById('wizard-close')?.addEventListener('click', () => this.close());
        
        // Final calculation button - change from "cast-spell" to "calculate-btn"
        const calculateBtn = document.getElementById('calculate-btn') || document.getElementById('cast-spell');
        calculateBtn?.addEventListener('click', () => this.calculateAndShow());
        
        // Vendor cards
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', () => this.selectVendor(card));
        });
    },
    
    showStep(step) {
        this.currentStep = step;
        
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(el => {
            el.classList.remove('active');
        });
        
        // Show current step
        const currentStepEl = document.querySelector(`#step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Update button visibility
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');
        const calculateBtn = document.getElementById('calculate-btn') || document.getElementById('cast-spell');
        
        if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
        
        if (step === this.totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (calculateBtn) {
                calculateBtn.style.display = 'inline-flex';
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate TCO';
            }
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (calculateBtn) calculateBtn.style.display = 'none';
        }
        
        this.updateProgress();
    },
    
    nextStep() {
        if (this.validateStep()) {
            this.saveStepData();
            this.showStep(this.currentStep + 1);
        }
    },
    
    prevStep() {
        if (this.currentStep > 1) {
            this.showStep(this.currentStep - 1);
        }
    },
    
    updateProgress() {
        const progressBar = document.getElementById('wizard-progress-fill');
        if (progressBar) {
            const percentage = (this.currentStep / this.totalSteps) * 100;
            progressBar.style.width = percentage + '%';
        }
        
        // Update progress markers
        document.querySelectorAll('.progress-marker').forEach((marker, index) => {
            const step = index + 1;
            marker.classList.toggle('active', step <= this.currentStep);
            marker.classList.toggle('completed', step < this.currentStep);
        });
    },
    
    validateStep() {
        // Add validation logic based on current step
        return true;
    },
    
    saveStepData() {
        // Save data based on current step
        switch(this.currentStep) {
            case 1: // Vendor selection
                const selectedVendor = document.querySelector('.vendor-card.selected');
                if (selectedVendor) {
                    this.data.currentVendor = selectedVendor.dataset.vendor;
                }
                break;
                
            case 2: // Industry and compliance
                const selectedIndustry = document.querySelector('.industry-card.selected');
                if (selectedIndustry) {
                    this.data.industry = selectedIndustry.dataset.industry;
                }
                this.data.compliance = Array.from(document.querySelectorAll('.compliance-scroll.selected'))
                    .map(el => el.dataset.framework);
                break;
                
            case 3: // Organization details
                this.data.organizationSize = document.getElementById('organization-size')?.value;
                this.data.deviceCount = document.getElementById('device-count')?.value;
                this.data.locations = document.getElementById('locations')?.value;
                break;
                
            case 4: // Costs
                this.data.fteCost = document.getElementById('fte-cost')?.value;
                this.data.maintenancePercentage = document.getElementById('maintenance-percentage')?.value;
                this.data.downtimeCost = document.getElementById('downtime-cost')?.value;
                break;
        }
    },
    
    selectVendor(card) {
        document.querySelectorAll('.vendor-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    },
    
    calculateAndShow() {
        const calculateBtn = document.getElementById('calculate-btn') || document.getElementById('cast-spell');
        if (calculateBtn) {
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        }
        
        // Collect all wizard data
        this.saveStepData();
        
        // Save to local storage
        localStorage.setItem('wizardData', JSON.stringify(this.data));
        
        // Redirect to main calculator
        setTimeout(() => {
            window.location.href = 'index.html?source=wizard';
        }, 1500);
    },
    
    close() {
        const wizardOverlay = document.getElementById('wizard-overlay');
        if (wizardOverlay) {
            wizardOverlay.classList.remove('active');
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('wizard-overlay')) {
        Wizard.init();
    }
});
