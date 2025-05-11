/**
 * Enhanced TCO Wizard Controller
 * Provides comprehensive wizard for NAC solution comparison
 */
const TCOWizard = (function() {
    let currentStep = 1;
    const totalSteps = 6;
    let wizardData = {};
    
    // Enhanced vendor data with detailed capabilities
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
    
    // Comprehensive industry list
    const industries = {
        healthcare: {
            name: "Healthcare",
            description: "Hospitals, clinics, medical research facilities",
            compliance: ["HIPAA", "HITECH", "FDA", "GDPR", "ISO 27001"]
        },
        financial: {
            name: "Financial Services",
            description: "Banks, insurance, investment firms",
            compliance: ["PCI DSS", "SOX", "GLBA", "FINRA", "GDPR", "ISO 27001"]
        },
        retail: {
            name: "Retail",
            description: "Physical stores, e-commerce, hospitality",
            compliance: ["PCI DSS", "GDPR", "CCPA", "SOX"]
        },
        education: {
            name: "Education",
            description: "K-12, higher education, research institutions",
            compliance: ["FERPA", "COPPA", "GDPR", "CCPA"]
        },
        government: {
            name: "Government",
            description: "Federal, state, local government agencies",
            compliance: ["FISMA", "FedRAMP", "NIST 800-171", "CMMC", "ITAR"]
        },
        manufacturing: {
            name: "Manufacturing",
            description: "Industrial manufacturing, automotive, aerospace",
            compliance: ["NIST 800-171", "CMMC", "ISO 27001", "ITAR", "ICS/SCADA"]
        },
        technology: {
            name: "Technology",
            description: "Software companies, IT services, SaaS providers",
            compliance: ["SOC 2", "ISO 27001", "GDPR", "CCPA", "HIPAA BAA"]
        },
        energy: {
            name: "Energy & Utilities",
            description: "Power generation, oil & gas, utilities",
            compliance: ["NERC CIP", "ICS/SCADA", "ISO 27001", "NIST CSF"]
        },
        pharmaceutical: {
            name: "Pharmaceutical",
            description: "Drug manufacturers, biotech, medical devices",
            compliance: ["FDA 21 CFR Part 11", "GxP", "HIPAA", "GDPR", "ISO 13485"]
        },
        telecommunications: {
            name: "Telecommunications",
            description: "Telecom providers, ISPs, MSPs",
            compliance: ["CPNI", "GDPR", "CCPA", "ISO 27001", "SOC 2"]
        },
        hospitality: {
            name: "Hospitality",
            description: "Hotels, restaurants, entertainment venues",
            compliance: ["PCI DSS", "GDPR", "CCPA", "ADA"]
        },
        nonprofit: {
            name: "Non-Profit",
            description: "Charities, foundations, NGOs",
            compliance: ["PII Protection", "GDPR", "State Regulations"]
        }
    };
    
    // Enhanced compliance frameworks
    const complianceFrameworks = {
        hipaa: {
            name: "HIPAA",
            fullName: "Health Insurance Portability and Accountability Act",
            description: "Protects sensitive patient health information",
            requirements: ["Access controls", "Audit controls", "Integrity", "Transmission security"]
        },
        pci: {
            name: "PCI DSS",
            fullName: "Payment Card Industry Data Security Standard",
            description: "Secures credit card transactions and cardholder data",
            requirements: ["Network segmentation", "Access control", "Regular monitoring", "Vulnerability management"]
        },
        gdpr: {
            name: "GDPR",
            fullName: "General Data Protection Regulation",
            description: "EU regulation for data protection and privacy",
            requirements: ["Data minimization", "Consent management", "Right to erasure", "Data portability"]
        },
        sox: {
            name: "SOX",
            fullName: "Sarbanes-Oxley Act",
            description: "Protects investors by improving accuracy of corporate disclosures",
            requirements: ["Internal controls", "Audit trails", "Access management", "Change management"]
        },
        ferpa: {
            name: "FERPA",
            fullName: "Family Educational Rights and Privacy Act",
            description: "Protects student education records",
            requirements: ["Access controls", "Consent management", "Audit logging", "Data protection"]
        },
        cmmc: {
            name: "CMMC",
            fullName: "Cybersecurity Maturity Model Certification",
            description: "DoD requirement for contractors handling CUI",
            requirements: ["Access control", "Identification", "Audit logging", "System monitoring"]
        },
        iso27001: {
            name: "ISO 27001",
            fullName: "International Organization for Standardization 27001",
            description: "International standard for information security management",
            requirements: ["Risk assessment", "Security controls", "Continuous improvement", "Documentation"]
        },
        nist800171: {
            name: "NIST 800-171",
            fullName: "NIST SP 800-171",
            description: "Protecting Controlled Unclassified Information",
            requirements: ["Access control", "Awareness training", "Audit accountability", "Configuration management"]
        },
        nerc: {
            name: "NERC CIP",
            fullName: "North American Electric Reliability Corporation Critical Infrastructure Protection",
            description: "Standards for power system security",
            requirements: ["Electronic security perimeter", "Access control", "Monitoring", "Incident response"]
        },
        itar: {
            name: "ITAR",
            fullName: "International Traffic in Arms Regulations",
            description: "Controls export of defense articles and services",
            requirements: ["Access restrictions", "Export controls", "Audit logging", "Data classification"]
        }
    };
    
    // Initialize wizard
    function init() {
        createWizardDOM();
        setupEventListeners();
        createWizardButton();
    }
    
    // Create wizard DOM structure
    function createWizardDOM() {
        const wizardHTML = `
            <div id="wizard-overlay" class="wizard-overlay">
                <div id="wizard-container" class="wizard-container">
                    <div class="wizard-header">
                        <div class="wizard-logo">
                            <img src="img/portnox-logo.png" alt="Portnox">
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
                            <button id="wizard-prev" class="btn btn-outline">
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
            </div>
        `;
        
        // Append to body
        const wizardDiv = document.createElement('div');
        wizardDiv.innerHTML = wizardHTML;
        document.body.appendChild(wizardDiv.firstElementChild);
        
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
        
        switch(stepNumber) {
            case 1:
                content.innerHTML = createVendorSelectionStep();
                setupVendorSelection();
                break;
            case 2:
                content.innerHTML = createIndustryComplianceStep();
                setupIndustrySelection();
                break;
            case 3:
                content.innerHTML = createOrganizationStep();
                setupOrganizationInputs();
                break;
            case 4:
                content.innerHTML = createCostConfigurationStep();
                setupCostConfiguration();
                break;
            case 5:
                content.innerHTML = createAdvancedOptionsStep();
                setupAdvancedOptions();
                break;
            case 6:
                content.innerHTML = createReviewStep();
                populateReview();
                break;
        }
        
        updateProgress();
        updateNavigationButtons();
    }
    
    // Step 1: Vendor Selection
    function createVendorSelectionStep() {
        return `
            <div class="wizard-step-content">
                <h3>Select NAC Solutions to Compare</h3>
                <p>Choose one or more NAC vendors you want to compare. You can select your current solution and potential alternatives.</p>
                
                <div class="vendor-selection-options">
                    <button id="select-all-vendors" class="btn btn-outline">
                        <i class="fas fa-check-square"></i> Select All
                    </button>
                    <button id="clear-vendors" class="btn btn-outline">
                        <i class="fas fa-square"></i> Clear All
                    </button>
                </div>
                
                <div class="vendor-grid">
                    ${Object.entries(vendorDetails).map(([key, vendor]) => `
                        <div class="vendor-card" data-vendor="${key}">
                            <div class="vendor-check">
                                <input type="checkbox" id="vendor-${key}" value="${key}">
                            </div>
                            <div class="vendor-logo">
                                <img src="img/vendors/${key}-logo.png" alt="${vendor.name}" 
                                     onerror="this.src='img/vendors/generic-logo.png'">
                            </div>
                            <div class="vendor-info">
                                <h4>${vendor.name}</h4>
                                <span class="vendor-type">${vendor.type}</span>
                                <p>${vendor.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="current-solution-selector">
                    <h4>Which is your current solution?</h4>
                    <select id="current-solution" class="form-control">
                        <option value="">None - No current NAC solution</option>
                        ${Object.entries(vendorDetails).map(([key, vendor]) => 
                            `<option value="${key}">${vendor.name}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
        `;
    }
    
    // Step 2: Industry & Compliance
    function createIndustryComplianceStep() {
        return `
            <div class="wizard-step-content">
                <h3>Industry & Compliance Requirements</h3>
                <p>Select your industry and relevant compliance frameworks to ensure accurate TCO analysis.</p>
                
                <div class="form-group">
                    <label for="industry-select">Primary Industry</label>
                    <select id="industry-select" class="form-control">
                        <option value="">Select your industry...</option>
                        ${Object.entries(industries).map(([key, industry]) => 
                            `<option value="${key}">${industry.name}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div id="industry-description" class="info-box hidden">
                    <!-- Industry description will appear here -->
                </div>
                
                <div class="compliance-section">
                    <h4>Compliance Requirements</h4>
                    <p>Select all compliance frameworks that apply to your organization:</p>
                    
                    <div class="compliance-grid">
                        ${Object.entries(complianceFrameworks).map(([key, framework]) => `
                            <div class="compliance-card">
                                <label>
                                    <input type="checkbox" name="compliance" value="${key}">
                                    <div class="compliance-content">
                                        <h5>${framework.name}</h5>
                                        <span class="compliance-fullname">${framework.fullName}</span>
                                        <p>${framework.description}</p>
                                    </div>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Step 3: Organization Details
    function createOrganizationStep() {
        return `
            <div class="wizard-step-content">
                <h3>Organization Details</h3>
                <p>Provide information about your organization to calculate accurate costs.</p>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label for="company-size">Company Size</label>
                        <select id="company-size" class="form-control">
                            <option value="small">Small (1-250 employees)</option>
                            <option value="medium">Medium (251-1000 employees)</option>
                            <option value="large">Large (1001-5000 employees)</option>
                            <option value="enterprise">Enterprise (5000+ employees)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="device-count">Number of Devices</label>
                        <input type="number" id="device-count" class="form-control" 
                               value="1000" min="10" max="1000000">
                        <small>Total devices to be managed</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="location-count">Number of Locations</label>
                        <input type="number" id="location-count" class="form-control" 
                               value="1" min="1" max="1000">
                        <small>Physical locations/sites</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="it-staff">IT Staff Size</label>
                        <input type="number" id="it-staff" class="form-control" 
                               value="5" min="1" max="500">
                        <small>Full-time IT personnel</small>
                    </div>
                </div>
                
                <div class="device-breakdown">
                    <h4>Device Type Breakdown</h4>
                    <div class="device-grid">
                        <div class="device-type">
                            <label for="corporate-devices">Corporate Devices (%)</label>
                            <input type="range" id="corporate-devices" min="0" max="100" value="60">
                            <span class="range-value">60%</span>
                        </div>
                        <div class="device-type">
                            <label for="byod-devices">BYOD Devices (%)</label>
                            <input type="range" id="byod-devices" min="0" max="100" value="30">
                            <span class="range-value">30%</span>
                        </div>
                        <div class="device-type">
                            <label for="iot-devices">IoT/OT Devices (%)</label>
                            <input type="range" id="iot-devices" min="0" max="100" value="10">
                            <span class="range-value">10%</span>
                        </div>
                    </div>
                    <div class="device-total">
                        Total: <span id="device-total">100%</span>
                    </div>
                </div>
                
                <div class="environment-options">
                    <h4>Environment Characteristics</h4>
                    <div class="checkbox-grid">
                        <label>
                            <input type="checkbox" name="environment" value="multi-location">
                            Multiple Locations
                        </label>
                        <label>
                            <input type="checkbox" name="environment" value="remote-workers">
                            Remote Workers
                        </label>
                        <label>
                            <input type="checkbox" name="environment" value="guest-access">
                            Guest Network Access
                        </label>
                        <label>
                            <input type="checkbox" name="environment" value="legacy-systems">
                            Legacy Systems
                        </label>
                        <label>
                            <input type="checkbox" name="environment" value="cloud-first">
                            Cloud-First Strategy
                        </label>
                        <label>
                            <input type="checkbox" name="environment" value="high-security">
                            High Security Requirements
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Step 4: Cost Configuration
    function createCostConfigurationStep() {
        return `
            <div class="wizard-step-content">
                <h3>Cost Configuration & Sensitivity</h3>
                <p>Configure cost parameters and sensitivity analysis for accurate TCO calculation.</p>
                
                <div class="cost-section">
                    <h4>Personnel Costs</h4>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="avg-it-salary">Average IT Salary ($)</label>
                            <input type="number" id="avg-it-salary" class="form-control" 
                                   value="85000" min="40000" max="200000">
                        </div>
                        <div class="form-group">
                            <label for="fte-allocation">FTE Allocation for NAC (%)</label>
                            <input type="range" id="fte-allocation" min="0" max="100" value="25">
                            <span class="range-value">25%</span>
                        </div>
                    </div>
                </div>
                
                <div class="cost-section">
                    <h4>Infrastructure Costs</h4>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="hardware-refresh">Hardware Refresh Cycle (years)</label>
                            <select id="hardware-refresh" class="form-control">
                                <option value="3">3 years</option>
                                <option value="4">4 years</option>
                                <option value="5" selected>5 years</option>
                                <option value="7">7 years</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="datacenter-cost">Data Center Cost ($/rack unit/month)</label>
                            <input type="number" id="datacenter-cost" class="form-control" 
                                   value="100" min="0" max="500">
                        </div>
                    </div>
                </div>
                
                <div class="cost-section">
                    <h4>Operational Costs</h4>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="downtime-cost">Downtime Cost ($/hour)</label>
                            <input type="number" id="downtime-cost" class="form-control" 
                                   value="10000" min="1000" max="100000">
                        </div>
                        <div class="form-group">
                            <label for="security-incident-cost">Security Incident Cost ($)</label>
                            <input type="number" id="security-incident-cost" class="form-control" 
                                   value="150000" min="10000" max="1000000">
                        </div>
                    </div>
                </div>
                
                <div class="sensitivity-section">
                    <h4>Sensitivity Analysis Parameters</h4>
                    <div class="sensitivity-grid">
                        <div class="sensitivity-param">
                            <label for="growth-rate">Annual Device Growth Rate (%)</label>
                            <input type="range" id="growth-rate" min="0" max="50" value="10">
                            <span class="range-value">10%</span>
                        </div>
                        <div class="sensitivity-param">
                            <label for="inflation-rate">Inflation Rate (%)</label>
                            <input type="range" id="inflation-rate" min="0" max="10" value="3">
                            <span class="range-value">3%</span>
                        </div>
                        <div class="sensitivity-param">
                            <label for="discount-rate">Discount Rate (%)</label>
                            <input type="range" id="discount-rate" min="0" max="15" value="8">
                            <span class="range-value">8%</span>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-period">
                    <h4>Analysis Period</h4>
                    <div class="form-group">
                        <label for="analysis-years">Years to Analyze</label>
                        <select id="analysis-years" class="form-control">
                            <option value="1">1 Year</option>
                            <option value="3" selected>3 Years</option>
                            <option value="5">5 Years</option>
                            <option value="7">7 Years</option>
                            <option value="10">10 Years</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Step 5: Advanced Options
    function createAdvancedOptionsStep() {
        return `
            <div class="wizard-step-content">
                <h3>Advanced Options & Customization</h3>
                <p>Fine-tune your analysis with advanced configuration options.</p>
                
                <div class="advanced-section">
                    <h4>Security Requirements</h4>
                    <div class="security-options">
                        <label>
                            <input type="checkbox" name="security" value="zero-trust">
                            Zero Trust Architecture
                        </label>
                        <label>
                            <input type="checkbox" name="security" value="microsegmentation">
                            Microsegmentation
                        </label>
                        <label>
                            <input type="checkbox" name="security" value="continuous-auth">
                            Continuous Authentication
                        </label>
                        <label>
                            <input type="checkbox" name="security" value="threat-detection">
                            Advanced Threat Detection
                        </label>
                        <label>
                            <input type="checkbox" name="security" value="privileged-access">
                            Privileged Access Management
                        </label>
                    </div>
                </div>
                
                <div class="advanced-section">
                    <h4>Integration Requirements</h4>
                    <div class="integration-grid">
                        <label>
                            <input type="checkbox" name="integration" value="siem">
                            SIEM Integration
                        </label>
                        <label>
                            <input type="checkbox" name="integration" value="identity">
                            Identity Providers (AD, Azure AD, Okta)
                        </label>
                        <label>
                            <input type="checkbox" name="integration" value="mdm">
                            MDM/UEM Solutions
                        </label>
                        <label>
                            <input type="checkbox" name="integration" value="cmdb">
                            CMDB/Asset Management
                        </label>
                        <label>
                            <input type="checkbox" name="integration" value="ticketing">
                            Ticketing Systems
                        </label>
                        <label>
                            <input type="checkbox" name="integration" value="cloud">
                            Cloud Services (AWS, Azure, GCP)
                        </label>
                    </div>
                </div>
                
                <div class="advanced-section">
                    <h4>Custom Weighting Factors</h4>
                    <div class="weighting-grid">
                        <div class="weight-factor">
                            <label for="cost-weight">Cost Importance</label>
                            <input type="range" id="cost-weight" min="0" max="100" value="30">
                            <span class="range-value">30%</span>
                        </div>
                        <div class="weight-factor">
                            <label for="security-weight">Security Importance</label>
                            <input type="range" id="security-weight" min="0" max="100" value="40">
                            <span class="range-value">40%</span>
                        </div>
                        <div class="weight-factor">
                            <label for="ease-weight">Ease of Use Importance</label>
                            <input type="range" id="ease-weight" min="0" max="100" value="15">
                            <span class="range-value">15%</span>
                        </div>
                        <div class="weight-factor">
                            <label for="scalability-weight">Scalability Importance</label>
                            <input type="range" id="scalability-weight" min="0" max="100" value="15">
                            <span class="range-value">15%</span>
                        </div>
                    </div>
                    <div class="weight-total">
                        Total: <span id="weight-total">100%</span>
                    </div>
                </div>
                
                <div class="advanced-section">
                    <h4>Custom Vendor Pricing (Optional)</h4>
                    <div class="custom-pricing-note">
                        <i class="fas fa-info-circle"></i>
                        Leave blank to use default pricing models
                    </div>
                    <div id="custom-pricing-container">
                        <!-- Custom pricing inputs will be generated based on selected vendors -->
                    </div>
                </div>
            </div>
        `;
    }
    
    // Step 6: Review & Calculate
    function createReviewStep() {
        return `
            <div class="wizard-step-content">
                <h3>Review Configuration</h3>
                <p>Review your selections before calculating the TCO analysis.</p>
                
                <div class="review-sections">
                    <div class="review-section">
                        <h4>Selected Vendors</h4>
                        <div id="review-vendors" class="review-content">
                            <!-- Selected vendors will be listed here -->
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h4>Industry & Compliance</h4>
                        <div id="review-industry" class="review-content">
                            <!-- Industry and compliance selections -->
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h4>Organization Details</h4>
                        <div id="review-organization" class="review-content">
                            <!-- Organization details -->
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h4>Cost Configuration</h4>
                        <div id="review-costs" class="review-content">
                            <!-- Cost configuration summary -->
                        </div>
                    </div>
                    
                    <div class="review-section">
                        <h4>Advanced Options</h4>
                        <div id="review-advanced" class="review-content">
                            <!-- Advanced options summary -->
                        </div>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button id="save-config" class="btn btn-outline">
                        <i class="fas fa-save"></i> Save Configuration
                    </button>
                    <button id="calculate-tco" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate TCO Analysis
                    </button>
                </div>
            </div>
        `;
    }
    
    // Setup vendor selection interactions
    function setupVendorSelection() {
        // Select all button
        document.getElementById('select-all-vendors')?.addEventListener('click', () => {
            document.querySelectorAll('input[type="checkbox"][id^="vendor-"]').forEach(cb => {
                cb.checked = true;
            });
        });
        
        // Clear all button
        document.getElementById('clear-vendors')?.addEventListener('click', () => {
            document.querySelectorAll('input[type="checkbox"][id^="vendor-"]').forEach(cb => {
                cb.checked = false;
            });
        });
        
        // Vendor card click
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = card.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                }
            });
        });
    }
    
    // Setup industry selection
    function setupIndustrySelection() {
        const industrySelect = document.getElementById('industry-select');
        const descriptionBox = document.getElementById('industry-description');
        
        industrySelect?.addEventListener('change', () => {
            const selectedIndustry = industries[industrySelect.value];
            if (selectedIndustry) {
                descriptionBox.innerHTML = `
                    <h4>${selectedIndustry.name}</h4>
                    <p>${selectedIndustry.description}</p>
                    <p><strong>Common compliance requirements:</strong> ${selectedIndustry.compliance.join(', ')}</p>
                `;
                descriptionBox.classList.remove('hidden');
                
                // Auto-select relevant compliance frameworks
                selectedIndustry.compliance.forEach(comp => {
                    const checkbox = document.querySelector(`input[value="${comp.toLowerCase()}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            } else {
                descriptionBox.classList.add('hidden');
            }
        });
    }
    
    // Setup organization inputs
    function setupOrganizationInputs() {
        // Device type sliders
        const deviceSliders = ['corporate-devices', 'byod-devices', 'iot-devices'];
        
        deviceSliders.forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            const valueSpan = slider?.nextElementSibling;
            
            slider?.addEventListener('input', () => {
                valueSpan.textContent = `${slider.value}%`;
                updateDeviceTotal();
            });
        });
        
        // Update device total
        function updateDeviceTotal() {
            const corporate = parseInt(document.getElementById('corporate-devices').value) || 0;
            const byod = parseInt(document.getElementById('byod-devices').value) || 0;
            const iot = parseInt(document.getElementById('iot-devices').value) || 0;
            const total = corporate + byod + iot;
            
            document.getElementById('device-total').textContent = `${total}%`;
            
            // Warn if total doesn't equal 100%
            if (total !== 100) {
                document.getElementById('device-total').classList.add('error');
            } else {
                document.getElementById('device-total').classList.remove('error');
            }
        }
    }
    
    // Setup cost configuration
    function setupCostConfiguration() {
        // Range sliders with value display
        const rangeInputs = document.querySelectorAll('input[type="range"]');
        
        rangeInputs.forEach(input => {
            const valueSpan = input.nextElementSibling;
            if (valueSpan && valueSpan.classList.contains('range-value')) {
                input.addEventListener('input', () => {
                    valueSpan.textContent = `${input.value}%`;
                });
            }
        });
    }
    
    // Setup advanced options
    function setupAdvancedOptions() {
        // Weight factor sliders
        const weightSliders = ['cost-weight', 'security-weight', 'ease-weight', 'scalability-weight'];
        
        weightSliders.forEach(sliderId => {
            const slider = document.getElementById(sliderId);
            const valueSpan = slider?.nextElementSibling;
            
            slider?.addEventListener('input', () => {
                valueSpan.textContent = `${slider.value}%`;
                updateWeightTotal();
            });
        });
        
        // Update weight total
        function updateWeightTotal() {
            const cost = parseInt(document.getElementById('cost-weight').value) || 0;
            const security = parseInt(document.getElementById('security-weight').value) || 0;
            const ease = parseInt(document.getElementById('ease-weight').value) || 0;
            const scalability = parseInt(document.getElementById('scalability-weight').value) || 0;
            const total = cost + security + ease + scalability;
            
            document.getElementById('weight-total').textContent = `${total}%`;
            
            // Warn if total doesn't equal 100%
            if (total !== 100) {
                document.getElementById('weight-total').classList.add('error');
            } else {
                document.getElementById('weight-total').classList.remove('error');
            }
        }
        
        // Generate custom pricing inputs
        generateCustomPricingInputs();
    }
    
    // Generate custom pricing inputs based on selected vendors
    function generateCustomPricingInputs() {
        const container = document.getElementById('custom-pricing-container');
        const selectedVendors = getSelectedVendors();
        
        let html = '';
        selectedVendors.forEach(vendorKey => {
            const vendor = vendorDetails[vendorKey];
            html += `
                <div class="vendor-pricing">
                    <h5>${vendor.name}</h5>
                    <div class="pricing-grid">
                        <div class="form-group">
                            <label for="${vendorKey}-license">License Cost ($/device/year)</label>
                            <input type="number" id="${vendorKey}-license" class="form-control" 
                                   placeholder="Auto-calculated if blank">
                        </div>
                        <div class="form-group">
                            <label for="${vendorKey}-implementation">Implementation Cost ($)</label>
                            <input type="number" id="${vendorKey}-implementation" class="form-control" 
                                   placeholder="Auto-calculated if blank">
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Populate review step
    function populateReview() {
        // Vendors
        const selectedVendors = getSelectedVendors();
        const vendorsHtml = selectedVendors.map(key => {
            const vendor = vendorDetails[key];
            return `<div class="review-item">${vendor.name} (${vendor.type})</div>`;
        }).join('');
        document.getElementById('review-vendors').innerHTML = vendorsHtml;
        
        // Industry & Compliance
        const industry = document.getElementById('industry-select')?.value;
        const selectedCompliance = Array.from(document.querySelectorAll('input[name="compliance"]:checked'))
            .map(cb => complianceFrameworks[cb.value].name);
        
        document.getElementById('review-industry').innerHTML = `
            <div class="review-item">Industry: ${industries[industry]?.name || 'Not selected'}</div>
            <div class="review-item">Compliance: ${selectedCompliance.join(', ') || 'None selected'}</div>
        `;
        
        // Organization details
        const deviceCount = document.getElementById('device-count')?.value;
        const locations = document.getElementById('location-count')?.value;
        
        document.getElementById('review-organization').innerHTML = `
            <div class="review-item">Devices: ${deviceCount}</div>
            <div class="review-item">Locations: ${locations}</div>
            <div class="review-item">IT Staff: ${document.getElementById('it-staff')?.value}</div>
        `;
        
        // Cost configuration
        const analysisYears = document.getElementById('analysis-years')?.value;
        
        document.getElementById('review-costs').innerHTML = `
            <div class="review-item">Analysis Period: ${analysisYears} years</div>
            <div class="review-item">Average IT Salary: $${document.getElementById('avg-it-salary')?.value}</div>
            <div class="review-item">FTE Allocation: ${document.getElementById('fte-allocation')?.value}%</div>
        `;
        
        // Advanced options
        const selectedSecurity = Array.from(document.querySelectorAll('input[name="security"]:checked'))
            .map(cb => cb.nextSibling.textContent.trim());
        
        document.getElementById('review-advanced').innerHTML = `
            <div class="review-item">Security Features: ${selectedSecurity.join(', ') || 'None selected'}</div>
        `;
        
        // Setup action buttons
        document.getElementById('save-config')?.addEventListener('click', saveConfiguration);
        document.getElementById('calculate-tco')?.addEventListener('click', calculateAndClose);
    }
    
    // Get selected vendors
    function getSelectedVendors() {
        return Array.from(document.querySelectorAll('input[type="checkbox"][id^="vendor-"]:checked'))
            .map(cb => cb.value);
    }
    
    // Save configuration
    function saveConfiguration() {
        const config = collectWizardData();
        localStorage.setItem('tcoConfig', JSON.stringify(config));
        alert('Configuration saved successfully!');
    }
    
    // Collect all wizard data
    function collectWizardData() {
        return {
            vendors: getSelectedVendors(),
            currentSolution: document.getElementById('current-solution')?.value,
            industry: document.getElementById('industry-select')?.value,
            compliance: Array.from(document.querySelectorAll('input[name="compliance"]:checked'))
                .map(cb => cb.value),
            companySize: document.getElementById('company-size')?.value,
            deviceCount: parseInt(document.getElementById('device-count')?.value) || 1000,
            locationCount: parseInt(document.getElementById('location-count')?.value) || 1,
            itStaff: parseInt(document.getElementById('it-staff')?.value) || 5,
            deviceTypes: {
                corporate: parseInt(document.getElementById('corporate-devices')?.value) || 0,
                byod: parseInt(document.getElementById('byod-devices')?.value) || 0,
                iot: parseInt(document.getElementById('iot-devices')?.value) || 0
            },
            environment: Array.from(document.querySelectorAll('input[name="environment"]:checked'))
                .map(cb => cb.value),
            costs: {
                avgSalary: parseInt(document.getElementById('avg-it-salary')?.value) || 85000,
                fteAllocation: parseInt(document.getElementById('fte-allocation')?.value) || 25,
                hardwareRefresh: parseInt(document.getElementById('hardware-refresh')?.value) || 5,
                datacenterCost: parseInt(document.getElementById('datacenter-cost')?.value) || 100,
                downtimeCost: parseInt(document.getElementById('downtime-cost')?.value) || 10000,
                incidentCost: parseInt(document.getElementById('security-incident-cost')?.value) || 150000
            },
            sensitivity: {
                growthRate: parseInt(document.getElementById('growth-rate')?.value) || 10,
                inflationRate: parseInt(document.getElementById('inflation-rate')?.value) || 3,
                discountRate: parseInt(document.getElementById('discount-rate')?.value) || 8
            },
            analysisYears: parseInt(document.getElementById('analysis-years')?.value) || 3,
            security: Array.from(document.querySelectorAll('input[name="security"]:checked'))
                .map(cb => cb.value),
            integration: Array.from(document.querySelectorAll('input[name="integration"]:checked'))
                .map(cb => cb.value),
            weights: {
                cost: parseInt(document.getElementById('cost-weight')?.value) || 0,
                security: parseInt(document.getElementById('security-weight')?.value) || 0,
                ease: parseInt(document.getElementById('ease-weight')?.value) || 0,
                scalability: parseInt(document.getElementById('scalability-weight')?.value) || 0
            }
        };
    }
    
    // Calculate and close wizard
    function calculateAndClose() {
        const config = collectWizardData();
        
        // Pass to calculator
        if (typeof Calculator !== 'undefined') {
            Calculator.updateState(config);
            Calculator.calculateTCO();
        }
        
        // Save configuration
        localStorage.setItem('tcoConfig', JSON.stringify(config));
        
        // Close wizard
        closeWizard();
        
        // Show results
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.remove('hidden');
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Close button
        document.getElementById('wizard-close')?.addEventListener('click', closeWizard);
        
        // Skip button
        document.getElementById('wizard-skip')?.addEventListener('click', () => {
            if (confirm('Skip the wizard and go to dashboard?')) {
                closeWizard();
            }
        });
        
        // Navigation buttons
        document.getElementById('wizard-prev')?.addEventListener('click', previousStep);
        document.getElementById('wizard-next')?.addEventListener('click', nextStep);
        
        // Close on overlay click
        document.getElementById('wizard-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'wizard-overlay') {
                closeWizard();
            }
        });
    }
    
    // Navigate to previous step
    function previousStep() {
        if (currentStep > 1) {
            currentStep--;
            loadStep(currentStep);
        }
    }
    
    // Navigate to next step
    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                loadStep(currentStep);
            }
        }
    }
    
    // Validate current step
    function validateCurrentStep() {
        switch(currentStep) {
            case 1:
                const selectedVendors = getSelectedVendors();
                if (selectedVendors.length === 0) {
                    alert('Please select at least one vendor to compare.');
                    return false;
                }
                return true;
                
            case 2:
                const industry = document.getElementById('industry-select')?.value;
                if (!industry) {
                    alert('Please select your industry.');
                    return false;
                }
                return true;
                
            case 3:
                const deviceTotal = parseInt(document.getElementById('device-total')?.textContent) || 0;
                if (deviceTotal !== 100) {
                    alert('Device type percentages must total 100%.');
                    return false;
                }
                return true;
                
            case 4:
                return true; // All fields have defaults
                
            case 5:
                const weightTotal = parseInt(document.getElementById('weight-total')?.textContent) || 0;
                if (weightTotal !== 100) {
                    alert('Importance weights must total 100%.');
                    return false;
                }
                return true;
                
            case 6:
                return true; // Review step, no validation needed
                
            default:
                return true;
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const progressFill = document.getElementById('progress-fill');
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
        
        // Previous button
        if (currentStep === 1) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
        }
        
        // Next button
        if (currentStep === totalSteps) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }
    
    // Create wizard launch button
    function createWizardButton() {
        const button = document.getElementById('open-wizard-btn');
        if (!button) {
            const wizardButton = document.createElement('button');
            wizardButton.id = 'open-wizard-btn';
            wizardButton.className = 'btn btn-primary btn-wizard';
            wizardButton.innerHTML = '<i class="fas fa-magic"></i> Start TCO Analysis';
            
            // Add to header or create floating button
            const headerActions = document.querySelector('.header-actions');
            if (headerActions) {
                headerActions.prepend(wizardButton);
            } else {
                wizardButton.classList.add('floating-wizard-btn');
                document.body.appendChild(wizardButton);
            }
            
            wizardButton.addEventListener('click', openWizard);
        }
    }
    
    // Open wizard
    function openWizard() {
        document.getElementById('wizard-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        loadStep(currentStep);
    }
    
    // Close wizard
    function closeWizard() {
        document.getElementById('wizard-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Public API
    return {
        init,
        openWizard,
        closeWizard
    };
})();
