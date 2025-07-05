'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AiChatbox } from './ai-chatbox';

export function AiChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="h-6 w-6" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            AI Document Assistant
          </span>
          {/* Pulse animation */}
          <span className="absolute -inset-1 rounded-full bg-primary-600 opacity-75 animate-ping"></span>
        </button>
      )}

      {/* AI Chatbox */}
      <AiChatbox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}