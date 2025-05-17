/**
 * Industry & Compliance Framework Component
 * Replaces the sidebar section with a comprehensive tab-based approach
 */

class IndustryFrameworks {
    constructor() {
        this.industryData = window.INDUSTRY_COMPLIANCE || {};
        this.riskProfiles = window.RISK_PROFILES || {};
        this.insuranceOptions = window.INSURANCE_OPTIONS || {};
        this.selectedIndustry = '';
        this.selectedCompliance = [];
        this.selectedRiskProfile = 'standard';
        this.selectedInsurance = 'standard';
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Find the existing industry-config card in the sidebar
        const sidebarCard = document.getElementById('industry-config');
        if (!sidebarCard) {
            console.error('Could not find industry-config card in sidebar');
            return;
        }
        
        // Store the current values if already set
        this.saveCurrentValues();
        
        // Get a reference to the container for the compliance panel
        const securityView = document.querySelector('.view-panel[data-view="security"]');
        if (!securityView) {
            console.error('Could not find security view panel');
            return;
        }
        
        // Create new industry & compliance tab panel
        this.createCompliancePanel(securityView);
        
        // Update the sidebar card to be more basic (since full functionality is in the panel)
        this.updateSidebarCard(sidebarCard);
        
        // Add event listeners for the new panel and sidebar
        this.attachEventListeners();
    }
    
    saveCurrentValues() {
        // Save current industry selection if any
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect && industrySelect.value) {
            this.selectedIndustry = industrySelect.value;
        }
        
        // Save compliance checkboxes
        const complianceChecks = document.querySelectorAll('.compliance-item input[type="checkbox"]:checked');
        this.selectedCompliance = Array.from(complianceChecks).map(check => check.id.replace('compliance-', ''));
        
        // Save risk profile
        const riskProfile = document.getElementById('risk-profile');
        if (riskProfile && riskProfile.value) {
            this.selectedRiskProfile = riskProfile.value;
        }
        
        // Save insurance selection
        const insurance = document.getElementById('cybersecurity-insurance');
        if (insurance && insurance.value) {
            this.selectedInsurance = insurance.value;
        }
    }
    
    createCompliancePanel(container) {
        // Check if compliance panel tab already exists
        let complianceTab = container.querySelector('.results-tab[data-panel="security-compliance"]');
        if (!complianceTab) {
            console.error('Could not find compliance tab in security view');
            return;
        }
        
        // Create compliance panel content if it doesn't exist
        let compliancePanel = document.getElementById('security-compliance');
        if (!compliancePanel) {
            compliancePanel = document.createElement('div');
            compliancePanel.id = 'security-compliance';
            compliancePanel.className = 'results-panel';
            container.appendChild(compliancePanel);
        }
        
        // Create comprehensive compliance content
        compliancePanel.innerHTML = `
            <div class="panel-header">
                <h2>Compliance Requirements</h2>
                <p class="subtitle">Industry-specific frameworks and regulatory requirements</p>
            </div>
            
            <div class="compliance-controls">
                <div class="form-group">
                    <label for="panel-industry-select" class="form-label">Industry</label>
                    <select id="panel-industry-select" class="form-select">
                        <option value="">Choose an industry...</option>
                        ${Object.keys(this.industryData).map(key => `
                            <option value="${key}" ${this.selectedIndustry === key ? 'selected' : ''}>
                                ${this.industryData[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Primary Compliance Frameworks</label>
                    <div id="primary-frameworks" class="compliance-grid">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Additional Compliance Frameworks</label>
                    <div id="additional-frameworks" class="compliance-grid">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="panel-risk-profile" class="form-label">Risk Profile</label>
                    <select id="panel-risk-profile" class="form-select">
                        ${Object.keys(this.riskProfiles).map(key => `
                            <option value="${key}" ${this.selectedRiskProfile === key ? 'selected' : ''}>
                                ${this.riskProfiles[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="panel-cybersecurity-insurance" class="form-label">Cybersecurity Insurance</label>
                    <select id="panel-cybersecurity-insurance" class="form-select">
                        ${Object.keys(this.insuranceOptions).map(key => `
                            <option value="${key}" ${this.selectedInsurance === key ? 'selected' : ''}>
                                ${this.insuranceOptions[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="dashboard-grid grid-4">
                <div class="dashboard-card highlight-card">
                    <h3>Compliance Level</h3>
                    <div class="metric-value highlight-value" id="compliance-level">95%</div>
                    <div class="metric-label">Framework coverage</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Regulatory Status</h3>
                    <div class="metric-value" id="regulatory-status">Compliant</div>
                    <div class="metric-label">With selected frameworks</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Risk Mitigation</h3>
                    <div class="metric-value" id="risk-mitigation">Significant</div>
                    <div class="metric-label">Based on current profile</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Insurance Impact</h3>
                    <div class="metric-value" id="insurance-impact">-15%</div>
                    <div class="metric-label">Premium reduction potential</div>
                </div>
            </div>

            <div class="chart-container">
                <h3>Specific Requirements</h3>
                <div id="specific-requirements" class="requirements-container">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Framework Coverage by Vendor</h3>
                <div class="chart-wrapper">
                    <canvas id="framework-coverage-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Non-Compliance Consequences</h3>
                <div id="non-compliance-container" class="non-compliance-container">
                    <!-- Will be populated by JavaScript -->
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Recommended Vendor Matrix</h3>
                <div class="table-responsive">
                    <table class="data-table" id="compliance-vendor-table">
                        <thead>
                            <tr>
                                <th>Vendor</th>
                                <th>Suitability</th>
                                <th>Key Strengths</th>
                                <th>Framework Coverage</th>
                                <th>Implementation Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        // Ensure this panel is visible if the compliance tab is active
        if (complianceTab.classList.contains('active')) {
            compliancePanel.classList.add('active');
        }
        
        // Update the compliance panel with initial data
        this.updateCompliancePanel();
    }
    
    updateSidebarCard(sidebarCard) {
        // Simplify the sidebar card while maintaining basic functionality
        const cardContent = sidebarCard.querySelector('.config-card-content');
        if (cardContent) {
            cardContent.innerHTML = `
                <div class="form-group">
                    <label for="industry-select" class="form-label">Industry</label>
                    <select id="industry-select" class="form-select">
                        <option value="">Choose an industry...</option>
                        ${Object.keys(this.industryData).map(key => `
                            <option value="${key}" ${this.selectedIndustry === key ? 'selected' : ''}>
                                ${this.industryData[key].name}
                            </option>
                        `).join('')}
                    </select>
                    <div class="helper-text">Full compliance details available in Security tab</div>
                </div>
                
                <div class="form-group">
                    <label for="risk-profile" class="form-label">Risk Profile</label>
                    <select id="risk-profile" class="form-select">
                        ${Object.keys(this.riskProfiles).map(key => `
                            <option value="${key}" ${this.selectedRiskProfile === key ? 'selected' : ''}>
                                ${this.riskProfiles[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cybersecurity-insurance" class="form-label">Cybersecurity Insurance</label>
                    <select id="cybersecurity-insurance" class="form-select">
                        ${Object.keys(this.insuranceOptions).map(key => `
                            <option value="${key}" ${this.selectedInsurance === key ? 'selected' : ''}>
                                ${this.insuranceOptions[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
        }
    }
    
    updateCompliancePanel() {
        if (!this.selectedIndustry) return;
        
        const industry = this.industryData[this.selectedIndustry];
        if (!industry) return;
        
        // Update primary frameworks
        const primaryFrameworks = document.getElementById('primary-frameworks');
        if (primaryFrameworks) {
            primaryFrameworks.innerHTML = industry.primaryFrameworks.map(framework => `
                <div class="compliance-item">
                    <input type="checkbox" id="compliance-${framework.toLowerCase()}" class="form-check-input" 
                           ${this.selectedCompliance.includes(framework.toLowerCase()) ? 'checked' : ''}>
                    <label for="compliance-${framework.toLowerCase()}">${framework}</label>
                </div>
            `).join('');
        }
        
        // Update additional frameworks
        const additionalFrameworks = document.getElementById('additional-frameworks');
        if (additionalFrameworks) {
            additionalFrameworks.innerHTML = industry.additionalFrameworks.map(framework => `
                <div class="compliance-item">
                    <input type="checkbox" id="compliance-${framework.toLowerCase()}" class="form-check-input"
                           ${this.selectedCompliance.includes(framework.toLowerCase()) ? 'checked' : ''}>
                    <label for="compliance-${framework.toLowerCase()}">${framework}</label>
                </div>
            `).join('');
        }
        
        // Update specific requirements
        const specificRequirements = document.getElementById('specific-requirements');
        if (specificRequirements) {
            specificRequirements.innerHTML = `
                <div class="requirements-list">
                    <h4>Key Requirements for ${industry.name}</h4>
                    <ul>
                        ${industry.specificRequirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Update non-compliance consequences
        const nonComplianceContainer = document.getElementById('non-compliance-container');
        if (nonComplianceContainer) {
            nonComplianceContainer.innerHTML = `
                <div class="consequences-grid">
                    <div class="consequence-card">
                        <div class="consequence-header">
                            <div class="consequence-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <h4>Financial Impact</h4>
                        </div>
                        <p>${industry.nonCompliance.financial}</p>
                    </div>
                    
                    <div class="consequence-card">
                        <div class="consequence-header">
                            <div class="consequence-icon">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h4>Operational Impact</h4>
                        </div>
                        <p>${industry.nonCompliance.operational}</p>
                    </div>
                    
                    <div class="consequence-card">
                        <div class="consequence-header">
                            <div class="consequence-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4>Reputational Impact</h4>
                        </div>
                        <p>${industry.nonCompliance.reputational}</p>
                    </div>
                </div>
            `;
        }
        
        // Update vendor recommendations table
        const complianceVendorTable = document.getElementById('compliance-vendor-table');
        if (complianceVendorTable) {
            const tableBody = complianceVendorTable.querySelector('tbody');
            if (tableBody) {
                const vendors = window.VENDOR_DATA || {};
                const recommendedVendors = industry.bestFitVendors || [];
                
                tableBody.innerHTML = recommendedVendors.map(vendorId => {
                    const vendor = vendors[vendorId];
                    if (!vendor) return '';
                    
                    // Calculate suitability score based on industry's critical features
                    const criticalFeatures = industry.criticalFeatures || [];
                    let suitabilityScore = 0;
                    let totalPossible = 0;
                    
                    criticalFeatures.forEach(feature => {
                        if (vendor.features && vendor.features[feature]) {
                            suitabilityScore += vendor.features[feature];
                            totalPossible += 100;
                        }
                    });
                    
                    const suitabilityPercentage = totalPossible > 0 ? 
                        Math.round((suitabilityScore / totalPossible) * 100) : 0;
                    
                    // Count certifications for framework coverage
                    const certCount = Object.values(vendor.certifications || {}).filter(v => v).length;
                    const certTotal = Object.keys(vendor.certifications || {}).length;
                    const frameworkCoverage = certTotal > 0 ? 
                        Math.round((certCount / certTotal) * 100) : 0;
                    
                    // Determine key strengths based on top features
                    const topFeatures = vendor.features ? 
                        Object.entries(vendor.features)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([key, _]) => this.formatFeatureName(key))
                            .join(', ') : '';
                    
                    return `
                        <tr>
                            <td>
                                <div class="vendor-cell">
                                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-mini-logo">
                                    ${vendor.name}
                                </div>
                            </td>
                            <td>
                                <div class="suitability-bar">
                                    <div class="suitability-fill" style="width: ${suitabilityPercentage}%"></div>
                                    <span>${suitabilityPercentage}%</span>
                                </div>
                            </td>
                            <td>${topFeatures}</td>
                            <td>${frameworkCoverage}%</td>
                            <td>${vendor.implementationTime}</td>
                        </tr>
                    `;
                }).join('');
            }
        }
        
        // Initialize/update framework coverage chart
        this.initFrameworkCoverageChart();
    }
    
    initFrameworkCoverageChart() {
        const chartCanvas = document.getElementById('framework-coverage-chart');
        if (!chartCanvas) return;
        
        // Get industry data
        const industry = this.industryData[this.selectedIndustry];
        if (!industry) return;
        
        // Get frameworks
        const allFrameworks = [...industry.primaryFrameworks, ...industry.additionalFrameworks];
        
        // Get vendors
        const vendors = window.VENDOR_DATA || {};
        const recommendedVendors = industry.bestFitVendors || [];
        
        // Chart data preparation
        const datasets = recommendedVendors.map(vendorId => {
            const vendor = vendors[vendorId];
            if (!vendor) return null;
            
            // Create dataset for this vendor
            const data = [];
            
            // Map certifications to frameworks (simple mapping for now)
            allFrameworks.forEach(framework => {
                // Check if vendor has certification for this framework
                const certKey = framework.toLowerCase();
                const hasCert = vendor.certifications && vendor.certifications[certKey];
                data.push(hasCert ? 100 : 0);
            });
            
            // Get a color for this vendor
            const color = this.getVendorColor(vendorId);
            
            return {
                label: vendor.name,
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2,
                fill: false
            };
        }).filter(Boolean);
        
        // Create or update chart
        if (window.frameworkCoverageChart) {
            window.frameworkCoverageChart.data.labels = allFrameworks;
            window.frameworkCoverageChart.data.datasets = datasets;
            window.frameworkCoverageChart.update();
        } else {
            window.frameworkCoverageChart = new Chart(chartCanvas, {
                type: 'radar',
                data: {
                    labels: allFrameworks,
                    datasets: datasets
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 25
                            }
                        }
                    },
                    elements: {
                        line: {
                            tension: 0.2
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw;
                                    return `${context.dataset.label}: ${value}% coverage`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    attachEventListeners() {
        // Panel industry select change
        const panelIndustrySelect = document.getElementById('panel-industry-select');
        if (panelIndustrySelect) {
            panelIndustrySelect.addEventListener('change', (e) => {
                this.selectedIndustry = e.target.value;
                this.updateCompliancePanel();
                
                // Also update sidebar select
                const sidebarSelect = document.getElementById('industry-select');
                if (sidebarSelect) {
                    sidebarSelect.value = this.selectedIndustry;
                }
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Sidebar industry select change
        const sidebarIndustrySelect = document.getElementById('industry-select');
        if (sidebarIndustrySelect) {
            sidebarIndustrySelect.addEventListener('change', (e) => {
                this.selectedIndustry = e.target.value;
                
                // Also update panel select
                const panelSelect = document.getElementById('panel-industry-select');
                if (panelSelect) {
                    panelSelect.value = this.selectedIndustry;
                    
                    // Update panel content
                    this.updateCompliancePanel();
                }
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Panel risk profile change
        const panelRiskProfile = document.getElementById('panel-risk-profile');
        if (panelRiskProfile) {
            panelRiskProfile.addEventListener('change', (e) => {
                this.selectedRiskProfile = e.target.value;
                
                // Also update sidebar select
                const sidebarSelect = document.getElementById('risk-profile');
                if (sidebarSelect) {
                    sidebarSelect.value = this.selectedRiskProfile;
                }
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Sidebar risk profile change
        const sidebarRiskProfile = document.getElementById('risk-profile');
        if (sidebarRiskProfile) {
            sidebarRiskProfile.addEventListener('change', (e) => {
                this.selectedRiskProfile = e.target.value;
                
                // Also update panel select
                const panelSelect = document.getElementById('panel-risk-profile');
                if (panelSelect) {
                    panelSelect.value = this.selectedRiskProfile;
                }
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Panel insurance change
        const panelInsurance = document.getElementById('panel-cybersecurity-insurance');
        if (panelInsurance) {
            panelInsurance.addEventListener('change', (e) => {
                this.selectedInsurance = e.target.value;
                
                // Also update sidebar select
                const sidebarSelect = document.getElementById('cybersecurity-insurance');
                if (sidebarSelect) {
                    sidebarSelect.value = this.selectedInsurance;
                }
                
                // Update insurance impact display
                this.updateInsuranceImpact();
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Sidebar insurance change
        const sidebarInsurance = document.getElementById('cybersecurity-insurance');
        if (sidebarInsurance) {
            sidebarInsurance.addEventListener('change', (e) => {
                this.selectedInsurance = e.target.value;
                
                // Also update panel select
                const panelSelect = document.getElementById('panel-cybersecurity-insurance');
                if (panelSelect) {
                    panelSelect.value = this.selectedInsurance;
                }
                
                // Update insurance impact display
                this.updateInsuranceImpact();
                
                // Trigger calculation update
                this.triggerCalculation();
            });
        }
        
        // Framework checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.matches('.compliance-grid input[type="checkbox"]')) {
                // Update selected compliance
                this.saveCurrentValues();
                
                // Trigger calculation update
                this.triggerCalculation();
            }
        });
        
        // Listen for tab changes to ensure charts render correctly
        document.addEventListener('click', (e) => {
            if (e.target.matches('.results-tab[data-panel="security-compliance"]')) {
                // Tab was clicked, ensure chart renders
                setTimeout(() => {
                    this.initFrameworkCoverageChart();
                }, 50);
            }
        });
        
        // Initial insurance impact update
        this.updateInsuranceImpact();
    }
    
    updateInsuranceImpact() {
        const insuranceImpact = document.getElementById('insurance-impact');
        if (!insuranceImpact) return;
        
        // Get base reduction from portnox vendor data
        const portnox = window.VENDOR_DATA?.portnox || {};
        const baseReduction = portnox.insuranceImpact || 10;
        
        // Adjust based on selected insurance tier
        let adjustedReduction = baseReduction;
        
        switch (this.selectedInsurance) {
            case 'none':
                adjustedReduction = 0;
                break;
            case 'basic':
                adjustedReduction = Math.round(baseReduction * 0.7);
                break;
            case 'standard':
                // Default value
                break;
            case 'comprehensive':
                adjustedReduction = Math.round(baseReduction * 1.3);
                break;
        }
        
        // Display the value
        insuranceImpact.textContent = adjustedReduction > 0 ? `-${adjustedReduction}%` : '0%';
    }
    
    triggerCalculation() {
        // Find calculate button and trigger click to update results
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.click();
        }
    }
    
    formatFeatureName(key) {
        // Convert camelCase to proper words with capitalization
        const words = key.replace(/([A-Z])/g, ' $1').trim();
        return words.charAt(0).toUpperCase() + words.slice(1);
    }
    
    getVendorColor(vendorId) {
        // Define a color map for vendors
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
        };
        
        // Return mapped color or a default
        return colorMap[vendorId] || 'rgba(158, 158, 158, 0.7)';
    }
}

// Initialize the component
window.industryFrameworks = new IndustryFrameworks();
