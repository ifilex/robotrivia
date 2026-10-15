import React, { useState } from 'react';
import { SHOP_ITEMS } from '../data/customization';
import { AvatarConfig, ShopItem, UserProfile } from '../types';
import { PixelRobot } from './PixelRobot';
import { CanvasCapeStudio } from './CanvasCapeStudio';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { Sparkles, Check, Lock, ShoppingBag, Shield, Wind, Eye } from 'lucide-react';

interface AvatarShopProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onBack: () => void;
}

export const AvatarShop: React.FC<AvatarShopProps> = ({
  userProfile,
  language,
  onUpdateProfile,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'cape' | 'chassis' | 'accessory' | 'aura' | 'colors'>('cape');
  const [previewAvatar, setPreviewAvatar] = useState<AvatarConfig>({ ...userProfile.avatar });
  const [previewMode, setPreviewMode] = useState<'avatar' | 'cape_physics'>('avatar');

  const colorsList = [
    { name: 'Cian Cyber', primary: '#06b6d4', accent: '#f59e0b' },
    { name: 'Esmeralda Retro', primary: '#10b981', accent: '#fbbf24' },
    { name: 'Púrpura Cuántico', primary: '#a855f7', accent: '#38bdf8' },
    { name: 'Carmesí Real', primary: '#e11d48', accent: '#facc15' },
    { name: 'Ámbar Arcade', primary: '#f59e0b', accent: '#ef4444' },
    { name: 'Monocromo GameBoy', primary: '#84cc16', accent: '#15803d' },
    { name: 'Medianoche Glitch', primary: '#4338ca', accent: '#ec4899' },
  ];

  const handleBuyOrEquip = (item: ShopItem) => {
    const isUnlocked = userProfile.unlockedItems.includes(item.id);

    if (isUnlocked) {
      // Equip item
      sound.playSelect();
      const updatedAvatar = { ...userProfile.avatar };
      if (item.type === 'cape') {
        updatedAvatar.capeId = updatedAvatar.capeId === item.id ? 'none' : item.id;
      } else if (item.type === 'chassis') {
        updatedAvatar.chassis = item.id.replace('chassis_', '');
      } else if (item.type === 'accessory') {
        updatedAvatar.accessoryId = updatedAvatar.accessoryId === item.id.replace('acc_', '') ? undefined : item.id.replace('acc_', '');
      } else if (item.type === 'aura') {
        updatedAvatar.auraId = updatedAvatar.auraId === item.id.replace('aura_', '') ? 'none' : item.id.replace('aura_', '');
      }

      setPreviewAvatar(updatedAvatar);
      const updatedProfile = { ...userProfile, avatar: updatedAvatar };
      storage.saveUserProfile(updatedProfile);
      onUpdateProfile(updatedProfile);
    } else {
      // Check currency
      if (userProfile.coins < item.priceCoins || userProfile.gems < item.priceGems) {
        sound.playIncorrect();
        return;
      }

      // Purchase
      sound.playVictory();
      const updatedCoins = userProfile.coins - item.priceCoins;
      const updatedGems = userProfile.gems - item.priceGems;
      const updatedUnlocked = [...userProfile.unlockedItems, item.id];

      const updatedProfile: UserProfile = {
        ...userProfile,
        coins: updatedCoins,
        gems: updatedGems,
        unlockedItems: updatedUnlocked,
      };

      storage.saveUserProfile(updatedProfile);
      onUpdateProfile(updatedProfile);
    }
  };

  const handleSelectColorPalette = (palette: { primary: string; accent: string }) => {
    sound.playSelect();
    const updatedAvatar: AvatarConfig = {
      ...userProfile.avatar,
      primaryColor: palette.primary,
      accentColor: palette.accent,
    };
    setPreviewAvatar(updatedAvatar);
    const updatedProfile = { ...userProfile, avatar: updatedAvatar };
    storage.saveUserProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  const filteredItems = SHOP_ITEMS.filter(i => i.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-5 flex flex-col gap-4 sm:gap-5 w-full">
      {/* Header with Balance */}
      <div className="bg-slate-900 border-4 border-black p-3 sm:p-4 shadow-[0_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-block px-2 py-0.5 bg-yellow-950 border border-yellow-500 font-pixel text-[8px] sm:text-[9px] text-yellow-400 mb-1">
            TIENDA DE PERSONALIZACIÓN
          </div>
          <h2 className="text-base sm:text-xl font-pixel text-yellow-400 retro-glow-yellow">
            {language === 'es' ? 'TALLER DE ROBOTS & CAPAS 8-BIT' : '8-BIT ROBOT & CAPE WORKSHOP'}
          </h2>
        </div>

        {/* Currency Pill */}
        <div className="flex items-center gap-3 sm:gap-4 bg-slate-950 border-2 border-black px-3 py-1.5">
          <div className="flex items-center gap-1.5 font-pixel text-xs text-yellow-400">
            <span>🪙</span>
            <span>{userProfile.coins}</span>
          </div>
          <div className="flex items-center gap-1.5 font-pixel text-xs text-purple-400">
            <span>💎</span>
            <span>{userProfile.gems}</span>
          </div>
        </div>
      </div>

      {/* Physics Cape Studio or Full Viewport */}
      {previewMode === 'cape_physics' ? (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center bg-slate-900 border-2 border-black p-2">
            <span className="font-pixel text-[9px] text-yellow-400">
              {language === 'es' ? 'ESTUDIO DE FÍSICA DE CAPAS 8-BIT' : '8-BIT CAPE PHYSICS STUDIO'}
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setPreviewMode('avatar');
              }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 font-pixel text-[9px] text-slate-200 border border-black"
            >
              ← {language === 'es' ? 'VER AVATAR COMPLETO' : 'VIEW FULL AVATAR'}
            </button>
          </div>

          <CanvasCapeStudio
            userProfile={userProfile}
            language={language}
            onUpdateProfile={onUpdateProfile}
            onBack={() => setPreviewMode('avatar')}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Left: Avatar Live Preview Display */}
          <div className="bg-slate-900 border-4 border-black p-4 sm:p-5 shadow-[0_6px_0_#000] flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between mb-3">
              <span className="font-pixel text-[9px] text-slate-400">VISTA PREVIA</span>
              <button
                onClick={() => {
                  sound.playSelect();
                  setPreviewMode('cape_physics');
                }}
                className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400 hover:bg-yellow-300 text-black border border-black font-pixel text-[8px] pixel-btn-primary"
                title="Abrir física de capas en Canvas"
              >
                <Wind className="w-3 h-3" />
                <span>{language === 'es' ? 'FÍSICA CAPA' : 'CAPE PHYSICS'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 border-4 border-slate-800 rounded-sm w-full flex items-center justify-center min-h-[200px]">
              <PixelRobot config={previewAvatar} size="xl" />
            </div>

            <div className="mt-3 text-center w-full">
              <h3 className="font-pixel text-xs sm:text-sm text-yellow-400">{userProfile.username}</h3>
              <p className="font-mono text-[11px] text-slate-400 mt-0.5">{userProfile.title}</p>
            </div>
          </div>

          {/* Right: Items Catalog */}
          <div className="md:col-span-2 bg-slate-900 border-4 border-black p-3 sm:p-4 shadow-[0_6px_0_#000] flex flex-col">
            {/* Navigation Tabs */}
            <div className="grid grid-cols-5 gap-1 border-b-2 border-slate-800 pb-3 mb-3">
              {[
                { id: 'cape', label: 'Capas 8-Bit', icon: '🧣' },
                { id: 'chassis', label: 'Chasis', icon: '🤖' },
                { id: 'accessory', label: 'Accesorios', icon: '👑' },
                { id: 'aura', label: 'Auras', icon: '✨' },
                { id: 'colors', label: 'Colores', icon: '🎨' },
              ].map(tab => (
                <button
                  key={tab.id}
                  id={`btn-shop-tab-${tab.id}`}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`py-2 px-1 text-center font-pixel text-[8px] sm:text-[9px] border-2 border-black transition-colors ${
                    activeTab === tab.id
                      ? 'bg-yellow-400 text-black font-bold shadow-[0_2px_0_#000]'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="block text-xs mb-0.5">{tab.icon}</span>
                  <span className="truncate block">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {activeTab !== 'colors' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {filteredItems.map(item => {
                  const isUnlocked = userProfile.unlockedItems.includes(item.id);
                  const isEquipped =
                    (item.type === 'cape' && userProfile.avatar.capeId === item.id) ||
                    (item.type === 'chassis' && userProfile.avatar.chassis === item.id.replace('chassis_', '')) ||
                    (item.type === 'accessory' && userProfile.avatar.accessoryId === item.id.replace('acc_', '')) ||
                    (item.type === 'aura' && userProfile.avatar.auraId === item.id.replace('aura_', ''));

                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 sm:p-3 border-2 border-black flex flex-col justify-between gap-2 ${
                        isEquipped
                          ? 'bg-indigo-950/80 border-yellow-400'
                          : isUnlocked
                          ? 'bg-slate-950'
                          : 'bg-slate-950/60 opacity-90'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-pixel text-[9px] sm:text-[10px] text-slate-100">{item.name[language]}</h4>
                          <span
                            className={`text-[7px] sm:text-[8px] font-pixel px-1 border border-black ${
                              item.rarity === 'legendary'
                                ? 'bg-yellow-500 text-black'
                                : item.rarity === 'epic'
                                ? 'bg-purple-600 text-white'
                                : item.rarity === 'rare'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {item.rarity.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 leading-snug">{item.description[language]}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <div>
                          {!isUnlocked && (
                            <div className="flex items-center gap-1 font-pixel text-[8px] sm:text-[9px] text-yellow-400">
                              {item.priceCoins > 0 && <span>{item.priceCoins} 🪙</span>}
                              {item.priceGems > 0 && <span>{item.priceGems} 💎</span>}
                            </div>
                          )}
                        </div>

                        <button
                          id={`btn-item-${item.id}`}
                          onClick={() => handleBuyOrEquip(item)}
                          className={`px-2.5 py-1 font-pixel text-[8px] sm:text-[9px] border border-black pixel-btn ${
                            isEquipped
                              ? 'bg-emerald-600 text-white'
                              : isUnlocked
                              ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                              : 'bg-yellow-400 hover:bg-yellow-300 text-black'
                          }`}
                        >
                          {isEquipped
                            ? '✓ EQUIPADO'
                            : isUnlocked
                            ? 'EQUIPAR'
                            : 'COMPRAR'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Color Palettes Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {colorsList.map((pal, idx) => (
                  <button
                    key={idx}
                    id={`btn-palette-${idx}`}
                    onClick={() => handleSelectColorPalette(pal)}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 border-2 border-black flex items-center justify-between text-left pixel-btn"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 border border-black shadow-[0_2px_0_#000]"
                        style={{ backgroundColor: pal.primary }}
                      />
                      <div
                        className="w-4 h-4 border border-black"
                        style={{ backgroundColor: pal.accent }}
                      />
                      <span className="font-mono text-xs text-slate-200">{pal.name}</span>
                    </div>
                    {userProfile.avatar.primaryColor === pal.primary && (
                      <span className="font-pixel text-[8px] text-yellow-400">✓ ACTIVO</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-2">
        <button
          id="btn-back-shop"
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

