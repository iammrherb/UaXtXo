document.addEventListener("DOMContentLoaded",function(){console.log("Initializing cost configuration fix...");setTimeout(initCostConfigFix,500)});function initCostConfigFix(){const costConfigCard=document.getElementById("cost-config");if(!costConfigCard){console.warn("Cost config card not found, creating it...");createCostConfigCard();return}fixCostConfig(costConfigCard)}function fixCostConfig(costConfigCard){const header=costConfigCard.querySelector(".config-card-header");const content=costConfigCard.querySelector(".config-card-content");const toggleIcon=header?.querySelector(".toggle-icon");if(!header||!content){console.warn("Cost config header or content not found, recreating...");recreateCostConfigCard(costConfigCard);return}console.log("Fixing cost config card...");content.style.transition="max-height 0.3s ease, padding 0.3s ease";if(!toggleIcon){const icon=document.createElement("i");icon.className="fas fa-chevron-up toggle-icon";header.appendChild(icon)}initRangeSliders();console.log("Cost config card fixed")}function recreateCostConfigCard(oldCard){console.log("Recreating cost config card...");const newCard=document.createElement("div");newCard.id="cost-config";newCard.className="config-card";newCard.innerHTML=`
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;if(oldCard&&oldCard.parentNode){oldCard.parentNode.replaceChild(newCard,oldCard)}else{const sidebarContent=document.querySelector(".sidebar-content");if(sidebarContent){const orgConfig=document.getElementById("organization-config");if(orgConfig){orgConfig.after(newCard)}else{sidebarContent.appendChild(newCard)}}}initCostConfigEvents(newCard);initRangeSliders();console.log("Cost config card recreated")}function createCostConfigCard(){console.log("Creating cost config card...");const sidebarContent=document.querySelector(".sidebar-content");if(!sidebarContent){console.error("Sidebar content not found, cannot create cost config card");return}const card=document.createElement("div");card.id="cost-config";card.className="config-card";card.innerHTML=`
        <div class="config-card-header">
            <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
            <i class="fas fa-chevron-up toggle-icon"></i>
        </div>
        <div class="config-card-content">
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">License Cost ($/device/year)</span>
                    <span class="range-slider-value" id="license-cost-value">$50</span>
                </div>
                <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Hardware Cost ($/device)</span>
                    <span class="range-slider-value" id="hardware-cost-value">$100</span>
                </div>
                <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Implementation Cost ($)</span>
                    <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                </div>
                <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Maintenance (% of license)</span>
                    <span class="range-slider-value" id="maintenance-value">20%</span>
                </div>
                <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">FTE Cost ($/year)</span>
                    <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                </div>
                <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
            </div>
            
            <div class="range-slider">
                <div class="range-slider-header">
                    <span class="range-slider-label">Risk Reduction (%)</span>
                    <span class="range-slider-value" id="risk-reduction-value">35%</span>
                </div>
                <input type="range" id="risk-reduction" min="10" max="50" value="35" step="5">
            </div>
        </div>
    `;const orgConfig=document.getElementById("organization-config");if(orgConfig){orgConfig.after(card)}else{sidebarContent.appendChild(card)}initCostConfigEvents(card);initRangeSliders();console.log("Cost config card created")}function initCostConfigEvents(card){const header=card.querySelector(".config-card-header");const content=card.querySelector(".config-card-content");const toggleIcon=header.querySelector(".toggle-icon");header.addEventListener("click",()=>{toggleCostConfig(content,toggleIcon)})}function toggleCostConfig(content,toggleIcon){if(content.classList.contains("collapsed")){content.classList.remove("collapsed");toggleIcon.classList.remove("collapsed");const contentHeight=getExpandedContentHeight(content);content.style.maxHeight="0px";content.offsetHeight;content.style.maxHeight=contentHeight+"px";content.style.paddingTop="";content.style.paddingBottom="";setTimeout(()=>{content.style.maxHeight=""},300)}else{const contentHeight=content.scrollHeight;content.style.maxHeight=contentHeight+"px";content.offsetHeight;content.style.maxHeight="0px";content.style.paddingTop="0";content.style.paddingBottom="0";setTimeout(()=>{content.classList.add("collapsed");toggleIcon.classList.add("collapsed")},300)}}function getExpandedContentHeight(content){const clone=content.cloneNode(true);clone.classList.remove("collapsed");clone.style.maxHeight="none";clone.style.position="absolute";clone.style.visibility="hidden";clone.style.padding="15px";document.body.appendChild(clone);const height=clone.offsetHeight;document.body.removeChild(clone);return height}function initRangeSliders(){const rangeSliders=document.querySelectorAll('#cost-config input[type="range"]');rangeSliders.forEach(slider=>{const valueDisplay=document.getElementById(`${slider.id}-value`);if(valueDisplay){updateRangeSliderValue(slider,valueDisplay)}updateRangeSliderBackground(slider);slider.addEventListener("input",()=>{if(valueDisplay){updateRangeSliderValue(slider,valueDisplay)}updateRangeSliderBackground(slider);document.dispatchEvent(new CustomEvent("costConfigChanged",{detail:{sliderId:slider.id,value:slider.value}}))})})}function updateRangeSliderValue(slider,valueDisplay){const value=slider.value;if(slider.id==="fte-cost"){valueDisplay.textContent=`$${parseInt(value).toLocaleString()}`}else if(slider.id==="implementation-cost"){valueDisplay.textContent=`$${parseInt(value).toLocaleString()}`}else if(slider.id==="hardware-cost"){valueDisplay.textContent=`$${parseInt(value).toLocaleString()}`}else if(slider.id==="license-cost"){valueDisplay.textContent=`$${parseInt(value)}`}else if(slider.id.includes("percentage")||slider.id.includes("reduction")){valueDisplay.textContent=`${value}%`}else{valueDisplay.textContent=value}}function updateRangeSliderBackground(slider){const min=parseFloat(slider.min);const max=parseFloat(slider.max);const value=parseFloat(slider.value);const percentage=(value-min)/(max-min)*100;slider.style.background=`linear-gradient(to right, #1a5a96 0%, #1a5a96 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`}