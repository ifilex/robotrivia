import { Achievement, AvatarConfig, CategoryId, SentimentMood, UserProfile } from '../types';

const PROFILE_KEY = 'robotrivia_user_profile_v1';
const ACHIEVEMENTS_KEY = 'robotrivia_achievements_v1';
const SETTINGS_KEY = 'robotrivia_app_settings_v1';

export const DEFAULT_AVATAR: AvatarConfig = {
  chassis: 'classic',
  primaryColor: '#38bdf8', // Light blue
  accentColor: '#f59e0b', // Amber
  eyesStyle: 'visor',
  visorGlow: true,
  accessoryId: 'antenna',
  capeId: 'cape_hero_red',
  auraId: 'none',
  expression: 'normal',
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    title: { es: 'Primer Duelo Ganado', en: 'First Duel Won' },
    description: { es: 'Vence a cualquier robot en tu primer duelo de trivia.', en: 'Defeat any robot in your first trivia duel.' },
    icon: 'Trophy',
    rewardCoins: 100,
    rewardGems: 5,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'streak_5',
    title: { es: 'Racha de Fuego', en: 'Fire Streak' },
    description: { es: 'Responde 5 preguntas correctas consecutivas sin fallar.', en: 'Answer 5 questions in a row correctly.' },
    icon: 'Flame',
    rewardCoins: 250,
    rewardGems: 10,
    progress: 0,
    maxProgress: 5,
    unlocked: false,
  },
  {
    id: 'boss_slayer',
    title: { es: 'Cazador de Jefes', en: 'Boss Slayer' },
    description: { es: 'Derrota a Queen Circuit en la Torre de Desafío.', en: 'Defeat Queen Circuit in the Challenge Tower.' },
    icon: 'Crown',
    rewardCoins: 1000,
    rewardGems: 50,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'speed_demon',
    title: { es: 'Reflejos Cuánticos', en: 'Quantum Reflexes' },
    description: { es: 'Responde una pregunta correctamente en menos de 2 segundos.', en: 'Answer a question correctly in under 2 seconds.' },
    icon: 'Zap',
    rewardCoins: 150,
    rewardGems: 8,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'fashion_icon',
    title: { es: 'Estilo 8-Bit', en: '8-Bit Fashion Icon' },
    description: { es: 'Equípate una capa y un accesorio en la tienda.', en: 'Equip a cape and an accessory in the shop.' },
    icon: 'Sparkles',
    rewardCoins: 200,
    rewardGems: 10,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
  },
  {
    id: 'trivia_master_100',
    title: { es: 'Enciclopedia Viviente', en: 'Living Encyclopedia' },
    description: { es: 'Acierta un total de 50 preguntas en cualquier modo.', en: 'Answer 50 questions correctly across all modes.' },
    icon: 'BookOpen',
    rewardCoins: 500,
    rewardGems: 25,
    progress: 0,
    maxProgress: 50,
    unlocked: false,
  },
];

export interface AppSettings {
  language: 'es' | 'en';
  crtFilter: boolean;
  highContrast: boolean;
  bgmVolume: number;
  sfxVolume: number;
  notificationsEnabled: boolean;
  notifDailyBonus: boolean;
  notifRivalChallenge: boolean;
  notifEvents: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'es',
  crtFilter: true,
  highContrast: false,
  bgmVolume: 0.6,
  sfxVolume: 0.7,
  notificationsEnabled: true,
  notifDailyBonus: true,
  notifRivalChallenge: true,
  notifEvents: true,
};

export class StorageService {
  public getUserProfile(): UserProfile {
    const defaults = this.createDefaultProfile();
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaults,
          ...parsed,
          avatar: { ...defaults.avatar, ...(parsed.avatar || {}) },
          stats: {
            ...defaults.stats,
            ...(parsed.stats || {}),
            categoryStats: {
              ...defaults.stats.categoryStats,
              ...(parsed.stats?.categoryStats || {}),
            },
          },
        };
      }
    } catch (e) {
      console.warn('Failed to load profile', e);
    }
    return defaults;
  }

  public saveUserProfile(profile: UserProfile): void {
    try {
      profile.lastSyncedAt = new Date().toISOString();
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }

  public getAchievements(): Achievement[] {
    try {
      const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load achievements', e);
    }
    return INITIAL_ACHIEVEMENTS;
  }

  public saveAchievements(achievements: Achievement[]): void {
    try {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    } catch (e) {
      console.warn('Failed to save achievements', e);
    }
  }

  public getSettings(): AppSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load settings', e);
    }
    return DEFAULT_SETTINGS;
  }

  public saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  public recordMatchResult(
    won: boolean,
    correctCount: number,
    wrongCount: number,
    responseTimes: number[],
    categoryCounts: Record<CategoryId, { correct: number; total: number }>,
    coinsEarned: number,
    xpEarned: number,
    gemsEarned: number = 0,
    bossId?: string
  ): UserProfile {
    const profile = this.getUserProfile();
    profile.coins += coinsEarned;
    profile.gems += gemsEarned;
    profile.xp += xpEarned;

    // Check level up (e.g. 100 xp per level * current level)
    const xpNeeded = profile.level * 200;
    if (profile.xp >= xpNeeded) {
      profile.level += 1;
      profile.xp -= xpNeeded;
      profile.gems += 5; // Level up reward
    }

    if (won) {
      profile.stats.wins += 1;
      profile.crowns += 1;
      if (bossId && !profile.stats.bossesDefeated.includes(bossId)) {
        profile.stats.bossesDefeated.push(bossId);
      }
    } else {
      profile.stats.losses += 1;
    }

    profile.stats.totalMatches += 1;
    profile.stats.correctAnswers += correctCount;
    profile.stats.wrongAnswers += wrongCount;

    // Update Category Stats
    (Object.keys(categoryCounts) as CategoryId[]).forEach(cat => {
      if (!profile.stats.categoryStats[cat]) {
        profile.stats.categoryStats[cat] = { correct: 0, total: 0 };
      }
      profile.stats.categoryStats[cat].correct += categoryCounts[cat].correct;
      profile.stats.categoryStats[cat].total += categoryCounts[cat].total;
    });

    // Update Average Response Time
    if (responseTimes.length > 0) {
      const avgThisMatch = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      profile.stats.averageResponseTimeMs = profile.stats.averageResponseTimeMs === 0
        ? avgThisMatch
        : Math.round((profile.stats.averageResponseTimeMs * 0.7) + (avgThisMatch * 0.3));
    }

    // Cognitive Index calculation (Accuracy % * 50 + Speed factor + diversity factor)
    const accuracy = profile.stats.totalMatches > 0 && (profile.stats.correctAnswers + profile.stats.wrongAnswers) > 0
      ? (profile.stats.correctAnswers / (profile.stats.correctAnswers + profile.stats.wrongAnswers))
      : 0.5;
    const speedScore = Math.max(10, Math.min(50, Math.round(50 - (profile.stats.averageResponseTimeMs / 200))));
    profile.stats.cognitiveScore = Math.round(accuracy * 50 + speedScore + Math.min(20, profile.crowns * 2));

    this.saveUserProfile(profile);

    // Update Achievements
    const achievements = this.getAchievements();
    let achievementsChanged = false;
    achievements.forEach(ach => {
      if (!ach.unlocked) {
        if (ach.id === 'first_win' && won) {
          ach.progress = 1;
          ach.unlocked = true;
          profile.coins += ach.rewardCoins;
          profile.gems += ach.rewardGems;
          achievementsChanged = true;
        } else if (ach.id === 'boss_slayer' && bossId === 'queen_circuit' && won) {
          ach.progress = 1;
          ach.unlocked = true;
          profile.coins += ach.rewardCoins;
          profile.gems += ach.rewardGems;
          achievementsChanged = true;
        } else if (ach.id === 'trivia_master_100') {
          ach.progress = profile.stats.correctAnswers;
          if (ach.progress >= ach.maxProgress) {
            ach.unlocked = true;
            profile.coins += ach.rewardCoins;
            profile.gems += ach.rewardGems;
          }
          achievementsChanged = true;
        }
      }
    });

    if (achievementsChanged) {
      this.saveAchievements(achievements);
      this.saveUserProfile(profile);
    }

    return profile;
  }

  public exportData(): string {
    return this.exportProfileJSON();
  }

  public importData(jsonStr: string): boolean {
    return this.importProfileJSON(jsonStr);
  }

  public exportProfileJSON(): string {
    const data = {
      profile: this.getUserProfile(),
      achievements: this.getAchievements(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  public importProfileJSON(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) {
        this.saveUserProfile(data.profile);
      }
      if (data.achievements) {
        this.saveAchievements(data.achievements);
      }
      if (data.settings) {
        this.saveSettings(data.settings);
      }
      return true;
    } catch {
      return false;
    }
  }

  private createDefaultProfile(): UserProfile {
    return {
      id: 'player_' + Math.random().toString(36).substring(2, 9),
      username: 'PixelPlayer',
      title: 'Novato de los 8-Bits',
      level: 1,
      xp: 0,
      coins: 350,
      gems: 15,
      crowns: 0,
      avatar: DEFAULT_AVATAR,
      unlockedItems: ['cape_hero_red', 'chassis_classic', 'acc_antenna'],
      unlockedBadges: ['badge_rookie'],
      online: true,
      lastSyncedAt: new Date().toISOString(),
      stats: {
        totalMatches: 0,
        wins: 0,
        losses: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestStreak: 0,
        currentStreak: 0,
        averageResponseTimeMs: 3200,
        categoryStats: {
          science_tech: { correct: 0, total: 0 },
          history: { correct: 0, total: 0 },
          entertainment: { correct: 0, total: 0 },
          geography: { correct: 0, total: 0 },
          sports: { correct: 0, total: 0 },
          art_lit: { correct: 0, total: 0 },
          retro_games: { correct: 0, total: 0 },
          anime_pop: { correct: 0, total: 0 },
        },
        bossesDefeated: [],
        cognitiveScore: 45,
      },
    };
  }
}

export const storage = new StorageService();
