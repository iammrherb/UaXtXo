-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  pricing_model VARCHAR(100) NOT NULL,
  base_cost DECIMAL(10,2) DEFAULT 0,
  per_user_cost DECIMAL(10,2) DEFAULT 0,
  setup_cost DECIMAL(10,2) DEFAULT 0,
  annual_discount DECIMAL(5,2) DEFAULT 0,
  features JSONB DEFAULT '[]',
  compliance_certifications JSONB DEFAULT '[]',
  security_features JSONB DEFAULT '[]',
  integration_capabilities JSONB DEFAULT '[]',
  support_tiers JSONB DEFAULT '[]',
  deployment_options JSONB DEFAULT '[]',
  scalability_limits JSONB DEFAULT '{}',
  vendor_lock_in_risk VARCHAR(50) DEFAULT 'medium',
  market_position VARCHAR(50) DEFAULT 'established',
  financial_stability VARCHAR(50) DEFAULT 'stable',
  innovation_score INTEGER DEFAULT 7,
  customer_satisfaction DECIMAL(3,1) DEFAULT 8.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AI insights cache table
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_ids JSONB NOT NULL,
  industry VARCHAR(100) NOT NULL,
  org_size VARCHAR(100) NOT NULL,
  insight_type VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.8,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_data JSONB NOT NULL,
  vendor_ids JSONB NOT NULL,
  industry VARCHAR(100) NOT NULL,
  org_size VARCHAR(100) NOT NULL,
  created_by VARCHAR(255) DEFAULT 'system',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category);
CREATE INDEX IF NOT EXISTS idx_ai_insights_lookup ON ai_insights(vendor_ids, industry, org_size, insight_type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_expires ON ai_insights(expires_at);
CREATE INDEX IF NOT EXISTS idx_reports_vendor_ids ON reports USING GIN(vendor_ids);
