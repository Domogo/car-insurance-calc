import { FC, ReactNode, createContext, useContext, useState } from "react";
import { InsuranceFormSchema, schema } from "./types";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface InsuranceContext {
  form: UseFormReturn<InsuranceFormSchema>;
  basePrice: number;
  totalPrice: number;
  onSubmit: SubmitHandler<InsuranceFormSchema>;
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
  const [basePrice, setBasePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onSubmit: SubmitHandler<InsuranceFormSchema> = async (data) => {
    const response = await axios.post("/api/insurance", data);
    console.log(response);
  };

  return (
    <insuranceContext.Provider
      value={{
        form,
        basePrice,
        totalPrice,
        onSubmit,
      }}
    >
      {children}
    </insuranceContext.Provider>
  );
};

export const useInsurance = () => useContext(insuranceContext);
