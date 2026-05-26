"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WcProduct, WcProductVariation } from "@/types/woocommerce";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Heart, Star, Truck, ShieldCheck, Leaf } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ProductDetailsClient({ product }: { product: WcProduct }) {
  const [activeImage, setActiveImage] = useState(product.images?.[0]?.src || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  
  const addItem = useCartStore((state) => state.addItem);

  // Auto-select first available options
  useState(() => {
    const initialAttrs: Record<string, string> = {};
    product.attributes?.forEach(attr => {
      if (attr.variation && attr.options.length > 0) {
        initialAttrs[attr.name] = attr.options[0];
      }
    });
    setSelectedAttributes(initialAttrs);
  });

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      product,
      quantity,
      price: Number(product.price || 0),
      attributes: selectedAttributes,
      // For a real WooCommerce setup, you'd match selectedAttributes to a variation ID
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Left: Image Gallery */}
      <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
          {product.images?.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(img.src)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors bg-[#f4ecd8]/30 ${
                activeImage === img.src ? "border-primary" : "border-transparent hover:border-primary/50"
              }`}
            >
              <Image src={img.src} alt={img.alt || product.name} fill className="object-contain p-2 drop-shadow-md" />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative w-full aspect-square md:aspect-[4/5] bg-[#f4ecd8]/30 rounded-3xl overflow-hidden group cursor-zoom-in">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full relative"
          >
            <Image 
              src={activeImage || "/images/product-placeholder.jpeg"} 
              alt={product.name} 
              fill 
              className="object-contain p-8 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" 
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-6 border-b border-border pb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(Number(product.average_rating)) ? "fill-current" : ""}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.average_rating} ({product.rating_count} reviews)</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.regular_price && product.regular_price !== product.price && (
              <span className="text-xl text-muted-foreground line-through mb-1">₹{product.regular_price}</span>
            )}
            {product.on_sale && (
              <span className="bg-destructive/10 text-destructive text-sm font-bold px-2 py-1 rounded mb-1">
                Save ₹{Number(product.regular_price) - Number(product.price)}
              </span>
            )}
          </div>
          
          <div className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: product.short_description }} />
        </div>

        {/* Variations */}
        {product.attributes?.map(attr => attr.variation && (
          <div key={attr.id} className="mb-6">
            <h4 className="font-semibold mb-3">{attr.name}</h4>
            <div className="flex flex-wrap gap-3">
              {attr.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAttributeChange(attr.name, opt)}
                  className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                    selectedAttributes[attr.name] === opt 
                      ? "border-primary bg-primary/5 text-primary font-bold shadow-sm" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center border border-border rounded-md h-12 bg-background">
            <button 
              className="px-4 h-full hover:bg-muted transition-colors flex items-center justify-center rounded-l-md"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button 
              className="px-4 h-full hover:bg-muted transition-colors flex items-center justify-center rounded-r-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <Button 
            size="lg" 
            className="flex-1 h-12 text-lg font-bold gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5" /> Add to Cart - ₹{Number(product.price) * quantity}
          </Button>

          <Button size="icon" variant="outline" className="h-12 w-12 rounded-md">
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-border">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">100% Natural</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Secure Payment</span>
          </div>
        </div>

        {/* Tabs / Accordions */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 text-muted-foreground leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </TabsContent>
          <TabsContent value="ingredients" className="p-4 text-muted-foreground leading-relaxed">
            <p>Premium Nendran Bananas, Pure Coconut Oil, Sea Salt, Selected Spices (for flavored varieties).</p>
            <p className="mt-2 text-sm italic">Allergen info: Manufactured in a facility that also processes peanuts.</p>
          </TabsContent>
          <TabsContent value="shipping" className="p-4 text-muted-foreground leading-relaxed">
            <p>Standard delivery within 3-5 business days.</p>
            <p className="mt-2">Free shipping on orders over ₹499.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
