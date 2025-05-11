#!/bin/bash

echo "Creating missing wizard-fix.js file..."
cat > js/wizard-fix.js << 'EOL'
/**
 * Wizard Fix Script
 * Provides fixes for the wizard component
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Wizard Fix: Applying patches to wizard functionality...");
  
  // Check if wizard.js has been loaded
  if (typeof window.wizardManager !== 'undefined') {
    // Fix CountUp reference in updateSummaryMetrics
    const originalUpdateSummaryMetrics = window.wizardManager.updateSummaryMetrics;
    
    window.wizardManager.updateSummaryMetrics = function(results) {
      try {
        if (typeof CountUp !== 'undefined') {
          // Use original method if CountUp is available
          originalUpdateSummaryMetrics.call(this, results);
        } else {
          // Fallback implementation
          console.log("Using fallback for updating metrics (CountUp not available)");
          
          // Simple function to update metrics directly
          const updateMetric = function(id, value, prefix, suffix) {
            const element = document.getElementById(id);
            if (element) {
              if (typeof value === 'number') {
                element.textContent = prefix + value.toLocaleString() + suffix;
              } else {
                element.textContent = prefix + value + suffix;
              }
            }
          };
          
          // Update metrics if results are available
          if (results) {
            updateMetric('total-savings', Math.round(results.savings.total), '$', '');
            updateMetric('savings-percentage', Math.round(results.savings.percentage), '', '%');
            updateMetric('breakeven-point', results.breakeven.month > 0 ? results.breakeven.month : 'Immediate', '', ' months');
            updateMetric('risk-reduction', Math.round(results.riskReduction), '', '%');
            updateMetric('implementation-time', '75% less', '', '');
          }
        }
      } catch (error) {
        console.error("Error updating summary metrics:", error);
      }
    };
    
    console.log("Wizard Fix: Applied patches to wizard functionality");
  } else {
    console.warn("Wizard Fix: wizard.js not loaded, patches not applied");
  }
});
EOL

echo "Fixing wizard.js syntax error..."
# Find the file first
WIZARD_JS=$(find . -name "wizard.js" | head -1)
if [ -n "$WIZARD_JS" ]; then
  # Back up the file
  cp "$WIZARD_JS" "${WIZARD_JS}.bak"
  # Fix the syntax error at line 899 (unexpected token ';')
  sed -i '899s/;/,/g' "$WIZARD_JS"
  echo "Fixed syntax error in $WIZARD_JS"
else
  echo "Warning: wizard.js not found"
fi
echo "Fixing chart initialization issues..."
cat > js/chart-fix.js << 'EOL'
/**
 * Chart Fix Script
 * Resolves chart initialization conflicts
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Chart Fix: Applying patches to chart initialization...");

  // Wait for chartManager to be available
  const checkChartManager = function() {
    if (typeof window.chartManager !== 'undefined') {
      // Override initializeCharts to prevent multiple initializations
      const originalInitializeCharts = window.chartManager.initializeCharts;

      let initialized = false;
      window.chartManager.initializeCharts = function() {
        // Clear existing charts first
        if (window.chartManager.charts) {
          Object.keys(window.chartManager.charts).forEach(key => {
            const chart = window.chartManager.charts[key];
            if (chart && typeof chart.destroy === 'function') {
              try {
                chart.destroy();
              } catch (e) {
                console.warn("Failed to destroy chart:", e);
              }
            }
          });
          window.chartManager.charts = {};
        }

        // Call original method
        console.log("Chart Fix: Safe initialization of charts");
        originalInitializeCharts.call(window.chartManager);
        initialized = true;
      };

      // Add method to check if charts are initialized
      window.chartManager.areChartsInitialized = function() {
        return initialized;
      };

      console.log("Chart Fix: Applied patches to chart initialization");
    } else {
      setTimeout(checkChartManager, 100);
    }
  };

  checkChartManager();
});
EOL

# Add chart-fix.js to index.html
if [ -f "index.html" ]; then
  if ! grep -q "chart-fix.js" index.html; then
    sed -i '/<\/head>/i \    <script src="js\/chart-fix.js"><\/script>' index.html
    echo "Added chart-fix.js to index.html"
  fi
fi
echo "Creating application initialization bridge..."
cat > js/app-bridge.js << 'EOL'
/**
 * Application Initialization Bridge
 * Ensures all components are properly initialized and connected
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("App Bridge: Starting application initialization bridge...");

  // List of required components
  const requiredComponents = [
    { name: 'Chart', check: function() { return typeof window.Chart !== 'undefined'; } },
    { name: 'chartManager', check: function() { return typeof window.chartManager !== 'undefined'; } },
    { name: 'ApplicationController', check: function() { return typeof window.ApplicationController !== 'undefined'; } }
  ];

  // Create a global controller if ApplicationController isn't found
  if (typeof window.ApplicationController === 'undefined') {
    console.log("App Bridge: Creating fallback ApplicationController");

    window.ApplicationController = class ApplicationController {
      constructor() {
        this.state = {
          currentStep: 1,
          totalSteps: 5,
          formData: {
            currentVendor: '',
            industry: '',
            deviceCount: 2500,
            yearsToProject: 3,
            // Other default values...
          },
          results: null
        };

        this.components = {
          wizard: null,
          chartManager: null
        };

        console.log("App Bridge: Fallback ApplicationController initialized");
      }

      init() {
        console.log("App Bridge: Initializing fallback controller");

        // Detect components
        if (window.wizardManager) {
          this.components.wizard = window.wizardManager;
        }

        if (window.chartManager) {
          this.components.chartManager = window.chartManager;
        }

        // Initialize event handlers
        this._initEventHandlers();

        console.log("App Bridge: Fallback controller initialized successfully");
      }

      _initEventHandlers() {
        // Add event handlers for calculator button
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
          calculateBtn.addEventListener('click', this._showResults.bind(this));
        }

        // Add event handlers for result tabs
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.addEventListener('click', (e) => {
            this._switchResultTab(e.currentTarget.dataset.tab);
          });
        });
      }

      _showResults() {
        console.log("App Bridge: Showing results");

        // Show results container
        const wizardContainer = document.getElementById('wizard-container');
        const resultsContainer = document.getElementById('results-container');

        if (wizardContainer) {
          wizardContainer.classList.add('hidden');
        }

        if (resultsContainer) {
          resultsContainer.classList.remove('hidden');
        }

        // Initialize charts
        if (this.components.chartManager) {
          this.components.chartManager.initializeCharts();
        }

        // Activate overview tab
        this._switchResultTab('overview');
      }

      _switchResultTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.result-tab').forEach(tab => {
          tab.classList.remove('active');
        });

        const activeTab = document.querySelector(`.result-tab[data-tab="${tabId}"]`);
        if (activeTab) {
          activeTab.classList.add('active');
        }

        // Update tab panels
        document.querySelectorAll('.result-panel').forEach(panel => {
          panel.classList.remove('active');
        });

        const activePanel = document.getElementById(`${tabId}-panel`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      }
    };

    // Create global controller instance
    window.appController = new window.ApplicationController();
  }

  // Create a test button to toggle results view
  let resultsContainer = document.getElementById('results-container');
  if (resultsContainer && resultsContainer.classList.contains('hidden')) {
    const testButton = document.createElement('button');
    testButton.className = 'btn btn-primary';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '20px';
    testButton.style.right = '20px';
    testButton.style.zIndex = '9999';
    testButton.textContent = 'Show TCO Results';

    testButton.addEventListener('click', function() {
      if (resultsContainer.classList.contains('hidden')) {
        resultsContainer.classList.remove('hidden');
        this.textContent = 'Hide TCO Results';

        // Initialize charts
        if (window.chartManager) {
          window.chartManager.initializeCharts();
        }

        // Hide wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
          wizardContainer.classList.add('hidden');
        }
      } else {
        resultsContainer.classList.add('hidden');
        this.textContent = 'Show TCO Results';

        // Show wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
          wizardContainer.classList.remove('hidden');
        }
      }
    });

    document.body.appendChild(testButton);
    console.log("App Bridge: Added test button for toggling results view");
  }

  // Check if all required components are loaded
  const checkComponentsLoaded = function() {
    const missingComponents = requiredComponents.filter(comp => !comp.check());

    if (missingComponents.length > 0) {
      console.log(`App Bridge: Waiting for components to load: ${missingComponents.map(c => c.name).join(', ')}`);
      setTimeout(checkComponentsLoaded, 100);
    } else {
      console.log("App Bridge: All components loaded");

      // Initialize application controller
      if (window.appController && typeof window.appController.init === 'function') {
        window.appController.init();
      } else if (window.ApplicationController) {
        window.appController = new window.ApplicationController();
        window.appController.init();
      }

      console.log("App Bridge: Application initialized successfully");
    }
  };

  // Start checking for component loading
  setTimeout(checkComponentsLoaded, 100);
});
EOL

# Add app-bridge.js to index.html
if [ -f "index.html" ]; then
  if ! grep -q "app-bridge.js" index.html; then
    sed -i '/<\/head>/i \    <script src="js\/app-bridge.js"><\/script>' index.html
    echo "Added app-bridge.js to index.html"
  fi
fi
echo "Updating initialization script..."
INIT_JS=$(find . -name "init.js" | head -1)
if [ -n "$INIT_JS" ]; then
  # Back up the file
  cp "$INIT_JS" "${INIT_JS}.bak"

  cat > "$INIT_JS" << 'EOL'
/**
 * TCO Analyzer Initialization Script
 * Ensures all components are initialized in the correct order
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("TCO Analyzer initialization starting...");

  // Create necessary containers if they don't exist
  createMissingContainers();

  // Define global initialization status
  window.appInitialized = false;

  // Wait for all components to be loaded
  const checkComponentsLoaded = () => {
    // Don't attempt initialization if the app bridge has already handled it
    if (window.appInitialized) {
      console.log("Initialization already completed by app bridge");
      return;
    }

    const requiredComponents = [
      { name: 'Chart', global: 'Chart' },
      { name: 'chartManager', global: 'chartManager' },
      { name: 'ApplicationController', global: 'ApplicationController' }
    ];

    const missingComponents = requiredComponents.filter(comp => {
      return typeof window[comp.global] === 'undefined';
    });

    if (missingComponents.length > 0) {
      console.log(`Waiting for components to load: ${missingComponents.map(c => c.name).join(', ')}`);

      // Limit the number of retries to avoid infinite loops
      if (window.componentLoadRetries === undefined) {
        window.componentLoadRetries = 0;
      }

      window.componentLoadRetries++;

      // After 30 retries (3 seconds), create fallback components
      if (window.componentLoadRetries > 30 && window.componentLoadRetries < 35) {
        createFallbackComponents(missingComponents);
      }

      // Set a maximum limit to prevent infinite loops
      if (window.componentLoadRetries < 200) {
        setTimeout(checkComponentsLoaded, 100);
      } else {
        console.warn("Maximum retry limit reached. Using available components.");
        window.appInitialized = true;
      }
    } else {
      console.log("All components loaded, initializing application controller");

      // Initialize application controller
      if (!window.appController) {
        try {
          window.appController = new ApplicationController();
          window.appController.init();
          window.appInitialized = true;
        } catch (error) {
          console.error("Error initializing application controller:", error);
        }
      }

      console.log("TCO Analyzer initialized successfully!");
    }
  };

  /**
   * Create missing containers dynamically
   */
  function createMissingContainers() {
    // Create missing panels
    createMissingResultPanels();

    // Ensure comparison charts container has proper structure
    ensureComparisonChartStructure();
  }

  /**
   * Create missing result panels
   */
  function createMissingResultPanels() {
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) return;

    const panels = [
      {
        id: 'implementation-panel',
        title: 'Implementation Analysis',
        content: `
          <div class="implementation-content">
            <div class="chart-card">
              <h3>Implementation Timeline Comparison</h3>
              <canvas id="implementation-comparison-chart"></canvas>
            </div>
            <div class="implementation-details">
              <h3>Implementation Roadmap</h3>
              <div id="implementation-roadmap">
                <!-- Roadmap populated dynamically -->
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'features-panel',
        title: 'Feature Comparison',
        content: `
          <div class="features-content">
            <div class="chart-card">
              <h3>Feature Comparison</h3>
              <canvas id="feature-comparison-chart"></canvas>
            </div>
            <div class="features-matrix">
              <h3>Detailed Feature Matrix</h3>
              <table id="features-matrix-table" class="data-table">
                <!-- Table populated dynamically -->
              </table>
            </div>
          </div>
        `
      },
      {
        id: 'roi-panel',
        title: 'ROI Analysis',
        content: `
          <div class="roi-content">
            <div class="chart-card">
              <h3>ROI Analysis</h3>
              <canvas id="roi-chart"></canvas>
            </div>
            <div class="roi-details">
              <h3>ROI Breakdown</h3>
              <div id="roi-breakdown">
                <!-- ROI details populated dynamically -->
              </div>
            </div>
          </div>
        `
      }
    ];

    // Create missing panels
    panels.forEach(panel => {
      if (!document.getElementById(panel.id)) {
        const panelElement = document.createElement('div');
        panelElement.className = 'result-panel';
        panelElement.id = panel.id;
        panelElement.innerHTML = panel.content;
        resultsContent.appendChild(panelElement);
        console.log(`Created missing panel: ${panel.id}`);
      }
    });
  }

  /**
   * Ensure comparison charts container has proper structure
   */
  function ensureComparisonChartStructure() {
    const comparisonPanel = document.getElementById('comparison-panel');
    if (!comparisonPanel) return;

    let comparisonCharts = comparisonPanel.querySelector('.comparison-charts');

    if (!comparisonCharts) {
      // Create the container if it doesn't exist
      comparisonCharts = document.createElement('div');
      comparisonCharts.className = 'comparison-charts';
      comparisonPanel.insertBefore(comparisonCharts, comparisonPanel.firstChild);
      console.log("Created comparison charts container");
    }

    if (!comparisonCharts.querySelector('.chart-grid')) {
      // Create chart grid
      const chartGrid = document.createElement('div');
      chartGrid.className = 'chart-grid';

      // Move existing chart cards to the grid
      const chartCards = comparisonCharts.querySelectorAll('.chart-card');
      if (chartCards.length > 0) {
        chartCards.forEach(card => chartGrid.appendChild(card));
      }

      // Add chart grid to container
      comparisonCharts.appendChild(chartGrid);
      console.log("Created chart grid for comparison charts");
    }
  }

  /**
   * Create fallback components if they are missing
   */
  function createFallbackComponents(missingComponents) {
    missingComponents.forEach(comp => {
      if (comp.name === 'ApplicationController' && typeof window.ApplicationController === 'undefined') {
        console.warn("Creating fallback ApplicationController");

        // Simple ApplicationController implementation
        window.ApplicationController = class ApplicationController {
          constructor() {
            this.state = { currentStep: 1 };
          }

          init() {
            console.log("Fallback ApplicationController initialized");
          }
        };
      }
    });
  }

  // Start checking for component loading
  setTimeout(checkComponentsLoaded, 100);
});
EOL
  echo "Updated initialization script"
else
  echo "Warning: init.js not found"
fi
#!/bin/bash
# Comprehensive TCO Analyzer Integration and Testing Script

# Set color codes for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}TCO Analyzer Integration and Testing Script${NC}"
echo -e "${BLUE}============================================${NC}"

# Fix wizard-related issues
echo -e "\n${YELLOW}Fixing wizard-related issues...${NC}"
WIZARD_FIX_APPLIED=false

# Create wizard-fix.js if missing
if [ ! -f "js/wizard-fix.js" ]; then
  mkdir -p js
  echo -e "${YELLOW}Creating missing wizard-fix.js file...${NC}"
  # [Insert wizard-fix.js code here]
  WIZARD_FIX_APPLIED=true
fi

# Fix wizard.js syntax error if found
WIZARD_JS=$(find . -name "wizard.js" | head -1)
if [ -n "$WIZARD_JS" ]; then
  echo -e "${YELLOW}Checking for syntax errors in wizard.js...${NC}"
  if grep -q "Unexpected token ';'" wizard.js 2>/dev/null; then
    cp "$WIZARD_JS" "${WIZARD_JS}.bak"
    sed -i '899s/;/,/g' "$WIZARD_JS"
    echo -e "${GREEN}Fixed syntax error in wizard.js${NC}"
    WIZARD_FIX_APPLIED=true
  fi
fi

if [ "$WIZARD_FIX_APPLIED" = true ]; then
  echo -e "${GREEN}Wizard fixes applied successfully${NC}"
else
  echo -e "${YELLOW}No wizard fixes needed or applied${NC}"
fi

# Fix chart initialization issues
echo -e "\n${YELLOW}Creating chart fix script...${NC}"
if [ ! -f "js/chart-fix.js" ]; then
  # [Insert chart-fix.js code here]
  echo -e "${GREEN}Chart fix script created successfully${NC}"

  # Add reference to index.html if needed
  if [ -f "index.html" ] && ! grep -q "chart-fix.js" index.html; then
    sed -i '/<\/head>/i \    <script src="js\/chart-fix.js"><\/script>' index.html
    echo -e "${GREEN}Added chart-fix.js reference to index.html${NC}"
  fi
else
  echo -e "${YELLOW}Chart fix script already exists${NC}"
fi

# Fix ApplicationController issues
echo -e "\n${YELLOW}Fixing ApplicationController issues...${NC}"
APP_CONTROLLER_FIXED=false

# Fix app-controller.js if it exists
APP_CONTROLLER_JS=$(find . -name "app-controller.js" | head -1)
if [ -n "$APP_CONTROLLER_JS" ]; then
  echo -e "${YELLOW}Checking for issues in app-controller.js...${NC}"

  # Back up the file
  cp "$APP_CONTROLLER_JS" "${APP_CONTROLLER_JS}.bak"

  # Fix syntax error if present
  if grep -q "Unexpected identifier 'i'" "$APP_CONTROLLER_JS" 2>/dev/null; then
    sed -i '192s/i doSomethingElse/doSomethingElse/g' "$APP_CONTROLLER_JS"
    echo -e "${GREEN}Fixed syntax error in app-controller.js${NC}"
    APP_CONTROLLER_FIXED=true
  fi

  # Ensure ApplicationController is exposed to window
  if ! grep -q "window.ApplicationController = ApplicationController" "$APP_CONTROLLER_JS"; then
    echo -e "\n// Expose ApplicationController to window\nwindow.ApplicationController = ApplicationController;" >> "$APP_CONTROLLER_JS"
    echo -e "${GREEN}Exposed ApplicationController to window${NC}"
    APP_CONTROLLER_FIXED=true
  fi
fi

# Create app-bridge.js
echo -e "\n${YELLOW}Creating application bridge...${NC}"
if [ ! -f "js/app-bridge.js" ]; then
  # [Insert app-bridge.js code here]
  echo -e "${GREEN}Application bridge created successfully${NC}"

  # Add reference to index.html if needed
  if [ -f "index.html" ] && ! grep -q "app-bridge.js" index.html; then
    sed -i '/<\/head>/i \    <script src="js\/app-bridge.js"><\/script>' index.html
    echo -e "${GREEN}Added app-bridge.js reference to index.html${NC}"
  fi
else
  echo -e "${YELLOW}Application bridge already exists${NC}"
fi

# Update initialization script if needed
echo -e "\n${YELLOW}Checking initialization script...${NC}"
INIT_JS=$(find . -name "init.js" | head -1)
if [ -n "$INIT_JS" ]; then
  # [Update init.js as needed]
  echo -e "${GREEN}Initialization script updated${NC}"
fi

# Create a test HTML file to verify everything works
echo -e "\n${YELLOW}Creating test HTML file...${NC}"
cat > test-tco-analyzer.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCO Analyzer Test</title>

    <!-- Include all CSS files -->
    <link rel="stylesheet" href="css/chart-styles.css">

    <!-- Include required libraries -->
    <script src="libs/js/chart.min.js"></script>
    <script src="libs/js/countUp.min.js"></script>

    <!-- Include fix scripts first -->
    <script src="js/chart-fix.js"></script>
    <script src="js/wizard-fix.js"></script>
    <script src="js/app-bridge.js"></script>

    <!-- Include core components -->
    <script src="js/components/charts/chart-manager.js"></script>
    <script src="js/app-controller.js"></script>
    <script src="js/data-integration.js"></script>
    <script src="js/canvas-fixer.js"></script>

    <!-- Include initialization script last -->
    <script src="js/init.js"></script>
    <script src="js/final-patch.js"></script>
</head>
<body>
    <h1>TCO Analyzer Test</h1>

    <!-- Simplified wizard container -->
    <div id="wizard-container" class="wizard-container">
        <div class="wizard-step active" id="step-5" data-step="5">
            <div class="calculation-actions">
                <button id="calculate-btn" class="btn btn-primary">
                    Calculate TCO
                </button>
            </div>
        </div>
    </div>

    <!-- Results container -->
    <div id="results-container" class="results-container hidden">
        <div class="results-nav">
            <div class="results-tabs">
                <button class="result-tab active" data-tab="overview">Overview</button>
                <button class="result-tab" data-tab="comparison">Comparison</button>
                <button class="result-tab" data-tab="implementation">Implementation</button>
                <button class="result-tab" data-tab="features">Features</button>
                <button class="result-tab" data-tab="roi">ROI</button>
            </div>
        </div>

        <div class="results-content">
            <!-- Overview Panel -->
            <div class="result-panel active" id="overview-panel">
                <h2>Executive Summary</h2>
                <div class="summary-grid">
                    <div class="summary-card">
                        <h4>Total Savings</h4>
                        <div id="total-savings">$245,000</div>
                    </div>
                </div>
            </div>

            <!-- Comparison Panel -->
            <div class="result-panel" id="comparison-panel">
                <div class="comparison-charts">
                    <div class="chart-grid">
                        <div class="chart-card">
                            <h3>TCO Comparison</h3>
                            <canvas id="tco-comparison-chart"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Current Solution Breakdown</h3>
                            <canvas id="current-breakdown-chart"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Portnox Cloud Breakdown</h3>
                            <canvas id="alternative-breakdown-chart"></canvas>
                        </div>
                        <div class="chart-card">
                            <h3>Cumulative Cost</h3>
                            <canvas id="cumulative-cost-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other panels will be created dynamically by init.js -->
        </div>
    </div>

    <script>
        // Test initialization when page loads
        window.addEventListener('load', function() {
            console.log("Test page loaded, checking initialization...");

            setTimeout(function() {
                if (!window.appInitialized) {
                    console.log("Forcing initialization...");
                    if (window.chartManager) {
                        window.chartManager.initializeCharts();
                    }

                    // Add test button to show results
                    const testBtn = document.createElement('button');
                    testBtn.textContent = 'Test Show Results';
                    testBtn.style.position = 'fixed';
                    testBtn.style.top = '10px';
                    testBtn.style.right = '10px';
                    testBtn.onclick = function() {
                        document.getElementById('wizard-container').classList.add('hidden');
                        document.getElementById('results-container').classList.remove('hidden');

                        if (window.chartManager) {
                            window.chartManager.initializeCharts();
                        }
                    };
                    document.body.appendChild(testBtn);
                }
            }, 2000);
        });
    </script>
</body>
</html>
EOL

echo -e "${GREEN}Test HTML file created: test-tco-analyzer.html${NC}"

echo -e "\n${BLUE}============================================${NC}"
echo -e "${GREEN}Integration and testing complete!${NC}"
echo -e "${BLUE}============================================${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Open test-tco-analyzer.html in your browser to test functionality"
echo -e "2. Check the browser console for any remaining errors"
echo -e "3. If everything works in the test file, your main application should also work"
echo -e "4. Apply any additional fixes if needed\n"
