"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Arjun Nair",
    role: "Food Blogger",
    content: "The authentic taste of Kerala in every bite! These are hands down the best banana chips I've ever had outside my grandmother's kitchen.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Verified Buyer",
    content: "The Peri Peri flavor is dangerously addictive. I finished a whole 250g packet in one sitting. Excellent packaging and fast delivery too.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Snack Enthusiast",
    content: "Incredible crunch. You can really taste the quality of the coconut oil. The sweet jaggery ones are a perfect dessert snack.",
    rating: 4,
  },
  {
    name: "Meera Menon",
    role: "Verified Buyer",
    content: "Reminds me of home. The classic salted is perfectly seasoned, not too salty, and thinly sliced just right.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#f4ecd8] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-6">
            HEAR IT FROM <br /> THE CRUNCHERS
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Don't just take our word for it. See what our customers have to say about the Plantainz experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              className="bg-background rounded-3xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Quote className="text-primary/10 w-16 h-16 absolute top-4 right-4 z-0" />
              
              <div className="flex gap-1 mb-6 text-yellow-400 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-current' : 'text-muted'}`} />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-8 leading-relaxed relative z-10 italic">
                "{t.content}"
              </p>
              
              <div className="relative z-10 mt-auto">
                <h4 className="font-bold text-primary font-heading tracking-wide text-xl">{t.name}</h4>
                <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
