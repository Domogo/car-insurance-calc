import { getOffers } from "@/util/mongodb";

export default async function Offers() {
  const { offers } = await getOffers();

  return (
    <main className="p-14">
      <div className="grid grid-cols-3 gap-8">
        {offers?.map((offer) => (
          <div
            key={offer._id.toString()}
            className="bg-white rounded-md shadow-md p-4"
          >
            <p>Offer: {offer._id.toString()}</p>
            <p>User: {offer.form.name}</p>
            <p>Date of birth: {offer.form.dateOfBirth}</p>
            <p>City: {offer.form.city}</p>
            <p>Vehicle power: {offer.form.vehiclePower}</p>
            <hr />
            <p>Total Price: {offer.prices.totalPrice} EUR</p>
            <p>Base Price: {offer.prices.basePrice} EUR</p>
            <p>
              Base Price Without Price Match:{" "}
              {offer.prices.basePriceWithoutPriceMatch} EUR
            </p>
            <hr />
            <p>Advisor Discount: {offer.prices.advisorDiscount} EUR</p>
            <p>Commercial Discount: {offer.prices.commercialDiscount} EUR</p>
            <p>VIP Discount: {offer.prices.vipDiscount} EUR</p>
            <p>Strong car surcharge: {offer.prices.strongCarSurcharge} EUR</p>
            <hr />
            <p>Bonus Protection: {offer.prices.bonusProtectionSurcharge} EUR</p>
            <p>AO+: {offer.prices.aoPlusSurcharge} EUR</p>
            <p>Glass Protection: {offer.prices.glassProtectionSurcharge} EUR</p>
          </div>
        ))}
      </div>
    </main>
  );
}
