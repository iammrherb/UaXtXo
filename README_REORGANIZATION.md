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
