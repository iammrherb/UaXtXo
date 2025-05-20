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
