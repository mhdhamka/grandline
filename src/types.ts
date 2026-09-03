export type GrandLineEra = 'East Blue' | 'Paradise' | 'New World' | 'Final Saga';

export type UiTheme = 'parchment' | 'cyber-blue' | 'incursion-red' | 'egghead-neon' | 'marine-navy';

export interface ArcInfo {
  id: string;
  name: string;
  japaneseName: string;
  sagaId: string;
  era: GrandLineEra;
  mangaChapters: string;
  animeEpisodes: string;
  mainVillain: string;
  villainBounty?: string;
  keyPowerUp?: string;
  roadPoneglyph?: boolean;
  roadPoneglyphDetail?: string;
  locations: string[];
  synopsis: string;
  significantCasualtiesOrMoments: string[];
  theme: UiTheme;
  isCanon: boolean;
}

export interface SagaInfo {
  id: string;
  name: string;
  era: GrandLineEra;
  totalChapters: number;
  totalEpisodes: number;
  arcs: ArcInfo[];
  theme: UiTheme;
  tagline: string;
}

export interface BountyProgression {
  arc: string;
  amount: number;
  reason: string;
  epithet: string;
}

export interface SynergyCombo {
  name: string;
  japaneseName: string;
  members: string[];
  debutArc: string;
  description: string;
  category: 'Monster Trio' | 'Dual Finisher' | 'Grand Crew' | 'Comedic / Tactics';
}

export interface CharacterProfile {
  id: string;
  name: string;
  japaneseName: string;
  epithet: string;
  role: string;
  bounty: number;
  bountyHistory: BountyProgression[];
  dream: string;
  originSea: string;
  devilFruit?: {
    name: string;
    japaneseName: string;
    type: 'Paramecia' | 'Logia' | 'Zoan' | 'Mythical Zoan';
    awakened: boolean;
    description: string;
  };
  weaponsOrStyle: string[];
  emotionalClimax: {
    quote: string;
    scene: string;
    chapter: number;
  };
  haki: {
    hasArmament: boolean;
    hasObservation: boolean;
    hasConquerors: boolean;
    advancedTechniques: string[];
    description: string;
  };
  avatarUrl: string;
}

export interface TransformationTier {
  id: string;
  name: string;
  japaneseName: string;
  character: string;
  gearLevel: string;
  debutChapter: number;
  debutArc: string;
  scientificMechanics: string;
  visualTraits: string[];
  combatStats: {
    attack: number;
    speed: number;
    defense: number;
    staminaDrain: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Godly';
  };
  signatureAttacks: {
    name: string;
    japaneseName: string;
    description: string;
    soundType: 'gear' | 'slash' | 'drums' | 'click';
  }[];
  awakeningDetails?: string;
  hudGlowColor: string;
}

export interface ArcVillain {
  id: string;
  name: string;
  epithet: string;
  arc: string;
  bounty: number;
  devilFruit?: {
    name: string;
    type: string;
    awakened: boolean;
  };
  hakiTier: 'None' | 'Basic Haki' | 'Advanced Haki' | 'Supreme King Tier' | 'Ancient Demonic';
  ultimateDefeatMove: {
    attacker: string;
    moveName: string;
    chapter: number;
  };
  organization: string;
  quote: string;
}

export interface RoadPoneglyph {
  id: string;
  location: string;
  guardianOrPossessor: string;
  description: string;
  rubbingSecuredByStrawHats: boolean;
  coordinatesClue: string;
  history: string;
}

export interface HakiTypeExplanation {
  name: string;
  japaneseName: string;
  colorName: string;
  baseApplication: string;
  advancedApplication: string;
  masterUsers: string[];
  visualEffectDescription: string;
}

export interface MoviePlacement {
  id: string;
  title: string;
  releaseYear: number;
  chronologicalPlacement: string;
  mainAntagonist: string;
  canonStatus: 'Non-Canon Event with Canon Lore' | 'Conceptually Canon Elements' | 'Stand-Alone Film';
  highlights: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  persona: 'stella' | 'shaka' | 'lilith' | 'denden';
  timestamp: string;
}
