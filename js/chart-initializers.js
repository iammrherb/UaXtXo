/**
 * Chart Initializers
 * Contains factory functions for all chart types used in the TCO Analyzer
 * Version: 2.1
 */

(function() {
  // Create a namespace for chart initializers
  window.ChartFactory = window.ChartFactory || {};
  
  // Helper function to convert hex color to rgba
  function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(54, 162, 235, ${alpha || 1})`;
    
    // Handle shorthand hex (e.g. #ABC)
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Format currency values
  function formatCurrency(value) {
    if (typeof value !== 'number') return '$0';
    return '$' + value.toLocaleString();
  }
  
  // TCO Comparison Chart
  window.ChartFactory.createTcoComparisonChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.vendors.length) {
      console.error('Invalid data for TCO comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [
          {
            label: 'Initial Cost',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: data.initialCosts,
            stack: 'Stack 0'
          },
          {
            label: 'Operational Cost',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            data: data.operationalCosts,
            stack: 'Stack 0'
          },
          {
            label: 'Maintenance Cost',
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            data: data.maintenanceCosts,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Total Cost of Ownership by Solution'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              },
              footer: function(tooltipItems) {
                let total = 0;
                tooltipItems.forEach(item => {
                  total += item.parsed.y;
                });
                return 'Total: ' + formatCurrency(total);
              }
            }
          }
        }
      }
    });
  };
  
  // Breakdown Chart (Pie/Doughnut)
  window.ChartFactory.createBreakdownChart = function(canvasId, data, title, type) {
    if (!data || !data.labels || !data.values) {
      console.error('Invalid data for breakdown chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: type || 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: !!title,
            text: title || ''
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };
  
  // Cumulative Cost Chart
  window.ChartFactory.createCumulativeCostChart = function(canvasId, data) {
    if (!data || !data.years || !data.solutions) {
      console.error('Invalid data for cumulative cost chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'line',
      data: {
        labels: data.years,
        datasets: data.solutions.map(solution => ({
          label: solution.name,
          data: solution.cumulativeCosts,
          borderColor: solution.color,
          backgroundColor: hexToRgba(solution.color, 0.1),
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Cost ($)'
            },
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${formatCurrency(value)}`;
              }
            }
          }
        }
      }
    });
  };
  
  // Implementation Comparison Chart
  window.ChartFactory.createImplementationChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.implementationTimes) {
      console.error('Invalid data for implementation comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [{
          label: 'Implementation Time (Days)',
          data: data.implementationTimes,
          backgroundColor: data.colors || 'rgba(75, 192, 192, 0.6)'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Implementation Time Comparison'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
  };
  
  // Feature Comparison Radar Chart
  window.ChartFactory.createFeatureComparisonChart = function(canvasId, data) {
    if (!data || !data.features || !data.vendors) {
      console.error('Invalid data for feature comparison chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'radar',
      data: {
        labels: data.features,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.scores,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Feature Comparison'
          }
        }
      }
    });
  };
  
  // ROI Comparison Chart
  window.ChartFactory.createRoiChart = function(canvasId, data) {
    if (!data || !data.vendors || !data.roiValues) {
      console.error('Invalid data for ROI chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.vendors,
        datasets: [{
          label: '3-Year ROI (%)',
          data: data.roiValues,
          backgroundColor: data.colors || 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Return on Investment (3 Years)'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'ROI (%)'
            }
          }
        }
      }
    });
  };
  
  // Industry Compliance Radar Chart
  window.ChartFactory.createIndustryComplianceChart = function(canvasId, data) {
    if (!data || !data.frameworks || !data.vendors) {
      console.error('Invalid data for industry compliance chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'radar',
      data: {
        labels: data.frameworks,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.compliance,
          backgroundColor: hexToRgba(vendor.color, 0.2),
          borderColor: vendor.color,
          pointBackgroundColor: vendor.color
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: (data.industryName ? data.industryName + ' - ' : '') + 'Compliance Coverage'
          }
        }
      }
    });
  };
  
  // Risk Reduction Chart
  window.ChartFactory.createRiskReductionChart = function(canvasId, data) {
    if (!data || !data.categories || !data.vendors) {
      console.error('Invalid data for risk reduction chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'bar',
      data: {
        labels: data.categories,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.reductions,
          backgroundColor: hexToRgba(vendor.color, 0.6)
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Risk Reduction (%)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Security Risk Reduction by Category'
          }
        }
      }
    });
  };
  
  // Sensitivity Analysis Chart
  window.ChartFactory.createSensitivityChart = function(canvasId, data) {
    if (!data || !data.values || !data.vendors) {
      console.error('Invalid data for sensitivity chart');
      return null;
    }
    
    return window.ChartUtils.initializeChart(canvasId, {
      type: 'line',
      data: {
        labels: data.values,
        datasets: data.vendors.map((vendor, index) => ({
          label: vendor.name,
          data: vendor.results,
          borderColor: vendor.color,
          backgroundColor: hexToRgba(vendor.color, 0.1),
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: data.xAxisLabel || 'Value'
            }
          },
          y: {
            title: {
              display: true,
              text: data.yAxisLabel || 'Result'
            },
            ticks: {
              callback: function(value) {
                if (data.isCurrency) {
                  return formatCurrency(value);
                }
                return value;
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Sensitivity Analysis: ' + (data.title || 'Parameter Impact')
          }
        }
      }
    });
  };
  
  console.log('Chart initializers loaded successfully');
})();
