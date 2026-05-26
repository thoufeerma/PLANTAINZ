import { WcProduct } from "@/types/woocommerce";
import { getProducts } from "./get-products";

export const getProductBySlug = async (slug: string): Promise<WcProduct | null> => {
  try {
    const products = await getProducts();
    const product = products.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
};
