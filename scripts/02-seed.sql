-- This script seeds the vendors table with initial data.
-- For larger datasets, using a script (e.g., Node.js) to programmatically insert data is more robust.

-- Clear existing data
TRUNCATE TABLE vendors RESTART IDENTITY CASCADE;

-- Insert Portnox
INSERT INTO vendors (id, name, vendor_type, logo_url, description, strengths, weaknesses, features, pricing, compliance, tco_factors) VALUES
('portnox', 'Portnox', 'Cloud-Native NAC', '/portnox-logo.png', 'Portnox is a cloud-native NAC platform that provides comprehensive network access control, visibility, and security for any device, anywhere.',
ARRAY['Cloud-native architecture', 'Rapid deployment', 'Zero-trust security model', 'Extensive integration ecosystem'],
ARRAY['Newer market entrant', 'Advanced features may require higher tiers'],
'{"access_control": "Comprehensive", "device_visibility": "High", "automation": "High", "iot_security": "Advanced", "guest_access": "Yes", "reporting": "Advanced"}',
'{"model": "Subscription", "tiers": ["Core", "Advanced", "Premium"], "base_cost": 50000}',
'{"soc2": true, "iso27001": true, "pci_dss": true, "hipaa": true}',
'{"implementation_cost": 15000, "operational_overhead": 20000, "licensing_cost": 50000}');

-- Insert Cisco ISE
INSERT INTO vendors (id, name, vendor_type, logo_url, description, strengths, weaknesses, features, pricing, compliance, tco_factors) VALUES
('cisco_ise', 'Cisco ISE', 'Traditional NAC', '/cisco-logo.png', 'Cisco Identity Services Engine (ISE) is a market-leading NAC solution that provides centralized policy control for wired, wireless, and VPN access.',
ARRAY['Market leader', 'Deep integration with Cisco hardware', 'Extensive feature set', 'Mature and stable platform'],
ARRAY['High complexity', 'Significant hardware footprint', 'Expensive licensing', 'Requires specialized expertise'],
'{"access_control": "Comprehensive", "device_visibility": "High", "automation": "Medium", "iot_security": "Medium", "guest_access": "Yes", "reporting": "Comprehensive"}',
'{"model": "Perpetual + Subscription", "tiers": ["Base", "Plus", "Apex"], "base_cost": 120000}',
'{"soc2": true, "iso27001": true, "pci_dss": true, "hipaa": true}',
'{"implementation_cost": 80000, "operational_overhead": 60000, "licensing_cost": 120000}');

-- Insert Aruba ClearPass
INSERT INTO vendors (id, name, vendor_type, logo_url, description, strengths, weaknesses, features, pricing, compliance, tco_factors) VALUES
('aruba_clearpass', 'Aruba ClearPass', 'Traditional NAC', '/aruba-logo.png', 'Aruba ClearPass Policy Manager provides role- and device-based network access control for any user across any multivendor wired, wireless, and VPN infrastructure.',
ARRAY['Strong multivendor support', 'Flexible policy engine', 'Good for BYOD scenarios'],
ARRAY['Can be complex to configure', 'Licensing can be confusing', 'Hardware appliance model'],
'{"access_control": "Comprehensive", "device_visibility": "High", "automation": "Medium", "iot_security": "Medium", "guest_access": "Yes", "reporting": "Advanced"}',
'{"model": "Perpetual + Subscription", "tiers": ["Standard", "Enterprise"], "base_cost": 90000}',
'{"soc2": true, "iso27001": true, "pci_dss": true, "hipaa": true}',
'{"implementation_cost": 60000, "operational_overhead": 50000, "licensing_cost": 90000}');

-- Insert Forescout
INSERT INTO vendors (id, name, vendor_type, logo_url, description, strengths, weaknesses, features, pricing, compliance, tco_factors) VALUES
('forescout', 'Forescout', 'Agentless NAC', '/forescout-logo.png', 'Forescout provides agentless visibility and control of all devices connected to the network, including IT, IoT, and OT.',
ARRAY['Excellent device visibility', 'Agentless approach', 'Strong OT/ICS security features'],
ARRAY['High cost', 'Can be complex to manage', 'Performance can be an issue in large networks'],
'{"access_control": "Comprehensive", "device_visibility": "Excellent", "automation": "High", "iot_security": "Excellent", "guest_access": "Yes", "reporting": "Comprehensive"}',
'{"model": "Perpetual + Subscription", "tiers": ["Standard", "Advanced"], "base_cost": 150000}',
'{"soc2": true, "iso27001": true, "pci_dss": true, "hipaa": true}',
'{"implementation_cost": 90000, "operational_overhead": 70000, "licensing_cost": 150000}');

-- Insert Fortinet NAC
INSERT INTO vendors (id, name, vendor_type, logo_url, description, strengths, weaknesses, features, pricing, compliance, tco_factors) VALUES
('fortinet_nac', 'Fortinet NAC', 'Integrated NAC', '/fortinet-logo.png', 'Fortinet NAC is part of the Fortinet Security Fabric, providing visibility, control, and automated response for everything that connects to the network.',
ARRAY['Integration with Fortinet Security Fabric', 'Good value', 'Simplified management within Fortinet ecosystem'],
ARRAY['Best suited for Fortinet-heavy environments', 'Feature set may not be as deep as specialized NAC vendors'],
'{"access_control": "Good", "device_visibility": "Good", "automation": "High (within Fabric)", "iot_security": "Good", "guest_access": "Yes", "reporting": "Good"}',
'{"model": "Subscription", "tiers": ["Standard"], "base_cost": 40000}',
'{"soc2": true, "iso27001": true, "pci_dss": true, "hipaa": true}',
'{"implementation_cost": 20000, "operational_overhead": 25000, "licensing_cost": 40000}');
