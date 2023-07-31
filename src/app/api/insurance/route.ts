import { InsuranceFormSchema, InsurancePrices } from "@/util/types";
import { NextResponse } from "next/server";

type CityInfo = {
  [key: string]: {
    basePrice: number;
    ageFactor: number;
  };
};

// Base price should be derived from the city and dateOfBirth fields.
// We can use the following formula to calculate the base price:
// basePrice = ageFactor * basePrice when young driver (under 25)
// basePrice = basePrice when not young driver
const CITIES_BASE_PRICE: CityInfo = {
  Pula: {
    basePrice: 100.0,
    ageFactor: 1.2,
  },
  Rijeka: {
    basePrice: 150.0,
    ageFactor: 1.1,
  },
  Zagreb: {
    basePrice: 200.0,
    ageFactor: 1.3,
  },
};

const COMMERCIAL_DISCOUNT = 0.1;
const ADVISOR_DISCOUNT = 0.2;
const VIP_DISCOUNT = 0.05;
const STRONG_CAR_SURCHARGE = 0.1;
const BONUS_PROTECTION_CHARGE = 0.12;
const GLASS_PROTECTION_CHARGE = 0.8;

const getBasePrice = (city: string, dateOfBirth: Date) => {
  const { basePrice, ageFactor } = CITIES_BASE_PRICE[city];
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();

  return age >= 25 ? basePrice : basePrice * ageFactor;
};

const calculateAoPlusAmount = (dateOfBirth: Date) => {
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();
  return age < 30 ? 55 : 105;
};

const calculateAdvisorDiscount = (
  bonusProtection: number,
  aoPlus: number,
  glassProtection: number
) => {
  const coverageAmounts = [bonusProtection, aoPlus, glassProtection];
  const coverageTotal = coverageAmounts.reduce(
    (acc, amount) => acc + amount,
    0
  );

  // if at least two coverage amounts are greater than 0, apply advisor discount
  if (coverageAmounts.filter((amount) => amount > 0).length >= 2) {
    return coverageTotal * ADVISOR_DISCOUNT * -1;
  }
  return 0;
};

export async function POST(request: Request) {
  const data = await request.json();

  const insuranceForm: InsuranceFormSchema = {
    ...data,
    dateOfBirth: new Date(data.dateOfBirth),
  };

  const basePrice = getBasePrice(insuranceForm.city, insuranceForm.dateOfBirth);

  const commercialDiscount = insuranceForm.commercialDiscount
    ? basePrice * COMMERCIAL_DISCOUNT * -1
    : 0;

  const bonusProtectionSurcharge = insuranceForm.bonusProtection
    ? basePrice * BONUS_PROTECTION_CHARGE
    : 0;

  const aoPlusSurcharge = insuranceForm.aoPlus
    ? calculateAoPlusAmount(insuranceForm.dateOfBirth)
    : 0;

  const glassProtectionSurcharge = insuranceForm.glassProtection
    ? insuranceForm.vehiclePower * GLASS_PROTECTION_CHARGE
    : 0;

  const advisorDiscount = insuranceForm.advisorDiscount
    ? calculateAdvisorDiscount(
        bonusProtectionSurcharge,
        aoPlusSurcharge,
        glassProtectionSurcharge
      )
    : 0;

  let totalPrice = [
    basePrice,
    commercialDiscount,
    bonusProtectionSurcharge,
    aoPlusSurcharge,
    glassProtectionSurcharge,
    advisorDiscount,
  ].reduce((acc, amount) => acc + amount, 0);

  const vipDiscount =
    insuranceForm.vipDiscount && insuranceForm.vehiclePower > 80
      ? totalPrice * VIP_DISCOUNT * -1
      : 0;
  const strongCarSurcharge =
    insuranceForm.vehiclePower > 100 ? totalPrice * STRONG_CAR_SURCHARGE : 0;

  const voucher = (insuranceForm.voucher ?? 0) * -1;

  totalPrice = totalPrice + vipDiscount + strongCarSurcharge + voucher;

  return NextResponse.json({
    basePrice,
    totalPrice,
    commercialDiscount,
    advisorDiscount,
    bonusProtectionSurcharge,
    aoPlusSurcharge,
    glassProtectionSurcharge,
    vipDiscount,
    strongCarSurcharge,
  } as InsurancePrices);
}
