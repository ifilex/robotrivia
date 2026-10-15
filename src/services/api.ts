import { CategoryId, Difficulty, SentimentMood, TriviaQuestion } from '../types';
import { triviaRepo } from '../data/triviaDatabase';

export interface SentimentAnalysisResponse {
  mood: SentimentMood;
  adaptiveDifficultyAdvice: Difficulty;
  robotDialogue: { es: string; en: string };
}

export class ApiService {
  private lastSentimentCallTime = 0;
  private cachedSentiment: Record<string, SentimentAnalysisResponse> = {};

  public async fetchDynamicQuestions(
    category: CategoryId,
    difficulty: Difficulty = 'medium',
    language: 'es' | 'en' = 'es',
    count: number = 3
  ): Promise<TriviaQuestion[]> {
    try {
      const res = await fetch('/api/gemini/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, difficulty, language, count }),
      });

      if (!res.ok) throw new Error('API server returned error');
      const data = await res.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        triviaRepo.saveCustomQuestions(data.questions);
        return data.questions;
      }
    } catch {
      // Fallback seamlessly to local cached database
    }

    // Offline / Instant fallback
    const questions: TriviaQuestion[] = [];
    for (let i = 0; i < count; i++) {
      questions.push(triviaRepo.getQuestionForCategory(category, difficulty));
    }
    return questions;
  }

  public async analyzeSentiment(
    streak: number,
    lastResult: 'correct' | 'wrong',
    responseTimeMs: number,
    userMessage: string = '',
    robotName: string = 'PREGUNTRON-3000'
  ): Promise<SentimentAnalysisResponse> {
    const cacheKey = `${robotName}_${streak}_${lastResult}`;
    const now = Date.now();

    // Client-side debounce (at most 1 network call every 10 seconds)
    if (this.cachedSentiment[cacheKey] && now - this.lastSentimentCallTime < 10000) {
      return this.cachedSentiment[cacheKey];
    }

    try {
      this.lastSentimentCallTime = now;
      const res = await fetch('/api/gemini/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streak, lastResult, responseTimeMs, userMessage, robotName }),
      });

      if (!res.ok) throw new Error('Sentiment API error');
      const data = await res.json();
      if (data.success && data.sentiment) {
        this.cachedSentiment[cacheKey] = data.sentiment;
        return data.sentiment;
      }
    } catch {
      // Fallback
    }

    // Fallback response
    const fallback: SentimentAnalysisResponse = streak >= 3 ? {
      mood: 'excited',
      adaptiveDifficultyAdvice: 'hard',
      robotDialogue: {
        es: `¡Increíble! ¡Llevas una racha de ${streak} aciertos! ¿Podrás mantener este ritmo de supercomputadora?`,
        en: `Incredible! A streak of ${streak} correct! Can you maintain this supercomputer pace?`,
      },
    } : lastResult === 'wrong' ? {
      mood: 'focused',
      adaptiveDifficultyAdvice: 'easy',
      robotDialogue: {
        es: '¡No te preocupes! El aprendizaje cibernético requiere calibración. ¡Vamos por la siguiente!',
        en: 'Don’t worry! Cyber learning requires calibration. Let’s get the next one!',
      },
    } : {
      mood: 'neutral',
      adaptiveDifficultyAdvice: 'medium',
      robotDialogue: {
        es: '¡Analizando tus patrones neuronales de trivia... buen trabajo!',
        en: 'Analyzing your neural trivia patterns... good job!',
      },
    };

    this.cachedSentiment[cacheKey] = fallback;
    return fallback;
  }

  public async getLeaderboard(): Promise<any[]> {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        return data.leaderboard || [];
      }
    } catch {
      // Offline fallback
    }
    return [];
  }
}

export const apiService = new ApiService();
