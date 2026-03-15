import { motion } from 'framer-motion';
import { heroStagger, fadeInUp, slideInRight } from '@/lib/animation';
import { heroData } from '@/data/siteData';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mb-[-131px] lg:mb-[-131px] z-10">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gold/[0.03] blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/[0.02] blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-24 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="inline-block px-3 py-1.5 text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold border border-gold/30 rounded-full bg-gold/5">
                2026 Season Now Live
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display font-black text-hero uppercase leading-[0.92] tracking-tight text-white mb-6"
            >
              {heroData.headline.split('|').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{line}</span> : line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-white/50 max-w-lg leading-relaxed mb-8"
            >
              {heroData.subheadline}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <a
                href={heroData.ctaHref}
                className="group frosted-cta inline-flex items-center gap-2.5 px-8 py-4 text-gold font-display font-bold text-sm uppercase tracking-[0.2em] rounded-[10px] transition-all duration-200 hover:shadow-xl hover:shadow-gold/15"
              >
                {heroData.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="group inline-flex items-center gap-2 px-6 py-4 border border-white/20 hover:border-white/40 text-white font-display font-semibold text-sm uppercase tracking-wider rounded-[10px] transition-all duration-200 hover:bg-white/5">
                <Play className="w-4 h-4" />
                Watch Highlights
              </button>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              variants={fadeInUp}
              className="mt-14 flex items-center gap-8 lg:gap-12"
            >
              {[
                { value: '125K+', label: 'Collectors' },
                { value: '$48M+', label: 'Volume Traded' },
                { value: '3,200+', label: 'Athletes' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-xl lg:text-2xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero card */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              {/* Glow behind card */}
              <div className="absolute -inset-6 bg-gradient-to-br from-gold/20 via-purple-500/10 to-blue-500/10 rounded-3xl blur-3xl opacity-50 animate-glow-pulse" />

              {/* Card container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark-card shadow-2xl shadow-black/50">
                <img
                  src={heroData.videoPlaceholder}
                  alt="Featured football moment"
                  className="w-full h-full object-cover"
                />
                {/* Overlay caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[11px] font-display font-semibold uppercase tracking-widest text-white/80">
                      Featured Moment
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white uppercase">
                    Marcus Green
                  </h3>
                  <p className="text-sm text-white/60">
                    Game-Winning TD Reception &middot; Epic #2/100
                  </p>
                </div>
              </div>

              {/* Floating badge - price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute -bottom-4 -left-4 lg:-left-8 px-4 py-2 glass rounded-xl border border-white/10 shadow-xl"
              >
                <div className="text-[10px] text-white/50 uppercase tracking-wider">Last Sale</div>
                <div className="font-display font-bold text-gold text-lg">$4,200</div>
              </motion.div>

              {/* Floating badge - rarity */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute -top-3 -right-3 lg:-right-6 px-3 py-1.5 bg-purple-500/90 rounded-lg shadow-lg shadow-purple-500/20"
              >
                <span className="font-display font-bold text-white text-xs uppercase tracking-wider">
                  Epic
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero bottom overlap (negative margin applied by parent) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
