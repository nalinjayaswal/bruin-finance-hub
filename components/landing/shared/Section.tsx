import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: "default" | "subtle" | "gradient" | "pattern";
  spacing?: "none" | "small" | "medium" | "large";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const backgrounds = {
  default: "",
  subtle: "bg-card/30",
  gradient: "bg-gradient-to-b from-background via-card/30 to-background",
  pattern:
    "bg-[linear-gradient(rgba(0,229,196,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,196,0.02)_1px,transparent_1px)] bg-[size:48px_48px]",
};

const spacings = {
  none: "py-0",
  small: "py-12",
  medium: "py-24",
  large: "py-32",
};

const maxWidths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-7xl",
};

export const Section = ({
  id,
  children,
  className,
  background = "default",
  spacing = "medium",
  maxWidth = "xl",
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "px-4 relative overflow-hidden",
        spacings[spacing],
        backgrounds[background],
        className
      )}
    >
      <div className={cn("container mx-auto relative z-10", maxWidths[maxWidth])}>
        {children}
      </div>
    </section>
  );
};

