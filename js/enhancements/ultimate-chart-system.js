/**
 * Ultimate Chart System for Portnox Total Cost Analyzer
 * Provides the most effective and influential visualizations
 */

class UltimateChartSystem {
    constructor() {
        this.chartInstances = new Map();
        this.chartTheme = {
            colors: ['#2E7EE5', '#00D4AA', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#3D5A80'],
            portnoxColor: '#2E7EE5',
            competitorColors: ['#FF6B6B', '#FFB347', '#77DD77', '#AEC6CF', '#CB99C9', '#FFD1DC'],
            font: {
                family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                size: 12
            }
        };
    }

    /**
     * Create Executive Summary Dashboard
     */
    createExecutiveDashboard(container, data) {
        const dashboardHTML = `
            <div class="executive-dashboard-grid">
                <div class="metric-card hero-metric">
                    <div class="metric-icon"><i class="fas fa-piggy-bank"></i></div>
                    <div class="metric-content">
                        <h3>Total Savings with Portnox</h3>
                        <div class="metric-value">$${(data.totalSavings / 1000).toFixed(0)}K</div>
                        <div class="metric-change positive">+${data.savingsPercent}%</div>
                        <div class="metric-detail">vs. average competitor over 3 years</div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon"><i class="fas fa-clock"></i></div>
                    <div class="metric-content">
                        <h3>Time to Value</h3>
                        <div class="metric-value">${data.portnoxDeploymentDays} days</div>
                        <div class="metric-change positive">${data.deploymentAdvantage}% faster</div>
                        <div class="metric-detail">vs. ${data.avgCompetitorDays} day average</div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon"><i class="fas fa-shield-check"></i></div>
                    <div class="metric-content">
                        <h3>Security Score</h3>
                        <div class="metric-value">${data.portnoxSecurityScore}/100</div>
                        <div class="metric-change positive">+${data.securityAdvantage}%</div>
                        <div class="metric-detail">Industry-leading protection</div>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="metric-content">
                        <h3>3-Year ROI</h3>
                        <div class="metric-value">${data.roi}%</div>
                        <div class="metric-change positive">${data.paybackMonths} mo payback</div>
                        <div class="metric-detail">Best-in-class returns</div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = dashboardHTML;
    }

    /**
     * Create Advanced TCO Waterfall Chart
     */
    createTCOWaterfallChart(containerId, vendorData) {
        const categories = [];
        const data = [];
        
        // Start with average competitor TCO
        const competitors = Object.values(vendorData).filter(v => v.id !== 'portnox');
        const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.costs.tco3Year, 0) / competitors.length;
        
        categories.push('Average Competitor TCO');
        data.push(avgCompetitorTCO);
        
        // Calculate savings components
        const portnox = vendorData.portnox;
        const licensingSavings = (avgCompetitorTCO * 0.35) - portnox.costs.licensing;
        const infrastructureSavings = (avgCompetitorTCO * 0.25) - portnox.costs.infrastructure;
        const operationalSavings = (avgCompetitorTCO * 0.40) - portnox.costs.operational;
        
        // Add savings as negative values
        categories.push('Licensing Savings');
        data.push(-Math.abs(licensingSavings));
        
        categories.push('Infrastructure Savings');
        data.push(-Math.abs(infrastructureSavings));
        
        categories.push('Operational Savings');
        data.push(-Math.abs(operationalSavings));
        
        // Final Portnox TCO
        categories.push('Portnox Cloud TCO');
        data.push({ 
            isSum: true, 
            color: this.chartTheme.portnoxColor 
        });

        Highcharts.chart(containerId, {
            chart: {
                type: 'waterfall',
                height: 400,
                style: { fontFamily: this.chartTheme.font.family }
            },
            title: {
                text: 'TCO Savings Breakdown: Portnox vs Market Average',
                style: { fontSize: '18px', fontWeight: '600' }
            },
            xAxis: {
                type: 'category',
                labels: {
                    style: { fontSize: '12px' }
                }
            },
            yAxis: {
                title: {
                    text: 'Total Cost ($)',
                    style: { fontSize: '14px' }
                },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000).toFixed(0) + 'K';
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormatter: function() {
                    const value = Math.abs(this.y);
                    return '<b>$' + (value / 1000).toFixed(0) + 'K</b>';
                }
            },
            plotOptions: {
                waterfall: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (Math.abs(this.y) / 1000).toFixed(0) + 'K';
                        },
                        style: {
                            fontWeight: '600',
                            fontSize: '11px'
                        }
                    },
                    lineColor: '#333',
                    color: '#FF6B6B',
                    upColor: '#00D4AA',
                    dashStyle: 'Dot'
                }
            },
            series: [{
                name: 'TCO Analysis',
                data: data.map((value, index) => {
                    if (typeof value === 'object') {
                        return value;
                    }
                    return [categories[index], value];
                })
            }]
        });
    }

    /**
     * Create Competitive Positioning Matrix
     */
    createPositioningMatrix(containerId, vendorData) {
        const vendors = Object.values(vendorData);
        const series = vendors.map(vendor => ({
            name: vendor.name,
            data: [[
                vendor.capabilities.cloudNative,
                vendor.metrics.securityScore,
                vendor.costs.tco3Year / 10000 // Bubble size based on TCO
            ]],
            color: vendor.id === 'portnox' ? this.chartTheme.portnoxColor : null
        }));

        Highcharts.chart(containerId, {
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                height: 500,
                zoomType: 'xy',
                style: { fontFamily: this.chartTheme.font.family }
            },
            title: {
                text: 'Vendor Competitive Positioning Matrix',
                style: { fontSize: '18px', fontWeight: '600' }
            },
            subtitle: {
                text: 'Cloud Readiness vs Security Excellence (Bubble size = TCO)',
                style: { fontSize: '14px' }
            },
            xAxis: {
                title: {
                    text: 'Cloud-Native Architecture Score',
                    style: { fontSize: '14px', fontWeight: '500' }
                },
                min: 0,
                max: 100,
                gridLineWidth: 1,
                plotLines: [{
                    color: '#FF6B6B',
                    dashStyle: 'dash',
                    width: 2,
                    value: 50,
                    label: {
                        text: 'Market Average',
                        style: { fontSize: '11px' }
                    }
                }]
            },
            yAxis: {
                title: {
                    text: 'Security Excellence Score',
                    style: { fontSize: '14px', fontWeight: '500' }
                },
                min: 0,
                max: 100,
                gridLineWidth: 1,
                plotLines: [{
                    color: '#FF6B6B',
                    dashStyle: 'dash',
                    width: 2,
                    value: 75,
                    label: {
                        text: 'Market Average',
                        style: { fontSize: '11px' }
                    }
                }]
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<div style="font-size:14px;font-weight:600">{point.key}</div>',
                pointFormatter: function() {
                    return '<div style="padding:5px">' +
                        '<b>Cloud-Native:</b> ' + this.x + '%<br/>' +
                        '<b>Security Score:</b> ' + this.y + '/100<br/>' +
                        '<b>3-Year TCO:</b> $' + (this.z * 10).toFixed(0) + 'K' +
                        '</div>';
                }
            },
            plotOptions: {
                bubble: {
                    minSize: 20,
                    maxSize: 60,
                    dataLabels: {
                        enabled: true,
                        format: '{series.name}',
                        style: {
                            fontSize: '11px',
                            fontWeight: '500'
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: series
        });
    }

    /**
     * Create ROI Timeline Comparison
     */
    createROITimeline(containerId, vendorData) {
        const months = Array.from({length: 37}, (_, i) => i); // 0-36 months
        const portnox = vendorData.portnox;
        const competitors = Object.values(vendorData).filter(v => v.id !== 'portnox');
        
        // Calculate cumulative ROI for each vendor
        const series = [];
        
        // Portnox ROI curve
        const portnoxROI = months.map(month => {
            if (month === 0) return 0;
            const monthlyROI = (portnox.metrics.roi3Year / 36);
            const acceleratedROI = month <= 12 ? monthlyROI * 1.5 : monthlyROI;
            return Math.min(month * acceleratedROI, portnox.metrics.roi3Year);
        });
        
        series.push({
            name: 'Portnox Cloud',
            data: portnoxROI,
            color: this.chartTheme.portnoxColor,
            lineWidth: 3,
            marker: { radius: 4 }
        });
        
        // Add top 3 competitors
        competitors.slice(0, 3).forEach((vendor, index) => {
            const vendorROI = months.map(month => {
                if (month === 0) return 0;
                const monthlyROI = (vendor.metrics.roi3Year / 36);
                return month * monthlyROI * 0.7; // Competitors have slower ROI realization
            });
            
            series.push({
                name: vendor.name,
                data: vendorROI,
                color: this.chartTheme.competitorColors[index],
                lineWidth: 2,
                dashStyle: 'dash'
            });
        });

        Highcharts.chart(containerId, {
            chart: {
                type: 'spline',
                height: 400,
                style: { fontFamily: this.chartTheme.font.family }
            },
            title: {
                text: 'ROI Realization Timeline',
                style: { fontSize: '18px', fontWeight: '600' }
            },
            subtitle: {
                text: 'Cumulative ROI % over 36 months',
                style: { fontSize: '14px' }
            },
            xAxis: {
                title: {
                    text: 'Months',
                    style: { fontSize: '14px' }
                },
                plotBands: [{
                    from: 0,
                    to: portnox.metrics.paybackMonths,
                    color: 'rgba(46, 126, 229, 0.1)',
                    label: {
                        text: 'Portnox Payback Period',
                        style: { fontSize: '12px', fontWeight: '500' }
                    }
                }]
            },
            yAxis: {
                title: {
                    text: 'Cumulative ROI %',
                    style: { fontSize: '14px' }
                },
                labels: {
                    format: '{value}%'
                },
                plotLines: [{
                    value: 100,
                    color: '#00D4AA',
                    width: 2,
                    dashStyle: 'dash',
                    label: {
                        text: 'Break-even',
                        style: { fontSize: '12px' }
                    }
                }]
            },
            tooltip: {
                shared: true,
                valueSuffix: '%'
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            series: series
        });
    }

    /**
     * Create Security Capabilities Radar
     */
    createSecurityRadar(containerId, vendorData) {
        const categories = [
            'Zero Trust Architecture',
            'Cloud Security',
            'Threat Detection',
            'Automated Response',
            'Compliance Automation',
            'Identity Management',
            'Network Segmentation',
            'Risk Analytics'
        ];
        
        const portnox = vendorData.portnox;
        const portnoxData = [
            portnox.capabilities.zeroTrust || 95,
            portnox.capabilities.cloudIntegration || 98,
            portnox.capabilities.threatDetection || 92,
            portnox.capabilities.automatedRemediation || 96,
            portnox.capabilities.compliance || 94,
            portnox.capabilities.identityIntegration || 93,
            portnox.capabilities.networkSegmentation || 91,
            portnox.capabilities.riskAnalytics || 90
        ];
        
        // Market average
        const marketAvg = categories.map(() => 75);
        
        Highcharts.chart(containerId, {
            chart: {
                type: 'area',
                polar: true,
                height: 400,
                style: { fontFamily: this.chartTheme.font.family }
            },
            title: {
                text: 'Security Capabilities Excellence',
                style: { fontSize: '18px', fontWeight: '600' }
            },
            xAxis: {
                categories: categories,
                labels: {
                    style: { fontSize: '12px' }
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                gridLineInterpolation: 'polygon',
                labels: {
                    format: '{value}%'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: '%'
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom'
            },
            series: [{
                name: 'Portnox Cloud',
                data: portnoxData,
                color: this.chartTheme.portnoxColor,
                fillOpacity: 0.3,
                lineWidth: 3,
                marker: { radius: 4 }
            }, {
                name: 'Market Average',
                data: marketAvg,
                color: '#FF6B6B',
                fillOpacity: 0.1,
                lineWidth: 2,
                dashStyle: 'dash'
            }]
        });
    }

    /**
     * Create Compliance Coverage Heatmap
     */
    createComplianceHeatmap(containerId, vendorData) {
        const frameworks = [
            'GDPR', 'HIPAA', 'PCI DSS', 'SOX', 'ISO 27001',
            'NIST CSF', 'FedRAMP', 'CCPA', 'CMMC', 'NERC CIP'
        ];
        
        const vendors = ['portnox', 'cisco-ise', 'aruba-clearpass', 'forescout', 'fortinet'];
        const data = [];
        
        vendors.forEach((vendorId, y) => {
            const vendor = vendorData[vendorId];
            if (vendor) {
                frameworks.forEach((framework, x) => {
                    const score = vendor.compliance?.[framework.toLowerCase().replace(/\s+/g, '-')] || 
                                 (vendorId === 'portnox' ? 92 : 70 + Math.random() * 20);
                    data.push([x, y, Math.round(score)]);
                });
            }
        });

        Highcharts.chart(containerId, {
            chart: {
                type: 'heatmap',
                height: 300,
                style: { fontFamily: this.chartTheme.font.family }
            },
            title: {
                text: 'Compliance Framework Coverage',
                style: { fontSize: '18px', fontWeight: '600' }
            },
            xAxis: {
                categories: frameworks,
                labels: {
                    rotation: -45,
                    style: { fontSize: '11px' }
                }
            },
            yAxis: {
                categories: vendors.map(v => vendorData[v]?.name || v),
                title: null,
                labels: {
                    style: { fontSize: '12px' }
                }
            },
            colorAxis: {
                min: 60,
                max: 100,
                stops: [
                    [0, '#FFE6E6'],
                    [0.5, '#FFD700'],
                    [1, '#00D4AA']
                ],
                labels: {
                    format: '{value}%'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b><br>' +
                           this.series.xAxis.categories[this.point.x] + ': <b>' + 
                           this.point.value + '%</b> compliance';
                }
            },
            plotOptions: {
                heatmap: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.value}',
                        style: {
                            fontSize: '10px',
                            fontWeight: '600'
                        }
                    }
                }
            },
            series: [{
                name: 'Compliance Score',
                data: data
            }]
        });
    }

    /**
     * Create Executive Decision Matrix
     */
    createDecisionMatrix(containerId, analysis) {
        const matrixHTML = `
            <div class="decision-matrix">
                <h3 class="matrix-title">Executive Decision Matrix</h3>
                
                <div class="decision-factors">
                    <div class="factor-card high-impact">
                        <div class="factor-header">
                            <i class="fas fa-dollar-sign"></i>
                            <h4>Financial Impact</h4>
                            <span class="impact-badge">HIGH IMPACT</span>
                        </div>
                        <div class="factor-content">
                            <div class="factor-metric">
                                <span class="metric-label">3-Year Savings:</span>
                                <span class="metric-value">$${(analysis.totalSavings / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Monthly OpEx Reduction:</span>
                                <span class="metric-value">$${(analysis.monthlyOpexReduction).toFixed(0)}</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Payback Period:</span>
                                <span class="metric-value">${analysis.paybackMonths} months</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="factor-card high-impact">
                        <div class="factor-header">
                            <i class="fas fa-shield-alt"></i>
                            <h4>Risk Mitigation</h4>
                            <span class="impact-badge">HIGH IMPACT</span>
                        </div>
                        <div class="factor-content">
                            <div class="factor-metric">
                                <span class="metric-label">Breach Risk Reduction:</span>
                                <span class="metric-value">${analysis.riskReduction}%</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Compliance Automation:</span>
                                <span class="metric-value">${analysis.complianceAutomation}%</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Security Score Improvement:</span>
                                <span class="metric-value">+${analysis.securityImprovement} points</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="factor-card medium-impact">
                        <div class="factor-header">
                            <i class="fas fa-cogs"></i>
                            <h4>Operational Efficiency</h4>
                            <span class="impact-badge">MEDIUM IMPACT</span>
                        </div>
                        <div class="factor-content">
                            <div class="factor-metric">
                                <span class="metric-label">FTE Reduction:</span>
                                <span class="metric-value">${analysis.fteReduction} FTE</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Automation Level:</span>
                                <span class="metric-value">${analysis.automationLevel}%</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Time Savings:</span>
                                <span class="metric-value">${analysis.annualHoursSaved} hrs/year</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="factor-card medium-impact">
                        <div class="factor-header">
                            <i class="fas fa-rocket"></i>
                            <h4>Strategic Alignment</h4>
                            <span class="impact-badge">MEDIUM IMPACT</span>
                        </div>
                        <div class="factor-content">
                            <div class="factor-metric">
                                <span class="metric-label">Cloud Readiness:</span>
                                <span class="metric-value">${analysis.cloudReadiness}%</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Future-Proof Score:</span>
                                <span class="metric-value">${analysis.futureProofScore}/10</span>
                            </div>
                            <div class="factor-metric">
                                <span class="metric-label">Innovation Index:</span>
                                <span class="metric-value">${analysis.innovationIndex}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="recommendation-panel">
                    <h4><i class="fas fa-lightbulb"></i> Executive Recommendation</h4>
                    <div class="recommendation-content">
                        <p class="recommendation-text">
                            Based on comprehensive analysis, <strong>Portnox Cloud</strong> delivers exceptional value with 
                            ${analysis.savingsPercent}% TCO reduction, ${analysis.deploymentAdvantage}% faster deployment, 
                            and industry-leading security capabilities.
                        </p>
                        <div class="action-items">
                            <h5>Recommended Actions:</h5>
                            <ol>
                                <li>Approve Portnox Cloud implementation immediately to capture $${(analysis.monthlyOpexReduction).toFixed(0)}/month savings</li>
                                <li>Initiate pilot program with IT/Security teams within 30 days</li>
                                <li>Complete full deployment within ${analysis.recommendedDeploymentMonths} months for maximum ROI</li>
                                <li>Reallocate ${analysis.fteReduction} FTE to strategic digital transformation initiatives</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById(containerId).innerHTML = matrixHTML;
    }

    /**
     * Destroy all chart instances
     */
    destroyCharts() {
        this.chartInstances.forEach((chart, id) => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.chartInstances.clear();
    }
}

// Create global instance
window.ultimateChartSystem = new UltimateChartSystem();

console.log('✅ Ultimate Chart System initialized');
