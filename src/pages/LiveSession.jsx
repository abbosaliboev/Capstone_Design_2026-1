import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Layers, Bell, Settings, Copy, Crown, Users,
  AlertTriangle, Clock, Wifi, ChevronRight
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

import LiveBadge from '@/components/ui-system/LiveBadge';
import SummaryCard from '@/components/ui-system/SummaryCard';
import WorkModeToggle from '@/components/ui-system/WorkModeToggle';
import RiskLevelBadge from '@/components/ui-system/RiskLevelBadge';
import BottomTabBar from '@/components/ui-system/BottomTabBar';

export default function LiveSession() {
  const [activeTab, setActiveTab] = useState('session');
  const [workMode, setWorkMode] = useState(true);
  const [sessionData, setSessionData] = useState({
    id: 'SM-X7K2-9P4F',
    role: 'host',
    connectedCameras: 3,
    activeAlerts: 2,
    riskLevel: 'yellow',
    latency: 245
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('sessionId');
    const role = params.get('role');
    if (sessionId) {
      setSessionData(prev => ({ ...prev, id: sessionId, role: role || 'guest' }));
    }
  }, []);

  const handleTabChange = (tab) => {
    if (tab === 'cameras') {
      window.location.href = createPageUrl('Cameras') + `?sessionId=${sessionData.id}&role=${sessionData.role}`;
    } else if (tab === 'zones') {
      window.location.href = createPageUrl('Zones') + `?sessionId=${sessionData.id}&role=${sessionData.role}`;
    } else if (tab === 'alerts') {
      window.location.href = createPageUrl('Alerts') + `?sessionId=${sessionData.id}&role=${sessionData.role}`;
    } else if (tab === 'settings') {
      window.location.href = createPageUrl('AppSettings') + `?sessionId=${sessionData.id}&role=${sessionData.role}`;
    } else {
      setActiveTab(tab);
    }
  };

  const copySessionId = async () => {
    await navigator.clipboard.writeText(sessionData.id);
    toast.success('Session ID copied!');
  };

  const getRiskVariant = () => {
    switch (sessionData.riskLevel) {
      case 'red': return 'danger';
      case 'yellow': return 'warning';
      default: return 'success';
    }
  };

  const getLatencyVariant = () => {
    if (sessionData.latency < 300) return 'success';
    if (sessionData.latency < 500) return 'warning';
    return 'danger';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <button 
              onClick={copySessionId}
              className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <span className="text-sm font-mono font-medium text-slate-700">{sessionData.id}</span>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
              sessionData.role === 'host' 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {sessionData.role === 'host' ? (
                <Crown className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3" />
              )}
              {sessionData.role === 'host' ? 'Host' : 'Guest'}
            </div>
            <LiveBadge size="sm" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Risk Banner */}
        {sessionData.riskLevel !== 'safe' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
              sessionData.riskLevel === 'red' 
                ? 'bg-red-500 text-white' 
                : 'bg-amber-500 text-white'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
            <div className="flex-1">
              <p className="font-semibold">
                {sessionData.riskLevel === 'red' 
                  ? 'HIGH RISK: Vehicle Approaching!' 
                  : 'MEDIUM RISK: Stay Alert'}
              </p>
              <p className="text-sm opacity-90">Zone A - Camera 1</p>
            </div>
          </motion.div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SummaryCard
              icon={Camera}
              label="Cameras"
              value={sessionData.connectedCameras}
              subtext="Connected"
              variant="primary"
              onClick={() => handleTabChange('cameras')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <SummaryCard
              icon={AlertTriangle}
              label="Risk Level"
              value={<RiskLevelBadge level={sessionData.riskLevel} size="sm" animated />}
              variant={getRiskVariant()}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SummaryCard
              icon={Bell}
              label="Alerts"
              value={sessionData.activeAlerts}
              subtext="Active"
              variant={sessionData.activeAlerts > 0 ? 'warning' : 'default'}
              onClick={() => handleTabChange('alerts')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <SummaryCard
              icon={Clock}
              label="Latency"
              value={`${sessionData.latency}ms`}
              subtext={sessionData.latency < 500 ? 'Good' : 'High'}
              variant={getLatencyVariant()}
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-6"
        >
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Quick Actions</h3>
          
          <button 
            onClick={() => handleTabChange('cameras')}
            className="w-full bg-white rounded-2xl border-2 border-slate-100 p-4 flex items-center gap-4 hover:border-slate-200 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-slate-800">Cameras</p>
              <p className="text-sm text-slate-500">View and manage cameras</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button 
            onClick={() => handleTabChange('zones')}
            className="w-full bg-white rounded-2xl border-2 border-slate-100 p-4 flex items-center gap-4 hover:border-slate-200 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-slate-800">Zones</p>
              <p className="text-sm text-slate-500">Configure safety zones</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button 
            onClick={() => handleTabChange('alerts')}
            className="w-full bg-white rounded-2xl border-2 border-slate-100 p-4 flex items-center gap-4 hover:border-slate-200 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-slate-800">Alerts</p>
              <p className="text-sm text-slate-500">View all safety alerts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {sessionData.role === 'host' && (
            <button 
              onClick={() => window.location.href = createPageUrl('HostControls') + `?sessionId=${sessionData.id}`}
              className="w-full bg-white rounded-2xl border-2 border-slate-100 p-4 flex items-center gap-4 hover:border-slate-200 transition-all active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-slate-800">Host Controls</p>
                <p className="text-sm text-slate-500">Manage participants</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </motion.div>

        {/* Work Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <WorkModeToggle 
            enabled={workMode} 
            onToggle={setWorkMode} 
          />
        </motion.div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        alertCount={sessionData.activeAlerts}
      />
    </div>
  );
}