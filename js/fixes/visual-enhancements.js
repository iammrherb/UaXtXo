// Visual Enhancements for Portnox TCO Analyzer
(function() {
    console.log('📊 Initializing visual enhancements...');
    
    // Initialize visual enhancements
    function initVisualEnhancements() {
        try {
            // Create security heatmap
            createSecurityHeatmap();
            
            // Create risk heatmap
            createRiskHeatmap();
            
            // Enhance dashboard cards with animations
            enhanceDashboardCards();
            
            // Add comparison highlighting
            addComparisonHighlighting();
            
            console.log('Visual enhancements initialization complete');
        } catch (e) {
            console.error('Error initializing visual enhancements:', e);
        }
    }
    
    // Create security heatmap visualization
    function createSecurityHeatmap() {
        const heatmapContainer = document.getElementById('security-heatmap');
        if (!heatmapContainer) return;
        
        // Security capabilities data
        const securityCapabilities = [
            { x: 'Device Authentication', y: 'Portnox Cloud', value: 95 },
            { x: 'Device Authentication', y: 'Cisco ISE', value: 85 },
            { x: 'Device Authentication', y: 'Aruba ClearPass', value: 80 },
            { x: 'Device Authentication', y: 'Forescout', value: 90 },
            
            { x: 'Continuous Monitoring', y: 'Portnox Cloud', value: 90 },
            { x: 'Continuous Monitoring', y: 'Cisco ISE', value: 70 },
            { x: 'Continuous Monitoring', y: 'Aruba ClearPass', value: 65 },
            { x: 'Continuous Monitoring', y: 'Forescout', value: 80 },
            
            { x: 'Zero Trust Enforcement', y: 'Portnox Cloud', value: 95 },
            { x: 'Zero Trust Enforcement', y: 'Cisco ISE', value: 60 },
            { x: 'Zero Trust Enforcement', y: 'Aruba ClearPass', value: 55 },
            { x: 'Zero Trust Enforcement', y: 'Forescout', value: 65 },
            
            { x: 'Remote Access Control', y: 'Portnox Cloud', value: 90 },
            { x: 'Remote Access Control', y: 'Cisco ISE', value: 60 },
            { x: 'Remote Access Control', y: 'Aruba ClearPass', value: 50 },
            { x: 'Remote Access Control', y: 'Forescout', value: 55 },
            
            { x: 'Automated Remediation', y: 'Portnox Cloud', value: 85 },
            { x: 'Automated Remediation', y: 'Cisco ISE', value: 75 },
            { x: 'Automated Remediation', y: 'Aruba ClearPass', value: 70 },
            { x: 'Automated Remediation', y: 'Forescout', value: 80 },
            
            { x: 'Cloud Security', y: 'Portnox Cloud', value: 95 },
            { x: 'Cloud Security', y: 'Cisco ISE', value: 55 },
            { x: 'Cloud Security', y: 'Aruba ClearPass', value: 50 },
            { x: 'Cloud Security', y: 'Forescout', value: 60 }
        ];
        
        // Create the heatmap
        if (typeof d3 !== 'undefined') {
            // Clear previous content
            heatmapContainer.innerHTML = '';
            
            // Set dimensions
            const margin = { top: 30, right: 30, bottom: 30, left: 150 };
            const width = 600 - margin.left - margin.right;
            const height = 350 - margin.top - margin.bottom;
            
            // Extract unique x and y values
            const xValues = Array.from(new Set(securityCapabilities.map(d => d.x)));
            const yValues = Array.from(new Set(securityCapabilities.map(d => d.y)));
            
            // Create SVG
            const svg = d3.select('#security-heatmap')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
            
            // Build X scales and axis
            const x = d3.scaleBand()
                .range([0, width])
                .domain(xValues)
                .padding(0.05);
            
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickSize(0))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', 'rotate(-45)');
            
            // Build Y scales and axis
            const y = d3.scaleBand()
                .range([height, 0])
                .domain(yValues)
                .padding(0.05);
            
            svg.append('g')
                .call(d3.axisLeft(y).tickSize(0));
            
            // Build color scale
            const colorScale = d3.scaleLinear()
                .range(['#f8d7da', '#d1e7dd'])
                .domain([40, 100]);
            
            // Create the heatmap cells
            svg.selectAll()
                .data(securityCapabilities)
                .enter()
                .append('rect')
                .attr('x', d => x(d.x))
                .attr('y', d => y(d.y))
                .attr('width', x.bandwidth())
                .attr('height', y.bandwidth())
                .style('fill', d => colorScale(d.value))
                .style('stroke', '#fff')
                .style('stroke-width', 1)
                .style('opacity', 0.8)
                .on('mouseover', function(event, d) {
                    d3.select(this)
                        .style('stroke', '#333')
                        .style('stroke-width', 2)
                        .style('opacity', 1);
                    
                    // Show tooltip
                    const tooltip = d3.select('body').append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background-color', 'rgba(0,0,0,0.8)')
                        .style('color', '#fff')
                        .style('padding', '10px')
                        .style('border-radius', '4px')
                        .style('font-size', '12px')
                        .style('pointer-events', 'none')
                        .style('opacity', 0);
                    
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    
                    tooltip.html(`<strong>${d.y}</strong><br>${d.x}: ${d.value}%`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .style('stroke', '#fff')
                        .style('stroke-width', 1)
                        .style('opacity', 0.8);
                    
                    // Remove tooltip
                    d3.selectAll('.tooltip').remove();
                });
            
            // Add the values to each cell
            svg.selectAll()
                .data(securityCapabilities)
                .enter()
                .append('text')
                .attr('x', d => x(d.x) + x.bandwidth() / 2)
                .attr('y', d => y(d.y) + y.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .text(d => d.value)
                .style('font-size', '12px')
                .style('fill', d => d.value > 70 ? '#333' : '#333');
            
            // Add legend
            const legendWidth = 200;
            const legendHeight = 20;
            
            const legend = svg.append('g')
                .attr('transform', `translate(${width - legendWidth}, ${-20})`);
            
            const defs = legend.append('defs');
            
            const linearGradient = defs.append('linearGradient')
                .attr('id', 'linear-gradient');
            
            linearGradient.selectAll('stop')
                .data([
                    { offset: '0%', color: '#f8d7da' },
                    { offset: '100%', color: '#d1e7dd' }
                ])
                .enter().append('stop')
                .attr('offset', d => d.offset)
                .attr('stop-color', d => d.color);
            
            legend.append('rect')
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .style('fill', 'url(#linear-gradient)');
            
            legend.append('text')
                .attr('x', 0)
                .attr('y', legendHeight + 15)
                .style('text-anchor', 'start')
                .style('font-size', '12px')
                .text('Lower');
            
            legend.append('text')
                .attr('x', legendWidth)
                .attr('y', legendHeight + 15)
                .style('text-anchor', 'end')
                .style('font-size', '12px')
                .text('Higher');
            
            console.log('Security heatmap created successfully');
        } else {
            console.warn('D3.js not available, could not create security heatmap');
            heatmapContainer.innerHTML = '<div class="alert alert-warning">D3.js library not loaded. Heatmap visualization not available.</div>';
        }
    }
    
    // Create risk heatmap visualization
    function createRiskHeatmap() {
        const heatmapContainer = document.getElementById('risk-heatmap');
        if (!heatmapContainer) return;
        
        // Risk impact data
        const riskData = [
            { x: 'Unauthorized Access', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Unauthorized Access', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Unauthorized Access', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Data Breach', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Data Breach', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Data Breach', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Malware Propagation', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Malware Propagation', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Malware Propagation', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Insider Threat', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Insider Threat', y: 'Portnox Cloud', value: 'Medium-Low', color: '#e8f6e9' },
            { x: 'Insider Threat', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' },
            
            { x: 'Compliance Violation', y: 'No NAC', value: 'High', color: '#f8d7da' },
            { x: 'Compliance Violation', y: 'Portnox Cloud', value: 'Low', color: '#d1e7dd' },
            { x: 'Compliance Violation', y: 'Competitor Avg', value: 'Medium', color: '#fff3cd' }
        ];
        
        // Create a simple HTML table-based heatmap
        let heatmapHTML = `
            <table class="risk-heatmap-table" style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                <thead>
                    <tr>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee; min-width: 150px;">Risk Category</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">No NAC</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Portnox Cloud</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #eee;">Competitor Avg</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Get unique x values (risk categories)
        const riskCategories = Array.from(new Set(riskData.map(d => d.x)));
        
        // Add rows for each risk category
        riskCategories.forEach(category => {
            heatmapHTML += `<tr>`;
            heatmapHTML += `<td style="padding: 10px; text-align: left; border-bottom: 1px solid #eee; font-weight: 600;">${category}</td>`;
            
            // Add cells for each solution
            ['No NAC', 'Portnox Cloud', 'Competitor Avg'].forEach(solution => {
                const cell = riskData.find(d => d.x === category && d.y === solution);
                
                if (cell) {
                    heatmapHTML += `
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee; background-color: ${cell.color}; font-weight: 500;">
                            ${cell.value}
                        </td>
                    `;
                } else {
                    heatmapHTML += `<td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">-</td>`;
                }
            });
            
            heatmapHTML += `</tr>`;
        });
        
        heatmapHTML += `
                </tbody>
            </table>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">
                <strong>Risk Levels:</strong>
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #f8d7da; margin-left: 10px; margin-right: 5px;"></span> High
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #fff3cd; margin-left: 10px; margin-right: 5px;"></span> Medium
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #e8f6e9; margin-left: 10px; margin-right: 5px;"></span> Medium-Low
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #d1e7dd; margin-left: 10px; margin-right: 5px;"></span> Low
            </div>
        `;
        
        // Set the HTML content
        heatmapContainer.innerHTML = heatmapHTML;
        
        console.log('Risk heatmap created successfully');
    }
    
    // Enhance dashboard cards with animations and visual effects
    function enhanceDashboardCards() {
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        
        dashboardCards.forEach(card => {
            // Add transition effect
            card.style.transition = 'all 0.3s ease';
            
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            });
            
            // Add animated value display
            const metricValue = card.querySelector('.metric-value');
            if (metricValue) {
                const originalText = metricValue.textContent;
                
                // Check if it's a number or percentage
                if (/^\$[\d,]+$/.test(originalText)) {
                    // Format as currency
                    const targetValue = parseInt(originalText.replace(/[$,]/g, ''));
                    animateValue(metricValue, 0, targetValue, 1500, value => `$${value.toLocaleString()}`);
                } else if (/^[\d.]+%$/.test(originalText)) {
                    // Format as percentage
                    const targetValue = parseFloat(originalText);
                    animateValue(metricValue, 0, targetValue, 1500, value => `${value}%`);
                } else if (/^\d+\s+\w+$/.test(originalText)) {
                    // Format as number with unit (e.g., "7 months")
                    const parts = originalText.split(' ');
                    const targetValue = parseInt(parts[0]);
                    const unit = parts[1];
                    animateValue(metricValue, 0, targetValue, 1500, value => `${value} ${unit}`);
                }
            }
        });
        
        console.log('Dashboard cards enhanced successfully');
    }
    
    // Animate value display
    function animateValue(element, start, end, duration, formatter) {
        if (!element) return;
        
        // Don't animate if already done
        if (element.getAttribute('data-animated') === 'true') return;
        element.setAttribute('data-animated', 'true');
        
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = formatter ? formatter(currentValue) : currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    // Add comparison highlighting to tables
    function addComparisonHighlighting() {
        // Find all comparison tables
        const comparisonTables = document.querySelectorAll('.comparison-table, #vendor-strengths-table');
        
        comparisonTables.forEach(table => {
            // Add a class to Portnox cells
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 1) {
                    // Highlight the second cell (Portnox)
                    cells[1].classList.add('highlight-cell');
                    cells[1].style.fontWeight = '600';
                    cells[1].style.color = '#2BD25B';
                }
            });
        });
        
        console.log('Comparison highlighting added successfully');
    }
    
    // Initialize visual enhancements when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add small delay to ensure other components are initialized
        setTimeout(initVisualEnhancements, 500);
    });
    
    // Add fallback initialization on window load
    window.addEventListener('load', function() {
        if (document.getElementById('security-heatmap') && document.getElementById('security-heatmap').children.length === 0) {
            console.log('Initializing visual enhancements on window load (fallback)');
            initVisualEnhancements();
        }
    });
})();
