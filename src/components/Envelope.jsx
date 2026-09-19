import React, { useEffect, useState } from 'react';
import { Stars, WaxSeal } from './Decor';

/*
 * Opening scene: two red velvet curtain panels swing apart to reveal the card.
 * Clicking anywhere on the scene opens them.
 */

/** Hanging gold tassel. */
const Tassel = ({ className = '' }) => (
  <span className={`flex flex-col items-center ${className}`}>
    <span className="block h-6 w-px bg-[#C6A15B]/70" />
    <span className="block h-3 w-2 rounded-b-full bg-gradient-to-b from-[#E6C68C] to-[#8A682F]" />
  </span>
);

const Envelope = ({ onOpen }) => {
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState(false);

  // brief loading beat so the fonts settle before the curtain is shown
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    window.setTimeout(onOpen, 1750);
  };

  const doorClass =
    'velvet absolute top-0 z-[2000] h-full w-1/2 cursor-pointer overflow-hidden transition-transform duration-[2100ms] ease-[cubic-bezier(.76,0,.24,1)] [backface-visibility:hidden] will-change-transform';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#120204]">
      <div
        className="relative h-full min-h-[100svh] w-full max-w-[480px] overflow-hidden bg-[radial-gradient(circle_at_center,#6d1119_0%,#3c070c_55%,#1b0204_100%)]"
        style={{ perspective: '1600px' }}
      >
        {/* warm light seeping from behind the curtains */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,214,150,0.32),transparent_70%)] blur-[12px]" />

        {/* ---------- left curtain ---------- */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Open invitation"
          onClick={handleOpen}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
          style={{ transformOrigin: 'left center' }}
          className={`${doorClass} left-0 ${
            opened ? '[transform:perspective(1200px)_rotateY(-105deg)_translateX(-8%)]' : ''
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 right-0 w-[7px] gold-band opacity-95" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-9 bg-gradient-to-l from-black/55 to-transparent" />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/45 to-transparent" />
        </div>

        {/* ---------- right curtain ---------- */}
        <div
          aria-hidden="true"
          onClick={handleOpen}
          style={{ transformOrigin: 'right center' }}
          className={`${doorClass} right-0 ${
            opened ? '[transform:perspective(1200px)_rotateY(105deg)_translateX(8%)]' : ''
          }`}
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 w-[7px] gold-band opacity-95" />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-9 bg-gradient-to-r from-black/55 to-transparent" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/45 to-transparent" />
        </div>

        {/* ---------- gold valance stays put while the curtains open ---------- */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2060]">
          <div className="gold-band h-8 shadow-[0_8px_20px_rgba(0,0,0,0.55)]" />
          <div className="valance gold-band -mt-px h-5" />
          <div
            className={`absolute inset-x-0 top-[50px] flex justify-around transition-opacity duration-700 ${
              opened ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Tassel key={i} />
            ))}
          </div>
        </div>

        {/* ---------- wax seal ---------- */}
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 z-[2100] -translate-x-1/2 -translate-y-1/2 transition-all duration-[900ms] ${
            opened ? 'scale-[1.35] opacity-0' : 'opacity-100'
          }`}
        >
          <WaxSeal
            initials="D & F"
            className="animate-play h-32 w-32 rounded-full border border-[#C6A15B]/40 bg-[#240407]/55 backdrop-blur-[2px]"
          />
        </div>

        {/* ---------- floating dust ---------- */}
        {!opened && <Stars count={16} />}

        {/* ---------- brand + hint ---------- */}
        <div
          className={`absolute inset-x-0 bottom-10 z-[2100] text-center transition-opacity duration-700 ${
            opened ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="font-serif text-[19px] italic text-[#F0D79C]">Wedding Invitation</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C6A15B]/70" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />
            <span className="h-px w-10 bg-[#C6A15B]/70" />
          </div>
          <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-[#E6CFA5]">Tap to begin</p>
        </div>

        {/* ---------- loader ---------- */}
        <div
          className={`velvet-deep absolute inset-0 z-[2200] flex flex-col items-center justify-center gap-3 transition-opacity duration-700 ${
            ready ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <p className="font-display text-[15px] tracking-[0.35em] text-[#F0D79C]">
            WEDDING INVITES
          </p>
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A15B]/70">
            Loading invitation…
          </p>
        </div>
      </div>
    </div>
  );
};

export default Envelope;
