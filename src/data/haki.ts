import { HakiTypeExplanation } from '../types.ts';

export const HAKI_TYPES_DATA: HakiTypeExplanation[] = [
  {
    name: 'Busoshoku Haki (Color of Armament)',
    japaneseName: '武装色の覇気',
    colorName: 'The Invisible Armor',
    baseApplication: 'Hardens spiritual energy around the body like an invisible suit of armor. Allows the user to bypass the fluid intangibility of Logia Devil Fruit users and touch their true solid form.',
    advancedApplication: 'Emission & Internal Destruction (Ryou). Flowing excess spiritual energy outward beyond the fists to create a defensive force-barrier, or projecting the Haki straight inside an opponent structure or explosive neck-collar to detonate it from the interior.',
    masterUsers: ['Monkey D. Luffy', 'Silvers Rayleigh', 'Kozuki Oden', 'Monkey D. Garp', 'Roronoa Zoro', 'Sentomaru', 'Hyogoro of the Flower'],
    visualEffectDescription: 'Jet-black metallic sheen (Koka / Hardening), black flowing smoke trails, and invisible shockwave repulsions.',
  },
  {
    name: 'Kenbunshoku Haki (Color of Observation)',
    japaneseName: '見聞色の覇気',
    colorName: 'Mantra / Spirit Eye',
    baseApplication: 'Heightens spiritual awareness to sense the presence, strength, emotional aura, and incoming trajectories of foes even when blinded or obscured by darkness.',
    advancedApplication: 'Future Sight (Kenbunshoku Mirai-shi). By calming the mind to absolute stillness, a master can perceive literal seconds into the future, anticipating attacks and counteractions before they occur in the present timeline.',
    masterUsers: ['Charlotte Katakuri', 'Monkey D. Luffy', 'Red-Haired Shanks', 'Enel (Mantra + Goro Goro amplify)', 'Usopp', 'Fujitora (Issho)'],
    visualEffectDescription: 'Crimson or golden eye glints, perception grids, and precognitive phantom vision echoes.',
  },
  {
    name: 'Haoshoku Haki (Color of the Supreme King / Conqueror’s)',
    japaneseName: '覇王色の覇気',
    colorName: 'The Disposition of a King',
    baseApplication: 'The rarest form of Haki, born into only one in several million people with the qualities of a king. Can instantaneously overwhelm and knock out thousands of weak-willed soldiers.',
    advancedApplication: 'Supreme King Coating / Infusion (ACoC - Haoshoku Matou). Only a mere handful of the absolute strongest entities in the world can infuse Conqueror willpower directly into their weapons and fists. Strikes do not make physical contact, producing thick black-crimson lightning and splitting the clouds across the entire sky.',
    masterUsers: ['Gol D. Roger', 'Edward Newgate (Whitebeard)', 'Red-Haired Shanks', 'Monkey D. Luffy', 'Kaido', 'Big Mom', 'Roronoa Zoro', 'Monkey D. Garp'],
    visualEffectDescription: 'Thick crackling black-and-crimson lightning (Haki zaps), thunderous air-shock waves, and splitting heaven cloud rifts.',
  },
];

export const TOP_TIER_HAKI_RANKS = [
  {
    name: 'Gol D. Roger',
    epithet: 'Pirate King',
    conquerorsTier: 'God Tier (ACoC Kamusari / Divine Departure)',
    armamentTier: 'Supreme Master (Black Blade Ace)',
    observationTier: 'Voice of All Things',
    signatureFeat: 'Conquered the entire Grand Line without possessing any Devil Fruit power whatsoever, solely relying on supreme Haki supremacy.',
  },
  {
    name: 'Red-Haired Shanks',
    epithet: 'Captain of Red Hair Pirates // Emperor',
    conquerorsTier: 'God Tier (WiFi Haki paralyzing Admiral Ryokugyu from miles offshore)',
    armamentTier: 'Supreme Master (Gryphon Saber)',
    observationTier: 'Future Sight Killer (Observation Killing technique)',
    signatureFeat: 'Can see 10+ seconds into the future and completely disable opponent Kenbunshoku with his aura.',
  },
  {
    name: 'Monkey D. Garp',
    epithet: 'Hero of the Marines // Garp the Fist',
    conquerorsTier: 'Supreme Tier (Galaxy Impact / Galaxy Divide)',
    armamentTier: 'Supreme Master (Iron Fist that shattered Don Chinjao drill)',
    observationTier: 'Master Tier',
    signatureFeat: 'Jumped out of a flying warship to detonate pirate island Hachinosu with a single ACoC Galaxy Impact shockwave.',
  },
  {
    name: 'Monkey D. Luffy',
    epithet: 'Emperor of the Sea',
    conquerorsTier: 'Supreme Tier (Bajrang Gun ACoC coating)',
    armamentTier: 'Internal Destruction Ryou Master',
    observationTier: 'Future Sight Master',
    signatureFeat: 'Split the heavens with Kaido and punched an island-sized fist through Wano magma without directly touching.',
  },
];
