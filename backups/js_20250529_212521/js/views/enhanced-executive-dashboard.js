/**
 * Enhanced Executive Dashboard for Portnox Total Cost Analyzer
 * Modern, polished, and fully interactive dashboard with real vendor data
 */

class EnhancedExecutiveDashboard {
  constructor() {
    this.initialized = false;
    this.selectedVendors = ['portnox', 'cisco', 'aruba'];
    this.chartInstances = {};
    this.currentView = 'overview';
    this.vendorData = window.COMPREHENSIVE_VENDOR_DATA || {};
    this.animationEnabled = true;
  }
  
  /**
   * Initialize the dashboard
   */
  init() {
    console.log('🚀 Initializing Enhanced Executive Dashboard...');
    
    if (this.initialized) return this;
    
    this.createDashboardStructure();
    this.setupEventListeners();
    this.initializeAllCharts();
    this.animateEntrance();
    
    this.initialized = true;
    console.log('✅ Enhanced Executive Dashboard initialized successfully');
    return this;
  }
  
  /**
   * Create dashboard structure
   */
  createDashboardStructure() {
    const container = document.querySelector('#executive-view .view-content');
    if (!container) return;
    
    container.innerHTML = `
      <!-- Modern Executive Dashboard Header -->
      <div class="executive-dashboard-header glass-panel">
        <div class="dashboard-branding">
          <div class="brand-logo-container">
            <img src="./img/vendors/portnox-logo.png" alt="Portnox" class="brand-logo animate-float">
            <div class="brand-divider"></div>
          </div>
          <div class="brand-content">
            <h1 class="dashboard-title">Executive Analytics Dashboard</h1>
            <p class="dashboard-subtitle">Zero Trust NAC Total Cost of Ownership & ROI Analysis</p>
          </div>
        </div>
        
        <div class="dashboard-actions">
          <button class="action-btn primary pulse-animation" id="generate-report">
            <i class="fas fa-file-chart"></i>
            <span>Generate Report</span>
          </button>
          <button class="action-btn secondary" id="schedule-demo">
            <i class="fas fa-calendar-check"></i>
            <span>Schedule Demo</span>
          </button>
          <button class="action-btn accent" id="refresh-data">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      
      <!-- Vendor Selection Bar -->
      <div class="vendor-selection-container glass-panel">
        <div class="selection-header">
          <h3><i class="fas fa-layer-group"></i> Compare NAC Solutions</h3>
          <span class="selection-hint">Select up to 4 vendors for comparison</span>
        </div>
        <div class="vendor-grid">
          ${Object.entries(this.vendorData).map(([id, vendor]) => `
            <div class="vendor-card ${this.selectedVendors.includes(id) ? 'selected' : ''}" 
                 data-vendor="${id}">
              <div class="vendor-card-content">
                <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo">
                <span class="vendor-name">${vendor.shortName}</span>
                ${id === 'portnox' ? '<span class="recommended-badge">Recommended</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Key Metrics Dashboard -->
      <div class="metrics-dashboard">
        <div class="metric-card glass-panel animate-slide-up" style="--animation-delay: 0.1s">
          <div class="metric-header">
            <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <i class="fas fa-coins"></i>
            </div>
            <span class="metric-label">3-Year TCO Savings</span>
          </div>
          <div class="metric-value">
            <span class="value" id="tco-savings">$0</span>
            <span class="trend positive">
              <i class="fas fa-arrow-down"></i>
              <span id="tco-percentage">0%</span>
            </span>
          </div>
          <div class="metric-comparison">vs. Industry Average</div>
        </div>
        
        <div class="metric-card glass-panel animate-slide-up" style="--animation-delay: 0.2s">
          <div class="metric-header">
            <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              <i class="fas fa-chart-line"></i>
            </div>
            <span class="metric-label">Return on Investment</span>
          </div>
          <div class="metric-value">
            <span class="value" id="roi-value">0%</span>
            <span class="trend positive">
              <i class="fas fa-clock"></i>
              <span id="payback-period">0 months</span>
            </span>
          </div>
          <div class="metric-comparison">Payback Period</div>
        </div>
        
        <div class="metric-card glass-panel animate-slide-up" style="--animation-delay: 0.3s">
          <div class="metric-header">
            <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
              <i class="fas fa-shield-alt"></i>
            </div>
            <span class="metric-label">Security Score</span>
          </div>
          <div class="metric-value">
            <span class="value" id="security-score">0</span>
            <span class="trend positive">
              <i class="fas fa-award"></i>
              <span>Enterprise</span>
            </span>
          </div>
          <div class="metric-comparison">Zero Trust Readiness</div>
        </div>
        
        <div class="metric-card glass-panel animate-slide-up" style="--animation-delay: 0.4s">
          <div class="metric-header">
            <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
              <i class="fas fa-rocket"></i>
            </div>
            <span class="metric-label">Time to Deploy</span>
          </div>
          <div class="metric-value">
            <span class="value" id="deployment-time">0 days</span>
            <span class="trend positive">
              <i class="fas fa-bolt"></i>
              <span id="deployment-comparison">0x faster</span>
            </span>
          </div>
          <div class="metric-comparison">vs. Traditional NAC</div>
        </div>
      </div>
      
      <!-- Tab Navigation -->
      <div class="dashboard-tabs glass-panel">
        <button class="tab-btn active" data-view="overview">
          <i class="fas fa-th-large"></i>
          <span>Overview</span>
        </button>
        <button class="tab-btn" data-view="financial">
          <i class="fas fa-dollar-sign"></i>
          <span>Financial Analysis</span>
        </button>
        <button class="tab-btn" data-view="security">
          <i class="fas fa-shield-alt"></i>
          <span>Security & Compliance</span>
        </button>
        <button class="tab-btn" data-view="technical">
          <i class="fas fa-microchip"></i>
          <span>Technical Comparison</span>
        </button>
        <button class="tab-btn" data-view="market">
          <i class="fas fa-chart-pie"></i>
          <span>Market Position</span>
        </button>
      </div>
      
      <!-- Content Area -->
      <div class="dashboard-content">
        <!-- Overview Tab -->
        <div class="tab-content active" data-content="overview">
          <div class="content-grid">
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-chart-bar"></i> Total Cost of Ownership Comparison</h3>
                <div class="chart-controls">
                  <button class="chart-control" data-chart="tco" data-type="bar">
                    <i class="fas fa-chart-bar"></i>
                  </button>
                  <button class="chart-control" data-chart="tco" data-type="line">
                    <i class="fas fa-chart-line"></i>
                  </button>
                </div>
              </div>
              <div id="tco-comparison-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-tachometer-alt"></i> Implementation Timeline</h3>
              </div>
              <div id="timeline-comparison-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel full-width">
              <div class="chart-header">
                <h3><i class="fas fa-chart-area"></i> ROI Projection (5 Years)</h3>
              </div>
              <div id="roi-projection-chart" class="chart-wrapper"></div>
            </div>
          </div>
        </div>
        
        <!-- Financial Analysis Tab -->
        <div class="tab-content" data-content="financial">
          <div class="content-grid">
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-coins"></i> Cost Breakdown by Category</h3>
              </div>
              <div id="cost-breakdown-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-chart-pie"></i> Cost Distribution</h3>
              </div>
              <div id="cost-distribution-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="financial-table-container glass-panel full-width">
              <h3><i class="fas fa-table"></i> Detailed Financial Comparison</h3>
              <div id="financial-comparison-table"></div>
            </div>
          </div>
        </div>
        
        <!-- Security & Compliance Tab -->
        <div class="tab-content" data-content="security">
          <div class="content-grid">
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-radar"></i> Security Capabilities Radar</h3>
              </div>
              <div id="security-radar-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-certificate"></i> Compliance Coverage</h3>
              </div>
              <div id="compliance-coverage-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="security-matrix-container glass-panel full-width">
              <h3><i class="fas fa-th"></i> Security Feature Matrix</h3>
              <div id="security-feature-matrix"></div>
            </div>
          </div>
        </div>
        
        <!-- Technical Comparison Tab -->
        <div class="tab-content" data-content="technical">
          <div class="content-grid">
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-server"></i> Architecture Comparison</h3>
              </div>
              <div id="architecture-comparison" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-plug"></i> Integration Capabilities</h3>
              </div>
              <div id="integration-heatmap" class="chart-wrapper"></div>
            </div>
            
            <div class="technical-specs-container glass-panel full-width">
              <h3><i class="fas fa-microchip"></i> Technical Specifications</h3>
              <div id="technical-specs-table"></div>
            </div>
          </div>
        </div>
        
        <!-- Market Position Tab -->
        <div class="tab-content" data-content="market">
          <div class="content-grid">
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-trophy"></i> Market Share Analysis</h3>
              </div>
              <div id="market-share-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="chart-container glass-panel">
              <div class="chart-header">
                <h3><i class="fas fa-chart-line"></i> Growth Trends</h3>
              </div>
              <div id="growth-trends-chart" class="chart-wrapper"></div>
            </div>
            
            <div class="analyst-ratings glass-panel full-width">
              <h3><i class="fas fa-star"></i> Analyst Ratings & Recognition</h3>
              <div id="analyst-ratings-grid"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Vendor selection
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', (e) => this.handleVendorSelection(e));
    });
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleTabSwitch(e));
    });
    
    // Action buttons
    document.getElementById('generate-report')?.addEventListener('click', () => this.generateReport());
    document.getElementById('schedule-demo')?.addEventListener('click', () => this.scheduleDemo());
    document.getElementById('refresh-data')?.addEventListener('click', () => this.refreshData());
    
    // Chart controls
    document.querySelectorAll('.chart-control').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleChartTypeChange(e));
    });
  }
  
  /**
   * Initialize all charts
   */
  initializeAllCharts() {
    this.updateMetrics();
    this.createTCOComparisonChart();
    this.createTimelineChart();
    this.createROIProjectionChart();
    this.createCostBreakdownChart();
    this.createSecurityRadarChart();
    this.createComplianceChart();
    this.createMarketShareChart();
    this.createTables();
  }
  
  /**
   * Update key metrics
   */
  updateMetrics() {
    const portnox = this.vendorData['portnox'];
    const competitors = this.selectedVendors
      .filter(id => id !== 'portnox')
      .map(id => this.vendorData[id]);
    
    if (!portnox || competitors.length === 0) return;
    
    // Calculate average competitor TCO
    const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.costs.tco3Year, 0) / competitors.length;
    const tcoSavings = avgCompetitorTCO - portnox.costs.tco3Year;
    const tcoPercentage = Math.round((tcoSavings / avgCompetitorTCO) * 100);
    
    // Update metric values with animation
    this.animateValue('tco-savings', 0, tcoSavings, 'currency');
    this.animateValue('tco-percentage', 0, tcoPercentage, 'percentage');
    this.animateValue('roi-value', 0, portnox.business.roi, 'percentage');
    document.getElementById('payback-period').textContent = `${portnox.business.paybackMonths} months`;
    this.animateValue('security-score', 0, portnox.security.zeroTrust, 'number');
    document.getElementById('deployment-time').textContent = `${portnox.deployment.timeToValue} day`;
    
    // Calculate deployment comparison
    const avgCompetitorDeployment = competitors.reduce((sum, v) => sum + v.deployment.timeToValue, 0) / competitors.length;
    const deploymentRatio = Math.round(avgCompetitorDeployment / portnox.deployment.timeToValue);
    document.getElementById('deployment-comparison').textContent = `${deploymentRatio}x faster`;
  }
  
  /**
   * Create TCO comparison chart
   */
  createTCOComparisonChart() {
    const container = document.getElementById('tco-comparison-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: vendors.map(v => v.costs.tco3Year)
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        animations: {
          enabled: this.animationEnabled,
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          distributed: true,
          columnWidth: '60%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: vendors.map(v => v.color),
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + (val / 1000).toFixed(0) + 'K';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: vendors.map(v => v.shortName),
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return '$' + (val / 1000).toFixed(0) + 'K';
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      legend: { show: false }
    };
    
    if (this.chartInstances.tcoChart) {
      this.chartInstances.tcoChart.updateOptions(options);
    } else {
      this.chartInstances.tcoChart = new ApexCharts(container, options);
      this.chartInstances.tcoChart.render();
    }
  }
  
  /**
   * Create timeline comparison chart
   */
  createTimelineChart() {
    const container = document.getElementById('timeline-comparison-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    
    const options = {
      series: [{
        name: 'Implementation Days',
        data: vendors.map(v => v.deployment.timeToValue)
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
          distributed: true,
          barHeight: '60%'
        }
      },
      colors: vendors.map(v => v.color),
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + ' days';
        }
      },
      xaxis: {
        categories: vendors.map(v => v.shortName)
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      legend: { show: false }
    };
    
    if (this.chartInstances.timelineChart) {
      this.chartInstances.timelineChart.updateOptions(options);
    } else {
      this.chartInstances.timelineChart = new ApexCharts(container, options);
      this.chartInstances.timelineChart.render();
    }
  }
  
  /**
   * Create ROI projection chart
   */
  createROIProjectionChart() {
    const container = document.getElementById('roi-projection-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    
    // Generate 5-year projection data
    const series = vendors.map(vendor => {
      const data = [];
      for (let year = 0; year <= 5; year++) {
        const cost = (vendor.costs.tco3Year / 3) * year;
        const savings = vendor.business.roi > 0 ? cost * (vendor.business.roi / 100) : 0;
        data.push(savings - cost);
      }
      return {
        name: vendor.shortName,
        data: data
      };
    });
    
    const options = {
      series: series,
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false }
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      colors: vendors.map(v => v.color),
      xaxis: {
        categories: ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return '$' + (val / 1000).toFixed(0) + 'K';
          }
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
    
    if (this.chartInstances.roiChart) {
      this.chartInstances.roiChart.updateOptions(options);
    } else {
      this.chartInstances.roiChart = new ApexCharts(container, options);
      this.chartInstances.roiChart.render();
    }
  }
  
  /**
   * Create cost breakdown chart
   */
  createCostBreakdownChart() {
    const container = document.getElementById('cost-breakdown-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    const categories = ['Hardware', 'Implementation', 'License/Subscription', 'Maintenance', 'Personnel', 'Training'];
    
    const series = categories.map(category => {
      return {
        name: category,
        data: vendors.map(vendor => {
          switch(category) {
            case 'Hardware': return vendor.costs.hardware;
            case 'Implementation': return vendor.costs.implementation;
            case 'License/Subscription': return vendor.costs.yearlySubscription * 3 || vendor.costs.licensePerDevice * 1000 * 3;
            case 'Maintenance': return vendor.costs.maintenance;
            case 'Personnel': return vendor.costs.personnel;
            case 'Training': return vendor.costs.training;
            default: return 0;
          }
        })
      };
    });
    
    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%'
        }
      },
      xaxis: {
        categories: vendors.map(v => v.shortName)
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return '$' + (val / 1000).toFixed(0) + 'K';
          }
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#DDA0DD']
    };
    
    if (this.chartInstances.costBreakdownChart) {
      this.chartInstances.costBreakdownChart.updateOptions(options);
    } else {
      this.chartInstances.costBreakdownChart = new ApexCharts(container, options);
      this.chartInstances.costBreakdownChart.render();
    }
  }
  
  /**
   * Create security radar chart
   */
  createSecurityRadarChart() {
    const container = document.getElementById('security-radar-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    const categories = ['Zero Trust', 'Device Auth', 'Risk Assessment', 'Threat Detection', 'Incident Response', 'Compliance'];
    
    const series = vendors.map(vendor => ({
      name: vendor.shortName,
      data: [
        vendor.security.zeroTrust,
        vendor.security.deviceAuth,
        vendor.security.riskAssessment,
        vendor.security.threatDetection,
        vendor.security.incidentResponse,
        vendor.security.complianceCoverage
      ]
    }));
    
    const options = {
      series: series,
      chart: {
        type: 'radar',
        height: 350,
        toolbar: { show: false }
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5
      },
      colors: vendors.map(v => v.color),
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      legend: {
        position: 'bottom'
      }
    };
    
    if (this.chartInstances.securityRadarChart) {
      this.chartInstances.securityRadarChart.updateOptions(options);
    } else {
      this.chartInstances.securityRadarChart = new ApexCharts(container, options);
      this.chartInstances.securityRadarChart.render();
    }
  }
  
  /**
   * Create compliance coverage chart
   */
  createComplianceChart() {
    const container = document.getElementById('compliance-coverage-chart');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    const frameworks = ['NIST', 'PCI DSS', 'HIPAA', 'GDPR', 'ISO 27001', 'SOX'];
    
    const series = vendors.map(vendor => ({
      name: vendor.shortName,
      data: [
        vendor.compliance.nist,
        vendor.compliance.pciDss,
        vendor.compliance.hipaa,
        vendor.compliance.gdpr,
        vendor.compliance.iso27001,
        vendor.compliance.sox
      ]
    }));
    
    const options = {
      series: series,
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'end'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + '%';
        },
        offsetX: -6
      },
      xaxis: {
        categories: frameworks,
        max: 100
      },
      colors: vendors.map(v => v.color),
      legend: {
        position: 'top'
      }
    };
    
    if (this.chartInstances.complianceChart) {
      this.chartInstances.complianceChart.updateOptions(options);
    } else {
      this.chartInstances.complianceChart = new ApexCharts(container, options);
      this.chartInstances.complianceChart.render();
    }
  }
  
  /**
   * Create market share chart
   */
  createMarketShareChart() {
    const container = document.getElementById('market-share-chart');
    if (!container) return;
    
    const vendors = Object.values(this.vendorData);
    
    const options = {
      series: vendors.map(v => v.business.marketShare),
      chart: {
        type: 'donut',
        height: 350
      },
      labels: vendors.map(v => v.shortName),
      colors: vendors.map(v => v.color),
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Market',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%';
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opts) {
          return opts.w.config.labels[opts.seriesIndex] + ': ' + val.toFixed(0) + '%';
        }
      },
      legend: {
        position: 'bottom'
      }
    };
    
    if (this.chartInstances.marketShareChart) {
      this.chartInstances.marketShareChart.updateOptions(options);
    } else {
      this.chartInstances.marketShareChart = new ApexCharts(container, options);
      this.chartInstances.marketShareChart.render();
    }
  }
  
  /**
   * Create comparison tables
   */
  createTables() {
    this.createFinancialTable();
    this.createSecurityMatrix();
    this.createTechnicalSpecsTable();
    this.createAnalystRatings();
  }
  
  /**
   * Create financial comparison table
   */
  createFinancialTable() {
    const container = document.getElementById('financial-comparison-table');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    
    container.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Cost Component</th>
            ${vendors.map(v => `<th>${v.shortName}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hardware</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.hardware)}</td>`).join('')}
          </tr>
          <tr>
            <td>Implementation</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.implementation)}</td>`).join('')}
          </tr>
          <tr>
            <td>Annual License/Subscription</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.yearlySubscription || v.costs.licensePerDevice * 1000)}</td>`).join('')}
          </tr>
          <tr>
            <td>Maintenance</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.maintenance)}</td>`).join('')}
          </tr>
          <tr>
            <td>Personnel</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.personnel)}</td>`).join('')}
          </tr>
          <tr>
            <td>Training</td>
            ${vendors.map(v => `<td>${this.formatCurrency(v.costs.training)}</td>`).join('')}
          </tr>
          <tr class="total-row">
            <td>3-Year TCO</td>
            ${vendors.map(v => `<td class="total-value">${this.formatCurrency(v.costs.tco3Year)}</td>`).join('')}
          </tr>
          <tr class="roi-row">
            <td>ROI</td>
            ${vendors.map(v => `<td class="${v.business.roi > 0 ? 'positive' : 'negative'}">${v.business.roi}%</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
  }
  
  /**
   * Create security feature matrix
   */
  createSecurityMatrix() {
    const container = document.getElementById('security-feature-matrix');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    const features = [
      { key: 'mfa', label: 'Multi-Factor Authentication' },
      { key: 'certificateSupport', label: 'Certificate Support' },
      { key: 'continuousMonitoring', label: 'Continuous Monitoring' },
      { key: 'automatedResponse', label: 'Automated Response' }
    ];
    
    container.innerHTML = `
      <table class="feature-matrix">
        <thead>
          <tr>
            <th>Security Feature</th>
            ${vendors.map(v => `<th>${v.shortName}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${features.map(feature => `
            <tr>
              <td>${feature.label}</td>
              ${vendors.map(v => `
                <td class="${v.security[feature.key] ? 'supported' : 'not-supported'}">
                  ${v.security[feature.key] ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}
                </td>
              `).join('')}
            </tr>
          `).join('')}
          <tr>
            <td>Zero Trust Score</td>
            ${vendors.map(v => `<td class="score">${v.security.zeroTrust}%</td>`).join('')}
          </tr>
          <tr>
            <td>Remediation Speed</td>
            ${vendors.map(v => `<td class="score">${v.security.remediationSpeed} hours</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
  }
  
  /**
   * Create technical specifications table
   */
  createTechnicalSpecsTable() {
    const container = document.getElementById('technical-specs-table');
    if (!container) return;
    
    const vendors = this.selectedVendors.map(id => this.vendorData[id]);
    
    container.innerHTML = `
      <table class="specs-table">
        <thead>
          <tr>
            <th>Technical Specification</th>
            ${vendors.map(v => `<th>${v.shortName}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Architecture</td>
            ${vendors.map(v => `<td class="architecture-${v.architecture}">${v.cloudNative ? 'Cloud-Native' : v.architecture}</td>`).join('')}
          </tr>
          <tr>
            <td>Max Devices</td>
            ${vendors.map(v => `<td>${v.technical.maxDevices}</td>`).join('')}
          </tr>
          <tr>
            <td>Performance Impact</td>
            ${vendors.map(v => `<td>${v.technical.performanceImpact}</td>`).join('')}
          </tr>
          <tr>
            <td>Reliability</td>
            ${vendors.map(v => `<td>${v.technical.reliability}%</td>`).join('')}
          </tr>
          <tr>
            <td>Update Frequency</td>
            ${vendors.map(v => `<td>${v.technical.updateFrequency}</td>`).join('')}
          </tr>
          <tr>
            <td>API Availability</td>
            ${vendors.map(v => `<td>${v.technical.apiAvailability}%</td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
  }
  
  /**
   * Create analyst ratings grid
   */
  createAnalystRatings() {
    const container = document.getElementById('analyst-ratings-grid');
    if (!container) return;
    
    container.innerHTML = `
      <div class="analyst-grid">
        <div class="analyst-card">
          <div class="analyst-logo">
            <img src="./img/logos/gartner.png" alt="Gartner">
          </div>
          <div class="analyst-content">
            <h4>Gartner Magic Quadrant</h4>
            <p class="rating">Portnox: <strong>Leader</strong></p>
            <p class="description">Highest score for "Completeness of Vision" in NAC category</p>
          </div>
        </div>
        
        <div class="analyst-card">
          <div class="analyst-logo">
            <img src="./img/logos/forrester.png" alt="Forrester">
          </div>
          <div class="analyst-content">
            <h4>Forrester Wave™</h4>
            <p class="rating">Portnox: <strong>Strong Performer</strong></p>
            <p class="description">Top marks for cloud delivery and Zero Trust capabilities</p>
          </div>
        </div>
        
        <div class="analyst-card">
          <div class="analyst-logo">
            <img src="./img/logos/idc.png" alt="IDC">
          </div>
          <div class="analyst-content">
            <h4>IDC MarketScape</h4>
            <p class="rating">Portnox: <strong>Major Player</strong></p>
            <p class="description">Recognized for innovation in cloud-native NAC</p>
          </div>
        </div>
        
        <div class="analyst-card">
          <div class="analyst-logo">
            <img src="./img/logos/g2.png" alt="G2">
          </div>
          <div class="analyst-content">
            <h4>G2 Crowd</h4>
            <p class="rating">Portnox: <strong>4.8/5.0 ⭐</strong></p>
            <p class="description">Leader in NAC category with 94% user satisfaction</p>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Handle vendor selection
   */
  handleVendorSelection(e) {
    const card = e.currentTarget;
    const vendorId = card.getAttribute('data-vendor');
    
    if (vendorId === 'portnox') {
      // Portnox is always selected
      return;
    }
    
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
      this.selectedVendors = this.selectedVendors.filter(id => id !== vendorId);
    } else {
      if (this.selectedVendors.length >= 4) {
        this.showNotification('Maximum 4 vendors can be compared', 'warning');
        return;
      }
      card.classList.add('selected');
      this.selectedVendors.push(vendorId);
    }
    
    this.refreshData();
  }
  
  /**
   * Handle tab switching
   */
  handleTabSwitch(e) {
    const btn = e.currentTarget;
    const targetView = btn.getAttribute('data-view');
    
    // Update active states
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-content="${targetView}"]`)?.classList.add('active');
    
    this.currentView = targetView;
    
    // Initialize charts for the view if needed
    setTimeout(() => {
      if (targetView === 'financial' && !this.chartInstances.costBreakdownChart) {
        this.createCostBreakdownChart();
      } else if (targetView === 'security' && !this.chartInstances.securityRadarChart) {
        this.createSecurityRadarChart();
        this.createComplianceChart();
      } else if (targetView === 'market' && !this.chartInstances.marketShareChart) {
        this.createMarketShareChart();
      }
    }, 300);
  }
  
  /**
   * Handle chart type change
   */
  handleChartTypeChange(e) {
    const btn = e.currentTarget;
    const chartId = btn.getAttribute('data-chart');
    const chartType = btn.getAttribute('data-type');
    
    // Update active state
    btn.parentElement.querySelectorAll('.chart-control').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update chart type
    if (chartId === 'tco' && this.chartInstances.tcoChart) {
      this.chartInstances.tcoChart.updateOptions({
        chart: { type: chartType }
      });
    }
  }
  
  /**
   * Animate value
   */
  animateValue(elementId, start, end, type = 'number') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      
      if (type === 'currency') {
        element.textContent = '$' + Math.round(current).toLocaleString();
      } else if (type === 'percentage') {
        element.textContent = Math.round(current) + '%';
      } else {
        element.textContent = Math.round(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }
  
  /**
   * Format currency
   */
  formatCurrency(value) {
    return '$' + value.toLocaleString();
  }
  
  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  /**
   * Animate entrance
   */
  animateEntrance() {
    const elements = document.querySelectorAll('.animate-slide-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }
  
  /**
   * Refresh data
   */
  refreshData() {
    this.updateMetrics();
    this.initializeAllCharts();
    this.showNotification('Dashboard refreshed successfully', 'success');
  }
  
  /**
   * Generate report
   */
  generateReport() {
    this.showNotification('Generating executive report...', 'info');
    
    setTimeout(() => {
      this.showNotification('Executive report ready for download', 'success');
      // In a real implementation, this would generate a PDF
    }, 2000);
  }
  
  /**
   * Schedule demo
   */
  scheduleDemo() {
    window.open('https://www.portnox.com/demo/', '_blank');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the executive view
  const executiveView = document.querySelector('#executive-view');
  if (executiveView) {
    window.enhancedExecutiveDashboard = new EnhancedExecutiveDashboard();
    window.enhancedExecutiveDashboard.init();
  }
});
