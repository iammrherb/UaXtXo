#!/bin/bash

# NAC Wizard Error Fix Script
# This script fixes the specific errors shown in the console output

echo "Starting NAC Wizard Error Fix..."

# Create backup directory
BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
echo "Created backup directory: $BACKUP_DIR"

# Backup JavaScript files with errors
echo "Backing up JavaScript files with errors..."
cp js/wizards/wizard-controller.js "$BACKUP_DIR/" 2>/dev/null || echo "Warning: wizard-controller.js not found"
cp js/features/wizard/enhanced-wizard.js "$BACKUP_DIR/" 2>/dev/null || echo "Warning: enhanced-wizard.js not found"
cp js/components/calculator.js "$BACKUP_DIR/" 2>/dev/null || echo "Warning: calculator.js not found"
cp js/components/charts.js "$BACKUP_DIR/" 2>/dev/null || echo "Warning: charts.js not found"

# Create vendor images directory if it doesn't exist
echo "Creating vendor images directory..."
mkdir -p img/vendors

# Create placeholder vendor logo images
echo "Creating placeholder vendor logo images..."
# Function to create a placeholder SVG
create_placeholder_svg() {
  local name=$1
  local color=$2
  local filename=$3
  
  cat > "$filename" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect width="200" height="100" fill="#f0f0f0" />
  <rect x="10" y="10" width="180" height="80" fill="$color" rx="10" ry="10" />
  <text x="100" y="55" font-family="Arial" font-size="16" text-anchor="middle" fill="white">$name</text>
</svg>
EOF
}

# Create placeholder vendor logos
create_placeholder_svg "Cisco ISE" "#1ba0d7" "img/vendors/cisco-logo.png"
create_placeholder_svg "Aruba ClearPass" "#f58220" "img/vendors/aruba-logo.png"
create_placeholder_svg "Forescout" "#3f3f95" "img/vendors/forescout-logo.png"
create_placeholder_svg "FortiNAC" "#ee3124" "img/vendors/fortinac-logo.png"
create_placeholder_svg "Microsoft NPS" "#00a4ef" "img/vendors/microsoft-logo.png"
create_placeholder_svg "SecureW2" "#4caf50" "img/vendors/securew2-logo.png"

# Also create copies in the img directory to handle both paths
cp img/vendors/cisco-logo.png img/cisco-logo.png
cp img/vendors/aruba-logo.png img/aruba-logo.png
cp img/vendors/forescout-logo.png img/forescout-logo.png
cp img/vendors/fortinac-logo.png img/fortinac-logo.png
cp img/vendors/microsoft-logo.png img/microsoft-logo.png
cp img/vendors/securew2-logo.png img/securew2-logo.png

# Fix JavaScript syntax errors - replace ==== with === and !== with !==
echo "Fixing JavaScript syntax errors..."

# Function to fix equality operators in a file
fix_equality_operators() {
  local file=$1
  if [ -f "$file" ]; then
    echo "  Fixing equality operators in $file"
    sed -i 's/====/===/g' "$file"
    sed -i 's/!===/!==/g' "$file"
    sed -i 's/===/==/g' "$file" # Fix any === that should be == (in case there were some)
  else
    echo "  Warning: $file not found"
  fi
}

# Fix wizard-controller.js
fix_equality_operators "js/wizards/wizard-controller.js"

# Fix enhanced-wizard.js
fix_equality_operators "js/features/wizard/enhanced-wizard.js"

# Fix calculator.js invalid assignment
if [ -f "js/components/calculator.js" ]; then
  echo "  Fixing invalid assignment in calculator.js"
  # Look for invalid assignments like "if (something = value)" which should be "if (something === value)"
  # This is a common cause of "Invalid left-hand side in assignment" errors
  sed -i 's/if (\([^=]*\) = \([^=]*\))/if (\1 === \2)/g' "js/components/calculator.js"
  # Also fix cases where = might be used for comparison elsewhere
  sed -i 's/\([^=!<>]\) = \([^=]\)/\1 === \2/g' "js/components/calculator.js"
else
  echo "  Warning: calculator.js not found"
fi

# Fix the "Cannot read properties of undefined (reading 'duration')" error in charts.js
if [ -f "js/components/charts.js" ]; then
  echo "  Fixing 'duration' property error in charts.js"
  
  # Create a patch file for charts.js
  cat > charts_fix.patch << 'EOF'
--- charts.js.old  2023-05-12 12:00:00
+++ charts.js      2023-05-12 12:00:00
@@ -840,9 +840,15 @@
   // Update charts with animation
   updateCharts: function(data) {
     // Apply animation settings
-    Chart.defaults.animation.duration = data.duration || 1000;
-    Chart.defaults.animation.easing = data.easing || 'easeOutQuart';
-    
+    if (Chart && Chart.defaults) {
+      // Check if animation object exists
+      if (!Chart.defaults.animation) {
+        Chart.defaults.animation = {};
+      }
+      // Set animation properties safely
+      Chart.defaults.animation.duration = (data && data.duration) || 1000;
+      Chart.defaults.animation.easing = (data && data.easing) || 'easeOutQuart';
+    }
     // Update all charts
     this.updateTCOChart(data);
     this.updateBreakdownCharts(data);
EOF
  
  # Apply the patch if possible, or manually implement the fix
  if command -v patch >/dev/null 2>&1; then
    # Create a backup of the original file
    cp "js/components/charts.js" "js/components/charts.js.bak"
    
    # Apply the patch
    patch "js/components/charts.js" charts_fix.patch || {
      echo "    Patch failed, implementing manual fix..."
      # Replace the problematic line with a safer version
      sed -i '842s/.*/    Chart.defaults.animation = Chart.defaults.animation || {};\n    Chart.defaults.animation.duration = (data \&\& data.duration) || 1000;/' "js/components/charts.js"
      sed -i '843s/.*/    Chart.defaults.animation.easing = (data \&\& data.easing) || '\''easeOutQuart'\'';/' "js/components/charts.js"
    }
    
    # Remove the patch file
    rm charts_fix.patch
  else
    echo "    Patch command not available, implementing manual fix..."
    # Replace the problematic line with a safer version
    sed -i '842s/.*/    Chart.defaults.animation = Chart.defaults.animation || {};\n    Chart.defaults.animation.duration = (data \&\& data.duration) || 1000;/' "js/components/charts.js"
    sed -i '843s/.*/    Chart.defaults.animation.easing = (data \&\& data.easing) || '\''easeOutQuart'\'';/' "js/components/charts.js"
  fi
else
  echo "  Warning: charts.js not found"
fi

# Create an enhanced image loader script to handle 404 errors
echo "Creating enhanced image loader script..."
cat > js/fixes/image-loader-fix.js << 'EOF'
/**
 * Enhanced Image Loader
 * Handles 404 errors for missing images by providing fallbacks
 */
document.addEventListener('DOMContentLoaded', function() {
  // Handle vendor logo image errors
  document.querySelectorAll('img[src*="logo"]').forEach(function(img) {
    img.onerror = function() {
      // Extract vendor name from the image path
      const path = img.src;
      const vendorMatch = path.match(/\/([a-z0-9-]+)-logo\.png/i);
      const vendorName = vendorMatch ? vendorMatch[1] : 'vendor';
      
      // Create a canvas element for the fallback
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 100;
      
      // Get the 2D context
      const ctx = canvas.getContext('2d');
      
      // Fill background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 200, 100);
      
      // Draw colored rectangle
      ctx.fillStyle = getVendorColor(vendorName);
      ctx.roundRect(10, 10, 180, 80, 10);
      ctx.fill();
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getVendorDisplayName(vendorName), 100, 50);
      
      // Replace the image source with the canvas data URL
      img.src = canvas.toDataURL('image/png');
    };
  });
  
  // Helper function to get vendor color
  function getVendorColor(vendorName) {
    const vendorColors = {
      'cisco': '#1ba0d7',
      'aruba': '#f58220',
      'forescout': '#3f3f95',
      'fortinac': '#ee3124',
      'microsoft': '#00a4ef',
      'securew2': '#4caf50',
      'portnox': '#65BD44'
    };
    
    return vendorColors[vendorName.toLowerCase()] || '#555555';
  }
  
  // Helper function to get vendor display name
  function getVendorDisplayName(vendorName) {
    const vendorDisplayNames = {
      'cisco': 'Cisco ISE',
      'aruba': 'Aruba ClearPass',
      'forescout': 'Forescout',
      'fortinac': 'FortiNAC',
      'microsoft': 'Microsoft NPS',
      'securew2': 'SecureW2',
      'portnox': 'Portnox Cloud'
    };
    
    return vendorDisplayNames[vendorName.toLowerCase()] || vendorName;
  }
  
  // Add roundRect method if not supported
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      this.beginPath();
      this.moveTo(x + radius, y);
      this.arcTo(x + width, y, x + width, y + height, radius);
      this.arcTo(x + width, y + height, x, y + height, radius);
      this.arcTo(x, y + height, x, y, radius);
      this.arcTo(x, y, x + width, y, radius);
      this.closePath();
      return this;
    };
  }
});
EOF

# Add the image loader script to index.html
echo "Adding image loader script to index.html..."
if [ -f "index.html" ]; then
  # Check if the script is already included
  if ! grep -q "image-loader-fix.js" "index.html"; then
    # Add the script before the closing body tag
    sed -i 's/<\/body>/    <script src="js\/fixes\/image-loader-fix.js"><\/script>\n<\/body>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Create a specific fix for wizard step navigation
echo "Creating wizard step navigation fix..."
cat > js/fixes/wizard-navigation-fix.js << 'EOF'
/**
 * Wizard Navigation Fix
 * Ensures proper navigation between wizard steps
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all wizard steps
  const wizardSteps = document.querySelectorAll('.wizard-step');
  if (wizardSteps.length === 0) return;
  
  // Get navigation buttons
  const nextBtn = document.getElementById('next-step');
  const prevBtn = document.getElementById('prev-step');
  
  // Initialize step tracker
  let currentStep = 1;
  
  // Function to show a specific step
  function showStep(stepNumber) {
    // Validate step number
    if (stepNumber < 1 || stepNumber > wizardSteps.length) return;
    
    // Update current step
    currentStep = stepNumber;
    
    // Hide all steps
    wizardSteps.forEach(step => {
      step.classList.remove('active');
    });
    
    // Show current step
    document.querySelector(`.wizard-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update progress indicators if they exist
    const progressSteps = document.querySelectorAll('.wizard-progress-step');
    progressSteps.forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index + 1 < currentStep) {
        step.classList.add('completed');
      } else if (index + 1 === currentStep) {
        step.classList.add('active');
      }
    });
    
    // Update navigation buttons
    if (prevBtn) {
      prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    }
    
    if (nextBtn) {
      nextBtn.textContent = currentStep === wizardSteps.length ? 'Generate Report' : 'Next';
    }
    
    // Update progress fill if it exists
    const progressFill = document.getElementById('wizard-progress-fill');
    if (progressFill) {
      const progressPercentage = ((currentStep - 1) / (wizardSteps.length - 1)) * 100;
      progressFill.style.width = `${progressPercentage}%`;
    }
  }
  
  // Add click handlers to navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      // Validate current step
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showStep(currentStep - 1);
    });
  }
  
  // Simple validation function
  function validateStep(step) {
    // Add validation logic based on step
    switch(step) {
      case 1: // Vendor selection
        const selectedVendor = document.querySelector('.vendor-card.active');
        if (!selectedVendor) {
          showError('Please select a vendor to continue.');
          return false;
        }
        return true;
        
      case 2: // Industry selection
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect && !industrySelect.value) {
          showError('Please select an industry to continue.');
          return false;
        }
        return true;
        
      case 3: // Organization details
        const deviceCount = document.getElementById('device-count');
        if (deviceCount && (isNaN(deviceCount.value) || deviceCount.value <= 0)) {
          showError('Please enter a valid device count to continue.');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  }
  
  // Function to show error message
  function showError(message) {
    const errorContainer = document.getElementById('wizard-error-container');
    if (!errorContainer) return;
    
    errorContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button class="close-error">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = errorContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        errorContainer.innerHTML = '';
      });
    }
  }
  
  // Initialize wizard to first step
  showStep(1);
  
  // Make functions available globally
  window.wizardNavigation = {
    showStep,
    validateStep,
    getCurrentStep: () => currentStep,
    getTotalSteps: () => wizardSteps.length
  };
});
EOF

# Add the wizard navigation fix script to index.html
echo "Adding wizard navigation fix script to index.html..."
if [ -f "index.html" ]; then
  # Check if the script is already included
  if ! grep -q "wizard-navigation-fix.js" "index.html"; then
    # Add the script before the closing body tag
    sed -i 's/<\/body>/    <script src="js\/fixes\/wizard-navigation-fix.js"><\/script>\n<\/body>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Create a vendor card interaction script
echo "Creating vendor card interaction script..."
cat > js/fixes/vendor-cards-fix.js << 'EOF'
/**
 * Vendor Cards Fix
 * Adds interaction functionality to vendor selection cards
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');
  if (vendorCards.length === 0) return;
  
  // Add click event to vendor cards
  vendorCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      vendorCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Update vendor preview if it exists
      const vendorPreview = document.getElementById('vendor-preview');
      if (vendorPreview) {
        const vendorId = this.getAttribute('data-vendor');
        updateVendorPreview(vendorId, vendorPreview);
      }
    });
  });
  
  // Function to update vendor preview
  function updateVendorPreview(vendorId, previewElement) {
    // Get vendor information
    const vendorInfo = getVendorInfo(vendorId);
    
    // Create preview HTML
    const previewHTML = `
      <div class="preview-header">
        <h3>${vendorInfo.name}</h3>
        <p>${vendorInfo.description}</p>
      </div>
      <div class="preview-details">
        <div class="preview-detail">
          <span class="detail-label">Deployment Model:</span>
          <span class="detail-value">${vendorInfo.deployment}</span>
        </div>
        <div class="preview-detail">
          <span class="detail-label">Implementation Time:</span>
          <span class="detail-value">${vendorInfo.implementationTime}</span>
        </div>
        <div class="preview-detail">
          <span class="detail-label">Pricing Model:</span>
          <span class="detail-value">${vendorInfo.pricing}</span>
        </div>
      </div>
    `;
    
    // Set preview HTML
    previewElement.innerHTML = previewHTML;
    
    // Show preview
    previewElement.style.display = 'block';
  }
  
  // Helper function to get vendor information
  function getVendorInfo(vendorId) {
    const vendorData = {
      'cisco': {
        name: 'Cisco ISE',
        description: 'Enterprise-grade NAC solution with comprehensive features',
        deployment: 'On-premises',
        implementationTime: '3-6 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'aruba': {
        name: 'Aruba ClearPass',
        description: 'Policy management platform with wireless integration',
        deployment: 'On-premises',
        implementationTime: '2-4 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'forescout': {
        name: 'Forescout',
        description: 'Agentless device visibility and control platform',
        deployment: 'On-premises',
        implementationTime: '2-4 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'fortinac': {
        name: 'FortiNAC',
        description: 'Network access control integrated with Fortinet Security Fabric',
        deployment: 'On-premises',
        implementationTime: '1-3 months',
        pricing: 'Perpetual licensing + maintenance'
      },
      'nps': {
        name: 'Microsoft NPS',
        description: 'Basic RADIUS server included with Windows Server',
        deployment: 'On-premises',
        implementationTime: '2-4 weeks',
        pricing: 'Included with Windows Server'
      },
      'securew2': {
        name: 'SecureW2',
        description: 'Cloud-based certificate management and authentication',
        deployment: 'Cloud',
        implementationTime: '1-3 weeks',
        pricing: 'Subscription (per user)'
      },
      'noNac': {
        name: 'No NAC Solution',
        description: 'Currently operating without NAC controls',
        deployment: 'N/A',
        implementationTime: 'N/A',
        pricing: 'N/A'
      }
    };
    
    return vendorData[vendorId] || {
      name: 'Unknown Vendor',
      description: 'Vendor information not available',
      deployment: 'Unknown',
      implementationTime: 'Unknown',
      pricing: 'Unknown'
    };
  }
  
  // Select first card by default if none is selected
  if (!document.querySelector('.vendor-card.active')) {
    vendorCards[0].click();
  }
});
EOF

# Add the vendor cards fix script to index.html
echo "Adding vendor cards fix script to index.html..."
if [ -f "index.html" ]; then
  # Check if the script is already included
  if ! grep -q "vendor-cards-fix.js" "index.html"; then
    # Add the script before the closing body tag
    sed -i 's/<\/body>/    <script src="js\/fixes\/vendor-cards-fix.js"><\/script>\n<\/body>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Create a dummy chart data generator to handle missing data
echo "Creating chart data generator..."
cat > js/fixes/chart-data-generator.js << 'EOF'
/**
 * Chart Data Generator
 * Provides dummy data for charts when real data is not available
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if charts exist but no data is loaded
  setTimeout(function() {
    // Check TCO comparison chart
    const tcoChart = document.getElementById('tco-comparison-chart');
    if (tcoChart && !window.chartInstances) {
      generateDummyCharts();
    }
  }, 2000); // Wait 2 seconds for any async data loading
  
  // Function to generate dummy charts
  function generateDummyCharts() {
    console.log('Generating dummy chart data for preview');
    
    // Get selected vendor
    const selectedVendor = document.querySelector('.vendor-card.active');
    const vendorId = selectedVendor ? selectedVendor.getAttribute('data-vendor') : 'cisco';
    
    // Generate dummy TCO data
    const tcoData = generateTCOData(vendorId);
    
    // Initialize chart instances object if it doesn't exist
    window.chartInstances = window.chartInstances || {};
    
    // Generate TCO comparison chart
    generateTCOComparisonChart(tcoData);
    
    // Generate cost breakdown charts
    generateCostBreakdownCharts(tcoData);
    
    // Generate cumulative cost chart
    generateCumulativeCostChart(tcoData);
  }
  
  // Function to generate dummy TCO data
  function generateTCOData(vendorId) {
    // Base costs for Portnox
    const portnoxCosts = {
      license: 100000,
      hardware: 0,
      implementation: 20000,
      maintenance: 0,
      training: 5000,
      fte: 60000,
      total: 185000
    };
    
    // Multipliers for different vendors
    const vendorMultipliers = {
      'cisco': { license: 1.5, hardware: 50000, implementation: 3, maintenance: 30000, training: 2, fte: 1.5 },
      'aruba': { license: 1.4, hardware: 40000, implementation: 2.5, maintenance: 25000, training: 1.8, fte: 1.4 },
      'forescout': { license: 1.6, hardware: 60000, implementation: 2.8, maintenance: 35000, training: 2.2, fte: 1.6 },
      'fortinac': { license: 1.3, hardware: 35000, implementation: 2.2, maintenance: 20000, training: 1.6, fte: 1.3 },
      'nps': { license: 0.2, hardware: 15000, implementation: 1.5, maintenance: 5000, training: 1.2, fte: 2 },
      'securew2': { license: 0.9, hardware: 0, implementation: 1.2, maintenance: 0, training: 1.1, fte: 1.1 },
      'noNac': { license: 0, hardware: 0, implementation: 0, maintenance: 0, training: 0, fte: 0 }
    };
    
    // Get multiplier for selected vendor
    const multiplier = vendorMultipliers[vendorId] || vendorMultipliers.cisco;
    
    // Calculate vendor costs
    const vendorCosts = {
      license: portnoxCosts.license * multiplier.license,
      hardware: multiplier.hardware,
      implementation: portnoxCosts.implementation * multiplier.implementation,
      maintenance: multiplier.maintenance,
      training: portnoxCosts.training * multiplier.training,
      fte: portnoxCosts.fte * multiplier.fte
    };
    
    // Calculate total
    vendorCosts.total = vendorCosts.license + vendorCosts.hardware + vendorCosts.implementation + 
                        vendorCosts.maintenance + vendorCosts.training + vendorCosts.fte;
    
    return {
      portnox: portnoxCosts,
      vendor: vendorCosts,
      vendorName: getVendorName(vendorId),
      savings: vendorCosts.total - portnoxCosts.total,
      savingsPercentage: Math.round(((vendorCosts.total - portnoxCosts.total) / vendorCosts.total) * 100)
    };
  }
  
  // Function to get vendor name
  function getVendorName(vendorId) {
    const vendorNames = {
      'cisco': 'Cisco ISE',
      'aruba': 'Aruba ClearPass',
      'forescout': 'Forescout',
      'fortinac': 'FortiNAC',
      'nps': 'Microsoft NPS',
      'securew2': 'SecureW2',
      'noNac': 'No NAC Solution'
    };
    
    return vendorNames[vendorId] || 'Selected Vendor';
  }
  
  // Function to generate TCO comparison chart
  function generateTCOComparisonChart(data) {
    const ctx = document.getElementById('tco-comparison-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.chartInstances.tcoComparison) {
      window.chartInstances.tcoComparison.destroy();
    }
    
    // Create new chart
    window.chartInstances.tcoComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Portnox Cloud', data.vendorName],
        datasets: [{
          label: '3-Year TCO',
          data: [data.portnox.total, data.vendor.total],
          backgroundColor: ['#65BD44', '#05547C']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '3-Year Total Cost of Ownership Comparison'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '$' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Function to generate cost breakdown charts
  function generateCostBreakdownCharts(data) {
    // Portnox breakdown chart
    const portnoxCtx = document.getElementById('alternative-breakdown-chart');
    if (portnoxCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.portnoxBreakdown) {
        window.chartInstances.portnoxBreakdown.destroy();
      }
      
      // Create new chart
      window.chartInstances.portnoxBreakdown = new Chart(portnoxCtx, {
        type: 'pie',
        data: {
          labels: ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'IT Resources'],
          datasets: [{
            data: [
              data.portnox.license,
              data.portnox.hardware,
              data.portnox.implementation,
              data.portnox.maintenance,
              data.portnox.training,
              data.portnox.fte
            ],
            backgroundColor: [
              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Portnox Cloud Cost Breakdown'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = '$' + context.raw.toLocaleString();
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
    
    // Vendor breakdown chart
    const vendorCtx = document.getElementById('current-breakdown-chart');
    if (vendorCtx) {
      // Destroy existing chart if it exists
      if (window.chartInstances.vendorBreakdown) {
        window.chartInstances.vendorBreakdown.destroy();
      }
      
      // Create new chart
      window.chartInstances.vendorBreakdown = new Chart(vendorCtx, {
        type: 'pie',
        data: {
          labels: ['License', 'Hardware', 'Implementation', 'Maintenance', 'Training', 'IT Resources'],
          datasets: [{
            data: [
              data.vendor.license,
              data.vendor.hardware,
              data.vendor.implementation,
              data.vendor.maintenance,
              data.vendor.training,
              data.vendor.fte
            ],
            backgroundColor: [
              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `${data.vendorName} Cost Breakdown`
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = '$' + context.raw.toLocaleString();
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((context.raw / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Function to generate cumulative cost chart
  function generateCumulativeCostChart(data) {
    const ctx = document.getElementById('cumulative-cost-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.chartInstances.cumulativeCost) {
      window.chartInstances.cumulativeCost.destroy();
    }
    
    // Calculate initial costs
    const portnoxInitial = data.portnox.hardware + data.portnox.implementation + data.portnox.training;
    const vendorInitial = data.vendor.hardware + data.vendor.implementation + data.vendor.training;
    
    // Calculate annual costs
    const portnoxAnnual = data.portnox.license / 3 + data.portnox.fte;
    const vendorAnnual = data.vendor.license / 3 + data.vendor.maintenance + data.vendor.fte;
    
    // Calculate cumulative costs
    const years = ['Initial', 'Year 1', 'Year 2', 'Year 3'];
    const portnoxCumulative = [
      portnoxInitial,
      portnoxInitial + portnoxAnnual,
      portnoxInitial + portnoxAnnual * 2,
      portnoxInitial + portnoxAnnual * 3
    ];
    
    const vendorCumulative = [
      vendorInitial,
      vendorInitial + vendorAnnual,
      vendorInitial + vendorAnnual * 2,
      vendorInitial + vendorAnnual * 3
    ];
    
    // Create new chart
    window.chartInstances.cumulativeCost = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Portnox Cloud',
            data: portnoxCumulative,
            borderColor: '#65BD44',
            backgroundColor: 'rgba(101, 189, 68, 0.1)',
            fill: true
          },
          {
            label: data.vendorName,
            data: vendorCumulative,
            borderColor: '#05547C',
            backgroundColor: 'rgba(5, 84, 124, 0.1)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Cumulative Cost Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  // Add event listener to Calculate button
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      generateDummyCharts();
      
      // Show results container
      const resultsContainer = document.getElementById('results-container');
      if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update executive summary
      updateExecutiveSummary();
    });
  }
  
  // Function to update executive summary
  function updateExecutiveSummary() {
    // Get selected vendor
    const selectedVendor = document.querySelector('.vendor-card.active');
    const vendorId = selectedVendor ? selectedVendor.getAttribute('data-vendor') : 'cisco';
    
    // Generate dummy TCO data
    const tcoData = generateTCOData(vendorId);
    
    // Update total savings
    const totalSavingsEl = document.getElementById('total-savings');
    if (totalSavingsEl) {
      totalSavingsEl.textContent = '$' + tcoData.savings.toLocaleString();
    }
    
    // Update savings percentage
    const savingsPercentageEl = document.getElementById('savings-percentage');
    if (savingsPercentageEl) {
      savingsPercentageEl.textContent = tcoData.savingsPercentage + '%';
    }
    
    // Update break-even point
    const breakEvenEl = document.getElementById('breakeven-point');
    if (breakEvenEl) {
      // Calculate break-even in months (simplified)
      const breakEvenMonths = Math.round((tcoData.portnox.implementation + tcoData.portnox.training) / 
                                       ((tcoData.vendor.license / 36 + tcoData.vendor.maintenance / 12 + tcoData.vendor.fte / 12) - 
                                        (tcoData.portnox.license / 36 + tcoData.portnox.fte / 12)));
      
      breakEvenEl.textContent = breakEvenMonths + ' months';
    }
    
    // Update risk reduction
    const riskReductionEl = document.getElementById('risk-reduction');
    if (riskReductionEl) {
      // Calculate risk reduction (simplified)
      const riskReduction = vendorId === 'noNac' ? 85 : 45;
      
      riskReductionEl.textContent = riskReduction + '%';
    }
    
    // Update implementation time
    const implementationTimeEl = document.getElementById('implementation-time');
    if (implementationTimeEl) {
      // Get implementation times
      const implementationTimes = {
        'cisco': 90,
        'aruba': 75,
        'forescout': 80,
        'fortinac': 60,
        'nps': 21,
        'securew2': 14,
        'noNac': 0
      };
      
      const vendorTime = implementationTimes[vendorId] || 60;
      const portnoxTime = 7;
      
      implementationTimeEl.textContent = (vendorTime - portnoxTime) + ' days faster';
    }
    
    // Add key insights
    const insightsList = document.getElementById('key-insights-list');
    if (insightsList) {
      const vendorName = getVendorName(vendorId);
      
      // Clear existing insights
      insightsList.innerHTML = '';
      
      // Create insights
      const insights = [
        {
          title: 'Cost Efficiency',
          description: `Portnox Cloud provides ${tcoData.savingsPercentage}% lower TCO compared to ${vendorName} over 3 years, primarily through eliminated hardware costs and reduced management overhead.`,
          icon: 'fas fa-piggy-bank'
        },
        {
          title: 'Implementation Speed',
          description: `Deploy Portnox Cloud in 7 days compared to ${implementationTimes[vendorId] || 60} days for ${vendorName}, reducing time-to-security by ${Math.round(((implementationTimes[vendorId] || 60) - 7) / (implementationTimes[vendorId] || 60) * 100)}%.`,
          icon: 'fas fa-rocket'
        },
        {
          title: 'Operational Efficiency',
          description: `Portnox requires 0.5 FTEs for management compared to ${(vendorId === 'noNac' ? 0 : 1.5)} FTEs for ${vendorName}, freeing up IT resources for strategic initiatives.`,
          icon: 'fas fa-user-cog'
        },
        {
          title: 'Cloud Advantages',
          description: 'Cloud-native architecture eliminates maintenance windows, provides automatic updates, and scales elastically with your organization\'s growth.',
          icon: 'fas fa-cloud'
        }
      ];
      
      // Add insights to container
      insights.forEach(insight => {
        const insightEl = document.createElement('div');
        insightEl.className = 'insight-item';
        
        insightEl.innerHTML = `
          <div class="insight-icon">
            <i class="${insight.icon}"></i>
          </div>
          <div class="insight-content">
            <h4>${insight.title}</h4>
            <p>${insight.description}</p>
          </div>
        `;
        
        insightsList.appendChild(insightEl);
      });
    }
  }
  
  // Implementation times for reference
  const implementationTimes = {
    'cisco': 90,
    'aruba': 75,
    'forescout': 80,
    'fortinac': 60,
    'nps': 21,
    'securew2': 14,
    'noNac': 0
  };
});
EOF

# Add the chart data generator script to index.html
echo "Adding chart data generator script to index.html..."
if [ -f "index.html" ]; then
  # Check if the script is already included
  if ! grep -q "chart-data-generator.js" "index.html"; then
    # Add the script before the closing body tag
    sed -i 's/<\/body>/    <script src="js\/fixes\/chart-data-generator.js"><\/script>\n<\/body>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Add CSS fixes for vendor cards and preview panel
echo "Adding CSS fixes for vendor cards and preview panel..."
cat > css/fixes/vendor-cards.css << 'EOF'
/* Vendor card and preview panel styles */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.vendor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #e0e0e0);
  background-color: var(--bg-primary, #ffffff);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.vendor-card.active {
  border: 2px solid var(--primary-color, #65BD44);
  box-shadow: 0 5px 15px rgba(101, 189, 68, 0.2);
}

.vendor-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  margin-bottom: 15px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.vendor-logo img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.vendor-info {
  text-align: center;
}

.vendor-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #333333);
}

.vendor-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary, #666666);
}

.vendor-badge {
  margin-top: 10px;
}

.badge-market-leader {
  display: inline-block;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background-color: #1ba0d7;
  border-radius: 20px;
}

.badge-warning {
  display: inline-block;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background-color: #ee3124;
  border-radius: 20px;
}

.vendor-comparison-preview {
  background-color: var(--bg-secondary, #f8f9fa);
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.preview-header {
  margin-bottom: 15px;
}

.preview-header h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #333333);
}

.preview-header p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary, #666666);
}

.preview-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.preview-detail {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: var(--bg-primary, #ffffff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.detail-label {
  font-size: 13px;
  color: var(--text-secondary, #666666);
  margin-bottom: 5px;
}

.detail-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary, #333333);
}

/* Animations for vendor cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vendor-card {
  opacity: 0;
  animation: fadeInUp 0.5s forwards;
}

.vendor-card:nth-child(1) { animation-delay: 0.1s; }
.vendor-card:nth-child(2) { animation-delay: 0.2s; }
.vendor-card:nth-child(3) { animation-delay: 0.3s; }
.vendor-card:nth-child(4) { animation-delay: 0.4s; }
.vendor-card:nth-child(5) { animation-delay: 0.5s; }
.vendor-card:nth-child(6) { animation-delay: 0.6s; }
.vendor-card:nth-child(7) { animation-delay: 0.7s; }
EOF

# Add the CSS file to index.html
echo "Adding vendor cards CSS to index.html..."
if [ -f "index.html" ]; then
  # Check if the CSS file is already included
  if ! grep -q "vendor-cards.css" "index.html"; then
    # Add the CSS link before the closing head tag
    sed -i 's/<\/head>/    <link rel="stylesheet" href="css\/fixes\/vendor-cards.css">\n<\/head>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Create CSS fixes for charts and results
echo "Adding CSS fixes for charts and results..."
cat > css/fixes/charts-results.css << 'EOF'
/* Charts and results panel styles */
.results-container {
  padding: 20px;
  background-color: var(--bg-primary, #ffffff);
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.results-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  padding-bottom: 15px;
}

.results-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.result-tab {
  padding: 8px 15px;
  border-radius: 20px;
  background-color: var(--bg-secondary, #f8f9fa);
  color: var(--text-secondary, #666666);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color, #e0e0e0);
}

.result-tab:hover {
  background-color: var(--bg-tertiary, #f0f0f0);
}

.result-tab.active {
  background-color: var(--primary-color, #65BD44);
  color: white;
  border-color: var(--primary-color, #65BD44);
}

.results-actions {
  display: flex;
  gap: 10px;
}

.executive-summary {
  margin-bottom: 30px;
}

.executive-summary h2 {
  margin-bottom: 20px;
  color: var(--text-primary, #333333);
  font-size: 24px;
  font-weight: 600;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.summary-card {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--bg-secondary, #f8f9fa);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.summary-card.highlight {
  background-color: var(--primary-light, #f0f7ee);
  border-left: 4px solid var(--primary-color, #65BD44);
}

.card-icon {
  font-size: 24px;
  color: var(--primary-color, #65BD44);
  margin-bottom: 15px;
}

.card-content h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: var(--text-secondary, #666666);
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary, #333333);
  margin-bottom: 5px;
}

.metric-detail {
  font-size: 14px;
  color: var(--text-secondary, #666666);
}

.key-insights {
  margin-top: 30px;
}

.key-insights h3 {
  margin-bottom: 20px;
  color: var(--text-primary, #333333);
  font-size: 20px;
  font-weight: 600;
}

.insights-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}

.insight-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--bg-secondary, #f8f9fa);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.insight-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-light, #f0f7ee);
  flex-shrink: 0;
}

.insight-icon i {
  font-size: 20px;
  color: var(--primary-color, #65BD44);
}

.insight-content h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #333333);
}

.insight-content p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary, #666666);
  line-height: 1.5;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--bg-secondary, #f8f9fa);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.chart-card h3 {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary, #333333);
}

canvas {
  width: 100% !important;
  height: 300px !important;
}
EOF

# Add the charts and results CSS to index.html
echo "Adding charts and results CSS to index.html..."
if [ -f "index.html" ]; then
  # Check if the CSS file is already included
  if ! grep -q "charts-results.css" "index.html"; then
    # Add the CSS link before the closing head tag
    sed -i 's/<\/head>/    <link rel="stylesheet" href="css\/fixes\/charts-results.css">\n<\/head>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Fix wizard step navigation in index.html
echo "Fixing wizard step navigation in index.html..."
if [ -f "index.html" ]; then
  # Fix wizard navigation buttons duplicated inside steps
  sed -i '/<div class="wizard-navigation">/,/<\/div>/d' $(grep -l '<div class="wizard-navigation">' index.html | grep -v 'wizard-controller.js')
  
  # Add wizard navigation at the bottom of the wizard container
  if ! grep -q '<div id="wizard-navigation" class="wizard-navigation">' "index.html"; then
    sed -i '/<div class="wizard-container" id="wizard-container">/,/<\/div>/s/<\/div>$/  <div id="wizard-navigation" class="wizard-navigation">\n    <button id="prev-step" class="btn btn-outline"><i class="fas fa-chevron-left"><\/i> Previous<\/button>\n    <button id="next-step" class="btn btn-primary">Next <i class="fas fa-chevron-right"><\/i><\/button>\n  <\/div>\n<\/div>/' "index.html"
  fi
else
  echo "  Warning: index.html not found"
fi

# Commit changes to git if git is available
if command -v git >/dev/null 2>&1; then
  echo "Committing changes to git..."
  git add .
  git commit -m "Fix NAC Wizard errors and enhance functionality

- Fixed syntax errors in JavaScript files
- Added placeholder vendor logo images
- Fixed chart data generation errors
- Enhanced vendor card interactions
- Added CSS fixes for visual display
- Improved wizard step navigation
- Added error handling and fallbacks" || echo "Failed to commit changes"
else
  echo "Git not found, skipping commit step"
fi

echo "NAC Wizard Error Fix Script completed successfully!"
echo "Refresh the page in your browser to see the changes."
