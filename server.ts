import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rate limit / Quota backoff tracker
let lastGeminiRequestTime = 0;
let geminiCooldownUntil = 0;
const GEMINI_MIN_INTERVAL_MS = 12000; // 12s interval to stay safely under free-tier 5 RPM limit

// Rich Procedural Dialogue & Banter Generator for instant zero-latency responses
function getProceduralSentiment(
  streak: number,
  lastResult: 'correct' | 'wrong',
  responseTimeMs: number,
  robotName: string
) {
  const isFast = responseTimeMs < 3500;
  const isSlow = responseTimeMs > 9000;

  if (streak >= 5) {
    return {
      mood: 'shocked',
      adaptiveDifficultyAdvice: 'expert',
      robotDialogue: {
        es: `¡Alerta de sobrecalentamiento! 🔥 ¡${streak} aciertos seguidos! ¡${robotName} no puede procesar semejante intelecto!`,
        en: `Overheat warning! 🔥 A streak of ${streak} correct answers! ${robotName} cannot process such intellect!`,
      },
    };
  }

  if (streak >= 3) {
    return {
      mood: 'excited',
      adaptiveDifficultyAdvice: 'hard',
      robotDialogue: {
        es: `¡Bip bop! ¡Racha de ${streak} aciertos! Tus circuitos de memoria están operando al 100% de eficiencia.`,
        en: `Beep boop! Streak of ${streak}! Your memory circuits are operating at 100% efficiency.`,
      },
    };
  }

  if (lastResult === 'wrong') {
    if (isSlow) {
      return {
        mood: 'smug',
        adaptiveDifficultyAdvice: 'easy',
        robotDialogue: {
          es: `¡Tiempo agotado en los buffers! Tómate un segundo para reiniciar la caché y vuelve a intentarlo.`,
          en: `Buffer timeout! Take a second to flush your cache and try again.`,
        },
      };
    }
    return {
      mood: 'thinking',
      adaptiveDifficultyAdvice: 'easy',
      robotDialogue: {
        es: `¡Error 404 en esa respuesta! No te preocupes, incluso los mejores algoritmos recalibran. ¡A por la siguiente!`,
        en: `Error 404 on that answer! Don't worry, even top algorithms recalibrate. On to the next!`,
      },
    };
  }

  if (isFast) {
    return {
      mood: 'confident',
      adaptiveDifficultyAdvice: 'hard',
      robotDialogue: {
        es: `¡Velocidad de procesamiento supersónica! Respondiste en solo ${(responseTimeMs / 1000).toFixed(1)} segundos. ⚡`,
        en: `Supersonic processing speed! Answered in just ${(responseTimeMs / 1000).toFixed(1)} seconds. ⚡`,
      },
    };
  }

  return {
    mood: 'normal',
    adaptiveDifficultyAdvice: 'medium',
    robotDialogue: {
      es: `¡Buen tiro lógico! Los sensores de ${robotName} registran un rendimiento cerebral óptimo.`,
      en: `Great logical strike! ${robotName}'s sensors register optimal brain performance.`,
    },
  };
}

// Dynamic AI Question Generation
app.post('/api/gemini/generate-questions', async (req, res) => {
  try {
    const { category = 'retro_games', difficulty = 'medium', language = 'es', count = 3 } = req.body;
    const ai = getAIClient();

    const now = Date.now();
    if (!ai || now < geminiCooldownUntil || now - lastGeminiRequestTime < GEMINI_MIN_INTERVAL_MS) {
      return res.json({
        success: false,
        source: 'fallback',
        message: 'Using optimized local database questions.',
      });
    }

    lastGeminiRequestTime = now;

    const prompt = `Genera exactamente ${count} preguntas de trivia para un videojuego retro de 8-bit estilo Preguntados.
Categoría: ${category}
Dificultad: ${difficulty}
Idioma principal: ${language} (debes incluir texto en español 'es' y en inglés 'en').
Cada pregunta debe tener 4 opciones bien diferenciadas, el índice de la respuesta correcta (0-3), y una breve explicación interesante.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              question: {
                type: Type.OBJECT,
                properties: {
                  es: { type: Type.STRING },
                  en: { type: Type.STRING },
                },
                required: ['es', 'en'],
              },
              options: {
                type: Type.OBJECT,
                properties: {
                  es: { type: Type.ARRAY, items: { type: Type.STRING } },
                  en: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['es', 'en'],
              },
              correctIndex: { type: Type.INTEGER },
              explanation: {
                type: Type.OBJECT,
                properties: {
                  es: { type: Type.STRING },
                  en: { type: Type.STRING },
                },
                required: ['es', 'en'],
              },
            },
            required: ['id', 'category', 'difficulty', 'question', 'options', 'correctIndex', 'explanation'],
          },
        },
      },
    });

    const parsedQuestions = JSON.parse(response.text || '[]');
    return res.json({
      success: true,
      source: 'gemini',
      questions: parsedQuestions,
    });
  } catch (error: any) {
    const isRateLimit = error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('429') || error?.message?.includes('503');
    if (isRateLimit) {
      geminiCooldownUntil = Date.now() + 60000; // 60s cooldown
    }
    return res.json({
      success: false,
      source: 'fallback',
      message: 'Seamlessly switched to local question database.',
    });
  }
});

// Dynamic AI Sentiment & Banter Analyzer
app.post('/api/gemini/analyze-sentiment', async (req, res) => {
  const { streak = 0, lastResult = 'correct', responseTimeMs = 3000, userMessage = '', robotName = 'PREGUNTRON-3000' } = req.body;
  const now = Date.now();

  // If in cooldown or called too quickly, immediately return smart procedural dialogue
  if (now < geminiCooldownUntil || now - lastGeminiRequestTime < GEMINI_MIN_INTERVAL_MS) {
    return res.json({
      success: true,
      source: 'procedural',
      sentiment: getProceduralSentiment(streak, lastResult, responseTimeMs, robotName),
    });
  }

  try {
    const ai = getAIClient();
    if (!ai) {
      return res.json({
        success: true,
        source: 'local',
        sentiment: getProceduralSentiment(streak, lastResult, responseTimeMs, robotName),
      });
    }

    lastGeminiRequestTime = now;

    const prompt = `Analiza el estado emocional y rendimiento del jugador en el juego de trivia 8-bit.
Parámetros:
- Robot rival/anfitrión: ${robotName}
- Racha actual: ${streak} preguntas correctas
- Último resultado: ${lastResult}
- Tiempo de respuesta: ${responseTimeMs} ms
- Mensaje del usuario (si hay): "${userMessage}"

Determina:
1. "mood": uno de ['excited', 'confident', 'frustrated', 'focused', 'triumphant', 'neutral']
2. "adaptiveDifficultyAdvice": 'easy' | 'medium' | 'hard' | 'expert'
3. "robotDialogue": frase cómica y temática de robot 8-bit (en español e inglés) para animar o provocar con simpatía al jugador.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mood: { type: Type.STRING },
            adaptiveDifficultyAdvice: { type: Type.STRING },
            robotDialogue: {
              type: Type.OBJECT,
              properties: {
                es: { type: Type.STRING },
                en: { type: Type.STRING },
              },
              required: ['es', 'en'],
            },
          },
          required: ['mood', 'adaptiveDifficultyAdvice', 'robotDialogue'],
        },
      },
    });

    const parsedSentiment = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini',
      sentiment: parsedSentiment,
    });
  } catch (error: any) {
    const isRateLimit = error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('429') || error?.message?.includes('503');
    if (isRateLimit) {
      geminiCooldownUntil = Date.now() + 60000; // 60s cooldown
    }

    return res.json({
      success: true,
      source: 'fallback_procedural',
      sentiment: getProceduralSentiment(streak, lastResult, responseTimeMs, robotName),
    });
  }
});

// Leaderboard API endpoint
app.get('/api/leaderboard', (req, res) => {
  const globalLeaderboard = [
    {
      rank: 1,
      userId: 'bot_champ_01',
      username: 'QuantumMaster_99',
      avatar: {
        chassis: 'empress',
        primaryColor: '#e11d48',
        accentColor: '#facc15',
        eyesStyle: 'anime',
        capeId: 'cape_dragon_gold',
        visorGlow: true,
        accessoryId: 'crown',
        auraId: 'lightning',
      },
      crowns: 142,
      points: 18940,
      country: 'ES',
      tier: 'master',
    },
    {
      rank: 2,
      userId: 'bot_champ_02',
      username: 'PixelNinja84',
      avatar: {
        chassis: 'retro_crt',
        primaryColor: '#22c55e',
        accentColor: '#38bdf8',
        eyesStyle: 'laser',
        capeId: 'cape_cyber_neon',
        visorGlow: true,
        accessoryId: 'headphones',
        auraId: 'matrix',
      },
      crowns: 118,
      points: 15420,
      country: 'MX',
      tier: 'master',
    },
    {
      rank: 3,
      userId: 'bot_champ_03',
      username: 'CyberValkyrie',
      avatar: {
        chassis: 'quantum',
        primaryColor: '#a855f7',
        accentColor: '#ec4899',
        eyesStyle: 'visor',
        capeId: 'cape_cosmic_fire',
        visorGlow: true,
        accessoryId: 'cyber_horns',
        auraId: 'fire',
      },
      crowns: 96,
      points: 12890,
      country: 'AR',
      tier: 'diamond',
    },
    {
      rank: 4,
      userId: 'bot_champ_04',
      username: 'ChiptuneWizard',
      avatar: {
        chassis: 'classic',
        primaryColor: '#f59e0b',
        accentColor: '#ef4444',
        eyesStyle: 'cross',
        capeId: 'cape_hero_red',
        visorGlow: false,
        accessoryId: 'antenna',
        auraId: 'sparkles',
      },
      crowns: 84,
      points: 10450,
      country: 'CO',
      tier: 'diamond',
    },
    {
      rank: 5,
      userId: 'bot_champ_05',
      username: 'RoboScholar',
      avatar: {
        chassis: 'rover',
        primaryColor: '#06b6d4',
        accentColor: '#10b981',
        eyesStyle: 'dots',
        capeId: 'none',
        visorGlow: true,
        accessoryId: 'antenna',
        auraId: 'none',
      },
      crowns: 67,
      points: 8200,
      country: 'CL',
      tier: 'gold',
    },
  ];

  res.json({ leaderboard: globalLeaderboard });
});

// Vite Middleware or Static Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoboTrivia 8-Bit Server running on http://localhost:${PORT}`);
  });
}

startServer();
