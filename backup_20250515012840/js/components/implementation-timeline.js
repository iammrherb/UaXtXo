/**
 * Implementation Timeline Component
 * Generates implementation timeline visualization for different vendors
 */
class ImplementationTimeline {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    if (!this.container) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }
  }

  /**
   * Generate a timeline for a vendor
   * @param {string} vendor - The vendor ID
   */
  generate(vendor) {
    if (!this.container) return;

    // Clear existing content
    this.container.innerHTML = '';

    // Get timeline phases based on vendor
    const phases = this.getTimelinePhases(vendor);

    // Create timeline HTML
    const timeline = document.createElement('div');
    timeline.className = 'implementation-timeline';

    phases.forEach(phase => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      item.innerHTML = `
        <h4>${phase.name} <span class="duration">(${phase.duration})</span></h4>
        <p>${phase.description}</p>
      `;

      timeline.appendChild(item);
    });

    this.container.appendChild(timeline);
  }

  /**
   * Get timeline phases for a vendor
   * @param {string} vendor - The vendor ID
   * @returns {Array} Array of timeline phases
   */
  getTimelinePhases(vendor) {
    // Default phases
    const defaultPhases = [
      {
        name: 'Planning & Assessment',
        duration: '1-2 weeks',
        description: 'Evaluate environment, define requirements, and create deployment plan.'
      },
      {
        name: 'Initial Setup',
        duration: '1 week',
        description: 'Set up core components and establish baseline configuration.'
      },
      {
        name: 'Configuration & Integration',
        duration: '2-4 weeks',
        description: 'Configure policies, integrate with existing systems, and test functionality.'
      },
      {
        name: 'Pilot Deployment',
        duration: '1-2 weeks',
        description: 'Deploy to a limited group of users for testing and feedback.'
      },
      {
        name: 'Training & Knowledge Transfer',
        duration: '1 week',
        description: 'Train IT staff on administration, monitoring, and troubleshooting.'
      },
      {
        name: 'Full Deployment',
        duration: '2-4 weeks',
        description: 'Roll out solution to all users and devices across the organization.'
      }
    ];

    // Vendor-specific phases
    switch (vendor) {
      case 'portnox':
        return [
          {
            name: 'Planning & Assessment',
            duration: '3-5 days',
            description: 'Rapid environment assessment and cloud deployment plan creation.'
          },
          {
            name: 'Cloud Instance Setup',
            duration: '1 day',
            description: 'Provision and configure Portnox Cloud instance.'
          },
          {
            name: 'Directory Integration',
            duration: '1-2 days',
            description: 'Connect to Active Directory, Azure AD, or other identity providers.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 days',
            description: 'Configure switches, wireless controllers, and VPN for RADIUS authentication.'
          },
          {
            name: 'Policy Configuration',
            duration: '1-2 days',
            description: 'Define access policies, authentication methods, and enforcement actions.'
          },
          {
            name: 'Pilot Deployment',
            duration: '3-5 days',
            description: 'Limited rollout with monitoring and policy tuning.'
          },
          {
            name: 'Training',
            duration: '1 day',
            description: 'Knowledge transfer to IT staff (minimal training required).'
          },
          {
            name: 'Full Deployment',
            duration: '1-2 weeks',
            description: 'Phased rollout across the organization with minimal disruption.'
          }
        ];

      case 'cisco':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-4 weeks',
            description: 'Detailed environment assessment, hardware sizing, and architecture design.'
          },
          {
            name: 'Hardware Procurement',
            duration: '2-4 weeks',
            description: 'Order, receive, and rack ISE appliances or prepare virtual machines.'
          },
          {
            name: 'Initial Installation',
            duration: '1-2 weeks',
            description: 'Install ISE software, configure high availability, and establish baseline settings.'
          },
          {
            name: 'Certificate Configuration',
            duration: '1 week',
            description: 'Set up certificate authority and deploy certificates for secure authentication.'
          },
          {
            name: 'Network Integration',
            duration: '3-4 weeks',
            description: 'Configure switches, wireless controllers, and VPN concentrators for ISE integration.'
          },
          {
            name: 'Identity Store Integration',
            duration: '1-2 weeks',
            description: 'Connect to Active Directory and other identity sources.'
          },
          {
            name: 'Policy Configuration',
            duration: '2-3 weeks',
            description: 'Create detailed authorization policies and profiles.'
          },
          {
            name: 'Guest & BYOD Services',
            duration: '1-2 weeks',
            description: 'Configure guest access and BYOD onboarding processes.'
          },
          {
            name: 'Extensive Testing',
            duration: '2-3 weeks',
            description: 'Test all access scenarios and troubleshoot issues.'
          },
          {
            name: 'Team Training',
            duration: '1-2 weeks',
            description: 'Formal training for administrators on ISE management (certification recommended).'
          },
          {
            name: 'Pilot Deployment',
            duration: '2-4 weeks',
            description: 'Controlled rollout with extensive monitoring and problem resolution.'
          },
          {
            name: 'Full Deployment',
            duration: '4-8 weeks',
            description: 'Phased rollout by location or department with fallback options.'
          }
        ];

      case 'aruba':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-3 weeks',
            description: 'Environment assessment, hardware sizing, and architecture design.'
          },
          {
            name: 'Hardware Deployment',
            duration: '1-3 weeks',
            description: 'Install ClearPass appliances or configure virtual machines.'
          },
          {
            name: 'Initial Configuration',
            duration: '1-2 weeks',
            description: 'Basic setup, licensing, and high availability configuration.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 weeks',
            description: 'Configure network devices for RADIUS and enforcement.'
          },
          {
            name: 'Authentication Setup',
            duration: '1-2 weeks',
            description: 'Configure authentication methods and identity stores.'
          },
          {
            name: 'Policy Creation',
            duration: '2-3 weeks',
            description: 'Develop enforcement profiles and access rules.'
          },
          {
            name: 'Onboarding Setup',
            duration: '1-2 weeks',
            description: 'Configure guest access and device onboarding.'
          },
          {
            name: 'Testing & Tuning',
            duration: '2 weeks',
            description: 'Validate functionality and optimize performance.'
          },
          {
            name: 'Administrator Training',
            duration: '1 week',
            description: 'Train IT staff on ClearPass management.'
          },
          {
            name: 'Pilot Deployment',
            duration: '2-3 weeks',
            description: 'Limited production deployment with monitoring.'
          },
          {
            name: 'Full Deployment',
            duration: '3-6 weeks',
            description: 'Organization-wide rollout in phases.'
          }
        ];

      case 'forescout':
        return [
          {
            name: 'Planning & Assessment',
            duration: '2-3 weeks',
            description: 'Network assessment and deployment architecture design.'
          },
          {
            name: 'Appliance Installation',
            duration: '1-2 weeks',
            description: 'Deploy physical or virtual appliances and establish communication.'
          },
          {
            name: 'Initial Configuration',
            duration: '1-2 weeks',
            description: 'Configure management access, licensing, and basic settings.'
          },
          {
            name: 'Network Integration',
            duration: '2-3 weeks',
            description: 'Set up SPAN ports, network access, and API integrations.'
          },
          {
            name: 'Discovery Configuration',
            duration: '1-2 weeks',
            description: 'Configure device discovery and classification mechanisms.'
          },
          {
            name: 'Policy Definition',
            duration: '2-3 weeks',
            description: 'Create compliance policies and enforcement actions.'
          },
          {
            name: 'Integration Testing',
            duration: '1-2 weeks',
            description: 'Test all integrations and policy enforcement.'
          },
          {
            name: 'Administrator Training',
            duration: '1 week',
            description: 'Train IT staff on management and operations.'
          },
          {
            name: 'Pilot Phase',
            duration: '2-3 weeks',
            description: 'Limited deployment with monitoring and adjustment.'
          },
          {
            name: 'Full Deployment',
            duration: '3-5 weeks',
            description: 'Organization-wide rollout in phases.'
          }
        ];

      default:
        return defaultPhases;
    }
  }
}

// Make available globally
window.ImplementationTimeline = ImplementationTimeline;

// Initialize the timeline when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const timeline = new ImplementationTimeline('implementation-timeline');

  // Generate timeline for Portnox by default
  if (timeline) {
    timeline.generate('portnox');
  }

  // Listen for vendor changes
  document.addEventListener('vendorsChanged', (e) => {
    const { vendor, added } = e.detail;

    // Update timeline when a vendor is selected
    if (added && timeline) {
      timeline.generate(vendor);
    }
  });
});
