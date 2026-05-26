"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const packetRef1 = useRef<HTMLDivElement>(null);
  const packetRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline();
      
      tl.fromTo(textRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo([packetRef1.current, packetRef2.current],
        { y: 200, opacity: 0, rotation: 15 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.5"
      );

      // Scroll parallax - Desktop only to prevent collisions on mobile stacked layout
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(packetRef1.current, {
          y: -100,
          rotation: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.to(packetRef2.current, {
          y: -150,
          rotation: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFDF7] to-[#f4ecd8] pt-24 md:pt-40 pb-16 md:pb-32"
    >
      {/* Background grain texture could be added here via CSS or pseudo element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center mt-4 md:mt-0 gap-8 md:gap-0">
        
        {/* Text Content */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] text-primary mb-6">
            CRUNCH INTO <br/>
            <span className="text-secondary">REAL KERALA</span> <br/>
            FLAVORS
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-lg mb-8 text-foreground/80 font-medium px-4 md:px-0">
            Authentic banana chips crafted with bold spices, premium oils, and irresistible crunch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto md:mx-0">
            <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto rounded-full text-lg h-14 px-8 font-bold flex items-center justify-center")}>
              Shop Now
            </Link>
            <Link href="/about" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto rounded-full text-lg h-14 px-8 font-bold flex items-center justify-center bg-white")}>
              Explore Flavors
            </Link>
          </div>
        </div>

        {/* Floating Images */}
        <div className="w-full md:w-1/2 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 md:mb-0 flex justify-center items-center">
          {/* Background Packet (Spicy Masala) */}
          <div 
            ref={packetRef2} 
            className="absolute top-4 md:top-20 left-4 sm:left-12 md:left-10 w-[150px] h-[210px] sm:w-[200px] sm:h-[280px] md:w-[280px] md:h-[380px] lg:w-[350px] lg:h-[450px] z-10"
          >
            <Image 
              src="/images/spicy_masala_v3.png" 
              alt="Spicy Masala Chips" 
              fill 
              className="object-contain opacity-90 drop-shadow-xl"
              priority
            />
          </div>

          {/* Foreground Packet (Classic Salted) */}
          <div 
            ref={packetRef1} 
            className="absolute top-0 right-4 sm:right-12 md:right-10 w-[180px] h-[250px] sm:w-[250px] sm:h-[350px] md:w-[350px] md:h-[450px] lg:w-[450px] lg:h-[550px] z-20"
          >
            <Image 
              src="/images/classic_salted_v3.png" 
              alt="Classic Salted Chips" 
              fill 
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scallop Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C79.4,115.65,156.4,111.45,233.1,95.8,263.3,89.55,292.9,79.54,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
