import { useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';
import { productCards, rarityBgClasses, rarityGlowClasses } from '@/data/siteData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CollectibleCard } from '@/types';

function ProductCard({
  card,
  onSelect,
}: {
  card: CollectibleCard;
  onSelect: (c: CollectibleCard) => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => onSelect(card)}
      className={`flex-shrink-0 w-[260px] sm:w-[280px] cursor-pointer rounded-2xl overflow-hidden bg-dark-card border border-white/[0.06] transition-shadow duration-300 hover:shadow-xl ${rarityGlowClasses[card.rarity]}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={card.image}
          alt={card.playerName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Rarity badge */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md ${rarityBgClasses[card.rarity]}`}
        >
          <span className="font-display font-bold text-[10px] uppercase tracking-wider text-white">
            {card.rarity}
          </span>
        </div>
        {/* Serial */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md glass-subtle">
          <span className="font-mono font-semibold text-[10px] text-white/80">
            #{card.serial.current}/{card.serial.total}
          </span>
        </div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark-card to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 pt-2">
        <h3 className="font-display font-bold text-base text-white uppercase truncate">
          {card.playerName}
        </h3>
        <p className="text-xs text-white/40 truncate mt-0.5">{card.title}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Lowest Ask
            </div>
            <div className="font-display font-bold text-sm text-white">
              {card.lowestAsk}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Avg Sale
            </div>
            <div className="font-display font-semibold text-sm text-white/60">
              {card.avgSale}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface MarketplaceCardsProps {
  onSelectCard: (card: CollectibleCard) => void;
}

export function MarketplaceCards({ onSelectCard }: MarketplaceCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 lg:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
      >
        {/* Header */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <motion.span
                variants={fadeInUp}
                className="inline-block text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gold/80 mb-3"
              >
                Marketplace
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-display font-black text-section uppercase text-white"
              >
                HOT COLLECTIBLES
              </motion.h2>
            </div>
            <motion.div
              variants={fadeInUp}
              className="hidden sm:flex items-center gap-2"
            >
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

        {/* Scrollable cards with gradient mask */}
        <motion.div variants={fadeInUp} className="relative scroll-mask-right">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-snap-x pl-4 sm:pl-[max(1rem,calc((100vw-1200px)/2+2rem))] pr-24"
          >
            {productCards.map((card) => (
              <ProductCard
                key={card.id}
                card={card}
                onSelect={onSelectCard}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
