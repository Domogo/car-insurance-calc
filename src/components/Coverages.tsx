import { Coverage } from "@/util/types";
import { LabelledCheckbox } from "./LabelledCheckbox";

const COVERAGES: Coverage[] = [
  {
    id: "bonus-protection",
    name: "Bonus Protection",
    description: "12% of base price",
  },
  {
    id: "ao-plus",
    name: "AO+",
    description: "55EUR for users < 30 years old, 105 for older",
  },
  {
    id: "glass-protection",
    name: "Glass Protection",
    description: "80% of vehicle power",
  },
];

export const Coverages = () => {
  return (
    <fieldset className="bg-neutral-200 py-8">
      <legend className="sr-only">Coverages</legend>
      <div className="p-4 flex flex-col gap-4">
        {COVERAGES.map((coverage) => (
          <LabelledCheckbox key={coverage.id} {...coverage} />
        ))}
      </div>
    </fieldset>
  );
};
