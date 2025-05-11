#!/bin/bash

# Force content to display
echo "🔧 Forcing content to display..."

# 1. Create diagnostic and force display script
cat > js/force-display.js << 'EOF'
/**
 * Force Display Script
 * Diagnoses issues and forces content to show
 */

console.log('Force display script starting...');

// Diagnostic function
function diagnoseDOM() {
    console.log('=== DOM Diagnostic ===');
    console.log('Body:', document.body);
    console.log('App container:', document.querySelector('.app-container'));
    console.log('Main content:', document.querySelector('.main-content'));
    console.log('Dashboard content:', document.getElementById('dashboard-content'));
    
    // Check what's hidden
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') {
            console.log('Hidden element:', el.className || el.id || el.tagName);
        }
    });
}

// Force content to display
function forceDisplay() {
    console.log('Forcing content display...');
    
    // Find or create main container
    let appContainer = document.querySelector('.app-container');
    if (!appContainer) {
        appContainer = document.body;
    }
    
    // Create main content if it doesn't exist
    let mainContent = document.querySelector('.main-content');
    if (!mainContent) {
        mainContent = document.createElement('main');
        mainContent.className = 'main-content';
        mainContent.id = 'dashboard-content';
        appContainer.appendChild(mainContent);
    }
    
    // Force visibility
    mainContent.style.display = 'block';
    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';
    
    // Add content
    mainContent.innerHTML = `
        <div style="padding: 20px; background: #f5f5f5; border: 2px solid #ddd; margin: 20px 0;">
            <h2 style="color: #333;">NAC Total Cost Analyzer</h2>
            <p style="color: #666;">Dashboard is loading...</p>
        </div>
        
        <section class="executive-summary" style="margin: 20px 0;">
            <h2 style="color: #333;">Executive Summary</h2>
            <div id="kpi-grid" class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                ${createKPICards()}
            </div>
        </section>
        
        <div class="instructions" style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2;">Getting Started</h3>
            <ol>
                <li>Click "Launch TCO Wizard" to start your analysis</li>
                <li>Follow the wizard steps to input your data</li>
                <li>View results on the dashboard</li>
            </ol>
        </div>
    `;
    
    // Also ensure header buttons are visible
    const headerButtons = document.querySelectorAll('button');
    headerButtons.forEach(btn => {
        btn.style.visibility = 'visible';
        btn.style.display = 'inline-block';
    });
    
    console.log('Content forced to display');
}

// Create KPI cards
function createKPICards() {
    const kpis = [
        { icon: 'fa-chart-line', title: 'TCO Reduction', value: 'TBD', color: '#2196F3' },
        { icon: 'fa-percent', title: 'ROI', value: 'TBD', color: '#4CAF50' },
        { icon: 'fa-shield-alt', title: 'Risk Reduction', value: 'TBD', color: '#FF9800' },
        { icon: 'fa-clock', title: 'Deployment Time', value: 'TBD', color: '#9C27B0' }
    ];
    
    return kpis.map(kpi => `
        <div class="kpi-card" style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 48px; height: 48px; border-radius: 8px; background: ${kpi.color}20; color: ${kpi.color}; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                    <i class="fas ${kpi.icon}"></i>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">${kpi.title}</div>
                    <div style="font-size: 24px; font-weight: bold; color: #333;">${kpi.value}</div>
                    <div style="font-size: 12px; color: #888;">Click wizard to calculate</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Set up button handlers
function setupButtons() {
    const launchBtn = document.getElementById('launch-wizard');
    if (launchBtn) {
        launchBtn.onclick = function() {
            console.log('Launch wizard clicked');
            
            // Try different ways to open wizard
            if (typeof TCOWizard !== 'undefined') {
                console.log('Using TCOWizard');
                if (TCOWizard.openWizard) TCOWizard.openWizard();
                else if (TCOWizard.open) TCOWizard.open();
                else if (TCOWizard.init) TCOWizard.init();
            } else if (typeof WizardController !== 'undefined') {
                console.log('Using WizardController');
                if (WizardController.openWizard) WizardController.openWizard();
                else if (WizardController.open) WizardController.open();
                else if (WizardController.init) WizardController.init();
            } else {
                console.log('No wizard found');
                showWizardMessage();
            }
        };
    }
    
    const skipBtn = document.getElementById('skip-to-dashboard');
    if (skipBtn) {
        skipBtn.onclick = function() {
            console.log('Skip clicked');
            forceDisplay();
        };
    }
}

// Show wizard message
function showWizardMessage() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
    `;
    
    modal.innerHTML = `
        <h3>TCO Wizard</h3>
        <p>The wizard component is loading. Please try again in a moment.</p>
        <button onclick="this.parentElement.remove()" style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">OK</button>
    `;
    
    document.body.appendChild(modal);
}

// Execute everything
function initialize() {
    diagnoseDOM();
    forceDisplay();
    setupButtons();
}

// Run on multiple events to ensure it works
document.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('load', initialize);

// Also run immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initialize();
}

// Run after a delay as fallback
setTimeout(initialize, 1000);

console.log('Force display script loaded');
EOF

# 2. Create override CSS to ensure visibility
cat > css/force-visibility.css << 'EOF'
/* Force visibility of main elements */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

.main-content,
#dashboard-content {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    min-height: 500px;
    padding: 20px;
}

.app-container {
    display: block !important;
    visibility: visible !important;
}

/* Ensure buttons are visible */
button {
    visibility: visible !important;
    display: inline-block !important;
}

/* Hide only broken images */
img[src*="404"],
img[src*="undefined"] {
    display: none !important;
}

/* Basic layout */
.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.header-actions {
    display: flex;
    gap: 10px;
}

/* Button styles */
.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background: #2196F3;
    color: white;
}

.btn-outline {
    background: white;
    border: 1px solid #2196F3;
    color: #2196F3;
}

/* KPI grid */
.kpi-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 20px 0;
}
EOF

# 3. Create simple test HTML to verify
cat > test-simple.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>NAC Analyzer Test</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .kpi-card { border: 1px solid #ddd; padding: 20px; margin: 10px; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>NAC Total Cost Analyzer - Test Page</h1>
    <div id="dashboard-content">
        <h2>If you can see this, the basic HTML works</h2>
        <div class="kpi-card">
            <i class="fas fa-chart-line"></i> Test KPI Card
        </div>
    </div>
    <script>
        console.log('Test page loaded');
    </script>
</body>
</html>
EOF

# 4. Create the apply script
cat > apply-force-display.sh << 'EOF'
#!/bin/bash

echo "Applying force display fix..."

# Add force display script
if ! grep -q "force-display.js" index.html; then
    # Add it as the LAST script before </body>
    sed -i '/<\/body>/i <script src="js/force-display.js"></script>' index.html
fi

# Add force visibility CSS
if ! grep -q "force-visibility.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="css/force-visibility.css">' index.html
fi

echo "Force display fix applied!"
echo ""
echo "1. Clear ALL browser data (Ctrl+Shift+Delete)"
echo "2. Close and reopen browser"
echo "3. Navigate to your page"
echo ""
echo "If still not working, open test-simple.html to verify basic functionality"
EOF

chmod +x apply-force-display.sh

echo "✅ Force display fix created!"
echo ""
echo "This is a more aggressive fix that:"
echo "1. Diagnoses what's in your DOM"
echo "2. Forces content to display"
echo "3. Overrides any CSS hiding content"
echo ""
echo "To apply:"
echo "1. Run: ./apply-force-display.sh"
echo "2. Clear ALL browser data (not just cache)"
echo "3. Restart browser and reload page"
echo ""
echo "Check browser console for diagnostic information"
echo ""
echo "Also try: Open test-simple.html to verify basic HTML works"
