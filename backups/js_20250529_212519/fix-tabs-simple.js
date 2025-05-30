// SIMPLE TAB FIX
document.addEventListener('DOMContentLoaded', function() {
    if (window.dashboard) {
        // Fix Vendor Comparison Tab
        window.dashboard.renderVendorComparison = function(container) {
            container.innerHTML = `
                <div style="padding: 20px;">
                    <h2>Vendor Comparison</h2>
                    <div id="vendor-comparison-chart" style="height: 400px; background: white; margin: 20px 0;"></div>
                    <table style="width: 100%; background: white; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 10px; text-align: left;">Vendor</th>
                                <th style="padding: 10px;">3-Year TCO</th>
                                <th style="padding: 10px;">Deploy Days</th>
                                <th style="padding: 10px;">FTE</th>
                                <th style="padding: 10px;">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.values(this.vendorData || {}).slice(0, 10).map(v => `
                                <tr style="${v.key === 'portnox' ? 'background: #d4edda;' : ''}">
                                    <td style="padding: 10px; font-weight: bold;">${v.name}</td>
                                    <td style="padding: 10px; text-align: center;">$${(v.tco.tco/1000).toFixed(0)}K</td>
                                    <td style="padding: 10px; text-align: center;">${v.metrics.implementationDays}</td>
                                    <td style="padding: 10px; text-align: center;">${v.metrics.fteRequired}</td>
                                    <td style="padding: 10px; text-align: center;">${v.score}/100</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            
            // Simple chart
            setTimeout(() => {
                if (Highcharts && document.getElementById('vendor-comparison-chart')) {
                    const vendors = Object.values(this.vendorData || {}).slice(0, 8);
                    Highcharts.chart('vendor-comparison-chart', {
                        chart: { type: 'column' },
                        title: { text: 'Total Cost of Ownership' },
                        xAxis: { categories: vendors.map(v => v.name) },
                        yAxis: { title: { text: 'Cost ($)' } },
                        series: [{
                            name: 'TCO',
                            data: vendors.map(v => v.tco.tco)
                        }]
                    });
                }
            }, 100);
        };
        
        // Fix Risk Analysis Tab
        window.dashboard.renderRiskAnalysis = function(container) {
            container.innerHTML = `
                <div style="padding: 20px;">
                    <h2>Risk & Security Analysis</h2>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0;">
                        <div style="background: white; padding: 20px; text-align: center; border-radius: 8px;">
                            <h3 style="color: #28a745; font-size: 36px; margin: 0;">94/100</h3>
                            <p>Security Score</p>
                        </div>
                        <div style="background: white; padding: 20px; text-align: center; border-radius: 8px;">
                            <h3 style="color: #28a745; font-size: 36px; margin: 0;">30%</h3>
                            <p>Risk Reduction</p>
                        </div>
                        <div style="background: white; padding: 20px; text-align: center; border-radius: 8px;">
                            <h3 style="color: #28a745; font-size: 36px; margin: 0;">$1.3M</h3>
                            <p>Saved from Breaches</p>
                        </div>
                        <div style="background: white; padding: 20px; text-align: center; border-radius: 8px;">
                            <h3 style="color: #28a745; font-size: 36px; margin: 0;">78%</h3>
                            <p>Faster Response</p>
                        </div>
                    </div>
                    <div id="risk-chart" style="height: 400px; background: white; margin: 20px 0;"></div>
                </div>
            `;
            
            // Simple risk chart
            setTimeout(() => {
                if (Highcharts && document.getElementById('risk-chart')) {
                    Highcharts.chart('risk-chart', {
                        chart: { type: 'column' },
                        title: { text: 'Security Comparison' },
                        xAxis: { categories: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'] },
                        yAxis: { title: { text: 'Score' }, max: 100 },
                        series: [{
                            name: 'Security Score',
                            data: [94, 82, 78, 75],
                            color: '#28a745'
                        }]
                    });
                }
            }, 100);
        };
    }
});
