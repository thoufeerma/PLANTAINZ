import { getProductBySlug } from "@/services/products/get-product";
import { getProducts } from "@/services/products/get-products";
import { ProductDetailsClient } from "@/components/product/product-details-client";
import { ProductCard } from "@/components/product/product-card";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | Plantainz" };
  }

  return {
    title: `${product.name} | Plantainz`,
    description: product.short_description.replace(/<[^>]+>/g, ''),
    openGraph: {
      title: `${product.name} | Plantainz`,
      description: product.short_description.replace(/<[^>]+>/g, ''),
      images: [
        {
          url: product.images?.[0]?.src || "/images/product.jpeg",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => product.related_ids.includes(p.id));

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailsClient product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="font-heading text-4xl font-bold mb-12 text-center text-primary">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
