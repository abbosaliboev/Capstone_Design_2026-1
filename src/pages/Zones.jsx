import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Car, Truck, Bus, Bike, Gauge, Clock, MapPin,
  AlertTriangle, Settings, ChevronRight, Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { createPageUrl } from '@/utils';
import RiskLevelBadge from '@/components/ui-system/RiskLevelBadge';

const vehicleIcons = {
  car: Car,
  truck: Truck,
  bus: Bus,
  motorcycle: Bike,
};

const mockVehicles = [
  { id: 1, type: 'truck', speed: 45, eta: '8s', risk: 'red', distance: '120m' },
  { id: 2, type: 'car', speed: 25, eta: '15s', risk: 'yellow', distance: '200m' },
  { id: 3, type: 'bus', speed: 20, eta: '22s', risk: 'yellow', distance: '280m' },
  { id: 4, type: 'motorcycle', speed: 35, eta: '12s', risk: 'yellow', distance: '160m' },
];

export default function VehicleDetection() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [speedEstimateEnabled, setSpeedEstimateEnabled] = useState(true);
  const [etaEnabled, setEtaEnabled] = useState(true);
  const [gpsRiskEnabled, setGpsRiskEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  const hasHighRisk = vehicles.some(v => v.risk === 'red');

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Risk Banner */}
      {hasHighRisk && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-red-500 text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-50"
        >
          <AlertTriangle className="w-6 h-6 animate-pulse" />
          <div className="flex-1">
            <p className="font-bold">RED: Fast vehicle approaching!</p>
            <p className="text-sm opacity-90">Zone B - 8 seconds ETA</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="bg-[#1E3A5F] pt-12 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-6 h-6 text-white" />
            </a>
            <h1 className="text-xl font-bold text-white">Vehicle Detection</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-colors ${showSettings ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
        <p className="text-blue-200 text-sm">
          {vehicles.length} vehicles detected • Real-time tracking
        </p>
      </div>

      {/* Video Feed Placeholder */}
      <div className="px-4 -mt-3">
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-video relative flex items-center justify-center">
            {/* Vehicle Markers Simulation */}
            <div className="absolute inset-0">
              {/* Simulated vehicle boxes */}
              <motion.div
                className="absolute border-2 border-red-500 bg-red-500/20 rounded"
                style={{ left: '60%', top: '40%', width: '60px', height: '40px' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute border-2 border-amber-500 bg-amber-500/20 rounded"
                style={{ left: '30%', top: '55%', width: '50px', height: '35px' }}
              />
              <motion.div
                className="absolute border-2 border-amber-500 bg-amber-500/20 rounded"
                style={{ left: '75%', top: '60%', width: '70px', height: '45px' }}
              />
            </div>

            <div className="text-center z-10">
              <Car className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">Live Detection Feed</p>
            </div>

            {/* Detection Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                <span className="text-green-400">●</span> AI Active
              </div>
              <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
                {vehicles.length} Vehicles
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 mt-4"
        >
          <div className="bg-white rounded-2xl p-4 border-2 border-slate-100 space-y-4">
            <h3 className="font-semibold text-slate-800">Detection Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Speed Estimate</span>
              </div>
              <Switch checked={speedEstimateEnabled} onCheckedChange={setSpeedEstimateEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">ETA Prediction</span>
              </div>
              <Switch checked={etaEnabled} onCheckedChange={setEtaEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">GPS Risk Reorder</span>
              </div>
              <Switch checked={gpsRiskEnabled} onCheckedChange={setGpsRiskEnabled} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Detected Vehicles List */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Detected Vehicles
        </h3>
        <div className="space-y-3">
          {vehicles
            .sort((a, b) => {
              // Sort by risk level (red first) then by ETA
              if (a.risk === 'red' && b.risk !== 'red') return -1;
              if (a.risk !== 'red' && b.risk === 'red') return 1;
              return parseInt(a.eta) - parseInt(b.eta);
            })
            .map((vehicle, index) => {
              const Icon = vehicleIcons[vehicle.type] || Car;
              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl p-4 border-2 ${
                    vehicle.risk === 'red' 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      vehicle.risk === 'red' ? 'bg-red-500' : 'bg-slate-700'
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800 capitalize">
                          {vehicle.type}
                        </span>
                        <RiskLevelBadge level={vehicle.risk} size="sm" showLabel={false} />
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        {speedEstimateEnabled && (
                          <div className="flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5" />
                            <span className="font-medium">{vehicle.speed} km/h</span>
                          </div>
                        )}
                        {etaEnabled && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-medium">ETA: {vehicle.eta}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{vehicle.distance}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* GPS Info */}
      {gpsRiskEnabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 mt-6"
        >
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">GPS Risk Boosting Active</p>
                <p className="text-sm text-blue-600 mt-1">
                  Vehicles heading towards your location are prioritized in the list
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}