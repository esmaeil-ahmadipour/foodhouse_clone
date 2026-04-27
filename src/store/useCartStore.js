import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalAmount: 0,

      addItem: (newItem) => {
        const existingItemIndex = get().items.findIndex(
          (item) => item.id === newItem.id,
        );

        let updatedItems;
        let updatedTotalAmount;

        if (existingItemIndex !== -1) {
          // Item exists, increase the quantity
          const existingItem = get().items[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + newItem.amount,
          };
          updatedItems = [...get().items];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          // new Item
          updatedItems = [...get().items, newItem];
        }

        updatedTotalAmount = get().totalAmount + newItem.price * newItem.amount;

        set({
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
      },

      removeItem: (id) => {
        const existingItemIndex = get().items.findIndex(
          (item) => item.id === id,
        );

        if (existingItemIndex === -1) return;

        const existingItem = get().items[existingItemIndex];
        const updatedTotalAmount = get().totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
          updatedItems = get().items.filter((item) => item.id !== id);
        } else {
          const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
          };
          updatedItems = [...get().items];
          updatedItems[existingItemIndex] = updatedItem;
        }

        set({
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        });
      },

      clear: () => {
        set({
          items: [],
          totalAmount: 0,
        });
      },
    }),
    {
      name: "cart-storage",// name for localStorage
    },
  ),
);
