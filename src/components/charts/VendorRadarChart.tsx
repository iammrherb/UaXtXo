import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

interface VendorRadarChartProps {
  vendorId?: string;
  height?: number;
  width?: number;
  compareToAll?: boolean;
}

interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  roi: number;
  implementationDays: number;
  securityImprovement: number;
  paybackPeriod: number;
  featureScores: Record<string, number>;
  badge?: string;
  deployment: string;
}

// Definition for feature category metadata
interface FeatureCategory {
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Feature categories with descriptions and colors
const FEATURES: Record<string, FeatureCategory> = {
  threatPrevention: {
    name: 'Threat Prevention',
    description: 'Ability to detect and prevent network threats',
    icon: '🛡️',
    color: '#F87171' // red-400
  },
  zeroTrust: {
    name: 'Zero Trust',
    description: 'Implementation of zero trust security principles',
    icon: '🔒',
    color: '#60A5FA' // blue-400
  },
  deviceDiscovery: {
    name: 'Device Discovery',
    description: 'Capability to discover and identify devices',
    icon: '🔍',
    color: '#34D399' // green-400
  },
  cloudNative: {
    name: 'Cloud Native',
    description: 'Level of cloud-native architecture and functionality',
    icon: '☁️',
    color: '#A78BFA' // purple-400
  },
  userExperience: {
    name: 'User Experience',
    description: 'Overall ease of use and user satisfaction',
    icon: '👤',
    color: '#FBBF24' // yellow-400
  },
  remoteAccess: {
    name: 'Remote Access',
    description: 'Support for secure remote access',
    icon: '🌐',
    color: '#EC4899' // pink-400
  },
  compliance: {
    name: 'Compliance',
    description: 'Regulatory compliance capabilities',
    icon: '📋',
    color: '#6EE7B7' // emerald-300
  },
  managementSimplicity: {
    name: 'Management',
    description: 'Ease of management and administration',
    icon: '⚙️',
    color: '#93C5FD' // blue-300
  }
};

const VendorRadarChart: React.FC<VendorRadarChartProps> = ({
  vendorId = 'portnox',
  height = 500,
  width = 650,
  compareToAll = false
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Calculate max and average scores for each feature
  const { vendorData, competitorData, avgCompetitorScores } = useMemo(() => {
    const result = {
      vendorData: null as VendorResult | null,
      competitorData: [] as VendorResult[],
      avgCompetitorScores: {} as Record<string, number>
    };
    
    if (!calculationResults?.vendorResults) return result;
    
    // Find the selected vendor
    result.vendorData = calculationResults.vendorResults.find(
      (v: VendorResult) => v.vendorId === vendorId
    ) || null;
    
    // Get competitors (excluding selected vendor)
    result.competitorData = calculationResults.vendorResults.filter(
      (v: VendorResult) => v.vendorId !== vendorId && v.vendorId !== 'no-nac'
    );
    
    // Calculate average scores for competitors
    if (result.competitorData.length > 0) {
      Object.keys(FEATURES).forEach(feature => {
        let sum = 0;
        let count = 0;
        
        result.competitorData.forEach(competitor => {
          if (competitor.featureScores && competitor.featureScores[feature] !== undefined) {
            sum += competitor.featureScores[feature];
            count++;
          }
        });
        
        result.avgCompetitorScores[feature] = count > 0 ? sum / count : 0;
      });
    }
    
    return result;
  }, [calculationResults, vendorId]);
  
  // Draw radar chart
  useEffect(() => {
    if (!svgRef.current || !vendorData) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();
    
    // Setup
    const margin = { top: 70, right: 70, bottom: 70, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
    
    // Filter features with data
    const featureKeys = Object.keys(FEATURES).filter(key => 
      vendorData.featureScores && vendorData.featureScores[key] !== undefined
    );
    
    // Set up scales and angles
    const angleSlice = Math.PI * 2 / featureKeys.length;
    
    const rScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, radius]);
    
    // Draw circular grid
    const axisGrid = svg.append('g').attr('class', 'axis-grid');
    
    // Draw background circles
    const circles = [2, 4, 6, 8, 10];
    
    circles.forEach((d: number) => {
      axisGrid.append('circle')
        .attr('r', rScale(d))
        .attr('fill', 'none')
        .attr('stroke', '#ddd')
        .attr('stroke-width', 0.5);
      
      // Add value labels for radar levels
      if (d % 2 === 0) {
        axisGrid.append('text')
          .attr('x', 4)
          .attr('y', -rScale(d))
          .attr('dy', '0.4em')
          .style('font-size', '10px')
          .style('fill', '#666')
          .style('text-anchor', 'middle')
          .text(d.toString());
      }
    });
    
    // Draw axes
    const axes = axisGrid.selectAll('.axis')
      .data(featureKeys)
      .enter()
      .append('g')
      .attr('class', 'axis');
    
    // Draw axis lines
    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d: string, i: number) => rScale(10) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (d: string, i: number) => rScale(10) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('stroke', '#ddd')
      .attr('stroke-width', 1);
    
    // Draw axis labels
    axes.append('text')
      .attr('class', 'legend')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d: string, i: number) => (rScale(10) + 20) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y', (d: string, i: number) => (rScale(10) + 20) * Math.sin(angleSlice * i - Math.PI/2))
      .style('font-size', '12px')
      .style('fill', (d: string) => FEATURES[d].color)
      .text((d: string) => FEATURES[d].name);
    
    // Data wrangling function
    const getPathCoordinates = (data: VendorResult) => {
      const coordinates = featureKeys.map((key, i) => {
        const value = data.featureScores?.[key] || 0;
        const angle = angleSlice * i - Math.PI/2;
        return {
          x: rScale(value) * Math.cos(angle),
          y: rScale(value) * Math.sin(angle)
        };
      });
      return coordinates;
    };
    
    // Generate the line function
    const radarLine = d3.lineRadial<{key: string, value: number}>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);
    
    // Draw area for the selected vendor
    const vendorCoordinates = getPathCoordinates(vendorData);
    
    const createRadarPath = (coordinates: {x: number, y: number}[], fillColor: string, strokeColor: string, opacity: number) => {
      // Create path
      const path = svg.append('path')
        .datum(coordinates)
        .attr('d', d => {
          let pathData = 'M' + d[0].x + ',' + d[0].y;
          for (let i = 1; i < d.length; i++) {
            pathData += ' L' + d[i].x + ',' + d[i].y;
          }
          pathData += ' Z';
          return pathData;
        })
        .attr('fill', fillColor)
        .attr('fill-opacity', opacity)
        .attr('stroke', strokeColor)
        .attr('stroke-width', 2);
      
      // Animate path drawing
      const totalLength = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);
      
      return path;
    };
    
    // Create vendor area
    createRadarPath(
      vendorCoordinates, 
      '#2BD25B20', // Green with transparency
      '#2BD25B',   // Solid green stroke
      0.8
    );
    
    // If comparing to all vendors, draw average competitor area
    if (compareToAll && Object.keys(avgCompetitorScores).length > 0) {
      // Create average competitor data
      const avgCompetitor = {
        vendorId: 'average',
        name: 'Average Competitor',
        featureScores: avgCompetitorScores,
        totalTco: 0,
        roi: 0,
        implementationDays: 0,
        securityImprovement: 0,
        paybackPeriod: 0,
        deployment: ''
      };
      
      const avgCoordinates = getPathCoordinates(avgCompetitor);
      
      // Create average competitor area
      createRadarPath(
        avgCoordinates, 
        '#1B67B220', // Blue with transparency
        '#1B67B2',   // Solid blue stroke
        0.6
      );
    }
    
    // Draw circles for data points
    vendorCoordinates.forEach((point, i) => {
      const feature = featureKeys[i];
      const value = vendorData.featureScores?.[feature] || 0;
      
      svg.append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', 0) // Start with radius 0
        .attr('fill', '#2BD25B')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .on('mouseover', function(event: any) {
          d3.select(this).attr('r', 6);
          
          // Show tooltip
          const tooltip = d3.select(tooltipRef.current)
            .style('opacity', 0)
            .style('display', 'block')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '4px')
            .style('padding', '8px')
            .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)')
            .style('pointer-events', 'none')
            .style('font-size', '12px')
            .style('z-index', '100');
          
          tooltip.html(`
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="margin-right: 4px; font-size: 14px;">${FEATURES[feature].icon}</span>
              <span style="font-weight: bold; color: ${FEATURES[feature].color};">${FEATURES[feature].name}</span>
            </div>
            <div>${FEATURES[feature].description}</div>
            <div style="margin-top: 4px; font-weight: bold;">${vendorData.name}: ${value * 10}%</div>
            ${compareToAll ? `<div>Avg. Competitor: ${(avgCompetitorScores[feature] || 0) * 10}%</div>` : ''}
          `);
          
          // Position tooltip near the mouse
          tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 15) + 'px')
            .transition()
            .duration(200)
            .style('opacity', 1);
        })
        .on('mouseout', function() {
          d3.select(this).attr('r', 4);
          
          // Hide tooltip
          d3.select(tooltipRef.current)
            .transition()
            .duration(200)
            .style('opacity', 0)
            .on('end', function() {
              d3.select(tooltipRef.current).style('display', 'none');
            });
        })
        .transition()
        .delay(i * 100)
        .duration(500)
        .attr('r', 4);
    });
    
    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${-radius}, ${-radius - 30})`);
    
    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#2BD25B20')
      .attr('stroke', '#2BD25B');
    
    legend.append('text')
      .attr('x', 18)
      .attr('y', 9)
      .attr('dy', '0.1em')
      .style('font-size', '10px')
      .style('fill', '#333')
      .text(vendorData.name);
    
    if (compareToAll) {
      const competitorLegend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${-radius}, ${-radius - 10})`);
      
      competitorLegend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', '#1B67B220')
        .attr('stroke', '#1B67B2');
      
      competitorLegend.append('text')
        .attr('x', 18)
        .attr('y', 9)
        .attr('dy', '0.1em')
        .style('font-size', '10px')
        .style('fill', '#333')
        .text('Average Competitor');
    }
    
    // Add title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -radius - 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Feature Comparison');
    
  }, [svgRef, tooltipRef, vendorData, competitorData, avgCompetitorScores, compareToAll, width, height]);
  
  if (!vendorData) {
    return (
      <div className="chart-container p-4 text-center">
        <div className="text-lg font-bold">Feature Comparison</div>
        <div className="text-gray-500 mt-4">No data available for this vendor</div>
      </div>
    );
  }
  
  return (
    <div className="chart-container">
      <div className="mb-4 text-center">
        <div className="text-lg font-bold">{vendorData.name} Feature Analysis</div>
        <div className="text-sm text-gray-600">Capability scores on a scale of 0-10</div>
      </div>
      <div className="relative">
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} className="absolute pointer-events-none opacity-0"></div>
      </div>
    </div>
  );
};

export default VendorRadarChart;
