"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { WcProduct } from "@/types/woocommerce";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: WcProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      product,
      quantity: 1,
      price: Number(product.price || 0),
    });
  };

  const imageSrc = product.images?.[0]?.src || "/images/product-placeholder.jpeg";
  const hoverImageSrc = product.images?.[1]?.src || imageSrc; // Fallback to first image if no second image

  return (
    <motion.div
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.on_sale && (
          <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
        <Heart className="w-5 h-5" />
      </button>

      <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-[#f4ecd8]/30 p-4 sm:p-8">
        <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
          <Image
            src={isHovered ? hoverImageSrc : imageSrc}
            alt={product.name}
            fill
            className="object-contain drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1 text-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-foreground">{product.average_rating}</span>
            <span className="text-xs text-muted-foreground">({product.rating_count})</span>
          </div>
        </div>
        
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-lg sm:text-2xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-2 sm:mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-base sm:text-xl font-bold">₹{product.price}</span>
            {product.regular_price && product.regular_price !== product.price && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">₹{product.regular_price}</span>
            )}
          </div>
          
          <Button 
            size="icon" 
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 shadow-md"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
