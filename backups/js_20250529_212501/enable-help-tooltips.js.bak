// Enable Help Tooltips
console.log("❓ Enabling help tooltips...");

// Ensure help tooltip system is active
document.addEventListener('DOMContentLoaded', function() {
    if (!window.helpTooltipSystem) {
        console.log("Creating help tooltip system...");
        
        // Reinitialize help tooltips
        setTimeout(() => {
            const charts = document.querySelectorAll('.chart-container');
            charts.forEach(container => {
                const header = container.querySelector('.chart-header');
                if (header && !header.querySelector('.help-icon')) {
                    const helpBtn = document.createElement('button');
                    helpBtn.className = 'help-icon';
                    helpBtn.innerHTML = '<i class="fas fa-question-circle"></i>';
                    helpBtn.title = 'Click for help';
                    helpBtn.style.cssText = `
                        background: none;
                        border: none;
                        color: #6b7280;
                        cursor: pointer;
                        padding: 0.25rem;
                        margin-left: auto;
                        font-size: 1.125rem;
                    `;
                    header.appendChild(helpBtn);
                    
                    helpBtn.addEventListener('click', function() {
                        alert('Help information for this chart:\n\nThis chart shows important metrics for your TCO analysis. Hover over data points for more details.');
                    });
                }
            });
        }, 1000);
    }
});
