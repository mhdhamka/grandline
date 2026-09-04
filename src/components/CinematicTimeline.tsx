import React, { useState } from 'react';
import { MOVIES_DATA } from '../data/movies.ts';
import { sound } from '../utils/audio.ts';

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
    <div className="space-y-8 pt-4 relative">
      {/* Top Banner with Gear 5 Rubber-Hose Manga Styling */}
      <div className="bg-white border-4 border-black p-5 relative shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden">
        {/* Manga Corner L-Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-4 border-r-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-4 border-l-4 border-black pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-4 border-r-4 border-black pointer-events-none z-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-black font-mono font-bold text-xs mb-1 bg-[#ffd700] px-2 py-0.5 inline-block border-2 border-black">
              <span>THE GRAND LINE THEATRICAL & CANON SYNCHRONIZER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-black tracking-tight uppercase">
              CINEMATIC TIMELINE // THE MOVIES
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-800 mt-1 max-w-2xl font-bold">
              Chronological storyline placement for theatrical features, identifying which elements are Oda-authored canon lore (e.g. Shiki escaping Impel Down, Uta as Shanks’ daughter) versus stand-alone adventures.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-white border-2 border-black p-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => { sound.playClick(); setFilterMode('all'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
                filterMode === 'all' 
                  ? 'bg-[#ffd700] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white text-slate-700 border-transparent hover:border-black'
              }`}
            >
              All Films
            </button>
            <button
              onClick={() => { sound.playClick(); setFilterMode('canon-lore'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
                filterMode === 'canon-lore' 
                  ? 'bg-[#ff0055] text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white text-slate-700 border-transparent hover:border-black'
              }`}
            >
              Canon Lore Only
            </button>
            <button
              onClick={() => { sound.playClick(); setFilterMode('standalone'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
                filterMode === 'standalone' 
                  ? 'bg-[#00f2ff] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white text-slate-700 border-transparent hover:border-black'
              }`}
            >
              Stand-Alone
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid styled exactly like the Log Pose arc card format (ANTARES / DEBUT structure matching image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white border-4 border-black p-5 space-y-3 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-3xl relative hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden font-mono"
          >
            {/* Top Log Pose Capsule Header */}
            <div className="flex items-start justify-between border-b-2 border-black pb-3">
              <span className="text-[11px] text-black bg-[#ffd700] px-2.5 py-1 border-2 border-black font-extrabold uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {movie.releaseYear} RELEASE
              </span>
              <span className={`text-[10px] px-2.5 py-1 uppercase border-2 font-bold ${
                movie.canonStatus.includes('Canon')
                  ? 'bg-[#ff0055] text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : movie.canonStatus.includes('Alternative')
                  ? 'bg-[#00f2ff] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'bg-slate-100 text-black border-black'
              }`}>
                {movie.canonStatus}
              </span>
            </div>

            {/* Movie Title */}
            <h3 className="font-heading font-black text-lg text-black uppercase tracking-tight">
              {movie.title}
            </h3>

            {/* Chronological Placement & Antagonist styled precisely like Log Pose Antagonist / Debut block */}
            <div className="space-y-2 text-xs text-black font-semibold">
              <div className="bg-slate-50 p-2.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span className="text-slate-600 block text-[10px] font-bold uppercase">CHRONOLOGICAL PLACEMENT:</span>
                <span className="text-black font-extrabold">{movie.chronologicalPlacement}</span>
              </div>

              {/* Exact Log Pose Card Style Antagonist Format */}
              <div className="bg-slate-50 p-2.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <span className="text-black font-bold text-[11px]">
                  ANTAGONIST : <span className="text-[#ff0055] font-extrabold">{movie.mainAntagonist}</span>
                </span>
              </div>
            </div>

            {/* Highlights description box */}
            <p className="text-xs text-black font-medium leading-relaxed pt-2 border-t-2 border-black bg-amber-50/70 p-3 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-xl">
              {movie.highlights}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};