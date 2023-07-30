import { Discount } from "@/util/types";
import { FC } from "react";

export const LabelledCheckbox: FC<Discount> = (discount) => {
  return (
    <div
      key={discount.id}
      className="relative flex items-center px-4 py-2 max-w-xs rounded-lg shadow-md bg-white"
    >
      <div className="flex items-center">
        <input
          id={discount.id}
          aria-describedby={discount.description}
          name={discount.id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={discount.id} className="font-medium text-gray-900">
          {discount.name}
        </label>
        <p id="comments-description" className="text-gray-500">
          {discount.description}
        </p>
      </div>
    </div>
  );
};
