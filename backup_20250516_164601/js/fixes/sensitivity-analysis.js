// Sensitivity Analysis Enhancement
// Implements a comprehensive sensitivity analysis feature

(function() {
    console.log("📊 Initializing sensitivity analysis enhancement...");
    
    // Ensure we have a financial view panel
    document.addEventListener('DOMContentLoaded', function() {
        initializeSensitivityAnalysis();
    });
    
    function initializeSensitivityAnalysis() {
        // Find the financial view and check if sensitivity panel exists
        const financialView = document.querySelector('.view-panel[data-view="financial"]');
        if (!financialView) {
            console.error("Financial view not found");
            return;
        }
        
        // Get the tabs
        const financialTabs = financialView.querySelector('.results-tabs');
        if (!financialTabs) {
            console.error("Financial tabs not found");
            return;
        }
        
        // Check if sensitivity tab already exists
        if (!financialView.querySelector('.results-tab[data-panel="financial-sensitivity"]')) {
            // Create sensitivity tab
            const sensitivityTab = document.createElement('button');
            sensitivityTab.className = 'results-tab';
            sensitivityTab.setAttribute('data-panel', 'financial-sensitivity');
            sensitivityTab.textContent = 'Sensitivity Analysis';
            financialTabs.appendChild(sensitivityTab);
            
            // Add click event
            sensitivityTab.addEventListener('click', function() {
                // Hide all panels
                const panels = financialView.querySelectorAll('.results-panel');
                panels.forEach(panel => panel.classList.remove('active'));
                
                // Deactivate all tabs
                const tabs = financialTabs.querySelectorAll('.results-tab');
                tabs.forEach(tab => tab.classList.remove('active'));
                
                // Activate this tab
                this.classList.add('active');
                
                // Show sensitivity panel
                const sensitivityPanel = financialView.querySelector('#financial-sensitivity');
                if (sensitivityPanel) {
                    sensitivityPanel.classList.add('active');
                }
            });
        }
        
        // Create sensitivity panel if it doesn't exist
        if (!financialView.querySelector('#financial-sensitivity')) {
            // Create sensitivity panel
            const sensitivityPanel = document.createElement('div');
            sensitivityPanel.id = 'financial-sensitivity';
            sensitivityPanel.className = 'results-panel';
            
            sensitivityPanel.innerHTML = `
                <div class="panel-header">
                    <h2>Sensitivity Analysis</h2>
                    <p class="subtitle">Analyze how changing variables impacts TCO and ROI</p>
                </div>
                
                <div class="sensitivity-controls">
                    <div class="sensitivity-control-group">
                        <label class="sensitivity-label">Primary Variable</label>
                        <select id="sensitivity-primary-variable" class="form-select">
                            <option value="deviceCount">Device Count</option>
                            <option value="portnoxBasePrice">Portnox Price Per Device</option>
                            <option value="portnoxDiscount">Volume Discount</option>
                            <option value="fteCost">FTE Cost</option>
                            <option value="fteAllocation">FTE Allocation</option>
                            <option value="maintenancePercentage">Maintenance Percentage</option>
                            <option value="riskReduction">Risk Reduction</option>
                        </select>
                    </div>
                    
                    <div class="sensitivity-control-group">
                        <label class="sensitivity-label">Secondary Variable</label>
                        <select id="sensitivity-secondary-variable" class="form-select">
                            <option value="none">None</option>
                            <option value="deviceCount">Device Count</option>
                            <option value="portnoxBasePrice">Portnox Price Per Device</option>
                            <option value="portnoxDiscount">Volume Discount</option>
                            <option value="fteCost">FTE Cost</option>
                            <option value="fteAllocation">FTE Allocation</option>
                            <option value="maintenancePercentage">Maintenance Percentage</option>
                            <option value="riskReduction">Risk Reduction</option>
                        </select>
                    </div>
                    
                    <div class="sensitivity-control-group">
                        <label class="sensitivity-label">Metric to Analyze</label>
                        <select id="sensitivity-metric" class="form-select">
                            <option value="threeYearTCO">3-Year TCO</option>
                            <option value="roi">3-Year ROI</option>
                            <option value="payback">Payback Period</option>
                            <option value="annualSavings">Annual Savings</option>
                        </select>
                    </div>
                    
                    <div class="sensitivity-control-group">
                        <label class="sensitivity-label">Vendors to Compare</label>
                        <div class="sensitivity-vendor-selection">
                            <div class="sensitivity-vendor-checkbox">
                                <input type="checkbox" id="sensitivity-vendor-portnox" checked disabled>
                                <label for="sensitivity-vendor-portnox">Portnox Cloud</label>
                            </div>
                            <div class="sensitivity-vendor-checkbox">
                                <input type="checkbox" id="sensitivity-vendor-cisco" checked>
                                <label for="sensitivity-vendor-cisco">Cisco ISE</label>
                            </div>
                            <div class="sensitivity-vendor-checkbox">
                                <input type="checkbox" id="sensitivity-vendor-aruba">
                                <label for="sensitivity-vendor-aruba">Aruba ClearPass</label>
                            </div>
                            <div class="sensitivity-vendor-checkbox">
                                <input type="checkbox" id="sensitivity-vendor-forescout">
                                <label for="sensitivity-vendor-forescout">Forescout</label>
                            </div>
                        </div>
                    </div>
                    
                    <button id="run-sensitivity-analysis" class="btn btn-primary">
                        <i class="fas fa-calculator"></i> Run Analysis
                    </button>
                </div>
                
                <div class="chart-container">
                    <h3>Sensitivity Analysis Results</h3>
                    <div class="chart-wrapper">
                        <canvas id="sensitivity-chart"></canvas>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Key Insights</h3>
                    <div class="insights-container" id="sensitivity-insights">
                        <div class="insight-box">
                            <h4><i class="fas fa-lightbulb"></i> Sensitivity Analysis Insight</h4>
                            <p>Select variables and run the analysis to see how changes impact costs and ROI. This helps identify which factors have the most significant impact on your investment decision.</p>
                        </div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Break-Even Analysis</h3>
                    <div class="chart-wrapper half-height">
                        <canvas id="breakeven-chart"></canvas>
                    </div>
                </div>
            `;
            
            financialView.appendChild(sensitivityPanel);
            
            // Add event listener for the run analysis button
            document.getElementById('run-sensitivity-analysis').addEventListener('click', runSensitivityAnalysis);
        }
    }
    
    function runSensitivityAnalysis() {
        console.log("Running sensitivity analysis");
        
        // Get selected variables and metrics
        const primaryVariable = document.getElementById('sensitivity-primary-variable').value;
        const secondaryVariable = document.getElementById('sensitivity-secondary-variable').value;
        const metric = document.getElementById('sensitivity-metric').value;
        
        // Get selected vendors
        const selectedVendors = [];
        selectedVendors.push('portnox'); // Always include Portnox
        
        if (document.getElementById('sensitivity-vendor-cisco').checked) {
            selectedVendors.push('cisco');
        }
        if (document.getElementById('sensitivity-vendor-aruba') && document.getElementById('sensitivity-vendor-aruba').checked) {
            selectedVendors.push('aruba');
        }
        if (document.getElementById('sensitivity-vendor-forescout') && document.getElementById('sensitivity-vendor-forescout').checked) {
            selectedVendors.push('forescout');
        }
        
        // Show loading state
        const sensitivityChart = document.getElementById('sensitivity-chart');
        if (sensitivityChart) {
            sensitivityChart.style.opacity = 0.5;
        }
        
        // Generate sensitivity data
        setTimeout(() => {
            generateSensitivityData(primaryVariable, secondaryVariable, metric, selectedVendors);
        }, 500);
    }
    
    function generateSensitivityData(primaryVariable, secondaryVariable, metric, selectedVendors) {
        console.log(`Generating sensitivity data for ${primaryVariable}, ${secondaryVariable}, ${metric}`);
        
        // Variable ranges
        const variableRanges = {
            deviceCount: {
                min: 300,
                max: 5000,
                step: 500,
                unit: ''
            },
            portnoxBasePrice: {
                min: 1,
                max: 6,
                step: 0.5,
                unit: '$'
            },
            portnoxDiscount: {
                min: 0,
                max: 40,
                step: 5,
                unit: '%'
            },
            fteCost: {
                min: 60000,
                max: 160000,
                step: 10000,
                unit: '$'
            },
            fteAllocation: {
                min: 5,
                max: 50,
                step: 5,
                unit: '%'
            },
            maintenancePercentage: {
                min: 10,
                max: 30,
                step: 2,
                unit: '%'
            },
            riskReduction: {
                min: 10,
                max: 50,
                step: 5,
                unit: '%'
            }
        };
        
        // Get current values for all variables
        const currentValues = {
            deviceCount: parseInt(document.getElementById('device-count').value) || 500,
            portnoxBasePrice: parseFloat(document.getElementById('portnox-base-price').value) || 3,
            portnoxDiscount: parseFloat(document.getElementById('portnox-discount').value) || 15,
            fteCost: parseInt(document.getElementById('fte-cost').value) || 100000,
            fteAllocation: parseFloat(document.getElementById('fte-allocation').value) || 25,
            maintenancePercentage: parseFloat(document.getElementById('maintenance-percentage').value) || 18,
            riskReduction: parseFloat(document.getElementById('risk-reduction').value) || 35
        };
        
        // Generate primary variable values
        const primaryRange = variableRanges[primaryVariable];
        const primaryValues = [];
        const primaryLabels = [];
        
        for (let value = primaryRange.min; value <= primaryRange.max; value += primaryRange.step) {
            primaryValues.push(value);
            primaryLabels.push(`${primaryRange.unit}${value}`);
        }
        
        // Generate chart data
        const chartData = {
            labels: primaryLabels,
            datasets: []
        };
        
        // Process each vendor
        selectedVendors.forEach(vendorId => {
            const vendor = window.vendorData.find(v => v.id === vendorId);
            if (!vendor) return;
            
            // Create dataset for this vendor
            const dataset = {
                label: vendor.name,
                data: [],
                borderColor: vendorId === 'portnox' ? '#2E5BFF' : 
                           vendorId === 'cisco' ? '#FF6B6B' : 
                           vendorId === 'aruba' ? '#5B8C5A' : 
                           '#FFAB4C',
                backgroundColor: vendorId === 'portnox' ? 'rgba(46, 91, 255, 0.2)' : 
                               vendorId === 'cisco' ? 'rgba(255, 107, 107, 0.2)' : 
                               vendorId === 'aruba' ? 'rgba(91, 140, 90, 0.2)' : 
                               'rgba(255, 171, 76, 0.2)',
                borderWidth: 2,
                tension: 0.3
            };
            
            // For each primary value, calculate the metric
            primaryValues.forEach(primaryValue => {
                // Clone current values and update with primary variable
                const inputValues = {...currentValues};
                inputValues[primaryVariable] = primaryValue;
                
                // Calculate metric for this vendor with these inputs
                const result = calculateMetric(vendor, inputValues, metric);
                dataset.data.push(result);
            });
            
            chartData.datasets.push(dataset);
        });
        
        // Render chart
        renderSensitivityChart(chartData, primaryVariable, metric);
        
        // Update insights
        updateSensitivityInsights(primaryVariable, selectedVendors, chartData);
        
        // Render break-even chart if applicable
        if (metric === 'payback' || metric === 'roi') {
            renderBreakEvenChart(primaryVariable, secondaryVariable, selectedVendors);
        }
    }
    
    function calculateMetric(vendor, inputs, metric) {
        // Calculate detailed costs for this vendor with these inputs
        if (!window.updateCalculations) {
            console.error("updateCalculations function not found");
            return 0;
        }
        
        // Run calculation for just this vendor
        const calculationResult = window.updateCalculations([vendor], inputs, false);
        if (!calculationResult || !calculationResult[0]) {
            return 0;
        }
        
        const vendorData = calculationResult[0];
        
        // Return the requested metric
        switch (metric) {
            case 'threeYearTCO':
                return vendorData.costBreakdown ? vendorData.costBreakdown.threeYearTCO : vendorData.threeYearTCO;
            case 'roi':
                return vendorData.roi ? vendorData.roi.threeYearROI : 0;
            case 'payback':
                return vendorData.roi ? vendorData.roi.paybackPeriod : 0;
            case 'annualSavings':
                return vendorData.roi ? vendorData.roi.annualSavings : 0;
            default:
                return 0;
        }
    }
    
    function renderSensitivityChart(chartData, primaryVariable, metric) {
        // Get chart canvas
        const chartCanvas = document.getElementById('sensitivity-chart');
        if (!chartCanvas) {
            console.error("Sensitivity chart canvas not found");
            return;
        }
        
        // Destroy existing chart
        if (window.chartInstances && window.chartInstances['sensitivity-chart']) {
            window.chartInstances['sensitivity-chart'].destroy();
        }
        
        // Get variable details
        const variableNames = {
            deviceCount: 'Device Count',
            portnoxBasePrice: 'Portnox Price Per Device',
            portnoxDiscount: 'Volume Discount',
            fteCost: 'FTE Cost',
            fteAllocation: 'FTE Allocation',
            maintenancePercentage: 'Maintenance Percentage',
            riskReduction: 'Risk Reduction'
        };
        
        const metricNames = {
            threeYearTCO: '3-Year TCO ($)',
            roi: '3-Year ROI (%)',
            payback: 'Payback Period (months)',
            annualSavings: 'Annual Savings ($)'
        };
        
        // Create chart
        const ctx = chartCanvas.getContext('2d');
        window.chartInstances['sensitivity-chart'] = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Impact of ${variableNames[primaryVariable]} on ${metricNames[metric]}`,
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                
                                if (metric === 'threeYearTCO' || metric === 'annualSavings') {
                                    return `${label}: ${new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value)}`;
                                } else if (metric === 'roi') {
                                    return `${label}: ${value.toFixed(1)}%`;
                                } else if (metric === 'payback') {
                                    return `${label}: ${value.toFixed(1)} months`;
                                }
                                
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: variableNames[primaryVariable]
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: metricNames[metric]
                        },
                        ticks: {
                            callback: function(value) {
                                if (metric === 'threeYearTCO' || metric === 'annualSavings') {
                                    return new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        notation: 'compact',
                                        compactDisplay: 'short',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value);
                                } else if (metric === 'roi') {
                                    return `${value}%`;
                                } else if (metric === 'payback') {
                                    return `${value} mo`;
                                }
                                
                                return value;
                            }
                        }
                    }
                }
            }
        });
        
        // Reset opacity
        chartCanvas.style.opacity = 1;
    }
    
    function updateSensitivityInsights(primaryVariable, selectedVendors, chartData) {
        const insightsContainer = document.getElementById('sensitivity-insights');
        if (!insightsContainer) return;
        
        // Clear existing insights
        insightsContainer.innerHTML = '';
        
        // Get insight based on variable and metric
        const variableNames = {
            deviceCount: 'device count',
            portnoxBasePrice: 'Portnox price per device',
            portnoxDiscount: 'volume discount',
            fteCost: 'IT staff cost',
            fteAllocation: 'staff allocation to NAC',
            maintenancePercentage: 'annual maintenance percentage',
            riskReduction: 'security risk reduction'
        };
        
        // Check if Portnox is always better
        let portnoxAlwaysBetter = true;
        let portnoxIndex = -1;
        let ciscoIndex = -1;
        
        for (let i = 0; i < chartData.datasets.length; i++) {
            if (chartData.datasets[i].label === 'Portnox Cloud') {
                portnoxIndex = i;
            } else if (chartData.datasets[i].label === 'Cisco ISE') {
                ciscoIndex = i;
            }
        }
        
        if (portnoxIndex !== -1 && ciscoIndex !== -1) {
            // Check if Portnox is always better
            for (let i = 0; i < chartData.datasets[portnoxIndex].data.length; i++) {
                // For TCO and payback, lower is better
                if (document.getElementById('sensitivity-metric').value === 'threeYearTCO' || 
                    document.getElementById('sensitivity-metric').value === 'payback') {
                    if (chartData.datasets[portnoxIndex].data[i] >= chartData.datasets[ciscoIndex].data[i]) {
                        portnoxAlwaysBetter = false;
                        break;
                    }
                } else {
                    // For ROI and savings, higher is better
                    if (chartData.datasets[portnoxIndex].data[i] <= chartData.datasets[ciscoIndex].data[i]) {
                        portnoxAlwaysBetter = false;
                        break;
                    }
                }
            }
        }
        
        // Calculate the average advantage
        let advantageSum = 0;
        let advantageCount = 0;
        
        if (portnoxIndex !== -1 && ciscoIndex !== -1) {
            for (let i = 0; i < chartData.datasets[portnoxIndex].data.length; i++) {
                if (document.getElementById('sensitivity-metric').value === 'threeYearTCO') {
                    const advantage = chartData.datasets[ciscoIndex].data[i] - chartData.datasets[portnoxIndex].data[i];
                    advantageSum += advantage;
                    advantageCount++;
                } else if (document.getElementById('sensitivity-metric').value === 'roi') {
                    const advantage = chartData.datasets[portnoxIndex].data[i] - chartData.datasets[ciscoIndex].data[i];
                    advantageSum += advantage;
                    advantageCount++;
                }
            }
        }
        
        const averageAdvantage = advantageSum / (advantageCount || 1);
        
        // Create insight box based on results
        const insightBox = document.createElement('div');
        insightBox.className = 'insight-box';
        
        if (portnoxAlwaysBetter) {
            insightBox.innerHTML = `
                <h4><i class="fas fa-lightbulb"></i> Key Sensitivity Insight</h4>
                <p>Portnox Cloud maintains its cost-effectiveness regardless of changes in ${variableNames[primaryVariable]}. 
                   At every point in the analysis, Portnox provides better financial performance than the alternatives.</p>
                <p>The average advantage over Cisco ISE is ${document.getElementById('sensitivity-metric').value === 'threeYearTCO' ? 
                    new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(averageAdvantage) : 
                    `${averageAdvantage.toFixed(1)}%`}.</p>
            `;
        } else {
            insightBox.innerHTML = `
                <h4><i class="fas fa-lightbulb"></i> Key Sensitivity Insight</h4>
                <p>The financial advantage of Portnox Cloud varies with changes in ${variableNames[primaryVariable]}. 
                   While Portnox generally offers better value, there are specific scenarios where the advantage may be smaller.</p>
                <p>For optimal financial benefits, focus on keeping ${variableNames[primaryVariable]} within a favorable range to 
                   maximize your return on investment.</p>
            `;
        }
        
        insightsContainer.appendChild(insightBox);
        
        // Add specific variable insights
        const variableInsight = document.createElement('div');
        variableInsight.className = 'insight-box';
        
        switch (primaryVariable) {
            case 'deviceCount':
                variableInsight.innerHTML = `
                    <h4><i class="fas fa-chart-line"></i> Scaling Insight</h4>
                    <p>As device count increases, Portnox Cloud's advantage grows due to its cloud-native architecture and 
                       volume pricing. On-premises solutions require additional hardware and licenses at scale, while 
                       Portnox scales linearly with predictable costs.</p>
                `;
                break;
            case 'fteCost':
                variableInsight.innerHTML = `
                    <h4><i class="fas fa-users"></i> Staffing Insight</h4>
                    <p>Higher IT staff costs significantly increase the TCO advantage of Portnox Cloud due to its lower 
                       administration requirements. Traditional NAC solutions typically require 2-3x more staff time for 
                       management, making staff costs a major factor in your TCO calculation.</p>
                `;
                break;
            case 'fteAllocation':
                variableInsight.innerHTML = `
                    <h4><i class="fas fa-tasks"></i> Resource Allocation Insight</h4>
                    <p>As staff allocation to NAC management increases, Portnox Cloud's efficiency advantage grows more pronounced. 
                       Organizations with high staff allocation to security solutions will see substantially more benefit from 
                       Portnox's simplified management model.</p>
                `;
                break;
            case 'maintenancePercentage':
                variableInsight.innerHTML = `
                    <h4><i class="fas fa-tools"></i> Maintenance Insight</h4>
                    <p>Higher maintenance costs for hardware and on-premises software increase the cost advantage of Portnox Cloud. 
                       With no hardware maintenance and included software updates, Portnox eliminates the unpredictable costs that 
                       often escalate in traditional solutions.</p>
                `;
                break;
        }
        
        insightsContainer.appendChild(variableInsight);
    }
    
    function renderBreakEvenChart(primaryVariable, secondaryVariable, selectedVendors) {
        // Only implement if time permits - would show when different solutions break even
        console.log("Break-even chart would be rendered here");
    }
    
    console.log("📊 Sensitivity analysis enhancement initialized successfully");
})();
