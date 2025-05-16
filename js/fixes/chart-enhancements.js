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
