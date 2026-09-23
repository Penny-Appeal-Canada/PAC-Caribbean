import type { AnchorHTMLAttributes } from "react";
import type { ProgrammeId } from "@/lib/content";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "solid" | "ghost";
  programme?: ProgrammeId;
  size?: "default" | "nav";
};

export function Button({
  href,
  variant = "solid",
  programme,
  size = "default",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`btn ${className}`}
      data-variant={variant === "ghost" ? "ghost" : undefined}
      data-programme={programme}
      data-size={size === "nav" ? "nav" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
