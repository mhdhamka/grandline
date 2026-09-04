import React from 'react';
import { BookOpen, Trash2 } from 'lucide-react';
import { PersonaConfig } from '../../types/vegapunk.types';
import { sound } from '../../utils/audio.ts';

interface VegapunkHeaderProps {
  activeConfig: PersonaConfig;
  activePersonaKey: string;
  showQuotesCodex: boolean;
  onToggleCodex: () => void;
  onClearChat: () => void;
  onSelectPersona: (key: string) => void;
  allPersonas: Record<string, PersonaConfig>;
}

export const VegapunkHeader: React.FC<VegapunkHeaderProps> = ({
  activeConfig,
  activePersonaKey,
  showQuotesCodex,
  onToggleCodex,
  onClearChat,
  onSelectPersona,
  allPersonas,
}) => {
  return (
    <div className="bg-[#05080a] border-2 border-[#00f2ff]/30 p-5 relative shadow-[0_0_15px_rgba(0,242,255,0.15)]">
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f2ff]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f2ff]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f2ff]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f2ff]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-[#0a1218] border-2 border-[#00f2ff]/50 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]">
            <img 
              src={activeConfig.avatar} 
              alt={activeConfig.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-[#00f2ff] text-xs font-mono mb-1 uppercase tracking-widest">
              <span>EGGHEAD PUNK-RECORDS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
              VEGAPUNK SATELLITE TERMINAL
            </h1>
            <p className="text-xs font-mono text-[#00f2ff]/80 mt-0.5">{activeConfig.epithet}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <button
            onClick={() => {
              sound.playClick(1000);
              onToggleCodex();
            }}
            className="px-4 py-2 bg-transparent hover:bg-[#00f2ff]/10 text-[#00f2ff] border-2 border-[#00f2ff] font-mono text-xs uppercase flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{showQuotesCodex ? 'Hide Codex' : 'Egghead Codex // ベガパンク端末'}</span>
          </button>
          
          <button
            onClick={onClearChat}
            className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/40 font-mono text-xs uppercase flex items-center space-x-1 transition-all cursor-pointer"
            title="Purge Transmission Cache"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge</span>
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#00f2ff]/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase tracking-wider text-white font-bold">Active Satellite:</span>
          <span className="text-xs text-[#00f2ff] font-mono px-2 py-0.5 bg-[#00f2ff]/10 border border-[#00f2ff]/30">
            {activeConfig.name} [{activeConfig.sfx}]
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.entries(allPersonas).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onSelectPersona(key)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer flex items-center space-x-1.5 ${
                activePersonaKey === key
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
  );
};