import React, { useState } from 'react';
import { THOUSAND_SUNNY, GOING_MERRY } from '../data/ship.ts';
import { sound } from '../utils/audio.ts';
import { 
  Anchor, 
  Compass, 
  Sparkles, 
  Zap, 
  Heart, 
  Layers, 
  Settings, 
  Wind,
  Shield
} from 'lucide-react';

export const ShipDeckHud: React.FC = () => {
  const [activeShip, setActiveShip] = useState<'sunny' | 'merry'>('sunny');
  const [selectedChannel, setSelectedChannel] = useState<number>(1);

  const ship = activeShip === 'sunny' ? THOUSAND_SUNNY : GOING_MERRY;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 relative shadow-[0_0_20px_rgba(0,242,255,0.08)]">
        <div className="corner-bracket-tr"></div>
        <div className="corner-bracket-bl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[#ffcc00] text-xs font-mono mb-1">
              <Anchor className="w-4 h-4 text-[#ffcc00]" />
              <span>NAVAL ARCHITECTURE & DOCK ENGINEERING // WATER 7 BLUEPRINTS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              THOUSAND SUNNY // SOLDIER DOCK SYSTEM HUD
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#00f2ff]/80 mt-1 max-w-2xl">
              Constructed from the indestructible Treasure Tree Adam by Franky and Iceburg. Designed to conquer the tumultuous seas of the New World and reach Laugh Tale.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#05080a] border border-[#00f2ff]/30 p-1">
            <button
              onClick={() => { sound.playClick(); setActiveShip('sunny'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                activeShip === 'sunny' ? 'bg-[#00f2ff] text-black shadow-[0_0_10px_#00f2ff]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Thousand Sunny
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveShip('merry'); }}
              className={`px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                activeShip === 'merry' ? 'bg-[#ffcc00] text-black shadow-[0_0_10px_#ffcc00]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Going Merry (Memorial)
            </button>
          </div>
        </div>
      </div>

      {/* Ship Overview Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vessel Specs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-3 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
            <span className="text-xs font-mono text-[#00f2ff] block pb-2 border-b border-[#00f2ff]/20 uppercase">
              VESSEL ARCHITECTURAL SPECIFICATIONS
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#00f2ff]/20">
                <span className="text-slate-400">Vessel Name:</span>
                <span className="text-white font-bold">{ship.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00f2ff]/20">
                <span className="text-slate-400">Class / Rigging:</span>
                <span className="text-[#ffcc00]">{ship.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00f2ff]/20">
                <span className="text-slate-400">Master Carpenter:</span>
                <span className="text-white">{ship.architect}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00f2ff]/20">
                <span className="text-slate-400">Hull Timber:</span>
                <span className="text-[#00ff88] font-semibold">{ship.woodMaterial}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#00f2ff]/20">
                <span className="text-slate-400">Figurehead:</span>
                <span className="text-slate-200">{ship.figurehead}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Propulsion & Power:</span>
                <span className="text-[#00f2ff]">{ship.powerSource}</span>
              </div>
            </div>
          </div>

          {/* Super Weapon Systems */}
          <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-3 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
            <span className="text-xs font-mono text-[#ffcc00] block pb-2 border-b border-[#00f2ff]/20 uppercase">
              SPECIAL WEAPON & PROPULSION CAPABILITIES
            </span>

            <div className="space-y-3">
              {ship.specialFeatures.map((feat, idx) => (
                <div key={idx} className="bg-[#05080a] border border-[#00f2ff]/20 p-3 space-y-1">
                  <h4 className="font-mono font-bold text-sm text-[#ffcc00] flex items-center space-x-1.5 uppercase">
                    <Zap className="w-3.5 h-3.5 text-[#ffcc00]" />
                    <span>{feat.name}</span>
                  </h4>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Soldier Dock System (Sunny) or Rooms (Merry) */}
        <div className="lg:col-span-7 space-y-4">
          {activeShip === 'sunny' && ship.soldierDockSystem && (
            <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-4 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
              <div className="flex items-center justify-between border-b border-[#00f2ff]/20 pb-2">
                <span className="text-xs font-mono text-[#00f2ff] flex items-center space-x-1.5 uppercase">
                  <Settings className="w-4 h-4 text-[#00f2ff]" />
                  <span>FRANKY'S SOLDIER DOCK SYSTEM (CHANNELS 0 - 6)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">ROTARY DOCK CAROUSEL</span>
              </div>

              {/* Rotary Channel Selector Pills */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {ship.soldierDockSystem.map((dock) => (
                  <button
                    key={dock.channel}
                    onClick={() => { sound.playClick(); setSelectedChannel(dock.channel); }}
                    className={`py-2 px-1 border text-center font-mono text-xs transition-all cursor-pointer ${
                      selectedChannel === dock.channel
                        ? 'bg-[#00f2ff] text-black border-[#00f2ff] shadow-[0_0_10px_#00f2ff] font-bold'
                        : 'bg-[#05080a] border-[#00f2ff]/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-[10px] opacity-75">CH</span>
                    <span className="text-sm font-bold">{dock.channel}</span>
                  </button>
                ))}
              </div>

              {/* Active Channel Details */}
              {(() => {
                const activeDock = ship.soldierDockSystem.find((d) => d.channel === selectedChannel);
                if (!activeDock) return null;
                return (
                  <div className="bg-[#05080a] border border-[#00f2ff]/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-white uppercase">
                        Channel {activeDock.channel}: {activeDock.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]">
                        DEPLOYABLE READY
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      {activeDock.description}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Interior Rooms Tour */}
          <div className="bg-[#0a1218] border border-[#00f2ff]/30 p-5 space-y-3 shadow-[0_0_15px_rgba(0,242,255,0.06)]">
            <span className="text-xs font-mono text-slate-400 block pb-2 border-b border-[#00f2ff]/20 uppercase">
              INTERIOR QUARTERS & LIVING SPACES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ship.rooms.map((rm, idx) => (
                <div key={idx} className="bg-[#05080a] border border-[#00f2ff]/20 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-mono font-bold text-sm text-[#ffcc00] uppercase">{rm.room}</h5>
                    <span className="text-[10px] font-mono text-slate-400">{rm.occupants}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-snug">
                    {rm.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
