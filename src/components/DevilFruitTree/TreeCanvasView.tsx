import React, { RefObject } from 'react';
import { Compass } from 'lucide-react';
import { FruitNode, TreeEdge, TAXONOMY_NODES } from '../../data/devilFruitTreeData';

interface TreeCanvasViewProps {
  containerRef: RefObject<HTMLDivElement | null>;
  filteredNodes: FruitNode[];
  visibleEdges: TreeEdge[];
  selectedNodeId: string;
  activeLineageNodeIds: Set<string>;
  zoomLevel: number;
  isFullScreen: boolean;
  onSelectNode: (nodeId: string) => void;
  getNodeDimensions: (level: number) => { w: number; h: number };
}

export const TreeCanvasView: React.FC<TreeCanvasViewProps> = ({
  containerRef,
  filteredNodes,
  visibleEdges,
  selectedNodeId,
  activeLineageNodeIds,
  zoomLevel,
  isFullScreen,
  onSelectNode,
  getNodeDimensions,
}) => {
  return (
    <div
      ref={containerRef}
      className="bg-[#fffdfa] border-3 border-black relative overflow-auto comic-shadow select-none min-h-[660px] rounded-2xl shadow-[6px_6px_0px_#000]"
      style={{ scrollbarWidth: 'thin', maxHeight: isFullScreen ? 'calc(100vh - 280px)' : '720px' }}
    >
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-3 left-3 z-20 flex items-center space-x-2 text-[11px] font-heading font-black text-black bg-[#ffd700] px-3 py-1 border-2 border-black rounded-lg comic-shadow-sm">
        <Compass className="w-3.5 h-3.5 text-black animate-spin" />
        <span>GEAR 5 CLOUD CANVAS // DRUMS OF LIBERATION ACTIVE</span>
      </div>

      <div
        className="relative transition-transform duration-150 origin-top-left p-6"
        style={{ width: '1360px', height: '660px', transform: `scale(${zoomLevel})` }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1360 660">
          <defs>
            <linearGradient id="lineageGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc0f0d" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>

          {visibleEdges.map((edge) => {
            const sourceNode = TAXONOMY_NODES.find((n) => n.id === edge.source);
            const targetNode = TAXONOMY_NODES.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const sourceDim = getNodeDimensions(sourceNode.level);
            const targetDim = getNodeDimensions(targetNode.level);

            const x1 = sourceNode.x;
            const y1 = sourceNode.y + sourceDim.h / 2;
            const x2 = targetNode.x;
            const y2 = targetNode.y - targetDim.h / 2;

            const midY = (y1 + y2) / 2;
            const pathData = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

            const isHighlighted = activeLineageNodeIds.has(edge.source) && activeLineageNodeIds.has(edge.target);

            return (
              <g key={edge.id}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHighlighted ? '#dc0f0d' : '#000'}
                  strokeWidth={isHighlighted ? 4 : 2}
                  strokeDasharray={isHighlighted ? '8 4' : undefined}
                  className={isHighlighted ? 'animate-pulse' : ''}
                  opacity={isHighlighted ? 1 : 0.6}
                />
                {isHighlighted && edge.label && (
                  <g transform={`translate(${(x1 + x2) / 2}, ${midY})`}>
                    <rect x="-50" y="-12" width="100" height="24" fill="#ffd700" stroke="#000" strokeWidth="2" rx="4" />
                    <text textAnchor="middle" dominantBaseline="central" fill="#000" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="black">
                      {edge.label.toUpperCase()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {filteredNodes.map((node) => {
          const isSelected = node.id === selectedNodeId;
          const isLineageActive = activeLineageNodeIds.has(node.id);
          const dim = getNodeDimensions(node.level);

          return (
            <button
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              style={{
                left: `${node.x - dim.w / 2}px`,
                top: `${node.y - dim.h / 2}px`,
                width: `${dim.w}px`,
                height: `${dim.h}px`,
              }}
              className={`absolute z-10 text-left border-3 border-black transition-all cursor-pointer p-2.5 flex flex-col justify-between select-none rounded-xl bg-white ${
                isSelected
                  ? 'bg-[#ffd700] ring-4 ring-black scale-105 comic-shadow z-30 shadow-[4px_4px_0px_#000]'
                  : isLineageActive
                  ? 'bg-amber-50 ring-2 ring-black opacity-100 comic-shadow-sm z-20 shadow-[3px_3px_0px_#000]'
                  : 'bg-white opacity-95 hover:opacity-100 hover:scale-102 comic-shadow-sm shadow-[2px_2px_0px_#000]'
              }`}
            >
              <div className="flex items-center justify-between gap-1 overflow-hidden">
                <span className={`text-[9px] px-1.5 py-0.5 font-heading font-black border-2 border-black uppercase truncate rounded ${isSelected ? 'bg-black text-[#ffd700]' : 'bg-stone-100 text-black'}`}>
                  {node.level === 0 ? 'ORIGIN NEXUS' : node.level === 1 ? 'MAIN CLASS' : node.level === 2 ? 'SUB-BRANCH' : node.isAwakened ? 'AWAKENED 覚醒' : 'CANON FRUIT'}
                </span>
                {node.isAwakened && (
                  <span className="px-1.5 py-0.5 bg-[#dc0f0d] text-white text-[9px] font-black border-2 border-black flex items-center space-x-0.5 comic-shadow-sm shrink-0 rounded">
                    <span>TIER {node.awakeningTier.startsWith('tier') ? node.awakeningTier[4] : '1'}</span>
                  </span>
                )}
                {node.marineDangerRating === 'WORLD_THREAT' && (
                  <span className="px-1 py-0.5 bg-black text-[#ffd700] text-[8px] font-mono font-black border border-black uppercase shrink-0 rounded">
                    THREAT
                  </span>
                )}
              </div>

              <div className="truncate">
                <h4 className={`font-heading font-black leading-tight truncate uppercase ${node.level === 0 ? 'text-sm text-black underline' : 'text-xs text-black'}`}>
                  {node.name}
                </h4>
                <span className="text-[10px] font-jp text-stone-600 truncate block font-bold">
                  {node.japaneseName}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono border-t-2 border-black pt-1 text-stone-800">
                <span className="truncate max-w-[140px] font-bold">
                  {node.user.replace('Donquixote ', '').replace('Charlotte ', '')}
                </span>
                <span className="text-[9px] font-black uppercase shrink-0 bg-black text-white px-1 rounded">
                  L{node.level}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};