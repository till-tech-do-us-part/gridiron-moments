import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { gameCards } from '@/data/siteData';
import { ArrowRight, Zap } from 'lucide-react';

export function GameZone() {
  return (
    <section id="play" className="py-24 lg:py-32 px-4 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-[1200px] mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-4">
            Gamification
          </span>
          <h2 className="font-display font-black text-section uppercase text-white mb-4">
            PLAY TO EARN
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Your collection is not just a gallery. Enter challenges, build lineups, and compete for exclusive rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {gameCards.map((card, i) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              className={`relative group rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:border-white/[0.15] cursor-pointer ${
                i === 0 ? 'lg:row-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background image */}
              <div className={`absolute inset-0 ${i === 0 ? '' : 'aspect-auto'}`}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Radial gradient overlay */}
              <div className={`absolute inset-0 ${card.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content */}
              <div className={`relative z-10 p-8 flex flex-col justify-end ${i === 0 ? 'min-h-[400px] lg:min-h-[500px]' : 'min-h-[240px]'}`}>
                {/* Live badge */}
                {card.badge && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-md" style={{ backgroundColor: card.badgeColor }}>
                    <Zap className="w-3 h-3 text-black" />
                    <span className="font-display font-bold text-[10px] uppercase tracking-wider text-black">
                      {card.badge}
                    </span>
                  </div>
                )}

                <h3 className={`font-display font-black uppercase text-white mb-2 ${i === 0 ? 'text-card-title' : 'text-lg'}`}>
                  {card.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-md">
                  {card.description}
                </p>
                <a
                  href="#"
                  className="group/cta inline-flex items-center gap-2 text-gold font-display font-semibold text-sm uppercase tracking-wider hover:text-gold-light transition-colors w-fit"
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
