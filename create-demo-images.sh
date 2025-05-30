#!/bin/bash
# Create placeholder vendor logos
mkdir -p img/vendors
for vendor in portnox cisco aruba forescout arista clearpass fortinet; do
    echo "Creating placeholder for $vendor"
    # Create a simple SVG placeholder
    cat > img/vendors/${vendor}-logo.png << EOF
<svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="40" fill="#334155" rx="4"/>
  <text x="50" y="25" text-anchor="middle" fill="#CBD5E1" font-family="Inter" font-size="14">${vendor}</text>
</svg>
EOF
done
