import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Settings, Globe, Bell, Volume2, Vibrate, Info,
  ChevronRight, Shield, Moon, Sun, Heart, LogOut
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import BottomTabBar from '@/components/ui-system/BottomTabBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppSettings() {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  const handleTabChange = (tab) => {
    if (tab === 'session') {
      window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'cameras') {
      window.location.href = createPageUrl('Cameras') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'zones') {
      window.location.href = createPageUrl('Zones') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'alerts') {
      window.location.href = createPageUrl('Alerts') + `?sessionId=${sessionId}&role=${role}`;
    }
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    window.location.href = createPageUrl('RoleSelect');
  };

  const settingsGroups = [
    {
      title: 'Language',
      items: [
        {
          id: 'language',
          icon: Globe,
          label: 'App Language',
          type: 'select',
          value: language,
          onChange: setLanguage,
          options: [
            { value: 'en', label: 'English' },
            { value: 'ko', label: '한국어' },
            { value: 'ru', label: 'Русский' },
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          icon: Bell,
          label: 'Push Notifications',
          description: 'Receive alerts on your device',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        },
        {
          id: 'sound',
          icon: Volume2,
          label: 'Sound Alerts',
          description: 'Play sound for new alerts',
          type: 'toggle',
          value: soundAlerts,
          onChange: setSoundAlerts
        },
        {
          id: 'vibration',
          icon: Vibrate,
          label: 'Vibration',
          description: 'Vibrate for critical alerts',
          type: 'toggle',
          value: vibration,
          onChange: setVibration
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'darkMode',
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          description: 'Switch to dark theme',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-[#1E3A5F] pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="px-4 mt-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`p-4 flex items-center justify-between ${
                      index !== group.items.length - 1 ? 'border-b border-slate-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        {item.description && (
                          <p className="text-sm text-slate-500">{item.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {item.type === 'toggle' && (
                      <Switch 
                        checked={item.value} 
                        onCheckedChange={item.onChange}
                      />
                    )}
                    
                    {item.type === 'select' && (
                      <Select value={item.value} onValueChange={item.onChange}>
                        <SelectTrigger className="w-32 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
            About
          </h3>
          <div className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden">
            <button 
              onClick={() => window.location.href = createPageUrl('HealthMonitoring') + `?sessionId=${sessionId}&role=${role}`}
              className="w-full p-4 flex items-center justify-between border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">System Health</p>
                  <p className="text-sm text-slate-500">Monitor cameras & status</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            
            <button 
              onClick={() => window.location.href = createPageUrl('VehicleDetection') + `?sessionId=${sessionId}&role=${role}`}
              className="w-full p-4 flex items-center justify-between border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-800">Vehicle Detection</p>
                  <p className="text-sm text-slate-500">AI detection settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Info className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Version</p>
                  <p className="text-sm text-slate-500">1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl border-2 border-red-100 p-4 flex items-center justify-center gap-2 text-red-600 font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </motion.button>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab="settings" 
        onTabChange={handleTabChange}
        alertCount={2}
      />
    </div>
  );
}