// Vendor Card Enhancements
console.log("💳 Enhancing vendor cards...");

// Override renderVendorCards to include price per device
document.addEventListener('DOMContentLoaded', function() {
    const checkAndEnhance = setInterval(() => {
        if (window.dashboard && window.dashboard.renderVendorCards) {
            clearInterval(checkAndEnhance);
            
            const originalRender = window.dashboard.renderVendorCards;
            window.dashboard.renderVendorCards = function() {
                const vendorGrid = document.getElementById('vendor-grid');
                if (!vendorGrid || !this.vendorData) return;
                
                const sortedVendors = Object.values(this.vendorData)
                    .sort((a, b) => b.score - a.score);
                
                vendorGrid.innerHTML = sortedVendors.map(vendor => {
                    const isSelected = this.selectedVendors.includes(vendor.key);
                    
                    return `
                        <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${isSelected ? 'selected' : ''}" 
                             data-vendor="${vendor.key}">
                            <div class="vendor-header">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/${vendor.key}-logo.png" 
                                         alt="${vendor.name}" 
                                         onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-weight:700;color:#6b7280;\\'>'+this.alt.substring(0,3).toUpperCase()+'</div>';">
                                </div>
                                <div class="vendor-info">
                                    <h4 class="vendor-name">${vendor.name}</h4>
                                    <div class="vendor-rating">
                                        ${renderStars(vendor.score / 20)}
                                        <span class="score-badge">${vendor.score}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-metrics">
                                <div class="metric-row primary">
                                    <div class="metric-item featured">
                                        <div class="metric-label">3-YEAR TCO</div>
                                        <div class="metric-value large">$${(vendor.tco.total / 1000).toFixed(0)}K</div>
                                    </div>
                                </div>
                                
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">PER DEVICE/MO</div>
                                        <div class="metric-value highlight">$${vendor.tco.perDeviceMonthly.toFixed(2)}</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">MONTHLY</div>
                                        <div class="metric-value">$${(vendor.tco.monthly / 1000).toFixed(1)}K</div>
                                    </div>
                                </div>
                                
                                <div class="metric-row">
                                    <div class="metric-item">
                                        <div class="metric-label">DEPLOY</div>
                                        <div class="metric-value">${vendor.metrics.implementationDays}d</div>
                                    </div>
                                    <div class="metric-item">
                                        <div class="metric-label">FTE</div>
                                        <div class="metric-value">${vendor.metrics.fteRequired}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="vendor-badges">
                                ${vendor.capabilities.cloudNative === 100 ? '<span class="badge cloud">CLOUD NATIVE</span>' : ''}
                                ${vendor.capabilities.zeroTrust >= 85 ? '<span class="badge zt">ZERO TRUST</span>' : ''}
                                ${vendor.capabilities.automation >= 85 ? '<span class="badge auto">AUTOMATED</span>' : ''}
                            </div>
                            
                            <div class="vendor-actions">
                                <button class="vendor-btn ${isSelected ? 'selected' : ''}" 
                                        onclick="dashboard.toggleVendorAndUpdate('${vendor.key}')">
                                    <i class="fas ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
                                    ${isSelected ? 'Selected' : 'Select'}
                                </button>
                                <button class="vendor-btn details" 
                                        onclick="dashboard.showVendorDetails('${vendor.key}')">
                                    <i class="fas fa-info-circle"></i> Details
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
                
                function renderStars(rating) {
                    const fullStars = Math.floor(rating);
                    const hasHalf = rating % 1 >= 0.5;
                    let stars = '';
                    
                    for (let i = 0; i < fullStars; i++) {
                        stars += '<i class="fas fa-star"></i>';
                    }
                    if (hasHalf) {
                        stars += '<i class="fas fa-star-half-alt"></i>';
                    }
                    const remaining = 5 - Math.ceil(rating);
                    for (let i = 0; i < remaining; i++) {
                        stars += '<i class="far fa-star"></i>';
                    }
                    
                    return stars;
                }
            };
            
            // Force re-render
            if (window.dashboard.vendorData) {
                window.dashboard.renderVendorCards();
            }
        }
    }, 100);
});

// Add enhanced styles
const vendorCardStyles = document.createElement('style');
vendorCardStyles.textContent = `
    .vendor-card {
        min-height: 460px !important;
        padding: 1.5rem !important;
        display: flex;
        flex-direction: column;
        background: white;
        border: 2px solid #e5e7eb;
        transition: all 0.3s ease;
    }
    
    .vendor-card.portnox {
        border-color: #00a652;
        background: linear-gradient(to bottom, rgba(0, 166, 82, 0.03) 0%, white 100%);
    }
    
    .vendor-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .metric-row.primary {
        margin-bottom: 1rem;
    }
    
    .metric-item.featured {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
    }
    
    .metric-value.large {
        font-size: 1.5rem !important;
        color: #00a652;
    }
    
    .metric-value.highlight {
        color: #007bff;
        font-weight: 800;
    }
    
    .badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .badge.cloud {
        background: rgba(0, 166, 82, 0.1);
        color: #00a652;
    }
    
    .badge.zt {
        background: rgba(0, 123, 255, 0.1);
        color: #007bff;
    }
    
    .badge.auto {
        background: rgba(255, 193, 7, 0.1);
        color: #ffc107;
    }
    
    .vendor-btn {
        flex: 1;
        padding: 0.5rem 1rem;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .vendor-btn:hover {
        background: #f8f9fa;
        border-color: #00a652;
        color: #00a652;
    }
    
    .vendor-btn.selected {
        background: #00a652;
        color: white;
        border-color: #00a652;
    }
    
    .vendor-rating i {
        color: #ffc107;
        font-size: 0.875rem;
    }
`;
document.head.appendChild(vendorCardStyles);
