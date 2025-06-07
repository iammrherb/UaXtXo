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
