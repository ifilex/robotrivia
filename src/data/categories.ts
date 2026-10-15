import { CategoryId, CategoryInfo } from '../types';

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  science_tech: {
    id: 'science_tech',
    name: { es: 'Ciencia y Tecnología', en: 'Science & Tech' },
    iconName: 'Atom',
    color: '#10b981', // Emerald green
    bgColor: 'bg-emerald-600',
    borderColor: 'border-emerald-400',
    description: {
      es: 'Física, química, informática, robótica y el cosmos.',
      en: 'Physics, chemistry, computing, robotics and the cosmos.',
    },
  },
  history: {
    id: 'history',
    name: { es: 'Historia Universal', en: 'World History' },
    iconName: 'Landmark',
    color: '#eab308', // Amber/Yellow
    bgColor: 'bg-amber-600',
    borderColor: 'border-amber-400',
    description: {
      es: 'Civilizaciones antiguas, revoluciones y personajes históricos.',
      en: 'Ancient civilizations, revolutions and historical figures.',
    },
  },
  entertainment: {
    id: 'entertainment',
    name: { es: 'Cine y Espectáculos', en: 'Cinema & Shows' },
    iconName: 'Film',
    color: '#ec4899', // Pink
    bgColor: 'bg-pink-600',
    borderColor: 'border-pink-400',
    description: {
      es: 'Películas, series, música, celebridades y televisión.',
      en: 'Movies, TV shows, music, celebrities and Hollywood.',
    },
  },
  geography: {
    id: 'geography',
    name: { es: 'Geografía Mundial', en: 'World Geography' },
    iconName: 'Globe2',
    color: '#3b82f6', // Blue
    bgColor: 'bg-blue-600',
    borderColor: 'border-blue-400',
    description: {
      es: 'Países, capitales, banderas, monumentos y accidentes geográficos.',
      en: 'Countries, capitals, flags, monuments and continents.',
    },
  },
  sports: {
    id: 'sports',
    name: { es: 'Deportes y Motores', en: 'Sports & Racing' },
    iconName: 'Trophy',
    color: '#f97316', // Orange
    bgColor: 'bg-orange-600',
    borderColor: 'border-orange-400',
    description: {
      es: 'Fútbol, baloncesto, olimpiadas, F1 y leyendas del deporte.',
      en: 'Soccer, basketball, olympics, racing and legends.',
    },
  },
  art_lit: {
    id: 'art_lit',
    name: { es: 'Arte y Literatura', en: 'Art & Literature' },
    iconName: 'Palette',
    color: '#a855f7', // Purple
    bgColor: 'bg-purple-600',
    borderColor: 'border-purple-400',
    description: {
      es: 'Obras maestras, autores clásicos, mitología y poesía.',
      en: 'Masterpieces, authors, classical mythology and novels.',
    },
  },
  retro_games: {
    id: 'retro_games',
    name: { es: 'Videojuegos Retro 8-Bit', en: 'Retro 8-Bit Games' },
    iconName: 'Gamepad2',
    color: '#ef4444', // Red
    bgColor: 'bg-red-600',
    borderColor: 'border-red-400',
    description: {
      es: 'NES, Arcade, Game Boy, consolas clásicas y secretos pixelados.',
      en: 'NES, Arcade, Game Boy, classic consoles and pixel secrets.',
    },
  },
  anime_pop: {
    id: 'anime_pop',
    name: { es: 'Anime y Cultura Pop', en: 'Anime & Pop Culture' },
    iconName: 'Sparkles',
    color: '#06b6d4', // Cyan
    bgColor: 'bg-cyan-600',
    borderColor: 'border-cyan-400',
    description: {
      es: 'Manga, anime shonen, cómics, memes y cultura geek.',
      en: 'Manga, shonen anime, comics, memes and geek culture.',
    },
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryId[];
