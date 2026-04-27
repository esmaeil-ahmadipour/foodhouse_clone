import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  type: null,
  props: null,
  content: null,

  openModal: ({ type, props = null, content = null }) =>
    set({ isOpen: true, type, props, content }),

  closeModal: () =>
    set({ isOpen: false, type: null, props: null, content: null }),
}));
