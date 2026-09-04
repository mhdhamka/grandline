import React from 'react';
import { Search, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { FruitCategory } from '../../data/devilFruitTreeData';
import { sound } from '../../utils/audio';

interface TreeFilterBarProps {
  categoryFilter: FruitCategory | 'all';
  setCategoryFilter: (cat: FruitCategory | 'all') => void;
  awakenedOnlyFilter: boolean;
  setAwakenedOnlyFilter: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

const CATEGORY_LABELS: Record<FruitCategory | 'all', { label: string; jp: string; color: string }> = {
  all: { label: 'ALL CLASSIFICATIONS', jp: '全系統', color: 'bg-black text-[#ffd700]' },
  paramecia: { label: 'PARAMECIA', jp: '超人系', color: 'bg-[#0b44c8] text-white' },
  zoan: { label: 'ZOAN', jp: '動物系', color: 'bg-[#d97706] text-white' },
  logia: { label: 'LOGIA', jp: '自然系', color: 'bg-[#dc0f0d] text-white' },
  artificial: { label: 'ARTIFICIAL / GREEN BLOOD', jp: '人造・緑の血', color: 'bg-emerald-700 text-white' },
  root: { label: 'LINEAGE ROOT', jp: '血統根源', color: 'bg-cyan-700 text-white' },
};

export const TreeFilterBar: React.FC<TreeFilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  awakenedOnlyFilter,
  setAwakenedOnlyFilter,
  searchQuery,
  setSearchQuery,
  zoomLevel,
  setZoomLevel,
}) => {
  return (
    <div className="bg-white border-3 border-black p-3.5 comic-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 rounded-xl">
      <div className="flex flex-wrap items-center gap-1.5">
        {(['all', 'paramecia', 'zoan', 'logia', 'artificial'] as const).map((cat) => {
          const isSelected = categoryFilter === cat;
          const info = CATEGORY_LABELS[cat];
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setCategoryFilter(cat);
              }}
              className={`px-2.5 py-1 text-xs font-heading font-bold border-2 border-black cursor-pointer transition-all uppercase flex items-center space-x-1 rounded-lg ${
                isSelected ? `${info.color} comic-shadow-sm scale-105` : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <span>{info.label}</span>
              <span className="text-[10px] opacity-75 font-jp">({info.jp})</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
        <button
          onClick={() => {
            sound.playClick();
            setAwakenedOnlyFilter(!awakenedOnlyFilter);
          }}
          className={`px-2.5 py-1 text-xs font-heading font-bold border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 rounded-lg ${
            awakenedOnlyFilter ? 'bg-[#dc0f0d] text-white comic-shadow-sm' : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
          }`}
        >
          <span>Awakened Only (覚醒のみ)</span>
        </button>

        <div className="relative flex-1 sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fruit, user, or ability..."
            className="w-full pl-8 pr-2.5 py-1 bg-stone-50 border-2 border-black text-xs text-black focus:outline-none focus:border-[#ffd700] font-mono rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-1 bg-stone-100 border-2 border-black p-0.5 rounded-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
            title="Zoom Out"
            className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1 text-black font-black">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
            title="Zoom In"
            className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};