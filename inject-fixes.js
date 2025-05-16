/**
 * Inject Fixes Script
 * This script can be pasted in the browser console to fix issues without requiring server-side changes
 */
(function() {
    console.log('Injecting TCO Analyzer fixes...');
    
    // Fix Portnox logo
    fixPortnoxLogo();
    
    // Fix vendor logos
    fixVendorLogos();
    
    // Fix tab switching
    fixTabSwitching();
    
    // Add missing CSS
    addCSS();

    // Initialize heatmaps if present
    initHeatmaps();
    
    console.log('Fixes successfully injected!');
    
    // Fix Portnox logo
    function fixPortnoxLogo() {
        const portnoxLogos = document.querySelectorAll('.company-logo');
        portnoxLogos.forEach(logo => {
            if (!logo.complete || logo.naturalHeight === 0) {
                console.log('Fixing Portnox logo');
                logo.onerror = null; // Prevent error loop
                
                // Create SVG logo
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '120');
                svg.setAttribute('height', '40');
                svg.setAttribute('viewBox', '0 0 120 40');
                svg.innerHTML = `
                    <rect width="120" height="40" fill="#2c3e50" rx="4" ry="4"/>
                    <text x="60" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">PORTNOX</text>
                `;
                svg.className = 'company-logo';
                
                // Replace the img with SVG
                logo.parentNode.replaceChild(svg, logo);
            }
        });
    }
    
    // Fix vendor logos
    function fixVendorLogos() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            const vendor = card.getAttribute('data-vendor');
            const logoContainer = card.querySelector('.vendor-logo');
            
            if (logoContainer) {
                const logoImg = logoContainer.querySelector('img');
                
                if (logoImg && (!logoImg.complete || logoImg.naturalHeight === 0)) {
                    console.log(`Fixing ${vendor} logo`);
                    logoImg.style.display = 'none';
                    
                    // Create fallback text
                    const fallback = document.createElement('div');
                    fallback.style.width = '100%';
                    fallback.style.height = '100%';
                    fallback.style.display = 'flex';
                    fallback.style.alignItems = 'center';
                    fallback.style.justifyContent = 'center';
                    fallback.style.backgroundColor = '#f0f0f0';
                    fallback.style.color = '#333';
                    fallback.style.fontWeight = 'bold';
                    fallback.style.fontSize = '12px';
                    fallback.style.borderRadius = '4px';
                    fallback.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1);
                    
                    logoContainer.appendChild(fallback);
                }
            }
        });
    }
    
    // Fix tab switching
    function fixTabSwitching() {
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`Switching to view: ${view}`);
                
                // Update active tab
                stakeholderTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active panel
                document.querySelectorAll('.view-panel').forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                        
                        // Activate first results tab
                        const firstTab = panel.querySelector('.results-tab');
                        if (firstTab) {
                            firstTab.click();
                        }
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
        
        // Fix results tabs
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                const tabsContainer = this.parentElement;
                
                // Update active tab
                tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Find parent view panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
                    // Update active panel
                    viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                        if (panel.id === panelId) {
                            panel.classList.add('active');
                        } else {
                            panel.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // Add missing CSS
    function addCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fix tab switching */
            .view-panel {
                display: none;
            }
            .view-panel.active {
                display: block;
            }
            .results-panel {
                display: none;
            }
            .results-panel.active {
                display: block;
            }
            
            /* Heatmap styles */
            .risk-cell {
                text-align: center;
                font-weight: 600;
                border-radius: 4px;
            }
            .risk-low {
                background-color: #d4edda;
                color: #155724;
            }
            .risk-medium {
                background-color: #fff3cd;
                color: #856404;
            }
            .risk-high {
                background-color: #f8d7da;
                color: #721c24;
            }
            .security-cell {
                text-align: center;
                font-weight: 600;
                border-radius: 4px;
            }
            .security-high {
                background-color: #d4edda;
                color: #155724;
            }
            .security-medium {
                background-color: #fff3cd;
                color: #856404;
            }
            .security-low {
                background-color: #f8d7da;
                color: #721c24;
            }
            .heatmap-legend {
                display: flex;
                gap: 20px;
                margin-top: 15px;
                justify-content: center;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .legend-color {
                width: 20px;
                height: 20px;
                border-radius: 4px;
            }
            .legend-label {
                font-size: 13px;
                color: #555;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize heatmaps if present
    function initHeatmaps() {
        const riskHeatmap = document.getElementById('risk-heatmap');
        const securityHeatmap = document.getElementById('security-heatmap');
        
        if (riskHeatmap) {
            console.log('Initializing risk heatmap');
            createRiskHeatmap(riskHeatmap);
        }
        
        if (securityHeatmap) {
            console.log('Initializing security heatmap');
            createSecurityHeatmap(securityHeatmap);
        }
    }
    
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
        let html = `
            <div class="heatmap-table-container">
                <table class="heatmap-table" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <thead>
                        <tr>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Risk Category</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">No NAC</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Basic NAC</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Portnox Cloud</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        riskData.forEach(item => {
            html += `
                <tr>
                    <td style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.category}</td>
                    <td class="risk-cell risk-${item.noNac.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.noNac}</td>
                    <td class="risk-cell risk-${item.basicNac.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.basicNac}</td>
                    <td class="risk-cell risk-${item.portnox.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.portnox}</td>
                </tr>
            `;
        });
        
        html += `
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
        let html = `
            <div class="heatmap-table-container">
                <table class="heatmap-table" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <thead>
                        <tr>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Security Capability</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Portnox Cloud</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Cisco ISE</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Aruba ClearPass</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Forescout</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        securityData.forEach(item => {
            html += `
                <tr>
                    <td style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.capability}</td>
                    <td class="security-cell security-${item.portnox.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.portnox}</td>
                    <td class="security-cell security-${item.cisco.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.cisco}</td>
                    <td class="security-cell security-${item.aruba.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.aruba}</td>
                    <td class="security-cell security-${item.forescout.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.forescout}</td>
                </tr>
            `;
        });
        
        html += `
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
})();
