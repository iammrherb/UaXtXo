// Enhanced NAC Architecture Designer Pro - Main Entry Point
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing NAC Architecture Designer Pro...');
    
    // Initialize enhanced UI components
    EnhancedUI.init();
    
    // Initialize particle background
    if (document.getElementById('particles-js')) {
        EnhancedCharts.initParticleBackground();
    }
    
    // Initialize animations
    EnhancedCharts.initAnimations();
    
    // Initialize vendor selection
    initializeVendorSelection();
    
    // Initialize wizard navigation
    initializeWizard();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize chart defaults
    Chart.defaults.plugins.datalabels = {
        display: false
    };
    
    console.log('✅ NAC Architecture Designer Pro initialized successfully!');
});

// Vendor selection handler
function initializeVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        card.addEventListener('click', () => {
            const vendorId = card.getAttribute('data-vendor');
            
            // Remove selection from all cards
            vendorCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            card.classList.add('selected');
            
            // Update vendor info
            updateVendorInfo(vendorId);
            
            // Enable next button
            updateWizardNavigation();
            
            // Show notification
            EnhancedUI.showNotification(`Selected ${VendorData.getVendor(vendorId)?.name || 'vendor'}`, 'success');
        });
    });
}

// Update vendor information display
function updateVendorInfo(vendorId) {
    const vendor = VendorData.getVendor(vendorId);
    const infoBox = document.getElementById('vendor-info');
    const infoTitle = document.getElementById('vendor-info-title');
    const infoDescription = document.getElementById('vendor-info-description');
    
    if (vendor && infoBox) {
        infoTitle.textContent = vendor.name;
        infoDescription.textContent = vendor.description;
        infoBox.classList.remove('hidden');
        
        // Animate info box
        gsap.from(infoBox, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Initialize wizard navigation
function initializeWizard() {
    const steps = document.querySelectorAll('.wizard-step-content');
    let currentStep = 0;
    
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    }
    
    function goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            // Hide current step
            steps[currentStep].classList.remove('active');
            
            // Show new step
            steps[stepIndex].classList.add('active');
            currentStep = stepIndex;
            
            // Update navigation
            updateWizardNavigation();
            
            // Animate step transition
            gsap.from(steps[stepIndex], {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }
    
    function validateCurrentStep() {
        // Add validation logic for each step
        switch(currentStep) {
            case 0: // Vendor selection
                return document.querySelector('.vendor-card.selected') !== null;
            case 1: // Industry selection
                return document.getElementById('industry-selector').value !== 'none';
            case 2: // Organization details
                return validateOrganizationForm();
            default:
                return true;
        }
    }
}

// Update wizard navigation buttons
function updateWizardNavigation() {
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const currentStep = document.querySelector('.wizard-step-content.active');
    
    if (nextBtn) {
        nextBtn.disabled = !validateCurrentStep();
    }
    
    if (prevBtn) {
        prevBtn.style.display = currentStep?.previousElementSibling ? 'inline-flex' : 'none';
    }
}

// Initialize form handlers
function initializeFormHandlers() {
    // Organization size handler
    const orgSizeSelect = document.getElementById('organization-size');
    if (orgSizeSelect) {
        orgSizeSelect.addEventListener('change', updateDeviceCountRange);
    }
    
    // Multiple locations handler
    const multipleLocations = document.getElementById('multiple-locations');
    const locationCountContainer = document.getElementById('location-count-container');
    
    if (multipleLocations && locationCountContainer) {
        multipleLocations.addEventListener('change', (e) => {
            if (e.target.checked) {
                locationCountContainer.classList.remove('hidden');
                gsap.from(locationCountContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(locationCountContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        locationCountContainer.classList.add('hidden');
                    }
                });
            }
        });
    }
    
    // Legacy devices handler
    const legacyDevices = document.getElementById('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
    
    if (legacyDevices && legacyPercentageContainer) {
        legacyDevices.addEventListener('change', (e) => {
            if (e.target.checked) {
                legacyPercentageContainer.classList.remove('hidden');
                gsap.from(legacyPercentageContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(legacyPercentageContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        legacyPercentageContainer.classList.add('hidden');
                    }
                });
            }
        });
    }
}

// Validate organization form
function validateOrganizationForm() {
    const deviceCount = document.getElementById('device-count').value;
    return deviceCount && parseInt(deviceCount) > 0;
}

// Update device count range based on organization size
function updateDeviceCountRange(e) {
    const deviceCountInput = document.getElementById('device-count');
    const size = e.target.value;
    
    const ranges = {
        small: { min: 100, max: 1000, default: 500 },
        medium: { min: 1000, max: 5000, default: 2500 },
        large: { min: 5000, max: 50000, default: 10000 }
    };
    
    if (deviceCountInput && ranges[size]) {
        deviceCountInput.min = ranges[size].min;
        deviceCountInput.max = ranges[size].max;
        deviceCountInput.value = ranges[size].default;
    }
}

// Export functions for use in other modules
window.updateVendorInfo = updateVendorInfo;
window.updateWizardNavigation = updateWizardNavigation;
