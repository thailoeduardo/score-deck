import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, type PropsWithChildren } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const storageKey = "kriathus.theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(storageKey);

  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : getSystemTheme();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
  themeColor?.setAttribute("content", theme === "dark" ? "#0C0F1C" : "#F5F7FC");
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) => {
          const nextTheme = currentTheme === "dark" ? "light" : "dark";

          window.localStorage.setItem(storageKey, nextTheme);

          return nextTheme;
        }),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeDocumentSync theme={theme} onSystemThemeChange={setTheme} />
      {children}
    </ThemeContext.Provider>
  );
}

type ThemeDocumentSyncProps = {
  theme: Theme;
  onSystemThemeChange: (theme: Theme) => void;
};

function ThemeDocumentSync({ theme, onSystemThemeChange }: ThemeDocumentSyncProps) {
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (!window.localStorage.getItem(storageKey)) {
        onSystemThemeChange(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [onSystemThemeChange]);

  return null;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
