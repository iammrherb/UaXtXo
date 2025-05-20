#!/bin/bash
# NAC Architecture Designer Pro - Fix Script
# This script addresses the issues identified in the debug logs

# Set the base directory
BASE_DIR="https://iammrherb.github.io/UaXtXo"
LOCAL_DIR="./nac-fix"

# Create necessary directories
mkdir -p "$LOCAL_DIR/js/fixes"
mkdir -p "$LOCAL_DIR/js/charts/enhanced"
mkdir -p "$LOCAL_DIR/js/components/enhanced"
mkdir -p "$LOCAL_DIR/js/compliance"
mkdir -p "$LOCAL_DIR/js/vendor-comparisons"
mkdir -p "$LOCAL_DIR/js/risk-analysis"
mkdir -p "$LOCAL_DIR/css/themes"

echo "=== NAC Architecture Designer Pro Fix Script ==="
echo "Starting repair process..."

# Function to download and fix a JavaScript file
fix_js_file() {
    local file_path=$1
    local fix_type=$2
    
    echo "Fixing file: $file_path"
    
    # Download the file
    wget -q "$BASE_DIR/$file_path" -O "$LOCAL_DIR/$file_path"
    
    # Apply fixes based on type
    case $fix_type in
        "module")
            # Convert to module pattern to prevent redeclaration
            sed -i '1s/^/var _tempModule = (function() {\n/' "$LOCAL_DIR/$file_path"
            echo "return window.$(basename "$file_path" .js);" >> "$LOCAL_DIR/$file_path"
            echo "})();" >> "$LOCAL_DIR/$file_path"
            ;;
        "syntax")
            # Fix syntax error on line 3801
            if [[ "$file_path" == *"modern-wizard.js" ]]; then
                sed -i '3801s/;/,/' "$LOCAL_DIR/$file_path"
            fi
            ;;
        "chart")
            # Fix Chart.js issues
            sed -i 's/Chart.instances.forEach/Array.from(Object.values(Chart.instances)).forEach/g' "$LOCAL_DIR/$file_path"
            ;;
        "null_check")
            # Add null checks to prevent 'Cannot read properties of null' errors
            sed -i 's/\(element\|container\|canvas\).getBoundingClientRect()/\1 \&\& \1.getBoundingClientRect() || {top:0,left:0,width:0,height:0}/g' "$LOCAL_DIR/$file_path"
            ;;
    esac
    
    echo "✓ Fixed $file_path"
}

# Create bridge module to handle compatibility
cat > "$LOCAL_DIR/js/fixes/nac-bridge.js" << 'EOF'
/**
 * NAC Architecture Designer - Bridge Module
 * This fixes key issues with initialization and prevents duplicate declarations
 */
(function() {
    // Store references to prevent circular references
    window._moduleRegistry = window._moduleRegistry || {};
    
    // Fix Chart.js
    if (window.Chart && window.Chart.instances && !window.Chart.instances.forEach) {
        window.Chart.instances.forEach = function(callback) {
            Array.from(Object.values(window.Chart.instances)).forEach(callback);
        };
        console.log("Added forEach method to Chart.instances");
    }
    
    // Safe module loader
    window.loadModule = function(name, initializer) {
        if (window._moduleRegistry[name]) {
            console.log("Module " + name + " already loaded, using existing instance");
            return window._moduleRegistry[name];
        }
        
        try {
            window._moduleRegistry[name] = typeof initializer === 'function' 
                ? initializer(window[name]) 
                : (window[name] || {});
            
            return window._moduleRegistry[name];
        } catch (error) {
            console.error("Error loading module " + name, error);
            return {};
        }
    };
    
    // Fix resource loading
    window.getResource = function(path) {
        const basePath = "https://iammrherb.github.io/UaXtXo/";
        const fallbackResources = {
            'fa-solid-900.woff2': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
            'fa-solid-900.ttf': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.ttf'
        };
        
        const resource = path.split('/').pop();
        return fallbackResources[resource] || (basePath + path);
    };
    
    // Fix circular DOM references
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(child) {
        if (this === child || child.contains(this)) {
            console.warn("Prevented circular DOM reference in appendChild");
            return child;
        }
        return originalAppendChild.call(this, child);
    };
    
    // Handle chart initialization safely
    window.safeInitChart = function(chartId, config) {
        try {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn("Canvas element not found:", chartId);
                return null;
            }
            
            // Destroy existing chart if any
            if (window.Chart.getChart(canvas)) {
                window.Chart.getChart(canvas).destroy();
                console.log("Destroyed Chart.js v3.x+ chart on canvas", chartId);
            }
            
            // Reset canvas dimensions
            const parent = canvas.parentElement;
            const width = parent ? parent.clientWidth : 300;
            const height = parent ? parent.clientHeight : 200;
            
            canvas.width = width;
            canvas.height = height;
            
            return new window.Chart(canvas, config);
        } catch (error) {
            console.error("Error initializing chart " + chartId, error);
            return null;
        }
    };
    
    console.log("NAC Bridge module loaded successfully");
})();
EOF

echo "Created bridge module"

# Download and fix problematic files
fix_js_file "js/components/enhanced/modern-wizard.js" "syntax"
fix_js_file "js/charts/enhanced/modern-charts.js" "chart"
fix_js_file "js/compliance/compliance-frameworks.js" "module"
fix_js_file "js/vendor-comparisons/vendor-advantages.js" "module"
fix_js_file "js/risk-analysis/risk-analysis.js" "module"
fix_js_file "js/main.js" "module"

# Create initialization script
cat > "$LOCAL_DIR/js/fixes/force-init.js" << 'EOF'
/**
 * NAC Architecture Designer - Force Initialization
 * This ensures all components are properly initialized
 */
(function() {
    console.log("Forcing initialization of all components");
    
    // Fix Chart.js issues
    console.log("Fixing Chart.js issues");
    const canvases = document.querySelectorAll('canvas');
    console.log("Found " + canvases.length + " canvases");
    
    canvases.forEach(function(canvas) {
        const id = canvas.id;
        console.log("Reset canvas " + id);
        
        // Reset dimensions
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
        
        // Destroy any existing chart
        if (window.Chart && window.Chart.getChart) {
            const chart = window.Chart.getChart(canvas);
            if (chart) {
                chart.destroy();
                console.log("Destroyed Chart.js v3.x+ chart on canvas " + id);
            }
        }
    });
    
    // Add forEach if missing
    if (window.Chart && window.Chart.instances && !window.Chart.instances.forEach) {
        window.Chart.instances.forEach = function(callback) {
            Array.from(Object.values(window.Chart.instances)).forEach(callback);
        };
        console.log("Added forEach method to Chart.instances");
    }
    
    console.log("Chart.js issues fixed");
    
    // Initialize charts
    console.log("Initializing charts");
    if (window.ChartBuilder && window.ChartBuilder.initCharts) {
        try {
            window.ChartBuilder.initCharts();
        } catch (error) {
            console.error("Error initializing charts", error);
        }
    }
    console.log("Chart initialization complete");
    
    // Set up event handlers
    console.log("Setting up event handlers");
    document.querySelectorAll('.vendor-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const vendor = this.dataset.vendor;
            if (window.NACDesignerApp && window.NACDesignerApp.selectVendor) {
                window.NACDesignerApp.selectVendor(vendor);
            }
        });
    });
    console.log("Event handlers set up");
    
    // Initialize UI
    console.log("Initializing UI");
    if (window.enhancedWizard && window.enhancedWizard.init) {
        try {
            window.enhancedWizard.init();
        } catch (error) {
            console.error("Error initializing enhanced wizard", error);
        }
    }
    console.log("UI initialization complete");
    
    console.log("Forced initialization complete");
})();
EOF

echo "Created force initialization script"

# Create the main loader script
cat > "$LOCAL_DIR/nac-fix-loader.js" << 'EOF'
/**
 * NAC Architecture Designer Pro - Fix Loader
 * This script loads and applies all fixes to resolve issues
 */
(function() {
    console.log("NAC Architecture Designer Pro - Fix Loader");
    
    // Helper function to load a script
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        
        script.onload = function() {
            console.log("Loaded script: " + url);
            if (callback) callback();
        };
        
        script.onerror = function() {
            console.error("Failed to load script: " + url);
        };
        
        document.head.appendChild(script);
    }
    
    // Load scripts in sequence
    function loadScriptsSequentially(scripts, index) {
        if (index >= scripts.length) {
            console.log("All fix scripts loaded!");
            return;
        }
        
        loadScript(scripts[index], function() {
            loadScriptsSequentially(scripts, index + 1);
        });
    }
    
    // Fix CSS resource paths
    function fixCssResourcePaths() {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.indexOf('http') !== 0) {
                link.setAttribute('href', 'https://iammrherb.github.io/UaXtXo/' + href);
            }
        });
    }
    
    // Apply DOM fixes
    function applyDomFixes() {
        // Remove duplicate elements
        const seen = {};
        document.querySelectorAll('[id]').forEach(function(element) {
            const id = element.id;
            if (seen[id]) {
                console.log("Removing duplicate element with id: " + id);
                element.parentNode.removeChild(element);
            } else {
                seen[id] = true;
            }
        });
    }
    
    // The fix process
    function applyFixes() {
        console.log("Applying NAC Designer Pro fixes");
        
        // Fix CSS first
        fixCssResourcePaths();
        
        // Load bridge module first
        loadScript('js/fixes/nac-bridge.js', function() {
            // Clean up DOM
            applyDomFixes();
            
            // Load other fixes in sequence
            const fixScripts = [
                'js/fixes/force-init.js'
            ];
            
            loadScriptsSequentially(fixScripts, 0);
        });
    }
    
    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFixes);
    } else {
        applyFixes();
    }
})();
EOF

echo "Created main loader script"

# Create deployment script
cat > "$LOCAL_DIR/deploy.sh" << 'EOF'
#!/bin/bash

echo "Deploying NAC fixes..."

# Copy to web directory (update this path to your actual web server directory)
WEB_DIR="/var/www/html/nac-fix"
mkdir -p $WEB_DIR
cp -r ./* $WEB_DIR/

echo "Adding fix script to the main page..."
# Update your main HTML file to include the fix script
# This command assumes your main HTML file is accessible and writable
if [ -f "/var/www/html/index.html" ]; then
    # Backup original
    cp /var/www/html/index.html /var/www/html/index.html.bak
    
    # Insert our fix script
    sed -i '/<\/head>/i <script src="nac-fix/nac-fix-loader.js"></script>' /var/www/html/index.html
    
    echo "Fix script added to index.html"
else
    echo "WARNING: Could not find main HTML file. You need to manually add:"
    echo "<script src=\"nac-fix/nac-fix-loader.js\"></script>"
    echo "Before the closing </head> tag in your HTML file."
fi

echo "Deployment complete!"
echo "To apply fixes, add the following script tag to your HTML file:"
echo "<script src=\"nac-fix/nac-fix-loader.js\"></script>"
EOF

chmod +x "$LOCAL_DIR/deploy.sh"

echo "Creating HTML file for quick testing..."
cat > "$LOCAL_DIR/test.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NAC Designer Pro - Fixed Version</title>
    
    <!-- Original scripts -->
    <script src="https://iammrherb.github.io/UaXtXo/js/libraries/chart.min.js"></script>
    <script src="https://iammrherb.github.io/UaXtXo/js/libraries/jquery.min.js"></script>
    
    <!-- Our fix loader - THIS IS THE KEY SCRIPT -->
    <script src="nac-fix-loader.js"></script>
</head>
<body>
    <div class="container">
        <h1>NAC Architecture Designer Pro - Fixed Version</h1>
        <p>This page includes the fix scripts to resolve the errors in the original application.</p>
        
        <div id="wizard-container">
            <div id="wizard-nav">
                <button id="wizard-prev">Previous</button>
                <button id="wizard-next">Next</button>
            </div>
            
            <div id="step-vendor-selection" class="wizard-step">
                <h2>Vendor Selection</h2>
                <div class="vendor-cards">
                    <div class="vendor-card" data-vendor="cisco">Cisco</div>
                    <div class="vendor-card" data-vendor="portnox">Portnox</div>
                </div>
            </div>
            
            <div id="charts-container">
                <div class="chart-wrapper">
                    <h3>TCO Comparison</h3>
                    <canvas id="tco-comparison-chart"></canvas>
                </div>
                <div class="chart-wrapper">
                    <h3>Cumulative Cost</h3>
                    <canvas id="cumulative-cost-chart"></canvas>
                </div>
                <div class="chart-wrapper">
                    <h3>Current Breakdown</h3>
                    <canvas id="current-breakdown-chart"></canvas>
                </div>
                <div class="chart-wrapper">
                    <h3>Alternative Breakdown</h3>
                    <canvas id="alternative-breakdown-chart"></canvas>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
EOF

echo "=== Fix package creation complete ==="
echo "Fix files created in $LOCAL_DIR directory"
echo "To deploy:"
echo "1. Run the deploy.sh script (you may need to modify it for your environment)"
echo "2. Or manually add the script tag to your HTML file:"
echo "   <script src=\"nac-fix/nac-fix-loader.js\"></script>"
echo "3. For a quick test, open test.html in a browser"
echo ""
echo "Fix process complete!"
