/**
 * Enhanced Chart Initializer for Portnox TCO Analyzer
 * Properly initializes charts with best practices and ensures cleanup
 */
(function() {
  // Initialize TCO comparison chart with enhanced data and visualization
  window.initTcoComparisonChart = function(vendors, data) {
    if (!vendors || vendors.length === 0) {
      console.error("No vendors provided for TCO comparison chart");
      return;
    }
    
    const canvasId = 'tco-comparison-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.8)',
      cisco: 'rgba(0, 114, 178, 0.8)',
      aruba: 'rgba(227, 119, 41, 0.8)',
      forescout: 'rgba(187, 85, 102, 0.8)',
      fortinac: 'rgba(128, 0, 0, 0.8)',
      'no-nac': 'rgba(150, 150, 150, 0.8)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    const costCategories = ['Hardware', 'Software', 'Implementation', 'Maintenance', 'Operations', 'Support'];
    
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor] || {
        hardware: 0,
        software: 0,
        implementation: 0,
        maintenance: 0,
        operations: 0,
        support: 0
      };
      
      return {
        label: vendorNames[vendor] || vendor,
        data: [
          vendorData.hardware || 0,
          vendorData.software || 0,
          vendorData.implementation || 0,
          vendorData.maintenance || 0,
          vendorData.operations || 0,
          vendorData.support || 0
        ],
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.8)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 1
      };
    });
    
    const config = {
      type: 'bar',
      data: {
        labels: costCategories,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 0 
                }).format(context.raw);
                return label;
              }
            }
          },
          datalabels: {
            display: function(context) {
              return context.dataset.data[context.dataIndex] > 0;
            },
            formatter: function(value) {
              return '$' + Math.round(value/1000) + 'k';
            },
            color: '#fff',
            font: {
              weight: 'bold'
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
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
  
  // Initialize cumulative cost chart
  window.initCumulativeCostChart = function(vendors, data) {
    if (!vendors || vendors.length === 0) {
      console.error("No vendors provided for cumulative cost chart");
      return;
    }
    
    const canvasId = 'cumulative-cost-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.8)',
      cisco: 'rgba(0, 114, 178, 0.8)',
      aruba: 'rgba(227, 119, 41, 0.8)',
      forescout: 'rgba(187, 85, 102, 0.8)',
      fortinac: 'rgba(128, 0, 0, 0.8)',
      'no-nac': 'rgba(150, 150, 150, 0.8)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    // Get the number of years to project
    const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
    const labels = Array.from({length: yearsToProject + 1}, (_, i) => i === 0 ? 'Initial' : `Year ${i}`);
    
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor] || {
        initialCost: 0,
        year1: 0,
        year2: 0,
        year3: 0,
        year4: 0,
        year5: 0
      };
      
      // Calculate cumulative costs
      const yearlyData = [
        vendorData.initialCost || 0,
        vendorData.year1 || 0,
        vendorData.year2 || 0,
        vendorData.year3 || 0,
        vendorData.year4 || 0,
        vendorData.year5 || 0
      ];
      
      const cumulativeData = [];
      let sum = 0;
      for (let i = 0; i <= yearsToProject; i++) {
        sum += yearlyData[i];
        cumulativeData.push(sum);
      }
      
      return {
        label: vendorNames[vendor] || vendor,
        data: cumulativeData.slice(0, yearsToProject + 1),
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.2)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 2,
        fill: false,
        tension: 0.1
      };
    });
    
    const config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 0 
                }).format(context.raw);
                return label;
              }
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
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
  
  // Add more chart initializers here...
  window.initRiskComparisonChart = function(vendors, data) {
    const canvasId = 'risk-comparison-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.8)',
      cisco: 'rgba(0, 114, 178, 0.8)',
      aruba: 'rgba(227, 119, 41, 0.8)',
      forescout: 'rgba(187, 85, 102, 0.8)',
      fortinac: 'rgba(128, 0, 0, 0.8)',
      'no-nac': 'rgba(150, 150, 150, 0.8)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    const riskCategories = ['Unauthorized Access', 'Malware Propagation', 'Data Breach', 'Compliance Violations', 'Insider Threats'];
    
    // Risk reduction is shown as percentage (higher is better)
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor]?.riskReduction || {
        unauthorizedAccess: 0,
        malwarePropagation: 0,
        dataBreach: 0,
        complianceViolations: 0,
        insiderThreats: 0
      };
      
      return {
        label: vendorNames[vendor] || vendor,
        data: [
          vendorData.unauthorizedAccess || 0,
          vendorData.malwarePropagation || 0,
          vendorData.dataBreach || 0,
          vendorData.complianceViolations || 0,
          vendorData.insiderThreats || 0
        ],
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.8)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 1
      };
    });
    
    const config = {
      type: 'radar',
      data: {
        labels: riskCategories,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw + '% risk reduction';
                return label;
              }
            }
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
  
  // Initialize vendor radar chart for comparison
  window.initVendorRadarChart = function(vendors, data) {
    const canvasId = 'vendor-radar-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.7)',
      cisco: 'rgba(0, 114, 178, 0.7)',
      aruba: 'rgba(227, 119, 41, 0.7)',
      forescout: 'rgba(187, 85, 102, 0.7)',
      fortinac: 'rgba(128, 0, 0, 0.7)',
      'no-nac': 'rgba(150, 150, 150, 0.7)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    const categories = [
      'Cloud Native', 
      'Deployment Speed', 
      'Zero Trust', 
      'Cost Efficiency', 
      'Remote Access', 
      'Scalability',
      'Ease of Management',
      'Integration'
    ];
    
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor]?.ratings || {
        cloudNative: 0,
        deploymentSpeed: 0,
        zeroTrust: 0,
        costEfficiency: 0,
        remoteAccess: 0,
        scalability: 0,
        easeOfManagement: 0,
        integration: 0
      };
      
      return {
        label: vendorNames[vendor] || vendor,
        data: [
          vendorData.cloudNative || 0,
          vendorData.deploymentSpeed || 0,
          vendorData.zeroTrust || 0,
          vendorData.costEfficiency || 0,
          vendorData.remoteAccess || 0,
          vendorData.scalability || 0,
          vendorData.easeOfManagement || 0,
          vendorData.integration || 0
        ],
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.7)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 2,
        pointBackgroundColor: borderColors[vendor] || 'rgb(128, 128, 128)'
      };
    });
    
    const config = {
      type: 'radar',
      data: {
        labels: categories,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw + '/100';
                return label;
              }
            }
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
  
  // Initialize Security Capability Radar chart for detailed security comparison
  window.initSecurityCapabilityRadarChart = function(vendors, data) {
    const canvasId = 'security-capability-radar-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.7)',
      cisco: 'rgba(0, 114, 178, 0.7)',
      aruba: 'rgba(227, 119, 41, 0.7)',
      forescout: 'rgba(187, 85, 102, 0.7)',
      fortinac: 'rgba(128, 0, 0, 0.7)',
      'no-nac': 'rgba(150, 150, 150, 0.7)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    const categories = [
      'Device Authentication', 
      'User Authentication', 
      'Continuous Monitoring', 
      'Automated Remediation', 
      'Threat Detection', 
      'Policy Enforcement',
      'Compliance Reporting',
      'Incident Response'
    ];
    
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor]?.securityCapabilities || {
        deviceAuthentication: 0,
        userAuthentication: 0,
        continuousMonitoring: 0,
        automatedRemediation: 0,
        threatDetection: 0,
        policyEnforcement: 0,
        complianceReporting: 0,
        incidentResponse: 0
      };
      
      return {
        label: vendorNames[vendor] || vendor,
        data: [
          vendorData.deviceAuthentication || 0,
          vendorData.userAuthentication || 0,
          vendorData.continuousMonitoring || 0,
          vendorData.automatedRemediation || 0,
          vendorData.threatDetection || 0,
          vendorData.policyEnforcement || 0,
          vendorData.complianceReporting || 0,
          vendorData.incidentResponse || 0
        ],
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.7)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 2,
        pointBackgroundColor: borderColors[vendor] || 'rgb(128, 128, 128)'
      };
    });
    
    const config = {
      type: 'radar',
      data: {
        labels: categories,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw + '/100';
                return label;
              }
            }
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
  
  // Initialize Technical Architecture comparison chart
  window.initArchitectureChart = function(vendors, data) {
    const canvasId = 'architecture-chart';
    window.destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
      console.error(`Canvas element ${canvasId} not found`);
      return;
    }
    
    const colors = {
      portnox: 'rgba(65, 184, 131, 0.8)',
      cisco: 'rgba(0, 114, 178, 0.8)',
      aruba: 'rgba(227, 119, 41, 0.8)',
      forescout: 'rgba(187, 85, 102, 0.8)',
      fortinac: 'rgba(128, 0, 0, 0.8)',
      'no-nac': 'rgba(150, 150, 150, 0.8)'
    };
    
    const borderColors = {
      portnox: 'rgb(65, 184, 131)',
      cisco: 'rgb(0, 114, 178)',
      aruba: 'rgb(227, 119, 41)',
      forescout: 'rgb(187, 85, 102)',
      fortinac: 'rgb(128, 0, 0)',
      'no-nac': 'rgb(150, 150, 150)'
    };
    
    const vendorNames = {
      portnox: 'Portnox Cloud',
      cisco: 'Cisco ISE',
      aruba: 'Aruba ClearPass',
      forescout: 'Forescout',
      fortinac: 'FortiNAC',
      'no-nac': 'No NAC Solution'
    };
    
    const architectureCategories = [
      'Cloud-Native', 
      'On-Premises', 
      'Hybrid', 
      'SaaS Model',
      'Microservices',
      'Monolithic',
      'Multi-Tenant',
      'Single-Tenant'
    ];
    
    const datasets = vendors.map(vendor => {
      const vendorData = data[vendor]?.architecture || {
        cloudNative: false,
        onPremises: false,
        hybrid: false,
        saasModel: false,
        microservices: false,
        monolithic: false,
        multiTenant: false,
        singleTenant: false
      };
      
      return {
        label: vendorNames[vendor] || vendor,
        data: [
          vendorData.cloudNative ? 100 : 0,
          vendorData.onPremises ? 100 : 0,
          vendorData.hybrid ? 100 : 0,
          vendorData.saasModel ? 100 : 0,
          vendorData.microservices ? 100 : 0,
          vendorData.monolithic ? 100 : 0,
          vendorData.multiTenant ? 100 : 0,
          vendorData.singleTenant ? 100 : 0
        ],
        backgroundColor: colors[vendor] || 'rgba(128, 128, 128, 0.8)',
        borderColor: borderColors[vendor] || 'rgb(128, 128, 128)',
        borderWidth: 1
      };
    });
    
    const config = {
      type: 'bar',
      data: {
        labels: architectureCategories,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                return context.raw > 0 ? `${label}: Yes` : `${label}: No`;
              }
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
            display: false,
            beginAtZero: true,
            max: 100
          }
        }
      }
    };
    
    const chart = window.initializeChart(canvasId, config);
    return chart;
  };
})();
