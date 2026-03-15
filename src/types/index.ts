export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureBlock {
  id: string;
  category: string;
  headline: string;
  body: string;
  cta: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface MarketStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'ultimate';

export interface CollectibleCard {
  id: string;
  image: string;
  rarity: Rarity;
  playerName: string;
  title: string;
  position: string;
  team: string;
  lowestAsk: string;
  avgSale: string;
  serial: { current: number; total: number };
  description: string;
  stats: Record<string, string | number>;
}

export interface MomentSlab {
  id: string;
  image: string;
  videoUrl?: string;
  rarity: Rarity;
  playerName: string;
  playType: string;
  serial: string;
  price: string;
  glowColor: string;
}

export interface SlabConfig {
  depth: number;
  rotationIdle: number;
  rotationSpeed: number;
  dwellDelay: number;
  returnDuration: number;
}

export interface PackTier {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  momentCount: number;
  guaranteedRarity: string;
  gradient: string;
}

export interface GameCard {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  badge?: string;
  badgeColor?: string;
  cta: string;
}

export interface TickerImage {
  id: string;
  src: string;
  alt: string;
}

export type FilterPeriod = '1D' | '7D' | '30D' | '90D' | 'ALL';
