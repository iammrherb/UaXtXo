#!/bin/bash

echo "Testing NAC Total Cost Analyzer fixes..."

# Check if all files were created
files_to_check=(
    "js/main-initializer.js"
    "js/vendor-image-fix.js"
    "css/enhanced-dashboard.css"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file created successfully"
    else
        echo "✗ $file not found"
    fi
done

# Check for syntax errors in JavaScript files
for js_file in js/*.js; do
    if node -c "$js_file" 2>/dev/null; then
        echo "✓ $js_file syntax is valid"
    else
        echo "✗ $js_file has syntax errors"
    fi
done

echo "Test complete!"
