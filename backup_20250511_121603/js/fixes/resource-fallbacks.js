/**
 * NAC Architecture Designer Pro - Resource Fallbacks
 */
(function() {
    console.log("Installing resource fallbacks");

    // Define fallback resources
    const fallbackResources = {
        'fa-solid-900.woff2': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
        'fa-solid-900.ttf': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.ttf'
    };
    
    // Get resource with fallback
    window.getResource = function(path) {
        if (!path) return null;
        
        const filename = path.split('/').pop();
        if (fallbackResources[filename]) {
            console.log("Using fallback for resource: " + filename);
            return fallbackResources[filename];
        }
        
        return path;
    };
    
    // Override fetch to use fallbacks
    const originalFetch = window.fetch;
    window.fetch = function(resource, options) {
        if (typeof resource === 'string') {
            const filename = resource.split('/').pop();
            if (fallbackResources[filename]) {
                console.log("Using fallback for fetch resource: " + filename);
                resource = fallbackResources[filename];
            }
        }
        
        return originalFetch.call(this, resource, options);
    };
    
    // Override XMLHttpRequest.open to use fallbacks
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        if (typeof url === 'string') {
            const filename = url.split('/').pop();
            if (fallbackResources[filename]) {
                console.log("Using fallback for XHR resource: " + filename);
                url = fallbackResources[filename];
            }
        }
        
        return originalOpen.call(this, method, url, async, user, password);
    };
    
    // Fix CSS resource URLs
    function fixCssResourceUrls() {
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(function(element) {
            if (element.tagName === 'LINK') {
                // For external stylesheets, we can't modify them directly
                // But we can create a new one with a proxy
            } else if (element.tagName === 'STYLE') {
                // For inline styles, we can replace URLs
                let cssText = element.textContent;
                for (const filename in fallbackResources) {
                    const urlPattern = new RegExp('url\\([\'"]?([^\'")]*' + filename + ')[\'"]?\\)', 'g');
                    cssText = cssText.replace(urlPattern, 'url("' + fallbackResources[filename] + '")');
                }
                element.textContent = cssText;
            }
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixCssResourceUrls);
    } else {
        fixCssResourceUrls();
    }
    
    console.log("Resource fallbacks installed");
})();
