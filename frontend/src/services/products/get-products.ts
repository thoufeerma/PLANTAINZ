import { WcProduct } from "@/types/woocommerce";

export const getProducts = async (): Promise<WcProduct[]> => {
  try {
    // If running on the server (Server Components)
    if (typeof window === "undefined") {
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "public", "mock", "products.json");
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } 
    
    // If running on the client
    const response = await fetch("/mock/products.json");
    if (!response.ok) throw new Error("Failed to fetch mock products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
