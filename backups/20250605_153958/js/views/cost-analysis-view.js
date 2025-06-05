(function() {
    window.CostAnalysisView = {
        render() {
            return `
                <div class="cost-analysis-view">
                    <div class="view-header">
                        <h1>Cost Analysis</h1>
                        <p class="view-subtitle">Detailed TCO breakdown and comparison</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading cost analysis...</p>
                    </div>
                </div>
            `;
        },
        
        renderComplete() {
            const VendorDataManager = window.ModuleLoader.get('VendorDataManager');
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            
            if (!VendorDataManager || !ConfigManager) {
                return this.render();
            }
            
            const config = ConfigManager.get('defaults');
            const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
            
            return `
                <div class="cost-analysis-view">
                    <div class="view-header">
                        <h1>Cost Analysis</h1>
                        <p class="view-subtitle">Detailed TCO breakdown and comparison</p>
                    </div>
                    
                    <div class="config-section">
                        <h2>Configuration Parameters</h2>
                        <div class="config-grid">
                            <div class="config-item">
                                <label>Number of Devices</label>
                                <input type="number" class="form-input config-input" 
                                       data-config="defaults.devices" 
                                       value="${config.devices}">
                            </div>
                            <div class="config-item">
                                <label>Number of Users</label>
                                <input type="number" class="form-input config-input" 
                                       data-config="defaults.users" 
                                       value="${config.users}">
                            </div>
                            <div class="config-item">
                                <label>Analysis Period (Years)</label>
                                <select class="form-select config-input" data-config="defaults.years">
                                    <option value="1" ${config.years === 1 ? 'selected' : ''}>1 Year</option>
                                    <option value="3" ${config.years === 3 ? 'selected' : ''}>3 Years</option>
                                    <option value="5" ${config.years === 5 ? 'selected' : ''}>5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-details-section">
                        <h2>Cost Breakdown by Vendor</h2>
                        ${selectedVendors.map(vendorId => {
                            const vendor = VendorDataManager.getVendor(vendorId);
                            if (!vendor) return '';
                            const tco = VendorDataManager.calculateTCO(vendorId, config);
                            
                            return `
                                <div class="vendor-cost-card">
                                    <h3>${vendor.name}</h3>
                                    <div class="cost-summary">
                                        <div class="cost-total">
                                            <span class="label">Total TCO</span>
                                            <span class="value">${this.formatCurrency(tco.total)}</span>
                                        </div>
                                        <div class="cost-per-device">
                                            <span class="label">Per Device/Month</span>
                                            <span class="value">${this.formatCurrency(tco.perDevicePerMonth, 2)}</span>
                                        </div>
                                    </div>
                                    <div class="cost-breakdown">
                                        <div class="cost-item">
                                            <span>Hardware</span>
                                            <span>${this.formatCurrency(tco.hardware)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Software</span>
                                            <span>${this.formatCurrency(tco.software)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Implementation</span>
                                            <span>${this.formatCurrency(tco.implementation)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Operations</span>
                                            <span>${this.formatCurrency(tco.operations)}</span>
                                        </div>
                                        <div class="cost-item">
                                            <span>Support</span>
                                            <span>${this.formatCurrency(tco.support)}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="charts-section">
                        <div class="chart-container">
                            <canvas id="tco-comparison-chart" height="400"></canvas>
                        </div>
                    </div>
                </div>
            `;
        },
        
        formatCurrency(amount, decimals = 0) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(amount);
        }
    };
})();
