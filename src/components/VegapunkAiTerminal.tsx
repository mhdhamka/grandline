import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/audio.ts';
import { Send, Cpu } from 'lucide-react';
import { MangaBubble, MangaBubbleShape, MangaBubbleVariant } from './MangaBubble.tsx';
import { ChatMessage } from '../types/vegapunk.types';
import { PRESET_QUESTIONS, PERSONA_CONFIGS } from '../data/vegapunk.data';
import { VegapunkHeader } from './VegapunkHeader.tsx';
import { VegapunkCodex } from './VegapunkCodex.tsx';
import { VegapunkCustomizer } from './VegapunkCustomizer.tsx';

export const VegapunkAiTerminal: React.FC = () => {
  const [persona, setPersona] = useState<string>('stella');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [bubbleShape, setBubbleShape] = useState<MangaBubbleShape>('round');
  const [bubbleVariant, setBubbleVariant] = useState<MangaBubbleVariant>('paper');
  const [showQuotesCodex, setShowQuotesCodex] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activePersonaConfig = PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.stella;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: activePersonaConfig.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const config = PERSONA_CONFIGS[persona];
    if (config) {
      setMessages([
        {
          role: 'model',
          text: config.greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [persona]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, persona, history }),
      });

      if (!res.ok) throw new Error(`Server returned status ${res.status}`);

      const data = await res.json();
      sound.playBountyChime();

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: data.reply || 'Transmission interrupted by Buster Call.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Gemini chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `**[EGGHEAD SATELLITE BROADCAST // LOCAL DATA]**\n\n*${activePersonaConfig.sfx}* While direct transmission signals fluctuate, PUNK-RECORDS confirms regarding **"${query}"** — The Grand Line is fundamentally governed by historical lineage factors and human potential evolution!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    sound.playClick();
    setMessages([
      {
        role: 'model',
        text: activePersonaConfig.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 font-mono text-sm text-[#00f2ff] bg-[#0a1218] p-4 selection:bg-[#00f2ff] selection:text-black">
      <VegapunkHeader
        activeConfig={activePersonaConfig}
        activePersonaKey={persona}
        showQuotesCodex={showQuotesCodex}
        onToggleCodex={() => setShowQuotesCodex(!showQuotesCodex)}
        onClearChat={clearChat}
        onSelectPersona={(key) => {
          sound.playClick(1200);
          setPersona(key);
          setBubbleShape(PERSONA_CONFIGS[key].defaultShape);
          setBubbleVariant(PERSONA_CONFIGS[key].defaultVariant);
        }}
        allPersonas={PERSONA_CONFIGS}
      />

      {showQuotesCodex && <VegapunkCodex onClose={() => setShowQuotesCodex(false)} />}

      <VegapunkCustomizer
        bubbleShape={bubbleShape}
        bubbleVariant={bubbleVariant}
        onChangeShape={setBubbleShape}
        onChangeVariant={setBubbleVariant}
      />

      {/* Main Chat Feed Container */}
      <div className="bg-[#05080a] border-2 border-[#00f2ff]/30 p-4 min-h-[450px] max-h-[600px] overflow-y-auto space-y-6 relative shadow-inner">
        {messages.map((msg, index) => {
          const isModel = msg.role === 'model';
          return (
            <div key={index} className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} space-y-1`}>
              <div className="flex items-center space-x-2 text-[10px] text-[#00f2ff]/70 px-1 uppercase tracking-widest">
                <span>{isModel ? activePersonaConfig.name : 'Grand Line Traveler'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {isModel ? (
                <div className="flex items-start gap-3 max-w-2xl w-full">
                  <div className="w-10 h-10 bg-[#0a1218] border border-[#00f2ff]/40 overflow-hidden shrink-0 mt-1 shadow-[0_0_8px_rgba(0,242,255,0.2)]">
                    <img src={activePersonaConfig.avatar} alt={activePersonaConfig.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <MangaBubble
                      shape={bubbleShape}
                      variant={bubbleVariant}
                      fontStyle="comic"
                      speaker={activePersonaConfig.name}
                      sfx={activePersonaConfig.sfx}
                      tailPosition="top-left"
                    >
                      {msg.text}
                    </MangaBubble>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl bg-[#00f2ff]/10 border border-[#00f2ff]/40 p-3 text-white font-mono text-xs rounded-none shadow-[0_0_10px_rgba(0,242,255,0.1)]">
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-3 text-[#00f2ff] py-2 animate-pulse">
            <Cpu className="w-5 h-5 animate-spin" />
            <span className="text-xs uppercase tracking-widest font-bold">
              PUNK-RECORDS transmitting satellite data across Grand Line frequencies...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Preset Prompts */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-[#00f2ff]/70 font-bold">Suggested Egghead Inquiries:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRESET_QUESTIONS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(preset)}
              disabled={isLoading}
              className="text-left bg-[#05080a] hover:bg-[#00f2ff]/10 border border-[#00f2ff]/30 p-2.5 text-xs text-[#00f2ff] transition-all cursor-pointer flex items-center justify-between group disabled:opacity-50"
            >
              <span className="truncate pr-2">{preset}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2 pt-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask ${activePersonaConfig.name} about lore, devil fruits, history...`}
            disabled={isLoading}
            className="w-full bg-[#05080a] border-2 border-[#00f2ff]/40 focus:border-[#00f2ff] text-white placeholder-[#00f2ff]/40 px-4 py-3 font-mono text-xs focus:outline-none transition-all shadow-[0_0_10px_rgba(0,242,255,0.05)]"
          />
          <div className="absolute right-3 top-3 text-[10px] text-[#00f2ff]/40 uppercase tracking-widest pointer-events-none hidden sm:block">
            Secure Node
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-3 bg-[#00f2ff] hover:bg-[#00f2ff]/80 text-black font-black uppercase tracking-wider font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_15px_rgba(0,242,255,0.3)]"
        >
          <span>Transmit</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};