import { tickerImages } from '@/data/siteData';

export function ImageTicker() {
  const images = [...tickerImages, ...tickerImages];

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="marquee-mask">
        <div className="flex gap-4 marquee-track">
          {images.map((img, i) => (
            <div
              key={`${img.id}-${i}`}
              className="flex-shrink-0 w-[180px] h-[240px] sm:w-[200px] sm:h-[280px] rounded-xl overflow-hidden bg-dark-card border border-white/[0.06]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
