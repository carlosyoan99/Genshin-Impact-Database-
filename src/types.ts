export type Category = 
  | 'characters' | 'weapons' | 'artifacts' | 'materials' | 'enemies' | 'food' 
  | 'reactions' | 'achievements' | 'outfits' | 'domains' | 'windgliders' 
  | 'animals' | 'tcg' | 'namecards' | 'geography' | 'adventureranks' 
  | 'crafts' | 'elements' | 'emojis' | 'voiceovers' | 'tcgcardbacks' 
  | 'tcgcardboxes' | 'tcgdetailedrules' | 'tcgenemycards' | 'tcgkeywords' 
  | 'tcglevelrewards' | 'tcgstatuseffects' | 'tcgsummons';

export type Language = 
  | 'English' | 'Spanish' | 'French' | 'German' | 'Italian' 
  | 'Japanese' | 'Korean' | 'Portuguese' | 'Russian' | 'Thai' 
  | 'Vietnamese' | 'ChineseSimplified' | 'ChineseTraditional' 
  | 'Indonesian' | 'Turkish';

export interface Item {
  name: string;
  id?: string;
  rarity?: string | number;
  element?: string;
  weaponType?: string;
  substat?: string;
  description?: string;
  effect?: string;
  icon?: string;
  image?: string;
  url?: string;
  category: Category;
  // Specific fields
  birthday?: string;
  constellation?: string;
  title?: string;
  affiliation?: string;
  region?: string;
  baseAttack?: number;
  substatValue?: string;
  setEffect1?: string;
  setEffect2?: string;
  setEffect4?: string;
  materialType?: string;
  enemyType?: string;
  foodType?: string;
  area?: string;
  isResonance?: boolean;
  stats?: (level: number) => any;
  costs?: Record<string, any>;
  // New fields for expanded categories
  unlock?: string;
  reward?: any;
  exp?: number;
  unlocked?: string;
  result?: string;
  recipe?: { name: string; count: number }[];
  type?: string;
  quality?: string;
  dupe?: string;
  set?: string;
  character?: string;
  source?: string[];
  tcgType?: string;
}
