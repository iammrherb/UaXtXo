(function() {
    window.RoiAnalysisView = {
        render() {
            return `
                <div class="roi-analysis-view">
                    <div class="view-header">
                        <h1>ROI Analysis</h1>
                        <p class="view-subtitle">Return on investment and payback analysis</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Calculating ROI...</p>
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
            
            return `
                <div class="roi-analysis-view">
                    <div class="view-header">
                        <h1>ROI Analysis</h1>
                        <p class="view-subtitle">Return on investment and payback analysis</p>
                    </div>
                    
                    <div class="roi-metrics">
                        <h2>ROI Summary</h2>
                        <div class="metrics-grid">
                            ${['portnox', 'cisco', 'aruba'].map(vendorId => {
                                const vendor = VendorDataManager.getVendor(vendorId);
                                if (!vendor) return '';
                                const roi = VendorDataManager.calculateROI(vendorId, config);
                                
                                return `
                                    <div class="roi-card">
                                        <h3>${vendor.name}</h3>
                                        <div class="roi-metric">
                                            <span class="label">ROI Percentage</span>
                                            <span class="value">${roi.percentage}%</span>
                                        </div>
                                        <div class="roi-metric">
                                            <span class="label">Payback Period</span>
                                            <span class="value">${roi.paybackMonths} months</span>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="roi-comparison">
                        <h2>5-Year Savings Analysis</h2>
                        <p>Portnox CLEAR provides immediate ROI through reduced operational costs and eliminated infrastructure requirements.</p>
                    </div>
                </div>
            `;
        }
    };
})();
