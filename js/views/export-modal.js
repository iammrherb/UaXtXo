// Export Options Modal
window.ExportModal = {
    render: function() {
        return `
            <div class="export-modal modal-backdrop" id="export-modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Export Analysis</h2>
                        <button class="close-modal" onclick="platform.closeExportModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="export-options">
                            <button class="export-option" onclick="platform.exportToPDF()">
                                <i class="fas fa-file-pdf"></i>
                                <span>Export to PDF</span>
                                <p>Executive report format</p>
                            </button>
                            <button class="export-option" onclick="platform.exportToExcel()">
                                <i class="fas fa-file-excel"></i>
                                <span>Export to Excel</span>
                                <p>Detailed analysis data</p>
                            </button>
                            <button class="export-option" onclick="platform.exportToPowerPoint()">
                                <i class="fas fa-file-powerpoint"></i>
                                <span>Export to PowerPoint</span>
                                <p>Presentation ready</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
