import React, { useEffect, useRef } from 'react';
import { AvatarConfig, RobotRival } from '../types';

export interface ArenaAction {
  type: 'player_attack' | 'rival_attack' | 'player_hit' | 'rival_hit' | 'shield' | 'combo' | 'victory' | 'defeat';
  value?: string | number;
  timestamp: number;
}

interface RetroCanvasArenaProps {
  playerAvatar: AvatarConfig;
  rival: RobotRival;
  playerScore: number;
  rivalScore: number;
  winningScore: number;
  lastAction?: ArenaAction | null;
  roundTimer?: number;
  theme?: 'cyber_city' | 'space_grid' | 'matrix_core';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface LaserProjectile {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  color: string;
  fromPlayer: boolean;
  active: boolean;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

export const RetroCanvasArena: React.FC<RetroCanvasArenaProps> = ({
  playerAvatar,
  rival,
  playerScore,
  rivalScore,
  winningScore,
  lastAction,
  roundTimer,
  theme = 'cyber_city',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation & game loop refs
  const stateRef = useRef({
    tick: 0,
    playerX: 0,
    playerY: 0,
    rivalX: 0,
    rivalY: 0,
    playerState: 'idle' as 'idle' | 'attack' | 'hit' | 'victory' | 'defeat',
    rivalState: 'idle' as 'idle' | 'attack' | 'hit' | 'victory' | 'defeat',
    playerStateTimer: 0,
    rivalStateTimer: 0,
    screenShake: 0,
    particles: [] as Particle[],
    lasers: [] as LaserProjectile[],
    floatingTexts: [] as FloatingText[],
    capeAngle: 0,
    capeNodes: [0, 0, 0, 0, 0, 0], // multi-segment cloth simulation
  });

  // Handle triggered actions
  useEffect(() => {
    if (!lastAction) return;

    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    if (lastAction.type === 'player_attack') {
      state.playerState = 'attack';
      state.playerStateTimer = 45;
      // Spawn laser from player to rival
      state.lasers.push({
        x: state.playerX + 40,
        y: state.playerY + 20,
        targetX: state.rivalX - 10,
        targetY: state.rivalY + 20,
        speed: 18,
        color: playerAvatar.accentColor || '#38bdf8',
        fromPlayer: true,
        active: true,
      });

      state.floatingTexts.push({
        x: state.playerX,
        y: state.playerY - 20,
        text: '¡ACIERTO!',
        color: '#22c55e',
        size: 16,
        life: 60,
        maxLife: 60,
      });
    } else if (lastAction.type === 'rival_attack') {
      state.rivalState = 'attack';
      state.rivalStateTimer = 45;
      // Spawn laser from rival to player
      state.lasers.push({
        x: state.rivalX - 40,
        y: state.rivalY + 20,
        targetX: state.playerX + 10,
        targetY: state.playerY + 20,
        speed: 18,
        color: rival.avatarConfig.accentColor || '#ef4444',
        fromPlayer: false,
        active: true,
      });

      state.floatingTexts.push({
        x: state.rivalX,
        y: state.rivalY - 20,
        text: '¡DISPARO!',
        color: '#ef4444',
        size: 14,
        life: 50,
        maxLife: 50,
      });
    } else if (lastAction.type === 'player_hit') {
      state.playerState = 'hit';
      state.playerStateTimer = 40;
      state.screenShake = 12;

      // Spawn hit particles
      for (let i = 0; i < 20; i++) {
        state.particles.push({
          x: state.playerX,
          y: state.playerY + 20,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.8) * 8,
          size: Math.random() * 4 + 2,
          color: '#ef4444',
          alpha: 1,
          life: 30,
          maxLife: 30,
        });
      }

      state.floatingTexts.push({
        x: state.playerX,
        y: state.playerY - 20,
        text: '¡FALLO! -1',
        color: '#ef4444',
        size: 16,
        life: 60,
        maxLife: 60,
      });
    } else if (lastAction.type === 'rival_hit') {
      state.rivalState = 'hit';
      state.rivalStateTimer = 40;
      state.screenShake = 8;

      // Sparks
      for (let i = 0; i < 25; i++) {
        state.particles.push({
          x: state.rivalX,
          y: state.rivalY + 20,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.8) * 10,
          size: Math.random() * 5 + 2,
          color: '#eab308',
          alpha: 1,
          life: 40,
          maxLife: 40,
        });
      }

      state.floatingTexts.push({
        x: state.rivalX,
        y: state.rivalY - 25,
        text: `+${lastAction.value || 100} PTS!`,
        color: '#eab308',
        size: 18,
        life: 70,
        maxLife: 70,
      });
    } else if (lastAction.type === 'combo') {
      state.floatingTexts.push({
        x: width / 2,
        y: height / 2 - 30,
        text: `🔥 RACHA x${lastAction.value}!`,
        color: '#f97316',
        size: 20,
        life: 80,
        maxLife: 80,
      });
      state.screenShake = 6;
    } else if (lastAction.type === 'victory') {
      state.playerState = 'victory';
      state.rivalState = 'defeat';
      state.floatingTexts.push({
        x: width / 2,
        y: height / 2 - 40,
        text: '👑 ¡VICTORIA TOTAL!',
        color: '#facc15',
        size: 24,
        life: 120,
        maxLife: 120,
      });
    } else if (lastAction.type === 'defeat') {
      state.playerState = 'defeat';
      state.rivalState = 'victory';
      state.floatingTexts.push({
        x: width / 2,
        y: height / 2 - 40,
        text: '💀 DERROTA CIBERNÉTICA',
        color: '#94a3b8',
        size: 20,
        life: 120,
        maxLife: 120,
      });
    }
  }, [lastAction]);

  // Main Canvas Rendering Loop with ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let resizeRafId: number | null = null;

    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height || (displayWidth > 600 ? 280 : 220));
      if (displayWidth <= 0 || displayHeight <= 0) return;

      const targetW = displayWidth * dpr;
      const targetH = displayHeight * dpr;

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }

      // Store logical width/height
      stateRef.current.playerX = displayWidth * 0.22;
      stateRef.current.playerY = displayHeight * 0.52;
      stateRef.current.rivalX = displayWidth * 0.78;
      stateRef.current.rivalY = displayHeight * 0.52;
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resizeCanvas();
      });
    });
    resizeObserver.observe(container);
    resizeCanvas();

    // 8-bit Drawing Helpers
    const drawPixelRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill: string,
      stroke: string = '#000',
      strokeW: number = 2
    ) => {
      ctx.fillStyle = fill;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      if (strokeW > 0) {
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = stroke;
        ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      }
    };

    const draw8BitCape = (
      rootX: number,
      rootY: number,
      capeId: string = 'hero_red',
      isFacingRight: boolean = true,
      windSpeed: number = 1
    ) => {
      const capeColors: Record<string, { fill: string; trim: string; shadow: string }> = {
        cape_cyber_neon: { fill: '#06b6d4', trim: '#67e8f9', shadow: '#083344' },
        cape_dragon_gold: { fill: '#eab308', trim: '#fef08a', shadow: '#713f12' },
        cape_cosmic_fire: { fill: '#ea580c', trim: '#fdba74', shadow: '#7c2d12' },
        cape_glitch_void: { fill: '#9333ea', trim: '#d8b4fe', shadow: '#3b0764' },
        default: { fill: '#dc2626', trim: '#fca5a5', shadow: '#7f1d1d' },
      };

      const colors = capeColors[capeId] || capeColors.default;
      const state = stateRef.current;
      const t = state.tick * 0.08 * windSpeed;

      // Update multi-segment nodes for fluid 8-bit cloth fluttering
      const direction = isFacingRight ? -1 : 1;
      const length = 42;
      const width = 28;

      ctx.save();
      ctx.translate(rootX, rootY);

      // Cape points with wave oscillation
      const wave1 = Math.sin(t) * 6;
      const wave2 = Math.sin(t + 1.2) * 9;
      const wave3 = Math.cos(t * 0.7) * 7;

      ctx.beginPath();
      ctx.moveTo(0, 0); // Neck anchor
      ctx.lineTo(direction * (width * 0.6), 4);
      ctx.lineTo(direction * (width + wave1), length * 0.5);
      ctx.lineTo(direction * (width * 1.3 + wave2), length);
      ctx.lineTo(direction * (width * 0.4 + wave3), length + 4);
      ctx.lineTo(0, length * 0.7);
      ctx.closePath();

      // Shadow underside
      ctx.fillStyle = colors.shadow;
      ctx.fill();

      // Main cape layer with pixelated outline
      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.lineTo(direction * (width * 0.5), 2);
      ctx.lineTo(direction * (width * 0.9 + wave1), length * 0.45);
      ctx.lineTo(direction * (width * 1.1 + wave2), length - 2);
      ctx.lineTo(direction * (width * 0.3 + wave3), length + 2);
      ctx.lineTo(-2, length * 0.65);
      ctx.closePath();

      ctx.fillStyle = colors.fill;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Decorative Trim (Gold or Cyber border)
      ctx.beginPath();
      ctx.moveTo(direction * (width * 1.1 + wave2), length - 4);
      ctx.lineTo(direction * (width * 0.3 + wave3), length);
      ctx.lineWidth = 3;
      ctx.strokeStyle = colors.trim;
      ctx.stroke();

      ctx.restore();
    };

    const drawRobot = (
      x: number,
      y: number,
      avatar: AvatarConfig,
      stateType: 'idle' | 'attack' | 'hit' | 'victory' | 'defeat',
      isPlayer: boolean,
      scale: number = 1.0
    ) => {
      const state = stateRef.current;
      const tick = state.tick;
      const isFacingRight = isPlayer;

      // Bobbing calculation
      let offsetY = Math.sin(tick * 0.08 + (isPlayer ? 0 : 2)) * 3;
      let offsetX = 0;
      let rotation = 0;

      if (stateType === 'hit') {
        offsetX = (isPlayer ? -1 : 1) * (Math.sin(tick * 0.8) * 8);
        offsetY += 2;
      } else if (stateType === 'attack') {
        offsetX = (isPlayer ? 1 : -1) * 14;
      } else if (stateType === 'victory') {
        offsetY = -Math.abs(Math.sin(tick * 0.15) * 16) - 4;
      } else if (stateType === 'defeat') {
        offsetY = 12;
        rotation = isFacingRight ? -0.2 : 0.2;
      }

      ctx.save();
      ctx.translate(x + offsetX, y + offsetY);
      ctx.scale(scale, scale);
      if (rotation !== 0) ctx.rotate(rotation);

      // Shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 48 - offsetY, 28, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Cape Behind
      if (avatar.capeId && avatar.capeId !== 'none') {
        draw8BitCape(
          isFacingRight ? -12 : 12,
          10,
          avatar.capeId,
          isFacingRight,
          stateType === 'attack' ? 2.5 : 1
        );
      }

      const primary = avatar.primaryColor || (isPlayer ? '#38bdf8' : '#f43f5e');
      const accent = avatar.accentColor || '#f59e0b';
      const isHitFlash = stateType === 'hit' && Math.floor(tick / 3) % 2 === 0;

      const bodyColor = isHitFlash ? '#ffffff' : primary;
      const headColor = isHitFlash ? '#ffffff' : primary;

      // Robot Body / Torso
      drawPixelRect(-20, 8, 40, 32, bodyColor, '#000', 3);

      // Chest Screen / Core
      drawPixelRect(-12, 14, 24, 18, '#0f172a', '#000', 2);
      // Chest light pulse
      const corePulse = Math.sin(tick * 0.1) > 0 ? accent : '#1e293b';
      drawPixelRect(-6, 20, 12, 6, corePulse, '#000', 1);

      // Robot Head
      drawPixelRect(-18, -26, 36, 30, headColor, '#000', 3);

      // Eye Visor Window
      drawPixelRect(-14, -20, 28, 16, '#090d16', '#000', 2);

      // Eye Lights
      if (stateType === 'hit') {
        // X eyes
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px monospace';
        ctx.fillText('X', -10, -8);
        ctx.fillText('X', 2, -8);
      } else if (stateType === 'victory') {
        // Happy ^^ eyes
        ctx.fillStyle = '#22c55e';
        ctx.font = '12px monospace';
        ctx.fillText('^', -10, -6);
        ctx.fillText('^', 2, -6);
      } else {
        // Glowing Visor Beam
        ctx.fillStyle = accent;
        const visorW = avatar.eyesStyle === 'dots' ? 6 : 22;
        const visorX = avatar.eyesStyle === 'dots' ? (isFacingRight ? -6 : -10) : -11;
        ctx.fillRect(visorX, -16, visorW, 8);
        // Highlight shine
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(visorX + 2, -15, 4, 3);
      }

      // Head Accessory
      if (avatar.accessoryId === 'antenna') {
        drawPixelRect(-2, -36, 4, 10, '#475569', '#000', 2);
        drawPixelRect(-5, -42, 10, 6, accent, '#000', 2);
      } else if (avatar.accessoryId === 'crown') {
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-16, -26);
        ctx.lineTo(-12, -40);
        ctx.lineTo(-4, -30);
        ctx.lineTo(4, -42);
        ctx.lineTo(12, -30);
        ctx.lineTo(16, -26);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (avatar.accessoryId === 'headphones') {
        // Headphone band
        ctx.strokeStyle = '#e11d48';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, -20, 20, Math.PI, 0);
        ctx.stroke();
        drawPixelRect(-22, -24, 6, 14, '#be123c', '#000', 2);
        drawPixelRect(16, -24, 6, 14, '#be123c', '#000', 2);
      }

      // Left & Right Arms / Cannons
      const armAngle = stateType === 'attack' ? (isFacingRight ? 0.6 : -0.6) : 0;
      const frontArmX = isFacingRight ? 16 : -24;
      drawPixelRect(frontArmX, 12, 10, 22, bodyColor, '#000', 2);

      // Laser Cannon Barrel when attacking
      if (stateType === 'attack') {
        const barrelX = isFacingRight ? 24 : -32;
        drawPixelRect(barrelX, 16, 12, 8, '#1e293b', '#000', 2);
        // Muzzle flash
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(barrelX + (isFacingRight ? 14 : -2), 20, 8 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Main Render Tick
    const render = () => {
      const state = stateRef.current;
      state.tick++;

      // Clear Canvas
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.save();

      // Screen Shake
      if (state.screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * state.screenShake;
        const shakeY = (Math.random() - 0.5) * state.screenShake;
        ctx.translate(shakeX, shakeY);
        state.screenShake *= 0.88;
        if (state.screenShake < 0.2) state.screenShake = 0;
      }

      // 1. Draw Retro 8-bit Background
      if (theme === 'cyber_city') {
        // Deep Night Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
        skyGrad.addColorStop(0, '#030712');
        skyGrad.addColorStop(0.55, '#0f172a');
        skyGrad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Twinkling Pixel Stars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 35; i++) {
          const starX = (i * 47 + state.tick * 0.2) % w;
          const starY = (i * 23) % (h * 0.45);
          const starSize = (i % 3 === 0) ? 2 : 1;
          if (Math.sin(state.tick * 0.05 + i) > -0.3) {
            ctx.fillRect(Math.round(starX), Math.round(starY), starSize, starSize);
          }
        }

        // Cyber City Skyline (Parallax)
        const buildingCount = 14;
        const bWidth = w / buildingCount;
        ctx.fillStyle = '#090d16';
        for (let i = 0; i < buildingCount; i++) {
          const bh = 40 + ((i * 37) % 55);
          ctx.fillRect(i * bWidth, h * 0.55 - bh, bWidth + 1, bh);

          // Glowing Windows
          ctx.fillStyle = (i % 2 === 0) ? '#06b6d4' : '#f59e0b';
          for (let wy = 0; wy < bh - 10; wy += 10) {
            if ((i + wy) % 3 !== 0) {
              ctx.fillRect(i * bWidth + 4, h * 0.55 - bh + wy + 4, 3, 4);
              ctx.fillRect(i * bWidth + bWidth - 7, h * 0.55 - bh + wy + 4, 3, 4);
            }
          }
          ctx.fillStyle = '#090d16';
        }

        // Perspective 3D Neon Grid Floor
        const floorY = h * 0.55;
        const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
        floorGrad.addColorStop(0, '#1e1b4b');
        floorGrad.addColorStop(1, '#020617');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, floorY, w, h - floorY);

        // Grid Horizontal Lines
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        const gridOffset = (state.tick * 1.2) % 24;
        for (let gy = floorY; gy < h; gy += 14) {
          const p = (gy - floorY) / (h - floorY);
          ctx.globalAlpha = 0.15 + p * 0.35;
          ctx.beginPath();
          ctx.moveTo(0, gy + (gridOffset * p));
          ctx.lineTo(w, gy + (gridOffset * p));
          ctx.stroke();
        }

        // Grid Perspective Vertical Lines
        const vpX = w / 2;
        const vpY = floorY - 20;
        ctx.globalAlpha = 0.25;
        for (let vx = -w * 0.5; vx <= w * 1.5; vx += 36) {
          ctx.beginPath();
          ctx.moveTo(vpX, vpY);
          ctx.lineTo(vx, h);
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      }

      // 2. Decrement Timers & State Updates
      if (state.playerStateTimer > 0) {
        state.playerStateTimer--;
        if (state.playerStateTimer === 0) state.playerState = 'idle';
      }
      if (state.rivalStateTimer > 0) {
        state.rivalStateTimer--;
        if (state.rivalStateTimer === 0) state.rivalState = 'idle';
      }

      // 3. Draw Laser Projectiles
      for (let i = state.lasers.length - 1; i >= 0; i--) {
        const laser = state.lasers[i];
        const dx = laser.targetX - laser.x;
        const dy = laser.targetY - laser.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < laser.speed) {
          // Hit target
          laser.active = false;
          state.lasers.splice(i, 1);

          // Trigger hit explosion
          for (let p = 0; p < 12; p++) {
            state.particles.push({
              x: laser.targetX,
              y: laser.targetY,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              size: Math.random() * 4 + 2,
              color: laser.color,
              alpha: 1,
              life: 25,
              maxLife: 25,
            });
          }
        } else {
          laser.x += (dx / dist) * laser.speed;
          laser.y += (dy / dist) * laser.speed;

          // Draw Glowing Laser Bolt
          ctx.fillStyle = laser.color;
          ctx.shadowColor = laser.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(laser.x - 10, laser.y - 3, 20, 6);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(laser.x - 6, laser.y - 1.5, 12, 3);
          ctx.shadowBlur = 0;
        }
      }

      // 4. Draw Robots
      const robotScale = Math.min(1.0, Math.max(0.62, h / 210));
      drawRobot(state.playerX, state.playerY, playerAvatar, state.playerState, true, robotScale);
      drawRobot(state.rivalX, state.rivalY, rival.avatarConfig, state.rivalState, false, robotScale);

      // 5. Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life--;
        p.alpha = p.life / p.maxLife;

        if (p.life <= 0) {
          state.particles.splice(i, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }
      ctx.globalAlpha = 1.0;

      // 6. Draw Floating Text Messages
      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y -= 0.8;
        ft.life--;
        const alpha = ft.life / ft.maxLife;

        if (ft.life <= 0) {
          state.floatingTexts.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `bold ${ft.size}px "Press Start 2P", monospace`;
          ctx.textAlign = 'center';

          // Black Outline
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 4;
          ctx.strokeText(ft.text, ft.x, ft.y);

          // Fill Text
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }

      // 7. Top HUD Over Canvas (Round Score & Crown Status)
      const barW = Math.min(w * 0.32, 140);
      const hudY = 16;

      // Player Score Bars
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(16, hudY, barW, 14);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(16, hudY, barW, 14);

      const pFill = (playerScore / winningScore) * barW;
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(17, hudY + 1, Math.max(0, pFill - 2), 12);

      // Rival Score Bars
      const rX = w - 16 - barW;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(rX, hudY, barW, 14);
      ctx.strokeRect(rX, hudY, barW, 14);

      const rFill = (rivalScore / winningScore) * barW;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(rX + barW - rFill + 1, hudY + 1, Math.max(0, rFill - 2), 12);

      // VS Badge in Center
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeText('VS', w / 2, hudY + 11);
      ctx.fillText('VS', w / 2, hudY + 11);

      // Names below bars
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('P1: JUGADOR', 16, hudY + 26);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(rival.name.toUpperCase(), w - 16, hudY + 26);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
    };
  }, [playerAvatar, rival, playerScore, rivalScore, winningScore, theme]);

  return (
    <div
      ref={containerRef}
      className={`w-full relative overflow-hidden bg-slate-950 border-2 sm:border-4 border-black shadow-[0_3px_0_#000] select-none h-[125px] xs:h-[145px] sm:h-[175px] md:h-[210px] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pixelated"
      />
      {/* 8-bit scanline texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
    </div>
  );
};
