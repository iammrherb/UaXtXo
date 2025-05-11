/**
 * TCO Wizard with Critical Fixes
 */
const TCOWizard = (function() {
    // Copy existing wizard code but add overlay creation
    let currentStep = 1;
    const totalSteps = 6;
    let wizardData = {};
    
    // Vendor data
    const vendorDetails = {
        cisco: {
            name: "Cisco ISE",
            type: "On-Premises",
            description: "Enterprise-grade NAC with extensive features and Cisco ecosystem integration"
        },
        aruba: {
            name: "Aruba ClearPass",  
            type: "On-Premises",
            description: "Comprehensive NAC with strong multi-vendor support and flexible deployment"
        },
        forescout: {
            name: "Forescout",
            type: "On-Premises", 
            description: "Agentless device visibility and control with excellent IoT/OT capabilities"
        },
        fortinac: {
            name: "FortiNAC",
            type: "On-Premises",
            description: "Integrated NAC solution within Fortinet Security Fabric"
        },
        nps: {
            name: "Microsoft NPS",
            type: "On-Premises",
            description: "Basic NAC functionality included with Windows Server"
        },
        securew2: {
            name: "SecureW2",
            type: "Cloud",
            description: "Cloud-based certificate management and passwordless authentication"
        },
        portnox: {
            name: "Portnox Cloud",
            type: "Cloud-Native",
            description: "Zero-trust cloud-native NAC with rapid deployment and unlimited scalability"
        }
    };
    
    // Create wizard overlay if it doesn't exist
    function ensureWizardOverlay() {
        let overlay = document.getElementById('wizard-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'wizard-overlay';
            overlay.className = 'wizard-overlay hidden';
            document.body.appendChild(overlay);
            console.log('Created wizard overlay');
        }
        return overlay;
    }
    
    // Initialize wizard
    function init() {
        console.log('Initializing TCO Wizard...');
        ensureWizardOverlay();
        createWizardDOM();
        setupEventListeners();
        createWizardButton();
    }
    
    // Create wizard DOM structure
    function createWizardDOM() {
        const overlay = ensureWizardOverlay();
        
        const wizardHTML = `
            <div id="wizard-container" class="wizard-container">
                <div class="wizard-header">
                    <div class="wizard-logo">
                        <img src="img/portnox-logo.png" alt="Portnox" onerror="this.style.display='none'">
                    </div>
                    <h2>NAC Total Cost Analyzer</h2>
                    <button id="wizard-close" class="wizard-close">&times;</button>
                </div>
                
                <div class="wizard-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <div class="progress-steps" id="progress-steps">
                        <!-- Steps will be dynamically generated -->
                    </div>
                </div>
                
                <div id="wizard-content" class="wizard-content">
                    <!-- Step content will be dynamically loaded -->
                </div>
                
                <div class="wizard-footer">
                    <div class="wizard-nav-buttons">
                        <button id="wizard-prev" class="btn btn-outline" style="display: none;">
                            <i class="fas fa-arrow-left"></i> Previous
                        </button>
                        <button id="wizard-skip" class="btn btn-text">
                            Skip to Dashboard
                        </button>
                        <button id="wizard-next" class="btn btn-primary">
                            Next <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        overlay.innerHTML = wizardHTML;
        
        // Generate progress steps
        generateProgressSteps();
        
        // Load first step
        loadStep(currentStep);
    }
    
    // Generate progress steps
    function generateProgressSteps() {
        const steps = [
            { number: 1, title: "Current Solution", icon: "fa-server" },
            { number: 2, title: "Industry & Compliance", icon: "fa-building" },
            { number: 3, title: "Organization", icon: "fa-sitemap" },
            { number: 4, title: "Cost Configuration", icon: "fa-calculator" },
            { number: 5, title: "Advanced Options", icon: "fa-cogs" },
            { number: 6, title: "Review & Calculate", icon: "fa-chart-line" }
        ];
        
        const container = document.getElementById('progress-steps');
        if (!container) return;
        
        let html = '';
        
        steps.forEach(step => {
            html += `
                <div class="progress-step ${step.number === currentStep ? 'active' : ''}" data-step="${step.number}">
                    <div class="step-circle">
                        <i class="fas ${step.icon}"></i>
                    </div>
                    <div class="step-title">${step.title}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Load specific step content
    function loadStep(stepNumber) {
        const content = document.getElementById('wizard-content');
        if (!content) return;
        
        // Load step content based on stepNumber
        content.innerHTML = `<div class="wizard-step-content">Step ${stepNumber} content</div>`;
        
        updateProgress();
        updateNavigationButtons();
    }
    
    // Update progress bar
    function updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        if (!progressFill) return;
        
        const progressPercent = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Update step circles
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        const prevButton = document.getElementById('wizard-prev');
        const nextButton = document.getElementById('wizard-next');
        
        if (prevButton) {
            prevButton.style.display = currentStep === 1 ? 'none' : 'block';
        }
        
        if (nextButton) {
            nextButton.textContent = currentStep === totalSteps ? 'View Results' : 'Next';
        }
    }
    
    // Create wizard launch button
    function createWizardButton() {
        let button = document.getElementById('open-wizard-btn');
        if (!button) {
            button = document.createElement('button');
            button.id = 'open-wizard-btn';
            button.className = 'btn btn-primary btn-wizard';
            button.innerHTML = '<i class="fas fa-magic"></i> Start TCO Analysis';
            
            const headerActions = document.querySelector('.header-actions');
            if (headerActions) {
                headerActions.prepend(button);
            } else {
                button.classList.add('floating-wizard-btn');
                document.body.appendChild(button);
            }
            
            button.addEventListener('click', openWizard);
        }
    }
    
    // Open wizard with safety checks
    function openWizard() {
        console.log('Opening wizard...');
        const overlay = ensureWizardOverlay();
        
        // Ensure DOM is created
        if (!document.getElementById('wizard-container')) {
            createWizardDOM();
        }
        
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        loadStep(currentStep);
    }
    
    // Close wizard
    function closeWizard() {
        const overlay = document.getElementById('wizard-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Close button
        document.addEventListener('click', function(e) {
            if (e.target.id === 'wizard-close' || e.target.id === 'wizard-overlay') {
                closeWizard();
            }
        });
        
        // Navigation buttons
        document.addEventListener('click', function(e) {
            if (e.target.id === 'wizard-next' || e.target.closest('#wizard-next')) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    loadStep(currentStep);
                }
            }
            
            if (e.target.id === 'wizard-prev' || e.target.closest('#wizard-prev')) {
                if (currentStep > 1) {
                    currentStep--;
                    loadStep(currentStep);
                }
            }
            
            if (e.target.id === 'wizard-skip' || e.target.closest('#wizard-skip')) {
                closeWizard();
                // Show dashboard
                const dashboard = document.getElementById('dashboard-content');
                if (dashboard) {
                    dashboard.style.display = 'block';
                }
            }
        });
    }
    
    // Public API
    return {
        init,
        openWizard,
        closeWizard,
        getCurrentStep: () => currentStep,
        getTotalSteps: () => totalSteps,
        vendorDetails: vendorDetails,
        wizardData: wizardData
    };
})();

// Replace the original initialization
TCOWizard.init();

// Register with module system if available
if (window.NACAnalyzer && window.NACAnalyzer.register) {
    window.NACAnalyzer.register('TCOWizard', TCOWizard);
    window.NACAnalyzer.checkModules();
}
