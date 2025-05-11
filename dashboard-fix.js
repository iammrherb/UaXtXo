/**
 * Dashboard Tab Switching Fix
 * Fixes the null element errors in switchTab
 */

// Override the problematic switchTab function
window.switchTab = function(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.nav-tab');
    allTabs.forEach(tab => {
        if (tab.classList) {
            tab.classList.remove('active');
        }
    });
    
    // Remove active class from all content
    const allContent = document.querySelectorAll('.tab-content');
    allContent.forEach(content => {
        if (content.classList) {
            content.classList.remove('active');
        }
    });
    
    // Find and activate the selected tab
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (selectedTab && selectedTab.classList) {
        selectedTab.classList.add('active');
    }
    
    // Find and show the selected content
    const selectedContent = document.getElementById(`${tabId}-content`);
    if (selectedContent && selectedContent.classList) {
        selectedContent.classList.add('active');
        
        // Load content for this tab
        loadTabContent(tabId);
    } else {
        console.warn(`Content not found for tab: ${tabId}`);
    }
};

// Function to load tab content
window.loadTabContent = function(tabId) {
    const contentDiv = document.getElementById(`${tabId}-content`);
    if (!contentDiv) return;
    
    // Check if content already loaded
    if (contentDiv.dataset.loaded === 'true') return;
    
    console.log(`Loading content for ${tabId} tab`);
    
    switch(tabId) {
        case 'financial':
            loadFinancialContent(contentDiv);
            break;
        case 'technical':
            loadTechnicalContent(contentDiv);
            break;
        case 'security':
            loadSecurityContent(contentDiv);
            break;
        case 'implementation':
            loadImplementationContent(contentDiv);
            break;
        case 'vendor':
            loadVendorContent(contentDiv);
            break;
        case 'compliance':
            loadComplianceContent(contentDiv);
            break;
        case 'sensitivity':
            loadSensitivityContent(contentDiv);
            break;
    }
    
    contentDiv.dataset.loaded = 'true';
};

// Financial content loader
window.loadFinancialContent = function(container) {
    container.innerHTML = `
        <div class="financial-analysis">
            <h3>Financial Analysis</h3>
            <div class="chart-grid">
                <div class="chart-container">
                    <h4>3-Year TCO Comparison</h4>
                    <canvas id="tco-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h4>Cost Breakdown</h4>
                    <canvas id="cost-breakdown-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h4>ROI Timeline</h4>
                    <canvas id="roi-chart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    // Initialize charts
    setTimeout(() => {
        createFinancialCharts();
    }, 100);
};

// Create financial charts
window.createFinancialCharts = function() {
    // TCO Chart
    const tcoCanvas = document.getElementById('tco-chart');
    if (tcoCanvas && typeof Chart !== 'undefined') {
        new Chart(tcoCanvas, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Total'],
                datasets: [{
                    label: 'Current Solution',
                    data: [100000, 120000, 140000, 360000],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }, {
                    label: 'Portnox Cloud',
                    data: [40000, 45000, 50000, 135000],
                    backgroundColor: 'rgba(75, 192, 192, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    }
    
    // Cost Breakdown Chart
    const breakdownCanvas = document.getElementById('cost-breakdown-chart');
    if (breakdownCanvas && typeof Chart !== 'undefined') {
        new Chart(breakdownCanvas, {
            type: 'pie',
            data: {
                labels: ['Licenses', 'Hardware', 'Implementation', 'Maintenance', 'Support'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
};

// Other tab content loaders
window.loadTechnicalContent = function(container) {
    container.innerHTML = `
        <div class="technical-analysis">
            <h3>Technical Assessment</h3>
            <p>Technical analysis content will be displayed here.</p>
        </div>
    `;
};

window.loadSecurityContent = function(container) {
    container.innerHTML = `
        <div class="security-analysis">
            <h3>Security & Risk Analysis</h3>
            <p>Security analysis content will be displayed here.</p>
        </div>
    `;
};

window.loadImplementationContent = function(container) {
    container.innerHTML = `
        <div class="implementation-analysis">
            <h3>Implementation Timeline</h3>
            <p>Implementation analysis content will be displayed here.</p>
        </div>
    `;
};

window.loadVendorContent = function(container) {
    container.innerHTML = `
        <div class="vendor-comparison">
            <h3>Vendor Comparison</h3>
            <p>Vendor comparison content will be displayed here.</p>
        </div>
    `;
};

window.loadComplianceContent = function(container) {
    container.innerHTML = `
        <div class="compliance-analysis">
            <h3>Compliance Impact</h3>
            <p>Compliance analysis content will be displayed here.</p>
        </div>
    `;
};

window.loadSensitivityContent = function(container) {
    container.innerHTML = `
        <div class="sensitivity-analysis">
            <h3>Sensitivity Analysis</h3>
            <p>Sensitivity analysis content will be displayed here.</p>
        </div>
    `;
};

// Initialize tab event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up tab click handlers
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
    
    // Load first tab by default
    switchTab('financial');
});
