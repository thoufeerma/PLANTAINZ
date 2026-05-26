import { Hero } from "@/components/home/hero";
import { FeatureStrip } from "@/components/home/feature-strip";
import { BestSellers } from "@/components/home/best-sellers";
import { Story } from "@/components/home/story";
import { HorizontalShowcase } from "@/components/home/horizontal-showcase";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";
import { getProducts } from "@/services/products/get-products";

// Metadata for SEO
export const metadata = {
  title: "Plantainz | Premium Kerala Banana Chips",
  description: "Authentic banana chips crafted with bold spices, premium oils, and irresistible crunch. Made in Kerala.",
  openGraph: {
    title: "Plantainz | Premium Kerala Banana Chips",
    description: "Authentic banana chips crafted with bold spices, premium oils, and irresistible crunch.",
    url: "https://plantainz.com",
    siteName: "Plantainz",
    images: [
      {
        url: "/images/product.jpeg",
        width: 1200,
        height: 630,
        alt: "Plantainz Premium Banana Chips",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default async function Home() {
  const products = await getProducts();
  
  return (
    <>
      <Hero />
      <FeatureStrip />
      <BestSellers products={products} />
      <Story />
      <HorizontalShowcase />
      <Testimonials />
      <CTA />
    </>
  );
}
