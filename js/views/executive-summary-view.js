/**
 * Executive Summary View
 * C-Suite level insights and decision support
 */
(function() {
    window.ExecutiveSummaryView = {
        render() {
            this.platformResults = platformResults; // Store for chart methods
            this.platformConfig = platformConfig; // Store for chart methods

            const analysis = this.performExecutiveAnalysis(platformResults, platformConfig);

            const mainHtmlContent = `
                <div class="executive-summary-view">
                    <div class="view-header">
                        <h1>Executive Summary</h1>
                        <p class="view-subtitle">Strategic insights for C-Suite decision making</p>
                    </div>
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                        <p>Generating executive insights...</p>
                    </div>
                </div>
            `;
        },

        renderComplete(platformResults, platformConfig) {
            if (!platformResults || !platformConfig) {
                console.error("ExecutiveSummaryView: platformResults or platformConfig not provided to renderComplete.");
                return this.render(); // Render basic shell or error
            }

            // Store for potential use by other helpers if needed, though direct passing is preferred
            this.platformResults = platformResults;
            this.platformConfig = platformConfig;

            const analysis = this.performExecutiveAnalysis(platformResults, platformConfig);

            return `
                <div class="executive-summary-view">
                    <div class="view-header">
                        <h1>Executive Summary</h1>
                        <p class="view-subtitle">Strategic insights for C-Suite decision making</p>
                    </div>

                    ${this.renderExecutiveBrief(analysis)}

                    <section class="executive-charts-section">
                        <h3>Key Performance Indicators</h3>
                        <div class="charts-grid">
                            <div class="chart-container">
                                <canvas id="key-metrics-summary-chart" height="300"></canvas>
                            </div>
                            <div class="chart-container">
                                <canvas id="recommendation-strength-chart" height="300"></canvas>
                            </div>
                        </div>
                    </section>

                    ${this.renderStrategicRecommendations(analysis)}
                    ${this.renderBusinessImpact(analysis)}
                    ${this.renderDecisionMatrix(analysis)}
                    ${this.renderImplementationRoadmap(analysis)}
                </div>
            `;

            setTimeout(() => {
                if (document.getElementById('key-metrics-summary-chart') && document.getElementById('recommendation-strength-chart')) {
                    this.initializeExecutiveCharts(this.platformResults, this.platformConfig);
                } else {
                    console.warn("ExecutiveSummaryView: Chart canvas elements not found. Charts might not initialize.");
                }
            }, 250);

            return mainHtmlContent;
        },

        initializeExecutiveCharts(platformResults, platformConfig) {
            if (!platformResults || !platformConfig) {
                console.warn("ExecutiveSummaryView.initializeExecutiveCharts: Missing platformResults or platformConfig");
                return;
            }
            this.renderKeyMetricsSummaryChart(platformResults, platformConfig);
            this.renderRecommendationStrengthChart(platformResults, platformConfig);
        },

        renderKeyMetricsSummaryChart(platformResults, platformConfig) {
            const canvasId = 'key-metrics-summary-chart';
            const ctx = document.getElementById(canvasId)?.getContext('2d');
            if (!ctx) {
                console.warn(`ExecutiveSummaryView: Canvas ${canvasId} not found.`);
                return;
            }

            const primaryVendorId = platformConfig?.selectedVendors?.[0] || 'portnox';
            const vendorData = platformResults[primaryVendorId];

            if (!vendorData) {
                console.warn(`ExecutiveSummaryView: Data for primary vendor (${primaryVendorId}) not found for Key Metrics Chart.`);
                ctx.font = "16px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Key Metrics Data Not Available", ctx.canvas.width / 2, ctx.canvas.height / 2);
                return;
            }

            const tco = vendorData.tco?.total || 0;
            // ROI is a percentage, scale it for display if it's too large or small compared to TCO.
            // Or, use multiple axes. For simplicity, let's normalize/represent ROI differently or ensure it's on a comparable scale.
            // For this chart, ROI will be displayed as is (e.g., 350 for 350%).
            const roi = vendorData.roi?.percentage || 0;
            // Risk Score is 0-100, where higher is worse. For a "positive" metric bar, we might display (100 - score).
            const riskScore = vendorData.riskAnalysis?.score !== undefined ? (100 - vendorData.riskAnalysis.score) : 0; // Higher bar is better
            const complianceScore = vendorData.complianceScore?.overall || 0;

            if (this.keyMetricsChartInstance) {
                this.keyMetricsChartInstance.destroy();
            }

            this.keyMetricsChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['TCO Savings (vs next best)', 'ROI (%)', 'Security Score', 'Compliance Score'],
                    datasets: [{
                        label: `${vendorData.vendor?.name || primaryVendorId} - Key Metrics`,
                        data: [
                            (vendorData.tco?.savingsVsNextBest || tco), // If direct savings not available, show TCO (lower is better, this might be confusing)
                                                                      // Ideally, TCO should be represented as lower = better, or show savings.
                                                                      // For now, using 'savingsVsNextBest' if available, else raw TCO.
                            roi,
                            riskScore,
                            complianceScore
                        ],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)', // Blue for TCO/Savings
                            'rgba(75, 192, 192, 0.6)', // Green for ROI
                            'rgba(255, 206, 86, 0.6)', // Yellow for Security Score (inverted)
                            'rgba(153, 102, 255, 0.6)'  // Purple for Compliance
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', // Horizontal bar chart might be nice for these labels
                    scales: {
                        x: {
                            beginAtZero: true,
                            // Consider using a logarithmic scale if values are vastly different,
                            // or multiple y-axes if Chart.js version supports it easily here.
                            // For now, linear scale. User might need to interpret TCO value carefully.
                            title: {
                                display: true,
                                text: 'Metric Value / Score'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Or true, but dataset label is long
                        },
                        title: {
                            display: true,
                            text: `Key Metrics: ${vendorData.vendor?.name || primaryVendorId}`,
                            font: { size: 16 }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    let value = context.parsed.x;
                                    if (context.label === 'TCO Savings (vs next best)') {
                                        label = (vendorData.tco?.savingsVsNextBest ? 'TCO Savings: ' : 'TCO: ') + '$' + value.toLocaleString();
                                    } else if (context.label === 'ROI (%)') {
                                        label = 'ROI: ' + value.toFixed(1) + '%';
                                    } else if (context.label === 'Security Score') {
                                        label = 'Security Score (out of 100): ' + value.toFixed(1);
                                    } else if (context.label === 'Compliance Score') {
                                        label = 'Compliance Score (out of 100): ' + value.toFixed(1) + '%';
                                    } else {
                                        label += value;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            console.log("ExecutiveSummaryView: renderKeyMetricsSummaryChart executed.");
        },

        renderRecommendationStrengthChart(platformResults, platformConfig) {
            const canvasId = 'recommendation-strength-chart';
            const ctx = document.getElementById(canvasId)?.getContext('2d');
            if (!ctx) {
                console.warn(`ExecutiveSummaryView: Canvas ${canvasId} not found.`);
                return;
            }

            const primaryVendorId = platformConfig?.selectedVendors?.[0] || 'portnox';
            const vendorData = platformResults[primaryVendorId];

            if (!vendorData || typeof vendorData.overallScore !== 'number') {
                console.warn(`ExecutiveSummaryView: Overall score for primary vendor (${primaryVendorId}) not found for Recommendation Strength Chart.`);
                ctx.font = "16px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Recommendation Score Not Available", ctx.canvas.width / 2, ctx.canvas.height / 2);
                return;
            }

            const overallScore = Math.max(0, Math.min(100, vendorData.overallScore)); // Ensure score is 0-100

            // Determine color based on score
            let scoreColor = 'rgba(255, 99, 132, 0.7)'; // Red (Poor)
            if (overallScore >= 85) {
                scoreColor = 'rgba(75, 192, 192, 0.7)'; // Green (Excellent)
            } else if (overallScore >= 70) {
                scoreColor = 'rgba(54, 162, 235, 0.7)'; // Blue (Good)
            } else if (overallScore >= 50) {
                scoreColor = 'rgba(255, 206, 86, 0.7)'; // Yellow (Average)
            }

            if (this.recommendationChartInstance) {
                this.recommendationChartInstance.destroy();
            }

            this.recommendationChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Recommendation Strength', 'Remaining'],
                    datasets: [{
                        data: [overallScore, 100 - overallScore],
                        backgroundColor: [scoreColor, 'rgba(200, 200, 200, 0.2)'], // Score color and a light grey for the rest
                        borderColor: [scoreColor, 'rgba(200, 200, 200, 0.4)'],
                        borderWidth: 1,
                        circumference: 180, // Half circle
                        rotation: -90       // Start from the bottom
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    rotation: -90, // Alias for rotation for older Chart.js, but correctly placed here
                    circumference: 180, // Alias for circumference
                    cutout: '70%', // Makes it a doughnut
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: `Recommendation Strength: ${overallScore.toFixed(1)}%`,
                            font: { size: 16 },
                            position: 'bottom'
                        },
                        tooltip: {
                            enabled: false // Or customize to show only the main score
                        },
                        // Custom plugin to display text in the middle
                        // This specific text drawing inside doughnut is often done with plugins or chartjs-plugin-datalabels
                        // For simplicity, title is used. Advanced text might need a plugin.
                    }
                }
            });
            console.log("ExecutiveSummaryView: renderRecommendationStrengthChart executed.");
        },

        performExecutiveAnalysis(platformResults, platformConfig) {
            // No longer uses VendorDataManager or ConfigManager directly for main data
            
            const results = {}; // This will store processed data for the view's specific needs
            const selectedVendorIds = Object.keys(platformResults);

            if (selectedVendorIds.length === 0) {
                return { results: {}, portnox: null, bestCompetitor: null, worstCompetitor: null, savings: 0, savingsPercent: 0, config: platformConfig };
            }
            
            selectedVendorIds.forEach(vendorId => {
                const platformVendorResult = platformResults[vendorId];
                if (!platformVendorResult || !platformVendorResult.vendor) {
                    console.warn(`ExecutiveSummaryView: Vendor data missing for ${vendorId} in platformResults.`);
                    return;
                }
                
                // Use data directly from platformResults
                results[vendorId] = {
                    vendor: platformVendorResult.vendor,
                    tco: platformVendorResult.tco,
                    roi: platformVendorResult.roi,
                    // Pass the platform-calculated scores/data if available, or recalculate if necessary based on new structure
                    // calculateExecutiveScores might need to be adapted or its logic integrated here
                    scores: this.calculateExecutiveScores(platformVendorResult.vendor, platformVendorResult.tco, platformVendorResult.roi, platformVendorResult)
                };
            });
            
            // Find best options - ensure 'portnox' and other vendors exist in 'results' before accessing
            const portnox = results.portnox;
            const competitors = Object.values(results).filter(r => r.vendor.id !== 'portnox');
            const bestCompetitor = competitors.sort((a, b) => a.tco.total - b.tco.total)[0];
            const worstCompetitor = competitors.sort((a, b) => b.tco.total - a.tco.total)[0];
            
            return {
                results,
                portnox,
                bestCompetitor,
                worstCompetitor,
                savings: bestCompetitor.tco.total - portnox.tco.total,
                savingsPercent: ((bestCompetitor.tco.total - portnox.tco.total) / bestCompetitor.tco.total) * 100
            };
        },

        renderExecutiveBrief(analysis) {
            // Use analysis.config which should be platformConfig
            const config = analysis.config || this.platformConfig || {};

            if (!analysis.portnox || !analysis.bestCompetitor) {
                return `
                <div class="executive-brief-section">
                    <div class="brief-header"><h2>Executive Brief</h2></div>
                    <p>Not enough data for analysis. Please select vendors including Portnox.</p>
                </div>`;
            }
            
            return `
                <div class="executive-brief-section">
                    <div class="brief-header">
                        <h2>Executive Brief</h2>
                        <div class="brief-date">Generated: ${new Date().toLocaleDateString()}</div>
                    </div>
                    
                    <div class="brief-content">
                        <div class="key-finding">
                            <h3>Primary Recommendation</h3>
                            <p class="finding-statement">
                                Implementing <strong>Portnox CLEAR</strong> will deliver 
                                <strong>${this.formatCurrency(analysis.savings)}</strong> in savings over 3 years
                                (${analysis.savingsPercent.toFixed(1)}% reduction) compared to ${analysis.bestCompetitor.vendor.name},
                                while providing superior security, compliance automation, and operational efficiency.
                            </p>
                        </div>
                        
                        <div class="executive-metrics">
                            <div class="metric-card ceo">
                                <h4>CEO Perspective</h4>
                                <div class="metric-highlight">
                                    <span class="metric-value">${analysis.savingsPercent.toFixed(0)}%</span>
                                    <span class="metric-label">TCO Reduction</span>
                                </div>
                                <p>Strategic advantage through cloud-native architecture and Zero Trust security</p>
                            </div>
                            
                            <div class="metric-card cfo">
                                <h4>CFO Perspective</h4>
                                <div class="metric-highlight">
                                    <span class="metric-value">${this.formatCurrency(analysis.savings)}</span>
                                    <span class="metric-label">3-Year Savings</span>
                                </div>
                                <p>No hardware investment, predictable OpEx model, ${analysis.portnox.roi.paybackMonths} month payback</p>
                            </div>
                            
                            <div class="metric-card ciso">
                                <h4>CISO Perspective</h4>
                                <div class="metric-highlight">
                                    <span class="metric-value">85%</span>
                                    <span class="metric-label">Risk Reduction</span>
                                </div>
                                <p>Native Zero Trust, continuous verification, automated threat response</p>
                            </div>
                            
                            <div class="metric-card cio">
                                <h4>CIO Perspective</h4>
                                <div class="metric-highlight">
                                    <span class="metric-value">4 Hours</span>
                                    <span class="metric-label">Deployment Time</span>
                                </div>
                                <p>95% automation, no infrastructure required, seamless cloud integration</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderStrategicRecommendations(analysis) {
            return `
                <div class="strategic-recommendations-section">
                    <h2>Strategic Recommendations</h2>
                    
                    <div class="recommendations-grid">
                        <div class="recommendation immediate">
                            <div class="rec-header">
                                <i class="fas fa-bolt"></i>
                                <h3>Immediate Actions</h3>
                                <span class="timeline">0-30 days</span>
                            </div>
                            <ul>
                                <li>Schedule Portnox CLEAR proof of concept</li>
                                <li>Conduct security posture assessment</li>
                                <li>Review current NAC contract terms</li>
                                <li>Identify quick win use cases</li>
                            </ul>
                        </div>
                        
                        <div class="recommendation short-term">
                            <div class="rec-header">
                                <i class="fas fa-calendar-week"></i>
                                <h3>Short-term Strategy</h3>
                                <span class="timeline">1-3 months</span>
                            </div>
                            <ul>
                                <li>Deploy Portnox in pilot environment</li>
                                <li>Migrate critical assets to Zero Trust</li>
                                <li>Train IT team on cloud NAC</li>
                                <li>Begin compliance automation</li>
                            </ul>
                        </div>
                        
                        <div class="recommendation long-term">
                            <div class="rec-header">
                                <i class="fas fa-chart-line"></i>
                                <h3>Long-term Vision</h3>
                                <span class="timeline">3-12 months</span>
                            </div>
                            <ul>
                                <li>Complete enterprise-wide migration</li>
                                <li>Decommission legacy infrastructure</li>
                                <li>Achieve continuous compliance</li>
                                <li>Optimize cyber insurance premiums</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="risk-mitigation">
                        <h3>Risk Mitigation Strategy</h3>
                        <div class="risk-items">
                            <div class="risk-item">
                                <i class="fas fa-shield-alt text-success"></i>
                                <div>
                                    <h4>Migration Risk</h4>
                                    <p>Portnox's 4-hour deployment and coexistence mode ensures zero disruption</p>
                                </div>
                            </div>
                            <div class="risk-item">
                                <i class="fas fa-users text-success"></i>
                                <div>
                                    <h4>Change Management</h4>
                                    <p>95% automation reduces operational changes, minimal end-user impact</p>
                                </div>
                            </div>
                            <div class="risk-item">
                                <i class="fas fa-lock text-success"></i>
                                <div>
                                    <h4>Security Risk</h4>
                                    <p>Immediate security improvement with Zero Trust, no gaps during transition</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderBusinessImpact(analysis) {
            const config = ConfigManager.get('defaults');
            const portnox = analysis.portnox;
            
            // Calculate business impacts
            const productivityGain = config.users * 2 * 52 * 50; // 2 hours/week saved * 52 weeks * $50/hour
            const breachPrevention = 4500000 * 0.15 * 0.85; // Avg breach cost * probability * reduction
            const complianceSavings = 100000 * 0.7; // Compliance cost * automation savings
            const itEfficiency = 2.5 * 120000 * 0.7; // FTE reduction * salary * percentage
            
            const totalImpact = productivityGain + breachPrevention + complianceSavings + itEfficiency;

            return `
                <div class="business-impact-section">
                    <h2>Business Impact Analysis</h2>
                    
                    <div class="impact-summary">
                        <div class="total-impact">
                            <h3>Total Business Value</h3>
                            <div class="impact-value">${this.formatCurrency(totalImpact)}</div>
                            <div class="impact-detail">Annual value beyond cost savings</div>
                        </div>
                    </div>
                    
                    <div class="impact-categories">
                        <div class="impact-card">
                            <div class="impact-icon">
                                <i class="fas fa-user-clock"></i>
                            </div>
                            <h4>Productivity Gains</h4>
                            <div class="impact-metrics">
                                <div class="metric">${this.formatCurrency(productivityGain)}/year</div>
                                <p>Reduced authentication friction and faster access to resources</p>
                            </div>
                        </div>
                        
                        <div class="impact-card">
                            <div class="impact-icon">
                                <i class="fas fa-shield-virus"></i>
                            </div>
                            <h4>Risk Mitigation</h4>
                            <div class="impact-metrics">
                                <div class="metric">${this.formatCurrency(breachPrevention)}/year</div>
                                <p>85% reduction in breach probability with Zero Trust</p>
                            </div>
                        </div>
                        
                        <div class="impact-card">
                            <div class="impact-icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <h4>Compliance Efficiency</h4>
                            <div class="impact-metrics">
                                <div class="metric">${this.formatCurrency(complianceSavings)}/year</div>
                                <p>70% reduction in audit preparation time</p>
                            </div>
                        </div>
                        
                        <div class="impact-card">
                            <div class="impact-icon">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <h4>IT Efficiency</h4>
                            <div class="impact-metrics">
                                <div class="metric">${this.formatCurrency(itEfficiency)}/year</div>
                                <p>2.5 FTE reduction through automation</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="competitive-advantage">
                        <h3>Competitive Advantages</h3>
                        <div class="advantages-grid">
                            <div class="advantage">
                                <i class="fas fa-rocket text-primary"></i>
                                <h4>Speed to Market</h4>
                                <p>Deploy new services 90% faster with automated security policies</p>
                            </div>
                            <div class="advantage">
                                <i class="fas fa-shield-alt text-success"></i>
                                <h4>Security Posture</h4>
                                <p>Industry-leading Zero Trust implementation attracts security-conscious customers</p>
                            </div>
                            <div class="advantage">
                                <i class="fas fa-chart-line text-info"></i>
                                <h4>Scalability</h4>
                                <p>Support unlimited growth without infrastructure investments</p>
                            </div>
                            <div class="advantage">
                                <i class="fas fa-award text-warning"></i>
                                <h4>Compliance Leadership</h4>
                                <p>Achieve and maintain compliance certifications faster than competitors</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderDecisionMatrix(analysis) {
            const vendors = Object.values(analysis.results);
            
            return `
                <div class="decision-matrix-section">
                    <h2>Decision Support Matrix</h2>
                    
                    <div class="matrix-table-container">
                        <table class="decision-matrix">
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Weight</th>
                                    ${vendors.map(r => `<th>${r.vendor.name}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getDecisionCriteria().map(criteria => `
                                    <tr>
                                        <td>${criteria.name}</td>
                                        <td>${(criteria.weight * 100).toFixed(0)}%</td>
                                        ${vendors.map(result => {
                                            const score = this.calculateCriteriaScore(result, criteria.id);
                                            return `
                                                <td>
                                                    <div class="score-cell score-${this.getScoreClass(score)}">
                                                        ${score}/10
                                                    </div>
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                                <tr class="total-row">
                                    <td colspan="2">Weighted Total</td>
                                    ${vendors.map(result => {
                                        const total = this.calculateWeightedTotal(result);
                                        return `
                                            <td>
                                                <div class="total-score score-${this.getScoreClass(total * 10)}">
                                                    ${total.toFixed(1)}/10
                                                </div>
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="decision-insights">
                        <h3>Key Decision Insights</h3>
                        <div class="insights-grid">
                            <div class="insight">
                                <i class="fas fa-dollar-sign"></i>
                                <h4>Financial Impact</h4>
                                <p>Portnox delivers ${analysis.savingsPercent.toFixed(0)}% lower TCO with 
                                predictable OpEx model and no hidden costs</p>
                            </div>
                            <div class="insight">
                                <i class="fas fa-clock"></i>
                                <h4>Time to Value</h4>
                                <p>4-hour deployment vs. 30-90 days for legacy solutions enables 
                                immediate security improvements</p>
                            </div>
                            <div class="insight">
                                <i class="fas fa-chart-line"></i>
                                <h4>Future Readiness</h4>
                                <p>Cloud-native architecture ensures compatibility with digital 
                                transformation initiatives</p>
                            </div>
                            <div class="insight">
                                <i class="fas fa-users"></i>
                                <h4>Organizational Impact</h4>
                                <p>95% automation frees IT staff for strategic initiatives instead 
                                of routine maintenance</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        renderImplementationRoadmap(analysis) {
            return `
                <div class="implementation-roadmap-section">
                    <h2>Implementation Roadmap</h2>
                    
                    <div class="roadmap-timeline">
                        <div class="timeline-phase phase-1">
                            <div class="phase-header">
                                <span class="phase-number">1</span>
                                <h3>Pilot Phase</h3>
                                <span class="duration">Week 1-2</span>
                            </div>
                            <div class="phase-content">
                                <h4>Objectives</h4>
                                <ul>
                                    <li>Deploy Portnox CLEAR in test environment</li>
                                    <li>Configure initial policies</li>
                                    <li>Test with 100 devices</li>
                                </ul>
                                <h4>Success Criteria</h4>
                                <ul>
                                    <li>Zero Trust policies active</li>
                                    <li>Integration with AD/Azure AD</li>
                                    <li>Compliance reports generated</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="timeline-phase phase-2">
                            <div class="phase-header">
                                <span class="phase-number">2</span>
                                <h3>Limited Production</h3>
                                <span class="duration">Week 3-6</span>
                            </div>
                            <div class="phase-content">
                                <h4>Objectives</h4>
                                <ul>
                                    <li>Migrate one department/location</li>
                                    <li>Enable advanced features</li>
                                    <li>Train IT team</li>
                                </ul>
                                <h4>Success Criteria</h4>
                                <ul>
                                    <li>500+ devices managed</li>
                                    <li>Automation workflows active</li>
                                    <li>Incident response validated</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="timeline-phase phase-3">
                            <div class="phase-header">
                                <span class="phase-number">3</span>
                                <h3>Full Deployment</h3>
                                <span class="duration">Week 7-12</span>
                            </div>
                            <div class="phase-content">
                                <h4>Objectives</h4>
                                <ul>
                                    <li>Complete enterprise migration</li>
                                    <li>Decommission legacy NAC</li>
                                    <li>Optimize policies</li>
                                </ul>
                                <h4>Success Criteria</h4>
                                <ul>
                                    <li>All devices migrated</li>
                                    <li>Legacy costs eliminated</li>
                                    <li>Full compliance achieved</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="timeline-phase phase-4">
                            <div class="phase-header">
                                <span class="phase-number">4</span>
                                <h3>Optimization</h3>
                                <span class="duration">Ongoing</span>
                            </div>
                            <div class="phase-content">
                                <h4>Objectives</h4>
                                <ul>
                                    <li>Continuous improvement</li>
                                    <li>Advanced use cases</li>
                                    <li>ROI measurement</li>
                                </ul>
                                <h4>Success Criteria</h4>
                                <ul>
                                    <li>95%+ automation achieved</li>
                                    <li>Zero Trust maturity level 5</li>
                                    <li>Insurance premiums reduced</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="success-factors">
                        <h3>Critical Success Factors</h3>
                        <div class="factors-grid">
                            <div class="factor">
                                <i class="fas fa-check-circle text-success"></i>
                                <h4>Executive Sponsorship</h4>
                                <p>C-level commitment to Zero Trust transformation</p>
                            </div>
                            <div class="factor">
                                <i class="fas fa-check-circle text-success"></i>
                                <h4>Clear Communication</h4>
                                <p>Stakeholder alignment on security benefits</p>
                            </div>
                            <div class="factor">
                                <i class="fas fa-check-circle text-success"></i>
                                <h4>Phased Approach</h4>
                                <p>Risk mitigation through gradual rollout</p>
                            </div>
                            <div class="factor">
                                <i class="fas fa-check-circle text-success"></i>
                                <h4>Success Metrics</h4>
                                <p>Defined KPIs for each phase</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        calculateExecutiveScores(vendor, tco, roi, platformVendorResult) {
            // platformVendorResult contains { vendor, tco, roi, complianceScore, riskScore, industryFit }
            // This method should be adapted to use these richer structures.
            // For now, retain some original logic but acknowledge it needs more mapping.

            const financialScore = platformVendorResult?.roi?.percentage ?
                                   Math.min(10, Math.max(0, (platformVendorResult.roi.percentage / 50))) : // Example: 500% ROI = 10
                                   this.calculateFinancialScore(vendor, tco); // Fallback

            const strategicScore = platformVendorResult?.industryFit?.score ?
                                   (platformVendorResult.industryFit.score / 10) : // Example: 100% fit = 10
                                   this.calculateStrategicScore(vendor); // Fallback

            const operationalScore = platformVendorResult?.vendor?.features?.automation ?
                                     (platformVendorResult.vendor.features.automation / 10) :
                                     this.calculateOperationalScore(vendor); // Fallback

            const riskReductionScore = platformVendorResult?.riskScore?.score ?
                                       (100 - platformVendorResult.riskScore.score) / 10 : // Higher platform riskScore is bad, so invert
                                       this.calculateRiskScore(vendor); // Fallback

            return {
                financial: financialScore,
                strategic: strategicScore,
                operational: operationalScore,
                risk: riskReductionScore
            };
        },

        calculateCriteriaScore(result, criteriaId) {
            // result here is results[vendorId] from performExecutiveAnalysis
            // which contains { vendor, tco, roi, scores (from calculateExecutiveScores), ... platform data ... }
            const vendor = result.vendor; // original vendor data from comprehensive DB
            const platformCalculatedRiskScore = result.riskScore?.score; // from EnhancedPlatformApplication
            const platformCalculatedComplianceOverall = result.complianceScore?.overall; // from EnhancedPlatformApplication

            const scores = {
                tco: 10 - (result.tco.total / 1000000) * 2,
                deployment: 10 - (vendor.deployment.time / 240),
                security: platformCalculatedRiskScore ? (100 - platformCalculatedRiskScore) / 10 : (vendor.features?.zeroTrust?.score / 10 || 5),
                automation: vendor.features?.automation / 10 || 3,
                compliance: platformCalculatedComplianceOverall ? platformCalculatedComplianceOverall / 10 : (vendor.features?.compliance?.automation / 10 || 3),
                scalability: vendor.deployment?.model?.toLowerCase().includes('cloud') ? 10 : 5,
                innovation: vendor.features?.security?.aiThreatDetection ? 9 : 4
            };
            
            return Math.round(Math.max(1, Math.min(10, scores[criteriaId] || 5)));
        },

        getDecisionCriteria() {
            return [
                { id: 'tco', name: 'Total Cost of Ownership', weight: 0.25 },
                { id: 'deployment', name: 'Deployment Speed', weight: 0.15 },
                { id: 'security', name: 'Security Effectiveness', weight: 0.20 },
                { id: 'automation', name: 'Automation Level', weight: 0.15 },
                { id: 'compliance', name: 'Compliance Support', weight: 0.10 },
                { id: 'scalability', name: 'Scalability', weight: 0.10 },
                { id: 'innovation', name: 'Innovation', weight: 0.05 }
            ];
        },

        calculateWeightedTotal(result) {
            const criteria = this.getDecisionCriteria();
            let total = 0;
            
            criteria.forEach(c => {
                const score = this.calculateCriteriaScore(result, c.id);
                total += score * c.weight;
            });
            
            return total;
        },

        // Fallback calculation methods - these should ideally be phased out or simplified
        // if all necessary data comes directly from platformResults.
        calculateFinancialScore(vendor, tco) {
            const baseline = 1000000;
            return Math.max(0, 10 - ((tco?.total || baseline * 2) / baseline) * 5);
        },

        calculateStrategicScore(vendor) {
            let score = 5;
            if (vendor?.deployment?.model?.toLowerCase().includes('cloud')) score += 3;
            if (vendor?.features?.zeroTrust?.native) score += 2;
            return Math.min(10, score);
        },

        calculateOperationalScore(vendor) {
            return (vendor?.features?.automation || 30) / 10;
        },

        calculateRiskScore(vendor) { // This calculates a "goodness" score from risk perspective
            // The platform's riskScore is "badness", so this needs to be different.
            // This is a simplified version.
            let score = 5;
            if(vendor?.features?.zeroTrust?.score > 75) score +=2;
            if(vendor?.features?.security?.aiThreatDetection) score +=2;
            if(vendor?.features?.security?.mttr < 60) score +=1;
            return Math.min(10,score);
        },

        getScoreClass(score) {
            if (score >= 9) return 'excellent';
            if (score >= 7) return 'good';
            if (score >= 5) return 'average';
            return 'poor';
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }
    };
})();
