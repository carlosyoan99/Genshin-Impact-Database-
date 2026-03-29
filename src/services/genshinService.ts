import genshin from 'genshin-db';
import { Category, Item, Language } from '../types';

// Cast to any to bypass typing issues with setOptions if they persist
(genshin as any).setOptions({
  queryLanguages: ['English'],
  resultLanguage: 'English',
});

export const getItemsByCategory = async (category: Category, language: Language): Promise<Item[]> => {
  (genshin as any).setOptions({ resultLanguage: language });

  let data: any[] = [];

  try {
    switch (category) {
      case 'characters':
        data = genshin.characters('names', { matchCategories: true })?.map(name => genshin.characters(name)) || [];
        break;
      case 'weapons':
        data = genshin.weapons('names', { matchCategories: true })?.map(name => genshin.weapons(name)) || [];
        break;
      case 'artifacts':
        data = genshin.artifacts('names', { matchCategories: true })?.map(name => genshin.artifacts(name)) || [];
        break;
      case 'materials':
        data = genshin.materials('names', { matchCategories: true })?.map(name => genshin.materials(name)) || [];
        break;
      case 'enemies':
        data = genshin.enemies('names', { matchCategories: true })?.map(name => genshin.enemies(name)) || [];
        break;
      case 'food':
        data = (genshin as any).foods('names', { matchCategories: true })?.map((name: string) => (genshin as any).foods(name)) || [];
        break;
      case 'reactions':
        data = (genshin as any).elements('names', { matchCategories: true })?.map((name: string) => (genshin as any).elements(name)) || [];
        // Add custom reactions if needed, or filter for reactions
        break;
      case 'achievements':
        data = (genshin as any).achievements('names', { matchCategories: true })?.map((name: string) => (genshin as any).achievements(name)) || [];
        break;
      case 'outfits':
        data = (genshin as any).outfits('names', { matchCategories: true })?.map((name: string) => (genshin as any).outfits(name)) || [];
        break;
      case 'domains':
        data = (genshin as any).domains('names', { matchCategories: true })?.map((name: string) => (genshin as any).domains(name)) || [];
        break;
      case 'windgliders':
        data = (genshin as any).windgliders('names', { matchCategories: true })?.map((name: string) => (genshin as any).windgliders(name)) || [];
        break;
      case 'animals':
        data = (genshin as any).animals('names', { matchCategories: true })?.map((name: string) => (genshin as any).animals(name)) || [];
        break;
      case 'tcg':
        const tcgChars = (genshin as any).tcgcharacters?.('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgcharacters(name)) || [];
        const tcgActions = (genshin as any).tcgactioncards?.('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgactioncards(name)) || [];
        data = [...tcgChars, ...tcgActions];
        break;
      case 'namecards':
        data = (genshin as any).namecards('names', { matchCategories: true })?.map((name: string) => (genshin as any).namecards(name)) || [];
        break;
      case 'geography':
        data = (genshin as any).geography('names', { matchCategories: true })?.map((name: string) => (genshin as any).geography(name)) || [];
        break;
      case 'adventureranks':
        data = (genshin as any).adventureranks('names', { matchCategories: true })?.map((name: string) => (genshin as any).adventureranks(name)) || [];
        break;
      case 'crafts':
        data = (genshin as any).crafts('names', { matchCategories: true })?.map((name: string) => (genshin as any).crafts(name)) || [];
        break;
      case 'elements':
        data = (genshin as any).elements('names', { matchCategories: true })?.map((name: string) => (genshin as any).elements(name)) || [];
        break;
      case 'emojis':
        data = (genshin as any).emojis('names', { matchCategories: true })?.map((name: string) => (genshin as any).emojis(name)) || [];
        break;
      case 'voiceovers':
        data = (genshin as any).voiceovers('names', { matchCategories: true })?.map((name: string) => (genshin as any).voiceovers(name)) || [];
        break;
      case 'tcgcardbacks':
        data = (genshin as any).tcgcardbacks('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgcardbacks(name)) || [];
        break;
      case 'tcgcardboxes':
        data = (genshin as any).tcgcardboxes('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgcardboxes(name)) || [];
        break;
      case 'tcgdetailedrules':
        data = (genshin as any).tcgdetailedrules('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgdetailedrules(name)) || [];
        break;
      case 'tcgenemycards':
        data = (genshin as any).tcgenemycards('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgenemycards(name)) || [];
        break;
      case 'tcgkeywords':
        data = (genshin as any).tcgkeywords('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgkeywords(name)) || [];
        break;
      case 'tcglevelrewards':
        data = (genshin as any).tcglevelrewards('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcglevelrewards(name)) || [];
        break;
      case 'tcgstatuseffects':
        data = (genshin as any).tcgstatuseffects('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgstatuseffects(name)) || [];
        break;
      case 'tcgsummons':
        data = (genshin as any).tcgsummons('names', { matchCategories: true })?.map((name: string) => (genshin as any).tcgsummons(name)) || [];
        break;
      default:
        data = [];
    }
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    data = [];
  }

  return data.map(item => ({
    ...item,
    category,
    id: item.name,
    rarity: item.rarity || item.quality || 0,
    icon: item.images?.icon || item.images?.image || item.images?.filename_icon,
    image: item.images?.cover1 || item.images?.cover2 || item.images?.portrait,
  })) as Item[];
};

export const getLunarReactions = (language: Language): Item[] => {
  // This is a placeholder for "lunar" reactions if they are not in genshin-db
  // Some users refer to "Lunar" as specific TCG or event reactions.
  // We can add them manually if needed.
  return [
    {
      name: 'Lunar Eclipse',
      description: 'A mysterious reaction involving the moon.',
      category: 'reactions',
      isResonance: false,
    } as Item
  ];
};
