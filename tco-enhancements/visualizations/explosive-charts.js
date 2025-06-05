/**
 * Explosive Visualization Components
 * Mind maps, Gantt charts, Sankey diagrams, and more
 */

window.ExplosiveVisualizations = {
    
    // Create mind map showing all cost components
    createCostMindMap: function(vendorId) {
        const vendor = window.ComprehensiveVendorDatabase[vendorId];
        if (!vendor) return;
        
        const container = document.createElement('div');
        container.id = 'cost-mindmap-' + vendorId;
        container.style.height = '600px';
        
        // Create hierarchical data structure
        const data = {
            name: vendor.name + " Total Cost",
            children: [
                {
                    name: "Software Licensing",
                    children: Object.entries(vendor.licensing).map(([category, items]) => ({
                        name: category,
                        children: Object.entries(items).map(([item, details]) => ({
                            name: item,
                            value: details.cost || 0,
                            included: details.included
                        }))
                    }))
                },
                {
                    name: "Infrastructure",
                    children: Object.entries(vendor.infrastructure).map(([item, details]) => ({
                        name: item,
                        value: details.cost || 0,
                        required: details.required
                    }))
                },
                {
                    name: "Hidden Costs",
                    children: Object.entries(vendor.hiddenCosts.breakdown || {}).map(([item, cost]) => ({
                        name: item,
                        value: cost
                    }))
                },
                {
                    name: "Operations",
                    children: [
                        { name: "FTE Cost", value: vendor.operations.fte * 120000 * 3 },
                        { name: "Training", value: vendor.deployment.training || 0 },
                        { name: "Professional Services", value: vendor.deployment.professionalServices || 0 }
                    ]
                }
            ]
        };
        
        // Render using D3 or similar
        return { container, data };
    },
    
    // Create Gantt chart for deployment timeline
    createDeploymentGantt: function(selectedVendors) {
        const vendors = selectedVendors.map(id => window.ComprehensiveVendorDatabase[id]);
        
        const tasks = [];
        vendors.forEach(vendor => {
            const startDate = new Date();
            const deploymentDays = vendor.deployment.time / 24;
            
            tasks.push({
                id: vendor.id,
                name: vendor.name,
                start: startDate,
                end: new Date(startDate.getTime() + deploymentDays * 24 * 60 * 60 * 1000),
                progress: 0,
                dependencies: [],
                custom_class: vendor.category
            });
        });
        
        return tasks;
    },
    
    // Create funnel showing cost reduction
    createCostReductionFunnel: function(portnoxVendor, legacyVendor) {
        const portnoxTCO = calculateVendorTCO(portnoxVendor);
        const legacyTCO = calculateVendorTCO(legacyVendor);
        
        const data = [
            { name: 'Legacy Total Cost', value: legacyTCO.total },
            { name: 'Remove Infrastructure', value: legacyTCO.total - legacyTCO.infrastructure },
            { name: 'Eliminate Hidden Costs', value: legacyTCO.total - legacyTCO.infrastructure - legacyTCO.hidden },
            { name: 'Reduce Operations', value: portnoxTCO.total + (legacyTCO.operational - portnoxTCO.operational) },
            { name: 'Portnox TCO', value: portnoxTCO.total }
        ];
        
        return data;
    },
    
    // Create explosive comparison matrix
    createExplosiveMatrix: function(selectedVendors) {
        const categories = [
            'Software Licensing',
            'Hardware/Infrastructure',
            'Professional Services',
            'Training & Certification',
            'Annual Maintenance',
            'FTE Requirements',
            'Hidden Costs',
            'Downtime Impact',
            'Integration Complexity',
            'Scaling Costs',
            'Vendor Lock-in',
            'End of Life Costs'
        ];
        
        const matrix = [];
        selectedVendors.forEach(vendorId => {
            const vendor = window.ComprehensiveVendorDatabase[vendorId];
            const row = {
                vendor: vendor.name,
                scores: categories.map(cat => calculateCategoryScore(vendor, cat))
            };
            matrix.push(row);
        });
        
        return { categories, matrix };
    }
};

// Helper function
function calculateVendorTCO(vendor) {
    // Implementation from earlier
    return {
        total: 1000000, // Placeholder
        infrastructure: 200000,
        hidden: 300000,
        operational: 100000
    };
}

function calculateCategoryScore(vendor, category) {
    // Calculate normalized score for each category
    const scores = {
        'Software Licensing': vendor.pricing.transparent ? 20 : 80,
        'Hardware/Infrastructure': vendor.infrastructure.servers?.required ? 100 : 0,
        'Hidden Costs': vendor.hiddenCosts.total / 10000,
        // ... etc
    };
    return scores[category] || 50;
}

console.log('✅ Explosive Visualizations loaded');
