#!/bin/bash

echo "🚀 Applying NAC Architecture Designer Pro Enhancements"
echo "======================================================"

# Check if the script is run with admin privileges
if [ "$EUID" -ne 0 ]; then
  echo "⚠️ Please run this script with sudo or as administrator"
  exit 1
fi

# Create backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backup_$TIMESTAMP"

echo "📦 Creating backup at $BACKUP_DIR"
mkdir -p $BACKUP_DIR
cp -r css js img index.html $BACKUP_DIR

# Create directories if they don't exist
echo "📂 Creating directory structure"
mkdir -p css/themes/enhanced
mkdir -p css/components/advanced
mkdir -p css/animations
mkdir -p css/visualizations
mkdir -p js/components/enhanced
mkdir -p js/charts/enhanced
mkdir -p js/visualizations
mkdir -p js/animations
mkdir -p js/vendor-comparisons
mkdir -p js/compliance
mkdir -p js/risk-analysis
mkdir -p img/wizard-icons
mkdir -p img/vendors
mkdir -p libs/js
mkdir -p libs/css

# Copy new CSS files
echo "🎨 Copying enhanced CSS files"
cp css/themes/enhanced/modern-theme.css css/themes/enhanced/
cp css/animations/modern-animations.css css/animations/
cp css/visualizations/advanced-charts.css css/visualizations/
cp css/components/advanced/vendor-comparison.css css/components/advanced/

# Copy new JS files
echo "🔧 Copying enhanced JavaScript files"
cp js/components/enhanced/modern-wizard.js js/components/enhanced/
cp js/components/dark-mode-toggle.js js/components/
cp js/charts/enhanced/modern-charts.js js/charts/enhanced/
cp js/vendor-comparisons/vendor-advantages.js js/vendor-comparisons/
cp js/compliance/compliance-frameworks.js js/compliance/
cp js/risk-analysis/risk-analysis.js js/risk-analysis/
cp js/main.js js/

# Copy wizard icons
echo "🧙 Copying wizard icons"
cp img/wizard-icons/vendor-selection.svg img/wizard-icons/
cp img/wizard-icons/compliance.svg img/wizard-icons/
cp img/wizard-icons/organization.svg img/wizard-icons/
cp img/wizard-icons/cost-config.svg img/wizard-icons/
cp img/wizard-icons/results.svg img/wizard-icons/

# Download required libraries
echo "📚 Downloading required libraries"

# JavaScript Libraries
JS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/recharts/2.5.0/Recharts.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
    "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.0/countUp.min.js"
)

for lib in "${JS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "libs/js/$filename"
done

# CSS Libraries
CSS_LIBS=(
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
)

for lib in "${CSS_LIBS[@]}"; do
    filename=$(basename $lib)
    echo "⬇️ Downloading $filename"
    curl -s -L $lib -o "libs/css/$filename"
done

# Download Icon Packs
echo "🎨 Downloading Icon Packs"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" -o "img/icons/fa-solid-900.woff2"
curl -s -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2" -o "img/icons/fa-brands-400.woff2"

# Update index.html to include new styles and scripts
echo "📝 Updating index.html"

# Create a temp file for the new index.html
tmp_file=$(mktemp)

# Add new CSS and JS references to index.html
cat index.html | sed '/<\/head>/i \
    <!-- Enhanced Styles -->\
    <link rel="stylesheet" href="libs/css/tailwind.min.css">\
    <link rel="stylesheet" href="libs/css/all.min.css">\
    <link rel="stylesheet" href="libs/css/animate.min.css">\
    <link rel="stylesheet" href="css/themes/enhanced/modern-theme.css">\
    <link rel="stylesheet" href="css/animations/modern-animations.css">\
    <link rel="stylesheet" href="css/visualizations/advanced-charts.css">\
    <link rel="stylesheet" href="css/components/advanced/vendor-comparison.css">\
' | sed '/<\/body>/i \
    <!-- Enhanced Scripts -->\
    <script src="libs/js/chart.min.js"></script>\
    <script src="libs/js/d3.min.js"></script>\
    <script src="libs/js/gsap.min.js"></script>\
    <script src="libs/js/countUp.min.js"></script>\
    <script src="js/charts/enhanced/modern-charts.js"></script>\
    <script src="js/components/enhanced/modern-wizard.js"></script>\
    <script src="js/components/dark-mode-toggle.js"></script>\
    <script src="js/vendor-comparisons/vendor-advantages.js"></script>\
    <script src="js/compliance/compliance-frameworks.js"></script>\
    <script src="js/risk-analysis/risk-analysis.js"></script>\
    <script src="js/main.js"></script>\
' > "$tmp_file"

# Replace the original index.html with the updated one
mv "$tmp_file" index.html

# Add dark mode toggle to the header
echo "🌙 Adding dark mode toggle to the header"
sed -i '/<header/,/<\/header>/s/<\/div>/<button id="dark-mode-toggle" class="dark-mode-toggle" title="Toggle Dark Mode"><i class="fas fa-moon"><\/i><\/button><\/div>/' index.html

# Fix any circular DOM references
echo "🔄 Fixing circular DOM references"
sed -i 's/element.appendChild(element)/console.warn("Prevented circular DOM reference")/' js/fixes/layout-fixes.js

# Set execute permissions on wizard icons
chmod 644 img/wizard-icons/*.svg

echo "✅ Enhancements applied successfully!"
echo "🌐 Open index.html in your browser to see the enhanced NAC Architecture Designer Pro"
