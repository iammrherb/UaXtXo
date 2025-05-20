/**
 * Enhanced D3.js implementation for Portnox Total Cost Analyzer
 * Creates advanced, interactive visualizations for complex data
 */

class D3Manager {
  constructor(config = {}) {
    this.config = {
      colors: ChartConfig.colors,
      theme: ChartConfig.d3Theme,
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
   * Create enhanced security heatmap using D3
   * Shows security capabilities across vendors in a interactive heatmap
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
      { id: 'remediationSpeed', name: 'Remediation Speed' },
      { id: 'compliance', name: 'Compliance Coverage' }
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
        } else if (capability.id === 'compliance') {
          // For compliance, use the coverage percentage
          value = security.compliance.coverage;
        } else {
          value = security.securityScores[capability.id];
        }
        
        heatmapData.push({
          vendor: vendor.name,
          vendorId: vendorId,
          capability: capability.name,
          capabilityId: capability.id,
          value: value
        });
      });
    });
    
    // Get theme colors
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = ChartConfig.getCurrentTheme();
    
    // Set up dimensions
    const margin = { top: 60, right: 80, bottom: 100, left: 160 };
    const width = Math.max(600, element.clientWidth) - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add heatmap background with subtle gradient
    svg.append('rect')
      .attr('class', 'heatmap-gradient-bg')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent');
    
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
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')
      .style('font-size', '12px')
      .style('fill', theme.textLight);
    
    // Add Y axis
    svg.append('g')
      .attr('class', 'axis y-axis')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', theme.textLight);
    
    // Build color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100]);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .attr('class', 'heatmap-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('z-index', 10)
      .style('background-color', theme.cardBackground)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('box-shadow', '0 4px 15px rgba(0, 0, 0, 0.1)');
    
    // Functions for mouseover events
    const mouseover = function(event, d) {
      tooltip.style('opacity', 1);
      d3.select(this)
        .style('stroke', theme.textColor)
        .style('opacity', 1)
        .transition()
        .duration(200)
        .attr('rx', 8)
        .attr('ry', 8);
    };
    
    const mousemove = function(event, d) {
      // Get comparison text for Portnox vs this vendor
      let comparisonText = '';
      
      if (d.vendorId !== 'portnox') {
        // Find Portnox value for same capability
        const portnoxData = heatmapData.find(item => 
          item.vendorId === 'portnox' && item.capabilityId === d.capabilityId
        );
        
        if (portnoxData) {
          const diff = d.value - portnoxData.value;
          if (Math.abs(diff) > 0) {
            const diffStr = Math.abs(diff).toFixed(1);
            if (diff < 0) {
              comparisonText = `<br><span style="color:#e74c3c;font-weight:500;">${diffStr}% lower than Portnox</span>`;
            } else {
              comparisonText = `<br><span style="color:#2ecc71;font-weight:500;">${diffStr}% higher than Portnox</span>`;
            }
          }
        }
      }
      
      tooltip
        .html(`
          <strong>${d.vendor}</strong><br>
          ${d.capability}: <span style="font-weight:600">${Math.round(d.value)}%</span>
          ${comparisonText}
        `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px');
    };
    
    const mouseleave = function(event, d) {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.95)
        .transition()
        .duration(200)
        .attr('rx', 4)
        .attr('ry', 4);
    };
    
    // Add color squares with animation
    const cells = svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', d => x(d.capability))
      .attr('y', d => y(d.vendor))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke-width', 1)
      .style('stroke', 'none')
      .style('opacity', 0)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
    
    // Add animated entrance for cells
    cells.transition()
      .duration(800)
      .delay((d, i) => i * 10)
      .style('opacity', 0.95);
    
    // Add value text to cells
    svg.selectAll()
      .data(heatmapData)
      .enter()
      .append('text')
      .attr('x', d => x(d.capability) + x.bandwidth()/2)
      .attr('y', d => y(d.vendor) + y.bandwidth()/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', d => d.value > 70 ? 'white' : '#333')
      .style('opacity', 0)
      .text(d => Math.round(d.value))
      .transition()
      .duration(800)
      .delay((d, i) => 300 + i * 10)
      .style('opacity', 1);
    
    // Highlight Portnox row with a subtle glow
    const portnoxRow = heatmapData.filter(d => d.vendorId === 'portnox');
    
    // Add highlight for Portnox row
    svg.selectAll()
      .data(portnoxRow)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', y(portnoxRow[0].vendor))
      .attr('width', width)
      .attr('height', y.bandwidth())
      .attr('fill', 'none')
      .attr('stroke', ChartConfig.colors.vendors.portnox)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '3,3')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(800)
      .style('opacity', 0.8);
    
    // Add title
    svg.append('text')
      .attr('class', 'heatmap-title')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Security Capabilities Comparison')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1);
    
    // Add subtitle with animation
    svg.append('text')
      .attr('class', 'heatmap-subtitle')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', theme.textLight)
      .text('Higher scores indicate better performance in each category')
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay(300)
      .style('opacity', 1);
    
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
      .attr('x', width + 20)
      .attr('y', 0)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#linear-gradient)')
      .attr('rx', 3)
      .attr('ry', 3)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1);
    
    // Create a scale for the legend
    const legendY = d3.scaleLinear()
      .domain([0, 100])
      .range([legendHeight, 0]);
    
    // Add the legend axis
    const legendAxis = d3.axisRight(legendY)
      .tickSize(3)
      .tickValues([0, 25, 50, 75, 100])
      .tickFormat(d => d + '%');
    
    const legendAxisG = svg.append('g')
      .attr('transform', `translate(${width + 20 + legendWidth},0)`)
      .style('opacity', 0);
      
    legendAxisG.call(legendAxis)
      .transition()
      .duration(800)
      .delay(500)
      .style('opacity', 1);
    
    legendAxisG.selectAll('text')
      .style('font-size', '10px')
      .style('fill', theme.textLight);
    
    // Add legend title
    svg.append('text')
      .attr('transform', `translate(${width + 40},${legendHeight + 30})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textColor)
      .text('Capability Score')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay(700)
      .style('opacity', 1);
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: heatmapData,
      resize: () => {
        // Resize handling code
        const newWidth = Math.max(600, element.clientWidth) - margin.left - margin.right;
        
        // Update scales
        x.range([0, newWidth]);
        
        // Update all elements
        svg.selectAll('.heatmap-cell')
          .attr('x', d => x(d.capability))
          .attr('width', x.bandwidth());
          
        svg.selectAll('text')
          .filter(function() {
            return !this.classList.contains('heatmap-title') && 
                   !this.classList.contains('heatmap-subtitle');
          })
          .attr('x', d => x(d.capability) + x.bandwidth()/2);
          
        // Update highlight rectangle
        svg.selectAll('rect')
          .filter(function() {
            return this.getAttribute('stroke-dasharray') === '3,3';
          })
          .attr('width', newWidth);
          
        // Update title positions
        svg.select('.heatmap-title')
          .attr('x', newWidth / 2);
          
        svg.select('.heatmap-subtitle')
          .attr('x', newWidth / 2);
          
        // Update legend position
        svg.selectAll('.legend')
          .attr('transform', `translate(${newWidth + 20},0)`);
      },
      updateTheme: () => {
        // Update theme colors
        const newTheme = ChartConfig.getCurrentTheme();
        
        // Update text colors
        svg.selectAll('text')
          .style('fill', d => {
            if (d3.select(this).classed('heatmap-title')) {
              return newTheme.textColor;
            } else if (d3.select(this).classed('heatmap-subtitle')) {
              return newTheme.textLight;
            } else {
              return newTheme.textLight;
            }
          });
          
        // Update tooltip styles
        tooltip
          .style('background-color', newTheme.cardBackground)
          .style('border', `1px solid ${newTheme.borderColor}`);
          
        // Update axes
        svg.selectAll('.axis text')
          .style('fill', newTheme.textLight);
      },
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
   * Create vendor radar chart with enhanced interactivity
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
        id: vendorId,
        color: ChartConfig.getVendorColor(vendorId),
        scores
      };
    });
    
    // Get theme colors
    const isDarkMode = document.body.classList.contains('dark-mode');
    const theme = ChartConfig.getCurrentTheme();
    
    // Set up dimensions
    const margin = { top: 60, right: 120, bottom: 60, left: 120 };
    const width = Math.max(500, element.clientWidth) - margin.left - margin.right;
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
    
    // Add radar background with concentric circles
    const circles = [20, 40, 60, 80, 100];
    
    svg.selectAll('.radar-circle')
      .data(circles)
      .enter()
      .append('circle')
      .attr('class', 'radar-circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', theme.borderColor)
      .attr('stroke-width', d => d === 100 ? 1.5 : 1)
      .attr('stroke-dasharray', d => d % 40 === 0 ? 'none' : '3,3')
      .attr('opacity', d => (d === 100 ? 0.4 : 0.25))
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('r', d => radiusScale(d));
    
    // Add axes
    svg.selectAll('.radar-axis')
      .data(axes)
      .enter()
      .append('line')
      .attr('class', 'radar-axis')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', 0)
      .attr('y2', 0)
      .attr('stroke', theme.borderColor)
      .attr('stroke-width', 1.5)
      .transition()
      .duration(1000)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2);
    
    // Add axis labels with animated fade-in
    svg.selectAll('.radar-axis-label')
      .data(axes)
      .enter()
      .append('text')
      .attr('class', 'radar-axis-label')
      .attr('x', d => (radius + 20) * Math.cos(d.angle - Math.PI / 2))
      .attr('y', d => (radius + 20) * Math.sin(d.angle - Math.PI / 2))
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
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('fill', theme.textColor)
      .style('opacity', 0)
      .text(d => d.name)
      .transition()
      .duration(800)
      .delay((d, i) => 1000 + i * 100)
      .style('opacity', 1);
    
    // Add circle labels
    svg.selectAll('.radar-circle-label')
      .data(circles)
      .enter()
      .append('text')
      .attr('class', 'radar-circle-label')
      .attr('x', 5)
      .attr('y', d => -radiusScale(d) + 3)
      .attr('text-anchor', 'start')
      .style('font-size', '9px')
      .style('fill', theme.textLight)
      .style('opacity', 0)
      .text(d => d)
      .transition()
      .duration(500)
      .delay((d, i) => 1200 + i * 100)
      .style('opacity', 0.7);
    
    // Create tooltip
    const tooltip = d3.select(element)
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('z-index', 10)
      .style('background-color', theme.cardBackground)
      .style('border', `1px solid ${theme.borderColor}`)
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('box-shadow', '0 4px 15px rgba(0, 0, 0, 0.1)');
    
    // Create line generator
    const lineGenerator = d3.lineRadial()
      .angle((d, i) => angleScale(dimensions[i].key) - Math.PI / 2)
      .radius(d => radiusScale(d))
      .curve(d3.curveLinearClosed);
    
    // Add vendor radar paths with animation
    vendorScores.forEach((vendor, index) => {
      const values = dimensions.map(dim => vendor.scores[dim.key]);
      
      // Create group for each vendor
      const vendorGroup = svg.append('g')
        .attr('class', `vendor-${vendor.id}`);
      
      // Draw radar path with animation
      const path = vendorGroup.append('path')
        .datum(values)
        .attr('fill', ChartConfig.getTransparentColor(vendor.color, 0.15))
        .attr('stroke', vendor.color)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8)
        .attr('d', d => {
          // Start with a point at the center
          const startValues = dimensions.map(() => 0);
          return lineGenerator(startValues);
        });
      
      // Animate the path expansion
      path.transition()
        .duration(1500)
        .delay(index * 300 + 500)
        .attrTween('d', () => {
          return t => {
            // Interpolate each value from 0 to its final value
            const interpolatedValues = values.map(val => val * t);
            return lineGenerator(interpolatedValues);
          };
        });
      
      // Add points at each dimension with animation
      dimensions.forEach((dim, i) => {
        const angle = angleScale(dim.key) - Math.PI / 2;
        const value = vendor.scores[dim.key];
        
        vendorGroup.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 4)
          .attr('fill', vendor.color)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .style('opacity', 0)
          .on('mouseover', function(event, d) {
            d3.select(this).transition()
              .duration(200)
              .attr('r', 6);
              
            tooltip.style('opacity', 1);
            
            // Get comparison with Portnox
            let comparisonText = '';
            if (vendor.id !== 'portnox') {
              const portnoxVendor = vendorScores.find(v => v.id === 'portnox');
              if (portnoxVendor) {
                const portnoxScore = portnoxVendor.scores[dim.key];
                const diff = value - portnoxScore;
                if (Math.abs(diff) > 1) {
                  const diffStr = Math.abs(diff).toFixed(1);
                  if (diff < 0) {
                    comparisonText = `<br><span style="color:#e74c3c;">${diffStr}% lower than Portnox</span>`;
                  } else {
                    comparisonText = `<br><span style="color:#2ecc71;">${diffStr}% higher than Portnox</span>`;
                  }
                }
              }
            }
            
            tooltip.html(`
              <strong>${vendor.name}: ${dim.name}</strong><br>
              Score: <strong>${Math.round(value)}%</strong>
              ${comparisonText}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this).transition()
              .duration(200)
              .attr('r', 4);
              
            tooltip.style('opacity', 0);
          })
          .transition()
          .duration(500)
          .delay(index * 300 + 2000 + i * 100)
          .attr('cx', radiusScale(value) * Math.cos(angle))
          .attr('cy', radiusScale(value) * Math.sin(angle))
          .style('opacity', 1);
      });
    });
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${radius + 20},-${radius})`)
      .attr('class', 'radar-legend');
    
    vendorScores.forEach((vendor, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0,${i * 25})`)
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(2500 + i * 200)
        .style('opacity', 1);
      
      legendGroup.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('fill', vendor.color);
      
      legendGroup.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(vendor.name)
        .style('font-size', '13px')
        .style('fill', theme.textColor);
    });
    
    // Add chart title
    svg.append('text')
      .attr('class', 'radar-title')
      .attr('x', 0)
      .attr('y', -radius - 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', theme.textColor)
      .text('Vendor Capability Comparison')
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1);
    
    // Add interaction note
    svg.append('text')
      .attr('x', 0)
      .attr('y', radius + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.textLight)
      .style('opacity', 0)
      .text('Hover over points for detailed comparison')
      .transition()
      .duration(800)
      .delay(3000)
      .style('opacity', 0.8);
    
    // Store reference to svg and data
    this.charts[chartId] = {
      svg,
      data: vendorScores,
      resize: () => {
        // Resize handling code...
      },
      updateTheme: () => {
        // Theme update handling code...
      },
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
