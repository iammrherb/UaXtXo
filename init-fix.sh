#!/bin/bash

echo "Starting Portnox Total Cost Analyzer Error Fix"
echo "=============================================="

# Fix duplicate declarations and script loading order
echo "Fixing JavaScript loading issues..."

# Fix duplicate class declarations by updating index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zero Trust Total Cost Analyzer - Enterprise Total Cost of Ownership Calculator">
    <title>Total Cost Analyzer | Portnox</title>
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/enhanced-ui.css">
    
    <link rel="icon" type="image/png" href="img/favicon.svg">
</head>
<body>
    <!-- Particle Background -->
    <div id="particles-js"></div>
    
    <!-- Main Application Container -->
    <div class="app-container">
        <!-- Enhanced Header -->
        <header class="app-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="img/portnox-logo.svg" alt="Portnox Logo" class="company-logo">
                    <div class="app-title">
                        <h1>Zero Trust Total Cost Analyzer</h1>
                        <p class="subtitle">Zero Trust NAC Solution Comparison Platform</p>
                    </div>
                </div>
                <div class="header-actions">
                    <button id="export-pdf" class="btn btn-outline btn-icon" title="Export Report">
                        <i class="fas fa-file-pdf"></i>
                        <span>Export</span>
                    </button>
                    <button id="help-btn" class="btn btn-outline btn-icon" title="Help">
                        <i class="fas fa-question-circle"></i>
                        <span>Help</span>
                    </button>
                    <button id="dark-mode-toggle" class="btn btn-outline btn-icon" title="Toggle Dark Mode">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        </header>
        
        <!-- Main Content Area with Sidebar -->
        <div class="main-content">
            <!-- Configuration Sidebar -->
            <div class="sidebar">
                <div class="sidebar-header">
                    <h2>Configuration</h2>
                </div>
                
                <div class="sidebar-content">
                    <!-- Vendor Selection -->
                    <div id="vendor-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-server"></i> Select NAC Vendors</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <p class="helper-text">Choose multiple vendors to compare with Portnox Cloud</p>
                            <div class="vendor-grid">
                                <div class="vendor-card selected" data-vendor="portnox">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/portnox-logo.png" alt="Portnox">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Portnox Cloud</h3>
                                        <p>Cloud-native NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="cisco">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Cisco ISE</h3>
                                        <p>Enterprise NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="aruba">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Aruba ClearPass</h3>
                                        <p>Policy manager</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="forescout">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/forescout-logo.png" alt="Forescout">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Forescout</h3>
                                        <p>Device visibility</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="fortinac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>FortiNAC</h3>
                                        <p>Fortinet NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="juniper">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Juniper Mist</h3>
                                        <p>AI-driven NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="securew2">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/securew2-logo.png" alt="SecureW2">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>SecureW2</h3>
                                        <p>Cloud RADIUS</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="nps">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Microsoft NPS</h3>
                                        <p>Windows Server NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="noNac">
                                    <div class="vendor-logo">
                                        <i class="fas fa-shield-virus fa-3x"></i>
                                    </div>
                                    <div class="vendor-info">
                                        <h3>No NAC</h3>
                                        <p>Baseline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Industry & Compliance -->
                    <div id="industry-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-building"></i> Industry & Compliance</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="form-group">
                                <label for="industry-select" class="form-label">Industry</label>
                                <select id="industry-select" class="form-select">
                                    <option value="">Choose an industry...</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="financial">Financial Services</option>
                                    <option value="education">Education</option>
                                    <option value="government">Government</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="retail">Retail</option>
                                    <option value="technology">Technology</option>
                                    <option value="energy">Energy & Utilities</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Compliance Requirements</label>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-pci" class="form-check-input">
                                    <label for="compliance-pci">PCI DSS</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-hipaa" class="form-check-input">
                                    <label for="compliance-hipaa">HIPAA</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-nist" class="form-check-input">
                                    <label for="compliance-nist">NIST 800-53</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-gdpr" class="form-check-input">
                                    <label for="compliance-gdpr">GDPR</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="compliance-iso" class="form-check-input">
                                    <label for="compliance-iso">ISO 27001</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Organization Details -->
                    <div id="organization-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-users"></i> Organization</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="form-group">
                                <label for="organization-size" class="form-label">Organization Size</label>
                                <select id="organization-size" class="form-select">
                                    <option value="small">Small (< 1,000 devices)</option>
                                    <option value="medium" selected>Medium (1,000-5,000 devices)</option>
                                    <option value="large">Large (5,000+ devices)</option>
                                    <option value="enterprise">Enterprise (10,000+ devices)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="device-count" class="form-label">Number of Devices</label>
                                <input type="number" id="device-count" class="form-control" value="2500" min="300" max="100000">
                                <div class="helper-text">Include all managed devices (PCs, mobile, IoT)</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="locations" class="form-label">Number of Locations</label>
                                <input type="number" id="locations" class="form-control" value="5" min="1" max="1000">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Network Requirements</label>
                                <div class="form-check">
                                    <input type="checkbox" id="cloud-integration" class="form-check-input">
                                    <label for="cloud-integration">Cloud Integration Required</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="legacy-devices" class="form-check-input">
                                    <label for="legacy-devices">Legacy Device Support</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="byod-support" class="form-check-input">
                                    <label for="byod-support">BYOD Support</label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="years-to-project" class="form-label">Analysis Period</label>
                                <select id="years-to-project" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Configuration -->
                    <div id="cost-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="config-card-content collapsed">
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Average FTE Cost ($/year)</span>
                                    <span class="range-slider-value" id="fte-cost-value">$120,000</span>
                                </div>
                                <input type="range" id="fte-cost" min="60000" max="200000" value="120000" step="5000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">FTE Allocation for NAC (%)</span>
                                    <span class="range-slider-value" id="fte-allocation-value">50%</span>
                                </div>
                                <input type="range" id="fte-allocation" min="10" max="100" value="50" step="5">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Annual Maintenance (%)</span>
                                    <span class="range-slider-value" id="maintenance-value">18%</span>
                                </div>
                                <input type="range" id="maintenance-percentage" min="10" max="30" value="18" step="1">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Downtime Cost ($/hour)</span>
                                    <span class="range-slider-value" id="downtime-cost-value">$10,000</span>
                                </div>
                                <input type="range" id="downtime-cost" min="1000" max="50000" value="10000" step="1000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Implementation Days (On-Prem)</span>
                                    <span class="range-slider-value" id="implementation-days-value">60 days</span>
                                </div>
                                <input type="range" id="implementation-days" min="10" max="200" value="60" step="5">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Portnox Monthly Cost per Device ($)</span>
                                    <span class="range-slider-value" id="portnox-cost-value">$4.00</span>
                                </div>
                                <input type="range" id="portnox-base-price" min="1" max="10" step="0.5" value="4">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Volume Discount (%)</span>
                                    <span class="range-slider-value" id="portnox-discount-value">20%</span>
                                </div>
                                <input type="range" id="portnox-discount" min="0" max="50" value="20" step="5">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <button id="calculate-btn" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate
                    </button>
                </div>
            </div>
            
            <!-- Sidebar Toggle Button -->
            <div class="sidebar-toggle">
                <i class="fas fa-chevron-left"></i>
            </div>
            
            <!-- Main Content Area -->
            <div class="content-area">
                <div class="content-wrapper">
                    <!-- Stakeholder View Tabs -->
                    <div class="view-tabs">
                        <div class="view-tab active" data-view="executive">Executive & Financial</div>
                        <div class="view-tab" data-view="technical">Technical & Security</div>
                    </div>
                    
                    <!-- Executive & Financial View -->
                    <div class="view-panel active" data-view="executive">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <div class="results-tab active" data-panel="executive-overview">Overview</div>
                            <div class="results-tab" data-panel="executive-tco">TCO Analysis</div>
                            <div class="results-tab" data-panel="executive-roi">ROI Analysis</div>
                            <div class="results-tab" data-panel="executive-risk">Risk Assessment</div>
                        </div>
                        
                        <!-- Executive Overview Panel -->
                        <div id="executive-overview" class="results-panel active">
                            <h2>Executive Summary</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Total Cost Savings</h3>
                                    <div class="metric-value highlight-value" id="total-savings">$476,000</div>
                                    <div class="metric-label" id="savings-percentage">53% reduction vs. Cisco ISE</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Break-even Point</h3>
                                    <div class="metric-value" id="breakeven-point">10 months</div>
                                    <div class="metric-label">Time to positive ROI</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Total 3-Year TCO</h3>
                                    <div class="metric-value" id="portnox-tco">$429,000</div>
                                    <div class="metric-label" id="tco-comparison">vs. $905,000 (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Time</h3>
                                    <div class="metric-value" id="implementation-time">45 days</div>
                                    <div class="metric-label" id="implementation-comparison">75% faster than Cisco ISE</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>3-Year TCO Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Key Benefits</h3>
                                <div id="key-benefits">
                                    <ul class="benefits-list">
                                        <li><strong>Lower Total Cost:</strong> Portnox Cloud eliminates hardware costs and reduces implementation expenses.</li>
                                        <li><strong>Reduced Operational Overhead:</strong> Cloud-native architecture requires 70% less FTE allocation.</li>
                                        <li><strong>Faster Time-to-Value:</strong> Deploy Portnox 4x faster than on-premises alternatives.</li>
                                        <li><strong>Superior Compliance Coverage:</strong> Meet 95% of compliance requirements with built-in controls.</li>
                                        <li><strong>Zero Trust Ready:</strong> Designed for modern Zero Trust security architecture.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <!-- TCO Analysis Panel -->
                        <div id="executive-tco" class="results-panel">
                            <h2>Total Cost of Ownership Analysis</h2>
                            
                            <div class="chart-container">
                                <h3>Detailed 3-Year TCO Breakdown</h3>
                                <div class="chart-wrapper">
                                    <canvas id="detailed-tco-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cumulative Cost Over Time</h3>
                                <div class="chart-wrapper">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cost Component Comparison</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="cost-component-table">
                                        <thead>
                                            <tr>
                                                <th>Cost Component</th>
                                                <th>Portnox Cloud</th>
                                                <th>Cisco ISE</th>
                                                <th>Difference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hardware</td>
                                                <td>$0</td>
                                                <td>$175,000</td>
                                                <td class="highlight-value">-$175,000</td>
                                            </tr>
                                            <tr>
                                                <td>Software/Subscription</td>
                                                <td>$300,000</td>
                                                <td>$250,000</td>
                                                <td class="negative-value">+$50,000</td>
                                            </tr>
                                            <tr>
                                                <td>Implementation</td>
                                                <td>$30,000</td>
                                                <td>$120,000</td>
                                                <td class="highlight-value">-$90,000</td>
                                            </tr>
                                            <tr>
                                                <td>Maintenance & Support</td>
                                                <td>$45,000</td>
                                                <td>$180,000</td>
                                                <td class="highlight-value">-$135,000</td>
                                            </tr>
                                            <tr>
                                                <td>Personnel (FTE)</td>
                                                <td>$54,000</td>
                                                <td>$180,000</td>
                                                <td class="highlight-value">-$126,000</td>
                                            </tr>
                                            <tr class="total-row">
                                                <td>Total 3-Year TCO</td>
                                                <td>$429,000</td>
                                                <td>$905,000</td>
                                                <td class="highlight-value">-$476,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- ROI Analysis Panel -->
                        <div id="executive-roi" class="results-panel">
                            <h2>Return on Investment Analysis</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>3-Year ROI</h3>
                                    <div class="metric-value highlight-value" id="three-year-roi">125%</div>
                                    <div class="metric-label">Return on investment</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Cost Savings</h3>
                                    <div class="metric-value" id="annual-savings">$158,667</div>
                                    <div class="metric-label">Per year vs. Cisco ISE</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Productivity Gains</h3>
                                    <div class="metric-value" id="productivity-value">$300,000</div>
                                    <div class="metric-label">Estimated 3-year value</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Payback Period</h3>
                                    <div class="metric-value" id="payback-period">10 months</div>
                                    <div class="metric-label">Time to recoup investment</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>ROI Over Time</h3>
                                <div class="chart-wrapper">
                                    <canvas id="roi-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Value Drivers</h3>
                                <div class="chart-wrapper">
                                    <canvas id="value-drivers-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Risk Assessment Panel -->
                        <div id="executive-risk" class="results-panel">
                            <h2>Risk Assessment</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Risk Reduction</h3>
                                    <div class="metric-value highlight-value" id="risk-reduction">57%</div>
                                    <div class="metric-label">Overall risk reduction</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Breach Risk</h3>
                                    <div class="metric-value" id="breach-risk">Low</div>
                                    <div class="metric-label">vs. Medium (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Compliance Risk</h3>
                                    <div class="metric-value" id="compliance-risk">Low</div>
                                    <div class="metric-label">vs. Medium (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Risk</h3>
                                    <div class="metric-value" id="implementation-risk">Low</div>
                                    <div class="metric-label">vs. High (Cisco ISE)</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Risk Assessment Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="risk-analysis-chart"></canvas>
                                </div>
                                <p class="helper-text text-center">Lower scores indicate better risk mitigation</p>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Breach Impact Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="breach-impact-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Technical & Security View -->
                    <div class="view-panel" data-view="technical">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <div class="results-tab active" data-panel="technical-overview">Overview</div>
                            <div class="results-tab" data-panel="technical-features">Feature Comparison</div>
                            <div class="results-tab" data-panel="technical-implementation">Implementation</div>
                            <div class="results-tab" data-panel="technical-compliance">Compliance</div>
                            <div class="results-tab" data-panel="technical-sensitivity">Sensitivity</div>
                        </div>
                        
                        <!-- Technical Overview Panel -->
                        <div id="technical-overview" class="results-panel active">
                            <h2>Technical Overview</h2>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Cloud Architecture</h3>
                                    <div class="metric-value highlight-value">100%</div>
                                    <div class="metric-label">Cloud-native platform</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Zero Trust Support</h3>
                                    <div class="metric-value highlight-value">Full</div>
                                    <div class="metric-label">vs. Partial (competitors)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>API Integration</h3>
                                    <div class="metric-value">300+</div>
                                    <div class="metric-label">Pre-built integrations</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Technical Debt</h3>
                                    <div class="metric-value highlight-value">Minimal</div>
                                    <div class="metric-label">Modern architecture</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Architecture Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="architecture-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Technical Advantages</h3>
                                <div id="technical-advantages">
                                    <ul class="benefits-list">
                                        <li><strong>Cloud-Native Platform:</strong> No hardware to deploy or maintain, automatic updates.</li>
                                        <li><strong>Agentless Architecture:</strong> Simplifies deployment and reduces endpoint management.</li>
                                        <li><strong>Comprehensive API:</strong> Seamless integration with existing security tools and IT systems.</li>
                                        <li><strong>Centralized Management:</strong> Single console for all locations and remote users.</li>
                                        <li><strong>Continuous Posture Assessment:</strong> Real-time security evaluation for all endpoints.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Feature Comparison Panel -->
                        <div id="technical-features" class="results-panel">
                            <h2>Feature Comparison</h2>
                            
                            <div class="chart-container">
                                <h3>Feature Capability Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="feature-radar-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Detailed Feature Matrix</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="feature-matrix-table">
                                        <thead>
                                            <tr>
                                                <th>Feature</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cloud-Based Architecture</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                            </tr>
                                            <tr>
                                                <td>Zero Trust Security</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                                <td><span class="badge badge-warning">⚠ Partial</span></td>
                                            </tr>
                                            <tr>
                                                <td>Multi-Factor Authentication</td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                            </tr>
                                            <tr>
                                                <td>Scalability</td>
                                                <td><span class="badge badge-success">✓ Simple</span></td>
                                                <td><span class="badge badge-warning">⚠ Complex</span></td>
                                                <td><span class="badge badge-warning">⚠ Complex</span></td>
                                            </tr>
                                            <tr>
                                                <td>BYOD Support</td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                                <td><span class="badge badge-success">✓ Yes</span></td>
                                            </tr>
                                            <tr>
                                                <td>Guest Management</td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                                <td><span class="badge badge-success">✓ Advanced</span></td>
                                            </tr>
                                            <tr>
                                                <td>Remote Access</td>
                                                <td><span class="badge badge-success">✓ Full</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                                <td><span class="badge badge-warning">⚠ Limited</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Implementation Panel -->
                        <div id="technical-implementation" class="results-panel">
                            <h2>Implementation Analysis</h2>
                            
                            <div class="chart-container">
                                <h3>Implementation Timeline Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="implementation-timeline-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Implementation Complexity</h3>
                                <div class="responsive-table">
                                    <table class="data-table" id="implementation-complexity-table">
                                        <thead>
                                            <tr>
                                                <th>Implementation Factor</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hardware Installation</td>
                                                <td>None Required</td>
                                                <td>Required</td>
                                                <td>Required</td>
                                            </tr>
                                            <tr>
                                                <td>Integration Complexity</td>
                                                <td>⭐ Low</td>
                                                <td>⭐⭐⭐ High</td>
                                                <td>⭐⭐⭐ High</td>
                                            </tr>
                                            <tr>
                                                <td>Time to First Policy</td>
                                                <td>1 day</td>
                                                <td>14 days</td>
                                                <td>10 days</td>
                                            </tr>
                                            <tr>
                                                <td>Required Expertise</td>
                                                <td>Low</td>
                                                <td>High (Certification)</td>
                                                <td>High (Certification)</td>
                                            </tr>
                                            <tr>
                                                <td>Training Duration</td>
                                                <td>5 days</td>
                                                <td>20 days</td>
                                                <td>15 days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Implementation Phases & Timeline</h3>
                                <div id="implementation-timeline">
                                    <!-- Timeline content -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Compliance Panel -->
                        <div id="technical-compliance" class="results-panel">
                            <h2>Compliance Framework Coverage</h2>
                            
                            <div class="chart-container">
                                <h3>Compliance Framework Coverage</h3>
                                <div class="chart-wrapper">
                                    <canvas id="compliance-radar-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Industry-Specific Compliance</h3>
                                <div class="chart-wrapper">
                                    <canvas id="industry-compliance-chart"></canvas>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Sensitivity Analysis Panel -->
                        <div id="technical-sensitivity" class="results-panel">
                            <h2>Sensitivity Analysis</h2>
                            
                            <div class="sensitivity-controls">
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-variable" class="form-label">Variable to Analyze</label>
                                        <select id="sensitivity-variable" class="form-select">
                                            <option value="deviceCount">Device Count</option>
                                            <option value="cost">Cost per Device</option>
                                            <option value="fte">FTE Requirements</option>
                                            <option value="implementation">Implementation Time</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-min" class="form-label">Min Value</label>
                                        <input type="number" id="sensitivity-min" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="sensitivity-max" class="form-label">Max Value</label>
                                        <input type="number" id="sensitivity-max" class="form-control">
                                    </div>
                                </div>
                                <button id="run-sensitivity" class="btn btn-primary">
                                    Run Sensitivity Analysis
                                </button>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Sensitivity Analysis Results</h3>
                                <div class="chart-wrapper">
                                    <canvas id="sensitivity-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="app-footer">
            <div class="footer-content">
                <div class="footer-copyright">
                    &copy; 2025 Portnox. All rights reserved.
                </div>
                <div class="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#contact">Contact Us</a>
                    <a href="#support">Support</a>
                </div>
                <div class="footer-social">
                    <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Modals -->
    <div id="help-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Help & Documentation</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <h3>Getting Started</h3>
                <p>Welcome to the Portnox Total Cost Analyzer. This tool helps you compare the total cost of ownership (TCO) for different NAC solutions.</p>
                
                <h4>1. Configure Your Analysis</h4>
                <ul>
                    <li><strong>Select vendors</strong> to compare with Portnox Cloud</li>
                    <li><strong>Choose your industry</strong> and compliance requirements</li>
                    <li><strong>Enter your organization details</strong> such as size and device count</li>
                    <li><strong>Adjust cost parameters</strong> if needed</li>
                </ul>
                
                <h4>2. View Analysis Results</h4>
                <ul>
                    <li><strong>Executive & Financial View:</strong> TCO comparison, ROI analysis, and risk assessment</li>
                    <li><strong>Technical & Security View:</strong> Feature comparison, implementation details, and compliance analysis</li>
                </ul>
                
                <h4>3. Export Your Results</h4>
                <p>Use the Export button to generate a PDF report of your analysis.</p>
            </div>
        </div>
    </div>
    
    <!-- Error Container -->
    <div id="error-container"></div>
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Calculating...</p>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chart.js/3.8.0/chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.6.1/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <!-- Core JavaScript - Single file approach -->
    <script>
    /**
     * Portnox Total Cost Analyzer
     * Combined JavaScript file to fix loading issues
     */
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Vendor data module
        const VendorData = {
            // Vendor display names
            vendorNames: {
                'portnox': 'Portnox Cloud',
                'cisco': 'Cisco ISE',
                'aruba': 'Aruba ClearPass',
                'forescout': 'Forescout',
                'fortinac': 'FortiNAC',
                'juniper': 'Juniper Mist',
                'securew2': 'SecureW2',
                'nps': 'Microsoft NPS',
                'arista': 'Arista Agni',
                'foxpass': 'Foxpass',
                'noNac': 'No NAC Solution'
            },
            
            // Vendor colors for charts
            vendorColors: {
                'portnox': '#36B37E',
                'cisco': '#0D5BD9',
                'aruba': '#A44CFE',
                'forescout': '#FF8C3B',
                'fortinac': '#0088FE',
                'juniper': '#7E57C2',
                'securew2': '#00ACC1',
                'nps': '#00A8E8',
                'arista': '#8D99AE',
                'foxpass': '#EC7063',
                'noNac': '#FF5252'
            },
            
            // TCO data for 3 years (Year 1, Year 2, Year 3) in USD
            tcoData: {
                'portnox': [180000, 150000, 145000],
                'cisco': [350000, 250000, 260000],
                'aruba': [320000, 240000, 250000],
                'forescout': [310000, 230000, 240000],
                'fortinac': [290000, 220000, 230000],
                'juniper': [300000, 230000, 235000],
                'securew2': [200000, 180000, 170000],
                'nps': [150000, 170000, 190000],
                'noNac': [50000, 60000, 70000]
            },
            
            // Detailed cost components for TCO calculator
            costComponents: {
                'portnox': {
                    hardware: 0,
                    software: 300000,
                    implementation: 30000,
                    maintenance: 45000,
                    personnel: 54000
                },
                'cisco': {
                    hardware: 175000,
                    software: 250000,
                    implementation: 120000,
                    maintenance: 180000,
                    personnel: 180000
                },
                'aruba': {
                    hardware: 160000,
                    software: 240000,
                    implementation: 110000,
                    maintenance: 170000,
                    personnel: 162000
                },
                'forescout': {
                    hardware: 150000,
                    software: 235000,
                    implementation: 105000,
                    maintenance: 160000,
                    personnel: 144000
                },
                'fortinac': {
                    hardware: 130000,
                    software: 200000,
                    implementation: 100000,
                    maintenance: 150000,
                    personnel: 144000
                },
                'juniper': {
                    hardware: 140000,
                    software: 220000,
                    implementation: 105000,
                    maintenance: 155000,
                    personnel: 144000
                },
                'securew2': {
                    hardware: 0,
                    software: 250000,
                    implementation: 45000,
                    maintenance: 60000,
                    personnel: 72000
                },
                'nps': {
                    hardware: 50000,
                    software: 0,
                    implementation: 90000,
                    maintenance: 45000,
                    personnel: 216000
                },
                'noNac': {
                    hardware: 0,
                    software: 0,
                    implementation: 0,
                    maintenance: 0,
                    personnel: 180000
                }
            },
            
            // Calculate TCO based on organization parameters
            calculateTCO: function(vendor, params = {}) {
                const deviceCount = params.deviceCount || 2500;
                const yearsToProject = params.yearsToProject || 3;
                const fteCost = params.fteCost || 120000;
                const fteAllocation = params.fteAllocation || 50;
                const maintenancePercentage = params.maintenancePercentage || 18;
                
                const baseTCO = this.costComponents[vendor];
                if (!baseTCO) return { total: 0 };
                
                // Scale costs based on device count
                const scaleFactor = deviceCount / 2500; // Base calculations are for 2500 devices
                
                let hardware = baseTCO.hardware * scaleFactor;
                let software = baseTCO.software * scaleFactor;
                let implementation = baseTCO.implementation * (0.5 + (0.5 * scaleFactor)); // Implementation scales non-linearly
                let maintenance = baseTCO.maintenance * scaleFactor * (maintenancePercentage / 18); // Adjust for maintenance percentage
                let personnel = baseTCO.personnel * (fteCost / 120000) * (fteAllocation / 50); // Adjust for FTE cost and allocation
                
                // Special case for Portnox with volume discount
                if (vendor === 'portnox' && params.portnoxDiscount) {
                    software = software * (1 - (params.portnoxDiscount / 100));
                }
                
                // Adjust for years to project
                if (yearsToProject !== 3) {
                    const yearlyFactor = yearsToProject / 3;
                    maintenance = maintenance * yearlyFactor;
                    personnel = personnel * yearlyFactor;
                    software = software * yearlyFactor;
                }
                
                return {
                    hardware,
                    software,
                    implementation,
                    maintenance,
                    personnel,
                    total: hardware + software + implementation + maintenance + personnel
                };
            }
        };
        
        // Make available globally
        window.VendorData = VendorData;
        
        // Notification Manager
        class NotificationManager {
            constructor() {
                this.container = document.getElementById('toast-container');
                
                // Create container if it doesn't exist
                if (!this.container) {
                    this.container = document.createElement('div');
                    this.container.id = 'toast-container';
                    this.container.className = 'toast-container';
                    document.body.appendChild(this.container);
                }
            }
            
            show(message, type = 'info', duration = 5000) {
                // Create toast element
                const toast = document.createElement('div');
                toast.className = `toast toast-${type}`;
                
                // Set toast content
                toast.innerHTML = `
                    <div class="toast-icon">
                        <i class="fas fa-${this.getIconForType(type)}"></i>
                    </div>
                    <div class="toast-content">${message}</div>
                    <button class="toast-close">&times;</button>
                `;
                
                // Add to container
                this.container.appendChild(toast);
                
                // Trigger animation
                setTimeout(() => {
                    toast.classList.add('toast-visible');
                }, 10);
                
                // Set up auto-close
                let timeout;
                if (duration > 0) {
                    timeout = setTimeout(() => {
                        this.close(toast);
                    }, duration);
                }
                
                // Set up close button
                const closeBtn = toast.querySelector('.toast-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        if (timeout) clearTimeout(timeout);
                        this.close(toast);
                    });
                }
                
                return toast;
            }
            
            close(toast) {
                toast.classList.remove('toast-visible');
                toast.classList.add('toast-hidden');
                
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
            
            getIconForType(type) {
                switch (type) {
                    case 'success': return 'check-circle';
                    case 'warning': return 'exclamation-triangle';
                    case 'error': return 'exclamation-circle';
                    case 'info':
                    default: return 'info-circle';
                }
            }
        }
        
        // Loading Manager
        class LoadingManager {
            constructor() {
                this.overlay = document.getElementById('loading-overlay');
                
                if (!this.overlay) {
                    this.overlay = document.createElement('div');
                    this.overlay.id = 'loading-overlay';
                    this.overlay.className = 'loading-overlay';
                    
                    this.overlay.innerHTML = `
                        <div class="loading-spinner">
                            <div class="spinner"></div>
                            <p>Calculating...</p>
                        </div>
                    `;
                    
                    document.body.appendChild(this.overlay);
                }
            }
            
            show(message = 'Calculating...') {
                const messageElement = this.overlay.querySelector('p');
                if (messageElement) {
                    messageElement.textContent = message;
                }
                
                this.overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            
            hide() {
                this.overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Sidebar Controller
        class SidebarController {
            constructor() {
                this.sidebar = document.querySelector('.sidebar');
                this.toggle = document.querySelector('.sidebar-toggle');
                this.contentArea = document.querySelector('.content-area');
                this.configCards = document.querySelectorAll('.config-card');
                
                this.initEventListeners();
            }
            
            initEventListeners() {
                // Toggle sidebar
                if (this.toggle) {
                    this.toggle.addEventListener('click', () => this.toggleSidebar());
                }
                
                // Toggle config card sections
                this.configCards.forEach(card => {
                    const header = card.querySelector('.config-card-header');
                    const content = card.querySelector('.config-card-content');
                    
                    if (header && content) {
                        header.addEventListener('click', () => {
                            content.classList.toggle('collapsed');
                            const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
                            
                            if (icon) {
                                icon.classList.toggle('fa-chevron-down');
                                icon.classList.toggle('fa-chevron-up');
                            }
                        });
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    if (window.innerWidth < 768) {
                        this.contentArea.style.marginLeft = '0';
                    } else if (!this.sidebar.classList.contains('collapsed')) {
                        this.contentArea.style.marginLeft = '320px';
                    }
                });
            }
            
            toggleSidebar() {
                this.sidebar.classList.toggle('collapsed');
                
                if (window.innerWidth >= 768) {
                    if (this.sidebar.classList.contains('collapsed')) {
                        this.contentArea.style.marginLeft = '0';
                    } else {
                        this.contentArea.style.marginLeft = '320px';
                    }
                }
                
                // Update toggle icon
                const toggleIcon = this.toggle.querySelector('i');
                if (toggleIcon) {
                    toggleIcon.classList.toggle('fa-chevron-left');
                    toggleIcon.classList.toggle('fa-chevron-right');
                }
                
                // Trigger window resize to adjust charts
                window.dispatchEvent(new Event('resize'));
            }
        }
        
        // View Controller
        class ViewController {
            constructor() {
                // Stakeholder view tabs
                this.viewTabs = document.querySelectorAll('.view-tab');
                this.viewPanels = document.querySelectorAll('.view-panel');
                
                // Results tabs within each view
                this.resultsTabs = document.querySelectorAll('.results-tab');
                this.resultsPanels = document.querySelectorAll('.results-panel');
                
                this.initEventListeners();
            }
            
            initEventListeners() {
                // Stakeholder view switching
                this.viewTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const view = tab.getAttribute('data-view');
                        this.activateView(view);
                    });
                });
                
                // Results tab switching
                this.resultsTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const panel = tab.getAttribute('data-panel');
                        const view = tab.closest('.view-panel').getAttribute('data-view');
                        this.activateResultsPanel(panel, view);
                    });
                });
            }
            
            activateView(view) {
                // Update tab states
                this.viewTabs.forEach(tab => {
                    if (tab.getAttribute('data-view') === view) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Update panel visibility
                this.viewPanels.forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                
                // Trigger event for other components
                document.dispatchEvent(new CustomEvent('viewChanged', { 
                    detail: { view: view }
                }));
                
                // Trigger resize to fix chart display
                window.dispatchEvent(new Event('resize'));
            }
            
            activateResultsPanel(panelId, view) {
                // Get tabs and panels within the current view
                const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
                
                if (!viewPanel) return;
                
                const tabs = viewPanel.querySelectorAll('.results-tab');
                const panels = viewPanel.querySelectorAll('.results-panel');
                
                // Update tab states
                tabs.forEach(tab => {
                    if (tab.getAttribute('data-panel') === panelId) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Update panel visibility
                panels.forEach(panel => {
                    if (panel.getAttribute('id') === panelId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
                
                // Trigger resize to fix chart display
                window.dispatchEvent(new Event('resize'));
            }
            
            // Navigate to a specific view and panel
            navigateTo(view, panel) {
                this.activateView(view);
                if (panel) {
                    this.activateResultsPanel(panel, view);
                }
            }
        }
        
        // Vendor Controller
        class VendorController {
            constructor() {
                this.vendorCards = document.querySelectorAll('.vendor-card');
                this.selectedVendors = new Set(['portnox']); // Default to Portnox
                
                this.initEventListeners();
                this.updateVendorSelectionState();
            }
            
            initEventListeners() {
                // Vendor selection
                this.vendorCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const vendor = card.getAttribute('data-vendor');
                        this.toggleVendor(vendor, card);
                    });
                });
            }
            
            toggleVendor(vendor, card) {
                if (this.selectedVendors.has(vendor)) {
                    // Don't allow deselecting if it's the last vendor
                    if (this.selectedVendors.size > 1) {
                        this.selectedVendors.delete(vendor);
                        card.classList.remove('selected');
                    }
                } else {
                    this.selectedVendors.add(vendor);
                    card.classList.add('selected');
                }
                
                // Update state
                this.updateVendorSelectionState();
                
                // Trigger event for other components
                document.dispatchEvent(new CustomEvent('vendorsChanged', { 
                    detail: { 
                        vendors: Array.from(this.selectedVendors),
                        added: this.selectedVendors.has(vendor),
                        vendor: vendor
                    }
                }));
            }
            
            updateVendorSelectionState() {
                // Update UI to reflect selection state
                this.vendorCards.forEach(card => {
                    const vendor = card.getAttribute('data-vendor');
                    if (this.selectedVendors.has(vendor)) {
                        card.classList.add('selected');
                    } else {
                        card.classList.remove('selected');
                    }
                });
            }
            
            getSelectedVendors() {
                return Array.from(this.selectedVendors);
            }
        }
        
        // Config Controller
        class ConfigController {
            constructor() {
                this.state = {
                    // Organization
                    organizationSize: 'medium',
                    deviceCount: 2500,
                    locations: 5,
                    
                    // Features
                    cloudIntegration: false,
                    legacyDevices: false,
                    byodSupport: false,
                    
                    // Analysis
                    yearsToProject: 3,
                    
                    // Industry & Compliance
                    industry: '',
                    compliance: {
                        pci: false,
                        hipaa: false,
                        nist: false,
                        gdpr: false,
                        iso: false
                    },
                    
                    // Cost parameters
                    fteCost: 120000,
                    fteAllocation: 50,
                    maintenancePercentage: 18,
                    downtimeCost: 10000,
                    implementationDays: 60,
                    portnoxBasePrice: 4,
                    portnoxDiscount: 20
                };
                
                this.initEventListeners();
            }
            
            initEventListeners() {
                // Organization size
                const sizeSelect = document.getElementById('organization-size');
                if (sizeSelect) {
                    sizeSelect.addEventListener('change', () => {
                        this.state.organizationSize = sizeSelect.value;
                        this.updateDeviceCount(sizeSelect.value);
                    });
                }
                
                // Device count
                const deviceCountInput = document.getElementById('device-count');
                if (deviceCountInput) {
                    deviceCountInput.addEventListener('change', () => {
                        this.state.deviceCount = parseInt(deviceCountInput.value);
                    });
                }
                
                // Calculate button
                const calculateBtn = document.getElementById('calculate-btn');
                if (calculateBtn) {
                    calculateBtn.addEventListener('click', () => this.calculateResults());
                }
                
                // Set up range sliders
                this.initRangeSliders();
            }
            
            initRangeSliders() {
                const sliders = [
                    { id: 'fte-cost', valueId: 'fte-cost-value', property: 'fteCost', format: val => `$${parseInt(val).toLocaleString()}` },
                    { id: 'fte-allocation', valueId: 'fte-allocation-value', property: 'fteAllocation', format: val => `${val}%` },
                    { id: 'maintenance-percentage', valueId: 'maintenance-value', property: 'maintenancePercentage', format: val => `${val}%` },
                    { id: 'downtime-cost', valueId: 'downtime-cost-value', property: 'downtimeCost', format: val => `$${parseInt(val).toLocaleString()}` },
                    { id: 'implementation-days', valueId: 'implementation-days-value', property: 'implementationDays', format: val => `${val} days` },
                    { id: 'portnox-base-price', valueId: 'portnox-cost-value', property: 'portnoxBasePrice', format: val => `$${parseFloat(val).toFixed(2)}` },
                    { id: 'portnox-discount', valueId: 'portnox-discount-value', property: 'portnoxDiscount', format: val => `${val}%` }
                ];
                
                sliders.forEach(slider => {
                    const inputElement = document.getElementById(slider.id);
                    const valueDisplay = document.getElementById(slider.valueId);
                    
                    if (inputElement && valueDisplay) {
                        // Set initial value
                        valueDisplay.textContent = slider.format(inputElement.value);
                        
                        // Update on change
                        inputElement.addEventListener('input', () => {
                            const value = inputElement.type === 'range' ? inputElement.value : inputElement.value;
                            this.state[slider.property] = parseFloat(value);
                            valueDisplay.textContent = slider.format(value);
                        });
                    }
                });
            }
            
            updateDeviceCount(size) {
                // Update device count based on organization size
                const deviceCountInput = document.getElementById('device-count');
                
                if (deviceCountInput) {
                    let count = 2500;
                    
                    switch (size) {
                        case 'small':
                            count = 500;
                            break;
                        case 'medium':
                            count = 2500;
                            break;
                        case 'large':
                            count = 7500;
                            break;
                        case 'enterprise':
                            count = 15000;
                            break;
                    }
                    
                    deviceCountInput.value = count;
                    this.state.deviceCount = count;
                }
            }
            
            calculateResults() {
                // Show loading overlay
                if (window.LoadingManager) {
                    window.LoadingManager.show('Calculating TCO comparison...');
                }
                
                // Simulate calculation time
                setTimeout(() => {
                    // Hide loading overlay
                    if (window.LoadingManager) {
                        window.LoadingManager.hide();
                    }
                    
                    // Update TCO metrics
                    this.updateTcoMetrics();
                    
                    // Navigate to results if view controller exists
                    if (window.ViewController) {
                        window.ViewController.navigateTo('executive', 'executive-overview');
                    }
                    
                    // Show success notification
                    if (window.NotificationManager) {
                        window.NotificationManager.show('Analysis completed successfully', 'success');
                    }
                    
                    // Trigger event for chart updates
                    document.dispatchEvent(new CustomEvent('calculateResults', {
                        detail: this.state
                    }));
                    
                    console.log('Calculation results:', this.state);
                }, 1000);
            }
            
            updateTcoMetrics() {
                // Get selected vendors
                const selectedVendors = window.VendorController ? 
                    window.VendorController.getSelectedVendors() : 
                    ['portnox', 'cisco'];
                
                // Update metrics
                if (selectedVendors.includes('portnox')) {
                    const portnoxTco = window.VendorData.calculateTCO('portnox', this.state);
                    
                    const portnoxTcoElement = document.getElementById('portnox-tco');
                    if (portnoxTcoElement) {
                        portnoxTcoElement.textContent = `$${Math.round(portnoxTco.total).toLocaleString()}`;
                    }
                    
                    // If Cisco is also selected, calculate savings
                    if (selectedVendors.includes('cisco')) {
                        const ciscoTco = window.VendorData.calculateTCO('cisco', this.state);
                        
                        const tcoComparisonElement = document.getElementById('tco-comparison');
                        if (tcoComparisonElement) {
                            tcoComparisonElement.textContent = `vs. $${Math.round(ciscoTco.total).toLocaleString()} (Cisco ISE)`;
                        }
                        
                        const totalSavingsElement = document.getElementById('total-savings');
                        if (totalSavingsElement) {
                            const savings = ciscoTco.total - portnoxTco.total;
                            totalSavingsElement.textContent = `$${Math.round(savings).toLocaleString()}`;
                        }
                        
                        const savingsPercentageElement = document.getElementById('savings-percentage');
                        if (savingsPercentageElement) {
                            const percentage = Math.round(((ciscoTco.total - portnoxTco.total) / ciscoTco.total) * 100);
                            savingsPercentageElement.textContent = `${percentage}% reduction vs. Cisco ISE`;
                        }
                    }
                }
            }
            
            getState() {
                return { ...this.state };
            }
        }
        
        // Chart Controller
        class ChartController {
            constructor() {
                this.charts = {};
                this.chartConfig = {
                    responsive: true,
                    maintainAspectRatio: false,
                };
                
                // Initialize charts after a short delay to ensure DOM is ready
                setTimeout(() => this.initializeCharts(), 100);
                
                // Listen for calculate events
                document.addEventListener('calculateResults', () => {
                    this.updateCharts();
                });
                
                // Listen for window resize
                window.addEventListener('resize', this.handleResize.bind(this));
            }
            
            handleResize() {
                // Update charts on window resize
                Object.values(this.charts).forEach(chart => {
                    if (chart) chart.resize();
                });
            }
            
            initializeCharts() {
                // TCO Comparison Chart
                this.initTcoComparisonChart();
                
                // ROI Chart
                this.initRoiChart();
                
                // Other charts will be initialized as needed
            }
            
            initTcoComparisonChart() {
                const ctx = document.getElementById('tco-comparison-chart');
                if (!ctx) return;
                
                this.charts['tco-comparison'] = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Year 1', 'Year 2', 'Year 3'],
                        datasets: [{
                            label: 'Portnox Cloud',
                            data: [180000, 150000, 145000],
                            backgroundColor: VendorData.vendorColors['portnox'],
                        }, {
                            label: 'Cisco ISE',
                            data: [350000, 250000, 260000],
                            backgroundColor: VendorData.vendorColors['cisco'],
                        }]
                    },
                    options: {
                        ...this.chartConfig,
                        plugins: {
                            title: {
                                display: true,
                                text: '3-Year TCO Comparison'
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: (value) => {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            initRoiChart() {
                const ctx = document.getElementById('roi-chart');
                if (!ctx) return;
                
                this.charts['roi'] = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Year 1', 'Year 2', 'Year 3'],
                        datasets: [{
                            label: 'Portnox Cloud',
                            data: [20000, 150000, 280000],
                            borderColor: VendorData.vendorColors['portnox'],
                            backgroundColor: 'rgba(54, 179, 126, 0.2)',
                            fill: true
                        }, {
                            label: 'Cisco ISE',
                            data: [-30000, 20000, 75000],
                            borderColor: VendorData.vendorColors['cisco'],
                            backgroundColor: 'rgba(13, 91, 217, 0.2)',
                            fill: true
                        }]
                    },
                    options: {
                        ...this.chartConfig,
                        plugins: {
                            title: {
                                display: true,
                                text: 'ROI Over Time'
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    callback: (value) => {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            updateCharts() {
                // Update charts based on current state
                this.updateTcoComparisonChart();
                this.updateRoiChart();
                
                // Trigger resize to ensure proper rendering
                window.dispatchEvent(new Event('resize'));
            }
            
            updateTcoComparisonChart() {
                const chart = this.charts['tco-comparison'];
                if (!chart) return;
                
                // Get selected vendors
                const selectedVendors = window.VendorController ? 
                    window.VendorController.getSelectedVendors() : 
                    ['portnox', 'cisco'];
                
                // Get config state
                const configState = window.ConfigController ? 
                    window.ConfigController.getState() : null;
                
                // Update chart data
                chart.data.datasets = selectedVendors.map(vendor => {
                    return {
                        label: VendorData.vendorNames[vendor],
                        data: VendorData.tcoData[vendor],
                        backgroundColor: VendorData.vendorColors[vendor]
                    };
                });
                
                chart.update();
            }
            
            updateRoiChart() {
                const chart = this.charts['roi'];
                if (!chart) return;
                
                // Get selected vendors
                const selectedVendors = window.VendorController ? 
                    window.VendorController.getSelectedVendors() : 
                    ['portnox', 'cisco'];
                
                // Filter to vendors we have ROI data for
                const vendorsWithRoi = selectedVendors.filter(vendor => 
                    VendorData.roiData && VendorData.roiData[vendor]
                );
                
                // Update chart data
                chart.data.datasets = vendorsWithRoi.map(vendor => {
                    return {
                        label: VendorData.vendorNames[vendor],
                        data: VendorData.roiData[vendor],
                        borderColor: VendorData.vendorColors[vendor],
                        backgroundColor: `${VendorData.vendorColors[vendor]}20`,
                        fill: true
                    };
                });
                
                chart.update();
            }
        }
        
        // Implementation Timeline
        class ImplementationTimeline {
            constructor() {
                this.container = document.getElementById('implementation-timeline');
                if (!this.container) return;
                
                // Generate Portnox timeline by default
                this.generate('portnox');
                
                // Listen for vendor changes
                document.addEventListener('vendorsChanged', (e) => {
                    const { vendor, added } = e.detail;
                    
                    // Update timeline when a vendor is selected
                    if (added) {
                        this.generate(vendor);
                    }
                });
            }
            
            generate(vendor) {
                if (!this.container) return;
                
                // Clear existing content
                this.container.innerHTML = '';
                
                // Get timeline phases based on vendor
                const phases = this.getTimelinePhases(vendor);
                
                // Create timeline HTML
                const timeline = document.createElement('div');
                timeline.className = 'implementation-timeline';
                
                phases.forEach(phase => {
                    const item = document.createElement('div');
                    item.className = 'timeline-item';
                    
                    item.innerHTML = `
                        <h4>${phase.name} <span class="duration">(${phase.duration})</span></h4>
                        <p>${phase.description}</p>
                    `;
                    
                    timeline.appendChild(item);
                });
                
                this.container.appendChild(timeline);
            }
            
            getTimelinePhases(vendor) {
                // Default phases
                const defaultPhases = [
                    {
                        name: 'Planning & Assessment',
                        duration: '1-2 weeks',
                        description: 'Evaluate environment, define requirements, and create deployment plan.'
                    },
                    {
                        name: 'Initial Setup',
                        duration: '1 week',
                        description: 'Set up core components and establish baseline configuration.'
                    },
                    {
                        name: 'Configuration & Integration',
                        duration: '2-4 weeks',
                        description: 'Configure policies, integrate with existing systems, and test functionality.'
                    },
                    {
                        name: 'Pilot Deployment',
                        duration: '1-2 weeks',
                        description: 'Deploy to a limited group of users for testing and feedback.'
                    },
                    {
                        name: 'Training & Knowledge Transfer',
                        duration: '1 week',
                        description: 'Train IT staff on administration, monitoring, and troubleshooting.'
                    },
                    {
                        name: 'Full Deployment',
                        duration: '2-4 weeks',
                        description: 'Roll out solution to all users and devices across the organization.'
                    }
                ];
                
                // Vendor-specific phases
                switch (vendor) {
                    case 'portnox':
                        return [
                            {
                                name: 'Cloud Setup',
                                duration: '1 day',
                                description: 'Provision and configure Portnox Cloud instance.'
                            },
                            {
                                name: 'Identity Integration',
                                duration: '1-2 days',
                                description: 'Connect to identity providers like Active Directory or Azure AD.'
                            },
                            {
                                name: 'Network Integration',
                                duration: '2-3 days',
                                description: 'Configure network devices for RADIUS authentication.'
                            },
                            {
                                name: 'Policy Configuration',
                                duration: '1-2 days',
                                description: 'Define access policies and enforcement actions.'
                            },
                            {
                                name: 'Testing',
                                duration: '1-2 days',
                                description: 'Validate functionality with test devices.'
                            },
                            {
                                name: 'Deployment',
                                duration: '1-2 weeks',
                                description: 'Phased rollout to all devices and locations.'
                            }
                        ];
                    case 'cisco':
                        return [
                            {
                                name: 'Architecture Design',
                                duration: '2-4 weeks',
                                description: 'Design ISE deployment architecture with hardware sizing.'
                            },
                            {
                                name: 'Hardware Setup',
                                duration: '2-3 weeks',
                                description: 'Deploy ISE appliances or virtual machines with high availability.'
                            },
                            {
                                name: 'Certificate Management',
                                duration: '1 week',
                                description: 'Set up certificate authority and deploy certificates.'
                            },
                            {
                                name: 'Network Integration',
                                duration: '3-4 weeks',
                                description: 'Configure switches, WLCs, and VPN for ISE integration.'
                            },
                            {
                                name: 'Policy Configuration',
                                duration: '2-3 weeks',
                                description: 'Create detailed authorization policies and profiles.'
                            },
                            {
                                name: 'Training',
                                duration: '1-2 weeks',
                                description: 'Formal training for administrators (certification recommended).'
                            },
                            {
                                name: 'Pilot Phase',
                                duration: '2-4 weeks',
                                description: 'Controlled rollout with extensive monitoring.'
                            },
                            {
                                name: 'Full Deployment',
                                duration: '4-8 weeks',
                                description: 'Phased rollout by location with fallback options.'
                            }
                        ];
                    default:
                        return defaultPhases;
                }
            }
        }
        
        // Initialize all components
        window.NotificationManager = new NotificationManager();
        window.LoadingManager = new LoadingManager();
        window.SidebarController = new SidebarController();
        window.ViewController = new ViewController();
        window.VendorController = new VendorController();
        window.ConfigController = new ConfigController();
        window.ChartController = new ChartController();
        window.ImplementationTimeline = new ImplementationTimeline();
        
        // Show welcome notification
        window.NotificationManager.show('Welcome to the Portnox Total Cost Analyzer. Select vendors to compare and adjust configuration settings as needed.', 'info');
    });
    </script>
</body>
</html>
EOF

# Create necessary directories and placeholder files for fonts and images
echo "Creating placeholder files for missing resources..."

# Create directories
mkdir -p img/vendors

# Create Portnox logo placeholder
cat > img/portnox-logo.svg << 'EOF'
<svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="50" fill="#ffffff"/>
  <path d="M20 10 H40 A10 10 0 0 1 50 20 V30 A10 10 0 0 1 40 40 H20 A10 10 0 0 1 10 30 V20 A10 10 0 0 1 20 10 Z" fill="#0052CC"/>
  <text x="65" y="30" font-family="Arial" font-size="20" font-weight="bold" fill="#333333">PORTNOX</text>
</svg>
EOF

# Create vendor logo placeholders
for vendor in portnox cisco aruba forescout fortinac juniper securew2 microsoft; do
  echo "Creating placeholder for $vendor logo..."
  cat > img/vendors/${vendor}-logo.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==
EOF
done

# Create CSS for the enhanced UI
echo "Creating CSS for enhanced UI..."
cat > css/enhanced-ui.css << 'EOF'
/**
 * Enhanced UI Components
 * Additional styling for the Portnox Total Cost Analyzer
 */

/* Base Layout */
body {
  font-family: 'Nunito', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
}

.company-logo {
  height: 40px;
  margin-right: 1rem;
}

.app-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.app-title .subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

/* Main Content with Sidebar */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 320px;
  background-color: #fff;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-320px);
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.sidebar-content {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.sidebar-toggle {
  position: absolute;
  left: 320px;
  top: 80px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-left: none;
  width: 24px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 20;
}

.sidebar.collapsed + .content-area .sidebar-toggle {
  left: 0;
}

.content-area {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

/* Configuration Cards */
.config-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
}

.config-card-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #e9ecef;
}

.config-card-header h3 {
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.config-card-header h3 i {
  margin-right: 0.5rem;
  width: 18px;
  text-align: center;
}

.config-card-content {
  padding: 1rem;
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.config-card-content.collapsed {
  max-height: 0;
  padding: 0 1rem;
  visibility: hidden;
}

/* Vendor Selection */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.vendor-card {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.vendor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.vendor-card.selected {
  border-color: #0052CC;
  box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.25);
}

.vendor-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #fff;
}

.vendor-logo img {
  max-height: 40px;
  max-width: 80%;
}

.vendor-info {
  padding: 0.5rem;
  text-align: center;
  background-color: #f8f9fa;
}

.vendor-info h3 {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
}

.vendor-info p {
  margin: 0;
  font-size: 0.7rem;
  color: #666;
}

/* Form Elements */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  appearance: none;
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-check-input {
  margin-right: 0.5rem;
}

.helper-text {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

/* Range Sliders */
.range-slider {
  margin-bottom: 1.25rem;
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.range-slider-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.range-slider-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0052CC;
}

input[type="range"] {
  width: 100%;
  margin: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
}

.btn i {
  margin-right: 0.5rem;
}

.btn-primary {
  color: #fff;
  background-color: #0052CC;
  border-color: #0052CC;
}

.btn-primary:hover {
  background-color: #0046ad;
  border-color: #0046ad;
}

.btn-outline {
  color: #6c757d;
  background-color: transparent;
  border-color: #ced4da;
}

.btn-outline:hover {
  color: #495057;
  background-color: #f8f9fa;
}

.btn-large {
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-icon i {
  margin-right: 0.25rem;
}

/* View Tabs */
.view-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1.5rem;
}

.view-tab {
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.view-tab:hover {
  color: #0052CC;
}

.view-tab.active {
  color: #0052CC;
  border-bottom-color: #0052CC;
}

/* Results Tabs */
.results-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1.25rem;
  overflow-x: auto;
}

.results-tab {
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

.results-tab:hover {
  color: #0052CC;
}

.results-tab.active {
  color: #0052CC;
  border-bottom-color: #0052CC;
}

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
}

.dashboard-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.8125rem;
  color: #6c757d;
}

.highlight-value {
  color: #36B37E;
}

.negative-value {
  color: #FF5630;
}

/* Charts */
.chart-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.chart-wrapper {
  height: 300px;
  width: 100%;
}

/* Tables */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.data-table th, 
.data-table td {
  padding: 0.75rem;
  border: 1px solid #dee2e6;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-align: left;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.data-table .highlight-value {
  color: #36B37E;
  font-weight: 600;
}

.data-table .negative-value {
  color: #FF5630;
  font-weight: 600;
}

.data-table .total-row {
  background-color: #f8f9fa;
  font-weight: 600;
}

.responsive-table {
  overflow-x: auto;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}

.badge-success {
  background-color: #e6f7f0;
  color: #36B37E;
}

.badge-warning {
  background-color: #fff8e6;
  color: #FFAB00;
}

.badge-danger {
  background-color: #ffebe6;
  color: #FF5630;
}

/* Benefits List */
.benefits-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
}

.benefits-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.benefits-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: #36B37E;
  font-weight: bold;
}

/* Implementation Timeline */
.implementation-timeline {
  position: relative;
  padding: 1rem 0;
}

.timeline-item {
  padding: 1rem;
  border-left: 2px solid #0052CC;
  margin-left: 20px;
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-item:before {
  content: "";
  position: absolute;
  left: -10px;
  top: 1.25rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #0052CC;
}

.timeline-item h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.timeline-item .duration {
  font-weight: normal;
  color: #6c757d;
  font-size: 0.875rem;
}

.timeline-item p {
  margin-bottom: 0;
  font-size: 0.875rem;
}

/* Footer */
.app-footer {
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  padding: 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: #6c757d;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-links a {
  font-size: 0.875rem;
  color: #6c757d;
  text-decoration: none;
}

.footer-links a:hover {
  color: #0052CC;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  color: #6c757d;
  font-size: 1.25rem;
}

.social-link:hover {
  color: #0052CC;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 0;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  background: none;
  border: none;
}

.modal-body {
  padding: 1rem;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0052CC;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  max-width: 350px;
}

.toast {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.3s ease;
}

.toast-visible {
  opacity: 1;
  transform: translateX(0);
}

.toast-hidden {
  opacity: 0;
  transform: translateX(100%);
}

.toast-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.toast-content {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #6c757d;
  margin-left: 0.75rem;
}

.toast-info {
  border-left: 4px solid #0052CC;
}

.toast-info .toast-icon {
  color: #0052CC;
}

.toast-success {
  border-left: 4px solid #36B37E;
}

.toast-success .toast-icon {
  color: #36B37E;
}

.toast-warning {
  border-left: 4px solid #FFAB00;
}

.toast-warning .toast-icon {
  color: #FFAB00;
}

.toast-error {
  border-left: 4px solid #FF5630;
}

.toast-error .toast-icon {
  color: #FF5630;
}

/* Sensitivity Analysis Controls */
.sensitivity-controls {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-bottom: 1rem;
}

.form-row > .form-group {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  flex: 1;
}

/* Main CSS file should include responsive adjustments */
@media (max-width: 992px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .vendor-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    transform: none;
    border-bottom: 1px solid #e9ecef;
  }
  
  .sidebar.collapsed {
    transform: translateY(-100%);
  }
  
  .sidebar-toggle {
    top: 0;
    left: auto;
    right: 20px;
    border-radius: 0 0 4px 4px;
    border-top: none;
    width: 40px;
    height: 24px;
  }
  
  .sidebar-toggle i {
    transform: rotate(90deg);
  }
  
  .sidebar.collapsed + .content-area .sidebar-toggle {
    top: 0;
    left: auto;
  }
  
  .sidebar.collapsed + .content-area .sidebar-toggle i {
    transform: rotate(270deg);
  }
  
  .content-area {
    margin-left: 0 !important;
    padding: 1rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    align-self: flex-end;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .vendor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-row > .form-group {
    margin-bottom: 1rem;
  }
  
  .results-tabs {
    flex-wrap: wrap;
  }
  
  .results-tab {
    flex: 1;
    text-align: center;
    min-width: 80px;
  }
}
EOF

# Create main.css file with sidebar layout
cat > css/main.css << 'EOF'
/**
 * Main CSS styles for Portnox Total Cost Analyzer
 */

/* Import enhanced UI styles */
@import url('enhanced-ui.css');

/* Base styles */
:root {
  --primary-color: #0052CC;
  --success-color: #36B37E;
  --warning-color: #FFAB00;
  --danger-color: #FF5630;
  --text-color: #333333;
  --text-secondary: #6c757d;
  --border-color: #e9ecef;
  --bg-color: #f8f9fa;
  --card-bg: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
}

/* Particles background */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
EOF

# Create sidebar-layout.css
cat > css/sidebar-layout.css << 'EOF'
/**
 * Sidebar Layout styles for Portnox Total Cost Analyzer
 */

/* Main layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Sidebar */
.sidebar {
  width: 320px;
  background-color: white;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-320px);
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-content {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
}

/* Sidebar toggle */
.sidebar-toggle {
  position: absolute;
  left: 320px;
  top: 80px;
  width: 24px;
  height: 40px;
  background: white;
  border: 1px solid var(--border-color);
  border-left: none;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: left 0.3s ease;
}

.sidebar.collapsed + .content-area .sidebar-toggle {
  left: 0;
}

/* Content area */
.content-area {
  flex: 1;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

.content-wrapper {
  padding: 1.5rem;
}
EOF

echo "Fix completed successfully!"
echo "You should now see the collapsible sidebar with vendor selection and cost configuration panels."
echo "Open index.html in your browser to view the fixed application."
