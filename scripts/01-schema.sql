-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist to ensure a clean slate
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS ai_executive_summaries CASCADE;
DROP TABLE IF EXISTS ai_insights CASCADE;
DROP TABLE IF EXISTS ai_recommendations CASCADE;
DROP TABLE IF EXISTS ai_trend_analysis CASCADE;

-- Vendors Table: Stores all vendor-related information
CREATE TABLE vendors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    vendor_type TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    strengths TEXT[],
    weaknesses TEXT[],
    features JSONB,
    pricing JSONB,
    compliance JSONB,
    tco_factors JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Caching Tables
CREATE TABLE ai_executive_summaries (
    cache_key TEXT PRIMARY KEY,
    summary JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_insights (
    cache_key TEXT PRIMARY KEY,
    insights JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_recommendations (
    cache_key TEXT PRIMARY KEY,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_trend_analysis (
    cache_key TEXT PRIMARY KEY,
    analysis TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_summaries_created_at ON ai_executive_summaries(created_at);
CREATE INDEX idx_insights_created_at ON ai_insights(created_at);
CREATE INDEX idx_recommendations_created_at ON ai_recommendations(created_at);
CREATE INDEX idx_trend_analysis_created_at ON ai_trend_analysis(created_at);

COMMENT ON TABLE vendors IS 'Stores detailed information about each NAC vendor.';
COMMENT ON TABLE ai_executive_summaries IS 'Caches generated AI executive summaries.';
COMMENT ON TABLE ai_insights IS 'Caches generated AI insights.';
COMMENT ON TABLE ai_recommendations IS 'Caches generated AI smart recommendations.';
COMMENT ON TABLE ai_trend_analysis IS 'Caches generated AI trend analysis reports.';
