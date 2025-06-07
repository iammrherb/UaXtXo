// Vendor Selection UI Module
defineModule('VendorSelectionUI', ['VendorDatabase', 'ChartManager'], function(VendorDB, ChartManager) {
    'use strict';

    let selectedVendors = new Set();
    const maxVendors = 4;

    function createVendorPill(vendor) {
        const pill = document.createElement('div');
        pill.className = 'vendor-pill';
        pill.dataset.vendorId = vendor.id;
        
        const isSelected = selectedVendors.has(vendor.id);
        if (isSelected) {
            pill.classList.add('selected');
        }
        
        pill.innerHTML = `
            <span class="vendor-name">${vendor.name}</span>
            <span class="vendor-category">${vendor.category === 'cloud' ? 'Cloud' : 'Legacy'}</span>
        `;
        
        pill.addEventListener('click', () => toggleVendor(vendor.id));
        
        return pill;
    }

    function toggleVendor(vendorId) {
        if (selectedVendors.has(vendorId)) {
            selectedVendors.delete(vendorId);
        } else if (selectedVendors.size < maxVendors) {
            selectedVendors.add(vendorId);
        } else {
            alert(`Maximum ${maxVendors} vendors can be selected for comparison`);
            return;
        }
        
        updateUI();
        updateCharts();
    }

    function updateUI() {
        const pills = document.querySelectorAll('.vendor-pill');
        pills.forEach(pill => {
            const vendorId = pill.dataset.vendorId;
            if (selectedVendors.has(vendorId)) {
                pill.classList.add('selected');
            } else {
                pill.classList.remove('selected');
            }
        });
    }

    function updateCharts() {
        if (selectedVendors.size >= 2) {
            ChartManager.updateCharts(Array.from(selectedVendors));
        }
    }

    return {
        initialize: function() {
            const container = document.getElementById('vendorSelection');
            if (!container) return;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .vendor-selection-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .vendor-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: white;
                    border: 2px solid #e0e0e0;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .vendor-pill:hover {
                    border-color: var(--primary-color);
                    box-shadow: 0 2px 8px rgba(0,164,228,0.2);
                }
                
                .vendor-pill.selected {
                    background: var(--primary-color);
                    border-color: var(--primary-color);
                    color: white;
                }
                
                .vendor-category {
                    font-size: 0.875rem;
                    opacity: 0.7;
                    padding: 0.25rem 0.5rem;
                    background: rgba(0,0,0,0.1);
                    border-radius: 12px;
                }
                
                .vendor-pill.selected .vendor-category {
                    background: rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
            
            // Create vendor pills
            const vendors = VendorDB.getAllVendors();
            vendors.forEach(vendor => {
                container.appendChild(createVendorPill(vendor));
            });
            
            console.log('✓ Vendor Selection UI initialized');
        },
        
        selectVendor: function(vendorId) {
            if (!selectedVendors.has(vendorId) && selectedVendors.size < maxVendors) {
                selectedVendors.add(vendorId);
                updateUI();
                updateCharts();
            }
        },
        
        getSelectedVendors: function() {
            return Array.from(selectedVendors);
        }
    };
});
