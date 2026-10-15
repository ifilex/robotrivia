import React, { useEffect, useRef, useState } from 'react';
import { CATEGORIES, CATEGORY_KEYS } from '../data/categories';
import { CategoryId } from '../types';
import { sound } from '../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Zap } from 'lucide-react';

interface CanvasRouletteProps {
  onCategorySelected: (category: CategoryId, isCrownRound: boolean) => void;
  language: 'es' | 'en';
}

interface WheelSector {
  id: CategoryId | 'crown_bonus';
  label: { es: string; en: string };
  color: string;
  darkColor: string;
  iconChar: string;
  isCrown: boolean;
}

export const CanvasRoulette: React.FC<CanvasRouletteProps> = ({
  onCategorySelected,
  language,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSector, setSelectedSector] = useState<WheelSector | null>(null);
  const [resultMessage, setResultMessage] = useState<string>('');

  // 9 Sectors (8 categories + 1 Crown bonus)
  const sectors: WheelSector[] = [
    {
      id: 'science_tech',
      label: { es: 'CIENCIA', en: 'SCIENCE' },
      color: '#06b6d4',
      darkColor: '#083344',
      iconChar: '⚛',
      isCrown: false,
    },
    {
      id: 'history',
      label: { es: 'HISTORIA', en: 'HISTORY' },
      color: '#f59e0b',
      darkColor: '#451a03',
      iconChar: '🏛',
      isCrown: false,
    },
    {
      id: 'crown_bonus',
      label: { es: '¡CORONA!', en: 'CROWN!' },
      color: '#eab308',
      darkColor: '#713f12',
      iconChar: '👑',
      isCrown: true,
    },
    {
      id: 'entertainment',
      label: { es: 'CINE & TV', en: 'MOVIES' },
      color: '#ec4899',
      darkColor: '#500724',
      iconChar: '🎬',
      isCrown: false,
    },
    {
      id: 'geography',
      label: { es: 'GEOGRAFÍA', en: 'GEOGRAPHY' },
      color: '#10b981',
      darkColor: '#022c22',
      iconChar: '🌍',
      isCrown: false,
    },
    {
      id: 'sports',
      label: { es: 'DEPORTES', en: 'SPORTS' },
      color: '#ef4444',
      darkColor: '#450a0a',
      iconChar: '⚽',
      isCrown: false,
    },
    {
      id: 'art_lit',
      label: { es: 'ARTE', en: 'ART' },
      color: '#8b5cf6',
      darkColor: '#2e1065',
      iconChar: '🎨',
      isCrown: false,
    },
    {
      id: 'retro_games',
      label: { es: 'RETRO 8-BIT', en: '8-BIT RETRO' },
      color: '#3b82f6',
      darkColor: '#172554',
      iconChar: '👾',
      isCrown: false,
    },
    {
      id: 'anime_pop',
      label: { es: 'ANIME & POP', en: 'ANIME' },
      color: '#d946ef',
      darkColor: '#4a044e',
      iconChar: '⚡',
      isCrown: false,
    },
  ];

  const physicsRef = useRef({
    angle: 0,
    angularVelocity: 0,
    targetAngle: 0,
    isSpinning: false,
    lastTickIndex: -1,
    tickTime: 0,
    ledPhase: 0,
  });

  // Touch drag state
  const touchRef = useRef({
    isDragging: false,
    startAngle: 0,
    lastAngle: 0,
    lastTime: 0,
    dragVelocities: [] as number[],
  });

  const numSectors = sectors.length;
  const arcSize = (2 * Math.PI) / numSectors;

  // Spin Action with Physics
  const startSpin = (initialVelocity?: number) => {
    if (physicsRef.current.isSpinning) return;

    sound.playSelect();
    setIsSpinning(true);
    setSelectedSector(null);
    setResultMessage('');

    const physics = physicsRef.current;
    physics.isSpinning = true;

    // Velocity in radians per frame
    const speed = initialVelocity || (0.28 + Math.random() * 0.18);
    physics.angularVelocity = speed;
  };

  // Canvas Render Loop
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
      const containerW = rect.width || 340;
      const containerH = rect.height || 340;
      const available = Math.min(containerW, containerH > 50 ? containerH : containerW);
      const size = Math.floor(Math.max(220, Math.min(available, 400)));
      if (size <= 0) return;

      const targetWidth = size * dpr;
      const targetHeight = size * dpr;

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
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

    const render = () => {
      const physics = physicsRef.current;
      physics.ledPhase += 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const centerX = w / 2;
      const centerY = h / 2;
      const radius = Math.min(centerX, centerY) - 16;

      ctx.clearRect(0, 0, w, h);

      // 1. Update Physics
      if (physics.isSpinning) {
        physics.angle += physics.angularVelocity;
        physics.angularVelocity *= 0.985; // Friction dampening

        // Trigger tick sound on sector pass
        const normalizedAngle = (physics.angle % (2 * Math.PI) + (2 * Math.PI)) % (2 * Math.PI);
        // Pointer is at the top (-Math.PI / 2)
        const pointerAngle = (Math.PI * 1.5 - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
        const currentSectorIdx = Math.floor(pointerAngle / arcSize) % numSectors;

        if (currentSectorIdx !== physics.lastTickIndex) {
          physics.lastTickIndex = currentSectorIdx;
          sound.playRouletteTick();
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
        }

        // Stop condition
        if (physics.angularVelocity < 0.002) {
          physics.angularVelocity = 0;
          physics.isSpinning = false;
          setIsSpinning(false);

          const finalSector = sectors[currentSectorIdx];
          setSelectedSector(finalSector);

          if (finalSector.isCrown) {
            sound.playVictory();
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
            });
            setResultMessage(language === 'es' ? '¡RONDA DE CORONA DESBLOQUEADA!' : 'CROWN ROUND UNLOCKED!');
            setTimeout(() => {
              // Pick random category for crown duel
              const randomCat = CATEGORY_KEYS[Math.floor(Math.random() * CATEGORY_KEYS.length)];
              onCategorySelected(randomCat, true);
            }, 1400);
          } else {
            sound.playCorrect();
            setResultMessage(`${finalSector.label[language]}!`);
            setTimeout(() => {
              onCategorySelected(finalSector.id as CategoryId, false);
            }, 1100);
          }
        }
      }

      ctx.save();
      ctx.translate(centerX, centerY);

      // 2. Draw Outer Arcade Bezel & LEDs
      ctx.beginPath();
      ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Flashing 8-bit LEDs around ring
      const numLeds = 24;
      for (let i = 0; i < numLeds; i++) {
        const ledAngle = (i * (2 * Math.PI)) / numLeds;
        const ledX = Math.cos(ledAngle) * (radius + 6);
        const ledY = Math.sin(ledAngle) * (radius + 6);
        const isLit = Math.sin(physics.ledPhase + i * 0.8) > 0;

        ctx.fillStyle = isLit ? (i % 2 === 0 ? '#facc15' : '#06b6d4') : '#1e293b';
        ctx.fillRect(ledX - 3, ledY - 3, 6, 6);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(ledX - 3, ledY - 3, 6, 6);
      }

      // 3. Draw Wheel Sectors
      ctx.rotate(physics.angle);

      sectors.forEach((sector, i) => {
        const startAngle = i * arcSize;
        const endAngle = startAngle + arcSize;

        // Sector Wedge
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = sector.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Inner Sector Pattern / Shading
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius * 0.5, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fill();

        // Sector Icon & Text
        ctx.save();
        const midAngle = startAngle + arcSize / 2;
        ctx.rotate(midAngle);

        // Icon
        const iconSize = Math.max(13, Math.min(20, Math.floor(radius * 0.13)));
        ctx.font = `bold ${iconSize}px "Press Start 2P", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeText(sector.iconChar, radius * 0.68, 0);
        ctx.fillText(sector.iconChar, radius * 0.68, 0);

        // Label
        const labelSize = Math.max(6, Math.min(8, Math.floor(radius * 0.052)));
        ctx.font = `bold ${labelSize}px "Press Start 2P", monospace`;
        ctx.fillStyle = sector.isCrown ? '#000000' : '#ffffff';
        ctx.strokeText(sector.label[language], radius * 0.38, 0);
        ctx.fillText(sector.label[language], radius * 0.38, 0);

        ctx.restore();
      });

      // 4. Center Arcade Hub - Willy The Living Wheel Face!
      ctx.restore(); // reset rotation to draw center hub & pointer

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer Golden Hub Ring
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Yellow Mascot Face
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Little Golden Crown on Head
      ctx.beginPath();
      ctx.moveTo(-16, -26);
      ctx.lineTo(-20, -36);
      ctx.lineTo(-8, -30);
      ctx.lineTo(0, -40);
      ctx.lineTo(8, -30);
      ctx.lineTo(20, -36);
      ctx.lineTo(16, -26);
      ctx.closePath();
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
      // Crown Gems
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-2, -34, 4, 4);

      // Cartoon Big Expressive Eyes
      const eyeOffset = 11;
      const eyeY = -6;

      // Left Eye White
      ctx.beginPath();
      ctx.ellipse(-eyeOffset, eyeY, 8, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Right Eye White
      ctx.beginPath();
      ctx.ellipse(eyeOffset, eyeY, 8, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Pupils: If spinning, swirl or look around!
      if (physics.isSpinning) {
        const pupilAngle = (Date.now() / 60) % (Math.PI * 2);
        const px = Math.cos(pupilAngle) * 3;
        const py = Math.sin(pupilAngle) * 3;

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-eyeOffset + px, eyeY + py, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeOffset + px, eyeY + py, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Normal Happy Looking Eyes with reflections
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-eyeOffset + 1, eyeY + 1, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeOffset + 1, eyeY + 1, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye White Glints
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-eyeOffset - 1, eyeY - 2, 2.5, 2.5);
        ctx.fillRect(eyeOffset - 1, eyeY - 2, 2.5, 2.5);
      }

      // Pink Cute Cheeks
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(-18, 5, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(18, 5, 4, 0, Math.PI * 2);
      ctx.fill();

      // Big Open Laughing Mouth
      ctx.beginPath();
      ctx.arc(0, 10, 12, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = '#dc2626';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Big White Cartoon Tooth
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-4, 10, 8, 4);

      // Pink Tongue
      ctx.fillStyle = '#fda4af';
      ctx.beginPath();
      ctx.arc(0, 16, 6, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.fill();

      // If not spinning, small badge overlay at bottom of face
      if (!physics.isSpinning) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(-22, 24, 44, 12);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        ctx.strokeRect(-22, 24, 44, 12);

        ctx.font = 'bold 7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fef08a';
        ctx.fillText('¡GIRAR!', 0, 31);
      }

      ctx.restore();

      // 5. Top 8-Bit Needle Pointer
      ctx.save();
      ctx.translate(centerX, centerY - radius - 6);

      // Needle triangle
      ctx.beginPath();
      ctx.moveTo(-12, -12);
      ctx.lineTo(12, -12);
      ctx.lineTo(0, 14);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Needle highlight
      ctx.fillStyle = '#fca5a5';
      ctx.fillRect(-6, -10, 12, 4);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
    };
  }, [language, numSectors, arcSize]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSpinning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    touchRef.current.isDragging = true;
    touchRef.current.startAngle = Math.atan2(y, x);
    touchRef.current.lastAngle = touchRef.current.startAngle;
    touchRef.current.lastTime = Date.now();
    touchRef.current.dragVelocities = [];
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current.isDragging || isSpinning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;

    const currentAngle = Math.atan2(y, x);
    const deltaAngle = currentAngle - touchRef.current.lastAngle;
    const now = Date.now();
    const dt = now - touchRef.current.lastTime || 16;

    physicsRef.current.angle += deltaAngle;
    touchRef.current.dragVelocities.push(deltaAngle / (dt / 16));
    if (touchRef.current.dragVelocities.length > 5) {
      touchRef.current.dragVelocities.shift();
    }

    touchRef.current.lastAngle = currentAngle;
    touchRef.current.lastTime = now;
  };

  const handleTouchEnd = () => {
    if (!touchRef.current.isDragging || isSpinning) return;
    touchRef.current.isDragging = false;

    const vels = touchRef.current.dragVelocities;
    const avgVelocity = vels.length > 0 ? vels.reduce((a, b) => a + b, 0) / vels.length : 0;

    if (Math.abs(avgVelocity) > 0.05) {
      startSpin(Math.min(0.45, Math.abs(avgVelocity) * 2.5));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto p-2 sm:p-4 w-full">
      {/* Title Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-950 border border-yellow-500 font-pixel text-[9px] text-yellow-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RULETA ARCADE CANVAS 8-BIT</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-pixel text-yellow-400 retro-glow-yellow mb-1">
          {language === 'es' ? '¡GIRA O DESLIZA CON TU DEDO!' : 'SPIN OR SWIPE WITH TOUCH!'}
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-sm">
          {language === 'es'
            ? '¡Toca el botón o desliza la ruleta para desafiar al destino!'
            : 'Tap the button or swipe the wheel to challenge fate!'}
        </p>
      </div>

      {/* Canvas Wheel Area */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center p-2 touch-none cursor-pointer"
        onClick={() => startSpin()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          className="pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] select-none"
        />
      </div>

      {/* Result Callout Banner */}
      {resultMessage && (
        <div className="mt-3 px-6 py-2.5 bg-yellow-400 border-4 border-black text-black font-pixel text-xs sm:text-sm animate-bounce shadow-[0_4px_0_#000]">
          {resultMessage}
        </div>
      )}

      {/* Big Push Spin Button for Mobile & Desktop */}
      <div className="mt-5 flex flex-col items-center gap-3 w-full max-w-xs">
        <button
          onClick={() => startSpin()}
          disabled={isSpinning}
          className={`w-full py-4 px-6 font-pixel text-sm uppercase transition-all flex items-center justify-center gap-2 border-4 border-black shadow-[0_6px_0_#000] ${
            isSpinning
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1 active:shadow-[0_2px_0_#000]'
          }`}
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>{isSpinning ? (language === 'es' ? '¡GIRANDO...!' : 'SPINNING...') : (language === 'es' ? '¡GIRAR RULETA!' : 'SPIN WHEEL!')}</span>
        </button>

        <span className="text-[10px] font-pixel text-slate-400 text-center">
          {language === 'es' ? '💡 Compatible con gestos táctiles en celulares y tablets' : '💡 Touch gesture compatible on phones & tablets'}
        </span>
      </div>
    </div>
  );
};
