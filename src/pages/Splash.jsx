import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Splash() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = createPageUrl('RoleSelect');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] via-[#2a4a73] to-[#1E3A5F] flex flex-col items-center justify-center px-6">
      {/* Animated Background Rings */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10"
      >
        <div className="w-28 h-28 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8">
          <div className="relative">
            <Shield className="w-14 h-14 text-[#1E3A5F]" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Radio className="w-5 h-5 text-green-500" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center z-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Safety Monitor</h1>
        <p className="text-blue-200 text-sm">Real-Time Vehicle Detection</p>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 z-10"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}