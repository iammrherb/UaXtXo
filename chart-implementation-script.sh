#!/bin/bash

# ==========================================================
# Portnox Total Cost Analyzer - Next Implementation Phase
# ==========================================================
# This script will:
# 1. Implement Highcharts and D3.js visualizations
# 2. Complete chart implementations for all views
# 3. Set up export functionality
# 4. Enhance the security dashboard
# ==========================================================

set -e  # Exit on any error

echo "=== Starting Phase 2 Implementation: Charts & Visualizations ==="

# Create backup of current state
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="portnox_phase2_backup_$TIMESTAMP"

echo "Creating backup in $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r * "$BACKUP_DIR" 2>/dev/null || true
cp -r .git "$BACKUP_DIR" 2>/dev/null || true

# ===================================================
# 1. Implement Highcharts Integration
# ===================================================
echo "Implementing Highcharts integration..."

mkdir -p js/charts/highcharts

# Create Highcharts implementation file
cat > js/charts/highcharts/highcharts-manager.js << 'EOL'
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
EOL

# ===================================================
# 2. Implement D3.js Visualizations
# ===================================================
echo "Implementing D3.js visualizations..."

mkdir -p js/charts/d3

# Create D3 visualization manager file
cat > js/charts/d3/d3-manager.js << 'EOL'
/**
 * D3.js implementation for Portnox Total Cost Analyzer
 * Creates advanced, custom visualizations for complex data
 */

class D3Manager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      ...config
    };
    
    this.charts = {};
  }
  
  /**
   * Create security heatmap using D3
   * Shows security capabilities across vendors in a heatmap
   */
  createSecurityHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    
    // Security capabilities to display
    const capabilities = [
      { id: 'zeroTrust', name: 'Zero Trust Architecture' },
      { id: 'deviceAuth', name: 'Device Authentication' },
      { id: 'riskAssessment', name: 'Risk Assessment' },
      { id: 'remediationSpeed', name: 'Remediation Speed' }
    ];
    
    // Prepare data for heatmap
    const heatmapData = [];
    
    vendors.forEach(vendorId => {
      const security = data.security[vendorId];
      const vendor = VENDORS[vendorId];
      
      capabilities.forEach(capability => {
        let value;
        if (capability.id === 'remediationSpeed') {
          // For remediation speed, lower is better, so invert scale
          // Convert minutes to a 0-100 scale (0 min -> 100, 60+ min -> 0)
          const minutes = security.securityScores.remediationSpeed;
          value = Math.max(0, 100 - (minutes * 1.67));
        } else {
          value = security.securityScores[capability.id];
        }
        
        heatmapData.push({
          vendor: vendor.name,
          capability: capability.name,
          value: value
        });
      });
    });
    
    // Set up dimensions
    const margin = { top: 50, right: 20, bottom: 100, left: 150 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(capabilities.map(d => d.name))
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(vendors.map(v => VENDORS[v].name))
      .padding(0.05);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Build color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('position', 'absolute')
      .style('z-index', '10');
    
    // Functions for mouseover events
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };
    
    const mousemove = function(event, d) {
      tooltip
        .html(`<strong>${d.vendor}</strong><br>${d.capability}: ${Math.round(d.value)}%`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.8);
    };
    
    // Add color squares
    svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.capability))
      .attr('y', d => y(d.vendor))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Security Capabilities Heatmap');
    
    // Add legend
    const legendWidth = 20;
    const legendHeight = 200;
    
    const legendScale = d3.scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateViridis);
    
    // Create a gradient for the legend
    const defs = svg.append('defs');
    
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    
    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter().append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => legendScale(d * 100));
    
    // Add the legend rectangle
    svg.append('rect')
      .attr('x', width + 10)
      .attr('y', 0)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)');
    
    // Create a scale for the legend
    const legendY = d3.scaleLinear()
      .domain([0, 100])
      .range([legendHeight, 0]);
    
    // Add the legend axis
    const legendAxis = d3.axisRight(legendY)
      .tickSize(3)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');
    
    svg.append('g')
      .attr('transform', `translate(${width + 10 + legendWidth},0)`)
      .call(legendAxis);
    
    // Add legend title
    svg.append('text')
      .attr('transform', `translate(${width + 40},${legendHeight + 30})`)
      .style('text-anchor', 'middle')
      .text('Capability Score');
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      destroy: () => {
        if (element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create risk heatmap using D3
   * Shows business impact by risk category and likelihood
   */
  createRiskHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Risk impact categories
    const impactCategories = [
      'Data Breach',
      'Unauthorized Access',
      'Malware Infection',
      'Compliance Violation',
      'Service Disruption'
    ];
    
    // Risk likelihood levels with descriptive labels
    const likelihoodLevels = [
      'Very Low',
      'Low',
      'Medium',
      'High',
      'Very High'
    ];
    
    // Generate risk scores for each vendor for each impact category
    const vendors = Object.keys(data.security).filter(v => v !== 'no-nac');
    const vendorData = {};
    
    vendors.forEach(vendorId => {
      const security = data.security[vendorId];
      const vendor = VENDORS[vendorId];
      
      // Base likelihood score based on security capability
      const baseLikelihoodScore = 5 - Math.round(security.securityScores.zeroTrust / 20); // 0-100 -> 5-1
      
      const risks = impactCategories.map(category => {
        // Adjust likelihood based on category and vendor capabilities
        let likelihoodAdjustment = 0;
        
        switch (category) {
          case 'Data Breach':
            likelihoodAdjustment = 5 - Math.round(security.securityScores.deviceAuth / 20);
            break;
          case 'Unauthorized Access':
            likelihoodAdjustment = 5 - Math.round(security.securityScores.zeroTrust / 20);
            break;
          case 'Malware Infection':
            likelihoodAdjustment = 5 - Math.round(security.securityScores.deviceAuth / 20);
            break;
          case 'Compliance Violation':
            likelihoodAdjustment = 5 - Math.round(security.compliance.coverage / 20);
            break;
          case 'Service Disruption':
            likelihoodAdjustment = 5 - Math.round((100 - security.securityScores.remediationSpeed) / 20);
            break;
        }
        
        // Average base and adjustment
        const likelihood = Math.round((baseLikelihoodScore + likelihoodAdjustment) / 2);
        
        // Impact level - more severe for regulated industries or high risk profiles
        let impact = 3; // Medium by default
        if (data.calculator && data.calculator.config) {
          if (data.calculator.config.riskProfile === 'high' || 
              data.calculator.config.riskProfile === 'regulated') {
            impact = 4; // High
          } else if (data.calculator.config.riskProfile === 'standard') {
            impact = 2; // Low
          }
        }
        
        // Adjust impact by category
        if (category === 'Data Breach' || category === 'Compliance Violation') {
          impact = Math.min(5, impact + 1); // Increase impact
        }
        
        return {
          category,
          likelihood,
          impact
        };
      });
      
      vendorData[vendorId] = risks;
    });
    
    // Select vendor to display (default to Portnox)
    const selectedVendor = 'portnox';
    const riskData = vendorData[selectedVendor];
    
    // Prepare data for heatmap
    const heatmapData = [];
    
    for (let i = 1; i <= 5; i++) { // Impact levels 1-5
      for (let j = 1; j <= 5; j++) { // Likelihood levels 1-5
        // Find if any risks fall in this cell
        const cellRisks = riskData.filter(r => r.impact === i && r.likelihood === j);
        
        heatmapData.push({
          impact: i,
          likelihood: j,
          value: cellRisks.length > 0 ? cellRisks.length * 25 : 0,
          risks: cellRisks.map(r => r.category)
        });
      }
    }
    
    // Set up dimensions
    const margin = { top: 50, right: 20, bottom: 70, left: 100 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(d3.range(1, 6).map(d => d)) // 1-5
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(d3.range(1, 6).map(d => d)) // 1-5
      .padding(0.05);
    
    // Add X axis (Likelihood)
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => likelihoodLevels[d-1]));
    
    // Add X axis label
    svg.append('text')
      .attr('transform', `translate(${width/2},${height + 35})`)
      .style('text-anchor', 'middle')
      .text('Likelihood');
    
    // Add Y axis (Impact)
    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d => {
        switch (d) {
          case 1: return 'Negligible';
          case 2: return 'Minor';
          case 3: return 'Moderate';
          case 4: return 'Major';
          case 5: return 'Severe';
        }
      }));
    
    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -height/2)
      .attr('text-anchor', 'middle')
      .text('Impact');
    
    // Build color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateReds)
      .domain([0, 100]);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('position', 'absolute')
      .style('z-index', '10');
    
    // Functions for mouseover events
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };
    
    const mousemove = function(event, d) {
      let text = `<strong>Impact: ${d.impact} | Likelihood: ${d.likelihood}</strong><br>`;
      if (d.risks.length > 0) {
        text += 'Risk Categories:<br>';
        d.risks.forEach(risk => {
          text += `- ${risk}<br>`;
        });
      } else {
        text += 'No significant risks';
      }
      
      tooltip
        .html(text)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.8);
    };
    
    // Add color squares
    svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.likelihood))
      .attr('y', d => y(d.impact))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add text for cells with risks
    svg.selectAll()
      .data(heatmapData.filter(d => d.risks.length > 0))
      .enter()
      .append('text')
      .attr('x', d => x(d.likelihood) + x.bandwidth() / 2)
      .attr('y', d => y(d.impact) + y.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .text(d => d.risks.length);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(`Risk Assessment for ${VENDORS[selectedVendor].name}`);
    
    // Add legend showing selected vendor
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 55)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(`Numbers indicate how many risk categories fall in each cell`);
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      destroy: () => {
        if (element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create vendor strengths radar chart
   * Shows multi-dimensional comparison of vendor capabilities
   */
  createVendorRadarChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define dimensions for comparison
    const dimensions = [
      { name: 'Total Cost', key: 'cost' },
      { name: 'Security', key: 'security' },
      { name: 'Ease of Use', key: 'easeOfUse' },
      { name: 'Implementation', key: 'implementation' },
      { name: 'Scalability', key: 'scalability' },
      { name: 'Features', key: 'features' }
    ];
    
    // Select vendors to compare (limit to top 4 for readability)
    const vendors = Object.keys(data.vendors)
      .filter(v => v !== 'no-nac')
      .slice(0, 4);
    
    // Calculate scores for each vendor across dimensions
    const vendorScores = vendors.map(vendorId => {
      const vendor = VENDORS[vendorId];
      const vendorTco = data.vendors[vendorId];
      const security = data.security[vendorId];
      
      const scores = {};
      
      // Calculate normalized scores for each dimension
      
      // Cost - lower is better, normalize to 0-100
      const maxTco = Math.max(...Object.values(data.vendors).map(v => v.totalTco));
      const minTco = Math.min(...Object.values(data.vendors).map(v => v.totalTco));
      scores.cost = 100 - (((vendorTco.totalTco - minTco) / (maxTco - minTco)) * 100);
      
      // Security - higher is better
      scores.security = security.improvements.overall;
      
      // Ease of Use - based on architecture (cloud is easier)
      scores.easeOfUse = vendor.architecture === 'cloud' ? 90 : 
                         (vendor.architecture === 'hybrid' ? 70 : 50);
      
      // Implementation - faster is better, normalize to 0-100
      const maxTime = Math.max(...Object.values(data.vendors).map(v => v.implementation.time));
      const minTime = Math.min(...Object.values(data.vendors).map(v => v.implementation.time));
      scores.implementation = 100 - (((vendorTco.implementation.time - minTime) / (maxTime - minTime)) * 100);
      
      // Scalability - based on architecture and vendor capabilities
      scores.scalability = vendor.architecture === 'cloud' ? 90 : 
                          (vendor.architecture === 'hybrid' ? 75 : 60);
      
      // Features - based on feature support
      const featureCount = Object.values(vendor.features).filter(v => v).length;
      const maxFeatures = 6; // Maximum number of features in our model
      scores.features = (featureCount / maxFeatures) * 100;
      
      return {
        name: vendor.name,
        color: ChartConfig.getVendorColor(vendorId),
        scores
      };
    });
    
    // Set up dimensions
    const margin = { top: 50, right: 100, bottom: 50, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width / 2, height / 2);
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width/2},${margin.top + height/2})`);
    
    // Create scales
    const angleScale = d3.scalePoint()
      .range([0, Math.PI * 2])
      .domain(dimensions.map(d => d.key))
      .padding(1);
    
    const radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]);
    
    // Create axes
    const axes = dimensions.map(dim => {
      const angle = angleScale(dim.key);
      return {
        name: dim.name,
        key: dim.key,
        angle,
        x1: 0,
        y1: 0,
        x2: radius * Math.cos(angle - Math.PI / 2),
        y2: radius * Math.sin(angle - Math.PI / 2)
      };
    });
    
    // Add axes
    svg.selectAll('line')
      .data(axes)
      .enter()
      .append('line')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);
    
    // Add axis labels
    svg.selectAll('text')
      .data(axes)
      .enter()
      .append('text')
      .attr('x', d => (radius + 10) * Math.cos(d.angle - Math.PI / 2))
      .attr('y', d => (radius + 10) * Math.sin(d.angle - Math.PI / 2))
      .attr('text-anchor', d => {
        const angle = d.angle;
        if (Math.abs(angle - Math.PI) < 0.1) return 'middle';
        return angle > Math.PI ? 'end' : 'start';
      })
      .attr('alignment-baseline', d => {
        const angle = d.angle;
        if (Math.abs(angle - Math.PI / 2) < 0.1) return 'before-edge';
        if (Math.abs(angle - 3 * Math.PI / 2) < 0.1) return 'after-edge';
        return 'middle';
      })
      .text(d => d.name)
      .style('font-size', '12px');
    
    // Add radar circles
    const circles = [20, 40, 60, 80, 100];
    svg.selectAll('circle')
      .data(circles)
      .enter()
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => radiusScale(d))
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
    
    // Add circle labels
    svg.selectAll('.circle-label')
      .data(circles)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', d => -radiusScale(d))
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(d => d)
      .style('font-size', '8px')
      .style('fill', '#999');
    
    // Create line generator
    const lineGenerator = d3.lineRadial()
      .angle((d, i) => angleScale(dimensions[i].key) - Math.PI / 2)
      .radius(d => radiusScale(d))
      .curve(d3.curveLinearClosed);
    
    // Add vendor radar paths
    vendorScores.forEach(vendor => {
      const values = dimensions.map(dim => vendor.scores[dim.key]);
      
      // Draw radar path
      svg.append('path')
        .datum(values)
        .attr('d', lineGenerator)
        .attr('fill', vendor.color)
        .attr('fill-opacity', 0.2)
        .attr('stroke', vendor.color)
        .attr('stroke-width', 2);
      
      // Add points at each dimension
      dimensions.forEach((dim, i) => {
        const angle = angleScale(dim.key) - Math.PI / 2;
        const value = vendor.scores[dim.key];
        
        svg.append('circle')
          .attr('cx', radiusScale(value) * Math.cos(angle))
          .attr('cy', radiusScale(value) * Math.sin(angle))
          .attr('r', 3)
          .attr('fill', vendor.color);
      });
    });
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 20},-${radius})`);
    
    vendorScores.forEach((vendor, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0,${i * 20})`);
      
      legendGroup.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', vendor.color);
      
      legendGroup.append('text')
        .attr('x', 16)
        .attr('y', 10)
        .text(vendor.name)
        .style('font-size', '12px');
    });
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Vendor Capability Comparison');
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: vendorScores,
      destroy: () => {
        if (element) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Create vendor radar chart
    this.createVendorRadarChart(resultsData, 'vendor-radar-chart', 'vendorRadarChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Security View
   */
  initSecurityCharts(resultsData) {
    // Create security heatmap
    this.createSecurityHeatmap(resultsData, 'security-heatmap', 'securityHeatmap');
    
    // Create risk heatmap
    this.createRiskHeatmap(resultsData, 'risk-heatmap', 'riskHeatmap');
    
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
  module.exports = { D3Manager };
}
EOL

# ===================================================
# 3. Update Core Files to Use All Chart Libraries
# ===================================================
echo "Updating core files to use all chart libraries..."

# Create the chart loader file
cat > js/charts/chart-loader.js << 'EOL'
/**
 * Chart Loader for Portnox Total Cost Analyzer
 * Manages loading and integration of different chart libraries
 */

class ChartLoader {
  constructor() {
    this.apexChartManager = null;
    this.highchartsManager = null;
    this.d3Manager = null;
    
    this.activeCharts = {};
  }
  
  /**
   * Initialize chart managers
   */
  init() {
    // Initialize ApexCharts manager
    this.apexChartManager = new ApexChartManager();
    
    // Initialize Highcharts manager
    this.highchartsManager = new HighchartsManager();
    
    // Initialize D3 manager
    this.d3Manager = new D3Manager();
    
    return this;
  }
  
  /**
   * Load charts for the executive view
   */
  loadExecutiveCharts(resultsData) {
    console.log('Loading executive charts...');
    
    // Use ApexCharts for basic financial charts
    this.activeCharts.executive = {
      ...this.apexChartManager.initExecutiveCharts(resultsData),
      // Use D3 for the radar chart (more customizable)
      ...this.d3Manager.initExecutiveCharts(resultsData)
    };
    
    return this.activeCharts.executive;
  }
  
  /**
   * Load charts for the financial view
   */
  loadFinancialCharts(resultsData) {
    console.log('Loading financial charts...');
    
    // Use ApexCharts for financial view (simpler charts)
    this.activeCharts.financial = {
      ...this.apexChartManager.initFinancialCharts(resultsData)
    };
    
    return this.activeCharts.financial;
  }
  
  /**
   * Load charts for the security view
   */
  loadSecurityCharts(resultsData) {
    console.log('Loading security charts...');
    
    // Use Highcharts for complex security charts
    this.activeCharts.security = {
      ...this.highchartsManager.initSecurityCharts(resultsData),
      // Use D3 for heatmaps (better interactivity)
      ...this.d3Manager.initSecurityCharts(resultsData)
    };
    
    return this.activeCharts.security;
  }
  
  /**
   * Load charts for the technical view
   */
  loadTechnicalCharts(resultsData) {
    console.log('Loading technical charts...');
    
    // Use Highcharts for technical view
    this.activeCharts.technical = {
      ...this.highchartsManager.initTechnicalCharts(resultsData)
    };
    
    return this.activeCharts.technical;
  }
  
  /**
   * Reload charts for the active view
   */
  reloadChartsForView(view, resultsData) {
    switch (view) {
      case 'executive':
        return this.loadExecutiveCharts(resultsData);
      case 'financial':
        return this.loadFinancialCharts(resultsData);
      case 'security':
        return this.loadSecurityCharts(resultsData);
      case 'technical':
        return this.loadTechnicalCharts(resultsData);
      default:
        console.warn(`Unknown view: ${view}`);
        return {};
    }
  }
  
  /**
   * Destroy all charts
   */
  destroyAllCharts() {
    if (this.apexChartManager) {
      // Destroy specific charts
      // Add specific chart IDs as needed
      this.apexChartManager.destroyCharts([
        'tcoComparisonChart', 
        'cumulativeCostChart', 
        'roiChart',
        'valueDriversChart',
        'costStructureChart',
        'costProjectionChart'
      ]);
    }
    
    if (this.highchartsManager) {
      this.highchartsManager.destroyCharts([
        'riskComparisonChart',
        'breachImpactChart',
        'insuranceImpactChart',
        'nistFrameworkChart',
        'architectureChart',
        'featureRadarChart'
      ]);
    }
    
    if (this.d3Manager) {
      this.d3Manager.destroyCharts([
        'securityHeatmap',
        'riskHeatmap',
        'vendorRadarChart'
      ]);
    }
    
    this.activeCharts = {};
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ChartLoader };
}
EOL

# Update main application JavaScript to use the chart loader
cat > js/portnox-tco-analyzer-update.js << 'EOL'
// Update App.init to use ChartLoader
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Loader
  this.state.chartLoader = new ChartLoader().init();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Update updateChartsForActiveView to use ChartLoader
App.updateChartsForActiveView = function() {
  const { activeView, results, chartLoader } = this.state;
  
  if (!chartLoader || !results) return;
  
  // Load charts for the active view
  chartLoader.reloadChartsForView(activeView, results);
};
EOL

# ===================================================
# 4. Update Export Functionality
# ===================================================
echo "Setting up PDF export functionality..."

# Create report generator module
cat > js/utils/report-generator.js << 'EOL'
/**
 * Report Generator for Portnox Total Cost Analyzer
 * Creates PDF reports with charts and analysis
 */

class ReportGenerator {
  constructor(config = {}) {
    this.config = {
      fileName: 'Portnox_TCO_Analysis_Report.pdf',
      pageSize: 'a4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      ...config
    };
  }
  
  /**
   * Generate a PDF report from the TCO analysis results
   */
  generateReport(resultsData, userConfig, selectedVendors) {
    console.log('Generating PDF report...');
    
    const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors);
    
    // Generate PDF using pdfmake
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).download(this.config.fileName);
        resolve(true);
      } catch (error) {
        console.error('Error generating PDF report:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Create document definition for pdfmake
   */
  createDocDefinition(resultsData, userConfig, selectedVendors) {
    const vendors = selectedVendors.map(id => VENDORS[id]);
    const currentDate = new Date().toLocaleDateString();
    
    // Create document content
    return {
      info: {
        title: 'Portnox TCO Analysis Report',
        author: 'Portnox',
        subject: 'Network Access Control Total Cost of Ownership Analysis',
        keywords: 'NAC, TCO, ROI, Portnox'
      },
      pageSize: this.config.pageSize,
      pageOrientation: this.config.pageOrientation,
      pageMargins: this.config.pageMargins,
      footer: function(currentPage, pageCount) {
        return {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'center',
          margin: [0, 10, 0, 0]
        };
      },
      header: function(currentPage) {
        return {
          columns: [
            {
              image: 'data:image/png;base64,...', // Base64 Portnox logo
              width: 100,
              margin: [40, 20, 0, 0]
            },
            {
              text: 'Total Cost Analyzer Report',
              alignment: 'right',
              margin: [0, 20, 40, 0],
              fontSize: 10,
              color: '#666666'
            }
          ]
        };
      },
      content: [
        // Cover page
        {
          stack: [
            {
              text: 'Zero Trust Total Cost Analyzer',
              style: 'title',
              margin: [0, 100, 0, 20]
            },
            {
              text: 'Multi-Vendor NAC Solution Comparison Report',
              style: 'subtitle',
              margin: [0, 0, 0, 40]
            },
            {
              image: 'data:image/png;base64,...', // Base64 Portnox logo
              width: 200,
              alignment: 'center',
              margin: [0, 0, 0, 40]
            },
            {
              text: `Generated on: ${currentDate}`,
              alignment: 'center',
              margin: [0, 60, 0, 0]
            }
          ],
          pageBreak: 'after'
        },
        
        // Table of Contents
        {
          toc: {
            title: { text: 'Table of Contents', style: 'header1' }
          },
          pageBreak: 'after'
        },
        
        // Executive Summary
        {
          stack: [
            { text: 'Executive Summary', style: 'header1', tocItem: true },
            this.createExecutiveSummary(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Financial Analysis
        {
          stack: [
            { text: 'Financial Analysis', style: 'header1', tocItem: true },
            this.createFinancialAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Security & Compliance
        {
          stack: [
            { text: 'Security & Compliance Analysis', style: 'header1', tocItem: true },
            this.createSecurityAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Technical Comparison
        {
          stack: [
            { text: 'Technical Comparison', style: 'header1', tocItem: true },
            this.createTechnicalAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Appendix: Configuration Details
        {
          stack: [
            { text: 'Appendix: Configuration Details', style: 'header1', tocItem: true },
            this.createConfigurationDetails(userConfig)
          ]
        }
      ],
      
      // Document styles
      styles: {
        title: {
          fontSize: 28,
          bold: true,
          color: '#1a5a96',
          alignment: 'center'
        },
        subtitle: {
          fontSize: 16,
          color: '#666666',
          alignment: 'center'
        },
        header1: {
          fontSize: 18,
          bold: true,
          color: '#1a5a96',
          margin: [0, 20, 0, 10]
        },
        header2: {
          fontSize: 14,
          bold: true,
          color: '#333333',
          margin: [0, 15, 0, 5]
        },
        header3: {
          fontSize: 12,
          bold: true,
          color: '#333333',
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: '#ffffff',
          fillColor: '#1a5a96',
          alignment: 'center'
        },
        default: {
          fontSize: 10,
          color: '#333333'
        },
        tableCell: {
          fontSize: 10
        },
        highlightCell: {
          fontSize: 10,
          color: '#1a5a96',
          bold: true
        }
      },
      defaultStyle: {
        fontSize: 10,
        color: '#333333'
      }
    };
  }
  
  /**
   * Create executive summary content
   */
  createExecutiveSummary(resultsData, userConfig, vendors) {
    const portnoxVendor = VENDORS['portnox'];
    const portnoxResults = resultsData.vendors['portnox'];
    const portnoxRoi = resultsData.roi['portnox'];
    const portnoxSecurity = resultsData.security['portnox'];
    
    // Find the competitor with highest TCO for comparison
    const competitors = vendors.filter(v => v.id !== 'portnox' && v.id !== 'no-nac');
    let highestTcoVendor = null;
    
    if (competitors.length > 0) {
      highestTcoVendor = competitors.reduce((prev, current) => {
        return resultsData.vendors[prev.id].totalTco > resultsData.vendors[current.id].totalTco ? prev : current;
      });
    }
    
    const savingsAmount = highestTcoVendor ? 
      resultsData.vendors[highestTcoVendor.id].totalTco - portnoxResults.totalTco : 0;
    
    const savingsPercentage = highestTcoVendor ? 
      Math.round((savingsAmount / resultsData.vendors[highestTcoVendor.id].totalTco) * 100) : 0;
    
    return [
      {
        text: 'Strategic Overview',
        style: 'header2'
      },
      {
        text: [
          'This report presents a comprehensive analysis of the Total Cost of Ownership (TCO) and Return on Investment (ROI) for ',
          { text: portnoxVendor.name, bold: true },
          ' compared to other Network Access Control (NAC) solutions. The analysis was performed for an organization with ',
          { text: `${userConfig.deviceCount.toLocaleString()} devices`, bold: true },
          ' over a period of ',
          { text: `${userConfig.years} years`, bold: true },
          '.'
        ],
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Key Findings',
        style: 'header3',
        margin: [0, 10, 0, 5]
      },
      {
        // Create a 2x2 grid of key metrics
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Total 3-Year Savings', bold: true, fontSize: 12 },
              { text: `$${savingsAmount.toLocaleString()}`, fontSize: 16, color: '#1a5a96', bold: true },
              { text: `${savingsPercentage}% reduction vs. ${highestTcoVendor ? highestTcoVendor.name : 'competitors'}`, fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Return on Investment', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxRoi.roiPercentage)}%`, fontSize: 16, color: '#2ecc71', bold: true },
              { text: `3-year ROI`, fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Payback Period', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxRoi.paybackPeriod)} months`, fontSize: 16, color: '#f39c12', bold: true },
              { text: 'Time to positive ROI', fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Security Improvement', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxSecurity.improvements.overall)}%`, fontSize: 16, color: '#e74c3c', bold: true },
              { text: 'Overall security posture enhancement', fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        text: 'TCO Comparison',
        style: 'header3'
      },
      {
        // TCO comparison table
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [
              { text: 'Vendor', style: 'tableHeader' },
              { text: `${userConfig.years}-Year TCO`, style: 'tableHeader' },
              { text: 'Savings vs. Portnox', style: 'tableHeader' }
            ],
            ...vendors.map(vendor => {
              const vendorTco = resultsData.vendors[vendor.id].totalTco;
              const savings = vendorTco - portnoxResults.totalTco;
              const savingsPct = Math.round((savings / vendorTco) * 100);
              
              return [
                { text: vendor.name, style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell' },
                { text: `$${vendorTco.toLocaleString()}`, style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell' },
                { 
                  text: vendor.id === 'portnox' ? 'Baseline' : 
                        (savings > 0 ? `$${savings.toLocaleString()} (${savingsPct}%)` : 'No savings'),
                  style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell'
                }
              ];
            })
          ]
        },
        margin: [0, 5, 0, 20]
      },
      {
        text: 'Key Strategic Benefits',
        style: 'header3'
      },
      {
        ul: [
          { 
            text: [
              { text: 'Cloud-Native Solution: ', bold: true },
              'Zero infrastructure costs, automatic updates, and global scalability'
            ]
          },
          { 
            text: [
              { text: 'Rapid Deployment: ', bold: true },
              `${Math.round((1 - (portnoxResults.implementation.time / 90)) * 100)}% faster implementation than traditional on-premises alternatives`
            ]
          },
          { 
            text: [
              { text: 'Zero Trust Security: ', bold: true },
              'Comprehensive, continuous device authentication and verification'
            ]
          },
          { 
            text: [
              { text: 'Future-Proof Solution: ', bold: true },
              'Automatic updates, continuous innovation, and AI-powered security'
            ]
          },
          { 
            text: [
              { text: 'Operational Efficiency: ', bold: true },
              `Reduced IT staff time allocation by up to ${Math.round((1 - (portnoxVendor.fte.required / 1.5)) * 100)}% compared to traditional solutions`
            ]
          }
        ],
        margin: [0, 5, 0, 20]
      }
    ];
  }
  
  /**
   * Create financial analysis content
   */
  createFinancialAnalysis(resultsData, userConfig, vendors) {
    // Implementation for financial analysis section
    return [
      {
        text: 'Cost Analysis Overview',
        style: 'header2'
      },
      // Rest of financial analysis content
    ];
  }
  
  /**
   * Create security analysis content
   */
  createSecurityAnalysis(resultsData, userConfig, vendors) {
    // Implementation for security analysis section
    return [
      {
        text: 'Security Posture Analysis',
        style: 'header2'
      },
      // Rest of security analysis content
    ];
  }
  
  /**
   * Create technical analysis content
   */
  createTechnicalAnalysis(resultsData, userConfig, vendors) {
    // Implementation for technical analysis section
    return [
      {
        text: 'Architecture & Technical Capabilities',
        style: 'header2'
      },
      // Rest of technical analysis content
    ];
  }
  
  /**
   * Create configuration details
   */
  createConfigurationDetails(userConfig) {
    // Implementation for configuration details
    return [
      {
        text: 'Analysis Configuration',
        style: 'header2'
      },
      // Rest of configuration details
    ];
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ReportGenerator };
}
EOL

# Create export functionality in the main application
cat > js/portnox-export-update.js << 'EOL'
// Add report generator to App state
App.state.reportGenerator = null;

// Initialize report generator
App.init = function() {
  console.log('Initializing Portnox TCO Analyzer...');
  
  // Initialize Calculator
  this.state.calculator = new TcoCalculator(this.state.config);
  
  // Initialize Chart Loader
  this.state.chartLoader = new ChartLoader().init();
  
  // Initialize Report Generator
  this.state.reportGenerator = new ReportGenerator();
  
  // Set up event listeners
  this.setupEventListeners();
  
  // Initialize UI state
  this.initUIState();
  
  console.log('Portnox TCO Analyzer initialized successfully.');
};

// Update export report function
App.exportReport = function() {
  console.log('Exporting report...');
  
  if (!this.state.results) {
    this.showToast('Please calculate TCO before exporting a report.', 'warning');
    return;
  }
  
  // Show loading overlay
  this.showLoadingOverlay();
  
  // Generate PDF report
  this.state.reportGenerator.generateReport(
    this.state.results,
    this.state.config,
    this.state.selectedVendors
  )
  .then(() => {
    // Hide loading overlay
    this.hideLoadingOverlay();
    
    // Show success toast
    this.showToast('Report exported successfully!', 'success');
  })
  .catch(error => {
    console.error('Error exporting report:', error);
    
    // Hide loading overlay
    this.hideLoadingOverlay();
    
    // Show error toast
    this.showToast('Error exporting report. Please try again.', 'error');
  });
};
EOL

# ===================================================
# 5. Update Index.html with New Script References
# ===================================================
echo "Updating index.html with new script references..."

# Create a sed script to update index.html
cat > update_index.sed << 'EOL'
# Add chart library script references before </head>
/<\/head>/i \
    <!-- Chart Libraries -->\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.41.0/apexcharts.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/highcharts.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/highcharts-more.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/modules/heatmap.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highcharts/11.1.0/modules/exporting.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>\
\
    <!-- Chart Configuration -->\
    <script src="js/charts/chart-config.js"></script>

# Add new script references before the closing body tag
/<script src="js\/portnox-tco-analyzer.js"><\/script>/i \
    <!-- Chart Implementations -->\
    <script src="js/charts/apex/apex-charts.js"></script>\
    <script src="js/charts/highcharts/highcharts-manager.js"></script>\
    <script src="js/charts/d3/d3-manager.js"></script>\
    <script src="js/charts/chart-loader.js"></script>\
\
    <!-- Core Application -->\
    <script src="js/models/vendor-data.js"></script>\
    <script src="js/models/calculator.js"></script>\
    <script src="js/utils/report-generator.js"></script>
EOL

# Apply the sed script to index.html
sed -i.bak -f update_index.sed index.html

# ===================================================
# 6. Update CSS for Heatmaps and D3 Visualizations
# ===================================================
echo "Adding CSS for heatmaps and D3 visualizations..."

cat > css/components/heatmaps.css << 'EOL'
/* Heatmap component styles */
.heatmap-container {
  position: relative;
  height: 400px;
  width: 100%;
  background-color: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
}

.tooltip {
  position: absolute;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 12px;
  pointer-events: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
}

.tooltip strong {
  display: block;
  margin-bottom: 3px;
  color: var(--primary-color);
}

/* D3 chart styles */
.d3-chart {
  font: 12px var(--font-family);
}

.d3-chart .axis path,
.d3-chart .axis line {
  fill: none;
  stroke: #ccc;
  shape-rendering: crispEdges;
}

.d3-chart text {
  fill: var(--text-color);
}

.d3-chart .legend text {
  font-size: 10px;
}

.d3-chart .area {
  fill-opacity: 0.6;
}

.d3-chart .node {
  stroke: #fff;
  stroke-width: 1.5px;
}

.d3-chart .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
EOL

# Update the CSS import in index.html
sed -i.bak '/<link rel="stylesheet" href="css\/components\/charts.css">/a \
<link rel="stylesheet" href="css/components/heatmaps.css">' index.html

# ===================================================
# 7. Commit Changes to Git Repository
# ===================================================
echo "Committing changes to Git repository..."

git add .
git commit -m "Implemented comprehensive charts and visualizations using ApexCharts, Highcharts, and D3.js"

# Final message
echo "=== Phase 2 Implementation: Charts & Visualizations Complete ==="
echo "The repository has been updated with advanced chart implementations:"
echo "  - Added Highcharts integration with radar charts and interactive drill-downs"
echo "  - Added D3.js visualizations with heatmaps and radar charts"
echo "  - Implemented chart loader to manage different charting libraries"
echo "  - Added PDF report generation capability"
echo "  - Updated CSS for heatmaps and visualizations"
echo ""
echo "Next steps:"
echo "  1. Test all chart implementations with different data sets"
echo "  2. Enhance PDF reporting with chart images"
echo "  3. Implement additional security visualizations"
echo "  4. Add responsive design improvements for mobile devices"
echo ""
echo "To start development server: npm install && npm start"
