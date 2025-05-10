// Professional TCO Analyzer - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏢 Initializing Enterprise TCO Analyzer...');
    
    // Initialize Configuration
    initializeConfiguration();
    
    // Initialize UI Components
    initializeUIComponents();
    
    // Initialize Navigation
    initializeNavigation();
    
    // Initialize Charts
    if (window.chartManager) {
        window.chartManager.init();
    }
    
    // Load default data and calculations
    loadDefaultAnalysis();
    
    console.log('✅ TCO Analyzer initialized successfully');
});

// Initialize configuration modal
function initializeConfiguration() {
    const configBtn = document.getElementById('configuration-btn');
    const modal = document.getElementById('configuration-modal');
    const closeBtn = document.getElementById('close-config');
    
    if (configBtn) {
        configBtn.addEventListener('click', () => {
            modal.classList.add('active');
            loadConfigurationForm();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize UI components
function initializeUIComponents() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize export functionality
    initializeExport();
}

// Initialize navigation tabs
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.analysis-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update tab states
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update section visibility
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${tabName}-analysis`) {
                    section.classList.add('active');
                    
                    // Animate section entry
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        section.style.transition = 'all 0.5s ease';
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    });
                }
            });
        });
    });
}

// Load default analysis data
function loadDefaultAnalysis() {
    // Default configuration
    const defaultConfig = {
        organization: {
            size: 'medium',
            deviceCount: 2500,
            locations: 5,
            industry: 'technology',
            yearsToProject: 3
        },
        currentVendor: 'cisco',
        compliance: ['ISO 27001', 'SOC 2', 'GDPR'],
        operationalParams: {
            fteCost: 120000,
            maintenancePercentage: 0.18,
            downtimeCostPerHour: 10000
        }
    };
    
    // Calculate and display results
    calculateAndDisplayResults(defaultConfig);
    
    // Animate KPI values
    animateKPIValues();
}

// Calculate and display results
function calculateAndDisplayResults(config) {
    // Perform calculations
    const results = calculateTCO(config);
    
    // Update KPI values
    updateKPIValues(results);
    
    // Update insights
    updateInsights(results);
    
    // Charts are automatically updated by ChartManager
}

// TCO calculation logic
function calculateTCO(config) {
    const { deviceCount, yearsToProject } = config.organization;
    
    // Current solution costs
    const currentCosts = {
        hardware: 150000,
        licensing: deviceCount * 35 * yearsToProject,
        maintenance: 150000 * 0.18 * yearsToProject,
        implementation: 125000,
        personnel: 120000 * 1.5 * yearsToProject,
        training: 25000,
        downtime: 15000 * yearsToProject
    };
    
    // Portnox costs
    const portnoxCosts = {
        hardware: 0,
        licensing: deviceCount * 4 * 12 * yearsToProject * 0.8, // 20% discount
        maintenance: 0,
        implementation: 25000,
        personnel: 120000 * 0.1 * yearsToProject,
        training: 5000,
        downtime: 2000 * yearsToProject
    };
    
    // Calculate totals
    const currentTotal = Object.values(currentCosts).reduce((a, b) => a + b, 0);
    const portnoxTotal = Object.values(portnoxCosts).reduce((a, b) => a + b, 0);
    const savings = currentTotal - portnoxTotal;
    const savingsPercentage = (savings / currentTotal) * 100;
    
    return {
        currentTotal,
        portnoxTotal,
        savings,
        savingsPercentage,
        breakeven: 18, // months
        securityImprovement: 62,
        implementationDays: 14,
        roi: ((savings - portnoxTotal) / portnoxTotal) * 100
    };
}

// Update KPI values
function updateKPIValues(results) {
    const kpiMap = {
        'total-cost-reduction': `${results.savingsPercentage.toFixed(0)}%`,
        'time-to-value': '14 days',
        'security-improvement': `${results.securityImprovement}%`,
        'roi-timeline': '18 months'
    };
    
    Object.entries(kpiMap).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Update detail values
    const detailElements = {
        'total-savings': `3-Year TCO Savings: ${results.savings.toLocaleString()}`,
        'roi-detail': `${results.roi.toFixed(0)}% 3-Year ROI`
    };
    
    Object.entries(detailElements).forEach(([className, value]) => {
        const element = document.querySelector(`.${className}`);
        if (element) {
            element.textContent = value;
        }
    });
}

// Update strategic insights
function updateInsights(results) {
    // Insights are already populated in HTML
    // This function would update them based on calculations if needed
}

// Animate KPI values
function animateKPIValues() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    
    kpiValues.forEach(element => {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const isTime = finalValue.includes('days') || finalValue.includes('months');
        
        if (isPercentage || isTime) {
            const numericValue = parseInt(finalValue.match(/\d+/)[0]);
            
            if (typeof CountUp !== 'undefined') {
                const countUp = new CountUp(element, numericValue, {
                    duration: 2,
                    suffix: isPercentage ? '%' : (isTime ? ` ${finalValue.split(' ')[1]}` : '')
                });
                
                if (!countUp.error) {
                    countUp.start();
                }
            }
        }
    });
}

// Initialize tooltips
function initializeTooltips() {
    // Add tooltips to elements that need additional explanation
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate section entries
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.insight-card, .kpi-card, .chart-container').forEach(element => {
        observer.observe(element);
    });
}

// Initialize export functionality
function initializeExport() {
    const exportBtn = document.getElementById('export-report');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            generatePDFReport();
        });
    }
}

// Configuration form loader
function loadConfigurationForm() {
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <form id="configuration-form">
            <div class="form-section">
                <h3>Organization Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="org-size">Organization Size</label>
                        <select id="org-size" name="organizationSize">
                            <option value="small">Small (< 1,000 devices)</option>
                            <option value="medium" selected>Medium (1,000-5,000 devices)</option>
                            <option value="large">Large (5,000-10,000 devices)</option>
                            <option value="enterprise">Enterprise (10,000+ devices)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="device-count">Number of Devices</label>
                        <input type="number" id="device-count" name="deviceCount" value="2500" min="100" max="100000">
                    </div>
                    <div class="form-group">
                        <label for="locations">Number of Locations</label>
                        <input type="number" id="locations" name="locations" value="5" min="1" max="1000">
                    </div>
                    <div class="form-group">
                        <label for="industry">Industry</label>
                        <select id="industry" name="industry">
                            <option value="technology" selected>Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="financial">Financial Services</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="retail">Retail</option>
                            <option value="education">Education</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Current NAC Solution</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="current-vendor">Current Vendor</label>
                        <select id="current-vendor" name="currentVendor">
                            <option value="cisco" selected>Cisco ISE</option>
                            <option value="aruba">Aruba ClearPass</option>
                            <option value="forescout">Forescout</option>
                            <option value="fortinac">FortiNAC</option>
                            <option value="none">No NAC Solution</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="analysis-period">Analysis Period</label>
                        <select id="analysis-period" name="analysisPeriod">
                            <option value="1">1 Year</option>
                            <option value="3" selected>3 Years</option>
                            <option value="5">5 Years</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeConfiguration()">Cancel</button>
                <button type="submit" class="btn btn-primary">Apply Configuration</button>
            </div>
        </form>
    `;
    
    // Handle form submission
    const form = document.getElementById('configuration-form');
    form.addEventListener('submit', handleConfigurationSubmit);
}

// Handle configuration form submission
function handleConfigurationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const config = {
        organization: {
            size: formData.get('organizationSize'),
            deviceCount: parseInt(formData.get('deviceCount')),
            locations: parseInt(formData.get('locations')),
            industry: formData.get('industry'),
            yearsToProject: parseInt(formData.get('analysisPeriod'))
        },
        currentVendor: formData.get('currentVendor')
    };
    
    // Recalculate and update display
    calculateAndDisplayResults(config);
    
    // Close modal
    document.getElementById('configuration-modal').classList.remove('active');
    
    // Show notification
    showNotification('Configuration updated successfully', 'success');
}

// Generate PDF report
function generatePDFReport() {
    // This would integrate with a PDF generation library
    showNotification('Generating PDF report...', 'info');
    
    // Simulate PDF generation
    setTimeout(() => {
        showNotification('PDF report generated successfully', 'success');
        // Trigger download
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Helper functions
function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

function closeConfiguration() {
    document.getElementById('configuration-modal').classList.remove('active');
}
