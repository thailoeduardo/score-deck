import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";

export type SearchableSelectOption = {
  label: string;
  value: string;
};

export type SearchableSelectProps = {
  id?: string;
  options: SearchableSelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  onValueChange?: (value: string) => void;
};

export function SearchableSelect({
  id,
  options,
  value,
  defaultValue,
  placeholder = "Selecionar",
  searchPlaceholder = "Buscar",
  emptyMessage = "Nenhum resultado",
  className,
  onValueChange,
}: SearchableSelectProps) {
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? options[0]?.value ?? "");
  const selectedValue = value ?? internalValue;

  const selectedOption = options.find((option) => option.value === selectedValue);
  const filteredOptions = React.useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query],
  );

  React.useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const selectOption = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        id={triggerId}
        type="button"
        className="flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-input bg-card px-4 py-2 text-left text-sm text-foreground outline-none transition-colors focus:border-ring/40 focus:ring-2 focus:ring-ring/15 disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>{selectedOption?.label ?? placeholder}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {isOpen ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-brand-glow">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-muted-foreground">
            <Search className="h-4 w-4 shrink-0" />
            <input
              className="h-9 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/65"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto p-1" role="listbox" aria-labelledby={triggerId}>
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-accent hover:text-accent-foreground"
                role="option"
                aria-selected={option.value === selectedValue}
                onClick={() => selectOption(option.value)}
              >
                <span className="truncate">{option.label}</span>
                {option.value === selectedValue ? <Check className="h-4 w-4 text-primary" /> : null}
              </button>
            ))}
            {filteredOptions.length === 0 ? <p className="px-3 py-2 text-sm text-muted-foreground">{emptyMessage}</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
