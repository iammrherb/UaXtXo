/**
 * Layout and Sidebar Test Script
 * Tests if layout and sidebar fixes are working properly
 */

// Run test when document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Running Layout and Sidebar test...');
    
    // Wait for components to initialize
    setTimeout(function() {
        checkLayoutAndSidebar();
    }, 1000);
});

// Check if layout and sidebar are working properly
function checkLayoutAndSidebar() {
    // Check sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (!sidebarToggle) {
        console.error('❌ Sidebar toggle not found');
    } else {
        console.log('✅ Sidebar toggle found');
        
        // Test toggle functionality
        const sidebar = document.getElementById('sidebar');
        const contentArea = document.querySelector('.content-area');
        
        if (sidebar && contentArea) {
            console.log('Testing sidebar toggle functionality...');
            
            // Save original state
            const sidebarCollapsed = sidebar.classList.contains('collapsed');
            const toggleCollapsed = sidebarToggle.classList.contains('collapsed');
            const contentExpanded = contentArea.classList.contains('expanded');
            
            // Trigger click
            sidebarToggle.click();
            
            // Check if classes toggled
            const sidebarToggled = sidebarCollapsed !== sidebar.classList.contains('collapsed');
            const toggleToggled = toggleCollapsed !== sidebarToggle.classList.contains('collapsed');
            const contentToggled = contentExpanded !== contentArea.classList.contains('expanded');
            
            if (sidebarToggled && toggleToggled && contentToggled) {
                console.log('✅ Sidebar toggle functionality working');
            } else {
                console.error('❌ Sidebar toggle functionality not working properly');
            }
            
            // Restore original state
            if (sidebarToggled) sidebarToggle.click();
        }
    }
    
    // Check cost config
    const costConfig = document.getElementById('cost-config');
    if (!costConfig) {
        console.error('❌ Cost config card not found');
    } else {
        console.log('✅ Cost config card found');
        
        // Check cost config content
        const costContent = costConfig.querySelector('.config-card-content');
        if (!costContent) {
            console.error('❌ Cost config content not found');
        } else {
            console.log('✅ Cost config content found');
            
            // Check range sliders
            const rangeSliders = costContent.querySelectorAll('input[type="range"]');
            if (rangeSliders.length === 0) {
                console.error('❌ Cost config range sliders not found');
            } else {
                console.log(`✅ Found ${rangeSliders.length} range sliders in cost config`);
                
                // Check if range sliders have values and displays
                let allSlidersOk = true;
                rangeSliders.forEach(slider => {
                    const valueDisplay = document.getElementById(`${slider.id}-value`);
                    if (!valueDisplay) {
                        console.error(`❌ Value display not found for slider: ${slider.id}`);
                        allSlidersOk = false;
                    }
                });
                
                if (allSlidersOk) {
                    console.log('✅ All range sliders have value displays');
                }
            }
            
            // Test toggle functionality
            const header = costConfig.querySelector('.config-card-header');
            if (header) {
                console.log('Testing cost config toggle functionality...');
                
                // Save original state
                const contentCollapsed = costContent.classList.contains('collapsed');
                
                // Trigger click
                header.click();
                
                // Check if class toggled
                const contentToggled = contentCollapsed !== costContent.classList.contains('collapsed');
                
                if (contentToggled) {
                    console.log('✅ Cost config toggle functionality working');
                } else {
                    console.error('❌ Cost config toggle functionality not working properly');
                }
                
                // Restore original state
                if (contentToggled) header.click();
            }
        }
    }
    
    // Check CSS files
    const layoutEnhancedCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('layout-enhanced.css');
    });
    
    const sidebarEnhancedCSS = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes('sidebar-enhanced.css');
    });
    
    if (!layoutEnhancedCSS) {
        console.error('❌ layout-enhanced.css not loaded');
    } else {
        console.log('✅ layout-enhanced.css loaded');
    }
    
    if (!sidebarEnhancedCSS) {
        console.error('❌ sidebar-enhanced.css not loaded');
    } else {
        console.log('✅ sidebar-enhanced.css loaded');
    }
    
    console.log('Layout and Sidebar test complete');
}
