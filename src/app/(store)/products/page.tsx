import { getProducts } from "@/services/products/get-products";
import { ProductListClient } from "@/components/product/product-list-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | Plantainz",
  description: "Browse our premium selection of authentic Kerala banana chips. Available in classic salted, spicy masala, peri peri, and sweet jaggery.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      {/* Page Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4">
          ALL PRODUCTS
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover the authentic taste of Kerala. Every batch is carefully sliced, perfectly fried in premium coconut oil, and seasoned with locally sourced spices.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductListClient initialProducts={products} />
      </div>
    </div>
  );
}
