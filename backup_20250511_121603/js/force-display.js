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
