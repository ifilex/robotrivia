import React from 'react';
import { MONTHLY_EVENT } from '../data/customization';
import { UserProfile } from '../types';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { Calendar, Gift, Check, Clock, Sparkles } from 'lucide-react';

interface MonthlyEventsProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onUpdateProfile: (updated: UserProfile) => void;
  onBack: () => void;
}

export const MonthlyEvents: React.FC<MonthlyEventsProps> = ({
  userProfile,
  language,
  onUpdateProfile,
  onBack,
}) => {
  const event = MONTHLY_EVENT;

  const handleClaimReward = (tier: any) => {
    sound.playVictory();
    const updatedCoins = userProfile.coins + (tier.rewardCoins || 0);
    const updatedGems = userProfile.gems + (tier.rewardGems || 0);
    let updatedUnlocked = [...userProfile.unlockedItems];

    if (tier.rewardItem && !updatedUnlocked.includes(tier.rewardItem)) {
      updatedUnlocked.push(tier.rewardItem);
    }

    const updated: UserProfile = {
      ...userProfile,
      coins: updatedCoins,
      gems: updatedGems,
      unlockedItems: updatedUnlocked,
    };

    storage.saveUserProfile(updated);
    onUpdateProfile(updated);
    alert(language === 'es' ? '¡Recompensa del evento reclamada con éxito!' : 'Event reward claimed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-5 flex flex-col gap-5">
      {/* Event Banner */}
      <div className="bg-slate-900 border-4 border-black p-5 shadow-[0_6px_0_#000] relative overflow-hidden">
        <div className="flex items-center gap-2 text-yellow-400 font-pixel text-[10px] mb-2">
          <Calendar className="w-4 h-4" />
          <span>{language === 'es' ? 'EVENTO MENSUAL ACTIVO' : 'ACTIVE MONTHLY EVENT'}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-pixel text-yellow-400 retro-glow-yellow mb-2">
          {event.title[language]}
        </h2>

        <p className="font-mono text-xs sm:text-sm text-slate-300 mb-4 max-w-xl">
          {event.description[language]}
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-cyan-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {language === 'es' ? `Expira: ${event.endDate}` : `Expires: ${event.endDate}`}
          </span>
        </div>
      </div>

      {/* Tiers Progress List */}
      <div className="flex flex-col gap-3">
        {event.tiers.map((tier, idx) => {
          const isCompleted = userProfile.stats.crowns >= tier.targetCrowns;

          return (
            <div
              key={idx}
              className={`p-4 border-4 border-black shadow-[0_4px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isCompleted ? 'bg-slate-900 border-yellow-500' : 'bg-slate-950/80 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/60 border-2 border-slate-700 flex items-center justify-center font-pixel text-sm text-yellow-400">
                  #{idx + 1}
                </div>
                <div>
                  <h4 className="font-pixel text-xs sm:text-sm text-slate-100">{tier.name[language]}</h4>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    Meta: <strong className="text-yellow-400">{userProfile.stats.crowns} / {tier.targetCrowns} 👑 Coronas</strong>
                  </div>
                </div>
              </div>

              {/* Reward Details & Action */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right text-xs font-pixel text-yellow-400">
                  {tier.rewardCoins && <div>+{tier.rewardCoins} 🪙</div>}
                  {tier.rewardGems && <div className="text-purple-400">+{tier.rewardGems} 💎</div>}
                  {tier.rewardItem && <div className="text-cyan-400 text-[10px]">Capa Legendaria 🧣</div>}
                </div>

                <button
                  disabled={!isCompleted}
                  onClick={() => handleClaimReward(tier)}
                  className={`px-4 py-2 font-pixel text-xs border-2 border-black pixel-btn ${
                    isCompleted
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black pixel-btn-primary'
                      : 'bg-slate-950 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (language === 'es' ? 'RECLAMAR' : 'CLAIM') : (language === 'es' ? 'EN PROGRESO' : 'IN PROGRESS')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
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
