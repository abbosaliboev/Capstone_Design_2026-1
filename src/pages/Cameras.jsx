import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Plus, Search, Wifi, RefreshCw, Camera as CameraIcon,
  Radio, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';

import CameraDashboardCard from '@/components/ui-system/CameraDashboardCard';
import BottomTabBar from '@/components/ui-system/BottomTabBar';

const mockCameras = [
  { 
    id: 1, 
    name: 'Entrance Gate', 
    rtspLabel: 'rtsp://192.168.1.101:554', 
    status: 'connected', 
    latency: 185, 
    fps: 30, 
    quality: 92,
    vehicles: [
      { id: 'v1', type: 'truck', speed: 55, distance: '80m' },
      { id: 'v2', type: 'car', speed: 28, distance: '150m' },
    ]
  },
  { 
    id: 2, 
    name: 'Loading Zone A', 
    rtspLabel: 'rtsp://192.168.1.102:554', 
    status: 'connected', 
    latency: 245, 
    fps: 25, 
    quality: 85,
    vehicles: [
      { id: 'v3', type: 'bus', speed: 35, distance: '120m' },
      { id: 'v4', type: 'car', speed: 22, distance: '200m' },
      { id: 'v5', type: 'motorcycle', speed: 42, distance: '90m' },
    ]
  },
  { 
    id: 3, 
    name: 'Parking Area', 
    rtspLabel: 'rtsp://192.168.1.103:554', 
    status: 'poor', 
    latency: 480, 
    fps: 15, 
    quality: 60,
    vehicles: [
      { id: 'v6', type: 'car', speed: 15, distance: '50m' },
    ]
  },
  { 
    id: 4, 
    name: 'Exit Gate', 
    rtspLabel: 'rtsp://192.168.1.104:554', 
    status: 'offline', 
    latency: 0, 
    fps: 0, 
    quality: 0,
    vehicles: []
  },
];

export default function Cameras() {
  const [cameras, setCameras] = useState(mockCameras);
  const [searchQuery, setSearchQuery] = useState('');
  const [discovering, setDiscovering] = useState(false);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [newRtspUrl, setNewRtspUrl] = useState('');
  const [newCameraName, setNewCameraName] = useState('');
  const [testing, setTesting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  const filteredCameras = cameras.filter(cam => 
    cam.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAutoDiscover = () => {
    setDiscovering(true);
    toast.info('Scanning network for cameras...');
    setTimeout(() => {
      setDiscovering(false);
      toast.success('Found 2 new cameras!');
    }, 3000);
  };

  const handleTestStream = () => {
    if (!newRtspUrl) {
      toast.error('Please enter RTSP URL');
      return;
    }
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      toast.success('Stream test successful!');
    }, 2000);
  };

  const handleAddCamera = () => {
    if (!newCameraName || !newRtspUrl) {
      toast.error('Please fill all fields');
      return;
    }
    const newCamera = {
      id: cameras.length + 1,
      name: newCameraName,
      rtspLabel: newRtspUrl,
      status: 'connected',
      latency: Math.floor(Math.random() * 300) + 100,
      fps: 25,
      quality: 80
    };
    setCameras([...cameras, newCamera]);
    setShowAddSheet(false);
    setNewCameraName('');
    setNewRtspUrl('');
    toast.success('Camera added successfully!');
  };

  const handleCameraClick = (camera) => {
    window.location.href = createPageUrl('CameraDetail') + `?cameraId=${camera.id}&sessionId=${sessionId}&role=${role}`;
  };

  const handleTabChange = (tab) => {
    if (tab === 'session') {
      window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'zones') {
      window.location.href = createPageUrl('Zones') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'alerts') {
      window.location.href = createPageUrl('Alerts') + `?sessionId=${sessionId}&role=${role}`;
    } else if (tab === 'settings') {
      window.location.href = createPageUrl('AppSettings') + `?sessionId=${sessionId}&role=${role}`;
    }
  };

  const connectedCount = cameras.filter(c => c.status === 'connected').length;
  const offlineCount = cameras.filter(c => c.status === 'offline').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="bg-[#1E3A5F] pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-6">
          <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=${role}`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
          <h1 className="text-xl font-bold text-white">Cameras</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search cameras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
            <p className="text-xs text-slate-500">Connected</p>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{cameras.filter(c => c.status === 'poor').length}</p>
            <p className="text-xs text-slate-500">Poor</p>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{offlineCount}</p>
            <p className="text-xs text-slate-500">Offline</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {role === 'host' && (
        <div className="px-4 mt-4 flex gap-2">
          <Button
            onClick={handleAutoDiscover}
            disabled={discovering}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            {discovering ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Radio className="w-4 h-4 mr-2" />
                Auto Discover
              </>
            )}
          </Button>

          <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
            <SheetTrigger asChild>
              <Button className="flex-1 h-12 rounded-xl bg-[#1E3A5F] hover:bg-[#2a4a73]">
                <Plus className="w-4 h-4 mr-2" />
                Add RTSP
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Add RTSP Camera</SheetTitle>
                <SheetDescription>
                  Enter the camera details to add it to your session
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Camera Name</Label>
                  <Input
                    placeholder="e.g., Main Entrance"
                    value={newCameraName}
                    onChange={(e) => setNewCameraName(e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>RTSP URL</Label>
                  <Input
                    placeholder="rtsp://192.168.1.100:554/stream"
                    value={newRtspUrl}
                    onChange={(e) => setNewRtspUrl(e.target.value)}
                    className="h-12 rounded-xl font-mono text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleTestStream}
                    disabled={testing}
                    className="flex-1 h-12 rounded-xl"
                  >
                    {testing ? 'Testing...' : 'Test Stream'}
                  </Button>
                  <Button
                    onClick={handleAddCamera}
                    className="flex-1 h-12 rounded-xl bg-[#1E3A5F] hover:bg-[#2a4a73]"
                  >
                    Add Camera
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Camera List */}
      <div className="px-4 mt-6 space-y-3">
        <AnimatePresence>
          {filteredCameras.length > 0 ? (
            filteredCameras.map((camera, index) => (
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <CameraDashboardCard
                  {...camera}
                  onClick={() => handleCameraClick(camera)}
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
                <CameraIcon className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">No Cameras Found</h3>
              <p className="text-sm text-slate-500">
                {searchQuery ? 'Try a different search term' : 'Add cameras to start monitoring'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab="cameras" 
        onTabChange={handleTabChange}
        alertCount={2}
      />
    </div>
  );
}