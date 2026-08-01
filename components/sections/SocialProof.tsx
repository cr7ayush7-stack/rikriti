"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, ArrowUpRight, Play, Pause, Volume2, VolumeX, Quote } from "lucide-react";
import { INSTA_FEED, TRUST_METRICS, type InstaItem } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/* ─── Desktop Stagger Card ─── */
interface InstaCardProps {
  item: InstaItem;
  position: number;
  onClick: (position: number) => void;
  cardSize: number;
}

const InstaCard: React.FC<InstaCardProps> = ({ item, position, onClick, cardSize }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const isCenter = position === 0;

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;

    if (isCenter) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isCenter, item.type]);

  const handleVideoControl = (e: React.MouseEvent, action: "play" | "mute") => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (action === "play") {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } else {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <motion.div
      onClick={() => onClick(position)}
      layout
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out rounded-2xl overflow-hidden",
        isCenter
          ? "z-20 shadow-2xl border-4 border-sage"
          : "z-10 shadow-lg hover:shadow-xl border-2 border-taupe/40 hover:border-sage/60"
      )}
      style={{
        width: cardSize,
        height: cardSize * 1.25,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.4) * position}px)
          translateY(${isCenter ? -20 : Math.abs(position) * 10}px)
          rotate(${isCenter ? 0 : position * 2}deg)
          scale(${isCenter ? 1 : 0.85 - Math.abs(position) * 0.05})
        `,
        opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.15,
      }}
    >
      {item.type === "photo" && item.imageUrl && (
        <div className="relative w-full h-full bg-forest">
          <Image
            src={item.imageUrl}
            alt="rikriti Instagram post"
            fill
            sizes={`${cardSize}px`}
            className="object-cover"
          />
        </div>
      )}

      {item.type === "video" && item.videoUrl && (
        <div className="relative w-full h-full bg-forest">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={isCenter}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          >
            <source src={item.videoUrl} type="video/mp4" />
          </video>

          {isCenter && (
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => handleVideoControl(e, "play")}
                className="w-9 h-9 rounded-full bg-cream/90 backdrop-blur-sm text-forest flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={(e) => handleVideoControl(e, "mute")}
                className="w-9 h-9 rounded-full bg-cream/90 backdrop-blur-sm text-forest flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      )}

      {item.type === "testimonial" && (
        <div className="relative w-full h-full bg-ivory p-6 sm:p-8 flex flex-col justify-center">
          <Quote className="w-10 h-10 text-sage/40 mb-4" strokeWidth={1.5} aria-hidden="true" />
          <p className="font-display italic text-base sm:text-lg text-forest leading-snug mb-6">
            &ldquo;{item.caption}&rdquo;
          </p>
          <p className="font-display italic text-sm text-sage">
            — {item.author}
          </p>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Mobile Card ─── */
interface MobileCardProps {
  item: InstaItem;
  isActive: boolean;
}

const MobileCard: React.FC<MobileCardProps> = ({ item, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;

    if (isActive) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, item.type]);

  const handleVideoControl = (e: React.MouseEvent, action: "play" | "mute") => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (action === "play") {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } else {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div
      className={cn(
        "snap-center shrink-0 w-[85vw] max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden bg-forest transition-all duration-300",
        isActive ? "shadow-2xl scale-100" : "shadow-md scale-[0.92] opacity-70"
      )}
    >
      {item.type === "photo" && item.imageUrl && (
        <div className="relative w-full h-full">
          <Image
            src={item.imageUrl}
            alt="rikriti Instagram post"
            fill
            sizes="85vw"
            className="object-cover"
          />
        </div>
      )}

      {item.type === "video" && item.videoUrl && (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          >
            <source src={item.videoUrl} type="video/mp4" />
          </video>

          {isActive && (
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => handleVideoControl(e, "play")}
                className="w-11 h-11 rounded-full bg-cream/90 backdrop-blur-sm text-forest flex items-center justify-center shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={(e) => handleVideoControl(e, "mute")}
                className="w-11 h-11 rounded-full bg-cream/90 backdrop-blur-sm text-forest flex items-center justify-center shadow-lg"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {item.type === "testimonial" && (
        <div className="relative w-full h-full bg-ivory p-8 flex flex-col justify-center">
          <Quote className="w-10 h-10 text-sage/40 mb-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          <p className="font-display italic text-lg leading-relaxed text-forest mb-6">
            &ldquo;{item.caption}&rdquo;
          </p>
          <p className="font-display italic text-sm text-sage">
            — {item.author}
          </p>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function SocialProof() {
  const [cardSize, setCardSize] = useState(300);
  const [itemsList, setItemsList] = useState(INSTA_FEED);
  const [activeMobileIndex, setActiveMobileIndex] = useState(INSTA_FEED.length); // Start in middle set
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the items for infinite loop effect
  const mobileItems = [...INSTA_FEED, ...INSTA_FEED, ...INSTA_FEED];

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setCardSize(240);
      } else if (window.innerWidth < 1024) {
        setCardSize(280);
      } else {
        setCardSize(320);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ── Initial scroll to middle set on mount ── */
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    // Wait for DOM to render
    const timer = setTimeout(() => {
      const cards = scrollContainer.querySelectorAll("[data-card-index]");
      // Scroll to middle set (index = INSTA_FEED.length)
      const targetCard = cards[INSTA_FEED.length] as HTMLElement;
      if (targetCard) {
        const scrollTo = targetCard.offsetLeft - (scrollContainer.clientWidth - targetCard.offsetWidth) / 2;
        scrollContainer.scrollLeft = scrollTo;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /* ── Handle scroll: track active + implement infinite loop ── */
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const containerCenter = scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;
      const cards = scrollContainer.querySelectorAll("[data-card-index]");

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveMobileIndex(closestIndex);

      // Infinite loop: reset scroll position when reaching edges
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Wait until user stops scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        const totalCards = mobileItems.length;
        const originalLength = INSTA_FEED.length;

        // If near the start, jump to middle set
        if (closestIndex < originalLength / 2) {
          isScrollingRef.current = true;
          const jumpToIndex = closestIndex + originalLength;
          const targetCard = cards[jumpToIndex] as HTMLElement;
          if (targetCard) {
            const scrollTo = targetCard.offsetLeft - (scrollContainer.clientWidth - targetCard.offsetWidth) / 2;
            scrollContainer.scrollLeft = scrollTo; // Instant jump, no smooth
            setActiveMobileIndex(jumpToIndex);
          }
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
        // If near the end, jump to middle set
        else if (closestIndex >= totalCards - originalLength / 2) {
          isScrollingRef.current = true;
          const jumpToIndex = closestIndex - originalLength;
          const targetCard = cards[jumpToIndex] as HTMLElement;
          if (targetCard) {
            const scrollTo = targetCard.offsetLeft - (scrollContainer.clientWidth - targetCard.offsetWidth) / 2;
            scrollContainer.scrollLeft = scrollTo;
            setActiveMobileIndex(jumpToIndex);
          }
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 50);
        }
      }, 150);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mobileItems.length]);

  const handleMove = (steps: number) => {
    const newList = [...itemsList];

    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, id: `${item.id}-${Math.random()}` });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, id: `${item.id}-${Math.random()}` });
      }
    }

    setItemsList(newList);
  };

  const scrollToMobileCard = (dotIndex: number) => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer) return;

    const cards = scrollContainer.querySelectorAll("[data-card-index]");
    // Always jump to middle set for that item
    const targetIndex = INSTA_FEED.length + dotIndex;
    const targetCard = cards[targetIndex] as HTMLElement;

    if (targetCard) {
      const scrollTo = targetCard.offsetLeft - (scrollContainer.clientWidth - targetCard.offsetWidth) / 2;
      scrollContainer.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // Calculate which real item is active (modulo)
  const realActiveIndex = activeMobileIndex % INSTA_FEED.length;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative bg-cream py-20 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-butter/8 blur-3xl pointer-events-none"
      />

      {/* HEADER */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
                    <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="w-4 h-4 text-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              Follow @ri_kriti
            </span>
          </div>

          <h2
            id="reviews-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-forest mb-6"
          >
            Little moments,{" "}
            <em className="text-sage">big smiles.</em>
          </h2>

          <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed">
            See what people are creating, wearing, and loving with rikriti.
          </p>
        </motion.div>

        {/* TRUST METRICS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 lg:mb-16"
        >
          {TRUST_METRICS.map((metric, index) => (
            <div
              key={index}
              className="text-center border-l border-taupe/30 first:border-l-0 sm:border-l"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display italic text-4xl sm:text-5xl text-forest">
                  {metric.value}
                </span>
                {metric.suffix && (
                  <span className="font-display italic text-2xl sm:text-3xl text-sage">
                    {metric.suffix}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[10px] sm:text-xs font-body font-medium tracking-[0.2em] uppercase text-forest/60">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* DESKTOP: Stagger Gallery */}
      <div className="hidden md:block">
        <div
          className="relative w-full overflow-hidden mb-12"
          style={{ height: cardSize * 1.5 }}
        >
          {itemsList.map((item, index) => {
            const position =
              itemsList.length % 2
                ? index - (itemsList.length + 1) / 2
                : index - itemsList.length / 2;

            return (
              <InstaCard
                key={item.id}
                item={item}
                onClick={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
        </div>

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => handleMove(-1)}
              className="w-12 h-12 rounded-full bg-ivory border-2 border-taupe/40 hover:border-sage hover:bg-sage/10 text-forest flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleMove(1)}
              className="w-12 h-12 rounded-full bg-ivory border-2 border-taupe/40 hover:border-sage hover:bg-sage/10 text-forest flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE: Snap Swipe with Infinite Loop */}
      <div className="md:hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-[10px] font-body font-semibold tracking-[0.25em] uppercase text-sage/70 mb-6"
        >
          ← Swipe to explore →
        </motion.p>

        <div
          ref={mobileScrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            paddingLeft: "calc((100vw - min(85vw, 400px)) / 2)",
            paddingRight: "calc((100vw - min(85vw, 400px)) / 2)",
          }}
        >
          {mobileItems.map((item, index) => (
            <div key={`mobile-${index}`} data-card-index={index}>
              <MobileCard item={item} isActive={index === activeMobileIndex} />
            </div>
          ))}
        </div>

        {/* Progress dots — show only 7 (one per real item) */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-8 px-4">
          {INSTA_FEED.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToMobileCard(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === realActiveIndex
                  ? "w-8 bg-sage"
                  : "w-1.5 bg-sage/30 hover:bg-sage/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* INSTAGRAM CTA */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8 border-t border-taupe/30 max-w-md mx-auto"
        >
          <p className="font-body text-sm text-forest/60 mb-4">
            Share your rikriti moment
          </p>
                    <a
            href="https://instagram.com/ri_kriti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            aria-label="Follow rikriti on Instagram"
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            @ri_kriti on Instagram
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}