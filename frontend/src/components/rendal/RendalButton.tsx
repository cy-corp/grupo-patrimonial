import Link from "next/link";
import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

const variants = {
  primary: "bg-[#1F1F1F] text-white hover:bg-[#333333] focus-visible:outline-[#7A4A2B]",
  gold: "bg-[#C9A96A] text-[#1F1F1F] hover:bg-[#D8BC84] focus-visible:outline-[#C9A96A]",
  ghost:
    "bg-transparent text-[#7A4A2B] ring-1 ring-[#7A4A2B]/30 hover:bg-[#7A4A2B]/5 focus-visible:outline-[#7A4A2B]",
  onDark: "bg-white text-[#1F1F1F] hover:bg-white/90 focus-visible:outline-white",
} as const;

const sizes = {
  md: "h-12 px-6 text-base",
  sm: "h-10 px-4 text-sm",
} as const;

type Props = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
  asChild?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function RendalButton({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  asChild,
  type = "button",
  onClick,
}: Props) {
  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full font-semibold transition-all duration-700 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className,
  );
  const style = { transitionTimingFunction: EASE };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string; style?: CSSProperties }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
      style,
    });
  }

  if (href) {
    return (
      <Link href={href} className={classes} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} style={style} onClick={onClick}>
      {children}
    </button>
  );
}
