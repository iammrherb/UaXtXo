/**
 * Sidebar Controller
 * Manages the sidebar behavior and interactions
 */
class SidebarController {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.toggle = document.querySelector('.sidebar-toggle');
    this.contentArea = document.querySelector('.content-area');
    this.configCards = document.querySelectorAll('.config-card');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Toggle sidebar
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Toggle config card sections
    this.configCards.forEach(card => {
      const header = card.querySelector('.config-card-header');
      const content = card.querySelector('.config-card-content');
      
      if (header && content) {
        header.addEventListener('click', () => {
          content.classList.toggle('collapsed');
          const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
          
          if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
          }
        });
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.contentArea.style.marginLeft = '0';
      } else if (!this.sidebar.classList.contains('collapsed')) {
        this.contentArea.style.marginLeft = '320px';
      }
    });
  }
  
  toggleSidebar() {
    this.sidebar.classList.toggle('collapsed');
    
    if (window.innerWidth >= 768) {
      if (this.sidebar.classList.contains('collapsed')) {
        this.contentArea.style.marginLeft = '0';
      } else {
        this.contentArea.style.marginLeft = '320px';
      }
    }
    
    // Update toggle icon
    const toggleIcon = this.toggle.querySelector('i');
    if (toggleIcon) {
      toggleIcon.classList.toggle('fa-chevron-left');
      toggleIcon.classList.toggle('fa-chevron-right');
    }
    
    // Trigger window resize to adjust charts
    window.dispatchEvent(new Event('resize'));
  }
  
  // Open a specific config card
  openConfigCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
      const content = card.querySelector('.config-card-content');
      const header = card.querySelector('.config-card-header');
      
      if (content && content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        
        const icon = header.querySelector('i.fa-chevron-down');
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      }
      
      // Ensure sidebar is open
      if (this.sidebar.classList.contains('collapsed')) {
        this.toggleSidebar();
      }
      
      // Scroll to the card
      card.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Initialize the sidebar controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sidebarController = new SidebarController();
});
