#!/bin/bash

echo "Running UI Tests..."

# Check if index.html exists
if [ ! -f "index.html" ]; then
  echo "× index.html not found!"
  exit 1
fi

# Check if our CSS and JS files are included
if grep -q "logo-fixes.css" index.html && \
   grep -q "sidebar-fixes.css" index.html && \
   grep -q "sidebar-fixes.js" index.html && \
   grep -q "debug-utilities.js" index.html; then
  echo "✓ All fix files are included in index.html"
else
  echo "× Some fix files are not included in index.html"
  grep -n "fixes" index.html || echo "No fixes found in index.html"
fi

# Check for vendor logo files
VENDORS=("portnox" "cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")
MISSING_LOGOS=0

for VENDOR in "${VENDORS[@]}"; do
  if [ -f "img/vendors/${VENDOR}-logo.png" ]; then
    echo "✓ ${VENDOR} logo exists"
  else
    echo "× ${VENDOR} logo is missing"
    MISSING_LOGOS=$((MISSING_LOGOS+1))
  fi
done

if [ $MISSING_LOGOS -gt 0 ]; then
  echo "There are ${MISSING_LOGOS} missing logos. To fix this:"
  echo "1. Add the missing logos to the img/vendors directory"
  echo "2. Make sure they follow the naming pattern: vendor-logo.png"
  echo "3. Run the fix script again if needed"
else
  echo "✓ All vendor logos are present"
fi

echo "Tests completed!"
