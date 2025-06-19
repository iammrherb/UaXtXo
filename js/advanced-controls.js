// Advanced Controls Module
const AdvancedControls = {
    initialized: false,
    
    init() {
        if (this.initialized) return;
        
        console.log('🎛️ Initializing advanced controls...');
        
        this.createAdvancedFilters();
        this.createScenarioModeling();
        this.createSensitivityControls();
        
        this.initialized = true;
        console.log('✅ Advanced controls initialized');
    },
    
    createAdvancedFilters() {
        const container = document.getElementById('advanced-filters');
        if (!container) return;
        
        container.innerHTML = `
            <div class="advanced-filter-group">
                <h4>Advanced Filters</h4>
                <div class="filter-controls">
                    <label>
                        <input type="checkbox" id="filter-cloud-only">
                        Cloud Solutions Only
                    </label>
                    <label>
                        <input type="checkbox" id="filter-zero-trust">
                        Zero Trust Capable
                    </label>
                    <label>
                        <input type="checkbox" id="filter-ai-powered">
                        AI-Powered Solutions
                    </label>
                </div>
            </div>
        `;
    },
    
    createScenarioModeling() {
        const container = document.getElementById('scenario-modeling');
        if (!container) return;
        
        container.innerHTML = `
            <div class="scenario-controls">
                <h4>Scenario Modeling</h4>
                <div class="scenario-inputs">
                    <label>
                        Growth Rate (%):
                        <input type="range" id="growth-rate" min="0" max="50" value="10">
                        <span id="growth-rate-value">10%</span>
                    </label>
                    <label>
                        Security Incidents/Year:
                        <input type="range" id="incident-rate" min="0" max="10" value="2">
                        <span id="incident-rate-value">2</span>
                    </label>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('growth-rate')?.addEventListener('input', (e) => {
            document.getElementById('growth-rate-value').textContent = e.target.value + '%';
        });
        
        document.getElementById('incident-rate')?.addEventListener('input', (e) => {
            document.getElementById('incident-rate-value').textContent = e.target.value;
        });
    },
    
    createSensitivityControls() {
        const container = document.getElementById('sensitivity-controls');
        if (!container) return;
        
        container.innerHTML = `
            <div class="sensitivity-analysis">
                <h4>Sensitivity Analysis</h4>
                <button class="btn btn-secondary" onclick="AdvancedControls.runSensitivityAnalysis()">
                    Run Analysis
                </button>
            </div>
        `;
    },
    
    runSensitivityAnalysis() {
        console.log('Running sensitivity analysis...');
        // Trigger recalculation with variations
        if (window.platform) {
            window.platform.runSensitivityAnalysis();
        }
    }
};

// Register with ModuleLoader
if (window.ModuleLoader) {
    window.ModuleLoader.register('AdvancedControls', AdvancedControls);
}

window.AdvancedControls = AdvancedControls;
console.log('✅ Advanced Controls module loaded');
