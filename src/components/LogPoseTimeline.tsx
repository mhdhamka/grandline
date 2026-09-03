import React, { useState, useEffect } from 'react';
import { SAGAS_DATA } from '../data/sagas.ts';
import { ArcInfo } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Tv, 
  Skull, 
  Zap, 
  MapPin, 
  Search,
  Layers,
  Compass,
  Navigation
} from 'lucide-react';

interface LogPoseTimelineProps {
  onSelectArcEra?: (era: string) => void;
}

export const LogPoseTimeline: React.FC<LogPoseTimelineProps> = ({ onSelectArcEra }) => {
  const [selectedSagaId, setSelectedSagaId] = useState<string>('east-blue');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedArcs, setCompletedArcs] = useState<Record<string, boolean>>({});
  const [selectedArc, setSelectedArc] = useState<ArcInfo | null>(null);

  // Log Pose Needle & Compass Interactive State
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [magneticLock, setMagneticLock] = useState<boolean>(true);

  // Load completed arcs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('grand_line_completed_arcs');
      if (saved) {
        setCompletedArcs(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleArcCompletion = (arcId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(1050);
    const updated = {
      ...completedArcs,
      [arcId]: !completedArcs[arcId],
    };
    setCompletedArcs(updated);
    try {
      localStorage.setItem('grand_line_completed_arcs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const activeSaga = SAGAS_DATA.find((s) => s.id === selectedSagaId) || SAGAS_DATA[0];

  useEffect(() => {
    if (activeSaga && onSelectArcEra) {
      onSelectArcEra(activeSaga.era);
    }
  }, [activeSaga, onSelectArcEra]);

  // Log Pose Dynamic Needle Calibration Handler
  const handleCalibrateLogPose = () => {
    sound.playClick(1400);
    setIsCalibrating(true);
    setMagneticLock(false);
    
    // Spin effect
    const randomSpin = Math.floor(Math.random() * 720) + 360;
    setNeedleAngle((prev) => prev + randomSpin);

    setTimeout(() => {
      setIsCalibrating(false);
      setMagneticLock(true);
      sound.playClick(800);
    }, 800);
  };

  const handleSagaChange = (sagaId: string, index: number) => {
    sound.playClick(1200);
    setSelectedSagaId(sagaId);
    setSelectedArc(null);
    
    // Rotate Log Pose needle dynamically based on saga progression index
    const angleStep = 360 / SAGAS_DATA.length;
    setNeedleAngle(index * angleStep + (Math.random() * 20 - 10));
  };

  // Filtering
  const filteredArcs = activeSaga.arcs.filter((arc) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      arc.name.toLowerCase().includes(q) ||
      arc.mainVillain.toLowerCase().includes(q) ||
      arc.locations.some((l) => l.toLowerCase().includes(q)) ||
      (arc.keyPowerUp && arc.keyPowerUp.toLowerCase().includes(q))
    );
  });

  const totalArcsCount = SAGAS_DATA.reduce((acc, s) => acc + s.arcs.length, 0);
  const completedCount = Object.values(completedArcs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalArcsCount) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Interactive Log Pose Compass Matrix */}
      <div className="bg-white border-3 border-black p-5 relative comic-shadow">
        <div className="corner-bracket-tl"></div>
        <div className="corner-bracket-tr"></div>
        <div className="corner-bracket-bl"></div>
        <div className="corner-bracket-br"></div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-black text-xs font-heading font-black mb-1">
              <span className="px-1.5 py-0.5 bg-black text-[#ffd700] text-[10px] border border-black comic-shadow-sm uppercase">
                SAGA CHRONOLOGY
              </span>
              <span className="tracking-wider uppercase text-stone-700">ONE PIECE STORYLINE LOG // 航海日誌</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-manga text-black tracking-wide uppercase flex items-baseline gap-2">
              <span>{activeSaga.name.toUpperCase()}</span>
              <span className="text-sm font-jp text-pink-600 font-bold">編</span>
            </h1>
            <p className="text-xs sm:text-sm font-heading text-stone-600 mt-1 max-w-xl">
              {activeSaga.tagline}
            </p>
          </div>

          {/* Interactive Log Pose Needle Widget */}
          <div className="flex items-center gap-4 bg-[#f9f8f6] border-2 border-black p-3 comic-shadow-sm self-start lg:self-auto">
            <div 
              onClick={handleCalibrateLogPose}
              className="w-14 h-14 rounded-full bg-white border-3 border-black relative flex items-center justify-center cursor-pointer shadow-inner group hover:bg-[#ffd700] transition-colors"
              title="Click to Calibrate Log Pose Needle"
            >
              <div className="absolute inset-1 rounded-full border border-dashed border-stone-400 pointer-events-none"></div>
              {/* Compass Needle */}
              <div 
                className="absolute w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${needleAngle}deg)` }}
              >
                <div className="w-1 h-10 bg-[#dc0f0d] absolute top-1 rounded-t-full border border-black"></div>
                <div className="w-1 h-10 bg-stone-300 absolute bottom-1 rounded-b-full border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-black border border-black z-10"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1 text-[10px] font-heading font-black uppercase text-stone-500">
                <Navigation className="w-3 h-3 text-[#dc0f0d]" />
                <span>LOG POSE STATUS</span>
              </div>
              <span className="text-xs font-black text-black uppercase">
                {isCalibrating ? 'CALIBRATING...' : magneticLock ? 'MAGNETIC LOCK: STABLE' : 'SEARCHING ISLAND...'}
              </span>
              <button
                onClick={handleCalibrateLogPose}
                className="mt-1 text-[10px] bg-black text-[#ffd700] px-2 py-0.5 border border-black font-heading font-black comic-shadow-sm hover:bg-[#ffd700] hover:text-black transition-colors cursor-pointer text-center"
              >
                RE-CALIBRATE 
              </button>
            </div>
          </div>

          {/* Grand Line Read Progress */}
          <div className="bg-[#f9f8f6] border-2 border-black p-3.5 min-w-[240px] comic-shadow-sm">
            <div className="flex items-center justify-between text-xs font-heading font-bold mb-1">
              <span className="text-stone-700 uppercase">SAGA COMPLETION</span>
              <span className="text-pink-600 font-black text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-200 h-2.5 border border-black overflow-hidden">
              <div 
                className="bg-[#ffd700] h-full transition-all duration-500 border-r border-black"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] font-heading font-bold text-stone-600 mt-2">
              <span>{completedCount} / {totalArcsCount} Arcs Cleared</span>
              <span className="text-black">{activeSaga.totalChapters} Ch. / {activeSaga.totalEpisodes} Ep.</span>
            </div>
          </div>
        </div>

        {/* Saga Selection Tabs (Log Pose Island Stops) */}
        <div className="mt-5 pt-4 border-t-2 border-black/80 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SAGAS_DATA.map((saga, index) => {
            const isSelected = saga.id === selectedSagaId;
            const sagaArcs = saga.arcs;
            const completedInSaga = sagaArcs.filter((a) => completedArcs[a.id]).length;
            return (
              <button
                key={saga.id}
                onClick={() => handleSagaChange(saga.id, index)}
                className={`px-3.5 py-1.5 text-xs font-heading font-black tracking-tight whitespace-nowrap transition-all flex items-center space-x-2 border-2 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-[#ffd700] border-black comic-shadow -translate-y-1 scale-105 z-10'
                    : 'bg-white text-stone-800 border-black/80 hover:bg-[#ffd700] hover:text-black hover:border-black comic-shadow-sm hover:-translate-y-0.5'
                }`}
              >
                <span className={`w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] font-black ${
                  isSelected ? 'bg-[#ffd700] text-black' : 'bg-stone-200 text-stone-800'
                }`}>
                  {index + 1}
                </span>
                <Layers className="w-3.5 h-3.5" />
                <span>{saga.name.toUpperCase()}</span>
                <span className={`text-[10px] px-1.5 py-0.2 font-mono border border-black ${
                  isSelected ? 'bg-[#ffd700] text-black' : 'bg-stone-200 text-stone-800'
                }`}>
                  {completedInSaga}/{sagaArcs.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search arcs, villains, powers, islands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border-2 border-black text-xs font-heading text-black placeholder-stone-400 focus:outline-none focus:border-pink-500 comic-shadow-sm transition-all"
          />
        </div>

        <div className="text-xs font-heading font-bold text-stone-700 flex items-center space-x-3 self-end sm:self-auto">
          <span>ERA: <strong className="text-pink-600 uppercase">{activeSaga.era}</strong></span>
          <span>&bull;</span>
          <span>ARCS: <strong className="text-black">{filteredArcs.length}</strong></span>
        </div>
      </div>

      {/* Arcs Grid (Manga-Panel Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArcs.map((arc, index) => {
          const isDone = !!completedArcs[arc.id];
          const isSelected = selectedArc?.id === arc.id;

          return (
            <div
              key={arc.id}
              onClick={() => {
                sound.playClick();
                setSelectedArc(isSelected ? null : arc);
              }}
              className={`relative border-3 border-black transition-all duration-200 cursor-pointer overflow-hidden p-4 group comic-shadow ${
                isSelected
                  ? 'bg-yellow-50 border-black ring-2 ring-pink-500 -translate-y-1'
                  : 'bg-white hover:border-black hover:bg-stone-50'
              }`}
            >
              {/* Island Stop Number Stamp */}
              <div className="absolute top-0 left-0 bg-black text-[#ffd700] text-[9px] font-heading font-black px-2 py-0.5 border-b-2 border-r-2 border-black z-10 flex items-center space-x-1">
                <Compass className="w-2.5 h-2.5 text-[#ffd700]" />
                <span>LOG STOP #{index + 1}</span>
              </div>

              {/* Road Poneglyph marker */}
              {arc.roadPoneglyph && (
                <div className="absolute top-0 right-0 bg-[#ffd700] text-black text-[9px] font-heading font-black px-2 py-0.5 border-b-2 border-l-2 border-black z-10 flex items-center space-x-1">
                  <MapPin className="w-2.5 h-2.5" />
                  <span>ROAD PONEGLYPH</span>
                </div>
              )}

              <div className="relative z-10 space-y-2.5 pt-3">
                {/* Arc Header */}
                <div className="flex items-start justify-between">
                  <div className="pr-6">
                    <h3 className="font-manga text-xl text-black tracking-wide group-hover:text-pink-600 transition-colors leading-tight">
                      {arc.name}
                    </h3>
                    <p className="text-xs font-jp text-stone-500 font-bold">
                      {arc.japaneseName}
                    </p>
                  </div>

                  {/* Completion checkmark button */}
                  <button
                    onClick={(e) => toggleArcCompletion(arc.id, e)}
                    className="p-1 text-stone-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    title={isDone ? 'Mark as unread' : 'Mark as read/watched'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 hover:text-stone-600" />
                    )}
                  </button>
                </div>

                {/* Chapter & Episode Pills */}
                <div className="flex items-center space-x-2 text-[11px] font-heading font-bold text-stone-800">
                  <span className="flex items-center space-x-1 px-2 py-0.5 bg-stone-100 border border-black text-stone-800">
                    <BookOpen className="w-3 h-3 text-pink-600" />
                    <span>CH. {arc.mangaChapters}</span>
                  </span>
                  <span className="flex items-center space-x-1 px-2 py-0.5 bg-stone-100 border border-black text-stone-800">
                    <Tv className="w-3 h-3 text-blue-600" />
                    <span>EP. {arc.animeEpisodes}</span>
                  </span>
                </div>

                {/* Synopsis */}
                <p className="text-xs font-heading text-stone-600 line-clamp-2 leading-relaxed">
                  {arc.synopsis}
                </p>

                {/* Villain & Key Power Up */}
                <div className="pt-2 border-t-2 border-stone-200 flex flex-col gap-1 text-[11px] font-heading">
                  <div className="flex items-center space-x-1.5 text-stone-700">
                    <span className="font-bold text-stone-400 uppercase">Antagonist:</span>
                    <span className="truncate font-bold text-black">{arc.mainVillain}</span>
                  </div>

                  {arc.keyPowerUp && (
                    <div className="flex items-center space-x-1.5 text-stone-700">
                      
                      <span className="font-bold text-stone-400 uppercase">Debut / Power:</span>
                      <span className="truncate font-bold text-black">{arc.keyPowerUp}</span>
                    </div>
                  )}
                </div>

                {/* Expandable detail info */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t-2 border-black text-xs font-heading space-y-2 bg-[#fdfbf7] p-3 border-2 border-black comic-shadow-sm">
                    <div>
                      <span className="text-pink-600 font-black uppercase block mb-1">SIGNIFICANT EVENTS &amp; CASUALTIES:</span>
                      <ul className="list-disc list-inside space-y-1 text-stone-700">
                        {arc.significantCasualtiesOrMoments.map((m, i) => (
                          <li key={i} className="leading-snug">{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-black font-black uppercase block mb-1">KEY ISLAND LOCATIONS:</span>
                      <div className="flex flex-wrap gap-1">
                        {arc.locations.map((loc, i) => (
                          <span key={i} className="px-2 py-0.5 bg-stone-100 border border-black text-[11px] font-bold text-stone-800">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {arc.roadPoneglyphDetail && (
                      <div className="p-2 bg-yellow-50 border-2 border-black text-stone-900 text-[11px]">
                        <strong className="text-pink-600 uppercase">ROAD PONEGLYPH LORE:</strong> {arc.roadPoneglyphDetail}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};