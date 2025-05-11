/**
 * Enhanced NAC TCO Wizard with Comprehensive Compliance
 */

const WizardController = (function() {
    // Define steps array FIRST before anything else
    const steps = [
        { id: 1, name: 'vendors', title: 'Current NAC Vendors', icon: 'fa-server' },
        { id: 2, name: 'industry', title: 'Industry & Compliance', icon: 'fa-building' },
        { id: 3, name: 'organization', title: 'Organization Details', icon: 'fa-sitemap' },
        { id: 4, name: 'cost', title: 'Cost Configuration', icon: 'fa-calculator' },
        { id: 5, name: 'sensitivity', title: 'Sensitivity Analysis', icon: 'fa-sliders-h' },
        { id: 6, name: 'review', title: 'Review & Calculate', icon: 'fa-check-circle' }
    ];
    
    // Now define other variables
    let currentStep = 1;
    const totalSteps = 6;
    
    // Wizard state
    const wizardState = {
        selectedVendors: [],
        industry: null,
        complianceFrameworks: [],
        customCompliance: [],
        costConfig: {
            deviceCount: 1000,
            yearsToProject: 3,
            portnoxCostPerDevice: 4.00,
            implementationMonths: 3,
            supportLevel: 'standard'
        },
        sensitivityFactors: {
            itStaffCost: 0,
            hardwareCost: 0,
            energyCost: 0,
            downtime: 0,
            security: 0
        }
    };
    
    // Initialize the wizard
    function init() {
        console.log('Initializing wizard...');
        setupEventListeners();
        renderProgress();
        renderAllSteps();
        showStep(currentStep);
    }
    
    // Render progress bar
    // Ensure steps are defined
    if (typeof steps === "undefined") {
        steps = [
            { id: "vendor-selection", title: "Select Vendor", icon: "fa-server" },
            { id: "industry", title: "Industry & Compliance", icon: "fa-building" },
            { id: "organization", title: "Organization Details", icon: "fa-sitemap" },
            { id: "cost-configuration", title: "Cost Configuration", icon: "fa-calculator" },
            { id: "results", title: "Results & Analysis", icon: "fa-chart-line" }
        ];
    }

    function renderProgress() {
        const progressSteps = document.getElementById('wizard-progress-steps');
        if (!progressSteps) {
            console.error('Progress steps container not found');
            return;
        }
        
        let html = '';
        
        steps.forEach(step => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            html += `
                <div class="progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                    <div class="step-circle">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : step.id}
                    </div>
                    <div class="step-label">${step.title}</div>
                </div>
            `;
        });
        
        progressSteps.innerHTML = html;
        updateProgressBar();
    }
    
    // Update progress bar fill
    function updateProgressBar() {
        const fill = document.getElementById('wizard-progress-fill');
        if (fill) {
            const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            fill.style.width = `${progress}%`;
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        const launchWizardBtn = document.getElementById('launch-wizard');
        const skipToDashboardBtn = document.getElementById('skip-to-dashboard');
        const wizardCloseBtn = document.getElementById('wizard-close');
        const wizardNextBtn = document.getElementById('wizard-next');
        const wizardPrevBtn = document.getElementById('wizard-prev');
        
        if (launchWizardBtn) launchWizardBtn.addEventListener('click', openWizard);
        if (skipToDashboardBtn) skipToDashboardBtn.addEventListener('click', skipToDashboard);
        if (wizardCloseBtn) wizardCloseBtn.addEventListener('click', closeWizard);
        if (wizardNextBtn) wizardNextBtn.addEventListener('click', nextStep);
        if (wizardPrevBtn) wizardPrevBtn.addEventListener('click', prevStep);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.compliance-multiselect')) {
                const dropdown = document.getElementById('compliance-dropdown');
                if (dropdown) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }
    
    // Open wizard
    function openWizard() {
        const modal = document.getElementById('tco-wizard-modal');
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('visible'), 10);
        }
    }
    
    // Close wizard
    function closeWizard() {
        const modal = document.getElementById('tco-wizard-modal');
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }
    
    // Skip to dashboard
    function skipToDashboard() {
        closeWizard();
        const dashboard = document.getElementById('dashboard-content');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
        
        // Load with default data
        if (typeof DashboardController !== 'undefined') {
            DashboardController.loadDefaultData();
        }
    }
    
    // Next step
    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            } else {
                launchAnalysis();
            }
        }
    }
    
    // Previous step
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    // Validate current step
    function validateCurrentStep() {
        switch (currentStep) {
            case 1:
                if (wizardState.selectedVendors.length === 0) {
                    alert('Please select at least one current NAC vendor or "No NAC"');
                    return false;
                }
                return true;
                
            case 2:
                if (!wizardState.industry) {
                    alert('Please select your industry');
                    return false;
                }
                return true;
                
            case 3:
                const deviceCount = document.getElementById('device-count')?.value;
                if (!deviceCount || deviceCount < 10) {
                    alert('Please enter a valid number of devices (minimum 10)');
                    return false;
                }
                return true;
                
            default:
                return true;
        }
    }
    
    // Show specific step
    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
        
        // Show current step
        const currentStepElement = steps[step - 1];
        const stepName = currentStepElement.name;
        const stepElement = document.getElementById(`step-${stepName}`);
        if (stepElement) {
            stepElement.classList.add('active');
        }
        
        // Update progress
        renderProgress();
        
        // Update buttons
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');
        
        if (prevBtn) {
            prevBtn.style.display = step === 1 ? 'none' : 'block';
        }
        
        if (nextBtn) {
            if (step === totalSteps) {
                nextBtn.innerHTML = 'Launch Analysis <i class="fas fa-chart-line"></i>';
                updateReview();
                calculatePreview();
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            }
        }
    }
    
    // Render all steps
    function renderAllSteps() {
        const content = document.getElementById('wizard-content');
        if (!content) {
            console.error('Wizard content container not found');
            return;
        }
        
        let html = '';
        
        // Step 1: Vendor Selection
        html += `
            <div class="wizard-step ${currentStep === 1 ? 'active' : ''}" id="step-vendors">
                <div class="step-header">
                    <h3 class="step-title">Select Current NAC Vendors</h3>
                    <p class="step-description">Choose one or more NAC solutions you're currently using to compare against Portnox Cloud. Select "No NAC" if you don't have a current solution.</p>
                </div>
                
                <div class="vendor-selection-grid" id="vendor-selection">
                    <!-- Vendor cards will be populated here -->
                </div>
                
                <div class="selected-vendors-summary">
                    <h4>Selected Vendors:</h4>
                    <div id="selected-vendors-list" class="vendor-list"></div>
                </div>
                
                <div id="vendor-market-insights" class="market-insights hidden">
                    <!-- Market insights will appear here -->
                </div>
            </div>
        `;
        
        // Step 2: Industry & Compliance
        html += `
            <div class="wizard-step" id="step-industry">
                <div class="step-header">
                    <h3 class="step-title">Industry & Compliance Requirements</h3>
                    <p class="step-description">Select your industry to see relevant compliance frameworks, then choose which apply to your organization.</p>
                </div>
                
                <div class="industry-section">
                    <h4>Select Your Industry</h4>
                    <div class="industry-grid" id="industry-selection">
                        <!-- Industry cards will be populated here -->
                    </div>
                </div>
                
                <div class="compliance-section">
                    <h4>Compliance Frameworks</h4>
                    <p>Select all compliance frameworks that apply to your organization:</p>
                    <div id="compliance-selection">
                        <!-- Compliance dropdown will be populated here -->
                    </div>
                    
                    <div class="custom-compliance">
                        <h4>Additional Compliance Requirements</h4>
                        <p>Add any other compliance frameworks or regulations not listed above:</p>
                        <div class="custom-compliance-input">
                            <input type="text" id="custom-compliance-input" placeholder="Enter compliance framework" class="config-input">
                            <button id="add-compliance" class="btn btn-outline" onclick="WizardController.addCustomCompliance()">Add</button>
                        </div>
                        <div id="custom-compliance-list" class="compliance-list"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Step 3: Organization Details
        html += `
            <div class="wizard-step" id="step-organization">
                <div class="step-header">
                    <h3 class="step-title">Organization Details</h3>
                    <p class="step-description">Provide information about your organization to customize the TCO analysis.</p>
                </div>
                
                <div class="cost-config-grid">
                    <div class="config-group">
                        <label class="config-label">Number of Devices/Users</label>
                        <input type="number" id="device-count" class="config-input" value="1000" min="10">
                        <small>Total devices that will connect to your network</small>
                    </div>
                    
                    <div class="config-group">
                        <label class="config-label">Years to Project</label>
                        <select id="years-to-project" class="config-input">
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3" selected>3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                        <small>Time period for TCO calculation</small>
                    </div>
                    
                    <div class="config-group">
                        <label class="config-label">Number of Locations</label>
                        <input type="number" id="location-count" class="config-input" value="1" min="1">
                        <small>Physical locations requiring NAC</small>
                    </div>
                    
                    <div class="config-group">
                        <label class="config-label">IT Staff Size</label>
                        <input type="number" id="it-staff-size" class="config-input" value="10" min="1">
                        <small>Total IT personnel</small>
                    </div>
                </div>
            </div>
        `;
        
        // Step 4: Cost Configuration
        html += `
            <div class="wizard-step" id="step-cost">
                <div class="step-header">
                    <h3 class="step-title">Cost Configuration</h3>
                    <p class="step-description">Configure cost parameters for accurate TCO comparison.</p>
                </div>
                
                <div class="cost-config-section">
                    <h4>Portnox Pricing</h4>
                    <div class="cost-config-grid">
                        <div class="config-group">
                            <label class="config-label">Cost Per Device/Month ($)</label>
                            <input type="range" id="portnox-cost-slider" class="config-slider" min="2" max="10" step="0.5" value="4">
                            <div class="slider-value">$<span id="portnox-cost-value">4.00</span></div>
                        </div>
                        
                        <div class="config-group">
                            <label class="config-label">Implementation Timeline</label>
                            <select id="implementation-months" class="config-input">
                                <option value="1">1 Month</option>
                                <option value="3" selected>3 Months</option>
                                <option value="6">6 Months</option>
                                <option value="12">12 Months</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="cost-config-section">
                    <h4>Support & Services</h4>
                    <div class="cost-config-grid">
                        <div class="config-group">
                            <label class="config-label">Support Level</label>
                            <select id="support-level" class="config-input">
                                <option value="basic">Basic Support</option>
                                <option value="standard" selected>Standard Support</option>
                                <option value="premium">Premium Support</option>
                                <option value="enterprise">Enterprise Support</option>
                            </select>
                        </div>
                        
                        <div class="config-group">
                            <label class="config-label">Professional Services</label>
                            <select id="professional-services" class="config-input">
                                <option value="none">None</option>
                                <option value="basic">Basic Setup</option>
                                <option value="advanced">Advanced Integration</option>
                                <option value="full">Full Implementation</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Step 5: Sensitivity Analysis
        html += `
            <div class="wizard-step" id="step-sensitivity">
                <div class="step-header">
                    <h3 class="step-title">Sensitivity Analysis</h3>
                    <p class="step-description">Adjust key factors to see their impact on TCO. Move sliders to simulate different scenarios.</p>
                </div>
                
                <div class="sensitivity-controls">
                    <div class="sensitivity-grid">
                        <div class="sensitivity-item">
                            <label class="sensitivity-label">IT Staff Cost Variation</label>
                            <input type="range" id="it-staff-cost-sensitivity" class="sensitivity-slider" min="-30" max="30" value="0">
                            <div class="sensitivity-range">
                                <span>-30%</span>
                                <span>0%</span>
                                <span>+30%</span>
                            </div>
                            <div class="sensitivity-value"><span id="it-staff-value">0</span>%</div>
                            <div class="impact-indicator" id="it-staff-impact">No Impact</div>
                        </div>
                        
                        <div class="sensitivity-item">
                            <label class="sensitivity-label">Hardware Cost Change</label>
                            <input type="range" id="hardware-cost-sensitivity" class="sensitivity-slider" min="-50" max="50" value="0">
                            <div class="sensitivity-range">
                                <span>-50%</span>
                                <span>0%</span>
                                <span>+50%</span>
                            </div>
                            <div class="sensitivity-value"><span id="hardware-value">0</span>%</div>
                            <div class="impact-indicator" id="hardware-impact">No Impact</div>
                        </div>
                        
                        <div class="sensitivity-item">
                            <label class="sensitivity-label">Energy Cost Variation</label>
                            <input type="range" id="energy-cost-sensitivity" class="sensitivity-slider" min="-40" max="100" value="0">
                            <div class="sensitivity-range">
                                <span>-40%</span>
                                <span>0%</span>
                                <span>+100%</span>
                            </div>
                            <div class="sensitivity-value"><span id="energy-value">0</span>%</div>
                            <div class="impact-indicator" id="energy-impact">No Impact</div>
                        </div>
                        
                        <div class="sensitivity-item">
                            <label class="sensitivity-label">Downtime Cost Impact</label>
                            <input type="range" id="downtime-sensitivity" class="sensitivity-slider" min="-50" max="200" value="0">
                            <div class="sensitivity-range">
                                <span>-50%</span>
                                <span>0%</span>
                                <span>+200%</span>
                            </div>
                            <div class="sensitivity-value"><span id="downtime-value">0</span>%</div>
                            <div class="impact-indicator" id="downtime-impact">No Impact</div>
                        </div>
                        
                        <div class="sensitivity-item">
                            <label class="sensitivity-label">Security Incident Cost</label>
                            <input type="range" id="security-sensitivity" class="sensitivity-slider" min="-25" max="300" value="0">
                            <div class="sensitivity-range">
                                <span>-25%</span>
                                <span>0%</span>
                                <span>+300%</span>
                            </div>
                            <div class="sensitivity-value"><span id="security-value">0</span>%</div>
                            <div class="impact-indicator" id="security-impact">No Impact</div>
                        </div>
                    </div>
                    
                    <div class="sensitivity-preview">
                        <h4>Real-time TCO Impact Preview</h4>
                        <div id="sensitivity-impact-chart">
                            <!-- Real-time chart will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Step 6: Review
        html += `
            <div class="wizard-step" id="step-review">
                <div class="step-header">
                    <h3 class="step-title">Review Configuration</h3>
                    <p class="step-description">Review your selections and see a preview of key metrics before launching the full analysis.</p>
                </div>
                
                <div class="review-grid">
                    <div class="review-section">
                        <h3>Selected Vendors</h3>
                        <div id="review-vendors" class="vendor-list"></div>
                    </div>
                    
                    <div class="review-section">
                        <h3>Industry & Compliance</h3>
                        <div class="review-item">
                            <div class="review-label">Industry</div>
                            <div class="review-value" id="review-industry">Not selected</div>
                        </div>
                        <div class="review-item">
                            <div class="review-label">Compliance Frameworks</div>
                            <div class="review-value" id="review-compliance">None selected</div>
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h3>Organization Details</h3>
                        <div class="review-grid-inner">
                            <div class="review-item">
                                <div class="review-label">Number of Devices</div>
                                <div class="review-value" id="review-devices">1000</div>
                            </div>
                            <div class="review-item">
                                <div class="review-label">Years to Project</div>
                                <div class="review-value" id="review-years">3</div>
                            </div>
                            <div class="review-item">
                                <div class="review-label">Number of Locations</div>
                                <div class="review-value" id="review-locations">1</div>
                            </div>
                            <div class="review-item">
                                <div class="review-label">IT Staff Size</div>
                                <div class="review-value" id="review-staff">10</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h3>Cost Configuration</h3>
                        <div class="review-grid-inner">
                            <div class="review-item">
                                <div class="review-label">Portnox Cost/Device/Month</div>
                                <div class="review-value" id="review-portnox-cost">$4.00</div>
                            </div>
                            <div class="review-item">
                                <div class="review-label">Support Level</div>
                                <div class="review-value" id="review-support">Standard</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="preview-results">
                    <h3>Key Metrics Preview</h3>
                    <div class="preview-metrics-grid">
                        <div class="preview-metric">
                            <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
                            <div class="metric-label">Estimated TCO Savings</div>
                            <div class="metric-value" id="preview-tco-savings">Calculating...</div>
                        </div>
                        <div class="preview-metric">
                            <div class="metric-icon"><i class="fas fa-percentage"></i></div>
                            <div class="metric-label">ROI Percentage</div>
                            <div class="metric-value" id="preview-roi">Calculating...</div>
                        </div>
                        <div class="preview-metric">
                            <div class="metric-icon"><i class="fas fa-calendar-check"></i></div>
                            <div class="metric-label">Payback Period</div>
                            <div class="metric-value" id="preview-payback">Calculating...</div>
                        </div>
                        <div class="preview-metric">
                            <div class="metric-icon"><i class="fas fa-shield-alt"></i></div>
                            <div class="metric-label">Security Improvement</div>
                            <div class="metric-value" id="preview-security">Calculating...</div>
                        </div>
                    </div>
                </div>
                
                <div class="review-actions">
                    <button id="launch-analysis" class="btn btn-primary btn-lg">
                        <i class="fas fa-chart-line"></i> Launch Full TCO Analysis
                    </button>
                </div>
            </div>
        `;
        
        content.innerHTML = html;
        
        // Initialize step-specific functionality
        initializeSteps();
    }
    
    // Initialize all steps
    function initializeSteps() {
        initializeVendorSelection();
        initializeIndustrySelection();
        initializeComplianceSelection();
        initializeSensitivityAnalysis();
        initializeReview();
    }
    
    // Initialize vendor selection
    function initializeVendorSelection() {
        const vendors = [
            { id: 'cisco', name: 'Cisco ISE', type: 'On-Premises', logo: 'cisco-logo.png' },
            { id: 'aruba', name: 'Aruba ClearPass', type: 'On-Premises', logo: 'aruba-logo.png' },
            { id: 'forescout', name: 'Forescout', type: 'On-Premises', logo: 'forescout-logo.png' },
            { id: 'fortinac', name: 'FortiNAC', type: 'On-Premises', logo: 'fortinac-logo.png' },
            { id: 'nps', name: 'Microsoft NPS', type: 'On-Premises', logo: 'microsoft-logo.png' },
            { id: 'securew2', name: 'SecureW2', type: 'Cloud', logo: 'securew2-logo.png' },
            { id: 'none', name: 'No NAC', type: 'None', logo: 'no-nac-icon.svg' }
        ];
        
        const container = document.getElementById('vendor-selection');
        if (!container) return;
        
        let html = '';
        
        vendors.forEach(vendor => {
            const vendorData = window.vendorData?.[vendor.id];
            const marketShare = vendorData?.marketShare || 0;
            const rating = vendorData?.customerSatisfaction || 0;
            
            html += `
                <div class="vendor-card" data-vendor="${vendor.id}">
                    <input type="checkbox" class="vendor-checkbox" id="vendor-${vendor.id}">
                    <img src="img/vendors/${vendor.logo}" alt="${vendor.name}" class="vendor-logo" 
                         onerror="this.onerror=null; this.src='img/placeholder-logo.png';">
                    <div class="vendor-name">${vendor.name}</div>
                    <div class="vendor-type">${vendor.type}</div>
                    <div class="vendor-stats">
                        <span class="market-share">${marketShare}% Market Share</span>
                        <span class="rating">${rating}/5 Rating</span>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add event listeners
        container.addEventListener('click', function(e) {
            const card = e.target.closest('.vendor-card');
            if (card) {
                const checkbox = card.querySelector('.vendor-checkbox');
                const vendorId = card.dataset.vendor;
                
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                if (checkbox.checked) {
                    card.classList.add('selected');
                    if (!wizardState.selectedVendors.includes(vendorId)) {
                        wizardState.selectedVendors.push(vendorId);
                    }
                } else {
                    card.classList.remove('selected');
                    wizardState.selectedVendors = wizardState.selectedVendors.filter(v => v !== vendorId);
                }
                
                updateSelectedVendorsList();
                updateVendorInsights();
            }
        });
    }
    
    // Initialize industry selection
    function initializeIndustrySelection() {
        const industries = [
            { id: 'healthcare', name: 'Healthcare', icon: 'fa-hospital' },
            { id: 'financial', name: 'Financial Services', icon: 'fa-university' },
            { id: 'retail', name: 'Retail', icon: 'fa-shopping-cart' },
            { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
            { id: 'government', name: 'Government', icon: 'fa-landmark' },
            { id: 'manufacturing', name: 'Manufacturing', icon: 'fa-industry' },
            { id: 'technology', name: 'Technology', icon: 'fa-laptop-code' },
            { id: 'hospitality', name: 'Hospitality', icon: 'fa-hotel' },
            { id: 'energy', name: 'Energy & Utilities', icon: 'fa-bolt' },
            { id: 'transportation', name: 'Transportation', icon: 'fa-truck' },
            { id: 'telecom', name: 'Telecommunications', icon: 'fa-satellite-dish' },
            { id: 'defense', name: 'Defense & Aerospace', icon: 'fa-fighter-jet' },
            { id: 'other', name: 'Other', icon: 'fa-building' }
        ];
        
        const container = document.getElementById('industry-selection');
        if (!container) return;
        
        let html = '';
        
        industries.forEach(industry => {
            html += `
                <div class="industry-card" data-industry="${industry.id}">
                    <div class="industry-icon">
                        <i class="fas ${industry.icon}"></i>
                    </div>
                    <div class="industry-name">${industry.name}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add event listeners
        container.addEventListener('click', function(e) {
            const card = e.target.closest('.industry-card');
            if (card) {
                document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                wizardState.industry = card.dataset.industry;
                updateComplianceFrameworks(card.dataset.industry);
            }
        });
    }
    
    // Update compliance frameworks based on industry
    function updateComplianceFrameworks(industry) {
        renderComplianceDropdown();
    }
    
    // Render compliance dropdown
    function renderComplianceDropdown() {
        // Group compliance frameworks by category
        const categories = window.complianceCategories || {};
        const container = document.getElementById('compliance-selection');
        if (!container) return;
        
        let html = `
            <div class="compliance-dropdown-container">
                <label for="compliance-dropdown">Select Compliance Frameworks:</label>
                <div class="compliance-multiselect">
                    <button type="button" class="multiselect-toggle" onclick="WizardController.toggleComplianceDropdown()">
                        <span class="selected-count">0 selected</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="multiselect-dropdown" id="compliance-dropdown">
                        <div class="dropdown-search">
                            <input type="text" placeholder="Search frameworks..." onkeyup="WizardController.filterCompliance(this.value)">
                        </div>
                        <div class="dropdown-options">
        `;
        
        // Add recommended frameworks first
        if (wizardState.industry) {
            const recommended = window.complianceByIndustry?.[wizardState.industry] || [];
            if (recommended.length > 0) {
                html += '<div class="compliance-group"><div class="group-header">Recommended for Your Industry</div>';
                recommended.forEach(framework => {
                    const data = window.complianceData?.[framework];
                    if (data) {
                        html += `
                            <label class="compliance-option recommended">
                                <input type="checkbox" value="${framework}" onchange="WizardController.updateSelectedCompliance()">
                                <span class="framework-name">${data.name}</span>
                                <span class="framework-fullname">${data.fullName}</span>
                            </label>
                        `;
                    }
                });
                html += '</div>';
            }
        }
        
        // Add all frameworks by category
        Object.entries(categories).forEach(([category, frameworks]) => {
            html += `<div class="compliance-group">
                <div class="group-header">${category}</div>`;
            
            frameworks.forEach(framework => {
                const data = window.complianceData?.[framework];
                if (data) {
                    html += `
                        <label class="compliance-option">
                            <input type="checkbox" value="${framework}" onchange="WizardController.updateSelectedCompliance()">
                            <span class="framework-name">${data.name}</span>
                            <span class="framework-fullname">${data.fullName}</span>
                        </label>
                    `;
                }
            });
            
            html += '</div>';
        });
        
        html += `
                        </div>
                    </div>
                </div>
                <div class="selected-frameworks" id="selected-frameworks-list">
                    <!-- Selected frameworks will appear here as tags -->
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    // Initialize compliance selection
    function initializeComplianceSelection() {
        const addBtn = document.getElementById('add-compliance');
        const input = document.getElementById('custom-compliance-input');
        
        if (addBtn && input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addCustomCompliance();
                }
            });
        }
    }
    
    // All other functions remain the same...
    
    // Compliance dropdown functions
    function toggleComplianceDropdown() {
        const dropdown = document.getElementById('compliance-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }
    
    function filterCompliance(searchTerm) {
        const options = document.querySelectorAll('.compliance-option');
        if (!options) return;
        
        searchTerm = searchTerm.toLowerCase();
        
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    }
    
    function updateSelectedCompliance() {
        const checkboxes = document.querySelectorAll('#compliance-dropdown input[type="checkbox"]:checked');
        const selectedCount = document.querySelector('.selected-count');
        const selectedList = document.getElementById('selected-frameworks-list');
        
        if (!checkboxes || !selectedCount || !selectedList) return;
        
        wizardState.complianceFrameworks = Array.from(checkboxes).map(cb => cb.value);
        selectedCount.textContent = `${wizardState.complianceFrameworks.length} selected`;
        
        // Update selected frameworks display
        let html = '';
        wizardState.complianceFrameworks.forEach(framework => {
            const data = window.complianceData?.[framework];
            if (data) {
                html += `
                    <span class="framework-tag">
                        ${data.name}
                        <button onclick="WizardController.removeFramework('${framework}')" class="remove-tag">&times;</button>
                    </span>
                `;
            }
        });
        
        selectedList.innerHTML = html;
    }
    
    function removeFramework(framework) {
        const checkbox = document.querySelector(`#compliance-dropdown input[value="${framework}"]`);
        if (checkbox) {
            checkbox.checked = false;
            updateSelectedCompliance();
        }
    }
    
    function addCustomCompliance() {
        const input = document.getElementById('custom-compliance-input');
        const list = document.getElementById('custom-compliance-list');
        
        if (!input || !list) return;
        
        const value = input.value.trim();
        if (value && !wizardState.customCompliance.includes(value)) {
            wizardState.customCompliance.push(value);
            input.value = '';
            updateCustomComplianceList();
        }
    }
    
    function updateCustomComplianceList() {
        const list = document.getElementById('custom-compliance-list');
        if (!list) return;
        
        let html = '';
        wizardState.customCompliance.forEach((item, index) => {
            html += `
                <span class="framework-tag">
                    ${item}
                    <button onclick="WizardController.removeCustomCompliance(${index})" class="remove-tag">&times;</button>
                </span>
            `;
        });
        
        list.innerHTML = html;
    }
    
    function removeCustomCompliance(index) {
        wizardState.customCompliance.splice(index, 1);
        updateCustomComplianceList();
    }
    
    // Update selected vendors list
    function updateSelectedVendorsList() {
        const list = document.getElementById('selected-vendors-list');
        if (!list) return;
        
        const vendors = window.vendorData || {};
        
        let html = '';
        wizardState.selectedVendors.forEach(vendorId => {
            const vendor = vendors[vendorId] || { name: vendorId };
            html += `<span class="vendor-tag">${vendor.name || vendorId}</span>`;
        });
        
        list.innerHTML = html || '<em>No vendors selected</em>';
    }
    
    // Update vendor insights
    function updateVendorInsights() {
        const container = document.getElementById('vendor-market-insights');
        if (!container) return;
        
        if (wizardState.selectedVendors.length === 0) {
            container.classList.add('hidden');
            return;
        }
        
        container.classList.remove('hidden');
        let html = '<h4>Market Insights</h4>';
        
        wizardState.selectedVendors.forEach(vendorId => {
            const vendor = window.vendorData?.[vendorId];
            if (vendor && vendor.marketInsights) {
                html += `
                    <div class="vendor-insight">
                        <h5>${vendor.name}</h5>
                        <div class="insights-grid">
                            <div class="insight strengths">
                                <h6>Strengths</h6>
                                <ul>${vendor.marketInsights.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
                            </div>
                            <div class="insight weaknesses">
                                <h6>Weaknesses</h6>
                                <ul>${vendor.marketInsights.weaknesses.map(w => `<li>${w}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        container.innerHTML = html;
    }
    
    // Initialize sensitivity analysis
    function initializeSensitivityAnalysis() {
        const sliders = [
            { id: 'it-staff-cost', key: 'itStaffCost' },
            { id: 'hardware-cost', key: 'hardwareCost' },
            { id: 'energy-cost', key: 'energyCost' },
            { id: 'downtime', key: 'downtime' },
            { id: 'security', key: 'security' }
        ];
        
        sliders.forEach(slider => {
            const element = document.getElementById(`${slider.id}-sensitivity`);
            const valueDisplay = document.getElementById(`${slider.id.replace('-cost', '')}-value`);
            const impactDisplay = document.getElementById(`${slider.id.replace('-cost', '')}-impact`);
            
            if (element && valueDisplay) {
                element.addEventListener('input', function() {
                    const value = parseInt(this.value);
                    valueDisplay.textContent = value;
                    wizardState.sensitivityFactors[slider.key] = value;
                    
                    // Update impact indicator
                    if (impactDisplay) {
                        const absValue = Math.abs(value);
                        let impactClass = 'impact-low';
                        let impactText = 'Low Impact';
                        
                        if (absValue > 50) {
                            impactClass = 'impact-high';
                            impactText = 'High Impact';
                        } else if (absValue > 25) {
                            impactClass = 'impact-medium';
                            impactText = 'Medium Impact';
                        } else if (absValue === 0) {
                            impactText = 'No Impact';
                        }
                        
                        impactDisplay.className = `impact-indicator ${impactClass}`;
                        impactDisplay.textContent = impactText;
                    }
                    
                    // Update real-time preview
                    updateSensitivityPreview();
                });
            }
        });
        
        // Initialize Portnox cost slider
        const portnoxSlider = document.getElementById('portnox-cost-slider');
        const portnoxValue = document.getElementById('portnox-cost-value');
        
        if (portnoxSlider && portnoxValue) {
            portnoxSlider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                portnoxValue.textContent = value.toFixed(2);
                wizardState.costConfig.portnoxCostPerDevice = value;
            });
        }
    }
    
    // Update sensitivity preview
    function updateSensitivityPreview() {
        const container = document.getElementById('sensitivity-impact-chart');
        if (!container) return;
        
        let html = '<div class="impact-summary">';
        
        Object.entries(wizardState.sensitivityFactors).forEach(([factor, value]) => {
            if (value !== 0) {
                html += `<div class="impact-item">
                    <span class="factor">${formatFactorName(factor)}:</span>
                    <span class="value ${value > 0 ? 'positive' : 'negative'}">${value > 0 ? '+' : ''}${value}%</span>
                </div>`;
            }
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    // Format factor name
    function formatFactorName(factor) {
        const names = {
            itStaffCost: 'IT Staff Cost',
            hardwareCost: 'Hardware Cost',
            energyCost: 'Energy Cost',
            downtime: 'Downtime Impact',
            security: 'Security Risk'
        };
        return names[factor] || factor;
    }
    
    // Initialize review
    function initializeReview() {
        const launchBtn = document.getElementById('launch-analysis');
        if (launchBtn) {
            launchBtn.addEventListener('click', launchAnalysis);
        }
    }
    
    // Update review
    function updateReview() {
        // Implement review updates
        console.log('Updating review with current selections');
    }
    
    // Calculate preview
    function calculatePreview() {
        // Implement preview calculations
        console.log('Calculating preview metrics');
    }
    
    // Launch analysis
    function launchAnalysis() {
        // Update wizard state with final values
        wizardState.costConfig.deviceCount = parseInt(document.getElementById('device-count')?.value || '1000');
        wizardState.costConfig.yearsToProject = parseInt(document.getElementById('years-to-project')?.value || '3');
        wizardState.costConfig.locationCount = parseInt(document.getElementById('location-count')?.value || '1');
        wizardState.costConfig.itStaffSize = parseInt(document.getElementById('it-staff-size')?.value || '10');
        wizardState.costConfig.supportLevel = document.getElementById('support-level')?.value || 'standard';
        wizardState.costConfig.professionalServices = document.getElementById('professional-services')?.value || 'none';
        
        // Close wizard
        closeWizard();
        
        // Show dashboard
        const dashboard = document.getElementById('dashboard-content');
        if (dashboard) {
            dashboard.style.display = 'block';
        }
        
        // Initialize dashboard with wizard data
        if (typeof DashboardController !== 'undefined') {
            DashboardController.initialize(wizardState);
        }
    }
    
    // Public API - expose all functions that are called from HTML
    return {
        init,
        getState: () => wizardState,
        openWizard,
        closeWizard,
        toggleComplianceDropdown,
        filterCompliance,
        updateSelectedCompliance,
        removeFramework,
        addCustomCompliance,
        removeCustomCompliance
    };
})();

// Initialize wizard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing wizard controller...');
    WizardController.init();
});
