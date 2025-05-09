#!/bin/bash

echo "🧪 Running NAC Architecture Designer Pro Integration Tests"
echo "========================================================"

# Check if the enhanced files exist
echo "📂 Checking for enhanced files..."

# Required directories
REQUIRED_DIRS=(
    "css/themes/enhanced"
    "css/animations"
    "css/visualizations"
    "css/components/advanced"
    "js/components/enhanced"
    "js/charts/enhanced"
    "js/vendor-comparisons"
    "js/compliance"
    "js/risk-analysis"
    "img/wizard-icons"
    "libs/js"
    "libs/css"
)

# Required files
REQUIRED_FILES=(
    "css/themes/enhanced/modern-theme.css"
    "css/animations/modern-animations.css"
    "css/visualizations/advanced-charts.css"
    "css/components/advanced/vendor-comparison.css"
    "js/components/enhanced/modern-wizard.js"
    "js/components/dark-mode-toggle.js"
    "js/charts/enhanced/modern-charts.js"
    "js/vendor-comparisons/vendor-advantages.js"
    "js/compliance/compliance-frameworks.js"
    "js/risk-analysis/risk-analysis.js"
    "js/main.js"
    "img/wizard-icons/vendor-selection.svg"
    "img/wizard-icons/compliance.svg"
    "img/wizard-icons/organization.svg"
    "img/wizard-icons/cost-config.svg"
    "img/wizard-icons/results.svg"
)

# Check directories
MISSING_DIRS=0
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ Missing directory: $dir"
        MISSING_DIRS=$((MISSING_DIRS+1))
    fi
done

if [ "$MISSING_DIRS" -eq 0 ]; then
    echo "✅ All required directories exist"
else
    echo "❌ Missing $MISSING_DIRS required directories"
fi

# Check files
MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing file: $file"
        MISSING_FILES=$((MISSING_FILES+1))
    fi
done

if [ "$MISSING_FILES" -eq 0 ]; then
    echo "✅ All required files exist"
else
    echo "❌ Missing $MISSING_FILES required files"
fi

# Check index.html for the required scripts and styles
echo "🔍 Checking index.html for required scripts and styles..."

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found"
    SCRIPT_COUNT=0
    STYLE_COUNT=0
    DARK_MODE_TOGGLE=0
else
    # Count required scripts and styles in index.html
    SCRIPT_COUNT=$(grep -c "modern-charts.js\|modern-wizard.js\|dark-mode-toggle.js\|vendor-advantages.js\|compliance-frameworks.js\|risk-analysis.js" index.html 2>/dev/null || echo 0)
    STYLE_COUNT=$(grep -c "modern-theme.css\|modern-animations.css\|advanced-charts.css\|vendor-comparison.css" index.html 2>/dev/null || echo 0)
    DARK_MODE_TOGGLE=$(grep -c "dark-mode-toggle" index.html 2>/dev/null || echo 0)
fi

if [ "$SCRIPT_COUNT" -ge 6 ]; then
    echo "✅ All required scripts are included in index.html"
else
    echo "❌ Missing required scripts in index.html ($SCRIPT_COUNT of 6 found)"
fi

if [ "$STYLE_COUNT" -eq 4 ]; then
    echo "✅ All required styles are included in index.html"
else
    echo "❌ Missing required styles in index.html ($STYLE_COUNT of 4 found)"
fi

# Check for dark mode toggle
if [ "$DARK_MODE_TOGGLE" -gt 0 ]; then
    echo "✅ Dark mode toggle is included in index.html"
else
    echo "❌ Dark mode toggle is missing from index.html"
fi

# Javascript syntax check
echo "🔧 Checking JavaScript syntax..."

JS_FILES=(
    "js/components/enhanced/modern-wizard.js"
    "js/components/dark-mode-toggle.js"
    "js/charts/enhanced/modern-charts.js"
    "js/vendor-comparisons/vendor-advantages.js"
    "js/compliance/compliance-frameworks.js"
    "js/risk-analysis/risk-analysis.js"
    "js/main.js"
)

JS_ERRORS=0
for file in "${JS_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ JavaScript file not found: $file"
        JS_ERRORS=$((JS_ERRORS+1))
        continue
    fi
    
    if command -v node &> /dev/null; then
        node --check "$file" &> /dev/null
        if [ $? -ne 0 ]; then
            echo "❌ JavaScript syntax error in $file"
            JS_ERRORS=$((JS_ERRORS+1))
        fi
    else
        # Skip syntax check if node is not available
        echo "ℹ️ Skipping detailed JavaScript syntax check (node not available)"
        break
    fi
done

if [ "$JS_ERRORS" -eq 0 ]; then
    echo "✅ All JavaScript files passed syntax check"
else
    echo "❌ Found $JS_ERRORS JavaScript syntax errors"
fi

# CSS syntax check
echo "🎨 Checking CSS syntax..."

CSS_FILES=(
    "css/themes/enhanced/modern-theme.css"
    "css/animations/modern-animations.css"
    "css/visualizations/advanced-charts.css"
    "css/components/advanced/vendor-comparison.css"
)

CSS_ERRORS=0
for file in "${CSS_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ CSS file not found: $file"
        CSS_ERRORS=$((CSS_ERRORS+1))
        continue
    fi
    
    if command -v csslint &> /dev/null; then
        csslint "$file" &> /dev/null
        if [ $? -ne 0 ]; then
            echo "❌ CSS syntax error in $file"
            CSS_ERRORS=$((CSS_ERRORS+1))
        fi
    else
        # Skip detailed syntax check if csslint is not available
        echo "ℹ️ Skipping detailed CSS syntax check (csslint not available)"
        break
    fi
done

if [ "$CSS_ERRORS" -eq 0 ]; then
    echo "✅ All CSS files passed syntax check"
else
    echo "❌ Found $CSS_ERRORS CSS syntax errors"
fi

# Summary
echo "========================================================"
echo "🧪 Integration Test Summary:"
echo "Directories: $([ "$MISSING_DIRS" -eq 0 ] && echo "✅ All present" || echo "❌ $MISSING_DIRS missing")"
echo "Files: $([ "$MISSING_FILES" -eq 0 ] && echo "✅ All present" || echo "❌ $MISSING_FILES missing")"
echo "Scripts in index.html: $([ "$SCRIPT_COUNT" -ge 6 ] && echo "✅ All included" || echo "❌ Some missing")"
echo "Styles in index.html: $([ "$STYLE_COUNT" -eq 4 ] && echo "✅ All included" || echo "❌ Some missing")"
echo "Dark mode toggle: $([ "$DARK_MODE_TOGGLE" -gt 0 ] && echo "✅ Present" || echo "❌ Missing")"
echo "JavaScript syntax: $([ "$JS_ERRORS" -eq 0 ] && echo "✅ Valid" || echo "❌ $JS_ERRORS errors")"
echo "CSS syntax: $([ "$CSS_ERRORS" -eq 0 ] && echo "✅ Valid" || echo "❌ $CSS_ERRORS errors")"

# Final result
if [ "$MISSING_DIRS" -eq 0 ] && [ "$MISSING_FILES" -eq 0 ] && [ "$SCRIPT_COUNT" -ge 6 ] && [ "$STYLE_COUNT" -eq 4 ] && [ "$DARK_MODE_TOGGLE" -gt 0 ] && [ "$JS_ERRORS" -eq 0 ] && [ "$CSS_ERRORS" -eq 0 ]; then
    echo "✅ All integration tests passed!"
    exit 0
else
    echo "❌ Some integration tests failed. Please check the issues above."
    exit 1
fi
