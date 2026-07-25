"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageCircle, Sparkles, Filter } from "lucide-react";
import { buildWhatsAppLink, trackWhatsAppClick } from "@/lib/whatsapp";
import {
  CATEGORIES,
  getProductsByCategory,
  formatPrice,
  type Product,
  type ProductCategory,
} from "@/lib/products";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProducts = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

  const handleFilterChange = (category: ProductCategory | "all") => {
    setActiveCategory(category);
    setVisibleCount(8);
  };

  const handleProductClick = (product: Product) => {
    trackWhatsAppClick("product_card", product.name);
  };

  return (
    <section
      id="collections"
      aria-labelledby="catalog-heading"
      className="relative bg-cream py-20 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-sage">
              The Complete Collection
            </span>
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </div>

          <h2
            id="catalog-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-forest mb-6"
          >
            Every piece,{" "}
            <em className="text-sage">a little love story.</em>
          </h2>

          <p className="font-body text-base sm:text-lg text-forest/70 leading-relaxed">
            Explore the full collection. Filter by what you love. Tap any piece to order via WhatsApp.
          </p>
        </motion.div>

        {/* ── FILTER TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-start sm:justify-center mb-10 lg:mb-14 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
          role="tablist"
          aria-label="Filter products by category"
        >
          <div className="inline-flex items-center gap-1 bg-ivory/70 backdrop-blur-sm border border-taupe/30 rounded-full p-1.5 shadow-sm">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => handleFilterChange(category.slug)}
                  className={`relative px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-body font-semibold tracking-[0.15em] uppercase rounded-full whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${
                    isActive ? "text-cream" : "text-forest/60 hover:text-forest"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="product-grid"
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-filter-pill"
                      className="absolute inset-0 bg-forest rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── PRODUCT COUNT + CUSTOM CTA ── */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <p className="text-xs font-body text-forest/60 tracking-wider">
            <span className="font-semibold text-forest">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "piece" : "pieces"}
          </p>

          <a
            href={buildWhatsAppLink({ type: "custom" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("product_catalog", "custom_from_filter")}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-body font-semibold tracking-[0.15em] uppercase text-sage hover:text-forest transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Design Custom
          </a>
        </div>

        {/* ── PRODUCT GRID ── */}
        <motion.div
          id="product-grid"
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 lg:gap-8"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── EMPTY STATE ── */}
        {displayedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-12 h-12 text-sage/30 mx-auto mb-4" aria-hidden="true" />
            <p className="font-body text-forest/60">No pieces in this category yet.</p>
            <button
              onClick={() => handleFilterChange("all")}
              className="mt-4 text-sm font-body font-semibold tracking-wider uppercase text-sage hover:text-forest transition-colors border-b border-sage/40 pb-0.5"
            >
              View all pieces
            </button>
          </motion.div>
        )}

        {/* ── LOAD MORE ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 lg:mt-14"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 border border-forest/25 hover:border-sage hover:bg-sage/5 text-forest px-8 py-4 rounded-full text-xs font-body font-semibold tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            >
              Load More Pieces
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}

        
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD SUBCOMPONENT
   ═══════════════════════════════════════════════════════════ */

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

function ProductCard({ product, index, onClick }: ProductCardProps) {
  const isPlaceholder = product.imageUrl.startsWith("URL_HERE");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <a
        href={buildWhatsAppLink({
          type: "product",
          product: {
            name: product.name,
            price: product.price,
            category: product.category,
          },
        })}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block bg-ivory rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
        aria-label={`Order ${product.name} via WhatsApp`}
      >
        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 flex flex-col gap-1">
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 bg-forest/95 backdrop-blur-sm text-cream text-[8px] sm:text-[9px] font-body font-semibold tracking-[0.15em] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
              <span className="hidden sm:inline">Bestseller</span>
              <span className="sm:hidden">Top</span>
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center bg-sage text-cream text-[8px] sm:text-[9px] font-body font-semibold tracking-[0.15em] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              New
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-taupe/10 overflow-hidden">
          {isPlaceholder ? (
            <div
              className="w-full h-full bg-gradient-to-br from-sage/10 via-butter/15 to-taupe/10 flex items-center justify-center"
              aria-hidden="true"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-sage/30" />
            </div>
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Hover overlay */}
          <div className="hidden sm:flex absolute inset-0 bg-forest/0 group-hover:bg-forest/15 transition-colors duration-300 items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 bg-cream text-forest px-4 py-2.5 rounded-full text-[10px] font-body font-semibold tracking-[0.15em] uppercase shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Order via WhatsApp
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5 lg:p-6">
          <span className="inline-block text-[8px] sm:text-[9px] font-body font-semibold tracking-[0.25em] uppercase text-sage mb-1.5 sm:mb-2">
            {product.category}
          </span>

          <h3 className="font-display text-sm sm:text-lg lg:text-xl text-forest leading-tight mb-1.5 sm:mb-2 group-hover:text-sage transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>

          <p className="hidden sm:block font-body text-xs text-forest/60 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex items-end justify-between pt-2 sm:pt-3 border-t border-taupe/20">
            <div>
              <p className="font-display italic text-base sm:text-xl text-forest">
                {formatPrice(product.price)}
              </p>
              {product.craftDays && (
                <p className="hidden sm:block text-[10px] font-body text-forest/50 mt-0.5 tracking-wider">
                  Crafted in {product.craftDays} days
                </p>
              )}
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cream border border-sage/30 flex items-center justify-center text-forest group-hover:bg-forest group-hover:border-forest group-hover:text-cream transition-all duration-300 shrink-0">
              <ArrowUpRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform duration-300"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}