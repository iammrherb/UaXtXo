/**
 * Final Patch - Ensures all components are properly initialized and integrated
 * This is the final initialization step for the application
 */
console.log("Final Patch: Starting application patches...");

(function() {
    // Function to initialize all components
    function initializeAllComponents() {
        console.log("Initializing all components...");
        
        // Initialize chart manager
        if (window.chartManager) {
            window.chartManager.initializeCharts();
        } else {
            console.warn("Chart manager not found, charts may not be properly initialized");
        }
        
        // Initialize wizard
        if (typeof TCOWizard !== 'undefined') {
            if (typeof TCOWizard.init === 'function') {
                // Check if wizard is already initialized
                if (!document.querySelector('.wizard-overlay')) {
                    TCOWizard.init();
                    console.log("TCO Wizard initialized");
                } else {
                    console.log("TCO Wizard already initialized");
                }
            } else {
                console.warn("TCOWizard.init is not a function");
            }
        } else {
            console.warn("TCOWizard not found, wizard may not be properly initialized");
        }
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Initialize industry compliance panel
        initializeIndustryCompliancePanel();
        
        // Update summary metrics if on results page
        if (!document.getElementById('results-container').classList.contains('hidden')) {
            updateSummaryMetrics();
        }
        
        console.log("All components initialized");
    }
    
    // Function to initialize event listeners
    function initializeEventListeners() {
        console.log("Initializing event listeners...");
        
        // Wizard button
        const openWizardBtn = document.getElementById('open-wizard-btn');
        if (openWizardBtn) {
            // Remove existing event listeners by cloning and replacing
            const newWizardBtn = openWizardBtn.cloneNode(true);
            openWizardBtn.parentNode.replaceChild(newWizardBtn, openWizardBtn);
            
            // Add event listener
            newWizardBtn.addEventListener('click', function() {
                if (typeof TCOWizard !== 'undefined' && typeof TCOWizard.openWizard === 'function') {
                    TCOWizard.openWizard();
                } else {
                    console.warn("TCOWizard.openWizard is not a function");
                }
            });
        }
        
        // TCO Wizard button in header
        const tcoWizardBtn = document.querySelector('button.btn[title="TCO Wizard"]');
        if (tcoWizardBtn) {
            // Remove existing event listeners by cloning and replacing
            const newTcoWizardBtn = tcoWizardBtn.cloneNode(true);
            tcoWizardBtn.parentNode.replaceChild(newTcoWizardBtn, tcoWizardBtn);
            
            // Add event listener
            newTcoWizardBtn.addEventListener('click', function() {
                if (typeof TCOWizard !== 'undefined' && typeof TCOWizard.openWizard === 'function') {
                    TCOWizard.openWizard();
                } else {
                    console.warn("TCOWizard.openWizard is not a function");
                }
            });
        }
        
        // Result tabs
        const resultTabs = document.querySelectorAll('.result-tab');
        resultTabs.forEach(tab => {
            // Remove existing event listeners by cloning and replacing
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            // Add event listener
            newTab.addEventListener('click', function() {
                // Remove active class from all tabs
                resultTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab panels
                const panels = document.querySelectorAll('.result-panel');
                panels.forEach(panel => panel.classList.remove('active'));
                
                // Show the corresponding panel
                const panelId = this.getAttribute('data-tab') + '-panel';
                const panel = document.getElementById(panelId);
                if (panel) {
                    panel.classList.add('active');
                }
                
                // Reinitialize charts if needed
                if (window.chartManager) {
                    window.chartManager.initializeCharts();
                }
            });
        });
        
        // New calculation button
        const newCalculationBtn = document.getElementById('new-calculation');
        if (newCalculationBtn) {
            // Remove existing event listeners by cloning and replacing
            const newCalcBtn = newCalculationBtn.cloneNode(true);
            newCalculationBtn.parentNode.replaceChild(newCalcBtn, newCalculationBtn);
            
            // Add event listener
            newCalcBtn.addEventListener('click', function() {
                // Hide results container
                const resultsContainer = document.getElementById('results-container');
                if (resultsContainer) {
                    resultsContainer.classList.add('hidden');
                }
                
                // Show wizard container
                const wizardContainer = document.getElementById('wizard-container');
                if (wizardContainer) {
                    wizardContainer.classList.remove('hidden');
                }
                
                // Reset wizard to first step
                if (typeof TCOWizard !== 'undefined' && typeof TCOWizard.goToStep === 'function') {
                    TCOWizard.goToStep(1);
                }
            });
        }
        
        // Calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            // Remove existing event listeners by cloning and replacing
            const newCalcBtn = calculateBtn.cloneNode(true);
            calculateBtn.parentNode.replaceChild(newCalcBtn, calculateBtn);
            
            // Add event listener
            newCalcBtn.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.add('active');
                }
                
                // Simulate calculation process
                setTimeout(function() {
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.classList.remove('active');
                    }
                    
                    // Hide wizard container
                    const wizardContainer = document.getElementById('wizard-container');
                    if (wizardContainer) {
                        wizardContainer.classList.add('hidden');
                    }
                    
                    // Show results container
                    const resultsContainer = document.getElementById('results-container');
                    if (resultsContainer) {
                        resultsContainer.classList.remove('hidden');
                    }
                    
                    // Reinitialize charts
                    if (window.chartManager) {
                        window.chartManager.initializeCharts();
                    }
                    
                    // Update summary metrics
                    updateSummaryMetrics();
                }, 1500);
            });
        }
        
        // Show TCO Results button at the bottom
        const showResultsBtn = document.getElementById('calculate-btn');
        if (showResultsBtn) {
            // Remove existing event listeners by cloning and replacing
            const newShowResultsBtn = showResultsBtn.cloneNode(true);
            showResultsBtn.parentNode.replaceChild(newShowResultsBtn, showResultsBtn);
            
            // Add event listener
            newShowResultsBtn.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.add('active');
                }
                
                // Simulate calculation process
                setTimeout(function() {
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.classList.remove('active');
                    }
                    
                    // Hide wizard container
                    const wizardContainer = document.getElementById('wizard-container');
                    if (wizardContainer) {
                        wizardContainer.classList.add('hidden');
                    }
                    
                    // Show results container
                    const resultsContainer = document.getElementById('results-container');
                    if (resultsContainer) {
                        resultsContainer.classList.remove('hidden');
                    }
                    
                    // Reinitialize charts
                    if (window.chartManager) {
                        window.chartManager.initializeCharts();
                    }
                    
                    // Update summary metrics
                    updateSummaryMetrics();
                }, 1500);
            });
        }
        
        // Vendor cards in wizard step 1
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            // Remove existing event listeners by cloning and replacing
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add event listener
            newCard.addEventListener('click', function() {
                // Remove active class from all cards
                vendorCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                
                // Update vendor preview
                updateVendorPreview(this.getAttribute('data-vendor'));
            });
        });
        
        console.log("Event listeners initialized");
    }
    
    // Function to update vendor preview
    function updateVendorPreview(vendorId) {
        // Get vendor information
        const EnhancedVendors = window.EnhancedVendors || {};
        const vendor = EnhancedVendors.getVendor ? EnhancedVendors.getVendor(vendorId) : null;
        
        // Get preview container
        const previewContainer = document.getElementById('vendor-preview');
        if (!previewContainer || !vendor) return;
        
        // Create preview content
        let previewHTML = `
            <div class="vendor-details">
                <h3>${vendor.name}</h3>
                <p>${vendor.description}</p>
                <div class="vendor-specs">
                    <div class="spec-item">
                        <div class="spec-label">Deployment Type</div>
                        <div class="spec-value">${vendor.type}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Implementation Time</div>
                        <div class="spec-value">${vendor.deploymentTime}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Implementation Complexity</div>
                        <div class="spec-value">${vendor.complexity}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Update preview container
        previewContainer.innerHTML = previewHTML;
        previewContainer.classList.remove('hidden');
    }
    
    // Function to update summary metrics in the Executive Summary
    function updateSummaryMetrics() {
        console.log("Updating summary metrics...");
        
        // Get selected vendor from wizard
        const vendorCards = document.querySelectorAll('.vendor-card');
        let selectedVendor = 'cisco'; // Default
        
        vendorCards.forEach(card => {
            if (card.classList.contains('active')) {
                selectedVendor = card.getAttribute('data-vendor') || 'cisco';
            }
        });
        
        // Get device count
        const deviceCount = parseInt(document.getElementById('device-count')?.value) || 2500;
        
        // Calculate metrics based on selected vendor using TCO calculator
        if (window.tcoCalculator) {
            // Get params
            const params = {
                selectedVendor,
                deviceCount,
                years: parseInt(document.getElementById('years-to-project')?.value) || 3,
                organizationSize: document.getElementById('organization-size')?.value || 'medium',
                industry: document.getElementById('industry-select')?.value || 'technology',
                locations: parseInt(document.getElementById('locations')?.value) || 1,
                cloudIntegration: document.getElementById('cloud-integration')?.checked || false,
                legacyDevices: document.getElementById('legacy-devices')?.checked || false,
                byod: document.getElementById('byod-support')?.checked || false,
                fteCost: parseFloat(document.getElementById('fte-cost')?.value) || 120000,
                discountPercentage: parseFloat(document.getElementById('portnox-discount')?.value) || 0
            };
            
            // Calculate comparison
            const comparison = window.tcoCalculator.calculateComparison(params);
            const roi = comparison.roi;
            
            // Update summary metrics
            document.getElementById('total-savings').textContent = '$' + Math.round(roi.totalSavings).toLocaleString();
            document.getElementById('savings-percentage').textContent = Math.round(roi.savingsPercentage) + '% lower TCO';
            document.getElementById('breakeven-point').textContent = roi.breakEvenMonths + ' months';
            document.getElementById('implementation-time').textContent = roi.implementationAdvantage + ' days faster';
            
            // Calculate risk reduction percentage based on device count and vendor
            const riskReduction = calculateRiskReduction(selectedVendor, deviceCount);
            document.getElementById('risk-reduction').textContent = riskReduction + '%';
            
            // Generate insights
            const insights = window.tcoCalculator.generateInsights(comparison);
            
            // Update insights list
            const insightsList = document.getElementById('key-insights-list');
            if (insightsList) {
                let insightsHTML = '';
                
                insights.forEach(insight => {
                    insightsHTML += `
                        <div class="insight-card">
                            <div class="insight-icon">
                                <i class="fas fa-${insight.icon}"></i>
                            </div>
                            <div class="insight-content">
                                <h4>${insight.title}</h4>
                                <p>${insight.description}</p>
                            </div>
                        </div>
                    `;
                });
                
                insightsList.innerHTML = insightsHTML;
            }
        } else {
            console.warn("TCO calculator not found, using default metrics");
            
            // Default metrics
            document.getElementById('total-savings').textContent = '$470,000';
            document.getElementById('savings-percentage').textContent = '72% lower TCO';
            document.getElementById('breakeven-point').textContent = '4 months';
            document.getElementById('implementation-time').textContent = '137 days faster';
            document.getElementById('risk-reduction').textContent = '65%';
        }
        
        console.log("Summary metrics updated");
    }
    
    // Function to calculate risk reduction percentage
    function calculateRiskReduction(vendor, deviceCount) {
        // Base risk reduction by vendor
        const baseReduction = {
            'cisco': 60,
            'aruba': 58,
            'forescout': 62,
            'fortinac': 55,
            'nps': 30,
            'securew2': 45,
            'noNac': 70,  // Highest reduction when moving from no NAC
            'juniper': 56,
            'arista': 54,
            'foxpass': 42,
            'portnox': 65
        };
        
        // Default to cisco if vendor not found
        const vendorReduction = baseReduction[vendor] || baseReduction['cisco'];
        
        // Scale factor based on device count
        let scaleFactor = 1.0;
        
        if (deviceCount <= 500) {
            scaleFactor = 0.9;
        } else if (deviceCount <= 2000) {
            scaleFactor = 1.0;
        } else if (deviceCount <= 5000) {
            scaleFactor = 1.1;
        } else {
            scaleFactor = 1.2;
        }
        
        // Calculate risk reduction
        return Math.min(95, Math.round(vendorReduction * scaleFactor));
    }
    
    // Function to initialize industry compliance panel
    function initializeIndustryCompliancePanel() {
        console.log("Initializing industry compliance panel...");
        
        const industryPanel = document.getElementById('industry-panel');
        if (!industryPanel) {
            console.warn("Industry panel not found");
            return;
        }
        
        // Initialize compliance matrix
        const complianceMatrixContainer = document.getElementById('compliance-matrix-container');
        if (complianceMatrixContainer) {
            // Get Enhanced Vendors for compliance data
            const EnhancedVendors = window.EnhancedVendors || {};
            const ComplianceFrameworks = window.ComplianceFrameworks || {};
            
            // Sample compliance frameworks data if not available
            const frameworks = ComplianceFrameworks.getAllFrameworks 
                ? ComplianceFrameworks.getAllFrameworks() 
                : [
                    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
                    { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
                    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation' },
                    { id: 'nist', name: 'NIST CSF', description: 'NIST Cybersecurity Framework' },
                    { id: 'cmmc', name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' }
                ];
            
            // Sample compliance coverage data if not available
            const complianceCoverage = {
                cisco: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'full' },
                aruba: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'partial' },
                forescout: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'partial' },
                fortinac: { hipaa: 'partial', pci: 'full', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                nps: { hipaa: 'partial', pci: 'partial', gdpr: 'none', nist: 'partial', cmmc: 'none' },
                securew2: { hipaa: 'partial', pci: 'partial', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                juniper: { hipaa: 'partial', pci: 'partial', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                arista: { hipaa: 'partial', pci: 'partial', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                foxpass: { hipaa: 'partial', pci: 'partial', gdpr: 'partial', nist: 'partial', cmmc: 'none' },
                portnox: { hipaa: 'full', pci: 'full', gdpr: 'full', nist: 'full', cmmc: 'full' }
            };
            
            // If ComplianceFrameworks available, use its data
            if (ComplianceFrameworks.frameworks) {
                frameworks.forEach(fw => {
                    const frameworkId = fw.id;
                    
                    Object.keys(complianceCoverage).forEach(vendorId => {
                        const vendorSupport = ComplianceFrameworks.frameworks[frameworkId]?.vendorSupport?.[vendorId];
                        if (vendorSupport) {
                            complianceCoverage[vendorId][frameworkId] = vendorSupport;
                        }
                    });
                });
            }
            
            // Create compliance matrix table
            let complianceTableHTML = `
                <table class="compliance-matrix-table">
                    <thead>
                        <tr>
                            <th>Compliance Framework</th>
                            <th>Cisco ISE</th>
                            <th>Aruba ClearPass</th>
                            <th>Forescout</th>
                            <th>FortiNAC</th>
                            <th>Portnox Cloud</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            frameworks.forEach(framework => {
                complianceTableHTML += `
                    <tr>
                        <td>
                            <div class="tooltip-modern">
                                ${framework.name}
                                <div class="tooltip-content">${framework.description || framework.fullName || ''}</div>
                            </div>
                        </td>
                `;
                
                // Add coverage for each vendor
                ['cisco', 'aruba', 'forescout', 'fortinac', 'portnox'].forEach(vendor => {
                    const coverage = complianceCoverage[vendor][framework.id] || 'none';
                    let label = '';
                    
                    if (coverage === 'full') {
                        label = 'Full Support';
                    } else if (coverage === 'partial') {
                        label = 'Partial Support';
                    } else {
                        label = 'Limited Support';
                    }
                    
                    complianceTableHTML += `
                        <td class="compliance-${coverage}">${label}</td>
                    `;
                });
                
                complianceTableHTML += '</tr>';
            });
            
            complianceTableHTML += `
                    </tbody>
                </table>
            `;
            
            complianceMatrixContainer.innerHTML = complianceTableHTML;
        }
        
        // Initialize industry requirements
        const industryRequirementsContainer = document.getElementById('industry-requirements-container');
        if (industryRequirementsContainer) {
            // Get industry data
            const IndustryData = window.IndustryData || {};
            
            // Get selected industry from wizard
            const industrySelect = document.getElementById('industry-select');
            const selectedIndustry = industrySelect ? industrySelect.value : 'technology';
            
            // Get industry requirements
            const industryInfo = IndustryData.getIndustry ? IndustryData.getIndustry(selectedIndustry) : null;
            
            // Create industry requirements HTML
            let requirementsHTML = '';
            
            if (industryInfo && industryInfo.keyRequirements) {
                industryInfo.keyRequirements.forEach(req => {
                    requirementsHTML += `
                        <div class="industry-requirement-card">
                            <h4>${req}</h4>
                        </div>
                    `;
                });
            } else {
                // Sample requirements as fallback
                const sampleRequirements = {
                    healthcare: [
                        'Medical device identification and security',
                        'PHI protection and HIPAA compliance',
                        'Legacy device support for medical equipment',
                        'Segmentation between clinical and guest networks',
                        'Real-time access for emergency scenarios'
                    ],
                    financial: [
                        'Transaction processing system isolation',
                        'Detailed audit trails for compliance',
                        'Multi-factor authentication for all access',
                        'Branch office integration and management',
                        'Third-party access controls'
                    ],
                    technology: [
                        'Developer environment protection',
                        'API and system-to-system security',
                        'BYOD and remote work support',
                        'Cloud resource access control',
                        'Intellectual property protection'
                    ],
                    government: [
                        'Classification-based network segmentation',
                        'FIPS-validated cryptographic modules',
                        'Continuous monitoring and audit trails',
                        'Public access management',
                        'Integration with government identity systems'
                    ],
                    retail: [
                        'POS system isolation and protection',
                        'PCI DSS compliance for payment processing',
                        'Guest WiFi segmentation',
                        'IoT device management (cameras, sensors)',
                        'Multi-location management'
                    ]
                };
                
                const requirements = sampleRequirements[selectedIndustry] || sampleRequirements.technology;
                
                requirements.forEach(req => {
                    requirementsHTML += `
                        <div class="industry-requirement-card">
                            <h4>${req}</h4>
                        </div>
                    `;
                });
            }
            
            industryRequirementsContainer.innerHTML = requirementsHTML;
        }
        
        console.log("Industry compliance panel initialized");
    }
    
    // Initialize components when document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllComponents);
    } else {
        initializeAllComponents();
    }
    
    console.log("Final Patch: Application patches applied successfully");
})();
