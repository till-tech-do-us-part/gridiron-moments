import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { trendingMoments, slabConfig } from '@/data/siteData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MomentSlab } from '@/types';

/**
 * Hybrid Approach C — CSS 3D transforms + embedded video front face
 *
 * Four-phase interaction sequence per design analysis:
 *  Phase 1 (Idle):  Slab at rotateY(-15deg), poster/thumbnail visible, neon glow at base intensity
 *  Phase 2 (Hover): Subtle glow intensification, no rotation
 *  Phase 3 (Dwell): After ~2s dwell, continuous Y-axis rotation + video playback begins
 *  Phase 4 (Exit):  Smooth deceleration back to idle angle, video pauses
 */

function MomentSlabCard({ moment }: { moment: MomentSlab }) {
  const slabWidth = 240;
  const slabHeight = 320;
  const { depth } = slabConfig;

  const videoRef = useRef<HTMLVideoElement>(null);
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const isLegendary = moment.rarity === 'legendary' || moment.rarity === 'ultimate';

  // Phase 2 → Phase 3: Dwell trigger after ~1 second
  const handleMouseEnter = useCallback(() => {
    dwellTimerRef.current = setTimeout(() => {
      setIsRotating(true);
      if (videoRef.current && moment.videoUrl && !videoFailed) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          // Only treat MediaError (decode/network failure) as permanent.
          // AbortError (play interrupted by pause) and NotAllowedError
          // (autoplay policy) are transient — video will work on next hover.
          if (err.name === 'NotSupportedError') {
            setVideoFailed(true);
          }
          // AbortError / NotAllowedError are ignored — retry on next hover
        });
      }
    }, slabConfig.dwellDelay * 1000);
  }, [moment.videoUrl, videoFailed]);

  // Phase 4: Hover exit — decelerate, stop rotation, pause video
  const handleMouseLeave = useCallback(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    setIsRotating(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
    };
  }, []);

  // Compute edge glow box-shadow per rarity tier
  const edgeGlow = `0 0 20px ${moment.glowColor}66, 0 0 40px ${moment.glowColor}33`;
  const edgeGlowIntense = `0 0 25px ${moment.glowColor}, 0 0 50px ${moment.glowColor}66, inset 0 0 15px ${moment.glowColor}33`;

  return (
    <motion.div
      variants={fadeInUp}
      className="flex-shrink-0 flex flex-col items-center gap-4 cursor-pointer group"
      style={{ width: slabWidth + 40 }}
    >
      {/* 3D Slab Container — perspective origin */}
      <div
        className="slab-container"
        style={{ width: slabWidth, height: slabHeight }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`slab relative ${isRotating ? 'slab--rotating' : ''} ${isLegendary ? 'slab--legendary' : ''}`}
          style={{
            width: slabWidth,
            height: slabHeight,
            ['--neon-color' as string]: moment.glowColor,
            ['--slab-depth' as string]: `${depth}px`,
          }}
        >
          {/* ──── FRONT FACE: Video + poster image ──── */}
          <div className={`slab__face slab__front rounded-xl overflow-hidden ${isPlaying ? 'slab__front--playing' : ''}`}>
            {/* Poster image (visible at idle, hidden when video plays) */}
            <img
              src={moment.image}
              alt={moment.playerName}
              className="slab__poster"
            />

            {/* Pre-rendered video element (plays on dwell trigger) */}
            {moment.videoUrl && !videoFailed && (
              <video
                ref={videoRef}
                src={moment.videoUrl}
                className="slab__video absolute inset-0"
                muted
                loop
                playsInline
                preload="metadata"
                style={{ opacity: isPlaying ? 1 : 0, transition: 'opacity 0.4s ease' }}
                onError={() => setVideoFailed(true)}
              />
            )}

            {/* Front face overlay — player info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-[3]">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-white">
                {moment.playerName}
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">{moment.playType}</div>
            </div>

            {/* Neon corner accents — rarity indicator */}
            <div className="slab__neon-corner slab__neon-corner--tl"
              style={{
                ['--neon-color' as string]: moment.glowColor,
                boxShadow: `0 0 12px ${moment.glowColor}60, inset 0 0 8px ${moment.glowColor}30`,
              }}
            />
            <div className="slab__neon-corner slab__neon-corner--tr"
              style={{
                ['--neon-color' as string]: moment.glowColor,
                boxShadow: `0 0 12px ${moment.glowColor}60, inset 0 0 8px ${moment.glowColor}30`,
              }}
            />
            <div className="slab__neon-corner slab__neon-corner--bl"
              style={{
                ['--neon-color' as string]: moment.glowColor,
                boxShadow: `0 0 12px ${moment.glowColor}60, inset 0 0 8px ${moment.glowColor}30`,
              }}
            />
            <div className="slab__neon-corner slab__neon-corner--br"
              style={{
                ['--neon-color' as string]: moment.glowColor,
                boxShadow: `0 0 12px ${moment.glowColor}60, inset 0 0 8px ${moment.glowColor}30`,
              }}
            />
          </div>

          {/* ──── BACK FACE ──── */}
          <div className="slab__face slab__back rounded-xl border border-white/[0.06]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <div className="font-display font-black text-lg text-white uppercase">{moment.playerName}</div>
                <div className="text-xs text-white/40 mt-1">{moment.serial}</div>
                <div className="font-display font-bold text-gold text-lg mt-2">{moment.price}</div>
                <div className="mt-3 px-3 py-1 rounded-md text-[10px] font-display font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${moment.glowColor}30`, color: moment.glowColor }}>
                  {moment.rarity}
                </div>
              </div>
            </div>
          </div>

          {/* ──── RIGHT EDGE FACE — neon glow ──── */}
          <div
            className="slab__face slab__edge slab__right"
            style={{
              width: depth,
              transform: `rotateY(90deg) translateZ(${slabWidth - depth}px)`,
              boxShadow: isLegendary ? edgeGlowIntense : edgeGlow,
            }}
          />

          {/* ──── LEFT EDGE FACE — neon glow ──── */}
          <div
            className="slab__face slab__edge slab__left"
            style={{
              width: depth,
              transform: `rotateY(-90deg) translateZ(0px)`,
              boxShadow: isLegendary ? edgeGlowIntense : edgeGlow,
            }}
          />

          {/* ──── TOP FACE ──── */}
          <div
            className="slab__face slab__edge slab__top"
            style={{
              height: depth,
              transform: `rotateX(90deg) translateZ(0px)`,
              boxShadow: isLegendary ? `0 0 15px ${moment.glowColor}80` : `0 0 15px ${moment.glowColor}30`,
            }}
          />

          {/* ──── BOTTOM FACE ──── */}
          <div
            className="slab__face slab__edge slab__bottom"
            style={{
              height: depth,
              transform: `rotateX(-90deg) translateZ(${slabHeight - depth}px)`,
              boxShadow: isLegendary ? `0 0 15px ${moment.glowColor}80` : `0 0 15px ${moment.glowColor}30`,
            }}
          />
        </div>
      </div>

      {/* Info below slab */}
      <div className="text-center w-full">
        <div className="font-display font-bold text-sm uppercase text-white truncate">
          {moment.playerName}
        </div>
        <div className="text-[11px] text-white/40 mt-0.5">{moment.serial}</div>
        <div className="font-display font-bold text-gold text-sm mt-1">{moment.price}</div>
      </div>
    </motion.div>
  );
}

export function TrendingMoments() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
      >
        {/* Header */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 mb-12">
          <div className="flex items-end justify-between">
            <div>
              <motion.span
                variants={fadeInUp}
                className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-3"
              >
                Trending
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-display font-black text-section uppercase text-white"
              >
                TRENDING MOMENTS
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-sm text-white/40 mt-2 max-w-md"
              >
                Hover and hold to activate the 3D moment slab — watch the highlight play unfold.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scrollable slabs */}
        <motion.div variants={fadeInUp} className="relative scroll-mask-right">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto no-scrollbar scroll-snap-x pl-4 sm:pl-[max(1rem,calc((100vw-1200px)/2+2rem))] pr-24 py-8"
          >
            {trendingMoments.map((moment) => (
              <MomentSlabCard key={moment.id} moment={moment} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
