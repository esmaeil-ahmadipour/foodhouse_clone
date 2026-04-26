import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street is required"),
  code: z.string().min(1, "Code is required"),
});
