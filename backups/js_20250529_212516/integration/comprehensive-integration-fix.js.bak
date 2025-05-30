// Fix for the waitForComponents function
async waitForComponents() {
    return new Promise((resolve) => {
        const checkComponents = () => {
            const componentsReady = {
                ultimateView: window.ultimateExecutiveView,
                comprehensiveData: !!(window.comprehensiveIndustries && window.comprehensiveCompliance),
                chartLibraries: typeof Highcharts !== 'undefined' || typeof ApexCharts !== 'undefined'
            };
            
            console.log('🔍 Checking components:', componentsReady);
            
            if (Object.values(componentsReady).every(Boolean)) {
                console.log('✅ All components ready');
                resolve();
            } else {
                console.log('⏳ Waiting for components...');
                setTimeout(checkComponents, 500);
            }
        };
        
        checkComponents();
    });
}
