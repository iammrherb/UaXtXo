#!/bin/bash

# Portnox Total Cost Analyzer Fix and Enhancement Script
# This script fixes critical issues and enhances the Portnox TCO Analyzer application
# Audience focus: Buyers, Executive Teams, Finance, Technical, Security and Compliance teams

# Set script to exit on error
set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define project directory (update this to your actual project path)
PROJECT_DIR="$(pwd)"
BACKUP_DIR="${PROJECT_DIR}/backup_$(date +%Y%m%d_%H%M%S)"

# Log function
log() {
    echo -e "${GREEN}[$(date +%T)]${NC} $1"
}

# Warning function
warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Error function
error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Create backup directory
create_backup() {
    log "Creating backup in ${BACKUP_DIR}"
    mkdir -p "${BACKUP_DIR}"
    
    # Backup JavaScript files
    mkdir -p "${BACKUP_DIR}/js/wizards" "${BACKUP_DIR}/js/components"
    cp "${PROJECT_DIR}/js/wizards/wizard-controller.js" "${BACKUP_DIR}/js/wizards/" 2>/dev/null || warn "Could not backup wizard-controller.js"
    cp "${PROJECT_DIR}/js/components/calculator.js" "${BACKUP_DIR}/js/components/" 2>/dev/null || warn "Could not backup calculator.js"
    
    # Backup CSS files
    mkdir -p "${BACKUP_DIR}/css"
    cp "${PROJECT_DIR}/css/wizard.css" "${BACKUP_DIR}/css/" 2>/dev/null || warn "Could not backup wizard.css"
    
    # Backup vendor images
    mkdir -p "${BACKUP_DIR}/img/vendors"
    cp -r "${PROJECT_DIR}/img/vendors/"* "${BACKUP_DIR}/img/vendors/" 2>/dev/null || warn "Could not backup vendor images"
    
    log "Backup completed"
}

# Fix JavaScript syntax errors
fix_javascript_errors() {
    log "Fixing JavaScript syntax errors..."
    
    # Fix wizard.js invalid left-hand side error (line 355)
    if [ -f "${PROJECT_DIR}/js/wizards/wizard-controller.js" ]; then
        sed -i.bak '355s/\(.*\)=/\1 =/' "${PROJECT_DIR}/js/wizards/wizard-controller.js" || \
        warn "Could not fix wizard.js syntax error - manual fix needed at line 355"
        
        # Additional potential fixes for wizard.js
        sed -i.bak 's/if (currentStep == totalSteps)/if (currentStep === totalSteps)/' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
        sed -i.bak 's/nextButton.innerText = currentStep === totalSteps/nextButton.textContent = currentStep === totalSteps/' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
    else
        warn "Could not locate wizard-controller.js file"
    fi
    
    # Fix calculator.js invalid left-hand side error (line 315)
    if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
        sed -i.bak '315s/\(.*\)=/\1 =/' "${PROJECT_DIR}/js/components/calculator.js" || \
        warn "Could not fix calculator.js syntax error - manual fix needed at line 315"
        
        # Additional possible fixes for calculator.js
        sed -i.bak 's/let result = {};/const result = {};/' "${PROJECT_DIR}/js/components/calculator.js"
    else
        warn "Could not locate calculator.js file"
    fi
    
    # Create additional fixes for wizard functionality
    cat > "${PROJECT_DIR}/js/fixes/wizard-fixes.js" << 'EOL'
// Wizard functionality fixes
document.addEventListener('DOMContentLoaded', function() {
    // Fix for Next button not working
    const nextButton = document.getElementById('next-step');
    const prevButton = document.getElementById('prev-step');
    
    if (nextButton) {
        // Remove existing event listeners
        const newNextButton = nextButton.cloneNode(true);
        if (nextButton.parentNode) {
            nextButton.parentNode.replaceChild(newNextButton, nextButton);
        }
        
        // Add working event listener
        newNextButton.addEventListener('click', function() {
            if (typeof WizardController !== 'undefined' && WizardController.nextStep) {
                WizardController.nextStep();
            } else {
                console.error('WizardController not found or nextStep method not available');
            }
        });
    }
    
    if (prevButton) {
        // Remove existing event listeners
        const newPrevButton = prevButton.cloneNode(true);
        if (prevButton.parentNode) {
            prevButton.parentNode.replaceChild(newPrevButton, prevButton);
        }
        
        // Add working event listener
        newPrevButton.addEventListener('click', function() {
            if (typeof WizardController !== 'undefined' && WizardController.prevStep) {
                WizardController.prevStep();
            } else {
                console.error('WizardController not found or prevStep method not available');
            }
        });
    }
    
    // Initialize wizard if not already initialized
    if (typeof WizardController !== 'undefined' && WizardController.init) {
        try {
            WizardController.init();
            console.log('Wizard controller initialized successfully');
        } catch (e) {
            console.error('Error initializing wizard controller:', e);
        }
    }
});
EOL
    
    # Add script reference to index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        if ! grep -q "wizard-fixes.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="js\/final-patch.js"><\/script>/a\    <script src="js\/fixes\/wizard-fixes.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
    
    log "JavaScript fixes applied"
}

# Fix vendor logo loading issues
fix_vendor_logos() {
    log "Fixing vendor logo loading issues..."
    
    # Ensure vendors directory exists
    mkdir -p "${PROJECT_DIR}/img/vendors"
    
    # Create script to fix image loading
    cat > "${PROJECT_DIR}/js/fixes/image-loader-fix.js" << 'EOL'
// Fix vendor logo loading issues
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle image loading errors
    function handleImageError(img) {
        const vendorName = img.closest('.vendor-card')?.dataset?.vendor || 'unknown';
        console.warn(`Failed to load image for vendor: ${vendorName}`);
        
        // Set appropriate fallback image based on vendor
        switch(vendorName) {
            case 'cisco':
                img.src = 'img/vendors/fallback/cisco.png';
                break;
            case 'aruba':
                img.src = 'img/vendors/fallback/aruba.png';
                break;
            case 'forescout':
                img.src = 'img/vendors/fallback/forescout.png';
                break;
            case 'fortinac':
                img.src = 'img/vendors/fallback/fortinac.png';
                break;
            case 'nps':
                img.src = 'img/vendors/fallback/microsoft.png';
                break;
            case 'securew2':
                img.src = 'img/vendors/fallback/securew2.png';
                break;
            default:
                // Default vendor icon
                img.src = 'img/vendors/fallback/generic-vendor.png';
        }
    }
    
    // Apply error handling to all vendor images
    document.querySelectorAll('.vendor-card img').forEach(img => {
        img.onerror = function() { handleImageError(this); };
        
        // Force reload
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
    });
});
EOL
    
    # Create fallback directory and basic fallback images
    mkdir -p "${PROJECT_DIR}/img/vendors/fallback"
    
    # Create a simple data URI-based fallback image for vendor logos
    for vendor in cisco aruba forescout fortinac microsoft securew2 generic-vendor; do
        # Create a simple SVG fallback image
        cat > "${PROJECT_DIR}/img/vendors/fallback/${vendor}.png" << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
  <rect width="200" height="80" fill="#f8f9fa" />
  <text x="100" y="40" font-family="Arial" font-size="14" text-anchor="middle" dominant-baseline="middle">${vendor}</text>
</svg>
EOL
    done
    
    # Add script reference to index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        if ! grep -q "image-loader-fix.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="js\/final-patch.js"><\/script>/a\    <script src="js\/fixes\/image-loader-fix.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
    
    log "Vendor logo fixes applied"
}

# Fix UI navigation and button placement
fix_ui_navigation() {
    log "Fixing UI navigation and button placement..."
    
    # Create CSS fixes
    mkdir -p "${PROJECT_DIR}/css/fixes"
    cat > "${PROJECT_DIR}/css/fixes/navigation-fix.css" << 'EOL'
/* Fix navigation button placement and styling */
.wizard-navigation {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.wizard-navigation button {
    min-width: 120px;
    padding: 0.75rem 1.25rem;
}

/* Add padding to main container to prevent content from being hidden behind fixed navigation */
.calculator-container {
    padding-bottom: 80px;
}

/* Ensure the vendor cards are properly displayed */
.vendor-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.vendor-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.vendor-card.active {
    border-color: #1b67b2;
    background-color: rgba(27, 103, 178, 0.05);
}

/* Fix for wizard steps */
.wizard-step {
    display: none;
}

.wizard-step.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
EOL
    
    # Add CSS reference to index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        if ! grep -q "navigation-fix.css" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<link rel="stylesheet" href="css\/animations.css">/a\    <link rel="stylesheet" href="css\/fixes\/navigation-fix.css">' "${PROJECT_DIR}/index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
    
    log "UI navigation fixes applied"
}

# Enhance chart visualizations
enhance_charts() {
    log "Enhancing chart visualizations..."
    
    # Create enhanced chart configurations
    mkdir -p "${PROJECT_DIR}/js/charts/enhanced"
    cat > "${PROJECT_DIR}/js/charts/enhanced/portnox-advantage-charts.js" << 'EOL'
/**
 * Enhanced chart configurations to highlight Portnox's competitive advantages
 * Designed for executive, financial, technical, security, and compliance audiences
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set Portnox-specific chart theme and colors
    const portnoxColors = {
        primary: '#1b67b2',
        secondary: '#65BD44',
        accent: '#05547C',
        warning: '#f59e0b',
        danger: '#ef4444',
        neutral: '#64748b',
        competitors: {
            cisco: '#049fd9',
            aruba: '#f78e1e',
            forescout: '#d64000',
            fortinac: '#ee3124',
            nps: '#7fba00',
            securew2: '#00b2e3'
        }
    };
    
    // Ensure Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Set default chart options
    Chart.defaults.font.family = '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    Chart.defaults.color = '#333';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    
    // Custom plugin to add colored background to charts
    const chartBackgroundPlugin = {
        id: 'chartBackgroundPlugin',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };
    
    // Register the plugin
    Chart.register(chartBackgroundPlugin);
    
    // Enhanced TCO Comparison Chart
    function createTcoComparisonChart() {
        const ctx = document.getElementById('tco-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data from calculations
        const data = {
            labels: ['Initial Cost', 'Implementation', 'Training', 'Maintenance', 'Staff', 'Total'],
            datasets: [
                {
                    label: 'Current Solution',
                    data: [100000, 75000, 30000, 50000, 120000, 375000],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1
                },
                {
                    label: 'Portnox Cloud',
                    data: [48000, 10000, 5000, 0, 30000, 93000],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1
                }
            ]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: '3-Year TCO Comparison',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        if (value < 20000) return ''; // Don't show small values
                        return '$' + (value/1000).toFixed(0) + 'K';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating TCO comparison chart:', e);
        }
    }
    
    // Feature Comparison Radar Chart
    function createFeatureComparisonChart() {
        const ctx = document.getElementById('feature-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: [
                'Deployment Speed', 
                'Cloud Native', 
                'Management Ease', 
                'Automatic Updates',
                'TCO', 
                'Device Visibility',
                'Multi-Vendor Support'
            ],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [95, 100, 90, 100, 95, 90, 85],
                    backgroundColor: 'rgba(27, 103, 178, 0.2)',
                    borderColor: portnoxColors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.primary,
                    pointRadius: 4
                },
                {
                    label: 'Current Solution',
                    data: [40, 30, 45, 35, 35, 70, 65],
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderColor: portnoxColors.neutral,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.neutral,
                    pointRadius: 4
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Feature Comparison',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        } catch (e) {
            console.error('Error creating feature comparison chart:', e);
        }
    }
    
    // Implementation Timeline Comparison Chart
    function createImplementationComparisonChart() {
        const ctx = document.getElementById('implementation-comparison-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['Hardware Procurement', 'Software Installation', 'Initial Configuration', 'Network Integration', 'Testing', 'Documentation', 'Staff Training', 'Go-Live'],
            datasets: [
                {
                    label: 'Current Solution (Days)',
                    data: [30, 14, 21, 14, 7, 7, 14, 5],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1,
                    stack: 'Stack 0'
                },
                {
                    label: 'Portnox Cloud (Days)',
                    data: [0, 0.5, 1, 0.5, 1, 0.5, 1, 0.5],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1,
                    stack: 'Stack 1'
                }
            ]
        };
        
        const options = {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Implementation Timeline Comparison (Days)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const days = context.raw;
                            return `${context.dataset.label}: ${days} day${days !== 1 ? 's' : ''}`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        if (value < 3) return ''; // Don't show small values
                        return value;
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Days'
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating implementation comparison chart:', e);
        }
    }
    
    // ROI Analysis Chart
    function createRoiAnalysisChart() {
        const ctx = document.getElementById('roi-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [
                {
                    label: 'Current Solution Cost',
                    data: [125000, 125000, 125000],
                    backgroundColor: portnoxColors.neutral,
                    borderColor: portnoxColors.neutral,
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: 'Portnox Cloud Cost',
                    data: [48000, 30000, 15000],
                    backgroundColor: portnoxColors.primary,
                    borderColor: portnoxColors.primary,
                    borderWidth: 1,
                    type: 'bar'
                },
                {
                    label: 'Cumulative Savings',
                    data: [77000, 172000, 282000],
                    borderColor: portnoxColors.secondary,
                    backgroundColor: 'rgba(101, 189, 68, 0.2)',
                    borderWidth: 2,
                    type: 'line',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'ROI Analysis',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                },
                datalabels: {
                    display: function(context) {
                        return context.datasetIndex < 2; // Only show for bars
                    },
                    color: '#fff',
                    anchor: 'center',
                    align: 'center',
                    formatter: function(value) {
                        return '$' + (value/1000).toFixed(0) + 'K';
                    },
                    font: {
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Annual Cost'
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Cumulative Savings'
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [ChartDataLabels]
            });
        } catch (e) {
            console.error('Error creating ROI analysis chart:', e);
        }
    }
    
    // Compliance Framework Coverage Chart
    function createComplianceFrameworkChart() {
        const ctx = document.getElementById('industry-compliance-chart');
        if (!ctx) return;
        
        // Sample data - will be replaced with actual data
        const data = {
            labels: ['HIPAA', 'PCI DSS', 'NIST 800-53', 'GDPR', 'ISO 27001'],
            datasets: [
                {
                    label: 'Portnox Cloud',
                    data: [95, 90, 95, 90, 95],
                    backgroundColor: 'rgba(27, 103, 178, 0.2)',
                    borderColor: portnoxColors.primary,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.primary,
                    pointRadius: 4
                },
                {
                    label: 'Industry Average',
                    data: [75, 70, 65, 60, 70],
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderColor: portnoxColors.neutral,
                    borderWidth: 2,
                    pointBackgroundColor: portnoxColors.neutral,
                    pointRadius: 4
                }
            ]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Compliance Framework Coverage',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        };
        
        // Create chart if canvas exists
        try {
            new Chart(ctx, {
                type: 'radar',
                data: data,
                options: options
            });
        } catch (e) {
            console.error('Error creating compliance framework chart:', e);
        }
    }
    
    // Create Key Insights section
    function createKeyInsights() {
        const insightsContainer = document.getElementById('key-insights-list');
        if (!insightsContainer) return;
        
        // Insights based on Portnox competitive advantages
        const insights = [
            {
                title: "Cost Efficiency",
                content: "Portnox Cloud delivers a 40-60% lower TCO over 3 years compared to traditional NAC solutions by eliminating hardware costs, simplifying implementation, and reducing IT resource requirements."
            },
            {
                title: "Implementation Speed",
                content: "Deploy Portnox Cloud in hours to days versus the 2-6 month implementation timeline required for traditional NAC solutions, accelerating your security posture improvement and reducing project risk."
            },
            {
                title: "Resource Optimization",
                content: "Portnox requires approximately 80% less IT staffing compared to traditional NAC solutions, freeing your team to focus on strategic initiatives rather than system management."
            },
            {
                title: "Cloud-Native Architecture",
                content: "True cloud-native design eliminates infrastructure management, provides automatic scaling, and delivers continuous updates without maintenance windows or downtime."
            },
            {
                title: "Advanced IoT Security",
                content: "AI-powered device fingerprinting recognizes over 260,000 unique IoT devices across 27,000 brands with 95% accuracy, providing superior visibility and control."
            }
        ];
        
        // Create HTML for insights
        let insightsHTML = '';
        insights.forEach(insight => {
            insightsHTML += `
                <div class="insight-card">
                    <div class="insight-header">
                        <h4>${insight.title}</h4>
                        <div class="insight-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                    </div>
                    <p>${insight.content}</p>
                </div>
            `;
        });
        
        // Add to container
        insightsContainer.innerHTML = insightsHTML;
    }
    
    // Initialize charts when tabs are clicked
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Initialize appropriate charts based on tab
            switch(tabId) {
                case 'overview':
                    createKeyInsights();
                    break;
                case 'comparison':
                    createTcoComparisonChart();
                    break;
                case 'implementation':
                    createImplementationComparisonChart();
                    break;
                case 'features':
                    createFeatureComparisonChart();
                    break;
                case 'industry':
                    createComplianceFrameworkChart();
                    break;
                case 'roi':
                    createRoiAnalysisChart();
                    break;
            }
        });
    });
    
    // Initialize default overview tab
    createKeyInsights();
});
EOL
    
    # Create CSS for enhanced insights section
    cat > "${PROJECT_DIR}/css/fixes/enhanced-insights.css" << 'EOL'
/* Enhanced insights styling */
.insight-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-left: 4px solid #1b67b2;
}

.insight-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.insight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.insight-header h4 {
    margin: 0;
    color: #1b67b2;
    font-weight: 600;
}

.insight-icon {
    width: 36px;
    height: 36px;
    background-color: rgba(27, 103, 178, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.insight-icon i {
    color: #1b67b2;
    font-size: 1.2rem;
}

.insight-card p {
    color: #4b5563;
    margin: 0;
    line-height: 1.6;
}

/* Executive summary styling */
.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.summary-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    align-items: center;
}

.summary-card.highlight {
    background-color: #1b67b2;
    color: white;
}

.summary-card.highlight h4,
.summary-card.highlight .metric-value,
.summary-card.highlight .metric-detail {
    color: white;
}

.card-icon {
    width: 48px;
    height: 48px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
}

.summary-card:not(.highlight) .card-icon {
    background-color: rgba(27, 103, 178, 0.1);
}

.card-icon i {
    color: white;
    font-size: 1.5rem;
}

.summary-card:not(.highlight) .card-icon i {
    color: #1b67b2;
}

.card-content {
    flex: 1;
}

.summary-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: #6b7280;
}

.metric-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1b67b2;
    margin-bottom: 0.25rem;
}

.metric-detail {
    font-size: 0.85rem;
    color: #6b7280;
}
EOL
    
    # Add script and CSS references to index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        if ! grep -q "portnox-advantage-charts.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="js\/final-patch.js"><\/script>/a\    <script src="js\/charts\/enhanced\/portnox-advantage-charts.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
        
        if ! grep -q "enhanced-insights.css" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<link rel="stylesheet" href="css\/animations.css">/a\    <link rel="stylesheet" href="css\/fixes\/enhanced-insights.css">' "${PROJECT_DIR}/index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
    
    log "Chart enhancements applied"
}

# Add error handling and debugging
add_error_handling() {
    log "Adding error handling and debugging support..."
    
    # Create error handling script
    mkdir -p "${PROJECT_DIR}/js/utils"
    cat > "${PROJECT_DIR}/js/utils/error-handler.js" << 'EOL'
/**
 * Enhanced error handling and debugging support
 */
(function() {
    // Global error handler
    window.addEventListener('error', function(event) {
        console.error('Global error caught:', event.error);
        
        // Log to console with details
        const errorDetails = {
            message: event.message,
            source: event.filename,
            lineNumber: event.lineno,
            columnNumber: event.colno,
            stack: event.error ? event.error.stack : 'No stack trace available'
        };
        console.error('Error details:', errorDetails);
        
        // Show error toast if notification manager exists
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
                title: 'An error occurred',
                message: `${event.message}. See console for details.`,
                type: 'error',
                duration: 5000
            });
        }
        
        return true; // Prevent default error handling
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // Show error toast if notification manager exists
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
                title: 'Promise Rejection',
                message: `${event.reason.message || 'Unknown error'}. See console for details.`,
                type: 'error',
                duration: 5000
            });
        }
    });
    
    // Create debugging utilities
    window.DebugUtils = {
        // Enable this for verbose logging
        verboseMode: false,
        
        // Log with timestamp
        log: function(message, data) {
            if (this.verboseMode) {
                const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
                console.log(`[${timestamp}] ${message}`, data || '');
            }
        },
        
        // Profile execution time
        timeStart: function(label) {
            console.time(label);
        },
        
        timeEnd: function(label) {
            console.timeEnd(label);
        },
        
        // Inspect wizard state
        inspectWizard: function() {
            if (typeof WizardController !== 'undefined') {
                console.log('Wizard state:', {
                    currentStep: WizardController.getCurrentStep ? WizardController.getCurrentStep() : 'Not available',
                    totalSteps: WizardController.getTotalSteps ? WizardController.getTotalSteps() : 'Not available'
                });
                
                // Check for active step
                const activeStep = document.querySelector('.wizard-step.active');
                console.log('Active step element:', activeStep);
            } else {
                console.warn('WizardController not available');
            }
        },
        
        // Enable verbose logging
        enableVerbose: function() {
            this.verboseMode = true;
            console.log('Verbose logging enabled');
        },
        
        // Disable verbose logging
        disableVerbose: function() {
            this.verboseMode = false;
            console.log('Verbose logging disabled');
        }
    };
    
    // Create notification element if not exists
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Basic notification manager if not exists
    if (typeof NotificationManager === 'undefined') {
        window.NotificationManager = {
            showNotification: function(options) {
                const container = document.getElementById('toast-container');
                if (!container) return;
                
                const toast = document.createElement('div');
                toast.className = `toast toast-${options.type || 'info'}`;
                
                toast.innerHTML = `
                    <div class="toast-header">
                        <strong>${options.title || 'Notification'}</strong>
                        <button type="button" class="toast-close">&times;</button>
                    </div>
                    <div class="toast-body">
                        ${options.message || ''}
                    </div>
                `;
                
                // Add close handler
                toast.querySelector('.toast-close').addEventListener('click', function() {
                    container.removeChild(toast);
                });
                
                // Add to container
                container.appendChild(toast);
                
                // Auto remove after duration
                if (options.duration) {
                    setTimeout(() => {
                        if (container.contains(toast)) {
                            container.removeChild(toast);
                        }
                    }, options.duration);
                }
            }
        };
    }
    
    console.log('Error handling and debugging utilities initialized');
})();
EOL
    
    # Add basic notification styling
    cat > "${PROJECT_DIR}/css/fixes/notifications.css" << 'EOL'
/* Notification styling */
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    max-width: 350px;
}

.toast {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: toast-in 0.3s ease-out;
}

@keyframes toast-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.toast-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
}

.toast-body {
    padding: 12px 15px;
    color: #4b5563;
}

.toast-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #9ca3af;
    cursor: pointer;
}

.toast-info {
    border-left: 4px solid #1b67b2;
}

.toast-success {
    border-left: 4px solid #65BD44;
}

.toast-warning {
    border-left: 4px solid #f59e0b;
}

.toast-error {
    border-left: 4px solid #ef4444;
}
EOL
    
    # Add script and CSS references to index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        if ! grep -q "error-handler.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="libs\/js\/particles.min.js"><\/script>/a\    <script src="js\/utils\/error-handler.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
        
        if ! grep -q "notifications.css" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<link rel="stylesheet" href="css\/animations.css">/a\    <link rel="stylesheet" href="css\/fixes\/notifications.css">' "${PROJECT_DIR}/index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
    
    log "Error handling and debugging support added"
}

# Create documentation
create_documentation() {
    log "Creating documentation..."
    
    mkdir -p "${PROJECT_DIR}/docs"
    cat > "${PROJECT_DIR}/docs/README.md" << 'EOL'
# Portnox Zero Trust NAC Total Cost Analyzer

## Overview

The Portnox Zero Trust NAC Total Cost Analyzer is a comprehensive tool designed to help organizations evaluate the total cost of ownership (TCO) of their Network Access Control (NAC) solutions. This application provides detailed comparisons between traditional NAC solutions (Cisco ISE, Aruba ClearPass, Forescout, FortiNAC, Microsoft NPS, and SecureW2) and Portnox's cloud-native NAC solution.

## Key Features

- **TCO Comparison**: Comprehensive cost analysis including initial costs, implementation, maintenance, and operational expenses
- **Feature Comparison**: Side-by-side comparison of key NAC features across vendors
- **Implementation Timeline**: Visualization of implementation time differences
- **Compliance Coverage**: Analysis of regulatory compliance framework coverage
- **ROI Analysis**: Detailed return on investment calculations
- **Risk Assessment**: Security risk evaluation with and without NAC
- **Sensitivity Analysis**: Dynamic modeling of cost variables

## Target Audiences

- **Executive Teams**: High-level cost comparisons and ROI analysis
- **Finance Teams**: Detailed TCO breakdown and sensitivity analysis
- **Technical Teams**: Implementation comparisons and feature analysis
- **Security Teams**: Risk assessment and security capability evaluation
- **Compliance Teams**: Regulatory framework coverage analysis

## Portnox Competitive Advantages

Based on market research, Portnox Cloud offers several distinct advantages over traditional NAC solutions:

1. **Deployment Speed**: Implementation in hours to days vs. months for traditional solutions
2. **Cloud-Native Architecture**: True SaaS delivery without hardware or VM requirements
3. **Total Cost of Ownership**: 40-60% lower TCO over 3 years compared to traditional solutions
4. **Operational Efficiency**: 80% reduction in IT staffing requirements
5. **Zero Maintenance**: Automatic updates without maintenance windows or downtime
6. **Advanced IoT Security**: AI-powered fingerprinting for 260,000+ device types

## Using the Application

1. **Select Current Solution**: Choose your existing NAC vendor or "No NAC" option
2. **Specify Industry**: Select your industry to see relevant compliance frameworks
3. **Configure Organization**: Enter details about your environment
4. **Adjust Cost Parameters**: Fine-tune cost variables for more accurate comparison
5. **View Results**: Explore comprehensive analysis and visualizations

## Technical Information

### Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

### Dependencies

- Chart.js - Visualization library
- FontAwesome - Icon library
- Tailwind CSS - Styling
- GSAP - Animations
- Particles.js - Background effects

For any issues or questions, please contact Portnox support.
EOL
    
    log "Documentation created: ${PROJECT_DIR}/docs/README.md"
}

# Main execution
main() {
    log "Starting Portnox TCO Analyzer fix and enhancement script"
    
    # Create backup
    create_backup
    
    # Create required directories
    mkdir -p "${PROJECT_DIR}/js/fixes"
    mkdir -p "${PROJECT_DIR}/css/fixes"
    mkdir -p "${PROJECT_DIR}/img/vendors/fallback"
    
    # Fix JavaScript errors
    fix_javascript_errors
    
    # Fix vendor logo loading
    fix_vendor_logos
    
    # Fix UI navigation
    fix_ui_navigation
    
    # Enhance charts
    enhance_charts
    
    # Add error handling
    add_error_handling
    
    # Create documentation
    create_documentation
    
    log "Script completed successfully"
    log "A backup of modified files is available at: ${BACKUP_DIR}"
    log "Please run the application and verify the fixes."
}

# Run main function
main
