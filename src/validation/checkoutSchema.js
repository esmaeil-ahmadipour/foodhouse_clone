import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  street: z.string().min(3, "Street is too short"),
  code: z
    .string()
    .regex(/^\d+$/, "Postal code must contain only numbers")
    .length(10, "Postal code must be exactly 10 digits")
    .transform((val) => parseInt(val, 10)),
});
