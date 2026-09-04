import React, { useState, useEffect } from 'react';
import { HAKI_TYPES_DATA, TOP_TIER_HAKI_RANKS } from '../data/haki.ts';
import { sound } from '../utils/audio.ts';
import { 
  Eye, 
  Crown
} from 'lucide-react';

export const HakiCombatLab: React.FC = () => {
  const [selectedHakiIdx, setSelectedHakiIdx] = useState<number>(2); 
  const [activeVisualFX, setActiveVisualFX] = useState<string | null>(null);

  // Future Sight interactive countdown state
  const [futureSightTimer, setFutureSightTimer] = useState<number>(5);

  useEffect(() => {
    let interval: any;
    if (activeVisualFX === 'future-sight') {
      setFutureSightTimer(5);
      interval = setInterval(() => {
        setFutureSightTimer((prev) => (prev > 1 ? prev - 1 : 5));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [activeVisualFX]);

  const activeHaki = HAKI_TYPES_DATA[selectedHakiIdx];

  const triggerVisualSimulation = (type: string) => {
    setActiveVisualFX(type);
    if (type === 'conquerors') {
      sound.playConquerorsLightning();
    } else if (type === 'future-sight') {
      sound.playPoneglyphHum();
    } else {
      sound.playSwordSlash();
    }

    setTimeout(() => {
      setActiveVisualFX(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pt-4 relative">
      {/* 1. INTERACTIVE ACOC LIGHTNING STRIKE EFFECT OVERLAY */}
      {activeVisualFX === 'conquerors' && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden animate-shake bg-red-600/10">
          {/* Jagged comic lightning bolt SVG lines */}
          <svg className="absolute inset-0 w-full h-full stroke-[#ff0055] stroke-[4] fill-none animate-pulse opacity-90">
            <path d="M 100,0 L 300,400 L 200,450 L 600,900 L 400,500 L 800,200 Z" />
            <path d="M 900,100 L 600,400 L 750,550 L 200,800" stroke="#000000" strokeWidth="8" />
            <path d="M 900,100 L 600,400 L 750,550 L 200,800" stroke="#ffea75" strokeWidth="3" />
          </svg>

          <div className="absolute top-1/3 bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] transform -rotate-2 animate-bounce z-50">
            <span className="font-heading font-black text-3xl sm:text-5xl text-black uppercase tracking-wider text-center block">
              SKY SPLIT // ACOC INFUSION
            </span>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE FUTURE SIGHT PRECOGNITION HUD OVERLAY */}
      {activeVisualFX === 'future-sight' && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-cyan-950/30 backdrop-blur-[2px] overflow-hidden">
          {/* Holographic scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

          <div className="relative z-10 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center max-w-lg mx-4 space-y-3">
            <div className="bg-[#00f2ff] border-2 border-black px-3 py-1 font-mono font-bold text-xs uppercase inline-block text-black">
              KENBUNSHOKU HAKI // PRECOGNITION ACTIVE
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-black uppercase">
              Seeing {futureSightTimer} Seconds Into The Future
            </h3>
            <p className="font-mono text-xs text-black font-bold">
              Incoming attack trajectory calculated. All enemy movements appear in slow motion.
            </p>
          </div>
        </div>
      )}

      {/* Top Banner with Manga Corner L-Brackets */}
      <div className="bg-white border-4 border-black p-5 relative shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden">
        {/* Manga Corner L-Brackets ⌜ ⌝ ⌞ ┘ */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-4 border-r-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-4 border-r-4 border-black pointer-events-none z-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-black font-mono font-bold text-xs mb-1 bg-[#ffd700] px-2 py-0.5 inline-block border-2 border-black">
              <span>THE THREE COLORS OF SPIRITUAL WILLPOWER (覇気)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-black tracking-tight uppercase">
              HAKI COMBAT LAB // SPIRITUAL SUPREMACY
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-800 mt-1 max-w-2xl font-bold">
              &ldquo;In this world, only Haki can transcend all!&rdquo; — Deconstructing Armament, Observation, and Conqueror’s Infusion.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerVisualSimulation('conquerors')}
              className="px-3 py-2 bg-[#ff0055] hover:bg-[#ff3377] text-white text-xs font-mono font-bold flex items-center space-x-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-white" />
              <span>Fire ACoC Lightning</span>
            </button>
            <button
              onClick={() => triggerVisualSimulation('future-sight')}
              className="px-3 py-2 bg-[#00f2ff] hover:bg-[#33f5ff] text-black text-xs font-mono font-bold flex items-center space-x-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-black" />
              <span>Trigger Future Sight</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Colors Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {HAKI_TYPES_DATA.map((haki, idx) => {
          const isSelected = selectedHakiIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setSelectedHakiIdx(idx);
              }}
              className={`p-4 border-4 text-left transition-all cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl ${
                isSelected
                  ? 'bg-[#ffd700] border-black scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-black text-slate-700'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block text-black uppercase">{haki.colorName}</span>
              <h3 className="font-heading font-black text-base text-black mt-1 uppercase">
                {haki.name.split('(')[0]}
              </h3>
              <p className="text-xs font-mono text-slate-900 font-bold mt-0.5">
                {haki.japaneseName}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Color Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border-4 border-black p-5 space-y-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-2xl">
          <div className="border-b-4 border-black pb-3">
            <span className="text-xs font-mono font-bold text-black bg-[#ffd700] px-2 py-0.5 border-2 border-black inline-block uppercase">{activeHaki.colorName}</span>
            <h2 className="text-xl font-heading font-black text-black uppercase mt-2">{activeHaki.name}</h2>
            <p className="text-xs font-mono font-bold text-slate-800">{activeHaki.japaneseName}</p>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-mono font-bold text-black mb-1 uppercase">FUNDAMENTAL APPLICATION (BASE):</h4>
              <p className="text-xs sm:text-sm font-mono text-black font-semibold leading-relaxed bg-slate-100 p-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {activeHaki.baseApplication}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-black mb-1 uppercase">ADVANCED / AWAKENED APPLICATION:</h4>
              <p className="text-xs sm:text-sm font-mono text-black font-semibold leading-relaxed bg-[#fff9c4] p-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {activeHaki.advancedApplication}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-black mb-1 uppercase">VISUAL PHENOMENA:</h4>
              <p className="text-xs font-mono text-slate-800 font-bold bg-slate-50 p-2.5 border-2 border-black">
                {activeHaki.visualEffectDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-black mb-1 uppercase">NOTABLE APEX MASTERS:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeHaki.masterUsers.map((u, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white text-xs font-mono font-bold text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {u}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apex Tier Ranking Board */}
        <div className="lg:col-span-5 bg-white border-4 border-black p-5 space-y-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-2xl">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black border-b-4 border-black pb-2 bg-[#ffd700] p-2 border-2 border-black">
            <span>TOP-TIER HAKI MASTERS COMPARATIVE DOSSIER</span>
          </div>

          <div className="space-y-3">
            {TOP_TIER_HAKI_RANKS.map((char, idx) => (
              <div key={idx} className="bg-slate-50 border-2 border-black p-3 space-y-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-sm text-black uppercase">{char.name}</h4>
                  <span className="text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5">{char.epithet}</span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-black font-bold">
                  <div>
                    <span className="text-red-600 font-black">Conqueror:</span> {char.conquerorsTier.split('(')[0]}
                  </div>
                  <div>
                    <span className="text-blue-600 font-black">Armament:</span> {char.armamentTier.split('(')[0]}
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-800 font-bold pt-1 border-t border-black/20 leading-snug">
                  {char.signatureFeat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};