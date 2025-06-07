// Formatting Utilities
window.Formatters = {
    currency: function(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value);
    },
    number: function(value) {
        return new Intl.NumberFormat('en-US').format(value);
    },
    percentage: function(value) {
        return value + '%';
    }
};
console.log('✅ Formatters utility loaded');
