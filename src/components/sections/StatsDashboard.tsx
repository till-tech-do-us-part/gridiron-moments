import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { marketStats, topPurchases, rarityBgClasses } from '@/data/siteData';
import { useInView } from '@/hooks/useInView';
import type { FilterPeriod } from '@/types';

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  const formatted = display.toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const periods: FilterPeriod[] = ['1D', '7D', '30D', '90D', 'ALL'];

export function StatsDashboard() {
  const [activePeriod, setActivePeriod] = useState<FilterPeriod>('90D');
  const stats = marketStats[activePeriod];

  return (
    <section id="marketplace" className="py-24 lg:py-32 px-4 sm:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-[1200px] mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-4">
          <span className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-4">
            Market Analytics
          </span>
          <h2 className="font-display font-black text-section uppercase text-white mb-10">
            MARKET OVERVIEW
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={fadeInUp} className="flex justify-center gap-1.5 mb-14">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-5 py-2 rounded-full font-display font-semibold text-xs uppercase tracking-wider transition-all duration-200 ${
                activePeriod === period
                  ? 'bg-white text-black shadow-lg'
                  : 'border border-white/15 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {period === 'ALL' ? 'All Time' : period}
            </button>
          ))}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-black text-stat text-white mb-2">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                />
              </div>
              <div className="text-[11px] font-display font-medium uppercase tracking-[0.12em] text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Top Purchases */}
        <motion.div variants={fadeInUp}>
          <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-6">
            Top Purchases
          </h3>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-dark-card">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-5 text-[10px] font-display font-semibold uppercase tracking-wider text-white/30">
                      Player
                    </th>
                    <th className="text-left py-3 px-5 text-[10px] font-display font-semibold uppercase tracking-wider text-white/30">
                      Play
                    </th>
                    <th className="text-left py-3 px-5 text-[10px] font-display font-semibold uppercase tracking-wider text-white/30">
                      Serial
                    </th>
                    <th className="text-right py-3 px-5 text-[10px] font-display font-semibold uppercase tracking-wider text-white/30">
                      Price
                    </th>
                    <th className="text-right py-3 px-5 text-[10px] font-display font-semibold uppercase tracking-wider text-white/30">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPurchases.map((purchase, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full ${rarityBgClasses[purchase.rarity]}`}
                          />
                          <span className="font-display font-bold text-sm text-white">
                            {purchase.player}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-sm text-white/50">
                        {purchase.play}
                      </td>
                      <td className="py-3.5 px-5 text-sm text-white/40 font-mono">
                        {purchase.serial}
                      </td>
                      <td className="py-3.5 px-5 text-right font-display font-bold text-sm text-gold">
                        {purchase.price}
                      </td>
                      <td className="py-3.5 px-5 text-right text-xs text-white/30">
                        {purchase.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
