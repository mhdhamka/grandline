import React, { useState, useEffect } from 'react';
import { Navbar, TerminalTab } from './components/Navbar.tsx';
import { LogPoseTimeline } from './components/LogPoseTimeline.tsx';
import { PoneglyphLaughTale } from './components/PoneglyphLaughTale.tsx';
import { NakamaCodex } from './components/NakamaCodex.tsx';
import { TransformationMatrix } from './components/TransformationMatrix.tsx';
import { DevilFruitTree } from './components/DevilFruitTree.tsx';
import { RoguesGallery } from './components/RoguesGallery.tsx';
import { BountyGenerator } from './components/BountyGenerator.tsx';
import { HakiCombatLab } from './components/HakiCombatLab.tsx';
import { CinematicTimeline } from './components/CinematicTimeline.tsx';
import { VegapunkAiTerminal } from './components/VegapunkAiTerminal.tsx';
import { MangaHalftoneMenu, HalftonePatternMode } from './components/MangaHalftoneMenu.tsx';
import { sound } from './utils/audio.ts';
import { Sun, Heart } from 'lucide-react';
import jollyRogerImg from './assets/images/jollyroger.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('timeline'); 
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeEra, setActiveEra] = useState<string>('Egghead / Final Saga');
  const [halftoneMode, setHalftoneMode] = useState<HalftonePatternMode>('auto');
  
  // Interactive Gear 5 Awakening Mode State
  const [nikaAwakened, setNikaAwakened] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Set Jolly Roger dynamic tab icon on mount
  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/png';
    link.href = jollyRogerImg;
  }, []);

  // Trigger heartbeat counter when awakened
  useEffect(() => {
    let interval: any;
    if (nikaAwakened) {
      interval = setInterval(() => {
        setPulseCount((prev) => prev + 1);
      }, 800); // Heartbeat rhythm speed
    } else {
      setPulseCount(0);
    }
    return () => clearInterval(interval);
  }, [nikaAwakened]);

  const toggleNikaAwakening = () => {
    sound.playClick();
    const nextState = !nikaAwakened;
    setNikaAwakened(nextState);
    if (nextState) {
      console.log("Drums of Liberation reaching maximum frequency! Nika mode active!");
    }
  };

  // Compute effective halftone pattern based on selection or active era
  const getEffectivePattern = (mode: HalftonePatternMode, era: string): 'dense' | 'loose' | 'inverted' => {
    if (mode !== 'auto') {
      return mode;
    }
    const lower = era.toLowerCase();
    if (
      lower.includes('east blue') || 
      lower.includes('romance') || 
      lower.includes('paradise') || 
      lower.includes('alabasta') || 
      lower.includes('arabasta') || 
      lower.includes('skypiea')
    ) {
      return 'loose';
    }
    if (
      lower.includes('egghead') || 
      lower.includes('final') || 
      lower.includes('void') || 
      lower.includes('thriller')
    ) {
      return 'inverted';
    }
    return 'dense';
  };

  const effectivePattern = getEffectivePattern(halftoneMode, activeEra);

  return (
    <div className={`min-h-screen text-stone-900 font-heading border-x-4 border-black relative flex flex-col selection:bg-pink-500 selection:text-white transition-all duration-500 ${
      nikaAwakened ? 'bg-white shadow-[inset_0_0_80px_rgba(255,215,0,0.35)]' : 'bg-[#fffdfa]'
    }`}>
      {/* TCG Playmat & Manga Action Speedlines Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none tcg-playmat-grid z-0"></div>
      <div className="fixed inset-0 opacity-15 pointer-events-none manga-speedlines z-0"></div>

      {/* Floating Gear 5 Pure White Cloud & Lightning Particles when Awakened */}
      {nikaAwakened && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div className="absolute top-20 left-10 animate-bounce bg-white border-3 border-black rounded-full px-4 py-2 text-xs font-black shadow-[4px_4px_0px_#ffd700] rotate-[-6deg]">
            ☁️ SUN GOD NIKA FORM!
          </div>
          <div className="absolute top-40 right-16 animate-pulse bg-amber-300 border-3 border-black rounded-full px-4 py-2 text-xs font-black shadow-[4px_4px_0px_#000] rotate-[8deg]">
            ⚡ LIGHTNING AURA ACTIVE!
          </div>
        </div>
      )}

      {/* Global Navigation HUD */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        activeEra={activeEra}
      />

      {/* Main Omniverse Display Workspace */}
      <main id="main-workspace" className="flex-1 max-w-7xl w-full mx-auto px-4 py-5 sm:px-6 relative z-10">
        {/* Manga-Panel Halftone Background Overlay */}
        <div 
          id="manga-bendy-dots-overlay"
          className={`bendy-dots-overlay manga-panel-overlay pattern-${effectivePattern} pointer-events-none`} 
          aria-hidden="true" 
        />

        <div className="relative z-10 space-y-6">
          {/* Halftone Screentone Selection & Era Control Strip */}
          <div className="transform transition-transform hover:scale-[1.01]">
            <MangaHalftoneMenu
              currentPatternMode={halftoneMode}
              onSelectPatternMode={setHalftoneMode}
              activeEra={activeEra}
              onSelectEra={setActiveEra}
              effectivePattern={effectivePattern}
            />
          </div>

          {/* Interactive Active Tab Container Box with Puffy Comic Border */}
          <div className={`p-1 sm:p-2 border-4 border-black bg-white rounded-[2rem] transition-all duration-300 relative ${
            nikaAwakened 
              ? 'shadow-[8px_8px_0px_#ffd700] ring-4 ring-amber-400' 
              : 'shadow-[6px_6px_0px_#000]'
          }`}>
            {/* Corner Decorative Comic Dots */}
            <div className="absolute -top-3 -left-3 bg-[#ffd700] border-2 border-black w-6 h-6 rounded-full flex items-center justify-center font-black text-xs z-20">
              <Sun className={`w-3.5 h-3.5 ${nikaAwakened ? 'animate-spin text-black' : 'text-black'}`} />
            </div>

            <div className="p-2 sm:p-4 bg-[#fffdfa] rounded-[1.75rem]">
              {activeTab === 'timeline' && <LogPoseTimeline onSelectArcEra={setActiveEra} />}
              {activeTab === 'poneglyphs' && <PoneglyphLaughTale />}
              {activeTab === 'nakama' && <NakamaCodex />}
              {activeTab === 'gears' && <TransformationMatrix />}
              {activeTab === 'devilfruit' && <DevilFruitTree />}
              {activeTab === 'rogues' && <RoguesGallery />}
              {activeTab === 'wanted' && <BountyGenerator />}
              {activeTab === 'haki' && <HakiCombatLab />}
              {activeTab === 'movies' && <CinematicTimeline />}
              {activeTab === 'vegapunk' && <VegapunkAiTerminal />}
            </div>
          </div>
        </div>
      </main>

      {/* Manga & TCG Card Game Interactive Footer Strip */}
      <footer className="sticky bottom-0 z-30 bg-[#f3f0eb] border-t-4 border-black text-xs font-heading shadow-[0_-4px_15px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 flex items-center space-x-2 overflow-hidden w-full">
            <span className="px-2.5 py-1 bg-black text-[#ffd700] text-[10px] font-black border-2 border-black rounded-lg comic-shadow-sm uppercase flex items-center gap-1 shrink-0">
              TCG CANON
            </span>
            <span className="text-xs text-stone-700 font-mono truncate font-bold">
              OP-01–09 SYNCED // CH. 1,191+ CANON // © EIICHIRO ODA
            </span>
            <span className="manga-sfx text-xs tracking-wider shrink-0 hidden lg:inline-block text-pink-600 font-black animate-pulse">
              {nikaAwakened ? `BA-DUM!! [${pulseCount}] 🎶` : 'BA-DUM!! 🎶'}
            </span>
          </div>

          {/* Interactive Status & Awakening Trigger Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-[10px] font-heading">
            <div className={`px-3 py-1.5 border-2 border-black rounded-xl font-black uppercase transition-all comic-shadow-sm ${
              soundEnabled 
                ? 'bg-[#ffd700] text-black shadow-[2px_2px_0px_#000]' 
                : 'bg-stone-300 text-stone-700'
            }`}>
              DRUMS: {soundEnabled ? 'ACTIVE ' : 'MUTED'}
            </div>

            <div className="px-3 py-1.5 bg-black text-[#ffd700] border-2 border-black rounded-xl font-black comic-shadow-sm shadow-[2px_2px_0px_#ffd700]">
              TOON DECK: READY
            </div>

            {/* Clickable Nika Awakening Mode Button */}
            <button
              onClick={toggleNikaAwakening}
              className={`px-3.5 py-1.5 border-2 border-black rounded-xl font-black cursor-pointer transition-all active:scale-95 comic-shadow-sm shadow-[2px_2px_0px_#000] flex items-center gap-1.5 ${
                nikaAwakened 
                  ? 'bg-[#ffd700] text-black animate-bounce ring-2 ring-black shadow-[3px_3px_0px_#000]' 
                  : 'bg-pink-500 text-white hover:bg-pink-600 hover:-translate-y-0.5'
              }`}
              title="Click to trigger Gear 5 Nika Awakening!"
            >
              <Heart className={`w-3.5 h-3.5 ${nikaAwakened ? 'fill-black text-black' : 'fill-white text-white'}`} />
              <span>{nikaAwakened ? 'NIKA: 100% AWAKE ' : 'AWAKEN NIKA'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}