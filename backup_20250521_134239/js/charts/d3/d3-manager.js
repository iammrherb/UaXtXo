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
