import React, { useState } from 'react';
import { ARC_VILLAINS_DATA } from '../data/villains.ts';
import { ArcVillain } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { 
  Skull, 
  Search, 
  ShieldAlert, 
  Swords, 
  Quote, 
  Award, 
  Flame, 
  Zap,
  Filter,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { BountyProgressionChart } from './BountyProgressionChart.tsx';
import { MangaBubble } from './MangaBubble.tsx';

export const RoguesGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dossier' | 'growth_chart'>('dossier');
  const [selectedCharForChart, setSelectedCharForChart] = useState<string>('blackbeard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHakiTier, setSelectedHakiTier] = useState<string>('all');
  const [selectedVillain, setSelectedVillain] = useState<ArcVillain | null>(ARC_VILLAINS_DATA[0]);

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
                MARINE HQ INTELLIGENCE
              </span>
              <span className="tracking-wider uppercase">ROGUES DOSSIER &amp; PIRATE BOUNTY ARCHIVE // 海賊手配書</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-manga text-white tracking-wide uppercase flex items-center gap-2">
              <span>ROGUES GALLERY &amp; ARC ANTAGONISTS</span>
              <span className="manga-sfx text-base hidden sm:inline">DON!!</span>
            </h1>
            <p className="text-xs sm:text-sm font-heading text-slate-300 mt-1 max-w-2xl">
              High-priority criminal files, Emperor clash records, Devil Fruit classifications, and ultimate defeat move logs across 1,126+ chapters of the Grand Line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs font-heading font-bold bg-[#0e141d] border-2 border-black p-3 comic-shadow-sm">
              <span className="text-slate-400 block text-[10px] uppercase">TOTAL THREATS LOGGED</span>
              <span className="text-lg font-black text-[#dc0f0d]">{ARC_VILLAINS_DATA.length} Major Antagonists</span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-[#0e141d] p-1.5 border-2 border-black comic-shadow-sm">
              <button
                onClick={() => { sound.playClick(900); setViewMode('dossier'); }}
                className={`px-3 py-1.5 text-xs font-heading font-black flex items-center space-x-1.5 transition-all border cursor-pointer ${
                  viewMode === 'dossier'
                    ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                    : 'text-slate-300 hover:text-white border-transparent'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>GRID DOSSIER</span>
              </button>

              <button
                onClick={() => { sound.playClick(1100); setViewMode('growth_chart'); }}
                className={`px-3 py-1.5 text-xs font-heading font-black flex items-center space-x-1.5 transition-all border cursor-pointer ${
                  viewMode === 'growth_chart'
                    ? 'bg-[#ffd700] text-black border-black comic-shadow-sm'
                    : 'text-slate-300 hover:text-white border-transparent'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>BOUNTY GRAPH (RECHARTS)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Switching: Bounty Progression Chart or Grid Dossier */}
      {viewMode === 'growth_chart' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#141b27] p-3.5 border-3 border-black text-xs font-heading font-bold comic-shadow">
            <span className="text-white uppercase tracking-wider">
              ANALYZING BOUNTY TRAJECTORIES ACROSS NARRATIVE ERAS // バウンティ推移
            </span>
            <button
              onClick={() => { sound.playClick(900); setViewMode('dossier'); }}
              className="px-3 py-1 bg-[#dc0f0d] text-white border-2 border-black hover:bg-[#b00c0a] transition-all cursor-pointer font-black uppercase comic-shadow-sm"
            >
              RETURN TO GRID DOSSIERS
            </button>
          </div>
          <BountyProgressionChart initialCharacterId={selectedCharForChart} />
        </div>
      ) : (
        <>
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search villains, fruits, organizations, arcs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#141b27] border-2 border-black text-xs font-heading text-white placeholder-slate-400 focus:outline-none focus:border-[#ffd700] comic-shadow-sm transition-all"
              />
            </div>

            {/* Haki Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {hakiTiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => { sound.playClick(); setSelectedHakiTier(tier); }}
                  className={`px-2.5 py-1 text-xs font-heading font-bold whitespace-nowrap transition-all border-2 cursor-pointer ${
                    selectedHakiTier === tier
                      ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                      : 'bg-[#141b27] text-slate-300 border-black/80 hover:text-white hover:border-black'
                  }`}
                >
                  {tier === 'all' ? 'All Haki Tiers' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Villains (Manga Panel / TCG Card Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className={`p-4 border-3 border-black transition-all cursor-pointer space-y-3 relative overflow-hidden comic-shadow ${
                    isSelected
                      ? 'bg-[#192231] border-black ring-2 ring-[#ffd700] -translate-y-0.5'
                      : 'bg-[#121824] hover:bg-[#182130]'
                  }`}
                >
                  {/* Subtle dots pattern */}
                  <div className="absolute inset-0 bendy-dots opacity-40 pointer-events-none"></div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-heading font-black text-[#ffd700] block uppercase tracking-wider">
                        {villain.arc}
                      </span>
                      <h3 className="font-manga text-xl text-white uppercase tracking-wide leading-tight">
                        {villain.name}
                      </h3>
                      <p className="text-xs font-heading text-slate-300">
                        {villain.epithet}
                      </p>
                    </div>

                    <span className={`text-[10px] font-heading font-black px-2 py-0.5 uppercase border border-black ${
                      villain.hakiTier === 'Supreme King Tier' || villain.hakiTier === 'Ancient Demonic'
                        ? 'bg-[#dc0f0d] text-white'
                        : villain.hakiTier === 'Advanced Haki'
                        ? 'bg-[#ffd700] text-black'
                        : 'bg-black text-slate-300'
                    }`}>
                      {villain.hakiTier}
                    </span>
                  </div>

                  {/* Devil fruit badge */}
                  {villain.devilFruit && (
                    <div className="relative z-10 flex items-center space-x-1.5 text-xs font-heading text-purple-300 bg-[#20152b] p-1.5 border border-purple-900/60">
                      <Flame className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate font-bold">{villain.devilFruit.name}</span>
                      <span className="text-[10px] text-slate-400">({villain.devilFruit.type})</span>
                    </div>
                  )}

                  {/* Bounty in Berries & Quick Trajectory Button */}
                  <div className="relative z-10 pt-2 border-t-2 border-black/80 flex items-center justify-between text-xs font-heading">
                    <span className="text-slate-400 font-bold uppercase">ISSUED BOUNTY:</span>
                    <span className="text-[#ffd700] font-black font-mono text-sm">{formatBounty(villain.bounty)}</span>
                  </div>

                  {hasHistoricalProgression && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick(1050);
                        const targetId = villain.id.includes('buggy')
                          ? 'buggy'
                          : villain.id.includes('crocodile')
                          ? 'crocodile'
                          : 'blackbeard';
                        setSelectedCharForChart(targetId);
                        setViewMode('growth_chart');
                      }}
                      className="relative z-10 w-full py-1.5 px-2 bg-[#dc0f0d] hover:bg-[#b50c0a] border-2 border-black text-[11px] font-heading font-black text-white flex items-center justify-center space-x-1 transition-all cursor-pointer comic-shadow-sm uppercase"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>ANALYZE BOUNTY TRAJECTORY</span>
                    </button>
                  )}

                  {/* Defeat Move Climax */}
                  <div className="relative z-10 p-2.5 bg-[#0e141d] border-2 border-black text-[11px] font-heading space-y-1 comic-shadow-sm">
                    <div className="flex items-center space-x-1.5 text-[#dc0f0d]">
                      <Swords className="w-3.5 h-3.5 text-[#dc0f0d] shrink-0" />
                      <span className="font-black uppercase text-slate-300">Ultimate Defeat Move:</span>
                    </div>
                    <div className="text-white font-bold pl-5">
                      {villain.ultimateDefeatMove.moveName}
                    </div>
                    <div className="text-slate-400 pl-5 flex justify-between font-bold">
                      <span>By: {villain.ultimateDefeatMove.attacker}</span>
                      <span className="text-[#ffd700]">Ch. {villain.ultimateDefeatMove.chapter}</span>
                    </div>
                  </div>

                  {/* Quote rendered with MangaBubble */}
                  <div className="relative z-10 pt-1">
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
        </>
      )}
    </div>
  );
};
