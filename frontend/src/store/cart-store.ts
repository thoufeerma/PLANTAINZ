import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WcProduct } from '@/types/woocommerce';

export interface CartItem {
  id: string; // Unique ID for cart item (product ID + variation ID + attributes)
  productId: number;
  variationId?: number;
  product: WcProduct;
  quantity: number;
  price: number; // Stored price at time of adding
  attributes?: Record<string, string>; // e.g. { Weight: "250g" }
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  
  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        // Generate a unique ID based on product, variation, and selected attributes
        const attributesKey = item.attributes 
          ? Object.entries(item.attributes).sort().map(([k, v]) => `${k}:${v}`).join('|')
          : '';
        const id = `${item.productId}-${item.variationId || '0'}-${attributesKey}`;

        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true, // Open cart when adding
            };
          }
          // Add new item
          return { items: [...state.items, { ...item, id }], isOpen: true };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      setIsOpen: (isOpen) => set({ isOpen }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'plantainz-cart', // Persist cart to localStorage
    }
  )
);
