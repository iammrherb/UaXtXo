/**
 * Enhanced Vendor Pills UI Component
 */

(function() {
    // Create vendor pills container at the top
    function createVendorPillsUI() {
        const container = document.createElement('div');
        container.id = 'enhanced-vendor-pills';
        container.className = 'enhanced-vendor-pills-container';
        container.innerHTML = `
            <style>
                .enhanced-vendor-pills-container {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                
                .vendor-pills-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .vendor-pills-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #2C3E50;
                }
                
                .vendor-pills-actions {
                    display: flex;
                    gap: 10px;
                }
                
                .vendor-pills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 12px;
                }
                
                .vendor-pill {
                    background: #F8F9FA;
                    border: 2px solid #E9ECEF;
                    border-radius: 12px;
                    padding: 12px 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .vendor-pill:hover {
                    transform: translateY(-2px);
                    border-color: #00D4AA;
                    box-shadow: 0 4px 12px rgba(0,212,170,0.2);
                }
                
                .vendor-pill.selected {
                    background: #E6FAF6;
                    border-color: #00D4AA;
                }
                
                .vendor-pill-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .vendor-pill-name {
                    font-weight: 600;
                    font-size: 14px;
                    color: #2C3E50;
                }
                
                .vendor-pill-score {
                    background: #00D4AA;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 600;
                }
                
                .vendor-pill-metrics {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                    font-size: 12px;
                }
                
                .vendor-pill-metric {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                
                .metric-label {
                    color: #6C757D;
                    font-size: 10px;
                }
                
                .metric-value {
                    font-weight: 600;
                    color: #2C3E50;
                }
                
                .vendor-pill-badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin-top: 4px;
                }
                
                .vendor-badge {
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 500;
                }
                
                .badge-cloud-native { background: #E3F2FD; color: #1976D2; }
                .badge-zero-trust { background: #E8F5E9; color: #388E3C; }
                .badge-automated { background: #FFF3E0; color: #F57C00; }
                .badge-legacy { background: #FFEBEE; color: #D32F2F; }
                .badge-hybrid { background: #F3E5F5; color: #7B1FA2; }
                
                .vendor-details-btn {
                    background: #00D4AA;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    cursor: pointer;
                    margin-top: 8px;
                    transition: all 0.3s;
                }
                
                .vendor-details-btn:hover {
                    background: #00A080;
                }
            </style>
            
            <div class="vendor-pills-header">
                <h2 class="vendor-pills-title">Select Vendors for Detailed Comparison</h2>
                <div class="vendor-pills-actions">
                    <button class="btn btn-secondary" onclick="selectAllVendors()">Select All</button>
                    <button class="btn btn-secondary" onclick="clearVendorSelection()">Clear All</button>
                    <button class="btn btn-primary" onclick="showExplosiveAnalysis()">
                        <i class="fas fa-chart-network"></i> Explosive Analysis
                    </button>
                </div>
            </div>
            
            <div id="vendorPillsGrid" class="vendor-pills-grid">
                <!-- Vendor pills will be inserted here -->
            </div>
        `;
        
        // Insert at the beginning of main content
        const mainContent = document.querySelector('.content-wrapper') || 
                          document.querySelector('#app') || 
                          document.body;
        mainContent.insertBefore(container, mainContent.firstChild);
        
        // Render vendor pills
        renderVendorPills();
    }
    
    function renderVendorPills() {
        const grid = document.getElementById('vendorPillsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        Object.values(window.ComprehensiveVendorDatabase).forEach(vendor => {
            const tco = calculateQuickTCO(vendor);
            const isSelected = window.selectedVendors?.includes(vendor.id) || false;
            
            const pill = document.createElement('div');
            pill.className = `vendor-pill ${isSelected ? 'selected' : ''}`;
            pill.onclick = () => toggleVendorSelection(vendor.id);
            
            const badges = vendor.badges.map(badge => {
                const className = 'badge-' + badge.toLowerCase().replace(/\s+/g, '-');
                return `<span class="vendor-badge ${className}">${badge}</span>`;
            }).join('');
            
            pill.innerHTML = `
                <div class="vendor-pill-header">
                    <span class="vendor-pill-name">${vendor.name}</span>
                    <span class="vendor-pill-score">${vendor.score}</span>
                </div>
                
                <div class="vendor-pill-metrics">
                    <div class="vendor-pill-metric">
                        <span class="metric-label">3-Year TCO</span>
                        <span class="metric-value">$${(tco / 1000).toFixed(0)}K</span>
                    </div>
                    <div class="vendor-pill-metric">
                        <span class="metric-label">Monthly</span>
                        <span class="metric-value">$${(tco / 36 / 1000).toFixed(1)}K</span>
                    </div>
                    <div class="vendor-pill-metric">
                        <span class="metric-label">Deploy</span>
                        <span class="metric-value">${vendor.deployment.timeDisplay}</span>
                    </div>
                    <div class="vendor-pill-metric">
                        <span class="metric-label">FTE</span>
                        <span class="metric-value">${vendor.operations.fte}</span>
                    </div>
                </div>
                
                <div class="vendor-pill-badges">${badges}</div>
                
                <button class="vendor-details-btn" onclick="event.stopPropagation(); showVendorDetails('${vendor.id}')">
                    View Details
                </button>
            `;
            
            grid.appendChild(pill);
        });
    }
    
    function calculateQuickTCO(vendor) {
        const devices = 5000;
        const users = 3000;
        const years = 3;
        
        let tco = 0;
        
        // Software costs
        if (vendor.pricing.perDevice) {
            if (vendor.pricing.perDevice.negotiated) {
                tco += vendor.pricing.perDevice.negotiated * devices * 12 * years;
            } else if (vendor.pricing.perDevice.total) {
                tco += vendor.pricing.perDevice.total * devices;
            }
        } else if (vendor.pricing.perUser) {
            tco += (vendor.pricing.perUser.annual || vendor.pricing.perUser.monthly * 12) * users * years;
        }
        
        // Professional services
        tco += vendor.deployment.professionalServices || 0;
        tco += vendor.deployment.training || 0;
        
        // Hidden costs
        tco += vendor.hiddenCosts.total || 0;
        
        // Operations (FTE)
        tco += vendor.operations.fte * 120000 * years;
        
        return tco;
    }
    
    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createVendorPillsUI);
    } else {
        createVendorPillsUI();
    }
    
    // Export functions
    window.toggleVendorSelection = function(vendorId) {
        if (!window.selectedVendors) window.selectedVendors = [];
        
        const index = window.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            window.selectedVendors.splice(index, 1);
        } else {
            window.selectedVendors.push(vendorId);
        }
        
        renderVendorPills();
        
        // Trigger update event
        if (window.updateDashboard) window.updateDashboard();
    };
    
    window.selectAllVendors = function() {
        window.selectedVendors = Object.keys(window.ComprehensiveVendorDatabase);
        renderVendorPills();
        if (window.updateDashboard) window.updateDashboard();
    };
    
    window.clearVendorSelection = function() {
        window.selectedVendors = [];
        renderVendorPills();
        if (window.updateDashboard) window.updateDashboard();
    };
})();

console.log('✅ Enhanced Vendor Pills UI loaded');
