'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Check, CheckCheck } from 'lucide-react';
import { Profile } from '@/lib/types';

interface Message {
  id: string;
  sender: 'user' | 'match';
  text: string;
  time: string;
}

interface ChatModalProps {
  profile: Profile | null;
  onClose: () => void;
}

const PRESET_ICEBREAKERS = [
  'Hey! So glad we secretly liked each other 🎉',
  'Your bio made me smile :) Coffee this week?',
  'I see you go to the same campus! Small world ✨',
];

export const ChatModal: React.FC<ChatModalProps> = ({ profile, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm0',
      sender: 'match',
      text: `Hey! I'm so happy we both matched on Coy! 😊`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!profile) return null;

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate match typing and responding
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        `Haha love that! How's your week going?`,
        `100%! I was hoping we'd match here!`,
        `Definitely down for coffee! Which spot do you like?`,
        `You have great taste in music btw :)`,
      ];
      const matchMsg: Message = {
        id: `m_${Date.now()}`,
        sender: 'match',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: 'Just now',
      };
      setMessages((prev) => [...prev, matchMsg]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-md h-[85vh] bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover border border-rose-500"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{profile.name}</h3>
                <span className="text-[11px] text-emerald-400">Mutual Match • Online</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Match Notice */}
            <div className="flex justify-center">
              <span className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-center">
                You and {profile.name} matched! Keep the secret or break the ice.
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-rose-500 text-white rounded-br-none'
                      : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-0.5 px-1 flex items-center gap-1">
                  {m.time}
                  {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-rose-300" />}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 text-slate-400 text-xs italic">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">{profile.name} is typing...</span>
              </div>
            )}
          </div>

          {/* Icebreaker Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto border-t border-slate-800/60 bg-slate-950/40">
              {PRESET_ICEBREAKERS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputText);
              }}
              placeholder={`Message ${profile.name}...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:hover:bg-rose-500 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
