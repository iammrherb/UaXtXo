// Enhanced Visualizations for TCO Analyzer
const EnhancedVisualizations = {
    // Chart color schemes
    colors: {
        portnox: '#00B4D8',
        cisco: '#1BA0D8',
        aruba: '#FF6B6B',
        forescout: '#4ECDC4',
        pulse: '#95E1D3',
        foxpass: '#F38181',
        securew2: '#AA96DA',
        other: '#FCE38A',
        risk: {
            low: '#4CAF50',
            medium: '#FFC107',
            high: '#FF5722',
            critical: '#D32F2F'
        }
    },
    
    createComparisonChart(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const config = {
            type: 'bar',
            data: {
                labels: data.map(d => window.vendorData[d.vendor]?.name || d.vendor),
                datasets: [
                    {
                        label: 'Capital Expenses',
                        data: data.map(d => d.costs.capex),
                        backgroundColor: '#FF6B6B',
                        stack: 'total'
                    },
                    {
                        label: 'Operating Expenses',
                        data: data.map(d => d.costs.opex),
                        backgroundColor: '#4ECDC4',
                        stack: 'total'
                    },
                    {
                        label: 'Operational Costs',
                        data: data.map(d => d.costs.operational),
                        backgroundColor: '#95E1D3',
                        stack: 'total'
                    },
                    {
                        label: 'Risk & Insurance',
                        data: data.map(d => d.costs.risk),
                        backgroundColor: '#F38181',
                        stack: 'total'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '5-Year Total Cost of Ownership Comparison',
                        font: { size: 18 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + 
                                       context.parsed.y.toLocaleString();
                            },
                            footer: function(tooltipItems) {
                                const total = tooltipItems.reduce((sum, item) => 
                                    sum + item.parsed.y, 0);
                                return 'Total: $' + total.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Total Cost (USD)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Vendor Solutions'
                        }
                    }
                }
            }
        };
        
        return window.createChartSafely(canvasId, config);
    },
    
    createROITimeline(canvasId, portnoxData, competitorData) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // Generate monthly cumulative costs
        const months = 60; // 5 years
        const portnoxMonthly = [];
        const competitorMonthly = [];
        
        for (let month = 0; month <= months; month++) {
            portnoxMonthly.push({
                x: month,
                y: portnoxData.costs.implementation + 
                   (portnoxData.annualCost / 12 * month)
            });
            
            competitorMonthly.push({
                x: month,
                y: competitorData.costs.implementation + 
                   (competitorData.annualCost / 12 * month)
            });
        }
        
        const config = {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Portnox Cloud',
                        data: portnoxMonthly,
                        borderColor: '#00B4D8',
                        backgroundColor: 'rgba(0, 180, 216, 0.1)',
                        tension: 0.1
                    },
                    {
                        label: window.vendorData[competitorData.vendor]?.name || 'Competitor',
                        data: competitorMonthly,
                        borderColor: '#FF6B6B',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cumulative Cost Over Time',
                        font: { size: 18 }
                    },
                    annotation: {
                        annotations: {
                            breakeven: {
                                type: 'line',
                                yMin: 0,
                                yMax: 1000000,
                                xMin: 12,
                                xMax: 12,
                                borderColor: '#4CAF50',
                                borderWidth: 2,
                                label: {
                                    content: 'Break-even Point',
                                    enabled: true,
                                    position: 'start'
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Months'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Cumulative Cost (USD)'
                        }
                    }
                }
            }
        };
        
        return window.createChartSafely(canvasId, config);
    },
    
    createRiskMatrix(canvasId, vendorRiskScores) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const datasets = Object.keys(vendorRiskScores).map(vendor => ({
            label: window.vendorData[vendor]?.name || vendor,
            data: [{
                x: vendorRiskScores[vendor].probability * 100,
                y: vendorRiskScores[vendor].impact / 1000000,
                r: Math.sqrt(vendorRiskScores[vendor].annualLoss) / 100
            }],
            backgroundColor: this.colors[vendor] || this.colors.other
        }));
        
        const config = {
            type: 'bubble',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Risk Assessment Matrix',
                        font: { size: 18 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return [
                                    context.dataset.label,
                                    'Probability: ' + context.parsed.x.toFixed(1) + '%',
                                    'Impact: $' + context.parsed.y.toFixed(1) + 'M',
                                    'Annual Loss: $' + (Math.pow(context.parsed.r * 100, 2)).toLocaleString()
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Risk Probability (%)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Potential Impact ($ Millions)'
                        }
                    }
                }
            }
        };
        
        return window.createChartSafely(canvasId, config);
    },
    
    createFeatureComparison(containerId, vendors) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const features = [
            { key: 'cloudNative', name: 'Cloud Native', icon: '☁️' },
            { key: 'agentless', name: 'Agentless', icon: '🚫' },
            { key: 'zeroTrust', name: 'Zero Trust', icon: '🔒' },
            { key: 'deviceVisibility', name: 'Device Visibility', icon: '👁️' },
            { key: 'riskAssessment', name: 'Risk Assessment', icon: '⚠️' },
            { key: 'automatedRemediation', name: 'Auto Remediation', icon: '🔧' },
            { key: 'iotSecurity', name: 'IoT Security', icon: '📡' },
            { key: 'aiPowered', name: 'AI Powered', icon: '🤖' },
            { key: 'apiAccess', name: 'API Access', icon: '🔌' },
            { key: 'globalDeployment', name: 'Global Deploy', icon: '🌍' }
        ];
        
        let html = `
            <div class="feature-comparison-table">
                <h3>Feature Comparison Matrix</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${vendors.map(v => `<th>${window.vendorData[v]?.name || v}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        features.forEach(feature => {
            html += '<tr>';
            html += `<td>${feature.icon} ${feature.name}</td>`;
            vendors.forEach(vendor => {
                const hasFeature = window.vendorData[vendor]?.features?.[feature.key];
                html += `<td class="${hasFeature ? 'has-feature' : 'no-feature'}">
                    ${hasFeature ? '✅' : '❌'}
                </td>`;
            });
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    createComplianceHeatmap(canvasId, vendors) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const frameworks = Object.keys(window.complianceData.frameworks);
        const data = [];
        
        vendors.forEach((vendor, vIndex) => {
            frameworks.forEach((framework, fIndex) => {
                const score = window.complianceData.frameworks[framework].nacControls[vendor] || 0;
                data.push({
                    x: fIndex,
                    y: vIndex,
                    v: score
                });
            });
        });
        
        const config = {
            type: 'matrix',
            data: {
                datasets: [{
                    label: 'Compliance Coverage',
                    data: data,
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex].v;
                        const alpha = value / 100;
                        return `rgba(0, 180, 216, ${alpha})`;
                    },
                    borderWidth: 1,
                    width: function(context) {
                        return (context.chart.chartArea.width / frameworks.length) - 2;
                    },
                    height: function(context) {
                        return (context.chart.chartArea.height / vendors.length) - 2;
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Compliance Framework Coverage',
                        font: { size: 18 }
                    },
                    tooltip: {
                        callbacks: {
                            title: function() { return ''; },
                            label: function(context) {
                                const vendor = vendors[context.dataIndex % vendors.length];
                                const framework = frameworks[Math.floor(context.dataIndex / vendors.length)];
                                return [
                                    window.vendorData[vendor]?.name || vendor,
                                    framework,
                                    'Coverage: ' + context.dataset.data[context.dataIndex].v + '%'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: frameworks,
                        title: {
                            display: true,
                            text: 'Compliance Frameworks'
                        }
                    },
                    y: {
                        type: 'category',
                        labels: vendors.map(v => window.vendorData[v]?.name || v),
                        title: {
                            display: true,
                            text: 'Vendors'
                        }
                    }
                }
            }
        };
        
        // Fallback to regular heatmap if matrix chart type not available
        if (!Chart.controllers.matrix) {
            return this.createComplianceHeatmapFallback(canvasId, vendors);
        }
        
        return window.createChartSafely(canvasId, config);
    },
    
    createComplianceHeatmapFallback(canvasId, vendors) {
        const container = document.getElementById(canvasId).parentElement;
        const frameworks = Object.keys(window.complianceData.frameworks);
        
        let html = `
            <div class="compliance-heatmap-table">
                <h3>Compliance Framework Coverage</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            ${frameworks.map(f => `<th>${f}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        vendors.forEach(vendor => {
            html += '<tr>';
            html += `<td>${window.vendorData[vendor]?.name || vendor}</td>`;
            frameworks.forEach(framework => {
                const score = window.complianceData.frameworks[framework].nacControls[vendor] || 0;
                const color = score >= 90 ? '#4CAF50' :
                             score >= 70 ? '#8BC34A' :
                             score >= 50 ? '#FFC107' :
                             score >= 30 ? '#FF9800' : '#FF5722';
                html += `<td style="background-color: ${color}; color: white; text-align: center;">
                    ${score}%
                </td>`;
            });
            html += '</tr>';
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    createArchitectureDiagram(containerId, vendor) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const vendorData = window.vendorData[vendor];
        if (!vendorData) return;
        
        // Different diagrams based on vendor type
        if (vendor === 'portnox') {
            container.innerHTML = `
                <div class="architecture-diagram">
                    <h3>Portnox Cloud-Native Architecture</h3>
                    <div class="arch-cloud">
                        <div class="cloud-layer">
                            <h4>☁️ Portnox Cloud (Multi-Region)</h4>
                            <div class="cloud-components">
                                <div class="component">🤖 AI/ML Engine</div>
                                <div class="component">📊 Analytics</div>
                                <div class="component">🔒 Policy Engine</div>
                                <div class="component">🌐 API Gateway</div>
                            </div>
                        </div>
                        <div class="connection">⬇️ Secure API ⬇️</div>
                        <div class="edge-layer">
                            <h4>🏢 Your Network Edge</h4>
                            <div class="edge-components">
                                <div class="component">📡 Switches</div>
                                <div class="component">📶 WiFi</div>
                                <div class="component">🔌 VPN</div>
                                <div class="component">💻 Endpoints</div>
                            </div>
                        </div>
                    </div>
                    <div class="arch-benefits">
                        <h4>Key Benefits:</h4>
                        <ul>
                            <li>✅ No on-premise servers required</li>
                            <li>✅ Instant deployment (hours, not months)</li>
                            <li>✅ Automatic updates & scaling</li>
                            <li>✅ 99.99% uptime SLA</li>
                            <li>✅ Global presence</li>
                        </ul>
                    </div>
                </div>
            `;
        } else if (vendorData.type === 'legacy') {
            container.innerHTML = `
                <div class="architecture-diagram">
                    <h3>${vendorData.name} Traditional Architecture</h3>
                    <div class="arch-onprem">
                        <div class="datacenter-layer">
                            <h4>🏢 Your Datacenter</h4>
                            <div class="dc-components">
                                <div class="component">🖥️ Primary Server</div>
                                <div class="component">🖥️ Secondary Server</div>
                                <div class="component">💾 Database Cluster</div>
                                <div class="component">⚙️ Admin Servers</div>
                            </div>
                        </div>
                        <div class="connection">⬇️ Internal Network ⬇️</div>
                        <div class="distribution-layer">
                            <h4>🌐 Distribution Layer</h4>
                            <div class="dist-components">
                                <div class="component">🔄 Load Balancers</div>
                                <div class="component">📊 Collectors</div>
                                <div class="component">🛡️ Firewalls</div>
                            </div>
                        </div>
                        <div class="connection">⬇️ Access Layer ⬇️</div>
                        <div class="access-layer">
                            <h4>🔌 Network Access</h4>
                            <div class="access-components">
                                <div class="component">📡 Switches</div>
                                <div class="component">📶 Controllers</div>
                                <div class="component">💻 Endpoints</div>
                            </div>
                        </div>
                    </div>
                    <div class="arch-challenges">
                        <h4>Challenges:</h4>
                        <ul>
                            <li>❌ Complex infrastructure required</li>
                            <li>❌ 12-24 week deployment</li>
                            <li>❌ Manual updates with downtime</li>
                            <li>❌ Limited scalability</li>
                            <li>❌ High operational overhead</li>
                        </ul>
                    </div>
                </div>
            `;
        }
    },
    
    createDeploymentTimeline(containerId, vendors) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let html = `
            <div class="deployment-timeline">
                <h3>Implementation Timeline Comparison</h3>
                <div class="timeline-chart">
        `;
        
        vendors.forEach(vendor => {
            const vendorData = window.vendorData[vendor];
            const weeks = vendorData?.implementation?.timeWeeks || 12;
            const phases = this.getDeploymentPhases(vendor, weeks);
            
            html += `
                <div class="vendor-timeline">
                    <h4>${vendorData?.name || vendor}</h4>
                    <div class="timeline-bar">
            `;
            
            phases.forEach(phase => {
                const width = (phase.duration / weeks) * 100;
                html += `
                    <div class="phase ${phase.type}" style="width: ${width}%">
                        <span>${phase.name}</span>
                        <small>${phase.duration}w</small>
                    </div>
                `;
            });
            
            html += `
                    </div>
                    <div class="total-time">Total: ${weeks} weeks</div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    },
    
    getDeploymentPhases(vendor, totalWeeks) {
        if (vendor === 'portnox') {
            return [
                { name: 'Setup', duration: 0.5, type: 'planning' },
                { name: 'Config', duration: 1, type: 'implementation' },
                { name: 'Testing', duration: 0.5, type: 'testing' }
            ];
        } else if (window.vendorData[vendor]?.type === 'cloud-radius') {
            return [
                { name: 'Setup', duration: 1, type: 'planning' },
                { name: 'Config', duration: 1.5, type: 'implementation' },
                { name: 'Testing', duration: 0.5, type: 'testing' }
            ];
        } else {
            // Legacy vendors
            const planning = Math.floor(totalWeeks * 0.25);
            const hardware = Math.floor(totalWeeks * 0.2);
            const implementation = Math.floor(totalWeeks * 0.35);
            const testing = totalWeeks - planning - hardware - implementation;
            
            return [
                { name: 'Planning', duration: planning, type: 'planning' },
                { name: 'Hardware', duration: hardware, type: 'hardware' },
                { name: 'Implementation', duration: implementation, type: 'implementation' },
                { name: 'Testing', duration: testing, type: 'testing' }
            ];
        }
    },
    
    init() {
        console.log('📊 Enhanced visualizations initialized');
        
        // Add custom styles
        this.injectStyles();
    },
    
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .feature-comparison-table table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            
            .feature-comparison-table th,
            .feature-comparison-table td {
                padding: 12px;
                text-align: center;
                border: 1px solid #ddd;
            }
            
            .feature-comparison-table .has-feature {
                background-color: #E8F5E9;
                color: #2E7D32;
            }
            
            .feature-comparison-table .no-feature {
                background-color: #FFEBEE;
                color: #C62828;
            }
            
            .compliance-heatmap-table table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            
            .compliance-heatmap-table th,
            .compliance-heatmap-table td {
                padding: 10px;
                border: 1px solid #ddd;
            }
            
            .architecture-diagram {
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
                margin: 20px 0;
            }
            
            .arch-cloud, .arch-onprem {
                text-align: center;
                margin: 20px 0;
            }
            
            .cloud-layer, .datacenter-layer, .edge-layer, 
            .distribution-layer, .access-layer {
                background: white;
                border: 2px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin: 10px 0;
            }
            
            .cloud-components, .edge-components, .dc-components,
            .dist-components, .access-components {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                margin-top: 10px;
            }
            
            .component {
                background: #E3F2FD;
                border: 1px solid #2196F3;
                border-radius: 4px;
                padding: 8px 12px;
                margin: 5px;
                font-size: 14px;
            }
            
            .connection {
                font-size: 20px;
                color: #666;
                margin: 10px 0;
            }
            
            .arch-benefits ul, .arch-challenges ul {
                list-style: none;
                padding-left: 0;
            }
            
            .arch-benefits li, .arch-challenges li {
                margin: 8px 0;
                font-size: 14px;
            }
            
            .deployment-timeline {
                margin: 20px 0;
            }
            
            .vendor-timeline {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .timeline-bar {
                display: flex;
                height: 40px;
                background: #e0e0e0;
                border-radius: 4px;
                overflow: hidden;
                margin: 10px 0;
            }
            
            .phase {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
                position: relative;
                border-right: 1px solid rgba(255,255,255,0.3);
            }
            
            .phase.planning { background-color: #2196F3; }
            .phase.hardware { background-color: #FF9800; }
            .phase.implementation { background-color: #4CAF50; }
            .phase.testing { background-color: #9C27B0; }
            
            .phase span {
                position: absolute;
                white-space: nowrap;
            }
            
            .phase small {
                position: absolute;
                bottom: -20px;
                font-size: 10px;
                color: #666;
            }
            
            .total-time {
                text-align: right;
                font-weight: bold;
                color: #666;
                margin-top: 25px;
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize and export
EnhancedVisualizations.init();
window.EnhancedVisualizations = EnhancedVisualizations;

console.log('✅ Enhanced visualizations loaded');
