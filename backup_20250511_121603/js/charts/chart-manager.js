/**
 * Chart Manager
 * Centralized chart configuration and management
 */

const ChartManager = (function() {
    // Default chart colors
    const colors = {
        portnox: '#2BD25B',
        primary: '#1B67B2',
        secondary: '#4A5C6A',
        accent: '#F39C12',
        danger: '#E74C3C',
        warning: '#F1C40F',
        info: '#3498DB',
        light: '#ECF0F1',
        dark: '#2C3E50'
    };
    
    // Chart.js default configuration
    Chart.defaults.font.family = "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#333';
    
    // Register Chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Default options for different chart types
    const defaultOptions = {
        bar: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        font: {
                            weight: 500
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 4,
                    titleFont: {
                        size: 14,
                        weight: 600
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    }
                }
            }
        },
        line: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    position: 'nearest'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: '#f0f0f0'
                    }
                }
            }
        },
        radar: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        circular: true
                    }
                }
            }
        },
        doughnut: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    };
    
    // Create and configure a chart
    function createChart(ctx, type, data, customOptions = {}) {
        const baseOptions = defaultOptions[type] || defaultOptions.bar;
        const options = deepMerge(baseOptions, customOptions);
        
        return new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    }
    
    // Update chart data with animation
    function updateChart(chart, newData) {
        if (!chart) return;
        
        chart.data = newData;
        chart.update('active');
    }
    
    // Generate consistent color scheme for vendors
    function getVendorColors(vendors) {
        const vendorColors = {};
        let colorIndex = 0;
        const colorPalette = [
            colors.primary,
            colors.secondary,
            colors.accent,
            colors.info,
            colors.warning,
            colors.danger
        ];
        
        vendors.forEach(vendor => {
            if (vendor === 'portnox') {
                vendorColors[vendor] = colors.portnox;
            } else {
                vendorColors[vendor] = colorPalette[colorIndex % colorPalette.length];
                colorIndex++;
            }
        });
        
        return vendorColors;
    }
    
    // Format currency values
    function formatCurrency(value, decimals = 0) {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(decimals)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(decimals)}K`;
        } else {
            return `${value.toFixed(decimals)}`;
        }
    }
    
    // Deep merge objects
    function deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }
    
    // Export chart as image
    function exportChart(chart, filename = 'chart.png') {
        if (!chart) return;
        
        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }
    
    // Public API
    return {
        colors,
        createChart,
        updateChart,
        getVendorColors,
        formatCurrency,
        exportChart
    };
})();

// Export for use in other modules
window.ChartManager = ChartManager;
