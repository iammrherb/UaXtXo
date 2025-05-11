/**
 * Configuration UI Controller
 * Manages configuration interface and settings
 */

const ConfigurationController = (function() {
    let currentConfig = null;
    
    function init() {
        setupEventListeners();
        loadConfiguration();
    }
    
    function setupEventListeners() {
        // Configuration button
        const configBtn = document.getElementById('configuration-btn');
        if (configBtn) {
            configBtn.addEventListener('click', openConfiguration);
        }
        
        // Close button
        const closeBtn = document.getElementById('close-config');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeConfiguration);
        }
    }
    
    function openConfiguration() {
        const modal = document.getElementById('configuration-modal');
        if (modal) {
            modal.classList.add('visible');
            renderConfigurationForm();
        }
    }
    
    function closeConfiguration() {
        const modal = document.getElementById('configuration-modal');
        if (modal) {
            modal.classList.remove('visible');
        }
    }
    
    function loadConfiguration() {
        // Load saved configuration or defaults
        const saved = localStorage.getItem('tco-config');
        if (saved) {
            currentConfig = JSON.parse(saved);
        } else {
            currentConfig = getDefaultConfiguration();
        }
    }
    
    function getDefaultConfiguration() {
        return {
            general: {
                currency: 'USD',
                dateFormat: 'MM/DD/YYYY',
                numberFormat: 'en-US'
            },
            calculations: {
                discountRate: 8,
                inflationRate: 2.5,
                defaultYears: 3
            },
            display: {
                theme: 'light',
                showTooltips: true,
                animateCharts: true
            }
        };
    }
    
    function renderConfigurationForm() {
        const modalBody = document.querySelector('#configuration-modal .modal-body');
        if (!modalBody) return;
        
        const html = `
            <form id="configuration-form">
                <div class="config-section">
                    <h3>General Settings</h3>
                    <div class="form-group">
                        <label for="currency">Currency</label>
                        <select id="currency" name="currency" class="form-control">
                            <option value="USD" ${currentConfig.general.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                            <option value="EUR" ${currentConfig.general.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                            <option value="GBP" ${currentConfig.general.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
                        </select>
                    </div>
                </div>
                
                <div class="config-section">
                    <h3>Calculation Parameters</h3>
                    <div class="form-group">
                        <label for="discount-rate">Discount Rate (%)</label>
                        <input type="number" id="discount-rate" name="discountRate" 
                               value="${currentConfig.calculations.discountRate}" 
                               min="0" max="20" step="0.5" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="inflation-rate">Inflation Rate (%)</label>
                        <input type="number" id="inflation-rate" name="inflationRate" 
                               value="${currentConfig.calculations.inflationRate}" 
                               min="0" max="10" step="0.1" class="form-control">
                    </div>
                </div>
                
                <div class="config-section">
                    <h3>Display Options</h3>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="showTooltips" 
                                   ${currentConfig.display.showTooltips ? 'checked' : ''}>
                            Show Tooltips
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="animateCharts" 
                                   ${currentConfig.display.animateCharts ? 'checked' : ''}>
                            Animate Charts
                        </label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="ConfigurationController.resetDefaults()">
                        Reset to Defaults
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Save Configuration
                    </button>
                </div>
            </form>
        `;
        
        modalBody.innerHTML = html;
        
        // Add form submit handler
        const form = document.getElementById('configuration-form');
        form.addEventListener('submit', handleConfigurationSubmit);
    }
    
    function handleConfigurationSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        // Update configuration
        currentConfig.general.currency = formData.get('currency');
        currentConfig.calculations.discountRate = parseFloat(formData.get('discountRate'));
        currentConfig.calculations.inflationRate = parseFloat(formData.get('inflationRate'));
        currentConfig.display.showTooltips = formData.get('showTooltips') === 'on';
        currentConfig.display.animateCharts = formData.get('animateCharts') === 'on';
        
        // Save configuration
        saveConfiguration();
        
        // Close modal
        closeConfiguration();
        
        // Refresh dashboard if needed
        if (typeof DashboardController !== 'undefined') {
            DashboardController.updateKPIs();
        }
    }
    
    function saveConfiguration() {
        localStorage.setItem('tco-config', JSON.stringify(currentConfig));
    }
    
    function resetDefaults() {
        currentConfig = getDefaultConfiguration();
        renderConfigurationForm();
    }
    
    // Public API
    return {
        init,
        openConfiguration,
        closeConfiguration,
        resetDefaults,
        getConfig: () => currentConfig
    };
})();

// Export for use in other modules
window.ConfigurationController = ConfigurationController;
