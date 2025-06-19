/**
 * Advanced Charts and Visualizations - Fixed Version
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
        
        const datasets = data.vendors.map((vendor, index) => {
            const isPortnox = vendor.id === 'portnox';
            return {
                label: vendor.name,
                data: [
                    vendor.costs.software || 0,
                    vendor.costs.hardware || 0,
                    vendor.costs.implementation || 0,
                    vendor.costs.operations || 0,
                    vendor.costs.hidden || 0
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
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${context.dataset.label}: $${(value/1000).toFixed(0)}K (${percentage}%)`;
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
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
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
        
        // For now, create a simple bar chart as heatmap
        // (Matrix chart type requires additional plugin)
        const riskTypes = ['Breach Risk', 'Ransomware', 'Downtime', 'Compliance', 'Insider Threat'];
        const datasets = data.vendors.map(vendor => ({
            label: vendor.name,
            data: [
                100 - (vendor.riskScores?.breach || 50),
                100 - (vendor.riskScores?.ransomware || 50),
                100 - (vendor.riskScores?.downtime || 50),
                100 - (vendor.riskScores?.compliance || 50),
                100 - (vendor.riskScores?.insider || 50)
            ],
            backgroundColor: vendor.id === 'portnox' ? 
                'rgba(0, 212, 170, 0.8)' : 
                'rgba(148, 163, 184, 0.8)',
            borderColor: vendor.id === 'portnox' ? '#00D4AA' : '#94A3B8',
            borderWidth: 2
        }));
        
        this.chartInstances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: riskTypes,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Risk Mitigation Effectiveness'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }
    
    // Fixed Compliance Radar - Use 'bar' with indexAxis: 'y' instead of 'horizontalBar'
    createComplianceRadar(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;
        
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS', 'NIST CSF'];
        
        const datasets = data.vendors.map(vendor => ({
            label: vendor.name,
            data: frameworks.map(fw => vendor.compliance?.[fw] || 0),
            backgroundColor: vendor.id === 'portnox' ? 
                'rgba(0, 212, 170, 0.8)' : 
                'rgba(148, 163, 184, 0.8)',
            borderColor: vendor.id === 'portnox' ? '#00D4AA' : '#94A3B8',
            borderWidth: vendor.id === 'portnox' ? 3 : 1
        }));
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: frameworks,
                datasets: datasets
            },
            options: {
                indexAxis: 'y', // This makes it horizontal
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
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
            </div>
        `;
        
        // Create compliance chart
        setTimeout(() => {
            this.createComplianceRadar(`compliance-radar-${containerId}`, data);
        }, 100);
    }
    
    renderComplianceCards(data) {
        const frameworks = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS', 'NIST CSF'];
        
        return frameworks.map(framework => {
            const portnoxScore = data.vendors?.find(v => v.id === 'portnox')?.compliance?.[framework] || 95;
            const avgCompetitorScore = data.vendors
                ?.filter(v => v.id !== 'portnox')
                ?.reduce((sum, v) => sum + (v.compliance?.[framework] || 50), 0) / (data.vendors?.length - 1 || 1) || 60;
            
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
    
    // ROI Calculator
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
    
    attachROICalculator(data) {
        const inputs = ['roi-incidents', 'roi-incident-cost', 'roi-hours'];
        
        const calculate = () => {
            const incidents = parseInt(document.getElementById('roi-incidents')?.value) || 0;
            const incidentCost = parseInt(document.getElementById('roi-incident-cost')?.value) || 0;
            const hours = parseInt(document.getElementById('roi-hours')?.value) || 0;
            
            // Calculate savings
            const incidentReduction = 0.85;
            const incidentSavings = incidents * incidentCost * incidentReduction;
            
            const hourlyRate = 60;
            const timeReduction = 0.90;
            const timeSavings = hours * 52 * hourlyRate * timeReduction;
            
            const insuranceBase = 75000;
            const insuranceReduction = 0.30;
            const insuranceSavings = insuranceBase * insuranceReduction;
            
            const totalSavings = incidentSavings + timeSavings + insuranceSavings;
            
            // Update display
            const updateElement = (id, value) => {
                const element = document.getElementById(id);
                if (element) element.textContent = '$' + value.toLocaleString();
            };
            
            updateElement('incident-savings', incidentSavings);
            updateElement('time-savings', timeSavings);
            updateElement('insurance-savings', insuranceSavings);
            updateElement('total-savings', totalSavings);
            
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
        const investment = 50000;
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
                            callback: value => '$' + (value/1000).toFixed(0) + 'K'
                        }
                    }
                }
            }
        });
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
console.log('✅ Advanced Charts loaded (Fixed)');
