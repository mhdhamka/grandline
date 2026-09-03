import React, { useRef, useState } from 'react';
import { 
  Volume2, 
  VolumeX,
  Sun
} from 'lucide-react';
import { sound } from '../utils/audio.ts';

import skullLogo from '../assets/images/jollyroger.png';
import sunnyLogo from '../assets/images/sunny.png'; // Make sure this path points to your sunny.png file

export type TerminalTab = 
  | 'timeline' 
  | 'poneglyphs' 
  | 'nakama' 
  | 'gears' 
  | 'devilfruit'
  | 'rogues' 
  | 'wanted' 
  | 'haki' 
  | 'ship' 
  | 'movies' 
  | 'vegapunk';

interface NavbarProps {
  activeTab: TerminalTab;
  setActiveTab: (tab: TerminalTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeEra: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  activeEra,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [bounceTab, setBounceTab] = useState<TerminalTab | null>(null);

  const handleTabClick = (tab: TerminalTab) => {
    sound.playClick();
    setBounceTab(tab);
    setTimeout(() => setBounceTab(null), 300);
    setActiveTab(tab);
  };

  const toggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    sound.playClick();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const navItems: { 
    id: TerminalTab; 
    cost: number; 
    label: string; 
    jp: string; 
  }[] = [
    { id: 'timeline', cost: 1, label: 'LOG POSE', jp: '航海日誌' },
    { id: 'poneglyphs', cost: 2, label: 'PONEGLYPHS', jp: '歴史の本文' },
    { id: 'nakama', cost: 3, label: 'NAKAMA', jp: '麦わらの一味' },
    { id: 'gears', cost: 4, label: 'GEAR MATRIX', jp: 'ギア覚醒' },
    { id: 'devilfruit', cost: 5, label: 'DEVIL FRUIT', jp: '悪魔の実系統樹' },
    { id: 'rogues', cost: 6, label: 'ROGUES GALLERY', jp: '強敵ファイル' },
    { id: 'wanted', cost: 7, label: 'WANTED STUDIO', jp: '手配書生成' },
    { id: 'haki', cost: 8, label: 'HAKI', jp: '覇気鍛錬' },
    { id: 'ship', cost: 9, label: 'THOUSAND SUNNY', jp: 'サニー号' },
    { id: 'movies', cost: 10, label: 'CINEMATICS', jp: '劇場版回顧' },
    { id: 'vegapunk', cost: 11, label: 'VEGAPUNK AI', jp: 'ベガパンクAI' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fffdfa] border-b-4 border-black shadow-[0_8px_0px_#000000] rounded-b-[2rem] overflow-hidden">
      {/* Tactical Corner Accents */}
      <div className="corner-bracket-tl"></div>
      <div className="corner-bracket-tr"></div>

      {/* Top Banner with Nika Yellow & Black Highlights */}
      <div className="bg-[#ffd700] border-b-3 border-black px-4 py-2 flex items-center justify-between text-black text-xs font-black relative overflow-hidden">
        <div className="absolute inset-0 bendy-dots-overlay opacity-20 pointer-events-none"></div>
        <div className="flex items-center space-x-2 font-heading tracking-wide relative z-10">
          <span className="px-2.5 py-0.5 bg-white text-black text-[9px] font-black tracking-widest border-2 border-black rounded-full uppercase comic-shadow-sm flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} /> SUN GOD NIKA 
          </span>

          <span className="font-black text-[11px] tracking-tight text-black hidden sm:flex items-center gap-1.5 font-manga">
            <span>TOON WORLD ARCHIVES</span>
            <span className="text-black font-jp text-xs font-black bg-white px-1.5 py-0.5 rounded-md border-2 border-black">「ニカの覚醒」</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] font-mono relative z-10">
          <span className="bg-white text-black px-3 py-0.5 border-2 border-black rounded-full font-black text-[9px] comic-shadow-sm animate-bounce">
              DRUMS OF LIBERATION 
          </span>
        </div>
      </div>

      {/* Main Header Box: Grand Line Archives Rebrand */}
      <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-[#fffdfa] relative">
        <div className="absolute inset-0 bendy-dots-overlay opacity-10 pointer-events-none"></div>
        
        {/* Brand & Title */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3.5">
            {/* Jolly Roger Emblem */}
            <div className="w-13 h-13 bg-[#ffffff] border-3 border-black rounded-[1.25rem] comic-shadow flex items-center justify-center shrink-0 rotate-[-4deg] overflow-hidden p-1.5 transition-transform hover:rotate-6 hover:scale-110 shadow-[3px_3px_0px_#000]">
              <img 
                src={skullLogo} 
                alt="Straw Hat Jolly Roger" 
                className="w-full h-full object-contain filter drop-shadow-[2px_2px_0px_#ffd700]"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-black font-manga tracking-wider uppercase text-black flex items-center gap-2">
                  <span>GRAND LINE ARCHIVES</span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#dc0f0d] text-white border-2 border-black rounded-md font-jp font-black comic-shadow-sm">
                    偉大なる航路
                  </span>
                </h1>
              </div>
              <p className="text-[10px] text-stone-700 font-heading tracking-wide flex items-center gap-1.5 font-bold">
                <span className="text-pink-600 bg-pink-100 px-1.5 py-0.5 rounded border border-black">LAUGH TALE DATABASE</span> 
                <span className="text-stone-400">//</span> 
                <span>ROAD PONEGLYPHS & NIKA AWAKENING </span> 
                <span className="text-stone-400">//</span> 
                <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-black font-black">1,191+ CH. CANON </span>
              </p>
            </div>
          </div>

          {/* Sound Toggle (Mobile) */}
          <button
            onClick={toggleSound}
            className={`sm:hidden px-3 py-1 rounded-full text-[11px] font-heading font-black border-2 border-black comic-shadow-sm transition-all ${
              soundEnabled ? 'bg-[#dc0f0d] text-white' : 'bg-stone-200 text-stone-800'
            }`}
          >
            {soundEnabled ? 'SFX: ON 🔊' : 'SFX: OFF 🔇'}
          </button>
        </div>

        {/* Global Controls & Era Status */}
        <div className="flex items-center gap-2.5 self-end md:self-auto text-xs font-heading relative z-10">
          {/* Era Stamp */}
          <div className="bg-white border-2 border-black rounded-xl px-3.5 py-1.5 comic-shadow-sm text-right relative overflow-hidden group hover:bg-[#fff9e6] transition-colors">
            <span className="text-[8px] uppercase tracking-wider text-stone-500 block font-mono font-bold">
              SAGA TIMELINE 
            </span>
            <span className="text-[11px] font-black text-black uppercase truncate block max-w-[140px] sm:max-w-[180px]">
              {activeEra}
            </span>
          </div>

          {/* Sound Toggle Button (Desktop) */}
          <button
            onClick={toggleSound}
            className={`hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 border-2 border-black rounded-xl font-black text-[11px] comic-shadow-sm transition-all cursor-pointer hover:-translate-y-0.5 ${
              soundEnabled
                ? 'bg-[#dc0f0d] text-white hover:bg-red-700'
                : 'bg-stone-200 text-stone-800 hover:bg-stone-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-stone-600" />}
            <span>SFX: {soundEnabled ? 'BA-DUM!! ' : 'MUTED'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Panels with Thousand Sunny Logo Scroll Buttons */}
      <nav className="border-t-3 border-black bg-[#f3f0eb] px-3 py-2.5 shadow-inner relative flex items-center">
        <div className="absolute inset-0 bendy-dots-overlay opacity-15 pointer-events-none"></div>

        {/* Left Scroll Button - Using Sunny Head Logo */}
        <button 
          onClick={() => scrollTabs('left')}
          className="hidden md:flex flex-col items-center justify-center w-11 h-11 bg-white text-black border-3 border-black rounded-full comic-shadow-sm mr-2.5 shrink-0 z-20 hover:bg-amber-100 active:translate-y-0.5 cursor-pointer font-black transition-all hover:scale-110 shadow-[2px_2px_0px_#000] p-1 overflow-hidden"
          title="Scroll Left (Thousand Sunny Head)"
        >
          <img src={sunnyLogo} alt="Sunny Head" className="w-full h-full object-contain filter drop-shadow-[1px_1px_0px_#000]" />
        </button>

        {/* Scrollable Puffy Cloud Tabs */}
        <div 
          ref={scrollContainerRef}
          className="max-w-7xl mx-auto flex items-center space-x-2.5 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1 relative z-10 w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isBouncing = bounceTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-heading tracking-tight whitespace-nowrap transition-all duration-200 border-3 rounded-full cursor-pointer relative group shrink-0 ${
                  isActive
                    ? 'bg-black text-[#ffd700] border-black font-black comic-shadow shadow-[3px_3px_0px_#ffd700] -translate-y-2 z-10 scale-[1.07]'
                    : 'bg-white text-stone-900 border-black hover:bg-[#ffd700] hover:text-black comic-shadow-sm hover:-translate-y-1 shadow-[2px_2px_0px_#000]'
                } ${isBouncing ? 'scale-110 rotate-2' : ''}`}
              >
                {/* Cost / Chapter Index Cloud Gem */}
                <span className={`w-4.5 h-4.5 rounded-full border-2 border-black flex items-center justify-center text-[9px] font-black shrink-0 shadow-inner ${
                  isActive ? 'bg-[#ffd700] text-black' : 'bg-stone-100 text-stone-900'
                }`}>
                  {item.cost}
                </span>

                {/* Label */}
                <span className="font-black">
                  {item.label}
                </span>

                {/* Japanese Subtext badge */}
                <span className={`text-[9px] font-jp font-bold px-1.5 py-0.5 rounded-md border ${
                  isActive ? 'border-amber-400/60 text-[#ffd700] bg-zinc-900' : 'border-stone-300 text-stone-600 bg-stone-100'
                }`}>
                  {item.jp}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button - Using Sunny Head Logo (Flipped or Normal) */}
        <button 
          onClick={() => scrollTabs('right')}
          className="hidden md:flex flex-col items-center justify-center w-11 h-11 bg-white text-black border-3 border-black rounded-full comic-shadow-sm ml-2.5 shrink-0 z-20 hover:bg-amber-100 active:translate-y-0.5 cursor-pointer font-black transition-all hover:scale-110 shadow-[2px_2px_0px_#000] p-1 overflow-hidden"
          title="Scroll Right (Thousand Sunny)"
        >
          <img src={sunnyLogo} alt="Sunny Tail" className="w-full h-full object-contain filter drop-shadow-[1px_1px_0px_#000] transform scale-x-[-1]" />
        </button>
      </nav>
    </header>
  );
};