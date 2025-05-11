// Professional wizard implementation
class ProfessionalWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.wizardData = {
            currentVendor: null,
            industry: null,
            organizationSize: null,
            deviceCount: null,
            locations: null,
            requirements: []
        };
    }
    
    init() {
        console.log('Initializing NAC Solution Wizard...');
        this.setupEventListeners();
        this.showStep(1);
    }
    
    setupEventListeners() {
        document.getElementById('wizard-next')?.addEventListener('click', () => this.nextStep());
        document.getElementById('wizard-prev')?.addEventListener('click', () => this.prevStep());
        document.getElementById('cast-spell')?.addEventListener('click', () => this.calculateTCO());
    }
    
    showStep(step) {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
        
        // Show current step
        const currentStep = document.querySelector(`.wizard-step[data-step="${step}"]`);
        if (currentStep) {
            currentStep.classList.add('active');
        }
        
        // Update progress
        this.updateProgress(step);
        
        // Update buttons
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');
        const calculateBtn = document.getElementById('cast-spell');
        
        if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'block';
        if (nextBtn) nextBtn.style.display = step === this.totalSteps ? 'none' : 'block';
        if (calculateBtn) calculateBtn.style.display = step === this.totalSteps ? 'block' : 'none';
    }
    
    updateProgress(step) {
        const progressFill = document.getElementById('wizard-progress-fill');
        if (progressFill) {
            const percentage = (step / this.totalSteps) * 100;
            progressFill.style.width = percentage + '%';
        }
        
        // Update progress markers
        document.querySelectorAll('.progress-marker').forEach((marker, index) => {
            if (index + 1 <= step) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.saveStepData();
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }
    
    saveStepData() {
        // Save data based on current step
        switch(this.currentStep) {
            case 1:
                this.wizardData.currentVendor = document.querySelector('.vendor-card.selected')?.dataset.vendor;
                break;
            case 2:
                this.wizardData.industry = document.querySelector('.industry-card.selected')?.dataset.industry;
                break;
            case 3:
                this.wizardData.organizationSize = document.getElementById('organization-size')?.value;
                this.wizardData.deviceCount = document.getElementById('device-count')?.value;
                this.wizardData.locations = document.getElementById('locations')?.value;
                break;
            case 4:
                this.wizardData.requirements = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.id);
                break;
        }
    }
    
    calculateTCO() {
        // Show loading state
        const calculateBtn = document.getElementById('cast-spell');
        if (calculateBtn) {
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
        }
        
        // Simulate calculation
        setTimeout(() => {
            // Redirect to results
            window.location.href = 'index.html#results';
        }, 1500);
    }
}

// Initialize wizard
window.professionalWizard = new ProfessionalWizard();
