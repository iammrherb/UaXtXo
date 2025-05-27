/**
 * Enterprise Integration Module for Portnox Total Cost Analyzer
 * Enables integration with popular business tools
 */

class EnterpriseIntegrations {
    constructor() {
        this.integrations = {
            salesforce: null,
            slack: null,
            teams: null,
            sheets: null,
            powerbi: null,
            tableau: null
        };
        this.apiEndpoint = '/api/integrations';
    }
    
    /**
     * Initialize enterprise integrations
     */
    async init() {
        console.log('🔌 Initializing Enterprise Integrations...');
        
        // Check available integrations
        await this.checkAvailableIntegrations();
        
        // Setup integration UI
        this.setupIntegrationUI();
        
        // Initialize OAuth handlers
        this.setupOAuthHandlers();
        
        console.log('✅ Enterprise Integrations initialized');
    }
    
    /**
     * Check which integrations are available
     */
    async checkAvailableIntegrations() {
        // In production, this would check with backend
        const available = {
            salesforce: this.checkSalesforceAvailability(),
            slack: this.checkSlackAvailability(),
            teams: this.checkTeamsAvailability(),
            sheets: this.checkGoogleSheetsAvailability(),
            powerbi: this.checkPowerBIAvailability(),
            tableau: this.checkTableauAvailability()
        };
        
        Object.entries(available).forEach(([key, value]) => {
            if (value) {
                console.log(`✅ ${key} integration available`);
            }
        });
    }
    
    /**
     * Setup integration UI
     */
    setupIntegrationUI() {
        const integrationPanel = document.createElement('div');
        integrationPanel.className = 'integration-panel';
        integrationPanel.innerHTML = `
            <h3><i class="fas fa-plug"></i> Enterprise Integrations</h3>
            
            <div class="integration-grid">
                <div class="integration-card" data-integration="salesforce">
                    <img src="./img/integrations/salesforce.png" alt="Salesforce">
                    <h4>Salesforce</h4>
                    <p>Sync TCO analysis with opportunities</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectSalesforce()">
                        Connect
                    </button>
                </div>
                
                <div class="integration-card" data-integration="slack">
                    <img src="./img/integrations/slack.png" alt="Slack">
                    <h4>Slack</h4>
                    <p>Share insights with your team</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectSlack()">
                        Connect
                    </button>
                </div>
                
                <div class="integration-card" data-integration="teams">
                    <img src="./img/integrations/teams.png" alt="Microsoft Teams">
                    <h4>Microsoft Teams</h4>
                    <p>Collaborate on analysis in Teams</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectTeams()">
                        Connect
                    </button>
                </div>
                
                <div class="integration-card" data-integration="sheets">
                    <img src="./img/integrations/sheets.png" alt="Google Sheets">
                    <h4>Google Sheets</h4>
                    <p>Export data to spreadsheets</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectSheets()">
                        Connect
                    </button>
                </div>
                
                <div class="integration-card" data-integration="powerbi">
                    <img src="./img/integrations/powerbi.png" alt="Power BI">
                    <h4>Power BI</h4>
                    <p>Create custom dashboards</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectPowerBI()">
                        Connect
                    </button>
                </div>
                
                <div class="integration-card" data-integration="tableau">
                    <img src="./img/integrations/tableau.png" alt="Tableau">
                    <h4>Tableau</h4>
                    <p>Advanced data visualization</p>
                    <button class="connect-btn" onclick="window.enterpriseIntegrations.connectTableau()">
                        Connect
                    </button>
                </div>
            </div>
        `;
        
        // Add to integration section
        const integrationsSection = document.getElementById('integrations-section');
        if (integrationsSection) {
            integrationsSection.appendChild(integrationPanel);
        }
    }
    
    /**
     * Setup OAuth handlers for integrations
     */
    setupOAuthHandlers() {
        // Listen for OAuth callbacks
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;
            
            if (event.data.type === 'oauth-success') {
                this.handleOAuthSuccess(event.data);
            }
        });
    }
    
    /**
     * Connect to Salesforce
     */
    async connectSalesforce() {
        const authUrl = `https://login.salesforce.com/services/oauth2/authorize?` +
            `response_type=code&` +
            `client_id=${this.getSalesforceClientId()}&` +
            `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/salesforce')}&` +
            `scope=api%20refresh_token`;
        
        this.openOAuthWindow(authUrl, 'salesforce');
    }
    
    /**
     * Connect to Slack
     */
    async connectSlack() {
        const authUrl = `https://slack.com/oauth/v2/authorize?` +
            `client_id=${this.getSlackClientId()}&` +
            `scope=chat:write,files:write&` +
            `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/slack')}`;
        
        this.openOAuthWindow(authUrl, 'slack');
    }
    
    /**
     * Connect to Microsoft Teams
     */
    async connectTeams() {
        const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
            `client_id=${this.getTeamsClientId()}&` +
            `response_type=code&` +
            `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/teams')}&` +
            `scope=https://graph.microsoft.com/User.Read`;
        
        this.openOAuthWindow(authUrl, 'teams');
    }
    
    /**
     * Connect to Google Sheets
     */
    async connectSheets() {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${this.getSheetsClientId()}&` +
            `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/sheets')}&` +
            `response_type=code&` +
            `scope=https://www.googleapis.com/auth/spreadsheets`;
        
        this.openOAuthWindow(authUrl, 'sheets');
    }
    
    /**
     * Export to Salesforce
     */
    async exportToSalesforce(data) {
        if (!this.integrations.salesforce) {
            this.showNotification('Please connect to Salesforce first', 'warning');
            return;
        }
        
        try {
            const opportunityData = {
                Name: `NAC TCO Analysis - ${new Date().toLocaleDateString()}`,
                StageName: 'Proposal/Price Quote',
                CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                Amount: data.totalSavings,
                Description: this.generateSalesforceDescription(data),
                Type: 'New Business',
                LeadSource: 'TCO Analysis Tool'
            };
            
            const response = await this.makeAPICall('salesforce', 'POST', '/services/data/v53.0/sobjects/Opportunity', opportunityData);
            
            if (response.success) {
                this.showNotification('Analysis exported to Salesforce!', 'success');
                return response.id;
            }
        } catch (error) {
            console.error('Salesforce export failed:', error);
            this.showNotification('Failed to export to Salesforce', 'error');
        }
    }
    
    /**
     * Share on Slack
     */
    async shareOnSlack(data) {
        if (!this.integrations.slack) {
            this.showNotification('Please connect to Slack first', 'warning');
            return;
        }
        
        try {
            const message = {
                text: '📊 NAC TCO Analysis Results',
                blocks: [
                    {
                        type: 'header',
                        text: {
                            type: 'plain_text',
                            text: '📊 NAC TCO Analysis Results'
                        }
                    },
                    {
                        type: 'section',
                        fields: [
                            {
                                type: 'mrkdwn',
                                text: `*Total Savings:*\n$${(data.totalSavings / 1000).toFixed(0)}K`
                            },
                            {
                                type: 'mrkdwn',
                                text: `*ROI:*\n${data.roi}%`
                            },
                            {
                                type: 'mrkdwn',
                                text: `*Payback:*\n${data.paybackMonths} months`
                            },
                            {
                                type: 'mrkdwn',
                                text: `*Winner:*\nPortnox Cloud`
                            }
                        ]
                    },
                    {
                        type: 'actions',
                        elements: [
                            {
                                type: 'button',
                                text: {
                                    type: 'plain_text',
                                    text: 'View Full Analysis'
                                },
                                url: `${window.location.origin}?session=${data.sessionId}`
                            }
                        ]
                    }
                ]
            };
            
            const response = await this.makeAPICall('slack', 'POST', '/api/chat.postMessage', {
                channel: '#sales-team',
                ...message
            });
            
            if (response.ok) {
                this.showNotification('Analysis shared on Slack!', 'success');
            }
        } catch (error) {
            console.error('Slack share failed:', error);
            this.showNotification('Failed to share on Slack', 'error');
        }
    }
    
    /**
     * Export to Google Sheets
     */
    async exportToSheets(data) {
        if (!this.integrations.sheets) {
            this.showNotification('Please connect to Google Sheets first', 'warning');
            return;
        }
        
        try {
            // Create spreadsheet structure
            const spreadsheetData = {
                properties: {
                    title: `NAC TCO Analysis - ${new Date().toLocaleDateString()}`
                },
                sheets: [
                    {
                        properties: { title: 'Summary' },
                        data: this.createSummarySheet(data)
                    },
                    {
                        properties: { title: 'Vendor Comparison' },
                        data: this.createVendorComparisonSheet(data)
                    },
                    {
                        properties: { title: 'Cost Breakdown' },
                        data: this.createCostBreakdownSheet(data)
                    }
                ]
            };
            
            const response = await this.makeAPICall('sheets', 'POST', '/v4/spreadsheets', spreadsheetData);
            
            if (response.spreadsheetId) {
                this.showNotification('Analysis exported to Google Sheets!', 'success');
                window.open(`https://docs.google.com/spreadsheets/d/${response.spreadsheetId}`, '_blank');
            }
        } catch (error) {
            console.error('Sheets export failed:', error);
            this.showNotification('Failed to export to Google Sheets', 'error');
        }
    }
    
    /**
     * Create Power BI dataset
     */
    async createPowerBIDataset(data) {
        if (!this.integrations.powerbi) {
            this.showNotification('Please connect to Power BI first', 'warning');
            return;
        }
        
        try {
            const dataset = {
                name: `NAC TCO Analysis ${new Date().toISOString()}`,
                tables: [
                    {
                        name: 'VendorAnalysis',
                        columns: [
                            { name: 'VendorName', dataType: 'string' },
                            { name: 'TCO3Year', dataType: 'double' },
                            { name: 'SecurityScore', dataType: 'int64' },
                            { name: 'DeploymentDays', dataType: 'int64' },
                            { name: 'ROI', dataType: 'double' }
                        ],
                        rows: this.transformDataForPowerBI(data)
                    }
                ]
            };
            
            const response = await this.makeAPICall('powerbi', 'POST', '/datasets', dataset);
            
            if (response.id) {
                this.showNotification('Dataset created in Power BI!', 'success');
                return response.id;
            }
        } catch (error) {
            console.error('Power BI export failed:', error);
            this.showNotification('Failed to create Power BI dataset', 'error');
        }
    }
    
    /**
     * Open OAuth window
     */
    openOAuthWindow(url, provider) {
        const width = 600;
        const height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        const authWindow = window.open(
            url,
            `${provider}Auth`,
            `width=${width},height=${height},left=${left},top=${top}`
        );
        
        // Check for window close
        const checkInterval = setInterval(() => {
            if (authWindow.closed) {
                clearInterval(checkInterval);
                this.checkAuthStatus(provider);
            }
        }, 1000);
    }
    
    /**
     * Handle OAuth success
     */
    handleOAuthSuccess(data) {
        const { provider, token } = data;
        this.integrations[provider] = { token, connected: true };
        
        // Update UI
        const card = document.querySelector(`[data-integration="${provider}"]`);
        if (card) {
            card.classList.add('connected');
            card.querySelector('.connect-btn').textContent = 'Connected';
        }
        
        this.showNotification(`Connected to ${provider}!`, 'success');
    }
    
    /**
     * Make API call to integration
     */
    async makeAPICall(provider, method, endpoint, data) {
        const integration = this.integrations[provider];
        if (!integration || !integration.token) {
            throw new Error(`Not connected to ${provider}`);
        }
        
        const response = await fetch(`${this.apiEndpoint}/${provider}${endpoint}`, {
            method: method,
            headers: {
                'Authorization': `Bearer ${integration.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    /**
     * Helper methods for OAuth
     */
    getSalesforceClientId() {
        return process.env.SALESFORCE_CLIENT_ID || 'demo_client_id';
    }
    
    getSlackClientId() {
        return process.env.SLACK_CLIENT_ID || 'demo_client_id';
    }
    
    getTeamsClientId() {
        return process.env.TEAMS_CLIENT_ID || 'demo_client_id';
    }
    
    getSheetsClientId() {
        return process.env.SHEETS_CLIENT_ID || 'demo_client_id';
    }
    
    /**
     * Check integration availability
     */
    checkSalesforceAvailability() {
        return typeof window.sforce !== 'undefined' || !!this.getSalesforceClientId();
    }
    
    checkSlackAvailability() {
        return !!this.getSlackClientId();
    }
    
    checkTeamsAvailability() {
        return !!this.getTeamsClientId();
    }
    
    checkGoogleSheetsAvailability() {
        return !!this.getSheetsClientId();
    }
    
    checkPowerBIAvailability() {
        return !!process.env.POWERBI_CLIENT_ID;
    }
    
    checkTableauAvailability() {
        return !!process.env.TABLEAU_CLIENT_ID;
    }
    
    /**
     * Show notification
     */
    showNotification(message, type) {
        if (window.uiWorkflowEnhancements) {
            window.uiWorkflowEnhancements.showNotification(message, type);
        }
    }
}

// Create global instance
window.enterpriseIntegrations = new EnterpriseIntegrations();

// Auto-initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.enterpriseIntegrations.init();
    }, 2000);
});

console.log('✅ Enterprise Integrations module loaded');
