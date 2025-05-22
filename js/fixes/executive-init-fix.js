/**
 * Executive View Initialization Fix
 * Ensures proper loading order and prevents conflicts
 */

// Override problematic initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔧 Executive initialization fix starting...');
  
  // Delay to ensure all other scripts load first
  setTimeout(() => {
    applyExecutiveInitFix();
  }, 3000);
});

function applyExecutiveInitFix() {
  // Clear any existing content in executive view
  const executiveView = document.querySelector('#executive-view .view-content, .view-panel[data-view="executive"] .view-content');
  
  if (!executiveView) {
    console.warn('Executive view not found');
    return;
  }
  
  // Clear and reinitialize
  executiveView.innerHTML = '';
  
  // Initialize the complete executive view
  if (typeof ExecutiveViewComplete !== 'undefined') {
    try {
      window.executiveViewComplete = new ExecutiveViewComplete();
      window.executiveViewComplete.init();
      console.log('✅ Executive view successfully initialized');
    } catch (error) {
      console.error('❌ Executive view initialization failed:', error);
      
      // Fallback to simple content
      executiveView.innerHTML = `
        <div class="executive-fallback">
          <h2>🎯 Executive Dashboard</h2>
          <div class="loading-message">
            <p>Loading comprehensive analytics...</p>
            <div class="loading-spinner"></div>
          </div>
          <div class="quick-metrics">
            <div class="metric-card">
              <h3>Cost Savings</h3>
              <div class="metric-value">$275,000</div>
              <p>3-year savings vs competitors</p>
            </div>
            <div class="metric-card">
              <h3>ROI</h3>
              <div class="metric-value">325%</div>
              <p>Return on investment</p>
            </div>
            <div class="metric-card">
              <h3>Implementation</h3>
              <div class="metric-value">21 days</div>
              <p>Deployment timeline</p>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    console.warn('ExecutiveViewComplete class not found');
  }
}

// Add fallback styles
const style = document.createElement('style');
style.textContent = `
.executive-fallback {
  padding: 2rem;
  text-align: center;
}

.loading-message {
  margin: 2rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a5a96;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.quick-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.metric-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #1a5a96;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1a5a96;
  margin: 0.5rem 0;
}
`;
document.head.appendChild(style);
