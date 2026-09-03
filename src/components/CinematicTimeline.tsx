import React, { useState } from 'react';
import { MOVIES_DATA } from '../data/movies.ts';
import { sound } from '../utils/audio.ts';
import { 
  Film, 
  Sparkles, 
  Calendar, 
  Skull, 
  Compass, 
  CheckCircle2,
  Filter
} from 'lucide-react';

export const CinematicTimeline: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'canon-lore' | 'standalone'>('all');

  const filteredMovies = MOVIES_DATA.filter((m) => {
    if (filterMode === 'canon-lore') {
      return m.canonStatus.includes('Canon');
    }
    if (filterMode === 'standalone') {
      return m.canonStatus === 'Stand-Alone Film';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 relative shadow-[0_0_20px_rgba(0,242,255,0.08)]">
        <div className="corner-bracket-tr"></div>
        <div className="corner-bracket-bl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[#00f2ff] text-xs font-mono mb-1">
              <Film className="w-4 h-4 text-[#00f2ff]" />
              <span>THE GRAND LINE THEATRICAL & CANON SYNCHRONIZER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              CINEMATIC TIMELINE // THE MOVIES
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#00f2ff]/80 mt-1 max-w-2xl">
              Chronological storyline placement for theatrical features, identifying which elements are Oda-authored canon lore (e.g. Shiki escaping Impel Down, Uta as Shanks’ daughter) versus stand-alone adventures.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#05080a] border border-[#00f2ff]/30 p-1">
            <button
              onClick={() => { sound.playClick(); setFilterMode('all'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                filterMode === 'all' ? 'bg-[#00f2ff] text-black shadow-[0_0_10px_#00f2ff]' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Films
            </button>
            <button
              onClick={() => { sound.playClick(); setFilterMode('canon-lore'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                filterMode === 'canon-lore' ? 'bg-[#ffcc00] text-black shadow-[0_0_10px_#ffcc00]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Canon Lore Only
            </button>
            <button
              onClick={() => { sound.playClick(); setFilterMode('standalone'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                filterMode === 'standalone' ? 'bg-[#ff0055] text-white shadow-[0_0_10px_#ff0055]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Stand-Alone
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-[#0a1218] border border-[#00f2ff]/30 hover:border-[#00f2ff] p-5 space-y-3 transition-all shadow-[0_0_10px_rgba(0,242,255,0.05)]"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-mono text-[#00f2ff] font-bold">
                {movie.releaseYear} RELEASE
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 uppercase border ${
                movie.canonStatus.includes('Canon')
                  ? 'bg-[#ffcc00]/20 text-[#ffcc00] border-[#ffcc00]'
                  : 'bg-black/50 text-slate-400 border-slate-700'
              }`}>
                {movie.canonStatus}
              </span>
            </div>

            <h3 className="font-bold text-lg text-white uppercase">
              {movie.title}
            </h3>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">CHRONOLOGICAL PLACEMENT:</span>
                <span className="text-[#ffcc00] font-semibold">{movie.chronologicalPlacement}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-mono">MAIN ANTAGONIST:</span>
                <span className="text-[#ff0055] font-semibold">{movie.mainAntagonist}</span>
              </div>
            </div>

            <p className="text-xs font-mono text-slate-300 leading-relaxed pt-2 border-t border-[#00f2ff]/20">
              {movie.highlights}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
