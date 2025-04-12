import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type TBSInput = {
  type: string;
  fieldName: string;
  label?: string;
  placeholder?: string
  defaultValue?: string
};

const BSInput = ({ type, fieldName, label, placeholder, defaultValue }: TBSInput) => {
    const [visible, setVisible] = useState(false);
    const { control } = useFormContext();

  return (
    <div className="space-y-1">
    {label && <Label htmlFor={fieldName}>{label}</Label>}
    <Controller
      control={control}
      name={fieldName}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <div className="relative">
          <Input
            {...field}
            id={fieldName}
            type={type === "password" && !visible ? "password" : "text"}
            placeholder={placeholder}
            required
            className="pr-10"
          />
          {type === "password" && (
            <span
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {visible ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
      )}
    />
  </div>
  );
};

export default BSInput;