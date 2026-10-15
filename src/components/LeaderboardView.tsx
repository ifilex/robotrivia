import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS } from '../data/customization';
import { Achievement, UserProfile } from '../types';
import { PixelRobot } from './PixelRobot';
import { sound } from '../services/sound';
import { apiService } from '../services/api';
import { Trophy, Medal, Award, Share2, Globe, Lock, CheckCircle2 } from 'lucide-react';

interface LeaderboardViewProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onBack: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  userProfile,
  language,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard');
  const [globalRankings, setGlobalRankings] = useState<any[]>([]);

  useEffect(() => {
    apiService.getLeaderboard().then(data => {
      // Include current user in ranking
      const userRankEntry = {
        rank: 6,
        userId: userProfile.id,
        username: `${userProfile.username} (Tú)`,
        avatar: userProfile.avatar,
        crowns: userProfile.stats.crowns,
        points: userProfile.stats.totalPoints,
        country: 'ES',
        tier: 'gold',
      };
      setGlobalRankings([...data, userRankEntry]);
    });
  }, [userProfile]);

  const handleShareScore = () => {
    sound.playSelect();
    const shareText = `🎮 ¡Estoy en el Rango Global de RoboTrivia 8-Bit con ${userProfile.stats.crowns} Coronas y ${userProfile.stats.totalPoints} pts! ¿Puedes superarme? 🤖✨`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert(language === 'es' ? '¡Puntuación copiada al portapapeles para compartir!' : 'Score copied to clipboard for sharing!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 bg-yellow-950 border border-yellow-500 font-pixel text-[9px] text-yellow-400 mb-1">
            CLASIFICACIÓN & LOGROS
          </div>
          <h2 className="text-xl font-pixel text-yellow-400 retro-glow-yellow">
            {language === 'es' ? 'SALÓN DE LA FAMA 8-BIT' : '8-BIT HALL OF FAME'}
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('leaderboard');
            }}
            className={`px-3 py-2 font-pixel text-xs border-2 border-black pixel-btn ${
              activeTab === 'leaderboard' ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🏆 {language === 'es' ? 'Mundial' : 'Global'}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('achievements');
            }}
            className={`px-3 py-2 font-pixel text-xs border-2 border-black pixel-btn ${
              activeTab === 'achievements' ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🎖️ {language === 'es' ? 'Logros' : 'Achievements'}
          </button>
        </div>
      </div>

      {activeTab === 'leaderboard' ? (
        /* Global Leaderboard Table */
        <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col gap-3">
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2">
            <span className="font-pixel text-xs text-slate-400">TOP JUGADORES MUNDIALES</span>
            <button
              onClick={handleShareScore}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 text-xs font-mono"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir Rango</span>
            </button>
          </div>

          <div className="space-y-2">
            {globalRankings.map((entry, idx) => {
              const isCurrentUser = entry.userId === userProfile.id;
              const rank = idx + 1;

              return (
                <div
                  key={entry.userId}
                  className={`p-2.5 sm:p-3 border-2 border-black flex items-center justify-between gap-3 ${
                    isCurrentUser
                      ? 'bg-yellow-500/20 border-yellow-400 shadow-[0_2px_0_#facc15]'
                      : 'bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`w-7 h-7 flex items-center justify-center font-pixel text-xs border border-black ${
                        rank === 1
                          ? 'bg-yellow-400 text-black'
                          : rank === 2
                          ? 'bg-slate-300 text-black'
                          : rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rank}
                    </div>

                    <PixelRobot config={entry.avatar} size="sm" />

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-pixel text-xs text-slate-100">{entry.username}</span>
                        <span className="text-[10px]">🌍 {entry.country}</span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 capitalize">{entry.tier} Tier</span>
                    </div>
                  </div>

                  {/* Points & Crowns */}
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-pixel text-xs text-yellow-400">{entry.crowns} 👑</div>
                      <div className="font-mono text-[11px] text-slate-400">{entry.points} pts</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Achievements Grid */
        <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = userProfile.achievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-3 border-2 border-black flex items-start gap-3 ${
                  isUnlocked ? 'bg-slate-950 border-emerald-500/70' : 'bg-slate-950/60 opacity-60'
                }`}
              >
                <div className="text-2xl mt-1">{ach.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-pixel text-xs text-slate-100">{ach.title[language]}</h4>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">{ach.description[language]}</p>
                  <div className="flex items-center gap-3 text-[11px] font-pixel text-yellow-400 mt-2">
                    <span>+{ach.rewardCoins} 🪙</span>
                    <span>+{ach.rewardXp} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
