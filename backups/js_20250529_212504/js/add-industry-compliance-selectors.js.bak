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
