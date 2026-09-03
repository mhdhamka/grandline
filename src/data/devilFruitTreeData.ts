export type FruitCategory = 'root' | 'paramecia' | 'zoan' | 'logia' | 'artificial';
export type AwakeningTier = 'none' | 'dormant' | 'tier1_environmental' | 'tier2_zoan_hagoromo' | 'tier3_logia_climate' | 'tier4_divine_nika';

export interface FruitNode {
  id: string;
  parentId: string | null;
  name: string;
  japaneseName: string;
  romajiName: string;
  category: FruitCategory;
  subCategory?: string;
  awakeningTier: AwakeningTier;
  isAwakened: boolean;
  awakeningName?: string;
  awakeningDescription?: string;
  user: string;
  epithet?: string;
  debutChapter?: number;
  debutArc?: string;
  description: string;
  lineageFactorMechanic: string;
  marineDangerRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME' | 'CALAMITY' | 'WORLD_THREAT';
  seraphimSubject?: string;
  specialTrait?: string;
  colorScheme: {
    border: string;
    bg: string;
    text: string;
    glow: string;
    badgeBg: string;
  };
  // Grid / Tree layout positioning (coordinates in virtual SVG space)
  x: number;
  y: number;
  level: number; // 0: Root, 1: Main Category, 2: Sub-Type, 3: Fruit/Awakened Node
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  type: 'classification' | 'sub_branch' | 'lineage_mutation' | 'awakening_ascension';
  label?: string;
}

export interface AwakeningMechanicComparison {
  category: 'Paramecia' | 'Zoan' | 'Logia' | 'Artificial / Green Blood';
  kanji: string;
  awakeningManifestation: string;
  visualSymptom: string;
  psychologicalRisk: string;
  staminaDemand: string;
  notableExemplars: string[];
  vegapunkVerdict: string;
}

export const AWAKENING_COMPARISONS: AwakeningMechanicComparison[] = [
  {
    category: 'Paramecia',
    kanji: '超人系・覚醒',
    awakeningManifestation: 'Environmental Transfiguration & External Imbument',
    visualSymptom: 'Surrounding ground, buildings, or inanimate structures dissolve and transform into the fruit material (e.g. string, mochi, magnetic polarity, spatial KROOM coats).',
    psychologicalRisk: 'None observed. Mental stability remains intact regardless of scale.',
    staminaDemand: 'Massive caloric and cardiovascular drain; prolonged use leads to severe physical exhaustion.',
    notableExemplars: ['Donquixote Doflamingo (Ch. 785)', 'Charlotte Katakuri (Ch. 882)', 'Eustass Kid (Ch. 1030)', 'Trafalgar D. Water Law (Ch. 1030)'],
    vegapunkVerdict: 'The lineage factor transcends the individual somatic barrier, projecting altered molecular physics onto external terrestrial matter.'
  },
  {
    category: 'Zoan',
    kanji: '動物系・覚醒',
    awakeningManifestation: 'Supernatural Regeneration & Somatic Reconstitution',
    visualSymptom: 'Ethereal floating hagoromo (羽衣) sash of condensed black or white flame clouds, muscular density multiplier, immediate recovery from fatal shock.',
    psychologicalRisk: 'CRITICAL: The innate predatory or beast consciousness can permanently swallow the human mind (as observed in Impel Down Jailer Beasts). Only immense willpower retains self-awareness.',
    staminaDemand: 'Enhanced baseline stamina; rapid recovery from severe blunt trauma.',
    notableExemplars: ['Monkey D. Luffy (Gear 5 / Nika, Ch. 1044)', 'Rob Lucci (Awakened Leopard, Ch. 1069)', 'Kaku (Awakened Giraffe, Ch. 1072)', 'Impel Down Minotauros (Ch. 533)'],
    vegapunkVerdict: 'Zoan fruits possess inherent autonomous wills. True awakening is the complete synchronization of user psyche with the animal spirit.'
  },
  {
    category: 'Logia',
    kanji: '自然系・覚醒',
    awakeningManifestation: 'Permanent Terrestrial & Atmospheric Climate Alteration',
    visualSymptom: 'Irreversible terraforming of regional biosphere; continuous elemental spontaneous combustion or absolute sub-zero equilibrium indefinitely.',
    psychologicalRisk: 'Unknown. Likely extreme ideological zeal or natural element harmony.',
    staminaDemand: 'Requires supreme Haki reserves and catastrophic extended output.',
    notableExemplars: ['Sakazuki / Akainu (Punk Hazard Volcano)', 'Kuzan / Aokiji (Punk Hazard Glacial Tundra)'],
    vegapunkVerdict: 'When elemental generation reaches absolute critical mass, the island’s intrinsic magnetic and thermal currents are permanently rewritten.'
  },
  {
    category: 'Artificial / Green Blood',
    kanji: '人造・緑の血',
    awakeningManifestation: 'Seraphim Lineage Blood Circulation & SMILE Mutations',
    visualSymptom: 'Glowing fluorescent green fluid pumping through artificial vascular tubes; instant replication of Paramecia lineage traits in Lunarian clone bodies.',
    psychologicalRisk: 'SMILEs carry a 90% tragic neurological defect causing irreversible smiling and laughing. Green Blood carries absolute authority chip compliance.',
    staminaDemand: 'Powered by Lunarian bio-stamina and mechanical cybernetics.',
    notableExemplars: ['S-Hawk (Supa Supa / Dice-Dice)', 'S-Snake (Mero Mero / Love-Love)', 'S-Shark (Sui Sui / Swim-Swim)', 'S-Bear (Nikyu Nikyu / Paw-Paw)', 'Momonosuke (Azure Dragon)'],
    vegapunkVerdict: 'Lineage Factor synthesis proves Devil Fruits are manufactured evolution. Paramecia abilities are transmissible through liquid Green Blood; Zoan requires colossal funding.'
  }
];

export const TAXONOMY_NODES: FruitNode[] = [
  // LEVEL 0: Apex Root
  {
    id: 'root-lineage',
    parentId: null,
    name: 'LINEAGE FACTOR & HUMAN EVOLUTION',
    japaneseName: '血統因子と人類進化の夢',
    romajiName: 'Kettō Inshi // Vegapunk Nexus',
    category: 'root',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Discovered by MADS (Vegapunk, Judge, Queen, Caesar)',
    description: 'The fundamental biological code that governs all life and Devil Fruit phenomena. Dr. Vegapunk discovered that Devil Fruits are the manifested possibilities of human evolution born from people’s dreams.',
    lineageFactorMechanic: 'Genetic blueprint of living organisms capable of molecular restructuring when infused with sea devil lineage enzymes.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: {
      border: 'border-[#00f2ff]',
      bg: 'bg-[#081724]',
      text: 'text-[#00f2ff]',
      glow: 'shadow-[0_0_25px_rgba(0,242,255,0.4)]',
      badgeBg: 'bg-[#00f2ff] text-black'
    },
    x: 600,
    y: 50,
    level: 0
  },

  // LEVEL 1: Main Classifications
  {
    id: 'class-paramecia',
    parentId: 'root-lineage',
    name: 'PARAMECIA SYSTEM',
    japaneseName: '超人系（パラミシア）',
    romajiName: 'Chōjin-kei',
    category: 'paramecia',
    awakeningTier: 'tier1_environmental',
    isAwakened: false,
    user: 'Greatest diversity among Devil Fruit eaters',
    description: 'Grants superhuman physical transformations, matter emission, or conceptual law manipulation without turning the body directly into pure nature elements.',
    lineageFactorMechanic: 'Synthesizable via Vegapunk Green Blood (緑の血). Lineage factor alters either internal biological composition or spatial projection.',
    marineDangerRating: 'EXTREME',
    specialTrait: 'Can be replicated synthetically through blood transfusions.',
    colorScheme: {
      border: 'border-[#3b82f6]',
      bg: 'bg-[#0b1b36]',
      text: 'text-[#60a5fa]',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      badgeBg: 'bg-[#3b82f6] text-white'
    },
    x: 200,
    y: 190,
    level: 1
  },
  {
    id: 'class-zoan',
    parentId: 'root-lineage',
    name: 'ZOAN SYSTEM',
    japaneseName: '動物系（ゾオン）',
    romajiName: 'Dōbutsu-kei',
    category: 'zoan',
    awakeningTier: 'tier2_zoan_hagoromo',
    isAwakened: false,
    user: 'Beast transformation wielders',
    description: 'Allows the user to transform into another species and a hybrid human-beast form. Zoan fruits are the only class that possess autonomous sentient wills.',
    lineageFactorMechanic: 'Contains innate evolutionary animal lineage memories. Artificial replication possible but requires astronomical budget.',
    marineDangerRating: 'CALAMITY',
    specialTrait: 'Possesses autonomous will; risk of consuming user consciousness upon awakening.',
    colorScheme: {
      border: 'border-[#eab308]',
      bg: 'bg-[#291f05]',
      text: 'text-[#fde047]',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
      badgeBg: 'bg-[#eab308] text-black'
    },
    x: 520,
    y: 190,
    level: 1
  },
  {
    id: 'class-logia',
    parentId: 'root-lineage',
    name: 'LOGIA SYSTEM',
    japaneseName: '自然系（ロギア）',
    romajiName: 'Shizen-kei',
    category: 'logia',
    awakeningTier: 'tier3_logia_climate',
    isAwakened: false,
    user: 'Elemental forces of nature',
    description: 'Transforms the user’s somatic anatomy entirely into a natural element or catastrophic force. Grants complete intangibility to non-Haki strikes.',
    lineageFactorMechanic: 'Dr. Vegapunk confirmed Logia fruits are virtually impossible to artificially duplicate with conventional technology.',
    marineDangerRating: 'EXTREME',
    specialTrait: 'Immune to standard physical weapons; intangible without Busoshoku Haki or elemental opposites.',
    colorScheme: {
      border: 'border-[#ef4444]',
      bg: 'bg-[#2b0c0c]',
      text: 'text-[#f87171]',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      badgeBg: 'bg-[#ef4444] text-white'
    },
    x: 840,
    y: 190,
    level: 1
  },
  {
    id: 'class-artificial',
    parentId: 'root-lineage',
    name: 'ARTIFICIAL & GREEN BLOOD',
    japaneseName: '人造悪魔の実・血統因子工学',
    romajiName: 'Jinzō Akuma no Mi // Seraphim',
    category: 'artificial',
    awakeningTier: 'dormant',
    isAwakened: false,
    user: 'Vegapunk, Caesar Clown, World Government Seraphim',
    description: 'Synthetic Devil Fruit technology created by isolating and cloning Lineage Factors. Encompasses Caesar Clown’s defective SMILEs and Vegapunk’s divine Green Blood.',
    lineageFactorMechanic: 'Extracted DNA matrices stored in artificial media (SAD chemical fluid or synthesized hemolymph).',
    marineDangerRating: 'WORLD_THREAT',
    specialTrait: 'Powers the ultimate marine human weapons: Seraphim Pacifista.',
    colorScheme: {
      border: 'border-[#10b981]',
      bg: 'bg-[#052316]',
      text: 'text-[#34d399]',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      badgeBg: 'bg-[#10b981] text-black'
    },
    x: 1120,
    y: 190,
    level: 1
  },

  // LEVEL 2: Sub-Branches
  // Paramecia Sub-types
  {
    id: 'sub-paramecia-body',
    parentId: 'class-paramecia',
    name: 'Bodily Transfiguration',
    japaneseName: '身体変質型',
    romajiName: 'Shintai Henshitsu',
    category: 'paramecia',
    subCategory: 'Paramecia Sub-Branch',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Alters the user’s physical cellular structure permanently.',
    description: 'Changes the user’s flesh into substances like rubber, steel blades, or spring coils.',
    lineageFactorMechanic: 'Somatic cellular modification.',
    marineDangerRating: 'MEDIUM',
    colorScheme: { border: 'border-blue-400', bg: 'bg-[#0e213d]', text: 'text-blue-300', glow: 'shadow-blue-500/20', badgeBg: 'bg-blue-600 text-white' },
    x: 80,
    y: 350,
    level: 2
  },
  {
    id: 'sub-paramecia-emission',
    parentId: 'class-paramecia',
    name: 'Matter Generation & Control',
    japaneseName: '物質生成放出型',
    romajiName: 'Busshitsu Seisei',
    category: 'paramecia',
    subCategory: 'Paramecia Sub-Branch',
    awakeningTier: 'tier1_environmental',
    isAwakened: false,
    user: 'Produces external materials from pores and fingertips.',
    description: 'Generates limitless strings, toxic hydras, biscuits, wax, or mochi from the body.',
    lineageFactorMechanic: 'Extracorporeal matter synthesis.',
    marineDangerRating: 'HIGH',
    colorScheme: { border: 'border-blue-400', bg: 'bg-[#0e213d]', text: 'text-blue-300', glow: 'shadow-blue-500/20', badgeBg: 'bg-blue-600 text-white' },
    x: 230,
    y: 350,
    level: 2
  },
  {
    id: 'sub-paramecia-spatial',
    parentId: 'class-paramecia',
    name: 'Spatial & Reality Rules',
    japaneseName: '空間支配・超常規律型',
    romajiName: 'Kūkan Shihai',
    category: 'paramecia',
    subCategory: 'Paramecia Sub-Branch',
    awakeningTier: 'tier1_environmental',
    isAwakened: false,
    user: 'Manipulates physics, souls, memories, and physical coordinates.',
    description: 'Imposes conceptual laws over designated spatial domains (ROOM) or physical forces (Paw deflection, Gravity, Soul extraction).',
    lineageFactorMechanic: 'Conceptual space-time field distortion.',
    marineDangerRating: 'EXTREME',
    colorScheme: { border: 'border-blue-400', bg: 'bg-[#0e213d]', text: 'text-blue-300', glow: 'shadow-blue-500/20', badgeBg: 'bg-blue-600 text-white' },
    x: 370,
    y: 350,
    level: 2
  },

  // Zoan Sub-types
  {
    id: 'sub-zoan-standard',
    parentId: 'class-zoan',
    name: 'Standard Zoan',
    japaneseName: '通常種（肉食・草食）',
    romajiName: 'Tsūjō-shu',
    category: 'zoan',
    subCategory: 'Zoan Sub-Branch',
    awakeningTier: 'tier2_zoan_hagoromo',
    isAwakened: false,
    user: 'Real-world carnivorous & herbivorous animals.',
    description: 'Transforms into wolves, leopards, giraffes, falcon. Carnivorous types grant higher feral bloodlust in close combat.',
    lineageFactorMechanic: 'Direct extant terrestrial fauna lineage factors.',
    marineDangerRating: 'HIGH',
    colorScheme: { border: 'border-yellow-400', bg: 'bg-[#332607]', text: 'text-yellow-300', glow: 'shadow-yellow-500/20', badgeBg: 'bg-yellow-500 text-black' },
    x: 480,
    y: 350,
    level: 2
  },
  {
    id: 'sub-zoan-ancient',
    parentId: 'class-zoan',
    name: 'Ancient Zoan',
    japaneseName: '古代種（恐竜・古代生物）',
    romajiName: 'Kodai-shu',
    category: 'zoan',
    subCategory: 'Zoan Sub-Branch',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Extinct prehistoric dinosaurs and prehistoric apex predators.',
    description: 'Prehistoric beasts boasting absurd physical mass, near-impervious scale armor, and incomprehensible physiology (e.g. King’s slingshot headgear).',
    lineageFactorMechanic: 'Fossilized lineage factors reconstructed from ancient geological eras.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-yellow-400', bg: 'bg-[#332607]', text: 'text-yellow-300', glow: 'shadow-yellow-500/20', badgeBg: 'bg-yellow-500 text-black' },
    x: 590,
    y: 350,
    level: 2
  },
  {
    id: 'sub-zoan-mythical',
    parentId: 'class-zoan',
    name: 'Mythical Zoan',
    japaneseName: '幻獣種（神仏・伝説生物）',
    romajiName: 'Genjū-shu',
    category: 'zoan',
    subCategory: 'Zoan Sub-Branch',
    awakeningTier: 'tier4_divine_nika',
    isAwakened: false,
    user: 'Rarest of all Devil Fruits; exceeds Logia rarity.',
    description: 'Beings of mythology, folklore, and divinity. Grants physical Zoan strength plus supernatural mystical powers (flames of regeneration, lightning storms, golden shockwaves, deification).',
    lineageFactorMechanic: 'Lineage factor encoded with spiritual lore and primordial desires.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-[#ffd700]', bg: 'bg-[#3d2e05]', text: 'text-[#ffd700]', glow: 'shadow-amber-500/30', badgeBg: 'bg-[#ffd700] text-black' },
    x: 700,
    y: 350,
    level: 2
  },

  // Logia Sub-types
  {
    id: 'sub-logia-elemental',
    parentId: 'class-logia',
    name: 'Plasma & Thermal Forces',
    japaneseName: '高エネルギー熱プラズマ型',
    romajiName: 'Kō-Energy Gata',
    category: 'logia',
    subCategory: 'Logia Sub-Branch',
    awakeningTier: 'tier3_logia_climate',
    isAwakened: false,
    user: 'Lightning (Enel), Light (Kizaru), Fire (Ace/Sabo), Magma (Akainu)',
    description: 'Wields extreme thermodynamic output capable of incinerating island surfaces instantly.',
    lineageFactorMechanic: 'Electromagnetic and atomic thermal phase-transition enzymes.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-red-400', bg: 'bg-[#380e0e]', text: 'text-red-300', glow: 'shadow-red-500/20', badgeBg: 'bg-red-600 text-white' },
    x: 820,
    y: 350,
    level: 2
  },
  {
    id: 'sub-logia-matter',
    parentId: 'class-logia',
    name: 'Molecular Matter & Cold',
    japaneseName: '物質凝固・冷気砂塵型',
    romajiName: 'Busshitsu Gyōko Gata',
    category: 'logia',
    subCategory: 'Logia Sub-Branch',
    awakeningTier: 'tier3_logia_climate',
    isAwakened: false,
    user: 'Ice (Aokiji), Sand (Crocodile), Smoke (Smoker), Swamp (Caribou)',
    description: 'Crystalline ice flash-freezing entire oceans or desiccation sandstorms devouring moisture.',
    lineageFactorMechanic: 'Sub-zero cryo-enzymes and micro-particulate diffusion.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-red-400', bg: 'bg-[#380e0e]', text: 'text-red-300', glow: 'shadow-red-500/20', badgeBg: 'bg-red-600 text-white' },
    x: 930,
    y: 350,
    level: 2
  },
  {
    id: 'sub-logia-gravitational',
    parentId: 'class-logia',
    name: 'Darkness Singularity',
    japaneseName: '特異重力・闇引力型',
    romajiName: 'Tokui Jūryoku // Yami',
    category: 'logia',
    subCategory: 'Logia Sub-Branch',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Marshall D. Teach (Blackbeard)',
    description: 'The Yami Yami no Mi: Unique Logia that does NOT disperse attacks, absorbing twice the pain, but nullifies Devil Fruit powers on contact and absorbs matter like a black hole.',
    lineageFactorMechanic: 'Gravitational vortex singularity enzyme.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-purple-400', bg: 'bg-[#260c38]', text: 'text-purple-300', glow: 'shadow-purple-500/20', badgeBg: 'bg-purple-700 text-white' },
    x: 1040,
    y: 350,
    level: 2
  },

  // Artificial Sub-types
  {
    id: 'sub-art-greenblood',
    parentId: 'class-artificial',
    name: 'Green Blood (Seraphim)',
    japaneseName: '緑の血（セラフィム搭載）',
    romajiName: 'Midori no Chi',
    category: 'artificial',
    subCategory: 'Artificial Sub-Branch',
    awakeningTier: 'dormant',
    isAwakened: false,
    user: 'Vegapunk Pacifista: S-Hawk, S-Snake, S-Bear, S-Shark',
    description: 'Synthetic blood that circulates cloned Paramecia lineage factors through cybernetic Lunarian clone bodies, granting natural fruit powers without consuming the fruit itself.',
    lineageFactorMechanic: 'Liquidized cellular lineage factor media developed in Egghead Labophase.',
    marineDangerRating: 'WORLD_THREAT',
    specialTrait: 'Can be manufactured in quantity if provided infinite funding.',
    colorScheme: { border: 'border-emerald-400', bg: 'bg-[#08301d]', text: 'text-emerald-300', glow: 'shadow-emerald-500/20', badgeBg: 'bg-emerald-600 text-white' },
    x: 1140,
    y: 350,
    level: 2
  },
  {
    id: 'sub-art-smile',
    parentId: 'class-artificial',
    name: 'SAD & SMILE Fruits',
    japaneseName: 'SMILE（人造動物系）',
    romajiName: 'SMILE // Caesar Clown',
    category: 'artificial',
    subCategory: 'Artificial Sub-Branch',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Beasts Pirates (Gifters, Pleasures)',
    description: 'Caesar Clown’s flawed chemical extraction. 10% chance to gain uncontrollable animal appendages (e.g. lion stomach); 90% tragic fate of losing the ability to swim and express any emotion except laughing.',
    lineageFactorMechanic: 'Unstable mutagenic lineage factor harvested from animal SAD fluid.',
    marineDangerRating: 'MEDIUM',
    specialTrait: 'Permanent neurological destruction of sorrow/anger expressions.',
    colorScheme: { border: 'border-emerald-400', bg: 'bg-[#08301d]', text: 'text-emerald-300', glow: 'shadow-emerald-500/20', badgeBg: 'bg-emerald-600 text-white' },
    x: 1250,
    y: 350,
    level: 2
  },

  // LEVEL 3: Iconic Fruit Nodes (Awakened & Unawakened Exemplars)
  // Paramecia Fruits
  {
    id: 'fruit-ito-ito',
    parentId: 'sub-paramecia-emission',
    name: 'Ito Ito no Mi (String-String)',
    japaneseName: 'イトイトの実',
    romajiName: 'Ito Ito no Mi',
    category: 'paramecia',
    awakeningTier: 'tier1_environmental',
    isAwakened: true,
    awakeningName: 'White Line (白糸 // ハクジ)',
    awakeningDescription: 'Awakening transforms surrounding stone plazas and skyscrapers into millions of razor-sharp piercing strings controlled via gesture.',
    user: 'Donquixote Doflamingo',
    epithet: 'Heavenly Demon // Tenyasha',
    debutChapter: 785,
    debutArc: 'Dressrosa',
    description: 'Generates razor-sharp wires capable of cutting meteorites, controlling human bodies like marionettes (Parasite), and repairing punctured internal organs.',
    lineageFactorMechanic: 'Extracorporeal micro-filament synthesis projected into environmental inorganic lattices.',
    marineDangerRating: 'EXTREME',
    colorScheme: { border: 'border-pink-500', bg: 'bg-[#2d0f1f]', text: 'text-pink-300', glow: 'shadow-pink-500/30', badgeBg: 'bg-pink-600 text-white' },
    x: 180,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-mochi-mochi',
    parentId: 'sub-paramecia-emission',
    name: 'Mochi Mochi no Mi (Special Paramecia)',
    japaneseName: 'モチモチの実（特殊超人系）',
    romajiName: 'Mochi Mochi no Mi',
    category: 'paramecia',
    awakeningTier: 'tier1_environmental',
    isAwakened: true,
    awakeningName: 'Flowing Mochi & Peerless Donuts (流れモチ / 無双ドーナツ)',
    awakeningDescription: 'Transforms floor, ceiling, and mirrors into sticky mochi dough; generates floating square arms infused with Advanced Busoshoku Haki.',
    user: 'Charlotte Katakuri',
    epithet: 'Sweet Commander of Big Mom Pirates',
    debutChapter: 882,
    debutArc: 'Whole Cake Island',
    description: 'Categorized as a "Special Paramecia" because Katakuri can reshape his torso around incoming strikes to mimic Logia intangibility using Future Sight Kenbunshoku Haki.',
    lineageFactorMechanic: 'Viscoelastic polymer transmutation combined with advanced observation foresight.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-purple-400', bg: 'bg-[#220d33]', text: 'text-purple-200', glow: 'shadow-purple-500/30', badgeBg: 'bg-purple-600 text-white' },
    x: 290,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-ope-ope',
    parentId: 'sub-paramecia-spatial',
    name: 'Ope Ope no Mi (Op-Op / Ultimate Fruit)',
    japaneseName: 'オペオペの実（究極の悪魔の実）',
    romajiName: 'Ope Ope no Mi',
    category: 'paramecia',
    awakeningTier: 'tier1_environmental',
    isAwakened: true,
    awakeningName: 'KROOM & Anesthesia (KROOM // 穿孔波動)',
    awakeningDescription: 'Coats weapons with a micro-spatial room; extends blades miles deep without hurting surface flesh, releasing shockwave explosions directly inside internal organs.',
    user: 'Trafalgar D. Water Law',
    epithet: 'Surgeon of Death',
    debutChapter: 1030,
    debutArc: 'Wano Country (Raid on Onigashima)',
    description: 'Designated the "Ultimate Devil Fruit" worth ฿5,000,000,000. Capable of the Perennial Youth Surgery (不老手術) at the cost of the doctor’s own life.',
    lineageFactorMechanic: 'Spatial surgical domain manipulation bypassing all material density.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-cyan-400', bg: 'bg-[#08222d]', text: 'text-cyan-200', glow: 'shadow-cyan-500/30', badgeBg: 'bg-cyan-600 text-white' },
    x: 400,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-jiki-jiki',
    parentId: 'sub-paramecia-spatial',
    name: 'Jiki Jiki no Mi (Magnet-Magnet)',
    japaneseName: 'ジキジキの実',
    romajiName: 'Jiki Jiki no Mi',
    category: 'paramecia',
    awakeningTier: 'tier1_environmental',
    isAwakened: true,
    awakeningName: 'Assign (付与 // アサイン)',
    awakeningDescription: 'Bestows magnetic polarity (North / South) directly onto external living targets or stone walls, turning them into inescapable metallic magnets.',
    user: 'Eustass Kid',
    epithet: 'Captain of Kid Pirates',
    debutChapter: 1030,
    debutArc: 'Wano Country (Raid on Onigashima)',
    description: 'Manipulates magnetic vector fields to pull tons of scrap steel into colossal mechanical arms and railguns (Damned Punk).',
    lineageFactorMechanic: 'Electromagnetic dipole alignment transferred into alien matter.',
    marineDangerRating: 'EXTREME',
    colorScheme: { border: 'border-amber-500', bg: 'bg-[#291605]', text: 'text-amber-200', glow: 'shadow-amber-500/30', badgeBg: 'bg-amber-600 text-white' },
    x: 80,
    y: 530,
    level: 3
  },

  // Zoan Fruits
  {
    id: 'fruit-neko-leopard',
    parentId: 'sub-zoan-standard',
    name: 'Neko Neko no Mi: Model Leopard',
    japaneseName: 'ネコネコの実 モデル：豹（レオパルド）',
    romajiName: 'Neko Neko no Mi: Leopard',
    category: 'zoan',
    awakeningTier: 'tier2_zoan_hagoromo',
    isAwakened: true,
    awakeningName: 'Awakened Leopard Form (覚醒フォルム・黒炎の羽衣)',
    awakeningDescription: 'Slender, aerodynamic feline physique draped in jet-black floating flame hagoromo clouds. Exceptional speed, raw cutting force, and unbroken consciousness.',
    user: 'Rob Lucci',
    epithet: 'Cipher Pol Aigis 0 Chief Assassin',
    debutChapter: 1069,
    debutArc: 'Egghead Island',
    description: 'Dr. Vegapunk noted that awakened Zoans rarely maintain their human personality; Lucci’s mastery is a testament to terrifying disciplined bloodlust.',
    lineageFactorMechanic: 'Complete synchronization of carnivorous predatory impulse with Rokushiki bio-conditioning.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-orange-500', bg: 'bg-[#2d1506]', text: 'text-orange-200', glow: 'shadow-orange-500/30', badgeBg: 'bg-orange-600 text-white' },
    x: 490,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-ryu-pteranodon',
    parentId: 'sub-zoan-ancient',
    name: 'Ryu Ryu no Mi: Model Pteranodon',
    japaneseName: 'リュウリュウの実 古代種 モデル：プテラノドン',
    romajiName: 'Ryu Ryu no Mi: Pteranodon',
    category: 'zoan',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'King the Conflagration (Arbel)',
    epithet: 'Beasts Pirates Lead Performer // Lunarian',
    debutChapter: 930,
    debutArc: 'Wano Country',
    description: 'Grants flight at speeds exceeding bullet velocity. King pulls his head crest back like a slingshot to launch devastating laser-like shockwaves (Imperial Deep Pride Stake).',
    lineageFactorMechanic: 'Ancient Cretaceous aerodynamic bone lineage combined with Lunarian pyrokinesis.',
    marineDangerRating: 'CALAMITY',
    colorScheme: { border: 'border-yellow-500', bg: 'bg-[#292205]', text: 'text-yellow-200', glow: 'shadow-yellow-500/30', badgeBg: 'bg-yellow-600 text-white' },
    x: 600,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-hito-nika',
    parentId: 'sub-zoan-mythical',
    name: 'Hito Hito no Mi, Model: Nika (Sun God)',
    japaneseName: 'ヒトヒトの実 幻獣種 モデル：ニカ（太陽の神）',
    romajiName: 'Hito Hito no Mi, Model: Nika',
    category: 'zoan',
    awakeningTier: 'tier4_divine_nika',
    isAwakened: true,
    awakeningName: 'Gear 5 // Drums of Liberation (ギア５・解放のドラム)',
    awakeningDescription: 'White hair, steam ribbon hagoromo, red glowing eyes. The user’s body possesses boundless freedom limited only by imagination; turns surroundings and opponents into cartoon rubber.',
    user: 'Monkey D. Luffy',
    epithet: 'Emperor of the Sea // Joy Boy Reincarnate',
    debutChapter: 1044,
    debutArc: 'Wano Country (Raid on Onigashima)',
    description: 'Reclassified as the "Gomu Gomu no Mi" by the World Government for 800 years to erase its true name. It is the most ridiculous power in the world.',
    lineageFactorMechanic: 'Primordial desire for human freedom; deification of the somatic lineage factor.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-[#ffd700]', bg: 'bg-[#3b2b04]', text: 'text-[#ffd700]', glow: 'shadow-[0_0_30px_rgba(255,215,0,0.6)]', badgeBg: 'bg-[#ffd700] text-black font-black' },
    x: 710,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-uo-seiryu',
    parentId: 'sub-zoan-mythical',
    name: 'Uo Uo no Mi, Model: Seiryu (Azure Dragon)',
    japaneseName: 'ウオウオの実 幻獣種 モデル：青龍',
    romajiName: 'Uo Uo no Mi, Model: Seiryu',
    category: 'zoan',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Kaido of the Beasts (Also synthesized for Momonosuke)',
    epithet: 'Strongest Creature in the World',
    debutChapter: 921,
    debutArc: 'Wano Country',
    description: 'Colossal Azure Dragon that summons flame clouds (Homuragumo) to levitate entire islands, breathes mountain-shattering Boro Breath, and coats body in magma dragons (Kaen Daiko).',
    lineageFactorMechanic: 'Dr. Vegapunk spent 20 years extracting Kaido’s lineage factor to synthesize a duplicate fruit.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-blue-400', bg: 'bg-[#081a2e]', text: 'text-blue-300', glow: 'shadow-blue-500/30', badgeBg: 'bg-blue-600 text-white' },
    x: 810,
    y: 530,
    level: 3
  },

  // Logia Fruits
  {
    id: 'fruit-magu-magu',
    parentId: 'sub-logia-elemental',
    name: 'Magu Magu no Mi (Magma-Magma)',
    japaneseName: 'マグマグの実',
    romajiName: 'Magu Magu no Mi',
    category: 'logia',
    awakeningTier: 'tier3_logia_climate',
    isAwakened: true,
    awakeningName: 'Punk Hazard Thermal Terraforming (気候改変・永久業火)',
    awakeningDescription: 'Fought Kuzan for 10 days; permanently turned half of Punk Hazard into a volcanic caldera of molten lava and blazing brimstone.',
    user: 'Fleet Admiral Sakazuki (Akainu)',
    epithet: 'Red Dog // Absolute Justice',
    debutChapter: 554,
    debutArc: 'Marineford Summit War',
    description: 'Possesses the highest tier of pure offensive destructive power among all Devil Fruits, burning even hotter than Ace’s fire.',
    lineageFactorMechanic: 'Continuous volcanic subterranean convection state.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-red-600', bg: 'bg-[#3b0b0b]', text: 'text-red-200', glow: 'shadow-red-600/40', badgeBg: 'bg-red-700 text-white' },
    x: 910,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-hie-hie',
    parentId: 'sub-logia-matter',
    name: 'Hie Hie no Mi (Ice-Ice)',
    japaneseName: 'ヒエヒエの実',
    romajiName: 'Hie Hie no Mi',
    category: 'logia',
    awakeningTier: 'tier3_logia_climate',
    isAwakened: true,
    awakeningName: 'Punk Hazard Cryogenic Terraforming (気候改変・絶対零度)',
    awakeningDescription: 'Permanently altered half of Punk Hazard into eternal blizzard glaciers, frozen mountains, and iceberg fjords.',
    user: 'Kuzan (Aokiji)',
    epithet: 'Former Marine Admiral // Blackbeard Pirates 10th Captain',
    debutChapter: 303,
    debutArc: 'Long Ring Long Land',
    description: 'Capable of flash-freezing miles of raging sea (Ice Age) solid for over a week, or reconstituting shattered limbs into razor ice.',
    lineageFactorMechanic: 'Absolute zero thermodynamic entropy projection.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-sky-400', bg: 'bg-[#08202d]', text: 'text-sky-200', glow: 'shadow-sky-400/30', badgeBg: 'bg-sky-600 text-white' },
    x: 1010,
    y: 530,
    level: 3
  },
  {
    id: 'fruit-yami-yami',
    parentId: 'sub-logia-gravitational',
    name: 'Yami Yami no Mi (Darkness-Darkness)',
    japaneseName: 'ヤミヤミの実（もっとも凶悪な実）',
    romajiName: 'Yami Yami no Mi',
    category: 'logia',
    awakeningTier: 'none',
    isAwakened: false,
    user: 'Marshall D. Teach (Blackbeard)',
    epithet: 'Emperor Blackbeard',
    debutChapter: 440,
    debutArc: 'Banaro Island Duel',
    description: 'The most sinister Devil Fruit. Gravitational darkness sucks in everything (Black Hole), releases destroyed towns (Liberation), and shuts down other Devil Fruit lineages upon physical touch.',
    lineageFactorMechanic: 'Infinite gravitational density singularity nullifying exterior lineage enzyme signals.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-purple-600', bg: 'bg-[#220736]', text: 'text-purple-200', glow: 'shadow-purple-600/40', badgeBg: 'bg-purple-900 text-[#ffd700]' },
    x: 1110,
    y: 530,
    level: 3
  },

  // Artificial Fruits / Green Blood
  {
    id: 'fruit-greenblood-seraphim',
    parentId: 'sub-art-greenblood',
    name: 'Seraphim Green Blood Clones',
    japaneseName: '緑の血（S-ホーク / S-スネーク / S-ベア）',
    romajiName: 'Midori no Chi // Seraphim',
    category: 'artificial',
    awakeningTier: 'dormant',
    isAwakened: false,
    user: 'S-Hawk (Dice-Dice), S-Snake (Love-Love), S-Shark (Swim-Swim), S-Bear (Paw-Paw)',
    epithet: 'Vegapunk’s Greatest Inventions // Strongest Humanity',
    debutChapter: 1059,
    debutArc: 'Amazon Lily Siege / Egghead Island',
    description: 'Green Blood circulates synthesized lineage factors through Lunarian cyborg bodies. Grants S-Hawk steel slicing arms and S-Snake petrification beams without original users dying.',
    lineageFactorMechanic: 'Liquid lineage factor carrier medium enabling rapid weaponization of existing Paramecia abilities.',
    marineDangerRating: 'WORLD_THREAT',
    colorScheme: { border: 'border-emerald-400', bg: 'bg-[#052617]', text: 'text-emerald-200', glow: 'shadow-emerald-500/40', badgeBg: 'bg-emerald-500 text-black font-bold' },
    x: 1210,
    y: 530,
    level: 3
  }
];

export const TREE_EDGES: TreeEdge[] = [
  // Root to Level 1
  { id: 'e-root-paramecia', source: 'root-lineage', target: 'class-paramecia', type: 'classification', label: 'Superhuman Synthesis' },
  { id: 'e-root-zoan', source: 'root-lineage', target: 'class-zoan', type: 'classification', label: 'Animal Will & Memory' },
  { id: 'e-root-logia', source: 'root-lineage', target: 'class-logia', type: 'classification', label: 'Elemental Forces' },
  { id: 'e-root-artificial', source: 'root-lineage', target: 'class-artificial', type: 'classification', label: 'MADS Cloned DNA' },

  // Level 1 to Level 2 (Sub-branches)
  // Paramecia
  { id: 'e-paramecia-body', source: 'class-paramecia', target: 'sub-paramecia-body', type: 'sub_branch' },
  { id: 'e-paramecia-emission', source: 'class-paramecia', target: 'sub-paramecia-emission', type: 'sub_branch' },
  { id: 'e-paramecia-spatial', source: 'class-paramecia', target: 'sub-paramecia-spatial', type: 'sub_branch' },

  // Zoan
  { id: 'e-zoan-standard', source: 'class-zoan', target: 'sub-zoan-standard', type: 'sub_branch' },
  { id: 'e-zoan-ancient', source: 'class-zoan', target: 'sub-zoan-ancient', type: 'sub_branch' },
  { id: 'e-zoan-mythical', source: 'class-zoan', target: 'sub-zoan-mythical', type: 'sub_branch' },

  // Logia
  { id: 'e-logia-elemental', source: 'class-logia', target: 'sub-logia-elemental', type: 'sub_branch' },
  { id: 'e-logia-matter', source: 'class-logia', target: 'sub-logia-matter', type: 'sub_branch' },
  { id: 'e-logia-gravitational', source: 'class-logia', target: 'sub-logia-gravitational', type: 'sub_branch' },

  // Artificial
  { id: 'e-artificial-greenblood', source: 'class-artificial', target: 'sub-art-greenblood', type: 'sub_branch' },
  { id: 'e-artificial-smile', source: 'class-artificial', target: 'sub-art-smile', type: 'sub_branch' },

  // Level 2 to Level 3 (Exemplars)
  // Paramecia leaves
  { id: 'e-sub-jiki', source: 'sub-paramecia-spatial', target: 'fruit-jiki-jiki', type: 'awakening_ascension', label: 'Awakened' },
  { id: 'e-sub-ito', source: 'sub-paramecia-emission', target: 'fruit-ito-ito', type: 'awakening_ascension', label: 'Awakened' },
  { id: 'e-sub-mochi', source: 'sub-paramecia-emission', target: 'fruit-mochi-mochi', type: 'awakening_ascension', label: 'Awakened' },
  { id: 'e-sub-ope', source: 'sub-paramecia-spatial', target: 'fruit-ope-ope', type: 'awakening_ascension', label: 'Awakened' },

  // Zoan leaves
  { id: 'e-sub-neko', source: 'sub-zoan-standard', target: 'fruit-neko-leopard', type: 'awakening_ascension', label: 'Awakened' },
  { id: 'e-sub-ryu', source: 'sub-zoan-ancient', target: 'fruit-ryu-pteranodon', type: 'sub_branch' },
  { id: 'e-sub-nika', source: 'sub-zoan-mythical', target: 'fruit-hito-nika', type: 'awakening_ascension', label: 'Deified' },
  { id: 'e-sub-uo', source: 'sub-zoan-mythical', target: 'fruit-uo-seiryu', type: 'sub_branch' },

  // Logia leaves
  { id: 'e-sub-magu', source: 'sub-logia-elemental', target: 'fruit-magu-magu', type: 'awakening_ascension', label: 'Terraformed' },
  { id: 'e-sub-hie', source: 'sub-logia-matter', target: 'fruit-hie-hie', type: 'awakening_ascension', label: 'Terraformed' },
  { id: 'e-sub-yami', source: 'sub-logia-gravitational', target: 'fruit-yami-yami', type: 'sub_branch' },

  // Artificial leaves
  { id: 'e-sub-seraphim', source: 'sub-art-greenblood', target: 'fruit-greenblood-seraphim', type: 'lineage_mutation', label: 'Green Blood' },
];

export interface LineageSynthesisRecipe {
  baseFruit: string;
  category: FruitCategory;
  hostVector: 'Human Natural' | 'Seraphim Lunarian Cyborg' | 'Inanimate Weapon' | 'Defective SMILE';
  catalyst: 'Severe Trauma' | 'Harmonic Synchronization' | 'Green Blood Perfusion' | 'SAD Agitation';
  resultName: string;
  resultPower: string;
  hazardRating: string;
  vegapunkReport: string;
}
