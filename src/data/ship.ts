export interface ShipSpec {
  name: string;
  type: string;
  architect: string;
  woodMaterial: string;
  figurehead: string;
  length: string;
  powerSource: string;
  status: string;
  specialFeatures: {
    name: string;
    description: string;
  }[];
  soldierDockSystem?: {
    channel: number;
    name: string;
    description: string;
  }[];
  rooms: {
    room: string;
    occupants: string;
    description: string;
  }[];
}

export const THOUSAND_SUNNY: ShipSpec = {
  name: 'Thousand Sunny (サウザンドサニー号)',
  type: 'Sloop-of-the-War Brigantine ("The Ship that Sails a Thousand Seas")',
  architect: 'Franky (Assisted by Iceburg, Galley-La Master Carpenters)',
  woodMaterial: 'Treasure Tree Adam (World hardest and rarest shipbuilding timber)',
  figurehead: 'Roaring Golden Sun Lion (Mane acts as propeller blades & Gaon Cannon barrel)',
  length: '56 meters',
  powerSource: 'Wind Sails + Cola Compression Tanks (Emergency Boost)',
  status: 'Active Flagship of Emperor Straw Hat Luffy',
  specialFeatures: [
    {
      name: 'Coup de Burst (風来バースト)',
      description: 'Emergency airborne flight propulsion consuming 3 barrels of cola, firing a massive atmospheric blast from the stern cannon to fly the Sunny 1 kilometer through the air.',
    },
    {
      name: 'Gaon Cannon (ガオン砲)',
      description: 'Concealed heavy rail-cannon inside the lion mouth. Fires a devastating compressed air-laser shockwave forward, utilizing Coup de Burst reverse stabilization.',
    },
    {
      name: 'Paddle Wheel Propulsion (外輪推進)',
      description: 'Twin retractable sidewheel paddlewheels powered by Franky cola engines, allowing navigation through the dead waters of the Calm Belt.',
    },
  ],
  soldierDockSystem: [
    { channel: 0, name: 'Paddle Wheel Auxiliary', description: 'Dual retractable paddle wheels for rowing through windless Calm Belts.' },
    { channel: 1, name: 'Shiromokuba I (White Pegasus)', description: 'One-person waver retrofitted with a Skypiea dial engine for high-speed scout runs by Nami.' },
    { channel: 2, name: 'Mini Merry II', description: 'Four-person steam scout paddle-ship with Going Merry original sheep figurehead.' },
    { channel: 3, name: 'Shark Submerge III', description: 'Deep-sea exploration submarine with panoramic glass dome diving down to 5,000 meters.' },
    { channel: 4, name: 'Kurosai FR-U IV (Black Rhino Motorcycle)', description: 'Heavy battle motorcycle made of Wapometal, combining into General Franky.' },
    { channel: 5, name: 'Brachio Tank V', description: 'Armored tank with movable long-necked cannon turret, commanded by Chopper.' },
    { channel: 6, name: 'Inflatable Pool / Dock Reserve', description: 'Relaxation deck pool or reserve vehicle holding compartment.' },
  ],
  rooms: [
    { room: 'Galley & Kitchen', occupants: 'Sanji & Crew', description: 'Locked refrigerator with passcode 7326 (Nami-Sanji-Jirō), giant dining table, and bar.' },
    { room: 'Aquarium Bar & Lounge', occupants: 'All Nakama', description: 'Living sea creatures caught on fishing rods swimming around the main recreation room.' },
    { room: 'Nami Mikan Orchard & Library', occupants: 'Nami & Robin', description: 'Tangerine trees transplanted directly from Bell-mère grove in Cocoyasi Village.' },
    { room: 'Franky & Usopp Workshop', occupants: 'Franky & Usopp', description: 'Equipped with heavy smithing tools, laser parts, and Pop Green botanical nursery.' },
    { room: 'Crow Nest Gymnasium', occupants: 'Zoro', description: 'Equipped with thousands of pounds of barbell iron for Zoro perpetual muscle training.' },
  ],
};

export const GOING_MERRY: ShipSpec = {
  name: 'Going Merry (ゴーイングメリー号)',
  type: 'Caravel',
  architect: 'Merry (Kaya Butler, Syrup Village)',
  woodMaterial: 'Standard East Blue Pine & Oak',
  figurehead: 'Gentle Smiling Sheep (Luffy favorite sitting spot)',
  length: '24 meters',
  powerSource: 'Square Rig Wind Sails',
  status: 'Viking Funeral Burial at Enies Lobby (Spirit lives on in Mini Merry II)',
  specialFeatures: [
    {
      name: 'The Klabautermann (船の妖精)',
      description: 'The incarnation of a ship spirit that manifests only when a vessel is loved and cared for unconditionally. Appeared with a mallet in Skypiea to repair the ship broken keel.',
    },
    {
      name: 'The Miraculous Final Voyage',
      description: 'Sailed entirely by itself across the stormy sea into the heart of the Enies Lobby Buster Call to catch the falling Straw Hats, whispering: "I am happy... Thank you for loving me."',
    },
  ],
  rooms: [
    { room: 'Main Cabin', occupants: 'The East Blue Crew', description: 'Cozy steering room and chart desk where Nami drew her earliest navigation maps.' },
    { room: 'Storage Hold', occupants: 'Caravel Keel', description: 'Held the barrel supplies, treasure chest from Captain Kuro, and cannon munitions.' },
  ],
};
