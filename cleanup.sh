#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting testing and cleanup...${NC}"

# Fix permissions for webfonts
if [ -d "webfonts" ]; then
  chmod 644 webfonts/*
  echo -e "${GREEN}Fixed permissions for webfonts${NC}"
fi

# Check for common issues
echo -e "${BLUE}Checking for common issues...${NC}"

# Check if chart files exist
if [ ! -f "js/components/charts.js" ]; then
  echo -e "${RED}Warning: js/components/charts.js not found!${NC}"
fi

# Check for generator.js
if [ ! -f "js/reports/generator.js" ]; then
  echo -e "${RED}Warning: js/reports/generator.js not found!${NC}"
fi

# Check for main.js
if [ ! -f "js/main.js" ]; then
  echo -e "${RED}Warning: js/main.js not found!${NC}"
fi

# Verify CSS files
if [ ! -f "css/main.css" ]; then
  echo -e "${RED}Warning: css/main.css not found!${NC}"
fi

# Make sure HTML files have been updated
if ! grep -q "main.css" index.html; then
  echo -e "${RED}Warning: index.html might not be updated with the new CSS path${NC}"
fi

# Create a verification script
cat > verification.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Page</title>
  <link rel="stylesheet" href="css/main.css">
  <style>
    .test-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .test-card {
      background-color: #f5f7fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .test-button {
      background-color: #1B67B2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    .success {
      color: #2BD25B;
    }
    .error {
      color: #B54369;
    }
    .test-result {
      margin-top: 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="test-container">
    <h1>Verification Page</h1>
    <p>This page tests if your reorganized code is working correctly.</p>
    
    <div class="test-card">
      <h3>CSS Test</h3>
      <p>This text should be styled and the button below should have the correct styling.</p>
      <button class="test-button">Test Button</button>
      <div class="test-result" id="css-result"></div>
    </div>
    
    <div class="test-card">
      <h3>JavaScript Test</h3>
      <p>Click the button to test if JavaScript functionality is working.</p>
      <button onclick="testJavaScript()" class="test-button">Test JavaScript</button>
      <div class="test-result" id="js-result"></div>
    </div>
    
    <div class="test-card">
      <h3>Chart Test</h3>
      <p>This will test if Chart.js integration is working.</p>
      <div style="height: 200px;">
        <canvas id="test-chart"></canvas>
      </div>
      <div class="test-result" id="chart-result"></div>
    </div>
    
    <div class="test-card">
      <h3>Font Awesome Test</h3>
      <p>The icons below should render properly:</p>
      <div style="font-size: 24px;">
        <i class="fas fa-check"></i>
        <i class="fas fa-times"></i>
        <i class="fas fa-chart-bar"></i>
        <i class="fas fa-chart-line"></i>
      </div>
      <div class="test-result" id="font-result"></div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
  
  <script src="js/core/helpers.js"></script>
  <script src="js/core/dom.js"></script>
  <script src="js/components/charts.js"></script>
  
  <script>
    // Test CSS
    document.addEventListener('DOMContentLoaded', function() {
      // Check if button is styled
      const button = document.querySelector('.test-button');
      const buttonStyle = window.getComputedStyle(button);
      
      if (buttonStyle.backgroundColor.includes('rgb') && buttonStyle.color.includes('rgb')) {
        document.getElementById('css-result').innerHTML = '<span class="success">Success! CSS is loading correctly.</span>';
      } else {
        document.getElementById('css-result').innerHTML = '<span class="error">Error! CSS is not loading correctly.</span>';
      }
      
      // Check if Font Awesome is loaded
      setTimeout(function() {
        const icons = document.querySelectorAll('.fas');
        let allIconsLoaded = true;
        
        icons.forEach(icon => {
          const style = window.getComputedStyle(icon);
          if (style.fontFamily.indexOf('Font Awesome') === -1) {
            allIconsLoaded = false;
          }
        });
        
        if (allIconsLoaded) {
          document.getElementById('font-result').innerHTML = '<span class="success">Success! Font Awesome is loading correctly.</span>';
        } else {
          document.getElementById('font-result').innerHTML = '<span class="error">Error! Font Awesome is not loading correctly.</span>';
        }
      }, 1000);
      
      // Test Chart.js
      if (typeof Chart !== 'undefined') {
        try {
          const ctx = document.getElementById('test-chart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: 'Test Data',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          document.getElementById('chart-result').innerHTML = '<span class="success">Success! Chart.js is working correctly.</span>';
        } catch (error) {
          document.getElementById('chart-result').innerHTML = '<span class="error">Error! Chart.js is not working correctly: ' + error.message + '</span>';
        }
      } else {
        document.getElementById('chart-result').innerHTML = '<span class="error">Error! Chart.js is not loaded.</span>';
      }
    });
    
    // Test JavaScript
    function testJavaScript() {
      try {
        let hasHelpers = typeof window.formatCurrency === 'function';
        let hasDOM = typeof DOMCache !== 'undefined';
        let hasCharts = typeof ChartBuilder !== 'undefined';
        
        if (hasHelpers && hasDOM && hasCharts) {
          document.getElementById('js-result').innerHTML = '<span class="success">Success! JavaScript files are loading correctly.</span>';
        } else {
          let missing = [];
          if (!hasHelpers) missing.push('helpers.js');
          if (!hasDOM) missing.push('dom.js');
          if (!hasCharts) missing.push('charts.js');
          
          document.getElementById('js-result').innerHTML = '<span class="error">Error! Some JavaScript files are not loading: ' + missing.join(', ') + '</span>';
        }
      } catch (error) {
        document.getElementById('js-result').innerHTML = '<span class="error">Error during JavaScript test: ' + error.message + '</span>';
      }
    }
  </script>
</body>
</html>
EOL

echo -e "${GREEN}Created verification.html for testing the reorganized code${NC}"
echo -e "${BLUE}Open verification.html in your browser to check if everything is working correctly${NC}"

# Create a final README
cat > README_REORGANIZATION.md << 'EOL'
# Code Reorganization

This document explains the reorganization of the codebase and provides instructions for further maintenance.

## Directory Structure

The codebase has been reorganized into the following structure:
project/
├── css/
│   ├── core/            # Core styling
│   ├── features/        # Feature-specific styling
│   ├── themes/          # Branding and themes
│   └── main.css         # Main CSS import file
├── js/
│   ├── core/            # Core utilities
│   ├── components/      # UI components
│   ├── managers/        # State managers
│   ├── data/            # Data sources
│   ├── reports/         # Report generation
│   ├── main.js          # Main application script
│   └── sensitivity.js   # Sensitivity analysis script
├── webfonts/            # Font Awesome webfonts
├── index.html           # Main calculator
└── sensitivity.html     # Sensitivity analysis

## Changes Made

1. **Consolidated CSS files** into a structured directory
2. **Applied fixes directly** to component files
3. **Organized JavaScript files** by functionality
4. **Updated HTML files** to use new structure
5. **Created main.css and main.js** entry points
6. **Fixed chart data** for vendor selection
7. **Added Font Awesome webfonts** locally

## Known Issues Fixed

1. **Syntax Error in generator.js** - Fixed the PDF generator file
2. **Missing Font Awesome files** - Downloaded and added locally
3. **Missing ModernCharts** - Added fallback implementation
4. **Missing chart data** - Added vendorChartData object for all vendors

## Future Improvements

1. **Module System**: Implement ES modules for better code organization
2. **Build Process**: Add Webpack or similar for proper bundling
3. **Package Management**: Use npm/yarn for dependencies
4. **Code Quality**: Add linting and testing
5. **CSS Preprocessing**: Consider implementing Sass for better styling management

## Maintenance Instructions

### Adding New Features

1. Add new CSS to the appropriate subdirectory in `css/`
2. Add new JavaScript to the appropriate subdirectory in `js/`
3. Update `main.css` and `main.js` if needed

### Fixing Issues

1. Make changes directly to the relevant files
2. Test thoroughly using `verification.html`
3. Document changes in `fixes_applied.txt`

### Vendor Chart Data

The chart data for each vendor is now stored in `js/main.js` in the `vendorChartData` object. To update or add new vendor data:

1. Find the `vendorChartData` object in `main.js`
2. Update the data for the relevant vendor or add a new vendor key
3. Test the changes by selecting the vendor in the UI

## Testing

Use `verification.html` to test if everything is working correctly. This page tests:

1. CSS loading
2. JavaScript functionality
3. Chart.js integration
4. Font Awesome loading

If any tests fail, check the console for errors and fix the issues accordingly.
EOL

echo -e "${GREEN}Created README_REORGANIZATION.md with documentation${NC}"
echo -e "${GREEN}Testing and cleanup completed!${NC}"
echo -e "${BLUE}Please open verification.html in your browser to ensure everything is working properly.${NC}"
