import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-primary font-semibold tracking-widest uppercase text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

