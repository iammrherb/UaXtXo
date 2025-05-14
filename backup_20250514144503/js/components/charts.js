/**
 * Charts Component for Total Cost Analyzer
 * Provides visualizations for TCO comparison and analysis
 */

const ChartsManager = (function() {
  // Store chart instances
  const charts = {};
  
  // Initialize charts
  function initCharts() {
    console.log('Initializing Charts Manager...');
    
    // Initialize results visualization charts
    initResultsCharts();
    
    console.log('Charts Manager initialized');
  }
  
  // Initialize charts for results visualization
  function initResultsCharts() {
    // Only initialize if Chart.js is available
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not available');
      return;
    }
    
    // Register event listeners for results tabs
    const resultTabs = document.querySelectorAll('.result-tab');
    if (resultTabs.length > 0) {
      resultTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const tabName = this.dataset.tab;
          // Initialize charts for the active tab
          initChartsForTab(tabName);
        });
      });
      
      // Initialize charts for the active tab
      const activeTab = document.querySelector('.result-tab.active');
      if (activeTab) {
        initChartsForTab(activeTab.dataset.tab);
      }
    }
  }
  
  // Initialize charts for a specific tab
  function initChartsForTab(tabName) {
    switch (tabName) {
      case 'overview':
        // No charts in overview tab
        break;
        
      case 'comparison':
        createTcoComparisonChart();
        createCostBreakdownCharts();
        createCumulativeCostChart();
        break;
        
      case 'implementation':
        createImplementationComparisonChart();
        break;
        
      case 'features':
        createFeatureComparisonChart();
        break;
        
      case 'industry':
        createIndustryComplianceChart();
        break;
        
      case 'roi':
        createRoiChart();
        break;
        
      case 'risk':
        createRiskAnalysisChart();
        break;
        
      case 'sensitivity':
        // Already handled by SensitivityAnalyzer
        break;
    }
  }
  
  // Create TCO comparison chart
  function createTcoComparisonChart() {
    const canvas = document.getElementById('tco-comparison-chart');
    if (!canvas || charts.tcoComparison) return;
    
    // Get TCO data
    const tcoData = getTcoComparisonData();
    
    // Create chart
    charts.tcoComparison = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: tcoData.labels,
        datasets: [
          {
            label: 'Hardware Costs',
            data: tcoData.hardware,
            backgroundColor: '#4caf50'
          },
          {
            label: 'Software Licenses',
            data: tcoData.software,
            backgroundColor: '#2196f3'
          },
          {
            label: 'Implementation',
            data: tcoData.implementation,
            backgroundColor: '#ff9800'
          },
          {
            label: 'Maintenance & Support',
            data: tcoData.maintenance,
            backgroundColor: '#9c27b0'
          },
          {
            label: 'Personnel',
            data: tcoData.personnel,
            backgroundColor: '#f44336'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Total Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return ' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: '3-Year Total Cost of Ownership Comparison'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += ' + context.parsed.y.toLocaleString();
                }
                return label;
              },
              footer: function(tooltipItems) {
                let total = 0;
                tooltipItems.forEach(function(tooltipItem) {
                  total += tooltipItem.parsed.y;
                });
                return 'Total:  + total.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Create cost breakdown charts
  function createCostBreakdownCharts() {
    // Current solution breakdown
    const currentCanvas = document.getElementById('current-breakdown-chart');
    if (currentCanvas && !charts.currentBreakdown) {
      const breakdownData = getCurrentBreakdownData();
      
      charts.currentBreakdown = new Chart(currentCanvas, {
        type: 'pie',
        data: {
          labels: breakdownData.labels,
          datasets: [{
            data: breakdownData.values,
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Current Solution Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
                  return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Portnox Cloud breakdown
    const portnoxCanvas = document.getElementById('alternative-breakdown-chart');
    if (portnoxCanvas && !charts.portnoxBreakdown) {
      const breakdownData = getPortnoxBreakdownData();
      
      charts.portnoxBreakdown = new Chart(portnoxCanvas, {
        type: 'pie',
        data: {
          labels: breakdownData.labels,
          datasets: [{
            data: breakdownData.values,
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = Math.round((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100);
                  return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Create cumulative cost chart
  function createCumulativeCostChart() {
    const canvas = document.getElementById('cumulative-cost-chart');
    if (!canvas || charts.cumulativeCost) return;
    
    // Get cumulative cost data
    const cumulativeData = getCumulativeCostData();
    
    // Create chart
    charts.cumulativeCost = new Chart(canvas, {
      type: 'line',
      data: {
        labels: cumulativeData.labels,
        datasets: [
          {
            label: 'Current Solution',
            data: cumulativeData.current,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Portnox Cloud',
            data: cumulativeData.portnox,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
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
            title: {
              display: true,
              text: 'Cumulative Cost (USD)'
            },
            ticks: {
              callback: function(value) {
                return ' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over 3 Years'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += ' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
  
  // Create implementation comparison chart
  function createImplementationComparisonChart() {
    const canvas = document.getElementById('implementation-comparison-chart');
    if (!canvas || charts.implementationComparison) return;
    
    // Get implementation data
    const implementationData = getImplementationData();
    
    // Create chart
    charts.implementationComparison = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: implementationData.phases,
        datasets: [
          {
            label: 'Current Solution',
            data: implementationData.current,
            backgroundColor: '#f44336'
          },
          {
            label: 'Portnox Cloud',
            data: implementationData.portnox,
            backgroundColor: '#2196f3'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days to Complete'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Implementation Timeline Comparison'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.x !== null) {
                  label += context.parsed.x + ' days';
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    // Create implementation roadmap
    createImplementationRoadmap();
  }
  
  // Create implementation roadmap
  function createImplementationRoadmap() {
    const container = document.getElementById('implementation-roadmap');
    if (!container) return;
    
    // Implementation phases
    const phases = [
      {
        name: 'Planning & Design',
        current: {
          days: 15,
          tasks: [
            'Requirements gathering',
            'Architecture design',
            'Network assessment',
            'Hardware procurement'
          ]
        },
        portnox: {
          days: 3,
          tasks: [
            'Requirements gathering',
            'Tenant configuration',
            'Network integration planning'
          ]
        }
      },
      {
        name: 'Installation & Configuration',
        current: {
          days: 20,
          tasks: [
            'Server setup',
            'Database configuration',
            'Software installation',
            'Initial policy setup'
          ]
        },
        portnox: {
          days: 2,
          tasks: [
            'Cloud tenant setup',
            'RADIUS configuration',
            'Initial policy setup'
          ]
        }
      },
      {
        name: 'Testing & Validation',
        current: {
          days: 10,
          tasks: [
            'Functionality testing',
            'Performance testing',
            'Security validation',
            'User acceptance testing'
          ]
        },
        portnox: {
          days: 5,
          tasks: [
            'Functionality testing',
            'Integration validation',
            'User acceptance testing'
          ]
        }
      },
      {
        name: 'Deployment & Go-Live',
        current: {
          days: 15,
          tasks: [
            'Phased rollout',
            'User training',
            'Documentation',
            'Handover to operations'
          ]
        },
        portnox: {
          days: 5,
          tasks: [
            'Phased rollout',
            'User training',
            'Documentation'
          ]
        }
      }
    ];
    
    // Create roadmap HTML
    let roadmapHtml = '<div class="implementation-phases">';
    
    phases.forEach(phase => {
      roadmapHtml += `
        <div class="phase-card">
          <h4 class="phase-title">${phase.name}</h4>
          <div class="phase-comparison">
            <div class="current-solution">
              <h5>Current Solution: <span class="days">${phase.current.days} days</span></h5>
              <ul class="task-list">
                ${phase.current.tasks.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
            <div class="portnox-solution">
              <h5>Portnox Cloud: <span class="days">${phase.portnox.days} days</span></h5>
              <ul class="task-list">
                ${phase.portnox.tasks.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });
    
    roadmapHtml += '</div>';
    
    // Add total implementation time
    const currentTotal = phases.reduce((total, phase) => total + phase.current.days, 0);
    const portnoxTotal = phases.reduce((total, phase) => total + phase.portnox.days, 0);
    const timeSavings = Math.round(((currentTotal - portnoxTotal) / currentTotal) * 100);
    
    roadmapHtml += `
      <div class="implementation-summary">
        <div class="summary-box">
          <div class="summary-item">
            <span class="label">Current Solution Total Implementation Time:</span>
            <span class="value">${currentTotal} days</span>
          </div>
          <div class="summary-item">
            <span class="label">Portnox Cloud Total Implementation Time:</span>
            <span class="value">${portnoxTotal} days</span>
          </div>
          <div class="summary-item highlight">
            <span class="label">Implementation Time Savings:</span>
            <span class="value">${timeSavings}%</span>
          </div>
        </div>
      </div>
    `;
    
    // Add to container
    container.innerHTML = roadmapHtml;
  }
  
  // Create feature comparison chart
  function createFeatureComparisonChart() {
    const canvas = document.getElementById('feature-comparison-chart');
    if (!canvas || charts.featureComparison) return;
    
    // Get feature comparison data
    const featureData = getFeatureComparisonData();
    
    // Create chart
    charts.featureComparison = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: featureData.features,
        datasets: [
          {
            label: 'Current Solution',
            data: featureData.current,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            pointBackgroundColor: '#f44336'
          },
          {
            label: 'Portnox Cloud',
            data: featureData.portnox,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            pointBackgroundColor: '#2196f3'
          }
        ]
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
            suggestedMax: 5,
            ticks: {
              stepSize: 1
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
    
    // Create feature matrix table
    createFeatureMatrix();
  }
  
  // Create feature matrix table
  function createFeatureMatrix() {
    const table = document.getElementById('features-matrix-table');
    if (!table) return;
    
    // Feature categories and items
    const featureCategories = [
      {
        name: 'Access Control',
        features: [
          { name: 'RADIUS Support', portnox: 'Full', current: 'Full' },
          { name: 'Certificate-based Authentication', portnox: 'Full', current: 'Partial' },
          { name: 'Multi-factor Authentication', portnox: 'Full', current: 'Partial' },
          { name: 'Role-based Access Control', portnox: 'Full', current: 'Full' },
          { name: 'Zero Trust Implementation', portnox: 'Full', current: 'Limited' }
        ]
      },
      {
        name: 'Device Management',
        features: [
          { name: 'BYOD Support', portnox: 'Full', current: 'Partial' },
          { name: 'IoT Device Onboarding', portnox: 'Full', current: 'Limited' },
          { name: 'Device Fingerprinting', portnox: 'Full', current: 'Partial' },
          { name: 'Automated Remediation', portnox: 'Full', current: 'Limited' },
          { name: 'Agentless Operation', portnox: 'Full', current: 'Varies' }
        ]
      },
      {
        name: 'Security & Compliance',
        features: [
          { name: 'Posture Assessment', portnox: 'Full', current: 'Partial' },
          { name: 'Continuous Compliance Monitoring', portnox: 'Full', current: 'Limited' },
          { name: 'Risk-based Authentication', portnox: 'Full', current: 'Limited' },
          { name: 'Real-time Security Alerts', portnox: 'Full', current: 'Partial' },
          { name: 'Regulatory Compliance Reporting', portnox: 'Full', current: 'Partial' }
        ]
      },
      {
        name: 'Deployment & Management',
        features: [
          { name: 'Cloud-based Deployment', portnox: 'Native', current: 'No/Limited' },
          { name: 'Centralized Management', portnox: 'Full', current: 'Partial' },
          { name: 'Multi-site Support', portnox: 'Full', current: 'Partial' },
          { name: 'Self-service Portal', portnox: 'Full', current: 'Limited' },
          { name: 'API Integration', portnox: 'Full', current: 'Limited' }
        ]
      },
      {
        name: 'Performance & Scalability',
        features: [
          { name: 'Automatic Updates', portnox: 'Full', current: 'No/Limited' },
          { name: 'High Availability', portnox: 'Built-in', current: 'Complex' },
          { name: 'Horizontal Scaling', portnox: 'Seamless', current: 'Complex' },
          { name: 'Performance Analytics', portnox: 'Advanced', current: 'Basic' },
          { name: 'Global Accessibility', portnox: 'Built-in', current: 'Limited' }
        ]
      }
    ];
    
    // Create table HTML
    let tableHtml = `
      <thead>
        <tr>
          <th>Feature</th>
          <th>Portnox Cloud</th>
          <th>Current Solution</th>
        </tr>
      </thead>
      <tbody>
    `;
    
    featureCategories.forEach(category => {
      tableHtml += `
        <tr class="category-row">
          <td colspan="3">${category.name}</td>
        </tr>
      `;
      
      category.features.forEach(feature => {
        // Determine feature status classes
        let portnoxClass = 'full';
        let currentClass = '';
        
        if (feature.current === 'Full') {
          currentClass = 'full';
        } else if (feature.current === 'Partial') {
          currentClass = 'partial';
        } else if (feature.current === 'Limited') {
          currentClass = 'limited';
        } else {
          currentClass = 'none';
        }
        
        tableHtml += `
          <tr>
            <td>${feature.name}</td>
            <td class="${portnoxClass}">${feature.portnox}</td>
            <td class="${currentClass}">${feature.current}</td>
          </tr>
        `;
      });
    });
    
    tableHtml += '</tbody>';
    
    // Add to table
    table.innerHTML = tableHtml;
  }
  
  // Create industry compliance chart
  function createIndustryComplianceChart() {
    const canvas = document.getElementById('industry-compliance-chart');
    if (!canvas || charts.industryCompliance) return;
    
    // If IndustryCompliance module is available, use it
    if (typeof IndustryCompliance !== 'undefined' && 
        typeof IndustryCompliance.createComparianceChart === 'function') {
      
      // Get current industry
      const industrySelect = document.getElementById('industry-select');
      const industry = industrySelect ? industrySelect.value : 'financial';
      
      IndustryCompliance.createComparianceChart('industry-compliance-chart', industry);
      return;
    }
    
    // Otherwise, create a default chart
    const complianceData = getComplianceData();
    
    // Create chart
    charts.industryCompliance = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: complianceData.frameworks,
        datasets: [
          {
            label: 'Portnox Cloud',
            data: complianceData.portnox,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            pointBackgroundColor: '#2196f3'
          },
          {
            label: 'Current Solution',
            data: complianceData.current,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            pointBackgroundColor: '#f44336'
          }
        ]
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
          title: {
            display: true,
            text: 'Compliance Framework Coverage'
          }
        }
      }
    });
    
    // Load industry requirements
    loadIndustryRequirements();
  }
  
  // Load industry requirements
  function loadIndustryRequirements() {
    const container = document.getElementById('industry-requirements-container');
    if (!container) return;
    
    // Get current industry
    const industrySelect = document.getElementById('industry-select');
    const industry = industrySelect ? industrySelect.value : 'financial';
    
    // Industry requirements mapping
    const industryRequirements = {
      'healthcare': {
        title: 'Healthcare Industry Requirements',
        description: 'Healthcare organizations must secure patient data and medical devices while maintaining compliance with strict regulations.',
        requirements: [
          'Protect Electronic Protected Health Information (ePHI)',
          'Secure medical devices and IoT',
          'Maintain audit trails for compliance reporting',
          'Enforce access control policies for clinical systems',
          'Automatic validation of security posture'
        ],
        frameworks: ['HIPAA', 'HITRUST', 'NIST CSF', 'ISO 27001']
      },
      'financial': {
        title: 'Financial Services Requirements',
        description: 'Financial institutions require robust security to protect sensitive financial data and customer information.',
        requirements: [
          'Enforce strong authentication for financial systems',
          'Segment networks to protect cardholder data environments',
          'Continuous compliance monitoring and reporting',
          'Strict access control for customer financial data',
          'Real-time security alerts and incident response'
        ],
        frameworks: ['PCI DSS', 'GLBA', 'SOX', 'NIST CSF', 'ISO 27001']
      },
      'education': {
        title: 'Education Sector Requirements',
        description: 'Educational institutions must balance open access with protection of student data and research information.',
        requirements: [
          'Protect student data and educational records',
          'Secure diverse BYOD environments',
          'Manage complex network environments',
          'Support research and academic freedom',
          'Cost-effective security solutions'
        ],
        frameworks: ['FERPA', 'COPPA', 'NIST CSF', 'ISO 27001']
      },
      'government': {
        title: 'Government Agency Requirements',
        description: 'Government agencies need to protect sensitive information while ensuring compliance with strict federal standards.',
        requirements: [
          'Comply with federal security standards',
          'Protect classified and sensitive information',
          'Secure critical infrastructure',
          'Comprehensive audit logging and reporting',
          'Strong authentication and access control'
        ],
        frameworks: ['FISMA', 'NIST 800-53', 'NIST 800-171', 'CMMC', 'FedRAMP']
      },
      'retail': {
        title: 'Retail Industry Requirements',
        description: 'Retail organizations must protect payment information and customer data across diverse environments.',
        requirements: [
          'Secure payment processing environments',
          'Protect customer personal data',
          'Manage diverse endpoint devices',
          'Support temporary staff access',
          'Secure IoT and POS systems'
        ],
        frameworks: ['PCI DSS', 'CCPA', 'GDPR', 'NIST CSF']
      },
      'manufacturing': {
        title: 'Manufacturing Industry Requirements',
        description: 'Manufacturing companies need to secure operational technology and protect intellectual property.',
        requirements: [
          'Secure operational technology (OT) environments',
          'Protect intellectual property',
          'Manage contractor access',
          'Secure IoT and industrial control systems',
          'Support legacy systems and devices'
        ],
        frameworks: ['NIST CSF', 'IEC 62443', 'ISO 27001', 'CMMC']
      },
      'energy': {
        title: 'Energy Sector Requirements',
        description: 'Energy companies must protect critical infrastructure while complying with stringent industry regulations.',
        requirements: [
          'Protect critical infrastructure',
          'Secure operational technology networks',
          'Comply with energy sector regulations',
          'Manage remote access to critical systems',
          'Prevent unauthorized access to control systems'
        ],
        frameworks: ['NERC CIP', 'NIST CSF', 'IEC 62443', 'ISO 27001']
      },
      'technology': {
        title: 'Technology Sector Requirements',
        description: 'Technology companies need to secure intellectual property and ensure data protection for clients.',
        requirements: [
          'Protect intellectual property and source code',
          'Secure development environments',
          'Manage access for global workforce',
          'Support rapid innovation with security',
          'Demonstrate strong security posture to clients'
        ],
        frameworks: ['ISO 27001', 'SOC 2', 'NIST CSF', 'GDPR', 'CCPA']
      }
    };
    
    // Get requirements for selected industry
    const requirements = industryRequirements[industry] || industryRequirements.financial;
    
    // Create HTML
    const html = `
      <div class="industry-requirements-card">
        <h4>${requirements.title}</h4>
        <p class="industry-description">${requirements.description}</p>
        
        <div class="requirements-section">
          <h5>Key Requirements</h5>
          <ul class="requirements-list">
            ${requirements.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        
        <div class="frameworks-section">
          <h5>Applicable Compliance Frameworks</h5>
          <div class="frameworks-list">
            ${requirements.frameworks.map(fw => `<span class="framework-badge">${fw}</span>`).join('')}
          </div>
        </div>
        
        <div class="portnox-advantage">
          <h5>Portnox Advantage</h5>
          <p>Portnox Cloud provides comprehensive coverage for all ${industry} industry requirements with a simplified cloud-based approach that reduces implementation time and management overhead.</p>
        </div>
      </div>
    `;
    
    // Add to container
    container.innerHTML = html;
  }
  
  // Create ROI chart
  function createRoiChart() {
    const canvas = document.getElementById('roi-chart');
    if (!canvas || charts.roi) return;
    
    // Get ROI data
    const roiData = getRoiData();
    
    // Create chart
    charts.roi = new Chart(canvas, {
      type: 'line',
      data: {
        labels: roiData.months,
        datasets: [
          {
            label: 'Current Solution',
            data: roiData.current,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'Portnox Cloud',
            data: roiData.portnox,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            fill: true,
            tension: 0.1
          },
          {
            label: 'Savings',
            data: roiData.savings,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.1,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Cost/Savings (USD)'
            },
            ticks: {
              callback: function(value) {
                return ' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'ROI Analysis Over 36 Months'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += ' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          },
          annotation: {
            annotations: {
              breakeven: {
                type: 'line',
                xMin: roiData.breakeven,
                xMax: roiData.breakeven,
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                  content: 'Break-even Point',
                  enabled: true,
                  position: 'top'
                }
              }
            }
          }
        }
      }
    });
    
    // Create ROI breakdown
    createRoiBreakdown(roiData);
  }
  
  // Create ROI breakdown
  function createRoiBreakdown(roiData) {
    const container = document.getElementById('roi-breakdown');
    if (!container) return;
    
    // Create HTML
    const html = `
      <div class="roi-breakdown-card">
        <div class="roi-metrics">
          <div class="roi-metric">
            <h4>Break-even Point</h4>
            <div class="metric-value">${roiData.breakeven} months</div>
            <div class="metric-description">Time to positive ROI</div>
          </div>
          
          <div class="roi-metric">
            <h4>3-Year Cost Savings</h4>
            <div class="metric-value">${roiData.totalSavings.toLocaleString()}</div>
            <div class="metric-description">${roiData.savingsPercentage}% total cost reduction</div>
          </div>
          
          <div class="roi-metric">
            <h4>Return on Investment</h4>
            <div class="metric-value">${roiData.roi}%</div>
            <div class="metric-description">3-year ROI percentage</div>
          </div>
          
          <div class="roi-metric">
            <h4>Payback Period</h4>
            <div class="metric-value">${roiData.payback} months</div>
            <div class="metric-description">Time to recoup investment</div>
          </div>
        </div>
        
        <div class="savings-breakdown">
          <h4>Savings Breakdown</h4>
          
          <div class="savings-category">
            <div class="category-name">Hardware Elimination</div>
            <div class="savings-bar">
              <div class="savings-fill" style="width: 30%"></div>
              <div class="savings-amount">${Math.round(roiData.totalSavings * 0.3).toLocaleString()}</div>
            </div>
          </div>
          
          <div class="savings-category">
            <div class="category-name">Operational Efficiency</div>
            <div class="savings-bar">
              <div class="savings-fill" style="width: 25%"></div>
              <div class="savings-amount">${Math.round(roiData.totalSavings * 0.25).toLocaleString()}</div>
            </div>
          </div>
          
          <div class="savings-category">
            <div class="category-name">IT Staff Time</div>
            <div class="savings-bar">
              <div class="savings-fill" style="width: 20%"></div>
              <div class="savings-amount">${Math.round(roiData.totalSavings * 0.2).toLocaleString()}</div>
            </div>
          </div>
          
          <div class="savings-category">
            <div class="category-name">Faster Implementation</div>
            <div class="savings-bar">
              <div class="savings-fill" style="width: 15%"></div>
              <div class="savings-amount">${Math.round(roiData.totalSavings * 0.15).toLocaleString()}</div>
            </div>
          </div>
          
          <div class="savings-category">
            <div class="category-name">Reduced Downtime</div>
            <div class="savings-bar">
              <div class="savings-fill" style="width: 10%"></div>
              <div class="savings-amount">${Math.round(roiData.totalSavings * 0.1).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to container
    container.innerHTML = html;
  }
  
  // Create risk analysis chart
  function createRiskAnalysisChart() {
    const canvas = document.getElementById('risk-analysis-chart');
    if (!canvas || charts.riskAnalysis) return;
    
    // If RiskAnalyzer module is available, use it
    if (typeof RiskAnalyzer !== 'undefined' && 
        typeof RiskAnalyzer.init === 'function') {
      
      RiskAnalyzer.init();
      return;
    }
    
    // Create fallback risk chart
    const riskData = getRiskAnalysisData();
    
    // Create chart
    charts.riskAnalysis = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: riskData.categories,
        datasets: [
          {
            label: 'Without NAC',
            data: riskData.withoutNac,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            pointBackgroundColor: '#f44336'
          },
          {
            label: 'With Portnox Cloud',
            data: riskData.withPortnox,
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            pointBackgroundColor: '#2196f3'
          }
        ]
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
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                switch (value) {
                  case 1: return 'Very Low';
                  case 2: return 'Low';
                  case 3: return 'Medium';
                  case 4: return 'High';
                  case 5: return 'Critical';
                  default: return '';
                }
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Security Risk Assessment'
          }
        }
      }
    });
    
    // Create risk matrix and mitigation strategies
    createRiskMatrixAndMitigation();
  }
  
  // Create risk matrix and mitigation strategies
  function createRiskMatrixAndMitigation() {
    // Create risk matrix if RiskAnalyzer is not available
    const matrixContainer = document.getElementById('risk-matrix');
    if (matrixContainer && typeof RiskAnalyzer === 'undefined') {
      createRiskMatrixTable(matrixContainer);
    }
    
    // Create risk mitigation strategies if RiskAnalyzer is not available
    const strategiesContainer = document.getElementById('risk-mitigation-strategies');
    if (strategiesContainer && typeof RiskAnalyzer === 'undefined') {
      createRiskMitigationStrategies(strategiesContainer);
    }
  }
  
  // Create risk matrix table
  function createRiskMatrixTable(container) {
    // Risk categories
    const risks = [
      {
        name: 'Unauthorized Network Access',
        withoutNac: 'Critical',
        withPortnox: 'Low',
        reduction: '87%'
      },
      {
        name: 'BYOD Security Risks',
        withoutNac: 'High',
        withPortnox: 'Low',
        reduction: '75%'
      },
      {
        name: 'IoT Device Vulnerabilities',
        withoutNac: 'High',
        withPortnox: 'Medium',
        reduction: '65%'
      },
      {
        name: 'Compliance Violations',
        withoutNac: 'High',
        withPortnox: 'Minimal',
        reduction: '85%'
      },
      {
        name: 'Lateral Movement After Breach',
        withoutNac: 'Critical',
        withPortnox: 'Medium',
        reduction: '80%'
      }
    ];
    
    // Create table HTML
    let html = `
      <table class="risk-matrix-table">
        <thead>
          <tr>
            <th>Risk Category</th>
            <th>Without NAC</th>
            <th>With Portnox Cloud</th>
            <th>Risk Reduction</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    risks.forEach(risk => {
      let withoutNacClass = '';
      let withPortnoxClass = '';
      
      // Determine risk level classes
      switch (risk.withoutNac) {
        case 'Critical': withoutNacClass = 'critical'; break;
        case 'High': withoutNacClass = 'high'; break;
        case 'Medium': withoutNacClass = 'medium'; break;
        case 'Low': withoutNacClass = 'low'; break;
        case 'Minimal': withoutNacClass = 'minimal'; break;
      }
      
      switch (risk.withPortnox) {
        case 'Critical': withPortnoxClass = 'critical'; break;
        case 'High': withPortnoxClass = 'high'; break;
        case 'Medium': withPortnoxClass = 'medium'; break;
        case 'Low': withPortnoxClass = 'low'; break;
        case 'Minimal': withPortnoxClass = 'minimal'; break;
      }
      
      html += `
        <tr>
          <td>${risk.name}</td>
          <td><span class="risk-badge ${withoutNacClass}">${risk.withoutNac}</span></td>
          <td><span class="risk-badge ${withPortnoxClass}">${risk.withPortnox}</span></td>
          <td>${risk.reduction}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
      
      <div class="risk-reduction-summary">
        <div class="summary-box">
          <h4>Overall Security Risk Reduction</h4>
          <div class="reduction-percentage">78%</div>
          <p>Implementing Portnox Cloud reduces your overall security risk by an average of 78% compared to no NAC solution.</p>
        </div>
      </div>
    `;
    
    // Add to container
    container.innerHTML = html;
  }
  
  // Create risk mitigation strategies
  function createRiskMitigationStrategies(container) {
    // Risk mitigation strategies
    const strategies = [
      {
        title: 'Zero Trust Architecture',
        description: 'Implement a zero-trust security model where no device is trusted by default, regardless of location or network connection.',
        icon: 'shield-alt'
      },
      {
        title: 'Continuous Device Monitoring',
        description: 'Monitor devices in real-time for security posture changes and compliance violations with automated response.',
        icon: 'search'
      },
      {
        title: 'Network Microsegmentation',
        description: 'Divide the network into secure zones to prevent lateral movement and contain potential breaches.',
        icon: 'project-diagram'
      },
      {
        title: 'Automated Compliance Enforcement',
        description: 'Automatically validate and enforce compliance with regulatory requirements for all connecting devices.',
        icon: 'clipboard-check'
      },
      {
        title: 'Risk-Based Authentication',
        description: 'Adjust authentication requirements based on user behavior, device posture, and environmental factors.',
        icon: 'key'
      }
    ];
    
    // Create HTML
    let html = '<div class="strategies-grid">';
    
    strategies.forEach(strategy => {
      html += `
        <div class="strategy-card">
          <div class="strategy-icon">
            <i class="fas fa-${strategy.icon}"></i>
          </div>
          <div class="strategy-content">
            <h4>${strategy.title}</h4>
            <p>${strategy.description}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    
    // Add to container
    container.innerHTML = html;
  }
  
  // Get TCO comparison data
  function getTcoComparisonData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      labels: ['Current Solution', 'Portnox Cloud'],
      hardware: [200000, 0],
      software: [150000, 120000],
      implementation: [120000, 30000],
      maintenance: [100000, 45000],
      personnel: [150000, 75000]
    };
  }
  
  // Get current solution cost breakdown data
  function getCurrentBreakdownData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      labels: ['Hardware Costs', 'Software Licenses', 'Implementation', 'Maintenance & Support', 'Personnel'],
      values: [200000, 150000, 120000, 100000, 150000]
    };
  }
  
  // Get Portnox Cloud cost breakdown data
  function getPortnoxBreakdownData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      labels: ['Hardware Costs', 'Software Licenses', 'Implementation', 'Maintenance & Support', 'Personnel'],
      values: [0, 120000, 30000, 45000, 75000]
    };
  }
  
  // Get cumulative cost data
  function getCumulativeCostData() {
    // Sample data - would be calculated from user inputs in real application
    const labels = [];
    const current = [];
    const portnox = [];
    
    // Generate monthly data for 3 years
    for (let month = 0; month <= 36; month++) {
      labels.push(`Month ${month}`);
      
      // Current solution costs
      if (month === 0) {
        current.push(300000); // Initial investment
      } else {
        const previousCost = current[month - 1];
        const monthlyCost = 13889; // (500k / 36 months)
        current.push(previousCost + monthlyCost);
      }
      
      // Portnox costs
      if (month === 0) {
        portnox.push(50000); // Initial investment
      } else {
        const previousCost = portnox[month - 1];
        const monthlyCost = 6111; // (220k / 36 months)
        portnox.push(previousCost + monthlyCost);
      }
    }
    
    return {
      labels,
      current,
      portnox
    };
  }
  
  // Get implementation data
  function getImplementationData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      phases: ['Planning & Design', 'Installation & Configuration', 'Testing & Validation', 'Deployment & Go-Live'],
      current: [15, 20, 10, 15],
      portnox: [3, 2, 5, 5]
    };
  }
  
  // Get feature comparison data
  function getFeatureComparisonData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      features: ['Access Control', 'Device Management', 'Cloud Architecture', 'Security & Compliance', 'Scalability', 'Ease of Management', 'Deployment Speed', 'Cost Efficiency'],
      current: [4, 3, 2, 3, 2, 2, 2, 2],
      portnox: [5, 5, 5, 5, 5, 5, 5, 5]
    };
  }
  
  // Get compliance data
  function getComplianceData() {
    // Get current industry
    const industrySelect = document.getElementById('industry-select');
    const industry = industrySelect ? industrySelect.value : 'financial';
    
    // Industry-specific frameworks
    const industryFrameworks = {
      'healthcare': ['HIPAA', 'HITRUST', 'NIST CSF', 'ISO 27001', 'GDPR'],
      'financial': ['PCI DSS', 'GLBA', 'SOX', 'ISO 27001', 'NIST CSF'],
      'education': ['FERPA', 'COPPA', 'NIST CSF', 'ISO 27001', 'GDPR'],
      'government': ['FISMA', 'NIST 800-53', 'NIST 800-171', 'CMMC', 'FedRAMP'],
      'retail': ['PCI DSS', 'CCPA', 'GDPR', 'NIST CSF', 'ISO 27001'],
      'manufacturing': ['NIST CSF', 'IEC 62443', 'ISO 27001', 'CMMC', 'GDPR'],
      'energy': ['NERC CIP', 'NIST CSF', 'IEC 62443', 'ISO 27001', 'GDPR'],
      'technology': ['ISO 27001', 'SOC 2', 'NIST CSF', 'GDPR', 'CCPA']
    };
    
    // Default frameworks
    const frameworks = industryFrameworks[industry] || industryFrameworks.financial;
    
    // Coverage percentages
    const portnoxCoverage = [100, 100, 100, 100, 100];
    const currentCoverage = [85, 70, 75, 80, 65];
    
    return {
      frameworks,
      portnox: portnoxCoverage,
      current: currentCoverage
    };
  }
  
  // Get ROI data
  function getRoiData() {
    // Sample data - would be calculated from user inputs in real application
    const months = [];
    const current = [];
    const portnox = [];
    const savings = [];
    
    // Generate monthly data for 3 years
    for (let month = 0; month <= 36; month++) {
      months.push(`Month ${month}`);
      
      // Current solution costs
      if (month === 0) {
        current.push(300000); // Initial investment
      } else {
        const previousCost = current[month - 1];
        const monthlyCost = 13889; // (500k / 36 months)
        current.push(previousCost + monthlyCost);
      }
      
      // Portnox costs
      if (month === 0) {
        portnox.push(50000); // Initial investment
      } else {
        const previousCost = portnox[month - 1];
        const monthlyCost = 6111; // (220k / 36 months)
        portnox.push(previousCost + monthlyCost);
      }
      
      // Calculate savings
      savings.push(current[month] - portnox[month]);
    }
    
    // Calculate break-even point
    let breakeven = 36;
    for (let month = 0; month <= 36; month++) {
      if (savings[month] > 0) {
        breakeven = month;
        break;
      }
    }
    
    // Calculate total savings
    const totalSavings = current[36] - portnox[36];
    const savingsPercentage = Math.round((totalSavings / current[36]) * 100);
    
    // Calculate ROI
    const investment = portnox[0];
    const roi = Math.round(((totalSavings - investment) / investment) * 100);
    
    // Calculate payback period
    let payback = breakeven;
    if (payback === 0) {
      payback = 1; // Minimum 1 month
    }
    
    return {
      months,
      current,
      portnox,
      savings,
      breakeven,
      totalSavings,
      savingsPercentage,
      roi,
      payback
    };
  }
  
  // Get risk analysis data
  function getRiskAnalysisData() {
    // Sample data - would be calculated from user inputs in real application
    return {
      categories: [
        'Unauthorized Access',
        'BYOD Risks',
        'IoT Vulnerabilities',
        'Compliance Violations',
        'Lateral Movement',
        'Insider Threats',
        'Outdated Controls',
        'Lack of Visibility'
      ],
      withoutNac: [5, 4, 5, 4, 5, 4, 5, 5],
      withPortnox: [1, 2, 2, 1, 2, 2, 1, 1]
    };
  }
  
  // Return public API
  return {
    initCharts,
    charts
  };
})();

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (typeof ChartsManager !== 'undefined') {
    ChartsManager.initCharts();
  }
});
