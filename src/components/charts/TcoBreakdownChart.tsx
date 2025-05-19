import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import Chart from 'react-apexcharts';
import * as d3 from 'd3';

interface TcoBreakdownChartProps {
  vendorId?: string; // Optional - defaults to Portnox if not specified
  height?: number;
}

// Define VendorResult interface
interface VendorResult {
  vendorId: string;
  name: string;
  totalTco: number;
  costBreakdown: {
    licenses: number;
    maintenance: number;
    implementation: number;
    operations: number;
    hardware: number;
    infrastructure: number;
  };
  badge?: string;
  badgeClass?: string;
  deployment: string;
}

// Define cost category details
interface CostCategoryDetail {
  name: string;
  description: string;
  icon: string;
  color: string;
  helpText: string;
}

const TcoBreakdownChart: React.FC<TcoBreakdownChartProps> = ({ 
  vendorId = 'portnox',
  height = 400 
}) => {
  const { state } = useCalculator();
  const { calculationResults } = state;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showDetailView, setShowDetailView] = useState<boolean>(false);
  const detailChartRef = useRef<HTMLDivElement>(null);
  
  // Define cost categories with descriptions and icons
  const costCategories: Record<string, CostCategoryDetail> = {
    licenses: {
      name: 'Licenses & Subscriptions',
      description: 'Costs associated with software licenses or subscription fees',
      icon: '💾',
      color: '#8884D8',
      helpText: 'Includes annual subscriptions, perpetual licenses, and user-based licensing costs.'
    },
    maintenance: {
      name: 'Maintenance',
      description: 'Annual maintenance, support, and software update fees',
      icon: '🔧',
      color: '#FFC658',
      helpText: 'Typically ranges from 15-25% of perpetual license costs annually.'
    },
    implementation: {
      name: 'Implementation',
      description: 'One-time deployment and professional services costs',
      icon: '🚀',
      color: '#82CA9D',
      helpText: 'Includes installation, configuration, and integration services.'
    },
    operations: {
      name: 'Operations',
      description: 'Ongoing operational staffing and management costs',
      icon: '👥',
      color: '#FF8042',
      helpText: 'Based on FTE (Full-Time Equivalent) allocation required to manage the solution.'
    },
    hardware: {
      name: 'Hardware',
      description: 'Physical appliances and server infrastructure costs',
      icon: '🖥️',
      color: '#F25C78',
      helpText: 'Required for on-premises deployments; not applicable to cloud solutions.'
    },
    infrastructure: {
      name: 'Infrastructure',
      description: 'Data center, power, cooling, and rack space expenses',
      icon: '🏢',
      color: '#5CC8FF',
      helpText: 'Ongoing costs to host and maintain physical infrastructure.'
    }
  };
  
  // Primary chart options for the pie chart
  const chartOptions: any = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) {
      return {
        labels: ['No Data Available'],
        series: [100],
        chart: {
          type: 'donut'
        }
      };
    }
    
    // Find the vendor data
    const vendor = calculationResults.vendorResults.find(
      (v: VendorResult) => v.vendorId === vendorId
    );
    
    if (!vendor) {
      return {
        labels: ['No Data Available'],
        series: [100],
        chart: {
          type: 'donut'
        }
      };
    }
    
    // Extract cost breakdown data
    const costBreakdown = vendor.costBreakdown;
    
    // Prepare chart data
    const labels: string[] = [];
    const series: number[] = [];
    const colors: string[] = [];
    
    Object.entries(costBreakdown).forEach(([key, value]: [string, number]) => {
      if (value > 0 && key in costCategories) {
        labels.push(costCategories[key].name);
        series.push(value);
        colors.push(costCategories[key].color);
      }
    });
    
    // Filter out zero values
    const filteredLabels: string[] = [];
    const filteredSeries: number[] = [];
    
    for (let i = 0; i < series.length; i++) {
      if (series[i] > 0) {
        filteredLabels.push(labels[i]);
        filteredSeries.push(series[i]);
      }
    }
    
    // Calculate percentages for each category
    const total = filteredSeries.reduce((sum, val) => sum + val, 0);
    const percentages = filteredSeries.map(val => ((val / total) * 100).toFixed(1) + '%');
    
    return {
      chart: {
        type: 'donut',
        height,
        fontFamily: 'Nunito, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        dropShadow: {
          enabled: true,
          color: '#111',
          top: 3,
          left: 3,
          blur: 3,
          opacity: 0.2
        },
        toolbar: {
          show: false
        },
        events: {
          dataPointSelection: function(event: any, chartContext: any, config: any) {
            const index = config.dataPointIndex;
            if (index >= 0 && index < Object.keys(costCategories).length) {
              const category = Object.keys(costCategories)[index];
              setActiveCategory(category);
              setShowDetailView(true);
              
              // Scroll to detail view
              if (detailChartRef.current) {
                detailChartRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Nunito, sans-serif',
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Nunito, sans-serif',
                formatter: (val: number) => formatCurrency(val)
              },
              total: {
                show: true,
                label: 'Total Cost',
                fontSize: '16px',
                fontFamily: 'Nunito, sans-serif',
                formatter: () => formatCurrency(total)
              }
            }
          },
          expandOnClick: true
        }
      },
      labels: filteredLabels,
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          const index = opts.dataPointIndex;
          return percentages[index];
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 'bold',
          colors: ['#fff']
        },
        dropShadow: {
          enabled: true
        }
      },
      colors: colors,
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        fontFamily: 'Nunito, sans-serif',
        markers: {
          strokeWidth: 0,
          strokeColor: '#fff',
          radius: 12,
          customHTML: function() {
            return '<span class="custom-legend-icon"></span>';
          }
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
        },
        onItemClick: {
          toggleDataSeries: false
        },
        formatter: function(seriesName: string, opts: any) {
          const index = opts.seriesIndex;
          return `${seriesName}: ${percentages[index]} (${formatCurrency(filteredSeries[index])})`;
        }
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => formatCurrency(val),
          title: {
            formatter: (seriesName: string) => seriesName
          }
        },
        custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
          const categoryKey = Object.keys(costCategories)[seriesIndex];
          const category = costCategories[categoryKey];
          
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header" style="display: flex; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                <span style="font-size: 18px; margin-right: 8px;">${category.icon}</span>
                <span style="font-weight: bold; font-size: 14px;">${category.name}</span>
              </div>
              <div class="tooltip-content" style="margin-bottom: 8px;">
                <div>${category.description}</div>
                <div style="font-weight: bold; margin-top: 5px;">${formatCurrency(filteredSeries[seriesIndex])}</div>
                <div style="font-size: 12px;">${percentages[seriesIndex]} of total cost</div>
              </div>
              <div class="tooltip-footer" style="font-size: 11px; color: #666; font-style: italic;">
                Click for detailed breakdown
              </div>
            </div>
          `;
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.1
          }
        },
        active: {
          filter: {
            type: 'darken',
            value: 0.35
          }
        }
      }
    };
  }, [calculationResults, vendorId, height]);
  
  // Get the data for the selected vendor
  const vendorData = useMemo(() => {
    if (!calculationResults || !calculationResults.vendorResults) return null;
    
    return calculationResults.vendorResults.find(
      (v: VendorResult) => v.vendorId === vendorId
    );
  }, [calculationResults, vendorId]);
  
  // Create the detailed breakdown charts using D3.js
  useEffect(() => {
    if (!showDetailView || !activeCategory || !detailChartRef.current || !vendorData) return;
    
    // Clear any existing content
    d3.select(detailChartRef.current).selectAll("*").remove();
    
    // Get category details
    const category = costCategories[activeCategory];
    const categoryValue = vendorData.costBreakdown[activeCategory as keyof typeof vendorData.costBreakdown];
    const totalCost = vendorData.totalTco;
    const percentage = ((categoryValue / totalCost) * 100).toFixed(1);
    
    // Create SVG for detailed visualization
    const width = detailChartRef.current.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    
    const svg = d3.select(detailChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto;");
    
    // Create detailed breakdown visualization based on category
    switch(activeCategory) {
      case 'licenses':
        createLicenseBreakdown(svg, width, height, margin, categoryValue, vendorData);
        break;
      case 'operations':
        createOperationsBreakdown(svg, width, height, margin, categoryValue, vendorData);
        break;
      case 'hardware':
        createHardwareBreakdown(svg, width, height, margin, categoryValue, vendorData);
        break;
      case 'implementation':
        createImplementationBreakdown(svg, width, height, margin, categoryValue, vendorData);
        break;
      default:
        createGenericBreakdown(svg, width, height, margin, categoryValue, vendorData, activeCategory);
    }
    
    // Add title and stats above the visualization
    const detailsContainer = d3.select(detailChartRef.current)
      .insert("div", "svg")
      .attr("class", "details-container")
      .style("margin-bottom", "20px")
      .style("padding", "15px")
      .style("background-color", "rgba(" + hexToRgb(category.color) + ", 0.1)")
      .style("border-radius", "8px")
      .style("border-left", `4px solid ${category.color}`);
    
    detailsContainer.append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("margin-bottom", "10px");
      
    detailsContainer.select("div")
      .append("span")
      .style("font-size", "24px")
      .style("margin-right", "10px")
      .text(category.icon);
      
    detailsContainer.select("div")
      .append("h3")
      .style("margin", "0")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("color", "#333")
      .text(category.name);
    
    detailsContainer.append("p")
      .style("margin", "0 0 15px 0")
      .style("color", "#666")
      .text(category.description);
    
    const statsGrid = detailsContainer.append("div")
      .style("display", "grid")
      .style("grid-template-columns", "repeat(auto-fit, minmax(150px, 1fr))")
      .style("gap", "15px")
      .style("margin-top", "15px");
    
    // Cost stat
    const costStat = statsGrid.append("div");
    costStat.append("div")
      .style("font-size", "12px")
      .style("color", "#666")
      .text("Total Cost");
    costStat.append("div")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("color", "#333")
      .text(formatCurrency(categoryValue));
    
    // Percentage stat
    const percentStat = statsGrid.append("div");
    percentStat.append("div")
      .style("font-size", "12px")
      .style("color", "#666")
      .text("Percentage of TCO");
    percentStat.append("div")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("color", "#333")
      .text(percentage + '%');
    
    // Annual cost (divided by 3 years)
    const annualStat = statsGrid.append("div");
    annualStat.append("div")
      .style("font-size", "12px")
      .style("color", "#666")
      .text("Annual Cost");
    annualStat.append("div")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("color", "#333")
      .text(formatCurrency(categoryValue / 3));
    
    // Add help text and close button
    const infoFooter = detailsContainer.append("div")
      .style("display", "flex")
      .style("justify-content", "space-between")
      .style("align-items", "center")
      .style("margin-top", "15px")
      .style("padding-top", "10px")
      .style("border-top", "1px solid rgba(0,0,0,0.05)");
    
    infoFooter.append("div")
      .style("font-size", "12px")
      .style("font-style", "italic")
      .style("color", "#666")
      .text(category.helpText);
    
    infoFooter.append("button")
      .attr("class", "close-detail-btn")
      .style("padding", "5px 10px")
      .style("background-color", "#f0f0f0")
      .style("border", "none")
      .style("border-radius", "4px")
      .style("cursor", "pointer")
      .text("Close Breakdown")
      .on("click", () => {
        setShowDetailView(false);
        setActiveCategory(null);
      });
      
  }, [showDetailView, activeCategory, vendorData, detailChartRef]);
  
  // Helper function to create license cost breakdown
  const createLicenseBreakdown = (svg: any, width: number, height: number, margin: any, value: number, vendor: VendorResult) => {
    // Create horizontal bar chart showing license costs over time
    const isSubscription = vendor.costBreakdown.maintenance === 0;
    
    // Create data for visualization
    let data = [];
    
    if (isSubscription) {
      // For subscription, show annual costs
      data = [
        { year: 'Year 1', cost: value / 3 },
        { year: 'Year 2', cost: value / 3 },
        { year: 'Year 3', cost: value / 3 }
      ];
    } else {
      // For perpetual licensing, show upfront with maintenance
      const maintenanceCost = vendor.costBreakdown.maintenance / 3; // annual maintenance
      const initialLicense = value; // upfront license cost
      
      data = [
        { year: 'Initial', cost: initialLicense },
        { year: 'Year 1', cost: maintenanceCost },
        { year: 'Year 2', cost: maintenanceCost },
        { year: 'Year 3', cost: maintenanceCost }
      ];
    }
    
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.cost) as number])
      .nice()
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);
    
    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", margin.left)
      .attr("y", d => y(d.year))
      .attr("width", 0) // Start at 0 for animation
      .attr("height", y.bandwidth())
      .attr("fill", costCategories.licenses.color)
      .attr("rx", 4)
      .attr("ry", 4)
      .transition()
      .duration(1000)
      .attr("width", d => x(d.cost) - margin.left);
    
    // Add labels
    svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 12)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => x(d.cost) - 5)
      .attr("y", d => (y(d.year) as number) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("opacity", 0)
      .text(d => formatCurrency(d.cost))
      .transition()
      .delay(500)
      .duration(500)
      .attr("opacity", 1);
    
    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(5).tickFormat(d => formatCurrency(d as number)))
      .call(g => g.select(".domain").remove());
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 14)
      .attr("fill", "#666")
      .text(isSubscription ? "Annual Subscription Costs" : "License and Maintenance Costs");
  };
  
  // Helper function to create operations breakdown
  const createOperationsBreakdown = (svg: any, width: number, height: number, margin: any, value: number, vendor: VendorResult) => {
    // For operations, show FTE allocation and costs
    const fteCost = value / 3; // Annual cost
    
    // Create a gauge chart showing FTE allocation
    const gaugeData = {
      value: 0.25, // Just an example - we'd need the actual FTE value here
      min: 0,
      max: 1
    };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2;
    
    // Create the gauge arc
    const arc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);
    
    // Create the value arc
    const valueArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(d => -Math.PI / 2 + Math.PI * (d.value / d.max));
    
    // Create a group for the gauge
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${margin.top + chartHeight / 2})`);
    
    // Add the background arc
    g.append("path")
      .datum({ value: gaugeData.value, min: gaugeData.min, max: gaugeData.max })
      .attr("d", arc as any)
      .attr("fill", "#e0e0e0");
    
    // Add the value arc with animation
    g.append("path")
      .datum({ value: 0, min: gaugeData.min, max: gaugeData.max })
      .attr("d", valueArc as any)
      .attr("fill", costCategories.operations.color)
      .transition()
      .duration(1000)
      .attrTween("d", function(d: any) {
        const interpolate = d3.interpolate(d.value, gaugeData.value);
        return function(t: number) {
          d.value = interpolate(t);
          return valueArc(d) as string;
        };
      });
    
    // Add the gauge text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.5em")
      .attr("font-size", "2em")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(0)
      .transition()
      .duration(1000)
      .tween("text", function() {
        const i = d3.interpolate(0, gaugeData.value);
        return function(t: number) {
          d3.select(this).text((i(t) * 100).toFixed(0) + "%");
        };
      });
    
    // Add label
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "3em")
      .attr("font-size", "1em")
      .attr("fill", "#666")
      .text("FTE Allocation");
    
    // Add annual cost text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 14)
      .attr("fill", "#666")
      .text(`Annual Operational Cost: ${formatCurrency(fteCost)}`);
  };
  
  // Helper function to create hardware breakdown
  const createHardwareBreakdown = (svg: any, width: number, height: number, margin: any, value: number, vendor: VendorResult) => {
    // For hardware, show initial vs infrastructure costs
    const hardwareCost = vendor.costBreakdown.hardware;
    const infrastructureCost = vendor.costBreakdown.infrastructure;
    
    // Prepare data for visualization
    const data = [
      { category: 'Hardware', cost: hardwareCost },
      { category: 'Infrastructure', cost: infrastructureCost }
    ];
    
    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.3);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.cost) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);
    
    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.category))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d: any, i: number) => i === 0 ? costCategories.hardware.color : costCategories.infrastructure.color)
      .attr("rx", 6)
      .attr("ry", 6)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.cost))
      .attr("height", d => height - margin.bottom - y(d.cost));
    
    // Add labels
    svg.append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => (x(d.category) as number) + x.bandwidth() / 2)
      .attr("y", d => y(d.cost) - 5)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 12)
      .attr("fill", "#333")
      .attr("opacity", 0)
      .text(d => formatCurrency(d.cost))
      .transition()
      .delay(700)
      .duration(300)
      .attr("opacity", 1);
    
    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", 12)
      .attr("font-family", "Nunito, sans-serif");
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => formatCurrency(d as number)))
      .call(g => g.select(".domain").remove());
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 14)
      .attr("fill", "#666")
      .text("Hardware vs. Infrastructure Costs");
  };
  
  // Helper function to create implementation breakdown
  const createImplementationBreakdown = (svg: any, width: number, height: number, margin: any, value: number, vendor: VendorResult) => {
    // For implementation, show timeline with milestones
    
    // Mock data for implementation timeline
    const implementationDays = 60; // Example value
    const dailyRate = value / implementationDays;
    
    const timelineData = [
      { phase: "Planning", days: implementationDays * 0.2, start: 0 },
      { phase: "Installation", days: implementationDays * 0.3, start: implementationDays * 0.2 },
      { phase: "Configuration", days: implementationDays * 0.3, start: implementationDays * 0.5 },
      { phase: "Testing", days: implementationDays * 0.1, start: implementationDays * 0.8 },
      { phase: "Handover", days: implementationDays * 0.1, start: implementationDays * 0.9 }
    ];
    
    // Add cumulative cost property
    timelineData.forEach((d: any, i: number) => {
      d.cost = d.days * dailyRate;
    });
    
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, implementationDays])
      .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
      .domain([0, value])
      .nice()
      .range([height - margin.bottom, margin.top]);
    
    // Add phases as rectangles
    const colorScale = d3.scaleOrdinal<string>()
      .domain(timelineData.map(d => d.phase))
      .range(["#8884D8", "#82CA9D", "#FFC658", "#FF8042", "#F25C78"]);
    
    svg.append("g")
      .selectAll("rect")
      .data(timelineData)
      .join("rect")
      .attr("x", d => x(d.start))
      .attr("y", margin.top + 20)
      .attr("width", d => x(d.start + d.days) - x(d.start))
      .attr("height", 30)
      .attr("fill", d => colorScale(d.phase))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .delay((d: any, i: number) => i * 100)
      .attr("opacity", 1);
    
    // Add phase labels
    svg.append("g")
      .selectAll("text")
      .data(timelineData)
      .join("text")
      .attr("x", d => x(d.start + d.days/2))
      .attr("y", margin.top + 35)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 10)
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")
      .attr("opacity", 0)
      .text(d => d.phase)
      .transition()
      .duration(500)
      .delay((d: any, i: number) => i * 100 + 300)
      .attr("opacity", 1);
    
    // Add cost labels above
    svg.append("g")
      .selectAll("text.cost")
      .data(timelineData)
      .join("text")
      .attr("class", "cost")
      .attr("x", d => x(d.start + d.days/2))
      .attr("y", margin.top + 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 10)
      .attr("fill", "#333")
      .attr("opacity", 0)
      .text(d => formatCurrency(d.cost))
      .transition()
      .duration(500)
      .delay((d: any, i: number) => i * 100 + 500)
      .attr("opacity", 1);
    
    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${margin.top + 60})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d + " days"))
      .selectAll("text")
      .attr("font-size", 10)
      .attr("font-family", "Nunito, sans-serif");
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 14)
      .attr("fill", "#666")
      .text(`Implementation Timeline (${implementationDays} days total)`);
  };
  
  // Helper function for generic breakdown
  const createGenericBreakdown = (svg: any, width: number, height: number, margin: any, value: number, vendor: VendorResult, category: string) => {
    // For generic categories, show value as gauge with comparison to industry average
    
    // Mock data for comparison
    const industryAverage = value * 1.5; // Example - 50% more than vendor
    
    // Create comparison data
    const data = [
      { label: vendor.name, value: value },
      { label: "Industry Average", value: industryAverage }
    ];
    
    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.3);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number * 1.1])
      .nice()
      .range([height - margin.bottom, margin.top]);
    
    // Add bars
    svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.label))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d: any, i: number) => i === 0 ? costCategories[category].color : "#bbb")
      .attr("rx", 8)
      .attr("ry", 8)
      .transition()
      .duration(1000)
      .attr("y", d => y(d.value))
      .attr("height", d => height - margin.bottom - y(d.value));
    
    // Add data labels
    svg.append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => (x(d.label) as number) + x.bandwidth() / 2)
      .attr("y", d => y(d.value) - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 12)
      .attr("fill", "#333")
      .attr("opacity", 0)
      .text(d => formatCurrency(d.value))
      .transition()
      .delay(800)
      .duration(400)
      .attr("opacity", 1);
    
    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("font-size", 11)
      .attr("font-family", "Nunito, sans-serif");
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => formatCurrency(d as number)))
      .call(g => g.select(".domain").remove());
    
    // Add comparison arrow and percentage
    const savingsAmount = industryAverage - value;
    const savingsPercentage = (savingsAmount / industryAverage * 100).toFixed(1);
    
    svg.append("path")
      .attr("d", `M${x("Industry Average") + x.bandwidth()/2},${y(industryAverage) + 5} L${x(vendor.name) + x.bandwidth()/2},${y(value) + 5}`)
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,3")
      .attr("marker-end", "url(#arrow)")
      .attr("fill", "none")
      .attr("opacity", 0)
      .transition()
      .delay(1000)
      .duration(500)
      .attr("opacity", 1);
    
    // Add arrow marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#333");
    
    // Add savings text
    svg.append("text")
      .attr("x", (x("Industry Average") + x(vendor.name) + x.bandwidth()) / 2)
      .attr("y", (y(industryAverage) + y(value)) / 2 - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("fill", "#1B67B2")
      .attr("opacity", 0)
      .text(`${savingsPercentage}% Savings`)
      .transition()
      .delay(1200)
      .duration(500)
      .attr("opacity", 1);
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", "Nunito, sans-serif")
      .attr("font-size", 14)
      .attr("fill", "#666")
      .text(`${costCategories[category].name} Cost Comparison`);
  };
  
  // Helper function to convert hex color to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) :
      '0,0,0';
  };
  
  // Extract series data for current chart
  const series = useMemo(() => {
    if (!vendorData || !vendorData.costBreakdown) return [];
    
    // Extract values for each category
    const values: number[] = [];
    Object.entries(vendorData.costBreakdown).forEach(([key, value]: [string, number]) => {
      if (value > 0 && key in costCategories) {
        values.push(value);
      }
    });
    
    return values;
  }, [vendorData]);
  
  // Primary pie chart view
  return (
    <div className="chart-container">
      <div className="chart-title text-center text-xl font-bold mb-2">
        {vendorData ? vendorData.name : 'Vendor'} TCO Breakdown
      </div>
      <div className="chart-content">
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height={height}
        />
        
        {/* Category Selection Grid */}
        <div className="category-grid grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {Object.entries(costCategories).map(([key, category]) => (
            <div
              key={key}
              className={`category-item p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center ${
                activeCategory === key ? 'bg-opacity-20 border-2' : 'bg-opacity-10 hover:bg-opacity-15'
              }`}
              style={{
                backgroundColor: `rgba(${hexToRgb(category.color)}, 0.1)`,
                borderColor: activeCategory === key ? category.color : 'transparent'
              }}
              onClick={() => {
                setActiveCategory(key);
                setShowDetailView(true);
              }}
            >
              <span className="text-2xl mr-3">{category.icon}</span>
              <div>
                <div className="font-bold text-sm">{category.name}</div>
                <div className="text-xs text-gray-600">
                  {vendorData && vendorData.costBreakdown[key as keyof typeof vendorData.costBreakdown] > 0 
                    ? formatCurrency(vendorData.costBreakdown[key as keyof typeof vendorData.costBreakdown])
                    : 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Detailed Category Breakdown */}
        {showDetailView && activeCategory && (
          <div 
            className="detail-view mt-6 pt-4 border-t border-gray-200"
            ref={detailChartRef}
          >
            {/* D3 chart will be rendered here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TcoBreakdownChart;
