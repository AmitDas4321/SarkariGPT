import React from 'react';

/**
 * High-fidelity Vector Assets for Government of India portal
 */

// State Emblem of India (Ashoka Lion Capital)
export const AshokaEmblem: React.FC<{ className?: string; color?: string; showText?: boolean }> = ({
  className = "w-12 h-14",
  color = "#222222",
  showText = true
}) => (
  <div className={`flex flex-col items-center select-none ${className}`}>
    <svg viewBox="0 0 100 135" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Top Lions */}
      <g fill={color}>
        {/* Center Lion Head */}
        <path d="M50 8 C44 8 40 12 39 16 C38 20 40 25 43 28 C41 31 39 36 39 42 C39 46 41 50 44 53 L45 55 C46 52 48 49 50 49 C52 49 54 52 55 55 L56 53 C59 50 61 46 61 42 C61 36 59 31 57 28 C60 25 62 20 61 16 C60 12 56 8 50 8 Z" />
        {/* Center Lion Face Details */}
        <circle cx="46" cy="22" r="1.8" fill="#fff" />
        <circle cx="54" cy="22" r="1.8" fill="#fff" />
        <circle cx="46" cy="22" r="0.9" fill={color} />
        <circle cx="54" cy="22" r="0.9" fill={color} />
        <path d="M48 26 L52 26 L50 29 Z" fill="#fff" />
        <path d="M45 33 Q50 36 55 33" stroke="#fff" strokeWidth="1.2" fill="none" />
        {/* Center Mane details */}
        <path d="M42 36 Q38 42 42 48 Q46 51 50 51 Q54 51 58 48 Q62 42 58 36" fill={color} stroke="#fff" strokeWidth="0.8" />
        <path d="M45 42 Q50 46 55 42" stroke="#fff" strokeWidth="0.8" />
        
        {/* Left Lion Head (Profile) */}
        <path d="M38 18 C33 16 26 19 25 24 C24 29 27 34 30 37 C27 41 26 47 28 53 L32 58 C34 54 36 50 38 46 L37 38 C35 34 34 28 38 23 Z" />
        <circle cx="29" cy="27" r="1.5" fill="#fff" />
        <circle cx="29" cy="27" r="0.7" fill={color} />
        <path d="M25 31 Q28 33 31 31" stroke="#fff" strokeWidth="0.8" fill="none" />
        <path d="M28 38 Q25 44 30 49" stroke="#fff" strokeWidth="0.8" fill="none" />
        
        {/* Right Lion Head (Profile) */}
        <path d="M62 18 C67 16 74 19 75 24 C76 29 73 34 70 37 C73 41 74 47 72 53 L68 58 C66 54 64 50 62 46 L63 38 C65 34 66 28 62 23 Z" />
        <circle cx="71" cy="27" r="1.5" fill="#fff" />
        <circle cx="71" cy="27" r="0.7" fill={color} />
        <path d="M75 31 Q72 33 69 31" stroke="#fff" strokeWidth="0.8" fill="none" />
        <path d="M72 38 Q75 44 70 49" stroke="#fff" strokeWidth="0.8" fill="none" />
        
        {/* Lion Chests and Paws */}
        <path d="M34 54 L32 72 L42 74 L44 58 Z" />
        <path d="M66 54 L68 72 L58 74 L56 58 Z" />
        <path d="M44 56 L44 74 L56 74 L56 56 Z" />
        <path d="M32 70 Q32 75 38 75 L62 75 Q68 75 68 70 Z" fill={color} />

        {/* Abacus platform */}
        <rect x="18" y="75" width="64" height="15" rx="2" fill={color} />
        {/* Center Ashoka Chakra on abacus */}
        <circle cx="50" cy="82.5" r="6" fill="#fff" />
        <circle cx="50" cy="82.5" r="5" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="50" cy="82.5" r="1.2" fill={color} />
        {/* Spokes on abacus chakra */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="82.5"
            x2={50 + 4.8 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={82.5 + 4.8 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke={color}
            strokeWidth="0.7"
          />
        ))}

        {/* Bull on left of abacus */}
        <path d="M26 80 C24 78 22 79 21 82 C20 85 22 86 25 85 C27 84 29 83 29 80 Z" fill="#fff" />
        {/* Horse on right of abacus */}
        <path d="M74 80 C76 78 78 79 79 82 C80 85 78 86 75 85 C73 84 71 83 71 80 Z" fill="#fff" />

        {/* Lotus Base / Bell */}
        <path d="M22 91 Q50 96 78 91 L76 100 Q50 106 24 100 Z" fill={color} />
        {/* Lotus petals lines */}
        <path d="M30 92 Q35 101 40 93" stroke="#fff" strokeWidth="0.8" fill="none" />
        <path d="M40 93 Q45 102 50 94" stroke="#fff" strokeWidth="0.8" fill="none" />
        <path d="M50 94 Q55 102 60 93" stroke="#fff" strokeWidth="0.8" fill="none" />
        <path d="M60 93 Q65 101 70 92" stroke="#fff" strokeWidth="0.8" fill="none" />
        
        {/* Bottom pedestal */}
        <rect x="20" y="101" width="60" height="4" fill={color} />
      </g>
    </svg>
    {showText && (
      <span className="text-[9px] font-bold tracking-wider text-[#222222] font-['Noto_Sans_Devanagari'] -mt-1 select-none">
        सत्यमेव जयते
      </span>
    )}
  </div>
);

// India Gate Monument Graphic
export const IndiaGateGraphic: React.FC<{ className?: string }> = ({
  className = "w-20 h-20"
}) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
      <defs>
        <linearGradient id="sandstoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e89358" />
          <stop offset="50%" stopColor="#d17438" />
          <stop offset="100%" stopColor="#b45821" />
        </linearGradient>
        <linearGradient id="archShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a3610" />
          <stop offset="100%" stopColor="#3d1804" />
        </linearGradient>
      </defs>

      {/* Base platform */}
      <rect x="15" y="105" width="90" height="6" fill="#b45821" rx="1" />
      <rect x="20" y="100" width="80" height="5" fill="#d17438" />
      <rect x="25" y="96" width="70" height="4" fill="#e89358" />

      {/* Main Pillars */}
      {/* Left Pillar */}
      <rect x="28" y="32" width="22" height="64" fill="url(#sandstoneGrad)" />
      {/* Left pillar decorative molding */}
      <rect x="26" y="52" width="26" height="3" fill="#9c4515" />
      <rect x="27" y="32" width="24" height="4" fill="#f3a46d" />

      {/* Right Pillar */}
      <rect x="70" y="32" width="22" height="64" fill="url(#sandstoneGrad)" />
      {/* Right pillar decorative molding */}
      <rect x="68" y="52" width="26" height="3" fill="#9c4515" />
      <rect x="69" y="32" width="24" height="4" fill="#f3a46d" />

      {/* Main Archway Void */}
      <path d="M50 96 L50 56 Q60 42 70 56 L70 96 Z" fill="url(#archShadow)" />
      {/* Arch inner border */}
      <path d="M50 96 L50 56 Q60 42 70 56 L70 96" stroke="#f3a46d" strokeWidth="1.5" fill="none" />

      {/* Upper Entablature */}
      <rect x="24" y="24" width="72" height="8" fill="#d17438" />
      <rect x="22" y="21" width="76" height="3" fill="#b45821" />

      {/* Top Inscription Attic Level */}
      <rect x="28" y="10" width="64" height="11" fill="url(#sandstoneGrad)" />
      {/* Inscription line */}
      <line x1="33" y1="15" x2="87" y2="15" stroke="#7a3610" strokeWidth="1.2" strokeDasharray="3 2" />

      {/* Top Bowl / Dome */}
      <path d="M45 10 Q60 5 75 10 Z" fill="#b45821" />
      <rect x="42" y="9" width="36" height="2" fill="#e89358" />

      {/* Side small arches */}
      <path d="M33 75 L33 60 Q39 53 45 60 L45 75 Z" fill="#8d3d14" />
      <path d="M75 75 L75 60 Q81 53 87 60 L87 75 Z" fill="#8d3d14" />
    </svg>
  </div>
);

// Ashoka Chakra (24-spoke wheel)
export const AshokaChakra: React.FC<{ className?: string; color?: string }> = ({
  className = "w-14 h-14",
  color = "#123f78"
}) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="4.5" />
      <circle cx="50" cy="50" r="41" stroke={color} strokeWidth="1.2" />

      {/* Center Hub */}
      <circle cx="50" cy="50" r="8" fill={color} />
      <circle cx="50" cy="50" r="4" fill="#ffffff" />
      <circle cx="50" cy="50" r="2" fill={color} />

      {/* 24 Spokes */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const xOuter = 50 + 41 * Math.cos(rad);
        const yOuter = 50 + 41 * Math.sin(rad);
        return (
          <g key={i}>
            <line
              x1="50"
              y1="50"
              x2={xOuter}
              y2={yOuter}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Small diamond/wedge at rim between spokes */}
            <circle
              cx={50 + 43.5 * Math.cos(((angle + 7.5) * Math.PI) / 180)}
              cy={50 + 43.5 * Math.sin(((angle + 7.5) * Math.PI) / 180)}
              r="1.2"
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

// Digital India Logo
export const DigitalIndiaLogo: React.FC<{ className?: string }> = ({
  className = "h-8"
}) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    {/* Spiral Icon */}
    <svg viewBox="0 0 50 50" className="h-full w-auto">
      <defs>
        <linearGradient id="diOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="100%" stopColor="#FF6600" />
        </linearGradient>
        <linearGradient id="diBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006699" />
          <stop offset="100%" stopColor="#003366" />
        </linearGradient>
        <linearGradient id="diGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#339933" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
      </defs>
      {/* Dynamic Ribbon Swoosh */}
      <path d="M12 36 C8 24 16 10 30 8 C40 6 46 14 44 24 C42 34 32 42 20 40 C14 39 12 32 16 28 C20 24 28 26 30 32 C31 36 28 38 24 38" 
            stroke="url(#diOrange)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M20 38 C32 40 40 32 40 22 C40 12 30 8 20 12 C12 16 10 26 14 34" 
            stroke="url(#diBlue)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="28" cy="24" r="3" fill="#003366" />
    </svg>
    <div className="flex flex-col text-left text-white leading-tight">
      <span className="text-[11px] font-extrabold tracking-tight font-sans">Digital India</span>
      <span className="text-[6.5px] tracking-wide text-gray-200 uppercase">Power To Empower</span>
    </div>
  </div>
);

// MeitY Logo (Ministry of Electronics & Information Technology)
export const MeitYLogo: React.FC<{ className?: string }> = ({
  className = "h-8"
}) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <div className="w-5 h-6">
      <AshokaEmblem className="w-5 h-6" color="#ffffff" showText={false} />
    </div>
    <div className="flex flex-col text-left text-white leading-none">
      <span className="text-[11px] font-extrabold tracking-wide">MeitY</span>
      <span className="text-[6.5px] text-gray-300">Government of India</span>
    </div>
  </div>
);

// myGov Logo
export const MyGovLogo: React.FC<{ className?: string }> = ({
  className = "h-8"
}) => (
  <div className={`flex items-center ${className}`}>
    <div className="flex items-baseline">
      <span className="text-[#3bb8e8] font-bold text-base tracking-tighter">my</span>
      <span className="text-white font-extrabold text-lg tracking-tight -ml-0.5">GOV</span>
    </div>
    <div className="ml-1 text-[7px] text-[#f7a440] font-semibold leading-tight font-['Noto_Sans_Devanagari']">
      मेरी सरकार
    </div>
  </div>
);
