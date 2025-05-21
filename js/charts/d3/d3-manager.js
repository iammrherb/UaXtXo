/**
 * D3 Charts Manager for Portnox Total Cost Analyzer
 * Provides advanced visualizations using D3.js
 */

class D3Manager {
  constructor() {
    this.charts = {};
    this.colors = {
      primary: '#1a5a96',
      secondary: '#2ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      purple: '#9b59b6',
      gray: '#95a5a6'
    };
  }
  
  /**
   * Destroy chart if it exists
   */
  destroyChart(chartId) {
    if (this.charts[chartId]) {
      // Remove all SVG elements
      const chartContainer = this.charts[chartId];
      while (chartContainer.firstChild) {
        chartContainer.removeChild(chartContainer.firstChild);
      }
      
      delete this.charts[chartId];
    }
  }
  
  /**
   * Create NIST framework chart
   */
  createNistFrameworkChart(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for NIST framework
    const nistData = {
      name: 'NIST Cybersecurity Framework',
      children: [
        {
          name: 'Identify',
          description: 'Asset Management, Business Environment, Governance, Risk Assessment, Risk Management',
          value: 92,
          children: [
            { name: 'Asset Management', value: 95 },
            { name: 'Business Environment', value: 90 },
            { name: 'Governance', value: 88 },
            { name: 'Risk Assessment', value: 94 },
            { name: 'Risk Management', value: 93 }
          ]
        },
        {
          name: 'Protect',
          description: 'Access Control, Awareness Training, Data Security, Protective Technology',
          value: 95,
          children: [
            { name: 'Access Control', value: 98 },
            { name: 'Awareness Training', value: 90 },
            { name: 'Data Security', value: 94 },
            { name: 'Info Protection', value: 95 },
            { name: 'Protective Technology', value: 96 }
          ]
        },
        {
          name: 'Detect',
          description: 'Anomalies & Events, Security Monitoring, Detection Processes',
          value: 94,
          children: [
            { name: 'Anomalies & Events', value: 96 },
            { name: 'Security Monitoring', value: 95 },
            { name: 'Detection Processes', value: 92 }
          ]
        },
        {
          name: 'Respond',
          description: 'Response Planning, Communications, Analysis, Mitigation, Improvements',
          value: 93,
          children: [
            { name: 'Response Planning', value: 94 },
            { name: 'Communications', value: 95 },
            { name: 'Analysis', value: 93 },
            { name: 'Mitigation', value: 92 },
            { name: 'Improvements', value: 91 }
          ]
        },
        {
          name: 'Recover',
          description: 'Recovery Planning, Improvements, Communications',
          value: 90,
          children: [
            { name: 'Recovery Planning', value: 91 },
            { name: 'Improvements', value: 89 },
            { name: 'Communications', value: 90 }
          ]
        }
      ]
    };
    
    // Create SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 50, right: 20, bottom: 50, left: 20 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create color scale
    const color = d3.scaleOrdinal()
      .domain(['Identify', 'Protect', 'Detect', 'Respond', 'Recover'])
      .range([this.colors.primary, this.colors.secondary, this.colors.info, this.colors.warning, this.colors.purple]);
    
    // Create treemap layout
    const treemap = d3.treemap()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .padding(4);
    
    // Create hierarchy
    const root = d3.hierarchy(nistData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    
    // Apply treemap layout
    treemap(root);
    
    // Create cells
    const cell = svg.selectAll('g')
      .data(root.descendants().filter(d => d.depth === 1))
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
    
    // Create rectangles
    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => color(d.data.name))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .attr('ry', 4);
    
    // Add labels
    cell.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.data.name);
    
    // Add scores
    cell.append('text')
      .attr('x', 10)
      .attr('y', 40)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', '#fff')
      .text(d => d.data.value + '%');
    
    // Add title
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('NIST Cybersecurity Framework Coverage');
    
    // Add subtitle
    svg.append('text')
      .attr('x', (width - margin.left - margin.right) / 2)
      .attr('y', height - margin.top - margin.bottom + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('Overall Framework Coverage: 93%');
      
    return svg;
  }
  
  /**
   * Create threat model visualization
   */
  createThreatModelVisualization(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for threat impact analysis
    const threatData = [
      { threat: 'Unauthorized Access', impact: 'Critical', baseline: 85, withNAC: 15, reduction: 82 },
      { threat: 'Data Exfiltration', impact: 'Critical', baseline: 90, withNAC: 20, reduction: 78 },
      { threat: 'Malware Propagation', impact: 'High', baseline: 75, withNAC: 15, reduction: 80 },
      { threat: 'Lateral Movement', impact: 'Critical', baseline: 95, withNAC: 10, reduction: 89 },
      { threat: 'Rogue Devices', impact: 'High', baseline: 85, withNAC: 5, reduction: 94 },
      { threat: 'Insider Threats', impact: 'High', baseline: 70, withNAC: 15, reduction: 79 },
      { threat: 'Application Exploits', impact: 'Medium', baseline: 60, withNAC: 20, reduction: 67 },
      { threat: 'Network Reconnaissance', impact: 'Medium', baseline: 80, withNAC: 10, reduction: 88 }
    ];
    
    // Set up SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 50, right: 150, bottom: 70, left: 80 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const chartArea = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(threatData.map(d => d.threat))
      .range([0, width - margin.left - margin.right])
      .padding(0.3);
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - margin.top - margin.bottom, 0]);
    
    // Create x-axis
    chartArea.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em');
    
    // Create y-axis
    chartArea.append('g')
      .call(d3.axisLeft(yScale));
    
    // Create color scale for impact
    const colorScale = d3.scaleOrdinal()
      .domain(['Critical', 'High', 'Medium', 'Low'])
      .range([this.colors.danger, this.colors.warning, this.colors.info, this.colors.secondary]);
    
    // Add baseline bars
    chartArea.selectAll('.baseline-bar')
      .data(threatData)
      .enter()
      .append('rect')
      .attr('class', 'baseline-bar')
      .attr('x', d => xScale(d.threat))
      .attr('y', d => yScale(d.baseline))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.baseline))
      .attr('fill', 'rgba(231, 76, 60, 0.3)')
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 1);
    
    // Add NAC bars
    chartArea.selectAll('.nac-bar')
      .data(threatData)
      .enter()
      .append('rect')
      .attr('class', 'nac-bar')
      .attr('x', d => xScale(d.threat))
      .attr('y', d => yScale(d.withNAC))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.withNAC))
      .attr('fill', d => colorScale(d.impact))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);
    
    // Add reduction arrows
    chartArea.selectAll('.reduction-arrow')
      .data(threatData)
      .enter()
      .append('line')
      .attr('class', 'reduction-arrow')
      .attr('x1', d => xScale(d.threat) + xScale.bandwidth() / 2)
      .attr('y1', d => yScale(d.baseline))
      .attr('x2', d => xScale(d.threat) + xScale.bandwidth() / 2)
      .attr('y2', d => yScale(d.withNAC))
      .attr('stroke', '#2ecc71')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,3')
      .attr('marker-end', 'url(#arrowhead)');
    
    // Define arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 5)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#2ecc71');
    
    // Add reduction percentage labels
    chartArea.selectAll('.reduction-label')
      .data(threatData)
      .enter()
      .append('text')
      .attr('class', 'reduction-label')
      .attr('x', d => xScale(d.threat) + xScale.bandwidth() / 2 + 5)
      .attr('y', d => yScale(d.baseline / 2 + d.withNAC / 2))
      .attr('text-anchor', 'start')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#2ecc71')
      .text(d => `-${d.reduction}%`);
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);
    
    // Add legend title
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Impact');
    
    // Add legend items
    const impacts = ['Critical', 'High', 'Medium', 'Low'];
    impacts.forEach((impact, i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${i * 25 + 20})`);
      
      legendItem.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(impact));
      
      legendItem.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .attr('font-size', '12px')
        .text(impact);
    });
    
    // Add second legend for bar types
    const legend2 = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 130})`);
    
    // Add legend title
    legend2.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Level');
    
    // Add baseline legend item
    const baselineLegend = legend2.append('g')
      .attr('transform', 'translate(0, 20)');
    
    baselineLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', 'rgba(231, 76, 60, 0.3)')
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 1);
    
    baselineLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .text('Without NAC');
    
    // Add NAC legend item
    const nacLegend = legend2.append('g')
      .attr('transform', 'translate(0, 45)');
    
    nacLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', this.colors.primary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);
    
    nacLegend.append('text')
      .attr('x', 25)
      .attr('y', 12)
      .attr('font-size', '12px')
      .text('With Portnox Cloud');
    
    // Add axes titles
    svg.append('text')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Threat Vector');
    
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(height / 2))
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text('Risk Level (%)');
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Threat Impact Reduction with Portnox Cloud');
    
    return svg;
  }
  
  /**
   * Create vendor heatmap visualization
   */
  createVendorHeatmap(data, elementId, chartId) {
    const element = document.getElementById(elementId);
    if (!element || !window.d3) return;
    
    // Clear any existing chart
    element.innerHTML = '';
    
    // Store reference to container
    this.charts[chartId] = element;
    
    // Check if D3 is available
    if (!window.d3) {
      element.innerHTML = '<div class="chart-error">D3.js library not available</div>';
      return;
    }
    
    // Sample data for vendor capability comparison
    const vendorData = [
      { vendor: 'Portnox Cloud', category: 'Zero Trust', score: 95 },
      { vendor: 'Portnox Cloud', category: 'Device Authentication', score: 95 },
      { vendor: 'Portnox Cloud', category: 'Network Visibility', score: 90 },
      { vendor: 'Portnox Cloud', category: 'Threat Prevention', score: 85 },
      { vendor: 'Portnox Cloud', category: 'Automated Response', score: 90 },
      { vendor: 'Portnox Cloud', category: 'Compliance', score: 95 },
      
      { vendor: 'Cisco ISE', category: 'Zero Trust', score: 75 },
      { vendor: 'Cisco ISE', category: 'Device Authentication', score: 85 },
      { vendor: 'Cisco ISE', category: 'Network Visibility', score: 80 },
      { vendor: 'Cisco ISE', category: 'Threat Prevention', score: 80 },
      { vendor: 'Cisco ISE', category: 'Automated Response', score: 75 },
      { vendor: 'Cisco ISE', category: 'Compliance', score: 80 },
      
      { vendor: 'Aruba ClearPass', category: 'Zero Trust', score: 70 },
      { vendor: 'Aruba ClearPass', category: 'Device Authentication', score: 85 },
      { vendor: 'Aruba ClearPass', category: 'Network Visibility', score: 75 },
      { vendor: 'Aruba ClearPass', category: 'Threat Prevention', score: 75 },
      { vendor: 'Aruba ClearPass', category: 'Automated Response', score: 70 },
      { vendor: 'Aruba ClearPass', category: 'Compliance', score: 75 },
      
      { vendor: 'Forescout', category: 'Zero Trust', score: 65 },
      { vendor: 'Forescout', category: 'Device Authentication', score: 80 },
      { vendor: 'Forescout', category: 'Network Visibility', score: 90 },
      { vendor: 'Forescout', category: 'Threat Prevention', score: 75 },
      { vendor: 'Forescout', category: 'Automated Response', score: 70 },
      { vendor: 'Forescout', category: 'Compliance', score: 70 }
    ];
    
    // Extract unique vendors and categories
    const vendors = Array.from(new Set(vendorData.map(d => d.vendor)));
    const categories = Array.from(new Set(vendorData.map(d => d.category)));
    
    // Set up SVG
    const width = element.clientWidth;
    const height = 400;
    const margin = { top: 80, right: 50, bottom: 80, left: 150 };
    
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const chartArea = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width - margin.left - margin.right])
      .padding(0.1);
    
    const yScale = d3.scaleBand()
      .domain(vendors)
      .range([0, height - margin.top - margin.bottom])
      .padding(0.1);
    
    // Create color scale
    const colorScale = d3.scaleLinear()
      .domain([50, 75, 95])
      .range(['#e74c3c', '#f39c12', '#2ecc71']);
    
    // Create x-axis
    chartArea.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em');
    
    // Create y-axis
    chartArea.append('g')
      .call(d3.axisLeft(yScale));
    
    // Add vendor logos to y-axis
    chartArea.selectAll('.y-axis-image')
      .data(vendors)
      .enter()
      .append('image')
      .attr('class', 'y-axis-image')
      .attr('x', -140)
      .attr('y', d => yScale(d) + yScale.bandwidth() / 2 - 10)
      .attr('width', 120)
      .attr('height', 20)
      .attr('xlink:href', d => {
        // Return appropriate logo based on vendor name
        if (d.includes('Portnox')) return 'img/vendors/portnox-logo.png';
        if (d.includes('Cisco')) return 'img/vendors/cisco-logo.png';
        if (d.includes('Aruba')) return 'img/vendors/aruba-logo.png';
        if (d.includes('Forescout')) return 'img/vendors/forescout-logo.png';
        return '';
      });
    
    // Create heatmap cells
    chartArea.selectAll('.heatmap-cell')
      .data(vendorData)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', d => xScale(d.category))
      .attr('y', d => yScale(d.vendor))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.score))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('rx', 4)
      .attr('ry', 4);
    
    // Add score labels
    chartArea.selectAll('.score-label')
      .data(vendorData)
      .enter()
      .append('text')
      .attr('class', 'score-label')
      .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.vendor) + yScale.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', d => d.score > 70 ? '#fff' : '#333')
      .text(d => d.score);
    
    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('NAC Vendor Capabilities Comparison');
    
    // Add legend
    const legendWidth = 300;
    const legendHeight = 20;
    
    const legendX = (width - legendWidth) / 2;
    const legendY = height - 30;
    
    const defs = svg.append('defs');
    
    // Create gradient
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    
    linearGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#e74c3c');
    
    linearGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#f39c12');
    
    linearGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2ecc71');
    
    // Draw legend rect
    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)');
    
    // Draw legend axis
    const legendScale = d3.scaleLinear()
      .domain([50, 95])
      .range([0, legendWidth]);
    
    const legendAxis = d3.axisBottom(legendScale)
      .tickValues([50, 60, 70, 80, 90, 95])
      .tickFormat(d => d);
    
    svg.append('g')
      .attr('transform', `translate(${legendX}, ${legendY + legendHeight})`)
      .call(legendAxis);
    
    // Add legend title
    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 10)
      .attr('font-size', '12px')
      .attr('text-anchor', 'start')
      .text('Capability Score:');
    
    return svg;
  }
}

// Create global instance
window.d3Manager = new D3Manager();
