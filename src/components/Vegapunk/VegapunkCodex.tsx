import React from 'react';
import { X } from 'lucide-react';
import { MangaBubble } from '../MangaBubble.tsx';
import { LEGENDARY_MANGA_QUOTES } from '../../data/vegapunk.data';

interface VegapunkCodexProps {
  onClose: () => void;
}

export const VegapunkCodex: React.FC<VegapunkCodexProps> = ({ onClose }) => {
  return (
    <div className="bg-[#05080a] border-2 border-yellow-500/40 p-5 shadow-[0_0_20px_rgba(234,179,8,0.1)] space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-yellow-500/30 pb-3">
        <div className="flex items-center space-x-2 text-yellow-400">
          <h2 className="font-black uppercase tracking-wider text-white">Legendary Grand Line Transmission Codex</h2>
        </div>
        <button onClick={onClose} className="text-yellow-400/70 hover:text-yellow-400 cursor-pointer">
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
            <div className="text-[10px] text-[#00f2ff]/60 italic text-right">— {item.epithet}</div>
          </div>
        ))}
      </div>
    </div>
  );
};