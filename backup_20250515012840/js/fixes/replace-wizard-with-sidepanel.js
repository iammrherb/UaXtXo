/**
 * Replace Wizard with Sidepanel
 * Dynamically replaces the wizard UI with sidepanel configuration
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find the wizard container
    const wizardContainer = document.getElementById('wizard-container');
    if (!wizardContainer) return;
    
    // Create sidepanel HTML
    const sidepanelHTML = `
        <div class="tco-sidepanel">
            <div class="sidepanel-header">
                <h2>TCO Configuration</h2>
            </div>
            <div class="sidepanel-content">
                <div class="config-section">
                    <h3><i class="fas fa-server"></i> Vendor Selection</h3>
                    <div class="vendor-selector">
                        <label for="current-vendor">Current NAC Solution</label>
                        <select id="current-vendor" class="form-select">
                            <option value="">Select your current vendor...</option>
                            <option value="cisco">Cisco ISE</option>
                            <option value="aruba">Aruba ClearPass</option>
                            <option value="forescout">Forescout</option>
                            <option value="fortinac">FortiNAC</option>
                            <option value="nps">Microsoft NPS</option>
                            <option value="securew2">SecureW2</option>
                            <option value="juniper">Juniper Mist</option>
                            <option value="foxpass">Foxpass</option>
                            <option value="arista">Arista NAC</option>
                            <option value="noNac">No NAC Solution</option>
                        </select>
                    </div>
                </div>
                
                <div class="config-section">
                    <h3><i class="fas fa-building"></i> Organization</h3>
                    <div class="org-config">
                        <div class="form-group">
                            <label for="device-count">Number of Devices</label>
                            <input type="number" id="device-count" class="form-input" value="2500" min="300" max="100000">
                        </div>
                        <div class="form-group">
                            <label for="locations">Number of Locations</label>
                            <input type="number" id="locations" class="form-input" value="5" min="1" max="1000">
                        </div>
                        <div class="form-group">
                            <label for="years">Analysis Period</label>
                            <select id="years" class="form-select">
                                <option value="1">1 Year</option>
                                <option value="3" selected>3 Years</option>
                                <option value="5">5 Years</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="config-section">
                    <h3><i class="fas fa-industry"></i> Industry</h3>
                    <div class="industry-selector">
                        <label for="industry">Select Industry</label>
                        <select id="industry" class="form-select">
                            <option value="">Choose an industry...</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="financial">Financial Services</option>
                            <option value="education">Education</option>
                            <option value="government">Government</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="retail">Retail</option>
                            <option value="technology">Technology</option>
                            <option value="energy">Energy & Utilities</option>
                        </select>
                    </div>
                </div>
                
                <div class="calculate-section">
                    <button id="calculate-btn" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate TCO Comparison
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Replace wizard with sidepanel
    wizardContainer.innerHTML = sidepanelHTML;
    
    // Add styles for sidepanel
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .tco-sidepanel {
            background-color: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 20px 0;
        }
        
        .sidepanel-header h2 {
            margin-top: 0;
            color: #333;
            font-size: 1.5rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        .config-section {
            margin-bottom: 25px;
        }
        
        .config-section h3 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.2rem;
            color: #0078d4;
            margin-bottom: 15px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .calculate-section {
            margin-top: 30px;
            text-align: center;
        }
        
        body.dark-mode .tco-sidepanel {
            background-color: #2d3748;
        }
        
        body.dark-mode .sidepanel-header h2 {
            color: #e2e8f0;
            border-color: #4a5568;
        }
        
        body.dark-mode .config-section h3 {
            color: #63b3ed;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Attach event handler for calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Hide wizard/sidepanel
            wizardContainer.style.display = 'none';
            
            // Show results
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
            }
            
            // Generate dummy data for charts
            if (typeof window.generateDummyChartData === 'function') {
                window.generateDummyChartData();
            }
        });
    }
    
    console.log("Wizard replaced with sidepanel configuration");
});

// Create dummy chart data generator if needed
window.generateDummyChartData = function() {
    console.log("Generating dummy chart data");
    
    // Function to update chart if it exists
    function updateChartIfExists(chartId, newData) {
        const canvas = document.getElementById(chartId);
        if (!canvas) return;
        
        const chartInstance = Chart.getChart(canvas);
        if (chartInstance) {
            chartInstance.data = newData;
            chartInstance.update();
            console.log(`Updated chart: ${chartId}`);
        }
    }
    
    // Sample data for TCO comparison chart
    updateChartIfExists('tco-comparison-chart', {
        labels: ['Current Solution', 'Portnox Cloud'],
        datasets: [{
            label: 'Total Cost of Ownership',
            data: [450000, 180000],
            backgroundColor: ['#3498db', '#2ecc71'],
            borderColor: ['#3498db', '#2ecc71'],
            borderWidth: 1
        }]
    });
    
    // Update executive summary
    document.getElementById('total-savings').textContent = '$270,000';
    document.getElementById('savings-percentage').textContent = '60%';
    document.getElementById('breakeven-point').textContent = '6 months';
    document.getElementById('risk-reduction').textContent = '75%';
    document.getElementById('implementation-time').textContent = '70% faster';
    
    // Add key insights
    const insightsList = document.getElementById('key-insights-list');
    if (insightsList) {
        insightsList.innerHTML = `
            <div class="insight-item">
                <i class="fas fa-lightbulb highlight-positive"></i>
                <div class="insight-content">
                    <h4>Cost Efficiency</h4>
                    <p>Switching to Portnox Cloud reduces total cost of ownership by 60% over 3 years, primarily through eliminated infrastructure and reduced management costs.</p>
                </div>
            </div>
            <div class="insight-item">
                <i class="fas fa-clock highlight-positive"></i>
                <div class="insight-content">
                    <h4>Rapid Deployment</h4>
                    <p>Portnox Cloud can be deployed in 30 days, compared to 90+ days for on-premises alternatives, enabling faster time-to-value.</p>
                </div>
            </div>
            <div class="insight-item">
                <i class="fas fa-shield-alt highlight-positive"></i>
                <div class="insight-content">
                    <h4>Enhanced Security</h4>
                    <p>Cloud-native architecture provides continuous updates and stronger security controls, reducing overall risk exposure by 75%.</p>
                </div>
            </div>
        `;
    }
    
    console.log("Chart data generation complete");
};
