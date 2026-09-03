import React, { useState } from 'react';
import { STRAW_HATS_DATA, CREW_SYNERGY_COMBOS, STRAW_HAT_GRAND_FLEET } from '../data/characters.ts';
import { CharacterProfile, SynergyCombo } from '../types.ts';
import { sound } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Award, 
  Heart, 
  Swords, 
  Shield, 
  Sparkles, 
  Ship, 
  Flame, 
  Compass,
  TrendingUp,
  Quote,
  Zap,
  Check
} from 'lucide-react';
import { MangaBubble } from './MangaBubble.tsx';
import { MangaPanel } from './MangaPanel.tsx';

export const NakamaCodex: React.FC = () => {
  const [selectedNakamaId, setSelectedNakamaId] = useState<string>('luffy');
  const [subTab, setSubTab] = useState<'profiles' | 'synergy' | 'fleet'>('profiles');
  const [sakePledged, setSakePledged] = useState<Record<string, boolean>>({});
  const [activeComboAnim, setActiveComboAnim] = useState<string | null>(null);

  const selectedNakama = STRAW_HATS_DATA.find((m) => m.id === selectedNakamaId) || STRAW_HATS_DATA[0];

  const formatBounty = (num: number) => {
    return '฿' + num.toLocaleString();
  };

  const triggerSakeConfetti = (fleetName: string) => {
    sound.playBountyChime();
    setSakePledged(prev => ({ ...prev, [fleetName]: !prev[fleetName] }));
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ff0055', '#000000', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const triggerComboEffect = (comboName: string) => {
    sound.playClick(1400);
    setActiveComboAnim(comboName);
    setTimeout(() => setActiveComboAnim(null), 600);
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* GEAR 5 CARTOONISH CLOUD DESIGN / WAPPOKU FLOATING PUFFS */}
      <div className="absolute -top-10 -left-10 w-48 h-24 bg-white border-3 border-black rounded-full shadow-[4px_4px_0px_#000] opacity-90 pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute top-1/3 -right-12 w-56 h-28 bg-white border-3 border-black rounded-full shadow-[4px_4px_0px_#000] opacity-90 pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 -left-16 w-64 h-32 bg-white border-3 border-black rounded-full shadow-[4px_4px_0px_#000] opacity-90 pointer-events-none z-0 animate-bounce duration-1000"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Banner Manga Panel */}
        <MangaPanel
          title="NAKAMA ARCHIVES // EMPIRE OF THE SUN"
          jpTitle="麦わらの一味大船団"
          badge="THE STRAW HAT PIRATES & GRAND FLEET"
          badgeColor="red"
          variant="default"
          icon={<Users className="w-5 h-5 text-[#ff0055] animate-bounce" />}
          sfx="DODON!!"
          headerAction={
            <div className="flex items-center space-x-1.5 bg-white border-3 border-black p-1.5 comic-shadow-sm">
              <button
                onClick={() => { sound.playClick(); setSubTab('profiles'); }}
                className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black ${
                  subTab === 'profiles' ? 'bg-[#ffd700] text-black comic-shadow-sm -translate-y-0.5' : 'bg-white text-black hover:bg-[#ffff00]/30'
                }`}
              >
                10 Straw Hats
              </button>
              <button
                onClick={() => { sound.playClick(); setSubTab('synergy'); }}
                className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black ${
                  subTab === 'synergy' ? 'bg-[#ffd700] text-black comic-shadow-sm -translate-y-0.5' : 'bg-white text-black hover:bg-[#ffff00]/30'
                }`}
              >
                Crew Synergies
              </button>
              <button
                onClick={() => { sound.playClick(); setSubTab('fleet'); }}
                className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black ${
                  subTab === 'fleet' ? 'bg-[#ff0055] text-white comic-shadow-sm -translate-y-0.5' : 'bg-white text-black hover:bg-[#ffff00]/30'
                }`}
              >
                Grand Fleet
              </button>
            </div>
          }
          statusTags={[
            { label: 'CLASSIFICATION', value: 'EMPEROR CREW & 5,600 ALLIES', color: 'red' },
            { label: 'FLAGSHIP', value: 'THOUSAND SUNNY (SOLAR POWERED)', color: 'gold' },
            { label: 'STATUS', value: 'SAILING TOWARDS LAUGH TALE', color: 'blue' },
          ]}
          footerNote="ONE PIECE OFFICIAL CANON ARCHIVE // CH. 1,191+"
          padding="sm"
        >
          <p className="text-xs sm:text-sm font-heading text-black leading-relaxed font-bold">
            Complete personnel files, bounty ascension trajectories from East Blue to Emperor status, emotional turning points, and combat synergies across the 10 Straw Hats and 5,600 Grand Fleet warriors.
          </p>
        </MangaPanel>

        {/* SUB-TAB 1: 10 Straw Hat Profiles */}
        {subTab === 'profiles' && (
          <div className="space-y-6">
            {/* Member Avatars Selector Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {STRAW_HATS_DATA.map((member) => {
                const isSelected = selectedNakama.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedNakamaId(member.id);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 border-3 border-black transition-all shrink-0 cursor-pointer comic-shadow-sm ${
                      isSelected
                        ? 'bg-[#ffff00] text-black ring-2 ring-[#ff0055] -translate-y-1'
                        : 'bg-white hover:bg-yellow-50 text-black'
                    }`}
                  >
                    <div className="w-8 h-8 overflow-hidden border-2 border-black bg-black shrink-0">
                      <img 
                        src={member.avatarUrl} 
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-manga font-black block leading-none">{member.name.split(' ')[member.name.split(' ').length - 1]}</span>
                      <span className="text-[10px] font-heading font-black text-[#ff0055]">{formatBounty(member.bounty)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Member Master Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Identity & Climax Quote */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border-3 border-black p-5 relative comic-shadow">
                  <div className="w-full aspect-square overflow-hidden border-3 border-black relative mb-4 comic-shadow-sm">
                    <img 
                      src={selectedNakama.avatarUrl} 
                      alt={selectedNakama.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-heading font-black px-2 py-0.5 bg-[#ffd700] text-black border-2 border-black uppercase inline-block">
                        {selectedNakama.role}
                      </span>
                      <h2 className="text-xl font-manga font-black text-white mt-1 drop-shadow-[2px_2px_0px_#000]">
                        {selectedNakama.name}
                      </h2>
                      <p className="text-xs font-heading font-black text-[#00f2ff]">
                        {selectedNakama.japaneseName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-heading font-bold">
                    <div className="flex justify-between py-1 border-b-2 border-black">
                      <span className="text-black uppercase">Epithet:</span>
                      <span className="text-[#ff0055] font-black text-right">{selectedNakama.epithet}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b-2 border-black">
                      <span className="text-black uppercase">Origin:</span>
                      <span className="text-black font-black">{selectedNakama.originSea}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b-2 border-black">
                      <span className="text-black uppercase">Dream:</span>
                      <span className="text-[#ff0055] font-black text-right max-w-[200px]">{selectedNakama.dream}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-black uppercase">Active Bounty:</span>
                      <span className="text-[#ff0055] font-manga font-black text-sm">{formatBounty(selectedNakama.bounty)}</span>
                    </div>
                  </div>
                </div>

                {/* Emotional Turning Point / Climax Scene */}
                <div className="bg-white border-3 border-black p-4 comic-shadow">
                  <div className="flex items-center space-x-2 text-black text-xs font-heading font-black mb-3">
                    <Quote className="w-3.5 h-3.5 text-[#ff0055]" />
                    <span className="uppercase tracking-wide">DEFINING EMOTIONAL MOMENT // 名言</span>
                  </div>
                  
                  <MangaBubble
                    quote={selectedNakama.emotionalClimax.quote}
                    speaker={selectedNakama.name}
                    epithet={selectedNakama.epithet}
                    avatarUrl={selectedNakama.avatarUrl}
                    citation={`Ch. ${selectedNakama.emotionalClimax.chapter}`}
                    shape="round"
                    variant="paper"
                    fontStyle="comic"
                    sfx="DON!!"
                    tailPosition="bottom-left"
                    showCopyButton={true}
                    showAudioButton={true}
                    className="w-full mb-3"
                  />

                  <div className="bg-[#ffff00]/30 border-3 border-black p-2.5 comic-shadow-sm">
                    <p className="text-xs font-heading text-black leading-snug font-bold">
                      {selectedNakama.emotionalClimax.scene}
                    </p>
                    <div className="text-[10px] font-heading font-black text-[#ff0055] mt-1.5 text-right uppercase">
                      Manga Canon Chapter {selectedNakama.emotionalClimax.chapter}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bounty Trajectory & Combat Haki Matrix */}
              <div className="lg:col-span-8 space-y-4">
                {/* Bounty Progression Graph / History */}
                <div className="bg-white border-3 border-black p-5 comic-shadow">
                  <div className="flex items-center justify-between mb-4 border-b-3 border-black pb-2">
                    <span className="flex items-center space-x-2 text-xs font-heading font-black text-black uppercase">
                      <TrendingUp className="w-4 h-4 text-[#ff0055]" />
                      <span>BOUNTY ASCENSION TRAJECTORY (CHRONOLOGICAL)</span>
                    </span>
                    <span className="px-2 py-0.5 bg-black text-[#ffd700] text-[10px] border-2 border-black font-black">
                      {selectedNakama.bountyHistory.length} MILESTONES
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedNakama.bountyHistory.map((bh, idx) => {
                      const ratio = Math.max(10, Math.round((bh.amount / selectedNakama.bounty) * 100));
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-heading font-black">
                            <span className="text-black flex items-center space-x-2">
                              <span className="w-2 h-2 bg-[#ff0055] border border-black"></span>
                              <span>{bh.arc}</span>
                            </span>
                            <span className="font-manga text-[#ff0055] font-black">{formatBounty(bh.amount)}</span>
                          </div>

                          {/* Progress Bar Visualizer */}
                          <div className="w-full bg-yellow-100 h-3 border-2 border-black overflow-hidden comic-shadow-sm">
                            <div 
                              className="bg-[#ff0055] h-full transition-all duration-500"
                              style={{ width: `${ratio}%` }}
                            ></div>
                          </div>

                          <p className="text-[11px] text-black font-heading font-bold">
                            {bh.reason}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Combat Abilities & Haki Dossier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Devil Fruit / Weapons */}
                  <div className="bg-white border-3 border-black p-4 space-y-3 comic-shadow">
                    <span className="text-[11px] font-heading font-black text-[#ff0055] block uppercase">DEVIL FRUIT & WEAPON ARSENAL</span>
                    {selectedNakama.devilFruit ? (
                      <div>
                        <h4 className="font-manga font-black text-base text-black">
                          {selectedNakama.devilFruit.name}
                        </h4>
                        <div className="flex items-center space-x-2 my-1.5">
                          <span className="text-[10px] font-heading font-black px-2 py-0.5 bg-[#ffff00] text-black border-2 border-black comic-shadow-sm">
                            {selectedNakama.devilFruit.type}
                          </span>
                          {selectedNakama.devilFruit.awakened && (
                            <span className="text-[10px] font-heading font-black px-2 py-0.5 bg-[#ff0055] text-white border-2 border-black comic-shadow-sm animate-pulse">
                              AWAKENED 
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-black font-heading font-bold leading-relaxed">
                          {selectedNakama.devilFruit.description}
                        </p>
                      </div>
                    ) : (
                      <div className="text-xs text-black font-heading font-bold p-2 bg-yellow-50 border-2 border-black">
                        No Devil Fruit. Relies entirely on pure human physical training, swordsmanship, or scientific engineering.
                      </div>
                    )}

                    <div className="pt-2 border-t-2 border-black">
                      <span className="text-black text-xs font-heading font-black block mb-1 uppercase">Weapons & Fighting Style:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedNakama.weaponsOrStyle.map((w, i) => (
                          <span key={i} className="px-2 py-0.5 bg-[#ffff00]/40 border-2 border-black text-[10px] font-heading font-black text-black comic-shadow-sm">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Haki Mastery */}
                  <div className="bg-white border-3 border-black p-4 space-y-3 comic-shadow">
                    <span className="text-[11px] font-heading font-black text-[#ff0055] block uppercase">HAKI MASTERY TIERS</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-heading font-black">
                      <div className={`p-2 border-2 border-black comic-shadow-sm ${selectedNakama.haki.hasArmament ? 'bg-[#ffd700] text-black' : 'bg-yellow-50 text-black'}`}>
                        <span className="block font-black text-[11px]">Armament</span>
                        <span className="text-[10px] font-manga">{selectedNakama.haki.hasArmament ? 'MASTER' : 'NONE'}</span>
                      </div>
                      <div className={`p-2 border-2 border-black comic-shadow-sm ${selectedNakama.haki.hasObservation ? 'bg-[#ffd700] text-black' : 'bg-yellow-50 text-black'}`}>
                        <span className="block font-black text-[11px]">Observation</span>
                        <span className="text-[10px] font-manga">{selectedNakama.haki.hasObservation ? 'MASTER' : 'NONE'}</span>
                      </div>
                      <div className={`p-2 border-2 border-black comic-shadow-sm ${selectedNakama.haki.hasConquerors ? 'bg-[#ff0055] text-white animate-bounce' : 'bg-yellow-50 text-black'}`}>
                        <span className="block font-black text-[11px]">Conqueror</span>
                        <span className="text-[10px] font-manga">{selectedNakama.haki.hasConquerors ? 'ACoC' : 'NONE'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-black font-heading font-bold leading-relaxed">
                      {selectedNakama.haki.description}
                    </p>

                    {selectedNakama.haki.advancedTechniques.length > 0 && (
                      <div className="pt-2 border-t-2 border-black">
                        <span className="text-black text-xs font-heading font-black block mb-1 uppercase">Advanced Techniques:</span>
                        <ul className="list-disc list-inside text-xs text-[#ff0055] font-heading font-black space-y-0.5">
                          {selectedNakama.haki.advancedTechniques.map((tech, i) => (
                            <li key={i}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: Crew Synergy Attacks */}
        {subTab === 'synergy' && (
          <div className="space-y-4">
            <div className="bg-[#ffd700] border-3 border-black p-3.5 comic-shadow flex items-center justify-between">
              <span className="text-xs font-heading font-black text-black uppercase">
                CLICK ANY COMBO TO EXECUTE COMBAT SYNERGY SFX!
              </span>
              <span className="px-2.5 py-0.5 bg-black text-[#ffd700] text-xs font-heading font-black border-2 border-black">
                {CREW_SYNERGY_COMBOS.length} COMBOS AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CREW_SYNERGY_COMBOS.map((combo, idx) => {
                const isAnimating = activeComboAnim === combo.name;
                return (
                  <div 
                    key={idx} 
                    onClick={() => triggerComboEffect(combo.name)}
                    className={`bg-white border-3 border-black p-4 space-y-3 transition-all cursor-pointer group comic-shadow hover:-translate-y-1 ${
                      isAnimating ? 'bg-[#ffff00] scale-105 ring-4 ring-[#ff0055]' : 'hover:bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] font-heading font-black px-2 py-0.5 uppercase border-2 border-black comic-shadow-sm ${
                        combo.category === 'Monster Trio' 
                          ? 'bg-[#ff0055] text-white' 
                          : combo.category === 'Dual Finisher'
                          ? 'bg-[#ffd700] text-black'
                          : 'bg-yellow-200 text-black'
                      }`}>
                        {combo.category}
                      </span>
                      <span className="text-xs font-heading font-black text-black bg-yellow-100 px-1.5 py-0.5 border-2 border-black">{combo.debutArc}</span>
                    </div>

                    <div>
                      <h3 className="font-manga text-lg text-black group-hover:text-[#ff0055] transition-colors uppercase">
                        {combo.name}
                      </h3>
                      <p className="text-xs font-heading font-black text-[#ff0055]">
                        {combo.japaneseName}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {combo.members.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 bg-yellow-100 border-2 border-black text-[10px] font-heading font-black text-black comic-shadow-sm">
                          {m}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs font-heading text-black leading-relaxed pt-2 border-t-2 border-black font-bold">
                      {combo.description}
                    </p>

                    <div className="text-[10px] font-heading font-black text-right text-[#ff0055] uppercase">
                      {isAnimating ? 'BAM!! COMBO EXECUTED!' : 'Click to Trigger Attack'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-TAB 3: Straw Hat Grand Fleet */}
        {subTab === 'fleet' && (
          <div className="space-y-4">
            <div className="bg-white border-3 border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-3 comic-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#ff0055] text-white border-2 border-black comic-shadow-sm">
                  <Ship className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-manga text-base text-black uppercase">THE 5,600-MAN STRAW HAT GRAND FLEET (麦わら大船団)</h3>
                  <p className="text-xs font-heading font-black text-black">Formed in Dressrosa Chapter 800 under the Parent-Child Sake Pledge. Click &apos;Pledge Sake&apos; to swear allegiance!</p>
                </div>
              </div>
              <span className="text-xs font-heading font-black px-3 py-1.5 bg-[#ffd700] text-black border-2 border-black comic-shadow-sm shrink-0">
                7 REPRESENTATIVE DIVISIONS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STRAW_HAT_GRAND_FLEET.map((fleet) => {
                const isPledged = sakePledged[fleet.crew];
                return (
                  <div key={fleet.division} className="bg-white border-3 border-black p-4 space-y-3 comic-shadow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b-2 border-black pb-1.5">
                        <span className="text-xs font-heading font-black text-black bg-[#ffd700] px-2 py-0.5 border-2 border-black comic-shadow-sm">
                          DIVISION #{fleet.division}
                        </span>
                        <span className="text-xs font-heading font-black text-[#ff0055]">{fleet.membersCount} FIGHTERS</span>
                      </div>
                      <h4 className="font-manga text-base text-black uppercase">{fleet.crew}</h4>
                      <div className="text-xs font-heading text-black font-bold">
                        <span className="text-black uppercase">Captain:</span> <strong className="text-[#ff0055]">{fleet.captain}</strong> ({fleet.epithet})
                      </div>
                      <div className="text-xs font-heading text-black font-bold">
                        <span className="text-black uppercase">Flagship:</span> {fleet.flagship}
                      </div>
                      <div className="flex justify-between items-center text-xs font-heading font-black pt-1">
                        <span className="text-black uppercase">Captain Bounty:</span>
                        <span className="text-[#ff0055] font-manga text-sm">{formatBounty(fleet.bounty)}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-black">
                      <button
                        onClick={() => triggerSakeConfetti(fleet.crew)}
                        className={`w-full py-2 border-2 border-black text-xs font-heading font-black flex items-center justify-center space-x-1.5 comic-shadow-sm cursor-pointer active:translate-y-0.5 transition-all ${
                          isPledged ? 'bg-[#ffd700] text-black' : 'bg-[#ff0055] text-white hover:bg-pink-600'
                        }`}
                      >
                        {isPledged ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>SAKE CUP PLEDGED (ALLIED)</span>
                          </>
                        ) : (
                          <>
                            <Flame className="w-4 h-4" />
                            <span>SWEAR SAKE PLEDGE (JOIN FLEET)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};