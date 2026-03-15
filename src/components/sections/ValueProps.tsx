import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { valueProps } from '@/data/siteData';
import { Shield, ArrowLeftRight, Lock } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6" />,
  ArrowLeftRight: <ArrowLeftRight className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
};

export function ValueProps() {
  return (
    <section id="explore" className="py-24 lg:py-32 px-4 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-[1200px] mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-4">
            Why Monarch Moments
          </span>
          <h2 className="font-display font-black text-section uppercase text-white">
            THE FUTURE OF<br />FOOTBALL COLLECTING
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {valueProps.map((prop) => (
            <motion.div
              key={prop.id}
              variants={fadeInUp}
              className="relative group rounded-2xl overflow-hidden bg-dark-card border border-white/[0.06] p-8 lg:p-10 transition-all duration-300 hover:border-white/[0.12]"
            >
              {/* Subtle radial glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/[0.05] to-transparent" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6">
                  {iconMap[prop.icon]}
                </div>
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
