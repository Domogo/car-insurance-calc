import { useInsurance } from "@/util/insuranceContext";

export const InsuranceDetails = () => {
  const { prices, form } = useInsurance();

  if (!prices.basePrice) return null;

  const voucher = form.getValues("voucher");
  const voucherAmount = isNaN(Number(voucher)) ? 0 : Number(voucher);
  return (
    <div className="px-28 py-8 flex flex-col gap-4">
      <p>InsuranceDetails</p>

      <hr />

      <p>Base price: {prices.basePrice} EUR</p>
      <p>
        Base price without price matching: {prices.basePriceWithoutPriceMatch}{" "}
        EUR
      </p>
      <p>Total price: {prices.totalPrice} EUR</p>

      <hr />

      <p>Commercial Discount: {prices.commercialDiscount} EUR</p>
      <p>Advisor Discount: {prices.advisorDiscount} EUR</p>
      <p>VIP discount: {prices.vipDiscount}</p>
      <p>Bonus Protection Surcharge: {prices.bonusProtectionSurcharge} EUR</p>

      <hr />

      <p>Voucher: {voucherAmount} EUR</p>

      <hr />

      <p>Bonus protection: {prices.bonusProtectionSurcharge} EUR</p>
      <p>AO+: {prices.aoPlusSurcharge} EUR</p>
      <p>Glass protection: {prices.glassProtectionSurcharge} EUR</p>
    </div>
  );
};
