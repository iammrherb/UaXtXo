// Cost Models
window.CostModels = {
    calculateTCO: function(vendor, devices, years) {
        return {
            total: 500000,
            perDevice: 200,
            perMonth: 17
        };
    }
};
console.log('✅ Cost Models loaded');
