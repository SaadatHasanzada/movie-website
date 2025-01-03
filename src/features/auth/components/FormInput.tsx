import { CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  type: "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  autoComplete: string;
}

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete
}: FormInputProps) => (
  <div>
    <Input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      autoComplete={autoComplete}
      required
      style={{
        borderColor: error ? "#cc0000" : "hsl(223, 23%, 46%)"
      }}
      className="placeholder:text-white/50 border-0 border-b-[1px] focus-visible:ring-0 shadow-none body-medium rounded-none p-4 min-h-10"
    />
    {error && (
      <div className="text-red-700 text-xs mt-2 flex items-start  gap-1">
        {" "}
        <CircleX className="text-red-700 w-4 h-4 " />
        <span className="flex-1"> {error}</span>
      </div>
    )}
  </div>
);
