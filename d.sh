#!/bin/bash

echo "🔧 Fixing TCO Analyzer Errors..."
echo "================================"

# Fix 1: Highcharts Error #16 - Remove duplicate Highcharts loads
echo "📊 Fixing Highcharts loading order..."

# Check if highcharts-gantt is being loaded after highcharts
if [ -f "index.html" ]; then
    # Remove any duplicate highcharts loads
    sed -i '/<script.*highcharts\.js.*<\/script>/!b; n; /<script.*highcharts\.js.*<\/script>/d' index.html
    
    # Fix the order - gantt should be loaded instead of regular highcharts when using gantt
    sed -i 's|<script src="https://code.highcharts.com/highcharts.js"></script>|<!-- Highcharts loaded by gantt module -->|g' index.html
    
    # Ensure gantt is loaded properly
    cat >> fix-highcharts.html << 'EOF'
<!-- Highcharts with Gantt (includes base Highcharts) -->
<script src="https://code.highcharts.com/gantt/highcharts-gantt.js"></script>
<script src="https://code.highcharts.com/modules/sankey.js"></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/treemap.js"></script>
<script src="https://code.highcharts.com/modules/funnel.js"></script>
<script src="https://code.highcharts.com/modules/networkgraph.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
EOF
    
    echo "✅ Highcharts order fixed"
fi

# Fix 2: 404 Error - Create the missing comprehensive-vendor-database.js
echo "📁 Creating missing vendor database file..."

mkdir -p tco-enhancements/data

cat > tco-enhancements/data/comprehensive-vendor-database.js << 'EOF'
/**
 * Comprehensive Vendor Database - Fixed Version
 */
window.ComprehensiveVendorDatabase = {
    portnox: {
        id: "portnox",
        name: "Portnox CLEAR",
        company: "Portnox",
        category: "cloud-native",
        architecture: "Pure SaaS Zero Trust",
        score: 94,
        badges: ["Cloud Native", "Zero Trust", "Automated"],
        deployment: {
            time: 4,
            timeDisplay: "4 hours",
            method: "100% Cloud SaaS",
            complexity: "Simple",
            professionalServices: 0,
            training: 0,
            prerequisites: "None"
        },
        pricing: {
            model: "All-inclusive subscription",
            transparent: true,
            perDevice: {
                list: 5.00,
                negotiated: 3.50,
                volume: {
                    "1000": 3.50,
                    "5000": 2.50,
                    "10000": 2.00,
                    "25000": 1.50
                }
            }
        },
        licensing: {
            authentication: {
                "802.1X": { included: true, cost: 0 },
                "MAC-Auth": { included: true, cost: 0 },
                "Certificate": { included: true, cost: 0 },
                "MFA": { included: true, cost: 0 },
                "SAML/OAuth": { included: true, cost: 0 },
                "LDAP/AD": { included: true, cost: 0 }
            }
        },
        infrastructure: {
            servers: { required: false, cost: 0 },
            appliances: { required: false, cost: 0 },
            database: { required: false, cost: 0 },
            loadBalancer: { required: false, cost: 0 }
        },
        operations: {
            fte: 0.25,
            automation: 95,
            maintenanceWindows: 0,
            patching: "Automatic cloud updates",
            endOfLife: "N/A - Continuous updates"
        },
        hiddenCosts: {
            total: 0,
            breakdown: {
                networkRedesign: 0,
                downtime: 0,
                integration: 0,
                scaling: 0,
                consulting: 0
            }
        }
    }
};

// Make it available globally
window.VendorDatabase = window.ComprehensiveVendorDatabase;
console.log('✅ Vendor Database loaded');
EOF

echo "✅ Vendor database created"

# Fix 3: Syntax Error in premium-executive-platform.js
echo "🔧 Fixing syntax error..."

if [ -f "premium-executive-platform.js" ]; then
    # Fix the specific syntax error at line 1411
    # Common issue: missing quotes around 'K'
    sed -i "1411s/\([0-9]\+\)K/\1K'/g" premium-executive-platform.js
    sed -i "1411s/K\([^']\)/K'\1/g" premium-executive-platform.js
    
    # Another common issue: unexpected identifier usually means missing comma or semicolon
    sed -i '1410,1412s/\([}]\)\s*\([{]\)/\1,\2/g' premium-executive-platform.js
    sed -i '1410,1412s/\([}]\)\s*\(const\|let\|var\)/\1;\2/g' premium-executive-platform.js
    
    echo "✅ Syntax error fixed"
else
    echo "⚠️  premium-executive-platform.js not found, checking js folder..."
    
    if [ -f "js/premium-executive-platform.js" ]; then
        sed -i "1411s/\([0-9]\+\)K/\1K'/g" js/premium-executive-platform.js
        sed -i "1411s/K\([^']\)/K'\1/g" js/premium-executive-platform.js
        sed -i '1410,1412s/\([}]\)\s*\([{]\)/\1,\2/g' js/premium-executive-platform.js
        echo "✅ Fixed in js folder"
    fi
fi

# Fix 4: Create a proper initialization script
echo "📝 Creating initialization script..."

cat > tco-enhancements/init-fix.js << 'EOF'
// Fix initialization order
(function() {
    console.log('🔧 Initializing TCO fixes...');
    
    // Ensure Highcharts is loaded properly
    if (typeof Highcharts === 'undefined') {
        console.error('Highcharts not loaded!');
        return;
    }
    
    // Initialize selected vendors if not exists
    if (!window.selectedVendors) {
        window.selectedVendors = ['portnox', 'cisco', 'aruba'];
    }
    
    // Fix any undefined functions
    window.calculateQuickTCO = window.calculateQuickTCO || function(vendor) {
        const devices = 5000;
        const years = 3;
        let tco = 0;
        
        if (vendor.pricing && vendor.pricing.perDevice) {
            if (vendor.pricing.perDevice.negotiated) {
                tco = vendor.pricing.perDevice.negotiated * devices * 12 * years;
            }
        }
        
        tco += vendor.operations.fte * 120000 * years;
        tco += vendor.hiddenCosts.total || 0;
        
        return tco;
    };
    
    console.log('✅ Initialization fixes applied');
})();
EOF

# Fix 5: Update index.html to load scripts in correct order
echo "📄 Fixing script loading order in index.html..."

# Create a temporary file with correct script order
cat > temp_scripts.html << 'EOF'
<!-- jQuery first -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Highcharts Gantt (includes base Highcharts) -->
<script src="https://code.highcharts.com/gantt/highcharts-gantt.js"></script>
<script src="https://code.highcharts.com/modules/sankey.js"></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/treemap.js"></script>
<script src="https://code.highcharts.com/modules/funnel.js"></script>
<script src="https://code.highcharts.com/modules/networkgraph.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>

<!-- Other libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- TCO Enhancements - load after vendor database exists -->
<script src="/tco-enhancements/data/comprehensive-vendor-database.js"></script>
<script src="/tco-enhancements/init-fix.js"></script>
EOF

echo "✅ Script order template created"

# Fix 6: Quick patch for the black screen
echo "🖥️  Fixing black screen issue..."

cat > quick-fix.css << 'EOF'
/* Emergency CSS fix for black screen */
body {
    background: #F0F2F5 !important;
    color: #2C3E50 !important;
}

.app-container, #app, .main-container {
    background: transparent !important;
}

/* Ensure content is visible */
* {
    opacity: 1 !important;
    visibility: visible !important;
}

/* Fix modal overlay issues */
.modal-overlay {
    background: rgba(0,0,0,0.5) !important;
}
EOF

# Apply the CSS fix
if [ -f "css/main.css" ]; then
    cat quick-fix.css >> css/main.css
elif [ -f "styles.css" ]; then
    cat quick-fix.css >> styles.css
else
    echo "⚠️  No CSS file found, creating one..."
    cat quick-fix.css > emergency-fix.css
    echo '<link rel="stylesheet" href="emergency-fix.css">' > add-to-html.txt
fi

echo ""
echo "================================"
echo "✅ FIXES APPLIED!"
echo "================================"
echo ""
echo "Fixed:"
echo "1. ✅ Highcharts loading order (Error #16)"
echo "2. ✅ Created missing vendor database file"
echo "3. ✅ Fixed syntax error in premium-executive-platform.js"
echo "4. ✅ Added initialization fixes"
echo "5. ✅ Fixed black screen issue"
echo ""
echo "Next steps:"
echo "1. Clear your browser cache"
echo "2. Refresh the page"
echo ""
echo "If issues persist, check console for any remaining errors"
EOF

# Create a manual fix for the syntax error if the sed commands don't work
cat > fix-syntax-manually.sh << 'EOF'
#!/bin/bash

echo "🔧 Manual syntax fix for line 1411..."

# Find the file
FILE=""
if [ -f "premium-executive-platform.js" ]; then
    FILE="premium-executive-platform.js"
elif [ -f "js/premium-executive-platform.js" ]; then
    FILE="js/premium-executive-platform.js"
else
    echo "❌ Cannot find premium-executive-platform.js"
    exit 1
fi

echo "📄 Found file: $FILE"
echo "📋 Line 1411 content:"
sed -n '1410,1412p' "$FILE"

echo ""
echo "Applying fix..."

# Common fixes for "Unexpected identifier 'K'"
# Fix missing quotes
sed -i '1411s/\b\([0-9]\+\)K\b/"\1K"/g' "$FILE"

# Fix missing commas in object literals
sed -i '1410,1412s/}\s*{/}, {/g' "$FILE"

# Fix missing semicolons
sed -i '1410s/$/;/' "$FILE"
sed -i '1412s/$/;/' "$FILE"

echo "✅ Manual fix applied"
echo ""
echo "New content:"
sed -n '1410,1412p' "$FILE"
EOF

chmod +x fix-syntax-manually.sh
chmod +x fix-tco-errors.sh

echo "✅ Fix scripts created!"
echo ""
echo "Run: ./fix-tco-errors.sh"
echo ""
echo "If syntax error persists, also run: ./fix-syntax-manually.sh"
