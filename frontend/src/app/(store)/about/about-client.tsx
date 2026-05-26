"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Flame, HeartHandshake } from "lucide-react";

export function AboutClient() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/product.jpeg" 
            alt="Kerala Bananas" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground max-w-4xl px-4">
          <motion.h1 
            className="font-heading text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OUR STORY
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-primary-foreground/90 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From the heart of Kerala to your hands. The pursuit of the perfect crunch.
          </motion.p>
        </div>
      </section>

      {/* Brand Story & Kerala Tradition */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl font-bold text-primary mb-6">THE TRADITION</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Banana chips are not just a snack in Kerala; they are an emotion. At Plantainz, we've 
                dedicated ourselves to preserving the authentic, unadulterated flavor of traditional 
                Sarkara Upperi and savory chips. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We work directly with local farmers in Kerala to source the finest Nendran bananas, 
                ensuring that every chip carries the golden hue and unmistakable taste that defines our heritage.
              </p>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image 
                src="/images/sweet_jaggery_chips_1779802200883.png" 
                alt="Sweet Jaggery Chips Tradition" 
                fill 
                className="object-cover bg-secondary"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl font-bold text-primary mb-6">OUR COMMITMENT</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              className="bg-card p-8 rounded-3xl shadow-sm text-center"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">100% Natural</h3>
              <p className="text-muted-foreground">No artificial colors, flavors, or preservatives. Just pure, wholesome ingredients.</p>
            </motion.div>

            <motion.div 
              className="bg-card p-8 rounded-3xl shadow-sm text-center"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Small Batch Frying</h3>
              <p className="text-muted-foreground">Cooked in small batches using premium coconut oil for the perfect golden crisp.</p>
            </motion.div>

            <motion.div 
              className="bg-card p-8 rounded-3xl shadow-sm text-center"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Ethically Sourced</h3>
              <p className="text-muted-foreground">Direct trade with Kerala farmers ensures fair prices and the highest quality produce.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
