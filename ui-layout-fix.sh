#!/bin/bash
# Fix UI Layout to Match Executive Platform Design

echo "🎨 Fixing UI Layout to Match Design"
echo "==================================="

# Part 1: Create new platform layout CSS
echo "📐 Part 1: Creating new platform layout CSS..."

cat > css/platform-layout.css << 'EOF'
/**
 * Platform Layout - Matching Executive Design
 */

/* Reset and Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #1a1f2e;
    color: #ffffff;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Platform Container */
#app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%);
}

/* Header Layout */
.platform-header {
    background: rgba(26, 31, 46, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.header-logo {
    height: 40px;
    width: auto;
}

.header-content h1 {
    font-size: 2rem;
    font-weight: 300;
    color: #00e5e6;
    margin-bottom: 0.25rem;
}

.header-content p {
    font-size: 0.875rem;
    color: #94a3b8;
    font-weight: 300;
}

/* Header Controls */
.header-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.device-dropdown {
    position: relative;
}

.device-dropdown select {
    appearance: none;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
}

.device-dropdown select:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 229, 230, 0.3);
}

.device-dropdown::after {
    content: '▼';
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #94a3b8;
    font-size: 0.75rem;
}

/* Header Buttons */
.header-actions {
    display: flex;
    gap: 0.75rem;
}

.btn-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-settings {
    background: #8b5cf6;
    color: white;
}

.btn-settings:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

.btn-recalculate {
    background: rgba(139, 92, 246, 0.2);
    color: #8b5cf6;
    border: 1px solid #8b5cf6;
}

.btn-recalculate:hover {
    background: rgba(139, 92, 246, 0.3);
}

/* Export Dropdown */
.export-dropdown {
    position: relative;
}

.btn-export {
    background: rgba(0, 229, 230, 0.2);
    color: #00e5e6;
    border: 1px solid #00e5e6;
    position: relative;
}

.btn-export:hover {
    background: rgba(0, 229, 230, 0.3);
}

.export-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: #2d3748;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.export-dropdown:hover .export-menu,
.export-menu:hover {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.export-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: white;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.875rem;
}

.export-option:hover {
    background: rgba(139, 92, 246, 0.2);
}

.export-option i {
    width: 20px;
}

/* Main Content Area */
.main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
}

/* Timeline */
.timeline-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 3rem;
    position: relative;
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.timeline-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #e2e8f0;
}

.timeline-scale {
    position: relative;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
}

.timeline-progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6 0%, #00e5e6 100%);
    border-radius: 20px;
    transition: width 0.5s ease;
}

.timeline-markers {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
}

.timeline-marker {
    font-size: 0.75rem;
    color: #64748b;
}

/* Navigation Cards */
.nav-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.nav-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.nav-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: transparent;
    transition: all 0.3s ease;
}

.nav-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 229, 230, 0.3);
}

.nav-card.active {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
}

.nav-card.active::before {
    background: linear-gradient(90deg, #8b5cf6 0%, #00e5e6 100%);
}

.nav-card-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #64748b;
}

.nav-card.active .nav-card-icon {
    color: #8b5cf6;
}

.nav-card h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 0.5rem;
}

.nav-card p {
    font-size: 0.875rem;
    color: #94a3b8;
    line-height: 1.4;
}

/* Pricing Slider */
.pricing-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: auto;
}

.pricing-label {
    font-size: 1rem;
    font-weight: 500;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pricing-slider-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 2rem;
}

.pricing-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #00e5e6;
    min-width: 150px;
}

.pricing-slider {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    position: relative;
    cursor: pointer;
}

.pricing-slider-track {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6 0%, #00e5e6 100%);
    border-radius: 3px;
    width: 30%;
}

.pricing-slider-handle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: #00e5e6;
    border: 3px solid #1a1f2e;
    border-radius: 50%;
    cursor: grab;
    transition: all 0.3s ease;
    left: 30%;
}

.pricing-slider-handle:hover {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: 0 0 20px rgba(0, 229, 230, 0.5);
}

.pricing-range {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    color: #64748b;
}

/* Footer */
.platform-footer {
    background: rgba(26, 31, 46, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 2rem;
    text-align: center;
}

.footer-content {
    max-width: 1600px;
    margin: 0 auto;
    font-size: 0.875rem;
    color: #64748b;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.6s ease;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .nav-cards-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .header-container {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .header-controls {
        width: 100%;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .device-dropdown select {
        width: 100%;
    }
    
    .header-actions {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    
    .nav-cards-container {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .pricing-container {
        flex-direction: column;
        align-items: stretch;
    }
}
EOF

# Part 2: Create updated HTML structure
echo "📄 Part 2: Creating updated HTML structure..."

cat > index-ui-fixed.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Decision Platform | Portnox</title>
    <meta name="description" content="Zero Trust NAC Investment Analysis & Risk Assessment">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-icon.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Chart Libraries -->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="./css/platform-layout.css">
    <link rel="stylesheet" href="./css/platform-ui.css">
</head>
<body>
    <div id="app-container">
        <!-- Header -->
        <header class="platform-header">
            <div class="header-container">
                <div class="header-left">
                    <img src="./img/vendors/portnox-logo.svg" alt="Portnox" class="header-logo">
                    <div class="header-content">
                        <h1>Executive Decision Platform</h1>
                        <p>Zero Trust NAC Investment Analysis & Risk Assessment</p>
                    </div>
                </div>
                
                <div class="header-controls">
                    <div class="device-dropdown">
                        <select id="org-size-select" onchange="platformUI.updateOrgSize(this.value)">
                            <option value="small">Small (500 devices)</option>
                            <option value="medium" selected>Medium (2,500 devices)</option>
                            <option value="large">Large (10,000 devices)</option>
                            <option value="enterprise">Enterprise (50,000+ devices)</option>
                        </select>
                    </div>
                    
                    <div class="header-actions">
                        <button class="btn-header btn-settings" onclick="platformUI.openSettings()">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </button>
                        
                        <button class="btn-header btn-recalculate" onclick="platformUI.recalculate()">
                            <i class="fas fa-calculator"></i>
                            <span>Recalculate</span>
                        </button>
                        
                        <div class="export-dropdown">
                            <button class="btn-header btn-export">
                                <i class="fas fa-download"></i>
                                <span>Export</span>
                            </button>
                            <div class="export-menu">
                                <button class="export-option" onclick="platformUI.exportToPDF()">
                                    <i class="fas fa-file-pdf"></i>
                                    <span>Export to PDF</span>
                                </button>
                                <button class="export-option" onclick="platformUI.exportToExcel()">
                                    <i class="fas fa-file-excel"></i>
                                    <span>Export to Excel</span>
                                </button>
                                <button class="export-option" onclick="platformUI.exportToPowerPoint()">
                                    <i class="fas fa-file-powerpoint"></i>
                                    <span>Export to PowerPoint</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Main Content -->
        <main class="main-content">
            <!-- Timeline -->
            <div class="timeline-container animate-fadeIn">
                <div class="timeline-header">
                    <h2 class="timeline-title">36-Month Implementation Timeline</h2>
                    <span class="timeline-status">Month <span id="current-month">6</span> of 36</span>
                </div>
                <div class="timeline-scale">
                    <div class="timeline-progress" style="width: 16.67%"></div>
                </div>
                <div class="timeline-markers">
                    <span class="timeline-marker">1</span>
                    <span class="timeline-marker">6</span>
                    <span class="timeline-marker">12</span>
                    <span class="timeline-marker">18</span>
                    <span class="timeline-marker">24</span>
                    <span class="timeline-marker">30</span>
                    <span class="timeline-marker">36</span>
                </div>
            </div>
            
            <!-- Navigation Cards -->
            <div class="nav-cards-container animate-fadeIn">
                <div class="nav-card" onclick="platformUI.navigateTo('executive')">
                    <i class="fas fa-crown nav-card-icon"></i>
                    <h3>Executive Dashboard</h3>
                    <p>Complete Analysis</p>
                </div>
                
                <div class="nav-card active" onclick="platformUI.navigateTo('financial')">
                    <i class="fas fa-chart-line nav-card-icon"></i>
                    <h3>Financial Overview</h3>
                    <p>TCO & ROI Analysis</p>
                </div>
                
                <div class="nav-card" onclick="platformUI.navigateTo('risk')">
                    <i class="fas fa-shield-alt nav-card-icon"></i>
                    <h3>Risk & Security</h3>
                    <p>Breach & Incident Impact</p>
                </div>
                
                <div class="nav-card" onclick="platformUI.navigateTo('compliance')">
                    <i class="fas fa-check-circle nav-card-icon"></i>
                    <h3>Compliance</h3>
                    <p>Regulatory Alignment</p>
                </div>
                
                <div class="nav-card" onclick="platformUI.navigateTo('operational')">
                    <i class="fas fa-cogs nav-card-icon"></i>
                    <h3>Operational</h3>
                    <p>Efficiency & Timeline</p>
                </div>
                
                <div class="nav-card" onclick="platformUI.navigateTo('strategic')">
                    <i class="fas fa-lightbulb nav-card-icon"></i>
                    <h3>Strategic Insights</h3>
                    <p>Recommendations</p>
                </div>
            </div>
            
            <!-- Dynamic View Content -->
            <div id="view-content" class="view-content animate-fadeIn">
                <!-- Content will be loaded here based on selected view -->
            </div>
        </main>
        
        <!-- Pricing Slider -->
        <div class="pricing-container">
            <div class="pricing-label">
                <img src="./img/vendors/portnox-logo.svg" alt="Portnox" style="height: 24px;">
                <span>Pricing Adjustment</span>
            </div>
            
            <div class="pricing-slider-container">
                <div class="pricing-value">
                    $<span id="price-value">7.00</span>/device/month
                </div>
                
                <div class="pricing-slider" id="pricing-slider">
                    <div class="pricing-slider-track"></div>
                    <div class="pricing-slider-handle"></div>
                </div>
                
                <div class="pricing-range">
                    <span>$1.00</span>
                    <span>$8.00</span>
                </div>
            </div>
            
            <div class="pricing-total">
                Portnox Price/Device: <strong>$<span id="annual-price">84</span>/year</strong>
            </div>
        </div>
    </div>
    
    <!-- Scripts -->
    <script src="./js/platform-ui.js"></script>
</body>
</html>
EOF

# Part 3: Create platform UI JavaScript
echo "🔧 Part 3: Creating platform UI JavaScript..."

cat > js/platform-ui.js << 'EOF'
/**
 * Platform UI Controller
 */

class PlatformUI {
    constructor() {
        this.currentView = 'financial';
        this.settings = {
            orgSize: 'medium',
            devices: 2500,
            pricePerDevice: 7.00,
            industry: 'technology',
            currentMonth: 6
        };
        
        this.initialize();
    }
    
    initialize() {
        // Initialize pricing slider
        this.initPricingSlider();
        
        // Initialize timeline
        this.updateTimeline();
        
        // Load initial view
        this.loadView(this.currentView);
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    initPricingSlider() {
        const slider = document.getElementById('pricing-slider');
        const handle = slider.querySelector('.pricing-slider-handle');
        const track = slider.querySelector('.pricing-slider-track');
        
        let isDragging = false;
        
        const updateSlider = (e) => {
            if (!isDragging) return;
            
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            // Map percentage to price ($1 - $8)
            const price = 1 + (percentage / 100) * 7;
            this.updatePrice(price);
            
            // Update visual position
            handle.style.left = percentage + '%';
            track.style.width = percentage + '%';
        };
        
        handle.addEventListener('mousedown', () => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', updateSlider);
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            handle.style.cursor = 'grab';
        });
        
        // Set initial position
        const initialPercentage = ((this.settings.pricePerDevice - 1) / 7) * 100;
        handle.style.left = initialPercentage + '%';
        track.style.width = initialPercentage + '%';
    }
    
    updatePrice(price) {
        this.settings.pricePerDevice = Math.round(price * 100) / 100;
        document.getElementById('price-value').textContent = this.settings.pricePerDevice.toFixed(2);
        document.getElementById('annual-price').textContent = Math.round(this.settings.pricePerDevice * 12);
    }
    
    updateOrgSize(size) {
        this.settings.orgSize = size;
        const deviceCounts = {
            small: 500,
            medium: 2500,
            large: 10000,
            enterprise: 50000
        };
        this.settings.devices = deviceCounts[size];
        this.recalculate();
    }
    
    updateTimeline() {
        const progress = (this.settings.currentMonth / 36) * 100;
        const progressBar = document.querySelector('.timeline-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        const currentMonthEl = document.getElementById('current-month');
        if (currentMonthEl) {
            currentMonthEl.textContent = this.settings.currentMonth;
        }
    }
    
    navigateTo(view) {
        // Update active card
        document.querySelectorAll('.nav-card').forEach(card => {
            card.classList.remove('active');
        });
        
        event.currentTarget.classList.add('active');
        
        // Load view
        this.currentView = view;
        this.loadView(view);
    }
    
    loadView(view) {
        const content = document.getElementById('view-content');
        if (!content) return;
        
        // Show loading state
        content.innerHTML = '<div class="loading">Loading...</div>';
        
        // Simulate loading and render view
        setTimeout(() => {
            switch(view) {
                case 'executive':
                    this.renderExecutiveView(content);
                    break;
                case 'financial':
                    this.renderFinancialView(content);
                    break;
                case 'risk':
                    this.renderRiskView(content);
                    break;
                case 'compliance':
                    this.renderComplianceView(content);
                    break;
                case 'operational':
                    this.renderOperationalView(content);
                    break;
                case 'strategic':
                    this.renderStrategicView(content);
                    break;
            }
        }, 300);
    }
    
    renderFinancialView(container) {
        container.innerHTML = `
            <div class="financial-view">
                <h2>Financial Overview</h2>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <h3>3-Year TCO</h3>
                        <div class="metric-value">$${this.formatNumber(this.calculateTCO())}</div>
                        <p class="metric-detail">Total Cost of Ownership</p>
                    </div>
                    <div class="metric-card">
                        <h3>ROI</h3>
                        <div class="metric-value">${this.calculateROI()}%</div>
                        <p class="metric-detail">Return on Investment</p>
                    </div>
                    <div class="metric-card">
                        <h3>Payback Period</h3>
                        <div class="metric-value">${this.calculatePayback()} months</div>
                        <p class="metric-detail">Break-even timeline</p>
                    </div>
                    <div class="metric-card">
                        <h3>Annual Savings</h3>
                        <div class="metric-value">$${this.formatNumber(this.calculateSavings())}</div>
                        <p class="metric-detail">vs. Legacy NAC</p>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3>Cost Comparison</h3>
                    <div id="cost-comparison-chart"></div>
                </div>
            </div>
        `;
        
        // Render charts
        this.renderCostComparisonChart();
    }
    
    renderCostComparisonChart() {
        const container = document.getElementById('cost-comparison-chart');
        if (!container || typeof Highcharts === 'undefined') return;
        
        const portnoxCost = this.settings.devices * this.settings.pricePerDevice * 12 * 3;
        const legacyCost = this.settings.devices * 25 * 3 + 200000; // Legacy cost model
        
        Highcharts.chart(container, {
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                style: {
                    fontFamily: 'Inter'
                }
            },
            title: {
                text: '3-Year Total Cost Comparison',
                style: { color: '#e2e8f0' }
            },
            xAxis: {
                categories: ['Portnox Cloud NAC', 'Legacy NAC'],
                labels: { style: { color: '#94a3b8' } }
            },
            yAxis: {
                title: {
                    text: 'Cost (USD)',
                    style: { color: '#94a3b8' }
                },
                labels: {
                    style: { color: '#94a3b8' },
                    formatter: function() {
                        return '$' + this.value / 1000 + 'K';
                    }
                }
            },
            series: [{
                name: 'Total Cost',
                data: [portnoxCost, legacyCost],
                color: '#8b5cf6'
            }],
            credits: { enabled: false }
        });
    }
    
    calculateTCO() {
        return this.settings.devices * this.settings.pricePerDevice * 12 * 3;
    }
    
    calculateROI() {
        const investment = this.calculateTCO();
        const returns = this.calculateSavings() * 3;
        return Math.round((returns / investment) * 100);
    }
    
    calculatePayback() {
        const monthlySavings = this.calculateSavings() / 12;
        const monthlyInvestment = this.calculateTCO() / 36;
        return Math.round(monthlyInvestment / monthlySavings * 12);
    }
    
    calculateSavings() {
        const legacyAnnual = this.settings.devices * 25 + 100000;
        const portnoxAnnual = this.settings.devices * this.settings.pricePerDevice * 12;
        return legacyAnnual - portnoxAnnual;
    }
    
    formatNumber(num) {
        return Math.round(num).toLocaleString();
    }
    
    openSettings() {
        alert('Settings panel would open here');
    }
    
    recalculate() {
        this.loadView(this.currentView);
    }
    
    exportToPDF() {
        alert('Exporting to PDF...');
    }
    
    exportToExcel() {
        alert('Exporting to Excel...');
    }
    
    exportToPowerPoint() {
        alert('Exporting to PowerPoint...');
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleResize() {
        // Re-render charts on resize
        if (this.currentView) {
            this.loadView(this.currentView);
        }
    }
}

// Initialize platform UI
const platformUI = new PlatformUI();

// Export for global access
window.platformUI = platformUI;
EOF

# Part 4: Create additional UI styles
echo "🎨 Part 4: Creating additional UI styles..."

cat > css/platform-ui.css << 'EOF'
/**
 * Platform UI Styles
 */

/* View Content */
.view-content {
    margin-top: 2rem;
}

/* Loading State */
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    font-size: 1.125rem;
    color: #64748b;
}

/* Financial View */
.financial-view h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 2rem;
}

/* Metrics Grid */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.metric-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.metric-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(139, 92, 246, 0.3);
}

.metric-card h3 {
    font-size: 0.875rem;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.metric-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #8b5cf6;
    margin-bottom: 0.5rem;
}

.metric-detail {
    font-size: 0.875rem;
    color: #64748b;
}

/* Chart Container */
.chart-container {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
}

.chart-container h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 1.5rem;
}

#cost-comparison-chart {
    min-height: 400px;
}

/* Highcharts Overrides */
.highcharts-background {
    fill: transparent;
}

.highcharts-title {
    fill: #e2e8f0 !important;
}

.highcharts-axis-labels text {
    fill: #94a3b8 !important;
}

.highcharts-axis-title text {
    fill: #94a3b8 !important;
}

.highcharts-column-series .highcharts-point {
    transition: all 0.3s ease;
}

.highcharts-column-series .highcharts-point:hover {
    filter: brightness(1.2);
}

/* Settings Modal (placeholder) */
.settings-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.settings-content {
    background: #2d3748;
    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
}

/* Responsive */
@media (max-width: 768px) {
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .metric-value {
        font-size: 2rem;
    }
}
EOF

# Part 5: Create deployment script
echo "🚀 Part 5: Creating deployment script..."

cat > deploy-ui-fix.sh << 'DEPLOYEOF'
#!/bin/bash
# Deploy UI Layout Fix

echo "🎨 Deploying UI Layout Fix"
echo "========================="

# Backup existing files
if [ -f "index.html" ]; then
    cp index.html index-backup-$(date +%Y%m%d-%H%M%S).html
    echo "✓ Backed up existing index.html"
fi

# Copy new files
if [ -f "index-ui-fixed.html" ]; then
    cp index-ui-fixed.html index.html
    echo "✓ Updated index.html"
fi

# Create necessary directories
mkdir -p css js img/vendors

# Check for logo
if [ ! -f "img/vendors/portnox-logo.svg" ]; then
    echo "Creating Portnox logo placeholder..."
    cat > img/vendors/portnox-logo.svg << 'EOF'
<svg width="140" height="40" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#00e5e6">portnox</text>
</svg>
EOF
fi

echo ""
echo "✅ UI Layout fix deployed!"
echo ""
echo "The platform now matches the executive design with:"
echo "- Clean header with dropdown and action buttons"
echo "- Timeline progress indicator"
echo "- Navigation cards layout"
echo "- Pricing slider at the bottom"
echo "- Modern dark theme with purple accents"
echo ""
echo "Open index.html to see the updated design!"
DEPLOYEOF

chmod +x deploy-ui-fix.sh

echo ""
echo "✅ UI Layout Fix Script Complete!"
echo "================================"
echo ""
echo "This script creates a UI that matches your design with:"
echo "- Header with organization dropdown, settings, recalculate, and export buttons"
echo "- 36-month timeline with progress indicator"
echo "- Six navigation cards (Executive, Financial, Risk, Compliance, Operational, Strategic)"
echo "- Bottom pricing slider ($1-$8 per device/month)"
echo "- Clean dark theme with purple (#8b5cf6) and cyan (#00e5e6) accents"
echo ""
echo "To deploy: ./deploy-ui-fix.sh"