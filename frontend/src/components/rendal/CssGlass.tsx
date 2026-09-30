import type { CSSProperties, ReactNode } from "react";

export function CssGlass({
  className,
  children,
  borderless = false,
  radius = 999,
  style,
}: {
  className?: string;
  children: ReactNode;
  borderless?: boolean;
  radius?: number | string | false;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        ...(radius === false ? {} : { borderRadius: radius }),
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.12) 100%)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        border: borderless ? "none" : "0.5px solid rgba(255,255,255,0.18)",
        boxShadow: borderless
          ? "0 8px 24px rgba(0,0,0,0.14)"
          : "inset 0 0.5px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.14)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
