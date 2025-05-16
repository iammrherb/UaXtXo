// Heat Map Fix Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Heatmap fix loaded');
    
    // Initialize risk heatmap
    const riskHeatmap = document.getElementById('risk-heatmap');
    if (riskHeatmap) {
        createRiskHeatmap(riskHeatmap);
    }
    
    // Initialize security heatmap
    const securityHeatmap = document.getElementById('security-heatmap');
    if (securityHeatmap) {
        createSecurityHeatmap(securityHeatmap);
    }
});

// Create risk heatmap
function createRiskHeatmap(container) {
    // Sample data for risk heatmap
    const riskData = [
        { category: 'Data Breach', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Unauthorized Access', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Compliance Violation', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Internal Threat', noNac: 'Medium', basicNac: 'Medium', portnox: 'Low' },
        { category: 'External Threat', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Shadow IT', noNac: 'High', basicNac: 'High', portnox: 'Low' },
        { category: 'Outdated Devices', noNac: 'High', basicNac: 'Medium', portnox: 'Low' }
    ];
    
    // Create HTML table for heatmap
    const html = `
        <div class="heatmap-table-container">
            <table class="heatmap-table">
                <thead>
                    <tr>
                        <th>Risk Category</th>
                        <th>No NAC</th>
                        <th>Basic NAC</th>
                        <th>Portnox Cloud</th>
                    </tr>
                </thead>
                <tbody>
                    ${riskData.map(item => `
                        <tr>
                            <td>${item.category}</td>
                            <td class="risk-cell risk-${item.noNac.toLowerCase()}">${item.noNac}</td>
                            <td class="risk-cell risk-${item.basicNac.toLowerCase()}">${item.basicNac}</td>
                            <td class="risk-cell risk-${item.portnox.toLowerCase()}">${item.portnox}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="heatmap-legend">
            <div class="legend-item">
                <div class="legend-color risk-low"></div>
                <div class="legend-label">Low Risk</div>
            </div>
            <div class="legend-item">
                <div class="legend-color risk-medium"></div>
                <div class="legend-label">Medium Risk</div>
            </div>
            <div class="legend-item">
                <div class="legend-color risk-high"></div>
                <div class="legend-label">High Risk</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Create security heatmap
function createSecurityHeatmap(container) {
    // Sample data for security heatmap
    const securityData = [
        { capability: 'Device Visibility', portnox: 'High', cisco: 'High', aruba: 'High', forescout: 'High' },
        { capability: 'Zero Trust Support', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Cloud Native Security', portnox: 'High', cisco: 'Low', aruba: 'Medium', forescout: 'Low' },
        { capability: 'Threat Detection', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'High' },
        { capability: 'Automatic Remediation', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Compliance Enforcement', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Remote Worker Security', portnox: 'High', cisco: 'Medium', aruba: 'Low', forescout: 'Low' }
    ];
    
    // Create HTML table for heatmap
    const html = `
        <div class="heatmap-table-container">
            <table class="heatmap-table">
                <thead>
                    <tr>
                        <th>Security Capability</th>
                        <th>Portnox Cloud</th>
                        <th>Cisco ISE</th>
                        <th>Aruba ClearPass</th>
                        <th>Forescout</th>
                    </tr>
                </thead>
                <tbody>
                    ${securityData.map(item => `
                        <tr>
                            <td>${item.capability}</td>
                            <td class="security-cell security-${item.portnox.toLowerCase()}">${item.portnox}</td>
                            <td class="security-cell security-${item.cisco.toLowerCase()}">${item.cisco}</td>
                            <td class="security-cell security-${item.aruba.toLowerCase()}">${item.aruba}</td>
                            <td class="security-cell security-${item.forescout.toLowerCase()}">${item.forescout}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="heatmap-legend">
            <div class="legend-item">
                <div class="legend-color security-high"></div>
                <div class="legend-label">High Capability</div>
            </div>
            <div class="legend-item">
                <div class="legend-color security-medium"></div>
                <div class="legend-label">Medium Capability</div>
            </div>
            <div class="legend-item">
                <div class="legend-color security-low"></div>
                <div class="legend-label">Low Capability</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
