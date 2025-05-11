#!/bin/bash
echo "Running NAC Total Cost Analyzer fixes..."

# Make scripts executable
chmod +x *.sh

# Copy vendor logos if needed
echo "Copying vendor logos..."
cp img/*.png img/vendors/ 2>/dev/null || true

# Ensure directories exist
mkdir -p js/wizards
mkdir -p js/charts
mkdir -p js/core
mkdir -p css
mkdir -p fonts

echo "All fixes applied successfully!"
echo "Please refresh your browser to see the changes."
