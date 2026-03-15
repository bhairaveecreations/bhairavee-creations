import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => i.productId !== productId
          ),
        })),

      increaseQty: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decreaseQty: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);