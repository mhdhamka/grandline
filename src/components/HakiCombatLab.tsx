import React, { useState } from 'react';
import { HAKI_TYPES_DATA, TOP_TIER_HAKI_RANKS } from '../data/haki.ts';
import { sound } from '../utils/audio.ts';
import { 
  ShieldAlert, 
  Eye, 
  Zap, 
  Crown, 
  Sparkles, 
  Play, 
  Activity,
  Flame,
  Award
} from 'lucide-react';

export const HakiCombatLab: React.FC = () => {
  const [selectedHakiIdx, setSelectedHakiIdx] = useState<number>(2); // Default Haoshoku
  const [activeVisualFX, setActiveVisualFX] = useState<string | null>(null);

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
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Visual FX Screen Flash Overlay */}
      {activeVisualFX === 'conquerors' && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-950/40 animate-pulse">
          <div className="w-full h-full border-8 border-[#ff0055] shadow-[inset_0_0_120px_#ff0055]"></div>
          <div className="absolute font-black text-4xl sm:text-6xl text-[#ff0055] tracking-widest uppercase drop-shadow-[0_0_25px_#ff0055] text-center px-4">
            HAOSHOKU CLASH // ADVANCED CONQUEROR'S (ACoC)
          </div>
        </div>
      )}

      {activeVisualFX === 'future-sight' && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-cyan-950/40">
          <div className="w-full h-full border-8 border-[#00f2ff] shadow-[inset_0_0_120px_#00f2ff]"></div>
          <div className="absolute font-mono font-bold text-3xl sm:text-5xl text-[#00f2ff] tracking-widest uppercase drop-shadow-[0_0_25px_#00f2ff] text-center px-4">
            FUTURE SIGHT INITIALIZED // 5 SECONDS AHEAD
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0a1218] border border-[#ff0055]/30 p-5 relative shadow-[0_0_20px_rgba(255,0,85,0.08)]">
        <div className="corner-bracket-tr"></div>
        <div className="corner-bracket-bl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[#ff0055] text-xs font-mono mb-1">
              <ShieldAlert className="w-4 h-4 text-[#ff0055]" />
              <span>THE THREE COLORS OF SPIRITUAL WILLPOWER (覇気)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              HAKI COMBAT LAB // SPIRITUAL SUPREMACY
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#00f2ff]/80 mt-1 max-w-2xl">
              &ldquo;In this world, only Haki can transcend all!&rdquo; — Deconstructing Armament (Hardening & Internal Ryou), Observation (Precognition & Future Sight), and Conqueror’s (ACoC Infusion).
            </p>
          </div>

          {/* Quick Simulation Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerVisualSimulation('conquerors')}
              className="px-3 py-2 bg-[#ff0055] hover:bg-[#ff3377] text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_12px_#ff0055] transition-all cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-white" />
              <span>Fire ACoC Lightning</span>
            </button>
            <button
              onClick={() => triggerVisualSimulation('future-sight')}
              className="px-3 py-2 bg-[#00f2ff] hover:bg-[#33f5ff] text-black text-xs font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_12px_#00f2ff] transition-all cursor-pointer"
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
              className={`p-4 border text-left transition-all cursor-pointer ${
                isSelected
                  ? idx === 2
                    ? 'bg-[#ff0055]/20 border-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.25)] text-[#ff0055]'
                    : idx === 1
                    ? 'bg-[#00f2ff]/20 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.25)] text-[#00f2ff]'
                    : 'bg-[#ffcc00]/20 border-[#ffcc00] shadow-[0_0_15px_rgba(255,204,0,0.25)] text-[#ffcc00]'
                  : 'bg-[#0a1218] hover:bg-[#00f2ff]/10 border-[#00f2ff]/20 text-slate-400'
              }`}
            >
              <span className="text-[10px] font-mono block opacity-80 uppercase">{haki.colorName}</span>
              <h3 className="font-bold text-base text-white mt-1 uppercase">
                {haki.name.split('(')[0]}
              </h3>
              <p className="text-xs font-mono text-[#00f2ff]/70 mt-0.5">
                {haki.japaneseName}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Color Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-4 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
          <div className="border-b border-[#00f2ff]/20 pb-3">
            <span className="text-xs font-mono text-[#ffcc00] block uppercase">{activeHaki.colorName}</span>
            <h2 className="text-xl font-bold text-white uppercase">{activeHaki.name}</h2>
            <p className="text-xs font-mono text-[#00f2ff]">{activeHaki.japaneseName}</p>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-mono text-[#00f2ff] mb-1 uppercase">FUNDAMENTAL APPLICATION (BASE):</h4>
              <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed bg-[#05080a] p-3 border border-[#00f2ff]/20">
                {activeHaki.baseApplication}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-[#ff0055] mb-1 uppercase">ADVANCED / AWAKENED APPLICATION:</h4>
              <p className="text-xs sm:text-sm font-mono text-[#ffcc00] leading-relaxed bg-[#05080a] p-3 border border-[#ff0055]/30">
                {activeHaki.advancedApplication}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 mb-1 uppercase">VISUAL PHENOMENA:</h4>
              <p className="text-xs font-mono text-slate-300">
                {activeHaki.visualEffectDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 mb-1 uppercase">NOTABLE APEX MASTERS:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeHaki.masterUsers.map((u, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#05080a] text-xs font-mono text-[#00f2ff] border border-[#00f2ff]/30">
                    {u}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Apex Tier Ranking Board */}
        <div className="lg:col-span-5 bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-3 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#ffcc00] border-b border-[#00f2ff]/20 pb-2">
            <Award className="w-4 h-4 text-[#ffcc00]" />
            <span>TOP-TIER HAKI MASTERS COMPARATIVE DOSSIER</span>
          </div>

          <div className="space-y-3">
            {TOP_TIER_HAKI_RANKS.map((char, idx) => (
              <div key={idx} className="bg-[#05080a] border border-[#00f2ff]/20 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white uppercase">{char.name}</h4>
                  <span className="text-[10px] font-mono text-[#ffcc00]">{char.epithet}</span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-300">
                  <div>
                    <span className="text-[#ff0055] font-semibold">Conqueror:</span> {char.conquerorsTier.split('(')[0]}
                  </div>
                  <div>
                    <span className="text-[#00f2ff] font-semibold">Armament:</span> {char.armamentTier.split('(')[0]}
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-400 pt-1 border-t border-[#00f2ff]/10 leading-snug">
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
