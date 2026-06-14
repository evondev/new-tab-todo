import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "ghost" | "danger";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
}

function getVariantClasses(variant: ButtonVariant): string {
  return cn(
    variant === "primary" &&
      "bg-indigo-500 text-white hover:bg-indigo-400 shadow-sm",
    variant === "ghost" && "bg-transparent text-slate-300 hover:bg-white/10",
    variant === "danger" && "bg-transparent text-slate-400 hover:text-rose-400",
  );
}

export default function Button({
  variant = "primary",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        getVariantClasses(variant),
        className,
      )}
      {...rest}
    />
  );
}
