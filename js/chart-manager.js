// Chart Manager Module
defineModule('ChartManager', ['VendorDatabase'], function(VendorDB) {
    'use strict';

    const charts = new Map();
    
    const defaultOptions = {
        chart: {
            style: {
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
        },
        colors: ['#00a4e4', '#1e3a5f', '#00d4aa', '#ffc107', '#dc3545', '#6c757d'],
        credits: { enabled: false },
        exporting: { enabled: true }
    };

    function createTCOChart(containerId, vendors) {
        const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
        const series = vendors.map(vendor => {
            const data = [];
            let cumulative = 0;
            
            for (let year = 1; year <= 5; year++) {
                if (vendor.pricing.model.includes('subscription')) {
                    cumulative += vendor.pricing.basePrice * 1000 * 12; // Monthly to annual
                } else {
                    cumulative += year === 1 ? vendor.pricing.basePrice : vendor.pricing.basePrice * vendor.pricing.annualMaintenance;
                }
                data.push(cumulative);
            }
            
            return { name: vendor.name, data };
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'line' },
            title: { text: null },
            xAxis: { categories },
            yAxis: { 
                title: { text: 'Total Cost ($)' },
                labels: { 
                    formatter: function() { 
                        return '$' + Highcharts.numberFormat(this.value, 0); 
                    } 
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                           this.x + ': $' + Highcharts.numberFormat(this.y, 0);
                }
            },
            series
        });
    }

    function createROIChart(containerId, vendors) {
        const portnox = vendors.find(v => v.id === 'portnox');
        if (!portnox) return;

        const series = vendors.filter(v => v.id !== 'portnox').map(vendor => {
            const data = [];
            for (let year = 1; year <= 5; year++) {
                const portnoxCost = portnox.pricing.basePrice * 1000 * 12 * year;
                const vendorCost = vendor.pricing.model.includes('subscription') 
                    ? vendor.pricing.basePrice * 1000 * 12 * year
                    : vendor.pricing.basePrice + (vendor.pricing.basePrice * vendor.pricing.annualMaintenance * (year - 1));
                
                const savings = vendorCost - portnoxCost;
                const roi = (savings / portnoxCost) * 100;
                data.push(roi);
            }
            
            return { name: `vs ${vendor.name}`, data };
        });

        return Highcharts.chart(containerId, {
            ...defaultOptions,
            chart: { type: 'column' },
            title: { text: null },
            xAxis: { categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] },
            yAxis: { 
                title: { text: 'ROI (%)' },
                labels: { formatter: function() { return this.value + '%'; } }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                           this.x + ': ' + Highcharts.numberFormat(this.y, 1) + '%';
                }
            },
            series
        });
    }

    return {
        initializeCharts: function(vendorIds) {
            const vendors = vendorIds.map(id => VendorDB.getVendor(id)).filter(Boolean);
            
            // TCO Chart
            if (document.getElementById('tcoChart')) {
                charts.set('tco', createTCOChart('tcoChart', vendors));
            }
            
            // ROI Chart
            if (document.getElementById('roiChart')) {
                charts.set('roi', createROIChart('roiChart', vendors));
            }
        },
        
        refreshTab: function(tabName) {
            // Refresh charts when tab changes
            charts.forEach(chart => {
                if (chart && chart.reflow) {
                    chart.reflow();
                }
            });
        },
        
        updateCharts: function(vendorIds) {
            this.initializeCharts(vendorIds);
        }
    };
});
