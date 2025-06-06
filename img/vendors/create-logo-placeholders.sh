#!/bin/bash
# Create placeholder images for vendor logos

vendors=("portnox" "cisco_ise" "aruba_clearpass" "microsoft" "juniper" "forescout" "arista" "securew2" "extreme" "foxpass" "fortinet" "radiusaas" "pulse" "packetfence")

for vendor in "${vendors[@]}"; do
    # Create a simple SVG placeholder
    cat > "${vendor}-logo.png.svg" << SVG
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="40" fill="#f0f0f0" rx="4"/>
  <text x="60" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="#666">${vendor}</text>
</svg>
SVG
done
