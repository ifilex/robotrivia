import React, { useState, useEffect, useRef } from 'react';
import { Gift, X, Sparkles } from 'lucide-react';
import { sound } from '../services/sound';

export interface PushNotificationToastProps {
  language?: 'es' | 'en';
  onClaimReward?: (coins: number, gems: number) => void;
  autoDismissMs?: number;
}

export const PushNotificationToast: React.FC<PushNotificationToastProps> = ({
  language = 'es',
  onClaimReward,
  autoDismissMs = 4000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if daily reward already dismissed this session
    const hasSeenToday = sessionStorage.getItem('robotrivia_daily_reward_seen_session');
    if (hasSeenToday) return;

    // Show daily reward square shortly after launch
    const showTimer = setTimeout(() => {
      setIsOpen(true);
      sound.playVictory();
      sessionStorage.setItem('robotrivia_daily_reward_seen_session', 'true');

      // Auto-dismiss in exactly 4 seconds if user doesn't click
      timerRef.current = setTimeout(() => {
        handleAutoDismiss();
      }, autoDismissMs);
    }, 800);

    return () => {
      clearTimeout(showTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoDismissMs]);

  const handleAutoDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsDismissing(false);
    }, 300);
  };

  const handleClaim = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsClaimed(true);
    sound.playVictory();
    if (onClaimReward) {
      onClaimReward(50, 5);
    }
    // Animate and close
    setTimeout(() => {
      setIsDismissing(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }, 450);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    handleAutoDismiss();
  };

  if (!isOpen) return null;

  return (
    <aside 
      aria-label={language === 'es' ? 'Notificación de recompensa diaria' : 'Daily reward notification'}
      onClick={handleClaim}
      className={`fixed top-3 sm:top-4 right-2 sm:right-4 z-50 max-w-[340px] sm:max-w-sm w-[92vw] sm:w-full bg-slate-900 border-3 border-yellow-400 p-3 sm:p-3.5 shadow-[0_6px_0_#000] font-mono text-xs cursor-pointer select-none transition-all duration-300 transform ${
        isDismissing ? 'opacity-0 -translate-y-4 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center font-pixel text-xl shrink-0 shadow-[0_2px_0_#000] animate-pulse">
          🎁
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-pixel text-[9px] sm:text-[10px] text-yellow-400 tracking-wide truncate">
              {language === 'es' ? '¡RECOMPENSA DIARIA! 🎁' : 'DAILY REWARD READY! 🎁'}
            </h4>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded font-pixel text-[10px] leading-none shrink-0"
              title={language === 'es' ? 'Cerrar' : 'Close'}
            >
              ✕
            </button>
          </div>

          <p className="text-slate-200 text-[11px] sm:text-xs mt-1 leading-snug">
            {language === 'es' 
              ? 'Has recibido +50 Monedas 🪙 y +5 Gemas 💎 de bonificación.'
              : 'You received +50 Coins 🪙 & +5 Gems 💎 login bonus.'}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="font-pixel text-[8px] sm:text-[9px] text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin-slow text-yellow-400" />
              {isClaimed 
                ? (language === 'es' ? '¡RECLAMADO!' : 'CLAIMED!') 
                : (language === 'es' ? 'CLIC PARA RECLAMAR' : 'CLICK TO CLAIM')}
            </span>
            <span className="font-mono text-[9px] text-slate-400">
              {language === 'es' ? '4s autodescarte' : '4s auto-dismiss'}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Second Countdown Progress Bar */}
      <div className="mt-2.5 w-full bg-slate-950 h-1.5 border border-slate-700 overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 origin-left"
          style={{
            animation: `shrinkWidth ${autoDismissMs}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </aside>
  );
};

