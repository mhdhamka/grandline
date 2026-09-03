import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/audio.ts';
import { 
  Radio, 
  Send, 
  Sparkles, 
  Trash2, 
  Cpu, 
  ShieldCheck, 
  Flame, 
  PhoneCall,
  Terminal,
  AlertCircle,
  MessageSquare,
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
  'Who is the "Man Marked by Flames" (Hinokizu no Otoko)?',
  'Break down the Drums of Liberation and Sun God Nika lore',
];

const PERSONA_CONFIGS: Record<string, { 
  name: string; 
  epithet: string; 
  sfx: string; 
  defaultShape: MangaBubbleShape; 
  defaultVariant: MangaBubbleVariant;
}> = {
  stella: {
    name: 'Dr. Vegapunk Stella',
    epithet: 'Genius Scientist of Egghead // 500-Year Intellect',
    sfx: 'QUAPAPAPA!',
    defaultShape: 'round',
    defaultVariant: 'paper',
  },
  shaka: {
    name: 'PUNK-01 Shaka (正 - Good)',
    epithet: 'Logical Satellite of Truth & Ethics',
    sfx: 'LOGIC-SYNC',
    defaultShape: 'square',
    defaultVariant: 'paper',
  },
  lilith: {
    name: 'PUNK-02 Lilith (悪 - Evil)',
    epithet: 'Primal Satellite of Fierce Action & Combat',
    sfx: 'BAAAAN!',
    defaultShape: 'shout',
    defaultVariant: 'red',
  },
  denden: {
    name: 'Den Den Mushi Cipher',
    epithet: 'Transponder Snail Encrypted S-Transmission',
    sfx: 'PURUPURU... GACHA!',
    defaultShape: 'electric',
    defaultVariant: 'terminal',
  },
};

const LEGENDARY_MANGA_QUOTES = [
  {
    speaker: 'Monkey D. Luffy',
    epithet: 'Captain of the Straw Hat Pirates',
    quote: "I can't use swords! I can't navigate! I can't cook! And I can't even lie! I know I need help if I want to survive! But I can beat you!",
    shape: 'shout' as MangaBubbleShape,
    variant: 'paper' as MangaBubbleVariant,
    fontStyle: 'comic' as MangaBubbleFont,
    sfx: 'DON!!',
    citation: 'Arlong Park // Ch. 90',
  },
  {
    speaker: 'Roronoa Zoro',
    epithet: 'Pirate Hunter // King of Hell',
    quote: 'Nothing... happened at all.',
    shape: 'square' as MangaBubbleShape,
    variant: 'paper' as MangaBubbleVariant,
    fontStyle: 'manga' as MangaBubbleFont,
    sfx: 'ZASH!',
    citation: 'Thriller Bark // Ch. 485',
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
  {
    speaker: 'Dr. Hiluluk',
    epithet: 'Quack Doctor of Drum Kingdom',
    quote: 'When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! A man dies when he is forgotten!',
    shape: 'round' as MangaBubbleShape,
    variant: 'paper' as MangaBubbleVariant,
    fontStyle: 'comic' as MangaBubbleFont,
    sfx: 'CHOPPER!!',
    citation: 'Drum Island // Ch. 145',
  },
  {
    speaker: 'Gol D. Roger',
    epithet: 'The Pirate King',
    quote: "My wealth and treasures? If you want it, you can have it! Search for it! I left all of it in that place!",
    shape: 'shout' as MangaBubbleShape,
    variant: 'gold' as MangaBubbleVariant,
    fontStyle: 'heading' as MangaBubbleFont,
    sfx: 'DON!!',
    citation: 'Loguetown // Ch. 1',
  },
  {
    speaker: 'Edward Newgate',
    epithet: 'Strongest Man in the World',
    quote: 'The ONE PIECE... DOES EXIST!!',
    shape: 'shout' as MangaBubbleShape,
    variant: 'red' as MangaBubbleVariant,
    fontStyle: 'shout' as MangaBubbleFont,
    sfx: 'GURARARA!!',
    citation: 'Marineford // Ch. 576',
  },
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
];

export const VegapunkAiTerminal: React.FC = () => {
  const [persona, setPersona] = useState<string>('stella');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [bubbleShape, setBubbleShape] = useState<MangaBubbleShape>('round');
  const [bubbleVariant, setBubbleVariant] = useState<MangaBubbleVariant>('paper');
  const [bubbleFont, setBubbleFont] = useState<MangaBubbleFont>('comic');
  const [showQuotesCodex, setShowQuotesCodex] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Quapapapa! Greetings, traveler of the Grand Line! I am **Dr. Vegapunk**, the genius scientist whose brain exceeds human capacity by 500 years! My satellite network (PUNK-RECORDS) is linked to this terminal. Ask me anything regarding the Void Century, Devil Fruit Lineage Factors, Ancient Weapons, or pirate bounties!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const activePersonaConfig = PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.stella;

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
    setErrorNotice(null);

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
          text: data.reply || 'Transmission interrupted by Five Elders Buster Call.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      setErrorNotice('Terminal transmission disrupted. Fallback protocol activated.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `**[EGGHEAD SATELLITE BROADCAST // LOCAL DATA]**\n\n*Quapapapa!* While direct mother-flame transmissions fluctuate, PUNK-RECORDS confirms: Regarding **"${query}"** — The Grand Line is fundamentally governed by the inherited Will of D. and Lineage Factor genetics. Devil Fruits are born from human dreams of potential evolution, and the Sun God Nika has returned to awaken freedom across the seas!`,
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
        text: 'Terminal cache purged. Ready for new scientific inquiries.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#141b27] border-3 border-black p-5 relative comic-shadow">
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-tr"></div>
        <div className="corner-bracket-bl"></div>
        <div className="corner-bracket-br"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[#ffd700] text-xs font-heading font-black mb-1">
              <span className="px-1.5 py-0.5 bg-[#dc0f0d] text-white text-[10px] border border-black comic-shadow-sm uppercase">
                EGGHEAD PUNK-RECORDS
              </span>
              <span className="tracking-wider uppercase">VEGAPUNK SATELLITE ARCHIVES // ベガパンク端末</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-manga text-white tracking-wide uppercase flex items-center gap-2">
              <span>VEGAPUNK SATELLITE AI TERMINAL</span>
              <span className="manga-sfx text-base hidden sm:inline">DON!!</span>
            </h1>
            <p className="text-xs sm:text-sm font-heading text-slate-300 mt-1 max-w-2xl">
              Real-time in-universe intelligence powered by Gemini. Dialogues and transmissions are formatted in authentic manga speech balloons (`MangaBubble`) with round, square, shout, and electric shapes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            {/* Legendary Quotes Showcase Button */}
            <button
              onClick={() => {
                sound.playClick(1000);
                setShowQuotesCodex(!showQuotesCodex);
              }}
              className="px-3 py-1.5 bg-[#ffd700] hover:bg-[#ffe566] text-black border-2 border-black font-heading font-black text-xs uppercase flex items-center space-x-1.5 comic-shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showQuotesCodex ? 'Close Quotes' : 'Manga Quotes Showcase'}</span>
            </button>

            {/* Persona Switcher */}
            <div className="flex flex-wrap gap-1.5 bg-[#0e141d] border-2 border-black p-1.5 comic-shadow-sm">
              {[
                { id: 'stella', name: 'Dr. Stella', icon: <Cpu className="w-3.5 h-3.5" /> },
                { id: 'shaka', name: 'PUNK-01', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                { id: 'lilith', name: 'PUNK-02', icon: <Flame className="w-3.5 h-3.5" /> },
                { id: 'denden', name: 'Den Den Mushi', icon: <PhoneCall className="w-3.5 h-3.5" /> },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { sound.playClick(); setPersona(p.id); }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-heading font-black transition-all border cursor-pointer ${
                    persona === p.id
                      ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                      : 'text-slate-300 hover:text-white border-transparent'
                  }`}
                >
                  {p.icon}
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legendary Manga Quotes Showcase Section (Expandable) */}
      {showQuotesCodex && (
        <div className="bg-[#141b27] border-3 border-black p-5 relative comic-shadow space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="flex items-center space-x-2 text-white">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <h2 className="font-manga text-xl uppercase tracking-wide">
                LEGENDARY MANGA QUOTES // MANGABUBBLE COMPONENT SHOWCASE
              </h2>
            </div>
            <button
              onClick={() => setShowQuotesCodex(false)}
              className="p-1 hover:bg-black/40 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-heading text-slate-300">
            Click any speech bubble to transmit the topic directly to Dr. Vegapunk. Demonstrating round balloons, square narrative boxes, explosive shout balloons, and varied manga fonts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {LEGENDARY_MANGA_QUOTES.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <MangaBubble
                  quote={item.quote}
                  speaker={item.speaker}
                  epithet={item.epithet}
                  citation={item.citation}
                  shape={item.shape}
                  variant={item.variant}
                  fontStyle={item.fontStyle}
                  sfx={item.sfx}
                  tailPosition="bottom-left"
                  showCopyButton={true}
                  showAudioButton={true}
                  onClick={() => {
                    handleSendMessage(`Tell me about this legendary moment: "${item.quote}" by ${item.speaker} (${item.citation})`);
                    setShowQuotesCodex(false);
                  }}
                  className="w-full h-full hover:scale-[1.01] transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Terminal Window */}
      <div className="bg-[#141b27] border-3 border-black overflow-hidden flex flex-col h-[680px] comic-shadow relative">
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-br"></div>

        {/* Terminal Header & Bubble Styling Controls */}
        <div className="bg-[#0e141d] border-b-2 border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-heading">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 border border-black bg-[#dc0f0d]"></span>
            <span className="w-3 h-3 border border-black bg-[#ffd700]"></span>
            <span className="w-3 h-3 border border-black bg-[#00ff88]"></span>
            <span className="text-white font-bold ml-2">
              PUNK_RECORDS_AI // {activePersonaConfig.name.toUpperCase()}
            </span>
          </div>

          {/* MangaBubble Shape & Variant Control Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center space-x-1 text-slate-300 text-[11px] font-black uppercase">
              <Sliders className="w-3 h-3 text-[#ffd700]" />
              <span>SHAPE:</span>
            </div>

            {/* Shape buttons: Round, Square, Shout */}
            {(['round', 'square', 'shout', 'electric'] as MangaBubbleShape[]).map((shape) => (
              <button
                key={shape}
                onClick={() => { sound.playClick(); setBubbleShape(shape); }}
                className={`px-2 py-0.5 text-[11px] font-black uppercase border transition-all cursor-pointer ${
                  bubbleShape === shape
                    ? 'bg-[#ffd700] text-black border-black comic-shadow-sm'
                    : 'bg-[#141b27] text-slate-300 border-black hover:text-white'
                }`}
              >
                {shape}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block"></div>

            {/* Theme buttons: Paper, Dark, Terminal */}
            {(['paper', 'dark', 'terminal'] as MangaBubbleVariant[]).map((theme) => (
              <button
                key={theme}
                onClick={() => { sound.playClick(); setBubbleVariant(theme); }}
                className={`px-2 py-0.5 text-[11px] font-black uppercase border transition-all cursor-pointer ${
                  bubbleVariant === theme
                    ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                    : 'bg-[#141b27] text-slate-300 border-black hover:text-white'
                }`}
              >
                {theme}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block"></div>

            {/* Font buttons: Comic, Manga, Mono */}
            {(['comic', 'manga', 'mono'] as MangaBubbleFont[]).map((f) => (
              <button
                key={f}
                onClick={() => { sound.playClick(); setBubbleFont(f); }}
                className={`px-2 py-0.5 text-[11px] font-black uppercase border transition-all cursor-pointer ${
                  bubbleFont === f
                    ? 'bg-[#0b44c8] text-white border-black comic-shadow-sm'
                    : 'bg-[#141b27] text-slate-300 border-black hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}

            <button
              onClick={clearChat}
              className="p-1 text-slate-400 hover:text-[#dc0f0d] hover:bg-black/40 transition-colors cursor-pointer ml-1"
              title="Clear Chat Logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Lore Inquiries Bar */}
        <div className="bg-[#101622] border-b-2 border-black px-4 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-heading font-black text-[#ffd700] shrink-0 uppercase">
            QUICK TRANSMISSIONS:
          </span>
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#141b27] hover:bg-[#dc0f0d] text-slate-200 hover:text-white border border-black text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer comic-shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages Body with MangaBubble Rendering */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6 no-scrollbar bg-[#0b0f17]">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
              >
                {isUser ? (
                  // User Query Manga Bubble (Square / Dark / Terminal style)
                  <div className="max-w-[85%] sm:max-w-[75%]">
                    <MangaBubble
                      quote={msg.text}
                      speaker="Nakama Operator"
                      epithet="Grand Line Explorer"
                      citation={msg.timestamp}
                      shape={bubbleShape === 'round' ? 'round' : 'square'}
                      variant={bubbleVariant === 'paper' ? 'dark' : 'terminal'}
                      fontStyle={bubbleFont}
                      tailPosition="bottom-right"
                      size="md"
                      showCopyButton={true}
                    />
                  </div>
                ) : (
                  // Vegapunk Satellite Response Manga Bubble
                  <div className="max-w-[95%] sm:max-w-[85%]">
                    <MangaBubble
                      quote={msg.text}
                      speaker={activePersonaConfig.name}
                      epithet={activePersonaConfig.epithet}
                      citation={`TRANSMISSION // ${msg.timestamp}`}
                      sfx={activePersonaConfig.sfx}
                      shape={bubbleShape}
                      variant={bubbleVariant}
                      fontStyle={bubbleFont}
                      tailPosition="bottom-left"
                      size="md"
                      isMarkdown={true}
                      showCopyButton={true}
                      showAudioButton={true}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="max-w-[340px]">
              <MangaBubble
                quote="Deciphering Mother Flame Lineage & PUNK-RECORDS archives..."
                speaker={activePersonaConfig.name}
                epithet="Processing Grand Line History"
                shape={bubbleShape}
                variant={bubbleVariant}
                fontStyle="mono"
                tailPosition="bottom-left"
                sfx="SCANNING..."
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#0e141d] border-t-2 border-black">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Transmit inquiry to ${activePersonaConfig.name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-[#141b27] border-2 border-black text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-heading font-bold comic-shadow-sm"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-2.5 bg-[#dc0f0d] hover:bg-[#b00c0a] disabled:opacity-40 text-white font-heading font-black text-xs uppercase flex items-center space-x-2 border-2 border-black comic-shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">TRANSMIT</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

