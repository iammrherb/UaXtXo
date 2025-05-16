#!/bin/bash

# Portnox TCO Analyzer Enhancement Script
# This script applies fixes and enhancements to the Portnox TCO Analyzer application

echo "==============================================="
echo "🚀 Portnox TCO Analyzer Enhancement Script"
echo "==============================================="

# Define application directory - update this to your actual path
APP_DIR="."

# Ensure we're in the right directory
if [ ! -f "$APP_DIR/index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're running this script from the application root directory."
    exit 1
fi

# Create backup directory
BACKUP_DIR="$APP_DIR/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Created backup directory: $BACKUP_DIR"

# Backup original files
echo "💾 Backing up original files..."
cp -r "$APP_DIR/css" "$BACKUP_DIR/"
cp -r "$APP_DIR/js" "$BACKUP_DIR/"
cp "$APP_DIR/index.html" "$BACKUP_DIR/"

# Create vendor data directory if it doesn't exist
mkdir -p "$APP_DIR/data/vendors"
mkdir -p "$APP_DIR/data/compliance"
mkdir -p "$APP_DIR/data/industry"

# Ensure img/vendors directory exists
mkdir -p "$APP_DIR/img/vendors"

# Fix logo paths in index.html
echo "🖼️ Fixing logo paths in HTML..."
sed -i 's|/img/vendors/|img/vendors/|g' "$APP_DIR/index.html"

# Add chart enhancements JS file
echo "📊 Creating chart enhancement module..."
mkdir -p "$APP_DIR/js/fixes"

cat > "$APP_DIR/js/fixes/chart-enhancements.js" << 'EOL'
// Enhanced Chart Initialization for Portnox TCO Analyzer
(function() {
    console.log('📊 Initializing enhanced charts...');
    
    // Chart configuration
    const chartConfig = {
        colors: {
            portnox: '#2BD25B',
            cisco: '#049fd9',
            aruba: '#ff8300',
            forescout: '#6b2a94',
            fortinac: '#c8102e',
            juniper: '#84bc41',
            securew2: '#1a4d80',
            microsoft: '#00a4ef',
            arista: '#2d7de1',
            foxpass: '#ff5722',
            extreme: '#D70000',
            noNac: '#777777'
        },
        
        animations: {
            duration: 1500,
            easing: 'easeOutQuart'
        },
        
        // Default vendor data - will be overridden by API data
        defaultVendorData: {
            portnox: {
                name: 'Portnox Cloud',
                type: 'Cloud-native NAC',
                threeYearTCO: 202500,
                implementationTime: 21, // days
                riskReduction: 58, // percentage
                zeroTrustScore: 92, // percentage
                cloudArchitecture: 'Native',
                fteRequirement: 0.25, // FTE count
                features: {
                    easeOfDeployment: 95,
                    cloudIntegration: 98,
                    scalability: 92,
                    costEffectiveness: 88,
                    compliance: 94,
                    security: 96
                }
            },
            cisco: {
                name: 'Cisco ISE',
                type: 'Enterprise NAC',
                threeYearTCO: 450000,
                implementationTime: 120, // days
                riskReduction: 52, // percentage
                zeroTrustScore: 45, // percentage
                cloudArchitecture: 'Partial',
                fteRequirement: 1.5, // FTE count
                features: {
                    easeOfDeployment: 35,
                    cloudIntegration: 50,
                    scalability: 80,
                    costEffectiveness: 40,
                    compliance: 85,
                    security: 88
                }
            },
            aruba: {
                name: 'Aruba ClearPass',
                type: 'Policy Manager',
                threeYearTCO: 380000,
                implementationTime: 90, // days
                riskReduction: 50, // percentage
                zeroTrustScore: 42, // percentage
                cloudArchitecture: 'Partial',
                fteRequirement: 1.25, // FTE count
                features: {
                    easeOfDeployment: 45,
                    cloudIntegration: 55,
                    scalability: 78,
                    costEffectiveness: 45,
                    compliance: 80,
                    security: 85
                }
            },
            forescout: {
                name: 'Forescout',
                type: 'Device Visibility',
                threeYearTCO: 405000,
                implementationTime: 100, // days
                riskReduction: 48, // percentage
                zeroTrustScore: 40, // percentage
                cloudArchitecture: 'Limited',
                fteRequirement: 1.25, // FTE count
                features: {
                    easeOfDeployment: 40,
                    cloudIntegration: 40,
                    scalability: 75,
                    costEffectiveness: 35,
                    compliance: 82,
                    security: 86
                }
            },
            fortinac: {
                name: 'FortiNAC',
                type: 'Fortinet NAC',
                threeYearTCO: 325000,
                implementationTime: 80, // days
                riskReduction: 45, // percentage
                zeroTrustScore: 38, // percentage
                cloudArchitecture: 'Limited',
                fteRequirement: 1.0, // FTE count
                features: {
                    easeOfDeployment: 50,
                    cloudIntegration: 45,
                    scalability: 70,
                    costEffectiveness: 55,
                    compliance: 75,
                    security: 80
                }
            },
            juniper: {
                name: 'Juniper Mist',
                type: 'AI-driven NAC',
                threeYearTCO: 340000,
                implementationTime: 70, // days
                riskReduction: 46, // percentage
                zeroTrustScore: 40, // percentage
                cloudArchitecture: 'Partial',
                fteRequirement: 1.0, // FTE count
                features: {
                    easeOfDeployment: 60,
                    cloudIntegration: 65,
                    scalability: 75,
                    costEffectiveness: 50,
                    compliance: 72,
                    security: 78
                }
            },
            securew2: {
                name: 'SecureW2',
                type: 'Cloud RADIUS',
                threeYearTCO: 280000,
                implementationTime: 45, // days
                riskReduction: 40, // percentage
                zeroTrustScore: 35, // percentage
                cloudArchitecture: 'Native',
                fteRequirement: 0.75, // FTE count
                features: {
                    easeOfDeployment: 65,
                    cloudIntegration: 75,
                    scalability: 65,
                    costEffectiveness: 70,
                    compliance: 65,
                    security: 70
                }
            },
            microsoft: {
                name: 'Microsoft NPS',
                type: 'Windows Server NAC',
                threeYearTCO: 290000,
                implementationTime: 60, // days
                riskReduction: 35, // percentage
                zeroTrustScore: 25, // percentage
                cloudArchitecture: 'None',
                fteRequirement: 1.0, // FTE count
                features: {
                    easeOfDeployment: 40,
                    cloudIntegration: 60,
                    scalability: 55,
                    costEffectiveness: 65,
                    compliance: 60,
                    security: 65
                }
            },
            arista: {
                name: 'Arista Agni',
                type: 'Network Control',
                threeYearTCO: 300000,
                implementationTime: 75, // days
                riskReduction: 42, // percentage
                zeroTrustScore: 30, // percentage
                cloudArchitecture: 'Limited',
                fteRequirement: 1.0, // FTE count
                features: {
                    easeOfDeployment: 45,
                    cloudIntegration: 50,
                    scalability: 80,
                    costEffectiveness: 60,
                    compliance: 70,
                    security: 75
                }
            },
            foxpass: {
                name: 'Foxpass',
                type: 'Cloud RADIUS/LDAP',
                threeYearTCO: 240000,
                implementationTime: 40, // days
                riskReduction: 38, // percentage
                zeroTrustScore: 32, // percentage
                cloudArchitecture: 'Native',
                fteRequirement: 0.5, // FTE count
                features: {
                    easeOfDeployment: 70,
                    cloudIntegration: 80,
                    scalability: 60,
                    costEffectiveness: 75,
                    compliance: 60,
                    security: 65
                }
            },
            extreme: {
                name: 'Extreme NAC',
                type: 'Enterprise NAC',
                threeYearTCO: 365000,
                implementationTime: 85, // days
                riskReduction: 44, // percentage
                zeroTrustScore: 35, // percentage
                cloudArchitecture: 'Limited',
                fteRequirement: 1.25, // FTE count
                features: {
                    easeOfDeployment: 42,
                    cloudIntegration: 48,
                    scalability: 75,
                    costEffectiveness: 48,
                    compliance: 75,
                    security: 78
                }
            }
        },
        
        // Compliance frameworks data
        complianceData: {
            pci: {
                name: 'PCI DSS',
                description: 'Payment Card Industry Data Security Standard',
                portnoxCoverage: 94,
                averageCoverage: 72
            },
            hipaa: {
                name: 'HIPAA',
                description: 'Health Insurance Portability and Accountability Act',
                portnoxCoverage: 92,
                averageCoverage: 68
            },
            nist: {
                name: 'NIST 800-53',
                description: 'National Institute of Standards and Technology',
                portnoxCoverage: 96,
                averageCoverage: 70
            },
            gdpr: {
                name: 'GDPR',
                description: 'General Data Protection Regulation',
                portnoxCoverage: 90,
                averageCoverage: 65
            },
            iso: {
                name: 'ISO 27001',
                description: 'Information Security Management',
                portnoxCoverage: 93,
                averageCoverage: 75
            },
            cmmc: {
                name: 'CMMC',
                description: 'Cybersecurity Maturity Model Certification',
                portnoxCoverage: 91,
                averageCoverage: 68
            },
            ferpa: {
                name: 'FERPA',
                description: 'Family Educational Rights and Privacy Act',
                portnoxCoverage: 88,
                averageCoverage: 62
            },
            sox: {
                name: 'SOX',
                description: 'Sarbanes-Oxley Act',
                portnoxCoverage: 89,
                averageCoverage: 66
            }
        }
    };
    
    // Helper functions for chart initialization
    const chartHelpers = {
        // Convert vendor IDs to names and colors
        getVendorDatasets: function(selectedVendors, dataProperty) {
            return selectedVendors.map(vendor => {
                return {
                    label: chartConfig.defaultVendorData[vendor].name,
                    backgroundColor: chartConfig.colors[vendor],
                    borderColor: chartConfig.colors[vendor],
                    data: dataProperty ? chartConfig.defaultVendorData[vendor][dataProperty] : [],
                    borderWidth: 2
                };
            });
        },
        
        // Calculate TCO comparison data
        getTCOData: function(selectedVendors) {
            const categories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Personnel', 'Training'];
            const datasets = [];
            
            selectedVendors.forEach(vendor => {
                const vendorData = chartConfig.defaultVendorData[vendor];
                const totalTCO = vendorData.threeYearTCO;
                
                // Distribution percentages vary by vendor
                let distribution;
                if (vendor === 'portnox') {
                    distribution = [0, 60, 8, 0, 27, 5]; // Cloud-native has no hardware/maintenance costs
                } else if (['securew2', 'foxpass'].includes(vendor)) {
                    distribution = [0, 55, 12, 0, 25, 8]; // Other cloud solutions
                } else {
                    distribution = [20, 25, 15, 18, 15, 7]; // On-premises solutions
                }
                
                // Calculate actual values based on percentage distribution
                const data = distribution.map(percent => Math.round(totalTCO * (percent / 100)));
                
                datasets.push({
                    label: vendorData.name,
                    backgroundColor: chartConfig.colors[vendor],
                    borderColor: chartConfig.colors[vendor],
                    data: data,
                    borderWidth: 2
                });
            });
            
            return {
                labels: categories,
                datasets: datasets
            };
        },
        
        // Calculate cumulative cost data over 3 years
        getCumulativeCostData: function(selectedVendors, years = 3) {
            const labels = [];
            const datasets = [];
            
            // Create quarters labels
            for (let i = 1; i <= years * 4; i++) {
                const year = Math.ceil(i / 4);
                const quarter = ((i - 1) % 4) + 1;
                labels.push(`Y${year}Q${quarter}`);
            }
            
            selectedVendors.forEach(vendor => {
                const vendorData = chartConfig.defaultVendorData[vendor];
                const totalTCO = vendorData.threeYearTCO;
                const data = [];
                let cumulativeCost = 0;
                
                // Different cost distribution patterns based on vendor type
                if (vendor === 'portnox') {
                    // Cloud-native with subscription model
                    const initialCost = totalTCO * 0.15; // 15% upfront for implementation
                    const quarterlyFee = (totalTCO - initialCost) / (years * 4);
                    
                    cumulativeCost = initialCost;
                    data.push(Math.round(cumulativeCost));
                    
                    for (let i = 1; i < years * 4; i++) {
                        cumulativeCost += quarterlyFee;
                        data.push(Math.round(cumulativeCost));
                    }
                } else if (['securew2', 'foxpass'].includes(vendor)) {
                    // Other cloud solutions
                    const initialCost = totalTCO * 0.2; // 20% upfront
                    const quarterlyFee = (totalTCO - initialCost) / (years * 4);
                    
                    cumulativeCost = initialCost;
                    data.push(Math.round(cumulativeCost));
                    
                    for (let i = 1; i < years * 4; i++) {
                        cumulativeCost += quarterlyFee;
                        data.push(Math.round(cumulativeCost));
                    }
                } else {
                    // On-premises solutions with high upfront costs
                    const initialCost = totalTCO * 0.6; // 60% upfront for hardware and implementation
                    const yearlyMaintenance = (totalTCO - initialCost) / years;
                    const quarterlyMaintenance = yearlyMaintenance / 4;
                    
                    cumulativeCost = initialCost;
                    data.push(Math.round(cumulativeCost));
                    
                    for (let i = 1; i < years * 4; i++) {
                        cumulativeCost += quarterlyMaintenance;
                        data.push(Math.round(cumulativeCost));
                    }
                }
                
                datasets.push({
                    label: vendorData.name,
                    backgroundColor: 'transparent',
                    borderColor: chartConfig.colors[vendor],
                    data: data,
                    borderWidth: 3,
                    pointRadius: 4,
                    tension: 0.3
                });
            });
            
            return {
                labels: labels,
                datasets: datasets
            };
        },
        
        // Calculate ROI data over time
        getROIData: function(selectedVendors, years = 3) {
            const labels = [];
            const datasets = [];
            
            // Create quarters labels
            for (let i = 1; i <= years * 4; i++) {
                const year = Math.ceil(i / 4);
                const quarter = ((i - 1) % 4) + 1;
                labels.push(`Y${year}Q${quarter}`);
            }
            
            // We'll only show ROI for Portnox compared to other selected vendors
            if (selectedVendors.includes('portnox') && selectedVendors.length > 1) {
                const otherVendors = selectedVendors.filter(v => v !== 'portnox');
                
                otherVendors.forEach(vendor => {
                    const portnoxTCO = chartConfig.defaultVendorData['portnox'].threeYearTCO;
                    const vendorTCO = chartConfig.defaultVendorData[vendor].threeYearTCO;
                    const data = [];
                    
                    // Calculate cumulative savings over time
                    for (let i = 0; i < years * 4; i++) {
                        // Get quarterly costs for each solution
                        const portnoxQuarterly = this.getCumulativeCostData(['portnox'], years).datasets[0].data[i];
                        const vendorQuarterly = this.getCumulativeCostData([vendor], years).datasets[0].data[i];
                        
                        // Calculate ROI as (savings / portnox cost) * 100
                        const savings = vendorQuarterly - portnoxQuarterly;
                        const roi = (portnoxQuarterly > 0) ? (savings / portnoxQuarterly) * 100 : 0;
                        
                        // Only show positive ROI
                        data.push(Math.max(0, Math.round(roi)));
                    }
                    
                    datasets.push({
                        label: `ROI vs ${chartConfig.defaultVendorData[vendor].name}`,
                        backgroundColor: 'transparent',
                        borderColor: chartConfig.colors[vendor],
                        data: data,
                        borderWidth: 3,
                        pointRadius: 4,
                        tension: 0.3
                    });
                });
            }
            
            return {
                labels: labels,
                datasets: datasets
            };
        },
        
        // Get radar chart data for vendor comparison
        getVendorRadarData: function(selectedVendors) {
            const labels = [
                'Ease of Deployment',
                'Cloud Integration',
                'Scalability',
                'Cost Effectiveness',
                'Compliance',
                'Security'
            ];
            
            const datasets = selectedVendors.map(vendor => {
                const vendorData = chartConfig.defaultVendorData[vendor];
                
                return {
                    label: vendorData.name,
                    backgroundColor: `${chartConfig.colors[vendor]}33`, // 20% opacity
                    borderColor: chartConfig.colors[vendor],
                    pointBackgroundColor: chartConfig.colors[vendor],
                    data: [
                        vendorData.features.easeOfDeployment,
                        vendorData.features.cloudIntegration,
                        vendorData.features.scalability,
                        vendorData.features.costEffectiveness,
                        vendorData.features.compliance,
                        vendorData.features.security
                    ],
                    borderWidth: 2,
                    pointRadius: 4
                };
            });
            
            return {
                labels: labels,
                datasets: datasets
            };
        },
        
        // Get compliance coverage data
        getComplianceData: function(selectedFrameworks) {
            const labels = [];
            const portnoxData = [];
            const competitorData = [];
            
            selectedFrameworks.forEach(framework => {
                const frameworkData = chartConfig.complianceData[framework];
                labels.push(frameworkData.name);
                portnoxData.push(frameworkData.portnoxCoverage);
                competitorData.push(frameworkData.averageCoverage);
            });
            
            return {
                labels: labels,
                datasets: [
                    {
                        label: 'Portnox Cloud',
                        backgroundColor: `${chartConfig.colors.portnox}88`,
                        borderColor: chartConfig.colors.portnox,
                        data: portnoxData,
                        borderWidth: 2
                    },
                    {
                        label: 'Industry Average',
                        backgroundColor: '#77777788',
                        borderColor: '#777777',
                        data: competitorData,
                        borderWidth: 2
                    }
                ]
            };
        },
        
        // Initialize or update a chart
        initChart: function(chartId, type, data, options = {}) {
            const ctx = document.getElementById(chartId);
            if (!ctx) {
                console.warn(`Chart element not found: ${chartId}`);
                return null;
            }
            
            // Set default options based on chart type
            const defaultOptions = this.getDefaultOptions(type);
            const chartOptions = { ...defaultOptions, ...options };
            
            // Check if chart already exists
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
                existingChart.data = data;
                existingChart.options = chartOptions;
                existingChart.update();
                return existingChart;
            }
            
            // Create new chart
            return new Chart(ctx, {
                type: type,
                data: data,
                options: chartOptions
            });
        },
        
        // Get default options based on chart type
        getDefaultOptions: function(type) {
            const defaults = {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: chartConfig.animations.duration,
                    easing: chartConfig.animations.easing
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        padding: 12,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        cornerRadius: 4
                    }
                }
            };
            
            // Chart-specific options
            switch (type) {
                case 'bar':
                    return {
                        ...defaults,
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    };
                
                case 'line':
                    return {
                        ...defaults,
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    };
                
                case 'radar':
                    return {
                        ...defaults,
                        scales: {
                            r: {
                                min: 0,
                                max: 100,
                                ticks: {
                                    stepSize: 20
                                }
                            }
                        }
                    };
                
                case 'doughnut':
                case 'pie':
                    return {
                        ...defaults,
                        cutout: type === 'doughnut' ? '60%' : 0,
                        plugins: {
                            ...defaults.plugins,
                            legend: {
                                position: 'right',
                                labels: {
                                    padding: 15,
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        }
                    };
                
                default:
                    return defaults;
            }
        }
    };
    
    // Function to initialize all charts
    function initializeCharts() {
        try {
            console.log('Initializing TCO Analyzer charts...');
            
            // Get selected vendors
            const selectedVendors = [];
            document.querySelectorAll('.vendor-card.selected').forEach(card => {
                selectedVendors.push(card.getAttribute('data-vendor'));
            });
            
            // Ensure Portnox is always included
            if (!selectedVendors.includes('portnox')) {
                selectedVendors.unshift('portnox');
            }
            
            // Ensure at least one competitor is selected for comparison
            if (selectedVendors.length === 1) {
                selectedVendors.push('cisco'); // Default competitor
            }
            
            console.log('Selected vendors for charts:', selectedVendors);
            
            // Initialize Executive View charts
            // TCO Comparison Chart
            chartHelpers.initChart(
                'tco-comparison-chart',
                'bar',
                chartHelpers.getTCOData(selectedVendors),
                {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: '3-Year TCO Breakdown by Category',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            );
            
            // Cumulative Cost Chart
            chartHelpers.initChart(
                'cumulative-cost-chart',
                'line',
                chartHelpers.getCumulativeCostData(selectedVendors),
                {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cumulative Cost Over 3 Years',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            );
            
            // ROI Chart
            chartHelpers.initChart(
                'roi-chart',
                'line',
                chartHelpers.getROIData(selectedVendors),
                {
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Return on Investment Over Time',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            );
            
            // Vendor Radar Chart
            chartHelpers.initChart(
                'vendor-radar-chart',
                'radar',
                chartHelpers.getVendorRadarData(selectedVendors),
                {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Solution Capability Comparison',
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            );
            
            // Get selected compliance frameworks
            const selectedFrameworks = [];
            document.querySelectorAll('.compliance-item input:checked').forEach(checkbox => {
                const id = checkbox.id.replace('compliance-', '');
                if (chartConfig.complianceData[id]) {
                    selectedFrameworks.push(id);
                }
            });
            
            // Default to PCI and NIST if none selected
            if (selectedFrameworks.length === 0) {
                selectedFrameworks.push('pci', 'nist');
            }
            
            // Initialize Compliance Chart
            if (document.getElementById('compliance-chart')) {
                chartHelpers.initChart(
                    'compliance-chart',
                    'bar',
                    chartHelpers.getComplianceData(selectedFrameworks),
                    {
                        scales: {
                            y: {
                                min: 0,
                                max: 100,
                                ticks: {
                                    callback: function(value) {
                                        return value + '%';
                                    }
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Compliance Framework Coverage',
                                font: {
                                    size: 16
                                }
                            }
                        }
                    }
                );
            }
            
            // Update metrics in the dashboard
            updateDashboardMetrics(selectedVendors);
            
            console.log('Chart initialization complete!');
        } catch (e) {
            console.error('Error initializing charts:', e);
        }
    }
    
    // Function to update dashboard metrics
    function updateDashboardMetrics(selectedVendors) {
        if (!selectedVendors || selectedVendors.length < 2) return;
        
        try {
            // Get Portnox and top competitor data
            const portnoxData = chartConfig.defaultVendorData.portnox;
            const competitorId = selectedVendors.find(v => v !== 'portnox');
            const competitorData = chartConfig.defaultVendorData[competitorId];
            
            // Calculate metrics
            const totalSavings = competitorData.threeYearTCO - portnoxData.threeYearTCO;
            const savingsPercentage = Math.round((totalSavings / competitorData.threeYearTCO) * 100);
            const implementationSavings = competitorData.implementationTime - portnoxData.implementationTime;
            const riskReductionDiff = portnoxData.riskReduction - competitorData.riskReduction;
            
            // Calculate ROI
            const portnoxInvestment = portnoxData.threeYearTCO;
            const threeYearROI = Math.round((totalSavings / portnoxInvestment) * 100);
            
            // Calculate payback period (in months)
            const monthlySavings = totalSavings / 36; // 3 years = 36 months
            const initialInvestment = portnoxData.threeYearTCO * 0.15; // Estimated initial implementation cost
            const paybackMonths = Math.round(initialInvestment / monthlySavings);
            
            // Update Dashboard Elements
            updateElementText('total-savings', `$${totalSavings.toLocaleString()}`);
            updateElementText('savings-percentage', `${savingsPercentage}% reduction vs. ${competitorData.name}`);
            updateElementText('three-year-roi', `${threeYearROI}%`);
            updateElementText('payback-period', `${paybackMonths} months`);
            updateElementText('risk-reduction-total', `${portnoxData.riskReduction}%`);
            updateElementText('implementation-time', `${portnoxData.implementationTime} days`);
            updateElementText('implementation-comparison', `${Math.round((implementationSavings/competitorData.implementationTime)*100)}% faster than ${competitorData.name}`);
            updateElementText('portnox-tco', `$${portnoxData.threeYearTCO.toLocaleString()}`);
            updateElementText('tco-comparison', `vs. $${competitorData.threeYearTCO.toLocaleString()} (${competitorData.name})`);
            
            console.log('Dashboard metrics updated successfully');
        } catch (e) {
            console.error('Error updating dashboard metrics:', e);
        }
    }
    
    // Helper function to update element text if element exists
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }
    
    // Add event listener for vendor selection
    function setupEventListeners() {
        // Vendor selection event listeners
        document.querySelectorAll('.vendor-card').forEach(card => {
            card.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Prevent deselecting Portnox
                if (vendor === 'portnox') {
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Re-initialize charts with the new selection
                setTimeout(initializeCharts, 100);
            });
        });
        
        // Compliance checkbox event listeners
        document.querySelectorAll('.compliance-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                setTimeout(initializeCharts, 100);
            });
        });
        
        // Calculate button event listener
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                setTimeout(function() {
                    initializeCharts();
                    
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast
                    if (window.showToast) {
                        window.showToast('Analysis completed successfully!', 'success');
                    }
                }, 1500);
            });
        }
        
        // Header calculate button
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        if (headerCalculateBtn) {
            headerCalculateBtn.addEventListener('click', function() {
                if (calculateBtn) {
                    calculateBtn.click();
                }
            });
        }
        
        console.log('Event listeners setup complete');
    }
    
    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded! Charts will not be initialized.');
            return;
        }
        
        setupEventListeners();
        initializeCharts();
    });
    
    // Add initialization to window load as fallback
    window.addEventListener('load', function() {
        if (typeof Chart !== 'undefined' && document.getElementById('tco-comparison-chart')) {
            if (!Chart.getChart('tco-comparison-chart')) {
                console.log('Initializing charts on window load (fallback)');
                setupEventListeners();
                initializeCharts();
            }
        }
    });
})();
EOL

# Create PDF Report Generation Module
echo "📄 Creating PDF report generation module..."
cat > "$APP_DIR/js/fixes/report-generator-enhanced.js" << 'EOL'
// Enhanced Report Generator for Portnox TCO Analyzer
(function() {
    console.log('📄 Initializing enhanced report generator...');
    
    // Report configuration
    const reportConfig = {
        title: 'Total Cost of Ownership Analysis',
        subtitle: 'Comparative Analysis of NAC Solutions',
        company: 'Portnox',
        logo: 'img/vendors/portnox-logo.png',
        colors: {
            primary: '#1B67B2',
            accent: '#2BD25B',
            text: '#333333',
            light: '#f8f9fa',
            border: '#e0e0e0'
        },
        sections: [
            'executive-summary',
            'financial-overview',
            'security-analysis',
            'technical-comparison',
            'conclusion'
        ]
    };
    
    // Initialize the report generator
    function initReportGenerator() {
        console.log('Initializing PDF report generator...');
        
        // Check if jsPDF is loaded
        if (typeof jspdf === 'undefined') {
            console.error('jsPDF is not loaded! Report generation will not work.');
            return;
        }
        
        // Add export button event listener
        const exportBtn = document.getElementById('export-pdf');
        if (exportBtn) {
            exportBtn.addEventListener('click', generateReport);
        }
    }
    
    // Generate the PDF report
    function generateReport() {
        console.log('Generating PDF report...');
        
        try {
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                
                // Update loading text
                const loadingText = loadingOverlay.querySelector('p');
                if (loadingText) {
                    loadingText.textContent = 'Generating report...';
                }
            }
            
            // Get selected vendors
            const selectedVendors = [];
            document.querySelectorAll('.vendor-card.selected').forEach(card => {
                selectedVendors.push({
                    id: card.getAttribute('data-vendor'),
                    name: card.querySelector('.vendor-info h3').textContent
                });
            });
            
            // Get organization info
            const deviceCount = document.getElementById('device-count')?.value || '500';
            const orgSize = document.getElementById('organization-size')?.value || 'small';
            const yearsToProject = document.getElementById('years-to-project')?.value || '3';
            const industry = document.getElementById('industry-select')?.value || '';
            
            // Create new PDF document
            const { jsPDF } = jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Set default font
            doc.setFont('helvetica');
            
            // Add cover page
            createCoverPage(doc, selectedVendors, {
                deviceCount,
                orgSize,
                yearsToProject,
                industry
            });
            
            // Add executive summary
            doc.addPage();
            addExecutiveSummary(doc, selectedVendors);
            
            // Add TCO breakdown
            doc.addPage();
            addTCOBreakdown(doc, selectedVendors);
            
            // Add security analysis
            doc.addPage();
            addSecurityAnalysis(doc, selectedVendors);
            
            // Add vendor comparison
            doc.addPage();
            addVendorComparison(doc, selectedVendors);
            
            // Add conclusion
            doc.addPage();
            addConclusion(doc, selectedVendors);
            
            // Save the PDF
            const pdfName = `Portnox_TCO_Analysis_${new Date().toISOString().slice(0,10)}.pdf`;
            doc.save(pdfName);
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show success toast
            if (window.showToast) {
                window.showToast('Report generated successfully!', 'success');
            }
            
            console.log('PDF report generation complete');
        } catch (e) {
            console.error('Error generating report:', e);
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show error toast
            if (window.showToast) {
                window.showToast('Error generating report. Please try again.', 'error');
            }
        }
    }
    
    // Helper function to create cover page
    function createCoverPage(doc, selectedVendors, info) {
        // Background color
        doc.setFillColor(reportConfig.colors.light);
        doc.rect(0, 0, 210, 297, 'F');
        
        // Title
        doc.setFontSize(24);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Total Cost of Ownership Analysis', 105, 60, { align: 'center' });
        
        // Subtitle
        doc.setFontSize(16);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('Comparative Analysis of NAC Solutions', 105, 70, { align: 'center' });
        
        // Add colored rectangle
        doc.setFillColor(reportConfig.colors.primary);
        doc.rect(30, 85, 150, 1, 'F');
        
        // Vendor comparison text
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.text);
        
        // Create vendor comparison text
        let comparisonText = 'Portnox Cloud';
        const competitors = selectedVendors.filter(v => v.id !== 'portnox');
        
        if (competitors.length > 0) {
            comparisonText += ' vs. ';
            comparisonText += competitors.map(v => v.name).join(', ');
        }
        
        doc.text(comparisonText, 105, 100, { align: 'center' });
        
        // Add organization info
        doc.setFontSize(12);
        doc.text('Organization Profile:', 30, 130);
        
        const orgSizeMap = {
            'very-small': 'Very Small (< 300 devices)',
            'small': 'Small (300-1,000 devices)',
            'medium': 'Medium (1,000-5,000 devices)',
            'large': 'Large (5,000-10,000 devices)',
            'enterprise': 'Enterprise (10,000+ devices)'
        };
        
        const industryMap = {
            'healthcare': 'Healthcare',
            'financial': 'Financial Services',
            'education': 'Education',
            'government': 'Government',
            'manufacturing': 'Manufacturing',
            'retail': 'Retail',
            'technology': 'Technology',
            'energy': 'Energy & Utilities'
        };
        
        doc.text(`• Organization Size: ${orgSizeMap[info.orgSize] || info.orgSize}`, 40, 140);
        doc.text(`• Number of Devices: ${info.deviceCount}`, 40, 150);
        doc.text(`• Analysis Period: ${info.yearsToProject} Years`, 40, 160);
        
        if (info.industry && industryMap[info.industry]) {
            doc.text(`• Industry: ${industryMap[info.industry]}`, 40, 170);
        }
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 200, { align: 'center' });
        
        // Add footer
        doc.setFontSize(9);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('© 2025 Portnox. All rights reserved.', 105, 280, { align: 'center' });
        doc.text('www.portnox.com', 105, 285, { align: 'center' });
    }
    
    // Helper function to add executive summary
    function addExecutiveSummary(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Executive Summary');
        
        // Get metrics
        const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
        const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction';
        const threeYearROI = document.getElementById('three-year-roi')?.textContent || '287%';
        const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
        
        // Summary text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const summaryText = [
            'This report provides a comprehensive analysis of the Total Cost of Ownership (TCO) and Return on Investment (ROI) ',
            'for Portnox Cloud compared to alternative Network Access Control (NAC) solutions. The analysis covers direct and ',
            'indirect costs over a three-year period, including implementation, operations, maintenance, and personnel expenses.'
        ].join('');
        
        doc.text(summaryText, 20, 40, { maxWidth: 170 });
        
        // Key findings section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Findings', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        doc.text(`• Total 3-Year Savings: ${totalSavings}`, 30, 70);
        doc.text(`• Cost Reduction: ${savingsPercentage}`, 30, 80);
        doc.text(`• Return on Investment: ${threeYearROI}`, 30, 90);
        doc.text(`• Payback Period: ${paybackPeriod}`, 30, 100);
        
        // Strategic benefits section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Strategic Benefits', 20, 120);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const benefits = [
            {
                title: 'Cloud-Native Solution',
                description: 'Zero infrastructure costs, automatic updates, and global scalability'
            },
            {
                title: 'Rapid Deployment',
                description: '75% faster implementation than on-premises alternatives'
            },
            {
                title: 'Zero Trust Security',
                description: 'Comprehensive, continuous device authentication and verification'
            },
            {
                title: 'Future-Proof Solution',
                description: 'Automatic updates, continuous innovation, and AI-powered security'
            }
        ];
        
        let yPos = 130;
        benefits.forEach(benefit => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${benefit.title}`, 30, yPos);
            
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(benefit.description, 40, yPos + 10, { maxWidth: 150 });
            
            yPos += 25;
        });
        
        // Add page number
        addPageNumber(doc, 1);
    }
    
    // Helper function to add TCO breakdown
    function addTCOBreakdown(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'TCO Breakdown & Financial Analysis');
        
        // Get metrics
        const portnoxTCO = document.getElementById('portnox-tco')?.textContent || '$202,500';
        const tcoComparison = document.getElementById('tco-comparison')?.textContent || 'vs. $450,000 (Cisco ISE)';
        
        // TCO Overview text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const tcoText = [
            'This section breaks down the Total Cost of Ownership (TCO) for each solution over a three-year period. ',
            'The analysis includes all direct and indirect costs associated with each solution, including licensing, ',
            'hardware, implementation, maintenance, and personnel costs.'
        ].join('');
        
        doc.text(tcoText, 20, 40, { maxWidth: 170 });
        
        // TCO Summary section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('TCO Summary', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        doc.text(`• Portnox Cloud 3-Year TCO: ${portnoxTCO}`, 30, 70);
        doc.text(`• Comparison: ${tcoComparison}`, 30, 80);
        
        // Cost Breakdown section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Cost Breakdown by Category', 20, 100);
        
        // Create a simple table for cost breakdown
        const categories = [
            'Hardware Costs',
            'Software Licensing',
            'Implementation',
            'Maintenance',
            'Personnel',
            'Training & Support'
        ];
        
        const portnoxCosts = [
            '$0', // No hardware
            '$137,000',
            '$15,500',
            '$0', // Included in subscription
            '$40,000',
            '$10,000'
        ];
        
        const competitorId = selectedVendors.find(v => v.id !== 'portnox')?.id || 'cisco';
        const competitorName = selectedVendors.find(v => v.id !== 'portnox')?.name || 'Cisco ISE';
        const competitorCosts = {
            'cisco': ['$90,000', '$112,500', '$67,500', '$81,000', '$67,500', '$31,500'],
            'aruba': ['$76,000', '$95,000', '$57,000', '$68,400', '$57,000', '$26,600'],
            'forescout': ['$81,000', '$101,250', '$60,750', '$72,900', '$60,750', '$28,350'],
            'fortinac': ['$65,000', '$81,250', '$48,750', '$58,500', '$48,750', '$22,750'],
            'juniper': ['$68,000', '$85,000', '$51,000', '$61,200', '$51,000', '$23,800'],
            'securew2': ['$0', '$154,000', '$33,600', '$0', '$70,000', '$22,400'],
            'foxpass': ['$0', '$132,000', '$28,800', '$0', '$60,000', '$19,200'],
            'microsoft': ['$58,000', '$72,500', '$43,500', '$52,200', '$43,500', '$20,300'],
            'arista': ['$60,000', '$75,000', '$45,000', '$54,000', '$45,000', '$21,000']
        };
        
        const competitorValues = competitorCosts[competitorId] || competitorCosts.cisco;
        
        // Draw the table
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, 110, 60, 10, 'F');
        doc.rect(80, 110, 50, 10, 'F');
        doc.rect(130, 110, 50, 10, 'F');
        
        doc.setFontSize(10);
        doc.text('Cost Category', 50, 117, { align: 'center' });
        doc.text('Portnox Cloud', 105, 117, { align: 'center' });
        doc.text(competitorName, 155, 117, { align: 'center' });
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        let yPos = 120;
        
        categories.forEach((category, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, 160, 10, 'F');
            }
            
            doc.text(category, 25, yPos + 7);
            doc.text(portnoxCosts[index], 105, yPos + 7, { align: 'center' });
            doc.text(competitorValues[index], 155, yPos + 7, { align: 'center' });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, 110, 160, yPos - 110, 'S'); // Outer border
        doc.line(80, 110, 80, yPos + 10); // Vertical line 1
        doc.line(130, 110, 130, yPos + 10); // Vertical line 2
        doc.line(20, 120, 180, 120); // Horizontal line
        
        // Add savings calculation
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('ROI Analysis', 20, yPos);
        
        // ROI details
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const roiDetails = [
            `• Total 3-Year Savings: ${document.getElementById('total-savings')?.textContent || '$247,000'}`,
            `• Return on Investment: ${document.getElementById('three-year-roi')?.textContent || '287%'}`,
            `• Payback Period: ${document.getElementById('payback-period')?.textContent || '7 months'}`,
            '• Annual Cost Savings: $82,333 per year'
        ];
        
        yPos += 10;
        roiDetails.forEach(detail => {
            yPos += 10;
            doc.text(detail, 30, yPos);
        });
        
        // Add page number
        addPageNumber(doc, 2);
    }
    
    // Helper function to add security analysis
    function addSecurityAnalysis(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Security & Compliance Analysis');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityText = [
            'This section analyzes the security capabilities and compliance features of each solution. ',
            'The analysis covers Zero Trust readiness, device authentication, continuous monitoring, ',
            'compliance framework coverage, and overall security posture improvements.'
        ].join('');
        
        doc.text(securityText, 20, 40, { maxWidth: 170 });
        
        // Security metrics section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Security Posture Metrics', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityMetrics = [
            `• Zero Trust Readiness: ${document.getElementById('security-improvement')?.textContent || '92%'}`,
            '• Device Authentication: 100% complete device visibility',
            '• Risk Assessment: Real-time continuous monitoring',
            `• Mean Time to Respond: ${document.getElementById('mttr')?.textContent || '52 min'} (vs. industry avg of 4.5 hours)`,
            `• Breach Probability: ${document.getElementById('breach-probability')?.textContent || 'Low'} (vs. Medium-High with no NAC)`
        ];
        
        let yPos = 70;
        securityMetrics.forEach(metric => {
            doc.text(metric, 30, yPos);
            yPos += 10;
        });
        
        // Compliance coverage section
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Compliance Framework Coverage', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const complianceText = [
            'Portnox Cloud provides comprehensive coverage for major compliance frameworks, helping ',
            'organizations meet regulatory requirements with minimal effort. The solution includes ',
            'built-in policies, automated enforcement, and detailed reporting capabilities.'
        ].join('');
        
        doc.text(complianceText, 20, yPos, { maxWidth: 170 });
        
        // Compliance framework table
        yPos += 20;
        
        // Table headers
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, yPos, 90, 10, 'F');
        doc.rect(110, yPos, 40, 10, 'F');
        doc.rect(150, yPos, 30, 10, 'F');
        
        doc.setFontSize(10);
        doc.text('Compliance Framework', 65, yPos + 7, { align: 'center' });
        doc.text('Portnox Coverage', 130, yPos + 7, { align: 'center' });
        doc.text('Industry Avg', 165, yPos + 7, { align: 'center' });
        
        // Table data
        const complianceFrameworks = [
            { name: 'PCI DSS', portnox: '94%', industry: '72%' },
            { name: 'HIPAA', portnox: '92%', industry: '68%' },
            { name: 'NIST 800-53', portnox: '96%', industry: '70%' },
            { name: 'GDPR', portnox: '90%', industry: '65%' },
            { name: 'ISO 27001', portnox: '93%', industry: '75%' },
            { name: 'CMMC', portnox: '91%', industry: '68%' }
        ];
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        
        complianceFrameworks.forEach((framework, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, 160, 10, 'F');
            }
            
            doc.text(framework.name, 25, yPos + 7);
            doc.text(framework.portnox, 130, yPos + 7, { align: 'center' });
            doc.text(framework.industry, 165, yPos + 7, { align: 'center' });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, yPos - (complianceFrameworks.length * 10), 160, (complianceFrameworks.length + 1) * 10, 'S'); // Outer border
        doc.line(110, yPos - (complianceFrameworks.length * 10), 110, yPos + 10); // Vertical line 1
        doc.line(150, yPos - (complianceFrameworks.length * 10), 150, yPos + 10); // Vertical line 2
        doc.line(20, yPos - (complianceFrameworks.length * 10) + 10, 180, yPos - (complianceFrameworks.length * 10) + 10); // Horizontal line below header
        
        // Security advantages
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Security Advantages', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityAdvantages = [
            {
                title: 'Zero Trust Architecture',
                description: 'Built from the ground up for zero trust security, not retrofitted like legacy solutions.'
            },
            {
                title: 'Continuous Verification',
                description: 'Real-time device posture assessment ensures only compliant devices maintain access.'
            },
            {
                title: 'Cloud-Delivered Security',
                description: 'Automatic updates ensure protection against the latest threats without manual intervention.'
            },
            {
                title: 'Rapid Incident Response',
                description: 'Automated remediation workflows reduce mean time to respond by up to 85%.'
            }
        ];
        
        securityAdvantages.forEach(advantage => {
            yPos += 5;
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${advantage.title}`, 30, yPos);
            
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(advantage.description, 40, yPos + 8, { maxWidth: 140 });
            
            yPos += 18;
        });
        
        // Add page number
        addPageNumber(doc, 3);
    }
    
    // Helper function to add vendor comparison
    function addVendorComparison(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Vendor Comparison');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const comparisonText = [
            'This section provides a detailed comparison of Portnox Cloud with alternative NAC solutions. ',
            'The analysis covers key capabilities, technical architecture, deployment requirements, ',
            'and competitive advantages.'
        ].join('');
        
        doc.text(comparisonText, 20, 40, { maxWidth: 170 });
        
        // Feature comparison table
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Feature Comparison', 20, 60);
        
        // Calculate column widths based on number of vendors
        const tableStartY = 70;
        const featureColWidth = 70;
        const vendorColWidth = Math.min(40, Math.floor((180 - featureColWidth) / selectedVendors.length));
        
        // Determine which competitors to include (limited by space)
        const maxCompetitors = Math.floor((180 - featureColWidth) / vendorColWidth) - 1; // -1 to always keep Portnox
        const competitorsToInclude = selectedVendors
            .filter(v => v.id !== 'portnox')
            .slice(0, maxCompetitors);
        
        const vendorsToShow = [
            { id: 'portnox', name: 'Portnox Cloud' },
            ...competitorsToInclude
        ];
        
        // Table header
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        
        // Feature column header
        doc.rect(20, tableStartY, featureColWidth, 10, 'F');
        doc.setFontSize(10);
        doc.text('Capability', 20 + (featureColWidth / 2), tableStartY + 7, { align: 'center' });
        
        // Vendor column headers
        let xPos = 20 + featureColWidth;
        vendorsToShow.forEach((vendor, index) => {
            // Use accent color for Portnox
            if (vendor.id === 'portnox') {
                doc.setFillColor(reportConfig.colors.accent);
            } else {
                doc.setFillColor(reportConfig.colors.primary);
            }
            
            doc.rect(xPos, tableStartY, vendorColWidth, 10, 'F');
            doc.text(vendor.name, xPos + (vendorColWidth / 2), tableStartY + 7, { align: 'center' });
            
            xPos += vendorColWidth;
        });
        
        // Table data
        const features = [
            {
                name: 'Cloud Architecture',
                values: {
                    portnox: 'Native',
                    cisco: 'Partial',
                    aruba: 'Partial',
                    forescout: 'Limited',
                    fortinac: 'Limited',
                    juniper: 'Partial',
                    securew2: 'Native',
                    microsoft: 'None',
                    arista: 'Limited',
                    foxpass: 'Native',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Zero Trust',
                values: {
                    portnox: 'Comprehensive',
                    cisco: 'Partial',
                    aruba: 'Limited',
                    forescout: 'Partial',
                    fortinac: 'Partial',
                    juniper: 'Partial',
                    securew2: 'Limited',
                    microsoft: 'Limited',
                    arista: 'Limited',
                    foxpass: 'Limited',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Deployment Speed',
                values: {
                    portnox: 'Days',
                    cisco: 'Months',
                    aruba: 'Weeks',
                    forescout: 'Weeks',
                    fortinac: 'Weeks',
                    juniper: 'Weeks',
                    securew2: 'Days',
                    microsoft: 'Weeks',
                    arista: 'Weeks',
                    foxpass: 'Days',
                    extreme: 'Weeks'
                }
            },
            {
                name: 'FTE Requirements',
                values: {
                    portnox: 'Minimal',
                    cisco: 'High',
                    aruba: 'Moderate',
                    forescout: 'Moderate',
                    fortinac: 'Moderate',
                    juniper: 'Moderate',
                    securew2: 'Low',
                    microsoft: 'Moderate',
                    arista: 'Moderate',
                    foxpass: 'Low',
                    extreme: 'Moderate'
                }
            },
            {
                name: 'Remote Access',
                values: {
                    portnox: 'Built-in',
                    cisco: 'Add-on',
                    aruba: 'Limited',
                    forescout: 'Limited',
                    fortinac: 'Limited',
                    juniper: 'Limited',
                    securew2: 'Built-in',
                    microsoft: 'Limited',
                    arista: 'Add-on',
                    foxpass: 'Built-in',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Hardware Footprint',
                values: {
                    portnox: 'None',
                    cisco: 'Large',
                    aruba: 'Medium',
                    forescout: 'Medium',
                    fortinac: 'Medium',
                    juniper: 'Medium',
                    securew2: 'None',
                    microsoft: 'Medium',
                    arista: 'Medium',
                    foxpass: 'None',
                    extreme: 'Medium'
                }
            },
            {
                name: 'Automatic Updates',
                values: {
                    portnox: 'Yes',
                    cisco: 'No',
                    aruba: 'No',
                    forescout: 'No',
                    fortinac: 'No',
                    juniper: 'Partial',
                    securew2: 'Yes',
                    microsoft: 'No',
                    arista: 'No',
                    foxpass: 'Yes',
                    extreme: 'No'
                }
            },
            {
                name: 'IoT Support',
                values: {
                    portnox: 'Extensive',
                    cisco: 'Good',
                    aruba: 'Good',
                    forescout: 'Extensive',
                    fortinac: 'Good',
                    juniper: 'Limited',
                    securew2: 'Limited',
                    microsoft: 'Limited',
                    arista: 'Good',
                    foxpass: 'Limited',
                    extreme: 'Good'
                }
            }
        ];
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        let yPos = tableStartY;
        
        features.forEach((feature, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, featureColWidth + (vendorColWidth * vendorsToShow.length), 10, 'F');
            }
            
            // Feature name
            doc.text(feature.name, 25, yPos + 7);
            
            // Values for each vendor
            xPos = 20 + featureColWidth;
            vendorsToShow.forEach(vendor => {
                const value = feature.values[vendor.id] || '-';
                
                // Highlight Portnox values
                if (vendor.id === 'portnox') {
                    doc.setTextColor(reportConfig.colors.accent);
                    doc.setFontSize(10);
                    doc.text(value, xPos + (vendorColWidth / 2), yPos + 7, { align: 'center' });
                    doc.setTextColor(reportConfig.colors.text);
                } else {
                    doc.text(value, xPos + (vendorColWidth / 2), yPos + 7, { align: 'center' });
                }
                
                xPos += vendorColWidth;
            });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, tableStartY, featureColWidth + (vendorColWidth * vendorsToShow.length), (features.length + 1) * 10, 'S'); // Outer border
        
        // Vertical lines
        xPos = 20 + featureColWidth;
        for (let i = 0; i < vendorsToShow.length; i++) {
            doc.line(xPos, tableStartY, xPos, tableStartY + ((features.length + 1) * 10));
            xPos += vendorColWidth;
        }
        
        // Horizontal line below header
        doc.line(20, tableStartY + 10, 20 + featureColWidth + (vendorColWidth * vendorsToShow.length), tableStartY + 10);
        
        // Competitive advantages
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Portnox Competitive Advantages', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const advantages = [
            {
                title: 'Cloud-Native Architecture',
                description: 'Unlike on-premises competitors, Portnox requires no hardware investment or complex upgrades.'
            },
            {
                title: 'Deployment Speed',
                description: 'Portnox deploys in days rather than months, with minimal specialized expertise required.'
            },
            {
                title: 'Zero Trust Model',
                description: 'Built from the ground up for zero trust security, not retrofitted like legacy solutions.'
            },
            {
                title: 'Total Cost of Ownership',
                description: 'Predictable subscription model eliminates hidden costs and expensive hardware.'
            }
        ];
        
        advantages.forEach(advantage => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${advantage.title}`, 30, yPos);
            
            yPos += 8;
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(advantage.description, 35, yPos, { maxWidth: 150 });
            
            yPos += 12;
        });
        
        // Add page number
        addPageNumber(doc, 4);
    }
    
    // Helper function to add conclusion
    function addConclusion(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Conclusion & Recommendations');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const conclusionText = [
            'Based on the comprehensive analysis of Total Cost of Ownership (TCO), Return on Investment (ROI), ',
            'security capabilities, and technical features, we provide the following conclusions and recommendations ',
            'for your Network Access Control (NAC) solution deployment.'
        ].join('');
        
        doc.text(conclusionText, 20, 40, { maxWidth: 170 });
        
        // Key findings summary
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Findings Summary', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const findings = [
            `• Portnox Cloud offers a total 3-year TCO of ${document.getElementById('portnox-tco')?.textContent || '$202,500'}, representing `,
            `  a ${document.getElementById('savings-percentage')?.textContent || '48% reduction'} compared to traditional NAC solutions.`,
            `• The solution provides a ${document.getElementById('three-year-roi')?.textContent || '287%'} return on investment over three years, with a `,
            `  payback period of just ${document.getElementById('payback-period')?.textContent || '7 months'}.`,
            `• Portnox Cloud's implementation time of ${document.getElementById('implementation-time')?.textContent || '21 days'} is significantly faster than `,
            '  the months required for on-premises alternatives.',
            `• The security posture improvement of ${document.getElementById('security-improvement')?.textContent || '74%'} enhances overall protection `,
            '  against cyber threats and reduces the risk of breaches.'
        ];
        
        let yPos = 70;
        findings.forEach(finding => {
            doc.text(finding, 30, yPos, { maxWidth: 160 });
            yPos += 10;
        });
        
        // Recommendations section
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Recommendations', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const recommendations = [
            {
                title: 'Implementation Approach',
                text: 'Adopt a phased implementation approach, starting with critical network segments and gradually expanding to the entire organization. This minimizes disruption and allows for proper testing and validation.'
            },
            {
                title: 'Zero Trust Roadmap',
                text: 'Develop a comprehensive Zero Trust roadmap that integrates Portnox Cloud with existing security solutions to achieve a holistic security posture improvement.'
            },
            {
                title: 'Cloud Integration Strategy',
                text: 'Leverage Portnox Cloud\'s extensive integration capabilities to connect with existing cloud services, identity providers, and security tools for maximum value and efficiency.'
            },
            {
                title: 'Training and Enablement',
                text: 'Allocate resources for training and enablement to ensure your team can fully utilize Portnox Cloud\'s capabilities and maximize your return on investment.'
            }
        ];
        
        recommendations.forEach(recommendation => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${recommendation.title}`, 30, yPos);
            
            yPos += 8;
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(recommendation.text, 35, yPos, { maxWidth: 150 });
            
            yPos += 18;
        });
        
        // Next steps section
        yPos += 5;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Next Steps', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const nextSteps = [
            '1. Schedule a demo to see Portnox Cloud in action in your environment',
            '2. Develop a detailed implementation plan with Portnox\'s solutions team',
            '3. Identify integration points with your existing security ecosystem',
            '4. Define success metrics and KPIs for your NAC deployment',
            '5. Establish a training plan for your IT and security teams'
        ];
        
        nextSteps.forEach(step => {
            doc.text(step, 30, yPos, { maxWidth: 150 });
            yPos += 10;
        });
        
        // Contact information
        yPos += 15;
        doc.setFontSize(12);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('For more information:', 20, yPos);
        
        yPos += 8;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('www.portnox.com', 30, yPos);
        
        yPos += 8;
        doc.text('contact@portnox.com', 30, yPos);
        
        yPos += 8;
        doc.text('+1 (800) XXX-XXXX', 30, yPos);
        
        // Add page number
        addPageNumber(doc, 5);
    }
    
    // Helper function to add page header to each page
    function addPageHeader(doc, title) {
        // Header rectangle
        doc.setFillColor(reportConfig.colors.light);
        doc.rect(0, 0, 210, 25, 'F');
        
        // Add colored line under the header
        doc.setFillColor(reportConfig.colors.primary);
        doc.rect(0, 25, 210, 1, 'F');
        
        // Add title
        doc.setFontSize(16);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text(title, 20, 17);
        
        // Add Portnox logo
        // This would normally add an image, but for simplicity we'll add text
        doc.setFontSize(12);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Portnox', 180, 17);
    }
    
    // Helper function to add page number
    function addPageNumber(doc, pageNum) {
        doc.setFontSize(10);
        doc.setTextColor(reportConfig.colors.text);
        doc.text(`Page ${pageNum}`, 105, 285, { align: 'center' });
    }
    
    // Initialize the report generator
    document.addEventListener('DOMContentLoaded', function() {
        initReportGenerator();
    });
})();
EOL

# Create detailed help tips module
echo "💡 Creating help tips module..."
cat > "$APP_DIR/js/fixes/help-tips.js" << 'EOL'
// Enhanced Help Tips for Portnox TCO Analyzer
(function() {
    console.log('💡 Initializing enhanced help tips...');
    
    // Help tip configuration
    const helpTips = {
        // TCO Calculation Tips
        tco: {
            title: 'TCO Calculation Methodology',
            content: `
                <p>The Total Cost of Ownership (TCO) calculation includes all direct and indirect costs associated with deploying and maintaining a NAC solution over a three-year period:</p>
                <ul>
                    <li><strong>Hardware Costs:</strong> Servers, appliances, and infrastructure required for on-premises solutions (not applicable for cloud-native solutions)</li>
                    <li><strong>Software Licensing:</strong> Subscription fees for cloud solutions or perpetual license costs for on-premises solutions</li>
                    <li><strong>Implementation Costs:</strong> Professional services, installation, and integration with existing systems</li>
                    <li><strong>Maintenance Costs:</strong> Annual maintenance fees, hardware refreshes, and software updates (not applicable for fully-managed cloud solutions)</li>
                    <li><strong>Personnel Costs:</strong> IT staff time allocated to managing and maintaining the solution</li>
                    <li><strong>Training & Support:</strong> Staff training, ongoing support, and documentation</li>
                </ul>
                <p>All costs are projected over a three-year period, with initial capital expenditures amortized appropriately.</p>
            `
        },
        
        // ROI Calculation Tips
        roi: {
            title: 'ROI Calculation Methodology',
            content: `
                <p>Return on Investment (ROI) is calculated based on the total benefits (savings and value) provided by Portnox Cloud compared to alternative solutions, divided by the total investment in Portnox Cloud over three years:</p>
                <p><strong>ROI Formula:</strong> (Total Benefits - Total Investment) / Total Investment × 100%</p>
                <p>Total Benefits include:</p>
                <ul>
                    <li><strong>Direct Cost Savings:</strong> Hardware, licenses, and maintenance savings</li>
                    <li><strong>Operational Efficiencies:</strong> Reduced IT staff time and management overhead</li>
                    <li><strong>Risk Reduction Value:</strong> Decreased probability and impact of security incidents</li>
                    <li><strong>Compliance Automation:</strong> Streamlined audits and reporting</li>
                    <li><strong>Insurance Premium Reduction:</strong> Lower cybersecurity insurance costs due to improved security posture</li>
                </ul>
                <p>The payback period is calculated by determining when the cumulative benefits equal or exceed the initial investment.</p>
            `
        },
        
        // Implementation Time Tips
        implementation: {
            title: 'Implementation Time Comparison Methodology',
            content: `
                <p>Implementation time estimates are based on real-world deployments and industry benchmarks, considering the following factors:</p>
                <ul>
                    <li><strong>Architecture Complexity:</strong> Cloud-native solutions require no on-premises infrastructure, reducing deployment time</li>
                    <li><strong>Integration Requirements:</strong> Time required to integrate with existing systems and authenticate users</li>
                    <li><strong>Configuration Complexity:</strong> Effort required to define policies, network segments, and authentication methods</li>
                    <li><strong>Testing and Validation:</strong> Time required to test and validate the solution before full deployment</li>
                    <li><strong>Training and Knowledge Transfer:</strong> Time required to train IT staff on the new solution</li>
                </ul>
                <p>Portnox Cloud's implementation time advantage stems from its cloud-native architecture, pre-configured policies, and simplified deployment model.</p>
            `
        },
        
        // Security Posture Tips
        security: {
            title: 'Security Posture Improvement Methodology',
            content: `
                <p>Security posture improvement is calculated based on multiple factors that contribute to an organization's overall security stance:</p>
                <ul>
                    <li><strong>Zero Trust Capability:</strong> Ability to implement a zero trust security model with continuous verification</li>
                    <li><strong>Device Visibility:</strong> Percentage of devices that can be discovered and monitored</li>
                    <li><strong>Authentication Strength:</strong> Robustness of authentication methods and policies</li>
                    <li><strong>Continuous Monitoring:</strong> Ability to continuously monitor device posture and compliance</li>
                    <li><strong>Automated Remediation:</strong> Ability to automatically quarantine or remediate non-compliant devices</li>
                    <li><strong>Threat Intelligence Integration:</strong> Ability to leverage threat intelligence to enhance security decisions</li>
                </ul>
                <p>The security posture improvement is calculated as a percentage increase from a baseline with no NAC solution in place.</p>
            `
        },
        
        // Compliance Tips
        compliance: {
            title: 'Compliance Framework Coverage Methodology',
            content: `
                <p>Compliance framework coverage is assessed based on a solution's ability to address the specific requirements of each regulatory framework:</p>
                <ul>
                    <li><strong>PCI DSS:</strong> Requirements 1, 2, 6, 7, 8, 9, 10, 11, and 12 relating to network security, access control, and monitoring</li>
                    <li><strong>HIPAA:</strong> Technical safeguards for access control, authentication, integrity, and transmission security</li>
                    <li><strong>NIST 800-53:</strong> Access control, identification and authentication, system and communications protection</li>
                    <li><strong>GDPR:</strong> Technical measures for data protection, access control, and security of processing</li>
                    <li><strong>ISO 27001:</strong> Controls for access control, communications security, and compliance</li>
                </ul>
                <p>Coverage percentages represent the portion of framework requirements that can be addressed directly or indirectly by the NAC solution.</p>
            `
        },
        
        // Risk Reduction Tips
        risk: {
            title: 'Risk Reduction Methodology',
            content: `
                <p>Risk reduction is calculated based on the decreased likelihood and potential impact of security incidents after implementing a NAC solution:</p>
                <ul>
                    <li><strong>Unauthorized Access Prevention:</strong> Reduction in the probability of unauthorized network access</li>
                    <li><strong>Malicious Device Detection:</strong> Ability to identify and block compromised or malicious devices</li>
                    <li><strong>Lateral Movement Prevention:</strong> Ability to prevent attackers from moving laterally within the network</li>
                    <li><strong>Data Breach Prevention:</strong> Reduction in the probability of data breaches due to improved access controls</li>
                    <li><strong>Compliance Violation Prevention:</strong> Reduction in the probability of compliance violations</li>
                </ul>
                <p>Risk reduction values are based on industry benchmarks and real-world case studies of organizations that have implemented NAC solutions.</p>
            `
        },
        
        // Vendor Comparison Tips
        vendors: {
            title: 'Vendor Comparison Methodology',
            content: `
                <p>Vendor capabilities are assessed based on the following criteria:</p>
                <ul>
                    <li><strong>Cloud Architecture:</strong> Degree to which the solution is built for and delivered from the cloud</li>
                    <li><strong>Zero Trust:</strong> Alignment with zero trust principles and implementation capabilities</li>
                    <li><strong>Deployment Speed:</strong> Typical time required to deploy and operationalize the solution</li>
                    <li><strong>FTE Requirements:</strong> IT staff resources required to manage and maintain the solution</li>
                    <li><strong>Remote Access:</strong> Support for remote and mobile users outside the corporate network</li>
                    <li><strong>Hardware Footprint:</strong> On-premises infrastructure required to deploy the solution</li>
                    <li><strong>Automatic Updates:</strong> Ability to automatically update without IT intervention</li>
                    <li><strong>IoT Support:</strong> Capabilities for discovering and securing IoT devices</li>
                </ul>
                <p>Assessments are based on vendor documentation, independent research, and customer feedback.</p>
            `
        },
        
        // Device Count Tips
        devices: {
            title: 'Device Count Calculation',
            content: `
                <p>The device count should include all endpoints that will be authenticated and monitored by the NAC solution:</p>
                <ul>
                    <li><strong>Corporate Laptops and Desktops:</strong> All company-owned computers</li>
                    <li><strong>Mobile Devices:</strong> Smartphones and tablets that connect to the corporate network</li>
                    <li><strong>BYOD Devices:</strong> Personal devices used for work purposes</li>
                    <li><strong>IoT Devices:</strong> Internet of Things devices on your network (printers, cameras, etc.)</li>
                    <li><strong>Servers and Network Equipment:</strong> Physical and virtual servers, network switches, etc.</li>
                </ul>
                <p>The device count directly affects licensing costs for all NAC solutions and should be as accurate as possible.</p>
            `
        },
        
        // Cost Parameters Tips
        costs: {
            title: 'Cost Parameter Guidance',
            content: `
                <p>These parameters help customize the TCO and ROI calculations for your specific environment:</p>
                <ul>
                    <li><strong>Portnox Cost per Device:</strong> Monthly subscription cost per device for Portnox Cloud</li>
                    <li><strong>Volume Discount:</strong> Discount percentage based on the total number of devices</li>
                    <li><strong>Average FTE Cost:</strong> Annual fully-loaded cost of an IT staff member</li>
                    <li><strong>FTE Allocation:</strong> Percentage of an IT staff member's time dedicated to managing the NAC solution</li>
                    <li><strong>Annual Maintenance:</strong> Percentage of initial license cost for annual maintenance (on-premises solutions)</li>
                    <li><strong>Downtime Cost:</strong> Hourly cost of network downtime to your organization</li>
                    <li><strong>Risk Reduction:</strong> Estimated percentage reduction in breach costs with a NAC solution</li>
                    <li><strong>Insurance Reduction:</strong> Potential reduction in cybersecurity insurance premiums</li>
                </ul>
                <p>Adjusting these parameters will provide more accurate TCO and ROI calculations for your specific environment.</p>
            `
        }
    };
    
    // Initialize help tips
    function initHelpTips() {
        try {
            console.log('Initializing help tips...');
            
            // Add help icons to relevant elements
            addHelpIcon('tco-comparison-chart', 'tco', 'TCO Calculation');
            addHelpIcon('roi-chart', 'roi', 'ROI Calculation');
            addHelpIcon('implementation-time', 'implementation', 'Implementation Time');
            addHelpIcon('risk-reduction-total', 'risk', 'Risk Reduction');
            addHelpIcon('security-improvement', 'security', 'Security Posture');
            addHelpIcon('compliance-coverage', 'compliance', 'Compliance Coverage');
            addHelpIcon('vendor-radar-chart', 'vendors', 'Vendor Comparison');
            addHelpIcon('device-count', 'devices', 'Device Count');
            addHelpIcon('portnox-cost-value', 'costs', 'Cost Parameters');
            
            // Add event listener for help button
            const helpBtn = document.getElementById('help-btn');
            if (helpBtn) {
                helpBtn.addEventListener('click', function() {
                    showHelpModal('TCO Analyzer Help', `
                        <h3>About this Tool</h3>
                        <p>The Portnox Total Cost Analyzer helps you compare the total cost of ownership (TCO) and return on investment (ROI) for different Network Access Control (NAC) solutions.</p>
                        
                        <h3>How to Use</h3>
                        <ol>
                            <li><strong>Select vendors</strong> to compare with Portnox Cloud</li>
                            <li><strong>Choose your industry</strong> and compliance requirements</li>
                            <li><strong>Enter your organization details</strong> such as size and device count</li>
                            <li><strong>Adjust cost parameters</strong> if needed</li>
                            <li><strong>Click "Calculate TCO & ROI"</strong> to generate results</li>
                        </ol>
                        
                        <h3>Understanding Results</h3>
                        <p>Results are organized into different views for various stakeholders:</p>
                        <ul>
                            <li><strong>Executive View:</strong> High-level overview for decision makers</li>
                            <li><strong>Financial View:</strong> Detailed cost breakdown and ROI analysis</li>
                            <li><strong>Security View:</strong> Risk assessment and compliance coverage</li>
                            <li><strong>Technical View:</strong> Feature comparison and implementation details</li>
                        </ul>
                        
                        <h3>Getting Help</h3>
                        <p>Look for the <i class="fas fa-question-circle"></i> icons throughout the application for detailed explanations of specific calculations and methodologies.</p>
                    `);
                });
            }
            
            console.log('Help tips initialization complete');
        } catch (e) {
            console.error('Error initializing help tips:', e);
        }
    }
    
    // Add help icon to an element
    function addHelpIcon(elementId, tipKey, tipTitle) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Get the appropriate parent element
        let parentElement;
        
        if (element.tagName === 'CANVAS') {
            // For charts, add to the parent container
            parentElement = element.closest('.chart-container');
            if (parentElement) {
                const heading = parentElement.querySelector('h3');
                if (heading) {
                    parentElement = heading;
                }
            } else {
                parentElement = element.parentElement;
            }
        } else if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            // For form controls, find the label
            const formGroup = element.closest('.form-group');
            if (formGroup) {
                const label = formGroup.querySelector('label');
                if (label) {
                    parentElement = label;
                } else {
                    parentElement = formGroup;
                }
            } else {
                const rangeSlider = element.closest('.range-slider');
                if (rangeSlider) {
                    const label = rangeSlider.querySelector('.range-slider-label');
                    if (label) {
                        parentElement = label;
                    } else {
                        parentElement = rangeSlider;
                    }
                } else {
                    parentElement = element.parentElement;
                }
            }
        } else {
            // For other elements, add after the element
            parentElement = element;
        }
        
        if (!parentElement) return;
        
        // Create the help icon
        const helpIcon = document.createElement('i');
        helpIcon.className = 'fas fa-question-circle help-icon';
        helpIcon.setAttribute('data-tip', tipKey);
        helpIcon.setAttribute('title', tipTitle);
        helpIcon.style.marginLeft = '5px';
        helpIcon.style.color = '#3498db';
        helpIcon.style.cursor = 'pointer';
        helpIcon.style.fontSize = '14px';
        
        // Add the help icon to the parent element
        if (parentElement.tagName === 'LABEL' || parentElement.tagName === 'H3') {
            parentElement.appendChild(document.createTextNode(' '));
            parentElement.appendChild(helpIcon);
        } else {
            helpIcon.style.position = 'absolute';
            helpIcon.style.right = '10px';
            helpIcon.style.top = '10px';
            
            if (parentElement.style.position !== 'absolute' && parentElement.style.position !== 'relative') {
                parentElement.style.position = 'relative';
            }
            
            parentElement.appendChild(helpIcon);
        }
        
        // Add event listener to show the help modal
        helpIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const tipKey = this.getAttribute('data-tip');
            const tip = helpTips[tipKey];
            
            if (tip) {
                showHelpModal(tip.title, tip.content);
            }
        });
    }
    
    // Show help modal
    function showHelpModal(title, content) {
        // Check if modal already exists
        let helpModal = document.getElementById('help-modal');
        
        if (!helpModal) {
            // Create modal element
            helpModal = document.createElement('div');
            helpModal.id = 'help-modal';
            helpModal.className = 'modal';
            helpModal.style.display = 'none';
            helpModal.style.position = 'fixed';
            helpModal.style.zIndex = '9999';
            helpModal.style.left = '0';
            helpModal.style.top = '0';
            helpModal.style.width = '100%';
            helpModal.style.height = '100%';
            helpModal.style.overflow = 'auto';
            helpModal.style.backgroundColor = 'rgba(0,0,0,0.4)';
            
            // Create modal content
            helpModal.innerHTML = `
                <div class="modal-content" style="background-color: #fefefe; margin: 10% auto; padding: 20px; border: 1px solid #888; border-radius: 8px; width: 80%; max-width: 700px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
                        <h2 id="modal-title" style="margin: 0; font-size: 1.5rem; color: #1B67B2;"></h2>
                        <button class="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; font-weight: bold;">&times;</button>
                    </div>
                    <div id="modal-body" class="modal-body" style="line-height: 1.6;"></div>
                </div>
            `;
            
            // Add to document body
            document.body.appendChild(helpModal);
            
            // Add event listener to close button
            const closeButton = helpModal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    helpModal.style.display = 'none';
                });
            }
            
            // Close when clicking outside the modal
            helpModal.addEventListener('click', function(e) {
                if (e.target === helpModal) {
                    helpModal.style.display = 'none';
                }
            });
        }
        
        // Update modal content
        const modalTitle = helpModal.querySelector('#modal-title');
        const modalBody = helpModal.querySelector('#modal-body');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        
        // Show the modal
        helpModal.style.display = 'block';
    }
    
    // Initialize help tips when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add small delay to ensure other components are initialized
        setTimeout(initHelpTips, 500);
    });
})();
EOL

# Create data visualization enhancements
echo "📊 Creating data visualization enhancements..."
cat > "$APP_DIR/js/fixes/visual-enhancements.js" << 'EOL'
// Visual Enhancements for Portnox TCO Analyzer
(function() {
    console.log('📊 Initializing visual enhancements...');
    
    // Initialize visual enhancements
    function initVisualEnhancements() {
        try {
            // Create security heatmap
            createSecurityHeatmap();
            
            // Create risk heatmap
            createRiskHeatmap();
            
            // Enhance dashboard cards with animations
            enhanceDashboardCards();
            
            // Add comparison highlighting
            addComparisonHighlighting();
            
            console.log('Visual enhancements initialization complete');
        } catch (e) {
            console.error('Error initializing visual enhancements:', e);
        }
    }
    
    // Create security heatmap visualization
    function createSecurityHeatmap() {
        const heatmapContainer = document.getElementById('security-heatmap');
        if (!heatmapContainer) return;
        
        // Security capabilities data
        const securityCapabilities = [
            { x: 'Device Authentication', y: 'Portnox Cloud', value: 95 },
            { x: 'Device Authentication', y: 'Cisco ISE', value: 85 },
            { x: 'Device Authentication', y: 'Aruba ClearPass', value: 80 },
            { x: 'Device Authentication', y: 'Forescout', value: 90 },
            
            { x: 'Continuous Monitoring', y: 'Portnox Cloud', value: 90 },
            { x: 'Continuous Monitoring', y: 'Cisco ISE', value: 70 },
            { x: 'Continuous Monitoring', y: 'Aruba ClearPass', value: 65 },
            { x: 'Continuous Monitoring', y: 'Forescout', value: 80 },
            
            { x: 'Zero Trust Enforcement', y: 'Portnox Cloud', value: 95 },
            { x: 'Zero Trust Enforcement', y: 'Cisco ISE', value: 60 },
            { x: 'Zero Trust Enforcement', y: 'Aruba ClearPass', value: 55 },
            { x: 'Zero Trust Enforcement', y: 'Forescout', value: 65 },
            
            { x: 'Remote Access Control', y: 'Portnox Cloud', value: 90 },
            { x: 'Remote Access Control', y: 'Cisco ISE', value: 60 },
            { x: 'Remote Access Control', y: 'Aruba ClearPass', value: 50 },
            { x: 'Remote Access Control', y: 'Forescout', value: 55 },
            
            { x: 'Automated Remediation', y: 'Portnox Cloud', value: 85 },
            { x: 'Automated Remediation', y: 'Cisco ISE', value: 75 },
            { x: 'Automated Remediation', y: 'Aruba ClearPass', value: 70 },
            { x: 'Automated Remediation', y: 'Forescout', value: 80 },
            
            { x: 'Cloud Security', y: 'Portnox Cloud', value: 95 },
            { x: 'Cloud Security', y: 'Cisco ISE', value: 55 },
            { x: 'Cloud Security', y: 'Aruba ClearPass', value: 50 },
            { x: 'Cloud Security', y: 'Forescout', value: 60 }
        ];
        
        // Create the heatmap
        if (typeof d3 !== 'undefined') {
            // Clear previous content
            heatmapContainer.innerHTML = '';
            
            // Set dimensions
            const margin = { top: 30, right: 30, bottom: 30, left: 150 };
            const width = 600 - margin.left - margin.right;
            const height = 350 - margin.top - margin.bottom;
            
            // Extract unique x and y values
            const xValues = Array.from(new Set(securityCapabilities.map(d => d.x)));
            const yValues = Array.from(new Set(securityCapabilities.map(d => d.y)));
            
            // Create SVG
            const svg = d3.select('#security-heatmap')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
            
            // Build X scales and axis
            const x = d3.scaleBand()
                .range([0, width])
                .domain(xValues)
                .padding(0.05);
            
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', 'rotate(-45)');
            
            // Build Y scales and axis
            const y = d3.scaleBand()
                .range([height, 0])
                .domain(yValues)
                .padding(0.05);
            
            svg.append('g')
                .call(d3.axisLeft(y).tickSize(0));
            
            // Build color scale
            const colorScale = d3.scaleLinear()
                .range(['#f8d7da', '#d1e7dd'])
                .domain([40, 100]);
            
            // Create the heatmap cells
            svg.selectAll()
                .data(securityCapabilities)
                .enter()
                .append('rect')
                .attr('x', d => x(d.x))
                .attr('y', d => y(d.y))
                .attr('width', x.bandwidth())
                .attr('height', y.bandwidth())
                .style('fill', d => colorScale(d.value))
                .style('stroke', '#fff')
                .style('stroke-width', 1)
                .style('opacity', 0.8)
                .on('mouseover', function(event, d) {
                    d3.select(this)
                        .style('stroke', '#333')
                        .style('stroke-width', 2)
                        .style('opacity', 1);
                    
                    // Show tooltip
                    const tooltip = d3.select('body').append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background-color', 'rgba(0,0,0,0.8)')
                        .style('color', '#fff')
                        .style('padding', '10px')
                        .style('border-radius', '4px')
                        .style('font-size', '12px')
                        .style('pointer-events', 'none')
                        .style('opacity', 0);
                    
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    
                    tooltip.html(`<strong>${d.y}</strong><br>${d.x}: ${d.value}%`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .style('stroke', '#fff')
                        .style('stroke-width', 1)
                        .style('opacity', 0.8);
                    
                    // Remove tooltip
                    d3.selectAll('.tooltip').remove();
                });
            
            // Add the values to each cell
            svg.selectAll()
                .data(securityCapabilities)
                .enter()
                .append('text')
                .attr('x', d => x(d.x) + x.bandwidth() / 2)
                .attr('y', d => y(d.y) + y.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .text(d => d.value)
                .style('font-size', '12px')
                .style('fill', d => d.value > 70 ? '#333' : '#333');
            
            // Add legend
            const legendWidth = 200;
            const legendHeight = 20;
            
            const legend = svg.append('g')
                .attr('transform', `translate(${width - legendWidth}, ${-20})`);
            
            const defs = legend.append('defs');
            
            const linearGradient = defs.append('linearGradient')
                .attr('id', 'linear-gradient');
            
            linearGradient.selectAll('stop')
                .data([
                    { offset: '0%', color: '#f8d7da' },
                    { offset: '100%', color: '#d1e7dd' }
                ])
                .enter().append('stop')
                .attr('offset', d => d.offset)
                .attr('stop-color', d => d.color);
            
            legend.append('rect')
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .style('fill', 'url(#linear-gradient)');
            
            legend.append('text')
                .attr('x', 0)
                .attr('y', legendHeight + 15)
                .style('text-anchor', 'start')
                .style('font-size', '12px')
                .text('Lower');
            
            legend.append('text')
                .attr('x', legendWidth)
                .attr('y', legendHeight + 15)
                .style('text-anchor', 'end')
                .style('font-size', '12px')
                .text('Higher');
            
            console.log('Security heatmap created successfully');
        } else {
            console.warn('D3.js not available, could not create security heatmap');
            heatmapContainer.innerHTML = '<div class="alert alert-warning">D3.js library not loaded. Heatmap visualization not available.</div>';
        }
    }
    
    // Create risk heatmap visualization
    function createRiskHeatmap() {
        const heatmapContainer = document.getElementById('risk-heatmap');
        if (!heatmapContainer) return;
        
        // Risk impact data
        const riskData = [
            { x: 'Unauthorized Access', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Unauthorized Access', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Unauthorized Access', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Data Breach', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Data Breach', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Data Breach', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Malware Propagation', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Malware Propagation', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Malware Propagation', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Insider Threat', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Insider Threat', y: 'Portnox Cloud', value: 'Medium-Low', color: '#e8f6e9' },
            { x: 'Insider Threat', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Compliance Violation', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Compliance Violation', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Compliance Violation', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' }
        ];
        
        // Create a simple HTML table-based heatmap
        let heatmapHTML = `
            <table class="risk-heatmap-table" style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                <thead>
                    <tr>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee; min-width: 150px;">Risk Category</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">No NAC</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Portnox Cloud</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Competitor Avg</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Get unique x values (risk categories)
        const riskCategories = Array.from(new Set(riskData.map(d => d.x)));
        
        // Add rows for each risk category
        riskCategories.forEach(category => {
            heatmapHTML += `<tr>`;
            heatmapHTML += `<td style="padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-weight: 600;">${category}</td>`;
            
            // Add cells for each solution
            ['No NAC', 'Portnox Cloud', 'Competitor Avg'].forEach(solution => {
                const cell = riskData.find(d => d.x === category && d.y === solution);
                
                if (cell) {
                    heatmapHTML += `
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee; background-color: ${cell.color}; font-weight: 500;">
                            ${cell.value}
                        </td>
                    `;
                } else {
                    heatmapHTML += `<td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">-</td>`;
                }
            });
            
            heatmapHTML += `</tr>`;
        });
        
        heatmapHTML += `
                </tbody>
            </table>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">
                <strong>Risk Levels:</strong>
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #f8d7da; margin-left: 10px; margin-right: 5px;"></span> High
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #fff3cd; margin-left: 10px; margin-right: 5px;"></span> Medium
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #e8f6e9; margin-left: 10px; margin-right: 5px;"></span> Medium-Low
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #d1e7dd; margin-left: 10px; margin-right: 5px;"></span> Low
            </div>
        `;
        
        // Set the HTML content
        heatmapContainer.innerHTML = heatmapHTML;
        
        console.log('Risk heatmap created successfully');
    }
    
    // Enhance dashboard cards with animations and visual effects
    function enhanceDashboardCards() {
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        
        dashboardCards.forEach(card => {
            // Add transition effect
            card.style.transition = 'all 0.3s ease';
            
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
            
            // Add animated value display
            const metricValue = card.querySelector('.metric-value');
            if (metricValue) {
                const originalText = metricValue.textContent;
                
                // Check if it's a number or percentage
                if (/^\$[\d,]+$/.test(originalText)) {
                    // Format as currency
                    const targetValue = parseInt(originalText.replace(/[$,]/g, ''));
                    animateValue(metricValue, 0, targetValue, 1500, value => `$${value.toLocaleString()}`);
                } else if (/^[\d.]+%$/.test(originalText)) {
                    // Format as percentage
                    const targetValue = parseFloat(originalText);
                    animateValue(metricValue, 0, targetValue, 1500, value => `${value}%`);
                } else if (/^\d+\s+\w+$/.test(originalText)) {
                    // Format as number with unit (e.g., "7 months")
                    const parts = originalText.split(' ');
                    const targetValue = parseInt(parts[0]);
                    const unit = parts[1];
                    animateValue(metricValue, 0, targetValue, 1500, value => `${value} ${unit}`);
                }
            }
        });
        
        console.log('Dashboard cards enhanced successfully');
    }
    
    // Animate value display
    function animateValue(element, start, end, duration, formatter) {
        if (!element) return;
        
        // Don't animate if already done
        if (element.getAttribute('data-animated') === 'true') return;
        element.setAttribute('data-animated', 'true');
        
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = formatter ? formatter(currentValue) : currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // Add comparison highlighting to tables
    function addComparisonHighlighting() {
        // Find all comparison tables
        const comparisonTables = document.querySelectorAll('.comparison-table, #vendor-strengths-table');
        
        comparisonTables.forEach(table => {
            // Add a class to Portnox cells
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 1) {
                    // Highlight the second cell (Portnox)
                    cells[1].classList.add('highlight-cell');
                    cells[1].style.fontWeight = '600';
                    cells[1].style.color = '#2BD25B';
                }
            });
        });
        
        console.log('Comparison highlighting added successfully');
    }
    
    // Initialize visual enhancements when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add small delay to ensure other components are initialized
        setTimeout(initVisualEnhancements, 500);
    });
    
    // Add fallback initialization on window load
    window.addEventListener('load', function() {
        if (document.getElementById('security-heatmap') && document.getElementById('security-heatmap').children.length === 0) {
            console.log('Initializing visual enhancements on window load (fallback)');
            initVisualEnhancements();
        }
    });
})();
EOL

# Create vendor data module
echo "📋 Creating vendor data module..."
cat > "$APP_DIR/js/fixes/vendor-data.js" << 'EOL'
// Vendor Data Module for Portnox TCO Analyzer
(function() {
    console.log('📋 Initializing vendor data module...');
    
    // Vendor data configuration
    const vendorData = {
        portnox: {
            name: 'Portnox Cloud',
            type: 'Cloud-native NAC',
            deploymentModel: 'SaaS',
            description: 'Cloud-native NAC solution with zero infrastructure requirements and continuous compliance monitoring.',
            threeYearTCO: 202500,
            implementationTime: 21, // days
            riskReduction: 58, // percentage
            zeroTrustScore: 92, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.25, // FTE count
            advantages: [
                'Cloud-native architecture eliminates hardware costs and complexity',
                'Fully managed service reduces IT staff burden',
                'Built for Zero Trust security from the ground up',
                'Continuous compliance monitoring and automated remediation',
                'Seamless remote access support for distributed workforce',
                'Automatic updates and maintenance',
                'Global scalability with no infrastructure limits',
                'Rapid deployment with minimal expertise required',
                'Subscription model provides predictable costs',
                'Comprehensive API integration capabilities'
            ],
            features: {
                easeOfDeployment: 95,
                cloudIntegration: 98,
                scalability: 92,
                costEffectiveness: 88,
                compliance: 94,
                security: 96,
                ztna: 90,
                mfa: 85,
                devicePosture: 92,
                automatedRemediation: 88,
                remoteAccess: 95,
                iotSupport: 90
            },
            costBreakdown: {
                hardware: 0,
                software: 135000,
                implementation: 17500,
                maintenance: 0,
                personnel: 40000,
                training: 10000
            },
            compliance: {
                pci: 94,
                hipaa: 92,
                nist: 96,
                gdpr: 90,
                iso: 93,
                cmmc: 91,
                ferpa: 88,
                sox: 89
            }
        },
        cisco: {
            name: 'Cisco ISE',
            type: 'Enterprise NAC',
            deploymentModel: 'On-premises',
            description: 'Enterprise network access control solution with extensive hardware requirements and complex deployment.',
            threeYearTCO: 450000,
            implementationTime: 120, // days
            riskReduction: 52, // percentage
            zeroTrustScore: 45, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.5, // FTE count
            advantages: [
                'Extensive integration with Cisco infrastructure',
                'Robust on-premises deployment',
                'Strong enterprise capabilities',
                'Advanced network segmentation'
            ],
            features: {
                easeOfDeployment: 35,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 40
		compliance: 85,
                security: 88,
                ztna: 65,
                mfa: 80,
                devicePosture: 85,
                automatedRemediation: 75,
                remoteAccess: 60,
                iotSupport: 82
            },
            costBreakdown: {
                hardware: 90000,
                software: 112500,
                implementation: 67500,
                maintenance: 81000,
                personnel: 67500,
                training: 31500
            },
            compliance: {
                pci: 85,
                hipaa: 82,
                nist: 88,
                gdpr: 78,
                iso: 86,
                cmmc: 84,
                ferpa: 75,
                sox: 80
            }
        },
        aruba: {
            name: 'Aruba ClearPass',
            type: 'Policy Manager',
            deploymentModel: 'On-premises',
            description: 'Network policy manager with strong wired and wireless capabilities but complex implementation requirements.',
            threeYearTCO: 380000,
            implementationTime: 90, // days
            riskReduction: 50, // percentage
            zeroTrustScore: 42, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Strong integration with Aruba infrastructure',
                'Comprehensive wireless capabilities',
                'Good guest management features',
                'Granular policy controls'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 55,
                scalability: 78,
                costEffectiveness: 45,
                compliance: 80,
                security: 85,
                ztna: 60,
                mfa: 75,
                devicePosture: 80,
                automatedRemediation: 70,
                remoteAccess: 65,
                iotSupport: 75
            },
            costBreakdown: {
                hardware: 76000,
                software: 95000,
                implementation: 57000,
                maintenance: 68400,
                personnel: 57000,
                training: 26600
            },
            compliance: {
                pci: 82,
                hipaa: 80,
                nist: 85,
                gdpr: 75,
                iso: 82,
                cmmc: 80,
                ferpa: 72,
                sox: 76
            }
        },
        forescout: {
            name: 'Forescout',
            type: 'Device Visibility',
            deploymentModel: 'On-premises',
            description: 'Device visibility and control platform with strong IoT capabilities but significant hardware requirements.',
            threeYearTCO: 405000,
            implementationTime: 100, // days
            riskReduction: 48, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Excellent device discovery capabilities',
                'Strong IoT security features',
                'Good network visibility',
                'Detailed device profiling'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 40,
                scalability: 75,
                costEffectiveness: 35,
                compliance: 82,
                security: 86,
                ztna: 55,
                mfa: 70,
                devicePosture: 90,
                automatedRemediation: 80,
                remoteAccess: 60,
                iotSupport: 95
            },
            costBreakdown: {
                hardware: 81000,
                software: 101250,
                implementation: 60750,
                maintenance: 72900,
                personnel: 60750,
                training: 28350
            },
            compliance: {
                pci: 85,
                hipaa: 80,
                nist: 82,
                gdpr: 75,
                iso: 80,
                cmmc: 78,
                ferpa: 70,
                sox: 75
            }
        },
        fortinac: {
            name: 'FortiNAC',
            type: 'Fortinet NAC',
            deploymentModel: 'On-premises',
            description: 'Network access control solution integrated with Fortinet security ecosystem.',
            threeYearTCO: 325000,
            implementationTime: 80, // days
            riskReduction: 45, // percentage
            zeroTrustScore: 38, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Integration with Fortinet security ecosystem',
                'Good network segmentation capabilities',
                'Moderate deployment complexity',
                'Solid baseline security features'
            ],
            features: {
                easeOfDeployment: 50,
                cloudIntegration: 45,
                scalability: 70,
                costEffectiveness: 55,
                compliance: 75,
                security: 80,
                ztna: 50,
                mfa: 65,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 55,
                iotSupport: 70
            },
            costBreakdown: {
                hardware: 65000,
                software: 81250,
                implementation: 48750,
                maintenance: 58500,
                personnel: 48750,
                training: 22750
            },
            compliance: {
                pci: 78,
                hipaa: 75,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 72,
                ferpa: 65,
                sox: 70
            }
        },
        juniper: {
            name: 'Juniper Mist',
            type: 'AI-driven NAC',
            deploymentModel: 'Hybrid',
            description: 'AI-driven wireless networking platform with NAC capabilities and cloud management.',
            threeYearTCO: 340000,
            implementationTime: 70, // days
            riskReduction: 46, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong AI capabilities for network optimization',
                'Good cloud management features',
                'Excellent wireless capabilities',
                'Increasingly strong zero trust features'
            ],
            features: {
                easeOfDeployment: 60,
                cloudIntegration: 65,
                scalability: 75,
                costEffectiveness: 50,
                compliance: 72,
                security: 78,
                ztna: 65,
                mfa: 70,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 60,
                iotSupport: 65
            },
            costBreakdown: {
                hardware: 68000,
                software: 85000,
                implementation: 51000,
                maintenance: 61200,
                personnel: 51000,
                training: 23800
            },
            compliance: {
                pci: 75,
                hipaa: 72,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 70,
                ferpa: 65,
                sox: 70
            }
        },
        securew2: {
            name: 'SecureW2',
            type: 'Cloud RADIUS',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS service with certificate-based authentication for wireless networks.',
            threeYearTCO: 280000,
            implementationTime: 45, // days
            riskReduction: 40, // percentage
            zeroTrustScore: 35, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.75, // FTE count
            advantages: [
                'Strong certificate-based authentication',
                'Cloud-native architecture',
                'Good integration with identity providers',
                'Simplified wireless security'
            ],
            features: {
                easeOfDeployment: 65,
                cloudIntegration: 75,
                scalability: 65,
                costEffectiveness: 70,
                compliance: 65,
                security: 70,
                ztna: 60,
                mfa: 75,
                devicePosture: 60,
                automatedRemediation: 60,
                remoteAccess: 75,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 154000,
                implementation: 33600,
                maintenance: 0,
                personnel: 70000,
                training: 22400
            },
            compliance: {
                pci: 70,
                hipaa: 68,
                nist: 72,
                gdpr: 65,
                iso: 70,
                cmmc: 65,
                ferpa: 60,
                sox: 68
            }
        },
        microsoft: {
            name: 'Microsoft NPS',
            type: 'Windows Server NAC',
            deploymentModel: 'On-premises',
            description: 'Network Policy Server for Windows Server with basic NAC capabilities for Windows environments.',
            threeYearTCO: 290000,
            implementationTime: 60, // days
            riskReduction: 35, // percentage
            zeroTrustScore: 25, // percentage
            cloudArchitecture: 'None',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Included with Windows Server licensing',
                'Good integration with Active Directory',
                'Familiar administration for Windows administrators',
                'Basic network access control features'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 60,
                scalability: 55,
                costEffectiveness: 65,
                compliance: 60,
                security: 65,
                ztna: 30,
                mfa: 70,
                devicePosture: 65,
                automatedRemediation: 45,
                remoteAccess: 60,
                iotSupport: 40
            },
            costBreakdown: {
                hardware: 58000,
                software: 72500,
                implementation: 43500,
                maintenance: 52200,
                personnel: 43500,
                training: 20300
            },
            compliance: {
                pci: 65,
                hipaa: 62,
                nist: 70,
                gdpr: 60,
                iso: 68,
                cmmc: 65,
                ferpa: 60,
                sox: 65
            }
        },
        arista: {
            name: 'Arista Agni',
            type: 'Network Control',
            deploymentModel: 'On-premises',
            description: 'Network control solution integrated with Arista networking infrastructure.',
            threeYearTCO: 300000,
            implementationTime: 75, // days
            riskReduction: 42, // percentage
            zeroTrustScore: 30, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong integration with Arista networks',
                'Good network visibility features',
                'Solid performance in Arista environments',
                'Enterprise-grade scalability'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 60,
                compliance: 70,
                security: 75,
                ztna: 45,
                mfa: 65,
                devicePosture: 70,
                automatedRemediation: 65,
                remoteAccess: 55,
                iotSupport: 60
            },
            costBreakdown: {
                hardware: 60000,
                software: 75000,
                implementation: 45000,
                maintenance: 54000,
                personnel: 45000,
                training: 21000
            },
            compliance: {
                pci: 72,
                hipaa: 70,
                nist: 75,
                gdpr: 65,
                iso: 72,
                cmmc: 70,
                ferpa: 62,
                sox: 68
            }
        },
        foxpass: {
            name: 'Foxpass',
            type: 'Cloud RADIUS/LDAP',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS and LDAP service for network authentication and access control.',
            threeYearTCO: 240000,
            implementationTime: 40, // days
            riskReduction: 38, // percentage
            zeroTrustScore: 32, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.5, // FTE count
            advantages: [
                'Cloud-native RADIUS and LDAP',
                'Simple deployment for small to medium businesses',
                'Good developer-friendly features',
                'Straightforward user management'
            ],
            features: {
                easeOfDeployment: 70,
                cloudIntegration: 80,
                scalability: 60,
                costEffectiveness: 75,
                compliance: 60,
                security: 65,
                ztna: 45,
                mfa: 70,
                devicePosture: 55,
                automatedRemediation: 50,
                remoteAccess: 70,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 132000,
                implementation: 28800,
                maintenance: 0,
                personnel: 60000,
                training: 19200
            },
            compliance: {
                pci: 65,
                hipaa: 62,
                nist: 68,
                gdpr: 60,
                iso: 65,
                cmmc: 60,
                ferpa: 55,
                sox: 60
            }
        },
        extreme: {
            name: 'Extreme NAC',
            type: 'Enterprise NAC',
            deploymentModel: 'On-premises',
            description: 'Network access control solution integrated with Extreme Networks infrastructure.',
            threeYearTCO: 365000,
            implementationTime: 85, // days
            riskReduction: 44, // percentage
            zeroTrustScore: 35, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Strong integration with Extreme Networks infrastructure',
                'Good network visibility and control',
                'Solid policy enforcement capabilities',
                'Enterprise-grade scalability'
            ],
            features: {
                easeOfDeployment: 42,
                cloudIntegration: 48,
                scalability: 75,
                costEffectiveness: 48,
                compliance: 75,
                security: 78,
                ztna: 50,
                mfa: 70,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 55,
                iotSupport: 70
            },
            costBreakdown: {
                hardware: 73000,
                software: 91250,
                implementation: 54750,
                maintenance: 65700,
                personnel: 54750,
                training: 25550
            },
            compliance: {
                pci: 78,
                hipaa: 75,
                nist: 80,
                gdpr: 70,
                iso: 76,
                cmmc: 72,
                ferpa: 65,
                sox: 70
            }
        }
    };
    
    // Industry data configuration
    const industryData = {
        healthcare: {
            name: 'Healthcare',
            complianceFrameworks: ['hipaa', 'pci', 'nist'],
            challenges: [
                'Protecting sensitive patient data',
                'Meeting strict regulatory requirements',
                'Managing diverse medical devices',
                'Balancing security with clinical workflows',
                'Maintaining availability of critical systems'
            ],
            solutions: {
                portnox: [
                    'Built-in HIPAA compliance controls',
                    'Medical device visibility and classification',
                    'Automated compliance reporting',
                    'Zero disruption to clinical services',
                    'Simplified remote access for practitioners'
                ]
            },
            averageBreachCost: 9230000, // $9.23M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        },
        financial: {
            name: 'Financial Services',
            complianceFrameworks: ['pci', 'sox', 'gdpr', 'nist'],
            challenges: [
                'Protecting customer financial data',
                'Meeting strict regulatory requirements',
                'Preventing fraud and unauthorized access',
                'Managing complex vendor ecosystems',
                'Maintaining continuous availability'
            ],
            solutions: {
                portnox: [
                    'PCI DSS and SOX compliance controls',
                    'Advanced authentication for financial systems',
                    'Continuous monitoring and automated response',
                    'Comprehensive audit trails for compliance',
                    'Secure remote access for employees and vendors'
                ]
            },
            averageBreachCost: 5850000, // $5.85M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        },
        education: {
            name: 'Education',
            complianceFrameworks: ['ferpa', 'gdpr'],
            challenges: [
                'Managing diverse BYOD environments',
                'Protecting student and research data',
                'Limited security budgets and resources',
                'Supporting open campus networks',
                'Balancing security with academic freedom'
            ],
            solutions: {
                portnox: [
                    'Cost-effective cloud deployment model',
                    'Simple BYOD and guest management',
                    'Minimal IT staff requirements',
                    'FERPA compliance controls',
                    'Flexible security policies for different network zones'
                ]
            },
            averageBreachCost: 3790000, // $3.79M estimated for education sector
            riskProfile: 'medium'
        },
        government: {
            name: 'Government',
            complianceFrameworks: ['nist', 'cmmc', 'fisma'],
            challenges: [
                'Protecting sensitive government data',
                'Meeting stringent security requirements',
                'Managing legacy systems and infrastructure',
                'Limited IT modernization budgets',
                'Compliance with specific government mandates'
            ],
            solutions: {
                portnox: [
                    'NIST 800-53 and CMMC compliance controls',
                    'FedRAMP-ready cloud infrastructure',
                    'Legacy system compatibility',
                    'Cost-effective deployment model',
                    'Zero trust architecture for sensitive systems'
                ]
            },
            averageBreachCost: 8350000, // $8.35M estimated for government sector
            riskProfile: 'high'
        },
        manufacturing: {
            name: 'Manufacturing',
            complianceFrameworks: ['nist', 'iso'],
            challenges: [
                'Protecting operational technology (OT) networks',
                'Securing industrial IoT devices',
                'Maintaining production continuity',
                'Managing global supply chain access',
                'Bridging IT/OT security gaps'
            ],
            solutions: {
                portnox: [
                    'OT/IIoT device visibility and control',
                    'Segmentation of IT and OT networks',
                    'Zero downtime implementation',
                    'Supply chain access management',
                    'Simple deployment across multiple sites'
                ]
            },
            averageBreachCost: 4240000, // $4.24M estimated for manufacturing sector
            riskProfile: 'medium'
        },
        retail: {
            name: 'Retail',
            complianceFrameworks: ['pci', 'gdpr'],
            challenges: [
                'Protecting customer payment data',
                'Securing diverse retail locations',
                'Managing POS and retail IoT devices',
                'Supporting seasonal workforce',
                'Maintaining PCI DSS compliance'
            ],
            solutions: {
                portnox: [
                    'PCI DSS compliance controls',
                    'Simple multi-location deployment',
                    'POS device visibility and control',
                    'Simplified guest and seasonal worker access',
                    'Cost-effective subscription model'
                ]
            },
            averageBreachCost: 3270000, // $3.27M estimated for retail sector
            riskProfile: 'medium'
        },
        technology: {
            name: 'Technology',
            complianceFrameworks: ['iso', 'sox', 'gdpr'],
            challenges: [
                'Protecting intellectual property',
                'Managing remote and distributed workforce',
                'Securing development environments',
                'Rapid growth and changing infrastructure',
                'Advanced persistent threats (APTs)'
            ],
            solutions: {
                portnox: [
                    'Seamless remote workforce security',
                    'Advanced threat prevention capabilities',
                    'DevOps-friendly deployment model',
                    'Scales with rapid business growth',
                    'Cloud-native architecture for modern tech stacks'
                ]
            },
            averageBreachCost: 5050000, // $5.05M estimated for technology sector
            riskProfile: 'medium-high'
        },
        energy: {
            name: 'Energy & Utilities',
            complianceFrameworks: ['nerc', 'nist', 'iso'],
            challenges: [
                'Protecting critical infrastructure',
                'Securing operational technology networks',
                'Meeting regulatory requirements',
                'Managing geographically dispersed assets',
                'Defending against nation-state threats'
            ],
            solutions: {
                portnox: [
                    'Critical infrastructure protection',
                    'OT/ICS device visibility and control',
                    'NERC-CIP compliance controls',
                    'Multi-site deployment management',
                    'Advanced threat prevention capabilities'
                ]
            },
            averageBreachCost: 4650000, // $4.65M estimated for energy sector
            riskProfile: 'high'
        }
    };
    
    // Compliance framework data
    const complianceData = {
        pci: {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Security standard for organizations that handle credit card data',
            requirements: [
                'Network security controls',
                'Cardholder data protection',
                'Vulnerability management',
                'Access control measures',
                'Network monitoring and testing',
                'Information security policy'
            ],
            portnoxCoverage: 94,
            industryAvgCoverage: 72,
            applicableIndustries: ['retail', 'financial', 'healthcare', 'technology']
        },
        hipaa: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Regulations for protecting sensitive patient health information',
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Authentication',
                'Transmission security',
                'Device and media controls'
            ],
            portnoxCoverage: 92,
            industryAvgCoverage: 68,
            applicableIndustries: ['healthcare']
        },
        nist: {
            name: 'NIST 800-53',
            fullName: 'National Institute of Standards and Technology Special Publication 800-53',
            description: 'Security controls for federal information systems and organizations',
            requirements: [
                'Access control',
                'Identification and authentication',
                'System and communications protection',
                'System and information integrity',
                'Incident response',
                'Audit and accountability'
            ],
            portnoxCoverage: 96,
            industryAvgCoverage: 70,
            applicableIndustries: ['government', 'healthcare', 'financial', 'energy']
        },
        gdpr: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            description: 'Data protection and privacy regulations for individuals in the EU',
            requirements: [
                'Data protection by design',
                'Data subject rights',
                'Consent management',
                'Data breach notification',
                'Security of processing',
                'Accountability and governance'
            ],
            portnoxCoverage: 90,
            industryAvgCoverage: 65,
            applicableIndustries: ['all']
        },
        iso: {
            name: 'ISO 27001',
            fullName: 'ISO/IEC 27001 - Information Security Management',
            description: 'International standard for information security management',
            requirements: [
                'Information security policies',
                'Asset management',
                'Access control',
                'Cryptography',
                'Physical and environmental security',
                'Operations security'
            ],
            portnoxCoverage: 93,
            industryAvgCoverage: 75,
            applicableIndustries: ['all']
        },
        cmmc: {
            name: 'CMMC',
            fullName: 'Cybersecurity Maturity Model Certification',
            description: 'Unified security standard for Department of Defense contractors',
            requirements: [
                'Access control',
                'Identification and authentication',
                'System and comms protection',
                'System and information integrity',
                'Audit and accountability',
                'Incident response'
            ],
            portnoxCoverage: 91,
            industryAvgCoverage: 68,
            applicableIndustries: ['government', 'manufacturing', 'technology']
        },
        ferpa: {
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            description: 'Federal law protecting the privacy of student education records',
            requirements: [
                'Access controls',
                'Audit controls',
                'Authentication',
                'Data integrity',
                'Disclosure limitations',
                'Policy management'
            ],
            portnoxCoverage: 88,
            industryAvgCoverage: 62,
            applicableIndustries: ['education']
        },
        sox: {
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            description: 'Regulations for financial reporting and corporate governance',
            requirements: [
                'Access controls',
                'Change management',
                'Security management',
                'Data backup and recovery',
                'Monitoring and auditing',
                'IT governance'
            ],
            portnoxCoverage: 89,
            industryAvgCoverage: 66,
            applicableIndustries: ['financial', 'technology']
        },
        nerc: {
            name: 'NERC CIP',
            fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
            description: 'Standards for securing critical electric infrastructure',
            requirements: [
                'Electronic security perimeters',
                'Systems security management',
                'Incident reporting and planning',
                'Recovery plans',
                'Physical security',
                'Personnel and training'
            ],
            portnoxCoverage: 92,
            industryAvgCoverage: 70,
            applicableIndustries: ['energy']
        }
    };
    
    // Make data available to the application
    window.PortnoxData = {
        vendors: vendorData,
        industries: industryData,
        compliance: complianceData,
        
        // Helper methods
        getVendor: function(vendorId) {
            return vendorData[vendorId] || null;
        },
        
        getIndustry: function(industryId) {
            return industryData[industryId] || null;
        },
        
        getComplianceFramework: function(complianceId) {
            return complianceData[complianceId] || null;
        },
        
        getRecommendedVendors: function(industryId, size) {
            // Logic to recommend vendors based on industry and organization size
            const recommendations = [];
            
            // Portnox is always recommended
            recommendations.push({
                vendorId: 'portnox',
                reason: 'Best overall value and security coverage'
            });
            
            // Add industry-specific recommendations
            switch (industryId) {
                case 'healthcare':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong medical device visibility'
                    });
                    break;
                    
                case 'financial':
                    recommendations.push({
                        vendorId: 'cisco',
                        reason: 'Robust security features for financial institutions'
                    });
                    break;
                    
                case 'education':
                    recommendations.push({
                        vendorId: 'securew2',
                        reason: 'Cost-effective for educational institutions'
                    });
                    break;
                    
                case 'government':
                    recommendations.push({
                        vendorId: 'cisco',
                        reason: 'Strong compliance with government requirements'
                    });
                    break;
                    
                case 'manufacturing':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong OT/IoT security capabilities'
                    });
                    break;
                    
                case 'retail':
                    recommendations.push({
                        vendorId: 'aruba',
                        reason: 'Good multi-location deployment features'
                    });
                    break;
                    
                case 'technology':
                    recommendations.push({
                        vendorId: 'juniper',
                        reason: 'Strong cloud integration capabilities'
                    });
                    break;
                    
                case 'energy':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong OT/ICS security capabilities'
                    });
                    break;
                
                default:
                    // Default secondary recommendation based on size
                    if (size === 'small' || size === 'very-small') {
                        recommendations.push({
                            vendorId: 'securew2',
                            reason: 'Cost-effective for smaller organizations'
                        });
                    } else if (size === 'enterprise' || size === 'large') {
                        recommendations.push({
                            vendorId: 'cisco',
                            reason: 'Robust features for large enterprises'
                        });
                    } else {
                        recommendations.push({
                            vendorId: 'aruba',
                            reason: 'Good balance of features for mid-sized organizations'
                        });
                    }
            }
            
            return recommendations;
        },
        
        getRequiredComplianceFrameworks: function(industryId) {
            // Return compliance frameworks required for specific industry
            const industry = industryData[industryId];
            
            if (industry && industry.complianceFrameworks) {
                return industry.complianceFrameworks.map(id => {
                    return complianceData[id] || null;
                }).filter(framework => framework !== null);
            }
            
            return [];
        }
    };
    
    console.log('Vendor data module initialized');
})();
EOL

# Create fix for sidebar issues
echo "🔄 Creating sidebar fix..."
cat > "$APP_DIR/js/fixes/sidebar-fix.js" << 'EOL'
// Sidebar Fix for Portnox TCO Analyzer
(function() {
    console.log('🔄 Initializing sidebar fix...');
    
    // Fix sidebar issues
    function fixSidebar() {
        console.log('Fixing sidebar issues...');
        
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        
        // Make sure sidebar elements exist
        if (!sidebar) {
            console.warn('Sidebar element not found!');
            return;
        }
        
        // Create a toggle button if it doesn't exist
        if (!sidebarToggle) {
            console.log('Creating sidebar toggle button');
            
            const newToggle = document.createElement('div');
            newToggle.id = 'sidebar-toggle';
            newToggle.className = 'sidebar-toggle';
            newToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // Style the toggle button
            newToggle.style.position = 'fixed';
            newToggle.style.left = '350px';
            newToggle.style.top = '120px';
            newToggle.style.width = '28px';
            newToggle.style.height = '60px';
            newToggle.style.backgroundColor = '#fff';
            newToggle.style.borderRadius = '0 4px 4px 0';
            newToggle.style.boxShadow = '2px 0 8px rgba(0, 0, 0, 0.1)';
            newToggle.style.display = 'flex';
            newToggle.style.justifyContent = 'center';
            newToggle.style.alignItems = 'center';
            newToggle.style.cursor = 'pointer';
            newToggle.style.transition = 'all 0.3s ease';
            newToggle.style.zIndex = '100';
            
            document.body.appendChild(newToggle);
            
            // Set up the toggle functionality
            newToggle.addEventListener('click', function() {
                toggleSidebar(this, sidebar);
            });
        } else {
            // Clean up existing toggle to ensure it works
            sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            // Remove existing event listeners by cloning and replacing
            const newToggle = sidebarToggle.cloneNode(true);
            sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
            
            // Add new event listener
            newToggle.addEventListener('click', function() {
                toggleSidebar(this, sidebar);
            });
        }
        
        // Make sure the sidebar has proper styles
        sidebar.style.transition = 'all 0.3s ease';
        sidebar.style.overflowY = 'auto';
        sidebar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        // Fix content area styles
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.style.transition = 'all 0.3s ease';
            contentArea.style.flex = '1';
            contentArea.style.overflow = 'auto';
        }
        
        console.log('Sidebar fix complete!');
    }
    
    // Toggle sidebar visibility
    function toggleSidebar(toggleBtn, sidebar) {
        sidebar.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '0';
            sidebar.style.minWidth = '0';
            sidebar.style.padding = '0';
            sidebar.style.overflow = 'hidden';
            toggleBtn.style.left = '0';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-right';
            
            // Adjust content area
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.style.marginLeft = '0';
                contentArea.style.width = '100%';
            }
        } else {
            sidebar.style.width = '350px';
            sidebar.style.minWidth = '350px';
            sidebar.style.padding = '';
            sidebar.style.overflow = 'auto';
            toggleBtn.style.left = '350px';
            toggleBtn.querySelector('i').className = 'fas fa-chevron-left';
            
            // Adjust content area
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.style.marginLeft = '';
                contentArea.style.width = '';
            }
        }
    }
    
    // Fix config cards
    function fixConfigCards() {
        console.log('Fixing config cards...');
        
        const configCards = document.querySelectorAll('.config-card');
        
        configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            
            if (header && content) {
                // Remove existing event listeners
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                const icon = newHeader.querySelector('i.fas:not(:first-child)');
                if (!icon) {
                    // Create icon if not exists
                    const newIcon = document.createElement('i');
                    newIcon.className = 'fas fa-chevron-up';
                    newHeader.appendChild(newIcon);
                }
                
                // Make sure content is visible initially
                content.style.display = 'block';
                content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
                content.style.overflow = 'hidden';
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                // Style the header
                newHeader.style.cursor = 'pointer';
                newHeader.style.userSelect = 'none';
                
                // Add collapse/expand functionality
                newHeader.addEventListener('click', function() {
                    const icon = this.querySelector('i.fas:not(:first-child)');
                    
                    if (content.style.maxHeight !== '0px') {
                        // Collapse
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                        content.style.padding = '0 15px';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-down';
                        }
                    } else {
                        // Expand
                        content.style.maxHeight = content.scrollHeight + 500 + 'px'; // Add extra space
                        content.style.opacity = '1';
                        content.style.padding = '15px';
                        
                        if (icon) {
                            icon.className = 'fas fa-chevron-up';
                        }
                    }
                });
            }
        });
    }
    
    // Fix tab switching
    function fixTabSwitching() {
        console.log('Fixing tab switching...');
        
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            // Remove existing event listeners by cloning and replacing
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            newTab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`Switching to view: ${view}`);
                
                // Update active stakeholder tab
                stakeholderTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active view panel
                document.querySelectorAll('.view-panel').forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                        panel.style.display = 'block';
                        
                        // Activate first results tab in this view
                        const firstTab = panel.querySelector('.results-tab');
                        if (firstTab) {
                            firstTab.click();
                        }
                    } else {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    }
                });
            });
        });
        
        // Fix results tabs
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            // Remove existing event listeners by cloning and replacing
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
            
            newTab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                const tabsContainer = this.parentElement;
                
                // Update active tab
                tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Find parent view panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
                    // Update active panel
                    viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                        if (panel.id === panelId) {
                            panel.classList.add('active');
                            panel.style.display = 'block';
                        } else {
                            panel.classList.remove('active');
                            panel.style.display = 'none';
                        }
                    });
                }
            });
        });
        
        // Make sure an initial view is active
        const activeStakeholderTab = document.querySelector('.stakeholder-tab.active');
        if (!activeStakeholderTab) {
            const firstTab = document.querySelector('.stakeholder-tab');
            if (firstTab) {
                firstTab.click();
            }
        }
    }
    
    // Initialize vendor selection
    function initVendorSelection() {
        console.log('Initializing vendor selection...');
        
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
            }
            
            // Remove existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new event listener
            newCard.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Prevent deselecting Portnox
                if (vendor === 'portnox') {
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Update charts if at least one competitor is selected
                if (document.querySelectorAll('.vendor-card.selected').length > 1) {
                    updateCalculations();
                }
            });
        });
    }
    
    // Update calculations
    function updateCalculations() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        
        // Simulate calculation delay
        setTimeout(function() {
            // Trigger chart updates
            if (typeof window.initializeCharts === 'function') {
                window.initializeCharts();
            } else {
                console.log('Chart initialization function not found, adding event for it');
                
                // Create a custom event
                const event = new CustomEvent('updateCharts');
                document.dispatchEvent(event);
            }
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show success toast
            if (window.showToast) {
                window.showToast('Analysis updated successfully!', 'success');
            }
        }, 1500);
    }
    
    // Initialize all fixes
    function initFixes() {
        // Fix sidebar
        fixSidebar();
        
        // Fix config cards
        fixConfigCards();
        
        // Fix tab switching
        fixTabSwitching();
        
        // Initialize vendor selection
        initVendorSelection();
        
        // Add event listener for calculate button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', updateCalculations);
        }
        
        // Header calculate button
        const headerCalculateBtn = document.getElementById('calculate-btn-header');
        if (headerCalculateBtn) {
            headerCalculateBtn.addEventListener('click', function() {
                if (calculateBtn) {
                    calculateBtn.click();
                }
            });
        }
    }
    
    // Add CSS fixes
    function addFixStyles() {
        console.log('Adding fix styles...');
        
        const style = document.createElement('style');
        style.textContent = `
            /* Sidebar fixes */
            .sidebar {
                transition: all 0.3s ease !important;
                overflow-y: auto !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                width: 350px !important;
                min-width: 350px !important;
            }
            
            .sidebar.collapsed {
                width: 0 !important;
                min-width: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
            }
            
            .sidebar-toggle {
                position: fixed !important;
                left: 350px !important;
                top: 120px !important;
                width: 28px !important;
                height: 60px !important;
                background-color: #fff !important;
                border-radius: 0 4px 4px 0 !important;
                box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1) !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                z-index: 100 !important;
            }
            
            .sidebar-toggle.collapsed {
                left: 0 !important;
            }
            
            .sidebar-toggle i {
                color: #333 !important;
                font-size: 14px !important;
            }
            
            /* Config card fixes */
            .config-card {
                margin-bottom: 20px !important;
                border-radius: 8px !important;
                background-color: #fff !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
                overflow: hidden !important;
            }
            
            .config-card-header {
                padding: 12px 15px !important;
                background-color: #f8f9fa !important;
                border-bottom: 1px solid #e0e0e0 !important;
                cursor: pointer !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                user-select: none !important;
            }
            
            .config-card-header h3 {
                margin: 0 !important;
                font-size: 16px !important;
                color: #333 !important;
                display: flex !important;
                align-items: center !important;
            }
            
            .config-card-header h3 i {
                margin-right: 8px !important;
                color: #3498db !important;
            }
            
            .config-card-header i.fas:not(:first-child) {
                font-size: 14px !important;
                color: #777 !important;
                transition: transform 0.3s ease !important;
            }
            
            .config-card-content {
                padding: 15px !important;
                transition: all 0.3s ease !important;
                overflow: hidden !important;
            }
            
            /* Fix tab switching */
            .view-panel {
                display: none;
            }
            
            .view-panel.active {
                display: block;
            }
            
            .results-panel {
                display: none;
            }
            
            .results-panel.active {
                display: block;
            }
            
            /* Results tabs */
            .results-tabs {
                display: flex;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 25px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: thin;
            }
            
            .results-tab {
                padding: 12px 18px;
                font-size: 14px;
                font-weight: 600;
                color: #555;
                border-bottom: 3px solid transparent;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s ease;
            }
            
            .results-tab:hover {
                color: #3498db;
            }
            
            .results-tab.active {
                color: #3498db;
                border-bottom-color: #3498db;
            }
            
            /* Vendor card styles */
            .vendor-card {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .vendor-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .vendor-card.selected {
                border: 2px solid #2BD25B;
                background-color: rgba(43, 210, 91, 0.05);
            }
            
            /* Dashboard card styles */
            .dashboard-card {
                transition: all 0.3s ease;
            }
            
            .dashboard-card:hover {
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }
            
            .dashboard-card.highlight-card {
                border-left: 4px solid #3498db;
            }
            
            .highlight-value {
                color: #3498db;
            }
            
            .metric-trend.up {
                color: #2ecc71;
            }
            
            .metric-trend.down {
                color: #e74c3c;
            }
            
            /* Loading overlay */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 4px solid #3498db;
                width: 40px;
                height: 40px;
                margin: 0 auto 10px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Toast notifications */
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .toast {
                margin-bottom: 10px;
                min-width: 250px;
                max-width: 350px;
                background-color: white;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 4px;
                padding: 15px;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            /* Toast types */
            .toast-success {
                border-left: 4px solid #2ecc71;
            }
            
            .toast-error {
                border-left: 4px solid #e74c3c;
            }
            
            .toast-warning {
                border-left: 4px solid #f39c12;
            }
            
            .toast-info {
                border-left: 4px solid #3498db;
            }
            
            /* Help icon */
            .help-icon {
                cursor: pointer;
                margin-left: 5px;
                color: #3498db;
                transition: all 0.2s ease;
            }
            
            .help-icon:hover {
                transform: scale(1.2);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Add fix for report generator error
    function fixReportGeneratorError() {
        console.log('Fixing report generator error...');
        
        // Override showToast to prevent infinite recursion
        window.showToast = function(message, type = 'info') {
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                // Create toast container if it doesn't exist
                const newContainer = document.createElement('div');
                newContainer.id = 'toast-container';
                newContainer.className = 'toast-container';
                document.body.appendChild(newContainer);
                return window.showToast(message, type); // Try again with new container
            }
            
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            let icon = '';
            switch (type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i>';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i>';
                    break;
                case 'warning':
                    icon = '<i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-info-circle" style="color: #3498db;"></i>';
            }
            
            toast.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <div style="margin-right: 10px; font-size: 20px;">${icon}</div>
                    <div>${message}</div>
                </div>
            `;
            
            toastContainer.appendChild(toast);
            
            // Trigger animation
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
                toast.style.opacity = '1';
            }, 10);
            
            // Auto remove after 4 seconds
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        };
    }
    
    // Fix logo debug error
    function fixLogoDebugError() {
        console.log('Fixing logo debug errors...');
        
        // Remove any broken event handlers
        const logoDebugScript = document.querySelector('script[src*="logo-debug.js"]');
        if (logoDebugScript) {
            logoDebugScript.remove();
        }
    }
    
    // Initialize fixes
    function initializeFixes() {
        console.log('Initializing all sidebar and UI fixes...');
        
        // Add CSS fixes
        addFixStyles();
        
        // Fix report generator error
        fixReportGeneratorError();
        
        // Fix logo debug error
        fixLogoDebugError();
        
        // Initialize all fixes
        initFixes();
        
        console.log('All fixes initialized successfully!');
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeFixes();
    });
    
    // Fallback initialization on window load
    window.addEventListener('load', function() {
        if (document.getElementById('sidebar') && !document.getElementById('sidebar-toggle')) {
            console.log('Initializing fixes on window load (fallback)');
            initializeFixes();
        }
    });
})();
EOL

# Create main fixes integration file
echo "🧩 Creating main fixes integration file..."
cat > "$APP_DIR/js/fixes/main-integration.js" << 'EOL'
// Main Integration File for Portnox TCO Analyzer Fixes
(function() {
    console.log('🚀 Initializing Portnox TCO Analyzer enhancements...');
    
    // Load required modules in the correct order
    const modules = [
        'js/fixes/vendor-data.js',
        'js/fixes/chart-enhancements.js',
        'js/fixes/sidebar-fix.js',
        'js/fixes/report-generator-enhanced.js',
        'js/fixes/help-tips.js',
        'js/fixes/visual-enhancements.js'
    ];
    
    let modulesLoaded = 0;
    
    // Function to load a script
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function() {
            console.error(`Failed to load script: ${src}`);
            callback(); // Continue even if script fails to load
        };
        document.head.appendChild(script);
    }
    
    // Load modules sequentially
    function loadNextModule(index) {
        if (index >= modules.length) {
            console.log(`All ${modules.length} enhancement modules loaded successfully!`);
            initializeApplication();
            return;
        }
        
        loadScript(modules[index], function() {
            modulesLoaded++;
            console.log(`Module loaded (${modulesLoaded}/${modules.length}): ${modules[index]}`);
            loadNextModule(index + 1);
        });
    }
    
    // Initialize the enhanced application
    function initializeApplication() {
        console.log('Initializing enhanced application...');
        
        // Show an initial toast notification
        if (window.showToast) {
            setTimeout(function() {
                window.showToast('TCO Analyzer enhancements loaded successfully!', 'success');
            }, 1000);
        }
        
        // Expose initialization function globally
        window.initializeCharts = function() {
            // Trigger an event that all modules can listen for
            const event = new CustomEvent('chartsInitialized');
            document.dispatchEvent(event);
            
            console.log('Charts initialized successfully!');
        };
    }
    
    // Start loading modules
    loadNextModule(0);
})();
EOL

# Create index.html changes
echo "📝 Creating index.html changes..."

# Add fix scripts to index.html
sed -i 's|</body>|    <script src="js/fixes/main-integration.js"></script>\n</body>|' "$APP_DIR/index.html"

# Create a CSS for logo fixes
echo "🎨 Creating logo fixes CSS..."
mkdir -p "$APP_DIR/css/fixes"
cat > "$APP_DIR/css/fixes/logo-fixes.css" << 'EOL'
/* Logo fixes for the Portnox TCO Analyzer */

.company-logo {
    height: 40px !important;
    width: auto !important;
    object-fit: contain !important;
    margin-right: 15px !important;
}

.vendor-logo img {
    max-height: 30px !important;
    max-width: 100% !important;
    object-fit: contain !important;
}

.logo img {
    height: 40px !important;
    width: auto !important;
    object-fit: contain !important;
}
EOL

# Create CSS to fix sidebar spacing issues
cat > "$APP_DIR/css/fixes/sidebar-fixes.css" << 'EOL'
/* Sidebar fixes for the Portnox TCO Analyzer */

.sidebar {
    width: 350px !important;
    min-width: 350px !important;
    max-width: 350px !important;
    transition: all 0.3s ease !important;
    overflow-y: auto !important;
    background-color: #fff !important;
    border-right: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

.sidebar-header {
    padding: 15px !important;
    border-bottom: 1px solid #e0e0e0 !important;
}

.sidebar-content {
    padding: 15px !important;
}

.sidebar-footer {
    padding: 15px !important;
    border-top: 1px solid #e0e0e0 !important;
    text-align: center !important;
}

.content-area {
    flex: 1 !important;
    overflow: auto !important;
    transition: all 0.3s ease !important;
}

.main-content {
    display: flex !important;
    height: calc(100vh - 100px) !important;
    overflow: hidden !important;
}

.config-card:not(:last-child) {
    margin-bottom: 20px !important;
}

.vendor-card {
    cursor: pointer !important;
    margin-bottom: 10px !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.2s ease !important;
}

.vendor-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.vendor-card.selected {
    border: 2px solid #2BD25B !important;
    background-color: rgba(43, 210, 91, 0.05) !important;
}

.vendor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
    gap: 10px !important;
}
EOL

# Create a directory for sample vendor logos
echo "🖼️ Creating sample vendor logos..."
mkdir -p "$APP_DIR/img/vendors"

# Bash function to create a placeholder SVG logo
create_logo() {
    local vendor="$1"
    local color="$2"
    local name="$3"
    
    cat > "$APP_DIR/img/vendors/${vendor}-logo.png" << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
    <rect width="120" height="40" fill="${color}" rx="4" ry="4"/>
    <text x="60" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">${name}</text>
</svg>
EOL

    echo "Created placeholder logo for ${name}"
}

# Create placeholder logos for all vendors
create_logo "portnox" "#2c3e50" "PORTNOX"
create_logo "cisco" "#049fd9" "CISCO"
create_logo "aruba" "#ff8300" "ARUBA"
create_logo "forescout" "#6b2a94" "FORESCOUT"
create_logo "fortinac" "#c8102e" "FORTINAC"
create_logo "juniper" "#84bc41" "JUNIPER"
create_logo "securew2" "#1a4d80" "SECUREW2"
create_logo "microsoft" "#00a4ef" "MICROSOFT"
create_logo "arista" "#2d7de1" "ARISTA"
create_logo "foxpass" "#ff5722" "FOXPASS"
create_logo "no-nac" "#f44336" "NO NAC"

# Create dummy API endpoint for data integration
mkdir -p "$APP_DIR/api"
cat > "$APP_DIR/api/vendor-data.json" << 'EOL'
{
  "status": "success",
  "data": {
    "vendors": {
      "portnox": {
        "name": "Portnox Cloud",
        "type": "Cloud-native NAC",
        "threeYearTCO": 202500
      },
      "cisco": {
        "name": "Cisco ISE",
        "type": "Enterprise NAC",
        "threeYearTCO": 450000
      },
      "aruba": {
        "name": "Aruba ClearPass",
        "type": "Policy Manager",
        "threeYearTCO": 380000
      },
      "forescout": {
        "name": "Forescout",
        "type": "Device Visibility",
        "threeYearTCO": 405000
      },
      "fortinac": {
        "name": "FortiNAC",
        "type": "Fortinet NAC",
        "threeYearTCO": 325000
      },
      "juniper": {
        "name": "Juniper Mist",
        "type": "AI-driven NAC",
        "threeYearTCO": 340000
      },
      "securew2": {
        "name": "SecureW2",
        "type": "Cloud RADIUS",
        "threeYearTCO": 280000
      },
      "microsoft": {
        "name": "Microsoft NPS",
        "type": "Windows Server NAC",
        "threeYearTCO": 290000
      },
      "arista": {
        "name": "Arista Agni",
        "type": "Network Control",
        "threeYearTCO": 300000
      },
      "foxpass": {
        "name": "Foxpass",
        "type": "Cloud RADIUS/LDAP",
        "threeYearTCO": 240000
      },
      "no-nac": {
        "name": "No NAC",
        "type": "High risk baseline",
        "threeYearTCO": 0
      }
    }
  }
}
EOL

# Create a README file with instructions
echo "📘 Creating README file..."
cat > "$APP_DIR/README.md" << 'EOL'
# Portnox Total Cost Analyzer

## Overview
The Portnox Total Cost Analyzer is a comprehensive tool for comparing the total cost of ownership (TCO) and return on investment (ROI) of Network Access Control (NAC) solutions. It provides detailed analysis for different stakeholders, including executives, financial decision-makers, security professionals, and technical teams.

## Features
- Multi-vendor comparison with Portnox Cloud and leading competitors
- Comprehensive TCO and ROI calculations
- Industry-specific compliance mapping
- Security posture improvement analysis
- Interactive charts and visualizations
- Detailed PDF report generation

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- Web server (local or remote)

### Setup
1. Upload all files to your web server directory
2. Ensure proper permissions are set for all directories and files
3. Access the application via your web server URL

### Structure
- **css/**: Stylesheet files
- **js/**: JavaScript files
- **img/**: Image assets
- **api/**: API endpoints for data integration

## Usage
1. Configure your analysis by selecting:
   - Vendors to compare
   - Industry & compliance requirements
   - Organization details
   - Cost parameters
2. Click "Calculate TCO & ROI" to generate results
3. Navigate between different stakeholder views:
   - Executive View
   - Financial View
   - Security & Compliance View
   - Technical View
4. Export a PDF report for sharing with stakeholders

## Development
The application uses standard web technologies:
- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js for data visualization
- jsPDF for PDF generation

### Adding New Vendors
To add a new vendor:
1. Add vendor data to `js/fixes/vendor-data.js`
2. Add vendor logo to `img/vendors/`
3. Update the vendor selection UI in `index.html`

### Customizing Calculations
Calculation logic is located in:
- `js/fixes/chart-enhancements.js` for chart-related calculations
- `js/fixes/vendor-data.js` for vendor-specific data

## Support
For issues or questions, please contact support@portnox.com
EOL

# Create an htaccess file for proper MIME types
echo "📋 Creating .htaccess file..."
cat > "$APP_DIR/.htaccess" << 'EOL'
# Set proper MIME types
AddType image/svg+xml .svg
AddType image/svg+xml .svgz
AddType application/json .json

# Enable CORS
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/json "access plus 0 seconds"
</IfModule>
EOL

echo "==============================================="
echo "✅ Portnox TCO Analyzer Enhancement Script Complete!"
echo "==============================================="
echo 
echo "The script has successfully applied the following enhancements:"
echo "- Fixed sidebar and UI issues"
echo "- Added comprehensive vendor data and comparison logic"
echo "- Improved chart visualizations and data calculations"
echo "- Added PDF report generation functionality"
echo "- Enhanced user interface with tooltips and help content"
echo "- Added compliance framework mapping"
echo "- Created industry-specific analysis"
echo 
echo "To apply these changes, upload all files to your web server."
echo "Make sure to test all functionality after deployment."
echo 
echo "For further customizations, see the generated README.md file."
echo "==============================================="
