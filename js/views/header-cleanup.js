/**
 * Header and Banner Cleanup
 * Streamlined design with Portnox branding
 */

class HeaderCleanup {
    static updateHeader() {
        const header = document.querySelector('.platform-header');
        if (!header) return;
        
        header.innerHTML = `
            <div class="header-container">
                <div class="header-left">
                    <img src="./img/vendors/portnox-logo.svg" alt="Portnox" class="header-logo">
                    <div class="header-title">
                        <h1>Executive Decision Platform</h1>
                        <p class="header-subtitle">Zero Trust NAC Investment Analysis</p>
                    </div>
                </div>
                
                <nav class="header-nav">
                    <button class="nav-item active" data-view="overview">
                        <i class="fas fa-chart-line"></i>
                        <span>Overview</span>
                    </button>
                    <button class="nav-item" data-view="compliance">
                        <i class="fas fa-shield-check"></i>
                        <span>Compliance</span>
                    </button>
                    <button class="nav-item" data-view="comparison">
                        <i class="fas fa-balance-scale"></i>
                        <span>Compare</span>
                    </button>
                    <button class="nav-item" data-view="financial">
                        <i class="fas fa-dollar-sign"></i>
                        <span>ROI Analysis</span>
                    </button>
                </nav>
                
                <div class="header-actions">
                    <button class="btn-icon" onclick="NAC.toggleTheme()">
                        <i class="fas fa-moon"></i>
                    </button>
                    <button class="btn-primary">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                </div>
            </div>
        `;
        
        // Apply Portnox branding styles
        header.style.background = 'linear-gradient(to right, #003380, #0046ad)';
        header.style.borderBottom = '2px solid #00e5e6';
    }
}

// Auto-execute on load
document.addEventListener('DOMContentLoaded', () => {
    HeaderCleanup.updateHeader();
});
