"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WcProduct } from "@/types/woocommerce";
import { ProductCard } from "@/components/product/product-card";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductListClient({ initialProducts }: { initialProducts: WcProduct[] }) {
  const [products, setProducts] = useState<WcProduct[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(initialProducts.flatMap(p => p.categories.map(c => c.name || ""))))].filter(Boolean);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(p => p.categories.some(c => c.name === activeCategory));
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "rating":
        result.sort((a, b) => Number(b.average_rating) - Number(a.average_rating));
        break;
      case "newest":
      case "featured":
      default:
        // Mock default sorting
        break;
    }

    return result;
  }, [initialProducts, searchQuery, activeCategory, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </h3>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    className="accent-primary"
                    checked={activeCategory === cat}
                    onChange={() => setActiveCategory(cat)}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> results
          </p>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={(val) => setSortBy(val || "featured")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-muted rounded-md p-1">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-sm transition-colors ${viewMode === "grid" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-sm transition-colors ${viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
          >
            <AnimatePresence>
              {filteredAndSortedProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === "list" ? "flex gap-6 border-b pb-6" : ""}
                >
                  {viewMode === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    // Very simple list view layout inline
                    <div className="flex gap-6 w-full items-center bg-card p-4 rounded-xl border">
                      <div className="w-32 h-32 relative flex-shrink-0 bg-[#f4ecd8]/30 rounded-lg">
                        <img src={product.images?.[0]?.src} alt={product.name} className="object-contain w-full h-full p-2 drop-shadow-md" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4" dangerouslySetInnerHTML={{ __html: product.short_description }}></p>
                        <div className="flex gap-4 items-center">
                          <span className="font-bold text-xl">₹{product.price}</span>
                          <button className="text-sm text-primary font-semibold hover:underline">View Details</button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredAndSortedProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <p>No products found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
