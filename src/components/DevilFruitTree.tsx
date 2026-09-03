import React, { useState, useMemo, useRef } from 'react';
import { 
  Dna, 
  Search, 
  Info, 
  Cpu, 
  AlertTriangle, 
  RotateCcw,
  Maximize2,
  Minimize2,
  Compass,
  Sun
} from 'lucide-react';
import { MangaPanel } from './MangaPanel.tsx';
import { 
  TAXONOMY_NODES, 
  TREE_EDGES, 
  AWAKENING_COMPARISONS,
  FruitNode, 
  FruitCategory, 
  AwakeningTier,
  LineageSynthesisRecipe
} from '../data/devilFruitTreeData.ts';
import { sound } from '../utils/audio.ts';

type ViewMode = 'tree' | 'awakening_matrix' | 'synthesizer';

const CATEGORY_LABELS: Record<FruitCategory | 'all', { label: string; jp: string; color: string; border: string }> = {
  all: { label: 'ALL CLASSIFICATIONS', jp: '全系統', color: 'bg-black text-[#ffd700]', border: 'border-black' },
  paramecia: { label: 'PARAMECIA', jp: '超人系', color: 'bg-[#0b44c8] text-white', border: 'border-black' },
  zoan: { label: 'ZOAN', jp: '動物系', color: 'bg-[#d97706] text-white', border: 'border-black' },
  logia: { label: 'LOGIA', jp: '自然系', color: 'bg-[#dc0f0d] text-white', border: 'border-black' },
  artificial: { label: 'ARTIFICIAL / GREEN BLOOD', jp: '人造・緑の血', color: 'bg-emerald-700 text-white', border: 'border-black' },
  root: { label: 'LINEAGE ROOT', jp: '血統根源', color: 'bg-cyan-700 text-white', border: 'border-black' },
};

export const DevilFruitTree: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('fruit-hito-nika');
  const [categoryFilter, setCategoryFilter] = useState<FruitCategory | 'all'>('all');
  const [awakenedOnlyFilter, setAwakenedOnlyFilter] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isInspectorExpanded, setIsInspectorExpanded] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Synthesizer interactive state
  const [synthFruit, setSynthFruit] = useState<string>('Kaido Azure Dragon Lineage');
  const [synthVector, setSynthVector] = useState<string>('Seraphim Lunarian Cyborg');
  const [synthCatalyst, setSynthCatalyst] = useState<string>('Green Blood Perfusion');
  const [synthReport, setSynthReport] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Selected node
  const selectedNode = useMemo(() => {
    return TAXONOMY_NODES.find((n) => n.id === selectedNodeId) || TAXONOMY_NODES[0];
  }, [selectedNodeId]);

  // Compute active lineage path
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

  // Filtered nodes
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
      {/* Top Section Header Panel */}
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
                viewMode === 'tree'
                  ? 'bg-[#ffd700] text-black comic-shadow-sm'
                  : 'bg-white text-black hover:bg-stone-100'
              }`}
            >
              <span>Phylogenetic Tree</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('awakening_matrix'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 ${
                viewMode === 'awakening_matrix'
                  ? 'bg-[#dc0f0d] text-white comic-shadow-sm'
                  : 'bg-white text-black hover:bg-stone-100'
              }`}
            >
              <span>Awakening Tiers</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('synthesizer'); }}
              className={`px-3 py-1.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 ${
                viewMode === 'synthesizer'
                  ? 'bg-emerald-600 text-white comic-shadow-sm'
                  : 'bg-white text-black hover:bg-stone-100'
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

      {/* Main View Mode Switcher */}
      {viewMode === 'tree' && (
        <div className="space-y-4">
          {/* Filter and Search Bar Strip */}
          <div className="bg-white border-3 border-black p-3.5 comic-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 rounded-xl">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 'paramecia', 'zoan', 'logia', 'artificial'] as const).map((cat) => {
                const isSelected = categoryFilter === cat;
                const info = CATEGORY_LABELS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sound.playClick();
                      setCategoryFilter(cat);
                    }}
                    className={`px-2.5 py-1 text-xs font-heading font-bold border-2 border-black cursor-pointer transition-all uppercase flex items-center space-x-1 rounded-lg ${
                      isSelected
                        ? `${info.color} comic-shadow-sm scale-105`
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    <span>{info.label}</span>
                    <span className="text-[10px] opacity-75 font-jp">({info.jp})</span>
                  </button>
                );
              })}
            </div>

            {/* Right side: Awakening toggle + Search input + Zoom */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setAwakenedOnlyFilter(!awakenedOnlyFilter);
                }}
                className={`px-2.5 py-1 text-xs font-heading font-bold border-2 border-black transition-all cursor-pointer uppercase flex items-center space-x-1.5 rounded-lg ${
                  awakenedOnlyFilter
                    ? 'bg-[#dc0f0d] text-white comic-shadow-sm'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                }`}
              >
                <span>Awakened Only (覚醒のみ)</span>
              </button>

              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fruit, user, or ability..."
                  className="w-full pl-8 pr-2.5 py-1 bg-stone-50 border-2 border-black text-xs text-black focus:outline-none focus:border-[#ffd700] font-mono rounded-lg"
                />
              </div>

              <div className="flex items-center space-x-1 bg-stone-100 border-2 border-black p-0.5 rounded-lg">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
                  title="Zoom Out"
                  className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1 text-black font-black">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                  title="Zoom In"
                  className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                  className="p-1 hover:bg-stone-200 text-black cursor-pointer font-bold"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Phylogenetic SVG Tree Workspace - Gear 5 Bright White Cloud Style */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left/Center: Visual SVG Graph Viewport */}
            <div className={`transition-all duration-300 ${isInspectorExpanded ? 'lg:col-span-6' : 'lg:col-span-8'}`}>
              <div 
                ref={containerRef}
                className="bg-[#fffdfa] border-3 border-black relative overflow-auto comic-shadow select-none min-h-[660px] rounded-2xl shadow-[6px_6px_0px_#000]"
                style={{ scrollbarWidth: 'thin', maxHeight: isFullScreen ? 'calc(100vh - 280px)' : '720px' }}
              >
                {/* Gear 5 Comic Dot Halftone Grid Background */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="absolute top-3 left-3 z-20 flex items-center space-x-2 text-[11px] font-heading font-black text-black bg-[#ffd700] px-3 py-1 border-2 border-black rounded-lg comic-shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-black animate-spin" />
                  <span>GEAR 5 CLOUD CANVAS // DRUMS OF LIBERATION ACTIVE</span>
                </div>

                {/* Scalable Container for SVG and Nodes */}
                <div 
                  className="relative transition-transform duration-150 origin-top-left p-6"
                  style={{
                    width: '1360px',
                    height: '660px',
                    transform: `scale(${zoomLevel})`,
                  }}
                >
                  {/* Interactive SVG Connector Layer */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    viewBox="0 0 1360 660"
                  >
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
                              <rect
                                x="-50"
                                y="-12"
                                width="100"
                                height="24"
                                fill="#ffd700"
                                stroke="#000"
                                strokeWidth="2"
                                rx="4"
                              />
                              <text
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill="#000"
                                fontSize="10"
                                fontFamily="Space Mono, monospace"
                                fontWeight="black"
                              >
                                {edge.label.toUpperCase()}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* HTML Node Elements Positioned in Virtual Space */}
                  {filteredNodes.map((node) => {
                    const isSelected = node.id === selectedNodeId;
                    const isLineageActive = activeLineageNodeIds.has(node.id);
                    const dim = getNodeDimensions(node.level);

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleSelectNode(node.id)}
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
            </div>

            {/* Right: Vegapunk Lineage Factor Analysis Dossier */}
            <div className={`transition-all duration-300 ${isInspectorExpanded ? 'lg:col-span-6' : 'lg:col-span-4'}`}>
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
            </div>
          </div>
        </div>
      )}

      {/* Awakening Comparison Matrix View */}
      {viewMode === 'awakening_matrix' && (
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
                    <h3 className="text-lg font-black text-black uppercase font-heading">
                      {comp.category}
                    </h3>
                    <span className="text-xs font-jp text-stone-600 font-bold">
                      {comp.kanji}
                    </span>
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
      )}

      {/* Vegapunk Lineage Factor Synthesizer Simulator View */}
      {viewMode === 'synthesizer' && (
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
            {/* Left Controls Form */}
            <div className="lg:col-span-6 bg-white border-3 border-black p-5 comic-shadow space-y-4 rounded-2xl shadow-[4px_4px_0px_#000]">
              <span className="text-xs font-heading font-black text-black block pb-2 border-b-2 border-black uppercase tracking-wider">
                SYNTHESIS PARAMETERS
              </span>

              {/* Template Lineage */}
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

              {/* Delivery Vector */}
              <div>
                <label className="text-xs font-heading font-black text-stone-900 block mb-1 uppercase">
                  2. Implantation Vector / Carrier Chassis:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Seraphim Lunarian Cyborg',
                    'Standard Human Bio-Transfusion',
                    'Inanimate Steel Weapon (Zou Zou Tech)',
                    'SAD Chemical Fermentation (SMILE)'
                  ].map((vec) => (
                    <button
                      key={vec}
                      onClick={() => { sound.playClick(); setSynthVector(vec); }}
                      className={`py-2 px-3 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase rounded-lg ${
                        synthVector === vec
                          ? 'bg-emerald-600 text-white comic-shadow-sm'
                          : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                      }`}
                    >
                      {vec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Awakening Catalyst */}
              <div>
                <label className="text-xs font-heading font-black text-stone-900 block mb-1 uppercase">
                  3. Awakening Acceleration Catalyst:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Green Blood Perfusion',
                    'Near-Death Trauma Rebirth',
                    'Mind-Body Sync Harmony',
                    'SAD Chemical Agitation'
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { sound.playClick(); setSynthCatalyst(cat); }}
                      className={`py-2 px-2.5 text-xs font-heading font-black border-2 border-black transition-all cursor-pointer uppercase rounded-lg ${
                        synthCatalyst === cat
                          ? 'bg-[#dc0f0d] text-white comic-shadow-sm'
                          : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleRunSynthesis}
                className="w-full py-3 bg-[#ffd700] hover:bg-amber-300 text-black font-heading font-black text-sm border-3 border-black uppercase tracking-wider cursor-pointer comic-shadow rounded-xl transition-all flex items-center justify-center space-x-2 shadow-[3px_3px_0px_#000]"
              >
                <Cpu className="w-4 h-4" />
                <span>EXECUTE LINEAGE FACTOR TRANSCRIPTION</span>
              </button>
            </div>

            {/* Right Diagnostic Telemetry Monitor */}
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
      )}
    </div>
  );
};