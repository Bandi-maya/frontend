// app/admin/customization/page.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getCurrentTheme, 
  applyTheme, 
  setPreviewMode, 
  clearPreviewMode,
  type ThemeColor,
  type GradientTheme
} from "@/lib/theme-utils";

/* ---------- SOLID THEME CONFIG ---------- */
const solidThemes = [
  { 
    key: "red" as ThemeColor, 
    name: "Crimson",
    preview: "#EF4444",
    hsl: "0 84% 60%",
    colors: {
      primary: "#EF4444",
      secondary: "#FEE2E2",
      accent: "#FCA5A5"
    }
  },
  { 
    key: "orange" as ThemeColor, 
    name: "Sunset",
    preview: "#F97316",
    hsl: "28 87% 55%",
    colors: {
      primary: "#F97316",
      secondary: "#FFEDD5",
      accent: "#FDBA74"
    }
  },
  { 
    key: "green" as ThemeColor, 
    name: "Emerald",
    preview: "#22C55E",
    hsl: "152 69% 40%",
    colors: {
      primary: "#22C55E",
      secondary: "#DCFCE7",
      accent: "#86EFAC"
    }
  },
  { 
    key: "teal" as ThemeColor, 
    name: "Teal",
    preview: "#14B8A6",
    hsl: "171 76% 36%",
    colors: {
      primary: "#14B8A6",
      secondary: "#CCFBF1",
      accent: "#5EEAD4"
    }
  },
  { 
    key: "blue" as ThemeColor, 
    name: "Azure",
    preview: "#3B82F6",
    hsl: "217 91% 60%",
    colors: {
      primary: "#3B82F6",
      secondary: "#DBEAFE",
      accent: "#93C5FD"
    }
  },
  { 
    key: "purple" as ThemeColor, 
    name: "Royal",
    preview: "#8B5CF6",
    hsl: "262 83% 58%",
    colors: {
      primary: "#8B5CF6",
      secondary: "#F3E8FF",
      accent: "#C4B5FD"
    }
  },
  { 
    key: "mono" as ThemeColor, 
    name: "Monochrome",
    preview: "#0F172A",
    hsl: "210 24% 16%",
    colors: {
      primary: "#0F172A",
      secondary: "#F1F5F9",
      accent: "#94A3B8"
    }
  },
];

/* ---------- GRADIENT THEME CONFIG ---------- */
const gradientThemes = [
  { 
    key: "sunset" as GradientTheme, 
    name: "Sunset",
    preview: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)"
  },
  { 
    key: "ocean" as GradientTheme, 
    name: "Ocean",
    preview: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)"
  },
  { 
    key: "aurora" as GradientTheme, 
    name: "Aurora",
    preview: "linear-gradient(135deg, #10b981 0%, #0ea5e9 50%, #8b5cf6 100%)"
  },
  { 
    key: "fire" as GradientTheme, 
    name: "Fire",
    preview: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #dc2626 100%)"
  },
  { 
    key: "forest" as GradientTheme, 
    name: "Forest",
    preview: "linear-gradient(135deg, #10b981 0%, #059669 50%, #065f46 100%)"
  },
  { 
    key: "royal" as GradientTheme, 
    name: "Royal",
    preview: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)"
  },
  { 
    key: "mono" as GradientTheme, 
    name: "Mono",
    preview: "linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)"
  },
];

/* ---------- TYPOGRAPHY OPTIONS ---------- */
const fontOptions = [
  { key: "sans", name: "Inter", value: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  { key: "mono", name: "JetBrains Mono", value: "'JetBrains Mono', ui-monospace, monospace" },
  { key: "serif", name: "Georgia", value: "Georgia, serif" },
  { key: "system", name: "System Default", value: "system-ui, -apple-system, sans-serif" },
];

export default function ThemeCustomizationPage() {
  const [mode, setMode] = useState<"color" | "gradient" | "typography">("color");
  const [selectedColor, setSelectedColor] = useState<ThemeColor | null>(null);
  const [selectedGradient, setSelectedGradient] = useState<GradientTheme | null>(null);
  const [selectedFont, setSelectedFont] = useState<string>("sans");
  const [dialog, setDialog] = useState<"success" | "error" | null>(null);
  const [fontSize, setFontSize] = useState({
    sm: 0.875,
    base: 1,
    lg: 1.125,
    xl: 1.25,
    xl2: 1.5,
    xl3: 1.875,
    xl4: 2.25,
    xl5: 3
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load current theme on mount
  useEffect(() => {
    const loadTheme = () => {
      try {
        const currentTheme = getCurrentTheme();
        
        setSelectedColor(currentTheme.color);
        setSelectedGradient(currentTheme.gradient);
        setSelectedFont(currentTheme.font);
        setFontSize(currentTheme.fontSizes);
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  /* ---------- UPDATE PREVIEW ---------- */
  const updatePreview = () => {
    if (isLoading) return;

    const previewConfig: any = {};
    
    if (mode === "color" && selectedColor) {
      previewConfig.color = selectedColor;
    }
    
    if (mode === "gradient" && selectedGradient) {
      previewConfig.gradient = selectedGradient;
    }
    
    if (mode === "typography") {
      const font = fontOptions.find(f => f.key === selectedFont);
      if (font) {
        previewConfig.font = font.value;
      }
      previewConfig.fontSizes = fontSize;
    }
    
    if (Object.keys(previewConfig).length > 0) {
      setPreviewMode(previewConfig);
    }
  };

  /* ---------- APPLY THEME ---------- */
  const handleApplyTheme = () => {
    if (!isApplyEnabled) {
      setDialog("error");
      return;
    }

    try {
      clearPreviewMode();
      
      const font = fontOptions.find(f => f.key === selectedFont);
      
      applyTheme({
        color: selectedColor as ThemeColor,
        gradient: selectedGradient as GradientTheme,
        font: font?.value,
        fontSizes: fontSize
      });
      
      setDialog("success");
      
      // Clear any error state after successful apply
      setTimeout(() => {
        setDialog(null);
      }, 3000);
    } catch (error) {
      console.error("Error applying theme:", error);
      setDialog("error");
    }
  };

  // Update preview when selections change
  useEffect(() => {
    if (!isLoading) {
      updatePreview();
    }
  }, [mode, selectedColor, selectedGradient, selectedFont, fontSize, isLoading]);

  const isApplyEnabled = 
    (mode === "color" && selectedColor) ||
    (mode === "gradient" && selectedGradient) ||
    (mode === "typography" && selectedFont);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="h-4 bg-muted rounded w-96 mb-12"></div>
          <div className="flex gap-4 mb-14">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded-full w-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-6 mb-16">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-2">Website Appearance Customization</h1>
      <p className="text-muted-foreground mb-12">
        Changes apply instantly across all pages and components
      </p>

      {/* ---------- MODE SELECT ---------- */}
      <div className="flex flex-wrap gap-4 mb-14">
        {[
          { key: "color" as const, label: "Solid Colors" },
          { key: "gradient" as const, label: "Gradients" },
          { key: "typography" as const, label: "Typography" }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setMode(key);
              clearPreviewMode();
            }}
            className={`px-6 py-3 rounded-full border transition font-medium
              ${mode === key
                ? "border-primary bg-primary/5 text-primary"
                : "border-border hover:border-primary/40"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ---------- COLOR SELECTION ---------- */}
      {mode === "color" && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-8">Primary Color Scheme</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {solidThemes.map(({ key, name, preview, colors }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedColor(key)}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all
                  ${selectedColor === key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"}`}
              >
                <div
                  className="w-16 h-16 rounded-full border"
                  style={{ background: preview }}
                />
                <span className="font-medium">{name}</span>
                <div className="flex gap-1">
                  {Object.values(colors).map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ---------- GRADIENT SELECTION ---------- */}
      {mode === "gradient" && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-8">Gradient Themes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {gradientThemes.map(({ key, name, preview }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGradient(key)}
                className={`relative p-6 rounded-xl border-2 transition-all overflow-hidden
                  ${selectedGradient === key
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40"}`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: preview }}
                />
                <div
                  className="w-full h-32 rounded-lg mb-4 border"
                  style={{ background: preview }}
                />
                <span className="font-medium relative z-10">{name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ---------- TYPOGRAPHY SELECTION ---------- */}
      {mode === "typography" && (
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-8">Font Family</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fontOptions.map(({ key, name, value }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFont(key)}
                className={`p-6 rounded-xl border-2 transition-all text-left
                  ${selectedFont === key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"}`}
                style={{ fontFamily: value }}
              >
                <div className="font-medium mb-2">{name}</div>
                <div className="text-sm text-muted-foreground">
                  Aa Bb Cc Xx Yy Zz
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  1234567890
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Font Size Controls */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6">Font Sizes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Small", var: "--text-sm", key: "sm", size: fontSize.sm },
                { label: "Base", var: "--text-base", key: "base", size: fontSize.base },
                { label: "Large", var: "--text-lg", key: "lg", size: fontSize.lg },
                { label: "XL", var: "--text-xl", key: "xl", size: fontSize.xl },
                { label: "2XL", var: "--text-2xl", key: "xl2", size: fontSize.xl2 },
              ].map(({ label, var: cssVar, key, size }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      step="0.5"
                      value={size * 16}
                      onChange={(e) => {
                        const newSize = parseFloat(e.target.value) / 16;
                        setFontSize(prev => ({ ...prev, [key]: newSize }));
                      }}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-xs text-muted-foreground w-12">
                      {size.toFixed(2)}rem
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------- LIVE PREVIEW SECTION ---------- */}
      <div className="mb-12 p-6 rounded-xl border bg-card" data-preview-section>
        <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Color Preview */}
          <div className="space-y-4">
            <div className="h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-medium">Primary</span>
            </div>
            <div className="h-10 rounded-lg bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground">Secondary</span>
            </div>
            <div className="h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground">Accent</span>
            </div>
          </div>
          
          {/* Button & Gradient Preview */}
          <div className="space-y-4">
            <button className="w-full h-10 rounded-lg border border-input bg-background hover:bg-hover transition">
              Regular Button
            </button>
            <button className="w-full h-10 rounded-lg bg-gradient-button text-white font-medium hover:opacity-90 transition">
              Gradient Button
            </button>
            <div className="h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-medium">Gradient</span>
            </div>
          </div>
          
          {/* Typography Preview */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2">Card Title</h4>
              <p className="text-sm text-muted-foreground">
                This is how text will appear with your selected settings.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Font:</span>
                <span className="font-medium">
                  {fontOptions.find(f => f.key === selectedFont)?.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-muted-foreground">
                <div>Base: <span className="font-mono">{fontSize.base.toFixed(2)}rem</span></div>
                <div>Large: <span className="font-mono">{fontSize.lg.toFixed(2)}rem</span></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Preview Elements */}
        <div className="mt-8 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
            <div className="text-xs text-success mb-1">Success</div>
            <div className="text-sm">Completed</div>
          </div>
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
            <div className="text-xs text-warning mb-1">Warning</div>
            <div className="text-sm">Action needed</div>
          </div>
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="text-xs text-destructive mb-1">Error</div>
            <div className="text-sm">Failed</div>
          </div>
          <div className="p-3 rounded-lg bg-muted border">
            <div className="text-xs text-muted-foreground mb-1">Muted</div>
            <div className="text-sm">Inactive</div>
          </div>
        </div>
      </div>

      {/* ---------- ACTION BUTTONS ---------- */}
      <div className="flex flex-wrap gap-4">
        <motion.button
          whileHover={isApplyEnabled ? { scale: 1.05 } : {}}
          whileTap={isApplyEnabled ? { scale: 0.95 } : {}}
          disabled={!isApplyEnabled}
          onClick={handleApplyTheme}
          className={`px-8 py-3 rounded-full font-semibold border transition-all
            ${isApplyEnabled
              ? "bg-primary text-primary-foreground border-primary shadow-lg hover:shadow-xl"
              : "bg-muted text-muted-foreground border-border cursor-not-allowed"}`}
        >
          Apply Changes
        </motion.button>

        <button
          onClick={() => {
            clearPreviewMode();
            const root = document.documentElement;
            root.removeAttribute("data-theme");
            root.removeAttribute("data-gradient");
            localStorage.removeItem("theme-color");
            localStorage.removeItem("theme-gradient");
            setSelectedColor(null);
            setSelectedGradient(null);
          }}
          className="px-6 py-3 rounded-full border border-input hover:bg-hover transition"
        >
          Reset to Default
        </button>
      </div>

      {/* ---------- DIALOG ---------- */}
      <AnimatePresence>
        {dialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-xl max-w-md w-full p-8 text-center border"
            >
              <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center
                ${dialog === "success" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                {dialog === "success" ? "✓" : "✗"}
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">
                {dialog === "success"
                  ? "Theme Applied"
                  : "Action Failed"}
              </h2>

              <p className="text-muted-foreground mb-8">
                {dialog === "success"
                  ? "Your theme changes have been saved and applied across the entire website."
                  : "Please make a selection before applying changes."}
              </p>

              <button
                onClick={() => setDialog(null)}
                className="px-8 py-3 rounded-full border border-primary bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- STATUS INDICATOR ---------- */}
      <div className="mt-8 pt-8 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isApplyEnabled ? 'bg-success' : 'bg-muted'}`}></div>
          <span>
            {isApplyEnabled 
              ? "Ready to apply changes" 
              : `Select ${mode === "color" ? "a color" : mode === "gradient" ? "a gradient" : "typography options"} to apply`}
          </span>
        </div>
      </div>
    </div>
  );
}