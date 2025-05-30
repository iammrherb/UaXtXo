// Add icons to tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabIcons = {
        'overview': 'fa-chart-line',
        'financial': 'fa-dollar-sign',
        'vendors': 'fa-users',
        'industries': 'fa-industry',
        'risk': 'fa-shield-alt',
        'insights': 'fa-brain'
    };
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const tabName = btn.dataset.tab;
        const icon = tabIcons[tabName];
        if (icon && !btn.querySelector('i')) {
            const iconHtml = `<i class="fas ${icon}"></i>`;
            btn.innerHTML = iconHtml + btn.innerHTML;
        }
    });
});
