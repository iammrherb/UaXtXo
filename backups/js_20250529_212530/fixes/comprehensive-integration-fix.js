// Temporary fix to add missing method to comprehensive integration

// Check if we need to add the populateComplianceGrid method
const checkInterval = setInterval(() => {
    if (window.comprehensiveIntegration && window.comprehensiveIntegration.ultimateView) {
        const view = window.comprehensiveIntegration.ultimateView;
        
        // Add populateComplianceGrid if missing
        if (!view.populateComplianceGrid) {
            view.populateComplianceGrid = function() {
                console.log("✅ Using patched populateComplianceGrid");
                const container = document.getElementById('compliance-requirements');
                if (!container || !this.complianceData) return;
                
                const complianceHTML = Object.keys(this.complianceData).map(key => {
                    const compliance = this.complianceData[key];
                    const isSelected = this.config.selectedCompliance.includes(key);
                    
                    return `
                        <div class="compliance-item ${isSelected ? 'selected' : ''}" data-compliance="${key}">
                            <div class="compliance-checkbox">
                                <i class="fas ${isSelected ? 'fa-check-square' : 'fa-square'}"></i>
                            </div>
                            <div class="compliance-info">
                                <div class="compliance-name">${compliance.name}</div>
                                <div class="compliance-priority priority-${compliance.priority.toLowerCase()}">${compliance.priority}</div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                container.innerHTML = complianceHTML;
                console.log(`✅ Populated ${Object.keys(this.complianceData).length} compliance frameworks`);
            };
        }
        
        clearInterval(checkInterval);
        console.log("✅ Comprehensive integration fixed");
    }
}, 100);

// Also ensure the method exists on the prototype
if (typeof UltimateExecutiveView !== 'undefined' && !UltimateExecutiveView.prototype.populateComplianceGrid) {
    UltimateExecutiveView.prototype.populateComplianceGrid = function() {
        console.log("✅ Using prototype populateComplianceGrid");
        const container = document.getElementById('compliance-requirements');
        if (!container || !this.complianceData) return;
        
        const complianceHTML = Object.keys(this.complianceData).map(key => {
            const compliance = this.complianceData[key];
            const isSelected = this.config.selectedCompliance.includes(key);
            
            return `
                <div class="compliance-item ${isSelected ? 'selected' : ''}" data-compliance="${key}">
                    <div class="compliance-checkbox">
                        <i class="fas ${isSelected ? 'fa-check-square' : 'fa-square'}"></i>
                    </div>
                    <div class="compliance-info">
                        <div class="compliance-name">${compliance.name}</div>
                        <div class="compliance-priority priority-${compliance.priority.toLowerCase()}">${compliance.priority}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = complianceHTML;
        console.log(`✅ Populated ${Object.keys(this.complianceData).length} compliance frameworks`);
    };
}
