/**
 * Compliance Mapping Module
 * Maps vendor capabilities to compliance frameworks and regulatory requirements
 */

class ComplianceMapper {
    constructor() {
        this.vendorData = window.VENDOR_DATA || {};
        this.industryData = window.INDUSTRY_COMPLIANCE || {};
        this.riskProfiles = window.RISK_PROFILES || {};
        
        // Compliance frameworks
        this.complianceFrameworks = {
            pciDss: {
                name: "PCI DSS",
                version: "4.0",
                description: "Payment Card Industry Data Security Standard",
                requirements: [
                    {
                        id: "req1",
                        name: "Requirement 1: Install and maintain network security controls",
                        controls: [
                            { id: "1.1", name: "Processes and mechanisms for installing and maintaining network security controls are defined and understood" },
                            { id: "1.2", name: "Network security controls (NSC) are configured and maintained" },
                            { id: "1.3", name: "Network access to and from the cardholder data environment is restricted" },
                            { id: "1.4", name: "Network connections between trusted and untrusted networks are controlled" },
                            { id: "1.5", name: "Risks to the cardholder data environment from computing devices that are unable to be protected by NSCs are mitigated and documented" }
                        ]
                    },
                    {
                        id: "req2",
                        name: "Requirement 2: Apply secure configurations to all system components",
                        controls: [
                            { id: "2.1", name: "Processes and mechanisms for applying secure configurations to all system components are defined and understood" },
                            { id: "2.2", name: "System components are configured and managed securely" },
                            { id: "2.3", name: "Wireless environments are configured and managed securely" }
                        ]
                    },
                    {
                        id: "req7",
                        name: "Requirement 7: Restrict access to system components and cardholder data by business need to know",
                        controls: [
                            { id: "7.1", name: "Processes and mechanisms for restricting access to system components and cardholder data by business need to know are defined and understood" },
                            { id: "7.2", name: "Access is appropriately defined and assigned" },
                            { id: "7.3", name: "Access to system components and data is managed via an access control system(s)" }
                        ]
                    },
                    {
                        id: "req8",
                        name: "Requirement 8: Identify users and authenticate access to system components",
                        controls: [
                            { id: "8.1", name: "Processes and mechanisms for identifying users and authenticating access to system components are defined and understood" },
                            { id: "8.2", name: "User identification and related accounts for users and administrators are strictly managed throughout an account's lifecycle" },
                            { id: "8.3", name: "Strong authentication for users and administrators is established" },
                            { id: "8.4", name: "Multi-factor authentication for all access into the CDE is implemented" },
                            { id: "8.5", name: "Multi-factor authentication systems are implemented in accordance with industry best practices" },
                            { id: "8.6", name: "Use of application and system accounts and associated authentication factors is strictly managed" }
                        ]
                    },
                    {
                        id: "req9",
                        name: "Requirement 9: Restrict physical access to cardholder data",
                        controls: [
                            { id: "9.1", name: "Processes and mechanisms for restricting physical access to cardholder data are defined and understood" },
                            { id: "9.2", name: "Physical access controls manage entry into facilities and systems containing cardholder data" },
                            { id: "9.3", name: "Physical access for personnel and visitors is authorized and managed" },
                            { id: "9.4", name: "Media with cardholder data is securely stored, accessed, distributed, and destroyed" },
                            { id: "9.5", name: "Point of interaction (POI) devices are protected from tampering and unauthorized substitution" }
                        ]
                    },
                    {
                        id: "req10",
                        name: "Requirement 10: Log and monitor all access to system components and cardholder data",
                        controls: [
                            { id: "10.1", name: "Processes and mechanisms for logging and monitoring all access to system components and cardholder data are defined and understood" },
                            { id: "10.2", name: "Audit logs are implemented to support the detection of anomalies and suspicious activity, and the forensic analysis of events" },
                            { id: "10.3", name: "Audit logs are protected from unauthorized modifications and deletions" },
                            { id: "10.4", name: "Audit logs are reviewed to identify anomalies or suspicious activity" },
                            { id: "10.5", name: "Audit log history is retained" }
                        ]
                    },
                    {
                        id: "req11",
                        name: "Requirement 11: Test security of systems and networks regularly",
                        controls: [
                            { id: "11.1", name: "Processes and mechanisms for regularly testing security of systems and networks are defined and understood" },
                            { id: "11.2", name: "Wireless access points are identified and monitored, and unauthorized wireless access points are addressed" },
                            { id: "11.3", name: "External and internal vulnerabilities are regularly identified, prioritized, and addressed" },
                            { id: "11.4", name: "External and internal penetration testing is regularly performed" },
                            { id: "11.5", name: "Network intrusions and unexpected file changes are detected and responded to" },
                            { id: "11.6", name: "Change detection mechanisms are deployed to alert personnel to unauthorized modification of critical files" }
                        ]
                    }
                ]
            },
            nist: {
                name: "NIST 800-53",
                version: "Rev. 5",
                description: "Security and Privacy Controls for Federal Information Systems and Organizations",
                requirements: [
                    {
                        id: "ac",
                        name: "Access Control (AC)",
                        controls: [
                            { id: "AC-1", name: "Policy and Procedures" },
                            { id: "AC-2", name: "Account Management" },
                            { id: "AC-3", name: "Access Enforcement" },
                            { id: "AC-4", name: "Information Flow Enforcement" },
                            { id: "AC-5", name: "Separation of Duties" },
                            { id: "AC-6", name: "Least Privilege" },
                            { id: "AC-7", name: "Unsuccessful Logon Attempts" },
                            { id: "AC-8", name: "System Use Notification" },
                            { id: "AC-11", name: "Device Lock" },
                            { id: "AC-12", name: "Session Termination" },
                            { id: "AC-17", name: "Remote Access" },
                            { id: "AC-18", name: "Wireless Access" },
                            { id: "AC-19", name: "Access Control for Mobile Devices" },
                            { id: "AC-20", name: "Use of External Systems" }
                        ]
                    },
                    {
                        id: "ia",
                        name: "Identification and Authentication (IA)",
                        controls: [
                            { id: "IA-1", name: "Policy and Procedures" },
                            { id: "IA-2", name: "Identification and Authentication (Organizational Users)" },
                            { id: "IA-3", name: "Device Identification and Authentication" },
                            { id: "IA-4", name: "Identifier Management" },
                            { id: "IA-5", name: "Authenticator Management" },
                            { id: "IA-6", name: "Authentication Feedback" },
                            { id: "IA-7", name: "Cryptographic Module Authentication" },
                            { id: "IA-8", name: "Identification and Authentication (Non-Organizational Users)" },
                            { id: "IA-9", name: "Service Identification and Authentication" },
                            { id: "IA-10", name: "Adaptive Authentication" },
                            { id: "IA-11", name: "Re-authentication" },
                            { id: "IA-12", name: "Identity Proofing" }
                        ]
                    },
                    {
                        id: "cm",
                        name: "Configuration Management (CM)",
                        controls: [
                            { id: "CM-1", name: "Policy and Procedures" },
                            { id: "CM-2", name: "Baseline Configuration" },
                            { id: "CM-3", name: "Configuration Change Control" },
                            { id: "CM-4", name: "Impact Analyses" },
                            { id: "CM-5", name: "Access Restrictions for Change" },
                            { id: "CM-6", name: "Configuration Settings" },
                            { id: "CM-7", name: "Least Functionality" },
                            { id: "CM-8", name: "System Component Inventory" },
                            { id: "CM-9", name: "Configuration Management Plan" },
                            { id: "CM-10", name: "Software Usage Restrictions" },
                            { id: "CM-11", name: "User-Installed Software" },
                            { id: "CM-12", name: "Information Location" },
                            { id: "CM-13", name: "Data Action Mapping" }
                        ]
                    },
                    {
                        id: "si",
                        name: "System and Information Integrity (SI)",
                        controls: [
                            { id: "SI-1", name: "Policy and Procedures" },
                            { id: "SI-2", name: "Flaw Remediation" },
                            { id: "SI-3", name: "Malicious Code Protection" },
                            { id: "SI-4", name: "System Monitoring" },
                            { id: "SI-5", name: "Security Alerts, Advisories, and Directives" },
                            { id: "SI-7", name: "Software, Firmware, and Information Integrity" },
                            { id: "SI-8", name: "Spam Protection" },
                            { id: "SI-10", name: "Information Input Validation" },
                            { id: "SI-12", name: "Information Management and Retention" }
                        ]
                    },
                    {
                        id: "sc",
                        name: "System and Communications Protection (SC)",
                        controls: [
                            { id: "SC-1", name: "Policy and Procedures" },
                            { id: "SC-2", name: "Separation of System and User Functionality" },
                            { id: "SC-3", name: "Security Function Isolation" },
                            { id: "SC-4", name: "Information in Shared System Resources" },
                            { id: "SC-5", name: "Denial-of-Service Protection" },
                            { id: "SC-7", name: "Boundary Protection" },
                            { id: "SC-8", name: "Transmission Confidentiality and Integrity" },
                            { id: "SC-10", name: "Network Disconnect" },
                            { id: "SC-12", name: "Cryptographic Key Establishment and Management" },
                            { id: "SC-13", name: "Cryptographic Protection" },
                            { id: "SC-18", name: "Mobile Code" },
                            { id: "SC-28", name: "Protection of Information at Rest" }
                        ]
                    }
                ]
            },
            hipaa: {
                name: "HIPAA",
                version: "Security Rule",
                description: "Health Insurance Portability and Accountability Act",
                requirements: [
                    {
                        id: "administrative",
                        name: "Administrative Safeguards",
                        controls: [
                            { id: "164.308(a)(1)", name: "Security Management Process" },
                            { id: "164.308(a)(2)", name: "Assigned Security Responsibility" },
                            { id: "164.308(a)(3)", name: "Workforce Security" },
                            { id: "164.308(a)(4)", name: "Information Access Management" },
                            { id: "164.308(a)(5)", name: "Security Awareness and Training" },
                            { id: "164.308(a)(6)", name: "Security Incident Procedures" },
                            { id: "164.308(a)(7)", name: "Contingency Plan" },
                            { id: "164.308(a)(8)", name: "Evaluation" }
                        ]
                    },
                    {
                        id: "physical",
                        name: "Physical Safeguards",
                        controls: [
                            { id: "164.310(a)", name: "Facility Access Controls" },
                            { id: "164.310(b)", name: "Workstation Use" },
                            { id: "164.310(c)", name: "Workstation Security" },
                            { id: "164.310(d)", name: "Device and Media Controls" }
                        ]
                    },
                    {
                        id: "technical",
                        name: "Technical Safeguards",
                        controls: [
                            { id: "164.312(a)", name: "Access Control" },
                            { id: "164.312(b)", name: "Audit Controls" },
                            { id: "164.312(c)", name: "Integrity" },
                            { id: "164.312(d)", name: "Person or Entity Authentication" },
                            { id: "164.312(e)", name: "Transmission Security" }
                        ]
                    }
                ]
            },
            iso27001: {
                name: "ISO 27001",
                version: "2022",
                description: "Information Security Management System Standard",
                requirements: [
                    {
                        id: "a5",
                        name: "A.5 Organizational controls",
                        controls: [
                            { id: "A.5.1", name: "Policies for information security" },
                            { id: "A.5.2", name: "Information security roles and responsibilities" },
                            { id: "A.5.3", name: "Segregation of duties" },
                            { id: "A.5.4", name: "Management responsibilities" },
                            { id: "A.5.5", name: "Contact with authorities" },
                            { id: "A.5.6", name: "Contact with special interest groups" },
                            { id: "A.5.7", name: "Threat intelligence" },
                            { id: "A.5.8", name: "Information security in project management" }
                        ]
                    },
                    {
                        id: "a6",
                        name: "A.6 People controls",
                        controls: [
                            { id: "A.6.1", name: "Screening" },
                            { id: "A.6.2", name: "Terms and conditions of employment" },
                            { id: "A.6.3", name: "Information security awareness, education and training" },
                            { id: "A.6.4", name: "Disciplinary process" },
                            { id: "A.6.5", name: "Responsibilities after termination or change of employment" },
                            { id: "A.6.6", name: "Confidentiality or non-disclosure agreements" },
                            { id: "A.6.7", name: "Remote working" },
                            { id: "A.6.8", name: "Information security event reporting" }
                        ]
                    },
                    {
                        id: "a8",
                        name: "A.8 Access control",
                        controls: [
                            { id: "A.8.1", name: "User access management" },
                            { id: "A.8.2", name: "User registration and deregistration" },
                            { id: "A.8.3", name: "Privilege management" },
                            { id: "A.8.4", name: "Authentication information management" },
                            { id: "A.8.5", name: "Review of user access rights" },
                            { id: "A.8.6", name: "Removal or adjustment of access rights" },
                            { id: "A.8.7", name: "Secure authentication" },
                            { id: "A.8.8", name: "Access to source code" }
                        ]
                    },
                    {
                        id: "a9",
                        name: "A.9 Physical security",
                        controls: [
                            { id: "A.9.1", name: "Physical security perimeter" },
                            { id: "A.9.2", name: "Physical entry" },
                            { id: "A.9.3", name: "Securing offices, rooms and facilities" },
                            { id: "A.9.4", name: "Physical security monitoring" },
                            { id: "A.9.5", name: "Protecting against physical and environmental threats" }
                        ]
                    },
                    {
                        id: "a10",
                        name: "A.10 Operational security",
                        controls: [
                            { id: "A.10.1", name: "Documented operating procedures" },
                            { id: "A.10.2", name: "Change management" },
                            { id: "A.10.3", name: "Capacity management" },
                            { id: "A.10.4", name: "Protection against malware" },
                            { id: "A.10.5", name: "Backup" },
                            { id: "A.10.6", name: "Management of technical vulnerabilities" },
                            { id: "A.10.7", name: "Configuration management" }
                        ]
                    }
                ]
            },
            gdpr: {
                name: "GDPR",
                version: "2018",
                description: "General Data Protection Regulation",
                requirements: [
                    {
                        id: "art24",
                        name: "Article 24 - Responsibility of the controller",
                        controls: [
                            { id: "Art.24(1)", name: "Implement appropriate technical and organisational measures" },
                            { id: "Art.24(2)", name: "Implementation of appropriate data protection policies" }
                        ]
                    },
                    {
                        id: "art25",
                        name: "Article 25 - Data protection by design and by default",
                        controls: [
                            { id: "Art.25(1)", name: "Data protection by design" },
                            { id: "Art.25(2)", name: "Data protection by default" }
                        ]
                    },
                    {
                        id: "art30",
                        name: "Article 30 - Records of processing activities",
                        controls: [
                            { id: "Art.30(1)", name: "Records of processing activities as controller" },
                            { id: "Art.30(2)", name: "Records of processing activities as processor" }
                        ]
                    },
                    {
                        id: "art32",
                        name: "Article 32 - Security of processing",
                        controls: [
                            { id: "Art.32(1)(a)", name: "Pseudonymisation and encryption of personal data" },
                            { id: "Art.32(1)(b)", name: "Ensure confidentiality, integrity, availability and resilience" },
                            { id: "Art.32(1)(c)", name: "Restore availability and access to personal data" },
                            { id: "Art.32(1)(d)", name: "Testing, assessing and evaluating effectiveness of measures" }
                        ]
                    },
                    {
                        id: "art33",
                        name: "Article 33 - Notification of a personal data breach",
                        controls: [
                            { id: "Art.33(1)", name: "Notification to the supervisory authority" },
                            { id: "Art.33(3)", name: "Content of notification" },
                            { id: "Art.33(5)", name: "Documentation of personal data breaches" }
                        ]
                    }
                ]
            }
        };
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Create or enhance compliance panel
        this.createCompliancePanel();
        
        // Add event listeners for compliance controls
        this.attachEventListeners();
        
        console.log('Compliance Mapper initialized');
    }
    
    createCompliancePanel() {
        // Find the security view panel
        const securityView = document.querySelector('.view-panel[data-view="security"]');
        if (!securityView) {
            console.error('Could not find security view panel');
            return;
        }
        
        // Get reference to compliance panel
        const compliancePanel = document.getElementById('security-compliance');
        if (!compliancePanel) {
            console.error('Could not find compliance panel');
            return;
        }
        
        // Enhance panel with comprehensive compliance mapping
        compliancePanel.innerHTML = `
            <div class="panel-header">
                <h2>Compliance Requirements</h2>
                <p class="subtitle">Framework mapping and regulatory analysis</p>
            </div>
            
            <div class="compliance-controls">
                <div class="form-group">
                    <label for="panel-industry-select" class="form-label">Industry</label>
                    <select id="panel-industry-select" class="form-select">
                        <option value="">Choose an industry...</option>
                        ${Object.keys(this.industryData).map(key => `
                            <option value="${key}">
                                ${this.industryData[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="compliance-framework-select" class="form-label">Compliance Framework</label>
                    <select id="compliance-framework-select" class="form-select">
                        <option value="">Choose a framework...</option>
                        ${Object.keys(this.complianceFrameworks).map(key => `
                            <option value="${key}">
                                ${this.complianceFrameworks[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="compliance-vendor-select" class="form-label">Vendor</label>
                    <select id="compliance-vendor-select" class="form-select">
					<!-- This will be populated dynamically -->
                    </select>
                </div>
            </div>
            
            <div class="dashboard-grid grid-4">
                <div class="dashboard-card highlight-card">
                    <h3>Compliance Coverage</h3>
                    <div class="metric-value highlight-value" id="compliance-coverage-score">93%</div>
                    <div class="metric-label">Framework requirements met</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Regulatory Status</h3>
                    <div class="metric-value" id="regulatory-status">Compliant</div>
                    <div class="metric-label">With selected framework</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Implementation Effort</h3>
                    <div class="metric-value" id="implementation-effort">Medium</div>
                    <div class="metric-label">Setup complexity</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Audit Readiness</h3>
                    <div class="metric-value" id="audit-readiness">High</div>
                    <div class="metric-label">Reporting capabilities</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Compliance Requirements Coverage</h3>
                <div class="chart-wrapper">
                    <canvas id="compliance-coverage-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Framework Requirements Mapping</h3>
                <div class="requirements-mapping" id="requirements-mapping">
                    <!-- Will be populated dynamically -->
                    <div class="loading-message">Select a compliance framework to view requirements mapping</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Control Implementation Status</h3>
                <div class="control-status-grid" id="control-status-grid">
                    <!-- Will be populated dynamically -->
                    <div class="loading-message">Select a compliance framework to view control implementation status</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Compliance Comparison</h3>
                <div class="chart-wrapper">
                    <canvas id="compliance-radar-chart"></canvas>
                </div>
            </div>
        `;
        
        // Initialize compliance visualizations
        setTimeout(() => this.initializeVisualizations(), 500);
    }
    
    attachEventListeners() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Industry selection
            const industrySelect = document.getElementById('panel-industry-select');
            if (industrySelect) {
                industrySelect.addEventListener('change', () => {
                    this.updateComplianceFrameworks();
                    this.updateComplianceMetrics();
                    this.updateComplianceCoverageChart();
                    this.updateRequirementsMapping();
                    this.updateControlStatusGrid();
                    this.updateComplianceRadarChart();
                });
            }
            
            // Framework selection
            const frameworkSelect = document.getElementById('compliance-framework-select');
            if (frameworkSelect) {
                frameworkSelect.addEventListener('change', () => {
                    this.updateRequirementsMapping();
                    this.updateControlStatusGrid();
                    this.updateComplianceMetrics();
                    this.updateComplianceCoverageChart();
                });
            }
            
            // Vendor selection
            const vendorSelect = document.getElementById('compliance-vendor-select');
            if (vendorSelect) {
                // Populate with selected vendors
                this.updateVendorSelect(vendorSelect);
                
                // Add event listener for changes
                vendorSelect.addEventListener('change', () => {
                    this.updateRequirementsMapping();
                    this.updateControlStatusGrid();
                    this.updateComplianceMetrics();
                    this.updateComplianceCoverageChart();
                    this.updateComplianceRadarChart();
                });
            }
            
            // Listen for tab changes to ensure visualizations render correctly
            document.addEventListener('click', (e) => {
                if (e.target.matches('.results-tab[data-panel="security-compliance"]')) {
                    // Tab was clicked, ensure visualizations render
                    setTimeout(() => {
                        this.updateComplianceFrameworks();
                        this.updateComplianceMetrics();
                        this.updateComplianceCoverageChart();
                        this.updateRequirementsMapping();
                        this.updateControlStatusGrid();
                        this.updateComplianceRadarChart();
                    }, 100);
                }
            });
            
            // Listen for vendor selection changes in the sidebar
            document.addEventListener('click', (e) => {
                if (e.target.matches('.vendor-card')) {
                    // Vendor selection changed, update vendor select
                    setTimeout(() => {
                        this.updateVendorSelect(document.getElementById('compliance-vendor-select'));
                    }, 500);
                }
            });
        }, 1000);
    }
    
    updateVendorSelect(vendorSelect) {
        if (!vendorSelect) return;
        
        // Get selected vendors from calculator state
        const selectedVendors = window.calculatorState?.selectedVendors || ['portnox'];
        
        // Clear current options
        vendorSelect.innerHTML = '';
        
        // Add options for each selected vendor
        selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            if (vendor) {
                const option = document.createElement('option');
                option.value = vendorId;
                option.textContent = vendor.name;
                vendorSelect.appendChild(option);
            }
        });
        
        // Default to Portnox if available
        if (selectedVendors.includes('portnox')) {
            vendorSelect.value = 'portnox';
        }
    }
    
    updateComplianceFrameworks() {
        // Get selected industry
        const industrySelect = document.getElementById('panel-industry-select');
        if (!industrySelect) return;
        
        const industryId = industrySelect.value;
        const industryData = this.industryData[industryId];
        
        // Get framework select
        const frameworkSelect = document.getElementById('compliance-framework-select');
        if (!frameworkSelect) return;
        
        // Clear and rebuild options
        const currentValue = frameworkSelect.value;
        frameworkSelect.innerHTML = '<option value="">Choose a framework...</option>';
        
        // Add all frameworks but highlight industry-specific ones
        Object.keys(this.complianceFrameworks).forEach(key => {
            const framework = this.complianceFrameworks[key];
            
            const option = document.createElement('option');
            option.value = key;
            
            if (industryData && (
                industryData.primaryFrameworks?.includes(framework.name) ||
                industryData.additionalFrameworks?.includes(framework.name)
            )) {
                // This is an industry-relevant framework
                option.textContent = `${framework.name} (Industry-specific)`;
                option.classList.add('industry-specific');
            } else {
                option.textContent = framework.name;
            }
            
            frameworkSelect.appendChild(option);
        });
        
        // Try to keep current selection or select first industry-specific framework
        if (currentValue && frameworkSelect.querySelector(`option[value="${currentValue}"]`)) {
            frameworkSelect.value = currentValue;
        } else if (industryData) {
            // Find first primary framework that matches
            for (const framework of industryData.primaryFrameworks || []) {
                const key = Object.keys(this.complianceFrameworks).find(
                    k => this.complianceFrameworks[k].name === framework
                );
                
                if (key && frameworkSelect.querySelector(`option[value="${key}"]`)) {
                    frameworkSelect.value = key;
                    break;
                }
            }
        }
    }
    
    initializeVisualizations() {
        this.updateComplianceFrameworks();
        this.updateComplianceMetrics();
        this.updateComplianceCoverageChart();
        this.updateRequirementsMapping();
        this.updateControlStatusGrid();
        this.updateComplianceRadarChart();
    }
    
    updateComplianceMetrics() {
        // Get selected vendor, industry, and framework
        const vendorSelect = document.getElementById('compliance-vendor-select');
        const industrySelect = document.getElementById('panel-industry-select');
        const frameworkSelect = document.getElementById('compliance-framework-select');
        
        if (!vendorSelect || !frameworkSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const frameworkId = frameworkSelect.value;
        const framework = this.complianceFrameworks[frameworkId];
        
        const industryId = industrySelect.value;
        const industry = this.industryData[industryId];
        
        if (!vendor) return;
        
        // Update Compliance Coverage Score
        const coverageElement = document.getElementById('compliance-coverage-score');
        if (coverageElement) {
            let coverageScore = 0;
            
            if (framework) {
                // Calculate coverage based on framework control mapping
                coverageScore = this.calculateFrameworkCoverage(vendor, frameworkId);
            } else {
                // Overall compliance coverage from vendor data
                coverageScore = vendor.security?.complianceCoverage || 0;
            }
            
            coverageElement.textContent = `${coverageScore}%`;
        }
        
        // Update Regulatory Status
        const statusElement = document.getElementById('regulatory-status');
        if (statusElement) {
            let status = 'Not Assessed';
            
            if (framework) {
                const coverage = this.calculateFrameworkCoverage(vendor, frameworkId);
                
                if (coverage >= 90) {
                    status = 'Compliant';
                } else if (coverage >= 75) {
                    status = 'Mostly Compliant';
                } else if (coverage >= 50) {
                    status = 'Partially Compliant';
                } else {
                    status = 'Non-Compliant';
                }
            }
            
            statusElement.textContent = status;
        }
        
        // Update Implementation Effort
        const effortElement = document.getElementById('implementation-effort');
        if (effortElement) {
            let effort = 'Medium';
            
            if (vendor.implementationComplexity) {
                if (vendor.implementationComplexity.includes('Low')) {
                    effort = 'Low';
                } else if (vendor.implementationComplexity.includes('High')) {
                    effort = 'High';
                }
            }
            
            effortElement.textContent = effort;
        }
        
        // Update Audit Readiness
        const readinessElement = document.getElementById('audit-readiness');
        if (readinessElement) {
            let readiness = 'Medium';
            
            if (vendor.features) {
                // Base on compliance and automation features
                const complianceScore = vendor.features.compliance || 70;
                const automationScore = vendor.features.automation || 70;
                
                const readinessScore = (complianceScore * 0.6) + (automationScore * 0.4);
                
                if (readinessScore >= 85) {
                    readiness = 'High';
                } else if (readinessScore >= 60) {
                    readiness = 'Medium';
                } else {
                    readiness = 'Low';
                }
            }
            
            readinessElement.textContent = readiness;
        }
    }
    
    updateComplianceCoverageChart() {
        const chartCanvas = document.getElementById('compliance-coverage-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('compliance-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Get selected framework
        const frameworkSelect = document.getElementById('compliance-framework-select');
        const frameworkId = frameworkSelect?.value;
        const framework = this.complianceFrameworks[frameworkId];
        
        // Prepare chart data
        const labels = [];
        const data = [];
        
        if (framework) {
            // Show requirements coverage for selected framework
            framework.requirements.forEach(requirement => {
                labels.push(requirement.id.toUpperCase());
                
                // Calculate coverage for this requirement
                const coverage = this.calculateRequirementCoverage(vendor, frameworkId, requirement.id);
                data.push(coverage);
            });
        } else {
            // Show coverage across all frameworks
            Object.keys(this.complianceFrameworks).forEach(frameworkKey => {
                const fw = this.complianceFrameworks[frameworkKey];
                labels.push(fw.name);
                
                // Calculate coverage for this framework
                const coverage = this.calculateFrameworkCoverage(vendor, frameworkKey);
                data.push(coverage);
            });
        }
        
        // Create datasets
        const datasets = [
            {
                label: framework ? 'Requirement Coverage' : 'Framework Coverage',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }
        ];
        
        // Create or update chart
        if (window.complianceCoverageChart) {
            window.complianceCoverageChart.data.labels = labels;
            window.complianceCoverageChart.data.datasets = datasets;
            window.complianceCoverageChart.options.scales.y.title.text = framework ? 
                'Requirement Coverage (%)' : 'Framework Coverage (%)';
            window.complianceCoverageChart.update();
        } else {
            window.complianceCoverageChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: framework ? 'Requirement Coverage (%)' : 'Framework Coverage (%)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.raw}% Coverage`;
                                }
                            }
                        },
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value) {
                                return `${value}%`;
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateRequirementsMapping() {
        const mappingContainer = document.getElementById('requirements-mapping');
        if (!mappingContainer) return;
        
        // Get selected vendor and framework
        const vendorSelect = document.getElementById('compliance-vendor-select');
        const frameworkSelect = document.getElementById('compliance-framework-select');
        
        if (!vendorSelect || !frameworkSelect || !frameworkSelect.value) {
            mappingContainer.innerHTML = `
                <div class="loading-message">Select a compliance framework to view requirements mapping</div>
            `;
            return;
        }
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const frameworkId = frameworkSelect.value;
        const framework = this.complianceFrameworks[frameworkId];
        
        if (!vendor || !framework) {
            mappingContainer.innerHTML = `
                <div class="loading-message">No mapping data available</div>
            `;
            return;
        }
        
        // Build HTML for requirements mapping
        let mappingHTML = `
            <div class="framework-info">
                <div class="framework-header">
                    <h4>${framework.name} - ${framework.version}</h4>
                    <p>${framework.description}</p>
                </div>
            </div>
            
            <div class="requirements-accordion">
        `;
        
        // Add each requirement section
        framework.requirements.forEach(requirement => {
            // Calculate coverage for this requirement
            const coverage = this.calculateRequirementCoverage(vendor, frameworkId, requirement.id);
            
            // Determine coverage class
            let coverageClass = '';
            if (coverage >= 90) coverageClass = 'excellent';
            else if (coverage >= 75) coverageClass = 'good';
            else if (coverage >= 60) coverageClass = 'adequate';
            else if (coverage >= 40) coverageClass = 'fair';
            else coverageClass = 'poor';
            
            mappingHTML += `
                <div class="requirement-section">
                    <div class="requirement-header">
                        <div class="requirement-title">
                            <h4>${requirement.name}</h4>
                        </div>
                        <div class="requirement-coverage ${coverageClass}">
                            <span>${coverage}%</span>
                        </div>
                        <div class="requirement-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="requirement-controls">
                        <table class="controls-table">
                            <thead>
                                <tr>
                                    <th>Control ID</th>
                                    <th>Description</th>
                                    <th>Coverage</th>
                                    <th>Implementation</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            // Add rows for each control
            requirement.controls.forEach(control => {
                // Calculate control coverage and implementation details
                const controlMapping = this.getControlMapping(vendor, frameworkId, control.id);
                
                mappingHTML += `
                    <tr>
                        <td>${control.id}</td>
                        <td>${control.name}</td>
                        <td class="coverage-cell ${controlMapping.coverageClass}">${controlMapping.coverage}%</td>
                        <td>${controlMapping.implementation}</td>
                    </tr>
                `;
            });
            
            mappingHTML += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        });
        
        mappingHTML += `</div>`;
        
        // Update container
        mappingContainer.innerHTML = mappingHTML;
        
        // Add event listeners for accordion toggling
        const headerElements = mappingContainer.querySelectorAll('.requirement-header');
        headerElements.forEach(header => {
            header.addEventListener('click', () => {
                const section = header.closest('.requirement-section');
                section.classList.toggle('expanded');
                
                const toggle = header.querySelector('.requirement-toggle i');
                if (toggle) {
                    toggle.className = section.classList.contains('expanded') ? 
                        'fas fa-chevron-up' : 'fas fa-chevron-down';
                }
            });
        });
    }
    
    updateControlStatusGrid() {
        const gridContainer = document.getElementById('control-status-grid');
        if (!gridContainer) return;
        
        // Get selected vendor and framework
        const vendorSelect = document.getElementById('compliance-vendor-select');
        const frameworkSelect = document.getElementById('compliance-framework-select');
        
        if (!vendorSelect || !frameworkSelect || !frameworkSelect.value) {
            gridContainer.innerHTML = `
                <div class="loading-message">Select a compliance framework to view control implementation status</div>
            `;
            return;
        }
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const frameworkId = frameworkSelect.value;
        const framework = this.complianceFrameworks[frameworkId];
        
        if (!vendor || !framework) {
            gridContainer.innerHTML = `
                <div class="loading-message">No control status data available</div>
            `;
            return;
        }
        
        // Build control status grid
        let gridHTML = `<div class="control-status-wrapper">`;
        
        // Define status categories
        const statuses = [
            { key: 'implemented', name: 'Implemented', icon: 'check-circle', class: 'status-implemented' },
            { key: 'configurable', name: 'Configurable', icon: 'sliders-h', class: 'status-configurable' },
            { key: 'partial', name: 'Partial', icon: 'adjust', class: 'status-partial' },
            { key: 'notSupported', name: 'Not Supported', icon: 'times-circle', class: 'status-not-supported' }
        ];
        
        // Generate grid for each status
        statuses.forEach(status => {
            // Get controls for this status
            const controls = this.getControlsByStatus(vendor, frameworkId, status.key);
            
            gridHTML += `
                <div class="control-status-category">
                    <div class="status-header ${status.class}">
                        <div class="status-icon">
                            <i class="fas fa-${status.icon}"></i>
                        </div>
                        <h4>${status.name}</h4>
                        <div class="status-count">${controls.length}</div>
                    </div>
                    <div class="status-controls">
            `;
            
            // Add controls
            if (controls.length > 0) {
                controls.forEach(control => {
                    gridHTML += `
                        <div class="control-item" title="${control.name}">
                            <span class="control-id">${control.id}</span>
                        </div>
                    `;
                });
            } else {
                gridHTML += `<div class="no-controls">No controls in this category</div>`;
            }
            
            gridHTML += `
                    </div>
                </div>
            `;
        });
        
        gridHTML += `</div>`;
        
        // Add legend
        gridHTML += `
            <div class="control-status-legend">
                <div class="legend-title">Status Legend:</div>
                ${statuses.map(status => `
                    <div class="legend-item">
                        <div class="legend-icon ${status.class}">
                            <i class="fas fa-${status.icon}"></i>
                        </div>
                        <span>${status.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update container
        gridContainer.innerHTML = gridHTML;
    }
    
    updateComplianceRadarChart() {
        const chartCanvas = document.getElementById('compliance-radar-chart');
        if (!chartCanvas) return;
        
        // Get selected vendors
        const selectedVendors = window.calculatorState?.selectedVendors || ['portnox'];
        
        // Prepare data for radar chart
        const frameworks = ['PCI DSS', 'NIST', 'HIPAA', 'ISO 27001', 'GDPR'];
        const frameworkKeys = ['pciDss', 'nist', 'hipaa', 'iso27001', 'gdpr'];
        
        // Prepare datasets
        const datasets = [];
        
        // Define color scheme
        const colorMap = {
            portnox: 'rgba(0, 123, 255, 0.7)',
            cisco: 'rgba(0, 200, 83, 0.7)',
            aruba: 'rgba(255, 152, 0, 0.7)',
            forescout: 'rgba(233, 30, 99, 0.7)',
            fortinac: 'rgba(156, 39, 176, 0.7)',
            juniper: 'rgba(3, 169, 244, 0.7)',
            securew2: 'rgba(255, 193, 7, 0.7)',
            microsoft: 'rgba(103, 58, 183, 0.7)',
            arista: 'rgba(255, 87, 34, 0.7)',
            foxpass: 'rgba(121, 85, 72, 0.7)',
            'no-nac': 'rgba(158, 158, 158, 0.7)'
        };
        
        // Create dataset for each vendor
        selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            if (!vendor) return;
            
            // Calculate coverage for each framework
            const coverageData = frameworkKeys.map(frameworkId => 
                this.calculateFrameworkCoverage(vendor, frameworkId)
            );
            
            // Create dataset
            datasets.push({
                label: vendor.name,
                data: coverageData,
                backgroundColor: `${colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)'}`,
                borderColor: colorMap[vendorId] || 'rgba(158, 158, 158, 1)',
                borderWidth: 2,
                pointBackgroundColor: colorMap[vendorId] || 'rgba(158, 158, 158, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colorMap[vendorId] || 'rgba(158, 158, 158, 1)',
                pointRadius: 4
            });
        });
        
        // Create or update chart
        if (window.complianceRadarChart) {
            window.complianceRadarChart.data.labels = frameworks;
            window.complianceRadarChart.data.datasets = datasets;
            window.complianceRadarChart.update();
        } else {
            window.complianceRadarChart = new Chart(chartCanvas, {
                type: 'radar',
                data: {
                    labels: frameworks,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 20,
                                showLabelBackdrop: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    calculateFrameworkCoverage(vendor, frameworkId) {
        if (!vendor || !frameworkId) return 0;
        
        const framework = this.complianceFrameworks[frameworkId];
        if (!framework) return 0;
        
        // Calculate coverage across all requirements
        let totalCoverage = 0;
        
        framework.requirements.forEach(requirement => {
            totalCoverage += this.calculateRequirementCoverage(vendor, frameworkId, requirement.id);
        });
        
        // Return average coverage
        return Math.round(totalCoverage / framework.requirements.length);
    }
    
    calculateRequirementCoverage(vendor, frameworkId, requirementId) {
        if (!vendor || !frameworkId || !requirementId) return 0;
        
        const framework = this.complianceFrameworks[frameworkId];
        if (!framework) return 0;
        
        // Find the requirement
        const requirement = framework.requirements.find(req => req.id === requirementId);
        if (!requirement) return 0;
        
        // Calculate coverage across controls
        let totalCoverage = 0;
        let controlCount = 0;
        
        requirement.controls.forEach(control => {
            const mapping = this.getControlMapping(vendor, frameworkId, control.id);
            totalCoverage += mapping.coverage;
            controlCount++;
        });
        
        // Return average coverage
        return controlCount > 0 ? Math.round(totalCoverage / controlCount) : 0;
    }
    
    getControlMapping(vendor, frameworkId, controlId) {
        // This is where the mapping logic would be implemented
        // For this example, we'll generate realistic mappings based on vendor capabilities
        
        if (!vendor || !vendor.features) {
            return {
                coverage: 0,
                coverageClass: 'poor',
                implementation: 'Not supported'
            };
        }
        
        // Calculate based on relevant feature scores
        let relevantFeatures = [];
        let implementationNote = '';
        
        // Map frameworks and controls to relevant vendor features
        switch (frameworkId) {
            case 'pciDss':
                if (controlId.startsWith('1.')) {
                    // Network security
                    relevantFeatures = ['zeroTrust', 'multiVendor'];
                    implementationNote = 'Network segmentation and access controls';
                } else if (controlId.startsWith('2.')) {
                    // Secure configurations
                    relevantFeatures = ['automation', 'endpointVisibility'];
                    implementationNote = 'Device configuration enforcement';
                } else if (controlId.startsWith('7.')) {
                    // Access restrictions
                    relevantFeatures = ['zeroTrust', 'compliance'];
                    implementationNote = 'Least privilege access controls';
                } else if (controlId.startsWith('8.')) {
                    // Authentication
                    relevantFeatures = ['zeroTrust', 'userExperience'];
                    
                    // Check for MFA capabilities
                    if (vendor.authCapabilities?.certificateManagement) {
                        implementationNote = 'Strong certificate-based authentication';
                    } else {
                        implementationNote = 'RADIUS authentication';
                    }
                } else if (controlId.startsWith('9.')) {
                    // Physical access
                    relevantFeatures = ['endpointVisibility'];
                    implementationNote = 'Endpoint monitoring and protection';
                } else if (controlId.startsWith('10.')) {
                    // Logging
                    relevantFeatures = ['threatResponse', 'automation'];
                    implementationNote = 'Audit logging and monitoring';
                } else if (controlId.startsWith('11.')) {
                    // Testing
                    relevantFeatures = ['endpointVisibility', 'threatResponse'];
                    implementationNote = 'Network monitoring and vulnerability assessment';
                }
                break;
                
            case 'nist':
                if (controlId.startsWith('AC-')) {
                    // Access Control
                    relevantFeatures = ['zeroTrust', 'userExperience'];
                    implementationNote = 'Access control enforcement';
                } else if (controlId.startsWith('IA-')) {
                    // Identity and Authentication
                    relevantFeatures = ['zeroTrust'];
                    
                    // Check for authentication capabilities
                    if (vendor.authCapabilities?.certificateManagement) {
                        implementationNote = 'Identity verification and authentication';
                    } else {
                        implementationNote = 'Basic authentication support';
                    }
                } else if (controlId.startsWith('CM-')) {
                    // Configuration Management
                    relevantFeatures = ['automation', 'endpointVisibility'];
                    implementationNote = 'Configuration management and enforcement';
                } else if (controlId.startsWith('SI-')) {
                    // System and Information Integrity
                    relevantFeatures = ['threatResponse', 'endpointVisibility'];
                    implementationNote = 'System integrity monitoring';
                } else if (controlId.startsWith('SC-')) {
                    // System and Communications Protection
                    relevantFeatures = ['multiVendor', 'zeroTrust'];
                    implementationNote = 'Network protection and segmentation';
                }
                break;
                
            case 'hipaa':
                if (controlId.startsWith('164.308')) {
                    // Administrative Safeguards
                    relevantFeatures = ['compliance', 'automation'];
                    implementationNote = 'Administrative policy enforcement';
                } else if (controlId.startsWith('164.310')) {
                    // Physical Safeguards
                    relevantFeatures = ['endpointVisibility'];
                    implementationNote = 'Endpoint security and monitoring';
                } else if (controlId.startsWith('164.312')) {
                    // Technical Safeguards
                    relevantFeatures = ['zeroTrust', 'threatResponse'];
                    implementationNote = 'Technical access controls';
                }
                break;
                
            case 'iso27001':
                if (controlId.startsWith('A.5')) {
                    // Organizational controls
                    relevantFeatures = ['compliance'];
                    implementationNote = 'Security policy support';
                } else if (controlId.startsWith('A.6')) {
                    // People controls
                    relevantFeatures = ['userExperience', 'compliance'];
                    implementationNote = 'User security controls';
                } else if (controlId.startsWith('A.8')) {
                    // Access control
                    relevantFeatures = ['zeroTrust', 'multiVendor'];
                    implementationNote = 'Access control implementation';
                } else if (controlId.startsWith('A.9')) {
                    // Physical security
                    relevantFeatures = ['endpointVisibility'];
                    implementationNote = 'Limited physical security capabilities';
                } else if (controlId.startsWith('A.10')) {
                    // Operational security
                    relevantFeatures = ['automation', 'threatResponse'];
                    implementationNote = 'Operational security automation';
                }
                break;
                
            case 'gdpr':
                if (controlId.startsWith('Art.24')) {
                    // Controller responsibility
                    relevantFeatures = ['compliance', 'automation'];
                    implementationNote = 'Data protection measures';
                } else if (controlId.startsWith('Art.25')) {
                    // Data protection by design
                    relevantFeatures = ['zeroTrust', 'compliance'];
                    implementationNote = 'Privacy-enhancing access controls';
                } else if (controlId.startsWith('Art.30')) {
                    // Records of processing
                    relevantFeatures = ['endpointVisibility', 'compliance'];
                    implementationNote = 'Activity monitoring and reporting';
                } else if (controlId.startsWith('Art.32')) {
                    // Security of processing
                    relevantFeatures = ['zeroTrust', 'threatResponse'];
                    implementationNote = 'Security controls implementation';
                } else if (controlId.startsWith('Art.33')) {
                    // Breach notification
                    relevantFeatures = ['threatResponse', 'automation'];
                    implementationNote = 'Incident response capabilities';
                }
                break;
                
            default:
                relevantFeatures = ['compliance', 'zeroTrust'];
                implementationNote = 'General compliance capabilities';
        }
        
        // Calculate coverage based on relevant features
        let totalScore = 0;
        let count = 0;
        
        relevantFeatures.forEach(feature => {
            if (vendor.features[feature]) {
                totalScore += vendor.features[feature];
                count++;
            }
        });
        
        // Calculate average coverage
        const coverage = count > 0 ? Math.round(totalScore / count) : 0;
        
        // Determine implementation status based on coverage
        let implementation = implementationNote;
        let coverageClass = '';
        
        if (coverage >= 90) {
            implementation = 'Fully ' + implementationNote;
            coverageClass = 'excellent';
        } else if (coverage >= 75) {
            implementation = 'Mostly ' + implementationNote;
            coverageClass = 'good';
        } else if (coverage >= 60) {
            implementation = 'Partially ' + implementationNote;
            coverageClass = 'adequate';
        } else if (coverage >= 40) {
            implementation = 'Limited ' + implementationNote;
            coverageClass = 'fair';
        } else {
            implementation = 'Minimal ' + implementationNote;
            coverageClass = 'poor';
        }
        
        return {
            coverage,
            coverageClass,
            implementation
        };
    }
    
    getControlsByStatus(vendor, frameworkId, status) {
        const framework = this.complianceFrameworks[frameworkId];
        if (!framework) return [];
        
        // Collect all controls
        const allControls = [];
        framework.requirements.forEach(requirement => {
            requirement.controls.forEach(control => {
                allControls.push({
                    id: control.id,
                    name: control.name,
                    requirementId: requirement.id
                });
            });
        });
        
        // Filter controls by status
        return allControls.filter(control => {
            const mapping = this.getControlMapping(vendor, frameworkId, control.id);
            
            switch (status) {
                case 'implemented':
                    return mapping.coverage >= 90;
                case 'configurable':
                    return mapping.coverage >= 70 && mapping.coverage < 90;
                case 'partial':
                    return mapping.coverage >= 40 && mapping.coverage < 70;
                case 'notSupported':
                    return mapping.coverage < 40;
                default:
                    return false;
            }
        });
    }
}

// Initialize the component
window.complianceMapper = new ComplianceMapper();
