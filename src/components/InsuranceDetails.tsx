import { useInsurance } from "@/util/insuranceContext";

export const InsuranceDetails = () => {
  const { prices } = useInsurance();

  // commercialDiscount: number;
  // advisorDiscount: number;
  // bonusProtectionSurcharge: number;
  // aoPlusSurcharge: number;
  // glassProtectionSurcharge: number;
  // vipDiscount: number;
  // strongCarSurcharge: number;
  if (!prices.basePrice) return null;
  return (
    <div>
      <p>InsuranceDetails</p>

      <hr />

      <p>Base price: {prices.basePrice} EUR</p>
      <p>Total price: {prices.totalPrice} EUR</p>

      <hr />

      <p>Commercial Discount: {prices.commercialDiscount} EUR</p>
      <p>Advisor Discount: {prices.advisorDiscount} EUR</p>
      <p>VIP discount: {prices.vipDiscount}</p>
      <p>Bonus Protection Surcharge: {prices.bonusProtectionSurcharge} EUR</p>

      <hr />

      <p>Bonus protection: {prices.bonusProtectionSurcharge} EUR</p>
      <p>AO+: {prices.aoPlusSurcharge} EUR</p>
      <p>Glass protection: {prices.glassProtectionSurcharge} EUR</p>
    </div>
  );
};
