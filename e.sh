#!/bin/bash

# Color codes for better readability
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Portnox Total Cost Analyzer - Direct Fix Script${NC}"
echo -e "${YELLOW}This script will directly modify files in your current directory${NC}"

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -d "js" ] || [ ! -d "css" ]; then
  echo -e "${RED}Error: This doesn't appear to be the Portnox project directory.${NC}"
  echo -e "${RED}Please run this script from the directory containing index.html, js/ and css/ folders.${NC}"
  exit 1
fi

echo -e "${GREEN}Project directory verified, proceeding with fixes...${NC}"

# Create directories if they don't exist
mkdir -p js/charts/apex
mkdir -p js/charts/d3
mkdir -p js/models
mkdir -p js/fixes
mkdir -p css/custom

# Create app-integration.js
echo -e "${BLUE}Creating js/app-integration.js...${NC}"
cat > js/app-integration.js << 'EOF'
/**
 * Enhanced Application Integration for Portnox Total Cost Analyzer
 * Provides proper initialization and integration between components
 */

console.log("Initializing Portnox Total Cost Analyzer with enhanced components...");

document.addEventListener('DOMContentLoaded', function() {
  // Ensure vendor data is loaded before initializing views
  window.addEventListener('vendorDataLoaded', function() {
    // Initialize all the views
    if (window.executiveView && !window.executiveView.initialized) {
      window.executiveView.init();
    }
    
    if (window.securityView && !window.securityView.initialized) {
      window.securityView.init();
    }
    
    // Setup global calculation function
    window.updateAllViews = function(data) {
      if (window.executiveView && window.executiveView.initialized) {
        window.executiveView.update(data);
      }
      
      if (window.securityView && window.securityView.initialized) {
        window.securityView.update(data);
      }
    };
    
    console.log("Portnox Total Cost Analyzer initialized successfully.");
  });
  
  // Trigger vendor data load if it hasn't happened already
  if (window.VENDORS) {
    window.dispatchEvent(new Event('vendorDataLoaded'));
  } else {
    console.error("VENDORS data not available. Loading vendor-data.js...");
    const script = document.createElement('script');
    script.src = 'js/models/vendor-data.js';
    script.onload = function() {
      window.dispatchEvent(new Event('vendorDataLoaded'));
    };
    document.head.appendChild(script);
  }
});
EOF
echo -e "${GREEN}Created js/app-integration.js${NC}"

# Create chart-config.js
echo -e "${BLUE}Creating js/charts/chart-config.js...${NC}"
cat > js/charts/chart-config.js << 'EOF'
/**
 * Chart Configuration for Portnox Total Cost Analyzer
 * Provides centralized configuration for all charts
 */

const ChartConfig = {
  colors: {
    primary: '#1a5a96',
    secondary: '#0d4275',
    highlight: '#27ae60',
    warning: '#e74c3c',
    neutral: '#3498db',
    chart: [
      '#1a5a96', // Portnox Blue
      '#e74c3c', // Cisco Red
      '#e67e22', // Aruba Orange
      '#f39c12', // Forescout Amber
      '#2ecc71', // FortiNAC Green
      '#3498db', // Juniper Blue
      '#9b59b6', // SecureW2 Purple
      '#34495e', // Microsoft Navy
      '#16a085', // Arista Teal
      '#27ae60'  // Foxpass Green
    ]
  },
  
  fonts: {
    family: '"Nunito", sans-serif',
    sizes: {
      title: '18px',
      subtitle: '14px',
      axis: '12px',
      tooltip: '12px'
    }
  },
  
  defaultOptions: {
    animation: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    }
  },
  
  // Get colors for vendor IDs
  getVendorColor: function(vendorId, opacity = 1) {
    // Map vendor IDs to color indexes
    const vendorColorMap = {
      'portnox': 0,
      'cisco': 1,
      'aruba': 2,
      'forescout': 3,
      'fortinac': 4,
      'juniper': 5,
      'securew2': 6,
      'microsoft': 7,
      'arista': 8,
      'foxpass': 9
    };
    
    const colorIndex = vendorColorMap[vendorId] !== undefined ? vendorColorMap[vendorId] : 0;
    const color = this.colors.chart[colorIndex];
    
    // If opacity is not 1, convert to rgba
    if (opacity < 1) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  },
  
  // Format currency values
  formatCurrency: function(value) {
    return '$' + value.toLocaleString();
  },
  
  // Format percentage values
  formatPercentage: function(value) {
    return value + '%';
  }
};

// Make it globally available
window.ChartConfig = ChartConfig;
EOF
echo -e "${GREEN}Created js/charts/chart-config.js${NC}"

# Create security-charts.js
echo -e "${BLUE}Creating js/charts/security-charts.js...${NC}"
cat > js/charts/security-charts.js << 'EOF'
/**
 * Security Charts for Portnox Total Cost Analyzer
 * Renders security-specific visualizations
 */

const SecurityCharts = {
  renderNistFrameworkChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use default data if none provided
    if (!data) {
      data = {
        portnox: {
          identify: 95,
          protect: 90,
          detect: 95,
          respond: 92,
          recover: 88
        },
        competitors: {
          identify: 75,
          protect: 72,
          detect: 70,
          respond: 68,
          recover: 65
        }
      };
    }
    
    const options = {
      series: [
        {
          name: 'Portnox Cloud',
          data: [
            data.portnox.identify,
            data.portnox.protect,
            data.portnox.detect,
            data.portnox.respond,
            data.portnox.recover
          ]
        },
        {
          name: 'Industry Average',
          data: [
            data.competitors.identify,
            data.competitors.protect,
            data.competitors.detect,
            data.competitors.respond,
            data.competitors.recover
          ]
        }
      ],
      chart: {
        type: 'radar',
        height: 350,
        fontFamily: '"Nunito", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      colors: ['#1a5a96', '#e74c3c'],
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.2
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      title: {
        text: 'NIST Cybersecurity Framework Coverage',
        style: {
          fontSize: '18px',
          fontWeight: 600
        },
        offsetY: 10
      },
      xaxis: {
        categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        max: 100,
        min: 0,
        show: false
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + '%';
          }
        }
      }
    };
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  renderBreachImpactChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use default data if none provided
    if (!data) {
      data = {
        categories: ['No NAC Solution', 'Traditional NAC', 'Portnox Cloud'],
        avgBreachCost: [4350000, 1525000, 650000],
        avgResponseTime: [280, 72, 15]
      };
    }
    
    const options = {
      series: [
        {
          name: 'Average Data Breach Cost',
          type: 'column',
          data: data.avgBreachCost
        },
        {
          name: 'Avg. Response Time (Hours)',
          type: 'line',
          data: data.avgResponseTime
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        fontFamily: '"Nunito", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          borderRadius: 5
        }
      },
      fill: {
        opacity: [0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: [
        {
          title: {
            text: 'Breach Cost ($)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return '$' + Math.round(val / 1000000) + 'M';
            }
          }
        },
        {
          opposite: true,
          title: {
            text: 'Response Time (Hours)',
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          },
          labels: {
            formatter: function(val) {
              return Math.round(val) + ' hrs';
            }
          }
        }
      ],
      colors: ['#e74c3c', '#1a5a96'],
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      annotations: {
        points: [
          {
            x: 'Portnox Cloud',
            y: 650000,
            marker: {
              size: 6,
              fillColor: '#27ae60',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Lowest Breach Cost',
              borderColor: '#27ae60',
              style: {
                background: '#27ae60',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: -30
            }
          },
          {
            x: 'Portnox Cloud',
            y: 15,
            seriesIndex: 1,
            marker: {
              size: 6,
              fillColor: '#27ae60',
              strokeColor: '#fff',
              strokeWidth: 2
            },
            label: {
              text: 'Fastest Response',
              borderColor: '#27ae60',
              style: {
                background: '#27ae60',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600
              },
              offsetY: 15
            }
          }
        ]
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: [{
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return "$" + y.toLocaleString();
            }
            return y;
          }
        }, {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " hours";
            }
            return y;
          }
        }]
      }
    };
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  initializeCharts: function() {
    this.renderNistFrameworkChart('nist-framework-chart');
    this.renderBreachImpactChart('breach-impact-chart');
  }
};

// Make it globally available
window.SecurityCharts = SecurityCharts;
EOF
echo -e "${GREEN}Created js/charts/security-charts.js${NC}"

# Create apex-charts.js
echo -e "${BLUE}Creating js/charts/apex/apex-charts.js...${NC}"
cat > js/charts/apex/apex-charts.js << 'EOF'
/**
 * ApexCharts Integration for Portnox Total Cost Analyzer
 * Provides chart rendering functions for the application
 */

const ApexChartsManager = {
  renderTcoComparisonChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use data from calculation if available, otherwise use demo data
    if (!data) {
      data = this.getDemoData();
    }
    
    // Extract data for chart
    const vendors = Object.keys(data);
    const tcoValues = vendors.map(id => data[id].tco);
    const vendorNames = vendors.map(id => data[id].name);
    
    const options = {
      series: [{
        name: '3-Year TCO',
        data: tcoValues
      }],
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: '"Nunito", sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val).toLocaleString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: vendorNames,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      fill: {
        opacity: 1,
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 100]
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60'],
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      },
      annotations: {
        points: [{
          x: vendorNames[0],
          y: tcoValues[0],
          marker: {
            size: 6,
            fillColor: '#27ae60',
            strokeColor: '#fff',
            strokeWidth: 2
          },
          label: {
            text: 'Best Value',
            borderColor: '#27ae60',
            style: {
              background: '#27ae60',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600
            },
            offsetY: -15
          }
        }]
      }
    };

    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  renderCumulativeCostChart: function(containerId, data) {
    if (!window.ApexCharts) {
      console.error("ApexCharts library not available");
      return;
    }
    
    const element = document.getElementById(containerId);
    if (!element) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use data from calculation if available, otherwise use demo data
    if (!data) {
      data = this.getDemoData();
    }
    
    // Sample data for cumulative costs over 3 years
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    
    // Generate cumulative costs for vendors
    const seriesData = [];
    
    // Take only first 4 vendors for clarity
    const vendors = Object.keys(data).slice(0, 4);
    
    vendors.forEach(vendorId => {
      const vendor = data[vendorId];
      
      // Calculate initial cost (implementation + hardware)
      const initialCost = vendor.implementationCost + (vendor.hardware || 0);
      
      // Calculate annual cost (subscription/maintenance + personnel)
      const annualCost = (vendor.subscription || 0) + (vendor.maintenance || 0) + vendor.personnel;
      
      // Generate cumulative costs
      const costs = [
        initialCost,
        initialCost + annualCost,
        initialCost + (annualCost * 2),
        initialCost + (annualCost * 3)
      ];
      
      seriesData.push({
        name: vendor.name,
        data: costs
      });
    });
    
    const options = {
      series: seriesData,
      chart: {
        height: 350,
        type: 'line',
        fontFamily: '"Nunito", sans-serif',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: ['#1a5a96', '#e74c3c', '#e67e22', '#f39c12'],
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return '$' + Math.round(val / 1000) + 'K';
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      xaxis: {
        categories: years,
        title: {
          text: 'Timeline',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cumulative Cost ($)',
          style: {
            fontSize: '14px',
            fontWeight: 500
          }
        },
        labels: {
          formatter: function(val) {
            return '$' + Math.round(val).toLocaleString();
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return '$' + val.toLocaleString();
          }
        }
      }
    };
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(element, options);
    chart.render();
  },
  
  getDemoData: function() {
    // This is only used if real vendor data is not available
    return {
      'portnox': {
        name: 'Portnox Cloud',
        tco: 245000,
        implementationCost: 15000,
        hardware: 0,
        maintenance: 12500,
        subscription: 172000,
        personnel: 25000
      },
      'cisco': {
        name: 'Cisco ISE',
        tco: 520000,
        implementationCost: 85000,
        hardware: 130000,
        maintenance: 98000,
        subscription: 0,
        personnel: 200000
      },
      'aruba': {
        name: 'Aruba ClearPass',
        tco: 480000,
        implementationCost: 65000,
        hardware: 110000,
        maintenance: 85000,
        subscription: 0,
        personnel: 175000
      },
      'forescout': {
        name: 'Forescout',
        tco: 430000,
        implementationCost: 75000,
        hardware: 100000,
        maintenance: 75000,
        subscription: 0,
        personnel: 150000
      }
    };
  },
  
  initializeCharts: function() {
    this.renderTcoComparisonChart('tco-comparison-chart');
    this.renderCumulativeCostChart('cumulative-cost-chart');
  }
};

// Make it globally available
window.ApexChartsManager = ApexChartsManager;
EOF
echo -e "${GREEN}Created js/charts/apex/apex-charts.js${NC}"

# Create d3-manager.js
echo -e "${BLUE}Creating js/charts/d3/d3-manager.js...${NC}"
cat > js/charts/d3/d3-manager.js << 'EOF'
/**
 * D3 Charts Manager for Portnox Total Cost Analyzer
 * Provides advanced visualizations using D3.js
 */

const D3ChartsManager = {
  renderSecurityFrameworksChart: function(containerId, data) {
    if (!window.d3) {
      console.error("D3.js library not available");
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element ${containerId} not found`);
      return;
    }
    
    // Use default data if none provided
    if (!data) {
      data = {
        frameworks: [
          { id: 'hipaa', name: 'HIPAA', portnoxCoverage: 95, industryAverage: 72 },
          { id: 'pci', name: 'PCI DSS', portnoxCoverage: 92, industryAverage: 68 },
          { id: 'nist', name: 'NIST CSF', portnoxCoverage: 94, industryAverage: 70 },
          { id: 'gdpr', name: 'GDPR', portnoxCoverage: 90, industryAverage: 65 },
          { id: 'iso27001', name: 'ISO 27001', portnoxCoverage: 93, industryAverage: 69 }
        ]
      };
    }
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Set up dimensions and margins
    const margin = {top: 30, right: 120, bottom: 70, left: 80},
          width = container.clientWidth - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(`#${containerId}`)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.frameworks.map(d => d.name))
      .padding(0.2);
    
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px");
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Coverage (%)");
    
    // Portnox bars
    svg.selectAll("portnoxBars")
      .data(data.frameworks)
      .enter()
      .append("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.portnoxCoverage))
        .attr("width", x.bandwidth()/2)
        .attr("height", d => height - y(d.portnoxCoverage))
        .attr("fill", "#1a5a96")
        .attr("rx", 4)
        .attr("ry", 4);
    
    // Industry average bars
    svg.selectAll("industryBars")
      .data(data.frameworks)
      .enter()
      .append("rect")
        .attr("x", d => x(d.name) + x.bandwidth()/2)
        .attr("y", d => y(d.industryAverage))
        .attr("width", x.bandwidth()/2)
        .attr("height", d => height - y(d.industryAverage))
        .attr("fill", "#e74c3c")
        .attr("rx", 4)
        .attr("ry", 4);
    
    // Add labels to the bars
    svg.selectAll(".portnoxLabel")
      .data(data.frameworks)
      .enter()
      .append("text")
        .attr("class", "portnoxLabel")
        .attr("x", d => x(d.name) + x.bandwidth()/4)
        .attr("y", d => y(d.portnoxCoverage) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .text(d => `${d.portnoxCoverage}%`);
    
    svg.selectAll(".industryLabel")
      .data(data.frameworks)
      .enter()
      .append("text")
        .attr("class", "industryLabel")
        .attr("x", d => x(d.name) + 3*x.bandwidth()/4)
        .attr("y", d => y(d.industryAverage) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .text(d => `${d.industryAverage}%`);
    
    // Add Legend
    const legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(["Portnox Cloud", "Industry Average"])
      .enter().append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
      .attr("x", width + 20)
      .attr("width", 19)
      .attr("height", 19)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", (d, i) => i === 0 ? "#1a5a96" : "#e74c3c");

    legend.append("text")
      .attr("x", width + 15)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(d => d);
  },
  
  initializeCharts: function() {
    this.renderSecurityFrameworksChart('security-frameworks-chart');
  }
};

// Make it globally available
window.D3ChartsManager = D3ChartsManager;
EOF
echo -e "${GREEN}Created js/charts/d3/d3-manager.js${NC}"

# Create models/vendors-data-fix.js
echo -e "${BLUE}Creating js/models/vendors-data-fix.js...${NC}"
cat > js/models/vendors-data-fix.js << 'EOF'
/**
 * Vendor Data Fix for Portnox Total Cost Analyzer
 * Ensures vendor data is available and properly structured
 */

console.log("Applying vendor data fix...");

// Create the VENDORS object if it doesn't exist
if (!window.VENDORS) {
  console.log("Creating VENDORS data structure...");
  
  window.VENDORS = {
    'portnox': {
      name: 'Portnox Cloud',
      logo: 'img/vendors/portnox-logo.png',
      architecture: 'cloud',
      tco: 245000,
      implementationTime: 21,
      implementationCost: 15000,
      fte: 0.25,
      hardware: 0,
      maintenance: 12500,
      subscription: 172000,
      personnel: 25000,
      paybackPeriod: 7,
      roi: 325,
      securityScore: 92,
      complianceScore: 95,
      zeroTrustScore: 95,
      breachReduction: 85,
      automationLevel: 90
    },
    'cisco': {
      name: 'Cisco ISE',
      logo: 'img/vendors/cisco-logo.png',
      architecture: 'on-premises',
      tco: 520000,
      implementationTime: 90,
      implementationCost: 85000,
      fte: 2.0,
      hardware: 130000,
      maintenance: 98000,
      subscription: 0,
      personnel: 200000,
      paybackPeriod: 32,
      roi: -8,
      securityScore: 85,
      complianceScore: 90,
      zeroTrustScore: 75,
      breachReduction: 70,
      automationLevel: 60
    },
    'aruba': {
      name: 'Aruba ClearPass',
      logo: 'img/vendors/aruba-logo.png',
      architecture: 'on-premises',
      tco: 480000,
      implementationTime: 75,
      implementationCost: 65000,
      fte: 1.75,
      hardware: 110000,
      maintenance: 85000,
      subscription: 0,
      personnel: 175000,
      paybackPeriod: 28,
      roi: 5,
      securityScore: 82,
      complianceScore: 88,
      zeroTrustScore: 70,
      breachReduction: 72,
      automationLevel: 65
    },
    'forescout': {
      name: 'Forescout',
      logo: 'img/vendors/forescout-logo.png',
      architecture: 'on-premises',
      tco: 430000,
      implementationTime: 60,
      implementationCost: 75000,
      fte: 1.5,
      hardware: 100000,
      maintenance: 75000,
      subscription: 0,
      personnel: 150000,
      paybackPeriod: 25,
      roi: 12,
      securityScore: 80,
      complianceScore: 85,
      zeroTrustScore: 72,
      breachReduction: 68,
      automationLevel: 70
    },
    'fortinac': {
      name: 'FortiNAC',
      logo: 'img/vendors/fortinac-logo.png',
      architecture: 'on-premises',
      tco: 400000,
      implementationTime: 60,
      implementationCost: 60000,
      fte: 1.25,
      hardware: 90000,
      maintenance: 70000,
      subscription: 0,
      personnel: 125000,
      paybackPeriod: 22,
      roi: 15,
      securityScore: 75,
      complianceScore: 80,
      zeroTrustScore: 65,
      breachReduction: 65,
      automationLevel: 60
    },
    'juniper': {
      name: 'Juniper Mist',
      logo: 'img/vendors/juniper-logo.png',
      architecture: 'hybrid',
      tco: 350000,
      implementationTime: 45,
      implementationCost: 50000,
      fte: 1.0,
      hardware: 60000,
      maintenance: 50000,
      subscription: 100000,
      personnel: 100000,
      paybackPeriod: 18,
      roi: 40,
      securityScore: 78,
      complianceScore: 82,
      zeroTrustScore: 80,
      breachReduction: 70,
      automationLevel: 75
    },
    'securew2': {
      name: 'SecureW2',
      logo: 'img/vendors/securew2-logo.png',
      architecture: 'cloud',
      tco: 280000,
      implementationTime: 30,
      implementationCost: 25000,
      fte: 0.5,
      hardware: 0,
      maintenance: 15000,
      subscription: 190000,
      personnel: 50000,
      paybackPeriod: 12,
      roi: 180,
      securityScore: 72,
      complianceScore: 70,
      zeroTrustScore: 85,
      breachReduction: 60,
      automationLevel: 80
    },
    'microsoft': {
      name: 'Microsoft NPS',
      logo: 'img/vendors/microsoft-logo.png',
      architecture: 'on-premises',
      tco: 290000,
      implementationTime: 30,
      implementationCost: 20000,
      fte: 1.0,
      hardware: 30000,
      maintenance: 40000,
      subscription: 0,
      personnel: 100000,
      paybackPeriod: 20,
      roi: 25,
      securityScore: 60,
      complianceScore: 65,
      zeroTrustScore: 50,
      breachReduction: 45,
      automationLevel: 40
    },
    'arista': {
      name: 'Arista CloudVision',
      logo: 'img/vendors/arista-logo.png',
      architecture: 'hybrid',
      tco: 320000,
      implementationTime: 45,
      implementationCost: 45000,
      fte: 1.0,
      hardware: 50000,
      maintenance: 55000,
      subscription: 70000,
      personnel: 100000,
      paybackPeriod: 15,
      roi: 35,
      securityScore: 70,
      complianceScore: 75,
      zeroTrustScore: 65,
      breachReduction: 60,
      automationLevel: 65
    },
    'foxpass': {
      name: 'Foxpass',
      logo: 'img/vendors/foxpass-logo.png',
      architecture: 'cloud',
      tco: 270000,
      implementationTime: 25,
      implementationCost: 20000,
      fte: 0.5,
      hardware: 0,
      maintenance: 10000,
      subscription: 180000,
      personnel: 50000,
      paybackPeriod: 10,
      roi: 160,
      securityScore: 65,
      complianceScore: 60,
      zeroTrustScore: 70,
      breachReduction: 55,
      automationLevel: 75
    }
  };
  
  // Trigger the vendorDataLoaded event
  window.dispatchEvent(new Event('vendorDataLoaded'));
  
  console.log("VENDORS data structure created and event fired");
}

console.log("Vendor data fix applied");
EOF
echo -e "${GREEN}Created js/models/vendors-data-fix.js${NC}"

# Create enhanced-styles.css file with improved color scheme
echo -e "${BLUE}Creating css/custom/enhanced-styles.css...${NC}"
cat > css/custom/enhanced-styles.css << 'EOF'
/**
 * Enhanced Styles for Portnox Total Cost Analyzer
 * Improves visibility of headers, banners, and overall UI
 */

:root {
  --primary-color: #1a5a96;
  --primary-dark-color: #0d4275;
  --primary-light-color: #4287c8;
  --secondary-color: #27ae60;
  --warning-color: #e74c3c;
  --neutral-color: #3498db;
  --background-color: #f8fafc;
  --card-background: #ffffff;
  --text-color: #333333;
  --text-light-color: #666666;
  --header-text-color: #ffffff;
  --border-color: #e1e8ed;
  --highlight-background: rgba(26, 90, 150, 0.08);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Body and Global Styles */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Nunito', sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* Enhanced Header Styles */
.app-header, .enhanced-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color)) !important;
  color: var(--header-text-color) !important;
  border-bottom: none !important;
  box-shadow: var(--shadow-lg) !important;
  position: relative !important;
  z-index: 100 !important;
  padding: 1rem 2rem !important;
}

.enhanced-header .header-content {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  margin-right: 1.5rem;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2));
}

.app-title h1 {
  color: var(--header-text-color) !important;
  font-size: 1.8rem !important;
  margin: 0 !important;
  font-weight: 600 !important;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.app-title .subtitle {
  color: rgba(255, 255, 255, 0.9) !important;
  margin: 0 !important;
  font-size: 1rem !important;
}

/* Improved Sidebar Styles */
.sidebar {
  background-color: var(--card-background) !important;
  border-right: 1px solid var(--border-color) !important;
  box-shadow: var(--shadow-sm) !important;
  overflow-y: auto !important;
  transition: all 0.3s ease !important;
}

.sidebar-header {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark-color)) !important;
  color: var(--header-text-color) !important;
  padding: 1rem !important;
  border-bottom: 1px solid var(--border-color) !important;
}

.sidebar-header h2 {
  margin: 0 !important;
  font-size: 1.3rem !important;
  font-weight: 600 !important;
  color: white !important;
}

.config-card {
  background-color: var(--card-background) !important;
  border-radius: var(--radius-md) !important;
  box-shadow: var(--shadow-sm) !important;
  margin-bottom: 1rem !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
}

.config-card:hover {
  box-shadow: var(--shadow-md) !important;
}

.config-card-header {
  background-color: var(--primary-light-color) !important;
  color: var(--header-text-color) !important;
  padding: 0.75rem 1rem !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-bottom: 1px solid var(--border-color) !important;
}

.config-card-header h3 {
  margin: 0 !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: white !important;
}

.config-card-content {
  padding: 1rem !important;
}

/* Enhanced Content Area Styles */
.content-area {
  background-color: var(--background-color) !important;
  padding: 1.5rem !important;
  overflow-y: auto !important;
  flex: 1 !important;
}

.content-wrapper {
  max-width: 1400px !important;
  margin: 0 auto !important;
}

/* Improved Panel Styles */
.panel-header {
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark-color)) !important;
  color: var(--header-text-color) !important;
  padding: 1.5rem !important;
  border-radius: var(--radius-md) var(--radius-md) 0 0 !important;
  margin-bottom: 1.5rem !important;
  box-shadow: var(--shadow-sm) !important;
}

.panel-header h2 {
  margin: 0 0 0.5rem 0 !important;
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  color: white !important;
}

.panel-header .subtitle {
  margin: 0 !important;
  opacity: 0.9 !important;
  font-size: 1rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
  gap: 1.5rem !important;
  margin-bottom: 2rem !important;
}

.dashboard-card {
  background-color: var(--card-background) !important;
  border-radius: var(--radius-md) !important;
  box-shadow: var(--shadow-sm) !important;
  padding: 1.5rem !important;
  transition: all 0.3s ease !important;
}

.dashboard-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: var(--shadow-md) !important;
}

.dashboard-card h3 {
  margin: 0 0 1rem 0 !important;
  font-size: 1.1rem !important;
  color: var(--text-light-color) !important;
  font-weight: 600 !important;
}

.metric-value {
  font-size: 2rem !important;
  font-weight: 700 !important;
  margin-bottom: 0.5rem !important;
  color: var(--primary-color) !important;
}

.highlight-card {
  background: linear-gradient(135deg, var(--primary-light-color), var(--primary-color)) !important;
  color: var(--header-text-color) !important;
}

.highlight-card h3,
.highlight-card .metric-label,
.highlight-card .metric-trend {
  color: rgba(255, 255, 255, 0.9) !important;
}

.highlight-value {
  color: var(--header-text-color) !important;
}

.metric-label {
  font-size: 0.9rem !important;
  color: var(--text-light-color) !important;
  margin-bottom: 0.5rem !important;
}

.metric-trend {
  font-size: 0.85rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}

.metric-trend.up {
  color: var(--secondary-color) !important;
}

.metric-trend.down {
  color: var(--warning-color) !important;
}

/* Chart Containers */
.chart-container {
  background-color: var(--card-background) !important;
  border-radius: var(--radius-md) !important;
  box-shadow: var(--shadow-sm) !important;
  padding: 1.5rem !important;
  margin-bottom: 2rem !important;
}

.chart-container h3 {
  margin: 0 0 1.5rem 0 !important;
  font-size: 1.2rem !important;
  font-weight: 600 !important;
  color: var(--text-color) !important;
}

.chart-wrapper {
  width: 100% !important;
  height: 350px !important;
}

/* Benefit Cards */
.benefits-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
  gap: 1.5rem !important;
}

.benefit-card {
  background-color: var(--card-background) !important;
  border-radius: var(--radius-md) !important;
  box-shadow: var(--shadow-sm) !important;
  padding: 1.5rem !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  flex-direction: column !important;
}

.benefit-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: var(--shadow-md) !important;
}

.benefit-icon {
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color)) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 1rem !important;
  color: var(--header-text-color) !important;
  font-size: 1.5rem !important;
}

.benefit-card h4 {
  margin: 0 0 0.75rem 0 !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: var(--text-color) !important;
}

.benefit-card p {
  margin: 0 !important;
  font-size: 0.95rem !important;
  color: var(--text-light-color) !important;
  line-height: 1.5 !important;
}

/* Tabs Styling */
.results-tabs {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.5rem !important;
  margin-bottom: 1.5rem !important;
  border-bottom: 2px solid var(--border-color) !important;
  padding-bottom: 0.5rem !important;
}

.results-tab {
  background-color: transparent !important;
  border: none !important;
  padding: 0.75rem 1.25rem !important;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0 !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: var(--text-light-color) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.results-tab:hover {
  color: var(--primary-color) !important;
  background-color: rgba(26, 90, 150, 0.05) !important;
}

.results-tab.active {
  color: var(--primary-color) !important;
  border-bottom: 3px solid var(--primary-color) !important;
  margin-bottom: -2px !important;
}

/* Footer Styling */
.app-footer {
  background-color: var(--primary-dark-color) !important;
  color: var(--header-text-color) !important;
  padding: 1.5rem !important;
  text-align: center !important;
}

.footer-content {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 1rem !important;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none !important;
  margin: 0 0.5rem !important;
  transition: color 0.2s ease !important;
}

.footer-links a:hover {
  color: var(--header-text-color) !important;
  text-decoration: underline !important;
}

/* Button Styling */
.btn {
  padding: 0.5rem 1rem !important;
  border-radius: var(--radius-sm) !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
}

.btn-primary {
  background-color: var(--primary-color) !important;
  color: var(--header-text-color) !important;
  border: none !important;
}

.btn-primary:hover {
  background-color: var(--primary-dark-color) !important;
  transform: translateY(-2px) !important;
  box-shadow: var(--shadow-sm) !important;
}

.btn-outline {
  background-color: transparent !important;
  color: var(--primary-color) !important;
  border: 1px solid var(--primary-color) !important;
}

.btn-outline:hover {
  background-color: rgba(26, 90, 150, 0.1) !important;
  transform: translateY(-2px) !important;
}

.btn-calculate {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark-color)) !important;
  color: var(--header-text-color) !important;
  border: none !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: var(--radius-md) !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  width: 100% !important;
}

.btn-calculate:hover {
  transform: translateY(-2px) !important;
  box-shadow: var(--shadow-md) !important;
}

/* Fix vendor cards in sidebar */
.vendor-select-card {
  height: 80px !important;
  padding: 8px 4px !important;
}

.vendor-select-card .vendor-logo img {
  max-height: 28px !important;
  max-width: 80px !important;
  object-fit: contain !important;
}

.vendor-select-card .vendor-name {
  font-size: 11px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 95% !important;
  text-align: center !important;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr !important;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr !important;
  }
  
  .sidebar {
    width: 100% !important;
    position: fixed !important;
    top: 60px !important;
    left: 0 !important;
    bottom: 0 !important;
    z-index: 90 !important;
    transform: translateX(-100%) !important;
  }
  
  .sidebar.active {
    transform: translateX(0) !important;
  }
  
  .header-content {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1rem !important;
  }
  
  .header-actions {
    width: 100% !important;
    justify-content: space-between !important;
  }
}

/* Dark Mode Support */
.dark-mode {
  --background-color: #1a1a2e !important;
  --card-background: #282846 !important;
  --text-color: #e1e1e1 !important;
  --text-light-color: #b3b3b3 !important;
  --border-color: #3a3a5c !important;
  --highlight-background: rgba(26, 90, 150, 0.15) !important;
}

.dark-mode .app-header,
.dark-mode .enhanced-header {
  background: linear-gradient(135deg, #0d4275, #051e38) !important;
}

.dark-mode .config-card-header {
  background-color: #0d4275 !important;
}

.dark-mode .panel-header {
  background: linear-gradient(to right, #0d4275, #051e38) !important;
}

.dark-mode .benefit-icon {
  background: linear-gradient(135deg, #0d4275, #051e38) !important;
}

.dark-mode .benefit-card,
.dark-mode .dashboard-card,
.dark-mode .chart-container {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
}

.dark-mode .highlight-card {
  background: linear-gradient(135deg, #0d4275, #051e38) !important;
}
EOF
echo -e "${GREEN}Created css/custom/enhanced-styles.css${NC}"

# Create security-specific CSS improvements
echo -e "${BLUE}Creating css/security-view.css...${NC}"
cat > css/security-view.css << 'EOF'
/* Specialized styles for Security & Compliance View */

.security-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.security-metric-card {
  background-color: var(--card-background, #ffffff);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.security-metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.security-metric-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--text-light-color, #666666);
  font-weight: 600;
}

.security-metric-value {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-color, #1a5a96);
}

.security-highlight-card {
  background: linear-gradient(135deg, #1a5a96, #0d4275);
  color: white;
}

.security-highlight-card h3,
.security-highlight-card .security-metric-label,
.security-highlight-card .security-metric-trend {
  color: rgba(255, 255, 255, 0.9);
}

.security-highlight-value {
  color: white;
}

.security-metric-label {
  font-size: 0.9rem;
  color: var(--text-light-color, #666666);
  margin-bottom: 0.5rem;
}

.compliance-badge {
  display: inline-flex;
  align-items: center;
  background-color: var(--card-background, #ffffff);
  border: 1px solid var(--border-color, #e1e8ed);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.compliance-badge:hover {
  background-color: rgba(26, 90, 150, 0.08);
  border-color: var(--primary-color, #1a5a96);
}

.compliance-badge.active {
  background-color: var(--primary-color, #1a5a96);
  color: white;
  border-color: var(--primary-color, #1a5a96);
}

.compliance-badge i {
  margin-right: 0.5rem;
}

.compliance-selector {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.threat-card {
  background-color: var(--card-background, #ffffff);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.threat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.threat-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.threat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-size: 1.5rem;
}

.threat-title h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.threat-title span {
  font-size: 0.85rem;
  color: var(--text-light-color, #666666);
}

.threat-impact {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.impact-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.impact-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color, #1a5a96);
  margin-bottom: 0.25rem;
}

.impact-label {
  font-size: 0.8rem;
  color: var(--text-light-color, #666666);
}

.protection-bar {
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.protection-progress {
  height: 100%;
  background: linear-gradient(to right, #1a5a96, #2ecc71);
  border-radius: 4px;
}

.protection-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-light-color, #666666);
}

.security-tabs-content {
  background-color: var(--card-background, #ffffff);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-top: 1rem;
}

.industry-selector {
  text-align: center;
  margin-bottom: 2rem;
}

.industry-selector select {
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid var(--border-color, #e1e8ed);
  background-color: var(--card-background, #ffffff);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color, #333333);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 250px;
  text-align: center;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.industry-selector select:hover {
  border-color: var(--primary-color, #1a5a96);
}

.industry-selector select:focus {
  outline: none;
  border-color: var(--primary-color, #1a5a96);
  box-shadow: 0 0 0 3px rgba(26, 90, 150, 0.25);
}

.dark-mode .security-metric-card {
  background-color: var(--card-background, #282846);
}

.dark-mode .compliance-badge {
  background-color: var(--card-background, #282846);
  border-color: var(--border-color, #3a3a5c);
}

.dark-mode .threat-card {
  background-color: var(--card-background, #282846);
}

.dark-mode .protection-bar {
  background-color: #2c3e50;
}

.dark-mode .industry-selector select {
  background-color: var(--card-background, #282846);
  border-color: var(--border-color, #3a3a5c);
  color: var(--text-color, #e1e1e1);
}
EOF
echo -e "${GREEN}Created css/security-view.css${NC}"

# Create comprehensive-fix.js
echo -e "${BLUE}Creating js/comprehensive-fix.js...${NC}"
cat > js/comprehensive-fix.js << 'EOF'
/**
 * Comprehensive Fix for Portnox Total Cost Analyzer
 * Addresses all critical issues in one script
 */

console.log("Applying comprehensive fix...");

// Functions to ensure proper loading of dependencies
function ensureScript(src, callback) {
  if (document.querySelector(`script[src="${src}"]`)) {
    if (callback) callback();
    return;
  }
  
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function ensureStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Ensure vendor data is available
function ensureVendorData() {
  if (!window.VENDORS) {
    console.error("VENDORS data not defined, application may not function correctly");
    ensureScript('js/models/vendors-data-fix.js');
  }
}

// Fix sidebar toggle functionality
function fixSidebarToggles() {
  const sidebarToggleButtons = document.querySelectorAll(".sidebar-toggle, #sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.querySelector(".content-area");
  
  if (sidebar && contentArea) {
    sidebarToggleButtons.forEach(function(sidebarToggle) {
      if (sidebarToggle) {
        // Remove existing event listeners by cloning and replacing
        const newToggle = sidebarToggle.cloneNode(true);
        sidebarToggle.parentNode.replaceChild(newToggle, sidebarToggle);
        
        newToggle.addEventListener("click", function(e) {
          e.preventDefault();
          sidebar.classList.toggle("collapsed");
          newToggle.classList.toggle("collapsed");
          contentArea.classList.toggle("expanded");
        });
      }
    });
  }
  
  console.log("Sidebar toggles fixed");
}

// Fix tab navigation
function fixTabNavigation() {
  // Fix results tabs navigation
  const allResultsTabs = document.querySelectorAll('.results-tabs .results-tab');
  
  allResultsTabs.forEach(tab => {
    // Remove existing event listeners by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    newTab.addEventListener('click', function() {
      const panelId = newTab.getAttribute('data-panel');
      const tabsContainer = newTab.closest('.results-tabs');
      
      if (!panelId || !tabsContainer) return;
      
      // Remove active class from all tabs in this container
      tabsContainer.querySelectorAll('.results-tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      newTab.classList.add('active');
      
      // Hide all panels in this view
      const viewPanel = tabsContainer.closest('.view-panel, .results-panel');
      if (viewPanel) {
        viewPanel.querySelectorAll('.results-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        // Show the corresponding panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          // If there's a chart refresh function available, call it
          if (window.executiveView && window.executiveView.refreshChartsInPanel) {
            window.executiveView.refreshChartsInPanel(panelId);
          }
          
          if (window.securityView && window.securityView.refreshChartsInPanel) {
            window.securityView.refreshChartsInPanel(panelId);
          }
        }
      }
    });
  });
  
  console.log("Tab navigation fixed");
}

// Fix vendor selection functionality
function fixVendorSelection() {
  const vendorCards = document.querySelectorAll('.vendor-select-card');
  
  vendorCards.forEach(card => {
    // Make sure the card has proper styling
    card.style.height = "80px";
    card.style.padding = "8px 4px";
    
    const logoImg = card.querySelector('.vendor-logo img');
    if (logoImg) {
      logoImg.style.maxHeight = "28px";
      logoImg.style.maxWidth = "80px";
      logoImg.style.objectFit = "contain";
    }
    
    const nameElement = card.querySelector('.vendor-name');
    if (nameElement) {
      nameElement.style.fontSize = "11px";
      nameElement.style.whiteSpace = "nowrap";
      nameElement.style.overflow = "hidden";
      nameElement.style.textOverflow = "ellipsis";
      nameElement.style.maxWidth = "95%";
      nameElement.style.textAlign = "center";
    }
  });
  
  console.log("Vendor selection fixed");
}

// Fix loading overlay and toast notifications
function fixOverlays() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    loadingOverlay.style.color = "white";
    loadingOverlay.style.zIndex = "9999";
  }
  
  console.log("Overlays fixed");
}

// Add fallback for vendor icons
function addVendorIconFallbacks() {
  document.querySelectorAll('.vendor-logo img').forEach(img => {
    img.onerror = function() {
      // Try to load a generic fallback icon
      this.src = 'img/vendors/generic-vendor.png';
      this.onerror = function() {
        // If that also fails, use a data URI for a simple icon
        this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWE1YTk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iMiIgeT0iMyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiByeD0iMiIgcnk9IjIiPjwvcmVjdD48bGluZSB4MT0iOCIgeTE9IjIxIiB4Mj0iMTYiIHkyPSIyMSI+PC9saW5lPjxsaW5lIHgxPSIxMiIgeTE9IjE3IiB4Mj0iMTIiIHkyPSIyMSI+PC9saW5lPjwvc3ZnPg==';
      };
    };
  });
  
  console.log("Vendor icon fallbacks added");
}

// Ensure content is visible in all views
function ensureViewContent() {
  // Make sure executive view is initialized
  if (window.executiveView && !window.executiveView.initialized) {
    const executivePanel = document.querySelector('.view-panel[data-view="executive"]');
    if (executivePanel) {
      window.executiveView.init('executive');
    }
  }
  
  // Make sure security view is initialized
  if (window.securityView && !window.securityView.initialized) {
    const securityPanel = document.querySelector('.view-panel[data-view="security"]');
    if (securityPanel) {
      window.securityView.init('security');
    }
  }
}

// Initialize charts
function initializeAllCharts() {
  // Initialize ApexCharts
  if (window.ApexChartsManager && window.ApexChartsManager.initializeCharts) {
    window.ApexChartsManager.initializeCharts();
  }
  
  // Initialize SecurityCharts
  if (window.SecurityCharts && window.SecurityCharts.initializeCharts) {
    window.SecurityCharts.initializeCharts();
  }
  
  // Initialize D3 charts
  if (window.D3ChartsManager && window.D3ChartsManager.initializeCharts) {
    window.D3ChartsManager.initializeCharts();
  }
}

// Run all fixes
ensureStyle('css/custom/enhanced-styles.css');
ensureVendorData();
fixSidebarToggles();
fixTabNavigation();
fixVendorSelection();
fixOverlays();
addVendorIconFallbacks();
ensureViewContent();

// Ensure all critical JavaScript files are loaded
ensureScript('js/charts/chart-config.js', function() {
  ensureScript('js/charts/apex/apex-charts.js', function() {
    ensureScript('js/charts/security-charts.js', function() {
      ensureScript('js/charts/d3/d3-manager.js', function() {
        // Initialize charts after all scripts are loaded
        initializeAllCharts();
      });
    });
  });
});

console.log("Comprehensive fix applied successfully");
EOF
echo -e "${GREEN}Created js/comprehensive-fix.js${NC}"

# Create a load-fixes.js file to include in index.html
echo -e "${BLUE}Creating js/load-fixes.js...${NC}"
cat > js/load-fixes.js << 'EOF'
/**
 * Load all fixes for Portnox Total Cost Analyzer
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Loading fixes for Portnox Total Cost Analyzer...");
  
  // Load CSS fixes
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    console.log(`Loaded CSS: ${href}`);
  }
  
  // Load JavaScript fixes
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    if (callback) {
      script.onload = callback;
    }
    document.head.appendChild(script);
    console.log(`Loaded script: ${src}`);
  }
  
  // Load essential CSS fixes
  loadCSS('css/custom/enhanced-styles.css');
  loadCSS('css/security-view.css');
  
  // Load JavaScript fixes in sequence
  loadScript('js/models/vendors-data-fix.js', function() {
    loadScript('js/charts/chart-config.js', function() {
      loadScript('js/charts/apex/apex-charts.js', function() {
        loadScript('js/charts/security-charts.js', function() {
          loadScript('js/charts/d3/d3-manager.js', function() {
            loadScript('js/comprehensive-fix.js', function() {
              console.log("All fixes loaded successfully!");
            });
          });
        });
      });
    });
  });
});
EOF
echo -e "${GREEN}Created js/load-fixes.js${NC}"

# Update index.html to include fix scripts
echo -e "${BLUE}Updating index.html to include fixes...${NC}"
if grep -q "load-fixes.js" index.html; then
  echo -e "${YELLOW}load-fixes.js already included in index.html${NC}"
else
  # Insert the script before the closing </head> tag
  sed -i '/<\/head>/i \    <!-- Critical Fixes -->\n    <script src="js/load-fixes.js"></script>' index.html
  echo -e "${GREEN}Updated index.html to include fixes${NC}"
fi

echo -e "${GREEN}✅ All fixes have been applied!${NC}"
echo -e "${BLUE}Application Structure:${NC}"
echo -e "${YELLOW}1. Created missing JavaScript files${NC}"
echo -e "${YELLOW}2. Updated CSS to improve visibility of headers and banners${NC}"
echo -e "${YELLOW}3. Fixed vendor data initialization${NC}"
echo -e "${YELLOW}4. Enhanced chart rendering${NC}"
echo -e "${YELLOW}5. Fixed view initialization${NC}"
echo -e "${GREEN}The fixes are now active in your application.${NC}"
