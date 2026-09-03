import React, { useState } from 'react';
import { LUFFY_TRANSFORMATIONS, NAKAMA_POWER_UPS } from '../data/transformations.ts';
import { TransformationTier } from '../types.ts';
import { sound } from '../utils/audio.ts';
import { 
  Zap, 
  Flame, 
  Activity, 
  Gauge, 
  Volume2, 
  Sparkles, 
  Swords, 
  ShieldAlert, 
  Play,
  Heart,
  Sun
} from 'lucide-react';
import { MangaPanel } from './MangaPanel.tsx';

export const TransformationMatrix: React.FC = () => {
  const [selectedGearId, setSelectedGearId] = useState<string>('luffy-gear-5');
  const [activeTab, setActiveTab] = useState<'luffy' | 'nakama'>('luffy');

  const activeGear = LUFFY_TRANSFORMATIONS.find((g) => g.id === selectedGearId) || LUFFY_TRANSFORMATIONS[0];
  const isGear5Active = activeGear.id === 'luffy-gear-5';

  const handleGearSelect = (gear: TransformationTier) => {
    if (gear.id === 'luffy-gear-5') {
      sound.playDrumsOfLiberation();
    } else {
      sound.playGearShift();
    }
    setSelectedGearId(gear.id);
  };

  const playAttackSound = (soundType?: string) => {
    if (soundType === 'drums') {
      sound.playDrumsOfLiberation();
    } else if (soundType === 'gear') {
      sound.playGearShift();
    } else {
      sound.playSwordSlash();
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Top Banner using MangaPanel with header slot & footer slot */}
      <MangaPanel
        title="TRANSFORMATION MATRIX // GEARS & AWAKENINGS"
        jpTitle="ギア覚醒マトリックス"
        badge="LEADER MATRIX"
        badgeColor="red"
        sfx="DON!!"
        headerAction={
          <div className="flex items-center space-x-2 bg-[#0e141d] border-2 border-black p-1 comic-shadow-sm">
            <button
              onClick={() => { sound.playClick(); setActiveTab('luffy'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black transition-all border cursor-pointer ${
                activeTab === 'luffy' 
                  ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm' 
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              LUFFY GEAR MATRIX
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveTab('nakama'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black transition-all border cursor-pointer ${
                activeTab === 'nakama' 
                  ? 'bg-[#ffd700] text-black border-black comic-shadow-sm' 
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              NAKAMA POWER-UPS
            </button>
          </div>
        }
        statusTags={[
          { label: 'DATABASE', value: 'VEGAPUNK REVISION 11.26', color: 'slate' },
          { label: 'CLASSIFICATION', value: 'MYTHICAL ZOAN / AWAKENING', color: 'gold' },
          { label: 'SELECTED FORM', value: activeTab === 'luffy' ? activeGear.name.split('(')[0] : 'STRAW HAT CREW', color: 'red' },
        ]}
        footerNote="LINEAGE FACTOR LOG // VEGAPUNK SATELLITE 01 (SHAKA)"
        padding="sm"
      >
        <p className="text-xs sm:text-sm font-heading text-slate-800 font-bold">
          Deconstructing Monkey D. Luffy somatic transformations from arterial vascular acceleration (Gear 2) to ancient Mythical Zoan Sun God Nika deification (Gear 5).
        </p>
      </MangaPanel>

      {activeTab === 'luffy' ? (
        <div className="space-y-6">
          {/* Gear Progression Pipeline Selector - Clean White Background */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 bg-white p-4 border-2 border-black comic-shadow-sm">
            {LUFFY_TRANSFORMATIONS.map((gear) => {
              const isSelected = activeGear.id === gear.id;
              const isGear5 = gear.id === 'luffy-gear-5';
              return (
                <button
                  key={gear.id}
                  onClick={() => handleGearSelect(gear)}
                  className={`p-3 border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? isGear5
                        ? 'bg-[#fff9e6] border-[#ffd700] text-black comic-shadow ring-2 ring-[#ffd700] -translate-y-0.5'
                        : 'bg-[#f0f4f8] border-[#dc0f0d] text-black comic-shadow ring-2 ring-[#dc0f0d] -translate-y-0.5'
                      : 'bg-white hover:bg-slate-100 border-black text-slate-800 comic-shadow-sm'
                  }`}
                >
                  {isGear5 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#ffd700] text-black text-[9px] font-heading font-black px-1.5 py-0.2 border border-black">
                      SUN GOD [SEC]
                    </span>
                  )}
                  <span className="text-[10px] font-heading font-bold block text-slate-600 uppercase">{gear.gearLevel}</span>
                  <span className="font-manga text-base block mt-0.5 truncate text-slate-900 font-black">
                    {gear.name.split('(')[0]}
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 mt-1 block font-bold">
                    CH. {gear.debutChapter}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Master Display: Selected Gear Intel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Visual Traits & Scientific Bio-Mechanics - White background */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white p-5 border-2 border-black comic-shadow-sm">
                <MangaPanel
                  title={activeGear.name}
                  jpTitle={activeGear.japaneseName}
                  badge={activeGear.gearLevel.toUpperCase()}
                  badgeColor={isGear5Active ? 'gold' : 'red'}
                  variant="default"
                  sfx={isGear5Active ? 'DODON!!' : undefined}
                  headerAction={
                    isGear5Active ? (
                      <button
                        onClick={() => sound.playDrumsOfLiberation()}
                        className="px-3 py-1.5 bg-[#ffd700] hover:bg-[#ffe247] border-2 border-black text-black text-xs font-heading font-black flex items-center space-x-1.5 comic-shadow-sm animate-pulse cursor-pointer"
                        title="Play Drums of Liberation Sound Effect"
                      >
                        <Heart className="w-3.5 h-3.5 fill-black" />
                        <span>DOOM-DUT-DA-DA</span>
                      </button>
                    ) : undefined
                  }
                  statusTags={[
                    { label: 'Debut', value: `Ch. ${activeGear.debutChapter}`, color: 'red' },
                    { label: 'Deployment', value: activeGear.debutArc, color: 'blue' },
                    { label: 'State', value: isGear5Active ? 'AWAKENED NIKA' : 'RUBBER EXTENSION', color: 'gold' }
                  ]}
                  footerNote={`DATA REF: CH. ${activeGear.debutChapter} // EIICHIRO ODA CANON`}
                >
                  {/* Debut Arc */}
                  <div className="text-xs font-heading text-slate-700 mb-4 pb-2 border-b border-black/20">
                    <span className="text-slate-500 font-bold uppercase">First Combat Deployment:</span> <strong className="text-amber-700 ml-1">{activeGear.debutArc}</strong>
                  </div>

                  {/* Scientific Mechanics */}
                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-heading text-amber-700 uppercase font-black flex items-center space-x-1">
                      <span>VEGAPUNK LINEAGE BIOMECHANICAL REPORT</span>
                    </span>
                    <p className="text-xs sm:text-sm font-heading text-slate-900 font-medium leading-relaxed bg-slate-50 p-3.5 border-2 border-black comic-shadow-sm">
                      {activeGear.scientificMechanics}
                    </p>
                  </div>

                  {/* Visual Phenotypes */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-heading font-bold uppercase text-slate-500">SOMATIC PHENOTYPIC TRAITS:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeGear.visualTraits.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 border border-black text-xs font-heading font-bold text-slate-900">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeGear.awakeningDetails && (
                    <div className="mt-4 p-3 bg-rose-50 border-2 border-[#dc0f0d] text-xs font-heading text-rose-950 comic-shadow-sm">
                      <strong className="text-[#dc0f0d] block font-heading font-black text-xs uppercase mb-1">WORLD GOVERNMENT CLASSIFIED CENSORSHIP:</strong>
                      {activeGear.awakeningDetails}
                    </div>
                  )}
                </MangaPanel>
              </div>

              {/* Signature Attacks Compendium - White background */}
              <div className="bg-white p-5 border-2 border-black comic-shadow-sm">
                <MangaPanel
                  title="TECHNIQUE ARSENAL // TCG ATTACK CARDS"
                  jpTitle="必殺技"
                  badge="TCG ATTACK CARDS"
                  badgeColor="red"
                  headerAction={
                    <span className="text-[10px] font-heading font-bold text-slate-700 bg-slate-100 px-2 py-0.5 border border-black">
                      CLICK CARD TO PLAY SFX
                    </span>
                  }
                  statusTags={[
                    { label: 'Arsenal Count', value: `${activeGear.signatureAttacks.length} Techniques`, color: 'slate' },
                    { label: 'Classification', value: activeGear.gearLevel.toUpperCase(), color: 'gold' },
                  ]}
                  footerNote="AUTHENTIC ONE PIECE SOUND EFFECTS ENGINE"
                >
                  <div className="space-y-2.5">
                    {activeGear.signatureAttacks.map((atk, idx) => (
                      <div
                        key={idx}
                        onClick={() => playAttackSound(atk.soundType)}
                        className="p-3 bg-slate-50 border-2 border-black hover:border-[#ffd700] hover:bg-amber-50 cursor-pointer transition-all flex items-start justify-between group comic-shadow-sm"
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded-full bg-[#dc0f0d] text-white border border-black text-[9px] font-black flex items-center justify-center">
                              !
                            </span>
                            <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                              {atk.name}
                            </h4>
                            <span className="text-xs text-amber-700 font-jp font-bold">
                              {atk.japaneseName}
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 font-heading leading-snug">
                            {atk.description}
                          </p>
                        </div>

                        <div className="p-2 bg-[#dc0f0d] group-hover:bg-[#ffd700] text-white group-hover:text-black transition-all shrink-0 border-2 border-black comic-shadow-sm">
                          <Play className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </MangaPanel>
              </div>
            </div>

            {/* Right: Combat Radar & TCG Power Metrics */}
            <div className="lg:col-span-5 space-y-5">
              {/* Clean White Background for Combat Stats */}
              <div className="bg-white p-5 border-2 border-black comic-shadow-sm">
                <MangaPanel
                  title="TCG COMBAT STATS & POWER"
                  jpTitle="能力値"
                  badge={`TIER: ${activeGear.gearLevel}`}
                  badgeColor="gold"
                  statusTags={[
                    { label: 'Power Index', value: `${Math.round((activeGear.combatStats.attack + activeGear.combatStats.speed + activeGear.combatStats.defense) / 3)} / 100`, color: 'gold' },
                    { label: 'Stamina Drain', value: activeGear.combatStats.staminaDrain, color: activeGear.combatStats.staminaDrain === 'Low' ? 'green' : activeGear.combatStats.staminaDrain === 'Moderate' ? 'gold' : 'red' },
                  ]}
                  footerNote="EVALUATED BY CIPHER POL AIGIS 0"
                >
                  <div className="space-y-4">
                    {/* Attack Stat */}
                    <div>
                      <div className="flex justify-between text-xs font-heading font-bold mb-1">
                        <span className="text-slate-800">Kinetic Attack Output</span>
                        <span className="font-heading text-[#dc0f0d] font-black">{activeGear.combatStats.attack * 100} POWER</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 border border-black overflow-hidden">
                        <div 
                          className="bg-[#dc0f0d] h-full transition-all duration-500"
                          style={{ width: `${activeGear.combatStats.attack}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Speed Stat */}
                    <div>
                      <div className="flex justify-between text-xs font-heading font-bold mb-1">
                        <span className="text-slate-800">Supersonic Velocity / Agility</span>
                        <span className="font-heading text-sky-700 font-black">{activeGear.combatStats.speed * 100} VELOCITY</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 border border-black overflow-hidden">
                        <div 
                          className="bg-sky-500 h-full transition-all duration-500"
                          style={{ width: `${activeGear.combatStats.speed}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Defense Stat */}
                    <div>
                      <div className="flex justify-between text-xs font-heading font-bold mb-1">
                        <span className="text-slate-800">Elastic Impact Absorption</span>
                        <span className="font-heading text-emerald-700 font-black">{activeGear.combatStats.defense * 100} GUARD</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 border border-black overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-500"
                          style={{ width: `${activeGear.combatStats.defense}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stamina Drain */}
                    <div className="p-3 bg-slate-50 border-2 border-black flex justify-between items-center text-xs font-heading font-bold comic-shadow-sm">
                      <span className="text-slate-800">Metabolic &amp; Haki Drain:</span>
                      <span className={`font-black px-2.5 py-0.5 uppercase border border-black ${
                        activeGear.combatStats.staminaDrain === 'Low'
                          ? 'bg-emerald-600 text-white'
                          : activeGear.combatStats.staminaDrain === 'Moderate'
                          ? 'bg-[#ffd700] text-black'
                          : activeGear.combatStats.staminaDrain === 'Severe'
                          ? 'bg-[#dc0f0d] text-white'
                          : 'bg-purple-900 text-white'
                      }`}>
                        {activeGear.combatStats.staminaDrain}
                      </span>
                    </div>
                  </div>
                </MangaPanel>
              </div>

              {/* Procedural Sound Engine Card - White Background */}
              <div className="bg-white p-5 border-2 border-black comic-shadow-sm">
                <MangaPanel
                  title="SFX RESONANCE DECK"
                  jpTitle="効果音"
                  badge="AUDIO SYNTH"
                  badgeColor="red"
                  icon={<Volume2 className="w-4 h-4 text-[#dc0f0d]" />}
                  padding="sm"
                  sfx="ドドン!!"
                  statusTags={[
                    { label: 'DRIVER', value: 'WEB AUDIO SYNTH', color: 'slate' },
                  ]}
                >
                  <p className="text-xs font-heading text-slate-800 font-medium mb-3">
                    Authentic procedural sound generator calibrated for One Piece combat impact dynamics.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => sound.playGearShift()}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-bold text-slate-900 border-2 border-black comic-shadow-sm transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Gear Shift</span>
                    </button>
                    <button
                      onClick={() => sound.playSwordSlash()}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-bold text-emerald-800 border-2 border-black comic-shadow-sm transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Sword Slash</span>
                    </button>
                    <button
                      onClick={() => sound.playBountyChime()}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-heading font-bold text-amber-800 border-2 border-black comic-shadow-sm transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Bounty Fanfare</span>
                    </button>
                    <button
                      onClick={() => sound.playDrumsOfLiberation()}
                      className="px-3 py-2 bg-[#ffd700] hover:bg-[#ffe247] text-xs font-heading font-black text-black border-2 border-black comic-shadow-sm transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Nika Drums</span>
                    </button>
                  </div>
                </MangaPanel>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Nakama Power-Up Trees - White Background */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NAKAMA_POWER_UPS.map((crew, idx) => (
              <div key={idx} className="bg-white p-4 border-2 border-black comic-shadow-sm">
                <MangaPanel
                  title={crew.character}
                  badge="CREW EVOLUTION"
                  badgeColor="gold"
                  icon={<Sparkles className="w-5 h-5 text-[#ffd700]" />}
                  statusTags={[
                    { label: 'Evolutions', value: `${crew.stages.length} Stages`, color: 'slate' },
                    { label: 'Combat Status', value: 'Active Fighter', color: 'red' },
                  ]}
                  footerNote="STRAW HAT FLEET CANON POWER-UP ARCHIVE"
                >
                  <div className="space-y-3">
                    {crew.stages.map((stage, sIdx) => (
                      <div key={sIdx} className="bg-slate-50 border-2 border-black p-3 space-y-1 comic-shadow-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-bold text-sm text-amber-800">
                            {stage.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-700 bg-slate-200 px-1.5 py-0.5 border border-black font-bold">{stage.debut}</span>
                        </div>
                        <p className="text-xs font-heading text-slate-800 leading-relaxed font-medium">
                          {stage.mechanic}
                        </p>
                        <div className="text-[11px] font-heading text-sky-700 pt-1 font-bold">
                          <strong className="text-slate-900 uppercase">Ultimate:</strong> {stage.ultimateMove}
                        </div>
                      </div>
                    ))}
                  </div>
                </MangaPanel>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};