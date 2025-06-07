/**
 * Operational View
 * Operational efficiency and productivity analysis
 */

class OperationalView {
    constructor() {
        this.charts = {};
    }
    
    initialize() {
        if (window.controller) {
            window.controller.registerView('operational', this);
        }
    }
    
    render(container) {
        container.innerHTML = `
            <div class="operational-dashboard animate-fadeIn">
                <!-- Header -->
                <section class="view-header">
                    <h2>Operational Efficiency Analysis</h2>
                    <p>Impact on IT operations, productivity, and resource utilization</p>
                </section>
                
                <!-- Operational Metrics Overview -->
                <section class="operational-overview">
                    <div class="metrics-grid">
                        <div class="metric-card highlight">
                            <i class="fas fa-tachometer-alt"></i>
                            <h4>Deployment Speed</h4>
                            <div class="comparison-metric">
                                <div class="metric-item">
                                    <span>Portnox</span>
                                    <span class="value">7 days</span>
                                </div>
                                <div class="metric-item">
                                    <span>Legacy NAC</span>
                                    <span class="value">180 days</span>
                                </div>
                            </div>
                            <div class="improvement">96% Faster</div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-users-cog"></i>
                            <h4>IT Staff Required</h4>
                            <div class="comparison-metric">
                                <div class="metric-item">
                                    <span>Portnox</span>
                                    <span class="value">0.5 FTE</span>
                                </div>
                                <div class="metric-item">
                                    <span>Legacy NAC</span>
                                    <span class="value">2.5 FTE</span>
                                </div>
                            </div>
                            <div class="improvement">80% Reduction</div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-robot"></i>
                            <h4>Automation Level</h4>
                            <div class="comparison-metric">
                                <div class="metric-item">
                                    <span>Portnox</span>
                                    <span class="value">95%</span>
                                </div>
                                <div class="metric-item">
                                    <span>Legacy NAC</span>
                                    <span class="value">25%</span>
                                </div>
                            </div>
                            <div class="improvement">3.8x More</div>
                        </div>
                        
                        <div class="metric-card">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <h4>Scalability</h4>
                            <div class="comparison-metric">
                                <div class="metric-item">
                                    <span>Portnox</span>
                                    <span class="value">Unlimited</span>
                                </div>
                                <div class="metric-item">
                                    <span>Legacy NAC</span>
                                    <span class="value">HW Limited</span>
                                </div>
                            </div>
                            <div class="improvement">∞ Scale</div>
                        </div>
                    </div>
                </section>
                
                <!-- Time Savings Analysis -->
                <section class="time-savings">
                    <h3>IT Time Savings Analysis</h3>
                    <div class="time-comparison">
                        <div class="time-chart" id="time-savings-chart"></div>
                        <div class="time-details">
                            <h4>Daily IT Tasks Comparison</h4>
                            <div class="task-list">
                                <div class="task-item">
                                    <span class="task-name">User Onboarding</span>
                                    <div class="time-comparison">
                                        <span class="legacy">Legacy: 45 min</span>
                                        <span class="portnox">Portnox: 2 min</span>
                                    </div>
                                    <div class="savings">95% faster</div>
                                </div>
                                <div class="task-item">
                                    <span class="task-name">Policy Updates</span>
                                    <div class="time-comparison">
                                        <span class="legacy">Legacy: 2 hours</span>
                                        <span class="portnox">Portnox: 5 min</span>
                                    </div>
                                    <div class="savings">96% faster</div>
                                </div>
                                <div class="task-item">
                                    <span class="task-name">Troubleshooting</span>
                                    <div class="time-comparison">
                                        <span class="legacy">Legacy: 90 min</span>
                                        <span class="portnox">Portnox: 10 min</span>
                                    </div>
                                    <div class="savings">89% faster</div>
                                </div>
                                <div class="task-item">
                                    <span class="task-name">Compliance Reports</span>
                                    <div class="time-comparison">
                                        <span class="legacy">Legacy: 8 hours</span>
                                        <span class="portnox">Portnox: 15 min</span>
                                    </div>
                                    <div class="savings">97% faster</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Operational Workflows -->
                <section class="operational-workflows">
                    <h3>Workflow Automation Comparison</h3>
                    <div class="workflow-grid">
                        <div class="workflow-card">
                            <h4>Device Onboarding</h4>
                            <div class="workflow-comparison">
                                <div class="workflow-legacy">
                                    <h5>Legacy Process</h5>
                                    <ol>
                                        <li>Manual MAC registration</li>
                                        <li>Certificate deployment</li>
                                        <li>VLAN assignment</li>
                                        <li>Policy configuration</li>
                                        <li>Testing & validation</li>
                                    </ol>
                                    <div class="workflow-time">Time: 30-45 minutes</div>
                                </div>
                                <div class="workflow-portnox">
                                    <h5>Portnox Process</h5>
                                    <ol>
                                        <li>Automatic discovery</li>
                                        <li>AI-based profiling</li>
                                        <li>Auto policy assignment</li>
                                    </ol>
                                    <div class="workflow-time">Time: &lt; 1 minute</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="workflow-card">
                            <h4>Security Incident Response</h4>
                            <div class="workflow-comparison">
                                <div class="workflow-legacy">
                                    <h5>Legacy Process</h5>
                                    <ol>
                                        <li>Alert received</li>
                                        <li>Manual investigation</li>
                                        <li>Identify affected device</li>
                                        <li>Manual quarantine</li>
                                        <li>Remediation</li>
                                    </ol>
                                    <div class="workflow-time">Time: 2-4 hours</div>
                                </div>
                                <div class="workflow-portnox">
                                    <h5>Portnox Process</h5>
                                    <ol>
                                        <li>AI threat detection</li>
                                        <li>Automatic quarantine</li>
                                        <li>Auto-remediation</li>
                                    </ol>
                                    <div class="workflow-time">Time: Instant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Productivity Impact -->
                <section class="productivity-impact">
                    <h3>Productivity Impact Analysis</h3>
                    <div class="productivity-metrics">
                        <div class="productivity-chart" id="productivity-chart"></div>
                        <div class="productivity-details">
                            <h4>Key Productivity Gains</h4>
                            <div class="gain-list">
                                <div class="gain-item">
                                    <i class="fas fa-check-circle"></i>
                                    <div class="gain-content">
                                        <h5>Reduced Downtime</h5>
                                        <p>99.9% uptime with cloud architecture vs 95% with on-premise</p>
                                        <div class="impact">+350 productive hours/year</div>
                                    </div>
                                </div>
                                <div class="gain-item">
                                    <i class="fas fa-check-circle"></i>
                                    <div class="gain-content">
                                        <h5>Faster Issue Resolution</h5>
                                        <p>Average ticket resolution: 15 min vs 2 hours</p>
                                        <div class="impact">87% faster problem solving</div>
                                    </div>
                                </div>
                                <div class="gain-item">
                                    <i class="fas fa-check-circle"></i>
                                    <div class="gain-content">
                                        <h5>Self-Service Capabilities</h5>
                                        <p>80% of issues resolved without IT intervention</p>
                                        <div class="impact">1,200 fewer tickets/year</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Resource Utilization -->
                <section class="resource-utilization">
                    <h3>Resource Utilization Optimization</h3>
                    <div class="utilization-grid">
                        <div class="utilization-card">
                            <h4>Infrastructure Resources</h4>
                            <div class="resource-comparison">
                                <div class="resource-item">
                                    <span>Server Requirements</span>
                                    <div class="comparison">
                                        <span class="portnox">Portnox: 0 servers</span>
                                        <span class="legacy">Legacy: 6-10 servers</span>
                                    </div>
                                </div>
                                <div class="resource-item">
                                    <span>Power Consumption</span>
                                    <div class="comparison">
                                        <span class="portnox">Portnox: 0 kWh</span>
                                        <span class="legacy">Legacy: 8,760 kWh/year</span>
                                    </div>
                                </div>
                                <div class="resource-item">
                                    <span>Rack Space</span>
                                    <div class="comparison">
                                        <span class="portnox">Portnox: 0U</span>
                                        <span class="legacy">Legacy: 12-20U</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="utilization-card">
                            <h4>Human Resources</h4>
                            <div class="fte-breakdown" id="fte-breakdown-chart"></div>
                        </div>
                    </div>
                </section>
                
                <!-- Operational KPIs -->
                <section class="operational-kpis">
                    <h3>Operational KPI Dashboard</h3>
                    <div class="kpi-grid">
                        <div class="kpi-card">
                            <i class="fas fa-chart-line"></i>
                            <h4>MTTR</h4>
                            <div class="kpi-value">15 min</div>
                            <div class="kpi-change positive">-87%</div>
                            <p>Mean Time to Resolution</p>
                        </div>
                        <div class="kpi-card">
                            <i class="fas fa-server"></i>
                            <h4>Uptime</h4>
                            <div class="kpi-value">99.99%</div>
                            <div class="kpi-change positive">+4.99%</div>
                            <p>System Availability</p>
                        </div>
                        <div class="kpi-card">
                            <i class="fas fa-ticket-alt"></i>
                            <h4>Tickets</h4>
                            <div class="kpi-value">-80%</div>
                            <div class="kpi-change positive">Reduction</div>
                            <p>Support Tickets</p>
                        </div>
                        <div class="kpi-card">
                            <i class="fas fa-smile"></i>
                            <h4>Satisfaction</h4>
                            <div class="kpi-value">4.8/5</div>
                            <div class="kpi-change positive">+1.3</div>
                            <p>User Satisfaction</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
        
        this.initializeCharts();
    }
    
    onSettingsUpdate(settings) {
        this.updateCalculations();
    }
    
    onCalculationsUpdate(settings) {
        this.updateCalculations();
    }
    
    updateCalculations() {
        this.initializeCharts();
    }
    
    initializeCharts() {
        this.renderTimeSavingsChart();
        this.renderProductivityChart();
        this.renderFTEBreakdownChart();
    }
    
    renderTimeSavingsChart() {
        const container = document.getElementById('time-savings-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const categories = [
            'User Onboarding',
            'Policy Management',
            'Troubleshooting',
            'Compliance Reporting',
            'Security Incidents',
            'Maintenance'
        ];
        
        const legacyTime = [45, 120, 90, 480, 240, 180]; // minutes
        const portnoxTime = [2, 5, 10, 15, 1, 0]; // minutes
        
        this.charts.timeSavings = Highcharts.chart(container, {
            chart: {
                type: 'bar',
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Time Required for Common IT Tasks',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: categories,
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: {
                title: {
                    text: 'Time (minutes)',
                    style: { color: '#a6acbb' }
                },
                labels: { style: { color: '#a6acbb' } }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: { color: '#ffffff' },
                        formatter: function() {
                            return this.y + ' min';
                        }
                    }
                }
            },
            series: [{
                name: 'Legacy NAC',
                data: legacyTime,
                color: '#ef4444'
            }, {
                name: 'Portnox',
                data: portnoxTime,
                color: '#00e5e6'
            }],
            legend: {
                itemStyle: { color: '#a6acbb' }
            },
            credits: { enabled: false }
        });
    }
    
    renderProductivityChart() {
        const container = document.getElementById('productivity-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const months = ['Month 1', 'Month 2', 'Month 3', 'Month 6', 'Month 9', 'Month 12'];
        const productivityGain = [10, 25, 40, 60, 75, 85];
        const costSavings = [5000, 15000, 30000, 65000, 100000, 150000];
        
        this.charts.productivity = Highcharts.chart(container, {
            chart: {
                backgroundColor: 'transparent',
                height: 300
            },
            title: {
                text: 'Productivity Gains Over Time',
                style: { color: '#ffffff' }
            },
            xAxis: {
                categories: months,
                labels: { style: { color: '#a6acbb' } }
            },
            yAxis: [{
                title: {
                    text: 'Productivity Gain (%)',
                    style: { color: '#00e5e6' }
                },
                labels: {
                    style: { color: '#00e5e6' },
                    format: '{value}%'
                }
            }, {
                title: {
                    text: 'Cost Savings ($)',
                    style: { color: '#10b981' }
                },
                labels: {
                    style: { color: '#10b981' },
                    format: '${value:,.0f}'
                },
                opposite: true
            }],
            series: [{
                name: 'Productivity Gain',
                type: 'column',
                data: productivityGain,
                color: '#00e5e6',
                yAxis: 0
            }, {
                name: 'Cumulative Savings',
                type: 'line',
                data: costSavings,
                color: '#10b981',
                yAxis: 1,
                marker: {
                    enabled: true,
                    radius: 4
                }
            }],
            legend: {
                itemStyle: { color: '#a6acbb' }
            },
            credits: { enabled: false }
        });
    }
    
    renderFTEBreakdownChart() {
        const container = document.getElementById('fte-breakdown-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        this.charts.fte = Highcharts.chart(container, {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
                height: 250
            },
            title: {
                text: 'IT Staff Time Allocation',
                style: { color: '#ffffff' }
            },
            plotOptions: {
                pie: {
                    innerSize: '50%',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y}%',
                        style: { color: '#ffffff' }
                    }
                }
            },
            series: [{
                name: 'Legacy NAC',
                data: [
                    { name: 'Maintenance', y: 40, color: '#ef4444' },
                    { name: 'Troubleshooting', y: 30, color: '#f59e0b' },
                    { name: 'Configuration', y: 20, color: '#fbbf24' },
                    { name: 'Strategic Work', y: 10, color: '#a78bfa' }
                ]
            }],
            credits: { enabled: false }
        });
        
        // Add comparison text
        container.insertAdjacentHTML('afterend', `
            <div class="fte-comparison-text">
                <p><strong>With Portnox:</strong> 80% time for strategic initiatives</p>
            </div>
        `);
    }
}

// Initialize and register
const operationalView = new OperationalView();
operationalView.initialize();

// Export for global access
window.operationalView = operationalView;

console.log('✅ Operational View loaded');
