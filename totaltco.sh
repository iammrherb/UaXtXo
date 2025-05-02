check_sensitivity_button() {
  if grep -q "sensitivity-analysis-btn" index.html; then
    echo "✓ Sensitivity analysis button already exists - skipping"
    return 0
  else
    return 1
  fi
}

#!/bin/bash
# Enhanced NAC TCO Calculator Fix Script - Version 2.0
# Comprehensive update that fixes errors, enhances visuals, improves reporting,
# and adds more configuration options

# Color formatting for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║             Portnox Total Cost Analysis - Comprehensive Update             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════════════╝${NC}"

# Create necessary directories if they don't exist
mkdir -p img
mkdir -p js/components
mkdir -p js/fixes
mkdir -p css/enhanced
mkdir -p data

echo -e "\n${YELLOW}[1/12] 🔄 Updating application name and branding...${NC}"

# Update title and application name in index.html
if [ -f "index.html" ]; then
  sed -i 's/<title>NAC TCO Calculator - Zero Trust Network Access Control<\/title>/<title>Portnox Total Cost Analysis - Zero Trust Network Access Control<\/title>/' index.html
  sed -i 's/<h1>NAC TCO Calculator<\/h1>/<h1>Portnox Total Cost Analysis<\/h1>/' index.html
  echo -e "${GREEN}✓ Updated application title and header${NC}"
else
  echo -e "${RED}✗ index.html not found${NC}"
fi

# Download and use the official Portnox logo
echo -e "\n${YELLOW}[2/12] 🖼️ Updating logo and creating fallbacks...${NC}"

# Create a download function with retry logic
download_with_retry() {
  local url=$1
  local output=$2
  local max_attempts=3
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    echo "Download attempt $attempt of $max_attempts..."
    if curl -s -L "$url" -o "$output"; then
      echo "Download successful!"
      return 0
    else
      echo "Download failed. Retrying in 2 seconds..."
      sleep 2
      attempt=$((attempt+1))
    fi
  done
  
  echo "Failed to download after $max_attempts attempts. Using fallback."
  return 1
}

# Try to download the official Portnox logo
if ! download_with_retry "https://www.portnox.com/wp-content/uploads/2021/03/Portnotx_Logo_Color-768x193.png" "img/portnox-logo.png"; then
  # If download fails, create a fallback SVG logo
  cat > img/portnox-logo.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <style>
    .logo-text { fill: #05547C; font-family: Arial, sans-serif; font-weight: bold; }
    .accent { fill: #65BD44; }
  </style>
  <rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/>
  <circle cx="20" cy="25" r="8" fill="#65BD44"/>
  <text x="45" y="32" class="logo-text" font-size="20">Portnox</text>
  <path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/>
</svg>
EOL
  echo -e "${YELLOW}⚠ Created SVG fallback logo${NC}"
else
  echo -e "${GREEN}✓ Downloaded official Portnox logo${NC}"
  
  # Create an SVG version as backup
  cat > img/portnox-logo.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <style>
    .logo-text { fill: #05547C; font-family: Arial, sans-serif; font-weight: bold; }
    .accent { fill: #65BD44; }
  </style>
  <rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/>
  <circle cx="20" cy="25" r="8" fill="#65BD44"/>
  <text x="45" y="32" class="logo-text" font-size="20">Portnox</text>
  <path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/>
</svg>
EOL
fi

# Update logo in the HTML and fix the logo handling
if [ -f "index.html" ]; then
  # Update logo image reference
  sed -i 's/<img src="img\/logo.svg" onerror="this.src='\''img\/logo.png'\''" alt="Portnox Logo" style="height:40px; width:auto;">/<img src="img\/portnox-logo.svg" onerror="this.src='\''img\/portnox-logo.png'\''" alt="Portnox Logo" style="height:40px; width:auto;">/' index.html

  # Update color scheme for the app
  cat > css/enhanced/branding.css << 'EOL'
/* Enhanced branding colors for Portnox Total Cost Analysis */
:root {
    --primary-color: #05547C;
    --primary-dark: #033E5B;
    --primary-light: #1B8DC0;
    --accent-color: #65BD44;
    --accent-dark: #4D9132;
    --accent-light: #8ED070;
    --danger-color: #B54369;
    --warning-color: #F7941D;
    --text-primary: #202020;
    --text-secondary: #505050;
    --text-light: #707070;
    --text-white: #FFFFFF;
}

/* Logo adjustments */
.logo img {
  height: 45px;
  width: auto;
  object-fit: contain;
  transition: all 0.2s ease;
}

.logo h1 {
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-left: 15px;
}

/* Update header & button colors */
.app-header {
  border-bottom-color: var(--accent-color);
}

.btn-primary {
  background-color: var(--accent-color);
  border-color: var(--accent-dark);
}

.btn-primary:hover {
  background-color: var(--accent-dark);
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom-color: var(--accent-color);
}

/* Update comparison highlight card */
.comparison-highlight-card {
  background: linear-gradient(135deg, rgba(5, 84, 124, 0.1) 0%, rgba(101, 189, 68, 0.1) 100%);
  border: 1px solid rgba(101, 189, 68, 0.3);
}

.metric-value {
  color: var(--accent-color);
}

.progress {
  background-color: var(--accent-color);
}

/* Benefit icons */
.benefit-icon {
  color: var(--accent-color);
}

.benefit-content h5 {
  color: var(--primary-color);
}

.benefit-metric {
  color: var(--accent-color);
}

/* Enhanced chart colors */
.chart-container {
  --chart-primary: var(--primary-color);
  --chart-secondary: var(--accent-color);
}
EOL

  # Add the new CSS to index.html
  sed -i '/<link rel="stylesheet" href="css\/logo-fixes.css">/a \  <link rel="stylesheet" href="css\/enhanced\/branding.css">' index.html
  
  echo -e "${GREEN}✓ Updated logo references and created enhanced branding CSS${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot update logo references${NC}"
fi

echo -e "\n${YELLOW}[3/12] 🧰 Fixing chart loading issues...${NC}"

# Create a chart fix to ensure all charts load correctly
cat > js/fixes/chart-fix.js << 'EOL'
/**
 * Enhanced chart loading fix
 * - Ensures all charts are properly initialized and displayed
 * - Prevents chart canvas errors
 * - Ensures ROI chart is created and accessible
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chart fixes...');
    
    // Chart requirements - make sure all containers exist
    const requiredCharts = [
      { id: 'tco-comparison-chart', title: 'TCO Comparison' },
      { id: 'cumulative-cost-chart', title: 'Cumulative Costs Over Time' },
      { id: 'current-breakdown-chart', title: 'Cost Breakdown' },
      { id: 'alternative-breakdown-chart', title: 'Cost Breakdown - Portnox' },
      { id: 'feature-comparison-chart', title: 'Feature Comparison' },
      { id: 'implementation-comparison-chart', title: 'Implementation Time Comparison' },
      { id: 'roi-chart', title: 'Return on Investment Analysis' },
      { id: 'waterfall-chart', title: 'Cost Analysis Over Time' },
      { id: 'resource-utilization-chart', title: 'IT Resource Utilization' }
    ];
    
    // Poll for ChartBuilder initialization
    const checkInterval = setInterval(function() {
      if (window.chartBuilder) {
        clearInterval(checkInterval);
        fixCharts();
      }
    }, 100);
    
    function fixCharts() {
      // Ensure all chart canvases exist
      requiredCharts.forEach(function(chartInfo) {
        ensureChartCanvas(chartInfo.id, chartInfo.title);
      });
      
      // Fix chart initialization if needed
      if (window.chartBuilder) {
        // Extend chartBuilder.initCharts if it exists
        const originalInitCharts = window.chartBuilder.initCharts;
        window.chartBuilder.initCharts = function() {
          // Call original method
          originalInitCharts.apply(this, arguments);
          
          // Additional initializations
          if (!this.charts.roi) this.initROIChart();
          if (!this.charts.waterfall) this.initWaterfallChart();
          if (!this.charts.resourceUtilization) this.initResourceUtilizationChart();
        };
        
        // Add initialization methods if they don't exist
        if (!window.chartBuilder.initROIChart) {
          window.chartBuilder.initROIChart = function() {
            const ctx = document.getElementById('roi-chart');
            if (!ctx) {
              console.warn('ROI chart canvas not found');
              return;
            }
            
            this.charts.roi = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ['Initial', 'Year 1', 'Year 2', 'Year 3'],
                datasets: [
                  {
                    label: 'Current Solution',
                    data: [100000, 150000, 200000, 250000],
                    borderColor: this.chartColors.neutral,
                    backgroundColor: `${this.chartColors.neutral}20`,
                    fill: true
                  },
                  {
                    label: 'Portnox Cloud',
                    data: [80000, 110000, 140000, 170000],
                    borderColor: this.chartColors.portnox,
                    backgroundColor: `${this.chartColors.portnox}20`,
                    fill: true
                  },
                  {
                    label: 'Cumulative Savings',
                    data: [20000, 60000, 80000, 100000],
                    borderColor: '#28a745',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    fill: false,
                    yAxisID: 'y1'
                  }
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Cumulative Cost ($)'
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  },
                  y1: {
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                      drawOnChartArea: false
                    },
                    title: {
                      display: true,
                      text: 'Cumulative Savings ($)'
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'Return on Investment Analysis',
                    font: {
                      size: 16
                    }
                  }
                }
              }
            });
            
            console.log('ROI chart initialized with placeholder data');
          };
        }
        
        // Add waterfall chart initialization if it doesn't exist
        if (!window.chartBuilder.initWaterfallChart) {
          window.chartBuilder.initWaterfallChart = function() {
            const ctx = document.getElementById('waterfall-chart');
            if (!ctx) {
              console.warn('Waterfall chart canvas not found');
              return;
            }
            
            this.charts.waterfall = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Initial Investment', 'Year 1 Savings', 'Year 2 Savings', 'Year 3 Savings', 'Total Savings'],
                datasets: [{
                  data: [-50000, 30000, 40000, 50000, 70000],
                  backgroundColor: function(context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#dc3545' : (value > 0 ? '#28a745' : '#ffc107');
                  },
                  borderColor: function(context) {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 0 ? '#dc3545' : (value > 0 ? '#28a745' : '#ffc107');
                  },
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Cost Analysis Over Time',
                    font: {
                      size: 16
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return window.formatCurrency(context.parsed.y);
                      }
                    }
                  }
                }
              }
            });
            
            console.log('Waterfall chart initialized with placeholder data');
          };
        }
        
        // Add resource utilization chart initialization if it doesn't exist
        if (!window.chartBuilder.initResourceUtilizationChart) {
          window.chartBuilder.initResourceUtilizationChart = function() {
            const ctx = document.getElementById('resource-utilization-chart');
            if (!ctx) {
              console.warn('Resource utilization chart canvas not found');
              return;
            }
            
            this.charts.resourceUtilization = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['Network Admin', 'Security Admin', 'System Admin', 'Help Desk'],
                datasets: [
                  {
                    label: 'Current Solution (FTE)',
                    data: [0.5, 0.4, 0.3, 0.1],
                    backgroundColor: this.chartColors.neutral,
                    borderColor: this.chartColors.neutral,
                    borderWidth: 1
                  },
                  {
                    label: 'Portnox Cloud (FTE)',
                    data: [0.2, 0.15, 0.05, 0.05],
                    backgroundColor: this.chartColors.portnox,
                    borderColor: this.chartColors.portnox,
                    borderWidth: 1
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Full-Time Equivalent (FTE)'
                    }
                  }
                },
                plugins: {
                  title: {
                    display: true,
                    text: 'IT Resource Utilization',
                    font: {
                      size: 16
                    }
                  }
                }
              }
            });
            
            console.log('Resource utilization chart initialized with placeholder data');
          };
        }
        
        // Re-run chart initialization
        window.chartBuilder.initCharts();
        console.log('All charts have been initialized or fixed');
      }
    }
    
    // Helper function to ensure chart canvas exists
    function ensureChartCanvas(chartId, chartTitle) {
      if (!document.getElementById(chartId)) {
        console.log(`Creating missing chart canvas: ${chartId}`);
        
        // Find container or create one
        let container = document.querySelector(`.chart-container:has(#${chartId})`);
        
        if (!container) {
          // Find a parent container to append to
          const possibleParents = [
            document.querySelector(`.result-card:has(.chart-title:contains('${chartTitle}')) .chart-container`),
            document.querySelector(`.result-card .chart-container`),
            document.querySelector('.results-grid'),
            document.querySelector('.tab-content')
          ];
          
          const parent = possibleParents.find(el => el !== null);
          
          if (!parent) {
            console.warn(`Could not find a parent for chart: ${chartId}`);
            return;
          }
          
          // Create a new result card if needed
          if (!parent.classList.contains('chart-container')) {
            const card = document.createElement('div');
            card.className = 'result-card';
            
            const titleElement = document.createElement('h3');
            titleElement.className = 'chart-title';
            titleElement.textContent = chartTitle;
            
            container = document.createElement('div');
            container.className = 'chart-container';
            
            card.appendChild(titleElement);
            card.appendChild(container);
            
            parent.appendChild(card);
          } else {
            container = parent;
          }
        }
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.id = chartId;
        container.appendChild(canvas);
      }
    }
  });
})();
EOL

# Add the chart fix script to index.html
if [ -f "index.html" ]; then
  sed -i 's/<script src="js\/chart-enhancements.js"><\/script>/<script src="js\/fixes\/chart-fix.js"><\/script>\n  <script src="js\/chart-enhancements.js"><\/script>/' index.html
  echo -e "${GREEN}✓ Added chart fix script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add chart fix script${NC}"
fi

echo -e "\n${YELLOW}[4/12] 🐛 Fixing PDF export errors...${NC}"

# Fix the PDF export issues - specifically the orgSize undefined error
cat > js/fixes/pdf-export-fix.js << 'EOL'
/**
 * PDF Export Fix
 * - Fixes issues with PDF generation
 * - Prevents ReferenceError: orgSize is not defined
 * - Improves export formatting
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing PDF export fixes...');
    
    // Check for PDFReportGenerator, wait if needed
    const checkPDFGenerator = setInterval(function() {
      if (typeof window.PDFReportGenerator !== 'undefined') {
        clearInterval(checkPDFGenerator);
        fixPDFGenerator();
      }
    }, 100);
    
    function fixPDFGenerator() {
      // Store the original generateTechnicalReport function
      const originalGenerateTechnicalReport = window.PDFReportGenerator.prototype.generateTechnicalReport;
      
      // Override with a fixed version
      window.PDFReportGenerator.prototype.generateTechnicalReport = function(doc, results, currentVendor) {
        try {
          const currentResults = results[currentVendor];
          const portnoxResults = results['portnox'];
          const yearsToProject = results.yearsToProject;
          const orgSize = results.orgSize || 'medium'; // Fix for orgSize undefined
          
          // Add title and header
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124); // Updated to Portnox blue
          doc.text('NAC Solution Technical Report', 105, 20, { align: 'center' });
          
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100); // Gray
          doc.text(`Comparing ${results[currentVendor].vendorName} vs. Portnox Cloud`, 105, 30, { align: 'center' });
          doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });
          
          // Add environment details
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Environment Details', 20, 50);
          
          // Create environment table
          const envHeaders = ['Parameter', 'Value'];
          const envData = [
            ['Device Count', results.deviceCount],
            ['Organization Size', orgSize.charAt(0).toUpperCase() + orgSize.slice(1)],
            ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
            ['Location Count', results.locationCount],
            ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
            ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
            ['Legacy Percentage', results.legacyPercentage + '%'],
            ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
            ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
            ['Policy Complexity', results.policyComplexity ? 
              results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1) : 'Medium']
          ];
          
          doc.autoTable({
            head: [envHeaders],
            body: envData,
            startY: 55,
            theme: 'plain',
            styles: {
              fontSize: 9
            },
            columnStyles: {
              0: { cellWidth: 60 },
              1: { cellWidth: 40 }
            }
          });
          
          // Continue with the rest of the report generation
          // Add implementation comparison
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Implementation Comparison', 20, doc.autoTable.previous.finalY + 15);
          
          // Get implementation timeline data
          const vendorData = window.vendorData || {};
          const currentVendorData = vendorData[currentVendor] || {};
          const portnoxData = vendorData['portnox'] || {};
          
          let currentTimeline = {};
          let portnoxTimeline = {};
          
          if (currentVendorData && currentVendorData[orgSize] && currentVendorData[orgSize].implementationTimeline) {
            currentTimeline = currentVendorData[orgSize].implementationTimeline;
          }
          
          if (portnoxData && portnoxData[orgSize] && portnoxData[orgSize].implementationTimeline) {
            portnoxTimeline = portnoxData[orgSize].implementationTimeline;
          }
          
          // Prepare implementation table
          const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
          const implData = [];
          
          // Combine all phase names
          const phases = new Set([
            ...Object.keys(currentTimeline),
            ...Object.keys(portnoxTimeline)
          ]);
          
          // Add data for each phase
          phases.forEach(phase => {
            const currentDays = currentTimeline[phase] || 0;
            const portnoxDays = portnoxTimeline[phase] || 0;
            const savings = currentDays - portnoxDays;
            
            implData.push([
              phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              currentDays + ' days',
              portnoxDays + ' days',
              savings > 0 ? savings + ' days' : '-'
            ]);
          });
          
          // Add total row
          const currentTotal = Object.values(currentTimeline).reduce((a, b) => a + b, 0);
          const portnoxTotal = Object.values(portnoxTimeline).reduce((a, b) => a + b, 0);
          const totalSavings = currentTotal - portnoxTotal;
          
          implData.push([
            'Total Implementation Time',
            currentTotal + ' days',
            portnoxTotal + ' days',
            totalSavings > 0 ? totalSavings + ' days' : '-'
          ]);
          
          doc.autoTable({
            head: [implHeaders],
            body: implData,
            startY: doc.autoTable.previous.finalY + 20,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            styles: {
              cellPadding: 5
            },
            didParseCell: function(data) {
              // Highlight total row
              if (data.row.index === implData.length - 1) {
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fillColor = [230, 230, 230];
              }
            }
          });
          
          // Add architecture comparison
          doc.addPage();
          
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Architecture Comparison', 20, 20);
          
          // Create Cloud vs On-Premises comparison table
          const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];
          
          const archData = [
            ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
            ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
            ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
            ['Updates & Patching', 'Manual update process', 'Automatic updates'],
            ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
            ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
            ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
            ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy']
          ];
          
          doc.autoTable({
            head: [archHeaders],
            body: archData,
            startY: 25,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            columnStyles: {
              0: { cellWidth: 50 },
              1: { cellWidth: 70 },
              2: { cellWidth: 70 }
            },
            styles: {
              cellPadding: 5
            }
          });
          
          // Add IT resource utilization
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('IT Resource Utilization', 20, doc.autoTable.previous.finalY + 15);
          
          // Get FTE allocation with safety checks
          let currentFTE = {};
          let portnoxFTE = {};
          
          if (currentVendorData && currentVendorData[orgSize] && currentVendorData[orgSize].fteAllocation) {
            currentFTE = currentVendorData[orgSize].fteAllocation;
          }
          
          if (portnoxData && portnoxData[orgSize] && portnoxData[orgSize].fteAllocation) {
            portnoxFTE = portnoxData[orgSize].fteAllocation;
          }
          
          // Create FTE comparison table
          const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];
          
          const fteData = [
            ['Network Administrator',
              (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
              (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
              ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
            ],
            ['Security Administrator',
              (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
              (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
              ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
            ],
            ['System Administrator',
              (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
              (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
              ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
            ],
            ['Help Desk',
              (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
              (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
              ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
            ],
            ['Total IT Staff',
              ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
               (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
              ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
               (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
              (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
                (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
               ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
                (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
            ]
          ];
          
          doc.autoTable({
            head: [fteHeaders],
            body: fteData,
            startY: doc.autoTable.previous.finalY + 20,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            styles: {
              cellPadding: 5
            },
            didParseCell: function(data) {
              // Highlight total row
              if (data.row.index === fteData.length - 1) {
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fillColor = [230, 230, 230];
              }
            }
          });
          
          // Add footer with page numbers
          const pageCount = doc.internal.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Portnox Total Cost Analysis - Technical Report', 20, 285);
            doc.text(`Page ${i} of ${pageCount}`, 180, 285);
          }
          
          return doc;
        } catch (error) {
          console.error('Error in generating technical report:', error);
          // Fallback to a simpler report on error
          doc.setFontSize(16);
          doc.setTextColor(5, 84, 124);
          doc.text('Technical Report - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
          doc.text('An error occurred while generating the detailed report.', 105, 40, { align: 'center' });
          doc.text('Basic summary information is provided below.', 105, 48, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          // Add page number
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text('Portnox Total Cost Analysis - Technical Report', 20, 285);
          doc.text('Page 1 of 1', 180, 285);
          
          return doc;
        }
      };
      
      // Similarly fix the other report generators
      // Fix executive summary
      const originalGenerateExecutiveSummary = window.PDFReportGenerator.prototype.generateExecutiveSummary;
      window.PDFReportGenerator.prototype.generateExecutiveSummary = function(doc, results, currentVendor) {
        try {
          // Call the original with try-catch
          return originalGenerateExecutiveSummary.call(this, doc, results, currentVendor);
        } catch (error) {
          console.error('Error in generating executive summary:', error);
          // Fallback to a simpler report
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124);
          doc.text('Executive Summary - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('An error occurred. Basic information is provided below.', 105, 40, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          return doc;
        }
      };
      
      // Similarly fix financial analysis
      const originalGenerateFinancialAnalysis = window.PDFReportGenerator.prototype.generateFinancialAnalysis;
      window.PDFReportGenerator.prototype.generateFinancialAnalysis = function(doc, results, currentVendor) {
        try {
          // Call the original with try-catch
          return originalGenerateFinancialAnalysis.call(this, doc, results, currentVendor);
        } catch (error) {
          console.error('Error in generating financial analysis:', error);
          // Fallback to a simpler report
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124);
          doc.text('Financial Analysis - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('An error occurred. Basic information is provided below.', 105, 40, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          return doc;
        }
      };
      
      // Also fix UIController's exportToPDF method to handle errors better
      if (window.UIController && window.UIController.prototype.exportToPDF) {
        const originalExportToPDF = window.UIController.prototype.exportToPDF;
        window.UIController.prototype.exportToPDF = function() {
          try {
            // Call the original method
            originalExportToPDF.call(this);
          } catch (error) {
            console.error('Error in PDF export:', error);
            // Show error notification
            if (window.notificationManager) {
              window.notificationManager.error('Error exporting PDF: ' + error.message + '. Try a different report type.');
            } else {
              alert('Error exporting PDF: ' + error.message + '. Try a different report type.');
            }
          }
        };
      }
      
      console.log('PDF export fixes applied successfully');
    }
  });
})();
EOL

# Add the PDF export fix script to index.html
if [ -f "index.html" ]; then
  sed -i 's/<script src="js\/reports\/report-enhancement.js"><\/script>/<script src="js\/fixes\/pdf-export-fix.js"><\/script>\n  <script src="js\/reports\/report-enhancement.js"><\/script>/' index.html
  echo -e "${GREEN}✓ Added PDF export fix script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add PDF export fix script${NC}"
fi

echo -e "\n${YELLOW}[5/12] 🔧 Fixing UI controller errors...${NC}"

# Fix the UI controller errors with null style properties
cat > js/fixes/ui-controller-fix.js << 'EOL'
/**
 * UI Controller Fix
 * - Fixes "Cannot read properties of null (reading 'style')" errors
 * - Improves chart visibility handling
 * - Makes UI more robust against missing elements
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing UI controller fixes...');
    
    // Wait for UIController initialization
    const checkUIController = setInterval(function() {
      if (window.UIController) {
        clearInterval(checkUIController);
        fixUIController();
      }
    }, 100);
    
    function fixUIController() {
      // Fix the updateChartVisibility method
      const originalUpdateChartVisibility = window.UIController.prototype.updateChartVisibility;
      
      window.UIController.prototype.updateChartVisibility = function(view) {
        // Define which charts to show for each view
        const chartVisibility = {
          'executive': ['tco-comparison-chart', 'roi-chart'],
          'financial': ['tco-comparison-chart', 'cumulative-cost-chart', 'roi-chart', 'waterfall-chart', 'resource-utilization-chart'],
          'technical': ['tco-comparison-chart', 'cumulative-cost-chart', 'feature-comparison-chart', 'implementation-comparison-chart', 'roi-chart']
        };
        
        // Show/hide chart containers safely
        document.querySelectorAll('.chart-container').forEach(container => {
          const chartId = container.querySelector('canvas')?.id;
          if (chartId) {
            const isVisible = !chartVisibility[view] || chartVisibility[view].includes(chartId);
            const card = container.closest('.result-card');
            
            // Check if card exists before setting style
            if (card) {
              card.style.display = isVisible ? '' : 'none';
            }
          }
        });
      };
      
      // Fix setActiveView to handle missing elements
      const originalSetActiveView = window.UIController.prototype.setActiveView;
      
      window.UIController.prototype.setActiveView = function(view) {
        try {
          this.activeView = view;
          
          // Update UI based on view
          const resultsContainer = document.querySelector('.results-container');
          if (resultsContainer) {
            resultsContainer.className = 'results-container ' + view + '-view';
          }
          
          // Update visibility of sections based on view
          const sections = {
            'executive': ['summary-tab', 'implementation-tab'],
            'financial': ['summary-tab', 'financial-tab', 'implementation-tab'],
            'technical': ['summary-tab', 'financial-tab', 'implementation-tab', 'comparison-tab', 'migration-tab']
          };
          
          // Show/hide sections based on view
          document.querySelectorAll('.tab-button').forEach(tab => {
            if (!tab) return; // Safety check
            
            const tabId = tab.getAttribute('data-tab');
            const isVisible = !sections[view] || sections[view].includes(tabId);
            
            if (tab.style) {
              tab.style.display = isVisible ? '' : 'none';
            }
          });
          
          // If current active tab is not visible in this view, switch to first visible tab
          const activeTab = document.querySelector('.tab-button.active');
          if (activeTab && activeTab.style && activeTab.style.display === 'none') {
            const firstVisibleTab = document.querySelector('.tab-button:not([style*="display: none"])');
            if (firstVisibleTab && window.tabManager) {
              const tabId = firstVisibleTab.getAttribute('data-tab');
              if (tabId) {
                window.tabManager.setActiveTab(tabId);
              }
            }
          }
          
          // Update chart visibility based on view
          this.updateChartVisibility(view);
        } catch (error) {
          console.error('Error in setActiveView:', error);
          // Continue gracefully without failing
        }
      };
      
      // Fix other potential UI controller issues
      
      // Make updateResults more resilient
      const originalUpdateResults = window.UIController.prototype.updateResults;
      
      window.UIController.prototype.updateResults = function(results) {
        try {
          // Call original method inside try-catch
          originalUpdateResults.call(this, results);
        } catch (error) {
          console.error('Error in updateResults:', error);
          // Try to show notification of error
          if (window.notificationManager) {
            window.notificationManager.error('Error updating results: ' + error.message);
          }
        }
      };
      
      console.log('UI controller fixes applied successfully');
    }
  });
})();
EOL

# Add the UI controller fix script to index.html
if [ -f "index.html" ]; then
  sed -i 's/<script src="js\/components\/ui-controller.js"><\/script>/<script src="js\/components\/ui-controller.js"><\/script>\n  <script src="js\/fixes\/ui-controller-fix.js"><\/script>/' index.html
  echo -e "${GREEN}✓ Added UI controller fix script to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add UI controller fix script${NC}"
fi

echo -e "\n${YELLOW}[6/12] 📊 Enhancing visual display and reporting...${NC}"

# Create enhanced styles for better visuals and reporting
cat > css/enhanced/visuals.css << 'EOL'
/* Enhanced visual styles for Portnox Total Cost Analysis */

/* Dashboard cards with improved shadows and details */
.result-card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.result-card:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.result-card h3 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;
  color: var(--primary-color);
  font-weight: 600;
}

/* Chart container styles */
.chart-container {
  padding: 10px 0;
  height: 280px;
  position: relative;
}

/* Key metrics highlight */
.metric-container {
  border-radius: 8px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 8px 0;
}

.metric-label {
  color: var(--primary-color);
  font-weight: 600;
}

/* Progress bars */
.progress-bar {
  height: 8px;
  background-color: rgba(101, 189, 68, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, rgba(101, 189, 68, 0.8) 0%, rgba(101, 189, 68, 1) 100%);
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.12, 0.57, 0.65, 1);
}

/* Better tables */
.data-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.data-table th {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
}

.data-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background-color: rgba(5, 84, 124, 0.03);
}

.data-table .total-row {
  font-weight: 600;
  background-color: rgba(5, 84, 124, 0.05);
}

.data-table .positive-savings {
  color: var(--accent-color);
  font-weight: 600;
}

.data-table .negative-savings {
  color: #dc3545;
  font-weight: 600;
}

/* Enhanced export options */
.export-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
  padding: 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-radius: 8px;
  align-items: center;
}

.export-options .btn {
  padding: 8px 16px;
}

.export-options select {
  min-width: 180px;
}

/* Compliance and Industry Insights */
.compliance-info-card, .industry-metric, .benchmarks-card {
  background-color: #f8f9fa;
  border-left: 4px solid var(--primary-color);
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 0 6px 6px 0;
}

.compliance-info-card h3, .industry-metric h4, .benchmarks-card h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: none;
  padding-bottom: 4px;
}

.compliance-requirements, .architecture-notes {
  padding-left: 20px;
  margin-top: 12px;
}

.compliance-requirements li, .architecture-notes li {
  margin-bottom: 6px;
  position: relative;
  padding-left: 6px;
}

.compliance-requirements li::before {
  content: "•";
  color: var(--accent-color);
  font-weight: bold;
  position: absolute;
  left: -12px;
}

/* Architecture diagrams */
.architecture-diagram {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background-color: #f8f9fa;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}

/* Migration phases */
.migration-phases {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.phase {
  background-color: #fff;
  border-left: 4px solid var(--primary-color);
  border-radius: 0 8px 8px 0;
  padding: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.phase:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.phase-icon {
  font-size: 2rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.phase-content h4 {
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.phase-content p {
  color: var(--text-secondary);
  margin-bottom: 0;
  line-height: 1.5;
}

/* Benefit cards */
.benefit-card {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  border: 1px solid rgba(101, 189, 68, 0.2);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Success factors */
.success-factors {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.success-factors li {
  padding: 12px 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-left: 3px solid var(--accent-color);
  border-radius: 0 4px 4px 0;
  margin-bottom: 10px;
}

.success-factors li strong {
  color: var(--primary-color);
  font-weight: 600;
}

/* Improved notifications */
.notification {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transform: translateY(-20px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-left: 4px solid var(--primary-color);
  width: 100%;
  max-width: 400px;
}

.notification.show {
  transform: translateY(0);
  opacity: 1;
}

/* Feature label improvements */
.feature-legend {
  text-align: center;
  padding: 12px;
  margin-top: 16px;
  background-color: rgba(5, 84, 124, 0.03);
  border-radius: 6px;
}

.feature-note {
  font-style: italic;
  color: var(--text-secondary);
}

/* Loading indicator improvements */
.loading-indicator {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.spinner {
  border-top-color: var(--accent-color);
}

/* Comparison table highlights */
.cloud-benefit {
  position: relative;
  color: var(--accent-color);
  font-weight: 500;
}

.cloud-benefit::before {
  content: "✓";
  color: var(--accent-color);
  font-weight: bold;
  margin-right: 5px;
}

/* Enhanced chart tooltips */
.chartjs-tooltip {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  border-radius: 4px !important;
  padding: 8px 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  font-family: var(--font-family) !important;
  font-size: 0.9rem !important;
  pointer-events: none !important;
}

/* New tab content transitions */
.tab-pane {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: none;
}

.tab-pane.active {
  opacity: 1;
  transform: translateY(0);
  display: block;
}

/* Responsive enhancements */
@media (max-width: 768px) {
  .chart-container {
    height: 320px;
  }
  
  .phase {
    flex-direction: column;
  }
  
  .phase-icon {
    align-self: flex-start;
    margin-bottom: 10px;
  }
  
  .export-options {
    flex-direction: column;
    align-items: stretch;
  }
  
  .metric-value {
    font-size: 1.6rem;
  }
}
EOL

# Add enhanced visuals CSS to index.html
if [ -f "index.html" ]; then
  sed -i '/<link rel="stylesheet" href="css\/enhanced\/branding.css">/a \  <link rel="stylesheet" href="css\/enhanced\/visuals.css">' index.html
  echo -e "${GREEN}✓ Added enhanced visuals CSS to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add enhanced visuals CSS${NC}"
fi

echo -e "\n${YELLOW}[7/12] 🔎 Enhancing industry and compliance information...${NC}"

# Create enhanced industry and compliance data
cat > data/enhanced-industry-compliance.js << 'EOL'
/**
 * Enhanced Industry and Compliance Information
 * Provides detailed industry-specific insights and compliance requirements
 */

// Enhanced industry templates with more detailed compliance information
window.enhancedIndustryTemplates = {
  healthcare: {
    name: 'Healthcare',
    description: 'Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.',
    defaults: {
      deviceCount: 5000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 10,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 40,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Healthcare Compliance Requirements',
      details: 'Healthcare organizations must implement robust NAC solutions that support HIPAA compliance by securing protected health information (PHI), controlling access to electronic health record (EHR) systems, segmenting clinical and guest networks, and maintaining detailed audit logs for compliance reporting.',
      keyRequirements: [
        'Protected Health Information (PHI) security with real-time monitoring and alerts',
        'Medical device identification, classification, and security for FDA compliance',
        'Role-based access control with clinical workflow optimization',
        'Guest and patient network isolation with captive portal support',
        'Comprehensive audit trails for security investigations and compliance verification',
        'Business Associate Agreement (BAA) compatibility for cloud solutions'
      ],
      regulations: [
        {
          name: 'HIPAA',
          description: 'The Health Insurance Portability and Accountability Act sets the standard for protecting sensitive patient data and requires appropriate safeguards to protect the privacy of personal health information.',
          relevance: 'Network Access Control helps satisfy HIPAA Security Rule requirements for access controls (§164.312(a)(1)), audit controls (§164.312(b)), and device and media controls (§164.310(d)(1)).'
        },
        {
          name: 'HITECH Act',
          description: 'The Health Information Technology for Economic and Clinical Health Act expanded HIPAA requirements and increased penalties for non-compliance.',
          relevance: 'NAC solutions provide the technical capabilities to meet HITECH requirements for access restriction and activity logging.'
        },
        {
          name: 'FDA Medical Device Regulations',
          description: 'FDA guidelines for medical device cybersecurity include requirements for device identification and security measures.',
          relevance: 'NAC solutions can identify and classify medical devices, apply appropriate policies, and protect them from network-based threats.'
        }
      ]
    },
    riskFactors: [
      'Legacy medical devices with limited security features',
      'Multiple user roles requiring different access privileges',
      'Need for 24/7 availability with minimal downtime',
      'High cost of compliance violations (HIPAA penalties)',
      'IoT medical devices with limited security capabilities'
    ],
    challengesMitigated: [
      {
        challenge: 'Identifying and securing medical devices',
        mitigation: 'Automatic device discovery and classification with medical device profiles'
      },
      {
        challenge: 'Maintaining continuous care while enforcing security',
        mitigation: 'Role-based access policies that account for clinical workflows and emergency scenarios'
      },
      {
        challenge: 'Ensuring PHI remains protected across the network',
        mitigation: 'Network segmentation and least privilege access controls'
      },
      {
        challenge: 'Managing BYOD in clinical settings',
        mitigation: 'Endpoint posture assessment and cloud-based management'
      }
    ],
    benchmarks: {
      averageTCO: 450000,
      implementationTime: 120,
      fteCost: 185000,
      cloudSavingsPercentage: 65,
      maintenanceReduction: 80
    }
  },
  
  financial: {
    name: 'Financial Services',
    description: 'Financial institutions must balance robust security with operational efficiency while managing complex regulatory requirements and protecting high-value targets from sophisticated threats.',
    defaults: {
      deviceCount: 8000,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 50,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 20,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Financial Services Compliance Requirements',
      details: 'Financial institutions must meet stringent regulatory requirements from multiple frameworks, with a strong emphasis on data protection, fraud prevention, privileged access management, and comprehensive audit trails for all network activity.',
      keyRequirements: [
        'Segmentation of cardholder data environments (CDE) for PCI DSS compliance',
        'Multi-factor authentication for all privileged access',
        'Continuous compliance monitoring with real-time alerts',
        'Regular penetration testing and vulnerability management',
        'Detailed audit trails for regulatory examinations and forensic investigations',
        'Privileged account monitoring and just-in-time access controls'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'The Payment Card Industry Data Security Standard is a set of security standards designed to ensure all companies that accept, process, store or transmit credit card information maintain a secure environment.',
          relevance: 'NAC solutions help meet requirements 1 (network segmentation), 7 (access control), 10 (monitoring), and 11 (security testing).'
        },
        {
          name: 'SOX',
          description: 'The Sarbanes-Oxley Act requires strict financial controls and security for systems that handle financial reporting data.',
          relevance: 'NAC provides access controls and audit trails that support SOX section 404 compliance requirements.'
        },
        {
          name: 'GLBA',
          description: 'The Gramm-Leach-Bliley Act requires financial institutions to explain how they share and protect customer data.',
          relevance: 'NAC supports the Safeguards Rule by providing controls that protect customer information.'
        },
        {
          name: 'FFIEC Guidelines',
          description: 'The Federal Financial Institutions Examination Council provides guidance on information security and authentication.',
          relevance: 'NAC solutions align with FFIEC guidance on layered security and access controls.'
        }
      ]
    },
    riskFactors: [
      'High-value target for sophisticated threat actors',
      'Complex environment with numerous third-party integrations',
      'Legacy banking systems requiring specialized protection',
      'Significant regulatory penalties for non-compliance',
      'Advanced persistent threats requiring continuous monitoring'
    ],
    challengesMitigated: [
      {
        challenge: 'Maintaining PCI DSS compliance across distributed infrastructure',
        mitigation: 'Centralized policy management with automated compliance reporting'
      },
      {
        challenge: 'Securing third-party vendor access to financial systems',
        mitigation: 'Granular access controls with time-limited authentication'
      },
      {
        challenge: 'Preventing unauthorized access to sensitive financial data',
        mitigation: 'Multi-factor authentication enforcement and device health checks'
      },
      {
        challenge: 'Supporting hybrid cloud and on-premises environments',
        mitigation: 'Unified management across all deployment models'
      }
    ],
    benchmarks: {
      averageTCO: 750000,
      implementationTime: 160,
      fteCost: 210000,
      cloudSavingsPercentage: 58,
      maintenanceReduction: 72
    }
  },
  
  education: {
    name: 'Education',
    description: 'Educational institutions manage diverse user populations and device types with seasonal enrollment fluctuations, limited budgets, and growing security requirements while maintaining an open learning environment.',
    defaults: {
      deviceCount: 10000,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 5,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 50,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Education Sector Compliance Requirements',
      details: 'Educational institutions must balance open access for learning with strong protection of student data. They face unique challenges with diverse user populations, BYOD environments, seasonal enrollment fluctuations, and various compliance requirements.',
      keyRequirements: [
        'Student data protection in compliance with FERPA regulations',
        'Secure BYOD support for students, faculty, and staff',
        'Visitor network management with easy self-registration',
        'Seasonal scaling capabilities to handle enrollment fluctuations',
        'Research network protection with specialized security policies',
        'Flexible authentication options including eduroam federation support'
      ],
      regulations: [
        {
          name: 'FERPA',
          description: 'The Family Educational Rights and Privacy Act protects the privacy of student education records.',
          relevance: 'NAC solutions help restrict access to systems containing student records to authorized personnel only.'
        },
        {
          name: 'COPPA',
          description: 'The Children\'s Online Privacy Protection Act applies to operators of websites and online services directed to children under 13 years of age.',
          relevance: 'NAC can help implement appropriate controls for networks accessed by minors.'
        },
        {
          name: 'CIPA',
          description: 'The Children\'s Internet Protection Act requires schools and libraries to use internet filters to protect children from harmful online content.',
          relevance: 'NAC solutions can enforce policy-based filtering and monitoring requirements.'
        }
      ]
    },
    riskFactors: [
      'Large BYOD environment with limited control over devices',
      'Seasonal network usage patterns with enrollment spikes',
      'Open campus environments requiring segmented access',
      'Limited IT resources and budget constraints',
      'Balancing academic freedom with security requirements'
    ],
    challengesMitigated: [
      {
        challenge: 'Managing thousands of student devices with minimal overhead',
        mitigation: 'Self-service onboarding with automated device provisioning'
      },
      {
        challenge: 'Supporting diverse research requirements',
        mitigation: 'Flexible network segmentation with custom policy options'
      },
      {
        challenge: 'Securing shared computer labs and learning spaces',
        mitigation: 'Role-based access control tied to student information systems'
      },
      {
        challenge: 'Maintaining security with limited IT staffing',
        mitigation: 'Cloud-based management with automated remediation workflows'
      }
    ],
    benchmarks: {
      averageTCO: 320000,
      implementationTime: 90,
      fteCost: 150000,
      cloudSavingsPercentage: 70,
      maintenanceReduction: 85
    }
  },
  
  manufacturing: {
    name: 'Manufacturing',
    description: 'Manufacturing environments blend IT and OT systems with critical production equipment, industrial IoT devices, and strict uptime requirements requiring specialized security approaches.',
    defaults: {
      deviceCount: 3000,
      yearsToProject: 4,
      multipleLocations: true,
      locationCount: 3,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 70,
      cloudIntegration: false,
      customPolicies: true,
      policyComplexity: 'medium'
    },
    complianceInfo: {
      title: 'Manufacturing & Industrial Compliance Requirements',
      details: 'Manufacturing environments require NAC solutions that can secure the IT/OT convergence zone, manage industrial IoT devices, and protect industrial control systems while ensuring production continuity and minimal downtime.',
      keyRequirements: [
        'OT/IT network segmentation with industrial protocol support',
        'Legacy industrial system protection without agent requirements',
        'Production continuity with non-disruptive security',
        'ICS/SCADA system protection with specialized policies',
        'Regulatory compliance for critical infrastructure',
        'Supply chain security integration'
      ],
      regulations: [
        {
          name: 'IEC 62443',
          description: 'International standards for industrial automation and control systems security.',
          relevance: 'NAC provides zone-based segmentation and access controls aligned with IEC 62443 security levels.'
        },
        {
          name: 'NIST 800-82',
          description: 'Guide to Industrial Control Systems Security provides guidance on securing industrial control systems.',
          relevance: 'NAC helps implement recommended access control and network segmentation measures.'
        },
        {
          name: 'NERC CIP',
          description: 'North American Electric Reliability Corporation Critical Infrastructure Protection standards for power grid security.',
          relevance: 'NAC supports electronic security perimeter requirements and access control measures.'
        }
      ]
    },
    riskFactors: [
      'Legacy industrial equipment with minimal security features',
      'Operational technology with 24/7 uptime requirements',
      'Specialized industrial protocols requiring monitoring',
      'Supply chain vulnerabilities from third-party integrations',
      'Physical security integration requirements'
    ],
    challengesMitigated: [
      {
        challenge: 'Protecting critical production infrastructure',
        mitigation: 'Agentless monitoring with non-disruptive security controls'
      },
      {
        challenge: 'IT/OT convergence security',
        mitigation: 'Specialized industrial protocol support and segmentation'
      },
      {
        challenge: 'Supply chain security management',
        mitigation: 'Vendor access controls with limited network exposure'
      },
      {
        challenge: 'Securing industrial IoT devices',
        mitigation: 'Automated discovery and profiling with device-specific policies'
      }
    ],
    benchmarks: {
      averageTCO: 380000,
      implementationTime: 110,
      fteCost: 165000,
      cloudSavingsPercentage: 60,
      maintenanceReduction: 75
    }
  },
  
  retail: {
    name: 'Retail',
    description: 'Retail organizations balance customer experience with data protection across distributed locations, managing POS systems, guest WiFi, and seasonal staffing fluctuations with limited IT resources.',
    defaults: {
      deviceCount: 2500,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 25,
      complexAuthentication: false,
      legacyDevices: true,
      legacyPercentage: 30,
      cloudIntegration: true,
      customPolicies: false,
      policyComplexity: 'low'
    },
    complianceInfo: {
      title: 'Retail Sector Compliance Requirements',
      details: 'Retail environments need NAC solutions that protect point-of-sale systems and customer data while providing convenient guest access, supporting seasonal staff fluctuations, and maintaining PCI DSS compliance across multiple locations.',
      keyRequirements: [
        'PCI DSS compliance for cardholder data protection',
        'Point-of-sale system security with minimal disruption',
        'Guest WiFi management with promotional opportunities',
        'Inventory and IoT device security controls',
        'Support for seasonal staffing fluctuations',
        'Multi-site management with centralized reporting'
      ],
      regulations: [
        {
          name: 'PCI DSS',
          description: 'The Payment Card Industry Data Security Standard requires all entities that process, store or transmit cardholder data to maintain a secure environment.',
          relevance: 'NAC provides network segmentation, access controls, and monitoring required for PCI DSS compliance.'
        },
        {
          name: 'CCPA/CPRA',
          description: 'California Consumer Privacy Act and California Privacy Rights Act provide California residents with rights over their personal information.',
          relevance: 'NAC helps restrict access to systems containing customer data to authorized personnel only.'
        },
        {
          name: 'GDPR',
          description: 'The General Data Protection Regulation protects personal data and privacy for individuals in the European Union.',
          relevance: 'NAC helps implement appropriate technical measures to protect personal data as required by GDPR.'
        }
      ]
    },
    riskFactors: [
      'Distributed retail locations with limited IT staff',
      'Legacy POS systems requiring specialized protection',
      'Seasonal staffing requiring rapid onboarding/offboarding',
      'Public WiFi networks adjacent to payment systems',
      'High-volume customer data handling'
    ],
    challengesMitigated: [
      {
        challenge: 'Managing distributed store networks without local IT',
        mitigation: 'Cloud-based centralized management with remote troubleshooting'
      },
      {
        challenge: 'Maintaining PCI compliance across all locations',
        mitigation: 'Automated network segmentation with continuous compliance monitoring'
      },
      {
        challenge: 'Securing IoT devices like digital signage and inventory systems',
        mitigation: 'IoT-specific profiles with automated discovery and classification'
      },
      {
        challenge: 'Seasonal staff provisioning and deprovisioning',
        mitigation: 'Integrated identity management with automated access termination'
      }
    ],
    benchmarks: {
      averageTCO: 280000,
      implementationTime: 75,
      fteCost: 140000,
      cloudSavingsPercentage: 75,
      maintenanceReduction: 80
    }
  },
  
  government: {
    name: 'Government',
    description: 'Government agencies manage sensitive information with strict compliance requirements, legacy systems, and complex authentication needs across multiple security domains.',
    defaults: {
      deviceCount: 7500,
      yearsToProject: 5,
      multipleLocations: true,
      locationCount: 12,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 45,
      cloudIntegration: false,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'Government Compliance Requirements',
      details: 'Government agencies face stringent security requirements with strict compliance mandates, complex authentication needs, and the necessity to protect sensitive information while managing legacy systems and maintaining public service delivery.',
      keyRequirements: [
        'FedRAMP/StateRAMP compliance for cloud deployments',
        'FIPS 140-2 validated cryptography for data protection',
        'NIST 800-53 alignment for federal information systems',
        'PIV/CAC smart card integration for secure authentication',
        'Advanced persistent threat (APT) protection',
        'Detailed audit logging for security investigations'
      ],
      regulations: [
        {
          name: 'FISMA',
          description: 'The Federal Information Security Modernization Act requires agencies to develop and implement information security programs.',
          relevance: 'NAC provides the access controls, monitoring, and documentation required for FISMA compliance.'
        },
        {
          name: 'NIST 800-53',
          description: 'Security and privacy controls for federal information systems and organizations.',
          relevance: 'NAC implements multiple control families including AC (Access Control), IA (Identification and Authentication), and CM (Configuration Management).'
        },
        {
          name: 'CJIS',
          description: 'Criminal Justice Information Services security policy for agencies accessing criminal justice information.',
          relevance: 'NAC helps implement advanced authentication and access controls required for CJIS compliance.'
        }
      ]
    },
    riskFactors: [
      'Advanced persistent threats targeting government systems',
      'Legacy systems with extended lifecycle requirements',
      'Complex multi-level security requirements',
      'Strict regulatory compliance mandates',
      'Budget constraints with long procurement cycles'
    ],
    challengesMitigated: [
      {
        challenge: 'Managing classified and unclassified network segments',
        mitigation: 'Policy-based access control with physical authentication integration'
      },
      {
        challenge: 'Supporting legacy systems with modern security',
        mitigation: 'Agentless monitoring with specialized government profiles'
      },
      {
        challenge: 'Implementing zero trust architecture',
        mitigation: 'Continuous authentication with detailed device health validation'
      },
      {
        challenge: 'Meeting FedRAMP compliance requirements',
        mitigation: 'Certified cloud deployment options with government-specific security controls'
      }
    ],
    benchmarks: {
      averageTCO: 620000,
      implementationTime: 180,
      fteCost: 195000,
      cloudSavingsPercentage: 55,
      maintenanceReduction: 65
    }
  },
  
  healthcare_hipaa: {
    name: 'Healthcare (HIPAA Focus)',
    description: 'Healthcare providers with specific focus on HIPAA compliance, medical device security, and clinical workflow optimization for improved patient care and data protection.',
    defaults: {
      deviceCount: 4500,
      yearsToProject: 3,
      multipleLocations: true,
      locationCount: 8,
      complexAuthentication: true,
      legacyDevices: true,
      legacyPercentage: 50,
      cloudIntegration: true,
      customPolicies: true,
      policyComplexity: 'high'
    },
    complianceInfo: {
      title: 'HIPAA-Focused Healthcare Requirements',
      details: 'This specialized compliance profile focuses on the unique HIPAA Security Rule requirements that affect healthcare networking, with emphasis on technical safeguards, protected health information security, and continuous compliance documentation.',
      keyRequirements: [
        'Technical safeguards for ePHI as defined in 45 CFR § 164.312',
        'Unique user identification (§ 164.312(a)(2)(i))',
        'Emergency access procedures (§ 164.312(a)(2)(ii))',
        'Automatic logoff implementation (§ 164.312(a)(2)(iii))',
        'Audit controls for ePHI activity (§ 164.312(b))',
        'Person or entity authentication (§ 164.312(d))'
      ],
      regulations: [
        {
          name: 'HIPAA Security Rule',
          description: 'Establishes national standards to protect electronic personal health information that is created, received, used, or maintained by a covered entity.',
          relevance: 'NAC directly addresses the technical safeguards requirements for access control, audit controls, and transmission security.'
        },
        {
          name: 'HIPAA Privacy Rule',
          description: 'Establishes standards for the protection of certain health information.',
          relevance: 'NAC helps implement the minimum necessary standard by restricting access to only what is needed to perform job functions.'
        },
        {
          name: 'HITECH Breach Notification',
          description: 'Requires covered entities to notify affected individuals following the discovery of a breach of unsecured PHI.',
          relevance: 'NAC monitoring provides breach detection capabilities and forensic information for required notifications.'
        }
      ]
    },
    hipaaDetails: {
      riskAnalysis: 'Network Access Control directly addresses multiple risk areas identified in HIPAA risk analysis requirements (45 CFR § 164.308(a)(1)(ii)(A)). It provides controls for identifying and restricting unauthorized users and devices that could potentially access electronic Protected Health Information (ePHI).',
      documentationSupport: 'NAC solutions maintain detailed logs and reports that help satisfy HIPAA documentation requirements (45 CFR § 164.316(b)(1)). These records of access attempts, policy changes, and security incidents serve as evidence of security rule compliance.',
      technicalControls: [
        {
          control: 'Access Control',
          requirement: '45 CFR § 164.312(a)(1)',
          implementation: 'NAC implements technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.'
        },
        {
          control: 'Audit Controls',
          requirement: '45 CFR § 164.312(b)',
          implementation: 'NAC implements hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI.'
        },
        {
          control: 'Integrity',
          requirement: '45 CFR § 164.312(c)(1)',
          implementation: 'NAC helps protect ePHI from improper alteration or destruction by restricting network access to authorized users and compliant devices.'
        },
        {
          control: 'Person or Entity Authentication',
          requirement: '45 CFR § 164.312(d)',
          implementation: 'NAC implements procedures to verify that a person or entity seeking access to ePHI is the one claimed.'
        },
        {
          control: 'Transmission Security',
          requirement: '45 CFR § 164.312(e)(1)',
          implementation: 'NAC implements technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network.'
        }
      ]
    },
    benchmarks: {
      averageTCO: 480000,
      implementationTime: 115,
      fteCost: 190000,
      cloudSavingsPercentage: 68,
      maintenanceReduction: 82,
      hipaaComplianceCosts: 120000
    }
  }
};

// Enhanced NAC benefit information
window.enhancedNACBenefits = {
  withoutNAC: {
    title: 'Current State Without NAC Solution',
    description: 'Organizations without a Network Access Control solution face significant security gaps, operational inefficiencies, and compliance challenges that increase both risk and total cost of ownership.',
    riskFactors: [
      {
        area: 'Security',
        risks: [
          'Unauthorized devices connect to network without restriction',
          'No visibility into device security posture or compliance',
          'Limited ability to detect and respond to threats',
          'Vulnerable devices can spread malware across network',
          'No automated enforcement of security policies'
        ]
      },
      {
        area: 'Operational',
        risks: [
          'Manual device provisioning and management',
          'Inefficient troubleshooting without device visibility',
          'No automated remediation of security issues',
          'Higher IT staff workload for security management',
          'Longer incident response time for security events'
        ]
      },
      {
        area: 'Compliance',
        risks: [
          'Limited ability to enforce regulatory requirements',
          'Insufficient audit trails for compliance reporting',
          'Difficulty demonstrating security controls to auditors',
          'Manual processes for compliance documentation',
          'Higher risk of non-compliance penalties'
        ]
      }
    ],
    costFactors: [
      {
        category: 'Direct Costs',
        items: [
          'Security incident response and remediation',
          'Regulatory fines for compliance violations',
          'Data breach costs and legal expenses',
          'Increased IT staffing requirements',
          'Multiple point solutions instead of integrated platform'
        ]
      },
      {
        category: 'Indirect Costs',
        items: [
          'Productivity loss during security incidents',
          'Reputational damage from security breaches',
          'Business disruption from network outages',
          'Slower network onboarding for new devices',
          'Increased business risk from security gaps'
        ]
      }
    ]
  },
  withNAC: {
    title: 'Benefits of Network Access Control',
    description: 'A modern NAC solution delivers comprehensive security, operational efficiency, and compliance benefits that reduce both risk and total cost of ownership while improving visibility and control.',
    benefitCategories: [
      {
        area: 'Security Benefits',
        benefits: [
          'Complete visibility of all network-connected devices',
          'Enforcement of security policies for all endpoints',
          'Automated threat detection and response',
          'Prevention of unauthorized network access',
          'Automatic quarantine of non-compliant devices'
        ]
      },
      {
        area: 'Operational Benefits',
        benefits: [
          'Reduced IT workload through automation',
          'Streamlined device provisioning and management',
          'Improved troubleshooting with device context',
          'Centralized policy management across locations',
          'Simplified guest and BYOD management'
        ]
      },
      {
        area: 'Compliance Benefits',
        benefits: [
          'Automated enforcement of compliance requirements',
          'Comprehensive audit trails for regulatory reporting',
          'Continuous monitoring of compliance status',
          'Simplified demonstration of security controls',
          'Reduced risk of compliance violations'
        ]
      }
    ],
    cloudAdvantages: [
      {
        category: 'Cost Efficiency',
        advantages: [
          'Elimination of hardware procurement costs',
          'Reduction in IT infrastructure maintenance',
          'Lower total cost of ownership vs. on-premises',
          'Predictable subscription-based pricing',
          'Automatic updates without upgrade costs'
        ]
      },
      {
        category: 'Operational Efficiency',
        advantages: [
          'Faster implementation with reduced complexity',
          'Centralized management of distributed locations',
          'Automatic scalability without capacity planning',
          'Reduced IT staffing requirements',
          'Zero maintenance and update management'
        ]
      },
      {
        category: 'Security Advantages',
        advantages: [
          'Always updated with latest security features',
          'Built-in redundancy and disaster recovery',
          'Global threat intelligence integration',
          'Cross-customer security insights',
          'Rapid response to emerging threats'
        ]
      }
    ]
  },
  portnoxAdvantages: {
    title: 'Portnox Competitive Advantages',
    description: 'Portnox Cloud delivers significant advantages over traditional NAC solutions with a true cloud-native architecture that simplifies deployment, reduces costs, and improves security outcomes.',
    keyDifferentiators: [
      {
        area: 'Cloud-Native Architecture',
        advantages: [
          'Purpose-built for cloud from the ground up',
          'No hardware or virtual appliances required',
          'Global scalability with regional data centers',
          'True SaaS model with continuous updates',
          'Rapid deployment with minimal prerequisites'
        ]
      },
      {
        area: 'Simplified Deployment',
        advantages: [
          'Lightweight cloud connector model vs. heavy appliances',
          'No network redesign or complex integration',
          'Non-disruptive implementation methodology',
          'Minimal pre-requisites for getting started',
          'Rapid time to value with quick deployment'
        ]
      },
      {
        area: 'Cost Efficiency',
        advantages: [
          'No hardware procurement or maintenance costs',
          'Reduced IT staffing requirements',
          'Predictable subscription pricing model',
          'No separate disaster recovery infrastructure',
          'Lower overall total cost of ownership'
        ]
      },
      {
        area: 'Operational Benefits',
        advantages: [
          'Centralized management of all locations',
          'Automated updates without maintenance windows',
          'Built-in high availability and redundancy',
          'Simplified remote/branch office management',
          'Reduced complexity with integrated solution'
        ]
      }
    ],
    competitiveComparison: {
      ciscoISE: [
        'Hardware-free deployment vs. multiple appliances',
        '75% faster implementation timeframe',
        '65% reduction in IT management overhead',
        'No network architecture changes required',
        'Automatic updates vs. complex upgrade processes'
      ],
      arubaClearPass: [
        'Cloud-native architecture vs. virtualized appliances',
        'No specialized expertise required for deployment',
        'Global scalability without additional infrastructure',
        'Lower total cost of ownership with SaaS model',
        'Simplified multi-site management'
      ],
      forescout: [
        'Lightweight deployment vs. heavy infrastructure',
        'Reduced complexity with integrated platform',
        'No hardware sizing or capacity planning',
        'Lower operational costs with no appliance management',
        'Continuous updates without maintenance windows'
      ],
      microsoftNPS: [
        'Full NAC capabilities vs. basic RADIUS functions',
        'Advanced posture assessment and enforcement',
        'Comprehensive device visibility and control',
        'Cross-platform support for all device types',
        'Simplified management with purpose-built interface'
      ]
    }
  }
};

// Enhanced migration vs. initial deployment information
window.enhancedDeploymentInfo = {
  initialDeployment: {
    title: 'Initial NAC Deployment',
    description: 'Initial deployment of a Network Access Control solution is a significant project that establishes the foundation for your network security architecture. The approach differs based on whether you choose an on-premises or cloud-based solution.',
    deploymentPhases: {
      onPremises: [
        {
          phase: 'Planning & Design',
          duration: '3-8 weeks',
          activities: [
            'Network architecture assessment',
            'Hardware sizing and capacity planning',
            'High availability design',
            'Database and integration planning',
            'Network topology mapping'
          ]
        },
        {
          phase: 'Infrastructure Preparation',
          duration: '2-4 weeks',
          activities: [
            'Server hardware procurement',
            'Network infrastructure preparation',
            'Virtual environment configuration',
            'Database server setup',
            'Security certificate provisioning'
          ]
        },
        {
          phase: 'Installation & Configuration',
          duration: '2-6 weeks',
          activities: [
            'Appliance installation and hardening',
            'Database configuration and optimization',
            'High availability setup',
            'Integration with authentication sources',
            'Management console configuration'
          ]
        },
        {
          phase: 'Policy Definition',
          duration: '2-4 weeks',
          activities: [
            'Authentication policy configuration',
            'Authorization policy setup',
            'Posture assessment definition',
            'Guest access policy configuration',
            'Remediation workflow setup'
          ]
        },
        {
          phase: 'Testing & Validation',
          duration: '2-4 weeks',
          activities: [
            'User authentication testing',
            'Device onboarding validation',
            'Policy enforcement verification',
            'Performance and load testing',
            'High availability failover testing'
          ]
        },
        {
          phase: 'Pilot Deployment',
          duration: '2-6 weeks',
          activities: [
            'Limited user group deployment',
            'Monitoring and issue resolution',
            'Policy refinement based on feedback',
            'Operational process validation',
            'Knowledge transfer to IT staff'
          ]
        },
        {
          phase: 'Full Deployment',
          duration: '4-12 weeks',
          activities: [
            'Phased rollout to all user groups',
            'Network integration across all segments',
            'Full enforcement mode activation',
            'User communication and training',
            'Operational handover to IT teams'
          ]
        }
      ],
      cloud: [
        {
          phase: 'Planning & Assessment',
          duration: '1-3 weeks',
          activities: [
            'Network requirements assessment',
            'Authentication source identification',
            'Use case prioritization',
            'Cloud connectivity evaluation',
            'Deployment approach planning'
          ]
        },
        {
          phase: 'Cloud Account Setup',
          duration: '1-3 days',
          activities: [
            'Cloud tenant provisioning',
            'Admin user creation',
            'Initial organization settings',
            'License assignment',
            'Regional data center selection'
          ]
        },
        {
          phase: 'Local Connector Deployment',
          duration: '1-3 days',
          activities: [
            'Cloud connector installation',
            'Network connection verification',
            'Authentication source integration',
            'Initial device discovery',
            'Connection verification'
          ]
        },
        {
          phase: 'Policy Configuration',
          duration: '1-2 weeks',
          activities: [
            'Authentication policy setup',
            'Device classification rules',
            'Access policy definition',
            'Compliance policy creation',
            'Guest access configuration'
          ]
        },
        {
          phase: 'Testing & Validation',
          duration: '1-2 weeks',
          activities: [
            'User authentication testing',
            'Device onboarding verification',
            'Policy enforcement validation',
            'Reporting and visibility checks',
            'Integration verification'
          ]
        },
        {
          phase: 'Pilot Deployment',
          duration: '1-2 weeks',
          activities: [
            'Limited deployment to test group',
            'Monitoring and issue resolution',
            'Policy refinement',
            'Process validation',
            'Admin training and knowledge transfer'
          ]
        },
        {
          phase: 'Full Deployment',
          duration: '2-4 weeks',
          activities: [
            'Phased rollout to all users',
            'Enforcement mode activation',
            'User communication',
            'Operational process documentation',
            'Final configuration adjustments'
          ]
        }
      ]
    },
    costFactors: {
      onPremises: [
        {
          category: 'Hardware Costs',
          items: [
            'Primary and redundant NAC appliances',
            'Database servers and licensing',
            'Network equipment upgrades if needed',
            'Load balancers for high availability',
            'Backup and recovery infrastructure'
          ]
        },
        {
          category: 'Implementation Costs',
          items: [
            'Professional services for deployment',
            'Network redesign if required',
            'Integration consulting',
            'Custom development for integrations',
            'Project management'
          ]
        },
        {
          category: 'Operational Costs',
          items: [
            'Ongoing hardware maintenance',
            'Software updates and patches',
            'IT staff for system management',
            'Training and certification',
            'Datacenter costs (power, cooling, rack space)'
          ]
        }
      ],
      cloud: [
        {
          category: 'Infrastructure Costs',
          items: [
            'Cloud connector host systems (minimal)',
            'Network equipment upgrades (rarely needed)',
            'No appliances or servers required',
            'No database infrastructure required',
            'No dedicated backup infrastructure'
          ]
        },
        {
          category: 'Implementation Costs',
          items: [
            'Limited professional services (if needed)',
            'No network redesign required',
            'Simplified integration setup',
            'Minimal project management',
            'Reduced deployment time and resources'
          ]
        },
        {
          category: 'Operational Costs',
          items: [
            'No hardware maintenance',
            'Automatic updates included in subscription',
            'Reduced IT staffing requirements',
            'Simplified training needs',
            'No datacenter costs'
          ]
        }
      ]
    }
  },
  migration: {
    title: 'Migration from Existing NAC',
    description: 'Migrating from an existing NAC solution to a new platform involves transitioning your security policies, device databases, and enforcement strategy with minimal disruption to users and operations. Cloud migration offers significant advantages in speed and complexity reduction.',
    migrationPhases: {
      onPremisesToOnPremises: [
        {
          phase: 'Migration Planning',
          duration: '2-4 weeks',
          activities: [
            'Current state documentation',
            'Policy mapping between platforms',
            'Integration inventory',
            'Migration strategy development',
            'Dependency analysis'
          ]
        },
        {
          phase: 'New Infrastructure Setup',
          duration: '2-6 weeks',
          activities: [
            'New hardware provisioning',
            'Network infrastructure preparation',
            'Parallel environment configuration',
            'Database configuration',
            'Certificate management'
          ]
        },
        {
          phase: 'Policy Translation',
          duration: '2-4 weeks',
          activities: [
            'Authentication policy migration',
            'Authorization policy conversion',
            'Posture assessment rule translation',
            'Guest access policy replication',
            'Custom policy adaptation'
          ]
        },
        {
          phase: 'Integration Reconfiguration',
          duration: '2-4 weeks',
          activities: [
            'Authentication source reconnection',
            'SIEM integration reconfiguration',
            'API integration redevelopment',
            'Third-party security tool reconnection',
            'Custom integration rebuilding'
          ]
        },
        {
          phase: 'Parallel Operation',
          duration: '2-6 weeks',
          activities: [
            'Both systems running simultaneously',
            'Gradual traffic shifting',
            'Monitoring and comparison',
            'Policy fine-tuning',
            'Issue resolution'
          ]
        },
        {
          phase: 'Cutover Planning',
          duration: '1-2 weeks',
          activities: [
            'Detailed cutover plan development',
            'Rollback procedure documentation',
            'Communication plan creation',
            'Support readiness preparation',
            'Final verification testing'
          ]
        },
        {
          phase: 'Production Cutover',
          duration: '1-4 weeks',
          activities: [
            'Phased enforcement transition',
            'User communication and support',
            'Monitoring and issue resolution',
            'Old system decommissioning',
            'Operational transition'
          ]
        }
      ],
      onPremisesToCloud: [
        {
          phase: 'Migration Assessment',
          duration: '1-3 weeks',
          activities: [
            'Current policy documentation',
            'Network architecture review',
            'Identity source inventory',
            'Integration requirements analysis',
            'Migration strategy development'
          ]
        },
        {
          phase: 'Cloud Account Setup',
          duration: '1-3 days',
          activities: [
            'Cloud tenant provisioning',
            'Admin account configuration',
            'Regional preferences setting',
            'License assignment',
            'Initial organization configuration'
          ]
        },
        {
          phase: 'Cloud Connector Deployment',
          duration: '1-3 days',
          activities: [
            'Connector installation in key locations',
            'Network connectivity verification',
            'Authentication source connection',
            'Initial device discovery',
            'Basic connectivity testing'
          ]
        },
        {
          phase: 'Policy Migration',
          duration: '1-2 weeks',
          activities: [
            'Current policy analysis and translation',
            'Cloud policy creation',
            'Device profile configuration',
            'Access control rule setup',
            'Compliance check definition'
          ]
        },
        {
          phase: 'Monitor Mode Deployment',
          duration: '1-2 weeks',
          activities: [
            'Non-enforcement mode activation',
            'Side-by-side operation with existing NAC',
            'Policy verification and tuning',
            'Exception handling configuration',
            'Reporting and alerting setup'
          ]
        },
        {
          phase: 'Phased Enforcement',
          duration: '2-4 weeks',
          activities: [
            'Gradual enforcement for user groups',
            'Legacy NAC decommissioning planning',
            'User communication and support',
            'Policy refinement based on feedback',
            'Integration completion and testing'
          ]
        },
        {
          phase: 'Full Transition',
          duration: '1-2 weeks',
          activities: [
            'Complete enforcement activation',
            'Legacy system decommissioning',
            'Final configuration optimization',
            'Operational process documentation',
            'Knowledge transfer completion'
          ]
        }
      ]
    },
    challengesAndSolutions: {
      onPremisesToOnPremises: [
        {
          challenge: 'Complex policy translation between platforms',
          solution: 'Detailed policy mapping and testing before migration, with specialized migration tools or services'
        },
        {
          challenge: 'Hardware procurement and deployment delays',
          solution: 'Early ordering with buffer time and phased deployment to manage lead times'
        },
        {
          challenge: 'Potential network downtime during cutover',
          solution: 'Careful parallel operation with incremental cutover to minimize disruption'
        },
        {
          challenge: 'Custom integration redevelopment',
          solution: 'Thorough integration inventory and specialized resources for custom development'
        },
        {
          challenge: 'Training IT staff on new platform',
          solution: 'Early training and side-by-side operation period for knowledge transfer'
        }
      ],
      onPremisesToCloud: [
        {
          challenge: 'Different architecture paradigm',
          solution: 'Focus on policy outcomes rather than direct feature mapping, leveraging cloud advantages'
        },
        {
          challenge: 'Adapting to cloud-based management',
          solution: 'Early admin access and training with guided feature exploration'
        },
        {
          challenge: 'Network connectivity for cloud service',
          solution: 'Bandwidth and reliability assessment with redundant connectivity options'
        },
        {
          challenge: 'Integration with on-premises systems',
          solution: 'Cloud connectors designed specifically for hybrid environment integration'
        },
        {
          challenge: 'Organizational change management',
          solution: 'Focus on operational benefits and simplified processes to drive adoption'
        }
      ]
    },
    costFactors: {
      onPremisesToOnPremises: [
        {
          category: 'Migration-Specific Costs',
          items: [
            'Professional services for migration',
            'Parallel infrastructure during transition',
            'Potential downtime and productivity impact',
            'Custom integration redevelopment',
            'Additional training for new platform'
          ]
        },
        {
          category: 'Risk Factors',
          items: [
            'Extended project timeline affecting other initiatives',
            'Potential security gaps during transition',
            'Complex rollback procedures if issues occur',
            'User disruption during cutover',
            'Policy translation errors or omissions'
          ]
        }
      ],
      onPremisesToCloud: [
        {
          category: 'Migration-Specific Costs',
          items: [
            'Limited professional services if needed',
            'Minimal parallel infrastructure requirements',
            'Reduced downtime risk with monitoring-first approach',
            'Simplified integration with cloud connectors',
            'Streamlined training for cloud interface'
          ]
        },
        {
          category: 'Risk Factors',
          items: [
            'Shorter project timeline with less impact',
            'Non-disruptive side-by-side operation',
            'Simplified rollback with parallel operation',
            'Minimal user impact with phased approach',
            'Cloud-native policy model reduces translation issues'
          ]
        }
      ]
    }
  }
};
EOL

# Create a component to display enhanced compliance information
cat > js/components/compliance-insights.js << 'EOL'
/**
 * Enhanced Compliance Insights Component
 * Displays detailed industry-specific compliance information and recommendations
 */
class ComplianceInsights {
  constructor() {
    this.activeIndustry = null;
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Listen for industry template changes
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
      industrySelector.addEventListener('change', () => {
        this.updateComplianceInsights(industrySelector.value);
      });
    }
    
    // Listen for tab changes to update content when compliance tab is shown
    if (window.tabManager) {
      window.tabManager.on('tabChanged', (data) => {
        if (data.tabId === 'compliance-tab') {
          this.refreshComplianceInsights();
        }
      });
    }
  }
  
  updateComplianceInsights(industryKey) {
    if (!industryKey || industryKey === 'none' || !window.enhancedIndustryTemplates) {
      return;
    }
    
    this.activeIndustry = industryKey;
    
    // Create or update compliance info
    const industry = window.enhancedIndustryTemplates[industryKey];
    if (!industry) return;
    
    // Update complianceInfo in the UI
    this.updateComplianceInfo(industry);
    
    // Update regulatory details
    this.updateRegulatoryDetails(industry);
    
    // Update industry challenges and solutions
    this.updateChallengesMitigated(industry);
    
    // Show compliance tab if available
    this.showComplianceTab();
  }
  
  refreshComplianceInsights() {
    if (this.activeIndustry) {
      this.updateComplianceInsights(this.activeIndustry);
    }
  }
  
  updateComplianceInfo(industry) {
    const container = document.getElementById('compliance-info-container');
    if (!container) return;
    
    const complianceInfo = industry.complianceInfo;
    if (!complianceInfo) return;
    
    // Create compliance info card
    let html = `
      <div class="compliance-info-card">
        <h3>${complianceInfo.title}</h3>
        <p>${complianceInfo.details}</p>
        <h4>Key Requirements</h4>
        <ul class="compliance-requirements">
    `;
    
    // Add requirements
    complianceInfo.keyRequirements.forEach(req => {
      html += `<li>${req}</li>`;
    });
    
    html += `
        </ul>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  updateRegulatoryDetails(industry) {
    const container = document.getElementById('regulatory-details-container');
    if (!container) return;
    
    const complianceInfo = industry.complianceInfo;
    if (!complianceInfo || !complianceInfo.regulations) return;
    
    // Create regulations card
    let html = `
      <div class="result-card">
        <h3>Regulatory Framework Details</h3>
        <div class="regulations-grid">
    `;
    
    // Add regulations
    complianceInfo.regulations.forEach(reg => {
      html += `
        <div class="regulation-card">
          <h4>${reg.name}</h4>
          <p>${reg.description}</p>
          <div class="regulation-relevance">
            <h5>NAC Relevance</h5>
            <p>${reg.relevance}</p>
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
    
    // Add specialized HIPAA details if available
    if (industry.hipaaDetails) {
      this.updateHIPAADetails(industry.hipaaDetails);
    }
  }
  
  updateHIPAADetails(hipaaDetails) {
    const container = document.getElementById('hipaa-details-container');
    if (!container) return;
    
    // Create HIPAA details card
    let html = `
      <div class="result-card">
        <h3>HIPAA Technical Safeguards Analysis</h3>
        <p>${hipaaDetails.riskAnalysis}</p>
        <p>${hipaaDetails.documentationSupport}</p>
        
        <h4>HIPAA Security Rule Controls</h4>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Control</th>
                <th>HIPAA Requirement</th>
                <th>NAC Implementation</th>
              </tr>
            </thead>
            <tbody>
    `;
    
    // Add technical controls
    hipaaDetails.technicalControls.forEach(control => {
      html += `
        <tr>
          <td>${control.control}</td>
          <td>${control.requirement}</td>
          <td>${control.implementation}</td>
        </tr>
      `;
    });
    
    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  updateChallengesMitigated(industry) {
    const container = document.getElementById('challenges-mitigated-container');
    if (!container) return;
    
    if (!industry.challengesMitigated) return;
    
    // Create challenges card
    let html = `
      <div class="result-card">
        <h3>${industry.name} Industry Challenges</h3>
        <div class="challenges-grid">
    `;
    
    // Add challenges
    industry.challengesMitigated.forEach(item => {
      html += `
        <div class="challenge-card">
          <div class="challenge-content">
            <h4 class="challenge-title">Challenge: ${item.challenge}</h4>
            <div class="challenge-solution">
              <h5>Solution</h5>
              <p>${item.mitigation}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    // Update container
    container.innerHTML = html;
    container.classList.remove('hidden');
  }
  
  showComplianceTab() {
    // Check if compliance tab exists
    const complianceTab = document.querySelector('.tab-button[data-tab="compliance-tab"]');
    if (!complianceTab) {
      // Create compliance tab if needed
      this.createComplianceTab();
    } else {
      // Show existing tab
      complianceTab.style.display = '';
    }
  }
  
  createComplianceTab() {
    // Find tabs container
    const tabsContainer = document.querySelector('.tabs');
    if (!tabsContainer) return;
    
    // Create new tab button
    const newTab = document.createElement('button');
    newTab.className = 'tab-button';
    newTab.setAttribute('role', 'tab');
    newTab.setAttribute('aria-selected', 'false');
    newTab.setAttribute('data-tab', 'compliance-tab');
    newTab.setAttribute('tabindex', '-1');
    newTab.innerHTML = 'Compliance';
    
    // Insert after implementation tab
    const implementationTab = document.querySelector('.tab-button[data-tab="implementation-tab"]');
    if (implementationTab) {
      tabsContainer.insertBefore(newTab, implementationTab.nextSibling);
    } else {
      tabsContainer.appendChild(newTab);
    }
    
    // Create tab content
    const tabContent = document.querySelector('.tab-content');
    if (!tabContent) return;
    
    const newTabPane = document.createElement('div');
    newTabPane.id = 'compliance-tab';
    newTabPane.className = 'tab-pane';
    newTabPane.setAttribute('role', 'tabpanel');
    newTabPane.setAttribute('aria-hidden', 'true');
    
    // Add content structure
    newTabPane.innerHTML = `
      <h3>Industry Compliance Analysis</h3>
      
      <div id="compliance-info-container" class="compliance-info-container"></div>
      
      <div id="regulatory-details-container" class="regulatory-details-container"></div>
      
      <div id="hipaa-details-container" class="hipaa-details-container hidden"></div>
      
      <div id="challenges-mitigated-container" class="challenges-mitigated-container"></div>
    `;
    
    // Add to tab content
    tabContent.appendChild(newTabPane);
    
    // Add event listener
    newTab.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.tabManager) {
        window.tabManager.setActiveTab('compliance-tab');
      }
    });
    
    // Add keyboard accessibility
    newTab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (window.tabManager) {
          window.tabManager.setActiveTab('compliance-tab');
        }
      }
    });
  }
}

// Initialize and make globally available
window.complianceInsights = new ComplianceInsights();
EOL

# Add the enhanced industry data and component to index.html
if [ -f "index.html" ]; then
  sed -i 's/<script src="js\/data\/industry-templates.js"><\/script>/<script src="data\/enhanced-industry-compliance.js"><\/script>\n  <script src="js\/data\/industry-templates.js"><\/script>\n  <script src="js\/components\/compliance-insights.js"><\/script>/' index.html
  echo -e "${GREEN}✓ Added enhanced industry compliance data and component to index.html${NC}"
else
  echo -e "${RED}✗ index.html not found - cannot add enhanced industry compliance data${NC}"
fi

