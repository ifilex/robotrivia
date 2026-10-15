import React, { useState, useEffect } from 'react';
import { ROBOT_HOST, ROBOT_RIVALS } from './data/robots';
import { CATEGORIES, CATEGORY_KEYS } from './data/categories';
import { CategoryId, RobotRival, UserProfile } from './types';
import { storage } from './services/storage';
import { sound } from './services/sound';
import { PixelRobot } from './components/PixelRobot';
import { CartoonCategoryMascot } from './components/CartoonCategoryMascot';
import { AudioController } from './components/AudioController';
import { RouletteSpinner } from './components/RouletteSpinner';
import { DuelView } from './components/DuelView';
import { TowerBossRush } from './components/TowerBossRush';
import { MultiplayerArena } from './components/MultiplayerArena';
import { AvatarShop } from './components/AvatarShop';
import { CognitiveReport } from './components/CognitiveReport';
import { LeaderboardView } from './components/LeaderboardView';
import { MonthlyEvents } from './components/MonthlyEvents';
import { SettingsModal } from './components/SettingsModal';
import { PushNotificationToast } from './components/PushNotificationToast';
import { 
  Play, 
  Swords, 
  Users, 
  Brain, 
  ShoppingBag, 
  Trophy, 
  Calendar, 
  Settings, 
  Sparkles, 
  Zap,
  Tv,
  Home,
  Gamepad2,
  Crown,
  TowerControl as TowerIcon,
  Flame
} from 'lucide-react';

type ActiveScreen = 
  | 'menu'
  | 'spinner'
  | 'duel'
  | 'tower'
  | 'multiplayer'
  | 'shop'
  | 'report'
  | 'leaderboard'
  | 'events';

export const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => storage.getUserProfile());
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('menu');
  const [crtFilter, setCrtFilter] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Active Duel Context
  const [currentRival, setCurrentRival] = useState<RobotRival>(ROBOT_RIVALS[0]);
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('retro_games');
  const [isCrownRound, setIsCrownRound] = useState(false);

  // Random fun dialogues from Willy & Host
  const dialoguePool = {
    es: [
      '¡Gira la ruleta y pon a prueba tus circuitos contra los mejores robots!',
      '¡Tito-Bot dice que domina la ciencia, ¿te atreves a desafiarlo?!',
      '¡Consigue las 8 coronas de temática para convertirte en el Máster de la Trivia!',
      '¡Visita el Taller para equipar a tu robot con capas 8-bit con física de tela!',
      '¡La Torre de Jefes tiene 5 robots esperando tu desafío lógico!'
    ],
    en: [
      'Spin the wheel and test your circuits against the smartest robots!',
      'Tito-Bot claims he rules science, do you dare challenge him?!',
      'Collect all 8 category crowns to become the ultimate Trivia Master!',
      'Visit the Workshop to customize your robot with real physics capes!',
      'The Boss Tower has 5 cyber bosses awaiting your logic challenge!'
    ]
  };

  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex(prev => (prev + 1) % dialoguePool[language].length);
    }, 6000);
    return () => clearInterval(interval);
  }, [language]);

  const handleStartSpinner = () => {
    sound.playSelect();
    setActiveScreen('spinner');
  };

  const handleCategorySelected = (category: CategoryId, isCrown: boolean) => {
    setCurrentCategory(category);
    setIsCrownRound(isCrown);
    const randomRival = ROBOT_RIVALS[Math.floor(Math.random() * Math.min(3, ROBOT_RIVALS.length))];
    setCurrentRival(randomRival);
    setActiveScreen('duel');
  };

  const handleSelectBoss = (boss: RobotRival) => {
    setCurrentRival(boss);
    setCurrentCategory(boss.specialtyCategory || 'retro_games');
    setIsCrownRound(true);
    setActiveScreen('duel');
  };

  const handleProfileUpdated = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  // Determine collected categories from user stats
  const categoryStats = userProfile?.stats?.categoryStats || ({} as Record<CategoryId, { correct: number; total: number }>);
  const collectedCategories: Record<CategoryId, boolean> = {
    science_tech: (categoryStats.science_tech?.correct || 0) >= 3,
    history: (categoryStats.history?.correct || 0) >= 3,
    entertainment: (categoryStats.entertainment?.correct || 0) >= 3,
    geography: (categoryStats.geography?.correct || 0) >= 3,
    sports: (categoryStats.sports?.correct || 0) >= 3,
    art_lit: (categoryStats.art_lit?.correct || 0) >= 3,
    retro_games: (categoryStats.retro_games?.correct || 0) >= 3,
    anime_pop: (categoryStats.anime_pop?.correct || 0) >= 3,
  };

  return (
    <div className={`h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col bg-slate-950 text-slate-100 selection:bg-yellow-400 selection:text-black font-sans relative ${crtFilter ? 'crt-scanlines' : ''}`}>
      {/* Push Notification Toast with 4s Auto-Dismiss & Reward Claim */}
      <PushNotificationToast 
        language={language}
        autoDismissMs={4000}
        onClaimReward={(coins, gems) => {
          setUserProfile(prev => {
            const updated = {
              ...prev,
              coins: prev.coins + coins,
              gems: prev.gems + gems,
            };
            storage.saveUserProfile(updated);
            return updated;
          });
        }}
      />

      {/* ========================================================================= */}
      {/* 1. TOP RETRO GAME HUD (Fixed at top, never scrolls) */}
      {/* ========================================================================= */}
      <header className="bg-slate-900 border-b-2 sm:border-b-3 border-black px-2 sm:px-4 py-1 sm:py-1.5 shadow-[0_3px_0_#000] z-40 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Logo / Brand */}
          <div 
            onClick={() => {
              sound.playClick();
              setActiveScreen('menu');
            }}
            className="flex items-center gap-1 sm:gap-2 cursor-pointer group select-none shrink-0"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 border border-black sm:border-2 flex items-center justify-center font-pixel text-black text-[10px] sm:text-xs font-bold group-hover:scale-105 transition-transform shrink-0">
              8B
            </div>
            <div>
              <h1 className="font-pixel text-[10px] sm:text-xs md:text-sm text-yellow-400 retro-glow-yellow leading-tight">
                ROBOTRIVIA
              </h1>
              <span className="font-pixel text-[5px] sm:text-[7px] text-cyan-400 block tracking-widest leading-none">
                8-BIT ARCADE
              </span>
            </div>
          </div>

          {/* Level & Currency Badges */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Player Level */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-950 border border-slate-700 px-1.5 sm:px-2 py-0.5 rounded">
              <span className="font-pixel text-[7px] sm:text-[8px] text-cyan-400">LV</span>
              <span className="font-pixel text-[8px] sm:text-[10px] text-yellow-400 font-bold">{userProfile.level}</span>
            </div>

            {/* Coins & Gems */}
            <div className="flex items-center gap-1 sm:gap-2 bg-slate-950 border border-black sm:border-2 px-1.5 sm:px-2 py-0.5 shadow-[0_2px_0_#000]">
              <div className="flex items-center gap-0.5 font-pixel text-[8px] sm:text-xs text-yellow-400" title="Monedas">
                <span>🪙</span>
                <span>{userProfile.coins}</span>
              </div>
              <div className="flex items-center gap-0.5 font-pixel text-[8px] sm:text-xs text-purple-400" title="Gemas">
                <span>💎</span>
                <span>{userProfile.gems}</span>
              </div>
              <div className="flex items-center gap-0.5 font-pixel text-[8px] sm:text-xs text-amber-300" title="Coronas">
                <span>👑</span>
                <span>{userProfile.stats.crowns}</span>
              </div>
            </div>

            {/* CRT Quick Filter Toggle */}
            <button
              id="btn-toggle-crt-quick"
              onClick={() => {
                sound.playClick();
                setCrtFilter(!crtFilter);
              }}
              className={`p-1 sm:p-1.5 border border-black pixel-btn transition-colors shrink-0 ${
                crtFilter ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
              title={crtFilter ? 'Filtro CRT Activo' : 'Activar Filtro CRT'}
            >
              <Tv className="w-3.5 h-3.5" />
            </button>

            {/* Audio Controller */}
            <AudioController />

            {/* Settings Modal Toggle */}
            <button
              id="btn-settings-open"
              onClick={() => {
                sound.playClick();
                setIsSettingsOpen(true);
              }}
              className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-black pixel-btn transition-colors shrink-0"
              title="Ajustes"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN GAME STAGE CONTAINER (100% viewport contained) */}
      {/* ========================================================================= */}
      <main className="flex-1 min-h-0 w-full overflow-hidden flex flex-col relative">
        {/* ===================================================================== */}
        {/* A. GAME LOBBY / DASHBOARD (Integrated Arcade Cabinet Stage) */}
        {/* ===================================================================== */}
        {activeScreen === 'menu' && (
          <div className="flex-1 flex flex-col justify-between h-full max-h-full w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 select-none overflow-y-auto custom-scrollbar gap-1.5 sm:gap-2">
            
            {/* Top Stage Area: Player Avatar Podium + Willy Cartoon Wheel Mascot */}
            <div className="relative bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 sm:border-3 border-black p-2 sm:p-3 shadow-[0_3px_0_#000] flex flex-col justify-between overflow-hidden shrink-0">
              {/* Background Sunburst Effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="w-[500px] h-[500px] bg-[conic-gradient(from_0deg,#fbbf24_0deg_30deg,transparent_30deg_60deg,#fbbf24_60deg_90deg,transparent_90deg_120deg,#fbbf24_120deg_150deg,transparent_150deg_180deg,#fbbf24_180deg_210deg,transparent_210deg_240deg,#fbbf24_240deg_270deg,transparent_270deg_300deg,#fbbf24_300deg_330deg,transparent_330deg_360deg)] animate-spin-slow" />
              </div>

              {/* Characters Row: Willy Mascot on Left, Speech Bubble Center, Player Robot on Right */}
              <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-3">
                {/* Willy Living Wheel Cartoon Mascot */}
                <div 
                  onClick={handleStartSpinner}
                  className="flex flex-col items-center cursor-pointer group transform hover:scale-105 active:scale-95 transition-transform shrink-0"
                >
                  <CartoonCategoryMascot
                    category="willy_wheel"
                    size="sm"
                    mood="happy"
                    animated={true}
                  />
                  <span className="font-pixel text-[7px] sm:text-[8px] text-yellow-400 mt-0.5 bg-black/70 px-1 py-0.5 border border-yellow-400/40 rounded shadow-[0_1px_0_#000]">
                    WILLY
                  </span>
                </div>

                {/* Animated Speech Bubble */}
                <div className="flex-1 min-w-0 bg-slate-950/95 border-2 border-yellow-400/90 p-1.5 sm:p-2.5 rounded-lg shadow-[0_2px_0_#000] relative">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="w-1.5 h-1.5 bg-yellow-400 animate-ping shrink-0" />
                    <span className="font-pixel text-[7px] sm:text-[8px] text-yellow-400">
                      {language === 'es' ? 'CONSEJO 8-BIT' : '8-BIT HINT'}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] sm:text-xs text-slate-200 leading-tight line-clamp-2 sm:line-clamp-3">
                    "{dialoguePool[language][dialogueIndex]}"
                  </p>
                </div>

                {/* Player Robot Avatar on Podium */}
                <div 
                  onClick={() => setActiveScreen('shop')}
                  className="flex flex-col items-center cursor-pointer group transform hover:scale-105 active:scale-95 transition-transform shrink-0"
                >
                  <PixelRobot config={userProfile.avatar} size="sm" />
                  <span className="font-pixel text-[7px] sm:text-[8px] text-cyan-400 mt-0.5 bg-black/70 px-1 py-0.5 border border-cyan-400/40 rounded shadow-[0_1px_0_#000] truncate max-w-[70px] text-center">
                    {userProfile.username}
                  </span>
                </div>
              </div>

              {/* 8-Category Cartoon Mascot Crown Shelf */}
              <div className="relative z-10 mt-1.5 pt-1.5 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-1 px-1">
                  <div className="flex items-center gap-1 text-yellow-400 font-pixel text-[7px] sm:text-[8px]">
                    <Crown className="w-3 h-3 shrink-0" />
                    <span>{language === 'es' ? 'CORONAS DE TEMÁTICA:' : 'CATEGORY CROWNS:'}</span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-slate-400">
                    {Object.values(collectedCategories).filter(Boolean).length}/8 {language === 'es' ? 'recolectadas' : 'collected'}
                  </span>
                </div>

                {/* Mascots Icons Row */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
                  {CATEGORY_KEYS.map(catKey => {
                    const hasCrown = collectedCategories[catKey];
                    return (
                      <div
                        key={catKey}
                        onClick={() => {
                          setCurrentCategory(catKey);
                          setIsCrownRound(false);
                          setActiveScreen('duel');
                        }}
                        className={`flex flex-col items-center justify-center p-0.5 rounded border transition-all cursor-pointer ${
                          hasCrown
                            ? 'bg-yellow-500/10 border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                            : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                        }`}
                        title={CATEGORIES[catKey].name[language]}
                      >
                        <CartoonCategoryMascot
                          category={catKey}
                          size="xs"
                          mood={hasCrown ? 'happy' : 'idle'}
                          showCrown={true}
                          hasCrownCollected={hasCrown}
                          animated={hasCrown}
                        />
                        <span className="text-[6px] font-pixel text-slate-300 truncate w-full text-center mt-0.5 leading-none">
                          {CATEGORIES[catKey].name[language].split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Massive Database & Anti-repetition Status Badge */}
            <div className="w-full flex items-center justify-center -my-0.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 rounded-full bg-slate-950/90 border border-emerald-500/40 text-[7px] sm:text-[9px] font-pixel text-emerald-300 shadow-[0_2px_0_#000]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="tracking-wide">
                  {language === 'es' ? '25,200+ PREGUNTAS (3,150+ POR SECCIÓN) • MODO ANTI-REPETICIÓN' : '25,200+ QUESTIONS (3,150+ PER CATEGORY) • ANTI-REPEAT ACTIVE'}
                </span>
              </div>
            </div>

            {/* Giant Juicy Animated PLAY Button */}
            <div className="w-full flex items-center justify-center my-0.5">
              <button
                id="btn-main-play-spinner"
                onClick={handleStartSpinner}
                className="w-full max-w-md py-2.5 sm:py-3.5 arcade-btn-play flex items-center justify-center gap-2 sm:gap-3 select-none group"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black animate-spin-slow" />
                <span className="font-pixel text-xs sm:text-base md:text-lg text-black font-extrabold tracking-wider">
                  {language === 'es' ? '¡GIRAR RULETA 8-BIT!' : 'SPIN 8-BIT WHEEL!'}
                </span>
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 4 Quick Game Modes (Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 w-full shrink-0">
              {/* 1. Boss Tower */}
              <button
                id="btn-lobby-tower"
                onClick={() => {
                  sound.playSelect();
                  setActiveScreen('tower');
                }}
                className="p-2 sm:p-2.5 arcade-btn-purple text-left flex items-center gap-2 select-none group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black/40 border border-white/20 flex items-center justify-center font-pixel text-sm sm:text-base shrink-0">
                  👑
                </div>
                <div className="min-w-0">
                  <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-white block truncate">
                    {language === 'es' ? 'TORRE JEFES' : 'BOSS TOWER'}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-purple-200 block truncate">
                    5 Robots 1v1
                  </span>
                </div>
              </button>

              {/* 2. Multiplayer Live PvP */}
              <button
                id="btn-lobby-multiplayer"
                onClick={() => {
                  sound.playSelect();
                  setActiveScreen('multiplayer');
                }}
                className="p-2 sm:p-2.5 arcade-btn-cyan text-left flex items-center gap-2 select-none group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black/40 border border-white/20 flex items-center justify-center font-pixel text-sm sm:text-base shrink-0">
                  ⚡
                </div>
                <div className="min-w-0">
                  <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-black block truncate font-bold">
                    {language === 'es' ? 'ONLINE PvP' : 'ONLINE PvP'}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-cyan-950 block truncate font-bold">
                    Chat en vivo
                  </span>
                </div>
              </button>

              {/* 3. Avatar & Cape Customizer */}
              <button
                id="btn-lobby-shop"
                onClick={() => {
                  sound.playSelect();
                  setActiveScreen('shop');
                }}
                className="p-2 sm:p-2.5 arcade-btn-rose text-left flex items-center gap-2 select-none group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black/40 border border-white/20 flex items-center justify-center font-pixel text-sm sm:text-base shrink-0">
                  🧣
                </div>
                <div className="min-w-0">
                  <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-white block truncate">
                    {language === 'es' ? 'TALLER CAPAS' : 'CAPE STUDIO'}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-rose-200 block truncate">
                    Física de tela
                  </span>
                </div>
              </button>

              {/* 4. Cognitive Brain Analytics */}
              <button
                id="btn-lobby-report"
                onClick={() => {
                  sound.playSelect();
                  setActiveScreen('report');
                }}
                className="p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-850 border-2 border-black text-left flex items-center gap-2 pixel-btn select-none group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-pixel text-sm sm:text-base shrink-0">
                  🧠
                </div>
                <div className="min-w-0">
                  <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] text-emerald-400 block truncate">
                    {language === 'es' ? 'CEREBRO' : 'NEURONAL'}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-slate-400 block truncate">
                    Estadísticas
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* B. SPINNER VIEW (Physics Wheel + Cartoon Willy) */}
        {/* ===================================================================== */}
        {activeScreen === 'spinner' && (
          <RouletteSpinner
            language={language}
            onCategorySelected={handleCategorySelected}
            onBack={() => setActiveScreen('menu')}
          />
        )}

        {/* ===================================================================== */}
        {/* C. DUEL VIEW (100% Contained Battle + Question) */}
        {/* ===================================================================== */}
        {activeScreen === 'duel' && (
          <DuelView
            rival={currentRival}
            category={currentCategory}
            userProfile={userProfile}
            language={language}
            isCrownMatch={isCrownRound}
            onFinishMatch={handleProfileUpdated}
            onBackToMenu={() => setActiveScreen('menu')}
            onSpinAgain={() => setActiveScreen('spinner')}
          />
        )}

        {/* ===================================================================== */}
        {/* D. SUB-SCREENS (Smooth internal scrolling without page displacement) */}
        {/* ===================================================================== */}
        {activeScreen === 'tower' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <TowerBossRush
              userProfile={userProfile}
              language={language}
              onSelectBoss={handleSelectBoss}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}

        {activeScreen === 'multiplayer' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <MultiplayerArena
              userProfile={userProfile}
              language={language}
              onMatchComplete={handleProfileUpdated}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}

        {activeScreen === 'shop' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <AvatarShop
              userProfile={userProfile}
              language={language}
              onUpdateProfile={handleProfileUpdated}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}

        {activeScreen === 'report' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <CognitiveReport
              userProfile={userProfile}
              language={language}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}

        {activeScreen === 'leaderboard' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <LeaderboardView
              userProfile={userProfile}
              language={language}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}

        {activeScreen === 'events' && (
          <div className="flex-1 min-h-0 overflow-y-auto px-2 py-1">
            <MonthlyEvents
              userProfile={userProfile}
              language={language}
              onUpdateProfile={handleProfileUpdated}
              onBack={() => setActiveScreen('menu')}
            />
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM ARCADE CONTROLLER NAVIGATION (Fixed at bottom for all screens) */}
      {/* ========================================================================= */}
      <nav className="bg-slate-900 border-t-2 sm:border-t-3 border-black px-1 sm:px-2 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-[0_-3px_0_#000] z-40 shrink-0 select-none">
        <button
          id="nav-btn-home"
          onClick={() => {
            sound.playClick();
            setActiveScreen('menu');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'menu' ? 'text-yellow-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Lobby' : 'Lobby'}</span>
        </button>

        <button
          id="nav-btn-spinner"
          onClick={() => {
            sound.playClick();
            setActiveScreen('spinner');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'spinner' || activeScreen === 'duel' ? 'text-yellow-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Ruleta' : 'Wheel'}</span>
        </button>

        <button
          id="nav-btn-tower"
          onClick={() => {
            sound.playClick();
            setActiveScreen('tower');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'tower' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TowerIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Torre' : 'Tower'}</span>
        </button>

        <button
          id="nav-btn-shop"
          onClick={() => {
            sound.playClick();
            setActiveScreen('shop');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'shop' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Taller' : 'Shop'}</span>
        </button>

        <button
          id="nav-btn-ranking"
          onClick={() => {
            sound.playClick();
            setActiveScreen('leaderboard');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'leaderboard' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Ranking' : 'Ranking'}</span>
        </button>

        <button
          id="nav-btn-events"
          onClick={() => {
            sound.playClick();
            setActiveScreen('events');
          }}
          className={`flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-1 font-pixel text-[7.5px] xs:text-[8px] sm:text-[9px] transition-transform active:scale-90 ${
            activeScreen === 'events' ? 'text-yellow-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{language === 'es' ? 'Eventos' : 'Events'}</span>
        </button>
      </nav>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userProfile={userProfile}
        language={language}
        onChangeLanguage={setLanguage}
        crtFilterEnabled={crtFilter}
        onToggleCrt={setCrtFilter}
        onUpdateProfile={handleProfileUpdated}
      />
    </div>
  );
};

export default App;
