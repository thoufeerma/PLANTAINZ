"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WcProduct } from "@/types/woocommerce";
import { ProductCard } from "@/components/product/product-card";

export function BestSellers({ products }: { products: WcProduct[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Extract unique categories from products, flatMap because product can have multiple categories
  const categories = ["All", ...Array.from(new Set(products.flatMap(p => p.categories.map(c => c.name || ""))))].filter(Boolean);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.categories.some(c => c.name === activeCategory));

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-secondary font-bold tracking-widest uppercase mb-2">Our Pride</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8">
            BEST SELLERS
          </h2>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-secondary/20 hover:text-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          layout
        >
          {filteredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
