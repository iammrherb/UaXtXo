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
