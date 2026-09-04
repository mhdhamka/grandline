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
  Send,
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

  const chartData = activeChar.milestones.map((m, idx) => {
    let compareBounty: number | null = null;
    if (isCompareMode && compareChar) {
      // Try to match by arc name first for semantic alignment, otherwise fallback to index if within bounds
      const matchingMilestone = compareChar.milestones.find((cm) => cm.arc === m.arc);
      if (matchingMilestone) {
        compareBounty = Number(matchingMilestone.bounty) || 0;
      } else if (idx < compareChar.milestones.length) {
        compareBounty = Number(compareChar.milestones[idx].bounty) || 0;
      } else {
        compareBounty = null; // Prevents the comparison area chart from stretching flat across unreached arcs
      }
    }

    return {
      index: idx,
      arc: m.arc,
      shortArc: m.arc.length > 8 ? m.arc.substring(0, 7) + '…' : m.arc,
      chapter: m.chapter,
      bounty: Number(m.bounty) || 0,
      formattedBounty: m.formattedBounty,
      event: m.event,
      marineReason: m.marineReason,
      compareBounty: compareBounty !== null ? Number(compareBounty) : null,
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border-2 border-black p-2 max-w-[220px] font-heading text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-50">
          <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-1">
            <span className="text-[#b91c1c] font-black uppercase text-[10px] tracking-wide">{data.arc}</span>
            <span className="text-slate-600 font-mono text-[9px]">Ch. {data.chapter}</span>
          </div>
          <div className="text-[11px] font-black text-black mb-0.5">
            {activeChar.name}: <span className="text-[#b91c1c] font-mono">{data.formattedBounty}</span>
          </div>
          {isCompareMode && compareChar && data.compareBounty !== null && (
            <div className="text-[10px] font-bold text-slate-700 mb-0.5">
              {compareChar.name}:{' '}
              <span className="text-[#9333ea] font-mono">
                ฿{Number(data.compareBounty).toLocaleString()}
              </span>
            </div>
          )}
          <p className="text-[9px] text-slate-800 leading-tight mt-1 border-t border-black/20 pt-1">
            {data.event}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="bounty-growth-analytics" className="w-full max-w-[1380px] mx-auto overflow-hidden box-border bg-[#fffdfa] border-[3px] border-black p-3 md:p-4 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
      {/* Corner Bracket Accents */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-black pointer-events-none"></div>
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-black pointer-events-none"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-black pointer-events-none"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-black pointer-events-none"></div>

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pb-2.5 border-b-2 border-black relative">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 text-[#b91c1c] text-[10px] font-heading font-black mb-0.5">
            <span className="px-1 py-0.2 bg-black text-white text-[8px] border border-black uppercase">
              RECHARTS ANALYTICS
            </span>
            <span className="tracking-wide uppercase text-black font-bold truncate">MARINE HQ BOUNTY TRAJECTORY ENGINE // 懸賞金推移グラフ</span>
          </div>
          <h2 className="text-lg md:text-xl font-black font-manga text-black tracking-wide uppercase flex items-center gap-2">
            <span className="truncate">CHRONOLOGICAL BOUNTY PROGRESSION</span>
            <span className="text-xs text-[#b91c1c] shrink-0 hidden sm:inline">ドドン!!</span>
          </h2>
          <p className="text-[11px] font-heading text-slate-700 mt-0.5 max-w-3xl font-medium leading-tight">
            Interactive analytical trajectory mapping how pirate threat valuations escalated across decisive narrative climax points.
          </p>
        </div>

        {/* Action Controls & Compare Mode Toggle */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              sound.playClick(1000);
              setIsCompareMode(!isCompareMode);
              if (!compareCharId) {
                setCompareCharId(selectedCharId === 'luffy' ? 'blackbeard' : 'luffy');
              }
            }}
            className={`px-2 py-1 text-[11px] font-heading font-black flex items-center space-x-1 border-2 transition-all cursor-pointer ${
              isCompareMode
                ? 'bg-[#9333ea] border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white border-black text-black hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <GitCompare className="w-3 h-3" />
            <span>{isCompareMode ? 'DUAL [ON]' : 'COMPARE'}</span>
          </button>

          {isCompareMode && (
            <select
              value={compareCharId || ''}
              onChange={(e) => {
                sound.playClick(900);
                setCompareCharId(e.target.value);
              }}
              className="px-1.5 py-1 bg-white border-2 border-black text-[11px] font-heading font-bold text-black focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
      <div className="py-2 space-y-2">
        <div className="flex items-center space-x-1 text-[11px] font-heading font-bold overflow-x-auto no-scrollbar pb-0.5">
          <span className="text-black text-[10px] uppercase shrink-0 font-black">FACTION:</span>
          {(['all', 'strawhat', 'rogue', 'supernova'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(850);
                setCategoryFilter(cat);
              }}
              className={`px-2 py-0.5 text-[10px] uppercase font-heading font-black transition-all border-2 cursor-pointer shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#dc0f0d] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black border-black hover:bg-slate-100'
              }`}
            >
              {cat === 'all'
                ? 'All'
                : cat === 'strawhat'
                ? 'Straw Hats'
                : cat === 'rogue'
                ? 'Rogues & Emperors'
                : 'Worst Generation'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
          {filteredCharacters.map((char) => {
            const isSelected = char.id === selectedCharId;
            const latestBounty = char.milestones[char.milestones.length - 1].formattedBounty;
            return (
              <button
                key={char.id}
                onClick={() => handleSelectCharacter(char)}
                className={`p-1.5 border-2 transition-all text-left flex items-center space-x-1.5 cursor-pointer relative overflow-hidden box-border ${
                  isSelected
                    ? 'bg-[#fef08a] border-black ring-1 ring-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                    : 'bg-white border-black hover:bg-slate-50 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-none border-2 border-black overflow-hidden shrink-0"
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
                  <div className="text-[10px] font-bold text-black truncate leading-tight">
                    {char.name}
                  </div>
                  <div className="text-[9px] text-[#b91c1c] font-black font-mono truncate">
                    {latestBounty}
                  </div>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-black absolute top-1 right-1 border border-black"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart Area & Active Milestone Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-1">
        {/* Recharts Graphical Canvas */}
        <div className="lg:col-span-8 bg-white border-[3px] border-black p-2.5 relative flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] box-border">
          <div className="flex items-center justify-between mb-1.5 text-[11px] font-heading font-bold border-b-2 border-black pb-1">
            <div className="flex items-center space-x-1.5 min-w-0">
              <span
                className="w-2.5 h-2.5 inline-block border border-black shrink-0"
                style={{ backgroundColor: activeChar.color }}
              ></span>
              <span className="font-manga text-xs text-black uppercase tracking-wide truncate">{activeChar.name}</span>
              <span className="text-slate-600 text-[10px] font-bold truncate hidden sm:inline">({activeChar.epithet})</span>
            </div>

            {isCompareMode && compareChar && (
              <div className="flex items-center space-x-1 text-purple-700 text-[10px] font-bold shrink-0">
                <span className="w-2.5 h-2.5 inline-block bg-purple-600 border border-black"></span>
                <span className="font-manga uppercase tracking-wide">VS {compareChar.name}</span>
              </div>
            )}
          </div>

          <div className="w-full h-[210px] sm:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                onClick={(e: any) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    handleSelectMilestone(e.activeTooltipIndex);
                  }
                }}
              >
                <defs>
                  <linearGradient id="primaryBountyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeChar.color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={activeChar.color} stopOpacity={0.0} />
                  </linearGradient>
                  {compareChar && (
                    <linearGradient id="compareBountyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                  )}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0, 0, 0, 0.15)"
                  vertical={false}
                />

                <XAxis
                  dataKey="shortArc"
                  stroke="#000"
                  tick={{ fill: '#000', fontSize: 9, fontFamily: 'Oswald, sans-serif', fontWeight: 'bold' }}
                  tickLine={{ stroke: '#000', strokeWidth: 1 }}
                  interval="preserveStartEnd"
                />

                <YAxis
                  tickFormatter={formatYAxis}
                  stroke="#000"
                  tick={{ fill: '#000', fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' }}
                  tickLine={{ stroke: '#000', strokeWidth: 1 }}
                  width={48}
                />

                <Tooltip content={<CustomTooltip />} />

                <ReferenceLine
                  x={chartData[selectedMilestoneIndex]?.shortArc}
                  stroke="#dc0f0d"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />

                {isCompareMode && compareChar && (
                  <Area
                    type="monotone"
                    dataKey="compareBounty"
                    stroke="#9333ea"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#compareBountyGradient)"
                    connectNulls={false}
                  />
                )}

                <Area
                  type="monotone"
                  dataKey="bounty"
                  stroke={activeChar.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#primaryBountyGradient)"
                  activeDot={{
                    r: 4.5,
                    fill: '#ffd700',
                    stroke: '#000',
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[9px] font-heading font-bold text-slate-700 pt-1 mt-1 border-t border-black">
            <span>TIP: Click any node to inspect dossier</span>
            <span className="text-[#b91c1c]">X: Arcs // Y: Berries (฿)</span>
          </div>
        </div>

        {/* Right Milestone Dossier & Wanted Poster Applicator */}
        <div className="lg:col-span-4 bg-white border-[3px] border-black p-3 flex flex-col justify-between space-y-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] box-border">
          <div>
            <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-2">
              <span className="text-[10px] font-heading text-[#b91c1c] uppercase font-black flex items-center gap-1">
                <span>DOSSIER POINT</span>
              </span>
              <span className="text-[8px] font-mono px-1 py-0.2 bg-black text-[#ffd700] border border-black font-bold">
                {selectedMilestoneIndex + 1} / {activeChar.milestones.length}
              </span>
            </div>

            <div className="space-y-0.2 mb-2">
              <span className="text-[9px] font-heading font-bold text-slate-600 block uppercase">NARRATIVE ARC:</span>
              <h3 className="text-base font-manga text-black uppercase tracking-wide leading-tight truncate">
                {currentMilestone.arc}
              </h3>
              <div className="text-[10px] font-mono text-[#b91c1c] font-black">
                Debuted: Chapter {currentMilestone.chapter}
              </div>
            </div>

            <div className="p-2 bg-[#fef08a] border-2 border-black mb-2 space-y-0.2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[8px] font-heading font-black text-black uppercase">OFFICIAL BOUNTY SUM:</span>
              <div className="text-xl font-black font-mono text-black truncate">
                {currentMilestone.formattedBounty}
              </div>
            </div>

            <div className="space-y-0.5 mb-2">
              <span className="text-[8px] font-heading font-bold text-slate-700 uppercase">
                NARRATIVE CATALYST:
              </span>
              <p className="text-[10px] font-heading text-black font-medium leading-tight bg-[#f8f9fa] p-1.5 border border-black max-h-[50px] overflow-y-auto">
                {currentMilestone.event}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[8px] font-heading text-[#dc0f0d] uppercase font-black flex items-center gap-1">
                <span>MARINE JUSTIFICATION:</span>
              </span>
              <p className="text-[10px] font-heading text-slate-800 italic leading-tight border-l-2 border-[#dc0f0d] pl-1.5 py-0.5 font-medium max-h-[45px] overflow-y-auto">
                &ldquo;{currentMilestone.marineReason}&rdquo;
              </p>
            </div>
          </div>

          {onApplyToPoster && (
            <button
              onClick={handleApplyToPoster}
              className="w-full py-1.5 px-2 bg-[#dc0f0d] hover:bg-[#b00c0a] text-white font-heading font-black text-[10px] uppercase flex items-center justify-center space-x-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer mt-1"
            >
              <Send className="w-3 h-3" />
              <span>APPLY TO WANTED POSTER</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Milestone Step Timeline Strip */}
      <div className="mt-2.5 pt-2.5 border-t-2 border-black">
        <span className="text-[10px] font-heading font-black text-black uppercase block mb-1">
          CHRONOLOGICAL SAGA MILESTONES (SELECT):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1">
          {activeChar.milestones.map((m, idx) => {
            const isSelected = selectedMilestoneIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectMilestone(idx)}
                className={`p-1 text-left font-heading border-2 transition-all cursor-pointer box-border ${
                  isSelected
                    ? 'bg-[#dc0f0d] border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white border-black text-black hover:bg-slate-100'
                }`}
              >
                <div className={`text-[8px] font-mono uppercase truncate ${isSelected ? 'text-white/80' : 'text-slate-600 font-bold'}`}>Ch. {m.chapter}</div>
                <div className="text-[10px] font-bold truncate leading-tight">{m.arc}</div>
                <div className={`text-[9px] font-mono font-black truncate mt-0.5 ${isSelected ? 'text-[#ffd700]' : 'text-[#b91c1c]'}`}>
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