// Advanced Chart Configurations for Executive Dashboards
const ChartConfigurations = {
    // Vibrant color schemes aligned with Portnox branding
    colorSchemes: {
        portnox: ['#0046AD', '#0066FF', '#4D94FF', '#80B3FF', '#B3D1FF'],
        vibrant: ['#0046AD', '#7C3AED', '#EC4899', '#F97316', '#14B8A6'],
        comparison: ['#0046AD', '#049FD9', '#F8991D', '#00A4E4', '#E21D38'],
        risk: ['#10B981', '#F59E0B', '#EF4444'],
        gradient: {
            portnox: 'linear-gradient(135deg, #0046AD 0%, #0066FF 50%, #4D94FF 100%)',
            success: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
            warning: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
            danger: 'linear-gradient(135deg, #EF4444 0%, #EC4899 100%)'
        }
    },

    // Chart type configurations
    charts: {
        executiveSummary: {
            type: 'doughnut',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 14 }
                    }
                }
            }
        },

        tcoComparison: {
            type: 'bar',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        callbacks: {
                            label: (context) => `${(context.parsed.y / 1000).toFixed(0)}K`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            callback: (value) => `${value / 1000}K`,
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 14, weight: 'bold' } }
                    }
                }
            }
        },

        riskMatrix: {
            type: 'bubble',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Probability', font: { size: 16 } },
                        min: 0,
                        max: 100
                    },
                    y: {
                        title: { display: true, text: 'Impact', font: { size: 16 } },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label;
                                const value = context.parsed;
                                return `${label}: Risk Score ${value.r}`;
                            }
                        }
                    }
                }
            }
        },

        complianceRadar: {
            type: 'radar',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20 },
                        pointLabels: { font: { size: 14 } }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, font: { size: 14 } }
                    }
                }
            }
        },

        financialProjection: {
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true, padding: 20 }
                    },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: (value) => `${value / 1000}K` }
                    }
                }
            }
        },

        kpiGauge: {
            type: 'doughnut',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                circumference: 180,
                rotation: 270,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        }
    },

    // Animation configurations
    animations: {
        duration: 1000,
        easing: 'easeInOutQuart',
        delay: (context) => context.dataIndex * 100,
        loop: false
    },

    // Generate gradient backgrounds for canvas
    createGradient(ctx, colorScheme) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        colorScheme.forEach((color, index) => {
            gradient.addColorStop(index / (colorScheme.length - 1), color);
        });
        return gradient;
    },

    // Generate animated background for charts
    createAnimatedBackground(canvas) {
        const ctx = canvas.getContext('2d');
        const gradient = this.createGradient(ctx, this.colorSchemes.portnox);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle animation
        let offset = 0;
        const animate = () => {
            offset += 0.5;
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.translate(offset, 0);
            ctx.fillStyle = gradient;
            ctx.fillRect(-offset, 0, canvas.width + offset, canvas.height);
            ctx.restore();
            
            if (offset < canvas.width) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.ChartConfigurations = ChartConfigurations;
}
