import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Sparkles, Play, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import SessionIdDisplay from '@/components/ui-system/SessionIdDisplay';
import { toast } from 'sonner';

export default function CreateSession() {
  const [sessionId, setSessionId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const generateSessionId = () => {
    setGenerating(true);
    setTimeout(() => {
      // Generate a random session ID
      const id = `SM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setSessionId(id);
      setGenerating(false);
      toast.success('Session ID generated!');
    }, 1000);
  };

  const startSession = () => {
    setSessionActive(true);
    toast.success('Session started successfully!');
    setTimeout(() => {
      window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=host`;
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2a4a73] pt-12 pb-16 px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <a href={createPageUrl('RoleSelect')} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#1E3A5F]" />
            </div>
            <span className="text-white font-bold">Safety Monitor</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white text-2xl font-bold mb-1">Create Session</h2>
          <p className="text-blue-200">Generate a session ID to start monitoring</p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 -mt-8"
      >
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md mx-auto">
          {/* Session Status */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-slate-600 font-medium">Session Status</span>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              sessionActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-slate-100 text-slate-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${sessionActive ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className="text-sm font-medium">{sessionActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          {/* Generate Button or Session ID */}
          {!sessionId ? (
            <Button
              onClick={generateSessionId}
              disabled={generating}
              className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#1E3A5F] to-[#2a4a73] hover:from-[#2a4a73] hover:to-[#1E3A5F] text-lg font-semibold"
            >
              {generating ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Generate Session ID
                </div>
              )}
            </Button>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2 text-center">Your Session ID</p>
                <SessionIdDisplay sessionId={sessionId} />
              </div>

              {!sessionActive && (
                <Button
                  onClick={startSession}
                  className="w-full h-14 rounded-xl bg-green-600 hover:bg-green-700 text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Session
                </Button>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <p className="text-sm">Generate a unique session ID</p>
            </div>
            <div className="flex items-start gap-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">2</span>
              </div>
              <p className="text-sm">Share the ID with workers (Ishchi)</p>
            </div>
            <div className="flex items-start gap-3 text-slate-600">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">3</span>
              </div>
              <p className="text-sm">Start the session and add cameras</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-6 mt-6 pb-8"
      >
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 max-w-md mx-auto">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Host Responsibilities</h4>
              <p className="text-sm text-slate-600 mt-1">
                As a host, you can add cameras, configure zones, and manage all participants in the session.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}