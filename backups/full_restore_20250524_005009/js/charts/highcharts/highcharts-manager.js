/**
 * Highcharts implementation for Portnox Total Cost Analyzer
 * Creates advanced, interactive charts with professional styling
 */

class HighchartsManager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      ...config
    };
    
    this.charts = {};
    
    // Initialize Highcharts global options
    this.initHighchartsGlobalOptions();
  }
  
  /**
   * Initialize Highcharts global options
   */
  initHighchartsGlobalOptions() {
    Highcharts.setOptions({
      colors: this.config.colors.chart,
      chart: {
        style: {
          fontFamily: ChartConfig.defaults.fontFamily,
          fontSize: ChartConfig.defaults.fontSize + 'px'
        },
        animation: {
          duration: 1000
        },
        backgroundColor: null,
        borderRadius: 8,
        spacing: [20, 20, 20, 20]
      },
      title: {
        style: {
          fontFamily: ChartConfig.defaults.fontFamily,
          fontSize: '16px',
          fontWeight: '600'
        }
      },
      subtitle: {
        style: {
          fontFamily: ChartConfig.defaults.fontFamily,
          fontSize: '13px'
        }
      },
      xAxis: {
        labels: {
          style: {
            fontFamily: ChartConfig.defaults.fontFamily,
            fontSize: '12px'
          }
        }
      },
      yAxis: {
        labels: {
          style: {
            fontFamily: ChartConfig.defaults.fontFamily,
            fontSize: '12px'
          }
        },
        title: {
          style: {
            fontFamily: ChartConfig.defaults.fontFamily,
            fontSize: '13px',
            fontWeight: '600'
          }
        }
      },
      legend: {
        itemStyle: {
          fontFamily: ChartConfig.defaults.fontFamily,
          fontSize: '12px'
        },
        itemHoverStyle: {
          color: '#555'
        }
      },
      credits: {
        enabled: false
      }
    });
  }
  
  /**
   * Create risk comparison radar chart
   * Used in Security View to compare vendors' security capabilities
   */
  createRiskComparisonChart(data, elementId, chartId) {
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    
    // Prepare series data
    const series = vendors.map(vendorId => {
      const security = data.security[vendorId];
      const vendor = VENDORS[vendorId];
      
      return {
        name: vendor.name,
        data: [
          security.securityScores.zeroTrust,
          security.securityScores.deviceAuth,
          security.securityScores.riskAssessment,
          100 - (security.securityScores.remediationSpeed / 2), // Invert so lower is better
          security.compliance.coverage
        ],
        pointPlacement: 'on',
        color: ChartConfig.getVendorColor(vendorId)
      };
    });
    
    const options = {
      chart: {
        type: 'radar',
        height: 500
      },
      title: {
        text: 'Security Capability Comparison',
        align: 'center'
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: [
          'Zero Trust Architecture',
          'Device Authentication',
          'Risk Assessment',
          'Remediation Speed',
          'Compliance Coverage'
        ],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 100,
        labels: {
          format: '{value}%'
        }
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
      },
      series: series,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            pane: {
              size: '70%'
            }
          }
        }]
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create breach impact chart using column chart with drilldown
   * Used in Security View to show potential financial impact of breaches
   */
  createBreachImpactChart(data, elementId, chartId) {
    const industryBreachCost = data.calculator ? data.calculator.getIndustryBreachCost() : 4500000;
    const breachProbability = data.calculator ? data.calculator.getBreachProbability() : 0.15;
    
    // Calculate breach costs with and without NAC
    const withoutNacCost = industryBreachCost * breachProbability;
    
    // Calculate for each vendor
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    const vendorBreachCosts = {};
    
    vendors.forEach(vendorId => {
      const security = data.security[vendorId];
      const riskReduction = security.improvements.overall / 100;
      vendorBreachCosts[vendorId] = withoutNacCost * (1 - riskReduction);
    });
    
    // Prepare data for chart
    const drilldownData = {};
    vendors.forEach(vendorId => {
      drilldownData[vendorId] = {
        name: VENDORS[vendorId].name,
        id: vendorId,
        data: [
          ['Expected Loss', vendorBreachCosts[vendorId]],
          ['Breach Cost Avoided', withoutNacCost - vendorBreachCosts[vendorId]]
        ]
      };
    });
    
    const mainData = vendors.map(vendorId => ({
      name: VENDORS[vendorId].name,
      y: vendorBreachCosts[vendorId],
      color: ChartConfig.getVendorColor(vendorId),
      drilldown: vendorId
    }));
    
    mainData.push({
      name: 'No NAC',
      y: withoutNacCost,
      color: ChartConfig.getVendorColor('no-nac'),
      drilldown: null
    });
    
    const options = {
      chart: {
        type: 'column',
        height: 400
      },
      title: {
        text: 'Potential Breach Impact Analysis'
      },
      subtitle: {
        text: 'Click on columns to view detailed breakdown'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Expected Annual Loss ($)'
        },
        labels: {
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value, 0, '.', ',');
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              return '$' + Highcharts.numberFormat(this.y, 0, '.', ',');
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.0f}</b><br/>'
      },
      series: [{
        name: 'Expected Annual Loss',
        colorByPoint: true,
        data: mainData
      }],
      drilldown: {
        series: Object.values(drilldownData)
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create feature radar chart for technical view
   * Compares vendors based on feature support
   */
  createFeatureRadarChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    
    // Define features to compare
    const features = [
      'Cloud Integration',
      'Legacy Device Support',
      'BYOD Support',
      'IoT Support',
      'Wireless Support',
      'Remote Work Support'
    ];
    
    // Map to vendor.features properties
    const featureMapping = {
      'Cloud Integration': 'cloudIntegration',
      'Legacy Device Support': 'legacyDevices',
      'BYOD Support': 'byod',
      'IoT Support': 'iot',
      'Wireless Support': 'wireless',
      'Remote Work Support': 'remoteUsers'
    };
    
    // Prepare series data
    const series = vendors.map(vendorId => {
      const vendor = VENDORS[vendorId];
      
      // Map feature support to scores (100 if supported, 0 if not)
      const featureScores = features.map(feature => {
        const prop = featureMapping[feature];
        return vendor.features[prop] ? 100 : 0;
      });
      
      return {
        name: vendor.name,
        data: featureScores,
        pointPlacement: 'on',
        color: ChartConfig.getVendorColor(vendorId)
      };
    });
    
    const options = {
      chart: {
        type: 'radar',
        height: 500
      },
      title: {
        text: 'Feature Comparison',
        align: 'center'
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: features,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 100,
        labels: {
          formatter: function() {
            return this.value === 0 ? 'No' : (this.value === 100 ? 'Yes' : '');
          }
        }
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y === 100 ? "Supported" : "Not Supported"}</b><br/>'
      },
      series: series,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            pane: {
              size: '70%'
            }
          }
        }]
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create architecture comparison chart
   * Compares different architecture types using pictorial chart
   */
  createArchitectureChart(data, elementId, chartId) {
    const vendors = Object.keys(data.vendors).filter(v => v !== 'no-nac');
    
    // Group vendors by architecture type
    const architectureCounts = {
      'cloud': {
        count: 0,
        vendors: []
      },
      'on-premises': {
        count: 0,
        vendors: []
      },
      'hybrid': {
        count: 0,
        vendors: []
      }
    };
    
    vendors.forEach(vendorId => {
      const architecture = VENDORS[vendorId].architecture;
      if (architectureCounts[architecture]) {
        architectureCounts[architecture].count++;
        architectureCounts[architecture].vendors.push(VENDORS[vendorId].name);
      }
    });
    
    // Prepare data for chart
    const categories = ['Cloud-Native', 'On-Premises', 'Hybrid'];
    const seriesData = [
      architectureCounts['cloud'].count,
      architectureCounts['on-premises'].count,
      architectureCounts['hybrid'].count
    ];
    
    const options = {
      chart: {
        type: 'column',
        height: 400
      },
      title: {
        text: 'Architecture Comparison'
      },
      subtitle: {
        text: 'Distribution of NAC architectures'
      },
      xAxis: {
        categories: categories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Vendors'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} vendors</b></td></tr>' +
                    '<tr><td colspan="2" style="padding:0">{point.vendors}</td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          colorByPoint: true,
          colors: [
            '#2ecc71', // Cloud-Native
            '#e74c3c', // On-Premises
            '#f39c12'  // Hybrid
          ],
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Architecture Type',
        data: [
          {
            y: seriesData[0],
            vendors: architectureCounts['cloud'].vendors.join(', '),
            color: '#2ecc71'
          },
          {
            y: seriesData[1],
            vendors: architectureCounts['on-premises'].vendors.join(', '),
            color: '#e74c3c'
          },
          {
            y: seriesData[2],
            vendors: architectureCounts['hybrid'].vendors.join(', '),
            color: '#f39c12'
          }
        ]
      }]
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create NIST Framework chart
   * Shows compliance with NIST Cybersecurity Framework
   */
  createNistFrameworkChart(data, elementId, chartId) {
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    
    // Define NIST framework categories
    const nistCategories = [
      'Identify',
      'Protect',
      'Detect',
      'Respond',
      'Recover'
    ];
    
    // Assign scores for each vendor based on their security scores
    // This would ideally come from more detailed data
    const series = vendors.map(vendorId => {
      const security = data.security[vendorId];
      const vendor = VENDORS[vendorId];
      
      // Map security scores to NIST categories
      // This is simplified - in a real implementation, each category would have detailed subscores
      const nistScores = [
        security.securityScores.zeroTrust * 0.8, // Identify
        security.securityScores.deviceAuth,      // Protect
        security.securityScores.riskAssessment,  // Detect
        Math.max(0, 100 - security.securityScores.remediationSpeed * 2), // Respond
        vendor.architecture === 'cloud' ? 85 : 70 // Recover (cloud solutions generally recover faster)
      ];
      
      return {
        name: vendor.name,
        data: nistScores,
        pointPlacement: 'on',
        color: ChartConfig.getVendorColor(vendorId)
      };
    });
    
    const options = {
      chart: {
        type: 'radar',
        height: 500
      },
      title: {
        text: 'NIST Cybersecurity Framework Alignment'
      },
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: nistCategories,
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 100,
        labels: {
          format: '{value}%'
        }
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
      },
      series: series,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal'
            },
            pane: {
              size: '70%'
            }
          }
        }]
      }
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Create insurance impact chart
   * Shows impact on insurance premiums
   */
  createInsuranceImpactChart(data, elementId, chartId) {
    const vendors = Object.keys(data.roi).filter(v => v !== 'no-nac');
    
    // Get insurance premium and savings
    const basePremium = data.calculator ? data.calculator.getInsurancePremium() * data.calculator.config.years : 37500;
    
    // Create series data
    const seriesData = vendors.map(vendorId => {
      const roi = data.roi[vendorId];
      return {
        name: VENDORS[vendorId].name,
        y: roi.insuranceSavings,
        color: ChartConfig.getVendorColor(vendorId)
      };
    });
    
    const options = {
      chart: {
        type: 'column',
        height: 300
      },
      title: {
        text: 'Cybersecurity Insurance Premium Savings'
      },
      subtitle: {
        text: `Base annual premium: ${ChartConfig.formatCurrency(basePremium / data.calculator.config.years)}`
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Premium Savings ($)'
        },
        labels: {
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value, 0, '.', ',');
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.y:,.0f}</b> ({point.percentage:.1f}% of base premium)'
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            formatter: function() {
              return '$' + Highcharts.numberFormat(this.y, 0, '.', ',');
            }
          }
        }
      },
      series: [{
        name: 'Insurance Savings',
        colorByPoint: true,
        data: seriesData
      }]
    };
    
    const element = document.getElementById(elementId);
    if (element) {
      // Destroy existing chart if any
      if (this.charts[chartId] && this.charts[chartId].destroy) {
        this.charts[chartId].destroy();
      }
      
      this.charts[chartId] = Highcharts.chart(element, options);
    }
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Security View
   */
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['riskComparisonChart', 'breachImpactChart', 'insuranceImpactChart', 'nistFrameworkChart']);
    
    // Create risk comparison chart
    this.createRiskComparisonChart(resultsData, 'risk-comparison-chart', 'riskComparisonChart');
    
    // Create breach impact chart
    this.createBreachImpactChart(resultsData, 'breach-impact-chart', 'breachImpactChart');
    
    // Create insurance impact chart
    this.createInsuranceImpactChart(resultsData, 'insurance-impact-chart', 'insuranceImpactChart');
    
    // Create NIST framework chart
    this.createNistFrameworkChart(resultsData, 'nist-framework-chart', 'nistFrameworkChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Technical View
   */
  initTechnicalCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['architectureChart', 'featureRadarChart']);
    
    // Create architecture chart
    this.createArchitectureChart(resultsData, 'architecture-chart', 'architectureChart');
    
    // Create feature radar chart
    this.createFeatureRadarChart(resultsData, 'feature-radar-chart', 'featureRadarChart');
    
    return this.charts;
  }
  
  /**
   * Helper method to destroy charts
   */
  destroyCharts(chartIds) {
    chartIds.forEach(id => {
      if (this.charts[id] && this.charts[id].destroy) {
        this.charts[id].destroy();
        delete this.charts[id];
      }
    });
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HighchartsManager };
}
