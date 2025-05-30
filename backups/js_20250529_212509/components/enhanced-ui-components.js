/**
 * Enhanced UI Components Module
 * Provides advanced UI elements like subtabs, dropdowns, and filters
 */

class EnhancedUIComponents {
    constructor() {
        this.activeSubtabs = {};
        this.activeFilters = {};
        this.multiSelectStates = {};
    }
    
    // Initialize all UI enhancements
    init() {
        console.log('🎨 Initializing enhanced UI components...');
        this.setupSubtabs();
        this.setupDropdowns();
        this.setupMultiSelects();
        this.setupRangeSliders();
        this.setupQuickActions();
        this.setupTooltips();
        console.log('✅ Enhanced UI components initialized');
    }
    
    // Create subtab navigation
    createSubtabs(containerId, tabs) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const subtabId = `subtab-${containerId}`;
        
        const subtabHTML = `
            <div class="subtab-container">
                <div class="subtab-nav" id="${subtabId}-nav">
                    ${tabs.map((tab, index) => `
                        <button class="subtab-btn ${index === 0 ? 'active' : ''}" 
                                data-subtab="${tab.id}"
                                data-container="${subtabId}">
                            ${tab.icon ? `<i class="${tab.icon}"></i>` : ''}
                            ${tab.label}
                        </button>
                    `).join('')}
                </div>
                <div class="subtab-content" id="${subtabId}-content">
                    ${tabs.map((tab, index) => `
                        <div class="subtab-panel ${index === 0 ? 'active' : ''}" 
                             id="${subtabId}-${tab.id}">
                            ${tab.content || '<p>Loading content...</p>'}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML += subtabHTML;
        this.activeSubtabs[subtabId] = tabs[0].id;
    }
    
    // Setup subtab event listeners
    setupSubtabs() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('subtab-btn')) {
                const subtabId = e.target.dataset.subtab;
                const containerId = e.target.dataset.container;
                this.switchSubtab(containerId, subtabId);
            }
        });
    }
    
    // Switch active subtab
    switchSubtab(containerId, subtabId) {
        // Update buttons
        const buttons = document.querySelectorAll(`#${containerId}-nav .subtab-btn`);
        buttons.forEach(btn => {
            if (btn.dataset.subtab === subtabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update panels
        const panels = document.querySelectorAll(`#${containerId}-content .subtab-panel`);
        panels.forEach(panel => {
            if (panel.id === `${containerId}-${subtabId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        
        this.activeSubtabs[containerId] = subtabId;
        
        // Dispatch event for other components to react
        document.dispatchEvent(new CustomEvent('subtabChanged', {
            detail: { containerId, subtabId }
        }));
    }
    
    // Create enhanced dropdown
    createDropdown(config) {
        const {
            containerId,
            label,
            options,
            defaultValue,
            onChange,
            multiple = false,
            searchable = false
        } = config;
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const dropdownId = `dropdown-${containerId}-${Date.now()}`;
        
        if (multiple) {
            this.createMultiSelectDropdown({
                containerId,
                dropdownId,
                label,
                options,
                defaultValue,
                onChange
            });
        } else {
            const dropdownHTML = `
                <div class="dropdown-container">
                    <label class="dropdown-label" for="${dropdownId}">
                        ${label}
                    </label>
                    <select class="dropdown-select" id="${dropdownId}">
                        ${options.map(opt => `
                            <option value="${opt.value}" ${opt.value === defaultValue ? 'selected' : ''}>
                                ${opt.label}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
            
            container.innerHTML += dropdownHTML;
            
            // Add change listener
            document.getElementById(dropdownId).addEventListener('change', (e) => {
                if (onChange) onChange(e.target.value);
            });
        }
    }
    
    // Create multi-select dropdown
    createMultiSelectDropdown(config) {
        const { containerId, dropdownId, label, options, defaultValue = [], onChange } = config;
        const container = document.getElementById(containerId);
        
        const multiSelectHTML = `
            <div class="dropdown-container">
                <label class="dropdown-label">${label}</label>
                <div class="multi-select-dropdown" id="${dropdownId}">
                    <div class="multi-select-trigger">
                        <span class="selected-text">${defaultValue.length} selected</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="multi-select-dropdown-menu">
                        ${options.map(opt => `
                            <div class="multi-select-option" data-value="${opt.value}">
                                <input type="checkbox" 
                                       value="${opt.value}" 
                                       ${defaultValue.includes(opt.value) ? 'checked' : ''}>
                                <span>${opt.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += multiSelectHTML;
        
        this.multiSelectStates[dropdownId] = defaultValue;
        
        // Setup multi-select functionality
        this.setupMultiSelectEvents(dropdownId, onChange);
    }
    
    // Setup multi-select events
    setupMultiSelectEvents(dropdownId, onChange) {
        const dropdown = document.getElementById(dropdownId);
        const trigger = dropdown.querySelector('.multi-select-trigger');
        const menu = dropdown.querySelector('.multi-select-dropdown-menu');
        const options = dropdown.querySelectorAll('.multi-select-option');
        
        // Toggle dropdown
        trigger.addEventListener('click', () => {
            menu.classList.toggle('show');
            trigger.classList.toggle('active');
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                menu.classList.remove('show');
                trigger.classList.remove('active');
            }
        });
        
        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const checkbox = option.querySelector('input[type="checkbox"]');
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                // Update selected values
                const selected = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => cb.value);
                
                this.multiSelectStates[dropdownId] = selected;
                
                // Update display
                const selectedText = dropdown.querySelector('.selected-text');
                selectedText.textContent = selected.length === 0 ? 'None selected' :
                                         selected.length === 1 ? '1 selected' :
                                         `${selected.length} selected`;
                
                // Update visual state
                option.classList.toggle('selected', checkbox.checked);
                
                // Callback
                if (onChange) onChange(selected);
            });
        });
    }
    
    // Setup standard dropdowns
    setupDropdowns() {
        // Handle any dynamically added dropdowns
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('dropdown-select')) {
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('dropdownChanged', {
                    detail: {
                        id: e.target.id,
                        value: e.target.value
                    }
                }));
            }
        });
    }
    
    // Setup multi-select dropdowns
    setupMultiSelects() {
        // Already handled in setupMultiSelectEvents
    }
    
    // Create range slider with values
    createRangeSlider(config) {
        const {
            containerId,
            label,
            min,
            max,
            value,
            step = 1,
            unit = '',
            onChange
        } = config;
        
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const sliderId = `slider-${containerId}-${Date.now()}`;
        
        const sliderHTML = `
            <div class="range-slider-container">
                <label class="dropdown-label">${label}</label>
                <input type="range" 
                       class="range-slider" 
                       id="${sliderId}"
                       min="${min}" 
                       max="${max}" 
                       value="${value}" 
                       step="${step}">
                <div class="range-values">
                    <span>${min}${unit}</span>
                    <span class="current-value">${value}${unit}</span>
                    <span>${max}${unit}</span>
                </div>
            </div>
        `;
        
        container.innerHTML += sliderHTML;
        
        const slider = document.getElementById(sliderId);
        const currentValueSpan = container.querySelector('.current-value');
        
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            currentValueSpan.textContent = `${val}${unit}`;
            if (onChange) onChange(val);
        });
    }
    
    // Setup range sliders
    setupRangeSliders() {
        // Event delegation for dynamically added sliders
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('range-slider')) {
                document.dispatchEvent(new CustomEvent('rangeSliderChanged', {
                    detail: {
                        id: e.target.id,
                        value: e.target.value
                    }
                }));
            }
        });
    }
    
    // Create quick action buttons
    createQuickActions(config) {
        const { containerId, actions } = config;
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const actionsHTML = `
            <div class="quick-actions-bar">
                ${actions.map(action => `
                    <button class="quick-action-btn ${action.active ? 'active' : ''}"
                            data-action="${action.id}">
                        <i class="${action.icon}"></i>
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = actionsHTML;
        
        // Setup click handlers
        container.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const actionId = btn.dataset.action;
                const action = actions.find(a => a.id === actionId);
                if (action && action.onClick) {
                    action.onClick();
                }
                
                // Toggle active state if toggle action
                if (action.toggle) {
                    btn.classList.toggle('active');
                }
            });
        });
    }
    
    // Setup quick actions
    setupQuickActions() {
        // Handled in createQuickActions
    }
    
    // Create filter pills
    createFilterPills(config) {
        const { containerId, filters } = config;
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const pillsHTML = `
            <div class="filter-pills">
                ${filters.map(filter => `
                    <div class="filter-pill" data-filter="${filter.id}">
                        <span>${filter.label}: ${filter.value}</span>
                        <i class="fas fa-times remove-btn"></i>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = pillsHTML;
        
        // Setup remove handlers
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pill = e.target.closest('.filter-pill');
                const filterId = pill.dataset.filter;
                pill.remove();
                
                // Dispatch filter removed event
                document.dispatchEvent(new CustomEvent('filterRemoved', {
                    detail: { filterId }
                }));
            });
        });
    }
    
    // Setup tooltips
    setupTooltips() {
        // Create tooltip container
        const tooltipContainer = document.createElement('div');
        tooltipContainer.id = 'tooltip-container';
        tooltipContainer.style.cssText = `
            position: fixed;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(tooltipContainer);
        
        // Handle tooltip hover
        document.addEventListener('mouseover', (e) => {
            const tooltip = e.target.closest('[data-tooltip]');
            if (tooltip) {
                this.showTooltip(tooltip, tooltip.dataset.tooltip);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const tooltip = e.target.closest('[data-tooltip]');
            if (tooltip) {
                this.hideTooltip();
            }
        });
    }
    
    // Show tooltip
    showTooltip(element, text) {
        const container = document.getElementById('tooltip-container');
        const rect = element.getBoundingClientRect();
        
        container.innerHTML = `
            <div class="tooltip-content" style="opacity: 1; visibility: visible;">
                ${text}
            </div>
        `;
        
        container.style.left = rect.left + rect.width / 2 + 'px';
        container.style.top = rect.top - 8 + 'px';
    }
    
    // Hide tooltip
    hideTooltip() {
        const container = document.getElementById('tooltip-container');
        container.innerHTML = '';
    }
    
    // Create advanced filter panel
    createAdvancedFilters(config) {
        const { containerId, filters } = config;
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const filterHTML = `
            <div class="advanced-filters">
                <div class="advanced-filters-header">
                    <h3>Advanced Filters</h3>
                    <div class="advanced-filters-toggle">
                        <i class="fas fa-sliders-h"></i>
                        <span>Show/Hide Filters</span>
                    </div>
                </div>
                <div class="filter-sections">
                    ${filters.map(section => `
                        <div class="filter-section">
                            <h4 class="filter-section-title">${section.title}</h4>
                            <div id="filter-section-${section.id}"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = filterHTML;
        
        // Populate filter sections
        filters.forEach(section => {
            const sectionContainer = document.getElementById(`filter-section-${section.id}`);
            section.filters.forEach(filter => {
                switch (filter.type) {
                    case 'dropdown':
                        this.createDropdown({
                            containerId: `filter-section-${section.id}`,
                            ...filter
                        });
                        break;
                    case 'range':
                        this.createRangeSlider({
                            containerId: `filter-section-${section.id}`,
                            ...filter
                        });
                        break;
                    case 'multiselect':
                        this.createDropdown({
                            containerId: `filter-section-${section.id}`,
                            multiple: true,
                            ...filter
                        });
                        break;
                }
            });
        });
    }
}

// Create global instance
window.enhancedUI = new EnhancedUIComponents();
