"use client";

import { useInsurance } from "@/util/insuranceContext";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export const InsuranceForm = () => {
  const { form, onSubmit, saveOffer, prices } = useInsurance();
  const router = useRouter();

  const saveOfferAndRedirect: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    await saveOffer(event);
    router.push("/offers");
  };

  return (
    <form
      className="px-28 py-8 w-1/2"
      onSubmit={form.handleSubmit(onSubmit, () =>
        console.error(form.formState.errors)
      )}
    >
      <div className="">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            User Data
          </h2>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  {...form.register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              {form.formState.errors.name?.message && (
                <p className="text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="date-of-birth"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Date of birth
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  {...form.register("dateOfBirth", {
                    required: true,
                    valueAsDate: true,
                  })}
                  id="date-of-birth"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              {form.formState.errors.dateOfBirth?.message && (
                <p className="text-red-500">
                  {form.formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                City
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="city"
                  {...form.register("city", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Pula</option>
                  <option>Rijeka</option>
                  <option>Zagreb</option>
                </select>
              </div>
              {form.formState.errors.city?.message && (
                <p className="text-red-500">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="vehicle-power"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Vehicle power
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  {...form.register("vehiclePower", {
                    required: true,
                    valueAsNumber: true,
                    min: 0,
                  })}
                  id="vehicle-power"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              {form.formState.errors.vehiclePower?.message && (
                <p className="text-red-500">
                  {form.formState.errors.vehiclePower.message}
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="voucher"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Voucher (EUR)
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  {...form.register("voucher", {
                    valueAsNumber: true,
                  })}
                  id="voucher"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              {form.formState.errors.voucher?.message && (
                <p className="text-red-500">
                  {form.formState.errors.voucher.message}
                </p>
              )}
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="price-match"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Price match (EUR)
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  {...form.register("priceMatch", {
                    valueAsNumber: true,
                  })}
                  id="price-match"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
              {form.formState.errors.priceMatch?.message && (
                <p className="text-red-500">
                  {form.formState.errors.priceMatch.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {prices.basePrice && (
          <button
            type="button"
            onClick={saveOfferAndRedirect}
            className="inline-flex justify-center rounded-md bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save offer
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get offer
        </button>
      </div>
    </form>
  );
};
