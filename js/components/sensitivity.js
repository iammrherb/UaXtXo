/**
 * Sensitivity Analysis Component for Total Cost Analyzer
 * Handles sensitivity analysis calculations and visualization
 */
const SensitivityAnalyzer = (function() {
    // Default parameters
    const defaultParams = {
        variable: 'deviceCount',
        min: 500,
        max: 5000,
        steps: 10,
        vendor: 'cisco'
    };
    
    // Chart instance
    let sensitivityChart = null;
    let sidebarChart = null;
    
    // Initialize sensitivity analysis
    function init() {
        console.log('Initializing sensitivity analyzer...');
        
        // Bind run button events
        const runButton = document.getElementById('run-sensitivity');
        const sidebarRunButton = document.getElementById('run-sensitivity-sidebar');
        
        if (runButton) {
            runButton.addEventListener('click', () => {
                const variable = document.getElementById('sensitivity-variable')?.value || defaultParams.variable;
                const min = parseFloat(document.getElementById('sensitivity-min')?.value) || getDefaultMin(variable);
                const max = parseFloat(document.getElementById('sensitivity-max')?.value) || getDefaultMax(variable);
                
                runSensitivityAnalysis(variable, min, max, 'sensitivity-chart');
            });
        }
        
        if (sidebarRunButton) {
            sidebarRunButton.addEventListener('click', () => {
                const variable = document.getElementById('sensitivity-variable-sidebar')?.value || defaultParams.variable;
                const min = parseFloat(document.getElementById('sensitivity-min-sidebar')?.value) || getDefaultMin(variable);
                const max = parseFloat(document.getElementById('sensitivity-max-sidebar')?.value) || getDefaultMax(variable);
                
                runSensitivityAnalysis(variable, min, max, 'sensitivity-chart-sidebar');
            });
        }
        
        // Set default values for inputs
        populateDefaultValues();
        
        // Initialize charts
        initSensitivityCharts();
        
        console.log('Sensitivity analyzer initialized');
    }
    
    // Initialize sensitivity charts
    function initSensitivityCharts() {
        const mainCtx = document.getElementById('sensitivity-chart');
        const sidebarCtx = document.getElementById('sensitivity-chart-sidebar');
        
        if (mainCtx) {
            sensitivityChart = createSensitivityChart(mainCtx);
        }
        
        if (sidebarCtx) {
            sidebarChart = createSensitivityChart(sidebarCtx);
        }
    }
    
    // Create sensitivity chart
    function createSensitivityChart(ctx) {
  // Check if chart instance already exists and destroy it
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }
  // Check if chart instance already exists and destroy it
  if (window.chartInstances && window.chartInstances[chartId]) {
    window.chartInstances[chartId].destroy();
  }
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Current Solution',
                        borderColor: '#9E2A2B',
                        backgroundColor: 'rgba(158, 42, 43, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        fill: true,
                        data: []
                    },
                    {
                        label: 'Portnox Cloud',
                        borderColor: '#05547C',
                        backgroundColor: 'rgba(5, 84, 124, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        fill: true,
                        data: []
                    },
                    {
                        label: 'Savings',
                        borderColor: '#65BD44',
                        backgroundColor: 'rgba(101, 189, 68, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 3,
                        fill: true,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Set default values for sensitivity inputs
    function populateDefaultValues() {
        // Main panel inputs
        const variable = document.getElementById('sensitivity-variable');
        const min = document.getElementById('sensitivity-min');
        const max = document.getElementById('sensitivity-max');
        
        if (variable) {
            variable.value = defaultParams.variable;
            updateMinMaxFields('deviceCount');
        }
        
        // Sidebar inputs
        const sidebarVariable = document.getElementById('sensitivity-variable-sidebar');
        const sidebarMin = document.getElementById('sensitivity-min-sidebar');
        const sidebarMax = document.getElementById('sensitivity-max-sidebar');
        
        if (sidebarVariable) {
            sidebarVariable.value = defaultParams.variable;
            updateSidebarMinMaxFields('deviceCount');
        }
        
        // Add event listeners to update min/max values when variable changes
        if (variable) {
            variable.addEventListener('change', (e) => {
                updateMinMaxFields(e.target.value);
            });
        }
        
        if (sidebarVariable) {
            sidebarVariable.addEventListener('change', (e) => {
                updateSidebarMinMaxFields(e.target.value);
            });
        }
    }
    
    // Update min/max fields based on selected variable
    function updateMinMaxFields(variable) {
        const min = document.getElementById('sensitivity-min');
        const max = document.getElementById('sensitivity-max');
        
        if (min && max) {
            min.value = getDefaultMin(variable);
            max.value = getDefaultMax(variable);
        }
    }
    
    // Update sidebar min/max fields
    function updateSidebarMinMaxFields(variable) {
        const min = document.getElementById('sensitivity-min-sidebar');
        const max = document.getElementById('sensitivity-max-sidebar');
        
        if (min && max) {
            min.value = getDefaultMin(variable);
            max.value = getDefaultMax(variable);
        }
    }
    
    // Get default minimum value for a variable
    function getDefaultMin(variable) {
        switch (variable) {
            case 'deviceCount':
                return 500;
            case 'cost':
                return 2;
            case 'fte':
                return 0.1;
            case 'implementation':
                return 3;
            default:
                return 0;
        }
    }
    
    // Get default maximum value for a variable
    function getDefaultMax(variable) {
        switch (variable) {
            case 'deviceCount':
                return 5000;
            case 'cost':
                return 10;
            case 'fte':
                return 1.5;
            case 'implementation':
                return 120;
            default:
                return 100;
        }
    }
    
    // Get variable display name
    function getVariableDisplayName(variable) {
        switch (variable) {
            case 'deviceCount':
                return 'Device Count';
            case 'cost':
                return 'Cost per Device ($)';
            case 'fte':
                return 'FTE Allocation (FTE)';
            case 'implementation':
                return 'Implementation Time (Days)';
            default:
                return variable;
        }
    }
    
    // Run sensitivity analysis
    function runSensitivityAnalysis(variable, min, max, chartId) {
        console.log(`Running sensitivity analysis on ${variable} from ${min} to ${max}`);
        
        // Show loading indicator
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Get active vendor from the UI
        const activeVendor = document.querySelector('.vendor-card.active')?.dataset.vendor || defaultParams.vendor;
        
        // Determine which chart to use
        const chart = chartId == 'sensitivity-chart-sidebar' ? sidebarChart : sensitivityChart;
        
        // Generate data points
        setTimeout(() => {
            const dataPoints = calculateSensitivityData(variable, min, max, activeVendor);
            updateSensitivityChart(chart, variable, dataPoints);
            
            // Hide loading indicator
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
        }, 500);
    }
    
    // Calculate sensitivity analysis data
    function calculateSensitivityData(variable, min, max, vendor) {
        const steps = 10;
        const stepSize = (max - min) / steps;
        
        const labels = [];
        const currentData = [];
        const portnoxData = [];
        const savingsData = [];
        
        // Base calculation parameters
        const baseParams = {
            vendor: vendor,
            industry: document.getElementById('industry-select')?.value || 'financial',
            organization: {
                size: document.getElementById('organization-size')?.value || 'medium',
                deviceCount: parseInt(document.getElementById('device-count')?.value) || 2500,
                locations: parseInt(document.getElementById('locations')?.value) || 5
            },
            costs: {
                fteCost: parseInt(document.getElementById('fte-cost')?.value) || 120000,
                fteAllocation: parseInt(document.getElementById('fte-allocation')?.value) || 50,
                maintenancePercentage: parseInt(document.getElementById('maintenance-percentage')?.value) || 18,
                consultingRate: parseInt(document.getElementById('consulting-rate')?.value) || 2000,
                implementationDays: parseInt(document.getElementById('implementation-days')?.value) || 60
            },
            portnox: {
                basePrice: parseFloat(document.getElementById('portnox-base-price')?.value) || 4,
                discount: parseInt(document.getElementById('portnox-discount')?.value) || 20
            },
            yearsToProject: parseInt(document.getElementById('years-to-project')?.value) || 3
        };
        
        // Get vendor data
        const vendorData = Calculator.getVendorData();
        const currentVendorInfo = vendorData[vendor] || vendorData.cisco;
        const portnoxInfo = vendorData.portnox;
        
        // Generate data points
        for (let i = 0; i <= steps; i++) {
            const value = min + (stepSize * i);
            labels.push(formatVariableValue(variable, value));
            
            // Clone base parameters and modify the variable being analyzed
            const params = JSON.parse(JSON.stringify(baseParams));
            
            switch (variable) {
                case 'deviceCount':
                    params.organization.deviceCount = value;
                    break;
                case 'cost':
                    // Adjust per-device cost
                    currentVendorInfo.baseCostPerDevice = value * 30; // Multiplier for current vendor
                    portnoxInfo.baseCostPerDevice = value * 12; // Multiplier for Portnox
                    break;
                case 'fte':
                    // Adjust FTE allocation
                    params.costs.fteAllocation = value * 100; // Convert to percentage
                    break;
                case 'implementation':
                    // Adjust implementation days
                    params.costs.implementationDays = value;
                    break;
            }
            
            // Calculate costs for current vendor at this value
            const currentVendorCost = calculateVendorCost(currentVendorInfo, params);
            currentData.push(currentVendorCost);
            
            // Calculate costs for Portnox at this value
            const portnoxCost = calculateVendorCost(portnoxInfo, params);
            portnoxData.push(portnoxCost);
            
            // Calculate savings
            savingsData.push(currentVendorCost - portnoxCost);
        }
        
        return {
            labels,
            currentData,
            portnoxData,
            savingsData
        };
    }
    
    // Calculate vendor cost
    function calculateVendorCost(vendorInfo, params) {
        const deviceCount = params.organization.deviceCount;
        const yearsToProject = params.yearsToProject;
        
        // License costs
        let annualLicenseCost = 0;
        if (vendorInfo.licenseType == 'Subscription') {
            // For subscription, annual fee per device
            annualLicenseCost = deviceCount * vendorInfo.baseCostPerDevice;
        } else if (vendorInfo.licenseType == 'Perpetual + Support') {
            // For perpetual, one-time fee + support
            const perpetualLicense = deviceCount * vendorInfo.baseCostPerDevice;
            const annualSupport = perpetualLicense * 0.2; // 20% annual support
            annualLicenseCost = (perpetualLicense / yearsToProject) + annualSupport;
        }
        
        // Hardware costs (amortized over years)
        const hardwareScalingFactor = Math.sqrt(deviceCount / 1000);
        const totalHardwareCost = vendorInfo.hardwareCost * hardwareScalingFactor;
        const annualHardwareCost = totalHardwareCost / yearsToProject;
        
        // Implementation costs
        const implementationDays = params.costs.implementationDays * vendorInfo.implementationFactor;
        const consultingCost = implementationDays * params.costs.consultingRate;
        const annualImplementationCost = consultingCost / yearsToProject;
        
        // Personnel costs (FTE)
        const fteAllocation = (params.costs.fteAllocation / 100) * vendorInfo.fteFactor;
        const annualFteCost = params.costs.fteCost * fteAllocation;
        
        // Maintenance costs
        const maintenancePercentage = params.costs.maintenancePercentage / 100 * vendorInfo.maintenanceFactor;
        const annualMaintenanceCost = totalHardwareCost * maintenancePercentage;
        
        // Training costs (amortized)
        const trainingCost = 5000 * vendorInfo.fteFactor; // Base training cost
        const annualTrainingCost = trainingCost / yearsToProject;
        
        // Total annual cost
        const annualTotalCost = annualLicenseCost + annualHardwareCost + annualImplementationCost + 
                                annualFteCost + annualMaintenanceCost + annualTrainingCost;
        
        return annualTotalCost * yearsToProject;
    }
    
    // Update sensitivity chart
    function updateSensitivityChart(chart, variable, data) {
        if (!chart) return;
        
        // Update chart labels and data
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.currentData;
        chart.data.datasets[1].data = data.portnoxData;
        chart.data.datasets[2].data = data.savingsData;
        
        // Update axis labels
        chart.options.scales.x.title = {
            display: true,
            text: getVariableDisplayName(variable)
        };
        
        chart.update();
    }
    
    // Format variable value for display
    function formatVariableValue(variable, value) {
        switch (variable) {
            case 'deviceCount':
                return value.toLocaleString();
            case 'cost':
        return 0; // Fixed syntax error
            case 'fte':
                return value.toFixed(2);
            case 'implementation':
                return value.toFixed(0) + ' days';
            default:
                return value.toString();
        }
    }
    
    // Public API
    return {
        init,
        runSensitivityAnalysis
    };
})();

// Initialize sensitivity analyzer when document is ready
document.addEventListener('DOMContentLoaded', function() {
    SensitivityAnalyzer.init();
});
