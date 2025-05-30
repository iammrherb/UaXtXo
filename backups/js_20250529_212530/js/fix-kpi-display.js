// Fix KPI display
(function() {
    console.log('📊 Fixing KPI display...');
    
    // Override updateKPIs method
    function fixKPIs() {
        if (!window.dashboard) {
            setTimeout(fixKPIs, 500);
            return;
        }
        
        window.dashboard.updateKPIs = function() {
            const portnox = this.vendorData?.portnox;
            const cisco = this.vendorData?.cisco;
            
            console.log('Updating KPIs with:', { portnox, cisco });
            
            if (!portnox || !cisco) {
                console.log('❌ Missing vendor data for KPIs');
                return;
            }
            
            const savings = (cisco.tco?.tco || 0) - (portnox.tco?.tco || 0);
            const avgCompetitorTCO = this.calculateAverageCompetitorTCO();
            const portnoxSavingsPercent = avgCompetitorTCO > 0 ? 
                Math.round(((avgCompetitorTCO - (portnox.tco?.tco || 0)) / avgCompetitorTCO) * 100) : 0;
            
            // Update KPI values
            const kpiValues = document.querySelectorAll('.kpi-value');
            const kpiChanges = document.querySelectorAll('.kpi-change');
            
            if (kpiValues[0]) {
                kpiValues[0].textContent = `$${savings > 0 ? (savings / 1000).toFixed(0) : '0'}K`;
            }
            
            if (kpiChanges[0]) {
                kpiChanges[0].textContent = `+${portnoxSavingsPercent}% vs Market Avg`;
            }
            
            if (kpiValues[1]) {
                kpiValues[1].textContent = `${portnox.roi?.roi || 0}%`;
            }
            
            if (kpiChanges[1]) {
                kpiChanges[1].textContent = `Annual: $${((portnox.roi?.annualSavings || 0) / 1000).toFixed(0)}K`;
            }
            
            if (kpiValues[2]) {
                kpiValues[2].textContent = `${portnox.roi?.paybackMonths || 0}`;
            }
            
            if (kpiChanges[2]) {
                kpiChanges[2].textContent = `${portnox.metrics?.implementationDays || 0} Days Deploy`;
            }
            
            if (kpiValues[3]) {
                kpiValues[3].textContent = `${portnox.risk?.riskReduction || 30}%`;
            }
            
            if (kpiChanges[3]) {
                kpiChanges[3].textContent = `Score: ${portnox.metrics?.securityScore || 0}/100`;
            }
        };
        
        // Add help icons to KPIs
        window.dashboard.addHelpToKPIs = function() {
            const kpiLabels = document.querySelectorAll('.kpi-label');
            const helpTopics = ['tco', 'roi', 'payback', 'risk'];
            
            kpiLabels.forEach((label, index) => {
                if (!label.querySelector('.help-icon') && helpTopics[index]) {
                    label.insertAdjacentHTML('beforeend', 
                        ` <i class="help-icon fas fa-question-circle" data-help="${helpTopics[index]}" title="Click for explanation"></i>`
                    );
                }
            });
            
            // Add click handlers
            document.querySelectorAll('.help-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showHelpTooltip(e.target);
                });
            });
        };
        
        // Help tooltip display
        window.dashboard.showHelpTooltip = function(icon) {
            const helpContent = {
                tco: {
                    title: "3-Year Savings Calculation",
                    content: "Total savings comparing Portnox TCO to Cisco ISE over 3 years. Includes licensing, implementation, operational costs, and infrastructure."
                },
                roi: {
                    title: "Return on Investment",
                    content: "ROI = (Total Savings / Portnox Investment) × 100%. Shows the percentage return on your Portnox investment."
                },
                payback: {
                    title: "Payback Period",
                    content: "Number of months until cumulative savings equal the initial investment. Shorter is better."
                },
                risk: {
                    title: "Risk Reduction",
                    content: "Percentage reduction in security breach probability based on improved security controls and automation."
                }
            };
            
            const help = helpContent[icon.dataset.help];
            if (!help) return;
            
            // Remove existing tooltip
            document.querySelector('.help-tooltip')?.remove();
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'help-tooltip';
            tooltip.innerHTML = `
                <div class="help-header">
                    <h4>${help.title}</h4>
                    <button onclick="this.closest('.help-tooltip').remove()">×</button>
                </div>
                <div class="help-content">${help.content}</div>
            `;
            
            // Position tooltip
            const rect = icon.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.zIndex = '10000';
            
            document.body.appendChild(tooltip);
            
            // Close on outside click
            setTimeout(() => {
                document.addEventListener('click', function closeTooltip(e) {
                    if (!tooltip.contains(e.target)) {
                        tooltip.remove();
                        document.removeEventListener('click', closeTooltip);
                    }
                });
            }, 100);
        };
    }
    
    fixKPIs();
})();
