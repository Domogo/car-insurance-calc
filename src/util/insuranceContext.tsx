import {
  FC,
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { InsuranceFormSchema, InsurancePrices, schema } from "./types";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface InsuranceContext {
  form: UseFormReturn<InsuranceFormSchema>;
  prices: InsurancePrices;
  onSubmit: SubmitHandler<InsuranceFormSchema>;
  onCheckboxClick: MouseEventHandler<HTMLInputElement>;
}

const insuranceContext = createContext<InsuranceContext>(
  {} as InsuranceContext
);

export const InsuranceProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const form = useForm<InsuranceFormSchema>({
    resolver: zodResolver(schema),
  });

  const [prices, setPrices] = useState<InsurancePrices>({} as InsurancePrices);

  const fetchPrices = async (data: InsuranceFormSchema) => {
    const response = await axios.post("/api/insurance", data);

    const prices = response.data;
    setPrices(prices);
  };

  // form submit
  const onSubmit: SubmitHandler<InsuranceFormSchema> = async (data) => {
    if (data.vehiclePower <= 80) {
      form.setValue("vipDiscount", false);
    }

    if (data.vehiclePower > 100) {
      form.setValue("strongCarSurcharge", true);
    } else {
      form.setValue("strongCarSurcharge", false);
    }
    await fetchPrices(data);
  };

  // re-trigger calculation on every checkbox click
  const onCheckboxClick: MouseEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const data = form.getValues();
    await fetchPrices({
      ...data,
      [event.currentTarget.id]: event.currentTarget.checked,
    });
  };

  return (
    <insuranceContext.Provider
      value={{
        form,
        prices,
        onSubmit,
        onCheckboxClick,
      }}
    >
      {children}
    </insuranceContext.Provider>
  );
};

export const useInsurance = () => useContext(insuranceContext);
