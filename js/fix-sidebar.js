// Sidebar Fix Script
console.log('Sidebar fix loaded');

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    
    if (sidebar && sidebarToggle) {
        console.log('Sidebar elements found, attaching event listener');
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            sidebarToggle.classList.toggle('collapsed');
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-chevron-left';
            }
        });
    }
    
    // Fix config card collapsible functionality
    const configCards = document.querySelectorAll('.config-card');
    
    configCards.forEach(card => {
        const header = card.querySelector('.config-card-header');
        const content = card.querySelector('.config-card-content');
        const icon = header.querySelector('i.fas');
        
        if (header && content) {
            header.addEventListener('click', function() {
                content.classList.toggle('collapsed');
                
                if (content.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            });
        }
    });
});
