"use client";

import { motion } from "framer-motion";
import { Leaf, Flame, UtensilsCrossed, Truck } from "lucide-react";

const features = [
  { icon: Leaf, text: "Fresh Ingredients" },
  { icon: Flame, text: "Kerala Inspired" },
  { icon: UtensilsCrossed, text: "Small Batch Cooked" },
  { icon: Truck, text: "Fast Delivery" },
];

export function FeatureStrip() {
  // Duplicate array multiple times to ensure seamless infinite scroll
  const duplicatedFeatures = [...features, ...features, ...features, ...features];

  return (
    <div className="bg-primary text-primary-foreground py-6 overflow-hidden flex whitespace-nowrap relative border-y-4 border-secondary">
      <motion.div
        className="flex gap-16 md:gap-32 items-center px-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <feature.icon className="w-8 h-8" />
            <span className="font-heading text-2xl tracking-widest uppercase">
              {feature.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
