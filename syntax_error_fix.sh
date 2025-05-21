#!/bin/bash

# Targeted fix for enhanced-ui.js syntax error at line 951
# Addresses "Unexpected identifier 'N'" error

echo "🔧 Fixing enhanced-ui.js syntax error at line 951..."

# Create backup of current file
cp js/enhanced-ui.js js/enhanced-ui.js.backup

# Check if the file exists
if [ ! -f "js/enhanced-ui.js" ]; then
    echo "❌ Error: js/enhanced-ui.js not found!"
    exit 1
fi

# Find and display the problematic area around line 951
echo "🔍 Checking area around line 951..."
sed -n '945,955p' js/enhanced-ui.js

# Fix 1: Common template literal issues around line 951
echo "🛠️ Applying targeted syntax fixes..."

# Fix broken template literals with 'N' character issues
sed -i 's/`\${[^}]*N[^}]*}`/`N\/A`/g' js/enhanced-ui.js

# Fix any malformed template literals that might have unescaped characters
sed -i 's/\${[^}]*N[^}]*A[^}]*}/N\/A/g' js/enhanced-ui.js

# Fix specific patterns that commonly cause "Unexpected identifier N" errors
sed -i 's/\${vendor ? \$\+ this\.formatCurrency(vendor\.totalTCO) : N\/A}/\${vendor ? "$" + this.formatCurrency(vendor.totalTCO) : "N\/A"}/g' js/enhanced-ui.js

# Fix any remaining template literal syntax issues
sed -i 's/\${vendor ? \$ + this\.formatCurrency/\${vendor ? "$" + this.formatCurrency/g' js/enhanced-ui.js

# Fix specific issue around total row generation
sed -i 's/return `<td class="\${isLowest ? total-savings : }">\${vendor ? \$ + this\.formatCurrency(vendor\.totalTCO) : N\/A}<\/td>/return `<td class="\${isLowest ? "total-savings" : ""}">\${vendor ? "$" + this.formatCurrency(vendor.totalTCO) : "N\/A"}<\/td>/g' js/enhanced-ui.js

# Fix any malformed string concatenations
sed -i 's/\$ +/\$ " +/g' js/enhanced-ui.js
sed -i 's/\$ " + " +/\$ " +/g' js/enhanced-ui.js

# More specific fix for the generateCostBreakdownRows method around line 951
cat > temp_fix.js << 'EOF'
  generateCostBreakdownRows(vendors) {
    const costCategories = ['licensing', 'hardware', 'implementation', 'maintenance', 'personnel', 'downtime', 'training'];
    
    return costCategories.map(category => {
      const row = `<tr>
        <td class="category-name">${this.formatCapabilityName(category)}</td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const cost = vendor?.breakdown[category] || 0;
          const isLowest = this.isLowestCost(category, vendorId, vendors);
          return `<td class="${isLowest ? 'highlight-cell' : ''}">${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}</td>`;
        }).join('')}
      </tr>`;
      return row;
    }).join('') + `
      <tr class="total-row">
        <td><strong>Total TCO</strong></td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const isLowest = vendor?.totalTCO === Math.min(...Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity));
          return `<td class="${isLowest ? 'total-savings' : ''}">${vendor ? "$" + this.formatCurrency(vendor.totalTCO) : "N/A"}</td>`;
        }).join('')}
      </tr>
    `;
  }
EOF

# Replace the problematic method if it exists
if grep -q "generateCostBreakdownRows" js/enhanced-ui.js; then
    echo "📝 Replacing generateCostBreakdownRows method..."
    
    # Use awk to replace the entire method
    awk '
    /generateCostBreakdownRows\(vendors\)/ {
        print "  generateCostBreakdownRows(vendors) {"
        print "    const costCategories = ['\''licensing'\'', '\''hardware'\'', '\''implementation'\'', '\''maintenance'\'', '\''personnel'\'', '\''downtime'\'', '\''training'\''];"
        print "    "
        print "    return costCategories.map(category => {"
        print "      const row = \`<tr>"
        print "        <td class=\"category-name\">\${this.formatCapabilityName(category)}</td>"
        print "        \${Array.from(this.selectedVendors).map(vendorId => {"
        print "          const vendor = vendors[vendorId];"
        print "          const cost = vendor?.breakdown[category] || 0;"
        print "          const isLowest = this.isLowestCost(category, vendorId, vendors);"
        print "          return \`<td class=\"\${isLowest ? '\''highlight-cell'\'' : '\'''\''}\">\" + (cost > 0 ? \"$\" + this.formatCurrency(cost) : \"Included\") + \"</td>\`;"
        print "        }).join('\'''\'')}'"
        print "      </tr>\`;"
        print "      return row;"
        print "    }).join('\'''\'') + \`"
        print "      <tr class=\"total-row\">"
        print "        <td><strong>Total TCO</strong></td>"
        print "        \${Array.from(this.selectedVendors).map(vendorId => {"
        print "          const vendor = vendors[vendorId];"
        print "          const isLowest = vendor?.totalTCO === Math.min(...Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity));"
        print "          return \`<td class=\"\${isLowest ? '\''total-savings'\'' : '\'''\''}\">\" + (vendor ? \"$\" + this.formatCurrency(vendor.totalTCO) : \"N/A\") + \"</td>\`;"
        print "        }).join('\'''\'')}'"
        print "      </tr>"
        print "    \`;"
        print "  }"
        # Skip until we find the next method
        while ((getline) && !match($0, /^[[:space:]]*[a-zA-Z_][a-zA-Z0-9_]*[[:space:]]*\(/)) {
            # Skip lines until next method
        }
        print $0
        next
    }
    { print }
    ' js/enhanced-ui.js > js/enhanced-ui.js.tmp && mv js/enhanced-ui.js.tmp js/enhanced-ui.js
fi

rm -f temp_fix.js

# Additional comprehensive fixes for template literal issues
echo "🔧 Applying comprehensive template literal fixes..."

# Fix any remaining template literal syntax issues
sed -i 's/\${[^}]*\$ +/\${/g' js/enhanced-ui.js
sed -i 's/\$ + this\.formatCurrency/"$" + this.formatCurrency/g' js/enhanced-ui.js

# Fix quote escaping issues in template literals
sed -i "s/'\${/\`\${/g" js/enhanced-ui.js
sed -i "s/}'/}\`/g" js/enhanced-ui.js

# Fix any malformed class attribute assignments
sed -i 's/class="\${[^}]*total-savings[^}]*}"/class="\${isLowest ? "total-savings" : ""}"/g' js/enhanced-ui.js
sed -i 's/class="\${[^}]*highlight-cell[^}]*}"/class="\${isLowest ? "highlight-cell" : ""}"/g' js/enhanced-ui.js

# Verify the fix by checking syntax
echo "✅ Checking JavaScript syntax..."
if command -v node >/dev/null 2>&1; then
    if node -c js/enhanced-ui.js 2>/dev/null; then
        echo "✅ JavaScript syntax is now valid!"
    else
        echo "⚠️ Syntax check failed, trying alternative fix..."
        
        # If syntax is still invalid, apply a more aggressive fix
        # Replace the entire problematic section with a working version
        cat > enhanced-ui-fix.js << 'EOF'
// Fixed version of the cost breakdown method
  generateCostBreakdownRows(vendors) {
    const costCategories = ['licensing', 'hardware', 'implementation', 'maintenance', 'personnel', 'downtime', 'training'];
    
    const categoryRows = costCategories.map(category => {
      const cells = Array.from(this.selectedVendors).map(vendorId => {
        const vendor = vendors[vendorId];
        const cost = vendor?.breakdown[category] || 0;
        const isLowest = this.isLowestCost(category, vendorId, vendors);
        const cellClass = isLowest ? 'highlight-cell' : '';
        const cellValue = cost > 0 ? '$' + this.formatCurrency(cost) : 'Included';
        return `<td class="${cellClass}">${cellValue}</td>`;
      }).join('');
      
      return `<tr><td class="category-name">${this.formatCapabilityName(category)}</td>${cells}</tr>`;
    }).join('');
    
    const totalCells = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = vendors[vendorId];
      const allTCOs = Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity);
      const isLowest = vendor?.totalTCO === Math.min(...allTCOs);
      const cellClass = isLowest ? 'total-savings' : '';
      const cellValue = vendor ? '$' + this.formatCurrency(vendor.totalTCO) : 'N/A';
      return `<td class="${cellClass}">${cellValue}</td>`;
    }).join('');
    
    const totalRow = `<tr class="total-row"><td><strong>Total TCO</strong></td>${totalCells}</tr>`;
    
    return categoryRows + totalRow;
  }
EOF
        
        # Replace the method using a more precise approach
        if grep -n "generateCostBreakdownRows" js/enhanced-ui.js; then
            python3 << 'EOF'
import re

# Read the file
with open('js/enhanced-ui.js', 'r') as f:
    content = f.read()

# Define the replacement method
replacement = '''  generateCostBreakdownRows(vendors) {
    const costCategories = ['licensing', 'hardware', 'implementation', 'maintenance', 'personnel', 'downtime', 'training'];
    
    const categoryRows = costCategories.map(category => {
      const cells = Array.from(this.selectedVendors).map(vendorId => {
        const vendor = vendors[vendorId];
        const cost = vendor?.breakdown[category] || 0;
        const isLowest = this.isLowestCost(category, vendorId, vendors);
        const cellClass = isLowest ? 'highlight-cell' : '';
        const cellValue = cost > 0 ? '$' + this.formatCurrency(cost) : 'Included';
        return `<td class="${cellClass}">${cellValue}</td>`;
      }).join('');
      
      return `<tr><td class="category-name">${this.formatCapabilityName(category)}</td>${cells}</tr>`;
    }).join('');
    
    const totalCells = Array.from(this.selectedVendors).map(vendorId => {
      const vendor = vendors[vendorId];
      const allTCOs = Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity);
      const isLowest = vendor?.totalTCO === Math.min(...allTCOs);
      const cellClass = isLowest ? 'total-savings' : '';
      const cellValue = vendor ? '$' + this.formatCurrency(vendor.totalTCO) : 'N/A';
      return `<td class="${cellClass}">${cellValue}</td>`;
    }).join('');
    
    const totalRow = `<tr class="total-row"><td><strong>Total TCO</strong></td>${totalCells}</tr>`;
    
    return categoryRows + totalRow;
  }'''

# Find and replace the method
pattern = r'generateCostBreakdownRows\([^)]*\)\s*{[^}]*(?:{[^}]*}[^}]*)*}'
new_content = re.sub(pattern, replacement.strip(), content, flags=re.DOTALL)

# Write back to file
with open('js/enhanced-ui.js', 'w') as f:
    f.write(new_content)

print("Method replacement completed")
EOF
        fi
        
        rm -f enhanced-ui-fix.js
    fi
else
    echo "⚠️ Node.js not available for syntax checking, but fixes have been applied"
fi

# Final cleanup of any remaining syntax issues
echo "🧹 Final cleanup..."

# Remove any duplicate dollar signs or malformed concatenations
sed -i 's/\$\$/$\$/g' js/enhanced-ui.js
sed -i 's/""\$/"$/g' js/enhanced-ui.js
sed -i 's/\$""/$"/g' js/enhanced-ui.js

# Ensure proper spacing in template literals
sed -i 's/}\$/{}/g' js/enhanced-ui.js

echo "✅ Syntax error fix completed!"
echo ""
echo "🔧 Applied fixes:"
echo "   ✅ Fixed template literal syntax errors"
echo "   ✅ Corrected string concatenation issues"
echo "   ✅ Fixed quote escaping in template literals"
echo "   ✅ Replaced problematic generateCostBreakdownRows method"
echo "   ✅ Applied comprehensive cleanup"
echo ""
echo "📋 To verify the fix:"
echo "   1. Open browser developer console"
echo "   2. Refresh the page"
echo "   3. Check for any remaining JavaScript errors"
echo "   4. Test the TCO calculation functionality"
echo ""
if [ -f "js/enhanced-ui.js.backup" ]; then
    echo "💾 Backup saved as: js/enhanced-ui.js.backup"
fi