// Utility Functions
const Utils = {
    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    },
    
    formatPercentage(value) {
        return `${value.toFixed(1)}%`;
    },
    
    calculateROI(investment, returns, years) {
        return ((returns - investment) / investment) * 100;
    }
};
