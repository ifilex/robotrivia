import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CategoryId, Difficulty, RobotRival, TriviaQuestion, UserProfile } from '../types';
import { CATEGORIES } from '../data/categories';
import { PixelRobot } from './PixelRobot';
import { RetroCanvasArena, ArenaAction } from './RetroCanvasArena';
import { CartoonCategoryMascot } from './CartoonCategoryMascot';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { apiService } from '../services/api';
import { triviaRepo } from '../data/triviaDatabase';
import { Sparkles, Zap, Clock, Shuffle, HelpCircle, Trophy, ArrowRight, RotateCcw, Swords, Heart } from 'lucide-react';

interface DuelViewProps {
  rival: RobotRival;
  category: CategoryId;
  userProfile: UserProfile;
  language: 'es' | 'en';
  isCrownMatch?: boolean;
  onFinishMatch: (updatedProfile: UserProfile) => void;
  onBackToMenu: () => void;
  onSpinAgain: () => void;
}

export const DuelView: React.FC<DuelViewProps> = ({
  rival,
  category,
  userProfile,
  language,
  isCrownMatch = false,
  onFinishMatch,
  onBackToMenu,
  onSpinAgain,
}) => {
  // Match configuration: First to 3 points (or 4 in boss battles)
  const winningPoints = rival.difficultyLevel === 'expert' ? 4 : 3;
  const [playerScore, setPlayerScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [round, setRound] = useState(1);

  // Canvas Arena Action Trigger
  const [arenaAction, setArenaAction] = useState<ArenaAction | null>(null);

  // Question & State
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Stats for match summary & cognitive report
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const questionStartTime = useRef<number>(Date.now());
  const [categoryCounts, setCategoryCounts] = useState<Record<CategoryId, { correct: number; total: number }>>({
    science_tech: { correct: 0, total: 0 },
    history: { correct: 0, total: 0 },
    entertainment: { correct: 0, total: 0 },
    geography: { correct: 0, total: 0 },
    sports: { correct: 0, total: 0 },
    art_lit: { correct: 0, total: 0 },
    retro_games: { correct: 0, total: 0 },
    anime_pop: { correct: 0, total: 0 },
  });

  // Lifelines
  const [lifelines, setLifelines] = useState({
    fiftyFifty: 1,
    extraTime: 1,
    swapQuestion: 1,
    clue: 1,
  });

  // Robot Dialogue & Banter State
  const [robotBanter, setRobotBanter] = useState<string>('');
  const [robotMood, setRobotMood] = useState<'normal' | 'happy' | 'thinking' | 'shocked' | 'smug'>('normal');

  // Match Over State
  const [matchEnded, setMatchEnded] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [rewards, setRewards] = useState({ coins: 0, xp: 0, gems: 0 });

  // Load initial question and start dialogue
  useEffect(() => {
    loadNewQuestion();
    const greetings = rival.catchphrases.greeting[language];
    const initialBanter = greetings[Math.floor(Math.random() * greetings.length)];
    setRobotBanter(initialBanter);
  }, [category]);

  const loadNewQuestion = () => {
    const q = triviaRepo.getQuestionForCategory(category, rival.difficultyLevel);
    setCurrentQuestion(q);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setDisabledOptions([]);
    setTimer(15);
    setIsTimerRunning(true);
    questionStartTime.current = Date.now();
  };

  // Timer Tick Interval
  useEffect(() => {
    if (!isTimerRunning || matchEnded || isAnswerRevealed) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4) {
          sound.playCountdownTick(prev === 1);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isAnswerRevealed, matchEnded]);

  const handleTimeOut = () => {
    if (isAnswerRevealed) return;
    handleAnswerSelect(-1); // Time out counts as wrong answer
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswerRevealed || !currentQuestion) return;

    setIsAnswerRevealed(true);
    setIsTimerRunning(false);
    setSelectedOption(optionIndex);

    const timeSpentMs = Date.now() - questionStartTime.current;
    setResponseTimes(prev => [...prev, timeSpentMs]);

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    // Track category counts
    setCategoryCounts(prev => ({
      ...prev,
      [currentQuestion.category]: {
        correct: prev[currentQuestion.category].correct + (isCorrect ? 1 : 0),
        total: prev[currentQuestion.category].total + 1,
      },
    }));

    if (isCorrect) {
      sound.playCorrect();
      setPlayerScore(p => p + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setRobotMood('shocked');

      // Trigger Canvas Battle Attack
      setArenaAction({
        type: 'player_attack',
        timestamp: Date.now(),
      });

      setTimeout(() => {
        setArenaAction({
          type: 'rival_hit',
          value: newStreak >= 3 ? 200 : 100,
          timestamp: Date.now(),
        });
        if (newStreak >= 3) {
          setTimeout(() => {
            setArenaAction({
              type: 'combo',
              value: newStreak,
              timestamp: Date.now(),
            });
          }, 400);
        }
      }, 350);

      // Check rival catchphrase on wrong / taunt
      const wrongPhrases = rival.catchphrases.wrong[language];
      setRobotBanter(wrongPhrases[Math.floor(Math.random() * wrongPhrases.length)]);
    } else {
      sound.playIncorrect();
      setStreak(0);
      setRobotMood('smug');

      // Rival counter-attacks
      const rivalScores = Math.random() <= rival.accuracyRate;
      if (rivalScores) {
        setRivalScore(r => r + 1);
      }

      setArenaAction({
        type: 'rival_attack',
        timestamp: Date.now(),
      });

      setTimeout(() => {
        setArenaAction({
          type: 'player_hit',
          timestamp: Date.now(),
        });
      }, 350);

      const tauntPhrases = rival.catchphrases.taunt[language];
      setRobotBanter(tauntPhrases[Math.floor(Math.random() * tauntPhrases.length)]);
    }

    // Call Sentiment Banter API in background for dynamic responses
    apiService.analyzeSentiment(
      isCorrect ? streak + 1 : 0,
      isCorrect ? 'correct' : 'wrong',
      timeSpentMs,
      '',
      rival.name
    ).then(res => {
      if (res && res.robotDialogue) {
        setRobotBanter(res.robotDialogue[language]);
      }
    });

    // Check if match won/lost
    setTimeout(() => {
      const nextPlayerScore = playerScore + (isCorrect ? 1 : 0);
      const nextRivalScore = rivalScore + (!isCorrect && Math.random() <= rival.accuracyRate ? 1 : 0);

      if (nextPlayerScore >= winningPoints) {
        setArenaAction({ type: 'victory', timestamp: Date.now() });
        finishDuel(true);
      } else if (nextRivalScore >= winningPoints) {
        setArenaAction({ type: 'defeat', timestamp: Date.now() });
        finishDuel(false);
      } else {
        setRound(r => r + 1);
        loadNewQuestion();
        setRobotMood('normal');
      }
    }, 2800);
  };

  const finishDuel = (won: boolean) => {
    setMatchEnded(true);
    setPlayerWon(won);

    let earnedCoins = won ? rival.rewardCoins : Math.round(rival.rewardCoins * 0.3);
    let earnedXp = won ? rival.rewardXp : Math.round(rival.rewardXp * 0.3);
    let earnedGems = won ? (isCrownMatch ? 5 : 2) : 0;

    if (won) {
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#38bdf8', '#ef4444', '#22c55e', '#a855f7'],
      });
      const defeatPhrases = rival.catchphrases.defeat[language];
      setRobotBanter(defeatPhrases[Math.floor(Math.random() * defeatPhrases.length)]);
    } else {
      sound.playIncorrect();
      const taunts = rival.catchphrases.taunt[language];
      setRobotBanter(taunts[Math.floor(Math.random() * taunts.length)]);
    }

    setRewards({ coins: earnedCoins, xp: earnedXp, gems: earnedGems });

    const correctCount = playerScore + (won ? 1 : 0);
    const wrongCount = round - correctCount;

    const updated = storage.recordMatchResult(
      won,
      correctCount,
      wrongCount,
      responseTimes,
      categoryCounts,
      earnedCoins,
      earnedXp,
      earnedGems,
      rival.id
    );

    onFinishMatch(updated);
  };

  // --- Lifelines Actions ---
  const useFiftyFifty = () => {
    if (lifelines.fiftyFifty <= 0 || isAnswerRevealed || !currentQuestion) return;
    sound.playLaser();
    setLifelines(l => ({ ...l, fiftyFifty: l.fiftyFifty - 1 }));

    const wrongIndexes = [0, 1, 2, 3].filter(idx => idx !== currentQuestion.correctIndex);
    const toDisable = wrongIndexes.sort(() => 0.5 - Math.random()).slice(0, 2);
    setDisabledOptions(toDisable);
  };

  const useExtraTime = () => {
    if (lifelines.extraTime <= 0 || isAnswerRevealed) return;
    sound.playSelect();
    setLifelines(l => ({ ...l, extraTime: l.extraTime - 1 }));
    setTimer(t => t + 10);
  };

  const useSwapQuestion = () => {
    if (lifelines.swapQuestion <= 0 || isAnswerRevealed) return;
    sound.playLaser();
    setLifelines(l => ({ ...l, swapQuestion: l.swapQuestion - 1 }));
    loadNewQuestion();
  };

  const useRobotClue = () => {
    if (lifelines.clue <= 0 || isAnswerRevealed || !currentQuestion) return;
    sound.playSelect();
    setLifelines(l => ({ ...l, clue: l.clue - 1 }));
    setRobotBanter(
      language === 'es'
        ? `[PISTA 8-BIT]: Mis algoritmos calculan que "${currentQuestion.options[language][currentQuestion.correctIndex]}" tiene 99% de compatibilidad.`
        : `[8-BIT CLUE]: My algorithms calculate "${currentQuestion.options[language][currentQuestion.correctIndex]}" has 99% logic compatibility.`
    );
  };

  const currentCatInfo = CATEGORIES[category];

  return (
    <div className="flex flex-col justify-between h-full max-h-full w-full max-w-4xl mx-auto px-2 py-1 select-none overflow-hidden gap-1 sm:gap-2">
      {/* 8-Bit Canvas Battle Arena */}
      <div className="w-full shrink-0">
        <RetroCanvasArena
          playerAvatar={userProfile.avatar}
          rival={rival}
          playerScore={playerScore}
          rivalScore={rivalScore}
          winningScore={winningPoints}
          lastAction={arenaAction}
          roundTimer={timer}
          theme="cyber_city"
        />
      </div>

      {/* Robot Banter Speech Bubble */}
      <div className="relative bg-slate-950/90 border-2 border-cyan-500/80 px-2.5 py-1.5 shadow-[0_2px_0_#000] flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-2 h-2 bg-cyan-400 animate-ping shrink-0" />
          <p className="font-mono text-xs text-cyan-200 truncate">
            <strong className="text-cyan-400 font-pixel text-[9px] mr-1">{rival.name}:</strong>
            "{robotBanter}"
          </p>
        </div>
        <span className="font-pixel text-[8px] text-yellow-400/80 shrink-0">
          RND {round}
        </span>
      </div>

      {/* Main Duel Content Area */}
      {!matchEnded ? (
        <div className="flex-1 flex flex-col justify-between min-h-0 gap-1 sm:gap-2">
          {/* Question & Mascot Banner */}
          <div className="bg-slate-900 border-3 border-black p-2.5 sm:p-3 shadow-[0_4px_0_#000] flex flex-col justify-between relative overflow-hidden">
            {/* Header: Timer & Category Mascot */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 flex-1 max-w-[200px] sm:max-w-xs">
                <Clock className={`w-3.5 h-3.5 shrink-0 ${timer <= 4 ? 'text-rose-500 animate-bounce' : 'text-yellow-400'}`} />
                <div className="w-full bg-slate-950 h-2.5 border border-slate-700 overflow-hidden relative">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      timer <= 4 ? 'bg-rose-600 animate-pulse' : timer <= 8 ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(timer / 15) * 100}%` }}
                  />
                </div>
                <span className="font-pixel text-[9px] text-yellow-400 w-6 text-right shrink-0">{timer}s</span>
              </div>

              {/* Category Pill with mini mascot */}
              <div
                className="flex items-center gap-1.5 px-2 py-0.5 border border-black text-white text-[9px] font-pixel shrink-0 shadow-[0_2px_0_#000]"
                style={{ backgroundColor: currentCatInfo.color }}
              >
                <div className="w-4 h-4">
                  <CartoonCategoryMascot category={category} size="xs" animated={false} />
                </div>
                <span>{currentCatInfo.name[language]}</span>
              </div>
            </div>

            {/* Question Text */}
            {currentQuestion && (
              <div className="flex items-start gap-2">
                <div className="hidden sm:block shrink-0">
                  <CartoonCategoryMascot
                    category={category}
                    size="sm"
                    mood={
                      isAnswerRevealed
                        ? selectedOption === currentQuestion.correctIndex
                          ? 'happy'
                          : 'shocked'
                        : timer <= 4
                        ? 'shocked'
                        : 'idle'
                    }
                    animated={true}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-100 leading-snug">
                    {currentQuestion.question[language]}
                  </h3>
                  {isAnswerRevealed && (
                    <div className="mt-1 text-[11px] font-mono text-yellow-300 bg-black/40 px-2 py-0.5 border-l-2 border-yellow-400">
                      💡 {currentQuestion.explanation[language]}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Options Grid (4 Tactile Arcade Buttons) */}
          {currentQuestion && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {currentQuestion.options[language].map((opt, idx) => {
                const letters = ['A', 'B', 'C', 'D'];
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const isDisabled = disabledOptions.includes(idx);

                let btnStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-black';
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-black font-bold animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-600 text-white border-black shadow-[0_0_12px_rgba(239,68,68,0.8)]';
                  } else {
                    btnStyle = 'bg-slate-950 text-slate-600 border-slate-900 opacity-40';
                  }
                } else if (isDisabled) {
                  btnStyle = 'bg-slate-950 text-slate-700 border-slate-900 line-through opacity-30 cursor-not-allowed';
                }

                return (
                  <button
                    key={idx}
                    id={`btn-option-${idx}`}
                    disabled={isAnswerRevealed || isDisabled}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`p-2 sm:p-3 min-h-[44px] sm:min-h-[48px] border-2 flex items-center gap-2 text-left font-mono text-xs sm:text-sm pixel-btn transition-transform ${btnStyle}`}
                  >
                    <span className="font-pixel text-[9px] sm:text-[10px] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-black/50 border border-white/20 text-yellow-400 shrink-0">
                      {letters[idx]}
                    </span>
                    <span className="flex-1 font-medium leading-snug break-words">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom Lifelines Shelf */}
          <div className="bg-slate-950 border-2 border-black p-1.5 flex items-center justify-between gap-1 shadow-[0_2px_0_#000] shrink-0">
            <span className="font-pixel text-[8px] text-slate-400 hidden sm:inline px-1">
              {language === 'es' ? 'COMODINES:' : 'POWER-UPS:'}
            </span>

            <div className="grid grid-cols-4 gap-1 flex-1">
              <button
                id="btn-lifeline-5050"
                onClick={useFiftyFifty}
                disabled={lifelines.fiftyFifty <= 0 || isAnswerRevealed}
                className="flex items-center justify-center gap-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-black font-pixel text-[8px] text-yellow-400 pixel-btn"
                title="Elimina 2 incorrectas"
              >
                <Zap className="w-3 h-3 text-yellow-400 shrink-0" />
                <span>50:50 ({lifelines.fiftyFifty})</span>
              </button>

              <button
                id="btn-lifeline-time"
                onClick={useExtraTime}
                disabled={lifelines.extraTime <= 0 || isAnswerRevealed}
                className="flex items-center justify-center gap-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-black font-pixel text-[8px] text-cyan-400 pixel-btn"
                title="+10s"
              >
                <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>+10s ({lifelines.extraTime})</span>
              </button>

              <button
                id="btn-lifeline-swap"
                onClick={useSwapQuestion}
                disabled={lifelines.swapQuestion <= 0 || isAnswerRevealed}
                className="flex items-center justify-center gap-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-black font-pixel text-[8px] text-purple-400 pixel-btn"
                title="Cambiar pregunta"
              >
                <Shuffle className="w-3 h-3 text-purple-400 shrink-0" />
                <span>Cambio ({lifelines.swapQuestion})</span>
              </button>

              <button
                id="btn-lifeline-clue"
                onClick={useRobotClue}
                disabled={lifelines.clue <= 0 || isAnswerRevealed}
                className="flex items-center justify-center gap-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-black font-pixel text-[8px] text-emerald-400 pixel-btn"
                title="Pista Robot"
              >
                <HelpCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Pista ({lifelines.clue})</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Match Finished Summary Screen */
        <div className="flex-1 bg-slate-900 border-4 border-black p-4 sm:p-6 text-center shadow-[0_8px_0_#000] flex flex-col items-center justify-center min-h-0">
          <div className="mb-2">
            {playerWon ? (
              <div className="flex flex-col items-center">
                <Trophy className="w-12 h-12 text-yellow-400 animate-bounce mb-1" />
                <h2 className="font-pixel text-base sm:text-xl text-yellow-400 retro-glow-yellow mb-1">
                  {language === 'es' ? '¡VICTORIA RETRO 8-BIT!' : '8-BIT RETRO VICTORY!'}
                </h2>
                <p className="font-mono text-xs text-slate-300">
                  {language === 'es'
                    ? `Has vencido a ${rival.name} en la arena cibernética.`
                    : `You defeated ${rival.name} in the cyber arena.`}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-1">💥</div>
                <h2 className="font-pixel text-base sm:text-xl text-rose-500 retro-glow-purple mb-1">
                  {language === 'es' ? '¡GAME OVER!' : 'GAME OVER!'}
                </h2>
                <p className="font-mono text-xs text-slate-300">
                  {language === 'es'
                    ? `${rival.name} dominó los circuitos de esta partida.`
                    : `${rival.name} dominated the circuits this match.`}
                </p>
              </div>
            )}
          </div>

          {/* Rewards Pill */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm my-2">
            <div className="bg-slate-950 border-2 border-black p-1.5">
              <span className="text-[9px] font-mono text-slate-400 block">Monedas</span>
              <span className="font-pixel text-xs text-yellow-400">+{rewards.coins} 🪙</span>
            </div>
            <div className="bg-slate-950 border-2 border-black p-1.5">
              <span className="text-[9px] font-mono text-slate-400 block">Experiencia</span>
              <span className="font-pixel text-xs text-cyan-400">+{rewards.xp} XP</span>
            </div>
            <div className="bg-slate-950 border-2 border-black p-1.5">
              <span className="text-[9px] font-mono text-slate-400 block">Gemas</span>
              <span className="font-pixel text-xs text-purple-400">+{rewards.gems} 💎</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              id="btn-spin-again"
              onClick={onSpinAgain}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-pixel text-xs arcade-btn-play"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'es' ? 'GIRAR RULETA' : 'SPIN AGAIN'}</span>
            </button>

            <button
              id="btn-back-menu"
              onClick={onBackToMenu}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-2 border-black font-pixel text-xs pixel-btn"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{language === 'es' ? 'LOBBY' : 'LOBBY'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

