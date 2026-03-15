import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ValueProps } from '@/components/sections/ValueProps';
import { FeatureBlocks } from '@/components/sections/FeatureBlocks';
import { TrendingMoments } from '@/components/sections/TrendingMoments';
import { PackDrops } from '@/components/sections/PackDrops';
import { ImageTicker } from '@/components/sections/ImageTicker';
import { StatsDashboard } from '@/components/sections/StatsDashboard';
import { MarketplaceCards } from '@/components/sections/MarketplaceCards';
import { GameZone } from '@/components/sections/GameZone';
import { DetailModal } from '@/components/sections/DetailModal';
import type { CollectibleCard } from '@/types';
import './App.css';

function App() {
  const [selectedCard, setSelectedCard] = useState<CollectibleCard | null>(null);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Fixed Navigation */}
      <Navigation />

      <main>
        {/* 1. Hero - Cinematic split screen with featured moment */}
        <HeroSection />

        {/* 2. Value Props - Three-column feature blocks */}
        <ValueProps />

        {/* 3. Feature Blocks - Alternating 50/50 storytelling */}
        <FeatureBlocks />

        {/* 4. Image Ticker - Full-width marquee of athletes */}
        <ImageTicker />

        {/* 5. Trending Moments - 3D Slab presentation */}
        <TrendingMoments />

        {/* 6. Pack Drops - Tiered pack presentation */}
        <PackDrops />

        {/* 7. Stats Dashboard - Analytics with filter pills + top purchases */}
        <StatsDashboard />

        {/* 8. Marketplace Cards - Horizontal scroll carousel */}
        <MarketplaceCards onSelectCard={setSelectedCard} />

        {/* 9. Game Zone - Gamification UI */}
        <GameZone />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal - Full screen overlay */}
      <DetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}

export default App;
