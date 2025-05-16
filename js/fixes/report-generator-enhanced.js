// Enhanced Report Generator for Portnox TCO Analyzer
(function() {
    console.log('📄 Initializing enhanced report generator...');
    
    // Report configuration
    const reportConfig = {
        title: 'Total Cost of Ownership Analysis',
        subtitle: 'Comparative Analysis of NAC Solutions',
        company: 'Portnox',
        logo: 'img/vendors/portnox-logo.png',
        colors: {
            primary: '#1B67B2',
            accent: '#2BD25B',
            text: '#333333',
            light: '#f8f9fa',
            border: '#e0e0e0'
        },
        sections: [
            'executive-summary',
            'financial-overview',
            'security-analysis',
            'technical-comparison',
            'conclusion'
        ]
    };
    
    // Initialize the report generator
    function initReportGenerator() {
        console.log('Initializing PDF report generator...');
        
        // Check if jsPDF is loaded
        if (typeof jspdf === 'undefined') {
            console.error('jsPDF is not loaded! Report generation will not work.');
            return;
        }
        
        // Add export button event listener
        const exportBtn = document.getElementById('export-pdf');
        if (exportBtn) {
            exportBtn.addEventListener('click', generateReport);
        }
    }
    
    // Generate the PDF report
    function generateReport() {
        console.log('Generating PDF report...');
        
        try {
            // Show loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                
                // Update loading text
                const loadingText = loadingOverlay.querySelector('p');
                if (loadingText) {
                    loadingText.textContent = 'Generating report...';
                }
            }
            
            // Get selected vendors
            const selectedVendors = [];
            document.querySelectorAll('.vendor-card.selected').forEach(card => {
                selectedVendors.push({
                    id: card.getAttribute('data-vendor'),
                    name: card.querySelector('.vendor-info h3').textContent
                });
            });
            
            // Get organization info
            const deviceCount = document.getElementById('device-count')?.value || '500';
            const orgSize = document.getElementById('organization-size')?.value || 'small';
            const yearsToProject = document.getElementById('years-to-project')?.value || '3';
            const industry = document.getElementById('industry-select')?.value || '';
            
            // Create new PDF document
            const { jsPDF } = jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Set default font
            doc.setFont('helvetica');
            
            // Add cover page
            createCoverPage(doc, selectedVendors, {
                deviceCount,
                orgSize,
                yearsToProject,
                industry
            });
            
            // Add executive summary
            doc.addPage();
            addExecutiveSummary(doc, selectedVendors);
            
            // Add TCO breakdown
            doc.addPage();
            addTCOBreakdown(doc, selectedVendors);
            
            // Add security analysis
            doc.addPage();
            addSecurityAnalysis(doc, selectedVendors);
            
            // Add vendor comparison
            doc.addPage();
            addVendorComparison(doc, selectedVendors);
            
            // Add conclusion
            doc.addPage();
            addConclusion(doc, selectedVendors);
            
            // Save the PDF
            const pdfName = `Portnox_TCO_Analysis_${new Date().toISOString().slice(0,10)}.pdf`;
            doc.save(pdfName);
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show success toast
            if (window.showToast) {
                window.showToast('Report generated successfully!', 'success');
            }
            
            console.log('PDF report generation complete');
        } catch (e) {
            console.error('Error generating report:', e);
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Show error toast
            if (window.showToast) {
                window.showToast('Error generating report. Please try again.', 'error');
            }
        }
    }
    
    // Helper function to create cover page
    function createCoverPage(doc, selectedVendors, info) {
        // Background color
        doc.setFillColor(reportConfig.colors.light);
        doc.rect(0, 0, 210, 297, 'F');
        
        // Title
        doc.setFontSize(24);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Total Cost of Ownership Analysis', 105, 60, { align: 'center' });
        
        // Subtitle
        doc.setFontSize(16);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('Comparative Analysis of NAC Solutions', 105, 70, { align: 'center' });
        
        // Add colored rectangle
        doc.setFillColor(reportConfig.colors.primary);
        doc.rect(30, 85, 150, 1, 'F');
        
        // Vendor comparison text
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.text);
        
        // Create vendor comparison text
        let comparisonText = 'Portnox Cloud';
        const competitors = selectedVendors.filter(v => v.id !== 'portnox');
        
        if (competitors.length > 0) {
            comparisonText += ' vs. ';
            comparisonText += competitors.map(v => v.name).join(', ');
        }
        
        doc.text(comparisonText, 105, 100, { align: 'center' });
        
        // Add organization info
        doc.setFontSize(12);
        doc.text('Organization Profile:', 30, 130);
        
        const orgSizeMap = {
            'very-small': 'Very Small (< 300 devices)',
            'small': 'Small (300-1,000 devices)',
            'medium': 'Medium (1,000-5,000 devices)',
            'large': 'Large (5,000-10,000 devices)',
            'enterprise': 'Enterprise (10,000+ devices)'
        };
        
        const industryMap = {
            'healthcare': 'Healthcare',
            'financial': 'Financial Services',
            'education': 'Education',
            'government': 'Government',
            'manufacturing': 'Manufacturing',
            'retail': 'Retail',
            'technology': 'Technology',
            'energy': 'Energy & Utilities'
        };
        
        doc.text(`• Organization Size: ${orgSizeMap[info.orgSize] || info.orgSize}`, 40, 140);
        doc.text(`• Number of Devices: ${info.deviceCount}`, 40, 150);
        doc.text(`• Analysis Period: ${info.yearsToProject} Years`, 40, 160);
        
        if (info.industry && industryMap[info.industry]) {
            doc.text(`• Industry: ${industryMap[info.industry]}`, 40, 170);
        }
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 200, { align: 'center' });
        
        // Add footer
        doc.setFontSize(9);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('© 2025 Portnox. All rights reserved.', 105, 280, { align: 'center' });
        doc.text('www.portnox.com', 105, 285, { align: 'center' });
    }
    
    // Helper function to add executive summary
    function addExecutiveSummary(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Executive Summary');
        
        // Get metrics
        const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
        const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction';
        const threeYearROI = document.getElementById('three-year-roi')?.textContent || '287%';
        const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
        
        // Summary text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const summaryText = [
            'This report provides a comprehensive analysis of the Total Cost of Ownership (TCO) and Return on Investment (ROI) ',
            'for Portnox Cloud compared to alternative Network Access Control (NAC) solutions. The analysis covers direct and ',
            'indirect costs over a three-year period, including implementation, operations, maintenance, and personnel expenses.'
        ].join('');
        
        doc.text(summaryText, 20, 40, { maxWidth: 170 });
        
        // Key findings section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Findings', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        doc.text(`• Total 3-Year Savings: ${totalSavings}`, 30, 70);
        doc.text(`• Cost Reduction: ${savingsPercentage}`, 30, 80);
        doc.text(`• Return on Investment: ${threeYearROI}`, 30, 90);
        doc.text(`• Payback Period: ${paybackPeriod}`, 30, 100);
        
        // Strategic benefits section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Strategic Benefits', 20, 120);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const benefits = [
            {
                title: 'Cloud-Native Solution',
                description: 'Zero infrastructure costs, automatic updates, and global scalability'
            },
            {
                title: 'Rapid Deployment',
                description: '75% faster implementation than on-premises alternatives'
            },
            {
                title: 'Zero Trust Security',
                description: 'Comprehensive, continuous device authentication and verification'
            },
            {
                title: 'Future-Proof Solution',
                description: 'Automatic updates, continuous innovation, and AI-powered security'
            }
        ];
        
        let yPos = 130;
        benefits.forEach(benefit => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${benefit.title}`, 30, yPos);
            
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(benefit.description, 40, yPos + 10, { maxWidth: 150 });
            
            yPos += 25;
        });
        
        // Add page number
        addPageNumber(doc, 1);
    }
    
    // Helper function to add TCO breakdown
    function addTCOBreakdown(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'TCO Breakdown & Financial Analysis');
        
        // Get metrics
        const portnoxTCO = document.getElementById('portnox-tco')?.textContent || '$202,500';
        const tcoComparison = document.getElementById('tco-comparison')?.textContent || 'vs. $450,000 (Cisco ISE)';
        
        // TCO Overview text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const tcoText = [
            'This section breaks down the Total Cost of Ownership (TCO) for each solution over a three-year period. ',
            'The analysis includes all direct and indirect costs associated with each solution, including licensing, ',
            'hardware, implementation, maintenance, and personnel costs.'
        ].join('');
        
        doc.text(tcoText, 20, 40, { maxWidth: 170 });
        
        // TCO Summary section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('TCO Summary', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        doc.text(`• Portnox Cloud 3-Year TCO: ${portnoxTCO}`, 30, 70);
        doc.text(`• Comparison: ${tcoComparison}`, 30, 80);
        
        // Cost Breakdown section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Cost Breakdown by Category', 20, 100);
        
        // Create a simple table for cost breakdown
        const categories = [
            'Hardware Costs',
            'Software Licensing',
            'Implementation',
            'Maintenance',
            'Personnel',
            'Training & Support'
        ];
        
        const portnoxCosts = [
            '$0', // No hardware
            '$137,000',
            '$15,500',
            '$0', // Included in subscription
            '$40,000',
            '$10,000'
        ];
        
        const competitorId = selectedVendors.find(v => v.id !== 'portnox')?.id || 'cisco';
        const competitorName = selectedVendors.find(v => v.id !== 'portnox')?.name || 'Cisco ISE';
        const competitorCosts = {
            'cisco': ['$90,000', '$112,500', '$67,500', '$81,000', '$67,500', '$31,500'],
            'aruba': ['$76,000', '$95,000', '$57,000', '$68,400', '$57,000', '$26,600'],
            'forescout': ['$81,000', '$101,250', '$60,750', '$72,900', '$60,750', '$28,350'],
            'fortinac': ['$65,000', '$81,250', '$48,750', '$58,500', '$48,750', '$22,750'],
            'juniper': ['$68,000', '$85,000', '$51,000', '$61,200', '$51,000', '$23,800'],
            'securew2': ['$0', '$154,000', '$33,600', '$0', '$70,000', '$22,400'],
            'foxpass': ['$0', '$132,000', '$28,800', '$0', '$60,000', '$19,200'],
            'microsoft': ['$58,000', '$72,500', '$43,500', '$52,200', '$43,500', '$20,300'],
            'arista': ['$60,000', '$75,000', '$45,000', '$54,000', '$45,000', '$21,000']
        };
        
        const competitorValues = competitorCosts[competitorId] || competitorCosts.cisco;
        
        // Draw the table
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, 110, 60, 10, 'F');
        doc.rect(80, 110, 50, 10, 'F');
        doc.rect(130, 110, 50, 10, 'F');
        
        doc.setFontSize(10);
        doc.text('Cost Category', 50, 117, { align: 'center' });
        doc.text('Portnox Cloud', 105, 117, { align: 'center' });
        doc.text(competitorName, 155, 117, { align: 'center' });
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        let yPos = 120;
        
        categories.forEach((category, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, 160, 10, 'F');
            }
            
            doc.text(category, 25, yPos + 7);
            doc.text(portnoxCosts[index], 105, yPos + 7, { align: 'center' });
            doc.text(competitorValues[index], 155, yPos + 7, { align: 'center' });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, 110, 160, yPos - 110, 'S'); // Outer border
        doc.line(80, 110, 80, yPos + 10); // Vertical line 1
        doc.line(130, 110, 130, yPos + 10); // Vertical line 2
        doc.line(20, 120, 180, 120); // Horizontal line
        
        // Add savings calculation
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('ROI Analysis', 20, yPos);
        
        // ROI details
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const roiDetails = [
            `• Total 3-Year Savings: ${document.getElementById('total-savings')?.textContent || '$247,000'}`,
            `• Return on Investment: ${document.getElementById('three-year-roi')?.textContent || '287%'}`,
            `• Payback Period: ${document.getElementById('payback-period')?.textContent || '7 months'}`,
            '• Annual Cost Savings: $82,333 per year'
        ];
        
        yPos += 10;
        roiDetails.forEach(detail => {
            yPos += 10;
            doc.text(detail, 30, yPos);
        });
        
        // Add page number
        addPageNumber(doc, 2);
    }
    
    // Helper function to add security analysis
    function addSecurityAnalysis(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Security & Compliance Analysis');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityText = [
            'This section analyzes the security capabilities and compliance features of each solution. ',
            'The analysis covers Zero Trust readiness, device authentication, continuous monitoring, ',
            'compliance framework coverage, and overall security posture improvements.'
        ].join('');
        
        doc.text(securityText, 20, 40, { maxWidth: 170 });
        
        // Security metrics section
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Security Posture Metrics', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityMetrics = [
            `• Zero Trust Readiness: ${document.getElementById('security-improvement')?.textContent || '92%'}`,
            '• Device Authentication: 100% complete device visibility',
            '• Risk Assessment: Real-time continuous monitoring',
            `• Mean Time to Respond: ${document.getElementById('mttr')?.textContent || '52 min'} (vs. industry avg of 4.5 hours)`,
            `• Breach Probability: ${document.getElementById('breach-probability')?.textContent || 'Low'} (vs. Medium-High with no NAC)`
        ];
        
        let yPos = 70;
        securityMetrics.forEach(metric => {
            doc.text(metric, 30, yPos);
            yPos += 10;
        });
        
        // Compliance coverage section
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Compliance Framework Coverage', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const complianceText = [
            'Portnox Cloud provides comprehensive coverage for major compliance frameworks, helping ',
            'organizations meet regulatory requirements with minimal effort. The solution includes ',
            'built-in policies, automated enforcement, and detailed reporting capabilities.'
        ].join('');
        
        doc.text(complianceText, 20, yPos, { maxWidth: 170 });
        
        // Compliance framework table
        yPos += 20;
        
        // Table headers
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        doc.rect(20, yPos, 90, 10, 'F');
        doc.rect(110, yPos, 40, 10, 'F');
        doc.rect(150, yPos, 30, 10, 'F');
        
        doc.setFontSize(10);
        doc.text('Compliance Framework', 65, yPos + 7, { align: 'center' });
        doc.text('Portnox Coverage', 130, yPos + 7, { align: 'center' });
        doc.text('Industry Avg', 165, yPos + 7, { align: 'center' });
        
        // Table data
        const complianceFrameworks = [
            { name: 'PCI DSS', portnox: '94%', industry: '72%' },
            { name: 'HIPAA', portnox: '92%', industry: '68%' },
            { name: 'NIST 800-53', portnox: '96%', industry: '70%' },
            { name: 'GDPR', portnox: '90%', industry: '65%' },
            { name: 'ISO 27001', portnox: '93%', industry: '75%' },
            { name: 'CMMC', portnox: '91%', industry: '68%' }
        ];
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        
        complianceFrameworks.forEach((framework, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, 160, 10, 'F');
            }
            
            doc.text(framework.name, 25, yPos + 7);
            doc.text(framework.portnox, 130, yPos + 7, { align: 'center' });
            doc.text(framework.industry, 165, yPos + 7, { align: 'center' });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, yPos - (complianceFrameworks.length * 10), 160, (complianceFrameworks.length + 1) * 10, 'S'); // Outer border
        doc.line(110, yPos - (complianceFrameworks.length * 10), 110, yPos + 10); // Vertical line 1
        doc.line(150, yPos - (complianceFrameworks.length * 10), 150, yPos + 10); // Vertical line 2
        doc.line(20, yPos - (complianceFrameworks.length * 10) + 10, 180, yPos - (complianceFrameworks.length * 10) + 10); // Horizontal line below header
        
        // Security advantages
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Security Advantages', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const securityAdvantages = [
            {
                title: 'Zero Trust Architecture',
                description: 'Built from the ground up for zero trust security, not retrofitted like legacy solutions.'
            },
            {
                title: 'Continuous Verification',
                description: 'Real-time device posture assessment ensures only compliant devices maintain access.'
            },
            {
                title: 'Cloud-Delivered Security',
                description: 'Automatic updates ensure protection against the latest threats without manual intervention.'
            },
            {
                title: 'Rapid Incident Response',
                description: 'Automated remediation workflows reduce mean time to respond by up to 85%.'
            }
        ];
        
        securityAdvantages.forEach(advantage => {
            yPos += 5;
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${advantage.title}`, 30, yPos);
            
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(advantage.description, 40, yPos + 8, { maxWidth: 140 });
            
            yPos += 18;
        });
        
        // Add page number
        addPageNumber(doc, 3);
    }
    
    // Helper function to add vendor comparison
    function addVendorComparison(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Vendor Comparison');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const comparisonText = [
            'This section provides a detailed comparison of Portnox Cloud with alternative NAC solutions. ',
            'The analysis covers key capabilities, technical architecture, deployment requirements, ',
            'and competitive advantages.'
        ].join('');
        
        doc.text(comparisonText, 20, 40, { maxWidth: 170 });
        
        // Feature comparison table
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Feature Comparison', 20, 60);
        
        // Calculate column widths based on number of vendors
        const tableStartY = 70;
        const featureColWidth = 70;
        const vendorColWidth = Math.min(40, Math.floor((180 - featureColWidth) / selectedVendors.length));
        
        // Determine which competitors to include (limited by space)
        const maxCompetitors = Math.floor((180 - featureColWidth) / vendorColWidth) - 1; // -1 to always keep Portnox
        const competitorsToInclude = selectedVendors
            .filter(v => v.id !== 'portnox')
            .slice(0, maxCompetitors);
        
        const vendorsToShow = [
            { id: 'portnox', name: 'Portnox Cloud' },
            ...competitorsToInclude
        ];
        
        // Table header
        doc.setFillColor(reportConfig.colors.primary);
        doc.setTextColor(255, 255, 255);
        
        // Feature column header
        doc.rect(20, tableStartY, featureColWidth, 10, 'F');
        doc.setFontSize(10);
        doc.text('Capability', 20 + (featureColWidth / 2), tableStartY + 7, { align: 'center' });
        
        // Vendor column headers
        let xPos = 20 + featureColWidth;
        vendorsToShow.forEach((vendor, index) => {
            // Use accent color for Portnox
            if (vendor.id === 'portnox') {
                doc.setFillColor(reportConfig.colors.accent);
            } else {
                doc.setFillColor(reportConfig.colors.primary);
            }
            
            doc.rect(xPos, tableStartY, vendorColWidth, 10, 'F');
            doc.text(vendor.name, xPos + (vendorColWidth / 2), tableStartY + 7, { align: 'center' });
            
            xPos += vendorColWidth;
        });
        
        // Table data
        const features = [
            {
                name: 'Cloud Architecture',
                values: {
                    portnox: 'Native',
                    cisco: 'Partial',
                    aruba: 'Partial',
                    forescout: 'Limited',
                    fortinac: 'Limited',
                    juniper: 'Partial',
                    securew2: 'Native',
                    microsoft: 'None',
                    arista: 'Limited',
                    foxpass: 'Native',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Zero Trust',
                values: {
                    portnox: 'Comprehensive',
                    cisco: 'Partial',
                    aruba: 'Limited',
                    forescout: 'Partial',
                    fortinac: 'Partial',
                    juniper: 'Partial',
                    securew2: 'Limited',
                    microsoft: 'Limited',
                    arista: 'Limited',
                    foxpass: 'Limited',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Deployment Speed',
                values: {
                    portnox: 'Days',
                    cisco: 'Months',
                    aruba: 'Weeks',
                    forescout: 'Weeks',
                    fortinac: 'Weeks',
                    juniper: 'Weeks',
                    securew2: 'Days',
                    microsoft: 'Weeks',
                    arista: 'Weeks',
                    foxpass: 'Days',
                    extreme: 'Weeks'
                }
            },
            {
                name: 'FTE Requirements',
                values: {
                    portnox: 'Minimal',
                    cisco: 'High',
                    aruba: 'Moderate',
                    forescout: 'Moderate',
                    fortinac: 'Moderate',
                    juniper: 'Moderate',
                    securew2: 'Low',
                    microsoft: 'Moderate',
                    arista: 'Moderate',
                    foxpass: 'Low',
                    extreme: 'Moderate'
                }
            },
            {
                name: 'Remote Access',
                values: {
                    portnox: 'Built-in',
                    cisco: 'Add-on',
                    aruba: 'Limited',
                    forescout: 'Limited',
                    fortinac: 'Limited',
                    juniper: 'Limited',
                    securew2: 'Built-in',
                    microsoft: 'Limited',
                    arista: 'Add-on',
                    foxpass: 'Built-in',
                    extreme: 'Limited'
                }
            },
            {
                name: 'Hardware Footprint',
                values: {
                    portnox: 'None',
                    cisco: 'Large',
                    aruba: 'Medium',
                    forescout: 'Medium',
                    fortinac: 'Medium',
                    juniper: 'Medium',
                    securew2: 'None',
                    microsoft: 'Medium',
                    arista: 'Medium',
                    foxpass: 'None',
                    extreme: 'Medium'
                }
            },
            {
                name: 'Automatic Updates',
                values: {
                    portnox: 'Yes',
                    cisco: 'No',
                    aruba: 'No',
                    forescout: 'No',
                    fortinac: 'No',
                    juniper: 'Partial',
                    securew2: 'Yes',
                    microsoft: 'No',
                    arista: 'No',
                    foxpass: 'Yes',
                    extreme: 'No'
                }
            },
            {
                name: 'IoT Support',
                values: {
                    portnox: 'Extensive',
                    cisco: 'Good',
                    aruba: 'Good',
                    forescout: 'Extensive',
                    fortinac: 'Good',
                    juniper: 'Limited',
                    securew2: 'Limited',
                    microsoft: 'Limited',
                    arista: 'Good',
                    foxpass: 'Limited',
                    extreme: 'Good'
                }
            }
        ];
        
        // Table rows
        doc.setTextColor(reportConfig.colors.text);
        let yPos = tableStartY;
        
        features.forEach((feature, index) => {
            yPos += 10;
            
            if (index % 2 === 0) {
                doc.setFillColor(240, 240, 240);
                doc.rect(20, yPos, featureColWidth + (vendorColWidth * vendorsToShow.length), 10, 'F');
            }
            
            // Feature name
            doc.text(feature.name, 25, yPos + 7);
            
            // Values for each vendor
            xPos = 20 + featureColWidth;
            vendorsToShow.forEach(vendor => {
                const value = feature.values[vendor.id] || '-';
                
                // Highlight Portnox values
                if (vendor.id === 'portnox') {
                    doc.setTextColor(reportConfig.colors.accent);
                    doc.setFontSize(10);
                    doc.text(value, xPos + (vendorColWidth / 2), yPos + 7, { align: 'center' });
                    doc.setTextColor(reportConfig.colors.text);
                } else {
                    doc.text(value, xPos + (vendorColWidth / 2), yPos + 7, { align: 'center' });
                }
                
                xPos += vendorColWidth;
            });
        });
        
        // Draw borders
        doc.setDrawColor(reportConfig.colors.border);
        doc.rect(20, tableStartY, featureColWidth + (vendorColWidth * vendorsToShow.length), (features.length + 1) * 10, 'S'); // Outer border
        
        // Vertical lines
        xPos = 20 + featureColWidth;
        for (let i = 0; i < vendorsToShow.length; i++) {
            doc.line(xPos, tableStartY, xPos, tableStartY + ((features.length + 1) * 10));
            xPos += vendorColWidth;
        }
        
        // Horizontal line below header
        doc.line(20, tableStartY + 10, 20 + featureColWidth + (vendorColWidth * vendorsToShow.length), tableStartY + 10);
        
        // Competitive advantages
        yPos += 25;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Portnox Competitive Advantages', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const advantages = [
            {
                title: 'Cloud-Native Architecture',
                description: 'Unlike on-premises competitors, Portnox requires no hardware investment or complex upgrades.'
            },
            {
                title: 'Deployment Speed',
                description: 'Portnox deploys in days rather than months, with minimal specialized expertise required.'
            },
            {
                title: 'Zero Trust Model',
                description: 'Built from the ground up for zero trust security, not retrofitted like legacy solutions.'
            },
            {
                title: 'Total Cost of Ownership',
                description: 'Predictable subscription model eliminates hidden costs and expensive hardware.'
            }
        ];
        
        advantages.forEach(advantage => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${advantage.title}`, 30, yPos);
            
            yPos += 8;
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(advantage.description, 35, yPos, { maxWidth: 150 });
            
            yPos += 12;
        });
        
        // Add page number
        addPageNumber(doc, 4);
    }
    
    // Helper function to add conclusion
    function addConclusion(doc, selectedVendors) {
        // Page header
        addPageHeader(doc, 'Conclusion & Recommendations');
        
        // Introduction text
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const conclusionText = [
            'Based on the comprehensive analysis of Total Cost of Ownership (TCO), Return on Investment (ROI), ',
            'security capabilities, and technical features, we provide the following conclusions and recommendations ',
            'for your Network Access Control (NAC) solution deployment.'
        ].join('');
        
        doc.text(conclusionText, 20, 40, { maxWidth: 170 });
        
        // Key findings summary
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Key Findings Summary', 20, 60);
        
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const findings = [
            `• Portnox Cloud offers a total 3-year TCO of ${document.getElementById('portnox-tco')?.textContent || '$202,500'}, representing `,
            `  a ${document.getElementById('savings-percentage')?.textContent || '48% reduction'} compared to traditional NAC solutions.`,
            `• The solution provides a ${document.getElementById('three-year-roi')?.textContent || '287%'} return on investment over three years, with a `,
            `  payback period of just ${document.getElementById('payback-period')?.textContent || '7 months'}.`,
            `• Portnox Cloud's implementation time of ${document.getElementById('implementation-time')?.textContent || '21 days'} is significantly faster than `,
            '  the months required for on-premises alternatives.',
            `• The security posture improvement of ${document.getElementById('security-improvement')?.textContent || '74%'} enhances overall protection `,
            '  against cyber threats and reduces the risk of breaches.'
        ];
        
        let yPos = 70;
        findings.forEach(finding => {
            doc.text(finding, 30, yPos, { maxWidth: 160 });
            yPos += 10;
        });
        
        // Recommendations section
        yPos += 10;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Recommendations', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const recommendations = [
            {
                title: 'Implementation Approach',
                text: 'Adopt a phased implementation approach, starting with critical network segments and gradually expanding to the entire organization. This minimizes disruption and allows for proper testing and validation.'
            },
            {
                title: 'Zero Trust Roadmap',
                text: 'Develop a comprehensive Zero Trust roadmap that integrates Portnox Cloud with existing security solutions to achieve a holistic security posture improvement.'
            },
            {
                title: 'Cloud Integration Strategy',
                text: 'Leverage Portnox Cloud\'s extensive integration capabilities to connect with existing cloud services, identity providers, and security tools for maximum value and efficiency.'
            },
            {
                title: 'Training and Enablement',
                text: 'Allocate resources for training and enablement to ensure your team can fully utilize Portnox Cloud\'s capabilities and maximize your return on investment.'
            }
        ];
        
        recommendations.forEach(recommendation => {
            doc.setFontSize(12);
            doc.setTextColor(reportConfig.colors.accent);
            doc.text(`• ${recommendation.title}`, 30, yPos);
            
            yPos += 8;
            doc.setFontSize(11);
            doc.setTextColor(reportConfig.colors.text);
            doc.text(recommendation.text, 35, yPos, { maxWidth: 150 });
            
            yPos += 18;
        });
        
        // Next steps section
        yPos += 5;
        doc.setFontSize(14);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Next Steps', 20, yPos);
        
        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        
        const nextSteps = [
            '1. Schedule a demo to see Portnox Cloud in action in your environment',
            '2. Develop a detailed implementation plan with Portnox\'s solutions team',
            '3. Identify integration points with your existing security ecosystem',
            '4. Define success metrics and KPIs for your NAC deployment',
            '5. Establish a training plan for your IT and security teams'
        ];
        
        nextSteps.forEach(step => {
            doc.text(step, 30, yPos, { maxWidth: 150 });
            yPos += 10;
        });
        
        // Contact information
        yPos += 15;
        doc.setFontSize(12);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('For more information:', 20, yPos);
        
        yPos += 8;
        doc.setFontSize(11);
        doc.setTextColor(reportConfig.colors.text);
        doc.text('www.portnox.com', 30, yPos);
        
        yPos += 8;
        doc.text('contact@portnox.com', 30, yPos);
        
        yPos += 8;
        doc.text('+1 (800) XXX-XXXX', 30, yPos);
        
        // Add page number
        addPageNumber(doc, 5);
    }
    
    // Helper function to add page header to each page
    function addPageHeader(doc, title) {
        // Header rectangle
        doc.setFillColor(reportConfig.colors.light);
        doc.rect(0, 0, 210, 25, 'F');
        
        // Add colored line under the header
        doc.setFillColor(reportConfig.colors.primary);
        doc.rect(0, 25, 210, 1, 'F');
        
        // Add title
        doc.setFontSize(16);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text(title, 20, 17);
        
        // Add Portnox logo
        // This would normally add an image, but for simplicity we'll add text
        doc.setFontSize(12);
        doc.setTextColor(reportConfig.colors.primary);
        doc.text('Portnox', 180, 17);
    }
    
    // Helper function to add page number
    function addPageNumber(doc, pageNum) {
        doc.setFontSize(10);
        doc.setTextColor(reportConfig.colors.text);
        doc.text(`Page ${pageNum}`, 105, 285, { align: 'center' });
    }
    
    // Initialize the report generator
    document.addEventListener('DOMContentLoaded', function() {
        initReportGenerator();
    });
})();
