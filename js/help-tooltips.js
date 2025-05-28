// Help Tooltips System
(function() {
    console.log('💡 Adding help tooltips...');
    
    // Define help content for all metrics
    const helpContent = {
        tco: {
            title: "Total Cost of Ownership (TCO)",
            content: "TCO includes all costs associated with the solution over the analysis period:<br/>" +
                    "• Licensing costs (per device × devices × months)<br/>" +
                    "• Implementation costs (professional services)<br/>" +
                    "• Operational costs (FTE × salary × years)<br/>" +
                    "• Infrastructure costs (hardware/cloud)<br/>" +
                    "• Training and maintenance"
        },
        roi: {
            title: "Return on Investment (ROI)",
            content: "ROI = (Gains - Investment) / Investment × 100%<br/>" +
                    "• Gains: Cost savings vs. baseline vendor<br/>" +
                    "• Investment: Total TCO of solution<br/>" +
                    "• Higher ROI = Better financial return"
        },
        payback: {
            title: "Payback Period",
            content: "Time required to recover the initial investment through cost savings:<br/>" +
                    "• Calculated monthly based on operational savings<br/>" +
                    "• Shorter payback = Faster return on investment<br/>" +
                    "• Industry average: 18-24 months"
        },
        risk: {
            title: "Risk Reduction",
            content: "Percentage reduction in security breach probability:<br/>" +
                    "• Based on security score improvements<br/>" +
                    "• Includes automated threat response<br/>" +
                    "• Impacts cyber insurance premiums"
        },
        fte: {
            title: "Full-Time Equivalent (FTE)",
            content: "Number of full-time employees required to manage the solution:<br/>" +
                    "• Lower FTE = Higher automation<br/>" +
                    "• Includes daily operations and maintenance<br/>" +
                    "• Cost = FTE × Annual Salary"
        },
        deployment: {
            title: "Deployment Time",
            content: "Days required for full implementation:<br/>" +
                    "• Includes planning, installation, configuration<br/>" +
                    "• Faster deployment = Quicker time to value<br/>" +
                    "• Cloud solutions typically 75% faster"
        }
    };
    
    // Add help icons to KPI cards
    function addHelpIcons() {
        setTimeout(() => {
            // Add to KPI cards
            const kpiCards = document.querySelectorAll('.kpi-card');
            if (kpiCards.length > 0) {
                kpiCards[0]?.querySelector('.kpi-label')?.insertAdjacentHTML('beforeend', 
                    '<i class="help-icon fas fa-question-circle" data-help="tco"></i>');
                kpiCards[1]?.querySelector('.kpi-label')?.insertAdjacentHTML('beforeend', 
                    '<i class="help-icon fas fa-question-circle" data-help="roi"></i>');
                kpiCards[2]?.querySelector('.kpi-label')?.insertAdjacentHTML('beforeend', 
                    '<i class="help-icon fas fa-question-circle" data-help="payback"></i>');
                kpiCards[3]?.querySelector('.kpi-label')?.insertAdjacentHTML('beforeend', 
                    '<i class="help-icon fas fa-question-circle" data-help="risk"></i>');
            }
            
            // Add event listeners
            document.querySelectorAll('.help-icon').forEach(icon => {
                icon.addEventListener('click', showHelp);
            });
        }, 1000);
    }
    
    // Show help tooltip
    function showHelp(e) {
        e.stopPropagation();
        const helpKey = e.target.dataset.help;
        const help = helpContent[helpKey];
        
        if (!help) return;
        
        // Remove any existing tooltip
        document.querySelector('.help-tooltip')?.remove();
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'help-tooltip';
        tooltip.innerHTML = `
            <div class="help-header">
                <h4>${help.title}</h4>
                <button onclick="this.closest('.help-tooltip').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="help-content">
                ${help.content}
            </div>
        `;
        
        // Position near the icon
        const rect = e.target.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.top = rect.bottom + 10 + 'px';
        tooltip.style.left = rect.left + 'px';
        
        document.body.appendChild(tooltip);
        
        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeTooltip() {
                tooltip.remove();
                document.removeEventListener('click', closeTooltip);
            });
        }, 100);
    }
    
    // Initialize on page changes
    if (window.dashboard) {
        const originalRender = window.dashboard.render;
        window.dashboard.render = function() {
            originalRender.call(this);
            addHelpIcons();
        };
    }
    
    // Initial load
    addHelpIcons();
})();
