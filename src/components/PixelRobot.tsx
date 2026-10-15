import React from 'react';
import { AvatarConfig } from '../types';

interface PixelRobotProps {
  config: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const PixelRobot: React.FC<PixelRobotProps> = ({
  config,
  size = 'md',
  animated = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const primary = config.primaryColor || '#38bdf8';
  const accent = config.accentColor || '#f59e0b';
  const hasCape = config.capeId && config.capeId !== 'none';
  const capeColor = config.capeId === 'cape_cyber_neon' ? '#06b6d4'
    : config.capeId === 'cape_cosmic_fire' ? '#f97316'
    : config.capeId === 'cape_dragon_gold' ? '#facc15'
    : config.capeId === 'cape_glitch_void' ? '#a855f7'
    : '#ef4444'; // default red

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Aura Effect */}
      {config.auraId && config.auraId !== 'none' && (
        <div className="absolute inset-0 -m-2 pointer-events-none z-0">
          {config.auraId === 'sparkles' && (
            <div className="w-full h-full animate-pulse opacity-75 border-2 border-dashed border-yellow-400 rounded-sm" />
          )}
          {config.auraId === 'matrix' && (
            <div className="w-full h-full animate-pulse opacity-60 bg-emerald-500/20 border border-emerald-400" />
          )}
          {config.auraId === 'fire' && (
            <div className="w-full h-full animate-ping opacity-30 bg-orange-500 rounded-full" />
          )}
          {config.auraId === 'lightning' && (
            <div className="w-full h-full animate-pulse opacity-80 border-2 border-cyan-400 shadow-[0_0_15px_#22d3ee]" />
          )}
        </div>
      )}

      {/* 8-Bit Cape Layer (Behind Robot Body) */}
      {hasCape && (
        <div 
          className={`absolute -bottom-1 -left-2 w-full h-4/5 z-0 origin-top ${animated ? 'animate-[bounce_2s_infinite]' : ''}`}
          style={{ transform: 'rotate(-4deg)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full pixelated drop-shadow-[2px_4px_0px_rgba(0,0,0,0.8)]">
            {/* Cape Pixel Polygon */}
            <path
              d="M 28,30 L 72,30 L 85,85 L 75,90 L 50,82 L 25,90 L 15,85 Z"
              fill={capeColor}
              stroke="#000000"
              strokeWidth="4"
            />
            {/* Cape Inner Fold Shading */}
            <path
              d="M 35,32 L 48,82 L 52,82 L 65,32 Z"
              fill="rgba(0,0,0,0.25)"
            />
            {/* Gold Cape Trim */}
            {config.capeId === 'cape_dragon_gold' && (
              <path
                d="M 15,85 L 25,90 L 50,82 L 75,90 L 85,85 L 80,80 L 50,75 L 20,80 Z"
                fill="#fef08a"
              />
            )}
          </svg>
        </div>
      )}

      {/* Main 8-Bit Robot SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full z-10 pixelated drop-shadow-[0_4px_0_rgba(0,0,0,0.7)] ${
          animated ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''
        }`}
      >
        {/* Head Accessory */}
        {config.accessoryId === 'antenna' && (
          <g>
            <rect x="47" y="6" width="6" height="12" fill="#374151" stroke="#000" strokeWidth="2" />
            <rect x="44" y="2" width="12" height="6" fill={accent} stroke="#000" strokeWidth="2" />
            <circle cx="50" cy="5" r="2" fill="#fff" />
          </g>
        )}

        {config.accessoryId === 'headphones' && (
          <g>
            <path d="M 22,26 A 28,28 0 0,1 78,26" fill="none" stroke="#e11d48" strokeWidth="5" />
            <rect x="18" y="24" width="8" height="16" fill="#be123c" stroke="#000" strokeWidth="2" />
            <rect x="74" y="24" width="8" height="16" fill="#be123c" stroke="#000" strokeWidth="2" />
          </g>
        )}

        {config.accessoryId === 'crown' && (
          <g>
            <polygon points="30,16 38,4 50,12 62,4 70,16" fill="#facc15" stroke="#000" strokeWidth="3" />
            <circle cx="38" cy="6" r="2" fill="#ef4444" />
            <circle cx="50" cy="12" r="2" fill="#3b82f6" />
            <circle cx="62" cy="6" r="2" fill="#22c55e" />
          </g>
        )}

        {config.accessoryId === 'cyber_horns' && (
          <g>
            <polygon points="26,18 20,4 32,14" fill="#ec4899" stroke="#000" strokeWidth="2" />
            <polygon points="74,18 80,4 68,14" fill="#ec4899" stroke="#000" strokeWidth="2" />
          </g>
        )}

        {/* Robot Head */}
        <rect
          x="26"
          y="18"
          width="48"
          height="38"
          fill={primary}
          stroke="#000000"
          strokeWidth="4"
          rx="1"
        />

        {/* Head Highlights / Screws */}
        <rect x="29" y="21" width="4" height="4" fill="rgba(255,255,255,0.6)" />
        <rect x="67" y="21" width="4" height="4" fill="rgba(0,0,0,0.3)" />

        {/* Screen/Faceplate Area */}
        <rect
          x="32"
          y="24"
          width="36"
          height="24"
          fill="#0f172a"
          stroke="#000000"
          strokeWidth="3"
        />

        {/* Eyes & Visor Styles */}
        {config.eyesStyle === 'visor' && (
          <g>
            <rect
              x="36"
              y="30"
              width="28"
              height="8"
              fill={accent}
              stroke="#000000"
              strokeWidth="2"
            />
            {config.visorGlow && (
              <rect x="38" y="32" width="10" height="4" fill="#ffffff" opacity="0.8" />
            )}
          </g>
        )}

        {config.eyesStyle === 'dots' && (
          <g>
            <rect x="38" y="31" width="7" height="7" fill={accent} stroke="#000" strokeWidth="2" />
            <rect x="55" y="31" width="7" height="7" fill={accent} stroke="#000" strokeWidth="2" />
            <rect x="40" y="33" width="2" height="2" fill="#fff" />
            <rect x="57" y="33" width="2" height="2" fill="#fff" />
          </g>
        )}

        {config.eyesStyle === 'cross' && (
          <g stroke={accent} strokeWidth="3" strokeLinecap="square">
            <line x1="38" y1="31" x2="46" y2="39" />
            <line x1="46" y1="31" x2="38" y2="39" />
            <line x1="54" y1="31" x2="62" y2="39" />
            <line x1="62" y1="31" x2="54" y2="39" />
          </g>
        )}

        {config.eyesStyle === 'laser' && (
          <g>
            <rect x="35" y="33" width="30" height="4" fill="#ef4444" />
            <rect x="42" y="34" width="16" height="2" fill="#ffffff" />
          </g>
        )}

        {config.eyesStyle === 'anime' && (
          <g>
            <polygon points="36,36 44,30 44,38" fill={accent} />
            <polygon points="64,36 56,30 56,38" fill={accent} />
            <circle cx="41" cy="33" r="1.5" fill="#fff" />
            <circle cx="59" cy="33" r="1.5" fill="#fff" />
          </g>
        )}

        {/* Dynamic Mouth / Expressions */}
        {config.expression === 'happy' && (
          <path d="M 44,43 Q 50,47 56,43" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="square" />
        )}
        {config.expression === 'thinking' && (
          <rect x="46" y="43" width="8" height="2" fill={accent} />
        )}
        {config.expression === 'shocked' && (
          <rect x="47" y="42" width="6" height="5" fill={accent} stroke="#000" strokeWidth="1" />
        )}
        {config.expression === 'smug' && (
          <line x1="44" y1="44" x2="56" y2="42" stroke={accent} strokeWidth="3" />
        )}
        {(!config.expression || config.expression === 'normal') && (
          <line x1="44" y1="43" x2="56" y2="43" stroke={accent} strokeWidth="2" />
        )}

        {/* Neck */}
        <rect x="44" y="56" width="12" height="6" fill="#334155" stroke="#000000" strokeWidth="2" />

        {/* Robot Body / Chest */}
        <rect
          x="30"
          y="62"
          width="40"
          height="32"
          fill={primary}
          stroke="#000000"
          strokeWidth="4"
          rx="1"
        />

        {/* Chest Core / Gauge */}
        <rect x="42" y="68" width="16" height="12" fill="#1e293b" stroke="#000000" strokeWidth="2" />
        <circle cx="50" cy="74" r="4" fill={accent} />
        <circle cx="51" cy="73" r="1" fill="#ffffff" />

        {/* Robot Arms */}
        <rect x="18" y="66" width="10" height="18" fill="#334155" stroke="#000000" strokeWidth="3" />
        <rect x="72" y="66" width="10" height="18" fill="#334155" stroke="#000000" strokeWidth="3" />
        <rect x="16" y="84" width="12" height="8" fill={primary} stroke="#000000" strokeWidth="2" />
        <rect x="72" y="84" width="12" height="8" fill={primary} stroke="#000000" strokeWidth="2" />
      </svg>
    </div>
  );
};
