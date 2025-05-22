/**
 * Executive Dashboard Redesign - Remove Sidebar, Integrate Vendor Selection
 */

// Remove sidebar and integrate vendor selection into main interface
function redesignExecutiveDashboard() {
  console.log('🎨 Redesigning executive dashboard layout...');
  
  // Hide the existing sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.style.display = 'none';
  }
  
  // Expand main content to full width
  const mainContainer = document.querySelector('.main-container');
  if (mainContainer) {
    mainContainer.style.marginLeft = '0';
    mainContainer.style.width = '100%';
  }
  
  const contentArea = document.querySelector('.content-area');
  if (contentArea) {
    contentArea.style.marginLeft = '0';
    contentArea.style.width = '100%';
  }
  
  // Add vendor selection to the executive tab interface
  addVendorSelectionToTabs();
  
  // Convert customize button to settings popup
  setupCustomizePopup();
  
  console.log('✅ Layout redesign complete');
}

function addVendorSelectionToTabs() {
  // Find the existing vendor toggles or create new ones
  const tabFilters = document.querySelector('.tab-filters');
  if (tabFilters) {
    // Enhance existing vendor toggles
    const vendorToggles = tabFilters.querySelector('.vendor-toggles');
    if (vendorToggles) {
      vendorToggles.style.display = 'flex';
      vendorToggles.style.gap = '0.5rem';
      vendorToggles.style.flexWrap = 'wrap';
      vendorToggles.style.justifyContent = 'center';
    }
  }
}

function setupCustomizePopup() {
  // Create settings popup HTML
  const settingsPopup = document.createElement('div');
  settingsPopup.id = 'settings-popup';
  settingsPopup.className = 'settings-popup hidden';
  settingsPopup.innerHTML = `
    <div class="settings-overlay" onclick="closeSettingsPopup()"></div>
    <div class="settings-modal">
      <div class="settings-header">
        <h3><i class="fas fa-cogs"></i> Dashboard Settings</h3>
        <button onclick="closeSettingsPopup()" class="close-btn">&times;</button>
      </div>
      
      <div class="settings-content">
        <div class="settings-tabs">
          <button class="settings-tab active" data-settings-tab="organization">
            <i class="fas fa-building"></i> Organization
          </button>
          <button class="settings-tab" data-settings-tab="costs">
            <i class="fas fa-dollar-sign"></i> Cost Parameters
          </button>
          <button class="settings-tab" data-settings-tab="vendors">
            <i class="fas fa-network-wired"></i> Vendor Selection
          </button>
        </div>
        
        <div class="settings-panels">
          <!-- Organization Panel -->
          <div class="settings-panel active" data-panel="organization">
            <div class="form-group">
              <label for="popup-company-size">Company Size</label>
              <select id="popup-company-size" class="enhanced-select">
                <option value="very-small">Very Small (10-50 employees)</option>
                <option value="small">Small (51-250 employees)</option>
                <option value="medium" selected>Medium (251-1000 employees)</option>
                <option value="large">Large (1001-5000 employees)</option>
                <option value="enterprise">Enterprise (5000+ employees)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="popup-device-count">Device Count</label>
              <input type="number" id="popup-device-count" class="enhanced-input" value="1000" min="10" max="100000">
            </div>
            
            <div class="form-group">
              <label for="popup-location-count">Locations</label>
              <input type="number" id="popup-location-count" class="enhanced-input" value="3" min="1" max="100">
            </div>
            
            <div class="form-group">
              <label for="popup-industry">Industry Vertical</label>
              <select id="popup-industry" class="enhanced-select">
                <option value="healthcare">Healthcare & Life Sciences</option>
                <option value="finance">Financial Services & Banking</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing & Industrial</option>
                <option value="education">Education & Research</option>
                <option value="government">Government & Public Sector</option>
                <option value="technology" selected>Technology & Software</option>
                <option value="energy">Energy & Utilities</option>
              </select>
            </div>
          </div>
          
          <!-- Cost Parameters Panel -->
          <div class="settings-panel" data-panel="costs">
            <div class="cost-parameter">
              <div class="parameter-header">
                <label>Analysis Period</label>
                <span class="parameter-value" id="popup-analysis-period-value">3 Years</span>
              </div>
              <input type="range" id="popup-analysis-period" min="1" max="5" value="3" step="1" class="cost-slider">
            </div>
            
            <div class="cost-parameter">
              <div class="parameter-header">
                <label>Annual FTE Cost</label>
                <span class="parameter-value" id="popup-fte-cost-value">$100,000</span>
              </div>
              <input type="range" id="popup-fte-cost" min="60000" max="200000" value="100000" step="5000" class="cost-slider">
            </div>
            
            <div class="cost-parameter">
              <div class="parameter-header">
                <label>Downtime Cost ($/hour)</label>
                <span class="parameter-value" id="popup-downtime-cost-value">$5,000</span>
              </div>
              <input type="range" id="popup-downtime-cost" min="1000" max="50000" value="5000" step="500" class="cost-slider">
            </div>
          </div>
          
          <!-- Vendor Selection Panel -->
          <div class="settings-panel" data-panel="vendors">
            <div class="vendor-grid-popup">
              <!-- Vendor cards will be populated here -->
            </div>
          </div>
        </div>
        
        <div class="settings-footer">
          <button class="settings-btn secondary" onclick="resetSettingsToDefaults()">
            <i class="fas fa-undo"></i> Reset to Defaults
          </button>
          <button class="settings-btn primary" onclick="applySettings()">
            <i class="fas fa-check"></i> Apply Settings
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(settingsPopup);
  
  // Update customize button to open popup
  const customizeBtn = document.getElementById('customize-dashboard');
  if (customizeBtn) {
    customizeBtn.onclick = openSettingsPopup;
  }
  
  // Setup settings functionality
  setupSettingsPopupFunctionality();
}

function openSettingsPopup() {
  const popup = document.getElementById('settings-popup');
  if (popup) {
    popup.classList.remove('hidden');
    // Sync current values
    syncCurrentSettings();
  }
}

function closeSettingsPopup() {
  const popup = document.getElementById('settings-popup');
  if (popup) {
    popup.classList.add('hidden');
  }
}

function setupSettingsPopupFunctionality() {
  // Settings tabs
  document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-settings-tab');
      
      // Update active tab
      document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active panel
      document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
      document.querySelector(`[data-panel="${tabName}"]`).classList.add('active');
    });
  });
  
  // Sync slider values
  document.querySelectorAll('.cost-slider').forEach(slider => {
    slider.addEventListener('input', function() {
      const valueSpan = document.getElementById(this.id + '-value');
      if (valueSpan) {
        let value = this.value;
        if (this.id.includes('fte-cost') || this.id.includes('downtime-cost')) {
          value = '$' + parseInt(value).toLocaleString();
        } else if (this.id.includes('analysis-period')) {
          value = value + ' Year' + (value > 1 ? 's' : '');
        }
        valueSpan.textContent = value;
      }
    });
  });
}

function syncCurrentSettings() {
  // Sync organization settings
  const deviceCount = document.getElementById('device-count')?.value;
  if (deviceCount) {
    document.getElementById('popup-device-count').value = deviceCount;
  }
  
  const industry = document.getElementById('industry')?.value;
  if (industry) {
    document.getElementById('popup-industry').value = industry;
  }
  
  // Add more syncing as needed
}

function applySettings() {
  // Apply organization settings
  const deviceCount = document.getElementById('popup-device-count')?.value;
  if (deviceCount && document.getElementById('device-count')) {
    document.getElementById('device-count').value = deviceCount;
  }
  
  const industry = document.getElementById('popup-industry')?.value;
  if (industry && document.getElementById('industry')) {
    document.getElementById('industry').value = industry;
  }
  
  // Trigger configuration change event
  document.dispatchEvent(new CustomEvent('configurationChanged', {
    detail: {
      deviceCount: deviceCount,
      industry: industry
    }
  }));
  
  // Close popup
  closeSettingsPopup();
  
  // Show success message
  showNotification('Settings applied successfully!', 'success');
}

function resetSettingsToDefaults() {
  document.getElementById('popup-device-count').value = 1000;
  document.getElementById('popup-industry').value = 'technology';
  document.getElementById('popup-analysis-period').value = 3;
  showNotification('Settings reset to defaults', 'info');
}

function showNotification(message, type) {
  // Simple notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    background: ${type === 'success' ? '#10b981' : '#3b82f6'};
    color: white; padding: 12px 20px; border-radius: 8px;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(redesignExecutiveDashboard, 1000);
});

// Export for global access
window.executeRedesign = redesignExecutiveDashboard;
