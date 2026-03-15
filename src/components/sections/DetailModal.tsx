import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ShoppingCart, Tag } from 'lucide-react';
import { rarityColors } from '@/data/siteData';
import type { CollectibleCard } from '@/types';

function WireframeCard({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
      <div
        className="relative animate-spin-slow"
        style={{ width: 200, height: 280, transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            border: `1px solid ${color}66`,
            background: `${color}08`,
            boxShadow: `0 0 15px ${color}22, inset 0 0 15px ${color}08`,
            transform: 'translateZ(20px)',
          }}
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            border: `1px solid ${color}44`,
            background: `${color}05`,
            boxShadow: `0 0 10px ${color}18`,
            transform: 'translateZ(-20px)',
          }}
        />
        {[25, 50, 75].map((pos) => (
          <div
            key={`h-${pos}`}
            className="absolute left-0 right-0"
            style={{
              top: `${pos}%`,
              height: 1,
              background: `${color}20`,
              transform: 'translateZ(20px)',
            }}
          />
        ))}
        {[33, 66].map((pos) => (
          <div
            key={`v-${pos}`}
            className="absolute top-0 bottom-0"
            style={{
              left: `${pos}%`,
              width: 1,
              background: `${color}20`,
              transform: 'translateZ(20px)',
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full animate-glow-pulse -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            transform: 'translateZ(25px) translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-display font-bold text-sm uppercase tracking-wider text-white">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-white/50 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DetailModalProps {
  card: CollectibleCard | null;
  onClose: () => void;
}

export function DetailModal({ card, onClose }: DetailModalProps) {
  if (!card) return null;
  const color = rarityColors[card.rarity] || rarityColors.common;

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-dark-card border border-white/[0.08] shadow-2xl no-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: 3D wireframe */}
              <div className="relative bg-black min-h-[350px] lg:min-h-[500px] flex items-center justify-center p-8">
                <WireframeCard color={color} />
                <div
                  className="absolute top-6 left-6 px-3 py-1 rounded-md text-white"
                  style={{ backgroundColor: `${color}cc` }}
                >
                  <span className="font-display font-bold text-xs uppercase tracking-wider">
                    {card.rarity}
                  </span>
                </div>
              </div>

              {/* Right: Info */}
              <div className="p-6 lg:p-8">
                <div className="mb-6">
                  <p className="text-xs font-display font-semibold uppercase tracking-[0.12em] text-white/40 mb-1">
                    {card.position} &middot; {card.team}
                  </p>
                  <h2 className="font-display font-black text-2xl lg:text-3xl uppercase text-white">
                    {card.playerName}
                  </h2>
                  <p className="text-sm text-white/50 mt-1">{card.title}</p>
                  <p className="text-xs text-white/30 mt-1 font-mono">
                    Edition #{card.serial.current} of {card.serial.total}
                  </p>
                </div>

                <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider">
                      Lowest Ask
                    </div>
                    <div className="font-display font-black text-2xl text-white">
                      {card.lowestAsk}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider">
                      Avg Sale
                    </div>
                    <div className="font-display font-bold text-lg text-white/50">
                      {card.avgSale}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mb-8">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-hover text-black font-display font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20">
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-display font-semibold text-sm uppercase tracking-wider rounded-full transition-all duration-200 hover:bg-white/5">
                    <Tag className="w-4 h-4" />
                    Make Offer
                  </button>
                </div>

                <div>
                  <AccordionItem title="Description" defaultOpen>
                    {card.description}
                  </AccordionItem>
                  <AccordionItem title="Stats">
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(card.stats).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex justify-between py-1.5 px-3 bg-white/[0.03] rounded-lg"
                        >
                          <span className="text-white/40 uppercase text-xs font-display tracking-wider">
                            {key}
                          </span>
                          <span className="text-white font-display font-bold text-sm">
                            {String(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Properties">
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Championship Series',
                        card.rarity,
                        card.position,
                        card.team,
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-display font-semibold uppercase tracking-wider text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </AccordionItem>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
