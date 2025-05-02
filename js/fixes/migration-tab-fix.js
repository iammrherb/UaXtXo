/**
 * Migration tab enhancement fix
 * Adds risk management section to migration tab
 */
document.addEventListener('DOMContentLoaded', function() {
  const migrationTab = document.getElementById('migration-tab');
  if (!migrationTab) return;
  
  // Add risk factors container if not already present
  if (!document.getElementById('risk-factors-container')) {
    const riskContainer = document.createElement('div');
    riskContainer.id = 'risk-factors-container';
    riskContainer.className = 'hidden';
    migrationTab.appendChild(riskContainer);
  }
});
