#!/bin/bash

# Transform Total Cost Analyzer with Magical Wizard Experience
echo "🧙‍♂️ Creating Magical Wizard Experience for Total Cost Analyzer"
echo "================================================================"

# First, let's restore vendor logos to use actual PNG files
echo "📸 Restoring actual vendor logos..."
sed -i 's|<img src="img/vendors/\([^"]*\).svg" alt="\([^"]*\)">|<img src="img/vendors/\1-logo.png" alt="\2">|g' index.html

# Update the main HTML to make wizard a popup and load defaults
echo "📝 Updating HTML structure for popup wizard..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Total Cost Analyzer - Enterprise TCO Calculator for Zero Trust NAC Solutions">
    <title>Total Cost Analyzer | Enterprise TCO Calculator</title>
    
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="libs/css/tailwind.min.css">
    <link rel="stylesheet" href="libs/css/all.min.css">
    <link rel="stylesheet" href="libs/css/animate.min.css">
    <link rel="stylesheet" href="libs/css/aos.css">
    <link rel="stylesheet" href="libs/css/hover.min.css">
    
    <!-- Core CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/wizard.css">
    <link rel="stylesheet" href="css/containers.css">
    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/magical-wizard.css">
    <link rel="stylesheet" href="css/fontawesome-local.css">
    
    <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>
    <!-- Particle Background -->
    <div id="particles-js"></div>
    
    <!-- Magical Particles Overlay -->
    <div id="magical-particles"></div>
    
    <!-- Main Application Container -->
    <div class="app-container">
        <!-- Enhanced Header -->
        <header class="app-header">
            <div class="header-content">
                <div class="logo-section">
                    <img src="img/portnox-logo.png" alt="Portnox Logo" class="company-logo">
                    <div class="app-title">
                        <h1>Total Cost Analyzer</h1>
                        <p class="subtitle">Zero Trust NAC Solution Comparison Platform</p>
                    </div>
                </div>
                <div class="header-actions">
                    <button id="launch-wizard" class="btn btn-primary btn-magical">
                        <i class="fas fa-hat-wizard"></i>
                        <span>Launch Setup Wizard</span>
                        <span class="sparkle"></span>
                    </button>
                    <button id="sensitivity-toggle" class="btn btn-outline btn-icon" title="Sensitivity Analysis">
                        <i class="fas fa-chart-line"></i>
                        <span>Sensitivity</span>
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
        
        <!-- Main Calculator Container - Shows by default -->
        <main class="calculator-container">
            <!-- Quick Actions Bar -->
            <div class="quick-actions">
                <div class="action-card">
                    <i class="fas fa-magic"></i>
                    <h3>Quick Analysis</h3>
                    <p>Using industry defaults</p>
                    <button class="btn btn-outline btn-sm" id="quick-customize">
                        Customize Parameters
                    </button>
                </div>
                <div class="action-card">
                    <i class="fas fa-chart-bar"></i>
                    <h3>Default Comparison</h3>
                    <p>Cisco ISE vs Portnox Cloud</p>
                    <button class="btn btn-outline btn-sm" id="change-vendors">
                        Change Vendors
                    </button>
                </div>
                <div class="action-card">
                    <i class="fas fa-cogs"></i>
                    <h3>Current Settings</h3>
                    <p>Enterprise (5000 devices)</p>
                    <button class="btn btn-outline btn-sm" id="modify-settings">
                        Modify Settings
                    </button>
                </div>
            </div>
            
            <!-- Results Container - Shows by default with sample data -->
            <div class="results-container" id="results-container">
                <!-- Results Navigation -->
                <div class="results-nav">
                    <div class="results-tabs">
                        <button class="result-tab active" data-tab="overview">Overview</button>
                        <button class="result-tab" data-tab="comparison">Cost Comparison</button>
                        <button class="result-tab" data-tab="implementation">Implementation</button>
                        <button class="result-tab" data-tab="features">Features</button>
                        <button class="result-tab" data-tab="roi">ROI Analysis</button>
                        <button class="result-tab" data-tab="risk">Risk Analysis</button>
                        <button class="result-tab" data-tab="sensitivity">Sensitivity</button>
                    </div>
                    
                    <div class="results-actions">
                        <button id="export-pdf" class="btn btn-outline">
                            <i class="fas fa-file-pdf"></i> Export PDF
                        </button>
                        <button id="share-results" class="btn btn-outline">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
                
                <!-- Results Content -->
                <div class="results-content">
                    <!-- Default content loads here -->
                </div>
            </div>
        </main>
        
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
            </div>
        </footer>
    </div>
    
    <!-- Magical Wizard Popup -->
    <div id="wizard-overlay" class="wizard-overlay">
        <div class="wizard-popup">
            <!-- Wizard Character -->
            <div class="wizard-character">
                <div class="wizard-avatar">
                    <i class="fas fa-hat-wizard"></i>
                </div>
                <div class="wizard-speech">
                    <p id="wizard-message">Welcome! I'm your TCO Wizard. Let me guide you through a magical journey of cost analysis!</p>
                </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="wizard-progress">
                <div class="progress-track">
                    <div class="progress-fill" id="wizard-progress-fill"></div>
                    <div class="progress-markers">
                        <div class="progress-marker active" data-step="1">
                            <i class="fas fa-building"></i>
                            <span>Vendor</span>
                        </div>
                        <div class="progress-marker" data-step="2">
                            <i class="fas fa-industry"></i>
                            <span>Industry</span>
                        </div>
                        <div class="progress-marker" data-step="3">
                            <i class="fas fa-network-wired"></i>
                            <span>Organization</span>
                        </div>
                        <div class="progress-marker" data-step="4">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Costs</span>
                        </div>
                        <div class="progress-marker" data-step="5">
                            <i class="fas fa-calculator"></i>
                            <span>Review</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Wizard Content -->
            <div class="wizard-content">
                <!-- Step 1: Vendor Selection -->
                <div class="wizard-step active" id="step-1" data-step="1">
                    <div class="step-header magical">
                        <h2>Choose Your Current Champion</h2>
                        <p>Select the NAC warrior currently defending your digital realm</p>
                        <div class="magical-icon floating">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                    </div>
                    
                    <div class="vendor-grid magical">
                        <div class="vendor-card enchanted" data-vendor="cisco">
                            <div class="vendor-glow"></div>
                            <div class="vendor-logo">
                                <img src="img/vendors/cisco-logo.png" alt="Cisco ISE">
                            </div>
                            <div class="vendor-info">
                                <h3>Cisco ISE</h3>
                                <p>The Enterprise Titan</p>
                                <div class="vendor-stats">
                                    <span><i class="fas fa-coins"></i> High Cost</span>
                                    <span><i class="fas fa-shield-alt"></i> Strong Defense</span>
                                </div>
                            </div>
                            <div class="vendor-sparkle"></div>
                        </div>
                        
                        <div class="vendor-card enchanted" data-vendor="aruba">
                            <div class="vendor-glow"></div>
                            <div class="vendor-logo">
                                <img src="img/vendors/aruba-logo.png" alt="Aruba ClearPass">
                            </div>
                            <div class="vendor-info">
                                <h3>Aruba ClearPass</h3>
                                <p>The Policy Sage</p>
                                <div class="vendor-stats">
                                    <span><i class="fas fa-balance-scale"></i> Balanced</span>
                                    <span><i class="fas fa-wifi"></i> Wireless Master</span>
                                </div>
                            </div>
                            <div class="vendor-sparkle"></div>
                        </div>
                        
                        <div class="vendor-card enchanted" data-vendor="forescout">
                            <div class="vendor-glow"></div>
                            <div class="vendor-logo">
                                <img src="img/vendors/forescout-logo.png" alt="Forescout">
                            </div>
                            <div class="vendor-info">
                                <h3>Forescout</h3>
                                <p>The All-Seeing Eye</p>
                                <div class="vendor-stats">
                                    <span><i class="fas fa-eye"></i> Visibility</span>
                                    <span><i class="fas fa-magic"></i> Agentless</span>
                                </div>
                            </div>
                            <div class="vendor-sparkle"></div>
                        </div>
                        
                        <div class="vendor-card enchanted" data-vendor="fortinac">
                            <div class="vendor-glow"></div>
                            <div class="vendor-logo">
                                <img src="img/vendors/fortinac-logo.png" alt="FortiNAC">
                            </div>
                            <div class="vendor-info">
                                <h3>FortiNAC</h3>
                                <p>The Fortress Guard</p>
                                <div class="vendor-stats">
                                    <span><i class="fas fa-chess-rook"></i> Integrated</span>
                                    <span><i class="fas fa-lock"></i> Security Focus</span>
                                </div>
                            </div>
                            <div class="vendor-sparkle"></div>
                        </div>
                        
                        <div class="vendor-card enchanted no-nac" data-vendor="noNac">
                            <div class="vendor-glow danger"></div>
                            <div class="vendor-logo">
                                <i class="fas fa-dragon"></i>
                            </div>
                            <div class="vendor-info">
                                <h3>No NAC Solution</h3>
                                <p>The Unguarded Realm</p>
                                <div class="vendor-stats">
                                    <span><i class="fas fa-exclamation-triangle"></i> High Risk</span>
                                    <span><i class="fas fa-skull-crossbones"></i> Vulnerable</span>
                                </div>
                            </div>
                            <div class="vendor-sparkle danger"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Industry & Compliance -->
                <div class="wizard-step" id="step-2" data-step="2">
                    <div class="step-header magical">
                        <h2>Your Business Realm</h2>
                        <p>Choose your industry and the ancient scrolls of compliance that govern your domain</p>
                        <div class="magical-icon rotating">
                            <i class="fas fa-scroll"></i>
                        </div>
                    </div>
                    
                    <div class="industry-selector magical">
                        <div class="industry-cards">
                            <div class="industry-card" data-industry="healthcare">
                                <i class="fas fa-heartbeat"></i>
                                <h3>Healthcare</h3>
                                <p>Healers of the Digital Age</p>
                            </div>
                            <div class="industry-card" data-industry="financial">
                                <i class="fas fa-university"></i>
                                <h3>Financial Services</h3>
                                <p>Guardians of Digital Gold</p>
                            </div>
                            <div class="industry-card" data-industry="education">
                                <i class="fas fa-graduation-cap"></i>
                                <h3>Education</h3>
                                <p>Masters of Knowledge</p>
                            </div>
                            <div class="industry-card" data-industry="government">
                                <i class="fas fa-landmark"></i>
                                <h3>Government</h3>
                                <p>Protectors of the Realm</p>
                            </div>
                            <div class="industry-card" data-industry="manufacturing">
                                <i class="fas fa-industry"></i>
                                <h3>Manufacturing</h3>
                                <p>Forgers of Progress</p>
                            </div>
                            <div class="industry-card" data-industry="retail">
                                <i class="fas fa-shopping-cart"></i>
                                <h3>Retail</h3>
                                <p>Merchants of the Digital Bazaar</p>
                            </div>
                            <div class="industry-card" data-industry="technology">
                                <i class="fas fa-microchip"></i>
                                <h3>Technology</h3>
                                <p>Wizards of Innovation</p>
                            </div>
                            <div class="industry-card" data-industry="energy">
                                <i class="fas fa-bolt"></i>
                                <h3>Energy & Utilities</h3>
                                <p>Masters of Power</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="compliance-scrolls" id="compliance-scrolls">
                        <h3>Ancient Scrolls of Compliance</h3>
                        <div class="scrolls-container">
                            <!-- Populated dynamically based on industry -->
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Organization Details -->
                <div class="wizard-step" id="step-3" data-step="3">
                    <div class="step-header magical">
                        <h2>Your Digital Kingdom</h2>
                        <p>Tell me about the size and nature of your technological realm</p>
                        <div class="magical-icon bouncing">
                            <i class="fas fa-crown"></i>
                        </div>
                    </div>
                    
                    <div class="kingdom-builder">
                        <div class="kingdom-card">
                            <div class="card-icon">
                                <i class="fas fa-chess-king"></i>
                            </div>
                            <h3>Kingdom Size</h3>
                            <select id="organization-size" class="magical-select">
                                <option value="small">Small Kingdom (< 1,000 subjects)</option>
                                <option value="medium">Medium Kingdom (1,000-5,000 subjects)</option>
                                <option value="large">Large Kingdom (5,000-10,000 subjects)</option>
                                <option value="empire">Vast Empire (10,000+ subjects)</option>
                            </select>
                        </div>
                        
                        <div class="kingdom-card">
                            <div class="card-icon">
                                <i class="fas fa-desktop"></i>
                            </div>
                            <h3>Digital Devices</h3>
                            <div class="magical-slider">
                                <input type="range" id="device-count" min="100" max="50000" value="5000">
                                <div class="slider-value">
                                    <span id="device-count-value">5,000</span>
                                    <i class="fas fa-users"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="kingdom-card">
                            <div class="card-icon">
                                <i class="fas fa-map-marked-alt"></i>
                            </div>
                            <h3>Territories</h3>
                            <div class="magical-slider">
                                <input type="range" id="locations" min="1" max="100" value="10">
                                <div class="slider-value">
                                    <span id="locations-value">10</span>
                                    <i class="fas fa-flag"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="kingdom-features">
                            <h3>Kingdom Features</h3>
                            <div class="feature-grid">
                                <label class="feature-option">
                                    <input type="checkbox" id="cloud-integration">
                                    <span class="feature-box">
                                        <i class="fas fa-cloud"></i>
                                        Cloud Magic
                                    </span>
                                </label>
                                <label class="feature-option">
                                    <input type="checkbox" id="legacy-devices">
                                    <span class="feature-box">
                                        <i class="fas fa-hourglass-half"></i>
                                        Ancient Artifacts
                                    </span>
                                </label>
                                <label class="feature-option">
                                    <input type="checkbox" id="byod-support">
                                    <span class="feature-box">
                                        <i class="fas fa-mobile-alt"></i>
                                        Wanderer Devices
                                    </span>
                                </label>
                                <label class="feature-option">
                                    <input type="checkbox" id="remote-access">
                                    <span class="feature-box">
                                        <i class="fas fa-home"></i>
                                        Remote Portals
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Cost Configuration -->
                <div class="wizard-step" id="step-4" data-step="4">
                    <div class="step-header magical">
                        <h2>The Treasury of Costs</h2>
                        <p>Let's delve into the golden details of your magical budget</p>
                        <div class="magical-icon spinning">
                            <i class="fas fa-coins"></i>
                        </div>
                    </div>
                    
                    <div class="treasury-vault">
                        <div class="vault-section">
                            <h3><i class="fas fa-user-tie"></i> Royal Court Costs</h3>
                            <div class="cost-controls">
                                <div class="cost-item">
                                    <label>Wizard Salary (FTE Cost)</label>
                                    <div class="cost-input-group">
                                        <i class="fas fa-dollar-sign"></i>
                                        <input type="range" id="fte-cost" min="60000" max="200000" value="120000">
                                        <span class="cost-value">$120,000</span>
                                    </div>
                                </div>
                                <div class="cost-item">
                                    <label>Wizard Dedication (%)</label>
                                    <div class="cost-input-group">
                                        <i class="fas fa-percentage"></i>
                                        <input type="range" id="fte-allocation" min="10" max="100" value="50">
                                        <span class="cost-value">50%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vault-section">
                            <h3><i class="fas fa-tools"></i> Maintenance Magic</h3>
                            <div class="cost-controls">
                                <div class="cost-item">
                                    <label>Annual Enchantment (%)</label>
                                    <div class="cost-input-group">
                                        <i class="fas fa-magic"></i>
                                        <input type="range" id="maintenance-percentage" min="10" max="30" value="18">
                                        <span class="cost-value">18%</span>
                                    </div>
                                </div>
                                <div class="cost-item">
                                    <label>Downtime Dragon Damage ($/hour)</label>
                                    <div class="cost-input-group">
                                        <i class="fas fa-dragon"></i>
                                        <input type="range" id="downtime-cost" min="1000" max="50000" value="10000">
                                        <span class="cost-value">$10,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vault-section">
                            <h3><i class="fas fa-bolt"></i> Portnox Cloud Magic</h3>
                            <div class="portnox-pricing magical">
                                <div class="pricing-crystal">
                                    <div class="crystal-glow"></div>
                                    <div class="crystal-value">
                                        <span class="currency">$</span>
                                        <span id="effective-price">3.20</span>
                                        <span class="period">/device/month</span>
                                    </div>
                                </div>
                                <div class="pricing-controls">
                                    <div class="pricing-slider">
                                        <label>Base Crystal Power</label>
                                        <input type="range" id="portnox-base-price" min="1" max="10" step="0.5" value="4">
                                        <span>$4.00</span>
                                    </div>
                                    <div class="pricing-slider">
                                        <label>Volume Enchantment (%)</label>
                                        <input type="range" id="portnox-discount" min="0" max="50" value="20">
                                        <span>20%</span>
                                    </div>
                                </div>
                                <div class="annual-projection">
                                    <h4>Annual Treasury Impact</h4>
                                    <div class="projection-value">
                                        <i class="fas fa-treasure-chest"></i>
                                        <span id="annual-cost">$192,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5: Review & Calculate -->
                <div class="wizard-step" id="step-5" data-step="5">
                    <div class="step-header magical">
                        <h2>The Final Incantation</h2>
                        <p>Review your magical configuration before I cast the calculation spell!</p>
                        <div class="magical-icon pulsing">
                            <i class="fas fa-magic"></i>
                        </div>
                    </div>
                    
                    <div class="spell-summary">
                        <div class="summary-scroll">
                            <h3><i class="fas fa-scroll"></i> Your Magical Configuration</h3>
                            <div class="summary-content" id="wizard-summary">
                                <!-- Populated dynamically -->
                            </div>
                        </div>
                        
                        <div class="casting-circle">
                            <div class="circle-animation">
                                <div class="inner-circle"></div>
                                <div class="middle-circle"></div>
                                <div class="outer-circle"></div>
                            </div>
                            <button id="cast-spell" class="btn btn-magical btn-large">
                                <i class="fas fa-wand-magic-sparkles"></i>
                                Cast Calculation Spell
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Wizard Navigation -->
            <div class="wizard-navigation">
                <button id="wizard-prev" class="btn btn-outline" disabled>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button id="wizard-close" class="btn btn-outline">
                    <i class="fas fa-times"></i> Close Wizard
                </button>
                <button id="wizard-next" class="btn btn-primary">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
    
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="loading-spinner magical">
            <div class="spell-circle"></div>
            <i class="fas fa-hat-wizard"></i>
            <p>Casting calculation spell...</p>
        </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div id="toast-container" class="toast-container"></div>
    
    <!-- JavaScript Libraries -->
    <script src="libs/js/chart.min.js"></script>
    <script src="libs/js/chartjs-plugin-datalabels.min.js"></script>
    <script src="libs/js/d3.min.js"></script>
    <script src="libs/js/gsap.min.js"></script>
    <script src="libs/js/ScrollTrigger.min.js"></script>
    <script src="libs/js/countUp.min.js"></script>
    <script src="libs/js/aos.js"></script>
    <script src="libs/js/particles.min.js"></script>
    <script src="libs/js/lodash.min.js"></script>
    <script src="libs/js/jspdf.umd.min.js"></script>
    <script src="libs/js/jspdf.plugin.autotable.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/core/helpers.js"></script>
    <script src="js/core/dom.js"></script>
    <script src="js/core/validation.js"></script>
    
    <!-- Managers -->
    <script src="js/managers/loading.js"></script>
    <script src="js/managers/notification.js"></script>
    <script src="js/managers/wizard.js"></script>
    <script src="js/managers/state.js"></script>
    
    <!-- Components -->
    <script src="js/components/enhanced-ui.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/sensitivity.js"></script>
    <script src="js/components/charts.js"></script>
    
    <!-- Data -->
    <script src="js/data/enhanced-vendors.js"></script>
    <script src="js/data/industry.js"></script>
    <script src="js/data/compliance.js"></script>
    
    <!-- Charts -->
    <script src="js/charts/enhanced-charts.js"></script>
    
    <!-- Reports -->
    <script src="js/reports/generator.js"></script>
    
    <!-- Main Application -->
    <script src="js/main.js"></script>
</body>
</html>
EOF

# Create magical wizard CSS
echo "🎨 Creating magical wizard styles..."
cat > css/magical-wizard.css << 'EOF'
/* Magical Wizard Styles */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

/* Magical Variables */
:root {
  --magic-purple: #8B5CF6;
  --magic-blue: #3B82F6;
  --magic-gold: #FBBF24;
  --magic-green: #10B981;
  --dragon-red: #EF4444;
  --wizard-font: 'Cinzel', serif;
}

/* Magical Button */
.btn-magical {
  background: linear-gradient(45deg, var(--magic-purple), var(--magic-blue));
  color: white;
  position: relative;
  overflow: hidden;
  font-family: var(--wizard-font);
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.btn-magical:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
}

.btn-magical .sparkle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

/* Wizard Overlay */
.wizard-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.wizard-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Wizard Popup */
.wizard-popup {
  background: linear-gradient(to bottom, #1e1b3c, #2d2654);
  border: 2px solid var(--magic-gold);
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  color: white;
}

/* Wizard Character */
.wizard-character {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.wizard-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, var(--magic-purple), var(--magic-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.wizard-speech {
  position: absolute;
  top: 70px;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 250px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wizard-character:hover .wizard-speech {
  opacity: 1;
}

/* Magical Progress Bar */
.wizard-progress {
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(251, 191, 36, 0.3);
}

.progress-track {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--magic-purple), var(--magic-blue), var(--magic-gold));
  border-radius: 4px;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.progress-markers {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.progress-marker {
  text-align: center;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.progress-marker.active {
  opacity: 1;
  transform: scale(1.1);
}

.progress-marker i {
  display: block;
  font-size: 24px;
  margin-bottom: 5px;
  color: var(--magic-gold);
}

.progress-marker span {
  font-size: 12px;
  font-family: var(--wizard-font);
}

/* Wizard Content */
.wizard-content {
  padding: 20px 40px;
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

.wizard-step {
  display: none;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.wizard-step.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Magical Step Headers */
.step-header.magical {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.step-header h2 {
  font-family: var(--wizard-font);
  font-size: 32px;
  color: var(--magic-gold);
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.step-header p {
  color: #a5b4fc;
  font-size: 18px;
  margin-bottom: 20px;
}

.magical-icon {
  font-size: 48px;
  color: var(--magic-gold);
  margin: 20px 0;
}

.magical-icon.floating {
  animation: float 3s ease-in-out infinite;
}

.magical-icon.rotating {
  animation: rotate 8s linear infinite;
}

.magical-icon.bouncing {
  animation: bounce 2s ease-in-out infinite;
}

.magical-icon.spinning {
  animation: spin 3s linear infinite;
}

.magical-icon.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

/* Enchanted Vendor Cards */
.vendor-grid.magical {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.vendor-card.enchanted {
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.vendor-card.enchanted:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: var(--magic-gold);
}

.vendor-card.enchanted.selected {
  border-color: var(--magic-gold);
  background: rgba(251, 191, 36, 0.1);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
}

.vendor-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.vendor-card:hover .vendor-glow {
  opacity: 1;
}

.vendor-sparkle {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  pointer-events: none;
}

.vendor-sparkle::before,
.vendor-sparkle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: var(--magic-gold);
  border-radius: 50%;
  animation: sparkle-move 2s ease-in-out infinite;
}

.vendor-sparkle::after {
  animation-delay: 1s;
}

@keyframes sparkle-move {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  50% { transform: translate(calc(-50% + 10px), calc(-50% - 10px)) scale(1); opacity: 1; }
  100% { transform: translate(calc(-50% + 20px), calc(-50% - 20px)) scale(0); opacity: 0; }
}

.vendor-stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
}

.vendor-stats span {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #a5b4fc;
}

.vendor-stats i {
  color: var(--magic-gold);
}

/* Industry Cards */
.industry-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 30px 0;
}

.industry-card {
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.industry-card:hover {
  transform: translateY(-3px);
  border-color: var(--magic-blue);
  background: rgba(59, 130, 246, 0.1);
}

.industry-card.selected {
  border-color: var(--magic-blue);
  background: rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.industry-card i {
  font-size: 32px;
  color: var(--magic-blue);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.industry-card:hover i {
  transform: scale(1.1);
}

.industry-card h3 {
  font-family: var(--wizard-font);
  font-size: 16px;
  margin-bottom: 5px;
}

.industry-card p {
  font-size: 12px;
  color: #a5b4fc;
}

/* Compliance Scrolls */
.compliance-scrolls {
  margin-top: 40px;
}

.scrolls-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.compliance-scroll {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(139, 92, 246, 0.1));
  border: 2px solid var(--magic-gold);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.compliance-scroll::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="20" font-size="20" opacity="0.1">§ ※ ¤ ◊ ∞</text></svg>');
  opacity: 0.1;
  pointer-events: none;
}

.compliance-scroll:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.3);
}

.compliance-scroll.selected {
  background: rgba(251, 191, 36, 0.2);
  border-color: var(--magic-green);
}

.scroll-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.scroll-header i {
  color: var(--magic-gold);
  font-size: 20px;
}

.scroll-header h4 {
  font-family: var(--wizard-font);
  font-size: 18px;
  color: var(--magic-gold);
}

.scroll-description {
  font-size: 14px;
  color: #a5b4fc;
  margin-bottom: 10px;
}

.scroll-requirements {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.requirement-tag {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid var(--magic-green);
  border-radius: 15px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--magic-green);
}

/* Kingdom Builder */
.kingdom-builder {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.kingdom-card {
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, var(--magic-purple), var(--magic-blue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 24px;
  color: white;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.kingdom-card h3 {
  font-family: var(--wizard-font);
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--magic-gold);
}

.magical-select {
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--magic-purple);
  border-radius: 8px;
  padding: 10px;
  color: white;
  font-family: var(--wizard-font);
  cursor: pointer;
}

.magical-select:focus {
  outline: none;
  border-color: var(--magic-gold);
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
}

.magical-slider {
  margin: 15px 0;
}

.magical-slider input[type="range"] {
  width: 100%;
  height: 8px;
  background: linear-gradient(to right, var(--magic-purple) 0%, var(--magic-blue) 50%, var(--magic-gold) 100%);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
}

.magical-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--magic-gold);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
}

.slider-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 24px;
  color: var(--magic-gold);
  font-family: var(--wizard-font);
}

/* Kingdom Features */
.kingdom-features {
  grid-column: 1 / -1;
  margin-top: 30px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.feature-option {
  cursor: pointer;
}

.feature-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-option input:checked + .feature-box {
  border-color: var(--magic-green);
  background: rgba(16, 185, 129, 0.1);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.feature-box i {
  font-size: 32px;
  color: var(--magic-blue);
}

/* Treasury Vault */
.treasury-vault {
  display: grid;
  gap: 30px;
}

.vault-section {
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 15px;
  padding: 25px;
}

.vault-section h3 {
  font-family: var(--wizard-font);
  font-size: 20px;
  color: var(--magic-gold);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cost-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.cost-item {
  text-align: left;
}

.cost-item label {
  display: block;
  margin-bottom: 10px;
  color: #a5b4fc;
  font-size: 14px;
}

.cost-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--magic-purple);
  border-radius: 10px;
  padding: 10px;
}

.cost-input-group i {
  color: var(--magic-gold);
  font-size: 18px;
}

.cost-value {
  color: var(--magic-gold);
  font-family: var(--wizard-font);
  font-size: 18px;
  font-weight: bold;
}

/* Portnox Pricing Crystal */
.portnox-pricing.magical {
  text-align: center;
}

.pricing-crystal {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
}

.crystal-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  animation: crystal-pulse 3s ease-in-out infinite;
}

@keyframes crystal-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
}

.crystal-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(45deg, var(--magic-blue), var(--magic-purple));
  width: 150px;
  height: 150px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  animation: crystal-float 6s ease-in-out infinite;
}

@keyframes crystal-float {
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-50%, -55%) rotate(5deg); }
  75% { transform: translate(-50%, -45%) rotate(-5deg); }
}

.crystal-value .currency {
  font-size: 24px;
  color: white;
  opacity: 0.8;
}

.crystal-value #effective-price {
  font-size: 48px;
  font-weight: bold;
  color: white;
  font-family: var(--wizard-font);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.crystal-value .period {
  font-size: 14px;
  color: white;
  opacity: 0.8;
}

/* Casting Circle */
.casting-circle {
  text-align: center;
  margin: 40px 0;
}

.circle-animation {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 30px;
}

.circle-animation div {
  position: absolute;
  border: 2px solid var(--magic-gold);
  border-radius: 50%;
  opacity: 0.3;
}

.inner-circle {
  top: 100px;
  left: 100px;
  width: 100px;
  height: 100px;
  animation: rotate 3s linear infinite;
}

.middle-circle {
  top: 50px;
  left: 50px;
  width: 200px;
  height: 200px;
  animation: rotate 5s linear infinite reverse;
}

.outer-circle {
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  animation: rotate 7s linear infinite;
}

.btn-magical.btn-large {
  padding: 15px 40px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

/* Loading Overlay Magical */
.loading-spinner.magical {
  text-align: center;
}

.spell-circle {
  width: 100px;
  height: 100px;
  border: 3px solid var(--magic-gold);
  border-radius: 50%;
  border-top-color: transparent;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

.loading-spinner i {
  font-size: 48px;
  color: var(--magic-gold);
  margin-bottom: 15px;
  animation: bounce 1s ease-in-out infinite;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.action-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.action-card i {
  font-size: 48px;
  color: var(--primary-color);
  margin-bottom: 15px;
}

.action-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}

.action-card p {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

/* Magical Particles */
#magical-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--magic-gold);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--magic-gold);
  animation: float-particle 10s linear infinite;
  opacity: 0;
}

@keyframes float-particle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Dark mode adjustments */
body.dark-mode .wizard-popup {
  background: linear-gradient(to bottom, #0f0e1a, #1a1832);
}

body.dark-mode .wizard-speech {
  background: rgba(255, 255, 255, 0.1);
}

body.dark-mode .action-card {
  background: var(--dark-bg-secondary);
  color: var(--dark-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .wizard-popup {
    width: 95%;
  }
  
  .vendor-grid.magical {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .industry-cards {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .kingdom-builder {
    grid-template-columns: 1fr;
  }
  
  .feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .cost-controls {
    grid-template-columns: 1fr;
  }
}
EOF

# Create enhanced compliance data with more frameworks
echo "📝 Creating expanded compliance data..."
cat > js/data/compliance.js << 'EOF'
// Comprehensive Compliance Frameworks Data
const ComplianceData = {
    frameworks: {
        // Healthcare
        HIPAA: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Protects sensitive patient health information',
            icon: '🏥',
            industries: ['healthcare'],
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Transmission security',
                'Encryption requirements'
            ],
            severity: 'critical'
        },
        HITECH: {
            name: 'HITECH',
            fullName: 'Health Information Technology for Economic and Clinical Health Act',
            description: 'Strengthens HIPAA enforcement and breach notification',
            icon: '⚕️',
            industries: ['healthcare'],
            requirements: [
                'Enhanced breach notification',
                'Increased penalties',
                'EHR compliance',
                'Meaningful use requirements'
            ],
            severity: 'high'
        },
        
        // Financial
        'PCI DSS': {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Secures credit card transactions and cardholder data',
            icon: '💳',
            industries: ['financial', 'retail', 'hospitality'],
            requirements: [
                'Network segmentation',
                'Access control',
                'Regular security testing',
                'Information security policy',
                'Encryption of cardholder data'
            ],
            severity: 'critical'
        },
        SOX: {
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            description: 'Financial reporting and corporate governance requirements',
            icon: '📊',
            industries: ['financial'],
            requirements: [
                'Internal controls',
                'Audit trails',
                'Access management',
                'Change management',
                'Financial data integrity'
            ],
            severity: 'high'
        },
        GLBA: {
            name: 'GLBA',
            fullName: 'Gramm-Leach-Bliley Act',
            description: 'Financial privacy and data protection',
            icon: '🏦',
            industries: ['financial'],
            requirements: [
                'Customer privacy protection',
                'Information security program',
                'Risk assessment',
                'Employee training'
            ],
            severity: 'high'
        },
        
        // Government
        FISMA: {
            name: 'FISMA',
            fullName: 'Federal Information Security Management Act',
            description: 'Federal government information security',
            icon: '🏛️',
            industries: ['government'],
            requirements: [
                'Risk assessment',
                'Security controls',
                'Continuous monitoring',
                'Incident response',
                'Security authorization'
            ],
            severity: 'critical'
        },
        FedRAMP: {
            name: 'FedRAMP',
            fullName: 'Federal Risk and Authorization Management Program',
            description: 'Cloud security assessment for federal agencies',
            icon: '☁️',
            industries: ['government', 'technology'],
            requirements: [
                'Security assessment',
                'Cloud security controls',
                'Continuous monitoring',
                'Authorization process'
            ],
            severity: 'high'
        },
        CMMC: {
            name: 'CMMC',
            fullName: 'Cybersecurity Maturity Model Certification',
            description: 'DoD contractor cybersecurity requirements',
            icon: '🛡️',
            industries: ['government', 'defense', 'manufacturing'],
            requirements: [
                'Access control',
                'Incident response',
                'Risk management',
                'Security assessment',
                'System integrity'
            ],
            severity: 'critical'
        },
        
        // General Standards
        'ISO 27001': {
            name: 'ISO 27001',
            fullName: 'Information Security Management System',
            description: 'International information security standard',
            icon: '🔐',
            industries: ['all'],
            requirements: [
                'Risk management',
                'Asset management',
                'Access control',
                'Incident management',
                'Business continuity'
            ],
            severity: 'high'
        },
        'NIST CSF': {
            name: 'NIST CSF',
            fullName: 'NIST Cybersecurity Framework',
            description: 'Voluntary framework for managing cybersecurity risk',
            icon: '📋',
            industries: ['all'],
            requirements: [
                'Identify assets',
                'Protect systems',
                'Detect events',
                'Respond to incidents',
                'Recover operations'
            ],
            severity: 'medium'
        },
        CIS: {
            name: 'CIS Controls',
            fullName: 'Center for Internet Security Critical Security Controls',
            description: 'Prioritized cybersecurity best practices',
            icon: '🔧',
            industries: ['all'],
            requirements: [
                'Inventory management',
                'Data protection',
                'Secure configuration',
                'Access management',
                'Malware defense'
            ],
            severity: 'high'
        },
        
        // Privacy Regulations
        GDPR: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            description: 'EU data protection and privacy regulation',
            icon: '🇪🇺',
            industries: ['all'],
            requirements: [
                'Consent management',
                'Data protection',
                'Breach notification',
                'Privacy by design',
                'Right to erasure'
            ],
            severity: 'critical'
        },
        CCPA: {
            name: 'CCPA',
            fullName: 'California Consumer Privacy Act',
            description: 'California state privacy law',
            icon: '🐻',
            industries: ['all'],
            requirements: [
                'Consumer rights',
                'Data disclosure',
                'Opt-out mechanisms',
                'Data inventory',
                'Security measures'
            ],
            severity: 'high'
        },
        
        // Education
        FERPA: {
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            description: 'Student education records privacy',
            icon: '🎓',
            industries: ['education'],
            requirements: [
                'Access controls',
                'Audit logs',
                'Data encryption',
                'Consent management',
                'Directory information'
            ],
            severity: 'high'
        },
        COPPA: {
            name: 'COPPA',
            fullName: 'Children\'s Online Privacy Protection Act',
            description: 'Children\'s online privacy protection',
            icon: '👶',
            industries: ['education', 'technology'],
            requirements: [
                'Parental consent',
                'Data minimization',
                'Disclosure requirements',
                'Data deletion rights'
            ],
            severity: 'high'
        },
        
        // Industry Specific
        'NERC CIP': {
            name: 'NERC CIP',
            fullName: 'NERC Critical Infrastructure Protection',
            description: 'Electric grid cybersecurity standards',
            icon: '⚡',
            industries: ['energy'],
            requirements: [
                'Critical asset identification',
                'Security management',
                'Personnel training',
                'Electronic security',
                'Incident reporting'
            ],
            severity: 'critical'
        },
        'IEC 62443': {
            name: 'IEC 62443',
            fullName: 'Industrial Automation and Control Systems Security',
            description: 'Industrial control systems security standard',
            icon: '🏭',
            industries: ['manufacturing', 'energy'],
            requirements: [
                'Security levels',
                'Zone segmentation',
                'Access control',
                'System hardening',
                'Security monitoring'
            ],
            severity: 'high'
        },
        'FDA 21 CFR Part 11': {
            name: 'FDA 21 CFR Part 11',
            fullName: 'FDA Electronic Records and Signatures',
            description: 'FDA requirements for electronic records',
            icon: '💊',
            industries: ['healthcare', 'pharmaceutical'],
            requirements: [
                'Electronic signatures',
                'Audit trails',
                'Record retention',
                'System validation',
                'Access controls'
            ],
            severity: 'high'
        }
    },

    getFrameworksByIndustry(industry) {
        return Object.values(this.frameworks).filter(framework => 
            framework.industries.includes(industry) || framework.industries.includes('all')
        );
    },

    getFramework(name) {
        return this.frameworks[name] || null;
    },

    getSeverityColor(severity) {
        const colors = {
            critical: '#ef4444',
            high: '#f59e0b',
            medium: '#3b82f6',
            low: '#10b981'
        };
        return colors[severity] || colors.medium;
    },

    getSeverityIcon(severity) {
        const icons = {
            critical: '🚨',
            high: '⚠️',
            medium: '📊',
            low: '✓'
        };
        return icons[severity] || icons.medium;
    }
};

// Export for use
window.ComplianceData = ComplianceData;
EOF

# Create new magical wizard manager
echo "📝 Creating magical wizard manager..."
cat > js/managers/wizard.js << 'EOF'
// Magical Wizard Manager
class MagicalWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.data = {};
        this.wizardElement = null;
        this.messages = {
            1: "Welcome, brave soul! Let's discover which NAC champion currently guards your digital realm.",
            2: "Ah, now tell me about your industry and the ancient scrolls of compliance that bind you.",
            3: "Describe your kingdom - how vast is your digital domain?",
            4: "Let's peek into your treasury and see how your gold is allocated.",
            5: "The spell is almost ready! Review your choices before I cast the mighty calculation spell!"
        };
        this.init();
    }

    init() {
        this.wizardElement = document.getElementById('wizard-overlay');
        this.setupEventListeners();
        this.createMagicalParticles();
        this.loadDefaultResults();
    }

    setupEventListeners() {
        // Launch wizard button
        const launchBtn = document.getElementById('launch-wizard');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => this.openWizard());
        }

        // Quick action buttons
        const quickCustomize = document.getElementById('quick-customize');
        const changeVendors = document.getElementById('change-vendors');
        const modifySettings = document.getElementById('modify-settings');

        if (quickCustomize) {
            quickCustomize.addEventListener('click', () => {
                this.openWizard(4); // Open at cost configuration
            });
        }

        if (changeVendors) {
            changeVendors.addEventListener('click', () => {
                this.openWizard(1); // Open at vendor selection
            });
        }

        if (modifySettings) {
            modifySettings.addEventListener('click', () => {
                this.openWizard(3); // Open at organization settings
            });
        }

        // Navigation buttons
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');
        const closeBtn = document.getElementById('wizard-close');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeWizard());
        }

        // Cast spell button
        const castBtn = document.getElementById('cast-spell');
        if (castBtn) {
            castBtn.addEventListener('click', () => this.castCalculationSpell());
        }

        // Close on overlay click
        this.wizardElement.addEventListener('click', (e) => {
            if (e.target === this.wizardElement) {
                this.closeWizard();
            }
        });
    }

    createMagicalParticles() {
        const particlesContainer = document.getElementById('magical-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    openWizard(startStep = 1) {
        this.currentStep = startStep;
        this.wizardElement.classList.add('active');
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateWizardMessage();
        this.animateWizardEntrance();
    }

    closeWizard() {
        this.animateWizardExit().then(() => {
            this.wizardElement.classList.remove('active');
        });
    }

    animateWizardEntrance() {
        const popup = this.wizardElement.querySelector('.wizard-popup');
        gsap.fromTo(popup, 
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
        );

        // Animate wizard character
        const wizardAvatar = this.wizardElement.querySelector('.wizard-avatar');
        gsap.fromTo(wizardAvatar,
            { rotation: -360, scale: 0 },
            { rotation: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
        );
    }

    animateWizardExit() {
        const popup = this.wizardElement.querySelector('.wizard-popup');
        return gsap.to(popup, {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: 'power2.in'
        });
    }

    showStep(step) {
        const steps = document.querySelectorAll('.wizard-step');
        steps.forEach(s => s.classList.remove('active'));

        const currentStep = document.getElementById(`step-${step}`);
        if (currentStep) {
            currentStep.classList.add('active');
            this.initializeStep(step);
        }
    }

    initializeStep(step) {
        switch(step) {
            case 1:
                this.initVendorSelection();
                break;
            case 2:
                this.initIndustrySelection();
                break;
            case 3:
                this.initOrganizationSetup();
                break;
            case 4:
                this.initCostConfiguration();
                break;
            case 5:
                this.initReviewStep();
                break;
        }
    }

    initVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card.enchanted');
        vendorCards.forEach((card, index) => {
            // Add entrance animation
            gsap.from(card, {
                opacity: 0,
                y: 50,
                rotation: -10,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            card.addEventListener('click', () => {
                vendorCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Magical selection effect
                gsap.fromTo(card,
                    { scale: 1 },
                    { 
                        scale: 1.05,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.inOut'
                    }
                );

                this.data.vendor = card.dataset.vendor;
            });
        });
    }

    initIndustrySelection() {
        const industryCards = document.querySelectorAll('.industry-card');
        industryCards.forEach((card, index) => {
            // Add entrance animation
            gsap.from(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });

            card.addEventListener('click', () => {
                industryCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.data.industry = card.dataset.industry;
                this.loadComplianceScrolls(card.dataset.industry);
            });
        });
    }

    loadComplianceScrolls(industry) {
        const container = document.querySelector('.scrolls-container');
        if (!container || !window.ComplianceData) return;

        const frameworks = window.ComplianceData.getFrameworksByIndustry(industry);
        
        container.innerHTML = frameworks.map((framework, index) => `
            <div class="compliance-scroll" data-framework="${framework.name}" style="animation-delay: ${index * 0.1}s">
                <div class="scroll-header">
                    <i class="fas fa-scroll"></i>
                    <h4>${framework.name}</h4>
                </div>
                <p class="scroll-description">${framework.description}</p>
                <div class="scroll-requirements">
                    ${framework.requirements.slice(0, 3).map(req => `
                        <span class="requirement-tag">${req}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Add click handlers to scrolls
        const scrolls = container.querySelectorAll('.compliance-scroll');
        scrolls.forEach((scroll, index) => {
            // Entrance animation
            gsap.from(scroll, {
                opacity: 0,
                x: -50,
                rotation: -5,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            scroll.addEventListener('click', () => {
                scroll.classList.toggle('selected');
            });
        });
    }

    initOrganizationSetup() {
        // Setup magical sliders
        const deviceSlider = document.getElementById('device-count');
        const locationSlider = document.getElementById('locations');

        if (deviceSlider) {
            deviceSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('device-count-value').textContent = 
                    parseInt(value).toLocaleString();
                this.data.deviceCount = parseInt(value);
            });
        }

        if (locationSlider) {
            locationSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('locations-value').textContent = value;
                this.data.locations = parseInt(value);
            });
        }

        // Kingdom features
        const features = document.querySelectorAll('.feature-option input');
        features.forEach(feature => {
            feature.addEventListener('change', () => {
                this.data[feature.id] = feature.checked;
            });
        });
    }

    initCostConfiguration() {
        // Initialize cost sliders
        const costSliders = document.querySelectorAll('.cost-input-group input[type="range"]');
        costSliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                const valueDisplay = e.target.parentElement.querySelector('.cost-value');
                
                if (slider.id.includes('cost') || slider.id.includes('downtime')) {
                    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
                } else if (slider.id.includes('percentage') || slider.id.includes('allocation')) {
                    valueDisplay.textContent = `${value}%`;
                }
                
                this.data[slider.id] = value;
            });
        });

        // Portnox pricing crystal
        const basePrice = document.getElementById('portnox-base-price');
        const discount = document.getElementById('portnox-discount');

        const updatePricing = () => {
            const base = parseFloat(basePrice.value);
            const disc = parseInt(discount.value);
            const effective = base * (1 - disc / 100);
            
            document.getElementById('effective-price').textContent = effective.toFixed(2);
            
            // Update annual cost
            const devices = this.data.deviceCount || 5000;
            const annual = effective * devices * 12;
            document.getElementById('annual-cost').textContent = `$${annual.toLocaleString()}`;
        };

        if (basePrice) basePrice.addEventListener('input', updatePricing);
        if (discount) discount.addEventListener('input', updatePricing);
    }

    initReviewStep() {
        // Populate summary
        const summaryContent = document.getElementById('wizard-summary');
        if (summaryContent) {
            summaryContent.innerHTML = this.generateSummary();
        }

        // Animate casting circle
        const circles = document.querySelectorAll('.circle-animation div');
        circles.forEach((circle, index) => {
            gsap.to(circle, {
                rotation: 360,
                duration: 3 + index,
                repeat: -1,
                ease: 'none'
            });
        });
    }

    generateSummary() {
        return `
            <div class="summary-item">
                <span class="summary-label">Current Champion:</span>
                <span class="summary-value">${this.data.vendor || 'Cisco ISE'}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Your Realm:</span>
                <span class="summary-value">${this.data.industry || 'Technology'}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Kingdom Size:</span>
                <span class="summary-value">${(this.data.deviceCount || 5000).toLocaleString()} devices</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Territories:</span>
                <span class="summary-value">${this.data.locations || 10} locations</span>
            </div>
        `;
    }

    updateProgress() {
        const progressFill = document.getElementById('wizard-progress-fill');
        const markers = document.querySelectorAll('.progress-marker');
        
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        }

        markers.forEach((marker, index) => {
            if (index + 1 <= this.currentStep) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }

    updateWizardMessage() {
        const messageElement = document.getElementById('wizard-message');
        if (messageElement) {
            messageElement.textContent = this.messages[this.currentStep];
            
            // Animate message change
            gsap.fromTo(messageElement,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateWizardMessage();
            this.updateNavigation();
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateWizardMessage();
            this.updateNavigation();
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-flex';
            }
        }
    }

    castCalculationSpell() {
        // Show magical loading
        if (window.LoadingManager) {
            window.LoadingManager.show('Casting calculation spell...');
        }

        // Simulate calculation
        setTimeout(() => {
            if (window.LoadingManager) {
                window.LoadingManager.hide();
            }
            this.closeWizard();
            this.updateResults();
        }, 2000);
    }

    updateResults() {
        // Update quick action cards with new data
        const deviceCount = this.data.deviceCount || 5000;
        const vendor = this.data.vendor || 'cisco';
        
        // Update action cards
        const settingsCard = document.querySelector('.action-card:nth-child(3) p');
        if (settingsCard) {
            settingsCard.textContent = `Enterprise (${deviceCount.toLocaleString()} devices)`;
        }

        // Trigger results update
        if (window.chartBuilder) {
            window.chartBuilder.createCharts({
                currentVendor: vendor,
                deviceCount: deviceCount,
                yearsToProject: 3
            });
        }
    }

    loadDefaultResults() {
        // Load default charts and data when page loads
        setTimeout(() => {
            if (window.chartBuilder) {
                window.chartBuilder.createCharts({
                    currentVendor: 'cisco',
                    deviceCount: 5000,
                    yearsToProject: 3
                });
            }
        }, 500);
    }
}

// Initialize magical wizard
window.magicalWizard = new MagicalWizard();
EOF

# Update main.js to initialize with default data
echo "📝 Updating main.js for default loading..."
cat > js/main.js << 'EOF'
// Total Cost Analyzer - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Total Cost Analyzer...');
    
    // Initialize particle background
    initParticleBackground();
    
    // Initialize theme
    initTheme();
    
    // Load default results immediately
    loadDefaultResults();
    
    // Initialize result tabs
    initResultsTabs();
    
    // Initialize animations
    initAnimations();
    
    console.log('✅ Application initialized successfully!');
});

// Initialize particle background
function initParticleBackground() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1a73e8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.1,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#1a73e8',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize theme handling
function initTheme() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeIcon(isDarkMode);
        });
    }
}

function updateThemeIcon(isDarkMode) {
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load default results
function loadDefaultResults() {
    const resultsContent = document.querySelector('.results-content');
    if (resultsContent) {
        // Create default content
        resultsContent.innerHTML = `
            <!-- Overview Tab -->
            <div class="result-panel active" id="overview-panel">
                <div class="executive-summary">
                    <h2>Executive Summary</h2>
                    <div class="summary-grid">
                        <div class="summary-card highlight">
                            <div class="card-icon">
                                <i class="fas fa-piggy-bank"></i>
                            </div>
                            <div class="card-content">
                                <h4>Total Savings</h4>
                                <div class="metric-value" id="total-savings">$425,000</div>
                                <div class="metric-detail" id="savings-percentage">35%</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="card-content">
                                <h4>Break-even Point</h4>
                                <div class="metric-value" id="breakeven-point">18 months</div>
                                <div class="metric-detail">Time to positive ROI</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="card-content">
                                <h4>Risk Reduction</h4>
                                <div class="metric-value" id="risk-reduction">62%</div>
                                <div class="metric-detail">Security improvement</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="card-content">
                                <h4>Implementation Time</h4>
                                <div class="metric-value" id="implementation-time">14 days</div>
                                <div class="metric-detail">vs. current solution</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="key-insights">
                    <h3>Key Insights</h3>
                    <div class="insights-list" id="key-insights-list">
                        <div class="insight-item high-impact">
                            <div class="insight-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="insight-content">
                                <h4>Significant Cost Reduction</h4>
                                <p>Switching to Portnox Cloud could save your organization 35% over 3 years.</p>
                            </div>
                        </div>
                        <div class="insight-item high-impact">
                            <div class="insight-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="insight-content">
                                <h4>Faster Implementation</h4>
                                <p>Deploy 76% faster with cloud-native architecture.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Comparison Tab -->
            <div class="result-panel" id="comparison-panel">
                <div class="comparison-charts">
                    <div class="chart-card">
                        <h3>3-Year TCO Comparison</h3>
                        <canvas id="tco-comparison-chart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h3>Cost Breakdown by Category</h3>
                        <canvas id="cost-breakdown-chart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Other panels -->
            <div class="result-panel" id="implementation-panel">
                <h3>Implementation Timeline</h3>
                <canvas id="implementation-chart"></canvas>
            </div>
            
            <div class="result-panel" id="features-panel">
                <h3>Feature Comparison</h3>
                <canvas id="features-chart"></canvas>
            </div>
            
            <div class="result-panel" id="roi-panel">
                <h3>ROI Analysis</h3>
                <canvas id="roi-chart"></canvas>
            </div>
            
            <div class="result-panel" id="risk-panel">
                <h3>Risk Analysis</h3>
                <canvas id="risk-chart"></canvas>
            </div>
            
            <div class="result-panel" id="sensitivity-panel">
                <h3>Sensitivity Analysis</h3>
                <div id="sensitivity-controls">
                    <!-- Sensitivity controls here -->
                </div>
                <canvas id="sensitivity-chart"></canvas>
            </div>
        `;
    }

    // Load default charts
    setTimeout(() => {
        createDefaultCharts();
    }, 500);
}

// Create default charts
function createDefaultCharts() {
    // TCO Comparison Chart
    const tcoCtx = document.getElementById('tco-comparison-chart');
    if (tcoCtx) {
        new Chart(tcoCtx, {
            type: 'bar',
            data: {
                labels: ['Cisco ISE', 'Portnox Cloud'],
                datasets: [{
                    label: '3-Year TCO',
                    data: [1200000, 775000],
                    backgroundColor: ['#ea4335', '#34a853'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    // Cost Breakdown Chart
    const breakdownCtx = document.getElementById('cost-breakdown-chart');
    if (breakdownCtx) {
        new Chart(breakdownCtx, {
            type: 'doughnut',
            data: {
                labels: ['Hardware', 'Licensing', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [150000, 280000, 125000, 180000, 465000],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#fbbc04',
                        '#ea4335',
                        '#4285f4'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }
}

// Initialize result tabs
function initResultsTabs() {
    const tabs = document.querySelectorAll('.result-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchResultTab(tabName);
        });
    });
}

function switchResultTab(tabName) {
    // Update tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update panels
    document.querySelectorAll('.result-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });
}

// Initialize animations
function initAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
}
EOF

echo "
✅ Magical wizard enhancement complete!

🎉 Major improvements:
   - Wizard is now a magical popup overlay
   - Default charts load immediately
   - Used actual vendor logos (PNG files)
   - Enhanced visual experience with:
     • Wizard character with floating animation
     • Magical icons and animations
     • Dragons, lightning bolts, dollar signs
     • Enchanted vendor cards
     • Glowing compliance scrolls
     • Crystal ball pricing display
     • Casting circle for calculations
   - Added comprehensive compliance frameworks:
     • CMMC, CIS Controls, NERC CIP
     • ISO 27001, NIST CSF, GDPR, CCPA
     • Industry-specific standards
   - Completely redesigned cost configuration:
     • Treasury vault theme
     • Magical sliders
     • Crystal pricing display
     • Intuitive user experience
   - Quick action cards for easy access

✨ New features:
   - Wizard is optional - defaults load immediately
   - Quick actions to customize specific sections
   - Fun, engaging wizard character with speech bubbles
   - Magical particles and effects throughout
   - Thematic naming (kingdoms, treasuries, spells)
   - Smooth animations and transitions
   - Responsive design for all screen sizes

🚀 The application now:
   - Loads with default comparison data
   - Shows Cisco ISE vs Portnox Cloud by default
   - Allows quick customization via action cards
   - Provides a magical wizard experience when needed
   - Uses actual vendor logos
   - Includes expanded compliance frameworks
   - Has an intuitive, fun cost configuration

To run the application:
   1. Start the development server: python3 server.py
   2. Open your browser to http://localhost:8080

Enjoy your magical Total Cost Analyzer! 🧙‍♂️✨
"
