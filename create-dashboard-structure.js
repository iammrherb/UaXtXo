/**
 * Create proper dashboard structure
 * This ensures all required elements exist
 */

function createDashboardStructure() {
    console.log('Creating dashboard structure...');
    
    // Find or create main dashboard container
    let dashboard = document.getElementById('dashboard-content');
    if (!dashboard) {
        dashboard = document.createElement('div');
        dashboard.id = 'dashboard-content';
        document.body.appendChild(dashboard);
    }
    
    // Create KPI section if it doesn't exist
    if (!document.getElementById('kpi-grid')) {
        const kpiSection = document.createElement('div');
        kpiSection.innerHTML = `
            <section class="executive-summary">
                <h2>Executive Summary</h2>
                <div id="kpi-grid" class="kpi-grid"></div>
            </section>
        `;
        dashboard.appendChild(kpiSection);
    }
    
    // Create tab navigation if it doesn't exist
    if (!document.querySelector('.analysis-nav')) {
        const tabNav = document.createElement('nav');
        tabNav.className = 'analysis-nav';
        tabNav.innerHTML = `
            <button class="nav-tab active" data-tab="financial">
                <i class="fas fa-coins"></i> Financial Analysis
            </button>
            <button class="nav-tab" data-tab="technical">
                <i class="fas fa-server"></i> Technical Assessment
            </button>
            <button class="nav-tab" data-tab="security">
                <i class="fas fa-shield-alt"></i> Security & Risk
            </button>
            <button class="nav-tab" data-tab="implementation">
                <i class="fas fa-project-diagram"></i> Implementation
            </button>
            <button class="nav-tab" data-tab="vendor">
                <i class="fas fa-balance-scale"></i> Vendor Comparison
            </button>
            <button class="nav-tab" data-tab="compliance">
                <i class="fas fa-clipboard-check"></i> Compliance Impact
            </button>
            <button class="nav-tab" data-tab="sensitivity">
                <i class="fas fa-sliders-h"></i> Sensitivity Analysis
            </button>
        `;
        dashboard.appendChild(tabNav);
    }
    
    // Create tab content containers
    if (!document.querySelector('.analysis-content')) {
        const contentContainer = document.createElement('div');
        contentContainer.className = 'analysis-content';
        
        const tabs = ['financial', 'technical', 'security', 'implementation', 'vendor', 'compliance', 'sensitivity'];
        
        tabs.forEach((tab, index) => {
            const tabContent = document.createElement('div');
            tabContent.id = `${tab}-content`;
            tabContent.className = `tab-content ${index === 0 ? 'active' : ''}`;
            tabContent.innerHTML = `
                <div class="content-loading">
                    <h3>${tab.charAt(0).toUpperCase() + tab.slice(1)} Analysis</h3>
                    <p>Loading ${tab} content...</p>
                    <div id="${tab}-chart-container"></div>
                </div>
            `;
            contentContainer.appendChild(tabContent);
        });
        
        dashboard.appendChild(contentContainer);
    }
    
    console.log('Dashboard structure created');
}

// Run on page load
document.addEventListener('DOMContentLoaded', createDashboardStructure);
