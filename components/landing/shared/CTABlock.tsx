import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  icon?: LucideIcon;
}

interface CTABlockProps {
  buttons: CTAButton[];
  trustLine?: ReactNode;
  size?: "medium" | "large";
}

export const CTABlock = ({ buttons, trustLine, size = "medium" }: CTABlockProps) => {
  const buttonSize = size === "large" ? "large" : "medium";
  const buttonClassName =
    size === "large" ? "text-lg px-8 py-6" : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {buttons.map((button, index) => {
          const ButtonIcon = button.icon || ArrowRight;
          const content = (
            <Button
              key={index}
              variant={button.variant || "primary"}
              size={buttonSize}
              className={buttonClassName}
              onClick={button.onClick}
            >
              {button.text}
              {button.icon && <ButtonIcon className="ml-2 w-5 h-5" />}
            </Button>
          );

          return button.href ? (
            <Link key={index} href={button.href}>
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </div>
      {trustLine && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{trustLine}</p>
        </div>
      )}
    </div>
  );
};

