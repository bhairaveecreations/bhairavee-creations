import { create } from "zustand";

// ✅ UPDATED TYPE (FIXES YOUR ERROR)
type CartItem = {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string; // 🔥 NEW (IMPORTANT)
};

type CartState = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  increaseQty: (productId: string, variant?: string) => void;
  decreaseQty: (productId: string, variant?: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({

  items: [],

  // 🛒 ADD TO CART (VARIANT SAFE)
  addToCart: (item) =>
    set((state) => {

      const existingItem = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.variant === item.variant // 🔥 key fix
      );

      // if same product + same variant → increase qty
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId &&
            i.variant === item.variant
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      // new item
      return {
        items: [...state.items, item],
      };
    }),

  // ❌ REMOVE ITEM
  removeFromCart: (productId, variant) =>
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(i.productId === productId && i.variant === variant)
      ),
    })),

  // ➕ INCREASE QUANTITY
  increaseQty: (productId, variant) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.variant === variant
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    })),

  // ➖ DECREASE QUANTITY
  decreaseQty: (productId, variant) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.productId === productId && i.variant === variant
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  // 🧹 CLEAR CART
  clearCart: () => set({ items: [] }),

}));