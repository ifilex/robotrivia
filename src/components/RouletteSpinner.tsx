import React, { useState } from 'react';
import { CATEGORIES, CATEGORY_KEYS } from '../data/categories';
import { CategoryId } from '../types';
import { sound } from '../services/sound';
import { CanvasRoulette } from './CanvasRoulette';
import { CartoonCategoryMascot } from './CartoonCategoryMascot';
import { Sparkles, Crown, ArrowLeft, Flame } from 'lucide-react';

interface RouletteSpinnerProps {
  onCategorySelected: (category: CategoryId, isCrownRound: boolean) => void;
  language: 'es' | 'en';
  onBack?: () => void;
}

export const RouletteSpinner: React.FC<RouletteSpinnerProps> = ({
  onCategorySelected,
  language,
  onBack,
}) => {
  const [selectedCat, setSelectedCat] = useState<CategoryId | null>(null);
  const [isCrownBonus, setIsCrownBonus] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCategoryResult = (category: CategoryId, isCrown: boolean) => {
    setSelectedCat(category);
    setIsCrownBonus(isCrown);
    setIsSpinning(false);
    setTimeout(() => {
      onCategorySelected(category, isCrown);
    }, 1200);
  };

  const handleDirectSelect = (cat: CategoryId) => {
    if (isSpinning) return;
    sound.playSelect();
    onCategorySelected(cat, false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-full w-full max-w-4xl mx-auto px-2 py-1 select-none overflow-hidden">
      {/* Top Banner with Willy Mascot Greeting */}
      <div className="w-full flex items-center justify-between bg-slate-900/90 border-2 border-black px-3 py-1.5 shadow-[0_3px_0_#000] shrink-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border-2 border-black text-slate-200 font-pixel text-[9px] pixel-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-yellow-400" />
            <span>{language === 'es' ? 'ATRÁS' : 'BACK'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-yellow-400 font-pixel text-[10px]">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>WILLY ARCADE</span>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-xs sm:text-sm font-pixel text-yellow-400 retro-glow-yellow leading-tight">
            {language === 'es' ? '¡GIRA LA RULETA!' : 'SPIN THE WHEEL!'}
          </h2>
          <span className="text-[10px] text-cyan-300 font-mono hidden sm:inline">
            {language === 'es' ? '¡Desliza o pulsa al centro de Willy!' : 'Swipe or tap center of Willy!'}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-400/40 px-2 py-0.5 rounded text-yellow-300 text-[10px] font-pixel">
          <Crown className="w-3.5 h-3.5" />
          <span>BONUS</span>
        </div>
      </div>

      {/* Center Main Stage: Canvas Physics Roulette */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative my-0.5">
        <CanvasRoulette
          language={language}
          onCategorySelected={handleCategoryResult}
        />

        {/* Selected Result Popup Overlay */}
        {selectedCat && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center z-40 p-4 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 border-4 border-yellow-400 p-4 sm:p-6 rounded-lg text-center shadow-[0_8px_0_#000] max-w-sm w-full flex flex-col items-center">
              <CartoonCategoryMascot
                category={selectedCat}
                size="lg"
                mood="happy"
                animated={true}
              />
              <span className="mt-2 text-xs font-mono text-yellow-300 block font-bold tracking-wider">
                {isCrownBonus
                  ? (language === 'es' ? '👑 ¡RONDA DE CORONA ESPECIAL!' : '👑 SPECIAL CROWN ROUND!')
                  : (language === 'es' ? '¡TEMÁTICA ELEGIDA!' : 'CATEGORY SELECTED!')}
              </span>
              <h3
                className="font-pixel text-base sm:text-lg my-1 text-white"
                style={{ color: CATEGORIES[selectedCat].color }}
              >
                {CATEGORIES[selectedCat].name[language]}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 border border-slate-800 rounded">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
                <span>{language === 'es' ? '¡Cargando duelo 8-bit...!' : 'Loading 8-bit duel...!'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Cartoon Mascot Quick Picker Shelf */}
      <div className="w-full bg-slate-950/90 border-t-2 border-black px-2 py-1.5 shrink-0">
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="font-pixel text-[8px] text-slate-400 tracking-wider">
            {language === 'es' ? 'PERSONAJES & TEMÁTICAS:' : 'MASCOTS & CATEGORIES:'}
          </span>
          <span className="font-mono text-[9px] text-yellow-400/80">
            {language === 'es' ? 'Toca uno para duelo directo' : 'Tap for direct duel'}
          </span>
        </div>

        {/* 8 Cartoon Category Mascots Horizontal Strip */}
        <div className="flex sm:grid sm:grid-cols-8 gap-1.5 sm:gap-1 w-full max-w-2xl mx-auto overflow-x-auto no-scrollbar py-0.5 px-0.5 justify-start sm:justify-center">
          {CATEGORY_KEYS.map(catKey => {
            const cat = CATEGORIES[catKey];
            return (
              <button
                key={catKey}
                id={`btn-select-category-${catKey}`}
                onClick={() => handleDirectSelect(catKey)}
                title={cat.name[language]}
                className="flex-shrink-0 sm:flex-shrink flex flex-col items-center justify-center p-1 min-w-[50px] sm:min-w-0 bg-slate-900 hover:bg-slate-800 active:scale-95 border border-black hover:border-yellow-400 rounded transition-transform group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <CartoonCategoryMascot
                    category={catKey}
                    size="xs"
                    mood="idle"
                    animated={false}
                  />
                </div>
                <span className="text-[7px] font-pixel text-slate-300 group-hover:text-yellow-300 truncate w-full text-center leading-none mt-0.5">
                  {cat.name[language].split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

