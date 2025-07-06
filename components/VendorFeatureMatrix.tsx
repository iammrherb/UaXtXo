import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
// Custom table implementation to avoid unsupported imports
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell, Tooltip as RechartsTooltip,
  Area, AreaChart, ComposedChart, Scatter, ScatterChart, PieChart, Pie, Treemap, Sankey
} from 'recharts';
import {
  Calculator, TrendingUp, Shield, AlertTriangle, DollarSign, Users, Building,
  Clock, Award, CheckCircle, XCircle, Info, FileText, Download, Eye,
  Lock, Unlock, Server, Cloud, Cpu, HardDrive, Network, Zap,
  ShieldCheck, AlertOctagon, TrendingDown, BarChart3, Layers
} from 'lucide-react';

// Comprehensive Vendor Feature Matrix Component
export function VendorFeatureMatrix() {
  const features = {
    'Core NAC Features': {
      '802.1X Authentication': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: true, foxpass: true, packetfence: true, securew2: true, extreme: true, arista: true, ivanti: true },
      'MAC Authentication Bypass': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: true, foxpass: true, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true },
      'Guest Access Management': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true },
      'BYOD Onboarding': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: true, securew2: true, extreme: true, arista: true, ivanti: true },
      'Device Profiling': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: false, microsoft: false, foxpass: false, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true },
      'Posture Assessment': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: false, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: true, arista: true, ivanti: true }
    },
    'Zero Trust Capabilities': {
      'Continuous Verification': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: false, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: true, arista: true, ivanti: true },
      'Risk-Based Access': { portnox: true, cisco: false, aruba: false, juniper: true, forescout: false, meraki: false, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: false, arista: true, ivanti: false },
      'Micro-Segmentation': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true },
      'Behavior Analytics': { portnox: true, cisco: false, aruba: false, juniper: true, forescout: false, meraki: false, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: false, arista: true, ivanti: false },
      'Automated Response': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: true, arista: true, ivanti: true }
    },
    'Deployment & Management': {
      'Cloud-Native Architecture': { portnox: true, cisco: false, aruba: false, juniper: true, forescout: false, meraki: true, microsoft: false, foxpass: true, packetfence: false, securew2: true, extreme: false, arista: true, ivanti: false },
      'No Hardware Required': { portnox: true, cisco: false, aruba: false, juniper: true, forescout: false, meraki: true, microsoft: false, foxpass: true, packetfence: false, securew2: true, extreme: false, arista: true, ivanti: false },
      'Multi-Site Support': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: true, foxpass: true, packetfence: true, securew2: true, extreme: true, arista: true, ivanti: true },
      'API Availability': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: true, packetfence: true, securew2: true, extreme: true, arista: true, ivanti: true },
      'SaaS Management': { portnox: true, cisco: false, aruba: false, juniper: true, forescout: false, meraki: true, microsoft: false, foxpass: true, packetfence: false, securew2: true, extreme: false, arista: true, ivanti: false }
    },
    'Integration Capabilities': {
      'SIEM Integration': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true },
      'MDM Integration': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: false, foxpass: false, packetfence: false, securew2: false, extreme: true, arista: true, ivanti: true },
      'Cloud IdP Support': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: true, microsoft: true, foxpass: true, packetfence: false, securew2: true, extreme: true, arista: true, ivanti: true },
      'Firewall Integration': { portnox: true, cisco: true, aruba: true, juniper: true, forescout: true, meraki: false, microsoft: false, foxpass: false, packetfence: true, securew2: false, extreme: true, arista: true, ivanti: true }
    }
  };

  const vendors = ['portnox', 'cisco', 'aruba', 'juniper', 'forescout', 'meraki', 'microsoft', 'foxpass', 'packetfence', 'securew2', 'extreme', 'arista', 'ivanti'];
  const vendorNames = {
    portnox: 'Portnox CLEAR',
    cisco: 'Cisco ISE',
    aruba: 'Aruba ClearPass',
    juniper: 'Juniper Mist',
    forescout: 'Forescout',
    meraki: 'Meraki AC',
    microsoft: 'Microsoft NPS',
    foxpass: 'FoxPass',
    packetfence: 'PacketFence',
    securew2: 'SecureW2',
    extreme: 'Extreme NAC',
    arista: 'Arista Agni',
    ivanti: 'Ivanti Pulse'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comprehensive Vendor Feature Comparison</CardTitle>
        <CardDescription>Detailed capability matrix across all NAC vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="sticky left-0 bg-background z-10 w-[250px] text-left p-4">Feature</th>
                  {vendors.map(vendor => (
                    <th key={vendor} className="text-center min-w-[120px] p-4">
                      {vendorNames[vendor]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(features).map(([category, categoryFeatures]) => (
                  <React.Fragment key={category}>
                    <tr>
                      <td colSpan={vendors.length + 1} className="bg-muted font-semibold p-4">
                        {category}
                      </td>
                    </tr>
                    {Object.entries(categoryFeatures).map(([feature, vendorSupport]) => (
                      <tr key={feature} className="border-b">
                        <td className="sticky left-0 bg-background z-10 p-4">{feature}</td>
                        {vendors.map(vendor => (
                          <td key={vendor} className="text-center p-4">
                            {vendorSupport[vendor] ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
