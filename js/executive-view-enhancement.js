/**
 * Executive View Enhancement
 * Improves executive summaries and comparison data
 */
(function() {
    console.log("📊 Enhancing executive view...");
    
    // Enhance executive summaries with more compelling data
    function enhanceExecutiveSummary() {
        console.log("Enhancing executive summary...");
        
        const summaryPanel = document.getElementById('executive-summary');
        if (!summaryPanel) {
            console.error("Executive summary panel not found");
            return;
        }
        
        // Update intro text to be more impactful
        const panelHeader = summaryPanel.querySelector('.panel-header');
        if (panelHeader) {
            const subtitle = panelHeader.querySelector('.subtitle');
            if (subtitle) {
                subtitle.textContent = "Strategic analysis of cost savings, security enhancements, and operational efficiency";
            }
        }
        
        // Add key findings section if it doesn't exist
        let keyFindings = summaryPanel.querySelector('.key-findings');
        if (!keyFindings) {
            console.log("Adding key findings section...");
            
            // Find the dashboard grid
            const dashboardGrid = summaryPanel.querySelector('.dashboard-grid');
            if (dashboardGrid) {
                // Create key findings element
                keyFindings = document.createElement('div');
                keyFindings.className = 'key-findings';
                keyFindings.innerHTML = `
                    <h3>Key Strategic Findings</h3>
                    <div class="findings-content">
                        <p class="finding-highlight">Portnox Cloud delivers a <strong>42-48% reduction in total cost of ownership</strong> compared to on-premises NAC solutions while providing superior security capabilities and operational efficiency.</p>
                        
                        <div class="findings-list">
                            <div class="finding-item">
                                <div class="finding-icon"><i class="fas fa-shield-alt"></i></div>
                                <div class="finding-content">
                                    <h4>Enhanced Zero Trust Security</h4>
                                    <p>Continuous verification and risk assessment reduce breach probability by up to 65% compared to traditional NAC approaches.</p>
                                </div>
                            </div>
                            
                            <div class="finding-item">
                                <div class="finding-icon"><i class="fas fa-tachometer-alt"></i></div>
                                <div class="finding-content">
                                    <h4>Operational Acceleration</h4>
                                    <p>75% faster deployment, 85% reduction in maintenance effort, and 65% less IT administration time compared to on-premises alternatives.</p>
                                </div>
                            </div>
                            
                            <div class="finding-item">
                                <div class="finding-icon"><i class="fas fa-chart-line"></i></div>
                                <div class="finding-content">
                                    <h4>Future-Proof Scalability</h4>
                                    <p>Unlimited device scaling without infrastructure changes, supporting seamless growth and hybrid work environments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Insert after dashboard grid
                dashboardGrid.parentNode.insertBefore(keyFindings, dashboardGrid.nextSibling);
                
                // Add styles for key findings
                addKeyFindingsStyles();
            }
        }
        
        // Add strategic alignment section
        let strategicAlignment = summaryPanel.querySelector('.strategic-alignment');
        if (!strategicAlignment) {
            console.log("Adding strategic alignment section...");
            
            // Find the chart container
            const chartContainer = summaryPanel.querySelector('.chart-container');
            if (chartContainer) {
                // Create strategic alignment element
                strategicAlignment = document.createElement('div');
                strategicAlignment.className = 'strategic-alignment chart-container';
                strategicAlignment.innerHTML = `
                    <h3>Strategic Alignment & Business Impact</h3>
                    <div class="strategic-alignment-grid">
                        <div class="alignment-card">
                            <div class="alignment-header">
                                <div class="alignment-icon"><i class="fas fa-coins"></i></div>
                                <h4>Financial Impact</h4>
                            </div>
                            <ul class="alignment-list">
                                <li>42-48% reduction in 3-year TCO</li>
                                <li>Shift from CapEx to predictable OpEx</li>
                                <li>Elimination of hardware refresh costs</li>
                                <li>Reduced IT personnel requirements</li>
                            </ul>
                        </div>
                        
                        <div class="alignment-card">
                            <div class="alignment-header">
                                <div class="alignment-icon"><i class="fas fa-shield-alt"></i></div>
                                <h4>Security Posture</h4>
                            </div>
                            <ul class="alignment-list">
                                <li>Continuous verification of all devices</li>
                                <li>Real-time risk assessment & remediation</li>
                                <li>Enhanced visibility across all locations</li>
                                <li>Automated compliance enforcement</li>
                            </ul>
                        </div>
                        
                        <div class="alignment-card">
                            <div class="alignment-header">
                                <div class="alignment-icon"><i class="fas fa-cogs"></i></div>
                                <h4>Operational Efficiency</h4>
                            </div>
                            <ul class="alignment-list">
                                <li>75% faster deployment timeframe</li>
                                <li>Zero maintenance overhead</li>
                                <li>Automated updates and enhancements</li>
                                <li>Simplified multi-location management</li>
                            </ul>
                        </div>
                        
                        <div class="alignment-card">
                            <div class="alignment-header">
                                <div class="alignment-icon"><i class="fas fa-chart-line"></i></div>
                                <h4>Strategic Advantage</h4>
                            </div>
                            <ul class="alignment-list">
                                <li>Unlimited scalability without infrastructure</li>
                                <li>Support for hybrid & remote workforces</li>
                                <li>Rapid adaptation to emerging threats</li>
                                <li>Enhanced organizational agility</li>
                            </ul>
                        </div>
                    </div>
                `;
                
                // Insert after chart container
                chartContainer.parentNode.insertBefore(strategicAlignment, chartContainer.nextSibling);
                
                // Add styles for strategic alignment
                addStrategicAlignmentStyles();
            }
        }
        
        console.log("Executive summary enhanced");
    }
    
    // Add styles for key findings
    function addKeyFindingsStyles() {
        const styleId = 'executive-enhancements-styles';
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .key-findings {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #65BD44;
            }
            
            .key-findings h3 {
                color: #05547C;
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 1.3rem;
            }
            
            .finding-highlight {
                font-size: 1.1rem;
                color: #333;
                margin-bottom: 20px;
                line-height: 1.5;
            }
            
            .findings-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            
            .finding-item {
                display: flex;
                gap: 15px;
            }
            
            .finding-icon {
                color: #65BD44;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .finding-content h4 {
                margin-top: 0;
                margin-bottom: 8px;
                color: #05547C;
                font-size: 1.1rem;
            }
            
            .finding-content p {
                margin: 0;
                color: #505050;
                font-size: 0.95rem;
                line-height: 1.5;
            }
            
            /* Strategic Alignment Styles */
            .strategic-alignment-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 15px;
            }
            
            .alignment-card {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.06);
            }
            
            .alignment-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            }
            
            .alignment-icon {
                width: 36px;
                height: 36px;
                background-color: #05547C;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                flex-shrink: 0;
            }
            
            .alignment-header h4 {
                margin: 0;
                color: #05547C;
                font-size: 1.1rem;
            }
            
            .alignment-list {
                margin: 0;
                padding-left: 20px;
                color: #505050;
                font-size: 0.95rem;
            }
            
            .alignment-list li {
                margin-bottom: 8px;
                line-height: 1.4;
            }
            
            .alignment-list li:last-child {
                margin-bottom: 0;
            }
            
            @media (max-width: 768px) {
                .findings-list {
                    grid-template-columns: 1fr;
                }
                
                .strategic-alignment-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Add styles for strategic alignment
    function addStrategicAlignmentStyles() {
        // Styles are added in the addKeyFindingsStyles function
    }
    
    // Enhance executive comparison view
    function enhanceComparisonView() {
        console.log("Enhancing executive comparison view...");
        
        const comparisonPanel = document.getElementById('executive-comparison');
        if (!comparisonPanel) {
            console.error("Executive comparison panel not found");
            return;
        }
        
        // Update the advantages grid if it exists
        const advantagesGrid = comparisonPanel.querySelector('.advantages-grid');
        if (advantagesGrid) {
            // Update advantages with more compelling content
            const advantageCards = advantagesGrid.querySelectorAll('.advantage-card');
            if (advantageCards.length >= 4) {
                // Update first advantage (Cloud Architecture)
                const card1 = advantageCards[0];
                const card1Content = card1.querySelector('p');
                if (card1Content) {
                    card1Content.textContent = "Eliminates hardware, maintenance, and upgrade cycles entirely. Deploy globally in hours with no local infrastructure requirements.";
                }
                
                // Update second advantage (Deployment Speed)
                const card2 = advantageCards[1];
                const card2Content = card2.querySelector('p');
                if (card2Content) {
                    card2Content.textContent = "75% faster implementation with minimal IT resources required. From purchase to production in days rather than months.";
                }
                
                // Update third advantage (Zero Trust)
                const card3 = advantageCards[2];
                const card3Content = card3.querySelector('p');
                if (card3Content) {
                    card3Content.textContent = "Purpose-built for continuous verification, least privilege access, and zero trust principles with real-time risk assessment.";
                }
                
                // Update fourth advantage (TCO)
                const card4 = advantageCards[3];
                const card4Content = card4.querySelector('p');
                if (card4Content) {
                    card4Content.textContent = "42-48% reduction in TCO through eliminated hardware, reduced staffing needs, no maintenance costs, and predictable subscription pricing.";
                }
            }
        }
        
        // Update vendor strengths table if it exists
        const strengthsTable = comparisonPanel.querySelector('#vendor-strengths-table');
        if (strengthsTable) {
            // Add a compelling summary above the table
            const tableContainer = strengthsTable.closest('.table-responsive');
            if (tableContainer) {
                const summary = document.createElement('div');
                summary.className = 'comparison-summary';
                summary.innerHTML = `
                    <p>The table below highlights Portnox's key advantages in critical capability areas compared to traditional NAC solutions. As a cloud-native solution, Portnox delivers superior performance in deployment speed, infrastructure requirements, remote access, and total cost of ownership.</p>
                `;
                
                tableContainer.parentNode.insertBefore(summary, tableContainer);
                
                // Add styles for the summary
                const style = document.createElement('style');
                style.textContent = `
                    .comparison-summary {
                        margin-bottom: 15px;
                    }
                    
                    .comparison-summary p {
                        color: #505050;
                        font-size: 0.95rem;
                        line-height: 1.5;
                        margin: 0;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        console.log("Executive comparison view enhanced");
    }
    
    // Enhance ROI analysis view
    function enhanceRoiView() {
        console.log("Enhancing ROI analysis view...");
        
        const roiPanel = document.getElementById('executive-roi');
        if (!roiPanel) {
            console.error("ROI analysis panel not found");
            return;
        }
        
        // Add ROI summary if it doesn't exist
        let roiSummary = roiPanel.querySelector('.roi-summary');
        if (!roiSummary) {
            console.log("Adding ROI summary section...");
            
            // Find the dashboard grid
            const dashboardGrid = roiPanel.querySelector('.dashboard-grid');
            if (dashboardGrid) {
                // Create ROI summary element
                roiSummary = document.createElement('div');
                roiSummary.className = 'roi-summary';
                roiSummary.innerHTML = `
                    <h4>Total Cost of Ownership & ROI Summary</h4>
                    <p>Investing in Portnox Cloud delivers substantial returns through both direct cost savings and operational efficiencies. The cloud-native architecture eliminates hardware costs, reduces IT staffing requirements, and provides automatic updates and enhancements at no additional cost.</p>
                    
                    <div class="roi-highlights">
                        <div class="roi-highlight-item">
                            <div class="highlight-number">42-48%</div>
                            <div class="highlight-text">TCO Reduction</div>
                        </div>
                        
                        <div class="roi-highlight-item">
                            <div class="highlight-number">7-8</div>
                            <div class="highlight-text">Month Payback</div>
                        </div>
                        
                        <div class="roi-highlight-item">
                            <div class="highlight-number">287%</div>
                            <div class="highlight-text">3-Year ROI</div>
                        </div>
                        
                        <div class="roi-highlight-item">
                            <div class="highlight-number">$0</div>
                            <div class="highlight-text">Hardware Required</div>
                        </div>
                    </div>
                `;
                
                // Insert after dashboard grid
                dashboardGrid.parentNode.insertBefore(roiSummary, dashboardGrid.nextSibling);
                
                // Add styles for ROI summary
                const style = document.createElement('style');
                style.textContent = `
                    .roi-summary {
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        border-left: 4px solid #1B67B2;
                    }
                    
                    .roi-summary h4 {
                        color: #05547C;
                        margin-top: 0;
                        margin-bottom: 15px;
                        font-size: 1.2rem;
                    }
                    
                    .roi-summary p {
                        color: #505050;
                        font-size: 0.95rem;
                        line-height: 1.5;
                        margin-bottom: 20px;
                    }
                    
                    .roi-highlights {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                    }
                    
                    .roi-highlight-item {
                        background-color: white;
                        border-radius: 6px;
                        padding: 15px;
                        text-align: center;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    
                    .highlight-number {
                        color: #1B67B2;
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    
                    .highlight-text {
                        color: #666;
                        font-size: 0.9rem;
                    }
                    
                    @media (max-width: 768px) {
                        .roi-highlights {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .roi-highlights {
                            grid-template-columns: 1fr;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        console.log("ROI analysis view enhanced");
    }
    
    // Enhance risk assessment view
    function enhanceRiskView() {
        console.log("Enhancing risk assessment view...");
        
        const riskPanel = document.getElementById('executive-risk');
        if (!riskPanel) {
            console.error("Risk assessment panel not found");
            return;
        }
        
        // Add risk summary if it doesn't exist
        let riskSummary = riskPanel.querySelector('.risk-summary');
        if (!riskSummary) {
            console.log("Adding risk summary section...");
            
            // Find the dashboard grid
            const dashboardGrid = riskPanel.querySelector('.dashboard-grid');
            if (dashboardGrid) {
                // Create risk summary element
                riskSummary = document.createElement('div');
                riskSummary.className = 'risk-summary';
                riskSummary.innerHTML = `
                    <h4>Security Risk & Compliance Impact</h4>
                    <p>Portnox Cloud significantly reduces organizational risk through continuous device verification, real-time risk assessment, and automated remediation capabilities. The cloud-native architecture ensures security policies are consistently enforced across all locations and device types.</p>
                    
                    <div class="risk-impact-grid">
                        <div class="risk-impact-item">
                            <div class="impact-icon"><i class="fas fa-user-shield"></i></div>
                            <div class="impact-content">
                                <h5>Zero Trust Implementation</h5>
                                <p>Continuously verify every device, user, and access attempt based on real-time risk assessment.</p>
                            </div>
                        </div>
                        
                        <div class="risk-impact-item">
                            <div class="impact-icon"><i class="fas fa-search"></i></div>
                            <div class="impact-content">
                                <h5>Complete Visibility</h5>
                                <p>Identify and monitor every device connecting to your network, including IoT and BYOD.</p>
                            </div>
                        </div>
                        
                        <div class="risk-impact-item">
                            <div class="impact-icon"><i class="fas fa-shield-virus"></i></div>
                            <div class="impact-content">
                                <h5>Breach Prevention</h5>
                                <p>Reduce breach probability by up to 65% through proactive access control and risk mitigation.</p>
                            </div>
                        </div>
                        
                        <div class="risk-impact-item">
                            <div class="impact-icon"><i class="fas fa-file-contract"></i></div>
                            <div class="impact-content">
                                <h5>Automated Compliance</h5>
                                <p>Meet regulatory requirements with automated enforcement and comprehensive reporting.</p>
                            </div>
                        </div>
                    </div>
                `;
                
                // Insert after dashboard grid
                dashboardGrid.parentNode.insertBefore(riskSummary, dashboardGrid.nextSibling);
                
                // Add styles for risk summary
                const style = document.createElement('style');
                style.textContent = `
                    .risk-summary {
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        border-left: 4px solid #F44336;
                    }
                    
                    .risk-summary h4 {
                        color: #05547C;
                        margin-top: 0;
                        margin-bottom: 15px;
                        font-size: 1.2rem;
                    }
                    
                    .risk-summary p {
                        color: #505050;
                        font-size: 0.95rem;
                        line-height: 1.5;
                        margin-bottom: 20px;
                    }
                    
                    .risk-impact-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 15px;
                    }
                    
                    .risk-impact-item {
                        display: flex;
                        gap: 15px;
                    }
                    
                    .impact-icon {
                        width: 36px;
                        height: 36px;
                        background-color: #F44336;
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1rem;
                        flex-shrink: 0;
                    }
                    
                    .impact-content h5 {
                        margin-top: 0;
                        margin-bottom: 8px;
                        color: #05547C;
                        font-size: 1rem;
                    }
                    
                    .impact-content p {
                        margin: 0;
                        color: #505050;
                        font-size: 0.9rem;
                        line-height: 1.4;
                    }
                    
                    @media (max-width: 768px) {
                        .risk-impact-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        console.log("Risk assessment view enhanced");
    }
    
    // Initialize the module
    function initialize() {
        console.log("Initializing executive view enhancements...");
        
        // Enhance all executive view panels
        enhanceExecutiveSummary();
        enhanceComparisonView();
        enhanceRoiView();
        enhanceRiskView();
        
        console.log("Executive view enhancements completed");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        window.addEventListener('load', initialize);
    }
})();
