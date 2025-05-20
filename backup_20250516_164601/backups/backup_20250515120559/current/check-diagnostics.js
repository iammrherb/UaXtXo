// Diagnostic check tool
// Run this in the browser console

function checkPortnoxUI() {
    console.group('Portnox UI Diagnostics');
    
    // Check vendor grid
    const vendorGrid = document.querySelector('.vendor-grid');
    console.log('Vendor grid:', vendorGrid);
    if (vendorGrid) {
        console.log('Grid display:', getComputedStyle(vendorGrid).display);
        console.log('Grid template columns:', getComputedStyle(vendorGrid).gridTemplateColumns);
        
        // Check vendor cards
        const cards = vendorGrid.querySelectorAll('.vendor-card');
        console.log('Vendor cards:', cards.length);
        
        if (cards.length > 0) {
            console.log('First card height:', getComputedStyle(cards[0]).height);
            console.log('First card padding:', getComputedStyle(cards[0]).padding);
            
            // Check logos
            const logos = vendorGrid.querySelectorAll('.vendor-logo img');
            console.log('Logo images:', logos.length);
            
            if (logos.length > 0) {
                console.table(Array.from(logos).map(img => ({
                    src: img.src,
                    loaded: img.complete && img.naturalHeight !== 0,
                    height: getComputedStyle(img).height,
                    maxHeight: getComputedStyle(img).maxHeight,
                    display: getComputedStyle(img).display
                })));
            }
        }
    }
    
    // Check sidebar
    const sidebar = document.getElementById('sidebar');
    console.log('Sidebar:', sidebar);
    if (sidebar) {
        console.log('Sidebar width:', getComputedStyle(sidebar).width);
        console.log('Sidebar classes:', sidebar.className);
    }
    
    // Check sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    console.log('Sidebar toggle:', sidebarToggle);
    if (sidebarToggle) {
        console.log('Toggle position:', getComputedStyle(sidebarToggle).position);
        console.log('Toggle visibility:', getComputedStyle(sidebarToggle).display);
    }
    
    // Check content area
    const contentArea = document.getElementById('content-area');
    console.log('Content area:', contentArea);
    
    // Check all loaded scripts
    const scripts = document.querySelectorAll('script');
    console.log('Scripts loaded:', scripts.length);
    console.log('Script sources:', Array.from(scripts).map(s => s.src).filter(src => src));
    
    // Check all loaded styles
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('Stylesheets loaded:', styles.length);
    console.log('Stylesheet sources:', Array.from(styles).map(s => s.href).filter(href => href));
    
    console.groupEnd();
    
    return 'Diagnostic check complete. See console for details.';
}

// Run diagnostics
checkPortnoxUI();

// Return suggestions
console.log('\nSuggested fixes:');
console.log('1. Try opening test/test.html to check if basic CSS/JS loading works');
console.log('2. Open the browser in incognito/private mode to bypass cache');
console.log('3. Check if web server is running and serving files correctly');
console.log('4. Check network tab for any 404 errors');
console.log('5. Try adding ?v=' + Date.now() + ' to CSS and JS URLs to bypass cache');
