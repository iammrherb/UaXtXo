// Update settings modal
(function() {
    // Wait for platform to be ready
    setTimeout(() => {
        if (window.platform && window.platform.renderSettingsModal) {
            // Override the renderSettingsModal function
            window.platform.renderSettingsModal = function() {
                const data = window.EnhancedSettingsData;
                return `
                    <div class="settings-modal modal-backdrop" id="settings-modal" style="display: none;">
                        <div class="modal-content glass-modal animated-modal">
                            <div class="modal-header">
                                <h2>Cost Control Center</h2>
                                <button class="close-modal" onclick="platform.closeSettings()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="settings-grid">
                                    <div class="settings-section">
                                        <h3>Organization Profile</h3>
                                        <div class="setting-item">
                                            <label>Organization Size</label>
                                            <select id="org-size" onchange="platform.updateDeviceCount(this.value)">
                                                ${data.organizationSizes.map(size => 
                                                    `<option value="${size.value}">${size.label}</option>`
                                                ).join('')}
                                            </select>
                                        </div>
                                        <div class="setting-item">
                                            <label>Number of Devices</label>
                                            <input type="number" id="device-count" value="${this.config.deviceCount}" min="1" max="50000" step="50">
                                        </div>
                                        <div class="setting-item">
                                            <label>Number of Locations</label>
                                            <input type="number" id="location-count" value="${this.config.locationCount}" min="1" max="500">
                                        </div>
                                        <div class="setting-item">
                                            <label>Industry</label>
                                            <select id="industry">
                                                ${data.industries.map(ind => 
                                                    `<option value="${ind.value}">${ind.label}</option>`
                                                ).join('')}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="settings-section">
                                        <h3>Cost Parameters</h3>
                                        <div class="setting-item">
                                            <label>Average FTE Cost</label>
                                            <input type="number" id="fte-cost" value="${this.config.fteCost}" min="50000" max="300000" step="5000">
                                        </div>
                                        <div class="setting-item">
                                            <label>Estimated Breach Cost</label>
                                            <input type="number" id="breach-cost" value="${this.config.breachCost}" min="100000" max="10000000" step="50000">
                                        </div>
                                        <div class="setting-item">
                                            <label>Downtime Cost/Hour</label>
                                            <input type="number" id="downtime-cost" value="${this.config.downtimeCostPerHour}" min="500" max="100000" step="500">
                                        </div>
                                        <div class="setting-item">
                                            <label>Compliance Penalty Risk</label>
                                            <input type="number" id="compliance-penalty" value="${this.config.compliancePenaltyRisk}" min="10000" max="5000000" step="10000">
                                        </div>
                                    </div>
                                    
                                    <div class="settings-section">
                                        <h3>Compliance Requirements</h3>
                                        <div class="setting-item">
                                            <label>Required Frameworks</label>
                                            <div class="compliance-grid">
                                                ${Object.entries(
                                                    data.complianceFrameworks.reduce((acc, fw) => {
                                                        if (!acc[fw.category]) acc[fw.category] = [];
                                                        acc[fw.category].push(fw);
                                                        return acc;
                                                    }, {})
                                                ).map(([category, frameworks]) => `
                                                    <div class="compliance-category">
                                                        <h4>${category}</h4>
                                                        ${frameworks.map(fw => `
                                                            <label class="checkbox-label">
                                                                <input type="checkbox" name="compliance" value="${fw.value}" 
                                                                    ${this.config.complianceFrameworks.includes(fw.value) ? 'checked' : ''}>
                                                                <span>${fw.label}</span>
                                                            </label>
                                                        `).join('')}
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn-primary hover-lift" onclick="platform.applySettings()">
                                    Apply Cost Controls
                                </button>
                                <button class="btn-secondary" onclick="platform.resetSettings()">
                                    Reset to Industry Defaults
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };
            
            // Add updateDeviceCount function
            window.platform.updateDeviceCount = function(size) {
                const sizeData = window.EnhancedSettingsData.organizationSizes.find(s => s.value === size);
                if (sizeData) {
                    document.getElementById('device-count').value = sizeData.deviceRange[0];
                }
            };
        }
    }, 1000);
})();
