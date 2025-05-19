// @ts-nocheck
import React, { useMemo, useEffect, useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import * as d3 from 'd3';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface SecurityImpactChartProps {
  height?: number;
  width?: number;
}

// Define VendorResult interface
interface VendorResult {
  vendorId: string;
  name: string;
  logo: string;
  featureScores: {
    threatPrevention: number;
    zeroTrust: number;
    deviceDiscovery: number;
    cloudNative: number;
    remoteAccess: number;
    compliance: number;
    managementSimplicity: number;
    deploymentSpeed: number;
    userExperience: number;
  };
  securityImprovement: number;
  riskReductionValue: number;
  badge?: string;
}

const SecurityImpactChart: React.FC<SecurityImpactChartProps> = ({ 
  height = 500, 
  width = 800 
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!calculationResults || !calculationResults.vendorResults || !svgRef.current) {
      return;
    }
    
    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Get Portnox and top competitors (limit to 4 competitors)
    const portnox = calculationResults.vendorResults.find((r: VendorResult) => r.vendorId === 'portnox');
    if (!portnox) return;
    
    const competitors = calculationResults.vendorResults
      .filter((r: VendorResult) => r.vendorId !== 'portnox')
      .sort((a: VendorResult, b: VendorResult) => b.securityImprovement - a.securityImprovement)
      .slice(0, 3); // Limit to top 3 competitors
    
    const vendors = [portnox, ...competitors];
    
    // Define the security capabilities to show
    const capabilities = [
      { key: 'threatPrevention', label: 'Threat Prevention' },
      { key: 'zeroTrust', label: 'Zero Trust' },
      { key: 'deviceDiscovery', label: 'Device Discovery' },
      { key: 'cloudNative', label: 'Cloud Native' },
      { key: 'remoteAccess', label: 'Remote Access' },
      { key: 'compliance', label: 'Compliance' },
      { key: 'managementSimplicity', label: 'Management' },
      { key: 'deploymentSpeed', label: 'Deployment Speed' }
    ];
    
    // Setup visualization parameters
    const margin = { top: 80, right: 100, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    
    // Create a group for the radar chart
    const g = svg.append("g")
      .attr("transform", `translate(${width/2}, ${height/2})`);
    
    // Calculate angle for each capability
    const angleSlice = Math.PI * 2 / capabilities.length;
    
    // Create scale for radius
    const rScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, radius]);
    
    // Create the background circles
    const levels = 5; // Number of concentric circles
    const axisGrid = g.append("g").attr("class", "axis-grid");
    
    // Draw background circles with alternating background
    for (let j = 0; j < levels; j++) {
      const levelFactor = radius * ((j + 1) / levels);
      
      // Draw the circular levels
      axisGrid.append("circle")
        .attr("r", levelFactor)
        .attr("fill", j % 2 === 0 ? "rgba(240, 240, 240, 0.3)" : "rgba(220, 220, 220, 0.3)")
        .attr("stroke", "rgba(200, 200, 200, 0.8)")
        .attr("stroke-width", 0.5);
      
      // Add labels for each level
      if (j === levels - 1 || j === 0) {
        axisGrid.append("text")
          .attr("x", 0)
          .attr("y", -levelFactor - 5)
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .attr("fill", "#666")
          .text(j === 0 ? "0" : "10");
      }
    }
    
    // Draw axis lines
    const axis = axisGrid.selectAll(".axis")
      .data(capabilities)
      .enter()
      .append("g")
      .attr("class", "axis");
    
    // Draw axis lines
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d: any, i: number) => radius * Math.cos(angleSlice * i - Math.PI/2))
      .attr("y2", (d: any, i: number) => radius * Math.sin(angleSlice * i - Math.PI/2))
      .attr("stroke", "rgba(120, 120, 120, 0.5)")
      .attr("stroke-width", 1);
    
    // Draw axis labels
    axis.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d: any, i: number) => (radius + 20) * Math.cos(angleSlice * i - Math.PI/2))
      .attr("y", (d: any, i: number) => (radius + 20) * Math.sin(angleSlice * i - Math.PI/2))
      .attr("fill", "#333")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .text((d: any) => d.label);
    
    // Create radar line generator
    const radarLine = d3.lineRadial<{key: string; value: number; angle: number}>()
      .radius(d => rScale(d.value))
      .angle(d => d.angle)
      .curve(d3.curveLinearClosed);
    
    // Create color scale for vendors
    const colorScale = d3.scaleOrdinal<string>()
      .domain(vendors.map(d => d.vendorId))
      .range([
        "#2BD25B", // Portnox green
        "#1B67B2", // Blue
        "#FF9800", // Orange
        "#9C27B0"  // Purple
      ]);
    
    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("z-index", "10");
    
    // Create defs for patterns and filters
    const defs = svg.append("defs");
    
    // Add drop shadow filter
    const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
    
    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");
    
    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");
    
    const feComponentTransfer = filter.append("feComponentTransfer")
      .attr("in", "offsetBlur");
      
    feComponentTransfer.append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.5);
      
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
    
    // Create patterns for vendor logos
    vendors.forEach((vendor: VendorResult, i: number) => {
      // Extract logo path (placeholder logic - adjust based on your actual path structure)
      const logoPath = vendor.logo || `/img/vendors/${vendor.vendorId}-logo.png`;
      
      // Create pattern for vendor
      defs.append("pattern")
        .attr("id", `vendor-logo-${vendor.vendorId}`)
        .attr("width", 1)
        .attr("height", 1)
        .attr("patternUnits", "objectBoundingBox")
        .append("image")
        .attr("href", logoPath)
        .attr("width", 40)
        .attr("height", 40)
        .attr("preserveAspectRatio", "xMidYMid slice");
    });
    
    // Draw radar areas for each vendor
    vendors.forEach((vendor: VendorResult, i: number) => {
      // Prepare data points for radar
      const dataPoints = capabilities.map((capability: any, j: number) => {
        return {
          key: capability.key,
          value: vendor.featureScores[capability.key as keyof typeof vendor.featureScores] as number,
          angle: angleSlice * j
        };
      });
      
      // Create gradient for each vendor
      const gradientId = `radar-gradient-${vendor.vendorId}`;
      const gradient = defs.append("radialGradient")
        .attr("id", gradientId)
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", radius)
        .attr("gradientUnits", "userSpaceOnUse");
      
      const vendorColor = colorScale(vendor.vendorId);
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", vendorColor)
        .attr("stop-opacity", 0.7);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", vendorColor)
        .attr("stop-opacity", 0.1);
      
      // Create radar path
      g.append("path")
        .datum(dataPoints)
        .attr("class", `radar-area radar-area-${vendor.vendorId}`)
        .attr("d", d => radarLine(d) || "")
        .attr("fill", `url(#${gradientId})`)
        .attr("stroke", vendorColor)
        .attr("stroke-width", vendor.vendorId === 'portnox' ? 3 : 1.5)
        .attr("filter", vendor.vendorId === 'portnox' ? "url(#drop-shadow)" : "none")
        .style("pointer-events", "all")
        .style("opacity", 0.8)
        .on("mouseover", function(event: any) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1);
          
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(event: any) {
          tooltip
            .html(`
              <div style="text-align: center; font-weight: bold; margin-bottom: 8px; color: ${vendorColor};">
                ${vendor.name}
              </div>
              <div style="display: grid; grid-template-columns: 2fr 1fr; grid-gap: 4px;">
                ${capabilities.map((capability: any) => `
                  <div>${capability.label}:</div>
                  <div style="text-align: right; font-weight: bold;">
                    ${vendor.featureScores[capability.key as keyof typeof vendor.featureScores] * 10}%
                  </div>
                `).join('')}
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
                <div>Security Improvement: <strong>${Math.round(vendor.securityImprovement)}%</strong></div>
                <div>Risk Reduction Value: <strong>${formatCurrency(vendor.riskReductionValue)}</strong></div>
              </div>
              ${vendor.badge ? `<div style="margin-top: 8px; text-align: center; font-weight: bold; color: ${vendorColor};">${vendor.badge}</div>` : ''}
            `)
            .style("left", `${event.pageX + 15}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", function(event: any) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.8);
          
          tooltip.style("visibility", "hidden");
        });
      
      // Add circle points at each data point
      g.selectAll(`.radar-circle-${vendor.vendorId}`)
        .data(dataPoints)
        .enter()
        .append("circle")
        .attr("class", `radar-circle radar-circle-${vendor.vendorId}`)
        .attr("r", 4)
        .attr("cx", (d: any) => rScale(d.value) * Math.cos(d.angle - Math.PI/2))
        .attr("cy", (d: any) => rScale(d.value) * Math.sin(d.angle - Math.PI/2))
        .attr("fill", vendorColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
      
      // Add logos for each vendor
      const logoSize = 50;
      
      // Calculate position based on the first data point (first capability)
      // Adjust for better visual placement
      const logoAngle = -Math.PI/2 + (i * Math.PI/2); // Distribute around the chart
      const logoDistance = radius + 50; // Place outside the chart
      const logoX = logoDistance * Math.cos(logoAngle);
      const logoY = logoDistance * Math.sin(logoAngle);
      
      // Add logo circle with vendor logo pattern
      g.append("circle")
        .attr("cx", logoX)
        .attr("cy", logoY)
        .attr("r", logoSize / 2)
        .attr("fill", `url(#vendor-logo-${vendor.vendorId})`)
        .attr("stroke", vendorColor)
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("mouseover", function(event: any) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", logoSize / 2 + 2);
          
          // Highlight this vendor's radar
          d3.select(`.radar-area-${vendor.vendorId}`)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .attr("filter", "url(#drop-shadow)");
          
          // Fade other vendor radars
          vendors.forEach((v: VendorResult) => {
            if (v.vendorId !== vendor.vendorId) {
              d3.select(`.radar-area-${v.vendorId}`)
                .transition()
                .duration(200)
                .style("opacity", 0.3);
            }
          });
        })
        .on("mouseout", function(event: any) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", logoSize / 2);
          
          // Reset all radars
          vendors.forEach((v: VendorResult) => {
            d3.select(`.radar-area-${v.vendorId}`)
              .transition()
              .duration(200)
              .style("opacity", 0.8)
              .attr("filter", v.vendorId === 'portnox' ? "url(#drop-shadow)" : "none");
          });
        });
      
      // Add vendor name below logo if not at the top
      if (logoY > -radius) {
        g.append("text")
          .attr("x", logoX)
          .attr("y", logoY + logoSize / 2 + 15)
          .attr("text-anchor", "middle")
          .attr("fill", vendorColor)
          .attr("font-weight", "bold")
          .attr("font-size", "12px")
          .text(vendor.name);
      } else {
        g.append("text")
          .attr("x", logoX)
          .attr("y", logoY - logoSize / 2 - 10)
          .attr("text-anchor", "middle")
          .attr("fill", vendorColor)
          .attr("font-weight", "bold")
          .attr("font-size", "12px")
          .text(vendor.name);
      }
    });
    
    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Security Capabilities Comparison");
    
    // Add subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "normal")
      .attr("fill", "#666")
      .text("Higher scores indicate better capability (scale: 0-10)");
    
    // Add legend
    const legendSpacing = 150;
    const legendY = height - 30;
    const legendX = width / 2 - ((vendors.length - 1) * legendSpacing) / 2;
    
    vendors.forEach((vendor: VendorResult, i: number) => {
      const currentX = legendX + i * legendSpacing;
      const vendorColor = colorScale(vendor.vendorId);
      
      // Legend color box
      svg.append("rect")
        .attr("x", currentX - 50)
        .attr("y", legendY)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", vendorColor);
      
      // Legend text
      svg.append("text")
        .attr("x", currentX - 30)
        .attr("y", legendY + 9)
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(vendor.name);
    });
    
    // Add animations
    g.selectAll(".radar-area")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 0.8);
    
    g.selectAll(".radar-circle")
      .attr("r", 0)
      .transition()
      .delay((d: any, i: number) => i * 50)
      .duration(500)
      .attr("r", 4);
    
  }, [calculationResults, width, height]);
  
  return (
    <div className="chart-container">
      <div className="chart-title text-center text-xl font-bold mb-2">
        Security Impact Assessment
      </div>
      <div className="chart-content relative">
        <svg ref={svgRef} width={width} height={height}></svg>
        <div ref={tooltipRef}></div>
      </div>
    </div>
  );
};

export default SecurityImpactChart;
