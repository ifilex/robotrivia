import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChatMessage, TriviaQuestion, UserProfile } from '../types';
import { CATEGORIES, CATEGORY_KEYS } from '../data/categories';
import { PixelRobot } from './PixelRobot';
import { triviaRepo } from '../data/triviaDatabase';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { Users, Send, MessageSquare, Clock, Trophy, Sparkles, Shield } from 'lucide-react';

interface MultiplayerArenaProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onMatchComplete: (updatedProfile: UserProfile) => void;
  onBack: () => void;
}

interface RemoteOpponent {
  id: string;
  name: string;
  avatar: any;
  country: string;
  score: number;
}

export const MultiplayerArena: React.FC<MultiplayerArenaProps> = ({
  userProfile,
  language,
  onMatchComplete,
  onBack,
}) => {
  const [matchState, setMatchState] = useState<'lobby' | 'searching' | 'playing' | 'ended'>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [opponent, setOpponent] = useState<RemoteOpponent | null>(null);

  // Match round state
  const [round, setRound] = useState(1);
  const totalRounds = 4;
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [opponentAnswered, setOpponentAnswered] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [timer, setTimer] = useState(12);

  // In-Game Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputChat, setInputChat] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPhrases = [
    '¡Buena jugada!',
    '¡GG WP! 🕹️',
    '¡Esa estaba difícil!',
    '¡Combo 8-Bit activado!',
    '¡Prepárate para la revancha!',
  ];

  const startMatchmaking = () => {
    sound.playSelect();
    setMatchState('searching');

    // Simulate matchmaking search
    setTimeout(() => {
      const simulatedOpponent: RemoteOpponent = {
        id: 'rival_' + Math.floor(Math.random() * 9999),
        name: ['CyberGamer_88', 'RetroPixel_X', 'BitChallenger', 'ArcadeQueen'][Math.floor(Math.random() * 4)],
        avatar: {
          chassis: 'retro_crt',
          primaryColor: '#ec4899',
          accentColor: '#facc15',
          eyesStyle: 'cross',
          capeId: 'cape_cyber_neon',
          visorGlow: true,
          accessoryId: 'headphones',
          auraId: 'matrix',
        },
        country: 'MX',
        score: 0,
      };

      setOpponent(simulatedOpponent);
      setMatchState('playing');
      sound.playVictory();

      setChatMessages([
        {
          id: '1',
          senderId: 'sys',
          senderName: 'SERVIDOR',
          senderAvatar: userProfile.avatar,
          text: language === 'es' ? '¡Partida multijugador iniciada! 4 rondas de trivia.' : 'Multiplayer match started! 4 rounds of trivia.',
          timestamp: 'Ahora',
          isSystem: true,
        },
        {
          id: '2',
          senderId: simulatedOpponent.id,
          senderName: simulatedOpponent.name,
          senderAvatar: simulatedOpponent.avatar,
          text: language === 'es' ? '¡Hola! ¡Que gane el mejor robot!' : 'Hello! May the best robot win!',
          timestamp: 'Ahora',
        },
      ]);

      loadRoundQuestion();
    }, 2200);
  };

  const loadRoundQuestion = () => {
    const randomCat = CATEGORY_KEYS[Math.floor(Math.random() * CATEGORY_KEYS.length)];
    const q = triviaRepo.getQuestionForCategory(randomCat, 'medium');
    setCurrentQuestion(q);
    setSelectedOption(null);
    setOpponentAnswered(false);
    setIsAnswerRevealed(false);
    setTimer(12);

    // Simulate opponent answering after 3 to 7 seconds
    const opponentDelay = 3000 + Math.random() * 4000;
    setTimeout(() => {
      setOpponentAnswered(true);
      const isOpponentCorrect = Math.random() > 0.35; // 65% accuracy
      if (isOpponentCorrect) {
        setOpponentScore(s => s + 1);
      }
    }, opponentDelay);
  };

  // Timer Tick
  useEffect(() => {
    if (matchState !== 'playing' || isAnswerRevealed) return;
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          handleAnswerSelect(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [matchState, isAnswerRevealed]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswerRevealed || !currentQuestion) return;
    setIsAnswerRevealed(true);
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
      setPlayerScore(s => s + 1);
    } else {
      sound.playIncorrect();
    }

    setTimeout(() => {
      if (round < totalRounds) {
        setRound(r => r + 1);
        loadRoundQuestion();
      } else {
        finishMultiplayerMatch();
      }
    }, 2800);
  };

  const finishMultiplayerMatch = () => {
    setMatchState('ended');
    const won = playerScore > opponentScore;
    if (won) {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 60 });
    } else {
      sound.playIncorrect();
    }

    const coinsEarned = won ? 180 : 60;
    const xpEarned = won ? 250 : 90;
    const gemsEarned = won ? 3 : 0;

    const updated = storage.recordMatchResult(
      won,
      playerScore,
      totalRounds - playerScore,
      [],
      {} as any,
      coinsEarned,
      xpEarned,
      gemsEarned
    );

    onMatchComplete(updated);
  };

  const sendChatMessage = (textToSend?: string) => {
    const msg = textToSend || inputChat.trim();
    if (!msg) return;
    sound.playClick();

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      senderId: userProfile.id,
      senderName: userProfile.username,
      senderAvatar: userProfile.avatar,
      text: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputChat('');

    // Simulate opponent quick reply occasionally
    if (opponent && Math.random() > 0.4) {
      setTimeout(() => {
        const replyText = ['¡Buen tiro!', '¡Vaya!', '🎮🤖', '¡Cuidado con la próxima!', '¡Bien jugado!'][
          Math.floor(Math.random() * 5)
        ];
        setChatMessages(prev => [
          ...prev,
          {
            id: String(Date.now() + 1),
            senderId: opponent.id,
            senderName: opponent.name,
            senderAvatar: opponent.avatar,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1500);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="bg-slate-900 border-4 border-black p-4 text-center shadow-[0_6px_0_#000]">
        <div className="inline-block px-3 py-0.5 bg-blue-950 border border-blue-500 font-pixel text-[10px] text-blue-300 mb-1">
          MULTIJUGADOR EN TIEMPO REAL
        </div>
        <h2 className="text-xl sm:text-2xl font-pixel text-yellow-400 retro-glow-yellow mb-1">
          {language === 'es' ? 'ARENA DE DUELOS MULTIPLAYER' : 'MULTIPLAYER DUEL ARENA'}
        </h2>
        <p className="font-mono text-xs text-slate-300">
          {language === 'es'
            ? 'Compite contra jugadores de todo el mundo en duelos sincronizados con chat 8-bit en vivo.'
            : 'Compete against players worldwide in synchronized duels with live 8-bit chat.'}
        </p>
      </div>

      {matchState === 'lobby' && (
        <div className="bg-slate-900 border-4 border-black p-6 shadow-[0_8px_0_#000] flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-8 my-4">
            <PixelRobot config={userProfile.avatar} size="lg" />
            <div className="font-pixel text-2xl text-rose-500 animate-pulse">VS</div>
            <div className="w-28 h-28 border-4 border-dashed border-slate-700 bg-slate-950 flex flex-col items-center justify-center text-slate-600 font-pixel text-xs">
              <Users className="w-8 h-8 mb-1" />
              <span>RIVAL</span>
            </div>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3">
            <button
              id="btn-quick-match"
              onClick={startMatchmaking}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black font-pixel text-sm pixel-btn-primary"
            >
              ⚡ {language === 'es' ? 'BUSCAR RIVAL EN LÍNEA' : 'FIND OPPONENT ONLINE'}
            </button>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Código de Sala (ej: 8BIT)"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="flex-1 px-3 py-2 bg-slate-950 border-2 border-black font-mono text-xs text-yellow-400 placeholder:text-slate-600"
              />
              <button
                onClick={startMatchmaking}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-black font-pixel text-xs pixel-btn"
              >
                {language === 'es' ? 'UNIRSE' : 'JOIN'}
              </button>
            </div>
          </div>

          <button
            onClick={onBack}
            className="text-xs font-mono text-slate-400 hover:text-white underline mt-2"
          >
            ← {language === 'es' ? 'Volver al Menú' : 'Back to Menu'}
          </button>
        </div>
      )}

      {matchState === 'searching' && (
        <div className="bg-slate-900 border-4 border-black p-10 text-center shadow-[0_8px_0_#000] flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <h3 className="font-pixel text-sm text-yellow-400 animate-pulse">
            {language === 'es' ? 'BUSCANDO OPONENTE CIBERNÉTICO...' : 'MATCHMAKING CYBER RIVAL...'}
          </h3>
          <p className="font-mono text-xs text-slate-400">
            {language === 'es' ? 'Sincronizando servidores de trivia mundial...' : 'Synchronizing global trivia servers...'}
          </p>
        </div>
      )}

      {(matchState === 'playing' || matchState === 'ended') && opponent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Question & Duel Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {/* Score Header */}
            <div className="bg-slate-900 border-4 border-black p-3 flex items-center justify-between shadow-[0_4px_0_#000]">
              <div className="flex items-center gap-2">
                <PixelRobot config={userProfile.avatar} size="sm" />
                <div>
                  <span className="font-pixel text-xs text-yellow-400">{userProfile.username}</span>
                  <div className="font-pixel text-sm text-emerald-400">{playerScore} pts</div>
                </div>
              </div>

              <div className="text-center font-pixel text-xs">
                <span className="text-slate-400 block text-[10px]">RONDA</span>
                <span className="text-yellow-400">{round} / {totalRounds}</span>
              </div>

              <div className="flex items-center gap-2 flex-row-reverse text-right">
                <PixelRobot config={opponent.avatar} size="sm" />
                <div>
                  <span className="font-pixel text-xs text-cyan-400">{opponent.name}</span>
                  <div className="font-pixel text-sm text-emerald-400">{opponentScore} pts</div>
                </div>
              </div>
            </div>

            {matchState === 'playing' && currentQuestion && (
              <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000]">
                {/* Timer Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <div className="w-full bg-slate-950 h-2.5 border border-slate-700 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full transition-all duration-1000"
                      style={{ width: `${(timer / 12) * 100}%` }}
                    />
                  </div>
                  <span className="font-pixel text-[10px] text-yellow-400">{timer}s</span>
                </div>

                <div className="mb-2">
                  <span className="px-2 py-0.5 font-pixel text-[9px] bg-slate-800 border border-black text-yellow-400">
                    {CATEGORIES[currentQuestion.category].name[language]}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-100 mb-4">
                  {currentQuestion.question[language]}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQuestion.options[language].map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;

                    let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
                    if (isAnswerRevealed) {
                      if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                      else if (isSelected && !isCorrect) btnStyle = 'bg-rose-600 text-white border-rose-400';
                      else btnStyle = 'bg-slate-900 text-slate-500 opacity-50';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerRevealed}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`p-2.5 sm:p-3 min-h-[44px] border-2 border-black font-mono text-xs sm:text-sm text-left pixel-btn transition-colors flex items-center ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {opponentAnswered && (
                  <div className="mt-3 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 animate-pulse">
                    <span>⚡ {opponent.name} ya ha respondido.</span>
                  </div>
                )}
              </div>
            )}

            {matchState === 'ended' && (
              <div className="bg-slate-900 border-4 border-black p-6 text-center shadow-[0_6px_0_#000]">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-pixel text-lg text-yellow-400 mb-1">
                  {playerScore > opponentScore ? '¡VICTORIA MULTIJUGADOR!' : playerScore === opponentScore ? '¡EMPATE ÉPICO!' : '¡DERROTA EN LA ARENA!'}
                </h3>
                <p className="font-mono text-xs text-slate-300 mb-4">
                  Marcador Final: {playerScore} - {opponentScore}
                </p>
                <button
                  onClick={() => setMatchState('lobby')}
                  className="px-5 py-2.5 bg-yellow-400 text-black font-pixel text-xs border-2 border-black pixel-btn-primary"
                >
                  JUGAR OTRA PARTIDA
                </button>
              </div>
            )}
          </div>

          {/* Integrated 8-Bit Live Chat Column */}
          <div className="bg-slate-900 border-4 border-black p-3 shadow-[0_4px_0_#000] flex flex-col h-96">
            <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2 mb-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span className="font-pixel text-[10px] text-cyan-400">CHAT RETRO EN VIVO</span>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto space-y-2 p-1 text-xs font-mono">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2 border border-black ${
                    msg.isSystem
                      ? 'bg-indigo-950/70 text-indigo-300'
                      : msg.senderId === userProfile.id
                      ? 'bg-slate-800 text-yellow-200 ml-4'
                      : 'bg-slate-950 text-slate-200 mr-4'
                  }`}
                >
                  <div className="flex justify-between text-[9px] text-slate-400 mb-0.5 font-pixel">
                    <span>{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Canned Phrases */}
            <div className="flex gap-1 overflow-x-auto py-1 mb-2">
              {quickPhrases.map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => sendChatMessage(phrase)}
                  className="px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 whitespace-nowrap"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex gap-1.5 pt-1 border-t border-slate-800">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={inputChat}
                onChange={e => setInputChat(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
                className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-black text-xs font-mono text-slate-100 placeholder:text-slate-600"
              />
              <button
                onClick={() => sendChatMessage()}
                className="px-3 bg-yellow-400 hover:bg-yellow-300 text-black border border-black text-xs font-pixel flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
