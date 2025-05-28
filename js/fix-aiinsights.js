// Simple fix for aiInsights linking
if (window.aiInsightsEngine && !window.aiInsights) {
    window.aiInsights = window.aiInsightsEngine;
}
