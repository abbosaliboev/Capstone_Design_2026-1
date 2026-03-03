import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Crown, Users, UserMinus, UserPlus, RefreshCw,
  MoreVertical, Check, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockParticipants = [
  { id: 1, name: 'Ahmad Karimov', role: 'host', status: 'online', joinedAt: '10:30 AM' },
  { id: 2, name: 'Bobur Tursunov', role: 'guest', status: 'online', joinedAt: '10:45 AM' },
  { id: 3, name: 'Davron Aliyev', role: 'guest', status: 'online', joinedAt: '11:00 AM' },
  { id: 4, name: 'Eldor Nazarov', role: 'guest', status: 'offline', joinedAt: '11:15 AM' },
];

export default function HostControls() {
  const [participants, setParticipants] = useState(mockParticipants);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('sessionId') || 'SM-X7K2-9P4F';

  const handleTransferHost = () => {
    if (selectedParticipant) {
      toast.success(`Host transferred to ${selectedParticipant.name}`);
      setShowTransferDialog(false);
      // Navigate back to live session as guest
      setTimeout(() => {
        window.location.href = createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=guest`;
      }, 1000);
    }
  };

  const handleRemoveParticipant = (participant) => {
    setParticipants(participants.filter(p => p.id !== participant.id));
    toast.success(`${participant.name} removed from session`);
  };

  const currentHost = participants.find(p => p.role === 'host');
  const guests = participants.filter(p => p.role === 'guest');
  const onlineCount = participants.filter(p => p.status === 'online').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Header */}
      <div className="bg-purple-600 pt-12 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <a href={createPageUrl('LiveSession') + `?sessionId=${sessionId}&role=host`} className="p-2 -ml-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-6 h-6 text-white" />
          </a>
          <h1 className="text-xl font-bold text-white">Host Controls</h1>
        </div>
        <p className="text-purple-100 text-sm">
          {onlineCount} participants online • Session {sessionId}
        </p>
      </div>

      {/* Current Host */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Current Host</span>
          </div>
          {currentHost && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-amber-600">
                  {currentHost.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{currentHost.name}</p>
                <p className="text-sm text-slate-500">You</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Participants List */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Participants ({guests.length})
        </h3>
        <div className="space-y-3">
          {guests.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 border-2 border-slate-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      participant.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{participant.name}</p>
                    <p className="text-sm text-slate-500">
                      Joined at {participant.joinedAt}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-slate-100 rounded-xl">
                      <MoreVertical className="w-5 h-5 text-slate-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuItem 
                      onClick={() => {
                        setSelectedParticipant(participant);
                        setShowTransferDialog(true);
                      }}
                      className="rounded-lg"
                    >
                      <Crown className="w-4 h-4 mr-2 text-amber-500" />
                      Transfer Host
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleRemoveParticipant(participant)}
                      className="rounded-lg text-red-600 focus:text-red-600"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}

          {guests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-1">No Participants</h3>
              <p className="text-sm text-slate-500">
                Share the session ID to invite workers
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Transfer Host Dialog */}
      <AlertDialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Transfer Host?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to transfer host privileges to <strong>{selectedParticipant?.name}</strong>? 
              You will become a regular participant and lose host controls.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleTransferHost}
              className="rounded-xl bg-purple-600 hover:bg-purple-700"
            >
              Transfer Host
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-4 mt-6"
      >
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <p className="font-medium text-purple-800">Host Privileges</p>
              <p className="text-sm text-purple-600 mt-1">
                As host, you can add/remove cameras, configure zones, manage participants, and transfer host role to others.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}