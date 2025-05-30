#!/bin/bash

echo "Testing Zero Trust Executive Dashboard..."

# Check if vendor database loaded
if grep -q "ComprehensiveVendorDatabase" js/data/comprehensive-vendor-database.js; then
    echo "✅ Vendor database created successfully"
else
    echo "❌ Vendor database missing"
fi

# Check vendor count
vendor_count=$(grep -o "'[^']*':" js/data/comprehensive-vendor-database.js | wc -l)
echo "📊 Found $vendor_count vendors in database"

# Check if dashboard initialized
if grep -q "ZeroTrustExecutiveDashboard" js/views/zero-trust-executive-dashboard.js; then
    echo "✅ Dashboard class created successfully"
else
    echo "❌ Dashboard class missing"
fi

# Check default configuration
if grep -q "deviceCount: 500" js/views/zero-trust-executive-dashboard.js; then
    echo "✅ Default 500 devices configured"
else
    echo "❌ Default device count incorrect"
fi

# Check if no vendors pre-selected
if grep -q "this.selectedVendors = \[\]" js/views/zero-trust-executive-dashboard.js; then
    echo "✅ No vendors pre-selected by default"
else
    echo "❌ Vendors may be pre-selected"
fi

echo "
Test complete! Open index.html in a browser to verify:
1. Dashboard loads with no vendors selected
2. Portnox pricing slider works ($1-$8 range)
3. Can select up to 8 vendors for comparison
4. Calculations update in real-time
5. All tabs display relevant data
"
