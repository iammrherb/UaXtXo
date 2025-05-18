import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useCalculator } from '../../context/CalculatorContext';
import { vendorData } from '../../api/vendorData';

interface VendorRadarChartProps {
  height?: number;
  width?: number;
}

// Define vendor features interface
interface VendorFeatures {
  cloudNative: number;
  zeroTrust: number;
  deploymentSpeed: number;
  managementSimplicity: number;
  scalability: number;
  remoteAccess: number;
  compliance: number;
  costEffectiveness: number;
  threatPrevention: number;
  deviceDiscovery: number;
  userExperience: number;
  thirdPartyIntegration: number;
  [key: string]: number; // Index signature to allow string indexing
}

// Define vendor data interface
interface VendorData {
  id: string;
  name: string;
  features: VendorFeatures;
  [key: string]: any;
}

const VendorRadarChart: React.FC<VendorRadarChartProps> = ({ 
  height = 400, 
  width = 600 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { state } = useCalculator();
  const { selectedVendors, calculationResults } = state;
  
  useEffect(() => {
    if (!svgRef.current || selectedVendors.length === 0) return;
    
    // Get selected vendor data
    const selectedVendorData = selectedVendors
      .filter((id: string) => vendorData[id])
      .map((id: string) => vendorData[id] as VendorData);
    
    // Define feature categories for radar chart
    const features = [
      'cloudNative',
      'zeroTrust',
      'deploymentSpeed',
      'managementSimplicity',
      'scalability',
      'remoteAccess',
      'compliance',
      'costEffectiveness'
    ];
    
    const featureLabels: {[key: string]: string} = {
      'cloudNative': 'Cloud-Native',
      'zeroTrust': 'Zero Trust',
      'deploymentSpeed': 'Speed',
      'managementSimplicity': 'Simplicity',
      'scalability': 'Scalability',
      'remoteAccess': 'Remote Access',
      'compliance': 'Compliance',
      'costEffectiveness': 'Cost-Effectiveness'
    };
    
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
    
    // Calculate angle for each feature
    const angleSlice = Math.PI * 2 / features.length;
    
    // Create scale for radius
    const rScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, radius]);
    
    // Create axis grid
    const axisGrid = g.append('g').attr('class', 'axis-grid');
    
    // Draw background circles
    const circles = [2, 4, 6, 8, 10];
    
    circles.forEach((d: VendorResultType) => {
      axisGrid.append('circle')
        .attr('r', rScale(d))
        .attr('fill', 'none')
        .attr('stroke', '#CDCDCD')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '4,4');
    });
    
    // Draw axis lines
    const axis = axisGrid.selectAll('.axis')
      .data(features)
      .enter()
      .append('g')
      .attr('class', 'axis');
    
    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(10) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (d, i) => rScale(10) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('stroke', '#CDCDCD')
      .attr('stroke-width', 1);
    
    axis.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => rScale(10.5) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y', (d, i) => rScale(10.5) * Math.sin(angleSlice * i - Math.PI/2))
      .text(d => featureLabels[d] || d)
      .attr('fill', '#666')
      .style('font-size', '10px');
    
    // Create radar line generator
    const radarLine = d3.lineRadial<number>()
      .radius(d => rScale(d))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);
    
    // Add radar background blur effect
    const defs = g.append('defs');
    
    // Color palette for vendors
    const colors = ['#8884D8', '#82CA9D', '#FFC658', '#FF8042', '#A4DE6C'];
    
    // Draw radar areas for each vendor
    selectedVendorData.forEach((vendor: VendorData, i: number) => {
      // Assign Portnox a specific color (green)
      const color = vendor.id === 'portnox' ? '#2BD25B' : colors[i % colors.length];
      
      const dataValues = features.map((f: string) => {
        // Ensure the feature exists
        if (typeof vendor.features[f] === 'number') {
          return vendor.features[f];
        }
        return 0; // Default value if feature doesn't exist
      });
      
      // Create gradient
      const gradientId = `radar-gradient-${i}`;
      const gradient = defs.append('radialGradient')
        .attr('id', gradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius);
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.6);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.2);
      
      // Create radar path
      g.append('path')
        .datum(dataValues)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .attr('fill', `url(#${gradientId})`)
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .style('opacity', 0.7);
      
      // Add circle points at each data point
      g.selectAll(`.radar-circle-${i}`)
        .data(dataValues)
        .enter()
        .append('circle')
        .attr('class', `radar-circle-${i}`)
        .attr('r', 4)
        .attr('cx', (d, j) => rScale(d) * Math.cos(angleSlice * j - Math.PI/2))
        .attr('cy', (d, j) => rScale(d) * Math.sin(angleSlice * j - Math.PI/2))
        .attr('fill', color);
    });
    
    // Create legend
    const legend = g.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${-width/2 + 50}, ${-height/2 + 20})`)
      .selectAll('.legend-item')
      .data(selectedVendorData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);
    
    legend.append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => d.id === 'portnox' ? '#2BD25B' : colors[i % colors.length]);
    
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text(d => d.name)
      .attr('fill', '#666')
      .style('font-size', '12px');
    
  }, [selectedVendors, calculationResults, width, height]);
  
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="text-lg font-semibold mb-2">Solution Capabilities Comparison</h3>
      </div>
      <div className="radar-chart-container flex justify-center">
        <svg ref={svgRef} height={height} width={width}></svg>
      </div>
    </div>
  );
};

export default VendorRadarChart;
