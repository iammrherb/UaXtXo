#!/bin/bash
# Apply all fixes to Portnox Total Cost Analyzer

echo "Applying fixes to Portnox Total Cost Analyzer..."

# Add new CSS to index.html
echo "Adding enhanced color scheme..."
if grep -q "enhanced-color-scheme.css" index.html; then
  echo "Enhanced color scheme already included"
else
  sed -i '/<link rel="stylesheet" href="css\/security-view.css">/a \    <link rel="stylesheet" href="css/fixes/enhanced-color-scheme.css">' index.html
fi

# Add new JS files to index.html
echo "Adding missing JavaScript files..."
if grep -q "include-fixes.js" index.html; then
  echo "Fix scripts already included"
else
  sed -i '/<script src="js\/fixed-app.js"><\/script>/a \    <script src="js/include-fixes.js"></script>' index.html
  sed -i '/<script src="js\/include-fixes.js"><\/script>/a \    <script src="js/fixes/executive-view-fix.js"></script>' index.html
fi

# Fix vendor data
echo "Ensuring vendor data is properly defined..."
if grep -q "VENDORS =" js/models/vendor-data.js; then
  echo "Vendor data already defined"
else
  # Create or update vendor-data.js
  cat > js/models/vendor-data.js << 'VENDORDATA'
/**
 * Vendor Data for Portnox Total Cost Analyzer
 * Contains comprehensive information for all supported NAC vendors
 */

const VENDORS = {
  'portnox': {
    name: 'Portnox Cloud',
    logo: 'img/vendors/portnox-logo.png',
    architecture: 'cloud',
    tco: 245000,
    implementationTime: 21,
    implementationCost: 15000,
    fte: 0.25,
    hardware: 0,
    maintenance: 12500,
    subscription: 172500,
    personnel: 25000,
    paybackPeriod: 7,
    roi: 325,
    securityScore: 92,
    complianceScore: 95,
    zeroTrustScore: 95,
    breachReduction: 85,
    automationLevel: 90
  },
  'cisco': {
    name: 'Cisco ISE',
    logo: 'img/vendors/cisco-logo.png',
    architecture: 'on-premises',
    tco: 520000,
    implementationTime: 90,
    implementationCost: 85000,
    fte: 2.0,
    hardware: 130000,
    maintenance: 98000,
    subscription: 0,
    personnel: 200000,
    paybackPeriod: 32,
    roi: -8,
    securityScore: 85,
    complianceScore: 90,
    zeroTrustScore: 75,
    breachReduction: 70,
    automationLevel: 60
  },
  'aruba': {
    name: 'Aruba ClearPass',
    logo: 'img/vendors/aruba-logo.png',
    architecture: 'on-premises',
    tco: 480000,
    implementationTime: 75,
    implementationCost: 65000,
    fte: 1.75,
    hardware: 110000,
    maintenance: 85000,
    subscription: 0,
    personnel: 175000,
    paybackPeriod: 28,
    roi: 5,
    securityScore: 82,
    complianceScore: 88,
    zeroTrustScore: 70,
    breachReduction: 72,
    automationLevel: 65
  },
  'forescout': {
    name: 'Forescout',
    logo: 'img/vendors/forescout-logo.png',
    architecture: 'on-premises',
    tco: 430000,
    implementationTime: 60,
    implementationCost: 75000,
    fte: 1.5,
    hardware: 100000,
    maintenance: 75000,
    subscription: 0,
    personnel: 150000,
    paybackPeriod: 25,
    roi: 12,
    securityScore: 80,
    complianceScore: 85,
    zeroTrustScore: 72,
    breachReduction: 68,
    automationLevel: 70
  },
  'fortinac': {
    name: 'FortiNAC',
    logo: 'img/vendors/fortinac-logo.png',
    architecture: 'on-premises',
    tco: 400000,
    implementationTime: 60,
    implementationCost: 60000,
    fte: 1.25,
    hardware: 90000,
    maintenance: 70000,
    subscription: 0,
    personnel: 125000,
    paybackPeriod: 22,
    roi: 15,
    securityScore: 75,
    complianceScore: 80,
    zeroTrustScore: 65,
    breachReduction: 65,
    automationLevel: 60
  },
  'juniper': {
    name: 'Juniper Mist',
    logo: 'img/vendors/juniper-logo.png',
    architecture: 'hybrid',
    tco: 350000,
    implementationTime: 45,
    implementationCost: 50000,
    fte: 1.0,
    hardware: 60000,
    maintenance: 50000,
    subscription: 100000,
    personnel: 100000,
    paybackPeriod: 18,
    roi: 40,
    securityScore: 78,
    complianceScore: 82,
    zeroTrustScore: 80,
    breachReduction: 70,
    automationLevel: 75
  },
  'securew2': {
    name: 'SecureW2',
    logo: 'img/vendors/securew2-logo.png',
    architecture: 'cloud',
    tco: 280000,
    implementationTime: 30,
    implementationCost: 25000,
    fte: 0.5,
    hardware: 0,
    maintenance: 15000,
    subscription: 190000,
    personnel: 50000,
    paybackPeriod: 12,
    roi: 180,
    securityScore: 72,
    complianceScore: 70,
    zeroTrustScore: 85,
    breachReduction: 60,
    automationLevel: 80
  },
  'microsoft': {
    name: 'Microsoft NPS',
    logo: 'img/vendors/microsoft-logo.png',
    architecture: 'on-premises',
    tco: 290000,
    implementationTime: 30,
    implementationCost: 20000,
    fte: 1.0,
    hardware: 30000,
    maintenance: 40000,
    subscription: 0,
    personnel: 100000,
    paybackPeriod: 20,
    roi: 25,
    securityScore: 60,
    complianceScore: 65,
    zeroTrustScore: 50,
    breachReduction: 45,
    automationLevel: 40
  },
  'arista': {
    name: 'Arista CloudVision',
    logo: 'img/vendors/arista-logo.png',
    architecture: 'hybrid',
    tco: 320000,
    implementationTime: 45,
    implementationCost: 45000,
    fte: 1.0,
    hardware: 50000,
    maintenance: 55000,
    subscription: 70000,
    personnel: 100000,
    paybackPeriod: 15,
    roi: 35,
    securityScore: 70,
    complianceScore: 75,
    zeroTrustScore: 65,
    breachReduction: 60,
    automationLevel: 65
  },
  'foxpass': {
    name: 'Foxpass',
    logo: 'img/vendors/foxpass-logo.png',
    architecture: 'cloud',
    tco: 270000,
    implementationTime: 25,
    implementationCost: 20000,
    fte: 0.5,
    hardware: 0,
    maintenance: 10000,
    subscription: 180000,
    personnel: 50000,
    paybackPeriod: 10,
    roi: 160,
    securityScore: 65,
    complianceScore: 60,
    zeroTrustScore: 70,
    breachReduction: 55,
    automationLevel: 75
  }
};

// Make VENDORS data available globally
window.VENDORS = VENDORS;
VENDORDATA
fi

# Fix permissions
chmod +x apply-fixes.sh

echo "Creating git commit script..."
cat > commit-fixes.sh << 'COMMITSCRIPT'
#!/bin/bash
# Commit and push fixes to git repository

# Stage all files
git add .

# Commit changes
git commit -m "Fix Portnox Total Cost Analyzer UI and functionality issues

- Fixed missing JavaScript files (chart-config.js, security-charts.js, apex-charts.js, d3-manager.js)
- Added enhanced color scheme for better visibility
- Fixed executive view container initialization
- Ensured vendor data is properly defined
- Fixed chart rendering issues
- Improved overall UI with better contrast and visibility"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "Changes committed successfully!"
COMMITSCRIPT

chmod +x commit-fixes.sh

echo "All fixes applied successfully! The application should now work properly."
echo "Run './commit-fixes.sh' to commit these changes to your git repository."
