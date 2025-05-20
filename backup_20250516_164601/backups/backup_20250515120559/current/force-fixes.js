// Force fixes regardless of CSS loading
function forceUIFixes() {
    console.log('Forcing UI fixes...');
    
    // Attempt to fix the vendor grid
    const vendorGrid = document.querySelector('.vendor-grid');
    if (vendorGrid) {
        vendorGrid.style.cssText = `
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
            gap: 10px !important;
            max-height: 400px !important;
            overflow-y: auto !important;
        `;
        console.log('Applied styles to vendor grid');
    }
    
    // Fix all vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach(card => {
        card.style.cssText = `
            height: auto !important;
            padding: 8px !important;
        `;
        
        const logo = card.querySelector('.vendor-logo');
        if (logo) {
            logo.style.cssText = `
                height: 30px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-bottom: 8px !important;
            `;
            
            const img = logo.querySelector('img');
            if (img) {
                img.style.cssText = `
                    max-height: 30px !important;
                    max-width: 90% !important;
                    object-fit: contain !important;
                `;
            }
        }
        
        const info = card.querySelector('.vendor-info');
        if (info) {
            const h3 = info.querySelector('h3');
            if (h3) {
                h3.style.cssText = `
                    font-size: 0.85rem !important;
                    margin: 0 0 4px 0 !important;
                `;
            }
            
            const p = info.querySelector('p');
            if (p) {
                p.style.cssText = `
                    font-size: 0.75rem !important;
                    margin: 0 !important;
                `;
            }
        }
    });
    console.log(`Applied styles to ${vendorCards.length} vendor cards`);
    
    // Fix sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const contentArea = document.getElementById('content-area');
    
    if (sidebar && sidebarToggle && contentArea) {
        sidebar.style.cssText = `
            transition: width 0.3s ease, transform 0.3s ease !important;
            position: relative !important;
            width: 350px !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
        `;
        
        sidebarToggle.style.cssText = `
            position: absolute !important;
            top: 50% !important;
            right: -15px !important;
            transform: translateY(-50%) !important;
            width: 30px !important;
            height: 30px !important;
            background-color: #fff !important;
            border: 1px solid #ddd !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            z-index: 10 !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
        `;
        
        // Add or update click handler
        sidebarToggle.onclick = function() {
            sidebar.classList.toggle('sidebar-collapsed');
            contentArea.classList.toggle('content-expanded');
            
            // Find icon and toggle classes
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('sidebar-collapsed')) {
                    icon.classList.remove('fa-chevron-left');
                    icon.classList.add('fa-chevron-right');
                } else {
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-chevron-left');
                }
            }
        };
        
        console.log('Applied styles to sidebar elements');
    }
    
    return 'UI fixes applied. Refresh the page if needed.';
}
