/**
 * Sensitivity Calculator
 * Performs sensitivity analysis on TCO calculations
 */

const SensitivityCalculator = (function() {
    
    function calculate(baseResults, wizardState) {
        const sensitivityResults = {
            factors: wizardState.sensitivityFactors,
            impact: {},
            scenarios: {},
            charts: {}
        };
        
        // Calculate impact of each sensitivity factor
        Object.keys(wizardState.sensitivityFactors).forEach(factor => {
            sensitivityResults.impact[factor] = calculateFactorImpact(
                factor,
                wizardState.sensitivityFactors[factor],
                baseResults,
                wizardState
            );
        });
        
        // Generate scenarios
        sensitivityResults.scenarios = generateScenarios(baseResults, wizardState);
        
        // Generate chart data
        sensitivityResults.charts = generateSensitivityCharts(sensitivityResults, baseResults);
        
        return sensitivityResults;
    }
    
    function calculateFactorImpact(factor, value, baseResults, wizardState) {
        // Create modified state with single factor changed
        const modifiedState = JSON.parse(JSON.stringify(wizardState));
        modifiedState.sensitivityFactors = { ...wizardState.sensitivityFactors };
        modifiedState.sensitivityFactors[factor] = value;
        
        // Recalculate TCO with modified factor
        const modifiedResults = TCOCalculator.calculate(modifiedState);
        
        // Calculate impact
        const impact = {};
        Object.keys(baseResults.vendors).forEach(vendorId => {
            const baseTCO = baseResults.vendors[vendorId].totalTCO;
            const modifiedTCO = modifiedResults.vendors[vendorId].totalTCO;
            
            impact[vendorId] = {
                tcoDifference: modifiedTCO - baseTCO,
                percentageChange: ((modifiedTCO - baseTCO) / baseTCO) * 100
            };
        });
        
        return impact;
    }
    
    function generateScenarios(baseResults, wizardState) {
        const scenarios = {
            bestCase: calculateScenario('best', baseResults, wizardState),
            worstCase: calculateScenario('worst', baseResults, wizardState),
            mostLikely: calculateScenario('likely', baseResults, wizardState)
        };
        
        return scenarios;
    }
    
    function calculateScenario(type, baseResults, wizardState) {
        const scenarioFactors = {
            best: {
                itStaffCost: -20,
                hardwareCost: -30,
                energyCost: -25,
                downtime: -50,
                security: -25
            },
            worst: {
                itStaffCost: 30,
                hardwareCost: 50,
                energyCost: 100,
                downtime: 200,
                security: 300
            },
            likely: {
                itStaffCost: 5,
                hardwareCost: 10,
                energyCost: 15,
                downtime: 25,
                security: 50
            }
        };
        
        // Create scenario state
        const scenarioState = JSON.parse(JSON.stringify(wizardState));
        scenarioState.sensitivityFactors = scenarioFactors[type];
        
        // Calculate scenario results
        const scenarioResults = TCOCalculator.calculate(scenarioState);
        
        return {
            name: type,
            factors: scenarioFactors[type],
            results: scenarioResults
        };
    }
    
    function generateSensitivityCharts(sensitivityResults, baseResults) {
        const charts = {
            tornado: generateTornadoChart(sensitivityResults.impact, baseResults),
            scenario: generateScenarioChart(sensitivityResults.scenarios),
            spider: generateSpiderChart(sensitivityResults.impact)
        };
        
        return charts;
    }
    
    function generateTornadoChart(impact, baseResults) {
        const data = {
            labels: [],
            datasets: []
        };
        
        // Get factors sorted by impact magnitude
        const factors = Object.keys(impact).sort((a, b) => {
            const aImpact = Math.abs(impact[a].portnox?.percentageChange || 0);
            const bImpact = Math.abs(impact[b].portnox?.percentageChange || 0);
            return bImpact - aImpact;
        });
        
        data.labels = factors.map(f => formatFactorName(f));
        
        // Create dataset for each vendor
        Object.keys(baseResults.vendors).forEach(vendorId => {
            data.datasets.push({
                label: baseResults.vendors[vendorId].vendorName,
                data: factors.map(f => impact[f][vendorId]?.percentageChange || 0),
                backgroundColor: vendorId === 'portnox' ? '#2BD25B' : '#1B67B2'
            });
        });
        
        return data;
    }
    
    function generateScenarioChart(scenarios) {
        const data = {
            labels: ['Best Case', 'Most Likely', 'Worst Case'],
            datasets: []
        };
        
        const scenarioOrder = ['bestCase', 'mostLikely', 'worstCase'];
        
        // Get unique vendor IDs
        const vendorIds = new Set();
        scenarioOrder.forEach(scenario => {
            Object.keys(scenarios[scenario].results.vendors).forEach(id => vendorIds.add(id));
        });
        
        // Create dataset for each vendor
        vendorIds.forEach(vendorId => {
            const vendorData = scenarioOrder.map(scenario => 
                scenarios[scenario].results.vendors[vendorId]?.totalTCO || 0
            );
            
            data.datasets.push({
                label: scenarios.mostLikely.results.vendors[vendorId]?.vendorName || vendorId,
                data: vendorData,
                borderColor: vendorId === 'portnox' ? '#2BD25B' : '#1B67B2',
                fill: false
            });
        });
        
        return data;
    }
    
    function generateSpiderChart(impact) {
        const data = {
            labels: Object.keys(impact).map(f => formatFactorName(f)),
            datasets: []
        };
        
        // Create dataset showing sensitivity of each factor
        const portnoxData = Object.keys(impact).map(f => 
            Math.abs(impact[f].portnox?.percentageChange || 0)
        );
        
        data.datasets.push({
            label: 'Sensitivity Impact (%)',
            data: portnoxData,
            backgroundColor: 'rgba(43, 210, 91, 0.2)',
            borderColor: '#2BD25B',
            pointBackgroundColor: '#2BD25B'
        });
        
        return data;
    }
    
    function formatFactorName(factor) {
        const names = {
            itStaffCost: 'IT Staff Cost',
            hardwareCost: 'Hardware Cost',
            energyCost: 'Energy Cost',
            downtime: 'Downtime Impact',
            security: 'Security Risk'
        };
        
        return names[factor] || factor;
    }
    
    // Public API
    return {
        calculate,
        calculateFactorImpact,
        generateScenarios
    };
})();

// Export for use in other modules
window.SensitivityCalculator = SensitivityCalculator;
