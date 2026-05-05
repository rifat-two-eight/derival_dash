"use client";

import { useState, useEffect } from "react";
import { 
  Settings, 
  Users, 
  Shield, 
  DollarSign, 
  Bell, 
  Save,
  Loader2,
  Percent,
  Clock,
  RotateCcw
} from "lucide-react";
import { getSettings, updateSettings } from "@/lib/api-auth";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    platformName: "",
    transactionFeePercent: 0,
    lateFeePercent: 0,
    gracePeriodDays: 0,
    maxRetryCount: 0,
    minContribution: 0,
    maxContribution: 0,
    supportEmail: "",
    isUserRegistrationEnabled: false,
    isSocialLoginEnabled: false,
    isTwoFactorAuthenticationEnabled: false,
    isEmailNotificationEnabled: false,
    isPushNotificationEnabled: false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.success) {
          setSettings(response.data);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await updateSettings(settings);
      if (response.success) {
        toast.success("Settings updated successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#1A2279] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* General Settings */}
      <SettingsSection 
        title="General Settings" 
        icon={<Settings className="w-5 h-5 text-gray-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="Platform Name" 
            value={settings.platformName} 
            onChange={(e) => setSettings({...settings, platformName: e.target.value})} 
          />
          <InputGroup 
            label="Support Email" 
            value={settings.supportEmail} 
            onChange={(e) => setSettings({...settings, supportEmail: e.target.value})} 
          />
        </div>
      </SettingsSection>

      {/* Financial Settings */}
      <SettingsSection 
        title="Financial & Fee Settings" 
        icon={<Percent className="w-5 h-5 text-gray-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="Transaction Fee (%)" 
            type="number"
            value={settings.transactionFeePercent.toString()} 
            onChange={(e) => setSettings({...settings, transactionFeePercent: Number(e.target.value)})} 
          />
          <InputGroup 
            label="Late Fee (%)" 
            type="number"
            value={settings.lateFeePercent.toString()} 
            onChange={(e) => setSettings({...settings, lateFeePercent: Number(e.target.value)})} 
          />
          <InputGroup 
            label="Grace Period (Days)" 
            type="number"
            icon={<Clock className="w-4 h-4 text-gray-400" />}
            value={settings.gracePeriodDays.toString()} 
            onChange={(e) => setSettings({...settings, gracePeriodDays: Number(e.target.value)})} 
          />
          <InputGroup 
            label="Max Retry Count" 
            type="number"
            icon={<RotateCcw className="w-4 h-4 text-gray-400" />}
            value={settings.maxRetryCount.toString()} 
            onChange={(e) => setSettings({...settings, maxRetryCount: Number(e.target.value)})} 
          />
        </div>
      </SettingsSection>

      {/* Contribution Settings */}
      <SettingsSection 
        title="Contribution Limits" 
        icon={<DollarSign className="w-5 h-5 text-gray-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup 
            label="Minimum Contribution ($)" 
            type="number"
            value={settings.minContribution.toString()} 
            onChange={(e) => setSettings({...settings, minContribution: Number(e.target.value)})} 
          />
          <InputGroup 
            label="Maximum Contribution ($)" 
            type="number"
            value={settings.maxContribution.toString()} 
            onChange={(e) => setSettings({...settings, maxContribution: Number(e.target.value)})} 
          />
        </div>
      </SettingsSection>

      {/* User & Auth Settings */}
      <SettingsSection 
        title="Access & Authentication" 
        icon={<Users className="w-5 h-5 text-gray-500" />}
      >
        <div className="space-y-6">
          <ToggleGroup 
            title="Enable User Registration" 
            description="Allow new users to sign up on the platform" 
            enabled={settings.isUserRegistrationEnabled} 
            onToggle={() => toggleSetting('isUserRegistrationEnabled')} 
          />
          <ToggleGroup 
            title="Social Login" 
            description="Allow users to login with social accounts" 
            enabled={settings.isSocialLoginEnabled} 
            onToggle={() => toggleSetting('isSocialLoginEnabled')} 
          />
          <ToggleGroup 
            title="Two-Factor Authentication" 
            description="Enable 2FA security for user accounts" 
            enabled={settings.isTwoFactorAuthenticationEnabled} 
            onToggle={() => toggleSetting('isTwoFactorAuthenticationEnabled')} 
          />
        </div>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection 
        title="Notification System" 
        icon={<Bell className="w-5 h-5 text-gray-500" />}
      >
        <div className="space-y-6">
          <ToggleGroup 
            title="Email Notifications" 
            description="Global toggle for automated email alerts" 
            enabled={settings.isEmailNotificationEnabled} 
            onToggle={() => toggleSetting('isEmailNotificationEnabled')} 
          />
          <ToggleGroup 
            title="Push Notifications" 
            description="Global toggle for push notifications to mobile devices" 
            enabled={settings.isPushNotificationEnabled} 
            onToggle={() => toggleSetting('isPushNotificationEnabled')} 
          />
        </div>
      </SettingsSection>

      {/* Action Buttons */}
      <div className="flex justify-end mt-8">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#1A2279] text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Changes"}
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

function InputGroup({ label, value, onChange, type = "text", icon }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, icon?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input 
          type={type} 
          value={value} 
          onChange={onChange}
          className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A2279]/5 focus:border-[#1A2279] transition-all ${icon ? 'pl-11' : ''}`}
        />
      </div>
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
