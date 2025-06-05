/**
 * Test Data Generator for Demo Purposes
 * Generates realistic-looking data for demonstrations
 */

class TestDataGenerator {
    constructor() {
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    
    generateTimeSeriesData(months = 12, baseValue = 100000, variance = 0.2) {
        const data = [];
        let currentValue = baseValue;
        
        for (let i = 0; i < months; i++) {
            const change = (Math.random() - 0.5) * variance;
            currentValue = currentValue * (1 + change);
            data.push({
                month: this.months[i % 12],
                value: Math.round(currentValue)
            });
        }
        
        return data;
    }
    
    generateComparisonData(vendors, metric = 'cost') {
        return vendors.map(vendor => ({
            vendor: vendor,
            value: Math.round(Math.random() * 100000 + 50000)
        }));
    }
    
    generateRiskMatrix(vendors, risks) {
        const matrix = [];
        vendors.forEach((vendor, vIndex) => {
            risks.forEach((risk, rIndex) => {
                matrix.push({
                    vendor: vIndex,
                    risk: rIndex,
                    score: Math.round(Math.random() * 100)
                });
            });
        });
        return matrix;
    }
}

window.TestDataGenerator = TestDataGenerator;
