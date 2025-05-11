/**
 * Chart Fix Verification Script
 * Run this in the browser console to verify the fix is working
 */

(function() {
  console.log("🔍 Verifying chart fix installation...");
  
  // Check if chartBuilder is available
  if (typeof window.chartBuilder === 'undefined') {
    console.error("❌ Chart fix not installed properly - chartBuilder not found!");
    return;
  }
  
  console.log("✅ chartBuilder found");
  
  // Check if charts are initialized
  const charts = ['tco-comparison-chart', 'cumulative-cost-chart', 
                  'current-breakdown-chart', 'alternative-breakdown-chart',
                  'implementation-comparison-chart', 'feature-comparison-chart', 
                  'roi-chart'];
  
  const activeCharts = charts.filter(chartId => {
    const chartInstance = window.chartBuilder.getChartInstance(chartId);
    return !!chartInstance;
  });
  
  console.log(`✅ ${activeCharts.length} charts currently active`);
  console.log("📊 Active charts: " + activeCharts.join(", "));
  
  // Verify tab switching will initialize charts
  console.log("ℹ️ To complete verification, click through all tabs and check console for errors");
  
  console.log("🎉 Fix verification complete - monitor for any console errors during usage");
})();
