import { DISCOUNTS } from "@/util/types";
import { LabelledCheckbox } from "./LabelledCheckbox";
import { useInsurance } from "@/util/insuranceContext";

export const Header = () => {
  const { prices, form } = useInsurance();

  const vehiclePower = form.getValues("vehiclePower");

  return (
    <fieldset className="p-4 flex gap-4 bg-neutral-200 justify-center items-center h-40">
      <legend className="sr-only">Discounts</legend>
      {prices.basePrice ? (
        <>
          {DISCOUNTS.map((discount) => {
            if (discount.id === "strongCarSurcharge" && vehiclePower <= 100)
              return null;
            if (discount.id === "vipDiscount" && vehiclePower <= 80)
              return null;
            return <LabelledCheckbox key={discount.id} {...discount} />;
          })}

          <div className="p-4 flex flex-col gap-2">
            <p>Total price:</p>
            <p>{prices.totalPrice} EUR</p>
          </div>
        </>
      ) : (
        <p>Please, fill out the form to see available discounts.</p>
      )}
    </fieldset>
  );
};
