/**
 * PowerPoint Export Generator
 * Creates executive presentation decks
 */

class PowerPointGenerator {
    constructor(platform) {
        this.platform = platform;
        this.pptx = new PptxGenJS();
    }
    
    async generateExecutivePresentation() {
        // Set presentation properties
        this.pptx.author = 'NAC Decision Platform';
        this.pptx.company = this.platform.config.organization.name;
        this.pptx.revision = '1.0';
        this.pptx.subject = 'Zero Trust NAC Investment Analysis';
        this.pptx.title = 'Executive Decision Presentation';
        
        // Define master slide
        this.pptx.defineSlideMaster({
            title: 'MASTER_SLIDE',
            background: { color: '0A0B0E' },
            objects: [
                {
                    image: {
                        x: 0.5,
                        y: 0.3,
                        w: 1.5,
                        h: 0.5,
                        path: '/img/vendors/portnox-logo.png'
                    }
                },
                {
                    text: {
                        text: 'CONFIDENTIAL',
                        options: {
                            x: 8,
                            y: 0.3,
                            w: 1.5,
                            h: 0.5,
                            fontSize: 10,
                            color: 'A6ACBB',
                            align: 'right'
                        }
                    }
                }
            ],
            slideNumber: {
                x: 9,
                y: 5.5,
                color: 'A6ACBB',
                fontSize: 10
            }
        });
        
        // Add slides
        await this.addTitleSlide();
        await this.addExecutiveSummarySlide();
        await this.addProblemStatementSlide();
        await this.addSolutionOverviewSlide();
        await this.addFinancialAnalysisSlide();
        await this.addRiskMitigationSlide();
        await this.addComplianceSlide();
        await this.addROISlide();
        await this.addImplementationTimelineSlide();
        await this.addRecommendationsSlide();
        await this.addNextStepsSlide();
        
        // Save presentation
        const filename = `NAC-Executive-Presentation-${new Date().toISOString().split('T')[0]}.pptx`;
        await this.pptx.writeFile({ fileName: filename });
        
        return filename;
    }
    
    async addTitleSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        // Title
        slide.addText('Zero Trust NAC', {
            x: 1,
            y: 1.5,
            w: 8,
            h: 1,
            fontSize: 48,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
        
        // Subtitle
        slide.addText('Investment Decision Analysis', {
            x: 1,
            y: 2.5,
            w: 8,
            h: 0.5,
            fontSize: 24,
            color: 'FFFFFF',
            align: 'center'
        });
        
        // Key metrics box
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 2,
            y: 3.5,
            w: 6,
            h: 1.5,
          fill: { color: '1E2129' },
            line: { color: '00D4AA', width: 2 }
        });
        
        // Key metrics
        const metrics = [
            `$${this.formatNumber(this.platform.results.totalSavings)} Total Savings`,
            `${this.platform.results.roi}% ROI`,
            `${this.platform.results.paybackMonths} Month Payback`
        ];
        
        slide.addText(metrics.join('  •  '), {
            x: 2.2,
            y: 4,
            w: 5.6,
            h: 0.5,
            fontSize: 16,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
        
        // Date
        slide.addText(new Date().toLocaleDateString(), {
            x: 1,
            y: 5,
            w: 8,
            h: 0.5,
            fontSize: 14,
            color: 'A6ACBB',
            align: 'center'
        });
    }
    
    async addExecutiveSummarySlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Executive Summary', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Summary points
        const summaryPoints = [
            {
                title: 'Recommendation',
                content: 'Deploy Portnox CLEAR as enterprise NAC solution'
            },
            {
                title: 'Financial Impact',
                content: `$${this.formatNumber(this.platform.results.totalSavings)} savings over 3 years with ${this.platform.results.roi}% ROI`
            },
            {
                title: 'Risk Reduction',
                content: `${this.platform.results.riskReduction}% reduction in security breach probability`
            },
            {
                title: 'Implementation',
                content: 'Deploy in 4 hours vs. 90 days for legacy solutions'
            },
            {
                title: 'Compliance',
                content: '98% automated compliance across all frameworks'
            }
        ];
        
        let yPos = 1.5;
        summaryPoints.forEach(point => {
            // Bullet point
            slide.addText('•', {
                x: 0.5,
                y: yPos,
                w: 0.3,
                h: 0.4,
                fontSize: 16,
                color: '00D4AA'
            });
            
            // Title
            slide.addText(point.title + ':', {
                x: 0.8,
                y: yPos,
                w: 2,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: 'FFFFFF'
            });
            
            // Content
            slide.addText(point.content, {
                x: 2.8,
                y: yPos,
                w: 6,
                h: 0.4,
                fontSize: 16,
                color: 'A6ACBB'
            });
            
            yPos += 0.6;
        });
    }
    
    async addFinancialAnalysisSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('3-Year TCO Comparison', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Create TCO comparison chart
        const chartData = [
            {
                name: 'License Costs',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [126000, 885000, 585000, 390000]
            },
            {
                name: 'Infrastructure',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [0, 250000, 160000, 50000]
            },
            {
                name: 'Operations',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [75000, 750000, 450000, 375000]
            }
        ];
        
        slide.addChart(this.pptx.ChartType.bar, chartData, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 3,
            showLegend: true,
            showTitle: false,
            barGrouping: 'stacked',
            chartColors: ['00D4AA', 'EF4444', 'F59E0B'],
            catAxisLabelColor: 'A6ACBB',
            valAxisLabelColor: 'A6ACBB'
        });
        
        // Key takeaway
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5,
            y: 4.8,
            w: 9,
            h: 0.7,
            fill: { color: '00D4AA', transparency: 90 },
            line: { color: '00D4AA', width: 1 }
        });
        
        slide.addText('Portnox delivers 92% lower TCO than traditional solutions', {
            x: 0.7,
            y: 4.95,
            w: 8.6,
            h: 0.4,
            fontSize: 16,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
    }
    
    async addROISlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Return on Investment', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // ROI metrics grid
        const roiMetrics = [
            { label: 'Initial Investment', value: `$${this.formatNumber(this.platform.results.initialInvestment)}` },
            { label: 'Annual Savings', value: `$${this.formatNumber(this.platform.results.annualSavings)}` },
            { label: 'Payback Period', value: `${this.platform.results.paybackMonths} months` },
            { label: '3-Year ROI', value: `${this.platform.results.roi}%` },
            { label: 'NPV', value: `$${this.formatNumber(this.platform.results.npv)}` },
            { label: 'IRR', value: `${this.platform.results.irr}%` }
        ];
        
        // Create 2x3 grid
        let xPos = 1;
        let yPos = 1.5;
        roiMetrics.forEach((metric, index) => {
            // Metric box
            slide.addShape(this.pptx.ShapeType.rect, {
                x: xPos,
                y: yPos,
                w: 4,
                h: 1.2,
                fill: { color: '1E2129' },
                line: { color: '00D4AA', width: 1 }
            });
            
            // Label
            slide.addText(metric.label, {
                x: xPos + 0.2,
                y: yPos + 0.2,
                w: 3.6,
                h: 0.4,
                fontSize: 14,
                color: 'A6ACBB'
            });
            
            // Value
            slide.addText(metric.value, {
                x: xPos + 0.2,
                y: yPos + 0.6,
                w: 3.6,
                h: 0.4,
                fontSize: 20,
                bold: true,
                color: '00D4AA'
            });
            
            // Move to next position
            if (index % 2 === 0) {
                xPos = 5;
            } else {
                xPos = 1;
                yPos += 1.5;
            }
        });
    }
    
    async addImplementationTimelineSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Implementation Timeline', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Timeline phases
        const phases = [
            { week: 'Week 1', title: 'Deployment', tasks: ['4-hour cloud setup', 'Device discovery', 'Initial policies'] },
            { week: 'Week 2-3', title: 'Configuration', tasks: ['Policy refinement', 'Integration setup', 'User training'] },
            { week: 'Week 4', title: 'Testing', tasks: ['Policy validation', 'Performance testing', 'User acceptance'] },
            { week: 'Month 2', title: 'Expansion', tasks: ['Multi-site rollout', 'Advanced features', 'Optimization'] },
            { week: 'Month 3+', title: 'Excellence', tasks: ['Continuous improvement', 'Advanced automation', 'Full Zero Trust'] }
        ];
        
        let xPos = 0.5;
        phases.forEach((phase, index) => {
            // Phase box
            slide.addShape(this.pptx.ShapeType.rect, {
                x: xPos,
                y: 1.5,
                w: 1.8,
                h: 3,
                fill: { color: '1E2129' },
                line: { color: '00D4AA', width: 1 }
            });
            
            // Week
            slide.addText(phase.week, {
                x: xPos + 0.1,
                y: 1.6,
                w: 1.6,
                h: 0.3,
                fontSize: 12,
                bold: true,
                color: '00D4AA',
                align: 'center'
            });
            
            // Title
            slide.addText(phase.title, {
                x: xPos + 0.1,
                y: 2,
                w: 1.6,
                h: 0.4,
                fontSize: 14,
                bold: true,
                color: 'FFFFFF',
                align: 'center'
            });
            
            // Tasks
            let taskY = 2.5;
            phase.tasks.forEach(task => {
                slide.addText('• ' + task, {
                    x: xPos + 0.1,
                    y: taskY,
                    w: 1.6,
                    h: 0.3,
                    fontSize: 10,
                    color: 'A6ACBB'
                });
                taskY += 0.3;
            });
            
            // Arrow between phases
            if (index < phases.length - 1) {
                slide.addShape(this.pptx.ShapeType.line, {
                    x: xPos + 1.8,
                    y: 3,
                    w: 0.1,
                    h: 0,
                    line: { color: '00D4AA', width: 2, dashType: 'solid', endArrowType: 'arrow' }
                });
            }
            
            xPos += 1.9;
        });
    }
    
    async addRecommendationsSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Strategic Recommendations', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        const recommendations = [
            {
                priority: '1',
                action: 'Approve Portnox CLEAR deployment',
                benefit: 'Begin capturing savings immediately',
                timeline: 'This week'
            },
            {
                priority: '2',
                action: 'Conduct 1-week proof of concept',
                benefit: 'Validate 4-hour deployment claim',
                timeline: 'Next week'
            },
            {
                priority: '3',
                action: 'Phase out legacy NAC infrastructure',
                benefit: 'Eliminate $250K annual costs',
                timeline: 'Q1 2025'
            },
            {
                priority: '4',
                action: 'Expand Zero Trust architecture',
                benefit: 'Position for cloud transformation',
                timeline: 'Q2 2025'
            }
        ];
        
        // Table header
        slide.addTable(
            [
                [
                    { text: 'Priority', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Action', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Benefit', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Timeline', options: { bold: true, color: '00D4AA', fill: '1E2129' } }
                ],
                ...recommendations.map(rec => [
                    { text: rec.priority, options: { align: 'center' } },
                    { text: rec.action },
                    { text: rec.benefit },
                    { text: rec.timeline, options: { align: 'center' } }
                ])
            ],
            {
                x: 0.5,
                y: 1.5,
                w: 9,
                colW: [1, 3.5, 3.5, 1],
                border: { type: 'solid', color: '00D4AA', pt: 1 },
                color: 'A6ACBB',
                fontSize: 14
            }
        );
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
}

// Register with platform
window.PowerPointGenerator = PowerPointGenerator;
console.log('✅ PowerPoint Generator loaded');
