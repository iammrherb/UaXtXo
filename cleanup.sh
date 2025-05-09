#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting directory structure reorganization...${NC}"

# Create new directory structure
mkdir -p css/core css/features css/themes js/core js/components js/managers js/data js/reports img/vendors data/templates

# CSS Reorganization
echo -e "${GREEN}Reorganizing CSS files...${NC}"

# Create core CSS files (checking if files exist first)
if [ -f css/styles.css ]; then
    cat css/styles.css | grep -E ":root|body|html|\*|\.app-container|\@media" > css/core/base.css
    cat css/styles.css | grep -E "\.app-header|\.app-footer|\.calculator-container|\.sidebar|\.results-container" > css/core/layout.css
    cat css/styles.css | grep -E "\.btn|\.tab-|\.input-|\.card|\.vendor-|\.modal|\.notification|\.table|\.chart" > css/core/components.css
    cat css/styles.css | grep -E "\.hidden|\.sr-only|\.text-|\.bg-|\.border-|\.shadow-|\.flex-|\.d-" > css/core/utilities.css
    
    # Create feature-specific CSS
    cat css/styles.css | grep -E "\.calculator-|\.vendor-|\.organization-|\.portnox-spotlight" > css/features/calculator.css
else
    echo -e "${RED}Warning: css/styles.css not found. Skipping core CSS extraction.${NC}"
fi

# Handle sensitivity.css files (with error checking)
if [ -f css/sensitivity.css ]; then
    cp css/sensitivity.css css/features/sensitivity.css
    echo -e "${GREEN}Copied css/sensitivity.css to css/features/sensitivity.css${NC}"
else
    echo -e "${RED}Warning: css/sensitivity.css not found.${NC}"
    # Create empty file to prevent future errors
    touch css/features/sensitivity.css
fi

# Handle enhanced directory
if [ -d css/enhanced ]; then
    if [ -f css/enhanced/sensitivity.css ]; then
        cat css/enhanced/sensitivity.css >> css/features/sensitivity.css
        echo -e "${GREEN}Appended css/enhanced/sensitivity.css to css/features/sensitivity.css${NC}"
    fi
    
    if [ -f css/enhanced/branding.css ]; then
        cp css/enhanced/branding.css css/themes/portnox.css
        echo -e "${GREEN}Copied css/enhanced/branding.css to css/themes/portnox.css${NC}"
    else
        echo -e "${RED}Warning: css/enhanced/branding.css not found.${NC}"
        # Create basic branding file
        echo "/* Portnox branding theme */
:root {
    --primary-color: #05547C;
    --primary-dark: #033E5B;
    --primary-light: #1B8DC0;
    --accent-color: #65BD44;
    --accent-dark: #4D9132;
    --accent-light: #8ED070;
}" > css/themes/portnox.css
    fi
    
    if [ -f css/enhanced/visuals.css ]; then
        cat css/enhanced/visuals.css >> css/core/components.css
        echo -e "${GREEN}Appended css/enhanced/visuals.css to css/core/components.css${NC}"
    fi
else
    echo -e "${RED}Warning: css/enhanced directory not found.${NC}"
fi

# Handle comparison-enhancements.css
if [ -f css/comparison-enhancements.css ]; then
    cp css/comparison-enhancements.css css/features/comparison.css
else
    echo -e "${RED}Warning: css/comparison-enhancements.css not found.${NC}"
    # Create empty file to prevent future errors
    touch css/features/comparison.css
fi

# Handle logo-fixes.css
if [ -f css/logo-fixes.css ]; then
    cat css/logo-fixes.css >> css/themes/portnox.css
    echo -e "${GREEN}Appended css/logo-fixes.css to css/themes/portnox.css${NC}"
fi

# Create main CSS import file
echo "/* Main CSS file - imports all other CSS */
@import 'core/base.css';
@import 'core/layout.css';
@import 'core/components.css';
@import 'core/utilities.css';
@import 'features/calculator.css';
@import 'features/sensitivity.css';
@import 'features/comparison.css';
@import 'themes/portnox.css';" > css/main.css

# JS Reorganization
echo -e "${GREEN}Reorganizing JavaScript files...${NC}"

# Core functionality (with error checking)
if [ -f js/utils/helpers.js ]; then
    cp js/utils/helpers.js js/core/helpers.js
    echo -e "${GREEN}Copied js/utils/helpers.js to js/core/helpers.js${NC}"
else
    echo -e "${RED}Warning: js/utils/helpers.js not found.${NC}"
    # Create basic helpers file
    echo "// Helper functions
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatPercent = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(value / 100);
};" > js/core/helpers.js
fi

if [ -f js/managers/dom-cache.js ]; then
    cp js/managers/dom-cache.js js/core/dom.js
    echo -e "${GREEN}Copied js/managers/dom-cache.js to js/core/dom.js${NC}"
else
    echo -e "${RED}Warning: js/managers/dom-cache.js not found.${NC}"
    # Create basic DOM utility file
    echo "// DOM utilities
const DOMCache = {
    getElement: (id) => document.getElementById(id),
    getElements: (selector) => document.querySelectorAll(selector),
    createElement: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        
        if (content) {
            element.textContent = content;
        }
        
        return element;
    }
};" > js/core/dom.js
fi

if [ -f js/managers/validation-manager.js ]; then
    cp js/managers/validation-manager.js js/core/validation.js
    echo -e "${GREEN}Copied js/managers/validation-manager.js to js/core/validation.js${NC}"
else
    echo -e "${RED}Warning: js/managers/validation-manager.js not found.${NC}"
    # Create basic validation file
    echo "// Form validation
const ValidationManager = {
    validateForm: (formData) => {
        const errors = {};
        
        // Add validation rules here
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};" > js/core/validation.js
fi

# Components (avoiding copying a file onto itself)
if [ -f js/components/calculator.js ]; then
    echo -e "${GREEN}js/components/calculator.js already exists in target location${NC}"
else
    # Check if it exists in source location
    if [ -f js/calculator.js ]; then
        cp js/calculator.js js/components/calculator.js
        echo -e "${GREEN}Copied js/calculator.js to js/components/calculator.js${NC}"
    else
        echo -e "${RED}Warning: calculator.js not found.${NC}"
        # Create basic calculator file
        echo "// Calculator component
class Calculator {
    constructor() {
        this.inputs = {};
    }
    
    initialize() {
        // Initialization code
    }
    
    calculate() {
        // Calculation logic
    }
};" > js/components/calculator.js
    fi
fi

if [ -f js/charts/chart-builder.js ]; then
    cp js/charts/chart-builder.js js/components/charts.js
    echo -e "${GREEN}Copied js/charts/chart-builder.js to js/components/charts.js${NC}"
else
    echo -e "${RED}Warning: js/charts/chart-builder.js not found.${NC}"
    # Create basic charts file
    echo "// Charts component
const ChartBuilder = {
    initializeCharts: () => {
        // Chart initialization
    },
    
    createChart: (canvasId, type, data, options) => {
        // Chart creation logic
    }
};" > js/components/charts.js
fi

if [ -f js/components/enhanced-sensitivity.js ]; then
    cp js/components/enhanced-sensitivity.js js/components/sensitivity.js
    echo -e "${GREEN}Copied js/components/enhanced-sensitivity.js to js/components/sensitivity.js${NC}"
elif [ -f js/components/sensitivity.js ]; then
    echo -e "${GREEN}js/components/sensitivity.js already exists in target location${NC}"
else
    echo -e "${RED}Warning: sensitivity component not found.${NC}"
    # Create basic sensitivity file
    echo "// Sensitivity analysis component
class SensitivityAnalyzer {
    constructor() {
        this.params = {};
    }
    
    analyze() {
        // Sensitivity analysis logic
    }
};" > js/components/sensitivity.js
fi

if [ -f js/components/ui-controller.js ]; then
    cp js/components/ui-controller.js js/components/ui.js
    echo -e "${GREEN}Copied js/components/ui-controller.js to js/components/ui.js${NC}"
else
    echo -e "${RED}Warning: js/components/ui-controller.js not found.${NC}"
    # Create basic UI file
    echo "// UI controller
class UIController {
    constructor() {
        // UI state
    }
    
    initialize() {
        // UI initialization
    }
    
    updateUI() {
        // UI update logic
    }
};" > js/components/ui.js
fi

# Apply fixes to the copied files
if [ -f js/fixes/chart-fix.js ]; then
    echo -e "${BLUE}Applying chart fixes...${NC}"
    cat js/fixes/chart-fix.js >> js/components/charts.js
fi

if [ -f js/fixes/ui-controller-fix.js ]; then
    echo -e "${BLUE}Applying UI controller fixes...${NC}"
    cat js/fixes/ui-controller-fix.js >> js/components/ui.js
fi

# Managers
if [ -f js/managers/loading-manager.js ]; then
    cp js/managers/loading-manager.js js/managers/loading.js
    echo -e "${GREEN}Copied js/managers/loading-manager.js to js/managers/loading.js${NC}"
else
    echo -e "${RED}Warning: js/managers/loading-manager.js not found.${NC}"
    # Create basic loading manager file
    echo "// Loading state manager
const LoadingManager = {
    showLoading: (containerId) => {
        // Show loading UI
    },
    
    hideLoading: (containerId) => {
        // Hide loading UI
    }
};" > js/managers/loading.js
fi

if [ -f js/managers/notification-manager.js ]; then
    cp js/managers/notification-manager.js js/managers/notification.js
    echo -e "${GREEN}Copied js/managers/notification-manager.js to js/managers/notification.js${NC}"
else
    echo -e "${RED}Warning: js/managers/notification-manager.js not found.${NC}"
    # Create basic notification manager file
    echo "// Notification manager
const NotificationManager = {
    showNotification: (message, type = 'info') => {
        // Show notification UI
    }
};" > js/managers/notification.js
fi

if [ -f js/managers/tab-manager.js ]; then
    cp js/managers/tab-manager.js js/managers/tab.js
    echo -e "${GREEN}Copied js/managers/tab-manager.js to js/managers/tab.js${NC}"
else
    echo -e "${RED}Warning: js/managers/tab-manager.js not found.${NC}"
    # Create basic tab manager file
    echo "// Tab manager
const TabManager = {
    switchTab: (tabId) => {
        // Tab switching logic
    }
};" > js/managers/tab.js
fi

# Data
if [ -f js/vendors/vendor-data.js ]; then
    cp js/vendors/vendor-data.js js/data/vendors.js
    echo -e "${GREEN}Copied js/vendors/vendor-data.js to js/data/vendors.js${NC}"
else
    echo -e "${RED}Warning: js/vendors/vendor-data.js not found.${NC}"
    # Create basic vendor data file
    echo "// Vendor data
const VendorData = {
    // Vendor information
};" > js/data/vendors.js
fi

if [ -f js/data/industry-templates.js ]; then
    cp js/data/industry-templates.js js/data/industry.js
    echo -e "${GREEN}Copied js/data/industry-templates.js to js/data/industry.js${NC}"
else
    echo -e "${RED}Warning: js/data/industry-templates.js not found.${NC}"
    # Create basic industry data file
    echo "// Industry data
const IndustryData = {
    // Industry information
};" > js/data/industry.js
fi

# Reports
if [ -f js/reports/pdf-generator.js ] && [ -f js/reports/enhanced-pdf-generator.js ]; then
    cat js/reports/pdf-generator.js js/reports/enhanced-pdf-generator.js > js/reports/generator.js
    echo -e "${GREEN}Combined pdf-generator.js and enhanced-pdf-generator.js into generator.js${NC}"
elif [ -f js/reports/pdf-generator.js ]; then
    cp js/reports/pdf-generator.js js/reports/generator.js
    echo -e "${GREEN}Copied js/reports/pdf-generator.js to js/reports/generator.js${NC}"
elif [ -f js/reports/enhanced-pdf-generator.js ]; then
    cp js/reports/enhanced-pdf-generator.js js/reports/generator.js
    echo -e "${GREEN}Copied js/reports/enhanced-pdf-generator.js to js/reports/generator.js${NC}"
else
    echo -e "${RED}Warning: PDF generator files not found.${NC}"
    # Create basic report generator file
    echo "// PDF report generator
const ReportGenerator = {
    generateReport: (data, options = {}) => {
        // Report generation logic
    }
};" > js/reports/generator.js
fi

# Update HTML files
echo -e "${GREEN}Updating HTML files...${NC}"

# Create temporary file with updated CSS imports
if [ -f index.html ]; then
    # Create backup
    cp index.html index.html.bak
    
    # Remove existing CSS imports
    grep -v '<link rel="stylesheet" href="css/' index.html > index.html.tmp
    
    # Add new CSS import
    sed -i '/<\/head>/i \  <link rel="stylesheet" href="css/main.css">' index.html.tmp
    
    # Clean up JavaScript imports - preserve external libs but remove local JS imports
    grep -v '<script src="js/' index.html.tmp > index.html.tmp2
    mv index.html.tmp2 index.html.tmp
    
    # Add back the essential JS imports in the correct order
    sed -i '/<\/body>/i \  <script src="js/core/helpers.js"></script>\n  <script src="js/core/dom.js"></script>\n  <script src="js/core/validation.js"></script>\n  <script src="js/managers/loading.js"></script>\n  <script src="js/managers/notification.js"></script>\n  <script src="js/managers/tab.js"></script>\n  <script src="js/data/vendors.js"></script>\n  <script src="js/data/industry.js"></script>\n  <script src="js/components/charts.js"></script>\n  <script src="js/components/calculator.js"></script>\n  <script src="js/components/ui.js"></script>\n  <script src="js/reports/generator.js"></script>\n  <script src="js/main.js"></script>' index.html.tmp
    
    # Replace original file with updated one
    mv index.html.tmp index.html
    echo -e "${GREEN}Updated index.html with new asset paths${NC}"
else
    echo -e "${RED}Warning: index.html not found.${NC}"
fi

# Do the same for sensitivity.html
if [ -f sensitivity.html ]; then
    # Create backup
    cp sensitivity.html sensitivity.html.bak
    
    # Process the file
    grep -v '<link rel="stylesheet" href="css/' sensitivity.html > sensitivity.html.tmp
    sed -i '/<\/head>/i \  <link rel="stylesheet" href="css/main.css">' sensitivity.html.tmp
    grep -v '<script src="js/' sensitivity.html.tmp > sensitivity.html.tmp2
    mv sensitivity.html.tmp2 sensitivity.html.tmp
    sed -i '/<\/body>/i \  <script src="js/core/helpers.js"></script>\n  <script src="js/core/dom.js"></script>\n  <script src="js/core/validation.js"></script>\n  <script src="js/managers/loading.js"></script>\n  <script src="js/managers/notification.js"></script>\n  <script src="js/managers/tab.js"></script>\n  <script src="js/data/vendors.js"></script>\n  <script src="js/components/charts.js"></script>\n  <script src="js/components/calculator.js"></script>\n  <script src="js/components/sensitivity.js"></script>\n  <script src="js/components/ui.js"></script>\n  <script src="js/sensitivity.js"></script>' sensitivity.html.tmp
    
    # Replace original with updated file
    mv sensitivity.html.tmp sensitivity.html
    echo -e "${GREEN}Updated sensitivity.html with new asset paths${NC}"
else
    echo -e "${RED}Warning: sensitivity.html not found.${NC}"
fi

# Create main.js if it doesn't exist
if [ ! -f js/main.js ]; then
    echo "// Main application entry point
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI components
  const ui = new UIController();
  ui.initialize();
  
  // Initialize calculator
  const calculator = new Calculator();
  calculator.initialize();
  
  // Initialize charts
  if (typeof ChartBuilder !== 'undefined') {
    ChartBuilder.initializeCharts();
  }
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Set up global event listeners
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      const calculator = new Calculator();
      calculator.calculate();
    });
  }
  
  // Setup vendor selection
  const vendorCards = document.querySelectorAll('.vendor-card');
  vendorCards.forEach(card => {
    card.addEventListener('click', function() {
      vendorCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
" > js/main.js
    echo -e "${GREEN}Created js/main.js${NC}"
fi

# Create sensitivity.js if it doesn't exist
if [ ! -f js/sensitivity.js ] && [ -f sensitivity.html ]; then
    echo "// Sensitivity analysis page script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize sensitivity analyzer
  const analyzer = new SensitivityAnalyzer();
  
  // Set up event listeners
  document.getElementById('sensitivity-btn').addEventListener('click', function() {
    analyzer.analyze();
  });
  
  // Return to calculator button
  document.getElementById('return-to-calculator').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
});
" > js/sensitivity.js
    echo -e "${GREEN}Created js/sensitivity.js${NC}"
fi

echo -e "${GREEN}Cleanup old directories (commented out for safety)${NC}"
# Commented out to prevent accidental deletion - uncomment when ready
# rm -rf js/utils js/charts js/fixes js/vendors

echo -e "${BLUE}Creating manifest of changes...${NC}"
echo "Directory structure reorganization complete. Changes made:" > reorganization_manifest.txt
echo "1. Consolidated CSS files into a structured directory" >> reorganization_manifest.txt
echo "2. Applied fixes directly to component files" >> reorganization_manifest.txt
echo "3. Organized JavaScript files by functionality" >> reorganization_manifest.txt
echo "4. Updated HTML files to use new structure" >> reorganization_manifest.txt
echo "5. Created main.css and main.js entry points" >> reorganization_manifest.txt
echo "6. Created basic files where originals were missing" >> reorganization_manifest.txt
echo "7. Created backups of original HTML files before modification" >> reorganization_manifest.txt

echo -e "${GREEN}Reorganization complete! See reorganization_manifest.txt for details.${NC}"
