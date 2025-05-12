/**
 * Final Patch - Ensures all components are properly initialized
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
                TCOWizard.init();
                console.log("TCO Wizard initialized");
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
        
        console.log("Event listeners initialized");
    }
    
    // Function to update summary metrics in the Executive Summary
    function updateSummaryMetrics() {
        console.log("Updating summary metrics...");
        
        // Get selected vendor from wizard
        const vendorCards = document.querySelectorAll('.vendor-card');
        let selectedVendor = 'cisco'; // Default
        
        vendorCards.forEach(card => {
            if (card.classList.contains('active')) {
                selectedVendor = card.getAttribute('data-vendor');
            }
        });
        
        // Get device count
        const deviceCount = parseInt(document.getElementById('device-count').value) || 2500;
        
        // Calculate metrics based on selected vendor using TCO calculator
        if (window.tcoCalculator) {
            // Get params
            const params = {
                deviceCount: deviceCount,
                years: parseInt(document.getElementById('years-to-project').value) || 3,
                organizationSize: document.getElementById('organization-size').value || 'medium',
                industry: document.getElementById('industry-select').value || 'technology',
                locations: parseInt(document.getElementById('locations').value) || 1,
                cloudIntegration: document.getElementById('cloud-integration').checked,
                legacyDevices: document.getElementById('legacy-devices').checked,
                byod: document.getElementById('byod-support').checked,
                selectedVendor: selectedVendor,
                fteCost: parseFloat(document.getElementById('fte-cost').value) || 120000,
                discountPercentage: parseFloat(document.getElementById('portnox-discount').value) || 0
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
            'noNac': 70  // Highest reduction when moving from no NAC
        };
        
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
        return Math.min(95, Math.round(baseReduction[vendor] * scaleFactor));
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
            // Sample compliance frameworks data
            const frameworks = [
                { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
                { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
                { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation' },
                { id: 'nist', name: 'NIST CSF', description: 'NIST Cybersecurity Framework' },
                { id: 'cmmc', name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' }
            ];
            
            // Sample compliance coverage data
            const complianceCoverage = {
                cisco: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'full' },
                aruba: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'partial' },
                forescout: { hipaa: 'full', pci: 'full', gdpr: 'partial', nist: 'full', cmmc: 'partial' },
                fortinac: { hipaa: 'partial', pci: 'full', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                nps: { hipaa: 'partial', pci: 'partial', gdpr: 'none', nist: 'partial', cmmc: 'none' },
                securew2: { hipaa: 'partial', pci: 'partial', gdpr: 'partial', nist: 'partial', cmmc: 'partial' },
                portnox: { hipaa: 'full', pci: 'full', gdpr: 'full', nist: 'full', cmmc: 'full' }
            };
            
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
                                <div class="tooltip-content">${framework.description}</div>
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
            // Sample industry requirements data
            const industryRequirements = {
                healthcare: [
                    { title: 'Device Identification', description: 'Healthcare facilities require robust medical device identification to maintain inventory for compliance with safety and regulatory requirements.' },
                    { title: 'PHI Protection', description: 'HIPAA-compliant segmentation of networks handling Protected Health Information (PHI) must be implemented.' },
                    { title: 'Legacy Device Support', description: 'Support for legacy medical devices and operating systems is essential as equipment often has 10+ year lifecycles.' }
                ],
                financial: [
                    { title: 'Transaction Security', description: 'Financial institutions must isolate transaction processing systems from general network traffic.' },
                    { title: 'Audit Trail', description: 'Detailed audit trails of all access events for compliance with financial regulations and forensic analysis.' },
                    { title: 'Multi-Factor Authentication', description: 'Strong authentication for all access to financial systems and customer data.' }
                ],
                government: [
                    { title: 'Classification Compliance', description: 'Network segmentation based on data classification levels per government security standards.' },
                    { title: 'FIPS Compliance', description: 'Federal Information Processing Standards (FIPS) validated cryptographic modules for authentication.' },
                    { title: 'Continuous Monitoring', description: 'Real-time monitoring and alert mechanisms for suspicious activities.' }
                ],
                retail: [
                    { title: 'POS Protection', description: 'Point-of-Sale systems must be isolated from general network traffic and the internet.' },
                    { title: 'PCI Compliance', description: 'Payment Card Industry Data Security Standard (PCI DSS) compliant network segmentation.' },
                    { title: 'Customer WiFi', description: 'Secure guest wireless access that cannot reach internal systems.' }
                ],
                manufacturing: [
                    { title: 'OT/IT Convergence', description: 'Secure integration between operational technology networks and information technology systems.' },
                    { title: 'Industrial Device Support', description: 'Support for industrial protocols and legacy automation equipment.' },
                    { title: 'Production Continuity', description: 'Zero-impact authentication that won\'t disrupt production processes.' }
                ],
                technology: [
                    { title: 'Dev Environment Protection', description: 'Secure isolation of development, testing, and production environments.' },
                    { title: 'API Security', description: 'Security controls for system-to-system API access and data exchange.' },
                    { title: 'BYOD Support', description: 'Secure support for employee personal devices without compromising corporate data.' }
                ],
                education: [
                    { title: 'Open Access Balance', description: 'Balance between academic freedom and network security with flexible access policies.' },
                    { title: 'BYOD Management', description: 'Support for diverse student and faculty devices across campus.' },
                    { title: 'Research Network Protection', description: 'Isolation of research networks from general academic and administrative systems.' }
                ],
                energy: [
                    { title: 'Critical Infrastructure Protection', description: 'Specialized protection for energy delivery systems and SCADA networks.' },
                    { title: 'Regulatory Compliance', description: 'Compliance with energy sector regulations including NERC CIP requirements.' },
                    { title: 'Legacy System Support', description: 'Support for industrial control systems with long operational lifecycles.' }
                ]
            };
            
            // Get selected industry from wizard
            const industrySelect = document.getElementById('industry-select');
            const selectedIndustry = industrySelect ? industrySelect.value : 'technology';
            
            // Create industry requirements HTML
            let requirementsHTML = '';
            
            if (industryRequirements[selectedIndustry]) {
                industryRequirements[selectedIndustry].forEach(req => {
                    requirementsHTML += `
                        <div class="industry-requirement-card">
                            <h4>${req.title}</h4>
                            <p>${req.description}</p>
                        </div>
                    `;
                });
            } else {
                requirementsHTML = '<p>No specific requirements found for the selected industry.</p>';
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
