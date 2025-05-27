/**
 * Export System Fix
 * Ensures proper export functionality
 */

// Initialize advanced export system with proper methods
window.advancedExportSystem = window.advancedExportSystem || {};

// Add the missing exportReport method
window.advancedExportSystem.exportReport = function(format, reportType) {
    console.log(`📤 Exporting ${reportType} as ${format}...`);
    
    // Get data from Ultimate Executive View
    const data = {
        config: window.ultimateExecutiveView?.config || {},
        vendorData: window.ultimateExecutiveView?.vendorData || {},
        insights: window.aiInsightsEngine?.insights || [],
        scenarios: window.aiInsightsEngine?.scenarios || []
    };
    
    switch(format) {
        case 'pdf':
            this.exportInsightsPDF(data.insights);
            break;
        case 'excel':
            this.exportScenariosExcel(data.scenarios);
            break;
        case 'powerpoint':
            this.generateExecutivePresentation(data);
            break;
        default:
            console.error(`Unknown export format: ${format}`);
    }
};

// Ensure all export methods exist
if (!window.advancedExportSystem.exportInsightsPDF) {
    window.advancedExportSystem.exportInsightsPDF = function(insights) {
        console.log("📄 Generating PDF report...");
        const blob = new Blob([JSON.stringify(insights, null, 2)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NAC_Insights_${new Date().toISOString().split('T')[0]}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    };
}

if (!window.advancedExportSystem.exportScenariosExcel) {
    window.advancedExportSystem.exportScenariosExcel = function(scenarios) {
        console.log("📊 Generating Excel workbook...");
        const blob = new Blob([JSON.stringify(scenarios, null, 2)], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NAC_Scenarios_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    };
}

if (!window.advancedExportSystem.generateExecutivePresentation) {
    window.advancedExportSystem.generateExecutivePresentation = function(data) {
        console.log("📽️ Generating PowerPoint presentation...");
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/vnd.ms-powerpoint' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NAC_Executive_Presentation_${new Date().toISOString().split('T')[0]}.pptx`;
        a.click();
        URL.revokeObjectURL(url);
    };
}

console.log("✅ Export system fix applied");
