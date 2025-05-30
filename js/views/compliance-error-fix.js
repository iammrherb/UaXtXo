/**
 * Compliance Error Fix - Handles undefined industry
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Compliance error fix loading...');
    
    const fixCompliance = () => {
        if (!window.complianceModule || !window.ComplianceFrameworkData) {
            setTimeout(fixCompliance, 100);
            return;
        }
        
        // Override render to handle missing industry
        const originalRender = window.complianceModule.render;
        
        window.complianceModule.render = function(container, calculationResults) {
            console.log('📋 Rendering compliance with error handling...');
            
            if (!container || !calculationResults) {
                console.error('Missing container or results');
                return;
            }
            
            // Ensure industry is set
            const selectedIndustry = this.platform.config.industry || 'technology';
            const deviceCount = this.platform.config.deviceCount || 500;
            
            // Validate industry exists
            if (!this.data.industries[selectedIndustry]) {
                console.warn(`Industry ${selectedIndustry} not found, defaulting to technology`);
                this.platform.config.industry = 'technology';
            }
            
            try {
                // Call original render with validated data
                originalRender.call(this, container, calculationResults);
            } catch (error) {
                console.error('Compliance render error:', error);
                container.innerHTML = `
                    <div class="compliance-error" style="padding: 40px; text-align: center;">
                        <h2 style="color: #F87171;">Compliance Module Error</h2>
                        <p style="color: #94A3B8;">Unable to load compliance analysis. Please refresh the page.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #00D4AA; color: #1E293B; border: none; border-radius: 6px; cursor: pointer;">
                            Refresh Page
                        </button>
                    </div>
                `;
            }
        };
        
        // Also fix the renderComplianceHeader method
        const originalRenderHeader = window.complianceModule.renderComplianceHeader;
        
        window.complianceModule.renderComplianceHeader = function(industry) {
            // Validate industry parameter
            if (!industry || !this.data.industries[industry]) {
                console.warn(`Invalid industry: ${industry}, using technology`);
                industry = 'technology';
            }
            
            const ind = this.data.industries[industry];
            
            // Ensure ind has required properties
            if (!ind || !ind.primaryFrameworks) {
                console.error('Invalid industry data:', ind);
                return `
                    <div class="compliance-header">
                        <h2 class="gradient-text">Compliance & Regulatory Analysis</h2>
                        <p style="color: #94A3B8;">Select an industry to begin analysis</p>
                    </div>
                `;
            }
            
            return originalRenderHeader.call(this, industry);
        };
        
        console.log('✅ Compliance error fix applied');
    };
    
    fixCompliance();
});
