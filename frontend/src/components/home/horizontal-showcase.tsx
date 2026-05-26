"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: "Classic Salted", color: "#FACC15", image: "/images/classic_salted_chips_1779802123724.png" },
  { name: "Spicy Masala", color: "#ef4444", image: "/images/spicy_masala_chips_1779802140858.png" },
  { name: "Peri Peri", color: "#f97316", image: "/images/peri_peri_chips_1779802159308.png" },
  { name: "Sweet Jaggery", color: "#d97706", image: "/images/sweet_jaggery_chips_1779802200883.png" },
];

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".showcase-panel");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (scrollContainerRef.current?.offsetWidth || 0),
        }
      });

      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none"
      });

      // Packet scale animation inside the scroll
      panels.forEach((panel: any, i) => {
        const packet = panel.querySelector(".showcase-packet");
        const title = panel.querySelector(".showcase-title");
        
        gsap.from(packet, {
          scale: 0.5,
          rotation: -15,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        });
        
        gsap.from(title, {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <section ref={containerRef} className="h-[80vh] md:h-[90vh] w-full overflow-hidden bg-primary text-primary-foreground relative pt-20 md:pt-24">
        <div className="absolute top-24 md:top-32 left-4 md:left-16 z-20">
          <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold tracking-widest text-[#FFFDF7]">DISCOVER THE CRUNCH</h2>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex w-[400vw] h-full"
        >
          {products.map((product, i) => (
            <div 
              key={i} 
              className="showcase-panel w-screen h-full flex flex-col md:flex-row items-center justify-center relative px-4 md:px-8 pb-8 md:pb-12"
            >
              {/* Background Color Split or Accent */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{ background: `linear-gradient(135deg, transparent 50%, ${product.color} 50%)` }}
              ></div>
              
              <div className="w-full md:w-1/2 flex justify-center md:justify-end z-10 p-4 md:p-8 mt-12 md:mt-0">
                <h3 className="showcase-title font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center md:text-right leading-none drop-shadow-lg text-[#FFFDF7]">
                  {product.name.split(" ").map((word, idx) => (
                    <span key={idx} className="block">{word}</span>
                  ))}
                </h3>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center md:justify-start z-10 h-[35vh] md:h-[55vh] relative mt-8 md:mt-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="showcase-packet object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
