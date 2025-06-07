/**
 * Platform Fixes
 * Addresses missing functions and methods
 */

// Initialize NAC namespace
window.NAC = window.NAC || {};

// Add missing showHelp function
window.NAC.showHelp = function(topic) {
    const helpContent = {
        'compliance-matrix': {
            title: 'Compliance Control Matrix',
            content: `
                <p>The Compliance Control Matrix shows how Portnox NAC maps to various compliance framework requirements.</p>
                <ul>
                    <li><strong>Heatmap View:</strong> Visual representation of compliance coverage across frameworks</li>
                    <li><strong>Table View:</strong> Detailed control mappings in tabular format</li>
                    <li><strong>Timeline View:</strong> Implementation roadmap for compliance controls</li>
                </ul>
                <p>Click on any cell for detailed information about specific control implementations.</p>
            `
        },
        'default': {
            title: 'Help',
            content: '<p>Select a specific topic for detailed help information.</p>'
        }
    };
    
    const help = helpContent[topic] || helpContent['default'];
    
    // Create help modal
    const modal = document.createElement('div');
    modal.className = 'help-modal';
    modal.innerHTML = `
        <div class="help-modal-overlay" onclick="NAC.closeHelp()"></div>
        <div class="help-modal-content">
            <div class="help-modal-header">
                <h3>${help.title}</h3>
                <button class="help-modal-close" onclick="NAC.closeHelp()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="help-modal-body">
                ${help.content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles if not present
    if (!document.getElementById('help-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'help-modal-styles';
        style.textContent = `
            .help-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .help-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
            }
            
            .help-modal-content {
                position: relative;
                background: var(--bg-secondary, #1a1a1a);
                border: 1px solid var(--portnox-accent, #00e5e6);
                border-radius: 12px;
                max-width: 600px;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            
            .help-modal-header {
                background: linear-gradient(135deg, var(--portnox-dark, #003380), var(--portnox-primary, #0046ad));
                padding: 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .help-modal-header h3 {
                color: white;
                margin: 0;
            }
            
            .help-modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            
            .help-modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .help-modal-body {
                padding: 2rem;
                color: var(--text-primary, #ffffff);
                overflow-y: auto;
                max-height: calc(80vh - 100px);
            }
            
            .help-modal-body p {
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            
            .help-modal-body ul {
                margin-left: 1.5rem;
                margin-bottom: 1rem;
            }
            
            .help-modal-body li {
                margin-bottom: 0.5rem;
            }
            
            .help-modal-body strong {
                color: var(--portnox-accent, #00e5e6);
            }
        `;
        document.head.appendChild(style);
    }
};

// Add closeHelp function
window.NAC.closeHelp = function() {
    const modal = document.querySelector('.help-modal');
    if (modal) {
        modal.remove();
    }
};

// Fix missing showComplianceDetails method
if (window.NAC.compliance) {
    window.NAC.compliance.showComplianceDetails = function(vendor, framework) {
        console.log(`Showing compliance details for ${vendor} - ${framework}`);
        
        // Create details modal
        const modal = document.createElement('div');
        modal.className = 'compliance-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Compliance Details: ${vendor} - ${framework}</h3>
                    <button class="modal-close" onclick="this.closest('.compliance-details-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="detail-section">
                        <h4>Vendor: ${vendor}</h4>
                        <p>Framework: ${framework}</p>
                        <p>Compliance Score: ${this.getVendorComplianceScore(vendor, framework)}%</p>
                    </div>
                    <div class="detail-section">
                        <h4>Control Implementation</h4>
                        <p>Portnox provides comprehensive control implementation for ${framework} requirements.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        if (!document.getElementById('compliance-details-styles')) {
            const style = document.createElement('style');
            style.id = 'compliance-details-styles';
            style.textContent = `
                .compliance-details-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .modal-content {
                    position: relative;
                    background: var(--bg-secondary, #1a1a1a);
                    border: 1px solid var(--portnox-accent, #00e5e6);
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow: hidden;
                }
                
                .modal-header {
                    background: linear-gradient(135deg, var(--portnox-dark, #003380), var(--portnox-primary, #0046ad));
                    padding: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    color: white;
                    margin: 0;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .modal-body {
                    padding: 2rem;
                    overflow-y: auto;
                    max-height: calc(80vh - 100px);
                }
                
                .detail-section {
                    margin-bottom: 2rem;
                }
                
                .detail-section h4 {
                    color: var(--portnox-accent, #00e5e6);
                    margin-bottom: 1rem;
                }
                
                .detail-section p {
                    color: var(--text-secondary, #a6acbb);
                    margin-bottom: 0.5rem;
                }
            `;
            document.head.appendChild(style);
        }
    };
}

console.log('✅ Platform fixes loaded');
