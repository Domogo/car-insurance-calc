import { Discount } from "@/util/types";
import { LabelledCheckbox } from "./LabelledCheckbox";

const DISCOUNTS: Discount[] = [
  {
    id: "commercial",
    name: "Commercial Discount",
    description: "10% on base price",
  },
  {
    id: "advisor",
    name: "Advisor Discount",
    description: "20% on all coverages (at least 2 coverages selected)",
  },
  {
    id: "vip",
    name: "VIP Discount",
    description: "5% on total price - only if vehicle power > 80",
  },
  {
    id: "strong-car-surcharge",
    name: "Strong car surcharge",
    description:
      "+10% on total price if car power > 100. Applied automatically",
  },
];

export const Header = () => {
  return (
    <fieldset className="p-4 flex gap-4 bg-neutral-200 justify-center">
      <legend className="sr-only">Discounts</legend>
      {DISCOUNTS.map((discount) => (
        <LabelledCheckbox key={discount.id} {...discount} />
      ))}

      <div className="p-4 flex flex-col gap-2">
        <p>Total price:</p>
        <p>42EUR</p>
      </div>
    </fieldset>
  );
};
