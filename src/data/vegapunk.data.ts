import { PersonaConfig, MangaQuote } from '../types/vegapunk.types';

export const PRESET_QUESTIONS = [
  'Explain the Void Century, Joy Boy, and the Ancient Kingdom',
  'What is the true origin and Lineage Factor of Devil Fruits?',
  'What are the Three Ancient Weapons: Pluton, Poseidon, and Uranus?',
  'Break down the Drums of Liberation and Sun God Nika lore',
];

export const PERSONA_CONFIGS: Record<string, PersonaConfig> = {
  stella: {
    name: 'Dr. Vegapunk // Stella',
    epithet: 'Genius Scientist of Egghead // 500-Year Intellect',
    sfx: 'QUAPAPAPA!',
    avatar: '/src/assets/images/stella.png',
    greeting: 'Quapapapa! Greetings, traveler of the Grand Line! I am **Dr. Vegapunk**, the genius scientist whose brain exceeds human capacity by 500 years! My satellite network (PUNK-RECORDS) is linked to this terminal. Ask me anything regarding the Void Century, Devil Fruit Lineage Factors, or Ancient Weapons!',
    defaultShape: 'round',
    defaultVariant: 'paper',
  },
  shaka: {
    name: 'PUNK-01 Shaka',
    epithet: 'Logical Satellite of Truth & Ethics',
    sfx: 'LOGIC-SYNC',
    avatar: '/src/assets/images/shaka.png',
    greeting: 'PUNK-01 Shaka online. Logic channels synchronized. I process objective truth, historical data, and ethical variables of the World Government. State your query carefully, traveler.',
    defaultShape: 'square',
    defaultVariant: 'paper',
  },
  lilith: {
    name: 'PUNK-02 Lilith',
    epithet: 'Primal Satellite // Combat & Action',
    sfx: 'BAAAAN!',
    avatar: '/src/assets/images/lilith.png',
    greeting: 'Hey! PUNK-02 Lilith here! Hand over your valuables and your research funds immediately—or else! ...Just kidding. Unless you want a taste of my technology. What do you want?',
    defaultShape: 'shout',
    defaultVariant: 'red',
  },
  denden: {
    name: 'Den Den Mushi Cipher',
    epithet: 'Encrypted S-Transmission Snail',
    sfx: 'PURUPURU... GACHA!',
    avatar: '/src/assets/images/denden.png',
    greeting: '*Purupurupuru... Gacha!* Secure transmission line established. Encryption protocols active across the Red Line. Speak your message into the receiver; the data will be logged instantly.',
    defaultShape: 'electric',
    defaultVariant: 'terminal',
  },
};

export const LEGENDARY_MANGA_QUOTES: MangaQuote[] = [
  {
    speaker: 'Dr. Vegapunk Stella',
    epithet: 'Egghead Global Transmission',
    quote: 'This world... is sinking into the ocean! 200 meters into the abyss!',
    shape: 'electric',
    variant: 'terminal',
    fontStyle: 'mono',
    sfx: 'QUAPAPAPA!',
    citation: 'Egghead Island // Ch. 1113',
  },
  {
    speaker: 'Monkey D. Luffy',
    epithet: 'Captain of the Straw Hat Pirates',
    quote: "I know I need help if I want to survive! I can't use swords! I can't navigate! I can't cook! I can't even lie!",
    shape: 'shout',
    variant: 'paper',
    fontStyle: 'comic',
    sfx: 'DON!!',
    citation: 'Arlong Park // Ch. 90',
  },
  {
    speaker: 'Nico Robin',
    epithet: 'Devil Child of Ohara',
    quote: 'I WANT TO LIVE! TAKE ME OUT TO SEA WITH YOU!!',
    shape: 'shout',
    variant: 'paper',
    fontStyle: 'shout',
    sfx: 'ドドン!!',
    citation: 'Enies Lobby // Ch. 398',
  },
];