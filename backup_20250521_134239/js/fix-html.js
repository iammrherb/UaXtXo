/**
 * HTML Structure Fixes for Portnox Total Cost Analyzer
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fix script loading order
  const head = document.head;
  
  // Add theme CSS if not present
  if (!document.querySelector('link[href="css/themes/enhanced-theme.css"]')) {
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = 'css/themes/enhanced-theme.css';
    head.appendChild(themeLink);
  }
  
  // Add new scripts if not present
  const scriptsToAdd = [
    'js/theme-loader.js',
    'js/load-manager.js',
    'js/fix-images.js',
    'js/view-organization-fix.js'
  ];
  
  scriptsToAdd.forEach(scriptSrc => {
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      head.appendChild(script);
    }
  });
  
  // Check if body structure is correct
  const appContainer = document.querySelector('.app-container');
  if (!appContainer) {
    console.error('App container not found, cannot fix HTML structure');
    return;
  }
  
  // Fix header structure if needed
  let header = document.querySelector('.app-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'app-header';
    
    // Create header content
    const headerContent = document.createElement('div');
    headerContent.className = 'header-content';
    
    // Create logo section
    const logoSection = document.createElement('div');
    logoSection.className = 'logo-section';
    
    const logo = document.createElement('img');
    logo.className = 'company-logo';
    logo.src = 'img/portnox-logo.svg';
    logo.alt = 'Portnox';
    logo.onerror = function() {
      // Fallback if logo is missing
      this.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiIGZpbGw9IiMwMDYzQjIiLz48dGV4dCB4PSIxMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiPlBPUlROT1g8L3RleHQ+PC9zdmc+';
    };
    logoSection.appendChild(logo);
    
    const appTitle = document.createElement('div');
    appTitle.className = 'app-title';
    
    const title = document.createElement('h1');
    title.textContent = 'Total Cost Analyzer';
    appTitle.appendChild(title);
    
    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.textContent = 'Compare TCO across NAC vendors';
    appTitle.appendChild(subtitle);
    
    logoSection.appendChild(appTitle);
    headerContent.appendChild(logoSection);
    
    // Create header actions
    const headerActions = document.createElement('div');
    headerActions.className = 'header-actions';
    
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-outline';
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Export';
    headerActions.appendChild(exportBtn);
    
    headerContent.appendChild(headerActions);
    header.appendChild(headerContent);
    
    // Add header to the beginning of app container
    appContainer.insertBefore(header, appContainer.firstChild);
  }
  
  // Fix main content structure if needed
  let mainContent = document.querySelector('.main-content');
  if (!mainContent) {
    mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Move existing content into main-content
    const existingChildren = Array.from(appContainer.children);
    existingChildren.forEach(child => {
      if (child !== header && !child.classList.contains('app-footer')) {
        mainContent.appendChild(child);
      }
    });
    
    // Add main content after header
    if (header.nextSibling) {
      appContainer.insertBefore(mainContent, header.nextSibling);
    } else {
      appContainer.appendChild(mainContent);
    }
  }
  
  // Fix sidebar structure if needed
  let sidebar = document.querySelector('.sidebar');
  if (!sidebar) {
    sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    // Create sidebar header
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'sidebar-header';
    
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerHTML = '<i class="fas fa-cogs"></i> Configuration';
    sidebarHeader.appendChild(sidebarTitle);
    sidebar.appendChild(sidebarHeader);
    
    // Create sidebar content
    const sidebarContent = document.createElement('div');
    sidebarContent.className = 'sidebar-content';
    sidebar.appendChild(sidebarContent);
    
    // Add sidebar to main content
    mainContent.insertBefore(sidebar, mainContent.firstChild);
  }
  
  // Fix sidebar toggle if needed
  let sidebarToggle = document.querySelector('.sidebar-toggle');
  if (!sidebarToggle) {
    sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-chevron-left"></i>';
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      this.classList.toggle('collapsed');
      
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.classList.toggle('expanded');
      }
    });
    
    mainContent.appendChild(sidebarToggle);
  }
  
  // Fix content area if needed
  let contentArea = document.querySelector('.content-area');
  if (!contentArea) {
    contentArea = document.createElement('div');
    contentArea.className = 'content-area';
    
    // Move existing view content into content area
    const viewPanels = Array.from(mainContent.querySelectorAll('.view-panel'));
    if (viewPanels.length > 0) {
      viewPanels.forEach(panel => {
        contentArea.appendChild(panel);
      });
    } else {
      // Create default view structure if no views exist
      const executiveView = document.createElement('div');
      executiveView.className = 'view-panel active';
      executiveView.setAttribute('data-view', 'executive');
      
      const viewHeader = document.createElement('div');
      viewHeader.className = 'panel-header';
      
      const viewTitle = document.createElement('h2');
      viewTitle.textContent = 'Executive Summary';
      viewHeader.appendChild(viewTitle);
      
      const viewSubtitle = document.createElement('p');
      viewSubtitle.className = 'subtitle';
      viewSubtitle.textContent = 'Overview of NAC solution comparisons';
      viewHeader.appendChild(viewSubtitle);
      
      executiveView.appendChild(viewHeader);
      contentArea.appendChild(executiveView);
    }
    
    mainContent.appendChild(contentArea);
  }
  
  // Fix main tabs if needed
  let mainTabs = document.querySelector('.main-tabs');
  if (!mainTabs) {
    mainTabs = document.createElement('div');
    mainTabs.className = 'main-tabs';
    
    // Create default tabs
    const tabs = [
      { view: 'executive', icon: 'chart-pie', label: 'Executive Summary' },
      { view: 'financial', icon: 'money-bill-wave', label: 'Financial Analysis' },
      { view: 'security', icon: 'shield-alt', label: 'Security & Compliance' },
      { view: 'technical', icon: 'code', label: 'Technical Comparison' }
    ];
    
    tabs.forEach((tab, index) => {
      const tabElement = document.createElement('button');
      tabElement.className = 'main-tab' + (index === 0 ? ' active' : '');
      tabElement.setAttribute('data-view', tab.view);
      tabElement.innerHTML = `<i class="fas fa-${tab.icon}"></i> ${tab.label}`;
      mainTabs.appendChild(tabElement);
    });
    
    contentArea.insertBefore(mainTabs, contentArea.firstChild);
    
    // Add click event to tabs
    mainTabs.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        mainTabs.querySelectorAll('.main-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const viewId = this.getAttribute('data-view');
        contentArea.querySelectorAll('.view-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        
        const targetPanel = contentArea.querySelector(`.view-panel[data-view="${viewId}"]`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        } else {
          console.error(`View panel for ${viewId} not found`);
        }
      });
    });
  }
  
  // Fix footer if needed
  let footer = document.querySelector('.app-footer');
  if (!footer) {
    footer = document.createElement('div');
    footer.className = 'app-footer';
    
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    const copyright = document.createElement('div');
    copyright.className = 'footer-copyright';
    copyright.textContent = '© ' + new Date().getFullYear() + ' Portnox. All rights reserved.';
    footerContent.appendChild(copyright);
    
    const footerLinks = document.createElement('div');
    footerLinks.className = 'footer-links';
    
    const links = [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
      { href: '#', label: 'Contact Us' }
    ];
    
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      footerLinks.appendChild(a);
    });
    
    footerContent.appendChild(footerLinks);
    footer.appendChild(footerContent);
    
    appContainer.appendChild(footer);
  }
});
