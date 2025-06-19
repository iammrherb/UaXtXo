// Export Utilities
window.ExportUtils = {
    prepareData: function(data) {
        // Prepare data for export
        return data;
    },
    downloadFile: function(content, filename, type) {
        const blob = new Blob([content], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
};
console.log('✅ Export utilities loaded');
