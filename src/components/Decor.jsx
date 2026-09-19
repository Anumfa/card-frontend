import React from 'react';

/*
 * A small library of hand-built SVG ornaments used across the invitation.
 * Everything is vector based so it stays crisp on any screen and needs no
 * external image files.
 */

/* ------------------------------------------------------------------ */
/*  Decorative assets (served by the invitation host)                  */
/* ------------------------------------------------------------------ */
export const ASSETS = {
  doors: 'https://ulfat.vercel.app/content/gulabt.png',
  video: 'https://ulfat.vercel.app/content/dulhan.mp4',
  song: 'https://ulfat.vercel.app/content/bg.mp3',
  balloons: 'https://ulfat.vercel.app/content/balloon.png',
  bird: 'https://ulfat.vercel.app/content/bird.png',
  flowers: 'https://ulfat.vercel.app/content/flowers.png',
  ribbon: 'https://ulfat.vercel.app/content/ribbon.png',
  home: 'https://ulfat.vercel.app/content/home.png',
};

/** Four balloons drifting around a section. */
export const BalloonDecor = () => (
  <>
    <img src={ASSETS.balloons} alt="" className="decor animate-balloon left-[-8px] top-[13%] w-20" draggable="false" />
    <img
      src={ASSETS.balloons}
      alt=""
      className="decor animate-balloon right-[-5px] top-[25%] w-[68px] [animation-delay:-2s]"
      draggable="false"
    />
    <img
      src={ASSETS.balloons}
      alt=""
      className="decor animate-balloon bottom-[12%] right-[14%] w-[58px] [animation-delay:-3.5s]"
      draggable="false"
    />
    <img
      src={ASSETS.balloons}
      alt=""
      className="decor animate-balloon bottom-[8%] left-[13%] w-12 [animation-delay:-1.5s]"
      draggable="false"
    />
  </>
);

/** Two birds flying across a section. */
export const BirdDecor = () => (
  <>
    <img src={ASSETS.bird} alt="" className="decor animate-bird left-[-80px] top-[18%] w-[68px]" draggable="false" />
    <img
      src={ASSETS.bird}
      alt=""
      className="decor animate-bird left-[-80px] top-[35%] w-[50px] [animation-delay:-6s] [animation-duration:17s]"
      draggable="false"
    />
  </>
);

/** Flower cluster pinned to a section corner. */
export const FlowerDecor = ({ side = 'left', width = 145, className = '' }) => (
  <img
    src={ASSETS.flowers}
    alt=""
    draggable="false"
    style={{ width }}
    className={`decor animate-flower z-[4] ${
      side === 'right' ? 'right-[-35px] top-[-10px] rotate-[7deg]' : 'bottom-[-12px] left-[-38px] rotate-[-5deg]'
    } ${className}`}
  />
);

/** Ribbon pinned to a section edge. */
export const RibbonDecor = ({ side = 'left', className = '' }) => (
  <img
    src={ASSETS.ribbon}
    alt=""
    draggable="false"
    className={`decor animate-ribbon z-[6] ${
      side === 'right'
        ? 'right-[-30px] bottom-[15%] w-[105px] rotate-[9deg] [animation-delay:-2s]'
        : 'left-[-35px] top-[16%] w-[115px] rotate-[-8deg]'
    } ${className}`}
  />
);

/** Thin gold rule with a diamond in the middle. */
export const Ornament = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <span className="h-px w-12 bg-[#d0bc91]" />
    <span className="h-1.5 w-1.5 rotate-45 border border-[#c6a15b]" />
    <span className="h-px w-12 bg-[#d0bc91]" />
  </div>
);

/** Gold arch outline — a mihrab-style frame for the velvet sections. */
export const GoldArch = ({ className = '', children, rounded = 'rounded-t-full' }) => (
  <div className={`relative ${className}`}>
    <span className={`pointer-events-none absolute inset-0 ${rounded} border border-[#C6A15B]/45`} />
    <span
      className={`pointer-events-none absolute inset-[9px] ${rounded} border border-[#C6A15B]/25`}
    />
    {children}
  </div>
);

/** Corner filigree for gold frames. */
export const CornerFiligree = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
    <g fill="none" stroke="#C6A15B" strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
      <path d="M4 30 C 4 14, 14 4, 30 4" />
      <path d="M11 33 C 11 19, 19 11, 33 11" opacity="0.6" />
      <path d="M4 40 C 20 40, 40 20, 40 4" opacity="0.4" />
    </g>
    <circle cx="30" cy="4" r="1.8" fill="#E6C68C" />
    <circle cx="4" cy="30" r="1.8" fill="#E6C68C" />
  </svg>
);

/** Gold double frame with filigree corners. */
export const GoldFrame = ({ className = '', children, inner = true }) => (
  <div className={`relative border border-[#C6A15B]/55 ${className}`}>
    {inner && <span className="pointer-events-none absolute inset-[10px] border border-[#C6A15B]/25" />}
    <CornerFiligree className="pointer-events-none absolute left-1.5 top-1.5 h-7 w-7" />
    <CornerFiligree className="pointer-events-none absolute right-1.5 top-1.5 h-7 w-7 -scale-x-100" />
    <CornerFiligree className="pointer-events-none absolute bottom-1.5 left-1.5 h-7 w-7 -scale-y-100" />
    <CornerFiligree className="pointer-events-none absolute bottom-1.5 right-1.5 h-7 w-7 -scale-100" />
    {children}
  </div>
);

/** Twinkling stars for dark surfaces. */
export const Stars = ({ count = 14 }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className="star"
        style={{ left: `${(i * 61) % 96}%`, top: `${(i * 37) % 92}%`, animationDelay: `${(i % 7) * 0.3}s` }}
      />
    ))}
  </div>
);

/** Wax seal used on the opening doors. */
export const WaxSeal = ({ initials = 'F & D', className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <circle cx="60" cy="60" r="52" fill="rgba(198,161,91,0.18)" stroke="#dcc486" strokeWidth="1" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#c6a15b" strokeWidth="0.8" strokeDasharray="2 4" />
    </svg>
    <span className="font-display text-[18px] tracking-[0.12em] text-[#f1e2b8]">{initials}</span>
  </div>
);

/** Two birds in flight (vector fallback for the PNG birds). */
export const Birds = ({ className = '' }) => (
  <svg viewBox="0 0 220 90" className={className} aria-hidden="true" focusable="false">
    <g fill="none" stroke="#9aa9b2" strokeWidth="2.6" strokeLinecap="round">
      <path d="M12 52 C 30 28, 46 26, 56 42 C 66 26, 84 30, 98 50" />
      <path d="M120 34 C 134 14, 148 12, 158 26 C 168 12, 184 16, 196 32" opacity="0.65" />
    </g>
  </svg>
);

/** Simple gold divider used between text blocks. */
export const GoldLine = ({ className = '' }) => (
  <span className={`block h-px bg-[#d0bc91] ${className}`} />
);
