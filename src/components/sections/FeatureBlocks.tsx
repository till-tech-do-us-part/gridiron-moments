import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, scrollViewport } from '@/lib/animation';
import { featureBlocks } from '@/data/siteData';
import { ArrowRight } from 'lucide-react';

export function FeatureBlocks() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-20 lg:space-y-32">
        {featureBlocks.map((block) => (
          <motion.div
            key={block.id}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Image side */}
            <motion.div
              variants={block.reverse ? slideInRight : slideInLeft}
              className={`relative ${block.reverse ? 'lg:order-2' : 'lg:order-1'}`}
            >
              <div className="relative rounded-2xl overflow-hidden bg-dark-card border border-white/[0.06]">
                <div className="aspect-[4/3]">
                  <img
                    src={block.image}
                    alt={block.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Overlap effect */}
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-2xl bg-gold/5 border border-gold/10 -z-10 hidden lg:block" />
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={block.reverse ? slideInLeft : slideInRight}
              className={`${block.reverse ? 'lg:order-1' : 'lg:order-2'} py-4`}
            >
              <span className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-4">
                {block.category}
              </span>
              <h2 className="font-display font-black text-section uppercase text-white mb-5">
                {block.headline.split('|').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <p className="text-base lg:text-lg text-white/50 leading-relaxed mb-8 max-w-lg">
                {block.body}
              </p>
              <a
                href={block.ctaHref}
                className="group inline-flex items-center gap-2 text-gold font-display font-semibold text-sm uppercase tracking-wider hover:text-gold-light transition-colors"
              >
                {block.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
