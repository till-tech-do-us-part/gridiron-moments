import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/animation';

const footerLinks = {
  Platform: [
    { label: 'Marketplace', href: '#marketplace' },
    { label: 'Athletes', href: '#explore' },
    { label: 'Pack Drops', href: '#drops' },
    { label: 'Rankings', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Community: [
    { label: 'Twitter / X', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Blog', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-card">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div variants={fadeInUp} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/monarch-logo.png" alt="Monarch" className="w-9 h-9 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-lg tracking-wide uppercase">
                Monarch
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The premier platform for football digital collectibles. Own the plays that define the game.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={fadeInUp}>
              <h4 className="font-display font-bold text-xs uppercase tracking-[0.15em] text-white/60 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Monarch Moments. All rights reserved.
          </p>
          <p className="text-xs text-white/25 font-display uppercase tracking-widest">
            Own the Play
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
