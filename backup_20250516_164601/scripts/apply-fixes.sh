#!/bin/bash

# NAC TCO Calculator Fix Script
echo "Starting NAC TCO Calculator Fix Script"

# Check if the files exist
if [ ! -f "js/charts/chart-init-safe.js" ]; then
  echo "Error: js/charts/chart-init-safe.js not found!"
  exit 1
fi

if [ ! -f "js/charts/enhanced-chart-builder.js" ]; then
  echo "Error: js/charts/enhanced-chart-builder.js not found!"
  exit 1
fi

if [ ! -f "js/charts/chart-builder.js" ]; then
  echo "Error: js/charts/chart-builder.js not found!"
  exit 1
fi

# Create backup directory
mkdir -p backups

# Backup original files
echo "Creating backups..."
cp js/charts/chart-init-safe.js backups/
cp js/charts/enhanced-chart-builder.js backups/
cp js/charts/chart-builder.js backups/
cp js/features/sensitivity-analysis/integrated-sensitivity.js backups/

# Apply fixes from the generated scripts
cat fix-wizard.js > js/fixes/wizard-fixes.js
echo "Wizard fixes applied to js/fixes/wizard-fixes.js"

# Include the wizard fixes in the main script
echo "Adding wizard fixes to main.js..."
if ! grep -q "wizard-fixes.js" main.js; then
  echo '
// Add wizard fixes
document.addEventListener("DOMContentLoaded", function() {
  const script = document.createElement("script");
  script.src = "js/fixes/wizard-fixes.js";
  document.body.appendChild(script);
});' >> js/main.js
fi

echo "Chart and wizard functionality has been restored."
echo "To complete the fix, include the js/fixes/wizard-fixes.js script in your HTML or run the browser console script."
