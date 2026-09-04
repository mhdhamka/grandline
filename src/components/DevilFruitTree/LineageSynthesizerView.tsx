import React, { useState } from 'react';
import { Cpu, Dna, Info } from 'lucide-react';
import { MangaPanel } from '../MangaPanel';
import { sound } from '../../utils/audio';

export const LineageSynthesizerView: React.FC = () => {
  const [synthFruit, setSynthFruit] = useState<string>('Kaido Azure Dragon Lineage');
  const [synthVector, setSynthVector] = useState<string>('Seraphim Lunarian Cyborg');
  const [synthCatalyst, setSynthCatalyst] = useState<string>('Green Blood Perfusion');
  const [synthReport, setSynthReport] = useState<string | null>(null);

  const handleRunSynthesis = () => {
    sound.playGearShift();
    setSynthReport(
      `[VEGAPUNK LAB REPORT // CODE: EG-771]\n` +
      `LINEAGE FACTOR TEMPLATE: ${synthFruit.toUpperCase()}\n` +
      `IMPLANTATION CARRIER: ${synthVector.toUpperCase()}\n` +
      `ACTIVATION TRIGGER: ${synthCatalyst.toUpperCase()}\n` +
      `STATUS: PHENOTYPE RESTABILIZED. GREEN BLOOD HEMOLYSIS RATIO 99.4%. ` +
      `THE CREATED HYBRID MANIFESTS AN INSTANTANEOUS SOMATIC RESONANCE. ` +
      `WARNING: LUNARIAN DEFENSIVE FLAME INTACT; DEVIATION RISK LEVEL EXTREME.`
    );
  };

  return (
    <div className="space-y-5">
      <MangaPanel
        title="EGGHEAD LABOPHASE // LINEAGE FACTOR SYNTHESIZER"
        jpTitle="血統因子合成シミュレータ"
        badge="MADS EXPERIMENTAL CHASSIS"
        badgeColor="green"
        variant="terminal"
        icon={<Cpu className="w-4 h-4 text-emerald-600" />}
        statusTags={[
          { label: 'LAB STATUS', value: 'PUNK RECORDS ONLINE', color: 'green' },
          { label: 'GREEN BLOOD', value: 'PARFUSION READY', color: 'blue' },
        ]}
        footerNote="AUTHORIZATION: STELLA // WARNING: LUNARIAN EMBEDDINGS REQUIRE EXTREME BUDGET"
      >
        <p className="text-xs sm:text-sm font-heading text-stone-900 font-bold">
          Dr. Vegapunk succeeded where Caesar Clown failed: cloning Lineage Factors with absolute fidelity.
          Paramecia abilities can be replicated through Green Blood transfusions; Zoan fruits can be cloned from living subjects (e.g. Kaido); Logia remains mathematically near-impossible.
          Simulate your own lineage factor fusion below.
        </p>
      </MangaPanel>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white border-3 border-black p-5 comic-shadow space-y-4 rounded-2xl shadow-[4px_4px_0px_#000]">
          <span className="text-xs font-heading font-black text-black block pb-2 border-b-2 border-black uppercase tracking-wider">
            SYNTHESIS PARAMETERS
          </span>

          <div>
            <label className="text-xs font-heading font-black text-stone-900 block mb-1 uppercase">
              1. Target Lineage Factor DNA:
            </label>
            <select
              value={synthFruit}
              onChange={(e) => setSynthFruit(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border-2 border-black text-xs text-black font-mono font-bold focus:outline-none focus:border-[#ffd700] rounded-lg"
            >
              <option value="Kaido Azure Dragon Lineage">Kaido of the Beasts // Uo Uo no Mi Model: Seiryu (Azure Dragon)</option>
              <option value="Doflamingo String Lineage">Donquixote Doflamingo // Ito Ito no Mi (String-String)</option>
              <option value="Boa Hancock Love Lineage">Boa Hancock // Mero Mero no Mi (Love-Love / Petrification)</option>
              <option value="Bartholomew Kuma Paw Lineage">Bartholomew Kuma // Nikyu Nikyu no Mi (Paw-Paw / Deflection)</option>
              <option value="Daz Bonez Dice Lineage">Daz Bonez // Supa Supa no Mi (Dice-Dice / Full Blade Body)</option>
              <option value="Luffy Sun God Nika Lineage">Monkey D. Luffy // Hito Hito no Mi Model: Nika (Joy Boy)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-heading font-black text-stone-900 block mb-1 uppercase">
              2. Implantation Vector / Carrier Chassis:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Seraphim Lunarian Cyborg',
                'Standard Human Bio-Transfusion',
                'Inanimate Steel Weapon (Zou Zou Tech)',
                'SAD Chemical Fermentation (SMILE)',
              ].map((vec) => (
                <button
                  key={vec}
                  onClick={() => {
                    sound.playClick();
                    setSynthVector(vec);
                  }}
                  className={`py-2 px-3 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase rounded-lg ${
                    synthVector === vec ? 'bg-emerald-600 text-white comic-shadow-sm' : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {vec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-heading font-black text-stone-900 block mb-1 uppercase">
              3. Awakening Acceleration Catalyst:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Green Blood Perfusion',
                'Near-Death Trauma Rebirth',
                'Mind-Body Sync Harmony',
                'SAD Chemical Agitation',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSynthCatalyst(cat);
                  }}
                  className={`py-2 px-2.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase rounded-lg ${
                    synthCatalyst === cat ? 'bg-[#dc0f0d] text-white comic-shadow-sm' : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunSynthesis}
            className="w-full py-3 bg-[#ffd700] hover:bg-amber-300 text-black font-heading font-black text-sm border-3 border-black uppercase tracking-wider cursor-pointer comic-shadow rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[3px_3px_0px_#000]"
          >
            <Cpu className="w-4 h-4" />
            <span>EXECUTE LINEAGE FACTOR TRANSCRIPTION</span>
          </button>
        </div>

        <div className="lg:col-span-6 bg-white border-3 border-black p-5 comic-shadow flex flex-col justify-between rounded-2xl shadow-[4px_4px_0px_#000]">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="text-xs font-mono font-black text-black uppercase flex items-center space-x-1.5">
                <Dna className="w-4 h-4 text-[#dc0f0d]" />
                <span>VEGAPUNK LABOPHASE TELEMETRY MONITOR</span>
              </span>
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-mono font-black border-2 border-black rounded">
                ONLINE
              </span>
            </div>

            {synthReport ? (
              <div className="bg-stone-50 border-3 border-black p-4 font-mono text-xs text-black whitespace-pre-wrap leading-relaxed space-y-2 rounded-xl comic-shadow-sm font-bold">
                {synthReport}
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500 font-mono text-xs space-y-2 font-bold">
                <Info className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                <p>Select your lineage template, carrier vector, and catalyst, then execute transcription to generate Vegapunk’s official lab diagnostics.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t-2 border-black text-[11px] font-mono text-stone-700 flex items-center justify-between font-bold">
            <span>EG-771 EGGHEAD PUNK RECORDS</span>
            <span className="text-black font-black">VEGAPUNK STELLA ARCHIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};