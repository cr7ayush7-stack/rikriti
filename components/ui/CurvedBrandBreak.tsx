"use client";

import { useId, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   CURVED BRAND BREAK
   
   Curved marquee using SVG textPath with SMIL animation.
   Font size set as SVG attribute (not CSS) for correct scaling.
   Responsive viewBox and padding for mobile optimization.
   ═══════════════════════════════════════════════════════════ */

interface CurvedBrandBreakProps {
  text?: string;
  direction?: "left" | "right";
  duration?: number;
  curve?: number;
}

export default function CurvedBrandBreak({
  text = "rikriti · handmade · intricate · timeless · ",
  direction = "left",
  duration = 40,
  curve = 40,
}: CurvedBrandBreakProps) {
  const uid = useId();
  const pathId = `curve-path-${uid}`;
  const gradientId = `curve-gradient-${uid}`;
  const maskId = `curve-mask-${uid}`;

  // Detect mobile for responsive viewBox + font sizing
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile uses smaller viewBox = text appears LARGER relative to viewport
  const viewBoxWidth = isMobile ? 800 : 1440;
  const viewBoxHeight = isMobile ? 180 : 200;
  const pathMidX = viewBoxWidth / 2;
  const curveDepth = 100 + curve;
  const pathD = `M 0,100 Q ${pathMidX},${curveDepth} ${viewBoxWidth},100`;

  // Font size in SVG units (not CSS) — scales predictably with viewBox
  const fontSize = isMobile ? 68 : 60;

  // Repeat text to fill and loop
  const repeatedText = Array(10).fill(text).join("");

  // Calculate animation distance based on viewBox
  const animDistance = isMobile ? -800 : -1200;
  const animFrom = direction === "left" ? "0" : String(animDistance);
  const animTo = direction === "left" ? String(animDistance) : "0";

  return (
    <section
      aria-label="rikriti brand break"
      className="relative bg-cream overflow-hidden py-6 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Top divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-8 md:mb-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 opacity-70">
          <span
            className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-sage/30"
            aria-hidden="true"
          />
          <span
            className="text-[9px] sm:text-[10px] font-body tracking-[0.4em] uppercase text-sage/60"
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-sage/30"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Curved SVG marquee */}
      <div className="relative w-full h-[80px] sm:h-[140px] md:h-[180px] lg:h-[200px]">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          role="presentation"
        >
          <defs>
            <path id={pathId} d={pathD} fill="none" />

            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="6%" stopColor="white" stopOpacity="1" />
              <stop offset="94%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id={maskId}>
              <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
            </mask>
          </defs>

          <text
            fill="#869179"
            fontSize={fontSize}
            fontStyle="italic"
            fontWeight="400"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              letterSpacing: "0.02em",
            }}
            mask={`url(#${maskId})`}
          >
            <textPath href={`#${pathId}`} startOffset="0">
              {repeatedText}
              <animate
                attributeName="startOffset"
                from={animFrom}
                to={animTo}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </div>

      {/* Bottom divider */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 md:mt-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 opacity-70">
          <span
            className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-sage/30"
            aria-hidden="true"
          />
          <span className="text-[9px] sm:text-[10px] font-body font-medium tracking-[0.3em] sm:tracking-[0.35em] uppercase text-sage/60 text-center whitespace-nowrap">
            made with love · mulund mumbai
          </span>
          <span
            className="h-px flex-1 max-w-[40px] sm:max-w-[100px] bg-sage/30"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}