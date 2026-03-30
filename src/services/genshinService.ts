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
        data = genshin.characters('names', { matchCategories: true })?.map(name => {
          const char = genshin.characters(name);
          if (!char) return null;
          
          // Fetch talents and constellations
          const talents = (genshin as any).talents(name);
          const constellations = (genshin as any).constellations(name);
          
          return {
            ...char,
            talents: talents ? [
              { name: talents.combat1.name, description: talents.combat1.description, type: 'Normal Attack' },
              { name: talents.combat2.name, description: talents.combat2.description, type: 'Elemental Skill' },
              { name: talents.combat3.name, description: talents.combat3.description, type: 'Elemental Burst' },
              ...(talents.passive1 ? [{ name: talents.passive1.name, description: talents.passive1.description, type: 'Passive' }] : []),
              ...(talents.passive2 ? [{ name: talents.passive2.name, description: talents.passive2.description, type: 'Passive' }] : []),
              ...(talents.passive3 ? [{ name: talents.passive3.name, description: talents.passive3.description, type: 'Passive' }] : []),
            ] : [],
            constellations: constellations ? [
              { name: constellations.c1.name, description: constellations.c1.description, level: 1 },
              { name: constellations.c2.name, description: constellations.c2.description, level: 2 },
              { name: constellations.c3.name, description: constellations.c3.description, level: 3 },
              { name: constellations.c4.name, description: constellations.c4.description, level: 4 },
              { name: constellations.c5.name, description: constellations.c5.description, level: 5 },
              { name: constellations.c6.name, description: constellations.c6.description, level: 6 },
            ] : [],
            costs: (char as any).costs || {}
          };
        }).filter(Boolean) || [];
        break;
      case 'weapons':
        data = genshin.weapons('names', { matchCategories: true })?.map(name => {
          const weapon = genshin.weapons(name);
          if (!weapon) return null;
          return {
            ...weapon,
            refinements: [
              { level: 1, description: (weapon as any).r1 },
              { level: 2, description: (weapon as any).r2 },
              { level: 3, description: (weapon as any).r3 },
              { level: 4, description: (weapon as any).r4 },
              { level: 5, description: (weapon as any).r5 },
            ].filter(r => r.description)
          };
        }).filter(Boolean) || [];
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
        data = (genshin as any).foods('names', { matchCategories: true })?.map((name: string) => {
          const food = (genshin as any).foods(name);
          if (!food) return null;
          return {
            ...food,
            recipe: food.ingredients || []
          };
        }).filter(Boolean) || [];
        break;
      case 'reactions':
        data = (genshin as any).elements('names', { matchCategories: true })?.map((name: string) => (genshin as any).elements(name)) || [];
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
  return [
    {
      name: 'Lunar Eclipse',
      description: 'A mysterious reaction involving the moon.',
      category: 'reactions',
      isResonance: false,
    } as Item
  ];
};
