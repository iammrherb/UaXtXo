#!/bin/bash

# Fix infinite loop and display issues
echo "🔧 Fixing infinite loop and display issues..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Fix the infinite loop in vendor calculations
echo -e "${YELLOW}Fixing infinite calculation loop...${NC}"

cat > js/fix-calculation-loop.js << 'EOF'
// Fix infinite calculation loop
(function() {
    console.log('🔧 Fixing calculation loop...');
    
    // Flag to prevent infinite loops
    let isCalculating = false;
    
    // Fix the dashboard refresh method
    if (window.dashboard) {
        const originalRefresh = window.dashboard.refreshVendorData;
        
        window.dashboard.refreshVendorData = function() {
            if (isCalculating) {
                console.log('⚠️ Preventing recursive calculation');
                return;
            }
            
            isCalculating = true;
            console.log('📊 Calculating vendor data...');
            
            try {
                // Call original method
                if (originalRefresh) {
                    originalRefresh.call(this);
                } else if (window.vendorCalculator) {
                    // Direct calculation if original method missing
                    if (this.config.portnoxPricing && window.vendorCalculator.setPortnoxPricing) {
                        window.vendorCalculator.setPortnoxPricing(this.config.portnoxPricing);
                    }
                    this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                }
                
                // Log the actual TCO values for debugging
                if (this.vendorData && this.vendorData.portnox) {
                    console.log('Portnox TCO:', this.vendorData.portnox.tco);
                    console.log('Portnox 3-Year TCO:', this.vendorData.portnox.tco.tco);
                }
            } finally {
                isCalculating = false;
            }
        };
        
        // Also fix the render method to not trigger refresh
        const originalRender = window.dashboard.render;
        window.dashboard.render = function() {
            console.log('🎨 Rendering dashboard...');
            if (originalRender) {
                originalRender.call(this);
            }
        };
    }
})();
EOF

# 2. Add Industry and Compliance selectors to sidebar
echo -e "${YELLOW}Adding Industry and Compliance selectors...${NC}"

cat > js/add-industry-compliance-selectors.js << 'EOF'
// Add Industry and Compliance selectors
(function() {
    console.log('🏭 Adding Industry and Compliance selectors...');
    
    // Wait for sidebar to be available
    function addSelectors() {
        const sidebar = document.querySelector('.sidebar-content');
        if (!sidebar) {
            setTimeout(addSelectors, 500);
            return;
        }
        
        // Check if selectors already exist
        if (document.getElementById('industry-select')) return;
        
        // Create Industry & Compliance section
        const section = document.createElement('div');
        section.className = 'config-section';
        section.innerHTML = `
            <h4><i class="fas fa-industry"></i> Industry & Compliance</h4>
            <div class="config-grid">
                <div class="config-item full-width">
                    <label for="industry-select">Industry</label>
                    <select id="industry-select" class="enhanced-select">
                        <option value="">Select Industry...</option>
                        ${Object.entries(window.comprehensiveIndustries || {}).map(([key, industry]) => 
                            `<option value="${key}">${industry.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="config-item full-width">
                    <label for="compliance-select">Primary Compliance</label>
                    <select id="compliance-select" class="enhanced-select">
                        <option value="">Select Compliance Framework...</option>
                        ${Object.entries(window.comprehensiveCompliance || {}).map(([key, framework]) => 
                            `<option value="${key}">${framework.name}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
        `;
        
        // Insert before the last section
        const lastSection = sidebar.querySelector('.config-section:last-child');
        sidebar.insertBefore(section, lastSection);
        
        // Add event listeners
        document.getElementById('industry-select')?.addEventListener('change', (e) => {
            if (window.dashboard) {
                window.dashboard.config.industry = e.target.value;
                window.dashboard.refreshVendorData();
                window.dashboard.render();
            }
        });
        
        document.getElementById('compliance-select')?.addEventListener('change', (e) => {
            if (window.dashboard) {
                window.dashboard.config.compliance = e.target.value;
                window.dashboard.refreshVendorData();
                window.dashboard.render();
            }
        });
        
        console.log('✅ Industry and Compliance selectors added');
    }
    
    // Start adding selectors
    addSelectors();
})();
EOF

# 3. Fix vendor card display to show actual TCO values
echo -e "${YELLOW}Fixing vendor card display...${NC}"

cat > js/fix-vendor-card-display.js << 'EOF'
// Fix vendor card display
(function() {
    console.log('🔧 Fixing vendor card display...');
    
    // Override renderVendorCards to ensure proper display
    function fixVendorCards() {
        if (!window.dashboard || !window.dashboard.renderVendorCards) {
            setTimeout(fixVendorCards, 500);
            return;
        }
        
        const originalRenderCards = window.dashboard.renderVendorCards;
        
        window.dashboard.renderVendorCards = function() {
            const vendorGrid = document.getElementById('vendor-grid');
            if (!vendorGrid || !this.vendorData) {
                console.log('❌ Missing vendor grid or data');
                return;
            }
            
            console.log('📇 Rendering vendor cards with data:', this.vendorData);
            
            const sortedVendors = Object.values(this.vendorData)
                .sort((a, b) => b.score - a.score);
            
            vendorGrid.innerHTML = sortedVendors.map(vendor => {
                // Ensure we have valid TCO data
                const tco = vendor.tco?.tco || 0;
                const monthly = vendor.tco?.monthly || 0;
                const deployDays = vendor.metrics?.implementationDays || 0;
                const fteRequired = vendor.metrics?.fteRequired || 0;
                
                console.log(`${vendor.name} TCO:`, tco, 'Monthly:', monthly);
                
                return `
                    <div class="vendor-card ${vendor.key === 'portnox' ? 'portnox' : ''} ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                         data-vendor="${vendor.key}">
                        <div class="vendor-header">
                            <div class="vendor-logo">
                                <img src="./img/vendors/${vendor.key}-logo.png" alt="${vendor.name}" 
                                     onerror="this.src='./img/vendors/default-logo.png'">
                            </div>
                            <div class="vendor-info">
                                <h4>${vendor.name}</h4>
                                <div class="vendor-rating">
                                    ${this.renderStars(vendor.score / 20)}
                                    <span class="score-badge">${vendor.score}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vendor-metrics">
                            <div class="metric-item">
                                <div class="metric-label">3-Year TCO</div>
                                <div class="metric-value">$${tco > 0 ? (tco / 1000).toFixed(0) : '0'}K</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">Monthly</div>
                                <div class="metric-value">$${monthly > 0 ? (monthly / 1000).toFixed(1) : '0'}K</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">Deploy</div>
                                <div class="metric-value">${deployDays}d</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">FTE</div>
                                <div class="metric-value">${fteRequired}</div>
                            </div>
                        </div>
                        
                        <div class="vendor-badges">
                            ${vendor.metrics?.cloudNative ? '<span class="badge cloud">Cloud Native</span>' : ''}
                            ${vendor.metrics?.zeroTrustScore >= 85 ? '<span class="badge zt">Zero Trust</span>' : ''}
                            ${vendor.metrics?.automationLevel >= 85 ? '<span class="badge auto">Automated</span>' : ''}
                        </div>
                        
                        <div class="vendor-actions">
                            <button class="vendor-btn ${this.selectedVendors.includes(vendor.key) ? 'selected' : ''}" 
                                    onclick="dashboard.toggleVendor('${vendor.key}')">
                                <i class="fas ${this.selectedVendors.includes(vendor.key) ? 'fa-check' : 'fa-plus'}"></i>
                                ${this.selectedVendors.includes(vendor.key) ? 'Selected' : 'Select'}
                            </button>
                            <button class="vendor-btn" onclick="dashboard.showVendorDetails('${vendor.key}')">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        };
    }
    
    fixVendorCards();
})();
EOF

# 4. Fix KPI display
echo -e "${YELLOW}Fixing KPI display...${NC}"

cat > js/fix-kpi-display.js << 'EOF'
// Fix KPI display
(function() {
    console.log('📊 Fixing KPI display...');
    
    // Override updateKPIs method
    function fixKPIs() {
        if (!window.dashboard) {
            setTimeout(fixKPIs, 500);
            return;
        }
        
        window.dashboard.updateKPIs = function() {
            const portnox = this.vendorData?.portnox;
            const cisco = this.vendorData?.cisco;
            
            console.log('Updating KPIs with:', { portnox, cisco });
            
            if (!portnox || !cisco) {
                console.log('❌ Missing vendor data for KPIs');
                return;
            }
            
            const savings = (cisco.tco?.tco || 0) - (portnox.tco?.tco || 0);
            const avgCompetitorTCO = this.calculateAverageCompetitorTCO();
            const portnoxSavingsPercent = avgCompetitorTCO > 0 ? 
                Math.round(((avgCompetitorTCO - (portnox.tco?.tco || 0)) / avgCompetitorTCO) * 100) : 0;
            
            // Update KPI values
            const kpiValues = document.querySelectorAll('.kpi-value');
            const kpiChanges = document.querySelectorAll('.kpi-change');
            
            if (kpiValues[0]) {
                kpiValues[0].textContent = `$${savings > 0 ? (savings / 1000).toFixed(0) : '0'}K`;
            }
            
            if (kpiChanges[0]) {
                kpiChanges[0].textContent = `+${portnoxSavingsPercent}% vs Market Avg`;
            }
            
            if (kpiValues[1]) {
                kpiValues[1].textContent = `${portnox.roi?.roi || 0}%`;
            }
            
            if (kpiChanges[1]) {
                kpiChanges[1].textContent = `Annual: $${((portnox.roi?.annualSavings || 0) / 1000).toFixed(0)}K`;
            }
            
            if (kpiValues[2]) {
                kpiValues[2].textContent = `${portnox.roi?.paybackMonths || 0}`;
            }
            
            if (kpiChanges[2]) {
                kpiChanges[2].textContent = `${portnox.metrics?.implementationDays || 0} Days Deploy`;
            }
            
            if (kpiValues[3]) {
                kpiValues[3].textContent = `${portnox.risk?.riskReduction || 30}%`;
            }
            
            if (kpiChanges[3]) {
                kpiChanges[3].textContent = `Score: ${portnox.metrics?.securityScore || 0}/100`;
            }
        };
        
        // Add help icons to KPIs
        window.dashboard.addHelpToKPIs = function() {
            const kpiLabels = document.querySelectorAll('.kpi-label');
            const helpTopics = ['tco', 'roi', 'payback', 'risk'];
            
            kpiLabels.forEach((label, index) => {
                if (!label.querySelector('.help-icon') && helpTopics[index]) {
                    label.insertAdjacentHTML('beforeend', 
                        ` <i class="help-icon fas fa-question-circle" data-help="${helpTopics[index]}" title="Click for explanation"></i>`
                    );
                }
            });
            
            // Add click handlers
            document.querySelectorAll('.help-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showHelpTooltip(e.target);
                });
            });
        };
        
        // Help tooltip display
        window.dashboard.showHelpTooltip = function(icon) {
            const helpContent = {
                tco: {
                    title: "3-Year Savings Calculation",
                    content: "Total savings comparing Portnox TCO to Cisco ISE over 3 years. Includes licensing, implementation, operational costs, and infrastructure."
                },
                roi: {
                    title: "Return on Investment",
                    content: "ROI = (Total Savings / Portnox Investment) × 100%. Shows the percentage return on your Portnox investment."
                },
                payback: {
                    title: "Payback Period",
                    content: "Number of months until cumulative savings equal the initial investment. Shorter is better."
                },
                risk: {
                    title: "Risk Reduction",
                    content: "Percentage reduction in security breach probability based on improved security controls and automation."
                }
            };
            
            const help = helpContent[icon.dataset.help];
            if (!help) return;
            
            // Remove existing tooltip
            document.querySelector('.help-tooltip')?.remove();
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'help-tooltip';
            tooltip.innerHTML = `
                <div class="help-header">
                    <h4>${help.title}</h4>
                    <button onclick="this.closest('.help-tooltip').remove()">×</button>
                </div>
                <div class="help-content">${help.content}</div>
            `;
            
            // Position tooltip
            const rect = icon.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.zIndex = '10000';
            
            document.body.appendChild(tooltip);
            
            // Close on outside click
            setTimeout(() => {
                document.addEventListener('click', function closeTooltip(e) {
                    if (!tooltip.contains(e.target)) {
                        tooltip.remove();
                        document.removeEventListener('click', closeTooltip);
                    }
                });
            }, 100);
        };
    }
    
    fixKPIs();
})();
EOF

# 5. Initialize everything properly after DOM load
echo -e "${YELLOW}Creating initialization script...${NC}"

cat > js/proper-initialization.js << 'EOF'
// Proper initialization
(function() {
    console.log('🚀 Starting proper initialization...');
    
    function initialize() {
        if (!window.dashboard || !window.vendorCalculator) {
            console.log('⏳ Waiting for components...');
            setTimeout(initialize, 100);
            return;
        }
        
        console.log('✅ All components ready, initializing...');
        
        // Force a single calculation
        window.dashboard.config = window.dashboard.loadConfiguration();
        window.dashboard.refreshVendorData();
        
        // Wait for data then render
        setTimeout(() => {
            window.dashboard.render();
            window.dashboard.updateKPIs();
            window.dashboard.addHelpToKPIs();
            console.log('✅ Initialization complete');
        }, 100);
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
EOF

# 6. Update CSS for help tooltips
echo -e "${YELLOW}Updating CSS for help tooltips...${NC}"

cat >> css/ultimate-executive-center.css << 'EOF'

/* Enhanced Help Tooltips */
.help-icon {
    margin-left: 8px;
    cursor: pointer;
    color: #9ca3af;
    font-size: 14px;
    transition: color 0.2s;
}

.help-icon:hover {
    color: #6366f1;
}

.help-tooltip {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    max-width: 350px;
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.help-tooltip .help-header {
    background: #f3f4f6;
    padding: 12px 16px;
    border-radius: 6px 6px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.help-tooltip .help-header h4 {
    margin: 0;
    font-size: 16px;
    color: #1f2937;
}

.help-tooltip .help-header button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    line-height: 1;
    padding: 0;
    width: 24px;
    height: 24px;
}

.help-tooltip .help-content {
    padding: 16px;
    line-height: 1.6;
    color: #4b5563;
    font-size: 14px;
}

/* Industry & Compliance Section */
.config-section .fa-industry {
    color: #6366f1;
}

/* KPI Card Enhancements */
.kpi-label {
    display: flex;
    align-items: center;
    justify-content: center;
}
EOF

# 7. Remove old fix scripts that might be causing conflicts
echo -e "${YELLOW}Cleaning up old scripts...${NC}"

# Remove from index.html
sed -i '/fix-vendor-calculations.js/d' index.html
sed -i '/fix-tco-calculations-complete.js/d' index.html

# 8. Update index.html with new scripts
echo -e "${YELLOW}Updating index.html...${NC}"

# Add new scripts in the correct order
scripts=(
    "fix-calculation-loop.js"
    "add-industry-compliance-selectors.js"
    "fix-vendor-card-display.js"
    "fix-kpi-display.js"
    "proper-initialization.js"
)

for script in "${scripts[@]}"; do
    if ! grep -q "$script" index.html; then
        sed -i "/<\/body>/i \    <script src=\"./js/$script\"></script>" index.html
    fi
done

# 9. Commit changes
echo -e "${YELLOW}Committing changes...${NC}"

git add js/*.js css/*.css index.html
git commit -m "Fix infinite loop and display issues

- Fixed infinite calculation loop
- Added Industry and Compliance selectors
- Fixed vendor card TCO display
- Fixed KPI display with actual values
- Added help tooltips to all KPIs
- Proper initialization sequence
- Cleaned up conflicting scripts"

echo -e "${GREEN}✅ All fixes applied!${NC}"
echo -e "${GREEN}Please do a hard refresh (Ctrl+Shift+R) to clear cache.${NC}"

# Optional push
read -p "Push changes to remote? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push
    echo -e "${GREEN}✓ Pushed to remote${NC}"
fi