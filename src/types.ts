export type CategoryId = 
  | 'science_tech'
  | 'history'
  | 'entertainment'
  | 'geography'
  | 'sports'
  | 'art_lit'
  | 'retro_games'
  | 'anime_pop';

export interface CategoryInfo {
  id: CategoryId;
  name: { es: string; en: string };
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: { es: string; en: string };
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface TriviaQuestion {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  question: { es: string; en: string };
  options: { es: string[]; en: string[] };
  correctIndex: number;
  explanation: { es: string; en: string };
  tags?: string[];
}

export type SentimentMood = 'neutral' | 'confident' | 'excited' | 'frustrated' | 'focused' | 'triumphant';

export interface RobotRival {
  id: string;
  name: string;
  title: { es: string; en: string };
  avatarConfig: AvatarConfig;
  difficultyLevel: Difficulty;
  accuracyRate: number; // 0 to 1
  answerSpeedSeconds: { min: number; max: number };
  catchphrases: {
    greeting: { es: string[]; en: string[] };
    correct: { es: string[]; en: string[] };
    wrong: { es: string[]; en: string[] };
    taunt: { es: string[]; en: string[] };
    defeat: { es: string[]; en: string[] };
  };
  rewardCoins: number;
  rewardXp: number;
  badgeReward: string;
  specialtyCategory: CategoryId;
}

export interface AvatarConfig {
  chassis: string; // 'classic' | 'cyber' | 'steampunk' | 'tank' | 'orb' | 'glitch'
  primaryColor: string;
  accentColor: string;
  eyesStyle: string; // 'visor' | 'dots' | 'cross' | 'laser' | 'anime'
  capeId?: string; // 'none' | 'hero_red' | 'cyber_neon' | 'cosmic_fire' | 'dragon_gold' | 'glitch_void'
  visorGlow: boolean;
  accessoryId?: string; // 'antenna' | 'headphones' | 'crown' | 'halo' | 'cyber_horns'
  auraId?: string; // 'none' | 'sparkles' | 'matrix' | 'fire' | 'lightning'
  expression?: 'normal' | 'happy' | 'thinking' | 'shocked' | 'smug' | 'glitch';
}

export interface ShopItem {
  id: string;
  type: 'chassis' | 'cape' | 'accessory' | 'aura' | 'palette';
  name: { es: string; en: string };
  description: { es: string; en: string };
  priceCoins: number;
  priceGems: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  previewColor?: string;
  unlocked: boolean;
}

export interface PlayerStats {
  totalMatches: number;
  wins: number;
  losses: number;
  correctAnswers: number;
  wrongAnswers: number;
  longestStreak: number;
  currentStreak: number;
  averageResponseTimeMs: number;
  categoryStats: Record<CategoryId, { correct: number; total: number }>;
  bossesDefeated: string[];
  cognitiveScore: number;
}

export interface UserProfile {
  id: string;
  username: string;
  title: string;
  level: number;
  xp: number;
  coins: number;
  gems: number;
  crowns: number;
  avatar: AvatarConfig;
  unlockedItems: string[];
  unlockedBadges: string[];
  stats: PlayerStats;
  online: boolean;
  lastSyncedAt: string;
}

export interface Achievement {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
  rewardCoins: number;
  rewardGems: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface MonthlyEvent {
  id: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  theme: string;
  startDate: string;
  endDate: string;
  tiers: {
    pointsNeeded: number;
    rewardDescription: { es: string; en: string };
    rewardType: 'coins' | 'gems' | 'cape' | 'badge';
    rewardValue: string | number;
    claimed: boolean;
  }[];
  currentPoints: number;
  bannerColor: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: AvatarConfig;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: AvatarConfig;
  crowns: number;
  points: number;
  country: string;
  isCurrentPlayer?: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';
}

export interface LifelineState {
  fiftyFifty: number;
  extraTime: number;
  swapQuestion: number;
  robotClue: number;
}

export type GameView = 
  | 'menu'
  | 'roulette'
  | 'duel'
  | 'tower'
  | 'multiplayer'
  | 'shop'
  | 'cognitive'
  | 'leaderboard'
  | 'events'
  | 'achievements'
  | 'settings';
