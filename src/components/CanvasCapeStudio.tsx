import React, { useEffect, useRef, useState } from 'react';
import { AvatarConfig, UserProfile } from '../types';
import { sound } from '../services/sound';
import { storage } from '../services/storage';
import { Sparkles, Wind, Shield, Check, Palette } from 'lucide-react';

interface CanvasCapeStudioProps {
  userProfile: UserProfile;
  language: 'es' | 'en';
  onUpdateProfile: (updated: UserProfile) => void;
  onBack: () => void;
}

interface CapePreset {
  id: string;
  name: { es: string; en: string };
  fill: string;
  trim: string;
  shadow: string;
  pattern: 'solid' | 'stripes' | 'dragon' | 'cyber' | 'stars';
  description: { es: string; en: string };
}

export const CanvasCapeStudio: React.FC<CanvasCapeStudioProps> = ({
  userProfile,
  language,
  onUpdateProfile,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCapeId, setSelectedCapeId] = useState<string>(
    userProfile.avatar.capeId && userProfile.avatar.capeId !== 'none'
      ? userProfile.avatar.capeId
      : 'cape_cyber_neon'
  );
  const [windLevel, setWindLevel] = useState<'breeze' | 'gale' | 'storm'>('gale');
  const [capeLength, setCapeLength] = useState<number>(48);

  const capePresets: CapePreset[] = [
    {
      id: 'cape_cyber_neon',
      name: { es: 'Capa Neón Cibernética', en: 'Cyber Neon Cape' },
      fill: '#06b6d4',
      trim: '#67e8f9',
      shadow: '#083344',
      pattern: 'cyber',
      description: { es: 'Tejido de fibra óptica azul cian con bordes fluorescentes.', en: 'Cyan fiber-optic cloth with fluorescent glowing edges.' },
    },
    {
      id: 'cape_dragon_gold',
      name: { es: 'Capa Imperial de Dragón Dorado', en: 'Golden Dragon Imperial Cape' },
      fill: '#eab308',
      trim: '#fef08a',
      shadow: '#713f12',
      pattern: 'dragon',
      description: { es: 'Forjada en oro 8-bit con ribete ceremonial y runas de dragón.', en: 'Forged in 8-bit gold with ceremonial trim and dragon runes.' },
    },
    {
      id: 'cape_cosmic_fire',
      name: { es: 'Capa Furia Cósmica', en: 'Cosmic Fire Cape' },
      fill: '#ea580c',
      trim: '#fdba74',
      shadow: '#7c2d12',
      pattern: 'stripes',
      description: { es: 'Llamas termonucleares que arden eternamente en el vacío.', en: 'Thermonuclear flames burning eternally in cyberspace.' },
    },
    {
      id: 'cape_glitch_void',
      name: { es: 'Capa del Vacío Glitch', en: 'Glitch Void Cape' },
      fill: '#9333ea',
      trim: '#d8b4fe',
      shadow: '#3b0764',
      pattern: 'cyber',
      description: { es: 'Materia cuántica inestable con artefactos de distorsión pixelada.', en: 'Unstable quantum dark matter with pixel distortion artifacts.' },
    },
    {
      id: 'hero_red',
      name: { es: 'Capa Clásica del Héroe Retro', en: 'Retro Hero Classic Cape' },
      fill: '#dc2626',
      trim: '#fca5a5',
      shadow: '#7f1d1d',
      pattern: 'solid',
      description: { es: 'La legendaria capa roja de los campeones de arcade de los 80.', en: 'The legendary red cape worn by 80s arcade champions.' },
    },
  ];

  // Drag physics state
  const mouseDragRef = useRef({
    isDragging: false,
    dragX: 0,
    dragY: 0,
  });

  const physicsRef = useRef({
    tick: 0,
    nodes: Array.from({ length: 8 }, () => ({ x: 0, y: 0, vx: 0, vy: 0 })),
  });

  // Canvas Cloth Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let resizeRafId: number | null = null;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height || 300);
      if (w <= 0 || h <= 0) return;

      const targetW = w * dpr;
      const targetH = h * dpr;

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resize();
      });
    });
    resizeObserver.observe(container);
    resize();

    const activePreset = capePresets.find(p => p.id === selectedCapeId) || capePresets[0];

    const render = () => {
      const physics = physicsRef.current;
      physics.tick++;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const centerX = w * 0.48;
      const centerY = h * 0.38;

      ctx.clearRect(0, 0, w, h);

      // 1. Grid Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Wind intensity calculation
      const windMult = windLevel === 'breeze' ? 0.6 : windLevel === 'gale' ? 1.4 : 2.5;
      const t = physics.tick * 0.08 * windMult;

      // 2. Cloth Multi-Segment Physics Simulation
      const numNodes = 7;
      const segmentHeight = capeLength / numNodes;
      const capeWidth = 42;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Draw Robot Body in Silhouette / Preview
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-18, -30, 36, 26); // Head
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-12, -22, 24, 8); // Eyes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-22, -4, 44, 38); // Torso

      // Robot Neck Anchor Point
      const anchorX = -6;
      const anchorY = 0;

      // Calculate Cape Wave Nodes
      const leftPoints: { x: number; y: number }[] = [];
      const rightPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= numNodes; i++) {
        const progress = i / numNodes;
        const waveX = Math.sin(t + i * 0.7) * (progress * 18 * windMult);
        const waveY = Math.cos(t * 0.8 + i * 0.5) * (progress * 8 * windMult);

        const currentW = (capeWidth * (0.5 + progress * 0.8));
        const py = anchorY + i * segmentHeight + waveY;

        leftPoints.push({ x: anchorX - currentW + waveX, y: py });
        rightPoints.push({ x: anchorX + currentW + waveX, y: py });
      }

      // 3. Render 8-Bit Cape Mesh
      // Shadow / Backing
      ctx.beginPath();
      ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
      for (let i = 1; i <= numNodes; i++) {
        ctx.lineTo(leftPoints[i].x - 4, leftPoints[i].y + 4);
      }
      for (let i = numNodes; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x + 4, rightPoints[i].y + 4);
      }
      ctx.closePath();
      ctx.fillStyle = activePreset.shadow;
      ctx.fill();

      // Main Cape Fabric
      ctx.beginPath();
      ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
      for (let i = 1; i <= numNodes; i++) {
        ctx.lineTo(leftPoints[i].x, leftPoints[i].y);
      }
      for (let i = numNodes; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = activePreset.fill;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // 4. Cape Pattern Details (Cyber Lines / Dragon / Stripes)
      if (activePreset.pattern === 'cyber') {
        ctx.strokeStyle = activePreset.trim;
        ctx.lineWidth = 2;
        for (let i = 2; i < numNodes; i += 2) {
          ctx.beginPath();
          ctx.moveTo(leftPoints[i].x + 6, leftPoints[i].y);
          ctx.lineTo(rightPoints[i].x - 6, rightPoints[i].y);
          ctx.stroke();
        }
      } else if (activePreset.pattern === 'dragon') {
        // Gold emblem in center
        const midNode = leftPoints[3];
        ctx.fillStyle = '#fef08a';
        ctx.font = '16px "Press Start 2P", monospace';
        ctx.fillText('🐉', (leftPoints[3].x + rightPoints[3].x) / 2 - 8, leftPoints[3].y);
      }

      // 5. Cape Trim (Gold / Neon Bottom Border)
      ctx.beginPath();
      ctx.moveTo(leftPoints[numNodes].x, leftPoints[numNodes].y);
      ctx.lineTo(rightPoints[numNodes].x, rightPoints[numNodes].y);
      ctx.lineWidth = 5;
      ctx.strokeStyle = activePreset.trim;
      ctx.stroke();

      // Wind particles flying across
      ctx.fillStyle = activePreset.trim;
      for (let p = 0; p < 8; p++) {
        const px = ((physics.tick * (4 * windMult) + p * 60) % 280) - 140;
        const py = Math.sin(t + p) * 30 + (p * 8);
        ctx.fillRect(px, py, 3, 2);
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
    };
  }, [selectedCapeId, windLevel, capeLength]);

  const handleEquipCape = (capeId: string) => {
    sound.playSelect();
    setSelectedCapeId(capeId);

    const updatedAvatar: AvatarConfig = {
      ...userProfile.avatar,
      capeId: capeId,
    };

    const updatedProfile: UserProfile = {
      ...userProfile,
      avatar: updatedAvatar,
    };

    storage.saveUserProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-950 border border-cyan-500 font-pixel text-[9px] text-cyan-400 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>ESTUDIO FÍSICO DE CAPAS 8-BIT</span>
          </div>
          <h2 className="text-lg sm:text-xl font-pixel text-yellow-400 retro-glow-yellow">
            {language === 'es' ? 'CAPA VISUAL 8-BIT & PERSONALIZADOR' : '8-BIT VISUAL CAPE & CUSTOMIZER'}
          </h2>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-800 border-2 border-black font-pixel text-xs text-slate-200 hover:bg-slate-700 active:translate-y-1"
        >
          {language === 'es' ? 'VOLVER AL TALLER' : 'BACK TO WORKSHOP'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Interactive Canvas Simulator */}
        <div className="md:col-span-2 bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-pixel text-[10px] text-slate-400">SIMULADOR DE FÍSICA DE TELA EN VIVO</span>
            <div className="flex items-center gap-1 font-pixel text-[9px] text-cyan-400">
              <Wind className="w-3 h-3" />
              <span>VIENTO: {windLevel.toUpperCase()}</span>
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full relative overflow-hidden bg-slate-950 border-2 sm:border-4 border-slate-800 rounded-sm h-[200px] sm:h-[250px] md:h-[280px]"
          >
            <canvas ref={canvasRef} className="w-full h-full block pixelated" />
          </div>

          {/* Wind Speed & Physics Controls */}
          <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-950 p-2.5 border-2 border-slate-800">
            {(['breeze', 'gale', 'storm'] as const).map(w => (
              <button
                key={w}
                onClick={() => {
                  sound.playClick();
                  setWindLevel(w);
                }}
                className={`py-2 px-2 font-pixel text-[10px] border-2 border-black transition-all ${
                  windLevel === w
                    ? 'bg-cyan-500 text-black shadow-[0_3px_0_#000]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {w === 'breeze' ? (language === 'es' ? '🍃 BRISA' : '🍃 BREEZE') : w === 'gale' ? (language === 'es' ? '💨 VIENTO' : '💨 GALE') : (language === 'es' ? '🌪 TORMENTA' : '🌪 STORM')}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Cape Selector */}
        <div className="bg-slate-900 border-4 border-black p-4 shadow-[0_6px_0_#000] flex flex-col gap-3">
          <h3 className="font-pixel text-xs text-yellow-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>{language === 'es' ? 'COLECCIÓN DE CAPAS' : 'CAPE COLLECTION'}</span>
          </h3>

          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[320px] pr-1">
            {capePresets.map(cape => {
              const isEquipped = userProfile.avatar.capeId === cape.id;
              const isSelected = selectedCapeId === cape.id;

              return (
                <div
                  key={cape.id}
                  onClick={() => handleEquipCape(cape.id)}
                  className={`p-3 border-2 border-black cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-yellow-400 shadow-[0_3px_0_#000]'
                      : 'bg-slate-950 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-xs text-slate-200">{cape.name[language]}</span>
                    <div
                      className="w-4 h-4 border border-black rounded-xs"
                      style={{ backgroundColor: cape.fill }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-tight mb-2">
                    {cape.description[language]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-cyan-400">
                      {isEquipped ? '✓ EQUIPADA' : 'CLIC PARA EQUIPAR'}
                    </span>
                    {isEquipped && (
                      <span className="p-0.5 bg-green-500 text-black text-[10px] font-bold rounded-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
