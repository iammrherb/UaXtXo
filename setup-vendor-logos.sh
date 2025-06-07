#!/bin/bash
# Setup vendor logos directory and create placeholders

echo "Setting up vendor logos..."

# Create vendors directory
mkdir -p img/vendors

# Create placeholder SVGs for each vendor
vendors=(
    "portnox"
    "cisco"
    "aruba"
    "forescout"
    "extreme"
    "arista"
    "juniper"
    "fortinet"
    "microsoft"
    "packetfence"
    "pulse"
    "foxpass"
    "securew2"
    "radius-cloud"
)

for vendor in "${vendors[@]}"; do
    if [ ! -f "img/vendors/${vendor}-logo.svg" ]; then
        cat > "img/vendors/${vendor}-logo.svg" << EOF
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" fill="#0046ad" rx="4"/>
    <text x="60" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
        ${vendor^^}
    </text>
</svg>
EOF
        echo "✓ Created placeholder for ${vendor}-logo.svg"
    fi
done

echo "✅ Vendor logo setup complete!"
