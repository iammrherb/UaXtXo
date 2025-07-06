"use client"

import { useState } from "react"

interface Configuration {
  devices: number
  users: number
  years: number
  licenseTier: "Professional" | "Enterprise"
  professionalServices: "basic" | "advanced" | "none"
  includeTraining: boolean
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  portnoxDeviceCost: number
  avgFteCost: number
}

const TCOAnalyzer = () => {
  const [configuration, setConfiguration] = useState({
    devices: 5000,
    users: 5000,
    years: 3,
    licenseTier: "Professional" as const,
    professionalServices: "basic" as const,
    includeTraining: true,
    integrations: {
      mdm: false,
      siem: false,
      edr: false,
    },
    portnoxDeviceCost: 60,
    avgFteCost: 150000,
  })

  return (
    <div>
      {/* Example of passing configuration to a child component */}
      {/* <SomeComponent configuration={configuration} /> */}
      <h1>TCO Analyzer</h1>
      <p>Devices: {configuration.devices}</p>
      <p>Users: {configuration.users}</p>
      <p>Years: {configuration.years}</p>
      <p>License Tier: {configuration.licenseTier}</p>
      <p>Professional Services: {configuration.professionalServices}</p>
      <p>Include Training: {configuration.includeTraining ? "Yes" : "No"}</p>
      <p>MDM Integration: {configuration.integrations.mdm ? "Yes" : "No"}</p>
      <p>SIEM Integration: {configuration.integrations.siem ? "Yes" : "No"}</p>
      <p>EDR Integration: {configuration.integrations.edr ? "Yes" : "No"}</p>
      <p>Portnox Device Cost: {configuration.portnoxDeviceCost}</p>
      <p>Average FTE Cost: {configuration.avgFteCost}</p>
    </div>
  )
}

export default TCOAnalyzer
