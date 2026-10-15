import React from 'react';
import { CATEGORIES, CATEGORY_KEYS } from '../data/categories';
import { CategoryId, UserProfile } from '../types';
import { sound } from '../services/sound';
import { Brain, Zap, Target, Award, Share2, Activity, HeartPulse } from 'lucide-react';

interface CognitiveReportProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onBack: () => void;
}

export const CognitiveReport: React.FC<CognitiveReportProps> = ({
  userProfile,
  language,
  onBack,
}) => {
  const stats = userProfile.stats;
  const totalAnswers = stats.correctAnswers + stats.wrongAnswers;
  const accuracyPercent = totalAnswers > 0 ? Math.round((stats.correctAnswers / totalAnswers) * 100) : 0;
  const avgSpeedSec = (stats.averageResponseTimeMs / 1000).toFixed(1);

  // Cognitive Domain Scores (0 to 100)
  const precisionScore = Math.min(100, Math.max(20, accuracyPercent));
  const reactionScore = Math.min(100, Math.max(20, Math.round(100 - (stats.averageResponseTimeMs / 150))));
  const breadthScore = Math.min(100, Math.max(20, Object.values(stats.categoryStats || {}).filter((c: any) => (c?.total || 0) > 0).length * 12.5));
  const enduranceScore = Math.min(100, Math.max(20, stats.totalMatches * 10));
  const focusScore = Math.min(100, Math.max(20, Math.round((stats.longestStreak / 8) * 100)));

  const overallCognitiveScore = Math.round(
    (precisionScore * 0.35) + (reactionScore * 0.25) + (breadthScore * 0.15) + (enduranceScore * 0.15) + (focusScore * 0.10)
  );

  const handleShareReport = () => {
    sound.playSelect();
    const shareText = `🧠 Mi Índice Cognitivo en RoboTrivia 8-Bit es ${overallCognitiveScore} pts con ${accuracyPercent}% de precisión y ${stats.crowns} coronas ganadas. ¡Desafíame! 🕹️`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert(language === 'es' ? '¡Informe cognitivo copiado al portapapeles para compartir en redes!' : 'Cognitive report copied to clipboard to share on socials!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 bg-emerald-950 border border-emerald-500 font-pixel text-[9px] text-emerald-400 mb-1">
            ANÁLISIS NEURONAL & RENDIMIENTO
          </div>
          <h2 className="text-xl font-pixel text-yellow-400 retro-glow-yellow">
            {language === 'es' ? 'INFORME DE RENDIMIENTO COGNITIVO' : 'COGNITIVE PERFORMANCE REPORT'}
          </h2>
        </div>

        <button
          onClick={handleShareReport}
          className="flex items-center gap-1.5 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-xs border-2 border-black pixel-btn-primary"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'COMPARTIR RESULTADOS' : 'SHARE STATS'}</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border-2 border-black p-3.5 text-center shadow-[0_4px_0_#000]">
          <Brain className="w-6 h-6 text-purple-400 mx-auto mb-1" />
          <span className="text-[10px] font-mono text-slate-400 block">Índice Cognitivo</span>
          <span className="font-pixel text-lg text-yellow-400">{overallCognitiveScore} / 100</span>
        </div>

        <div className="bg-slate-900 border-2 border-black p-3.5 text-center shadow-[0_4px_0_#000]">
          <Target className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] font-mono text-slate-400 block">Precisión Global</span>
          <span className="font-pixel text-lg text-emerald-400">{accuracyPercent}%</span>
        </div>

        <div className="bg-slate-900 border-2 border-black p-3.5 text-center shadow-[0_4px_0_#000]">
          <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
          <span className="text-[10px] font-mono text-slate-400 block">Velocidad Promedio</span>
          <span className="font-pixel text-lg text-cyan-400">{avgSpeedSec}s</span>
        </div>

        <div className="bg-slate-900 border-2 border-black p-3.5 text-center shadow-[0_4px_0_#000]">
          <Award className="w-6 h-6 text-amber-400 mx-auto mb-1" />
          <span className="text-[10px] font-mono text-slate-400 block">Racha Máxima</span>
          <span className="font-pixel text-lg text-amber-400">{stats.longestStreak} aciertos</span>
        </div>
      </div>

      {/* Domains Radar Breakdown & Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Cognitive Domains Progress Bars */}
        <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000]">
          <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2 mb-3">
            <Activity className="w-4 h-4 text-yellow-400" />
            <span className="font-pixel text-xs text-yellow-400">PILOTAJES COGNITIVOS</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { label: 'Precisión Lógica & Síntesis', val: precisionScore, col: 'bg-emerald-500' },
              { label: 'Velocidad de Reacción Sináptica', val: reactionScore, col: 'bg-cyan-500' },
              { label: 'Amplitud de Conocimiento Multidisciplinar', val: breadthScore, col: 'bg-purple-500' },
              { label: 'Resistencia Mental en Torneos', val: enduranceScore, col: 'bg-orange-500' },
              { label: 'Enfoque & Control de Racha', val: focusScore, col: 'bg-rose-500' },
            ].map((dom, i) => (
              <div key={i}>
                <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                  <span>{dom.label}</span>
                  <span className="font-pixel text-[10px] text-yellow-400">{dom.val}%</span>
                </div>
                <div className="w-full bg-slate-950 h-3 border border-slate-700 overflow-hidden">
                  <div className={`h-full ${dom.col}`} style={{ width: `${dom.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Category Mastery Breakdown */}
        <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000]">
          <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2 mb-3">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="font-pixel text-xs text-cyan-400">DOMINIO POR TEMÁTICA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {CATEGORY_KEYS.map(catKey => {
              const cat = CATEGORIES[catKey];
              const catStat = stats.categoryStats[catKey] || { correct: 0, total: 0 };
              const catPercent = catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : 0;

              return (
                <div key={catKey} className="p-2 bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-200 text-[11px] truncate font-medium">{cat.name[language]}</span>
                    <span className="text-[10px] font-pixel text-yellow-400">{catPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 border border-black overflow-hidden">
                    <div
                      className="h-full"
                      style={{ backgroundColor: cat.color, width: `${Math.max(5, catPercent)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
