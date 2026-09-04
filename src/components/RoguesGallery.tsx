import React, { useState } from 'react';
import { ARC_VILLAINS_DATA } from '../data/villains.ts';
import { ArcVillain } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { Search } from 'lucide-react';
import { MangaBubble } from './Manga/MangaBubble.tsx';
import { LuffyLaughing } from './icons/LuffyLaughing.tsx';
import { LuffyPointing } from './icons/LuffyPointing.tsx';

export const RoguesGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHakiTier, setSelectedHakiTier] = useState<string>('all');
  const [selectedVillain, setSelectedVillain] = useState<ArcVillain | null>(null);

  const formatBounty = (num: number) => {
    if (num === 0) return 'CLASSIFIED / UNISSUED';
    return '฿' + num.toLocaleString();
  };

  const filteredVillains = ARC_VILLAINS_DATA.filter((v) => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.arc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.devilFruit && v.devilFruit.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHaki = selectedHakiTier === 'all' || v.hakiTier === selectedHakiTier;

    return matchesSearch && matchesHaki;
  });

  const hakiTiers = ['all', 'None', 'Basic Haki', 'Advanced Haki', 'Supreme King Tier', 'Ancient Demonic'];

  const getThreatLevelColor = (tier: string): string => {
    if (tier === 'Supreme King Tier' || tier === 'Ancient Demonic') return 'bg-[#dc0f0d] text-white';
    if (tier === 'Advanced Haki') return 'bg-amber-400 text-black';
    return 'bg-black text-white';
  };

  return (
    <div className="space-y-8 font-heading text-black pt-4 relative">
      
      {/* Top Banner // Gear 5 Theme with Luffy Icons & Corner Brackets */}
      <header className="relative bg-white p-6 sm:p-8 border-4 border-black rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
        {/* Manga Corner L-Brackets on Header Only */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-4 border-r-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-4 border-r-4 border-black pointer-events-none z-20" />

        {/* Luffy Laughing Background Watermark on the Top Left */}
        <div className="absolute -top-6 -left-6 opacity-25 w-48 h-48 pointer-events-none z-0">
          <LuffyLaughing />
        </div>

        {/* Luffy Pointing Background Watermark on the Top Right */}
        <div className="absolute -bottom-10 -right-10 opacity-20 w-64 h-64 rotate-6 pointer-events-none z-0">
          <LuffyPointing />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 text-xs font-black mb-2">
              <span className="px-3 py-1 bg-black text-[#ffd700] uppercase tracking-widest rounded-md border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                NIKA ARCHIVE
              </span>
              <span className="text-black uppercase tracking-wider bg-pink-200 px-2.5 py-0.5 rounded border-2 border-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">Freeform Intelligence</span>
            </div>
            
            <div className="relative">
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-black tracking-tight uppercase leading-none">
                Threats <span className="text-[#dc0f0d]">&</span> Rogues Gallery
              </h1>
              <span className="absolute -top-6 left-[280px] font-heading font-black text-2xl text-pink-500 rotate-12 hidden sm:inline-block bg-white px-1 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">DOKAN!!</span>
            </div>
            
            <p className="text-xs sm:text-sm font-mono text-slate-800 mt-4 max-w-3xl bg-slate-50 p-3 rounded-xl border-2 border-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Labophase tactical database. Log of major antagonists, organization affiliations, Devil Fruit data, and the definitive moments of their liberation (defeat) across the Grand Line saga.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="text-right bg-white text-black p-4 border-4 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <span className="block text-[10px] text-slate-600 uppercase tracking-widest font-mono font-bold">Total Entries</span>
              <span className="text-4xl font-extrabold text-[#ffd700] font-mono leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {ARC_VILLAINS_DATA.length.toString().padStart(3, '0')}
              </span>
              <span className="text-xs font-mono font-bold text-black ml-1 uppercase">Devils</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="space-y-6">
        
        {/* Responsive Grid Search & Filters Panel */}
        <div className="bg-white p-5 border-4 border-black rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search Bar (Span 4 cols) */}
          <div className="relative lg:col-span-4 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search names, fruits, arcs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-4 border-black rounded-2xl text-xs font-mono font-bold placeholder-slate-500 focus:outline-none transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black"
            />
          </div>

          {/* Filter Pills (Span 8 cols, wrapping nicely) */}
          <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0 lg:flex-wrap">
            {hakiTiers.map((tier) => (
              <button
                key={tier}
                onClick={() => { sound.playClick(); setSelectedHakiTier(tier); }}
                className={`px-3 py-2 text-[11px] font-mono font-bold whitespace-nowrap rounded-xl transition-all border-4 cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] ${
                  selectedHakiTier === tier
                    ? 'bg-[#ffd700] text-black border-black scale-105'
                    : 'bg-white text-slate-800 border-black hover:bg-slate-50'
                }`}
              >
                {tier === 'all' ? 'All Threats' : tier}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredVillains.map((villain) => {
            const isSelected = selectedVillain?.id === villain.id;

            return (
              <div
                key={villain.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedVillain(villain);
                }}
                className={`group bg-white p-6 border-4 border-black rounded-3xl transition-all space-y-5 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'shadow-[8px_8px_0px_rgba(255,215,0,1)] border-black -translate-y-1'
                    : 'shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-black bg-[#ffd700] px-2 py-0.5 border-2 border-black inline-block uppercase mb-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {villain.arc}
                    </span>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-black uppercase tracking-tight leading-none mt-1 group-hover:text-pink-600 transition-colors">
                      {villain.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-slate-800 italic mt-1">
                      {villain.epithet}
                    </p>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 uppercase rounded-xl border-2 border-black whitespace-nowrap shadow-[2px_2px_0px_rgba(0,0,0,1)] ${getThreatLevelColor(villain.hakiTier)}`}>
                    {villain.hakiTier}
                  </span>
                </div>

                {villain.devilFruit && (
                  <div className="flex items-center gap-3 text-xs bg-slate-50 p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <div>
                      <span className="block font-heading font-black text-sm text-black uppercase">{villain.devilFruit.name}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wider">{villain.devilFruit.type} Type</span>
                    </div>
                    <span className="ml-auto text-2xl font-heading font-black text-pink-500 bg-white px-2 py-0.5 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-3">GUM!</span>
                  </div>
                )}

                <div className="pt-4 border-t-2 border-dashed border-black flex items-center justify-between gap-4">
                  <div className="font-mono">
                    <span className="block text-[10px] text-slate-800 uppercase tracking-widest font-bold">Current Bounty</span>
                    <span className="text-xl font-black text-black tracking-tight bg-[#ffd700] px-3 py-1 rounded-xl border-2 border-black inline-block mt-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {formatBounty(villain.bounty)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl border-4 border-black space-y-2 font-mono text-xs shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center space-x-1.5 text-pink-400">
                    <span className="font-black uppercase text-stone-200">Ultimate Defeat Move:</span>
                  </div>
                  <div className="text-white font-bold text-sm pl-2">
                    {villain.ultimateDefeatMove.moveName}
                  </div>
                  <div className="text-stone-300 pl-2 flex justify-between font-bold text-[11px]">
                    <span>By: {villain.ultimateDefeatMove.attacker}</span>
                    <span className="text-[#ffd700] bg-black px-1.5 py-0.5 border border-stone-700">Ch. {villain.ultimateDefeatMove.chapter}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <MangaBubble
                    quote={villain.quote}
                    shape="square"
                    variant="paper"
                    fontStyle="comic"
                    size="sm"
                    tailPosition="none"
                    showCopyButton={true}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};