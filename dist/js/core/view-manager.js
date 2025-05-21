class ViewManager{constructor(){this.config=window.TCAConfig||{};this.activeView={primary:"executive",secondary:"executive-summary"};this.viewContent={};this.initialized=false}init(){console.log("Initializing View Manager...");this.createTabNavigation();this.initializeViewContent();this.setupEventListeners();this.initialized=true;this.showView(this.activeView.primary,this.activeView.secondary);return this}createTabNavigation(){const primaryTabsContainer=document.getElementById("primary-tabs");if(!primaryTabsContainer){console.error("Primary tabs container not found");return}primaryTabsContainer.innerHTML="";this.config.tabs.primary.forEach(tab=>{const tabElement=document.createElement("div");tabElement.className="tab-item";tabElement.dataset.tab=tab.id;const icon=document.createElement("i");icon.className=tab.icon;tabElement.appendChild(icon);const label=document.createElement("span");label.textContent=tab.label;tabElement.appendChild(label);primaryTabsContainer.appendChild(tabElement)});const secondaryTabsContainer=document.getElementById("secondary-tabs");if(!secondaryTabsContainer){console.error("Secondary tabs container not found");return}secondaryTabsContainer.innerHTML="";Object.keys(this.config.tabs.secondary).forEach(primaryTabId=>{const secondaryTabs=this.config.tabs.secondary[primaryTabId];const tabContainer=document.createElement("div");tabContainer.className="secondary-tabs-container";tabContainer.id=`${primaryTabId}-tabs`;tabContainer.dataset.primaryTab=primaryTabId;secondaryTabs.forEach(tab=>{const tabElement=document.createElement("div");tabElement.className="tab-item";tabElement.dataset.tab=tab.id;const icon=document.createElement("i");icon.className=tab.icon;tabElement.appendChild(icon);const label=document.createElement("span");label.textContent=tab.label;tabElement.appendChild(label);tabContainer.appendChild(tabElement)});secondaryTabsContainer.appendChild(tabContainer)})}initializeViewContent(){const contentContainer=document.getElementById("main-content");if(!contentContainer){console.error("Main content container not found");return}contentContainer.innerHTML="";Object.keys(this.config.tabs.secondary).forEach(primaryTabId=>{const secondaryTabs=this.config.tabs.secondary[primaryTabId];secondaryTabs.forEach(tab=>{const viewContainer=document.createElement("div");viewContainer.className="view-container";viewContainer.id=`${tab.id}-container`;viewContainer.dataset.view=tab.id;viewContainer.innerHTML=`
          <div class="section-header">
            <h2>${tab.label}</h2>
            <div class="section-actions">
              <button class="btn btn-sm btn-primary refresh-view">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
              <button class="btn btn-sm btn-outline-primary export-view">
                <i class="fas fa-download"></i> Export
              </button>
            </div>
          </div>
          <div class="view-content" id="${tab.id}">
            <div class="loading-placeholder">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Loading ${tab.label} view...</p>
            </div>
          </div>
        `;contentContainer.appendChild(viewContainer)})})}setupEventListeners(){const primaryTabs=document.querySelectorAll("#primary-tabs .tab-item");primaryTabs.forEach(tab=>{tab.addEventListener("click",()=>{const tabId=tab.dataset.tab;const firstSecondaryTab=this.config.tabs.secondary[tabId][0].id;this.showView(tabId,firstSecondaryTab)})});const secondaryTabs=document.querySelectorAll(".secondary-tabs-container .tab-item");secondaryTabs.forEach(tab=>{tab.addEventListener("click",()=>{const tabId=tab.dataset.tab;const primaryTabId=tab.parentElement.dataset.primaryTab;this.showView(primaryTabId,tabId)})});const refreshButtons=document.querySelectorAll(".refresh-view");refreshButtons.forEach(button=>{button.addEventListener("click",()=>{const viewContainer=button.closest(".view-container");const viewId=viewContainer.dataset.view;this.refreshView(viewId)})});const exportButtons=document.querySelectorAll(".export-view");exportButtons.forEach(button=>{button.addEventListener("click",()=>{const viewContainer=button.closest(".view-container");const viewId=viewContainer.dataset.view;this.exportView(viewId)})})}showView(primaryTabId,secondaryTabId){console.log(`Showing view: ${primaryTabId} / ${secondaryTabId}`);const primaryTabs=document.querySelectorAll("#primary-tabs .tab-item");primaryTabs.forEach(tab=>{if(tab.dataset.tab===primaryTabId){tab.classList.add("active")}else{tab.classList.remove("active")}});const secondaryTabsContainers=document.querySelectorAll(".secondary-tabs-container");secondaryTabsContainers.forEach(container=>{if(container.dataset.primaryTab===primaryTabId){container.classList.add("active")}else{container.classList.remove("active")}});const secondaryTabs=document.querySelectorAll(".secondary-tabs-container .tab-item");secondaryTabs.forEach(tab=>{if(tab.dataset.tab===secondaryTabId){tab.classList.add("active")}else{tab.classList.remove("active")}});const viewContainers=document.querySelectorAll(".view-container");viewContainers.forEach(container=>{if(container.dataset.view===secondaryTabId){container.classList.add("active")}else{container.classList.remove("active")}});this.activeView={primary:primaryTabId,secondary:secondaryTabId};this.loadViewContent(secondaryTabId)}loadViewContent(viewId){if(this.viewContent[viewId]){return}console.log(`Loading content for view: ${viewId}`);const viewContainer=document.getElementById(viewId);if(!viewContainer){console.error(`View container ${viewId} not found`);return}viewContainer.innerHTML=`
      <div class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading content...</p>
      </div>
    `;switch(viewId){case"executive-summary":this.loadExecutiveSummary(viewContainer);break;case"executive-impact":this.loadExecutiveImpact(viewContainer);break;case"executive-recommendations":this.loadExecutiveRecommendations(viewContainer);break;case"financial-tco":this.loadFinancialTCO(viewContainer);break;case"financial-roi":this.loadFinancialROI(viewContainer);break;case"financial-comparison":this.loadFinancialComparison(viewContainer);break;case"security-overview":this.loadSecurityOverview(viewContainer);break;case"security-compliance":this.loadSecurityCompliance(viewContainer);break;case"security-risk":this.loadSecurityRisk(viewContainer);break;case"technical-architecture":this.loadTechnicalArchitecture(viewContainer);break;case"technical-features":this.loadTechnicalFeatures(viewContainer);break;case"technical-integrations":this.loadTechnicalIntegrations(viewContainer);break;default:console.error(`Unknown view ID: ${viewId}`);viewContainer.innerHTML=`
          <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unknown view: ${viewId}</p>
          </div>
        `;return}this.viewContent[viewId]=true}refreshView(viewId){console.log(`Refreshing view: ${viewId}`);delete this.viewContent[viewId];this.loadViewContent(viewId)}exportView(viewId){console.log(`Exporting view: ${viewId}`);alert(`Export functionality for ${viewId} is not yet implemented`)}loadExecutiveSummary(container){container.innerHTML=`
      <div class="card mb-4">
        <div class="card-body">
          <h3 class="card-title">Key Findings</h3>
          <p class="card-text">
            The Portnox Cloud NAC solution offers the lowest TCO among all compared vendors,
            with superior security capabilities and fastest deployment time.
          </p>
          <div id="executive-summary-chart" class="chart-container" style="height: 400px;"></div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">TCO Highlights</h3>
              <div id="roi-summary-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Value Drivers</h3>
              <div id="value-drivers-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;setTimeout(()=>{if(window.chartManager){window.chartManager.initExecutiveCharts({executiveSummary:[{name:"Portnox",data:[85,95,90,95,85]},{name:"Cisco",data:[60,80,75,55,70]},{name:"Other",data:[70,65,60,60,75]}],roiSummary:{labels:["Hardware Savings","Personnel Savings","Subscription","Implementation"],values:[125e3,2e5,15e4,25e3]},valueDrivers:[{driver:"Reduced Incidents",value:85},{driver:"Faster Deployment",value:90},{driver:"Lower Maintenance",value:75},{driver:"Cloud Architecture",value:95}]})}},500)}loadExecutiveImpact(container){container.innerHTML=`
      <div class="card mb-4">
        <div class="card-body">
          <h3 class="card-title">Business Impact Analysis</h3>
          <div id="business-impact-chart" class="chart-container" style="height: 400px;"></div>
        </div>
      </div>
      
      <!-- Additional content would be implemented here -->
    `}loadFinancialTCO(container){container.innerHTML=`
      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">3-Year TCO Comparison</h3>
              <div id="tco-comparison-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Cost Structure Breakdown</h3>
              <div id="cost-structure-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Cumulative Cost Over Time</h3>
              <div id="cumulative-cost-chart" class="chart-container" style="height: 300px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;setTimeout(()=>{if(window.chartManager){window.chartManager.initFinancialCharts({})}},500)}loadSecurityOverview(container){container.innerHTML=`
      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Security Capability Comparison</h3>
              <div id="security-capability-chart" class="chart-container" style="height: 500px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">NIST Framework Coverage</h3>
              <div id="nist-framework-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="card-title">Breach Impact Analysis</h3>
              <div id="breach-impact-chart" class="chart-container" style="height: 400px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;setTimeout(()=>{if(window.chartManager){window.chartManager.initSecurityCharts({})}},500)}}document.addEventListener("DOMContentLoaded",function(){window.viewManager=new ViewManager;window.viewManager.init()});