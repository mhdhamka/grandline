import React, { useState } from 'react';
import { Layers, Sparkles, ChevronDown, RefreshCw, Eye, Sliders, Zap, Flame, Compass, CloudLightning } from 'lucide-react';
import { sound } from '../../utils/audio.ts';

export type HalftonePatternMode = 'dense' | 'loose' | 'inverted' | 'auto';

export interface MangaHalftoneMenuProps {
  currentPatternMode: HalftonePatternMode;
  onSelectPatternMode: (mode: HalftonePatternMode) => void;
  activeEra: string;
  onSelectEra: (era: string) => void;
  effectivePattern: 'dense' | 'loose' | 'inverted';
}

export const CANONICAL_ERAS = [
  { id: 'East Blue', name: 'East Blue', eraTag: 'Romance Dawn', pattern: 'loose' as const, note: 'Vintage 22px Tone' },
  { id: 'Paradise', name: 'Grand Line / Paradise', eraTag: 'Alabasta & Skypiea', pattern: 'loose' as const, note: 'Classic 22px Tone' },
  { id: 'Summit War', name: 'Summit War / Marineford', eraTag: 'Paramount War', pattern: 'dense' as const, note: 'Intense 8px Battle Tone' },
  { id: 'New World', name: 'New World / Dressrosa', eraTag: 'Yonko Escalation', pattern: 'dense' as const, note: 'Detailed 8px Tone' },
  { id: 'Wano Country', name: 'Wano / Onigashima', eraTag: 'Raid on Onigashima', pattern: 'dense' as const, note: 'Heavy Climax 8px Tone' },
  { id: 'Egghead / Final Saga', name: 'Egghead / Final Saga', eraTag: 'Void Century Lore', pattern: 'inverted' as const, note: 'Negative Inverted Tone' },
];

export const MangaHalftoneMenu: React.FC<MangaHalftoneMenuProps> = ({
  currentPatternMode,
  onSelectPatternMode,
  activeEra,
  onSelectEra,
  effectivePattern,
}) => {
  const [isEraDropdownOpen, setIsEraDropdownOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);
  const [gear5Mode, setGear5Mode] = useState(false);

  const triggerRubberHoseBounce = () => {
    setIsJiggling(true);
    setTimeout(() => setIsJiggling(false), 400);
  };

  const handleModeChange = (mode: HalftonePatternMode) => {
    sound.playClick(1100);
    triggerRubberHoseBounce();
    onSelectPatternMode(mode);
  };

  const handleEraSelect = (eraId: string) => {
    sound.playClick(950);
    triggerRubberHoseBounce();
    onSelectEra(eraId);
    setIsEraDropdownOpen(false);
  };

  const toggleGear5Vibes = () => {
    sound.playClick(1300);
    setGear5Mode(!gear5Mode);
    triggerRubberHoseBounce();
  };

  return (
    <div className={`relative mb-6 border-4 border-black p-4 sm:p-6 transition-all duration-300 ${
      gear5Mode 
        ? 'bg-gradient-to-r from-white via-amber-50 to-white shadow-[8px_8px_0px_#ffd700] ring-4 ring-amber-400' 
        : 'bg-[#fffdfa] comic-shadow'
    } ${isJiggling ? 'scale-[1.02] rotate-[-0.5deg]' : 'hover:scale-[1.005]'}`}>
      
      {/* Tactical Corner Brackets */}
      <div className="corner-bracket-tl"></div>
      <div className="corner-bracket-tr"></div>
      <div className="corner-bracket-bl"></div>
      <div className="corner-bracket-br"></div>

      {/* Floating Gear 5 Cartoon Cloud & Sparkle Banner */}
      <div className="absolute -top-4 -right-2 flex items-center gap-1.5 pointer-events-none">
        <button 
          onClick={toggleGear5Vibes}
          className="pointer-events-auto bg-white hover:bg-amber-100 text-black border-2 border-black px-2.5 py-1 text-[10px] font-black font-heading rounded-full shadow-[3px_3px_0px_#000] transition-transform hover:scale-105 flex items-center gap-1 cursor-pointer"
          title="Toggle Gear 5 Nika Cloud Aura!"
        >
          <CloudLightning className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
          <span>{gear5Mode ? 'NIKA AURA: ON' : 'AWAKEN CLOUD'}</span>
        </button>

        <div className="text-black animate-bounce font-black text-xs font-heading bg-[#ffd700] px-2.5 py-0.5 border-2 border-black comic-shadow-sm rotate-6">
          {gear5Mode ? 'HAHAHA! ' : 'POP! '}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        {/* Left info & current status */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3.5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 bg-[#dc0f0d] text-white text-[11px] font-black border-2 border-black comic-shadow-sm uppercase tracking-wider flex items-center gap-1 rounded-lg">
              <Flame className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" /> MANGA TONE
            </span>
            <span className="text-xs font-heading font-black tracking-wider uppercase text-black flex items-center gap-1.5 bg-[#ffd700] px-2.5 py-1 border-2 border-black comic-shadow-sm rounded-lg">
              <span>HALFWAY SCREENTONE</span>
              <span className="text-[#dc0f0d] text-[11px] font-jp hidden sm:inline">網点トーン</span>
            </span>
          </div>

          {/* Active Era Tag & Selector Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => {
                sound.playClick(900);
                setIsEraDropdownOpen(!isEraDropdownOpen);
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-[#fff9e6] border-2 border-black text-black text-xs font-heading font-black flex items-center space-x-2 transition-all cursor-pointer comic-shadow hover:-translate-y-0.5 rounded-xl"
              title="Click to select specific Arc/Era"
            >
              <span className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1"><Compass className="w-3 h-3 text-[#0b44c8]" /> SAGA:</span>
              <span className="text-black truncate max-w-[140px] sm:max-w-[180px]">{activeEra}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#dc0f0d] transition-transform ${isEraDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isEraDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-[#fffdfa] border-4 border-black comic-shadow-lg z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 rounded-2xl overflow-hidden">
                <div className="px-3 py-2 border-b-3 border-black bg-black text-[10px] text-[#ffd700] font-heading font-black uppercase tracking-wider flex items-center justify-between">
                  <span>SELECT STORYLINE ERA:</span>
                  <span className="animate-spin text-xs"></span>
                </div>
                {CANONICAL_ERAS.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => handleEraSelect(era.id)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-heading flex items-center justify-between transition-all cursor-pointer border-b border-stone-200 last:border-b-0 ${
                      activeEra.toLowerCase().includes(era.id.toLowerCase())
                        ? 'bg-[#dc0f0d] text-white font-black border-l-6 border-[#ffd700]'
                        : 'text-stone-800 hover:bg-[#ffe600] hover:text-black font-bold'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm">{era.name}</div>
                      <div className={`text-[10px] ${activeEra.toLowerCase().includes(era.id.toLowerCase()) ? 'text-stone-100' : 'text-stone-500'}`}>{era.eraTag}</div>
                    </div>
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 border-2 border-black bg-black text-[#ffd700] comic-shadow-sm rounded">
                      {era.pattern}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Pattern Status Badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#f3f0eb] border-2 border-black text-[11px] font-heading font-black comic-shadow-sm rounded-xl">
            <span className="text-stone-600 uppercase">TONE:</span>
            <span className="font-black text-[#dc0f0d] uppercase">{effectivePattern}</span>
            {currentPatternMode === 'auto' && (
              <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500 text-white font-black uppercase border border-black comic-shadow-sm ml-1 rounded">
                SYNCED
              </span>
            )}
          </div>
        </div>

        {/* Right: Halftone Dot Pattern Selector Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[10px] text-stone-700 font-heading font-black uppercase pr-1 hidden sm:inline-block">
            SCREEN-TONE:
          </span>

          {/* Auto Era-Sync Button */}
          <button
            onClick={() => handleModeChange('auto')}
            className={`px-3 py-1.5 text-xs font-heading font-black flex items-center space-x-1.5 transition-all cursor-pointer border-2 border-black comic-shadow-sm hover:-translate-y-0.5 rounded-xl ${
              currentPatternMode === 'auto'
                ? 'bg-[#059669] text-white ring-2 ring-black shadow-[2px_2px_0px_#000]'
                : 'bg-white text-stone-800 hover:bg-[#ffd700] hover:text-black'
            }`}
            title="Auto-match halftone dots to the current Era/Arc"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${currentPatternMode === 'auto' ? 'animate-spin' : ''}`} />
            <span>ERA SYNC</span>
          </button>

          {/* Dense Pattern Button */}
          <button
            onClick={() => handleModeChange('dense')}
            className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black comic-shadow-sm hover:-translate-y-0.5 rounded-xl ${
              currentPatternMode === 'dense'
                ? 'bg-[#ffd700] text-black ring-2 ring-black shadow-[2px_2px_0px_#000]'
                : 'bg-white text-stone-800 hover:bg-[#ffd700] hover:text-black'
            }`}
            title="Dense screentone (8px grid): Intense combat, Wano, Summit War"
          >
            DENSE [8px]
          </button>

          {/* Loose Pattern Button */}
          <button
            onClick={() => handleModeChange('loose')}
            className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black comic-shadow-sm hover:-translate-y-0.5 rounded-xl ${
              currentPatternMode === 'loose'
                ? 'bg-[#0b44c8] text-white ring-2 ring-black shadow-[2px_2px_0px_#000]'
                : 'bg-white text-stone-800 hover:bg-[#0b44c8] hover:text-white'
            }`}
            title="Loose screentone (22px grid): Vintage classic, East Blue, Romance Dawn"
          >
            LOOSE [22px]
          </button>

          {/* Inverted Pattern Button */}
          <button
            onClick={() => handleModeChange('inverted')}
            className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black comic-shadow-sm hover:-translate-y-0.5 rounded-xl ${
              currentPatternMode === 'inverted'
                ? 'bg-[#dc0f0d] text-white ring-2 ring-black shadow-[2px_2px_0px_#000]'
                : 'bg-white text-stone-800 hover:bg-[#dc0f0d] hover:text-white'
            }`}
            title="Inverted dark screentone: Void Century & Egghead mysterious tone"
          >
            INVERTED
          </button>

          {/* Info toggle */}
          <button
            onClick={() => {
              sound.playClick(1000);
              setShowDetails(!showDetails);
            }}
            className={`p-2 border-2 border-black text-xs font-heading font-black transition-all cursor-pointer ml-1 comic-shadow-sm hover:-translate-y-0.5 flex items-center gap-1 rounded-xl ${
              showDetails ? 'bg-[#ffd700] text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-stone-800 hover:bg-stone-100'
            }`}
            title="Toggle Screentone Details"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold hidden md:inline">SPECS</span>
          </button>
        </div>
      </div>

      {/* Expandable Screentone Specs / Description Banner */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t-3 border-black grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-heading text-stone-900 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-[#f0f6ff] p-3 border-2 border-black comic-shadow-sm relative overflow-hidden rounded-xl">
            <div className="absolute top-0 right-0 bg-[#0b44c8] text-white text-[9px] px-1.5 py-0.5 font-mono font-black border-l-2 border-b-2 border-black rounded-bl">
              22PX MATRIX
            </div>
            <div className="flex items-center space-x-1.5 text-[#0b44c8] font-black text-xs mb-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>LOOSE SCREENTONE</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug font-bold">
              Airy 22px raster dots evoking early 1997 Romance Dawn & classic East Blue manga volume prints from Eiichiro Oda.
            </p>
          </div>

          <div className="bg-[#fffef0] p-3 border-2 border-black comic-shadow-sm relative overflow-hidden rounded-xl">
            <div className="absolute top-0 right-0 bg-[#ffd700] text-black text-[9px] px-1.5 py-0.5 font-mono font-black border-l-2 border-b-2 border-black rounded-bl">
              8PX BATTLE TONE
            </div>
            <div className="flex items-center space-x-1.5 text-amber-700 font-black text-xs mb-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>DENSE SCREENTONE</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug font-bold">
              High-frequency 8px pitch screentone simulating climax combat double-page spreads in Onigashima and Marineford.
            </p>
          </div>

          <div className="bg-[#fff5f5] p-3 border-2 border-black comic-shadow-sm relative overflow-hidden rounded-xl">
            <div className="absolute top-0 right-0 bg-[#dc0f0d] text-white text-[9px] px-1.5 py-0.5 font-mono font-black border-l-2 border-b-2 border-black rounded-bl">
              NEGATIVE INK
            </div>
            <div className="flex items-center space-x-1.5 text-[#dc0f0d] font-black text-xs mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INVERTED SCREENTONE</span>
            </div>
            <p className="text-[11px] text-stone-700 leading-snug font-bold">
              Dark ink negative cutout dots with cyber/crimson field for ominous Void Century and Egghead revelations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};