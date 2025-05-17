/**
 * Sensitivity Analysis Module
 * Provides tools for analyzing how changes in parameters affect TCO and ROI
 */

class SensitivityAnalysis {
    constructor() {
        this.calculator = window.advancedTcoCalculator || null;
        this.chartData = {};
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Create sensitivity analysis panel if it doesn't exist
        this.createSensitivityPanel();
        
        // Add event listeners for sensitivity controls
        this.attachEventListeners();
        
        console.log('Sensitivity Analysis Module initialized');
    }
    
    createSensitivityPanel() {
        // Find the financial view panel
        const financialView = document.querySelector('.view-panel[data-view="financial"]');
        if (!financialView) {
            console.error('Could not find financial view panel');
            return;
        }
        
        // Get a reference to the sensitivity panel
        const sensitivityPanel = document.getElementById('financial-sensitivity');
        if (!sensitivityPanel) {
            console.error('Could not find sensitivity panel');
            return;
        }
        
        // Populate the sensitivity panel
        sensitivityPanel.innerHTML = `
            <div class="panel-header">
                <h2>Sensitivity Analysis</h2>
                <p class="subtitle">Analyze how changes in key parameters affect TCO and ROI</p>
            </div>
            
            <div class="sensitivity-controls">
                <div class="form-group">
                    <label for="sensitivity-vendor" class="form-label">Vendor</label>
                    <select id="sensitivity-vendor" class="form-select">
                        <!-- Will be populated with selected vendors -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="sensitivity-parameter" class="form-label">Parameter</label>
                    <select id="sensitivity-parameter" class="form-select">
                        <option value="deviceCount">Device Count</option>
                        <option value="costParameters.portnoxBasePrice">Price per Device</option>
                        <option value="costParameters.portnoxDiscount">Volume Discount</option>
                        <option value="costParameters.fteCost">FTE Cost</option>
                        <option value="costParameters.fteAllocation">FTE Allocation</option>
                        <option value="costParameters.maintenancePercentage">Maintenance %</option>
                        <option value="costParameters.riskReduction">Risk Reduction %</option>
                        <option value="yearsToProject">Analysis Period</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="sensitivity-range" class="form-label">Variation Range (%)</label>
                    <input type="range" id="sensitivity-range" class="form-range" min="10" max="100" value="30" step="10">
                    <div class="range-value" id="sensitivity-range-value">±30%</div>
                </div>
                
                <div class="form-group">
                    <label for="sensitivity-steps" class="form-label">Number of Steps</label>
                    <input type="range" id="sensitivity-steps" class="form-range" min="3" max="11" value="5" step="2">
                    <div class="range-value" id="sensitivity-steps-value">5 points</div>
                </div>
                
                <div class="form-group">
                    <button id="run-sensitivity" class="btn btn-primary">
                        <i class="fas fa-chart-line"></i> Run Analysis
                    </button>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="dashboard-card highlight-card">
                    <h3>Elasticity Factor</h3>
                    <div class="metric-value highlight-value" id="elasticity-factor">1.4x</div>
                    <div class="metric-label">TCO sensitivity to parameter</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Most Sensitive To</h3>
                    <div class="metric-value" id="most-sensitive-to">Device Count</div>
                    <div class="metric-label">Parameter with highest impact</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Breakeven Point</h3>
                    <div class="metric-value" id="breakeven-point">480 devices</div>
                    <div class="metric-label">Threshold for positive ROI</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Risk Factor</h3>
                    <div class="metric-value" id="risk-factor">Medium</div>
                    <div class="metric-label">Sensitivity assessment</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Parameter Impact on TCO</h3>
                <div class="chart-wrapper">
                    <canvas id="tco-sensitivity-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Parameter Impact on ROI</h3>
                <div class="chart-wrapper">
                    <canvas id="roi-sensitivity-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Multi-Parameter Analysis</h3>
                <div class="form-group">
                    <label for="second-parameter" class="form-label">Second Parameter</label>
                    <select id="second-parameter" class="form-select">
                        <option value="deviceCount">Device Count</option>
                        <option value="costParameters.portnoxDiscount" selected>Volume Discount</option>
                        <option value="costParameters.fteCost">FTE Cost</option>
                        <option value="costParameters.fteAllocation">FTE Allocation</option>
                        <option value="costParameters.maintenancePercentage">Maintenance %</option>
                        <option value="costParameters.riskReduction">Risk Reduction %</option>
                    </select>
                </div>
                
                <div class="chart-wrapper">
                    <canvas id="multi-parameter-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Tornado Analysis</h3>
                <p class="helper-text">Impact of ±20% variation in each parameter on TCO</p>
                <div class="chart-wrapper">
                    <canvas id="tornado-chart"></canvas>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Sensitivity vendor select
        const vendorSelect = document.getElementById('sensitivity-vendor');
        if (vendorSelect) {
            // Populate with selected vendors
            this.updateVendorSelect(vendorSelect);
            
            // Add event listener for changes
            vendorSelect.addEventListener('change', () => {
                // Run analysis if already performed
                if (Object.keys(this.chartData).length > 0) {
                    this.runSensitivityAnalysis();
                }
            });
        }
        
        // Parameter select
        const parameterSelect = document.getElementById('sensitivity-parameter');
        if (parameterSelect) {
            parameterSelect.addEventListener('change', () => {
                // Update second parameter select to avoid duplicates
                this.updateSecondParameterSelect(parameterSelect.value);
                
                // Run analysis if already performed
                if (Object.keys(this.chartData).length > 0) {
                    this.runSensitivityAnalysis();
                }
            });
        }
        
        // Range slider
        const rangeSlider = document.getElementById('sensitivity-range');
        const rangeValue = document.getElementById('sensitivity-range-value');
        if (rangeSlider && rangeValue) {
            rangeSlider.addEventListener('input', () => {
                rangeValue.textContent = `±${rangeSlider.value}%`;
            });
        }
        
        // Steps slider
        const stepsSlider = document.getElementById('sensitivity-steps');
        const stepsValue = document.getElementById('sensitivity-steps-value');
        if (stepsSlider && stepsValue) {
            stepsSlider.addEventListener('input', () => {
                stepsValue.textContent = `${stepsSlider.value} points`;
            });
        }
        
        // Run sensitivity button
        const runButton = document.getElementById('run-sensitivity');
        if (runButton) {
            runButton.addEventListener('click', () => {
                this.runSensitivityAnalysis();
            });
        }
        
        // Second parameter select
        const secondParamSelect = document.getElementById('second-parameter');
        if (secondParamSelect) {
            secondParamSelect.addEventListener('change', () => {
                // Run multi-parameter analysis if data exists
                if (Object.keys(this.chartData).length > 0) {
                    this.updateMultiParameterChart();
                }
            });
        }
        
        // Listen for tab changes to ensure charts render correctly
        document.addEventListener('click', (e) => {
            if (e.target.matches('.results-tab[data-panel="financial-sensitivity"]')) {
                // Tab was clicked, ensure charts render
                setTimeout(() => {
                    this.updateCharts();
                }, 100);
            }
        });
        
        // Listen for vendor selection changes
        document.addEventListener('click', (e) => {
            if (e.target.matches('.vendor-card')) {
                // Vendor selection changed, update vendor select
                setTimeout(() => {
                    this.updateVendorSelect(document.getElementById('sensitivity-vendor'));
                }, 500);
            }
        });
    }
    
    updateVendorSelect(vendorSelect) {
        if (!vendorSelect) return;
        
        // Get selected vendors from calculator state
        const selectedVendors = window.calculatorState.selectedVendors || ['portnox'];
        
        // Clear current options
        vendorSelect.innerHTML = '';
        
        // Add options for each selected vendor
        selectedVendors.forEach(vendorId => {
            const vendor = window.VENDOR_DATA[vendorId];
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
    
    updateSecondParameterSelect(firstParam) {
        const secondParamSelect = document.getElementById('second-parameter');
        if (!secondParamSelect) return;
        
        // Get current value
        const currentValue = secondParamSelect.value;
        
        // Clear and rebuild options excluding first parameter
        secondParamSelect.innerHTML = '';
        
        const paramOptions = [
            { value: 'deviceCount', text: 'Device Count' },
            { value: 'costParameters.portnoxBasePrice', text: 'Price per Device' },
            { value: 'costParameters.portnoxDiscount', text: 'Volume Discount' },
            { value: 'costParameters.fteCost', text: 'FTE Cost' },
            { value: 'costParameters.fteAllocation', text: 'FTE Allocation' },
            { value: 'costParameters.maintenancePercentage', text: 'Maintenance %' },
            { value: 'costParameters.riskReduction', text: 'Risk Reduction %' },
            { value: 'yearsToProject', text: 'Analysis Period' }
        ];
        
        // Add all options except the first parameter
        paramOptions.forEach(param => {
            if (param.value !== firstParam) {
                const option = document.createElement('option');
                option.value = param.value;
                option.textContent = param.text;
                secondParamSelect.appendChild(option);
            }
        });
        
        // Try to keep current value if it's not the first parameter
        if (currentValue !== firstParam) {
            secondParamSelect.value = currentValue;
        }
    }
    
    runSensitivityAnalysis() {
        // Show loading overlay
        this.showLoading();
        
        // Get parameters
        const vendorId = document.getElementById('sensitivity-vendor').value;
        const parameter = document.getElementById('sensitivity-parameter').value;
        const range = parseInt(document.getElementById('sensitivity-range').value);
        const steps = parseInt(document.getElementById('sensitivity-steps').value);
        
        // Get current inputs from calculator state
        const inputs = this.getCurrentInputs();
        
        // Generate parameter variations
        const variations = this.generateParameterVariations(parameter, inputs, range, steps);
        
        // Run sensitivity analysis
        const sensitivityConfig = {};
        sensitivityConfig[parameter] = variations;
        
        // Perform analysis with a slight delay to allow UI updates
        setTimeout(() => {
            if (this.calculator) {
                // Run analysis
                const results = this.calculator.runSensitivityAnalysis(vendorId, inputs, sensitivityConfig);
                
                // Store chart data
                this.chartData = {
                    parameter: parameter,
                    variations: variations,
                    results: results
                };
                
                // Update charts
                this.updateCharts();
                
                // Run tornado analysis
                this.runTornadoAnalysis(vendorId, inputs);
                
                // Update multi-parameter chart
                this.updateMultiParameterChart();
                
                // Update metrics
                this.updateMetrics(results, parameter);
                
                // Hide loading overlay
                this.hideLoading();
            } else {
                console.error('Advanced TCO calculator not found');
                this.hideLoading();
            }
        }, 100);
    }
    
    getCurrentInputs() {
        // Get current inputs from calculator state
        return {
            vendors: window.calculatorState.selectedVendors,
            industry: window.calculatorState.selectedIndustry,
            compliance: window.calculatorState.selectedCompliance,
            riskProfile: window.calculatorState.riskProfile,
            insuranceTier: window.calculatorState.insuranceTier,
            deviceCount: window.calculatorState.deviceCount,
            locations: window.calculatorState.locations,
            networkRequirements: window.calculatorState.networkRequirements,
            yearsToProject: window.calculatorState.yearsToProject,
            costParameters: Object.assign({}, window.calculatorState.costParameters)
        };
    }
    
    generateParameterVariations(parameter, inputs, range, steps) {
        // Get base value
        let baseValue = this.getParameterValue(parameter, inputs);
        
        // Calculate variations
        const variations = [];
        const stepSize = (2 * range) / (steps - 1);
        
        for (let i = 0; i < steps; i++) {
            const percentChange = -range + (i * stepSize);
            const value = baseValue * (1 + (percentChange / 100));
            
            // Round appropriately based on parameter type
            let roundedValue = value;
            if (parameter === 'deviceCount' || parameter === 'yearsToProject') {
                roundedValue = Math.round(value);
            } else if (parameter.includes('Percentage') || parameter.includes('Discount')) {
                roundedValue = Math.round(value);
            } else if (parameter.includes('BasePrice')) {
                roundedValue = Math.round(value * 100) / 100;
            } else {
                roundedValue = Math.round(value);
            }
            
            variations.push(roundedValue);
        }
        
        return variations;
    }
    
    getParameterValue(parameter, inputs) {
        // Handle nested parameters
        if (parameter.includes('.')) {
            const parts = parameter.split('.');
            let value = inputs;
            
            // Navigate to the appropriate value
            for (const part of parts) {
                value = value[part];
            }
            
            return value;
        } else {
            // Handle top-level parameters
            return inputs[parameter];
        }
    }
    
    updateCharts() {
        if (Object.keys(this.chartData).length === 0) return;
        
        // Update TCO sensitivity chart
        this.updateTcoSensitivityChart();
        
        // Update ROI sensitivity chart
        this.updateRoiSensitivityChart();
    }
    
    updateTcoSensitivityChart() {
        const chartCanvas = document.getElementById('tco-sensitivity-chart');
        if (!chartCanvas) return;
        
        // Get data from chart data
        const parameter = this.chartData.parameter;
        const variations = this.chartData.variations;
        const results = this.chartData.results;
        
        // Parameter display name
        const paramName = this.getParameterDisplayName(parameter);
        
        // Prepare chart data
        const labels = variations.map(value => this.formatParameterValue(parameter, value));
        const data = [];
        
        // Extract TCO data
        variations.forEach(variation => {
            const variationResults = results.variations[parameter][variation];
            if (variationResults) {
                data.push(variationResults.costs.total);
            } else {
                data.push(null);
            }
        });
        
        // Create dataset
        const dataset = {
            label: 'Total Cost of Ownership',
            data: data,
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.4
        };
        
        // Create or update chart
        if (window.tcoSensitivityChart) {
            window.tcoSensitivityChart.data.labels = labels;
            window.tcoSensitivityChart.data.datasets = [dataset];
            window.tcoSensitivityChart.options.scales.x.title.text = paramName;
            window.tcoSensitivityChart.update();
        } else {
            window.tcoSensitivityChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [dataset]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `TCO: $${context.raw.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: paramName
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Cost of Ownership'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateRoiSensitivityChart() {
        const chartCanvas = document.getElementById('roi-sensitivity-chart');
        if (!chartCanvas) return;
        
        // Get data from chart data
        const parameter = this.chartData.parameter;
        const variations = this.chartData.variations;
        const results = this.chartData.results;
        
        // Parameter display name
        const paramName = this.getParameterDisplayName(parameter);
        
        // Prepare chart data
        const labels = variations.map(value => this.formatParameterValue(parameter, value));
        const roiData = [];
        const paybackData = [];
        
        // Extract ROI data
        variations.forEach(variation => {
            const variationResults = results.variations[parameter][variation];
            if (variationResults) {
                roiData.push(variationResults.roi.percentage);
                paybackData.push(variationResults.roi.paybackPeriod);
            } else {
                roiData.push(null);
                paybackData.push(null);
            }
        });
        
        // Create datasets
        const datasets = [
            {
                label: 'ROI Percentage',
                data: roiData,
                borderColor: 'rgba(0, 200, 83, 1)',
                backgroundColor: 'rgba(0, 200, 83, 0.1)',
                fill: false,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Payback Period (months)',
                data: paybackData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                fill: false,
                tension: 0.4,
                yAxisID: 'y1'
            }
        ];
        
        // Create or update chart
        if (window.roiSensitivityChart) {
            window.roiSensitivityChart.data.labels = labels;
            window.roiSensitivityChart.data.datasets = datasets;
            window.roiSensitivityChart.options.scales.x.title.text = paramName;
            window.roiSensitivityChart.update();
        } else {
            window.roiSensitivityChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    if (context.dataset.label === 'ROI Percentage') {
                                        return `ROI: ${context.raw.toFixed(0)}%`;
                                    } else {
                                        return `Payback: ${context.raw.toFixed(1)} months`;
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: paramName
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'ROI Percentage'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Payback Period (months)'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
        }
    }
    
    runTornadoAnalysis(vendorId, baseInputs) {
        // Define parameters to test for tornado chart
        const parameters = [
            'deviceCount',
            'costParameters.portnoxBasePrice',
            'costParameters.portnoxDiscount',
            'costParameters.fteCost',
            'costParameters.fteAllocation',
            'costParameters.maintenancePercentage',
            'costParameters.riskReduction',
            'yearsToProject'
        ];
        
        // Run sensitivity analysis for each parameter with ±20% range
        const tornadoData = {};
        
        parameters.forEach(parameter => {
            // Generate variations (just -20% and +20%)
            const variations = this.generateParameterVariations(parameter, baseInputs, 20, 3).filter(
                (_, i) => i === 0 || i === 2 // Only take first and last values (-20% and +20%)
            );
            
            // Set up sensitivity config
            const sensitivityConfig = {};
            sensitivityConfig[parameter] = variations;
            
            // Run analysis
            if (this.calculator) {
                const results = this.calculator.runSensitivityAnalysis(vendorId, baseInputs, sensitivityConfig);
                
                // Store results
                tornadoData[parameter] = {
                    parameter: parameter,
                    displayName: this.getParameterDisplayName(parameter),
                    variations: variations,
                    tcoValues: variations.map(variation => 
                        results.variations[parameter][variation].costs.total
                    )
                };
            }
        });
        
        // Store tornado data
        this.tornadoData = tornadoData;
        
        // Update tornado chart
        this.updateTornadoChart();
        
        // Determine most sensitive parameter
        this.updateMostSensitiveParameter();
    }
    
    updateTornadoChart() {
        const chartCanvas = document.getElementById('tornado-chart');
        if (!chartCanvas || !this.tornadoData) return;
        
        // Get base TCO value from first parameter's results
        const firstParam = Object.keys(this.tornadoData)[0];
        const baseTco = this.chartData.results.baseTco.costs.total;
        
        // Calculate percentage changes from base
        const parameters = [];
        const decreaseValues = [];
        const increaseValues = [];
        
        Object.keys(this.tornadoData).forEach(param => {
            const paramData = this.tornadoData[param];
            
            // Calculate percentage changes
            const decreasePct = ((paramData.tcoValues[0] - baseTco) / baseTco) * 100;
            const increasePct = ((paramData.tcoValues[1] - baseTco) / baseTco) * 100;
            
            // Store data
            parameters.push(paramData.displayName);
            decreaseValues.push(decreasePct);
            increaseValues.push(increasePct);
        });
        
        // Sort by total impact (absolute sum of decrease and increase)
        const impacts = parameters.map((_, i) => Math.abs(decreaseValues[i]) + Math.abs(increaseValues[i]));
        const sortOrder = impacts.map((impact, i) => ({ impact, index: i }))
            .sort((a, b) => b.impact - a.impact)
            .map(item => item.index);
        
        // Apply sort order
        const sortedParams = sortOrder.map(i => parameters[i]);
        const sortedDecreases = sortOrder.map(i => decreaseValues[i]);
        const sortedIncreases = sortOrder.map(i => increaseValues[i]);
        
        // Create datasets
        const datasets = [
            {
                label: '-20% Change',
                data: sortedDecreases,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '+20% Change',
                data: sortedIncreases,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ];
        
        // Create or update chart
        if (window.tornadoChart) {
            window.tornadoChart.data.labels = sortedParams;
            window.tornadoChart.data.datasets = datasets;
            window.tornadoChart.update();
        } else {
            window.tornadoChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: sortedParams,
                    datasets: datasets
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw.toFixed(1)}% change in TCO`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'TCO Change (%)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateMultiParameterChart() {
        const chartCanvas = document.getElementById('multi-parameter-chart');
        if (!chartCanvas || Object.keys(this.chartData).length === 0) return;
        
        // Get parameters
        const mainParam = this.chartData.parameter;
        const mainVariations = this.chartData.variations;
        
        // Get second parameter
        const secondParamSelect = document.getElementById('second-parameter');
        if (!secondParamSelect) return;
        
        const secondParam = secondParamSelect.value;
        
        // Get current inputs
        const inputs = this.getCurrentInputs();
        
        // Get vendor
        const vendorId = document.getElementById('sensitivity-vendor').value;
        
        // Generate second parameter variations (3 points)
        const secondVariations = this.generateParameterVariations(secondParam, inputs, 30, 3);
        
        // Run multi-parameter analysis
        const multiData = [];
        const baseValue = this.getParameterValue(secondParam, inputs);
        
        // Define colors for second parameter variations
        const colors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ];
        
        // Generate label for second param variation
        const getVariationLabel = (value) => {
            if (value < baseValue) {
                return `${this.getParameterDisplayName(secondParam)} -30%`;
            } else if (value > baseValue) {
                return `${this.getParameterDisplayName(secondParam)} +30%`;
            } else {
                return `${this.getParameterDisplayName(secondParam)} (base)`;
            }
        };
        
        // Run analysis for each second parameter variation
        secondVariations.forEach((secondValue, index) => {
            // Create modified inputs
            const modifiedInputs = JSON.parse(JSON.stringify(inputs));
            
            // Apply second parameter variation
            this.setParameterValue(secondParam, modifiedInputs, secondValue);
            
            // Configure sensitivity analysis
            const sensitivityConfig = {};
            sensitivityConfig[mainParam] = mainVariations;
            
            // Run analysis
            if (this.calculator) {
                const results = this.calculator.runSensitivityAnalysis(vendorId, modifiedInputs, sensitivityConfig);
                
                // Extract TCO values
                const tcoValues = mainVariations.map(mainValue => {
                    return results.variations[mainParam][mainValue].costs.total;
                });
                
                // Create dataset
                multiData.push({
                    label: getVariationLabel(secondValue),
                    data: tcoValues,
                    borderColor: colors[index],
                    backgroundColor: colors[index].replace('1)', '0.1)'),
                    fill: false,
                    tension: 0.4
                });
            }
        });
        
        // Main parameter display name
        const mainParamName = this.getParameterDisplayName(mainParam);
        
        // Prepare labels
        const labels = mainVariations.map(value => this.formatParameterValue(mainParam, value));
        
        // Create or update chart
        if (window.multiParameterChart) {
            window.multiParameterChart.data.labels = labels;
            window.multiParameterChart.data.datasets = multiData;
            window.multiParameterChart.options.scales.x.title.text = mainParamName;
            window.multiParameterChart.update();
        } else {
            window.multiParameterChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: multiData
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: mainParamName
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Cost of Ownership'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    setParameterValue(parameter, inputs, value) {
        // Handle nested parameters
        if (parameter.includes('.')) {
            const parts = parameter.split('.');
            let obj = inputs;
            
            // Navigate to the appropriate object
            for (let i = 0; i < parts.length - 1; i++) {
                if (!obj[parts[i]]) {
                    obj[parts[i]] = {};
                }
                obj = obj[parts[i]];
            }
            
            // Set the value
            obj[parts[parts.length - 1]] = value;
        } else {
            // Handle top-level parameters
            inputs[parameter] = value;
        }
    }
    
    updateMostSensitiveParameter() {
        if (!this.tornadoData) return;
        
        // Find parameter with highest impact
        let highestImpact = 0;
        let mostSensitiveParam = null;
        
        Object.keys(this.tornadoData).forEach(param => {
            const paramData = this.tornadoData[param];
            
            // Calculate total impact (absolute difference between values)
            const impact = Math.abs(paramData.tcoValues[1] - paramData.tcoValues[0]);
            
            if (impact > highestImpact) {
                highestImpact = impact;
                mostSensitiveParam = param;
            }
        });
        
        // Update most sensitive parameter display
        const mostSensitiveToElem = document.getElementById('most-sensitive-to');
        if (mostSensitiveToElem && mostSensitiveParam) {
            mostSensitiveToElem.textContent = this.getParameterDisplayName(mostSensitiveParam);
        }
    }
    
    updateMetrics(results, parameter) {
        // Calculate elasticity factor
        const baseTco = results.baseTco.costs.total;
        const variations = this.chartData.variations;
        
        // Get min and max values
        const minValue = Math.min(...variations);
        const maxValue = Math.max(...variations);
        
        // Get corresponding TCO values
        let minTco = results.variations[parameter][minValue].costs.total;
        let maxTco = results.variations[parameter][maxValue].costs.total;
        
        // Calculate percentage changes
        const valueChange = (maxValue - minValue) / ((maxValue + minValue) / 2);
        const tcoChange = (maxTco - minTco) / ((maxTco + minTco) / 2);
        
        // Calculate elasticity
        const elasticity = Math.abs(tcoChange / valueChange);
        
        // Update elasticity factor
        const elasticityElem = document.getElementById('elasticity-factor');
        if (elasticityElem) {
            elasticityElem.textContent = `${elasticity.toFixed(1)}x`;
        }
        
        // Determine risk factor based on elasticity
        const riskElem = document.getElementById('risk-factor');
        if (riskElem) {
            if (elasticity < 0.5) {
                riskElem.textContent = 'Low';
            } else if (elasticity < 1.0) {
                riskElem.textContent = 'Medium-Low';
            } else if (elasticity < 1.5) {
                riskElem.textContent = 'Medium';
            } else if (elasticity < 2.0) {
                riskElem.textContent = 'Medium-High';
            } else {
                riskElem.textContent = 'High';
            }
        }
        
        // Calculate breakeven point for device count or other parameter
        const breakevenElem = document.getElementById('breakeven-point');
        if (breakevenElem) {
            if (parameter === 'deviceCount') {
                // Find breakeven point where ROI becomes positive
                let breakevenPoint = null;
                
                for (let i = 0; i < variations.length; i++) {
                    const variation = variations[i];
                    const roi = results.variations[parameter][variation].roi.percentage;
                    
                    if (roi > 0) {
                        breakevenPoint = variation;
                        break;
                    }
                }
                
                if (breakevenPoint !== null) {
                    breakevenElem.textContent = `${breakevenPoint} devices`;
                } else {
                    breakevenElem.textContent = 'Not found';
                }
            } else if (parameter === 'costParameters.portnoxBasePrice') {
                // Find price point where ROI drops below threshold
                let priceThreshold = null;
                
                for (let i = variations.length - 1; i >= 0; i--) {
                    const variation = variations[i];
                    const roi = results.variations[parameter][variation].roi.percentage;
                    
                    if (roi > 100) { // Use 100% ROI as threshold
                        priceThreshold = variation;
                        break;
                    }
                }
                
                if (priceThreshold !== null) {
                    breakevenElem.textContent = `$${priceThreshold.toFixed(2)}/device`;
                } else {
                    breakevenElem.textContent = 'Not found';
                }
            } else {
                // For other parameters, show N/A
                breakevenElem.textContent = 'N/A';
            }
        }
    }
    
    getParameterDisplayName(parameter) {
        // Map parameter to display name
        const displayNames = {
            'deviceCount': 'Device Count',
            'costParameters.portnoxBasePrice': 'Price per Device',
            'costParameters.portnoxDiscount': 'Volume Discount',
            'costParameters.fteCost': 'FTE Cost',
            'costParameters.fteAllocation': 'FTE Allocation',
            'costParameters.maintenancePercentage': 'Maintenance %',
            'costParameters.riskReduction': 'Risk Reduction %',
            'yearsToProject': 'Analysis Period'
        };
        
        return displayNames[parameter] || parameter;
    }
    
    formatParameterValue(parameter, value) {
        // Format value based on parameter type
        if (parameter === 'deviceCount') {
            return value.toLocaleString();
        } else if (parameter === 'yearsToProject') {
            return `${value} years`;
        } else if (parameter.includes('Percentage') || parameter.includes('Discount') || 
                   parameter.includes('Allocation') || parameter.includes('Reduction')) {
            return `${value}%`;
        } else if (parameter.includes('BasePrice')) {
            return `$${value.toFixed(2)}`;
        } else if (parameter.includes('Cost')) {
            return `$${value.toLocaleString()}`;
        } else {
            return value.toString();
        }
    }
    
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Initialize the component
window.sensitivityAnalysis = new SensitivityAnalysis();
