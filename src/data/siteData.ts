import type {
  NavItem,
  FeatureBlock,
  MarketStat,
  CollectibleCard,
  MomentSlab,
  PackTier,
  GameCard,
  TickerImage,
  FilterPeriod,
} from '@/types';

export const navItems: NavItem[] = [
  { label: 'Explore', href: '#explore' },
  { label: 'Drops', href: '#drops' },
  { label: 'Market', href: '#marketplace' },
  { label: 'Play', href: '#play' },
];

export const heroData = {
  headline: 'OWN THE|MONARCH',
  subheadline:
    'Collect, trade, and own officially licensed digital moments from the greatest plays in football. Every highlight. Every hero. Every moment — yours forever.',
  cta: 'Explore Drops',
  ctaHref: '#drops',
  videoPlaceholder: '/images/player-card-main.jpg',
};

export const valueProps = [
  {
    id: 'scarcity',
    title: 'Verifiable Scarcity',
    description:
      'Every moment has a fixed edition size that can never be changed. From Common to Ultimate, scarcity is guaranteed and transparent on-chain.',
    icon: 'Shield',
  },
  {
    id: 'trading',
    title: 'Frictionless Trading',
    description:
      'Buy, sell, and trade 24/7 on an open marketplace. No middlemen, no wait times. Your collection moves at the speed of the game.',
    icon: 'ArrowLeftRight',
  },
  {
    id: 'permanence',
    title: 'Digital Permanence',
    description:
      'Your moments live on the blockchain. Secured, authenticated, and truly owned by you — not licensed, not rented. Owned.',
    icon: 'Lock',
  },
];

export const featureBlocks: FeatureBlock[] = [
  {
    id: 'collect',
    category: 'Collecting',
    headline: 'EVERY PLAY|HAS A PRICE',
    body: 'From Hail Mary touchdown passes to goal-line stands, own the defining moments of football history. Each collectible is a verified highlight backed by official league licensing.',
    cta: 'Start Collecting',
    ctaHref: '#marketplace',
    image: '/images/player-card-main.jpg',
    imageAlt: 'Featured football moment collectible',
    reverse: false,
  },
  {
    id: 'trade',
    category: 'Marketplace',
    headline: 'TRADE WITH|CONVICTION',
    body: 'A transparent marketplace where every transaction is verified. Real-time pricing, historical sales data, and advanced analytics give you the edge to build a winning portfolio.',
    cta: 'Open Marketplace',
    ctaHref: '#marketplace',
    image: '/images/player-thumb-1.jpg',
    imageAlt: 'Marketplace trading interface',
    reverse: true,
  },
  {
    id: 'compete',
    category: 'Competition',
    headline: 'PLAY TO|DOMINATE',
    body: 'Enter daily challenges, climb leaderboards, and compete for exclusive reward packs. Your collection is not just a gallery — it is your roster, your strategy, your edge.',
    cta: 'View Challenges',
    ctaHref: '#play',
    image: '/images/player-thumb-2.jpg',
    imageAlt: 'Gamification and challenges',
    reverse: false,
  },
];

export const trendingMoments: MomentSlab[] = [
  {
    id: 'slab-1',
    image: '/images/player-card-main.jpg',
    videoUrl: '/videos/moment-00001.mp4',
    rarity: 'epic',
    playerName: 'Marcus Green',
    playType: 'Game-Winning TD Reception',
    serial: '#2/100',
    price: '$4,200',
    glowColor: '#A855F7',
  },
  {
    id: 'slab-2',
    image: '/images/related-1.jpg',
    videoUrl: '/videos/moment-00002.mp4',
    rarity: 'legendary',
    playerName: 'Jake Thompson',
    playType: '6-TD Championship Game',
    serial: '#1/25',
    price: '$18,500',
    glowColor: '#F59E0B',
  },
  {
    id: 'slab-3',
    image: '/images/related-2.jpg',
    videoUrl: '/videos/moment-00003.mp4',
    rarity: 'rare',
    playerName: 'Devon Williams',
    playType: '200-Yard Rushing Game',
    serial: '#15/250',
    price: '$1,850',
    glowColor: '#3B82F6',
  },
  {
    id: 'slab-4',
    image: '/images/related-3.jpg',
    videoUrl: '/videos/moment-00001.mp4',
    rarity: 'epic',
    playerName: 'Chris Jackson',
    playType: 'Pick-Six Playoff Moment',
    serial: '#8/100',
    price: '$3,100',
    glowColor: '#A855F7',
  },
  {
    id: 'slab-5',
    image: '/images/related-4.jpg',
    videoUrl: '/videos/moment-00002.mp4',
    rarity: 'common',
    playerName: 'Tyler Brooks',
    playType: '55-Yard Field Goal',
    serial: '#450/1000',
    price: '$85',
    glowColor: '#9CA3AF',
  },
  {
    id: 'slab-6',
    image: '/images/player-thumb-3.jpg',
    videoUrl: '/videos/moment-00003.mp4',
    rarity: 'rare',
    playerName: 'Aiden Cole',
    playType: 'Triple Takeaway Game',
    serial: '#42/250',
    price: '$1,200',
    glowColor: '#3B82F6',
  },
];

/** Slab configuration matching design analysis CSS variable structure */
export const slabConfig = {
  depth: 36,
  rotationIdle: -15,
  rotationSpeed: 10,
  dwellDelay: 1,
  returnDuration: 0.8,
  returnEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};

export const packTiers: PackTier[] = [
  {
    id: 'standard',
    name: 'Standard Pack',
    description: 'Start your collection with guaranteed Common moments.',
    price: '$9',
    image: '/images/related-4.jpg',
    momentCount: 3,
    guaranteedRarity: 'Common',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    description: 'Guaranteed Rare or better. Chase your favorite players.',
    price: '$49',
    image: '/images/related-2.jpg',
    momentCount: 5,
    guaranteedRarity: 'Rare+',
    gradient: 'from-blue-900 to-blue-950',
  },
  {
    id: 'elite',
    name: 'Elite Pack',
    description: 'Guaranteed Epic. The moments that define championships.',
    price: '$149',
    image: '/images/related-1.jpg',
    momentCount: 5,
    guaranteedRarity: 'Epic+',
    gradient: 'from-purple-900 to-purple-950',
  },
  {
    id: 'legendary',
    name: 'Legendary Pack',
    description: 'Guaranteed Legendary. For serious collectors only.',
    price: '$399',
    image: '/images/player-card-main.jpg',
    momentCount: 7,
    guaranteedRarity: 'Legendary',
    gradient: 'from-amber-900 to-amber-950',
  },
];

export const marketStats: Record<FilterPeriod, MarketStat[]> = {
  '1D': [
    { label: 'Sales Volume', value: 142500, prefix: '$' },
    { label: 'Purchases', value: 1847 },
    { label: 'Buyers', value: 892 },
    { label: 'Sellers', value: 634 },
  ],
  '7D': [
    { label: 'Sales Volume', value: 892000, prefix: '$' },
    { label: 'Purchases', value: 11250 },
    { label: 'Buyers', value: 4200 },
    { label: 'Sellers', value: 2800 },
  ],
  '30D': [
    { label: 'Sales Volume', value: 3450000, prefix: '$' },
    { label: 'Purchases', value: 48700 },
    { label: 'Buyers', value: 18500 },
    { label: 'Sellers', value: 12300 },
  ],
  '90D': [
    { label: 'Sales Volume', value: 12800000, prefix: '$' },
    { label: 'Purchases', value: 156000 },
    { label: 'Buyers', value: 54200 },
    { label: 'Sellers', value: 38400 },
  ],
  ALL: [
    { label: 'Sales Volume', value: 48500000, prefix: '$' },
    { label: 'Purchases', value: 585000 },
    { label: 'Buyers', value: 125000, suffix: '+' },
    { label: 'Sellers', value: 89000, suffix: '+' },
  ],
};

export const productCards: CollectibleCard[] = [
  {
    id: 'marcus-green-epic',
    image: '/images/player-card-main.jpg',
    rarity: 'epic',
    playerName: 'Marcus Green',
    title: 'Game-Winning TD Reception',
    position: 'Wide Receiver',
    team: 'Alabama',
    lowestAsk: '$4,200',
    avgSale: '$3,800',
    serial: { current: 2, total: 100 },
    description:
      'Marcus Green hauls in a spectacular one-handed touchdown catch in the back corner of the end zone to seal the championship victory with 12 seconds remaining.',
    stats: { REC: 8, YDS: 156, TD: 2, RTG: 91 },
  },
  {
    id: 'jake-thompson-legendary',
    image: '/images/related-1.jpg',
    rarity: 'legendary',
    playerName: 'Jake Thompson',
    title: '6-TD Championship Game',
    position: 'Quarterback',
    team: 'Texas',
    lowestAsk: '$18,500',
    avgSale: '$15,200',
    serial: { current: 1, total: 25 },
    description:
      'Jake Thompson delivers a historic 6-touchdown performance in the state championship game, dismantling the top-ranked defense in the country.',
    stats: { CMP: 24, YDS: 387, TD: 6, RTG: 98 },
  },
  {
    id: 'devon-williams-rare',
    image: '/images/related-2.jpg',
    rarity: 'rare',
    playerName: 'Devon Williams',
    title: '200-Yard Rushing Game',
    position: 'Running Back',
    team: 'Georgia',
    lowestAsk: '$1,850',
    avgSale: '$1,500',
    serial: { current: 15, total: 250 },
    description:
      'Devon Williams rumbles for over 200 yards and 3 touchdowns against the #1 ranked defense in the nation.',
    stats: { CAR: 28, YDS: 214, TD: 3, RTG: 89 },
  },
  {
    id: 'chris-jackson-epic',
    image: '/images/related-3.jpg',
    rarity: 'epic',
    playerName: 'Chris Jackson',
    title: 'Pick-Six Playoff Moment',
    position: 'Linebacker',
    team: 'Ohio State',
    lowestAsk: '$3,100',
    avgSale: '$2,600',
    serial: { current: 8, total: 100 },
    description:
      'Chris Jackson reads the quarterback perfectly and returns the interception 45 yards for the go-ahead touchdown in the playoff semifinal.',
    stats: { TKL: 12, INT: 2, SCK: 1, RTG: 87 },
  },
  {
    id: 'tyler-brooks-common',
    image: '/images/related-4.jpg',
    rarity: 'common',
    playerName: 'Tyler Brooks',
    title: '55-Yard Field Goal',
    position: 'Kicker',
    team: 'Michigan',
    lowestAsk: '$85',
    avgSale: '$62',
    serial: { current: 450, total: 1000 },
    description:
      'Tyler Brooks nails a 55-yard field goal as time expires, the longest in state history and a moment of pure clutch.',
    stats: { FG: '3/3', XP: '5/5', LNG: 55, RTG: 82 },
  },
  {
    id: 'aiden-cole-rare',
    image: '/images/player-thumb-3.jpg',
    rarity: 'rare',
    playerName: 'Aiden Cole',
    title: 'Triple Takeaway Game',
    position: 'Safety',
    team: 'Florida',
    lowestAsk: '$1,200',
    avgSale: '$950',
    serial: { current: 42, total: 250 },
    description:
      'Aiden Cole records 10 tackles, 2 interceptions, and a forced fumble in a dominant defensive showcase during rivalry week.',
    stats: { TKL: 10, INT: 2, FF: 1, RTG: 85 },
  },
  {
    id: 'ray-martinez-epic',
    image: '/images/player-thumb-1.jpg',
    rarity: 'epic',
    playerName: 'Ray Martinez',
    title: '99-Yard Kick Return TD',
    position: 'Return Specialist',
    team: 'LSU',
    lowestAsk: '$2,800',
    avgSale: '$2,400',
    serial: { current: 11, total: 100 },
    description:
      'Ray Martinez takes the opening kickoff 99 yards to the house, setting the tone for a dominant playoff victory.',
    stats: { RET: 4, YDS: 186, TD: 1, RTG: 90 },
  },
  {
    id: 'sam-chen-common',
    image: '/images/player-thumb-2.jpg',
    rarity: 'common',
    playerName: 'Sam Chen',
    title: 'Red Zone Interception',
    position: 'Cornerback',
    team: 'Clemson',
    lowestAsk: '$45',
    avgSale: '$32',
    serial: { current: 780, total: 1000 },
    description:
      'Sam Chen leaps over the receiver to intercept a fade route in the end zone, preserving the shutout in the fourth quarter.',
    stats: { TKL: 5, INT: 1, PD: 3, RTG: 78 },
  },
];

export const gameCards: GameCard[] = [
  {
    id: 'fast-break',
    title: 'Fast Break',
    description: 'Build your best lineup and compete in weekly salary-cap challenges.',
    image: '/images/player-card-main.jpg',
    gradient: 'radial-glow-gold',
    badge: 'LIVE',
    badgeColor: '#F59E0B',
    cta: 'Enter Challenge',
  },
  {
    id: 'challenges',
    title: 'Weekly Challenges',
    description: 'Complete objectives to earn exclusive reward packs and XP.',
    image: '/images/related-1.jpg',
    gradient: 'radial-glow-purple',
    cta: 'View Challenges',
  },
  {
    id: 'leaderboards',
    title: 'Leaderboards',
    description: 'Climb the ranks and prove you have the best eye for talent.',
    image: '/images/related-3.jpg',
    gradient: 'radial-glow-blue',
    cta: 'View Rankings',
  },
];

export const tickerImages: TickerImage[] = [
  { id: 't1', src: '/images/player-card-main.jpg', alt: 'Player highlight 1' },
  { id: 't2', src: '/images/player-thumb-1.jpg', alt: 'Player highlight 2' },
  { id: 't3', src: '/images/player-thumb-2.jpg', alt: 'Player highlight 3' },
  { id: 't4', src: '/images/player-thumb-3.jpg', alt: 'Player highlight 4' },
  { id: 't5', src: '/images/related-1.jpg', alt: 'Player highlight 5' },
  { id: 't6', src: '/images/related-2.jpg', alt: 'Player highlight 6' },
  { id: 't7', src: '/images/related-3.jpg', alt: 'Player highlight 7' },
  { id: 't8', src: '/images/related-4.jpg', alt: 'Player highlight 8' },
];

export const topPurchases = [
  { player: 'Jake Thompson', play: '6-TD Championship', price: '$18,500', serial: '#1/25', rarity: 'legendary' as Rarity, time: '2h ago' },
  { player: 'Marcus Green', play: 'Game-Winning TD', price: '$4,200', serial: '#2/100', rarity: 'epic' as Rarity, time: '4h ago' },
  { player: 'Devon Williams', play: '200-Yard Rushing', price: '$1,850', serial: '#15/250', rarity: 'rare' as Rarity, time: '6h ago' },
  { player: 'Chris Jackson', play: 'Pick-Six Playoff', price: '$3,100', serial: '#8/100', rarity: 'epic' as Rarity, time: '8h ago' },
  { player: 'Ray Martinez', play: '99-Yard Return TD', price: '$2,800', serial: '#11/100', rarity: 'epic' as Rarity, time: '12h ago' },
];

import type { Rarity } from '@/types';

export const rarityColors: Record<Rarity, string> = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B',
  ultimate: '#EF4444',
};

export const rarityBgClasses: Record<string, string> = {
  common: 'bg-gray-500/80',
  rare: 'bg-blue-500/90',
  epic: 'bg-purple-500/90',
  legendary: 'bg-amber-500/90',
  ultimate: 'bg-red-500/90',
};

export const rarityGlowClasses: Record<string, string> = {
  common: 'hover:shadow-gray-500/20',
  rare: 'hover:shadow-blue-500/20',
  epic: 'hover:shadow-purple-500/20',
  legendary: 'hover:shadow-amber-500/20',
  ultimate: 'hover:shadow-red-500/20',
};
