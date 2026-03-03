import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Camera, Battery, Wifi, Server, Clock,
  RefreshCw, AlertTriangle, CheckCircle, XCircle, WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';

const mockCameraHealth = [
  { id: 1, name: 'Entrance Gate', lastHeartbeat: '1s ago', status: 'healthy', latency: 185 },
  { id: 2, name: 'Loading Zone A', lastHeartbeat: '1s ago', status: 'healthy', latency: 245 },
  { id: 3, name: 'Parking Area', lastHeartbeat: '3s ago', status: 'warning', latency: 480 },
  { id: 4, name: 'Exit Gate', lastHeartbeat: '45s ago', status: 'critical', latency: 0 },
];

export default function HealthMonitoring() {
  const [cameras, setCameras] = useState(mockCameraHealth);
  const [serverStatus, setServerStatus] = useState('online');
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [reconnecting, setReconnecting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  const handleReconnect = (cameraName) => {
    setReconnecting(true);
    toast.info(`Reconnecting to ${cameraName}...`);
    setTimeout(() => {
      setReconnecting(false);
      toast.success(`${cameraName} reconnected!`);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'critical':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  const healthyCount = cameras.filter(c => c.status === 'healthy').length;
  const warningCount = cameras.filter(c => c.status === 'warning').length;
  const criticalCount = cameras.filter(c => c.status === 'critical').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Offline Banner */}
      {serverStatus === 'offline' && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-amber-500 text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-50"
        >
          <WifiOff className="w-5 h-5" />
          <div className="flex-1">
            <p className="font-semibold">Offline Mode Active</p>
            <p className="text-sm opacity-90">Session cached for 10 minutes</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-[#1E3A5F] pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
          <h1 className="text-xl font-bold text-white">System Health</h1>
        </div>
        <p className="text-blue-200 text-sm">Monitor cameras and system status</p>
      </div>

      {/* Overview Stats */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{healthyCount}</p>
              <p className="text-xs text-slate-500">Healthy</p>
            </div>
            <div className="w-px h-16 bg-slate-200" />
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
              <p className="text-xs text-slate-500">Warning</p>
            </div>
            <div className="w-px h-16 bg-slate-200" />
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              <p className="text-xs text-slate-500">Critical</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        {/* Server Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-4 border-2 ${
            serverStatus === 'online' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Server className={`w-5 h-5 ${serverStatus === 'online' ? 'text-green-600' : 'text-amber-600'}`} />
            <span className="text-sm font-medium text-slate-600">Server</span>
          </div>
          <p className={`text-lg font-bold ${serverStatus === 'online' ? 'text-green-700' : 'text-amber-700'}`}>
            {serverStatus === 'online' ? 'Online' : 'Offline'}
          </p>
          {serverStatus === 'offline' && (
            <p className="text-xs text-amber-600 mt-1">Cached for 10 min</p>
          )}
        </motion.div>

        {/* Network Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`rounded-2xl p-4 border-2 ${
            networkStatus === 'connected' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Wifi className={`w-5 h-5 ${networkStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`} />
            <span className="text-sm font-medium text-slate-600">Network</span>
          </div>
          <p className={`text-lg font-bold ${networkStatus === 'connected' ? 'text-green-700' : 'text-red-700'}`}>
            {networkStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </p>
        </motion.div>

        {/* Battery Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 border-2 border-slate-100 col-span-2"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Battery className={`w-5 h-5 ${batteryLevel > 20 ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm font-medium text-slate-600">Device Battery</span>
            </div>
            <span className={`font-bold ${batteryLevel > 20 ? 'text-green-600' : 'text-red-600'}`}>
              {batteryLevel}%
            </span>
          </div>
          <Progress value={batteryLevel} className="h-2" />
        </motion.div>
      </div>

      {/* Camera Heartbeats */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Camera Heartbeats (1s interval)
        </h3>
        <div className="space-y-3">
          {cameras.map((camera, index) => (
            <motion.div
              key={camera.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl p-4 border-2 ${getStatusBg(camera.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(camera.status)}
                  <div>
                    <p className="font-semibold text-slate-800">{camera.name}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{camera.lastHeartbeat}</span>
                      </div>
                      {camera.latency > 0 && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{camera.latency}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {camera.status === 'critical' && (
                  <Button
                    size="sm"
                    onClick={() => handleReconnect(camera.name)}
                    disabled={reconnecting}
                    className="bg-red-600 hover:bg-red-700 h-9"
                  >
                    {reconnecting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Reconnect
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Offline Mode Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 mt-6"
      >
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Server className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800">Offline Mode Support</p>
              <p className="text-sm text-blue-600 mt-1">
                If the server goes down, your session will be cached locally for up to 10 minutes to ensure uninterrupted monitoring.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}