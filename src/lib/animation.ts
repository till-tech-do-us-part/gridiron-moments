import type { Variants } from 'framer-motion';

export const TIMING = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.35,
  reveal: 0.6,
  heroReveal: 0.8,
} as const;

export const EASE = {
  default: [0.4, 0, 0.2, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  out: [0, 0, 0.2, 1] as const,
};

export const STAGGER = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.15,
  hero: 0.12,
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.reveal, ease: EASE.smooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.slow },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.reveal, ease: EASE.smooth },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.reveal, ease: EASE.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.slow, ease: EASE.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.2,
    },
  },
};

export const scrollViewport = {
  once: true,
  margin: '-80px' as const,
};
