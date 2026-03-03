import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, LogIn, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function JoinSession() {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoin = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!sessionId.trim()) {
      setError('Please enter a session ID');
      return;
    }

    setLoading(true);
    
    // Simulate validation
    setTimeout(() => {
      // Check if valid format (SM-XXXX-XXXX)
      const isValidFormat = /^SM-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(sessionId.trim());
      
      if (!isValidFormat) {
        setError('Invalid session ID format. Expected: SM-XXXX-XXXX');
        setLoading(false);
        return;
      }

      setLoading(false);
      toast.success('Joined session successfully!');
      window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId.trim().toUpperCase()}&role=guest`;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-500 pt-12 pb-16 px-6">
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
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-white font-bold">Safety Monitor</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white text-2xl font-bold mb-1">Join Session</h2>
          <p className="text-green-100">Enter session ID to start monitoring</p>
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
          <form onSubmit={handleJoin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="sessionId" className="text-slate-700 font-medium">Session ID</Label>
              <Input
                id="sessionId"
                type="text"
                placeholder="SM-XXXX-XXXX"
                value={sessionId}
                onChange={(e) => {
                  setSessionId(e.target.value.toUpperCase());
                  setError(null);
                }}
                className="h-16 rounded-xl border-2 border-slate-200 focus:border-green-500 text-center text-2xl font-mono tracking-wider"
                maxLength={12}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert variant="destructive" className="rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-green-600 hover:bg-green-700 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Join Session
                </div>
              )}
            </Button>
          </form>

          {/* How to get ID */}
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl">
            <h4 className="font-semibold text-slate-800 mb-3">How to get Session ID?</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• Ask the host (Rahbar) for the session ID</p>
              <p>• Session IDs look like: SM-ABCD-1234</p>
              <p>• IDs are case-insensitive</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Network Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-6 mt-6 pb-8"
      >
        <div className="flex items-center justify-center gap-2 text-green-600">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Network Connected</span>
        </div>
      </motion.div>
    </div>
  );
}