import React from 'react';
import { Quote, TrendingUp } from 'lucide-react';
import { CharacterProfile } from '../../types.ts';
import { MangaBubble } from '../Manga/MangaBubble.tsx';
import { formatBounty } from '../../utils/formatters.ts';
import { sound } from '../../utils/audio.ts';

interface NakamaProfilesTabProps {
  strawHats: CharacterProfile[];
  selectedNakama: CharacterProfile;
  onSelectNakama: (id: string) => void;
}

export const NakamaProfilesTab: React.FC<NakamaProfilesTabProps> = ({
  strawHats,
  selectedNakama,
  onSelectNakama,
}) => {
  return (
    <div className="space-y-6">
      {/* Member Avatars Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {strawHats.map((member) => {
          const isSelected = selectedNakama.id === member.id;
          return (
            <button
              key={member.id}
              onClick={() => {
                sound.playClick();
                onSelectNakama(member.id);
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
                <span className="text-xs font-manga font-black block leading-none">
                  {member.name.split(' ')[member.name.split(' ').length - 1]}
                </span>
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

          {/* Emotional Turning Point */}
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
              onAudioPlay={() => {
                const name = selectedNakama.name.toLowerCase();
                if (name.includes('zoro')) {
                  sound.playSwordSlash();
                } else if (name.includes('luffy')) {
                  sound.playDrumsOfLiberation();
                } else if (name.includes('sanji')) {
                  sound.playGearShift();
                } else if (name.includes('nami')) {
                  sound.playBountyChime();
                } else if (name.includes('usopp')) {
                  sound.playClick(600);
                } else if (name.includes('chopper')) {
                  sound.playClick(1200);
                } else if (name.includes('robin')) {
                  sound.playPoneglyphHum();
                } else if (name.includes('franky')) {
                  sound.playConquerorsLightning();
                } else if (name.includes('brook')) {
                  sound.playBountyChime();
                } else if (name.includes('jinbe')) {
                  sound.playPoneglyphHum();
                } else {
                  sound.playDenDenMushi();
                }
              }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};