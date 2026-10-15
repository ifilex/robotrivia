import React from 'react';
import { CategoryId } from '../types';

export interface MascotProps {
  category: CategoryId | 'crown' | 'willy_wheel';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'idle' | 'happy' | 'thinking' | 'shocked' | 'smug' | 'spinning';
  animated?: boolean;
  className?: string;
  showName?: boolean;
  showCrown?: boolean;
  hasCrownCollected?: boolean;
  onClick?: () => void;
}

export const CartoonCategoryMascot: React.FC<MascotProps> = ({
  category,
  size = 'md',
  mood = 'idle',
  animated = true,
  className = '',
  showName = false,
  showCrown = false,
  hasCrownCollected = false,
  onClick,
}) => {
  const sizeMap = {
    xs: 'w-10 h-10',
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  };

  const getMascotInfo = () => {
    switch (category) {
      case 'science_tech':
        return {
          name: 'TITO-BOT',
          title: 'Ciencia',
          color: '#10b981',
          bgGlow: 'rgba(16, 185, 129, 0.4)',
        };
      case 'history':
        return {
          name: 'HECTOR-BOT',
          title: 'Historia',
          color: '#eab308',
          bgGlow: 'rgba(234, 179, 8, 0.4)',
        };
      case 'entertainment':
        return {
          name: 'POP-BOT',
          title: 'Espectáculos',
          color: '#ec4899',
          bgGlow: 'rgba(236, 72, 153, 0.4)',
        };
      case 'geography':
        return {
          name: 'GLOBO-BOT',
          title: 'Geografía',
          color: '#3b82f6',
          bgGlow: 'rgba(59, 130, 246, 0.4)',
        };
      case 'sports':
        return {
          name: 'BONZO-BOT',
          title: 'Deportes',
          color: '#f97316',
          bgGlow: 'rgba(249, 115, 22, 0.4)',
        };
      case 'art_lit':
        return {
          name: 'TINA-BOT',
          title: 'Arte',
          color: '#a855f7',
          bgGlow: 'rgba(168, 85, 247, 0.4)',
        };
      case 'retro_games':
        return {
          name: 'PIXEL-BOT',
          title: 'Videojuegos',
          color: '#ef4444',
          bgGlow: 'rgba(239, 68, 68, 0.4)',
        };
      case 'anime_pop':
        return {
          name: 'NEKO-BOT',
          title: 'Anime Pop',
          color: '#06b6d4',
          bgGlow: 'rgba(6, 182, 212, 0.4)',
        };
      case 'willy_wheel':
        return {
          name: 'WILLY WHEEL',
          title: 'La Ruleta',
          color: '#fbbf24',
          bgGlow: 'rgba(251, 191, 36, 0.5)',
        };
      case 'crown':
      default:
        return {
          name: 'REY CORONA',
          title: 'Corona Máster',
          color: '#f59e0b',
          bgGlow: 'rgba(245, 158, 11, 0.5)',
        };
    }
  };

  const info = getMascotInfo();

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center select-none ${
        onClick ? 'cursor-pointer transform active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      {/* Cartoon Outer Container */}
      <div
        className={`relative flex items-center justify-center ${sizeMap[size]} ${
          animated ? 'animate-[bounce_3s_ease-in-out_infinite]' : ''
        }`}
      >
        {/* Glow Behind Mascot */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-70 pointer-events-none"
          style={{ backgroundColor: info.bgGlow }}
        />

        {/* Crown Collected Badge on top if applicable */}
        {showCrown && hasCrownCollected && (
          <div className="absolute -top-2 -right-1 z-30 bg-yellow-400 border-2 border-black rounded-full w-6 h-6 flex items-center justify-center shadow-[0_2px_0_#000] animate-bounce">
            <span className="text-xs">👑</span>
          </div>
        )}

        {/* SVG Cartoon Character Mascot */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-[0_4px_0_rgba(0,0,0,0.8)] filter overflow-visible"
        >
          {/* ========================================================= */}
          {/* 1. TITO-BOT (SCIENCE - Green Flask Robot) */}
          {/* ========================================================= */}
          {category === 'science_tech' && (
            <g>
              {/* Antenna with Electric Arc */}
              <rect x="47" y="6" width="6" height="12" fill="#334155" stroke="#000" strokeWidth="2.5" />
              <circle cx="50" cy="5" r="5" fill="#10b981" stroke="#000" strokeWidth="2" />
              <circle cx="50" cy="5" r="2" fill="#a7f3d0" />
              {animated && (
                <path d="M 44,4 L 56,6 M 52,1 L 48,9" stroke="#34d399" strokeWidth="1.5" className="animate-pulse" />
              )}

              {/* Ears / Flask Side Handles */}
              <circle cx="16" cy="50" r="7" fill="#047857" stroke="#000" strokeWidth="2.5" />
              <circle cx="84" cy="50" r="7" fill="#047857" stroke="#000" strokeWidth="2.5" />

              {/* Head / Body Flask Shape */}
              <rect x="22" y="20" width="56" height="60" rx="14" fill="#10b981" stroke="#000" strokeWidth="3.5" />
              {/* Belly Liquid Flask Window */}
              <rect x="30" y="52" width="40" height="22" rx="6" fill="#064e3b" stroke="#000" strokeWidth="2" />
              <path d="M 32,64 Q 40,58 50,64 T 68,62 L 68,72 L 32,72 Z" fill="#34d399" />
              {/* Little Bubbles */}
              <circle cx="42" cy="62" r="2" fill="#fff" className="animate-ping" />
              <circle cx="58" cy="66" r="1.5" fill="#fff" />

              {/* Giant Round Scientist Goggles */}
              <circle cx="38" cy="38" r="14" fill="#334155" stroke="#000" strokeWidth="3" />
              <circle cx="62" cy="38" r="14" fill="#334155" stroke="#000" strokeWidth="3" />
              {/* Lens Bridge */}
              <rect x="48" y="36" width="4" height="4" fill="#000" />
              {/* Glowing Goggle Glass */}
              <circle cx="38" cy="38" r="10" fill="#a7f3d0" />
              <circle cx="62" cy="38" r="10" fill="#a7f3d0" />

              {/* Expressive Pupils */}
              {mood === 'shocked' ? (
                <>
                  <circle cx="38" cy="38" r="4" fill="#000" />
                  <circle cx="62" cy="38" r="4" fill="#000" />
                  {/* Screaming mouth */}
                  <ellipse cx="50" cy="50" rx="6" ry="4" fill="#000" />
                </>
              ) : mood === 'happy' || mood === 'smug' ? (
                <>
                  {/* Happy Crescent Eyes */}
                  <path d="M 33,39 Q 38,33 43,39" stroke="#000" strokeWidth="3" fill="none" />
                  <path d="M 57,39 Q 62,33 67,39" stroke="#000" strokeWidth="3" fill="none" />
                  {/* Cute Tooth Smile */}
                  <path d="M 44,48 Q 50,54 56,48 Z" fill="#fff" stroke="#000" strokeWidth="2" />
                </>
              ) : (
                <>
                  {/* Normal Big Curious Pupils with reflections */}
                  <circle cx="39" cy="37" r="6" fill="#065f46" />
                  <circle cx="37" cy="35" r="2" fill="#fff" />
                  <circle cx="63" cy="37" r="6" fill="#065f46" />
                  <circle cx="61" cy="35" r="2" fill="#fff" />
                  {/* Smile */}
                  <path d="M 45,47 Q 50,52 55,47" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </>
              )}
            </g>
          )}

          {/* ========================================================= */}
          {/* 2. HECTOR-BOT (HISTORY - Golden Spartan Knight Robot) */}
          {/* ========================================================= */}
          {category === 'history' && (
            <g>
              {/* Red Spartan Crest Feather */}
              <path d="M 42,4 Q 50,-4 58,4 L 56,18 L 44,18 Z" fill="#ef4444" stroke="#000" strokeWidth="3" />
              <path d="M 46,2 L 54,2" stroke="#fca5a5" strokeWidth="2" />

              {/* Golden Helmet Body */}
              <rect x="22" y="18" width="56" height="62" rx="12" fill="#eab308" stroke="#000" strokeWidth="3.5" />
              {/* Helmet Cheek Guards */}
              <polygon points="22,50 16,70 30,65" fill="#ca8a04" stroke="#000" strokeWidth="2.5" />
              <polygon points="78,50 84,70 70,65" fill="#ca8a04" stroke="#000" strokeWidth="2.5" />

              {/* Visor Area */}
              <rect x="28" y="32" width="44" height="22" rx="6" fill="#1e293b" stroke="#000" strokeWidth="3" />

              {/* Heroic Glowing Eyes */}
              {mood === 'shocked' ? (
                <>
                  <circle cx="40" cy="43" r="5" fill="#fef08a" />
                  <circle cx="60" cy="43" r="5" fill="#fef08a" />
                </>
              ) : mood === 'smug' ? (
                <>
                  <path d="M 34,44 L 46,41" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 54,41 L 66,44" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Fierce heroic eyes */}
                  <polygon points="34,40 44,43 36,46" fill="#fef08a" />
                  <polygon points="66,40 56,43 64,46" fill="#fef08a" />
                </>
              )}

              {/* Roman Grille Mouth */}
              <rect x="42" y="60" width="16" height="12" rx="2" fill="#a16207" stroke="#000" strokeWidth="2" />
              <line x1="46" y1="60" x2="46" y2="72" stroke="#000" strokeWidth="2" />
              <line x1="50" y1="60" x2="50" y2="72" stroke="#000" strokeWidth="2" />
              <line x1="54" y1="60" x2="54" y2="72" stroke="#000" strokeWidth="2" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 3. POP-BOT (ENTERTAINMENT - Popcorn & 3D Glasses Cinema Bot) */}
          {/* ========================================================= */}
          {category === 'entertainment' && (
            <g>
              {/* Clapperboard / Popcorn top */}
              <circle cx="34" cy="18" r="8" fill="#fef08a" stroke="#000" strokeWidth="2" />
              <circle cx="50" cy="14" r="9" fill="#fff" stroke="#000" strokeWidth="2" />
              <circle cx="66" cy="18" r="8" fill="#fef08a" stroke="#000" strokeWidth="2" />

              {/* Striped Cinema Bucket Head */}
              <rect x="22" y="24" width="56" height="56" rx="8" fill="#ec4899" stroke="#000" strokeWidth="3.5" />
              {/* Vertical Stripes */}
              <rect x="32" y="24" width="8" height="56" fill="#ffffff" />
              <rect x="48" y="24" width="8" height="56" fill="#ffffff" />
              <rect x="64" y="24" width="8" height="56" fill="#ffffff" />

              {/* 3D Glasses! (Cyan on Left, Red on Right) */}
              <rect x="24" y="34" width="52" height="20" rx="4" fill="#1e1b4b" stroke="#000" strokeWidth="3" />
              {/* Cyan Left Lens */}
              <rect x="28" y="37" width="18" height="14" rx="2" fill="#06b6d4" stroke="#000" strokeWidth="2" />
              <circle cx="34" cy="42" r="3" fill="#fff" />
              {/* Red Right Lens */}
              <rect x="54" y="37" width="18" height="14" rx="2" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <circle cx="60" cy="42" r="3" fill="#fff" />

              {/* Bowtie on Bottom */}
              <polygon points="42,76 50,72 50,80" fill="#fbbf24" stroke="#000" strokeWidth="2" />
              <polygon points="58,76 50,72 50,80" fill="#fbbf24" stroke="#000" strokeWidth="2" />
              <circle cx="50" cy="76" r="3" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />

              {/* Popcorn Smile */}
              <path d="M 44,62 Q 50,68 56,62" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 4. GLOBO-BOT (GEOGRAPHY - Safari Globe Explorer Bot) */}
          {/* ========================================================= */}
          {category === 'geography' && (
            <g>
              {/* Safari Explorer Pith Hat */}
              <ellipse cx="50" cy="22" rx="34" ry="8" fill="#d97706" stroke="#000" strokeWidth="3" />
              <path d="M 28,22 Q 50,4 72,22 Z" fill="#f59e0b" stroke="#000" strokeWidth="3" />
              <circle cx="50" cy="10" r="4" fill="#b45309" />

              {/* Blue Globe Head */}
              <circle cx="50" cy="54" r="30" fill="#3b82f6" stroke="#000" strokeWidth="3.5" />
              {/* Green Continents on Globe */}
              <path d="M 30,46 Q 38,40 44,48 Q 40,58 32,56 Z" fill="#22c55e" />
              <path d="M 58,42 Q 68,44 66,54 Q 56,58 58,42 Z" fill="#22c55e" />
              <path d="M 44,66 Q 52,62 50,74 Q 42,72 44,66 Z" fill="#22c55e" />

              {/* Binoculars Goggles */}
              <rect x="32" y="44" width="16" height="14" rx="4" fill="#0f172a" stroke="#000" strokeWidth="2.5" />
              <rect x="52" y="44" width="16" height="14" rx="4" fill="#0f172a" stroke="#000" strokeWidth="2.5" />
              <rect x="46" y="49" width="8" height="4" fill="#d97706" />

              <circle cx="40" cy="51" r="5" fill="#38bdf8" />
              <circle cx="38" cy="49" r="1.5" fill="#fff" />
              <circle cx="60" cy="51" r="5" fill="#38bdf8" />
              <circle cx="58" cy="49" r="1.5" fill="#fff" />

              {/* Cute Compass Smile */}
              <path d="M 44,66 Q 50,72 56,66" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 5. BONZO-BOT (SPORTS - Fiery Athlete Bot with Sweatband) */}
          {/* ========================================================= */}
          {category === 'sports' && (
            <g>
              {/* Fiery Hair Sparks */}
              <polygon points="40,16 46,4 50,14" fill="#ef4444" stroke="#000" strokeWidth="2" />
              <polygon points="50,14 56,2 60,16" fill="#f59e0b" stroke="#000" strokeWidth="2" />

              {/* Orange Dynamic Head */}
              <rect x="22" y="20" width="56" height="58" rx="14" fill="#f97316" stroke="#000" strokeWidth="3.5" />

              {/* Red-White Sports Sweatband */}
              <rect x="20" y="28" width="60" height="12" rx="3" fill="#dc2626" stroke="#000" strokeWidth="2.5" />
              <line x1="20" y1="34" x2="80" y2="34" stroke="#ffffff" strokeWidth="3" />

              {/* Determined Athletic Eyes */}
              {mood === 'shocked' ? (
                <>
                  <circle cx="38" cy="48" r="5" fill="#000" />
                  <circle cx="62" cy="48" r="5" fill="#000" />
                </>
              ) : (
                <>
                  <polygon points="32,46 44,49 36,52" fill="#000" />
                  <circle cx="38" cy="48" r="2" fill="#fff" />
                  <polygon points="68,46 56,49 64,52" fill="#000" />
                  <circle cx="62" cy="48" r="2" fill="#fff" />
                </>
              )}

              {/* Referee Whistle in Mouth */}
              <rect x="46" y="60" width="14" height="8" rx="2" fill="#e2e8f0" stroke="#000" strokeWidth="2" />
              <circle cx="56" cy="64" r="2" fill="#94a3b8" />
              <path d="M 40,64 L 46,64" stroke="#000" strokeWidth="2.5" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 6. TINA-BOT (ART - French Painter with Laser Brush) */}
          {/* ========================================================= */}
          {category === 'art_lit' && (
            <g>
              {/* French Artist Beret */}
              <ellipse cx="48" cy="18" rx="30" ry="12" fill="#7e22ce" stroke="#000" strokeWidth="3" transform="rotate(-10 48 18)" />
              <circle cx="46" cy="7" r="3" fill="#a855f7" stroke="#000" strokeWidth="2" />

              {/* Purple Cute Head */}
              <rect x="22" y="24" width="56" height="56" rx="14" fill="#a855f7" stroke="#000" strokeWidth="3.5" />

              {/* Paint Palette Splatter on Cheek */}
              <circle cx="28" cy="58" r="3" fill="#ec4899" />
              <circle cx="33" cy="62" r="2.5" fill="#38bdf8" />
              <circle cx="30" cy="67" r="2" fill="#facc15" />

              {/* Starry Artist Eyes */}
              <circle cx="38" cy="42" r="8" fill="#1e1b4b" stroke="#000" strokeWidth="2" />
              <polygon points="38,36 40,40 44,42 40,44 38,48 36,44 32,42 36,40" fill="#fde047" />
              <circle cx="62" cy="42" r="8" fill="#1e1b4b" stroke="#000" strokeWidth="2" />
              <polygon points="62,36 64,40 68,42 64,44 62,48 60,44 56,42 60,40" fill="#fde047" />

              {/* Laser Paintbrush held sideways */}
              <line x1="68" y1="62" x2="86" y2="48" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
              <polygon points="84,49 92,42 88,38" fill="#06b6d4" stroke="#000" strokeWidth="1.5" />

              {/* Cute Smile */}
              <path d="M 44,56 Q 50,62 56,56" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 7. PIXEL-BOT (RETRO GAMES - 8-Bit Console Mascot) */}
          {/* ========================================================= */}
          {category === 'retro_games' && (
            <g>
              {/* Game Cartridge Slot on Top */}
              <rect x="36" y="8" width="28" height="12" rx="2" fill="#475569" stroke="#000" strokeWidth="2.5" />
              <rect x="42" y="10" width="16" height="4" fill="#fbbf24" />

              {/* Classic Red Arcade / Game Boy Head */}
              <rect x="20" y="18" width="60" height="64" rx="8" fill="#ef4444" stroke="#000" strokeWidth="3.5" />

              {/* Dot-Matrix Screen */}
              <rect x="28" y="26" width="44" height="28" rx="4" fill="#84cc16" stroke="#000" strokeWidth="2.5" />

              {/* 8-Bit Matrix Eyes */}
              <rect x="34" y="32" width="8" height="10" fill="#1a2e05" />
              <rect x="36" y="34" width="4" height="4" fill="#84cc16" />
              <rect x="58" y="32" width="8" height="10" fill="#1a2e05" />
              <rect x="60" y="34" width="4" height="4" fill="#84cc16" />

              {/* D-Pad on Left */}
              <rect x="28" y="60" width="14" height="5" fill="#000" />
              <rect x="32.5" y="55.5" width="5" height="14" fill="#000" />

              {/* A/B Arcade Action Buttons on Right */}
              <circle cx="62" cy="64" r="4" fill="#facc15" stroke="#000" strokeWidth="1.5" />
              <circle cx="70" cy="58" r="4" fill="#3b82f6" stroke="#000" strokeWidth="1.5" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 8. NEKO-BOT (ANIME POP - Kawaii Mecha Kitty) */}
          {/* ========================================================= */}
          {category === 'anime_pop' && (
            <g>
              {/* Mecha Cat Ears */}
              <polygon points="24,26 14,8 36,18" fill="#06b6d4" stroke="#000" strokeWidth="3" />
              <polygon points="24,22 18,12 32,18" fill="#f43f5e" />
              <polygon points="76,26 86,8 64,18" fill="#06b6d4" stroke="#000" strokeWidth="3" />
              <polygon points="76,22 82,12 68,18" fill="#f43f5e" />

              {/* Round Kawaii Mecha Head */}
              <rect x="22" y="20" width="56" height="58" rx="20" fill="#06b6d4" stroke="#000" strokeWidth="3.5" />

              {/* Giant Sparkly Anime Eyes */}
              <ellipse cx="38" cy="42" rx="8" ry="10" fill="#0f172a" stroke="#000" strokeWidth="2" />
              <circle cx="36" cy="38" r="3.5" fill="#fff" />
              <circle cx="40" cy="46" r="1.5" fill="#38bdf8" />

              <ellipse cx="62" cy="42" rx="8" ry="10" fill="#0f172a" stroke="#000" strokeWidth="2" />
              <circle cx="60" cy="38" r="3.5" fill="#fff" />
              <circle cx="64" cy="46" r="1.5" fill="#38bdf8" />

              {/* Pink Heart Blush */}
              <ellipse cx="28" cy="52" rx="4" ry="2.5" fill="#f43f5e" />
              <ellipse cx="72" cy="52" rx="4" ry="2.5" fill="#f43f5e" />

              {/* Cat Mouth :3 */}
              <path d="M 44,52 Q 47,56 50,52 Q 53,56 56,52" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Cyber Whiskers */}
              <line x1="18" y1="46" x2="26" y2="48" stroke="#000" strokeWidth="2" />
              <line x1="18" y1="52" x2="26" y2="52" stroke="#000" strokeWidth="2" />
              <line x1="82" y1="46" x2="74" y2="48" stroke="#000" strokeWidth="2" />
              <line x1="82" y1="52" x2="74" y2="52" stroke="#000" strokeWidth="2" />
            </g>
          )}

          {/* ========================================================= */}
          {/* 9. WILLY THE LIVING WHEEL (LOBBY & SPINNER MASCOT) */}
          {/* ========================================================= */}
          {(category === 'willy_wheel' || category === 'crown') && (
            <g>
              {/* Golden Crown on Top */}
              <polygon points="32,24 40,8 50,18 60,8 68,24" fill="#fbbf24" stroke="#000" strokeWidth="3" />
              <circle cx="40" cy="10" r="2.5" fill="#ef4444" />
              <circle cx="50" cy="19" r="2.5" fill="#3b82f6" />
              <circle cx="60" cy="10" r="2.5" fill="#10b981" />

              {/* Wheel Body with Sector Colors */}
              <circle cx="50" cy="54" r="32" fill="#fbbf24" stroke="#000" strokeWidth="4" />
              {/* Wheel Rim Teeth */}
              <circle cx="50" cy="54" r="28" fill="#1e293b" stroke="#000" strokeWidth="2.5" />

              {/* Big Expressive Cartoon Eyes */}
              <ellipse cx="40" cy="46" rx="8" ry="10" fill="#ffffff" stroke="#000" strokeWidth="2.5" />
              <ellipse cx="60" cy="46" rx="8" ry="10" fill="#ffffff" stroke="#000" strokeWidth="2.5" />

              {/* Googly Pupils */}
              {mood === 'spinning' ? (
                <>
                  {/* Swirl eyes when spinning */}
                  <circle cx="40" cy="46" r="5" fill="#000" className="animate-spin" />
                  <circle cx="60" cy="46" r="5" fill="#000" className="animate-spin" />
                </>
              ) : (
                <>
                  <circle cx="42" cy="46" r="4.5" fill="#000" />
                  <circle cx="40" cy="44" r="1.5" fill="#fff" />
                  <circle cx="62" cy="46" r="4.5" fill="#000" />
                  <circle cx="60" cy="44" r="1.5" fill="#fff" />
                </>
              )}

              {/* Big Laughing Open Cartoon Mouth */}
              <path d="M 36,60 Q 50,74 64,60 Z" fill="#dc2626" stroke="#000" strokeWidth="2.5" />
              {/* Big White Tooth */}
              <rect x="46" y="60" width="8" height="4" rx="1" fill="#fff" />
              {/* Pink Tongue */}
              <ellipse cx="50" cy="66" rx="6" ry="3" fill="#f43f5e" />
            </g>
          )}
        </svg>
      </div>

      {/* Optional Mascot Name Tag */}
      {showName && (
        <div className="mt-1 px-2 py-0.5 bg-slate-900 border-2 border-black rounded-sm shadow-[0_2px_0_#000] text-center">
          <span className="font-pixel text-[8px] sm:text-[9px] text-yellow-400 block font-bold leading-tight">
            {info.name}
          </span>
          <span className="font-mono text-[8px] text-slate-300 block leading-none">{info.title}</span>
        </div>
      )}
    </div>
  );
};
