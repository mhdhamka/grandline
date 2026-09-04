import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MangaPanel } from '../Manga/MangaPanel';
import { AWAKENING_COMPARISONS } from '../../data/devilFruitTreeData';

export const AwakeningMatrixView: React.FC = () => {
  return (
    <div className="space-y-5">
      <MangaPanel
        title="THE FOUR AWAKENING TIERS & BIOLOGICAL MANIFESTATION"
        jpTitle="悪魔の実の覚醒階位"
        badge="PARADIGM ANALYSIS"
        badgeColor="red"
        statusTags={[
          { label: 'STAGE 1', value: 'ENVIRONMENTAL TRANSFIGURATION', color: 'blue' },
          { label: 'STAGE 2', value: 'BEAST HAGOROMO SYNCHRONIZATION', color: 'gold' },
          { label: 'STAGE 3', value: 'BIOSPHERE TERRAFORMING', color: 'red' },
        ]}
        footerNote="CANON SOURCE: CROCODILE (IMPEL DOWN CH. 533) // DOFLAMINGO (CH. 785) // VEGAPUNK (CH. 1,069)"
      >
        <p className="text-xs sm:text-sm font-heading text-stone-900 font-bold">
          When a Devil Fruit eater’s mind and body catch up to the potential of their power, an &ldquo;Awakening&rdquo; (覚醒) occurs.
          However, the manifestation and psychological hazard differs fundamentally between the primary Devil Fruit systems.
        </p>
      </MangaPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AWAKENING_COMPARISONS.map((comp) => (
          <div
            key={comp.category}
            className="bg-white border-3 border-black p-5 comic-shadow space-y-4 relative rounded-2xl shadow-[4px_4px_0px_#000]"
          >
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div>
                <h3 className="text-lg font-black text-black uppercase font-heading">{comp.category}</h3>
                <span className="text-xs font-jp text-stone-600 font-bold">{comp.kanji}</span>
              </div>
              <span className="px-2.5 py-1 bg-[#ffd700] text-black text-[10px] font-black border-2 border-black uppercase comic-shadow-sm rounded-lg">
                {comp.category === 'Zoan' ? 'WILL OF THE BEAST' : comp.category === 'Paramecia' ? 'TERRESTRIAL IMPACT' : comp.category === 'Logia' ? 'METEOROLOGICAL' : 'CYBERNETIC'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-black font-black block mb-0.5 uppercase">Manifestation Mechanism:</span>
                <p className="text-stone-800 leading-relaxed font-bold">{comp.awakeningManifestation}</p>
              </div>

              <div>
                <span className="text-black font-black block mb-0.5 uppercase">Visual / Somatic Symptoms:</span>
                <p className="text-stone-800 leading-relaxed font-bold">{comp.visualSymptom}</p>
              </div>

              <div className="bg-amber-50 border-2 border-black p-2.5 rounded-lg comic-shadow-sm">
                <span className="text-[#dc0f0d] font-black block mb-0.5 uppercase flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Psychological &amp; Biological Hazard:</span>
                </span>
                <p className="text-stone-900 leading-relaxed text-[11px] font-bold">{comp.psychologicalRisk}</p>
              </div>

              <div>
                <span className="text-stone-700 font-black block mb-0.5 uppercase">Exemplar Canon Users:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {comp.notableExemplars.map((ex, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-stone-100 border-2 border-black text-black text-[11px] font-black rounded-lg comic-shadow-sm">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t-2 border-black pt-2">
                <span className="text-[10px] text-black font-black block uppercase">Dr. Vegapunk Verdict:</span>
                <p className="text-[11px] text-stone-700 italic mt-0.5 font-bold">&ldquo;{comp.vegapunkVerdict}&rdquo;</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};