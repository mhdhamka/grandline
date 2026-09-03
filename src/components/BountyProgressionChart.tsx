import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  CHARACTER_BOUNTY_HISTORIES,
  CharacterBountyHistory,
  BountyMilestone,
} from '../data/bountyHistory.ts';
import { sound } from '../utils/audio.ts';
import {
  TrendingUp,
  Award,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  Skull,
  Crosshair,
  GitCompare,
} from 'lucide-react';

interface BountyProgressionChartProps {
  initialCharacterId?: string;
  onApplyToPoster?: (data: {
    name: string;
    bounty: string;
    condition: string;
    photoUrl?: string;
  }) => void;
}

export const BountyProgressionChart: React.FC<BountyProgressionChartProps> = ({
  initialCharacterId = 'luffy',
  onApplyToPoster,
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>(initialCharacterId);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'strawhat' | 'rogue' | 'supernova'>('all');
  const [compareCharId, setCompareCharId] = useState<string | null>(null);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);

  const activeChar =
    CHARACTER_BOUNTY_HISTORIES.find((c) => c.id === selectedCharId) ||
    CHARACTER_BOUNTY_HISTORIES[0];

  const compareChar = compareCharId
    ? CHARACTER_BOUNTY_HISTORIES.find((c) => c.id === compareCharId)
    : null;

  const currentMilestone: BountyMilestone =
    activeChar.milestones[selectedMilestoneIndex] ||
    activeChar.milestones[activeChar.milestones.length - 1];

  const filteredCharacters = CHARACTER_BOUNTY_HISTORIES.filter((c) => {
    if (categoryFilter === 'all') return true;
    return c.category === categoryFilter;
  });

  // Prepare primary chart dataset
  const chartData = activeChar.milestones.map((m, idx) => {
    // If compare mode is on and compareChar exists, find matching or interpolated milestone
    let compareBounty: number | null = null;
    if (isCompareMode && compareChar) {
      if (idx < compareChar.milestones.length) {
        compareBounty = compareChar.milestones[idx].bounty;
      } else {
        compareBounty = compareChar.milestones[compareChar.milestones.length - 1].bounty;
      }
    }

    return {
      index: idx,
      arc: m.arc,
      shortArc: m.arc.length > 12 ? m.arc.substring(0, 11) + '…' : m.arc,
      chapter: m.chapter,
      bounty: m.bounty,
      formattedBounty: m.formattedBounty,
      event: m.event,
      marineReason: m.marineReason,
      compareBounty,
      compareName: compareChar?.name,
    };
  });

  const formatYAxis = (value: number) => {
    if (value >= 1000000000) {
      return `฿${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `฿${(value / 1000000).toFixed(0)}M`;
    }
    if (value >= 1000) {
      return `฿${(value / 1000).toFixed(0)}K`;
    }
    return `฿${value}`;
  };

  const handleSelectCharacter = (char: CharacterBountyHistory) => {
    sound.playClick(1050);
    setSelectedCharId(char.id);
    setSelectedMilestoneIndex(char.milestones.length - 1);
  };

  const handleSelectMilestone = (idx: number) => {
    sound.playClick(900);
    setSelectedMilestoneIndex(idx);
  };

  const handleApplyToPoster = () => {
    if (!onApplyToPoster) return;
    sound.playBountyChime();
    onApplyToPoster({
      name: activeChar.name.toUpperCase(),
      bounty: currentMilestone.bounty.toLocaleString(),
      condition:
        activeChar.id === 'sanji' && currentMilestone.arc === 'Dressrosa'
          ? 'ONLY ALIVE'
          : 'DEAD OR ALIVE',
      photoUrl: activeChar.avatarUrl,
    });
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#141b27] border-3 border-black p-3 comic-shadow max-w-xs font-heading text-xs z-50">
          <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2">
            <span className="text-[#ffd700] font-black uppercase text-sm tracking-wide">{data.arc}</span>
            <span className="text-slate-400 font-mono text-[10px]">Ch. {data.chapter}</span>
          </div>
          <div className="text-sm font-black text-white mb-1">
            {activeChar.name}: <span className="text-[#ffd700] font-mono">{data.formattedBounty}</span>
          </div>
          {isCompareMode && compareChar && data.compareBounty !== null && (
            <div className="text-xs font-bold text-slate-300 mb-1">
              {compareChar.name}:{' '}
              <span className="text-[#dc0f0d] font-mono">
                ฿{Number(data.compareBounty).toLocaleString()}
              </span>
            </div>
          )}
          <p className="text-[11px] text-slate-200 leading-tight mt-1 border-t border-black/60 pt-1">
            {data.event}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="bounty-growth-analytics" className="bg-[#141b27] border-3 border-black p-4 sm:p-6 relative comic-shadow">
      {/* Corner Bracket Accents */}
      <div className="corner-bracket-tl"></div>
      <div className="corner-bracket-tr"></div>
      <div className="corner-bracket-bl"></div>
      <div className="corner-bracket-br"></div>

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center space-x-2 text-[#ffd700] text-xs font-heading font-black mb-1">
            <span className="px-1.5 py-0.5 bg-[#dc0f0d] text-white text-[10px] border border-black comic-shadow-sm uppercase">
              RECHARTS ANALYTICS
            </span>
            <span className="tracking-wider uppercase">MARINE HQ BOUNTY TRAJECTORY ENGINE // 懸賞金推移グラフ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-manga text-white tracking-wide uppercase flex items-center gap-2">
            <span>CHRONOLOGICAL BOUNTY PROGRESSION</span>
            <span className="manga-sfx text-base hidden sm:inline">ドドン!!</span>
          </h2>
          <p className="text-xs sm:text-sm font-heading text-slate-300 mt-1 max-w-2xl">
            Interactive analytical trajectory mapping how pirate threat valuations and World Government bounties escalated across decisive narrative climax points.
          </p>
        </div>

        {/* Action Controls & Compare Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sound.playClick(1000);
              setIsCompareMode(!isCompareMode);
              if (!compareCharId) {
                setCompareCharId(selectedCharId === 'luffy' ? 'blackbeard' : 'luffy');
              }
            }}
            className={`px-3 py-1.5 text-xs font-heading font-black flex items-center space-x-1.5 border-2 transition-all cursor-pointer ${
              isCompareMode
                ? 'bg-[#9333ea] border-black text-white comic-shadow-sm'
                : 'bg-[#0e141d] border-black text-slate-300 hover:text-white comic-shadow-sm'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompareMode ? 'DUAL RIVAL OVERLAY [ON]' : 'COMPARE RIVAL'}</span>
          </button>

          {isCompareMode && (
            <select
              value={compareCharId || ''}
              onChange={(e) => {
                sound.playClick(900);
                setCompareCharId(e.target.value);
              }}
              className="px-2.5 py-1.5 bg-[#0e141d] border-2 border-black text-xs font-heading font-bold text-white focus:outline-none comic-shadow-sm"
            >
              {CHARACTER_BOUNTY_HISTORIES.filter((c) => c.id !== selectedCharId).map((c) => (
                <option key={c.id} value={c.id}>
                  VS {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Category Pills & Character Selectors */}
      <div className="py-3 space-y-3">
        {/* Category filters */}
        <div className="flex items-center space-x-2 text-xs font-heading font-bold overflow-x-auto no-scrollbar">
          <span className="text-slate-400 text-xs uppercase shrink-0">FILTER FACTION:</span>
          {(['all', 'strawhat', 'rogue', 'supernova'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(850);
                setCategoryFilter(cat);
              }}
              className={`px-3 py-1 text-xs uppercase font-heading font-black transition-all border-2 cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                  : 'bg-[#0e141d] text-slate-300 border-black/80 hover:text-white hover:border-black'
              }`}
            >
              {cat === 'all'
                ? 'All Combatants'
                : cat === 'strawhat'
                ? 'Straw Hats'
                : cat === 'rogue'
                ? 'Rogues & Emperors'
                : 'Worst Generation'}
            </button>
          ))}
        </div>

        {/* Character Carousel Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {filteredCharacters.map((char) => {
            const isSelected = char.id === selectedCharId;
            const latestBounty = char.milestones[char.milestones.length - 1].formattedBounty;
            return (
              <button
                key={char.id}
                onClick={() => handleSelectCharacter(char)}
                className={`p-2 border-2 transition-all text-left flex items-center space-x-2.5 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#18202e] border-black ring-2 ring-[#ffd700] comic-shadow -translate-y-0.5'
                    : 'bg-[#101622] border-black hover:border-slate-500 text-slate-300 comic-shadow-sm'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-none border-2 border-black overflow-hidden shrink-0 comic-shadow-sm"
                  style={{ borderColor: char.color }}
                >
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 font-heading">
                  <div className="text-xs font-bold text-white truncate leading-tight">
                    {char.name}
                  </div>
                  <div className="text-[11px] text-[#ffd700] font-black font-mono truncate">
                    {latestBounty}
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#ffd700] absolute top-1.5 right-1.5 border border-black"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart Area & Active Milestone Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3">
        {/* Recharts Graphical Canvas */}
        <div className="lg:col-span-8 bg-[#0e141d] border-3 border-black p-4 relative flex flex-col justify-between comic-shadow">
          <div className="flex items-center justify-between mb-3 text-xs font-heading font-bold border-b-2 border-black pb-2">
            <div className="flex items-center space-x-2">
              <span
                className="w-3.5 h-3.5 inline-block border border-black"
                style={{ backgroundColor: activeChar.color }}
              ></span>
              <span className="font-manga text-base text-white uppercase tracking-wide">{activeChar.name}</span>
              <span className="text-slate-400">({activeChar.epithet})</span>
            </div>

            {isCompareMode && compareChar && (
              <div className="flex items-center space-x-2 text-purple-400">
                <span className="w-3.5 h-3.5 inline-block bg-purple-600 border border-black"></span>
                <span className="font-manga text-base uppercase tracking-wide">VS {compareChar.name}</span>
              </div>
            )}
          </div>

          {/* Recharts Area Container */}
          <div className="w-full h-[280px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                onClick={(e: any) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    handleSelectMilestone(e.activeTooltipIndex);
                  }
                }}
              >
                <defs>
                  <linearGradient id="primaryBountyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeChar.color} stopOpacity={0.45} />
                    <stop offset="95%" stopColor={activeChar.color} stopOpacity={0.0} />
                  </linearGradient>
                  {compareChar && (
                    <linearGradient id="compareBountyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                  )}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.1)"
                  vertical={false}
                />

                <XAxis
                  dataKey="shortArc"
                  stroke="#94a3b8"
                  tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'Oswald, sans-serif' }}
                  tickLine={{ stroke: '#ffd700', strokeWidth: 1 }}
                />

                <YAxis
                  tickFormatter={formatYAxis}
                  stroke="#94a3b8"
                  tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={{ stroke: '#ffd700', strokeWidth: 1 }}
                  width={65}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Reference line for selected milestone */}
                <ReferenceLine
                  x={chartData[selectedMilestoneIndex]?.shortArc}
                  stroke="#ffd700"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />

                {/* Comparative rival area */}
                {isCompareMode && compareChar && (
                  <Area
                    type="monotone"
                    dataKey="compareBounty"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#compareBountyGradient)"
                  />
                )}

                {/* Primary character area curve */}
                <Area
                  type="monotone"
                  dataKey="bounty"
                  stroke={activeChar.color}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#primaryBountyGradient)"
                  activeDot={{
                    r: 6,
                    fill: '#ffd700',
                    stroke: '#000',
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] font-heading font-bold text-slate-400 pt-2 border-t border-black/80">
            <span>INTERACTION: Click any milestone arc node to inspect Marine case file</span>
            <span className="text-[#ffd700]">X-AXIS: Narrative Arcs // Y-AXIS: Berries (฿)</span>
          </div>
        </div>

        {/* Right Milestone Dossier & Wanted Poster Applicator */}
        <div className="lg:col-span-4 bg-[#0e141d] border-3 border-black p-4 flex flex-col justify-between space-y-4 comic-shadow">
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
              <span className="text-xs font-heading text-[#ffd700] uppercase font-black flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>ACTIVE DOSSIER POINT</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-black text-[#ffd700] border border-black">
                POINT {selectedMilestoneIndex + 1} OF {activeChar.milestones.length}
              </span>
            </div>

            {/* Arc Title & Chapter */}
            <div className="space-y-1 mb-3">
              <span className="text-xs font-heading font-bold text-slate-400 block uppercase">NARRATIVE SAGA / ARC:</span>
              <h3 className="text-xl font-manga text-white uppercase tracking-wide leading-tight">
                {currentMilestone.arc}
              </h3>
              <div className="text-xs font-mono text-[#ffd700] font-bold">
                Debuted: Chapter {currentMilestone.chapter}
              </div>
            </div>

            {/* Issued Bounty Display */}
            <div className="p-3 bg-[#161e2b] border-2 border-black mb-3 space-y-0.5 comic-shadow-sm">
              <span className="text-[10px] font-heading font-bold text-slate-400 uppercase">OFFICIAL BOUNTY SUM:</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#00ff88]">
                {currentMilestone.formattedBounty}
              </div>
            </div>

            {/* Event Summary */}
            <div className="space-y-1 mb-2">
              <span className="text-[10px] font-heading font-bold text-slate-300 uppercase">
                INCIDENT / NARRATIVE CATALYST:
              </span>
              <p className="text-xs font-heading text-slate-200 leading-relaxed bg-[#141a24] p-3 border border-black">
                {currentMilestone.event}
              </p>
            </div>

            {/* Marine Intel Reason */}
            <div className="space-y-1">
              <span className="text-[10px] font-heading text-[#dc0f0d] uppercase font-black flex items-center gap-1">
                <Skull className="w-3 h-3" />
                <span>MARINE HEADQUARTERS JUSTIFICATION:</span>
              </span>
              <p className="text-xs font-heading text-slate-300 italic leading-relaxed border-l-3 border-[#dc0f0d] pl-2.5 py-0.5">
                &ldquo;{currentMilestone.marineReason}&rdquo;
              </p>
            </div>
          </div>

          {/* Action to auto-populate Wanted Poster */}
          {onApplyToPoster && (
            <button
              onClick={handleApplyToPoster}
              className="w-full py-2.5 px-3 bg-[#dc0f0d] hover:bg-[#b00c0a] text-white font-heading font-black text-xs uppercase flex items-center justify-center space-x-2 border-2 border-black comic-shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>APPLY THIS BOUNTY TO WANTED POSTER</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Milestone Step Timeline Strip */}
      <div className="mt-4 pt-4 border-t-2 border-black">
        <span className="text-xs font-heading font-bold text-slate-300 uppercase block mb-2">
          CHRONOLOGICAL SAGA MILESTONES (SELECT TO INSPECT):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {activeChar.milestones.map((m, idx) => {
            const isSelected = selectedMilestoneIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectMilestone(idx)}
                className={`p-2 text-left font-heading border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#dc0f0d] border-black text-white comic-shadow-sm'
                    : 'bg-[#0e141d] border-black text-slate-400 hover:text-white hover:border-black'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase truncate">Ch. {m.chapter}</div>
                <div className="text-xs font-bold truncate">{m.arc}</div>
                <div className={`text-[11px] font-mono font-black truncate mt-0.5 ${isSelected ? 'text-[#ffd700]' : 'text-slate-200'}`}>
                  {m.formattedBounty}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
