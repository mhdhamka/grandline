import React, { useState } from 'react';
import { ROAD_PONEGLYPHS_DATA, LAUGH_TALE_SECRET_LORE } from '../data/poneglyphs.ts';
import { RoadPoneglyph } from '../types.ts';
import { sound } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import {  
  Check,  
  Compass,  
  Globe2,  
  Key,  
  Unlock,  
  Lock,
  Scroll,
  Hammer
} from 'lucide-react';
import { MangaPanel } from './Manga/MangaPanel.tsx';

export const PoneglyphLaughTale: React.FC = () => {
  const [rubbings, setRubbings] = useState<Record<string, boolean>>({
    'poneglyph-zou': true,
    'poneglyph-wci': true,
    'poneglyph-wano': true,
    'poneglyph-missing': false,
  });

  const [selectedPoneglyph, setSelectedPoneglyph] = useState<RoadPoneglyph>(ROAD_PONEGLYPHS_DATA[0]);
  const [cipherInput, setCipherInput] = useState<string>('JOY BOY');
  const [showCoordinatesAlert, setShowCoordinatesAlert] = useState<boolean>(true); // Kept visible / active so Roger's manga panel quote stays available!
  
  // Stone Scrape / Interaction state
  const [activeScratchingId, setActiveScratchingId] = useState<string | null>(null);
  const [scratchProgress, setScratchProgress] = useState<Record<string, number>>({
    'poneglyph-zou': 100,
    'poneglyph-wci': 100,
    'poneglyph-wano': 100,
    'poneglyph-missing': 0,
  });

  const allUnlocked = Object.values(rubbings).every(Boolean);

  const toggleRubbing = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playPoneglyphHum();
    const nextState = !rubbings[id];
    const updated = { ...rubbings, [id]: nextState };
    setRubbings(updated);

    if (Object.values(updated).every(Boolean)) {
      triggerLaughTaleUnlock();
    }
  };

  const triggerLaughTaleUnlock = () => {
    sound.playBountyChime();
    setShowCoordinatesAlert(true);
    try {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff0055', '#00f2ff', '#ffffff', '#000000'],
      });
    } catch {
      // ignore
    }
  };

  const handleStoneScrape = (id: string) => {
    sound.playClick(1300);
    setActiveScratchingId(id);
    
    setScratchProgress((prev) => {
      const current = prev[id] || 0;
      const next = Math.min(100, current + 25);
      if (next >= 100 && !rubbings[id]) {
        toggleRubbing(id);
      }
      return { ...prev, [id]: next };
    });

    setTimeout(() => {
      setActiveScratchingId(null);
    }, 400);
  };

  const ancientRunesMap: Record<string, string> = {
    A: '0', B: '1', C: '2', D: '3', E: '4', F: '5', G: '6', H: '7', I: '8', J: '9',
    K: '𐡊', L: '𐡋', M: '𐡌', N: '𐡍', O: '𐡎', P: '𐡏', Q: '𐡐', R: '𐡑', S: '𐡒', T: '𐡓',
    U: '𐡔', V: '𐡕', W: '𐡖', X: '𐡗', Y: '𐡘', Z: '𐡙', ' ': ' ',
  };

  const encodeToPoneglyphRunes = (str: string) => {
    return str
      .toUpperCase()
      .split('')
      .map((ch) => ancientRunesMap[ch] || ch)
      .join('');
  };

  return (
    <div className="space-y-6">
      {/* Header using MangaPanel */}
      <MangaPanel
        title="ROAD TO LAUGH TALE"
        jpTitle="ロード歴史の本文"
        badge="FOUR SACRED ROAD PONEGLYPHS"
        badgeColor="red"
        variant="default"
        icon={<Scroll className="w-5 h-5 text-[#ff0055]" />}
        sfx="DODON!!"
        headerAction={
          <div className="flex items-center space-x-3 bg-white border-3 border-black p-2.5 comic-shadow-sm">
            <div className={`p-2 border-2 border-black ${allUnlocked ? 'bg-[#ffd700] text-black' : 'bg-[#ff0055] text-white'}`}>
              {allUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-heading font-black text-black block uppercase">TRIANGULATION LOCK</span>
              <span className={`text-xs font-heading font-black ${allUnlocked ? 'text-[#008000]' : 'text-[#ff0055]'}`}>
                {allUnlocked ? '✨ COORDINATES LOCKED!' : `${Object.values(rubbings).filter(Boolean).length} / 4 STONES SECURED`}
              </span>
            </div>
          </div>
        }
        statusTags={[
          { label: 'CLASSIFICATION', value: 'INDESTRUCTIBLE ROAD STONES', color: 'red' },
          { label: 'ARCHAEOLOGIST', value: 'NICO ROBIN (OHARA)', color: 'blue' },
          { label: 'STATUS', value: allUnlocked ? 'INTERSECTION DISCOVERED' : 'TRIANGULATING', color: allUnlocked ? 'gold' : 'slate' },
        ]}
        footerNote="ANCIENT KINGDOM PROTOCOL // 800-YEAR VOID CENTURY ARCHIVE"
        padding="sm"
      >
        <p className="text-xs sm:text-sm font-heading text-black leading-relaxed font-bold">
          Unlike normal blue Poneglyphs that detail ancient weapons or historical records, these 4 dark red indestructible cubic stones pinpoint 4 specific nautical destinations. At their intersection lies the final island: <strong className="text-[#ff0055]">Laugh Tale</strong>! Tap or scratch the stone rubbings below to unlock.
        </p>
      </MangaPanel>

      {/* Triangulation Visual Radar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Tactical Map Visualizer */}
        <div className="lg:col-span-7 border-3 border-black p-5 relative comic-shadow flex flex-col justify-between bg-white">
          <div className="corner-bracket-tl"></div>
          <div className="corner-bracket-tr"></div>
          <div className="corner-bracket-bl"></div>
          <div className="corner-bracket-br"></div>

          <div className="flex items-center justify-between text-xs font-heading font-black text-black mb-4 border-b-3 border-black pb-2.5">
            <span className="flex items-center space-x-1.5 text-black">
              <Globe2 className="w-4 h-4 text-[#ff0055]" />
              <span>GRAND LINE CARTOGRAPHIC PROJECTION</span>
            </span>
            <span className="px-2.5 py-0.5 bg-black text-[#ffd700] text-[10px] border-2 border-black comic-shadow-sm font-black flex items-center gap-1">
              PUNK-RECORDS L-04
            </span>
          </div>

          {/* Coordinate Vector Canvas */}
          <div className="relative w-full aspect-video sm:aspect-[16/9] bg-[#fffdf9] border-3 border-black flex items-center justify-center p-4 overflow-hidden comic-shadow-sm">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

            {/* Vector lines connecting to center */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
              <line x1="80" y1="50" x2="200" y2="120" stroke={rubbings['poneglyph-zou'] ? '#ff0055' : '#111'} strokeWidth={rubbings['poneglyph-zou'] ? '3.5' : '1.5'} strokeDasharray={rubbings['poneglyph-zou'] ? 'none' : '4 4'} />
              <line x1="320" y1="50" x2="200" y2="120" stroke={rubbings['poneglyph-wci'] ? '#ff0055' : '#111'} strokeWidth={rubbings['poneglyph-wci'] ? '3.5' : '1.5'} strokeDasharray={rubbings['poneglyph-wci'] ? 'none' : '4 4'} />
              <line x1="80" y1="190" x2="200" y2="120" stroke={rubbings['poneglyph-wano'] ? '#ff0055' : '#111'} strokeWidth={rubbings['poneglyph-wano'] ? '3.5' : '1.5'} strokeDasharray={rubbings['poneglyph-wano'] ? 'none' : '4 4'} />
              <line x1="320" y1="190" x2="200" y2="120" stroke={rubbings['poneglyph-missing'] ? '#ff0055' : '#111'} strokeWidth={rubbings['poneglyph-missing'] ? '3.5' : '1.5'} strokeDasharray={rubbings['poneglyph-missing'] ? 'none' : '4 4'} />

              <polygon points="80,50 320,50 320,190 80,190" fill="none" stroke="#000" strokeWidth="2.5" strokeDasharray="4 4" />
            </svg>

            {/* Corner Node 1: Zou */}
            <div className="absolute top-6 left-12 flex flex-col items-center">
              <div className={`w-11 h-11 flex items-center justify-center font-manga font-black text-xs border-2 border-black transition-all cursor-pointer ${
                rubbings['poneglyph-zou'] ? 'bg-[#ff0055] text-white comic-shadow -translate-y-1' : 'bg-[#ffff00] text-black'
              }`}>
                ZOU
              </div>
              <span className="text-[10px] font-heading font-black text-black mt-1 bg-white px-1 border-2 border-black comic-shadow-sm">ALPHA 𐡬</span>
            </div>

            {/* Corner Node 2: WCI */}
            <div className="absolute top-6 right-12 flex flex-col items-center">
              <div className={`w-11 h-11 flex items-center justify-center font-manga font-black text-xs border-2 border-black transition-all cursor-pointer ${
                rubbings['poneglyph-wci'] ? 'bg-[#ff0055] text-white comic-shadow -translate-y-1' : 'bg-[#ffff00] text-black'
              }`}>
                WCI
              </div>
              <span className="text-[10px] font-heading font-black text-black mt-1 bg-white px-1 border-2 border-black comic-shadow-sm">BETA 𐡭</span>
            </div>

            {/* Corner Node 3: Wano */}
            <div className="absolute bottom-6 left-12 flex flex-col items-center">
              <div className={`w-11 h-11 flex items-center justify-center font-manga font-black text-xs border-2 border-black transition-all cursor-pointer ${
                rubbings['poneglyph-wano'] ? 'bg-[#ff0055] text-white comic-shadow -translate-y-1' : 'bg-[#ffff00] text-black'
              }`}>
                WANO
              </div>
              <span className="text-[10px] font-heading font-black text-black mt-1 bg-white px-1 border-2 border-black comic-shadow-sm">GAMMA 𐡮</span>
            </div>

            {/* Corner Node 4: Missing */}
            <div className="absolute bottom-6 right-12 flex flex-col items-center">
              <div className={`w-11 h-11 flex items-center justify-center font-manga font-black text-xs border-2 border-black transition-all cursor-pointer ${
                rubbings['poneglyph-missing'] ? 'bg-[#ff0055] text-white comic-shadow -translate-y-1' : 'bg-[#ffff00] text-black'
              }`}>
                ???
              </div>
              <span className="text-[10px] font-heading font-black text-black mt-1 bg-white px-1 border-2 border-black comic-shadow-sm">DELTA 𐡯</span>
            </div>

            {/* Center Intersection: LAUGH TALE */}
            <div className="relative z-20 flex flex-col items-center">
              <div className={`w-18 h-18 rounded-full border-3 border-black flex items-center justify-center transition-all duration-700 ${
                allUnlocked 
                  ? 'bg-[#ffd700] text-black comic-shadow scale-125 ring-4 ring-[#ff0055]' 
                  : 'bg-[#ffff00] text-black'
              }`}>
                <Compass className="w-9 h-9 text-black" />
              </div>
              <div className="text-center mt-2 bg-white px-2.5 py-0.5 border-2 border-black comic-shadow-sm">
                <span className={`text-xs font-manga font-black tracking-widest ${allUnlocked ? 'text-[#ff0055]' : 'text-black'}`}>
                  LAUGH TALE
                </span>
                <span className="block text-[9px] font-heading font-black text-black">
                  {allUnlocked ? '✨ INTERSECTION SECURED' : 'PENDING 4TH STONE'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick toggle bar */}
          <div className="mt-4 pt-3 border-t-3 border-black flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-heading font-black text-black uppercase">QUICK SIMULATE PONEGLYPHS:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick(1500);
                  const filled = {
                    'poneglyph-zou': true,
                    'poneglyph-wci': true,
                    'poneglyph-wano': true,
                    'poneglyph-missing': true,
                  };
                  setRubbings(filled);
                  setScratchProgress({
                    'poneglyph-zou': 100,
                    'poneglyph-wci': 100,
                    'poneglyph-wano': 100,
                    'poneglyph-missing': 100,
                  });
                  triggerLaughTaleUnlock();
                }}
                className="px-3.5 py-1.5 bg-[#ffd700] hover:bg-yellow-400 text-black border-2 border-black text-xs font-heading font-black flex items-center space-x-1 comic-shadow-sm cursor-pointer active:translate-y-0.5 rounded-lg"
              >
                <span>Simulate 4/4 Unlocked</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick(900);
                  setRubbings({
                    'poneglyph-zou': true,
                    'poneglyph-wci': true,
                    'poneglyph-wano': true,
                    'poneglyph-missing': false,
                  });
                  setScratchProgress({
                    'poneglyph-zou': 100,
                    'poneglyph-wci': 100,
                    'poneglyph-wano': 100,
                    'poneglyph-missing': 0,
                  });
                }}
                className="px-3 py-1.5 bg-white hover:bg-[#ffff00] text-black border-2 border-black text-xs font-heading font-black comic-shadow-sm cursor-pointer active:translate-y-0.5 rounded-lg"
              >
                Reset Canon (3/4)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Poneglyphs Checklist & Details */}
        <div className="lg:col-span-5 space-y-3">
          {ROAD_PONEGLYPHS_DATA.map((p) => {
            const isSecured = rubbings[p.id];
            const isSelected = selectedPoneglyph.id === p.id;
            const progress = scratchProgress[p.id] || (isSecured ? 100 : 0);
            const isScratching = activeScratchingId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => {
                  sound.playClick(1000);
                  setSelectedPoneglyph(p);
                }}
                className={`p-3.5 border-3 border-black transition-all cursor-pointer relative comic-shadow rounded-xl ${
                  isSelected 
                    ? 'bg-[#ffff00]/40 ring-2 ring-[#ff0055] -translate-y-1' 
                    : 'bg-white hover:bg-[#ffff00]/20'
                } ${isScratching ? 'scale-[1.02]' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStoneScrape(p.id);
                      }}
                      className={`mt-0.5 w-8 h-8 flex items-center justify-center border-2 border-black transition-all cursor-pointer comic-shadow-sm rounded-lg ${
                        isSecured
                          ? 'bg-[#ff0055] text-white hover:bg-pink-600'
                          : 'bg-[#ffd700] text-black hover:bg-yellow-400'
                      }`}
                      title="Tap to make rubbing / scrape stone"
                    >
                      {isSecured ? <Check className="w-4 h-4 font-black stroke-[3]" /> : <Hammer className="w-4 h-4 text-black" />}
                    </button>
                    <div>
                      <h4 className="font-manga text-base text-black tracking-wide">
                        {p.location.split('(')[0]}
                      </h4>
                      <p className="text-xs text-black font-heading font-black line-clamp-1">
                        {p.guardianOrPossessor}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-heading font-black px-2.5 py-1 uppercase border-2 border-black rounded-md ${
                      isSecured 
                        ? 'bg-[#ffd700] text-black comic-shadow-sm' 
                        : 'bg-[#ff0055] text-white'
                    }`}>
                      {isSecured ? 'RUBBING SECURED' : `${progress}% RUBBED`}
                    </span>
                  </div>
                </div>

                {/* Mini Scratch Progress Bar */}
                {!isSecured && (
                  <div className="mt-2.5 w-full bg-stone-100 h-3 border-2 border-black overflow-hidden rounded-full">
                    <div 
                      className="bg-[#ff0055] h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Selected Poneglyph Deep Intel */}
          <div className="bg-white border-3 border-black p-4 text-xs font-heading space-y-2.5 comic-shadow rounded-xl">
            <div className="flex items-center justify-between border-b-3 border-black pb-1.5">
              <span className="text-[#ff0055] font-manga text-sm font-black uppercase tracking-wide flex items-center gap-1.5">
                PONEGLYPH DOSSIER: {selectedPoneglyph.location.split('(')[0]}
              </span>
              <span className="px-2 py-0.5 bg-black text-[#ffd700] font-mono text-[10px] border-2 border-black font-black rounded">
                ANCIENT STONE
              </span>
            </div>
            <p className="text-black leading-relaxed font-bold">
              {selectedPoneglyph.description}
            </p>
            <div className="p-2.5 bg-[#ffff00]/30 border-2 border-black text-black comic-shadow-sm font-bold rounded-lg">
              <strong className="text-[#ff0055] uppercase">COORDINATE CLUE:</strong> {selectedPoneglyph.coordinatesClue}
            </div>
            <div className="text-[11px] text-black font-bold">
              <strong className="text-black uppercase">HISTORICAL CONTEXT:</strong> {selectedPoneglyph.history}
            </div>
          </div>
        </div>
      </div>

      {/* Secret Laugh Tale Coordinates Modal / Banner — INCLUDING ROGER'S MANGA PANEL QUOTE! */}
      {showCoordinatesAlert && (
        <MangaPanel
          title={LAUGH_TALE_SECRET_LORE.islandName.toUpperCase()}
          jpTitle="ラフテル"
          badge=""
          badgeColor="black"
          variant="default"
          sfx="DON!!"
          statusTags={[
            { label: 'COORDINATES', value: LAUGH_TALE_SECRET_LORE.secretCoordinates, color: 'gold' },
          ]}
          footerNote="WORLD GOVERNMENT HIGHEST LEVEL TABOO // BUSTER CALL THREAT"
        >
          <div className="space-y-3">
            <blockquote className="text-sm sm:text-base italic text-black border-l-4 border-black pl-4 py-1 leading-relaxed font-manga bg-[#ffff00]/40 p-3 border-3 border-black comic-shadow-sm font-bold rounded-xl">
              &ldquo;{LAUGH_TALE_SECRET_LORE.definingQuote}&rdquo;
              <footer className="text-xs font-heading font-black text-[#ff0055] mt-1 not-italic">
                — {LAUGH_TALE_SECRET_LORE.namedBy}, Episode 968
              </footer>
            </blockquote>
            <p className="text-xs text-black font-heading font-black">
              {LAUGH_TALE_SECRET_LORE.historicalClimax}
            </p>
          </div>
        </MangaPanel>
      )}

      {/* Ancient Void Century Rune Deciphering Tool */}
      <MangaPanel
        title="OHARA ARCHAEOLOGICAL RUNE CIPHER"
        jpTitle="古代文字解読"
        badge="NICO ROBIN DECODER"
        badgeColor="red"
        variant="default"
        icon={<Key className="w-4 h-4 text-[#ff0055]" />}
        statusTags={[
          { label: 'SCRIPT', value: 'PHONETIC RUNIC MATRIX', color: 'blue' },
          { label: 'STATUS', value: 'REAL-TIME TRANSLATION', color: 'green' },
        ]}
        footerNote="ARCHAEOLOGY OF OHARA // SCHOLARS OF THE TREE OF KNOWLEDGE"
      >
        <p className="text-xs font-heading text-black mb-4 font-black">
          Type any phrase or secret message below to transcribe it into the cryptographic phonetic script of the 800-year-old Ancient Kingdom.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-heading font-black text-black block mb-1 uppercase">INPUT TEXT (LATIN PHONETICS):</label>
            <input
              type="text"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="e.g. WILL OF D, SUN GOD NIKA, PLUTON"
              className="w-full px-3.5 py-2.5 bg-white border-3 border-black text-sm text-black focus:outline-none focus:border-[#ff0055] font-heading comic-shadow-sm transition-all font-bold rounded-xl"
            />
          </div>

          <div>
            <label className="text-[11px] font-heading font-black text-[#ff0055] block mb-1 uppercase">ANCIENT PONEGLYPH RUNIC SCRIPT:</label>
            <div className="w-full px-3.5 py-2.5 bg-[#ffff00]/30 border-3 border-black text-xl text-black font-mono tracking-widest min-h-[46px] flex items-center select-all comic-shadow-sm font-bold rounded-xl">
              {encodeToPoneglyphRunes(cipherInput) || '...'}
            </div>
          </div>
        </div>
      </MangaPanel>
    </div>
  );
};