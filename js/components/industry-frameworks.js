/**
 * Industry & Compliance Framework Module
 * Enhances the industry and compliance integration
 */
(function() {
    console.log("🏢 Initializing enhanced industry frameworks module...");
    
    // Initialize industry selector
    function initializeIndustrySelector() {
        console.log("Initializing industry selector...");
        
        const industrySelect = document.getElementById('industry-select');
        if (!industrySelect) {
            console.error("Industry select element not found");
            return;
        }
        
        // Add event listener for industry changes
        industrySelect.addEventListener('change', function() {
            const selectedIndustry = this.value;
            console.log(`Industry changed to: ${selectedIndustry}`);
            
            // Update compliance checkboxes based on industry
            updateComplianceCheckboxes(selectedIndustry);
            
            // Update risk profile based on industry
            updateRiskProfile(selectedIndustry);
            
            // Update industry-specific content
            updateIndustryContent(selectedIndustry);
            
            // Update charts
            updateIndustryCharts(selectedIndustry);
        });
        
        // Initial update
        const selectedIndustry = industrySelect.value;
        if (selectedIndustry) {
            updateComplianceCheckboxes(selectedIndustry);
            updateRiskProfile(selectedIndustry);
            updateIndustryContent(selectedIndustry);
        }
        
        console.log("Industry selector initialized");
    }
    
    // Update compliance checkboxes based on selected industry
    function updateComplianceCheckboxes(industry) {
        console.log(`Updating compliance checkboxes for industry: ${industry}`);
        
        // Get industry data
        const industryData = window.industryComplianceData && 
                           window.industryComplianceData[industry] ?
                           window.industryComplianceData[industry] : null;
        
        if (!industryData) {
            console.warn(`No industry data found for ${industry}`);
            return;
        }
        
        // Reset all checkboxes
        const complianceCheckboxes = document.querySelectorAll('input[id^="compliance-"]');
        complianceCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Check primary compliance frameworks
        if (industryData.primaryCompliance) {
            industryData.primaryCompliance.forEach(framework => {
                const checkbox = document.getElementById(`compliance-${framework}`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Check secondary compliance frameworks
        if (industryData.secondaryCompliance) {
            industryData.secondaryCompliance.forEach(framework => {
                const checkbox = document.getElementById(`compliance-${framework}`);
                if (checkbox) checkbox.checked = true;
            });
        }
    }
    
    // Update risk profile based on selected industry
    function updateRiskProfile(industry) {
        console.log(`Updating risk profile for industry: ${industry}`);
        
        // Get industry data
        const industryData = window.industryComplianceData && 
                           window.industryComplianceData[industry] ?
                           window.industryComplianceData[industry] : null;
        
        if (!industryData) {
            console.warn(`No industry data found for ${industry}`);
            return;
        }
        
        // Update risk profile select
        const riskProfileSelect = document.getElementById('risk-profile');
        if (riskProfileSelect && industryData.riskProfile) {
            const options = Array.from(riskProfileSelect.options);
            const matchingOption = options.find(option => 
                option.value === industryData.riskProfile ||
                option.value.toLowerCase().includes(industryData.riskProfile.toLowerCase())
            );
            
            if (matchingOption) {
                riskProfileSelect.value = matchingOption.value;
            }
        }
    }
    
    // Update industry-specific content
    function updateIndustryContent(industry) {
        console.log(`Updating industry content for: ${industry}`);
        
        // Get industry data
        const industryData = window.industryComplianceData && 
                           window.industryComplianceData[industry] ?
                           window.industryComplianceData[industry] : null;
        
        if (!industryData) {
            console.warn(`No industry data found for ${industry}`);
            return;
        }
        
        // Check if industry detail panel exists, if not create it
        let industryDetailPanel = document.getElementById('industry-detail-panel');
        
        if (!industryDetailPanel) {
            console.log("Creating industry detail panel...");
            createIndustryDetailPanel();
            industryDetailPanel = document.getElementById('industry-detail-panel');
            
            if (!industryDetailPanel) {
                console.error("Failed to create industry detail panel");
                return;
            }
        }
        
        // Update panel content
        updateIndustryDetailPanel(industryData);
    }
    
    // Create industry detail panel
    function createIndustryDetailPanel() {
        // Find security view panels container
        const securityView = document.querySelector('.view-panel[data-view="security"]');
        if (!securityView) {
            console.error("Security view panel not found");
            return;
        }
        
        // Find security-compliance panel if it exists
        let compliancePanel = securityView.querySelector('#security-compliance');
        
        if (!compliancePanel) {
            console.log("Creating compliance panel...");
            
            // Create compliance panel
            compliancePanel = document.createElement('div');
            compliancePanel.id = 'security-compliance';
            compliancePanel.className = 'results-panel';
            
            compliancePanel.innerHTML = `
                <div class="panel-header">
                    <h2>Compliance Coverage</h2>
                    <p class="subtitle">Industry-specific compliance framework analysis</p>
                </div>
            `;
            
            // Add to security view
            securityView.appendChild(compliancePanel);
        }
        
        // Create industry detail panel
        const industryDetailPanel = document.createElement('div');
        industryDetailPanel.id = 'industry-detail-panel';
        industryDetailPanel.className = 'detail-panel';
        
        // Add to compliance panel
        compliancePanel.appendChild(industryDetailPanel);
        
        // Create panel structure
        industryDetailPanel.innerHTML = `
            <div class="industry-overview">
                <div class="industry-header">
                    <h3>Industry Profile: <span id="industry-name">Financial Services</span></h3>
                </div>
                
                <div class="industry-stats">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="stat-content">
                            <h4>Regulatory Compliance</h4>
                            <div id="industry-compliance">PCI DSS, SOX, GDPR</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="stat-content">
                            <h4>Risk Profile</h4>
                            <div id="industry-risk-profile">Very High</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-money-bill-wave"></i></div>
                        <div class="stat-content">
                            <h4>Avg. Breach Cost</h4>
                            <div id="industry-breach-cost">$5,850,000</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                        <div class="stat-content">
                            <h4>Portnox Compliance Score</h4>
                            <div id="industry-portnox-score">92%</div>
                        </div>
                    </div>
                </div>
                
                <div class="industry-data-points">
                    <h4>Industry Security Insights</h4>
                    <ul id="industry-insights">
                        <li>Financial services face 300 times more cyber attacks than other industries</li>
                        <li>Average cost of cybercrime for financial sector increased 40% over past 3 years</li>
                        <li>Financial firms take 233 days on average to identify and contain a breach</li>
                    </ul>
                </div>
            </div>
            
            <div class="compliance-chart-container">
                <h3>Framework Requirements Analysis</h3>
                <div class="chart-wrapper">
                    <canvas id="industry-requirements-chart"></canvas>
                </div>
            </div>
            
            <div class="compliance-framework-details">
                <h3>Compliance Framework Coverage</h3>
                <div id="compliance-framework-list"></div>
            </div>
        `;
        
        // Add styles for the panel
        addIndustryDetailStyles();
    }
    
    // Update industry detail panel with industry data
    function updateIndustryDetailPanel(industryData) {
        // Update industry name
        const industryName = document.getElementById('industry-name');
        if (industryName) industryName.textContent = industryData.name;
        
        // Update compliance frameworks
        const industryCompliance = document.getElementById('industry-compliance');
        if (industryCompliance) {
            const frameworks = [];
            
            if (industryData.primaryCompliance) {
                industryData.primaryCompliance.forEach(framework => {
                    if (window.complianceFrameworks && window.complianceFrameworks[framework]) {
                        frameworks.push(window.complianceFrameworks[framework].name);
                    }
                });
            }
            
            if (industryData.secondaryCompliance) {
                industryData.secondaryCompliance.forEach(framework => {
                    if (window.complianceFrameworks && window.complianceFrameworks[framework] &&
                        !frameworks.includes(window.complianceFrameworks[framework].name)) {
                        frameworks.push(window.complianceFrameworks[framework].name);
                    }
                });
            }
            
            industryCompliance.textContent = frameworks.join(', ');
        }
        
        // Update risk profile
        const riskProfile = document.getElementById('industry-risk-profile');
        if (riskProfile) {
            const riskText = industryData.riskProfile.charAt(0).toUpperCase() + 
                           industryData.riskProfile.slice(1);
            riskProfile.textContent = riskText;
            
            // Add color coding based on risk level
            riskProfile.className = '';
            if (industryData.riskProfile.includes('high')) {
                riskProfile.classList.add('risk-high');
            } else if (industryData.riskProfile.includes('elevated')) {
                riskProfile.classList.add('risk-medium');
            } else {
                riskProfile.classList.add('risk-low');
            }
        }
        
        // Update breach cost
        const breachCost = document.getElementById('industry-breach-cost');
        if (breachCost) {
            breachCost.textContent = '$' + industryData.breachCost.toLocaleString();
        }
        
        // Update Portnox score
        const portnoxScore = document.getElementById('industry-portnox-score');
        if (portnoxScore) {
            // Calculate average Portnox score for this industry's requirements
            const requirements = industryData.requirements || [];
            if (requirements.length > 0) {
                const total = requirements.reduce((sum, req) => sum + req.portnoxRating, 0);
		const average = Math.round(total / requirements.length);
                portnoxScore.textContent = average + '%';
            } else {
                portnoxScore.textContent = '90%';
            }
        }
        
        // Update industry insights
        const insightsList = document.getElementById('industry-insights');
        if (insightsList && industryData.dataPoints) {
            insightsList.innerHTML = '';
            industryData.dataPoints.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                insightsList.appendChild(li);
            });
        }
        
        // Update compliance framework details
        updateComplianceFrameworkDetails(industryData);
    }
    
    // Update compliance framework details
    function updateComplianceFrameworkDetails(industryData) {
        const frameworkList = document.getElementById('compliance-framework-list');
        if (!frameworkList || !window.complianceFrameworks) return;
        
        // Clear existing content
        frameworkList.innerHTML = '';
        
        // Combined frameworks
        const allFrameworks = [...(industryData.primaryCompliance || []), ...(industryData.secondaryCompliance || [])];
        
        // Create framework details
        allFrameworks.forEach(frameworkId => {
            const framework = window.complianceFrameworks[frameworkId];
            if (!framework) return;
            
            // Calculate compliance scores
            let portnoxTotal = 0;
            let industryTotal = 0;
            framework.requirements.forEach(req => {
                portnoxTotal += req.portnoxRating;
                industryTotal += req.averageRating;
            });
            
            const portnoxAvg = Math.round(portnoxTotal / framework.requirements.length);
            const industryAvg = Math.round(industryTotal / framework.requirements.length);
            const difference = portnoxAvg - industryAvg;
            
            // Create framework card
            const frameworkCard = document.createElement('div');
            frameworkCard.className = 'compliance-framework-card';
            frameworkCard.innerHTML = `
                <div class="framework-header">
                    <h4>${framework.name}</h4>
                    <div class="framework-subtitle">${framework.fullName}</div>
                </div>
                <div class="framework-description">
                    ${framework.description}
                </div>
                <div class="framework-comparison">
                    <div class="comparison-item">
                        <div class="comparison-label">Portnox Coverage:</div>
                        <div class="comparison-bar">
                            <div class="bar-track">
                                <div class="bar-fill portnox-bar" style="width: ${portnoxAvg}%;"></div>
                            </div>
                            <div class="bar-value">${portnoxAvg}%</div>
                        </div>
                    </div>
                    <div class="comparison-item">
                        <div class="comparison-label">Industry Average:</div>
                        <div class="comparison-bar">
                            <div class="bar-track">
                                <div class="bar-fill industry-bar" style="width: ${industryAvg}%;"></div>
                            </div>
                            <div class="bar-value">${industryAvg}%</div>
                        </div>
                    </div>
                </div>
                <div class="framework-advantage">
                    <div class="advantage-badge">+${difference}%</div>
                    <div class="advantage-text">Portnox advantage</div>
                </div>
                <div class="framework-requirements">
                    <button class="btn-toggle-requirements" data-framework="${frameworkId}">
                        View Requirements <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="requirements-details" id="requirements-${frameworkId}" style="display: none;">
                        <table class="requirements-table">
                            <thead>
                                <tr>
                                    <th>Requirement</th>
                                    <th>Portnox</th>
                                    <th>Industry Avg</th>
                                    <th>Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${framework.requirements.map(req => `
                                    <tr>
                                        <td>${req.id}: ${req.name}</td>
                                        <td>${req.portnoxRating}%</td>
                                        <td>${req.averageRating}%</td>
                                        <td class="diff-cell ${(req.portnoxRating - req.averageRating) > 0 ? 'positive' : 'negative'}">
                                            ${(req.portnoxRating - req.averageRating) > 0 ? '+' : ''}${req.portnoxRating - req.averageRating}%
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            frameworkList.appendChild(frameworkCard);
            
            // Add event listener for toggle button
            const toggleButton = frameworkCard.querySelector('.btn-toggle-requirements');
            if (toggleButton) {
                toggleButton.addEventListener('click', function() {
                    const frameworkId = this.dataset.framework;
                    const requirementsDetails = document.getElementById(`requirements-${frameworkId}`);
                    
                    if (requirementsDetails) {
                        const isVisible = requirementsDetails.style.display !== 'none';
                        requirementsDetails.style.display = isVisible ? 'none' : 'block';
                        
                        // Update icon
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.className = isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                        }
                    }
                });
            }
        });
    }
    
    // Update industry-specific charts
    function updateIndustryCharts(industry) {
        console.log(`Updating charts for industry: ${industry}`);
        
        // Get industry data
        const industryData = window.industryComplianceData && 
                           window.industryComplianceData[industry] ?
                           window.industryComplianceData[industry] : null;
        
        if (!industryData) {
            console.warn(`No industry data found for ${industry}`);
            return;
        }
        
        // Update industry requirements chart if it exists
        const requirementsChart = document.getElementById('industry-requirements-chart');
        if (requirementsChart && window.initializeChart) {
            window.initializeChart('industry-requirements-chart', ['portnox']);
        }
        
        // Other chart updates can be added here
    }
    
    // Add styles for industry detail panel
    function addIndustryDetailStyles() {
        // Create style element if it doesn't exist
        let styleElement = document.getElementById('industry-framework-styles');
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'industry-framework-styles';
            document.head.appendChild(styleElement);
            
            styleElement.textContent = `
                .industry-overview {
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                
                .industry-header {
                    margin-bottom: 15px;
                }
                
                .industry-header h3 {
                    margin: 0;
                    color: #05547C;
                    font-size: 1.2rem;
                }
                
                .industry-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }
                
                .stat-card {
                    display: flex;
                    align-items: center;
                    background-color: white;
                    border-radius: 6px;
                    padding: 12px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                
                .stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #05547C;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    margin-right: 12px;
                    flex-shrink: 0;
                }
                
                .stat-content h4 {
                    margin: 0 0 5px 0;
                    font-size: 0.9rem;
                    color: #666;
                }
                
                .stat-content div {
                    font-weight: 600;
                    font-size: 1rem;
                    color: #333;
                }
                
                .risk-high {
                    color: #FF5252 !important;
                }
                
                .risk-medium {
                    color: #FFC107 !important;
                }
                
                .risk-low {
                    color: #4CAF50 !important;
                }
                
                .industry-data-points {
                    background-color: white;
                    border-radius: 6px;
                    padding: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                
                .industry-data-points h4 {
                    margin: 0 0 10px 0;
                    color: #05547C;
                    font-size: 1rem;
                }
                
                .industry-data-points ul {
                    margin: 0;
                    padding-left: 20px;
                }
                
                .industry-data-points li {
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                    color: #555;
                }
                
                .compliance-chart-container {
                    margin-bottom: 20px;
                }
                
                .compliance-chart-container h3 {
                    margin: 0 0 15px 0;
                    color: #05547C;
                    font-size: 1.2rem;
                }
                
                .compliance-framework-details h3 {
                    margin: 0 0 15px 0;
                    color: #05547C;
                    font-size: 1.2rem;
                }
                
                .compliance-framework-card {
                    background-color: white;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                
                .framework-header h4 {
                    margin: 0;
                    color: #05547C;
                    font-size: 1.1rem;
                }
                
                .framework-subtitle {
                    font-size: 0.85rem;
                    color: #666;
                    margin-bottom: 8px;
                }
                
                .framework-description {
                    font-size: 0.9rem;
                    color: #555;
                    margin-bottom: 12px;
                }
                
                .framework-comparison {
                    margin-bottom: 12px;
                }
                
                .comparison-item {
                    margin-bottom: 8px;
                }
                
                .comparison-label {
                    font-size: 0.85rem;
                    color: #666;
                    margin-bottom: 3px;
                }
                
                .comparison-bar {
                    display: flex;
                    align-items: center;
                }
                
                .bar-track {
                    flex-grow: 1;
                    height: 8px;
                    background-color: #E0E0E0;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-right: 10px;
                }
                
                .bar-fill {
                    height: 100%;
                    border-radius: 4px;
                }
                
                .portnox-bar {
                    background-color: #4BC0C0;
                }
                
                .industry-bar {
                    background-color: #FF6384;
                }
                
                .bar-value {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #333;
                    width: 40px;
                }
                
                .framework-advantage {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                }
                
                .advantage-badge {
                    background-color: #4BC0C0;
                    color: white;
                    font-weight: 600;
                    font-size: 0.85rem;
                    padding: 3px 8px;
                    border-radius: 12px;
                    margin-right: 8px;
                }
                
                .advantage-text {
                    font-size: 0.85rem;
                    color: #666;
                }
                
                .btn-toggle-requirements {
                    background-color: #f0f0f0;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 12px;
                    font-size: 0.85rem;
                    color: #333;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }
                
                .btn-toggle-requirements i {
                    margin-left: 8px;
                }
                
                .requirements-details {
                    margin-top: 10px;
                }
                
                .requirements-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.85rem;
                }
                
                .requirements-table th,
                .requirements-table td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                }
                
                .requirements-table th {
                    font-weight: 600;
                    color: #555;
                }
                
                .diff-cell {
                    font-weight: 600;
                }
                
                .diff-cell.positive {
                    color: #4CAF50;
                }
                
                .diff-cell.negative {
                    color: #FF5252;
                }
                
                @media (max-width: 768px) {
                    .industry-stats {
                        grid-template-columns: 1fr;
                    }
                }
            `;
        }
    }
    
    // Add toast notification styles
    function addToastStyles() {
        // Create style element if it doesn't exist
        let styleElement = document.getElementById('toast-styles');
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'toast-styles';
            document.head.appendChild(styleElement);
            
            styleElement.textContent = `
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                
                .toast {
                    background-color: white;
                    border-radius: 4px;
                    padding: 12px 16px;
                    margin-bottom: 10px;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
                    font-size: 0.9rem;
                    min-width: 250px;
                    border-left: 4px solid #333;
                }
                
                .toast-success {
                    border-color: #4CAF50;
                }
                
                .toast-info {
                    border-color: #2196F3;
                }
                
                .toast-warning {
                    border-color: #FFC107;
                }
                
                .toast-error {
                    border-color: #FF5252;
                }
                
                .toast-fade-out {
                    opacity: 0;
                    transition: opacity 0.5s;
                }
            `;
        }
    }
    
    // Display toast notification
    window.showToast = function(message, type = 'info') {
        console.log(`Toast: ${message} (${type})`);
        
        // Find or create toast container
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('toast-fade-out');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 500);
        }, 3000);
    };
    
    // Initialize the module
    function init() {
        console.log("Initializing industry frameworks module...");
        
        // Add toast styles
        addToastStyles();
        
        // Initialize industry selector
        initializeIndustrySelector();
        
        console.log("Industry frameworks module initialized successfully");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
