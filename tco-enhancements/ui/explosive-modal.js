/**
 * Explosive Analysis Modal
 * Shows all advanced visualizations in one place
 */

window.showExplosiveAnalysis = function() {
    if (!window.selectedVendors || window.selectedVendors.length === 0) {
        alert('Please select vendors for analysis');
        return;
    }
    
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'explosive-modal';
    modal.innerHTML = `
        <style>
            .explosive-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                overflow: auto;
                padding: 20px;
            }
            
            .explosive-content {
                background: white;
                border-radius: 20px;
                max-width: 1400px;
                margin: 0 auto;
                padding: 40px;
                position: relative;
            }
            
            .explosive-header {
                text-align: center;
                margin-bottom: 40px;
            }
            
            .explosive-title {
                font-size: 36px;
                font-weight: 700;
                color: #2C3E50;
                margin-bottom: 10px;
            }
            
            .explosive-subtitle {
                font-size: 18px;
                color: #6C757D;
            }
            
            .explosive-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: #F44336;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .explosive-close:hover {
                transform: scale(1.1);
            }
            
            .visualization-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 30px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .viz-tab {
                padding: 12px 24px;
                background: #F8F9FA;
                border: 2px solid #E9ECEF;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 500;
            }
            
            .viz-tab:hover {
                border-color: #00D4AA;
                transform: translateY(-2px);
            }
            
            .viz-tab.active {
                background: #00D4AA;
                color: white;
                border-color: #00D4AA;
            }
            
            .visualization-container {
                min-height: 600px;
                background: #F8F9FA;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .export-actions {
                text-align: center;
                margin-top: 30px;
            }
            
            .export-btn {
                padding: 12px 24px;
                margin: 0 10px;
                background: #00D4AA;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            .export-btn:hover {
                background: #00A080;
                transform: translateY(-2px);
            }
        </style>
        
        <div class="explosive-content">
            <button class="explosive-close" onclick="this.parentElement.parentElement.remove()">×</button>
            
            <div class="explosive-header">
                <h1 class="explosive-title">💥 Explosive TCO Analysis</h1>
                <p class="explosive-subtitle">Every Hidden Cost Revealed - Complete Financial Impact</p>
            </div>
            
            <div class="visualization-tabs">
                <button class="viz-tab active" onclick="showVisualization('explosion')">
                    💥 Cost Explosion
                </button>
                <button class="viz-tab" onclick="showVisualization('mindmap')">
                    🧠 Cost Mind Map
                </button>
                <button class="viz-tab" onclick="showVisualization('timeline')">
                    📅 Deployment Timeline
                </button>
                <button class="viz-tab" onclick="showVisualization('funnel')">
                    🔽 Cost Reduction Funnel
                </button>
                <button class="viz-tab" onclick="showVisualization('heatmap')">
                    🔥 Cost Heat Map
                </button>
                <button class="viz-tab" onclick="showVisualization('matrix')">
                    📊 Decision Matrix
                </button>
            </div>
            
            <div id="visualization-container" class="visualization-container">
                <!-- Visualizations will be rendered here -->
            </div>
            
            <div class="export-actions">
                <button class="export-btn" onclick="exportAnalysis('pdf')">
                    <i class="fas fa-file-pdf"></i> Export PDF Report
                </button>
                <button class="export-btn" onclick="exportAnalysis('excel')">
                    <i class="fas fa-file-excel"></i> Export Excel Analysis
                </button>
                <button class="export-btn" onclick="exportAnalysis('ppt')">
                    <i class="fas fa-file-powerpoint"></i> Export Presentation
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show initial visualization
    window.showVisualization('explosion');
};

window.showVisualization = function(type) {
    // Update active tab
    document.querySelectorAll('.viz-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(type)) {
            tab.classList.add('active');
        }
    });
    
    const container = document.getElementById('visualization-container');
    container.innerHTML = '<div id="chart-container" style="width: 100%; height: 600px;"></div>';
    
    // Render appropriate visualization
    switch(type) {
        case 'explosion':
            window.AdvancedVisualizations.createCostExplosionChart('chart-container', window.selectedVendors);
            break;
        case 'mindmap':
            const portnoxId = window.selectedVendors.includes('portnox') ? 'portnox' : window.selectedVendors[0];
            window.AdvancedVisualizations.createCostMindMap('chart-container', portnoxId);
            break;
        case 'timeline':
            window.AdvancedVisualizations.createDeploymentGantt('chart-container', window.selectedVendors);
            break;
        case 'funnel':
            const legacy = window.selectedVendors.find(id => id !== 'portnox') || 'cisco';
            window.AdvancedVisualizations.createCostReductionFunnel('chart-container', 'portnox', legacy);
            break;
        case 'heatmap':
            window.AdvancedVisualizations.createCostHeatMap('chart-container', window.selectedVendors);
            break;
        case 'matrix':
            container.innerHTML = window.EnhancedExecutiveSummary.renderDecisionMatrix(
                window.selectedVendors.map(id => window.ComprehensiveVendorDatabase[id])
            );
            break;
    }
};

console.log('✅ Explosive Modal loaded');
