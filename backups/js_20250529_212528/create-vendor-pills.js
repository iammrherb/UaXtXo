// Create vendor selection pills
document.addEventListener('DOMContentLoaded', function() {
    // Create vendor pills UI after overview renders
    const originalRenderOverview = window.dashboard?.renderOverview;
    if (originalRenderOverview) {
        window.dashboard.renderOverview = function(container) {
            // Call original
            originalRenderOverview.call(this, container);
            
            // Add vendor pills section
            const kpisGrid = container.querySelector('.kpis-grid');
            if (kpisGrid && !container.querySelector('.vendor-selection-container')) {
                const vendorPillsHTML = `
                    <div class="vendor-selection-container">
                        <div class="vendor-pills">
                            ${Object.values(this.vendorData || {}).slice(0, 8).map(vendor => `
                                <div class="vendor-pill ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                                     onclick="dashboard.toggleVendorPill('${vendor.key}')">
                                    <img src="./img/vendors/${vendor.key}-logo.png" 
                                         onerror="this.style.display='none'">
                                    ${vendor.name}
                                </div>
                            `).join('')}
                            
                            <div class="industry-selector">
                                <label>Industry:</label>
                                <select onchange="dashboard.updateIndustry(this.value)">
                                    <option value="all">All Industries</option>
                                    <option value="technology">Technology</option>
                                    <option value="finance">Financial Services</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="government">Government</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;
                
                kpisGrid.insertAdjacentHTML('afterend', vendorPillsHTML);
            }
        };
        
        // Add toggle method for pills
        window.dashboard.toggleVendorPill = function(vendorKey) {
            this.toggleVendor(vendorKey);
            
            // Update pill UI
            document.querySelectorAll('.vendor-pill').forEach(pill => {
                const vendorName = pill.textContent.trim();
                const vendor = Object.values(this.vendorData).find(v => v.name === vendorName);
                if (vendor) {
                    pill.classList.toggle('selected', this.selectedVendors.includes(vendor.key));
                }
            });
        };
        
        window.dashboard.updateIndustry = function(industry) {
            console.log('Industry selected:', industry);
            // Add industry filtering logic here
        };
    }
});
