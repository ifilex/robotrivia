import { CategoryId, TriviaQuestion } from '../../types';
import { generateGeographyQuestions } from './geographyBank';
import { generateScienceTechQuestions } from './scienceTechBank';
import { generateHistoryQuestions } from './historyBank';
import { generateRetroGamesQuestions } from './retroGamesBank';
import { generateAnimePopQuestions } from './animePopBank';
import { generateSportsQuestions } from './sportsBank';
import { generateArtLitQuestions } from './artLitBank';
import { generateEntertainmentQuestions } from './entertainmentBank';

// In-memory cache for each category
const categoryCache: Partial<Record<CategoryId, TriviaQuestion[]>> = {};

export function getCategoryMassiveQuestions(category: CategoryId): TriviaQuestion[] {
  if (categoryCache[category]) {
    return categoryCache[category]!;
  }

  let list: TriviaQuestion[] = [];
  switch (category) {
    case 'geography':
      list = generateGeographyQuestions();
      break;
    case 'science_tech':
      list = generateScienceTechQuestions();
      break;
    case 'history':
      list = generateHistoryQuestions();
      break;
    case 'retro_games':
      list = generateRetroGamesQuestions();
      break;
    case 'anime_pop':
      list = generateAnimePopQuestions();
      break;
    case 'sports':
      list = generateSportsQuestions();
      break;
    case 'art_lit':
      list = generateArtLitQuestions();
      break;
    case 'entertainment':
      list = generateEntertainmentQuestions();
      break;
    default:
      list = generateScienceTechQuestions();
      break;
  }

  categoryCache[category] = list;
  return list;
}

export function getAllMassiveQuestions(): TriviaQuestion[] {
  const allCategories: CategoryId[] = [
    'science_tech',
    'history',
    'entertainment',
    'geography',
    'sports',
    'art_lit',
    'retro_games',
    'anime_pop',
  ];

  let total: TriviaQuestion[] = [];
  allCategories.forEach(cat => {
    total = total.concat(getCategoryMassiveQuestions(cat));
  });

  return total;
}
