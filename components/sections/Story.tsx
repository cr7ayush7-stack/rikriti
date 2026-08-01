"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, Heart, ArrowUpRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";

export default function Story() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-30%" });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="relative bg-cream py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle paper grain background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C332A 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative blur orbs */}
      <div
        aria-hidden="true"
        className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-sage/8 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-butter/15 blur-3xl pointer-events-none"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ═══════════════════════════════════════════════════
            SECTION HEADER
            ═══════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20 relative">
          {/* Small flower accent — top right of heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 0.9, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -top-6 right-0 sm:right-4 lg:right-8 w-14 sm:w-16 lg:w-20 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/images/element-flower-tape.png"
              alt=""
              width={100}
              height={140}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              The Making
            </span>
            <Sparkles className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="story-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-forest mb-6"
          >
            Meet the hands{" "}
            <em className="text-sage">behind rikriti.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-forest/70 leading-relaxed max-w-xl mx-auto"
          >
            A small home in Mulund. A few pairs of hands. And love in every stitch — watch how it all comes together.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════
            DESKTOP: VIDEO CENTER + FLOATING PHOTOS WITH TAPE
            ═══════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative max-w-5xl mx-auto mb-16">
          {/* Photo 1 — Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: -8 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-4 -left-8 xl:-left-16 z-20 w-72 xl:w-80 aspect-[4/3]"
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-6 z-30 pointer-events-none"
              style={{ transform: "translateX(-50%) rotate(-6deg)" }}
              aria-hidden="true"
            >
              <Image
                src="/images/element-paper-strip.png"
                alt=""
                width={200}
                height={40}
                className="w-full h-full object-cover opacity-95"
              />
            </div>

            <div
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-ivory p-2 transition-transform duration-500 hover:rotate-0 hover:scale-105"
              style={{
                boxShadow: "0 25px 50px -15px rgba(44, 51, 42, 0.35)",
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/workshop-photo-2.jpg"
                  alt="Artisans working together at the rikriti workshop"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-2 right-2 text-center">
                <span className="text-[9px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                  
                </span>
              </div>
            </div>
          </motion.div>

          {/* Photo 2 — Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-4 -right-4 xl:-right-8 z-20 w-48 xl:w-52 aspect-[3/4]"
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-6 z-30 pointer-events-none"
              style={{ transform: "translateX(-50%) rotate(3deg)" }}
              aria-hidden="true"
            >
              <Image
                src="/images/element-paper-strip.png"
                alt=""
                width={200}
                height={40}
                className="w-full h-full object-cover opacity-95"
              />
            </div>

            <div
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-ivory p-2 transition-transform duration-500 hover:rotate-0 hover:scale-105"
              style={{
                boxShadow: "0 20px 40px -12px rgba(44, 51, 42, 0.3)",
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/workshop-photo-3.jpg"
                  alt="Portrait of rikriti workshop moment"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-2 right-2 text-center">
                <span className="text-[9px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                  
                </span>
              </div>
            </div>
          </motion.div>

          {/* Photo 3 — Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute bottom-4 -left-2 xl:-left-4 z-20 w-52 xl:w-56 aspect-[4/3]"
          >
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-6 z-30 pointer-events-none"
              style={{ transform: "translateX(-50%) rotate(2deg)" }}
              aria-hidden="true"
            >
              <Image
                src="/images/element-paper-strip.png"
                alt=""
                width={200}
                height={40}
                className="w-full h-full object-cover opacity-95"
              />
            </div>

            <div
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-ivory p-2 transition-transform duration-500 hover:rotate-0 hover:scale-105"
              style={{
                boxShadow: "0 20px 40px -12px rgba(44, 51, 42, 0.3)",
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/workshop-artisans-group.jpg"
                  alt="rikriti artisans crocheting at the workshop"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-2 right-2 text-center">
                <span className="text-[9px] font-body font-semibold tracking-[0.2em] uppercase text-forest/60">
                  
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sparkle accent — Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-12 -right-4 z-20"
            aria-hidden="true"
          >
            <div className="bg-butter text-forest w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-cream">
              <Sparkles className="w-6 h-6" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* CENTER VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-forest"
              style={{
                boxShadow: "0 30px 60px -15px rgba(44, 51, 42, 0.4)",
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="rikriti workshop — richa teaching kids to crochet"
              >
                <source src="/videos/workshop-video.mp4" type="video/mp4" />
                Your browser does not support video.
              </video>

              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-cream/90 backdrop-blur-sm hover:bg-cream text-forest flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
                  )}
                </button>

                <button
                  onClick={handleMuteToggle}
                  className="w-10 h-10 rounded-full bg-cream/90 backdrop-blur-sm hover:bg-cream text-forest flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-10">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-forest">
                  Behind the Craft
                </span>
              </div>
            </div>
          </motion.div>

          <div className="h-16" aria-hidden="true" />
        </div>

        {/* ═══════════════════════════════════════════════════
            MOBILE: VIDEO + PHOTO GRID WITH TAPE
            ═══════════════════════════════════════════════════ */}
        <div className="lg:hidden mb-12">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-forest"
              style={{
                boxShadow: "0 20px 40px -10px rgba(44, 51, 42, 0.3)",
              }}
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="rikriti workshop video"
              >
                <source src="/videos/workshop-video.mp4" type="video/mp4" />
              </video>

              <div className="absolute top-3 left-3 flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" aria-hidden="true" />
                <span className="text-[9px] font-body font-semibold tracking-[0.15em] uppercase text-forest">
                  Behind the Craft
                </span>
              </div>
            </div>
          </motion.div>

          {/* Photo grid with tape on each */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 pt-6"
          >
            <div className="relative">
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 z-30 pointer-events-none"
                style={{ transform: "translateX(-50%) rotate(-5deg)" }}
                aria-hidden="true"
              >
                <Image
                  src="/images/element-paper-strip.png"
                  alt=""
                  width={100}
                  height={20}
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/workshop-photo-2.jpg"
                  alt="Workshop moment"
                  fill
                  sizes="(max-width: 640px) 33vw, 200px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 z-30 pointer-events-none"
                style={{ transform: "translateX(-50%) rotate(3deg)" }}
                aria-hidden="true"
              >
                <Image
                  src="/images/element-paper-strip.png"
                  alt=""
                  width={100}
                  height={20}
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/workshop-photo-3.jpg"
                  alt="Workshop focus"
                  fill
                  sizes="(max-width: 640px) 33vw, 200px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 z-30 pointer-events-none"
                style={{ transform: "translateX(-50%) rotate(-2deg)" }}
                aria-hidden="true"
              >
                <Image
                  src="/images/element-paper-strip.png"
                  alt=""
                  width={100}
                  height={20}
                  className="w-full h-full object-cover opacity-95"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-md transform rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/workshop-artisans-group.jpg"
                  alt="Workshop artisans"
                  fill
                  sizes="(max-width: 640px) 33vw, 200px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════
            QUOTE UNDER VIDEO/PHOTOS
            ═══════════════════════════════════════════════════ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-16 lg:mb-24 font-display italic text-lg sm:text-xl lg:text-2xl text-forest/80 leading-relaxed max-w-2xl mx-auto px-4"
        >
          &ldquo;In a small home in Mulund, every stitch is intentional.&rdquo;
        </motion.p>

        {/* ═══════════════════════════════════════════════════
            SIGNATURE CLOSING WITH FLOWER ACCENT
            ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
            whileInView={{ opacity: 0.85, scale: 1, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -top-8 left-0 sm:left-8 w-12 sm:w-16 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/images/element-flower-tape.png"
              alt=""
              width={100}
              height={140}
              className="w-full h-auto"
            />
          </motion.div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px flex-1 max-w-[60px] bg-sage/40" aria-hidden="true" />
            <Heart
              className="w-4 h-4 text-sage"
              aria-hidden="true"
              strokeWidth={1.5}
              fill="currentColor"
            />
            <span className="h-px flex-1 max-w-[60px] bg-sage/40" aria-hidden="true" />
          </div>

          <p className="font-display italic text-3xl sm:text-4xl lg:text-5xl text-forest leading-tight mb-4">
            &ldquo;Every stitch,{" "}
            <span className="text-sage">a promise.&rdquo;</span>
          </p>

          <p className="font-display italic text-base sm:text-lg text-sage mb-10">
            — richa, founder of rikriti
          </p>

          <a
            href={buildWhatsAppLink({ type: "general" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero", "story_cta")}
            className="group inline-flex items-center gap-2 bg-forest text-cream px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase hover:bg-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 min-h-[52px]"
          >
            <Heart className="w-4 h-4" aria-hidden="true" fill="currentColor" />
            Start a Conversation
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}