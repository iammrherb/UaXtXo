window.securityViewInitialized=false;function initSecurityView(){console.log("Initializing Security & Compliance View...");const securityView=document.querySelector('.view-panel[data-view="security"]');if(!securityView){console.error(" Container not found for view: security");return false}initSecurityTabs(securityView);initSecurityDashboard();document.addEventListener("viewChanged",function(e){if(e.detail.view==="security"){refreshSecurityCharts("security-overview")}});window.securityViewInitialized=true;console.log("Security View successfully initialized");return true}function initSecurityTabs(securityView){const tabs=securityView.querySelectorAll(".results-tab");const panels=securityView.querySelectorAll(".results-panel");tabs.forEach(tab=>{tab.addEventListener("click",function(){const panelId=this.getAttribute("data-panel");tabs.forEach(t=>t.classList.remove("active"));panels.forEach(p=>p.classList.remove("active"));this.classList.add("active");const panel=document.getElementById(panelId);if(panel){panel.classList.add("active");refreshSecurityCharts(panelId)}})})}function initSecurityDashboard(){const dashboardGrids=document.querySelectorAll('.view-panel[data-view="security"] .dashboard-grid');if(!dashboardGrids.length){console.error("Security dashboard grids not found");return}const securityOverviewGrid=dashboardGrids[0];if(securityOverviewGrid){securityOverviewGrid.innerHTML=`
            <div class="dashboard-card highlight-card">
                <h3>Overall Security Improvement</h3>
                <div class="metric-value highlight-value" id="security-improvement">85%</div>
                <div class="metric-label">Risk reduction with Portnox NAC</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 35% better than competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage reduction in security incidents after implementing NAC solution">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Zero Trust Coverage</h3>
                <div class="metric-value" id="zero-trust-score">92%</div>
                <div class="metric-label">Zero Trust principles implementation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage coverage of NIST SP 800-207 Zero Trust Architecture principles">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Device Authentication</h3>
                <div class="metric-value" id="device-auth-score">95%</div>
                <div class="metric-label">Robust device identification</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 20% above Forescout
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of devices successfully authenticated with multi-factor validation">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Response Time</h3>
                <div class="metric-value" id="response-time">5m</div>
                <div class="metric-label">Avg. time to isolate threats</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 3x faster than Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Average time to detect and isolate a compromised device from the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `}const complianceGrid=document.getElementById("compliance-frameworks")?.querySelector(".dashboard-grid");if(complianceGrid){complianceGrid.innerHTML=`
            <div class="dashboard-card highlight-card">
                <h3>Overall Compliance Coverage</h3>
                <div class="metric-value highlight-value" id="compliance-coverage">95%</div>
                <div class="metric-label">Average framework coverage</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of compliance requirements addressed by Portnox across frameworks">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Automated Reporting</h3>
                <div class="metric-value" id="automated-reporting">85%</div>
                <div class="metric-label">Compliance evidence automation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 40% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of compliance reports that can be generated automatically">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Audit Time Reduction</h3>
                <div class="metric-value" id="audit-reduction">65%</div>
                <div class="metric-label">Time saved in compliance audits</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 30% above Forescout
                </div>
                <div class="metric-help-tip" data-tooltip="Average time reduction in compliance audits compared to manual processes">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Compliance Frameworks</h3>
                <div class="metric-value" id="framework-count">7+</div>
                <div class="metric-label">Major frameworks supported</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> Comprehensive coverage
                </div>
                <div class="metric-help-tip" data-tooltip="Number of major compliance frameworks with built-in support (HIPAA, PCI DSS, GDPR, etc.)">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `}const threatGrid=document.getElementById("threat-analysis")?.querySelector(".dashboard-grid");if(threatGrid){threatGrid.innerHTML=`
            <div class="dashboard-card highlight-card">
                <h3>Overall Threat Reduction</h3>
                <div class="metric-value highlight-value" id="threat-reduction">85%</div>
                <div class="metric-label">Reduction in vulnerability exposure</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 25% above Cisco ISE
                </div>
                <div class="metric-help-tip" data-tooltip="Overall reduction in network security incidents after implementation">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Unauthorized Access Prevention</h3>
                <div class="metric-value" id="unauthorized-prevention">95%</div>
                <div class="metric-label">Block rate of unauthorized access</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 15% above Aruba ClearPass
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of unauthorized access attempts successfully blocked">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Lateral Movement Reduction</h3>
                <div class="metric-value" id="lateral-reduction">90%</div>
                <div class="metric-label">Prevention of threat propagation</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 20% above competitors
                </div>
                <div class="metric-help-tip" data-tooltip="Reduction in ability of threats to move laterally within the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Shadow IT Elimination</h3>
                <div class="metric-value" id="shadow-it">95%</div>
                <div class="metric-label">Detection of unauthorized devices</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> 25% above FortiNAC
                </div>
                <div class="metric-help-tip" data-tooltip="Percentage of unauthorized devices detected on the network">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `}const industryGrid=document.getElementById("industry-impact")?.querySelector(".dashboard-grid");if(industryGrid){industryGrid.innerHTML=`
            <div class="dashboard-card highlight-card">
                <h3>Average Breach Cost</h3>
                <div class="metric-value highlight-value" id="avg-breach-cost">$4.35M</div>
                <div class="metric-label">Average data breach cost in 2025</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> 12% increase from 2024
                </div>
                <div class="metric-help-tip" data-tooltip="Global average cost of a data breach according to IBM Security/Ponemon Institute">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Healthcare Breach Cost</h3>
                <div class="metric-value" id="healthcare-breach-cost">$9.23M</div>
                <div class="metric-label">Highest industry breach costs</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> 18% increase from 2024
                </div>
                <div class="metric-help-tip" data-tooltip="Average cost of a data breach in the healthcare industry">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Cost Reduction with NAC</h3>
                <div class="metric-value positive" id="cost-reduction">42%</div>
                <div class="metric-label">Reduction in breach impact</div>
                <div class="metric-trend up">
                    <i class="fas fa-arrow-up"></i> $1.8M average savings
                </div>
                <div class="metric-help-tip" data-tooltip="Average reduction in breach costs when NAC solutions are deployed">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
            
            <div class="dashboard-card">
                <h3>Mean Time to Identify</h3>
                <div class="metric-value" id="mtti-value">287</div>
                <div class="metric-label">Industry avg. days to ID breach</div>
                <div class="metric-trend down negative">
                    <i class="fas fa-arrow-up"></i> Too slow for modern threats
                </div>
                <div class="metric-help-tip" data-tooltip="Average time to identify a data breach across industries">
                    <i class="fas fa-info-circle"></i>
                </div>
            </div>
        `}initializeHelpTips()}function initializeHelpTips(){const helpTips=document.querySelectorAll(".metric-help-tip");helpTips.forEach(tip=>{const tooltip=tip.getAttribute("data-tooltip");if(tooltip){tip.setAttribute("title",tooltip);tip.addEventListener("mouseenter",function(){})}})}function refreshSecurityCharts(panelId){console.log(`Refreshing security charts for panel: ${panelId}`);switch(panelId){case"security-overview":createNistFrameworkChart();createBreachImpactChart();break;case"compliance-frameworks":createSecurityFrameworksChart();break;case"threat-analysis":createThreatModelChart();break;case"industry-impact":createIndustryBreachChart();createInsuranceImpactChart();break}}function createNistFrameworkChart(){const chartContainer=document.getElementById("nist-framework-chart");if(!chartContainer)return;chartContainer.innerHTML="";const vendorData=[{vendor:"Portnox",identify:95,protect:90,detect:95,respond:85,recover:80,color:"#1a5a96",logoUrl:"img/vendors/portnox-icon.png"},{vendor:"Cisco ISE",identify:85,protect:80,detect:85,respond:75,recover:70,color:"#00bceb",logoUrl:"img/vendors/cisco-icon.png"},{vendor:"Forescout",identify:80,protect:85,detect:90,respond:70,recover:65,color:"#6f2c91",logoUrl:"img/vendors/forescout-icon.png"},{vendor:"Aruba",identify:75,protect:80,detect:80,respond:75,recover:70,color:"#f58220",logoUrl:"img/vendors/aruba-icon.png"}];if(window.ApexCharts){const options={series:vendorData.map(d=>({name:d.vendor,data:[d.identify,d.protect,d.detect,d.respond,d.recover]})),chart:{height:400,type:"radar",dropShadow:{enabled:true,blur:1,left:1,top:1},animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true,selection:false,zoom:false,zoomin:false,zoomout:false,pan:false,reset:false}}},stroke:{width:3},fill:{opacity:.2},markers:{size:5,hover:{size:8}},xaxis:{categories:["Identify","Protect","Detect","Respond","Recover"],labels:{style:{fontSize:"14px",fontWeight:600}}},yaxis:{max:100,tickAmount:5,labels:{formatter:function(val){return val+"%"}}},colors:vendorData.map(d=>d.color),tooltip:{y:{formatter:function(val){return val+"%"}}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:600,markers:{width:16,height:16,radius:0}},annotations:{points:[{x:"Identify",y:95,marker:{size:8,fillColor:"#1a5a96",strokeColor:"#fff",strokeWidth:2},label:{borderColor:"#1a5a96",style:{color:"#fff",background:"#1a5a96"},text:"Best"}}]}};const chart=new ApexCharts(chartContainer,options);chart.render();setTimeout(()=>{const legendItems=chartContainer.querySelectorAll(".apexcharts-legend-series");vendorData.forEach((vendor,i)=>{if(legendItems[i]&&vendor.logoUrl){const logoImg=document.createElement("img");logoImg.src=vendor.logoUrl;logoImg.style.width="16px";logoImg.style.height="16px";logoImg.style.marginRight="5px";logoImg.style.verticalAlign="middle";const textEl=legendItems[i].querySelector(".apexcharts-legend-text");if(textEl){textEl.parentNode.insertBefore(logoImg,textEl)}}})},500)}else if(window.d3){console.log("Implementing D3 radar chart for NIST Framework")}else{chartContainer.innerHTML=`
            <div class="chart-fallback">
                <h4>NIST Cybersecurity Framework Coverage</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Identify</th>
                            <th>Protect</th>
                            <th>Detect</th>
                            <th>Respond</th>
                            <th>Recover</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendorData.map(d=>`
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.identify}%</td>
                                <td>${d.protect}%</td>
                                <td>${d.detect}%</td>
                                <td>${d.respond}%</td>
                                <td>${d.recover}%</td>
                                <td>${Math.round((d.identify+d.protect+d.detect+d.respond+d.recover)/5)}%</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}}function createBreachImpactChart(){const chartContainer=document.getElementById("breach-impact-chart");if(!chartContainer)return;chartContainer.innerHTML="";const reductionData=[{vendor:"Portnox",reduction:42,savings:1.83,color:"#1a5a96"},{vendor:"Cisco ISE",reduction:28,savings:1.22,color:"#00bceb"},{vendor:"Forescout",reduction:31,savings:1.35,color:"#6f2c91"},{vendor:"Aruba",reduction:25,savings:1.09,color:"#f58220"}];if(window.ApexCharts){const options={series:[{name:"Cost Reduction %",type:"column",data:reductionData.map(d=>d.reduction)},{name:"Savings ($M)",type:"line",data:reductionData.map(d=>d.savings)}],chart:{height:400,type:"line",animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true}}},stroke:{width:[0,4]},dataLabels:{enabled:true,enabledOnSeries:[1],formatter:function(val,{seriesIndex}){if(seriesIndex===1)return"$"+val+"M";return val+"%"}},labels:reductionData.map(d=>d.vendor),colors:["#1a5a96","#2ecc71"],xaxis:{type:"category",labels:{style:{fontSize:"12px",fontWeight:500}}},yaxis:[{title:{text:"Cost Reduction %",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return val+"%"}}},{opposite:true,title:{text:"Savings ($M)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+val+"M"}}}],tooltip:{y:{formatter:function(val,{seriesIndex}){if(seriesIndex===0)return val+"%";return"$"+val+"M"}}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:500},fill:{opacity:[.85,1],gradient:{inverseColors:false,shade:"light",type:"vertical",opacityFrom:.85,opacityTo:.55}},annotations:{points:[{x:"Portnox",y:42,marker:{size:8,fillColor:"#fff",strokeColor:"#1a5a96",strokeWidth:2},label:{borderColor:"#1a5a96",style:{color:"#fff",background:"#1a5a96"},text:"Best"}}]}};const chart=new ApexCharts(chartContainer,options);chart.render()}else{chartContainer.innerHTML=`
            <div class="chart-fallback">
                <h4>Data Breach Cost Impact</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Cost Reduction %</th>
                            <th>Savings ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${reductionData.map(d=>`
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.reduction}%</td>
                                <td>$${d.savings}M</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}}function createSecurityFrameworksChart(){const chartContainer=document.getElementById("security-frameworks-chart");if(!chartContainer)return;chartContainer.innerHTML="";const frameworkData=[{framework:"HIPAA",portnox:95,cisco:80,forescout:85,aruba:75},{framework:"PCI DSS",portnox:90,cisco:85,forescout:80,aruba:80},{framework:"GDPR",portnox:95,cisco:75,forescout:70,aruba:70},{framework:"NIST CSF",portnox:90,cisco:75,forescout:80,aruba:75},{framework:"ISO 27001",portnox:95,cisco:80,forescout:75,aruba:70},{framework:"CMMC",portnox:85,cisco:70,forescout:65,aruba:65},{framework:"SOC 2",portnox:90,cisco:75,forescout:80,aruba:70}];if(window.ApexCharts){const options={series:[{name:"Portnox",data:frameworkData.map(d=>d.portnox),color:"#1a5a96"},{name:"Cisco ISE",data:frameworkData.map(d=>d.cisco),color:"#00bceb"},{name:"Forescout",data:frameworkData.map(d=>d.forescout),color:"#6f2c91"},{name:"Aruba",data:frameworkData.map(d=>d.aruba),color:"#f58220"}],chart:{type:"bar",height:450,stacked:false,animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true}}},plotOptions:{bar:{horizontal:true,borderRadius:6,dataLabels:{position:"top"}}},dataLabels:{enabled:true,formatter:function(val){return val+"%"},offsetX:15,style:{fontSize:"12px",colors:["#fff"]}},stroke:{width:1,colors:["#fff"]},xaxis:{categories:frameworkData.map(d=>d.framework),labels:{style:{fontSize:"12px",fontWeight:500}},title:{text:"Compliance Coverage (%)",style:{fontSize:"14px",fontWeight:500}}},yaxis:{title:{text:"Framework",style:{fontSize:"14px",fontWeight:500}},labels:{style:{fontSize:"12px"}}},tooltip:{y:{formatter:function(val){return val+"%"}}},fill:{opacity:.9,type:"gradient",gradient:{shade:"light",type:"horizontal",shadeIntensity:.15,inverseColors:false,opacityFrom:1,opacityTo:.85}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:500}};const chart=new ApexCharts(chartContainer,options);chart.render()}else{chartContainer.innerHTML=`
            <div class="chart-fallback">
                <h4>Compliance Framework Coverage</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Framework</th>
                            <th>Portnox</th>
                            <th>Cisco ISE</th>
                            <th>Forescout</th>
                            <th>Aruba</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${frameworkData.map(d=>`
                            <tr>
                                <td>${d.framework}</td>
                                <td>${d.portnox}%</td>
                                <td>${d.cisco}%</td>
                                <td>${d.forescout}%</td>
                                <td>${d.aruba}%</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}}function createThreatModelChart(){const chartContainer=document.getElementById("threat-model-chart");if(!chartContainer)return;chartContainer.innerHTML="";const threatData=[{category:"Unauthorized Access",threats:[{name:"Credential Theft",portnox:95,cisco:80,forescout:85},{name:"Brute Force Attacks",portnox:90,cisco:85,forescout:80},{name:"Social Engineering",portnox:85,cisco:70,forescout:75}]},{category:"Malware Protection",threats:[{name:"Zero-Day Exploits",portnox:85,cisco:75,forescout:70},{name:"Ransomware",portnox:90,cisco:80,forescout:85},{name:"Fileless Malware",portnox:80,cisco:70,forescout:65}]},{category:"Network Threats",threats:[{name:"Lateral Movement",portnox:90,cisco:80,forescout:85},{name:"Man-in-the-Middle",portnox:85,cisco:75,forescout:80},{name:"DDoS Attacks",portnox:80,cisco:85,forescout:75}]},{category:"Device Vulnerabilities",threats:[{name:"Unpatched Systems",portnox:95,cisco:70,forescout:85},{name:"IoT Vulnerabilities",portnox:90,cisco:65,forescout:80},{name:"BYOD Risks",portnox:95,cisco:75,forescout:70}]}];if(window.ApexCharts){const threatCategories=[];const portnoxData=[];const ciscoData=[];const forescoutData=[];threatData.forEach(category=>{category.threats.forEach(threat=>{threatCategories.push(`${category.category}: ${threat.name}`);portnoxData.push(threat.portnox);ciscoData.push(threat.cisco);forescoutData.push(threat.forescout)})});const options={series:[{name:"Portnox",data:portnoxData},{name:"Cisco ISE",data:ciscoData},{name:"Forescout",data:forescoutData}],chart:{height:650,type:"heatmap",animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true}}},dataLabels:{enabled:true,style:{fontSize:"12px"},formatter:function(val){return val+"%"}},colors:["#1a5a96","#00bceb","#6f2c91"],title:{text:"Threat Protection Capabilities by Vendor",align:"center",style:{fontSize:"18px",fontWeight:600}},plotOptions:{heatmap:{enableShades:true,shadeIntensity:.5,colorScale:{ranges:[{from:0,to:50,color:"#F27272",name:"Poor"},{from:51,to:75,color:"#F2C572",name:"Average"},{from:76,to:85,color:"#8AE88A",name:"Good"},{from:86,to:100,color:"#2ECC71",name:"Excellent"}]}}},xaxis:{type:"category",categories:threatCategories,labels:{style:{fontSize:"10px",fontWeight:500},maxHeight:150,hideOverlappingLabels:false,rotate:-45}},yaxis:{labels:{style:{fontSize:"12px",fontWeight:500}}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:500}};const chart=new ApexCharts(chartContainer,options);chart.render()}else{let fallbackHtml=`
            <div class="chart-fallback">
                <h4>Threat Protection Capabilities</h4>
        `;threatData.forEach(category=>{fallbackHtml+=`
                <h5>${category.category}</h5>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Threat</th>
                            <th>Portnox</th>
                            <th>Cisco ISE</th>
                            <th>Forescout</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${category.threats.map(threat=>`
                            <tr>
                                <td>${threat.name}</td>
                                <td>${threat.portnox}%</td>
                                <td>${threat.cisco}%</td>
                                <td>${threat.forescout}%</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <br>
            `});fallbackHtml+=`</div>`;chartContainer.innerHTML=fallbackHtml}}function createIndustryBreachChart(){const chartContainer=document.getElementById("industry-breach-chart");if(!chartContainer)return;chartContainer.innerHTML="";const industryData=[{industry:"Healthcare",cost:9.23,reduction:4.23},{industry:"Financial",cost:5.97,reduction:2.63},{industry:"Technology",cost:5.35,reduction:2.41},{industry:"Energy",cost:4.72,reduction:2.03},{industry:"Retail",cost:3.28,reduction:1.38},{industry:"Education",cost:3.86,reduction:1.7},{industry:"Manufacturing",cost:4.47,reduction:1.92}];if(window.ApexCharts){const options={series:[{name:"Average Breach Cost",data:industryData.map(d=>d.cost),color:"#e74c3c"},{name:"Cost with Portnox",data:industryData.map(d=>d.cost-d.reduction),color:"#2ecc71"}],chart:{type:"bar",height:450,stacked:false,animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true}}},plotOptions:{bar:{horizontal:false,columnWidth:"70%",borderRadius:6,dataLabels:{position:"top"}}},dataLabels:{enabled:true,formatter:function(val){return"$"+val+"M"},offsetY:-20,style:{fontSize:"12px",colors:["#333"]}},stroke:{width:1,colors:["#fff"]},xaxis:{categories:industryData.map(d=>d.industry),labels:{style:{fontSize:"12px",fontWeight:500}},title:{text:"Industry",style:{fontSize:"14px",fontWeight:500}}},yaxis:{title:{text:"Average Cost ($ Millions)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+val+"M"},style:{fontSize:"12px"}}},tooltip:{y:{formatter:function(val){return"$"+val+"M"}}},fill:{opacity:.9,type:"gradient",gradient:{shade:"light",type:"vertical",shadeIntensity:.15,inverseColors:false,opacityFrom:1,opacityTo:.85}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:500},annotations:{yaxis:[{y:0,strokeDashArray:0,borderColor:"#000",fillColor:"#fff",opacity:.3,offsetX:0,offsetY:0}]}};const chart=new ApexCharts(chartContainer,options);chart.render()}else{chartContainer.innerHTML=`
            <div class="chart-fallback">
                <h4>Data Breach Costs by Industry</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Industry</th>
                            <th>Average Breach Cost ($M)</th>
                            <th>Cost with Portnox ($M)</th>
                            <th>Savings ($M)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${industryData.map(d=>`
                            <tr>
                                <td>${d.industry}</td>
                                <td>$${d.cost}M</td>
                                <td>$${(d.cost-d.reduction).toFixed(2)}M</td>
                                <td>$${d.reduction}M</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}}function createInsuranceImpactChart(){const chartContainer=document.getElementById("insurance-impact-chart");if(!chartContainer)return;chartContainer.innerHTML="";const insuranceData=[{vendor:"Portnox",reduction:25,annual:8e4,comparison:100},{vendor:"Cisco ISE",reduction:18,annual:57600,comparison:72},{vendor:"Forescout",reduction:20,annual:64e3,comparison:80},{vendor:"Aruba",reduction:15,annual:48e3,comparison:60}];if(window.ApexCharts){const options={series:[{name:"Premium Reduction",data:insuranceData.map(d=>d.reduction)},{name:"Annual Savings",data:insuranceData.map(d=>d.annual/1e3)}],chart:{type:"bar",height:400,animations:{enabled:true,easing:"easeinout",speed:800},toolbar:{show:true,tools:{download:true}}},plotOptions:{bar:{horizontal:false,columnWidth:"55%",borderRadius:5,dataLabels:{position:"top"}}},colors:["#1a5a96","#2ecc71"],dataLabels:{enabled:true,formatter:function(val,{seriesIndex,dataPointIndex,w}){if(seriesIndex===0)return val+"%";return"$"+val+"k"},offsetY:-20,style:{fontSize:"12px",colors:["#333"]}},stroke:{show:true,width:2,colors:["transparent"]},xaxis:{categories:insuranceData.map(d=>d.vendor),labels:{style:{fontSize:"12px",fontWeight:500}}},yaxis:[{title:{text:"Premium Reduction (%)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return val+"%"}}},{opposite:true,title:{text:"Annual Savings ($K)",style:{fontSize:"14px",fontWeight:500}},labels:{formatter:function(val){return"$"+val+"k"}}}],tooltip:{y:{formatter:function(val,{seriesIndex}){if(seriesIndex===0)return val+"%";return"$"+val+",000"}}},fill:{opacity:.85,type:"gradient",gradient:{shade:"light",type:"vertical",shadeIntensity:.2,inverseColors:false,opacityFrom:1,opacityTo:.9}},legend:{position:"top",horizontalAlign:"right",offsetY:-10,fontWeight:500},annotations:{points:[{x:"Portnox",y:25,marker:{size:8,fillColor:"#fff",strokeColor:"#1a5a96",strokeWidth:2},label:{borderColor:"#1a5a96",style:{color:"#fff",background:"#1a5a96"},text:"Best"}}]}};const chart=new ApexCharts(chartContainer,options);chart.render()}else{chartContainer.innerHTML=`
            <div class="chart-fallback">
                <h4>Cyber Insurance Premium Reduction</h4>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Premium Reduction</th>
                            <th>Annual Savings</th>
                            <th>Comparison</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${insuranceData.map(d=>`
                            <tr>
                                <td>${d.vendor}</td>
                                <td>${d.reduction}%</td>
                                <td>$${d.annual.toLocaleString()}</td>
                                <td>${d.comparison}%</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `}}function updateSecurityView(data){console.log("Updating Security View with data");if(!window.securityViewInitialized){console.error(" Security View not initialized");if(!initSecurityView()){return false}}updateSecurityMetrics(data);const activePanel=document.querySelector('.view-panel[data-view="security"] .results-panel.active');if(activePanel){refreshSecurityCharts(activePanel.id)}else{refreshSecurityCharts("security-overview")}return true}function updateSecurityMetrics(data){if(!data||!data.security)return;const updateMetric=(id,value,format=null)=>{const element=document.getElementById(id);if(element){element.textContent=format?format(value):value}};const percentFormat=val=>`${Math.round(val)}%`;const moneyFormat=val=>`$${val.toLocaleString()}`;const timeFormat=val=>`${val}m`;const securityData=data.security.portnox||{};if(securityData.improvements){updateMetric("security-improvement",securityData.improvements.overall,percentFormat);updateMetric("zero-trust-score",securityData.securityScores?.zeroTrust,percentFormat);updateMetric("device-auth-score",securityData.securityScores?.deviceAuth,percentFormat);updateMetric("response-time",securityData.securityScores?.remediationSpeed,timeFormat)}if(securityData.compliance){updateMetric("compliance-coverage",securityData.compliance.coverage,percentFormat);updateMetric("automated-reporting",securityData.compliance.automationLevel,percentFormat);updateMetric("audit-reduction",securityData.compliance.auditTimeReduction,percentFormat);updateMetric("framework-count",securityData.compliance.frameworks)}if(securityData.threatReduction){updateMetric("threat-reduction",securityData.improvements?.overall,percentFormat);updateMetric("unauthorized-prevention",securityData.threatReduction.unauthorizedAccess,percentFormat);updateMetric("lateral-reduction",securityData.threatReduction.lateralMovement,percentFormat);updateMetric("shadow-it",securityData.threatReduction.shadowIt,percentFormat)}updateMetric("avg-breach-cost",4.35,val=>`$${val}M`);updateMetric("healthcare-breach-cost",9.23,val=>`$${val}M`);updateMetric("cost-reduction",42,percentFormat);updateMetric("mtti-value",287)}function createSecurityCSS(){console.log("Creating security-specific CSS...");const css=`
    /* Security View Styles */
    .view-panel[data-view="security"] .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .view-panel[data-view="security"] .dashboard-card {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .view-panel[data-view="security"] .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .view-panel[data-view="security"] .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(to right, #1a5a96, #53a8e2);
        opacity: 0.8;
    }
    
    .view-panel[data-view="security"] .dashboard-card.highlight-card::before {
        height: 6px;
        background: linear-gradient(to right, #1a5a96, #27ae60);
    }
    
    .view-panel[data-view="security"] .dashboard-card h3 {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 15px;
    }
    
    .view-panel[data-view="security"] .metric-value {
        font-size: 32px;
        font-weight: 700;
        color: #1a5a96;
        margin-bottom: 5px;
    }
    
    .view-panel[data-view="security"] .highlight-value {
        color: #27ae60;
        font-size: 36px;
    }
    
    .view-panel[data-view="security"] .metric-value.positive {
        color: #27ae60;
    }
    
    .view-panel[data-view="security"] .metric-label {
        font-size: 13px;
        color: #7f8c8d;
        margin-bottom: 10px;
    }
    
    .view-panel[data-view="security"] .metric-trend {
        font-size: 13px;
        font-weight: 600;
        color: #27ae60;
        display: flex;
        align-items: center;
    }
    
    .view-panel[data-view="security"] .metric-trend.down {
        color: #e74c3c;
    }
    
    .view-panel[data-view="security"] .metric-trend.negative {
        color: #e74c3c;
    }
    
    .view-panel[data-view="security"] .metric-trend i {
        margin-right: 5px;
    }
    
    .view-panel[data-view="security"] .metric-help-tip {
        position: absolute;
        top: 20px;
        right: 20px;
        color: #95a5a6;
        cursor: help;
        transition: color 0.3s ease;
    }
    
    .view-panel[data-view="security"] .metric-help-tip:hover {
        color: #1a5a96;
    }
    
    .view-panel[data-view="security"] .chart-container {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 30px;
        transition: all 0.3s ease;
    }
    
    .view-panel[data-view="security"] .chart-container:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .view-panel[data-view="security"] .chart-container h3 {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin-top: 0;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .view-panel[data-view="security"] .chart-wrapper {
        min-height: 350px;
        position: relative;
    }
    
    /* Fallback table styles for when charts can't be rendered */
    .view-panel[data-view="security"] .data-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    
    .view-panel[data-view="security"] .data-table th,
    .view-panel[data-view="security"] .data-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .view-panel[data-view="security"] .data-table th {
        background-color: #f7f9fa;
        color: #2c3e50;
        font-weight: 600;
        font-size: 14px;
    }
    
    .view-panel[data-view="security"] .data-table tr:hover {
        background-color: #f5f7fa;
    }
    
    /* Animation for dashboard cards */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .view-panel[data-view="security"] .dashboard-card {
        animation: fadeInUp 0.5s ease forwards;
        opacity: 0;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(1) {
        animation-delay: 0.1s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(3) {
        animation-delay: 0.3s;
    }
    
    .view-panel[data-view="security"] .dashboard-card:nth-child(4) {
        animation-delay: 0.4s;
    }
    
    /* Tooltip styles */
    .view-panel[data-view="security"] [data-tooltip] {
        position: relative;
    }
    
    .view-panel[data-view="security"] [data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        top: -10px;
        right: 0;
        transform: translateY(-100%);
        background: #34495e;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .view-panel[data-view="security"] [data-tooltip]:hover::after {
        opacity: 1;
        visibility: visible;
    }
    `;const styleElement=document.createElement("style");styleElement.type="text/css";styleElement.appendChild(document.createTextNode(css));document.head.appendChild(styleElement);console.log("Security CSS added")}document.addEventListener("DOMContentLoaded",function(){console.log("DOM content loaded, checking if security view needs initialization");createSecurityCSS();setTimeout(function(){if(!window.securityViewInitialized){initSecurityView()}},500)});window.securityView={init:initSecurityView,update:updateSecurityView,refreshCharts:refreshSecurityCharts};