// AI Settings Manager
// Manages AI provider configurations and settings persistence

export interface AIProvider {
  name: string
  displayName: string
  enabled: boolean
  apiKey: string
  model?: string
  maxTokens?: number
  temperature?: number
  configured: boolean
}

export interface AISettings {
  providers: {
    openai: AIProvider
    anthropic: AIProvider
    gemini: AIProvider
  }
  defaultProvider: "openai" | "anthropic" | "gemini"
  features: {
    autoResearch: boolean
    enhancedReports: boolean
    competitiveAnalysis: boolean
    industryInsights: boolean
    riskAssessment: boolean
    implementationGuidance: boolean
  }
  prompts: {
    executiveSummary: { openai: string; anthropic: string; gemini: string }
    technicalAnalysis: { openai: string; anthropic: string; gemini: string }
    competitiveComparison: { openai: string; anthropic: string; gemini: string }
    riskAssessment: { openai: string; anthropic: string; gemini: string }
    implementationPlan: { openai: string; anthropic: string; gemini: string }
    costOptimization: { openai: string; anthropic: string; gemini: string }
    custom: Array<{
      id: string
      name: string
      description: string
      category: "custom" | "research" | "enhancement" | "analysis"
      prompt: string
      variables: string[]
    }>
  }
  usage: {
    totalTokens: number
    totalRequests: number
    costs: { openai: number; anthropic: number; gemini: number }
    lastReset: string
  }
  enhancementLevel: "basic" | "standard" | "advanced" | "maximum"
  cacheResults: boolean
  rateLimiting: boolean
  maxRequestsPerMinute: number
  timeout: number
  retryAttempts: number
  enableLogging: boolean
  logLevel: "error" | "warn" | "info" | "debug"
}

export interface AIUsageStats {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  totalTokensUsed: number
  averageResponseTime: number
  lastUsed: Date
  monthlyUsage: Record<string, number>
  providerUsage: Record<string, number>
}

class AISettingsManager {
  private settings: AISettings
  private usageStats: AIUsageStats
  private readonly STORAGE_KEY = "portnox-ai-settings"
  private readonly STATS_KEY = "portnox-ai-usage-stats"

  constructor() {
    this.settings = this.loadSettings()
    this.usageStats = this.loadUsageStats()
  }

  // Settings Management
  getSettings(): AISettings {
    return { ...this.settings }
  }

  updateSettings(newSettings: Partial<AISettings>): void {
    this.settings = { ...this.settings, ...newSettings }
    this.saveSettings()
  }

  resetSettings(): void {
    this.settings = this.getDefaultSettings()
    this.saveSettings()
  }

  // Provider Management
  updateProvider(providerName: keyof AISettings["providers"], updates: Partial<AIProvider>): void {
    this.settings.providers[providerName] = {
      ...this.settings.providers[providerName],
      ...updates,
      configured: Boolean(updates.apiKey || this.settings.providers[providerName].apiKey),
    }
    this.saveSettings()
  }

  updateProviderSettings(provider: "openai" | "anthropic" | "gemini", updates: Partial<AIProvider>): void {
    this.updateProvider(provider, updates)
  }

  // Features Management
  updateFeatures(updates: Partial<AISettings["features"]>): void {
    this.settings.features = { ...this.settings.features, ...updates }
    this.saveSettings()
  }

  // Prompts Management
  updatePrompt(category: keyof AISettings["prompts"], provider: "openai" | "anthropic" | "gemini", prompt: string): void {
    if (category === "custom") return // Custom prompts handled separately
    
    if (!this.settings.prompts[category]) {
      this.settings.prompts[category] = { openai: "", anthropic: "", gemini: "" }
    }
    this.settings.prompts[category][provider] = prompt
    this.saveSettings()
  }

  addCustomPrompt(prompt: {
    name: string
    description: string
    category: "custom" | "research" | "enhancement" | "analysis"
    prompt: string
    variables: string[]
  }): void {
    const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.settings.prompts.custom.push({ id, ...prompt })
    this.saveSettings()
  }

  deleteCustomPrompt(id: string): void {
    this.settings.prompts.custom = this.settings.prompts.custom.filter(p => p.id !== id)
    this.saveSettings()
  }

  // Default Provider Management
  setDefaultProvider(provider: "openai" | "anthropic" | "gemini"): void {
    this.settings.defaultProvider = provider
    this.saveSettings()
  }

  // Connection Testing
  async testConnection(provider: "openai" | "anthropic" | "gemini"): Promise<boolean> {
    const providerSettings = this.settings.providers[provider]
    if (!providerSettings.apiKey) return false
    
    // Mock test - in real implementation, this would make actual API calls
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
  }

  // Reset and Import/Export
  resetToDefaults(): void {
    this.settings = this.getDefaultSettings()
    this.saveSettings()
  }

  importSettings(settingsJson: string): { success: boolean; error?: string } {
    return this.importConfiguration(settingsJson)
  }

  getProvider(providerName: keyof AISettings["providers"]): AIProvider {
    return { ...this.settings.providers[providerName] }
  }

  getEnabledProviders(): AIProvider[] {
    return Object.values(this.settings.providers).filter((provider) => provider.enabled && provider.configured)
  }

  isProviderConfigured(providerName: keyof AISettings["providers"]): boolean {
    const provider = this.settings.providers[providerName]
    return provider.enabled && provider.configured && Boolean(provider.apiKey)
  }

  // API Key Management
  setApiKey(providerName: keyof AISettings["providers"], apiKey: string): void {
    this.updateProvider(providerName, {
      apiKey,
      configured: Boolean(apiKey),
      enabled: Boolean(apiKey),
    })
  }

  getApiKey(providerName: keyof AISettings["providers"]): string | null {
    const provider = this.settings.providers[providerName]
    return provider.configured ? provider.apiKey : null
  }

  validateApiKey(providerName: keyof AISettings["providers"], apiKey: string): boolean {
    // Basic validation - in real implementation, this would test the API
    switch (providerName) {
      case "openai":
        return apiKey.startsWith("sk-") && apiKey.length > 20
      case "anthropic":
        return apiKey.startsWith("sk-ant-") && apiKey.length > 20
      case "gemini":
        return apiKey.length > 20
      default:
        return false
    }
  }

  // Usage Statistics
  getUsageStats(): AIUsageStats {
    return { ...this.usageStats }
  }

  recordUsage(providerName: string, tokens: number, responseTime: number, success: boolean): void {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format

    this.usageStats.totalRequests++
    if (success) {
      this.usageStats.successfulRequests++
    } else {
      this.usageStats.failedRequests++
    }

    this.usageStats.totalTokensUsed += tokens
    this.usageStats.averageResponseTime =
      (this.usageStats.averageResponseTime * (this.usageStats.totalRequests - 1) + responseTime) /
      this.usageStats.totalRequests

    this.usageStats.lastUsed = new Date()

    // Monthly usage tracking
    if (!this.usageStats.monthlyUsage[currentMonth]) {
      this.usageStats.monthlyUsage[currentMonth] = 0
    }
    this.usageStats.monthlyUsage[currentMonth] += tokens

    // Provider usage tracking
    if (!this.usageStats.providerUsage[providerName]) {
      this.usageStats.providerUsage[providerName] = 0
    }
    this.usageStats.providerUsage[providerName] += tokens

    this.saveUsageStats()
  }

  resetUsageStats(): void {
    this.usageStats = this.getDefaultUsageStats()
    this.saveUsageStats()
  }

  // Configuration Validation
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    const enabledProviders = this.getEnabledProviders()

    if (enabledProviders.length === 0) {
      errors.push("At least one AI provider must be configured and enabled")
    }

    // Validate default provider
    if (!this.isProviderConfigured(this.settings.defaultProvider)) {
      errors.push(`Default provider '${this.settings.defaultProvider}' is not properly configured`)
    }

    // Validate rate limiting settings
    if (this.settings.rateLimiting && this.settings.maxRequestsPerMinute <= 0) {
      errors.push("Max requests per minute must be greater than 0 when rate limiting is enabled")
    }

    // Validate timeout settings
    if (this.settings.timeout <= 0) {
      errors.push("Timeout must be greater than 0")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Export/Import Configuration
  exportConfiguration(): string {
    const exportData = {
      settings: { ...this.settings },
      usageStats: { ...this.usageStats },
      exportedAt: new Date().toISOString(),
    }

    // Remove sensitive API keys from export
    Object.keys(exportData.settings.providers).forEach((key) => {
      const providerKey = key as keyof AISettings["providers"]
      exportData.settings.providers[providerKey].apiKey = ""
    })

    return JSON.stringify(exportData, null, 2)
  }

  importConfiguration(configJson: string): { success: boolean; error?: string } {
    try {
      const importData = JSON.parse(configJson)

      if (!importData.settings) {
        return { success: false, error: "Invalid configuration format" }
      }

      // Merge with current settings, preserving API keys
      const currentApiKeys = {
        openai: this.settings.providers.openai.apiKey,
        anthropic: this.settings.providers.anthropic.apiKey,
        gemini: this.settings.providers.gemini.apiKey,
      }

      this.settings = { ...this.getDefaultSettings(), ...importData.settings }

      // Restore API keys
      Object.keys(currentApiKeys).forEach((key) => {
        const providerKey = key as keyof AISettings["providers"]
        if (currentApiKeys[providerKey]) {
          this.settings.providers[providerKey].apiKey = currentApiKeys[providerKey]
          this.settings.providers[providerKey].configured = true
        }
      })

      this.saveSettings()
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to parse configuration JSON" }
    }
  }

  // Private Methods
  private loadSettings(): AISettings {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          return { ...this.getDefaultSettings(), ...parsed }
        }
      }
    } catch (error) {
      console.warn("Failed to load AI settings from localStorage:", error)
    }
    return this.getDefaultSettings()
  }

  private saveSettings(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings))
      }
    } catch (error) {
      console.warn("Failed to save AI settings to localStorage:", error)
    }
  }

  private loadUsageStats(): AIUsageStats {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem(this.STATS_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          return { ...this.getDefaultUsageStats(), ...parsed }
        }
      }
    } catch (error) {
      console.warn("Failed to load AI usage stats from localStorage:", error)
    }
    return this.getDefaultUsageStats()
  }

  private saveUsageStats(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.STATS_KEY, JSON.stringify(this.usageStats))
      }
    } catch (error) {
      console.warn("Failed to save AI usage stats to localStorage:", error)
    }
  }

  private getDefaultSettings(): AISettings {
    return {
      providers: {
        openai: {
          name: "openai",
          displayName: "OpenAI GPT",
          enabled: false,
          apiKey: "",
          model: "gpt-4",
          maxTokens: 4000,
          temperature: 0.7,
          configured: false,
        },
        anthropic: {
          name: "anthropic",
          displayName: "Anthropic Claude",
          enabled: false,
          apiKey: "",
          model: "claude-3-sonnet-20240229",
          maxTokens: 4000,
          temperature: 0.7,
          configured: false,
        },
        gemini: {
          name: "gemini",
          displayName: "Google Gemini",
          enabled: false,
          apiKey: "",
          model: "gemini-pro",
          maxTokens: 4000,
          temperature: 0.7,
          configured: false,
        },
      },
      defaultProvider: "openai",
      features: {
        autoResearch: true,
        enhancedReports: true,
        competitiveAnalysis: true,
        industryInsights: true,
        riskAssessment: true,
        implementationGuidance: true,
      },
      usage: {
        totalTokens: 0,
        totalRequests: 0,
        costs: { openai: 0, anthropic: 0, gemini: 0 },
        lastReset: new Date().toISOString(),
      },
      enhancementLevel: "standard",
      cacheResults: true,
      rateLimiting: true,
      maxRequestsPerMinute: 60,
      timeout: 30000,
      retryAttempts: 3,
      enableLogging: true,
      logLevel: "info",
      prompts: {
        executiveSummary: {
          openai: "Generate a comprehensive executive summary for a NAC vendor comparison analysis focused on business value, ROI, and strategic recommendations.",
          anthropic: "Create an executive-level summary that highlights key business decisions, ROI projections, and strategic implications of NAC vendor selection.",
          gemini: "Produce a high-level executive summary emphasizing business impact, cost savings, and strategic advantages of the recommended NAC solution."
        },
        technicalAnalysis: {
          openai: "Provide detailed technical analysis comparing NAC solutions including architecture, scalability, security features, and integration capabilities.",
          anthropic: "Analyze technical specifications, deployment models, performance metrics, and integration requirements for NAC solutions.",
          gemini: "Generate comprehensive technical evaluation covering security posture, architectural considerations, and operational capabilities."
        },
        competitiveComparison: {
          openai: "Create detailed competitive analysis comparing NAC solutions including strengths, weaknesses, and market positioning.",
          anthropic: "Analyze competitive landscape showing how each NAC vendor compares in features, pricing, and capabilities.",
          gemini: "Generate comprehensive competitive comparison highlighting market advantages and differentiation."
        },
        riskAssessment: {
          openai: "Evaluate security capabilities, threat detection, incident response, and vulnerability management across NAC solutions.",
          anthropic: "Assess security posture including zero trust maturity, threat protection, and security control effectiveness.",
          gemini: "Analyze security features, threat landscape coverage, and defensive capabilities of each NAC solution."
        },
        implementationPlan: {
          openai: "Create detailed implementation roadmap including phases, timelines, resources, and success criteria.",
          anthropic: "Develop comprehensive deployment plan with technical requirements, milestones, and risk mitigation.",
          gemini: "Generate implementation strategy covering technical deployment, change management, and success metrics."
        },
        costOptimization: {
          openai: "Analyze cost optimization opportunities including licensing strategies, resource planning, and ROI maximization.",
          anthropic: "Evaluate cost reduction strategies, budget optimization, and long-term financial planning for NAC deployment.",
          gemini: "Generate cost optimization recommendations including procurement strategies and operational efficiency."
        },
        custom: []
      }
    }
  }

  private getDefaultUsageStats(): AIUsageStats {
    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalTokensUsed: 0,
      averageResponseTime: 0,
      lastUsed: new Date(),
      monthlyUsage: {},
      providerUsage: {},
    }
  }
}

// Singleton instance
export const aiSettingsManager = new AISettingsManager()

// Utility functions
export function formatTokenUsage(tokens: number): string {
  if (tokens < 1000) return `${tokens} tokens`
  if (tokens < 1000000) return `${(tokens / 1000).toFixed(1)}K tokens`
  return `${(tokens / 1000000).toFixed(1)}M tokens`
}

export function calculateMonthlyCost(tokens: number, provider: string): number {
  // Approximate pricing per 1K tokens (as of 2024)
  const pricing = {
    openai: 0.03, // GPT-4 pricing
    anthropic: 0.025, // Claude pricing
    gemini: 0.02, // Gemini pricing
  }

  const pricePerToken = (pricing[provider as keyof typeof pricing] || 0.03) / 1000
  return tokens * pricePerToken
}

export function getProviderStatus(provider: AIProvider): "configured" | "partial" | "unconfigured" {
  if (provider.configured && provider.enabled && provider.apiKey) {
    return "configured"
  }
  if (provider.apiKey && !provider.enabled) {
    return "partial"
  }
  return "unconfigured"
}

export function validateProviderConfig(provider: AIProvider): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!provider.apiKey) {
    errors.push("API key is required")
  }

  if (!provider.model) {
    errors.push("Model selection is required")
  }

  if (provider.maxTokens && (provider.maxTokens < 100 || provider.maxTokens > 32000)) {
    errors.push("Max tokens must be between 100 and 32,000")
  }

  if (provider.temperature && (provider.temperature < 0 || provider.temperature > 2)) {
    errors.push("Temperature must be between 0 and 2")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Note: Types are already exported as interfaces above, no need to re-export
