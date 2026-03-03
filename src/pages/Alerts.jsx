import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bell, Volume2, VolumeX, Vibrate, Filter,
  AlertTriangle, AlertOctagon, Settings, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

import AlertCard from '@/components/ui-system/AlertCard';
import BottomTabBar from '@/components/ui-system/BottomTabBar';

const mockAlerts = [
  {
    id: 1,
    type: 'red',
    title: 'High Risk: Fast Vehicle',
    message: 'Vehicle approaching at high speed in Zone B. Take immediate action.',
    timestamp: '2 min ago',
    cameraName: 'Entrance Gate',
    acknowledged: false
  },
  {
    id: 2,
    type: 'yellow',
    title: 'Medium Risk: Vehicle Detected',
    message: 'Truck entering Zone A at normal speed.',
    timestamp: '5 min ago',
    cameraName: 'Loading Zone A',
    acknowledged: false
  },
  {
    id: 3,
    type: 'system',
    title: 'Camera Reconnected',
    message: 'Parking Area camera is back online after brief disconnection.',
    timestamp: '12 min ago',
    cameraName: 'Parking Area',
    acknowledged: true
  },
  {
    id: 4,
    type: 'yellow',
    title: 'Medium Risk: Multiple Vehicles',
    message: '3 vehicles detected in Zone A simultaneously.',
    timestamp: '18 min ago',
    cameraName: 'Loading Zone A',
    acknowledged: true
  },
  {
    id: 5,
    type: 'red',
    title: 'High Risk: Zone Breach',
    message: 'Vehicle entered restricted red zone without authorization.',
    timestamp: '25 min ago',
    cameraName: 'Exit Gate',
    acknowledged: true
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter);

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(a => 
      a.id === alertId ? { ...a, acknowledged: true } : a
    ));
    toast.success('Alert acknowledged');
  };

  const handleViewCamera = (cameraName) => {
    window.location.href = createPageUrl('CameraDetail') + `?cameraId=1&sessionId=${sessionId}&role=${role}`;
  };

  const handleTabChange = (tab) => {
    if (tab === 'session') {
      window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'cameras') {
      window.location.href = createPageUrl('Cameras') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'zones') {
      window.location.href = createPageUrl('Zones') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'settings') {
      window.location.href = createPageUrl('AppSettings') + `?sessionId=${sessionId}&role=${role}`;
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All', icon: Filter },
    { id: 'yellow', label: 'Yellow', icon: AlertTriangle },
    { id: 'red', label: 'Red', icon: AlertOctagon },
    { id: 'system', label: 'System', icon: Settings },
  ];

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-red-500 pt-12 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-6 h-6 text-white" />
            </a>
            <h1 className="text-xl font-bold text-white">Alerts</h1>
          </div>
          
          {/* Audio/Vibration Toggles */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                toast.info(audioEnabled ? 'Audio disabled' : 'Audio enabled');
              }}
              className={`p-2 rounded-xl transition-colors ${
                audioEnabled ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              {audioEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/60" />
              )}
            </button>
            <button 
              onClick={() => {
                setVibrationEnabled(!vibrationEnabled);
                toast.info(vibrationEnabled ? 'Vibration disabled' : 'Vibration enabled');
              }}
              className={`p-2 rounded-xl transition-colors ${
                vibrationEnabled ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              <Vibrate className={`w-5 h-5 ${vibrationEnabled ? 'text-white' : 'text-white/60'}`} />
            </button>
          </div>
        </div>

        <p className="text-red-100 text-sm">
          {unacknowledgedCount} unacknowledged alerts
        </p>
      </div>

      {/* Filter Chips */}
      <div className="px-4 -mt-3 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = filter === opt.id;
            const count = opt.id === 'all' 
              ? alerts.length 
              : alerts.filter(a => a.type === opt.id).length;
            
            return (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white shadow-lg text-slate-800'
                    : 'bg-white/80 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{opt.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-slate-100' : 'bg-slate-200/50'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-4 mt-4 space-y-3">
        <AnimatePresence>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <AlertCard
                  {...alert}
                  onViewCamera={() => handleViewCamera(alert.cameraName)}
                  onAcknowledge={() => handleAcknowledge(alert.id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">No Alerts</h3>
              <p className="text-sm text-slate-500">
                {filter !== 'all' ? `No ${filter} alerts found` : 'All clear! No alerts at the moment.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab="alerts" 
        onTabChange={handleTabChange}
        alertCount={unacknowledgedCount}
      />
    </div>
  );
}