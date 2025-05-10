#!/bin/bash

# NAC Architecture Designer Pro - Enhanced Restoration and Setup Script
# This script restores all themes, containers, workflow, and enhances the calculator

echo "🚀 NAC Architecture Designer Pro - Enhanced Restoration Script"
echo "============================================================"

# Create directory structure
echo "📁 Creating enhanced directory structure..."
mkdir -p {css,js/{core,managers,components,reports,data,charts,animations},libs/{js,css},img/{vendors,icons},data/{vendors,industry,compliance}}

# Download and update all libraries with latest versions
echo "📦 Downloading and updating libraries..."

# CSS Libraries
curl -L "https://cdn.tailwindcss.com/3.4.1" > libs/css/tailwind.min.css
curl -L "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" > libs/css/all.min.css
curl -L "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" > libs/css/animate.min.css
curl -L "https://unpkg.com/aos@2.3.4/dist/aos.css" > libs/css/aos.css
curl -L "https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css" > libs/css/hover.min.css

# JavaScript Libraries - Core
curl -L "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" > libs/js/chart.min.js
curl -L "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js" > libs/js/chartjs-plugin-datalabels.min.js
curl -L "https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js" > libs/js/d3.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" > libs/js/gsap.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js" > libs/js/ScrollTrigger.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.umd.min.js" > libs/js/countUp.min.js
curl -L "https://unpkg.com/aos@2.3.4/dist/aos.js" > libs/js/aos.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js" > libs/js/particles.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" > libs/js/lodash.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" > libs/js/jspdf.umd.min.js
curl -L "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js" > libs/js/jspdf.plugin.autotable.min.js

# Enhanced Chart Libraries
curl -L "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3.0.0/dist/chartjs-adapter-date-fns.bundle.min.js" > libs/js/chartjs-adapter-date-fns.min.js
curl -L "https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js" > libs/js/chartjs-plugin-zoom.min.js
curl -L "https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js" > libs/js/chartjs-plugin-annotation.min.js

# Create enhanced CSS file
echo "🎨 Creating enhanced main CSS file..."
cat > css/main.css << 'EOF'
/* NAC Architecture Designer Pro - Enhanced Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Color System */
  --color-primary: #1a73e8;
  --color-primary-dark: #1557b0;
  --color-secondary: #34a853;
  --color-accent: #fbbc04;
  --color-danger: #ea4335;
  --color-info: #4285f4;
  
  /* Theme Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  
  /* Dark Theme */
  --dark-bg-primary: #1a1d23;
  --dark-bg-secondary: #22262e;
  --dark-bg-tertiary: #2d3139;
  --dark-text-primary: #e9ecef;
  --dark-text-secondary: #adb5bd;
  --dark-border-color: #495057;
  
  /* Shadows & Effects */
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  
  /* Transitions */
  --transition-fast: all 0.15s ease;
  --transition-base: all 0.3s ease;
  --transition-slow: all 0.5s ease;
  
  /* Animations */
  --animation-bounce: bounce 1s infinite;
  --animation-pulse: pulse 2s infinite;
  --animation-slide-in: slideIn 0.5s ease-out;
}

/* Dark mode */
body.dark-mode {
  --bg-primary: var(--dark-bg-primary);
  --bg-secondary: var(--dark-bg-secondary);
  --bg-tertiary: var(--dark-bg-tertiary);
  --text-primary: var(--dark-text-primary);
  --text-secondary: var(--dark-text-secondary);
  --border-color: var(--dark-border-color);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: var(--transition-base);
}

/* Enhanced Container Styles */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.calculator-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
}

/* Enhanced Card Styles */
.result-card {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.result-card:hover::before {
  transform: scaleX(1);
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Enhanced Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(26, 115, 232, 0.3);
}

/* Enhanced Chart Container */
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  margin: 1rem 0;
}

.chart-container canvas {
  animation: fadeIn 0.8s ease-out;
}

/* Enhanced Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Enhanced Vendor Cards */
.vendor-card {
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: var(--transition-base);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.vendor-card::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(26, 115, 232, 0.1) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
}

.vendor-card:hover::after {
  width: 200%;
  height: 200%;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.vendor-card.selected {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, rgba(26, 115, 232, 0.1), rgba(26, 115, 232, 0.05));
}

/* Enhanced Forms */
.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: var(--transition-base);
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

/* Enhanced Tooltips */
.tooltip {
  position: relative;
  display: inline-block;
  margin-left: 0.5rem;
  cursor: help;
}

.tooltip-text {
  visibility: hidden;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--dark-bg-primary);
  color: var(--dark-text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  transition: var(--transition-base);
  box-shadow: var(--shadow-lg);
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

/* Enhanced Progress Bars */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 4px;
  transition: width 0.5s ease;
  position: relative;
}

.progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Enhanced Modals */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-base);
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.9);
  transition: var(--transition-base);
  box-shadow: var(--shadow-xl);
}

.modal.active .modal-content {
  transform: scale(1);
}

/* Enhanced Loading States */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Enhanced Particle Background */
#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .calculator-container {
    padding: 1rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .vendor-cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

/* Print Styles */
@media print {
  body {
    background: white;
    color: black;
  }
  
  .no-print {
    display: none !important;
  }
  
  .chart-container {
    break-inside: avoid;
  }
}
EOF

# Create enhanced JavaScript files
echo "📝 Creating enhanced JavaScript core files..."

# Enhanced Chart Configuration
cat > js/charts/enhanced-charts.js << 'EOF'
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
EOF

# Create enhanced UI components
cat > js/components/enhanced-ui.js << 'EOF'
// Enhanced UI Components with animations and interactions
const EnhancedUI = {
    // Initialize all UI enhancements
    init() {
        this.initTheme();
        this.initTooltips();
        this.initModals();
        this.initFormEnhancements();
        this.initNotifications();
        this.initLoadingStates();
        this.initScrollEffects();
    },

    // Theme management
    initTheme() {
        const themeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            this.updateThemeIcon(true);
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDarkMode = body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                this.updateThemeIcon(isDarkMode);
            });
        }
    },
    
    updateThemeIcon(isDarkMode) {
        const icon = document.querySelector('#dark-mode-toggle i');
        if (icon) {
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    // Enhanced tooltips
    initTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', (e) => {
                const text = tooltip.querySelector('.tooltip-text');
                if (text) {
                    gsap.to(text, {
                        opacity: 1,
                        y: -5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            tooltip.addEventListener('mouseleave', (e) => {
                const text = tooltip.querySelector('.tooltip-text');
                if (text) {
                    gsap.to(text, {
                        opacity: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                }
            });
        });
    },

    // Enhanced modals
    initModals() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const closeButtons = modal.querySelectorAll('.close-button, [data-close-modal]');
            
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            gsap.from(modal.querySelector('.modal-content'), {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    },
    
    closeModal(modal) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    },

    // Form enhancements
    initFormEnhancements() {
        // Enhanced select dropdowns
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', (e) => {
                gsap.to(select, {
                    scale: 1.02,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            });
        });
        
        // Enhanced input fields
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                gsap.to(input, {
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--color-primary'),
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', (e) => {
                gsap.to(input, {
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--border-color'),
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        });
        
        // Range sliders
        const ranges = document.querySelectorAll('input[type="range"]');
        ranges.forEach(range => {
            const updateRangeValue = () => {
                const value = range.value;
                const max = range.max;
                const percentage = (value / max) * 100;
                const valueDisplay = range.parentElement.querySelector('.range-value');
                
                if (valueDisplay) {
                    valueDisplay.textContent = value;
                    gsap.to(valueDisplay, {
                        x: `${percentage}%`,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                }
            };
            
            range.addEventListener('input', updateRangeValue);
            updateRangeValue();
        });
    },

    // Notification system
    initNotifications() {
        this.notificationQueue = [];
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        document.body.appendChild(this.notificationContainer);
    },
    
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Animate in
        gsap.from(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
    },
    
    removeNotification(notification) {
        gsap.to(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    },
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    },

    // Loading states
    initLoadingStates() {
        // Create loading overlay
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(this.loadingOverlay);
    },
    
    showLoading(message = 'Loading...') {
        const spinnerText = this.loadingOverlay.querySelector('.spinner-text');
        spinnerText.textContent = message;
        
        this.loadingOverlay.classList.add('active');
        gsap.from(this.loadingOverlay.querySelector('.loading-spinner'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    },
    
    hideLoading() {
        gsap.to(this.loadingOverlay.querySelector('.loading-spinner'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                this.loadingOverlay.classList.remove('active');
            }
        });
    },

    // Scroll effects
    initScrollEffects() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: target,
                        ease: 'power2.inOut'
                    });
                }
            });
        });
        
        // Back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: 0,
                ease: 'power2.inOut'
            });
        });
    },

    // Animate numbers
    animateNumbers(element, endValue, options = {}) {
        const defaults = {
            duration: 2,
            prefix: '',
            suffix: '',
            decimals: 0,
            separator: ','
        };
        
        const settings = { ...defaults, ...options };
        
        const countUp = new CountUp(element, endValue, {
            duration: settings.duration,
            useEasing: true,
            useGrouping: true,
            separator: settings.separator,
            decimal: '.',
            decimalPlaces: settings.decimals,
            prefix: settings.prefix,
            suffix: settings.suffix
        });
        
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    },

    // Progress bar animation
    animateProgressBar(element, percentage, duration = 1000) {
        const progress = element.querySelector('.progress');
        if (progress) {
            gsap.to(progress, {
                width: `${percentage}%`,
                duration: duration / 1000,
                ease: 'power2.out'
            });
        }
    },

    // Tab animation
    switchTab(tabId, contentId) {
        const tabs = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-pane');
        
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === contentId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        contents.forEach(content => {
            if (content.id === contentId) {
                gsap.fromTo(content, 
                    {
                        opacity: 0,
                        x: 20
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        display: 'block',
                        ease: 'power2.out'
                    }
                );
            } else {
                gsap.to(content, {
                    opacity: 0,
                    x: -20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        content.style.display = 'none';
                    }
                });
            }
        });
    }
};

// Export for use in other modules
window.EnhancedUI = EnhancedUI;
EOF

# Create enhanced vendor data
cat > js/data/enhanced-vendors.js << 'EOF'
// Enhanced vendor data with rich metadata
const VendorData = {
    vendors: {
        cisco: {
            name: 'Cisco ISE',
            description: 'Enterprise-grade NAC solution with comprehensive features',
            logo: 'img/vendors/cisco-logo.png',
            features: {
                'Zero Trust Support': 9,
                'Cloud Integration': 7,
                'Ease of Use': 6,
                'Scalability': 9,
                'Policy Management': 9,
                'Cost Efficiency': 5,
                'Implementation Speed': 5,
                'Security Features': 9,
                'Compliance Support': 9,
                'Remote Access': 7
            },
            costs: {
                hardware: 150000,
                licensing: 35,  // per device/year
                maintenance: 0.18,  // percentage of hardware
                implementation: 125000,
                training: 25000,
                fte: 1.5
            },
            implementation: {
                planning: 30,
                deployment: 60,
                testing: 21,
                training: 14,
                migration: 45
            }
        },
        aruba: {
            name: 'Aruba ClearPass',
            description: 'Flexible NAC solution with strong wireless integration',
            logo: 'img/vendors/aruba-logo.png',
            features: {
                'Zero Trust Support': 8,
                'Cloud Integration': 8,
                'Ease of Use': 7,
                'Scalability': 8,
                'Policy Management': 8,
                'Cost Efficiency': 6,
                'Implementation Speed': 6,
                'Security Features': 8,
                'Compliance Support': 8,
                'Remote Access': 8
            },
            costs: {
                hardware: 100000,
                licensing: 28,
                maintenance: 0.15,
                implementation: 75000,
                training: 15000,
                fte: 1.0
            },
            implementation: {
                planning: 21,
                deployment: 45,
                testing: 14,
                training: 10,
                migration: 30
            }
        },
        forescout: {
            name: 'Forescout',
            description: 'Agentless NAC with strong device visibility',
            logo: 'img/vendors/forescout-logo.png',
            features: {
                'Zero Trust Support': 9,
                'Cloud Integration': 8,
                'Ease of Use': 7,
                'Scalability': 9,
                'Policy Management': 8,
                'Cost Efficiency': 6,
                'Implementation Speed': 7,
                'Security Features': 9,
                'Compliance Support': 8,
                'Remote Access': 8
            },
            costs: {
                hardware: 80000,
                licensing: 32,
                maintenance: 0.12,
                implementation: 65000,
                training: 12000,
                fte: 1.0
            },
            implementation: {
                planning: 14,
                deployment: 30,
                testing: 10,
                training: 7,
                migration: 21
            }
        },
        fortinac: {
            name: 'FortiNAC',
            description: 'Integrated NAC solution within Fortinet ecosystem',
            logo: 'img/vendors/fortinac-logo.png',
            features: {
                'Zero Trust Support': 8,
                'Cloud Integration': 7,
                'Ease of Use': 7,
                'Scalability': 8,
                'Policy Management': 8,
                'Cost Efficiency': 7,
                'Implementation Speed': 7,
                'Security Features': 8,
                'Compliance Support': 8,
                'Remote Access': 7
            },
            costs: {
                hardware: 60000,
                licensing: 22,
                maintenance: 0.10,
                implementation: 45000,
                training: 8000,
                fte: 0.75
            },
            implementation: {
                planning: 14,
                deployment: 28,
                testing: 7,
                training: 5,
                migration: 14
            }
        },
        nps: {
            name: 'Microsoft NPS',
            description: 'Basic NAC included with Windows Server',
            logo: 'img/vendors/microsoft-logo.png',
            features: {
                'Zero Trust Support': 5,
                'Cloud Integration': 6,
                'Ease of Use': 6,
                'Scalability': 6,
                'Policy Management': 5,
                'Cost Efficiency': 9,
                'Implementation Speed': 8,
                'Security Features': 5,
                'Compliance Support': 6,
                'Remote Access': 6
            },
            costs: {
                hardware: 20000,
                licensing: 8,
                maintenance: 0.08,
                implementation: 25000,
                training: 5000,
                fte: 0.5
            },
            implementation: {
                planning: 7,
                deployment: 14,
                testing: 5,
                training: 3,
                migration: 7
            }
        },
        securew2: {
            name: 'SecureW2',
            description: 'Cloud-based RADIUS with certificate management',
            logo: 'img/vendors/securew2-logo.png',
            features: {
                'Zero Trust Support': 7,
                'Cloud Integration': 9,
                'Ease of Use': 8,
                'Scalability': 8,
                'Policy Management': 7,
                'Cost Efficiency': 8,
                'Implementation Speed': 9,
                'Security Features': 7,
                'Compliance Support': 7,
                'Remote Access': 9
            },
            costs: {
                hardware: 0,
                licensing: 12,
                maintenance: 0,
                implementation: 15000,
                training: 3000,
                fte: 0.25
            },
            implementation: {
                planning: 5,
                deployment: 7,
                testing: 3,
                training: 2,
                migration: 5
            }
        },
        portnox: {
            name: 'Portnox Cloud',
            description: 'Cloud-native NAC with zero trust architecture',
            logo: 'img/vendors/portnox-logo.png',
            features: {
                'Zero Trust Support': 10,
                'Cloud Integration': 10,
                'Ease of Use': 9,
                'Scalability': 10,
                'Policy Management': 9,
                'Cost Efficiency': 9,
                'Implementation Speed': 10,
                'Security Features': 9,
                'Compliance Support': 9,
                'Remote Access': 10
            },
            costs: {
                hardware: 0,
                licensing: 4,  // Monthly per device, configurable
                maintenance: 0,
                implementation: 10000,
                training: 2000,
                fte: 0.1
            },
            implementation: {
                planning: 3,
                deployment: 5,
                testing: 2,
                training: 1,
                migration: 3
            }
        }
    },

    getVendor(vendorId) {
        return this.vendors[vendorId] || null;
    },

    getAllVendors() {
        return Object.keys(this.vendors).map(id => ({
            id,
            ...this.vendors[id]
        }));
    },

    compareVendors(vendorIds) {
        return vendorIds.map(id => this.getVendor(id)).filter(Boolean);
    },

    getFeatureComparison(vendorIds) {
        const vendors = this.compareVendors(vendorIds);
        const features = new Set();
        
        vendors.forEach(vendor => {
            Object.keys(vendor.features).forEach(feature => {
                features.add(feature);
            });
        });
        
        const comparison = {};
        features.forEach(feature => {
            comparison[feature] = {};
            vendors.forEach(vendor => {
                comparison[feature][vendor.name] = vendor.features[feature] || 0;
            });
        });
        
        return comparison;
    }
};

// Export for use in other modules
window.VendorData = VendorData;
EOF

# Create ESLint configuration
echo "📋 Setting up ESLint configuration..."
cat > .eslintrc.json << 'EOF'
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["warn"],
    "no-console": ["warn"],
    "no-debugger": ["error"],
    "no-alert": ["warn"],
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "brace-style": ["error", "1tbs"],
    "comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "prefer-const": ["error"],
    "no-var": ["error"]
  },
  "globals": {
    "Chart": "readonly",
    "d3": "readonly",
    "gsap": "readonly",
    "CountUp": "readonly",
    "AOS": "readonly",
    "particlesJS": "readonly",
    "_": "readonly",
    "jsPDF": "readonly"
  }
}
EOF

# Create Prettier configuration
echo "🎨 Setting up Prettier configuration..."
cat > .prettierrc << 'EOF'
{
  "printWidth": 100,
  "tabWidth": 4,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
EOF

# Create package.json for development dependencies
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "nac-architecture-designer-pro",
  "version": "2.0.0",
  "description": "Enhanced Zero Trust NAC Architecture Designer Pro",
  "main": "index.html",
  "scripts": {
    "lint": "eslint js/**/*.js",
    "lint:fix": "eslint js/**/*.js --fix",
    "format": "prettier --write .",
    "serve": "python3 -m http.server 8080",
    "build": "npm run lint && npm run format"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "prettier": "^3.2.4"
  },
  "keywords": [
    "nac",
    "network-access-control",
    "zero-trust",
    "calculator",
    "tco"
  ],
  "author": "Portnox",
  "license": "MIT"
}
EOF

# Create enhanced main.js entry point
echo "🚀 Creating enhanced main.js..."
cat > js/main.js << 'EOF'
// Enhanced NAC Architecture Designer Pro - Main Entry Point
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing NAC Architecture Designer Pro...');
    
    // Initialize enhanced UI components
    EnhancedUI.init();
    
    // Initialize particle background
    if (document.getElementById('particles-js')) {
        EnhancedCharts.initParticleBackground();
    }
    
    // Initialize animations
    EnhancedCharts.initAnimations();
    
    // Initialize vendor selection
    initializeVendorSelection();
    
    // Initialize wizard navigation
    initializeWizard();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize chart defaults
    Chart.defaults.plugins.datalabels = {
        display: false
    };
    
    console.log('✅ NAC Architecture Designer Pro initialized successfully!');
});

// Vendor selection handler
function initializeVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        card.addEventListener('click', () => {
            const vendorId = card.getAttribute('data-vendor');
            
            // Remove selection from all cards
            vendorCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            card.classList.add('selected');
            
            // Update vendor info
            updateVendorInfo(vendorId);
            
            // Enable next button
            updateWizardNavigation();
            
            // Show notification
            EnhancedUI.showNotification(`Selected ${VendorData.getVendor(vendorId)?.name || 'vendor'}`, 'success');
        });
    });
}

// Update vendor information display
function updateVendorInfo(vendorId) {
    const vendor = VendorData.getVendor(vendorId);
    const infoBox = document.getElementById('vendor-info');
    const infoTitle = document.getElementById('vendor-info-title');
    const infoDescription = document.getElementById('vendor-info-description');
    
    if (vendor && infoBox) {
        infoTitle.textContent = vendor.name;
        infoDescription.textContent = vendor.description;
        infoBox.classList.remove('hidden');
        
        // Animate info box
        gsap.from(infoBox, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Initialize wizard navigation
function initializeWizard() {
    const steps = document.querySelectorAll('.wizard-step-content');
    let currentStep = 0;
    
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                goToStep(currentStep + 1);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToStep(currentStep - 1);
        });
    }
    
    function goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            // Hide current step
            steps[currentStep].classList.remove('active');
            
            // Show new step
            steps[stepIndex].classList.add('active');
            currentStep = stepIndex;
            
            // Update navigation
            updateWizardNavigation();
            
            // Animate step transition
            gsap.from(steps[stepIndex], {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }
    
    function validateCurrentStep() {
        // Add validation logic for each step
        switch(currentStep) {
            case 0: // Vendor selection
                return document.querySelector('.vendor-card.selected') !== null;
            case 1: // Industry selection
                return document.getElementById('industry-selector').value !== 'none';
            case 2: // Organization details
                return validateOrganizationForm();
            default:
                return true;
        }
    }
}

// Update wizard navigation buttons
function updateWizardNavigation() {
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const currentStep = document.querySelector('.wizard-step-content.active');
    
    if (nextBtn) {
        nextBtn.disabled = !validateCurrentStep();
    }
    
    if (prevBtn) {
        prevBtn.style.display = currentStep?.previousElementSibling ? 'inline-flex' : 'none';
    }
}

// Initialize form handlers
function initializeFormHandlers() {
    // Organization size handler
    const orgSizeSelect = document.getElementById('organization-size');
    if (orgSizeSelect) {
        orgSizeSelect.addEventListener('change', updateDeviceCountRange);
    }
    
    // Multiple locations handler
    const multipleLocations = document.getElementById('multiple-locations');
    const locationCountContainer = document.getElementById('location-count-container');
    
    if (multipleLocations && locationCountContainer) {
        multipleLocations.addEventListener('change', (e) => {
            if (e.target.checked) {
                locationCountContainer.classList.remove('hidden');
                gsap.from(locationCountContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(locationCountContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        locationCountContainer.classList.add('hidden');
                    }
                });
            }
        });
    }
    
    // Legacy devices handler
    const legacyDevices = document.getElementById('legacy-devices');
    const legacyPercentageContainer = document.getElementById('legacy-percentage-container');
    
    if (legacyDevices && legacyPercentageContainer) {
        legacyDevices.addEventListener('change', (e) => {
            if (e.target.checked) {
                legacyPercentageContainer.classList.remove('hidden');
                gsap.from(legacyPercentageContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(legacyPercentageContainer, {
                    opacity: 0,
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        legacyPercentageContainer.classList.add('hidden');
                    }
                });
            }
        });
    }
}

// Validate organization form
function validateOrganizationForm() {
    const deviceCount = document.getElementById('device-count').value;
    return deviceCount && parseInt(deviceCount) > 0;
}

// Update device count range based on organization size
function updateDeviceCountRange(e) {
    const deviceCountInput = document.getElementById('device-count');
    const size = e.target.value;
    
    const ranges = {
        small: { min: 100, max: 1000, default: 500 },
        medium: { min: 1000, max: 5000, default: 2500 },
        large: { min: 5000, max: 50000, default: 10000 }
    };
    
    if (deviceCountInput && ranges[size]) {
        deviceCountInput.min = ranges[size].min;
        deviceCountInput.max = ranges[size].max;
        deviceCountInput.value = ranges[size].default;
    }
}

// Export functions for use in other modules
window.updateVendorInfo = updateVendorInfo;
window.updateWizardNavigation = updateWizardNavigation;
EOF

# Install npm dependencies if npm is available
if command -v npm &> /dev/null; then
    echo "📦 Installing npm dependencies..."
    npm install
else
    echo "⚠️  npm not found. Please install Node.js and run 'npm install' manually."
fi

# Create a simple Python server script
echo "🐍 Creating development server script..."
cat > server.py << 'EOF'
#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import threading
import time

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

# Configure handler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
})

def open_browser():
    time.sleep(1)
    webbrowser.open(f'http://localhost:{PORT}')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Server running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Open browser in a separate thread
    threading.Thread(target=open_browser).start()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n⏹️  Server stopped")
        httpd.shutdown()
EOF

chmod +x server.py

# Create README with setup instructions
echo "📝 Creating README..."
cat > README.md << 'EOF'
# NAC Architecture Designer Pro - Enhanced Edition

An enhanced Zero Trust NAC Architecture Designer with stunning visuals, animations, and improved user experience.

## Features

- 🎨 Modern, responsive UI with dark mode support
- 📊 Enhanced charts with animations and interactions
- 🚀 Smooth transitions and micro-interactions
- 📱 Mobile-friendly design
- 🔍 Advanced sensitivity analysis
- 📄 Comprehensive reporting capabilities
- 🎯 Vendor comparison with visual metrics
- 💡 Smart tooltips and guided workflow

## Setup

1. **Clone or download this repository**

2. **Install dependencies (optional, for development)**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using Python
   python3 server.py
   
   # Or using Node.js
   npm run serve
   ```

4. **Open your browser** to `http://localhost:8080`

## Development Scripts

- `npm run lint` - Run ESLint on all JavaScript files
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run build` - Run linting and formatting

## Project Structure

```
├── css/               # Stylesheets
├── js/               # JavaScript modules
│   ├── core/         # Core utilities
│   ├── managers/     # State management
│   ├── components/   # UI components
│   ├── charts/       # Chart configurations
│   ├── data/         # Data models
│   └── reports/      # Report generators
├── libs/             # Third-party libraries
├── img/              # Images and icons
├── data/             # Static data files
├── index.html        # Main application
└── sensitivity.html  # Sensitivity analysis page
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.
EOF

# Create license file
echo "📜 Creating LICENSE..."
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Portnox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Create empty placeholder files
echo "📄 Creating placeholder files..."
touch img/favicon.png
touch img/portnox-logo.png

# Create vendor logo placeholders
mkdir -p img/vendors
for vendor in cisco aruba forescout fortinac microsoft securew2; do
    touch "img/vendors/${vendor}-logo.png"
done

# Create icon placeholders
mkdir -p img/icons
touch img/icons/no-nac-icon.svg

# Create remaining core files from the referenced structure
echo "📁 Creating remaining core JavaScript files..."

# Create core helpers
cat > js/core/helpers.js << 'EOF'
// Helper functions for the application
const Helpers = {
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    },
    
    formatPercentage(value) {
        return `${(value * 100).toFixed(1)}%`;
    },
    
    formatNumber(value) {
        return new Intl.NumberFormat('en-US').format(value);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};

window.Helpers = Helpers;
EOF

# Create DOM utilities
cat > js/core/dom.js << 'EOF'
// DOM manipulation utilities
const DOM = {
    getElement(selector) {
        return document.querySelector(selector);
    },
    
    getAllElements(selector) {
        return document.querySelectorAll(selector);
    },
    
    addClass(element, className) {
        element.classList.add(className);
    },
    
    removeClass(element, className) {
        element.classList.remove(className);
    },
    
    toggleClass(element, className) {
        element.classList.toggle(className);
    },
    
    hasClass(element, className) {
        return element.classList.contains(className);
    },
    
    setContent(element, content) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        if (element) {
            element.innerHTML = content;
        }
    },
    
    setValue(element, value) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        if (element) {
            element.value = value;
        }
    },
    
    getValue(element) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        return element ? element.value : null;
    }
};

window.DOM = DOM;
EOF

# Create validation utilities
cat > js/core/validation.js << 'EOF'
// Form validation utilities
const Validation = {
    rules: {
        required: (value) => value !== null && value !== undefined && value !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        number: (value) => !isNaN(value) && isFinite(value),
        min: (value, min) => parseFloat(value) >= min,
        max: (value, max) => parseFloat(value) <= max,
        minLength: (value, length) => value.length >= length,
        maxLength: (value, length) => value.length <= length
    },
    
    validate(value, rules) {
        const errors = [];
        
        for (const [rule, param] of Object.entries(rules)) {
            if (rule === 'required' && param && !this.rules.required(value)) {
                errors.push('This field is required');
            }
            if (rule === 'email' && param && !this.rules.email(value)) {
                errors.push('Please enter a valid email address');
            }
            if (rule === 'number' && param && !this.rules.number(value)) {
                errors.push('Please enter a valid number');
            }
            if (rule === 'min' && !this.rules.min(value, param)) {
                errors.push(`Value must be at least ${param}`);
            }
            if (rule === 'max' && !this.rules.max(value, param)) {
                errors.push(`Value must be at most ${param}`);
            }
        }
        
        return errors;
    },
    
    validateForm(formElement) {
        const errors = {};
        const inputs = formElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const rules = input.dataset.validate ? JSON.parse(input.dataset.validate) : {};
            const fieldErrors = this.validate(input.value, rules);
            
            if (fieldErrors.length > 0) {
                errors[input.name || input.id] = fieldErrors;
            }
        });
        
        return errors;
    }
};

window.Validation = Validation;
EOF

# Create manager files
echo "📝 Creating manager files..."

# Loading manager
cat > js/managers/loading.js << 'EOF'
// Loading state management
const LoadingManager = {
    show(message = 'Loading...') {
        if (window.EnhancedUI) {
            window.EnhancedUI.showLoading(message);
        }
    },
    
    hide() {
        if (window.EnhancedUI) {
            window.EnhancedUI.hideLoading();
        }
    },
    
    async withLoading(asyncFunction, message = 'Loading...') {
        this.show(message);
        try {
            const result = await asyncFunction();
            this.hide();
            return result;
        } catch (error) {
            this.hide();
            throw error;
        }
    }
};

window.LoadingManager = LoadingManager;
EOF

# Create a basic HTML structure for vendor logos
echo "🖼️ Creating SVG placeholders..."
cat > img/icons/no-nac-icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="45" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
  <line x1="20" y1="20" x2="80" y2="80" stroke="#dc3545" stroke-width="6" stroke-linecap="round"/>
  <line x1="80" y1="20" x2="20" y2="80" stroke="#dc3545" stroke-width="6" stroke-linecap="round"/>
</svg>
EOF

echo "
✅ Enhanced restoration script completed successfully!

📁 Project structure created with:
   - Enhanced CSS with animations and themes
   - Modern JavaScript modules with ES6+
   - Stunning chart configurations
   - Enhanced UI components
   - ESLint and Prettier configurations
   - Development server script
   - Complete documentation

🚀 To start the application:
   1. Run: python3 server.py
   2. Open: http://localhost:8080

📝 To run linting:
   - npm run lint (check for issues)
   - npm run lint:fix (auto-fix issues)
   - npm run format (format with Prettier)

🎨 Features included:
   - Dark mode support
   - Particle animations
   - GSAP animations
   - Enhanced charts with Chart.js
   - D3.js visualizations
   - CountUp number animations
   - AOS scroll animations
   - Responsive design
   - Loading states
   - Toast notifications
   - Enhanced forms

📚 Documentation available in README.md

Happy coding! 🎉
"
