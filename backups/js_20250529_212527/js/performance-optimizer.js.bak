/**
 * Performance Optimization Module
 * Ensures smooth operation and optimal performance
 */

(function() {
    'use strict';
    
    console.log('⚡ Initializing performance optimizations...');
    
    // Lazy load images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    // Debounce function for resize events
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Optimize animations
    const optimizeAnimations = () => {
        // Use will-change for elements that will animate
        document.querySelectorAll('.hover-lift, .animate-fade-in').forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
        
        // Remove will-change after animations complete
        setTimeout(() => {
            document.querySelectorAll('[style*="will-change"]').forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 5000);
    };
    
    // Optimize chart rendering
    const optimizeCharts = () => {
        if (window.Chart) {
            Chart.defaults.animation.duration = 750;
            Chart.defaults.elements.line.tension = 0.4;
            Chart.defaults.devicePixelRatio = 1.5; // Balance quality vs performance
        }
        
        if (window.Highcharts) {
            Highcharts.setOptions({
                plotOptions: {
                    series: {
                        animation: {
                            duration: 750
                        }
                    }
                }
            });
        }
    };
    
    // Initialize optimizations
    document.addEventListener('DOMContentLoaded', () => {
        lazyLoadImages();
        optimizeAnimations();
        optimizeCharts();
        
        // Optimize resize handling
        window.addEventListener('resize', debounce(() => {
            // Handle responsive updates
            if (window.portnoxPlatform?.handleResize) {
                window.portnoxPlatform.handleResize();
            }
        }, 250));
        
        console.log('✅ Performance optimizations applied');
    });
})();
