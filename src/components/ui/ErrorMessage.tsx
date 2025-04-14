import { CircleX } from "lucide-react";

interface ErrorMessageProps {
  error: string;
  className?: string;
  textClassName?: string;
}

const ErrorMessage = ({
  error,
  textClassName,
  className
}: ErrorMessageProps) => {
  return (
    <div className={` text-peach flex items-center gap-1 !mt-2 ${className} `}>
      {" "}
      <CircleX className={`text-peach w-4 h-4`} />
      <span className={`flex-1 ${textClassName}`}> {error}</span>
    </div>
  );
};

export default ErrorMessage;
