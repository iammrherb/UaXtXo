// Fix All Tabs
console.log("📑 Fixing all tabs...");

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.dashboard) {
            // Ensure Industries & Compliance tab works
            if (!window.dashboard.renderIndustriesCompliance) {
                window.dashboard.renderIndustriesCompliance = function(container) {
                    if (window.renderComplianceMatrix) {
                        window.renderComplianceMatrix(container);
                    } else {
                        container.innerHTML = '<p>Loading compliance data...</p>';
                    }
                };
            }
            
            // Ensure Risk Assessment tab works
            if (!window.dashboard.renderRiskAnalysis) {
                window.dashboard.renderRiskAnalysis = function(container) {
                    if (window.renderRiskAssessment) {
                        window.renderRiskAssessment(container);
                    } else {
                        container.innerHTML = '<p>Loading risk assessment...</p>';
                    }
                };
            }
        }
    }, 1000);
});
