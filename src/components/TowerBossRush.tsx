import React from 'react';
import { ROBOT_RIVALS } from '../data/robots';
import { RobotRival, UserProfile } from '../types';
import { PixelRobot } from './PixelRobot';
import { sound } from '../services/sound';
import { Trophy, Lock, Swords, ChevronRight } from 'lucide-react';

interface TowerBossRushProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onSelectBoss: (rival: RobotRival) => void;
  onBack: () => void;
}

export const TowerBossRush: React.FC<TowerBossRushProps> = ({
  userProfile,
  language,
  onSelectBoss,
  onBack,
}) => {
  const bosses = ROBOT_RIVALS;

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-5">
      {/* Tower Header */}
      <div className="bg-slate-900 border-4 border-black p-4 text-center shadow-[0_6px_0_#000]">
        <div className="inline-block px-3 py-1 bg-purple-950 border border-purple-500 font-pixel text-[10px] text-purple-300 mb-2">
          MODO DESAFÍO BOSS RUSH
        </div>
        <h2 className="text-xl sm:text-2xl font-pixel text-yellow-400 retro-glow-yellow mb-1">
          {language === 'es' ? 'TORRE DE JEFES CIBERNÉTICOS' : 'CYBER BOSS TOWER'}
        </h2>
        <p className="font-mono text-xs text-slate-300 max-w-lg mx-auto">
          {language === 'es'
            ? 'Asciende por los 5 pisos de la torre. Vence a cada rival con dificultad progresiva para ganar coronas y desbloquear la Capa Legendaria.'
            : 'Ascend the 5 tower floors. Defeat each rival with progressive difficulty to claim crowns and unlock the Legendary Cape.'}
        </p>
      </div>

      {/* Floors List (From Top to Bottom) */}
      <div className="flex flex-col gap-3">
        {bosses.slice().reverse().map((boss, revIdx) => {
          const floorNumber = bosses.length - revIdx;
          const isDefeated = userProfile.stats.bossesDefeated.includes(boss.id);
          const isUnlocked = floorNumber === 1 || userProfile.stats.bossesDefeated.includes(bosses[floorNumber - 2].id);

          return (
            <div
              key={boss.id}
              className={`p-3.5 sm:p-4 border-4 border-black shadow-[0_5px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                isDefeated
                  ? 'bg-slate-900/90 border-emerald-500/80'
                  : isUnlocked
                  ? 'bg-slate-900 border-yellow-500/80'
                  : 'bg-slate-950/80 border-slate-800 opacity-60'
              }`}
            >
              {/* Floor & Boss Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 flex flex-col items-center justify-center bg-black/60 border-2 border-slate-700 shrink-0">
                  <span className="font-pixel text-[9px] text-slate-400">PISO</span>
                  <span className="font-pixel text-sm text-yellow-400">{floorNumber}</span>
                </div>

                <PixelRobot config={boss.avatarConfig} size="sm" />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-pixel text-xs sm:text-sm text-slate-100">{boss.name}</h3>
                    {isDefeated && (
                      <span className="px-1.5 py-0.5 bg-emerald-600 border border-black font-pixel text-[8px] text-white">
                        ✓ DERROTADO
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-yellow-400/90 mt-0.5">{boss.title[language]}</p>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                    <span>Dificultad: <strong className="text-cyan-300 capitalize">{boss.difficultyLevel}</strong></span>
                    <span>Recompensa: <strong className="text-yellow-400">+{boss.rewardCoins} 🪙</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto flex justify-end">
                {isUnlocked ? (
                  <button
                    id={`btn-challenge-boss-${boss.id}`}
                    onClick={() => {
                      sound.playSelect();
                      onSelectBoss(boss);
                    }}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 font-pixel text-xs border-2 border-black pixel-btn ${
                      isDefeated
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-yellow-400 hover:bg-yellow-300 text-black pixel-btn-primary'
                    }`}
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>{isDefeated ? (language === 'es' ? 'REVANCHA' : 'REMATCH') : (language === 'es' ? 'DESAFIAR' : 'CHALLENGE')}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 border-2 border-slate-800 text-slate-600 font-pixel text-xs">
                    <Lock className="w-3.5 h-3.5" />
                    <span>BLOQUEADO</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="text-center mt-2">
        <button
          id="btn-tower-back"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-black font-pixel text-xs pixel-btn"
        >
          {language === 'es' ? '← VOLVER AL MENÚ' : '← BACK TO MENU'}
        </button>
      </div>
    </div>
  );
};
