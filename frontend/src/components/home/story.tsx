"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function AnimatedCounter({ value, text, suffix = "" }: { value: number, text: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
        {text}
      </div>
    </div>
  );
}

export function Story() {
  return (
    <section className="py-24 bg-[#FFFDF7] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div 
            className="hidden lg:block w-full lg:w-1/2 relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/product.jpeg" // Reusing the product.jpeg for lifestyle
              alt="Kerala Banana Chips Tradition"
              fill
              className="object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-secondary font-bold tracking-widest uppercase mb-4 block">Our Heritage</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              ROOTED IN KERALA, <br /> CRAFTED WITH LOVE.
            </h2>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              For generations, the secret to the perfect banana chip has been guarded by the matriarchs of Kerala. 
              We've taken those age-old recipes, sourced the finest Nendran bananas, and perfected the art of frying 
              them in pure coconut oil.
            </p>
            <p className="text-lg text-foreground/80 mb-12 leading-relaxed">
              Every packet of Plantainz is a promise of authenticity, crunch, and bold flavors that transport you 
              straight to the backwaters of God's Own Country.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <AnimatedCounter value={10} text="Happy Customers" suffix="k+" />
              <AnimatedCounter value={25} text="Unique Flavors" suffix="+" />
              <AnimatedCounter value={100} text="Natural Ingredients" suffix="%" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
