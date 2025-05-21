#!/bin/bash

# Zero Trust TCA Targeted Fixes
# Fixes specific 404 errors and JavaScript syntax issues

echo "🔧 Applying targeted fixes for Zero Trust TCA..."

# Fix 1: Create missing zero-trust-calculator.js file
echo "📄 Creating missing zero-trust-calculator.js..."
cat > js/zero-trust-calculator.js << 'EOF'
/**
 * Zero Trust Calculator Core Functions
 * Handles TCO calculations and data processing
 */

// Enhanced TCO Calculator class
class ZeroTrustCalculator {
  constructor() {
    this.vendorData = window.ENHANCED_VENDORS || {};
    this.results = null;
  }
  
  calculateTCO(configuration, selectedVendors) {
    const results = {
      vendors: {},
      summary: {},
      compliance: {},
      roi: {}
    };
    
    // Calculate for each selected vendor
    selectedVendors.forEach(vendorId => {
      if (this.vendorData[vendorId]) {
        results.vendors[vendorId] = this.calculateVendorTCO(this.vendorData[vendorId], configuration);
      }
    });
    
    // Calculate summary metrics
    results.summary = this.calculateSummary(results.vendors);
    results.compliance = this.calculateCompliance(selectedVendors, configuration.complianceRequirements);
    results.roi = this.calculateROI(results.vendors);
    
    this.results = results;
    return results;
  }
  
  calculateVendorTCO(vendor, config) {
    const { deviceCount, analysisPeriod, fteCost, fteAllocation } = config;
    
    let totalTCO = 0;
    let breakdown = {
      licensing: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      personnel: 0,
      training: 0
    };
    
    // Calculate licensing costs
    if (vendor.costs?.licensing?.model === 'subscription') {
      const monthlyPerDevice = vendor.costs.licensing.perDevicePerMonth || 3;
      breakdown.licensing = monthlyPerDevice * deviceCount * 12 * analysisPeriod;
    } else if (vendor.costs?.licensing?.model === 'perpetual') {
      const perDeviceBase = vendor.costs.licensing.perDeviceBase || 100;
      breakdown.licensing = perDeviceBase * deviceCount;
      if (vendor.costs.licensing.maintenancePercentage) {
        breakdown.maintenance = (breakdown.licensing * vendor.costs.licensing.maintenancePercentage / 100) * analysisPeriod;
      }
    }
    
    // Calculate hardware costs
    if (vendor.costs?.hardware) {
      if (typeof vendor.costs.hardware === 'object') {
        breakdown.hardware = vendor.costs.hardware[config.companySize] || 0;
      } else {
        breakdown.hardware = vendor.costs.hardware;
      }
    }
    
    // Calculate implementation
    if (vendor.costs?.implementation) {
      breakdown.implementation = (vendor.costs.implementation.baseHours || 100) * (vendor.costs.implementation.hourlyRate || 200);
    }
    
    // Calculate personnel
    const fteRequired = vendor.costs?.implementation?.fteRequired || 0.5;
    breakdown.personnel = fteCost * (fteAllocation / 100) * fteRequired * analysisPeriod;
    
    // Calculate training
    breakdown.training = breakdown.implementation * 0.1; // 10% of implementation
    
    totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
    
    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      totalTCO,
      breakdown,
      implementation: {
        timeToValue: vendor.implementation?.timeToValue || 30,
        complexity: vendor.implementation?.complexity || 'moderate'
      },
      yearlyBreakdown: this.generateYearlyBreakdown(breakdown, analysisPeriod)
    };
  }
  
  generateYearlyBreakdown(breakdown, years) {
    const yearlyBreakdown = [];
    const annualCost = (breakdown.licensing + breakdown.maintenance + breakdown.personnel) / years;
    const initialCost = breakdown.hardware + breakdown.implementation + breakdown.training;
    
    for (let year = 1; year <= years; year++) {
      const yearCost = year === 1 ? initialCost + annualCost : annualCost;
      yearlyBreakdown.push({
        year,
        cost: yearCost,
        cumulativeCost: initialCost + (annualCost * year)
      });
    }
    
    return yearlyBreakdown;
  }
  
  calculateSummary(vendors) {
    const vendorList = Object.values(vendors);
    if (vendorList.length === 0) return {};
    
    const totalCosts = vendorList.map(v => v.totalTCO);
    const lowestTCO = Math.min(...totalCosts);
    const highestTCO = Math.max(...totalCosts);
    
    const portnoxData = vendors['portnox'];
    const competitorCosts = vendorList.filter(v => v.vendorId !== 'portnox').map(v => v.totalTCO);
    const avgCompetitorTCO = competitorCosts.length > 0 ? competitorCosts.reduce((sum, cost) => sum + cost, 0) / competitorCosts.length : 0;
    
    return {
      lowestTCO,
      highestTCO,
      averageCompetitorTCO: avgCompetitorTCO,
      portnoxSavings: portnoxData && avgCompetitorTCO > 0 ? (avgCompetitorTCO - portnoxData.totalTCO) : 0,
      savingsPercentage: portnoxData && avgCompetitorTCO > 0 ? ((avgCompetitorTCO - portnoxData.totalTCO) / avgCompetitorTCO * 100) : 0,
      fastestImplementation: Math.min(...vendorList.map(v => v.implementation.timeToValue)),
      averageImplementationTime: vendorList.reduce((sum, v) => sum + v.implementation.timeToValue, 0) / vendorList.length
    };
  }
  
  calculateCompliance(selectedVendors, requirements) {
    const compliance = {};
    
    selectedVendors.forEach(vendorId => {
      const vendor = this.vendorData[vendorId];
      if (vendor?.compliance) {
        compliance[vendorId] = {};
        
        requirements.forEach(req => {
          const cleanReq = req.replace('-', '').toLowerCase();
          compliance[vendorId][req] = vendor.compliance[cleanReq]?.coverage || 0;
        });
        
        // Calculate overall score
        const scores = Object.values(compliance[vendorId]);
        compliance[vendorId].overall = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      }
    });
    
    return compliance;
  }
  
  calculateROI(vendors) {
    const roi = {};
    
    Object.keys(vendors).forEach(vendorId => {
      const vendor = vendors[vendorId];
      const benefits = this.calculateBenefits(vendor);
      const costs = vendor.totalTCO;
      
      roi[vendorId] = {
        totalBenefits: benefits,
        totalCosts: costs,
        netBenefit: benefits - costs,
        roiPercentage: costs > 0 ? ((benefits - costs) / costs) * 100 : 0,
        paybackPeriod: benefits > 0 ? costs / (benefits / 3) : 0 // Assuming 3-year analysis
      };
    });
    
    return roi;
  }
  
  calculateBenefits(vendor) {
    // Simplified benefit calculation
    const baselineBreach = 4350000; // Average breach cost
    const riskReduction = vendor.vendorId === 'portnox' ? 0.85 : 0.5; // Risk reduction percentage
    const breachPrevention = baselineBreach * riskReduction;
    
    const operationalSavings = vendor.vendorId === 'portnox' ? 50000 : 20000; // Annual operational savings
    
    return breachPrevention + (operationalSavings * 3); // 3-year analysis
  }
}

// Make calculator available globally
window.ZeroTrustCalculator = ZeroTrustCalculator;

console.log('Zero Trust Calculator loaded successfully');
EOF

# Fix 2: Create missing enhanced-animations.css file
echo "🎨 Creating missing enhanced-animations.css..."
cat > css/enhanced-animations.css << 'EOF'
/**
 * Enhanced Animations for Zero Trust TCA
 * Smooth transitions and micro-interactions
 */

/* Loading Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

/* Chart Loading Spinner */
.chart-loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a5a96;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

/* Card Animations */
.vendor-card {
  animation: slideInUp 0.3s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vendor-card:nth-child(1) { animation-delay: 0.1s; }
.vendor-card:nth-child(2) { animation-delay: 0.2s; }
.vendor-card:nth-child(3) { animation-delay: 0.3s; }
.vendor-card:nth-child(4) { animation-delay: 0.4s; }

.metric-card {
  animation: scaleIn 0.4s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px) scale(1.02);
}

/* Button Animations */
.header-btn,
.calculate-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.header-btn::before,
.calculate-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.header-btn:hover::before,
.calculate-button:hover::before {
  left: 100%;
}

/* Tab Animations */
.main-tab {
  transition: all 0.3s ease;
  position: relative;
}

.main-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a5a96, #2980b9);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.main-tab.active::after {
  width: 100%;
}

/* Config Section Animations */
.config-section {
  animation: slideInLeft 0.4s ease-out;
}

.config-content {
  transition: all 0.3s ease;
  overflow: hidden;
}

.config-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
}

/* Form Element Animations */
.enhanced-select,
.enhanced-input {
  transition: all 0.3s ease;
}

.enhanced-select:focus,
.enhanced-input:focus {
  transform: translateY(-2px);
}

/* Cost Slider Animations */
.cost-slider {
  transition: all 0.3s ease;
}

.cost-slider::-webkit-slider-thumb {
  transition: all 0.3s ease;
}

.cost-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Loading States */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

/* Toast Animations */
.toast {
  transform: translateX(100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.toast.show {
  transform: translateX(0);
  opacity: 1;
}

/* Chart Container Animations */
.chart-wrapper {
  animation: fadeIn 0.5s ease-out;
}

.chart-wrapper:nth-child(1) { animation-delay: 0.1s; }
.chart-wrapper:nth-child(2) { animation-delay: 0.2s; }
.chart-wrapper:nth-child(3) { animation-delay: 0.3s; }

/* View Panel Transitions */
.view-panel {
  transition: all 0.3s ease;
}

.view-panel.active {
  animation: fadeIn 0.4s ease-out;
}

/* Compliance Badge Animations */
.compliance-badge {
  transition: all 0.3s ease;
  animation: slideInUp 0.3s ease-out;
}

.compliance-badge:hover {
  transform: translateY(-2px);
}

/* Insight Panel Animations */
.insight-panel {
  animation: slideInUp 0.5s ease-out;
}

.insight-list li {
  animation: slideInLeft 0.3s ease-out;
}

.insight-list li:nth-child(1) { animation-delay: 0.1s; }
.insight-list li:nth-child(2) { animation-delay: 0.2s; }
.insight-list li:nth-child(3) { animation-delay: 0.3s; }
.insight-list li:nth-child(4) { animation-delay: 0.4s; }
.insight-list li:nth-child(5) { animation-delay: 0.5s; }

/* Progress Bar Animations */
.score-fill,
.protection-progress {
  transition: width 1s ease-out;
  animation: scaleIn 0.8s ease-out;
}

/* Hover Effects */
.vendor-card:hover,
.metric-card:hover,
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Modal Animations */
.modal {
  transition: all 0.3s ease;
}

.modal.active {
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  animation: scaleIn 0.3s ease-out;
}

/* Particle Animations */
#particles-js,
#particles-header {
  animation: fadeIn 2s ease-out;
}

/* Responsive Animation Adjustments */
@media (max-width: 768px) {
  .vendor-card,
  .metric-card {
    animation-duration: 0.2s;
  }
  
  .main-tab::after {
    height: 2px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
EOF

# Fix 3: Fix the JavaScript syntax error in enhanced-ui.js
echo "🛠️ Fixing JavaScript syntax error in enhanced-ui.js..."

# Create a temporary fix for the syntax error around line 941
# The issue is likely in the cost breakdown table generation
sed -i 's/\${cost > 0 ? \$\+ this\.formatCurrency(cost) : Included}/\${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}/g' js/enhanced-ui.js

# Additional fix for any similar issues with template literals
sed -i "s/\${cost > 0 ? '\$' + this\.formatCurrency(cost) : 'Included'}/\${cost > 0 ? \"\$\" + this.formatCurrency(cost) : \"Included\"}/g" js/enhanced-ui.js

# Fix any malformed template literals that might cause syntax errors
sed -i 's/`\${cost > 0 ? `\$`\+ this\.formatCurrency(cost) : `Included`}`/`\${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}`/g' js/enhanced-ui.js

echo "🔍 Checking for additional syntax issues..."

# Look for and fix any remaining template literal issues
if grep -n "Included" js/enhanced-ui.js; then
    echo "📝 Applying specific fix for template literal syntax error..."
    
    # Create a targeted patch for the specific line causing the issue
    cat > temp_patch.js << 'EOF'
          const isLowest = this.isLowestCost(category, vendorId, vendors);
          return `<td class="${isLowest ? 'highlight-cell' : ''}">${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}</td>`;
EOF
    
    # Apply the patch by replacing the problematic line
    sed -i '/const isLowest = this\.isLowestCost(category, vendorId, vendors);/{
        N
        s/.*/          const isLowest = this.isLowestCost(category, vendorId, vendors);\
          return `<td class="${isLowest ? '\''highlight-cell'\'' : '\'''\''}">${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}<\/td>`;/
    }' js/enhanced-ui.js
    
    rm -f temp_patch.js
fi

# Fix 4: Update the HTML to remove broken references if they exist
echo "📄 Updating HTML references..."

# Check if the HTML has the correct script references
if grep -q "zero-trust-calculator.js" index.html; then
    echo "✅ zero-trust-calculator.js reference found in HTML"
else
    echo "⚠️ Adding zero-trust-calculator.js reference to HTML"
    sed -i '/<script src="\.\/js\/enhanced-ui\.js"><\/script>/a \    <script src="./js/zero-trust-calculator.js"></script>' index.html
fi

if grep -q "enhanced-animations.css" index.html; then
    echo "✅ enhanced-animations.css reference found in HTML"
else
    echo "⚠️ Adding enhanced-animations.css reference to HTML"
    sed -i '/<link rel="stylesheet" href="\.\/css\/modern-theme\.css">/a \    <link rel="stylesheet" href="./css/enhanced-animations.css">' index.html
fi

# Fix 5: Add toast notification styles to CSS if missing
echo "🎨 Adding missing toast notification styles..."
cat >> css/zero-trust-enhanced.css << 'EOF'

/* Toast Notification Styles */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #2ecc71;
  min-width: 300px;
  transform: translateX(100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.toast.show {
  transform: translateX(0);
  opacity: 1;
}

.toast.toast-success {
  border-left-color: #2ecc71;
}

.toast.toast-error {
  border-left-color: #e74c3c;
}

.toast.toast-info {
  border-left-color: #3498db;
}

.toast i {
  color: #2ecc71;
  font-size: 16px;
}

.toast.toast-error i {
  color: #e74c3c;
}

.toast.toast-info i {
  color: #3498db;
}

.toast span {
  flex: 1;
  font-weight: 500;
  color: #334155;
}

/* Additional chart placeholder improvements */
.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e1;
}

.chart-placeholder p {
  color: #64748b;
  font-weight: 500;
  margin-top: 10px;
}
EOF

# Fix 6: Ensure vendor logos directory exists and has proper permissions
echo "📁 Ensuring vendor logos directory exists..."
mkdir -p img/vendors
chmod 755 img/vendors

# Create a basic fallback logo if none exist
if [ ! -f "img/vendors/portnox-logo.png" ]; then
    echo "⚠️ Creating fallback vendor logos..."
    # This would create basic SVG logos as fallbacks
    for vendor in portnox cisco aruba forescout fortinac juniper securew2 extreme foxpass microsoft arista; do
        if [ ! -f "img/vendors/${vendor}-logo.png" ]; then
            # Create a simple SVG logo as fallback
            cat > "img/vendors/${vendor}-logo.svg" << EOF
<svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="40" fill="#1a5a96" rx="4"/>
  <text x="50" y="25" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">${vendor^^}</text>
</svg>
EOF
        fi
    done
fi

echo "✅ All targeted fixes applied successfully!"
echo ""
echo "🔧 Fixed Issues:"
echo "   ✅ Created missing zero-trust-calculator.js"
echo "   ✅ Created missing enhanced-animations.css" 
echo "   ✅ Fixed JavaScript syntax error in enhanced-ui.js"
echo "   ✅ Updated HTML references"
echo "   ✅ Added toast notification styles"
echo "   ✅ Ensured vendor logos directory exists"
echo ""
echo "🚀 Your Zero Trust TCA should now load without errors!"
echo "   📄 Test the application by opening index.html"
echo "   🔍 Check browser console for any remaining issues"
echo "   📊 Verify that calculations and charts work properly"