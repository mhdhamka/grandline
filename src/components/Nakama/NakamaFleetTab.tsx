import React from 'react';
import { Ship, Flame, Check } from 'lucide-react';
import { formatBounty } from '../../utils/formatters.ts';

interface FleetMember {
  division: number;
  crew: string;
  captain: string;
  epithet: string;
  flagship: string;
  membersCount: number;
  bounty: number;
}

interface NakamaFleetTabProps {
  fleetData: FleetMember[];
  sakePledged: Record<string, boolean>;
  onPledgeSake: (crewName: string) => void;
}

export const NakamaFleetTab: React.FC<NakamaFleetTabProps> = ({
  fleetData,
  sakePledged,
  onPledgeSake,
}) => {
  return (
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
        {fleetData.map((fleet) => {
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
                  onClick={() => onPledgeSake(fleet.crew)}
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
  );
};