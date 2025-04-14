import { Eye, EyeOff } from "lucide-react";

import ErrorMessage from "@/components/ui/ErrorMessage";
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        name={name}
        type={type === "password" && showPassword ? "text" : type}
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

      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-5 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error && !isFocused && (
        <ErrorMessage error={error} textClassName="text-sm sm:text-[13px]" />
      )}
    </div>
  );
};
