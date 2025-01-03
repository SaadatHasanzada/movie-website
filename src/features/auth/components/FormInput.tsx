import { CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormInputProps {
  type: "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  autoComplete: string;
  name: string;
}

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  name
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
        style={{
          borderColor:
            error && !isFocused ? "hsl(0, 97%, 63%)" : "hsl(223, 23%, 46%)"
        }}
        className="focus:!border-b-white  placeholder:text-white/50 border-0 border-b-[1px] focus-visible:ring-0 shadow-none  rounded-none p-4 min-h-10"
      />
      {error && !isFocused && (
        <div className="text-peach text-xs sm:text-[13px] mt-2 flex items-start   gap-1">
          {" "}
          <CircleX className="text-peach w-4 h-4  " />
          <span className="flex-1"> {error}</span>
        </div>
      )}
    </div>
  );
};
