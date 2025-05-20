/**
 * Enhanced D3 implementation for Portnox Total Cost Analyzer
 * Creates advanced, interactive visualizations for complex data
 */

class D3Manager {
  constructor(config = {}) {
    this.config = {
      colors: window.ChartConfig ? window.ChartConfig.colors : {
        chart: ['#1a5a96', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#3498db']
      },
      theme: window.ChartConfig ? window.ChartConfig.d3Theme : {
        fontFamily: "'Nunito', sans-serif"
      },
      ...config
    };
    
    this.charts = {};
    
    // Initialize responsive handlers
    this.initResponsiveHandlers();
  }
  
  /**
   * Initialize responsive handlers for resizing
   */
  initResponsiveHandlers() {
    // Debounced resize handler for chart responsiveness
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Redraw all active charts on resize
        Object.keys(this.charts).forEach(chartId => {
          const chart = this.charts[chartId];
          if (chart && chart.resize) {
            chart.resize();
          }
        });
      }, 250);
    });
    
    // Handle theme changes
    window.addEventListener('themechange', () => {
      // Update all active charts with new theme
      Object.keys(this.charts).forEach(chartId => {
        const chart = this.charts[chartId];
        if (chart && chart.updateTheme) {
          chart.updateTheme();
        }
      });
    });
  }
  
  /**
   * Create Vendor Comparison Heatmap
   * Shows strengths and weaknesses across different categories
   */
  createVendorHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define comparison data
    const categories = [
      'Implementation', 'User Experience', 'Cloud Integration', 
      'On-Premises Support', 'Legacy Devices', 'BYOD Support',
      'IoT Security', 'API Flexibility', 'Compliance', 'Cost Efficiency'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
    
    // Vendor capabilities data (0-100 scale)
    const vendorCapabilities = {
      'portnox': {
        'Implementation': 95,
        'User Experience': 90,
        'Cloud Integration': 95,
        'On-Premises Support': 80,
        'Legacy Devices': 85,
        'BYOD Support': 95,
        'IoT Security': 90,
        'API Flexibility': 90,
        'Compliance': 95,
        'Cost Efficiency': 95
      },
      'cisco': {
        'Implementation': 70,
        'User Experience': 75,
        'Cloud Integration': 75,
        'On-Premises Support': 90,
        'Legacy Devices': 90,
        'BYOD Support': 80,
        'IoT Security': 85,
        'API Flexibility': 75,
        'Compliance': 90,
        'Cost Efficiency': 65
      },
      'forescout': {
        'Implementation': 75,
        'User Experience': 80,
        'Cloud Integration': 70,
        'On-Premises Support': 85,
        'Legacy Devices': 90,
        'BYOD Support': 85,
        'IoT Security': 90,
        'API Flexibility': 80,
        'Compliance': 85,
        'Cost Efficiency': 70
      },
      'aruba': {
        'Implementation': 75,
        'User Experience': 80,
        'Cloud Integration': 75,
        'On-Premises Support': 85,
        'Legacy Devices': 80,
        'BYOD Support': 85,
        'IoT Security': 80,
        'API Flexibility': 75,
        'Compliance': 85,
        'Cost Efficiency': 75
      },
      'fortinac': {
        'Implementation': 70,
        'User Experience': 75,
        'Cloud Integration': 65,
        'On-Premises Support': 85,
        'Legacy Devices': 85,
        'BYOD Support': 75,
        'IoT Security': 80,
        'API Flexibility': 70,
        'Compliance': 80,
        'Cost Efficiency': 70
      }
    };
    
    // Filter vendors
    const vendors = selectedVendors.filter(v => vendorCapabilities[v] !== undefined);
    
    // Create heatmap data
    const heatmapData = [];
    vendors.forEach(vendorId => {
      categories.forEach(category => {
        heatmapData.push({
          vendor: window.VENDORS ? window.VENDORS[vendorId].name : vendorId,
          vendorId: vendorId,
          category: category,
          value: vendorCapabilities[vendorId][category]
        });
      });
    });
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 50, right: 80, bottom: 70, left: 140 };
    const width = Math.max(600, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(categories)
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(vendors.map(v => window.VENDORS ? window.VENDORS[v].name : v))
      .padding(0.05);
    
    // Color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);
    
    // Add axes
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px');
    
    // Mouse functions
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };
    
    const mousemove = function(event, d) {
      // Find Portnox value for comparison
      let comparisonText = '';
      if (d.vendorId !== 'portnox' && vendors.includes('portnox')) {
        const portnoxValue = vendorCapabilities['portnox'][d.category];
        const diff = d.value - portnoxValue;
        if (Math.abs(diff) > 0) {
          if (diff < 0) {
            comparisonText = `<br><span style="color:#e74c3c;">${Math.abs(diff)} points below Portnox</span>`;
          } else {
            comparisonText = `<br><span style="color:#2ecc71;">${diff} points above Portnox</span>`;
          }
        }
      }
      
      // Show tooltip
      tooltip
        .html(`
          <strong>${d.vendor}</strong><br>
          ${d.category}: <strong>${d.value}/100</strong>
          ${comparisonText}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 15) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.9);
    };
    
    // Add cells with animation
    const cells = svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.vendor))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('rx', 3)
      .style('ry', 3)
      .style('stroke-width', 0)
      .style('opacity', 0)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add animation
    cells.transition()
      .duration(700)
      .delay((d, i) => i * 20)
      .style('opacity', 0.9);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Vendor Capability Comparison');
    
    // Add legend
    const legendWidth = 20;
    const legendHeight = 150;
    
    const defs = svg.append('defs');
    
    // Create gradient for legend
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    
    // Add color stops
    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.01, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => d * 100 + '%')
      .attr('stop-color', d => colorScale(d * 100));
    
    // Add legend rectangle
    svg.append('rect')
      .attr('x', width + 20)
      .attr('y', 0)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)')
      .style('rx', 3)
      .style('ry', 3);
    
    // Add legend scale
    const legendScale = d3.scaleLinear()
      .domain([0, 100])
      .range([legendHeight, 0]);
    
    const legendAxis = d3.axisRight(legendScale)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');
    
    svg.append('g')
      .attr('transform', `translate(${width + 20 + legendWidth},0)`)
      .call(legendAxis)
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', theme.textColor);
    
    // Add legend title
    svg.append('text')
      .attr('transform', `translate(${width + 20 + legendWidth / 2},${legendHeight + 35})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textColor)
      .text('Score');
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      resize: () => {
        // Resize handling
        const newWidth = Math.max(600, element.clientWidth) - margin.left - margin.right;
        
        // Update scales
        x.range([0, newWidth]);
        
        // Update elements
        svg.selectAll('rect')
          .filter(function() { return !this.classList.contains('legend-rect'); })
          .attr('x', d => x(d.category))
          .attr('width', x.bandwidth());
          
        // Update legend position
        svg.selectAll('.legend')
          .attr('transform', `translate(${newWidth + 20},0)`);
          
        // Update title position
        svg.select('text').attr('x', newWidth / 2);
      },
      updateTheme: () => {
        // Update theme colors
        const newTheme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
          (document.body.classList.contains('dark-mode') ? this.config.colors.dark : this.config.colors.light);
        
        // Update text colors
        svg.selectAll('text').style('fill', newTheme.textColor);
        svg.selectAll('.x-axis text, .y-axis text').style('fill', newTheme.textColor);
        
        // Update tooltip style
        tooltip
          .style('background-color', newTheme.cardBackground)
          .style('color', newTheme.textColor)
          .style('border', `1px solid ${newTheme.borderColor}`);
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create NIST Framework Radar Chart
   * Shows coverage across different NIST Cybersecurity Framework categories
   */
  createNistFrameworkChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define NIST framework categories
    const categories = [
      'Identify', 'Protect', 'Detect', 'Respond', 'Recover'
    ];
    
    // Selected vendors for comparison
    const selectedVendors = window.sidebarManager ? 
      window.sidebarManager.getSelectedVendors() : 
      ['portnox', 'cisco', 'forescout'];
      
    // NIST framework coverage data (0-100 scale)
    const frameworkCoverage = {
      'portnox': {
        'Identify': 92,
        'Protect': 95,
        'Detect': 90,
        'Respond': 85,
        'Recover': 80
      },
      'cisco': {
        'Identify': 85,
        'Protect': 90,
        'Detect': 85,
        'Respond': 80,
        'Recover': 75
      },
      'forescout': {
        'Identify': 90,
        'Protect': 85,
        'Detect': 90,
        'Respond': 80,
        'Recover': 70
      },
      'aruba': {
        'Identify': 80,
        'Protect': 85,
        'Detect': 80,
        'Respond': 75,
        'Recover': 70
      },
      'fortinac': {
        'Identify': 80,
        'Protect': 80,
        'Detect': 85,
        'Respond': 75,
        'Recover': 65
      }
    };
    
    // Filter vendors
    const vendors = selectedVendors.filter(v => frameworkCoverage[v] !== undefined);
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 70, right: 70, bottom: 70, left: 70 };
    const width = Math.min(600, element.clientWidth) - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width/2},${margin.top + height/2})`);
    
    // Scales and axes
    const angleScale = d3.scalePoint()
      .range([0, 2 * Math.PI])
      .domain(categories)
      .padding(0.5);
    
    const radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]);
    
    // Create axes (spokes)
    categories.forEach(category => {
      const angle = angleScale(category);
      
      // Draw axis line
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', radius * Math.cos(angle - Math.PI / 2))
        .attr('y2', radius * Math.sin(angle - Math.PI / 2))
        .attr('stroke', theme.borderColor)
        .attr('stroke-width', 1)
        .attr('opacity', 0.7);
      
      // Add axis label
      svg.append('text')
        .attr('x', (radius + 20) * Math.cos(angle - Math.PI / 2))
        .attr('y', (radius + 20) * Math.sin(angle - Math.PI / 2))
        .attr('text-anchor', angle === 0 || angle === Math.PI ? 'middle' : (angle < Math.PI ? 'start' : 'end'))
        .attr('dominant-baseline', angle === Math.PI / 2 || angle === 3 * Math.PI / 2 ? 'middle' : (angle < Math.PI ? 'hanging' : 'auto'))
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', theme.textColor)
        .text(category);
    });
    
    // Draw concentric circles
    [20, 40, 60, 80, 100].forEach(value => {
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radiusScale(value))
        .attr('fill', 'none')
        .attr('stroke', theme.borderColor)
        .attr('stroke-width', value === 100 ? 1.5 : 0.7)
        .attr('stroke-dasharray', value % 40 === 0 ? 'none' : '2,2')
        .attr('opacity', value === 100 ? 0.7 : 0.4);
        
      // Add value label (only for major ticks)
      if (value % 40 === 0) {
        svg.append('text')
          .attr('x', 5)
          .attr('y', -radiusScale(value) + 3)
          .attr('font-size', '10px')
          .attr('fill', theme.textLight)
          .text(value);
      }
    });
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px');
    
    // Create line generator
    const lineGenerator = d3.lineRadial()
      .angle(d => angleScale(d.category) - Math.PI / 2)
      .radius(d => radiusScale(d.value))
      .curve(d3.curveLinearClosed);
    
    // Create paths for each vendor
    vendors.forEach((vendorId, index) => {
      // Create data array
      const vendorData = categories.map(category => ({
        category: category,
        value: frameworkCoverage[vendorId][category]
      }));
      
      // Get vendor color
      const vendorColor = window.ChartConfig ? 
        window.ChartConfig.getVendorColor(vendorId) : 
        this.config.colors.chart[index % this.config.colors.chart.length];
      
      // Create path with animation
      const path = svg.append('path')
        .datum(vendorData)
        .attr('fill', vendorColor)
        .attr('fill-opacity', 0.2)
        .attr('stroke', vendorColor)
        .attr('stroke-width', 2)
        .attr('d', lineGenerator)
        .attr('opacity', 0);
      
      // Animate path
      path.transition()
        .duration(1000)
        .delay(index * 200)
        .attr('opacity', 1);
      
      // Add points with tooltips
      vendorData.forEach((d, i) => {
        const angle = angleScale(d.category) - Math.PI / 2;
        const x = radiusScale(d.value) * Math.cos(angle);
        const y = radiusScale(d.value) * Math.sin(angle);
        
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 5)
          .attr('fill', vendorColor)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0)
          .on('mouseover', function(event) {
            d3.select(this).attr('r', 7);
            tooltip.style('opacity', 1);
          })
          .on('mousemove', function(event) {
            tooltip
              .html(`
                <strong>${window.VENDORS ? window.VENDORS[vendorId].name : vendorId}</strong><br>
                ${d.category}: <strong>${d.value}%</strong>
              `)
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 15) + 'px');
          })
          .on('mouseleave', function() {
            d3.select(this).attr('r', 5);
            tooltip.style('opacity', 0);
          })
          .transition()
          .duration(500)
          .delay(index * 200 + 200 + i * 100)
          .attr('opacity', 1);
      });
    });
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', theme.textColor)
      .text('NIST Cybersecurity Framework Coverage');
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${0},${radius + 30})`);
      
    vendors.forEach((vendorId, i) => {
      const vendorColor = window.ChartConfig ? 
        window.ChartConfig.getVendorColor(vendorId) : 
        this.config.colors.chart[i % this.config.colors.chart.length];
      
      const legendItem = legend.append('g')
        .attr('transform', `translate(${(-vendors.length / 2 + i) * 120},0)`)
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          // Highlight this vendor's path
          svg.selectAll('path')
            .filter((d, j) => j !== i)
            .transition()
            .duration(200)
            .attr('opacity', 0.2);
        })
        .on('mouseleave', function() {
          // Reset all paths
          svg.selectAll('path')
            .transition()
            .duration(200)
            .attr('opacity', 1);
        });
      
      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('rx', 2)
        .attr('fill', vendorColor);
      
      legendItem.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .attr('font-size', '12px')
        .attr('fill', theme.textColor)
        .text(window.VENDORS ? window.VENDORS[vendorId].name : vendorId);
    });
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      resize: () => {
        // Resize functionality
      },
      updateTheme: () => {
        // Theme update functionality
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Create Threat Model Visualization
   * Shows different threat types and their impact before/after NAC
   */
  createThreatModelVisualization(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return null;
    
    // Clear any existing chart
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    
    // Define threat categories and impact
    const threats = [
      { name: 'Unauthorized Access', beforeNAC: 85, afterNAC: 25, description: 'External actors gaining access to network resources' },
      { name: 'Data Exfiltration', beforeNAC: 75, afterNAC: 30, description: 'Theft of sensitive data from the network' },
      { name: 'Lateral Movement', beforeNAC: 80, afterNAC: 20, description: 'Attackers moving between systems after initial breach' },
      { name: 'Shadow IT', beforeNAC: 70, afterNAC: 15, description: 'Unauthorized devices and applications on network' },
      { name: 'Malware Spread', beforeNAC: 75, afterNAC: 30, description: 'Rapid infection across network systems' },
      { name: 'Device Spoofing', beforeNAC: 90, afterNAC: 10, description: 'Impersonation of legitimate network devices' },
      { name: 'Privilege Escalation', beforeNAC: 65, afterNAC: 35, description: 'Gaining higher access rights than authorized' }
    ];
    
    // Get theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = window.ChartConfig ? window.ChartConfig.getCurrentTheme() : 
      (isDarkMode ? this.config.colors.dark : this.config.colors.light);
    
    // Set dimensions
    const margin = { top: 50, right: 180, bottom: 70, left: 150 };
    const width = Math.max(500, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const y = d3.scaleBand()
      .range([0, height])
      .domain(threats.map(d => d.name))
      .padding(0.2);
    
    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, 100]);
    
    // Axes
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + '%'))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textColor);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('background-color', theme.cardBackground)
      .style('color', theme.textColor)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('box-shadow', '0 4px 10px rgba(0, 0, 0, 0.15)')
      .style('pointer-events', 'none')
      .style('z-index', 10)
      .style('font-family', this.config.theme.fontFamily)
      .style('font-size', '12px')
      .style('max-width', '250px');
    
    // Add bars for before NAC (risk level)
    svg.selectAll('.bar-before')
      .data(threats)
      .enter()
      .append('rect')
      .attr('class', 'bar-before')
      .attr('y', d => y(d.name))
      .attr('height', y.bandwidth() / 2)
      .attr('x', 0)
      .attr('width', 0) // Start at 0 for animation
      .attr('fill', '#e74c3c')
      .attr('opacity', 0.8)
      .attr('rx', 4)
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this).attr('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        tooltip
          .html(`
            <strong>${d.name}</strong><br>
            <div>${d.description}</div><br>
            <strong>Risk Level Before NAC:</strong> ${d.beforeNAC}%
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 15) + 'px');
      })
      .on('mouseleave', function() {
        tooltip.style('opacity', 0);
        d3.select(this).attr('opacity', 0.8);
      })
      // Animate the bars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('width', d => x(d.beforeNAC));
    
    // Add bars for after NAC (reduced risk)
    svg.selectAll('.bar-after')
      .data(threats)
      .enter()
      .append('rect')
      .attr('class', 'bar-after')
      .attr('y', d => y(d.name) + y.bandwidth() / 2)
      .attr('height', y.bandwidth() / 2)
      .attr('x', 0)
      .attr('width', 0) // Start at 0 for animation
      .attr('fill', '#2ecc71')
      .attr('opacity', 0.8)
      .attr('rx', 4)
      .attr('ry', 4)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this).attr('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        const reduction = d.beforeNAC - d.afterNAC;
        tooltip
          .html(`
            <strong>${d.name}</strong><br>
            <div>${d.description}</div><br>
            <strong>Risk Level After NAC:</strong> ${d.afterNAC}%<br>
            <strong>Reduction:</strong> ${reduction}% (${Math.round(reduction / d.beforeNAC * 100)}%)
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 15) + 'px');
      })
      .on('mouseleave', function() {
        tooltip.style('opacity', 0);
        d3.select(this).attr('opacity', 0.8);
      })
      // Animate the bars
      .transition()
      .duration(1000)
      .delay((d, i) => 500 + i * 100)
      .attr('width', d => x(d.afterNAC));
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width + 20},0)`);
    
    // Before NAC legend item
    const beforeLegend = legend.append('g')
      .attr('transform', 'translate(0,0)');
    
    beforeLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#e74c3c')
      .attr('opacity', 0.8)
      .attr('rx', 2)
      .attr('ry', 2);
    
    beforeLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('Before NAC');
    
    // After NAC legend item
    const afterLegend = legend.append('g')
      .attr('transform', 'translate(0,25)');
    
    afterLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#2ecc71')
      .attr('opacity', 0.8)
      .attr('rx', 2)
      .attr('ry', 2);
    
    afterLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('After NAC');
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', theme.textColor)
      .text('Threat Impact Analysis');
    
    // Add subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', theme.textLight)
      .text('Risk level before and after implementing NAC');
    
    // Add X-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', theme.textColor)
      .text('Risk Level (%)');
    
    // Store reference for updates
    this.charts[chartId] = {
      svg,
      resize: () => {
        // Resize functionality
      },
      updateTheme: () => {
        // Theme update functionality
      },
      destroy: () => {
        // Remove chart
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    };
    
    return this.charts[chartId];
  }
  
  /**
   * Initialize charts for Security & Compliance View
   */
  initSecurityCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['nistFrameworkChart', 'threatModelChart']);
    
    // Create NIST framework radar chart
    this.createNistFrameworkChart(resultsData, 'nist-framework-chart', 'nistFrameworkChart');
    
    // Create threat model visualization
    this.createThreatModelVisualization(resultsData, 'threat-model-chart', 'threatModelChart');
    
    return this.charts;
  }
  
  /**
   * Initialize charts for Executive View
   */
  initExecutiveCharts(resultsData) {
    // Clear any existing charts
    this.destroyCharts(['vendorRadarChart']);
    
    // Create vendor radar chart
    this.createVendorHeatmap(resultsData, 'vendor-radar-chart', 'vendorRadarChart');
    
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

// Create global instance
window.d3Manager = new D3Manager();

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { D3Manager };
}
