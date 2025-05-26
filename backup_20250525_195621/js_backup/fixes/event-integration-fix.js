// Fix event-driven integration
document.addEventListener('DOMContentLoaded', function() {
  // Connect to existing calculator events
  if (window.zeroTrustCalculator) {
    window.zeroTrustCalculator.addEventListener('calculationComplete', function(data) {
      if (window.ultimateExecutiveView) {
        window.ultimateExecutiveView.updateFromCalculation(data);
      }
    });
  }
  
  // Listen for vendor changes from sidebar
  document.querySelectorAll('.vendor-card').forEach(card => {
    card.addEventListener('click', function() {
      const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
        .map(c => c.getAttribute('data-vendor'));
      
      if (window.ultimateExecutiveView) {
        window.ultimateExecutiveView.selectedVendors = selectedVendors;
        window.ultimateExecutiveView.refreshCharts();
      }
    });
  });
  
  // Listen for configuration changes
  document.querySelectorAll('#sidebar input, #sidebar select').forEach(input => {
    input.addEventListener('change', function() {
      const config = {
        deviceCount: document.getElementById('device-count')?.value,
        industry: document.getElementById('industry')?.value,
        companySize: document.getElementById('company-size')?.value
      };
      
      if (window.ultimateExecutiveView) {
        window.ultimateExecutiveView.updateConfiguration(config);
      }
    });
  });
});
