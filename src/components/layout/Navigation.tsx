import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { navItems } from '@/data/siteData';
import { cn } from '@/lib/utils';

export function Navigation() {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-[60px] lg:h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <img src="/images/monarch-logo.png" alt="Monarch" className="w-9 h-9 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-lg tracking-wide uppercase hidden sm:block">
                Monarch
              </span>
            </a>

            {/* Center nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <a
                href="#marketplace"
                className="hidden sm:inline-flex items-center frosted-cta px-6 py-2.5 text-gold font-display font-bold text-sm uppercase tracking-[0.2em] rounded-[10px] transition-all duration-200 hover:shadow-lg hover:shadow-gold/10"
              >
                Sign Up
              </a>
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="font-display font-bold text-3xl text-white uppercase tracking-wider hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#marketplace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-3 bg-gold text-black font-display font-bold uppercase tracking-wider rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
