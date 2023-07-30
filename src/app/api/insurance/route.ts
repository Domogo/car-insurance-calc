import { InsuranceFormSchema } from "@/util/types";
import { NextResponse } from "next/server";

// Base price should be derived from the city and dateOfBirth fields.
// Since I don't have the specs on how that is calculated, I'm using setting a base price of 200.00.
const BASE_PRICE = 200.0;

export async function POST(request: Request) {
  const data = await request.json();

  const insuranceForm: InsuranceFormSchema = {
    ...data,
    dateOfBirth: new Date(data.dateOfBirth),
  };

  console.log(insuranceForm);

  return NextResponse.json({
    message: "Hello from the server!",
  });
}
