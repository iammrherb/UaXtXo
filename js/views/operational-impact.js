/**
 * Operational Impact Analysis Module
 * Comprehensive operational efficiency and productivity assessment
 */

class OperationalImpact {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
    }
    
    render(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="operational-impact-analysis">
                <!-- Executive Operational Summary -->
                <div class="executive-operational-summary">
                    <h2>Operational Excellence Dashboard</h2>
                    <div class="operational-kpis">
                        ${this.renderOperationalKPIs()}
                    </div>
                </div>
                
                <!-- Automation Impact Analysis -->
                <div class="automation-impact-section">
                    <h3>Process Automation & Efficiency Gains</h3>
                    <div class="automation-grid">
                        <div class="chart-container">
                            <h4>FTE Requirements Comparison</h4>
                            <div id="fte-comparison-chart" style="height: 400px;"></div>
                        </div>
                        <div class="chart-container">
                            <h4>Time-to-Value Analysis</h4>
                            <div id="time-to-value-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Productivity Analysis -->
                <div class="productivity-section">
                    <h3>Productivity & User Experience Impact</h3>
                    <div class="productivity-grid">
                        ${this.renderProductivityAnalysis()}
                    </div>
                </div>
                
                <!-- Integration Complexity -->
                <div class="integration-section">
                    <h3>Integration & Deployment Complexity</h3>
                    <div class="integration-analysis">
                        ${this.renderIntegrationAnalysis()}
                    </div>
                </div>
                
                <!-- Scalability Assessment -->
                <div class="scalability-section">
                    <h3>Scalability & Growth Readiness</h3>
                    <div class="scalability-grid">
                        <div class="chart-container">
                            <h4>Scalability Comparison</h4>
                            <div id="scalability-chart" style="height: 400px;"></div>
                        </div>
                        <div class="growth-scenarios">
                            ${this.renderGrowthScenarios()}
                        </div>
                    </div>
                </div>
                
                <!-- Operational Recommendations -->
                <div class="operational-recommendations">
                    <h3>Operational Excellence Roadmap</h3>
                    ${this.renderOperationalRecommendations()}
                </div>
            </div>
        `;
        
        // Render charts
        setTimeout(() => {
            this.renderOperationalCharts();
        }, 100);
    }
    
    renderOperationalKPIs() {
        const portnox = this.platform.calculationResults.portnox;
        const devices = this.platform.config.deviceCount;
        
        // Calculate operational metrics
        const fteReduction = 0.75; // 75% FTE reduction with Portnox
        const automationLevel = 92; // 92% automation
        const deploymentDays = 7;
        const mttr = 5; // Mean time to resolution in minutes
        
        return `
            <div class="kpi-card efficiency">
                <div class="kpi-icon"><i class="fas fa-robot"></i></div>
                <h4>Automation Level</h4>
                <div class="kpi-value">${automationLevel}%</div>
                <p>vs. 45% industry average</p>
            </div>
            <div class="kpi-card time">
                <div class="kpi-icon"><i class="fas fa-rocket"></i></div>
                <h4>Deployment Time</h4>
                <div class="kpi-value">${deploymentDays} days</div>
                <p>vs. 90 days average</p>
            </div>
            <div class="kpi-card productivity">
                <div class="kpi-icon"><i class="fas fa-users"></i></div>
                <h4>FTE Savings</h4>
                <div class="kpi-value">${fteReduction * 100}%</div>
                <p>Staff efficiency gain</p>
            </div>
            <div class="kpi-card resolution">
                <div class="kpi-icon"><i class="fas fa-stopwatch"></i></div>
                <h4>Incident Resolution</h4>
                <div class="kpi-value">${mttr} min</div>
                <p>Average MTTR</p>
            </div>
        `;
    }
    
    renderProductivityAnalysis() {
        const metrics = [
            {
                category: 'User Onboarding',
                portnox: { time: '5 min', automation: '100%', satisfaction: '95%' },
                competitor: { time: '2 hours', automation: '30%', satisfaction: '65%' }
            },
            {
                category: 'Device Provisioning',
                portnox: { time: '30 sec', automation: '100%', satisfaction: '98%' },
                competitor: { time: '30 min', automation: '40%', satisfaction: '70%' }
            },
            {
                category: 'Policy Changes',
                portnox: { time: '1 min', automation: '95%', satisfaction: '92%' },
                competitor: { time: '4 hours', automation: '20%', satisfaction: '60%' }
            },
            {
                category: 'Incident Response',
                portnox: { time: '5 min', automation: '90%', satisfaction: '94%' },
                competitor: { time: '2 hours', automation: '25%', satisfaction: '55%' }
            }
        ];
        
        return `
            <div class="productivity-comparison">
                <table class="productivity-table">
                    <thead>
                        <tr>
                            <th>Process</th>
                            <th colspan="3">Portnox CLEAR</th>
                            <th colspan="3">Industry Average</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>Time</th>
                            <th>Automation</th>
                            <th>Satisfaction</th>
                            <th>Time</th>
                            <th>Automation</th>
                            <th>Satisfaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${metrics.map(metric => `
                            <tr>
                                <td>${metric.category}</td>
                                <td class="portnox-cell">${metric.portnox.time}</td>
                                <td class="portnox-cell">${metric.portnox.automation}</td>
                                <td class="portnox-cell">${metric.portnox.satisfaction}</td>
                                <td class="competitor-cell">${metric.competitor.time}</td>
                                <td class="competitor-cell">${metric.competitor.automation}</td>
                                <td class="competitor-cell">${metric.competitor.satisfaction}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="productivity-impact-summary">
                <h4>Annual Productivity Gains</h4>
                <div class="impact-metrics">
                    <div class="metric">
                        <span class="label">Time Saved</span>
                        <span class="value">${Math.round(this.platform.config.deviceCount * 10)} hrs/year</span>
                    </div>
                    <div class="metric">
                        <span class="label">Cost Savings</span>
                        <span class="value">${Math.round(this.platform.config.deviceCount * 50 / 1000)}K</span>
                    </div>
                    <div class="metric">
                        <span class="label">User Satisfaction</span>
                        <span class="value">+35%</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderIntegrationAnalysis() {
        const integrations = [
            { name: 'Active Directory', portnox: 'Native', competitors: 'Complex' },
            { name: 'Azure AD', portnox: 'Native', competitors: 'Limited' },
            { name: 'Google Workspace', portnox: 'Native', competitors: 'Custom' },
            { name: 'MDM Solutions', portnox: 'API', competitors: 'Manual' },
            { name: 'SIEM Platforms', portnox: 'Real-time', competitors: 'Batch' },
            { name: 'Cloud Providers', portnox: 'Multi-cloud', competitors: 'Single' }
        ];
        
        return `
            <div class="integration-matrix">
                <div class="integration-comparison">
                    <h4>Integration Capabilities</h4>
                    <table class="integration-table">
                        <thead>
                            <tr>
                                <th>System</th>
                                <th>Portnox</th>
                                <th>Competitors</th>
                                <th>Time to Deploy</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${integrations.map(int => `
                                <tr>
                                    <td>${int.name}</td>
                                    <td class="portnox-cell">
                                        <span class="badge success">${int.portnox}</span>
                                    </td>
                                    <td class="competitor-cell">
                                        <span class="badge warning">${int.competitors}</span>
                                    </td>
                                    <td>${int.portnox === 'Native' ? '< 1 hour' : '< 1 day'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="deployment-complexity">
                    <h4>Deployment Complexity Score</h4>
                    <div class="complexity-chart">
                        <div class="vendor-complexity portnox">
                            <h5>Portnox CLEAR</h5>
                            <div class="complexity-score">
                                <div class="score-bar" style="width: 15%"></div>
                                <span>15/100 (Simple)</span>
                            </div>
                        </div>
                        <div class="vendor-complexity">
                            <h5>Industry Average</h5>
                            <div class="complexity-score">
                                <div class="score-bar warning" style="width: 75%"></div>
                                <span>75/100 (Complex)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderGrowthScenarios() {
        const currentDevices = this.platform.config.deviceCount;
        const scenarios = [
            { name: '2x Growth', devices: currentDevices * 2 },
            { name: '5x Growth', devices: currentDevices * 5 },
            { name: '10x Growth', devices: currentDevices * 10 }
        ];
        
        return `
            <div class="growth-analysis">
                <h4>Scalability Scenarios</h4>
                <div class="scenario-cards">
                    ${scenarios.map(scenario => {
                        const portnoxCost = scenario.devices * 3.50 * 12;
                        const competitorCost = scenario.devices * 7.00 * 12;
                        const additionalFTE = Math.ceil(scenario.devices / 5000);
                        
                        return `
                            <div class="scenario-card">
                                <h5>${scenario.name}</h5>
                                <div class="scenario-metrics">
                                    <div class="metric-row">
                                        <span>Devices:</span>
                                        <strong>${scenario.devices.toLocaleString()}</strong>
                                    </div>
                                    <div class="metric-row portnox">
                                        <span>Portnox Cost:</span>
                                        <strong>${Math.round(portnoxCost / 1000)}K</strong>
                                    </div>
                                    <div class="metric-row">
                                        <span>Competitor Cost:</span>
                                        <strong>${Math.round(competitorCost / 1000)}K</strong>
                                    </div>
                                    <div class="metric-row">
                                        <span>Add'l FTE Needed:</span>
                                        <strong>Portnox: 0 / Others: ${additionalFTE}</strong>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    renderOperationalRecommendations() {
        return `
            <div class="roadmap-timeline">
                <div class="roadmap-phase immediate">
                    <div class="phase-header">
                        <span class="phase-time">Week 1</span>
                        <h4>Quick Wins</h4>
                    </div>
                    <ul>
                        <li>Deploy Portnox CLEAR cloud infrastructure</li>
                        <li>Enable automated device discovery</li>
                        <li>Implement self-service onboarding</li>
                        <li>Reduce manual provisioning by 90%</li>
                    </ul>
                    <div class="phase-impact">
                        <span><i class="fas fa-clock"></i> Time Saved: 40 hrs/week</span>
                        <span><i class="fas fa-users"></i> FTE Impact: -0.5</span>
                    </div>
                </div>
                
                <div class="roadmap-phase month1">
                    <div class="phase-header">
                        <span class="phase-time">Month 1</span>
                        <h4>Process Optimization</h4>
                    </div>
                    <ul>
                        <li>Automate policy enforcement</li>
                        <li>Enable AI-driven anomaly detection</li>
                        <li>Implement automated remediation</li>
                        <li>Deploy real-time dashboards</li>
                    </ul>
                    <div class="phase-impact">
                        <span><i class="fas fa-chart-line"></i> Efficiency: +65%</span>
                        <span><i class="fas fa-shield-alt"></i> MTTR: -80%</span>
                    </div>
                </div>
                
                <div class="roadmap-phase quarter1">
                    <div class="phase-header">
                        <span class="phase-time">Quarter 1</span>
                        <h4>Operational Excellence</h4>
                    </div>
                    <ul>
                        <li>Complete API integrations</li>
                        <li>Implement DevOps workflows</li>
                        <li>Enable predictive analytics</li>
                        <li>Achieve 95% automation rate</li>
                    </ul>
                    <div class="phase-impact">
                        <span><i class="fas fa-trophy"></i> Automation: 95%</span>
                        <span><i class="fas fa-dollar-sign"></i> OpEx: -60%</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderOperationalCharts() {
        this.renderFTEComparison();
        this.renderTimeToValueChart();
        this.renderScalabilityChart();
    }
    
    renderFTEComparison() {
        const container = document.getElementById('fte-comparison-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = ['Initial Deploy', 'Year 1', 'Year 2', 'Year 3'];
        const vendors = Object.keys(this.platform.calculationResults);
        
        const series = vendors.map(vendor => {
            const vendorData = this.vendorData[vendor];
            const baseFTE = vendorData?.metrics?.fteRequired || 2.0;
            
            return {
                name: vendorData?.name || vendor,
                data: [
                    baseFTE * 2, // Initial deployment
                    baseFTE,
                    baseFTE * 0.9,
                    baseFTE * 0.85
                ],
                color: vendor === 'portnox' ? '#00D4AA' : null
            };
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'FTE Requirements',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } }
            },
            plotOptions: {
                column: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y.toFixed(1);
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: series,
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderTimeToValueChart() {
        const container = document.getElementById('time-to-value-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const milestones = [
            'First Device Connected',
            'Basic Policies Active',
            'Full Visibility',
            'Automation Enabled',
            'ROI Achieved'
        ];
        
        const portnoxDays = [0.5, 2, 3, 7, 30];
        const competitorDays = [7, 21, 45, 90, 180];
        
        Highcharts.chart(container, {
            chart: {
                type: 'bar',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: milestones,
                labels: { style: { color: '#CBD5E1' } }
            },
            yAxis: {
                title: { 
                    text: 'Days to Achieve',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 200
            },
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y < 1 ? (this.y * 24) + ' hrs' : this.y + ' days';
                        },
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            series: [
                {
                    name: 'Portnox CLEAR',
                    data: portnoxDays,
                    color: '#00D4AA'
                },
                {
                    name: 'Industry Average',
                    data: competitorDays,
                    color: '#94A3B8'
                }
            ],
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
    
    renderScalabilityChart() {
        const container = document.getElementById('scalability-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const deviceCounts = [1000, 5000, 10000, 25000, 50000, 100000];
        const series = [];
        
        Object.entries(this.platform.calculationResults).forEach(([key, result]) => {
            if (result && result.vendor) {
                const scalabilityScore = result.vendor.metrics.scalabilityScore || 50;
                const isCloud = result.vendor.architecture === 'SaaS' || result.vendor.architecture === 'Cloud';
                
                const data = deviceCounts.map(count => {
                    // Cloud solutions scale linearly, on-prem degrades
                    if (isCloud) {
                        return scalabilityScore;
                    } else {
                        const degradation = Math.max(0, scalabilityScore - (count / 2000));
                        return Math.max(20, degradation);
                    }
                });
                
                series.push({
                    name: result.vendor.name,
                    data: data,
                    color: key === 'portnox' ? '#00D4AA' : null
                });
            }
        });
        
        Highcharts.chart(container, {
            chart: {
                type: 'line',
                backgroundColor: '#1E293B'
            },
            title: { text: null },
            xAxis: {
                categories: deviceCounts.map(c => c.toLocaleString()),
                labels: { 
                    style: { color: '#CBD5E1' },
                    rotation: -45
                },
                title: {
                    text: 'Number of Devices',
                    style: { color: '#CBD5E1' }
                }
            },
            yAxis: {
                title: { 
                    text: 'Scalability Score',
                    style: { color: '#CBD5E1' }
                },
                labels: { style: { color: '#CBD5E1' } },
                max: 100,
                min: 0
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true,
                        radius: 4
                    }
                }
            },
            series: series,
            legend: {
                itemStyle: { color: '#CBD5E1' }
            },
            credits: { enabled: false }
        });
    }
}

// Export for platform use
window.OperationalImpact = OperationalImpact;

console.log('✅ Operational Impact module loaded');
