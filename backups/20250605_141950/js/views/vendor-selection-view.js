(function() {
    window.VendorSelectionView = {
        render() {
            return `
                <div class="vendor-selection-view">
                    <div class="view-header">
                        <h1>Vendor Selection</h1>
                        <p class="view-subtitle">Choose vendors to compare in your TCO analysis</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Loading vendors...</p>
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
            
            const vendors = VendorDataManager.getAllVendors();
            const selectedVendors = ConfigManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
            
            return `
                <div class="vendor-selection-view">
                    <div class="view-header">
                        <h1>Vendor Selection</h1>
                        <p class="view-subtitle">Choose vendors to compare in your TCO analysis</p>
                    </div>
                    
                    <div class="vendor-grid">
                        ${vendors.map(vendor => `
                            <div class="vendor-card ${selectedVendors.includes(vendor.id) ? 'selected' : ''}" 
                                 data-vendor-id="${vendor.id}">
                                <div class="vendor-card-header">
                                    <h3>${vendor.name}</h3>
                                    <div class="vendor-checkbox">
                                        <input type="checkbox" 
                                               id="vendor-${vendor.id}" 
                                               ${selectedVendors.includes(vendor.id) ? 'checked' : ''}
                                               onchange="VendorSelectionView.toggleVendor('${vendor.id}')">
                                        <label for="vendor-${vendor.id}"></label>
                                    </div>
                                </div>
                                <div class="vendor-card-body">
                                    <p>${vendor.description}</p>
                                    <div class="vendor-details">
                                        <span class="vendor-category">${vendor.category}</span>
                                        <span class="vendor-architecture">${vendor.architecture}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },
        
        toggleVendor(vendorId) {
            const ConfigManager = window.ModuleLoader.get('ConfigManager');
            const EventSystem = window.ModuleLoader.get('EventSystem');
            const selectedVendors = ConfigManager.get('selectedVendors', []);
            
            if (selectedVendors.includes(vendorId)) {
                const index = selectedVendors.indexOf(vendorId);
                selectedVendors.splice(index, 1);
            } else {
                selectedVendors.push(vendorId);
            }
            
            ConfigManager.set('selectedVendors', selectedVendors);
            EventSystem.emit('vendors:selected', selectedVendors);
        }
    };
})();
