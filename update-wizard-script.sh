#!/bin/bash

# Wizard Update Script for Portnox Total Cost Analyzer
# This script updates the wizard to implement the new TCO Multi-Vendor Analyzer

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Updating Wizard for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create necessary directories
mkdir -p js/wizards/multi-vendor
mkdir -p js/components/wizard

# Update wizard controller JavaScript
echo -e "${YELLOW}Creating updated wizard controller...${NC}"
cat > "js/wizards/multi-vendor/wizard-controller.js" << 'EOL'
/**
 * TCO Multi-Vendor Analyzer - Wizard Controller
 * Manages the wizard flow for the TCO Multi-Vendor Analyzer
 */
class TCOWizardController {
    constructor() {
        // Wizard elements
        this.wizardContainer = document.getElementById('wizard-container');
        this.progressFill = document.getElementById('wizard-progress-fill');
        this.progressSteps = document.getElementById('progress-steps');
        this.prevButton = document.getElementById('prev-step');
        this.nextButton = document.getElementById('next-step');
        
        // Wizard state
        this.currentStep = 1;
        this.totalSteps = 5;
        this.steps = [];
        
        // Step validation functions - will be dynamically set
        this.stepValidators = {
            1: () => true, // Vendor selection - always valid if at least one vendor is selected
            2: () => true, // Industry & compliance - always valid if industry is selected
            3: this.validateOrganizationStep.bind(this),
            4: this.validateAdvancedConfigStep.bind(this),
            5: () => true  // Review - always valid
        };
        
        // Data model for the wizard
        this.wizardData = {
            currentVendor: null,
            compareVendors: [],
            industry: '',
            compliance: [],
            organization: {
                size: 'medium',
                devices: 2500,
                locations: 5,
                cloudIntegration: false,
                legacyDevices: false,
                byodSupport: false
            },
            timeline: {
                years: 3,
                urgency: 'normal'
            },
            costs: {
                personnel: {
                    fteCost: 120000,
                    fteAllocation: 50
                },
                maintenance: {
                    percentage: 18,
                    downtimeCost: 10000
                },
                implementation: {
                    consultingRate: 2000,
                    days: 60
                },
                training: {
                    costPerUser: 500,
                    users: 20
                },
                portnox: {
                    basePrice: 4,
                    discount: 20
                }
            }
        };
        
        // Initialize the wizard
        this.init();
    }
    
    /**
     * Initialize the wizard
     */
    init() {
        // Initialize progress steps
        this.initProgressSteps();
        
        // Get all wizard steps
        this.steps = Array.from(document.querySelectorAll('.wizard-step'));
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Update UI for initial step
        this.updateUI();
        
        // Initialize vendor selection
        this.initVendorSelection();
        
        // Initialize industry selector
        this.initIndustrySelector();
        
        // Initialize organization form
        this.initOrganizationForm();
        
        // Initialize cost configuration
        this.initCostConfiguration();
        
        // Initialize review step
        this.initReviewStep();

        // Log initialization
        console.log('TCO Wizard Controller initialized');
    }
    
    /**
     * Initialize the progress steps
     */
    initProgressSteps() {
        // Define steps
        const steps = [
            { number: 1, label: 'Vendor Selection' },
            { number: 2, label: 'Industry & Compliance' },
            { number: 3, label: 'Organization' },
            { number: 4, label: 'Cost Configuration' },
            { number: 5, label: 'Review & Calculate' }
        ];
        
        // Clear existing steps
        this.progressSteps.innerHTML = '';
        
        // Create step elements
        steps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = `progress-step ${step.number === 1 ? 'active' : ''}`;
            stepElement.dataset.step = step.number;
            
            stepElement.innerHTML = `
                <div class="step-indicator">${step.number}</div>
                <div class="step-label">${step.label}</div>
            `;
            
            this.progressSteps.appendChild(stepElement);
        });
    }
    
    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Navigation buttons
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prevStep());
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.nextStep());
        }
        
        // Calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateResults());
        }
        
        // Modify button
        const modifyBtn = document.getElementById('modify-btn');
        if (modifyBtn) {
            modifyBtn.addEventListener('click', () => this.goToStep(1));
        }
        
        // New calculation button
        const newCalculationBtn = document.getElementById('new-calculation');
        if (newCalculationBtn) {
            newCalculationBtn.addEventListener('click', () => this.resetWizard());
        }
    }
    
    /**
     * Initialize vendor selection
     */
    initVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            card.addEventListener('click', () => {
                // Update UI
                vendorCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Update data model
                this.wizardData.currentVendor = card.dataset.vendor;
                
                // Show vendor preview
                this.updateVendorPreview(card.dataset.vendor);
            });
        });
        
        // Add "Compare with Portnox" button to each vendor card
        vendorCards.forEach(card => {
            if (card.dataset.vendor !== 'portnox' && !card.dataset.vendor !== 'noNac') {
                const compareBtn = document.createElement('button');
                compareBtn.className = 'compare-btn';
                compareBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Compare with Portnox';
                
                compareBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card click
                    
                    // Select this vendor
                    vendorCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    
                    this.wizardData.currentVendor = card.dataset.vendor;
                    
                    // Add to compare list if not already there
                    if (!this.wizardData.compareVendors.includes(card.dataset.vendor)) {
                        this.wizardData.compareVendors.push(card.dataset.vendor);
                    }
                    
                    // Show comparison preview
                    this.updateVendorPreview(card.dataset.vendor, true);
                });
                
                card.appendChild(compareBtn);
            }
        });
    }
    
    /**
     * Update vendor preview
     */
    updateVendorPreview(vendor, isComparison = false) {
        const previewContainer = document.getElementById('vendor-preview');
        
        if (!previewContainer || !vendor) return;
        
        // Get vendor data
        let vendorData = {
            name: 'Unknown Vendor',
            description: 'No information available',
            pros: [],
            cons: [],
            marketShare: 0,
            deploymentTime: 0,
            annualCost: 0
        };
        
        // In a real implementation, this would fetch data from a vendor database
        if (window.vendorData && window.vendorData[vendor]) {
            vendorData = window.vendorData[vendor];
        } else {
            // Mock data for demonstration
            const mockVendors = {
                'cisco': {
                    name: 'Cisco ISE',
                    description: 'Enterprise-grade NAC solution with comprehensive features',
                    pros: ['Extensive integration with Cisco ecosystem', 'Robust policy enforcement'],
                    cons: ['Complex deployment', 'High hardware and licensing costs', 'Requires specialized expertise'],
                    marketShare: 28,
                    deploymentTime: 180,
                    annualCost: 320000
                },
                'aruba': {
                    name: 'Aruba ClearPass',
                    description: 'Network access control and policy management platform',
                    pros: ['Strong integration with HPE/Aruba networks', 'Good visibility features'],
                    cons: ['Complex configuration', 'Significant infrastructure requirements'],
                    marketShare: 22,
                    deploymentTime: 120,
                    annualCost: 250000
                },
                'forescout': {
                    name: 'Forescout',
                    description: 'Agentless device visibility and control platform',
                    pros: ['Agentless architecture', 'Strong IoT visibility'],
                    cons: ['High cost', 'Complex deployment', 'Additional modules needed for full functionality'],
                    marketShare: 15,
                    deploymentTime: 90,
                    annualCost: 280000
                },
                'portnox': {
                    name: 'Portnox Cloud',
                    description: 'Cloud-native NAC solution with Zero Trust capabilities',
                    pros: ['Rapid deployment', 'No hardware required', 'Simple administration', 'Lower TCO'],
                    cons: ['Newer in enterprise market'],
                    marketShare: 8,
                    deploymentTime: 30,
                    annualCost: 120000
                },
                'noNac': {
                    name: 'No NAC Solution',
                    description: 'Currently operating without network access control',
                    pros: ['No upfront costs'],
                    cons: ['High security risk', 'No visibility into devices', 'Non-compliant with security frameworks'],
                    marketShare: 0,
                    deploymentTime: 0,
                    annualCost: 0
                }
            };
            
            vendorData = mockVendors[vendor] || vendorData;
        }
        
        // Create preview content
        let previewHTML = '';
        
        if (isComparison) {
            previewHTML = `
                <div class="comparison-preview">
                    <h3>Comparison Preview: ${vendorData.name} vs. Portnox Cloud</h3>
                    <div class="comparison-grid">
                        <div class="comparison-column">
                            <div class="comparison-header">${vendorData.name}</div>
                            <div class="comparison-metrics">
                                <div class="comparison-metric">
                                    <div class="metric-label">Deployment Time</div>
                                    <div class="metric-value">${vendorData.deploymentTime} days</div>
                                </div>
                                <div class="comparison-metric">
                                    <div class="metric-label">Annual Cost (approx)</div>
                                    <div class="metric-value">$${vendorData.annualCost.toLocaleString()}</div>
                                </div>
                                <div class="comparison-metric">
                                    <div class="metric-label">Cloud-Native</div>
                                    <div class="metric-value">${vendor === 'portnox' ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                        </div>
                        <div class="comparison-column highlight">
                            <div class="comparison-header">Portnox Cloud</div>
                            <div class="comparison-metrics">
                                <div class="comparison-metric">
                                    <div class="metric-label">Deployment Time</div>
                                    <div class="metric-value">30 days</div>
                                </div>
                                <div class="comparison-metric">
                                    <div class="metric-label">Annual Cost (approx)</div>
                                    <div class="metric-value">$120,000</div>
                                </div>
                                <div class="comparison-metric">
                                    <div class="metric-label">Cloud-Native</div>
                                    <div class="metric-value">Yes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comparison-summary">
                        <p><strong>Potential Savings:</strong> <span class="highlight-positive">$${(vendorData.annualCost - 120000).toLocaleString()}/year</span></p>
                        <p><strong>Deployment Time Reduction:</strong> <span class="highlight-positive">${vendorData.deploymentTime - 30} days</span></p>
                    </div>
                    <button id="continue-comparison" class="btn btn-primary">Continue with Comparison</button>
                </div>
            `;
            
            // Add event listener after rendering
            setTimeout(() => {
                const continueBtn = document.getElementById('continue-comparison');
                if (continueBtn) {
                    continueBtn.addEventListener('click', () => this.nextStep());
                }
            }, 0);
        } else {
            previewHTML = `
                <div class="vendor-details">
                    <h3>Selected: ${vendorData.name}</h3>
                    <p>${vendorData.description}</p>
                    <div class="vendor-details-grid">
                        <div class="details-column">
                            <h4>Advantages</h4>
                            <ul>
                                ${vendorData.pros.map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="details-column">
                            <h4>Challenges</h4>
                            <ul>
                                ${vendorData.cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="details-column">
                            <h4>Market Info</h4>
                            <div class="details-metric">
                                <span class="metric-label">Market Share</span>
                                <span class="metric-value">${vendorData.marketShare}%</span>
                            </div>
                            <div class="details-metric">
                                <span class="metric-label">Avg. Deployment</span>
                                <span class="metric-value">${vendorData.deploymentTime} days</span>
                            </div>
                            <div class="details-metric">
                                <span class="metric-label">Est. Annual Cost</span>
                                <span class="metric-value">$${vendorData.annualCost.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <button id="compare-with-portnox" class="btn btn-primary">Compare with Portnox</button>
                </div>
            `;
            
            // Add event listener after rendering
            setTimeout(() => {
                const compareBtn = document.getElementById('compare-with-portnox');
                if (compareBtn) {
                    compareBtn.addEventListener('click', () => {
                        this.updateVendorPreview(vendor, true);
                    });
                }
            }, 0);
        }
        
        // Update preview container
        previewContainer.innerHTML = previewHTML;
        previewContainer.style.display = 'block';
    }
    
    /**
     * Initialize industry selector
     */
    initIndustrySelector() {
        const industrySelect = document.getElementById('industry-select');
        const complianceFrameworks = document.getElementById('compliance-frameworks');
        const industryInsights = document.getElementById('industry-insights');
        
        if (!industrySelect) return;
        
        industrySelect.addEventListener('change', () => {
            const selectedIndustry = industrySelect.value;
            
            // Update data model
            this.wizardData.industry = selectedIndustry;
            
            // Update compliance frameworks
            this.updateComplianceFrameworks(selectedIndustry);
            
            // Update industry insights
            this.updateIndustryInsights(selectedIndustry);
        });
    }
    
    /**
     * Update compliance frameworks based on industry
     */
    updateComplianceFrameworks(industry) {
        const complianceFrameworks = document.getElementById('compliance-frameworks');
        
        if (!complianceFrameworks) return;
        
        // Clear existing frameworks
        complianceFrameworks.innerHTML = '';
        
        if (!industry) {
            complianceFrameworks.innerHTML = '<p class="empty-message">Select an industry to see relevant compliance frameworks</p>';
            return;
        }
        
        // Get frameworks for the selected industry
        let frameworks = [];
        
        // In a real implementation, this would fetch data from a compliance database
        if (window.complianceData && window.complianceData[industry]) {
            frameworks = window.complianceData[industry];
        } else {
            // Mock data for demonstration
            const mockFrameworks = {
                'healthcare': [
                    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act', required: true },
                    { id: 'hitech', name: 'HITECH', description: 'Health Information Technology for Economic and Clinical Health Act', required: true },
                    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation (for EU patients)', required: false }
                ],
                'financial': [
                    { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard', required: true },
                    { id: 'sox', name: 'SOX', description: 'Sarbanes-Oxley Act', required: true },
                    { id: 'glba', name: 'GLBA', description: 'Gramm-Leach-Bliley Act', required: true }
                ],
                'education': [
                    { id: 'ferpa', name: 'FERPA', description: 'Family Educational Rights and Privacy Act', required: true },
                    { id: 'coppa', name: 'COPPA', description: 'Children\'s Online Privacy Protection Act', required: false }
                ],
                'government': [
                    { id: 'fisma', name: 'FISMA', description: 'Federal Information Security Modernization Act', required: true },
                    { id: 'fedramp', name: 'FedRAMP', description: 'Federal Risk and Authorization Management Program', required: true }
                ],
                'manufacturing': [
                    { id: 'iso27001', name: 'ISO 27001', description: 'Information Security Management', required: false },
                    { id: 'nist', name: 'NIST CSF', description: 'National Institute of Standards and Technology Cybersecurity Framework', required: false }
                ],
                'retail': [
                    { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard', required: true },
                    { id: 'ccpa', name: 'CCPA', description: 'California Consumer Privacy Act', required: false }
                ],
                'technology': [
                    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation', required: false },
                    { id: 'iso27001', name: 'ISO 27001', description: 'Information Security Management', required: false },
                    { id: 'soc2', name: 'SOC 2', description: 'Service Organization Control 2', required: false }
                ],
                'energy': [
                    { id: 'nerc', name: 'NERC CIP', description: 'North American Electric Reliability Corporation Critical Infrastructure Protection', required: true },
                    { id: 'nist', name: 'NIST CSF', description: 'National Institute of Standards and Technology Cybersecurity Framework', required: false }
                ]
            };
            
            frameworks = mockFrameworks[industry] || [];
        }
        
        // Create framework elements
        if (frameworks.length === 0) {
            complianceFrameworks.innerHTML = '<p class="empty-message">No compliance frameworks found for this industry</p>';
            return;
        }
        
        const frameworksHTML = frameworks.map(framework => `
            <div class="compliance-framework-card">
                <div class="framework-header">
                    <h4>${framework.name}</h4>
                    ${framework.required ? '<span class="badge badge-required">Required</span>' : '<span class="badge badge-recommended">Recommended</span>'}
                </div>
                <p>${framework.description}</p>
                <label class="checkbox-label">
                    <input type="checkbox" data-framework="${framework.id}" ${framework.required ? 'checked disabled' : ''}>
                    <span>Include in analysis</span>
                </label>
            </div>
        `).join('');
        
        complianceFrameworks.innerHTML = `
            <h3>Compliance Frameworks for ${this.getIndustryName(industry)}</h3>
            <div class="compliance-frameworks-grid">
                ${frameworksHTML}
            </div>
        `;
        
        // Attach event listeners to checkboxes
        document.querySelectorAll('[data-framework]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const frameworkId = checkbox.dataset.framework;
                
                if (checkbox.checked) {
                    if (!this.wizardData.compliance.includes(frameworkId)) {
                        this.wizardData.compliance.push(frameworkId);
                    }
                } else {
                    this.wizardData.compliance = this.wizardData.compliance.filter(id => id !== frameworkId);
                }
            });
            
            // Initialize checked state
            if (checkbox.checked) {
                const frameworkId = checkbox.dataset.framework;
                if (!this.wizardData.compliance.includes(frameworkId)) {
                    this.wizardData.compliance.push(frameworkId);
                }
            }
        });
    }
    
    /**
     * Update industry insights
     */
    updateIndustryInsights(industry) {
        const industryInsights = document.getElementById('industry-insights');
        
        if (!industryInsights) return;
        
        // Clear existing insights
        industryInsights.innerHTML = '';
        
        if (!industry) {
            return;
        }
        
        // Get insights for the selected industry
        let insights = [];
        
        // In a real implementation, this would fetch data from an industry insights database
        if (window.industryInsights && window.industryInsights[industry]) {
            insights = window.industryInsights[industry];
        } else {
            // Mock data for demonstration
            const mockInsights = {
                'healthcare': [
                    { title: 'Healthcare Security Trends', content: '68% of healthcare organizations experienced a significant security incident in the past 12 months. NAC solutions are critical for ensuring medical devices are secure and compliant with HIPAA/HITECH.' },
                    { title: 'Medical Device Security', content: 'The average hospital has 10-15 connected devices per bed, many with outdated operating systems. NAC provides visibility and segmentation capabilities to protect these vulnerable devices.' }
                ],
                'financial': [
                    { title: 'Financial Services Threats', content: 'Financial institutions face 300% more cyberattacks than other industries. Zero Trust NAC solutions help prevent unauthorized access and lateral movement within networks.' },
                    { title: 'Regulatory Compliance', content: 'PCI DSS, SOX, and GLBA all require strong access controls and network segmentation. Cloud-based NAC solutions streamline compliance reporting and auditing.' }
                ],
                'education': [
                    { title: 'Education Sector Challenges', content: 'Educational institutions manage diverse device populations with limited security resources. Cloud NAC enables easy management of BYOD policies and security for student/faculty devices.' },
                    { title: 'Student Data Protection', content: 'FERPA compliance requires protecting student data from unauthorized access. NAC helps ensure only authorized devices can access sensitive student information systems.' }
                ]
            };
            
            insights = mockInsights[industry] || [];
        }
        
        // Create insight elements
        if (insights.length === 0) {
            return;
        }
        
        const insightsHTML = insights.map(insight => `
            <div class="industry-insight-card">
                <h4>${insight.title}</h4>
                <p>${insight.content}</p>
            </div>
        `).join('');
        
        industryInsights.innerHTML = `
            <h3>Industry Insights</h3>
            <div class="industry-insights-grid">
                ${insightsHTML}
            </div>
        `;
    }
    
    /**
     * Get industry name from industry code
     */
    getIndustryName(industryCode) {
        const industryNames = {
            'healthcare': 'Healthcare',
            'financial': 'Financial Services',
            'education': 'Education',
            'government': 'Government',
            'manufacturing': 'Manufacturing',
            'retail': 'Retail',
            'technology': 'Technology',
            'energy': 'Energy & Utilities'
        };
        
        return industryNames[industryCode] || industryCode;
    }
    
    /**
     * Initialize organization form
     */
    initOrganizationForm() {
        // Get form elements
        const sizeSelect = document.getElementById('organization-size');
        const deviceCount = document.getElementById('device-count');
        const locationCount = document.getElementById('locations');
        const cloudIntegration = document.getElementById('cloud-integration');
        const legacyDevices = document.getElementById('legacy-devices');
        const byodSupport = document.getElementById('byod-support');
        const yearsSelect = document.getElementById('years-to-project');
        const urgencySelect = document.getElementById('implementation-urgency');
        
        // Attach event listeners
        if (sizeSelect) {
            sizeSelect.addEventListener('change', () => {
                this.wizardData.organization.size = sizeSelect.value;
                
                // Update device count based on size
                if (deviceCount) {
                    switch (sizeSelect.value) {
                        case 'small':
                            deviceCount.value = 500;
                            break;
                        case 'medium':
                            deviceCount.value = 2500;
                            break;
                        case 'large':
                            deviceCount.value = 7500;
                            break;
                        case 'enterprise':
                            deviceCount.value = 15000;
                            break;
                    }
                    
                    // Update data model
                    this.wizardData.organization.devices = parseInt(deviceCount.value);
                }
            });
        }
        
        if (deviceCount) {
            deviceCount.addEventListener('change', () => {
                this.wizardData.organization.devices = parseInt(deviceCount.value);
                
                // Update organization size based on device count
                if (sizeSelect) {
                    const count = parseInt(deviceCount.value);
                    
                    if (count < 1000) {
                        sizeSelect.value = 'small';
                    } else if (count < 5000) {
                        sizeSelect.value = 'medium';
                    } else if (count < 10000) {
                        sizeSelect.value = 'large';
                    } else {
                        sizeSelect.value = 'enterprise';
                    }
                    
                    // Update data model
                    this.wizardData.organization.size = sizeSelect.value;
                }
            });
        }
        
        if (locationCount) {
            locationCount.addEventListener('change', () => {
                this.wizardData.organization.locations = parseInt(locationCount.value);
            });
        }
        
        if (cloudIntegration) {
            cloudIntegration.addEventListener('change', () => {
                this.wizardData.organization.cloudIntegration = cloudIntegration.checked;
            });
        }
        
        if (legacyDevices) {
            legacyDevices.addEventListener('change', () => {
                this.wizardData.organization.legacyDevices = legacyDevices.checked;
            });
        }
        
        if (byodSupport) {
            byodSupport.addEventListener('change', () => {
                this.wizardData.organization.byodSupport = byodSupport.checked;
            });
        }
        
        if (yearsSelect) {
            yearsSelect.addEventListener('change', () => {
                this.wizardData.timeline.years = parseInt(yearsSelect.value);
            });
        }
        
        if (urgencySelect) {
            urgencySelect.addEventListener('change', () => {
                this.wizardData.timeline.urgency = urgencySelect.value;
            });
        }
    }
    
    /**
     * Initialize cost configuration
     */
    initCostConfiguration() {
        // Get tab elements
        const costTabs = document.querySelectorAll('.cost-tab');
        const costPanels = document.querySelectorAll('.cost-panel');
        
        // Attach tab event listeners
        costTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Update active tab
                costTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active panel
                costPanels.forEach(panel => {
                    panel.classList.remove('active');
                    
                    if (panel.id === `${tabName}-costs`) {
                        panel.classList.add('active');
                    }
                });
            });
        });
        
        // Get slider elements
        const sliders = document.querySelectorAll('.slider-group input[type="range"]');
        
        // Attach slider event listeners
        sliders.forEach(slider => {
            const valueDisplay = slider.nextElementSibling;
            
            // Set initial value
            this.updateSliderValue(slider, valueDisplay);
            
            // Listen for changes
            slider.addEventListener('input', () => {
                this.updateSliderValue(slider, valueDisplay);
                this.updateCostModel(slider);
            });
        });
    }
    
    /**
     * Update slider value display
     */
    updateSliderValue(slider, valueDisplay) {
        if (!slider || !valueDisplay) return;
        
        let displayValue = slider.value;
        
        // Format based on slider ID
        switch (slider.id) {
            case 'fte-cost':
            case 'downtime-cost':
            case 'consulting-rate':
            case 'training-per-user':
                displayValue = `$${parseInt(displayValue).toLocaleString()}`;
                break;
            case 'fte-allocation':
            case 'maintenance-percentage':
            case 'portnox-discount':
                displayValue = `${displayValue}%`;
                break;
            case 'implementation-days':
                displayValue = `${displayValue} days`;
                break;
            case 'users-to-train':
                displayValue = `${displayValue} users`;
                break;
            case 'portnox-base-price':
                displayValue = `$${parseFloat(displayValue).toFixed(2)}`;
                break;
        }
        
        valueDisplay.textContent = displayValue;
        
        // Update Portnox pricing summary if relevant
        this.updatePortnoxPricingSummary();
    }
    
    /**
     * Update cost model
     */
    updateCostModel(slider) {
        if (!slider) return;
        
        // Update data model based on slider ID
        switch (slider.id) {
            case 'fte-cost':
                this.wizardData.costs.personnel.fteCost = parseInt(slider.value);
                break;
            case 'fte-allocation':
                this.wizardData.costs.personnel.fteAllocation = parseInt(slider.value);
                break;
            case 'maintenance-percentage':
                this.wizardData.costs.maintenance.percentage = parseInt(slider.value);
                break;
            case 'downtime-cost':
                this.wizardData.costs.maintenance.downtimeCost = parseInt(slider.value);
                break;
            case 'consulting-rate':
                this.wizardData.costs.implementation.consultingRate = parseInt(slider.value);
                break;
            case 'implementation-days':
                this.wizardData.costs.implementation.days = parseInt(slider.value);
                break;
            case 'training-per-user':
                this.wizardData.costs.training.costPerUser = parseInt(slider.value);
                break;
            case 'users-to-train':
                this.wizardData.costs.training.users = parseInt(slider.value);
                break;
            case 'portnox-base-price':
                this.wizardData.costs.portnox.basePrice = parseFloat(slider.value);
                break;
            case 'portnox-discount':
                this.wizardData.costs.portnox.discount = parseInt(slider.value);
                break;
        }
    }
    
    /**
     * Update Portnox pricing summary
     */
    updatePortnoxPricingSummary() {
        const basePrice = document.getElementById('portnox-base-price');
        const discount = document.getElementById('portnox-discount');
        const effectivePrice = document.getElementById('effective-price');
        const annualCost = document.getElementById('annual-cost');
        const deviceCount = document.getElementById('device-count');
        
        if (!basePrice || !discount || !effectivePrice || !annualCost || !deviceCount) return;
        
        const basePriceValue = parseFloat(basePrice.value);
        const discountValue = parseInt(discount.value);
        const deviceCountValue = parseInt(deviceCount.value);
        
        const effectivePriceValue = basePriceValue * (1 - discountValue / 100);
        const annualCostValue = effectivePriceValue * 12 * deviceCountValue;
        
        effectivePrice.textContent = `$${effectivePriceValue.toFixed(2)}`;
        annualCost.textContent = `$${annualCostValue.toLocaleString()}`;
    }
    
    /**
     * Initialize review step
     */
    initReviewStep() {
        // This will be populated dynamically when the user reaches the review step
    }
    
    /**
     * Update review step with current configuration
     */
    updateReviewStep() {
        const currentSolutionReview = document.getElementById('current-solution-review');
        const organizationReview = document.getElementById('organization-review');
        const costReview = document.getElementById('cost-review');
        
        if (!currentSolutionReview || !organizationReview || !costReview) return;
        
        // Get vendor data
        let vendorData = { name: 'Unknown Vendor' };
        
        if (window.vendorData && window.vendorData[this.wizardData.currentVendor]) {
            vendorData = window.vendorData[this.wizardData.currentVendor];
        } else {
            // Mock data for demonstration
            const mockVendors = {
                'cisco': { name: 'Cisco ISE' },
                'aruba': { name: 'Aruba ClearPass' },
                'forescout': { name: 'Forescout' },
                'fortinac': { name: 'FortiNAC' },
                'nps': { name: 'Microsoft NPS' },
                'securew2': { name: 'SecureW2' },
                'juniper': { name: 'Juniper Mist' },
                'foxpass': { name: 'Foxpass' },
                'arista': { name: 'Arista Agni' },
                'portnox': { name: 'Portnox Cloud' },
                'noNac': { name: 'No NAC Solution' }
            };
            
            vendorData = mockVendors[this.wizardData.currentVendor] || vendorData;
        }
        
        // Update current solution review
        currentSolutionReview.innerHTML = `
            <div class="review-item">
                <div class="review-label">Current NAC Solution</div>
                <div class="review-value">${vendorData.name}</div>
            </div>
            ${this.wizardData.compareVendors.length > 0 ? `
                <div class="review-item">
                    <div class="review-label">Comparison</div>
                    <div class="review-value">vs. Portnox Cloud</div>
                </div>
            ` : ''}
            <div class="review-item">
                <div class="review-label">Industry</div>
                <div class="review-value">${this.getIndustryName(this.wizardData.industry)}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Compliance Frameworks</div>
                <div class="review-value">${this.wizardData.compliance.length > 0 ? this.wizardData.compliance.join(', ') : 'None selected'}</div>
            </div>
        `;
        
        // Update organization review
        organizationReview.innerHTML = `
            <div class="review-item">
                <div class="review-label">Organization Size</div>
                <div class="review-value">${this.wizardData.organization.size.charAt(0).toUpperCase() + this.wizardData.organization.size.slice(1)}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Number of Devices</div>
                <div class="review-value">${this.wizardData.organization.devices.toLocaleString()}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Number of Locations</div>
                <div class="review-value">${this.wizardData.organization.locations}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Analysis Period</div>
                <div class="review-value">${this.wizardData.timeline.years} ${this.wizardData.timeline.years === 1 ? 'Year' : 'Years'}</div>
            </div>
            <div class="review-item">
                <div class="review-label">Implementation Urgency</div>
                <div class="review-value">${this.wizardData.timeline.urgency.charAt(0).toUpperCase() + this.wizardData.timeline.urgency.slice(1)}</div>
            </div>
        `;
        
        // Update cost review
        costReview.innerHTML = `
            <div class="review-item">
                <div class="review-label">Average FTE Cost</div>
                <div class="review-value">$${this.wizardData.costs.personnel.fteCost.toLocaleString()}/year</div>
            </div>
            <div class="review-item">
                <div class="review-label">FTE Allocation</div>
                <div class="review-value">${this.wizardData.costs.personnel.fteAllocation}%</div>
            </div>
            <div class="review-item">
                <div class="review-label">Annual Maintenance</div>
                <div class="review-value">${this.wizardData.costs.maintenance.percentage}%</div>
            </div>
            <div class="review-item">
                <div class="review-label">Portnox Base Price</div>
                <div class="review-value">$${this.wizardData.costs.portnox.basePrice.toFixed(2)} per device/month</div>
            </div>
            <div class="review-item">
                <div class="review-label">Volume Discount</div>
                <div class="review-value">${this.wizardData.costs.portnox.discount}%</div>
            </div>
        `;
    }
    
    /**
     * Navigate to the previous step
     */
    prevStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }
    
    /**
     * Navigate to the next step
     */
    nextStep() {
        // Validate current step
        if (!this.validateStep(this.currentStep)) {
            return;
        }
        
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }
    
    /**
     * Go to a specific step
     */
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        // Update current step
        this.currentStep = stepNumber;
        
        // Update UI
        this.updateUI();
        
        // Special actions for specific steps
        if (stepNumber === 5) {
            // Review step
            this.updateReviewStep();
        }
    }
    
    /**
     * Update UI for the current step
     */
    updateUI() {
        // Update wizard steps
        this.steps.forEach(step => {
            const stepNumber = parseInt(step.dataset.step);
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress
        if (this.progressFill) {
            this.progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        }
        
        // Update progress steps
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNumber = parseInt(step.dataset.step);
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
        
        // Update navigation buttons
        if (this.prevButton) {
            this.prevButton.style.display = this.currentStep === 1 ? 'none' : 'block';
        }
        
        if (this.nextButton) {
            this.nextButton.textContent = this.currentStep === this.totalSteps ? 'Calculate' : 'Next';
            this.nextButton.innerHTML = this.currentStep === this.totalSteps ? 'Calculate <i class="fas fa-calculator"></i>' : 'Next <i class="fas fa-chevron-right"></i>';
        }
    }
    
    /**
     * Validate the current step
     */
    validateStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return false;
        
        // Get validator for the current step
        const validator = this.stepValidators[stepNumber];
        
        if (typeof validator === 'function') {
            return validator();
        }
        
        return true;
    }
    
    /**
     * Validate organization step
     */
    validateOrganizationStep() {
        const deviceCount = document.getElementById('device-count');
        const locationCount = document.getElementById('locations');
        
        if (!deviceCount || !locationCount) return true;
        
        // Validate device count
        const deviceCountValue = parseInt(deviceCount.value);
        if (isNaN(deviceCountValue) || deviceCountValue < 100) {
            alert('Please enter a valid number of devices (minimum 100)');
            return false;
        }
        
        // Validate location count
        const locationCountValue = parseInt(locationCount.value);
        if (isNaN(locationCountValue) || locationCountValue < 1) {
            alert('Please enter a valid number of locations (minimum 1)');
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate advanced configuration step
     */
    validateAdvancedConfigStep() {
        // No specific validation needed for this step
        return true;
    }
    
    /**
     * Calculate results
     */
    calculateResults() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        
        // Simulate calculation time
        setTimeout(() => {
            // Hide wizard
            this.wizardContainer.style.display = 'none';
            
            // Show results
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
            }
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Generate results
            this.generateResults();
        }, 2000);
    }
    
    /**
     * Generate results
     */
    generateResults() {
        // This would be implemented to generate the various results and charts
        
        // For demonstration purposes, let's just populate some sample data
        this.populateSampleResults();
    }
    
    /**
     * Populate sample results
     */
    populateSampleResults() {
        // Update executive summary metrics
        document.getElementById('total-savings').textContent = '$450,000';
        document.getElementById('savings-percentage').textContent = '38%';
        document.getElementById('breakeven-point').textContent = '7 months';
        document.getElementById('risk-reduction').textContent = '73%';
        document.getElementById('implementation-time').textContent = '75% faster';
        
        // Update key insights
        const keyInsightsList = document.getElementById('key-insights-list');
        if (keyInsightsList) {
            keyInsightsList.innerHTML = `
                <div class="insight-item">
                    <i class="fas fa-lightbulb highlight-positive"></i>
                    <div class="insight-content">
                        <h4>Cost Efficiency</h4>
                        <p>Switching to Portnox Cloud reduces total cost of ownership by 38% over 3 years, primarily through reduced infrastructure and management costs.</p>
                    </div>
                </div>
                <div class="insight-item">
                    <i class="fas fa-clock highlight-positive"></i>
                    <div class="insight-content">
                        <h4>Rapid Deployment</h4>
                        <p>Portnox Cloud can be deployed in 30 days, compared to 120+ days for on-premises alternatives, enabling faster time-to-value.</p>
                    </div>
                </div>
                <div class="insight-item">
                    <i class="fas fa-shield-alt highlight-positive"></i>
                    <div class="insight-content">
                        <h4>Compliance Advantage</h4>
                        <p>Portnox Cloud provides 95% coverage of required compliance controls, compared to 82% with your current solution.</p>
                    </div>
                </div>
                <div class="insight-item">
                    <i class="fas fa-user-cog highlight-positive"></i>
                    <div class="insight-content">
                        <h4>Reduced Management Overhead</h4>
                        <p>FTE allocation for NAC management can be reduced by 65%, freeing up IT resources for other strategic initiatives.</p>
                    </div>
                </div>
            `;
        }
        
        // Call chart generation functions (these would be defined elsewhere)
        if (typeof window.generateTCOCharts === 'function') {
            window.generateTCOCharts(this.wizardData);
        }
        
        if (typeof window.generateImplementationCharts === 'function') {
            window.generateImplementationCharts(this.wizardData);
        }
        
        if (typeof window.generateFeatureCharts === 'function') {
            window.generateFeatureCharts(this.wizardData);
        }
        
        if (typeof window.generateComplianceCharts === 'function') {
            window.generateComplianceCharts(this.wizardData);
        }
        
        if (typeof window.generateROICharts === 'function') {
            window.generateROICharts(this.wizardData);
        }
        
        if (typeof window.generateRiskCharts === 'function') {
            window.generateRiskCharts(this.wizardData);
        }
    }
    
    /**
     * Reset wizard
     */
    resetWizard() {
        // Hide results
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.add('hidden');
        }
        
        // Show wizard
        this.wizardContainer.style.display = 'block';
        
        // Reset to first step
        this.goToStep(1);
        
        // Reset data model (keeping some user preferences)
        this.wizardData.currentVendor = null;
        this.wizardData.compareVendors = [];
        this.wizardData.industry = '';
        this.wizardData.compliance = [];
        
        // Reset vendor selection
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset vendor preview
        const vendorPreview = document.getElementById('vendor-preview');
        if (vendorPreview) {
            vendorPreview.innerHTML = '';
            vendorPreview.style.display = 'none';
        }
        
        // Reset industry selection
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.value = '';
        }
        
        // Reset compliance frameworks
        const complianceFrameworks = document.getElementById('compliance-frameworks');
        if (complianceFrameworks) {
            complianceFrameworks.innerHTML = '<p class="empty-message">Select an industry to see relevant compliance frameworks</p>';
        }
        
        // Reset industry insights
        const industryInsights = document.getElementById('industry-insights');
        if (industryInsights) {
            industryInsights.innerHTML = '';
        }
    }
}

// Initialize the wizard controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wizardManager = new TCOWizardController();
});
EOL

# Create improved vendor data file
echo -e "${YELLOW}Creating vendor data file...${NC}"
cat > "js/data/vendors/vendors-data.js" << 'EOL'
/**
 * Vendor Data for TCO Multi-Vendor Analyzer
 * Contains information about each vendor's products, costs, features, and other attributes
 */

// Initialize vendors data object
window.vendorData = {
    'cisco': {
        name: 'Cisco ISE',
        fullName: 'Cisco Identity Services Engine',
        description: 'Enterprise-grade NAC solution with comprehensive features for wired and wireless networks',
        website: 'https://www.cisco.com/c/en/us/products/security/identity-services-engine/index.html',
        pros: [
            'Extensive integration with Cisco ecosystem',
            'Robust policy enforcement',
            'Strong guest management',
            'Comprehensive visibility capabilities',
            'Wide industry adoption and support'
        ],
        cons: [
            'Complex deployment and management',
            'High hardware and licensing costs',
            'Requires specialized expertise',
            'Resource-intensive infrastructure',
            'Complex upgrade processes'
        ],
        marketShare: 28,
        deploymentTime: {
            small: 90,
            medium: 120,
            large: 180,
            enterprise: 240
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 85,    // <1000 devices
            licenseMedium: 75,   // 1000-5000 devices
            licenseLarge: 65,    // 5000-10000 devices
            licenseEnterprise: 55, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 35000,    // Small deployment
            hardwareMedium: 80000,   // Medium deployment
            hardwareLarge: 150000,   // Large deployment
            hardwareEnterprise: 300000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 45,
                medium: 90,
                large: 120,
                enterprise: 180
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 20,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 30,
                medium: 50,
                large: 100,
                enterprise: 200
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 70,
            'Guest Management': 95,
            'BYOD Support': 90,
            'IoT Security': 85,
            'Agentless': false,
            'Multi-factor Authentication': 90,
            'Posture Assessment': 95,
            'Third-party Integrations': 90,
            'API Support': 80,
            'Remote Work Support': 70,
            'Scalability': 85,
            'Ease of Deployment': 60,
            'Ease of Management': 65
        },
        compliance: {
            'HIPAA': 85,
            'PCI DSS': 90,
            'GDPR': 80,
            'NIST 800-53': 85,
            'ISO 27001': 85,
            'FISMA': 85,
            'SOX': 80,
            'HITECH': 80,
            'FERPA': 80,
            'GLBA': 85
        },
        risks: {
            'Deployment Failure': 30,
            'Budget Overrun': 40,
            'Staff Expertise': 45,
            'Scalability Issues': 20,
            'Vendor Lock-in': 50,
            'Security Gaps': 15,
            'Compliance Gaps': 15,
            'Update Complexity': 40
        }
    },
    'aruba': {
        name: 'Aruba ClearPass',
        fullName: 'Aruba ClearPass Policy Manager',
        description: 'Network access control and policy management platform for secure enterprise networks',
        website: 'https://www.arubanetworks.com/products/security/network-access-control/',
        pros: [
            'Strong integration with HPE/Aruba networks',
            'Good visibility features',
            'Advanced profiling capabilities',
            'Flexible deployment options',
            'Context-aware policies'
        ],
        cons: [
            'Complex configuration',
            'Significant infrastructure requirements',
            'High licensing costs for advanced features',
            'Requires dedicated admin resources',
            'Performance issues at scale'
        ],
        marketShare: 22,
        deploymentTime: {
            small: 60,
            medium: 90,
            large: 120,
            enterprise: 180
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 75,    // <1000 devices
            licenseMedium: 65,   // 1000-5000 devices
            licenseLarge: 55,    // 5000-10000 devices
            licenseEnterprise: 50, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 30000,    // Small deployment
            hardwareMedium: 70000,   // Medium deployment
            hardwareLarge: 130000,   // Large deployment
            hardwareEnterprise: 250000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 30,
                medium: 60,
                large: 90,
                enterprise: 120
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 18,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 25,
                medium: 40,
                large: 80,
                enterprise: 160
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 75,
            'Guest Management': 90,
            'BYOD Support': 85,
            'IoT Security': 80,
            'Agentless': false,
            'Multi-factor Authentication': 85,
            'Posture Assessment': 85,
            'Third-party Integrations': 80,
            'API Support': 75,
            'Remote Work Support': 75,
            'Scalability': 80,
            'Ease of Deployment': 65,
            'Ease of Management': 70
        },
        compliance: {
            'HIPAA': 80,
            'PCI DSS': 85,
            'GDPR': 80,
            'NIST 800-53': 80,
            'ISO 27001': 85,
            'FISMA': 80,
            'SOX': 75,
            'HITECH': 75,
            'FERPA': 75,
            'GLBA': 80
        },
        risks: {
            'Deployment Failure': 25,
            'Budget Overrun': 35,
            'Staff Expertise': 40,
            'Scalability Issues': 25,
            'Vendor Lock-in': 40,
            'Security Gaps': 20,
            'Compliance Gaps': 20,
            'Update Complexity': 35
        }
    },
    'forescout': {
        name: 'Forescout',
        fullName: 'Forescout Platform',
        description: 'Agentless device visibility and control platform for network security',
        website: 'https://www.forescout.com/platform/',
        pros: [
            'Agentless architecture',
            'Strong IoT visibility',
            'Detailed device profiling',
            'Real-time monitoring',
            'Automated responses'
        ],
        cons: [
            'High cost',
            'Complex deployment',
            'Additional modules needed for full functionality',
            'Resource intensive',
            'Steep learning curve'
        ],
        marketShare: 15,
        deploymentTime: {
            small: 45,
            medium: 75,
            large: 120,
            enterprise: 150
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 80,    // <1000 devices
            licenseMedium: 70,   // 1000-5000 devices
            licenseLarge: 60,    // 5000-10000 devices
            licenseEnterprise: 55, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 40000,    // Small deployment
            hardwareMedium: 85000,   // Medium deployment
            hardwareLarge: 140000,   // Large deployment
            hardwareEnterprise: 270000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 30,
                medium: 60,
                large: 90,
                enterprise: 120
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 20,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 25,
                medium: 50,
                large: 75,
                enterprise: 150
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 75,
            'Guest Management': 75,
            'BYOD Support': 80,
            'IoT Security': 95,
            'Agentless': true,
            'Multi-factor Authentication': 70,
            'Posture Assessment': 85,
            'Third-party Integrations': 85,
            'API Support': 80,
            'Remote Work Support': 70,
            'Scalability': 75,
            'Ease of Deployment': 65,
            'Ease of Management': 70
        },
        compliance: {
            'HIPAA': 85,
            'PCI DSS': 85,
            'GDPR': 80,
            'NIST 800-53': 85,
            'ISO 27001': 80,
            'FISMA': 85,
            'SOX': 80,
            'HITECH': 80,
            'FERPA': 75,
            'GLBA': 80
        },
        risks: {
            'Deployment Failure': 25,
            'Budget Overrun': 40,
            'Staff Expertise': 35,
            'Scalability Issues': 30,
            'Vendor Lock-in': 35,
            'Security Gaps': 15,
            'Compliance Gaps': 15,
            'Update Complexity': 30
        }
    },
    'fortinac': {
        name: 'FortiNAC',
        fullName: 'Fortinet Network Access Control',
        description: 'Network access control solution integrated with Fortinet Security Fabric',
        website: 'https://www.fortinet.com/products/network-access-control',
        pros: [
            'Integration with Fortinet ecosystem',
            'IoT discovery and profiling',
            'Automated response capabilities',
            'Scalable architecture',
            'Good value relative to other solutions'
        ],
        cons: [
            'Limited features outside Fortinet ecosystem',
            'Less mature than some competitors',
            'Configuration complexity',
            'Limited third-party integrations',
            'UI could be improved'
        ],
        marketShare: 8,
        deploymentTime: {
            small: 45,
            medium: 60,
            large: 90,
            enterprise: 120
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 65,    // <1000 devices
            licenseMedium: 55,   // 1000-5000 devices
            licenseLarge: 50,    // 5000-10000 devices
            licenseEnterprise: 45, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 25000,    // Small deployment
            hardwareMedium: 60000,   // Medium deployment
            hardwareLarge: 120000,   // Large deployment
            hardwareEnterprise: 200000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 30,
                medium: 45,
                large: 75,
                enterprise: 120
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 18,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 20,
                medium: 40,
                large: 75,
                enterprise: 120
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 70,
            'Guest Management': 75,
            'BYOD Support': 75,
            'IoT Security': 85,
            'Agentless': false,
            'Multi-factor Authentication': 75,
            'Posture Assessment': 80,
            'Third-party Integrations': 70,
            'API Support': 75,
            'Remote Work Support': 70,
            'Scalability': 80,
            'Ease of Deployment': 70,
            'Ease of Management': 75
        },
        compliance: {
            'HIPAA': 75,
            'PCI DSS': 80,
            'GDPR': 75,
            'NIST 800-53': 80,
            'ISO 27001': 75,
            'FISMA': 75,
            'SOX': 70,
            'HITECH': 70,
            'FERPA': 75,
            'GLBA': 75
        },
        risks: {
            'Deployment Failure': 25,
            'Budget Overrun': 30,
            'Staff Expertise': 35,
            'Scalability Issues': 20,
            'Vendor Lock-in': 45,
            'Security Gaps': 25,
            'Compliance Gaps': 25,
            'Update Complexity': 30
        }
    },
    'nps': {
        name: 'Microsoft NPS',
        fullName: 'Microsoft Network Policy Server',
        description: 'Windows Server role providing RADIUS server and Network Access Protection',
        website: 'https://docs.microsoft.com/en-us/windows-server/networking/technologies/nps/nps-top',
        pros: [
            'Included with Windows Server',
            'Integrates with Active Directory',
            'Minimal additional licensing costs',
            'Familiar to Windows administrators',
            'Basic NAC functionality'
        ],
        cons: [
            'Limited features compared to dedicated NAC',
            'Requires Windows Server infrastructure',
            'Basic guest access capabilities',
            'Limited device profiling',
            'Minimal automation capabilities'
        ],
        marketShare: 15,
        deploymentTime: {
            small: 30,
            medium: 45,
            large: 60,
            enterprise: 90
        },
        costs: {
            // Base cost per device per year (Windows CAL costs allocated to NAC)
            licenseSmall: 10,    // <1000 devices
            licenseMedium: 8,    // 1000-5000 devices
            licenseLarge: 6,     // 5000-10000 devices
            licenseEnterprise: 5, // 10000+ devices
            
            // Hardware costs (Windows Servers needed)
            hardwareSmall: 15000,    // Small deployment
            hardwareMedium: 30000,   // Medium deployment
            hardwareLarge: 60000,    // Large deployment
            hardwareEnterprise: 120000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 15,
                medium: 30,
                large: 45,
                enterprise: 60
            },
            
            // Maintenance costs (% of total infrastructure cost)
            maintenancePercentage: 15,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 15,
                medium: 25,
                large: 50,
                enterprise: 100
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 50,
            'Guest Management': 60,
            'BYOD Support': 60,
            'IoT Security': 40,
            'Agentless': false,
            'Multi-factor Authentication': 70,
            'Posture Assessment': 60,
            'Third-party Integrations': 60,
            'API Support': 50,
            'Remote Work Support': 50,
            'Scalability': 65,
            'Ease of Deployment': 70,
            'Ease of Management': 65
        },
        compliance: {
            'HIPAA': 65,
            'PCI DSS': 70,
            'GDPR': 65,
            'NIST 800-53': 70,
            'ISO 27001': 65,
            'FISMA': 70,
            'SOX': 65,
            'HITECH': 60,
            'FERPA': 70,
            'GLBA': 65
        },
        risks: {
            'Deployment Failure': 15,
            'Budget Overrun': 20,
            'Staff Expertise': 25,
            'Scalability Issues': 35,
            'Vendor Lock-in': 40,
            'Security Gaps': 40,
            'Compliance Gaps': 35,
            'Update Complexity': 25
        }
    },
    'securew2': {
        name: 'SecureW2',
        fullName: 'SecureW2 JoinNow',
        description: 'Cloud RADIUS and certificate-based authentication solution',
        website: 'https://www.securew2.com/',
        pros: [
            'Cloud-based architecture',
            'Certificate-based authentication',
            'Good BYOD onboarding',
            'No hardware requirements',
            'Simplified management'
        ],
        cons: [
            'More limited feature set than full NAC',
            'Primarily focused on authentication',
            'Limited device visibility',
            'Basic enforcement capabilities',
            'Limited integration options'
        ],
        marketShare: 4,
        deploymentTime: {
            small: 15,
            medium: 25,
            large: 40,
            enterprise: 60
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 40,    // <1000 devices
            licenseMedium: 35,   // 1000-5000 devices
            licenseLarge: 30,    // 5000-10000 devices
            licenseEnterprise: 28, // 10000+ devices
            
            // Hardware costs (No hardware required)
            hardwareSmall: 0,    // Small deployment
            hardwareMedium: 0,   // Medium deployment
            hardwareLarge: 0,    // Large deployment
            hardwareEnterprise: 0, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 10,
                medium: 20,
                large: 30,
                enterprise: 45
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 15,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 10,
                medium: 20,
                large: 35,
                enterprise: 60
            }
        },
        features: {
            'Cloud Native': true,
            'Zero Trust': 65,
            'Guest Management': 70,
            'BYOD Support': 85,
            'IoT Security': 60,
            'Agentless': true,
            'Multi-factor Authentication': 80,
            'Posture Assessment': 60,
            'Third-party Integrations': 70,
            'API Support': 75,
            'Remote Work Support': 80,
            'Scalability': 85,
            'Ease of Deployment': 85,
            'Ease of Management': 80
        },
        compliance: {
            'HIPAA': 75,
            'PCI DSS': 75,
            'GDPR': 70,
            'NIST 800-53': 70,
            'ISO 27001': 70,
            'FISMA': 70,
            'SOX': 65,
            'HITECH': 70,
            'FERPA': 75,
            'GLBA': 70
        },
        risks: {
            'Deployment Failure': 15,
            'Budget Overrun': 15,
            'Staff Expertise': 20,
            'Scalability Issues': 15,
            'Vendor Lock-in': 25,
            'Security Gaps': 30,
            'Compliance Gaps': 30,
            'Update Complexity': 15
        }
    },
    'juniper': {
        name: 'Juniper Mist',
        fullName: 'Juniper Mist Cloud NAC',
        description: 'AI-Driven Access Assurance with cloud-based NAC capabilities',
        website: 'https://www.juniper.net/us/en/products/cloud-services/mist-access-assurance.html',
        pros: [
            'AI-driven operations',
            'Cloud-based management',
            'Strong wireless focus',
            'Simplified operations',
            'Modern user interface'
        ],
        cons: [
            'Newer NAC offering',
            'Better for wireless than wired',
            'More limited feature set than established NAC',
            'Focused on Juniper infrastructure',
            'Developing ecosystem'
        ],
        marketShare: 3,
        deploymentTime: {
            small: 20,
            medium: 30,
            large: 50,
            enterprise: 75
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 45,    // <1000 devices
            licenseMedium: 40,   // 1000-5000 devices
            licenseLarge: 35,    // 5000-10000 devices
            licenseEnterprise: 30, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 5000,     // Small deployment
            hardwareMedium: 15000,   // Medium deployment
            hardwareLarge: 30000,    // Large deployment
            hardwareEnterprise: 60000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 15,
                medium: 25,
                large: 40,
                enterprise: 60
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 15,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 15,
                medium: 25,
                large: 40,
                enterprise: 75
            }
        },
        features: {
            'Cloud Native': true,
            'Zero Trust': 75,
            'Guest Management': 85,
            'BYOD Support': 85,
            'IoT Security': 70,
            'Agentless': true,
            'Multi-factor Authentication': 80,
            'Posture Assessment': 70,
            'Third-party Integrations': 70,
            'API Support': 80,
            'Remote Work Support': 80,
            'Scalability': 85,
            'Ease of Deployment': 80,
            'Ease of Management': 85
        },
        compliance: {
            'HIPAA': 75,
            'PCI DSS': 80,
            'GDPR': 75,
            'NIST 800-53': 75,
            'ISO 27001': 75,
            'FISMA': 75,
            'SOX': 70,
            'HITECH': 70,
            'FERPA': 75,
            'GLBA': 75
        },
        risks: {
            'Deployment Failure': 20,
            'Budget Overrun': 25,
            'Staff Expertise': 25,
            'Scalability Issues': 20,
            'Vendor Lock-in': 35,
            'Security Gaps': 25,
            'Compliance Gaps': 25,
            'Update Complexity': 20
        }
    },
    'foxpass': {
        name: 'Foxpass',
        fullName: 'Foxpass Cloud RADIUS',
        description: 'Cloud-based RADIUS and LDAP authentication platform',
        website: 'https://www.foxpass.com/',
        pros: [
            'Cloud-based architecture',
            'Simple deployment',
            'Affordable pricing',
            'Easy user management',
            'Good for smaller organizations'
        ],
        cons: [
            'Limited NAC features',
            'Basic device visibility',
            'Limited compliance capabilities',
            'Minimal posture checking',
            'Fewer advanced security features'
        ],
        marketShare: 1,
        deploymentTime: {
            small: 10,
            medium: 20,
            large: 30,
            enterprise: 45
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 30,    // <1000 devices
            licenseMedium: 25,   // 1000-5000 devices
            licenseLarge: 22,    // 5000-10000 devices
            licenseEnterprise: 20, // 10000+ devices
            
            // Hardware costs (No hardware required)
            hardwareSmall: 0,    // Small deployment
            hardwareMedium: 0,   // Medium deployment
            hardwareLarge: 0,    // Large deployment
            hardwareEnterprise: 0, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 5,
                medium: 15,
                large: 25,
                enterprise: 40
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 15,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 10,
                medium: 15,
                large: 25,
                enterprise: 50
            }
        },
        features: {
            'Cloud Native': true,
            'Zero Trust': 60,
            'Guest Management': 70,
            'BYOD Support': 75,
            'IoT Security': 50,
            'Agentless': true,
            'Multi-factor Authentication': 75,
            'Posture Assessment': 50,
            'Third-party Integrations': 65,
            'API Support': 70,
            'Remote Work Support': 70,
            'Scalability': 75,
            'Ease of Deployment': 90,
            'Ease of Management': 85
        },
        compliance: {
            'HIPAA': 65,
            'PCI DSS': 70,
            'GDPR': 65,
            'NIST 800-53': 60,
            'ISO 27001': 65,
            'FISMA': 60,
            'SOX': 60,
            'HITECH': 60,
            'FERPA': 65,
            'GLBA': 65
        },
        risks: {
            'Deployment Failure': 10,
            'Budget Overrun': 15,
            'Staff Expertise': 15,
            'Scalability Issues': 25,
            'Vendor Lock-in': 20,
            'Security Gaps': 35,
            'Compliance Gaps': 35,
            'Update Complexity': 15
        }
    },
    'arista': {
        name: 'Arista NAC',
        fullName: 'Arista Networks NAC (formerly Awake Security)',
        description: 'Network access control integrated with Arista networking',
        website: 'https://www.arista.com/en/products/network-detection-and-response',
        pros: [
            'Strong integration with Arista infrastructure',
            'Advanced threat detection',
            'AI and ML capabilities',
            'Detailed network visibility',
            'Good for large enterprises'
        ],
        cons: [
            'Newer NAC offering',
            'Complex deployment',
            'Requires significant expertise',
            'Higher costs',
            'Best with Arista infrastructure'
        ],
        marketShare: 2,
        deploymentTime: {
            small: 30,
            medium: 45,
            large: 75,
            enterprise: 120
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 70,    // <1000 devices
            licenseMedium: 60,   // 1000-5000 devices
            licenseLarge: 55,    // 5000-10000 devices
            licenseEnterprise: 50, // 10000+ devices
            
            // Hardware costs (min requirements)
            hardwareSmall: 30000,    // Small deployment
            hardwareMedium: 60000,   // Medium deployment
            hardwareLarge: 120000,   // Large deployment
            hardwareEnterprise: 240000, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 30,
                medium: 45,
                large: 75,
                enterprise: 120
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 18,
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 25,
                medium: 40,
                large: 75,
                enterprise: 150
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 75,
            'Guest Management': 70,
            'BYOD Support': 75,
            'IoT Security': 85,
            'Agentless': false,
            'Multi-factor Authentication': 80,
            'Posture Assessment': 85,
            'Third-party Integrations': 75,
            'API Support': 80,
            'Remote Work Support': 70,
            'Scalability': 85,
            'Ease of Deployment': 65,
            'Ease of Management': 70
        },
        compliance: {
            'HIPAA': 80,
            'PCI DSS': 85,
            'GDPR': 80,
            'NIST 800-53': 85,
            'ISO 27001': 80,
            'FISMA': 85,
            'SOX': 80,
            'HITECH': 75,
            'FERPA': 75,
            'GLBA': 80
        },
        risks: {
            'Deployment Failure': 30,
            'Budget Overrun': 35,
            'Staff Expertise': 40,
            'Scalability Issues': 20,
            'Vendor Lock-in': 45,
            'Security Gaps': 15,
            'Compliance Gaps': 15,
            'Update Complexity': 30
        }
    },
    'portnox': {
        name: 'Portnox Cloud',
        fullName: 'Portnox Cloud NAC-as-a-Service',
        description: 'Cloud-native NAC solution with Zero Trust capabilities',
        website: 'https://www.portnox.com/',
        pros: [
            'True cloud-native architecture',
            'No hardware required',
            'Rapid deployment',
            'Simple administration',
            'Lower TCO',
            'Continuous compliance',
            'Modern zero-trust approach'
        ],
        cons: [
            'Newer in enterprise market',
            'Fewer enterprise references',
            'May need additional security tools for full coverage',
            'Building partner ecosystem'
        ],
        marketShare: 8,
        deploymentTime: {
            small: 15,
            medium: 21,
            large: 30,
            enterprise: 45
        },
        costs: {
            // Base cost per device per year
            licenseSmall: 48,    // <1000 devices
            licenseMedium: 42,   // 1000-5000 devices
            licenseLarge: 36,    // 5000-10000 devices
            licenseEnterprise: 30, // 10000+ devices
            
            // Hardware costs (No hardware required)
            hardwareSmall: 0,    // Small deployment
            hardwareMedium: 0,   // Medium deployment
            hardwareLarge: 0,    // Large deployment
            hardwareEnterprise: 0, // Enterprise deployment
            
            // Implementation costs (averaged)
            implementationDays: {
                small: 10,
                medium: 15,
                large: 25,
                enterprise: 40
            },
            
            // Maintenance costs (% of total license cost)
            maintenancePercentage: 0, // Included in subscription
            
            // Personnel requirements (FTE %)
            personnelFTE: {
                small: 10,
                medium: 15,
                large: 25,
                enterprise: 40
            }
        },
        features: {
            'Cloud Native': true,
            'Zero Trust': 95,
            'Guest Management': 90,
            'BYOD Support': 95,
            'IoT Security': 85,
            'Agentless': true,
            'Multi-factor Authentication': 95,
            'Posture Assessment': 90,
            'Third-party Integrations': 85,
            'API Support': 90,
            'Remote Work Support': 95,
            'Scalability': 95,
            'Ease of Deployment': 95,
            'Ease of Management': 95
        },
        compliance: {
            'HIPAA': 90,
            'PCI DSS': 90,
            'GDPR': 90,
            'NIST 800-53': 90,
            'ISO 27001': 90,
            'FISMA': 90,
            'SOX': 85,
            'HITECH': 90,
            'FERPA': 90,
            'GLBA': 90
        },
        risks: {
            'Deployment Failure': 10,
            'Budget Overrun': 10,
            'Staff Expertise': 15,
            'Scalability Issues': 10,
            'Vendor Lock-in': 15,
            'Security Gaps': 15,
            'Compliance Gaps': 10,
            'Update Complexity': 10
        }
    },
    'noNac': {
        name: 'No NAC Solution',
        fullName: 'No Network Access Control',
        description: 'Currently operating without network access control',
        website: '',
        pros: [
            'No upfront costs',
            'No deployment effort',
            'No additional systems to manage',
            'No vendor lock-in'
        ],
        cons: [
            'High security risk',
            'No visibility into devices',
            'No enforcement of security policies',
            'Non-compliant with security frameworks',
            'Difficult to manage guest access',
            'Increased vulnerability to attacks',
            'Difficult to enforce zero trust principles'
        ],
        marketShare: 0,
        deploymentTime: {
            small: 0,
            medium: 0,
            large: 0,
            enterprise: 0
        },
        costs: {
            // License costs
            licenseSmall: 0,
            licenseMedium: 0,
            licenseLarge: 0,
            licenseEnterprise: 0,
            
            // Hardware costs
            hardwareSmall: 0,
            hardwareMedium: 0,
            hardwareLarge: 0,
            hardwareEnterprise: 0,
            
            // Implementation costs
            implementationDays: {
                small: 0,
                medium: 0,
                large: 0,
                enterprise: 0
            },
            
            // Maintenance costs
            maintenancePercentage: 0,
            
            // Personnel requirements (estimates for manual management)
            personnelFTE: {
                small: 5,
                medium: 10,
                large: 20,
                enterprise: 40
            }
        },
        features: {
            'Cloud Native': false,
            'Zero Trust': 0,
            'Guest Management': 0,
            'BYOD Support': 0,
            'IoT Security': 0,
            'Agentless': true,
            'Multi-factor Authentication': 0,
            'Posture Assessment': 0,
            'Third-party Integrations': 0,
            'API Support': 0,
            'Remote Work Support': 0,
            'Scalability': 0,
            'Ease of Deployment': 100,
            'Ease of Management': 0
        },
        compliance: {
            'HIPAA': 0,
            'PCI DSS': 0,
            'GDPR': 0,
            'NIST 800-53': 0,
            'ISO 27001': 0,
            'FISMA': 0,
            'SOX': 0,
            'HITECH': 0,
            'FERPA': 0,
            'GLBA': 0
        },
        risks: {
            'Deployment Failure': 0,
            'Budget Overrun': 0,
            'Staff Expertise': 0,
            'Scalability Issues': 0,
            'Vendor Lock-in': 0,
            'Security Gaps': 100,
            'Compliance Gaps': 100,
            'Update Complexity': 0
        }
    }
};

// Create a TCO calculator function that can be used by the wizard
window.calculateTCO = function(vendor, config) {
    if (!vendor || !window.vendorData[vendor]) {
        return null;
    }
    
    const vendorData = window.vendorData[vendor];
    const { organization, timeline, costs } = config;
    
    // Determine organization size category
    let sizeCategory;
    const deviceCount = organization.devices;
    
    if (deviceCount < 1000) {
        sizeCategory = 'small';
    } else if (deviceCount < 5000) {
        sizeCategory = 'medium';
    } else if (deviceCount < 10000) {
        sizeCategory = 'large';
    } else {
        sizeCategory = 'enterprise';
    }
    
    // Calculate license costs
    let licenseKey = 'license' + sizeCategory.charAt(0).toUpperCase() + sizeCategory.slice(1);
    let licensePerDevice = vendorData.costs[licenseKey];
    let licenseCost = licensePerDevice * deviceCount * timeline.years;
    
    // Calculate hardware costs
    let hardwareKey = 'hardware' + sizeCategory.charAt(0).toUpperCase() + sizeCategory.slice(1);
    let hardwareCost = vendorData.costs[hardwareKey];
    
    // Calculate implementation costs
    let implementationDays = vendorData.costs.implementationDays[sizeCategory];
    let implementationCost = implementationDays * costs.implementation.consultingRate;
    
    // Calculate maintenance costs
    let maintenanceCost = licenseCost * (vendorData.costs.maintenancePercentage / 100) * timeline.years;
    
    // Calculate personnel costs
    let ftePercentage = vendorData.costs.personnelFTE[sizeCategory] / 100;
    let personnelCost = ftePercentage * costs.personnel.fteCost * timeline.years;
    
    // Calculate training costs
    let trainingCost = costs.training.costPerUser * costs.training.users;
    
    // Calculate total costs
    let totalCost = licenseCost + hardwareCost + implementationCost + maintenanceCost + personnelCost + trainingCost;
    
    // For Portnox, apply the custom calculation for cloud subscription
    if (vendor === 'portnox') {
        // Override license calculation for Portnox
        const basePrice = costs.portnox.basePrice;
        const discount = costs.portnox.discount / 100;
        const effectivePrice = basePrice * (1 - discount);
        licenseCost = effectivePrice * 12 * deviceCount * timeline.years;
        maintenanceCost = 0; // Maintenance included in subscription
        
        // Recalculate total
        totalCost = licenseCost + implementationCost + personnelCost + trainingCost;
    }
    
    // Return detailed cost breakdown
    return {
        licenseCost,
        hardwareCost,
        implementationCost,
        maintenanceCost,
        personnelCost,
        trainingCost,
        totalCost,
        annualCost: totalCost / timeline.years
    };
};
EOL

# Update index.html with wizard structure
echo -e "${YELLOW}Updating index.html with multi-vendor wizard structure...${NC}"

# Create a temporary file with the updated wizard HTML structure
cat > "wizard_structure.html" << 'EOL'
                <!-- Step 1: Vendor Selection -->
                <div class="wizard-step active" id="step-1" data-step="1">
                    <div class="step-header">
                        <h2>Select Your Current NAC Solution</h2>
                        <p>Choose your existing NAC vendor or select "No NAC" if you don't have a solution in place</p>
                    </div>
                    
                    <div class="vendor-grid">
                        <div class="vendor-card animate-card" data-vendor="cisco">
                            <div class="vendor-logo">
                                <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                            </div>
                            <div class="vendor-info">
                                <h3>Cisco ISE</h3>
                                <p>Enterprise NAC solution</p>
                            </div>
                            <div class="vendor-badge">
                                <span class="badge-market-leader">Market Leader</span>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="aruba">
                            <div class="vendor-logo">
                                <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                            </div>
                            <div class="vendor-info">
                                <h3>Aruba ClearPass</h3>
                                <p>Policy management platform</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="forescout">
                            <div class="vendor-logo">
                                <img src="img/vendors/forescout-logo.png" alt="Forescout">
                            </div>
                            <div class="vendor-info">
                                <h3>Forescout</h3>
                                <p>Agentless device visibility</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="fortinac">
                            <div class="vendor-logo">
                                <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                            </div>
                            <div class="vendor-info">
                                <h3>FortiNAC</h3>
                                <p>Fortinet NAC solution</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="nps">
                            <div class="vendor-logo">
                                <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                            </div>
                            <div class="vendor-info">
                                <h3>Microsoft NPS</h3>
                                <p>Windows Server NAC</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="securew2">
                            <div class="vendor-logo">
                                <img src="img/vendors/securew2-logo.png" alt="SecureW2">
                            </div>
                            <div class="vendor-info">
                                <h3>SecureW2</h3>
                                <p>Cloud RADIUS solution</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="juniper">
                            <div class="vendor-logo">
                                <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                            </div>
                            <div class="vendor-info">
                                <h3>Juniper Mist</h3>
                                <p>AI-Driven Access Assurance</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="foxpass">
                            <div class="vendor-logo">
                                <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                            </div>
                            <div class="vendor-info">
                                <h3>Foxpass</h3>
                                <p>Cloud RADIUS & LDAP</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="arista">
                            <div class="vendor-logo">
                                <img src="img/vendors/arista-logo.png" alt="Arista NAC">
                            </div>
                            <div class="vendor-info">
                                <h3>Arista NAC</h3>
                                <p>Network Access Control</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card portnox" data-vendor="portnox">
                            <div class="vendor-logo">
                                <img src="img/vendors/portnox-logo.png" alt="Portnox Cloud">
                            </div>
                            <div class="vendor-info">
                                <h3>Portnox Cloud</h3>
                                <p>Zero Trust Cloud NAC</p>
                            </div>
                            <div class="vendor-badge">
                                <span class="badge-recommended">Recommended</span>
                            </div>
                        </div>
                        
                        <div class="vendor-card no-nac animate-card" data-vendor="noNac">
                            <div class="vendor-logo">
                                <i class="fas fa-shield-virus fa-3x"></i>
                            </div>
                            <div class="vendor-info">
                                <h3>No NAC Solution</h3>
                                <p>Currently unprotected</p>
                            </div>
                            <div class="vendor-badge">
                                <span class="badge-warning">High Risk</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vendor-comparison-preview" id="vendor-preview">
                        <!-- Preview content will be populated dynamically -->
                    </div>
                    
                    <div class="wizard-navigation">
                        <button id="prev-step" class="btn btn-outline" style="display: none;"><i class="fas fa-chevron-left"></i> Previous</button>
                        <button id="next-step" class="btn btn-primary">Next <i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
EOL

# Replace the old step-1 content with the new one
sed -i.bak "/<div class=\"wizard-step active\" id=\"step-1\" data-step=\"1\">/,/<\/div>.*<\!-- Step 2: Industry & Compliance -->/c\\$(cat wizard_structure.html)" index.html

# Remove the temporary file
rm wizard_structure.html

# Update the script references
sed -i.bak 's|<script src="js/wizards/standalone/wizard-controller.js"></script>|<script src="js/wizards/multi-vendor/wizard-controller.js"></script>|g' index.html

echo -e "${YELLOW}Creating wizard navigation JS...${NC}"
cat > "js/components/wizard/wizard-navigation.js" << 'EOL'
/**
 * Wizard Navigation Component
 * Handles navigation between wizard steps with proper validation
 */
class WizardNavigation {
    constructor(wizardContainer, progressSelector, navigationSelector) {
        this.wizardContainer = document.querySelector(wizardContainer || '.wizard-container');
        this.progressBar = document.querySelector(progressSelector || '.progress-fill');
        this.prevButton = document.querySelector(`${navigationSelector || '.wizard-navigation'} .btn-outline`);
        this.nextButton = document.querySelector(`${navigationSelector || '.wizard-navigation'} .btn-primary`);
        
        this.steps = Array.from(this.wizardContainer.querySelectorAll('.wizard-step'));
        this.currentStep = 1;
        this.totalSteps = this.steps.length;
        
        this.init();
    }
    
    init() {
        if (!this.wizardContainer || !this.progressBar || !this.prevButton || !this.nextButton) {
            console.error('Wizard navigation elements not found');
            return;
        }
        
        // Attach event listeners
        this.prevButton.addEventListener('click', () => this.goToPrevStep());
        this.nextButton.addEventListener('click', () => this.goToNextStep());
        
        // Initialize the navigation
        this.updateNavigation();
    }
    
    goToPrevStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }
    
    goToNextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        } else if (this.validateCurrentStep() && this.currentStep === this.totalSteps) {
            this.finishWizard();
        }
    }
    
    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        // Update step visibility
        this.steps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress
        const progress = (stepNumber / this.totalSteps) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Update progress steps if they exist
        const progressSteps = document.querySelectorAll('.progress-step');
        if (progressSteps.length > 0) {
            progressSteps.forEach((step, index) => {
                const stepNum = index + 1;
                step.classList.remove('active', 'completed');
                
                if (stepNum === stepNumber) {
                    step.classList.add('active');
                } else if (stepNum < stepNumber) {
                    step.classList.add('completed');
                }
            });
        }
        
        // Update current step
        this.currentStep = stepNumber;
        
        // Update navigation buttons
        this.updateNavigation();
        
        // Scroll to top of wizard
        this.wizardContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Trigger event for step change
        const stepChangeEvent = new CustomEvent('wizard-step-change', {
            detail: { step: stepNumber }
        });
        document.dispatchEvent(stepChangeEvent);
    }
    
    updateNavigation() {
        // Update previous button visibility
        this.prevButton.style.display = this.currentStep === 1 ? 'none' : 'flex';
        
        // Update next button text
        if (this.currentStep === this.totalSteps) {
            this.nextButton.innerHTML = 'Calculate <i class="fas fa-calculator"></i>';
        } else {
            this.nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }
    
    validateCurrentStep() {
        // This would be overridden by the wizard controller
        // Here we just return true for base functionality
        
        // Trigger validation event
        const validationEvent = new CustomEvent('wizard-validate-step', {
            detail: { step: this.currentStep }
        });
        document.dispatchEvent(validationEvent);
        
        // By default, allow proceeding
        return true;
    }
    
    finishWizard() {
        // This would be implemented by the wizard controller
        // Trigger finish event
        const finishEvent = new CustomEvent('wizard-finish');
        document.dispatchEvent(finishEvent);
    }
}

// Export the class
window.WizardNavigation = WizardNavigation;
EOL

echo -e "${GREEN}Wizard update completed successfully!${NC}"
