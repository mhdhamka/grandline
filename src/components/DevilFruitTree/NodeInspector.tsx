import React from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { MangaPanel } from '../MangaPanel';
import { FruitNode } from '../../data/devilFruitTreeData';

interface NodeInspectorProps {
  selectedNode: FruitNode;
  isInspectorExpanded: boolean;
  setIsInspectorExpanded: (val: boolean) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  selectedNode,
  isInspectorExpanded,
  setIsInspectorExpanded,
}) => {
  return (
    <MangaPanel
      title="LINEAGE FACTOR DOSSIER"
      jpTitle="血統因子解析調書"
      badge={`CLASS: ${selectedNode.category.toUpperCase()}`}
      badgeColor="gold"
      sfx={selectedNode.isAwakened ? 'DON!!' : undefined}
      headerAction={
        <button
          onClick={() => setIsInspectorExpanded(!isInspectorExpanded)}
          title="Toggle Expand Inspector"
          className="p-1.5 hover:bg-stone-200 text-black border-2 border-black cursor-pointer bg-white rounded-lg comic-shadow-sm font-bold"
        >
          {isInspectorExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      }
      statusTags={[
        { label: 'THREAT', value: selectedNode.marineDangerRating, color: selectedNode.marineDangerRating === 'WORLD_THREAT' ? 'red' : 'gold' },
        { label: 'AWAKENING', value: selectedNode.isAwakened ? 'VERIFIED 覚醒' : 'UNAWAKENED 未覚醒', color: selectedNode.isAwakened ? 'red' : 'slate' },
      ]}
      footerNote="EGGHEAD LABOPHASE ARCHIVE // AUTHORIZED BY STELLA"
    >
      <div className="space-y-4">
        <div className="bg-white border-3 border-black p-3 comic-shadow-sm space-y-1 rounded-xl">
          <span className="text-[10px] font-mono text-stone-500 block uppercase font-bold">
            // DESIGNATED NOMENCLATURE
          </span>
          <h3 className="text-base font-black text-black uppercase tracking-tight">
            {selectedNode.name}
          </h3>
          <div className="text-xs font-jp text-stone-700 font-bold">
            {selectedNode.japaneseName} <span className="font-mono text-[11px] text-stone-500">({selectedNode.romajiName})</span>
          </div>
        </div>

        <div className="bg-amber-50 border-3 border-black p-3 comic-shadow-sm space-y-1 rounded-xl">
          <span className="text-[10px] font-mono text-stone-600 block uppercase font-bold">
            CONFIRMED HOST / CONSUMER:
          </span>
          <div className="text-sm font-black text-black uppercase">
            {selectedNode.user}
          </div>
          {selectedNode.epithet && (
            <span className="inline-block text-xs font-mono text-stone-700 font-bold">
              &ldquo;{selectedNode.epithet}&rdquo;
            </span>
          )}
          {selectedNode.debutChapter && (
            <div className="text-[11px] font-mono text-stone-600 mt-1 font-bold">
              Canon Debut: Chapter {selectedNode.debutChapter} ({selectedNode.debutArc} Arc)
            </div>
          )}
        </div>

        {selectedNode.isAwakened ? (
          <div className="bg-[#fff3cc] border-3 border-black p-3 comic-shadow-sm space-y-1.5 rounded-xl">
            <div className="flex items-center space-x-1.5 text-black text-xs font-black">
              <span>AWAKENING PROTOCOL VERIFIED (覚醒顕現)</span>
            </div>
            {selectedNode.awakeningName && (
              <div className="text-xs font-black text-black font-mono uppercase">
                {selectedNode.awakeningName}
              </div>
            )}
            <p className="text-xs font-mono text-stone-800 leading-relaxed font-bold">
              {selectedNode.awakeningDescription}
            </p>
          </div>
        ) : (
          <div className="bg-stone-100 border-3 border-black p-2.5 text-xs font-mono text-stone-700 rounded-xl">
            <span className="text-black font-black block mb-0.5">AWAKENING STATUS: DORMANT</span>
            Subject relies on primary somatic transformation without environmental molecular restructuring.
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-black uppercase font-black flex items-center space-x-1">
            <span>Lineage Factor Biological Mechanism (血統因子の挙動):</span>
          </span>
          <p className="text-xs font-mono text-stone-900 bg-white border-3 border-black p-2.5 leading-relaxed rounded-xl comic-shadow-sm font-bold">
            {selectedNode.lineageFactorMechanic}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-stone-600 uppercase font-bold">
            Functional Capabilities:
          </span>
          <p className="text-xs text-stone-900 leading-relaxed bg-white border-3 border-black p-2.5 rounded-xl comic-shadow-sm font-bold">
            {selectedNode.description}
          </p>
        </div>

        <div className="bg-stone-50 border-3 border-black p-2.5 space-y-1 text-xs font-mono rounded-xl comic-shadow-sm">
          <span className="text-black font-black flex items-center space-x-1">
            <span>STANDARD COUNTERMEASURES:</span>
          </span>
          <ul className="list-disc list-inside text-stone-800 space-y-0.5 text-[11px] font-bold">
            <li>Kairouseki (Sea Prism Stone) 100% molecular restraint.</li>
            <li>Advanced Busoshoku &amp; Haoshoku Haki penetration.</li>
            <li>Oceanic submersion (Mother Sea curse applies to all users).</li>
          </ul>
        </div>
      </div>
    </MangaPanel>
  );
};