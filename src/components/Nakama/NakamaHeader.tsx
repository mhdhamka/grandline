import React from 'react';
import { Users } from 'lucide-react';
import { MangaPanel } from '../MangaPanel.tsx';
import { sound } from '../../utils/audio.ts';

interface NakamaHeaderProps {
  subTab: 'profiles' | 'synergy' | 'fleet';
  onSelectTab: (tab: 'profiles' | 'synergy' | 'fleet') => void;
}

export const NakamaHeader: React.FC<NakamaHeaderProps> = ({ subTab, onSelectTab }) => {
  return (
    <MangaPanel
      title="NAKAMA ARCHIVES // EMPIRE OF THE SUN"
      jpTitle="麦わらの一味大船団"
      badge="THE STRAW HAT PIRATES & GRAND FLEET"
      badgeColor="red"
      variant="default"
      sfx="DODON!!"
      headerAction={
        <div className="flex items-center space-x-1.5 bg-white border-3 border-black p-1.5 comic-shadow-sm">
          <button
            onClick={() => { sound.playClick(); onSelectTab('profiles'); }}
            className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black ${
              subTab === 'profiles' ? 'bg-[#ffd700] text-black comic-shadow-sm -translate-y-0.5' : 'bg-white text-black hover:bg-[#ffff00]/30'
            }`}
          >
            10 Straw Hats
          </button>
          <button
            onClick={() => { sound.playClick(); onSelectTab('synergy'); }}
            className={`px-3 py-1.5 text-xs font-heading font-black transition-all cursor-pointer border-2 border-black ${
              subTab === 'synergy' ? 'bg-[#ffd700] text-black comic-shadow-sm -translate-y-0.5' : 'bg-white text-black hover:bg-[#ffff00]/30'
            }`}
          >
            Crew Synergies
          </button>
          <button
            onClick={() => { sound.playClick(); onSelectTab('fleet'); }}
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
  );
};