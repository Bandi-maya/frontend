// app/admin/customization/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  applyTheme,
  setPreviewMode,
  clearPreviewMode,
  resetTheme,
  type ThemeColor,
  type GradientTheme,
  type ThemeConfig,
  DEFAULT_THEME_CONFIG,
} from "@/lib/theme-utils";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Save,
  Trash2,
  Check,
  X,
  Palette,
  Type,
  Zap,
  Star,
  StarOff,
  Undo,
  Settings,
  Eye,
  Download,
} from "lucide-react";

/* ---------- SOLID THEME CONFIG ---------- */
const solidThemes = [
  { 
    key: "red" as ThemeColor, 
    name: "Crimson",
    preview: "#EF4444",
  },
  { 
    key: "orange" as ThemeColor, 
    name: "Sunset",
    preview: "#F97316",
  },
  { 
    key: "green" as ThemeColor, 
    name: "Emerald",
    preview: "#22C55E",
  },
  { 
    key: "teal" as ThemeColor, 
    name: "Teal",
    preview: "#14B8A6",
  },
  { 
    key: "blue" as ThemeColor, 
    name: "Azure",
    preview: "#3B82F6",
  },
  { 
    key: "purple" as ThemeColor, 
    name: "Royal",
    preview: "#8B5CF6",
  },
  { 
    key: "mono" as ThemeColor, 
    name: "Monochrome",
    preview: "#0F172A",
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
  { key: "inter", name: "Inter", value: "'Inter', ui-sans-serif, system-ui, sans-serif" },
  { key: "mono", name: "JetBrains Mono", value: "'JetBrains Mono', ui-monospace, monospace" },
  { key: "serif", name: "Georgia", value: "Georgia, serif" },
  { key: "system", name: "System Default", value: "system-ui, -apple-system, sans-serif" },
];

/* ---------- PRESET THEMES ---------- */
const presetThemes = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Dark theme with vibrant accent",
    config: {
      color: "purple" as ThemeColor,
      gradient: "royal" as GradientTheme,
      font: "'Inter', ui-sans-serif, system-ui, sans-serif",
      fontSizes: DEFAULT_THEME_CONFIG.fontSizes,
    },
    isPreset: true,
    previewColors: ["#8B5CF6", "#F3E8FF", "#C4B5FD"]
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Warm sunrise colors",
    config: {
      color: "orange" as ThemeColor,
      gradient: "sunset" as GradientTheme,
      font: "'Inter', ui-sans-serif, system-ui, sans-serif",
      fontSizes: DEFAULT_THEME_CONFIG.fontSizes,
    },
    isPreset: true,
    previewColors: ["#F97316", "#FFEDD5", "#FDBA74"]
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Cool ocean colors",
    config: {
      color: "blue" as ThemeColor,
      gradient: "ocean" as GradientTheme,
      font: "'Inter', ui-sans-serif, system-ui, sans-serif",
      fontSizes: DEFAULT_THEME_CONFIG.fontSizes,
    },
    isPreset: true,
    previewColors: ["#3B82F6", "#DBEAFE", "#93C5FD"]
  },
  {
    id: "forest-retreat",
    name: "Forest Retreat",
    description: "Natural green tones",
    config: {
      color: "green" as ThemeColor,
      gradient: "forest" as GradientTheme,
      font: "'Inter', ui-sans-serif, system-ui, sans-serif",
      fontSizes: DEFAULT_THEME_CONFIG.fontSizes,
    },
    isPreset: true,
    previewColors: ["#22C55E", "#DCFCE7", "#86EFAC"]
  },
];

export default function ThemeCustomizationPage() {
  const { theme: currentTheme, setTheme, resetTheme: resetThemeContext, isLoading: themeLoading } = useTheme();
  
  const [mode, setMode] = useState<"select" | "color" | "gradient" | "typography" | "custom">("select");
  const [draftTheme, setDraftTheme] = useState<ThemeConfig | null>(currentTheme);
  const [dialog, setDialog] = useState<{type: "success" | "error", message: string} | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [customThemes, setCustomThemes] = useState<any[]>([]);
  const [themeName, setThemeName] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load custom themes from localStorage on mount
  useEffect(() => {
    const savedThemes = localStorage.getItem("custom-themes");
    if (savedThemes) {
      setCustomThemes(JSON.parse(savedThemes));
    }
  }, []);

  // Keep draft theme in sync with the active theme when in select mode
  useEffect(() => {
    if (mode === 'select') {
      setDraftTheme(currentTheme);
    }
  }, [currentTheme, mode]);

  // Update preview when draft theme changes
  useEffect(() => {
    if (draftTheme && mode !== 'select' && showPreview) {
      setPreviewMode(draftTheme);
    } else if (mode === 'select' || !showPreview) {
      clearPreviewMode();
    }
  }, [draftTheme, mode, showPreview]);

  // Handle theme changes
  const handleUpdateDraft = (newConfig: Partial<ThemeConfig>) => {
    if (draftTheme) {
      const updatedTheme = { ...draftTheme, ...newConfig };
      setDraftTheme(updatedTheme);
      
      // Auto-preview when making changes
      if (!showPreview) setShowPreview(true);
    }
  };

  // Apply theme
  const handleApplyTheme = async (themeToApply?: ThemeConfig) => {
    const finalTheme = themeToApply || draftTheme;

    if (!finalTheme) {
      setDialog({ type: "error", message: "No theme configuration to apply." });
      return;
    }

    try {
      setIsSaving(true);
      clearPreviewMode();
      setShowPreview(false);

      await setTheme(finalTheme);
      
      setDialog({
        type: "success",
        message: "Theme applied successfully across the entire website."
      });
      setTimeout(() => setDialog(null), 3000);
    } catch (error) {
      console.error("Error applying theme:", error);
      setDialog({ type: "error", message: "Failed to apply theme." });
    } finally {
      setIsSaving(false);
    }
  };

  // Save custom theme
  const handleSaveCustomTheme = () => {
    if (!themeName.trim()) {
      setDialog({ type: "error", message: "Please enter a name for your theme." });
      return;
    }
    if (!draftTheme) return;

    const newTheme = {
      id: `custom-${Date.now()}`,
      name: themeName,
      description: themeDescription,
      config: draftTheme,
      isPreset: false,
      createdAt: new Date().toISOString(),
      previewColors: [
        solidThemes.find(t => t.key === draftTheme.color)?.preview || "#000000",
        "#F1F5F9",
        "#94A3B8"
      ]
    };

    const updatedThemes = [...customThemes, newTheme];
    setCustomThemes(updatedThemes);
    localStorage.setItem("custom-themes", JSON.stringify(updatedThemes));
    
    setThemeName("");
    setThemeDescription("");
    setShowSaveDialog(false);
    
    setDialog({ type: "success", message: `"${themeName}" saved as a custom theme!` });
    setTimeout(() => setDialog(null), 3000);
  };

  // Delete custom theme
  const handleDeleteCustomTheme = (themeId: string) => {
    const updatedThemes = customThemes.filter(theme => theme.id !== themeId);
    setCustomThemes(updatedThemes);
    localStorage.setItem("custom-themes", JSON.stringify(updatedThemes));
    setDialog({ type: "success", message: "Theme deleted successfully!" });
    setTimeout(() => setDialog(null), 3000);
  };

  // Load preset theme
  const handleLoadPreset = (preset: any) => {
    setSelectedPreset(preset.id);
    setDraftTheme(preset.config);
    setShowPreview(true);
  };

  // Reset to defaults
  const handleReset = async () => {
    try {
      setIsSaving(true);
      clearPreviewMode();
      setShowPreview(false);
      
      await resetThemeContext();
      setDraftTheme(DEFAULT_THEME_CONFIG);
      
      setDialog({ type: 'success', message: 'Theme has been reset to default.' });
      setTimeout(() => setDialog(null), 3000);
    } catch (error) {
      setDialog({ type: 'error', message: 'Failed to reset theme.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Export theme
  const handleExportTheme = () => {
    if (!draftTheme) return;
    
    const themeData = JSON.stringify(draftTheme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setDialog({ type: 'success', message: 'Theme exported successfully!' });
    setTimeout(() => setDialog(null), 3000);
  };

  if (themeLoading || !draftTheme) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-4"></div>
          <div className="h-4 bg-muted rounded w-96 mb-12"></div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { color: selectedColor, gradient: selectedGradient, font: selectedFontValue, fontSizes } = draftTheme;
  const selectedFontKey = fontOptions.find(f => f.value === selectedFontValue)?.key || 'inter';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Website Theme Customization</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Customize the appearance of your website. Changes are saved automatically.
        </p>
      </div>

      {/* Mode Select */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-14">
        {[
          { key: "select" as const, label: "Themes", icon: Palette },
          { key: "color" as const, label: "Colors", icon: Palette },
          { key: "gradient" as const, label: "Gradients", icon: Zap },
          { key: "typography" as const, label: "Typography", icon: Type },
          { key: "custom" as const, label: "Custom", icon: Settings },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setMode(key);
              if (key === "select") {
                clearPreviewMode();
                setShowPreview(false);
              } else {
                setShowPreview(true);
              }
            }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-sm sm:text-base transition font-medium
              ${mode === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/40 hover:bg-secondary"}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Select Theme Mode */}
      {mode === "select" && (
        <div className="space-y-8 sm:space-y-12">
          {/* Preset Themes */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Preset Themes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {presetThemes.map((preset) => (
                <motion.div
                  key={preset.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLoadPreset(preset)}
                  className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all cursor-pointer group
                    ${selectedPreset === preset.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/40"}`}
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{preset.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{preset.description}</p>
                    </div>
                    {selectedPreset === preset.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {preset.previewColors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-6 sm:h-8 rounded"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyTheme(preset.config);
                    }}
                    className="mt-2 w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors text-sm"
                  >
                    Apply Theme
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom Themes */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Custom Themes
              </h2>
              <button
                onClick={() => setMode("custom")}
                className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-xs sm:text-sm"
              >
                Create New
              </button>
            </div>
            
            {customThemes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {customThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative p-4 sm:p-6 rounded-xl border border-border bg-card group"
                  >
                    <button
                      onClick={() => handleDeleteCustomTheme(theme.id)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    
                    <div className="mb-3 sm:mb-4">
                      <h3 className="font-semibold text-base sm:text-lg">{theme.name}</h3>
                      {theme.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{theme.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: {new Date(theme.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {theme.previewColors?.map((color: string, i: number) => (
                        <div
                          key={i}
                          className="flex-1 h-6 rounded"
                          style={{ background: color }}
                        />
                      )) || (
                        <>
                          <div className="flex-1 h-6 rounded bg-primary"></div>
                          <div className="flex-1 h-6 rounded bg-secondary"></div>
                          <div className="flex-1 h-6 rounded bg-accent"></div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleApplyTheme(theme.config)}
                        className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors text-sm"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => {
                          setDraftTheme(theme.config);
                          setMode("custom");
                          setShowPreview(true);
                        }}
                        className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 border-2 border-dashed border-border rounded-xl">
                <StarOff className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">No Custom Themes Yet</h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
                  Create your first custom theme to save your preferred settings
                </p>
                <button
                  onClick={() => setMode("custom")}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors text-sm sm:text-base"
                >
                  Create Custom Theme
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Color Selection Mode */}
      {mode === "color" && (
        <div className="mb-8 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Primary Color Scheme</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm ${showPreview ? 'border-primary text-primary' : 'border-border'}`}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => setMode("select")}
                className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-sm"
              >
                Back to Themes
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-6">
            {solidThemes.map(({ key, name, preview }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUpdateDraft({ color: key })}
                className={`flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border transition-all
                  ${selectedColor === key
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                    : 'border-border hover:border-primary/40'}`}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: preview }}
                />
                <span className="text-xs sm:text-sm font-medium">{name}</span>
                {selectedColor === key && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </motion.button>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => handleApplyTheme()}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Apply Color Scheme
                  </>
                )}
              </button>
              <button
                onClick={() => setMode("gradient")}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
              >
                <Zap className="w-4 h-4" />
                Try Gradients
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
              >
                <Undo className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gradient Selection Mode */}
      {mode === "gradient" && (
        <div className="mb-8 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Gradient Themes</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm ${showPreview ? 'border-primary text-primary' : 'border-border'}`}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => setMode("color")}
                className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-sm"
              >
                Back to Solid Colors
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {gradientThemes.map(({ key, name, preview }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUpdateDraft({ gradient: key })}
                className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all overflow-hidden
                  ${selectedGradient === key
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/40'}`}
              >
                <div
                  className="w-full h-20 sm:h-24 rounded-lg mb-3 sm:mb-4"
                  style={{ background: preview }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium">{name}</span>
                  {selectedGradient === key && (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => handleApplyTheme()}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Apply Gradient Theme
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
              >
                <Undo className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Typography Mode */}
      {mode === "typography" && (
        <div className="mb-8 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Typography Settings</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm ${showPreview ? 'border-primary text-primary' : 'border-border'}`}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => setMode("select")}
                className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-sm"
              >
                Back to Themes
              </button>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Font Family */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Font Family</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {fontOptions.map(({ key, name, value }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleUpdateDraft({ font: value })}
                    className={`p-4 rounded-xl border transition-all text-left
                      ${selectedFontKey === key
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/40'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{name}</span>
                      {selectedFontKey === key && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: value }}>
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Font Sizes */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Font Sizes</h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { key: 'xs', label: 'Extra Small', min: 10, max: 14, step: 0.5 },
                  { key: 'sm', label: 'Small', min: 12, max: 16, step: 0.5 },
                  { key: 'base', label: 'Base', min: 14, max: 20, step: 0.5 },
                  { key: 'lg', label: 'Large', min: 16, max: 24, step: 0.5 },
                  { key: 'xl', label: 'Extra Large', min: 18, max: 32, step: 0.5 },
                ].map(({ key, label, min, max, step }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm text-muted-foreground">
                        {fontSizes[key as keyof typeof fontSizes]}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={fontSizes[key as keyof typeof fontSizes]}
                      onChange={(e) => {
                        const newFontSizes = {
                          ...fontSizes,
                          [key]: parseFloat(e.target.value)
                        };
                        handleUpdateDraft({ fontSizes: newFontSizes });
                      }}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => handleApplyTheme()}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Apply Typography
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
              >
                <Undo className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Theme Mode */}
      {mode === "custom" && (
        <div className="mb-8 sm:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Custom Theme Builder</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm ${showPreview ? 'border-primary text-primary' : 'border-border'}`}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => setMode("select")}
                className="px-3 sm:px-4 py-2 rounded-lg border border-input hover:bg-hover transition-colors text-sm"
              >
                Back to Themes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Color & Gradient Preview */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Current Theme Preview</h3>
                <div className="p-4 sm:p-6 rounded-xl border border-border bg-card space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: solidThemes.find(t => t.key === selectedColor)?.preview || '#000' }}
                    />
                    <div>
                      <h4 className="font-semibold">Solid Color</h4>
                      <p className="text-sm text-muted-foreground">{solidThemes.find(t => t.key === selectedColor)?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ background: gradientThemes.find(t => t.key === selectedGradient)?.preview }}
                    />
                    <div>
                      <h4 className="font-semibold">Gradient</h4>
                      <p className="text-sm text-muted-foreground">{gradientThemes.find(t => t.key === selectedGradient)?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Type className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Typography</h4>
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: selectedFontValue }}>
                        {fontOptions.find(f => f.key === selectedFontKey)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setMode("color")}
                    className="p-3 sm:p-4 rounded-lg border border-border hover:border-primary/40 transition-colors text-left"
                  >
                    <Palette className="w-5 h-5 mb-2" />
                    <h4 className="font-medium mb-1">Change Colors</h4>
                    <p className="text-xs text-muted-foreground">Switch solid color palette</p>
                  </button>
                  <button
                    onClick={() => setMode("gradient")}
                    className="p-3 sm:p-4 rounded-lg border border-border hover:border-primary/40 transition-colors text-left"
                  >
                    <Zap className="w-5 h-5 mb-2" />
                    <h4 className="font-medium mb-1">Change Gradients</h4>
                    <p className="text-xs text-muted-foreground">Apply gradient themes</p>
                  </button>
                  <button
                    onClick={() => setMode("typography")}
                    className="p-3 sm:p-4 rounded-lg border border-border hover:border-primary/40 transition-colors text-left"
                  >
                    <Type className="w-5 h-5 mb-2" />
                    <h4 className="font-medium mb-1">Change Fonts</h4>
                    <p className="text-xs text-muted-foreground">Adjust typography settings</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Save & Actions */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Save Custom Theme</h3>
                <div className="p-4 sm:p-6 rounded-xl border border-border bg-card space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme Name *</label>
                    <input
                      type="text"
                      value={themeName}
                      onChange={(e) => setThemeName(e.target.value)}
                      placeholder="My Awesome Theme"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                    <textarea
                      value={themeDescription}
                      onChange={(e) => setThemeDescription(e.target.value)}
                      placeholder="Describe your theme..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveCustomTheme}
                    disabled={!themeName.trim()}
                    className="w-full py-2 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Save className="inline w-4 h-4 mr-2" />
                    Save as Custom Theme
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Theme Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleApplyTheme()}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        Applying...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Apply Current Theme
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportTheme}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4" />
                    Export Theme
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-input hover:bg-hover transition-colors text-sm sm:text-base"
                  >
                    <Undo className="w-4 h-4" />
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Messages */}
      <AnimatePresence>
        {dialog && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className={`px-4 sm:px-6 py-3 rounded-lg shadow-lg border flex items-center gap-3 ${
              dialog.type === 'success' 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}>
              {dialog.type === 'success' ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="text-sm sm:text-base">{dialog.message}</span>
              <button
                onClick={() => setDialog(null)}
                className="ml-2 text-current hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}