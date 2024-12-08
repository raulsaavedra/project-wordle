import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "success";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  className,
  ...props
}) => {
  const baseClasses = "px-5 py-2 text-white text-xl rounded-xl transition-colors font-semibold";
  const variantClasses = {
    default: "bg-gray-700 hover:bg-gray-500",
    success: "bg-green-700 hover:bg-green-500",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className || ""}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
