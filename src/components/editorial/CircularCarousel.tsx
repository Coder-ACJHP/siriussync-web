import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselImage {
  src: string;
  alt: string;
}

interface CircularCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export default function CircularCarousel({
  images,
  autoPlayInterval = 5500,
}: CircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [radius, setRadius] = useState(660);

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelAccumulator = useRef(0);
  const lastWheelTime = useRef(0);
  const n = images.length;

  // Responsive radius adjustment
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(340);
      } else if (w < 1024) {
        setRadius(500);
      } else {
        setRadius(660); // Wide panoramic circle
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % n);
  }, [n]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Auto-play timer (calm interval, pauses when user hovers or interacts)
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, nextSlide, autoPlayInterval]);

  // Pointer / Touch drag handling with weighted resistance
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Increased threshold for deliberate, weighted gesture
    const threshold = 65;
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Controlled wheel/trackpad scroll: dampened velocity so it steps calmly
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    // 500ms debounce prevents high-velocity wheel flick from spinning out of control
    if (now - lastWheelTime.current < 500) {
      return;
    }

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAccumulator.current += delta;

    if (wheelAccumulator.current > 40) {
      nextSlide();
      wheelAccumulator.current = 0;
      lastWheelTime.current = now;
    } else if (wheelAccumulator.current < -40) {
      prevSlide();
      wheelAccumulator.current = 0;
      lastWheelTime.current = now;
    }
  };

  return (
    <div
      className="relative w-full py-6 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[240px] sm:h-[320px] md:h-[390px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1500px' }}
      >
        {images.map((item, i) => {
          // Compute shortest circular offset from current index
          let diff = (i - currentIndex) % n;
          if (diff > n / 2) diff -= n;
          if (diff < -n / 2) diff += n;

          // Dampened drag angle (divisor increased to 420 for silky, heavy weight)
          const dragAngle = isDragging ? (dragOffset / 420) : 0;
          const effectiveDiff = diff + dragAngle;

          // Circular geometry calculation
          const angleStep = 360 / n;
          const angleDeg = effectiveDiff * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;

          const x = Math.sin(angleRad) * radius;
          const z = Math.cos(angleRad) * radius - radius; // z=0 at front

          const isFront = Math.abs(effectiveDiff) < 0.5;
          const cosVal = Math.cos(angleRad);
          const isBack = cosVal < -0.35; // Hide items fully around the back

          const scale = Math.max(0.65, 1 + z / 1100);
          const opacity = isBack ? 0 : Math.max(0.2, 0.35 + (z + radius) / (2 * radius));
          const zIndex = Math.round(z + 1000);

          return (
            <div
              key={item.src}
              onClick={() => {
                if (Math.abs(dragOffset) < 10) {
                  goToSlide(i);
                }
              }}
              className="absolute w-[300px] sm:w-[460px] md:w-[600px] max-w-[85vw]"
              style={{
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${angleDeg}deg) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: isBack ? 'none' : 'auto',
                // Slower, weighted 0.85s cubic-bezier deceleration for a luxury studio feel
                transition: isDragging
                  ? 'none'
                  : 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease',
              }}
            >
              <div
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-950 p-1.5 sm:p-2 border transition-all duration-700 shadow-2xl ${
                  isFront
                    ? 'border-cyan-500/70 shadow-[0_16px_50px_rgba(6,182,212,0.32)] ring-1 ring-cyan-500/50'
                    : 'border-zinc-800/80 shadow-black/90 hover:border-zinc-700'
                }`}
              >
                {/* Clock Face Image: Exact 1344/621 ratio to eliminate image cropping */}
                <div className="relative aspect-[1344/621] w-full rounded-xl md:rounded-2xl overflow-hidden bg-black">
                  <img
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Vignette / dim overlay for non-active cards */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                      isFront ? 'opacity-0' : 'bg-black/45 opacity-100'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Indicators */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={prevSlide}
          aria-label="Previous Clock Face"
          className="w-10 h-10 rounded-full border border-zinc-800 bg-[#0c121e]/80 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="flex items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 rounded-full ${
                currentIndex === idx
                  ? 'w-7 h-2 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Clock Face"
          className="w-10 h-10 rounded-full border border-zinc-800 bg-[#0c121e]/80 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
