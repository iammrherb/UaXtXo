#!/bin/bash

# NAC Architecture Designer Pro - Emergency Fix Script
# This script addresses critical issues with the current implementation

echo "===== NAC Architecture Designer Pro - Emergency Fix Script ====="
echo "Starting emergency fixes..."

# Create backup
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="./emergency_backup_${timestamp}"
mkdir -p $backup_dir
cp -r ./js ./css ./img ./*.html $backup_dir/
echo "Created backup in $backup_dir"

# 1. Fix circular DOM references
echo "Fixing circular DOM references..."
cat > js/fixes/dom-hierarchy-fix.js << 'EOL'
/**
 * DOM Hierarchy Fix - Resolves circular DOM references
 */
(function() {
  console.log('Applying DOM hierarchy fixes...');
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Fix 1: Check for and resolve circular references
    function fixCircularReferences(element, processed = new Set()) {
      if (!element || processed.has(element)) return;
      processed.add(element);
      
      // Get all child nodes
      const children = Array.from(element.childNodes);
      
      // Check each child for circular references
      children.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          // If child contains its own parent, detach it
          if (child.contains(element)) {
            console.log('Found circular reference, fixing...');
            element.removeChild(child);
            // Create a cleaned clone of the child
            const cleanChild = child.cloneNode(true);
            // Reattach the clean child
            element.appendChild(cleanChild);
          } else {
            // Continue checking descendants
            fixCircularReferences(child, processed);
          }
        }
      });
    }
    
    // Apply fix to the entire document
    fixCircularReferences(document.body);
    console.log('DOM hierarchy fixes applied');
  });
})();
EOL

# 2. Create chart initialization reconciliation
echo "Creating chart initialization fix..."
cat > js/fixes/chart-init-fix.js << 'EOL'
/**
 * Chart Initialization Fix - Ensures charts are properly initialized only once
 */
(function() {
  console.log('Applying chart initialization fixes...');
  
  // Track initialized charts to prevent duplicate initialization
  const initializedCharts = new Set();
  
  // Wait for window load to ensure all scripts are loaded
  window.addEventListener('load', function() {
    // Create a unified chart initialization function
    window.initializeAllCharts = function() {
      console.log('Unified chart initialization starting...');
      
      // Attempt to clean up any existing charts first
      function cleanupExistingCharts() {
        const chartIds = [
          'tco-comparison-chart',
          'cumulative-cost-chart',
          'current-breakdown-chart',
          'alternative-breakdown-chart',
          'feature-comparison-chart',
          'implementation-comparison-chart',
          'roi-chart',
          'sensitivity-chart',
          'savings-impact-chart',
          'industry-comparison-chart',
          'compliance-framework-chart'
        ];
        
        chartIds.forEach(id => {
          if (initializedCharts.has(id)) {
            console.log(`Chart ${id} already initialized, skipping`);
            return;
          }
          
          const canvas = document.getElementById(id);
          if (!canvas) return;
          
          // Check if there's a Chart.js instance associated with this canvas
          const chartInstance = canvas._chartjs ? canvas._chartjs.chart : null;
          
          // If chart exists, destroy it before reinitializing
          if (chartInstance) {
            console.log(`Destroying existing chart: ${id}`);
            chartInstance.destroy();
          }
        });
      }
      
      // Clean up first
      cleanupExistingCharts();
      
      // Initialize charts using available builder
      if (window.chartBuilder && typeof window.chartBuilder.initCharts === 'function') {
        console.log('Using enhanced chart builder to initialize charts');
        window.chartBuilder.initCharts();
        
        // If enhanced builder has extended charts, initialize those too
        if (typeof window.chartBuilder.initExtendedCharts === 'function') {
          window.chartBuilder.initExtendedCharts();
        }
      } else if (window.simpleChartBuilder && typeof window.simpleChartBuilder.initCharts === 'function') {
        console.log('Using simple chart builder to initialize charts');
        window.simpleChartBuilder.initCharts();
      }
      
      // Mark all charts as initialized
      document.querySelectorAll('canvas[id$="-chart"]').forEach(canvas => {
        initializedCharts.add(canvas.id);
      });
      
      console.log('Unified chart initialization complete');
    };
    
    // Run the initialization after a short delay
    setTimeout(window.initializeAllCharts, 500);
  });
})();
EOL

# 3. Create logo and resources fallback script
echo "Creating resources fallback script..."
cat > js/fixes/resource-fallbacks.js << 'EOL'
/**
 * Resource Fallbacks - Handles missing resources gracefully
 */
(function() {
  console.log('Setting up resource fallbacks...');
  
  document.addEventListener('DOMContentLoaded', function() {
    // Create fallback vendor logos
    const vendorColors = {
      'cisco': '#049fd9',
      'aruba': '#ff7a00',
      'forescout': '#005da8',
      'fortinet': '#ee3124',
      'fortinac': '#ee3124',
      'portnox': '#2bd25b',
      'microsoft': '#00a4ef',
      'nps': '#00a4ef',
      'securew2': '#8bc53f'
    };
    
    // Find all images that are likely vendor logos
    const vendorImages = document.querySelectorAll('img[src*="logo"], img[alt*="logo"]');
    vendorImages.forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      
      // Find which vendor this logo is for
      let vendor = '';
      Object.keys(vendorColors).forEach(v => {
        if (src && src.toLowerCase().includes(v) || alt.toLowerCase().includes(v)) {
          vendor = v;
        }
      });
      
      if (vendor && vendorColors[vendor]) {
        // Set up error handler to create text-based fallback
        img.onerror = function() {
          console.log(`Creating fallback for ${vendor} logo`);
          // Create a canvas element as a fallback
          const canvas = document.createElement('canvas');
          canvas.width = 150;
          canvas.height = 50;
          
          // Draw vendor name on canvas
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = vendorColors[vendor];
          ctx.font = 'bold 20px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(vendor.toUpperCase(), 75, 25);
          
          // Replace the img src with the canvas data
          img.src = canvas.toDataURL();
        };
        
        // Force error handler to run if already failed
        if (img.complete && img.naturalWidth === 0) {
          img.onerror();
        }
      }
    });
    
    // Handle missing font files
    const createFontFallback = () => {
      // Inject a fallback font-face declaration
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'FontAwesome';
          src: local('Arial');
          font-weight: normal;
          font-style: normal;
        }
        
        [class^="fa-"], [class*=" fa-"] {
          font-family: 'FontAwesome', Arial, sans-serif;
        }
        
        .fa-calculator:before { content: "📊"; }
        .fa-building:before { content: "🏢"; }
        .fa-magic:before { content: "✨"; }
        .fa-chart-line:before { content: "📈"; }
        .fa-check:before { content: "✓"; }
        .fa-check-circle:before { content: "✓"; }
        .fa-shield:before { content: "🛡️"; }
        .fa-dollar-sign:before { content: "$"; }
        .fa-exchange-alt:before { content: "⇄"; }
      `;
      document.head.appendChild(style);
    };
    
    // Apply font fallback after a short delay
    setTimeout(createFontFallback, 1000);
    
    console.log('Resource fallbacks established');
  });
})();
EOL

# 4. Create script load coordinator
echo "Creating script load coordinator..."
cat > js/fixes/script-coordinator.js << 'EOL'
/**
 * Script Load Coordinator - Prevents duplicate script loading
 */
(function() {
  console.log('Initializing script load coordinator...');
  
  // Track loaded scripts
  const loadedScripts = new Set();
  
  // Override the original loadScript function if it exists
  if (window.appIntegrator && window.appIntegrator.loadScript) {
    const originalLoadScript = window.appIntegrator.loadScript;
    
    window.appIntegrator.loadScript = function(src, callback) {
      // Check if script is already loaded
      if (loadedScripts.has(src)) {
        console.log(`Script already loaded: ${src}, skipping`);
        if (callback) callback();
        return;
      }
      
      // Mark as loaded
      loadedScripts.add(src);
      
      // Call original function
      originalLoadScript(src, callback);
    };
  }
  
  // Create global script loader
  window.loadScriptOnce = function(src, callback) {
    // Check if script is already loaded
    if (loadedScripts.has(src)) {
      console.log(`Script already loaded: ${src}, skipping`);
      if (callback) callback();
      return;
    }
    
    // Check if script is already in DOM
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      console.log(`Script already in DOM: ${src}, marking as loaded`);
      loadedScripts.add(src);
      if (callback) callback();
      return;
    }
    
    // Mark as loaded
    loadedScripts.add(src);
    
    // Create script element
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    // Set callback
    if (callback) {
      script.onload = callback;
    }
    
    // Add to document
    document.body.appendChild(script);
    console.log(`Loaded script: ${src}`);
  };
  
  console.log('Script load coordinator initialized');
})();
EOL

# 5. Create master initialization script that ties everything together
echo "Creating master initialization script..."
cat > js/fixes/master-init.js << 'EOL'
/**
 * Master Initialization Script
 * Coordinates all fixes and ensures proper initialization sequence
 */
(function() {
  console.log('Starting master initialization...');
  
  // Initialization sequence
  const initSequence = [
    'js/fixes/script-coordinator.js',
    'js/fixes/dom-hierarchy-fix.js',
    'js/fixes/resource-fallbacks.js',
    'js/fixes/chart-init-fix.js'
  ];
  
  // Load scripts in sequence
  function loadNextScript(index) {
    if (index >= initSequence.length) {
      console.log('All fix scripts loaded, running final initialization');
      finalizeInitialization();
      return;
    }
    
    const script = document.createElement('script');
    script.src = initSequence[index];
    script.onload = function() {
      console.log(`Loaded fix script: ${initSequence[index]}`);
      loadNextScript(index + 1);
    };
    script.onerror = function() {
      console.error(`Failed to load fix script: ${initSequence[index]}`);
      loadNextScript(index + 1);
    };
    
    document.body.appendChild(script);
  }
  
  // Final initialization steps
  function finalizeInitialization() {
    console.log('Performing final initialization steps');
    
    // Wait for all components to be available
    setTimeout(function() {
      // Initialize charts once
      if (window.initializeAllCharts) {
        window.initializeAllCharts();
      }
      
      // Fix any remaining UI issues
      cleanupUI();
      
      console.log('Master initialization complete');
    }, 1000);
  }
  
  // UI cleanup function
  function cleanupUI() {
    // Remove duplicate elements
    const ids = new Set();
    document.querySelectorAll('[id]').forEach(el => {
      const id = el.id;
      if (ids.has(id)) {
        console.log(`Removing duplicate element with id: ${id}`);
        el.parentNode.removeChild(el);
      } else {
        ids.add(id);
      }
    });
    
    // Remove empty containers
    document.querySelectorAll('.chart-container, .result-card').forEach(container => {
      if (container.children.length === 0) {
        console.log('Removing empty container');
        container.parentNode.removeChild(container);
      }
    });
    
    // Force layout updates
    document.body.style.display = 'none';
    setTimeout(() => {
      document.body.style.display = '';
    }, 50);
  }
  
  // Start loading scripts
  loadNextScript(0);
})();
EOL

# Update index.html to include the master initialization script
if [ -f index.html ]; then
  echo "Updating index.html to include fix scripts..."
  
  # Find the closing body tag
  if grep -q "</body>" index.html; then
    # Add the master initialization script before the closing body tag
    sed -i 's/<\/body>/<script src="js\/fixes\/master-init.js"><\/script>\n<\/body>/g' index.html
  else
    echo "Warning: Could not find closing body tag in index.html"
  fi
else
  echo "Warning: index.html not found"
fi

# Create directory for fixes
mkdir -p js/fixes

# Create img/logos directory with fallback vendor logos
echo "Creating fallback vendor logos..."
mkdir -p img/logos

# Create a simple CSS file to improve chart visualization
echo "Creating enhanced chart styles..."
cat > css/chart-fixes.css << 'EOL'
/* Chart visibility fixes */
.chart-container {
  position: relative;
  min-height: 300px;
  margin-bottom: 1.5rem;
}

canvas {
  max-width: 100%;
}

/* Prevent overflow issues */
.tab-content {
  overflow: hidden;
}

/* Fix for wizard steps */
.wizard-step {
  display: none;
}
.wizard-step.active {
  display: block;
}

/* Fix for vendor cards */
.vendor-card {
  margin-bottom: 1rem;
}

/* Ensure proper z-index stacking */
.tab-navigation {
  position: relative;
  z-index: 10;
}

/* Make sure charts are visible */
canvas[id$="-chart"] {
  border: 1px solid #eee;
  background-color: white;
}
EOL

# Add the CSS to index.html
if [ -f index.html ]; then
  echo "Adding chart fix styles to index.html..."
  
  # Find the first link tag
  if grep -q "<link" index.html; then
    # Add the CSS link after the first link tag
    sed -i '/<link/a \    <link rel="stylesheet" href="css/chart-fixes.css">' index.html
  else
    echo "Warning: Could not find link tag in index.html"
  fi
fi

echo "===== NAC Architecture Designer Pro - Emergency Fix Complete ====="
echo "Added the following fixes:"
echo "1. DOM hierarchy fix to resolve circular references"
echo "2. Chart initialization reconciliation"
echo "3. Resource fallbacks for missing logos and fonts"
echo "4. Script loading coordinator to prevent duplicate loading"
echo "5. Master initialization script to tie everything together"
echo ""
echo "To test the fixes, open index.html in your browser."
