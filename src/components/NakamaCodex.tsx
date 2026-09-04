import React, { useState } from 'react';
import { STRAW_HATS_DATA, CREW_SYNERGY_COMBOS, STRAW_HAT_GRAND_FLEET } from '../data/characters.ts';
import { sound } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import { NakamaHeader } from './Nakama/NakamaHeader.tsx';
import { NakamaProfilesTab } from './Nakama/NakamaProfilesTab.tsx';
import { NakamaSynergyTab } from './Nakama/NakamaSynergyTab.tsx';
import { NakamaFleetTab } from './Nakama/NakamaFleetTab.tsx';

export const NakamaCodex: React.FC = () => {
  const [selectedNakamaId, setSelectedNakamaId] = useState<string>('luffy');
  const [subTab, setSubTab] = useState<'profiles' | 'synergy' | 'fleet'>('profiles');
  const [sakePledged, setSakePledged] = useState<Record<string, boolean>>({});
  const [activeComboAnim, setActiveComboAnim] = useState<string | null>(null);

  const selectedNakama = STRAW_HATS_DATA.find((m) => m.id === selectedNakamaId) || STRAW_HATS_DATA[0];

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
        <NakamaHeader subTab={subTab} onSelectTab={setSubTab} />

        {subTab === 'profiles' && (
          <NakamaProfilesTab 
            strawHats={STRAW_HATS_DATA}
            selectedNakama={selectedNakama}
            onSelectNakama={setSelectedNakamaId}
          />
        )}

        {subTab === 'synergy' && (
          <NakamaSynergyTab 
            combos={CREW_SYNERGY_COMBOS}
            activeComboAnim={activeComboAnim}
            onTriggerCombo={triggerComboEffect}
          />
        )}

        {subTab === 'fleet' && (
          <NakamaFleetTab 
            fleetData={STRAW_HAT_GRAND_FLEET}
            sakePledged={sakePledged}
            onPledgeSake={triggerSakeConfetti}
          />
        )}
      </div>
    </div>
  );
};