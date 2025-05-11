/**
 * Tab Content Loaders
 * Defines all the missing tab content loading functions
 */

// Load financial content
function loadFinancialContent(container) {
    console.log('Loading financial content...');
    container.innerHTML = `
        <div class="content-grid">
            <div class="chart-container">
                <h3>TCO Comparison</h3>
                <canvas id="tco-comparison-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Cost Breakdown</h3>
                <canvas id="cost-breakdown-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>ROI Analysis</h3>
                <canvas id="roi-analysis-chart"></canvas>
            </div>
            <div class="metrics-container">
                <h3>Financial Metrics</h3>
                <div id="financial-metrics"></div>
            </div>
        </div>
    `;
    
    // Initialize charts if Chart.js is available
    if (typeof Chart !== 'undefined') {
        setTimeout(() => createFinancialCharts(), 100);
    }
}

// Load technical content
function loadTechnicalContent(container) {
    console.log('Loading technical content...');
    container.innerHTML = `
        <div class="technical-analysis">
            <h3>Technical Assessment</h3>
            <p>Technical analysis will be populated here.</p>
        </div>
    `;
}

// Load security content
function loadSecurityContent(container) {
    console.log('Loading security content...');
    container.innerHTML = `
        <div class="security-analysis">
            <div class="risk-matrix-container">
                <h3>Risk Assessment Matrix</h3>
                <div id="risk-matrix"></div>
            </div>
            <div class="breach-impact-container">
                <h3>Breach Impact Analysis</h3>
                <div id="breach-impact"></div>
            </div>
        </div>
    `;
    
    // Initialize security visualizations if available
    if (typeof RiskAnalysis !== 'undefined') {
        RiskAnalysis.createRiskTable('#risk-matrix', 'cloud-nac');
        RiskAnalysis.createBreachImpactVisualization('#breach-impact', ['no-nac', 'cloud-nac']);
    }
}

// Load implementation content
function loadImplementationContent(container) {
    console.log('Loading implementation content...');
    container.innerHTML = `
        <div class="implementation-timeline">
            <h3>Implementation Timeline</h3>
            <p>Implementation analysis will be populated here.</p>
        </div>
    `;
}

// Load compliance content
function loadComplianceContent(container) {
    console.log('Loading compliance content...');
    container.innerHTML = `
        <div class="compliance-impact">
            <h3>Compliance Impact Analysis</h3>
            <p>Compliance analysis will be populated here.</p>
        </div>
    `;
}

// Load sensitivity content
function loadSensitivityContent(container) {
    console.log('Loading sensitivity content...');
    container.innerHTML = `
        <div class="sensitivity-analysis">
            <h3>Sensitivity Analysis</h3>
            <p>Sensitivity analysis will be populated here.</p>
        </div>
    `;
}

// Create financial charts
function createFinancialCharts() {
    const tcoCanvas = document.getElementById('tco-comparison-chart');
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
}

// Make functions globally available
window.loadFinancialContent = loadFinancialContent;
window.loadTechnicalContent = loadTechnicalContent;
window.loadSecurityContent = loadSecurityContent;
window.loadImplementationContent = loadImplementationContent;
window.loadComplianceContent = loadComplianceContent;
window.loadSensitivityContent = loadSensitivityContent;
