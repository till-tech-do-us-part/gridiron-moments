import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { packTiers } from '@/data/siteData';
import { Package, ArrowRight } from 'lucide-react';

export function PackDrops() {
  return (
    <section id="drops" className="py-24 lg:py-32 px-4 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-[1200px] mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-4">
            Pack Drops
          </span>
          <h2 className="font-display font-black text-section uppercase text-white mb-4">
            CHOOSE YOUR TIER
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Each pack contains exclusive football moments. Higher tiers guarantee rarer pulls with escalating visual treatments and lower edition sizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packTiers.map((pack) => (
            <motion.div
              key={pack.id}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden bg-dark-card border border-white/[0.06] transition-all duration-300 hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/30 card-hover"
            >
              {/* Pack artwork */}
              <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${pack.gradient}`}>
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/60 to-transparent" />

                {/* Pack icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl glass-subtle flex items-center justify-center">
                  <Package className="w-5 h-5 text-gold" />
                </div>

                {/* Guaranteed rarity badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                  <span className="font-display font-bold text-[10px] uppercase tracking-wider text-white">
                    {pack.guaranteedRarity}
                  </span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-black text-lg uppercase text-white mb-1">
                    {pack.name}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
                    {pack.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wider">Price</div>
                      <div className="font-display font-black text-xl text-white">{pack.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/30 uppercase tracking-wider">Moments</div>
                      <div className="font-display font-bold text-lg text-white/70">{pack.momentCount}</div>
                    </div>
                  </div>

                  <button className="w-full frosted-cta py-3 rounded-[10px] font-display font-bold text-xs uppercase tracking-[0.2em] text-gold flex items-center justify-center gap-2 transition-all group-hover:shadow-lg group-hover:shadow-gold/10">
                    Buy Pack
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Purchase limit notice */}
        <motion.p variants={fadeInUp} className="text-center text-xs text-white/25 mt-8">
          1 pack per user per drop &middot; Queue-based release &middot; Limit enforced on-chain
        </motion.p>
      </motion.div>
    </section>
  );
}
