import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  disabled = false,
  loading = false,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-2 py-[7px] rounded-md text-white font-medium transition h-[38px]
    ${disabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00B795] hover:bg-green-800"}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
