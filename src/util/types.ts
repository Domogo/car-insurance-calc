import { z } from "zod";

export type Discount = {
  id: string;
  name: string;
  description: string;
};

export type Coverage = Discount;

export const schema = z.object({
  name: z.string().nonempty(),
  city: z.string().nonempty(),
  dateOfBirth: z
    .date()
    .refine(
      (date) => new Date(Date.now()).getFullYear() - date.getFullYear() >= 18,
      { message: "Car owner must be at least 18 years old" }
    ),
  vehiclePower: z.number().positive(),
  voucher: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  priceMatch: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  commercialDiscount: z.boolean().default(false),
  advisorDiscount: z.boolean().default(false),
  vipDiscount: z.boolean().default(false),
  strongCarSurcharge: z.boolean().default(false),
  bonusProtection: z.boolean().default(false),
  aoPlus: z.boolean().default(false),
  glassProtection: z.boolean().default(false),
});

export type InsuranceFormSchema = z.infer<typeof schema>;
