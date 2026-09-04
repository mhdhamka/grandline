import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/audio.ts';
import { 
  Send, 
  Trash2, 
  Cpu,
  BookOpen,
  Sliders,
  X
} from 'lucide-react';
import { MangaBubble, MangaBubbleShape, MangaBubbleVariant, MangaBubbleFont } from './MangaBubble.tsx';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'Explain the Void Century, Joy Boy, and the Ancient Kingdom',
  'What is the true origin and Lineage Factor of Devil Fruits?',
  'What are the Three Ancient Weapons: Pluton, Poseidon, and Uranus?',
  'Break down the Drums of Liberation and Sun God Nika lore',
];

const PERSONA_CONFIGS: Record<string, { 
  name: string; 
  epithet: string; 
  sfx: string; 
  avatar: string;
  greeting: string;
  defaultShape: MangaBubbleShape; 
  defaultVariant: MangaBubbleVariant;
}> = {
  stella: {
    name: 'Dr. Vegapunk // Stella',
    epithet: 'Genius Scientist of Egghead // 500-Year Intellect',
    sfx: 'QUAPAPAPA!',
    avatar: '/src/assets/images/stella.png',
    greeting: 'Quapapapa! Greetings, traveler of the Grand Line! I am **Dr. Vegapunk**, the genius scientist whose brain exceeds human capacity by 500 years! My satellite network (PUNK-RECORDS) is linked to this terminal. Ask me anything regarding the Void Century, Devil Fruit Lineage Factors, or Ancient Weapons!',
    defaultShape: 'round',
    defaultVariant: 'paper',
  },
  shaka: {
    name: 'PUNK-01 Shaka',
    epithet: 'Logical Satellite of Truth & Ethics',
    sfx: 'LOGIC-SYNC',
    avatar: '/src/assets/images/shaka.png',
    greeting: 'PUNK-01 Shaka online. Logic channels synchronized. I process objective truth, historical data, and ethical variables of the World Government. State your query carefully, traveler.',
    defaultShape: 'square',
    defaultVariant: 'paper',
  },
  lilith: {
    name: 'PUNK-02 Lilith',
    epithet: 'Primal Satellite // Combat & Action',
    sfx: 'BAAAAN!',
    avatar: '/src/assets/images/lilith.png',
    greeting: 'Hey! PUNK-02 Lilith here! Hand over your valuables and your research funds immediately—or else! ...Just kidding. Unless you want a taste of my technology. What do you want?',
    defaultShape: 'shout',
    defaultVariant: 'red',
  },
  denden: {
    name: 'Den Den Mushi Cipher',
    epithet: 'Encrypted S-Transmission Snail',
    sfx: 'PURUPURU... GACHA!',
    avatar: '/src/assets/images/denden.png',
    greeting: '*Purupurupuru... Gacha!* Secure transmission line established. Encryption protocols active across the Red Line. Speak your message into the receiver; the data will be logged instantly.',
    defaultShape: 'electric',
    defaultVariant: 'terminal',
  },
};

const LEGENDARY_MANGA_QUOTES = [
  {
    speaker: 'Dr. Vegapunk Stella',
    epithet: 'Egghead Global Transmission',
    quote: 'This world... is sinking into the ocean! 200 meters into the abyss!',
    shape: 'electric' as MangaBubbleShape,
    variant: 'terminal' as MangaBubbleVariant,
    fontStyle: 'mono' as MangaBubbleFont,
    sfx: 'QUAPAPAPA!',
    citation: 'Egghead Island // Ch. 1113',
  },
  {
    speaker: 'Monkey D. Luffy',
    epithet: 'Captain of the Straw Hat Pirates',
    quote: "I know I need help if I want to survive! I can't use swords! I can't navigate! I can't cook! I can't even lie!",
    shape: 'shout' as MangaBubbleShape,
    variant: 'paper' as MangaBubbleVariant,
    fontStyle: 'comic' as MangaBubbleFont,
    sfx: 'DON!!',
    citation: 'Arlong Park // Ch. 90',
  },
  {
    speaker: 'Nico Robin',
    epithet: 'Devil Child of Ohara',
    quote: 'I WANT TO LIVE! TAKE ME OUT TO SEA WITH YOU!!',
    shape: 'shout' as MangaBubbleShape,
    variant: 'paper' as MangaBubbleVariant,
    fontStyle: 'shout' as MangaBubbleFont,
    sfx: 'ドドン!!',
    citation: 'Enies Lobby // Ch. 398',
  },
];

export const VegapunkAiTerminal: React.FC = () => {
  const [persona, setPersona] = useState<string>('stella');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [bubbleShape, setBubbleShape] = useState<MangaBubbleShape>('round');
  const [bubbleVariant, setBubbleVariant] = useState<MangaBubbleVariant>('paper');
  const [showQuotesCodex, setShowQuotesCodex] = useState<boolean>(false);
  
  const activePersonaConfig = PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.stella;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: activePersonaConfig.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Dynamically update introductory greeting whenever persona changes
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
        body: JSON.stringify({
          message: query,
          persona,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

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
    } catch (err: any) {
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
      {/* Top Banner // EGGHEAD ANIME UI Style */}
      <div className="bg-[#05080a] border-2 border-[#00f2ff]/30 p-5 relative shadow-[0_0_15px_rgba(0,242,255,0.15)]">
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff]" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f2ff]" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f2ff]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            {/* Persona Avatar Preview */}
            <div className="w-14 h-14 bg-[#0a1218] border-2 border-[#00f2ff]/50 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]">
              <img 
                src={activePersonaConfig.avatar} 
                alt={activePersonaConfig.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-[#00f2ff] text-xs font-mono mb-1 uppercase tracking-widest">
                <span>EGGHEAD PUNK-RECORDS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                VEGAPUNK SATELLITE TERMINAL
              </h1>
              <p className="text-xs font-mono text-[#00f2ff]/80 mt-0.5">
                {activePersonaConfig.epithet}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              onClick={() => {
                sound.playClick(1000);
                setShowQuotesCodex(!showQuotesCodex);
              }}
              className="px-4 py-2 bg-transparent hover:bg-[#00f2ff]/10 text-[#00f2ff] border-2 border-[#00f2ff] font-mono text-xs uppercase flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showQuotesCodex ? 'Hide Codex' : 'Egghead Codex // ベガパンク端末'}</span>
            </button>
            
            <button
              onClick={clearChat}
              className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/40 font-mono text-xs uppercase flex items-center space-x-1 transition-all cursor-pointer"
              title="Purge Transmission Cache"
            >
              <Trash2 className="w-4 h-4" />
              <span>Purge</span>
            </button>
          </div>
        </div>

        {/* Persona Switcher Bar */}
        <div className="mt-6 pt-4 border-t border-[#00f2ff]/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider text-white font-bold">Active Satellite:</span>
            <span className="text-xs text-[#00f2ff] font-mono px-2 py-0.5 bg-[#00f2ff]/10 border border-[#00f2ff]/30">
              {activePersonaConfig.name} [{activePersonaConfig.sfx}]
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.entries(PERSONA_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  sound.playClick(1200);
                  setPersona(key);
                  setBubbleShape(config.defaultShape);
                  setBubbleVariant(config.defaultVariant);
                }}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer flex items-center space-x-1.5 ${
                  persona === key
                    ? 'bg-[#00f2ff] text-black font-bold border-[#00f2ff] shadow-[0_0_10px_rgba(0,242,255,0.4)]'
                    : 'bg-transparent text-[#00f2ff]/70 border-[#00f2ff]/30 hover:border-[#00f2ff] hover:text-[#00f2ff]'
                }`}
              >
                <span>{config.name.replace(/PUNK-0\d\s|Dr\.\s|Den\sDen\sMushi\s/g, '')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Egghead Codex Section (Collapsible) */}
      {showQuotesCodex && (
        <div className="bg-[#05080a] border-2 border-yellow-500/40 p-5 shadow-[0_0_20px_rgba(234,179,8,0.1)] space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-yellow-500/30 pb-3">
            <div className="flex items-center space-x-2 text-yellow-400">
              <h2 className="font-black uppercase tracking-wider text-white">Legendary Grand Line Transmission Codex</h2>
            </div>
            <button 
              onClick={() => setShowQuotesCodex(false)}
              className="text-yellow-400/70 hover:text-yellow-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEGENDARY_MANGA_QUOTES.map((item, idx) => (
              <div key={idx} className="bg-[#0a1218] p-3 border border-yellow-500/20 flex flex-col justify-between space-y-3">
                <div className="text-[10px] text-yellow-400 uppercase tracking-widest border-b border-yellow-500/20 pb-1">
                  {item.citation}
                </div>
                <div>
                  <MangaBubble
                    shape={item.shape}
                    variant={item.variant}
                    fontStyle={item.fontStyle}
                    speaker={item.speaker}
                    sfx={item.sfx}
                    tailPosition="bottom-left"
                  >
                    {item.quote}
                  </MangaBubble>
                </div>
                <div className="text-[10px] text-[#00f2ff]/60 italic text-right">
                  — {item.epithet}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customization Toolbar for Speech Balloons */}
      <div className="bg-[#05080a] border border-[#00f2ff]/20 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-white font-bold">
          <Sliders className="w-4 h-4 text-[#00f2ff]" />
          <span>MangaBubble Customizer:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-1.5">
            <span className="text-[#00f2ff]/70">Shape:</span>
            {(['round', 'square', 'thought', 'shout', 'whisper', 'electric'] as MangaBubbleShape[]).map((shp) => (
              <button
                key={shp}
                onClick={() => { sound.playClick(800); setBubbleShape(shp); }}
                className={`px-2 py-0.5 uppercase text-[10px] border ${
                  bubbleShape === shp 
                    ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-bold' 
                    : 'bg-transparent text-[#00f2ff]/60 border-[#00f2ff]/30 hover:text-[#00f2ff]'
                }`}
              >
                {shp}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-[#00f2ff]/70">Style:</span>
            {(['paper', 'terminal', 'bounty', 'dark', 'red'] as MangaBubbleVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => { sound.playClick(900); setBubbleVariant(v); }}
                className={`px-2 py-0.5 uppercase text-[10px] border ${
                  bubbleVariant === v 
                    ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-bold' 
                    : 'bg-transparent text-[#00f2ff]/60 border-[#00f2ff]/30 hover:text-[#00f2ff]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Feed Container */}
      <div className="bg-[#05080a] border-2 border-[#00f2ff]/30 p-4 min-h-[450px] max-h-[600px] overflow-y-auto space-y-6 relative shadow-inner">
        {messages.map((msg, index) => {
          const isModel = msg.role === 'model';
          return (
            <div 
              key={index} 
              className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div className="flex items-center space-x-2 text-[10px] text-[#00f2ff]/70 px-1 uppercase tracking-widest">
                <span>{isModel ? activePersonaConfig.name : 'Grand Line Traveler'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {isModel ? (
                <div className="flex items-start gap-3 max-w-2xl w-full">
                  <div className="w-10 h-10 bg-[#0a1218] border border-[#00f2ff]/40 overflow-hidden shrink-0 mt-1 shadow-[0_0_8px_rgba(0,242,255,0.2)]">
                    <img 
                      src={activePersonaConfig.avatar} 
                      alt={activePersonaConfig.name}
                      className="w-full h-full object-cover"
                    />
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
        <div className="text-[10px] uppercase tracking-wider text-[#00f2ff]/70 font-bold">
          Suggested Egghead Inquiries:
        </div>
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
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-2"
      >
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