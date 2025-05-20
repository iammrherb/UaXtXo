/**
 * NAC Architecture Designer - Bridge Module
 * This fixes key issues with initialization and prevents duplicate declarations
 */
(function() {
    // Store references to prevent circular references
    window._moduleRegistry = window._moduleRegistry || {};
    
    // Fix Chart.js
    if (window.Chart && window.Chart.instances && !window.Chart.instances.forEach) {
        window.Chart.instances.forEach = function(callback) {
            Array.from(Object.values(window.Chart.instances)).forEach(callback);
        };
        console.log("Added forEach method to Chart.instances");
    }
    
    // Safe module loader
    window.loadModule = function(name, initializer) {
        if (window._moduleRegistry[name]) {
            console.log("Module " + name + " already loaded, using existing instance");
            return window._moduleRegistry[name];
        }
        
        try {
            window._moduleRegistry[name] = typeof initializer === 'function' 
                ? initializer(window[name]) 
                : (window[name] || {});
            
            return window._moduleRegistry[name];
        } catch (error) {
            console.error("Error loading module " + name, error);
            return {};
        }
    };
    
    // Fix resource loading
    window.getResource = function(path) {
        const basePath = "https://iammrherb.github.io/UaXtXo/";
        const fallbackResources = {
            'fa-solid-900.woff2': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
            'fa-solid-900.ttf': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.ttf'
        };
        
        const resource = path.split('/').pop();
        return fallbackResources[resource] || (basePath + path);
    };
    
    // Fix circular DOM references
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(child) {
        if (this === child || child.contains(this)) {
            console.warn("Prevented circular DOM reference in appendChild");
            return child;
        }
        return originalAppendChild.call(this, child);
    };
    
    // Handle chart initialization safely
    window.safeInitChart = function(chartId, config) {
        try {
            const canvas = document.getElementById(chartId);
            if (!canvas) {
                console.warn("Canvas element not found:", chartId);
                return null;
            }
            
            // Destroy existing chart if any
            if (window.Chart.getChart(canvas)) {
                window.Chart.getChart(canvas).destroy();
                console.log("Destroyed Chart.js v3.x+ chart on canvas", chartId);
            }
            
            // Reset canvas dimensions
            const parent = canvas.parentElement;
            const width = parent ? parent.clientWidth : 300;
            const height = parent ? parent.clientHeight : 200;
            
            canvas.width = width;
            canvas.height = height;
            
            return new window.Chart(canvas, config);
        } catch (error) {
            console.error("Error initializing chart " + chartId, error);
            return null;
        }
    };
    
    console.log("NAC Bridge module loaded successfully");
})();
