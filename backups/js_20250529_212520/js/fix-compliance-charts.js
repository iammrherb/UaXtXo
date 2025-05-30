/**
 * Complete Compliance Charts Implementation
 */

class ComplianceCharts {
    renderComplianceTimeline(container) {
        if (!container) return;
        
        const categories = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'];
        const manualData = [40, 42, 41, 43, 45];
        const portnoxData = [40, 65, 80, 90, 95];
        
        Highcharts.chart(container, {
            chart: {
                type: 'area',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: 'Compliance Readiness Timeline' },
            xAxis: { categories: categories },
            yAxis: {
                title: { text: 'Compliance Score (%)' },
                max: 100
            },
            series: [{
                name: 'Manual Process',
                data: manualData,
                color: '#dc3545'
            }, {
                name: 'With Portnox',
                data: portnoxData,
                color: '#28a745'
            }],
            plotOptions: {
                area: {
                    fillOpacity: 0.3,
                    marker: { enabled: true }
                }
            },
            credits: { enabled: false }
        });
    }
    
    renderComplianceCosts(container) {
        if (!container) return;
        
        const frameworks = ['PCI DSS', 'HIPAA', 'GDPR', 'SOX', 'ISO 27001'];
        const manualCosts = [200000, 180000, 300000, 250000, 120000];
        const portnoxCosts = [50000, 45000, 75000, 60000, 30000];
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                style: { fontFamily: 'Inter, sans-serif' }
            },
            title: { text: 'Compliance Implementation Costs' },
            xAxis: { categories: frameworks },
            yAxis: {
                title: { text: 'Implementation Cost ($)' },
                labels: {
                    formatter: function() {
                        return '$' + (this.value / 1000) + 'K';
                    }
                }
            },
            series: [{
                name: 'Traditional Approach',
                data: manualCosts,
                color: '#dc3545'
            }, {
                name: 'With Portnox',
                data: portnoxCosts,
                color: '#28a745'
            }],
            plotOptions: {
                column: {
                    borderRadius: 4,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '$' + (this.y / 1000) + 'K';
                        },
                        style: { fontSize: '10px' }
                    }
                }
            },
            credits: { enabled: false }
        });
    }
    
    init() {
        // Initialize compliance charts when needed
        const observer = new MutationObserver(() => {
            const timeline = document.getElementById('compliance-timeline-chart');
            const costs = document.getElementById('compliance-costs-chart');
            
            if (timeline && !timeline.hasChildNodes()) {
                this.renderComplianceTimeline('compliance-timeline-chart');
            }
            if (costs && !costs.hasChildNodes()) {
                this.renderComplianceCosts('compliance-costs-chart');
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize compliance charts
window.complianceCharts = new ComplianceCharts();
window.complianceCharts.init();
