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

// partial from insuranceFormSchema fields
export type CheckBoxIds =
  | "commercialDiscount"
  | "advisorDiscount"
  | "vipDiscount"
  | "strongCarSurcharge"
  | "bonusProtection"
  | "aoPlus"
  | "glassProtection";

export const COVERAGES: Coverage[] = [
  {
    id: "bonusProtection",
    name: "Bonus Protection",
    description: "12% of base price",
  },
  {
    id: "aoPlus",
    name: "AO+",
    description: "55EUR for users < 30 years old, 105 for older",
  },
  {
    id: "glassProtection",
    name: "Glass Protection",
    description: "80% of vehicle power",
  },
];

export const DISCOUNTS: Discount[] = [
  {
    id: "commercialDiscount",
    name: "Commercial Discount",
    description: "10% on base price",
  },
  {
    id: "advisorDiscount",
    name: "Advisor Discount",
    description: "20% on all coverages (at least 2 coverages selected)",
  },
  {
    id: "vipDiscount",
    name: "VIP Discount",
    description: "5% on total price - only if vehicle power > 80",
  },
  {
    id: "strongCarSurcharge",
    name: "Strong car surcharge",
    description:
      "+10% on total price if car power > 100. Applied automatically",
  },
];

export type InsurancePrices = {
  basePrice: number;
  totalPrice: number;
  commercialDiscount: number;
  advisorDiscount: number;
  bonusProtectionSurcharge: number;
  aoPlusSurcharge: number;
  glassProtectionSurcharge: number;
  vipDiscount: number;
  strongCarSurcharge: number;
};
