/**
 * Enhanced Chart System
 * Provides improved visualizations for ROI, TCO, and vendor comparisons
 */
(function() {
  console.log('Installing Enhanced Chart System...');
  
  // Store the original Chart.js constructor
  const OriginalChart = window.Chart;
  
  // Chart configuration presets for consistent styling
  const chartPresets = {
    colors: {
      primary: '#1B67B2',
      secondary: '#65BD44',
      tertiary: '#FF9F40',
      quaternary: '#FF6384',
      quinary: '#36A2EB',
      neutral: '#9DA5B4',
      neutralLight: '#E8E9EA',
      positive: '#2BD25B',
      negative: '#FF6B6B',
      background: 'rgba(255, 255, 255, 0.8)'
    },
    fonts: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      size: {
        small: 10,
        base: 12,
        medium: 14,
        large: 16
      }
    },
    animation: {
      duration: 750,
      easing: 'easeOutQuart'
    }
  };
  
  // Fix for canvas sizing issues
  function fixCanvasSizing() {
    const containers = document.querySelectorAll('.chart-container');
    containers.forEach(container => {
      container.style.height = '300px';
      container.style.display = 'block';
      container.style.position = 'relative';
      container.style.width = '100%';
      
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.style.display = 'block';
      }
    });
  }
  
  // Helper function to create chart options with consistent styling
  function createChartOptions(type, customOptions = {}) {
    // Base options that apply to all chart types
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: chartPresets.animation,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15,
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.base
            }
          }
        },
        tooltip: {
          backgroundColor: chartPresets.colors.background,
          titleColor: chartPresets.colors.primary,
          bodyColor: '#333',
          borderColor: chartPresets.colors.neutralLight,
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          titleFont: {
            family: chartPresets.fonts.base,
            size: chartPresets.fonts.size.medium,
            weight: 'bold'
          },
          bodyFont: {
            family: chartPresets.fonts.base,
            size: chartPresets.fonts.size.base
          },
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          boxPadding: 3,
          usePointStyle: true
        }
      }
    };
    
    // Type-specific options
    const typeOptions = {
      bar: {
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              },
              callback: function(value) {
                if (customOptions.currency) {
                  return '$' + value.toLocaleString();
                }
                return value;
              }
            }
          }
        }
      },
      line: {
        elements: {
          line: {
            tension: 0.3
          },
          point: {
            radius: 4,
            hoverRadius: 6
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              },
              callback: function(value) {
                if (customOptions.currency) {
                  return '$' + value.toLocaleString();
                }
                if (customOptions.percentage) {
                  return value + '%';
                }
                return value;
              }
            }
          }
        }
      },
      radar: {
        elements: {
          line: {
            tension: 0.3
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            pointLabels: {
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              }
            },
            ticks: {
              backdropColor: 'transparent',
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              },
              showLabelBackdrop: false
            }
          }
        }
      },
      doughnut: {
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      },
      pie: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    };
    
    // Merge base options with type-specific options
    const mergedOptions = {
      ...baseOptions,
      ...(typeOptions[type] || {})
    };
    
    // Merge with custom options
    return mergeDeep(mergedOptions, customOptions);
  }
  
  // Deep merge utility for options
  function mergeDeep(target, source) {
    const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    
    const output = { ...target };
    
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
    
    return output;
  }
  
  // Enhanced chart initialization for TCO comparison
  function enhancedTCOComparisonChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas element not found: ${canvasId}`);
      return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    return new OriginalChart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Hardware',
            backgroundColor: chartPresets.colors.primary,
            data: data.hardware
          },
          {
            label: 'Software',
            backgroundColor: chartPresets.colors.secondary,
            data: data.software
          },
          {
            label: 'Implementation',
            backgroundColor: chartPresets.colors.tertiary,
            data: data.implementation
          },
          {
            label: 'Maintenance',
            backgroundColor: chartPresets.colors.quaternary,
            data: data.maintenance
          },
          {
            label: 'Support',
            backgroundColor: chartPresets.colors.quinary,
            data: data.support
          }
        ]
      },
      options: createChartOptions('bar', {
        plugins: {
          title: {
            display: true,
            text: 'Total Cost of Ownership Comparison',
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.large,
              weight: 'bold'
            }
          }
        },
        currency: true
      })
    });
  }
  
  // Enhanced ROI timeline chart
  function enhancedROITimelineChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas element not found: ${canvasId}`);
      return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    return new OriginalChart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Cumulative Cost - Current Solution',
            borderColor: chartPresets.colors.quaternary,
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 2,
            fill: true,
            data: data.currentCost
          },
          {
            label: 'Cumulative Cost - Portnox Cloud',
            borderColor: chartPresets.colors.secondary,
            backgroundColor: 'rgba(101, 189, 68, 0.1)',
            borderWidth: 2,
            fill: true,
            data: data.portnoxCost
          },
          {
            label: 'Break-even Point',
            borderColor: chartPresets.colors.primary,
            backgroundColor: chartPresets.colors.primary,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
            data: data.breakeven
          }
        ]
      },
      options: createChartOptions('line', {
        plugins: {
          title: {
            display: true,
            text: 'ROI Timeline Analysis',
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.large,
              weight: 'bold'
            }
          },
          annotation: {
            annotations: {
              breakeven: {
                type: 'line',
                xMin: data.breakevenPoint,
                xMax: data.breakevenPoint,
                borderColor: chartPresets.colors.primary,
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  content: 'Break-even Point',
                  enabled: true,
                  position: 'top',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: chartPresets.colors.primary,
                  font: {
                    family: chartPresets.fonts.base,
                    size: chartPresets.fonts.size.small,
                    weight: 'bold'
                  }
                }
              }
            }
          }
        },
        currency: true
      })
    });
  }
  
  // Enhanced feature comparison radar chart
  function enhancedFeatureComparisonChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas element not found: ${canvasId}`);
      return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    return new OriginalChart(ctx, {
      type: 'radar',
      data: {
        labels: data.features,
        datasets: [
          {
            label: 'Portnox Cloud',
            backgroundColor: 'rgba(101, 189, 68, 0.2)',
            borderColor: chartPresets.colors.secondary,
            pointBackgroundColor: chartPresets.colors.secondary,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: chartPresets.colors.secondary,
            data: data.portnoxRatings
          },
          {
            label: data.competitorName,
            backgroundColor: 'rgba(27, 103, 178, 0.2)',
            borderColor: chartPresets.colors.primary,
            pointBackgroundColor: chartPresets.colors.primary,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: chartPresets.colors.primary,
            data: data.competitorRatings
          }
        ]
      },
      options: createChartOptions('radar', {
        plugins: {
          title: {
            display: true,
            text: 'Feature Comparison',
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.large,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                const featureDescriptions = data.featureDescriptions || {};
                const feature = data.features[context.dataIndex];
                
                let result = `${label}: ${value}/10`;
                
                if (featureDescriptions[feature]) {
                  result += `\n${featureDescriptions[feature]}`;
                }
                
                return result;
              }
            }
          }
        },
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        }
      })
    });
  }
  
  // Enhanced cost breakdown doughnut chart
  function enhancedCostBreakdownChart(canvasId, data, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas element not found: ${canvasId}`);
      return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    return new OriginalChart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: [
              chartPresets.colors.primary,
              chartPresets.colors.secondary,
              chartPresets.colors.tertiary,
              chartPresets.colors.quaternary,
              chartPresets.colors.quinary,
              chartPresets.colors.neutral
            ],
            borderWidth: 1,
            borderColor: '#fff'
          }
        ]
      },
      options: createChartOptions('doughnut', {
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.large,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                const percentage = Math.round((value / total) * 100);
                
                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      })
    });
  }
  
  // Enhanced implementation time comparison chart
  function enhancedImplementationComparisonChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas element not found: ${canvasId}`);
      return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    return new OriginalChart(ctx, {
      type: 'bar',
      data: {
        labels: data.phases,
        datasets: [
          {
            label: 'Portnox Cloud',
            backgroundColor: chartPresets.colors.secondary,
            data: data.portnoxTimes
          },
          {
            label: data.competitorName,
            backgroundColor: chartPresets.colors.primary,
            data: data.competitorTimes
          }
        ]
      },
      options: createChartOptions('bar', {
        plugins: {
          title: {
            display: true,
            text: 'Implementation Time Comparison (Days)',
            font: {
              family: chartPresets.fonts.base,
              size: chartPresets.fonts.size.large,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Days',
              font: {
                family: chartPresets.fonts.base,
                size: chartPresets.fonts.size.small
              }
            }
          }
        }
      })
    });
  }
  
  // Create a single function for initializing all enhanced charts
  window.initializeEnhancedCharts = function(calculatorData) {
    if (!calculatorData) {
      console.warn('No calculator data provided for chart initialization');
      return;
    }
    
    // Fix canvas sizing issues first
    fixCanvasSizing();
    
    // Create TCO comparison chart data
    const tcoData = {
      labels: ['Portnox Cloud', calculatorData.currentVendor || 'Current Vendor'],
      hardware: [calculatorData.portnoxHardwareCost || 0, calculatorData.competitorHardwareCost || 0],
      software: [calculatorData.portnoxSoftwareCost || 0, calculatorData.competitorSoftwareCost || 0],
      implementation: [calculatorData.portnoxImplementationCost || 0, calculatorData.competitorImplementationCost || 0],
      maintenance: [calculatorData.portnoxMaintenanceCost || 0, calculatorData.competitorMaintenanceCost || 0],
      support: [calculatorData.portnoxSupportCost || 0, calculatorData.competitorSupportCost || 0]
    };
    
    // Create ROI timeline chart data
    const yearsToProject = calculatorData.yearsToProject || 3;
    const years = Array.from({length: yearsToProject + 1}, (_, i) => `Year ${i}`);
    const breakevenPoint = calculatorData.breakevenPoint || 1;
    
    const portnoxCosts = Array.from({length: yearsToProject + 1}, (_, i) => {
      return i === 0 ? calculatorData.portnoxInitialCost || 0 :
        (calculatorData.portnoxInitialCost || 0) + (calculatorData.portnoxAnnualCost || 0) * i;
    });
    
    const competitorCosts = Array.from({length: yearsToProject + 1}, (_, i) => {
      return i === 0 ? calculatorData.competitorInitialCost || 0 :
        (calculatorData.competitorInitialCost || 0) + (calculatorData.competitorAnnualCost || 0) * i;
    });
    
    const breakevenLine = Array.from({length: yearsToProject + 1}, (_, i) => {
      return i === breakevenPoint ? Math.max(...competitorCosts, ...portnoxCosts) : null;
    });
    
    const roiData = {
      labels: years,
      portnoxCost: portnoxCosts,
      currentCost: competitorCosts,
      breakeven: breakevenLine,
      breakevenPoint: breakevenPoint
    };
    
    // Create feature comparison chart data
    const featureData = {
      features: ['Deployment Ease', 'Scalability', 'Integration', 'Maintenance', 'Cloud Readiness', 'Security'],
      portnoxRatings: [9, 9, 8, 9, 10, 9],
      competitorRatings: [6, 7, 5, 6, 5, 7],
      competitorName: calculatorData.currentVendor || 'Current Vendor',
      featureDescriptions: {
        'Deployment Ease': 'Ease of initial deployment and configuration',
        'Scalability': 'Ability to scale with organizational growth',
        'Integration': 'Integration capabilities with existing systems',
        'Maintenance': 'Ongoing maintenance requirements and ease',
        'Cloud Readiness': 'Native cloud capabilities and features',
        'Security': 'Security features and compliance capabilities'
      }
    };
    
    // Create cost breakdown data for Portnox
    const portnoxBreakdownData = {
      labels: ['Subscription', 'Implementation', 'Training', 'Support', 'Personnel'],
      values: [
        calculatorData.portnoxSubscriptionCost || 20000,
        calculatorData.portnoxImplementationCost || 15000,
        calculatorData.portnoxTrainingCost || 5000,
        calculatorData.portnoxSupportCost || 10000,
        calculatorData.portnoxPersonnelCost || 50000
      ]
    };
    
    // Create cost breakdown data for competitor
    const competitorBreakdownData = {
      labels: ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Support', 'Personnel'],
      values: [
        calculatorData.competitorHardwareCost || 40000,
        calculatorData.competitorSoftwareCost || 30000,
        calculatorData.competitorImplementationCost || 35000,
        calculatorData.competitorMaintenanceCost || 15000,
        calculatorData.competitorSupportCost || 20000,
        calculatorData.competitorPersonnelCost || 100000
      ]
    };
    
    // Create implementation comparison data
    const implementationData = {
      phases: ['Planning', 'Deployment', 'Configuration', 'Testing', 'Training', 'Go-Live'],
      portnoxTimes: [2, 1, 2, 3, 2, 1],
      competitorTimes: [5, 10, 15, 20, 10, 5],
      competitorName: calculatorData.currentVendor || 'Current Vendor'
    };
    
    // Initialize all charts
    console.log('Initializing enhanced TCO comparison chart...');
    enhancedTCOComparisonChart('tco-comparison-chart', tcoData);
    
    console.log('Initializing enhanced ROI timeline chart...');
    enhancedROITimelineChart('roi-timeline-chart', roiData);
    
    console.log('Initializing enhanced feature comparison chart...');
    enhancedFeatureComparisonChart('feature-comparison-chart', featureData);
    
    console.log('Initializing enhanced portnox cost breakdown chart...');
    enhancedCostBreakdownChart('portnox-cost-breakdown-chart', portnoxBreakdownData, 'Portnox Cloud Cost Breakdown');
    
    console.log('Initializing enhanced competitor cost breakdown chart...');
    enhancedCostBreakdownChart('onprem-cost-breakdown-chart', competitorBreakdownData, `${calculatorData.currentVendor || 'Current Vendor'} Cost Breakdown`);
    
    console.log('Initializing enhanced implementation comparison chart...');
    enhancedImplementationComparisonChart('implementation-comparison-chart', implementationData);
    
    console.log('All enhanced charts initialized successfully!');
  };
  
  // Patch Calculator's calculate method to update enhanced charts
  if (window.calculator && typeof window.calculator.calculate === 'function') {
    const originalCalculate = window.calculator.calculate;
    
    window.calculator.calculate = function() {
      const result = originalCalculate.apply(this, arguments);
      
      // After calculating, initialize enhanced charts with the calculator data
      if (this.data) {
        window.initializeEnhancedCharts(this.data);
      }
      
      return result;
    };
    
    console.log('Calculator calculate method patched for enhanced charts');
  }
  
  console.log('Enhanced Chart System installed successfully');
})();
