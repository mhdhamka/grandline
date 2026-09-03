import React, { useState } from 'react';
import { ARC_VILLAINS_DATA } from '../data/villains.ts';
import { ArcVillain } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { 
  Search, 
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { BountyProgressionChart } from './BountyProgressionChart.tsx';
import { MangaBubble } from './MangaBubble.tsx';
import { LuffyLaughing } from './icons/LuffyLaughing.tsx';
import { LuffyPointing } from './icons/LuffyPointing.tsx';

export const RoguesGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dossier' | 'growth_chart'>('dossier');
  const [selectedCharForChart, setSelectedCharForChart] = useState<string>('blackbeard');
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
    <div className="space-y-8 font-heading text-black">
      
      {/* Top Banner // Gear 5 Theme with Luffy Icons Rendered */}
      <header className="relative bg-white p-6 sm:p-8 border-[6px] border-black rounded-[2rem] shadow-[10px_10px_0px_rgba(0,0,0,0.9)] overflow-hidden">
        
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
              <span className="px-3 py-1 bg-black text-[#ffd700] uppercase tracking-widest rounded-full border-2 border-black">
                NIKA ARCHIVE
              </span>
              <span className="text-pink-600 uppercase tracking-wider bg-pink-100 px-2 py-0.5 rounded font-bold">Freeform Intelligence</span>
            </div>
            
            <div className="relative">
              <h1 className="font-manga text-5xl sm:text-6xl text-black tracking-tighter uppercase leading-none">
                Threats <span className="text-[#dc0f0d]">&</span><br />Rogues Gallery
              </h1>
              <span className="manga-sfx absolute -top-8 left-[300px] text-4xl text-pink-500 rotate-12 hidden sm:inline-block">DOKAN!!</span>
            </div>
            
            <p className="text-sm font-medium text-stone-700 mt-4 max-w-3xl bg-white/90 p-3 rounded-xl border-2 border-black shadow-sm">
              Labophase tactical database. Log of major antagonists, organization affiliations, Devil Fruit data, and the definitive moments of their liberation (defeat) across the Grand Line saga.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="text-right bg-black text-white p-4 border-4 border-black rounded-2xl shadow-lg">
              <span className="block text-[10px] text-stone-300 uppercase tracking-widest">Total Entries</span>
              <span className="text-5xl font-extrabold text-[#ffd700] font-mono leading-none">
                {ARC_VILLAINS_DATA.length.toString().padStart(3, '0')}
              </span>
              <span className="text-sm text-stone-300 ml-1">Devils</span>
            </div>

            <div className="flex items-center gap-2 bg-white p-1.5 border-4 border-black rounded-full shadow-inner">
              <button
                onClick={() => { sound.playClick(900); setViewMode('dossier'); }}
                className={`px-5 py-2.5 text-xs font-black rounded-full flex items-center space-x-2 transition-all cursor-pointer ${
                  viewMode === 'dossier'
                    ? 'bg-black text-white shadow-md'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>GRID</span>
              </button>

              <button
                onClick={() => { sound.playClick(1100); setViewMode('growth_chart'); }}
                className={`px-5 py-2.5 text-xs font-black rounded-full flex items-center space-x-2 transition-all cursor-pointer ${
                  viewMode === 'growth_chart'
                    ? 'bg-[#ffd700] text-black shadow-md'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>CHARTS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'growth_chart' ? (
        <div className="space-y-6 bg-white p-6 border-4 border-black rounded-3xl shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b-4 border-dotted border-stone-300">
            <div className="flex items-center gap-3">
               <h2 className="font-manga text-3xl uppercase tracking-wide text-black">Bounty Trajectory Analysis</h2>
            </div>
            <button
              onClick={() => { sound.playClick(900); setViewMode('dossier'); }}
              className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-stone-800 transition-all cursor-pointer font-black uppercase text-xs"
            >
              Back to Grid
            </button>
          </div>
          <div className="h-[600px] w-full">
            <BountyProgressionChart initialCharacterId={selectedCharForChart} />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-stone-100 p-4 border-4 border-black rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
              <input
                type="text"
                placeholder="Search names, fruits, arcs, organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-4 border-black rounded-full text-sm font-medium placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
              {hakiTiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => { sound.playClick(); setSelectedHakiTier(tier); }}
                  className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-full transition-all border-4 cursor-pointer ${
                    selectedHakiTier === tier
                      ? getThreatLevelColor(tier) + ' border-black shadow-md scale-105'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400 hover:text-black'
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
              const hasHistoricalProgression = ['buggy', 'crocodile', 'blackbeard', 'doflamingo', 'lucci'].some(
                (k) => villain.id.includes(k) || villain.name.toLowerCase().includes(k)
              );

              return (
                <div
                  key={villain.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedVillain(villain);
                  }}
                  className={`group bg-white p-6 border-4 border-black rounded-3xl transition-all space-y-5 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'shadow-[8px_8px_0px_rgba(255,215,0,0.9)] border-amber-400 -translate-y-1'
                      : 'shadow-[6px_6px_0px_rgba(0,0,0,0.8)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.9)] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-black text-[#dc0f0d] block uppercase tracking-wider">
                        {villain.arc}
                      </span>
                      <h3 className="font-manga text-3xl text-black uppercase tracking-tight leading-none mt-0.5 group-hover:text-pink-600 transition-colors">
                        {villain.name}
                      </h3>
                      <p className="text-sm font-semibold text-stone-600 italic mt-1">
                        {villain.epithet}
                      </p>
                    </div>
                    <span className={`text-[11px] font-black px-3 py-1 uppercase rounded-full border-2 border-black whitespace-nowrap ${getThreatLevelColor(villain.hakiTier)}`}>
                      {villain.hakiTier}
                    </span>
                  </div>

                  {villain.devilFruit && (
                    <div className="flex items-center gap-3 text-sm bg-stone-100 p-3 rounded-xl border-2 border-black">
                      <div>
                        <span className="block font-extrabold text-purple-900">{villain.devilFruit.name}</span>
                        <span className="text-xs font-medium text-stone-600 uppercase tracking-wider">{villain.devilFruit.type} Type</span>
                      </div>
                      <span className="ml-auto text-3xl manga-sfx text-purple-400 opacity-70">GUM!</span>
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-dashed border-stone-300 flex items-center justify-between gap-4">
                    <div className="font-mono">
                      <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-bold">Current Bounty</span>
                      <span className="text-2xl font-black text-black tracking-tight bg-amber-300 px-3 py-1 rounded-lg border border-black inline-block mt-1">
                        {formatBounty(villain.bounty)}
                      </span>
                    </div>
                    {hasHistoricalProgression && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick(1050);
                          let targetId = 'blackbeard';
                          if (villain.id.includes('buggy')) targetId = 'buggy';
                          else if (villain.id.includes('crocodile')) targetId = 'crocodile';
                          setSelectedCharForChart(targetId);
                          setViewMode('growth_chart');
                        }}
                        className="flex items-center gap-2 px-5 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all font-bold text-xs uppercase border-2 border-black group-hover:scale-105 cursor-pointer shadow-md"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>View Growth</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 bg-stone-900 text-white rounded-2xl border-2 border-black space-y-2 font-medium text-xs">
                    <div className="flex items-center space-x-1.5 text-pink-400">
                      <span className="font-black uppercase text-stone-200">Ultimate Defeat Move:</span>
                    </div>
                    <div className="text-white font-bold text-sm pl-5">
                      {villain.ultimateDefeatMove.moveName}
                    </div>
                    <div className="text-stone-400 pl-5 flex justify-between font-bold">
                      <span>By: {villain.ultimateDefeatMove.attacker}</span>
                      <span className="text-[#ffd700]">Ch. {villain.ultimateDefeatMove.chapter}</span>
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
      )}
    </div>
  );
};