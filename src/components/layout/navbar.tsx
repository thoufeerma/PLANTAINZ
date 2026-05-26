"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BRANDS", href: "/products", hasDropdown: true },
  { name: "FLAVORS", href: "/products", hasDropdown: true },
  { name: "BEST SELLERS", href: "/products" },
  { name: "CONTACT", href: "/about" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setIsCartOpen = useCartStore((state) => state.setIsOpen);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-50">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-widest font-bold">
                <span className="text-white">PLAN</span><span className="text-yellow-400">TAINZ</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-heading text-xl md:text-2xl tracking-widest text-white/90 hover:text-yellow-400 transition-colors flex items-center gap-1.5"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 z-50 text-white">
              <button className="p-2.5 border border-white/20 hover:border-white/50 rounded-full transition-colors hidden sm:block">
                <Heart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 border border-white/20 hover:border-white/50 rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {isMounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-primary text-[11px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link href="/products" className="hidden lg:flex border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-primary font-heading tracking-widest text-xl px-8 py-2 rounded-full transition-colors items-center justify-center">
                SHOP NOW
              </Link>

              <button className="p-2.5 border border-white/20 hover:border-white/50 rounded-full transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                className="p-2.5 border border-white/20 rounded-full lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center text-white"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="font-heading text-5xl hover:text-yellow-400 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-8 h-8 opacity-70" />}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                className="mt-8"
              >
                 <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-primary font-heading tracking-widest text-3xl px-12 py-4 rounded-full transition-colors flex items-center justify-center">
                  SHOP NOW
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
