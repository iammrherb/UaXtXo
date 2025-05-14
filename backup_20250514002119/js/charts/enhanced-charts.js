// Enhanced Chart Configurations with animations and stunning visuals
const EnhancedCharts = {
    // Chart.js default configuration with animations
    defaultConfig: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
            onComplete: function(animation) {
                const chart = animation.chart;
                chart.options.animation.onProgress = null;
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 14,
                        family: "'Inter', sans-serif"
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                displayColors: true,
                mode: 'index',
                intersect: false,
                animation: {
                    duration: 400
                }
            },
            datalabels: {
                display: function(context) {
                    return context.dataset.showLabels !== false;
                },
                color: function(context) {
                    return context.dataset.backgroundColor;
                },
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: function(value) {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }).format(value);
                }
            }
        }
    },

    // Create animated bar chart
    createBarChart(ctx, data, options = {}) {
        const config = {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultConfig,
                ...options,
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            },
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    }
                },
                animation: {
                    ...this.defaultConfig.animation,
                    onProgress: function(animation) {
                        const chart = animation.chart;
                        const ctx = chart.ctx;
                        ctx.font = Chart.helpers.fontString(12, 'bold', Chart.defaults.font.family);
                        ctx.fillStyle = '#666';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach((bar, index) => {
                                const data = dataset.data[index];
                                const value = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(data);
                                ctx.fillText(value, bar.x, bar.y - 5);
                            });
                        });
                    }
                }
            }
        };

        return new Chart(ctx, config);
    },

    // Create animated line chart
    createLineChart(ctx, data, options = {}) {
        const config = {
            type: 'line',
            data: data,
            options: {
                ...this.defaultConfig,
                ...options,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.4,
                        borderWidth: 3
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6,
                        hitRadius: 10
                    }
                },
                animation: {
                    ...this.defaultConfig.animation,
                    onProgress: function(animation) {
                        const chart = animation.chart;
                        const ctx = chart.ctx;
                        
                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            meta.data.forEach((point, index) => {
                                // Pulsing effect on points
                                const pulse = Math.sin(Date.now() * 0.003 + index) * 0.5 + 1;
                                point.options.radius = 4 * pulse;
                            });
                        });
                    }
                }
            }
        };

        return new Chart(ctx, config);
    },

    // Create animated donut chart
    createDonutChart(ctx, data, options = {}) {
        const config = {
            type: 'doughnut',
            data: data,
            options: {
                ...this.defaultConfig,
                ...options,
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutElastic'
                },
                plugins: {
                    ...this.defaultConfig.plugins,
                    datalabels: {
                        display: true,
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14
                        },
                        formatter: (value, ctx) => {
                            const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / sum) * 100).toFixed(1) + '%';
                            return percentage;
                        }
                    }
                }
            }
        };

        // Add center text
        const centerText = {
            id: 'centerText',
            beforeDraw: function(chart) {
                const width = chart.width,
                      height = chart.height,
                      ctx = chart.ctx;

                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                const text = options.centerText || 'Total',
                      textX = Math.round((width - ctx.measureText(text).width) / 2),
                      textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        };

        config.plugins = [centerText];
        return new Chart(ctx, config);
    },

    // Create animated radar chart
    createRadarChart(ctx, data, options = {}) {
        const config = {
            type: 'radar',
            data: data,
            options: {
                ...this.defaultConfig,
                ...options,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            circular: true,
                            color: 'rgba(0,0,0,0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                    onProgress: function(animation) {
                        const chart = animation.chart;
                        const ctx = chart.ctx;
                        
                        // Add glow effect
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = 'rgba(26, 115, 232, 0.5)';
                    }
                }
            }
        };

        return new Chart(ctx, config);
    },

    // Create animated progress circle
    createProgressCircle(element, percentage, options = {}) {
        const defaults = {
            size: 120,
            lineWidth: 10,
            fontSize: 24,
            duration: 1500,
            color: '#1a73e8',
            bgColor: '#e9ecef',
            textColor: '#212529'
        };

        const settings = { ...defaults, ...options };
        const radius = (settings.size - settings.lineWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        // Create SVG
        const svg = d3.select(element)
            .append('svg')
            .attr('width', settings.size)
            .attr('height', settings.size);

        // Background circle
        svg.append('circle')
            .attr('cx', settings.size / 2)
            .attr('cy', settings.size / 2)
            .attr('r', radius)
            .attr('fill', 'none')
            .attr('stroke', settings.bgColor)
            .attr('stroke-width', settings.lineWidth);

        // Progress circle
        const progressCircle = svg.append('circle')
            .attr('cx', settings.size / 2)
            .attr('cy', settings.size / 2)
            .attr('r', radius)
            .attr('fill', 'none')
            .attr('stroke', settings.color)
            .attr('stroke-width', settings.lineWidth)
            .attr('stroke-linecap', 'round')
            .attr('stroke-dasharray', circumference)
            .attr('stroke-dashoffset', circumference)
            .attr('transform', `rotate(-90 ${settings.size / 2} ${settings.size / 2})`);

        // Text
        const text = svg.append('text')
            .attr('x', settings.size / 2)
            .attr('y', settings.size / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', settings.fontSize)
            .attr('font-weight', 'bold')
            .attr('fill', settings.textColor)
            .text('0%');

        // Animate
        progressCircle.transition()
            .duration(settings.duration)
            .ease(d3.easeQuadInOut)
            .attr('stroke-dashoffset', circumference * (1 - percentage / 100));

        // Counter animation
        const counter = { value: 0 };
        d3.select(counter)
            .transition()
            .duration(settings.duration)
            .ease(d3.easeQuadInOut)
            .tween('counter', () => {
                const interpolate = d3.interpolate(0, percentage);
                return (t) => {
                    text.text(Math.round(interpolate(t)) + '%');
                };
            });

        return svg.node();
    },

    // Create animated gauge chart
    createGaugeChart(element, value, options = {}) {
        const defaults = {
            size: 200,
            min: 0,
            max: 100,
            duration: 1500,
            colors: ['#ea4335', '#fbbc04', '#34a853'],
            needle: true
        };

        const settings = { ...defaults, ...options };
        const width = settings.size;
        const height = settings.size / 2;
        const radius = Math.min(width, height * 2) / 2;

        // Create SVG
        const svg = d3.select(element)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height})`);

        // Create scales
        const angleScale = d3.scaleLinear()
            .domain([settings.min, settings.max])
            .range([-Math.PI / 2, Math.PI / 2]);

        const colorScale = d3.scaleLinear()
            .domain([settings.min, (settings.max - settings.min) / 2, settings.max])
            .range(settings.colors);

        // Create arc
        const arc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(d => angleScale(d.startValue))
            .endAngle(d => angleScale(d.endValue));

        // Create segments
        const segments = d3.range(settings.min, settings.max, (settings.max - settings.min) / 100)
            .map((d, i, arr) => ({
                startValue: d,
                endValue: arr[i + 1] || settings.max,
                color: colorScale(d)
            }));

        // Draw segments
        g.selectAll('path')
            .data(segments)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => d.color)
            .attr('stroke', 'white')
            .attr('stroke-width', 1);

        // Add needle
        if (settings.needle) {
            const needleLength = radius * 0.9;
            const needleRadius = 10;

            const needle = g.append('g')
                .attr('class', 'needle');

            needle.append('circle')
                .attr('r', needleRadius)
                .attr('fill', '#333');

            const needlePath = needle.append('path')
                .attr('d', `M ${-needleRadius * 0.5} 0 L 0 ${-needleLength} L ${needleRadius * 0.5} 0 Z`)
                .attr('fill', '#333');

            // Animate needle
            needle
                .attr('transform', `rotate(${-90})`)
                .transition()
                .duration(settings.duration)
                .ease(d3.easeElasticOut)
                .attr('transform', `rotate(${angleScale(value) * (180 / Math.PI)})`);
        }

        // Add value text
        const text = g.append('text')
            .attr('y', -radius * 0.3)
            .attr('text-anchor', 'middle')
            .attr('font-size', settings.size / 8)
            .attr('font-weight', 'bold')
            .attr('fill', '#333')
            .text('0');

        // Animate text
        const counter = { value: 0 };
        d3.select(counter)
            .transition()
            .duration(settings.duration)
            .ease(d3.easeQuadInOut)
            .tween('counter', () => {
                const interpolate = d3.interpolate(0, value);
                return (t) => {
                    text.text(Math.round(interpolate(t)));
                };
            });

        return svg.node();
    },

    // Initialize particle background
    initParticleBackground() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1a73e8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#1a73e8',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    },

    // Initialize animations
    initAnimations() {
        // GSAP animations for cards
        gsap.from('.result-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.results-container',
                start: 'top 80%'
            }
        });

        // AOS initialization
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        // CountUp initialization for numbers
        document.querySelectorAll('[data-countup]').forEach(element => {
            const endValue = parseFloat(element.getAttribute('data-countup'));
            const countUp = new CountUp(element, endValue, {
                duration: 2,
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: element.getAttribute('data-prefix') || '',
                suffix: element.getAttribute('data-suffix') || ''
            });
            
            countUp.start();
        });
    }
};

// Export for use in other modules
window.EnhancedCharts = EnhancedCharts;
