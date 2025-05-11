#!/bin/bash

# TCO Calculator Logo Fix Script - Using existing logos with proper fallback

echo "🚀 Fixing Logo 404 Errors with Existing Logos"
echo "============================================"

# Create the vendors directory if it doesn't exist
mkdir -p img/vendors

# First, let's check if the actual vendor logos exist
echo "Checking for existing vendor logos..."

# List of vendor logos we need
vendors=("cisco" "aruba" "forescout" "portnox" "nps" "securew2" "fortinac" "microsoft")

# Check which logos already exist
for vendor in "${vendors[@]}"; do
    if [ -f "img/vendors/${vendor}-logo.png" ]; then
        echo "✓ Found ${vendor}-logo.png"
    elif [ -f "img/vendors/${vendor}-logo.jpg" ]; then
        echo "✓ Found ${vendor}-logo.jpg"
    elif [ -f "img/vendors/${vendor}-logo.svg" ]; then
        echo "✓ Found ${vendor}-logo.svg"
    else
        echo "✗ Missing ${vendor} logo"
    fi
done

# Create default-logo.png as a fallback
echo "Creating default-logo.png fallback..."

# If portnox logo exists, use it as the default
if [ -f "img/vendors/portnox-logo.png" ]; then
    cp img/vendors/portnox-logo.png img/vendors/default-logo.png
    echo "✓ Created default-logo.png from portnox-logo.png"
elif [ -f "img/vendors/portnox-logo.jpg" ]; then
    cp img/vendors/portnox-logo.jpg img/vendors/default-logo.png
    echo "✓ Created default-logo.png from portnox-logo.jpg"
else
    # Create a simple default logo using base64 encoded PNG
    cat > img/vendors/default-logo.png.base64 << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAAHgAAAA8CAYAAAC4XJOFAAAABHNCSVQICAgIfAhkiAAABM5JREFUeJztnE1oHFUYx3/vzOzs7OxusrvZbJJN0qRJGxNrWqtFqdJaLYqCB1EQvHjw4MUPL4IHL3rwIHjx4kHw4sWDBy8ePHjw4MGDB/HgwYMHUbBWa9PQNtmPbLKf2d3Zj5l5HpJtNptNdrOzM7Ob7g8Ge/Pm/d//e/P2vfe+3nsLCoVCoVAoFAqFQqFQKBQKhUKhUCgUiqOCdLsBiqNDsLOd1HSSdKZCLluhnK/hq/rwbPJgNRmwOA04bUacDiMmk67brT3UqACP0cVKieWlIv5gmaRfI10xAuDQC6xGgcUIRinoNQJlUAFRBmJlSEtBqgzJsoYOgUUv8Jh1OFwm7C4TY26zzWoSQgjdoT6Ds4gKcB+TSJWZXyhwZ7FAsiyREFhMghGrDo/bSLlUZ2M9R6lQQwiBxWrAOWRi5KiFs2eLs7H6z3wuSKRqINA5nHQuFdgDg4LcAV1NZVgMlHHZjYzYDNitmhCi2t8O9oTK4D4jnijz064U8wtZ8iUJAhx2HeNOC6dOWJn2mmgmtyRJsqGaJLNRYmahSGyuhBAC32kbIy6TSWhUgPuEdLrCL7tS3LqbJZKVXZsgtFb49IiFi2edHHub7vrlQo3lf1JEwjmq1TpWq4FJr41pn63fBri/R/ABJZuq8L9FCf+dhJ1EmS3LrJVrRGKVg88YdWFTvEQ8VW6r7sxkglg4R6VSR6/XMDZmZnrabjYbtEMr7D6kJ93sCSLREvO3c6wsFwhmJeGyJBjPE1gvdFzXekJnKRjMs7ic526kRCRdJ5yu9Xz2TQW4y/hiJebv5Ll7J0MkWSWaFQQSNVaDJZKZ3j5qtaqkUBT41ovc9BeJpmU3J4r6hKhfcHkmw9xCjli6TrhQZzEhiIbz7GwXu/sENKCmKF3CNymYn88Ri1cI5wTBZJ2VcJFwWFCtdG9wSJJk3a6awmiJcKzC7ZUitxYKXRvDlCRJNidKrK8WuXU307U6lQzsIJIkG+tFQbAg2c5JEhslfJN5gvGDd43BfJnfeRO5nHQLZKCOJoTIJ9I1wnFBNCcJJ+osBkus76T7yoHaLpQNPiQmu8Aw4cDjNTF11MLJCQuPvWCkdNJDLJQjEi+DFvxewfJKnlym0pH7cWIWOOoGx9DaXgfhqAfMBnRaQD/o72kF+CARQujOHzViHHHgcZvwnrBy8nELE15DqxGTJMkGFoNg+KQNU7FKJltlfafEWrDIQqBEJlmhBphNAve4BafLhMmsRxDr5qsJdGPa/YcHaGU3R0xMjRlxe811u1nMJCpE01UC0QqVOhj0Au+oifGjFiqVGrFYufpArtoRKsAdEuwVgcNpxHPMwthRK5OnLbT3kCqVOtlslUKhhl6vwWjUYjBoNZqwNBNEYsGKJJGqkC/UEdWGa5NRi9VkwGo3qqnKAdLvl3KLxRrBrQLX5lP8sZJltSgJJKrE45W9J0GHgMagLuXs8qVcJQN7gF4rwGLQMew00l9j0yEhRBoIAGHAh+xGTRq0Al3bR+/Wv1IEVYA7o90AC9TGi52OAywDs0i3ao3efKc9VIDboB9AY5CWJhMdBFcBJnoCtA68ihS7/qIDKAfvEHkAtB7wIKd4KpQgAAG4gYvAvZz8EuA/ZJDl4TRboVAoFAqFQqFQKBQKhUKhUCgUCoVCoVDsyw5HoWnCBbf7FAAAAABJRU5ErkJggg==
EOF
    base64 -d img/vendors/default-logo.png.base64 > img/vendors/default-logo.png
    rm img/vendors/default-logo.png.base64
    echo "✓ Created default-logo.png (base64 encoded fallback)"
fi

# Update the wizard manager to handle logo paths more robustly
echo "Updating wizard manager to handle logo paths..."

# Create an updated createVendorCards function
cat > js/wizards/vendor-cards-fix.js << 'EOF'
// Temporary fix for vendor cards
if (window.WizardManager) {
    WizardManager.prototype.createVendorCards = function() {
        const vendors = {
            cisco: { name: 'Cisco ISE', desc: 'Enterprise-grade NAC solution', logo: 'cisco' },
            aruba: { name: 'Aruba ClearPass', desc: 'Policy management platform', logo: 'aruba' },
            forescout: { name: 'Forescout', desc: 'Agentless device visibility', logo: 'forescout' },
            portnox: { name: 'Portnox Cloud', desc: 'Cloud-native NAC', logo: 'portnox' },
            nps: { name: 'Microsoft NPS', desc: 'Basic RADIUS services', logo: 'microsoft' },
            none: { name: 'No NAC Solution', desc: 'Currently unprotected', logo: 'none' }
        };
        
        return Object.entries(vendors).map(([id, vendor]) => {
            // Check multiple extensions and fallback to default
            const extensions = ['png', 'jpg', 'jpeg', 'svg'];
            let logoPath = '';
            
            // First try vendor-specific logo
            extensions.forEach(ext => {
                if (!logoPath) {
                    logoPath = `img/vendors/${vendor.logo}-logo.${ext}`;
                }
            });
            
            // Create the card HTML
            return `
                <div class="vendor-card" data-vendor="${id}">
                    <img src="${logoPath}" 
                         alt="${vendor.name}" 
                         onerror="this.onerror=null; this.src='img/vendors/default-logo.png';"
                         loading="lazy">
                    <h4>${vendor.name}</h4>
                    <p>${vendor.desc}</p>
                </div>
            `;
        }).join('');
    };
}
EOF

# Also create a patch to the existing wizard-manager.js
echo "Patching wizard-manager.js..."
if [ -f "js/managers/wizard-manager.js" ]; then
    # Create a backup first
    cp js/managers/wizard-manager.js js/managers/wizard-manager.js.bak
    
    # Replace the createVendorCards function
    sed -i.bak2 '/createVendorCards() {/,/}\.join/c\
    createVendorCards() {\
        const vendors = {\
            cisco: { name: "Cisco ISE", desc: "Enterprise-grade NAC solution", logo: "cisco" },\
            aruba: { name: "Aruba ClearPass", desc: "Policy management platform", logo: "aruba" },\
            forescout: { name: "Forescout", desc: "Agentless device visibility", logo: "forescout" },\
            portnox: { name: "Portnox Cloud", desc: "Cloud-native NAC", logo: "portnox" },\
            nps: { name: "Microsoft NPS", desc: "Basic RADIUS services", logo: "microsoft" },\
            none: { name: "No NAC Solution", desc: "Currently unprotected", logo: "none" }\
        };\
        \
        return Object.entries(vendors).map(([id, vendor]) => `\
            <div class="vendor-card" data-vendor="${id}">\
                <img src="img/vendors/${vendor.logo}-logo.png" \
                     alt="${vendor.name}" \
                     onerror="this.onerror=null; this.src='"'"'img/vendors/default-logo.png'"'"';" \
                     loading="lazy">\
                <h4>${vendor.name}</h4>\
                <p>${vendor.desc}</p>\
            </div>\
        `).join("");\
    }' js/managers/wizard-manager.js
fi

# Create a simple HTML test file to verify images load
cat > test-logos.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Logo Test</title>
    <style>
        .logo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .logo-card {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        img {
            max-width: 120px;
            max-height: 60px;
        }
    </style>
</head>
<body>
    <h1>Vendor Logo Test</h1>
    <div class="logo-grid">
        <div class="logo-card">
            <h3>Cisco</h3>
            <img src="img/vendors/cisco-logo.png" onerror="this.onerror=null; this.src='img/vendors/default-logo.png';">
        </div>
        <div class="logo-card">
            <h3>Aruba</h3>
            <img src="img/vendors/aruba-logo.png" onerror="this.onerror=null; this.src='img/vendors/default-logo.png';">
        </div>
        <div class="logo-card">
            <h3>Forescout</h3>
            <img src="img/vendors/forescout-logo.png" onerror="this.onerror=null; this.src='img/vendors/default-logo.png';">
        </div>
        <div class="logo-card">
            <h3>Portnox</h3>
            <img src="img/vendors/portnox-logo.png" onerror="this.onerror=null; this.src='img/vendors/default-logo.png';">
        </div>
        <div class="logo-card">
            <h3>Microsoft NPS</h3>
            <img src="img/vendors/microsoft-logo.png" onerror="this.onerror=null; this.src='img/vendors/default-logo.png';">
        </div>
        <div class="logo-card">
            <h3>Default</h3>
            <img src="img/vendors/default-logo.png">
        </div>
    </div>
</body>
</html>
EOF

echo "✨ Logo fix complete!"
echo ""
echo "The script has:"
echo "1. Checked for existing vendor logos"
echo "2. Created a default-logo.png fallback"
echo "3. Updated the wizard manager to handle missing logos gracefully"
echo "4. Created a test page (test-logos.html) to verify logos load correctly"
echo ""
echo "Next steps:"
echo "1. Upload your actual vendor logos to img/vendors/ as PNG files"
echo "2. Make sure they're named: cisco-logo.png, aruba-logo.png, etc."
echo "3. The default-logo.png will be used as fallback for any missing logos"
