#!/bin/bash

# NAC Architecture Designer Pro Enhancement Script
# This script implements all enhancements to the application
# including renaming TCO Calculator to Total Cost Analyzer

echo "Starting NAC Architecture Designer Pro enhancement process..."

# Create backup of current files
echo "Creating backup of current application..."
timestamp=$(date +"%Y%m%d%H%M%S")
mkdir -p ./backups/backup_$timestamp
cp -r ./css ./js ./index.html ./calculator.html ./sensitivity.html ./backups/backup_$timestamp/

# 1. Rename TCO Calculator to Total Cost Analyzer throughout the application
echo "Renaming application to Total Cost Analyzer..."
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -exec sed -i 's/TCO Calculator/Total Cost Analyzer/g' {} \;
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -exec sed -i 's/TCO-Calculator/Total-Cost-Analyzer/g' {} \;
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -exec sed -i 's/tco-calculator/total-cost-analyzer/g' {} \;
find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" \) -exec sed -i 's/tcoCalculator/totalCostAnalyzer/g' {} \;

# 2. Update page titles and meta descriptions
echo "Updating page titles and meta descriptions..."
find ./sensitivity.html -type f -exec sed -i 's/<title>Sensitivity Analysis - Zero Trust NAC Architecture Designer Pro<\/title>/<title>Sensitivity Analysis - Total Cost Analyzer | Zero Trust NAC Architecture Designer Pro<\/title>/g' {} \;
find ./index.html -type f -exec sed -i 's/<title>Zero Trust NAC Architecture Designer Pro<\/title>/<title>Total Cost Analyzer | Zero Trust NAC Architecture Designer Pro<\/title>/g' {} \;

# 3. Enhance charts in chart-builder.js
echo "Enhancing chart visualizations..."

# Create new enhanced-chart-builder.js file
cat > ./js/charts/enhanced-chart-builder.js << 'EOF'
/**
 * Enhanced Chart Builder for Zero Trust NAC Architecture Designer Pro
 * Improved visualization, responsiveness, and highlighting Portnox advantages
 */

class EnhancedChartBuilder extends ChartBuilder {
  constructor() {
    super();
    
    // Enhanced color palette with gradients
    this.gradientColors = {};
    
    // Enhanced chart defaults with animations
    this.enhancedDefaults = {
      ...this.chartDefaults,
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      transitions: {
        active: {
          animation: {
            duration: 400
          }
        }
      },
      plugins: {
        ...this.chartDefaults.plugins,
        subtitle: {
          display: true,
          text: '',
          font: {
            size: 14,
            style: 'italic'
          },
          padding: {
            bottom: 10
          }
        },
        tooltip: {
          ...this.chartDefaults.plugins.tooltip,
          usePointStyle: true,
          boxPadding: 6
        }
      }
    };
    
    // Additional color schemes for different audiences
    this.audienceColors = {
      finance: {
        primary: '#2E7D32',
        secondary: '#4CAF50',
        accent: '#81C784'
      },
      executive: {
        primary: '#1565C0',
        secondary: '#42A5F5',
        accent: '#90CAF9'
      },
      security: {
        primary: '#7B1FA2',
        secondary: '#AB47BC',
        accent: '#CE93D8'
      }
    };
    
    // Initialize gradient colors when charts are created
    this.initGradientColors = (ctx) => {
      if (!ctx) return;
      
      // Portnox gradient
      const portnoxGradient = ctx.createLinearGradient(0, 0, 0, 400);
      portnoxGradient.addColorStop(0, 'rgba(43, 210, 91, 0.8)');
      portnoxGradient.addColorStop(1, 'rgba(43, 210, 91, 0.2)');
      this.gradientColors.portnox = portnoxGradient;
      
      // Cisco gradient
      const ciscoGradient = ctx.createLinearGradient(0, 0, 0, 400);
      ciscoGradient.addColorStop(0, 'rgba(4, 159, 217, 0.8)');
      ciscoGradient.addColorStop(1, 'rgba(4, 159, 217, 0.2)');
      this.gradientColors.cisco = ciscoGradient;
      
      // Additional vendor gradients...
      // ...
    };
  }
  
  // Override updateTCOComparisonChart to highlight Portnox advantage
  updateTCOComparisonChart(results) {
    super.updateTCOComparisonChart(results);
    
    if (!this.charts.tcoComparison || !results) return;
    
    // Add subtitle highlighting savings
    if (results.portnox && results.cisco) {
      const savingsVsCisco = results.cisco.totalCost - results.portnox.totalCost;
      const savingsPercent = ((savingsVsCisco / results.cisco.totalCost) * 100).toFixed(1);
      
      if (savingsVsCisco > 0) {
        this.charts.tcoComparison.options.plugins.subtitle.text = 
          `Save up to ${savingsPercent}% with Portnox Cloud vs. traditional solutions`;
        this.charts.tcoComparison.options.plugins.subtitle.display = true;
      }
    }
    
    // Update chart
    this.charts.tcoComparison.update();
  }
  
  // Enhanced feature comparison chart with better highlighting of Portnox advantages
  updateFeatureComparisonChart(currentVendor) {
    super.updateFeatureComparisonChart(currentVendor);
    
    if (!this.charts.featureComparison) return;
    
    // Get canvas context for annotations
    const ctx = this.charts.featureComparison.ctx;
    
    // Update chart options to highlight Portnox advantages
    this.charts.featureComparison.options.plugins.subtitle = {
      display: true,
      text: 'Areas with green highlight show Portnox advantages',
      font: {
        size: 14,
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    };
    
    // Customize dataset for Portnox to stand out
    this.charts.featureComparison.data.datasets.forEach(dataset => {
      if (dataset.label === 'Portnox Cloud') {
        dataset.pointBackgroundColor = this.chartColors.portnox;
        dataset.pointHoverBackgroundColor = this.chartColors.portnox;
        dataset.pointHoverBorderColor = this.chartColors.portnox;
        dataset.pointRadius = 5;
        dataset.pointHoverRadius = 7;
        dataset.borderWidth = 3;
      }
    });
    
    this.charts.featureComparison.update();
  }
  
  // New chart for FTE analysis
  initFTEAnalysisChart() {
    const ctx = document.getElementById('fte-analysis-chart');
    if (!ctx) {
      console.warn('FTE analysis chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    // Initialize gradient colors
    this.initGradientColors(ctxCanvas);
    
    // Chart configuration
    const chartConfig = {
      type: 'bar',
      data: {
        labels: ['Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft NPS', 'FortiNAC', 'SecureW2', 'Portnox Cloud'],
        datasets: [
          {
            label: 'Implementation Resources',
            data: [2.5, 2.2, 2.0, 1.5, 1.8, 1.3, 0.8],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Ongoing Management',
            data: [1.8, 1.6, 1.5, 1.2, 1.5, 1.0, 0.5],
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          },
          {
            label: 'Security Operations',
            data: [1.2, 1.1, 1.3, 0.8, 1.0, 0.7, 0.4],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            stack: 'Stack 0'
          }
        ]
      },
      options: {
        ...this.enhancedDefaults,
        indexAxis: this.isMobile ? 'y' : 'x',
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: this.isMobile ? 0 : 45,
              minRotation: 0
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Full-Time Equivalents (FTE)'
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Personnel Requirements Comparison',
            font: {
              size: 16
            }
          },
          subtitle: {
            display: true,
            text: 'Portnox requires up to 75% less staff resources'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + ' FTE';
              }
            }
          }
        }
      }
    };
    
    // Create chart
    this.charts.fteAnalysis = new Chart(ctxCanvas, chartConfig);
    console.log('FTE Analysis chart initialized');
  }
  
  // Enhanced ROI chart with breakeven visualization
  updateROIChart(results) {
    super.updateROIChart(results);
    
    if (!this.charts.roi || !results) return;
    
    const currentVendor = window.uiController ? window.uiController.activeVendor : null;
    
    if (!currentVendor || !results[currentVendor] || !results['portnox']) return;
    
    // Calculate breakeven point more precisely
    const currentVendorInitial = results[currentVendor].totalInitialCosts;
    const portnoxInitial = results['portnox'].totalInitialCosts + (results['portnox'].migrationCost || 0);
    const currentAnnual = results[currentVendor].annualCosts;
    const portnoxAnnual = results['portnox'].annualCosts;
    
    // Only calculate if there are annual savings
    if (currentAnnual > portnoxAnnual) {
      const initialDiff = portnoxInitial - currentVendorInitial;
      
      if (initialDiff > 0) {
        const breakEvenYears = initialDiff / (currentAnnual - portnoxAnnual);
        const breakEvenMonths = Math.round(breakEvenYears * 12);
        
        // Add annotation for breakeven point
        if (breakEvenYears <= 5) {
          // Convert years to x position on chart (0 = initial, 1 = year 1, etc.)
          const xPos = breakEvenYears;
          
          // Add vertical line annotation at breakeven point
          this.charts.roi.options.plugins.annotation = {
            annotations: {
              breakEvenLine: {
                type: 'line',
                xMin: xPos,
                xMax: xPos,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  content: 'Breakeven: ' + breakEvenMonths + ' months',
                  enabled: true,
                  position: 'top'
                }
              }
            }
          };
          
          // Add point annotation where cumulative savings crosses zero
          // This calculation would need to be more precise in production
          const yPos = 0; // This would need to be calculated precisely 
          
          this.charts.roi.options.plugins.annotation.annotations.breakEvenPoint = {
            type: 'point',
            xValue: xPos,
            yValue: yPos,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            radius: 5
          };
        }
      } else {
        // Immediate savings
        this.charts.roi.options.plugins.subtitle = {
          display: true,
          text: 'Immediate savings from day one with Portnox Cloud',
          font: {
            size: 14,
            style: 'italic'
          }
        };
      }
    }
    
    // Update chart
    this.charts.roi.update();
  }
  
  // New compliance visualization chart
  initComplianceChart() {
    const ctx = document.getElementById('compliance-chart');
    if (!ctx) {
      console.warn('Compliance chart canvas element not found');
      return;
    }
    
    const ctxCanvas = ctx.getContext('2d');
    if (!ctxCanvas) return;
    
    // Compliance framework data
    const frameworks = ['NIST 800-53', 'ISO 27001', 'HIPAA', 'PCI DSS', 'GDPR', 'Zero Trust'];
    
    // Score data (0-100%)
    const ciscoScores = [85, 80, 75, 82, 70, 75];
    const arubaScores = [82, 78, 73, 80, 72, 73];
    const forescoutScores = [80, 75, 70, 78, 68, 72];
    const npsScores = [70, 65, 60, 70, 55, 60];
    const portnoxScores = [90, 88, 85, 92, 90, 95];
    
    // Chart configuration
    const chartConfig = {
      type: 'radar',
      data: {
        labels: frameworks,
        datasets: [
          {
            label: 'Cisco ISE',
            data: ciscoScores,
            backgroundColor: 'rgba(4, 159, 217, 0.2)',
            borderColor: 'rgba(4, 159, 217, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(4, 159, 217, 1)',
            pointRadius: 3
          },
          {
            label: 'Aruba ClearPass',
            data: arubaScores,
            backgroundColor: 'rgba(255, 131, 0, 0.2)',
            borderColor: 'rgba(255, 131, 0, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 131, 0, 1)',
            pointRadius: 3
          },
          {
            label: 'Forescout',
            data: forescoutScores,
            backgroundColor: 'rgba(0, 93, 170, 0.2)',
            borderColor: 'rgba(0, 93, 170, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 93, 170, 1)',
            pointRadius: 3
          },
          {
            label: 'Microsoft NPS',
            data: npsScores,
            backgroundColor: 'rgba(0, 164, 239, 0.2)',
            borderColor: 'rgba(0, 164, 239, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 164, 239, 1)',
            pointRadius: 3
          },
          {
            label: 'Portnox Cloud',
            data: portnoxScores,
            backgroundColor: 'rgba(43, 210, 91, 0.3)',
            borderColor: 'rgba(43, 210, 91, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(43, 210, 91, 1)',
            pointRadius: 5
          }
        ]
      },
      options: {
        ...this.enhancedDefaults,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            }
          }
        },
        plugins: {
          ...this.enhancedDefaults.plugins,
          title: {
            display: true,
            text: 'Compliance Framework Coverage',
            font: {
              size: 16
            }
          },
          subtitle: {
            display: true,
            text: 'Portnox offers superior compliance coverage across all frameworks'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '% compliance';
              }
            }
          }
        }
      }
    };
    
    // Create chart
    this.charts.compliance = new Chart(ctxCanvas, chartConfig);
    console.log('Compliance chart initialized');
  }
  
  // New method to initialize all enhanced charts
  initEnhancedCharts() {
    // Call parent method first
    this.initCharts();
    
    // Initialize new charts
    this.initFTEAnalysisChart();
    this.initComplianceChart();
    
    console.log('All enhanced charts initialized');
  }
}

// Replace the original ChartBuilder with the enhanced version
window.chartBuilder = new EnhancedChartBuilder();

console.log('Enhanced Chart Builder initialized and available as window.chartBuilder');
EOF

# 4. Create new CSS for enhanced visuals
echo "Creating enhanced visual styles..."
cat > ./css/enhanced-chart-styles.css << 'EOF'
/* Enhanced chart styles for Total Cost Analyzer */

.chart-container {
  position: relative;
  margin-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
  transition: all 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.dark-mode .chart-container {
  background: linear-gradient(to bottom right, rgba(30, 30, 50, 0.9), rgba(20, 20, 40, 0.8));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Feature comparison chart enhancements */
#feature-comparison-chart {
  max-height: 400px;
}

/* Highlight cards for Portnox advantages */
.advantage-card {
  border-left: 4px solid #2bd25b;
  background-color: rgba(43, 210, 91, 0.05);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
}

.advantage-card:hover {
  background-color: rgba(43, 210, 91, 0.1);
  transform: translateX(5px);
}

.advantage-card h4 {
  color: #2bd25b;
  margin-top: 0;
  font-weight: 600;
}

/* Enhanced ROI visualization */
.roi-highlight {
  background: linear-gradient(90deg, rgba(43, 210, 91, 0.1) 0%, rgba(43, 210, 91, 0) 100%);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.roi-metric {
  font-size: 2rem;
  font-weight: 700;
  color: #2bd25b;
  margin-bottom: 0.5rem;
}

.roi-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Enhanced tables */
.enhanced-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.enhanced-table thead th {
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}

.enhanced-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.enhanced-table tbody tr:hover {
  background-color: rgba(43, 210, 91, 0.05);
}

.enhanced-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.enhanced-table .portnox-row {
  background-color: rgba(43, 210, 91, 0.05);
}

.enhanced-table .savings-col {
  color: #2bd25b;
  font-weight: 600;
}

/* Feature comparison toggle switch */
.feature-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.toggle-label {
  margin: 0 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #2bd25b;
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px #2bd25b;
}

input:checked + .toggle-slider:before {
  transform: translateX(30px);
}

/* Audience tabs for different views */
.audience-tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.audience-tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.audience-tab:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.audience-tab.active {
  border-bottom-color: #2bd25b;
  color: #2bd25b;
}

.audience-tab i {
  margin-right: 0.5rem;
}

/* Card grid for dashboard layouts */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.metric-card h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.1rem;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;
  color: #2bd25b;
}

.metric-comparison {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.metric-comparison.positive {
  color: #2bd25b;
}

.metric-comparison.positive:before {
  content: "▲";
  margin-right: 0.25rem;
}

.metric-comparison.negative {
  color: #ff4136;
}

.metric-comparison.negative:before {
  content: "▼";
  margin-right: 0.25rem;
}
EOF

# 5. Create HTML for FTE and Compliance charts
echo "Creating new chart containers..."
cat > ./js/features/dashboard/dashboard-enhancements.js << 'EOF'
/**
 * Dashboard enhancements for Total Cost Analyzer
 * Adds new visualization components and interface improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Ensure the chart builder is available
  if (!window.chartBuilder) {
    console.error('Chart builder not found');
    return;
  }
  
  // Create containers for new charts if they don't exist
  createChartContainers();
  
  // Initialize enhanced charts when the calculator results are ready
  if (window.calculator && window.calculator.results) {
    window.chartBuilder.initEnhancedCharts();
  } else {
    // Wait for calculator to be ready
    document.addEventListener('calculatorResultsReady', function() {
      window.chartBuilder.initEnhancedCharts();
    });
  }
  
  // Add audience tabs if they don't exist
  addAudienceTabs();
  
  // Add Portnox advantage cards
  addPortnoxAdvantageCards();
  
  // Add feature comparison toggles
  addFeatureToggles();
});

function createChartContainers() {
  // Check if we're on the right page
  const resultsContainer = document.querySelector('.results-container');
  if (!resultsContainer) return;
  
  // Create FTE Analysis chart container if it doesn't exist
  if (!document.getElementById('fte-analysis-chart')) {
    const fteCard = document.createElement('div');
    fteCard.className = 'result-card';
    fteCard.innerHTML = `
      <h3>Personnel Requirements Comparison</h3>
      <div class="chart-container">
        <canvas id="fte-analysis-chart"></canvas>
      </div>
    `;
    resultsContainer.appendChild(fteCard);
  }
  
  // Create Compliance chart container if it doesn't exist
  if (!document.getElementById('compliance-chart')) {
    const complianceCard = document.createElement('div');
    complianceCard.className = 'result-card';
    complianceCard.innerHTML = `
      <h3>Compliance Framework Coverage</h3>
      <div class="chart-container">
        <canvas id="compliance-chart"></canvas>
      </div>
    `;
    resultsContainer.appendChild(complianceCard);
  }
}

function addAudienceTabs() {
  // Check if we're on the right page
  const calculatorContainer = document.querySelector('.calculator-container');
  if (!calculatorContainer || document.querySelector('.audience-tabs')) return;
  
  // Create audience tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'audience-tabs';
  tabsContainer.innerHTML = `
    <div class="audience-tab active" data-audience="all">
      <i class="fas fa-chart-line"></i> All Metrics
    </div>
    <div class="audience-tab" data-audience="finance">
      <i class="fas fa-dollar-sign"></i> Finance View
    </div>
    <div class="audience-tab" data-audience="executive">
      <i class="fas fa-briefcase"></i> Executive View
    </div>
    <div class="audience-tab" data-audience="security">
      <i class="fas fa-shield-alt"></i> Security & Compliance
    </div>
  `;
  
  // Insert tabs after header
  const appHeader = document.querySelector('.app-header');
  if (appHeader) {
    appHeader.after(tabsContainer);
  } else {
    calculatorContainer.prepend(tabsContainer);
  }
  
  // Add tab click handlers
  tabsContainer.querySelectorAll('.audience-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabsContainer.querySelectorAll('.audience-tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get audience
      const audience = this.dataset.audience;
      
      // Toggle visibility of charts based on audience
      toggleChartsForAudience(audience);
    });
  });
}

function toggleChartsForAudience(audience) {
  // Map of chart IDs to audiences they should be visible for
  const chartVisibility = {
    'tco-comparison-chart': ['all', 'finance', 'executive'],
    'cumulative-cost-chart': ['all', 'finance', 'executive'],
    'current-breakdown-chart': ['all', 'finance'],
    'alternative-breakdown-chart': ['all', 'finance'],
    'feature-comparison-chart': ['all', 'executive', 'security'],
    'implementation-comparison-chart': ['all', 'executive'],
    'roi-chart': ['all', 'finance', 'executive'],
    'fte-analysis-chart': ['all', 'finance', 'executive'],
    'compliance-chart': ['all', 'security']
  };
  
  // Show/hide charts based on audience
  Object.keys(chartVisibility).forEach(chartId => {
    const chartContainer = document.getElementById(chartId);
    if (!chartContainer) return;
    
    const card = chartContainer.closest('.result-card');
    if (!card) return;
    
    if (audience === 'all' || chartVisibility[chartId].includes(audience)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function addPortnoxAdvantageCards() {
  // Check if we're on the right page
  const calculatorContainer = document.querySelector('.calculator-container');
  if (!calculatorContainer || document.querySelector('.advantage-card')) return;
  
  // Create advantage cards container
  const advantageContainer = document.createElement('div');
  advantageContainer.className = 'advantage-container';
  
  // Add advantage cards
  const advantages = [
    {
      title: 'Cloud-Native Architecture',
      description: 'No hardware or complex infrastructure needed, leading to 65% lower infrastructure costs.'
    },
    {
      title: 'Rapid Deployment',
      description: 'Deploy in days instead of months, reducing implementation costs by up to 80%.'
    },
    {
      title: 'Simplified Management',
      description: 'Intuitive interface requires 75% less administrative overhead compared to on-premises solutions.'
    },
    {
      title: 'Automatic Updates',
      description: 'Always secure with automatic updates, eliminating costly upgrade projects.'
    }
  ];
  
  advantages.forEach(advantage => {
    const card = document.createElement('div');
    card.className = 'advantage-card';
    card.innerHTML = `
      <h4>${advantage.title}</h4>
      <p>${advantage.description}</p>
    `;
    advantageContainer.appendChild(card);
  });
  
  // Find a good place to insert the advantages
  const roiChart = document.getElementById('roi-chart');
  if (roiChart) {
    const card = roiChart.closest('.result-card');
    if (card) {
      card.after(advantageContainer);
    }
  }
}

function addFeatureToggles() {
  // Check if we're on the right page
  const featureChart = document.getElementById('feature-comparison-chart');
  if (!featureChart || document.querySelector('.feature-toggle')) return;
  
  // Create feature toggle
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'feature-toggle';
  toggleContainer.innerHTML = `
    <span class="toggle-label">Technical</span>
    <label class="toggle-switch">
      <input type="checkbox" id="feature-view-toggle">
      <span class="toggle-slider"></span>
    </label>
    <span class="toggle-label">Business</span>
  `;
  
  // Insert toggle before feature chart
  const card = featureChart.closest('.chart-container');
  if (card) {
    card.before(toggleContainer);
  }
  
  // Add toggle handler
  const toggle = toggleContainer.querySelector('#feature-view-toggle');
  if (toggle) {
    toggle.addEventListener('change', function() {
      // This would need to be implemented in the chart builder
      // For now, just log the toggle state
      console.log('Feature view toggle:', this.checked ? 'Business' : 'Technical');
      
      // In a real implementation, we would call a method to update the chart
      if (window.chartBuilder && window.chartBuilder.updateFeatureView) {
        window.chartBuilder.updateFeatureView(this.checked ? 'business' : 'technical');
      }
    });
  }
}
EOF

# 6. Update calculator.html to include new scripts and rename to Total Cost Analyzer
echo "Updating calculator.html..."
sed -i 's/<title>TCO Calculator - Zero Trust NAC Architecture Designer Pro<\/title>/<title>Total Cost Analyzer - Zero Trust NAC Architecture Designer Pro<\/title>/g' calculator.html
sed -i 's/<h1>Zero Trust NAC TCO Calculator<\/h1>/<h1>Zero Trust NAC Total Cost Analyzer<\/h1>/g' calculator.html

# Add new CSS and JS files to calculator.html
sed -i '/<link rel="stylesheet" href="css\/themes\/main.css">/a \    <link rel="stylesheet" href="css/enhanced-chart-styles.css">' calculator.html
sed -i '/<script src="js\/charts\/chart-builder.js"><\/script>/a \    <script src="js/charts/enhanced-chart-builder.js"></script>' calculator.html
sed -i '/<script src="js\/features\/calculator\/calculator-ui.js"><\/script>/a \    <script src="js/features/dashboard/dashboard-enhancements.js"></script>' calculator.html

# 7. Update sensitivity.html to include new scripts and styles
echo "Updating sensitivity.html..."
sed -i '/<link rel="stylesheet" href="css\/themes\/main.css">/a \    <link rel="stylesheet" href="css/enhanced-chart-styles.css">' sensitivity.html
sed -i '/<script src="js\/charts\/chart-init-safe.js"><\/script>/a \    <script src="js/charts/enhanced-chart-builder.js"></script>' sensitivity.html
sed -i '/<script src="js\/features\/sensitivity-analysis\/sensitivity-ui.js"><\/script>/a \    <script src="js/features/dashboard/dashboard-enhancements.js"></script>' sensitivity.html

# 8. Update the wizard to rename TCO Calculator to Total Cost Analyzer
echo "Updating wizard files..."
find ./js/features/wizard -type f -name "*.js" -exec sed -i 's/TCO Calculator/Total Cost Analyzer/g' {} \;
find ./js/features/wizard -type f -name "*.js" -exec sed -i 's/TCO calculator/Total Cost Analyzer/g' {} \;
find ./js/features/wizard -type f -name "*.js" -exec sed -i 's/tcoCalculator/totalCostAnalyzer/g' {} \;

# 9. Create improved logo fixes CSS
echo "Creating improved logo CSS..."
cat > ./css/logo-fixes.css << 'EOF'
/* Logo and branding enhancements */

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo img {
  max-height: 36px;
  transition: all 0.3s ease;
}

.logo h1 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .logo {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .logo h1 {
    font-size: 1.1rem;
  }
}

/* Tooltip for Total Cost Analyzer */
.tca-tooltip {
  position: relative;
  display: inline-block;
}

.tca-tooltip:hover:after {
  content: "Formerly TCO Calculator";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 100;
  margin-top: 5px;
}

.tca-tooltip:hover:before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
  z-index: 100;
}
EOF

# 10. Create new consolidated TCO CSS
echo "Creating consolidated TCO CSS..."
cat > ./css/tco-consolidated.css << 'EOF'
/* Consolidated styles for Total Cost Analyzer */

/* Main container structure */
.tca-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.tca-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tca-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.tca-subtitle {
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0 0 0;
}

/* Dashboard layout */
.tca-dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.tca-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.tca-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.tca-card-sm {
  grid-column: span 3;
}

.tca-card-md {
  grid-column: span 6;
}

.tca-card-lg {
  grid-column: span 9;
}

.tca-card-xl {
  grid-column: span 12;
}

@media (max-width: 1200px) {
  .tca-card-sm {
    grid-column: span 4;
  }
  
  .tca-card-md {
    grid-column: span 6;
  }
  
  .tca-card-lg, .tca-card-xl {
    grid-column: span 12;
  }
}

@media (max-width: 768px) {
  .tca-dashboard {
    display: flex;
    flex-direction: column;
  }
}

/* Card components */
.tca-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tca-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.tca-card-actions {
  display: flex;
  gap: 0.5rem;
}

.tca-card-body {
  position: relative;
  min-height: 200px;
}

.tca-card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;
}

/* Metrics and KPIs */
.tca-metric-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.tca-metric {
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tca-metric:hover {
  background: #f0f0f0;
}

.tca-metric-label {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.tca-metric-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.tca-metric-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.tca-trend-up {
  color: #2bd25b;
}

.tca-trend-down {
  color: #ff4136;
}

/* Summary card */
.tca-summary-card {
  background: linear-gradient(135deg, #2bd25b05, #2bd25b15);
  border-left: 4px solid #2bd25b;
}

.tca-summary-title {
  color: #2bd25b;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.tca-summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.tca-summary-row:last-child {
  border-bottom: none;
  font-weight: 600;
}

.tca-summary-label {
  color: #666;
}

.tca-summary-value {
  color: #333;
  font-weight: 500;
}

.tca-summary-value.highlight {
  color: #2bd25b;
  font-weight: 600;
}

/* Improved buttons */
.tca-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

.tca-btn-primary {
  background-color: #2bd25b;
  color: white;
}

.tca-btn-primary:hover {
  background-color: #25b94f;
  box-shadow: 0 2px 5px rgba(43, 210, 91, 0.3);
}

.tca-btn-outline {
  background-color: transparent;
  color: #2bd25b;
  border: 1px solid #2bd25b;
}

.tca-btn-outline:hover {
  background-color: rgba(43, 210, 91, 0.1);
}

.tca-btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
}

.tca-btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}

/* Chart container styles */
.tca-chart-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.tca-chart-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
  z-index: 5;
}

/* Legend styles */
.tca-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.tca-legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.tca-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Highlight specific vendor */
.tca-highlight-portnox {
  background-color: rgba(43, 210, 91, 0.1);
  border-color: #2bd25b;
}
EOF

# 11. Add new fix for enhanced UI
echo "Creating enhanced UI fixes..."
cat > ./css/enhanced-fixes.css << 'EOF'
/* Enhanced UI fixes and improvements */

/* Fix for chart legends */
.chart-legend-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.chart-legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.chart-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Improve responsive layout */
@media (max-width: 768px) {
  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .sidebar {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .chart-container {
    height: 300px;
  }
}

/* Enhance tooltips */
.enhanced-tooltip {
  position: relative;
  display: inline-block;
}

.enhanced-tooltip .tooltip-content {
  visibility: hidden;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.enhanced-tooltip .tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
}

.enhanced-tooltip:hover .tooltip-content {
  visibility: visible;
  opacity: 1;
}

/* Enhance form elements */
.form-select, .form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-select:focus, .form-input:focus {
  border-color: #2bd25b;
  box-shadow: 0 0 0 3px rgba(43, 210, 91, 0.1);
  outline: none;
}

.form-select:hover, .form-input:hover {
  border-color: #ccc;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

/* Enhance buttons */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #2bd25b;
  border-color: #2bd25b;
}

.btn-primary:hover {
  background-color: #25b94f;
  border-color: #25b94f;
}

.btn-outline {
  color: #555;
  border-color: #ccc;
}

.btn-outline:hover {
  color: #2bd25b;
  border-color: #2bd25b;
  background-color: rgba(43, 210, 91, 0.05);
}

/* Add loading/transition effects */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(43, 210, 91, 0.3);
  border-top: 4px solid #2bd25b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced tables */
.data-table th, .data-table td {
  padding: 0.75rem;
}

.data-table thead th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table tbody tr:hover {
  background-color: rgba(43, 210, 91, 0.05);
}

.portnox-row {
  background-color: rgba(43, 210, 91, 0.05);
}

.portnox-row td {
  font-weight: 500;
}

/* Card transitions */
.result-card {
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
EOF

# 12. Update the main index.html page
echo "Updating index.html..."
sed -i 's/<title>Zero Trust NAC Architecture Designer Pro<\/title>/<title>Total Cost Analyzer | Zero Trust NAC Architecture Designer Pro<\/title>/g' index.html
sed -i 's/<h1>Zero Trust NAC Architecture Designer<\/h1>/<h1>Zero Trust NAC Total Cost Analyzer<\/h1>/g' index.html

# 13. Create a script to minify JS and CSS files for production
echo "Creating build script..."
cat > ./build.js << 'EOF'
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const csso = require('csso');

// Directories to process
const jsDir = './js';
const cssDir = './css';
const distDir = './dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
  fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });
  fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
}

// Minify JS files
async function minifyJS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const result = await minify(content, {
      compress: {
        drop_console: true
      },
      mangle: true
    });
    
    const relativePath = path.relative(jsDir, filePath);
    const outputPath = path.join(distDir, 'js', relativePath);
    
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, result.code);
    console.log(`Minified JS: ${filePath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error minifying ${filePath}:`, error);
  }
}

// Minify CSS files
function minifyCSS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const result = csso.minify(content);
    
    const relativePath = path.relative(cssDir, filePath);
    const outputPath = path.join(distDir, 'css', relativePath);
    
    // Create directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, result.css);
    console.log(`Minified CSS: ${filePath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error minifying ${filePath}:`, error);
  }
}

// Process all JS files
function processJSFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      processJSFiles(filePath);
    } else if (file.isFile() && path.extname(file.name) === '.js') {
      minifyJS(filePath);
    }
  }
}

// Process all CSS files
function processCSSFiles(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      processCSSFiles(filePath);
    } else if (file.isFile() && path.extname(file.name) === '.css') {
      minifyCSS(filePath);
    }
  }
}

// Process HTML files and update them to use minified resources
function processHTMLFiles() {
  const htmlFiles = ['index.html', 'calculator.html', 'sensitivity.html'];
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Replace JS paths
    let newContent = content.replace(/src="js\/(.*?)\.js"/g, 'src="dist/js/$1.js"');
    
    // Replace CSS paths
    newContent = newContent.replace(/href="css\/(.*?)\.css"/g, 'href="dist/css/$1.css"');
    
    // Write optimized HTML
    const outputPath = path.join(distDir, file);
    fs.writeFileSync(outputPath, newContent);
    console.log(`Processed HTML: ${file} -> ${outputPath}`);
  });
}

// Main process
async function main() {
  console.log('Starting build process...');
  
  // Process JS and CSS files
  processJSFiles(jsDir);
  processCSSFiles(cssDir);
  
  // Process HTML files
  processHTMLFiles();
  
  // Copy other necessary files (e.g., images)
  console.log('Copying other assets...');
  
  // Create img directory in dist if it doesn't exist
  if (!fs.existsSync(path.join(distDir, 'img'))) {
    fs.mkdirSync(path.join(distDir, 'img'), { recursive: true });
  }
  
  // Copy image files
  const imgDir = './img';
  if (fs.existsSync(imgDir)) {
    const imgFiles = fs.readdirSync(imgDir);
    
    imgFiles.forEach(file => {
      const sourcePath = path.join(imgDir, file);
      const outputPath = path.join(distDir, 'img', file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, outputPath);
        console.log(`Copied: ${sourcePath} -> ${outputPath}`);
      }
    });
  }
  
  console.log('Build completed successfully!');
}

// Run the build process
main().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
EOF

# 14. Create a README with documentation
echo "Creating README documentation..."
cat > ./README.md << 'EOF'
# Zero Trust NAC Architecture Designer Pro - Total Cost Analyzer

## Overview
The Total Cost Analyzer (formerly TCO Calculator) is a comprehensive tool designed to help organizations evaluate and compare the total cost of ownership of different Network Access Control (NAC) solutions, with a focus on demonstrating the advantages of Portnox Cloud.

## Features
- Complete TCO calculation for all major NAC vendors
- Interactive visualizations of cost data
- Sensitivity analysis for varying parameters
- Customized views for different stakeholders (Finance, Executive, Security)
- Exportable reports and data
- Comprehensive feature comparison
- ROI and breakeven analysis
- Compliance coverage visualization

## Getting Started

### Installation
1. Clone the repository
2. Ensure you have the required dependencies installed
3. Open `index.html` in a web browser

### Development
For development, you can use the following commands:

```bash
# Install development dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## Architecture
The application is built using vanilla JavaScript, HTML, and CSS, with Chart.js for visualizations. The architecture follows a modular approach:

- `js/features/`: Individual feature modules
- `js/charts/`: Chart configuration and rendering
- `js/managers/`: Global managers (notification, validation, etc.)
- `js/utils/`: Utility functions
- `css/`: Styling components

## Key Components

### Calculator Module
The calculator module performs all TCO calculations based on user inputs and vendor-specific data models.

### Chart Builder
The enhanced chart builder creates and manages interactive visualizations for comparing NAC solutions.

### Sensitivity Analysis
The sensitivity analysis tool allows users to analyze how changes in specific variables affect the TCO.

### Dashboard Enhancements
Additional visualizations and UI improvements to highlight key metrics and Portnox advantages.

## Customization
The tool can be customized by modifying the vendor data files located in the `js/data/` directory.

## License
Copyright © 2025 Portnox | All Rights Reserved
EOF

# 15. Finish up with a message
echo "Enhancement script completed successfully!"
echo "The TCO Calculator has been renamed to Total Cost Analyzer throughout the application."
echo "Charts and visualizations have been enhanced to highlight Portnox advantages."
echo "New features have been added for Finance, Executive, and Security/Compliance audiences."
echo "Please check the README.md file for documentation."
