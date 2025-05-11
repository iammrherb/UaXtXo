// Magical Wizard Manager
class MagicalWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.data = {};
        this.wizardElement = null;
        this.messages = {
            1: "Welcome, brave soul! Let's discover which NAC champion currently guards your digital realm.",
            2: "Ah, now tell me about your industry and the ancient scrolls of compliance that bind you.",
            3: "Describe your kingdom - how vast is your digital domain?",
            4: "Let's peek into your treasury and see how your gold is allocated.",
            5: "The spell is almost ready! Review your choices before I cast the mighty calculation spell!"
        };
        this.init();
    }

    init() {
        this.wizardElement = document.getElementById('wizard-overlay');
        this.setupEventListeners();
        this.createMagicalParticles();
        this.loadDefaultResults();
    }

    setupEventListeners() {
        // Launch wizard button
        const launchBtn = document.getElementById('launch-wizard');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => this.openWizard());
        }

        // Quick action buttons
        const quickCustomize = document.getElementById('quick-customize');
        const changeVendors = document.getElementById('change-vendors');
        const modifySettings = document.getElementById('modify-settings');

        if (quickCustomize) {
            quickCustomize.addEventListener('click', () => {
                this.openWizard(4); // Open at cost configuration
            });
        }

        if (changeVendors) {
            changeVendors.addEventListener('click', () => {
                this.openWizard(1); // Open at vendor selection
            });
        }

        if (modifySettings) {
            modifySettings.addEventListener('click', () => {
                this.openWizard(3); // Open at organization settings
            });
        }

        // Navigation buttons
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');
        const closeBtn = document.getElementById('wizard-close');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeWizard());
        }

        // Cast spell button
        const castBtn = document.getElementById('cast-spell');
        if (castBtn) {
            castBtn.addEventListener('click', () => this.castCalculationSpell());
        }

        // Close on overlay click
        this.wizardElement.addEventListener('click', (e) => {
            if (e.target === this.wizardElement) {
                this.closeWizard();
            }
        });
    }

    createMagicalParticles() {
        const particlesContainer = document.getElementById('magical-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    openWizard(startStep = 1) {
        this.currentStep = startStep;
        this.wizardElement.classList.add('active');
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateWizardMessage();
        this.animateWizardEntrance();
    }

    closeWizard() {
        this.animateWizardExit().then(() => {
            this.wizardElement.classList.remove('active');
        });
    }

    animateWizardEntrance() {
        const popup = this.wizardElement.querySelector('.wizard-popup');
        gsap.fromTo(popup, 
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
        );

        // Animate wizard character
        const wizardAvatar = this.wizardElement.querySelector('.wizard-avatar');
        gsap.fromTo(wizardAvatar,
            { rotation: -360, scale: 0 },
            { rotation: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
        );
    }

    animateWizardExit() {
        const popup = this.wizardElement.querySelector('.wizard-popup');
        return gsap.to(popup, {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: 'power2.in'
        });
    }

    showStep(step) {
        const steps = document.querySelectorAll('.wizard-step');
        steps.forEach(s => s.classList.remove('active'));

        const currentStep = document.getElementById(`step-${step}`);
        if (currentStep) {
            currentStep.classList.add('active');
            this.initializeStep(step);
        }
    }

    initializeStep(step) {
        switch(step) {
            case 1:
                this.initVendorSelection();
                break;
            case 2:
                this.initIndustrySelection();
                break;
            case 3:
                this.initOrganizationSetup();
                break;
            case 4:
                this.initCostConfiguration();
                break;
            case 5:
                this.initReviewStep();
                break;
        }
    }

    initVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card.enchanted');
        vendorCards.forEach((card, index) => {
            // Add entrance animation
            gsap.from(card, {
                opacity: 0,
                y: 50,
                rotation: -10,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            card.addEventListener('click', () => {
                vendorCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Magical selection effect
                gsap.fromTo(card,
                    { scale: 1 },
                    { 
                        scale: 1.05,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.inOut'
                    }
                );

                this.data.vendor = card.dataset.vendor;
            });
        });
    }

    initIndustrySelection() {
        const industryCards = document.querySelectorAll('.industry-card');
        industryCards.forEach((card, index) => {
            // Add entrance animation
            gsap.from(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });

            card.addEventListener('click', () => {
                industryCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.data.industry = card.dataset.industry;
                this.loadComplianceScrolls(card.dataset.industry);
            });
        });
    }

    loadComplianceScrolls(industry) {
        const container = document.querySelector('.scrolls-container');
        if (!container || !window.ComplianceData) return;

        const frameworks = window.ComplianceData.getFrameworksByIndustry(industry);
        
        container.innerHTML = frameworks.map((framework, index) => `
            <div class="compliance-scroll" data-framework="${framework.name}" style="animation-delay: ${index * 0.1}s">
                <div class="scroll-header">
                    <i class="fas fa-scroll"></i>
                    <h4>${framework.name}</h4>
                </div>
                <p class="scroll-description">${framework.description}</p>
                <div class="scroll-requirements">
                    ${framework.requirements.slice(0, 3).map(req => `
                        <span class="requirement-tag">${req}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Add click handlers to scrolls
        const scrolls = container.querySelectorAll('.compliance-scroll');
        scrolls.forEach((scroll, index) => {
            // Entrance animation
            gsap.from(scroll, {
                opacity: 0,
                x: -50,
                rotation: -5,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            scroll.addEventListener('click', () => {
                scroll.classList.toggle('selected');
            });
        });
    }

    initOrganizationSetup() {
        // Setup magical sliders
        const deviceSlider = document.getElementById('device-count');
        const locationSlider = document.getElementById('locations');

        if (deviceSlider) {
            deviceSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('device-count-value').textContent = 
                    parseInt(value).toLocaleString();
                this.data.deviceCount = parseInt(value);
            });
        }

        if (locationSlider) {
            locationSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                document.getElementById('locations-value').textContent = value;
                this.data.locations = parseInt(value);
            });
        }

        // Kingdom features
        const features = document.querySelectorAll('.feature-option input');
        features.forEach(feature => {
            feature.addEventListener('change', () => {
                this.data[feature.id] = feature.checked;
            });
        });
    }

    initCostConfiguration() {
        // Initialize cost sliders
        const costSliders = document.querySelectorAll('.cost-input-group input[type="range"]');
        costSliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                const valueDisplay = e.target.parentElement.querySelector('.cost-value');
                
                if (slider.id.includes('cost') || slider.id.includes('downtime')) {
                    valueDisplay.textContent = `$${parseInt(value).toLocaleString()}`;
                } else if (slider.id.includes('percentage') || slider.id.includes('allocation')) {
                    valueDisplay.textContent = `${value}%`;
                }
                
                this.data[slider.id] = value;
            });
        });

        // Portnox pricing crystal
        const basePrice = document.getElementById('portnox-base-price');
        const discount = document.getElementById('portnox-discount');

        const updatePricing = () => {
            const base = parseFloat(basePrice.value);
            const disc = parseInt(discount.value);
            const effective = base * (1 - disc / 100);
            
            document.getElementById('effective-price').textContent = effective.toFixed(2);
            
            // Update annual cost
            const devices = this.data.deviceCount || 5000;
            const annual = effective * devices * 12;
            document.getElementById('annual-cost').textContent = `$${annual.toLocaleString()}`;
        };

        if (basePrice) basePrice.addEventListener('input', updatePricing);
        if (discount) discount.addEventListener('input', updatePricing);
    }

    initReviewStep() {
        // Populate summary
        const summaryContent = document.getElementById('wizard-summary');
        if (summaryContent) {
            summaryContent.innerHTML = this.generateSummary();
        }

        // Animate casting circle
        const circles = document.querySelectorAll('.circle-animation div');
        circles.forEach((circle, index) => {
            gsap.to(circle, {
                rotation: 360,
                duration: 3 + index,
                repeat: -1,
                ease: 'none'
            });
        });
    }

    generateSummary() {
        return `
            <div class="summary-item">
                <span class="summary-label">Current Champion:</span>
                <span class="summary-value">${this.data.vendor || 'Cisco ISE'}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Your Realm:</span>
                <span class="summary-value">${this.data.industry || 'Technology'}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Kingdom Size:</span>
                <span class="summary-value">${(this.data.deviceCount || 5000).toLocaleString()} devices</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Territories:</span>
                <span class="summary-value">${this.data.locations || 10} locations</span>
            </div>
        `;
    }

    updateProgress() {
        const progressFill = document.getElementById('wizard-progress-fill');
        const markers = document.querySelectorAll('.progress-marker');
        
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
        }

        markers.forEach((marker, index) => {
            if (index + 1 <= this.currentStep) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }

    updateWizardMessage() {
        const messageElement = document.getElementById('wizard-message');
        if (messageElement) {
            messageElement.textContent = this.messages[this.currentStep];
            
            // Animate message change
            gsap.fromTo(messageElement,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateWizardMessage();
            this.updateNavigation();
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateWizardMessage();
            this.updateNavigation();
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('wizard-prev');
        const nextBtn = document.getElementById('wizard-next');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-flex';
            }
        }
    }

    castCalculationSpell() {
        // Show magical loading
        if (window.LoadingManager) {
            window.LoadingManager.show('Casting calculation spell...');
        }

        // Simulate calculation
        setTimeout(() => {
            if (window.LoadingManager) {
                window.LoadingManager.hide();
            }
            this.closeWizard();
            this.updateResults();
        }, 2000);
    }

    updateResults() {
        // Update quick action cards with new data
        const deviceCount = this.data.deviceCount || 5000;
        const vendor = this.data.vendor || 'cisco';
        
        // Update action cards
        const settingsCard = document.querySelector('.action-card:nth-child(3) p');
        if (settingsCard) {
            settingsCard.textContent = `Enterprise (${deviceCount.toLocaleString()} devices)`;
        }

        // Trigger results update
        if (window.chartBuilder) {
            window.chartBuilder.createCharts({
                currentVendor: vendor,
                deviceCount: deviceCount,
                yearsToProject: 3
            });
        }
    }

    loadDefaultResults() {
        // Load default charts and data when page loads
        setTimeout(() => {
            if (window.chartBuilder) {
                window.chartBuilder.createCharts({
                    currentVendor: 'cisco',
                    deviceCount: 5000,
                    yearsToProject: 3
                });
            }
        }, 500);
    }
}

// Initialize magical wizard
window.magicalWizard = new MagicalWizard();
