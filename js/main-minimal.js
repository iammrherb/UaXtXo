/**
 * NAC Total Cost Analyzer - Minimal Working Version
 * Focus on functionality, not images
 */

// Simple image fix that prevents loops
function simpleImageFix() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.onerror = null; // Prevent loops
            this.style.display = 'none'; // Hide broken images
        };
    });
}

// Initialize application
function initApp() {
    console.log('🚀 Starting NAC Total Cost Analyzer (Minimal)...');
    
    // Fix images without loops
    simpleImageFix();
    
    // Initialize KPIs
    initializeKPICards();
    
    // Initialize navigation
    initializeNavigationTabs();
    
    // Initialize wizard if available
    if (typeof TCOWizard !== 'undefined') {
        TCOWizard.init();
    } else if (typeof WizardController !== 'undefined') {
        WizardController.init();
    }
    
    console.log('✅ Application initialized');
}

// Initialize KPI cards
function initializeKPICards() {
    const kpiGrid = document.getElementById('kpi-grid');
    if (!kpiGrid) return;
    
    const kpis = [
        { icon: 'fa-chart-line', title: 'TCO Reduction', value: 'Calculate', color: '#2196F3' },
        { icon: 'fa-percent', title: 'ROI', value: 'Calculate', color: '#4CAF50' },
        { icon: 'fa-shield-alt', title: 'Risk Reduction', value: 'Calculate', color: '#FF9800' },
        { icon: 'fa-clock', title: 'Deployment Time', value: 'Calculate', color: '#9C27B0' }
    ];
    
    kpiGrid.innerHTML = kpis.map(kpi => `
        <div class="kpi-card">
            <div class="kpi-icon" style="background-color: ${kpi.color}20; color: ${kpi.color}">
                <i class="fas ${kpi.icon}"></i>
            </div>
            <div class="kpi-content">
                <div class="kpi-title">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
            </div>
        </div>
    `).join('');
}

// Initialize navigation tabs
function initializeNavigationTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show content
            contents.forEach(content => {
                content.style.display = content.id === `${tabName}-content` ? 'block' : 'none';
            });
        });
    });
    
    // Activate first tab
    if (tabs.length > 0) tabs[0].click();
}

// Start app
document.addEventListener('DOMContentLoaded', initApp);
