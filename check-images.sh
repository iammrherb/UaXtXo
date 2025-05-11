#!/bin/bash

echo "Checking vendor images..."
echo ""

# Check main img directory
echo "=== Files in img/ ==="
ls -la img/*.png img/*.jpg img/*.svg 2>/dev/null || echo "No images found"
echo ""

# Check vendors subdirectory
echo "=== Files in img/vendors/ ==="
ls -la img/vendors/ 2>/dev/null || echo "Directory not found"
echo ""

# List specific vendor images we're looking for
echo "=== Looking for specific vendor images ==="
vendors=("cisco" "aruba" "forescout" "portnox" "microsoft" "nps" "securew2" "fortinac" "fortinet" "no-nac")

for vendor in "${vendors[@]}"; do
    echo "Searching for $vendor images:"
    find img -name "*${vendor}*" -type f 2>/dev/null || echo "  Not found"
    echo ""
done
