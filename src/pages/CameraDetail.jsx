import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Camera, Clock, Zap, Signal, RefreshCw, Trash2,
  Play, Pause, Maximize2, Volume2, VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import StatusChip from '@/components/ui-system/StatusChip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CameraDetail() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const cameraId = params.get('cameraId') || '1';
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';
  const role = params.get('role') || 'host';

  // Mock camera data
  const camera = {
    id: cameraId,
    name: 'Entrance Gate',
    rtspUrl: 'rtsp://192.168.1.101:554/stream1',
    status: 'connected',
    latency: 185,
    fps: 30,
    bitrate: 4500,
    resolution: '1920x1080',
    quality: 92
  };

  const handleReconnect = () => {
    setReconnecting(true);
    toast.info('Reconnecting to camera...');
    setTimeout(() => {
      setReconnecting(false);
      toast.success('Camera reconnected!');
    }, 2000);
  };

  const handleRemove = () => {
    toast.success('Camera removed');
    window.location.href = createPageUrl('Cameras') + `?sessionId=${sessionId}&role=${role}`;
  };

  const getLatencyColor = (ms) => {
    if (ms < 300) return 'text-green-600';
    if (ms < 500) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Video Area */}
      <div className="relative">
        {/* Back Button */}
        <div className="absolute top-12 left-4 z-10">
          <a 
            href={createPageUrl('Cameras') + `?sessionId=${sessionId}&role=${role}`}
            className="p-3 bg-black/50 rounded-xl backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
        </div>

        {/* Video Placeholder */}
        <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
          <div className="text-center">
            <Camera className="w-16 h-16 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">Live Video Feed</p>
            <p className="text-slate-600 text-sm mt-1">{camera.resolution} @ {camera.fps}fps</p>
          </div>

          {/* Video Overlay Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-black/50 rounded-xl backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-black/50 rounded-xl backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <button className="p-3 bg-black/50 rounded-xl backdrop-blur-sm">
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Live Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-slate-50 min-h-screen -mt-4 rounded-t-3xl pt-6 px-4">
        {/* Camera Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{camera.name}</h1>
            <p className="text-sm text-slate-500 font-mono mt-1">{camera.rtspUrl}</p>
          </div>
          <StatusChip status={camera.status} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 border-2 border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Latency</span>
            </div>
            <p className={`text-3xl font-bold ${getLatencyColor(camera.latency)}`}>
              {camera.latency}
              <span className="text-lg font-normal text-slate-400">ms</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-4 border-2 border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Frame Rate</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {camera.fps}
              <span className="text-lg font-normal text-slate-400">fps</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 border-2 border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Signal className="w-4 h-4" />
              <span className="text-sm">Bitrate</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {(camera.bitrate / 1000).toFixed(1)}
              <span className="text-lg font-normal text-slate-400">Mbps</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-4 border-2 border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Resolution</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{camera.resolution}</p>
          </motion.div>
        </div>

        {/* Quality Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 border-2 border-slate-100 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600 font-medium">Stream Quality</span>
            <span className="text-lg font-bold text-slate-800">{camera.quality}%</span>
          </div>
          <Progress value={camera.quality} className="h-3" />
        </motion.div>

        {/* Actions */}
        {role === 'host' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <Button
              onClick={handleReconnect}
              disabled={reconnecting}
              className="w-full h-14 rounded-xl bg-[#1E3A5F] hover:bg-[#2a4a73]"
            >
              {reconnecting ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Reconnecting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Reconnect Camera
                </>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Remove Camera
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Camera?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove "{camera.name}" from your session. You can add it back later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleRemove}
                    className="rounded-xl bg-red-600 hover:bg-red-700"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        )}
      </div>
    </div>
  );
}