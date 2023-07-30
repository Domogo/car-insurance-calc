"use client";

import { InsuranceProvider } from "@/util/insuranceContext";
import { Header } from "../Header";
import { InsuranceForm } from "../InsuranceForm";
import { Coverages } from "../Coverages";

export const Calculator = () => {
  return (
    <InsuranceProvider>
      <Header />

      <div className="flex justify-between">
        <InsuranceForm />
        <Coverages />
      </div>
    </InsuranceProvider>
  );
};
