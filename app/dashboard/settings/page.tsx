"use client";

import { useState } from "react";
import { 
  Settings, 
  Users, 
  Shield, 
  DollarSign, 
  Bell, 
  Save 
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "ROSCA Platform",
    adminEmail: "admin@rosca.com",
    enableRegistration: true,
    requireEmailVerification: true,
    enable2FA: false,
    minContribution: 50,
    maxContribution: 10000,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <SettingsSection 
        title="General Settings" 
        icon={<Settings className="w-5 h-5 text-gray-500" />}
      >
        <div className="space-y-4">
          <InputGroup 
            label="Platform Name" 
            value={settings.platformName} 
            onChange={(e) => setSettings({...settings, platformName: e.target.value})} 
          />
          <InputGroup 
            label="Admin Email" 
            value={settings.adminEmail} 
            onChange={(e) => setSettings({...settings, adminEmail: e.target.value})} 
          />
        </div>
      </SettingsSection>

      {/* User Settings */}
      <SettingsSection 
        title="User Settings" 
        icon={<Users className="w-5 h-5 text-gray-500" />}
      >
        <div className="space-y-6">
          <ToggleGroup 
            title="Enable User Registration" 
            description="Allow new users to sign up" 
            enabled={settings.enableRegistration} 
            onToggle={() => toggleSetting('enableRegistration')} 
          />
          <ToggleGroup 
            title="Require Email Verification" 
            description="Users must verify their email" 
            enabled={settings.requireEmailVerification} 
            onToggle={() => toggleSetting('requireEmailVerification')} 
          />
        </div>
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection 
        title="Security Settings" 
        icon={<Shield className="w-5 h-5 text-gray-500" />}
      >
        <ToggleGroup 
          title="Enable Two-Factor Authentication" 
          description="Require 2FA for all users" 
          enabled={settings.enable2FA} 
          onToggle={() => toggleSetting('enable2FA')} 
        />
      </SettingsSection>

      {/* Contribution Settings */}
      <SettingsSection 
        title="Contribution Settings" 
        icon={<DollarSign className="w-5 h-5 text-gray-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="Minimum Contribution ($)" 
            value={settings.minContribution.toString()} 
            onChange={(e) => setSettings({...settings, minContribution: Number(e.target.value)})} 
          />
          <InputGroup 
            label="Maximum Contribution ($)" 
            value={settings.maxContribution.toString()} 
            onChange={(e) => setSettings({...settings, maxContribution: Number(e.target.value)})} 
          />
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection 
        title="Notification Settings" 
        icon={<Bell className="w-5 h-5 text-gray-500" />}
      >
        <div className="space-y-6">
          <ToggleGroup 
            title="Email Notifications" 
            description="Send email notifications to users" 
            enabled={settings.emailNotifications} 
            onToggle={() => toggleSetting('emailNotifications')} 
          />
          <ToggleGroup 
            title="SMS Notifications" 
            description="Send SMS alerts for important events" 
            enabled={settings.smsNotifications} 
            onToggle={() => toggleSetting('smsNotifications')} 
          />
          <ToggleGroup 
            title="Push Notifications" 
            description="Send push notifications to mobile apps" 
            enabled={settings.pushNotifications} 
            onToggle={() => toggleSetting('pushNotifications')} 
          />
        </div>
      </SettingsSection>

      {/* Action Buttons */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#1A2279] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SettingsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/50 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
        {icon}
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2279]/5 focus:border-[#1A2279] transition-all"
      />
    </div>
  );
}

function ToggleGroup({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-all relative ${
          enabled ? "bg-[#1A2279]" : "bg-gray-200"
        }`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
          enabled ? "left-7" : "left-1"
        }`} />
      </button>
    </div>
  );
}
