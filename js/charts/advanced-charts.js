/**
 * Advanced Charts and Visualizations
 * State-of-the-art data visualization components
 */

class AdvancedCharts {
    constructor() {
        this.chartInstances = {};
        this.animationDuration = 2000;
        this.colorSchemes = {
            portnox: ['#00D4AA', '#00B894', '#009C7A', '#008060'],
            competitors: ['#94A3B8', '#64748B', '#475569', '#334155'],
            risk: ['#10B981', '#F59E0B', '#EF4444'],
            gradient: {
                portnox: 'rgba(0, 212, 170, 0.8)',
                danger: 'rgba(239, 68, 68, 0.8)',
                warning: 'rgba(245, 158, 11, 0.8)',
                success: 'rgba(16, 185, 129, 0.8)'
            }
        };
    }
    
    // 3D Cost Breakdown Chart
    create3DCostBreakdown(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        // Create 3D effect with multiple datasets
        const datasets = data.vendors.map((vendor, index) => {
            const isPortnox = vendor.id === 'portnox';
            return {
                label: vendor.name,
                data: [
                    vendor.costs.software,
                    vendor.costs.hardware,
                    vendor.costs.implementation,
                    vendor.costs.operations,
                    vendor.costs.hidden
                ],
                backgroundColor: isPortnox ? 
                    this.colorSchemes.portnox : 
                    this.colorSchemes.competitors,
                borderWidth: isPortnox ? 3 : 1,
                borderColor: isPortnox ? '#00D4AA' : '#E5E7EB'
            };
        });
        
        this.chartInstances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Software', 'Hardware', 'Implementation', 'Operations', 'Hidden Costs'],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comprehensive Cost Breakdown Analysis',
                        font: { size: 18, weight: 'bold' }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.dataset.label}: ${(value/1000).toFixed(0)}K (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: value => '
                 + (value/1000).toFixed(0) + 'K'
                        }
                    }
                },
                animation: {
                    duration: this.animationDuration,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // Advanced Risk Heatmap
    createRiskHeatmap(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        // Create heatmap data
        const heatmapData = {
            labels: {
                x: data.vendors.map(v => v.name),
                y: ['Breach Risk', 'Ransomware', 'Downtime', 'Compliance', 'Insider Threat', 'Supply Chain']
            },
            datasets: [{
                label: 'Risk Level',
                data: this.generateHeatmapData(data),
                backgroundColor: (context) => {
                    const value = context.raw.v;
                    if (value < 30) return 'rgba(16, 185, 129, 0.8)';
                    if (value < 60) return 'rgba(245, 158, 11, 0.8)';
                    return 'rgba(239, 68, 68, 0.8)';
                },
                borderWidth: 1,
                borderColor: 'white',
                width: (ctx) => (ctx.chart.chartArea || {}).width / data.vendors.length - 2,
                height: (ctx) => (ctx.chart.chartArea || {}).height / 6 - 2
            }]
        };
        
        this.chartInstances[canvasId] = new Chart(ctx, {
            type: 'matrix',
            data: heatmapData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: () => '',
                            label: (context) => {
                                const vendor = data.vendors[context.raw.x];
                                const riskType = heatmapData.labels.y[context.raw.y];
                                return `${vendor.name} - ${riskType}: ${context.raw.v}% risk`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: heatmapData.labels.x,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        type: 'category',
                        labels: heatmapData.labels.y,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Interactive Compliance Dashboard
    createComplianceDashboard(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="compliance-dashboard">
                <div class="compliance-overview">
                    <h3>Compliance Coverage Overview</h3>
                    <div class="compliance-grid">
                        ${this.renderComplianceCards(data)}
                    </div>
                </div>
                
                <div class="compliance-comparison">
                    <canvas id="compliance-radar-${containerId}"></canvas>
                </div>
                
                <div class="compliance-timeline">
                    <h3>Compliance Achievement Timeline</h3>
                    <div class="timeline-container">
                        ${this.renderComplianceTimeline(data)}
                    </div>
                </div>
            </div>
        `;
        
        // Create radar chart for compliance
        this.createComplianceRadar(`compliance-radar-${containerId}`, data);
    }
    
    renderComplianceCards(data) {
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS', 'NIST CSF'];
        
        return frameworks.map(framework => {
            const portnoxScore = data.vendors.find(v => v.id === 'portnox')?.compliance[framework] || 0;
            const avgCompetitorScore = data.vendors
                .filter(v => v.id !== 'portnox')
                .reduce((sum, v) => sum + (v.compliance[framework] || 0), 0) / (data.vendors.length - 1);
            
            return `
                <div class="compliance-card ${portnoxScore >= 90 ? 'excellent' : portnoxScore >= 75 ? 'good' : 'needs-improvement'}">
                    <h4>${framework}</h4>
                    <div class="compliance-scores">
                        <div class="score-item">
                            <span class="vendor-name">Portnox</span>
                            <div class="score-bar">
                                <div class="score-fill" style="width: ${portnoxScore}%"></div>
                            </div>
                            <span class="score-value">${portnoxScore}%</span>
                        </div>
                        <div class="score-item">
                            <span class="vendor-name">Avg Competitor</span>
                            <div class="score-bar">
                                <div class="score-fill competitor" style="width: ${avgCompetitorScore}%"></div>
                            </div>
                            <span class="score-value">${Math.round(avgCompetitorScore)}%</span>
                        </div>
                    </div>
                    <div class="compliance-advantage">
                        ${portnoxScore > avgCompetitorScore ? 
                            `<i class="fas fa-arrow-up"></i> +${Math.round(portnoxScore - avgCompetitorScore)}% advantage` :
                            `<i class="fas fa-arrow-down"></i> ${Math.round(avgCompetitorScore - portnoxScore)}% gap`}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Animated ROI Calculator
    createROICalculator(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="roi-calculator">
                <div class="roi-inputs">
                    <h3>ROI Calculator</h3>
                    <div class="input-group">
                        <label>Current Security Incidents/Year</label>
                        <input type="number" id="roi-incidents" value="12" min="0" max="100">
                    </div>
                    <div class="input-group">
                        <label>Average Cost per Incident</label>
                        <input type="number" id="roi-incident-cost" value="25000" min="1000" step="1000">
                    </div>
                    <div class="input-group">
                        <label>IT Team Hours/Week on NAC</label>
                        <input type="number" id="roi-hours" value="40" min="0" max="168">
                    </div>
                </div>
                
                <div class="roi-results">
                    <h3>Projected Savings with Portnox</h3>
                    <div class="savings-display">
                        <div class="savings-item">
                            <span class="label">Incident Reduction</span>
                            <span class="value" id="incident-savings">$0</span>
                        </div>
                        <div class="savings-item">
                            <span class="label">Time Savings</span>
                            <span class="value" id="time-savings">$0</span>
                        </div>
                        <div class="savings-item">
                            <span class="label">Insurance Premium Reduction</span>
                            <span class="value" id="insurance-savings">$0</span>
                        </div>
                        <div class="savings-item total">
                            <span class="label">Total Annual Savings</span>
                            <span class="value" id="total-savings">$0</span>
                        </div>
                    </div>
                    
                    <div class="roi-chart-container">
                        <canvas id="roi-projection-chart"></canvas>
                    </div>
                </div>
            </div>
        `;
        
        // Attach calculator logic
        this.attachROICalculator(data);
    }
    
    // Executive Scorecard
    createExecutiveScorecard(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const portnox = data.vendors.find(v => v.id === 'portnox');
        const competitors = data.vendors.filter(v => v.id !== 'portnox');
        
        container.innerHTML = `
            <div class="executive-scorecard">
                <div class="scorecard-header">
                    <h2>Executive Decision Scorecard</h2>
                    <p class="scorecard-date">Analysis Date: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="scorecard-summary">
                    <div class="summary-stat winner">
                        <i class="fas fa-trophy"></i>
                        <h3>Clear Winner</h3>
                        <p>Portnox CLEAR</p>
                    </div>
                    <div class="summary-stat">
                        <i class="fas fa-dollar-sign"></i>
                        <h3>Cost Advantage</h3>
                        <p>${Math.round((1 - portnox.tco / competitors[0].tco) * 100)}% Lower</p>
                    </div>
                    <div class="summary-stat">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Risk Reduction</h3>
                        <p>${portnox.riskReduction}% Better</p>
                    </div>
                    <div class="summary-stat">
                        <i class="fas fa-clock"></i>
                        <h3>Time to Value</h3>
                        <p>${portnox.deploymentTime} Hours</p>
                    </div>
                </div>
                
                <div class="scorecard-details">
                    <table class="scorecard-table">
                        <thead>
                            <tr>
                                <th>Evaluation Criteria</th>
                                <th>Weight</th>
                                <th>Portnox</th>
                                <th>Best Competitor</th>
                                <th>Advantage</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderScorecardRows(portnox, competitors[0])}
                        </tbody>
                    </table>
                </div>
                
                <div class="scorecard-recommendation">
                    <h3>Executive Recommendation</h3>
                    <div class="recommendation-box">
                        <i class="fas fa-check-circle"></i>
                        <p>Based on comprehensive analysis across ${data.criteria.length} evaluation criteria, 
                        <strong>Portnox CLEAR</strong> delivers superior value with 
                        <strong>${Math.round((portnox.score / competitors[0].score - 1) * 100)}% better overall score</strong> 
                        than the nearest competitor. Immediate adoption recommended.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Helper Methods
    generateHeatmapData(data) {
        const heatmapData = [];
        data.vendors.forEach((vendor, x) => {
            const risks = [
                100 - vendor.riskScores.breach,
                100 - vendor.riskScores.ransomware,
                100 - vendor.riskScores.downtime,
                100 - vendor.riskScores.compliance,
                100 - vendor.riskScores.insider,
                100 - vendor.riskScores.supplyChain
            ];
            
            risks.forEach((risk, y) => {
                heatmapData.push({
                    x: x,
                    y: y,
                    v: Math.round(risk)
                });
            });
        });
        return heatmapData;
    }
    
    createComplianceRadar(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS', 'NIST CSF', 'CMMC', 'FedRAMP'];
        
        const datasets = data.vendors.map(vendor => ({
            label: vendor.name,
            data: frameworks.map(fw => vendor.compliance[fw] || 0),
            borderColor: vendor.id === 'portnox' ? '#00D4AA' : undefined,
            backgroundColor: vendor.id === 'portnox' ? 'rgba(0, 212, 170, 0.2)' : undefined,
            borderWidth: vendor.id === 'portnox' ? 3 : 2,
            pointRadius: vendor.id === 'portnox' ? 5 : 3
        }));
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: frameworks,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Compliance Framework Coverage Comparison'
                    }
                }
            }
        });
    }
    
    renderComplianceTimeline(data) {
        const milestones = [
            { month: 0, label: 'Day 1', achievement: 'Basic compliance monitoring active' },
            { month: 1, label: 'Month 1', achievement: '75% compliance automation achieved' },
            { month: 3, label: 'Month 3', achievement: '95% automation, audit-ready' },
            { month: 6, label: 'Month 6', achievement: 'Full compliance certification' }
        ];
        
        return `
            <div class="timeline">
                ${milestones.map((milestone, index) => `
                    <div class="timeline-item ${index === 0 ? 'active' : ''}">
                        <div class="timeline-marker">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="timeline-content">
                            <h4>${milestone.label}</h4>
                            <p>${milestone.achievement}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    attachROICalculator(data) {
        const inputs = ['roi-incidents', 'roi-incident-cost', 'roi-hours'];
        
        const calculate = () => {
            const incidents = parseInt(document.getElementById('roi-incidents').value) || 0;
            const incidentCost = parseInt(document.getElementById('roi-incident-cost').value) || 0;
            const hours = parseInt(document.getElementById('roi-hours').value) || 0;
            
            // Calculate savings
            const incidentReduction = 0.85; // 85% reduction with Portnox
            const incidentSavings = incidents * incidentCost * incidentReduction;
            
            const hourlyRate = 60; // $60/hour IT rate
            const timeReduction = 0.90; // 90% time reduction
            const timeSavings = hours * 52 * hourlyRate * timeReduction;
            
            const insuranceBase = 75000; // Average premium
            const insuranceReduction = 0.30; // 30% reduction
            const insuranceSavings = insuranceBase * insuranceReduction;
            
            const totalSavings = incidentSavings + timeSavings + insuranceSavings;
            
            // Update display
            document.getElementById('incident-savings').textContent = '
                 + incidentSavings.toLocaleString();
            document.getElementById('time-savings').textContent = '
                 + timeSavings.toLocaleString();
            document.getElementById('insurance-savings').textContent = '
                 + insuranceSavings.toLocaleString();
            document.getElementById('total-savings').textContent = '
                 + totalSavings.toLocaleString();
            
            // Update chart
            this.updateROIProjection(totalSavings);
        };
        
        inputs.forEach(id => {
            document.getElementById(id)?.addEventListener('input', calculate);
        });
        
        // Initial calculation
        calculate();
    }
    
    updateROIProjection(annualSavings) {
        const ctx = document.getElementById('roi-projection-chart');
        if (!ctx) return;
        
        const years = [0, 1, 2, 3, 4, 5];
        const savings = years.map(year => annualSavings * year);
        const investment = 50000; // Initial investment
        const netBenefit = savings.map(s => s - investment);
        
        if (this.chartInstances['roi-projection']) {
            this.chartInstances['roi-projection'].destroy();
        }
        
        this.chartInstances['roi-projection'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years.map(y => `Year ${y}`),
                datasets: [
                    {
                        label: 'Cumulative Savings',
                        data: savings,
                        borderColor: '#00D4AA',
                        backgroundColor: 'rgba(0, 212, 170, 0.1)',
                        borderWidth: 3,
                        fill: true
                    },
                    {
                        label: 'Net Benefit',
                        data: netBenefit,
                        borderColor: '#00B894',
                        borderWidth: 2,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'ROI Projection Over 5 Years'
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: value => '
                 + (value/1000).toFixed(0) + 'K'
                        }
                    }
                }
            }
        });
    }
    
    renderScorecardRows(portnox, competitor) {
        const criteria = [
            { name: 'Total Cost of Ownership', weight: 25, portnox: 95, competitor: 60 },
            { name: 'Security Effectiveness', weight: 20, portnox: 98, competitor: 65 },
            { name: 'Deployment Speed', weight: 15, portnox: 100, competitor: 40 },
            { name: 'Operational Efficiency', weight: 15, portnox: 95, competitor: 35 },
            { name: 'Compliance Coverage', weight: 15, portnox: 94, competitor: 70 },
            { name: 'Risk Mitigation', weight: 10, portnox: 92, competitor: 55 }
        ];
        
        return criteria.map(criterion => `
            <tr>
                <td>${criterion.name}</td>
                <td>${criterion.weight}%</td>
                <td class="score-cell">
                    <div class="score-bar-inline">
                        <div class="score-fill-inline" style="width: ${criterion.portnox}%"></div>
                    </div>
                    <span>${criterion.portnox}/100</span>
                </td>
                <td class="score-cell">
                    <div class="score-bar-inline">
                        <div class="score-fill-inline competitor" style="width: ${criterion.competitor}%"></div>
                    </div>
                    <span>${criterion.competitor}/100</span>
                </td>
                <td class="advantage-cell">
                    <span class="advantage-badge">
                        +${criterion.portnox - criterion.competitor} pts
                    </span>
                </td>
            </tr>
        `).join('');
    }
    
    // Destroy all chart instances
    destroy() {
        Object.values(this.chartInstances).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.chartInstances = {};
    }
}

window.AdvancedCharts = AdvancedCharts;
console.log('✅ Advanced Charts loaded');
