import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] via-[#2a4a73] to-[#1E3A5F] flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 w-96 h-96 border border-white/5 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 w-96 h-96 border border-white/5 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1.3 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/2 w-96 h-96 border border-white/5 rounded-full"
          initial={{ scale: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 2.6 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
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
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Safety Monitor</h1>
          <p className="text-blue-200 text-lg">Real-Time Vehicle Detection</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 mb-12"
        >
          {[
            { label: 'RTSP Streams', value: '∞' },
            { label: 'Latency', value: '<500ms' },
            { label: 'AI Detection', value: '24/7' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-blue-200">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm"
        >
          <a href={createPageUrl('RoleSelect')}>
            <Button className="w-full h-16 rounded-2xl bg-white text-[#1E3A5F] hover:bg-blue-50 text-lg font-semibold shadow-xl">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pb-8 px-6"
      >
        <p className="text-blue-200/60 text-sm">
          Powered by AI • Real-Time RTSP Processing
        </p>
      </motion.div>
    </div>
  );
}