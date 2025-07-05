'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { mockClients, mockDocuments, mockGaps } from '@/lib/mock-data';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AiChatboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickPrompts = [
  'Check for missing documents',
  'Analyze compliance status',
  'Review recent uploads',
  'Generate gap report',
];

export function AiChatbox({ isOpen, onClose }: AiChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you analyze financial documents, identify gaps, and ensure compliance. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('missing') || lowerMessage.includes('gap')) {
      const totalGaps = mockGaps.length;
      const clientsWithGaps = new Set(mockGaps.map(g => g.clientId)).size;
      
      return `I've analyzed the documents across all clients. Here's what I found:\n\n` +
        `📊 **Gap Analysis Summary:**\n` +
        `• Total missing documents: ${totalGaps}\n` +
        `• Clients affected: ${clientsWithGaps}\n` +
        `• Most common gaps: Bank statements for February and March 2024\n\n` +
        `Would you like me to provide a detailed breakdown by client?`;
    }
    
    if (lowerMessage.includes('compliance') || lowerMessage.includes('complete')) {
      const compliantClients = mockClients.filter(c => 
        !mockGaps.some(g => g.clientId === c.id)
      ).length;
      
      return `**Compliance Status Report:**\n\n` +
        `✅ Fully compliant clients: ${compliantClients}\n` +
        `⚠️ Clients with missing documents: ${mockClients.length - compliantClients}\n\n` +
        `**Required documents checklist:**\n` +
        `• Bank statements (6 months)\n` +
        `• Credit card statements (6 months)\n` +
        `• Tax returns\n` +
        `• Pay stubs (if applicable)\n\n` +
        `I can help you contact clients about missing documents. Would you like me to draft reminder emails?`;
    }
    
    if (lowerMessage.includes('recent') || lowerMessage.includes('upload')) {
      const recentDocs = mockDocuments
        .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        .slice(0, 3);
      
      return `**Recent Document Uploads:**\n\n` +
        recentDocs.map(doc => 
          `📄 ${doc.name}\n` +
          `   Client: ${mockClients.find(c => c.id === doc.clientId)?.name}\n` +
          `   Status: ${doc.status}\n`
        ).join('\n') +
        `\n\nAll recent uploads are being processed. I'll notify you if any issues are detected.`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can')) {
      return `I can help you with:\n\n` +
        `📋 **Document Analysis**\n` +
        `• Identify missing statements\n` +
        `• Check date coverage\n` +
        `• Verify document completeness\n\n` +
        `✅ **Compliance Checking**\n` +
        `• Review disclosure requirements\n` +
        `• Track submission status\n` +
        `• Generate compliance reports\n\n` +
        `📊 **Gap Detection**\n` +
        `• Find missing time periods\n` +
        `• Identify incomplete accounts\n` +
        `• Priority gap analysis\n\n` +
        `Just ask me anything about your clients' documents!`;
    }
    
    return `I understand you're asking about "${userMessage}". Let me analyze that for you.\n\n` +
      `Based on the current document set, I recommend:\n` +
      `1. Reviewing the gap analysis for detailed insights\n` +
      `2. Checking individual client compliance status\n` +
      `3. Using the document upload feature for any missing items\n\n` +
      `Is there a specific client or document type you'd like me to focus on?`;
  };

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAiResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-80' : 'w-96'} transition-all duration-300`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col" style={{ height: isMinimized ? 'auto' : '600px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">AI Document Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about documents, gaps, or compliance..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  disabled={isProcessing}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}