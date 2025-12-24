// app/lib/theme-utils.ts

/**
 * Theme management utilities for consistent theme handling
 */

export type ThemeColor = "red" | "orange" | "green" | "teal" | "blue" | "purple" | "mono";
export type GradientTheme = "sunset" | "ocean" | "aurora" | "fire" | "forest" | "royal" | "mono";

interface ThemeConfig {
  color: ThemeColor | null;
  gradient: GradientTheme | null;
  font: string;
  fontSizes: {
    sm: number;
    base: number;
    lg: number;
    xl: number;
    xl2: number;
    xl3: number;
    xl4: number;
    xl5: number;
  };
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  color: "teal",
  gradient: null,
  font: "'Inter', ui-sans-serif, system-ui, sans-serif",
  fontSizes: {
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    xl2: 1.5,
    xl3: 1.875,
    xl4: 2.25,
    xl5: 3,
  },
};

/**
 * Get current theme configuration from localStorage
 */
export function getCurrentTheme(): ThemeConfig {
  const root = document.documentElement;
  
  return {
    color: localStorage.getItem("theme-color") as ThemeColor || DEFAULT_THEME_CONFIG.color,
    gradient: localStorage.getItem("theme-gradient") as GradientTheme || null,
    font: localStorage.getItem("theme-font") || DEFAULT_THEME_CONFIG.font,
    fontSizes: {
      sm: parseFloat(localStorage.getItem("font-size-sm") || DEFAULT_THEME_CONFIG.fontSizes.sm.toString()),
      base: parseFloat(localStorage.getItem("font-size-base") || DEFAULT_THEME_CONFIG.fontSizes.base.toString()),
      lg: parseFloat(localStorage.getItem("font-size-lg") || DEFAULT_THEME_CONFIG.fontSizes.lg.toString()),
      xl: parseFloat(localStorage.getItem("font-size-xl") || DEFAULT_THEME_CONFIG.fontSizes.xl.toString()),
      xl2: parseFloat(localStorage.getItem("font-size-2xl") || DEFAULT_THEME_CONFIG.fontSizes.xl2.toString()),
      xl3: parseFloat(localStorage.getItem("font-size-3xl") || DEFAULT_THEME_CONFIG.fontSizes.xl3.toString()),
      xl4: parseFloat(localStorage.getItem("font-size-4xl") || DEFAULT_THEME_CONFIG.fontSizes.xl4.toString()),
      xl5: parseFloat(localStorage.getItem("font-size-5xl") || DEFAULT_THEME_CONFIG.fontSizes.xl5.toString()),
    },
  };
}

/**
 * Apply a theme configuration to the document
 */
export function applyTheme(config: Partial<ThemeConfig>): void {
  const root = document.documentElement;
  
  // Remove any preview mode
  root.removeAttribute("data-preview-mode");
  
  // Remove inline styles that might interfere
  root.style.removeProperty("--color-primary");
  root.style.removeProperty("--color-primary-500");
  root.style.removeProperty("--gradient-primary");
  root.style.removeProperty("--gradient-button");
  
  // Apply color theme
  if (config.color) {
    root.setAttribute("data-theme", config.color);
    localStorage.setItem("theme-color", config.color);
  }
  
  // Apply gradient theme
  if (config.gradient) {
    root.setAttribute("data-gradient", config.gradient);
    localStorage.setItem("theme-gradient", config.gradient);
  } else {
    root.removeAttribute("data-gradient");
    localStorage.removeItem("theme-gradient");
  }
  
  // Apply font
  if (config.font) {
    root.style.setProperty("--font-sans", config.font);
    localStorage.setItem("theme-font", config.font);
  }
  
  // Apply font sizes
  if (config.fontSizes) {
    Object.entries(config.fontSizes).forEach(([key, value]) => {
      const cssVar = `--text-${key.replace('xl', 'xl').replace('2', '-2').replace('3', '-3').replace('4', '-4').replace('5', '-5')}`;
      root.style.setProperty(cssVar, `${value}rem`);
      localStorage.setItem(`font-size-${key}`, value.toString());
    });
  }
  
  // Dispatch a custom event for theme changes
  window.dispatchEvent(new CustomEvent("themechange", { detail: config }));
}

/**
 * Reset theme to defaults
 */
export function resetTheme(): void {
  applyTheme(DEFAULT_THEME_CONFIG);
}

/**
 * Check if theme is in preview mode
 */
export function isPreviewMode(): boolean {
  return document.documentElement.hasAttribute("data-preview-mode");
}

/**
 * Set preview mode for theme customization
 */
export function setPreviewMode(config: Partial<ThemeConfig>): void {
  const root = document.documentElement;
  root.setAttribute("data-preview-mode", "true");
  
  if (config.color) {
    root.style.setProperty("--color-primary", getHSLForTheme(config.color));
    root.style.setProperty("--color-primary-500", getHSLForTheme(config.color));
  }
  
  if (config.gradient) {
    const gradient = getGradientForTheme(config.gradient);
    if (gradient) {
      root.style.setProperty("--gradient-primary", gradient);
      root.style.setProperty("--gradient-button", gradient);
    }
  }
  
  if (config.font) {
    root.style.setProperty("--font-sans", config.font);
  }
  
  if (config.fontSizes) {
    Object.entries(config.fontSizes).forEach(([key, value]) => {
      const cssVar = `--text-${key.replace('xl', 'xl').replace('2', '-2').replace('3', '-3').replace('4', '-4').replace('5', '-5')}`;
      root.style.setProperty(cssVar, `${value}rem`);
    });
  }
}

/**
 * Clear preview mode
 */
export function clearPreviewMode(): void {
  const root = document.documentElement;
  root.removeAttribute("data-preview-mode");
  root.style.removeProperty("--color-primary");
  root.style.removeProperty("--color-primary-500");
  root.style.removeProperty("--gradient-primary");
  root.style.removeProperty("--gradient-button");
}

// Helper functions
function getHSLForTheme(color: ThemeColor): string {
  const themeHSL: Record<ThemeColor, string> = {
    red: "0 84% 60%",
    orange: "28 87% 55%",
    green: "152 69% 40%",
    teal: "171 76% 36%",
    blue: "217 91% 60%",
    purple: "262 83% 58%",
    mono: "210 24% 16%",
  };
  return themeHSL[color];
}

function getGradientForTheme(gradient: GradientTheme): string | null {
  const gradients: Record<GradientTheme, string> = {
    sunset: "linear-gradient(135deg, hsl(14 90% 55%), hsl(330 85% 60%))",
    ocean: "linear-gradient(135deg, hsl(200 80% 45%), hsl(171 76% 36%))",
    aurora: "linear-gradient(135deg, hsl(262 83% 58%), hsl(152 69% 40%))",
    fire: "linear-gradient(135deg, hsl(0 84% 60%), hsl(35 90% 50%))",
    forest: "linear-gradient(135deg, hsl(152 69% 40%), hsl(90 60% 35%))",
    royal: "linear-gradient(135deg, hsl(262 83% 58%), hsl(217 91% 60%))",
    mono: "linear-gradient(135deg, hsl(210 24% 16%), hsl(210 24% 40%))",
  };
  return gradients[gradient] || null;
}