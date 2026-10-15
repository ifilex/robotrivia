import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { sound } from '../services/sound';

export const AudioController: React.FC = () => {
  const [bgmOn, setBgmOn] = useState(sound.bgmEnabled);
  const [sfxOn, setSfxOn] = useState(sound.sfxEnabled);
  const [volume, setVolume] = useState(sound.volume);
  const [showPanel, setShowPanel] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(sound.currentTrack);

  useEffect(() => {
    // Start BGM on first interaction
    const handleFirstGesture = () => {
      if (sound.bgmEnabled) {
        sound.startBGM(currentTrack);
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [currentTrack]);

  const handleToggleBgm = () => {
    const newState = sound.toggleBgm();
    setBgmOn(newState);
    sound.playClick();
  };

  const handleToggleSfx = () => {
    const newState = sound.toggleSfx();
    setSfxOn(newState);
    if (newState) sound.playSelect();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const handleSelectTrack = (track: 'retro_arcade' | 'relax_chiptune' | 'boss_battle') => {
    setCurrentTrack(track);
    sound.startBGM(track);
    sound.playSelect();
  };

  return (
    <div className="relative">
      <button
        id="btn-toggle-audio-panel"
        onClick={() => {
          setShowPanel(!showPanel);
          sound.playClick();
        }}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-900/90 hover:bg-slate-800 text-yellow-400 border border-slate-700 hover:border-yellow-400 text-xs font-mono pixel-btn transition-colors shrink-0"
        title="Controles de Audio 8-Bit"
      >
        <Music className="w-3.5 h-3.5 animate-bounce text-yellow-400 shrink-0" />
        <span className="font-pixel text-[8px] sm:text-[9px] hidden md:inline">8-BIT BGM</span>
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border-4 border-black p-3.5 z-50 shadow-[0_8px_0_#000] text-slate-100 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2 mb-3">
            <span className="font-pixel text-[10px] text-yellow-400">SINTETIZADOR 8-BIT</span>
            <button
              onClick={() => setShowPanel(false)}
              className="text-slate-400 hover:text-white font-pixel text-[10px]"
            >
              ✕
            </button>
          </div>

          {/* Master Volume */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Volumen Master:</span>
              <span className="text-yellow-400">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-yellow-400 cursor-pointer h-2 bg-slate-800"
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handleToggleBgm}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 border-2 border-black font-pixel text-[9px] ${
                bgmOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Music className="w-3 h-3" />
              <span>BGM {bgmOn ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={handleToggleSfx}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 border-2 border-black font-pixel text-[9px] ${
                sfxOn ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {sfxOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>SFX {sfxOn ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Track Selector */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5 flex items-center gap-1">
              <Disc className="w-3 h-3 text-cyan-400" /> Melodía Retro:
            </span>
            <div className="space-y-1">
              {[
                { id: 'retro_arcade', name: 'Arcade Clásico (Alegre)' },
                { id: 'relax_chiptune', name: 'Chiptune Relajante' },
                { id: 'boss_battle', name: 'Duelo Boss (Intenso)' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(t.id as any)}
                  className={`w-full text-left px-2 py-1 text-[11px] border border-slate-700 flex items-center justify-between ${
                    currentTrack === t.id ? 'bg-indigo-950/80 text-yellow-300 border-yellow-500' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{t.name}</span>
                  {currentTrack === t.id && <span className="text-yellow-400 font-pixel text-[8px]">▶</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
