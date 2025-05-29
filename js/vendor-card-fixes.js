// Vendor Card Display Fixes
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Applying vendor card fixes...");
    
    // Add CSS to ensure cards don't cut off
    const style = document.createElement('style');
    style.textContent = `
        .vendor-card {
            min-height: 450px !important;
            height: auto !important;
            overflow: visible !important;
            display: flex;
            flex-direction: column;
        }
        
        .vendor-metrics {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin: 1rem 0;
        }
        
        .metric-row {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
        }
        
        .metric-item {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            background: #f9fafb;
            border-radius: 6px;
        }
        
        .vendor-actions {
            margin-top: auto;
            display: flex;
            gap: 0.5rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
        }
        
        /* AI Insights Styles */
        .ai-insights-container {
            padding: 2rem;
        }
        
        .executive-summary-card {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        .summary-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }
        
        .summary-metrics .metric-item {
            text-align: center;
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .summary-metrics .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: #28a745;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .summary-metrics .metric-label {
            font-size: 0.875rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .insight-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border-left: 4px solid;
            transition: transform 0.3s ease;
        }
        
        .insight-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
        }
        
        .insight-card.critical {
            border-left-color: #dc3545;
        }
        
        .insight-card.high {
            border-left-color: #ffc107;
        }
        
        .insight-card.medium {
            border-left-color: #17a2b8;
        }
        
        .insight-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .recommendations-timeline {
            display: grid;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }
        
        .recommendation-item {
            display: flex;
            gap: 1.5rem;
            align-items: start;
        }
        
        .recommendation-item .step {
            width: 40px;
            height: 40px;
            background: #28a745;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);
});
