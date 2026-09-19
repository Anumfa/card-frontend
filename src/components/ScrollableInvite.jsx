import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronDown, Heart, MapPin, Play, Volume2, VolumeX } from 'lucide-react';
import {
  ASSETS,
  BalloonDecor,
  BirdDecor,
  FlowerDecor,
  GoldArch,
  GoldFrame,
  RibbonDecor,
  Stars,
} from './Decor';

/* ------------------------------------------------------------------ */
/*  Details — edit these in one place                                  */
/* ------------------------------------------------------------------ */
const WEDDING = {
  bride: 'Durre Shahwar',
  brideFull: 'Durre Shahwar Khan',
  groom: 'Farukh Habib',
  groomFull: 'Dr. Farukh Habib',
  dateISO: '2026-11-07T19:00:00',
  day: '07',
  month: 'November',
  year: '2026',
  shortDate: 'November · 2026',
  venue: 'Mirpur Khas, Sindh',
  mapUrl: 'https://maps.google.com/?q=Mirpur+Khas+Sindh',
  song: ASSETS.song,
};

const SCHEDULE = [
  { time: '06:30 PM', title: 'Guest Arrival', detail: 'Welcome, greetings & refreshments' },
  { time: '07:00 PM', title: 'Nikah Ceremony', detail: 'The beautiful beginning of forever' },
  { time: '08:00 PM', title: 'Dinner', detail: 'An evening of delicious food & laughter' },
  { time: '09:00 PM', title: 'Celebration', detail: 'Let us celebrate this beautiful union' },
];

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */
const Section = ({ children, decor = null, className = '', innerClassName = '', pad = 'px-6 py-16' }) => (
  <section
    className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden ${className}`}
  >
    <div className="grain" />
    {decor}
    <div className={`relative z-[5] w-full ${pad} text-center ${innerClassName}`}>{children}</div>
  </section>
);

const Eyebrow = ({ children, className = '' }) => (
  <p className={`text-[9px] uppercase tracking-[0.4em] text-[#C6A15B] ${className}`}>{children}</p>
);

const Display = ({ children, className = '' }) => (
  <h2 className={`gold-text font-display leading-none ${className}`}>{children}</h2>
);

const Serif = ({ children, className = '' }) => (
  <h2 className={`gold-text font-serif leading-[0.95] ${className}`}>{children}</h2>
);

const Body = ({ children, className = '' }) => (
  <p className={`font-serif text-[17px] leading-7 text-[#E6CFA5] ${className}`}>{children}</p>
);

/* ------------------------------------------------------------------ */
/*  Countdown                                                          */
/* ------------------------------------------------------------------ */
const CountdownTimer = () => {
  const target = +new Date(WEDDING.dateISO);

  const calculate = useCallback(() => {
    const diff = target - Date.now();
    if (diff <= 0) return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    return {
      Days: Math.floor(diff / 86400000),
      Hours: Math.floor((diff / 3600000) % 24),
      Minutes: Math.floor((diff / 60000) % 60),
      Seconds: Math.floor((diff / 1000) % 60),
    };
  }, [target]);

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
  }, [calculate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="mt-10 grid grid-cols-4 gap-1.5 sm:gap-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="border-y border-[#C6A15B]/45 bg-[#240407]/30 px-1 py-4"
        >
          <div className="gold-text font-display text-[clamp(22px,6.5vw,32px)] leading-none">
            {pad(value)}
          </div>
          <div className="mt-2 text-[8px] uppercase tracking-[0.28em] text-[#C6A15B]/80">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero — curtain video                                               */
/* ------------------------------------------------------------------ */
const Hero = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const finish = useCallback(() => {
    setFinished(true);
    onFinish();
  }, [onFinish]);

  const start = useCallback(() => {
    setStarted(true);
    const video = videoRef.current;
    if (video) video.play().catch(finish);
  }, [finish]);

  // reveals the names if the video cannot play
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(finish, 45000);
    return () => clearTimeout(timer);
  }, [started, finish]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#3c070c]">
      <video
        ref={videoRef}
        src={ASSETS.video}
        muted
        playsInline
        preload="metadata"
        onClick={start}
        onEnded={finish}
        className={`absolute inset-0 z-[1] h-full w-full cursor-pointer object-cover transition-opacity duration-[1500ms] ${
          finished ? 'opacity-80' : 'opacity-100'
        }`}
      />

      <div className="grain z-[2]" />

      {/* velvet veil — keeps the red curtain look and hides the lettering baked into the video */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,rgba(36,4,7,0.93)_0%,rgba(60,7,12,0.87)_45%,rgba(94,15,22,0.64)_74%,rgba(140,31,40,0.44)_100%)] backdrop-blur-[6px] transition-opacity duration-[1400ms] ${
          started ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* tap to begin */}
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label="Play invitation video"
          className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center gap-3.5"
        >
          <span className="animate-play flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/75 bg-white/[0.12] backdrop-blur-md sm:h-[76px] sm:w-[76px]">
            <Play className="ml-1 h-6 w-6 fill-white text-white" />
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.4)]">
            Tap to begin
          </span>
        </button>
      )}

      {/* names — over the video from the moment it starts */}
      <div
        className={`relative z-[15] px-7 py-14 text-center transition-all duration-[1400ms] ${
          started ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B]">
          Together with their families
        </p>

        <h1 className="gold-text mt-4 font-serif text-[clamp(38px,11.5vw,64px)] italic leading-[0.88] font-normal">
          {WEDDING.bride}
          <span className="my-1 block font-serif text-[0.42em] italic text-[#E6CFA5]">&amp;</span>
          {WEDDING.groom}
        </h1>

        <p className="mt-5 font-serif text-[19px] italic text-[#E6CFA5] sm:text-[22px]">
          are getting married
        </p>

        <div className="mt-6 flex items-center justify-center gap-3.5">
          <span className="gold-hairline h-px w-11" />
          <Heart className="h-4 w-4 fill-[#C6A15B] text-[#C6A15B]" />
          <span className="gold-hairline h-px w-11" />
        </div>

        <p className="mt-5 font-serif text-[18px] italic text-[#E6CFA5]">{WEDDING.shortDate}</p>

        <p
          className={`mt-7 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] transition-opacity duration-1000 ${
            finished ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Scroll to continue <ChevronDown className="h-4 w-4" />
        </p>
      </div>

      {/* decorations */}
      <BalloonDecor />
      <BirdDecor />
      <FlowerDecor side="left" />
      <FlowerDecor side="right" width={125} />
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Invitation                                                         */
/* ------------------------------------------------------------------ */
const ScrollableInvite = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);

  // background song — started from the link, resumed on the first interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;

    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const resume = () => {
      tryPlay();
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
      window.removeEventListener('touchstart', resume);
    };

    window.addEventListener('pointerdown', resume);
    window.addEventListener('keydown', resume);
    window.addEventListener('touchstart', resume);

    return () => {
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
      window.removeEventListener('touchstart', resume);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = isMuted;
  }, [isMuted]);

  // lock the page while the intro video plays
  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDone]);

  useEffect(() => {
    const onScroll = () => {
      const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setShowScrollCue(remaining > 160);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollDown = () => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-x-hidden bg-[#140306]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <audio ref={audioRef} src={WEDDING.song} preload="auto" />

      {/* music toggle */}
      <button
        type="button"
        onClick={() => setIsMuted((v) => !v)}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="fixed right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/60 bg-[#240407]/60 text-[#F0D79C] backdrop-blur-md transition hover:bg-[#240407]/85 md:right-[calc(50%-240px+0.75rem)]"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <main className="velvet-deep relative mx-auto w-full max-w-[480px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.6)]">
        {/* ============================ HERO ============================ */}
        <Hero onFinish={() => setIntroDone(true)} />

        {/* ========================== BISMILLAH ========================== */}
        <Section
          className="velvet-deep"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <FlowerDecor side="left" />
              <FlowerDecor side="right" width={125} />
            </>
          }
        >
          <GoldArch className="mx-auto w-full max-w-[330px] px-5 pb-10 pt-14">
            <Eyebrow>In the name of Allah</Eyebrow>
            <p className="arabic mt-7 text-[clamp(26px,7vw,34px)] text-[#F0D79C]">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
            <Serif className="mt-6 text-[clamp(30px,9vw,44px)]">With love, we begin.</Serif>
            <Body className="mx-auto mt-5 max-w-[270px] text-[15px]">
              In the name of Allah, we begin a beautiful journey and invite you to share this
              precious moment with us.
            </Body>
            <div className="gold-hairline mx-auto mt-7 h-px w-28" />
          </GoldArch>
        </Section>

        {/* ========================== COUNTDOWN ========================== */}
        <Section
          className="velvet-mid"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <RibbonDecor side="left" />
              <BalloonDecor />
            </>
          }
        >
          <div className="relative z-[5] w-full px-6 py-14 text-center">
            <Eyebrow>Until forever begins</Eyebrow>
            <Display className="mt-3 text-[clamp(32px,9vw,50px)]">Counting the days</Display>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="gold-hairline h-px w-14" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />
              <span className="gold-hairline h-px w-14" />
            </div>
            <CountdownTimer />
            <p className="mt-7 font-serif text-[17px] italic text-[#E6CFA5]">until we say “I do”</p>
          </div>
        </Section>

        {/* ========================== SAVE THE DATE ========================== */}
        <Section
          className="velvet"
          pad="px-6 py-16"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <FlowerDecor side="right" />
            </>
          }
        >
          <GoldFrame className="mx-auto flex min-h-[60svh] w-full max-w-[400px] items-center justify-center bg-[#240407]/35 backdrop-blur-[1px]">
            <div className="relative px-6 py-12 text-center">
              <Eyebrow>Save the date</Eyebrow>
              <div className="gold-text mt-4 font-display text-[clamp(76px,24vw,112px)] leading-none">
                {WEDDING.day}
              </div>
              <p className="mt-3 text-[clamp(17px,5vw,22px)] uppercase tracking-[0.35em] text-[#E6CFA5]">
                {WEDDING.month}
              </p>
              <p className="gold-text mt-2 font-display text-[clamp(21px,5.5vw,28px)]">
                {WEDDING.year}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="gold-hairline h-px w-12" />
                <span className="h-1.5 w-1.5 rotate-45 border border-[#C6A15B]" />
                <span className="gold-hairline h-px w-12" />
              </div>
              <p className="mt-5 text-[9px] uppercase tracking-[0.35em] text-[#C6A15B]">
                Nikah at 07:00 PM
              </p>
            </div>
          </GoldFrame>
        </Section>

        {/* ========================== CELEBRATION ========================== */}
        <Section
          className="velvet-deep"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <Stars count={22} />
              <BalloonDecor />
            </>
          }
        >
          <GoldArch className="mx-auto w-full max-w-[330px] px-5 pb-10 pt-16">
            <Eyebrow>The celebration</Eyebrow>
            <Serif className="mt-4 text-[clamp(30px,9vw,46px)]">
              Come celebrate
              <br />
              with us.
            </Serif>
            <p className="mx-auto mt-5 max-w-[250px] font-serif text-[16px] leading-7 text-[#E6CFA5]">
              Your presence will make our happiness complete and our celebration unforgettable.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="gold-hairline h-px w-12" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#C6A15B]" />
              <span className="gold-hairline h-px w-12" />
            </div>
          </GoldArch>
        </Section>

        {/* ========================== SCHEDULE ========================== */}
        <Section
          className="velvet-mid"
          pad="px-7 py-20"
          innerClassName="text-left"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <FlowerDecor side="left" />
              <BirdDecor />
            </>
          }
        >
          <div className="relative z-[5] w-full">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A15B]">Wedding day</p>
            <Serif className="mt-3 text-[clamp(32px,9.5vw,52px)]">The Schedule</Serif>
            <div className="gold-hairline mt-4 h-px w-24" />

            <ol className="ml-2 mt-11 border-l border-[#C6A15B]/40 pl-6 sm:pl-7">
              {SCHEDULE.map(({ time, title, detail }) => (
                <li key={time} className="relative mb-10 last:mb-0">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rotate-45 border border-[#C6A15B] bg-[#5e0f16] sm:-left-[35px]" />
                  <p className="font-display text-[15px] tracking-[0.1em] text-[#C6A15B]">{time}</p>
                  <h3 className="mt-1 font-serif text-[25px] leading-tight text-[#F6E6C6]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-[#C2A187]">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ========================== VENUE ========================== */}
        <Section
          className="velvet"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <RibbonDecor side="right" />
              <RibbonDecor side="left" className="!top-[64%]" />
              <BirdDecor />
            </>
          }
        >
          <div className="relative z-[5] w-full px-6 py-16 text-center">
            <Eyebrow>Where we gather</Eyebrow>
            <Serif className="mt-3 text-[clamp(32px,9.5vw,52px)]">The Venue</Serif>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="gold-hairline h-px w-14" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />
              <span className="gold-hairline h-px w-14" />
            </div>

            <div className="mx-auto mt-7 w-full max-w-[240px] rounded-full bg-[radial-gradient(circle,rgba(255,226,173,0.18),transparent_70%)] p-4">
              <img
                src={ASSETS.home}
                alt="Wedding venue illustration"
                draggable="false"
                className="animate-home w-full drop-shadow-[0_18px_26px_rgba(0,0,0,0.55)]"
              />
            </div>

            <p className="mt-6 font-display text-[clamp(19px,5.5vw,26px)] text-[#F0D79C]">
              {WEDDING.venue}
            </p>

            <a
              href={WEDDING.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-band mt-6 inline-flex items-center justify-center gap-2 px-7 py-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#3B2408] shadow-[0_12px_26px_rgba(0,0,0,0.5)] transition hover:brightness-105"
            >
              <MapPin className="h-3.5 w-3.5" />
              View location
            </a>
          </div>
        </Section>

        {/* ========================== RSVP ========================== */}
        <Section
          className="velvet-deep"
          decor={
            <>
              <div className="velvet-glow pointer-events-none absolute inset-0" />
              <BalloonDecor />
              <FlowerDecor side="right" width={130} />
            </>
          }
        >
          <GoldArch className="mx-auto w-full max-w-[330px] px-5 pb-10 pt-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A15B]/70 text-[#C6A15B]">
              <CalendarDays className="h-6 w-6" />
            </div>
            <Eyebrow className="mt-6">We would love to see you</Eyebrow>
            <Display className="mt-3 text-[clamp(40px,12vw,62px)]">RSVP</Display>
            <Body className="mx-auto mt-5 max-w-[270px] text-[17px]">
              Kindly let us know if you can join us — we are saving a seat in your name.
            </Body>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="gold-hairline h-px w-12" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />
              <span className="gold-hairline h-px w-12" />
            </div>
            <p className="mt-5 font-serif text-[20px] italic text-[#F0D79C]">
              We can’t wait to celebrate with you
            </p>
          </GoldArch>
        </Section>

        <footer className="velvet-deepest relative px-6 py-12 text-center">
          <div className="gold-hairline mx-auto h-px w-40" />
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A15B]" />
          </div>
          <p className="mt-5 font-serif text-[19px] italic text-[#F0D79C]">
            {WEDDING.brideFull}
          </p>
          <p className="mt-1 font-serif text-[16px] italic text-[#C6A15B]">&amp;</p>
          <p className="mt-1 font-serif text-[19px] italic text-[#F0D79C]">
            {WEDDING.groomFull}
          </p>
          <p className="mt-5 text-[9px] uppercase tracking-[0.4em] text-[#C6A15B]/70">
            {WEDDING.day} {WEDDING.month} {WEDDING.year}
          </p>
        </footer>
      </main>

      {/* floating scroll cue */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className={`fixed bottom-4 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#C6A15B]/60 bg-[#240407]/60 text-[#F0D79C] backdrop-blur-md transition-all duration-500 hover:bg-[#240407]/85 md:right-[calc(50%-240px+0.75rem)] ${
          showScrollCue ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default ScrollableInvite;



