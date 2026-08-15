import * as React from "react";
import { cn } from "@/lib/cn";

export type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, onClick, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextChecked = !isChecked;

      if (!isControlled) {
        setInternalChecked(nextChecked);
      }

      onCheckedChange?.(nextChecked);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border border-border bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 data-[state=checked]:border-transparent data-[state=checked]:bg-brand-gradient disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={toggle}
        {...props}
      >
        <span
          data-state={isChecked ? "checked" : "unchecked"}
          className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-white"
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";
