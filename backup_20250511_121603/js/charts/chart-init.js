// Initialize charts with data from research
document.addEventListener('DOMContentLoaded', function() {
    // Default chart configuration
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#374151';
    
    // Initialize TCO comparison chart
    const tcoChartElement = document.getElementById('tco-comparison-chart');
    if (tcoChartElement) {
        const ctx = tcoChartElement.getContext('2d');
        
        // Data from research documents
        const tcoData = {
            labels: ['Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
            datasets: [{
                label: '3-Year TCO (1000 endpoints)',
                data: [215000, 615000, 505000, 577000, 455000],
                backgroundColor: [
                    'rgba(43, 210, 91, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(156, 163, 175, 0.8)',
                    'rgba(156, 163, 175, 0.8)'
                ],
                borderColor: [
                    'rgba(43, 210, 91, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(156, 163, 175, 1)'
                ],
                borderWidth: 1
            }]
        };
        
        new Chart(ctx, {
            type: 'bar',
            data: tcoData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize implementation timeline chart
    const timelineChartElement = document.getElementById('implementation-timeline-chart');
    if (timelineChartElement) {
        const ctx = timelineChartElement.getContext('2d');
        
        // Data from research
        const timelineData = {
            labels: ['Portnox Cloud', 'SecureW2', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'FortiNAC'],
            datasets: [{
                label: 'Implementation Time (Days)',
                data: [7, 21, 90, 60, 90, 75],
                backgroundColor: [
                    'rgba(43, 210, 91, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ]
            }]
        };
        
        new Chart(ctx, {
            type: 'horizontalBar',
            data: timelineData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                }
            }
        });
    }
});
