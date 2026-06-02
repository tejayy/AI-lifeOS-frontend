import { useEffect } from "react";
import { useThemeStore, getEffectiveTheme } from "@/store/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    const effective = getEffectiveTheme(theme);

    root.classList.remove("light", "dark");
    root.classList.add(effective);

    // Keep <meta name="color-scheme"> in sync for native UI (scrollbars, inputs, etc.)
    root.style.colorScheme = effective;
  }, [theme]);

  // Also react to OS-level changes when theme === "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
      root.style.colorScheme = e.matches ? "dark" : "light";
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return <>{children}</>;
}
