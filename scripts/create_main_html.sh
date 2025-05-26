#!/bin/bash
# =============================================================================
# Create Main HTML Interface
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$PWD")")"

cat > "${PROJECT_DIR}/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Total Cost Analyzer - Enhanced Edition</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <header>
        <h1>Portnox Total Cost Analyzer</h1>
        <p>Comprehensive NAC Cost Analysis & Comparison Tool</p>
    </header>

    <main>
        <!-- Configuration Section -->
        <section class="config-section">
            <h2>Configuration</h2>
            <div class="config-grid">
                <div class="config-item">
                    <label for="device-count">Number of Devices</label>
                    <input type="number" id="device-count" value="300" min="1" max="10000">
                </div>
                <div class="config-item">
                    <label for="company-size">Company Size</label>
                    <select id="company-size">
                        <option value="small" selected>Small (1-500)</option>
                        <option value="medium">Medium (500-5000)</option>
                        <option value="large">Large (5000+)</option>
                    </select>
                </div>
                <div class="config-item">
                    <label for="analysis-period">Analysis Period</label>
                    <select id="analysis-period">
                        <option value="3" selected>3 Years</option>
                        <option value="5">5 Years</option>
                        <option value="7">7 Years</option>
                    </select>
                </div>
            </div>
            
            <div class="vendor-selection">
                <h3>Select Vendors to Compare</h3>
                <div class="vendor-grid">
                    <label><input type="checkbox" class="vendor-checkbox" value="portnoxCloud" checked> Portnox Cloud</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="ciscoISE"> Cisco ISE</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="arubaClearPass"> Aruba ClearPass</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="forescout"> Forescout</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="fortiNAC"> FortiNAC</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="microsoftNPS"> Microsoft NPS</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="packetFence"> PacketFence</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="freeRADIUS"> FreeRADIUS</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="aristaCloudVision"> Arista CloudVision</label>
                    <label><input type="checkbox" class="vendor-checkbox" value="extremeControl"> Extreme Control</label>
                </div>
            </div>
            
            <button id="calculate-btn" class="primary-btn">Perform Comprehensive Analysis</button>
        </section>

        <!-- Executive Overview -->
        <section class="dashboard-section">
            <h2>Executive Overview</h2>
            <div id="executive-dashboard"></div>
            <div class="chart-container">
                <canvas id="executive-overview-chart"></canvas>
            </div>
        </section>

        <!-- Financial Analysis -->
        <section class="dashboard-section">
            <h2>Financial Analysis</h2>
            <div class="chart-grid">
                <div class="chart-container">
                    <canvas id="multi-year-tco-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="capex-opex-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="roi-payback-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="per-device-cost-chart"></canvas>
                </div>
            </div>
        </section>

        <!-- Security & Compliance -->
        <section class="dashboard-section">
            <h2>Security & Compliance</h2>
            <div class="chart-grid">
                <div class="chart-container">
                    <div id="mitre-attack-matrix"></div>
                </div>
                <div class="chart-container">
                    <div id="compliance-heatmap"></div>
                </div>
                <div class="chart-container">
                    <canvas id="risk-reduction-chart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="insurance-impact-chart"></canvas>
                </div>
            </div>
        </section>

        <!-- Vendor Comparison Matrix -->
        <section class="dashboard-section">
            <h2>Vendor Feature Comparison</h2>
            <div id="vendor-comparison-matrix"></div>
        </section>

        <!-- Results Summary -->
        <section class="results-section" id="results-summary" style="display: none;">
            <h2>Analysis Results</h2>
            <div class="results-grid">
                <div class="result-card">
                    <h3>Recommended Solution</h3>
                    <div id="recommended-vendor"></div>
                </div>
                <div class="result-card">
                    <h3>Key Findings</h3>
                    <ul id="key-findings"></ul>
                </div>
                <div class="result-card">
                    <h3>Cost Breakdown</h3>
                    <div id="cost-breakdown-summary"></div>
                </div>
                <div class="result-card">
                    <h3>Implementation Timeline</h3>
                    <div id="implementation-timeline"></div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>© 2025 Portnox Total Cost Analyzer - Comprehensive NAC Analysis Tool</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
EOF

# Create CSS file
cat > "${PROJECT_DIR}/style.css" << 'EOF'
/* Portnox Total Cost Analyzer - Enhanced Styles */
:root {
    --primary-color: #0066cc;
    --secondary-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --dark-color: #343a40;
    --light-color: #f8f9fa;
    --border-radius: 8px;
    --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--dark-color);
    background-color: var(--light-color);
}

header {
    background: linear-gradient(135deg, var(--primary-color) 0%, #004499 100%);
    color: white;
    padding: 2rem;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

main {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 2rem;
}

/* Configuration Section */
.config-section {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 2rem;
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.config-item label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--dark-color);
}

.config-item input,
.config-item select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.vendor-grid label {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: var(--light-color);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.vendor-grid label:hover {
    background: #e9ecef;
}

.vendor-grid input[type="checkbox"] {
    margin-right: 0.5rem;
}

.primary-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 1.5rem;
}

.primary-btn:hover {
    background: #004499;
}

/* Dashboard Sections */
.dashboard-section {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 2rem;
}

.dashboard-section h2 {
    margin-bottom: 1.5rem;
    color: var(--dark-color);
}

/* KPI Cards */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.kpi-card {
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    text-align: center;
    border: 1px solid #e9ecef;
}

.kpi-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.kpi-label {
    font-size: 0.9rem;
    color: #6c757d;
    text-transform: uppercase;
}

.kpi-trend {
    font-size: 1rem;
    margin-top: 0.5rem;
}

.kpi-trend.positive {
    color: var(--secondary-color);
}

/* Chart Containers */
.chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.chart-container {
    background: white;
    padding: 1rem;
    border-radius: var(--border-radius);
    border: 1px solid #e9ecef;
    min-height: 300px;
}

/* Results Section */
.results-section {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.result-card {
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    border: 1px solid #e9ecef;
}

.result-card h3 {
    margin-bottom: 1rem;
    color: var(--dark-color);
}

/* Responsive Design */
@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .config-grid,
    .chart-grid,
    .results-grid {
        grid-template-columns: 1fr;
    }
    
    main {
        padding: 0 1rem;
    }
}

/* Loading State */
.loading {
    opacity: 0.5;
    pointer-events: none;
}

.loading::after {
    content: "Analyzing...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
}

/* Footer */
footer {
    background: var(--dark-color);
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}
EOF

echo "Main HTML interface created successfully"
