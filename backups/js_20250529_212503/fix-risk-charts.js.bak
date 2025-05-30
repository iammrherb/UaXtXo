/**
 * Complete Risk Assessment Charts Implementation
 */

class RiskAssessmentCharts {
    constructor() {
        this.vendorData = null;
    }
    
    renderRiskMatrix(container) {
        if (!container) return;
        
        const vendors = Object.values(window.dashboard?.vendorData || {}).slice(0, 10);
        
        const data = vendors.map(vendor => ({
            x: vendor.metrics.securityScore || 75,
            y: vendor.risk?.breachReduction || 20,
            z: vendor.tco.tco / 10000,
            name: vendor.name,
            color: vendor.key === 'portnox' ? '#28a745' : '#6c757d'
        }));
        
        Highcharts.chart(container, {
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: 'Security vs Risk Reduction Matrix' },
            xAxis: {
                title: { text: 'Security Score' },
                min: 50,
                max: 100
            },
            yAxis: {
                title: { text: 'Risk Reduction (%)' },
                min: 0,
                max: 50
            },
            series: [{
                name: 'Vendors',
                data: data,
                marker: {
                    fillOpacity: 0.8
                }
            }],
            plotOptions: {
                bubble: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        style: { fontSize: '10px' }
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.name + '</b><br/>' +
                           'Security Score: ' + this.x + '<br/>' +
                           'Risk Reduction: ' + this.y + '%<br/>' +
                           'TCO: $' + Math.round(this.point.z * 10) + 'K';
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderThreatCoverage(container) {
        if (!container) return;
        
        const categories = [
            'Malware Protection',
            'Zero-Day Threats',
            'Insider Threats',
            'IoT Security',
            'Cloud Security',
            'Compliance'
        ];
        
        const portnoxData = [95, 92, 88, 96, 94, 93];
        const competitorData = [78, 72, 65, 70, 82, 75];
        
        Highcharts.chart(container, {
            chart: {
                type: 'radar',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: 'Threat Coverage Comparison' },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                max: 100
            },
            series: [{
                name: 'Portnox',
                data: portnoxData,
                color: '#28a745',
                pointPlacement: 'on'
            }, {
                name: 'Industry Average',
                data: competitorData,
                color: '#6c757d',
                pointPlacement: 'on'
            }],
            plotOptions: {
                series: {
                    fillOpacity: 0.3
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderBreachCostAnalysis(container) {
        if (!container) return;
        
        const config = window.dashboard?.config || {};
        const breachCost = config.breachCost || 4350000;
        
        const data = [
            ['Without Portnox', breachCost],
            ['Risk Reduction', -breachCost * 0.30],
            ['With Portnox', breachCost * 0.70]
        ];
        
        Highcharts.chart(container, {
            chart: {
                type: 'waterfall',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: 'Breach Cost Impact Analysis' },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: { text: 'Potential Breach Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000000).toFixed(1) + 'M';
                    }
                }
            },
            series: [{
                name: 'Breach Cost',
                data: data,
                color: '#2E7EE5',
                negativeColor: '#28a745',
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return '$' + (Math.abs(this.y) / 1000000).toFixed(1) + 'M';
                    }
                }
            }],
            plotOptions: {
                waterfall: {
                    borderRadius: 4
                }
            },
            credits: { enabled: false }
        });
    }
    
    init() {
        // Initialize all risk charts when tab is shown
        const observer = new MutationObserver(() => {
            const riskMatrix = document.getElementById('risk-matrix-chart');
            const threatCoverage = document.getElementById('threat-coverage-chart');
            const breachAnalysis = document.getElementById('breach-cost-analysis-chart');
            
            if (riskMatrix && !riskMatrix.hasChildNodes()) {
                this.renderRiskMatrix('risk-matrix-chart');
            }
            if (threatCoverage && !threatCoverage.hasChildNodes()) {
                this.renderThreatCoverage('threat-coverage-chart');
            }
            if (breachAnalysis && !breachAnalysis.hasChildNodes()) {
                this.renderBreachCostAnalysis('breach-cost-analysis-chart');
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize risk charts
window.riskAssessmentCharts = new RiskAssessmentCharts();
window.riskAssessmentCharts.init();
