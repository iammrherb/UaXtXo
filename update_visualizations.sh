#!/bin/bash
# =============================================================================
# Advanced Visualizations
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$PWD")")"

cat >> "${PROJECT_DIR}/script.js" << 'EOF'

// Advanced Chart Visualizations
class AdvancedVisualizations {
    createExecutiveDashboard(containerId) {
        const container = document.getElementById(containerId);
        
        // KPI Cards
        const kpiHTML = `
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-value" id="total-savings">$0</div>
                    <div class="kpi-label">Total Savings</div>
                    <div class="kpi-trend positive">↑ 65%</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value" id="roi-percentage">0%</div>
                    <div class="kpi-label">ROI</div>
                    <div class="kpi-trend positive">↑ 285%</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value" id="payback-period">0</div>
                    <div class="kpi-label">Payback Period</div>
                    <div class="kpi-trend">months</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value" id="risk-reduction">0%</div>
                    <div class="kpi-label">Risk Reduction</div>
                    <div class="kpi-trend positive">↑ 80%</div>
                </div>
            </div>
        `;
        
        container.innerHTML = kpiHTML;
    }
    
    createMultiYearTCOChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        const datasets = Object.keys(data).map((vendor, index) => ({
            label: this.vendorNames[vendor] || vendor,
            data: data[vendor].map(d => d.total),
            borderColor: this.colorPalette[index],
            backgroundColor: this.colorPalette[index] + '20',
            fill: false
        }));
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 3', 'Year 5', 'Year 7'],
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Multi-Year Total Cost of Ownership'
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    createCAPEXOPEXChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'CAPEX',
                    data: Object.values(data).map(d => d.capex),
                    backgroundColor: '#FF6384'
                }, {
                    label: 'OPEX',
                    data: Object.values(data).map(d => d.opex),
                    backgroundColor: '#36A2EB'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'CAPEX vs OPEX Breakdown'
                    }
                }
            }
        });
    }
    
    createComplianceHeatmap(containerId, data) {
        const width = 800;
        const height = 500;
        const margin = {top: 50, right: 50, bottom: 100, left: 100};
        
        const svg = d3.select(`#${containerId}`)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        // Process data
        const frameworks = Object.keys(data);
        const categories = ['Access Control', 'Data Protection', 'Monitoring', 'Compliance', 'Automation'];
        
        // Scales
        const xScale = d3.scaleBand()
            .domain(frameworks)
            .range([0, width])
            .padding(0.05);
        
        const yScale = d3.scaleBand()
            .domain(categories)
            .range([0, height])
            .padding(0.05);
        
        const colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateRdYlGn)
            .domain([0, 100]);
        
        // Create cells
        const cells = [];
        frameworks.forEach(framework => {
            categories.forEach(category => {
                cells.push({
                    framework: framework,
                    category: category,
                    value: Math.floor(Math.random() * 40) + 60 // Sample data
                });
            });
        });
        
        // Draw cells
        g.selectAll('.cell')
            .data(cells)
            .enter().append('rect')
            .attr('x', d => xScale(d.framework))
            .attr('y', d => yScale(d.category))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(d.value))
            .attr('stroke', 'white')
            .attr('stroke-width', 2);
        
        // Add text
        g.selectAll('.text')
            .data(cells)
            .enter().append('text')
            .attr('x', d => xScale(d.framework) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d.category) + yScale.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(d => d.value + '%')
            .style('fill', d => d.value > 50 ? 'white' : 'black');
    }
    
    createROIPaybackChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Generate cumulative cash flow data
        const months = Array.from({length: 36}, (_, i) => i + 1);
        const cumulativeCashFlow = months.map(month => {
            const monthlySavings = data.monthlySavings || 5000;
            const initialInvestment = data.initialInvestment || 50000;
            return (monthlySavings * month) - initialInvestment;
        });
        
        const breakEvenMonth = cumulativeCashFlow.findIndex(cf => cf > 0) + 1;
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months.map(m => `Month ${m}`),
                datasets: [{
                    label: 'Cumulative Cash Flow',
                    data: cumulativeCashFlow,
                    borderColor: '#4BC0C0',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `ROI Analysis - Break Even at Month ${breakEvenMonth}`
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 2,
                                label: {
                                    enabled: true,
                                    content: 'Break Even'
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    constructor() {
        this.colorPalette = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#36A2EB'
        ];
        
        this.vendorNames = {
            portnoxCloud: 'Portnox Cloud',
            ciscoISE: 'Cisco ISE',
            arubaClearPass: 'Aruba ClearPass',
            forescout: 'Forescout',
            fortiNAC: 'FortiNAC'
        };
    }
}

window.visualizations = new AdvancedVisualizations();
EOF

echo "Advanced visualizations added successfully"
