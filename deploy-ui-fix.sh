#!/bin/bash
# Deploy UI Layout Fix

echo "🎨 Deploying UI Layout Fix"
echo "========================="

# Backup existing files
if [ -f "index.html" ]; then
    cp index.html index-backup-$(date +%Y%m%d-%H%M%S).html
    echo "✓ Backed up existing index.html"
fi

# Copy new files
if [ -f "index-ui-fixed.html" ]; then
    cp index-ui-fixed.html index.html
    echo "✓ Updated index.html"
fi

# Create necessary directories
mkdir -p css js img/vendors

# Check for logo
if [ ! -f "img/vendors/portnox-logo.svg" ]; then
    echo "Creating Portnox logo placeholder..."
    cat > img/vendors/portnox-logo.svg << 'EOF'
<svg width="140" height="40" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="28" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#00e5e6">portnox</text>
</svg>
EOF
fi

echo ""
echo "✅ UI Layout fix deployed!"
echo ""
echo "The platform now matches the executive design with:"
echo "- Clean header with dropdown and action buttons"
echo "- Timeline progress indicator"
echo "- Navigation cards layout"
echo "- Pricing slider at the bottom"
echo "- Modern dark theme with purple accents"
echo ""
echo "Open index.html to see the updated design!"
