// Enhanced Vendor Selection UI with Pills
window.VendorSelectionUI = {
    selectedVendors: ['portnox'], // Portnox always selected
    maxVendors: 5,
    
    render() {
        const vendors = Object.values(window.VendorDatabase)
            .filter(v => v.id && typeof v === 'object');
        
        return `
            <div class="vendor-selection-container">
                <div class="vendor-selection-header">
                    <h2>Select NAC Vendors to Compare</h2>
                    <p class="selection-subtitle">Choose up to ${this.maxVendors} vendors for comprehensive analysis</p>
                    <div class="selection-info">
                        <span class="selected-count">${this.selectedVendors.length} selected</span>
                        <button class="btn btn-secondary btn-sm" onclick="VendorSelectionUI.clearSelection()">
                            <i class="fas fa-times"></i> Clear All
                        </button>
                    </div>
                </div>
                
                <div class="vendor-categories">
                    ${this.renderVendorCategories(vendors)}
                </div>
                
                <div class="selected-vendors-pills">
                    <h3>Selected Vendors</h3>
                    <div class="vendor-pills">
                        ${this.renderSelectedPills()}
                    </div>
                </div>
            </div>
        `;
    },
    
    renderVendorCategories(vendors) {
        const categories = {
            'Cloud-Native Zero Trust': vendors.filter(v => v.category.includes('Cloud-Native')),
            'Legacy Enterprise': vendors.filter(v => v.category.includes('Legacy')),
            'Cloud Services': vendors.filter(v => v.category.includes('Cloud') && !v.category.includes('Cloud-Native')),
            'Specialized': vendors.filter(v => 
                !v.category.includes('Cloud-Native') && 
                !v.category.includes('Legacy') && 
                !v.category.includes('Cloud')
            )
        };
        
        return Object.entries(categories).map(([category, vendorList]) => {
            if (vendorList.length === 0) return '';
            
            return `
                <div class="vendor-category">
                    <h3 class="category-title">${category}</h3>
                    <div class="vendor-grid">
                        ${vendorList.map(vendor => this.renderVendorCard(vendor)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    renderVendorCard(vendor) {
        const isSelected = this.selectedVendors.includes(vendor.id);
        const isPortnox = vendor.id === 'portnox';
        const isDisabled = !isSelected && this.selectedVendors.length >= this.maxVendors;
        
        return `
            <div class="vendor-selection-card ${isSelected ? 'selected' : ''} ${isPortnox ? 'featured' : ''} ${isDisabled ? 'disabled' : ''}"
                 data-vendor="${vendor.id}"
                 onclick="VendorSelectionUI.toggleVendor('${vendor.id}')">
                
                ${isPortnox ? '<div class="recommended-badge">Recommended</div>' : ''}
                
                <div class="vendor-card-content">
                    <div class="vendor-logo">
                        <img src="${window.getVendorLogo(vendor.id)}" 
                             alt="${vendor.name}"
                             onerror="this.src='./img/vendors/default-logo.png'">
                    </div>
                    
                    <div class="vendor-info">
                        <h4 class="vendor-name">${vendor.name}</h4>
                        <p class="vendor-category">${vendor.category}</p>
                        
                        <div class="vendor-highlights">
                            ${this.getVendorHighlights(vendor).map(h => 
                                `<span class="highlight-badge ${h.type}">${h.text}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="vendor-metrics">
                        <div class="metric">
                            <span class="metric-value">${vendor.features?.zeroTrust?.score || 'N/A'}</span>
                            <span class="metric-label">ZT Score</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${vendor.deployment?.time < 24 ? 
                                vendor.deployment.time + 'h' : 
                                Math.round(vendor.deployment.time/24) + 'd'}</span>
                            <span class="metric-label">Deploy</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${vendor.operational?.fteRequired || 'N/A'}</span>
                            <span class="metric-label">FTE</span>
                        </div>
                    </div>
                </div>
                
                <div class="selection-indicator">
                    ${isSelected ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
                </div>
            </div>
        `;
    },
    
    renderSelectedPills() {
        if (this.selectedVendors.length === 0) {
            return '<p class="no-selection">No vendors selected</p>';
        }
        
        return this.selectedVendors.map(vendorId => {
            const vendor = window.VendorDatabase[vendorId];
            if (!vendor) return '';
            
            const isPortnox = vendorId === 'portnox';
            
            return `
                <div class="vendor-pill ${isPortnox ? 'portnox-pill' : ''}">
                    <img src="${window.getVendorLogo(vendor.id)}" 
                         alt="${vendor.name}" class="pill-logo">
                    <span class="pill-name">${vendor.name}</span>
                    ${!isPortnox ? `
                        <button class="pill-remove" onclick="VendorSelectionUI.removeVendor('${vendorId}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : '<span class="pill-locked"><i class="fas fa-lock"></i></span>'}
                </div>
            `;
        }).join('');
    },
    
    getVendorHighlights(vendor) {
        const highlights = [];
        
        if (vendor.features?.cloudNative) {
            highlights.push({ text: 'Cloud Native', type: 'success' });
        }
        if (vendor.features?.zeroTrust?.native) {
            highlights.push({ text: 'Zero Trust', type: 'primary' });
        }
        if (vendor.deployment?.time <= 24) {
            highlights.push({ text: 'Quick Deploy', type: 'info' });
        }
        if (vendor.operational?.fteRequired <= 0.5) {
            highlights.push({ text: 'Low Maintenance', type: 'success' });
        }
        if (vendor.costs?.hidden === 0) {
            highlights.push({ text: 'No Hidden Costs', type: 'success' });
        }
        
        return highlights.slice(0, 3); // Max 3 highlights
    },
    
    toggleVendor(vendorId) {
        if (vendorId === 'portnox') return; // Can't deselect Portnox
        
        const index = this.selectedVendors.indexOf(vendorId);
        
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else if (this.selectedVendors.length < this.maxVendors) {
            this.selectedVendors.push(vendorId);
        } else {
            this.showMaxVendorsAlert();
            return;
        }
        
        this.updateUI();
        this.notifyChange();
    },
    
    removeVendor(vendorId) {
        if (vendorId === 'portnox') return;
        
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
            this.updateUI();
            this.notifyChange();
        }
    },
    
    clearSelection() {
        this.selectedVendors = ['portnox']; // Keep Portnox
        this.updateUI();
        this.notifyChange();
    },
    
    updateUI() {
        // Re-render the vendor selection
        const container = document.querySelector('.vendor-selection-container');
        if (container) {
            container.outerHTML = this.render();
        }
    },
    
    notifyChange() {
        // Notify the main application of vendor selection change
        if (window.app && window.app.onVendorSelectionChange) {
            window.app.onVendorSelectionChange(this.selectedVendors);
        }
    },
    
    showMaxVendorsAlert() {
        // Show alert that max vendors reached
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning alert-dismissible';
        alert.innerHTML = `
            <strong>Maximum vendors selected!</strong> 
            You can compare up to ${this.maxVendors} vendors at a time. 
            Remove a vendor to add another.
            <button class="alert-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.querySelector('.vendor-selection-header').appendChild(alert);
        
        setTimeout(() => alert.remove(), 5000);
    },
    
    getSelectedVendors() {
        return this.selectedVendors;
    },
    
    setSelectedVendors(vendors) {
        // Always include Portnox
        if (!vendors.includes('portnox')) {
            vendors.unshift('portnox');
        }
        
        this.selectedVendors = vendors.slice(0, this.maxVendors);
        this.updateUI();
    }
};

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[VendorSelectionUI] Initialized with enhanced pill interface');
});
