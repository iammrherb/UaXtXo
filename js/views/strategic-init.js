/**
 * Strategic Insights Tab Initialization
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('💡 Initializing Strategic Insights Tab...');
    
    const checkPlatform = setInterval(() => {
        if (window.platform && window.platform.renderStrategicInsights) {
            clearInterval(checkPlatform);
            integrateStrategicModule();
        }
    }, 100);
    
    function integrateStrategicModule() {
        window.platform.renderStrategicInsights = function(container) {
            console.log('📊 Rendering Strategic Insights...');
            
            if (!container) return;
            
            container.innerHTML = `
                <div class="strategic-insights">
                    <div class="strategic-header">
                        <h2 class="gradient-text">Strategic Decision Dashboard</h2>
                        <div class="winner-announcement">
                            <i class="fas fa-trophy"></i>
                            <h3>Portnox CLEAR - Recommended Solution</h3>
                            <p>Best overall value with superior Zero Trust capabilities</p>
                        </div>
                    </div>
                    
                    <div class="strategic-summary">
                        <h3>Executive Summary</h3>
                        <div class="summary-points">
                            <div class="summary-point">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <h4>Financial Advantage</h4>
                                    <p>35% lower TCO compared to competitors with ${this.calculationResults?.portnox?.year3?.roi?.paybackMonths || 12} month payback</p>
                                </div>
                            </div>
                            <div class="summary-point">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <h4>Security Excellence</h4>
                                    <p>92% Zero Trust maturity score with comprehensive threat protection</p>
                                </div>
                            </div>
                            <div class="summary-point">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <h4>Operational Efficiency</h4>
                                    <p>85% automation level reducing manual tasks and errors</p>
                                </div>
                            </div>
                            <div class="summary-point">
                                <i class="fas fa-check-circle"></i>
                                <div>
                                    <h4>Rapid Deployment</h4>
                                    <p>30-day implementation with cloud-native architecture</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="strategic-actions">
                        <h3>Recommended Actions</h3>
                        <div class="action-timeline">
                            <div class="action-item immediate">
                                <div class="timeline-marker">NOW</div>
                                <div class="action-content">
                                    <h4>Immediate Actions</h4>
                                    <ul>
                                        <li>Schedule Portnox demo and proof of concept</li>
                                        <li>Secure executive approval and budget</li>
                                        <li>Identify pilot deployment group</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="action-item short-term">
                                <div class="timeline-marker">30 DAYS</div>
                                <div class="action-content">
                                    <h4>Short-term Implementation</h4>
                                    <ul>
                                        <li>Deploy Portnox to pilot group</li>
                                        <li>Configure Zero Trust policies</li>
                                        <li>Train IT team on platform</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="action-item long-term">
                                <div class="timeline-marker">90 DAYS</div>
                                <div class="action-content">
                                    <h4>Full Deployment</h4>
                                    <ul>
                                        <li>Complete organization-wide rollout</li>
                                        <li>Optimize security policies</li>
                                        <li>Measure ROI and report success</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };
    }
});
