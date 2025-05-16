#!/bin/bash

echo "Performing Comprehensive Portnox Total Cost Analyzer Enhancement"
echo "=============================================================="

# Create a backup of the original files
TIMESTAMP=$(date +%Y%m%d%H%M%S)
echo "Creating backup of current files to backup_$TIMESTAMP"
mkdir -p backup_$TIMESTAMP
cp -r css js img index.html backup_$TIMESTAMP/

# Ensure the proper directory structure exists
echo "Verifying and creating necessary directories..."
mkdir -p css js img/vendors

# Update index.html with improved structure, proper logo references, and enhanced UI
echo "Updating index.html with improved structure and enhanced UI..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zero Trust Total Cost Analyzer - Enterprise Total Cost of Ownership Calculator">
    <title>Total Cost Analyzer | Portnox</title>
    
    <!-- CSS Libraries - Load from CDN to ensure availability -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/enhanced-ui.css">
    <link rel="stylesheet" href="css/particle-background.css">
    
    <link rel="icon" type="image/png" href="img/favicon.png">
    
    <!-- Pre-load Chart.js and plugins to fix loading issues -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0"></script>
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
                    <img src="img/vendors/portnox-logo.png" alt="Portnox Logo" class="company-logo">
                    <div class="app-title">
                        <h1>Zero Trust Total Cost Analyzer</h1>
                        <p class="subtitle">Multi-Vendor NAC Solution Comparison Platform</p>
                    </div>
                </div>
                <div class="header-actions">
                    <div class="stakeholder-selector">
                        <div class="stakeholder-tabs">
                            <button class="stakeholder-tab active" data-view="executive">
                                <i class="fas fa-chart-pie"></i> Executive
                            </button>
                            <button class="stakeholder-tab" data-view="financial">
                                <i class="fas fa-coins"></i> Financial
                            </button>
                            <button class="stakeholder-tab" data-view="security">
                                <i class="fas fa-shield-alt"></i> Security
                            </button>
                            <button class="stakeholder-tab" data-view="technical">
                                <i class="fas fa-cogs"></i> Technical
                            </button>
                        </div>
                    </div>
                    <button id="calculate-btn-header" class="btn btn-primary" title="Calculate TCO & ROI">
                        <i class="fas fa-calculator"></i> Calculate
                    </button>
                    <button id="export-pdf" class="btn btn-outline btn-icon" title="Export Report">
                        <i class="fas fa-file-pdf"></i>
                        <span>Export</span>
                    </button>
                    <button id="help-btn" class="btn btn-outline btn-icon" title="Help">
                        <i class="fas fa-question-circle"></i>
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
            <div class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <h2><i class="fas fa-sliders-h"></i> Configuration</h2>
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
                                    <div class="vendor-badge">
                                        <span class="badge badge-primary">Best Value</span>
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
                                    <div class="vendor-badge">
                                        <span class="badge badge-warning">Complex</span>
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
                                
                                <div class="vendor-card" data-vendor="microsoft">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/microsoft-logo.png" alt="Microsoft NPS">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Microsoft NPS</h3>
                                        <p>Windows Server NAC</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="arista">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/arista-logo.png" alt="Arista Agni">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Arista Agni</h3>
                                        <p>Network control</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="foxpass">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>Foxpass</h3>
                                        <p>Cloud RADIUS/LDAP</p>
                                    </div>
                                </div>
                                
                                <div class="vendor-card" data-vendor="no-nac">
                                    <div class="vendor-logo">
                                        <img src="img/vendors/no-nac-icon.png" alt="No NAC">
                                    </div>
                                    <div class="vendor-info">
                                        <h3>No NAC</h3>
                                        <p>High risk baseline</p>
                                    </div>
                                    <div class="vendor-badge">
                                        <span class="badge badge-danger">High Risk</span>
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
                                <div class="compliance-grid">
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-pci" class="form-check-input">
                                        <label for="compliance-pci">PCI DSS</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-hipaa" class="form-check-input">
                                        <label for="compliance-hipaa">HIPAA</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-nist" class="form-check-input">
                                        <label for="compliance-nist">NIST 800-53</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-gdpr" class="form-check-input">
                                        <label for="compliance-gdpr">GDPR</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-iso" class="form-check-input">
                                        <label for="compliance-iso">ISO 27001</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-cmmc" class="form-check-input">
                                        <label for="compliance-cmmc">CMMC</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-ferpa" class="form-check-input">
                                        <label for="compliance-ferpa">FERPA</label>
                                    </div>
                                    <div class="compliance-item">
                                        <input type="checkbox" id="compliance-sox" class="form-check-input">
                                        <label for="compliance-sox">SOX</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="risk-profile" class="form-label">Risk Profile</label>
                                <select id="risk-profile" class="form-select">
                                    <option value="standard">Standard Risk</option>
                                    <option value="elevated">Elevated Risk</option>
                                    <option value="high">High Risk</option>
                                    <option value="regulated">Highly Regulated</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="cybersecurity-insurance" class="form-label">Cybersecurity Insurance</label>
                                <select id="cybersecurity-insurance" class="form-select">
                                    <option value="none">None</option>
                                    <option value="basic">Basic Coverage</option>
                                    <option value="standard" selected>Standard Coverage</option>
                                    <option value="comprehensive">Comprehensive Coverage</option>
                                </select>
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
                                    <option value="very-small">Very Small (< 300 devices)</option>
                                    <option value="small" selected>Small (300-1,000 devices)</option>
                                    <option value="medium">Medium (1,000-5,000 devices)</option>
                                    <option value="large">Large (5,000-10,000 devices)</option>
                                    <option value="enterprise">Enterprise (10,000+ devices)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="device-count" class="form-label">Number of Devices</label>
                                <input type="number" id="device-count" class="form-control" value="500" min="300" max="100000">
                                <div class="helper-text">Include all managed devices (PCs, mobile, IoT)</div>
                            </div>
                            
                            <div class="form-group">
                                <label for="locations" class="form-label">Number of Locations</label>
                                <input type="number" id="locations" class="form-control" value="2" min="1" max="1000">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Network Requirements</label>
                                <div class="feature-grid">
                                    <div class="feature-item">
                                        <input type="checkbox" id="cloud-integration" class="form-check-input">
                                        <label for="cloud-integration">Cloud Integration</label>
                                    </div>
                                    <div class="feature-item">
                                        <input type="checkbox" id="legacy-devices" class="form-check-input">
                                        <label for="legacy-devices">Legacy Device Support</label>
                                    </div>
                                    <div class="feature-item">
                                        <input type="checkbox" id="byod-support" class="form-check-input" checked>
                                        <label for="byod-support">BYOD Support</label>
                                    </div>
                                    <div class="feature-item">
                                        <input type="checkbox" id="iot-support" class="form-check-input">
                                        <label for="iot-support">IoT Devices</label>
                                    </div>
                                    <div class="feature-item">
                                        <input type="checkbox" id="wireless-support" class="form-check-input" checked>
                                        <label for="wireless-support">Wireless Network</label>
                                    </div>
                                    <div class="feature-item">
                                        <input type="checkbox" id="remote-work" class="form-check-input" checked>
                                        <label for="remote-work">Remote Users</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="years-to-project" class="form-label">Analysis Period</label>
                                <select id="years-to-project" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Parameters -->
                    <div id="cost-config" class="config-card">
                        <div class="config-card-header">
                            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
                            <i class="fas fa-chevron-up"></i>
                        </div>
                        <div class="config-card-content">
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Portnox Cost per Device ($/month)</span>
                                    <span class="range-slider-value" id="portnox-cost-value">$3.00</span>
                                </div>
                                <input type="range" id="portnox-base-price" min="1" max="6" step="0.5" value="3">
                                <div class="helper-text">Adjust the per-device pricing for Portnox Cloud</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Volume Discount (%)</span>
                                    <span class="range-slider-value" id="portnox-discount-value">15%</span>
                                </div>
                                <input type="range" id="portnox-discount" min="0" max="40" value="15" step="5">
                                <div class="helper-text">Volume discount based on device count</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Average FTE Cost ($/year)</span>
                                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                                </div>
                                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">FTE Allocation for NAC (%)</span>
                                    <span class="range-slider-value" id="fte-allocation-value">25%</span>
                                </div>
                                <input type="range" id="fte-allocation" min="5" max="75" value="25" step="5">
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
                                    <span class="range-slider-value" id="downtime-cost-value">$5,000</span>
                                </div>
                                <input type="range" id="downtime-cost" min="1000" max="25000" value="5000" step="1000">
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Risk of Breach Cost Reduction (%)</span>
                                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                                </div>
                                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
                                <div class="helper-text">Estimated reduction in breach costs with NAC</div>
                            </div>
                            
                            <div class="range-slider">
                                <div class="range-slider-header">
                                    <span class="range-slider-label">Insurance Premium Reduction (%)</span>
                                    <span class="range-slider-value" id="insurance-reduction-value">10%</span>
                                </div>
                                <input type="range" id="insurance-reduction" min="0" max="20" value="10" step="5">
                                <div class="helper-text">Potential cyber insurance premium reduction</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sidebar-footer">
                    <button id="calculate-btn" class="btn btn-primary btn-large">
                        <i class="fas fa-calculator"></i> Calculate TCO & ROI
                    </button>
                </div>
            </div>
            
            <!-- Sidebar Toggle Button -->
            <div class="sidebar-toggle" id="sidebar-toggle">
                <i class="fas fa-chevron-left"></i>
            </div>
            
            <!-- Main Content Area -->
            <div class="content-area" id="content-area">
                <div class="content-wrapper">
                    <!-- Main Stakeholder Tabs -->
                    <div class="stakeholder-tabs mobile-tabs">
                        <button class="stakeholder-tab active" data-view="executive">
                            <i class="fas fa-chart-pie"></i> Executive
                        </button>
                        <button class="stakeholder-tab" data-view="financial">
                            <i class="fas fa-coins"></i> Financial
                        </button>
                        <button class="stakeholder-tab" data-view="security">
                            <i class="fas fa-shield-alt"></i> Security
                        </button>
                        <button class="stakeholder-tab" data-view="technical">
                            <i class="fas fa-cogs"></i> Technical
                        </button>
                    </div>
                    
                    <!-- Executive View -->
                    <div class="view-panel active" data-view="executive">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="executive-summary">Executive Summary</button>
                            <button class="results-tab" data-panel="executive-roi">ROI Analysis</button>
                            <button class="results-tab" data-panel="executive-risk">Risk Assessment</button>
                            <button class="results-tab" data-panel="executive-comparison">Vendor Comparison</button>
                        </div>
                        
                        <!-- Executive Summary Panel -->
                        <div id="executive-summary" class="results-panel active">
                            <div class="panel-header">
                                <h2>Executive Summary</h2>
                                <p class="subtitle">Strategic overview of cost savings and business benefits</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>Total 3-Year Savings</h3>
                                    <div class="metric-value highlight-value" id="total-savings">$247,000</div>
                                    <div class="metric-label" id="savings-percentage">48% reduction vs. Cisco ISE</div>
                                    <div class="metric-trend up">
                                        <i class="fas fa-arrow-up"></i> 15% higher than industry average
                                    </div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Payback Period</h3>
                                    <div class="metric-value" id="payback-period">7 months</div>
                                    <div class="metric-label">Time to positive ROI</div>
                                    <div class="metric-trend up">
                                        <i class="fas fa-arrow-up"></i> 5 months faster than competitors
                                    </div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Risk Reduction</h3>
                                    <div class="metric-value" id="risk-reduction-total">58%</div>
                                    <div class="metric-label">Overall security improvement</div>
                                    <div class="metric-trend up">
                                        <i class="fas fa-arrow-up"></i> 20% better than alternatives
                                    </div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Time</h3>
                                    <div class="metric-value" id="implementation-time">21 days</div>
                                    <div class="metric-label" id="implementation-comparison">75% faster than on-premises</div>
                                    <div class="metric-trend up">
                                        <i class="fas fa-arrow-up"></i> Leading time-to-security
                                    </div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>3-Year TCO Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>
                                <div class="chart-legend" id="tco-comparison-legend"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cumulative Cost Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                                <div class="chart-legend" id="cumulative-cost-legend"></div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Key Strategic Benefits</h3>
                                <div class="benefits-grid">
                                    <div class="benefit-card">
                                        <div class="benefit-icon">
                                            <i class="fas fa-cloud"></i>
                                        </div>
                                        <h4>Cloud-Native Solution</h4>
                                        <p>Zero infrastructure costs, automatic updates, and global scalability</p>
                                    </div>
                                    <div class="benefit-card">
                                        <div class="benefit-icon">
                                            <i class="fas fa-bolt"></i>
                                        </div>
                                        <h4>Rapid Deployment</h4>
                                        <p>75% faster implementation than on-premises alternatives</p>
                                    </div>
                                    <div class="benefit-card">
                                        <div class="benefit-icon">
                                            <i class="fas fa-shield-alt"></i>
                                        </div>
                                        <h4>Zero Trust Security</h4>
                                        <p>Comprehensive, continuous device authentication and verification</p>
                                    </div>
                                    <div class="benefit-card">
                                        <div class="benefit-icon">
                                            <i class="fas fa-chart-line"></i>
                                        </div>
                                        <h4>Future-Proof Solution</h4>
                                        <p>Automatic updates, continuous innovation, and AI-powered security</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Executive ROI Panel -->
                        <div id="executive-roi" class="results-panel">
                            <div class="panel-header">
                                <h2>ROI Analysis</h2>
                                <p class="subtitle">Detailed return on investment analysis and business value</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card highlight-card">
                                    <h3>3-Year ROI</h3>
                                    <div class="metric-value highlight-value" id="three-year-roi">287%</div>
                                    <div class="metric-label">Return on investment</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Cost Savings</h3>
                                    <div class="metric-value" id="annual-savings">$82,333</div>
                                    <div class="metric-label">Per year vs. traditional solutions</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Productivity Gains</h3>
                                    <div class="metric-value" id="productivity-value">$130,000</div>
                                    <div class="metric-label">Estimated 3-year value</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Compliance Savings</h3>
                                    <div class="metric-value" id="compliance-savings">$92,000</div>
                                    <div class="metric-label">Audit & reporting efficiency</div>
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
                                <div class="chart-wrapper half-height">
                                    <canvas id="value-drivers-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Business Value</h3>
                                <div class="table-responsive">
                                    <table class="data-table" id="business-value-table">
                                        <thead>
                                            <tr>
                                                <th>Benefit Category</th>
                                                <th>Description</th>
                                                <th>3-Year Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Direct Cost Reduction</td>
                                                <td>Hardware, licenses, and maintenance savings</td>
                                                <td class="highlight-value">$167,000</td>
                                            </tr>
                                            <tr>
                                                <td>IT Staff Efficiency</td>
                                                <td>Reduced admin time and management overhead</td>
                                                <td class="highlight-value">$125,000</td>
                                            </tr>
                                            <tr>
                                                <td>Breach Risk Reduction</td>
                                                <td>Lower probability and impact of security incidents</td>
                                                <td class="highlight-value">$85,000</td>
                                            </tr>
                                            <tr>
                                                <td>Compliance Automation</td>
                                                <td>Streamlined audits and reporting</td>
                                                <td class="highlight-value">$92,000</td>
                                            </tr>
                                            <tr>
                                                <td>Insurance Premium Reduction</td>
                                                <td>Lower cybersecurity insurance costs</td>
                                                <td class="highlight-value">$28,000</td>
                                            </tr>
                                            <tr class="total-row">
                                                <td>Total Business Value</td>
                                                <td></td>
                                                <td class="highlight-value">$497,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Executive Risk Panel -->
                        <div id="executive-risk" class="results-panel">
                            <div class="panel-header">
                                <h2>Risk Assessment</h2>
                                <p class="subtitle">Security risk evaluation and business impact analysis</p>
                            </div>
                            
                            <div class="dashboard-grid">
                                <div class="dashboard-card">
                                    <h3>Security Posture Improvement</h3>
                                    <div class="metric-value highlight-value" id="security-improvement">74%</div>
                                    <div class="metric-label">Enhanced protection vs. no NAC</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Breach Probability</h3>
                                    <div class="metric-value" id="breach-probability">Low</div>
                                    <div class="metric-label">vs. Medium-High (No NAC)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Compliance Coverage</h3>
                                    <div class="metric-value" id="compliance-coverage">93%</div>
                                    <div class="metric-label">Key frameworks supported</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Mean Time to Respond</h3>
                                    <div class="metric-value" id="mttr">52 min</div>
                                    <div class="metric-label">vs. 4.5 hours (Industry avg.)</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Risk Profile Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="risk-comparison-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Breach Impact Analysis</h3>
                                <div class="chart-wrapper">
                                    <canvas id="breach-impact-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cyber Insurance Impact</h3>
                                <div class="chart-wrapper half-height">
                                    <canvas id="insurance-impact-chart"></canvas>
                                </div>
                                
                                <div class="insight-box">
                                    <h4><i class="fas fa-lightbulb"></i> Insurance Premium Insight</h4>
                                    <p>Implementing Portnox can reduce cybersecurity insurance premiums by an average of 10-15% by demonstrating strong security controls and continuous monitoring capabilities.</p>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Business Impact Heat Map</h3>
                                <div class="heatmap-container" id="risk-heatmap">
                                    <!-- Heatmap will be rendered here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Executive Comparison Panel -->
                        <div id="executive-comparison" class="results-panel">
                            <div class="panel-header">
                                <h2>Vendor Comparison</h2>
                                <p class="subtitle">Key differentiators and competitive advantages</p>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Solution Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="vendor-radar-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Competitive Advantages</h3>
                                <div class="advantages-grid">
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-cloud"></i>
                                            </div>
                                            <h4>Cloud-Native Architecture</h4>
                                        </div>
                                        <p>Unlike on-premises competitors, Portnox requires no hardware investment or complex upgrades.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 95%;"></div>
                                            </div>
                                            <div class="bar-value">95%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 30%;"></div>
                                            </div>
                                            <div class="bar-value">30%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-tachometer-alt"></i>
                                            </div>
                                            <h4>Deployment Speed</h4>
                                        </div>
                                        <p>Portnox deploys in days rather than months, with minimal specialized expertise required.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 90%;"></div>
                                            </div>
                                            <div class="bar-value">90%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 35%;"></div>
                                            </div>
                                            <div class="bar-value">35%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-lock"></i>
                                            </div>
                                            <h4>Zero Trust Model</h4>
                                        </div>
                                        <p>Built from the ground up for zero trust security, not retrofitted like legacy solutions.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 98%;"></div>
                                            </div>
                                            <div class="bar-value">98%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 45%;"></div>
                                            </div>
                                            <div class="bar-value">45%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="advantage-card">
                                        <div class="advantage-header">
                                            <div class="advantage-icon">
                                                <i class="fas fa-dollar-sign"></i>
                                            </div>
                                            <h4>Total Cost of Ownership</h4>
                                        </div>
                                        <p>Predictable subscription model eliminates hidden costs and expensive hardware.</p>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Portnox</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 92%;"></div>
                                            </div>
                                            <div class="bar-value">92%</div>
                                        </div>
                                        <div class="comparison-bar">
                                            <div class="bar-label">Competitors</div>
                                            <div class="bar-track">
                                                <div class="bar-fill" style="width: 40%;"></div>
                                            </div>
                                            <div class="bar-value">40%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Vendor Strengths Comparison</h3>
                                <div class="table-responsive">
                                    <table class="data-table" id="vendor-strengths-table">
                                        <thead>
                                            <tr>
                                                <th>Capability</th>
                                                <th>Portnox</th>
                                                <th>Cisco ISE</th>
                                                <th>Aruba ClearPass</th>
                                                <th>Forescout</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cloud Architecture</td>
                                                <td class="highlight-cell">Native</td>
                                                <td>Partial</td>
                                                <td>Partial</td>
                                                <td>Limited</td>
                                            </tr>
                                            <tr>
                                                <td>Zero Trust</td>
                                                <td class="highlight-cell">Comprehensive</td>
                                                <td>Partial</td>
                                                <td>Limited</td>
                                                <td>Partial</td>
                                            </tr>
                                            <tr>
                                                <td>Deployment Speed</td>
                                                <td class="highlight-cell">Days</td>
                                                <td>Months</td>
                                                <td>Weeks</td>
                                                <td>Weeks</td>
                                            </tr>
                                            <tr>
                                                <td>FTE Requirements</td>
                                                <td class="highlight-cell">Minimal</td>
                                                <td>High</td>
                                                <td>Moderate</td>
                                                <td>Moderate</td>
                                            </tr>
                                            <tr>
                                                <td>Remote Access</td>
                                                <td class="highlight-cell">Built-in</td>
                                                <td>Add-on</td>
                                                <td>Limited</td>
                                                <td>Limited</td>
                                            </tr>
                                            <tr>
                                                <td>Hardware Footprint</td>
                                                <td class="highlight-cell">None</td>
                                                <td>Large</td>
                                                <td>Medium</td>
                                                <td>Medium</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Financial View -->
                    <div class="view-panel" data-view="financial">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="financial-overview">Financial Overview</button>
                            <button class="results-tab" data-panel="financial-tco">TCO Breakdown</button>
                            <button class="results-tab" data-panel="financial-roi">ROI Analysis</button>
                            <button class="results-tab" data-panel="financial-projections">Cost Projections</button>
                            <button class="results-tab" data-panel="financial-sensitivity">Sensitivity Analysis</button>
                        </div>
                        
                        <!-- Financial content panels here -->
                        <div id="financial-overview" class="results-panel active">
                            <div class="panel-header">
                                <h2>Financial Overview</h2>
                                <p class="subtitle">Comprehensive cost and value analysis</p>
                            </div>
                            
                            <!-- Financial overview content here -->
                            <div class="dashboard-grid grid-4">
                                <div class="dashboard-card highlight-card">
                                    <h3>Total 3-Year TCO</h3>
                                    <div class="metric-value highlight-value" id="portnox-tco">$202,500</div>
                                    <div class="metric-label" id="tco-comparison">vs. $450,000 (Cisco ISE)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Annual Subscription</h3>
                                    <div class="metric-value" id="annual-subscription">$51,000</div>
                                    <div class="metric-label">Fully managed service</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Implementation Cost</h3>
                                    <div class="metric-value" id="implementation-cost">$15,500</div>
                                    <div class="metric-label">One-time cost</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Operational Cost (Annual)</h3>
                                    <div class="metric-value" id="operational-cost">$25,000</div>
                                    <div class="metric-label">Staff and management</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Cost Structure Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="cost-structure-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>3-Year Cost Projection</h3>
                                <div class="chart-wrapper">
                                    <canvas id="cost-projection-chart"></canvas>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Financial Benefits Summary</h3>
                                <div class="benefits-table-container">
                                    <table class="data-table" id="financial-benefits-table">
                                        <thead>
                                            <tr>
                                                <th>Benefit Category</th>
                                                <th>Year 1</th>
                                                <th>Year 2</th>
                                                <th>Year 3</th>
                                                <th>3-Year Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hardware Cost Avoidance</td>
                                                <td>$85,000</td>
                                                <td>$5,000</td>
                                                <td>$15,000</td>
                                                <td class="highlight-value">$105,000</td>
                                            </tr>
                                            <tr>
                                                <td>Software License Savings</td>
                                                <td>$25,000</td>
                                                <td>$30,000</td>
                                                <td>$30,000</td>
                                                <td class="highlight-value">$85,000</td>
                                            </tr>
                                            <tr>
                                                <td>IT Staff Time Reduction</td>
                                                <td>$35,000</td>
                                                <td>$45,000</td>
                                                <td>$45,000</td>
                                                <td class="highlight-value">$125,000</td>
                                            </tr>
                                            <tr>
                                                <td>Maintenance Savings</td>
                                                <td>$15,000</td>
                                                <td>$20,000</td>
                                                <td>$20,000</td>
                                                <td class="highlight-value">$55,000</td>
                                            </tr>
                                            <tr>
                                                <td>Risk Reduction Value</td>
                                                <td>$25,000</td>
                                                <td>$30,000</td>
                                                <td>$30,000</td>
                                                <td class="highlight-value">$85,000</td>
                                            </tr>
                                            <tr>
                                                <td>Implementation Time Savings</td>
                                                <td>$35,000</td>
                                                <td>$0</td>
                                                <td>$0</td>
                                                <td class="highlight-value">$35,000</td>
                                            </tr>
                                            <tr class="total-row">
                                                <td>Total Financial Benefits</td>
                                                <td>$220,000</td>
                                                <td>$130,000</td>
                                                <td>$140,000</td>
                                                <td class="highlight-value">$490,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Add other financial panels like TCO Breakdown, ROI Analysis, etc. -->
                    </div>
                    
                    <!-- Security & Compliance View -->
                    <div class="view-panel" data-view="security">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="security-posture">Security Posture</button>
                            <button class="results-tab" data-panel="security-compliance">Compliance Coverage</button>
                            <button class="results-tab" data-panel="security-risk">Risk Assessment</button>
                            <button class="results-tab" data-panel="security-threat">Threat Protection</button>
                            <button class="results-tab" data-panel="security-comparison">Security Comparison</button>
                        </div>
                        
                        <!-- Security content panels here -->
                        <div id="security-posture" class="results-panel active">
                            <div class="panel-header">
                                <h2>Security Posture Analysis</h2>
                                <p class="subtitle">Comprehensive security evaluation</p>
                            </div>
                            
                            <!-- Security posture content here -->
                            <div class="dashboard-grid grid-4">
                                <div class="dashboard-card highlight-card">
                                    <h3>Zero Trust Readiness</h3>
                                    <div class="metric-value highlight-value">92%</div>
                                    <div class="metric-label">vs. 45% (Industry Average)</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Device Authentication</h3>
                                    <div class="metric-value">100%</div>
                                    <div class="metric-label">Complete device visibility</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Risk Assessment</h3>
                                    <div class="metric-value">Real-time</div>
                                    <div class="metric-label">Continuous monitoring</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Remediation Speed</h3>
                                    <div class="metric-value">4 min</div>
                                    <div class="metric-label">Average response time</div>
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>Security Capabilities Heat Map</h3>
                                <div class="heatmap-container" id="security-heatmap">
                                    <!-- Security heatmap will be rendered here -->
                                </div>
                            </div>
                            
                            <div class="chart-container">
                                <h3>NIST Cybersecurity Framework Alignment</h3>
                                <div class="chart-wrapper">
                                    <canvas id="nist-framework-chart"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Add other security panels like Compliance Coverage, Risk Assessment, etc. -->
                    </div>
                    
                    <!-- Technical View -->
                    <div class="view-panel" data-view="technical">
                        <!-- View-specific Tabs -->
                        <div class="results-tabs">
                            <button class="results-tab active" data-panel="technical-overview">Technical Overview</button>
                            <button class="results-tab" data-panel="technical-features">Feature Comparison</button>
                            <button class="results-tab" data-panel="technical-architecture">Architecture</button>
                            <button class="results-tab" data-panel="technical-implementation">Implementation</button>
                            <button class="results-tab" data-panel="technical-integrations">Integrations</button>
                        </div>
                        
                        <!-- Technical content panels here -->
                        <div id="technical-overview" class="results-panel active">
                            <div class="panel-header">
                                <h2>Technical Overview</h2>
                                <p class="subtitle">Technical capabilities and architecture assessment</p>
                            </div>
                            
                            <!-- Technical overview content here -->
                            <div class="dashboard-grid grid-4">
                                <div class="dashboard-card highlight-card">
                                    <h3>Architecture</h3>
                                    <div class="metric-value highlight-value">Cloud-Native</div>
                                    <div class="metric-label">No on-premises hardware</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Deployment Model</h3>
                                    <div class="metric-value">SaaS</div>
                                    <div class="metric-label">Fully managed service</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Integration Capability</h3>
                                    <div class="metric-value">300+</div>
                                    <div class="metric-label">Pre-built integrations</div>
                                </div>
                                
                                <div class="dashboard-card">
                                    <h3>Technical Debt</h3>
                                    <div class="metric-value">Minimal</div>
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
                                <h3>Feature Radar Comparison</h3>
                                <div class="chart-wrapper">
                                    <canvas id="feature-radar-chart"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Add other technical panels like Feature Comparison, Architecture, etc. -->
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
                <h3>Using the Total Cost Analyzer</h3>
                <p>This tool helps you compare the total cost of ownership (TCO) and return on investment (ROI) for different NAC solutions.</p>
                
                <div class="help-section">
                    <h4>1. Configure Your Analysis</h4>
                    <ul>
                        <li><strong>Select vendors</strong> to compare with Portnox Cloud</li>
                        <li><strong>Choose your industry</strong> and compliance requirements</li>
                        <li><strong>Enter your organization details</strong> such as size and device count</li>
                        <li><strong>Adjust cost parameters</strong> if needed</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>2. View Analysis Results</h4>
                    <ul>
                        <li><strong>Executive View:</strong> High-level overview for decision makers</li>
                        <li><strong>Financial View:</strong> Detailed cost breakdown and ROI analysis</li>
                        <li><strong>Security & Compliance View:</strong> Risk assessment and compliance coverage</li>
                        <li><strong>Technical View:</strong> Feature comparison and implementation details</li>
                    </ul>
                </div>
                
                <div class="help-section">
                    <h4>3. Export Your Results</h4>
                    <p>Use the Export button to generate a PDF report of your analysis for sharing with stakeholders.</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Calculating results...</p>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.2/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/portnox-tco-analyzer.js"></script>
    <script src="js/chart-initializer.js"></script>
    <script src="js/report-generator.js"></script>
</body>
</html>
EOF

# Update enhanced-ui.css with more vibrant colors and detailed styling
echo "Updating enhanced-ui.css with modern styling and animations..."
cat > css/enhanced-ui.css << 'EOF'
/**
 * Enhanced UI Components for Portnox Total Cost Analyzer
 * Premium styling with vibrant colors and modern design elements
 */

/* Base Variables */
:root {
  /* Primary Colors */
  --primary-color: #1565c0;
  --primary-light: #64b5f6;
  --primary-dark: #0d47a1;
  --primary-gradient: linear-gradient(135deg, #1976d2, #64b5f6);
  
  /* Secondary Colors */
  --secondary-color: #00c853;
  --secondary-light: #69f0ae;
  --secondary-dark: #00a046;
  --secondary-gradient: linear-gradient(135deg, #00c853, #69f0ae);
  
  /* Accent Colors */
  --accent-color: #ff6d00;
  --accent-light: #ffab40;
  --accent-dark: #c43e00;
  --accent-gradient: linear-gradient(135deg, #ff6d00, #ffab40);
  
  /* Warning and Error Colors */
  --warning-color: #ffab00;
  --warning-light: #ffd740;
  --warning-dark: #c67c00;
  --danger-color: #f44336;
  --danger-light: #ef9a9a;
  --danger-dark: #c62828;
  
  /* Neutral Colors */
  --neutral-dark: #263238;
  --neutral-medium: #546e7a;
  --neutral-light: #eceff1;
  --bg-color: #f8f9fa;
  --bg-light: #ffffff;
  --bg-dark: #e1e2e5;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.2);
  
  /* Animations */
  --transition-fast: 0.15s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
}

/* Base Styles */
html, body {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  color: var(--neutral-dark);
  background-color: var(--bg-color);
  line-height: 1.5;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body.dark-mode {
  --bg-color: #121212;
  --bg-light: #1e1e1e;
  --bg-dark: #0a0a0a;
  --neutral-light: #333333;
  --neutral-medium: #999999;
  --neutral-dark: #e0e0e0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* Header Styles */
.app-header {
  background-color: var(--bg-light);
  box-shadow: var(--shadow-md);
  padding: var(--space-md);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--neutral-light);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.company-logo {
  height: 40px;
}

.app-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.app-title .subtitle {
  font-size: 0.875rem;
  color: var(--neutral-medium);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

/* Stakeholder Tabs */
.stakeholder-tabs {
  display: flex;
  background-color: var(--bg-color);
  border-radius: var(--radius-md);
  border: 1px solid var(--neutral-light);
  overflow: hidden;
}

.stakeholder-tab {
  padding: var(--space-sm) var(--space-md);
  background: none;
  border: none;
  color: var(--neutral-medium);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  position: relative;
}

.stakeholder-tab i {
  font-size: 0.875rem;
}

.stakeholder-tab:hover {
  color: var(--primary-color);
  background-color: rgba(21, 101, 192, 0.05);
}

.stakeholder-tab.active {
  color: white;
  background: var(--primary-gradient);
}

.stakeholder-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-dark);
}

.mobile-tabs {
  display: none;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  border: 1px solid transparent;
  gap: var(--space-xs);
  box-shadow: var(--shadow-sm);
}

.btn i {
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
  border-color: var(--primary-dark);
}

.btn-primary:hover, .btn-primary:focus {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-secondary {
  background: var(--secondary-gradient);
  color: white;
  border-color: var(--secondary-dark);
}

.btn-secondary:hover, .btn-secondary:focus {
  background: linear-gradient(135deg, var(--secondary-dark), var(--secondary-color));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-outline {
  background-color: transparent;
  color: var(--neutral-medium);
  border-color: var(--neutral-light);
}

.btn-outline:hover, .btn-outline:focus {
  color: var(--primary-color);
  border-color: var(--primary-light);
  background-color: rgba(21, 101, 192, 0.05);
}

.btn-icon {
  padding: var(--space-sm);
  border-radius: 50%;
  width: 36px;
  height: 36px;
}

.btn-icon i {
  margin: 0;
}

.btn-large {
  padding: var(--space-md) var(--space-lg);
  font-size: 1rem;
  width: 100%;
}

/* Main Layout */
.main-content {
  display: flex;
  flex: 1;
  position: relative;
  background-color: var(--bg-color);
}

/* Sidebar */
.sidebar {
  width: 320px;
  background-color: var(--bg-light);
  border-right: 1px solid var(--neutral-light);
  box-shadow: var(--shadow-sm);
  z-index: 90;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-medium);
  height: calc(100vh - 72px);
  position: sticky;
  top: 72px;
  left: 0;
}

.sidebar.collapsed {
  transform: translateX(-320px);
}

.sidebar-header {
  padding: var(--space-md);
  border-bottom: 1px solid var(--neutral-light);
  background: linear-gradient(to right, var(--bg-light), var(--bg-color));
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sidebar-header h2 i {
  color: var(--primary-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
}

.sidebar-footer {
  padding: var(--space-md);
  border-top: 1px solid var(--neutral-light);
  background: linear-gradient(to right, var(--bg-light), var(--bg-color));
}

.sidebar-toggle {
  position: absolute;
  left: 320px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 40px;
  background-color: var(--bg-light);
  border: 1px solid var(--neutral-light);
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 80;
  transition: all var(--transition-medium);
  box-shadow: var(--shadow-sm);
}

.sidebar-toggle:hover {
  background-color: var(--primary-light);
  color: white;
}

.sidebar.collapsed + .content-area .sidebar-toggle {
  left: 0;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg);
  transition: margin-left var(--transition-medium);
}

/* Config Cards */
.config-card {
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-md);
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
  border: 1px solid var(--neutral-light);
}

.config-card:hover {
  box-shadow: var(--shadow-md);
}

.config-card-header {
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, var(--bg-light), var(--bg-color));
  cursor: pointer;
  border-bottom: 1px solid var(--neutral-light);
  transition: background-color var(--transition-fast);
}

.config-card-header:hover {
  background-color: var(--bg-color);
}

.config-card-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-dark);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.config-card-header h3 i {
  color: var(--primary-color);
  width: 20px;
  text-align: center;
}

.config-card-header i.fa-chevron-up,
.config-card-header i.fa-chevron-down {
  color: var(--neutral-medium);
  transition: transform var(--transition-fast);
}

.config-card-content {
  padding: var(--space-md);
  max-height: 1000px;
  overflow: hidden;
  transition: max-height var(--transition-medium), opacity var(--transition-medium), padding var(--transition-medium);
  opacity: 1;
}

.config-card-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  pointer-events: none;
}

/* Vendor Selection */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.vendor-card {
  border: 1px solid var(--neutral-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-medium), transform var(--transition-fast);
  background-color: var(--bg-light);
  position: relative;
}

.vendor-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.vendor-card.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
  background-color: rgba(21, 101, 192, 0.05);
}

.vendor-logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm);
  background-color: white;
  border-bottom: 1px solid var(--neutral-light);
}

.vendor-logo img {
  max-height: 40px;
  max-width: 80%;
  object-fit: contain;
}

.vendor-info {
  padding: var(--space-sm);
  text-align: center;
}

.vendor-info h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--neutral-dark);
}

.vendor-info p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--neutral-medium);
}

.vendor-badge {
  text-align: center;
  padding-bottom: var(--space-xs);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: var(--radius-sm);
}

.badge-primary {
  background-color: rgba(21, 101, 192, 0.1);
  color: var(--primary-color);
}

.badge-warning {
  background-color: rgba(255, 171, 0, 0.1);
  color: var(--warning-color);
}

.badge-danger {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--danger-color);
}

/* Form Elements */
.form-group {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--neutral-dark);
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.5;
  color: var(--neutral-dark);
  background-color: var(--bg-light);
  border: 1px solid var(--neutral-light);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-control:focus {
  border-color: var(--primary-light);
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
  outline: none;
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: var(--neutral-dark);
  background-color: var(--bg-light);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23546e7a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  border: 1px solid var(--neutral-light);
  border-radius: var(--radius-md);
  appearance: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-select:focus {
  border-color: var(--primary-light);
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
  outline: none;
}

/* Checkbox and Radio Groups */
.compliance-grid, .feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.compliance-item, .feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.form-check-input {
  width: 16px;
  height: 16px;
  margin: 0;
  vertical-align: middle;
  accent-color: var(--primary-color);
  cursor: pointer;
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-input + label {
  font-size: 0.875rem;
  cursor: pointer;
}

.helper-text {
  font-size: 0.75rem;
  color: var(--neutral-medium);
  margin-top: var(--space-xs);
}

/* Range Sliders */
.range-slider {
  margin-bottom: var(--space-lg);
}

.range-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.range-slider-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-dark);
}

.range-slider-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: var(--neutral-light);
  border-radius: 3px;
  outline: none;
  margin: var(--space-sm) 0;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--primary-gradient);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: var(--primary-gradient);
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  border: none;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: var(--shadow-md);
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: var(--shadow-md);
}

/* Results Panel Tabs */
.results-tabs {
  display: flex;
  margin-bottom: var(--space-md);
  background-color: var(--bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  border: 1px solid var(--neutral-light);
}

.results-tabs::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.results-tab {
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--neutral-medium);
  position: relative;
}

.results-tab:hover {
  color: var(--primary-color);
  background-color: rgba(21, 101, 192, 0.05);
}

.results-tab.active {
  color: var(--primary-color);
  background-color: rgba(21, 101, 192, 0.05);
}

.results-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
}

.results-panel {
  display: none;
}

.results-panel.active {
  display: block;
  animation: fadeIn var(--transition-medium);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.panel-header {
  margin-bottom: var(--space-lg);
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--neutral-dark);
  margin: 0 0 var(--space-xs) 0;
}

.panel-header .subtitle {
  font-size: 0.9375rem;
  color: var(--neutral-medium);
  margin: 0;
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.dashboard-grid.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.dashboard-grid.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.dashboard-card {
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--neutral-light);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.dashboard-card h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--neutral-medium);
  margin-top: 0;
  margin-bottom: var(--space-md);
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--neutral-dark);
}

.highlight-value {
  color: var(--primary-color);
}

.metric-label {
  font-size: 0.875rem;
  color: var(--neutral-medium);
  margin-bottom: var(--space-xs);
}

.metric-trend {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.metric-trend.up {
  color: var(--secondary-color);
}

.metric-trend.down {
  color: var(--danger-color);
}

.highlight-card {
  background: linear-gradient(145deg, #f0f7ff, #e6f2ff);
  border-color: var(--primary-light);
}

body.dark-mode .highlight-card {
  background: linear-gradient(145deg, #1a2835, #162232);
}

/* Charts */
.chart-container {
  background-color: var(--bg-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-medium);
  border: 1px solid var(--neutral-light);
  position: relative;
}

.chart-container:hover {
  box-shadow: var(--shadow-md);
}

.chart-container h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--neutral-dark);
  margin-top: 0;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--neutral-light);
}

.chart-wrapper {
  height: 360px;
  width: 100%;
  position: relative;
}

.chart-wrapper.half-height {
  height: 200px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

/* Benefits Grid */
.benefits-grid, .advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
}

.benefit-card, .advantage-card {
  background: linear-gradient(145deg, var(--bg-light), var(--bg-color));
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border: 1px solid var(--neutral-light);
  transition: all var(--transition-medium);
}

.benefit-card:hover, .advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.benefit-icon, .advantage-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-sm);
  color: white;
  box-shadow: var(--shadow-sm);
}

.benefit-card h4, .advantage-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-dark);
  margin: 0 0 var(--space-xs) 0;
}

.benefit-card p, .advantage-card p {
  font-size: 0.875rem;
  color: var(--neutral-medium);
  margin: 0 0 var(--space-sm) 0;
}

.advantage-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

/* Comparison Bars */
.comparison-bar {
  margin-bottom: var(--space-sm);
}

.bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: var(--space-xs);
}

.bar-track {
  height: 8px;
  background-color: var(--neutral-light);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: width 1s ease-out;
}

.comparison-bar:nth-child(even) .bar-fill {
  background: var(--secondary-gradient);
}

.bar-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-left: var(--space-xs);
}

/* Tables */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  padding: var(--space-sm) var(--space-md);
  font-weight: 600;
  border: none;
}

.data-table th:first-child {
  border-top-left-radius: var(--radius-sm);
}

.data-table th:last-child {
  border-top-right-radius: var(--radius-sm);
}

.data-table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--neutral-light);
  transition: background-color var(--transition-fast);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:last-child td:first-child {
  border-bottom-left-radius: var(--radius-sm);
}

.data-table tr:last-child td:last-child {
  border-bottom-right-radius: var(--radius-sm);
}

.data-table tr:hover td {
  background-color: rgba(21, 101, 192, 0.05);
}

.data-table .highlight-cell {
  color: var(--primary-color);
  font-weight: 600;
}

.data-table .total-row {
  font-weight: 700;
  background-color: var(--bg-color);
}

.data-table .total-row td {
  border-top: 2px solid var(--neutral-light);
}

/* Heat Maps */
.heatmap-container {
  height: 300px;
  width: 100%;
  position: relative;
}

/* Insight Boxes */
.insight-box {
  background: linear-gradient(145deg, #fff8e1, #fffde7);
  border-left: 4px solid var(--warning-color);
  padding: var(--space-md);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-top: var(--space-md);
}

body.dark-mode .insight-box {
  background: linear-gradient(145deg, #332c0c, #2d260b);
}

.insight-box h4 {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0 0 var(--space-xs) 0;
  font-size: 1rem;
  color: var(--warning-dark);
}

.insight-box p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--neutral-dark);
}

/* Footer */
.app-footer {
  background-color: var(--bg-light);
  border-top: 1px solid var(--neutral-light);
  padding: var(--space-md);
  margin-top: var(--space-lg);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--neutral-medium);
}

.footer-links {
  display: flex;
  gap: var(--space-md);
}

.footer-links a {
  font-size: 0.875rem;
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.footer-social {
  display: flex;
  gap: var(--space-sm);
}

.social-link {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutral-medium);
  background-color: var(--bg-color);
  transition: all var(--transition-fast);
}

.social-link:hover {
  color: white;
  background-color: var(--primary-color);
  transform: translateY(-2px);
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
  background-color: rgba(10, 20, 30, 0.7);
  animation: fadeIn var(--transition-medium);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--bg-light);
  margin: 5% auto;
  width: 90%;
  max-width: 800px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  animation: slideInUp var(--transition-medium);
  overflow: hidden;
}

@keyframes slideInUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  padding: var(--space-md) var(--space-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: white;
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.modal-close:hover {
  transform: scale(1.2);
}

.modal-body {
  padding: var(--space-lg);
  max-height: 70vh;
  overflow-y: auto;
}

.help-section {
  margin-bottom: var(--space-lg);
}

.help-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 var(--space-md) 0;
  padding-left: var(--space-md);
  position: relative;
}

.help-section h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

.help-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--neutral-dark);
  margin: var(--space-md) 0 var(--space-sm) 0;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 20, 30, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-medium), visibility var(--transition-medium);
  backdrop-filter: blur(5px);
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto var(--space-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-spinner p {
  color: white;
  font-size: 1.125rem;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  max-width: 350px;
}

.toast {
  background-color: var(--bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-md);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  opacity: 0;
  transform: translateX(100%);
  transition: all var(--transition-medium);
  position: relative;
}

.toast::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
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
  padding: var(--space-md);
  font-size: 1.25rem;
}

.toast-content {
  padding: var(--space-md);
  padding-left: 0;
  flex: 1;
  font-size: 0.875rem;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.125rem;
  padding: var(--space-sm);
  color: var(--neutral-medium);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.toast-close:hover {
  color: var(--neutral-dark);
}

.toast-info::before {
  background-color: var(--primary-color);
}

.toast-info .toast-icon {
  color: var(--primary-color);
}

.toast-success::before {
  background-color: var(--secondary-color);
}

.toast-success .toast-icon {
  color: var(--secondary-color);
}

.toast-warning::before {
  background-color: var(--warning-color);
}

.toast-warning .toast-icon {
  color: var(--warning-color);
}

.toast-error::before {
  background-color: var(--danger-color);
}

.toast-error .toast-icon {
  color: var(--danger-color);
}

/* Animation Classes */
.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-wrapper {
    height: 300px;
  }
}

@media (max-width: 992px) {
  .vendor-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .benefits-grid, .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-wrapper {
    height: 260px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
    margin-top: var(--space-sm);
  }
  
  .stakeholder-tabs {
    width: 100%;
    overflow-x: auto;
  }
  
  .stakeholder-tab span {
    display: none;
  }
  
  .stakeholder-tab i {
    margin: 0;
    font-size: 1.125rem;
  }
  
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    transform: none;
    max-height: 50vh;
    overflow-y: auto;
    position: relative;
    top: 0;
    height: auto;
  }
  
  .sidebar.collapsed {
    transform: translateY(-100%);
    max-height: 0;
  }
  
  .sidebar-toggle {
    top: auto;
    bottom: -40px;
    left: 50% !important;
    transform: translateX(-50%);
    width: 40px;
    height: 24px;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    border: 1px solid var(--neutral-light);
    border-top: none;
  }
  
  .sidebar-toggle i {
    transform: rotate(90deg);
  }
  
  .sidebar.collapsed + .content-area .sidebar-toggle i {
    transform: rotate(270deg);
  }
  
  .content-area {
    margin-left: 0 !important;
    padding: var(--space-md);
  }
  
  .mobile-tabs {
    display: flex;
    margin-bottom: var(--space-md);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid, .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-md);
  }
}

@media (max-width: 576px) {
  .vendor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .compliance-grid, .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .results-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  .results-tab {
    padding: var(--space-xs) var(--space-sm);
    white-space: nowrap;
  }
  
  .chart-wrapper {
    height: 220px;
  }
  
  .chart-container {
    padding: var(--space-md);
  }
}

/* Dark Mode Adjustments */
body.dark-mode .chart-container,
body.dark-mode .dashboard-card,
body.dark-mode .config-card,
body.dark-mode .sidebar,
body.dark-mode .results-tabs,
body.dark-mode .app-header,
body.dark-mode .app-footer,
body.dark-mode .modal-content {
  background-color: var(--bg-light);
  border-color: var(--neutral-light);
}

body.dark-mode .form-control,
body.dark-mode .form-select {
  background-color: var(--bg-dark);
  border-color: var(--neutral-medium);
  color: var(--neutral-dark);
}

body.dark-mode .vendor-logo {
  background-color: var(--bg-dark);
}

body.dark-mode .toast {
  background-color: var(--bg-light);
}

body.dark-mode .vendor-card.selected {
  background-color: rgba(100, 181, 246, 0.1);
}

body.dark-mode {
  color-scheme: dark;
}
EOF

# Create particle background CSS
echo "Creating particle background CSS..."
cat > css/particle-background.css << 'EOF'
/* Particle Background Styles */
#particles-js {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(135deg, #f8f9fc 0%, #edf2f7 100%);
}

body.dark-mode #particles-js {
  background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
}

/* Ensure content appears above particles */
.app-container {
  position: relative;
  z-index: 1;
}
EOF

# Create main.css if it doesn't exist (this is a basic fallback)
echo "Creating main.css file..."
cat > css/main.css << 'EOF'
/* 
 * Main CSS for Portnox Total Cost Analyzer
 * Basic styles to ensure functionality if enhanced-ui.css fails
 */

html, body {
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
  color: #172B4D;
  background-color: #f4f5f7;
}

* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Basic header styles */
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
}

/* Basic sidebar styles */
.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 320px;
  background-color: #ffffff;
  border-right: 1px solid #E0E0E0;
  flex-shrink: 0;
}

.content-area {
  flex: 1;
  padding: 1rem;
}

/* Basic button styles */
button {
  cursor: pointer;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border-color: #E0E0E0;
  color: #5E6C84;
}

/* Basic form styles */
.form-control, .form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

/* Utility classes */
.hidden {
  display: none;
}

.text-center {
  text-align: center;
}

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 2rem; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 2rem; }
EOF

# Update the JavaScript file with improved functionality
echo "Creating enhanced JavaScript functionality..."
cat > js/portnox-tco-analyzer.js << 'EOF'
/**
 * Portnox Total Cost Analyzer
 * Main JavaScript file to handle all functionality
 */

// Main application state
const AppState = {
  // Selected vendors for comparison
  selectedVendors: ['portnox'],
  
  // Current view (executive, financial, security, technical)
  currentView: 'executive',
  
  // Calculated results cache
  calculatedResults: null,
  
  // Dark mode state
  darkMode: false,
  
  // Sidebar collapsed state
  sidebarCollapsed: false,
  
  // Default parameters
  params: {
    deviceCount: 500,
    locations: 2,
    yearsToProject: 3,
    portnoxBasePrice: 3,
    portnoxDiscount: 15,
    fteCost: 100000,
    fteAllocation: 25,
    maintenancePercentage: 18,
    downtimeCost: 5000,
    riskReduction: 35,
    insuranceReduction: 10,
    industry: '',
    organization: 'small',
    riskProfile: 'standard',
    insurance: 'standard',
    complianceRequirements: []
  }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize application
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Initialize UI components
  initDarkModeToggle();
  initParticleBackground();
  initSidebar();
  initVendorSelection();
  initStakeholderViews();
  initResultsTabs();
  initializeRangeSliders();
  initTooltips();
  initModalHandlers();
  
  // Initialize functionality
  initCalculateButtons();
  
  // Check for URL parameters and apply them
  applyUrlParameters();
  
  // Show welcome toast
  showToast('Welcome to the Portnox Total Cost Analyzer. Customize your parameters and calculate your savings.', 'info');
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (darkModeToggle) {
    // Check for saved preference
    const savedDarkMode = localStorage.getItem('portnoxDarkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
      AppState.darkMode = true;
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add event listener
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      AppState.darkMode = !AppState.darkMode;
      
      // Update button icon
      if (AppState.darkMode) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
      
      // Save preference
      localStorage.setItem('portnoxDarkMode', AppState.darkMode);
      
      // Refresh charts if they exist
      refreshCharts();
    });
  }
}

/**
 * Initialize particle background
 */
function initParticleBackground() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#1565c0"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#1565c0",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  } else {
    console.warn("particles.js not loaded. Background will not be animated.");
  }
}

/**
 * Initialize sidebar functionality
 */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  if (sidebar && sidebarToggle && contentArea) {
    // Check for saved preference
    const savedCollapsed = localStorage.getItem('portnoxSidebarCollapsed');
    if (savedCollapsed === 'true') {
      sidebar.classList.add('collapsed');
      AppState.sidebarCollapsed = true;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        contentArea.style.marginLeft = '0';
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-left');
        icon.classList.toggle('fa-chevron-right');
      }
      
      // Save preference
      localStorage.setItem('portnoxSidebarCollapsed', AppState.sidebarCollapsed);
      
      // Force chart resize
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    });
    
    // Toggle config card sections
    const configCards = document.querySelectorAll('.config-card');
    configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      
      if (header && content) {
        header.addEventListener('click', function(e) {
          // Only toggle if clicking on the header itself or its direct children
          if (e.target === header || e.target === header.querySelector('h3') || e.target === header.querySelector('i') || e.target.closest('.config-card-header')) {
            content.classList.toggle('collapsed');
            
            // Update icon
            const icon = header.querySelector('i.fa-chevron-up, i.fa-chevron-down');
            if (icon) {
              icon.classList.toggle('fa-chevron-up');
              icon.classList.toggle('fa-chevron-down');
            }
          }
        });
      }
    });
  }
}

/**
 * Initialize vendor selection
 */
function initVendorSelection() {
  const vendorCards = document.querySelectorAll('.vendor-card');
  
  vendorCards.forEach(card => {
    card.addEventListener('click', function() {
      const vendor = this.getAttribute('data-vendor');
      
      // Portnox is always selected
      if (vendor === 'portnox') {
        return;
      }
      
      // Toggle selection state
      this.classList.toggle('selected');
      
      // Update AppState
      if (this.classList.contains('selected')) {
        if (!AppState.selectedVendors.includes(vendor)) {
          AppState.selectedVendors.push(vendor);
        }
      } else {
        const index = AppState.selectedVendors.indexOf(vendor);
        if (index !== -1) {
          AppState.selectedVendors.splice(index, 1);
        }
      }
      
      // Make sure at least one other vendor is selected besides Portnox
      const selectedVendors = document.querySelectorAll('.vendor-card.selected');
      if (selectedVendors.length < 2) {
        this.classList.add('selected');
        if (!AppState.selectedVendors.includes(vendor)) {
          AppState.selectedVendors.push(vendor);
        }
      }
      
      // Log selected vendors for debugging
      console.log('Selected vendors:', AppState.selectedVendors);
      
      // If results are already calculated, update them
      if (AppState.calculatedResults) {
        updateCalculatedResults();
      }
    });
  });
}

/**
 * Initialize stakeholder view tabs
 */
function initStakeholderViews() {
  const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
  const viewPanels = document.querySelectorAll('.view-panel');
  
  stakeholderTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      AppState.currentView = view;
      
      // Update tab active states
      stakeholderTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`.stakeholder-tab[data-view="${view}"]`).forEach(t => t.classList.add('active'));
      
      // Update panel visibility
      viewPanels.forEach(panel => {
        if (panel.getAttribute('data-view') === view) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
      
      // Force chart resize
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    });
  });
}

/**
 * Initialize results tabs within views
 */
function initResultsTabs() {
  const resultsTabs = document.querySelectorAll('.results-tab');
  
  resultsTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const panel = this.getAttribute('data-panel');
      const viewPanel = this.closest('.view-panel');
      
      // Update tab states
      const siblings = Array.from(this.parentNode.children);
      siblings.forEach(sibling => sibling.classList.remove('active'));
      this.classList.add('active');
      
      // Update panel visibility
      const resultsPanels = viewPanel.querySelectorAll('.results-panel');
      resultsPanels.forEach(resultsPanel => {
        if (resultsPanel.id === panel) {
          resultsPanel.classList.add('active');
        } else {
          resultsPanel.classList.remove('active');
        }
      });
      
      // Force chart resize
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    });
  });
}

/**
 * Initialize range sliders
 */
function initializeRangeSliders() {
  const rangeSliders = document.querySelectorAll('input[type="range"]');
  
  rangeSliders.forEach(slider => {
    const valueId = slider.id + '-value';
    const valueDisplay = document.getElementById(valueId);
    
    if (valueDisplay) {
      // Update value display initially
      updateSliderValueDisplay(slider, valueDisplay);
      
      // Update value display when slider changes
      slider.addEventListener('input', function() {
        updateSliderValueDisplay(this, valueDisplay);
        
        // Update app state
        const paramName = getParamNameFromSliderId(this.id);
        if (paramName) {
          AppState.params[paramName] = parseFloat(this.value);
        }
      });
    }
  });
  
  // Also initialize number inputs
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach(input => {
    input.addEventListener('change', function() {
      const paramName = getParamNameFromInputId(this.id);
      if (paramName) {
        AppState.params[paramName] = parseInt(this.value, 10);
      }
    });
    
    // Initialize app state with current values
    const paramName = getParamNameFromInputId(input.id);
    if (paramName) {
      AppState.params[paramName] = parseInt(input.value, 10);
    }
  });
  
  // Initialize select boxes
  const selectBoxes = document.querySelectorAll('select');
  selectBoxes.forEach(select => {
    select.addEventListener('change', function() {
      const paramName = getParamNameFromInputId(this.id);
      if (paramName) {
        AppState.params[paramName] = this.value;
      }
    });
    
    // Initialize app state with current values
    const paramName = getParamNameFromInputId(select.id);
    if (paramName && select.value) {
      AppState.params[paramName] = select.value;
    }
  });
  
  // Initialize checkboxes for compliance requirements
  const complianceCheckboxes = document.querySelectorAll('.compliance-item input[type="checkbox"]');
  complianceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const complianceType = this.id.replace('compliance-', '');
      
      if (this.checked) {
        if (!AppState.params.complianceRequirements.includes(complianceType)) {
          AppState.params.complianceRequirements.push(complianceType);
        }
      } else {
        const index = AppState.params.complianceRequirements.indexOf(complianceType);
        if (index !== -1) {
          AppState.params.complianceRequirements.splice(index, 1);
        }
      }
    });
    
    // Initialize app state with current values
    if (checkbox.checked) {
      const complianceType = checkbox.id.replace('compliance-', '');
      if (!AppState.params.complianceRequirements.includes(complianceType)) {
        AppState.params.complianceRequirements.push(complianceType);
      }
    }
  });
}

/**
 * Update slider value display
 */
function updateSliderValueDisplay(slider, valueDisplay) {
  const value = slider.value;
  let formattedValue = value;
  
  // Format based on slider ID
  if (slider.id.includes('cost')) {
    formattedValue = 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + parseInt(value).toLocaleString();
  } else if (slider.id.includes('percentage') || slider.id.includes('discount') || slider.id.includes('allocation') || slider.id.includes('reduction')) {
    formattedValue = value + '%';
  } else if (slider.id === 'portnox-base-price') {
    formattedValue = 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + parseFloat(value).toFixed(2);
  } else if (slider.id.includes('days')) {
    formattedValue = value + ' days';
  }
  
  valueDisplay.textContent = formattedValue;
}

/**
 * Get parameter name from slider ID
 */
function getParamNameFromSliderId(sliderId) {
  switch(sliderId) {
    case 'portnox-base-price': return 'portnoxBasePrice';
    case 'portnox-discount': return 'portnoxDiscount';
    case 'fte-cost': return 'fteCost';
    case 'fte-allocation': return 'fteAllocation';
    case 'maintenance-percentage': return 'maintenancePercentage';
    case 'downtime-cost': return 'downtimeCost';
    case 'risk-reduction': return 'riskReduction';
    case 'insurance-reduction': return 'insuranceReduction';
    default: return null;
  }
}

/**
 * Get parameter name from input ID
 */
function getParamNameFromInputId(inputId) {
  switch(inputId) {
    case 'device-count': return 'deviceCount';
    case 'locations': return 'locations';
    case 'years-to-project': return 'yearsToProject';
    case 'industry-select': return 'industry';
    case 'organization-size': return 'organization';
    case 'risk-profile': return 'riskProfile';
    case 'cybersecurity-insurance': return 'insurance';
    default: return null;
  }
}

/**
 * Initialize tooltips
 */
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    // Show tooltip on hover
    element.addEventListener('mouseenter', function(e) {
      const tooltip = this.getAttribute('data-tooltip');
      showTooltip(tooltip, this);
    });
    
    // Hide tooltip on mouse leave
    element.addEventListener('mouseleave', function() {
      hideTooltip();
    });
  });
}

/**
 * Show tooltip
 */
function showTooltip(text, element) {
  let tooltipContainer = document.getElementById('tooltip-container');
  
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div');
    tooltipContainer.id = 'tooltip-container';
    tooltipContainer.className = 'tooltip-container';
    document.body.appendChild(tooltipContainer);
  }
  
  tooltipContainer.textContent = text;
  tooltipContainer.style.opacity = 1;
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltipContainer.getBoundingClientRect();
  
  // Default position above the element
  let top = rect.top - tooltipRect.height - 10;
  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  
  // Reposition if out of bounds
  if (top < 10) {
    // If not enough space above, place below
    top = rect.bottom + 10;
  }
  
  // Adjust horizontal position if needed
  if (left < 10) {
    left = 10;
  } else if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }
  
  tooltipContainer.style.top = `${top}px`;
  tooltipContainer.style.left = `${left}px`;
}

/**
 * Hide tooltip
 */
function hideTooltip() {
  const tooltipContainer = document.getElementById('tooltip-container');
  if (tooltipContainer) {
    tooltipContainer.style.opacity = 0;
  }
}

/**
 * Initialize calculate buttons
 */
function initCalculateButtons() {
  const calculateBtn = document.getElementById('calculate-btn');
  const calculateBtnHeader = document.getElementById('calculate-btn-header');
  
  const calculateHandler = function() {
    // Show loading overlay
    showLoading('Calculating TCO and ROI analysis...');
    
    // Gather inputs from form
    gatherInputs();
    
    // Simulate calculation delay
    setTimeout(function() {
      // Calculate results
      calculateResults();
      
      // Update UI with calculated results
      updateCalculatedResults();
      
      // Hide loading overlay
      hideLoading();
      
      // Show success message
      showToast('Analysis completed successfully!', 'success');
      
      // Animate metrics
      animateMetrics();
      
      // Refresh charts
      refreshCharts();
    }, 1500);
  };
  
  // Add event listeners to both buttons
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateHandler);
  }
  
  if (calculateBtnHeader) {
    calculateBtnHeader.addEventListener('click', calculateHandler);
  }
}

/**
 * Gather inputs from form
 */
function gatherInputs() {
  // Get values from number inputs
  AppState.params.deviceCount = parseInt(document.getElementById('device-count').value, 10) || 500;
  AppState.params.locations = parseInt(document.getElementById('locations').value, 10) || 2;
  
  // Get values from selects
  AppState.params.yearsToProject = parseInt(document.getElementById('years-to-project').value, 10) || 3;
  AppState.params.industry = document.getElementById('industry-select').value;
  AppState.params.organization = document.getElementById('organization-size').value;
  AppState.params.riskProfile = document.getElementById('risk-profile').value;
  AppState.params.insurance = document.getElementById('cybersecurity-insurance').value;
  
  // Get values from sliders
  AppState.params.portnoxBasePrice = parseFloat(document.getElementById('portnox-base-price').value) || 3;
  AppState.params.portnoxDiscount = parseInt(document.getElementById('portnox-discount').value, 10) || 15;
  AppState.params.fteCost = parseInt(document.getElementById('fte-cost').value, 10) || 100000;
  AppState.params.fteAllocation = parseInt(document.getElementById('fte-allocation').value, 10) || 25;
  AppState.params.maintenancePercentage = parseInt(document.getElementById('maintenance-percentage').value, 10) || 18;
  AppState.params.downtimeCost = parseInt(document.getElementById('downtime-cost').value, 10) || 5000;
  AppState.params.riskReduction = parseInt(document.getElementById('risk-reduction').value, 10) || 35;
  AppState.params.insuranceReduction = parseInt(document.getElementById('insurance-reduction').value, 10) || 10;
  
  // Get compliance requirements
  AppState.params.complianceRequirements = [];
  document.querySelectorAll('.compliance-item input[type="checkbox"]:checked').forEach(checkbox => {
    const complianceType = checkbox.id.replace('compliance-', '');
    AppState.params.complianceRequirements.push(complianceType);
  });
  
  // Get network requirements
  AppState.params.networkRequirements = [];
  document.querySelectorAll('.feature-item input[type="checkbox"]:checked').forEach(checkbox => {
    const requirementType = checkbox.id;
    AppState.params.networkRequirements.push(requirementType);
  });
  
  console.log('Gathered inputs:', AppState.params);
}

/**
 * Calculate results based on inputs
 */
function calculateResults() {
  const p = AppState.params;
  const results = {};
  
  // Calculate Portnox costs
  results.portnox = calculatePortnoxCosts(p);
  
  // Calculate costs for selected vendors
  results.vendors = {};
  AppState.selectedVendors.forEach(vendor => {
    if (vendor !== 'portnox') {
      results.vendors[vendor] = calculateVendorCosts(vendor, p);
    }
  });
  
  // Calculate savings vs competitors
  results.savings = {};
  for (const vendor in results.vendors) {
    results.savings[vendor] = results.vendors[vendor].totalCost - results.portnox.totalCost;
  }
  
  // Calculate average savings
  let totalSavings = 0;
  let vendorCount = 0;
  for (const vendor in results.savings) {
    totalSavings += results.savings[vendor];
    vendorCount++;
  }
  results.averageSavings = vendorCount > 0 ? totalSavings / vendorCount : 0;
  
  // Calculate ROI
  results.roi = calculateROI(results.portnox, p);
  
  // Calculate risk metrics
  results.risk = calculateRiskMetrics(p);
  
  // Store calculated results
  AppState.calculatedResults = results;
  
  console.log('Calculated results:', results);
  return results;
}

/**
 * Calculate Portnox costs
 */
function calculatePortnoxCosts(params) {
  const result = {
    subscription: {},
    implementation: {},
    operational: {},
    total: {}
  };
  
  // Calculate monthly per-device cost with discount
  const discountedPrice = params.portnoxBasePrice * (1 - params.portnoxDiscount / 100);
  
  // Calculate annual subscription cost
  const annualSubscription = params.deviceCount * discountedPrice * 12;
  
  // Calculate implementation cost (one-time)
  let implementationCost = 0;
  if (params.deviceCount < 1000) {
    implementationCost = 15000 + (params.deviceCount * 1);
  } else if (params.deviceCount < 5000) {
    implementationCost = 20000 + (params.deviceCount * 0.75);
  } else {
    implementationCost = 25000 + (params.deviceCount * 0.5);
  }
  
  // Adjust for multiple locations
  implementationCost += (params.locations - 1) * 2500;
  
  // Calculate operational costs (staff time)
  const operationalCost = (params.fteCost * (params.fteAllocation / 100)) / 4; // 1/4 of typical on-prem
  
  // Calculate total costs for each year
  result.subscription.year1 = annualSubscription;
  result.subscription.year2 = annualSubscription;
  result.subscription.year3 = annualSubscription;
  result.subscription.year4 = annualSubscription;
  result.subscription.year5 = annualSubscription;
  
  result.implementation.year1 = implementationCost;
  result.implementation.year2 = 0;
  result.implementation.year3 = 0;
  result.implementation.year4 = 0;
  result.implementation.year5 = 0;
  
  result.operational.year1 = operationalCost;
  result.operational.year2 = operationalCost;
  result.operational.year3 = operationalCost;
  result.operational.year4 = operationalCost;
  result.operational.year5 = operationalCost;
  
  // Calculate yearly totals
  result.total.year1 = result.subscription.year1 + result.implementation.year1 + result.operational.year1;
  result.total.year2 = result.subscription.year2 + result.implementation.year2 + result.operational.year2;
  result.total.year3 = result.subscription.year3 + result.implementation.year3 + result.operational.year3;
  result.total.year4 = result.subscription.year4 + result.implementation.year4 + result.operational.year4;
  result.total.year5 = result.subscription.year5 + result.implementation.year5 + result.operational.year5;
  
  // Calculate multi-year totals
  result.totalCost = 0;
  for (let i = 1; i <= params.yearsToProject; i++) {
    result.totalCost += result.total[`year${i}`];
  }
  
  return result;
}

/**
 * Calculate costs for other vendors
 */
function calculateVendorCosts(vendor, params) {
  const result = {
    hardware: {},
    software: {},
    implementation: {},
    maintenance: {},
    operational: {},
    total: {}
  };
  
  // Default multipliers for different vendors
  const multipliers = {
    'cisco': { hw: 1.0, sw: 1.0, impl: 1.0, maint: 1.0, op: 1.0 },
    'aruba': { hw: 0.9, sw: 0.95, impl: 0.9, maint: 0.95, op: 0.9 },
    'forescout': { hw: 0.85, sw: 1.1, impl: 0.9, maint: 1.0, op: 0.9 },
    'fortinac': { hw: 0.8, sw: 0.9, impl: 0.85, maint: 0.9, op: 0.85 },
    'juniper': { hw: 0.85, sw: 0.95, impl: 0.9, maint: 0.95, op: 0.9 },
    'securew2': { hw: 0.5, sw: 0.8, impl: 0.7, maint: 0.8, op: 0.7 },
    'microsoft': { hw: 0.6, sw: 0.5, impl: 0.8, maint: 0.6, op: 1.1 },
    'arista': { hw: 0.9, sw: 0.9, impl: 0.9, maint: 0.9, op: 0.9 },
    'foxpass': { hw: 0.5, sw: 0.7, impl: 0.7, maint: 0.7, op: 0.7 },
    'no-nac': { hw: 0, sw: 0, impl: 0, maint: 0, op: 0 }
  };
  
  // Use default multiplier if vendor not found
  const mult = multipliers[vendor] || { hw: 1.0, sw: 1.0, impl: 1.0, maint: 1.0, op: 1.0 };
  
  // Base hardware costs based on device count
  let baseHardware = 0;
  if (params.deviceCount < 1000) {
    baseHardware = 100000;
  } else if (params.deviceCount < 5000) {
    baseHardware = 200000;
  } else if (params.deviceCount < 10000) {
    baseHardware = 350000;
  } else {
    baseHardware = 500000;
  }
  
  // Adjust for locations
  baseHardware += (params.locations - 1) * 50000;
  
  // Apply vendor multiplier
  const hardwareCost = baseHardware * mult.hw;
  
  // Software costs based on device count
  const perDeviceSoftware = 120; // Baseline per-device license
  const softwareCost = params.deviceCount * perDeviceSoftware * mult.sw;
  
  // Implementation costs
  let baseImplementation = 0;
  if (params.deviceCount < 1000) {
    baseImplementation = 50000;
  } else if (params.deviceCount < 5000) {
    baseImplementation = 100000;
  } else if (params.deviceCount < 10000) {
    baseImplementation = 200000;
  } else {
    baseImplementation = 350000;
  }
  
  // Adjust for locations and compliance
  baseImplementation += (params.locations - 1) * 25000;
  baseImplementation += params.complianceRequirements.length * 10000;
  
  // Apply vendor multiplier
  const implementationCost = baseImplementation * mult.impl;
  
  // Maintenance costs (annual)
  const maintenanceCost = (hardwareCost + softwareCost) * (params.maintenancePercentage / 100) * mult.maint;
  
  // Operational costs (annual)
  const operationalCost = (params.fteCost * (params.fteAllocation / 100)) * mult.op;
  
  // Special case for "no-nac" option
  if (vendor === 'no-nac') {
    // No upfront costs, but higher operational/risk costs
    result.hardware.year1 = 0;
    result.software.year1 = 0;
    result.implementation.year1 = 0;
    result.maintenance.year1 = 0;
    
    // Higher operational costs due to manual processes
    result.operational.year1 = params.fteCost * 0.2; // 20% of an FTE for manual processes
    
    // Risk costs will be calculated separately
  } else {
    // Calculate yearly costs
    result.hardware.year1 = hardwareCost;
    result.hardware.year2 = params.locations > 5 ? hardwareCost * 0.1 : 0; // Some hardware refresh for large deployments
    result.hardware.year3 = 0;
    result.hardware.year4 = params.locations > 2 ? hardwareCost * 0.2 : 0; // More hardware refresh in year 4
    result.hardware.year5 = 0;
    
    result.software.year1 = softwareCost;
    result.software.year2 = softwareCost;
    result.software.year3 = softwareCost;
    result.software.year4 = softwareCost;
    result.software.year5 = softwareCost;
    
    result.implementation.year1 = implementationCost;
    result.implementation.year2 = 0;
    result.implementation.year3 = 0;
    result.implementation.year4 = 0;
    result.implementation.year5 = 0;
    
    result.maintenance.year1 = maintenanceCost;
    result.maintenance.year2 = maintenanceCost;
    result.maintenance.year3 = maintenanceCost;
    result.maintenance.year4 = maintenanceCost;
    result.maintenance.year5 = maintenanceCost;
    
    result.operational.year1 = operationalCost;
    result.operational.year2 = operationalCost;
    result.operational.year3 = operationalCost;
    result.operational.year4 = operationalCost;
    result.operational.year5 = operationalCost;
  }
  
  // Calculate yearly totals
  for (let i = 1; i <= 5; i++) {
    result.total[`year${i}`] = (result.hardware[`year${i}`] || 0) +
                              (result.software[`year${i}`] || 0) +
                              (result.implementation[`year${i}`] || 0) +
                              (result.maintenance[`year${i}`] || 0) +
                              (result.operational[`year${i}`] || 0);
  }
  
  // Calculate multi-year totals
  result.totalCost = 0;
  for (let i = 1; i <= params.yearsToProject; i++) {
    result.totalCost += result.total[`year${i}`];
  }
  
  return result;
}

/**
 * Calculate ROI metrics
 */
function calculateROI(portnoxCosts, params) {
  const result = {};
  
  // Compare to primary competitor (Cisco) for ROI calculations
  const competitorCosts = calculateVendorCosts('cisco', params);
  
  // Calculate direct cost savings
  const costSavings = competitorCosts.totalCost - portnoxCosts.totalCost;
  
  // Calculate productivity benefits
  // Assume 15 minutes saved per month per device with Portnox
  const hourlyRate = params.fteCost / 2080; // 2080 working hours per year
  const hoursPerYear = (params.deviceCount * 15 * 12) / 60; // 15 min * 12 months converted to hours
  const productivitySavings = hoursPerYear * hourlyRate * params.yearsToProject;
  
  // Calculate compliance benefits
  // Assume 20% efficiency in compliance reporting with Portnox
  const complianceBenefit = params.complianceRequirements.length * 15000 * params.yearsToProject * 0.2;
  
  // Calculate risk reduction benefits
  // Assume reduction in breach probability and impact
  const annualBreachRisk = params.deviceCount * 100; // $100 per device per year risk
  const riskBenefit = annualBreachRisk * (params.riskReduction / 100) * params.yearsToProject;
  
  // Calculate insurance premium reduction
  const baseInsurancePremium = params.deviceCount * 20; // $20 per device per year
  const insuranceBenefit = baseInsurancePremium * (params.insuranceReduction / 100) * params.yearsToProject;
  
  // Total benefits
  const totalBenefits = costSavings + productivitySavings + complianceBenefit + riskBenefit + insuranceBenefit;
  
  // ROI calculation
  const roi = (totalBenefits / portnoxCosts.totalCost) * 100;
  
  // Payback period (in months)
  const monthlyBenefit = totalBenefits / (params.yearsToProject * 12);
  const paybackPeriod = portnoxCosts.implementation.year1 / monthlyBenefit;
  
  // Store results
  result.costSavings = costSavings;
  result.productivitySavings = productivitySavings;
  result.complianceBenefit = complianceBenefit;
  result.riskBenefit = riskBenefit;
  result.insuranceBenefit = insuranceBenefit;
  result.totalBenefits = totalBenefits;
  result.roi = roi;
  result.paybackPeriod = paybackPeriod;
  result.annualSavings = costSavings / params.yearsToProject;
  
  return result;
}

/**
 * Calculate risk metrics
 */
function calculateRiskMetrics(params) {
  const result = {};
  
  // Risk reduction percentage based on inputs and industry
  let baseRiskReduction = params.riskReduction;
  
  // Adjust for compliance requirements
  baseRiskReduction += params.complianceRequirements.length * 2;
  
  // Adjust for risk profile
  if (params.riskProfile === 'elevated') {
    baseRiskReduction += 5;
  } else if (params.riskProfile === 'high') {
    baseRiskReduction += 10;
  } else if (params.riskProfile === 'regulated') {
    baseRiskReduction += 15;
  }
  
  // Cap at 95%
  result.totalRiskReduction = Math.min(baseRiskReduction, 95);
  
  // Calculate security posture improvement
  result.securityImprovement = 60 + (params.riskReduction / 5);
  
  // Calculate compliance coverage
  result.complianceCoverage = 80 + (params.complianceRequirements.length * 2);
  if (result.complianceCoverage > 100) result.complianceCoverage = 100;
  
  // Calculate mean time to respond (in minutes)
  const baseResponseTime = 120; // 2 hours
  result.meanTimeToRespond = baseResponseTime - (baseRiskReduction / 2);
  if (result.meanTimeToRespond < 5) result.meanTimeToRespond = 5;
  
  return result;
}

/**
 * Update UI with calculated results
 */
function updateCalculatedResults() {
  if (!AppState.calculatedResults) return;
  
  const results = AppState.calculatedResults;
  
  // Update executive summary metrics
  updateMetric('total-savings', formatCurrency(results.averageSavings));
  
  // Pick the primary competitor (Cisco or the first one available)
  const primaryCompetitor = results.vendors.cisco ? 'cisco' : Object.keys(results.vendors)[0];
  const competitorName = getVendorDisplayName(primaryCompetitor);
  const savingsPercentage = Math.round((results.savings[primaryCompetitor] / results.vendors[primaryCompetitor].totalCost) * 100);
  
  updateMetric('savings-percentage', `${savingsPercentage}% reduction vs. ${competitorName}`);
  updateMetric('portnox-tco', formatCurrency(results.portnox.totalCost));
  updateMetric('tco-comparison', `vs. ${formatCurrency(results.vendors[primaryCompetitor].totalCost)} (${competitorName})`);
  
  // Implementation time comparison
  const portnoxImplementation = 21; // Fixed value for Portnox
  const competitorImplementation = 90; // Typical competitor implementation time
  const implementationSaving = Math.round((1 - (portnoxImplementation / competitorImplementation)) * 100);
  
  updateMetric('implementation-time', `${portnoxImplementation} days`);
  updateMetric('implementation-comparison', `${implementationSaving}% faster than on-premises`);
  
  // ROI metrics
  updateMetric('three-year-roi', `${Math.round(results.roi.roi)}%`);
  updateMetric('annual-savings', formatCurrency(results.roi.annualSavings));
  updateMetric('payback-period', `${Math.round(results.roi.paybackPeriod)} months`);
  updateMetric('productivity-value', formatCurrency(results.roi.productivitySavings));
  updateMetric('compliance-savings', formatCurrency(results.roi.complianceBenefit));
  
  // Risk metrics
  updateMetric('risk-reduction-total', `${Math.round(results.risk.totalRiskReduction)}%`);
  updateMetric('security-improvement', `${Math.round(results.risk.securityImprovement)}%`);
  updateMetric('compliance-coverage', `${Math.round(results.risk.complianceCoverage)}%`);
  updateMetric('mttr', `${Math.round(results.risk.meanTimeToRespond)} min`);
  updateMetric('breach-probability', results.risk.totalRiskReduction > 60 ? 'Low' : 'Medium');
  
  // Annual subscription cost
  updateMetric('annual-subscription', formatCurrency(results.portnox.subscription.year1));
  
  // Implementation cost
  updateMetric('implementation-cost', formatCurrency(results.portnox.implementation.year1));
  
  // Operational cost
  updateMetric('operational-cost', formatCurrency(results.portnox.operational.year1));
  
  // After updating metrics, refresh charts
  refreshCharts();
}

/**
 * Update a metric element with a new value
 */
function updateMetric(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

/**
 * Format currency values
 */
function formatCurrency(value) {
  return 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + Math.round(value).toLocaleString();
}

/**
 * Get vendor display name
 */
function getVendorDisplayName(vendorId) {
  switch(vendorId) {
    case 'cisco': return 'Cisco ISE';
    case 'aruba': return 'Aruba ClearPass';
    case 'forescout': return 'Forescout';
    case 'fortinac': return 'FortiNAC';
    case 'juniper': return 'Juniper Mist';
    case 'securew2': return 'SecureW2';
    case 'microsoft': return 'Microsoft NPS';
    case 'arista': return 'Arista Agni';
    case 'foxpass': return 'Foxpass';
    case 'no-nac': return 'No NAC';
    default: return vendorId;
  }
}

/**
 * Animate metrics to provide visual feedback
 */
function animateMetrics() {
  const metrics = document.querySelectorAll('.metric-value');
  
  metrics.forEach(metric => {
    // Reset any existing animation
    metric.style.animation = 'none';
    
    // Force reflow
    void metric.offsetWidth;
    
    // Add the animation
    metric.style.animation = 'fadeIn 0.8s ease-out forwards';
  });
}

/**
 * Refresh all charts
 */
function refreshCharts() {
  // If chart-initializer.js is loaded, use its refresh function
  if (window.initializeCharts) {
    window.initializeCharts();
  }
}

/**
 * Apply URL parameters
 */
function applyUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Apply device count
  const deviceCount = urlParams.get('devices');
  if (deviceCount) {
    const deviceCountInput = document.getElementById('device-count');
    if (deviceCountInput) {
      deviceCountInput.value = deviceCount;
      AppState.params.deviceCount = parseInt(deviceCount, 10);
    }
  }
  
  // Apply years
  const years = urlParams.get('years');
  if (years) {
    const yearsSelect = document.getElementById('years-to-project');
    if (yearsSelect) {
      yearsSelect.value = years;
      AppState.params.yearsToProject = parseInt(years, 10);
    }
  }
  
  // Apply industry
  const industry = urlParams.get('industry');
  if (industry) {
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect) {
      industrySelect.value = industry;
      AppState.params.industry = industry;
    }
  }
  
  // Check if auto-calculate is requested
  const autoCalculate = urlParams.get('calculate');
  if (autoCalculate === 'true') {
    // Wait for DOM fully rendered
    setTimeout(() => {
      const calculateBtn = document.getElementById('calculate-btn');
      if (calculateBtn) {
        calculateBtn.click();
      }
    }, 500);
  }
}

/**
 * Initialize modal handlers
 */
function initModalHandlers() {
  // Help Modal
  const helpBtn = document.getElementById('help-btn');
  const helpModal = document.getElementById('help-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', function() {
      helpModal.style.display = 'block';
    });
    
    // Close button
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
  }
}

/**
 * Show loading overlay
 */
function showLoading(message = 'Processing...') {
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingMessage = loadingOverlay?.querySelector('p');
  
  if (loadingOverlay) {
    if (loadingMessage) {
      loadingMessage.textContent = message;
    }
    loadingOverlay.classList.add('active');
  }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  if (loadingOverlay) {
    loadingOverlay.classList.remove('active');
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Get the appropriate icon for the toast type
  let icon = 'info-circle';
  switch(type) {
    case 'success': icon = 'check-circle'; break;
    case 'warning': icon = 'exclamation-triangle'; break;
    case 'error': icon = 'exclamation-circle'; break;
  }
  
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="toast-content">${message}</div>
    <button class="toast-close">&times;</button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Show with animation
  setTimeout(() => {
    toast.classList.add('toast-visible');
  }, 10);
  
  // Auto close after 5 seconds
  const timeout = setTimeout(() => {
    closeToast(toast);
  }, 5000);
  
  // Close button handler
  const closeButton = toast.querySelector('.toast-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      clearTimeout(timeout);
      closeToast(toast);
    });
  }
  
  return toast;
}

/**
 * Close a toast notification
 */
function closeToast(toast) {
  if (!toast) return;
  
  toast.classList.remove('toast-visible');
  toast.classList.add('toast-hidden');
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Expose key functions to the window for use by other scripts
window.AppState = AppState;
window.refreshCharts = refreshCharts;
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
EOF

# Create chart initialization JavaScript
echo "Creating chart initialization JavaScript..."
cat > js/chart-initializer.js << 'EOF'
/**
 * Chart Initialization for Portnox Total Cost Analyzer
 * This file handles all chart creation and updates
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts after a slight delay to ensure DOM is ready
  setTimeout(initializeCharts, 500);
});

/**
 * Initialize all charts
 */
function initializeCharts() {
  // Check if Chart.js is available
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js is not loaded. Charts cannot be initialized.');
    return;
  }
  
  // Register Chart.js plugins if available
  registerChartPlugins();
  
  // Set default chart options
  setDefaultChartOptions();

  // Initialize executive view charts
  initializeTcoComparisonChart();
  initializeCumulativeCostChart();
  initializeRoiChart();
  initializeValueDriversChart();
  initializeRiskComparisonChart();
  initializeBreachImpactChart();
  initializeInsuranceImpactChart();
  initializeVendorRadarChart();
  
  // Initialize financial view charts
  initializeCostStructureChart();
  initializeCostProjectionChart();
  
  // Initialize security view charts
  initializeNistFrameworkChart();
  initializeSecurityHeatmap();
  
  // Initialize technical view charts
  initializeArchitectureChart();
  initializeFeatureRadarChart();
  
  console.log('Charts initialized successfully');
}

/**
 * Register Chart.js plugins
 */
function registerChartPlugins() {
  if (Chart.register && Chart.DatasetController) {
    // Register plugins here if needed
    if (window.ChartDataLabels) {
      Chart.register(window.ChartDataLabels);
    }
  }
}

/**
 * Set default chart options
 */
function setDefaultChartOptions() {
  // Get color scheme based on dark mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  const colors = {
    text: isDarkMode ? '#e0e0e0' : '#172B4D',
    grid: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    background: isDarkMode ? '#1e1e1e' : '#ffffff'
  };
  
  // Set chart defaults
  Chart.defaults.font.family = "'Nunito', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = colors.text;
  Chart.defaults.borderColor = colors.grid;
  Chart.defaults.backgroundColor = colors.background;
  
  // Set responsive default
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
  
  // Set animation defaults
  Chart.defaults.animation.duration = 1000;
  Chart.defaults.animation.easing = 'easeOutQuart';
  
  // Set tooltip defaults
  Chart.defaults.plugins.tooltip.backgroundColor = isDarkMode ? '#333333' : '#ffffff';
  Chart.defaults.plugins.tooltip.titleColor = isDarkMode ? '#ffffff' : '#172B4D';
  Chart.defaults.plugins.tooltip.bodyColor = isDarkMode ? '#e0e0e0' : '#172B4D';
  Chart.defaults.plugins.tooltip.borderColor = isDarkMode ? '#555555' : '#e0e0e0';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold' };
  
  // Set legend defaults
  Chart.defaults.plugins.legend.position = 'bottom';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 15;
}

/**
 * Get current theme colors
 */
function getThemeColors() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  return {
    primary: '#1565c0',
    primaryLight: '#64b5f6',
    primaryDark: '#0d47a1',
    secondary: '#00c853',
    secondaryLight: '#69f0ae',
    secondaryDark: '#00a046',
    warning: '#ffab00',
    warningLight: '#ffd740',
    warningDark: '#c67c00',
    danger: '#f44336',
    dangerLight: '#ef9a9a',
    dangerDark: '#c62828',
    text: isDarkMode ? '#e0e0e0' : '#172B4D',
    background: isDarkMode ? '#1e1e1e' : '#ffffff',
    grid: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  };
}

/**
 * Get vendor colors for consistent chart rendering
 */
function getVendorColors() {
  const colors = {
    portnox: {
      solid: '#00c853',
      transparent: 'rgba(0, 200, 83, 0.2)',
      border: '#00a046'
    },
    cisco: {
      solid: '#1565c0',
      transparent: 'rgba(21, 101, 192, 0.2)',
      border: '#0d47a1'
    },
    aruba: {
      solid: '#f57c00',
      transparent: 'rgba(245, 124, 0, 0.2)',
      border: '#e65100'
    },
    forescout: {
      solid: '#9c27b0',
      transparent: 'rgba(156, 39, 176, 0.2)',
      border: '#7b1fa2'
    },
    fortinac: {
      solid: '#d32f2f',
      transparent: 'rgba(211, 47, 47, 0.2)',
      border: '#b71c1c'
    },
    juniper: {
      solid: '#0097a7',
      transparent: 'rgba(0, 151, 167, 0.2)',
      border: '#00838f'
    },
    securew2: {
      solid: '#388e3c',
      transparent: 'rgba(56, 142, 60, 0.2)',
      border: '#2e7d32'
    },
    microsoft: {
      solid: '#0078d4',
      transparent: 'rgba(0, 120, 212, 0.2)',
      border: '#106ebe'
    },
    arista: {
      solid: '#5c6bc0',
      transparent: 'rgba(92, 107, 192, 0.2)',
      border: '#3949ab'
    },
    foxpass: {
      solid: '#ff8f00',
      transparent: 'rgba(255, 143, 0, 0.2)',
      border: '#ef6c00'
    },
    'no-nac': {
      solid: '#757575',
      transparent: 'rgba(117, 117, 117, 0.2)',
      border: '#616161'
    }
  };
  
  return colors;
}

/**
 * Initialize TCO comparison chart
 */
function initializeTcoComparisonChart() {
  const chartElement = document.getElementById('tco-comparison-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  let labels = ['Year 1', 'Year 2', 'Year 3'];
  const datasets = [];
  
  // Extend labels if analysis period is longer
  if (window.AppState?.params?.yearsToProject > 3) {
    for (let i = 4; i <= window.AppState.params.yearsToProject; i++) {
      labels.push(`Year ${i}`);
    }
  }
  
  // Get vendor colors
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [];
    for (let i = 1; i <= labels.length; i++) {
      portnoxData.push(results.portnox.total[`year${i}`]);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      backgroundColor: vendorColors.portnox.solid,
      data: portnoxData
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      backgroundColor: vendorColors.portnox.solid,
      data: [80000, 75000, 75000]
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [];
      for (let i = 1; i <= labels.length; i++) {
        vendorData.push(results.vendors[vendor].total[`year${i}`]);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        backgroundColor: vendorColors[vendor]?.solid || '#999999',
        data: vendorData
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      backgroundColor: vendorColors.cisco.solid,
      data: [180000, 120000, 140000]
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cumulative cost chart
 */
function initializeCumulativeCostChart() {
  const chartElement = document.getElementById('cumulative-cost-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  const labels = ['Initial'];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  const datasets = [];
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [results.portnox.implementation.year1];
    let cumulativeCost = results.portnox.implementation.year1;
    
    for (let i = 1; i <= yearsToProject; i++) {
      cumulativeCost += results.portnox.subscription[`year${i}`] + results.portnox.operational[`year${i}`];
      portnoxData.push(cumulativeCost);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: portnoxData,
      fill: true,
      tension: 0.4
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: [30000, 110000, 185000, 260000],
      fill: true,
      tension: 0.4
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [results.vendors[vendor].implementation.year1];
      let cumulativeCost = results.vendors[vendor].implementation.year1;
      
      for (let i = 1; i <= yearsToProject; i++) {
        cumulativeCost += (results.vendors[vendor].hardware[`year${i}`] || 0) +
                         (results.vendors[vendor].software[`year${i}`] || 0) +
                         (results.vendors[vendor].maintenance[`year${i}`] || 0) +
                         (results.vendors[vendor].operational[`year${i}`] || 0);
        vendorData.push(cumulativeCost);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        borderColor: vendorColors[vendor]?.solid || '#999999',
        backgroundColor: vendorColors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderWidth: 2,
        data: vendorData,
        fill: true,
        tension: 0.4
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      borderColor: vendorColors.cisco.solid,
      backgroundColor: vendorColors.cisco.transparent,
      borderWidth: 2,
      data: [120000, 240000, 360000, 480000],
      fill: true,
      tension: 0.4
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cumulative Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize ROI chart
 */
function initializeRoiChart() {
  const chartElement = document.getElementById('roi-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  
  // Prepare data for the chart
  const labels = [];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  const colors = getThemeColors();
  
  // ROI data
  let investmentData = [];
  let returnData = [];
  let netBenefitData = [];
  
  if (results && results.roi) {
    // Initial investment is implementation cost + first quarter subscription
    const initialInvestment = results.portnox.implementation.year1 + (results.portnox.subscription.year1 / 4);
    
    // Annual subscription and operational costs
    const annualCosts = [];
    for (let i = 1; i <= yearsToProject; i++) {
      annualCosts.push(results.portnox.subscription[`year${i}`] + results.portnox.operational[`year${i}`]);
    }
    
    // First year investment is initial + remainder of year 1 costs
    investmentData.push(initialInvestment + (annualCosts[0] * 0.75));
    
    // Subsequent years investment is just annual costs
    for (let i = 1; i < yearsToProject; i++) {
      investmentData.push(annualCosts[i]);
    }
    
    // Annual benefits (evenly distribute total benefits)
    const annualBenefit = results.roi.totalBenefits / yearsToProject;
    for (let i = 0; i < yearsToProject; i++) {
      returnData.push(annualBenefit);
    }
    
    // Net benefit is return - investment
    for (let i = 0; i < yearsToProject; i++) {
      netBenefitData.push(returnData[i] - investmentData[i]);
    }
  } else {
    // Sample data if no results available
    investmentData = [90000, 70000, 70000];
    returnData = [150000, 160000, 170000];
    netBenefitData = [60000, 90000, 100000];
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Investment',
          backgroundColor: colors.primary,
          data: investmentData
        },
        {
          label: 'Return',
          backgroundColor: colors.secondary,
          data: returnData
        },
        {
          label: 'Net Benefit',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: colors.warning,
          borderWidth: 2,
          type: 'line',
          data: netBenefitData
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize value drivers chart
 */
function initializeValueDriversChart() {
  const chartElement = document.getElementById('value-drivers-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Prepare data for the chart
  const labels = [
    'Direct Cost Savings',
    'Productivity Gains',
    'Compliance Efficiency',
    'Risk Reduction',
    'Insurance Savings'
  ];
  
  let data = [];
  
  if (results && results.roi) {
    data = [
      results.roi.costSavings,
      results.roi.productivitySavings,
      results.roi.complianceBenefit,
      results.roi.riskBenefit,
      results.roi.insuranceBenefit
    ];
  } else {
    // Sample data if no results available
    data = [
      180000,
      120000,
      90000,
      70000,
      30000
    ];
  }
  
  const colors = getThemeColors();
  const backgroundColors = [
    colors.primary,
    colors.secondary,
    colors.warning,
    colors.danger,
    colors.primaryLight
  ];
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: colors.background,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed);
              return label;
            }
          }
        }
      },
      cutout: '60%'
    }
  });
}

/**
 * Initialize risk comparison chart
 */
function initializeRiskComparisonChart() {
  const chartElement = document.getElementById('risk-comparison-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Risk categories
  const categories = [
    'Unauthorized Access',
    'Data Breach',
    'Malware Spread',
    'Compliance Violations',
    'Insider Threats',
    'IoT Security'
  ];
  
  // Risk levels (0-10) for each category
  let portnoxData = [];
  let competitorData = [];
  let noNacData = [];
  
  if (results && results.risk) {
    // Calculate risk levels based on risk reduction
    const baseRiskReduction = results.risk.totalRiskReduction / 100;
    
    portnoxData = [
      2, // Unauthorized Access
      3, // Data Breach
      2, // Malware Spread
      2, // Compliance Violations
      3, // Insider Threats
      4  // IoT Security
    ];
    
    competitorData = [
      Math.round(5 - (3 * (baseRiskReduction * 0.6))), // Competitors are about 60% as effective
      Math.round(6 - (3 * (baseRiskReduction * 0.6))),
      Math.round(5 - (3 * (baseRiskReduction * 0.6))),
      Math.round(5 - (3 * (baseRiskReduction * 0.6))),
      Math.round(6 - (3 * (baseRiskReduction * 0.6))),
      Math.round(7 - (3 * (baseRiskReduction * 0.6)))
    ];
    
    noNacData = [9, 9, 8, 9, 7, 10]; // No NAC has high risk in all categories
  } else {
    // Sample data if no results available
    portnoxData = [2, 3, 2, 2, 3, 4];
    competitorData = [5, 6, 5, 5, 6, 7];
    noNacData = [9, 9, 8, 9, 7, 10];
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Typical On-Premises NAC',
          data: competitorData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'No NAC',
          data: noNacData,
          backgroundColor: colors['no-nac'].transparent,
          borderColor: colors['no-nac'].solid,
          borderWidth: 2,
          pointBackgroundColor: colors['no-nac'].solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              
              // Convert risk level (0-10) to a risk description
              const riskLevel = context.parsed.r;
              let riskDescription;
              
              if (riskLevel <= 2) riskDescription = 'Very Low Risk';
              else if (riskLevel <= 4) riskDescription = 'Low Risk';
              else if (riskLevel <= 6) riskDescription = 'Medium Risk';
              else if (riskLevel <= 8) riskDescription = 'High Risk';
              else riskDescription = 'Very High Risk';
              
              return `${label}${riskLevel}/10 (${riskDescription})`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize breach impact chart
 */
function initializeBreachImpactChart() {
  const chartElement = document.getElementById('breach-impact-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const deviceCount = window.AppState?.params?.deviceCount || 500;
  
  // Calculate breach costs
  const baseCostPerDevice = 300; // Average breach cost per device
  const baseBreachCost = deviceCount * baseCostPerDevice;
  
  let portnoxBreachCost, competitorBreachCost, noNacBreachCost;
  
  if (results && results.risk) {
    const riskReduction = results.risk.totalRiskReduction / 100;
    const competitorRiskReduction = riskReduction * 0.6; // Competitors are about 60% as effective
    
    portnoxBreachCost = baseBreachCost * (1 - riskReduction);
    competitorBreachCost = baseBreachCost * (1 - competitorRiskReduction);
    noNacBreachCost = baseBreachCost;
  } else {
    // Sample data if no results available
    portnoxBreachCost = baseBreachCost * 0.4; // 60% reduction
    competitorBreachCost = baseBreachCost * 0.7; // 30% reduction
    noNacBreachCost = baseBreachCost;
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: ['Estimated Breach Cost'],
      datasets: [
        {
          label: 'No NAC',
          backgroundColor: colors['no-nac'].solid,
          data: [noNacBreachCost]
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: [competitorBreachCost]
        },
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: [portnoxBreachCost]
        }
      ]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.x);
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Potential Breach Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize insurance impact chart
 */
function initializeInsuranceImpactChart() {
  const chartElement = document.getElementById('insurance-impact-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const deviceCount = window.AppState?.params?.deviceCount || 500;
  const insuranceReduction = window.AppState?.params?.insuranceReduction || 10;
  
  // Calculate insurance costs
  const baseInsuranceCost = deviceCount * 20; // $20 per device per year
  
  let portnoxInsuranceCost, competitorInsuranceCost, noNacInsuranceCost;
  
  if (results && results.roi) {
    portnoxInsuranceCost = baseInsuranceCost * (1 - (insuranceReduction / 100));
    competitorInsuranceCost = baseInsuranceCost * (1 - (insuranceReduction / 100 * 0.6)); // 60% as effective
    noNacInsuranceCost = baseInsuranceCost * 1.2; // 20% higher with no NAC
  } else {
    // Sample data if no results available
    portnoxInsuranceCost = baseInsuranceCost * 0.9; // 10% reduction
    competitorInsuranceCost = baseInsuranceCost * 0.95; // 5% reduction
    noNacInsuranceCost = baseInsuranceCost * 1.2; // 20% higher
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: ['Annual Insurance Premium'],
      datasets: [
        {
          label: 'No NAC',
          backgroundColor: colors['no-nac'].solid,
          data: [noNacInsuranceCost]
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: [competitorInsuranceCost]
        },
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: [portnoxInsuranceCost]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Annual Premium'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize vendor radar chart
 */
function initializeVendorRadarChart() {
  const chartElement = document.getElementById('vendor-radar-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Features to compare
  const features = [
    'Cloud-Native',
    'Zero Trust',
    'Ease of Deployment',
    'Cost Efficiency',
    'Remote Access',
    'Scalability'
  ];
  
  // Selected vendors
  const selectedVendors = window.AppState?.selectedVendors || ['portnox', 'cisco'];
  
  // Vendor ratings (0-100) for each feature
  const vendorRatings = {
    portnox: [95, 90, 95, 90, 95, 95],
    cisco: [40, 70, 30, 40, 60, 70],
    aruba: [50, 65, 40, 50, 55, 75],
    forescout: [30, 75, 35, 45, 50, 65],
    fortinac: [35, 65, 40, 60, 45, 60],
    juniper: [55, 60, 50, 55, 60, 70],
    securew2: [85, 80, 75, 75, 80, 80],
    microsoft: [60, 50, 40, 65, 40, 55],
    arista: [45, 60, 45, 50, 55, 65],
    foxpass: [80, 70, 70, 75, 65, 75],
    'no-nac': [0, 0, 100, 100, 0, 0]
  };
  
  // Get colors
  const colors = getVendorColors();
  
  // Prepare datasets for selected vendors
  const datasets = [];
  
  // Always include Portnox
  datasets.push({
    label: 'Portnox Cloud',
    data: vendorRatings.portnox,
    backgroundColor: colors.portnox.transparent,
    borderColor: colors.portnox.solid,
    borderWidth: 2,
    pointBackgroundColor: colors.portnox.solid
  });
  
  // Add other selected vendors
  selectedVendors.forEach(vendor => {
    if (vendor !== 'portnox' && vendorRatings[vendor]) {
      datasets.push({
        label: getVendorDisplayName(vendor),
        data: vendorRatings[vendor],
        backgroundColor: colors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderColor: colors[vendor]?.solid || '#999999',
        borderWidth: 2,
        pointBackgroundColor: colors[vendor]?.solid || '#999999'
      });
    }
  });
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: features,
      datasets: datasets
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cost structure chart
 */
function initializeCostStructureChart() {
  const chartElement = document.getElementById('cost-structure-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  
  // Cost categories
  const categories = [
    'Hardware',
    'Software/Subscription',
    'Implementation',
    'Maintenance',
    'Operational'
  ];
  
  // Cost data for each vendor
  let portnoxData = [];
  let competitorData = [];
  
  if (results && results.portnox) {
    // Portnox has no hardware or maintenance costs
    portnoxData = [
      0, // Hardware
      results.portnox.subscription.year1 * results.portnox.subscription.year2 * results.portnox.subscription.year3, // Subscription
      results.portnox.implementation.year1, // Implementation
      0, // Maintenance
      results.portnox.operational.year1 * 3 // Operational (3 years)
    ];
    
    // Use Cisco as the primary competitor if available
    if (results.vendors.cisco) {
      competitorData = [
        (results.vendors.cisco.hardware.year1 || 0) + (results.vendors.cisco.hardware.year2 || 0) + (results.vendors.cisco.hardware.year3 || 0),
        (results.vendors.cisco.software.year1 || 0) + (results.vendors.cisco.software.year2 || 0) + (results.vendors.cisco.software.year3 || 0),
        (results.vendors.cisco.implementation.year1 || 0),
        (results.vendors.cisco.maintenance.year1 || 0) + (results.vendors.cisco.maintenance.year2 || 0) + (results.vendors.cisco.maintenance.year3 || 0),
        (results.vendors.cisco.operational.year1 || 0) + (results.vendors.cisco.operational.year2 || 0) + (results.vendors.cisco.operational.year3 || 0)
      ];
    } else {
      // Use first available competitor
      const firstCompetitor = Object.keys(results.vendors)[0];
      if (firstCompetitor) {
        competitorData = [
          (results.vendors[firstCompetitor].hardware.year1 || 0) + (results.vendors[firstCompetitor].hardware.year2 || 0) + (results.vendors[firstCompetitor].hardware.year3 || 0),
          (results.vendors[firstCompetitor].software.year1 || 0) + (results.vendors[firstCompetitor].software.year2 || 0) + (results.vendors[firstCompetitor].software.year3 || 0),
          (results.vendors[firstCompetitor].implementation.year1 || 0),
          (results.vendors[firstCompetitor].maintenance.year1 || 0) + (results.vendors[firstCompetitor].maintenance.year2 || 0) + (results.vendors[firstCompetitor].maintenance.year3 || 0),
          (results.vendors[firstCompetitor].operational.year1 || 0) + (results.vendors[firstCompetitor].operational.year2 || 0) + (results.vendors[firstCompetitor].operational.year3 || 0)
        ];
      }
    }
  }
  
  if (!competitorData.length) {
    // Sample data if no results available
    portnoxData = [0, 150000, 15000, 0, 30000];
    competitorData = [150000, 100000, 75000, 60000, 90000];
  }
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          backgroundColor: colors.portnox.solid,
          data: portnoxData
        },
        {
          label: 'Typical On-Premises NAC',
          backgroundColor: colors.cisco.solid,
          data: competitorData
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cost (3-Year Total)'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize cost projection chart
 */
function initializeCostProjectionChart() {
  const chartElement = document.getElementById('cost-projection-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Get calculated results if available
  const results = window.AppState?.calculatedResults;
  const yearsToProject = window.AppState?.params?.yearsToProject || 3;
  
  // Prepare data for the chart
  const labels = [];
  for (let i = 1; i <= yearsToProject; i++) {
    labels.push(`Year ${i}`);
  }
  
  // Datasets for each vendor
  const datasets = [];
  const vendorColors = getVendorColors();
  
  // Add Portnox data
  if (results && results.portnox) {
    const portnoxData = [];
    for (let i = 1; i <= yearsToProject; i++) {
      portnoxData.push(results.portnox.total[`year${i}`]);
    }
    
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: portnoxData,
      fill: true
    });
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Portnox Cloud',
      borderColor: vendorColors.portnox.solid,
      backgroundColor: vendorColors.portnox.transparent,
      borderWidth: 2,
      data: [80000, 70000, 70000],
      fill: true
    });
  }
  
  // Add data for selected vendors
  if (results && results.vendors) {
    for (const vendor in results.vendors) {
      if (vendor === 'portnox') continue;
      
      const vendorData = [];
      for (let i = 1; i <= yearsToProject; i++) {
        vendorData.push(results.vendors[vendor].total[`year${i}`]);
      }
      
      datasets.push({
        label: getVendorDisplayName(vendor),
        borderColor: vendorColors[vendor]?.solid || '#999999',
        backgroundColor: vendorColors[vendor]?.transparent || 'rgba(153, 153, 153, 0.2)',
        borderWidth: 2,
        data: vendorData,
        fill: true
      });
    }
  } else {
    // Sample data if no results available
    datasets.push({
      label: 'Cisco ISE',
      borderColor: vendorColors.cisco.solid,
      backgroundColor: vendorColors.cisco.transparent,
      borderWidth: 2,
      data: [200000, 120000, 120000],
      fill: true
    });
  }
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += formatCurrency(context.parsed.y);
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Annual Cost'
          },
          ticks: {
            callback: function(value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize NIST framework chart
 */
function initializeNistFrameworkChart() {
  const chartElement = document.getElementById('nist-framework-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // NIST Cybersecurity Framework categories
  const categories = [
    'Identify',
    'Protect',
    'Detect',
    'Respond',
    'Recover'
  ];
  
  // Ratings for each solution
  const portnoxData = [85, 95, 90, 85, 80];
  const competitorData = [70, 80, 75, 70, 65];
  const noNacData = [20, 30, 25, 20, 15];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Typical On-Premises NAC',
          data: competitorData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'No NAC',
          data: noNacData,
          backgroundColor: colors['no-nac'].transparent,
          borderColor: colors['no-nac'].solid,
          borderWidth: 2,
          pointBackgroundColor: colors['no-nac'].solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize security heatmap
 */
function initializeSecurityHeatmap() {
  const heatmapContainer = document.getElementById('security-heatmap');
  if (!heatmapContainer) return;
  
  // Clear previous heatmap
  heatmapContainer.innerHTML = '';
  
  // Security capabilities to compare
  const capabilities = [
    'Device Authentication',
    '802.1X Support',
    'Posture Assessment',
    'Zero Trust Enforcement',
    'BYOD Onboarding',
    'Guest Management',
    'Continuous Monitoring',
    'API Integration',
    'Remote Access Security',
    'Cloud Identity Integration'
  ];
  
  // Vendors to compare
  const vendors = ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'];
  
  // Ratings for each capability (0-5)
  const ratings = {
    'Portnox Cloud': [5, 5, 5, 5, 5, 4, 5, 5, 5, 5],
    'Cisco ISE': [5, 5, 4, 3, 4, 5, 3, 3, 3, 2],
    'Aruba ClearPass': [5, 5, 4, 3, 4, 4, 3, 3, 3, 3],
    'Forescout': [4, 4, 5, 3, 3, 3, 4, 4, 2, 2]
  };
  
  // Create heatmap table
  const table = document.createElement('table');
  table.className = 'heatmap-table';
  
  // Create header row
  const headerRow = document.createElement('tr');
  const emptyCell = document.createElement('th');
  headerRow.appendChild(emptyCell);
  
  vendors.forEach(vendor => {
    const cell = document.createElement('th');
    cell.textContent = vendor;
    headerRow.appendChild(cell);
  });
  
  table.appendChild(headerRow);
  
  // Create data rows
  capabilities.forEach((capability, i) => {
    const row = document.createElement('tr');
    
    // Capability name
    const nameCell = document.createElement('td');
    nameCell.className = 'capability-name';
    nameCell.textContent = capability;
    row.appendChild(nameCell);
    
    // Vendor ratings
    vendors.forEach(vendor => {
      const cell = document.createElement('td');
      const rating = ratings[vendor][i];
      
      // Apply color based on rating
      let backgroundColor;
      if (rating === 5) backgroundColor = '#00c853';
      else if (rating === 4) backgroundColor = '#64b5f6';
      else if (rating === 3) backgroundColor = '#ffab00';
      else if (rating === 2) backgroundColor = '#ff8f00';
      else if (rating === 1) backgroundColor = '#f44336';
      else backgroundColor = '#757575';
      
      cell.style.backgroundColor = backgroundColor;
      
      // Add rating stars
      let stars = '';
      for (let j = 0; j < 5; j++) {
        if (j < rating) {
          stars += '<i class="fas fa-star"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      
      cell.innerHTML = stars;
      cell.setAttribute('data-rating', rating);
      
      row.appendChild(cell);
    });
    
    table.appendChild(row);
  });
  
  // Add table to container
  heatmapContainer.appendChild(table);
  
  // Add legend
  const legend = document.createElement('div');
  legend.className = 'heatmap-legend';
  legend.innerHTML = `
    <div class="legend-item">
      <span class="legend-color" style="background-color: #00c853;"></span>
      <span class="legend-label">Excellent (5)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #64b5f6;"></span>
      <span class="legend-label">Very Good (4)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #ffab00;"></span>
      <span class="legend-label">Good (3)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #ff8f00;"></span>
      <span class="legend-label">Fair (2)</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" style="background-color: #f44336;"></span>
      <span class="legend-label">Poor (1)</span>
    </div>
  `;
  
  heatmapContainer.appendChild(legend);
}

/**
 * Initialize architecture chart
 */
function initializeArchitectureChart() {
  const chartElement = document.getElementById('architecture-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Architecture aspects to compare
  const aspects = [
    'Deployment Simplicity',
    'Operational Overhead',
    'Scalability',
    'Reliability',
    'Update Simplicity',
    'Remote Access',
    'Multi-Location Support'
  ];
  
  // Vendor ratings (0-100)
  const portnoxData = [95, 90, 95, 90, 95, 95, 90];
  const ciscoData = [30, 40, 70, 85, 30, 60, 70];
  const arubaData = [40, 50, 75, 80, 35, 55, 75];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: aspects,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Cisco ISE',
          data: ciscoData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'Aruba ClearPass',
          data: arubaData,
          backgroundColor: colors.aruba.transparent,
          borderColor: colors.aruba.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.aruba.solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 12
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Initialize feature radar chart
 */
function initializeFeatureRadarChart() {
  const chartElement = document.getElementById('feature-radar-chart');
  if (!chartElement) return;
  
  // Get current chart instance if it exists
  let chartInstance = Chart.getChart(chartElement);
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  // Features to compare
  const features = [
    '802.1X Authentication',
    'MAC Authentication',
    'Agentless Operation',
    'BYOD Support',
    'Guest Management',
    'Device Profiling',
    'Posture Assessment',
    'Remote Access',
    'API Integrations'
  ];
  
  // Vendor ratings (0-100)
  const portnoxData = [100, 100, 95, 95, 90, 95, 95, 95, 95];
  const ciscoData = [100, 100, 60, 85, 95, 85, 85, 70, 75];
  const arubaData = [100, 100, 70, 90, 90, 85, 85, 65, 80];
  const forescoutData = [85, 95, 95, 75, 75, 95, 95, 65, 85];
  
  // Get colors
  const colors = getVendorColors();
  
  // Create chart
  chartInstance = new Chart(chartElement, {
    type: 'radar',
    data: {
      labels: features,
      datasets: [
        {
          label: 'Portnox Cloud',
          data: portnoxData,
          backgroundColor: colors.portnox.transparent,
          borderColor: colors.portnox.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.portnox.solid
        },
        {
          label: 'Cisco ISE',
          data: ciscoData,
          backgroundColor: colors.cisco.transparent,
          borderColor: colors.cisco.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.cisco.solid
        },
        {
          label: 'Aruba ClearPass',
          data: arubaData,
          backgroundColor: colors.aruba.transparent,
          borderColor: colors.aruba.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.aruba.solid
        },
        {
          label: 'Forescout',
          data: forescoutData,
          backgroundColor: colors.forescout.transparent,
          borderColor: colors.forescout.solid,
          borderWidth: 2,
          pointBackgroundColor: colors.forescout.solid
        }
      ]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: {
              size: 11
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              return `${label}${context.parsed.r}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Helper function to format currency
 */
function formatCurrency(value) {
  // Use the window.formatCurrency if available
  if (window.formatCurrency) {
    return window.formatCurrency(value);
  }
  
  // Fallback implementation
  return 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + Math.round(value).toLocaleString();
}

/**
 * Helper function to get vendor display name
 */
function getVendorDisplayName(vendorId) {
  switch(vendorId) {
    case 'cisco': return 'Cisco ISE';
    case 'aruba': return 'Aruba ClearPass';
    case 'forescout': return 'Forescout';
    case 'fortinac': return 'FortiNAC';
    case 'juniper': return 'Juniper Mist';
    case 'securew2': return 'SecureW2';
    case 'microsoft': return 'Microsoft NPS';
    case 'arista': return 'Arista Agni';
    case 'foxpass': return 'Foxpass';
    case 'no-nac': return 'No NAC';
    default: return vendorId;
  }
}

// Export the initialization function
window.initializeCharts = initializeCharts;
EOF

# Create report generator JavaScript
echo "Creating report generator JavaScript..."
cat > js/report-generator.js << 'EOF'
/**
 * Report Generator for Portnox Total Cost Analyzer
 * Handles PDF export functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize export button
  const exportBtn = document.getElementById('export-pdf');
  if (exportBtn) {
    exportBtn.addEventListener('click', generateReport);
  }
});

/**
 * Generate PDF report based on current view
 */
function generateReport() {
  // Check if jsPDF is available
  if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
    showToast('PDF generation library not loaded. Please try again later.', 'error');
    return;
  }
  
  // Show loading indicator
  showLoading('Generating your report...');
  
  // Get current view
  const currentView = window.AppState?.currentView || 'executive';
  
  // Get view title
  const viewTitle = getViewTitle(currentView);
  
  // Create PDF document
  const { jsPDF } = jspdf;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set up document properties
  doc.setProperties({
    title: `Portnox TCO Analysis - ${viewTitle} Report`,
    subject: 'Total Cost Analysis',
    author: 'Portnox',
    keywords: 'TCO, ROI, NAC, Zero Trust',
    creator: 'Portnox Total Cost Analyzer'
  });
  
  // Add header
  addReportHeader(doc, viewTitle);
  
  // Add report content based on view type
  switch (currentView) {
    case 'executive':
      addExecutiveReport(doc);
      break;
    case 'financial':
      addFinancialReport(doc);
      break;
    case 'security':
      addSecurityReport(doc);
      break;
    case 'technical':
      addTechnicalReport(doc);
      break;
    default:
      addExecutiveReport(doc);
  }
  
  // Add footer with pagination
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addReportFooter(doc, i, pageCount);
  }
  
  // Generate timestamp for filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  
  // Save the PDF
  setTimeout(() => {
    try {
      doc.save(`portnox-tco-analysis-${currentView}-${timestamp}.pdf`);
      hideLoading();
      showToast('Report generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      hideLoading();
      showToast('Error generating report. Please try again.', 'error');
    }
  }, 1000);
}

/**
 * Get view title based on view ID
 */
function getViewTitle(viewId) {
  switch (viewId) {
    case 'executive': return 'Executive';
    case 'financial': return 'Financial';
    case 'security': return 'Security & Compliance';
    case 'technical': return 'Technical';
    default: return 'Executive';
  }
}

/**
 * Add report header
 */
function addReportHeader(doc, viewTitle) {
  // Add logo
  try {
    // Try to get logo from the page
    const logoImg = document.querySelector('.company-logo');
    if (logoImg && logoImg.complete && logoImg.naturalHeight !== 0) {
      const canvas = document.createElement('canvas');
      canvas.width = logoImg.naturalWidth;
      canvas.height = logoImg.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(logoImg, 0, 0);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 15, 10, 30, 15);
    }
  } catch (error) {
    console.warn('Could not add logo:', error);
  }
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(21, 101, 192); // Primary blue
  doc.text('Zero Trust Total Cost Analyzer', 50, 20);
  
  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(51, 51, 51);
  doc.text(`${viewTitle} Report`, 50, 30);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 210, 20, { align: 'right' });
  
  // Configuration summary
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  
  // Get configuration values
  const deviceCount = window.AppState?.params?.deviceCount || '500';
  const years = window.AppState?.params?.yearsToProject || '3';
  const industry = window.AppState?.params?.industry || 'Not specified';
  
  doc.text(`Configuration: ${deviceCount} devices, ${years} years analysis period, Industry: ${industry}`, 210, 30, { align: 'right' });
  
  // Divider line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(10, 35, 287, 35);
}

/**
 * Add report footer
 */
function addReportFooter(doc, currentPage, pageCount) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Footer line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(10, pageHeight - 10, pageWidth - 10, pageHeight - 10);
  
  // Copyright and page number
  doc.setFontSize(9);
  doc.setTextColor(102, 102, 102);
  doc.text('© 2025 Portnox. All rights reserved.', 10, pageHeight - 5);
  doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth - 20, pageHeight - 5);
}

/**
 * Add executive report content
 */
function addExecutiveReport(doc) {
  // Get calculated results
  const results = window.AppState?.calculatedResults;
  
  // Title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Executive Summary', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text('This analysis compares the total cost of ownership (TCO) and return on investment (ROI) for different Network Access Control (NAC) solutions.', 10, 55);
  doc.text('Portnox Cloud offers a cloud-native approach that eliminates hardware costs and reduces operational overhead.', 10, 61);
  
  // Key metrics section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Key Metrics', 10, 70);
  
  // Get metric values
  const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
  const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction vs. Cisco ISE';
  const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
  const implementationTime = document.getElementById('implementation-time')?.textContent || '21 days';
  const roi = document.getElementById('three-year-roi')?.textContent || '287%';
  
  // Draw metrics table
  const metricsData = [
    ['Metric', 'Value', 'Benefit'],
    ['Total Cost Savings', totalSavings, 'Direct financial benefit over analysis period'],
    ['Savings Percentage', savingsPercentage, 'Percentage reduction compared to leading alternative'],
    ['Implementation Time', implementationTime, 'Time to full deployment'],
    ['Payback Period', paybackPeriod, 'Time to positive return on investment'],
    ['Return on Investment', roi, '3-year ROI percentage']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [metricsData[0]],
    body: metricsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 50, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // TCO chart
  try {
    const tcoChart = document.getElementById('tco-comparison-chart');
    if (tcoChart) {
      const imgData = tcoChart.toDataURL('image/png');
      const currentY = doc.lastAutoTable.finalY + 15;
      
      doc.setFontSize(14);
      doc.setTextColor(21, 101, 192);
      doc.text('TCO Comparison', 10, currentY);
      
      doc.addImage(imgData, 'PNG', 10, currentY + 5, 130, 75);
      
      // Add chart explanation
      doc.setFontSize(10);
      doc.setTextColor(51, 51, 51);
      doc.text('The chart above compares the total cost of ownership across years for selected vendors.', 150, currentY + 20);
      doc.text('Portnox Cloud shows significantly lower costs due to elimination of hardware,', 150, currentY + 28);
      doc.text('reduced implementation complexity, and lower operational overhead.', 150, currentY + 36);
    }
  } catch (error) {
    console.warn('Could not add TCO chart:', error);
  }
  
  // Add a new page
  doc.addPage();
  
  // Strategic Benefits
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Strategic Benefits', 10, 45);
  
  const benefitsData = [
    ['Benefit', 'Description', 'Business Impact'],
    ['Cloud-Native Architecture', 'Zero infrastructure costs and automatic updates', 'Eliminates capital expenditures and reduces IT burden'],
    ['Rapid Deployment', '75% faster implementation than on-premises', 'Accelerates time-to-security and reduces project costs'],
    ['Zero Trust Security', 'Continuous device authentication and verification', 'Reduces breach risk and improves compliance posture'],
    ['Operational Efficiency', 'Minimal IT staff time required for management', 'Frees up resources for strategic initiatives'],
    ['Automatic Updates', 'Always running the latest version', 'Eliminates upgrade projects and security patch concerns'],
    ['Global Scalability', 'Easily scales to support organization growth', 'Future-proofs your investment and grows with your needs']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [benefitsData[0]],
    body: benefitsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Secondary green
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 80 },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Recommendations
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Recommendations', 10, doc.lastAutoTable.finalY + 20);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    '1. Move forward with Portnox Cloud for best TCO and fastest time-to-value',
    '2. Implement in phases, starting with critical segments of your network',
    '3. Take advantage of cloud-native capabilities for remote and distributed workforce',
    '4. Leverage automatic updates to maintain security posture',
    '5. Utilize compliance reporting to support audit requirements'
  ], 10, doc.lastAutoTable.finalY + 30);
  
  // Next steps
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Next Steps', 10, doc.lastAutoTable.finalY + 70);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    '• Request a live demonstration to see Portnox in action',
    '• Schedule a technical deep dive with our solution architects',
    '• Begin a proof of concept with a limited device set',
    '• Develop a phased implementation plan',
    '• Engage with our customer success team for deployment best practices'
  ], 10, doc.lastAutoTable.finalY + 80);
}

/**
 * Add financial report content
 */
function addFinancialReport(doc) {
  // Get calculated results
  const results = window.AppState?.calculatedResults;
  
  // Financial analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Financial Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text('This report provides a detailed financial analysis of NAC solutions, focusing on cost components, ROI, and long-term financial impact.', 10, 55);
  
  // TCO Breakdown section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('TCO Breakdown', 10, 65);
  
  // Get TCO values
  const portnoxTco = document.getElementById('portnox-tco')?.textContent || '$202,500';
  const competitorTco = document.getElementById('tco-comparison')?.textContent?.replace('vs. ', '') || '$450,000 (Cisco ISE)';
  
  // Create TCO breakdown table
  const tcoData = [
    ['Cost Component', 'Portnox Cloud', 'On-Premises NAC', 'Savings'],
    ['Hardware', '$0', '$175,000', '$175,000'],
    ['Software/Subscription', '$180,000', '$120,000', '-$60,000'],
    ['Implementation', '$15,500', '$75,000', '$59,500'],
    ['Maintenance & Support', '$0', '$70,000', '$70,000'],
    ['IT Staff Time', '$22,500', '$120,000', '$97,500'],
    ['Total 3-Year TCO', portnoxTco, competitorTco.split(' ')[0], formatCurrency(parseFloat(competitorTco.split(' ')[0].replace(/[$,]/g, '')) - parseFloat(portnoxTco.replace(/[$,]/g, '')))]
  ];
  
  doc.autoTable({
    startY: 70,
    head: [tcoData[0]],
    body: tcoData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 40, halign: 'right' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    },
    bodyStyles: {
      lineColor: [220, 220, 220]
    },
    didParseCell: function(data) {
      // Highlight the total row
      if (data.row.index === tcoData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
        if (data.column.index === 0) {
          data.cell.styles.fillColor = [240, 240, 240];
        }
      }
      
      // Highlight savings (either positive or negative)
      if (data.column.index === 3 && data.row.index > 0) {
        if (data.cell.raw.startsWith('-')) {
          data.cell.styles.textColor = [221, 53, 11]; // Red for negative savings
        } else {
          data.cell.styles.textColor = [0, 200, 83]; // Green for positive savings
        }
      }
    }
  });
  
  // ROI Analysis
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('ROI Analysis', 10, doc.lastAutoTable.finalY + 20);
  
  // Get metric values
  const roi = document.getElementById('three-year-roi')?.textContent || '287%';
  const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
  
  // Create ROI table
  const roiData = [
    ['Metric', 'Value', 'Description'],
    ['Initial Investment', '$45,000', 'First 3 months of subscription plus implementation'],
    ['Annual Benefits', '$114,000', 'Annual cost savings vs. on-premises alternatives'],
    ['3-Year ROI', roi, 'Return on investment over analysis period'],
    ['Payback Period', paybackPeriod, 'Time to recoup initial investment'],
    ['Net Present Value (NPV)', '$275,000', 'Present value of future benefits minus costs (5% discount rate)'],
    ['Internal Rate of Return (IRR)', '250%', 'Annualized effective return rate']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [roiData[0]],
    body: roiData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Secondary green for ROI section
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Cash Flow Analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Cash Flow Analysis', 10, 45);
  
  // Cash flow table
  const cashFlowData = [
    ['Period', 'Investment', 'Benefits', 'Net Cash Flow', 'Cumulative'],
    ['Initial', '$45,000', '$0', '-$45,000', '-$45,000'],
    ['Year 1', '$45,000', '$114,000', '$69,000', '$24,000'],
    ['Year 2', '$45,000', '$114,000', '$69,000', '$93,000'],
    ['Year 3', '$45,000', '$114,000', '$69,000', '$162,000']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [cashFlowData[0]],
    body: cashFlowData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30, halign: 'right' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 30, halign: 'right' }
    },
    didParseCell: function(data) {
      // Highlight negative values
      if ((data.column.index === 3 || data.column.index === 4) && 
          data.cell.raw && data.cell.raw.startsWith('-')) {
        data.cell.styles.textColor = [221, 53, 11]; // Red
      }
      
      // Highlight positive values
      if ((data.column.index === 3 || data.column.index === 4) && 
          data.cell.raw && !data.cell.raw.startsWith('-') && data.row.index > 0) {
        data.cell.styles.textColor = [0, 200, 83]; // Green
      }
    }
  });
  
  // Try to add cash flow chart if available
  try {
    const cumChartCanvas = document.getElementById('cumulative-cost-chart');
    if (cumChartCanvas) {
      const imgData = cumChartCanvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable.finalY + 15, 130, 75);
      
      // Add explanation
      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51);
      doc.text('The chart shows cumulative costs over time. The difference between', 150, doc.lastAutoTable.finalY + 30);
      doc.text('the lines represents your total savings over the analysis period.', 150, doc.lastAutoTable.finalY + 38);
    }
  } catch (error) {
    console.warn('Could not add cumulative chart:', error);
  }
  
  // Sensitivity Analysis
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Sensitivity Analysis', 10, doc.lastAutoTable.finalY + 100);
  
  // Sensitivity table showing how ROI changes with different parameters
  const sensitivityData = [
    ['Parameter', 'Low Value', 'Base Value', 'High Value', 'Impact on ROI'],
    ['Device Count', '300', '500', '1,000', 'Medium Positive'],
    ['Subscription Cost', '$4.50/device', '$3.00/device', '$1.50/device', 'High Positive'],
    ['Implementation Days', '30 days', '21 days', '14 days', 'Low Positive'],
    ['FTE Allocation', '40%', '25%', '10%', 'Medium Positive'],
    ['Analysis Period', '1 year', '3 years', '5 years', 'High Positive']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 105,
    head: [sensitivityData[0]],
    body: sensitivityData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Add security report content
 */
function addSecurityReport(doc) {
  // Security analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Security & Compliance Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'This report evaluates the security and compliance capabilities of Portnox Cloud compared to alternative NAC solutions.',
    'It highlights key security improvements, compliance coverage, and risk reduction metrics.'
  ], 10, 55);
  
  // Risk Reduction section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Security Risk Reduction', 10, 70);
  
  // Risk reduction metrics
  const riskReductionData = [
    ['Risk Category', 'Without NAC', 'With Portnox Cloud', 'Risk Reduction'],
    ['Unauthorized Access', 'High', 'Very Low', '85%'],
    ['Device Compliance', 'High', 'Low', '75%'],
    ['Lateral Movement', 'Very High', 'Low', '80%'],
    ['Malware Propagation', 'High', 'Low', '70%'],
    ['Data Exfiltration', 'Medium', 'Very Low', '65%'],
    ['Credential Theft', 'High', 'Low', '70%'],
    ['Overall Security Risk', 'High', 'Low', '75%']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [riskReductionData[0]],
    body: riskReductionData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' }
    },
    didParseCell: function(data) {
      // Format the risk levels with colors
      if (data.column.index === 1 && data.row.index >= 0) {
        if (data.cell.raw === 'Very High' || data.cell.raw === 'High') {
          data.cell.styles.textColor = [221, 53, 11]; // Red
        } else if (data.cell.raw === 'Medium') {
          data.cell.styles.textColor = [255, 171, 0]; // Orange
        } else if (data.cell.raw === 'Low') {
          data.cell.styles.textColor = [255, 171, 0]; // Yellow
        } else if (data.cell.raw === 'Very Low') {
          data.cell.styles.textColor = [0, 200, 83]; // Green
        }
      }
      
      if (data.column.index === 2 && data.row.index >= 0) {
        if (data.cell.raw === 'Very High' || data.cell.raw === 'High') {
          data.cell.styles.textColor = [221, 53, 11]; // Red
        } else if (data.cell.raw === 'Medium') {
          data.cell.styles.textColor = [255, 171, 0]; // Orange
        } else if (data.cell.raw === 'Low') {
          data.cell.styles.textColor = [255, 171, 0]; // Yellow
        } else if (data.cell.raw === 'Very Low') {
          data.cell.styles.textColor = [0, 200, 83]; // Green
        }
      }
      
      // Highlight total row
      if (data.row.index === riskReductionData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  // Compliance Coverage section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Compliance Framework Coverage', 10, doc.lastAutoTable.finalY + 20);
  
  // Compliance coverage table
  const complianceData = [
    ['Compliance Framework', 'Portnox Cloud', 'Traditional NAC', 'No NAC'],
    ['PCI DSS', '95%', '75%', '30%'],
    ['HIPAA', '90%', '65%', '25%'],
    ['NIST 800-53', '95%', '80%', '35%'],
    ['ISO 27001', '90%', '70%', '30%'],
    ['GDPR', '85%', '60%', '20%'],
    ['SOX', '85%', '65%', '25%'],
    ['CMMC', '90%', '75%', '30%']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [complianceData[0]],
    body: complianceData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Green for compliance
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    bodyStyles: {
      halign: 'center'
    }
  });
  
  // Add a new page for security capabilities
  doc.addPage();
  
  // Security capabilities section
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Zero Trust Security Capabilities', 10, 45);
  
  // Security capabilities table
  const capabilitiesData = [
    ['Capability', 'Description', 'Security Impact'],
    ['Continuous Authentication', 'Validates device identity and posture on an ongoing basis', 'Prevents unauthorized access even after initial connection'],
    ['Device Posture Assessment', 'Checks device security status before and during access', 'Ensures only compliant devices can access resources'],
    ['Access Policy Enforcement', 'Applies granular controls based on user, device, and context', 'Limits access to only what is necessary (least privilege)'],
    ['Network Visibility', 'Complete inventory of all connected devices', 'Eliminates blind spots and rogue devices'],
    ['Automated Remediation', 'Automatic quarantine and remediation of non-compliant devices', 'Reduces mean time to respond to security issues'],
    ['Integration with Security Stack', 'Works with SIEM, EDR, and other security tools', 'Creates unified security posture and response'],
    ['Cloud Delivery Model', 'No on-premises infrastructure to maintain', 'Eliminates update/patch management security risks']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [capabilitiesData[0]],
    body: capabilitiesData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 80 },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Try to add security radar chart
  try {
    const riskChart = document.getElementById('risk-comparison-chart');
    if (riskChart) {
      const imgData = riskChart.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable.finalY + 15, 130, 75);
      
      // Add explanation
      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51);
      doc.text('The radar chart illustrates security risk levels across different threat', 150, doc.lastAutoTable.finalY + 30);
      doc.text('categories. Lower values indicate lower risk exposure.', 150, doc.lastAutoTable.finalY + 38);
    }
  } catch (error) {
    console.warn('Could not add risk chart:', error);
  }
  
  // Business impact section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Business Impact of Improved Security', 10, doc.lastAutoTable.finalY + 100);
  
  // Business impact table
  const impactData = [
    ['Impact Area', 'Without NAC', 'With Portnox Cloud', 'Business Value'],
    ['Breach Probability', 'High (30%)', 'Low (7%)', 'Reduced risk exposure and potential losses'],
    ['Avg. Cost per Breach', '$150,000', '$45,000', 'Lower impact through faster containment'],
    ['Annual Loss Expectancy', '$45,000', '$3,150', 'Significant reduction in expected losses'],
    ['Insurance Premiums', 'Baseline', '10-15% reduction', 'Direct cost savings on premiums'],
    ['Compliance Penalties', 'High risk', 'Low risk', 'Avoid costly fines and remediation'],
    ['Productivity Impact', 'Significant', 'Minimal', 'Less business disruption from security events']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 105,
    head: [impactData[0]],
    body: impactData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Add technical report content
 */
function addTechnicalReport(doc) {
  // Technical analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Technical Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'This report provides a detailed technical analysis of Portnox Cloud compared to traditional NAC solutions.',
    'It covers architecture, features, implementation, and integration capabilities.'
  ], 10, 55);
  
  // Architecture comparison section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Architecture Comparison', 10, 70);
  
  // Architecture comparison table
  const architectureData = [
    ['Component', 'Portnox Cloud', 'Traditional NAC'],
    ['Deployment Model', 'SaaS / Cloud-native', 'On-premises hardware/VMs'],
    ['Infrastructure', 'None required', 'Multiple servers and appliances'],
    ['High Availability', 'Built-in redundancy', 'Complex clustering setup required'],
    ['Scalability', 'Automatic and elastic', 'Hardware-dependent, complex'],
    ['Updates', 'Automatic and continuous', 'Manual upgrade projects'],
    ['Maintenance', 'Fully managed service', 'IT staff responsibility'],
    ['Geographic Distribution', 'Global cloud presence', 'Requires hardware at each site'],
    ['Disaster Recovery', 'Built-in, multiple regions', 'Requires separate DR solution'],
    ['Remote Access Support', 'Native capability', 'Additional components needed']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [architectureData[0]],
    body: architectureData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Feature comparison section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Feature Comparison', 10, doc.lastAutoTable.finalY + 20);
  
  // Feature comparison table
  const featureData = [
    ['Feature', 'Portnox Cloud', 'Traditional NAC'],
    ['802.1X Authentication', '✓ Full Support', '✓ Full Support'],
    ['MAC Authentication', '✓ Full Support', '✓ Full Support'],
    ['Agentless Operation', '✓ Full Support', '○ Limited Support'],
    ['BYOD Onboarding', '✓ Full Support', '✓ Full Support'],
    ['Guest Management', '✓ Full Support', '✓ Full Support'],
    ['IoT Authentication', '✓ Full Support', '○ Limited Support'],
    ['Device Posture Assessment', '✓ Full Support', '○ Limited Support'],
    ['Remote Access Support', '✓ Full Support', '○ Limited Support'],
    ['Multi-factor Authentication', '✓ Full Support', '○ Limited Support'],
    ['Cloud Identity Integration', '✓ Full Support', '○ Limited Support'],
    ['Zero Trust Architecture', '✓ Full Support', '✗ Not Supported'],
    ['API-First Architecture', '✓ Full Support', '○ Limited Support'],
    ['Cross-Platform Support', '✓ Full Support', '○ Limited Support']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [featureData[0]],
    body: featureData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Add a new page
  doc.addPage();
  
  // Implementation comparison section
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Implementation Analysis', 10, 45);
  
  // Implementation phases table
  const implementationData = [
    ['Phase', 'Portnox Cloud', 'Traditional NAC', 'Time Savings'],
    ['Planning', '1-2 days', '2-4 weeks', '85-90%'],
    ['Initial Setup', '1 day', '2-3 weeks', '90-95%'],
    ['Network Integration', '2-3 days', '3-4 weeks', '80-90%'],
    ['Policy Configuration', '1-2 days', '2-3 weeks', '85-90%'],
    ['Testing', '2-3 days', '2-3 weeks', '80-85%'],
    ['Training', '1 day', '1-2 weeks', '90-95%'],
    ['Pilot Deployment', '3-5 days', '2-4 weeks', '75-85%'],
    ['Full Deployment', '1-2 weeks', '4-8 weeks', '75-80%'],
    ['Total Implementation', '3-4 weeks', '4-6 months', '80-85%']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [implementationData[0]],
    body: implementationData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    bodyStyles: {
      textColor: [51, 51, 51]
    },
    didParseCell: function(data) {
      // Highlight time savings column
      if (data.column.index === 3 && data.row.index > 0) {
        data.cell.styles.textColor = [0, 200, 83]; // Green
      }
      
      // Highlight total row
      if (data.row.index === implementationData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  // Integration capabilities section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Integration Capabilities', 10, doc.lastAutoTable.finalY + 20);
  
  // Integration capabilities text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'Portnox Cloud offers comprehensive integration capabilities with your existing security and IT infrastructure:',
    '',
    '• Identity Providers: Active Directory, Azure AD, Okta, Google Workspace, and others',
    '• Network Infrastructure: All major switch, wireless, and VPN vendors',
    '• Security Tools: SIEM, EDR, SOAR platforms for automated incident response',
    '• Endpoint Management: Integration with MDM/EMM solutions',
    '• ServiceNow: Ticket creation and asset management integration',
    '• Custom Integrations: RESTful API for custom workflow development'
  ], 10, doc.lastAutoTable.finalY + 30);
  
  // Technical requirements section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Technical Requirements', 10, doc.lastAutoTable.finalY + 80);
  
  // Technical requirements table
  const requirementsData = [
    ['Requirement', 'Portnox Cloud', 'Traditional NAC'],
    ['Hardware', 'None', 'Multiple servers/appliances'],
    ['IT Expertise', 'Basic networking knowledge', 'Deep NAC expertise required'],
    ['Deployment Time', '3-4 weeks', '4-6 months'],
    ['Network Changes', 'Minimal', 'Significant'],
    ['Maintenance Effort', 'None (fully managed)', 'Regular updates/patches'],
    ['Training Requirements', 'Minimal (1 day)', 'Extensive (1-2 weeks)'],
    ['Scaling Effort', 'Automatic', 'Hardware procurement/setup']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 85,
    head: [requirementsData[0]],
    body: requirementsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Helper function to format currency
 */
function formatCurrency(value) {
  if (typeof value === 'string') {
    // Try to parse the string as a number
    value = parseFloat(value.replace(/[$,]/g, ''));
    if (isNaN(value)) return '$0';
  }
  
  return 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + Math.round(value).toLocaleString();
}

/**
 * Show loading overlay
 */
function showLoading(message) {
  if (window.showLoading) {
    window.showLoading(message);
  } else {
    console.log(`LOADING: ${message}`);
  }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  if (window.hideLoading) {
    window.hideLoading();
  }
}

/**
 * Show toast notification
 */
function showToast(message, type) {
  if (window.showToast) {
    window.showToast(message, type);
  } else {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
EOF

# Create a logo fix script
echo "Creating logo fix script to ensure proper logo loading..."
cat > fix-vendor-logos.sh << 'EOF'
#!/bin/bash

echo "Checking and fixing vendor logos for Portnox Total Cost Analyzer"
echo "==============================================================="

# Create necessary directories
mkdir -p img/vendors

# Function to check if a logo exists or create a placeholder
check_or_create_logo() {
    local vendor=$1
    local file_type=${2:-png}
    local logo_path="img/vendors/${vendor}-logo.${file_type}"
    
    if [ ! -f "$logo_path" ]; then
        echo "Logo not found for $vendor in $logo_path. Creating symbolic link or placeholder."
        
        # Check for alternative file types
        if [ -f "img/vendors/${vendor}-logo.svg" ]; then
            echo "  Found SVG version. Using that instead."
        elif [ -f "img/vendors/${vendor}-logo.png" ] && [ "$file_type" = "svg" ]; then
            echo "  Found PNG version. Using that instead."
        elif [ -f "img/vendors/${vendor}.png" ]; then
            echo "  Found alternate naming format. Creating symlink."
            ln -sf "img/vendors/${vendor}.png" "$logo_path"
        elif [ -f "img/vendors/${vendor}.svg" ]; then
            echo "  Found alternate naming format. Creating symlink."
            ln -sf "img/vendors/${vendor}.svg" "$logo_path"
        else
            # Create a placeholder using a text-based SVG
            echo "  Creating placeholder logo."
            create_placeholder_logo "$vendor" "$logo_path"
        fi
    else
        echo "✓ Found logo for $vendor"
    fi
}

# Create a placeholder logo with vendor name
create_placeholder_logo() {
    local vendor=$1
    local output_path=$2
    local display_name=$(echo "$vendor" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    
    # Create a basic SVG with the vendor name
    cat > "$output_path" << SVGEOF
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#f8f9fa" stroke="#e0e0e0" stroke-width="2" rx="10" ry="10"/>
  <text x="100" y="55" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565c0">$display_name</text>
</svg>
SVGEOF
    
    echo "  Created placeholder logo for $display_name"
}

# Check special case for no-nac icon
if [ ! -f "img/vendors/no-nac-icon.png" ]; then
    echo "Creating no-nac icon..."
    
    # Check for alternative names
    if [ -f "img/vendors/no_nac-icon.png" ]; then
        ln -sf "img/vendors/no_nac-icon.png" "img/vendors/no-nac-icon.png"
    elif [ -f "img/vendors/no-nac.png" ]; then
        ln -sf "img/vendors/no-nac.png" "img/vendors/no-nac-icon.png"
    else
        # Create a placeholder
        cat > "img/vendors/no-nac-icon.png" << SVGEOF
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#f8f9fa" stroke="#e0e0e0" stroke-width="2"/>
  <text x="50" y="60" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#f44336">No NAC</text>
  <line x1="25" y1="25" x2="75" y2="75" stroke="#f44336" stroke-width="5"/>
  <line x1="75" y1="25" x2="25" y2="75" stroke="#f44336" stroke-width="5"/>
</svg>
SVGEOF
    fi
fi

# Check each vendor logo in both PNG and SVG formats
vendors=("portnox" "cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")

for vendor in "${vendors[@]}"; do
    check_or_create_logo "$vendor" "png"
    check_or_create_logo "$vendor" "svg"
done

# Check if generic portnox logo exists in root img directory
if [ ! -f "img/portnox-logo.png" ]; then
    echo "Adding Portnox logo to main img directory..."
    if [ -f "img/vendors/portnox-logo.png" ]; then
        cp "img/vendors/portnox-logo.png" "img/portnox-logo.png"
    else
        # Create a placeholder
        create_placeholder_logo "portnox" "img/portnox-logo.png"
    fi
fi

# Create a generic favicon if it doesn't exist
if [ ! -f "img/favicon.png" ]; then
    echo "Creating favicon..."
    cat > "img/favicon.png" << SVGEOF
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#1565c0"/>
  <path d="M8 16C8 11.6 11.6 8 16 8C20.4 8 24 11.6 24 16C24 20.4 20.4 24 16 24" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
  <path d="M16 24C11.6 24 8 20.4 8 16" stroke="#00c853" stroke-width="2.5" fill="none"/>
  <circle cx="16" cy="16" r="3" fill="#FFFFFF"/>
</svg>
SVGEOF
fi

echo "Logo check and fix completed!"
EOF

chmod +x fix-vendor-logos.sh

# Create the final integration script
echo "Creating final integration script..."
cat > finalize-update.sh << 'EOF'
#!/bin/bash

echo "Running Final Portnox Total Cost Analyzer Integration"
echo "===================================================="

# Fix file permissions
echo "Setting correct file permissions..."
chmod -R 755 js css img
chmod +x fix-vendor-logos.sh

# Run logo fix script
echo "Running vendor logo fix..."
./fix-vendor-logos.sh

# Check for CSS directory
if [ ! -d "css" ]; then
  echo "ERROR: CSS directory not found. Creating it..."
  mkdir -p css
fi

# Check for JS directory
if [ ! -d "js" ]; then
  echo "ERROR: JS directory not found. Creating it..."
  mkdir -p js
fi

# Check for IMG directory
if [ ! -d "img" ]; then
  echo "ERROR: IMG directory not found. Creating it..."
  mkdir -p img
  mkdir -p img/vendors
fi

# Verify critical files
echo "Verifying critical files..."

# Check for critical CSS files
missing_css=false
for file in "css/main.css" "css/enhanced-ui.css" "css/particle-background.css"; do
  if [ ! -f "$file" ]; then
    echo "  ERROR: Missing $file"
    missing_css=true
  else
    echo "  ✓ $file exists"
  fi
done

# Check for critical JS files
missing_js=false
for file in "js/portnox-tco-analyzer.js" "js/chart-initializer.js" "js/report-generator.js"; do
  if [ ! -f "$file" ]; then
    echo "  ERROR: Missing $file"
    missing_js=true
  else
    echo "  ✓ $file exists"
  fi
done

# Print warning if any files are missing
if [ "$missing_css" = true ] || [ "$missing_js" = true ]; then
  echo ""
  echo "WARNING: Some critical files are missing. The application may not function correctly."
  echo "Please run the update script again or check why files weren't created."
else
  echo ""
  echo "All critical files are present!"
fi

# Create test-updated-version.html for easy testing
echo "Creating test page..."
cat > test-updated-version.html << 'TESTEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Updated Portnox TCO Analyzer</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      color: #1565c0;
      border-bottom: 2px solid #1565c0;
      padding-bottom: 10px;
    }
    .test-btn {
      display: inline-block;
      background-color: #1565c0;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      margin-top: 20px;
      font-weight: bold;
    }
    .test-btn:hover {
      background-color: #0d47a1;
    }
    ul {
      margin-top: 20px;
    }
    li {
      margin-bottom: 10px;
    }
    .highlight {
      background-color: #e3f2fd;
      padding: 2px 5px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <h1>Test Updated Portnox TCO Analyzer</h1>
  <p>The Portnox Total Cost Analyzer has been successfully updated with the following enhancements:</p>
  
  <ul>
    <li><strong>Modern UI:</strong> Vibrant color scheme, improved animations, and responsive design</li>
    <li><strong>Enhanced Charts:</strong> Interactive data visualization with detailed tooltips</li>
    <li><strong>Improved Vendor Selection:</strong> Consistent logo display and better selection interface</li>
    <li><strong>Collapsible Sidebar:</strong> Properly expands and retracts for better space utilization</li>
    <li><strong>Calculate Button:</strong> Available in both sidebar and header for convenience</li>
    <li><strong>View Switching:</strong> Seamless transition between Executive, Financial, Security, and Technical views</li>
    <li><strong>Advanced PDF Reports:</strong> Comprehensive, professional reports for each stakeholder view</li>
    <li><strong>Market Data:</strong> Updated with competitive analysis and industry benchmarks</li>
  </ul>
  
  <p>Click the button below to test the updated analyzer:</p>
  <a href="index.html" class="test-btn">Launch TCO Analyzer</a>
  
  <p><small>Note: All vendor logos have been verified and placeholders created where needed. The application uses existing directory structures and enhances them without modifying core functionality.</small></p>
</body>
</html>
TESTEOF

echo ""
echo "Integration complete! You can now test the updated Portnox Total Cost Analyzer."
echo "Open 'test-updated-version.html' in your browser to get started."
echo ""
echo "Improved Features:"
echo "✓ Modern, responsive UI with vibrant color scheme"
echo "✓ Correctly functioning sidebar that properly expands and collapses"
echo "✓ Fixed vendor logo display using existing directory structure" 
echo "✓ Calculate button available in both sidebar and header"
echo "✓ Correct view switching between Executive, Financial, Security and Technical"
echo "✓ Enhanced charts and data visualization"
echo "✓ Comprehensive PDF report generation"
echo "✓ Tooltips and help system for better usability"
EOF

chmod +x finalize-update.sh

# Summary of the update
echo "Creating update-summary.md to document the changes..."
cat > update-summary.md << 'EOF'
# Portnox Total Cost Analyzer Update Summary

## Overview
This update significantly enhances the Portnox Total Cost Analyzer to provide a more comprehensive, user-friendly experience for stakeholders evaluating NAC solutions. The update focuses on improving UI functionality, fixing logo display issues, enhancing data visualization, and ensuring proper view switching between different stakeholder perspectives.

## Key Improvements

### UI Enhancements
- **Modern Color Scheme**: Vibrant, accessible colors with proper contrast
- **Responsive Design**: Properly adapts to different screen sizes
- **Animation Effects**: Subtle animations for improved user experience
- **Dark Mode Support**: Toggle between light and dark themes

### Functional Fixes
- **Sidebar Panel**: Now properly expands and retracts with smooth animation
- **Vendor Logos**: Fixed logo display by utilizing existing directory structure
- **Calculate Button**: Added to header for easier access in addition to sidebar location
- **View Switching**: Properly switches between Executive, Financial, Security, and Technical views
- **Chart Rendering**: Fixed chart initialization and refresh logic

### Data Visualization
- **Enhanced Charts**: More detailed, interactive charts with tooltips
- **Competitive Analysis**: Visual comparison of vendors across multiple dimensions
- **ROI Visualization**: Clear representation of return on investment over time
- **Risk Assessment**: Visual mapping of security posture improvement

### Integration & Architecture
- **Directory Structure**: Uses existing directory structure without modifications
- **Logo Handling**: Intelligent fallbacks for missing logos with proper placeholder generation
- **Error Handling**: Graceful handling of missing resources
- **Performance Optimization**: Improved loading time with proper resource management

## Implementation Details

### Files Added/Modified
- **index.html**: Updated structure with correct logo references and enhanced UI components
- **css/enhanced-ui.css**: Comprehensive styling with modern design patterns
- **css/particle-background.css**: Background animation effects
- **js/portnox-tco-analyzer.js**: Core application logic with fixed sidebar functionality
- **js/chart-initializer.js**: Dedicated chart initialization module
- **js/report-generator.js**: PDF report generation functionality
- **fix-vendor-logos.sh**: Script to ensure proper logo integration
- **finalize-update.sh**: Final integration script

### Technical Approach
- Used existing directory structure for backward compatibility
- Implemented modular JavaScript for better maintainability
- Separated chart logic from core application logic
- Added robust error handling and fallbacks
- Enhanced UI with CSS variables for theme consistency
- Fixed sidebar animation with proper event handling

## User Impact
End users will experience a significantly improved interface with better usability:
- More intuitive navigation between different stakeholder views
- Clear visualization of cost savings and competitive advantages
- Ability to generate comprehensive PDF reports for sharing with stakeholders
- Consistent look and feel across the entire application
- Properly functioning controls and inputs

## Future Enhancement Opportunities
- Additional data export formats (CSV, Excel)
- More granular comparison filters
- Customizable dashboards for different roles
- Integration with real-time pricing APIs
- Interactive ROI calculator with scenario planning
EOF

# Final clean-up
echo "Update complete! Run ./finalize-update.sh to complete the integration."
classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon.