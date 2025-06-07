// Add missing render functions to TCOAnalyzer class

// Risk View Renderer
TCOAnalyzer.prototype.renderRiskView = function() {
    const container = document.getElementById('risk-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="risk-dashboard">
            <h3>Zero Trust Risk Analysis</h3>
            <div class="risk-metrics-grid">
                <div class="metric-card">
                    <h4>Security Posture Score</h4>
                    <div class="score-display">
                        <span class="score">85%</span>
                        <span class="vendor">Portnox</span>
                    </div>
                    <div class="comparison">
                        <div>Cisco ISE: 72%</div>
                        <div>Forescout: 68%</div>
                        <div>Aruba ClearPass: 70%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <h4>Cyber Insurance Impact</h4>
                    <div class="savings">-15% Premium Reduction</div>
                    <ul>
                        <li>Zero Trust Architecture: -8%</li>
                        <li>Automated Compliance: -4%</li>
                        <li>Real-time Monitoring: -3%</li>
                    </ul>
                </div>
            </div>
            <div id="risk-comparison-chart"></div>
        </div>
    `;
    
    // Render risk comparison chart
    Highcharts.chart('risk-comparison-chart', {
        chart: { type: 'radar' },
        title: { text: 'Security Risk Mitigation Comparison' },
        xAxis: {
            categories: ['Endpoint Security', 'Network Segmentation', 'Identity Management', 
                        'Threat Detection', 'Compliance Automation', 'Incident Response']
        },
        series: [{
            name: 'Portnox',
            data: [95, 92, 94, 90, 96, 88],
            color: '#00a86b'
        }, {
            name: 'Cisco ISE',
            data: [85, 80, 82, 78, 75, 80],
            color: '#1e90ff'
        }, {
            name: 'Forescout',
            data: [80, 78, 75, 82, 70, 75],
            color: '#ff6347'
        }]
    });
};

// Compliance View Renderer
TCOAnalyzer.prototype.renderComplianceView = function() {
    const container = document.getElementById('compliance-content');
    if (!container) return;
    
    const complianceFrameworks = {
        'NIST': { portnox: 98, cisco: 85, aruba: 82, forescout: 80 },
        'ISO 27001': { portnox: 96, cisco: 84, aruba: 81, forescout: 79 },
        'SOC 2': { portnox: 97, cisco: 83, aruba: 80, forescout: 78 },
        'HIPAA': { portnox: 99, cisco: 86, aruba: 83, forescout: 81 },
        'PCI DSS': { portnox: 98, cisco: 87, aruba: 84, forescout: 82 },
        'GDPR': { portnox: 95, cisco: 82, aruba: 79, forescout: 77 }
    };
    
    container.innerHTML = `
        <div class="compliance-dashboard">
            <h3>Compliance Framework Coverage</h3>
            <div class="compliance-summary">
                <div class="alert alert-success">
                    <strong>Portnox Advantage:</strong> 
                    Automated compliance reporting saves 120+ hours annually vs manual processes
                </div>
            </div>
            <div id="compliance-coverage-chart"></div>
            <div class="compliance-controls">
                <h4>NAC Controls Mapping</h4>
                <table class="controls-table">
                    <thead>
                        <tr>
                            <th>Control Category</th>
                            <th>Portnox</th>
                            <th>Legacy NAC</th>
                            <th>Time Savings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Access Control (AC)</td>
                            <td>✓ Automated</td>
                            <td>⚠ Manual Config</td>
                            <td>-85%</td>
                        </tr>
                        <tr>
                            <td>Audit & Accountability (AU)</td>
                            <td>✓ Real-time</td>
                            <td>⚠ Periodic</td>
                            <td>-90%</td>
                        </tr>
                        <tr>
                            <td>System & Communications (SC)</td>
                            <td>✓ Zero Trust</td>
                            <td>⚠ Perimeter-based</td>
                            <td>-75%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Render compliance comparison
    const categories = Object.keys(complianceFrameworks);
    const portnoxData = categories.map(cat => complianceFrameworks[cat].portnox);
    const ciscoData = categories.map(cat => complianceFrameworks[cat].cisco);
    
    Highcharts.chart('compliance-coverage-chart', {
        chart: { type: 'column' },
        title: { text: 'Compliance Framework Coverage (%)' },
        xAxis: { categories: categories },
        yAxis: { min: 0, max: 100, title: { text: 'Coverage %' } },
        series: [{
            name: 'Portnox',
            data: portnoxData,
            color: '#00a86b'
        }, {
            name: 'Cisco ISE',
            data: ciscoData,
            color: '#1e90ff'
        }]
    });
};

// Operational View Renderer
TCOAnalyzer.prototype.renderOperationalView = function() {
    const container = document.getElementById('operational-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="operational-dashboard">
            <h3>Operational Efficiency Analysis</h3>
            <div class="efficiency-grid">
                <div class="metric-card">
                    <h4>FTE Requirements</h4>
                    <div class="fte-comparison">
                        <div class="vendor-fte">
                            <span class="vendor">Portnox</span>
                            <span class="fte">0.5 FTE</span>
                        </div>
                        <div class="vendor-fte">
                            <span class="vendor">Cisco ISE</span>
                            <span class="fte">2.5 FTE</span>
                        </div>
                        <div class="vendor-fte">
                            <span class="vendor">Aruba ClearPass</span>
                            <span class="fte">2.0 FTE</span>
                        </div>
                    </div>
                </div>
                <div class="metric-card">
                    <h4>Deployment Time</h4>
                    <div class="deployment-stats">
                        <div>Portnox: 2-3 days</div>
                        <div>Legacy NAC: 3-6 months</div>
                        <div class="savings">95% faster deployment</div>
                    </div>
                </div>
            </div>
            <div id="operational-cost-chart"></div>
            <div class="admin-tasks">
                <h4>Daily Administration Tasks</h4>
                <table class="tasks-table">
                    <tr>
                        <th>Task</th>
                        <th>Portnox (Cloud)</th>
                        <th>Legacy NAC</th>
                    </tr>
                    <tr>
                        <td>Policy Updates</td>
                        <td>5 minutes</td>
                        <td>2 hours</td>
                    </tr>
                    <tr>
                        <td>User Onboarding</td>
                        <td>Automated</td>
                        <td>30 min/user</td>
                    </tr>
                    <tr>
                        <td>Patch Management</td>
                        <td>Zero (SaaS)</td>
                        <td>8 hours/month</td>
                    </tr>
                </table>
            </div>
        </div>
    `;
    
    // Operational cost comparison chart
    Highcharts.chart('operational-cost-chart', {
        chart: { type: 'waterfall' },
        title: { text: '5-Year Operational Cost Comparison' },
        xAxis: { categories: ['Initial Cost', 'FTE Cost', 'Maintenance', 'Training', 'Downtime', 'Total'] },
        series: [{
            name: 'Cost Components',
            data: [
                { name: 'Initial Cost', y: 50000 },
                { name: 'FTE Cost', y: 625000 },
                { name: 'Maintenance', y: 150000 },
                { name: 'Training', y: 25000 },
                { name: 'Downtime', y: 75000 },
                { name: 'Total', isSum: true, color: '#ff6347' }
            ]
        }]
    });
};

// Strategic View Renderer
TCOAnalyzer.prototype.renderStrategicView = function() {
    const container = document.getElementById('strategic-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="strategic-dashboard">
            <h3>Strategic Business Impact</h3>
            <div class="executive-summary">
                <div class="summary-card highlight">
                    <h4>5-Year TCO Comparison</h4>
                    <div class="tco-summary">
                        <div class="vendor-tco">
                            <span>Portnox Cloud</span>
                            <span class="cost">$285,000</span>
                        </div>
                        <div class="vendor-tco">
                            <span>Cisco ISE</span>
                            <span class="cost">$925,000</span>
                        </div>
                        <div class="savings">69% Cost Reduction</div>
                    </div>
                </div>
                <div class="summary-card">
                    <h4>ROI Timeline</h4>
                    <div class="roi-metrics">
                        <div>Payback Period: 4 months</div>
                        <div>5-Year ROI: 340%</div>
                        <div>NPV: $640,000</div>
                    </div>
                </div>
            </div>
            <div id="strategic-value-chart"></div>
            <div class="strategic-benefits">
                <h4>Strategic Advantages</h4>
                <ul>
                    <li><strong>Scalability:</strong> Cloud-native architecture scales with business growth</li>
                    <li><strong>Innovation:</strong> Continuous updates without infrastructure changes</li>
                    <li><strong>Agility:</strong> Rapid policy changes for business requirements</li>
                    <li><strong>Risk Reduction:</strong> Zero Trust security model implementation</li>
                </ul>
            </div>
        </div>
    `;
    
    // Strategic value chart
    Highcharts.chart('strategic-value-chart', {
        chart: { type: 'area' },
        title: { text: 'Cumulative Value Generation Over Time' },
        xAxis: { categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] },
        yAxis: { title: { text: 'Value ($)' } },
        series: [{
            name: 'Portnox Value',
            data: [150000, 340000, 560000, 820000, 1120000],
            color: '#00a86b'
        }, {
            name: 'Legacy NAC Cost',
            data: [-185000, -370000, -555000, -740000, -925000],
            color: '#ff6347'
        }]
    });
};

// Initialize vendor data
TCOAnalyzer.prototype.initializeVendorData = function() {
    this.vendorData = {
        'portnox': {
            name: 'Portnox',
            type: 'cloud',
            features: ['Zero Trust', 'Cloud-Native', 'Agentless', 'API-First'],
            pricing: { base: 35000, perUser: 35, maintenance: 0 }
        },
        'cisco': {
            name: 'Cisco ISE',
            type: 'legacy',
            features: ['On-Premise', 'Complex Setup', 'Agent-Based'],
            pricing: { base: 150000, perUser: 85, maintenance: 22 }
        },
        'aruba': {
            name: 'Aruba ClearPass',
            type: 'legacy',
            features: ['Hybrid Deploy', 'Hardware Required'],
            pricing: { base: 120000, perUser: 75, maintenance: 20 }
        },
        'forescout': {
            name: 'Forescout',
            type: 'legacy',
            features: ['Agentless Option', 'Complex Licensing'],
            pricing: { base: 130000, perUser: 80, maintenance: 21 }
        },
        'foxpass': {
            name: 'Foxpass',
            type: 'cloud',
            features: ['RADIUS-as-a-Service', 'Limited Features'],
            pricing: { base: 15000, perUser: 25, maintenance: 0 }
        }
    };
};
