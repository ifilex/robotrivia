import React, { useState } from 'react';
import { UserProfile } from '../types';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { Settings, Volume2, Globe, Bell, Cloud, Download, Upload, Monitor, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  language: 'es' | 'en';
  onChangeLanguage: (lang: 'es' | 'en') => void;
  crtFilterEnabled: boolean;
  onToggleCrt: (enabled: boolean) => void;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  language,
  onChangeLanguage,
  crtFilterEnabled,
  onToggleCrt,
  onUpdateProfile,
}) => {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [importText, setImportText] = useState('');
  const [showSyncBox, setShowSyncBox] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    sound.playSelect();
    const dataStr = storage.exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `robotrivia_backup_${Date.now()}.json`;
    a.click();
  };

  const handleImportData = () => {
    if (!importText.trim()) return;
    const success = storage.importData(importText.trim());
    if (success) {
      sound.playVictory();
      const updated = storage.getUserProfile();
      onUpdateProfile(updated);
      alert(language === 'es' ? '¡Datos y progreso en la nube sincronizados con éxito!' : 'Cloud save data synchronized successfully!');
      setShowSyncBox(false);
    } else {
      sound.playIncorrect();
      alert(language === 'es' ? 'Error: Formato de datos no válido' : 'Error: Invalid data format');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-4 border-black w-full max-w-lg shadow-[0_8px_0_#000] p-5 font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-yellow-400" />
            <h3 className="font-pixel text-sm text-yellow-400">
              {language === 'es' ? 'AJUSTES & SISTEMA 8-BIT' : '8-BIT SYSTEM SETTINGS'}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white font-pixel text-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Language Selection */}
          <div className="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200">{language === 'es' ? 'Idioma del Juego' : 'Game Language'}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onChangeLanguage('es')}
                className={`px-2.5 py-1 font-pixel text-[10px] border border-black ${
                  language === 'es' ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ESP
              </button>
              <button
                onClick={() => onChangeLanguage('en')}
                className={`px-2.5 py-1 font-pixel text-[10px] border border-black ${
                  language === 'en' ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                ENG
              </button>
            </div>
          </div>

          {/* CRT Retro Filter Toggle */}
          <div className="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-yellow-400" />
              <div>
                <span className="text-slate-200 block">{language === 'es' ? 'Efecto CRT Scanlines Retro' : 'Retro CRT Scanlines Effect'}</span>
                <span className="text-[10px] text-slate-500">{language === 'es' ? 'Simula una pantalla de tubo arcade' : 'Simulates an arcade tube monitor'}</span>
              </div>
            </div>
            <button
              onClick={() => onToggleCrt(!crtFilterEnabled)}
              className={`px-3 py-1 font-pixel text-[10px] border border-black ${
                crtFilterEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {crtFilterEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Push Notifications Toggle */}
          <div className="p-3 bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-200 block">{language === 'es' ? 'Notificaciones Push' : 'Push Notifications'}</span>
                <span className="text-[10px] text-slate-500">{language === 'es' ? 'Alertas de eventos y recompensas diarias' : 'Daily rewards & tournament alerts'}</span>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setNotificationsOn(!notificationsOn);
              }}
              className={`px-3 py-1 font-pixel text-[10px] border border-black ${
                notificationsOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {notificationsOn ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Cloud Sync Section */}
          <div className="p-3 bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 font-bold">{language === 'es' ? 'Sincronización en la Nube' : 'Cloud Synchronization'}</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              {language === 'es'
                ? 'Exporta o importa tu progreso (coronas, robots desbloqueados, capes y estadísticas) entre cualquier dispositivo.'
                : 'Export or import your game save (crowns, unlocked robots, capes & stats) across any device.'}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleExportData}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-pixel text-[10px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORTAR COPIA</span>
              </button>

              <button
                onClick={() => setShowSyncBox(!showSyncBox)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-pixel text-[10px]"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>IMPORTAR / SINCRONIZAR</span>
              </button>
            </div>

            {showSyncBox && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
                <textarea
                  placeholder="Pega aquí el JSON de copia de seguridad..."
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                  className="w-full h-20 bg-slate-900 border border-slate-700 p-2 font-mono text-[11px] text-yellow-300 placeholder:text-slate-600"
                />
                <button
                  onClick={handleImportData}
                  className="py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-[10px] border border-black"
                >
                  RESTAURAR PROGRESO
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-5 pt-3 border-t-2 border-slate-800 text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-pixel text-xs border-2 border-black pixel-btn-primary"
          >
            GUARDAR Y CERRAR
          </button>
        </div>
      </div>
    </div>
  );
};
