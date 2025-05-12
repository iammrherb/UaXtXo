#!/bin/bash

# Updated NAC Wizard Fix Script
# Fixes for the issues found during execution

echo "=== Starting Updated NAC Wizard Fix ==="

# Create backup directory
BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
echo "Created backup directory: $BACKUP_DIR"

# Step 1: Fix remaining image path issues
echo "=== Step 1: Fixing image path issues ==="

# Fix absolute paths in image sources - now using a safer approach
if grep -q 'src="/img/' index.html; then
  sed -i 's|src="/img/|src="img/|g' index.html
  echo "Fixed absolute image paths in index.html"
else
  echo "No absolute image paths found in index.html"
fi

# Step 2: Fix remaining JavaScript syntax errors
echo "=== Step 2: Fixing JavaScript syntax errors ==="

# Fix unexpected token in charts.js
if [ -f "js/components/charts.js" ]; then
  echo "Fixing charts.js..."
  
  # Back up charts.js
  cp "js/components/charts.js" "$BACKUP_DIR/charts.js"
  
  # Check line 842 for the issue
  line_842=$(sed -n '842p' "js/components/charts.js" 2>/dev/null)
  
  if [[ "$line_842" == *"Chart.defaults.animation.duration = data.duration;"* ]]; then
    # Replace problematic line with safer code
    awk 'NR==842 {print "    if (Chart.defaults && Chart.defaults.animation) {"; print "      Chart.defaults.animation.duration = data && data.duration ? data.duration : 1000;"; print "    }"} NR!=842 {print}' "js/components/charts.js" > "$BACKUP_DIR/charts.js.new"
    mv "$BACKUP_DIR/charts.js.new" "js/components/charts.js"
    echo "Fixed unexpected token in charts.js"
  else
    # Try another approach - find line with animation duration
    line_num=$(grep -n "animation.duration" "js/components/charts.js" | head -1 | cut -d: -f1)
    if [ -n "$line_num" ]; then
      # Replace the line with safer code
      awk -v line="$line_num" 'NR==line {print "    if (Chart.defaults && Chart.defaults.animation) {"; print "      Chart.defaults.animation.duration = data && data.duration ? data.duration : 1000;"; print "    }"} NR!=line {print}' "js/components/charts.js" > "$BACKUP_DIR/charts.js.new"
      mv "$BACKUP_DIR/charts.js.new" "js/components/charts.js"
      echo "Fixed animation duration line in charts.js"
    else
      echo "Could not find animation duration line in charts.js"
    fi
  fi
else
  echo "Warning: charts.js not found"
fi

# Step 3: Create chart fix script
echo "=== Step 3: Creating chart reuse fix ==="

mkdir -p js/fixes
cat > js/fixes/chart-fix.js << 'EOF'
/**
 * Chart Fix
 * Prevents chart reuse errors
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chart fix script loaded');
  
  // Initialize chart instances tracker
  window.chartInstances = window.chartInstances || {};
  
  // Store original Chart constructor
  const OriginalChart = window.Chart;
  
  // Override Chart constructor to manage instances
  window.Chart = function(ctx, config) {
    // Get canvas ID
    const canvas = ctx.canvas || ctx;
    const canvasId = canvas.id || '';
    
    console.log(`Creating chart on canvas: ${canvasId}`);
    
    // Destroy existing chart if it exists
    if (canvasId && window.chartInstances[canvasId]) {
      console.log(`Destroying existing chart on canvas: ${canvasId}`);
      window.chartInstances[canvasId].destroy();
    }
    
    // Create new chart
    const chart = new OriginalChart(ctx, config);
    
    // Store chart instance
    if (canvasId) {
      window.chartInstances[canvasId] = chart;
    }
    
    return chart;
  };
  
  // Copy properties from original Chart
  for (const prop in OriginalChart) {
    if (OriginalChart.hasOwnProperty(prop)) {
      window.Chart[prop] = OriginalChart[prop];
    }
  }
});
EOF

# Step 4: Fix sensitivity.js chart reuse error
echo "=== Step 4: Fixing sensitivity.js chart reuse error ==="

if [ -f "js/components/sensitivity.js" ]; then
  # Back up sensitivity.js
  cp "js/components/sensitivity.js" "$BACKUP_DIR/sensitivity.js"
  
  # Look for createSensitivityChart function
  create_chart_line=$(grep -n "function createSensitivityChart" "js/components/sensitivity.js" | head -1 | cut -d: -f1)
  
  if [ -n "$create_chart_line" ]; then
    # Insert code to destroy existing chart after function definition
    awk -v line="$create_chart_line" 'NR==line {print $0; print "  // Check if chart instance already exists and destroy it"; print "  if (window.chartInstances && window.chartInstances[chartId]) {"; print "    window.chartInstances[chartId].destroy();"; print "  }"} NR!=line {print}' "js/components/sensitivity.js" > "$BACKUP_DIR/sensitivity.js.new"
    mv "$BACKUP_DIR/sensitivity.js.new" "js/components/sensitivity.js"
    echo "Added chart instance check to sensitivity.js"
  else
    echo "Could not find createSensitivityChart function in sensitivity.js"
  fi
else
  echo "Warning: sensitivity.js not found"
fi

# Step 5: Add new vendors to the vendor cards
echo "=== Step 5: Adding new vendors to the vendor cards ==="

# Check vendor card structure to find the right place to insert
no_nac_line=$(grep -n "vendor-card no-nac" index.html | head -1 | cut -d: -f1)

if [ -n "$no_nac_line" ]; then
  echo "Found 'no-nac' vendor card at line $no_nac_line"
  
  # Create new vendor cards
  new_cards=$(cat << 'EOF'
                        <div class="vendor-card animate-card" data-vendor="juniper">
                            <div class="vendor-logo">
                                <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                            </div>
                            <div class="vendor-info">
                                <h3>Juniper Mist</h3>
                                <p>AI-Driven Access Assurance</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="foxpass">
                            <div class="vendor-logo">
                                <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                            </div>
                            <div class="vendor-info">
                                <h3>Foxpass</h3>
                                <p>Cloud RADIUS & LDAP</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="arista">
                            <div class="vendor-logo">
                                <img src="img/vendors/arista-logo.png" alt="Arista Agni">
                            </div>
                            <div class="vendor-info">
                                <h3>Arista Agni</h3>
                                <p>Network Access Control</p>
                            </div>
                        </div>
EOF
)
  
  # Insert new cards before the no-nac card
  awk -v line="$no_nac_line" -v cards="$new_cards" 'NR==line {print cards; print $0} NR!=line {print}' index.html > "$BACKUP_DIR/index.html.new"
  mv "$BACKUP_DIR/index.html.new" index.html
  echo "Added new vendor cards to index.html"
else
  echo "Could not find 'no-nac' vendor card in index.html"
  
  # Try an alternative approach - find vendor-grid and append to it
  vendor_grid_line=$(grep -n "vendor-grid" index.html | head -1 | cut -d: -f1)
  
  if [ -n "$vendor_grid_line" ]; then
    echo "Found vendor-grid at line $vendor_grid_line, looking for closing div"
    
    # Find closing div after vendor-grid
    end_line=$(tail -n +$vendor_grid_line index.html | grep -n "</div>" | head -1 | cut -d: -f1)
    
    if [ -n "$end_line" ]; then
      end_line=$((vendor_grid_line + end_line - 1))
      echo "Found closing div at line $end_line"
      
      # Create new vendor cards
      new_cards=$(cat << 'EOF'
                        <div class="vendor-card animate-card" data-vendor="juniper">
                            <div class="vendor-logo">
                                <img src="img/vendors/juniper-logo.png" alt="Juniper Mist">
                            </div>
                            <div class="vendor-info">
                                <h3>Juniper Mist</h3>
                                <p>AI-Driven Access Assurance</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="foxpass">
                            <div class="vendor-logo">
                                <img src="img/vendors/foxpass-logo.png" alt="Foxpass">
                            </div>
                            <div class="vendor-info">
                                <h3>Foxpass</h3>
                                <p>Cloud RADIUS & LDAP</p>
                            </div>
                        </div>
                        
                        <div class="vendor-card animate-card" data-vendor="arista">
                            <div class="vendor-logo">
                                <img src="img/vendors/arista-logo.png" alt="Arista Agni">
                            </div>
                            <div class="vendor-info">
                                <h3>Arista Agni</h3>
                                <p>Network Access Control</p>
                            </div>
                        </div>
EOF
)
      
      # Insert new cards before the closing div
      awk -v line="$end_line" -v cards="$new_cards" 'NR==line {print cards; print $0} NR!=line {print}' index.html > "$BACKUP_DIR/index.html.new"
      mv "$BACKUP_DIR/index.html.new" index.html
      echo "Added new vendor cards to index.html"
    else
      echo "Could not find closing div for vendor-grid in index.html"
    fi
  else
    echo "Could not find vendor-grid in index.html"
  fi
fi

# Step 6: Create compliance framework enhancement script
echo "=== Step 6: Creating compliance framework enhancement ==="

mkdir -p js/fixes
cat > js/fixes/compliance-fix.js << 'EOF'
/**
 * Compliance Framework Enhancement
 * Ensures all relevant compliance frameworks are available
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Compliance framework enhancement loaded');
  
  // Industry compliance mapping
  const industryFrameworks = {
    'healthcare': ['hipaa', 'hitech', 'gdpr', 'nist', 'iso27001'],
    'financial': ['pci', 'glba', 'soc2', 'gdpr', 'nist', 'iso27001'],
    'retail': ['pci', 'gdpr', 'ccpa', 'iso27001'],
    'education': ['ferpa', 'gdpr', 'nist', 'iso27001'],
    'government': ['fisma', 'fedramp', 'nist', 'cmmc', 'iso27001'],
    'manufacturing': ['nist', 'cmmc', 'iec62443', 'iso27001'],
    'energy': ['nerc', 'nist', 'iec62443', 'iso27001'],
    'technology': ['soc2', 'gdpr', 'ccpa', 'nist', 'iso27001']
  };
  
  // Framework details
  const frameworkDetails = {
    'hipaa': { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
    'hitech': { name: 'HITECH', description: 'Health Information Technology for Economic and Clinical Health Act' },
    'gdpr': { name: 'GDPR', description: 'General Data Protection Regulation' },
    'pci': { name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
    'glba': { name: 'GLBA', description: 'Gramm-Leach-Bliley Act' },
    'soc2': { name: 'SOC 2', description: 'Service Organization Control 2' },
    'nist': { name: 'NIST 800-53', description: 'National Institute of Standards and Technology Special Publication 800-53' },
    'iso27001': { name: 'ISO 27001', description: 'International Organization for Standardization 27001' },
    'ferpa': { name: 'FERPA', description: 'Family Educational Rights and Privacy Act' },
    'fisma': { name: 'FISMA', description: 'Federal Information Security Modernization Act' },
    'fedramp': { name: 'FedRAMP', description: 'Federal Risk and Authorization Management Program' },
    'cmmc': { name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' },
    'ccpa': { name: 'CCPA', description: 'California Consumer Privacy Act' },
    'iec62443': { name: 'IEC 62443', description: 'Industrial Network and System Security' },
    'nerc': { name: 'NERC CIP', description: 'North American Electric Reliability Corporation Critical Infrastructure Protection' }
  };
  
  // Get industry select element
  const industrySelect = document.getElementById('industry-select');
  if (industrySelect) {
    // Add change event listener
    industrySelect.addEventListener('change', function() {
      updateComplianceFrameworks(this.value);
    });
    
    // Update frameworks for initial value
    if (industrySelect.value) {
      updateComplianceFrameworks(industrySelect.value);
    }
  }
  
  // Function to update compliance frameworks based on industry
  function updateComplianceFrameworks(industry) {
    console.log(`Updating compliance frameworks for industry: ${industry}`);
    
    const frameworks = industryFrameworks[industry] || [];
    
    // Find compliance container
    const complianceContainer = document.getElementById('compliance-frameworks');
    if (!complianceContainer) {
      console.warn('Compliance frameworks container not found');
      return;
    }
    
    // Clear existing content
    let html = '';
    
    // Generate framework cards
    frameworks.forEach(framework => {
      const details = frameworkDetails[framework] || { name: framework.toUpperCase(), description: '' };
      
      html += `
        <div class="framework-card" data-framework="${framework}">
          <h3>${details.name}</h3>
          <p>${details.description}</p>
          <div class="framework-content">
            <p>Portnox Cloud helps achieve compliance with ${details.name} requirements.</p>
          </div>
        </div>
      `;
    });
    
    // Update container
    complianceContainer.innerHTML = html || '<p>No specific compliance frameworks for this industry.</p>';
    
    // Add click handlers
    document.querySelectorAll('.framework-card').forEach(card => {
      card.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    });
  }
});
EOF

# Create basic CSS for compliance frameworks
mkdir -p css/fixes
cat > css/fixes/compliance.css << 'EOF'
/* Styles for compliance framework cards */
.framework-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.framework-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.framework-card h3 {
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
}

.framework-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.framework-content {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: none;
}

.framework-card.active .framework-content {
  display: block;
}
EOF

# Step 7: Update index.html with all fixes
echo "=== Step 7: Updating index.html with all fixes ==="

# Add script references
if ! grep -q "chart-fix.js" index.html; then
  # Add script references before the closing head tag
  sed -i 's|</head>|    <script src="js/fixes/chart-fix.js"></script>\n    <script src="js/fixes/compliance-fix.js"></script>\n    <link rel="stylesheet" href="css/fixes/compliance.css">\n</head>|' index.html
  echo "Added script references to index.html"
fi

# Fix any equality operator issues in remaining files
echo "=== Step 8: Fixing any remaining equality operator issues ==="

for file in js/features/wizard/*.js js/wizards/*.js js/components/*.js; do
  if [ -f "$file" ]; then
    cp "$file" "$BACKUP_DIR/$(basename "$file")"
    sed -i 's/====/===/g' "$file"
    sed -i 's/===/==/g' "$file"
    echo "Fixed equality operators in $file"
  fi
done

echo "=== NAC Wizard Fix Complete ==="
echo "Refresh your browser to see the changes"
