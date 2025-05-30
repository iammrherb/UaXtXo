// Fix KPI calculations
(function() {
    console.log('📊 Fixing KPI calculations...');
    
    function fixKPICalculations() {
        if (!window.dashboard) {
            setTimeout(fixKPICalculations, 100);
            return;
        }
        
        // Override the KPI calculation
        const originalUpdateKPIs = window.dashboard.updateKPIs;
        
        window.dashboard.updateKPIs = function() {
            console.log('📊 Updating KPIs with fixed calculations...');
            
            const portnox = this.vendorData?.portnox;
            const cisco = this.vendorData?.cisco;
            
            if (!portnox || !cisco) {
                console.log('❌ Missing vendor data for KPIs');
                return;
            }
            
            // Calculate savings
            const portnoxTCO = portnox.tco?.tco || 0;
            const ciscoTCO = cisco.tco?.tco || 0;
            const savings = ciscoTCO - portnoxTCO;
            
            // Calculate average competitor TCO
            const competitors = Object.values(this.vendorData || {})
                .filter(v => v.key !== 'portnox');
            const avgCompetitorTCO = competitors.length > 0 ?
                competitors.reduce((sum, v) => sum + (v.tco?.tco || 0), 0) / competitors.length : 0;
            
            const savingsVsAvg = avgCompetitorTCO - portnoxTCO;
            const savingsPercent = avgCompetitorTCO > 0 ? 
                Math.round((savingsVsAvg / avgCompetitorTCO) * 100) : 0;
            
            console.log('KPI Values:', {
                savings: savings,
                portnoxTCO: portnoxTCO,
                ciscoTCO: ciscoTCO,
                avgCompetitorTCO: avgCompetitorTCO,
                savingsPercent: savingsPercent
            });
            
            // Update DOM elements
            const kpiElements = {
                savings: document.querySelector('.kpi-card:nth-child(1) .kpi-value'),
                savingsPercent: document.querySelector('.kpi-card:nth-child(1) .kpi-change'),
                roi: document.querySelector('.kpi-card:nth-child(2) .kpi-value'),
                roiAnnual: document.querySelector('.kpi-card:nth-child(2) .kpi-change'),
                payback: document.querySelector('.kpi-card:nth-child(3) .kpi-value'),
                paybackDeploy: document.querySelector('.kpi-card:nth-child(3) .kpi-change'),
                risk: document.querySelector('.kpi-card:nth-child(4) .kpi-value'),
                riskScore: document.querySelector('.kpi-card:nth-child(4) .kpi-change')
            };
            
            // Update values
            if (kpiElements.savings) {
                kpiElements.savings.textContent = `$${savings > 0 ? (savings / 1000).toFixed(0) : '0'}K`;
            }
            
            if (kpiElements.savingsPercent) {
                kpiElements.savingsPercent.textContent = `+${savingsPercent}% vs Market Avg`;
            }
            
            if (kpiElements.roi) {
                kpiElements.roi.textContent = `${portnox.roi?.roi || 0}%`;
            }
            
            if (kpiElements.roiAnnual) {
                kpiElements.roiAnnual.textContent = `Annual: $${((portnox.roi?.annualSavings || 0) / 1000).toFixed(0)}K`;
            }
            
            if (kpiElements.payback) {
                kpiElements.payback.textContent = `${portnox.roi?.paybackMonths || 0}`;
            }
            
            if (kpiElements.paybackDeploy) {
                kpiElements.paybackDeploy.textContent = `${portnox.metrics?.implementationDays || 21} Days Deploy`;
            }
            
            if (kpiElements.risk) {
                kpiElements.risk.textContent = `${portnox.risk?.riskReduction || 30}%`;
            }
            
            if (kpiElements.riskScore) {
                kpiElements.riskScore.textContent = `Score: ${portnox.metrics?.securityScore || 95}/100`;
            }
            
            // Add help icons if not already present
            if (this.addHelpToKPIs) {
                this.addHelpToKPIs();
            }
        };
    }
    
    fixKPICalculations();
})();
