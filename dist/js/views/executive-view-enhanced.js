document.addEventListener("DOMContentLoaded",function(){console.log("Initializing enhanced Executive View...");setTimeout(enhanceExecutiveView,500)});function enhanceExecutiveView(){enhanceRoiPanel();enhanceComparisonPanel();addAnalystQuotes();addCaseStudies();console.log("Executive View enhanced")}function enhanceRoiPanel(){const roiPanel=document.getElementById("executive-roi");if(!roiPanel){console.warn("ROI panel not found, cannot enhance");return}const valueDriversChart=roiPanel.querySelector("#value-drivers-chart");if(valueDriversChart){const fteAnalysisContainer=document.createElement("div");fteAnalysisContainer.className="chart-container";fteAnalysisContainer.innerHTML=`
      <h3>IT FTE Requirements Comparison</h3>
      <div class="chart-wrapper" id="fte-comparison-chart"></div>
      <div class="chart-legend" id="fte-comparison-legend"></div>
    `;valueDriversChart.after(fteAnalysisContainer);if(window.ApexCharts){createFteComparisonChart()}else{console.warn("ApexCharts not available, cannot create FTE comparison chart")}}const benefitsGrid=roiPanel.querySelector(".benefits-grid");if(benefitsGrid){const multiYearContainer=document.createElement("div");multiYearContainer.className="chart-container";multiYearContainer.innerHTML=`
      <h3>Multi-Year Financial Projections</h3>
      <div class="chart-wrapper" id="multi-year-chart"></div>
      <div class="chart-legend" id="multi-year-legend"></div>
    `;benefitsGrid.after(multiYearContainer);if(window.ApexCharts){createMultiYearProjectionChart()}else{console.warn("ApexCharts not available, cannot create multi-year projection chart")}}}function enhanceComparisonPanel(){const comparisonPanel=document.getElementById("executive-comparison");if(!comparisonPanel){console.warn("Comparison panel not found, cannot enhance");return}const existingTable=comparisonPanel.querySelector(".comparison-table-container");if(existingTable){existingTable.innerHTML=`
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Portnox</th>
            <th>Cisco ISE</th>
            <th>Forescout</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Architecture</strong></td>
            <td class="highlight-cell">Cloud-Native</td>
            <td>On-Premises</td>
            <td>On-Premises</td>
          </tr>
          <tr>
            <td><strong>Implementation Time</strong></td>
            <td class="highlight-cell">3 weeks</td>
            <td>12-16 weeks</td>
            <td>8-12 weeks</td>
          </tr>
          <tr>
            <td><strong>Implementation Cost</strong></td>
            <td class="highlight-cell">$15,000</td>
            <td>$85,000</td>
            <td>$65,000</td>
          </tr>
          <tr>
            <td><strong>IT Resources Required</strong></td>
            <td class="highlight-cell">0.25 FTE</td>
            <td>2.0 FTE</td>
            <td>1.5 FTE</td>
          </tr>
          <tr>
            <td><strong>Hardware Required</strong></td>
            <td class="highlight-cell">None</td>
            <td>Multiple Servers</td>
            <td>Appliances</td>
          </tr>
          <tr>
            <td><strong>Subscription Model</strong></td>
            <td class="highlight-cell">Per Device</td>
            <td>License Tiers</td>
            <td>License Tiers</td>
          </tr>
          <tr>
            <td><strong>Automatic Updates</strong></td>
            <td class="highlight-cell">Yes</td>
            <td>No</td>
            <td>No</td>
          </tr>
          <tr>
            <td><strong>Global Scalability</strong></td>
            <td class="highlight-cell">Yes</td>
            <td>Limited</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td><strong>Remote Work Support</strong></td>
            <td class="highlight-cell">Native</td>
            <td>Add-on Required</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td><strong>3-Year TCO</strong></td>
            <td class="highlight-cell">$245,000</td>
            <td>$520,000</td>
            <td>$430,000</td>
          </tr>
          <tr>
            <td><strong>3-Year ROI</strong></td>
            <td class="highlight-cell">226%</td>
            <td>-8%</td>
            <td>12%</td>
          </tr>
          <tr>
            <td><strong>Payback Period</strong></td>
            <td class="highlight-cell">7 months</td>
            <td>25 months</td>
            <td>18 months</td>
          </tr>
        </tbody>
      </table>
    `}else{const matrixContainer=document.createElement("div");matrixContainer.className="chart-container";matrixContainer.innerHTML=`
      <h3>Comprehensive Vendor Comparison</h3>
      <div class="comparison-table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Portnox</th>
              <th>Cisco ISE</th>
              <th>Forescout</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Architecture</strong></td>
              <td class="highlight-cell">Cloud-Native</td>
              <td>On-Premises</td>
              <td>On-Premises</td>
            </tr>
            <tr>
              <td><strong>Implementation Time</strong></td>
              <td class="highlight-cell">3 weeks</td>
              <td>12-16 weeks</td>
              <td>8-12 weeks</td>
            </tr>
            <tr>
              <td><strong>Implementation Cost</strong></td>
              <td class="highlight-cell">$15,000</td>
              <td>$85,000</td>
              <td>$65,000</td>
            </tr>
            <tr>
              <td><strong>IT Resources Required</strong></td>
              <td class="highlight-cell">0.25 FTE</td>
              <td>2.0 FTE</td>
              <td>1.5 FTE</td>
            </tr>
            <tr>
              <td><strong>Hardware Required</strong></td>
              <td class="highlight-cell">None</td>
              <td>Multiple Servers</td>
              <td>Appliances</td>
            </tr>
            <tr>
              <td><strong>Subscription Model</strong></td>
              <td class="highlight-cell">Per Device</td>
              <td>License Tiers</td>
              <td>License Tiers</td>
            </tr>
            <tr>
              <td><strong>Automatic Updates</strong></td>
              <td class="highlight-cell">Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Global Scalability</strong></td>
              <td class="highlight-cell">Yes</td>
              <td>Limited</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td><strong>Remote Work Support</strong></td>
              <td class="highlight-cell">Native</td>
              <td>Add-on Required</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td><strong>3-Year TCO</strong></td>
              <td class="highlight-cell">$245,000</td>
              <td>$520,000</td>
              <td>$430,000</td>
            </tr>
            <tr>
              <td><strong>3-Year ROI</strong></td>
              <td class="highlight-cell">226%</td>
              <td>-8%</td>
              <td>12%</td>
            </tr>
            <tr>
              <td><strong>Payback Period</strong></td>
              <td class="highlight-cell">7 months</td>
              <td>25 months</td>
              <td>18 months</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;comparisonPanel.appendChild(matrixContainer)}const licensingContainer=document.createElement("div");licensingContainer.className="chart-container";licensingContainer.innerHTML=`
    <h3>Licensing Model Comparison</h3>
    <div class="chart-wrapper" id="licensing-comparison-chart"></div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
          <i class="fas fa-tags"></i>
        </div>
        <h4>Portnox: Simple Per-Device Pricing</h4>
        <p>Predictable per-device pricing with volume discounts. No hidden costs, hardware, or complex tiers.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
          <i class="fas fa-layer-group"></i>
        </div>
        <h4>Cisco ISE: Complex Tier-Based Licensing</h4>
        <p>Complex tier-based licensing with base, plus, and apex tiers. Requires additional licenses for advanced features.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
          <i class="fas fa-cubes"></i>
        </div>
        <h4>Forescout: Appliance + Licenses Model</h4>
        <p>Hardware appliance purchases plus per-device licenses. Separate licenses for different modules and features.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #f7931e, #c97916);">
          <i class="fas fa-calculator"></i>
        </div>
        <h4>TCO Impact of Licensing Models</h4>
        <p>Complex licensing models lead to 35-60% higher total cost over 3 years due to unanticipated fees and add-ons.</p>
      </div>
    </div>
  `;comparisonPanel.appendChild(licensingContainer);if(window.ApexCharts){createLicensingComparisonChart()}else{console.warn("ApexCharts not available, cannot create licensing comparison chart")}const hardwareContainer=document.createElement("div");hardwareContainer.className="chart-container";hardwareContainer.innerHTML=`
    <h3>Hardware Requirements & Costs</h3>
    <div class="chart-wrapper" id="hardware-comparison-chart"></div>
    <div class="benefits-grid">
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #1a5a96, #0d4275);">
          <i class="fas fa-cloud"></i>
        </div>
        <h4>Portnox: Zero Hardware</h4>
        <p>100% cloud-native solution with no hardware requirements, eliminating capital expenses and maintenance costs.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #00bceb, #0078d4);">
          <i class="fas fa-server"></i>
        </div>
        <h4>Cisco ISE: Multiple Servers</h4>
        <p>Requires minimum of 2-3 physical or virtual servers for basic deployment, plus database servers for larger deployments.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #7a2a90, #5b1769);">
          <i class="fas fa-hdd"></i>
        </div>
        <h4>Forescout: Appliances</h4>
        <p>Requires physical or virtual appliances based on deployment size, with additional costs for high availability.</p>
      </div>
      <div class="benefit-card">
        <div class="benefit-icon" style="background: linear-gradient(135deg, #27ae60, #2ecc71);">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <h4>Total Hardware Savings</h4>
        <p>Eliminating hardware requirements saves $50,000-$150,000 in initial costs plus ongoing maintenance expenses.</p>
      </div>
    </div>
  `;comparisonPanel.appendChild(hardwareContainer);if(window.ApexCharts){createHardwareComparisonChart()}else{console.warn("ApexCharts not available, cannot create hardware comparison chart")}}function addAnalystQuotes(){const summaryPanel=document.getElementById("executive-summary");if(!summaryPanel){console.warn("Executive summary panel not found, cannot add analyst quotes");return}const quotesContainer=document.createElement("div");quotesContainer.className="chart-container";quotesContainer.innerHTML=`
    <h3>Industry Recognition & Analyst Insights</h3>
    <div class="quotes-grid">
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Portnox's cloud-native NAC approach represents a significant shift in how organizations can implement access control, reducing complexity while maintaining strong security posture."</p>
          <div class="quote-author">
            <strong>Gartner</strong>
            <span>Network Security Market Report</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Cloud-based NAC solutions like Portnox are delivering 40-60% lower TCO compared to traditional on-premises approaches while offering comparable or better security capabilities."</p>
          <div class="quote-author">
            <strong>Forrester</strong>
            <span>Zero Trust Security Implementations</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Portnox demonstrated the fastest deployment time among evaluated NAC vendors, with most customers achieving full implementation in less than 30 days compared to industry average of 90+ days."</p>
          <div class="quote-author">
            <strong>IDC</strong>
            <span>NAC Market Analysis</span>
          </div>
        </div>
      </div>
      
      <div class="quote-card">
        <div class="quote-icon">
          <i class="fas fa-quote-left"></i>
        </div>
        <div class="quote-content">
          <p>"Organizations implementing cloud-native NAC solutions report 85% reduction in IT overhead related to network security management compared to traditional approaches."</p>
          <div class="quote-author">
            <strong>EMA Research</strong>
            <span>Network Security Efficiency Study</span>
          </div>
        </div>
      </div>
    </div>
  `;const style=document.createElement("style");style.textContent=`
    .quotes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .quote-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .quote-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .quote-icon {
      color: #1a5a96;
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .quote-content p {
      font-style: italic;
      color: #333;
      margin-bottom: 15px;
    }
    
    .quote-author {
      margin-top: auto;
    }
    
    .quote-author strong {
      display: block;
      font-size: 14px;
      color: #1a5a96;
    }
    
    .quote-author span {
      font-size: 12px;
      color: #666;
    }
  `;document.head.appendChild(style);const benefitsGrid=summaryPanel.querySelector(".benefits-grid");if(benefitsGrid){benefitsGrid.after(quotesContainer)}else{summaryPanel.appendChild(quotesContainer)}}function addCaseStudies(){const roiPanel=document.getElementById("executive-roi");if(!roiPanel){console.warn("ROI panel not found, cannot add case studies");return}const caseStudiesContainer=document.createElement("div");caseStudiesContainer.className="chart-container";caseStudiesContainer.innerHTML=`
    <h3>Customer Success Stories</h3>
    <div class="case-studies-grid">
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-hospital"></i>
          </div>
          <div class="case-study-title">
            <h4>Major Healthcare Provider</h4>
            <span>12,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$420K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">4 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">285%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Portnox enabled us to achieve HIPAA compliance while drastically reducing our network security costs and complexity."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-university"></i>
          </div>
          <div class="case-study-title">
            <h4>Regional Financial Institution</h4>
            <span>5,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$280K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">3 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">340%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Replacing our legacy NAC with Portnox reduced our IT overhead by 75% while strengthening our security controls for PCI DSS compliance."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="case-study-title">
            <h4>Multi-Campus University</h4>
            <span>18,000 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$650K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">6 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">310%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"Portnox's cloud solution completely eliminated our need for appliances across 5 campuses, simplifying management and reducing costs."</p>
      </div>
      
      <div class="case-study-card">
        <div class="case-study-header">
          <div class="case-study-icon">
            <i class="fas fa-industry"></i>
          </div>
          <div class="case-study-title">
            <h4>Manufacturing Company</h4>
            <span>7,500 Endpoints</span>
          </div>
        </div>
        <div class="case-study-results">
          <div class="case-result">
            <span class="result-value">$380K</span>
            <span class="result-label">Annual Savings</span>
          </div>
          <div class="case-result">
            <span class="result-value">5 Weeks</span>
            <span class="result-label">Implementation</span>
          </div>
          <div class="case-result">
            <span class="result-value">290%</span>
            <span class="result-label">ROI</span>
          </div>
        </div>
        <p class="case-study-quote">"The rapid deployment and low maintenance requirements of Portnox allowed us to reallocate IT staff to more strategic initiatives."</p>
      </div>
    </div>
  `;const style=document.createElement("style");style.textContent=`
    .case-studies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .case-study-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .case-study-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
    
    .case-study-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .case-study-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a5a96, #0d4275);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      margin-right: 10px;
    }
    
    .case-study-title h4 {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    
    .case-study-title span {
      font-size: 12px;
      color: #666;
    }
    
    .case-study-results {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      background: rgba(26, 90, 150, 0.05);
      border-radius: 8px;
      padding: 10px;
    }
    
    .case-result {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .result-value {
      font-size: 18px;
      font-weight: 700;
      color: #1a5a96;
    }
    
    .result-label {
      font-size: 11px;
      color: #666;
    }
    
    .case-study-quote {
      font-style: italic;
      color: #333;
      margin-top: 10px;
      font-size: 13px;
      position: relative;
      padding-left: 15px;
      border-left: 3px solid #1a5a96;
      margin-left: 0;
      margin-bottom: 0;
    }
  `;document.head.appendChild(style);roiPanel.appendChild(caseStudiesContainer)}function createFteComparisonChart(){if(!window.ApexCharts)return;const options={series:[{name:"IT FTE Required",data:[.25,.5,2,1.5,1]}],chart:{type:"bar",height:350,toolbar:{show:true,tools:{download:true,selection:false,zoom:false,zoomin:false,zoomout:false,pan:false,reset:false}}},plotOptions:{bar:{horizontal:true,dataLabels:{position:"top"},barHeight:"70%",borderRadius:4}},dataLabels:{enabled:true,offsetX:5,style:{fontSize:"12px",colors:["#fff"]},formatter:function(val){return val+" FTE"}},stroke:{width:1,colors:["#fff"]},xaxis:{categories:["Portnox Cloud","Foxpass","Cisco ISE","Forescout","Aruba ClearPass"],labels:{style:{fontSize:"12px"}},title:{text:"Full-Time IT Staff Required",style:{fontSize:"14px",fontWeight:500}}},colors:["#1a5a96","#2ecc71","#f39c12","#e74c3c","#9b59b6"],title:{text:"IT Staff Requirements by Vendor",align:"center",style:{fontSize:"18px",fontWeight:600}},tooltip:{y:{formatter:function(val){return val+" FTE"}},custom:function({series,seriesIndex,dataPointIndex,w}){const fte=series[seriesIndex][dataPointIndex];const vendor=w.globals.labels[dataPointIndex];const annualCost=fte*1e5;let description="";switch(dataPointIndex){case 0:description="Minimal IT overhead due to cloud-native architecture and automated management";break;case 1:description="Lower maintenance but still requires dedicated IT attention";break;case 2:description="Significant IT resources needed for complex maintenance and updates";break;case 3:description="High overhead for appliance management and policy configuration";break;case 4:description="Requires dedicated staff for ongoing management";break}return`
          <div class="custom-tooltip">
            <div class="tooltip-title">${vendor}</div>
            <div class="tooltip-value">${fte} FTE</div>
            <div>Approx. Annual Cost: $${Math.round(annualCost).toLocaleString()}</div>
            <div style="font-size:11px; margin-top:5px;">${description}</div>
          </div>
        `}},annotations:{points:[{x:"Portnox Cloud",y:.25,marker:{size:6,fillColor:"#2ecc71",strokeColor:"#fff",strokeWidth:2},label:{text:"Lowest",borderColor:"#2ecc71",style:{background:"#2ecc71",color:"#fff",fontSize:"12px",fontWeight:600},offsetY:-15}},{x:"Cisco ISE",y:2,marker:{size:6,fillColor:"#e74c3c",strokeColor:"#fff",strokeWidth:2},label:{text:"Highest",borderColor:"#e74c3c",style:{background:"#e74c3c",color:"#fff",fontSize:"12px",fontWeight:600},offsetY:-15}}]}};const chart=new ApexCharts(document.getElementById("fte-comparison-chart"),options);chart.render()}function createMultiYearProjectionChart(){if(!window.ApexCharts)return;const options={series:[{name:"Portnox Cloud",data:[81666,163332,245e3]},{name:"Cisco ISE",data:[231e3,462e3,52e4]},{name:"Forescout",data:[186e3,372e3,43e4]}],chart:{type:"line",height:350,dropShadow:{enabled:true,color:"#000",top:18,left:7,blur:10,opacity:.1},toolbar:{show:true,tools:{download:true}}},colors:["#1a5a96","#00bceb","#7a2a90"],stroke:{curve:"smooth",width:3},markers:{size:5,hover:{size:7}},xaxis:{categories:["Year 1","Year 2","Year 3"],title:{text:"Projection Timeline",style:{fontSize:"14px",fontWeight:500}}},yaxis:{title:{text:"Cumulative Cost ($)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}}},legend:{position:"top",horizontalAlign:"right",offsetY:-30},tooltip:{y:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}}},title:{text:"3-Year Cumulative Cost Projection",align:"center",style:{fontSize:"18px",fontWeight:600}},annotations:{points:[{x:"Year 3",y:245e3,marker:{size:6,fillColor:"#2ecc71",strokeColor:"#fff",strokeWidth:2},label:{text:"Best Value",borderColor:"#2ecc71",style:{background:"#2ecc71",color:"#fff",fontSize:"12px",fontWeight:600},offsetY:-15}}]}};const chart=new ApexCharts(document.getElementById("multi-year-chart"),options);chart.render()}function createLicensingComparisonChart(){if(!window.ApexCharts)return;const options={series:[{name:"Annual Licensing Cost per 1000 Devices",data:[36e3,85e3,65e3]}],chart:{type:"bar",height:350,toolbar:{show:true,tools:{download:true}}},plotOptions:{bar:{columnWidth:"60%",borderRadius:4}},colors:["#1a5a96","#00bceb","#7a2a90"],dataLabels:{enabled:true,formatter:function(val){return"$"+Math.round(val).toLocaleString()},style:{fontSize:"12px"}},xaxis:{categories:["Portnox Cloud","Cisco ISE","Forescout"],labels:{style:{fontSize:"12px"}}},yaxis:{title:{text:"Annual Licensing Cost ($)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}}},title:{text:"Annual Licensing Cost Comparison (1000 Devices)",align:"center",style:{fontSize:"18px",fontWeight:600}},tooltip:{y:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}},custom:function({series,seriesIndex,dataPointIndex,w}){const cost=series[seriesIndex][dataPointIndex];const vendor=w.globals.labels[dataPointIndex];let description="";switch(dataPointIndex){case 0:description="Simple per-device pricing with volume discounts. No tiers or hidden costs.";break;case 1:description="Complex tier-based licensing with base, plus, and apex options. Requires add-ons for full functionality.";break;case 2:description="Core license plus separate modules for different functions. Requires additional licenses for advanced features.";break}return`
          <div class="custom-tooltip">
            <div class="tooltip-title">${vendor}</div>
            <div class="tooltip-value">$${Math.round(cost).toLocaleString()}</div>
            <div style="font-size:11px; margin-top:5px;">${description}</div>
          </div>
        `}},annotations:{points:[{x:"Portnox Cloud",y:36e3,marker:{size:6,fillColor:"#2ecc71",strokeColor:"#fff",strokeWidth:2},label:{text:"Best Value",borderColor:"#2ecc71",style:{background:"#2ecc71",color:"#fff",fontSize:"12px",fontWeight:600},offsetY:-15}}]}};const chart=new ApexCharts(document.getElementById("licensing-comparison-chart"),options);chart.render()}function createHardwareComparisonChart(){if(!window.ApexCharts)return;const options={series:[{name:"Hardware Costs",data:[0,12e4,85e3]},{name:"3-Year Maintenance",data:[0,36e3,25500]}],chart:{type:"bar",height:350,stacked:true,toolbar:{show:true,tools:{download:true}}},plotOptions:{bar:{horizontal:false,columnWidth:"60%",borderRadius:4}},dataLabels:{enabled:false},stroke:{width:1,colors:["#fff"]},colors:["#1a5a96","#2ecc71"],xaxis:{categories:["Portnox Cloud","Cisco ISE","Forescout"],labels:{style:{fontSize:"12px"}}},yaxis:{title:{text:"Cost ($)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}}},fill:{opacity:1},legend:{position:"top",horizontalAlign:"center"},title:{text:"Hardware Costs & 3-Year Maintenance",align:"center",style:{fontSize:"18px",fontWeight:600}},tooltip:{y:{formatter:function(val){return"$"+Math.round(val).toLocaleString()}}},annotations:{points:[{x:"Portnox Cloud",y:0,marker:{size:6,fillColor:"#2ecc71",strokeColor:"#fff",strokeWidth:2},label:{text:"Zero Hardware",borderColor:"#2ecc71",style:{background:"#2ecc71",color:"#fff",fontSize:"12px",fontWeight:600},offsetY:-15}}]}};const chart=new ApexCharts(document.getElementById("hardware-comparison-chart"),options);chart.render()}