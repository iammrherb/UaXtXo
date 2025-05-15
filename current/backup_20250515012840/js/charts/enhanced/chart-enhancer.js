/**
 * Chart Enhancer - Improves chart visualization and data representation
 */
(function() {
    console.log("Chart Enhancer: Initializing...");
    
    // Enhanced chart configurations
    const enhancedChartConfigs = {
        // TCO Comparison Chart
        tcoComparison: function(data) {
            return {
                type: 'bar',
                data: {
                    labels: ['Portnox Cloud', 'Current Solution'],
                    datasets: [
                        {
                            label: '3-Year TCO ($)',
                            data: [data.portnox.totalTco, data.competitor.totalTco],
                            backgroundColor: ['rgba(58, 133, 255, 0.7)', 'rgba(204, 79, 79, 0.7)'],
                            borderColor: ['rgba(58, 133, 255, 1)', 'rgba(204, 79, 79, 1)'],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.x.toLocaleString();
                                }
                            }
                        },
                        datalabels: {
                            color: '#fff',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            };
        },
        
        // Cost Breakdown Chart
        costBreakdown: function(data, isPortnox) {
            const costItems = [
                'Licensing', 'Hardware', 'Support', 
                'Implementation', 'Training', 
                'IT Resources', 'Operational'
            ];
            
            const costValues = [
                data.licensing, data.hardware, data.support,
                data.implementation, data.training,
                data.itResources, data.operational
            ];
            
            const colors = isPortnox ? 
                ['#3A85FF', '#4F95FF', '#64A5FF', '#79B5FF', '#8EC5FF', '#A3D5FF', '#B8E5FF'] :
                ['#CC4F4F', '#D46060', '#DC7171', '#E48282', '#EC9393', '#F4A4A4', '#FCB5B5'];
            
            return {
                type: 'pie',
                data: {
                    labels: costItems,
                    datasets: [{
                        data: costValues,
                        backgroundColor: colors,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                                }
                            }
                        },
                        datalabels: {
                            color: '#fff',
                            font: {
                                weight: 'bold',
                                size: 11
                            },
                            formatter: function(value, context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return percentage > 5 ? `${percentage}%` : '';
                            }
                        }
                    }
                }
            };
        },
        
        // Cumulative Cost Chart
        cumulativeCost: function(data) {
            const years = Array.from({length: data.years + 1}, (_, i) => `Year ${i}`);
            years[0] = 'Initial';
            
            // Calculate cumulative costs
            const portnoxCumulative = [data.portnox.implementation + data.portnox.hardware];
            const competitorCumulative = [data.competitor.implementation + data.competitor.hardware];
            
            const portnoxAnnual = data.portnox.licensing / data.years + 
                                 data.portnox.training / data.years +
                                 data.portnox.itResources / data.years +
                                 data.portnox.operational / data.years;
            
            const competitorAnnual = data.competitor.licensing / data.years + 
                                    data.competitor.support / data.years +
                                    data.competitor.training / data.years +
                                    data.competitor.itResources / data.years +
                                    data.competitor.operational / data.years;
            
            for (let i = 1; i <= data.years; i++) {
                portnoxCumulative.push(portnoxCumulative[i-1] + portnoxAnnual);
                competitorCumulative.push(competitorCumulative[i-1] + competitorAnnual);
            }
            
            return {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Portnox Cloud',
                            data: portnoxCumulative,
                            borderColor: 'rgba(58, 133, 255, 1)',
                            backgroundColor: 'rgba(58, 133, 255, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: data.competitor.name,
                            data: competitorCumulative,
                            borderColor: 'rgba(204, 79, 79, 1)',
                            backgroundColor: 'rgba(204, 79, 79, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    }
                }
            };
        },
        
        // Implementation Comparison Chart
        implementationComparison: function(data) {
            const vendors = Object.keys(data);
            const smallTimes = [];
            const mediumTimes = [];
            const largeTimes = [];
            
            vendors.forEach(vendor => {
                // Convert time strings to approximate days for visualization
                const timeMap = {
                    "Hours to 1 day": 1,
                    "Hours": 0.5,
                    "1-3 days": 2,
                    "Days": 3,
                    "1-2 Weeks": 10,
                    "2-4 Weeks": 21,
                    "1-3 Months": 60,
                    "2-3 Months": 75,
                    "3-6 Months": 120,
                    "3-6+ Months": 135,
                    "6-12 Months": 270
                };
                
                smallTimes.push(timeMap[data[vendor].small] || 30);
                mediumTimes.push(timeMap[data[vendor].medium] || 60);
                largeTimes.push(timeMap[data[vendor].large] || 90);
            });
            
            return {
                type: 'bar',
                data: {
                    labels: vendors.map(v => v.charAt(0).toUpperCase() + v.slice(1)),
                    datasets: [
                        {
                            label: 'Small Deployment (<1,000 devices)',
                            data: smallTimes,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Medium Deployment (1,000-5,000 devices)',
                            data: mediumTimes,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Large Deployment (5,000+ devices)',
                            data: largeTimes,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Implementation Time (Days)'
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.parsed.y;
                                    let timeStr = '';
                                    
                                    if (value <= 1) timeStr = 'Hours to 1 day';
                                    else if (value <= 7) timeStr = '1-7 days';
                                    else if (value <= 30) timeStr = '1-4 weeks';
                                    else if (value <= 90) timeStr = '1-3 months';
                                    else if (value <= 180) timeStr = '3-6 months';
                                    else timeStr = '6+ months';
                                    
                                    return `${context.dataset.label}: ${timeStr}`;
                                }
                            }
                        }
                    }
                }
            };
        },
        
        // Feature Comparison Chart
        featureComparison: function(data) {
            // Feature categories
            const categories = [
                'Authentication', 'IoT Support', 'Cloud Capabilities',
                'Deployment Flexibility', 'Zero-Trust', 'Guest Management'
            ];
            
            // Simplified scores for visualization (0-100)
            const portnoxScores = [95, 90, 100, 85, 95, 90];
            const competitorScores = [85, 70, 50, 60, 75, 65];
            
            return {
                type: 'radar',
                data: {
                    labels: categories,
                    datasets: [
                        {
                            label: 'Portnox Cloud',
                            data: portnoxScores,
                            backgroundColor: 'rgba(58, 133, 255, 0.2)',
                            borderColor: 'rgba(58, 133, 255, 1)',
                            pointBackgroundColor: 'rgba(58, 133, 255, 1)',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(58, 133, 255, 1)'
                        },
                        {
                            label: data.competitorName || 'Competitor',
                            data: competitorScores.map(score => score * data.competitorFactor || 1),
                            backgroundColor: 'rgba(204, 79, 79, 0.2)',
                            borderColor: 'rgba(204, 79, 79, 1)',
                            pointBackgroundColor: 'rgba(204, 79, 79, 1)',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(204, 79, 79, 1)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                display: false
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 2
                        }
                    }
                }
            };
        },
        
        // ROI Chart
        roiChart: function(data) {
            const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);
            
            // Calculate monthly costs
            const portnoxMonthly = data.portnox.totalTco / 36;
            const competitorMonthly = data.competitor.totalTco / 36;
            
            // Calculate cumulative costs
            const portnoxCumulative = [];
            const competitorCumulative = [];
            
            // Initial implementation costs
            portnoxCumulative.push(data.portnox.implementation + data.portnox.hardware);
            competitorCumulative.push(data.competitor.implementation + data.competitor.hardware);
            
            // Monthly costs
            for (let i = 1; i < 36; i++) {
                portnoxCumulative.push(portnoxCumulative[0] + (portnoxMonthly * i));
                competitorCumulative.push(competitorCumulative[0] + (competitorMonthly * i));
            }
            
            // Calculate savings per month
            const savings = competitorCumulative.map((cost, i) => cost - portnoxCumulative[i]);
            
            // Find breakeven point
            let breakevenMonth = 0;
            for (let i = 0; i < savings.length; i++) {
                if (savings[i] > 0) {
                    breakevenMonth = i;
                    break;
                }
            }
            
            return {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Cumulative Savings',
                            data: savings,
                            borderColor: 'rgba(40, 167, 69, 1)',
                            backgroundColor: 'rgba(40, 167, 69, 0.1)',
                            fill: true,
                            tension: 0.1
                        },
                        {
                            label: 'Breakeven Point',
                            data: Array(months.length).fill(null),
                            pointRadius: Array(months.length).fill(0),
                            pointHoverRadius: Array(months.length).fill(0),
                            showLine: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Savings: $${Math.round(context.parsed.y).toLocaleString()}`;
                                }
                            }
                        },
                        annotation: {
                            annotations: {
                                breakeven: {
                                    type: 'line',
                                    xMin: breakevenMonth,
                                    xMax: breakevenMonth,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 2,
                                    label: {
                                        display: true,
                                        content: `Breakeven: Month ${breakevenMonth+1}`,
                                        position: 'top'
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
    };
    
    // Create Enhanced ChartManager if not exists
    if (!window.EnhancedChartManager) {
        window.EnhancedChartManager = {
            createTcoComparisonChart: function(canvasId, data) {
                return window.createChart(canvasId, enhancedChartConfigs.tcoComparison(data));
            },
            
            createCostBreakdownChart: function(canvasId, data, isPortnox) {
                return window.createChart(canvasId, enhancedChartConfigs.costBreakdown(data, isPortnox));
            },
            
            createCumulativeCostChart: function(canvasId, data) {
                return window.createChart(canvasId, enhancedChartConfigs.cumulativeCost(data));
            },
            
            createImplementationComparisonChart: function(canvasId, data) {
                return window.createChart(canvasId, enhancedChartConfigs.implementationComparison(data));
            },
            
            createFeatureComparisonChart: function(canvasId, data) {
                return window.createChart(canvasId, enhancedChartConfigs.featureComparison(data));
            },
            
            createRoiChart: function(canvasId, data) {
                return window.createChart(canvasId, enhancedChartConfigs.roiChart(data));
            }
        };
    }
    
    // Add functions to existing ChartManager if available
    if (window.ChartManager) {
        window.ChartManager.enhancedChartConfigs = enhancedChartConfigs;
        
        // Add methods if they don't exist
        if (!window.ChartManager.createTcoComparisonChart) {
            window.ChartManager.createTcoComparisonChart = window.EnhancedChartManager.createTcoComparisonChart;
        }
        
        if (!window.ChartManager.createCostBreakdownChart) {
            window.ChartManager.createCostBreakdownChart = window.EnhancedChartManager.createCostBreakdownChart;
        }
        
        if (!window.ChartManager.createCumulativeCostChart) {
            window.ChartManager.createCumulativeCostChart = window.EnhancedChartManager.createCumulativeCostChart;
        }
        
        if (!window.ChartManager.createImplementationComparisonChart) {
            window.ChartManager.createImplementationComparisonChart = window.EnhancedChartManager.createImplementationComparisonChart;
        }
        
        if (!window.ChartManager.createFeatureComparisonChart) {
            window.ChartManager.createFeatureComparisonChart = window.EnhancedChartManager.createFeatureComparisonChart;
        }
        
        if (!window.ChartManager.createRoiChart) {
            window.ChartManager.createRoiChart = window.EnhancedChartManager.createRoiChart;
        }
    }
    
    console.log("Chart Enhancer: Initialized successfully");
})();
