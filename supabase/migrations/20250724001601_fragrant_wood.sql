-- Enhanced TCO Analyzer Database Schema

-- Vendors table with comprehensive data
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('leader', 'challenger', 'visionary', 'niche')),
  market_share DECIMAL(5,2) NOT NULL,
  deployment_type TEXT NOT NULL CHECK (deployment_type IN ('cloud', 'on-premise', 'hybrid')),
  logo_url TEXT,
  description TEXT NOT NULL,
  website_url TEXT,
  founded_year INTEGER,
  headquarters TEXT,
  employee_count INTEGER,
  annual_revenue BIGINT,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor pricing models
CREATE TABLE IF NOT EXISTS vendor_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  pricing_model TEXT NOT NULL CHECK (pricing_model IN ('per-device', 'per-user', 'flat-rate', 'quote-based')),
  base_price DECIMAL(12,2) DEFAULT 0,
  price_per_device DECIMAL(8,2) DEFAULT 0,
  price_per_user DECIMAL(8,2) DEFAULT 0,
  minimum_devices INTEGER DEFAULT 0,
  volume_discounts JSONB DEFAULT '{}',
  contract_terms JSONB DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Additional costs breakdown
CREATE TABLE IF NOT EXISTS vendor_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  cost_type TEXT NOT NULL CHECK (cost_type IN ('hardware', 'services', 'training', 'maintenance', 'support', 'integration')),
  cost_amount DECIMAL(12,2) NOT NULL,
  cost_frequency TEXT NOT NULL CHECK (cost_frequency IN ('one-time', 'annual', 'monthly')),
  description TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Implementation details
CREATE TABLE IF NOT EXISTS vendor_implementation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  time_to_deploy_days INTEGER NOT NULL,
  complexity TEXT NOT NULL CHECK (complexity IN ('low', 'medium', 'high')),
  professional_services_required BOOLEAN DEFAULT FALSE,
  training_hours INTEGER DEFAULT 0,
  required_fte_technical DECIMAL(3,1) DEFAULT 0,
  required_fte_administrative DECIMAL(3,1) DEFAULT 0,
  deployment_phases JSONB DEFAULT '[]',
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Security metrics
CREATE TABLE IF NOT EXISTS vendor_security (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  security_rating INTEGER NOT NULL CHECK (security_rating >= 0 AND security_rating <= 100),
  cve_count INTEGER DEFAULT 0,
  critical_cve_count INTEGER DEFAULT 0,
  last_security_incident DATE,
  zero_trust_maturity INTEGER DEFAULT 0 CHECK (zero_trust_maturity >= 0 AND zero_trust_maturity <= 100),
  compliance_frameworks TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Feature capabilities
CREATE TABLE IF NOT EXISTS vendor_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  feature_category TEXT NOT NULL,
  feature_name TEXT NOT NULL,
  support_level TEXT NOT NULL CHECK (support_level IN ('native', 'add-on', 'partial', 'none')),
  description TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Market intelligence
CREATE TABLE IF NOT EXISTS market_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id TEXT NOT NULL REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(12,2),
  metric_unit TEXT,
  source TEXT,
  confidence_level INTEGER DEFAULT 80 CHECK (confidence_level >= 0 AND confidence_level <= 100),
  report_date DATE NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- User calculations and scenarios
CREATE TABLE IF NOT EXISTS user_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- For future user management
  session_id TEXT NOT NULL,
  configuration JSONB NOT NULL,
  selected_vendors TEXT[] NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Industry benchmarks
CREATE TABLE IF NOT EXISTS industry_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(12,2) NOT NULL,
  metric_unit TEXT,
  source TEXT,
  year INTEGER NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_implementation ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_security ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_benchmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to vendor data
CREATE POLICY "Public read access for vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Public read access for vendor_pricing" ON vendor_pricing FOR SELECT USING (true);
CREATE POLICY "Public read access for vendor_costs" ON vendor_costs FOR SELECT USING (true);
CREATE POLICY "Public read access for vendor_implementation" ON vendor_implementation FOR SELECT USING (true);
CREATE POLICY "Public read access for vendor_security" ON vendor_security FOR SELECT USING (true);
CREATE POLICY "Public read access for vendor_features" ON vendor_features FOR SELECT USING (true);
CREATE POLICY "Public read access for market_intelligence" ON market_intelligence FOR SELECT USING (true);
CREATE POLICY "Public read access for industry_benchmarks" ON industry_benchmarks FOR SELECT USING (true);

-- User calculations can be read/written by session
CREATE POLICY "Session access for user_calculations" ON user_calculations 
  FOR ALL USING (session_id = current_setting('app.session_id', true));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vendors_vendor_id ON vendors(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_pricing_vendor_id ON vendor_pricing(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_costs_vendor_id ON vendor_costs(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_implementation_vendor_id ON vendor_implementation(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_security_vendor_id ON vendor_security(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_features_vendor_id ON vendor_features(vendor_id);
CREATE INDEX IF NOT EXISTS idx_market_intelligence_vendor_id ON market_intelligence(vendor_id);
CREATE INDEX IF NOT EXISTS idx_user_calculations_session_id ON user_calculations(session_id);
CREATE INDEX IF NOT EXISTS idx_industry_benchmarks_industry ON industry_benchmarks(industry);