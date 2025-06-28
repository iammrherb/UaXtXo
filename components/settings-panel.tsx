"use client"

import type React from "react"
import { useState } from "react"

interface SettingsConfig {
  organizationSize: string
  devices: number
  users: number
  industry: string
  years: number
  region: string
  basePricing: number
}

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<SettingsConfig>({
    organizationSize: "Small",
    devices: 50,
    users: 25,
    industry: "Technology",
    years: 3,
    region: "North America",
    basePricing: 1000,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }))
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <div className="setting-section">
        <h3>Core Configuration</h3>
        <div className="setting-item">
          <label htmlFor="organizationSize">Organization Size:</label>
          <select
            id="organizationSize"
            name="organizationSize"
            value={settings.organizationSize}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="devices">Number of Devices:</label>
          <input type="number" id="devices" name="devices" value={settings.devices} onChange={handleChange} />
        </div>

        <div className="setting-item">
          <label htmlFor="users">Number of Users:</label>
          <input type="number" id="users" name="users" value={settings.users} onChange={handleChange} />
        </div>

        <div className="setting-item">
          <label htmlFor="industry">Industry:</label>
          <input type="text" id="industry" name="industry" value={settings.industry} onChange={handleChange} />
        </div>

        <div className="setting-item">
          <label htmlFor="years">Years in Business:</label>
          <input type="number" id="years" name="years" value={settings.years} onChange={handleChange} />
        </div>

        <div className="setting-item">
          <label htmlFor="region">Region:</label>
          <select id="region" name="region" value={settings.region} onChange={handleChange}>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="setting-item">
          <label htmlFor="basePricing">Base Pricing:</label>
          <input
            type="number"
            id="basePricing"
            name="basePricing"
            value={settings.basePricing}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
