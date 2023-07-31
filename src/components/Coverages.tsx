import { COVERAGES } from "@/util/types";
import { LabelledCheckbox } from "./LabelledCheckbox";
import { useInsurance } from "@/util/insuranceContext";

export const Coverages = () => {
  const { prices } = useInsurance();
  return (
    <fieldset className="bg-neutral-200 py-8 w-96">
      <legend className="sr-only">Coverages</legend>
      <div className="p-4 flex flex-col gap-4">
        {prices.basePrice ? (
          <>
            {COVERAGES.map((coverage) => (
              <LabelledCheckbox key={coverage.id} {...coverage} />
            ))}
          </>
        ) : (
          <p className="max-w-[20ch]">
            Please, fill out the form to see available coverages.
          </p>
        )}
      </div>
    </fieldset>
  );
};
