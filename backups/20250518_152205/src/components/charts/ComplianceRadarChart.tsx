import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useCalculator } from '../../context/CalculatorContext';
import { complianceFrameworks } from '../../api/vendorData';

interface ComplianceRadarChartProps {
  height?: number;
  width?: number;
}

const ComplianceRadarChart: React.FC<ComplianceRadarChartProps> = ({ 
  height = 400, 
  width = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  useEffect(() => {
    if (!svgRef.current || !calculationResults || !calculationResults.vendorResults) return;
    
    // Get Portnox and top competitor for comparison
    const portnox = calculationResults.vendorResults.find(v => v.vendorId === 'portnox');
    if (!portnox) return;
    
    // Get top competitor (highest TCO other than Portnox)
    const competitors = calculationResults.vendorResults
      .filter(v => v.vendorId !== 'portnox')
      .sort((a, b) => b.totalTco - a.totalTco);
    
    const topCompetitor = competitors.length > 0 ? competitors[0] : null;
    
    // Get compliance requirements from Portnox
    const complianceScores = portnox.complianceScores || {};
    const frameworks = Object.keys(complianceScores);
    
    if (frameworks.length === 0) return;
    
    // Setup visualization parameters
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous content
    
    const margin = 70;
    const chartWidth = width - margin * 2;
    const chartHeight = height - margin * 2;
    const radius = Math.min(chartWidth, chartHeight) / 2;
    
    // Create SVG element
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // Calculate angle for each framework
    const angleSlice = Math.PI * 2 / frameworks.length;
    
    // Create scale for radius
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);
    
    // Create axis grid
    const axisGrid = g.append('g').attr('class', 'axis-grid');
    
    // Draw background circles
    const circles = [20, 40, 60, 80, 100];
    
    circles.forEach(d => {
      axisGrid.append('circle')
        .attr('r', rScale(d))
        .attr('fill', 'none')
        .attr('stroke', '#CDCDCD')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '4,4');
    });
    
    // Draw axis lines
    const axis = axisGrid.selectAll('.axis')
      .data(frameworks)
      .enter()
      .append('g')
      .attr('class', 'axis');
    
    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('stroke', '#CDCDCD')
      .attr('stroke-width', 1);
    
    axis.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => rScale(110) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y', (d, i) => rScale(110) * Math.sin(angleSlice * i - Math.PI/2))
      .text(d => complianceFrameworks[d]?.name || d)
      .attr('fill', '#666')
      .style('font-size', '10px');
    
    // Create radar line generator
    const radarLine = d3.lineRadial<number>()
      .radius(d => rScale(d))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);
    
    // Add radar background blur effect
    const defs = g.append('defs');
    
    // Draw Portnox radar area
    const portnoxValues = frameworks.map(f => portnox.complianceScores?.[f] || 0);
    
    // Create Portnox gradient
    const portnoxGradientId = 'portnox-gradient';
    const portnoxGradient = defs.append('radialGradient')
      .attr('id', portnoxGradientId)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius);
    
    portnoxGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#2BD25B')
      .attr('stop-opacity', 0.6);
    
    portnoxGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2BD25B')
      .attr('stop-opacity', 0.2);
    
    // Create Portnox radar path
    g.append('path')
      .datum(portnoxValues)
      .attr('class', 'radar-area')
      .attr('d', radarLine)
      .attr('fill', `url(#${portnoxGradientId})`)
      .attr('stroke', '#2BD25B')
      .attr('stroke-width', 2)
      .style('opacity', 0.7);
    
    // Add Portnox circle points at each data point
    g.selectAll('.portnox-circle')
      .data(portnoxValues)
      .enter()
      .append('circle')
      .attr('class', 'portnox-circle')
      .attr('r', 4)
      .attr('cx', (d, i) => rScale(d) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('cy', (d, i) => rScale(d) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('fill', '#2BD25B');
    
    // If we have a competitor, draw their radar area too
    if (topCompetitor) {
      const competitorValues = frameworks.map(f => topCompetitor.complianceScores?.[f] || 0);
      
      // Create competitor gradient
      const competitorGradientId = 'competitor-gradient';
      const competitorGradient = defs.append('radialGradient')
        .attr('id', competitorGradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius);
      
      competitorGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#1B67B2')
        .attr('stop-opacity', 0.6);
      
      competitorGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#1B67B2')
        .attr('stop-opacity', 0.2);
      
      // Create competitor radar path
      g.append('path')
        .datum(competitorValues)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .attr('fill', `url(#${competitorGradientId})`)
        .attr('stroke', '#1B67B2')
        .attr('stroke-width', 2)
        .style('opacity', 0.7);
      
      // Add competitor circle points at each data point
      g.selectAll('.competitor-circle')
        .data(competitorValues)
        .enter()
        .append('circle')
        .attr('class', 'competitor-circle')
        .attr('r', 4)
        .attr('cx', (d, i) => rScale(d) * Math.cos(angleSlice * i - Math.PI/2))
        .attr('cy', (d, i) => rScale(d) * Math.sin(angleSlice * i - Math.PI/2))
        .attr('fill', '#1B67B2');
    }
    
    // Create legend
    const legend = g.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${-width/2 + 50}, ${-height/2 + 20})`);
    
    // Portnox legend item
    const portnoxLegend = legend.append('g')
      .attr('class', 'legend-item');
    
    portnoxLegend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', '#2BD25B');
    
    portnoxLegend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text(portnox.name)
      .attr('fill', '#666')
      .style('font-size', '12px');
    
    // Competitor legend item if available
    if (topCompetitor) {
      const competitorLegend = legend.append('g')
        .attr('class', 'legend-item')
        .attr('transform', 'translate(0, 20)');
      
      competitorLegend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#1B67B2');
      
      competitorLegend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(topCompetitor.name)
        .attr('fill', '#666')
        .style('font-size', '12px');
    }
    
  }, [calculationResults, width, height]);
  
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="text-lg font-semibold mb-2">Compliance Framework Coverage</h3>
      </div>
      <div className="radar-chart-container flex justify-center">
        <svg ref={svgRef} height={height} width={width}></svg>
      </div>
    </div>
  );
};

export default ComplianceRadarChart;
