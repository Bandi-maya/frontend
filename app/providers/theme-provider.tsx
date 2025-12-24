// app/providers/theme-provider.tsx

"use client";

import { useEffect } from "react";

// Default font sizes
const DEFAULT_FONT_SIZES = {
  sm: 0.875,
  base: 1,
  lg: 1.125,
  xl: 1.25,
  xl2: 1.5,
  xl3: 1.875,
  xl4: 2.25,
  xl5: 3,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove any existing preview mode
    root.removeAttribute("data-preview-mode");
    
    // Apply color theme
    const savedColor = localStorage.getItem("theme-color");
    if (savedColor) {
      root.setAttribute("data-theme", savedColor);
    } else {
      // Set default theme if none exists
      root.setAttribute("data-theme", "teal");
      localStorage.setItem("theme-color", "teal");
    }
    
    // Apply gradient theme
    const savedGradient = localStorage.getItem("theme-gradient");
    if (savedGradient) {
      root.setAttribute("data-gradient", savedGradient);
    }
    
    // Apply font family
    const savedFont = localStorage.getItem("theme-font");
    if (savedFont) {
      root.style.setProperty("--font-sans", savedFont);
    } else {
      // Set default font
      const defaultFont = "'Inter', ui-sans-serif, system-ui, sans-serif";
      root.style.setProperty("--font-sans", defaultFont);
      localStorage.setItem("theme-font", defaultFont);
    }
    
    // Apply font sizes
    const savedFontSizeSm = localStorage.getItem("font-size-sm");
    const savedFontSizeBase = localStorage.getItem("font-size-base");
    const savedFontSizeLg = localStorage.getItem("font-size-lg");
    const savedFontSizeXl = localStorage.getItem("font-size-xl");
    const savedFontSize2xl = localStorage.getItem("font-size-2xl");
    const savedFontSize3xl = localStorage.getItem("font-size-3xl");
    const savedFontSize4xl = localStorage.getItem("font-size-4xl");
    const savedFontSize5xl = localStorage.getItem("font-size-5xl");
    
    if (savedFontSizeSm) {
      root.style.setProperty("--text-sm", `${savedFontSizeSm}rem`);
    }
    if (savedFontSizeBase) {
      root.style.setProperty("--text-base", `${savedFontSizeBase}rem`);
    }
    if (savedFontSizeLg) {
      root.style.setProperty("--text-lg", `${savedFontSizeLg}rem`);
    }
    if (savedFontSizeXl) {
      root.style.setProperty("--text-xl", `${savedFontSizeXl}rem`);
    }
    if (savedFontSize2xl) {
      root.style.setProperty("--text-2xl", `${savedFontSize2xl}rem`);
    }
    if (savedFontSize3xl) {
      root.style.setProperty("--text-3xl", `${savedFontSize3xl}rem`);
    }
    if (savedFontSize4xl) {
      root.style.setProperty("--text-4xl", `${savedFontSize4xl}rem`);
    }
    if (savedFontSize5xl) {
      root.style.setProperty("--text-5xl", `${savedFontSize5xl}rem`);
    }
    
    // Clean up any inline styles that might interfere
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-500");
    root.style.removeProperty("--gradient-primary");
    root.style.removeProperty("--gradient-button");
    
    // Set a class to enable theme transitions after initial load
    setTimeout(() => {
      document.body.classList.add("theme-transitions-enabled");
    }, 100);
    
  }, []);

  return <>{children}</>;
}