import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: LucideIcon;
  title?: string;
  text?: string;
  description?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4 | 5;
  variant?: "simple" | "detailed";
  className?: string;
}

export const FeatureGrid = ({
  features,
  columns = 4,
  variant = "simple",
  className,
}: FeatureGridProps) => {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "md:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "md:grid-cols-3 lg:grid-cols-5",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {features.map((feature, index) => (
        <div
          key={index}
          className={cn(
            "glass rounded-2xl p-6 space-y-4 hover:shadow-glow-soft transition-all duration-300 group",
            variant === "detailed" && "text-center"
          )}
        >
          <div
            className={cn(
              "p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors",
              variant === "detailed" && "mx-auto p-4"
            )}
          >
            <feature.icon
              className={cn(
                "text-primary",
                variant === "simple" ? "w-7 h-7" : "w-8 h-8"
              )}
            />
          </div>
          {variant === "detailed" ? (
            <>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </>
          ) : (
            <p className="font-semibold">{feature.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

