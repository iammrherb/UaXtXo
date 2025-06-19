// Validation Utilities
window.Validators = {
    isValidEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    isValidNumber: function(value, min, max) {
        const num = Number(value);
        return !isNaN(num) && num >= min && num <= max;
    }
};
console.log('✅ Validators utility loaded');
