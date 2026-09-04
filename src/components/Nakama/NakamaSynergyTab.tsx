import React from 'react';
import { SynergyCombo } from '../types.ts';

interface NakamaSynergyTabProps {
  combos: SynergyCombo[];
  activeComboAnim: string | null;
  onTriggerCombo: (comboName: string) => void;
}

export const NakamaSynergyTab: React.FC<NakamaSynergyTabProps> = ({
  combos,
  activeComboAnim,
  onTriggerCombo,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-[#ffd700] border-3 border-black p-3.5 comic-shadow flex items-center justify-between">
        <span className="text-xs font-heading font-black text-black uppercase">
          CLICK ANY COMBO TO EXECUTE COMBAT SYNERGY SFX!
        </span>
        <span className="px-2.5 py-0.5 bg-black text-[#ffd700] text-xs font-heading font-black border-2 border-black">
          {combos.length} COMBOS AVAILABLE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combos.map((combo, idx) => {
          const isAnimating = activeComboAnim === combo.name;
          return (
            <div 
              key={idx} 
              onClick={() => onTriggerCombo(combo.name)}
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
  );
};