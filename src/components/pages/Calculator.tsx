"use client";

import { InsuranceProvider } from "@/util/insuranceContext";
import { Header } from "../Header";
import { InsuranceForm } from "../InsuranceForm";
import { Coverages } from "../Coverages";
import { InsuranceDetails } from "../InsuranceDetails";

export const Calculator = () => {
  return (
    <InsuranceProvider>
      <Header />

      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <InsuranceForm />
          <InsuranceDetails />
        </div>
        <Coverages />
      </div>
    </InsuranceProvider>
  );
};
