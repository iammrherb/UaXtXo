#!/bin/bash
# Complete NAC Platform Setup

echo "🚀 Setting up NAC Executive Platform..."

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p css js/data js/views js/utils img/vendors

# Make scripts executable
chmod +x setup-vendor-logos.sh
chmod +x setup-complete.sh

# Run vendor logo setup
echo "🖼️ Setting up vendor logos..."
./setup-vendor-logos.sh

# Update index.html
echo "📄 Updating index.html..."
if [ -f index-updated.html ]; then
    mv index.html index-backup.html 2>/dev/null || true
    mv index-updated.html index.html
    echo "✓ index.html updated"
fi

# Verify all files
echo "🔍 Verifying installation..."
files_to_check=(
    "css/portnox-brand-colors.css"
    "css/compliance-view.css"
    "js/data/vendor-database-complete.js"
    "js/data/compliance-frameworks-complete.js"
    "js/views/compliance-view-enhanced.js"
    "js/views/header-cleanup.js"
    "js/views/platform-integration.js"
)

all_good=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
        all_good=false
    fi
done

if $all_good; then
    echo ""
    echo "✅ NAC Executive Platform setup complete!"
    echo ""
    echo "📌 Next steps:"
    echo "1. Open index.html in your browser"
    echo "2. The Compliance view will load by default"
    echo "3. Navigate between views using the header navigation"
    echo ""
    echo "🎨 Portnox branding has been applied with:"
    echo "   Primary: #0046ad"
    echo "   Accent: #00e5e6"
    echo "   Secondary: #e6f0ff"
    echo "   Dark: #003380"
    echo "   Light: #f0f7ff"
    echo ""
    echo "📊 Compliance frameworks included:"
    echo "   - SOX, HIPAA, PCI-DSS, GDPR"
    echo "   - ISO 27001, NIST CSF"
    echo "   - FERPA, GLBA, CCPA"
    echo "   - And more..."
    echo ""
    echo "🏢 All vendor logos configured in img/vendors/"
else
    echo ""
    echo "⚠️  Some files are missing. Please check the output above."
fi
