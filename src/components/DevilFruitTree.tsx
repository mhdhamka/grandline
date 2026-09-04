import React, { useState, useMemo, useRef } from 'react';
import { Maximize2, Minimize2, Sun } from 'lucide-react';
import { MangaPanel } from './Manga/MangaPanel';
import { TAXONOMY_NODES, TREE_EDGES, FruitNode, FruitCategory } from '../data/devilFruitTreeData';
import { sound } from '../utils/audio';

import { TreeFilterBar } from './DevilFruitTree/TreeFilterBar';
import { TreeCanvasView } from './DevilFruitTree/TreeCanvasView';
import { NodeInspector } from './DevilFruitTree/NodeInspector';
import { AwakeningMatrixView } from './DevilFruitTree/AwakeningMatrixView';
import { LineageSynthesizerView } from './DevilFruitTree/LineageSynthesizerView';

type ViewMode = 'tree' | 'awakening_matrix' | 'synthesizer';

export const DevilFruitTree: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('fruit-hito-nika');
  const [categoryFilter, setCategoryFilter] = useState<FruitCategory | 'all'>('all');
  const [awakenedOnlyFilter, setAwakenedOnlyFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isInspectorExpanded, setIsInspectorExpanded] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedNode = useMemo(() => {
    return TAXONOMY_NODES.find((n) => n.id === selectedNodeId) || TAXONOMY_NODES[0];
  }, [selectedNodeId]);

  const activeLineageNodeIds = useMemo(() => {
    const ids = new Set<string>();
    if (!selectedNode) return ids;

    ids.add(selectedNode.id);

    let current: FruitNode | undefined = selectedNode;
    while (current && current.parentId) {
      ids.add(current.parentId);
      current = TAXONOMY_NODES.find((n) => n.id === current?.parentId);
    }

    const addChildren = (parentId: string) => {
      TAXONOMY_NODES.filter((n) => n.parentId === parentId).forEach((child) => {
        ids.add(child.id);
        addChildren(child.id);
      });
    };
    addChildren(selectedNode.id);

    return ids;
  }, [selectedNode]);

  const filteredNodes = useMemo(() => {
    return TAXONOMY_NODES.filter((node) => {
      if (categoryFilter !== 'all' && node.category !== categoryFilter && node.category !== 'root') {
        return false;
      }
      if (awakenedOnlyFilter && !node.isAwakened && node.level === 3) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          node.name.toLowerCase().includes(q) ||
          node.japaneseName.toLowerCase().includes(q) ||
          node.user.toLowerCase().includes(q) ||
          node.description.toLowerCase().includes(q) ||
          node.lineageFactorMechanic.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categoryFilter, awakenedOnlyFilter, searchQuery]);

  const visibleNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const visibleEdges = useMemo(() => {
    return TREE_EDGES.filter((edge) => {
      return visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target);
    });
  }, [visibleNodeIds]);

  const handleSelectNode = (nodeId: string) => {
    sound.playClick();
    setSelectedNodeId(nodeId);
  };

  const getNodeDimensions = (level: number) => {
    switch (level) {
      case 0:
        return { w: 320, h: 80 };
      case 1:
        return { w: 240, h: 90 };
      case 2:
        return { w: 190, h: 75 };
      case 3:
      default:
        return { w: 220, h: 105 };
    }
  };

  return (
    <div className={`space-y-6 bg-[#fffdfa] text-black ${isFullScreen ? 'fixed inset-0 z-50 bg-[#fffdfa] overflow-y-auto p-4 sm:p-8' : ''}`}>
      <MangaPanel
        title="DEVIL FRUIT TAXONOMY"
        jpTitle="悪魔の実と血統因子の系統樹"
        badge="GEAR 5 CLOUD ARCHIVE // NIKA EDITION"
        badgeColor="gold"
        icon={<Sun className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />}
        sfx="DODON!!"
        headerAction={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sound.playClick(); setViewMode('tree'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 ${
                viewMode === 'tree' ? 'bg-[#ffd700] text-black comic-shadow-sm' : 'bg-white text-black hover:bg-stone-100'
              }`}
            >
              <span>Phylogenetic Tree</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('awakening_matrix'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 ${
                viewMode === 'awakening_matrix' ? 'bg-[#dc0f0d] text-white comic-shadow-sm' : 'bg-white text-black hover:bg-stone-100'
              }`}
            >
              <span>Awakening Tiers</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('synthesizer'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 ${
                viewMode === 'synthesizer' ? 'bg-emerald-600 text-white comic-shadow-sm' : 'bg-white text-black hover:bg-stone-100'
              }`}
            >
              <span>Lineage Factor Lab</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setIsFullScreen(!isFullScreen); }}
              className="px-3 py-1.5 text-xs font-heading font-black border-2 border-black bg-[#ffd700] text-black hover:bg-amber-300 comic-shadow-sm transition-all cursor-pointer uppercase flex items-center space-x-1"
              title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            >
              {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
          </div>
        }
        statusTags={[
          { label: 'CLASSIFICATION', value: 'PARAMECIA / ZOAN / LOGIA / GREEN BLOOD', color: 'blue' },
          { label: 'MADS DISCOVERY', value: 'BLOODLINE DNA (血統因子)', color: 'gold' },
          { label: 'AWAKENING CRITERIA', value: 'MIND & BODY HARMONIZATION', color: 'red' },
        ]}
        footerNote="EGGHEAD LABOPHASE // DR. VEGAPUNK"
      >
        <p className="text-xs sm:text-sm font-heading text-stone-800 leading-relaxed font-bold">
          &ldquo;Devil Fruits are the manifested possibilities of human evolution that someone wished for... All of them are unnatural branches despised by the Mother of Nature, the Sea!&rdquo; — Dr. Vegapunk.
          Explore the complete biological taxonomy mapping canonical fruit systems, sub-types, Green Blood Seraphim synthesis, and transcendental awakening tiers via dynamic SVG lineage connectors.
        </p>
      </MangaPanel>

      {viewMode === 'tree' && (
        <div className="space-y-4">
          <TreeFilterBar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            awakenedOnlyFilter={awakenedOnlyFilter}
            setAwakenedOnlyFilter={setAwakenedOnlyFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`transition-all duration-300 ${isInspectorExpanded ? 'lg:col-span-6' : 'lg:col-span-8'}`}>
              <TreeCanvasView
                containerRef={containerRef}
                filteredNodes={filteredNodes}
                visibleEdges={visibleEdges}
                selectedNodeId={selectedNodeId}
                activeLineageNodeIds={activeLineageNodeIds}
                zoomLevel={zoomLevel}
                isFullScreen={isFullScreen}
                onSelectNode={handleSelectNode}
                getNodeDimensions={getNodeDimensions}
              />
            </div>

            <div className={`transition-all duration-300 ${isInspectorExpanded ? 'lg:col-span-6' : 'lg:col-span-4'}`}>
              <NodeInspector
                selectedNode={selectedNode}
                isInspectorExpanded={isInspectorExpanded}
                setIsInspectorExpanded={setIsInspectorExpanded}
              />
            </div>
          </div>
        </div>
      )}

      {viewMode === 'awakening_matrix' && <AwakeningMatrixView />}

      {viewMode === 'synthesizer' && <LineageSynthesizerView />}
    </div>
  );
};