#!/bin/bash

# NAC UI Enhancements Installation Script
# This script installs all enhancements to the Zero Trust NAC Architecture Designer UI

echo "Installing NAC UI Enhancements..."

# 1. Copy CSS files
echo "Installing CSS files..."
mkdir -p css/components/wizard
mkdir -p css/components/integrated
cp wizard-enhanced.css css/components/wizard/ 2>/dev/null || echo "  - wizard-enhanced.css already exists or could not be copied"
cp sensitivity-tab.css css/components/integrated/ 2>/dev/null || echo "  - sensitivity-tab.css already exists or could not be copied"
cp tco-consolidated.css css/ 2>/dev/null || echo "  - tco-consolidated.css already exists or could not be copied"

# 2. Copy JavaScript files
echo "Installing JavaScript files..."
mkdir -p js/wizards
mkdir -p js/features/sensitivity-analysis
cp tco-wizard.js js/wizards/ 2>/dev/null || echo "  - tco-wizard.js already exists or could not be copied"
cp integrated-sensitivity.js js/features/sensitivity-analysis/ 2>/dev/null || echo "  - integrated-sensitivity.js already exists or could not be copied"
cp setup-integrated-ui.js js/ 2>/dev/null || echo "  - setup-integrated-ui.js already exists or could not be copied"

# 3. Copy No-NAC icon
echo "Installing No-NAC icon..."
mkdir -p img/icons
cp no-nac-icon.svg img/icons/ 2>/dev/null || echo "  - no-nac-icon.svg already exists or could not be copied"

# 4. Update index.html if needed
if [ -f "index.html" ]; then
    echo "Checking index.html for required modifications..."
    
    # Check for CSS imports
    if ! grep -q "wizard-enhanced.css" index.html; then
        echo "  - Adding CSS imports to index.html"
        sed -i '/<link rel="stylesheet" href="css\/.*css">/a \
    <link rel="stylesheet" href="css/components/wizard/wizard-enhanced.css">\
    <link rel="stylesheet" href="css/components/integrated/sensitivity-tab.css">\
    <link rel="stylesheet" href="css/tco-consolidated.css">' index.html || echo "    - Failed to add CSS imports"
    else
        echo "  - CSS imports already exist"
    fi
    
    # Check for JS imports
    if ! grep -q "setup-integrated-ui.js" index.html; then
        echo "  - Adding JS imports to index.html"
        sed -i '/<script src="js\/main.js"><\/script>/i \
    <!-- Enhanced UI Components -->\
    <script src="js/wizards/tco-wizard.js"></script>\
    <script src="js/features/sensitivity-analysis/integrated-sensitivity.js"></script>\
    <script src="js/setup-integrated-ui.js"></script>' index.html || echo "    - Failed to add JS imports"
    else
        echo "  - JS imports already exist"
    fi
    
    # Check for sensitivity tab
    if ! grep -q "tab-sensitivity" index.html; then
        echo "  - Adding sensitivity tab"
        sed -i '/<div class="tabs".*>/a \
                    <button class="tab-button" id="tab-sensitivity" role="tab" aria-selected="false" aria-controls="sensitivity-tab" data-tab="sensitivity-tab" tabindex="-1">Sensitivity</button>' index.html || echo "    - Failed to add sensitivity tab"
    else
        echo "  - Sensitivity tab already exists"
    fi
else
    echo "index.html not found. Please add required imports manually."
fi

echo "Installation complete!"
echo "Please refresh your browser to see the changes."
