import { create } from "zustand";
import { checkoutSchema } from "../validation/checkoutSchema";

const initialForm = {
  name: "",
  street: "",
  code: "",
};

export const useCheckoutStore = create((set, get) => ({
  form: initialForm,
  errors: {},

  setField: (field, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: undefined,
      },
    }));
  },

  validate: () => {
    const { form } = get();
    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      set({ errors: fieldErrors });
      return { success: false };
    }

    set({ errors: {} });
    return { success: true, data: result.data };
  },

  reset: () => {
    set({
      form: initialForm,
      errors: {},
    });
  },
}));
