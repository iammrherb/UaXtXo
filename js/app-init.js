/**
 * Application Initialization
 * Ensures dashboard content displays properly
 */

// Initialize the application
function initializeApp() {
    console.log('Initializing NAC Total Cost Analyzer...');
    
    // Create dashboard container if it doesn't exist
    let mainContent = document.querySelector('.main-content');
    if (!mainContent) {
        mainContent = document.createElement('main');
        mainContent.className = 'main-content';
        mainContent.id = 'dashboard-content';
        document.querySelector('.app-container').appendChild(mainContent);
    }
    
    // Create basic dashboard structure
    mainContent.innerHTML = `
        <section class="executive-summary">
            <div class="section-header">
                <h2>Executive Summary</h2>
                <div class="audience-badge">Multi-Vendor TCO Comparison</div>
            </div>
            
            <div id="kpi-grid" class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-icon" style="background-color: #2196F320; color: #2196F3">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="kpi-content">
                        <div class="kpi-title">TCO Reduction</div>
                        <div class="kpi-value">Calculate</div>
                        <div class="kpi-subtitle">Launch wizard to start</div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-icon" style="background-color: #4CAF5020; color: #4CAF50">
                        <i class="fas fa-percent"></i>
                    </div>
                    <div class="kpi-content">
                        <div class="kpi-title">ROI</div>
                        <div class="kpi-value">Calculate</div>
                        <div class="kpi-subtitle">Launch wizard to start</div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-icon" style="background-color: #FF980020; color: #FF9800">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="kpi-content">
                        <div class="kpi-title">Risk Reduction</div>
                        <div class="kpi-value">Calculate</div>
                        <div class="kpi-subtitle">Launch wizard to start</div>
                    </div>
                </div>
                
                <div class="kpi-card">
                    <div class="kpi-icon" style="background-color: #9C27B020; color: #9C27B0">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="kpi-content">
                        <div class="kpi-title">Deployment Time</div>
                        <div class="kpi-value">Calculate</div>
                        <div class="kpi-subtitle">Launch wizard to start</div>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="welcome-message">
            <h3>Welcome to the NAC Total Cost Analyzer</h3>
            <p>Click "Launch TCO Wizard" to begin your analysis, or "Skip to Dashboard" to explore the interface.</p>
        </div>
    `;
    
    // Set up button handlers
    setupButtonHandlers();
    
    console.log('Application initialized successfully');
}

// Set up button click handlers
function setupButtonHandlers() {
    // Launch TCO Wizard button
    const launchWizardBtn = document.getElementById('launch-wizard');
    if (launchWizardBtn) {
        launchWizardBtn.addEventListener('click', function() {
            console.log('Launch wizard clicked');
            
            // Try to open the wizard using various methods
            if (typeof TCOWizard !== 'undefined' && TCOWizard.openWizard) {
                TCOWizard.openWizard();
            } else if (typeof WizardController !== 'undefined' && WizardController.openWizard) {
                WizardController.openWizard();
            } else {
                // Create a simple wizard modal if none exists
                showSimpleWizard();
            }
        });
    }
    
    // Skip to Dashboard button
    const skipBtn = document.getElementById('skip-to-dashboard');
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            console.log('Skip to dashboard clicked');
            showDashboard();
        });
    }
    
    // Export Analysis button
    const exportBtn = document.getElementById('export-report');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Please complete the TCO analysis first before exporting.');
        });
    }
}

// Show simple wizard if main wizard isn't available
function showSimpleWizard() {
    alert('The TCO Wizard will guide you through the analysis. This feature is being loaded...');
}

// Show dashboard
function showDashboard() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.innerHTML += `
            <section class="dashboard-note">
                <h3>Dashboard View</h3>
                <p>Complete the TCO Wizard to see detailed analysis and comparison charts.</p>
            </section>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Also initialize if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeApp();
}
