"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, Zap, Settings, TrendingUp, Users, Code, Network, Cloud } from "lucide-react"

const PortnoxPlatformView = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Portnox CLEAR Platform Overview</CardTitle>
          <CardDescription>
            A comprehensive view of the Portnox CLEAR platform and its key capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Security & Compliance */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>Security & Compliance</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Zero Trust Network Access</li>
                <li>Continuous Compliance Monitoring</li>
                <li>Automated Threat Response</li>
                <li>Risk-Based Access Control</li>
              </ul>
            </div>

            {/* Automation & Efficiency */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Automation & Efficiency</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Automated Device Onboarding</li>
                <li>Self-Service Guest Access</li>
                <li>Policy-Based Automation</li>
                <li>Real-Time Monitoring</li>
              </ul>
            </div>

            {/* Scalability & Flexibility */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-purple-500" />
                <span>Scalability & Flexibility</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Cloud-Native Architecture</li>
                <li>Multi-Tenant Support</li>
                <li>API-Driven Integration</li>
                <li>Global Deployment Options</li>
              </ul>
            </div>

            {/* Integration & Interoperability */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold flex items-center space-x-2">
                <Network className="w-5 h-5 text-yellow-500" />
                <span>Integration & Interoperability</span>
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Seamless Integration with Existing Infrastructure</li>
                <li>Support for Multiple Authentication Methods</li>
                <li>Open API for Custom Integrations</li>
                <li>Integration with Leading Security Tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Benefits</CardTitle>
          <CardDescription>
            The core advantages of choosing Portnox CLEAR for your network access control needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-green-100 text-green-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Improved Security Posture</span>
            </h4>
            <p className="text-sm">
              Enhanced threat detection and response with real-time monitoring and automated remediation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-blue-100 text-blue-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Simplified Compliance</span>
            </h4>
            <p className="text-sm">Automated compliance checks and reporting to meet regulatory requirements.</p>
          </div>

          <div className="p-4 rounded-lg bg-yellow-100 text-yellow-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Reduced Operational Costs</span>
            </h4>
            <p className="text-sm">Streamlined management and automation to minimize IT workload and expenses.</p>
          </div>

          <div className="p-4 rounded-lg bg-red-100 text-red-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Enhanced User Experience</span>
            </h4>
            <p className="text-sm">
              Seamless access for employees and guests with easy-to-use onboarding and self-service options.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-indigo-100 text-indigo-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Flexible Integration</span>
            </h4>
            <p className="text-sm">
              Open API and support for multiple authentication methods for easy integration with existing systems.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-teal-100 text-teal-800">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Centralized Management</span>
            </h4>
            <p className="text-sm">
              Cloud-based platform for easy management and monitoring of network access from anywhere.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>A detailed look at the core features of the Portnox CLEAR platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold">Device Visibility & Profiling</h4>
              <p className="text-sm">
                Automatically discover and profile all devices connecting to your network, including computers,
                smartphones, IoT devices, and more.
              </p>
              <Badge className="mt-2">Agentless Discovery</Badge>
              <Badge className="mt-2">AI-Powered Profiling</Badge>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Network Access Control</h4>
              <p className="text-sm">
                Enforce granular access policies based on device type, user role, security posture, and other criteria.
              </p>
              <Badge className="mt-2">Zero Trust Access</Badge>
              <Badge className="mt-2">Dynamic Segmentation</Badge>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Guest Access Management</h4>
              <p className="text-sm">
                Provide secure and controlled access to guests and visitors with customizable portals and self-service
                options.
              </p>
              <Badge className="mt-2">Self-Service Portal</Badge>
              <Badge className="mt-2">Sponsor Approval</Badge>
            </div>

            <div>
              <h4 className="text-lg font-semibold">BYOD Support</h4>
              <p className="text-sm">
                Enable secure access for employee-owned devices with automated onboarding and compliance checks.
              </p>
              <Badge className="mt-2">Automated Onboarding</Badge>
              <Badge className="mt-2">Compliance Validation</Badge>
            </div>

            <div>
              <h4 className="text-lg font-semibold">IoT Security</h4>
              <p className="text-sm">
                Secure and manage IoT devices with automated profiling, segmentation, and threat detection.
              </p>
              <Badge className="mt-2">IoT Profiling</Badge>
              <Badge className="mt-2">Threat Detection</Badge>
            </div>

            <div>
              <h4 className="text-lg font-semibold">Compliance Automation</h4>
              <p className="text-sm">
                Automate compliance checks and reporting to meet regulatory requirements and industry standards.
              </p>
              <Badge className="mt-2">Automated Reporting</Badge>
              <Badge className="mt-2">Compliance Validation</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PortnoxPlatformView
